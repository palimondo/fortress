import pickle,re,json
allr=pickle.load(open('all.pkl','rb'))
a=allr['b10']['a9d085d2ca3d1673f']
t=a['first_user']
t=t.replace('\\n','\n')
print(len(t))
lines=t.split('\n')
for i,l in enumerate(lines):
    if re.search(r'testSystem|testFast|whole suite|the suite|suites|harness-one|junit\.sh|compileAll|library order|caches',l):
        print(i,l.strip()[:700])
