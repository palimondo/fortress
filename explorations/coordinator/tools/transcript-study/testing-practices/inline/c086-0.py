import pickle,re
allr=pickle.load(open('all.pkl','rb'))
n=0
for tag,ag in allr.items():
    for aid,a in ag.items():
        for k,c in enumerate(a['calls']):
            cmd=c['input'].get('command','') if c['name']=='Bash' else ''
            if 'junit.sh' in cmd and not re.match(r'\s*(cat|sed|head|grep|ls)\b',cmd) and c['res']:
                r=c['res']
                bad=re.search(r'parameter null or not set|No such file or directory|cannot|Cannot|label|usage|FileNotFound|Not a directory|command not found',r)
                if bad:
                    n+=1
                    m=re.sub(r'\s+',' ',r)
                    s=m.find(bad.group(0))
                    print(tag,a['label'],c['i'],re.sub(r'\s+',' ',cmd)[:180].replace('/home/user/',''),'\n    ->',m[max(0,s-100):s+150])
print(n)
