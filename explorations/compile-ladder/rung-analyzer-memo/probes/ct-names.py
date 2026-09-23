# Print every unit named by a tests= line of ProjectFortress/compiler_tests/*.test, continuation lines joined.
import glob, re, sys
names = set()
for f in glob.glob(sys.argv[1] + '/ProjectFortress/compiler_tests/*.test'):
    lines = open(f, encoding='utf-8', errors='replace').read().split('\n')
    i = 0
    while i < len(lines):
        if lines[i].startswith('tests='):
            v = lines[i][len('tests='):]
            while v.rstrip().endswith('\\') and i + 1 < len(lines):
                v = v.rstrip()[:-1] + ' ' + lines[i + 1]; i += 1
            names.update(n for n in re.split(r'[\s,]+', v) if n)
        i += 1
print('\n'.join(sorted(names)))
