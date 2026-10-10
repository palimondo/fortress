s=open('classify.py').read()
s=s.replace("si=re.search(r'sed\\s+-i\\s+\\S+\\s+(\\S+)',c)","si=re.search(r'sed\\s+-i\\s+\\S+\\s+(\\S+)',seg)")
open('classify.py','w').write(s)
