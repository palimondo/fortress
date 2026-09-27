#!/usr/bin/env python3
"""classify.py <full.tsv> [<full.tsv>...] : every distinct error of fullerrs.py's list, by root
cause (distance-triage.md section 2).  The first matching rule names the class; the rules
read the whole message and, for a few classes, the site.  Prints one table per input, the
classes in RULES order, and with -v every error with its class (to stdout, tab-separated:
class, kind, location, message).

A class is a cause, not a message: the same cause behind many sites is one class, and an
error that only repeats another at the same site (a generator's filter that fails because
the comparison inside it failed) is counted with the class of what it repeats."""
import collections, re, sys

def f(loc): return loc.split(":")[0]
def line(loc):
    try: return int(loc.split(",")[0].split(":")[1])
    except Exception: return -1

TV = r"(?:[IJK]|\(I, J\)|\(I, J, K\))"          # the ranges' type parameters, alone or as a tuple
NUMERAL_ARG = re.compile(r"argument of type [^.]*\bIntLiteral\b")

# The declarations of Library/RangeInternals.fss and Library/FortressLibrary.fss whose static
# parameters are bounded by AnyIntegral (grep "extends AnyIntegral", 2026-09-27): the helpers
# for # and : and the operators themselves.
ANYINTEGRAL_RI = (1420, 1495)                  # RangeInternals.fss: sized*/bounded*/left*/extent*/right*/open*
ANYINTEGRAL_FL = (3886, 3966)                  # FortressLibrary.fss: opr #, :, :: and their tuple forms

def in_range(loc, fname, rng):
    return f(loc) == fname and rng[0] <= line(loc) <= rng[1]

# Site ranges, read on the tree at edc815f0c (sources of d65892d34).
VECMAT_FL = [(2291, 2360), (2599, 2720), (4568, 4590)]   # Vector, Matrix, the scalar-extension block
TUPLECMP_FL = (4320, 4425)                                 # opr <, CMP, ... on tuples [\A,B\], [\A,B,C\]

def in_any(loc, fname, rngs): return any(in_range(loc, fname, r) for r in rngs)

SELF_ARG = re.compile(r"argument of type \((?:T|I), (?:StandardPartialOrder|StandardTotalOrder|AdditiveGroup|Integral)\[\\[TI]\\\]\)"
                      r"|argument of type \(AdditiveGroup\[\\T\\\], AdditiveGroup\[\\T\\\]\)")
SELF_BODY = re.compile(r"has type (?:Integral\[\\I\\\]|StandardTotalOrder\[\\T\\\]|StandardPartialOrder\[\\T\\\]|Standard(?:Immutable|Mutable)ArrayType\[\\T,E,I\\\]|AdditiveGroup\[\\T\\\]|MultiplicativeRing\[\\T\\\]), but declared (?:return )?type is (?:I|T|ZZ)\b")

