<!-- The FACTS clarity pass, chunk f14, 2026-10-22: the checker's comparison of each rewritten entry (F-249, F-252, F-253, F-257, F-258, F-259, F-154, F-156, F-157 and the four split from them, F-?1 to F-?4) with the record and its sources, and of the cold reader's answers with the source meaning, each failure classed. -->

# Chunk f14: check

Read on `main` at `772a5a2af`; the record's entries, `OverloadedFunction.java` and the library are as at the writer's base `4caa90c81` for every line cited here. Sources read: `facts-extract.sh 'F-N+'` and `'history:F-N'` for the nine entries; `assessment.md`, `proposals.md`, `clean.txt` (verbatim in `proposals.apply`: every line of it is there), `concepts.md` and `cold-read.md` in this folder; the report sections that each entry cites; the code and tests named below. I ran no program: the one question that needs a run is left to its run (F-252, row 416).

Classes: **fidelity** (the rewrite says more or less than its source), **concept** (the reader lacked a term), **wording**, **uncertain** (what source settles it, and whether I settled it).

## F-249, the route to the string objects' own `||`

**Fidelity.**
- "The string objects are `FlatString`, `Concatenable` and `EmptyString`." `Concatenable` is a trait (`Library/String.fsi:16`); the objects that take its `||` are `CatString` and `SubString` (`String.fsi:22`, `:28`), and `EmptyString` extends it too. The source says "FlatString's, Concatenable's and EmptyString's `||`" (`symbolic-operators/REPORT.md` section 2.4) and "the String component's objects' own `||`" (section 0). This is also why the reader asked what `CatString` is. **Wording:** "The string objects' own `||` are those that the objects `FlatString` and `EmptyString` declare, and that the trait `Concatenable` declares for the objects `CatString` and `SubString`."
- "with a body of its own, `"s" || "t"` gives a `CatString` of depth 1". The source measured one body, way JCp's `if |b| = 0 then a else concatAndBalanceIfNecessary(a, b) end` (section 2.2). Way JC's `typecase` meet without the `String.fsi` lines did something else: it "re-entered itself ... until the JVM failed" (section 2.4). So "a body of its own" generalises from one body. The old entry says the same, so the rewrite inherits this. **Wording:** "with the body that the probe tried (way JCp, `Concatenable`'s), `"s" || "t"` gives a `CatString` ...".
- The rest holds: the route and the condition on the prelude ("A program that imports only the prelude reaches ... only through String's abstract `opr ||(self, b:String)`", section 2.4); the direct route inside `FortressLibrary` (section 2.4, "What a marked meet shows"); the three top-level declarations and their meet (sections 2.1, shape D, and 2.2); and "observed once" (section 2.3; no test names `CatKinds`).

**Comprehension.** The reader's account matches the source. It differs in four places.
- "an imported api states": imported by whom? The source settles it. The meet is declared in `FortressLibrary`. It reaches `FlatString`'s `||` because `FortressLibrary` imports `FlatString`'s api, and way JC needed five lines in `String.fsi` so that it reached `Concatenable`'s and `EmptyString`'s (sections 2.2 and 2.4). **Wording:** "must then delegate to the string objects' own `||`, which `FortressLibrary`, where the meet is declared, sees only where an api that it imports states them: `FlatString`'s api does, and way JC adds five lines to `String.fsi` for `Concatenable`'s and `EmptyString`'s."
- `CatString` is not among the listed objects. See the fidelity point above.
- "depth" is undefined. It is used by this entry alone, so define it here (**concept, in the entry**): "of depth 1, one level of concatenation, where ... a `FlatString` of depth 0". `FlatString`'s `depth` is 0 (`Library/FlatString.fss:42`).
- "Observed once" leaves its scope open. **Wording:** "The route and these results were each observed once, in probes on a patched library (way JCp); no gated test holds them." Also "every concatenation" should be "every concatenation of two strings in such a program". Code inside `FortressLibrary` still reaches `FlatString`'s own `||` (section 2.4).

## F-252, the declared-domain reading of a refused pair

