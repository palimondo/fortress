<!-- The record of climb batch 27, the fifth batch of the plan's phase 4, the switch-over, for the coordinating session, the curator and the batch's workers. Drafted 2026-11-06 by an Opus planning worker against `main` at `e95fd785e`; `main` moved on to `d165aef79` while it was drafted, by records only (`git diff --stat e95fd785e d165aef79 -- Library ProjectFortress Specification build.xml bin` prints nothing). Its code equals the base build's, `551b02858` (`git diff --stat 551b02858 e95fd785e -- Library ProjectFortress Specification build.xml bin` prints nothing): climb batch 26's landed code, so its gate tables describe the base. Its candidates are the ten rungs that PLAN's phase 4 lists as decided: P-160's second step, the integer conversions (P-161), the natives that no bare helper reaches in two rungs (P-162), `Char`'s `asExprString` (P-163), the I/O objects in two rungs (P-164), `System`'s two natives (review-queue item 355, option 1), and the code generator's walls `asif` (row 818) and the 2-D and 3-D ranges (row 733). It proposes six of them for this batch and four for climb batch 28 (section 2). Rungs N and F were rewritten later on 2026-11-06 for P-165, `asFloat` and `=` off `Number`, by a second planning worker against `main` at `c1906ac71`, whose code is still the base's (`git diff --stat 551b02858 c1906ac71 -- Library ProjectFortress Specification build.xml bin` prints nothing); every other rung stands as the Fable review left it at `6afd874ea`. A second Fable review read the two rewritten sections; its changes are in the commit that carries this text. -->
<!-- Rungs A and E, the carrier of `Any` (P-167) and what `SEQV` means (P-168, P-166), were added on 2026-11-07 at the curator's word of 2026-11-06, and rungs G and T, the code generator's walls `asif` (row 818) and the trait table (row 733), at his word of 2026-11-07, about 05:2x UTC, that a batch takes all the work that is well defined and in conflict with nothing; by a third planning worker against `main` at `1176c7979`, then `eef4072a9`, by records only, whose code is still the base's (`git diff --stat 551b02858 1176c7979 -- Library ProjectFortress Specification build.xml bin` prints nothing). With rung A it takes, at the coordinator's rider of 2026-11-07 under the same rule, `match` over `String` (`reviews/strings-in-fortress-2026-11-07.md`, section 5, point 56). It added their rows of section 1, their forks 36 to 56, their sections and lines of section 4, their probes 14 to 21 and a second row filed by plan in section 5, and brought the batch-wide text of sections 2, 3, 5 and 6 to ten rungs; the six rungs N, I, F, C, W and S stand as they were. Its sources: P-167, P-168, P-166, P-162, P-91, P-58, P-96 and their histories; `reviews/any-carrier-2026-11-06.md` and `reviews/string-equivalence-2026-11-06.md`; rows 113, 321, 363, 364, 732, 733, 807, 818 and 906 to 911; review-queue items 371 and 372; PLAN's phase 4, its natives line and the curator's first stress test; F-34 and `perf-probes/codegen-distance/REPORT.md`; climb batch 25's rung C as the form of a code-generator rung. A third Fable review read the four sections and the batch-wide text that they changed, on `main` at `648d15a76`; its changes are in the commit that carries this text, and its report is `climb-batch-27-review-2.md`. -->
<!-- Sources: PLAN.md, "Where we stand" and phase 4 whole; POSITIONS P-160 to P-165, P-162's companions P-69 and P-153, P-44, P-58, P-37, P-95, P-96, cited by number; FACTS F-32, F-34, F-131, F-151, F-155, F-299, F-308, F-311, F-318, F-321; the ledger rows 22, 113, 434, 440, 441, 442, 551, 596, 721, 733, 818, 841, 861, 872, 895, 896, 909; review-queue item 355 in its list (a); the five design reviews, `reviews/number-closure-2026-11-05.md`, `reviews/integer-conversions-2026-11-06.md`, `reviews/hard-set-natives-2026-11-06.md`, `reviews/char-asexprstring-2026-11-06.md`, `reviews/io-objects-carrier-2026-11-06.md`; the post-batch reviews `reviews/batch-26-review.md`, sections 2 and 3, and `reviews/batch-25-review.md`, section 3; `CLIMB-BATCH-26.md` whole and `CLIMB-BATCH-25.md`, as the form; the manual `climb-batch-workflow.md`; the territory map `map/`; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes (section 5, "The planner's probes"): one worktree, `/home/user/fortress-p27`, seeded on the branch `wip/probe-plan-27` from the base build `/home/user/fortress-base27` at `551b02858`, never built, and removed after. Nothing ran in the base build. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, load 0.30 at the end; other agents may have shared the machine; nothing was timed to compare. The probe programs were scratch, not kept; section 5 gives each with its output. Probes 8 to 13, for rungs N and F (section 5, "The planner's probes for rungs N and F"), ran in two more worktrees seeded the same way, `/home/user/fortress-p27n` and `/home/user/fortress-p27c`, on the same machine at loads up to 6.6, and both were removed after. -->

# Climb batch 27

## 1. The manifest, rung by rung

The batch's generator writes the workflow's manifest from this section. Each rung's `section` is its section 4 heading, word for word. The rungs are in the manifest's order, N, I, F, C, W, S, A, E, G, T. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-27.md#`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read.

| id | slug | title | expected minutes |
|---|---|---|---|
| N | `rung-number-open` | `Number` opened and emptied: its `comprises` clause, `asFloat` and `=` struck, with each number type's own `asFloat` and `=`, the vector norm, the reflective generator and the comparisons that leaned on them | 110 |
| I | `rung-natives-shift-power` | The integers' 16 shifts and powers onto helpers, each a converting declaration around a bare binding | 80 |
| F | `rung-natives-float-number` | The floats' four over `Number` and `AnyIntegral` without `Number`'s `asFloat`, and group 3's six, onto helpers | 85 |
| C | `rung-char-expr-string` | `Char`'s `asExprString` on the completed helper, the parser's hexadecimal digits, and the specification's list | 65 |
| W | `rung-io-writer` | N4's writer rung: the writer objects over a Java-backed `JavaBufferedWriter` | 85 |
| S | `rung-system-string-ops` | `System`'s `getEnvironment` and `getProperty` onto `stringOps`, so that the checker can read `System` | 30 |
| A | `rung-any-carrier` | The carrier of `Any`: `ilkName` and `SEQV` on the compiled path's helpers, which walk's loader answers with its own operations, `Object`'s `asString` over `ilkName`, and the ilk as the trait's name | 60 |
| E | `rung-seqv-meaning` | What `SEQV` means on both paths: the specification's rule in walk's value classes and the compiled helper, the `value` modifier read on both, `Ratio` and the literals value objects, and the specification's list | 130 |
| G | `rung-codegen-asif` | The code generator's `asif`: a type assumption compiled at a method call and at a call that it fixes | 75 |
| T | `rung-codegen-trait-table` | The code generator's trait table: an object whose first supertrait is an imported api's trait | 60 |

Fields common to the ten rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-number-open`; **branch:** `wip/<slug>`.
- **writes state:** no. **its test is the stage:** no. **joins the gate:** none. **expected moves:** none. **lands only with:** none; N's block below names F (section 3, fork 1).
- **expected checker count:** none declared; the count stays 0. **expected checker crash:** none. Rung W changes the checker's walk-world table of foreign types (`compiler/NamingCzar.java:476-490`), which the checker reads, and no checking code; it declares no crash and no count (section 3, fork 4). Rungs E, G and T change the code generator, which neither stage runs; if rung T's fix must change the checker's trait table, it is a change of checking code, and rung T takes P-148's measure (section 3, fork T1).

### N
- **slug:** `rung-number-open`
- **worktree:** `/home/user/fortress-number-open`
- **section:** `N. Number opened and emptied: its comprises clause, asFloat and = struck, with each number type's own asFloat and =, the vector norm, the reflective generator and the comparisons that leaned on them (P-160)`
- **lands only with:** F (section 3, fork 1).
- **blurb:** P-160's second step and the decision that asFloat leaves Number: Number's comprises clause, its abstract asFloat, its = and exactValue struck from FortressLibrary.fss and .fsi, so that Number declares nothing, as the compiler prelude's; each of the eight number types and IntLiteral declares its own asFloat in its api; each of the apis' 21 coercions spelled as a pair of = declarations, so that two numbers of different types compare where a coercion carries one into the other; the vector norm declared at each of the eight number types; the reflective QuickCheck generator given a fixed choice of the library's number types; numbers.tex's sentence on asFloat revised with an Appendix I entry; row 551's test retargeted; the ten comparisons of three tests that no coercion carries written with their conversion.
- **points to report:**
  - The generator's way, and ReflectiveQuickCheckTest before and after the generator's change.
  - Each asFloat api line, and each refusal that its placement met.
  - The pairs of = as written, their count, and each pair that the checker or walk's load check refused, with its message.
  - The norm's declarations as written, and their values at the eight element types.
  - What a program's own number type compares by, before and after, with the declarations as written.
  - Each comparison respelled, with its before and after, the eight lines of the team's testRR32 and expTest among them.
  - The trait that row 551's test now names, and why.
  - Each test's run before and after through the harness.
  - The count table and the distance table on your final tree, with rung F's two sites, and any other site that comes.
  - The revised sentence, its callout and the Appendix I entry's Effect; the specification's build: both BUILD SUCCESSFUL lines and the warnings count.
  - Every sentence made false.
  - A file edited beyond those named, any edit of walk or the checker, and any other line of a team test changed.
- **briefing** (22 keys, 14 checks):
  - P-160 (check): the decision whose second step you build.
  - P-165 (check): asFloat and the = built on it off Number, each type's own asFloat, the norm's bound and the rule for a mixed =.
  - P-44: AnyIntegral's clause, which stays.
  - F-318 (check): the first step as landed, and the programs it loaded without the clause.
  - F-131 (check): the flat tower and Number's = by asFloat, which your change rewrites, and its test.
  - F-151: the vectors' bound by Number, whose two reasons, the clause and the norm's asFloat, your change removes.
  - F-311: each type's own asFloat binding, which stays and which your api lines declare.
  - ledger:551 (check): the row whose test you retarget.
  - ledger:596: the row whose Number half closes.
  - ledger:434 (check): Number's = between a float and an exact number, which closes with your strike.
  - `doc:explorations/reviews/number-closure-2026-11-05.md#6. The options` (check): option (b), its step 2 and its files.
  - `doc:explorations/reviews/number-closure-2026-11-05.md#2. What the clause does` (check): what leans on the clause, measured.
  - `code:Library/ReflectiveQuickCheck.fss#object genType(top:Type)` (check): the generator you give a way to make a Number.
  - `code:Library/FortressLibrary.fss#exactValue(x: Number): QQ`: the function you delete with Number's =.
  - `code:Library/FortressLibrary.fss#opr =(a:Any, b:Any)` (check): the fallback that answers a mixed = which no pair carries.
  - `code:Library/FortressLibrary.fss#SQRT asFloat(squaredNorm(me))` (check): the norm you declare at each number type.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait Number excludes`: the prelude's Number, which declares nothing.
  - `code:Specification/basic-lib/numbers.tex#Some conversions between them are coercions..revival-rr32` (check): the passage you revise, with its callout.
  - `doc:ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss`: the test you retarget.
  - REC `The planner's probes` (check): the walk runs without the clause on this base, and Number's = in the team's library.
  - REC `The planner's probes for rungs N and F` (check): the strike's walk runs, the checker's sites, the prototype of the pairs and the demos on this base.
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
- **section:** `F. The floats' four over Number and AnyIntegral without Number's asFloat, and group 3's six, onto helpers (P-162)`
- **blurb:** P-162's floats' rung, without Number's asFloat, which rung N strikes: random and Float's atan2 become bare bindings at RR64, which coercion reaches from a ZZ32, an RR32 or a numeral; Float's power over AnyIntegral converts its exponent by each integer type's own asFloat around a bare binding at ZZ32; printThreadInfo over Number becomes plain Fortress through asString; the RR64 trait's power and atan2 over Number narrow to RR64, and Float's power at Number goes; group 3's six, Float's floor and ceiling brackets, the mixed powers of Float and RR32, and FlatString's = and flatConcat at a Char, each on a new one-line helper; about 8 new helpers; a walk guard of the values and the written conversions, and a compiled guard.
- **points to report:**
  - Each binding moved, the helper it names, new or existing, and its Java signature; each declaration that now converts, as written.
  - Each declaration over Number narrowed or deleted, as written, and each caller that now writes a conversion.
  - The rational cases with their written conversions, before and after, printThreadInfo's printed line among them.
  - Your tests before and after through the harness and junit.sh.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each value that moves, and each test whose verdict changes in ant testSystem or ant testQuick; whether flatConcat at a Char past U+FFFF keeps the glue's answer (fork F4).
  - Every sentence made false.
  - A file edited beyond those named, any edit of Object's or SEQV's bindings, the checker or the compiler.
- **briefing** (22 keys, 13 checks):
  - P-162 (check): the decision whose floats' rung you build.
  - P-165 (check): asFloat off Number, and the four over Number at RR64.
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
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java#public static final class Pow extends RR2R`: the power's glue, which reads an integer exponent as a double, as your conversion does.
  - `code:Library/FortressLibrary.fss#atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))` (check): the RR64 trait's atan2, which you narrow to RR64.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#opr ^(self, b:Number):RR64 = self^(asFloat(b))` (check): Float's power at Number, which you delete.
  - `code:Library/FortressLibrary.fss#opr ^(self, b:Number):RR64 = (asFloat(self))^b`: the RR64 trait's power, which you narrow to RR64.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java#public static final class Concat extends ss2S`: flatConcat's glue at a Char.
  - `map:compile-path-walkthrough.md#7. Native bindings in both worlds`: the territory map's two binding mechanisms.
  - REC `The planner's probes` (check): the base's sites.
  - REC `The planner's probes for rungs N and F` (check): the checker's refusals once Number has no asFloat.
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

### A
- **slug:** `rung-any-carrier`
- **worktree:** `/home/user/fortress-any-carrier`
- **section:** `A. The carrier of Any: ilkName and SEQV on the compiled path's helpers, which walk's loader answers with its own operations, Object's asString over ilkName, and the ilk as the trait's name (P-167)`
- **blurb:** P-167: Object's ilkName names stringOps.typeName and SEQV over Any names equality.sEquiv, bare; walk's loader answers the two names with its own glue operations from a table read before it looks for a helper; Object's asString becomes self.ilkName in Fortress, so one native goes; walk's ilk names the library's five native number objects by their traits, ZZ32 and never Int, also inside a generic's static arguments; 48 lines of two revival tests respelled at the traits' names; match gains its overload over String, which flattens both arguments as the library's natives over FlatString do; a walk test and a compiled guard that hold the two paths together; what SEQV answers is rung E's.
- **points to report:**
  - The loader's table as written, its two names and the glue class that answers each.
  - The ilk's rendering as written: the types it names by their traits, where, and how it tells the library's five from a program's own type of the same name.
  - Object's asString as written, and each printed text that changes, with its before and after.
  - Each of the 48 respelled lines, with its before and after.
  - match's overload over String as written, in the component and the api, and its answer at a rope on the base and after.
  - Your tests before and after through the harness and junit.sh.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each test whose verdict changes in ant testSystem.
  - Every sentence made false.
  - A file edited beyond those named, any edit of a helper's body, of a walk value class, of the checker or of the compiler.
- **briefing** (26 keys, 14 checks):
  - P-167 (check): the decision you build, the carrier and the ilk.
  - P-91 (check): what an object with no asString prints, which asString over ilkName keeps.
  - P-58 (check): the binding's form, and the walk half that P-167 bends for your two names.
  - P-162: the three natives over Any, which leave glue by P-167's way.
  - F-32: the count of bindings on glue, which falls by three with your rung.
  - F-299 (check): walk's loader of helpers, before which your table answers.
  - F-298: the compiled rewrite, which checks your two strings against the helpers' Java signatures.
  - F-74 (check): walk's numerals as the native objects, and a Box of Int apart from a Box of ZZ32.
  - F-123: a compiled object with no asString prints its bare type name.
  - ledger:321 (check): the compiled overflow that asString over ilkName keeps out of the one library.
  - ledger:364 (check): walk's inferred static argument, whose printed text your ilk changes.
  - ledger:363: asDebugString on the two paths, which stays.
  - `doc:explorations/reviews/any-carrier-2026-11-06.md#(c) The operations answered by each path's run time, under one binding` (check): the option P-167 took, and prototype C's loader lines.
  - `doc:explorations/reviews/any-carrier-2026-11-06.md#(e) Fewer natives, in the library` (check): way (e1), asString over ilkName, and row 321's probe.
  - `doc:explorations/reviews/any-carrier-2026-11-06.md#2.2 Walk's answers`: walk's ilk and asString texts today.
  - `doc:explorations/reviews/any-carrier-2026-11-06.md#2.3 The compiled path's answers`: the compiled texts today.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,` (check): where the loader reads the string, and where your table goes.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java#public class ObjectPrims` (check): walk's ilk operation, whose rendering you change.
  - `code:ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java#public static String typeName(fortress.AnyType.Any a)` (check): the compiled helper whose answer is the ilk's definition.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#trait Object extends Any` (check): the declarations you change.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java#public String toString()`: walk's rendering of a type's name and static arguments today.
  - `doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss`: the compiled form of a program's own binding of the two helpers, to copy.
  - `code:Library/FortressLibrary.fss#printThreadInfo(a:String):() = typecase a.asFlatString of`: the library's overload over String around a native over FlatString, the form of match's.
  - ledger:916: match refuses a string that is not flat, which you close.
  - REC `The planner's probes for rungs A, E, G and T` (check): the ilk and SEQV on both paths on this base, and the prototype of your rung with its suite and stages.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### E
- **slug:** `rung-seqv-meaning`
- **worktree:** `/home/user/fortress-seqv-meaning`
- **section:** `E. What SEQV means on both paths: the specification's rule in walk's value classes and the compiled helper, the value modifier read on both, Ratio and the literals value objects, and the specification's list (P-168, P-166)`
- **blurb:** P-168 and P-166: walk's value classes compare a value only with one of their own class, floats by their bits, and strings only by identity; walk's value objects compare every field, their value parameters among them, identity first; the code generator marks the class of each object declared value, and equality.sEquiv answers by the rule for those, for tuples, for the run time's boxes and floats; Ratio, IntLiteral and FloatLiteral become value objects; objects.tex's lists name arbitrary-precision numbers among the value objects and strings among the reference objects, with an Appendix I entry; the review's 14 cases and the curator's value object CC64 on both paths; eight lines of the team's sequivTest and one of a revival test respelled; the tuple limit filed.
- **points to report:**
  - Each walk value class's seqv as changed, FTypeObject's field list and FOrdinaryObject's field recursion, and each walk answer that moves, with its before and after.
  - The code generator's mark and equality.sEquiv as written, and each compiled answer that moves.
  - Ratio, IntLiteral and FloatLiteral as declared, and any refusal that the modifier met.
  - Each line of the team's sequivTest that changes, with its before and after, eight by the planner's probe; TransposedMatrixAndFreeze's line as respelled; compiler_regressions/seqv.fss:22 and its answer on each path, before and after.
  - Your tests before and after through the harness and junit.sh: the 14 cases and CC64 on each path.
  - The revised lists, the callout and the Appendix I entry's Effect; the specification's build: both BUILD SUCCESSFUL lines and the warnings count.
  - The count table and the distance table on your final tree, and any site that comes.
  - Each test whose verdict changes in ant testSystem or ant testQuick, the other-compiler track's SEQV tests among them.
  - Every sentence made false.
  - A file edited beyond those named, any edit of walk's loader, of the prelude or of the checker, and any other line of a team test changed.
- **briefing** (28 keys, 17 checks):
  - P-168 (check): the decision you build.
  - P-166 (check): ZZ's and QQ's values value objects, Ratio, and the specification's list.
  - P-167: the carrier, whose SEQV binding names the helper whose body you change.
  - P-96 (check): the revision form.
  - P-38: the prelude's text, its === family among it, stays until the switch-over.
  - F-74: walk's numerals as its native objects, which your tests bind at declared types.
  - F-57: a numeral's type on each path, IntLiteral to the checker and ZZ32 under walk.
  - ledger:113 (check): walk's value objects without body fields, which you close.
  - ledger:909 (check): walk's equivalence across types, which you close.
  - ledger:906 (check): the compiled value modifier without effect, which you close.
  - ledger:907 (check): compiled tuples by reference, which you close.
  - ledger:908 (check): compiled floats by =, which you narrow to the prelude.
  - ledger:910: the literals as plain objects, which you close.
  - ledger:911: Ratio and BigNum declared apart, which P-166 settles and you close.
  - ledger:807: the fallback = and the three-argument assert, which reach SEQV.
  - `doc:explorations/reviews/any-carrier-2026-11-06.md#2.4 What SEQV means: the specification, walk and the compiled path` (check): the rule, the 14 cases and both paths today.
  - `doc:explorations/reviews/string-equivalence-2026-11-06.md#3. What each runtime does today`: the strings on each path, and the team's two tests.
  - `doc:explorations/reviews/string-equivalence-2026-11-06.md#(b) Strings are reference objects, the literal reading` (check): the way P-168 took.
  - `doc:Specification/basic/objects.tex#Object Equivalence` (check): the rule.
  - `code:Specification/basic/objects.tex#An object is a..aggregates such as arrays` (check): the lists you revise.
  - `doc:Specification/appendices/changes.tex#A comparison at a NaN`: an Appendix I entry's form.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FInt.java#public boolean seqv(FValue v)` (check): one value class's cross-type branches, as its siblings have them.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java#public boolean seqv(FValue v)` (check): walk's value objects by their fields.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeObject.java#public FTypeObject(String name,` (check): the field list of row 113.
  - `doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/equality.java` (check): the helper you complete.
  - `code:Library/CompilerLibrary.fss#This is incomplete..opr NEQV(a:Any, b:Any)`: the prelude's family, which stays and which the compiled tests meet first.
  - REC `The planner's probes for rungs A, E, G and T` (check): the 14 cases on both paths on this base, and the prototype of your walk half with its suite and stages.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### G
- **slug:** `rung-codegen-asif`
- **worktree:** `/home/user/fortress-codegen-asif`
- **section:** `G. The code generator's asif: a type assumption compiled at a method call and at a call that it fixes (row 818)`
- **blurb:** row 818, one of F-34's kinds: the code generator compiles e asif T as the specification's type assumption: as the receiver of a method call, a call of the body that T gives the method, as Java's super; in a function or operator call whose every dispatched argument is an assumption, a call of the declaration that the checker resolves there; elsewhere the subexpression's value; a call with a partial assumption stays refused, with its own message; a compiled test in the library's forms and its walk guard.
- **points to report:**
  - Each method of the code generator that you change, and what each emits.
  - The forms that compile and the form that stays refused, with its message.
  - Your tests before and after through junit.sh and the harness.
  - Every sentence made false.
  - A file edited beyond those named, any edit of the checker, of forObjectDeclPrePass or of dumpMethodChaining.
- **briefing** (11 keys, 7 checks):
  - ledger:818 (check): the row you close or narrow.
  - F-34 (check): the code generator's refusals in the library, by kind.
  - P-33: code-generator work beside the natives.
  - `doc:Specification/basic/expressions/type-annotation.tex#Type Assumption` (check): what a type assumption means.
  - `doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal` (check): the library's sites of each kind and the probe of asif.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java#public FValue forAsIfExpr(AsIfExpr x)`: walk's assumption, a wrapped value that its dispatch reads.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)` (check): the method call that a receiver's assumption changes.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forOpExpr(OpExpr x)`: an operator call, as String's CMP over two assumptions is.
  - `code:Library/FortressLibrary.fss#trait SequentialGenerator` (check): the library's form, a getter over self asif a supertrait.
  - REC `The planner's probes for rungs A, E, G and T` (check): the wall on this base, and a trait's bodies as static methods of its DefaultTraitMethods class.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

### T
- **slug:** `rung-codegen-trait-table`
- **worktree:** `/home/user/fortress-codegen-trait-table`
- **section:** `T. The code generator's trait table: an object whose first supertrait is an imported api's trait (row 733)`
- **blurb:** row 733, one of F-34's kinds, the wall of the library's 2-D and 3-D ranges: dumpMethodChaining's comparison of an inherited method's trait with the body's trait reads an imported api's trait, so that an object whose first supertrait is an api's trait and whose later supertrait gives a method of the same name compiles and runs each body; a compiled test with its own api and its walk guard.
- **points to report:**
  - Where the fix is, the type that the comparison read, and why the table did not find it.
  - Your tests before and after through junit.sh and the harness.
  - Whether row 732, the sibling, is reached, and what you measured of it.
  - Every sentence made false.
  - A file edited beyond those named; any edit of the checker's Scala, with the count stage's times and its second pass (fork T1).
- **briefing** (10 keys, 5 checks):
  - ledger:733 (check): the row you close.
  - ledger:732: its sibling in the same method, which is not yours.
  - F-34 (check): the code generator's refusals in the library, by kind.
  - P-33: code-generator work beside the natives.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)` (check): the method that stops.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex` (check): the table's look-up that throws.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java#private TypeAnalyzer newTypeAnalyzer(`: how the code generator's table is made, over the component and the api environment.
  - `doc:ProjectFortress/compiler_tests/RecursiveApiTest3.test`: a compiled test with its own apis, the form of yours.
  - REC `The planner's probes for rungs A, E, G and T` (check): the wall on this base, with its stack.
  - REC `Forks the batch takes, none consequential`: the defaults your rung builds, each with the ways not taken.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode with the **code generator**. Until the **switch-over**, the compiled path uses its own small library, the **prelude**. After it, the compiled path uses the interpreter's library, the **one library**.
- A **native binding** is a library declaration whose body is `builtinPrimitive("…")`. Its string names a **glue class**, which only walk can call, or a **helper**, a static Java method in `nativeHelpers/`, which both paths call (P-58). A **carrier** is the Java type in which walk passes a declared type to a helper. A **bare binding** is a native binding at types that a carrier takes.
- **`SEQV`**, also written `===`, is strict equivalence, the one comparison that every value has. A **value object** is equivalent to another by its fields; a **reference object** only to itself. The **ilk** is the type name that `Object`'s `ilkName` answers. A **wall** is a construct that the code generator refuses.
- A **pair** is a public declaration over a wide type that converts its argument in Fortress and calls a bare binding at a narrow type (P-162).
- **The count** and **the distance** are the checker's errors on the one library: the count on its main component, the distance on its fourteen core components. Both are 0 (F-53).
- A **rung** is one change, built by one worker and checked by a second agent, the skeptic. A **batch** is a few rungs landed together after the **gate**. The **gather** composes the rungs on `main`. A **guard** is a test that passes before the change and after it.
- **Appendix I** is the specification's appendix of changes. A revised passage carries a **callout** that names its entry there.
- **microGPT** is the model program, by which the revival is measured: two Fortress programs, each with a quick check beside it. A **model line** is a source line of either; no rung of this batch changes one.

