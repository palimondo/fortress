import re,sys
# For each tracked .tex, collect commented Fortress lines (starting with % or %%), join clause text from 'extends' to 'excludes|comprises|where|end|$ newline-without-continuation',
# and report any generic name that occurs twice with '[\' within one extends clause.
files=[l.strip() for l in open(sys.argv[1])]
for f in files:
    try: lines=open(f,encoding='utf-8',errors='replace').read().split('\n')
    except Exception as e: continue
    for i,l in enumerate(lines):
        if not l.lstrip().startswith('%'): continue
        s=l.lstrip('%')
        m=re.search(r'\bextends\b(.*)',s)
        if not m: continue
        clause=m.group(1)
        # continue onto following comment lines while braces unbalanced
        j=i; depth=clause.count('{')-clause.count('}')
        while depth>0 and j+1<len(lines) and lines[j+1].lstrip().startswith('%'):
            j+=1; nxt=lines[j].lstrip('%'); clause+=' '+nxt; depth+=nxt.count('{')-nxt.count('}')
        names=re.findall(r'([A-Za-z_][A-Za-z_0-9]*)\[\\',clause)
        from collections import Counter
        c=Counter(names)
        d=[n for n,k in c.items() if k>1]
        if d: print(f"{f}:{i+1}: {d} :: {clause.strip()[:160]}")
