<!-- Chunk f14 of the FACTS clarity assessment: F-249, F-252, F-253, F-257, F-258, F-259, F-152, F-154, F-155, F-156, F-157 and F-158, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `4caa90c81`. -->

# FACTS chunk f14: assessment

The base is `main` at `4caa90c81`; `FACTS.md` there is as at `a898e1baf`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the ledger rows, the tests (each cited test exists), the library and the code. I ran no experiment and searched no transcript. Where only a run would settle a point, the point is a question (F-155).

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-249 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-252 | **fail** | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-253 | **fail** | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-257 | pass | **fail** | pass | **fail** | pass | pass | **reword** |
| F-258 | pass | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-259 | **fail** | **fail** | pass | **fail** | **fail** | **fail** | **reorganize** |
| F-152 | pass | pass | pass | pass | pass | pass | keep |
| F-154 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-155 | unresolved | unresolved | unresolved | **fail** | **fail** | unresolved | **investigate** |
| F-156 | pass | pass | pass | pass | **fail** | pass | **reorganize** |
| F-157 | pass | **fail** | pass | pass | pass | pass | **reword** |
| F-158 | pass | pass | pass | pass | pass | pass | keep |

Counts: keep 2, reword 4, reorganize 5, investigate 1. Unresolved marks: F-155 on scope, present meaning, evidence and consistency, all from one question.

Three points cross entries:

