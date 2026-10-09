#!/usr/bin/env python3
"""classify.py [--src <dir>] [-v | -d] <list> [<list>...] : every distinct error of a distance
list, by root cause (distance-triage.md section 2).  The first matching rule names the class;
the rules read the whole message and, for a few classes, the site.  Prints one table per input,
the classes in RULES order, and with -v every error with its class (to stdout, tab-separated:
class, kind, location, message); -d prints the same with the site's enclosing declarations
before the message.

A list is fullerrs.py's (kind, family, stage, location, message) or errors.py's per-site list
(kind, family, subclass, unit(s), stage(s), location, message), which the gate lands as
explorations/compile-ladder/gate/distance-sites.tsv; table.py passes the same rows in memory.

A class is a cause, not a message: the same cause behind many sites is one class, and an
error that only repeats another at the same site (a generator's filter that fails because
the comparison inside it failed) is counted with the class of what it repeats.

Three classes are named in part by a place in the library (I1, V1, G1; PLACES below).  A place
is a set of declarations, each found by its kind and name in the library source the list was
made from (and, among the overloads of one name, by its static parameters), never by line
numbers, so that an edit that inserts lines above a place moves no site between classes (row
577).  --src names that source: a tree, whose Library/ and ProjectFortress/LibraryBuiltin/ are
searched, or a folder holding the files; by default the tree this script is in.  A site of a
named file that falls on no code line of the source (blank, comment, or past the end) means the
list was not made from that source: it is reported, on stderr here and as a #check row by
table.py, and the site is classified as if no place held it."""
import bisect, collections, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))

def f(loc): return loc.split(":")[0]
def line(loc):
    try: return int(loc.split(",")[0].split(":")[1])
    except Exception: return -1

# ---- the library source: its declarations, found by reading the text
#
# A declaration starts on a line that begins in column 0 (a top-level one), or in a trait's or
# object's body at the body's least indentation (a member), with a name or a declaration
# keyword that is not one of CONT, the words that continue an expression or a header.  It runs
# to the line before the next declaration of its level.  Comments ((* *) nested, (*) to the end
# of the line) and string contents are blanked first, columns kept.

SRC = None
def set_source(path):
    global SRC
    SRC = path; _sources.clear(); MISMATCHES.clear()

def source_root(): return SRC or os.path.normpath(os.path.join(HERE, "..", "..", "..", ".."))

def source_path(fname):
    root = source_root()
    for sub in ("", "Library", os.path.join("ProjectFortress", "LibraryBuiltin")):
        p = os.path.join(root, sub, fname)
        if os.path.isfile(p): return p
    raise SystemExit("classify.py: no %s under %s (--src names the library source the list was made from)" % (fname, root))

def code_text(text):
    """text with comments and the contents of strings blanked, every line and column kept"""
    out, i, n, depth = [], 0, len(text), 0
    while i < n:
        c = text[i]
        if depth:
            if text.startswith("(*)", i): out.append("   "); i += 3
            elif text.startswith("(*", i): depth += 1; out.append("  "); i += 2
            elif text.startswith("*)", i): depth -= 1; out.append("  "); i += 2
            else: out.append(c if c == "\n" else " "); i += 1
        elif text.startswith("(*)", i):
            j = text.find("\n", i); j = n if j < 0 else j
            out.append(" " * (j - i)); i = j
        elif text.startswith("(*", i): depth += 1; out.append("  "); i += 2
        elif c == '"':
            j = i + 1
            while j < n and text[j] not in '"\n': j += 2 if text[j] == "\\" else 1
            j = min(j, n)
            if j < n and text[j] == '"': out.append('"' + " " * (j - i - 1) + '"'); i = j + 1
            else: out.append('"' + " " * (j - i - 1)); i = j
        else: out.append(c); i += 1
    return "".join(out)

CONT = frozenset("end do else elif then typecase case if while for try catch forbid finally label "
                 "also at atomic spawn throw of in with where extends excludes comprises ensures "
                 "requires invariant".split())
