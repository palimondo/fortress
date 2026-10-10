src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
def span(tag,label,i0,i1):
    for aid,a in allr[tag].items():
        if a['label']==label:
            s=0;n=0
            for k,c in enumerate(a['calls']):
                if i0<=c['i']<=i1 and c['name'] in('Bash','TEXT'):
                    s+=call_cost(a,k) if c['name']=='Bash' else 0; n+=1
            return n,s
print('skeptic2:Q 53-68',span('b8','skeptic2:Q',53,68))
print('rung:I 107-115 (serialized misread? no)',span('b8','rung:I',107,115))
print('b8 builds total ITE (all agents)')
tot=0;n=0;red=0
for tag in ['b8','b9','b10']:
    s=0;cnt=0
    for aid,a in allr[tag].items():
        for k,c in enumerate(a['calls']):
            if c['name']=='Bash' and re.search(r'\bant\b[^|;\n]*compileAll|compileAll[-.\w]*\.(log|txt)',c['input'].get('command','')):
                s+=call_cost(a,k);cnt+=1
    print(tag,'compileAll-related calls',cnt,'ITE %.0fK'%(s/1e3))
# W suite episode cost b10 calls 114-150
print('b10 W suite episode 114-150',span('b10','rung:W',114,150))
print('b10 N subset episode 178-190',span('b10','rung:N',178,190), span('b10','rung:N',229,232))
print('b10 G subset episode 118-134',span('b10','rung:G',118,134))
print('b9 Wp suite episode 76-90',[span('b9','rung:W',76,90)])
