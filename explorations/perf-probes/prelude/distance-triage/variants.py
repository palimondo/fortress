#!/usr/bin/env python3
"""variants.py <copy-dir> <variant> : respell a library copy (run.sh's step `lib`) for one
measurement of distance-triage.md.  <copy-dir> holds every .fsi/.fss of Library/ and
ProjectFortress/LibraryBuiltin/ side by side.  Each edit asserts how many places it changes,
so a variant fails loudly on a tree where its text has moved.  A variant name may join
several with '+' (applied left to right).

  BP      builtinPrimitive[\\T\\] declared [\\T extends Object\\] (api and component): whether the
          340 natives errors of walk's setting are the implicit bound's
  BPANY   the same with the bound Any written out
  BOUNDS  the ranges' generics given the bound their bodies use: every static parameter
          `X extends AnyIntegral` of RangeInternals and of FortressLibrary's range operators
          becomes `X extends Integral[\\X\\]`, and RangeInternals' two unbounded range
          declarations (RightScalarRange, emptyScalarRange) take the same bound
  DEVICE  the range operators' dummy `0 asif ZZ32` arguments (\"we pass in bogus ZZ32's to
          ensure that the result type is at least ZZ32\") replaced by the operator's own
          first arguments, so the helpers infer I from I alone (use after BOUNDS)
  R421    row 421: StandardMinMax's default MIN and MAX declared to answer T, as their bodies do
          (the api and the component, two lines each), rung L's fix in batch 7b
  VEC     the array family (Vector, Matrix, their factories and operators, the scalar-extension
          block, __DefaultVector, __DefaultMatrix) bounded by { Number, MultiplicativeRing[\\T\\],
          StandardMinMax[\\T\\] } where it says T extends Number or nothing
  A0, A1, B  the numeral's type as the plan-6.5 probe built it (compile-ladder/plan-6.5/
          probes/numeral/numeral-lib-*.patch): IntLiteral a number type of its own beside the
          others, with a coercion into each; the library half of batch 6.5's numeral switch
"""
import io, os, re, subprocess, sys

d, variant = sys.argv[1], sys.argv[2]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "../../../.."))

def rd(n): return io.open(os.path.join(d, n), encoding="utf-8").read()
def wr(n, s): io.open(os.path.join(d, n), "w", encoding="utf-8").write(s)

def sub(n, pat, rep, count, flags=0, lo=None, hi=None):
    """regex substitution in file n, only on lines lo..hi (1-based, inclusive) if given"""
    s = rd(n)
    if lo is None:
        s2, k = re.subn(pat, rep, s, flags=flags)
    else:
        lines = s.split("\n"); k = 0
        for i in range(lo - 1, hi):
            lines[i], j = re.subn(pat, rep, lines[i], flags=flags); k += j
        s2 = "\n".join(lines)
    assert k == count, (n, pat, k, count)
    wr(n, s2)

def patch(p):
    """apply a repository-relative patch to the flat copy"""
    txt = io.open(os.path.join(ROOT, p), encoding="utf-8").read()
    txt = re.sub(r"^(---|\+\+\+) ([ab])/(?:Library|ProjectFortress/LibraryBuiltin)/", r"\1 \2/", txt, flags=re.M)
    txt = re.sub(r"^diff --git a/(?:Library|ProjectFortress/LibraryBuiltin)/(\S+) b/\S+", r"diff --git a/\1 b/\1", txt, flags=re.M)
    r = subprocess.run(["patch", "-p1", "-d", d, "--no-backup-if-mismatch", "-s"], input=txt.encode("utf-8"))
    assert r.returncode == 0, p

def line_of(n, text):
    for i, l in enumerate(rd(n).split("\n"), 1):
        if text in l: return i
    raise AssertionError((n, text))

