<!-- Climb batch 19, rung S (rung-string-conversion): the skeptic's check of the worker's head 84a17f4bd, its two corrections, and its verdict. -->

# Rung S: the skeptic's check

Head judged: `84a17f4bd`, the worker's last commit on `wip/rung-string-conversion`. My commits after it: `953e87090` (the worker's `REPORT.md` and `record.md`, written byte for byte from the run's journal by `journal-text.py`, both exits 0), `a7d1f5ef8` and `90a5a91bf` (two corrections), and this file. Verdict: **approved**. The change is right and as small as its tests need; I made no fix of the code, and no fix is contested.

## 1. What I checked

- **The tables.** The report's distance and count tables are those of the worker's head; I ran no stage. The diff changes no Scala of the checker and no code the build generates for it, only a Java phase before the checker (`PreDisambiguationDesugaringVisitor.java`) and the library, so the brief asks no count stage of me. Against the worker's files:

      explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-18/gate/distance.txt tmp/rung-string-conversion/distance-postedit.txt
      DISTANCE DOWN   34 -> 31 (-3)
          class X1                      3 -> 2      (-1)  export: component against api
          class NM                      2 -> 0      (-2)  names the api does not declare (getters and methods of Range, String, Generator)

  The worker's `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv` (committed with climb batch 18's tables in `e51759f57`), row by row over all seven cells, by a multiset difference: 34 rows against 31; gone `FlatString.fss:12` (export), `FortressLibrary.fss:4393` and `:4394` ('Any has no getter called asString'); new none; the same with numbers masked. The count: `diff explorations/compile-ladder/climb-batch-18/gate/checker-count.txt tmp/rung-string-conversion/checker-count-postedit.txt` prints only `#total 30` to `28` and `#locations 29` to `27`; every api stays at 0, `#crash none`.
