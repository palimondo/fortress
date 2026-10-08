#!/usr/bin/env python3
# batch-measures.py RUN_DIR [RUN_DIR...]: the measures a climb batch reports against the batches before it
# (explorations/coordinator/process-engineering/batch-redesign.md, "The measures"), read from a Workflow run's
# directory (<project>/<session>/subagents/workflows/wf_<id>/, one agent-<id>.jsonl and agent-<id>.meta.json per
# agent, the label in the meta file's "description"). Nothing is run; the transcripts are only read.
#
#   tokens written by role: input plus cache-creation tokens, each message counted once by its id, the method of
#     explorations/coordinator/process-engineering/labor.md and tools/spend.py; the role is the label's first
#     word (rung, resume, repair, skeptic, skeptic2, judge, gather, review, gate, coldread, commit), a retry
#     counted with its role, a repair or judge on the merged tree (label repair:review, judge:gate ...) apart;
#   first calls: the writes of each agent's first message, and how many started cold (over 30K written by the
#     harness's part: the first call's cache read under 20K);
#   builds per worker: Bash calls of a rung, resume or repair agent that run ant compileAll or ant clean, and
#     those that run the library order (a fortress compile of CompilerLibrary);
#   cache refills: a call that writes over 30K and comes 300 s or more after the agent's previous call, the
#     prompt cache having lapsed (POSITIONS.md, "Check-ins and stops."; the skill's session.md);
#   refusal cycles: per rung, the agents after its first skeptic (judge, repair, resume, skeptic2) and what
#     they wrote.
import glob, json, os, re, sys
from datetime import datetime

def ts(s):
    try:
        return datetime.fromisoformat(s.replace('Z', '+00:00')).timestamp()
    except Exception:
        return None

def role_of(label):
    base = re.sub(r':attempt\d+$', '', label)
    parts = base.split(':')
    head = parts[0]
    if head in ('repair', 'judge') and len(parts) > 1 and parts[1] in ('review', 'gate'):
        return head + ':merged'
    if head in ('gate2',) or base.startswith('gate:'):
        return 'gate'
    return head

def rung_of(label):
    base = re.sub(r':attempt\d+$', '', label)
    parts = base.split(':')
    return parts[1] if len(parts) > 1 and re.fullmatch(r'[A-Z][A-Za-z0-9]*', parts[1] or '') else None

# A build is a shell segment (split at ; & | newline and double quotes) that is the ant command itself,
# so that a quoted key such as "ant compileAll deletes a tracked file" is not one.
BUILD_SEG = re.compile(r'^\(?\s*ant(\s+-\S+)*(\s+\w+)*?\s+(compileAll|clean)\s*(\d?>.*)?\)?$')
LIBRARY_SEG = re.compile(r'fortress compile \S*CompilerLibrary')

def segments(cmd):
    return [x.strip() for x in re.split(r'[;&|\n"]', cmd) if x.strip()]

def is_build(cmd):
    return any(BUILD_SEG.match(x) for x in segments(cmd))

def is_library(cmd):
    return any(LIBRARY_SEG.search(x) for x in segments(cmd))

def agent(path):
    seen, order = {}, []
    builds = library = 0
    for line in open(path, errors='replace'):
        try:
            r = json.loads(line)
        except Exception:
            continue
        m = r.get('message') if isinstance(r.get('message'), dict) else None
        if not m:
            continue
        if r.get('type') == 'assistant':
            for c in m.get('content') or []:
                if isinstance(c, dict) and c.get('type') == 'tool_use' and c.get('name') == 'Bash':
                    cmd = (c.get('input') or {}).get('command') or ''
                    builds += is_build(cmd)
                    library += is_library(cmd)
        if 'usage' not in m:
            continue
        mid = m.get('id') or id(m)
        if mid not in seen:
            order.append(mid)
        seen[mid] = (m['usage'], ts(r.get('timestamp') or ''))
    calls = [seen[k] for k in order]
    w = lambda u: u.get('input_tokens', 0) + u.get('cache_creation_input_tokens', 0)
    written = sum(w(u) for u, _ in calls)
    first = w(calls[0][0]) if calls else 0
    cold = bool(calls) and calls[0][0].get('cache_read_input_tokens', 0) < 20000
    refills, refill_tokens, prev = 0, 0, None
    for u, t in calls:
        if prev is not None and t is not None and t - prev >= 300 and w(u) > 30000:
            refills += 1
            refill_tokens += w(u)
        prev = t if t is not None else prev
    return dict(written=written, first=first, cold=cold, calls=len(calls), builds=builds, library=library,
                refills=refills, refill_tokens=refill_tokens)

