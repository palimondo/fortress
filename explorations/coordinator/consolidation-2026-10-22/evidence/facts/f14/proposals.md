<!-- The FACTS clarity pass, chunk f14, 2026-10-22: each entry's clean text, its change of meaning, the source of each sentence and the questions left open, for F-249, F-252, F-253, F-257, F-258, F-259, F-154, F-156, F-157 and the four entries split from them (F-?1 to F-?4). -->

# Chunk f14: proposals

The clean text of each entry is in `clean.txt` and `proposals.apply`, word for word. This file gives, for each entry, its change of meaning, its sources and its questions. The base is `main` at `4caa90c81`. Abbreviations below: GP is `compile-ladder/rung-walk-generic-pairs/`, ER is `compile-ladder/rung-existential-reduction/`, TB is `compile-ladder/rung-walk-trait-method-bounds/`, MS is `compile-ladder/rung-walk-method-sargs/`, SC is `compile-ladder/rung-string-conversion/`, OF is `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java` on the base.

## F-249

**Meaning:** narrowed, as the assessment asks. The old title said that walk reaches the string objects' `||` only through `String`'s abstract member, for any program. Section 2.4 states it for a program that imports only the prelude, and shows that code inside `FortressLibrary` reaches `FlatString`'s `||` directly. Added: the kind of evidence (one probe run, on a patched library). Fix round: the CatString result narrowed to the one body that the probe tried (way JCp, `Concatenable`'s), where the old text said "a body of its own"; way JC's `typecase` meet without the `String.fsi` lines recursed instead (section 2.4).

**Sources:**
- Title, sentence 2 (the three objects): `perf-probes/symbolic-operators/REPORT.md` section 2.4, "The route".
- Sentence 3 (inside `FortressLibrary`): section 2.4, "What a marked meet shows".
- Sentences 4 and 5 (the proposed change, the meet): section 2.2, ways JC and JCp; section 2.1 (the meet asked at the self position); `FortressLibrary.fsi` declares `juxtaposition(a:Any, b:String)` at the top level (section 2.2).
- Sentence 6 (`CatString` of depth 1, the same printed values): section 2.4, "Kinds under JCp".
- Evidence sentence: section 2.3 says each way was run once; no test in `ProjectFortress/tests/` names `CatKinds`.

## F-252

**Meaning:** unchanged in its claims; scope corrected, and two claims moved to F-?1 and F-?2.
- The old title said that every pair of two generic functions is read on its declared domains. The code reads again only a pair that the parameter check refuses (OF, `completeOverloadingCheck`, `!distinct && !overloadOk()`), and returns `NOT_READ` for a varargs pair or lists of different lengths (OF:897). The new title says "where the parameter-by-parameter check refuses". The pair that the check passes by order is F-?1's.
- The row 416 limit now sits on the parameter check, where the assessment found it true, and is bounded to two plain declarations, row 416's own pair. Whether the declared-domain reading now loads a generic pair so typed is F-155's open question (below).
- Fix round: the whole-type reading's condition, "where neither declaration has a `where` clause of its own" (row 787), which the first round dropped, is restored. The ordered pair's No Duplicates reading is named, so that the scope reads one way. "Parameter lists of different lengths" is dropped from this entry, since such a pair is never compared (`completeOverloadingCheck`, `:376-381`); F-257 keeps the source's list.

**Sources:**
- Definition of a declaration with static parameters of its own: `ownGeneric`'s comment, ER/REPORT.md section 1, third point; OF:2401-2410.
- Sentences 3 and 4 (the check, then the reading again): GP/REPORT.md section 1; OF `validOnDeclaredDomains`, `genericPairValid`.
- Row 416 sentence: the old text; row 416's cell (`Tg[\3\]`, `Tg[\4\]`).
- Meet Rule sentence: the old text (row 539); F-258.
- Varargs sentence: OF:897 (`genericPairValid`), OF `validOnDeclaredDomains` (`hasRest`, sizes); TB/REPORT.md section 3.
- Call sentence: the old text (F-253, F-26).
- Gates and detail: the old text; GP/REPORT.md section 5.

**Question for the curator** (it needs a run, not a ruling): on the current tree, does walk load `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`, or refuse it, "fails the Meet Rule"? The assessment reads `domainsExcludeTogether` (OF:936) as making this pair exclude since rung P. TB/REPORT.md section 3 measured the refusal before rung P landed. If the pair loads, F-252 should add that the declared-domain reading sees such an exclusion for two declarations with static parameters of their own, and F-155 needs the same scope. The coordinator's F-155 investigation settles it.

## F-?1, new: equal declared domains

