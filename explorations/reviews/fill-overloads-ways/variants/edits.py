"""Shared edits for the run-checker.sh variants. Each edit asserts that its anchor
is found exactly once, so a drift in Library/FortressLibrary.fsi fails loudly."""
import sys, os

ROOT = sys.argv[1]
FSI = os.path.join(ROOT, "Library", "FortressLibrary.fsi")


def load():
    return open(FSI, encoding="utf-8").read()


def save(s):
    open(FSI, "w", encoding="utf-8").write(s)


def replace_once(s, old, new):
    n = s.count(old)
    assert n == 1, (old, n)
    return s.replace(old, new)


def meet(s):
    """Declare fill where the two sides of the array diamond meet, as the library
    already does for copy, map, ivmap and replica (FortressLibrary.fsi:1431-1437,
    1457-1460): in StandardMutableArrayType (below both Array and
    StandardImmutableArrayType) and in ImmutableArray1 (below both ImmutableArray and
    StandardImmutableArrayType)."""
    s = replace_once(s, "    assign(v:T):T\n    assign(f:I->E):T\nend",
                     "    assign(v:T):T\n    assign(f:I->E):T\n    fill(f:I->E):T\n    fill(v:E):T\nend")
    s = replace_once(s, "    copy():ImmutableArray1[\\T,b0,s0\\]\n",
                     "    copy():ImmutableArray1[\\T,b0,s0\\]\n"
                     "    fill(f:ZZ32->T):ImmutableArray1[\\T,b0,s0\\]\n"
                     "    fill(v:T):ImmutableArray1[\\T,b0,s0\\]\n")
    return s


VALUE_FILLS = [
    "    abstract fill(v:E):ReadableArray[\\E,I\\]\n",
    "    abstract fill(v:E):ImmutableArray[\\E,I\\]\n",
    "    abstract fill(v:E):Array[\\E,I\\]\n",
]
SIAT_VALUE = "    fill(f:I->E):T\n    fill(v:E):T\n    abstract copy():T\n"
FACTORIES_V = [
    "array1[\\T, nat s0\\](v:T):Array1[\\T,0,s0\\]\n",
    "array2[\\T, nat s0, nat s1\\](v:T):Array2[\\T,0,s0,0,s1\\]\n",
]
