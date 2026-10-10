import sys
sys.path.insert(0,'.')
import classify as C, summarize as Z, final as F
for w in 'WNGC':
    d=C.load(w)
    print(w,[c['n'] for c in d['events'] if c['k']=='call' and c['n']<=Z.WIN[w][1] and F.labels(w,c)==['GIT']])
