import sys, re, collections
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import chain, lines
NUM = re.compile(r"\b(ZZ32|ZZ64|NN32|NN64|ZZ|QQ|RR64|RR32|IntLiteral|FloatLiteral|Float|Int|Long|BigNum|UnsignedInt|UnsignedLong|Ratio|Number|AnyIntegral|Integral)\b")
cnt = collections.Counter(); ex = collections.defaultdict(list)
for l in open(sys.argv[1], encoding="utf-8"):
    q = l.rstrip("\n").split("\t")
    if len(q) < 4 or q[0] != sys.argv[2]: continue
    fn, ln = q[2].split(",")[0].split(":")[0], int(q[2].split(",")[0].split(":")[1])
    ls = lines(fn)[1]
    ch = chain(fn, ln)
    outer = [ls[j-1].strip() for j in ch[1:]]
    head = outer[-1] if outer else ls[ln-1].strip()
    # the nearest enclosing object/trait
    ot = next((o for o in outer if re.match(r"(value\s+)?(object|trait)\b", o)), None)
    own = ls[ln-1].strip()
    key = "in number type" if (ot and NUM.search(ot.split("extends")[0])) else ("number in signature" if NUM.search(own) else "other")
    cnt[(fn, key)] += 1
    if len(ex[(fn,key)]) < 2: ex[(fn,key)].append("%s:%d `%s` [in `%s`]" % (fn, ln, own[:90], (ot or head)[:70]))
for k, v in sorted(cnt.items()): print(k, v, ex[k])
