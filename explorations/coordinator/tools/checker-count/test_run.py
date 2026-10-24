#!/usr/bin/env python3
"""Tests of run.sh's reading of a run: which run outputs give a total, and what the gate's
checker_compare (explorations/coordinator/climb-batch-workflow.js, the gate role's step 8)
makes of the table.

The class Readings runs run.sh itself on small run outputs of its own, in the shapes the
instrumented checker prints. A stand-in for java on PATH prints the canned output in place of
WorldFlip's run, and one for javac compiles nothing, so there is no build and no Fortress
run. The stand-in reads WorldFlip's -stop: a run through the whole compiler phase order (no
-stop) and one stopped after the type checker (-stop check) each have their canned output,
the same one unless a case gives two, since a run that stops at or before the checker prints
the same under both; it refuses any other order. The table, the scratch folder and the
stand-ins go to a temporary folder; nothing in the tree is touched.

usage: python3 explorations/coordinator/tools/checker-count/test_run.py [-v]
"""
import ast, os, subprocess, tempfile, unittest

HERE = os.path.dirname(os.path.realpath(__file__))
TREE = os.path.normpath(os.path.join(HERE, "..", "..", "..", ".."))
RUN = os.path.join(HERE, "run.sh")
WORKFLOW = os.path.join(TREE, "explorations", "coordinator", "climb-batch-workflow.js")

APIS = ["Writer", "NativeArray", "FortressBuiltin", "NatReflect", "RangeInternals", "TypeProxy",
        "FortressLibrary", "FlatString", "String", "List", "Stream", "AnyType"]
HEAD = ("### world=INTERPRETER-LIBRARIES (FortressLibrary/FortressBuiltin/AnyType)  phases=codegen"
        "  target=[Library/FortressLibrary.fss]")
HEAD_CHECK = HEAD.replace("phases=codegen", "phases=check")
ORDER = "    Field/getter/setter declarations should come before method declarations."


def apis(errors=None):
    out = []
    for a in APIS:
        out += ["@@PROBE checkApi %s" % a, "@@PROBE checkApi %s -> errors=%d" % (a, (errors or {}).get(a, 0))]
    return out


def at(path, place):
    return "%s/%s:%s:" % (TREE, path, place)


def run_text(*parts):
    return "\n".join(l for p in parts for l in ([p] if isinstance(p, str) else p)) + "\n"


# the api stops at parse, so the checker checks nothing: the shape of a run on a copy of the
# library whose FortressLibrary.fsi has a getter after a method in four traits
API_PARSE = run_text(HEAD,
    at("Library/FortressLibrary.fsi", "57:5-58:1"), ORDER,
    at("Library/FortressLibrary.fsi", "184:5-185:1"), ORDER,
    at("Library/FortressLibrary.fsi", "197:5-198:1"), ORDER,
    at("Library/FortressLibrary.fsi", "210:5-211:1"), ORDER,
    "File FortressLibrary.fss has 4 errors.", "### rc=-1")

# the component stops at parse after the checker has checked the twelve apis
COMPONENT_PARSE = run_text(HEAD, apis(),
    at("Library/FortressLibrary.fss", "83:5-40"), ORDER,
    "File FortressLibrary.fss has 1 error.", "### rc=-1")

# the checker checks the component and reports its errors: climb batch 21's gate, cut short
CHECKED = run_text(HEAD, apis(), "@@PROBE checkComponent FortressLibrary",
    at("Library/FortressLibrary.fss", "1466:39-1483:4"),
    "    Function body has type OR(I0,O0), but declared return type is O0.",
    at("Library/FortressLibrary.fss", "4395:13-51"), "    Could not check call to operator BIG MIN",
    at("Library/FortressLibrary.fss", "4401:13-51"), "    Could not check call to operator BIG MIN",
    "File FortressLibrary.fss has 3 errors.", "### rc=-1")

# an api's check reports errors, so the checker stops before the component
# (TypeCheckPhase.java: a failed checkApis throws before checkComponents)
API_ERRORS = run_text(HEAD, apis({"FortressLibrary": 2}),
    at("Library/FortressLibrary.fsi", "93:5-41"),
    "    isLeftZero is declared in the api but not in the component.",
    "File FortressLibrary.fss has 1 error.", "### rc=-1")