# (code, name, test(kind, loc, (family, message)))
RULES = [
    # ---- the api layer
    ("H1", "exclusion: the comparisons, Maybe, Condition",         lambda k, l, m: k == "exclusion"),
    ("H2", "comprises: AnyIntegral's clause",                      lambda k, l, m: k == "comprises"),
    ("A1", "fill: function form against value form",               lambda k, l, m: k == "overloading" and "fill-crossed" in m[0]),
    ("A2", "fill: the array diamond",                              lambda k, l, m: k == "overloading" and "fill-same" in m[0]),
    ("L1", "overloading: the static-parameter sentence's families", lambda k, l, m: k == "overloading" and "|sentence" in m[0]),
    ("M1", "overloading: the Meet Rule",                           lambda k, l, m: k == "overloading" and "|same-sparams" in m[0]),
    ("O1", "overloading: same parameter type (LEXICO, INVERSE, SQCAP)", lambda k, l, m: k == "overloading"),
    ("R1", "return type: StandardMinMax's (T,T) slip (row 421)",
        lambda k, l, m: k == "return-type" and re.match(r"(MIN|MAX)\b", m[0]) is not None),
    ("R2", "return type: the comparisons' CMP",                    lambda k, l, m: k == "return-type" and m[0].startswith("CMP")),
    ("R3", "return type: other declared-type slips",               lambda k, l, m: k == "return-type"),
    ("Q1", "bound Object: the compile path's own setting",         lambda k, l, m: k == "bound-Object"),
    ("D1", "abstract method: a bodyless function under compiled desugaring",
        lambda k, l, m: k == "abstract-method" and f(l) == "FortressLibrary.fss"),
    ("D2", "abstract method: RangeInternals' CAP, IN, |_|",        lambda k, l, m: k == "abstract-method"),
    ("X1", "export: component against api",                        lambda k, l, m: k == "export"),
    ("Z1", "sizes: arithmetic on nat static arguments",
        lambda k, l, m: k == "wellformed" and "Arithmetic on nat static arguments" in m[1]),
    ("F1", "reductions: fusion pairs' bound (row 433)",
        lambda k, l, m: k == "wellformed" and re.search(r"bound Standard(Max|Min)\[", m[1]) is not None),
    # ---- the component bodies (and the two well-formedness classes that share their cause)
    ("N1", "natives: builtinPrimitive's T not inferred",
        lambda k, l, m: k == "typecheck" and "builtinPrimitive" in m[1] and "Could not infer static argument" in m[1]),
    ("N2", "a result-only static parameter not inferred (fail, ...)",
        lambda k, l, m: k == "typecheck" and "Could not infer static argument" in m[1] and "without context" in m[1]),
    ("I2", "integers in generic code: the dummy-ZZ32 device of # and :",
        lambda k, l, m: k == "typecheck" and (("OR(ZZ32," in m[1]) or re.search(r"argument of type \(ZZ32, (ZZ32, )*I", m[1]) is not None)),
    ("I5", "integers in generic code: Integral[\\I\\] declares no |self|",
        lambda k, l, m: k == "typecheck" and m[1].startswith("Could not check call to operator |_|") and re.search(r"argument of type [IJK]\.", m[1]) is not None),
    ("I1", "integers in generic code: the bound AnyIntegral or none where Integral[\\I\\] is used",
        lambda k, l, m: (k == "wellformed" and "corresponding bound Integral[" in m[1])
                        or (k == "typecheck" and not NUMERAL_ARG.search(m[1]) and "OR(ZZ32," not in m[1]
                            and (in_range(l, "RangeInternals.fss", ANYINTEGRAL_RI) or in_range(l, "FortressLibrary.fss", ANYINTEGRAL_FL)
                                 or (in_range(l, "RangeInternals.fss", (681, 731)) and re.search(r"argument of type \(?I\b", m[1]))))),
    ("I3", "integers in generic code: a numeral where a type parameter is expected",
        lambda k, l, m: k == "typecheck" and (NUMERAL_ARG.search(m[1]) is not None
                        or re.search(r"(body|Right-hand side) has type OR\(IntLiteral,", m[1]) is not None
                        or re.search(r"type IntLiteral to variable \w+ of type [IJK]\b", m[1]) is not None
                        or re.search(r"(body|Right-hand side) has type \(?IntLiteral(, IntLiteral)*\)?, but declared (return )?type is \(?[IJK]\b", m[1]) is not None)),
    ("I4", "integers in generic code: a fixed width where a type parameter is expected",
        lambda k, l, m: k == "typecheck" and re.search(r"argument of type \(?(ZZ32|ZZ64|NN32|NN64)(, (ZZ32|ZZ64|NN32|NN64))*\)?\.|argument of type \((I|J|K), (ZZ32|ZZ64|NN32|NN64)\)", m[1]) is not None
                        and re.search(r"call to function (Just|\w+Range\w*)\b|call to operator", m[1]) is not None and f(l) == "RangeInternals.fss"),
    ("I6", "integers in generic code: [\\ZZ32,ZZ32\\] written for [\\I,J\\]",
        lambda k, l, m: k == "typecheck" and re.search(r"\[\\ZZ32, ZZ32\\\]\(ZZ32, ZZ32", m[1]) is not None),
    ("S1", "self type: a generic trait's self is not its type parameter",
        lambda k, l, m: k == "typecheck" and (SELF_BODY.search(m[1]) is not None or SELF_ARG.search(m[1]) is not None)),
    ("R4", "StandardMinMax's (T,T) slip in bodies (row 421)",
        lambda k, l, m: k == "typecheck" and (re.search(r"body has type T, but declared return type is \(T, T\)", m[1]) is not None
                        or "Could not assign an expression of type (ZZ32, ZZ32) to variable" in m[1]
                        or re.search(r"body has type OR\(\(StandardTotalOrder", m[1]) is not None
                        or re.search(r"body has type OR\(\(T, \(U, U\)\),\(T, U\)\)", m[1]) is not None
                        or re.search(r"body has type \(\(T, T\), \(T, T\)\)", m[1]) is not None
                        or "argument of type ((I, I), I)" in m[1] or "call to function __bigOperatorSugar - [\\T, (T, T)" in m[1]
                        or "argument of type (Maybe[\\I\\], I->(I, I), ()->I)" in m[1])),
    ("V1", "arrays: element type bounded by Number, which declares no arithmetic",
        lambda k, l, m: (k == "wellformed" and "corresponding bound Number" in m[1])
                        or (k == "typecheck" and in_any(l, "FortressLibrary.fss", VECMAT_FL)
                            and re.search(r"argument of type \(?T(, T)?\)?\.|argument of type \(T, T\)", m[1]) is not None)),
    ("V2", "arrays: a sized array's body or factory (sizes lost in joins and factories)",
        lambda k, l, m: k == "typecheck" and (re.search(r"body has type (OR\()?(Array|ImmutableArray|ReadableArray|Array1|Array2|Array3|ImmutableArray1|ReadableArray1|__DefaultArray2|Vector|Matrix)\[", m[1]) is not None
                        or "NatReflect.NatParam" in m[1] or "is unreachable" in m[1] and "NatReflect" in m[1]
                        or re.search(r"No such method Matrix\[", m[1]) is not None
                        or re.search(r"call to function __subarray|method invocation Array3\[.*\]\.fill", m[1]) is not None)),
    ("G1", "generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)",
        lambda k, l, m: k == "typecheck" and (in_range(l, "FortressLibrary.fss", TUPLECMP_FL) or in_range(l, "FortressLibrary.fss", (1836, 1845)))
                        and re.search(r"argument of type \((A|B|C|E), \1\)", m[1]) is not None),
    ("MB", "Maybe: Just and Nothing do not join to Maybe",
        lambda k, l, m: k == "typecheck" and (re.search(r"\(E->Just\[\\[^]]*\], \(\)->Nothing\[", m[1]) is not None
                        or re.search(r"any type of the form \(AnyMaybe,", m[1]) is not None
                        )),
    ("SF", "String: an object's field read as an inherited method (left, right)",
        lambda k, l, m: k == "typecheck" and "()->Maybe[\\Char\\]" in m[1]),
    ("GB", "generators: a function argument inferred at BottomType (COMPOSE, map)",
        lambda k, l, m: k == "typecheck" and "BottomTyp" in m[1][:600] and "argument of type" in m[1]),
    ("TS", "ranges: a tuple shift adds or subtracts a whole tuple (K - (I,J,K))",
        lambda k, l, m: k == "typecheck" and re.search(r"argument of type \((?:[IJK]|\(ZZ32, ZZ32\)), \((?:I, J|I, J, K|ZZ32, ZZ32)\)\)|argument of type \(\(ZZ32, ZZ32\), ZZ32\)", m[1]) is not None),
    ("RG", "ranges: a range method's declared type narrower than the range it builds (check, recombine, combine2D/3D)",
        lambda k, l, m: k == "typecheck" and f(l) == "RangeInternals.fss"
                        and (re.search(r"body has type (OR\()?(RangeInternals\.)?(Range|ScalarRange|Range2D|Range3D|FullScalarRange|BoundedScalarRange|FullRange2D|FullRange3D)\[", m[1]) is not None
                             or re.search(r"\.recombine - |call to function combine[23]D - ", m[1]) is not None)),
    ("BR", "big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared",
        lambda k, l, m: k == "typecheck" and re.search(r"declared return type is (BigReduction|Comprehension)\[|call to function Comprehension - |call to operator BIG ", m[1]) is not None),
    ("CV", "a call covered only by the union of its overloads' arms (walk chooses at run time)",
        lambda k, l, m: k == "typecheck" and re.search(r"(BalancingForest\.add|collectStatsFor|call to function flatConcat|call to function writes) - ", m[1]) is not None),
    ("NM", "names the api does not declare (getters and methods of Range, String, Generator)",
        lambda k, l, m: k == "typecheck" and re.search(r"^(\S+) has no (getter|method|setter) called|^No such method", m[1]) is not None),
]
NAMES = dict((c, n) for c, n, _ in RULES)
NAMES["GF"] = "generators: a filter that failed for another reason"
NAMES["OT"] = "other body errors (one-off library slips and checker limits)"

