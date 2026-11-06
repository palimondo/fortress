# Cold read: c-run3/c33

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and `references/records.md`, `interpreter.md` (by grep). One gap for every row: the skill names the seven status words (`records.md`, "The gap ledger") but defines them only in the ledger's row template, which a cold reader may not read. I read `NEGATIVE-VERIFIED` as "the gap is confirmed to exist" and `CONTESTED` as "whether it is a gap at all is in question"; that is inference, not the skill.

## Row 29

- **Defect:** Walk has no multifix dispatch. For `a OP b OP c` with an infix operator repeated between three or more operands, walk never looks for an n-ary declaration of `OP`; it folds the chain into binary calls, left to right. The same holds for a tight (no-whitespace) juxtaposition of three items when a ternary `opr juxtaposition` is declared. The compiled path does multifix.
- **Where:** walk only; operator application in `interpreter/evaluator/Evaluator.java:994`. The enclosing operators are exempt.
- **Reproduce:** no reproducer. Declare a ternary `OTIMES`, or a ternary juxtaposition, plus binary ones, and run `a OTIMES b OTIMES c` / `a(b)(c)` under walk: two binary calls run (`V(24.0, n=2)`; `123` where compiled gives `1023`). The probe `explorations/spec-probes/p13_multifix2.fss` was deleted by `e879b6a44`; get it with `git show e879b6a44^:PATH`.
- **Status:** confirmed gap, open: a fix in walk's evaluator could be built, starting with an XXX test, since there is no reproducer yet.
- **Could not resolve:**
  - `V(24.0, n=2)` and `K(10 a.i + b.i)` / `K(900 + ...)`: the probes' own types, never defined in the row. I can guess `n` counts children and `K` encodes which declaration ran, but the row does not say so. Unclear wording.
  - "tight juxtaposition of three non-function items": "tight" I read as "no whitespace"; the skill says whitespace matters but does not use "tight". Language concept, partly found.
  - "Found by: ours": a label I cannot decode. Unclear wording.
  - "Workaround: a reduction over a concatenation monoid": which reduction, which monoid, in which library trait? The skill says the algebra is self-typed traits, "not monoids over an operator parameter", which makes "monoid" here read two ways. Unclear wording.

## Row 11

- **Defect:** An object declaration may not have a varargs parameter; the parser rejects it with `Varargs parameters of objects are not allowed.` The frozen spec removed varargs object parameters, so this is the design, not a bug.
- **Where:** both paths (shared parser); the error production of `parser/TraitObject.rats:198`.
- **Reproduce:** no reproducer; write `object O(xs: ZZ32...) end` and run it. Probe `explorations/fable-review-probes/RvwVarargsObj.fss`, deleted by `e879b6a44` (read via `git show e879b6a44^:...`).
- **Status:** confirmed and a design limit: leave it, use a factory function (varargs functions do work).
- **Could not resolve:**
  - "Found by: blinded": unknown label. Unclear wording.
  - The cited workaround probe is `p12_multifix.fss`, whose name says multifix, not varargs; a worker might doubt it is the right file. Unclear wording.
  - The exact varargs syntax of Fortress is not in the skill. Language concept I lack.

## Row 97

- **Defect:** Walk refuses, when it loads, two overloads whose parameter types are unrelated and do not exclude (`AnyVector` beside `AnyMatrix`, `List[\ZZ32\]` beside `Range[\ZZ32\]`), by its Meet Rule check: "are unrelated (neither subtype, excludes, nor equal)". The fix the rule asks for, a third overload at the meet (intersection) of the types, cannot be written: it fails with `BottomType is undefined.` So the pair cannot be declared at all under walk. Also refused: `Array[\RR64,ZZ32\]` beside `Array[\RR64,(ZZ32,ZZ32)\]`, though those exclude as instances (row 416).
- **Where:** walk; `interpreter/evaluator/values/OverloadedFunction.java:603`. The check runs only on a cold cache (row 342).
- **Reproduce:** no reproducer; probes `explorations/run-b/probes/c10_anyvector_dispatch.fss` (from `ed6dafb52^`), `explorations/run-b2/probes/g4e_meet.fss` (from `22ea0cd90^`), and `explorations/apl/rung-1/r01_native.fss` (present). Clear the caches first, or the check does not run.
- **Status:** confirmed; class design limit (specification), so leave the refusal and use the workaround: `Vector`/`Matrix`, whose `Rank1`/`Rank2` exclude (row 214). The `Array` case belongs to row 416.
- **Could not resolve:**
  - "design limit (specification)" beside a message from walk: is the refusal right by the spec (only the meet being unwritable is the limit), or is walk too strict? The `Array` case reads as a walk bug, yet sits under a spec-limit class. Unclear wording.
  - "The meet gives `BottomType is undefined.`": the meet of what, written how (an intersection type `AnyVector ∩ AnyMatrix`?). The skill knows `Bottom` but not how a meet is declared. Language concept, partly found.
  - "Only a cold cache runs the check": which cache (`interpreter_cache/` or `interpreter_parsed_cache/`)? Unclear wording.
  - "siblings: 297, 416" and "full text: history, row 97": I take the second to mean `explorations/fortress-gap-ledger-history.md`; "siblings" is not defined in the skill. Unclear wording.
  - "Found by: run-b, run-b2": batch labels. Unclear wording.