# the checker passes the component, and the run goes on into the code generator, which throws
# at its first refusal, SumReduction's distribute, a method with a where clause (row 701;
# CodeGen.forFnDecl), so the run prints no error line and no '### rc=' line and ends rc 1: the
# shape of the planner's run of climb batch 22's library text (coordinator/CLIMB-BATCH-22.md,
# section 4). The CompilerError's message opens with its location (CompilerError.java).
CLEAN_CODEGEN = run_text(HEAD, apis(), "@@PROBE checkComponent FortressLibrary",
    'Exception in thread "main" com.sun.fortress.exceptions.CompilerError: ',
    at("Library/FortressLibrary.fss", "3445:5-3446:28"),
    "    Don't know how to compile this kind of FnDecl. node = "
    "distribute(r:MaxReduction[\\T\\]):PossibleReductionPair[\\Maybe[\\T\\]\\]",
    "\tat com.sun.fortress.compiler.codegen.CodeGen.sayWhat(CodeGen.java:1568)",
    "\tat com.sun.fortress.compiler.codegen.CodeGen.forFnDecl(CodeGen.java:2976)")

# the same library, the run stopped after the type checker: no error, rc 0
CLEAN_CHECK = run_text(HEAD_CHECK, apis(), "@@PROBE checkComponent FortressLibrary", "### rc=0")


def read(path):
    with open(path, encoding="utf-8") as src: return src.read()


def write(folder, name, text, mode=0o644):
    p = os.path.join(folder, name)
    with open(p, "w", encoding="utf-8") as o: o.write(text)
    os.chmod(p, mode)
    return p


def checker_compare_source():
    """checker_compare as the gate role's brief gives it: the JavaScript string lines from
    'checker_compare () {' to the function's closing brace, read as string literals"""
    lines = read(WORKFLOW).split("\n")
    start = [i for i, l in enumerate(lines) if l.startswith("'        checker_compare () {")]
    if len(start) != 1: raise AssertionError("checker_compare not found once in %s" % WORKFLOW)
    body = []
    for l in lines[start[0]:]:
        body.append(ast.literal_eval(l.rstrip().rstrip(",")))
        if body[-1] == "        }": return "\n".join(body) + "\n"
    raise AssertionError("checker_compare has no closing brace in %s" % WORKFLOW)


