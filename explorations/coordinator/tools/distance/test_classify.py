#!/usr/bin/env python3
"""Tests of classify.py's places (row 577): the classes that a place in the library names are
found by declaration, so lines inserted into the library move no site between classes.

The inputs are two landed pairs of per-site list and library, read from git: climb batch 11's
(f9d3ec826) and climb batch 10's (ec718967a). Nothing in the tree is touched; the copies go to
a temporary folder. No build and no Fortress run. The class Readings tests table.py's and
errors.py's readings of a run on small run outputs of its own.

usage: python3 explorations/coordinator/tools/distance/test_classify.py [-v]
"""
import collections, os, re, subprocess, sys, tempfile, unittest

HERE = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.normpath(os.path.join(HERE, "..", "..", "..", ".."))
sys.path.insert(0, HERE)
import classify as C  # noqa: E402

SITES = "explorations/compile-ladder/gate/distance-sites.tsv"
LANDED = {"batch 11": "f9d3ec826", "batch 10": "ec718967a"}
LIBS = {"FortressLibrary.fss": "Library/FortressLibrary.fss", "RangeInternals.fss": "Library/RangeInternals.fss"}


def show(rev, path):
    r = subprocess.run(["git", "-C", TREE, "show", "%s:%s" % (rev, path)], capture_output=True, text=True)
    if r.returncode != 0: raise unittest.SkipTest("git show %s:%s: %s" % (rev, path, r.stderr.strip()))
    return r.stdout


def read(path):
    with open(path, encoding="utf-8") as src: return src.read()


def write(folder, name, text):
    p = os.path.join(folder, name)
    with open(p, "w", encoding="utf-8") as o: o.write(text)
    return p


def classes(src, rows):
    C.set_source(src)
    return C.with_cascades(rows), list(C.MISMATCHES)


def place_starts(text, fname):
    """the first lines of the top-level declarations any place names, by kind and name"""
    lines = C.code_text(text).split("\n")
    tops = [i for i, l in enumerate(lines) if l[:1].strip() and C.starts_decl(l)]
    out = []
    for i in tops:
        kind, name, _ = C.head(" ".join(lines[i:i + 4]))
        for f, k, n, _sp in (p for ps in C.PLACES.values() for p in ps):
            if f == fname and re.fullmatch(k, kind) and re.fullmatch(n, name): out.append(i + 1); break
    return out


def insert(text, at_lines, block):
    """text with block inserted above each of at_lines (1-based), and the map old line -> new"""
    lines = text.split("\n")
    at = set(at_lines)
    out, shift, moved = [], 0, {}
    for n, l in enumerate(lines, 1):
        if n in at:
            out.extend(block); shift += len(block)
        moved[n] = n + shift
        out.append(l)
    return "\n".join(out), moved


def shift_rows(rows, maps):
    """the rows with every position in a mapped file moved, in the location and the message"""
    def mv(m):
        fn, n = m.group(1), int(m.group(2))
        return "%s:%d" % (fn, maps[fn].get(n, n)) if fn in maps else m.group(0)
    pos = re.compile(r"\b([\w.]+\.fss):(\d+)")
    return [(k, fam, pos.sub(mv, loc), pos.sub(mv, msg)) for k, fam, loc, msg in rows]