### The scope: ten rungs now, two in climb batch 28

The record proposes ten rungs for climb batch 27: the six that it drafted first, A and E at his word of 2026-11-06, and G and T at his word of 2026-11-07 that a batch takes all the work that is well defined and in conflict with nothing:

- **N**, P-160's second step and P-165: `Number`'s `comprises` clause, `asFloat` and `=` struck, with each number type's own `asFloat` and pairs of `=`, the vector norm, the reflective generator and the tests that leaned on them.
- **I**, P-162's integers' rung: 16 bindings onto helpers.
- **F**, P-162's floats' rung under P-165: 4 bindings over `Number` and `AnyIntegral`, at `RR64` or converted by each type's own `asFloat`, and group 3's 6 onto helpers.
- **C**, P-163: `Char`'s `asExprString`, the parser's digits and the specification's list.
- **W**, P-164's writer rung: `stdOut`, `Writer`, `BufferedWriter` and `FileWriteStream` over a Java-backed trait.
- **S**, item 355's option 1: `System`'s two natives onto `stringOps`.
- **A**, P-167: `ilkName` and `SEQV` on the compiled path's helpers, which walk's loader answers with its own operations; `Object`'s `asString` over `ilkName`; walk's ilk at the traits' names; and, at the coordinator's rider, `match` over `String` (fork A6).
- **E**, P-168 and P-166: what `SEQV` means, by the specification's rule, in walk's value classes and the compiled helper; `Ratio` and the literals value objects; the specification's lists.
- **G**, row 818: the code generator's `asif`.
- **T**, row 733: the code generator's trait table, the wall of the library's 2-D and 3-D ranges.

It proposes two for climb batch 28:

- the integer conversions (P-161);
- N4's reader rung (P-164).

The reasons, one by one:

1. **The natives come first.** They are on the switch-over's critical path (P-33). Six of the ten rungs are natives, I, F, C, W, S and A, and E gives `SEQV`, A's third, its meaning. Together they take 46 bindings off glue classes (below, "Where the natives stand").
2. **The reader rung cannot run beside the writer rung.** A rung cannot build on another rung of its own batch (PLAN, "The principle for the batches"). The writer rung declares both Java-backed traits and adds both table entries, since the checker reads the whole helper class `fileOps` (F-321; the I/O review, section 6 (b), point 19). The reader rung binds its methods on the trait that the writer rung declares, and edits the same loader methods. So it is climb batch 28's, as P-164 orders it: "The writer side, with `stdOut`, moves before the reader side."
3. **The integer conversions conflict with rung I.** Both rungs edit the same five integer traits, in the component and in the api. On the base, the powers that rung I rewrites stand one unchanged line above the conversions that the conversions' rung rewrites or deletes: `ZZ32`'s power at `Library/FortressLibrary.fss:802-803` and its `widen` at `:805`; `ZZ`'s power at `:1077-1078` and its `narrow` at `:1080-1081`; `NN32`'s power at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:462-463` and its `widen` at `:465` (section 5, "The planner's probes", probe 5). Both rungs also add helpers to the same five helper classes. And rung I's conversion of a `ZZ` count calls `ZZ`'s `narrow`, which the conversions' rung deletes (section 3, fork I2). On one merged tree that call would fail. In climb batch 28 the conversions' rung moves it onto `.asZZ32` with the other callers, its values unchanged (P-161).
4. **P-162 asks for its two rungs in one batch.** So rungs I and F run together, and the conversions wait, not rung I.
5. **N joins the natives, since it shares no declaration with them, and lands only with F.** It edits `Number` (`Library/FortressLibrary.fss:380-408`), each number type's own `asFloat` and `=` beside its own `=` (`:441` to `:1007`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:246`, `:400`, `:508`), the norm (`:2645`), the reflective generator and `numbers.tex`, at other declarations than every other rung's. PLAN puts it in "the next batch" (phase 4, its line on P-160). Its tests run under walk only, and it adds no Java. The probe on the base shows that walk loads nine library-heavy programs without the clause (section 5, probe 4), and the prototype of its pairs of `=` passes the walk suite except at the ten lines that it respells (probe 11). It lands only with F, since two of F's declarations call `Number`'s `asFloat`, which N strikes (section 3, fork 1).
6. **The code generator's walls join, as two rungs** (his word of 2026-11-07; section 3, fork 55). Each is well defined: the specification gives a type assumption's meaning (`basic/expressions/type-annotation.tex`, "Type Assumption"), and row 733's form has walk's answer, `cd`; both walls stop the code generator on this base (section 5, probe 21). They edit different methods of `compiler/codegen/CodeGen.java`: G the method call (`:6397`), the operator and function calls (`:5163`, `:3926`) and a new visitor for `AsIfExpr`; T `dumpMethodChaining` (`:915-1021`). Neither builds on the other. Rung E edits a third place of the same file, the class header that `forObjectDeclPrePass` writes (`:4522-4523`), about 3,500 lines from T's and 600 from G's nearest, `forFunctionalRef` (`:3926`). No other rung edits the code generator, so the merge meets no shared method.
7. **Ten rungs, each at its own declarations, keep the gather and the gate in bounds.** Climb batch 25 ran seven rungs, six of them on `FortressBuiltin.fss` and four on `FortressLibrary.fss`, each at its own declarations, and landed all seven; its planner's trial of the two nearest, rung R's text and rung N's strings, through `git apply --3way` merged clean (`CLIMB-BATCH-25.md`, section 3, rung R's "Overlaps by file"). Here six rungs share `FortressLibrary.fss`, seven share `FortressBuiltin.fss` and three share `CodeGen.java`, each at its own declarations, and section 4, "The rule the rungs keep", gives each rung's place in each shared file. The gate runs once either way: about 21 minutes (`reviews/batch-26-review.md`, section 2). Ten skeptics write about 1.9M (below, "Cost").
8. **A and E finish P-162's 30 natives, and neither builds on the other.** The three natives over `Any` are the last of the 30 that no bare helper reached, and P-167 and P-168 settle their way and their meaning. A edits `Object`'s two getters, `SEQV`'s string, walk's loader and walk's ilk operation; E walk's value classes, the compiled helper `equality.sEquiv`, the class header of a compiled object, three library declarations and `objects.tex`. A's binding names the helper whose body E changes, but walk never runs that body, and A's tests assert only the answers that P-168 and today share (section 3, fork A5); on the merged tree the stages read `equality.java` whole, since A's binding names it, so E keeps every method of the class at types that map to Fortress (section 4, rung E).

### Where the natives stand, and where the batch leaves them

- **Today: 449 live bindings, 306 on helpers and 143 on glue classes** (F-299, F-32).
- **After the batch, by reading: 438 live bindings, 341 on helpers and 97 on glue classes.** Rung I moves 16 (glue down 16, helpers up 16). Rung F moves 10: 9 onto helpers, and `printThreadInfo` over `Number`, now at `RR64`, becomes plain Fortress, so the live bindings fall by 1. Rung C moves 1. Rung W takes away 16 glue bindings of the writer side and adds 7 helper bindings. Rung S moves no count: its two bindings already name helpers, of `systemOps`. Rung A moves 3: `ilkName` and `SEQV` name helpers (F-299 up 2), and `asString` becomes plain Fortress, so the live bindings fall by 1 more (F-32 down 3). Rungs E, G and T move none. The gather counts the merged tree.
- **What stays on glue after the batch:** the reader side's 20 (climb batch 28); `ZZ32`'s `big` and `ZZ`'s `narrow` and `widen`, 3 (the conversions' rung, climb batch 28); the literals, 32 (N5, in the names batch); D2's 42 (PLAN, phase 4).

### Rungs N and F under P-165

P-165, his decision of 6 November, takes `asFloat` and the `=` built on it off `Number`. This record rewrote rungs N and F for it. Four things for him before the go, none a question:

- **P-165's rule on `=` needs 42 declarations** (section 3, fork N7). "Two numbers of different types compare by `=` only where a coercion carries one into the other" does not hold by itself. The library's fallback `opr =(a:Any, b:Any) = a SEQV b` (`Library/FortressLibrary.fss:96`) applies to every pair without a coercion, and a coercion never changes which declaration runs when one applies without it. With `Number`'s `=` struck and nothing added, walk answers `false` at `ZZ 1 = ZZ32 1`, `QQ 2/2 = ZZ32 1` and `RR32 1.0 = RR64 1.0`, 12 of the 756 walk tests fail, and the checker would resolve to the fallback, whose `SEQV` stays on glue, 54 comparisons of the one library that it resolves to `Number`'s `=` today, and microGPT's `if i = 0` lines with them (section 5, probes 8 and 10). So rung N spells each of the apis' 21 coercions as a pair of `=` declarations. The prototype keeps every comparison that a coercion carries, and the walk suite then fails only at ten lines of three tests that compare a pair that no coercion carries (probe 11). The ways not taken: no declarations, with every mixed comparison written out, the model's among them; or the fallback `=` over `Any` cut as well, which the specification does not declare and the prelude does not have, a larger change of its own. The Fable review checked the rule on the base (section 5, "The Fable review's probes for rungs N and F"): under walk a `pick(a:Any, b:Any)` beside `pick(a:RR64, b:RR64)` answers `pick(1, 1.0)` by the declaration over `Any` (P-46); and the prelude's checker resolves `i = 0` at a `ZZ32` by the numeral's coercion, with no pair and no fallback, while it refuses `3 = 3.0`, a `ZZ32` against an `RR64` and an `RR64` against a numeral, whose coercions it lacks. With the pairs, the model's `i = 0` lines resolve to `ZZ32`'s own `=` under walk, where a numeral is a `ZZ32`, and to `ZZ32`'s pair at `IntLiteral` under the checker, never to the fallback. A fallback narrowed so that it does not apply to two numbers cannot be written: a declaration over `(Number, Number)` applies without a coercion, so by P-46 it would take every pair that a coercion carries, and with `Number` empty it has nothing to compare by. The fallback's own standing, the specification's `Any` declaring `SEQV` and no `=`, goes on the review list for a later batch (section 5, "Left out, each with its home").
- **The vector norm at each of the eight number types** (fork N8). P-165 sends this fork to the review list with its default. The prelude has no vectors, and declares its float conversion on four of its types and on no shared trait; the team's library gave the norm at every number type; the peers split. So the default keeps the norm at every library type, each by its own `asFloat`, and reads P-165's "a bound that promises a float" as each declaration's element type. The ways not taken: a small trait with `asFloat` that the bound names, the norm on float vectors only, and one declaration with a `typecase`.
- **Three tests respelled, ten lines, eight of them the team's** (probe 11): `tests/testRR32.fss`, six lines, and `tests/expTest.fss`, two lines, each a comparison that no coercion carries, written with its conversion; `tests/FlatTowerRungF.fss`, two lines that assert `Number`'s `=` (row 434). No demo respells: 24 of the 52 reach `Number`'s `=` at two run-time classes, each at a pair that a coercion carries (probe 13). The compiled tracks compile against the prelude until the switch-over, so no compiled test changes.
- **`printThreadInfo` at `RR64`, as P-165 says** (fork F5). It never converted by `asFloat`: its glue reads a string. At `RR64` a `ZZ32` or numeral caller's line prints the float, `3.0` for `3`. No caller in the tree passes a number. The way not taken: over `Number` through `asString`, each number printed as its own text.

### Rungs A, E, G and T, at his words

The four came after the record's first form: A and E at his word of 2026-11-06, P-167 and P-168, and G and T at his word of 2026-11-07. Things for him before the go, none a question:

- **Eight lines of the team's `sequivTest.fss` change, not six** (section 3, fork E1). Under walk `b: RR64 = 45.0` holds a `FloatLiteral`, since the one library declares `FloatLiteral` below `RR64`, and `5.0 + 40.0` a `Float`; values of different types are never equivalent, so `:58` and `:94`, `RR64` against `RR64`, change with the six that the review counted (section 5, probe 18). The compiled prelude coerces the numeral into `RR64`, so there the two are one type (probe 16).
- **Walk prints the five native number objects by their traits** (fork A1): `a ZZ32: 3` for `a Int: 3`, and `Box[\ZZ32\]` for walk's `Box[\Int\]`. 48 lines of two revival tests, `FlatTowerRungF` and `ArrayElementAlgebra`, assert walk's names and are respelled; the walk suite fails nowhere else on the planner's prototype (probe 15). The five stay public (fork A3, item 372's default); strings and `Ratio` keep their own names (fork A2).
- **His first stress test, on both paths** (fork E9): `CC64` compares by `SEQV` on both, through the helper on the compiled path. Its default `=` runs under walk only: the prelude declares no `=` over `Any`, so a compiled `CC64(1.0, 2.0) = CC64(1.0, 2.0)` is a static error, 'Could not check call to operator =' (probe 19), until the switch-over brings the one library's fallback.
- **A tuple of four or more compares by `SEQV`** (fork E7). The library declares `=` on pairs and triples only, so the fallback answers a longer tuple, and with strings now reference objects two such tuples of equal strings built apart are not equal: one line of a revival test, `TransposedMatrixAndFreeze.fss:19`, is respelled, and a row is filed (probe 18).
- **Rung E edits the code generator.** P-168 has both paths read the `value` modifier; a compiled value object's class has no trace of it today, the same shape as a reference object's (probe 19), so the code generator marks it (fork E2).
- **Item 371 waits for the switch-over batch** (fork E6): neither path reads a number trait's modifier for `SEQV`. **Item 372** takes its default (forks A1 and A3). **`compiler_regressions/seqv.fss:22`** stays until the prelude goes (fork E8). **The specification's list names strings** among the reference objects (fork E5).
- **The walls:** G compiles an assumption at a method call and at a call whose every dispatched argument is one; a call with a partial assumption stays refused, and row 818 narrows to it (fork G2). T's fix is in the comparison that stops; if it must change the checker's trait table, rung T takes P-148's measure (fork T1).

### The question for the curator

One, and his go sets it: **Question 1. The scope.** Default: the ten rungs above.

- **(a) Ten rungs, N, I, F, C, W, S, A, E, G, T.** About 6.9M tokens written and about 7 hours 15 minutes (below, "Cost").
- **(b) Nine rungs, without N.** About 5.9M and 6 h 15 min. N then goes to climb batch 28, which has three rungs. This holds the library's `Number` closed one batch longer, with its `asFloat` and `=`. F's declarations at `RR64` hold without N. Nothing waits on N but programs' own number types.
- **(c) Eight rungs, without the two walls.** About 5.9M and 6 h 15 min. G and T then go to climb batch 28, which has four rungs, as the record first proposed. This keeps them apart only by size: they share no method with any other rung (reason 6).

The record recommends (a). The consequential test of the `coordinator` skill: no answer reverses a decision of his, touches a model line or cannot be undone, and every rung is decided on record. So the scope is his call on cost and order only.

### What the batch leaves out (section 5, "Left out, each with its home")

- **The two rungs of climb batch 28,** with their reasons above.
- **Beside rung A:** the five native number objects made private (item 372's other way, the names batch); strings, `Ratio`, `Char` and the literals printed by another name (fork A2); the prelude's `Object`, whose `asString` keeps row 321 until the switch-over (fork A4).
- **Beside rung E:** `value trait` on the number traits (item 371, fork E6); the `=` of tuples of four or more (fork E7); the team's `compiler_regressions/seqv.fss:22` (fork E8); the prelude's `===` family, until the switch-over (P-38).
- **Beside rungs G and T:** a call with a partial type assumption (fork G2); row 732, the trait table's sibling (fork T2); F-34's other kinds.
- **Beside rung S:** row 896, `getProperty` at an empty name, which raises a Java exception under walk. Rung S keeps the computation, so the row stays.
- **Beside rung W:** the reader side, and N5's run-time classes and raise strings (P-164).
- **Beside rung I:** the prelude's own power and shift defects (rows 441, 442, 523 to 525), which retire with the prelude (P-38).
- **A finding of this planner:** Appendix I cites the library's apis by line in nine places. At least five of the seven citations of `Library/FortressLibrary.fsi` already name other declarations than they claim. Row 905 holds it (section 5, "Rows filed by plan").

### Before the batch runs

- **His go** for the launch, with Question 1's answer or its default.
- **The Fable review of this record:** done, at `6afd874ea`, and its report went to the coordinator. Rungs N and F were rewritten after it for P-165, and a second Fable review read the two sections; its changes are in the commit that carries this text, and its report went to the coordinator.
- **The manifest's generator,** `compile-ladder/plan-27/manifest/`, made by the coordinator from `plan-26/manifest/` with this record's values (section 6, "The generator").
- **Two rows filed by plan,** 905 and 917, both in the ledger (section 5).
- **A Fable review of rungs A, E, G and T:** done, on `main` at `648d15a76` (`climb-batch-27-review-2.md`); its changes are in the commit that carries this text, and its report went to the coordinator.
- The gather runs the 52 team demos on the merged tree, since rungs N, I, F, C, W, A and E change what walk loads or what its natives compute, W changes every program's printing, A the printed name of a value whose type holds a native number object, and E every `SEQV` answer across types, of value objects and of strings (P-79; F-283).

### Cost

- **About 6.9M tokens written:** from 5.7M if the workers write as climb batch 26's did, to 9.1M with a judge and a repair round on one rung, or a restart. About 7 hours 15 minutes, at two agents at a time. With six rungs the record put the batch at 4.4M, from 3.6M to 5.8M, and 4 hours 30 minutes: A adds about 0.5M and 35 minutes, E about 0.95M and 1 hour 10 minutes, G and T about 1.0M and 1 hour together, and the gather and the merged-diff review about 0.15M of these for four more rungs, a third Appendix I entry and more files to merge.
- **Workers, about 3.9M:** N 0.6M, I 0.4M, F 0.4M, C 0.3M, W 0.5M, S 0.15M, A 0.3M, E 0.6M, G 0.35M, T 0.3M.
- **Skeptics, about 1.9M:** 0.17M each, N's and E's 0.25M. Climb batch 26's four wrote 107K to 218K, mean 177K; climb batch 25's seven 128K to 210K, mean 164K.
- **The fixed roles, about 1.15M:** the gather about 0.6M with ten rungs, the demos, three Appendix I entries and one build of the specification; the merged-diff review about 0.3M; the gate about 0.13M; the commit stage about 0.12M.
- **The evidence.** Climb batch 26 wrote 2.55M for four rungs in 2 h 27 min, 0.64M a rung; its workers 990K against the record's 1.9M, its skeptics 707K, its fixed roles 854K (`reviews/batch-26-review.md`, section 3). Climb batch 25 wrote 6.03M for seven rungs in 4 h 47 min, 0.86M a rung, 0.80M of finished launches; its workers 2.93M, its native rungs 333K to 474K without a cache refill, its fixed roles 1.50M, 0.79M without the gather's two refills (`reviews/batch-25-review.md`, section 3).
- **The figures.** Rungs I and F are put near climb batch 25's native rungs, which wrote new helpers: R wrote 333K for 10 bindings and 10 helpers, N 388K for 18 and 18. W is the largest: walk Java, a library rewrite and a table entry, as climb batch 26's T was (279K), with twice T's tests. C has a helper, a parser rule, a specification revision and two guards, about climb batch 26's S (186K) and a small Java change. S is two helpers, two strings and one guard. N is library text, walk tests and a specification revision: the strike, nine api lines of `asFloat`, 42 pairs of `=` with their api lines, eight norms, ten respelled lines and an Appendix I entry with the specification's build, about C's whole rung and climb batch 26's T together. F's rework adds the `RR64` trait's two lines, a deleted declaration and the conversion of F1. A is three library lines, a loader table of about eight lines and an ilk rendering of about twenty, both measured in the planner's prototype (section 5, probe 15), 48 respelled lines and two tests, about C. E is walk Java in eleven classes and two more, measured in the planner's prototype (probe 18), a code generator mark, a helper of about 40 lines, three library words, a specification entry with the build, three tests on two paths and nine respelled lines, about N. G is three visitors of the code generator and two tests, about climb batch 25's rung C, which took three walls; T is one method and two tests with an api, its fix site to find, as one of C's three. Per rung, all roles: about 0.69M.
- **Climb batch 28, for the order:** about 1.6M and 1 hour 45 minutes for its two rungs.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The question for the curator

Question 1, the scope, is in section 2. Its default is (a), ten rungs.

### Forks the batch takes, none consequential

Each default can be undone, none reverses a decision of his, and none touches a model line. Fork F1 reaches the model's power calls only in the way that P-162 decides for them, and fork N7 keeps the model's comparisons with a numeral as they read. Where the record leaves a choice open, the default follows the team's own source, which the fork names.

**For the whole batch**

1. **Ten rungs, N, I, F, C, W, S, A, E, G, T, the manifest's order; N lands only with F; no two change one declaration.** Default: so. A, E, G and T land on their own: none builds on another rung (section 4, "The rule the rungs keep"). Rung N strikes `Number`'s `asFloat`, and two declarations that rung F rewrites call it on a `Number`: the `RR64` trait's `atan2` (`Library/FortressLibrary.fss:494`) and `Float`'s `^` at `Number` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:160`). The checker refuses both on N's tree (section 5, probe 9), so N without F would leave the count at 1 and the distance at 2. F builds on nothing of N's: its declarations at `RR64` hold with `Number`'s `asFloat` and without it. The manual's `landsOnlyWith` withholds N if F is not approved, and the gather applies N after F ("Gather", "The order"). The files that two rungs share, and each rung's place in each, are in section 4, "The rule the rungs keep, and how they meet". The gather orders the rungs that share a file by its own rule. The way not taken: N's edit of F's two lines, which would put two rungs on the declarations of one family, `atan2` and `^` over `RR64`.
2. **The suites each rung runs, once, after its last change of code** (the `fortress-repo` skill's `tests-running.md`, "When to run a whole suite"). Default: N edits the library and the specification only, so it runs its own tests, its respelled tests and its named guards, the 47 tests that reach `Number`'s `=` among them (section 5, probe 10), in one `harness-one.sh` call. I, F, C, W and S edit a helper class that a binding names, and C the parser and W walk and the compiler too, so each runs `ant testSystem` and `ant testQuick` once, and its compiled guard through `junit.sh`. The way not taken: `ant testSystem` alone for the natives rungs, as climb batch 26's fork 12 gave rung T; `ant testQuick` checks that the prelude's imports of the same helper classes still wrap. A edits walk's loader and walk's ilk operation, and no class that the compiled path runs, so it runs `ant testSystem` once and its compiled guard through `junit.sh` (fork A5). E edits walk, a helper class and the code generator, so it runs `ant testSystem` and `ant testQuick` once each, and its compiled guard. G and T edit the code generator only, so each runs its own tests through `junit.sh` and the harness and leaves the tracks to the gate (the skill's `tests-running.md`, "When to run a whole suite"), as climb batch 25's rung C did.
3. **Every rung but G and T runs the count stage and the distance stage once each, on its final tree, after its edit and rebuild.** Default: so. Each rung changes text that both stages read: N, I, F, C and W the one library; C the parser; W `NamingCzar`'s table and `fileOps`; S `stringOps`, which both stages read whole, since `FlatString` and `FortressLibrary` name it (F-321). The before is climb batch 26's gate tables, 0 and 0 (`compile-ladder/climb-batch-26/gate/checker-count.txt` and `distance.txt`): run neither stage on the base. On N's tree alone the count is 1 and the distance 2, at rung F's two sites (fork 1); on every other rung's tree both are 0. No rung declares a count, a crash or a ladder move. The gate runs both again on the merged tree, where both are 0. A changes `Object`'s and `SEQV`'s bindings, which the stages check against `stringOps.typeName` and `equality.sEquiv`, and E `Ratio` and the two literals; the planner's prototype of each gave 0 and 0 (section 5, probes 15 and 18). G and T change only the code generator, which neither stage runs, so each runs neither and lists its files (`STAGE_BLIND`), unless T's fix changes the checker's trait table (fork T1).
4. **No speed pass.** Default: none. No rung changes the checker's checking code. Rung W adds two entries to the walk-world table of foreign types (`compiler/NamingCzar.java:476-490`), data that the checker reads; P-148's timing and second pass are for a change of the checker's code. W reports the count stage's seconds, as climb batch 26's T did.
5. **The 52 team demos at the gather** (F-283; P-79). Default: so, since N changes what walk's load check reads in every program, I, F and C what walk's natives compute, and W every program's printing. A changes the printed name of a value whose type holds a native number object, and E every `SEQV` answer that the rule moves. No rung runs them.
6. **No helper with state, so review-queue item 335's default stands** (no shared-state check). Default: so. F's `random` helper calls `Math.random()`, as the glue does, and holds no static field of its own. W's standard-stream helpers make a writer at each call, and the library calls each once, as `stdOut` and `stdErr` are made.
7. **Three new Appendix I entries, C's, N's and E's, at three places.** Default: C's entry goes before "Passages not yet revised" (`Specification/appendices/changes.tex:4637`); N's after "The single-precision floating-point type" (`:2659-2735`), the entry whose callout stands at the passage that N revises (`Specification/basic-lib/numbers.tex:50`), about 1,900 lines from C's, so that the gather's merge meets no two insertions at one place. N also corrects one clause of the entry "The number types" (`changes.tex:578`). Every natives rung makes the list and the count of the entry "A native binding that names a static helper" false (`changes.tex:4432-4562`; its "The other 143 still name a glue class", `:4495`). The gather corrects that entry once, on the merged tree, as the manual's "Corrections still owed" gives it. No rung edits it. E's entry goes before "When two sizes are the same" (`changes.tex:3935`), after "The rounding of an infinite or indefinite rational" (`:3878-3934`), about 1,200 lines from N's, 700 from C's and 500 from the entry that the gather corrects. Rung A makes that entry's "that the interpreter loads a helper beside its glue classes" (`:4444-4446`) false for its two names; the gather corrects it with the count. Rung E closes row 909, which N's new entry names in its effect; the gather corrects that clause on the merged tree.
8. **The stale line citations of Appendix I are not this batch's.** Default: no rung lists them and the gather leaves them; row 905 holds them (section 5). The rungs shift the lines of `Library/FortressLibrary.fsi` further, but the citations are already wrong on the base. The way not taken: the gather re-anchors all nine by declaration, a change of the specification that no rung's decision covers.

**Rung N**

9. **N1. The reflective generator's way to make a `Number`.** Default: in `genType` (`Library/ReflectiveQuickCheck.fss:25-45`), `Number` is a special case, as `Any` is (`:30-32`, `genAnyType` at `:49-58`): a fixed choice among the clause's list as it stands, `RR64`, `RR32`, `QQ`, `AnyIntegral` and `IntLiteral`, with `AnyIntegral` read through its own clause as today. So the generated values keep today's kinds. The review names this way (`reviews/number-closure-2026-11-05.md`, section 6, (b), point 1). The way not taken: the generator reads the subtypes that the library declares, which no reflective call gives today.
10. **N2. `=` at a program's own number type.** Default: no declaration in the library, since P-165 takes `Number`'s `=` away, and the earlier default, `=` by `asFloat` for a type outside the library's, is moot. A program's type compares by its own `=` where it declares one, as `opr =(self, other:Cx):Boolean`, or by extending `Equality` at itself, whose `=` is `SEQV` at its own type (`Library/FortressLibrary.fss:100-102`); else by the fallback `opr =(a:Any, b:Any):Boolean = a SEQV b` (`:96`), as P-160 now says. Under walk `SEQV` compares a value object's fields and any other object by identity (`interpreter/evaluator/values/FOrdinaryObject.java:46-57`), but calls two value objects equal when their body declares no field (row 113), so a program's value-object number declares its own `=` until the rung that fixes what `SEQV` means (P-162; PLAN's first stress test, `value object CC64`). A program's value against a library number answers `false` by the fallback, unless the program declares that `=`. The way not taken: a `=` on `Number` for the types that the library does not declare, which P-165 removes.
11. **N3. The trait that row 551's test names.** Default: `AnyIntegral`, as the review names, whose clause stays (P-44). If the object cannot define `AnyIntegral`'s abstract members in a small program, the worker takes another closed trait of the library whose members it can define, and names it in the report. The test stays an expected failure of row 551 (walk does not check a clause outside the main component). Row 22 is a duplicate of row 551.
12. **N4. The specification's sentence on `asFloat`, in the revision form.** Default: `Specification/basic-lib/numbers.tex:47-49` says that each number type declares `asFloat`, with a `\revision` callout labelled by a new Appendix I entry, `revival-asfloat`, after "The single-precision floating-point type" (fork 7); the entry "The number types" says the same at `changes.tex:578`, and N corrects that clause there. The Working Draft has no such sentence: the revival added it (`d9c415395`), so the entry quotes the revival's text as the original and says so. Its effect names the pairs of `=`, the fallback, and row 909, by which walk answers a mixed `=` that no pair carries. The clause's removal needs no text: the specification gives `Number` no `comprises` clause, and lists future number types under it (the review, section 6, (b), point 2), and no Appendix I sentence names the clause (the planner's `grep`). The way not taken: one sentence in the number chapter that a program may extend `Number`, which the review leaves optional.
13. **N5. Rung F's sites.** Default: N changes none of `random`, `atan2` and `printThreadInfo` over `Number`, the `RR64` trait's `^` and `atan2` over `Number` (`Library/FortressLibrary.fss:485`, `:494`) and `Float`'s `^` at `Number` (`FortressBuiltin.fss:160`): rung F declares each at `RR64` (fork F6), and N lands only with F (fork 1).

**Rung N, the forks that P-165 adds** (numbered after the batch's others, so that the numbers above keep their place)

32. **N6. Each type's own `asFloat`, declared in its api.** Default: `asFloat(self): RR64` in the six traits of `FortressLibrary` and the three objects of `FortressBuiltin`, at the components' headers, right before each type's own `=`, the traits' members written `abstract` in the api and restated in the component without a body (P-158). The apis declare `asFloat` on `Number` only: with it struck and nothing declared, the phase that binds names, which both paths run, refuses the first library component that calls `asFloat`, 'Variable asFloat is not defined.' at `Library/String.fss:529`, since a functional method's name reaches a component only through an api that declares it; and the parser refuses an api line before a coercion or a getter (probe 8). The prelude declares its float conversion, `asRR64`, on four of its types, `ZZ32`, `NN32`, `IntLiteral` and `FloatLiteral`, and on no shared trait (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:268`, `:327`, `:396`, `:481`). The way not taken: one declaration on `AnyIntegral`, a supertype that P-165 does not name. Not consequential: P-165 keeps each type's own `asFloat`, and P-158 says where an api's `abstract` member is declared; nine api lines undo it. On the review list.
33. **N7. A pair of `=` for each coercion that the apis declare.** Default: 21 pairs, 42 declarations with their api lines (section 4, rung N): the wider type compares after converting the narrower operand as the coercion does, in either order. P-165's rule does not hold by itself: the fallback `=` over `Any` (`Library/FortressLibrary.fss:96`) applies without a coercion, so it runs and no coercion does (`Specification/basic/conversions-coercions.tex:470-494`). With nothing added, 12 of the 756 walk tests fail, and the checker would resolve to the fallback 54 comparisons of the one library that it resolves to `Number`'s `=` today, and microGPT's `if i = 0` lines with them (`explorations/run-c4/src/MicroGptFlat.fss:38-41`, `explorations/apl/mg/MicroGptApl.fss:54-57`; probes 8 and 10). With the pairs, 3 tests fail, at ten lines that no coercion carries (probe 11). The principles, read closely: the team's later word, the prelude, declares no `=` over `Any` and compares two numbers by coercion where it declares one, so its checker resolves `i = 0` at a `ZZ32` by the numeral's coercion and refuses `3 = 3.0`, a `ZZ32` against an `RR64` and an `RR64` against a numeral, whose coercions it lacks (section 5, "The Fable review's probes for rungs N and F"); the team's library compared every mixed pair by value, through `Number`'s `=`; the peers split, Julia and Scala promoting and Haskell and Rust refusing a mixed `==` statically. All three agree that a pair a coercion carries compares by value after the conversion, which the pairs give; on a pair that no coercion carries they split, and this batch leaves it to the fallback and to the review list. The library's own like case: `<`, `<=`, `>`, `>=` and `CMP` have no declaration over `Any`, so a mixed `<` resolves by coercion, the prelude's way for `=`. The library's precedent for the pairs' bodies: `IntLiteral`'s exponent overloads, which convert by `b.asZZ32` (`:804`). The ways not taken: no declarations, with every mixed `=` written out, the model's `i = 0` among them, which the checker cannot list, since each still type-checks; the pairs on the wider type only, 21 declarations, which leave the narrower operand on the left to the fallback, `ZZ32 1 = ZZ 1` false; a fallback narrowed so that it does not apply to two numbers, which Fortress cannot write: a declaration over `(Number, Number)` applies without a coercion, so by P-46 it takes every pair that a coercion carries, and with `Number` empty it has nothing to compare by but a typecase over the nine types, the pairs in another form, or `asFloat`, which P-165 struck; the fallback `=` over `Any` cut as well, which the specification does not declare (its `Any` declares `SEQV`, `Specification/basic-lib/objects.tex:47`) and the prelude does not have, so that an uncarried mixed `=` is a static error: `assert(x:Any, y:Any, …)` (`:307`), `deny` and every `=` of a type without its own would need a new form, a change beyond this batch. Not consequential: the default carries out P-165's sentence, changes no model line, and the model's `i = 0` lines resolve to `ZZ32`'s own `=` under walk, where a numeral is a `ZZ32`, and to `ZZ32`'s pair at `IntLiteral` under the checker, never to the fallback; 42 deleted declarations undo it. Section 2 lists it for him before the go all the same, since P-165's sentence did not name 42 declarations, and it goes on the review list. The fallback's own standing is the open question for a later batch (section 5, "Left out, each with its home").
34. **N8. The vector norm at each of the eight number types.** Default: the one declaration over `T extends { Number, MultiplicativeRing[\T\] }` (`Library/FortressLibrary.fss:2645`, `.fsi:1706`) replaced by eight, as `opr ||[\nat k\] me: Vector[\ZZ32,k\]||: RR64 = SQRT asFloat(squaredNorm(me))`, with `SQRT squaredNorm(me)` at `RR64`; each promises its float by its own type's `asFloat`. Walk loads generic declarations that differ only in the element type (F-155), and the checker reads them as excluding (P-152). A program's own number type declares its own norm. The principles: the prelude has no vectors, so the team's later word is silent on the norm, but it declares `asRR64` on four of its types and on no shared trait (fork N6); the team's library gave the norm at every number type, through `Number`'s `SQRT`, built on `asFloat` (`git show a874948ac:Library/FortressLibrary.fss`, lines 383 and 2281); the peers split: Haskell's and Rust's `nalgebra` norms take float elements only, Julia's any number, by `float`, which it declares on every `Number`, and Scala's Breeze an instance per element type. So the two team principles favour a norm at each library type by its own conversion. The ways not taken: (a) a small trait with `asFloat` that the eight types and `IntLiteral` extend and the norm's bound names, as an indexed type's bound names `Index` (P-156): it puts back on a new supertype what P-165 takes off `Number`, and neither the specification nor the prelude has one; (b) the norm on `RR64` and `RR32` vectors only, the way of Haskell and Rust, which makes `tests/FlatTowerRungF.fss:186` and `:190` write the conversion; (c) one declaration that converts by a `typecase` over the eight types, as `array1` chooses by element type (`:2597-2608`): the same values, but a program's own number type meets the bound and fails at run time. P-165 itself sends this fork to the review list with its default: "the vector norm takes a bound that promises a float; climb batch 27's rung chooses its form as a fork with a default, which its review list shows." The default reads that bound as each declaration's element type, a concrete type with its own `asFloat`; ways (a) and (b) read it as a trait bound or as the two float types. Not consequential: P-165 delegates the form, no model line takes a norm (neither program holds `||`), and seven deleted declarations and one restored undo it.

