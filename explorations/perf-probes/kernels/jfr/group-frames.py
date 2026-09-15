#!/usr/bin/env python3
"""Group every jdk.ExecutionSample's leaf frame into cost categories, over all
samples (not just the top 25).  Same thread and time filters as top-frames.py.
Usage: group-frames.py <file.jfr> <thread-substring> <window-seconds> <which>
  which = compiled | interp
"""
import re, subprocess, sys, collections
jfr, thread, window, which = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
out = subprocess.run(["jfr", "print", "--stack-depth", "64", "--events",
                      "jdk.ExecutionSample", jfr], capture_output=True, text=True, check=True).stdout
def pt(s):
    m = re.search(r"(\d\d):(\d\d):(\d\d\.\d+)", s)
    return int(m.group(1))*3600 + int(m.group(2))*60 + float(m.group(3))
raw, cur, inst, th, t = [], None, False, "", 0.0
for line in out.splitlines():
    s = line.strip()
    if s.startswith("jdk.ExecutionSample {"): cur, inst, th, t = [], False, "", 0.0
    elif s.startswith("startTime ="): t = pt(s)
    elif s.startswith("sampledThread ="): th = s
    elif s.startswith("stackTrace = ["): inst = True
    elif inst and s == "]":
        inst = False
        if thread in th: raw.append((t, cur))
        cur = None
    elif inst and cur is not None: cur.append(re.sub(r" line: \d+$", "", s))
tmax = max(t for t, _ in raw)
samples = [st for t, st in raw if t >= tmax - window and st]
n = len(samples)

def cat_compiled(stack):
    leaf, whole = stack[0], "\n".join(stack)
    if "BaseTask.inATransaction" in whole or "getCurrentTransaction" in whole or "Transaction.TX" in whole:
        return "transaction check (incl. its eager debug string)"
    if "FFloatLiteral" in whole or "coerce_RR64" in whole:
        return "float-literal round-trip"
    if "countedseqloop" in leaf or "seqloop" in leaf or "SeqGen" in leaf or "FilteredRange" in leaf:
        return "generator (countedseqloop subdivision)"
    if "FZZ32.make" in leaf or "FIntLiteral" in leaf or "coerce_ZZ32" in leaf:
        return "integer index boxing"
    if re.match(r"(bench1[hr])[.$]", leaf):
        return "the program's own compiled code (arithmetic inlined into it)"
    if "FRR64" in leaf or "simpleDoubleArith" in leaf or "juxtaposition" in leaf or "CompilerBuiltin.\"+\"" in leaf:
        return "RR64 boxing + arithmetic"
    if "castTo" in leaf or "Arrow" in leaf or "DefaultTraitMethods" in leaf:
        return "closure / trait dispatch"
    return "other (classload, JIT, GC, startup)"

def cat_interp(stack):
    leaf = stack[0]
    if re.search(r"useful\.(BATree|StringHashComparer|ListComparer|HashComparer)|String\.compareTo|String\.hashCode", leaf):
        return "environment lookup / balanced-tree maps"
    if re.search(r"evaluator\.types\.|excludes|subtypeOf|[Oo]verload|Dispatch", leaf):
        return "run-time type dispatch"
    if re.search(r"interpreter\.evaluator\.", leaf):
        return "AST walk: eval, closures, env build"
    if re.search(r"interpreter\.reader\.Lex|parser|xtc|Rats", leaf):
        return "parse / read (startup bleed)"
    if re.search(r"ForkJoinPool|ForkJoinTask|RecursiveAction", leaf):
        return "fork-join runtime"
    if re.search(r"runtimeValues|FFloat|FRR64|Float\.", leaf):
        return "number representation"
    return "other"

cat = cat_compiled if which == "compiled" else cat_interp
c = collections.Counter(cat(s) for s in samples)
print(f"## {jfr}  ({n} samples, last {window} s, thread {thread!r})")
for k, v in c.most_common():
    print(f"{v:6d}  {100.0*v/n:5.1f}%  {k}")
