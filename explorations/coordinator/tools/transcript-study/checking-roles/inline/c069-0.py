import pickle
A=pickle.load(open('agents.pkl','rb'))
for a in A.values():
    if a['batch']==10 and a['label']=='skeptic:G':
        for k in (5,6,7,8,9):
            for c in a['turns'][k]['calls']:
                print(k,c['rbytes'],(c['input'].get('command') or '')[:420].replace('\n',' ⏎ '))
                print('   ->',c['text'][:300].replace('\n',' ⏎ '))
