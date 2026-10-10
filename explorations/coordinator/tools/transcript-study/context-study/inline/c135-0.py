import json,glob,os,re
names={}
for f in glob.glob('/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/agent-*.meta.json'):
    names[os.path.basename(f)[6:-10]]=json.load(open(f))['description']
tot=0
for i,n in sorted(names.items(),key=lambda x:x[1]):
    d=json.load(open(f'json/{i}.json'))
    hits=[e['n'] for e in d['events'] if e['k']=='call' and re.search(r'\.claude/skills|protocol\.md|CLAUDE\.md|SKILL\.md|Skill',json.dumps(e['input']))]
    tot+=len(hits)
    if hits: print(n,hits[:5])
print('agents with a skill/protocol/CLAUDE.md read:',tot)
# skill_listing attachment present?
import itertools
f='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/agent-ac7f17fcef729d710.jsonl'
for l in open(f):
    d=json.loads(l)
    if d['type']=='attachment' and d['attachment'].get('type')=='skill_listing':
        c=d['attachment']['content']; print('skill_listing names:',re.findall(r'^- ([a-z\-:]+):',c,re.M)[:12])
    if d['type']=='attachment' and d['attachment'].get('type')=='instructions':
        files=d['attachment'].get('files',[]); print('instructions files:',[x['path'] for x in files], [len(x['content']) for x in files])