**Rung I**

14. **I1. The public spelling, with the private spelling where a stage refuses a pair** (P-162). Default: each narrow header public and in the api. The narrow types are the prelude's where it declares one: a `ZZ32` count on `ZZ32`, a `ZZ64` count on `ZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:736-737`, `:647-648`). Elsewhere they are the signed type of the receiver's width: a `ZZ32` count on `NN32`, a `ZZ64` count on `NN64`, and a `ZZ32` count on `ZZ`, which `shiftLeft(BigInteger, int)` takes. Every exponent is a `ZZ32`, with its sign and parity kept (the review, section 6, (a), point 3). The prelude's powers on `NN32` and `NN64` take an exponent of their own type (`CompilerBuiltin.fss:809`, `:878`), so at those two the bare half departs from the prelude's header: a signed exponent must reach the helper for P-153's run-time test of its sign, and the review's option (a), which P-162 took, reads every exponent into a `ZZ32`.
15. **I2. A `ZZ` count or exponent is clamped in `ZZ`, then converted by `ZZ`'s `narrow`.** Default: so. `narrow` keeps its glue binding in this batch (`Library/FortressLibrary.fss:1080-1081`). No helper converts a `BigInteger` to an `int` today (`nativeHelpers/simpleArbitraryPrecisionArith.java`, its public methods). P-161's rung, in climb batch 28, moves these calls onto `.asZZ32` with the other callers, their values unchanged, since each clamped value fits. The way not taken: a new private helper over `BigInteger.intValueExact`, which would choose a helper that P-161's rung designs.
16. **I3. A helper that exists where it computes as the glue does; a new one otherwise, at the end of the class of its kind.** Default: so. Each existing helper is checked against the glue's values at the review's counts (section 2.1, point 7) before it is bound. No other rung of the batch edits the five integer helper classes.

**Rung F**

17. **F1. `Float`'s power over `AnyIntegral`.** Default: a public bare `opr ^(self, b:ZZ32):RR64` on a new helper, `Math.pow` with the exponent read as a `double`, as `Float$Pow` reads it, beside `opr ^(self, b:AnyIntegral):RR64`, which converts its exponent by a `typecase` over `AnyIntegral`'s five types, each by its own `asFloat`, and calls `Float`'s `^` at `RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:158`); a `ZZ32` exponent reaches the bare binding. The model's power calls, all at a `ZZ32` exponent, then go straight to a bare binding (P-162). The earlier default converted by `asFloat(b)` at an `AnyIntegral`, the team's text for `Number` (`:160`), which rung N strikes. Each type's `asFloat` reads its value as a `double`, as `Float$Pow` does (`interpreter/glue/prim/Float.java:292-296`): assert it at an `NN64` at 2^63 and above and at a `ZZ` past 2^64. The ways not taken: the private spelling, one more dispatch at each of the model's 18K power calls (the review, section 6, (a), point 11); `asFloat` declared on `AnyIntegral`, which puts on a supertype what P-165 takes off `Number`; a conversion into `ZZ32` as rung I reads a count, which saturates where the glue reads a `double`.
18. **F2. `random` at `RR64` only, on a new helper.** Default: `random(a:Number):RR64` (`Library/FortressLibrary.fss:4537`) becomes the public bare `random(a:RR64):RR64` on a new helper, `scale * Math.random()`, as `Float$Random` computes, with its api line (`.fsi:2573`); no `random` over `Number` stays (P-165). Every caller in the library, the tests, the demos and the model passes a `ZZ32`, an `RR64` or a numeral, which coercion carries (the planner's `grep`; among them `Library/Avl.fss:422`, `Shuffle.fss:24`, `Random.fss:195`, `SkipList.fss:78` and the demos `buffons` and `conjGrad`), so none changes. Not `LocalRandom.localRandomDouble`, which refuses a bound that is not positive, where walk answers `random(0)` with 0.0 (the review, section 6, (a), point 4). The way not taken: the pair over `Number` of the earlier default, which converted by `Number`'s `asFloat`.
19. **F3. Where each helper goes.** Default: `Float`'s three and its power in `simpleDoubleArith`; `RR32`'s mixed power in `simpleFloatArith`; `FlatString`'s `=` in `stringOps`, right after `compareTo` (`nativeHelpers/stringOps.java:23-25`); `flatConcat` at a `Char` in `simpleConcatenate`, right after `nativeConcatenate` (`simpleConcatenate.java:16-18`); `random`'s in the class of its kind. Rung S adds to `stringOps` after `lineSeparator` (`:72-74`), another place in the class.
20. **F4. `flatConcat` at a `Char` past U+FFFF keeps the glue's answer.** Default: the helper appends the character's low 16 bits, as the glue reads a `Char`'s text (row 872), so no value moves. Row 872's notes have about 70 characters of room and its row 156 (`ledger.py note 872 TEXT --check`; its 1,197 is a count of bytes, not of characters), so give it one short note through your `record.md`, that `flatConcat`'s new helper reads a `Char` past U+FFFF as the glue does, a sibling site of the row's; the gather rewrites the row if the note does not fit. The way not taken: the whole code point, a value that moves, which row 872's own fix would take for every `Char` at once.
21. **F5. `printThreadInfo` at `RR64`, through `asString`.** Default: `printThreadInfo(a:Number):()` becomes `printThreadInfo(a:RR64):() = printThreadInfo(a.asString)`, with no native of its own, as P-165 declares it at `RR64`; so the live bindings fall by one, as the earlier default had it. It never converted by `asFloat`: its glue reads its argument as a string (`StringPrim$PrintThreadInfo`), and the earlier default called climb batch 26's pair through `asString` over `Number`. At `RR64` a numeral or a `ZZ32` caller's line reads the float's text, `3.0` for `3`, and a `QQ` caller writes a conversion; no caller in the library, the tests or the demos passes a number (the planner's `grep`). The way not taken: over `Number` through `asString`, which prints every number's own text; section 2 lists it for him.

**Rung F, the fork that P-165 adds**

35. **F6. The `RR64` trait's `^` and `atan2` over `Number` narrowed, and `Float`'s `^` at `Number` struck.** Default: the `RR64` trait's `atan2(self,x:Number):RR64` (`Library/FortressLibrary.fss:494`, `.fsi:375`) becomes `atan2(self, x:RR64):RR64`, which converts `self` only; its `opr ^(self, b:Number):RR64` (`:485`, `.fsi:367`) becomes `opr ^(self, b:RR64):RR64` with the same body; `Float`'s `opr ^(self, b:Number):RR64 = self^(asFloat(b))` (`FortressBuiltin.fss:160`) goes, since `Float`'s `^` at `RR64` (`:158`) is its bare binding. On rung N's tree the checker refuses `:494` and `:160` (probe 9); `:485` passes there only because `:160` takes its `Number`. A `ZZ32`, `RR32` or numeral operand reaches the `RR64` headers by coercion; an integer exponent of any type reaches `^` at `AnyIntegral` (`:487`), unchanged; a `QQ` exponent, and a `QQ`, `ZZ64`, `NN32`, `NN64` or `ZZ` `atan2` operand, writes `asFloat(x)`. The planner's `grep` found no such caller: `atan2`'s one caller (`tests/realArith.fss:62`) passes `RR64`s, and every float power at a non-integer exponent in the tests takes an `RR64` or an `RR32`. The way not taken: the three kept over `Number` with a `typecase` over the nine types, a declaration over `Number` that P-165 removes. Not consequential: P-165 declares the four at `RR64` and says that a caller of another type writes `asFloat(x)`; no caller in the tree changes; two headers widened again and one declaration restored undo it. On the review list.

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

