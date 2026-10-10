s=open('cls2.py').read()
s=s.replace("""        if ks: cls='read:'+ks[0]
        elif dk: cls='read:'+dk
        else: cls='read:other'""","""        if re.search(r'subagents/workflows|tool-results|prev-transcript|\\.jsonl',sc): cls='read:transcripts'
        elif ks: cls='read:'+ks[0]
        elif dk: cls='read:'+dk
        elif re.search(r'tmp/',sc): cls='read:output'
        else: cls='read:other'""")
s=s.replace("""    elif pyread: cls='other:analysis'""","""    elif pyread:
        cls='read:transcripts' if re.search(r'subagents/workflows|\\.jsonl',sc+bodytxt) else 'other:analysis'""")
open('cls2.py','w').write(s)
