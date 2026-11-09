import json, os, re
o=json.load(open('inv.json'))
W='2026-11-08T10:30:55'
P='/root/.claude/projects/'
def t(s): return s[5:16].replace('T',' ') if s else '?'
def kb(n): return f"{n/1024/1024:.1f} MB" if n>=1024*1024 else f"{n//1024} KB"
rel_main={
 'afdbb8018f4ca0581':('no','parallelism and STM'),
 'ad3dac2d4fdd1370c':('no','parallelism'),
 'a61358bab344fd4ba':('no','parallelism'),
 'a12b1a68b6e94f54d':('no','batch 28 revival page'),
 'a421837877044a60c':('partly','string literals, P-171, the literals family'),
 'ac2ff299a77bc84a9':('yes','float numerals, his 1(a), P-172'),
 'aaba07b723566e101':('yes','his literals words of 11-08 morning'),
 'a85ab3b6fac7e6360':('yes','literals in one frame, A or B'),
 'ab788d617139e5131':('partly','skill page changes 39-45 that started the literals question'),
 'aa80fd7516f372689':('yes','the fork review, reading A against B'),
 'adb5de56191ca655d':('partly','literal defect rows 943-945, F-326'),
 'a37131c71d9bee970':('partly','skill text on literals'),
 'a256165f4a8428dbd':('partly','skill pages on literals'),
 'af02c1de6155a7afd':('yes','the prototype; the hybrid and the Draft\'s way costed by reading'),
 'aafac99c72460c3b1':('partly','which text is the Working Draft'),
 'ac91c5820083789ef':('partly','row 362, a bare float numeral'),
 'af9cf1e7e90543f3f':('yes','the team\'s words on IntLiteral and FloatLiteral'),
 'a3fa92aa1a29e20f3':('yes','the Fable judgement of the design'),
 'ac2422589cefbd714':('yes','wrote P-173, P-174 (commit 69427e9422)'),
 'ac954552ef6deb79a':('yes','batch 29 record; fork N4 asFloat'),
 'a64a113431c74ff0b':('partly','rows 79, 486, 360; evidence'),
 'a459a8925cc17c6a5':('yes','reviewed batch 29 record; N1, N4 defaults that landed'),
 'a3b9d3e695e8f6d34':('partly','batch 29 manifest'),
 'ae4f447b4ed856eec':('partly','fold defect rows 954, 955'),
 'af36fb967acf817dc':('yes','post-batch review of batch 29'),
 'aeddde9dbb0eaddcc':('yes','his numeral words, 06:00-17:00'),
 'a0d7a9d5d9504224b':('yes','his numeral words, 17:00-02:00'),
 'a8d379de2c004dfa0':('yes','batch 29 numeral changes as landed'),
 'a6a75b819103255d2':('yes','the fidelity review; the asFloat asks'),
 'a04d256634839a3fd':('yes','his words, static parameters against fields (stopped)'),
 'a27712cee6a7af133':('yes','recheck (stopped at 13:32)'),
 'ac59f0da81e654791':('yes','his words, static parameters, completion'),
 'a0289bad70e8df565':('yes','recheck of his words against the readings'),
 'a5068e3afc3f9834c':('partly','attributions to him in commits'),
 'a2f9a76c30228c514':('partly','his 92 messages and 160 brief passages'),
 'a242ce2108f02d4e6':('partly','the coordinator\'s claims to him'),
 'a2f8c89829f50088b':('partly','judge of words given as his (stopped)'),
 'ac0846aa97f2d804d':('partly','judge of the coordinator\'s claims (stopped)'),
 'a0cb3bfbeffe02d8d':('yes','this recovery scout'),
}
headless={
 '49d16cbd-7290-48cb-a7a7-224ad2869300':('headless `claude -p` session: orientation writer, batch 28 record landing','Read your brief ... tools/orientation/write.md. Your mode: update. Your folder: climb-batch-28/orientation/','no'),
 'd082e56d-c744-4f7b-a99b-f9a51a19f35c':('headless `claude -p` session: skill writer, batch 28 record landing','first task: the revival-changes update from climb-batch-28/orientation/; second task: the cold read\'s flags','no'),
 '6e607825-12d2-4bf1-a6a4-741afbf403c5':('headless `claude -p` session: skill writer, the de-mixing of literal path behaviours (11-08 15:28)','take path behaviours out of revival-changes.md; second task: fix the cold read\'s 15 flags','partly'),
 '1e2c81fd-4d52-4d42-a8e3-a7ab9cc6c23f':('headless `claude -p` session: record writer (routing), batch 29 record landing','Read your brief ... climb-batch-29/record-landing/brief-routing.md','yes'),
 '99250d7f-9779-4a16-a787-b66a71c40ec1':('headless `claude -p` session: record writer (entries), batch 29 record landing','Read your brief ... climb-batch-29/record-landing/brief-entries.md','yes'),
 '124bb7b2-8f2b-4c86-abb0-a8ab4b05aaa0':('headless `claude -p` session: orientation writer, batch 29 record landing','Read your brief ... tools/orientation/write.md. Your mode: update. Your folder: climb-batch-29/orientation/','yes'),
 '2283395a-ba7c-432c-8c0b-0f0db1404cf3':('headless `claude -p` session: skill writer, batch 29 record landing','first task: the revival-changes update from climb-batch-29/orientation/; second task: the cold read\'s flags','yes'),
 '433d6217-ae51-4c03-a443-0423728f703f':('headless: record writer (routing), batch 28 record landing','brief-routing.md, batch 28','no'),
 '8a82c763-fc3c-4c24-a81f-ed3a08c0ac99':('headless: record writer (entries), batch 28 record landing','brief-entries.md, batch 28','no'),
 '45c6e456-ed6b-49ba-a539-34af0e48dff8':('headless: skill writer, page fixes','cold read flags on e9f828f3','no'),
 'dabed746-47e0-463f-96ff-9afe66b26acd':('headless: skill writer','lift and push a page change','no'),
}
runs={'wf_4690d700-6c9':'climb batch 28 record landing (the landing chain of 11-08; ended 11:50, the revival page agent of the main session followed at 11:54-11:57)',
      'wf_110667e0-c4a':'climb batch 29 run (launched 01:23 on 11-09, committed 7daf51fe8a at 08:49)',
      'wf_450f4ab6-51d':'climb batch 29 record landing (09:30-12:53 on 11-09, resumed at 11:59 after a container restart)',
      'wf_e14c1b80-a93':'climb batch 28 run (02:32-08:47 on 11-08)'}