**Rung A** (forks 36 to 40, numbered after the batch's others)

36. **A1. Walk's ilk names the library's five native number objects by their traits, at the top level and inside static arguments.** Default: `ObjectPrims$ClassName` renders the value's type with `Int` as `ZZ32`, `Long` as `ZZ64`, `BigNum` as `ZZ`, `Float` as `RR64` and `UnsignedLong` as `NN64`, each the one trait that the object extends (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:54`, `:369`, `:378`, `:475`, `:565`), also inside a generic's static arguments, so walk's `Box[\Int\]` prints `Box[\ZZ32\]`; it tells the five by the component that declares them, as walk's loader tells the library's `FlatString` (F-299). The planner's prototype, which matched by name, took about 20 lines, and the walk suite then failed only at 48 lines of two revival tests that assert walk's names (section 5, probe 15). The compiled helper names a number by its box's trait, `ZZ32`, `ZZ64`, `RR64` (probe 16), so the two paths then agree. The ways not taken: the five made private below their traits (item 372's other way), which still prints their names; the five removed, with walk's values made at the traits, which walk cannot do, since each value's methods are bound on its object (`FortressBuiltin.fss:369-376`); the top level only, which keeps `Box[\Int\]` in every printed generic. A `Box[\Int\]` still dispatches past a `Box[\ZZ32\]` (F-74; row 364): only its text changes. Not consequential: P-167 states the rule and leaves the way to the rung, and the rendering is undone in one method. On the review list, with item 372.
37. **A2. Only the five print as their traits.** Default: strings (`FlatString`, `CatString`, `SubString`), `Ratio`, `Char`, `IntLiteral` and `FloatLiteral` keep their names. They are objects of the one library that a program may name and that the compiled path reads after the switch-over, where the five have no compiled counterpart; against the prelude the compiled path prints a string's type `JavaString` and a character's `Character`, and has no `QQ` (probe 16), so no rendering of walk's would match it before the switch-over. A's tests assert the ilk only at types that both paths name alike. The way not taken: strings as `String` and `Ratio` as `QQ` too, which reads P-167's "the trait's name" past walk's native objects. Not consequential; on the review list.
38. **A3. The five stay public.** Default: so, item 372's default; a program can still name `Int` in a `typecase` (probe 14). Making them private is the names batch's (PLAN, phase 4, the names line). P-167's clause that walk's native objects "stop being types that a program sees or prints" is read as the ilk's text, which forks A1 and A2 give: his words on record are "the ilk as the trait's name on both paths" (P-167's history; `HELD.md`, 2026-11-06, 19:0x, and 2026-11-07, 04:5x), and item 372, raised from his reading of the same day, holds the five's visibility with this default. Not consequential: it bends no word of his, and five `private` modifiers with their api lines undo it; on the review list with item 372, as fork A1 says.
39. **A4. Row 321 narrows, and does not close.** Default: the one library's `Object` stops reaching the overflow, by A's compiled guard, the review's form (`reviews/any-carrier-2026-11-06.md`, section 6, (e), point 19); the prelude's `Object` keeps `asString` on `jDefaultAsString` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`) until it is deleted (P-37, P-38), so `compiler_tests/XXXFortToStringRungS` stays an expected failure and row 321's line narrows to the prelude. Not consequential.
40. **A5. A's tests assert only what A changes, so A does not build on E.** Default: A's walk test asserts the ilk, `asString` and `SEQV` only where today's answer and P-168's agree: a reference object with itself and with another of equal fields, a reference object against a number. A's compiled guard binds `equality.sEquiv` at the same cases. Walk never runs `equality.sEquiv`'s body, since the table answers its name, and no compiled program reaches the one library's `SEQV` before the switch-over; so E's change of that body moves none of A's answers. Not consequential.

**Rung A, the fork that the coordinator's rider adds** (numbered after the batch's others)

56. **A6. `match` over `String`, in the library's form.** Default: beside `match(regex:FlatString,some:FlatString):Boolean` (`Library/FortressLibrary.fss:4615`, `.fsi:2576`), an overload `match(regex:String, some:String):Boolean` in the component and the api that flattens each argument by a `typecase` on `asFlatString` and calls the native over `FlatString`, failing with a message if `asFlatString` answers a string that is not flat, as `printlnWithThread(a:String)` does (`:4640-4644`), and `printThreadInfo(a:String)` (`:4629-4632`) and the other overloads over `String` of F-299. Today a rope, a substring or a program's own string object is refused at the call (row 916; `reviews/strings-in-fortress-2026-11-07.md`, section 5, points 54 and 56). The way not taken: the one-line `match(regex.asFlatString, some.asFlatString)`, which reaches the native by dispatch on the run-time types and calls itself again where `asFlatString` answers a string that is not flat. It goes in rung A, as the coordinator asked: rung S, whose helper class `match` names, edits no library file, and rung F, whose `printThreadInfo` is its neighbour, is the floats' rung, whose brief this record does not reopen; A already edits the same component's top-level natives at `:4650-4651`. The two `match` declarations nest, so the overloading rules hold (`SKILL.md`, "Fortress as a language"). Not consequential: the library's pattern, two lines and their api line undo it.

**Rung E** (forks 41 to 49)

41. **E1. Values of different types are never equivalent, a walk `FloatLiteral` and a walk `Float` among them.** Default: each walk value class compares only with its own class (P-168, "with no special case for any type"). Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, since the one library declares `object FloatLiteral extends RR64` (`FortressBuiltin.fss:196`) and so no coercion runs, while `5.0 + 40.0` is a `Float` (probe 14, line 1; probe 17, line 1). So `sequivTest.fss:58`, `equiv(b,c)`, and `:94`, `equiv((a,b),(a,c))`, change too: eight lines of the team's test, where the review counted six (probe 18). The compiled prelude coerces the numeral into `RR64` at the binding (probe 16), so there the two are one type; after the switch-over the compiled path reads the same `FloatLiteral` below `RR64`. The ways not taken: a walk `FloatLiteral` equivalent to a `Float` of the same bits, a special case that P-168 excludes; walk converting a float numeral into a `Float` at a binding declared `RR64`, a change of walk's conversions that no decision names. Not consequential: it applies P-168 as written and touches no model line; section 2 lists the two lines for him all the same.
42. **E2. The compiled path reads the `value` modifier by a mark on the object's class.** Default: an empty Java interface of the run time, under `compiler/runtimeValues/`, which the code generator adds to the interfaces of the class that it writes for an object declared `value` (`compiler/codegen/CodeGen.java:4522-4523`), in a copy of the array: `superInterfaces` itself (`:4408-4409`) feeds the springboard (`:4416-4417`) and `dumpMethodChaining` (`:915`), whose length tests (`:924`) a mark would change, and which rung T edits. `javap` shows a compiled `value object`'s class with the same shape as a reference object's, its value parameters as `public final` fields (probe 19). The ways not taken: a static field or an annotation on the class; reading the class's `RTTI`. Not consequential: one interface and two lines undo it.
43. **E3. The compiled helper's rule over the run time's values.** Default: `equality.sEquiv` answers `true` for one object; `false` for two Java classes, except two tuples, which compare by arity and element by element, whatever their classes' static arguments; for two of the run time's boxes of one class (`FZZ32`, `FZZ64`, `FZZ`, `FNN32`, `FNN64`, `FBoolean`, `FCharacter`, `FIntLiteral`, `FVoid`) by value, and `FRR64`, `FRR32` and `FFloatLiteral` by their bits; for two marked objects of one class field by field, each by `sEquiv`; for every other value, strings (`FString`, `FJavaString`) among them, by identity. Every method of the class, a private one too, takes and answers Java types that map to Fortress, since the prelude's import (`Library/CompilerLibrary.fss:19`) wraps the class in every compiled program and, on the merged tree, rung A's binding makes the count stage read it whole (F-321): reflection over fields goes in another class if its types do not map. The ways not taken: the boxes read as value objects through item 371's trait modifier (fork E6); a method per class, as walk's, which the boxes do not have. Not consequential.
44. **E4. `Ratio`, `IntLiteral` and `FloatLiteral` become value objects.** Default: all three (P-166 for `Ratio`; row 910 for the literals, since the specification names numeric literals among the value objects). The team's later word is silent: the prelude declares `IntLiteral` and `FloatLiteral` as bare traits (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:883`, `:996`), of no kind; the specification names numeric literals among the value objects (`objects.tex:39-43`), and the library's seven other number objects are `value` (row 910). No reason stands against the literals: walk's own classes answer their `SEQV`, and the planner's prototype with all three gave the suite's two expected failures only, the count 0 and the distance 0 (probe 18); `1/2 SEQV 2/4` turns `true`, `Ratio`'s fields being its normalised numerator and denominator. Not consequential: P-166 decides `Ratio`, the literals follow the specification's list, and two words undo them.
45. **E5. The specification's list also names strings, among the reference objects.** Default: so, in the same callout and Appendix I entry as P-166's revision: "Reference objects include strings and aggregates such as arrays, lists and sets" (`Specification/basic/objects.tex:52-54`), since P-168 decides the strings' kind and the revision form leaves no disagreement of text and implementation hidden (P-96; the strings review, (b), point 2). The way not taken: the list silent on strings, as the Working Draft is, with P-168 in POSITIONS only. Not consequential: one clause.
46. **E6. Item 371, `value trait` on the number traits, waits for the switch-over batch.** Default: not in this batch. Neither path reads a number trait's modifier for `SEQV`: walk's numbers are its native objects, each declared `value` (`FortressBuiltin.fss:54`, `:205`, `:369`, `:378`, `:387`, `:475`, `:565`), and the prototype answered every number case by their classes' own `seqv` (probe 18); a compiled number is a box of the run time that no Fortress declaration makes (`compiler/runtimeValues/FZZ32.java:14`), which the helper reads by its Java class with the modifier or without it (fork E3). The modifier would add only walk's refusal of a reference object below a number trait (row 115) and the type's statement for the switch-over, where the compiled numbers meet the one library's traits. `Number` stays a plain trait either way: rung N's tests declare reference objects below it. The way not taken: `value trait` on `RR64`, `QQ`, `ZZ32`, `ZZ64`, `NN64` and `ZZ` now, in both files, beside rung N's and I's edits of the same traits. Needed by: the switch-over batch. Not consequential; on the review list.
47. **E7. The tuple limit: a tuple of four or more compares by `SEQV`.** Default: E respells `tests/TransposedMatrixAndFreeze.fss:19`, a revival test whose 4-tuple holds strings, into assertions that keep each value checked, and files the gap as `NEW-E-1`. The library declares `=` on pairs and triples only (`Library/FortressLibrary.fss:4668`, `:4724`), so a longer tuple compares by the fallback, `a SEQV b` (`:96`), element by element in walk's run time (`FTupleLike.java:78`); with strings reference objects, two such tuples of equal strings built apart are not equal (probe 18). The strings review read `=` as unchanged under either way at pairs and triples only (`reviews/string-equivalence-2026-11-06.md`, section 6, point 2), so this cost was not before him when he chose "B"; section 2 lists it for him, and the row records it. The ways not taken: the library's `=` at more arities, a library design that no decision covers; walk's tuples comparing strings by text, a special case that P-168 excludes. Not consequential: a revival line and a row.
48. **E8. `compiler_regressions/seqv.fss:22` stays until the switch-over.** Default: so, listed for him. Compiled, it answers through the prelude's `opr ===(a:String, b:String) = a=b` (`Library/CompilerLibrary.fss:68`), which stays until the switch-over (P-38), so it prints `PASS 'cat'==='cat'` there until the prelude goes; under walk the file stops at load, 'Operator NEQV is not defined.'; nothing runs the folder (the strings review, section 3). The switch-over batch, which deletes the prelude, changes the line to P-168's answer. The ways not taken: the line respelled now, which then fails on the one path that runs it; the line deleted. Not consequential: P-168's history names the line among the costs he took.
49. **E9. The compiled tests bind `equality.sEquiv` at `Any` in their own declarations; the compiled default `=` waits.** Default: so. Until the switch-over a compiled test reaches the prelude's family first (`Library/CompilerLibrary.fss:62-69`), which answers numbers, strings and booleans by `=`; E's compiled test binds the helper, as `compiler_tests/NativeHelperBindingCompiled.fss:8-9` does, and binds every value at a declared type, since a numeral at `Any` is an `IntLiteral` there and a `ZZ32` under walk (F-57). The prelude declares no `=` over `Any`, so `CC64(1.0, 2.0) = CC64(1.0, 2.0)` is a static error compiled (probe 19): his stress test's `=` runs on walk now and on the compiled path after the switch-over. Not consequential.

**Rung G** (forks 50 to 52)

50. **G1. An assumption at a method call's receiver calls the body that the assumed type gives the method.** Default: `(e asif T).m(args)`, getters among them, which the desugarer makes method calls, compiles as a static call of the method that `T`'s `DefaultTraitMethods` class holds for `m`, declared in `T` or inherited by it, with the value as `self`; where `T` gives `m` no body, the virtual call. A trait's bodies are such static methods today (probe 21: `CompilerBuiltin$Object$DefaultTraitMethods.asString(Object)`). It is the specification's reading, "a richer version of type assumption operations such as `super` in the Java Programming Language" (`basic/expressions/type-annotation.tex`, "Type Assumption"). The ways not taken: a run-time wrapper, as walk's `FAsIf` (`interpreter/evaluator/Evaluator.java:109-116`), which every dispatch method and call would have to unwrap; a cast and the virtual call, which runs the override and breaks the rule. Not consequential.
51. **G2. A call whose every dispatched argument is an assumption calls the declaration that the checker resolves there; a partial one stays refused.** Default: so, as `(self asif String) CMP (other asif String)` (`Library/String.fss:397`, `:421`): the static and the dynamic types of each argument are then known, so the call needs no run-time dispatch. A call with an assumption beside an argument that is not one stays refused with a message of its own, and row 818 narrows to it. An assumption that is no call's argument or receiver, as `arb = c.arbitrary asif ReflectiveArbitrary` (`Library/ReflectiveQuickCheck.fss:68`), compiles as the subexpression's value at `T`. The ways not taken: a dispatch that fixes some positions at their assumed types and tests the others, a new kind of dispatch method; the assumption ignored at run time, which gives the override. Not consequential: the default leaves the hard case refused and recorded.
52. **G3. The rung's test is a program in the library's forms, compiled against the prelude.** Default: so, as climb batch 25's rung C tested its walls: no compiled program reaches the one library before the switch-over, and the 7 declarations that F-34 counts at this wall (`perf-probes/codegen-distance/REPORT.md`, section 3) may stop at a later wall. Not consequential.

**Rung T** (forks 53 and 54)

53. **T1. The fix goes where the comparison reads the api's trait, in the code generator.** Default: in `dumpMethodChaining` (`CodeGen.java:915-1021`), at the type that it passes to `typeAnalyzer.equiv` (`:1009`), or where that type is made; the code generator's table is built over the component and the api environment (`compiler/phases/CodeGenerationPhase.java:179`, `:206-210`), so the type that fails is the api's trait as the first supertrait's methods name it, and the rung finds why. If the fix must change the checker's trait table (`scala_src/types/TypeAnalyzer.scala:882-884`), it is a change of checking code: the rung takes P-148's measure, runs the count stage and the distance stage, and lists it as a point to report. Not consequential.
54. **T2. Row 732, the sibling in the same method, is not this rung's.** Default: so. Its defect is another, a forwarder missing for a body inherited from an api's trait that is not first (`CodeGen.java:968`); where T's fix makes it reachable, the rung records what it measures. Not consequential.

**For the walls together**

55. **The two walls as two rungs.** Default: G and T, two rungs, by his rule of 2026-11-07: they edit distinct methods of `CodeGen.java` (G `forMethodInvocation`, `:6397-6521`, the calls of `forOpExpr`, `:5163`, and `forFunctionalRef`, `:3926`, and a new visitor; T `dumpMethodChaining`, `:915-1021`), neither builds on the other, and the only other rung that edits the file, E, writes a third place, the class header of `forObjectDeclPrePass` (`:4522-4523`). The way not taken: one rung over both, as climb batch 25's rung C took three walls, which would put two unrelated fixes under one test order and one skeptic. Not consequential.

### Points the batch lists for him, not questions

- **Team lines changed.** N: the reflective generator's `genType`, Kang Seonghoon's of 2010 (`Library/ReflectiveQuickCheck.fss`, by its header and `git log --follow`, first commit `e40544c31`); the clause that N deletes is the revival's (`9d2e4c856`), written in place of the team's `comprises { RR64 }`; `Number`'s abstract `asFloat`, the team's of 2012, and its `=`, the revival's (probe 6), struck; the norm, the team's of 2012 over `Number` in the revival's form (`d846e3644`), declared at each number type; six lines of the team's `testRR32.fss` and two of its `expTest.fss`, each a comparison written with its conversion (fork N7); the team's test `extendNumber.fss` stays as written. I and F: the strings and bodies of the team's bindings; F also strikes `Float`'s `^` at `Number`, the team's text, and narrows the `RR64` trait's `^` and `atan2` over `Number` to `RR64`. C: Steele's helper `charToExprString` and his parser rule `UnicodeHexChar` of 2011, and the specification's list of character-literal forms, with the original kept in Appendix I. W: the team's `Writer`, `BufferedWriter` and `FileWriteStream` and their api lines. S: none of the team's; `systemOps.getProperty`, the team's, stays. A: `Object`'s `ilkName` and `asString` bindings (`FortressBuiltin.fss:38-41`), `SEQV`'s (`FortressLibrary.fss:4650-4651`), walk's loader (`interpreter/glue/NativeApp.java`) and its ilk operation (`ObjectPrims.java`), the team's of 2008 by the commit notes (the review, section 3.1, points 3 and 4), at the tree's oldest commit by `git blame`; and 48 lines of two revival tests. E: Maessen's `seqv` methods of 2008 in eleven value classes and `FTypeObject`'s field list, `equality.sEquiv` of Chase, 2010, and the code generator's object header; the team's `Ratio` and `FloatLiteral` declarations and the revival's `IntLiteral` (`9d2e4c856`); eight lines of the team's `sequivTest.fss` (Maessen, 2008), one of a revival test, and the specification's lists of value and reference objects, with the original kept in Appendix I; the team's `compiler_regressions/seqv.fss` stays. G and T: the team's code generator, `forMethodInvocation`, the call visitors and `dumpMethodChaining`.
- **What walk does differently.** A program may declare its own number type below `Number`, with no `asFloat`, and its values compare by its own `=` or by the fallback through `SEQV` (N). Two numbers of different types compare where a coercion carries one into the other, and otherwise by walk's `SEQV` (row 909), so `1/2 = 0.5` is `false` (N). `random` and `atan2` take no `QQ`, `ZZ64` or `ZZ`, whose caller writes `asFloat(x)`, and `printThreadInfo` prints a number as a float (F). `Char`'s `asExprString` writes the helper's completed form, which reads back, at every code point outside printable ASCII (C). The writer objects run over `fileOps`, in UTF-8, and `BufferedWriter`'s `asString` answers (W). A six-digit or a lower-case five-digit character code now parses (C). `ilkName` and the printed name of an object without its own `asString` give `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64` where they gave `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong`, also inside a generic's static arguments (A). `SEQV` is `false` for values of different types, a `FloatLiteral` numeral against a computed `RR64` among them, and for two strings that are not one object, `"cat" SEQV "cat"` among them; two value objects compare every field, so `Just(1) SEQV Just(2)` and `CC64(1,2) = CC64(1,3)` are `false`; two equal `QQ` values built apart are `SEQV`; a tuple of four or more equal strings built apart is not `=` (E). `match` takes a rope, a substring or a program's own string object (A).
- **What the compiled path does differently.** Against the one library, none before the switch-over. The checker resolves a comparison of a number with a numeral or another number type to that type's pair of `=`, not to `Number`'s `=` (N). The count stage reads `fileOps` whole for the first time (W). Against the prelude, now: `equality.sEquiv` answers by the rule: two equal numbers, two equal tuples and two value objects with equivalent fields are equivalent, and a float by its bits (E); the prelude's `===` family still answers numbers, strings and booleans by `=` until the switch-over. A type assumption compiles at a method call and at a call that it fixes (G). An object whose first supertrait is an imported api's trait compiles (T).
- **What the specification says differently.** The sentence on `asFloat` says that each number type declares it, in a new Appendix I entry (N). The list of character-literal forms names the redundant form (C). The lists of value and reference objects name arbitrary-precision numbers among the value objects and strings among the reference objects, in a new Appendix I entry (E).

## 4. The rungs

Line numbers are those of the base, `551b02858`, whose `Library/`, `ProjectFortress/` and `Specification/` are climb batch 26's landing. Each section is the worker's brief for its rung. Each rung's tests come first: written, run through the harness on the base and seen failing, or for a guard seen passing, and committed before the edit or with it (the `fortress-repo` skill's `tests-writing.md`, "The order: the test, its failure, the fix, the pass"). Assert each value that matters inside the test (P-103). Record each defect that you meet in one of the three ways of `tests-writing.md`, "How a defect is recorded". The planner's runs on the base are in section 5, "The planner's probes": each is your before, so run it on your own tree only. The count and the distance before your change are climb batch 26's gate tables, 0 and 0.

### N. `Number` opened and emptied: its `comprises` clause, `asFloat` and `=` struck, with each number type's own `asFloat` and `=`, the vector norm, the reflective generator and the comparisons that leaned on them (P-160)

**The mission.** The territory map shows the library's vectors and matrices beside the number types, with the element bound `T extends Number` (`map/spec-to-implementation.md`, section 4.2, its last two paragraphs). Its table of the tower predates the flat number types (P-43), so take the types' shape from the decisions on record. This rung lets a program declare its own number type below `Number`, so that such a type can meet that bound. It also leaves `Number` as the team's later prelude has it, a trait that declares nothing (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510-511`): each number type converts and compares by its own declarations.

**The decisions this rung builds.**
- P-160: the one library's `Number` opens in two steps. The first, walk's reading of the array operators beside `AdditiveGroup`'s own, landed (F-318). This rung is the second: the clause removed from `Library/FortressLibrary.fss` and `.fsi`, the reflective QuickCheck generator given a way to generate a `Number`, `Number`'s `=` and `asFloat` taken off the trait (P-165), so that a program's own number type compares by its own `=` or by the library's fallback `=` through `SEQV` (fork N2), and the tests that lean on the clause repaired.
- P-165: `asFloat` and the `=` built on it leave `Number` (`Library/FortressLibrary.fss:382-408`, `.fsi:290-295`); each of the eight number types and `IntLiteral` keeps its own `asFloat`; two numbers of different types compare by `=` only where a coercion carries one into the other (P-74), and otherwise the program writes the conversion, `asFloat(x) = y`; the vector norm takes a bound that promises a float, as a fork with a default; the specification's sentence changes with this rung. The team's 2012 library built `Number`'s `=` on `asFloat` (`git show a874948ac:Library/FortressLibrary.fss`, lines 349-373); the prelude's `Number` declares nothing; `Specification/basic-lib/numbers.tex:47-49` is the revival's own text (`d9c415395`).
- What P-165's rule on `=` needs (fork N7): the fallback `opr =(a:Any, b:Any):Boolean = a SEQV b` (`Library/FortressLibrary.fss:96`) applies to every pair without a coercion, and a coercion never changes which declaration runs when one applies without it (`Specification/basic/conversions-coercions.tex:470-494`). So with `Number`'s `=` struck and nothing added, the fallback, not a coercion, answers every mixed `=` (section 5, probe 8). The pairs of `=` below make the rule hold.
- P-44: `AnyIntegral`'s clause stays. Row 551: walk does not check a clause declared outside the main component; its test names `Number` today. Row 596: its `Number` half, `tests/extendNumber.fss`, needs no edit once the clause goes. Row 434: `Number`'s `=` between a float and an exact number is not transitive; your strike removes that `=`. Row 440: `0/0 = 0/0` answers `true` under walk, which `Number`'s `=` reaches today for every program's type.
- This record's section 3, forks 1 to 8, N1 to N5 (9 to 13) and N6 to N8 (32 to 34), give the defaults you build.

**What you build.**
- The tests first (below).
- Delete the clause: `comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` at `Library/FortressLibrary.fss:381` and `Library/FortressLibrary.fsi:289`.
- Strike the rest of `Number`'s body: `asFloat` (`.fss:382`; `.fsi:290-291`, with its doc comment) and `=` with its doc comment (`.fss:383-395`; `.fsi:292-295`), and `exactValue` (`.fss:398-408`), which only `Number`'s `=` calls (`git grep -n exactValue` names besides them only a message of `tests/IntLiteralValue.fss:35`). `Number` keeps its header and nothing else, in both files: `trait Number extends { AnyAdditiveGroup, AnyMultiplicativeRing } end`.
- Each type's own `asFloat` in its api (fork N6): `asFloat(self): RR64` in the traits `RR64`, `QQ`, `ZZ32`, `ZZ64`, `NN64` and `ZZ`, written `abstract` in `Library/FortressLibrary.fsi` and without a body in `.fss`, as `Number` declares it today; and in the objects `RR32`, `NN32` and `IntLiteral` of `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, at their components' headers (`FortressBuiltin.fss:241`, `:396`, `:504`; `IntLiteral`'s answers `Float`). Put each right before the type's own `=`: the parser refuses a method before a coercion or a getter ('Coercion declarations should come first.', 'Field/getter/setter declarations should come before method declarations.', probe 8). Without the api lines the phase that binds names, which both paths run, refuses the first library component that calls `asFloat`, 'Variable asFloat is not defined.' at `Library/String.fss:529` (probe 8): a functional method's name reaches a component only through an api that declares it. The traits' bodiless declarations in the component follow the export rule (P-158). The objects' bindings stay as they are (F-311).
- The pairs of `=` (fork N7). The apis declare 21 coercions between the nine types: `RR64` from `ZZ32`, `RR32` and `IntLiteral`; `QQ` from `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ` and `IntLiteral`; `NN64` from `NN32` and `IntLiteral`; `ZZ64` from `ZZ32`, `NN32` and `IntLiteral`; `ZZ` from `ZZ32`, `ZZ64`, `NN32`, `NN64` and `IntLiteral`; `ZZ32` and `NN32` from `IntLiteral`. For each, the wider type `T` declares `opr =(self, b:S):Boolean`, which converts `b` as the coercion does and compares at `T`, and the narrower type `S` declares `opr =(self, b:T):Boolean`, which converts `self`: 42 declarations, each with its api line. Put each beside its type's own `=`: `Library/FortressLibrary.fss:441` (`RR64`), `:597` (`QQ`), `:740` (`ZZ32`), `:831` (`ZZ64`), `:917` (`NN64`), `:1007` (`ZZ`); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:246` (`RR32`), `:400` (`NN32`), `:508` (`IntLiteral`); and in the apis `Library/FortressLibrary.fsi:327`, `:416`, `:495`, `:548`, `:607`, `:661`, `FortressBuiltin.fsi:70`, `:134`, `:188`. The planner's prototype (section 5, probe 11) wrote each body as `do c: T = b; (self = c) end` or `do c: T = self; (c = b) end`, and walk asks for the parentheses ('Equality testing expressions should be parenthesized.'); write the conversion as you find best, and name the form in your report. The library's precedent is `IntLiteral`'s exponent overloads, which convert by `b.asZZ32` (`Library/FortressLibrary.fss:804`).
- The comparisons that no pair carries: those of three tests, 10 lines, which the prototype's walk suite fails (section 5, probe 11; below). Write each with its conversion. The library's own comparisons need none: the prototype's suite fails nowhere else. Any other that you find, respell the same way and list.
- The vector norm (fork N8): its one declaration over `T extends { Number, MultiplicativeRing[\T\] }` (`Library/FortressLibrary.fss:2645`, `.fsi:1706`) replaced by eight, one for each number type, as `opr ||[\nat k\] me: Vector[\ZZ32,k\]||: RR64 = SQRT asFloat(squaredNorm(me))`, and at `RR64` `SQRT squaredNorm(me)`. `squaredNorm` stays as it is.
- The reflective generator, `genType` (`Library/ReflectiveQuickCheck.fss:25-45`): `Number` as a special case beside `Any` (`:30-32`), a fixed choice among the clause's five entries (fork N1). `genAnyType`'s branch `1 => genType(theType[\Number\]()).generate(c)` (`:49-58`) then works through it.
- Row 551's test: `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss` and `.test` retargeted to another closed trait of the library, `AnyIntegral` by default (fork N3): its comment, its object and its `load_exception_contains` key.
- The comment of `ProjectFortress/tests/ReflectiveNumberTypes.fss:7`, "The reflective generator finds a generator for every type that Number's comprises clause lists.", made true of the new generator.
- The specification (fork N4): `Specification/basic-lib/numbers.tex:47-49` says that each number type declares `asFloat`, with a `\revision` callout labelled by your new Appendix I entry, `\seclabel{revival-asfloat}`, after "The single-precision floating-point type" (`Specification/appendices/changes.tex:2659-2735`); the same clause of the entry "The number types" (`changes.tex:578`) corrected, which your entry names. The entry follows the skill's `specification.md`, "Changing the text: the revision form", with every item of the form's example: the Working Draft has no such sentence, so quote the revival's text as the original and say that the revival added it (`d9c415395`); the effect names the pairs of `=`, the fallback, and row 909, by which walk answers a mixed `=` that no pair carries; the decision is P-165; the Route C item is the same under route C. The front matter's paragraph changes only if your change makes it false.
- Not yours: rung F's sites (fork N5): `random`, `atan2` and `printThreadInfo` over `Number`, the `RR64` trait's `^` and `atan2` over `Number` (`Library/FortressLibrary.fss:485`, `:494`) and `Float`'s `^` at `Number` (`FortressBuiltin.fss:160`); `AnyIntegral`'s clause (P-44); walk's load check (F-318); `array1` and `array2`, which give a `Vector` only at the eight number types (row 721; F-229); FACTS, POSITIONS and the ledger, which the gather folds your `record.md` into (the manual, "Rung worker").

**Tests, first.**
- `ProjectFortress/tests/NumberOwnTypeNoAsFloatWalk.fss`: a program's `object Tally(n: ZZ32) extends Number end`, with no `asFloat` and no `=`, whose values compare by the fallback: a value equals itself, and `Tally(2) = Tally(2)`, two objects, and `Tally(2) = 2` are `false`. Seen refused at load on the base: 'Object Tally does not define an abstract method declared in type Number: … asFloat():RR64' (section 5, probe 12). Passing after. Use an `object`, not a `value object`: walk's `SEQV` calls two value objects equal when their body declares no field (row 113), so assert no value object's fallback answer.
- `ProjectFortress/tests/NumberEqualityOwnTypeWalk.fss`: two objects of the program below `Number`, each with its own `asFloat`; one declares its own `opr =(self, other:Cx):Boolean`, the other no `=`. Assert that the first compares by its own `=`, and that two distinct values of the second compare unequal and a value equal to itself. Seen failing on the base: the planner's run gave `Cx(1,2) = Cx(3,4): true` for an object with no `=`, through `Number`'s `=` and `exactValue`'s unlisted case (section 5, probe 4). Passing after.
- `ProjectFortress/tests/NumberMixedEqualityWalk.fss`: each of the 21 pairs at equal and at unequal values, in both orders; `NaN` against a `ZZ32`; and the written conversions where no pair carries the comparison, `asFloat(1/2) = 0.5`, `asFloat(widen(3)) = 3.0`, `asFloat(big(3)) = 3.5` denied. Under walk a numeral is a `ZZ32` (row 364), so take each `IntLiteral` case at the object `IntLiteral`, which converts as the zero, as `tests/IntLiteralValue.fss:20-35` does. A guard: passing on the base, where `Number`'s `=` answers each, and after. Assert no mixed `=` that no pair carries as if its answer were right (row 909).
- `ProjectFortress/tests/VectorNormElementTypesWalk.fss`: `||v||` at each of the eight element types, `5.0` for the elements 3 and 4 and `1.0` for the `QQ` elements `3/5` and `4/5`. A guard: passing on the base and after.
- `ProjectFortress/tests/NumberOwnTypeArrayWalk.fss`: a program's number type that extends `Number` and `AdditiveGroup` at itself, in a library array, through the scalar `+` and `-` between an array and a number, in both orders (`Library/FortressLibrary.fss:4954-4960`), each element asserted. A guard: walk runs it on the base too, since walk does not read the library's clause for a program's type (row 551). It shows P-160's purpose, and fails if walk's load check stops reading the pair. Make the array with a written static argument; `array1` at a program's type gives a plain array (row 721), which the scalar operators take.
- `ProjectFortress/tests/ReflectiveQuickCheckTest.fss`, the team's, unchanged, as the generator's guard: it passes on the base. With the clause removed and the generator not yet changed, see it fail: the planner's run gave rc 1 after 207 s, 'Stack overflow on MethodInvocation at …/Library/ReflectiveQuickCheck.fss:86.13', in `propCommutativeAddition` (section 5, probe 4). Then make the generator's change and see it pass.
- The retargeted `XXXComprisesLibraryTraitUnlistedExtender`: an expected failure on the base and after (walk loads the program; row 551).
- The comparisons respelled with a written conversion, each a point to report with its before and after, since no pair carries it (probe 11): `tests/testRR32.fss:67`, `:69`, `:70`, `:72`, `:74` and `:75`, a `ZZ64` bracket or `truncate` against an `RR32`, and `tests/expTest.fss:22` and `:24`, an `RR64` against `1/256`, both the team's tests; `tests/FlatTowerRungF.fss:75`, `1/2 = 0.5`, and `:76`, `deny(big(3) = 3.5)`, which assert `Number`'s `=` (F-131, row 434). Their messages and those that name `Number`'s `=` or `exactValue` (`tests/RR32SiblingRungV.fss:66-68`, `tests/IntLiteralValue.fss:35`) say what now answers.
- Keep their verdicts: the 47 tests that reach `Number`'s `=` at two run-time classes on the base (probe 10 names them), `extendNumber`, `ReflectiveNumberTypes`, `ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `ArrayElementAlgebra`, `LibraryOverloadFamilies`, `NativeHelperFamilyAsFloatWalk` and `BooleanOps`.
- After the change: your tests, the respelled tests and the guards above in one `harness-one.sh` call, the `.test` files beside their `.fss` (fork 2). The specification built once in your tree, as the skill's `specification.md`, "Building it", gives: both commands 'BUILD SUCCESSFUL', the warnings `grep` 0; then `git clean -fXq -- Specification`.

**The values you keep.** Every comparison that a coercion carries answers as today: the library's own numbers' `=` (`FlatTowerRungF`), `QQ`'s arithmetic, `simplestRationalBetween` and the comparisons at a numeral. The norm gives today's value at each element type. The generator gives values of the same five kinds. Every program that loads today loads after.

**The stages.** Run the count stage and the distance stage once each on your final tree, each in the background in the form of the skill's `session.md`, "Long commands": `explorations/coordinator/tools/checker-count/run.sh <out-file> <scratch>`, about 180 s, and `explorations/coordinator/tools/distance/run.sh <out-file> <scratch>`, about 250 s (F-240). Their before is 0 and 0 (fork 3). On your tree alone the count shows one site of rung F's, the `RR64` trait's `atan2` over `Number` (`Library/FortressLibrary.fss:494`), and the distance two, that and `Float`'s `^` at `Number` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:160`): 'Could not check call to function asFloat' at each (section 5, probe 9). Rung F rewrites both, and N lands only with F (fork 1). Any other site is yours, a point to report. The pairs of `=` and the eight norms are new overloads that both stages read.

**Rows.**
- Row 596: its `Number` half closes; your `record.md` gives the row's whole new line, its claim narrowed to the five team tests and demos below `Exception`. Read the row with `ledger.py show 596` first.
- Row 551: its reproducer stays the retargeted test; your `record.md` gives its whole new line, where its notes say "Row 22's `object Value extends Number` loads".
- Row 434: `Number`'s `=` goes, and with it the row's claim; the gather closes it with your commit, its test `NumberMixedEqualityWalk`.
- Row 909: walk's `SEQV` calls numbers of different types equal by value; so under walk a mixed `=` that no pair carries, as a `ZZ64` against an `RR64`, answers by it (probe 8). No change; cite it.
- Row 440: no change. No `=` of the library reaches it at a program's type.

**Specification.** Yours, above. List every other sentence made false: F-131's "`Number`'s `=` compares a float with an exact number after `asFloat`"; F-151's "`Number` stays in the bound because its `comprises` clause lists every type below it, so an element type excludes `String`" and its "`Number` also declares the `asFloat` that the vector norm calls"; F-311's "as `Number`'s abstract `asFloat` declares"; F-318's "with `Number`'s `comprises` clause removed in a scratch copy"; row 596's claim; row 551's notes; row 434. P-160's "The clause stayed until the first step landed" stays true.

**Files.**
- `Library/FortressLibrary.fss`: `Number` (`:380-396`) and `exactValue` (`:398-408`); `asFloat` and the pairs of `=` in the six traits, beside each own `=`; the norm (`:2645`), only.
- `Library/FortressLibrary.fsi`: `Number` (`:288-296`); the same api lines; the norm (`:1706`), only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`: the pairs of `=` in `RR32`, `NN32` and `IntLiteral`, beside each own `=`; their `asFloat` api lines, only.
- `Library/ReflectiveQuickCheck.fss`: `genType`, only.
- `Specification/basic-lib/numbers.tex`: the sentence and your callout, only. `Specification/appendices/changes.tex`: your entry and the clause at `:578`, only.
- `ProjectFortress/tests/`: your tests, the retargeted `XXXComprisesLibraryTraitUnlistedExtender.fss` and `.test`, the comment of `ReflectiveNumberTypes.fss:7`, and the lines and messages of the five tests above.
- Not: walk, the checker, `nativeHelpers/`, the tools; rung F's sites; `tests/extendNumber.fss` and `tests/ReflectiveQuickCheckTest.fss`, the team's.

**Reserved points.** A line of a team test beyond the eight of `testRR32` and `expTest` above; a program that loads today and is refused after; a model line. Report any, with its evidence.

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with rungs I, F and W, each at other declarations: your pairs stand beside the integer types' own `=`, 30 to 62 lines above rung I's shifts and powers (`:740` against `:796`, `.fsi:495` against `:525`); `RR64`'s beside `:441`, 44 lines above rung F's `:485`; your norm (`:2645`, `.fsi:1706`) far from both. `FortressBuiltin.fss` and `.fsi` with rungs I, F, C and W, at other declarations: `RR32`'s `=` at `:246` against rung F's `:328-329`, `NN32`'s at `:400` against rung I's `:456`. `changes.tex` with rung C's entry, which goes before `:4637`, about 1,900 lines from yours (section 4, "The rule the rungs keep").

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

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with rungs N (`:380-408`, beside each type's own `=` from `:441` to `:1007` and `.fsi:327` to `:661`, and `:2645`), F (`:485`, `:494`, `:4537`, `:4633`) and W (beside `IOFailure`); `FortressBuiltin.fss` and `.fsi` with rungs F (`:154-189`, `:328-329`), N (beside `:246`, `:400`, `:508` and `.fsi:70`, `:134`, `:188`), C (`:615`) and W (at the component's end). Each at other declarations. No other rung edits your five helper classes.

### F. The floats' four over `Number` and `AnyIntegral` without `Number`'s `asFloat`, and group 3's six, onto helpers (P-162)

**The mission.** As for rung I (`map/compile-path-walkthrough.md`, section 7): both paths call one static helper by P-58. Four of these bindings take a `Number` or an `AnyIntegral`, which no Java type carries. Six take carried types, but no helper computes what their glue computes. The first four become declarations at `RR64`, or convert in Fortress by each type's own `asFloat`, around bare bindings; the six get one-line helpers.

**The decisions this rung builds.**
- P-162: the declarations over `AnyIntegral` or `Number` convert around public bare bindings at the narrow headers that the prelude declares; the six over carried types get one-line helpers; `Object`'s `asString` and `ilkName` and `SEQV` over `Any` stay on glue. The review's way, (e), its groups 1 to 3. Review-queue item 363, `FlatString`'s `=` and `flatConcat(self, b: Char)`, is answered by P-162.
- P-165: `asFloat` leaves `Number`, which rung N strikes, so no declaration converts a `Number` by `asFloat`. `Float`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`, and coercion carries a `ZZ32`, an `RR32` or a numeral to them (P-74); a `QQ`, `ZZ64`, `NN32`, `NN64` or `ZZ` caller writes `asFloat(x)`. The `RR64` trait's `^` and `atan2` over `Number` narrow to `RR64` with them.
- P-58: the binding's form. F-299: the loader carries `FlatString`'s `self` in a Java `String` and a `Char` in an `int`.
- This record's section 3, forks 1 to 7, F1 to F5 (17 to 21) and F6 (35), give the defaults you build.

**What you build.**
- The tests first (below).
- Group 1's `Float` power (fork F1): `opr ^(self, b:AnyIntegral):RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162-163`) beside a public bare `opr ^(self, b:ZZ32):RR64` on a new helper. The declaration over `AnyIntegral` converts its exponent by a `typecase` over `AnyIntegral`'s five types, each by its own `asFloat`, and calls `Float`'s `^` at `RR64` (`:158`); a `ZZ32` exponent reaches the bare binding.
- Group 2:
  - `random(a:Number):RR64` (`Library/FortressLibrary.fss:4537`) becomes `random(a:RR64):RR64`, a public bare binding on a new helper (fork F2); its api line (`Library/FortressLibrary.fsi:2573`) changes to match. No `random` over `Number` stays.
  - `Float`'s `atan2(self,x:Number):RR64` (`FortressBuiltin.fss:176-177`) becomes `atan2(self, x:RR64):RR64` on `simpleDoubleArith.doubleATan2`. `Float`'s members are not in its api.
  - `printThreadInfo(a:Number):()` (`Library/FortressLibrary.fss:4633`) becomes `printThreadInfo(a:RR64):() = printThreadInfo(a.asString)`, with no native (fork F5); its api line (`.fsi:2635`) changes to match.
- The declarations over `Number` beside them (fork F6): the `RR64` trait's `atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))` (`Library/FortressLibrary.fss:494`, `.fsi:375`) becomes `atan2(self, x:RR64):RR64`, which converts `self` only; its `opr ^(self, b:Number):RR64 = (asFloat(self))^b` (`:485`, `.fsi:367`) becomes `opr ^(self, b:RR64):RR64` with the same body; `Float`'s `opr ^(self, b:Number):RR64 = self^(asFloat(b))` (`FortressBuiltin.fss:160`) goes, since `Float`'s `^` at `RR64` (`:158`) is its bare binding. The `RR64` trait's `^` at `AnyIntegral` (`:487`) stays.
- Group 3, each on a new one-line helper that computes as its glue does:
  - `Float`'s `opr ^(self, b:RR32):RR64` (`FortressBuiltin.fss:156-157`) and `RR32`'s `opr ^(self, b:Float):RR64` (`:328-329`), both `Float$Pow` today;
  - `Float`'s floor and ceiling brackets, `opr |\self/| : ZZ64` (`:184-185`) and `opr |/self\| : ZZ64` (`:188-189`), `Float$IFloor` and `Float$ICeiling`, which saturate at `Long.MAX_VALUE` and give 0 at a NaN;
  - `FlatString`'s `opr =(self, other: FlatString): Boolean` (`Library/FlatString.fss:70-71`), `FlatString$Eq`;
  - `FlatString`'s `flatConcat(self, b:Char):String` (`:96-97`), `FlatString$Concat`, which reads the `Char` as its text (fork F4).
- Where each helper goes: fork F3.
- Callers: the planner's grep found none that a declaration at `RR64` refuses (forks F2 and F6). Each that you find, in the library, the tests or the demos, write with its conversion and list.
- Not yours: `Number`, its `asFloat` and `=`, each type's own `asFloat` and the vector norm (rung N); `Object`'s `asString` and `ilkName` and `SEQV` over `Any` (P-162); `RR32`'s `opr ^(self, b:AnyIntegral)` (`FortressBuiltin.fss:330`), already Fortress, which reaches your pair through `asFloat(self)` at `RR32`; the integers' shifts and powers (rung I).

**Tests, first.**
- `ProjectFortress/tests/NativeHelperRationalArgumentWalk.fss`: the conversions written at a rational, `third: QQ = 1/3`: `random(asFloat(third))` in range, `atan2(one, asFloat(third))` with `one = 0.5 + 0.5` a `Float`, at `1.2490457723982544`, `one^(asFloat(third))` at `Math.pow`'s value, and `printThreadInfo(asFloat(third))` and `printThreadInfo(3)` run. A guard: passing on the base and after. On the base `random(third)` ends the run with 'getFloat not implemented for FOrdinaryObject', an `InterpreterBug` (the review, section 2.2, point 12); after, no `random` takes a `QQ`, so the test writes the conversion. Walk's harness checks no printed text but 'fail', so quote `printThreadInfo`'s lines on the base and after in your report: ' Thread ForkJoinPool-1-worker-1 operating on value Ratio' today at the rational, and at the numeral 3 today's '3' against the float's text after.
- `ProjectFortress/tests/NativeHelperFloatMixedWalk.fss`: the other values, each asserted at today's glue answer (the review, section 2.2, point 11, and section 2.3, point 15): `2.0^RR32 0.5` 1.4142135623730951; `RR32 3.0^Float 2.0` 9.0; the brackets at 2.5 and -2.5 (2, 3, -3, -2), at `10.0^300` (9223372036854775807) and at a NaN (0 and 0); `FlatString`'s `=` at flat strings and at a rope flattened; `flatConcat` at a `Char` below U+FFFF, and past it asserted at today's answer with a message that names row 872, as `CharAsStringSupplementaryWalk` pins `asString`, not as the right value; `Float`'s power at a `ZZ32`, a `ZZ64`, an `NN32`, an `NN64` at 2^63 and above and a `ZZ` past 2^64 exponent, and at an `RR64` and an `RR32` one; `atan2` at a `ZZ32`, an `RR32`, a numeral and an `RR64` `x`; `random` at a `ZZ32`, an `RR64`, 0 and -1 in range. A guard: passing on the base and after.
- `ProjectFortress/compiler_tests/NativeHelperFamilyFloatMixedCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): each new helper bound in the program's own declarations at the Java types that the compile reads, `FlatString`'s over `JavaString` and a `Char` in a `ZZ32`, as `compiler_tests/NativeHelperFamilyCharCompiled.fss` binds them; each value asserted as the walk tests assert it. Seen failing on the base through `junit.sh`, and passing after.
- Keep their verdicts: walk's `NativeHelperFamilyFloatWalk`, `NativeHelperFamilyRR32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk` and `realArith` (`atan2`'s one caller), the library's string tests, the compiler track's `NativeHelperFamilyFloatCompiled` and `NativeHelperFamilyRR32Compiled`.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2).

