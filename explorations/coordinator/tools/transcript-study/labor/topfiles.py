import pickle,collections,os,re,sys
from cls import kind_of_path
O=pickle.load(open('acct.pkl','rb'))
def fname(f):
    b=os.path.basename(f)
    return b
def label_for(c):
    cls=c['cls']
    if cls=='read:kb:briefing': 
        return 'BRIEFING (facts-extract parts)'
    fs=[f for f in c['files'] if kind_of_path(f)] or c['files']
    fs=sorted(set(fname(f) for f in fs))
    return fs
def collect():
    per=collections.defaultdict(lambda:collections.defaultdict(lambda:[0.0,set()]))
    for aid,o in O.items():
        for c in o['calls']:
            if not (c['cls'].startswith('read:') or c['cls'] in('search','git:diff-show')): continue
            tok=c['res']+c['inp']
            lab=label_for(c)
            if isinstance(lab,str): labs=[lab]
            else: labs=lab
            if not labs:
                labs=['(%s: no file named)'%c['cls']]
            for l in labs:
                p=per[o['role']][l]; p[0]+=tok/len(labs); p[1].add(aid)
    return per
if __name__=='__main__':
    per=collect()
    nagents=collections.Counter(o['role'] for o in O.values())
    for role in per:
        tot=sum(v[0] for v in per[role].values())
        print('==',role,'n',nagents[role],'read tokens total %.0fK'%(tot/1000))
        for l,(t,s) in sorted(per[role].items(),key=lambda x:-x[1][0])[:10]:
            print('   %-48s %7.1fK  by %d of %d agents'%(l[:48],t/1000,len(s),nagents[role]))
