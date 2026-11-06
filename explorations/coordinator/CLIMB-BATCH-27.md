<!-- The record of climb batch 27, the fifth batch of the plan's phase 4, the switch-over, for the coordinating session, the curator and the batch's workers. Drafted 2026-11-06 by an Opus planning worker against `main` at `e95fd785e`; `main` moved on to `d165aef79` while it was drafted, by records only (`git diff --stat e95fd785e d165aef79 -- Library ProjectFortress Specification build.xml bin` prints nothing). Its code equals the base build's, `551b02858` (`git diff --stat 551b02858 e95fd785e -- Library ProjectFortress Specification build.xml bin` prints nothing): climb batch 26's landed code, so its gate tables describe the base. Its candidates are the ten rungs that PLAN's phase 4 lists as decided: P-160's second step, the integer conversions (P-161), the natives that no bare helper reaches in two rungs (P-162), `Char`'s `asExprString` (P-163), the I/O objects in two rungs (P-164), `System`'s two natives (review-queue item 355, option 1), and the code generator's walls `asif` (row 818) and the 2-D and 3-D ranges (row 733). It proposes six of them for this batch and four for climb batch 28 (section 2). -->
<!-- Sources: PLAN.md, "Where we stand" and phase 4 whole; POSITIONS P-160 to P-164, P-162's companions P-69 and P-153, P-44, P-58, P-37, P-95, P-96, cited by number; FACTS F-32, F-34, F-131, F-151, F-299, F-308, F-318, F-321; the ledger rows 22, 440, 441, 442, 551, 596, 721, 733, 818, 841, 861, 872, 895, 896; review-queue item 355 in its list (a); the five design reviews, `reviews/number-closure-2026-11-05.md`, `reviews/integer-conversions-2026-11-06.md`, `reviews/hard-set-natives-2026-11-06.md`, `reviews/char-asexprstring-2026-11-06.md`, `reviews/io-objects-carrier-2026-11-06.md`; the post-batch reviews `reviews/batch-26-review.md`, sections 2 and 3, and `reviews/batch-25-review.md`, section 3; `CLIMB-BATCH-26.md` whole and `CLIMB-BATCH-25.md`, as the form; the manual `climb-batch-workflow.md`; the territory map `map/`; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes (section 5, "The planner's probes"): one worktree, `/home/user/fortress-p27`, seeded on the branch `wip/probe-plan-27` from the base build `/home/user/fortress-base27` at `551b02858`, never built, and removed after. Nothing ran in the base build. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, load 0.30 at the end; other agents may have shared the machine; nothing was timed to compare. The probe programs were scratch, not kept; section 5 gives each with its output. -->

# Climb batch 27

## 1. The manifest, rung by rung

The batch's generator writes the workflow's manifest from this section. Each rung's `section` is its section 4 heading, word for word. The rungs are in the manifest's order, N, I, F, C, W, S. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-27.md#`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read.

| id | slug | title | expected minutes |
|---|---|---|---|
| N | `rung-number-open` | `Number` opened: its `comprises` clause removed, with the reflective generator, `Number`'s `=` and the clause's tests | 55 |
| I | `rung-natives-shift-power` | The integers' 16 shifts and powers onto helpers, each a converting declaration around a bare binding | 80 |
| F | `rung-natives-float-number` | The floats' and `Number`'s four, and group 3's six, onto helpers | 75 |
| C | `rung-char-expr-string` | `Char`'s `asExprString` on the completed helper, the parser's hexadecimal digits, and the specification's list | 65 |
| W | `rung-io-writer` | N4's writer rung: the writer objects over a Java-backed `JavaBufferedWriter` | 85 |
| S | `rung-system-string-ops` | `System`'s `getEnvironment` and `getProperty` onto `stringOps`, so that the checker can read `System` | 30 |

Fields common to the six rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-number-open`; **branch:** `wip/<slug>`.
- **writes state:** no. **its test is the stage:** no. **joins the gate:** none. **expected moves:** none. **lands only with:** none.
- **expected checker count:** none declared; the count stays 0. **expected checker crash:** none. Rung W changes the checker's walk-world table of foreign types (`compiler/NamingCzar.java:476-490`), which the checker reads, and no checking code; it declares no crash and no count (section 3, fork 4).

### N
- **slug:** `rung-number-open`
- **worktree:** `/home/user/fortress-number-open`
- **section:** `N. Number opened: its comprises clause removed, with the reflective generator, Number's = and the clause's tests (P-160)`
- **blurb:** P-160's second step: Number's comprises clause removed from FortressLibrary.fss and .fsi, so that a program may declare its own number type below Number; the reflective QuickCheck generator given a fixed choice of the library's number types; Number's = compares a type outside the library's number types by asFloat, the team's 2012 reading; row 551's test retargeted to another closed trait; a test of a program's number in the library's arrays.
- **points to report:**
  - The generator's way, and ReflectiveQuickCheckTest before and after the generator's change.
  - Number's = for a program's type: the values before and after, and the declaration as written.
  - The trait that row 551's test now names, and why.
  - Each test's run before and after through the harness.
  - The count table and the distance table on your final tree, and any site that comes.
  - Every sentence made false.
  - A file edited beyond those named, any edit of walk or the checker, and any line of a team test changed.
- **briefing** (14 keys, 8 checks):
  - P-160 (check): the decision whose second step you build.
  - P-44: AnyIntegral's clause, which stays.
  - F-318 (check): the first step as landed, and the programs it loaded without the clause.
  - F-151: the vectors' bound by Number, whose stated reason your change removes.
  - ledger:551 (check): the row whose test you retarget.
  - ledger:596: the row whose Number half closes.
  - ledger:440: 0/0 equal to itself, which Number's = reaches today at a program's type.
  - `doc:explorations/reviews/number-closure-2026-11-05.md#6. The options` (check): option (b), its step 2 and its files.
  - `doc:explorations/reviews/number-closure-2026-11-05.md#2. What the clause does` (check): what leans on the clause, measured.
  - `code:Library/ReflectiveQuickCheck.fss#object genType(top:Type)` (check): the generator you give a way to make a Number.
  - `code:Library/FortressLibrary.fss#exactValue(x: Number): QQ` (check): the unlisted case that Number's = reaches.
  - `doc:ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss`: the test you retarget.
  - REC `The planner's probes` (check): the walk runs without the clause on this base.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### I
- **slug:** `rung-natives-shift-power`
- **worktree:** `/home/user/fortress-natives-shift-power`
- **section:** `I. The integers' 16 shifts and powers onto helpers, each a converting declaration around a bare binding (P-162)`
- **blurb:** P-162's integers' rung: the shifts and powers of ZZ32, ZZ64, NN32, NN64 and ZZ and ZZ's shift, 16 bindings over AnyIntegral, each keeping its public header and converting its count or exponent in Fortress around a public bare binding at the narrow header, with the private spelling where a stage refuses a pair; about 9 new helpers, the NN32 and NN64 shifts and the five powers, holding P-69 and P-153; a walk guard of the values and a compiled guard of the helpers.
- **points to report:**
  - Each binding moved: its narrow header, the helper it names, new or existing, with its Java signature; each pair given the private spelling, and the stage that refused it.
  - The conversion functions as written, and each call of ZZ's narrow that they make.
  - Your tests before and after through the harness and junit.sh, at NN32 2^31 and above and NN64 2^63 and above.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each value that moves, and each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false.
  - A file edited beyond those named, any edit of a conversion member of the five types, the checker or the compiler.
- **briefing** (16 keys, 9 checks):
  - P-162 (check): the decision whose integers' rung you build.
  - P-69 (check): a shift's count and width, on both paths.
  - P-153 (check): an integer power's type, and its negative exponents.
  - P-58 (check): the binding's form, and the check from the step that moves a binding.
  - F-308: the NN32 and NN64 transfers that the compiled rewrite adds.
  - ledger:441: the prelude's ZZ32 power, whose contract your helpers keep.
  - ledger:442: the prelude's missing shifts on NN32 and NN64.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.1 Group 1` (check): the 16 bindings, their glue and their values under walk.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#(a) A public converting declaration` (check): the pair pattern, its two spellings and its files.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group`: the option the decision took.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long shiftCount(FValue y)` (check): the glue's count, which your conversion keeps.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long powCount(FValue y)` (check): the glue's exponent, which your conversion keeps.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java#public static long negativePow(long base, long exp)`: the glue's answers at a negative exponent.
  - `map:compile-path-walkthrough.md#7. Native bindings in both worlds`: the territory map's two binding mechanisms.
  - REC `The planner's probes` (check): the base's sites, and the conversions one line below them.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### F
- **slug:** `rung-natives-float-number`
- **worktree:** `/home/user/fortress-natives-float-number`
- **section:** `F. The floats' and Number's four, and group 3's six, onto helpers (P-162)`
- **blurb:** P-162's floats' rung: Float's power over AnyIntegral, random, Float's atan2 and printThreadInfo over Number become converting declarations around bare bindings at RR64, ZZ32 or FlatString, or plain Fortress, which repairs random, atan2 and printThreadInfo at a rational; group 3's six, Float's floor and ceiling brackets, the mixed powers of Float and RR32, and FlatString's = and flatConcat at a Char, each on a new one-line helper; about 8 new helpers; a walk test of the rational cases, a walk guard of the values and a compiled guard.
- **points to report:**
  - Each binding moved, the helper it names, new or existing, and its Java signature; each declaration that now converts, as written.
  - The three rational cases before and after, printThreadInfo's printed line among them.
  - Your tests before and after through the harness and junit.sh.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each value that moves, and each test whose verdict changes in ant testSystem or ant testQuick; whether flatConcat at a Char past U+FFFF keeps the glue's answer (fork F4).
  - Every sentence made false.
  - A file edited beyond those named, any edit of Object's or SEQV's bindings, the checker or the compiler.
- **briefing** (16 keys, 9 checks):
  - P-162 (check): the decision whose floats' rung you build.
  - P-58 (check): the binding's form, and the check from the step that moves a binding.
  - F-299 (check): the loader's carriers, FlatString's self and a Char in an int among them.
  - F-308: the Char transfer on the compiled path.
  - F-301: why a helper beats a Fortress composition on the compiled path.
  - ledger:872: a Char past U+FFFF read as its low 16 bits, which flatConcat at a Char keeps.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.2 Group 2` (check): the three over Number, and their defects at a rational.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.3 Group 3` (check): the six, their glue and their values under walk.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#(b) New helpers` (check): the one-line helpers for group 3.
  - `doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group` (check): the option the decision took.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java#public static final class IFloor extends R2L`: a bracket's glue.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java#public static final class Random extends Util.R2R` (check): random's glue, which your helper computes as.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java#public static final class Concat extends ss2S`: flatConcat's glue at a Char.
  - `map:compile-path-walkthrough.md#7. Native bindings in both worlds`: the territory map's two binding mechanisms.
  - REC `The planner's probes` (check): the base's sites.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### C
- **slug:** `rung-char-expr-string`
- **worktree:** `/home/user/fortress-char-expr-string`
- **section:** `C. Char's asExprString on the completed helper, the parser's hexadecimal digits, and the specification's list (P-163; row 861)`
- **blurb:** P-163 and row 861: simpleChar.charToExprString completed, so that the double quote and the backslash reach their own escapes and the code alone is written also for U+201C, U+201D, U+2028, U+2029 and the surrogates; walk's binding of Char's asExprString moved onto it, the last Char binding on glue; the parser's choices of hexadecimal digits tried longer first, with its own new row; the specification's list of character-literal forms revised to name the redundant form, with an Appendix I entry; the two Char guards extended and a walk test that the texts read back.
- **points to report:**
  - The helper's change as written, and the binding's string.
  - The parser's rule before and after, and the new row with its test.
  - Your tests before and after through the harness and junit.sh.
  - The revised list and callout, and the Appendix I entry's Effect.
  - The specification's build: both BUILD SUCCESSFUL lines and the warnings count.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each test whose verdict changes in ant testSystem or ant testQuick, ParserJUTest among them.
  - Every sentence made false.
  - A file edited beyond those named.
- **briefing** (16 keys, 9 checks):
  - P-163 (check): the decision you build.
  - P-96 (check): the revision form.
  - P-95: why every change keeps its original.
  - F-308 (check): Char's helpers, and the one binding left on glue.
  - ledger:861 (check): the row you close.
  - `doc:explorations/reviews/char-asexprstring-2026-11-06.md#(d) The helper` (check): the option the decision took.
  - `doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.4 Whether each form reads back` (check): the parser's two gaps and the sweep.
  - `doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.3 The two forms`: walk's and the helper's texts on the same characters.
  - `doc:Specification/basic/lexical-structure.tex#Character Literals` (check): the list you revise.
  - `doc:Specification/appendices/changes.tex#A comparison at a NaN`: an Appendix I entry's form.
  - `code:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java#public static String charToExprString(int x)` (check): the helper you complete.
  - `code:ProjectFortress/src/com/sun/fortress/parser/Literal.rats#private String UnicodeHexChar =` (check): the parser's rule you reorder.
  - `doc:ProjectFortress/tests/NativeHelperFamilyCharWalk.fss`: the walk guard you extend.
  - `doc:ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss`: the compiled guard you extend.
  - `map:spec-to-implementation.md#Chapter 4, Lexical Structure`: the territory map's row for character literals.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### W
