"""What filled batch N's gather's context before its compaction at 06:34 UTC, by source, in tokens as the harness
counts them (input + cache read + cache write of each API call).
- The first call's context is the base (system prompt, tools, CLAUDE.md, environment) plus the task prompt. The base is
  the intercept of a straight-line fit of first-call context against prompt characters over this run's other agents
  (the gate, skeptic2:I, the review and rung I fit within 3K); the prompt's parts are split by characters at the fit's
  slope, 0.4275 tokens per character.
- Every later call adds what the previous step produced (gather_steps.py, classify_gather.py).
python3 gather_calls.py; python3 gather_steps.py; python3 classify_gather.py > /dev/null; python3 gather_composition.py"""
import json, re, collections
W = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_4ba3c084-2b3'
L = open(W + '/agent-a368e1e3b5dc1fb4a.jsonl').read().splitlines()
p = json.loads(L[0])['message']['content']; p = p if isinstance(p, str) else '\n'.join(x.get('text', '') for x in p)
SLOPE, BASE = 0.4275, 41843
i = p.find('The rungs and their verdicts:'); j = p.find('[', i)
rungs, end = json.JSONDecoder().raw_decode(p[j:])
parts = collections.OrderedDict()
parts['prefix and role'] = j
fields = collections.Counter()
for r in rungs:
    for k, v in r.items():
        fields[k] += len(json.dumps(v, ensure_ascii=False))
parts['rungs: reportText (REPORT.md, 4)'] = fields['reportText']
parts['rungs: skepticText and firstSkepticText (SKEPTIC.md, 4 and 3)'] = fields['skepticText'] + fields['firstSkepticText']
parts['rungs: recordText (record.md, 4)'] = fields['recordText']
parts['rungs: corrections, rows, file lists'] = end - fields['reportText'] - fields['skepticText'] - fields['firstSkepticText'] - fields['recordText']
parts['items for Pavol and the return'] = len(p) - j - end
first = None; comp = None
for l in L:
    o = json.loads(l)
    if o.get('type') == 'assistant' and first is None:
        u = o['message']['usage']; first = u['input_tokens'] + u['cache_creation_input_tokens'] + u['cache_read_input_tokens']
    if o.get('type') == 'system' and o.get('subtype') == 'compact_boundary':
        comp = o['compactMetadata']
print(f"first call's context {first/1e3:.0f}K; compaction preTokens {comp['preTokens']/1e3:.0f}K, postTokens {comp['postTokens']/1e3:.0f}K, {comp['durationMs']/1e3:.0f} s")
print(f"base (system prompt, tools, CLAUDE.md, environment), by the fit: {BASE/1e3:.0f}K")
print(f"task prompt: {len(p)} characters, {(first-BASE)/1e3:.0f}K by the first call; by part at the slope:")
for k, v in parts.items():
    print(f"   {v*SLOPE/1e3:6.1f}K  {k}")
R = json.load(open('gather_kinds.json'))
pre = [r for r in R if r['phase'] == 'pre']
print(f"work before the compaction: {len(pre)} calls, {sum(r['delta'] for r in pre)/1e3:.0f}K: tool results {sum(r['R'] for r in pre)/1e3:.0f}K, "
      f"own output {sum(r['A'] for r in pre)/1e3:.0f}K, reasoning and per-call overhead {sum(r['rest'] for r in pre)/1e3:.0f}K; by kind (each kind's results, its own output and its share of reasoning):")
agg = collections.defaultdict(lambda: [0, 0.0])
for r in pre:
    agg[r['kind']][0] += 1; agg[r['kind']][1] += r['delta']
for k, (n, t) in sorted(agg.items(), key=lambda kv: -kv[1][1]):
    print(f"   {t/1e3:6.1f}K  {n:3d} calls  {k}")
