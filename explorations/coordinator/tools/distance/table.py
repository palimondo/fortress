#!/usr/bin/env python3
"""table.py <run.txt> [<library source>] : the distance stage's rows, from one DistanceMulti run
(run.sh). The library source is the tree the run checked (run.sh passes $FORTRESS_HOME), where
classify.py finds the declarations that name its places; by default the tree this script is in.

Every distinct error the checker printed (the @@SC ERR lines of add-patch.py's shadow), counted
once as errors.py and the triage's fullerrs.py count it: an error is its locations and its
message with paths cut to the file name, so one printed by two units or two stages is one.
Each is given its kind by errors.py's classify and its root-cause class by classify.py (the
triage's classes, perf-probes/prelude/distance-triage.md section 2, with its rule that a
generator filter failing on the error inside it takes that error's class). The crashes are
the @@TC DECL-CRASH, @@SC CRASH and ### target-crash lines. Prints, tab-separated:
    #total <n>
    #kind <kind> <n>                in errors.py's order, then any other kind
    #class <code> <n> <name>        in classify.py's order, the classes that occur
    #check classify.py: ...         when sites of the files that name classify.py's places fall
                                    on no code line of the library source
    #unit <unit> <n>                the unit that printed the error first (errors.py's matrix)
    #crash <what> <where> <exception> <message>
The distinct key and the normalisation are fullerrs.py's (perf-probes/prelude/distance-
triage/fullerrs.py), which cuts relative paths as well as absolute ones."""
import collections, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import classify as C
if len(sys.argv) > 2: C.set_source(sys.argv[2])

# errors.py's classify and overload_sub, without running its main block (fullerrs.py's way)
src = open(os.path.join(HERE, "errors.py"), encoding="utf-8").read()
E = {}
exec(src.split("out_path, runs = sys.argv[1], sys.argv[2:]")[0], E)

LOC = re.compile(r"(/\S+?/)?([\w.]+\.fs[si]):(\d+):\d+(?:-\d+)?(?::\d+)?")
PREFIX = re.compile(r"^((?:\S+?\.fs[si]:\d+:\d+(?:-\d+)?(?::\d+)?:\s*)+)(.*)$")
def norm(s):
    s = re.sub(r"[\w./<>+-]*/([\w.]+\.fs[si])", r"\1", s)
    s = re.sub(r"\$\d+", "", s)
    return re.sub(r"\s+", " ", s).strip()
def one_line(s, n=140):
    s = re.sub(r"\s+", " ", norm(s)).strip()
    return s if len(s) <= n else s[:n] + "..."

seen = collections.OrderedDict()   # (loc, msg) -> [units, stages]
crashes = []
for raw in open(sys.argv[1], encoding="utf-8", errors="replace"):
    f = raw.rstrip("\n").split("\t")
    if f[0] == "@@SC ERR" and len(f) >= 4:
        unit, stage, text = f[1], f[2], "\t".join(f[3:])
        m = PREFIX.match(text.strip())
        locs, msg = (m.group(1), m.group(2)) if m else ("", text)
        loc = ",".join(sorted(set("%s:%s" % (g[1], g[2]) for g in LOC.findall(locs)))) or "?"
        e = seen.setdefault((loc, norm(msg)), [set(), set()])
        e[0].add(unit); e[1].add(stage)
    elif f[0] == "@@TC DECL-CRASH" and len(f) >= 4:
        # kind, span, exception, top frame, message
        crashes.append("decl\t%s %s\t%s\t%s" % (f[1], norm(f[2]), f[3].split(".")[-1],
                                                 one_line(f[5] if len(f) > 5 else "")))
    elif f[0] == "@@SC CRASH" and len(f) >= 4:
        # unit, stage, exception, top frame, message
        crashes.append("stage\t%s %s\t%s\t%s" % (f[1], f[2], f[3].split(".")[-1],
                                                  one_line(f[5] if len(f) > 5 else "")))
    elif raw.startswith("### target-crash "):
        crashes.append("target\t%s\t\t%s" % tuple((raw[len("### target-crash "):].strip() + " ").split(" ", 1)))

rows, units = [], []
for (loc, msg), (us, stages) in seen.items():
    kind, fam = E["classify"](sorted(stages)[-1], msg)
    if kind == "overloading": fam = fam + "|" + E["overload_sub"](fam.split(" ")[0], msg)
    rows.append((kind, fam if kind in ("overloading", "return-type", "abstract-method") else "-", loc, msg))
    units.append(sorted(us)[0])
classes = C.with_cascades(rows)

print("#total\t%d" % len(rows))
KS = ["exclusion", "comprises", "overloading", "return-type", "abstract-method", "bound-Object",
      "wellformed", "typecheck", "export"]
kinds = collections.Counter(r[0] for r in rows)
for k in KS + sorted(k for k in kinds if k not in KS):
    print("#kind\t%s\t%d" % (k, kinds[k]))
cc = collections.Counter(classes)
for code in [c for c, _, _ in C.RULES] + ["GF", "OT"]:
    if cc[code]: print("#class\t%s\t%d\t%s" % (code, cc[code], C.NAMES[code]))
if C.mismatch_note(): print("#check\tclassify.py: " + C.mismatch_note())
uc = collections.Counter(units)
for u in sorted(uc): print("#unit\t%s\t%d" % (u, uc[u]))
for c in sorted(set(crashes)): print("#crash\t" + c)
if not crashes: print("#crash\tnone")
