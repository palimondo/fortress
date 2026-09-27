import sys, re, collections
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import lines, number_bound
def shape(loc, msg, src):
    if msg.startswith("Filter expressions"): return "F filter cascade (an if/while test whose comparison failed)"
    if re.search(r"call to operator (<|>|<=|>=) - .*\((I|J|K), IntLiteral\)", msg): return "A compare a type-parameter value with a numeral"
    if re.search(r"call to operator \? - .*\(I, IntLiteral\)", msg): return "C DOTPLUS 1"
    if re.search(r"call to operator MOD - .*\(Integral\[\\I\\\], IntLiteral\)", msg): return "D MOD 2 on self"
    if re.search(r"call to operator (\+|-|juxtaposition) - .*\((I|J|K), IntLiteral\)", msg): return "B arithmetic of a type-parameter value with a numeral"
    if re.search(r"Right-hand side has type IntLiteral, but declared type is [IJK]", msg): return "F2 numeral bound to a variable of type I"
    if re.search(r"body has type \(?IntLiteral(, IntLiteral)*\)?, but declared return type is", msg): return "E2 numeral returned at a type parameter"
    if re.search(r"call to function \w+ - \[\\", msg) and "IntLiteral" in msg and "RangeInternals" in loc: return "E numeral argument at a type-parameter parameter (constructor/helper)"
    if re.search(r"has type OR\(IntLiteral,T\)", msg): return "G numeral in a generic's else branch at T"
    if "LeftRange[\\IntLiteral\\]" in msg or re.search(r"operator # - ", msg): return "H range over a numeral (and a ZZ32)"
    return "Z other: " + msg[:60]
cnt = collections.Counter(); ex = collections.defaultdict(list)
for l in open(sys.argv[1], encoding="utf-8"):
    q = l.rstrip("\n").split("\t")
    if len(q) < 4 or q[0] != "I3": continue
    fn, ln = q[2].split(":")[0], int(q[2].split(":")[1])
    src = lines(fn)[1][ln-1].strip()
    s = shape(q[2], q[3], src)
    cnt[s] += 1
    ex[s].append("%s `%s`" % (q[2], src[:100]))
for s, n in sorted(cnt.items()):
    print("%4d %s" % (n, s))
    for e in ex[s][:int(sys.argv[2]) if len(sys.argv)>2 else 4]: print("        ", e)
print(sum(cnt.values()))
