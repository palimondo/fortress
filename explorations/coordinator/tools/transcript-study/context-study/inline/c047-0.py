s=open('classify.py').read()
old=s[s.index("    # edits to tracked files / commits"):s.index("def classify(call")]
new='''    # edits to tracked files / commits
    cq=re.sub(r"'[^']*'","''",c); cq=re.sub(r'"[^"]*"','""',cq)
    for seg in re.split(r'&&|\\|\\||;|\\n',cq):
        if re.search(r'git\\s+(mv|commit|add|reset|checkout\\s+--|stash)|sed\\s+-i|\\btee\\b',seg):
            si=re.search(r'sed\\s+-i\\s+\\S+\\s+(\\S+)',c)
            if re.search(r'git\\s+(mv|commit|add|reset|checkout)',seg): tags.append('EDIT')
            elif si:
                rel=repo_rel(si.group(1),cwd)
                if rel and not rel.startswith('tmp/'): tags.append('EDIT')
        m=re.search(r'(?<![<>2&=])>(?!=)\\s*([^\\s|&;>]+)',seg)
        if m:
            tgt=m.group(1).strip('\\'"')
            if tgt.startswith('&') or tgt.startswith('/dev/null') or tgt.startswith('/tmp/'): continue
            rel=repo_rel(tgt.replace('$S','/home/user/x/tmp/s'),cwd) if not tgt.startswith('$') else None
            if rel and not rel.startswith('tmp/'): tags.append('EDIT')
    return tags
'''
s=s.replace(old,new)
# tool-based classification of Edit/Write
s=s.replace("    return ['SETUP']\ndef tok(call)","    if t in('Edit','Write'): return ['EDIT']\n    return ['SETUP']\ndef tok(call)")
open('classify.py','w').write(s)
