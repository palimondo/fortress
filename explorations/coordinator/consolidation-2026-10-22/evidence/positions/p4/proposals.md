<!-- The clarity pass's chunk p4, 2026-10-22, after its fix round: nine POSITIONS entries (P-54 to P-60, P-62, P-147) rewritten so that a reader without the conversation can tell what the curator decided, each with its change of meaning, the source of each sentence, its questions for the curator and the pointers elsewhere that the coordinator updates. -->

# The clarity pass, chunk p4: nine entries

Each entry starts from its text in `POSITIONS.md` at `df0728b81`, which already holds the provenance audit's corrections. The sources are the audit's evidence: the scout's report `P-N.md` and the chunk's `judgement-c4.md`, `corrections-c4.md` and `takeaway-c4.md`, in `explorations/coordinator/positions-audit/full/evidence/`; for P-55 the trial's files in `positions-audit/trial/evidence/`; for P-147 chunk c5's. Each is cited by its section on the entry. A time is the curator's message, in UTC. Concepts that several entries use are listed in `concepts.md` beside this file.

The fix round follows `check.md` and `cold-read.md` in this folder. It repairs one fidelity failure (P-58 stated its target as built), restores two conditions (P-59's end of walk's limit, P-54's later state), narrows two sentences to their sources (P-60, P-147), and rewords what the cold reader read two ways.

The nine entries hold 4,792 characters at `df0728b81`, 9,028 after the first round and 10,194 now, each line counted whole. The growth is the definitions that the entries alone need, the conditions written out, and the state lines. `record.py apply` of `proposals.apply` on a copy of the record at `30ee7ae4b`, then `record.py check`, passes with 0 failures.

## P-54

> - P-54 **`QQ`'s `ceiling` and `truncate` keep `ZZ`, their declared result type, and raise an error at +∞, −∞ and 0/0.** The specification's paragraph on these methods said that they return the argument itself at those three values (`Specification/basic-lib/numbers.tex`, "Rational Numbers"). That paragraph is revised. `floor`, `round` and the brackets ⌊x⌋ and ⌈x⌉ are built on `ceiling` and `truncate`, so they raise too. Why: the declared integer result and other languages win over the paragraph: Python's `math.floor(inf)`, for one, raises. Built: the library raises `DivisionByZero`, as the revised paragraph says. Later, a rung after the switch-over makes `QQ` follow the float ruling (P-68, on rounding the float types). Then `floor` and `ceiling` return `QQ` and pass the infinities through, and the brackets, `round` and `truncate` give `ZZ`. Still to build: that rung, beside P-68's rung for the float types (PLAN, phase 4, "After the names").

Meaning: unchanged; one ambiguous phrase resolved by its source.
- "The methods keep the type" read two ways: which methods, and which type. Way 3 of the question that he took for later gives it: "the `floor` and `ceiling` methods return `QQ` and pass infinities through, while the brackets and `truncate` return `ZZ` and raise". P-68, the float ruling, has the same split (`takeaway-c4.md`, "P-54", the fix).
- Fix round: "keep `QQ`" became "return `QQ` and pass the infinities through", so that "keep" has one sense in the entry (the declared type), and the later state keeps way 3's condition at the infinities. Way 3 does not name 0/0, so the entry says "the infinities" (`check.md`, "P-54").
- "ℤ" became `ZZ`, the same type, so that the entry uses one name.
- The "Why" holds the reason in the question that he took, "follows the declaration and the peers"; the peers were other languages.

Sources:
- The title, the revision and the Why: 2026-10-09T07:28:28.361Z, "QQ's ceiling and truncate per your recommendation that we first make it pass and then we'll later make it consistent with the ruling on, on float.", to the coordinator's 07:19:47.208Z, item 44, way 2: "Keep `ZZ` and raise an error at ±∞ and 0/0: follows the declaration and the peers", with "Python's `math.floor(inf)` raises, and Julia's `floor(Int, Inf)` throws" (`P-54.md`, section 1; `judgement-c4.md`, "P-54"). The repository holds a Python run only, so the entry names Python alone (`compile-ladder/rung-library-slips/REPORT.md:86-96`; `corrections-c4.md`, "P-54").
- The paragraph's old words: `git show 74b28e9d4^:Specification/basic-lib/numbers.tex`, "All of these methods simply return the argument if it is +∞, −∞, or 0/0"; the section name from `PLAN-history.md:262`.
- `floor`, `round` and the brackets: `Library/FortressLibrary.fss:649-657`, where `floor` calls `truncate` and `ceiling`, the brackets call `floor` and `ceiling`, and `round` calls `floor`; climb batch 12's rung S found it (`judgement-c4.md`, "P-54").
- "Built": `Library/FortressLibrary.fss:651` and `:656` throw `DivisionByZero`; `Specification/basic-lib/numbers.tex:471-477` says so (`P-54.md`, section 2).
- The later rung and its state: his words above; way 3 of 07:19:47.208Z; P-68 ("`floor` and `ceiling` on the float types keep the float; ⌊x⌋, ⌈x⌉, `round` and `truncate` return the unbounded ℤ"); the coordinator's record of 07:29:13.328Z, "Making `QQ` consistent with your float ruling comes later, with that rung"; `PLAN.md:90`, P-68's rung, "After the names", in phase 4.

Questions for the curator: none.

Pointers elsewhere, for the coordinator:
- `PLAN.md:90`, P-68's rung, names the float types and `RR32`, not `QQ`. Only this entry and `PLAN-history.md:262` hold the `QQ` part, so a worker who builds P-68's rung from PLAN leaves it out. The line would add: "and `QQ`'s `floor` and `ceiling` return `QQ` and pass the infinities through, while its brackets, `round` and `truncate` give `ZZ` (P-54)" (`corrections-c4.md`, "P-54").
- `review-queue.md`'s settled line for items 42 and 44 quotes "`QQ`'s `ceiling` and `truncate` keep `ZZ` ...", which still opens the title.

## P-55

> - P-55 **A size may hold arithmetic, compared by its written form once its numerals are computed.** The compiled checker accepts a sum, a difference, a product or a power as a size, such as the length in `Vector[\RR64, 16\]`. It computes each operation whose operands are both numerals, from the inside out, so `2 3` is the size `6`. Otherwise it compares two sizes by their written form: `s0 s1` is not the same size as `s1 s0`, though their values are equal. On the compiled path, the class loader computes a size's value when it makes the class of an instantiation. Walk already computes such a size exactly when it makes an instance. The checker counts a size name, such as `b0`, as possibly equal to a numeral, as the team's Q&A in `Specification/appendices/internal-document.tex` answers. So the `N[\0\]` arm of a `typecase N[\b0\]` is reachable. The library keeps the team's sizes written as products and sums, such as a matrix's storage of `s0 s1` cells. Built (F-146 states what the checker accepts).

Meaning: unchanged.
- "A size name may equal a numeral" read two ways (`takeaway-check.md`, "P-55"). The entry now says that the checker counts a size name as possibly equal to a numeral, the words of the question that he took.
- "Folded" became "computes each operation whose operands are both numerals, from the inside out", with the example kept. Fix round: the first round's "each part written only in numerals" left "part" undefined; the new words are the checker's own (`check.md`, "P-55").
- Fix round: the sentence on walk is added, from the question that he answered. It is the state, not his decision.
- The checker's range check of what it folds, and the specification's revision of its identity sentence, stay out, as the audit left them: neither was in the two texts that he saw (`trial/evidence/corrections.md`, "P-55").

Sources:
- Every sentence but walk's and the last: 2026-10-09T13:51:11.783Z, "Item 15: 15a with (b) yes.", to item 1 of the coordinator's 11:56:38.064Z list, whose full form is the coordinator's 07:59:01.341Z text: way 1, "compares sizes by their written form after folding numbers", "`2 3` is `6`", "`s0 s1` and `s1 s0` don't count as equal", "the class loader computes the value"; part (b), "a size name counts as possibly equal to a number, as the team's own Q&A answers. It clears the 2 unreachable branches"; "keeping the team's text" (`trial/evidence/P-55.md`, section 1; `corrections.md`, "P-55", sentences 1 to 6).
- "Each operation whose operands are both numerals, from the inside out": `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:97-100`, "A size with each operation whose operands are numerals computed".
- Walk: the 07:59:01.341Z text, "Today: walk computes such sizes exactly"; `reviews/array-forks-now.md:192`, "Walk computes a size expression when it makes an instance, exactly".
- The four operations: `reviews/array-forks-now.md`, Q15, "The specification", citing `Specification/appendices/grammars/concrete-syntax.tex:540-547`. The example `Vector[\RR64, 16\]` and the matrix's storage of `s0 s1` cells: the same Q15, "Terms" and "The library's own way" (`Library/FortressLibrary.fss`, `mem:PrimitiveArray[\T, (s0 s1) \]`).
- The Q&A: `Specification/appendices/internal-document.tex:167-198`.
- "Built": F-146; `review-queue.md`, the settled line for item 15, "built `7fd8fddc8`".

Questions for the curator: none.

Pointers elsewhere: none to change. The title keeps its opening words, which `review-queue.md` quotes ("A size may hold arithmetic, compared by its written ...").

## P-56

> - P-56 **The open range `(:)` keeps its wildcard type, and its five cutting methods fail.** `(:)` is the range of every index, as in `a[:]`. It is the object `TrivialOpenRange`, which stays an `OpenRange[\Any\]`: the team used `Any` as a wildcard for any index type. Its methods `truncL`, `truncR`, `every`, `imposeStride` and `atMost` cut a range, so each must answer a range over `Any`. The library's range operators build ranges only over `ZZ32` and its pairs and triples, and a range over `ZZ32` is not a range over `Any`. So no body that answers a range passes the compiled checker. Each of the five is a `fail` with a message, the team's own device for a body that cannot answer its declared type. Nothing in the tree calls them on `(:)` but the five tests `ProjectFortress/tests/TrivialOpenRange*Stop.fss`, which pin the `fail`. The other way, `(:)` as a range over `ZZ32`, is not taken. Why: a probe under walk tried that way on small programs. More of them stopped with an error where they had printed a result than printed a result where they had stopped (`reviews/ranges-and-index-types.md`, section 5). Built.

Meaning: unchanged.
- "No body can type them" is stated with its cause, from the review that he read: the methods must answer a range over `Any`, the range operators build only ranges over `ZZ32` and its pairs and triples, and generics are invariant (`reviews/ranges-and-index-types.md`, section 5, "Why the checker cannot type them").
- "Way (c)" and "probe P3" are named by what they are.
- Fix round: "lose their value than gain one" read two ways. The probe's finding is now said in the review's own sense: a value is a printed result, a stop is a run that ends with an error (`check.md`, "P-56").
- The probe's finding is the "Why": it is his reason, "when we ran the probe P3, I understood that basically it made all the things worse" (14:54:50.968Z).

Sources:
- The title, the type, the five `fail` bodies and the way not taken: 2026-10-09T15:01:26.240Z, "OK then.", quoting the coordinator's 14:55:36.046Z, "Batch 12 already built it. If you confirm (a), Q49 is closed.", which explained the five methods, why no body can type them, and the three ways; before it, 14:54:50.968Z, "So I guess only option A with the fail bot is works." (`P-56.md`, section 1; `judgement-c4.md`, "P-56").
- `(:)`, `Any` as the team's wildcard and the five methods: `reviews/ranges-and-index-types.md`, section 5, "What `(:)` is" and "The five methods".
- "The team's own device": `CLIMB-BATCH-12.md:98`, `FullRange.narrowToRange`'s `fail`, written by the team (`P-56.md`, section 2).
- "Nothing in the tree calls them": the review's section 5, "When the five are called"; the five tests, `ProjectFortress/tests/TrivialOpenRange{TruncL,TruncR,Every,ImposeStride,AtMost}Stop.fss` (`corrections-c4.md`, "P-56", change 1).
- The probe: `reviews/ranges-and-index-types.md`, section 5, "(c) `(:)` as a range over `ZZ32`": 186 one-expression walk programs, 25 values become stops, 16 stops become values; "A value: walk runs the program and prints a result. A stop: the run ends with an error instead."
- "Built": `abe8b0342`; F-91.

Questions for the curator: none.

Pointers elsewhere: none to change. `review-queue.md` quotes the title's opening, which is kept.

## P-57

> - P-57 **`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached.** `LexicographicReduction` is the library's reduction behind `BIG LEXICO`, which combines comparisons in dictionary order. `isLeftZero(c)` says whether `c LEXICO x` is `c` for every `x`. The team declared `isLeftZero(_:EqualTo)` as `false` and `isLeftZero(_:Comparison)` as `true`. `TotalComparison`, whose values are `LessThan`, `EqualTo` and `GreaterThan`, lies below `Comparison`. The object also inherits `ReductionWithZeroes.isLeftZero` at `TotalComparison`, which answers `false`. That declaration is more specific, so the team's `true` was never reached. The `true` overload is now declared over `TotalComparison`, so it replaces the inherited one: `LessThan` and `GreaterThan` answer `true`, and `EqualTo` `false`. Why: the curator wants the compiled checker's error count on the interpreter's library at zero. This change removed the last of the count's errors in an api file. Other errors kept the count above zero (F-53 holds the count). Built.

Meaning: unchanged.
- The mechanism is stated: what a left zero is, which declaration hid the team's overload, and why. The words "shadows it" became "that declaration is more specific, so the team's `true` was never reached".
- Fix round: the clause on `TotalComparison` below `Comparison` is added, since the mechanism rests on it (`check.md`, "P-57").
- The "Why" names whose aim it is and what the change achieved: his aim was a count of zero, and the change removed the count's last error in an api file. Fix round: the entry now says that the count did not reach zero, in the past tense, and leaves the count's present value to F-53, which changes it at each landing.

Sources:
- The title, the overload and the three answers: 2026-10-09T15:10:56.122Z, "And you recommend to declare teams parameter total comparison, which takes the count to zero. Hey, let's do it.", to the coordinator's 14:56:40.919Z, way 1: "Declare the team's parameter `TotalComparison`. The team's answers are reached: `LessThan` and `GreaterThan` become `true`, as the mathematics says" (`P-57.md`, section 1; `judgement-c4.md`, "P-57").
- `BIG LEXICO`, the two team declarations and the inherited one: `Library/FortressLibrary.fss:116-130` and `:3342-3346` (`ReductionWithZeroes`); gap-ledger row 582, "`isLeftZero(_:Comparison)` is never reached for a total comparison". "Combines comparisons in dictionary order" is the question's gloss, which he read back.
- The comparison types: `Library/FortressLibrary.fss:132-206`, `Comparison comprises { Unordered, TotalComparison }` and `TotalComparison comprises { LessThan, EqualTo, GreaterThan }`.
- "Left zero": `LEXICO` answers its left side for `LessThan` and `GreaterThan`, and its right side for `EqualTo` (`Library/FortressLibrary.fss:159-214`).
- The Why: the same message, "I like getting the checker counts to zero."; `ddd73d967`'s reason, "every api row is 0 and the count stays 1 from the component check's stop"; climb batch 12's count, `FortressLibrary 2` its only nonzero api row, and batch 13's, every api row 0, `#total 1` in both (`P-57.md`, section 2; `judgement-c4.md`, "P-57"; `check.md`, "P-57").
- "Built": `9ba86f7da`; row 582 fixed.

Questions for the curator: none.

Pointers elsewhere, for the coordinator:
- The refusal of `isLeftZero(Unordered)` under walk left this entry in the audit's apply. Its queue item is now filed: review-queue item 211 (`329d866a9`), and the queue's settled line for row 582 names it. Nothing to do there.
- `PLAN.md:382`, on climb batch 13's pins, says "the `isLeftZero` pins are answered by P-57". That holds for the three pins only, and could name item 211 for `Unordered` (`corrections-c4.md`, "P-57").

## P-58

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers rung by rung, and the compiled checker sees each rung's bindings as that rung lands, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. Still to build: all of it. Every binding still names a glue class, and neither the loader nor the rewrite exists. The first natives rung builds them, test first, and the later rungs move the bindings (PLAN, phase 4, "The natives").

Meaning: unchanged; the built state corrected.
- Fix round, fidelity: the first round's "It no longer names one of walk's glue classes" stated the target as done, and its present tense ("Walk loads", "the compiled path rewrites", "It refuses") read as built. None of it is in the tracked tree. The string, the loader, the rewrite and the refusal are now said as the target ("is to"), and the state line says what exists (`check.md`, "P-58"; `P-58.md`, sections 2 and 5).
- Fix round: an example string gives the form of the string.
- "Meet the checker" became "the compiled checker sees each rung's bindings as that rung lands", the words of the option that he took.
- "Way 2" is named by what it is.

Sources:
- The form, the loader, the rewrite and the refusal: 2026-10-10T05:27:34.812Z, "Item 35, agreed with recommendation, option 1.", to the coordinator's 00:17:43.858Z; under both of its options 1 and 2 the form is `builtinPrimitive` naming a static helper, and the earlier text of 2026-10-09T22:53:37.453Z put the same form as its option 1 (`P-58.md`, section 1; `judgement-c4.md`, "P-58"). The refusal of a string that names no helper: the 00:17:43 text, "The rung needs a rule that refuses a string naming no helper".
- The example string: `reviews/item35-natives-binding.md:101`, `"com.sun.fortress.interpreter.glue.prim.Int$Less"` to `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`; the helper exists (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:297`).
- The timing: option 1 of 00:17:43.858Z, "Rung by rung, from the first natives rung. Each rung's bindings are checked as they land." (`corrections-c4.md`, "P-58").
- The glue classes and the helpers: F-32; `fortress-repo`, `references/interpreter.md` (the natives in `interpreter/glue/prim/`) and `references/compiler.md` (`nativeHelpers/`).
- The form not taken: option 3 of 00:17:43.858Z, "Form 2 instead"; option 2 of 22:53:37.453Z, `import java` in the library, the compiler prelude's form.
- "Still to build": every `builtinPrimitive` string under `Library/` and `LibraryBuiltin/` names `com.sun.fortress.interpreter.glue...`, none `nativeHelpers` (for example `Library/FlatString.fss:36`); no loader or rewriter is tracked (`P-58.md`, sections 2 and 5). The first rung: the 00:17:43.858Z text, "What a yes to 1 means: the natives work starts with the loader rung for the interpreter and the rewrite, test first"; `PLAN.md:81`, phase 4, "The natives", where that rung is N0, the mechanism.

Questions for the curator: none. Whether walk too refuses a string that names no helper is not decided by any source: the refusal in the question is the compiled rewrite's. The entry keeps it there.

Pointers elsewhere, for the coordinator: `PLAN.md:81` quotes this entry by its title before 2026-10-13, "The natives' one binding text is `builtinPrimitive` naming a static helper (item 35).". It would quote the current one.

## P-59

> - P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** Walk has no static types. So where a coercion is needed, walk chooses it by the value's run-time type. The specification and the compiled path choose it by the static type. The curator accepts this as the interpreter's limit, and walk is not changed for it before the switch-over. A callout in the coercion chapter (`Specification/basic/conversions-coercions.tex`) states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC`, the chapter's own printed example, and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12 orders the two steps), it uses the static coercions that the checker inserts. MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so on microGPT walk's choice and the static choice agree. Still to build: walk's use of those coercions, after walk runs the checker on its programs (P-12; PLAN, phase 4).

Meaning: as he decided it; one condition that the record lost is restored.
- Fix round, fidelity: the title and the sentence on the later step ended the limit at the switch-over. His words end it when walk runs the checker, after the switch-over: "we do not touch the walk system until we switch the library and then when ... we start running the type checker in the walk it will gain types and can switch". The record's text had that condition ("once the checker runs on interpreter programs") until `55f1a1352` cut it (`P-59.md`, section 3). The title and that sentence now hold it, and they agree with the state line (`check.md`, "P-59").
- Retitled: "Walk chooses coercions on the value until the switch-over" became "Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over".
- Fix round: "concrete" read two ways. Its sense is the one that the chapter's example shows: a static type that is the value's own type, not a trait above it. The sense is stated; the premise's truth stays question 1.
- "Walk is not changed for it before the switch-over" is his own gloss on his answer.
- "Agree on it" is said whole: on microGPT, walk's choice and the static choice agree.
- The state line is new. The step after the switch-over is not built, and the entry did not say so (`takeaway-c4.md`, "P-59"). P-12 holds the order of the two steps.

Sources:
- The title, the limit, the hold on walk and the callout: 2026-09-29T14:07:20.452Z, "item seven as recommended. So one now and two after the switch.", and "It's just a decision that at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch.", to item 7 of `reviews/decisions-review/judgement.md:354-360`: "1. Accept it: one callout ... item 16 closed with the two tests as its record" and "2. Make walk match: needs static types under walk, which is the checker on interpreter programs, after the switch-over" (`P-59.md`, section 1; `judgement-c4.md`, "P-59").
- The callout: `Specification/basic/conversions-coercions.tex:666-679`. The tests: `ProjectFortress/tests/XXXCoercionStaticRungC.fss`, the chapter's printed example, where walk gives 4 for the text's 3, and `XXXCoercionStaticNarrowRungC.fss` (`P-59.md`, section 2; the review's item 7).
- "Once walk runs the checker on its programs, it uses the static coercions": his words above; option 2 of the review's item 7; the coordinator's 14:08:16.691Z, "Walk then has to take those inserted coercions instead of choosing on the run-time value"; P-12 (`judgement-c4.md`, "P-59").
- "Concrete": `XXXCoercionStaticRungC.fss`, where `c: C = D` gives the static type `C`, a trait above `D`, the value's type, and walk answers 4 where the text gives 3.
- The microGPT sentence: the coordinator's premise on the review page (`judgement.md:356`), kept as it stands while question 1 is open.
- "Still to build": not built (`P-59.md`, section 2); `PLAN.md:87`, phase 4, which names the batch that gives walk the checker's static types; P-12.

Question for the curator:
1. (The audit's question, still open, filed as review-queue item 221.) P-59 ends: "MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so on microGPT walk's choice and the static choice agree." "Concrete" here means that each of microGPT's static types is the type of the value itself, as in the coercion chapter's example the static type `C` is not: `C` is a trait above the value's type `D`. The sentence is the reason that walk's limit does not touch microGPT. The coordinator wrote it on the review page that you answered on 2026-09-29, and nothing has measured it. Today the compiled path cannot run microGPT, so it cannot be checked yet. Keep it as it stands, mark it as unmeasured until the compiled path runs microGPT, or strike it?

Pointers elsewhere, for the coordinator:
- `review-queue.md`'s settled line for rung C's two points, and its line for items 1 to 34, quote old titles: "Walk chooses coercions on the value until the switch-over." and "Walk chooses coercions on the value, for now.". Both need the new title.
- Item 221's text quotes the old sentence, "MicroGPT's static types are concrete, so both paths agree on it", without the sense of "concrete". It would gain the sense, as question 1 above gives it.
- P-12 glosses P-59 as "walk's choice of coercions until the switch-over"; it would read "walk's choice of coercions by the run-time value".

## P-60

> - P-60 **The specification reads a `comprises` clause at the level of values.** `trait S comprises { U, V }` says that every value of `S` is a value of `U` or of `V`. So another trait may stand between `S` and its listed types. The specification defines "covers" once: a type covers another when every value of the second is a value of the first. The Meet Rule gains a case for closed traits. Where the rule asks for a declaration at the meet of two overloads' parameter types, several declarations below both serve, if together they cover the meet. So a call whose argument's static type stands between closed traits and their listed types may have several most specific declarations. The call's type is the intersection of their return types, and the declaration that runs is unique only at run time. Why: the proof addendum (`reviews/comprises-type-level-proof-addendum.md`) shows this sound for ground declarations, at calls that need no coercion. A ground declaration's types hold no type variable, and `G[\ZZ32\]` is ground. The addendum also asks that the checker use coverage only in its overloading rules, to accept an overload set and to justify a call's tie among several most specific declarations, and not in its general subtype test. A declaration with static parameters, whose instance dispatch must choose at run time, is outside the proof: one instance would have to meet every one of the return types at once. The typing by the intersection is not extended to it, and the specification states that boundary. Built: F-175 (the specification), F-76 (the compiled checker) and F-27 (walk's load check).

Meaning: unchanged; one condition restored, one sentence widened back to its source.
- "And the typing by the intersection is not extended to it" is added. The audit's apply moved out the sentence on the checker's narrower condition, a default that waits for him in review-queue item 58. That sentence was the entry's only word that the typing stops short of generic declarations. The source is his forward of Astra's note: "Do not generalize the new typing rule on the strength of the appendix proof." (`takeaway-c4.md`, "P-60", the fix). Item 58, the narrower condition, stays open.
- Fix round: "a generic declaration that needs a run-time instance" became "a declaration with static parameters, whose instance dispatch must choose at run time", with the reason that the specification gives. This is the specification's condition, on the declarations that a call involves. It is not item 58's narrower one, limited to families with no static parameters (`check.md`, "P-60").
- Fix round: "search for coverage only inside its overloading check" narrowed its source. The addendum asks for coverage in overload validity and in the static tie's justification, and not in the shared subtype test. The entry now says all three (`check.md`, "P-60").
- The value reading, "covers", the Meet Rule's case and "run-time uniqueness in place of static" are stated from the specification's own text.

Sources:
- The title, "covers", the Meet Rule's case and the call's type: 2026-09-29T11:25:37.094Z, "Yes", to the coordinator's 11:20:23.184Z, "option 1 with Astra's three points built into 7b's briefs, yes or no?"; option 1 is item 26 as put at 2026-09-28T20:08:52.590Z and 2026-09-29T10:13:54.916Z (`P-60.md`, section 1; `judgement-c4.md`, "P-60").
- The value reading: `reviews/comprises-type-level-judgement.md`, section 1, "The type question, in plain words". "Covers": `Specification/basic/types-vals-vars.tex:607-611`. The Meet Rule's case: `Specification/advanced/overloading.tex:310-322`. The call's type and uniqueness at run time: the same file, `:700-706` and its `revival-meet` callout.
- The Why: `reviews/comprises-type-level-proof-addendum.md:16-25` (ground declarations, calls without coercion, `G[\ZZ32\]` ground), the coordinator's summary that his yes took in.
- The coverage query: the addendum's "use a coverage query local to overload validity (and the static-tie justification) ... Do not broaden the shared normalizer" (`:186-188`).
- The boundary: 2026-09-29T17:29:19.700Z, his forward of Astra's note, "Astra no POPL2019 impact for next batch:", with "that is different from dispatch having to choose a method's type arguments"; `Specification/advanced/overloading.tex:700-706`, the intersection where the declarations a call involves "have no static parameters", and `:727-730`, "For declarations with static parameters one instance would have to meet every one of those return types at once, and the type of such a call is not yet given".
- "Built": F-175, F-76 and F-27, which each say that they build P-60.

Questions for the curator: none. Items 58 and 15 of the review queue hold the two defaults that the audit moved out.

Pointers elsewhere: none to change. `review-queue.md` quotes the title's opening, which is kept. Astra's third point, that the proof holds only where closed traits are in fact closed (rows 487 and 551), has been absent since 2026-10-13; the audit named it for the coordinator and did not restore it (`corrections-c4.md`, "P-60", change 2).

## P-62

> - P-62 **The `covariant` keyword is future work, off the path to microGPT.** The keyword, with `contravariant`, is the team's 2012 declaration-site variance: under `trait C[\covariant S\]`, a `C[\Dog\]` is a `C[\Animal\]`, as with Scala's `+S`. No library declaration and no line of microGPT uses it. Gap-ledger row 404 records the hole: the compiled checker accepts variance, but the compiled run dies with `IncompatibleClassChangeError`, and walk refuses the program. The future work is declaration-site variance, carried to run time on both paths. When it lands, a rung tries to bring back the specification's sign-refined number types as covariant static parameters. P-80 keeps their design word for word in the specification, marked superseded. Still to build: row 404's expected-failure tests, one on the compiled path and one under walk, owed in a batch rung. No PLAN line names them yet.

Meaning: unchanged; the state written out.
- The keyword, the hole and "off the path" are stated from the texts that he agreed to.
- "Its expected-failure tests are owed in a batch rung" became the state line, with the two tests that the agreed text named. No PLAN or queue line holds them, so the entry says so (`judgement-c4.md`, "P-62").
- Fix round: "(P-80, a superseded design)" became a sentence on what P-80 holds: the design, kept word for word and marked superseded, not its rejection alone (`check.md`, "P-62").
- "As with Scala's `+S`" is a gloss that no source holds. It is accurate and decides nothing (`check.md`, "P-62").

Sources:
- The title, the hole, the tests and the future work: 2026-09-26T08:18:07.238Z, "Agreed.", under the quoted heading "The two ledger entries the judgement proposes", to the coordinator's 08:05:53.363Z: not on the critical path, no library declaration or microGPT line uses the keyword, and a defect row "with expected-failure tests, one on the compiled path and one under walk"; that answered his 08:05:26.356Z question (`P-62.md`, section 1; `judgement-c4.md`, "P-62").
- The keyword's meaning and the hole: gap-ledger row 404, binding a `CImpl[\Dog\]` to `a: C[\Animal\]` under `trait C[\covariant S\]` type-checks, the compiled run dies with `IncompatibleClassChangeError`, and walk refuses it.
- The attempt to bring back the sign-refined types: 2026-09-26T11:38:29.550Z, "when we get to covariant that we try this. Let me try to resurrect this.", to the coordinator's 11:21:27.012Z, answer 6 (`corrections-c4.md`, "P-62", change 2); `Specification/advanced-lib/numbers-advanced.tex:14-30`.
- P-80's part: P-80, "`advanced-lib/numbers-advanced.tex` stays word for word, marked superseded in the S1 form (P-96), so that the original design stays on record".
- "Still to build": no `XXX` variance test exists, and row 404's test column is "none" (`P-62.md`, sections 2 and 5).

Questions for the curator: none.

Pointers elsewhere, for the coordinator:
- A PLAN line for the owed tests, beside row 404, would give them a rung; then the state line names it (`corrections-c4.md`, "P-62").
- `fortress-gap-ledger.md`, row 404's note, still names "worklist item 12", which the ledger no longer holds.
- P-80 says "Their return with covariance is P-62's"; P-62 holds an attempt, not a return.

## P-147

> - P-147 **An object defines an inherited abstract method when its bodies of that name at narrower parameter types together cover the abstract method's parameter types.** That is, each value of the abstract method's parameter types is a value of one body's parameter types. A `comprises` clause counts as the compiled checker reads it, which is P-60's reading: a closed trait is covered by its listed types. A body at the abstract method's own parameter types is the plain case. This is the team's rule of 2012, in Steele's abstract-method check of the compiled checker and in the Covered rule of the Welterweight calculus (`Papers/Welterweight/`). So the team's `Library/Pairs.fss` and `ProjectFortress/tests/FileConversion.fss` stay valid: an object in each defines an inherited abstract operator once for each type that a `comprises` clause lists. Walk applies the same rule at load, and its earlier allowance of any one narrower body goes. The traits chapter's sentence, which admitted no narrower body, is revised in the specification's revision form (P-96). Built (F-145). Still to build: the acceptance of some valid objects whose methods have static parameters of their own, which the checker (gap-ledger row 725) and walk (row 728) refuse, and walk's check of generic objects, which its load check skips (row 665).

Meaning: unchanged; the state separated from the rule.
- "Walk agrees with the checker" became "Walk applies the same rule at load", and the state line names the open rows 725 and 728, where some valid objects are still refused (`judgement-c5.md`, "P-147").
- Fix round: the state line adds row 665. Walk's load check skips generic objects, so the rule does not reach them under walk (F-145, "A generic object is not checked (row 665)"; `check.md`, "P-147").
- Fix round: "their objects define" became "an object in each defines". In `FileConversion` one object splits the operator by its listed types and the other defines it once, the plain case (`ProjectFortress/tests/FileConversion.fss:65-82`; `Library/Pairs.fss:78-99`).
- Fix round: the reading of `comprises` is named as P-60's.
- "Cover" and the reading of `comprises` are stated, with what `Pairs` and `FileConversion` do.
- "The S1 form" became the specification's revision form, the name that the `fortress-repo` skill uses (`references/specification.md`, "Changing the text: the revision form").
- "Steele's compiled checker" became Steele's abstract-method check of the compiled checker.

Sources:
- The rule, its sources, `Pairs` and `FileConversion`, the revision and the end of walk's allowance: 2026-10-13T23:43:34.199Z, "I don't see any other credible option to pick from.", to the coordinator's 23:39:05.946Z, item 51, option 1, "Coverage, the team's 2012 rule"; and 23:49:12.486Z, "In accept the recommendation, basically just being informed of the spec edit based on later evidence.", to the coordinator's 23:44:29.416Z (`P-147.md`, section 1; `judgement-c5.md`, "P-147").
- Covering, the two files and the chapter's letter: `reviews/walk-load-readings-check.md`, sections 2.4 and 2.5; `Library/Pairs.fss:78-99`; `ProjectFortress/tests/FileConversion.fss:65-82`.
- P-60's reading: `Specification/basic/types-vals-vars.tex:607-611`; `59fdeff62`.
- Steele's check: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:96-112`; the reading of `comprises`, `59fdeff62`. Welterweight: `Papers/Welterweight/static.tick:27-47`, `fig-covered.tick` (`P-147.md`, section 2).
- The revision: `Specification/basic/traits.tex`, the `revival-covering` callout; P-96.
- "Built" and the open rows: `f9fe5c874`; F-145; gap-ledger rows 725, 728 and 665.

Questions for the curator: none.

Pointers elsewhere: none to change. `review-queue.md` and `CLIMB-BATCH-14.md` quote the title, which is kept.