class Landed(unittest.TestCase):
    """the two landed pairs, classified from their own library"""

    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.pairs = {}
        for name, rev in LANDED.items():
            d = os.path.join(cls.tmp.name, rev)
            os.makedirs(d)
            for f, p in LIBS.items(): write(d, f, show(rev, p))
            rows = C.load(write(d, "sites.tsv", show(rev, SITES)))
            cls.pairs[name] = (d, rows)

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()
        C.set_source(None)

    def test_inserted_lines_move_no_site(self):
        """blank lines and a comment inserted above every declaration a place names, and at the
        top of each file, with the list's positions moved to match: every site keeps its class"""
        block = [""] * 7 + ["(* inserted by test_classify.py: (* nested *) opr <[\\A,B\\] *)", "(*) and a line comment", ""]
        for name, (d, rows) in self.pairs.items():
            with self.subTest(name):
                before, miss = classes(d, rows)
                self.assertEqual(miss, [], "the list does not match its own library")
                moved_dir = os.path.join(d, "inserted")
                os.makedirs(moved_dir, exist_ok=True)
                maps = {}
                for f in LIBS:
                    text = read(os.path.join(d, f))
                    at = [1] + place_starts(text, f)
                    new, maps[f] = insert(text, at, block)
                    write(moved_dir, f, new)
                rows2 = shift_rows(rows, maps)
                moved = sum(1 for a, b in zip(rows, rows2) if a[2] != b[2])
                self.assertGreater(moved, 150, "the inserted lines moved too few sites to test anything")
                after, miss = classes(moved_dir, rows2)
                self.assertEqual(miss, [])
                changed = [(r[2], a, b) for r, a, b in zip(rows, before, after) if a != b]
                self.assertEqual(changed, [], "sites that changed class when only lines moved")
                # the places' classes are among the sites that moved
                for code in ("V1", "G1"):
                    self.assertTrue(any(c == code and a[2] != b[2] for c, a, b in zip(after, rows, rows2)), code)

    def test_place_classes_on_the_landed_lists(self):
        """the counts of the classes a place names, as the row-577 fix gave them on each list:
        V1 44 (21 well-formedness errors and Vector's, Matrix's and the scalar extension's 23),
        G1 18 (the twelve tuple comparisons' 17 and LexicographicOrder's CMP), I1 none (its
        declarations have been over ZZ32 alone since 3be1fecd7)"""
        for name, (d, rows) in self.pairs.items():
            with self.subTest(name):
                cc = collections.Counter(classes(d, rows)[0])
                self.assertEqual((cc["V1"], cc["G1"], cc["I1"]), (44, 18, 0))
                self.assertEqual(sum(cc.values()), len(rows))

    def test_mismatched_source_is_reported(self):
        """a list classified against a library it was not made from names the sites that fall
        on no code line"""
        d, rows = self.pairs["batch 11"]
        n = len(read(os.path.join(d, "FortressLibrary.fss")).split("\n"))
        rows = rows + [("typecheck", "-", "FortressLibrary.fss:%d" % (n + 40), "Could not check call to operator CMP - is not applicable to an argument of type (A, A).")]
        cls, miss = classes(d, rows)
        self.assertEqual(miss, ["FortressLibrary.fss:%d" % (n + 40)])
        self.assertEqual(cls[-1], "OT")
        self.assertIn("1 site(s)", C.mismatch_note())

    def test_table_py_passes_the_source(self):
        """table.py, as run.sh calls it, classes a run's errors from the source it is given"""
        d, rows = self.pairs["batch 11"]
        run = os.path.join(d, "run.txt")
        with open(run, "w", encoding="utf-8") as o:
            for l in read(os.path.join(d, "sites.tsv")).split("\n"):
                if l.startswith("#") or not l: continue
                kind, fam, sub, units, stages, loc, msg = l.split("\t")[:7]
                prefix = " ".join("/x/%s:1:" % x for x in loc.split(","))
                for st in stages.split("+"):
                    o.write("@@SC ERR\t%s\t%s\t%s %s\n" % (units.split("+")[0], st, prefix, msg))
        out = subprocess.run([sys.executable, "-B", os.path.join(HERE, "table.py"), run, d],
                             capture_output=True, text=True, check=True).stdout
        got = dict((r.split("\t")[1], int(r.split("\t")[2])) for r in out.splitlines() if r.startswith("#class\t"))
        want = collections.Counter(classes(d, rows)[0])
        self.assertEqual(got, dict((k, v) for k, v in want.items() if v))
        self.assertNotIn("#check", out)


