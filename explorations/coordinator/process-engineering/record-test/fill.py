import re, sys
# fill.py <copy dir> <questions.md> <out>: replace each {FACTS n} / {POSITIONS n} line by that copy's entry line n.
root, qpath, out = sys.argv[1:4]
files = {f: open(f'{root}/explorations/coordinator/{f}.md').read().split('\n') for f in ('FACTS', 'POSITIONS')}
def sub(m):
    line = files[m.group(1)][int(m.group(2)) - 1]
    assert line.startswith('- '), (m.group(0), line[:40])
    return line
src = open(qpath).read().replace('(each `{FACTS n}` or `{POSITIONS n}` line stands for one entry\'s text, quoted whole)', '(each quoted entry is one entry\'s text, whole)')
text = re.sub(r'\{(FACTS|POSITIONS) (\d+)\}', sub, src)
assert '{FACTS' not in text and '{POSITIONS' not in text
open(out, 'w').write(text)
print(out, len(text))