**Meaning:** unchanged; split from F-252. Two gates added: `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk`, which F-257 already lists for this message, and which test a pair that the parameter check refuses and `genericPairValid` reads as equal domains. The title covers both branches, "whether or not the parameter-by-parameter check orders them", as the code does (OF `sameDeclaredDomains` branch and `genericPairValid`'s `NO_DUPLICATES`).

**Sources:**
- Title and sentences 1 to 3: GP/REPORT.md section 1, second point ("reads a type parameter `T` as strictly below its bound"); the old F-252 text.
- The `h` example: GP/REPORT.md section 5, table row "`h[\T extends Number\](x: T, y: T)` beside `h(x: Number, y: Number)`": "refused, 'fails because their parameter lists have the same types'".
- Row 759 sentence: the old F-252 text; ER/REPORT.md section 5, table row "mine: row 759".
- Gates: the old F-252 text; TB/REPORT.md section 3's table.

## F-?2, new: the Return Type Rule at every instance

**Meaning:** unchanged; split from F-252. Added: the reason for the condition, from the skeptic's finding. Fix round: the title regains the condition that the split lost, a pair that the parameter check refuses (`genericPairValid` is reached only there, `:530-531`, `:770`). The second case is now said as `returnRuleAtEveryInstance` reads it (`:1103-1121`).

**Sources:**
- Title, sentences 1 and 3 to 5: the old F-252 text; GP/SKEPTIC.md section 2, "The fix".
- Sentence 2 (why one instance is not enough): GP/SKEPTIC.md section 2, "Finding".
- Examples, the checker's refusals, gates: the old text; GP/SKEPTIC.md section 2.

## F-253

**Meaning:** unchanged; the title widened to match the body. The old title named only a dotted call. The body also covered an inherited generic functional method, which is called as a function (row 765; TB/REPORT.md section 1). The new title says "a call of a generic method". Fix round: the trait's method environment is restored as the place where the bounds are read, and the dotted method's choice is said with its outcome, the inner one (MS/REPORT.md section 1, part B).

**Sources:**
- Title, sentences 1 and 2: the old text; MS/REPORT.md sections 1 and 2.
- Sentences 3 and 4 (a trait's method, the values): TB/REPORT.md section 1 (`getTypeEnv`, `evaluationEnv`) and section 4 (`Box[\ZZ64\] 3:ZZ64`, `Empty[\Number\]`).
- Sentence 5 (inherited functional method): TB/REPORT.md section 1, the paragraph after the list.
- Sentences 6 and 7 (the fallback and its errors): TB/REPORT.md section 1, last point (`inferByUnification` still reads `getWithin()`); section 4, `Picker.pick(5)`; TB/SKEPTIC.md section 3. That `getWithin()` of a trait's method is the trait's member environment: TB/REPORT.md section 1, first sentence.
- Sentence 8 (`distribute`): the old text; F-248's title names the declaration.

## F-257

**Meaning:** unchanged. "Which pairs load is unchanged" compared the code with the code before the rung. TB/REPORT.md section 1 gives its basis: the new message is raised only for pairs that were refused before. The new sentence, "The message does not decide which pairs load", states that as a present property. Fix round: the reading's condition, the parameter check's refusal, is restored (`:530-531`), with the ordered pair's No Duplicates reading (`:538`). One item of the source's list of pairs not read is added: a pair that raises an error while its instances are read (TB/REPORT.md section 3).

**Question for the curator** (it needs a run): row 416 stays in the list of valid pairs that walk refuses. Its own pair is plain and is still refused. Whether its generic form, F-155's `h` pair, still is refused is the same walk run as F-252's question.

**Sources:**
- Sentence 2 (which pairs are read): OF `validOnDeclaredDomains` (both own, or own beside a declaration that is not generic).
- The three messages: TB/REPORT.md section 1, "The message"; OF `ruleFailure`.
- "not found" sentence: the old text; rows 539, 550, 416 and 779, each a valid pair that walk refuses (their ledger cells).
- Pairs not read: TB/REPORT.md section 3, last paragraphs; `XXXGenericOverload2` for the explicit instantiation.
- Gates: the old text.

## F-258

**Meaning:** unchanged, with two corrections the assessment asked for. The 691-meet count is now bounded to its one measurement (ER/REPORT.md section 7, "An instrumented copy"). Row 787's pair is now named by its shape: it excludes only when read whole, and its bounds do not exclude (row 787's cell). Fix round: the generic constructor is excepted from walk's reading, since `domainsExcludeTogether` takes only generic functions (`:937-940`; `GenericConstructor.java:33`). F-252's definition would otherwise have widened it. Each row's class is given.

**Sources:**
- Title and sentences 1 and 2: the old text; ER/REPORT.md section 1.
- Sentence 3 (where walk reads it): ER/REPORT.md section 1 (the Meet branch of `genericPairValid` and of the generic-beside-plain reading).
- Sentences 4 and 5 (walk's limits): ER/REPORT.md section 1 ("Where clauses, varargs and parameter lists of different lengths are not read"); OF `excludesAtMeet`'s comment ("A comprises clause is not read").
- Sentence 6 (the checker): ER/REPORT.md section 1, second point.
- Sentence 7 (691): ER/REPORT.md section 7.
- The three differences: rows 786, 787 and 788, their cells.
- Gates: the old text.

## F-259

**Meaning:** narrowed; the conversion moved to F-?3. The old title put the conversion "on both paths"; it reaches only walk (SC/REPORT.md section 5, "Compiled"). The new title keeps the desugaring on both paths and the object expression under walk (section 6: the compiled test leaves the object expression out). `ConcatAnyOnLeftWalk` is kept as a gate, since section 6 names it for the desugaring too.

**Sources:**
- Title: SC/REPORT.md section 6, first point.
- Sentences 1 and 2: SC/REPORT.md section 1, first point.
- Sentence 3 (`typecase`, `cast`, members): section 6, first point.
- Sentence 4 (`extendAny`): section 1, last paragraph; F-246.

## F-?3, new: the conversion over `Any`

**Meaning:** unchanged; split from F-259, with the path named.

**Sources:**
- Title and sentences 1 and 2: SC/REPORT.md section 1, second point; section 5's table.
- Sentence 3 (`CastError`, the two expected failures): section 5's table and its "Each walk expected-failure test".
- Sentence 4 (the compiled path): section 5, "Compiled".

**Decision not taken:** merge F-?3 into F-246, which holds the same change's distance. F-246 is outside this chunk.

## F-154

**Meaning:** narrowed, as the assessment asks: the unification error is now tied to a declaration of the model, not to a library product.

**Sources:**
- Title, sentences 1 and 2: `Library/FortressLibrary.fsi:1777-1800`.
- Sentences 3 and 4 (the overload message, the uncatchable stop): `apl/mg/NOTES-swap.md`, the mismatch probe, the table and "The failure is terminal"; row 254.
- Sentence 5 (`pick`): the same section, case 7 and "The diagnostic is better".
- Evidence sentence: row 254; the probe's case 1.

## F-156

**Meaning:** unchanged; the authorship of the comment moved to F-?4. Added: a plain definition of "plane" and the consequence for a program, with C4's declarations as its example.

**Sources:**
- Title: `run-c4/probes/vocabulary/REPORT.md`, "The short answer" and question 5; the assessment's grep of `Library/FortressLibrary.fsi`.
- Plane sentence: the report's table, row 28 (`plane(t: Array3[…], p)`, a `PlaneView extends Matrix`).
- Consequence sentence: question 5 and table rows 23, 26, 28, 35, 36 and 38.

## F-?4, new: the comment's authorship

**Meaning:** unchanged; split from F-156.

**Sources:**
- All sentences: `reviews/array-design-ways.md` section 9, second point; the assessment's `git blame` of `FortressLibrary.fsi:2696-2701` and its reading of `353818213`.

**Decision not taken:** merge F-?4 into F-119, which owns the block. F-119 is outside this chunk.

## F-157

**Meaning:** the two costs bounded to their measurements, with one correction. "The library's operators" are narrowed to the two that forward to `mul`, juxtaposition and `DOT` between matrices, as the probe names them. Fix round, two corrections:
- The ratio at n = 64 is now the measured 58 to 63. Row 299 and the record said 54, which no measurement gives (`diag-override.md`, "Timings against row 299").
- The idiom regains its condition, a view of a runtime shape, and its source, `reviews/c4-flatarrays-review.md` section 1, which the record accepted. The first round's question to the curator is withdrawn.

The override is scoped to walk, where alone it was measured.

**Sources:**
- Title: `reviews/c4-flatarrays-review.md` section 1 ("That is the language's own idiom for a runtime-shaped view"); `Library/FortressLibrary.fss:2943` (`TransposedMatrix`).
- Sentences 1 and 2 (the override): `diag-override.md`, opening paragraph ("Interpreter path only") and "Result".
- Sentences 3 to 5 (the costs): rows 298 and 299, their cells (162 against 32 ms, 64 × 16; both at `b176a4b79`); `diag-override.md`, "Timings against row 299" (63× in v07, 58× Time2 against Time1); the vocabulary report's question 3 (the row lift, `(out[i,:]).assign(f(m[i,:]))`).

## Across the chunk

- **Pointers to repoint after the apply.** F-238 points to F-252 for the Return Type Rule at every instance; that claim is now F-?2. F-83 points to F-259 for "`FlatString`'s api states its component's header", and F-245 to F-259 for "`FlatString`'s api pair"; F-259 no longer holds that line, and F-246 does. These entries are outside this chunk.
- **One run decides three points.** A walk run of `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` settles F-155, F-252's row 416 sentence, and row 416's place in F-257's list.
- **Decision not taken: merge F-238 into F-252.** F-238 holds the declared-domain reading for the pairs whose exclusion walk withdrew, a subset of F-252's pairs. The alternatives: merge it now; or keep it, since it also holds the withdrawal rule that F-252 does not. F-238 is outside this chunk.
