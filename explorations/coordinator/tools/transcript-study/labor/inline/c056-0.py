s=open('cls2.py').read()
old=s[s.index("    def writeclass():"):s.index("    base=dict(kinds=kinds")]
new='''    def pytargets():
        out=[]
        for ln,b in bodies:
            for m in re.finditer(r"open\\(\\s*([^,)]+)",b):
                out.append(m.group(1))
            for m in re.finditer(r"(?:^|\\n)\\s*(?:f|p|fn|path|file|fname|name|out|dst)\\s*=\\s*['\\"]([^'\\"]+)['\\"]",b):
                out.append(m.group(1))
            for m in re.finditer(r"for\\s+\\w+(?:,\\w+)*\\s+in\\s+\\[\\s*\\(?\\s*['\\"]([^'\\"]+)['\\"]",b):
                out.append(m.group(1))
        return out
    def writeclass():
        ex=[t for t in wr_targets if not t.startswith('(')]
        py=pytargets() if any(t.startswith('(python)') for t in wr_targets) or not ex else []
        tt=' '.join(ex+py)
        if not tt.strip(): tt=' '.join(files)
        if re.search(r'(REPORT|SKEPTIC|JUDGE|GATHER|REVIEW)[\\w.-]*\\.md|(^|/)record[\\w.-]*\\.md|decision-record|worker-report|RECORD\\.md',tt): return 'write:report'
        if re.search(r'scratchpad|(^|/)tmp/|/tmp/|probes?/|/p/|Sk\\w+\\.fss|Pb\\w+\\.fss|\\.sh\\b|\\.py\\b|\\.log\\b|\\.out\\b|\\.txt\\b|\\.json\\b|\\.tsv\\b',tt): return 'write:scratch'
        if re.search(r'compiler_tests|/tests/|\\.test\\b',tt): return 'write:test'
        if re.search(r'ProjectFortress/src|\\.scala|\\.java|Library/|LibraryBuiltin|Specification|\\.fs[si]\\b|\\.tex\\b|build\\.xml',tt): return 'write:product'
        if re.search(r'FACTS|ledger|INDEX|POSITIONS|PLAN|map/|\\.md\\b',tt): return 'write:kb'
        if re.search(r'\\.fss\\b',tt): return 'write:test'
        return 'write:scratch'
'''
s=s.replace(old,new)
open('cls2.py','w').write(s)