HEADWORDS = frozenset("extends excludes comprises where".split())
WORD = re.compile(r"[^\W\d][\w']*")
MODS = re.compile(r"(private|value|native|abstract|test|override|settable|hidden|wrapped|transient|io|nonexpansive|atomic|var)\b\s*")
KEYS = re.compile(r"(trait|object|opr|getter|setter|coerce|type|import|export|component|api)\b\s*")

def starts_decl(text):
    m = WORD.match(text)
    return m is not None and m.group(0) not in CONT

def indent(l): return len(l) - len(l.lstrip())

def closing(s, i):
    """the index of the bracket that closes s[i], or len(s)"""
    pairs = {"(": ")", "[": "]", "{": "}"}
    stack = []
    for j in range(i, len(s)):
        if s[j] in pairs: stack.append(pairs[s[j]])
        elif stack and s[j] == stack[-1]:
            stack.pop()
            if not stack: return j
    return len(s)

def static_params(s):
    """the static parameters [\\...\\] (or ⟦...⟧) at the start of s, each with its spaces
    normalised, as a tuple; () when s does not start with them"""
    s = s.lstrip().replace("⟦", "[\\").replace("⟧", "\\]")
    if not s.startswith("[\\"): return ()
    j = closing(s, 0)
    body = s[2:j - 1] if j < len(s) else s[2:]
    ps, depth, cur = [], 0, ""
    for ch in body:
        if ch == "," and depth == 0: ps.append(cur); cur = ""; continue
        depth += ch in "([{"; depth -= ch in ")]}"; cur += ch
    ps.append(cur)
    return tuple(" ".join(p.split()) for p in ps if p.strip())

def opr_name(s):
    """an operator declaration's name and the text after it: opr +(..), opr =[\\A,B\\](..),
    opr (x:T)# (postfix), opr BIG +, opr |self|, opr ||[\\..\\]x||, opr [i]"""
    s = s.lstrip()
    m = re.match(r"BIG\s+([^\s\[\(⟦]+)", s)
    if m: return "BIG " + m.group(1), s[m.end():]
    if s.startswith("("): s = s[closing(s, 0) + 1:].lstrip()
    if s.startswith("[") and not s.startswith("[\\"): return "[]", s
    m = re.match(r"\|[^|\[\(]*\|", s) if s.startswith("|") and not s.startswith("||") else None
    if m: return "|_|", s[m.end():]
    m = re.match(r"[^\W\d]\w*|[^\s\w\[\(⟦]+", s)
    return (m.group(0), s[m.end():]) if m else ("?", s)

def head(text):
    """a declaration's kind, name and static parameters, from the text of its first lines"""
    s, var = text.strip(), False
    while True:
        m = MODS.match(s)
        if not m: break
        var = var or m.group(1) == "var"; s = s[m.end():]
    m = KEYS.match(s)
    if m:
        kind, s = m.group(1), s[m.end():]
        if kind == "opr": name, s = opr_name(s)
        elif kind == "coerce": name = "coerce"
        else:
            n = WORD.match(s); name = n.group(0) if n else "?"; s = s[n.end():] if n else s
        return kind, name, static_params(s)
    n = WORD.match(s)
    if not n: return "?", s[:24], ()
    name, s = n.group(0), s[n.end():]
    kind = "function" if not var and re.match(r"\s*(\[\\|⟦|\()", s) else "variable"
    return kind, name, static_params(s)

class Decl:
    def __init__(self, kind, name, sparams, first, last):
        self.kind, self.name, self.sparams, self.first, self.last = kind, name, sparams, first, last
        self.members = []
    def __str__(self):
        return "%s %s%s" % (self.kind, self.name, "[\\%s\\]" % ", ".join(self.sparams) if self.sparams else "")

def bracket_depth(l):
    return sum(l.count(c) for c in "([{") - sum(l.count(c) for c in ")]}")

def next_code(lines, k, last):
    for j in range(k + 1, last + 1):
        if lines[j].strip(): return j
    return None

def header_end(lines, first, last):
    """the last line of a trait's or object's header: its brackets close, and no extends,
    excludes, comprises, where or value-parameter line follows"""
    k, depth = first, 0
    while True:
        depth += bracket_depth(lines[k])
        j = next_code(lines, k, last)
        if j is None: return k
        nxt = lines[j].lstrip()
        w = WORD.match(nxt)
        if depth > 0 or nxt.startswith("(") or (w and w.group(0) in HEADWORDS): k = j; continue
        return k

