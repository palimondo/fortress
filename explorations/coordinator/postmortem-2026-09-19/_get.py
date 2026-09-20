import re,sys
D='/home/user/fortress/tmp/postmortem-2026-09-19/'
def user_msgs():
    txt=open(D+'user-messages.md').read().split('## B.')[0]
    ents=re.split(r'\n### (\d+)\. (\S+) ',txt)
    out=[]
    for i in range(1,len(ents),3):
        num,ts,rest=int(ents[i]),ents[i+1],ents[i+2]
        body=rest.split('\n',1)[1].strip() if '\n' in rest else ''
        out.append((num,ts,body))
    return out
def harness_msgs():
    txt=open(D+'user-messages.md').read().split('## B.')[1]
    ents=re.split(r'\n### (\d+)\. (\S+) ',txt)
    out=[]
    for i in range(1,len(ents),3):
        num,ts,rest=int(ents[i]),ents[i+1],ents[i+2]
        first=rest.split('\n',1)[0]
        body=rest.split('\n',1)[1].strip() if '\n' in rest else ''
        out.append((num,ts,first,body))
    return out
def assistant():
    txt=open(D+'assistant-text.md').read()
    ents=re.split(r'\n### (\d+)\. (\S+) ',txt)
    out=[]
    for i in range(1,len(ents),3):
        num,ts,rest=int(ents[i]),ents[i+1],ents[i+2]
        first=rest.split('\n',1)[0]
        body=rest.split('\n',1)[1].strip() if '\n' in rest else ''
        out.append((num,ts,first,body))
    return out
if __name__=='__main__':
    mode=sys.argv[1]
    if mode=='u':
        want=set(int(x) for x in sys.argv[2].split(','))
        for n,ts,b in user_msgs():
            if n in want: print(f"=== U{n} {ts}\n{b}\n")
    elif mode=='a':
        want=set(int(x) for x in sys.argv[2].split(','))
        for n,ts,f,b in assistant():
            if n in want: print(f"=== A{n} {ts} {f}\n{b}\n")
    elif mode=='alist':
        lo,hi=sys.argv[2],sys.argv[3]
        for n,ts,f,b in assistant():
            if lo<=ts<=hi: print(f"{n}\t{ts}\t{len(b)}\t{f}\t{' '.join(b.split())[:110]}")
    elif mode=='hlist':
        lo,hi=sys.argv[2],sys.argv[3]
        for n,ts,f,b in harness_msgs():
            if lo<=ts<=hi: print(f"{n}\t{ts}\t{len(b)}\t{f[:60]}\t{' '.join(b.split())[:100]}")
    elif mode=='hget':
        want=set(int(x) for x in sys.argv[2].split(','))
        for n,ts,f,b in harness_msgs():
            if n in want: print(f"=== H{n} {ts} {f}\n{b}\n")
