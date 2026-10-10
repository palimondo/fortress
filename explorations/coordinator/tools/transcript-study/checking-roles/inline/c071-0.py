import pickle
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
for lab in ['skeptic2:N','skeptic2:G']:
    for o in O.values():
        if o['batch']==10 and o['label']==lab:
            for c in o['calls']:
                if c['cls']=='read:rung:artifacts':
                    print(lab,c['turn'],c['rbytes'],(c['input'].get('command') or c['input'].get('file_path') or '')[:230].replace('\n',' ⏎ '))
