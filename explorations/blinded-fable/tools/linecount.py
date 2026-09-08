"""Count non-blank, non-comment source lines per (* FIG *) region and the test region."""
import re, sys
src = open(sys.argv[1]).read()
def count(body):
    n = 0
    for ln in body.split('\n'):
        t = ln.strip()
        if not t or t.startswith('(*') and t.endswith('*)'): continue
        n += 1
    return n
regions = {m.group(1): count(m.group(2)) for m in re.finditer(r'\(\* FIG (\w+) \*\)\n(.*?)\n\(\* END FIG \*\)', src, flags=re.S)}
tests = re.search(r'\(\* TESTS \*\)(.*?)\(\* END TESTS \*\)', src, flags=re.S)
regions['TESTS'] = count(tests.group(1)) if tests else 0
total = count(src)
for k, v in regions.items(): print('%-10s %4d' % (k, v))
print('%-10s %4d' % ('file', total), '(unmarked lines: %d)' % (total - sum(regions.values())))