class Declarations(unittest.TestCase):
    """the reading of declarations, on a small source"""

    SRC = "\n".join([
        "component Probe",                                   # 1
        "(* a comment (* nested *) opr <[\\A,B\\](t1:(A,B)) *)",  # 2
        "trait Vector[\\T extends Number, nat s0\\]",        # 3
        "        extends { AnyVector }",                     # 4
        "    opr +(self, v:Vector[\\T,s0\\]): Vector[\\T,s0\\] =",  # 5
        "        ivmap(fn (i, e) => e + v.get(i))",          # 6
        "    scale(t: T): Vector[\\T,s0\\] = map(fn (v) => t v)",  # 7
        "end",                                               # 8
        "(*) opr CMP[\\A,B\\](t1:(A,B), t2:(A,B)): Comparison = 0",  # 9
        "opr CMP[\\A,B\\](t1:(A,B), t2:(A,B)): Comparison = do",  # 10
        "    \"a string with (* in it\"",                    # 11
        "    (a1 CMP a2)",                                   # 12
        "  end",                                             # 13
        "opr (x:ZZ32):: : LeftRange[\\ZZ32\\] = x#",         # 14
        "opr ||[\\ T extends Number, nat k \\]me : Vector[\\T,k\\]|| : RR64 = 0",  # 15
        "openRange[\\I\\](): OpenRange[\\I\\] =",            # 16
        "typecase x of",                                     # 17: a column-0 continuation
        "  end",                                             # 18
        "end",                                               # 19
    ])

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.src = C.Source(write(self.tmp.name, "Probe.fss", self.SRC))

    def tearDown(self): self.tmp.cleanup()

    def names(self, n): return [str(d) for d in self.src.enclosing(n)]

    def test_enclosing(self):
        self.assertEqual(self.names(4), ["trait Vector[\\T extends Number, nat s0\\]"])
        self.assertEqual(self.names(6), ["trait Vector[\\T extends Number, nat s0\\]", "opr +"])
        self.assertEqual(self.names(7), ["trait Vector[\\T extends Number, nat s0\\]", "function scale"])
        self.assertEqual(self.names(12), ["opr CMP[\\A, B\\]"])
        self.assertEqual(self.names(14), ["opr ::"])
        self.assertEqual(self.names(15), ["opr ||[\\T extends Number, nat k\\]"])
        self.assertEqual(self.names(17), ["function openRange[\\I\\]"])

    def test_comments_and_strings_are_not_code(self):
        self.assertFalse(self.src.is_code(2))
        self.assertFalse(self.src.is_code(9))
        self.assertTrue(self.src.is_code(11))
        self.assertFalse(self.src.is_code(40))

    def test_anyintegral_places_need_their_bounds(self):
        self.assertTrue(C.sp_anyintegral(("I extends AnyIntegral", "J extends AnyIntegral")))
        self.assertTrue(C.sp_anyintegral(("I",)))
        self.assertFalse(C.sp_anyintegral(("I extends Integral[\\I\\]",)))
        self.assertFalse(C.sp_anyintegral(()))


