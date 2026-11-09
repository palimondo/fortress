import sys,json; sys.path.insert(0,'/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/tools')
from rd import *
a,b=sys.argv[1],sys.argv[2]; w=int(sys.argv[3]) if len(sys.argv)>3 else 110
for i,d in lines(a=a, b=b):
    k=kind(d)
    if k=='his': print(i,d['timestamp'][5:19],'HIS',len(his_text(d)),'|',his_text(d)[:60].replace('\n',' / '))
    elif k=='asst':
        s=asst_text(d)
        if s.strip() and len(s)>2: print(i,d['timestamp'][5:19],'ASST',len(s),'|',s[:w].replace('\n',' / '))
        for t in tool_uses(d):
            if t['name'] in ('Agent','Workflow','SendMessage','Task','TaskStop'):
                inp=t['input']; print(i,d['timestamp'][5:19],'CALL',t['name'],inp.get('description') or inp.get('to') or inp.get('scriptPath') or inp.get('task_id') or '', inp.get('model',''), len(json.dumps(inp)))
    elif k=='compact': print(i,d['timestamp'][5:19],'COMPACT')
    elif k.startswith('harness:<command'): print(i,d['timestamp'][5:19],'CMD',his_text(d)[:40].replace('\n',' '))