- **"Own generic" is not defined.** F-252, F-253 and F-257 use the term, and neither the `fortress-repo` skill nor any other entry defines it. In the code (`ownGeneric`'s comment, `rung-existential-reduction/REPORT.md` section 1), it means a declaration with static parameters of its own: a generic function, a generic constructor, or a generic functional method of a trait or object that has no static parameters. It does not mean a functional method of a generic trait or object, or a dotted method. The writer should define it once, or say it in plain words in each entry.
- **F-155's question bears on F-252.** F-252 lists "instances of one generic type at different ground arguments do not exclude in the check (row 416)" among the limits of the declared-domain reading. That sentence is true of walk's parameter-by-parameter check. Whether the declared-domain reading of two generic declarations now sees that exclusion is F-155's question, and F-252's rewrite needs the answer before it words that limit.
- **Overlaps outside the chunk.** F-238 holds the same declared-domain reading as F-252, for the subset of pairs whose exclusion was withdrawn, and repeats F-252's Return Type Rule clause. It is a merge candidate for F-252's reorganization. F-246 holds the same `String` conversion as F-259's second claim.

## F-249, the route to the string objects' own `||`

- **Scope: fail.** The report states the route for a program that imports only the prelude. FortressLibrary imports FlatString's api, which declares FlatString's own `||`, and there `"s" || 5` reaches it directly (`perf-probes/symbolic-operators/REPORT.md` section 2.4, "What a marked meet shows"). The title drops that condition. Quoted: "Under walk, a program reaches the string objects' own `||` only through `String`'s abstract `opr ||(self, b:String)`."
- **Present meaning: pass.** The route still stands on the base. `String` keeps its abstract `opr ||(self, b:String)` (`Library/FortressLibrary.fss:4398`, `.fsi:2496`), and `FlatString`'s api declares its own three `||` (`Library/FlatString.fsi:16-21`).
- **Evidence: pass.** Section 2.4 holds the marked meet (`"s" || "t"` printed `sMARKt`) and the `CatKinds` probe (under way JCp, `"s" || "t"` is a `CatString` of depth 1, where `main` gives a `FlatString` of depth 0). The entry does not say what kind of evidence this is. It was observed once, in probes on a patched library (the way JCp), and no gated test holds it. The rewrite should say so.
- **Comprehension: fail.** "A top-level meet that replaces it" expects the reader to know the proposal behind it: juxtaposition's device, which moves `String`'s `||` members to the top level (report section 2.2). It also expects the reader to know which pair the meet covers: `(Any, String)` and `(String, Any)`. Quoted: "So a top-level meet that replaces it must delegate to declarations that an imported api states, or every concatenation runs the meet's own body".
- **Ownership: pass.** One subject.
- **Consistency: pass.** It agrees with F-246, which keeps `String`'s operators where they are, and with F-245.
- **Disposition: reword.** Scope the route to a program that imports only the prelude, name the device and the pair that the meet covers, and say that this is a probe observation.

## F-252, walk's declared-domain reading of two generic declarations

- **Scope: fail.** The title says that every such pair is read on its declared domains. A pair with a varargs parameter, or with parameter lists of different lengths, is not read there: `genericPairValid` returns `NOT_READ` (`OverloadedFunction.java:894-897`), and F-257 lists these pairs. Also, the title names "two functions with static parameters", but the body applies the equal-domain refusal, and row 759's case, to a generic declaration beside a plain one. Quoted: "Under walk, two functions with static parameters that no pair of parameter types excludes are read on their declared domains, each over its own instances, by the No Duplicates, Return Type and Meet Rules".
- **Present meaning: pass.** It states the current reading. It uses no batch handle.
- **Evidence: pass.** The nine cited tests exist. The code holds each claim on the base: `validOnDeclaredDomains` sends a pair of two own generics to `genericPairValid` (`:770`), the `sameDeclaredDomains` branch raises the No Duplicates message (`:538-540`, `:854`), and `returnRuleAtEveryInstance` is called at `:905` and `:909`. The reports hold the rest: `rung-walk-generic-pairs/REPORT.md` sections 1 and 5, its `SKEPTIC.md` section 2 (both Return Type examples, with the checker's refusals), and `rung-existential-reduction/REPORT.md` section 5 (row 759, on walk and on the checker). One citation is wrong. "`genericPairValid` (`...OverloadedFunction.java:766`)" names the wrong method: at `5262a2412`, line 766 is `validOnDeclaredDomains`; `genericPairValid` was at `:891` there and is at `:894` now. The line numbers are also unpinned and come from different commits: `:533-540` and `:806` are `6d187d069`'s.
- **Comprehension: fail.** The entry is 3170 characters long, in sentences of many clauses. The revival's terms are not defined: "own generic", "the parameter check orders it", "read ... each over its own instances". The row 416 limit is placed among the limits of the declared-domain reading, so the reader takes it as a limit of that reading (see the second cross-entry point above). Quoted: "a pair it passes by order, one at least an own generic and the other an own generic or plain, whose declared domains each lie inside the other is refused, "fails because their parameter lists have the same types" (`:533-540`, `sameDeclaredDomains` `:806`), since the check reads a type parameter as strictly below its bound."
- **Ownership: fail.** At least three claims change apart: (1) two own generics are read on their declared domains, with that reading's limits; (2) the No Duplicates refusal of a pair that the parameter check passes; (3) the Return Type Rule read at the instance that stands for every applicable instance, the skeptic's fix. Row 759's difference from the checker is a fourth. The code lines are detail for the report. F-238 holds the same reading for a subset of pairs (merge candidate). Quoted: "The Return Type Rule, where one of two own generics lies inside the other, is read at the instance of the outer one that holds the inner one's declared domain only where that instance stands for every instance applicable to an argument of the inner one (`returnRuleAtEveryInstance`, `OverloadedFunction.java` at 36afa7eb1): ..."
- **Consistency: pass.** It agrees with F-27 ("by the same rules (F-252)"), F-238, F-253 (a generic dotted method), F-257 (the messages) and F-258 (the whole-type reading, with row 787's exception). The one open point is F-155's question, which the rewrite must settle before it words the row 416 limit.
- **Disposition: reorganize.** Split the No Duplicates refusal and the Return Type Rule's every-instance reading from the main reading. Consider merging F-238 into the main entry. Move the code lines to the reports. State the exceptions that are not read, and define "own generic".

## F-253, walk's inference of a generic method's own static arguments

- **Scope: fail.** The title is about "a dotted call", but the body also says how walk chooses an inherited generic functional method. A functional method is called as `f(x)`, not as a dotted call (row 765, the same repair: `rung-walk-trait-method-bounds/REPORT.md` section 1). Quoted: "An inherited generic functional method beside an object's plain one is chosen where only it applies."
- **Present meaning: fail.** "Rung L" is a batch handle. F-248 names the same declaration "the team's generic `distribute` over `K`". Quoted: "Rung L's generic `distribute` then runs the nested reductions under walk (F-248)."
- **Evidence: pass.** The six cited tests exist. The code lines check at `5c5dee93d`: `GenericMethod.getTypeEnv` at `GenericMethod.java:106` returns `evaluationEnv` for a trait's method; `EvaluatorBase.java:491`, `:567`, `:646` and `:651` read `declarationEnv`; `:886` builds `inferByUnification`'s environment from `getWithin()`. The values (`Box[\ZZ64\] 3:ZZ64`, `Empty[\Number\]`) and the two error texts are in `rung-walk-trait-method-bounds/REPORT.md` section 4 and its `SKEPTIC.md` section 3.
- **Comprehension: fail.** "As an own generic is" uses the undefined term. "The unification keeps the team's read" leaves the reader to work out that `inferByUnification` still evaluates the bound in `getWithin()`, the environment that the team's code used. Quoted: "the unification keeps the team's read (`EvaluatorBase.java:886` at 5c5dee93d)".
- **Ownership: fail.** The list of code sites is detail for the report, and it buries the claim. Quoted: "(`GenericMethod.getTypeEnv`, `interpreter/evaluator/values/GenericMethod.java:106`, read at `EvaluatorBase.java:491`, `:567`, `:646` and `:651` at 5c5dee93d)".
- **Consistency: pass.** It agrees with F-248, with F-250 ("from `743eb5286` on, walk infers that call (F-253)") and with F-252's sentence on a generic dotted method.
- **Disposition: reorganize.** Move the code sites to the reports. Retitle the entry to cover the generic methods that a trait declares, called either way, or give row 765's sentence its own scope. Replace the handle with a description of the declaration.

## F-257, walk's refusal names the rule

- **Scope: pass.** The entry is about walk, and it names the pairs that are read on their declared domains and the pairs that are not.
- **Present meaning: fail.** "Unchanged" compares the code with the code before climb batch 18's rung. Since then, rung P (F-258) has changed which pairs load: some Meet refusals now load. So, read as a present statement, the sentence misleads. Quoted: "Which pairs load is unchanged."
- **Evidence: pass.** `ruleFailure` is at `:817-839` at `5c5dee93d` (`:819` now), and its three messages match the quoted text. `validOnDeclaredDomains` (`:766`) and `genericPairValid` (`:891`) are at those lines at `5c5dee93d`. The eight tests exist. `rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3 give the pairs that keep the old message (varargs, measured on `RestPair.fss`).
- **Comprehension: fail.** The term "own generic" is undefined. Quoted: "a pair that is neither two own generics nor one own generic beside a plain declaration".
- **Ownership: pass.** One subject: the messages. The quoted messages are what the tests key on.
- **Consistency: pass.** The messages agree with F-252 (No Duplicates and Return Type), F-155 and F-238 (Meet).
- **Disposition: reword.** Say that naming the rule did not change which pairs load, without "unchanged", and define the term.

## F-258, exclusion read over the whole parameter type

- **Scope: pass.** The title says that both paths read by existential reduction, and the body gives the limits: the checker reads the first premise alone, without the bounds; walk reads no `where` clause, no varargs, and no lists of different lengths; and three differences between the paths are named.
- **Present meaning: fail.** The claim about the library is one measurement: an instrumented copy of the checker at `a93fb3bfd` (`rung-existential-reduction/REPORT.md` section 7). The entry states it as a property of a library that changes at every landing, and does not say that it is one measurement. Quoted: "On the interpreter's library `emptyED` is never reached: `subtypeED` shows all 691 meets the count stage tests empty."
- **Evidence: pass.** The code lines check: `domainsExcludeTogether` at `:935` at `a93fb3bfd`, `excludesAtMeet` at `:1041` at `84957e6ef`, `OverloadingOracle.scala:326` (`sa.subtypeED(md, BOTTOM) || sa.emptyED(md)`), `TypeSchemaAnalyzer.scala:444`. The seven tests exist. Rows 786, 787 and 788 state the three differences. Report sections 1, 2 and 5 hold the rest.
- **Comprehension: fail.** "Such a pair" points back to "two type parameters whose bounds exclude (row 786)". But row 787's pair excludes only together, `o[\T\](x: P[\T\], b: Box[\T\]) where { T extends Object }` beside `o[\T\](x: Q[\T\], b: Box[\T\])`. Its bounds do not exclude. Quoted: "and on such a pair one of whose declarations has a `where` clause, which walk refuses and the checker accepts (row 787)".
- **Ownership: fail.** Walk's chain of methods (`genericPairValid`, `validOnDeclaredDomains`, `domainsExcludeTogether`, `mayBeEqual`, `meetParams`, `excludesAtMeet`), with line numbers at two commits, and the checker's `OverloadingOracle.excludes`, `emptyED` and `subtypeED`, with theirs, are detail for the report. They take most of 2652 characters and bury the claim and the three differences between the paths. Quoted: "Walk: the Meet branches of `genericPairValid` and of `validOnDeclaredDomains`'s generic-beside-plain reading also ask `domainsExcludeTogether` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:935` at `a93fb3bfd`), which reads bounds where `mayBeEqual` and `meetParams` read them ..."
- **Consistency: pass.** F-252 and F-238 cite it as the whole-type reading, with row 787's exception. F-155 may conflict with it, and that is F-155's question.
- **Disposition: reorganize.** Keep the rule, its limits, the three differences and the tests. Move the method chain and the line numbers to the report. Bound the 691-meet count to its measurement, and fix the referent of "such a pair".

## F-259, `extends Any` and the `String` conversion

- **Scope: fail.** The title says "on both paths", but the concatenation results are walk's. The conversion is in the interpreter's library, and the compiled path links its own prelude (`rung-string-conversion/REPORT.md` section 5, "The conversion does not reach the compiled path"). The sentence names no path. Quoted: "So a tuple or `()` concatenates on the left of a string, and a function or a tuple of seven or more elements beside one raises `CastError`."
- **Present meaning: fail.** The numbers are the before and after of one landing, measured on `7ba1a846d` (report section 4). The entry does not name that tree, and the counts have their owning entries. Quoted: "the distance's three `String` sites are gone: 34 to 31, the count 30 to 28".
- **Evidence: pass.** `namesOnlyAny` is at `PreDisambiguationDesugaringVisitor.java:60`, called at `:76`. The two bodies are at `Library/FortressLibrary.fss:4411-4412`. `FlatString.fsi:16` states the component's header and has no `opr ||(a:FlatString, self)`. The three tests exist. Report sections 1, 4 and 5 give `extendAny`'s `Infinity`, the counts and the values. Row 743 is FIXED.
- **Comprehension: fail.** The title does not parse. Quoted: "is an `Object` on both paths, and such an object expression under walk, and `String`'s two `||` members over `Any` convert by the library's own way."
- **Ownership: fail.** Two claims change apart. One is the desugaring of an `extends` clause that names only `Any`, row 743, on both paths. The other is the conversion in `String`'s two `||` members over `Any`, under walk, in the interpreter's library. With them come FlatString's api line and two copied counts. F-246 already holds the conversion's way.
- **Consistency: fail.** F-246 gives the effect of the same change as "49 to 46", and F-259 gives it as "34 to 31". Each was measured on a different base tree, the probe's and the rung's, but neither entry names its tree. Quoted: F-259 "34 to 31, the count 30 to 28"; F-246 "give 49 to 46, nothing new".
- **Disposition: reorganize.** Split the desugaring fact from the conversion fact, and consider merging the second into F-246. Name the path for the concatenation results. Drop the counts, or bound each one to its tree and point to the entry that owns the count.

## F-152, `Vector` and `Matrix` are the only array traits with an algebra

- **Scope: pass.** `Array1`, `Array2` and `Array3` extend no algebraic trait. `Vector` and `Matrix` extend `AdditiveGroup` and exclude `AnyMultiplicativeRing` (`Library/FortressLibrary.fsi:1616-1618`, `:1736-1738`). `Array3` excludes `AnyAdditiveGroup` (`:1812-1816`).
- **Present meaning: pass.**
- **Evidence: pass.** It rests on the api and on rows 292, 109, 293, 371 and 24. `reviews/array-design-ways.md` section 2 holds the `T^n` probe and both paths' messages. The library declares no `×` over an array.
- **Comprehension: pass.** One note: "their element must be a `Number`" is the necessary half of the bound. F-151 holds the whole bound, `{ Number, MultiplicativeRing[\T\] }`, and says that `Number` itself does not meet it. A pointer to F-151 would prevent the misreading, but its absence is not a failure.
- **Ownership: pass.** It is 596 characters with one subject.
- **Consistency: pass.** It agrees with F-151 and the rows.
- **Disposition: keep.**

## F-154, shared `nat`s stop a wrong-shape product at dispatch

- **Scope: fail.** The entry is about the library's products. The second message was observed at a declaration of the model, `pick` (case 7 of the mismatch probe, `apl/mg/NOTES-swap.md`, "What the shared nats catch"). Every library product (`juxtaposition`, `DOT`) is overloaded. The probe's thirteen cases are the model's `FlatArrays2` declarations and the library's `+`. The one library product measured is `DOT`, in row 254. Quoted: "For a name that is not overloaded it is a unification error that names the size."
- **Present meaning: pass.**
- **Evidence: pass.** The products' shared `nat`s are at `Library/FortressLibrary.fsi:1777-1800`. Row 254 (a mismatched `DOT`, a `ProgramError` that no `catch` takes) and the probe's case 1 (the `try`/`catch` that catches nothing) support the claim.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.**
- **Disposition: reword.** Say which declarations each message was observed at. The second message comes from a declaration that is not overloaded, and no library product is one.

## F-155, overloads that differ in the element type or the rank

- **Scope: unresolved.** The first claim may no longer hold for generic declarations (see the question).
- **Present meaning: unresolved.** The refusal and its message, "fails the Meet Rule", were measured at climb batch 18 (`rung-walk-trait-method-bounds/SKEPTIC.md` section 3, `SkF155`; `REPORT.md` section 3). Rung P (`a93fb3bfd`) landed after that measurement and added `domainsExcludeTogether` to the Meet branch.
- **Evidence: unresolved.** Every cited measurement (`rung-walk-generic-pairs/REPORT.md` section 5, and the two batch-18 runs) comes before rung P. Rung P's table (`rung-existential-reduction/REPORT.md` section 5) has no pair that differs in the element type, and no gated test holds the `h` pair.
- **Comprehension: fail.** "Such vocabularies" leaves the reader to work out that these are C4's `FlatArrays` and the APL program's `FlatArrays2`, which declare the same names. Quoted: "So two such vocabularies cannot stand in one component."
- **Ownership: fail.** The import-family claim (`NOTES-swap.md`, departure 6) is a separate subject from the element-type and rank pairs, and it changes apart from them. Quoted: "Walk checks as one family the overloads of one name that two imported apis declare, and an import alias does not separate them."
- **Consistency: unresolved.** By a reading of the code on the base, F-258's whole-type reading makes the `h` pair exclude. In `domainsExcludeTogether` (`OverloadedFunction.java:936`), `Array[\RR64,I\]` and `Array[\ZZ32,J\]` are instances of one generic type. `argsMayBeEqual` finds that `RR64` and `ZZ32` cannot be equal (`mayBeEqual`, `:1458`: two types that mention no static parameter are equal only where they are the same type). So the method answers true, and `genericPairValid`'s Meet branch (`:912`) answers `VALID`. That contradicts "are refused at load". Row 416 still holds for plain declarations, because `validOnDeclaredDomains` does not read a pair of two plain declarations.
- **Disposition: investigate.** The question: on the current tree, does walk load `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`, or refuse it with "fails the Meet Rule"? One walk run of the two-line pair settles it. If the pair loads, the first claim holds only for plain declarations (row 416), F-252's row 416 limit needs the same scope, and the entry then needs the reorganization above (split off the import-family claim).

## F-156, the missing vocabulary and the comment's authorship

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `Library/FortressLibrary.fsi` declares no reshape, ravel, gather, outer product or plane function (grep). The comment at `:2696-2701` blames to the revival's commits `c2b4e2c95` and `581356f32` (September 2026). `353818213` is jmaessen's commit of 2008-07-28, "Immutable arrays of unboxed RR64".
- **Comprehension: pass.**
- **Ownership: fail.** Three subjects change apart: the array vocabulary that the library lacks; the authorship of the scalar-extension block's comment, whose block is F-119's subject; and the team's one statement on per-type storage. Quoted: "The library has no reshape, plane, gather, outer product or ravel, and the comment on its scalar-extension block is the revival's, not the team's."
- **Consistency: pass.** It agrees with F-119.
- **Disposition: reorganize.** Keep the vocabulary claim on its own. Move the comment's authorship and the pointer to Maessen's commit to the entry that owns the block (F-119), or to the subject of the team's intent on storage.

## F-157, arrays as traits, and views

- **Scope: pass.** The costs and the override are stated for walk.
- **Present meaning: fail.** Both costs are single measurements: rows 298 and 299, at `b176a4b79`, on a 64 × 16 lift and at n = 16 and n = 64. The entry states them as current costs and gives neither the tree nor the sizes. Quoted: "Under walk the library's row slice `m[i,:]` costs five times a six-line user view (row 298). A diagonal as a `Matrix` view costs 13 to 54 times a row-scaling operator (row 299)."
- **Evidence: pass.** Rows 298 and 299, and `run-c4/probes/vocabulary/diag-override.md`, "Result", hold the numbers and the override (`replica` counted once for each product through `Diag`). "The language's own idiom" is from `run-c4/probes/vocabulary/REPORT.md`, question 3, which cites row 150, and not from the note that the entry cites.
- **Comprehension: pass.**
- **Ownership: pass.** One subject: views over arrays.
- **Consistency: pass.**
- **Disposition: reword.** Bound each cost to its measurement, or leave the numbers to rows 298 and 299. Cite the source of the idiom.

## F-158, `fill` and `tabulate`

- **Scope: pass.**
- **Present meaning: pass.** `ProjectFortress/demos/mg.fss:20` still calls `.fill(I)`, and row 464 is NEGATIVE-VERIFIED.
- **Evidence: pass.** `StandardMutableArrayType` and `ImmutableArray1` define both (`Library/FortressLibrary.fss:2316-2323`, `:2409-2416`). `Vector` and `Matrix` redeclare them at their own types with the meet's bodies (`:2527-2534`, `:2848-2855`). The factories are at `FortressLibrary.fsi:1644`, `:1651`, `:1756` and `:1869`. `copy` is declared on the meet (`:2324`; row 467 FIXED). `tests/TabulateRungA.fss` exists.
- **Comprehension: pass.** One note: in "Its factories", the word "Its" points loosely, to the function form. A reader can still restate the fact.
- **Ownership: pass.**
- **Consistency: pass.** It agrees with P-89, F-49 and F-264.
- **Disposition: keep.**