## Row 735

- **Defect:** Under walk, an object that inherits one method signature from two sibling traits keeps the declaration of whichever trait comes first in its `extends` clause. With bodies in both, the first one's runs; with one abstract, the order decides whether the object is refused or the body runs. The spec's Meet Rule would refuse (or require a resolving declaration); the checker refuses all four cases ("Invalid overloading of m in trait O"). The library's `DelegatedIndexed` shows it: mixed with `Sized` (size 77), `size` answers 3.
- **Where:** walk; `interpreter/evaluator/values/Constructor.java:182-183` (keyed by signature) and `:846-859` (`putIfAbsent`).
- **Reproduce:** run `ProjectFortress/tests/XXXDottedMethodMeetInheritedWalk.fss` under walk: the case `extends { B, A }` with `A`'s `m()` abstract, which runs `b` where it should be refused.
- **Status:** confirmed gap with an XXX test in place: build a fix in walk's `Constructor.java`, making the test pass.
- **Could not resolve:**
  - "dotted declarations": I read it as methods called with a dot (`o.m()`), against functional methods; the skill does not use the word. Language concept, not found.
  - "an abstract one beside a body is refused or runs the body by the order": clear only once the notes give both orders. Unclear wording in the claim.
  - Spec cell `advanced/overloading.tex` has no root folder: `Specification/` or `Specification-1.0-frozen/`? Unclear wording.
  - "no library type is so": I read it as "no library type inherits that way today, so the library is not hit", but the `DelegatedIndexed` sentence just before it says the opposite could happen. Unclear wording.
  - "Found by: climb batch 16's Q1 probe" and the source `compile-ladder/rung-export-last/SKEPTIC.md`, `SkMix2`: batch names, and a path with no `explorations/` prefix. Unclear wording.
  - "siblings: 444, 572": undefined term, as in row 97.

## Row 265

- **Defect:** The APL base library (project code, not the Fortress tree) keeps one frame stack, written by `push` without `atomic`. Fortress runs a tuple's elements and a call's arguments or operands in parallel, so two `aplCall`s in one such group race on it: at `FORTRESS_THREADS=4` a frame is read before it is written (`Access to uninitialized element 1 of array PrimitiveArray[\Any,1024\]`). At one thread it does not show. This is the language working as specified; the fault is the APL base's.
- **Where:** walk (the only path named); `explorations/apl/base/AplCore.fss:1158-1163` (`push`) and `:1172-1177` (`aplCall`); `aplEachT2`/`aplEachT3` at `:1827-1837` already sequence.
- **Reproduce:** no reproducer; run an `¨` over a three-call tuple of `aplCall1` with `FORTRESS_THREADS=4`; outputs in `explorations/apl/microgpt/checks/model_run_threads4.out.0` and `threads4_crash.txt`, from `1ee3b0bc5^`.
- **Status:** confirmed, a design limit: leave the language alone; in APL code, put such calls in a block (sequential). The model has no other such group, so microGPT is not at risk now. Design questions are in row 245.
- **Could not resolve:**
  - `¨`, "strand", `aplCall1`: APL-base terms (each, a list of items) that the skill does not hold. Language concept, not found (they are the APL base's).
  - "a block" as the workaround: that a `do ... end` block sequences its expressions is implied, not stated in the skill, which names only `seq(...)` for loops. Language concept, partly found.
  - "Design: row 245": what row 245 decided is not said. Unclear wording.
  - Class "design limit (specification)" for a bug in project code: I read it as "the spec permits the race", but it could be read as a limit of the spec itself. Unclear wording.
  - "Found by: apl microgpt rung": label. Unclear wording.

## Row 258

- **Defect:** Under walk, a function declared to return `Object` may return a tuple, though a tuple's type is a subtype only of `Any`. The APL base relies on it: `aplTup` returns a tuple as `Object`, and `aplEach` (`¨`) over matrix cells of unequal shape returns them that way, at arity 2, 3 or 9; other lengths are refused catchably. Vector cells give a nested array instead and stay a `CallerViolation`. `Object` is the only type it can declare, since `Any` breaks the family's dispatch (row 240).
- **Where:** walk; `explorations/apl/base/AplCore.fss:1726-1731` (`aplTup`) and `:1743` (`aplEach`); walk's return-type check, file not named.
- **Reproduce:** no reproducer; `explorations/apl/rung-5/Rung5.fss` check Y20, probes `explorations/apl/microgpt/probes/x03_lib.fss`, `x04_gram.fss` from `1ee3b0bc5^`. Write `f(): Object = (1, 2)` under walk and see that it runs.
- **Status:** `CONTESTED`: whether walk is wrong is in question. Wait on that question; do not fix walk yet, since the APL base depends on the behaviour.
- **Could not resolve:**
  - What the question is and who settles it: the row says "the type is contested" but not the opposing reading. Unclear wording.
  - "the nine-name destructuring rule": not defined in the row or the skill; I guess a rule of the APL base that binds up to nine names from the tuple. Unclear wording.
  - "refused catchably": by a thrown, catchable exception? Unclear wording.
  - `CallerViolation`, "row 252's strand-as-tuple on a computed strand", "the family's dispatch": APL base terms and row cross-references with no gloss. Unclear wording.
  - Where in walk the return check lives is not cited, so a fixer has no starting file. Unclear wording.
