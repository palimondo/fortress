# errs.py <checker-run.txt>: one line per checker error, its locations then its first message line, for diffing two runs of the checker count.
import re,sys
recs=[];locs=[];msg=None
lines=open(sys.argv[1],errors='replace').read().split('\n')
for line in lines:
    m=re.match(r'^(/\S+?):(\d+:\S*?):?\s*$',line)
    if m:
        if msg is not None:
            recs.append((locs,msg)); locs=[]; msg=None
        locs.append(m.group(1).split('/')[-1]+':'+m.group(2)); continue
    if locs and line.startswith('    ') and msg is None:
        msg=line.strip()
    elif locs and msg is not None and not line.startswith((' ', '\t')):
        recs.append((locs,msg)); locs=[]; msg=None
if locs and msg: recs.append((locs,msg))
for l,m in recs: print(' '.join(l)+'\t'+m)