def spans(lines, starts, last):
    """(first, last) of each declaration that starts at one of starts, trailing blanks cut"""
    out = []
    for i, s in enumerate(starts):
        e = (starts[i + 1] - 1) if i + 1 < len(starts) else last
        while e > s and not lines[e].strip(): e -= 1
        out.append((s, e))
    return out

class Source:
    def __init__(self, path):
        self.path = path
        with open(path, encoding="utf-8") as src: self.lines = code_text(src.read()).split("\n")
        L = self.lines
        tops = [i for i, l in enumerate(L) if l[:1].strip() and starts_decl(l)]
        self.decls = []
        for s, e in spans(L, tops, len(L) - 1):
            d = Decl(*head(" ".join(L[s:s + 4])), first=s + 1, last=e + 1)
            if d.kind in ("trait", "object"):
                h = header_end(L, s, e)
                body = [k for k in range(h + 1, e + 1) if L[k].strip() and L[k][0].isspace()]
                if body:
                    ind = min(indent(L[k]) for k in body)
                    ms = [k for k in body if indent(L[k]) == ind and starts_decl(L[k].lstrip())]
                    for ms_, me in spans(L, ms, e):
                        d.members.append(Decl(*head(" ".join(x.strip() for x in L[ms_:min(ms_ + 4, me + 1)])),
                                              first=ms_ + 1, last=me + 1))
            self.decls.append(d)
        self.firsts = [d.first for d in self.decls]

    def is_code(self, n):
        return 1 <= n <= len(self.lines) and self.lines[n - 1].strip() != ""

    def enclosing(self, n):
        """the declarations around line n, outermost first: [top] or [top, member]; [] when none"""
        i = bisect.bisect_right(self.firsts, n) - 1
        if i < 0 or n > self.decls[i].last: return []
        d = self.decls[i]
        for m in d.members:
            if m.first <= n <= m.last: return [d, m]
        return [d]

_sources = {}
MISMATCHES = []          # sites of a named file that fall on no code line of the source

def source(fname):
    if fname not in _sources: _sources[fname] = Source(source_path(fname))
    return _sources[fname]

def enclosing(loc):
    fname, n = f(loc), line(loc)
    s = source(fname)
    if not s.is_code(n):
        if loc not in MISMATCHES: MISMATCHES.append(loc)
        return []
    return s.enclosing(n)

# ---- the places: each a list of (file, kind, name, static parameters), the kind and the name
# regular expressions matched whole against a site's outermost enclosing declaration, the static
# parameters a predicate on that declaration's tuple of them (None: any).

def sp_first(prefix): return lambda ps: len(ps) > 0 and ps[0] == prefix
def sp_is(*ps): return lambda qs: qs == ps
def sp_anyintegral(ps):
    """generic, and every type parameter bounded by AnyIntegral or by nothing"""
    tys = [p for p in ps if not re.match(r"(nat|int|bool|opr|dim|unit)\b", p)]
    return len(tys) > 0 and all(" extends " not in p or p.split(" extends ", 1)[1] == "AnyIntegral" for p in tys)

