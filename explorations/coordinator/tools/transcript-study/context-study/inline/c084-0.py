import re
for w in 'WNGC':
    rt=open(f'recordText-{w}.md').read()
    print('=====',w)
    # split sections
    parts=re.split(r'^(## .*)$',rt,flags=re.M)
    for i in range(1,len(parts),2):
        head=parts[i]; body=parts[i+1].strip()
        print('###',head,len(body))
        if 'FACTS' in head:
            print(body[:1800])
        elif 'New rows' in head or head.startswith('## Ledger') and 'notes' not in head.lower():
            for l in body.split('\n'):
                if l.startswith('|') or l.startswith('- '): print('   ',l[:330])
        elif 'notes' in head.lower():
            for l in body.split('\n')[:14]: print('   ',l[:260])