- **The count stage's seconds.** Before, about 68 s, is F-240's figure for climb batch 18's gate and the planner's 60 s, not a run in the worker's session; after, 62.5 s, ran with rung P's worker beside it. The two are not a pair from one run, so they measure no difference; with the checker unchanged none is expected, and the brief asks no speed pass.
- **Test first**, in the worker's transcript (`agent-a631280b2cc55329e.jsonl`). `ExtendsAnyIsObjectWalk` was written at 00:49:54 and seen failing through `harness-one.sh` at 00:50:21 to 00:50:35 (call `x7yj4n`: 'Inf: not an Object', 'FAIL: J13/0:not an Object =/= J9/0:an Object; object Inf extends Any', 'Tests run: 3,  Failures: 1'), before the library's first edit, a Python rewrite at 00:51:43 (call `7hkgwH`). `ExtendsAnyIsObject` was seen failing through `junit.sh` at 00:50:41 to 00:50:47 (call `woQ2o3`: 'FAIL:  not an Object =/= an Object; object Inf extends Any', 'Tests run: 2,  Failures: 1'), before the Java edit at 00:53:54 and its build at 00:54:20. `ConcatAnyOnLeftWalk` was written after the fix (01:05:18) and seen failing through the base build's own harness on the old code at 01:05:22 to 01:05:50 (call `jzmAGP`: 'Non-object receiver (1,2): (Int,Int) trying to invoke method asString', 'Tests run: 1,  Failures: 1'). The passes after the last change of code: `h-new2` 'OK (3 tests)' (call `2oddnR`, tree `7ba1a846d`) and `junit.sh new` 'OK (2 tests)' (call `Uf7BAh`, after the library order of call `4Gj9xE` wrote all five jars). The suites ran in one detached call (`4L6e2x`) on `7ba1a846d`, testSystem after `ConcatAnyOnLeftWalk` existed: testQuick 1272 / 86 / 263, testSystem 166 + 162 + 167 + 163 = 658, testSpecData 130, each 'BUILD SUCCESSFUL' with no failure.
- **The diff**, line by line, against the section, `traits.tex` "Trait Declarations" and F-246. The library lines are the brief's way C and the planner's patch (`opr ||(a:Any, self):String = ("" || a) || self`, `opr ||(self, b:Any):String = self || cast[\Object\](b).asString`), and FlatString's api is its component's header (`Library/FlatString.fss:34`) without the member its component lacks. In the desugaring, `namesOnlyAny` (`PreDisambiguationDesugaringVisitor.java:59-68`) is true for the empty clause and for a clause each of whose types is a `NamedType` named `Any`, so the empty clause keeps the base's rewrite; the trait case skips `Object`'s own declaration beside `Any`'s (`:123-124`). The static-parameter rewrite (`:89-98`) is untouched, as it must be: a type parameter bounded by `Any` admits tuples. `PreTypeCheckDesugaringVisitor`'s twin is called only from the block commented out at its `:63`.
- **The precedent.** The library turns a value into a string by concatenation with the empty string (`Library/FortressLibrary.fss:4494-4497`, "These use concatenation rather than .asString because the formulation with concat also works for tuples"; `:4404-4405`); `cast` is `assert`'s typecase with `throw CastError` (`:33-37`, `:306-316`). The empty clause made `{Object}` and `Any`'s skip by name are the file's own precedent (base `:62-72`, `:111`).
- **The tests.** One comment line each, named by topic, no line numbers. Two cited `basic-lib/objects.tex, section "Objects"`, where `objects.tex` has no section of that name; corrected (section 4). `ConcatAnyOnLeftWalk` compares a tuple's rendering on the left with `("" || pair) || "s"`, the library's own formula, so it guards the left member against the right's rendering, not the rendering itself; the worker's decision 11 gives the reason (row 369's separator), and the rendering is held by `XXXTupleSeparatorRungS`.
- **The ledger and the siblings.** `ledger.py find --cites` gives row 412 for the desugaring visitor, rows 726 and 585 for FlatString's api and 674, 138, 141, 607 for its component; of the rows citing `FortressLibrary.fss`, those at String's two members' lines, now or before their move (`:4393-4394`, `:4262-4263`), are 743, 369, 374 and 585, each in the report; finds for 'extends Any', 'Non-object receiver', 'asString', 'implicitly extends', 'CastError', 'typecase Object', 'FlatString', 'excludes but it extends', 'ClassFormatError', 'duplicate extends' add rows 371, 414, 49 and 363 as bearing; no row names the repeated extends entry (section 4). Walk adds no `Object` of its own (`WellKnownNames.objectTypeName` is used only by the two desugaring visitors), so the one edit reaches both paths. No library, compiler-library or gated-test declaration but the two team tests and the new ones is rewritten, which I confirmed by `grep -rn -E 'extends[[:space:]]*(\{[[:space:]]*)?Any\b'` over `Library`, `ProjectFortress/LibraryBuiltin` and `ProjectFortress/test_library` (only `Object`'s four declarations and `Library/incomplete/`).
- **Competing names.** `ExtendsAnyIsObjectWalk`, `ExtendsAnyIsObject`, `ConcatAnyOnLeftWalk`, `objectness`, `Tany`, `InTany`, `InfBraced`, `namesOnlyAny` and `objectTypeId` have no other declaration in the test folders, the libraries or `ProjectFortress/src/com/sun/fortress/`; rung P's new files (`git -C /home/user/fortress-existential diff --name-only 612869b4a...HEAD`) share no name.
- **The report.** Its provenance lines open at what they claim (`distance-sites.tsv:3`, `:5`, `:6`; `traits.tex:186-188`; base `PreDisambiguationDesugaringVisitor.java:62-73`, `:111`; `FlatString.fsi:16-20` at the base). The six record sentences it lists as made false are at `FACTS.md:105` and ledger lines 301, 449, 770, 687, 686, as it says. No sentence of the specification is made false: `objects.tex:159-160` already says "Every trait other than Any and Object extends Object", and `changes.tex:423` stays true because `Object`'s own declaration is skipped.

## 2. Where I differ from the worker's account

- **Decision 14's reason.** "Every value that moves stopped the program with an uncatchable ProgramError on the old code" holds for the conversion, not for the desugaring: a `typecase` arm and an overload choice for an object declared `extends Any` move quietly, rc 0 on both codes (section 3). The decision's conclusion still holds, because only a program that declares `extends Any` can show those moves, and the worker's scan finds two such gated tests, both unchanged. I corrected the report's sentence in section 5, not the decision.
- **Decision 6, "so that AnyType.Any counts too".** No program shows it: the parser refuses a qualified name in an `extends` clause in both spellings I tried (`trait T extends FortressLibrary.Any end` stops with 'Syntax Error' at the dot, and `object Q extends { AnyType.Any } end` after `import AnyType` at the import). Matching by the name's text is harmless and I left it.
- **The count's "before".** As section 1 says, not a pair from one run; I changed nothing, since the report does not claim a difference.

## 3. My programs, old against new

Scratch programs, not committed; new code with `FORTRESS_HOME` the rung's tree and a private copy of its caches, old code by `old-fortress.sh /home/user/fortress-base19 <tree>/tmp/old-caches`. The diff adds one field, `private final Id objectTypeId`, immutable: the walk programs ran at `FORTRESS_THREADS=4` and again at 1, with the same output at both counts, on both codes.

**The desugaring under walk** (`./run.sh old|new walk 4 SkAnyShapes.fss`): `object Oaa extends { Any, Any }`, `object OTany extends Tany` (`trait Tany extends Any`), `trait TanyB extends { Any }`, `object OParam(x: ZZ32) extends Any`, a generic `object Box[\T extends Any\](v: T) extends Any`, a generic trait `Gen[\T extends Any\] extends Any`, a trait `extends Any comprises { Ca, Cb }`, `object Mixed extends { Any, Tany }` and two object expressions, each through `typecase x of Object` and through `which(x: Any)` beside `which(x: Object)`:

    old:  Oaa notObject Any      OTany notObject Any   ...   Mixed notObject Any   anon notObject Any   Plain Object Object   pair notObject Any
    new:  Oaa Object Object      OTany Object Object   ...   Mixed Object Object   anon Object Object   Plain Object Object   pair notObject Any

`()` and a function stay 'notObject Any'; every run rc 0. `SkAnyMembers.fss`: on the old code 'Cannot find definition for method asString given receiver Inf'; on the new 'asString Inf', 'asDebugString a Inf: Inf', 'asExprString no expression for Inf', 'eq true true true', `println(Inf)` 'Inf', `"tuple " (Inf, 1)` 'tuple (Inf,1)'.

**The desugaring compiled** (`./run.sh old|new compile 4 ...`):

    SkAnyShapesD (no { Any, Any })  old: OTany notObject Object ... Mixed notObject Object     new: OTany Object Object ... Mixed Object Object     (rc 0 both)
    SkAnyShapesC ({ Any, Any })     old: java.lang.ClassFormatError: Duplicate interface name "fortress/AnyType$Any" in class file SkAnyShapesC$Oaa
                                    new: Oaa Object Object ... Plain Object Object, run rc=0
    SkAnyPrintC                     old: SkAnyPrintC.fss:14:26-36: Inf has no getter called asString; compile rc=255
                                    new: Inf / InT / took an Object / took an Object / asString Inf; run rc=0

On the old compiled path the overload `which(x: Object)` was already chosen for `OTany` while its `typecase` took `else`; the change makes the two agree, and `ExtendsAnyIsObject` asserts the part that moved.

**An `excludes` clause naming `Object`** (`SkAnyExcl.fss`, `SkAnyExclC.fss`, `SkEmptyExcl.fss`: `trait Tx extends Any excludes { Object } end`, `trait Ty excludes { Object } end`, an object of each):

    walk      Tx: old 'Ox notObject', new 'Ox Object'          Ty: 'Oy Object' on both
    compiled  Tx: old 2 errors, new 3, the new one 'Type Tx excludes CompilerBuiltin.Object but it extends CompilerBuiltin.Object.'
              Ty: the same 3 errors on both, 'Type Ty excludes CompilerBuiltin.Object but it extends CompilerBuiltin.Object.' among them

The specification makes such a trait a static error: it implicitly extends `Object` (`traits.tex`, "Trait Declarations") and may not extend what it excludes. The compiled checker now refuses `Tx` as it refused `Ty`; walk loads both, row 371 (walk checks no `excludes` clause against an `extends` clause), whose notes are at their limit of 700 characters, so `record.md` carries the face for the gather.

**A user trait named `Object`** (`SkUserObject.fss`): refused on both codes ('Type name may refer to: Object, FortressBuiltin.Object'), with one message fewer on the new, since the skip by name no longer inserts `extends Object` into it.

**The conversion under walk**, 28 one-expression programs (`conv/SkC*.fss`), old against new:

    moved:  ((1,2),3) || "s"  '((1,2),3)s'    (1,"a") || "s"  '(1,a)s'    (1,2,3,4,5,6) || "s"  '(1,2,3,4,5,6)s'    ((),()) || "s"  '((),())s'
            (1,2) || ""  '(1,2)'    (1,2) /// "s"  '(1,2)', a blank line, 's'    x: Any = (1,2); x || "s"  '(1,2)s'    (1,2) || "s" || (3,4)  '(1,2)s(3,4)'
            (Inf, 1) || "s"  '(Inf,1)s'    "s" || (Inf, 1)  's(Inf,1)'    Inf "s"  'Infs'
            each a ProgramError on the old code ('Non-object receiver ...' or 'Cannot find definition for method asString given receiver Inf')
    CastError for ProgramError:  (fn (y:ZZ32) => y) || "s", (inc, 1) || "s", "s" || (inc, 1), (1,...,7) || "s"  ('FortressLibrary.fss:36:13-27: CastError')
    the same on both:  "s" || ((1,2),3), "s" || ("a","b"), "" || (1,2), "s" // (1,2), Just[\ZZ32\](3) || "s", 3.5 || "s", 'c' || "s", "s" || false,
                       Infinity || "s" (own asString), BIG ||[i <- 0#3] (i,i) '(0,0)(1,1)(2,2)'

`"s" || [1 2 3]` stops on both with 'RHS does not yield a tuple' at `FortressLibrary.fss:4386`: the untyped array literal in argument position is passed as a paste, row 49, unchanged. `SkFlat.fss`, through `import FlatString.{FlatString}`, is the same on both (`flat 3 a abcx abcy`, `|d|` of a `DelegatedIndexed` 4) until `(1,2) || g`, which the old code stops on and the new prints `(1,2)pq`.

**The failure-mode question.** The loud failures turned into values are a tuple, `()` or an object declared `extends Any` on the left of a string (a tuple's string is its elements' in parentheses, `objects.tex`, trait `Fortress.Core.Tuple`), an object declared `extends Any` with no `asString` of its own printing its bare type name (P-91), and on the compiled path `println(Inf)` and `{ Any, Any }`; each is what the specification gives. Functions and long tuples stay loud, by `CastError`, which a program can catch, where `ProgramError` could not be. Under walk `extends Any excludes { Object }` stays quiet in another wrong way (row 371).

## 4. My two corrections

- **`a7d1f5ef8`: a repeated `extends` entry, home 2, and the report's moves.** My `SkDupC.fss`, `trait Tr end; object Odd extends { Tr, Tr } end`, compiles and links on both codes and dies at class load, 'java.lang.ClassFormatError: Duplicate interface name "SkDupC$Tr" in class file SkDupC$Odd'; walk prints 'Odd Tr'. `NamingCzar.extendsClauseToInterfaces` writes one interface per entry (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:733-755`). The rung clears only the `{ Any, Any }` instance. The specification makes the clause "a set of trait references" (`traits.tex`, "Trait Declarations"), so the object extends `Tr`; a program the checker accepts that then fails at class load is home 2 (the skill's `tests-writing.md`, "How a defect is recorded"). The pair `ProjectFortress/compiler_tests/XXXDuplicateExtendsEntry.fss` with `DuplicateExtendsEntryLink.test` (link) and `XXXDuplicateExtendsEntry.test` (run, `run_out_contains=REACHED`), and the row 790 in `record.md`, for section 12. Through the harness:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests DuplicateExtendsEntryLink.test XXXDuplicateExtendsEntry.test
      . run ProjectFortress/compiler_tests/XXXDuplicateExtendsEntry (259ms) REACHED
      java.lang.ClassFormatError: Duplicate interface name "XXXDuplicateExtendsEntry$Tr" in class file XXXDuplicateExtendsEntry$Twice
      Saw expected failure (Exit code != 0)
      OK (2 tests)

  With `extends { Tr }` for one run, then restored (`junit.sh skred`, the same files): 'REACHED', 'PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1'. On the old code (`old-fortress.sh ... junit <tree>/ProjectFortress/compiler_tests/DuplicateExtendsEntryLink.test <tree>/.../XXXDuplicateExtendsEntry.test`): 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'. In the same commit, `REPORT.md` section 5 states the desugaring's quiet moves and its compiled verdicts (section 3 above), sections 9 and 11 list them and the new defect, and `REPORT.md` section 12 and `record.md`'s FACTS line say "object expression under walk", since the compiled path compiles none; `record.md` gains row 371's face. Settled by `traits.tex` and the skill's rule above for the test, and by the measurements of section 3 for the text.
- **`90a5a91bf`: the citation.** `ExtendsAnyIsObjectWalk.fss` and `ExtendsAnyIsObject.fss` cited `basic-lib/objects.tex, section "Objects"`; "Objects" is the chapter, and the sentence the tests rest on, `Object` "the root of the type hierarchy for all user-constructed objects", is in its entry trait `Fortress.Core.Object`, which they now cite (the skill's `tests-writing.md`, "Names, comments, citations": "by file and section or entry"). A comment line only; after it `harness-one.sh` printed 'OK (1 test)' for the walk test and `junit.sh skcite` 'OK (2 tests)' for the compiled one.

No whole suite: neither correction changes Java or Scala, and the gate runs every suite on the merged tree.

## 5. For the record

- **The specification's `Tuple`.** `objects.tex` declares `trait Tuple extends Any excludes { Object }` (trait `Fortress.Core.Tuple`), while `traits.tex` and `objects.tex:159-160` have every trait but `Any` and `Object` extend `Object`. Neither library declares `Tuple`, so the rewrite reaches no such declaration today; a library that ships the specification's `Tuple` would see it made an `Object` by this rewrite, against its own `excludes` clause.
- **Rung P.** It meets this rung at the gate: walk's load check and the checker's exclusion test now read an object declared `extends Any` as an `Object`, so an overload pair over `Object` and such a trait becomes one more specific than the other where the two were unrelated.

## 6. Verdict

Approved. The rung does what its section says, by the library's way and the desugaring's own precedent, with its tests seen failing first; the tables are the worker's head's and match its files; my two commits are corrections, each settled.