def wfrel(x):
    h=x['hits']; n=h['NN/RPN']; p=h['P-174']
    if n>=50 or p>=30: return 'yes'
    if n>0 or p>0: return 'partly'
    return 'no'
inwin=[x for x in o if x['tmax']>=W]
out=[]
out.append("# Inventory of transcripts with content from 2026-11-08T10:30Z to now (2026-11-09 ~14:25Z)\n\n")
out.append("Made by the recovery scout at about 14:3x UTC on 11-09 from `/root/.claude/projects/`, by script (`tools/inv.py`, `tools/gen_inv.py` beside this file). A transcript is in the window when one of its lines carries a timestamp at or after 10:30:55Z on 11-08. Times are UTC, as MM-DD HH:MM, first to last timestamp. Size is the .jsonl's size on disk.\n\n")
out.append("Bears on the numeral design: for the main session's subagents, by the brief's subject (read from the brief's description and first lines); for workflow agents and headless sessions, by a keyword count, shown as `NN/RPN` (mentions of `NaturalNumeral` or `RadixPointNumeral`) and `P-174`: yes at 50 or more of the first or 30 or more of the second, partly when either is above 0, no when both are 0. The count is a proxy for the subject, not a reading of the content.\n\n")
out.append("Nothing was missing from disk, so the blinded backup (`/home/user/fortress-transcripts-blinded/`) was not needed.\n\n")
# counts
main=[x for x in inwin if x['path'].endswith('fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl')]
subs=[x for x in inwin if '/subagents/agent-' in x['path']]
wfa=[x for x in inwin if '/workflows/' in x['path'] and 'agent-' in x['path']]
jr=[x for x in inwin if x['path'].endswith('journal.jsonl')]
hl=[x for x in inwin if x not in main+subs+wfa+jr]
# journals have no timestamps: add by run
jr=[x for x in o if x['path'].endswith('journal.jsonl') and any(r in x['path'] for r in ('wf_4690d700-6c9','wf_110667e0-c4a','wf_450f4ab6-51d'))]
out.append("## Counts\n\n")
out.append(f"- Main coordinating session: {len(main)}.\n- Subagents of the main session (Agent tool): {len(subs)}, one of them this scout.\n- Workflow agents: {len(wfa)}, in 3 workflow runs, with the runs' 3 journals (no timestamps; counted with their runs).\n- Headless `claude -p` sessions (record writers, writer streams, skill writers): {len(hl)}.\n- Other coordinating sessions: 0. Every other session in the project folders is a headless writer session, started by a tool of the record landing or by the coordinator; none has a message typed by the curator.\n- Total in the window: {len(main)+len(subs)+len(wfa)+len(hl)} transcripts, plus 3 journals.\n- Outside the window, for completeness: 13 earlier subagents of the main session, the climb batch 28 run `wf_e14c1b80-a93` (20 agents and its journal, 02:32-08:47 on 11-08), the first 5 agents of `wf_4690d700-6c9` (09:22-10:21), and 4 headless sessions (two landing-28 record writers, 09:41-10:21; `45c6e456` 01:08-02:06; `dabed746` 11-07 23:28-23:29).\n\n")
out.append("## 1. Main coordinating session\n\n")
for x in main:
    out.append(f"- `{x['path']}`\n  - kind: main session; span in the window 11-08 10:34 to 11-09 14:20 (whole file 11-07 06:44 to {t(x['tmax'])}); {kb(x['size'])}, {x['lines']} lines.\n  - what: the coordinating session with the curator. In the window: 82 messages of his (lines 2894 to 6983, 1-based), four compactions (L3305, L5159, L6491, L6835), models Opus to 13:22 on 11-08, Fable 13:22 to 23:33, Opus 23:33 to 13:54 on 11-09, Fable after.\n  - bears on the numeral design: yes, the source of record for his words.\n\n")
