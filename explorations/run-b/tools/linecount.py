"""One instrument for every line count in the article: strip block comments
(* ... *), Python # comments and docstrings, and blank lines.  Usage:
tools/linecount.py FILE [--core]  (--core drops the (* TESTS *) region and the
component/import/export lines of the Fortress core)."""
import re, sys
path = sys.argv[1]; core = '--core' in sys.argv
s = open(path).read()
if path.endswith('.py'):
    s = re.sub(r'"""(.|\n)*?"""', '', s)
    lines = [l for l in s.split('\n') if l.strip() and not l.strip().startswith('#')]
    lines = [l for l in lines if not re.match(r'^\s*print\(', l)]  # print-only lines are not the algorithm
else:
    if core:
        s = re.sub(r'\(\* TESTS \*\)(.|\n)*?\(\* END TESTS \*\)', '', s)
    s = re.sub(r'\(\*(.|\n)*?\*\)', '', s)
    lines = [l for l in s.split('\n') if l.strip()]
    if core:
        lines = [l for l in lines if not re.match(r'^(component|import|export)\b', l)]
        if lines and lines[-1].strip() == 'end': lines = lines[:-1]   # the component's own end
print(len(lines), path)
