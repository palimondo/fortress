import re,json
from echo import texts,toks,unesc,BR,byid,blocks_judge
for l in ['judge:N','judge:C','judge:G']:
    t=BR[byid[l]]; B=blocks_judge(t)
    out,res=texts(byid[l])
    pre=toks(B['prefix'])
    rt=json.loads('"'+B['reportText'].split('"reportText": "',1)[1].rsplit('"',1)[0].rstrip(',').rstrip('"')+'"') if False else unesc(B['reportText'])
    parts=re.split(r'\n## ',rt)
    print('=====',l,'reportText sections: share of its citation tokens that appear in the judge\'s own calls and ruling')
    row=[]
    for p in parts[1:]:
        title=p.split('\n',1)[0][:34]
        tk=toks(p)-pre
        if len(tk)<8: continue
        ino=sum(1 for x in tk if x in out)
        row.append((title,len(p),len(tk),100*ino/len(tk)))
    for r in row: print('   %-36s %5d chars %3d tokens %3.0f%%'%r)