class Readings(unittest.TestCase):
    """run.sh's reading of a run: a total only when the errors are the checker's"""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.d = self.tmp.name
        os.mkdir(os.path.join(self.d, "bin"))
        write(os.path.join(self.d, "bin"), "javac", "#!/bin/sh\nexit 0\n", 0o755)
        write(os.path.join(self.d, "bin"), "java", "\n".join([
            "#!/bin/sh",
            "stop=codegen",
            'while [ $# -gt 0 ] ; do [ "$1" = -stop ] && [ $# -gt 1 ] && { stop=$2 ; shift ; } ; shift ; done',
            'case "$stop" in',
            '  codegen) cat "$CANNED_RUN" ; exit "$CANNED_RC" ;;',
            '  check) cat "$CANNED_CHECK_RUN" ; exit "$CANNED_CHECK_RC" ;;',
            '  *) echo "stand-in for java: no canned run for WorldFlip -stop $stop" ; exit 2 ;;',
            "esac", ""]), 0o755)

    def tearDown(self):
        self.tmp.cleanup()

    def table_path(self, name):
        return os.path.join(self.d, name + ".table.txt")

    def stage(self, name, text, rc=255, check=None, needs_table=True):
        """run.sh on a canned run output, text and rc, the run through the code generator; check,
        (text, rc), is the run stopped after the checker where it differs. Its exit status and its
        table, or "" where it wrote none"""
        check_text, check_rc = check or (text, rc)
        env = dict(os.environ, PATH=os.path.join(self.d, "bin") + os.pathsep + os.environ.get("PATH", ""),
                   FORTRESS_HOME=TREE, TMPDIR=self.d,
                   CANNED_RUN=write(self.d, name + ".run.txt", text), CANNED_RC=str(rc),
                   CANNED_CHECK_RUN=write(self.d, name + ".check-run.txt", check_text), CANNED_CHECK_RC=str(check_rc))
        out = self.table_path(name)
        r = subprocess.run(["bash", RUN, out, os.path.join(self.d, name + ".scratch")], cwd=TREE, env=env,
                           capture_output=True, text=True)
        if needs_table: self.assertTrue(os.path.exists(out), r.stdout + r.stderr)
        return r.returncode, read(out) if os.path.exists(out) else ""

    def compare(self, landed, now):
        r = subprocess.run(["bash", "-c", checker_compare_source() + 'checker_compare "$1" "$2"', "-", landed, now],
                           capture_output=True, text=True)
        return r.returncode, r.stdout

    def rows(self, table, tag):
        return [r for r in table.splitlines() if r.split("\t")[0] == tag]

    def test_an_api_that_stops_at_parse_leaves_no_total(self):
        rc, table = self.stage("api-parse", API_PARSE)
        self.assertEqual(rc, 1, table)
        self.assertEqual(self.rows(table, "#total"), [], table)
        self.assertEqual(self.rows(table, "#locations"), [], table)
        stopped = self.rows(table, "#stopped")
        self.assertEqual(len(stopped), 1, table)
        self.assertIn("Library/FortressLibrary.fss stopped", stopped[0])
        self.assertIn("File FortressLibrary.fss has 4 errors.", stopped[0])
        self.assertIn("Library/FortressLibrary.fsi", stopped[0])
        self.assertEqual(self.rows(table, "#crash"), ["#crash\tnone"], table)
        _, landed = self.stage("checked", CHECKED)
        rc, verdict = self.compare(write(self.d, "landed.txt", landed), write(self.d, "now.txt", table))
        self.assertEqual(rc, 1, verdict)
        self.assertTrue(verdict.startswith("NO TOTAL   "), verdict)

    def test_a_component_that_stops_at_parse_after_its_apis_leaves_no_total(self):
        rc, table = self.stage("component-parse", COMPONENT_PARSE)
        self.assertEqual(rc, 1, table)
        self.assertEqual(self.rows(table, "#total"), [], table)
        stopped = self.rows(table, "#stopped")
        self.assertEqual(len(stopped), 1, table)
        self.assertIn("File FortressLibrary.fss has 1 error.", stopped[0])
        self.assertIn("at Library/FortressLibrary.fss", stopped[0])
        self.assertEqual(table.count("\t0\n"), len(APIS), table)

    def test_a_run_the_checker_finished_keeps_its_total(self):
        rc, table = self.stage("checked", CHECKED)
        self.assertEqual(rc, 0, table)
        self.assertIn("\n#total\t3\n#locations\t3\n#crash\tnone\n", table)
        self.assertEqual(self.rows(table, "#stopped"), [], table)
        p = write(self.d, "now.txt", table)
        self.assertEqual(self.compare(p, p), (0, "COUNT SAME   3, declared none\n"))

    def test_an_api_check_with_errors_keeps_its_total(self):
        rc, table = self.stage("api-errors", API_ERRORS)
        self.assertEqual(rc, 0, table)
        self.assertIn("\nFortressLibrary\t2\n", table)
        self.assertIn("\n#total\t1\n#locations\t1\n", table)

    def test_a_clean_check_reads_as_zero(self):
        _, landed = self.stage("checked", CHECKED)
        rc, table = self.stage("clean", CLEAN_CODEGEN, 1, check=(CLEAN_CHECK, 0), needs_table=False)
        crc, verdict = self.compare(write(self.d, "landed.txt", landed), self.table_path("clean"))
        self.assertEqual((rc, crc, verdict.split("\n")[0]), (0, 0, "COUNT DOWN   3 -> 0, declared none"),
                         table + verdict)
        self.assertIn("\n#total\t0\n#locations\t0\n#crash\tnone\n", table)
        self.assertEqual(self.rows(table, "#stopped"), [], table)
        self.assertEqual(table.count("\t0\n"), len(APIS) + 2, table)


if __name__ == "__main__":
    unittest.main()
