#!/usr/bin/env python3
"""Turn a PhaseProbe capture into the classified hole list of the report.

usage: classify.py <capture.out> [<capture-with-DECL-CRASH.out>]

The second argument, if given, supplies the set of top-level declarations the
type checker crashed on, so that code-generation failures on a declaration that
never got annotations can be told apart from the rest.  It defaults to the
first.
"""
import sys, io, re, collections, os

cap = sys.argv[1]
crashsrc = sys.argv[2] if len(sys.argv) > 2 else cap
ROOT = "/home/user/fortress/"

def rows(path):
    out = collections.defaultdict(list)
    for raw in io.open(path, encoding="utf-8", errors="replace"):
        if raw.startswith("@@"):
            f = raw.rstrip("\n").split("\t")
            out[f[0]].append(f[1:])
    return out

R = rows(cap)
CR = rows(crashsrc)
unchecked = set(f[1] for f in CR.get("@@TC DECL-CRASH", []))
# declarations the checker did run on, split by whether it reported errors
checked_dirty, checked_clean = set(), set()
for f in CR.get("@@TC DECL-OK", []):
    n = int(f[2].split("=")[1]) if len(f) > 2 and "=" in f[2] else 0
    (checked_dirty if n > 0 else checked_clean).add(f[1])

def provenance(span):
    if span in unchecked:     return "checker crashed on it"
    if span in checked_dirty: return "checker reported errors on it"
    if span in checked_clean: return "checker checked it clean"
    return "not a top-level declaration of the source"

# ---------------------------------------------------------------- the classes
def klass(site, msg):
    m = msg or ""
    if "Null.unwrap" in site or "None$.get" in site:            return "T no type annotation"
    if "Missing type information" in m:                          return "T no type annotation"
    if "lacks type information" in m:                            return "T no type annotation"
    if "Return type is not inferred" in m:                       return "T no type annotation"
    if "Can't compile Juxt" in m:                                return "V no visitor: Juxt"
    if "Can't compile Label" in m or "Can't compile Exit" in m:  return "V no visitor: Label/Exit"
    if "Can't compile AmbiguousMultifixOpExpr" in m:             return "V no visitor: AmbiguousMultifixOpExpr"
    if "Can't compile" in m and "sayWhat" in site:               return "V no visitor: other"
    if "Don't know how to compile this kind of FnDecl" in m:     return "C canCompile refuses"
    if "forIntArg" in site:                                      return "N nat static argument"
    if "OverloadSet.split" in site:                              return "O malformed overload set"
    if "kind env" in m:                                          return "K kind env / trait table"
    if "Not in the trait table" in m:                            return "K kind env / trait table"
    if "RTTI" in m or "static args of generic types" in m:       return "R type reference / RTTI"
    if "VarArgs" in m:                                           return "R type reference / RTTI"
    if "Forbid clauses" in m:                                    return "X other: forbid clause"
    if "forMethodInvocation" in site:                            return "X other: intersection receiver"
    return "X other"

def report(tag, label):
    if tag not in R: return
    per_class = collections.Counter()
    split = collections.Counter()
    for f in R[tag]:
        # f = [declname, span, exc, site, msg]  (CTORFAIL: [name, span, exc, site, msg])
        site, msg = (f[3], f[4]) if len(f) > 4 else ("", f[-1])
        k = klass(site, msg)
        per_class[k] += 1
        split[provenance(f[1])] += 1
    print("\n== %s (%s): %d ==" % (tag, label, len(R[tag])))
    for k, n in sorted(per_class.items(), key=lambda kv: (-kv[1], kv[0])):
        print("%6d  %s" % (n, k))
    for k, n in sorted(split.items(), key=lambda kv: -kv[1]):
        print("        %6d  %s" % (n, k))
    # the cross-tabulation that matters: class against provenance
    cross = collections.Counter()
    for f in R[tag]:
        site, msg = (f[3], f[4]) if len(f) > 4 else ("", f[-1])
        cross[(klass(site, msg), provenance(f[1]))] += 1
    print("      class x provenance:")
    for (k, pr), n in sorted(cross.items(), key=lambda kv: (-kv[1], kv[0])):
        print("      %6d  %-38s %s" % (n, k, pr))

report("@@CG FAIL",     "CODEGEN, the top-level declaration loop")
report("@@CG PREFAIL",  "CODEGEN, the object/variable pre-pass")
report("@@CG CTORFAIL", "CODEGEN, CodeGen's constructor")
report("@@CG OVLFAIL",  "CODEGEN, overload dispatch generation")

if "@@TC DECL-CRASH" in R:
    c = collections.Counter(f[3] for f in R["@@TC DECL-CRASH"])
    print("\n== @@TC DECL-CRASH: %d ==" % len(R["@@TC DECL-CRASH"]))
    for k, n in c.most_common(): print("%6d  %s" % (n, k))

print("\n== counts ==")
for tag in ("@@TC DECL-OK", "@@TC DECL-CRASH", "@@CG OK", "@@CG FAIL",
            "@@CG PREFAIL", "@@CG CTORFAIL", "@@CG OVLFAIL", "@@CG OVLSKIP"):
    if tag in R: print("%6d  %s" % (len(R[tag]), tag))

# ------------------------------------------------------------- the appendix
src = {}
def line(path, n):
    if path not in src:
        try: src[path] = io.open(path, encoding="utf-8", errors="replace").read().split("\n")
        except Exception: src[path] = []
    L = src[path]
    return L[n-1].strip() if 0 < n <= len(L) else ""

print("\n== appendix: every failure, one row ==")
print("\t".join(["phase", "class", "provenance", "declaration", "file:line", "exception", "site", "diagnostic", "source line"]))
for tag, phase in (("@@CG CTORFAIL", "CODEGEN/ctor"), ("@@CG OVLFAIL", "CODEGEN/overloads"),
                   ("@@CG PREFAIL", "CODEGEN/prepass"), ("@@CG FAIL", "CODEGEN/decls")):
    for f in R.get(tag, []):
        span = f[1]
        m = re.match(r"^(.*?):(\d+):", span)
        p, ln = (m.group(1), int(m.group(2))) if m else (span, 0)
        site, msg = (f[3], f[4]) if len(f) > 4 else ("", f[-1])
        msg = re.sub(r"\s+", " ", str(msg))[:150]
        print("\t".join([phase, klass(site, msg), provenance(span), f[0], span.replace(ROOT, ""),
                         f[2], site, msg, line(p, ln)[:90]]))
