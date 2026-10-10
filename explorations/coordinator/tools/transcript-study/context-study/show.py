#!/usr/bin/env python3 -I
import json,sys
W={'W':'ac7f17fcef729d710','N':'a9d085d2ca3d1673f','G':'ad8b9ef1d620d222e','C':'a17102eab231ad505'}
w=sys.argv[1]; a=int(sys.argv[2]); b=int(sys.argv[3]); cm=int(sys.argv[4]) if len(sys.argv)>4 else 500; rm=int(sys.argv[5]) if len(sys.argv)>5 else 400
d=json.load(open(f'json/{W[w]}.json'))
for e in d['events']:
    if e['k']=='call' and a<=e['n']<=b:
        i=e['input']
        s=i.get('command') or i.get('file_path','')+' %s %s'%(i.get('offset'),i.get('limit')) if e['tool']!='Edit' else i.get('file_path')+' || '+i.get('old_string','')[:200]+' => '+i.get('new_string','')[:300]
        if e['tool'] in('TaskCreate','TaskUpdate'): s=json.dumps(i)
        print('#%d [%s] %s'%(e['n'],e['tool'],' '.join(s.split())[:cm]))
        print('    RES(%dB): %s'%(e['rbytes'],' '.join(e['res'].split())[:rm]))
