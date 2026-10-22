<!-- The clarity pass, chunk p7 of POSITIONS (P-79, P-80, P-84, P-85, P-87, P-88, P-89, P-90, P-91), after its second round: each entry rewritten so that a reader without the conversation behind it can tell what the curator decided, with its change of meaning, the source of each sentence and the questions for the curator. -->

# The clarity pass, chunk p7

Each entry starts from its text in the record now, which holds the provenance audit's applied corrections (`6b560762f`). The sources are the audit's evidence, printed by `entries.py`: for P-79 and P-80 the scout's report `P-N.md` and `judgement-c6.md`, `corrections-c6.md` and `takeaway-c6.md` in `explorations/coordinator/positions-audit/full/evidence/`; for P-84, P-87, P-89, P-90 and P-91 the same files of chunk c7; for P-85 and P-88 the trial's files in `positions-audit/trial/evidence/` (`P-N.md`, `judgement.md`, `corrections.md`, `takeaway-check.md`). A time is the curator's message, in UTC, unless it is named as the coordinator's. "Takeaway" is the audit's cold-read check of the entry, whose fixes were drafted and not applied.

This is the second round. It fixes what `check.md` in this folder found, and what the cold reader (`cold-read.md`) read two ways. Each entry's "Second round" list says what changed and why.

P-90 was held unchanged for his answer to the audit's question, so its gate on `where` clauses keeps its meaning here. P-85 and P-87 also carry open audit questions; the parts they ask about keep their meaning. Concepts that several entries use are in `concepts.md`.

The nine entries hold 3,845 characters now and 9,084 here. The growth is the words given to each pointer, the definitions of the model, the vocabulary and the sign-refined types, the conditions that the takeaways and the check found a reader could not see, and the state lines that the cold reader asked for.

## P-79

> - P-79 **Every team demo is kept running as the tree changes.** The team demos are the programs in `ProjectFortress/demos/`. If a change breaks a demo and the way to repair the demo is known, the same batch rewrites the demo. For example, the change that made `10^(-4)` an error (P-153, the integer power) also wrote `10.0^(-4)` in `BiCGSTAB.fss` and `BiCGSTAB2.fss`, and `10.0^(-6)` for `10^(-6)` in `npbft.fss`. A demo that fails for want of a feature is made to run again once the feature is built. So the demos known to fail today are to be respelled where the way is known: the five demos that walk refuses at load, since they leave an inherited abstract method without a body (gap-ledger row 670, which names them); `trips.fss`, which walk runs but the compiled checker refuses, since its `generator` object extends `StandardTotalOrder[\trip\]` without being a `trip` (row 710); the timing line of `BiCGSTAB.fss` and `BiCGSTAB2.fss`, which divides a `ZZ64` by a float and so stops walk (row 791); and the reductions that the compiled checker refuses because they leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731). Still to build: a measurement of which demos run, then the respelling of those with a known way; both are candidates for the next batch (PLAN, phase 3, item 19).

Meaning: unchanged. Which path "running" means stays open, as in the record's text; see the question below.
- "So the demos that fail today are respelled" read as done (takeaway, "P-79"). "Are to be respelled" states that the respelling is owed; the four ledger rows are open.
- The handle "climb batch 20's rung I" became what the change was: the integer power's new error, P-153. The commit is `5ad4a9957`, now in the note.
- Each ledger row gets the words of its own text, so a reader can see which path each demo fails on.

Second round:
- Fidelity: row 731's condition is back. The first round said that every reduction with no written static argument is refused; row 731 says so only of a big operator whose bound names its parameter, as `SUM`'s, `PROD`'s and `BIG MIN`'s do. A plain-bounded one gets its argument from the expected type (`InferBigOperatorExpectedType`). The words "get no instance under P-48's bound rule", which the reader could not parse, became "because they leave out the static argument"; P-48 goes to the note. "Their repair writes the argument" is row 731's workaround.
- Fidelity, the path: `trips.fss` is now "which walk runs but the compiled checker refuses", as row 710 says. Each row now shows its path without the entry deciding which path a demo must run on. This also replaces "the compiled checker's self-type rule", a term that only this entry used, with what the rule refuses.
- Wording: "each demo that fails today is to be respelled" read as either the failures with a known way or all of today's failures. It is now "the demos known to fail today", since PLAN item 19 puts the measurement first.
- Wording: the five demos are named by their row ("which names them"); the timing line is said to divide a `ZZ64` by a float (row 791). The names and the line itself stay in the row, as detail for the work.

