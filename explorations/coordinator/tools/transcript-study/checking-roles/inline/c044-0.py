import re
s=open('echo.py').read()
s=s.replace("B='/root/.claude","BD='/root/.claude").replace("open(f'{B}/agent-{aid}.jsonl')","open(f'{BD}/agent-{aid}.jsonl')")
s=s.replace("""PATH=re.compile(r'[A-Za-z0-9_./-]*?([A-Za-z0-9_-]+\\.(?:fss|fsi|tex|scala|java|md|tsv|test|sh))')""","""PATH=re.compile(r'[A-Za-z0-9_./-]*?([A-Za-z0-9_-]+\\.(?:fss|fsi|tex|scala|java|md|tsv|test|sh)(?::\\d+)?)')""")
s=s.replace("""    for m in re.finditer(r'\\brows? (\\d{3})\\b',s): T.add('row'+m.group(1))""","""    for m in re.finditer(r'\\brows? (\\d{3})\\b',s): T.add('row'+m.group(1))
    for m in re.finditer(r'`([^`\\n]{6,60})`',s): T.add(m.group(1))""")
s=s.replace("        B=blocks_judge(t)\n        pre=toks(B['prefix'])","        BL=blocks_judge(t)\n        pre=toks(BL['prefix'])").replace("for name,txt in B.items():","for name,txt in BL.items():")
open('echo.py','w').write(s)