**The values you keep.** Every value of the review's sections 2.2 and 2.3 at a number type that a coercion carries into `RR64`, at a written conversion, and at a flat string. microGPT's power calls, at an `RR64` base and a `ZZ32` exponent, reach your bare binding: their values must equal `Math.pow`'s at the exponent read as a `double`, as the glue computes. The commit stage's quick check of the model is the batch's check of it (P-30).

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3). `FlatString` is one of the distance's fourteen components. List for your skeptic each binding with its helper's Java signature. Your tree keeps `Number`'s `asFloat`, so your stages show 0 and 0; on rung N's tree the checker refuses `:494` and `FortressBuiltin.fss:160`, which you rewrite (section 5, probe 9).

**Rows.** None by plan: the three cases at a rational have no row (the review, section 2.2, point 12); after your change none of the three takes a `QQ`. Row 872: one short note through your `record.md` (fork F4). A defect that you meet and do not repair gets its row through your `record.md`.

**Specification.** None of yours. List every sentence made false: Appendix I's entry "A native binding that names a static helper", its list and its "The other 143 still name a glue class" (fork 7); F-32's 143 and F-299's 306 of 449; F-299's "the native over `String`" where it names `printThreadInfo`; PLAN's natives line on the floats' rung and on item 363.

**Files.**
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: `Float`'s `^` at `RR32`, at `Number` and at `AnyIntegral`, its new bare power, its `atan2` and its two brackets (`:154-189`), and `RR32`'s `^` at `Float` (`:328-329`), only.
- `Library/FortressLibrary.fss` and `.fsi`: the `RR64` trait's `^` and `atan2` over `Number` (`:485`, `:494`; `.fsi:367`, `:375`), `random` and `printThreadInfo` over `Number` with their api lines (`.fsi:2573`, `:2635`), only.
- `Library/FlatString.fss`: `=` and `flatConcat(self, b:Char)`, only.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/`: `simpleDoubleArith.java`, `simpleFloatArith.java`, `stringOps.java` right after `compareTo`, `simpleConcatenate.java` right after `nativeConcatenate`, and `random`'s class: your new helpers, only.
- `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`: your tests.
- Not: `interpreter/glue/prim/`, whose glue classes stay; walk's loader; the checker and the compiler; `Specification/`; the tools; `compiler_tests/NativeHelperFamilyStringCompiled.fss`, rung S's; rung N's declarations.

**Reserved points.** A model value that moves; a caller that you must respell beyond those that you list. Report either, with its evidence.

**Overlaps by file.** `FortressBuiltin.fss` with rungs I (`NN32`, `:456-463`), N (`RR32`'s `=` at `:246`, `NN32`'s at `:400`, `IntLiteral`'s at `:508`), C (`:615`) and W (at the component's end); `FortressLibrary.fss` and `.fsi` with N, I and W: your `RR64` lines at `:485` and `:494` stand 44 to 53 lines below N's `RR64` `=` (`:441`) and above N's `QQ` `=` (`:597`); `stringOps.java` with rung S, which adds after `lineSeparator` (`:72-74`), another place in the class. Each at other declarations.

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

**Overlaps by file.** `FortressBuiltin.fss` with rungs I, F, N and W, at other declarations; `changes.tex` with rung N's entry, after `:2735`, and the gather's corrections, in other entries. No other rung edits the parser, `simpleChar.java` or the two `Char` guards.

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

**Overlaps by file.** `FortressLibrary.fss` and `.fsi` with rungs N, I and F, at other declarations; `FortressBuiltin.fss` with rungs I, F, N and C, at other declarations, yours at the component's end. No other rung edits walk's loader, `NamingCzar`, `fileOps`, `Writer` or `File`.

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

### A. The carrier of `Any`: `ilkName` and `SEQV` on the compiled path's helpers, which walk's loader answers with its own operations, `Object`'s `asString` over `ilkName`, and the ilk as the trait's name (P-167)

**The mission.** The territory map gives the two ways in which Java code is bound: walk's `builtinPrimitive` and the compiled path's `import java` (`map/compile-path-walkthrough.md`, section 7). Three bindings of the one library take a value of any type: `Object`'s getters `ilkName` and `asString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:38-41`) and `opr SEQV(a:Any, b:Any)` (`Library/FortressLibrary.fss:4650-4651`). They name glue classes, which the compiled path cannot call (F-32), and walk's loader has no Java type that carries `Any` (F-299). This rung makes the library's text name the compiled path's helpers, in P-58's form, and lets walk answer the two names with its own operations, as a virtual machine runs its own code for an intrinsic.

**The decisions this rung builds.**
- P-167: `ilkName` names `stringOps.typeName` and `SEQV` names `equality.sEquiv`, each a bare `builtinPrimitive("…")`; walk's loader (`interpreter/glue/NativeApp.java`, where it reads the string, `:195`) holds a table of the two names and answers each with walk's own operation, before it looks for a helper; for these two names P-58's walk half, that walk loads the named helper, bends; `Object`'s `asString` becomes `self.ilkName`, P-91's rule as text; the ilk is the trait's name on both paths, `ZZ32` and never walk's `Int`; the rung works out the way. What `SEQV` answers is P-168, rung E's, not yours.
- P-91: an object with no `asString` of its own prints its bare type name on both paths. P-58 and F-298: the binding's form, and the compiled rewrite, which checks each string against its helper's Java signature.
- Review-queue item 372's default: the ilk is the trait's name, and the way is the rung's. Row 321: on the compiled path an object with a zero-argument `toString` member overflows the stack when it is printed, and the one library's `Object` declares one (`FortressBuiltin.fss:51`). Row 364: walk takes a generic's inferred static argument from the run-time class.
- This record's section 3, forks 1 to 8 and A1 to A5 (36 to 40), give the defaults you build.

**What you build.**
- The tests first (below).
- `FortressBuiltin.fss:38-39`: `ilkName`'s string names `com.sun.fortress.nativeHelpers.stringOps.typeName`. `:40-41`: `getter asString(): String = self.ilkName`, with no native. The api (`FortressBuiltin.fsi:33-34`) stays.
- `FortressLibrary.fss:4650-4651`: `SEQV`'s string names `com.sun.fortress.nativeHelpers.equality.sEquiv`. Its api line (`.fsi:2645`) stays.
- `NativeApp.java`: a table of the two names, each to the glue class that answers it today, `com.sun.fortress.interpreter.glue.prim.ObjectPrims$ClassName` and `…AnyPrim$SEquiv`, read after the string at `:195` and before `StaticNativeApp.isHelperString` (`:200`). The review's prototype C took eight lines for three names (`reviews/any-carrier-2026-11-06.md`, section 6, (c), point 11), the planner's seven for two (section 5, probe 15). The glue classes stay, walk's operations.
- Walk's ilk (fork A1): `ObjectPrims$ClassName` (`interpreter/glue/prim/ObjectPrims.java:37-41`), which answers `o.type().toString()` today, renders the type with each of the library's five native number objects named by the trait that it extends, `Int` as `ZZ32`, `Long` as `ZZ64`, `BigNum` as `ZZ`, `Float` as `RR64` and `UnsignedLong` as `NN64`, at the top level and inside a generic's static arguments (a `GenericTypeInstance`'s, as `FTraitOrObject.toString` renders them, `interpreter/evaluator/types/FTraitOrObject.java:184-192`). Tell the five by the component that declares them, `FortressBuiltin`, so that a program's own type named `Int` keeps its name. Every other type keeps its text (fork A2).
- `match` over `String` (fork A6): `match(regex:String, some:String):Boolean` beside the native at `Library/FortressLibrary.fss:4615`, flattening both arguments by `typecase` on `asFlatString`, never by a direct call of `asFlatString`, as `printlnWithThread(a:String)` does (`:4640-4644`), with its api line beside `Library/FortressLibrary.fsi:2576`.
- The revival tests that assert walk's names through `ilkName`: `ProjectFortress/tests/ArrayElementAlgebra.fss`, 8 lines (`:17`, `:19`, `:20`, `:35`, `:41` to `:44`), and `ProjectFortress/tests/FlatTowerRungF.fss`, 40 lines from `:42` to `:190` (probe 15 lists them), each respelled at the trait's name, as `"32 : ZZ32"` for `"32 : Int"`, with the value it checks kept.
- Not yours: what `SEQV` answers, walk's value classes and `equality.sEquiv`'s body (rung E); `stringOps.typeName`'s body; the five objects' declarations, which stay public (fork A3); the prelude's `Object` (P-37); `asDebugString` and `asExprString`, which stay Fortress over `ilkName` and `asString`.

**Tests, first.**
- `ProjectFortress/tests/AnyNativesIntrinsicWalk.fss`: through the library, `Pt(1,2).ilkName` and `.asString` give `"Pt"`; `Box[\ZZ32\](3)` and `Box(i)`, `i: ZZ32`, give `"Box[\ZZ32\]"`; a `ZZ32`, a `ZZ64`, a `ZZ`, a computed `RR64` and an `NN64` give `"ZZ32"`, `"ZZ64"`, `"ZZ"`, `"RR64"` and `"NN64"`; `i.asDebugString` gives `"a ZZ32: 3"`; and `SEQV` only where today's answer and P-168's agree (fork A5): `p SEQV p` true, `p SEQV q` false for two `Pt(1,2)`, a `Pt` against a `ZZ32` false; and `match("a+", rope)` true for a rope of 40 `a`s built by `||` past `maxLeafSize` (fork A6). Seen failing on the base, where a `ZZ32`'s ilk is `"Int"` (probe 14) and `match` refuses a rope at the call. Passing after.
- `ProjectFortress/compiler_tests/AnyNativesIntrinsicCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): `stringOps.typeName` and `equality.sEquiv` bound at `Any` in the program's own declarations, as `compiler_tests/NativeHelperBindingCompiled.fss:8-13` binds them; the same ilk texts at the types that both paths name alike, `Pt`, `Box[\ZZ32\]`, `ZZ32`, `ZZ64` and a computed `RR64` (probe 16); the same three `SEQV` answers; and a trait whose `getter asString` is over the bound `typeName`, beside `getter toString(): String = self.asString`, printed with no stack overflow (the review's `AcRow321`, section 6, (e), reference 19); and `stringOps.match` bound at `JavaString` in the program's own declarations, as `compiler_tests/NativeHelperFamilyStringCompiled.fss:15` binds it, asserted `true` at `"a+"` and the 40 `a`s, the text that the walk test's rope flattens to. A guard: passing on the base and after. With the walk test it holds the two paths together (P-167). Pass no tuple to the bound `typeName` inside a juxtaposition (probe 20).
- The 48 respelled lines: seen failing on the base, passing after.
- Keep their verdicts: `NativeHelperBindingCompiled`, `DefaultRenderRungS`, `XXXFortToStringRungS` (row 321, the prelude's, which stays an expected failure; fork A4), `XXXInferredStaticArgRungS` (row 364's string case, unchanged), `sequivTest`, `BooleanOps`, `ExtendsAnyIsObjectWalk`.
- After the change: `ant testSystem` once; your compiled guard through `junit.sh` (fork A5).

**The values you keep.** Every `SEQV` answer: the planner's prototype printed the base's lines (probe 15). Every printed text of a value whose type is none of the five and holds none in its static arguments. The model calls none of the three (`reviews/any-carrier-2026-11-06.md`, section 5).

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3). The count reads `SEQV`'s binding against `equality.sEquiv`, the distance `Object`'s against `stringOps.typeName`; the planner's prototype gave 0 and 0 (probe 15).