Sources:
- The title and the rule: 2026-10-20T11:52:00.829Z, "Now generally I would prefer we maintain them all in running state as we are making changes in the unsealed tree.", answering the coordinator's 07:23:57.933Z yes-or-no question on `npbft.fss:130` (`judgement-c6.md`, "P-79").
- The same-batch rewrite and its example: the same message, "Yes. Rewrite these demos to make them work, since we know how." and "the third demo line, I think I answered above, we should change that. Keep the rewrite." The three lines are `5ad4a9957`'s (`BiCGSTAB.fss:211`, `BiCGSTAB2.fss:198`, `npbft.fss:130`; `P-79.md`, section 2). Why the integer base broke: P-153 (a base other than 1, -1 or 0 raises `IntegerOverflow` at a negative exponent).
- The feature clause: the same message, "But if we arrived at a point where we needed that for the switchover, built it and can now demo work again, we should."
- The list: the coordinator's application of his rule, told to him at 11:57:46.972Z, which he did not contest (`judgement-c6.md`, "P-79"). The words for each row are the rows' own texts: row 670 ("the team's demos leave inherited abstract methods without a body, which walk now refuses at load": `GenomeUtil1z`, `GenomeUtil2a`, which `BirdCount1z` and `BirdCount2a` import, and `npbft`'s `Complex`); row 710 (`trips.fss:97-98`, "`object generator(...) extends StandardTotalOrder[\trip\]`, which the self-type rule refuses: a `generator` is not a `trip`"; "walk loads and runs the demo"); row 791 (`ss = t / 1000000000.0` with `t` a `ZZ64` stops walk after the solve, "Failed to find any matching overload"); row 731 ("one whose bound names the parameter, as `SUM`'s, `PROD`'s and `BIG MIN`'s do, has no instance, and the reduction is refused"; "Workaround: write the static argument").
- "The team demos are the programs in `ProjectFortress/demos/`": the paths of the four rows and of `5ad4a9957`.
- "Known to fail today ... where the way is known" and Still to build: `PLAN.md`, phase 3, item 19, "Batch 21, not drafted. Its candidates": "first a measurement of which demos run, then a rung for those with a known way".

Question for the curator:
1. P-79 keeps every team demo running. Does that mean running under walk, or also accepted by the compiled checker? `trips.fss` runs under walk, and only the compiled checker refuses it (row 710); row 731's reductions are a refusal of the compiled checker too. Your words of 2026-10-20 name no path, and the list of demos owed is the coordinator's application, which mixes the two. The entry keeps the list and shows each row's path until you answer.

## P-80

> - P-80 **The specification's sign-refined number types are a superseded design: a program tests such a subset of a type at run time.** These types are the specification's subtypes by sign, such as positive ℚ, non-negative ℚ and non-zero ℚ, and the same refinements of the integers. The machine types `NN32` and `NN64` are separate types, not among them. The specification's number chapters now test a value's sign by comparison, and a float with two getters of `RR64`: `check` returns `Just(x)` for a finite `x`, `check_star` returns `Just(x)` for an `x` that is not a NaN, and each returns `Nothing` otherwise. The chapter that held the design, `Specification/advanced-lib/numbers-advanced.tex`, stays word for word, marked superseded by a callout in the form of every specification change (P-96), so that the original design stays on record. Built: the chapters' rewrite and the callout (F-168). Their possible return belongs to P-62: once the `covariant` keyword is built, a worker tries to bring them back as covariant static parameters.

Meaning: unchanged.
- "Sign-refined" named no type, and a reader asked whether it takes in `NN32` and `NN64` (takeaway, "P-80"). The two sentences on what the types are come from the ask that he answered, which set the machine types apart.
- `check*` is spelled `check_star`, its name in `Library/FortressLibrary.fsi:314-316`; the specification prints it as check with a star.

Second round:
- Wording: "an attempt brings them back" read as a return that succeeds. It is now "Their possible return belongs to P-62: ... a worker tries to bring them back". Only the attempt is decided; his word was "when we get to covariant that we try this".
- Wording: "Built." now says what it covers, the chapters' rewrite and the callout (F-168). The two getters were the library's already (`P-80.md`, section 2).
- Wording: what the getters return is stated, from `numbers.tex:69-72`, since the reader had to guess it.
- Concept: the `covariant` keyword as future work goes to `concepts.md`, for the `fortress-repo` core. How a sign subset becomes a covariant static parameter belongs to P-62.

Sources:
- The title and the kept chapter: 2026-09-26T11:38:29.550Z, "Option 1, agreed. But let's make sure we clearly record uh, the original design", answering the coordinator's 11:21:27.012Z, "Answer 6: the spec's sign-refined number types", option 1, "The advanced chapter is kept word for word and marked as a superseded design, in the form you chose for S1" (`judgement-c6.md`, "P-80").
- What the types are: that ask, "18 rational types (ℚ, positive ℚ, non-negative ℚ, non-zero ℚ, and so on) and the same refinements for the integers" and "The unsigned machine types, `NN32` and `NN64`, are separate types." (`takeaway-c6.md`, "P-80"); `numbers-advanced.tex:65-82` refines ℚ, ℚ* and ℚ# by sign.
- The run-time tests: `Specification/basic-lib/numbers.tex:57-72` ("Such subsets are not types of their own: a program tests a value at run time"; "The getter check returns Just(x) for a finite value x and Nothing otherwise; the getter check* returns Just(x) for a value x that is not a NaN and Nothing otherwise"), with the two getters at `Library/FortressLibrary.fsi:313-316`.
- "Built: the chapters' rewrite and the callout": the frozen and the live chapter differ by one added callout (`d9c415395`); F-168, "The specification's number chapters describe the flat library, and its advanced chapter on rational quantities stays word for word as a superseded design".
- The return: P-62's last sentence, "When it lands, a rung tries to bring back the specification's sign-refined number types as covariant static parameters", and his "when we get to covariant that we try this. Let me try to resurrect this" in the same message.
- "In the S1 form" became the words for P-96: the form of every specification change.

Questions for the curator: none.

## P-84

> - P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** Why: a high-performance language cannot box its array elements, and the sizes are central to the team's design. So the storage and the sizes are one design: the sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them. The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected. Both halves follow the library's own patterns (P-27, the library's own practice is the standard). Built: the compiled checker checks `nat` static parameters (F-67). Still to build: the compiled path's `double[]` store, which waits with the other array decisions until after the switch-over; among them is decision A, the way the `double[]` store goes under a float vector (P-85).

Meaning: unchanged, with one narrowing made explicit.
- The title said "Storage is `double[]`", which a reader could take for every array. The question that he answered was the storage of float arrays, "boxed objects or Java `double[]`?", and only an `RR64` array can be a `double[]` (takeaway, "P-84", its tightening). His reason stays general, after "Why:".
- "So both are built together" read as an order of work. The judgement finds its meaning in what he rejected, the layered default: sizes as fields of the storage first, sized types later (`judgement-c7.md`, "P-84"). The two sentences now say that, and no more. The size as a field beside the type stays open (P-85's second question).
- "Built" and "Still to build" are new lines, from the judgement's account of the state: the checker's half is built (F-67), and the store waits for the array decisions after the switch-over (P-85; F-11, "the compiler prelude has no array type").

Second round:
- Wording: "Built: the checker's `nat` parameters" did not say whether the sizes are checked. It is now F-67's title, "the compiled checker checks `nat` static parameters", and the rule reads "the compiled checker checks them".
- Wording: "put off behind a first store" read as the first of several stores. It is now "a first version of the store", and "that layered plan was rejected" names what was rejected.
- Wording: "decision A is what puts `double[]` under a float vector" could read as the decision whether to. It is now "the way the `double[]` store goes under a float vector", as the record's text of P-85 says ("how"). P-85 has the same change.

Sources:
- The title and the reason: 2026-09-19T18:32:48.384Z, "I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using. And yes, we must go to double array for performance. There is again no question about this. If this should have been high performance language, it cannot be boxed.", answering by its content the coordinator's 18:24:23.475Z, questions 1 ("Storage: boxed objects or Java `double[]`? Default `double[]`.") and 4 ("Default layered: sizes as fields in the storage now, sized `Vector` and `Matrix` types over it when the `nat` fork lands").
- "One design" and the layered plan: the coordinator's brief to the design worker at 18:33:22, "the layered default is rejected", and its text "the array fork and the `nat` fork are taken together" (`P-84.md`, section 1).
- The sized types: `Library/FortressLibrary.fsi:1616` (`Vector[\T ..., nat s0\]`) and `:1736` (`Matrix[\T ..., nat s0, nat s1\]`).
- The library's patterns: his 18:31:44.057Z, "study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way"; P-27 holds that rule.
- Built: F-67, "The compiled type checker checks `nat` and `int` static parameters."
- Decision A: P-85's record text, "A is how `double[]` goes under a float vector".

Questions for the curator: none.

## P-85

> - P-85 **The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D.** The array design is the compiled path's design for arrays. PLAN lists its forks, each a question for the curator with its ways, as item 13 of its section "Pavol's answers, in the order they are needed". The three questions: whether the array factory chooses a store for each element type; whether the store also keeps the size as a field, beside the size in the type; and whether a factory for a size known only at run time returns the unsized `Array[\E,I\]`, whose type holds no size. These questions are apart from decisions A, B and D: decision A is how the `double[]` store goes under a float vector, B is where unboxed arithmetic happens, and D is the sizes in the model's own types (P-87). The whole preparation for the array work is to be done before the switch-over; only the work itself waits. One exception to "no default": on the third question's ground, that PLAN item's fork 3, an agent has since landed a default in the tree, way 4a, by which the compiled checker reads a size known only at run time as fixed for that call, not as unknown. It is not the curator's answer and waits for his review (review-queue item 30).

Meaning: unchanged.
- "The whole preparation ... is done" read as a fact; "is to be done ...; only the work itself waits" states the rule (takeaway-check, "P-85", drift 2). What "the whole prep" covers stays the audit's question 2.
- The fork 3 sentence stood against the title's "with no default", and a reader could not tell how they relate (drift 1). It now says that this default is an agent's, built later, and not his answer. Whether his question of 10-09 brought the third question forward stays the audit's question 1.
- Way 4a is named by what it does, from review-queue item 30. "Array fork 3" became the PLAN item's fork 3, its home.

Second round:
- Wording, the pointer: PLAN numbers its items per section, and phase 3 has its own item 13. The pointer now names the section, "Pavol's answers, in the order they are needed", and says what the item holds. It moved from the title to the body, so the title states only the decision.
- Wording: "These questions are apart from decisions A, B and D" answers the reader's doubt whether they are the same forks under other names. PLAN item 13 holds A as fork 6 and D as fork 5, and B only in phase 6.
- Wording: way 4a "has since landed ... in the tree": review-queue item 30 says "Landed: Way 4a, built by batch 13". "Not as unknown" gives the contrast with F-67, by which the checker refuses a size that a call leaves unknown.
- Wording: "the unsized `Array`" is now `Array[\E,I\]`, "whose type holds no size" (`Library/FortressLibrary.fsi:1471`).
- Wording: decision A is "how the `double[]` store goes under a float vector", as in P-84.
- Concepts: the record's state words and the library's array traits go to `concepts.md`.

Sources:
- The title, "open, with no default": 2026-09-25T23:36:16.868Z, "Row 40: close as no decision taken.", answering the coordinator's 23:23:23.166Z, whose option was that the three stop being defaults and return with the array design after the switch-over (`judgement.md`, "P-85").
- "Return after the switch-over with A, B and D" and the preparation: 2026-09-22T05:21:45.608Z, "like I am fine with delaying the array work after the switchover to the library. But at the same time, like I think we should do the whole prep for the arrays.", answering the coordinator's 05:03:23.486Z row table.
- The three questions: the 23:23:23 ask's three defaults, stated fairly (`judgement.md`, "P-85"). The glosses of A, B and D: the coordinator's 05:22:20.356Z, which he did not dispute (`corrections.md`, "P-85", 3).
- The array design as the compiled path's: `PLAN.md`, phase 5, "The array design", and `array-design.md`'s header, "the array representation on the compile path".
- The forks: `PLAN.md`, "Pavol's answers, in the order they are needed", item 13, "The array questions of phase 5, six forks ..., each one question with its ways"; its fork 3, "A size known only at run time: built at 4a, the judgement's default, while his answer is pending; it reads P-40 anew, an opened size bound for the call and not unknown".
- The exception: review-queue item 30, "Way 4a lets the checker read such an argument as a size fixed for that call"; "Landed: Way 4a, built by batch 13 after his question of 2026-10-09T15:10:56Z whether forks 2 and 3 could go into the next batch, at the judgement's default; it waits for his review".

Questions for the curator: none new. The audit's two questions on P-85 stand (`positions-audit/trial/evidence/corrections.md`, "P-85"): whether the third question still waits for the switch-over, and what "the whole prep" covers. This rewrite keeps both parts' meaning.

## P-87

> - P-87 **The model's text is the notation, and the vocabulary is repaired around it.** The model is microGPT's two programs; the vocabulary is the array operations that they are written in (`FlatArrays.fss` for C4, the flat program, and `FlatArrays2.fss` for the APL-style one). No operator in the model is replaced by a function call to pass an overload check, as a proposed repair once wrote `planeSum(mask, x)` for `mask + x`; the vocabulary changes instead. Any repair that changes a line of the model is shown to the curator as a diff before it is built. Decision D, still open and returning after the switch-over with the other array decisions (P-85), is such a diff: it gives C4's arrays sized types, in its vocabulary's signatures and in the model lines that these force (`explorations/reviews/decision-d-diff.md`; the patch itself is only in git, in the parent of `84aef6a4f`). Nothing of decision D is applied before PLAN's phase 5, where microGPT compiles, after the switch-over.

Meaning: unchanged.
- The model and the vocabulary are named, as the record uses the words (P-9: "the vocabulary, the operations the model is written in").
- The example is the repair he refused, so a reader sees the kind of change the rule forbids.
- "The sized signatures of the flat program C4's vocabulary" became what the review says decision D does: sized types for C4's arrays, in the vocabulary's api and in the model lines they force.
- The diff rule keeps its wording, "shown ... before it is built". The takeaway's reader took it as a gate for his yes; the entry neither says nor denies that, and the audit's question 1 asks whether the rule is his at all.

Second round:
- Wording: "Nothing of it" read as decision D or any repair of a model line. It is now "Nothing of decision D".
- Wording: decision D's state, which the reader could not find: "still open and returning after the switch-over with the other array decisions (P-85)". He agreed to write the diff and apply nothing until phase 5; whether D is adopted, as the diff or another way, is PLAN item 13's fork 5.
- Wording: "after the switch-over" says that phase 5 comes after phase 4, the switch-over.
- Concept: that PLAN numbers its items per section joins PLAN's row in `concepts.md`.

Sources:
- The operator rule: 2026-09-19T18:13:00.524Z, his paste of the mask line before and after (`mask + (qh kh^T) / SQRT (1.0 headDim)` to `planeSum(mask, ...)`) and "NO. NO! NOOOOO! That’s not Fortress!", answering the coordinator's 18:08:05.767Z ("one `+` in the model becomes a function call"). The edit was stopped before it landed (`P-87.md`, section 1).
- The vocabulary repaired: 17:01:32.913Z, "The fix is to compose the algorithm using the standard array operations." and 18:21:22.941Z, "we must be able to compose them in, in normal mathematical ways."
- The diff rule: kept as written; its seed is his 18:02:13.648Z, "And if we found a minimal fix for the C4, like just show it to me." (`judgement-c7.md`, "P-87").
- Decision D: 2026-09-27T19:34:10.747Z, "Yes. Agree with recommendation.", to option 1 of the coordinator's 19:31:23.674Z (write the sized types now as a diff, apply nothing until phase 5). What it holds: `explorations/reviews/decision-d-diff.md`, section 1, "In short" (sized types for every array the model computes with; 27 sized declarations in `FlatArrays.fsi`; the model's lines out and in; no operator of the model changes). The patch's place: `84aef6a4f` removed `reviews/decision-d-diff/`.
- D's state: P-85 ("return after the switch-over with the array decisions A, B and D"); `PLAN.md`, "Pavol's answers, in the order they are needed", item 13, fork 5, "The model's sized types (decision D): the re-based diff, 21 model lines out and 29 in, each shown to him as a diff, or another way".
- The files: `explorations/run-c4/src/FlatArrays.fss` and `explorations/apl/mg/FlatArrays2.fss`; PLAN's phase 5 is "microGPT compiles", after phase 4, "The switch-over".

Questions for the curator: none new. The audit's question 1 on P-87 stands (`corrections-c7.md`, "P-87"): is "Any repair that changes a model line is shown to him as a diff before it is built" his standing rule? This rewrite keeps that sentence's meaning.

## P-88

> - P-88 **The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar-extension block, and its diagonal keeps its own product.** The vocabulary, the array operations that microGPT is written in, declares none of these six operators, an array with a number on either side; the library's scalar-extension block, in `Library/FortressLibrary.fss`, serves them. `Diag`, the vocabulary's diagonal matrix, extends `Matrix` and overrides `mul`, the method that the library's matrix product calls, so `diag(v) m` scales the rows of `m` without forming the matrix. This is what the type system promises: a diagonal is a kind of matrix, with a faster product of its own. Gap-ledger row 299 records what the general product costs on a diagonal: 13 to 54 times as much as scaling the rows. Built: the six operators left to the library, and `Diag`'s `mul`. Since the diagonal is read-only, a read-only matrix trait, `ReadableArray2`, which `Array2` would extend as `Array1` extends `ReadableArray1`, is also wanted: it is a library change, under a gap-ledger row of its own still to be filed, not a definition in the vocabulary.

Meaning: unchanged. The curator reads the last sentence as his own position, a read-only matrix to be written (his page comment of 2026-10-21, 23:29 UTC), so it stays, and "is wanted" says so.
- "As the type system promises (row 299)" read as a promise kept or a gap (takeaway-check, "P-88"). Row 299 now gets the words of its text: what the general product costs, which the override avoids.
- "Under `Array2`" names the library's pattern that the coordinator's proposal followed: `ReadableArray1`, which `Array1` and `ImmutableArray1` extend.
- "A later ledger row" became "a gap-ledger row of its own still to be filed": no row names `ReadableArray2` (`P-88.md`, section 2).

Second round:
- Wording: "13 to 54 times as high" said not as what. It is now "13 to 54 times as much as scaling the rows", row 299's comparison.
- Wording: the link between the diagonal and `ReadableArray2` is his own reason, "Because our diagonal is basically read-only": "Since the diagonal is read-only, ... is also wanted".
- Wording: the state of the first two parts, which the record's text never gave: "Built: the six operators left to the library, and `Diag`'s `mul`." `ReadableArray2` is not built, and "is also wanted" stays its state.
- Wording: one name for the block, "the library's scalar-extension block", in the title and the body, from the block's own comment.
- Concept: the library's array traits go to `concepts.md`.

Sources:
- The title and `Diag`: 2026-09-24T18:30:37.463Z, "Okay, agreed. That is the plan.", answering the coordinator's 18:25:56.634Z ask (the six scalar drops approved as landed; the diagonal's product back in the override shape if the probe passed, which it did, `405a31b0e`). The shape is his, 18:13:14.832Z: "there is this promise that with these strong types, you can define like a diagonal matrix with is a type of matrix. And using specialization, we should be able to define optimized operation for this type of matrix."
- The six operators and the block: row 39's text of the coordinator's 16:32:34.428Z ("their own copies of `+`, `-` and `MAX` between an array and a scalar, in both orders"); the block's comment "Scalar extension: an array of numbers and one number, either way round" (`Library/FortressLibrary.fss:4900`).
- `mul` and the rows: `explorations/run-c4/src/FlatArrays.fss:33-43` (its comment: "the library's product forwards to its mul, which scales the rows without forming the matrix").
- Row 299: its text, "same numbers at 13-54× the cost of a row-scaling" product; the override on `Diag` is its workaround.
- Built: the override landed after the probe passed (`405a31b0e`); row 299 names it as its workaround; neither `FlatArrays.fsi` nor `FlatArrays2.fsi` declares an array-scalar `+`, `-` or `MAX` (`P-88.md`, section 2).
- `ReadableArray2`: the coordinator's 18:25:56, "Adding one in the library's own pattern, a `ReadableArray2` under `Array2` and the matrix product declared over it, is a library change ... worth its own ledger row rather than a vocabulary hack", after his 18:25:08.391Z, "is there immutable version of the matrix? Because our diagonal is basically read-only." The pattern: `Library/FortressLibrary.fsi:1544-1593`. "Wanted": his page comment of 2026-10-21, 23:29 UTC, "I read it as a recording of my additional position that we wish to write readable array to. So like a read-only matrix. So I would not delete it." (`positions-audit/evidence/curator-comments-2026-10-21.md`).

Question for the curator:
1. P-88 names the read-only matrix `ReadableArray2`, a trait that `Array2` extends. The immutable-arrays probe of 2026-10-20 proposes another shape: a standalone `ImmutableArray2`, "not a `ReadableArray2`/`ReadableArray3` above both kinds" (`perf-probes/immutable-arrays/REPORT.md`, "Decisions", 1), and its questions wait for you. Does P-88 fix the shape as `ReadableArray2`, or only that a read-only matrix is wanted in the library, its shape to come from the probe's questions?

## P-89

> - P-89 **`fill` takes a value, `tabulate` a function.** On the library's arrays, `fill(v)` fills an array with the value `v`, even when `v` is a function, and `tabulate(f)` fills it with `f` applied to each index. The function form, formerly an overload of `fill`, takes Scala's name `tabulate`. Why: in every peer language that has `fill`, `fill` takes the value. Built.

Meaning: unchanged.
- A reader asked whether a function-taking `fill` stays as an alias, and whether `fill` of a function value fills with it (takeaway-c7, "P-89"). The two forms are now stated with their arguments, and "formerly an overload of `fill`" says that the function form was renamed.
- The reason was the clause "every peer language's meaning of the word"; it is now after "Why:", since the ask that he took gave it.

Second round: no change. The check passed the entry, and the cold reader found nothing unclear.

Sources:
- The decision: 2026-09-26T12:17:35.442Z, "Agreed, tabulate.", answering the coordinator's 12:14:58.152Z, answer 10: "the diamond fix, plus the function form renamed to `tabulate`, or the name you prefer. I recommend `tabulate`", and "wherever other languages say `fill` (Java, Scala, Kotlin, C++, Rust, Julia), it means the value form" (`P-89.md`, section 1). The one exception, X10, overloads one name that is not `fill` (`judgement-c7.md`, "P-89").
- The two forms: `Library/FortressLibrary.fsi:1440-1444` ("Bulk initialization of an array using a given function or value"; `tabulate(f:I->E)`, `fill(v:E)`); a function stored through `fill`: `ProjectFortress/tests/TabulateRungA.fss:44-47`.
- "Built.": `f3b62bc83`; F-158 holds the build, the gate `tests/TabulateRungA.fss`, and where the diamond meets.

Questions for the curator: none. Where the two forms sit in the array traits is review-queue item 112.

## P-90

> - P-90 **`Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification.** A `Maybe[\T\]` is either `Just[\T\](x)` or the empty case, which the one library (the interpreter's, which the compiled path moves onto at the switch-over) and the specification write with its static argument, as in `Nothing[\String\]`. The bare `Nothing`, one object with no static argument, is future work: it needs an object declaration whose own `where` clause binds a type variable of its `extends` clause, as in `object Nothing extends Maybe[\T\] where {T extends Object}`. Neither path implements such a clause (F-21, the measurement on both paths), and the bare `Nothing` is not tried before such a clause is built. A proposal to reach the bare spelling by inference instead, so that `Nothing` written where a `Maybe[\String\]` is expected means `Nothing[\String\]`, is parked (PLAN, "Off the path, parked"; review-queue item 167).

Meaning: unchanged. The entry is held for his answer to the audit's question, so the gate keeps its meaning; only the terms around it are explained.
- "Gating row 331 on static-argument inference instead" named a ledger row and a handle. It now says what the proposal was, from the judgement that made it. Row 331, today the compiled prelude's own `Nothing`, goes to the note.

Second round:
- Wording, the gate's antecedent: "it is not tried before then" became "the bare `Nothing` is not tried before such a clause is built", as his "gate on where clause availability" fixes it.
- Wording and concept: the `where` form is now an object declaration "whose own `where` clause binds a type variable of its `extends` clause", with F-21's example. The reader set the first round's wording against `references/compiler.md`, which says that the code generator "compiles a declaration whose `extends` entry has a `where` clause"; the same part says that it refuses a declaration "with a `where` clause of its own". The example is F-21's, without the `excludes` clause, and not named as the specification's: the specification prints its declaration with `excludes Just[\T\]` and marks it "Not allowed!" (`Specification/basic-lib/convenience.tex:58-72`). The two `where` forms go to `concepts.md`, for `references/compiler.md`.
- Wording: the proposal does not make one object; it lets a program leave out the static argument. It is now "a proposal to reach the bare spelling by inference instead, so that `Nothing` written where a `Maybe[\String\]` is expected means `Nothing[\String\]`", the judgement's words.

Sources:
- The title: 2026-09-21T21:20:29.106Z, "Maybe’s empty case, keep team’s paramedic speaking. Document the future work gate on where clause availability." ("paramedic speaking" is dictation for "parametric spelling"), answering option 1 of the coordinator's 21:08:15.030Z, "Rows 26 and 33 together". "And the specification": his "S2 yes, take the verdicts for rung S" (2026-09-26T08:07:48.939Z) and "Yes. Sure." (08:18:07.238Z), to the coordinator's 08:00:01.931Z ask (`judgement-c7.md`, "P-90").
- The gate: his "gate on where clause availability". "Neither path implements": F-21 ("Without it, both paths report `T is undefined`: a `where` clause on an object binds no type variable of its `extends` clause"; `compile-ladder/rung-maybe/REPORT.md`, section 5).
- The proposal: `explorations/reviews/spec-refused-examples-judgement.md`, section 8, "Inference of a generic object's static argument from the expected type, so that `= Nothing` where a `Maybe[\String\]` is expected means `Nothing[\String\]`"; parked at `PLAN.md:193`, "Row 331's bare `Nothing` re-gated on type inference ...; parked. Review-queue item 167."
- "The one library": the `fortress-repo` skill's core, "At the switch-over, the compiled path moves onto the interpreter's library".

Questions for the curator: none new. The audit's question 1 on P-90 stands (`corrections-c7.md`, "P-90"): the specification under his S2 yes refuses the bare `Nothing` by instantiation exclusion, with or without a `where` clause, so building the team's `where` forms (P-151) does not open the gate; drop the gate, or keep it?

## P-91

> - P-91 **What an object with no `asString` prints: its bare Fortress type name, walk's spelling, on both paths.** An object with no `asString` of its own prints its Fortress type name as walk spells it, such as `Box`, or `Box[\ZZ32\]` for an instance of a generic object, with no marker and no hash code. A debug marker, such as the Java class name that the curator first leaned to, belongs in `asDebugString` if one is still wanted, not in the printed form; walk's `asDebugString` prints `a Box: Box`. Built: the bare type name on both paths (F-123). Still to build on the compiled path: an `asDebugString` that prints as walk's does, where the compiled one prints `Box` (row 363); and printing an object that declares or inherits a zero-argument member named `toString`, which overflows the stack (row 321). Once the compiled path reads the one library, every object inherits such a member, the `getter toString` of that library's `trait Object`, so every object with no `asString` meets the overflow (PLAN, phase 4, "From the reviews").

Meaning: unchanged.
- "Bare" could read as "without type arguments" (takeaway-c7, "P-91"). The examples and "no marker and no hash code" are the entry's first text, of the same decision.
- Each ledger row and the PLAN line get the words of their texts.

Second round:
- Fidelity: the marker sentence lost its condition. The first round named the Java class name as the marker that goes in `asDebugString`, with no "if still wanted", so a reader could put the class name into `asDebugString` against the "Still to build" line. The sources make the marker's place conditional and leave its content open: the judgement says "If a marker is still wanted, put it in `asDebugString` on both paths rather than in `asString`". It now reads "belongs in `asDebugString` if one is still wanted, not in the printed form", and walk's form, `a Box: Box`, moves into that sentence, so the "Still to build" line no longer seems to name a second form.
- Wording: why every object meets the overflow, from row 321 and walk's `trait Object`: once the compiled path reads the one library, every object inherits that trait's `getter toString`. The PLAN line is now its own sentence, so "where" no longer has two antecedents.
- Wording: "Built: the bare type name on both paths (F-123)", which the reader asked for. The audit moved the old "Built, but ..." out because it overstated the state, leaving out row 363; this line names only what F-123's title holds, and F-123 also names the open rows 321, 363 and 364.

Sources:
- The title: 2026-09-22T04:45:52.849Z, "yes,  row 27 close per default-rendering-judgement recommendation.", answering the coordinator's 2026-09-21T21:53:45.883Z ("Labelled default: the bare type name, the interpreter's spelling, on both paths. Say yes and row 27 closes"), repeated at 23:23:34.884Z. The examples and "no marker, no identity hash": the entry's first text (`6a6b36531`): "the bare Fortress type name with its static arguments, the interpreter's spelling, on both paths (`Box`, `Box[\ZZ32\]`, a value object's name), no marker, no identity hash".
- The marker: the coordinator's line in that ask, "The debug marker you had in mind has a home already: Fortress has a separate `asDebugString`, which the interpreter prints as "a Box: Box". That is where a fallback marker belongs, not in the user-facing rendering."; `reviews/default-rendering-judgement.md`, "5. Recommendation", "If a marker is still wanted, put it in `asDebugString` on both paths rather than in `asString`". The marker he had in mind was option 2, the Java class name in angle brackets: "Leaning 2, as these are debug messages in my mind" (21:26:46.253Z).
- Built: F-123, "A compiled object with no `asString` of its own prints its bare type name, as walk does." (`6bec1b004`, gated by `compiler_tests/DefaultRenderRungS`).
- Still to build: the judgement's "5. Recommendation", which restores walk's article `asDebugString` on the compiled path; row 363 (walk `a Box: Box`, the compiled path `Box`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:357`); row 321 (a zero-argument Fortress member named `toString` recurses until the stack overflows; it "Blocks adopting walk's `trait Object`, which declares `getter toString`"); walk's `trait Object` at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:36-51`, whose last member is `getter toString(): String = self.asString`; `PLAN.md`, phase 4, "From the reviews: printing an object with no `asString` overflows the stack once the compiled path reads the one library".

Questions for the curator: none.
