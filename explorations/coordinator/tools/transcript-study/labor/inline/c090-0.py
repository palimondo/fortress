s=open('cls2.py').read()
s=s.replace("    dk=dirkind(sc)\n    def pytargets","    dk=dirkind(re.sub(r'\"[^\"]*\"|\\'[^\\']*\\'','\"\"',sc))\n    def pytargets")
open('cls2.py','w').write(s)
