import json,re,sys
sys.path.insert(0,'.')
import classify as C
after={'W':13,'N':10,'G':6,'C':10}
for w in 'WNGC':
    d=C.load(w)
    for c in d['events']:
        if c['k']=='call' and c['n']>after[w] and c['tool']=='Bash' and re.search('POSITIONS|positions:',c['input'].get('command','')):
            cmd=c['input']['command']; i=re.search('POSITIONS|positions:',cmd).start()
            print(w,c['n'],c['ts'][11:19],cmd[max(0,i-100):i+160].replace('\n',' ⏎ '))