class Readings(unittest.TestCase):
    """table.py's and errors.py's readings of a run, on small run outputs (export-check-full
    REPORT.md section 6, defects 4 and 5)"""

    # the shape of a run whose library stops at parse: its errors are not @@SC lines
    STOPPED = "\n".join([
        "### order=check setting=any (extendsObject=false compiledExpr=true) prelude=INTERPRETER"
        " targets=[Library/FortressLibrary.fss, Library/List.fss] overloadCache=false",
        "### target Library/FortressLibrary.fss componentOnly=false",
        "File FortressLibrary.fss has 4 errors.",
        "### done Library/FortressLibrary.fss rc=-1 seconds=1",
        "### target Library/List.fss componentOnly=true",
        "@@SC STAGE\tcomponent List\ttypecheck\terrors=0",
        "### done Library/List.fss rc=0 seconds=0",
        "### all seconds=5 rc=0",
        ""])

    def table(self, folder, text):
        run = write(folder, "run.txt", text)
        return subprocess.run([sys.executable, "-B", os.path.join(HERE, "table.py"), run, TREE],
                              capture_output=True, text=True, check=True).stdout

    def test_a_stopped_target_leaves_no_total(self):
        with tempfile.TemporaryDirectory() as d:
            out = self.table(d, self.STOPPED)
            total = [r for r in out.splitlines() if r.startswith("#total\t")]
            self.assertEqual(len(total), 1, out)
            self.assertTrue(total[0].startswith("#total\tnone: "), total[0])
            self.assertIn("Library/FortressLibrary.fss rc=-1", total[0])
            self.assertIn("File FortressLibrary.fss has 4 errors.", total[0])
            self.assertNotIn("List.fss", total[0])
            verdict = subprocess.run(["bash", os.path.join(HERE, "compare.sh"), "", write(d, "distance.txt", out)],
                                     capture_output=True, text=True, check=True).stdout
            self.assertTrue(verdict.startswith("DISTANCE NO TABLE   none: "), verdict)

    def test_a_run_whose_targets_end_rc_0_keeps_its_total(self):
        with tempfile.TemporaryDirectory() as d:
            out = self.table(d, self.STOPPED.replace("File FortressLibrary.fss has 4 errors.\n", "")
                                            .replace("rc=-1", "rc=0"))
            self.assertIn("#total\t0\n", out)

    # the shape of a run whose later target imports an api that only that target checks: the
    # tracked method checks it (probe.componentOnly), so its errors print as its @@TC API
    # count and no @@SC line of its own; the first target's apis print both
    LATER_API = "\n".join([
        "### order=check setting=any (extendsObject=false compiledExpr=true) prelude=INTERPRETER"
        " targets=[Library/FortressLibrary.fss, Library/List.fss] overloadCache=false",
        "### target Library/FortressLibrary.fss componentOnly=false",
        "@@SC STAGE\tapi FortressLibrary\thierarchy\terrors=1",
        "@@SC ERR\tapi FortressLibrary\thierarchy\t/x/Library/FortressLibrary.fsi:7:1-9: Probe error.",
        "@@TC API\tFortressLibrary\terrors=1",
        "@@SC STAGE\tcomponent FortressLibrary\ttypecheck\terrors=0",
        "@@TC COMPONENT\tFortressLibrary\terrors=0",
        "### done Library/FortressLibrary.fss rc=0 seconds=1",
        "### target Library/List.fss componentOnly=true",
        "@@TC API\tFortressLibrary\terrors=1",
        "@@TC API\tCovariantCollection\terrors=0",
        "@@TC API\tOneShotFlag\terrors=%d",
        "@@SC STAGE\tcomponent List\ttypecheck\terrors=0",
        "@@TC COMPONENT\tList\terrors=0",
        "### done Library/List.fss rc=0 seconds=0",
        "### all seconds=5 rc=0",
        ""])

    def test_an_api_error_that_prints_no_line_of_its_own_leaves_no_total(self):
        with tempfile.TemporaryDirectory() as d:
            out = self.table(d, self.LATER_API % 1)
            total = [r for r in out.splitlines() if r.startswith("#total\t")]
            self.assertEqual(len(total), 1, out)
            self.assertTrue(total[0].startswith("#total\tnone: "), total[0])
            self.assertIn("OneShotFlag errors=1", total[0])
            self.assertNotIn("FortressLibrary", total[0])
            self.assertNotIn("CovariantCollection", total[0])
            verdict = subprocess.run(["bash", os.path.join(HERE, "compare.sh"), "", write(d, "distance.txt", out)],
                                     capture_output=True, text=True, check=True).stdout
            self.assertTrue(verdict.startswith("DISTANCE NO TABLE   none: "), verdict)

    def test_api_errors_with_lines_of_their_own_keep_the_total(self):
        with tempfile.TemporaryDirectory() as d:
            out = self.table(d, self.LATER_API % 0)
            self.assertIn("#total\t1\n", out)
            self.assertIn("#crash\tnone\n", out)

    def test_an_api_crash_is_a_crash_row(self):
        crash = "@@TC API-CRASH\tCovariantCollection\tjava.lang.NullPointerException\tX.y(X.java:1)\tno\ttype here"
        with tempfile.TemporaryDirectory() as d:
            out = self.table(d, (self.LATER_API % 0).replace("@@TC API\tCovariantCollection\terrors=0", crash))
            self.assertIn("#crash\tapi\tCovariantCollection\tNullPointerException\tno type here\n", out)
            self.assertNotIn("#crash\tnone", out)
            self.assertIn("#total\t1\n", out)

    def test_abstract_method_of_a_prefix_operator(self):
        E = {}
        exec(read(os.path.join(HERE, "errors.py")).split("out_path, runs = sys.argv[1], sys.argv[2:]")[0], E)
        msg = ("The inherited abstract method %s(self:(Integral[\\I\\] & {I})%s):I from the trait Integral[\\ZZ\\]"
               " has no concrete implementation in the object BigNum in component FortressBuiltin.")
        self.assertEqual(E["classify"]("overloading", msg % ("prefix BITNOT", "")), ("abstract-method", "prefix BITNOT"))
        self.assertEqual(E["classify"]("overloading", msg % ("postfix !", "")), ("abstract-method", "postfix !"))
        self.assertEqual(E["classify"]("overloading", msg % ("BITAND", ",b:I")), ("abstract-method", "BITAND"))


if __name__ == "__main__":
    unittest.main()
