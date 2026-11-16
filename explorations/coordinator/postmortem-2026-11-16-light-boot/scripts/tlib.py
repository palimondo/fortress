#!/usr/bin/env python3
"""tlib.py counts nothing: it is the shared reader for the scripts beside it.

It names the coordinating session's transcript (three segments, see SEGMENTS),
reads the slim event list that extract.py writes under tmp/pm/, and holds the
definitions that every count here rests on: which message is the curator's,
which file is a part of a skill, which tool call is which kind of work, which
call is a search of the record.

A reference to the transcript has the form SEG:LINE.
  C:13867    line 13867 of the session's transcript file
             (fe616d40-....jsonl; on the branch transcripts-blinded it is
             stored as fe616d40-....jsonl.parts/000.jsonl + 001.jsonl, whose
             lines are numbered through)
  B3:1234    line 1234 of part 003 of
             fe616d40-....until-2026-11-07T23-09.jsonl.parts/
  A1:1234    line 1234 of part 001 of
             fe616d40-....until-2026-10-08T15-41.jsonl.parts/
"""
import glob, json, os, re, sys

SESSION = 'fe616d40-a9c6-56d7-9da1-7168a172765d'
LIVE = '/root/.claude/projects/-home-user-fortress/%s.jsonl' % SESSION
BACKUP = '/home/user/fortress-transcripts-blinded/projects/-home-user-fortress'
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..'))
CACHE = os.environ.get('PM_CACHE', os.path.join(REPO, 'tmp', 'pm'))

def segments():
    """[(segment letter, [(reference prefix, path)])], oldest first."""
    a = sorted(glob.glob('%s/%s.until-2026-10-08T15-41.jsonl.parts/*.jsonl' % (BACKUP, SESSION)))
    b = sorted(glob.glob('%s/%s.until-2026-11-07T23-09.jsonl.parts/*.jsonl' % (BACKUP, SESSION)))
    if os.path.exists(LIVE):
        c = [('C', LIVE)]
    else:  # no live file: the backup's parts, numbered through
        c = [('C', p) for p in sorted(glob.glob('%s/%s.jsonl.parts/*.jsonl' % (BACKUP, SESSION)))]
    return [('A', [('A%d' % i, p) for i, p in enumerate(a)]),
            ('B', [('B%d' % i, p) for i, p in enumerate(b)]),
            ('C', c)]

def load_events(only=None):
    """The slim events of extract.py, oldest first. only: a set of kinds."""
    out = []
    for seg in 'ABC':
        path = os.path.join(CACHE, 'events-%s.jsonl' % seg)
        if not os.path.exists(path):
            sys.exit('missing %s: run scripts/extract.py first' % path)
        with open(path) as f:
            for line in f:
                e = json.loads(line)
                if only is None or e['k'] in only:
                    out.append(e)
    out.sort(key=lambda e: e['ts'])
    return out

# ---- the models -------------------------------------------------------------

def tier(model):
    """The transcript's name of a model -> its tier and version, such as 'Fable 5.2'."""
    m = re.match(r'claude-([a-z]+)-(\d+)(?:-(\d+))?', model or '')
    if not m:
        return model or '?'
    return '%s %s' % (m.group(1).capitalize(), m.group(2) + ('.' + m.group(3) if m.group(3) else ''))

# ---- the skills' parts ------------------------------------------------------

PART_RE = re.compile(r'\.claude/skills/([a-z-]+)/(SKILL\.md|references/([a-z-]+)\.md)')

def part_of(path):
    """'/x/.claude/skills/coordinator/references/record.md' -> 'coordinator/record';
    a SKILL.md -> 'coordinator/CORE'; anything else -> None."""
    m = PART_RE.search(path or '')
    if not m:
        return None
    return '%s/%s' % (m.group(1), m.group(3) or 'CORE')

def bash_read(cmd):
    """How a Bash command prints a file: 'cat', 'section' (sed -n, awk, head, tail), or None (a grep or a wc is not a read)."""
    if re.search(r'(?<![\w-])cat\s+[^|;&\n]*\.claude/skills/', cmd):
        return 'cat'
    if re.search(r'(?<![\w-])(sed -n|awk|head|tail)\b[^|;&\n]*\.claude/skills/', cmd):
        return 'section'
    return None

# ---- the record -------------------------------------------------------------

RECORD_FILES = ('FACTS.md', 'POSITIONS.md', 'INDEX.md', 'FACTS-history.md', 'POSITIONS-history.md')
RECORD_RE = re.compile(r'(?<![\w-])(FACTS|POSITIONS|INDEX)(-history)?\.md')
# A search of the record: the query tool, or a grep, awk, sed -n or rg over the
# record's files, or a Read or Grep tool call on one of them.
SEARCH_CMD_RE = re.compile(r'facts-extract\.(sh|py)|ledger\.py\s+(find|show|row)|\$T\s|\$L\s+find')
GREP_RE = re.compile(r'(?<![\w-])(grep|rg|awk|sed -n)\b')
WIDER_RECORD_RE = re.compile(r'(?<![\w-])(FACTS|POSITIONS|INDEX|PLAN|HELD|BOOT|review-queue)(-history)?\.md|fortress-gap-ledger')

def is_record_search(tool):
    """True if a tool call (slim form of extract.py) searches or reads the record
    (FACTS, POSITIONS, INDEX, their histories, PLAN, the held list, the review
    queue, the gap ledger)."""
    name, inp = tool['name'], tool.get('inp') or {}
    if name == 'Bash':
        cmd = inp.get('command') or ''
        if SEARCH_CMD_RE.search(cmd):
            return True
        return bool(GREP_RE.search(cmd) and WIDER_RECORD_RE.search(cmd))
    if name in ('Read', 'Grep'):
        return bool(WIDER_RECORD_RE.search((inp.get('file_path') or '') + ' ' + (inp.get('path') or '')))
    return False

