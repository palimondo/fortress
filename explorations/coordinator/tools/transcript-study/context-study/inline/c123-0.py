s=open('final.py').read()
s=s.replace("""def labels(w,c):
    tg=Z.OVR[w].get(c['n']) or C.classify(c,C.ROOTS[w])""","""import re
HIST=re.compile(r'git\\s+(-C\\s+\\S+\\s+)?(log\\s+(-S|--all|--follow|--format=[^;]*-S)|log\\s+[^;|]*-S|blame|show\\s+[0-9a-f]{7,}|diff\\s+[0-9a-f]{7,}\\^)')
def labels(w,c):
    if c['tool']=='Bash' and HIST.search(c['input'].get('command','')) and w in('N','G','C','W') and 'EDIT' not in C.classify(c,C.ROOTS[w]):
        return ['GIT']
    tg=Z.OVR[w].get(c['n']) or C.classify(c,C.ROOTS[w])""")
open('final.py','w').write(s)