**Rows.**
- Row 321: your `record.md` gives its whole new line, narrowed: the one library's `Object` no longer reaches the overflow, by your compiled guard; the prelude's `asString` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`) does until the switch-over (fork A4). Read it with `ledger.py show 321` first.
- Row 364: your `record.md` gives its whole new line: walk prints `Cell[\ZZ32\]` for `Cell(3)`, and still instantiates at the run-time class, so a `Cell[\Int\]` dispatches past `Cell[\ZZ32\]` (F-74).
- Row 363: no change.
- Row 916, `match` over `FlatString` with no overload over `String`: the gather closes it with your commit, its test `AnyNativesIntrinsicWalk`, and a note naming what settled its repair, the coordinator's rider of 2026-11-07 under the curator's rule of a batch's scope (fork A6): `ledger.py close 916 --commit HASH --test AnyNativesIntrinsicWalk --note TEXT`. The row is `NEGATIVE-VERIFIED`, and the tool takes `--settled` only for a `CONTESTED` row ('--settled is for a CONTESTED row', `explorations/coordinator/tools/ledger.py:989-990`), so the note carries it.

**Specification.** None of yours. List every sentence made false: Appendix I's entry "A native binding that names a static helper", its "that the interpreter loads a helper beside its glue classes" (`Specification/appendices/changes.tex:4444-4446`) for your two names and its count (`:4495`), which the gather corrects (fork 7); F-32's 143, down three, and F-299's 306, up two, and its "Walk loads a `builtinPrimitive` string that names a static helper"; F-57's "which it prints `Int`, `Long` and `BigNum`"; review-queue item 372; PLAN's natives line on the carrier of `Any`; the `fortress-repo` skill's text on walk's printed numeral classes, if any.

**Files.**
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: `Object`'s `ilkName` and `asString` (`:38-41`), only.
- `Library/FortressLibrary.fss`: `SEQV`'s string (`:4650-4651`) and `match` over `String` beside `:4615`, only. `Library/FortressLibrary.fsi`: `match`'s api line beside `:2576`, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`: the table, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java`: `ClassName`'s rendering, only.
- `ProjectFortress/tests/ArrayElementAlgebra.fss` and `ProjectFortress/tests/FlatTowerRungF.fss`: the 48 lines, only.
- `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`: your tests.
- Not: `nativeHelpers/`; `StaticNativeApp.java`, rung W's; the walk value classes, rung E's; the checker and the compiler; the prelude; `Specification/`; the tools.

**Reserved points.** A printed line of the model that changes; a step that edits a helper's body. Report either, with its evidence.

**Overlaps by file.** `FortressBuiltin.fss` with rungs N, I, F, C, W and E, at other declarations: `Object` heads the component (`:37-52`), 100 lines above F's `:154`. `FortressLibrary.fss` and `.fsi` with rungs N, I, F, W and E: your `:4650-4651` stands 17 lines below F's `printThreadInfo` (`:4633`), and your `match` beside `:4615` 18 lines above it; your api line beside `.fsi:2576` stands three lines below F's `random` (`.fsi:2573`), with two unchanged lines between. `tests/FlatTowerRungF.fss` with rung N, whose `:75` and `:76` stand between your `:72` and `:98`, two unchanged lines below your `:72` (`:73`, `:74`) and 21 above your `:98`; the gather's `--3way` merges the two hunks, as climb batch 25's rungs R and N merged at `FortressLibrary.fss:782` (`climb-batch-25-review.md`, section 3, "The patches and the samples"). No other rung edits `NativeApp.java` or `ObjectPrims.java` (section 4, "The rule the rungs keep").

### E. What `SEQV` means on both paths: the specification's rule in walk's value classes and the compiled helper, the `value` modifier read on both, `Ratio` and the literals value objects, and the specification's list (P-168, P-166)

**The mission.** The specification defines strict equivalence once, for every value, and forbids a program to override it (`Specification/basic/objects.tex`, "Object Equivalence"). Today walk and the compiled path answer it differently, and each departs from the rule: walk calls numbers of different types equivalent and every two value objects without body fields, and the compiled helper compares every value but one object by reference (`reviews/any-carrier-2026-11-06.md`, section 2.4, point 12). This rung brings both paths to the rule.

**The decisions this rung builds.**
- P-168: the specification's rule on both paths, with no special case for any type: values of different types are never strictly equivalent; two value objects of one type are when their fields are, tuples element by element and floats by their bit patterns; two reference objects only when they are one object; both paths read the `value` modifier. Walk drops its equivalence across types (row 909) and its `true` for value objects whose body declares no field (row 113); `equality.sEquiv` gains the rule for value objects, tuples and floats (rows 906 to 908). Strings are reference objects, so two strings are equivalent only when they are one object; their text equality is their `=`. The first test is a program with a `value object CC64`, on both paths, beside the review's 14 cases.
- P-166: `ZZ`'s and `QQ`'s values are value objects; `Ratio` becomes a `value object` (row 911); the specification's list in `objects.tex` changes in the revision form, with one Appendix I entry. P-96 and P-95: the revision form, with the original kept.
- P-167: after rung A, the library's `SEQV` names `equality.sEquiv`, which walk answers with `AnyPrim$SEquiv` and so with your value classes; you change the helper's body, A only names it. On your tree `SEQV` keeps its glue string, and walk answers through the same classes.
- P-38: the prelude's text stays: its `===` family (`Library/CompilerLibrary.fss:62-69`) answers numbers, strings and booleans by `=` until the switch-over, before the helper. Row 910: the numeral objects declared plain. Row 807: the fallback `=` and the three-argument `assert` reach `SEQV`.
- This record's section 3, forks 1 to 8 and E1 to E9 (41 to 49), give the defaults you build.

**What you build.**
- The tests first (below).
- Walk's value classes, under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/`: each `seqv` compares a value only with one of its own class (fork E1), by value in `FInt.java:53-62`, `FLong.java:54-63`, `FBigNum.java:60-65`, `FIntLiteral.java:78-83`, `FNN32.java:55-64` and `FNN64.java:57-63`, and by its bits in `FFloat.java:42-51`, `FFloatLiteral.java:43-54` and `FRR32.java:45-54`; their branches across classes go (row 909). `FString.java:35-38` answers `false`: `AnyPrim.sequiv` tests identity first (`interpreter/glue/prim/AnyPrim.java:23-26`). The planner's prototype took 37 lines out and put 12 in, over these and the two below (section 5, probe 18).
- `interpreter/evaluator/types/FTypeObject.java:46-69`: the value parameters join `fields` once, after the loop over the members, not inside its `VarDecl` branch (`:55-64`), which adds them only when the body declares a field, and once for each such field (row 113).
- `FOrdinaryObject.java:46-57`: the field recursion (`:54`) calls `AnyPrim.sequiv`, identity first, as `FTupleLike.java:78` does, so that a value object whose field holds a reference object is equivalent to one with the same object (probe 18, `VBox(p) SEQV VBox(p)`). `FTupleLike.java:71-81` stays: it compares element by element.
- The code generator (fork E2): the class that `forObjectDeclPrePass` writes for an object declared `value` gets a mark, an empty interface of the run time under `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/`, in the interfaces passed to `cw.visit` (`compiler/codegen/CodeGen.java:4522-4523`), in a copy of the array. Leave `superInterfaces` (`:4408-4409`) as it is: the springboard (`:4416-4417`) and `dumpMethodChaining` (`:915`, rung T's, whose `:924` tests the array's length) read it.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/equality.java:14-19`: `sEquiv` by the rule (fork E3): one object is equivalent to itself; two values of different Java classes are not, but two tuples compare by arity and element by element; two of the run time's boxes of one class by value, and the floats' boxes by their bits; two marked objects of one class field by field, each by `sEquiv`; every other value, strings among them, by identity. Keep every method of the class, a private one too, at Java types that map to Fortress: the prelude imports the class (`Library/CompilerLibrary.fss:19`), so the wrapper generator reads all of it in every compiled program, and on the merged tree rung A's binding makes the count stage read it whole (F-321; the skill's `compiler.md`, "Natives"). Put reflection over fields in another class if its types do not map.
- The library (fork E4): `Library/FortressLibrary.fss:664`, `value object Ratio(num: ZZ, den: ZZ)` (P-166; `Ratio` is not in the api); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:196` and `:486`, with `FortressBuiltin.fsi:44` and `:179`, `value object FloatLiteral` and `value object IntLiteral` (row 910).
- The team's `ProjectFortress/tests/sequivTest.fss`: the eight lines whose 2008 answers P-168 overrules, each from `equiv` to `nequiv` (fork E1; probe 18): `:49`, `:50`, `:51`, `:58`, `:59`, `:66`, `:94` and `:113`. Every other line keeps its answer.
- `ProjectFortress/tests/TransposedMatrixAndFreeze.fss:19`, a revival test whose 4-tuple holds strings: respelled into assertions that keep each value checked (fork E7).
- The specification (forks E5 and 7): `Specification/basic/objects.tex:39-54`, the lists: arbitrary-precision numbers named among the value objects (P-166), strings among the reference objects, with one `\revision` callout labelled by your new entry, `\seclabel{revival-object-kinds}`, in `Specification/appendices/changes.tex` before "When two sizes are the same" (`:3935`). The entry follows the skill's `specification.md`, "Changing the text: the revision form": the original quoted from `Specification-1.0-frozen/basic/objects.tex`; the effect names each departure: a walk float numeral bound to `RR64` is a `FloatLiteral` (fork E1), the prelude's `===` family until the switch-over with row 908, a numeral a `ZZ32` under walk and an `IntLiteral` to the checker (F-57), and `NEW-E-1`; the decisions P-166 and P-168; the same under route C. Grep the chapter's `\note{}` boxes (`:15` among them) and list each one that your change makes false.
- Not yours: walk's loader, `ObjectPrims.java` and the strings of `SEQV` and `Object` (rung A); `compiler_regressions/seqv.fss` (fork E8); the prelude (P-37, P-38); `value trait` on the number traits (fork E6); a tuple `=` beyond triples (fork E7); `Number` and its `=` (rung N).

**Tests, first.**
- `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`: the review's 14 cases (section 2.4, point 12) at the rule's answers, strings as reference objects, each value bound at a declared type, as probe 18 printed them: two `ZZ32` 3s true; `ZZ32` 3 against `ZZ64` 3, against `RR64` 3.0 and against `NN32` 3 false; two `ZZ` 3s built apart true; `0.0` against `-0.0` false; a NaN with itself true; two `(1,2)` true; `(1,2)` against `(1,2.0)` false; two flat strings of one text built apart false, and two equal ropes false; two `Pt(1,2)` false and a `Pt` with itself true; `VPlain(1,2)` against `VPlain(1,3)` false; two equal lambdas false. With them: `1/2 SEQV 2/4` true (fork E4); a `FloatLiteral` numeral bound to `RR64` against a computed `RR64` of the same bits false (fork E1); `VBox(p) SEQV VBox(p)` true and `VBox(p) SEQV VBox(Pt(1,2))` false; `Just(1) SEQV Just(2)` false and `Just(1) SEQV Just(1)` true; `char(66560) SEQV char(1024)` false. Seen failing on the base (probe 17). Passing after.
- `ProjectFortress/tests/ValueObjectCC64Walk.fss`: the curator's first stress test (PLAN, phase 4): `value object CC64(re: RR64, im: RR64)`, with no `=` of its own: `CC64(1,2) = CC64(1,2)` true and `CC64(1,2) = CC64(1,3)` false, the same by `SEQV`, `=/=` and the three-argument `assert`; and `object RC64` with the same fields and no `value`: two `RC64(1,2)` not equal, one equal to itself. Seen failing on the base, where `CC64(1,2) = CC64(1,3)` is true (row 113; probe 17). Passing after.
- `ProjectFortress/compiler_tests/StrictEquivalenceRuleCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): `equality.sEquiv` bound at `Any` in the program's own declarations (fork E9), every value bound at a declared type: two `ZZ32` 3s true; `ZZ32` against `ZZ64` and against `RR64` false; `0.0` against `-0.0` false; a NaN with itself true; two `(1,2)` true; two strings built apart false; two `Pt(1,2)` false and a `Pt` with itself true; `VPlain(1,2)` against `VPlain(1,3)` false and against `VPlain(1,2)` true; `CC64(1.0, 2.0)` against an equal one true and against `CC64(1.0, 3.0)` false; two `RC64(1.0, 2.0)` false. Seen failing on the base through `junit.sh`, where two `ZZ32` 3s, two tuples and two equal `CC64`s are false (probe 16). Passing after.
- The eight lines of `sequivTest.fss`: seen failing on the base, passing after. `TransposedMatrixAndFreeze.fss:19` respelled: passing on the base and after.
- Keep their verdicts: `NativeHelperBindingCompiled`, whose `sEquiv` at a trait's `self` compares two reference objects; the other-compiler track's `EqualityTest1`, `EqualityTest5`, `MaybeTest7` and `MaybeTest8`, whose `SEQV` reaches the helper through the prelude's `===` at `Any` over singletons and reference objects, and the compiler track's `Compiled17ee` (`:22`, `self SEQV other` on its own `Equality`, over singletons) and `RecursiveApiTest3c` (`:28`, `a === b` on the reference object `Foo`), which the helper's identity keeps; walk's `BooleanOps`, `ExtendsAnyIsObjectWalk`, `ResultBoundsRungB`, `SeededRandomGenAbstractMethods`, `AnyGenPerturbOtherType`, `RationalTest` and `CharAsStringSupplementaryWalk`. Assert no `SEQV` answer through `ilkName`'s text, which rung A changes.
- After the change: `ant testSystem` and `ant testQuick` once each; your compiled guard through `junit.sh` (fork 2). The specification built once in your tree, as the skill's `specification.md`, "Building it", gives: both commands 'BUILD SUCCESSFUL', the warnings `grep` 0; then `git clean -fXq -- Specification`.

**The values you keep.** Every `=` of a type that declares its own; strings' `=` by their text; the `=` of pairs and triples; every answer of probe 17 that the rule keeps. On the planner's prototype the walk suite failed only at `sequivTest` and `TransposedMatrixAndFreeze` (probe 18). The model calls none of the three natives (`reviews/any-carrier-2026-11-06.md`, section 5).

**The stages.** Both, once each on your final tree, as rung N's section gives the commands (fork 3): the count reads `Ratio`, the distance the two literals; the planner's prototype of the library half gave 0 and 0 (probe 18). On your tree no binding names `equality`; on the merged tree rung A's does.

**Rows.**
- Rows 113 and 909: the gather closes each with your commit, its test `StrictEquivalenceRuleWalk`.
- Rows 906 and 907: closed with your commit, their test `StrictEquivalenceRuleCompiled`.
- Row 908: narrowed: the helper compares floats by their bits, and the prelude's `opr ===(a:RR64, b:RR64) = a=b` and its `RR32` sibling (`Library/CompilerLibrary.fss:66-67`) answer first until the switch-over (P-38). Your `record.md` gives its whole new line; read it with `ledger.py show 908` first.
- Rows 910 and 911: closed with your commit, their test `StrictEquivalenceRuleWalk`, for its literal and `QQ` cases.
- `NEW-E-1`, the tuple limit (fork E7), in your `record.md` in `ledger.py`'s row template, for the ledger's section "4. Operators and overloading under walk", linted with `ledger.py check --rows`.
- Row 807: no change; its example is a reference object.

**Specification.** Yours, above. List every other sentence made false: the claims of rows 113, 906 to 911; rung N's new entry, where its effect names row 909 for a mixed `=` that no pair carries, which the gather corrects on the merged tree (fork 7); the `fortress-repo` skill's `tests-writing.md`, "A test program": "Otherwise they compare by identity (ledger row 807)", false for a value object; PLAN's line on the first stress test, where its `=` runs compiled only after the switch-over (fork E9).

**Files.**
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/`: `FInt.java`, `FLong.java`, `FBigNum.java`, `FIntLiteral.java`, `FNN32.java`, `FNN64.java`, `FFloat.java`, `FFloatLiteral.java`, `FRR32.java`, `FString.java` and `FOrdinaryObject.java`: each `seqv`, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeObject.java`: the constructor's field list, only.
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: the mark in the interfaces at `:4522-4523`, only; the mark's interface, new, under `compiler/runtimeValues/`.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/equality.java`: `sEquiv`, and a class beside it if reflection needs types that do not map.
- `Library/FortressLibrary.fss:664`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:196` and `:486`; `FortressBuiltin.fsi:44` and `:179`; only.
- `Specification/basic/objects.tex`: the lists and your callout, only. `Specification/appendices/changes.tex`: your entry, only.
- `ProjectFortress/tests/sequivTest.fss`: the eight lines; `ProjectFortress/tests/TransposedMatrixAndFreeze.fss`: `:19`; `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`: your tests.
- Not: `NativeApp.java`, `ObjectPrims.java`, `AnyPrim.java` and `StaticNativeApp.java`; the checker; the prelude's files; `compiler_regressions/`; `runtimeSystem/`; the tools.

**Reserved points.** A line of a team test beyond the eight; a model value that moves; a step that edits the prelude or takes item 371. Report any, with its evidence.

**Overlaps by file.** `FortressBuiltin.fss` with rungs A, N, I, F, C and W, at other declarations: your `:196` stands 7 lines below F's `:189`, your `:486` 23 lines below I's `:463` and 22 above N's `:508`. `FortressBuiltin.fsi`: your `:179` 11 lines below I's `:168` and 9 above N's `:188`. `FortressLibrary.fss`: your `:664` 67 lines below N's `QQ` `=` at `:597`, far from A's, F's, I's and W's. `CodeGen.java` with rungs G and T, at other methods. `changes.tex` with rungs N and C and the gather's corrections, in other entries.

### G. The code generator's `asif`: a type assumption compiled at a method call and at a call that it fixes (row 818)

**The mission.** F-34 gives the code generator's refusals in the one library by kind, each a declaration that the checker passes, so that after the switch-over the code generator still stands between the library and bytecode. One kind is the type assumption: the code generator has no case for `AsIfExpr` and stops in `defaultCase` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1675-1677`), 'Can't compile AsIfExpr'; it refused 7 declarations of the library at 13 sites (row 818; `perf-probes/codegen-distance/REPORT.md`, section 3). This rung compiles the assumption in the forms that the library writes.

**The answers this rung follows.** The specification: "The value of the expression is the value of the subexpression. The static type of the expression is the given type. … A type assumption considers both the static and the dynamic type of the value of the expression to be the specified type for the purposes of the immediately enclosing function, method, or operator invocation or field access", "a richer version of type assumption operations such as `super` in the Java Programming Language" (`Specification/basic/expressions/type-annotation.tex`, "Type Assumption"). Walk wraps the value in an `FAsIf`, which its dispatch reads (`interpreter/evaluator/Evaluator.java:109-116`). The compiled path keeps a trait's method bodies as static methods of the trait's `DefaultTraitMethods` class, `self` first (section 5, probe 21). The library's forms: a getter over `self asif` a supertrait (`Library/FortressLibrary.fss:1496`, `:3754`, `:3810`, `:4326`; `Library/RangeInternals.fss:1354`); an operator over two assumptions (`Library/String.fss:397`, `:421`); an assumption bound to a name (`Library/ReflectiveQuickCheck.fss:68`, `:84`, `:246`, `:303`), passed to a function (`Library/String.fss:67`), standing as a value (`ReflectiveQuickCheck.fss:184`), or on a tuple as the value of an `if` branch inside a comprehension (`String.fss:468`, `:471`): 15 sites by `grep -n ' asif '` on this base (section 5, probe 21), where row 818 counts 13 in the parsed trees at `32242b80d`. P-33: code-generator work goes on beside the natives. This record's section 3, forks 1, 2 and G1 to G3 (50 to 52) and 55, give the defaults you build.

**What you build.**
- The tests first (below).
- At a method call whose receiver is an assumption, `(e asif T).m(args)`, getters among them, which the desugarer makes method calls: a static call of the body that `T` gives `m`, declared in `T` or inherited by it, through the `DefaultTraitMethods` class that holds it, with the value as `self`; where `T` gives `m` no body, the virtual call (fork G1). In `forMethodInvocation` (`CodeGen.java:6397-6521`).
- At a function or operator call whose every dispatched argument is an assumption: a call of the declaration that the checker resolves there, with no run-time dispatch (fork G2). In `forOpExpr` (`:5163`) and the call of a function (`forFunctionalRef`, `:3926`), as they need it. A call with an assumption beside an argument that is not one stays refused, with a message of its own that names it.
- Elsewhere, an assumption is the subexpression's value at `T`'s Java type: a `forAsIfExpr` visitor beside the others.
- Each method that you change, and anything else that the emission needs, named in your report.
- Not yours: F-34's other kinds (row 733 is rung T's; local functions, varargs, `label`, the kind env); `forObjectDeclPrePass`, where rung E marks a value object, and `dumpMethodChaining`, rung T's; the checker; the library, which no compiled program reaches before the switch-over (fork G3).

