import re
lines=open('/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/context-study/note-final.md').read().split('\n')
i=0;bad=0
while i<len(lines):
    if lines[i].startswith('|') and i+1<len(lines) and re.match(r'^\|[-| ]+\|$',lines[i+1]):
        n=lines[i].count('|'); j=i
        while j<len(lines) and lines[j].startswith('|'):
            if lines[j].count('|')!=n: print('BAD',j+1,lines[j].count('|'),n,lines[j][:80]); bad+=1
            j+=1
        i=j
    else: i+=1
print('bad rows',bad)
print(lines[0][:60]); print(sum(1 for l in lines if 'claude-' in l or 'Opus 5' in l))