def classify(kind, fam, loc, msg):
    for code, name, test in RULES:
        if test(kind, loc, (fam, msg)): return code
    return "OT"

def load(path):
    rows = []
    for l in open(path, encoding="utf-8"):
        p = l.rstrip("\n").split("\t")
        if len(p) < 5: continue
        kind, fam, stage, loc, msg = p[:5]
        rows.append((kind, fam, loc, msg))
    return rows

def with_cascades(rows):
    """a generator filter that failed repeats the error inside it at the same line: it takes
    the class of another error at that line, else its own"""
    cls = [classify(*r) for r in rows]
    byline = collections.defaultdict(list)
    for r, c in zip(rows, cls):
        if not r[3].startswith("Filter expressions in generator clauses"): byline[r[2].split(",")[0]].append(c)
    out = []
    for r, c in zip(rows, cls):
        if r[3].startswith("Filter expressions in generator clauses"):
            same = [x for x in byline.get(r[2].split(",")[0], []) if x != "OT"]
            c = same[0] if same else "GF"
        out.append(c)
    return out

if __name__ == "__main__":
    args = sys.argv[1:]; verbose = "-v" in args; args = [a for a in args if a != "-v"]
    tabs = []
    for p in args:
        rows = load(p); cls = with_cascades(rows)
        tabs.append((p, collections.Counter(cls)))
        if verbose:
            for r, c in zip(rows, cls): print("%s\t%s\t%s\t%s" % (c, r[0], r[2], r[3]))
    if not verbose:
        codes = [c for c, _, _ in RULES] + ["GF", "OT"]
        names = [p.split("/")[-1].replace("full-", "").replace(".tsv", "") for p, _ in tabs]
        print("# columns: " + "; ".join("(%d) %s" % (i + 1, n) for i, n in enumerate(names)))
        print("%-4s %-80s %s" % ("", "class", " ".join("%9s" % ("(%d)" % (i + 1)) for i in range(len(tabs)))))
        for c in codes:
            if any(t[c] for _, t in tabs): print("%-4s %-80s %s" % (c, NAMES[c][:80], " ".join("%9d" % t[c] for _, t in tabs)))
        print("%-4s %-80s %s" % ("", "total", " ".join("%9d" % sum(t.values()) for _, t in tabs)))
