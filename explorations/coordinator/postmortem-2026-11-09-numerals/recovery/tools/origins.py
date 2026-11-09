import sys, json, re
sys.path.insert(0, '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/tools')
from rd import *
terms = {
 'getter/accessor': r'\bgetters?\b|\baccessors?\b',
 'fields (numeral)': r'\bfields?\b',
 'one value': r'\bone value\b',
 'once per class / at load': r'once per class|at load|class loads|load time|when the class loads',
 'not (as) static parameters': r'not (as )?static parameters',
 'asFloat': r'asFloat',
 'constant folding': r'constant[- ]fold',
 'compile[- ]time conversion': r'compile[- ]time (conversion|convert)|conversion happens at compile time|compile time thing',
 'static parameter(s)': r'static param',
 'generic parameter(s)': r'generic param',
 'NaturalNumeral': r'NaturalNumeral|natural numeral',
 'RadixPointNumeral': r'RadixPointNumeral|radix point numeral|Redix point numeral',
 'hybrid': r'\bhybrid\b',
 "program's own type / custom number type": r"program's own (number )?type|custom (numeric|number) type",
 'stamp': r'\bstamp',
 'constructor': r'\bconstructor\b',
}
A=sys.argv[1] if len(sys.argv)>1 else '2026-11-08T10:30:55'
B=sys.argv[2] if len(sys.argv)>2 else '2026-11-09T14:30'
N=int(sys.argv[3]) if len(sys.argv)>3 else 4
sel=sys.argv[4].split(',') if len(sys.argv)>4 else list(terms)
found={t:{'his':[],'coord-text':[],'coord-tool':[]} for t in terms}
for i,d in lines(a=A,b=B):
    k=kind(d); srcs=[]
    if k=='his': srcs=[('his',his_text(d))]
    elif k=='asst':
        srcs=[('coord-text',asst_text(d))]
        for t in tool_uses(d):
            srcs.append(('coord-tool',t['name']+': '+json.dumps(t['input'],ensure_ascii=False)))
    for who,s in srcs:
        for t,p in terms.items():
            if t not in sel: continue
            L=found[t][who]
            if len(L)>=N: continue
            m=re.search(p,s,re.I)
            if m: L.append((i,d['timestamp'][5:19],s[max(0,m.start()-110):m.end()+110].replace('\n',' / ')))
for t in sel:
    print('#####',t)
    for who in ('his','coord-text','coord-tool'):
        for x in found[t][who]: print('  ',who,'L%d'%x[0],x[1],'|',x[2])
