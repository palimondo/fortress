s=open('classify.py').read()
s=s.replace("""        w=seg.strip().split()
""","""        w=[x.lstrip('(') for x in seg.strip().split()]
        w=[x for x in w if x]
""")
s=s.replace("if w[0] in('source','.'): w=[]; break","if w[0] in('source','.'): w=[]; break")
s=s.replace("w[0] in('timeout','nohup','time','env','source','.')","w[0] in('timeout','nohup','time','env','source','.','!')")
open('classify.py','w').write(s)