- **slug:** `rung-io-writer`
- **worktree:** `/home/user/fortress-io-writer`
- **section:** `W. N4's writer rung: the writer objects over a Java-backed JavaBufferedWriter (P-164)`
- **blurb:** P-164's writer rung: FortressLibrary declares JavaBufferedWriter and JavaBufferedReader by the prelude's names, the writer trait's 7 bindings on fileOps helpers, two of them new for standard output and standard error in UTF-8; walk carries the writer trait by name as FortressBufferedWriter through a private native object in FortressBuiltin; the checker's walk-world foreign-type table gains both entries; Writer, BufferedWriter and FileWriteStream become plain Fortress objects over a field, stdOut stays a Writer, and their 16 glue bindings go; the reader side is the next batch's.
- **points to report:**
  - Each method changed in StaticNativeApp and each class added under interpreter/; the two table entries in NamingCzar.
  - Each binding moved with the helper it names and its Java signature; the two new helpers.
  - Writer.fsi and File.fsi as changed, and whether you took the last step, FileWriteStream as a WriteStream.
  - Your tests before and after through the harness and junit.sh, the printed lines under walk, and ConcurrentPrinting at four threads on the old code and the new.
  - The count table and the distance table on your final tree, and any site that comes, fileOps read whole for the first time.
  - Each printed line that changes, in your tests or in a program you run, with both outputs; the gather's demos and the commit stage's quick check see the rest. Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false, and each defect of the review's section 2 repaired or filed.
  - A file edited beyond those named, any edit of the reader side, of the prelude or of the run-time classes.
- **briefing** (17 keys, 9 checks):
  - P-164 (check): the decision whose writer rung you build.
  - P-58 (check): the binding's form.
  - F-321 (check): the checker reads the whole helper class, so both traits and both table entries come in this rung.
  - F-299 (check): walk's loader and its carriers, which your change extends.
  - ledger:841: FileWriteStream's flush, declared in its api and absent from its component.
  - `doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type` (check): the option the decision took, its files and its tests.
  - `doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk` (check): today's values, which your tests keep.
  - `doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.3 What the compiled prelude does`: the prelude's helpers for the same operations.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)` (check): the loader's carrier by name, which you extend.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java#static FValue box(Class<?> c, String declared, Object r)`: how the loader boxes a helper's result.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java#private static com.sun.fortress.nodes.Type oneLibraryTypeForForeignJavaType(String s, String method_name, boolean isResultType)` (check): the checker's walk-world reading of a helper's Java types.
  - `doc:Library/Writer.fss` (check): the component you rewrite.
  - `doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java`: the helpers you bind.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait JavaBufferedWriter excludes`: the prelude's trait, whose names and methods yours take.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Int extends ZZ32`: walk's native object below a library trait, the precedent.
  - `map:compile-path-walkthrough.md#7. Native bindings in both worlds`: the territory map's two binding mechanisms.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### S
- **slug:** `rung-system-string-ops`
- **worktree:** `/home/user/fortress-system-string-ops`
- **section:** `S. System's getEnvironment and getProperty onto stringOps, so that the checker can read System (review-queue item 355; row 895)`
- **blurb:** item 355, option 1, and row 895: System's getEnvironment and getProperty name two new helpers of stringOps that compute as systemOps' do, so that no binding of the one library names systemOps, whose getArgs the checker cannot read; systemOps keeps getProperty for the compiler's prelude; the compiled guard retargeted; the checker run over System before and after.
- **points to report:**
  - The two helpers and their Java signatures; what systemOps keeps and why.
  - The compiled guard before and after through junit.sh.
  - The checker over System, before and after, with its error lines.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false, row 896's new line among them.
  - A file edited beyond those named, any edit of CompilerSystem or of getArgs.
- **briefing** (12 keys, 7 checks):
  - `doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355` (check): the answer whose option 1 you build.
  - F-321 (check): the checker reads the whole helper class, and systemOps fails it.
  - ledger:895 (check): the row that closes with your rung.
  - ledger:896: getProperty at an empty name, which stays as it is.
  - P-58: the binding's form.
  - P-37: the compiler's prelude, which keeps its import of systemOps.getProperty.
  - `doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java` (check): the helpers you move.
  - `doc:Library/System.fss` (check): the two bindings you retarget.
  - `doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss` (check): the compiled guard you retarget.
  - `map:README.md#7. Touch this, and that moves@nativeHelpers`: the territory map's row on helper classes and their wrappers.
  - REC `The planner's probes` (check): the checker over System on this base, and its control.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode with the **code generator**. Until the **switch-over**, the compiled path uses its own small library, the **prelude**. After it, the compiled path uses the interpreter's library, the **one library**.
- A **native binding** is a library declaration whose body is `builtinPrimitive("…")`. Its string names a **glue class**, which only walk can call, or a **helper**, a static Java method in `nativeHelpers/`, which both paths call (P-58). A **carrier** is the Java type in which walk passes a declared type to a helper. A **bare binding** is a native binding at types that a carrier takes.
- A **pair** is a public declaration over a wide type that converts its argument in Fortress and calls a bare binding at a narrow type (P-162).
- **The count** and **the distance** are the checker's errors on the one library: the count on its main component, the distance on its fourteen core components. Both are 0 (F-53).
- A **rung** is one change, built by one worker and checked by a second agent, the skeptic. A **batch** is a few rungs landed together after the **gate**. The **gather** composes the rungs on `main`. A **guard** is a test that passes before the change and after it.
- **Appendix I** is the specification's appendix of changes. A revised passage carries a **callout** that names its entry there.
- **microGPT** is the model program, by which the revival is measured: two Fortress programs, each with a quick check beside it. A **model line** is a source line of either; no rung of this batch changes one.

### The scope: six rungs now, four in climb batch 28

The record proposes six rungs for climb batch 27:

- **N**, P-160's second step: `Number`'s `comprises` clause removed, with the reflective generator, `Number`'s `=` and the clause's tests.
- **I**, P-162's integers' rung: 16 bindings onto helpers.
- **F**, P-162's floats' rung: 4 bindings over `Number` and group 3's 6 onto helpers.
- **C**, P-163: `Char`'s `asExprString`, the parser's digits and the specification's list.
- **W**, P-164's writer rung: `stdOut`, `Writer`, `BufferedWriter` and `FileWriteStream` over a Java-backed trait.
- **S**, item 355's option 1: `System`'s two natives onto `stringOps`.

It proposes four for climb batch 28:

- the integer conversions (P-161);
- N4's reader rung (P-164);
- the code generator's `asif` (row 818);
- the code generator's 2-D and 3-D ranges (row 733).

The reasons, one by one:

