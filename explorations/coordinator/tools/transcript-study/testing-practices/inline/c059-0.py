import pickle,re
allr=pickle.load(open('all.pkl','rb'))
rx=re.compile(r'\bant\b[^|;\n]*test(Fast|System|Only|Compiler|Library|OtherCompiler)|tracks\.sh|corpus\.sh|shard\.sh|SystemJUTest|CompilerJUTest|LibraryJUTest|OtherCompilerJUTest|enum-all')
for tag in ['b8','b9','b10']:
    for aid,a in allr[tag].items():
        role=a['label'].split(':')[0]
        if role in('gate','gather','review','commit','judge'): continue
        hits=[c for c in a['calls'] if c['name']=='Bash' and rx.search(c['input'].get('command','')) and not re.match(r'\s*(cat|sed|head|grep|ls)\b',c['input'].get('command',''))]
        if hits:
            print('###',tag,a['label'],aid[:6],len(hits))
            for c in hits[:8]:
                cm=re.sub(r'\s+',' ',c['input'].get('command',''))
                res=re.sub(r'\s+',' ',c['res'] or '')
                print(f"  [{c['i']} {c['ts'][11:19]}] {cm[:240]}\n      -> {res[:220]}")
