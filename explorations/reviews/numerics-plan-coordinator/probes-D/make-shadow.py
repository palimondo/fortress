#!/usr/bin/env python3
"""make-shadow.py <src-root> <out-dir> <variant> : the checker shadows of measure-D.

Copies ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/{Operators,Functionals}.scala
into <out-dir> (same package path) and edits the copies by text; every edit asserts it matched
exactly once, so a tracked edit that moves an anchor stops the build instead of going stale.

Variants:
  instr   Functionals.scala only: a trace, off unless -Dprobe.showInfer=true, that prints at a
          call f(x) (_RewriteFnApp) and at a method invocation the expected type the checker was
          given and the static arguments it inferred. Operators.scala is the tracked file.
  fix90   instr + Operators.scala:90 only: the fnApp=true tight juxtaposition passes its expected
          type to the _RewriteFnApp it builds (the line evidence-B section 3.3 names).
  fix     instr + the same, and the path a parsed call f(x) actually takes (the parser builds
          f(x) with fnApp=false, Expression.rats:554): the tight juxtaposition passes its expected
          type to the MathPrimary it builds (:85), the MathPrimary passes it on when it rewrites
          its front function and argument into a _RewriteFnApp (:345), and the MathPrimary with
          nothing left passes it to its front (:197).
  fixmp   instr + the three MathPrimary edits (:85, :345, :197) without :90, to show which edits a
          parsed call needs.
Nothing else changes; with -Dprobe.showInfer unset the instr variant behaves as the tree.
"""
import io, os, sys
src_root, out, variant = sys.argv[1], sys.argv[2], sys.argv[3]
assert variant in ("instr", "fix90", "fix", "fixmp"), variant
base = "com/sun/fortress/scala_src/typechecker/impls/"

def edit(s, old, new, what):
    n = s.count(old)
    assert n == 1, (what, n)
    return s.replace(old, new)

def write(rel, s):
    p = os.path.join(out, base + rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8").write(s)
    print("wrote", p)

# ---- Functionals.scala: the trace (all variants)
f = io.open(os.path.join(src_root, base + "Functionals.scala"), encoding="utf-8").read()
TR = 'java.lang.Boolean.getBoolean("probe.showInfer")'
def sh(t): return 'normalize(%s).toString' % t
SARGS = ('c.sargs.map { case STypeArg(_, l, t) => (if (l) "lifted " else "") + normalize(t).toString; '
         'case o => o.toString }.mkString("[", ", ", "]")')
# the method invocation (Functionals.scala:614-615)
f = edit(f,
 "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse(return expr)\n\n"
 "      // We only care about the most specific one.",
 "      if (%s) System.out.println(\"@@PROBE-D MI \" + span + \" \" + method + \" expected=\" + expected.map(t => %s).getOrElse(\"NONE\"))\n"
 "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse{ if (%s) System.out.println(\"@@PROBE-D MI-FAIL \" + span); return expr }\n"
 "      if (%s) { val c = candidates.head; System.out.println(\"@@PROBE-D MI-OK \" + span + \" sargs=\" + %s + \" range=\" + normalize(c.arrow.getRange)) }\n\n"
 "      // We only care about the most specific one." % (TR, sh("t"), TR, TR, SARGS),
 "method invocation")
# the call f(x) (Functionals.scala:704-705)
f = edit(f,
 "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse(return expr)\n\n"
 "      // We know the arg pattern match succeeds",
 "      if (%s) System.out.println(\"@@PROBE-D FN \" + span + \" expected=\" + expected.map(t => %s).getOrElse(\"NONE\"))\n"
 "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse{ if (%s) System.out.println(\"@@PROBE-D FN-FAIL \" + span); return expr }\n"
 "      if (%s) { val c = candidates.head; System.out.println(\"@@PROBE-D FN-OK \" + span + \" sargs=\" + %s + \" range=\" + normalize(c.arrow.getRange)) }\n\n"
 "      // We know the arg pattern match succeeds" % (TR, sh("t"), TR, TR, SARGS),
 "fn app")
write("Functionals.scala", f)

# ---- Operators.scala: the fix
o = io.open(os.path.join(src_root, base + "Operators.scala"), encoding="utf-8").read()
if variant in ("fix90", "fix"):
    o = edit(o, "      case 1 => checkExpr(S_RewriteFnApp(info, front, rest.head))\n",
                "      case 1 => checkExpr(S_RewriteFnApp(info, front, rest.head), expected)   // PROBE-D :90\n", ":90")
if variant in ("fix", "fixmp"):
    o = edit(o, "      checkExpr(SMathPrimary(info, multi, infix, front, rest.map(toMathItem)))\n",
                "      checkExpr(SMathPrimary(info, multi, infix, front, rest.map(toMathItem)), expected)   // PROBE-D :85\n", ":85")
    o = edit(o, "    case SMathPrimary(info, multi, infix, front, Nil) => checkExpr(front)\n",
                "    case SMathPrimary(info, multi, infix, front, Nil) => checkExpr(front, expected)   // PROBE-D :197\n", ":197")
    o = edit(o, "            checkExpr(SMathPrimary(info, multi, infix, fn, remained))\n",
                "            checkExpr(SMathPrimary(info, multi, infix, fn, remained), expected)   // PROBE-D :345\n", ":345")
write("Operators.scala", o)
