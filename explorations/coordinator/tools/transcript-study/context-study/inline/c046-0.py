s=open('classify.py').read()
s=s.replace("EXT=r'(fss|fsi|","EXT=r'(fss|fsi|fs[?*]|")
s=s.replace("        isfile=bool(re.search(r'\\.'+EXT+r'$',tok))","        isfile=bool(re.search(r'\\.'+EXT+r'$',tok))")
# edit detection
s=s.replace("    return tags\ndef classify(call","""    # edits to tracked files / commits
    for seg in re.split(r'&&|\\|\\||;|\\n',c):
        if re.search(r'git\\s+(mv|commit|add|reset|checkout\\s+--|stash)|sed\\s+-i|\\btee\\b',seg):
            if not re.search(r'sed\\s+-i[^|]*\\btmp/',seg) or re.search(r'git\\s+(mv|commit|add)',seg): tags.append('EDIT')
        m=re.search(r'(?<![<>2&])>\\s*([^\\s|&;>]+)',seg)
        if m and not re.match(r'^(/dev/null|/tmp/|tmp/|\\$|/home/user/[^/]*/tmp/|\\&)',m.group(1)) and not m.group(1).startswith('&'):
            tags.append('EDIT')
    return tags
def classify(call""",1)
open('classify.py','w').write(s)
