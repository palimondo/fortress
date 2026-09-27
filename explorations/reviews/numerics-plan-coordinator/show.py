import sys
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import lines, number_bound
cls = sys.argv[2]; p = sys.argv[1]; w = int(sys.argv[3]) if len(sys.argv) > 3 else 200
for l in open(p, encoding="utf-8"):
    q = l.rstrip("\n").split("\t")
    if len(q) < 4 or q[0] != cls: continue
    loc = q[2]; first = loc.split(",")[0]
    src = ""
    if ":" in first:
        fn, ln = first.split(":")[0], int(first.split(":")[1])
        x = lines(fn)
        if x: src = x[1][ln-1].strip()
    b, _ = number_bound(first.split(":")[0], int(first.split(":")[1])) if ":" in first else (set(), [])
    print("%-40s %-10s | %s\n      MSG %s" % (loc, ",".join(sorted(b)) or "-", src[:150], q[3][:w]))