**Fidelity.**
- **Dropped condition.** The new text reads: "a pair whose domains exclude when read whole also loads (F-258)". The record says: "is read over its whole parameter type where neither has a `where` clause of its own (F-258; row 787)". The code returns false for a declaration with a `where` clause (`domainsExcludeTogether`, `OverloadedFunction.java:943`), and row 787's pair is refused, "fails the Meet Rule". **Wording:** "a pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787)".
- **Uncertain: the row 416 sentence**, "The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]` (row 416)." This is true of the parameter check, and row 416's own pair is two plain declarations. In this entry the sentence sits among the limits of reading two declarations with static parameters of their own. So a reader takes it that such a pair, `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`, stays refused. That was measured before rung P: `rung-walk-generic-pairs/REPORT.md` section 5 says "refused, the same (row 416)", and `rung-walk-trait-method-bounds/SKEPTIC.md` section 3 (`SkF155`) says "fails the Meet Rule". Since rung P, `domainsExcludeTogether` is asked in that Meet branch (`:912`). The assessment reads it as making the pair exclude (`:936`, `mayBeEqual` `:1458`), so the pair would now load. What settles it: one walk run of the two-line pair, which is the coordinator's F-155 investigation. I did not run it, since this brief changes nothing. **Wording** that is true either way: "... such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416)". Add a sentence only if the run shows that the pair loads.
- The rest holds. The title's scope matches the code: `validOnDeclaredDomains` is called only under `!distinct && !overloadOk()` (`:530-531`), and `genericPairValid` returns `NOT_READ` for varargs and for lists of different lengths (`:897`). The definition matches `ownGeneric` (`:2449-2451`, and its comment). One precision, not a failure: a pair of different lengths without varargs is never compared at all (`completeOverloadingCheck` returns at once, `:376-381`), so "parameter lists of different lengths" adds nothing beside "a varargs parameter".

**Comprehension.**
- **Scope.** The reader read the second reading two ways, for refused pairs only or for every pair. That came from three places. `interpreter.md` ("What walk checks") says: "For every pair of functions of which at least one is generic, it loads the pair only if the No Duplicates Rule, the Meet Rule and the return-type rule hold on their declared domains". F-?1 covers ordered pairs too. F-?2's title drops the condition (below). **Concept**, `references/interpreter.md`, "What walk checks", as `concepts.md` proposes: walk's load check compares a pair parameter by parameter. A pair that it finds excluding loads. It reads a pair that it refuses again on the declared domains, and it reads a pair that it orders only for the No Duplicates Rule. That skill sentence should say so, rather than "every pair".
- **Wording, the Meet search:** "the two parameter types are instances of one generic type or static parameters". The code is `matchApart` (`:1288-1313`). Two types match if they are equal, or if either one is a static parameter, or if both are instances of one generic type whose static arguments match in the same way. **Wording:** "only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539)".
- **Row 416:** see above.
- **Wording, the call sentence:** "a generic dotted method the same way, except where ..." The exception is the dotted method's alone (`ownGeneric`'s comment, `:2439-2447`; `rung-walk-method-sargs/REPORT.md` section 1, part B). **Wording:** "At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. It compares a generic dotted method in the same way, except where exactly one of the two declared domains lies inside the other; there it chooses the inner one (F-253)."
- **Concept: "declared domain".** The skill defines it only in `revival-changes.md`, which the reader did not load. It belongs in the `fortress-repo` core, beside overloading, as `concepts.md` says.

## F-?1, equal declared domains (new, from F-252)

**Fidelity.** It holds. The two branches are `sameDeclaredDomains` for an ordered pair (`:538-540`, `:854-869`), and `NO_DUPLICATES` from `genericPairValid` (`:903`) or `validOnDeclaredDomains` (`:789`) for a refused pair. The `h` pair is from `rung-walk-generic-pairs/REPORT.md` section 5. Row 759 is the ledger's cell and `rung-existential-reduction/REPORT.md` section 5. The added gates `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` were keyed from the parameter check's message to No Duplicates (`rung-walk-trait-method-bounds/REPORT.md` section 3), so they test the refused branch.