def k(n):
    return '%.0fK' % (n / 1000.0) if n < 1e6 else '%.2fM' % (n / 1e6)

ORDER = ['rung', 'resume', 'repair', 'skeptic', 'judge', 'skeptic2', 'gather', 'review', 'judge:merged',
         'repair:merged', 'gate', 'coldread', 'commit']

for run in sys.argv[1:]:
    agents = []
    for meta in sorted(glob.glob(os.path.join(run, 'agent-*.meta.json'))):
        try:
            label = json.load(open(meta)).get('description') or '?'
        except Exception:
            continue
        jl = meta[:-len('.meta.json')] + '.jsonl'
        if os.path.isfile(jl):
            a = agent(jl)
            a['label'] = label
            agents.append(a)
    total = sum(a['written'] for a in agents)
    print('# %s: %d agents, %s written' % (os.path.basename(run.rstrip('/')), len(agents), k(total)))
    roles = {}
    for a in agents:
        roles.setdefault(role_of(a['label']), []).append(a)
    print('role\tagents\twritten\tshare\tmean\tfirst calls\tcold starts')
    for r in ORDER + sorted(set(roles) - set(ORDER)):
        if r not in roles:
            continue
        xs = roles[r]
        s = sum(a['written'] for a in xs)
        print('%s\t%d\t%s\t%.1f%%\t%s\t%s\t%d' % (r, len(xs), k(s), 100.0 * s / total if total else 0, k(s / len(xs)),
                                               k(sum(a['first'] for a in xs)), sum(a['cold'] for a in xs)))
    firsts = sum(a['first'] for a in agents)
    print('first calls\t%s (%.1f%%), %d cold' % (k(firsts), 100.0 * firsts / total if total else 0, sum(a['cold'] for a in agents)))
    workers = [a for a in agents if role_of(a['label']) in ('rung', 'resume', 'repair')]
    print('builds per worker\t' + ', '.join('%s %d+%d' % (a['label'], a['builds'], a['library']) for a in workers)
          + '\t(ant compileAll or clean + library order runs)')
    others = [a for a in agents if role_of(a['label']) not in ('rung', 'resume', 'repair') and (a['builds'] or a['library'])]
    if others:
        print('builds by other roles\t' + ', '.join('%s %d+%d' % (a['label'], a['builds'], a['library']) for a in others))
    rf = [a for a in agents if a['refills']]
    print('cache refills\t%d, %s\t%s' % (sum(a['refills'] for a in agents), k(sum(a['refill_tokens'] for a in agents)),
                                          ', '.join('%s %d' % (a['label'], a['refills']) for a in rf)))
    cycles = {}
    for a in agents:
        r, g = role_of(a['label']), rung_of(a['label'])
        if g and r in ('judge', 'repair', 'resume', 'skeptic2'):
            cycles.setdefault(g, []).append(a)
    tot = sum(a['written'] for xs in cycles.values() for a in xs)
    print('refusal cycles\t%d rung(s), %s (%.1f%%)\t%s' % (len(cycles), k(tot), 100.0 * tot / total if total else 0,
          '; '.join('%s: %s %s' % (g, ' '.join(re.sub(r':.*', '', a['label']) for a in xs), k(sum(a['written'] for a in xs)))
                    for g, xs in sorted(cycles.items()))))
    print()
