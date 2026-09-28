#!/usr/bin/env python3
"""respell.py <copy-dir>: the library half of rung J (climb batch 7R), scalar ranges over ZZ32 only,
applied to a copy holding every .fsi/.fss of Library/ and ProjectFortress/LibraryBuiltin/ side by side.

1. BOUNDS (explorations/perf-probes/prelude/distance-triage/variants.py, called unchanged): row 358's
   range parameters bounded AnyIntegral or unbounded in the component made Integral[\\I\\], as in the api,
   so that step 2 finds the same parameters on both sides.
2. Z32 (explorations/reviews/numerics-plan-coordinator/probes-C/z32.py, called unchanged): every static
   parameter of RangeInternals and of FortressLibrary's range operator block that stands for a scalar
   range's integer removed and replaced by ZZ32; every written static argument list of those names
   shortened; the three unbounded point operators split into the ZZ32, pair and triple shapes.
3. The dummy device dropped: the helpers' throwaway first parameters (`_:ZZ32`), the operators'
   `0 asif ZZ32` arguments and the array bounds getters' literal `0` arguments that fed them, and the
   two doc comments that describe the device.
4. The team's comment at Random.fss:54, which step 2 rewrote, restored.
Every edit asserts how many places it changes."""
import io, os, re, subprocess, sys

d = sys.argv[1]
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))

def rd(n): return io.open(os.path.join(d, n), encoding="utf-8").read()
def wr(n, s): io.open(os.path.join(d, n), "w", encoding="utf-8").write(s)

def sub(n, pat, rep, count, flags=0):
    s = rd(n)
    s2, k = re.subn(pat, rep, s, flags=flags)
    assert k == count, (n, pat, k, count)
    wr(n, s2)

def run(script, *args):
    r = subprocess.run([sys.executable, os.path.join(ROOT, script), d] + list(args))
    assert r.returncode == 0, script

# 1 and 2
run("explorations/perf-probes/prelude/distance-triage/variants.py", "BOUNDS")
run("explorations/reviews/numerics-plan-coordinator/probes-C/z32.py")

# 3. the helpers' throwaway parameters, api and component: 18 helpers each
HELPER = r"\b((?:sized|bounded|left|extent|right|open)[123]Range)\((?:_ ?: ?ZZ32, ?)+"
sub("RangeInternals.fsi", HELPER, r"\1(", 18)
sub("RangeInternals.fss", HELPER, r"\1(", 18)
# the operators' dummy arguments: 18 calls, 36 arguments
sub("FortressLibrary.fss", r"\b(\w+[123]Range)\((?:\s*0 asif ZZ32\s*,)+\s*", r"\1(", 18)
assert "asif ZZ32" not in rd("FortressLibrary.fss")[rd("FortressLibrary.fss").index("(** The # and : operators"):]
# the array bounds getters and zeroIndices, whose first 1, 2 or 3 arguments were the dummies
sub("FortressLibrary.fss", r"\bsized1Range\(0,(b0|0),s0\)", r"sized1Range(\1,s0)", 2)
sub("FortressLibrary.fss", r"\bsized2Range\(0,0,(b0|0),(b1|0),s0,s1\)", r"sized2Range(\1,\2,s0,s1)", 2)
sub("FortressLibrary.fss", r"\bsized3Range\(0,0,0,(b0|0),(b1|0),(b2|0),s0,s1,s2\)", r"sized3Range(\1,\2,\3,s0,s1,s2)", 2)
# the two doc comments of the device
sub("RangeInternals.fss",
    r"\(\*\* Helpers for # to get the type instantiation \"right\"\.  We pass in bogus ZZ32's to\n"
    r"    ensure that the result type is at least ZZ32\. \*\*\)", "(** Helpers for #. **)", 1)
sub("RangeInternals.fss",
    r"\(\*\* Helpers for : to get the type instantiation \"right\"\.  We pass in bogus ZZ32's to\n"
    r"    ensure that the result type is at least ZZ32\.  \*\*\)", "(** Helpers for :. **)", 1)

# 4. the team's comment
sub("Random.fss", r"\(\* XXX fix some glitches around general FullScalarRange traits \*\)",
    r"(* XXX fix some glitches around general FullScalarRange[\\U\\] traits *)", 1)

# 5. Range excludes String as well as Number (the component's header), so that walk's overload check keeps
#    accepting a program's own String operators beside the generic opr #[\I\](r: PartialRange[\I\], size: I)
#    and opr :[\I\](r: Range[\I\], stride: I) (ProjectFortress/tests/rangeOperators.fss:19-21)
sub("FortressLibrary.fss",
    r"(\n        excludes )Number( \(\* Important or the strided factories can't overload! \*\)\n)",
    r"\1{ Number, String }\2", 1)
print("respell.py: done")
