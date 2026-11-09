import sys, json
sys.path.insert(0, '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/tools')
from rd import *
OUT='/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/slices/'
FENCE='``````'
groups=[
 ('briefs-A_2026-11-08T1226Z-1556Z_morning-literals.md','Briefs and messages to workers on literals, 11-08 12:26 to 15:56 UTC: the two record writers of his string and float-numeral answers (P-171, P-172), the literals scout and the "one picture" review, the page-changes scout, the fork probe ("a numeral where nothing fixes its type", the literal-fork review), the ledger-row writer, the de-mixing skill cold read and the page worker, and the coordinator\'s messages to them.',
  [3219,3275,3523,3524,3562,3583,3653,3702,3791,3792,3825,3927,3968,4046]),
 ('briefs-B_2026-11-08T1936Z-2235Z_prototype-and-design-session.md','The prototype\'s brief (reading B on the compiled side, 19:36) and every message the coordinator sent it during the design session (19:48, 20:13, 21:23, 21:56), with the frozen-specification scout, the ledger-row writer of 20:47 and the scout for the team\'s words on IntLiteral and FloatLiteral (22:35).',
  [4157,4226,4268,4342,4533,4643,4752,4888]),
 ('briefs-C_2026-11-08T2304Z_fable-judgement.md','The Fable judgement\'s brief (23:04 UTC on 11-08): "Fable judge: the literal design\'s coherence".',
  [4987]),
 ('briefs-D_2026-11-08T2325Z-2026-11-09T0123Z_record-writer-planner-batch29-prep.md','From his go to the launch: the Opus record writer of the numeral design and D3 (23:25, before the compaction), then, after the compaction, the batch planner and the second record writer (23:56), the coordinator\'s messages to them (00:18), the Fable review of climb batch 29\'s record, the manifest generator and the base-fold rows (00:51), the messages to the review and the generator, and the batch\'s Workflow launch (01:23).',
  [5105,5371,5372,5420,5421,5480,5481,5482,5520,5534,5591,5645]),
 ('briefs-E_2026-11-09T0853Z-1420Z_post-batch-and-fidelity-inquiry.md','After the landing: the post-batch review (08:53), his inquiry\'s three scouts (09:22), the two record-landing Workflow launches (09:30, 11:59), the Fable fidelity review\'s brief (12:54) and the two asks sent to it (13:18, 13:19), the static-parameter scouts, the Opus rechecks, the investigation\'s scouts and judges, the stops, and this recovery scout\'s own brief (14:20).',
  [5925,5964,5965,5966,6084,6166,6239,6338,6360,6382,6408,6426,6444,6453,6591,6658,6664,6665,6666,6752,6753,6809,6811,7000]),
]
want={l for g in groups for l in g[2]}
calls={}
for i,d in lines():
    if i in want:
        calls[i]=(d['timestamp'],[t for t in tool_uses(d)])
    if i>max(want): break
summary=[]
for name,desc,ls in groups:
    out=[f"# Briefs to workers, {name.split('_',1)[1][:-3].replace('_',' ')}\n\n{desc}\n\nSource: `{J}`. L = 1-based line of the .jsonl. Each entry is the verbatim input of one tool call (Agent, SendMessage, Workflow, TaskStop), every field as written; nothing is cut. Tool results are left out.\n\n"]
    for l in ls:
        ts,tus=calls[l]
        for t in tus:
            if t['name'] not in ('Agent','Workflow','SendMessage','TaskStop'): continue
            inp=t['input']
            title=inp.get('description') or inp.get('to') or inp.get('scriptPath') or inp.get('task_id') or ''
            out.append(f"## L{l} · {ts[:19]}Z · {t['name']}{(' · '+title) if title else ''}\n\n")
            for k,v in inp.items():
                if isinstance(v,str) and ('\n' in v or len(v)>200):
                    out.append(f"**{k}:**\n\n{FENCE}\n{v}\n{FENCE}\n\n")
                else:
                    out.append(f"**{k}:** `{v if isinstance(v,str) else json.dumps(v,ensure_ascii=False)}`\n\n")
    s=''.join(out); open(OUT+name,'w').write(s); summary.append((name,len(s.encode())))
for x in summary: print(x)
