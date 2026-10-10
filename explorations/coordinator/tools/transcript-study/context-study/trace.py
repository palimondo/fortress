#!/usr/bin/env python3 -I
import json,sys
def short(s,n):
    s=' '.join(s.split())
    return s if len(s)<=n else s[:n]+'...'
def main(src,dst,textmax=700):
    d=json.load(open(src))
    turns=d['turns']
    out=[]
    for e in d['events']:
        tr=turns[e['turn']]
        ctx=tr['input']+tr['cc']+tr['cr']
        ts=e['ts'][11:19]
        if e['k']=='text':
            out.append('   > [%s t%d] %s'%(ts,e['turn'],short(e['text'],textmax)))
        else:
            i=e['input']; t=e['tool']
            if t=='Bash': s=i.get('command','')
            elif t in('Read',): s=i.get('file_path','')+' off=%s lim=%s'%(i.get('offset'),i.get('limit'))
            elif t in('Edit','Write'): s=i.get('file_path','')
            elif t=='Grep': s=json.dumps(i)
            else: s=json.dumps(i)
            out.append('#%d %s t%d ctx=%dk [%s] %s -> %dB'%(e['n'],ts,e['turn'],ctx//1000,t,short(s,150),e['rbytes']))
    open(dst,'w').write('\n'.join(out)+'\n')
    print(dst,len(out))
main(sys.argv[1],sys.argv[2],int(sys.argv[3]) if len(sys.argv)>3 else 700)