NUMBER = sp_first("T extends Number")
PLACES = {
    # I1: the declarations whose static parameters are bounded by AnyIntegral, or by nothing
    # where Integral[\I\] is used (grep "extends AnyIntegral", 2026-09-27; distance-triage.md
    # section 3.2, row 358): in RangeInternals the helpers for #, : and :: (sized*, bounded*,
    # left*, extent*, right*, open* and openRangeHelper); in FortressLibrary the operators #, :
    # and :: themselves, every fixity and tuple form, with openRange.  The static parameters are
    # part of the place: since 3be1fecd7 (2026-09-28) these declarations are over ZZ32 alone,
    # and an error in one of them has nothing to do with a bound.
    "anyintegral": [
        ("RangeInternals.fss", "function", r"(sized|bounded|left|extent|right|open)[123]Range|openRangeHelper", sp_anyintegral),
        ("FortressLibrary.fss", "opr", r"#|:|::", sp_anyintegral),
        ("FortressLibrary.fss", "function", r"openRange", sp_anyintegral),
    ],
    # I1, with an argument of type I: RangeInternals' RightScalarRange[\I\], unbounded (row
    # 358's unbounded declarations; the triage's I1 sites at RangeInternals.fss:681-723).
    "rightscalar": [
        ("RangeInternals.fss", "object", r"RightScalarRange", sp_anyintegral),
    ],
    # V1: generic code over an element type T extends Number (distance-triage.md section 3.4:
    # "Vector, Matrix, their factories and operators, and the scalar-extension block"): the two
    # traits, the objects that extend them (their own T unbounded), the factories, the operators
    # DOT, juxtaposition and ||..|| over them, and the eight scalar-extension operators +, -,
    # MIN and MAX [\T extends Number, I\].
    "vecmat": [
        ("FortressLibrary.fss", "trait", r"Vector|Matrix", NUMBER),
        ("FortressLibrary.fss", "object", r"__DefaultVector|__DefaultMatrix|TransposedMatrix", None),
        ("FortressLibrary.fss", "function", r"vector|tabulatedVector|matrix|pmul|squaredNorm", NUMBER),
        ("FortressLibrary.fss", "opr", r"DOT|juxtaposition|\|\|", NUMBER),
        ("FortressLibrary.fss", "opr", r"\+|-|MIN|MAX", sp_is("T extends Number", "I")),
    ],
    # G1: the comparisons on tuples, opr =, <, <=, >, >= and CMP over [\A,B\] and [\A,B,C\],
    # whose components have no bound; and LexicographicOrder, whose element type E has none.
    "tuplecmp": [
        ("FortressLibrary.fss", "opr", r"=|<|<=|>|>=|CMP", sp_is("A", "B")),
        ("FortressLibrary.fss", "opr", r"=|<|<=|>|>=|CMP", sp_is("A", "B", "C")),
        ("FortressLibrary.fss", "trait", r"LexicographicOrder", None),
    ],
}
PLACE_FILES = sorted(set(p[0] for ps in PLACES.values() for p in ps))

def at(loc, place):
    """whether the site loc lies in one of place's declarations, in the library source"""
    sels = [p for p in PLACES[place] if p[0] == f(loc)]
    if not sels: return False
    path = enclosing(loc)
    return bool(path) and any(re.fullmatch(kind, path[0].kind) and re.fullmatch(name, path[0].name)
                              and (sp is None or sp(path[0].sparams)) for _, kind, name, sp in sels)

def where(loc):
    """the site's enclosing declarations, for -d; '-' outside the named files"""
    if f(loc) not in PLACE_FILES: return "-"
    path = enclosing(loc)
    return " / ".join(str(d) for d in path) if path else "?"

TV = r"(?:[IJK]|\(I, J\)|\(I, J, K\))"          # the ranges' type parameters, alone or as a tuple
NUMERAL_ARG = re.compile(r"argument of type [^.]*\bIntLiteral\b")

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
                            and (at(l, "anyintegral")
                                 or (re.search(r"argument of type \(?I\b", m[1]) is not None and at(l, "rightscalar"))))),
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
                        or (k == "typecheck" and re.search(r"argument of type \(?T(, T)?\)?\.|argument of type \(T, T\)", m[1]) is not None
                            and at(l, "vecmat"))),
    ("V2", "arrays: a sized array's body or factory (sizes lost in joins and factories)",
        lambda k, l, m: k == "typecheck" and (re.search(r"body has type (OR\()?(Array|ImmutableArray|ReadableArray|Array1|Array2|Array3|ImmutableArray1|ReadableArray1|__DefaultArray2|Vector|Matrix)\[", m[1]) is not None
                        or "NatReflect.NatParam" in m[1] or "is unreachable" in m[1] and "NatReflect" in m[1]
                        or re.search(r"No such method Matrix\[", m[1]) is not None
                        or re.search(r"call to function __subarray|method invocation Array3\[.*\]\.fill", m[1]) is not None)),
    ("G1", "generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)",
        lambda k, l, m: k == "typecheck" and re.search(r"argument of type \((A|B|C|E), \1\)", m[1]) is not None
                        and at(l, "tuplecmp")),
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
ORDER = dict((c, i) for i, (c, _, _) in enumerate(RULES))