**Comprehension.** It matches. The reader also inferred why the checker accepts row 759's pair: the compiled path bounds an unwritten type parameter by `Object`. `revival-changes.md` and `rung-existential-reduction/REPORT.md` section 5 support this. **Pass.**

## F-?2, the Return Type Rule at every instance (new, from F-252)

**Fidelity.** **Dropped condition.** The title reads "where one of two declarations with static parameters of their own lies inside the other, the load check reads the Return Type Rule at one instance ...". `genericPairValid` is reached only for a pair that the parameter check refuses (`:530-531`, `:770`). A pair that it orders keeps its own return-type check on the declared ranges (`:517-525`). In the old F-252, the sentence followed the refused-pair sentence, and the split loses that context. **Wording:** "Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own and one lies inside the other, ...". The rest holds against `rung-walk-generic-pairs/SKEPTIC.md` section 2 and `returnRuleAtEveryInstance` (`:1069-1124`).

**Comprehension.** The reader raised four points, each a **wording** failure that the source settles.
- "the outer declaration's instance that holds the inner one's declared domain": this is the one instance that walk's inference finds (`instanceHolding`, `:901-902`; SKEPTIC section 2, "the one instance that walk's inference finds holding the inner's declared domain"). **Wording:** "The instance is the one that walk's inference finds for the outer one at the inner one's parameter types."
- "a type parameter of its own that is the type of no other parameter": the code (`:1103-1116`) asks that the inner one's returned type parameter be the whole type of at least one of its parameters. It must also appear in no parameter type except at positions where the outer one's parameter type is the outer one's returned type parameter.
- "at a position whose type is that returned type parameter": that is the outer one's parameter type (`:1118-1121`, `deRest(dOut.get(k)) == p`).
- **Wording** for both: "In the second, the outer one returns one of its own type parameters, and the inner one either returns a type parameter of its own that is the whole type of some of its parameters and appears nowhere else, at positions where the outer one's parameter type is that returned type parameter; or has, at such a position, an object type below which its return type lies."
- `Round`'s kind: the tests declare `trait Shape`, `trait Round extends Shape` and `object Circle extends Round` (`tests/GenericReturnRuleOuterParamWalk.fss:6-8`). Name them in the entry.

## F-253, inferring a generic method's own static arguments

**Fidelity.** It holds. The widened title is supported: a generic functional method is inferred as a generic function is (`rung-walk-trait-method-bounds/SKEPTIC.md` section 3, `SkFunctional*`), and row 765's choice is repaired by the same reading (`REPORT.md` section 1). The values and the two error texts are from REPORT section 4 and SKEPTIC section 3. "the team's generic `distribute` over `K`" is F-248's name for it.

**Comprehension.** Three points.
- **Wording.** "Among overloads, walk compares a generic dotted method with another on its declared domain where exactly one of the two declared domains lies inside the other." The reader asked whose domain this is, and what walk does otherwise. The source settles it: where one of the two is such a method and exactly one declared domain lies inside the other, "the inner one wins; otherwise `moreSpecificDeclaration` decides" on the call's instance (`rung-walk-method-sargs/REPORT.md` section 1, part B). **Wording:** "Among the receiver's overloads, where exactly one of two declared domains lies inside the other, walk chooses the inner one; otherwise it compares them on the instance that the call makes (F-252)."
- **Wording.** "reads its bounds ... where its instances evaluate their types" names no place, because the rewrite dropped the record's "in the trait's method environment". **Wording:** "reads its bounds, and the types to which its arguments convert, in the trait's method environment, where its instances bind and evaluate their types, as a method that an object declares does" (REPORT section 1).
- **Concept, in the entry.** "the trait's member environment": only this entry needs it. REPORT section 1 says that a trait's generic method has as its own environment "the trait's member environment, which has no parent", and that `inferByUnification` "still reads `getWithin()`". There the bound is not read (`revival-changes.md`: "the unification after the failed inference does not read the bound"). **Wording:** "For a trait's method, the unification still reads the trait's member environment, which has no parent, as the team's code did. So it does not read the bound, and the call fails with 'Cannot unify Int ... with Shape ... abm=K=(Int,Any)' ...". This replaces "fails with an error that reads no bound": it is the unification, not the error, that reads no bound.

