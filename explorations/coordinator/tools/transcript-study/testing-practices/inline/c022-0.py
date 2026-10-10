import pickle,json
allr=pickle.load(open('all.pkl','rb'))
a=allr['b8']['a226d80289a5176a7']
print(a['first_user'])
for c in a['calls'][:6]:
    print(c['i'],c['name'],json.dumps(c['input'])[:600])
    print('  ->',(c['res'] or '')[:300])