def classify(kind, fam, loc, msg):
    if f(loc) in PLACE_FILES: enclosing(loc)          # every site of a named file is checked against the source
    for code, name, test in RULES:
        if test(kind, loc, (fam, msg)): return code
    return "OT"

def load(path):
    """the rows (kind, family, location, message) of fullerrs.py's list or of errors.py's
    per-site list (its header line '# kind<tab>family<tab>subclass...'), the family as table.py
    gives it: an overloading error's family|subclass, a return-type's or abstract method's
    family, '-' for the rest"""
    rows = []
    with open(path, encoding="utf-8") as src: text = src.read()
    for l in text.split("\n"):
        if l.startswith("#"): continue
        p = l.rstrip("\n").split("\t")
        if len(p) >= 7:
            kind, fam, sub, _units, _stage, loc, msg = p[:7]
            fam = fam + "|" + sub if kind == "overloading" else fam if kind in ("return-type", "abstract-method") else "-"
        elif len(p) >= 5:
            kind, fam, _stage, loc, msg = p[:5]
        else: continue
        rows.append((kind, fam, loc, msg))
    return rows

def with_cascades(rows):
    """a generator filter that failed repeats the error inside it at the same line: it takes
    the class of another error at that line, the first in RULES order (so that the rows' order
    does not choose), else its own"""
    cls = [classify(*r) for r in rows]
    byline = collections.defaultdict(list)
    for r, c in zip(rows, cls):
        if not r[3].startswith("Filter expressions in generator clauses"): byline[r[2].split(",")[0]].append(c)
    out = []
    for r, c in zip(rows, cls):
        if r[3].startswith("Filter expressions in generator clauses"):
            same = sorted((x for x in byline.get(r[2].split(",")[0], []) if x != "OT"), key=ORDER.get)
            c = same[0] if same else "GF"
        out.append(c)
    return out

def mismatch_note():
    """one line on the sites that fall on no code line of the source, or None"""
    if not MISMATCHES: return None
    return ("%d site(s) of %s fall on no code line of the library source under %s (%s): the list was not "
            "made from that source, and those sites were classed as if no place held them"
            % (len(MISMATCHES), " and ".join(PLACE_FILES), source_root(), ", ".join(MISMATCHES[:6]) + (", ..." if len(MISMATCHES) > 6 else "")))

if __name__ == "__main__":
    args = sys.argv[1:]
    verbose, decls = "-v" in args, "-d" in args
    if "--src" in args:
        i = args.index("--src")
        if i + 1 >= len(args): raise SystemExit(__doc__.split("\n\n")[0])
        set_source(args[i + 1]); del args[i:i + 2]
    args = [a for a in args if a not in ("-v", "-d")]
    if not args: raise SystemExit(__doc__.split("\n\n")[0])
    tabs = []
    for p in args:
        rows = load(p); cls = with_cascades(rows)
        tabs.append((p, collections.Counter(cls)))
        if verbose or decls:
            for r, c in zip(rows, cls):
                if decls: print("%s\t%s\t%s\t%s\t%s" % (c, r[0], r[2], where(r[2]), r[3]))
                else: print("%s\t%s\t%s\t%s" % (c, r[0], r[2], r[3]))
    if not (verbose or decls):
        codes = [c for c, _, _ in RULES] + ["GF", "OT"]
        names = [p.split("/")[-1].replace("full-", "").replace(".tsv", "") for p, _ in tabs]
        print("# columns: " + "; ".join("(%d) %s" % (i + 1, n) for i, n in enumerate(names)))
        print("%-4s %-80s %s" % ("", "class", " ".join("%9s" % ("(%d)" % (i + 1)) for i in range(len(tabs)))))
        for c in codes:
            if any(t[c] for _, t in tabs): print("%-4s %-80s %s" % (c, NAMES[c][:80], " ".join("%9d" % t[c] for _, t in tabs)))
        print("%-4s %-80s %s" % ("", "total", " ".join("%9d" % sum(t.values()) for _, t in tabs)))
    note = mismatch_note()
    if note: print("classify.py: " + note, file=sys.stderr)