1. **The natives come first.** They are on the switch-over's critical path (P-33). Five of the six rungs are natives: I, F, C, W and S. Together they take 43 bindings off glue classes (below, "Where the natives stand").
2. **The reader rung cannot run beside the writer rung.** A rung cannot build on another rung of its own batch (PLAN, "The principle for the batches"). The writer rung declares both Java-backed traits and adds both table entries, since the checker reads the whole helper class `fileOps` (F-321; the I/O review, section 6 (b), point 19). The reader rung binds its methods on the trait that the writer rung declares, and edits the same loader methods. So it is climb batch 28's, as P-164 orders it: "The writer side, with `stdOut`, moves before the reader side."
3. **The integer conversions conflict with rung I.** Both rungs edit the same five integer traits, in the component and in the api. On the base, the powers that rung I rewrites stand one unchanged line above the conversions that the conversions' rung rewrites or deletes: `ZZ32`'s power at `Library/FortressLibrary.fss:802-803` and its `widen` at `:805`; `ZZ`'s power at `:1077-1078` and its `narrow` at `:1080-1081`; `NN32`'s power at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:462-463` and its `widen` at `:465` (section 5, "The planner's probes", probe 5). Both rungs also add helpers to the same five helper classes. And rung I's conversion of a `ZZ` count calls `ZZ`'s `narrow`, which the conversions' rung deletes (section 3, fork I2). On one merged tree that call would fail. In climb batch 28 the conversions' rung moves it onto `.asZZ32` with the other callers, its values unchanged (P-161).
4. **P-162 asks for its two rungs in one batch.** So rungs I and F run together, and the conversions wait, not rung I.
5. **N joins the natives, since it shares no declaration with them.** It edits `Number` (`Library/FortressLibrary.fss:381`, `:386-408`) and the reflective generator, far from every other rung's site. PLAN puts it in "the next batch" (phase 4, its line on P-160). Its tests run under walk only, and it adds no Java. The probe on the base shows that walk loads nine library-heavy programs without the clause (section 5, probe 4).
6. **The code generator's walls weigh least.** They are off the natives' path. Neither shares a file with any other rung, so either could join later without a conflict. Climb batch 28, with four rungs, takes both.
7. **Six rungs keep the gather, the gate and the skeptics in bounds.** Climb batch 25 ran seven rungs, six of them on `FortressBuiltin.fss` and four on `FortressLibrary.fss`, each at its own declarations, and landed all seven; its planner's trial of the two nearest, rung R's text and rung N's strings, through `git apply --3way` merged clean (`CLIMB-BATCH-25.md`, section 3, rung R's "Overlaps by file"). Here four rungs share `FortressLibrary.fss` and four share `FortressBuiltin.fss`, each at its own declarations, and section 4, "The rule the rungs keep", gives each rung's place in each shared file. The gate runs once either way: about 21 minutes (`reviews/batch-26-review.md`, section 2). Six skeptics at about 0.17M each is less than climb batch 25's seven.

### Where the natives stand, and where the batch leaves them

- **Today: 449 live bindings, 306 on helpers and 143 on glue classes** (F-299, F-32).
- **After the batch, by reading: 439 live bindings, 339 on helpers and 100 on glue classes.** Rung I moves 16 (glue down 16, helpers up 16). Rung F moves 10: 9 onto helpers, and `printThreadInfo` over `Number` becomes plain Fortress, so the live bindings fall by 1. Rung C moves 1. Rung W takes away 16 glue bindings of the writer side and adds 7 helper bindings. Rung S moves no count: its two bindings already name helpers, of `systemOps`. The gather counts the merged tree.
- **What stays on glue after the batch:** the reader side's 20 (climb batch 28); `ZZ32`'s `big` and `ZZ`'s `narrow` and `widen`, 3 (the conversions' rung, climb batch 28); `Object`'s `asString` and `ilkName` and `SEQV` over `Any`, 3 (P-162: until a carrier of `Any` is designed; its design review, `reviews/any-carrier-2026-11-06.md`, `d165aef79`, waits for his decision); the literals, 32 (N5, in the names batch); D2's 42 (PLAN, phase 4).

### The question for the curator

One, and his go sets it: **Question 1. The scope.** Default: the six rungs above.

- **(a) Six rungs, N, I, F, C, W, S.** About 3.9M tokens written and about 4 hours (below, "Cost").
- **(b) Five rungs, without N.** About 3.3M and 3 h 30 min. N then goes to climb batch 28, which has five rungs. This holds the library's `Number` closed one batch longer. Nothing waits on N but programs' own number types.
- **(c) Seven rungs, with one code-generator wall added to (a).** About 4.5M and 4 h 30 min. The wall shares no file. The record has no brief for it; a fresh planning worker, briefed with this record's sections, would write one, not a resume of the planner, whose rewrite of its whole context cost 749K at climb batch 26 (`reviews/batch-26-review.md`, process finding 1).

The record recommends (a). The consequential test of the `coordinator` skill: no answer reverses a decision of his, touches a model line or cannot be undone, and every rung is decided on record. So the scope is his call on cost and order only.

### What the batch leaves out (section 5, "Left out, each with its home")

- **The four rungs of climb batch 28,** with their reasons above.
- **Beside rung S:** row 896, `getProperty` at an empty name, which raises a Java exception under walk. Rung S keeps the computation, so the row stays.
- **Beside rung W:** the reader side, and N5's run-time classes and raise strings (P-164).
- **Beside rung I:** the prelude's own power and shift defects (rows 441, 442, 523 to 525), which retire with the prelude (P-38).
- **A finding of this planner:** Appendix I cites the library's apis by line in nine places. At least five of the seven citations of `Library/FortressLibrary.fsi` already name other declarations than they claim. A row is drafted for the coordinator to file (section 5, "Rows filed by plan").

### Before the batch runs

- **His go** for the launch, with Question 1's answer or its default.
- **The Fable review of this record:** done; its changes are in the commit that carries this text, and its report went to the coordinator.
- **The manifest's generator,** `compile-ladder/plan-27/manifest/`, made by the coordinator from `plan-26/manifest/` with this record's values (section 6, "The generator").
- **One row filed by plan** (section 5).
- The gather runs the 52 team demos on the merged tree, since rungs N, I, F, C and W change what walk loads or what its natives compute, and W changes every program's printing (P-79; F-283).

### Cost

- **About 3.9M tokens written:** from 3.2M if the workers write as climb batch 26's did, to 5.2M with a judge and a repair round on one rung, or a restart. About 4 hours, at two agents at a time.
- **Workers, about 1.95M:** N 0.25M, I 0.4M, F 0.35M, C 0.3M, W 0.5M, S 0.15M.
- **Skeptics, about 1.0M:** 0.17M each. Climb batch 26's four wrote 107K to 218K, mean 177K; climb batch 25's seven 128K to 210K, mean 164K.
- **The fixed roles, about 0.95M:** the gather about 0.45M with six rungs, the demos and one build of the specification; the merged-diff review about 0.25M; the gate about 0.13M; the commit stage about 0.12M.
- **The evidence.** Climb batch 26 wrote 2.55M for four rungs in 2 h 27 min, 0.64M a rung; its workers 990K against the record's 1.9M, its skeptics 707K, its fixed roles 854K (`reviews/batch-26-review.md`, section 3). Climb batch 25 wrote 6.03M for seven rungs in 4 h 47 min, 0.86M a rung, 0.80M of finished launches; its workers 2.93M, its native rungs 333K to 474K without a cache refill, its fixed roles 1.50M, 0.79M without the gather's two refills (`reviews/batch-25-review.md`, section 3).
- **The figures.** Rungs I and F are put near climb batch 25's native rungs, which wrote new helpers: R wrote 333K for 10 bindings and 10 helpers, N 388K for 18 and 18. W is the largest: walk Java, a library rewrite and a table entry, as climb batch 26's T was (279K), with twice T's tests. C has a helper, a parser rule, a specification revision and two guards, about climb batch 26's S (186K) and a small Java change. S is two helpers, two strings and one guard. N is library text and walk tests only. Per rung, all roles: about 0.65M, near climb batch 26's 0.64M.
- **Climb batch 28, for the order:** about 3.2M and 3 hours for its four rungs.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The question for the curator

Question 1, the scope, is in section 2. Its default is (a), six rungs.

### Forks the batch takes, none consequential

Each default can be undone, none reverses a decision of his, and none touches a model line. Fork F1 reaches the model's power calls only in the way that P-162 decides for them. Where the record leaves a choice open, the default follows the team's own source, which the fork names.

**For the whole batch**

1. **Six rungs, N, I, F, C, W, S, the manifest's order; none lands only with another; no two change one declaration.** Default: so. The files that two rungs share, and each rung's place in each, are in section 4, "The rule the rungs keep, and how they meet". The gather orders the rungs that share a file by its own rule (the manual, "Gather", "The order").
2. **The suites each rung runs, once, after its last change of code** (the `fortress-repo` skill's `tests-running.md`, "When to run a whole suite"). Default: N edits the library only, so it runs its own tests and its named guards in one `harness-one.sh` call. I, F, C, W and S edit a helper class that a binding names, and C the parser and W walk and the compiler too, so each runs `ant testSystem` and `ant testQuick` once, and its compiled guard through `junit.sh`. The way not taken: `ant testSystem` alone for the natives rungs, as climb batch 26's fork 12 gave rung T; `ant testQuick` checks that the prelude's imports of the same helper classes still wrap.
3. **Every rung runs the count stage and the distance stage once each, on its final tree, after its edit and rebuild.** Default: so. Each rung changes text that both stages read: N, I, F, C and W the one library; C the parser; W `NamingCzar`'s table and `fileOps`; S `stringOps`, which both stages read whole, since `FlatString` and `FortressLibrary` name it (F-321). The before is climb batch 26's gate tables, 0 and 0 (`compile-ladder/climb-batch-26/gate/checker-count.txt` and `distance.txt`): run neither stage on the base. No rung declares a count, a crash or a ladder move. The gate runs both again on the merged tree.
4. **No speed pass.** Default: none. No rung changes the checker's checking code. Rung W adds two entries to the walk-world table of foreign types (`compiler/NamingCzar.java:476-490`), data that the checker reads; P-148's timing and second pass are for a change of the checker's code. W reports the count stage's seconds, as climb batch 26's T did.
5. **The 52 team demos at the gather** (F-283; P-79). Default: so, since N changes what walk's load check reads in every program, I, F and C what walk's natives compute, and W every program's printing. No rung runs them.
6. **No helper with state, so review-queue item 335's default stands** (no shared-state check). Default: so. F's `random` helper calls `Math.random()`, as the glue does, and holds no static field of its own. W's standard-stream helpers make a writer at each call, and the library calls each once, as `stdOut` and `stdErr` are made.
7. **One new Appendix I entry, C's.** Default: C's entry goes before "Passages not yet revised" (`Specification/appendices/changes.tex:4637`). Every natives rung makes the list and the count of the entry "A native binding that names a static helper" false (`changes.tex:4432-4562`; its "The other 143 still name a glue class", `:4495`). The gather corrects that entry once, on the merged tree, as the manual's "Corrections still owed" gives it. No rung edits it.
8. **The stale line citations of Appendix I are not this batch's.** Default: no rung lists them and the gather leaves them; a row filed by plan holds them (section 5). The rungs shift the lines of `Library/FortressLibrary.fsi` further, but the citations are already wrong on the base. The way not taken: the gather re-anchors all nine by declaration, a change of the specification that no rung's decision covers.

**Rung N**

9. **N1. The reflective generator's way to make a `Number`.** Default: in `genType` (`Library/ReflectiveQuickCheck.fss:25-45`), `Number` is a special case, as `Any` is (`:30-32`, `genAnyType` at `:49-58`): a fixed choice among the clause's list as it stands, `RR64`, `RR32`, `QQ`, `AnyIntegral` and `IntLiteral`, with `AnyIntegral` read through its own clause as today. So the generated values keep today's kinds. The review names this way (`reviews/number-closure-2026-11-05.md`, section 6, (b), point 1). The way not taken: the generator reads the subtypes that the library declares, which no reflective call gives today.
10. **N2. `Number`'s `=` at a type outside the library's number types.** Default: the two values compare by `asFloat`, the team's 2012 reading for every number (`git show a874948ac:Library/FortressLibrary.fss`, line 357: `opr =(self, b:Number):Boolean = asFloat(self) = asFloat(b)`). The library's own exact types keep their exact comparison (`Library/FortressLibrary.fss:386-397`). So `exactValue`'s unlisted case (`:407`, `Ratio(0, 0)`) is no longer reached. A program's own type can still declare its own `=`, which dispatch prefers. The ways not taken: compare by identity, which needs `SEQV` over `Any`, whose meaning P-162 leaves open; raise, which breaks `=`'s contract as a total operator.
11. **N3. The trait that row 551's test names.** Default: `AnyIntegral`, as the review names, whose clause stays (P-44). If the object cannot define `AnyIntegral`'s abstract members in a small program, the worker takes another closed trait of the library whose members it can define, and names it in the report. The test stays an expected failure of row 551 (walk does not check a clause outside the main component). Row 22 is a duplicate of row 551.
12. **N4. No edit of the specification.** Default: none. Its text gives `Number` no `comprises` clause, and lists future number types under it (the review, section 6, (b), point 2). No Appendix I sentence names `Number`'s clause (the planner's `grep`). The generated api of `FortressLibrary` loses the clause, which the gather's build of the specification shows. The way not taken: one sentence in the number chapter that a program may extend `Number`, which the review leaves optional.
13. **N5. `random`, `atan2` and `printThreadInfo` over `Number` are rung F's.** Default: so. N does not change them; F's conversions call `asFloat` and `asString`, which a program's own number has.

**Rung I**

14. **I1. The public spelling, with the private spelling where a stage refuses a pair** (P-162). Default: each narrow header public and in the api. The narrow types are the prelude's where it declares one: a `ZZ32` count on `ZZ32`, a `ZZ64` count on `ZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:736-737`, `:647-648`). Elsewhere they are the signed type of the receiver's width: a `ZZ32` count on `NN32`, a `ZZ64` count on `NN64`, and a `ZZ32` count on `ZZ`, which `shiftLeft(BigInteger, int)` takes. Every exponent is a `ZZ32`, with its sign and parity kept (the review, section 6, (a), point 3). The prelude's powers on `NN32` and `NN64` take an exponent of their own type (`CompilerBuiltin.fss:809`, `:878`), so at those two the bare half departs from the prelude's header: a signed exponent must reach the helper for P-153's run-time test of its sign, and the review's option (a), which P-162 took, reads every exponent into a `ZZ32`.
15. **I2. A `ZZ` count or exponent is clamped in `ZZ`, then converted by `ZZ`'s `narrow`.** Default: so. `narrow` keeps its glue binding in this batch (`Library/FortressLibrary.fss:1080-1081`). No helper converts a `BigInteger` to an `int` today (`nativeHelpers/simpleArbitraryPrecisionArith.java`, its public methods). P-161's rung, in climb batch 28, moves these calls onto `.asZZ32` with the other callers, their values unchanged, since each clamped value fits. The way not taken: a new private helper over `BigInteger.intValueExact`, which would choose a helper that P-161's rung designs.
16. **I3. A helper that exists where it computes as the glue does; a new one otherwise, at the end of the class of its kind.** Default: so. Each existing helper is checked against the glue's values at the review's counts (section 2.1, point 7) before it is bound. No other rung of the batch edits the five integer helper classes.

**Rung F**

17. **F1. `Float`'s power over `AnyIntegral`.** Default: a public bare `opr ^(self, b:ZZ32):RR64` on a new helper, `Math.pow` with the exponent read as a `double`, as `Float$Pow` reads it, beside `opr ^(self, b:AnyIntegral):RR64 = self^(asFloat(b))`, the team's own text for `Number` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:160`). The model's power calls, all at a `ZZ32` exponent, then go straight to a bare binding (P-162). The way not taken: the private spelling, one more dispatch at each of the model's 18K power calls (the review, section 6, (a), point 11).
18. **F2. `random`'s helper.** Default: new, `scale * Math.random()`, as `Float$Random` computes. Not `LocalRandom.localRandomDouble`, which refuses a bound that is not positive, where walk answers `random(0)` with 0.0 (the review, section 6, (a), point 4).
19. **F3. Where each helper goes.** Default: `Float`'s three and its power in `simpleDoubleArith`; `RR32`'s mixed power in `simpleFloatArith`; `FlatString`'s `=` in `stringOps`, right after `compareTo` (`nativeHelpers/stringOps.java:23-25`); `flatConcat` at a `Char` in `simpleConcatenate`, right after `nativeConcatenate` (`simpleConcatenate.java:16-18`); `random`'s in the class of its kind. Rung S adds to `stringOps` after `lineSeparator` (`:72-74`), another place in the class.
20. **F4. `flatConcat` at a `Char` past U+FFFF keeps the glue's answer.** Default: the helper appends the character's low 16 bits, as the glue reads a `Char`'s text (row 872), so no value moves. Row 872's notes have about 70 characters of room and its row 156 (`ledger.py note 872 TEXT --check`; its 1,197 is a count of bytes, not of characters), so give it one short note through your `record.md`, that `flatConcat`'s new helper reads a `Char` past U+FFFF as the glue does, a sibling site of the row's; the gather rewrites the row if the note does not fit. The way not taken: the whole code point, a value that moves, which row 872's own fix would take for every `Char` at once.
21. **F5. `printThreadInfo` over `Number` calls climb batch 26's pair through `asString`.** Default: `printThreadInfo(a:Number):() = printThreadInfo(a.asString)`, with no native of its own (the review, section 6, (a), point 4). So the live bindings fall by one.

**Rung C**

22. **C1. The parser's fix in this rung, with its own row and test.** Default: so. The review allows it in the same rung (section 6, before (d)). No ledger row holds the two gaps (the review, section 2.4, point 12). The row goes in the rung's `record.md` as `NEW-C-1`.
23. **C2. The list names the redundant form only.** Default: so, as P-163 says. The parser also reads `U+` and a code (`parser/Literal.rats:456-458`), which Steele built "though this is not yet in the spec" (the review, section 6, (d), point 5); adding it is not in the decision.
24. **C3. The read-back test.** Default: a walk test of character literals in each form that the completed helper writes, past U+FFFF among them, each read as the right character. It fails on the base at the parser's gaps and stands for the new row.

**Rung W**

25. **W1. Both traits and both table entries in this rung; the reader trait declared without its methods.** Default: so. `fileOps` takes both Java types, and the checker reads the whole class (F-321; the I/O review, section 6, (b), point 19). The reader trait's methods, its factories, its native object and its carrier are the reader rung's, in climb batch 28.
26. **W2. `stdOut` stays a `Writer`; `Writer` gains a value parameter for its Java writer, and its one-argument form becomes a factory function.** Default: so (P-164; the review, (b), point 13). `Library/Writer.fsi:18` changes. The way not taken: `object Writer(fileName: String)` kept, with the field filled from the name, which makes the standard streams objects of another type.
27. **W3. `File` stays a native component while `FileReadStream` keeps its glue.** Default: so. `FileWriteStream` becomes a plain object inside it. The reader rung ends the native component.
28. **W4. A missing file raises the library's `FileNotFoundException`.** Default: declare it in `FortressLibrary` beside `IOFailure` (`Library/FortressLibrary.fsi:1201`, `.fss:1870`), a singleton object below `CheckedException`, as `IOFailure` is, under the prelude's name: walk's loader raises a helper's `fortress.CompilerBuiltin$FileNotFoundException`, which `fileOps.jbwOpen` throws, as the library's root value of that name (F-299), and cannot pass the message that the prelude's `FileNotFoundException(s: String)` takes (`CompilerBuiltin.fsi:766`; the review, (b), point 15). The way not taken: new helpers for opening that raise `IOFailure`.
29. **W5. `FileWriteStream` as a `WriteStream`, with its `flush`, as a last step that the worker can leave out.** Default: taken, after the rest passes (the review, (b), point 16). It changes `Library/File.fsi:102`, lets a rope write itself on the stream, and adds the `flush` that its api declares (row 841). If the rung runs long, the worker leaves it out and files the two defects as rows.

**Rung S**

30. **S1. `getEnvironment` moves; `getProperty` is copied.** Default: `stringOps` gains both, each computing as `systemOps`' does (`nativeHelpers/systemOps.java:20-27`). `systemOps.getEnvironment` goes, since only the revival's bindings name it. `systemOps.getProperty` stays, since the compiler's `Library/CompilerSystem.fss:13-14` imports it and the prelude does not change (P-37). The ways not taken: both deleted from `systemOps`, which breaks the prelude's import; both moved and `Library/CompilerSystem.fss:13-14` retargeted to `stringOps.getProperty`, an edit of the compiler's own `System` file while review-queue item 319, its fate at the switch-over, is open.
31. **S2. Row 895 closes with no gated test.** Default: `ledger.py close 895 --commit HASH --test none --note` naming the rung's two checker runs over `System`, before and after. No compiled program checks against the one library before the switch-over, and neither stage reads `System` (F-321). Row 896 stays open; the rung's `record.md` gives its whole new line, since its notes cite `systemOps.java:20-21`.

### Points the batch lists for him, not questions