**Tests, first.**
- `ProjectFortress/compiler_tests/AsIfCallsCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): a trait `Named` with a getter `name` and a method `greet(s: String)` with bodies, an object `Leaf extends Named` that overrides both: `(Leaf asif Named).name` is `"Named"` beside `Leaf.name`, `"Leaf"`, and the same for `greet`; a trait whose body comes from its own supertrait, called through the assumption; two overloads of a function, at `Named` and at `Leaf`, called with `Leaf asif Named`, which answers `Named`'s; an assumption bound to a name and then used. Seen failing on the base through `junit.sh`: 'Can't compile AsIfExpr' (probe 21). Passing after.
- `ProjectFortress/compiler_tests/XXXAsIfPartialCallCompiled.fss` with `XXXAsIfPartialCallCompiled.test` (`compile`, `compile_exception_contains=` your message): a call with one argument under an assumption and one not, the form that stays refused (fork G2), the reproducer of row 818 as it narrows. Show it through the harness as the skill's `tests-writing.md`, "Writing an `XXX` test", gives.
- `ProjectFortress/tests/AsIfCallsWalk.fss`: the first program under walk, a guard passing on the base and after, so that both paths give the specification's answer.
- Keep their verdicts: the compiler track.
- After the change: your tests through `junit.sh`, in one JVM, and the walk guard through the harness; the tracks to the gate (fork 2).

**Rows.** Row 818: the gather rewrites it to the partial call, with your `XXX` test as its reproducer, from the whole new line in your `record.md`; or closes it with your commit, if every form compiles.

**The stages.** Neither: you change only the code generator, which neither stage runs; list your files (`STAGE_BLIND`; fork 3).

**Specification.** None of the specification's sentences describes the code generator. List every sentence made false: F-34's kinds, row 818's claim, and any sentence of the `fortress-repo` skill's `compiler.md` that lists what the code generator refuses.

**Files.**
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: `forMethodInvocation`, the call paths of `forOpExpr` and `forFunctionalRef`, and a new `forAsIfExpr`, only, and anything the emission needs there, named in your report.
- `ProjectFortress/compiler_tests/` and `ProjectFortress/tests/`: your tests.
- Not: `forObjectDeclPrePass` and `dumpMethodChaining`; the checker's Scala; `interpreter/`; `Library/`; `ProjectFortress/LibraryBuiltin/`; `nativeHelpers/`; `Specification/`; the tools.

**Reserved points.** A step that would change the checker or the dispatch generator (`OverloadSet`). Report it, with its evidence.

**Overlaps by file.** `CodeGen.java` with rung E, at `forObjectDeclPrePass`'s class header (`:4522-4523`), and with rung T, at `dumpMethodChaining` (`:915-1021`): other methods, about 600 lines and more from yours (`forFunctionalRef`, `:3926`, stands 596 lines above E's `:4522`, and `forOpExpr`, `:5163`, 641 below). Put your new `forAsIfExpr` beside `forMethodInvocation` or `forOpExpr`, not inside `forObjectDeclPrePass` (`:4375-4794`), which rung E edits. No other rung edits the code generator.

### T. The code generator's trait table: an object whose first supertrait is an imported api's trait (row 733)

**The mission.** Another of F-34's kinds, and the wall of the library's 2-D and 3-D ranges: `OpenRange2D` (`Library/RangeInternals.fss:380`) extends `{ OpenRange[\(ZZ32,ZZ32)\], ActualRange2D[…] }`, and the code generator stops, 'Not in the trait table: OpenRange', at 8 declarations of `RangeInternals` (`perf-probes/codegen-distance/REPORT.md`, section 3). This rung lets such an object compile.

**The answers this rung follows.** Row 733: the code generator crashes on an object whose first supertrait is an imported api's trait and whose later supertrait defines a method of a name that the api's trait declares, also where the two overload validly; `dumpMethodChaining` compares the trait of each same-named method of the first supertrait with the body's trait (`typeAnalyzer.equiv`, `CodeGen.java:1009`), and the table does not find the api's trait. On this base the stack runs `TypeAnalyzer.typeCons` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:884`) ← `normalize` ← `subtype` ← `lteq` ← `equiv` ← `dumpMethodChaining` (`:1009`) ← `forObjectDeclPrePass` (`:4680`) (section 5, probe 21). The code generator's table is made over the component and the api environment (`compiler/phases/CodeGenerationPhase.java:179`, `:206-210`), so the trait is in the environment and the type that the comparison reads names it in a way that the table does not find. Walk runs row 733's form and prints `cd`. The two `tag` methods overload validly: their parameter types exclude each other (the skill's `SKILL.md`, "Fortress as a language"). Row 732, the sibling in the same method, is not yours (fork T2). This record's section 3, forks 1, 2, T1, T2 (53, 54) and 55, give the defaults you build.

**What you build.**
- The tests first (below).
- The comparison in `dumpMethodChaining` (`CodeGen.java:915-1021`) reads an imported api's trait (fork T1): the fix where the compared type is made or read, with the reason, in your report. If the fix must change the checker's trait table, it is a change of checking code: take P-148's measure as the manual's "Rung worker" gives it, run the count stage and the distance stage, and list it as a point to report.
- Not yours: row 732 (fork T2); rung E's and rung G's methods; `RangeInternals` itself; the checker unless fork T1 sends you there.

**Tests, first.**
- `ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.fss` with an api `ProjectFortress/compiler_tests/TraitTableApiTraitApi.fsi` and its component, and its `.test` (`tests=`, `compile`, `link`, `run`, `run_out_contains=PASS`), as `compiler_tests/RecursiveApiTest3.test` drives a program with its own apis: row 733's form, the api's `trait C abstract tag(self, n: ZZ32): String end`, the program's `trait D tag(self, s: String): String = s end` and `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`, with `tag(O, 1)` asserted `"c"` and `tag(O, "d")` asserted `"d"`; and a second object whose first supertrait is a generic api trait at a tuple static argument, as `OpenRange2D`'s is. Seen failing on the base through `junit.sh`: 'Not in the trait table: C' (probe 21). Passing after.
- `ProjectFortress/tests/TraitTableApiTraitWalk.fss`, with its api in `ProjectFortress/test_library/`: the same program under walk, a guard passing on the base and after.
- Keep their verdicts: the compiler track.
- After the change: your tests through `junit.sh`, in one JVM, and the walk guard through the harness; the tracks to the gate (fork 2).

**Rows.** Row 733: the gather closes it with your commit, its test `TraitTableApiTraitCompiled`. Row 732: no change, unless your fix reaches it; then your `record.md` gives its whole new line.

**The stages.** Neither, unless your fix changes the checker (fork T1): list your files (`STAGE_BLIND`; fork 3).

**Specification.** None. List every sentence made false: F-34's kinds, row 733's claim, and any sentence of the `fortress-repo` skill's `compiler.md` that lists what the code generator refuses.

**Files.**
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: `dumpMethodChaining`, only, and anything the comparison needs, named in your report; the checker's trait table only by fork T1.
- `ProjectFortress/compiler_tests/`, `ProjectFortress/tests/` and `ProjectFortress/test_library/`: your tests and their apis.
- Not: `forObjectDeclPrePass`'s header and the call visitors; `interpreter/`; `Library/`; `ProjectFortress/LibraryBuiltin/`; `nativeHelpers/`; `Specification/`; the tools.

**Reserved points.** A change of the checker's code (fork T1). Report it, with its evidence and the count stage's times.

**Overlaps by file.** `CodeGen.java` with rung E, at `forObjectDeclPrePass`'s class header (`:4522-4523`), and with rung G, at the method call and the call visitors: other methods. Rung E's mark goes into a copy of the interfaces, not into the `superInterfaces` that your method reads (fork E2).

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another (PLAN, "The principle for the batches"). Each rung's tests pass on its own tree. Only N lands only with another, F, whose two declarations over `Number` the checker refuses once N strikes `Number`'s `asFloat` (section 3, fork 1). Rung A's `SEQV` names the helper `equality.sEquiv`, whose body rung E changes: that is no dependency, since walk answers the name with its own operation, no compiled program reaches the one library's `SEQV` before the switch-over, and A's tests assert only the answers that P-168 and today share (section 3, fork A5). Rungs A, E, G and T land on their own.
- The declarations each rung changes:
  - N: `Number` struck to its header, `exactValue`, nine api lines of `asFloat`, 42 pairs of `=` with their api lines, the norm's eight declarations, `genType`, the specification's sentence with a new Appendix I entry and one clause of another, and twelve test files.
  - I: 16 bindings with their narrow headers and api lines, private conversion functions, and about 9 helpers in five integer classes.
  - F: 10 bindings, `random`'s and `printThreadInfo`'s api lines, the `RR64` trait's `^` and `atan2` with their api lines, `Float`'s `^` at `Number` struck, and about 8 helpers.
  - C: `charToExprString`, one string, `UnicodeHexChar`, the list of forms, a new Appendix I entry, and two guards.
  - W: two traits, their factories and `FileNotFoundException` in `FortressLibrary`, a native object in `FortressBuiltin`, the loader's carrier, two table entries, two helpers, `Writer`, `BufferedWriter` and `FileWriteStream`.
  - S: two helpers, `getEnvironment` out of `systemOps`, two strings and one guard.
  - A: `Object`'s `ilkName` string and `asString` body, `SEQV`'s string, `match` over `String` with its api line, walk's loader table, walk's ilk operation, 48 lines of two revival tests, and two tests.
  - E: the `seqv` of eleven walk value classes, `FTypeObject`'s field list, the code generator's mark on a value object's class and its interface, `equality.sEquiv`, `Ratio`, `IntLiteral` and `FloatLiteral` declared `value`, the lists of `objects.tex` with a new Appendix I entry, eight lines of the team's `sequivTest`, one line of a revival test, and three tests.
  - G: the code generator's method call, operator and function calls, and a new visitor for `AsIfExpr`, and three tests.
  - T: the code generator's `dumpMethodChaining`, and two tests with an api.
- The files that two rungs share, and each rung's place:
  - `Library/FortressLibrary.fss`: N `:380-408`, beside each type's own `=` (`:441`, `:597`, `:740`, `:831`, `:917`, `:1007`), `:2645`; F `:485`, `:494`, `:4537`, `:4633`; I `:796-1079`; W beside `IOFailure` (`:1870`); E `:664`; A beside `:4615`, and `:4650-4651`.
  - `Library/FortressLibrary.fsi`: N `:288-296`, beside each type's own `=` (`:327`, `:416`, `:495`, `:548`, `:607`, `:661`), `:1706`; F `:367`, `:375`, beside `:2573`, `:2635`; A beside `:2576`; I `:525-700`; W beside `IOFailure` (`:1201`).
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: A `:38-41`; F `:154-189`, `:328-329`; E `:196`, `:486`; N beside `:246`, `:400`, `:508`; I `:456-463`; C `:614-615`; W at the component's end.
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`: E `:44`, `:179`; N beside `:70`, `:134`, `:188`; I `:164-168`.
  - `Specification/appendices/changes.tex`: N after `:2735`, and `:578`; E before `:3935`; C before `:4637`.
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: T `dumpMethodChaining` (`:915-1021`); G `forFunctionalRef` (`:3926`), `forOpExpr` (`:5163`), `forMethodInvocation` (`:6397-6521`) and a new `forAsIfExpr`; E the class header that `forObjectDeclPrePass` writes (`:4522-4523`), in a copy of the interfaces, not in `superInterfaces` (`:4408-4409`), which T's method reads.
  - `ProjectFortress/tests/FlatTowerRungF.fss`: N `:75`, `:76` and their messages; A 40 lines from `:42` to `:190`, `:72` and `:98` the nearest to N's.
  - `nativeHelpers/stringOps.java`: F right after `compareTo` (`:23-25`); S right after `lineSeparator` (`:72-74`).
- They meet on the merged tree. Walk's suite runs every rung's walk tests. The compiler track runs I's, F's, C's, W's and S's compiled guards. The stages read the library as N, I, F, C and W leave it, `stringOps` as F and S leave it, and the parser as C leaves it, so a site there is to be traced to one rung's edit, against 0 and 0. The specification's build reads C's and N's entries and the generated apis that N, I, F and W change. The gather's 52 demos and the commit stage's quick check of the model see every program's printing and every native at once. A's walk test and E's walk tests run together in walk's suite; there `SEQV` reaches E's value classes through A's table, and the count stage reads `equality.java` whole, since A's binding names it, so E keeps every method of the class at types that map (fork E3). Rung N's fallback `=` answers a mixed comparison that no pair carries by E's `SEQV`, `false`; N asserts no such answer. A changes the printed name of the five native number objects in every test, so no rung's test asserts `Int`, `Long`, `BigNum`, `Float` or `UnsignedLong` as `ilkName`, `asDebugString` or a generic's printed name gives them, and none asserts a `SEQV` answer that E changes, nor the `=` of a tuple of four or more that holds a string (section 6, "What every agent reads first"). The compiler track runs G's and T's tests with E's compiled test, over one code generator that holds the three changes.

## 5. The candidates, the probes, and what waits

### What the record owes

- **PLAN's next batch** ("Where we stand", "Next"; phase 4): P-160's second step, rung N; the two rungs of the natives that no bare helper reaches, rungs I and F (P-162); `Char`'s `asExprString`, rung C (P-163); the integer conversions (P-161), in climb batch 28 (section 2, reason 3); N4's two rungs, the writer rung W now and the reader rung in climb batch 28 (P-164; section 2, reason 2); `System`'s rung, S (item 355); the literals with N5; the next code-generator rungs, `asif` (row 818) and the 2-D and 3-D ranges (row 733), in climb batch 28 (section 2, reason 6).
- **Climb batch 26's review, "The steps due before the next batch", step 5:** the same list.
- **Review-queue item 363** (`FlatString`'s two): taken by rung F, as P-162 sets.
- **Review-queue item 335** (the natives' shared state): no new helper holds state, so its default stands (section 3, fork 6).
- **PLAN's natives line on the three over `Any`** (P-162, P-167, P-168), and the curator's first stress test, `value object CC64`: rungs A and E, at his word of 2026-11-06.
- **Review-queue items 371 and 372,** whose defaults are decided with these rungs: 371 waits for the switch-over batch (section 3, fork E6); 372 takes its default, the ilk as the trait's name with the five public (forks A1 and A3).
- **The code generator's walls `asif` and the trait table** (rows 818 and 733): rungs G and T, at his word of 2026-11-07.

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

### The planner's probes for rungs N and F

**Two more worktrees, for rungs N and F.** `/home/user/fortress-p27n` and `/home/user/fortress-p27c`, each seeded as the first (`seed-worktree.sh /home/user/fortress-base27 <worktree> - 551b02858`, 26 s), detached, never built, and removed after. Every library edit below was in scratch, and each walk run used its own fresh copy of the caches (`cp -a default_repository/caches tmp/<name>-caches`; `FORTRESS_CACHES=…`). Nothing ran in the base build.

**Probe 8. `Number`'s `asFloat` and `=` struck, under walk (rungs N and F).** `MixEqP.fss` binds a `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64` and `RR64` 1, an `RR32` `narrow(1.0)`, the `QQ` values `1/2` and `2/2` and an `RR64` 0.5, and prints 21 mixed `=` and one `=/=`. On the base each `=` prints `true`. Then, in `/home/user/fortress-p27n`, `Number`'s `asFloat`, `=` and `exactValue` deleted (`Library/FortressLibrary.fss:382-395`, `:398-408`; `.fsi:290-295`), the clause kept:

    Library/String.fss:529:41-46:
        Variable asFloat is not defined.

`asFloat(self): RR64` put in the api of `RR64` after its header gave 'Coercion declarations should come first.' and 'Field/getter/setter declarations should come before method declarations.'. Put at the end of each of the nine types, the six traits of `FortressLibrary` (`abstract` in the api) and `RR32`, `NN32` and `IntLiteral` in `FortressBuiltin.fsi`, walk loaded the library, and `MixEqP` printed, among its lines:

    ZZ32 1 = RR64 1.0: true
    ZZ64 1 = RR64 1.0: true
    ZZ32 1 = ZZ 1: false
    QQ 2/2 = ZZ32 1: false
    QQ 1/2 = RR64 0.5: false
    RR32 1.0 = RR64 1.0: false

A copy with `SEQV` in place of each `=` printed the same 22 answers: the fallback `opr =(a:Any, b:Any) = a SEQV b` (`:96`) answers every mixed `=`, by walk's `SEQV`, which calls an `Int`, a `Long`, a numeral and a `Float` of one value equal (row 909). `ant testSystem` on that tree, 3 min 38 s, 'BUILD FAILED': 'Tests run: 196, Failures: 4', '193, Failures: 0', '183, Failures: 2', '184, Failures: 6'. The 12 of 756: `BigNum`, `ComparisonAtNaNWalk`, `FlatTowerRungF`, `IntLiteralValue`, `IntSemanticsRungI`, `NumberOrderListDeclarations`, `RR32SiblingRungV`, `RationalTest`, `UnsignedTest`, `contracts1`, `expTest`, `testRR32`. Among the messages: 'FAIL: a BigNum: 120 =/= a Int: 120; factorial(5)=120', 'FAIL: a Ratio: 1/3 =/= a Ratio: 1/2; the simplest rational in [1/3, 1/2] is 1/2', the library's `if r=0` at a `ZZ` (`:562`), and 'FAIL: FortressLibrary.fsi:285-288: RR32 = RR64 compares after asFloat'.

**Probe 9. The checker on the strike (rungs N and F).** In `/home/user/fortress-p27c`, probe 8's edit applied: the count stage, `#total 2`, at the `RR64` trait's `atan2` over `Number` and at the norm, each 'Could not check call to function asFloat', '… is not applicable to an argument of type Number.' (`T` at the norm); the distance stage, `#total 3`, 222 s, those two and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:160:40-48`, `Float`'s `^` at `Number`. Read at the base's lines, the three are `Library/FortressLibrary.fss:494`, `:2645` and `FortressBuiltin.fss:160`. Every api and every other component checked with 0. `random` over `Number`, a native, and the `RR64` trait's `^` over `Number` (`:485`), whose `asFloat` is at `RR64`, pass.

**Probe 10. Where `Number`'s `=` runs on the base.** Under walk, in `/home/user/fortress-p27n` with the base's library, `Number`'s `=` made to print `@@NUMEQ` and its operands' `ilkName` first; `FORTRESS_JUNIT_VERBOSE=1 ant testSystem`, 4 min 46 s, 'BUILD SUCCESSFUL'; the markers read by test from `ProjectFortress/TEST-RESULTS/system-*/`. 47 tests reach `Number`'s `=` at two run-time classes: `BigNum`, `BitTwiddle`, `Brackets`, `ChooseHelperZZ64Walk`, `ChooseZZ64Walk`, `CoercionBindRungC`, `CoercionCallRungC`, `CoercionOverloadRungC`, `ComparisonAtNaNWalk`, `CovariantTest`, `DivPrecedence`, `ExportAlignedMembersWalk`, `FlatTowerRungF`, `HeapTest`, `IntLiteralValue`, `IntSemanticsRungI`, `IntegerPowerContractWalk`, `NativeHelperFamilyFloatWalk`, `NumberOrderListDeclarations`, `NumberPrintTest`, `QQPowerExponent`, `QuickCheckTest`, `RR32SiblingRungV`, `RationalTest`, `ReflectiveQuickCheckTest`, `ResultBoundsRungB`, `RoundHalfEvenRungR`, `SeededRandomGenAbstractMethods`, `UnsignedTest`, `VectorMatrixCastsWalk`, `XXXRationalUnorderedRungP`, `XXXRoundNearTieNumeral`, `contracts1`, `expTest`, `fib13`, `formatTest`, `generatorTest`, `genericTest3`, `intDivisionTest`, `litCoercion`, `oprTests`, `realArith`, `roundBug`, `sparseMatrix`, `testRR32`, `vectorOps` and `zeno`. The pairs of classes, by the number of tests: `BigNum`/`Int` 22, `Long`/`Int` 19, `Float`/`Int` 6, `Int`/`Ratio`, `FloatLiteral`/`Int` and `Int`/`Long` 2 each, and 17 others in one test each. Four pairs have no coercion between them: `Long`/`RR32` (`testRR32`), `Float`/`Ratio` (`expTest`), `Ratio`/`FloatLiteral` and `BigNum`/`FloatLiteral` (`FlatTowerRungF`). Most markers are the library's own: `RationalTest`'s 5,278 `BigNum`/`Int` and `ReflectiveQuickCheckTest`'s 8,577 come from `QQ`'s code, `if d1 = 0` and `if r=0` at a `ZZ` (`Library/FortressLibrary.fss:553`, `:562`).

Under the checker, in `/home/user/fortress-p27c` with probe 8's edit, for one run `opr =(a:Number, b:Number):ZZ32 = 0` declared beside the fallback, so that every comparison whose `=` the checker resolves at `Number` and `Number` fails as a condition that is not a `Boolean`: the distance stage gave 64 such errors, at 54 lines of seven of the fourteen components, 28 of them in `FortressLibrary` (among them `:553`, `:562`, `:603`, `:623`, `:651`, `:656`, `:665-667`, `if i=0` at a `ZZ32` at `:1532`, `:1633` and `:1649`, and `|self| = 0` at `:1974`), 10 in `RangeInternals`, 7 in `String`, 4 in `List`, 2 each in `FortressBuiltin` and `NatReflect` and 1 in `FlatString`. Each compares a value with a numeral or another number type: today the checker resolves it to `Number`'s `=`.

**Probe 11. The pairs of `=`, a prototype (rung N, fork N7).** In `/home/user/fortress-p27c`, probe 8's edit and the 21 pairs, 42 declarations, each put at the end of its type, in the form `opr =(self, b:S):Boolean = do c: T = b; (self = c) end` and `opr =(self, b:T):Boolean = do c: T = self; (c = b) end`, with their api lines (84 lines). Without the parentheses walk refused the first at load: 'Equality testing expressions should be parenthesized.' With them `MixEqP` printed `true` at every pair that a coercion carries (`ZZ32 1 = ZZ 1`, `QQ 2/2 = ZZ32 1`, `QQ 2/2 = numeral 1`, `RR32 1.0 = RR64 1.0` among them), `false` at `NN32 1 = ZZ32 1`, `NN64 1 = ZZ64 1` and `QQ 1/2 = RR64 0.5`, and `true` at `ZZ64 1 = RR64 1.0`, by walk's `SEQV` (row 909). `ant testSystem`, 'Tests run: 196, Failures: 1', '183, Failures: 1', '193, Failures: 0', '184, Failures: 1': 3 of 756, `expTest`, `testRR32` and `FlatTowerRungF`, with 'FAIL: a Float: 0.00390625 =/= a Ratio: 1/256', 'FAIL: a Long: 4 =/= a RR32: 4.0' and 'FAIL: row 434, POSITIONS.md:92: a QQ equals the float of its value'. The ten lines: `tests/testRR32.fss:67`, `:69`, `:70`, `:72`, `:74`, `:75`; `tests/expTest.fss:22`, `:24`; `tests/FlatTowerRungF.fss:75`, `:76` (the last a `deny` that passes either way, of row 434). The count stage, `#total 2`, at the two sites of probe 9 only: the 42 declarations pass the checker's overloading and export checks. With probe 10's `opr =(a:Number, b:Number):ZZ32` added again for one run, the distance stage's typecheck errors were the three sites of probe 9 only: none of the 54 comparisons resolves to a declaration at `Number` and `Number` any more, so each takes a pair or its type's own `=`. That run's other 78 errors are the added declaration's own return type against the pairs', and the overloading checks it brings.

**Probe 12. A program's number type without `asFloat` (rung N).** `TallyP.fss`: `value object Tally(n: ZZ32) extends Number end` and three comparisons. On the base walk refuses it at load:

    Object Tally does not define an abstract method declared in type Number:
    …/Library/FortressLibrary.fss:382:5-385:30: asFloat():RR64

On the prototype of probe 11 it ran: `Tally(2) = Tally(2): true`, `Tally(2) = Tally(3): true`, `Tally(2) = 2: false`. The second is row 113: walk's `SEQV` calls two value objects equal when their body declares no field; `Plain(2) SEQV Plain(3)` for a `value object Plain(n: ZZ32)` below nothing prints `true` too.

**Probe 13. The demos (rung N).** The demo driver of `rung-team-demos/REPORT.md`, section 13, in `/home/user/fortress-p27n` with probe 10's marker: 'demos: 52 run, 52 reached their end', about 70 min beside the other probes. 24 of the 52 reach `Number`'s `=` at two run-time classes: `BiCGSTAB`, `BiCGSTAB2`, `conjGrad` and `lutx` at `Float`/`Int`; the 17 `BirdCount` demos (140 each), `HeapShakedown` and `sudoku` at `BigNum`/`Int`; `aStar` at `Long`/`Int`. Each is a pair that a coercion carries, so with rung N's pairs none needs a written conversion; with the strike alone the 19 at `BigNum`/`Int` would compare a `ZZ` with a numeral by walk's `SEQV`, `false` at equal values. The demos were not run on the prototype of probe 11.

**Machine.** As above; the load ran from 0.02 to 6.6, since these probes ran beside each other. No run was timed to compare.

**Not run:** rung N's norm, generator, specification edit and tests, and rung F's rework, which the prototype of probe 11 left out; the compiled tracks, which compile against the prelude.

### The Fable review's probes for rungs N and F

Two scratch programs, run in the main tree at `7785a331b`, whose code is the base's, from a private copy of its caches (`FORTRESS_CACHES`) with the setup lines of the skill's `build-and-caches.md`; neither edited the library, and neither was kept.

**Probe R1. The fallback over `Any` beside a declaration that coercion reaches, under walk (fork N7).** `FallbackP.fss` declares `pick(a: Any, b: Any): String = "fallback over Any"` beside `pick(a: RR64, b: RR64): String = "RR64 declaration"`, binds `i: ZZ32 = 1`, `x: RR64 = 1.0`, `z: ZZ64 = widen(1)` and `q: QQ = 2/2`, and prints, rc 0:

    pick(i, x): fallback over Any
    pick(x, x): RR64 declaration
    i = x: true
    z = x: true
    q = i: true
    i SEQV x: true
    z SEQV x: true
    q SEQV i: false

So on the base a declaration that applies without a coercion runs before one that a coercion reaches (P-46); the three mixed `=` answer by `Number`'s `=`; and walk's `SEQV` calls an `Int`, a `Long` and a `Float` of one value equal (row 909) and a `Ratio` equal to nothing but itself.

**Probe R2. The prelude's way with a mixed `=` (fork N7).** `PreludeEqP.fss` binds `i: ZZ32 = 3`, `x: RR64 = 3.0` and `z: ZZ64 = 3`, and binds to `Boolean` variables `i = 0`, `3 = 3.0`, `i = x`, `x = 3` and `z = x`. `bin/fortress typecheck PreludeEqP.fss`, against the compiler's prelude: 'File PreludeEqP.fss has 4 errors', 'Could not check call to operator =' at the last four, each listing the prelude's thirteen `=` declarations, `(RR64, RR64)->Boolean` and `(ZZ32, ZZ32)->Boolean` among them and none over `Any`; `i = 0` passes. The prelude's `RR64` coerces from `FloatLiteral` and `RR32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`), so it has no `=` for `3 = 3.0`; `i = 0` resolves by the numeral's coercion into `ZZ32`, with no pair and no fallback.

### The planner's probes for rungs A, E, G and T

**Two more worktrees, for the four rungs.** `/home/user/fortress-p27e` and `/home/user/fortress-p27a`, each seeded from the base build as the first (`seed-worktree.sh /home/user/fortress-base27 <worktree> - 551b02858`, 13 s and 3 s), detached, and removed after. Each was built once, `ant compileAll`, 'BUILD SUCCESSFUL', 34 s, 'Caches … started again, empty', for its prototype of Java and library edits, never committed. The runs on the base's code used a private copy of the warm caches, `tmp/basecaches`, in `/home/user/fortress-p27e` before its build, or the base build's `bin/fortress` with `FORTRESS_HOME` at the base build and `FORTRESS_CACHES` at that private copy, the way `tools/old-fortress.sh` runs the old code; `git -C /home/user/fortress-base27 status --porcelain` printed nothing after. The probe programs were scratch, not kept; each is given below with its output.

**Probe 14. Walk's ilk today (rung A).** `IlkWalkP.fss` binds `i: ZZ32 = 3`, `l: ZZ64 = 3`, `b: ZZ = 3`, `r: RR64 = 3.0`, `u: NN64`, `n: NN32`, `f: RR32`, `q: QQ = 1/2`, and `object Box[\T\](v: T)`; under walk on the base:

    1 ilk: Int Long BigNum FloatLiteral UnsignedLong NN32 RR32 Ratio
    2 ilk lit: Int FloatLiteral  Boolean Char FlatString
    3 box: Box[\ZZ32\] Box[\Int\] Box[\FloatLiteral\] Box[\BigNum\] Box[\FlatString\] Box[\Pt\]
    4 asString: Pt Box[\Int\] Box[\ZZ32\]
    5 debug: a Int: 3 a FloatLiteral: 3.0 a BigNum: 3 a Pt: Pt
    6 typecase: Int arm

Line 3's second entry is `Box(i)`, its first `Box[\ZZ32\](3)`. A float numeral bound to `RR64` stays a `FloatLiteral` (line 1), since the one library declares `object FloatLiteral extends RR64` and no coercion runs; `1.5 + 1.5` is a `Float` (probe 17). A program can name `Int` in a `typecase` (line 6).

**Probe 15. Rung A's prototype, in `/home/user/fortress-p27a`.** `NativeApp.java`: a map of the two names to `ObjectPrims$ClassName` and `AnyPrim$SEquiv`, seven lines with two read after `:195`; `ObjectPrims.java`: `ClassName` renders through a function of about 20 lines that names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong`, an `FTypeObject` that extends one type, by that type's name, and renders a `GenericTypeInstance`'s static arguments the same way, matching by name only; the library: `ilkName` on `stringOps.typeName`, `getter asString(): String = self.ilkName`, `SEQV` on `equality.sEquiv`. Under walk, probe 14's program printed:

    1 ilk: ZZ32 ZZ64 ZZ FloatLiteral NN64 NN32 RR32 Ratio
    2 ilk lit: ZZ32 FloatLiteral  Boolean Char FlatString
    3 box: Box[\ZZ32\] Box[\ZZ32\] Box[\FloatLiteral\] Box[\ZZ\] Box[\FlatString\] Box[\Pt\]
    4 asString: Pt Box[\ZZ32\] Box[\ZZ32\]
    5 debug: a ZZ32: 3 a FloatLiteral: 3.0 a ZZ: 3 a Pt: Pt
    6 typecase: Int arm

and probe 17's program printed the base's seven lines but its first (`RR64` and `ZZ` for `Float` and `BigNum`). `ant testSystem`, 4 min 24 s, 'BUILD FAILED': 'Tests run: 196, Failures: 1', '193, Failures: 1', '183, Failures: 0', '184, Failures: 0'; the two are `ArrayElementAlgebra`, 'FAIL: J9/0:32 : ZZ32 =/= J8/0:32 : Int; an integer vector's dot product stays an integer', and `FlatTowerRungF`, 'FAIL: J17/0:2147483648 : ZZ64 =/= J17/0:2147483648 : Long; row 146, POSITIONS.md:159: a ZZ64 bound to a numeral holds 64 bits'. Each asserts walk's names through `shown(v) = v.asString || " : " || v.ilkName` (`:6` of each): `grep -n -E ': (Int|Long|Float|BigNum|UnsignedLong)"'` gives `ArrayElementAlgebra.fss:17`, `:19`, `:20`, `:35`, `:41`, `:42`, `:43`, `:44`, and `FlatTowerRungF.fss:42`, `:43`, `:45`, `:47`, `:49`, `:51`, `:53`, `:55`, `:57`, `:69`, `:71`, `:72`, `:98`, `:99`, `:102`, `:103`, `:105` to `:108`, `:110` to `:112`, `:114` to `:116`, `:119`, `:121`, `:123`, `:124`, `:127`, `:128`, `:160` to `:162`, `:172`, `:177`, `:182`, `:186`, `:190`: 48 lines, both tests the revival's (`d846e3644`, `7207e2719`). No other test of `tests/` or `compiler_tests/` holds such a text. The count stage: `#total 0`, `#crash none`; the distance stage: `#total 0`, `#crash none`, `#seconds 158`.

**Probe 16. The compiled helpers today (rungs A and E).** `SeqvCompP.fss`, compiled on the base and run, binds `tName(x: Any): String` on `stringOps.typeName` and `sEq(a: Any, b: Any): Boolean` on `equality.sEquiv`, with `value object VPlain(a: ZZ32, b: ZZ32)`, `value object CC64(re: RR64, im: RR64)` and `object RC64(re: RR64, im: RR64)`; `i`, `j: ZZ32 = 3`, `l: ZZ64 = 3`, `r: RR64 = 3.0`, `s: RR64 = 1.5 + 1.5`, `zero`, `nz: RR64 = -0.0`, `nan = zero / zero`, two `Pt(1,2)` `p` and `q`, two `(ZZ32, ZZ32)` tuples:

    1 tName:  ZZ32   ZZ64   RR64   RR64
    1b tName:  IntLiteral   FloatLiteral   Boolean   Character   JavaString
    2 tName:  Pt   Box[\ZZ32\]   Box[\ZZ32\]
    3 sEq:  false   false   false   false   false   true   false   false   true
    4 sEq values:  false   false   false   false   false
    5 ===:  true   true   true   false   true   false   false
    3b sEq tuples:  false

Line 1b is `3`, `3.0`, `true`, `'c'` and `"s"` passed at `Any`. Line 3: `i,j`, `i,l`, `i,r`, `r,s`, `zero,nz`, `nan,nan`, `"ab","ab"`, `p,q`, `p,p`. Line 4: `VPlain(1,2)` against `(1,3)` and `(1,2)`, `CC64(1.0,2.0)` against an equal one and against `(1.0,3.0)`, two `RC64`. Line 5, the prelude's `===`: `i,j`, `r,s`, `zero,nz`, `nan,nan`, `"ab","ab"`, two equal `CC64`s, `VPlain(1,2),(1,3)`. So the helper alone is identity, and the prelude's family answers numbers and strings by `=`. A first form of the program, with a lambda, `()` and a tuple passed to `tName` inside one long `run`, stopped the code generator, 'Error trying to close method scope', `ArrayIndexOutOfBoundsException` in `CodeGenMethodVisitor.visitMaxs`; split into small functions it compiled (probe 20 for the tuple).

**Probe 17. Walk's `SEQV` today (rung E).** `SeqvWalkP.fss` under walk on the base, the review's cases bound at declared types:

    1 ilk: FloatLiteral Float BigNum BigNum
    2 cases: true true true false true false true true true true false false true true false
    3 literal: true true true true
    4 QQ: false false true Ratio
    5 CC64 SEQV: true true RC64: false
    6 CC64 =: true true RC64: false false
    7 Just: true true false

Line 1 is `r: RR64 = 3.0`, `s: RR64 = 1.5 + 1.5` and two `ZZ`. Line 2, in the review's order: two `ZZ32` 3s, `ZZ32`/`ZZ64`, `ZZ32`/`RR64`, `ZZ32`/`NN32`, two `ZZ` apart, `0.0`/`-0.0`, a NaN with itself, two `(1,2)`, `(1,2)`/`(1,2.0)`, two flat strings built apart, two equal ropes, two `Pt(1,2)`, a `Pt` with itself, `VPlain(1,2)`/`(1,3)`, two equal lambdas. Line 3: `r SEQV s`, `r SEQV 3.0`, `s SEQV 3.0`, `i SEQV 3`. Line 4: `1/2 SEQV 2/4`, `2/4 SEQV 3/6`, `1/2 = 2/4`. Line 5: `CC64(1,2)` against `(1,2)` and `(1,3)`, two `RC64(1,2)`. Line 6: the same by `=`, then `CC64(1,2) =/= CC64(1,3)`. Line 7: `Just(1)` against `Just(2)` and `Just(1)`, then `Just(1) = Just(2)`. `SeqvMoreP.fss`, also on the base: `VBox(p) SEQV VBox(p)` and `VBox(p) SEQV VBox(Pt(1,2))` for `value object VBox(p: Pt)`, `true true`; `char(66560) SEQV char(1024)` and `char(66560) SEQV char(66560)`, `false true`; a 4-tuple of strings built apart `=` an equal one, a pair and a triple, `true`, `true`, `true`; `s1 SEQV s2`, `s1 SEQV s1`, `s1 = s2`, `"cat" SEQV "cat"`, `true true true true`.