## F-257, the refusal names the rule

**Fidelity.**
- **Dropped condition.** The new second sentence reads: "The load check reads a pair on its declared domains where both declarations have static parameters of their own, or one has them and the other is a plain declaration (F-252, F-27)." The code reads such a pair only where the parameter check refuses it (`:530-531`), plus the No Duplicates reading of a pair that it orders (`:538`). **Wording:** "The load check reads a pair on its declared domains where its parameter-by-parameter check refuses it and both declarations have static parameters of their own, or one has them and the other is a plain declaration (F-252, F-27); it reads a pair that the check orders only for the No Duplicates Rule (F-?1)."
- "The message does not decide which pairs load" restates the source's basis faithfully: "every branch of `describeOverloadingFailure` raises, so the pairs that reach the new raise are exactly the pairs refused before" (`rung-walk-trait-method-bounds/REPORT.md` section 1).
- The list of pairs not read drops one item that the source gives: "or raises an error while its instances are read" (REPORT section 3; `catch (FortressException ex) ... NOT_READ`, `:797-799`, `:915-917`). The record drops it too. **Wording**, optional: add it.
- **Uncertain.** "rows 539, 550, 416 and 779 hold valid pairs that walk refuses" follows the source (REPORT section 10, decision 7). But row 416's own pair is plain and keeps "are unrelated" (`XXXNatSizeExclusionWalk`, REPORT section 3, "Kept"). Its generic form, F-155's `h` pair, is the pair whose present verdict is F-252's open run. The same run settles whether row 416 stays in this list.

**Comprehension.**
- **Wording.** "the two instances of an explicit instantiation" could not be read. The source is `XXXGenericOverload2.fss:21-24`: `f[\U, V\](u:U, v:V, b:B)` beside `f[\U, V\](v:V, u:U, a:A)`, with `g = f[\A, B\]` making one instance of each, which walk checks as two plain declarations. **Wording:** "or is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`)".
- The scope question that the reader raised against F-252 is the dropped condition above.

## F-258, exclusion read over the whole parameter type

**Fidelity.**
- **Wording, scope.** "for two declarations with static parameters of their own or for one beside a plain declaration". Through F-252's new definition, this now includes a generic object's constructor. `domainsExcludeTogether` returns false unless the first is an `FGenericFunction` and the second is one or plain (`:937-940`). `GenericFunctionalMethod.Own` is an `FGenericFunction`, but `GenericConstructor` is not (`values/GenericConstructor.java:33`). The old text named only the methods' branches, and so made no such claim. **Wording:** "for two declarations with static parameters of their own, a constructor apart, or for one beside a plain declaration".
- The 691-meet sentence is bounded correctly to its one measurement (`rung-existential-reduction/REPORT.md` section 7, "An instrumented copy"). The three differences match rows 786, 787 and 788.

**Comprehension.** Five points.
- **Wording.** "Walk reads no `where` clause, no varargs parameter and no parameter lists of different lengths." The reader could not tell whether walk ignores the clause or skips the pair. The code skips the pair (`:943-945`, `:953`). REPORT section 1 says: "Where clauses, varargs and parameter lists of different lengths are not read, ... so the method only turns a 'fails the Meet Rule' into a load". **Wording:** "Walk does not read so a pair where either declaration has a `where` clause of its own or a varargs parameter, or whose parameter lists differ in length; such a pair keeps the Meet Rule's refusal."
- **Concept, in the entry.** "the reduction's first premise": only this entry uses it. REPORT section 1: `emptyED` "is `reduceED`'s first premise alone: the existential's body, its static parameters read as inference variables, has a constraint of being other than Bottom that is False". **Wording:** "The checker reads only the reduction's first premise: read with its static parameters as inference variables, the meet cannot be other than `Bottom`. It reads no bounds."
- **Wording.** "the checker's new test ... the older test". The reader took "test" for a harness test. **Wording:** "an instrumented copy of the checker never reached its new reading (`emptyED`) on the interpreter's library: the subtype test that runs first (`subtypeED`) found all 691 meets that the count stage asked about empty."
- Which path is right in each difference: the entry does not say, and its claim does not need it. The rows do say: 786 is CONTESTED ("which path moves is open"), and 787 and 788 are "implementation gap (walk)". Optional: "(row 786 open; in rows 787 and 788 walk departs)".
- The `XXX` compiled test under "(refused)": `tests-writing.md` defines it ("For a refusal at compile time, write one `XXX` compile test, with `compile` and `compile_err_contains`"), and `XXXGenericPairFreeArgument.test` is one. The reader missed a defined term, so nothing changes.