def is_decision_search(tool):
    """Narrower: a search of FACTS, POSITIONS or INDEX (or their histories) only."""
    name, inp = tool['name'], tool.get('inp') or {}
    if name == 'Bash':
        cmd = inp.get('command') or ''
        if re.search(r'facts-extract\.(sh|py)|\$T\s', cmd):
            return True
        return bool(GREP_RE.search(cmd) and RECORD_RE.search(cmd))
    if name in ('Read', 'Grep'):
        return bool(RECORD_RE.search((inp.get('file_path') or '') + ' ' + (inp.get('path') or '')))
    return False

# ---- the kinds of work, and the part that governs each ------------------------

def _cmd(tool):
    return (tool.get('inp') or {}).get('command') or '' if tool['name'] == 'Bash' else ''

def _path(tool):
    return (tool.get('inp') or {}).get('file_path') or ''

def act_kinds(tool):
    """The kinds of work that one tool call starts, as a set of names.
    Each name is a key of GOVERNS."""
    name = tool['name']
    cmd, path = _cmd(tool), _path(tool)
    kinds = set()
    # an edit of the record's files: record.py add/set, or an Edit or Write of them
    if name in ('Edit', 'Write') and re.search(r'coordinator/(FACTS|POSITIONS|INDEX|FACTS-history|POSITIONS-history)\.md$', path):
        kinds.add('record-edit')
    if cmd and re.search(r'record\.py\s+(\S+\s+)*(add|set)\b', cmd):
        kinds.add('record-edit')
    if cmd and re.search(r"(sed -i|>>)[^\n|;]*coordinator/(FACTS|POSITIONS|INDEX)(-history)?\.md", cmd):
        kinds.add('record-edit')
    # a worker's launch
    if name in ('Agent', 'Task'):
        kinds.add('worker-launch')
    if cmd and re.search(r'(?<![\w-])claude\s+(-p|--print)\b|skill-writer\.sh', cmd):
        kinds.add('worker-launch')
    # a batch step: the batch workflow or the record-landing workflow launched,
    # or a batch's brief file written
    inp = tool.get('inp') or {}
    if name == 'Workflow':
        kinds.add('worker-launch')
        if re.search(r'climb-batch-workflow|record-landing', json.dumps(inp)):
            kinds.add('batch-step')
    if name in ('Edit', 'Write') and re.search(r'coordinator/CLIMB-BATCH-[\w.]+\.md$', path):
        kinds.add('batch-step')
    # the road: PLAN or the review queue edited
    if name in ('Edit', 'Write') and re.search(r'coordinator/(PLAN|review-queue)\.md$', path):
        kinds.add('road-edit')
    # an analysis of what was said or what the work cost: the spend or a
    # journal read by its tool, the session's own transcript or the backup's
    # transcripts read, a worker briefed to read transcripts, a post-mortem written
    if cmd and re.search(r'spend\.py|journal-text\.py|view\.py|7168a172765d\.jsonl|transcripts-blinded/projects|origin/transcripts', cmd):
        kinds.add('analysis')
    if name in ('Agent', 'Task') and re.search(r'transcript', inp.get('prompt') or '', re.I):
        kinds.add('analysis')
    if name in ('Edit', 'Write') and '/postmortem-' in path:
        kinds.add('analysis')
    # a skill change
    if cmd and re.search(r'skill-writer\.sh', cmd):
        kinds.add('skill-change')
    if name in ('Edit', 'Write') and '.claude/skills/' in path:
        kinds.add('skill-change')
    # the platform: check-ins armed
    if name.endswith('send_later'):
        kinds.add('check-ins')
    # fortress-repo: a commit or a push; a query of the record
    if cmd and re.search(r'(?<![\w-])git\s+(-C\s+\S+\s+)?(commit|push)\b', cmd):
        kinds.add('commit')
    if cmd and re.search(r'facts-extract\.(sh|py)|ledger\.py', cmd):
        kinds.add('record-query')
    return kinds

# kind of work -> the parts, any one of which counts as its governing part
GOVERNS = {
    'record-edit':   ['coordinator/record'],
    'worker-launch': ['coordinator/delegating'],
    'batch-step':    ['coordinator/batch'],
    'road-edit':     ['coordinator/road'],
    'analysis':      ['coordinator/analysis'],
    'skill-change':  ['coordinator/skill-rewrite'],
    'check-ins':     ['cloud-container/stops'],
    'restart':       ['cloud-container/stops', 'cloud-container/container-loss'],   # found by boots.py, from the harness's notice
    'next-asked':    ['coordinator/road'],                                          # found by boots.py, from his message
    'commit':        ['fortress-repo/committing'],
    'record-query':  ['fortress-repo/records'],
}
# the six kinds that the brief of this analysis names, then the others
KIND_ORDER = ['record-edit', 'worker-launch', 'batch-step', 'analysis', 'restart', 'next-asked',
              'road-edit', 'skill-change', 'check-ins', 'commit', 'record-query']
BRIEF_KINDS = KIND_ORDER[:6]
RESTART_RE = re.compile(r"The container was restarted|worker process was restarted")
NEXT_RE = re.compile(r"\bwhat('?s| is| comes| do we do)? ?(now|next)\b|\bnext steps?\b|\bso what now\b|\bwhat should we do\b", re.I)

def fmt_ts(ts):
    return ts[:16].replace('T', ' ')