out.append("## 2. Subagents of the main session\n\nFolder: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/`. Each line: file, model, span, size, the coordinator's description of the brief, bears on numerals.\n\n")
for x in sorted(subs,key=lambda x:x['tmin']):
    aid=x['path'].split('agent-')[1][:17]
    r,why=rel_main.get(aid,('?',''))
    out.append(f"- `agent-{aid}.jsonl` · {x['model'] or '?'}{(' '+x['effort']) if x['effort'] else ''} · {t(x['tmin'])} to {t(x['tmax'])} · {kb(x['size'])} · \"{x['desc']}\" · **{r}**{(' ('+why+')') if why else ''}\n")
out.append("\n## 3. Workflow agents\n\nFolder: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/<run>/`. The run's script and result are in `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/workflows/<run>.json`. Each agent's first message is a computed task (its brief) that the script made from the batch record's manifest. Each line: file, role, model, span, size, keyword counts, bears on numerals.\n\n")
for run in ['wf_4690d700-6c9','wf_110667e0-c4a','wf_450f4ab6-51d']:
    xs=sorted([x for x in wfa if run in x['path']],key=lambda x:x['tmin'])
    j=[x for x in jr if run in x['path']][0]
    tot=sum(x['size'] for x in xs)
    out.append(f"### `{run}`: {runs[run]}\n\n{len(xs)} agents in the window, {kb(tot)} in all; journal `{run}/journal.jsonl` ({kb(j['size'])}, {j['lines']} lines, no timestamps).\n\n")
    for x in xs:
        aid=x['path'].split('agent-')[1][:17]; h=x['hits']
        out.append(f"- `agent-{aid}.jsonl` · {x['desc']} · {x['model']} · {t(x['tmin'])} to {t(x['tmax'])} · {kb(x['size'])} · NN/RPN {h['NN/RPN']}, P-174 {h['P-174']}, asFloat {h['asFloat']} · **{wfrel(x)}**\n")
    out.append("\n")
out.append("Notes on the batch 29 run's roles (from the rung slugs in each brief): N `rung-numeral-types` (the library's numeral types and walk's numerals), C `rung-numeral-checker` (the checker's default), F `rung-literal-fold` (the fold), G `rung-walk-language-types` (walk at language types), S `rung-string-literals`, T `rung-literals-spec` (the specification's text).\n\n")
out.append("## 4. Headless sessions (`claude -p`), and other coordinating sessions\n\nNo other coordinating session exists in the window. Each file below opens with the standing brief of a headless writer (\"a headless Claude session that edits the project skills, started fresh by `tools/skill-writer.sh`\", or the record-landing's writer brief) and has no message typed by the curator.\n\n")
for x in sorted(hl,key=lambda x:x['tmin']):
    sid=os.path.basename(x['path'])[:-6]; k,first,r=headless.get(sid,('?','','?')); h=x['hits']
    out.append(f"- `{x['path']}`\n  - kind: {k}; span {t(x['tmin'])} to {t(x['tmax'])}; {kb(x['size'])}, {x['lines']} lines.\n  - task: {first}.\n  - keyword counts: NN/RPN {h['NN/RPN']}, P-174 {h['P-174']}, asFloat {h['asFloat']}, IntLiteral/FloatLiteral {h['IL/FL']}. Bears on the numeral design: **{r}**.\n")
out.append("\n## 5. Outside the window (listed so that the list is whole)\n\n")
for x in sorted([x for x in o if x['tmax']<W and '/subagents/' not in x['path']],key=lambda x:x['tmin']):
    sid=os.path.basename(x['path'])[:-6]; k,first,r=headless.get(sid,('?','',''))
    out.append(f"- `{x['path']}` · {k} · {t(x['tmin'])} to {t(x['tmax'])} · {kb(x['size'])}\n")
out.append(f"- 13 subagents of the main session that ended before 10:30 on 11-08, and the run `wf_e14c1b80-a93` (climb batch 28, 20 agents and its journal), and the first 5 agents of `wf_4690d700-6c9` (09:22 to 10:21).\n")
open('/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/inventory.md','w').write(''.join(out))
print(len(main),len(subs),len(wfa),len(hl),len(jr))
print(sum(1 for x in o if x['tmax']<W and '/subagents/agent-' in x['path']), sum(1 for x in o if x['tmax']<W and 'wf_4690' in x['path']))