- **Team lines changed.** N: the reflective generator's `genType`, Kang Seonghoon's of 2010 (`Library/ReflectiveQuickCheck.fss`, by its header and `git log --follow`, first commit `e40544c31`); the clause that N deletes is the revival's (`9d2e4c856`), written in place of the team's `comprises { RR64 }`; the team's test `extendNumber.fss` stays as written. I and F: the strings and bodies of the team's bindings. C: Steele's helper `charToExprString` and his parser rule `UnicodeHexChar` of 2011, and the specification's list of character-literal forms, with the original kept in Appendix I. W: the team's `Writer`, `BufferedWriter` and `FileWriteStream` and their api lines. S: none of the team's; `systemOps.getProperty`, the team's, stays.
- **What walk does differently.** A program may declare its own number type below `Number`, and its values compare by `asFloat` (N). `random`, `atan2` and `printThreadInfo` answer at a rational (F). `Char`'s `asExprString` writes the helper's completed form, which reads back, at every code point outside printable ASCII (C). The writer objects run over `fileOps`, in UTF-8, and `BufferedWriter`'s `asString` answers (W). A six-digit or a lower-case five-digit character code now parses (C).
- **What the compiled path does differently.** None before the switch-over. The count stage reads `fileOps` whole for the first time (W).
- **What the specification says differently.** The list of character-literal forms names the redundant form (C).

## 4. The rungs

Line numbers are those of the base, `551b02858`, whose `Library/`, `ProjectFortress/` and `Specification/` are climb batch 26's landing. Each section is the worker's brief for its rung. Each rung's tests come first: written, run through the harness on the base and seen failing, or for a guard seen passing, and committed before the edit or with it (the `fortress-repo` skill's `tests-writing.md`, "The order: the test, its failure, the fix, the pass"). Assert each value that matters inside the test (P-103). Record each defect that you meet in one of the three ways of `tests-writing.md`, "How a defect is recorded". The planner's runs on the base are in section 5, "The planner's probes": each is your before, so run it on your own tree only. The count and the distance before your change are climb batch 26's gate tables, 0 and 0.

### N. `Number` opened: its `comprises` clause removed, with the reflective generator, `Number`'s `=` and the clause's tests (P-160)

**The mission.** The territory map shows the library's vectors and matrices beside the number types, with the element bound `T extends Number` (`map/spec-to-implementation.md`, section 4.2, its last two paragraphs). Its table of the tower predates the flat number types (P-43), so take the types' shape from the decisions on record. This rung lets a program declare its own number type below `Number`, so that such a type can meet that bound.

**The decisions this rung builds.** P-160: the one library's `Number` opens in two steps. The first, walk's reading of the array operators beside `AdditiveGroup`'s own, landed (F-318). This rung is the second: the clause removed from `Library/FortressLibrary.fss` and `.fsi`, the reflective QuickCheck generator given a way to generate a `Number`, `Number`'s `=` given an answer for a type outside the library's number types, and the tests that lean on the clause repaired. P-44: `AnyIntegral`'s clause stays. Row 551: walk does not check a clause declared outside the main component; its test names `Number` today. Row 596: its `Number` half, `tests/extendNumber.fss`, needs no edit once the clause goes. Row 440: `0/0 = 0/0` answers `true` under walk, which `Number`'s `=` reaches for every program's type today. This record's section 3, forks 1 to 3, 5 to 8 and N1 to N5 (9 to 13), give the defaults you build.

**What you build.**
- The tests first (below).
- Delete the clause: `comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` at `Library/FortressLibrary.fss:381` and `Library/FortressLibrary.fsi:289`. Nothing else in `Number`'s header changes.
- The reflective generator, `genType` (`Library/ReflectiveQuickCheck.fss:25-45`): `Number` as a special case beside `Any` (`:30-32`), a fixed choice among the clause's five entries (fork N1). `genAnyType`'s branch `1 => genType(theType[\Number\]()).generate(c)` (`:49-58`) then works through it.
- `Number`'s `=` (`Library/FortressLibrary.fss:386-397`): where either value's type is outside the library's number types, compare by `asFloat` (fork N2). The library's exact types keep their exact comparison through `exactValue` (`:398-408`). Name in your report how you tell the two cases apart, and whether `exactValue`'s `else` branch (`:407`) stays.
- Row 551's test: `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss` and `.test` retargeted to another closed trait of the library, `AnyIntegral` by default (fork N3): its comment, its object and its `load_exception_contains` key.
- The comment of `ProjectFortress/tests/ReflectiveNumberTypes.fss:7`, "The reflective generator finds a generator for every type that Number's comprises clause lists.", made true of the new generator.
- Not yours: `random`, `atan2` and `printThreadInfo` over `Number` (rung F); `AnyIntegral`'s clause (P-44); walk's load check (F-318); `array1` and `array2`, which give a `Vector` only at the eight number types (row 721; F-229); the specification (fork N4).

