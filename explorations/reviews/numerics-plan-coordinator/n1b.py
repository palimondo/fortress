import sys, re, collections
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import chain, lines
cnt = collections.Counter()
for l in open(sys.argv[1], encoding="utf-8"):
    q = l.rstrip("\n").split("\t")
    if len(q) < 4 or q[0] != sys.argv[2]: continue
    fn, ln = q[2].split(",")[0].split(":")[0], int(q[2].split(",")[0].split(":")[1])
    ls = lines(fn)[1]
    ch = chain(fn, ln)
    outer = [ls[j-1].strip() for j in ch[1:]]
    ot = next((o for o in outer if re.match(r"(value\s+)?(object|trait)\b", o)), None)
    name = re.match(r"(?:value\s+)?(?:object|trait)\s+([\w]+)", ot).group(1) if ot else "(top level)"
    cnt[(fn, name)] += 1
for k, v in sorted(cnt.items()): print(v, k)