def one(v):
    if v == "BP":
        sub("FortressBuiltin.fsi", r"builtinPrimitive\[\\T\\\]\(", r"builtinPrimitive[\\T extends Object\\](", 1)
        sub("FortressBuiltin.fss", r"builtinPrimitive\[\\T\\\]\(", r"builtinPrimitive[\\T extends Object\\](", 1)
    elif v == "BPANY":
        sub("FortressBuiltin.fsi", r"builtinPrimitive\[\\T\\\]\(", r"builtinPrimitive[\\T extends Any\\](", 1)
        sub("FortressBuiltin.fss", r"builtinPrimitive\[\\T\\\]\(", r"builtinPrimitive[\\T extends Any\\](", 1)
    elif v == "BOUNDS":
        pat, rep = r"\b([IJK]) extends AnyIntegral\b", r"\1 extends Integral[\\\1\\]"
        sub("RangeInternals.fss", pat, rep, 42)
        sub("RangeInternals.fsi", pat, rep, 24)
        lo = line_of("FortressLibrary.fss", "(** The # and : operators serve as factories for parallel ranges. **)")
        sub("FortressLibrary.fss", pat, rep, 36, lo=lo, hi=lo + 80)
        lo = line_of("FortressLibrary.fsi", r"opr #[\I extends AnyIntegral\](lo:I, ex:I)")
        sub("FortressLibrary.fsi", pat, rep, 36, lo=lo, hi=lo + 60)
        sub("RangeInternals.fss", r"^object RightScalarRange\[\\I\\\]", r"object RightScalarRange[\\I extends Integral[\\I\\]\\]", 1, flags=re.M)
        sub("RangeInternals.fss", r"^emptyScalarRange\[\\I\\\]\(\)", r"emptyScalarRange[\\I extends Integral[\\I\\]\\]()", 1, flags=re.M)
        s = rd("RangeInternals.fsi")
        for name in ("RightScalarRange", "emptyScalarRange"):
            m = re.search(r"^(\s*(?:object\s+)?)%s\[\\I\\\]" % name, s, flags=re.M)
            if m:
                s = s[:m.start()] + m.group(1) + name + "[\\I extends Integral[\\I\\]\\]" + s[m.end():]
        wr("RangeInternals.fsi", s)
    elif v == "DEVICE":
        s = rd("FortressLibrary.fss")
        lo = line_of("FortressLibrary.fss", "(** The # and : operators serve as factories for parallel ranges. **)")
        lines = s.split("\n"); k = 0
        call = re.compile(r"(\w+[123]Range)\(((?:\s*0 asif ZZ32\s*,)+)([^()]*)\)")
        for i in range(lo - 1, lo + 80):
            def fix(m):
                nd = m.group(2).count("0 asif ZZ32")
                real = [a.strip() for a in m.group(3).split(",")]
                return "%s(%s)" % (m.group(1), ", ".join(real[:nd] + real))
            lines[i], j = call.subn(fix, lines[i]); k += j
        assert k == 18, k
        wr("FortressLibrary.fss", "\n".join(lines))
    elif v == "R421":
        # row 421: StandardMinMax's default MIN and MAX declared (T,T) where their bodies return one T
        sub("FortressLibrary.fsi", r"(    opr (?:MIN|MAX)\(self, other:T\)): \(T,T\)\n", r"\1: T\n", 2)
        sub("FortressLibrary.fss", r"(    opr (?:MIN|MAX)\(self, other:T\)): \(T,T\)( = do)", r"\1: T\2", 2)
    elif v == "VEC":
        # the array family's element bound: Number declares no arithmetic since the flattening,
        # so Vector, Matrix, their factories and operators and the scalar-extension block are
        # bounded by the algebra their bodies use; __DefaultVector and __DefaultMatrix take it too
        B = r"T extends { Number, MultiplicativeRing[\\T\\], StandardMinMax[\\T\\] }"
        sub("FortressLibrary.fsi", r"T extends Number\b(?!\\\]\(x:T\))", B, 40)
        sub("FortressLibrary.fss", r"T extends Number\b(?!\\\]\(x:T\))", B, 34)
        sub("FortressLibrary.fss", r"object __Default(Vector|Matrix)\[\\T, ", r"object __Default\1[\\" + B + ", ", 2)
    elif v in ("A0", "A1", "B"):
        patch("explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-%s.patch" % v)
    else:
        raise SystemExit("unknown variant " + v)

for v in variant.split("+"): one(v)
print("variant %s written to %s" % (variant, d))