**Tests, first.**
- `ProjectFortress/tests/NumberEqualityOwnTypeWalk.fss`: two objects of the program below `Number`, each with its own `asFloat`. Assert that two values whose floats differ compare unequal, that a value equals itself, and that a program's value compares with a library number by `asFloat`. Seen failing on the base: the planner's run gave `Cx(1,2) = Cx(3,4): true` (section 5, probe 4). Passing after.
- `ProjectFortress/tests/NumberOwnTypeArrayWalk.fss`: a program's number type that extends `Number` and `AdditiveGroup` at itself, in a library array, through the scalar `+` and `-` between an array and a number, in both orders (`Library/FortressLibrary.fss:4954-4960`), each element asserted. A guard: walk runs it on the base too, since walk does not read the library's clause for a program's type (row 551). It shows P-160's purpose, and fails if walk's load check stops reading the pair. Make the array with a written static argument; `array1` at a program's type gives a plain array (row 721), which the scalar operators take.
- `ProjectFortress/tests/ReflectiveQuickCheckTest.fss`, the team's, unchanged, as the generator's guard: it passes on the base. With the clause removed and the generator not yet changed, see it fail: the planner's run gave rc 1 after 207 s, 'Stack overflow on MethodInvocation at …/Library/ReflectiveQuickCheck.fss:86.13', in `propCommutativeAddition` (section 5, probe 4). Then make the generator's change and see it pass.
- The retargeted `XXXComprisesLibraryTraitUnlistedExtender`: an expected failure on the base and after (walk loads the program; row 551).
- Keep their verdicts: `extendNumber`, `ReflectiveNumberTypes`, `FlatTowerRungF` (the library numbers' `=`), `ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `ArrayElementAlgebra`, `LibraryOverloadFamilies` and `BooleanOps`. The planner ran nine of them without the clause, each rc 0 (section 5, probe 4).
- After the change: your tests and the guards above in one `harness-one.sh` call, the `.test` files beside their `.fss` (fork 2).

**The values you keep.** The library's own numbers compare as today (`FlatTowerRungF`). The generator gives values of the same five kinds. Every program that loads today loads after.

**The stages.** Run the count stage and the distance stage once each on your final tree, each in the background in the form of the skill's `session.md`, "Long commands": `explorations/coordinator/tools/checker-count/run.sh <out-file> <scratch>`, about 180 s, and `explorations/coordinator/tools/distance/run.sh <out-file> <scratch>`, about 250 s (F-240). Their before is 0 and 0 (fork 3). The review measured both at 0 with the clause removed, on the code before climb batch 26 (`reviews/number-closure-2026-11-05.md`, section 2, points 4 and 5). Report both tables; any site that comes is a point to report.

**Rows.**
- Row 596: its `Number` half closes; your `record.md` gives the row's whole new line, its claim narrowed to the five team tests and demos below `Exception`. Read the row with `ledger.py show 596` first.
- Row 551: its reproducer stays the retargeted test; your `record.md` gives its whole new line, where its notes say "Row 22's `object Value extends Number` loads".
- Row 440: no change. `Number`'s `=` no longer reaches it at a program's type.

**Specification.** None of yours (fork N4). List every sentence made false: F-151's "`Number` stays in the bound because its `comprises` clause lists every type below it, so an element type excludes `String`"; F-318's "with `Number`'s `comprises` clause removed in a scratch copy"; F-131, if any of it; row 596's claim; row 551's notes. P-160's "The clause stayed until the first step landed" stays true.

**Files.**
- `Library/FortressLibrary.fss`: the clause at `:381`, and `Number`'s `=` with `exactValue` (`:386-408`), only.
- `Library/FortressLibrary.fsi`: the clause at `:289`, only.
- `Library/ReflectiveQuickCheck.fss`: `genType`, only.
- `ProjectFortress/tests/`: your two tests, the retargeted `XXXComprisesLibraryTraitUnlistedExtender.fss` and `.test`, and the comment of `ReflectiveNumberTypes.fss:7`.
- Not: walk, the checker, `ProjectFortress/LibraryBuiltin/`, `nativeHelpers/`, `Specification/`, the tools; `tests/extendNumber.fss` and `tests/ReflectiveQuickCheckTest.fss`, the team's.

**Reserved points.** A line of a team test that you would change; a program that loads today and is refused after. Report either, with its evidence.

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with rungs I, F and W, each at other declarations; the nearest, rung I's api lines from `.fsi:525`, are about 230 lines from yours (section 4, "The rule the rungs keep").

### I. The integers' 16 shifts and powers onto helpers, each a converting declaration around a bare binding (P-162)

**The mission.** The territory map gives the two ways in which Java code is bound: walk's `builtinPrimitive` and the compiled path's `import java` (`map/compile-path-walkthrough.md`, section 7). By P-58 both paths now call one static helper of `nativeHelpers/`. These 16 bindings take a count or an exponent declared `AnyIntegral`, which no Java type carries (F-299), so no bare binding can name a helper. This rung converts the count in Fortress and calls a bare binding at a narrow type, as the team's prelude does.

**The decisions this rung builds.** P-162: each of the 16 keeps its public header over `AnyIntegral`, converts its count or exponent in Fortress, and calls a public bare binding at the narrow header that the prelude declares, with the private spelling where a stage refuses a pair. P-69: the count may have any integer type; the shift works at the width of the value shifted; a fixed-width shift never goes through `ZZ`. P-153: each integer power answers its base's type; at a negative exponent, 1 and -1 give their power, 0 raises `DivisionByZero`, other bases raise `IntegerOverflow`. P-58: the binding's form, checked from the step that moves it. Rows 441 and 442: the prelude's power and its missing shifts, which your helpers do better in the one library. This record's section 3, forks 1 to 7 and I1 to I3 (14 to 16), give the defaults you build.

**What you build.**
- The tests first (below).
- The 16 declarations, each over `AnyIntegral`:
  - `ZZ32`: `LSHIFT` and `RSHIFT` (`Library/FortressLibrary.fss:796-799`), `^` (`:802-803`);
  - `ZZ64`: `LSHIFT` and `RSHIFT` (`:889-892`), `^` (`:895-896`);
  - `NN64`: `LSHIFT` and `RSHIFT` (`:972-975`), `^` (`:978-979`);
  - `ZZ`: `LSHIFT`, `RSHIFT` and `shift` (`:1069-1074`), `^` (`:1077-1078`);
  - `NN32`: `LSHIFT` and `RSHIFT` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:456-459`), `^` (`:462-463`).
- For each, a public bare binding at the narrow header (fork I1), and the declaration over `AnyIntegral` converting its count or exponent and calling it. The narrow headers go into the api: `Library/FortressLibrary.fsi:525-529` (`NN64`), `:579-583` (`ZZ32`), `:638-642` (`ZZ64`), `:692-700` (`ZZ`), and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:164-168` (`NN32`). Where a stage refuses a pair, give the bare half the private spelling and name the pair and the stage's message.
- Private conversion functions that keep the glue's readings: a count as `Int.shiftCount` reads it, saturating a wide count (`interpreter/glue/prim/Int.java:295-306`); an exponent as `Int.powCount` reads it, its sign and parity kept beyond 64 bits (`:271-283`). The review's probe spelled one as a `typecase` over the five types (`reviews/hard-set-natives-2026-11-06.md`, section 6, (a), reference 2). A `ZZ` count or exponent is clamped in `ZZ` and then converted by `ZZ`'s `narrow` (fork I2).
- The helpers (fork I3): `ZZ32`'s shifts on `simpleIntArith.intBitLeftShift` and `intBitRightShift` (`nativeHelpers/simpleIntArith.java:369`, `:374`); `ZZ64`'s on `simpleLongArith.longBitLeftShift` and `longBitRightShift` (`simpleLongArith.java:343`, `:348`); `ZZ`'s on `simpleArbitraryPrecisionArith.shiftLeft` (`:111`) where it computes as `BigNum$LShift` and `$RShift` do, else a new one; new helpers for the shifts of `NN32` and `NN64` (4, row 442) and the five powers (5), each holding P-153. The existing `intExp` casts `Math.pow` to an `int` and breaks P-153 (row 441), so do not bind it.
- `IntLiteral`'s exponent overloads, as `opr ^(self, b:IntLiteral):ZZ32 = self^(b.asZZ32)` (`:804`), stay; they then reach the bare power.
- Not yours: `ZZ32`'s `big` and `ZZ`'s `narrow` and `widen` (P-161's rung, climb batch 28); every conversion member of the five types; `Float`'s power (rung F); `IntLiteral`'s own bindings (N5); the prelude.

**Tests, first.**
- `ProjectFortress/compiler_tests/NativeHelperFamilyShiftPowerCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): each helper that your bindings name, new and existing, bound in the program's own declarations at the Java types that the compile reads, each value asserted as the walk test asserts it. Bind `NN32` and `NN64` values where a signed and an unsigned reading differ: 2^31 and above for `NN32`, 2^63 and above for `NN64` (the skill's `compiler.md`, "Natives"). Form: `compiler_tests/NativeHelperFamilyIntegersCompiled.fss`. Seen failing on the base through `junit.sh`, where the new helpers do not exist, and passing after.
- `ProjectFortress/tests/NativeHelperShiftPowerWalk.fss`: each of the 16 at the counts and exponents where a conversion bites: a count of each of the five types; negative; at and beyond the width; beyond 64 bits; `NN32` at 2^31 and above and `NN64` at 2^63 and above; each power at a negative exponent, at 1, -1, 0 and 2, and at an overflow. Each value asserted as the glue answers it; the review ran them on this code (section 2.1, point 7). A guard: passing on the base and after.
- Keep their verdicts: `IntSemanticsRungI` (53 lines of shifts), `IntegerPowerContractWalk`, the `NatPower…Walk` tests, `NativeHelperUncarriedWalk` (a refusal over `AnyIntegral`), walk's `NativeHelperFamily…Walk` and the compiler track's `NativeHelperFamily…Compiled`, and `XXXIntegerPowerContractCompiled` (row 441, the prelude's), which stays an expected failure.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2).

**The values you keep.** Every value of the review's section 2.1, point 7, among them 'ZZ32 5 LSHIFT by 2^70 (a ZZ): 0; RSHIFT by -2 (reverses): 20', 'NN64 3 LSHIFT 63: 9223372036854775808' and 'ZZ32 1^(-3) 1; 2^(-1) IntegerOverflow; 0^(-1) DivisionByZero; ZZ32 2^31 IntegerOverflow'. A value that moves is a point to report, with both answers.

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3). The count reads every binding of `FortressLibrary` that you move against its helper's Java signature (P-58), and the distance those of `FortressBuiltin` too. List for your skeptic each binding with its helper's signature.

**Rows.** Rows 441 and 442: where your helpers change what they say of the one library, your `record.md` gives each its whole new line, in `ledger.py`'s row template, since neither has room for a note: row 441's notes hold 699 of 700 characters and its row 1,188 of 1,200, and row 442's row 1,197 of 1,200 (`ledger.py note N TEXT --check` refuses both). Read each with `ledger.py show N` first. Rows 523 to 525 stay with the prelude (P-38).

**Specification.** None of yours. List every sentence made false: Appendix I's entry "A native binding that names a static helper", its list and its "The other 143 still name a glue class" (`Specification/appendices/changes.tex:4495`), which the gather corrects (fork 7); F-32's 143 and F-299's 306 of 449; PLAN's natives line on the integers' rung.

**Files.**
- `Library/FortressLibrary.fss` and `.fsi`: the 13 declarations of `ZZ32`, `ZZ64`, `NN64` and `ZZ`, their narrow headers, their api lines and the private conversion functions, only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`: `NN32`'s three, their narrow headers and api lines, only.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/`: `simpleIntArith.java`, `simpleLongArith.java`, `simpleUnsignedIntArith.java`, `simpleUnsignedLongArith.java` and `simpleArbitraryPrecisionArith.java`, your new helpers at each class's end, only.
- `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`: your tests.
- Not: the conversion members of the five types, `widen`, `narrow`, `unsigned`, `signed`, `big` and their neighbours one line below your powers (`:805-813`, `:1080-1084`, `FortressBuiltin.fss:465-470`); walk; the checker and the compiler; `Specification/`; the tools.

**Reserved points.** A model value that moves; a step that would edit a conversion member. Report either, with its evidence.

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with rungs N (`:381`), F (`:4537`, `:4633`) and W (beside `IOFailure`); `FortressBuiltin.fss` with rungs F (`:154-189`, `:328-329`), C (`:615`) and W (at the component's end). Each at other declarations. No other rung edits your five helper classes.

### F. The floats' and `Number`'s four, and group 3's six, onto helpers (P-162)

**The mission.** As for rung I (`map/compile-path-walkthrough.md`, section 7): both paths call one static helper by P-58. Four of these bindings take a `Number` or an `AnyIntegral`, which no Java type carries. Six take carried types, but no helper computes what their glue computes. The first four convert in Fortress around a bare binding; the six get one-line helpers.

**The decisions this rung builds.** P-162: the declarations over `AnyIntegral` or `Number` keep their public headers and convert around public bare bindings at the narrow headers that the prelude declares; the six over carried types get one-line helpers; `Object`'s `asString` and `ilkName` and `SEQV` over `Any` stay on glue. The review's way, (e), its groups 1 to 3. P-58: the binding's form. F-299: the loader carries `FlatString`'s `self` in a Java `String` and a `Char` in an `int`. Review-queue item 363, `FlatString`'s `=` and `flatConcat(self, b: Char)`, is answered by P-162. This record's section 3, forks 1 to 7 and F1 to F5 (17 to 21), give the defaults you build.

**What you build.**
- The tests first (below).
- Group 1's `Float` power: `opr ^(self, b:AnyIntegral):RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162-163`) beside a public bare `opr ^(self, b:ZZ32):RR64` on a new helper (fork F1).
- Group 2:
  - `random(a:Number):RR64` (`Library/FortressLibrary.fss:4537`) becomes `random(a:Number):RR64 = random(asFloat(a))` beside a public bare `random(a:RR64):RR64` on a new helper (fork F2), with its api line beside `Library/FortressLibrary.fsi:2573`.
  - `Float`'s `atan2(self,x:Number):RR64` (`FortressBuiltin.fss:176-177`) becomes `atan2(self, x:RR64):RR64` on `simpleDoubleArith.doubleATan2`. The `RR64` trait's own `atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))` (`Library/FortressLibrary.fss:494`), which `Float` inherits, converts both and calls it. `Float`'s members are not in its api.
  - `printThreadInfo(a:Number):()` (`Library/FortressLibrary.fss:4633`) becomes `printThreadInfo(a.asString)`, with no native (fork F5). Its api line (`.fsi:2635`) stays.
- Group 3, each on a new one-line helper that computes as its glue does:
  - `Float`'s `opr ^(self, b:RR32):RR64` (`FortressBuiltin.fss:156-157`) and `RR32`'s `opr ^(self, b:Float):RR64` (`:328-329`), both `Float$Pow` today;
  - `Float`'s floor and ceiling brackets, `opr |\self/| : ZZ64` (`:184-185`) and `opr |/self\| : ZZ64` (`:188-189`), `Float$IFloor` and `Float$ICeiling`, which saturate at `Long.MAX_VALUE` and give 0 at a NaN;
  - `FlatString`'s `opr =(self, other: FlatString): Boolean` (`Library/FlatString.fss:70-71`), `FlatString$Eq`;
  - `FlatString`'s `flatConcat(self, b:Char):String` (`:96-97`), `FlatString$Concat`, which reads the `Char` as its text (fork F4).
- Where each helper goes: fork F3.
- Not yours: `Object`'s `asString` and `ilkName` and `SEQV` over `Any` (P-162); `RR32`'s `opr ^(self, b:AnyIntegral)` (`FortressBuiltin.fss:330`), already Fortress; the integers' shifts and powers (rung I); `random`'s other callers.

**Tests, first.**
- `ProjectFortress/tests/NativeHelperRationalArgumentWalk.fss`: the three at a rational, `third: QQ = 1/3`: `random(third)` in range, `atan2(one, third)` with `one = 0.5 + 0.5` a `Float`, at `1.2490457723982544`, and `printThreadInfo(third)` run. Seen failing on the base: `random(third)` ends the run with 'getFloat not implemented for FOrdinaryObject', an `InterpreterBug` (the review, section 2.2, point 12; the planner's run gave the same at a program's own number, section 5, probe 4). Passing after. Walk's harness checks no printed text but 'fail', so quote `printThreadInfo`'s line on the base and after in your report: ' Thread ForkJoinPool-1-worker-1 operating on value Ratio' today, the rational's text after.
- `ProjectFortress/tests/NativeHelperFloatMixedWalk.fss`: the other values, each asserted at today's glue answer (the review, section 2.2, point 11, and section 2.3, point 15): `2.0^RR32 0.5` 1.4142135623730951; `RR32 3.0^Float 2.0` 9.0; the brackets at 2.5 and -2.5 (2, 3, -3, -2), at `10.0^300` (9223372036854775807) and at a NaN (0 and 0); `FlatString`'s `=` at flat strings and at a rope flattened; `flatConcat` at a `Char` below U+FFFF, and past it asserted at today's answer with a message that names row 872, as `CharAsStringSupplementaryWalk` pins `asString`, not as the right value; `Float`'s power at a `ZZ32`, an `NN32` and a `ZZ` exponent; `atan2` at a `ZZ32`, an `RR64` and a `ZZ` `x`; `random` at a `ZZ32`, an `RR64`, 0 and -1 in range. A guard: passing on the base and after.
- `ProjectFortress/compiler_tests/NativeHelperFamilyFloatMixedCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): each new helper bound in the program's own declarations at the Java types that the compile reads, `FlatString`'s over `JavaString` and a `Char` in a `ZZ32`, as `compiler_tests/NativeHelperFamilyCharCompiled.fss` binds them; each value asserted as the walk tests assert it. Seen failing on the base through `junit.sh`, and passing after.
- Keep their verdicts: walk's `NativeHelperFamilyFloatWalk`, `NativeHelperCarriedSelfFlatStringWalk` and `NativeHelperStringRopeWalk`, the library's string tests, the compiler track's `NativeHelperFamilyFloatCompiled` and `NativeHelperFamilyRR32Compiled`.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2).

**The values you keep.** Every value of the review's sections 2.2 and 2.3 at a number type and a flat string. microGPT's power calls, at an `RR64` base and a `ZZ32` exponent, reach your bare binding: their values must equal `Math.pow`'s at the exponent read as a `double`, as the glue computes. The commit stage's quick check of the model is the batch's check of it (P-30).

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3). `FlatString` is one of the distance's fourteen components. List for your skeptic each binding with its helper's Java signature.

**Rows.** None by plan: the three cases at a rational have no row (the review, section 2.2, point 12), and your test repairs them. Row 872: one short note through your `record.md` (fork F4). A defect that you meet and do not repair gets its row through your `record.md`.

**Specification.** None of yours. List every sentence made false: Appendix I's entry "A native binding that names a static helper", its list and its "The other 143 still name a glue class" (fork 7); F-32's 143 and F-299's 306 of 449; F-299's "the native over `String`" where it names `printThreadInfo`; PLAN's natives line on the floats' rung and on item 363.

**Files.**
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: `Float`'s `^` at `RR32` and at `AnyIntegral`, its new bare power, its `atan2` and its two brackets (`:154-189`), and `RR32`'s `^` at `Float` (`:328-329`), only.
- `Library/FortressLibrary.fss` and `.fsi`: `random` with its bare binding and api line, and `printThreadInfo` over `Number`, only.
- `Library/FlatString.fss`: `=` and `flatConcat(self, b:Char)`, only.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/`: `simpleDoubleArith.java`, `simpleFloatArith.java`, `stringOps.java` right after `compareTo`, `simpleConcatenate.java` right after `nativeConcatenate`, and `random`'s class: your new helpers, only.
- `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`: your tests.
- Not: `interpreter/glue/prim/`, whose glue classes stay; walk's loader; the checker and the compiler; `Specification/`; the tools; `compiler_tests/NativeHelperFamilyStringCompiled.fss`, rung S's.

**Reserved points.** A model value that moves. Report it, with both values.

**Overlaps by file.** `FortressBuiltin.fss` with rungs I (`NN32`, `:456-463`), C (`:615`) and W (at the component's end); `FortressLibrary.fss` and `.fsi` with N, I and W; `stringOps.java` with rung S, which adds after `lineSeparator` (`:72-74`), another place in the class. Each at other declarations.

### C. `Char`'s `asExprString` on the completed helper, the parser's hexadecimal digits, and the specification's list (P-163; row 861)

**The mission.** The territory map's row for character literals names the specification's section, the parser's rule and both paths' evaluation (`map/spec-to-implementation.md`, "Chapter 4, Lexical Structure"). A `Char`'s `asExprString` is meant to write a literal that reads back as the same character. Today walk and the compiled helper write different texts, and walk's text outside printable ASCII never reads back (row 861; the review, section 2.4). This rung gives both paths the helper's form, completed, and makes the parser read it at every code point.

**The decisions this rung builds.** P-163: `simpleChar.charToExprString` escapes `"` and `\` as `'\"'` and `'\\'`, writes a printable character as itself with its code, as `'é 00e9'`, and writes the code alone for the controls, U+201C, U+201D, U+2028, U+2029 and the surrogates; walk's binding names it; the parser tries its longer choices of hexadecimal digits first; the specification's list of character-literal forms is revised in the revision form, with an Appendix I entry; row 861 closes with `--settled`. P-96 and P-95: every change of the specification takes the revision form, with its original kept. F-308: `Char`'s 39 helpers, and `asExprString` the last binding over `NN32`, `NN64` and `Char` on glue. This record's section 3, forks 1 to 3, 5 to 7 and C1 to C3 (22 to 24), give the defaults you build.

**What you build.**
- The tests first (below).
- The helper, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java:21-44`: test `"` and `\` before the printable-ASCII line (`:24`), so that they reach `'\"'` and `'\\'`, the switch's own cases (`:32-33`), which no character reaches today. Give the code alone, as `:39` does, also for U+201C, U+201D, U+2028, U+2029 and U+D800 to U+DFFF.
- Walk's binding, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:614-615`: its string names `com.sun.fortress.nativeHelpers.simpleChar.charToExprString`. Walk carries the `Char` in an `int` (F-308). The glue class `Char$ToExprString` stays, unbound.
- The parser, `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:460-464`, `UnicodeHexChar`: try six digits first, then exactly five, then four, in upper case and in lower case. The parser commits to the first choice that matches (the review, section 2.4, point 12), so `'10FFFF'` and `'1000a'` fail today. `ant compileAll` regenerates the parser.
- The specification, `Specification/basic/lexical-structure.tex`, section "Character Literals" (`:797-922`): the list of character-literal forms (`:860-891`) revised to name the redundant form, a printable character, a space and its code, which the parser has read since 2011 (fork C2). One `\revision` callout, labelled by your entry's `\seclabel`.
- `Specification/appendices/changes.tex`: a new `\subsection` with its `\seclabel` before "Passages not yet revised" (`:4637`), in the form of "A comparison at a NaN or at the rational indefinite" (`:4563-4635`): the affected section; the change; the rationale (P-163); the effect: walk's text changes at every code point outside printable ASCII and its five escapes, the compiled path's at 2,054 (`"`, `\`, the four above and the 2,048 surrogates), and no library code, suite test or model line calls a `Char`'s `asExprString` (the review, section 6, (d), point 2, and section 5); the original text, quoted from `Specification-1.0-frozen/basic/lexical-structure.tex`; what a reversal needs; the decision, P-163.
- Not yours: `Char`'s `asString` past U+FFFF (row 872); the parser's other rules; `U+` in the list (fork C2); the entry "A native binding that names a static helper" (the gather, fork 7).

**Tests, first.**
- Extend `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss` with `asExprString` asserted at `a`, `'`, `\`, `"`, the line feed, U+0005, U+007F, `é`, `Σ`, U+201C, U+2028, U+1F600, U+10400 and a surrogate, each at the completed helper's text. Seen failing on the base: walk writes `é` as `'\'0e9''` (the review, section 2.3, point 8). Passing after.
- Extend `ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss` with `cToExprString(x:ZZ32):JavaString = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleChar.charToExprString")` and the same asserts. Seen failing on the base through `junit.sh`, where the helper writes `'"'` and `'\'`. Passing after.
- `ProjectFortress/tests/CharExprStringReadBack.fss` (fork C3): character literals in the forms that the completed helper writes, `'é 00e9'`, `'\"'`, `'\\'`, `'2028'`, `'1f600'`, `'10400'`, `'1000a'`, `'10FFFF'` and `'10ffff'`, each asserted equal to `char(code)`. Seen failing on the base, where the parser refuses `'10FFFF'` and `'1000a'`. Passing after. It is the reproducer of your new row `NEW-C-1`.
- Keep their verdicts: `CharAsStringSupplementaryWalk` (row 872), walk's other `Char` tests, the compiler track, `ParserJUTest` in the misc track, `ant testSpecData`'s 130 examples.
- After the change: `ant compileAll`; `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2). The specification built once in your tree, as the skill's `specification.md`, "Building it", gives: both commands 'BUILD SUCCESSFUL', the warnings `grep` 0; then `git clean -fXq -- Specification`.

**The values you keep.** Every `Char` value but `asExprString`'s; every literal that parses today parses to the same character.

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3): the parser is a phase that both run, and the distance reads `FortressBuiltin`.

**Rows.**
- Row 861: the gather closes it with your commit, `--settled` naming P-163, its test your extended walk guard.
- `NEW-C-1`: the parser's two gaps, in your `record.md` in `ledger.py`'s row template, for the ledger's section "1. Syntax: lexing, expressions and declarations": a code of six digits, and in lower case a code of five whose first four are decimal digits, do not parse (the review, section 2.4, point 12). Lint it with `ledger.py check --rows`. The gather numbers it and closes it with your commit.

**Specification.** Yours, above. List every other sentence made false: Appendix I's count of `Char`'s bindings on helpers, "forty of \TYP{Char}" (`changes.tex:4486`), where your move changes what it counts, which the gather corrects with the entry (fork 7); F-308's last clause, "only `Char`'s `asExprString` stays on a glue class"; F-299's 306 and F-32's 143, each by one; the `fortress-repo` skill's text on the two forms, if any.

**Files.**
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java`: `charToExprString`, only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: `Char`'s `asExprString` string at `:614-615`, only.
- `ProjectFortress/src/com/sun/fortress/parser/Literal.rats`: `UnicodeHexChar`, only.
- `Specification/basic/lexical-structure.tex`: the list and your callout, only. `Specification/appendices/changes.tex`: your new entry, only.
- `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss`, `ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss` and your new test.
- Not: walk's evaluator, `FChar.java` among it; `interpreter/glue/prim/Char.java`; the checker; `Library/`; the other entries of `changes.tex`; the tools.

**Reserved points.** A literal that parses today and parses to another character after; a model line. Report either, with its evidence.

**Overlaps by file.** `FortressBuiltin.fss` with rungs I, F and W, at other declarations; `changes.tex` with the gather's corrections, in other entries. No other rung edits the parser, `simpleChar.java` or the two `Char` guards.

### W. N4's writer rung: the writer objects over a Java-backed `JavaBufferedWriter` (P-164)

**The mission.** The territory map gives the two ways in which Java code is bound, and notes that the compiled path reads a helper class through a wrapper over all of its methods (`map/compile-path-walkthrough.md`, section 7). Today the five I/O objects are glue objects of native components, which only walk can make. Every program's `println` writes through one of them, `stdOut` (`Library/FortressLibrary.fss:4543-4544`). This rung puts the writer side over one Java-backed trait that both paths can name.

**The decisions this rung builds.** P-164: the five I/O objects become plain Fortress objects, each over a Java-backed value in a field, of two traits that `FortressLibrary` declares, `JavaBufferedWriter` and `JavaBufferedReader`, by the prelude's names and methods. Each method is a public native in P-58's form on a helper of `nativeHelpers/fileOps`. Walk carries the two traits by name as `FortressBufferedWriter` and `FortressBufferedReader`, through a private native object below each trait. The checker's walk-world table of foreign types gains both entries with the first binding moved onto `fileOps`. `stdOut` stays a `Writer`, in UTF-8. The writer side moves before the reader side. No model line changes. F-321: the checker reads the whole helper class that a binding names. F-299: walk's loader and its carriers. Row 841: `FileWriteStream`'s `flush` is declared in its api and absent from its component. This record's section 3, forks 1 to 7 and W1 to W6 (25 to 29, and 4), give the defaults you build.

**What you build** (the I/O review, section 6, (b), points 10 to 21).
- The tests first (below).
- `Library/FortressLibrary.fsi` and `.fss`, beside `IOFailure` (`.fsi:1201`, `.fss:1870`): the trait `JavaBufferedWriter`, its four methods as public natives on the existing `fileOps` helpers (`jbwWriteString`, `jbwWriteChar`, `jbwFlush`, `jbwClose`, `nativeHelpers/fileOps.java:94`, `:90`, `:102`, `:106`), and its factories: over a file name on `jbwOpen` (`:78`), and for standard output and standard error on two new helpers. Its `excludes` clause as the prelude's (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:605`). The trait `JavaBufferedReader`, declared without its methods (fork W1). The object `FileNotFoundException` beside `IOFailure` (fork W4).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: a private native object below `JavaBufferedWriter` that holds a Java `FortressBufferedWriter`, as `value object Int extends ZZ32` holds an `int` (`:369-376`). Its native constructor registers it, so that the loader can box a factory's result. No `builtinPrimitive` string names the constructor, so it is no binding (the review, (b), point 12). Put it at the component's end, before its `end`.
- Walk's loader, `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: carry `JavaBufferedWriter` by name as `FortressBufferedWriter`, in `javaFor` (`:51-62`), `javaForSelf(String)` (`:103-111`), `carried` (`:90-93`), and `unbox` and `box` (`:276-307`). A program cannot declare a type of that name, since `FortressLibrary` declares it, so no declaring-component reading is needed (the review, (b), point 11). The walk value class of the native object goes under `interpreter/`.
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:476-490`, the walk-world table: `FortressBufferedWriter` to `FortressLibrary`'s `JavaBufferedWriter`, and `FortressBufferedReader` to `FortressLibrary`'s `JavaBufferedReader`, both in this rung (fork W1). The compiler's world never reads that part of the table (its comment, `:464-468`).
- `nativeHelpers/fileOps.java`: two new helpers, a `FortressBufferedWriter` over standard output and one over standard error, in UTF-8, as the glue writes (the review, section 2.2, point 5, line 9).
- `Library/Writer.fss` and `Library/Writer.fsi`: `Writer` and `BufferedWriter` plain Fortress objects over a field, with their names, methods and texts kept (fork W2). `stdOut` and `stdErr` stay `Writer`s (`Writer.fsi:15-16`). `Writer`'s `fileName` is its value parameter, and `asString` keeps today's text, `Writer on "<stdout>"`. `Writer` gains a value parameter for its Java writer, and its one-argument form becomes a factory function, as `File`'s factories stand beside their objects (`Writer.fsi:18` changes). The component stops being native (`Writer.fss:12`).
- `Library/File.fss`: `FileWriteStream` a plain object over a field (`:66-92`); `File` stays native (fork W3). As a last step that you can leave out, `FileWriteStream` extends `WriteStream` and gains its `flush` (`Library/File.fsi:102`; fork W5).
- The 16 glue bindings of the writer side go: `Writer`'s 11 and `FileWriteStream`'s 5 (the review, section 2.1, points 1 and 2).
- Not yours: the reader side, `Reader`, `FileReadStream`, `stdIn`, `JavaBufferedReader`'s methods and factories, its native object and its carrier (climb batch 28); N5's run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader`, the boxed-type table and `fileOps`' raise strings (P-164); the prelude (P-37); the glue classes under `interpreter/glue/prim/`, which stay, unbound.

**Tests, first.**
- `ProjectFortress/tests/NativeHelperWriterWalk.fss`: the writer side at today's values (the review, section 2.2, point 5): `println` of `héllo λ → ∑`; `stdOut.write` of a flat string, of two characters and of a rope; `stdOut.asString` and `fileName`; `stdErr.write`; a file `Writer` with `write`, `flush` and `fileName`, and its file's contents read back and asserted; a `BufferedWriter` of size 8 over it; `BufferedWriter`'s `asString`; a missing file caught as `FileNotFoundException`. Walk's harness checks no printed text but 'fail', so assert the texts that a value gives, as `asString`, `fileName` and the file's contents, and quote the printed lines in your report. Seen failing on the base: `BufferedWriter`'s `asString` stops with 'Missing value: $under in environment', at `Library/Writer.fss:53:54-57` (the review, section 2.2, point 6), and the missing file is not caught (point 8). Passing after.
- `ProjectFortress/compiler_tests/NativeHelperFamilyWriterCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): the `jbw` helpers and your two new ones bound in the program's own declarations over the prelude's `JavaBufferedWriter`, as `CompilerBuiltin.fss` binds them; a file written, flushed and closed. Seen failing on the base through `junit.sh`, where the new helpers do not exist. Passing after.
- `ProjectFortress/tests/printing/ConcurrentPrinting.fss`, the team's, by hand at four threads, `FORTRESS_THREADS=4`, on the old code and on your tree, each output compared with its oracle file beside it. No target of `build.xml` runs it (the review, section 2.2, point 10).
- Keep their verdicts: the refusal tests of F-299 (`NativeHelperUncarried…Walk`); `LongStringTests`, `FileReadWrite`, `WordCountSmall` and `FileConversion`; every walk test, since every one prints.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2).

**The values you keep.** Every line that a program prints, its bytes and its order: the suites, the gather's 52 demos and the commit stage's quick check of the model see it. A printed line that changes is a point to report, with both outputs.

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3). The count stage then reads `fileOps` whole for the first time: its `jbr` helpers take `FortressBufferedReader`, which is why both entries come now (F-321). The distance reads `Writer`, one of its fourteen components. Report the count stage's seconds (fork 4).

**Rows.** None by plan. The review's section 2 finds defects that no row holds: `BufferedWriter`'s `asString`, a rope written to a `FileWriteStream`, its missing `flush` (row 841), and a missing file that no `catch` sees. Assert in your test each that your change repairs. Give each that stays a row through your `record.md`, lint it with `ledger.py check --rows`, and number it `NEW-W-<n>`.

**Specification.** None of yours. The generated api of `FortressLibrary` gains the two traits, which the gather's build shows. List every sentence made false: Appendix I's entry "A native binding that names a static helper" (fork 7); F-32's 143 and F-299's carriers; the `fortress-repo` skill's `interpreter.md`, "Natives", on the carriers; PLAN's natives line, N4.

**Files.**
- `Library/FortressLibrary.fss` and `.fsi`: the two traits, their factories and `FileNotFoundException`, beside `IOFailure`, only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: the private native object at the component's end, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: the carrier by name, only; a new class under `interpreter/` for the native object's value.
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`: the two entries of the walk-world table, only.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java`: the two new helpers, only.
- `Library/Writer.fss` and `.fsi`; `Library/File.fss`, and `.fsi` with the last step: the writer side, only.
- `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`: your tests.
- Not: `Library/Reader.fss`, `FileReadStream`, the checker's Scala, `runtimeSystem/`, `compiler/runtimeValues/`, the prelude's files, `Specification/`, the tools.

**Reserved points.** A printed line of the model that changes; a step that would change a run-time class or the prelude. Report either, with its evidence.

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with rungs N, I and F, at other declarations; `FortressBuiltin.fss` with rungs I, F and C, at other declarations, yours at the component's end. No other rung edits walk's loader, `NamingCzar`, `fileOps`, `Writer` or `File`.

### S. `System`'s `getEnvironment` and `getProperty` onto `stringOps`, so that the checker can read `System` (review-queue item 355; row 895)

**The mission.** The territory map's table of what moves with what gives the rule behind this rung: the compiled path's wrapper generator wraps every method of a helper class that it is given, and fails the import on a type that it cannot map (`map/README.md`, section 7, its row on `nativeHelpers/`). Against the one library, the checker reads a helper class in the same way (F-321). `System`'s two bindings name `systemOps`, whose `getArgs` answers a type that the one library does not declare. So the checker cannot read `System`, which every microGPT program imports.

**The decisions this rung builds.** Review-queue item 355, answered with option 1: the two helpers moved from `systemOps` into `stringOps`, the class of the other string helpers, with the two binding strings and a compiled guard; row 895 closes when this lands. F-321: a binding passes the checker only where every method of its helper class maps to the one library's types. P-37: the compiler's prelude is not changed before it is deleted. Row 896 stays as it is. This record's section 3, forks 1 to 3, 5 and S1 to S2 (30 and 31), give the defaults you build.

**What you build.**
- The tests first (below).
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java`: `getProperty(String, String)` and `getEnvironment(String, String)`, each computing as `systemOps`' does (`nativeHelpers/systemOps.java:20-27`), placed right after `lineSeparator` (`stringOps.java:72-74`).
- `Library/System.fss:41` and `:51`: their strings name `stringOps`.
- `nativeHelpers/systemOps.java`: `getEnvironment` removed; `getProperty` and `getArgs` stay (fork S1).
- `ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss:16-17`: the two bindings name `stringOps`.
- Not yours: `getArgs` and `getProgramArgsPrim` (D2; review-queue item 319); `System`'s two other errors, at `args` and `getProgramArgs` (`Library/System.fss:29`, `:35`; section 5, probe 3); row 896; `Library/CompilerSystem.fss`.

**Tests, first.**
- The compiled guard, `NativeHelperFamilyStringCompiled`, retargeted: seen failing on the base through `junit.sh`, where `stringOps` has no `getProperty`, and passing after.
- Keep their verdicts: walk's `NativeHelperStringRopeWalk`, which calls both at ropes and flat strings; the compiler track's tests that import `CompilerSystem`.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2).

**The measure.** The checker over `System` against the one library, once on your final tree, by the planner's command (section 5, probe 3). Its before: 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.'. The planner's control, with the two strings put on a helper of `simpleConcatenate` for one run, reached `System`'s component and gave 2 errors at `System.fss:29` and `:35`, at `args` and `getProgramArgs`. So your after should name no `StringVector` and should give those two. Report the run's error lines.

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3): both read `stringOps` whole. Neither reads `System`.

**Rows.**
- Row 895: the gather closes it with your commit, `--test none` with a note that names your two runs of the checker over `System` (fork S2).
- Row 896: your `record.md` gives its whole new line, its notes' helper path `stringOps`, after you read it with `ledger.py show 896`; its claim stays.

**Specification.** None of yours. List every sentence made false: F-321's "`System`'s `getEnvironment` and `getProperty` name `systemOps`, and neither stage reads `System`, so they will stop wherever the checker reads it"; row 895's claim; PLAN's line on `System`'s rung.

**Files.**
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java`: the two helpers after `lineSeparator`, only.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java`: `getEnvironment` removed, only.
- `Library/System.fss`: the two strings, only.
- `ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss`: its two bindings, only.
- Not: `Library/CompilerSystem.fss`, `System.fsi`, the checker, the tools.

**Reserved points.** None foreseen. A step that would edit the prelude is one.

**Overlaps by file.** `stringOps.java` with rung F, which adds right after `compareTo` (`:23-25`), another place in the class. No other rung edits `System`, `systemOps` or your guard.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another (PLAN, "The principle for the batches"). Each rung's tests pass on its own tree. None lands only with another.
- The declarations each rung changes:
  - N: `Number`'s clause and `=`, `exactValue`, `genType`, and four test files.
  - I: 16 bindings with their narrow headers and api lines, private conversion functions, and about 9 helpers in five integer classes.
  - F: 10 bindings, `random`'s bare binding and api line, `printThreadInfo` over `Number`, and about 8 helpers.
  - C: `charToExprString`, one string, `UnicodeHexChar`, the list of forms, a new Appendix I entry, and two guards.
  - W: two traits, their factories and `FileNotFoundException` in `FortressLibrary`, a native object in `FortressBuiltin`, the loader's carrier, two table entries, two helpers, `Writer`, `BufferedWriter` and `FileWriteStream`.
  - S: two helpers, `getEnvironment` out of `systemOps`, two strings and one guard.
- The files that two rungs share, and each rung's place:
  - `Library/FortressLibrary.fss`: N `:381`, `:386-408`; I `:796-1079`; F `:4537`, `:4633`; W beside `IOFailure` (`:1870`).
  - `Library/FortressLibrary.fsi`: N `:289`; I `:525-700`; F beside `:2573`; W beside `IOFailure` (`:1201`).
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: F `:154-189`, `:328-329`; I `:456-463`; C `:614-615`; W at the component's end.
  - `nativeHelpers/stringOps.java`: F right after `compareTo` (`:23-25`); S right after `lineSeparator` (`:72-74`).
- They meet on the merged tree. Walk's suite runs every rung's walk tests. The compiler track runs I's, F's, C's, W's and S's compiled guards. The stages read the library as N, I, F, C and W leave it, `stringOps` as F and S leave it, and the parser as C leaves it, so a site there is to be traced to one rung's edit, against 0 and 0. The specification's build reads C's entry and the generated apis that N, I, F and W change. The gather's 52 demos and the commit stage's quick check of the model see every program's printing and every native at once.

## 5. The candidates, the probes, and what waits

### What the record owes

- **PLAN's next batch** ("Where we stand", "Next"; phase 4): P-160's second step, rung N; the two rungs of the natives that no bare helper reaches, rungs I and F (P-162); `Char`'s `asExprString`, rung C (P-163); the integer conversions (P-161), in climb batch 28 (section 2, reason 3); N4's two rungs, the writer rung W now and the reader rung in climb batch 28 (P-164; section 2, reason 2); `System`'s rung, S (item 355); the literals with N5; the next code-generator rungs, `asif` (row 818) and the 2-D and 3-D ranges (row 733), in climb batch 28 (section 2, reason 6).
- **Climb batch 26's review, "The steps due before the next batch", step 5:** the same list.
- **Review-queue item 363** (`FlatString`'s two): taken by rung F, as P-162 sets.
- **Review-queue item 335** (the natives' shared state): no new helper holds state, so its default stands (section 3, fork 6).

### The planner's probes

**The worktree.** One worktree, seeded from the base build, never built, and removed after:

    explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base27 /home/user/fortress-p27 wip/probe-plan-27

    worktree 551b02858                   1.7 s
    ast caches: 57 renamed, 1 kept, 55 rewritten; jars: 397 constants rewritten
    tracked files: 11466 dated as the base's, 0 stamped later
    seeded from /home/user/fortress-base27 (551b02858) in 3 s

Every run below was in `/home/user/fortress-p27`, with the setup lines of the skill's `build-and-caches.md`. Nothing ran in the base build.

**Probe 1. The base is climb batch 26's code, and `main` holds it.**

    git rev-parse HEAD                                                   # in the base build
    551b028584d79191dddcb3bc8f3ee7f747ed0426
    git diff --stat 551b02858 e95fd785e -- Library ProjectFortress Specification build.xml bin
    (no output)

**Probe 2. The four reviews of 2026-11-06 ran on the base's code; the review of `Number`'s closure did not.** For each review, the code changed between the commit that added it and the base:

    git diff --stat <the commit that added the review> 551b02858 -- Library ProjectFortress Specification build.xml bin | tail -1
    number-closure-2026-11-05 added at 0fea3898e:  60 files changed, 1519 insertions(+), 62 deletions(-)
    integer-conversions-2026-11-06 added at 0b6957535: no code change to 551b02858
    hard-set-natives-2026-11-06 added at c141e7f6a: no code change to 551b02858
    char-asexprstring-2026-11-06 added at aa6ab9368: no code change to 551b02858
    io-objects-carrier-2026-11-06 added at a4f3a4c31: no code change to 551b02858

So the runs of the reviews of the hard-set natives, `Char` and the I/O objects are the befores of rungs I, F, C and W, on this base. Rung N's before is probe 4. The hard-set review's line citations into the library are the base's (`ZZ32`'s `LSHIFT` at `Library/FortressLibrary.fss:796`); the drafted record's were one below them at the integer and float sites, and the Fable review put the base's lines in, read with `git show 551b02858:Library/FortressLibrary.fss`.

**Probe 3. The checker over `System` against the one library (rung S).** The count stage's driver, built as `tools/checker-count/run.sh` builds it, with `Library/System.fss` as its target:

    SCR=$PWD/tmp/sys-check; mkdir -p $SCR/classes $SCR/caches
    CP=$(bin/fortress_classpath | tail -1)
    javac -nowarn -cp "$CP" -d $SCR/classes explorations/coordinator/tools/checker-count/WorldFlip.java \
        explorations/coordinator/tools/checker-count/shadow-src/com/sun/fortress/compiler/StaticChecker.java
    java -Xmx4g -Xss64m -Dfortress.caches=$SCR/caches -Dfortress.analyzer.overload.cache=false \
        -cp $SCR/classes:$CP WorldFlip -stop check Library/System.fss

    ### world=INTERPRETER-LIBRARIES (FortressLibrary/FortressBuiltin/AnyType)  phases=check  target=[Library/System.fss]
    Internally generated library name, in source code NamingCzar.:0:0:
        FortressBuiltin.StringVector is undefined.
    File System.fss has 1 error.
    ### rc=-1

It took 2 s. The control: for one run, the two strings of `Library/System.fss:41` and `:51` put on `simpleConcatenate.nativeConcatenate`, whose Java signature is theirs, with a fresh caches folder, then `git checkout -- Library/System.fss`:

    @@PROBE checkApi System -> errors=0
    @@PROBE checkComponent System
    /home/user/fortress-p27/Library/System.fss:29:40-73:
        Could not check call to function getProgramArgs
        - [\T extends String, int n\]NativeArray.PrimImmutableArray[\T,n\]->NativeArray.PrimImmutableArray[\String,n\] is not applicable to an argument of type ImmutableArray[\String,ZZ32\].
    /home/user/fortress-p27/Library/System.fss:35:5-68:
        Function body has type ImmutableArray1[\String,0,n\], but declared return type is NativeArray.PrimImmutableArray[\String,n\].
    File System.fss has 2 errors.

So with no binding on `systemOps`, the checker reaches `System`'s component, and its two errors are at `args` and `getProgramArgs`, D2's area. Every api it checked on the way had 0 errors. Rung S's after should be this control's lines. `git grep -n systemOps` outside `explorations/` names, besides the skill, `Library/CompilerSystem.fss:13-14` (the prelude's import of `getArgs` and `getProperty`), `Library/System.fss:41`, `:51`, and `compiler_tests/NativeHelperFamilyStringCompiled.fss:16-17`.

**Probe 4. `Number` without its clause, under walk (rung N).** Two scratch programs, run on the base first:

- `NumEqP.fss`: `object V extends Number` with `asFloat(self): RR64 = 0.0`, and `object Cx(re: RR64, im: RR64) extends Number` with `asFloat(self): RR64 = re`; it prints `V = V`, `Cx(1.0, 2.0) = Cx(3.0, 4.0)` and `Cx(1.0, 2.0) = 1`.
- `NumRandomP.fss`: the same `V`, with `asFloat` 2.0, and `println("random(V): " random(V))`.

    bin/fortress NumEqP.fss                  rc=0
    V = V: true
    Cx(1,2) = Cx(3,4): true
    Cx(1,2) = 1: false
    bin/fortress NumRandomP.fss              rc=1
    com.sun.fortress.exceptions.InterpreterBug: …/NumRandomP.fss:9:25-32:
    getFloat not implemented for FOrdinaryObject

Then the clause deleted in scratch, at `Library/FortressLibrary.fss:381` and `Library/FortressLibrary.fsi:289`, and each program run under walk from its own fresh copy of the caches (`cp -a default_repository/caches tmp/nc-caches`; `FORTRESS_CACHES=$PWD/tmp/nc-caches bin/fortress <program>`), so that walk analysed the edited library each time:

    == BooleanOps rc=0 11s
    == ArrayScalarExtension rc=0 12s
    == ArrayOperatorsBesideLibrary rc=0 11s
    == extendNumber rc=0 11s
    == ReflectiveNumberTypes rc=0 13s
    == XXXComprisesLibraryTraitUnlistedExtender rc=0 11s      (it printed: Value)
    == LibraryOverloadFamilies rc=0 11s
    == ArrayElementAlgebra rc=0 12s
    == ExclusionVectorScalarWalk rc=0 11s
    == NumEqP rc=0 10s                                        (the same three lines as on the base)
    == NumRandomP rc=1 9s                                     (the same InterpreterBug)
    == ReflectiveQuickCheckTest rc=1 207s
    propAssociativeAddition:
    Passed 100 test(s).
    propCommutativeAddition:
    com.sun.fortress.exceptions.ProgramError: …/Library/ReflectiveQuickCheck.fss:86:13-30:
    Stack overflow on MethodInvocation at …/Library/ReflectiveQuickCheck.fss:86.13

Then `git checkout -- Library/FortressLibrary.fss Library/FortressLibrary.fsi`, and `git status --porcelain` printed nothing. So on climb batch 26's landed code, with rung T's string pairs beside `printThreadInfo` over `Number`, walk loads the library without the clause; F-318 measured four of these programs on rung W's tree, before rung T landed. The generator overflows as the review measured (its section 2, point 7: 'after 113 s' on another machine load). A program's number compares equal to any other, with the clause and without it.

**Probe 5. The sites, by reading at `551b02858`.** The line numbers of section 4 are read with `grep -n` and `sed -n` on the base. Among them, where rung I's powers meet the conversions that P-161's rung changes (section 2, reason 3):

    Library/FortressLibrary.fss:802  opr ^(self, b:AnyIntegral):ZZ32 =               (rung I)
    Library/FortressLibrary.fss:804  opr ^(self, b:IntLiteral):ZZ32 = self^(b.asZZ32)
    Library/FortressLibrary.fss:805  widen(self):ZZ64 =                                (P-161's rung)
    Library/FortressLibrary.fss:1077 opr ^(self, b:AnyIntegral):ZZ =                  (rung I)
    Library/FortressLibrary.fss:1079 opr ^(self, b:IntLiteral):ZZ = self^(b.asZZ32)
    Library/FortressLibrary.fss:1080 narrow(self):ZZ32 =                               (P-161 deletes it)
    ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:462 opr ^(self, b:AnyIntegral):NN32 =   (rung I)
    ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:464 opr ^(self, b:IntLiteral):NN32 = self^(b.asZZ32)
    ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:465 widen(self):NN64 =                  (P-161's rung)

And `grep -n 'public static' nativeHelpers/simpleArbitraryPrecisionArith.java` lists no helper from a `BigInteger` to an `int` or a `long` (fork I2). `nativeHelpers/fileOps.java` holds `jbrOpen` to `jbrConsume` (`:33-75`) over `FortressBufferedReader` and `jbwOpen` to `jbwClose` (`:78-108`) over `FortressBufferedWriter` (rung W, fork W1).

**Probe 6. `Number`'s `=` in the team's 2012 library (rung N, fork N2).**

    git show a874948ac:Library/FortressLibrary.fss | grep -n -A12 '^trait Number'
    357-    opr =(self, b:Number):Boolean = asFloat(self) = asFloat(b)

`git blame -L 384,408 Library/FortressLibrary.fss` shows today's `=` and `exactValue` as the revival's, `d846e3644` and `e455ccd98` of 2026-09-27 and 2026-09-29, and `9d2e4c856` of 2026-10-02.

**Probe 7. Appendix I's line citations into the library.** `grep -n -E 'nolinkurl\{(Library/FortressLibrary|ProjectFortress/LibraryBuiltin/FortressBuiltin)\.fs[si]\}' Specification/appendices/changes.tex` gives nine. Read at the base, five of the seven into `Library/FortressLibrary.fsi` name other declarations than their sentences claim:

    :1613 "the declaration of AnyIntegral … lines 433--436"     fsi:433-436  opr ^(self, other:AnyIntegral):QQ … floor(self):ZZ
    :1749 "LSHIFT and RSHIFT … lines 459--460"                  fsi:459-460  abstract opr DOT(self,b:I):I; abstract opr TIMES(self,b:I):I
    :1861 "the exclusions of their integer types … 510--511"    fsi:510-511  opr -(self,b:NN64):NN64; opr DOTMINUS(self,b:NN64):NN64
    :1902 "these four traits on Q … lines 387--388"             fsi:387-388  opr MAXNUM(self, b:RR64):RR64 …
    :2684 "RR64's coercion from RR32 … lines 291--296"       fsi:291-296  Number's asFloat and =

The other four were not read. Rungs N, I and W shift those lines again (section 3, fork 8).

**Machine.** nproc 4; Intel Xeon Processor @ 2.10 GHz, 2100 MHz; openjdk 25.0.4.1; `FORTRESS_THREADS=1`; load 0.30 at the end. No run was timed to compare; the seconds above say only how long each took.

**Not run:** the suites, the stages and the gate's other steps on the base, which climb batch 26's gate measured on this code; the demos; a prototype of any rung's change, beyond the scratch removal of the clause and the control of probe 3, each restored.

### Rows filed by plan

One, drafted here in the row template for the coordinator to file with `ledger.py add` before the launch, as climb batch 25's Fable review filed that batch's rows. Its section: 6, "Integer arithmetic", where four of the five declarations it names stand; the ledger files the specification's rows by topic.

    | ? | Appendix I cites the library's apis by line in nine places, and at least five of its seven citations of `Library/FortressLibrary.fsi` name other declarations than their sentences claim: lines 459--460, cited for `LSHIFT` and `RSHIFT` on every integer type, hold `DOT` and `TIMES` | NEGATIVE-VERIFIED | implementation gap (specification) | `appendices/changes.tex`, "Changes Made by the 2026 Revival to the Working Draft" | none | climb batch 27's planner | Read at 551b02858 (`Specification/appendices/changes.tex:1613`, `:1749`, `:1861`, `:1902`, `:2684`): 433--436, cited for `AnyIntegral`, hold `QQ`'s `^`, `floor` and `ceiling`; 510--511, for the integers' exclusions, `NN64`'s `-` and `DOTMINUS`; 387--388, for `QQ`'s four traits, `RR64`'s `MAXNUM`; 291--296, for `RR64`'s coercion from `RR32`, `Number`'s `asFloat` and `=`. Each library edit shifts them. A fix cites the declaration by name, as the tests cite the specification by section. |

The planner linted the line: `ledger.py check --rows` on it with the number 9999 printed '1 rows, 0 fail the template'; with `?` only the number rule fails, which `ledger.py add` fills. The row is 953 characters.

### Left out, each with its home

- **The integer conversions (P-161):** climb batch 28 (section 2, reason 3). Its brief adds rung I's calls of `ZZ`'s `narrow` to the callers that it moves onto `.asZZ32` (fork I2), and moves `ZZ32`'s `big` onto `makeZZfromZZ32` (P-162).
- **N4's reader rung (P-164):** climb batch 28 (section 2, reason 2). It binds the reader trait's 10 methods and factories, adds its native object and carrier, ends `File`'s native component, and makes `Reader` and `FileReadStream` plain objects. F-32's count then falls by its 20.
- **The code generator's walls:** `asif` (row 818) and the 2-D and 3-D ranges (row 733), climb batch 28 (section 2, reason 6); F-34's other kinds after them.
- **Row 896,** `getProperty` at an empty name: stays, beside rung S (fork S2).
- **`Object`'s `asString` and `ilkName` and `SEQV` over `Any`:** on glue until a carrier of `Any` is designed (P-162). The design review `reviews/any-carrier-2026-11-06.md` (`d165aef79`) landed while this record was drafted and waits for his decision; no rung of this batch reads it.
- **The literals, 32:** N5, inside the names batch.
- **D2's 42:** as PLAN has them.
- **Rows 441, 442 and 523 to 525:** the prelude's own defects, which retire with it (P-38).
- **The stale citations of Appendix I:** the row filed by plan, for a later specification rung.
- **FACTS made stale by the landing:** F-32 and F-299 (the counts), F-308 (`Char`'s last binding), F-151 and F-318 (the clause), F-321 (`System`), and the facts the rungs hand over: the commit stage's fold and the routing.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 26: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest, which the batch's generator reads.

### The generator

`compile-ladder/plan-27/manifest/` (`gen27.py`, `lists27.py`, `check27.js`) is the coordinator's, made from `plan-26/manifest/`. This planner's brief let it commit this record and its INDEX line only. It changes from climb batch 26's in these ways:

- the batch's values: `BATCH` `27`, its folder `compile-ladder/climb-batch-27/`, the output `manifest27.js`;
- the rungs from `lists27.IDS` in the manifest's order N, I, F, C, W, S;
- the briefings and checks of section 1, with their reasons, each key checked on the base with `facts-extract.sh --check`;
- every section naming the count stage and the distance stage as stages its rung runs once on its final tree (section 3, fork 3), where climb batch 26's generator checked that three of its four sections named neither;
- no speed pass, and no rung landing only with another;
- `--without` taking any rung, should Question 1 drop one before the launch.

The planner checked every key of section 1 with `facts-extract.sh --check` on `main` at `e95fd785e`, the keys into this record against it as written: each matched one place. The briefings then print about 24.1K tokens (N), 24.0K (I), 21.8K (F), 28.5K (C), 25.0K (W) and 17.5K (S), against 23.4K to 29.7K in climb batch 26; the forks, 13.0K bytes, are in all six. A Fable change to the forks changes these sizes.

### What every agent reads first

This run is climb batch 27, the fifth batch of the plan's phase 4, the switch-over. It takes 43 of the 143 bindings that still name a glue class off them, so that 339 of the library's 439 live bindings then name helpers (section 2, the natives' count), and it opens the library's `Number`. Its rungs:

- N, P-160's second step: `Number`'s `comprises` clause removed, the reflective generator given a fixed choice of the library's number types, and `Number`'s `=` comparing a program's own number by `asFloat`;
- I, P-162's integers' rung: the 16 shifts and powers of the five integer types, each a converting declaration around a bare binding at the narrow header, with about 9 new helpers;
- F, P-162's floats' rung: `Float`'s power, `random`, `atan2` and `printThreadInfo` over `Number`, and group 3's six on one-line helpers;
- C, P-163: `Char`'s `asExprString` on the completed helper, the parser's choices of hexadecimal digits tried longer first, and the specification's list of character-literal forms revised in Appendix I's form;
- W, P-164's writer rung: `stdOut`, `Writer`, `BufferedWriter` and `FileWriteStream` as plain objects over a Java-backed `JavaBufferedWriter`, which walk carries by name and the checker's table names;
- S, item 355's option 1: `System`'s two natives onto `stringOps`, so that the checker can read `System`.

Each rung has tests that fail on the base and pass after, and guards that pass on both. No rung changes the checker's checking code, and none makes a speed pass. Every rung changes text that the stages read, so each runs the count stage and the distance stage once on its final tree, against climb batch 26's landed 0 and 0 (F-53). No rung builds on another, none lands only with another, and no two change one declaration. The gather composes them, corrects the Appendix I sentences that the rungs make false, builds the specification once and runs the 52 team demos on the merged tree. `ant testSpecData` runs in the gate because the landed summary has it.

### Before the launch

The coordinator:

1. **The curator's go,** with Question 1's answer or its default (the `coordinator` skill's `references/batch.md`, "The go"). The Fable review of this record is done; its changes are in the commit that carries this text.
2. **The row filed by plan** (section 5), with `ledger.py add`.
3. **The generator,** made and committed as "The generator" above gives it; its checks run on this record as reviewed: `python3 -B explorations/compile-ladder/plan-27/manifest/lists27.py`, every key matching one place on the base; `gen27.py`; `check27.js` on a scratch splice; `check27.js --write`; `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script; the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
4. **The base build:** `/home/user/fortress-base27`, at `551b02858`, serves if the base differs from it only in record and tool files (`git diff --stat 551b02858 <base> -- Library ProjectFortress Specification build.xml bin` empty). Its trial seed and the old code's run, as the manual's "Before the launch", step 3.
5. **The disk:** `df -h /` against six seeded worktrees, about 206 MB each, the base build and the stages' scratch folders; the probe showed 5.6G free at its start. `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver.
6. **Check-ins** armed for the run's length, about 4 hours, 45 minutes apart.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base27'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch27/launch-args.json`, since a resume needs them.

### The gate, and what it should show

The comparands are climb batch 26's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, over the fourteen, setting compile), in `compile-ladder/climb-batch-26/gate/`.

- `testSystem`: 756, the comparand's sum (184, 193, 183 and 196), plus the planner's named walk tests: N 2, I 1, F 2, C 1, W 1, so about 763, and any more that the rungs add. C extends one walk guard in place.
- `testFast`: the compiler track 1,432 plus the compiled guards of I, F and W (a link and a run each, 6), so about 1,438; C extends one guard in place and S retargets one; the library track 86, the other-compiler track 263 and the misc track as landed.
- `testSpecData`: 130 green; C's edit adds no example.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: 85 programs at `pass`; no rung declares a move.
- The checker count: 0, reported, not declared. Every rung changes what it reads, so a site is to be traced to one rung's edit. W's two table entries and `fileOps` read whole are the newest reading.
- The distance, reported and never red (P-39): 0 over the fourteen, `#crash none`; `compare.sh` prints 'DISTANCE SAME   0'.
- The 52 team demos at the gather, each reaching its end (F-283).
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30). Rung F's bare power at a `ZZ32` exponent is on the model's path, and rung W's writer prints its lines.

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`.

- **Filed by plan:** one, before the launch (section 5).
- **New by plan:** `NEW-C-1`, the parser's two gaps, closed with rung C's commit.
- **Closed:** 861 (C), `--settled` naming P-163; 895 (S), `--test none` with its note (fork S2).
- **Rewritten:** 596 (N), its claim narrowed to its `Exception` half; 551 (N), its notes; 896 (S), its notes' helper path.
- **Rewritten where I's helpers alter what they say:** 441 and 442 (I), whose rows have no room for a note (12 and 3 characters), so I's `record.md` gives each its whole new line.
- **Noted:** 872 (F), a short note that `flatConcat`'s new helper is a sibling site of the row's; by a rewrite if it does not fit.
- Where `ledger.py` refuses a note for length, the gather writes it by a rewrite.

### After the landing

The landing report; the routing of every item for the curator into PLAN, this record's question and forks among them; FACTS: F-32 and F-299 (the counts, by the gather's count of the merged tree), F-308 (`Char`'s last binding moved), F-151 and F-318 (the clause gone), F-321 (`System` read), and the facts the rungs hand over; the skill writer's task with the batch's sentences made false, `interpreter.md`'s carriers among them; the post-batch review. Then climb batch 28: the integer conversions, N4's reader rung, `asif` and the 2-D and 3-D ranges (section 2).

## 7. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [CLIMB-BATCH-26.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-26.md), [CLIMB-BATCH-25.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-25.md), [climb batch 26's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-26-review.md), [climb batch 25's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-25-review.md), [climb batch 26's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-26/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Reviews: [Number's closure](https://github.com/palimondo/fortress/blob/main/explorations/reviews/number-closure-2026-11-05.md), [the integer conversions](https://github.com/palimondo/fortress/blob/main/explorations/reviews/integer-conversions-2026-11-06.md), [the hard-set natives](https://github.com/palimondo/fortress/blob/main/explorations/reviews/hard-set-natives-2026-11-06.md), [Char's asExprString](https://github.com/palimondo/fortress/blob/main/explorations/reviews/char-asexprstring-2026-11-06.md), [the I/O objects](https://github.com/palimondo/fortress/blob/main/explorations/reviews/io-objects-carrier-2026-11-06.md).
- The map: [compile-path-walkthrough.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/map/compile-path-walkthrough.md), [spec-to-implementation.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/map/spec-to-implementation.md), [README.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/map/README.md).
- Library: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss), [FlatString.fss](https://github.com/palimondo/fortress/blob/main/Library/FlatString.fss), [ReflectiveQuickCheck.fss](https://github.com/palimondo/fortress/blob/main/Library/ReflectiveQuickCheck.fss), [Writer.fss](https://github.com/palimondo/fortress/blob/main/Library/Writer.fss), [File.fss](https://github.com/palimondo/fortress/blob/main/Library/File.fss), [System.fss](https://github.com/palimondo/fortress/blob/main/Library/System.fss).
- Code: [StaticNativeApp.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java), [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java), [fileOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java), [systemOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java), [stringOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java), [simpleChar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java), [Literal.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Literal.rats), [Int.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java).
- Specification: [lexical-structure.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/lexical-structure.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