## F-259, `extends Any` desugared to `Object`

**Fidelity.** It holds against `rung-string-conversion/REPORT.md` sections 1 and 6. Section 6 also says that on both paths an object expression declared `extends Any` is an `Object`, and that the compiled test leaves it out because an object expression is "a code-generator wall". So "under walk, so is such an object expression" states what is gated.

**Comprehension.** The reader asked why object expressions are limited to walk. **Wording:** "under walk, so is such an object expression, which the compiled path does not yet compile". That `extendAny` prints `Infinity` is the test's output (REPORT section 1). Nothing to change there.

## F-?3, the conversion over `Any` (new, from F-259)

**Fidelity.** It holds. The bodies are `Library/FortressLibrary.fss:4411-4412`; the values, the `CastError`s and the two expected failures are REPORT section 5; "The conversion does not reach the compiled path" is section 5, "Compiled".

**Comprehension.** Both of the reader's questions are one missing step.
- Why do a tuple and `()` pass a `cast[\Object\]` that `Any` alone should fail? They never reach it. `"" || a` takes `String`'s own members over `()` and over tuples of two to six elements (`FortressLibrary.fss:4401-4410`). Only a function, a tuple of seven or more elements, or an object reaches `(self, b:Any)` and its cast (`symbolic-operators/REPORT.md` section 2.6).
- Why the left side? On the right, a tuple already went through those members (REPORT section 5: `"s" || (1,2)` gives `s(1,2)` "on both"). On the left, the team's body called `asString` on the tuple.
- **Wording:** add "`"" || a` reaches `String`'s own members over `()` and over tuples of two to six elements, as a tuple on the right already did; only a function, a tuple of seven or more elements or an object reaches the `cast`."

## F-154, shared `nat`s stop a wrong-shape product at dispatch

**Fidelity.** It holds. The narrowing that the assessment asked for is made: the unification error is tied to the model's `pick`, case 7 of the mismatch probe (`apl/mg/NOTES-swap.md`), and "no library product is such a declaration" is true (`Library/FortressLibrary.fsi:1771-1802`: `DOT` and `juxtaposition` are each declared many times). A precision, not a failure: "with the argument types and their sizes" was seen at the model's declarations and the library's `+` (cases 1 to 6 and 8 to 13), while row 254 quotes only "Failed to find any matching overload" for `DOT`.

**Comprehension.** It matches. The reader noted only that the entry names no gated test, and its evidence sentence says what kind of evidence it is. **Pass.**

## F-156, the array vocabulary the library lacks

**Fidelity.** It holds. "reshape, plane, gather, outer product and ravel do not exist in the library" (`run-c4/probes/vocabulary/REPORT.md`, "The short answer"). The plane function is table row 28, and the six declarations of the consequence are rows 23, 26, 28, 35, 36 and 38. I searched every `Library/*.fsi` for these names and found only comments (`FortressLibrary.fsi:1819`, about a matrix "added to every plane").

**Comprehension.** It matches. Optional **wording**: "Read by a search of the library's apis (`Library/*.fsi`)", which answers the reader's one question. **Pass.**

## F-?4, the comment's authorship (new, from F-156)

**Fidelity.** It holds. `git blame` shows `FortressLibrary.fsi:2696-2699` from `c2b4e2c95` (2026-09-23) and `:2700-2701` from `581356f32` (2026-09-28). `353818213` is jmaessen's, 2008-07-28, "Immutable arrays of unboxed RR64". `reviews/array-design-ways.md` section 9 is the source.

