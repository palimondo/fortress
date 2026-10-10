import os,re
F=open('explorations/coordinator/FACTS.md').read()
I=open('explorations/coordinator/INDEX.md').read()
L=open('explorations/fortress-gap-ledger.md').read()
P=open('explorations/coordinator/POSITIONS.md').read()
rd=sorted(d for d in os.listdir('explorations/compile-ladder') if d.startswith('rung-'))
nf=ni=nl=0;unf=[];tot=0;unsz=0
for d in rd:
    p=f'explorations/compile-ladder/{d}'
    rs=os.path.getsize(p+'/REPORT.md') if os.path.exists(p+'/REPORT.md') else 0
    tot+=rs
    inF=d in F; inI=d in I; inL=d in L
    nf+=inF; ni+=inI; nl+=inL
    if not inF: unf.append((d,rs)); unsz+=rs
print('rung dirs',len(rd),'REPORT bytes',tot)
print('named in FACTS',nf,'in INDEX',ni,'in ledger',nl)
print('not named in FACTS',len(unf),unsz,'bytes', sorted(unf,key=lambda x:-x[1])[:10])
# climb-batch records
cb=sorted(d for d in os.listdir('explorations/compile-ladder') if d.startswith('climb-batch'))
print(cb)
# FACTS entries count and sections
print('FACTS entries (bold titles)',len(re.findall(r'^- \*\*',F,re.M)),'sections',len(re.findall(r'^## ',F,re.M)))
# ledger rows
print('ledger rows',len(re.findall(r'^\| \d+ \|',L,re.M)))