**Probe 18. Rung E's walk half and library half, a prototype, in `/home/user/fortress-p27e`.** The `seqv` of `FInt`, `FLong`, `FBigNum`, `FIntLiteral`, `FNN32`, `FNN64` by value within the class, `FFloat`, `FFloatLiteral`, `FRR32` by bits within the class, `FString` `false`; `FTypeObject`'s value parameters added once after the members' loop; `FOrdinaryObject.java:54` through `AnyPrim.sequiv`; `value object Ratio`, `value object FloatLiteral`, `value object IntLiteral` (`git diff --stat`: 15 files, 17 insertions, 42 deletions). Under walk, probe 17's program printed:

    2 cases: true false false false true false true true false false false false true false false
    3 literal: false true false true
    4 QQ: true true true Ratio
    5 CC64 SEQV: true false RC64: false
    6 CC64 =: true false RC64: false true
    7 Just: false true false

and `SeqvMoreP` `true false`, `false true`, `false` for the 4-tuple and `true true` for the pair and the triple, and `false true true false` for the strings. A copy of `sequivTest.fss` with each `fail` turned into a print printed eight lines, `LINE not SEQV 45 45.0`, `45 45.0`, `45 45`, `45.0 45.0`, `45.0 45`, `45.0 45`, `(45,45.0) (45,45.0)` and `(45,Just(18)) (45.0,Just(18))`: `:49`, `:50`, `:51`, `:58`, `:59`, `:66`, `:94`, `:113`. `ant testSystem`, 4 min 39 s, 'BUILD FAILED': 'Tests run: 196, Failures: 2', '193, Failures: 0', '184, Failures: 0', '183, Failures: 0'; the two are `sequivTest`, 'FAIL: 45 not SEQV 45.0', and `TransposedMatrixAndFreeze`, 'FAIL: ((immutable),3,v7,v7) =/= ((immutable),3,v7,v7); an immutable array's map fills an immutable replica of three strings', its `:19`, a 4-tuple that the fallback `=` compares by `SEQV`. No `XXX` test turned. The count stage: `#total 0`, `#crash none`; the distance stage: `#total 0`, `#crash none`, `#seconds 166`. The compiled half, the mark and the helper, was not prototyped.

**Probe 19. A compiled value object, and its default `=` (rung E).** `javap -p` of probe 16's jar: `public final class SeqvCompP$CC64 extends fortress.CompilerBuiltin$Object$DefaultTraitMethods implements fortress.CompilerBuiltin$Object`, with `public final com.sun.fortress.compiler.runtimeValues.FRR64 \%re;` and `\%im`, a static `RTTI` and the getters; `SeqvCompP$RC64` and `SeqvCompP$VPlain` have the same shape. `CcEqP.fss`, `b: Boolean = (CC64(1.0, 2.0) = CC64(1.0, 2.0))`, compiled on the base: 'Could not check call to operator =', '((CompilerAlgebra.Equality[\T\] & {T}), T)->Boolean is not applicable to an argument of type (CC64, CC64).'

**Probe 20. A tuple at a native binding over `Any`, compiled (filed by plan).** `TupNameP.fss` on the base: `t1: (ZZ32, ZZ32) = (1, 2)`; `a: Any = t1; s: String = tName(a)` printed 'tuple via Any:  (ZZ32,ZZ32)'; `println("tuple direct: " tName(t1))` stopped: 'class com.sun.fortress.compiler.runtimeValues.FZZ32 cannot be cast to class fortress.CompilerBuiltin$String'. No row holds it (`ledger-find:tuple Any compiled`, `ledger-find:ClassCastException tuple`); the second row filed by plan, below.

**Probe 21. The two walls, on the base (rungs G and T).** `AsIfP.fss`, row 818's form, `(Leaf asif Named).name`: 'AsIfP.fss:10:16-26: Can't compile AsIfExpr'. Row 733's form, the api `Q1ApiC` with `trait C abstract tag(self, n: ZZ32): String end`, compiled, and `TraitTableP.fss` with `trait D tag(self, s: String): String = s end` and `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`, compiled with `-debug stacktrace`:

    Exception in thread "main" java.lang.RuntimeException: Not in the trait table: C
        at com.sun.fortress.scala_src.types.TypeAnalyzer.typeCons(TypeAnalyzer.scala:884)
        at com.sun.fortress.scala_src.types.TypeAnalyzer.normalize(TypeAnalyzer.scala:655)
        at com.sun.fortress.scala_src.types.TypeAnalyzer.lteq(TypeAnalyzer.scala:78)
        at com.sun.fortress.compiler.codegen.CodeGen.dumpMethodChaining(CodeGen.java:1009)
        at com.sun.fortress.compiler.codegen.CodeGen.forObjectDeclPrePass(CodeGen.java:4680)

(frames between them left out). `javap -p` of the prelude's `fortress/CompilerBuiltin$Object$DefaultTraitMethods`: `public static fortress.CompilerBuiltin$String asString(fortress.CompilerBuiltin$Object);` beside the instance method `asString()`: a trait's bodies are static methods with `self` first, which a call under an assumption can name. `CodeGenerationPhase.java:179` makes the code generator's table, `new TraitTable(ci, apiEnv)`. The library's `asif` sites, by `grep -n ' asif '`: `FortressLibrary.fss:1496`, `:3754`, `:3810`, `:4326`; `RangeInternals.fss:1354`; `String.fss:67`, `:397`, `:421`, `:468`, `:471`; `ReflectiveQuickCheck.fss:68`, `:84`, `:184`, `:246`, `:303`; none in the model's files. Not run: a prototype of either wall's fix.

**Machine.** nproc 4; Intel Xeon Processor @ 2.10 GHz, 2100 MHz; openjdk 25.0.4.1; `FORTRESS_THREADS=1` for the programs, the suites at four; the load reached 12.2 while the suites and stages of the two worktrees ran beside each other. No run was timed to compare.

### Rows filed by plan

Two, both in the ledger before the launch. The first, drafted here in the row template, was filed as row 905 at `741f230da` on 2026-11-06, as climb batch 25's Fable review filed that batch's rows, in section 6, "Integer arithmetic", where four of the five declarations it names stand; the ledger files the specification's rows by topic.

    | ? | Appendix I cites the library's apis by line in nine places, and at least five of its seven citations of `Library/FortressLibrary.fsi` name other declarations than their sentences claim: lines 459--460, cited for `LSHIFT` and `RSHIFT` on every integer type, hold `DOT` and `TIMES` | NEGATIVE-VERIFIED | implementation gap (specification) | `appendices/changes.tex`, "Changes Made by the 2026 Revival to the Working Draft" | none | climb batch 27's planner | Read at 551b02858 (`Specification/appendices/changes.tex:1613`, `:1749`, `:1861`, `:1902`, `:2684`): 433--436, cited for `AnyIntegral`, hold `QQ`'s `^`, `floor` and `ceiling`; 510--511, for the integers' exclusions, `NN64`'s `-` and `DOTMINUS`; 387--388, for `QQ`'s four traits, `RR64`'s `MAXNUM`; 291--296, for `RR64`'s coercion from `RR32`, `Number`'s `asFloat` and `=`. Each library edit shifts them. A fix cites the declaration by name, as the tests cite the specification by section. |

The planner linted the line: `ledger.py check --rows` on it with the number 9999 printed '1 rows, 0 fail the template'; with `?` only the number rule fails, which `ledger.py add` fills. The row is 953 characters.

The second, from probe 20, filed as row 917 at `fd79e0352`, for the section "12. The compiled path: constructs, crashes and the switch-over":

    | ? | on the compiled path, a program's one-parameter native binding over `Any`, called with a tuple-typed variable, stops with a `ClassCastException` when the call stands inside a juxtaposition: `println("t: " tName(t1))` for `t1: (ZZ32, ZZ32)` and `tName(x: Any): String` on `stringOps.typeName` | NEGATIVE-BOUNDED | implementation gap (codegen) | `basic/expressions/function-calls.tex`, "Function Calls" | none | climb batch 27's planner | Compiled scratch program `TupNameP.fss` at 551b02858: after 'REACHED', `a: Any = t1; s: String = tName(a)` printed 'tuple via Any:  (ZZ32,ZZ32)', and `println("tuple direct: " tName(t1))` stopped: 'class com.sun.fortress.compiler.runtimeValues.FZZ32 cannot be cast to class fortress.CompilerBuiltin$String'. Tried: through an `Any` variable, which runs. Not tried: a function over `Any` that is not a native binding, and the call outside a juxtaposition. A two-parameter binding on `equality.sEquiv` at two tuple variables, `bs(sEq(t1, t2))`, ran. |

Linted the same way, with the number 9999: '1 rows, 0 fail the template'. The row is about 1,000 characters.

### Left out, each with its home

- **The integer conversions (P-161):** climb batch 28 (section 2, reason 3). Its brief adds rung I's calls of `ZZ`'s `narrow` to the callers that it moves onto `.asZZ32` (fork I2), and moves `ZZ32`'s `big` onto `makeZZfromZZ32` (P-162).
- **N4's reader rung (P-164):** climb batch 28 (section 2, reason 2). It binds the reader trait's 10 methods and factories, adds its native object and carrier, ends `File`'s native component, and makes `Reader` and `FileReadStream` plain objects. F-32's count then falls by its 20.
- **The code generator's other walls:** F-34's kinds besides rungs G's and T's, and the partial type assumption that G leaves refused (fork G2); row 732 beside T (fork T2).
- **Row 896,** `getProperty` at an empty name: stays, beside rung S (fork S2).
- **Beside rungs A and E:** the five native number objects made private (item 372's other way; fork A3); strings, `Ratio`, `Char` and the literals printed by other names (fork A2); `value trait` on the number traits (item 371; fork E6), for the switch-over batch; the `=` of tuples of four or more (`NEW-E-1`; fork E7); `compiler_regressions/seqv.fss:22` and the prelude's `===` family, for the switch-over batch (forks E8, E9).
- **Rows 113 and 909, walk's `SEQV` on value objects and across number types:** rung E (P-168, P-166). Rung N asserts neither answer.
- **The fallback `=` over `Any`** (`Library/FortressLibrary.fss:96`): the specification's `Any` declares `SEQV` and no `=` (`Specification/basic-lib/objects.tex:47`), and the prelude declares no `=` over `Any`, so there a mixed `=` that no coercion carries is a static error, where the one library compiles it and answers by `SEQV` (fork N7; "The Fable review's probes for rungs N and F", probe R2). On the review list, for a later batch: `assert(x:Any, y:Any, …)` (`:307`), `deny` and every type without its own `=` lean on it.
- **The literals, 32:** N5, inside the names batch.
- **D2's 42:** as PLAN has them.
- **Rows 441, 442 and 523 to 525:** the prelude's own defects, which retire with it (P-38).
- **The stale citations of Appendix I:** row 905, for a later specification rung.
- **FACTS made stale by the landing:** F-32 and F-299 (the counts, and F-299's loader for A's two names), F-57 (walk's printed numeral classes), F-34 (the code generator's kinds), F-308 (`Char`'s last binding), F-151 and F-318 (the clause and the norm's `asFloat`), F-131 and F-311 (`Number`'s `=` and `asFloat`), F-321 (`System`), and the facts the rungs hand over: the commit stage's fold and the routing.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 26: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest, which the batch's generator reads.

### The generator

`compile-ladder/plan-27/manifest/` (`gen27.py`, `lists27.py`, `check27.js`) is the coordinator's, made from `plan-26/manifest/`. This planner's brief let it commit this record and its INDEX line only. It changes from climb batch 26's in these ways:

- the batch's values: `BATCH` `27`, its folder `compile-ladder/climb-batch-27/`, the output `manifest27.js`;
- the rungs from `lists27.IDS` in the manifest's order N, I, F, C, W, S, and now A, E, G, T after them (below);
- the briefings and checks of section 1, with their reasons, each key checked on the base with `facts-extract.sh --check`;
- every section naming the count stage and the distance stage as stages its rung runs once on its final tree (section 3, fork 3), where climb batch 26's generator checked that three of its four sections named neither;
- no speed pass, and rung N landing only with F (`landsOnlyWith`);
- `--without` taking any rung, should Question 1 drop one before the launch.

The generator committed at `7aa2b1940`, and the block it spliced into `climb-batch-workflow.js`, predate the rewrite of rungs N and F. Before the launch the coordinator brings them up to this record: `gen27.py` asserts that the common field "lands only with" is "none" and reads no rung's own, so it reads N's block and writes `landsOnlyWith: ['F']` for N, and its comments and the block's header stop saying that no rung lands only with another; `lists27.py` takes N's 22 keys and F's 22 from section 1 as rewritten, with their reasons and checks, in place of the 14 and 16 it holds; `check27.js` expects N to land only with F and no other rung to land only with another, as `check17.js` did for rung L; then the splice is made again and `workflow-scenarios.js` run on it ("Before the launch", step 3).

The planner checked every key of section 1 with `facts-extract.sh --check` on `main` at `e95fd785e`, the keys into this record against it as written: each matched one place. The second planner checked every key of all six on `main` at `c1906ac71`, the keys into this record against it as rewritten for P-165: each matched one place. The briefings then print about 36K tokens (N), 28.7K (I), 32K (F), 33.2K (C), 29.7K (W) and 22.4K (S), against 24.7K, 24.5K, 22.5K, 29.0K, 25.6K and 18.1K for the record at `6afd874ea`, and 23.4K to 29.7K in climb batch 26. The forks, 24.3K bytes against 14.3K at `6afd874ea`, are in all six and add about 4K tokens to each; N's and F's briefings add their new keys and the probes of rungs N and F, 9.5K bytes. The second Fable review checked all 108 keys on `main` at `7785a331b`, each matching one place, and cut P-74 from N's and F's lists and P-96 from N's, about 0.5K and 0.4K tokens: the skill carries both (`revival-changes.md`, "Numbers", and `library.md`, "The curator's decisions on the library"; `specification.md`, "Changing the text: the revision form"), and rung N's section lists the 21 coercions from the apis. A brief of this length still serves its worker: each key is one that the section cites, and the one part no rung needs whole is the other rungs' forks, about 11K bytes of the 24.3K for N and 14K for F; giving each rung its own forks is a change of the generator's one forks key, the coordinator's call. A change to the forks changes these sizes.

Rungs A, E, G and T, added after the generator's update at `d9d515a8f`, change it again before the launch: `lists27.IDS` gains `A`, `E`, `G` and `T`, after `S`, so that the manifest's order is N, I, F, C, W, S, A, E, G, T, the gather's reading order; `lists27.py` takes their briefings, checks and reasons from section 1 (A 26 keys and 14 checks, E 28 and 17, G 11 and 7, T 10 and 5); `gen27.py` writes their blocks from section 1's common fields, none landing only with another and none declaring a count, a crash or a move; `check27.js` expects ten rungs, N alone landing only with F, and every section but G's and T's naming the count stage and the distance stage as stages its rung runs once on its final tree, G's and T's naming neither (section 3, fork 3); then the splice is made again and `workflow-scenarios.js` run on it. This third planner checked every key of A, E, G and T with `facts-extract.sh --check` on `main` at `1176c7979`, and again at `eef4072a9`, which `main` reached by records only while the record was drafted, the keys into this record against it as written: each matched one place. Its briefings print about 23.6K tokens (A), 23.8K (E), 14.8K (G) and 11.3K (T) without the forks, and 42.2K, 42.6K, 33.6K and 30.1K with them. The forks, every rung's key, now print about 46K bytes (46,272 at `648d15a76`, with fork 56), about 19K tokens, against 24.3K bytes before: section 3 gained forks 36 to 56, so each of the six first rungs' briefings grows by about 9K tokens, N's to about 44K. The Fable review of the four rungs judges that the whole does not belong in every briefing: give each rung the batch's forks 1 to 8 (6.5K bytes), its own block (0.8K bytes for C to 7.8K for E) and the blocks of the rungs that share a file with it (E, G and T each other's, with fork 55; N and F each other's; A and F's), about 10K to 18K bytes a rung; it is a per-rung forks key for the generator's worker to build, since section 3's blocks are bold paragraphs that `doc:…#HEADING` cannot address alone (the `@WORDS` filter on the fork labels, as `@A1`, or `####` headings in section 3, are the two ways).

### What every agent reads first

This run is climb batch 27, the fifth batch of the plan's phase 4, the switch-over. It takes 46 of the 143 bindings that still name a glue class off them, so that 341 of the library's 438 live bindings then name helpers (section 2, the natives' count), opens the library's `Number`, gives `SEQV` the specification's meaning on both paths, and takes two walls of the code generator. Its ten rungs:

- N, P-160's second step and P-165: `Number`'s `comprises` clause, `asFloat` and `=` struck, each number type's own `asFloat` declared in its api, each coercion spelled as a pair of `=`, the vector norm declared at each number type, and the reflective generator given a fixed choice of the library's number types;
- I, P-162's integers' rung: the 16 shifts and powers of the five integer types, each a converting declaration around a bare binding at the narrow header, with about 9 new helpers;
- F, P-162's floats' rung under P-165: `random`, `Float`'s `atan2` and `printThreadInfo` at `RR64`, `Float`'s power over `AnyIntegral` by each type's own `asFloat`, the `RR64` trait's `^` and `atan2` at `RR64`, and group 3's six on one-line helpers;
- C, P-163: `Char`'s `asExprString` on the completed helper, the parser's choices of hexadecimal digits tried longer first, and the specification's list of character-literal forms revised in Appendix I's form;
- W, P-164's writer rung: `stdOut`, `Writer`, `BufferedWriter` and `FileWriteStream` as plain objects over a Java-backed `JavaBufferedWriter`, which walk carries by name and the checker's table names;
- S, item 355's option 1: `System`'s two natives onto `stringOps`, so that the checker can read `System`;
- A, P-167: `Object`'s `ilkName` and `SEQV` over `Any` on the compiled path's helpers, which walk's loader answers with its own operations, `Object`'s `asString` written as `self.ilkName`, and walk's ilk naming the five native number objects by their traits, `ZZ32` for `Int`;
- E, P-168 and P-166: `SEQV` by the specification's rule in walk's value classes and in the compiled helper `equality.sEquiv`, the code generator marking value objects, `Ratio` and the two numeral objects value objects, and the specification's lists of value and reference objects revised;
- G, row 818: the code generator compiles a type assumption, `e asif T`, at a method call and at a call that it fixes;
- T, row 733: the code generator compiles an object whose first supertrait is an imported api's trait.

Each rung has tests that fail on the base and pass after, and guards that pass on both. No rung changes the checker's checking code, and none makes a speed pass, unless rung T's fix must reach the checker's trait table. Every rung but G and T changes text that the stages read, so each runs the count stage and the distance stage once on its final tree, against climb batch 26's landed 0 and 0 (F-53); G and T change only the code generator. Two rules hold for every rung's tests, since rungs A and E change answers that every test can meet: assert no name `Int`, `Long`, `BigNum`, `Float` or `UnsignedLong` as `ilkName`, `asDebugString` or a generic's printed name gives it, which A changes to the trait's name; and assert no `SEQV` answer for numbers of two types, for value objects without body fields or for two strings built apart, nor the `=` of a tuple of four or more that holds a string, which E changes. No rung builds on another, only N lands only with another, F, and no two change one declaration. The gather composes them, corrects the Appendix I sentences that the rungs make false, builds the specification once and runs the 52 team demos on the merged tree. `ant testSpecData` runs in the gate because the landed summary has it.

### Before the launch

The coordinator:

1. **The curator's go,** with Question 1's answer or its default (the `coordinator` skill's `references/batch.md`, "The go"). The Fable review of this record is done (`6afd874ea`); rungs N and F were rewritten after it for P-165, and a second Fable review read the two sections; a third read rungs A, E, G and T (`climb-batch-27-review-2.md`); their changes are in the record.
2. **The two rows filed by plan** are in the ledger, 905 (`741f230da`) and 917 (`fd79e0352`); nothing is left to file (section 5).
3. **The generator,** brought up to this record as "The generator" above gives it, and committed; its checks run on this record as reviewed: `python3 -B explorations/compile-ladder/plan-27/manifest/lists27.py`, every key matching one place on the base; `gen27.py`; `check27.js` on a scratch splice; `check27.js --write`; `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script; the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
4. **The base build:** `/home/user/fortress-base27`, at `551b02858`, serves if the base differs from it only in record and tool files (`git diff --stat 551b02858 <base> -- Library ProjectFortress Specification build.xml bin` empty). Its trial seed and the old code's run, as the manual's "Before the launch", step 3.
5. **The disk:** `df -h /` against ten seeded worktrees, about 206 MB each, the base build and the stages' scratch folders; the probe showed 5.6G free at its start. `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver.
6. **Check-ins** armed for the run's length, about 7 hours, 45 minutes apart.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base27'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch27/launch-args.json`, since a resume needs them.

### The gate, and what it should show

The comparands are climb batch 26's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, over the fourteen, setting compile), in `compile-ladder/climb-batch-26/gate/`.

- `testSystem`: 756, the comparand's sum (184, 193, 183 and 196), plus the planner's named walk tests: N 5, I 1, F 2, C 1, W 1, A 1, E 2, G 1, T 1, so about 771, and any more that the rungs add. C extends one walk guard in place; A respells 48 lines of two revival tests and E nine lines of two tests in place.
- `testFast`: the compiler track 1,432 plus the compiled guards of I, F, W, A and E (a link and a run each, 10), G's run test and its `XXX` compile test (3) and T's run test (a compile, a link and a run, 3), so about 1,448; C extends one guard in place and S retargets one; the library track 86, the other-compiler track 263, whose `SEQV` tests keep their verdicts under E's helper, and the misc track as landed.
- `testSpecData`: 130 green; neither C's edit nor E's adds an example.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: 85 programs at `pass`; no rung declares a move.
- The checker count: 0, reported, not declared. Every rung but G and T changes what it reads, so a site is to be traced to one rung's edit. W's two table entries and `fileOps` read whole, and `equality` read whole through A's binding with E's helper in it, are the newest reading.
- The distance, reported and never red (P-39): 0 over the fourteen, `#crash none`; `compare.sh` prints 'DISTANCE SAME   0'.
- The 52 team demos at the gather, each reaching its end (F-283); A changes the printed name of a value whose type holds a native number object, and E the `SEQV` answers that the fallback `=` gives.
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30). Rung F's bare power at a `ZZ32` exponent is on the model's path, and rung W's writer prints its lines. The model calls none of A's and E's three natives, measured under walk (`reviews/any-carrier-2026-11-06.md`, section 5), and holds no `asif`.

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`.

- **Filed by plan:** two, 905 and 917, already in the ledger (section 5).
- **New by plan:** `NEW-C-1`, the parser's two gaps, closed with rung C's commit; `NEW-E-1`, the tuple limit (E), open.
- **Closed:** 916 (A), its test `AnyNativesIntrinsicWalk`, with a `--note` naming the coordinator's rider, since `ledger.py` takes `--settled` only for a `CONTESTED` row; 861 (C), `--settled` naming P-163; 895 (S), `--test none` with its note (fork S2); 434 (N), its test `NumberMixedEqualityWalk`; 113, 909, 910 and 911 (E), their test `StrictEquivalenceRuleWalk`; 906 and 907 (E), their test `StrictEquivalenceRuleCompiled`; 733 (T), its test `TraitTableApiTraitCompiled`.
- **Rewritten:** 596 (N), its claim narrowed to its `Exception` half; 551 (N), its notes; 896 (S), its notes' helper path; 321 (A), narrowed to the prelude's `Object`; 364 (A), walk's printed text at the trait's name; 908 (E), narrowed to the prelude's `===` on floats; 818 (G), narrowed to a call with a partial assumption, its reproducer G's `XXX` test, or closed if every form compiles.
- **Rewritten where I's helpers alter what they say:** 441 and 442 (I), whose rows have no room for a note (12 and 3 characters), so I's `record.md` gives each its whole new line.
- **Noted:** 872 (F), a short note that `flatConcat`'s new helper is a sibling site of the row's; by a rewrite if it does not fit.
- Where `ledger.py` refuses a note for length, the gather writes it by a rewrite.

### After the landing

The landing report; the routing of every item for the curator into PLAN, this record's question and forks among them, review-queue items 371 and 372 among them; FACTS: F-32 and F-299 (the counts, by the gather's count of the merged tree, F-32 down 3 and F-299 up 2 for rung A, and F-299's loader for A's two names), F-57 (walk's printed numeral classes), F-34 (the kinds of rungs G and T), F-308 (`Char`'s last binding moved), F-151 and F-318 (the clause gone), F-131 and F-311 (`Number`'s `=` and `asFloat` gone), F-321 (`System` read), and the facts the rungs hand over; the skill writer's task with the batch's sentences made false, `interpreter.md`'s carriers among them; the post-batch review. Then climb batch 28: the integer conversions and N4's reader rung (section 2).

## 7. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [CLIMB-BATCH-26.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-26.md), [CLIMB-BATCH-25.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-25.md), [climb batch 26's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-26-review.md), [climb batch 25's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-25-review.md), [climb batch 26's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-26/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Reviews: [Number's closure](https://github.com/palimondo/fortress/blob/main/explorations/reviews/number-closure-2026-11-05.md), [the integer conversions](https://github.com/palimondo/fortress/blob/main/explorations/reviews/integer-conversions-2026-11-06.md), [the hard-set natives](https://github.com/palimondo/fortress/blob/main/explorations/reviews/hard-set-natives-2026-11-06.md), [Char's asExprString](https://github.com/palimondo/fortress/blob/main/explorations/reviews/char-asexprstring-2026-11-06.md), [the I/O objects](https://github.com/palimondo/fortress/blob/main/explorations/reviews/io-objects-carrier-2026-11-06.md).
- The map: [compile-path-walkthrough.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/map/compile-path-walkthrough.md), [spec-to-implementation.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/map/spec-to-implementation.md), [README.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/map/README.md).
- Library: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss), [FlatString.fss](https://github.com/palimondo/fortress/blob/main/Library/FlatString.fss), [ReflectiveQuickCheck.fss](https://github.com/palimondo/fortress/blob/main/Library/ReflectiveQuickCheck.fss), [Writer.fss](https://github.com/palimondo/fortress/blob/main/Library/Writer.fss), [File.fss](https://github.com/palimondo/fortress/blob/main/Library/File.fss), [System.fss](https://github.com/palimondo/fortress/blob/main/Library/System.fss).
- Code: [StaticNativeApp.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java), [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java), [fileOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java), [systemOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java), [stringOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java), [simpleChar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java), [Literal.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Literal.rats), [Int.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java).
- Specification: [lexical-structure.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/lexical-structure.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