**Comprehension.** It matches. The reader did not know "scalar-extension block". That is F-119's term. Optional **wording**: "the scalar-extension block (the eight generic declarations of `+`, `-`, `MIN` and `MAX` between an array and one number, F-119)", the gloss that F-156's history gives. **Pass.**

## F-157, arrays as traits, and views

**Fidelity.**
- **Uncertain, settled: "the language's own idiom".** The writer kept it and put a question to the curator, because the cited source says "the library's own idiom for a runtime shape (row 150)" (`run-c4/probes/vocabulary/REPORT.md`, question 3). The record has a source for the language claim: `reviews/c4-flatarrays-review.md` section 1. It says: "Every one of the nine structures is a six-line object whose `get`/`put` index some other library array ... That is the language's own idiom for a runtime-shaped view (`FortressLibrary.fss:2571-2588`, `TransposedMatrix`, is the library doing the same thing)." `postmortem-2026-09-19/review-patterns.md` records that finding as accepted. So the curator need not be asked, but the claim drops its condition, "for a runtime-shaped view", and cites the narrower source. **Wording:** "...; this is the language's own idiom for a view of a runtime shape, as the library's own `TransposedMatrix` is (`reviews/c4-flatarrays-review.md` section 1)." `TransposedMatrix` is now at `Library/FortressLibrary.fss:2943`.
- **Uncertain, settled: "54 times at n = 64".** No measurement gives 54. `diag-override.md`, "Timings against row 299", lists the 2026-09-15 ratios at n = 64 as "63x (v07), 58x (Time2 against Time1); row 299 and the review say 54x". The vocabulary report's own pair, 26 against 1499 ms, is 58×. The rewrite presents 54 as a measured ratio. **Wording:** "and 58 to 63 times at n = 64 (row 299, which says 54; `diag-override.md`, 'Timings against row 299')".
- **Dropped condition.** In "A subtype of `Matrix` that overrides `mul` gets its own product ... It needs no api line", the override is measured on walk alone: "Interpreter path only" (`diag-override.md`, opening paragraph). The old entry's "Under walk" opened the cost sentence before it; the rewrite moves the costs after it, so the override sentence names no path. **Wording:** "Under walk, a subtype of `Matrix` that overrides `mul` ...".
- "at `b176a4b79`" holds as a bound. Rows 298 and 299 read the library there, the runs are of 2026-09-15, and no commit touched `Library/FortressLibrary.fs?` or `ProjectFortress/src` from 2026-09-13 to 2026-09-16 21:00 (`git log`).

**Comprehension.**
- "row lift". **Wording:** "on lifting a function over the rows of a 64 × 16 matrix" (vocabulary REPORT question 3: `(out[i,:]).assign(f(m[i,:]))`).
- With or without the override? Without it: the plain view (row 299; `diag-override.md` table, "plain view (library product)"). **Wording:** "the library's product with a diagonal that is a plain `Matrix` view, without the override, took ...".
- The compiled path: see the dropped condition above.
- The source of the idiom: see the first point above.

## Across the chunk

- **A pointer that `proposals.md` misses.** F-245 says "`FlatString`'s api pair (F-259)". After the apply, F-259 holds no `FlatString` api line, and F-246 does. It needs repointing, like F-83's. F-238's pointer to F-252 for the every-instance reading goes to F-?2, as `proposals.md` says. F-27 (F-252), F-246 (F-259, `extendAny`) and F-250 (F-253) still point right.
- **One run decides two entries.** The walk run of `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` settles F-252's row 416 sentence and row 416's place in F-257's "not found" list, as well as F-155.
- **Concepts.** I agree with `concepts.md`, with one addition. The `interpreter.md` sentence "For every pair of functions of which at least one is generic, it loads the pair only if ..." should name the parameter check's refusal as the condition, because the cold reader's scope confusion comes from it. The terms that only one entry uses are best defined in that entry: a string's depth (F-249), the reduction's first premise (F-258), the trait's member environment (F-253), and the instances that an explicit instantiation makes (F-257).
