import re
s=open('parse.py').read()
s=s.replace("text=rtext(b.get('content'))[:0])","text=rtext(b.get('content')))")
s=s.replace("c['err']=r['err'] if r else False","c['err']=r['err'] if r else False\n            c['text']=r['text'] if r else ''")
open('parse.py','w').write(s)
