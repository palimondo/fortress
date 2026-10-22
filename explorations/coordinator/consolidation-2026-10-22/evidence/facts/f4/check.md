<!-- The FACTS clarity pass, chunk f4, 2026-10-22: the check of the eleven rewritten entries (F-52 to F-61, F-63) against the record, their sources and the cold read, with each failure classed and its wording proposed. -->

# FACTS chunk f4: the check

Read: `proposals.md`, `cold-read.md`, `assessment.md` and `concepts.md` in this folder. Also read: each entry as `FACTS.md` holds it on `main` (`facts-extract.sh 'F-N+'`) and its history (`'history:F-N'`). From each source I read the cited section, and where it mattered the section beside it. I also read the ledger rows that the entries name (325, 412, 426, 443, 454, 474, 510, 533, 632, 731), P-39, P-48, P-74, P-78 and P-87, and the code and tests named below. Nothing was built or run. A path without a root is under `explorations/`, as in the record.

Verdicts: 1 pass (F-60). 6 entries have a fidelity failure (F-53, F-58, F-59, F-61, F-63, and F-57 in part). Every other failure is wording or a missing concept.

## F-52

**Fidelity: pass.** Each sentence matches `reviews/flattening-questions-ways.md`, Question 3:
- The test "declares `RationalQuantity` exactly", and walk runs it "because nothing instantiates the trait".
- The checker says "Cyclic type hierarchy: Type RationalQuantity transitively extends itself".
- "Instantiating the design on walk fails twice over".

Three claims leave, and each is accounted for. The identity goes to F-59 and F-60, and the mixed widths to F-55. The no-argument overload claim now lives only in its source and the history: Question 1, section 2, measured on the compiled path with the compiler library ("the checker picked the String one"). The assessment allows this.

"Refined by sign flags" is a little narrow. The chapter's six `bool` flags are `ninf, lt, eq, gt, pinf, nan` (`Specification/advanced-lib/numbers-advanced.tex:15-27`), which covers infinities and NaN as well as sign. This does no harm.

**Comprehension.** The reader's claim and consequence match the source. They lacked four things:
- what the flags are;
- what "build" means;
- which file the chapter is;
- where the measurement is. The entry says "Measured" and names neither a test nor a command.

**Failures.**
- Wording: "**Neither path can use `RationalQuantity` as the specification declares it: the advanced numbers chapter's rational type, refined by `bool` static parameters for its sign, infinities and NaN (`Specification/advanced-lib/numbers-advanced.tex`).**" For the evidence: "Measured by the note's probes, in the parent of `84aef6a4f` (`reviews/flattening-questions-ways/Q3*.txt`)". `git log` shows that `84aef6a4f` removed them. Write the test's path from the root: `ProjectFortress/tests/conditionalExtension.fss`.

## F-53

**Fidelity: one wrong pointer, one dropped qualifier.**
- "the fused arm of `__bigOperator2` … (row 632, review-queue item 46)". Review-queue item 46 is "A rule on engineering taste" (`review-queue.md:509`). The fused arm is PLAN's item 46, "Pavol's answers" (`PLAN.md:154`, "`__bigOperator2`'s fused arm answers `I0` where `O0` is declared … Review-queue item 40"), and review-queue item 40 (`review-queue.md:396`). The old text's "item 46" meant PLAN's. Settled.
- "Neither measure turns the gate red (P-39)". P-39 says this of the totals. It adds that the count's stage "can still turn the gate red on the faults that F-66 names", such as a crash that no rung listed in advance. The old "never red" also left this out. Now that the sentence cites P-39, it should say what P-39 says.
- The rest holds:
  - `climb-batch-20/gate/distance.txt`: `#total 5`; X1 1, BR 2, OT 2; `#crash none`.
  - `checker-count.txt`: `#total 3`, every api 0.
  - `distance-sites.tsv`: the five sites.
  - `batch-20-review.md` section 1: "the first export error, gone whole", so "the one export error" is right.
  - "every stage of every unit" is from the distance tool's header (`coordinator/tools/distance/run.sh:3`).

**Comprehension.** The reader read the five sites and the 3 correctly. Five things blocked them:
1. **Why the count is 3 when "nothing stops it".** This is settled from the code. The count stage checks one target, `TARGET=Library/FortressLibrary.fss` (`coordinator/tools/checker-count/run.sh`), with the apis it imports, so the `List` component is never checked. `StaticChecker.java` returns at a unit's first failing stage: the type errors are added at `:249`, the return is at `:268-271`, and the export check runs only after that, at `:281-284`. So the count never reaches the export check of a component that has type errors. The distance tool exists so that "every stage of every unit [is] run whatever the earlier stages reported, so that nothing hides behind an early return" (`run.sh:3-4`). The rewrite keeps "every stage of every unit" but drops "whatever the earlier stages reported", and that phrase is what carries the contrast with the count.
2. "Its 3 are the `FortressLibrary` component's own errors, the fused arm and the two `BIG MIN` sites" reads as a list of more than three items.
3. OT is not defined.
4. "Fused arm" is not glossed. The reader's `library.md` even says "no desugaring calls the library's `__bigOperator2`".
5. Where `compile-ladder/gate/distance-sites.tsv` sits.

**Failures.**
- Uncertain fidelity, settled: "(row 632; PLAN item 46, review-queue item 40)".
- Concept: the count stage's scope and its early return. Define it in the `fortress-repo` core's glossary, under "count stage" and "distance". The glossary now says that the count "counts the errors up to each component's first error". That does not explain a count of 3 errors in one component, and it does not say that the count checks only `FortressLibrary`'s component. Proposed: "It checks the apis and the `FortressLibrary` component, each up to its first stage that reports an error, so it never reaches the export check of a component with type errors. The distance stage runs every stage of every unit." `concepts.md` does not list this concept.
- Concept: the distance classes (X1, BR, OT, `#crash`), in `references/gate.md`, as `concepts.md` proposes.
- Wording:
  - "The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54)."
  - "… and the fused arm of `__bigOperator2`, the library's function for two nested big operators, which no desugaring calls: its `typecase` arm answers `I0` where `O0` is declared (row 632; PLAN item 46, review-queue item 40)."
  - "The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage. Nothing crashes now (F-233), so its 3 are that component's type errors: the fused arm and the two `BIG MIN` sites. Every api counts 0."
  - "A rise in either is reported and turns no gate red on its own (P-39)."
  - "… that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites (PLAN, 'The live thread')."

## F-54

**Fidelity: pass.** The moves are the assessment's:
- The numeral sentence goes into F-57.
- Row 680's repair goes to the history.
- The pre-memo timing goes to the history and stays in `distance-triage.md` section 3.4.

The timing claim is now absent from FACTS until F-94 takes it, as the writer flags. The `Array3` sentence keeps the present fact: `distance-sites.tsv` lists no `Array3` site, and `rung-checker-bounds/REPORT.md` section 6 says "None lies in `Array3`".

**Comprehension.** "The component's check runs through `Array3`" names neither the component nor what "runs through" means. OT is not glossed, though X1 and BR are.

**Failures.**
- Wording:
  - "… such as X1 for an export error, BR for a big operator's body and OT for the other body errors, one-off library slips and checker limits (`distance.txt`'s `#class` rows) …"
  - "That gate's `distance.txt` reads `#crash none`: the checker checks the `FortressLibrary` component to its end, `Array3`'s body included, without a crash (F-233)."
- Concept: the distance classes, as under F-53 (`gate.md`).

## F-55

**Fidelity: pass.**
- The rule and its two halves are F-73's and F-137's.
- The mixed widths follow P-74: "infers, on both paths, the narrowest type into which its arguments coerce".
- Row 412 says that the compile path gives "every static parameter with an empty `extends` clause the bound `Object`".
- "Takes `Object` there" matches F-78 and P-48.
- Both gates exist: `compiler_tests/InferCoercionShapes`, `tests/InferCoercionRungK`.
- The new detail is what F-73 and F-137 cite.

**Comprehension.** "A static argument that only the result names is not fixed" leaves the reader asking what it becomes instead. Row 510 answers this by example.

**Failures.**
- Wording: "Under walk, a typed binding converts a call's result after the call and does not fix the call's static arguments: `a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `Int` and is refused, since no coercion converts a `BoxK[\Int\]` (row 510)."

## F-56

**Fidelity: pass.**
- `measure-D.md` section 1.2: the parser makes `f(x)` a tight juxtaposition with `fnApp = false`. "`fnApp = true` comes only from desugarings", and under `fix90` (`:90` alone) DCtx has "14 errors, the same as stock".
- `Operators.scala:75-90` today passes `expected` on both branches.
- The `BottomType` sentence leaves for F-78. Its source is `rung-instance-bound/REPORT.md`, header ("the type-schema comparisons keep `solve` (decision record D1)") and section 1. The writer flags it.

**Comprehension.** The reader lacked "tight juxtaposition". They read "keeps the expected type" as "uses it in inference", which is right. They could not locate `Operators.scala`.

**Failures.**
- Concept: tight juxtaposition. Define it in the `fortress-repo` core's bullet "Juxtaposition is an operator, and whitespace counts": `f(x)`, with no space between, is a tight juxtaposition, and `f x` is a loose one. The parser builds both as juxtapositions, and checking turns them into calls. `concepts.md` does not list this concept.
- Wording: "… keeps the expected type, for inferring the call's static arguments, at a call written `f(x)` …". Write the path: `scala_src/typechecker/impls/Operators.scala:88-90`.

## F-57

**Fidelity: one citation wrong, one sentence whose evidence is split, one sentence that hides a defect.**
- The reason for `x + 1`, "no coercion into an arbitrary `I extends Integral[\I\]` can be declared", is from `distance-triage.md` section 2.3, not 2.2. Section 2.3 reads: "only if a coercion from a numeral into an arbitrary `I extends Integral[\I\]` is known. No declaration can state that today: a generic coercion is refused as a cyclic hierarchy". The same section gives "`x.zero` or `x.one` for a value `x: I`". Section 2.2 holds neither.
- Uncertain fidelity, mostly settled: "only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths".
  - For `x.one` and the witness `typecase`, the evidence is `evidence-B.md` section 6.2: "`x + x.one`: walk … the right type … The checker accepts it". It also measured the witness on both paths.
  - For `x.zero`, nothing was measured. The evidence is by reading: triage section 2.3 for the checker, and `Integral`'s `DIVIDES`, which writes `self.zero` in the library that walk runs (triage section 2.3, `FortressLibrary.fss:674`).
  - The claim is probably true, but the entry should mark the `x.zero` half as read, not measured.
- "Walk also refuses a numeral beyond `ZZ32`'s range bound to `RR64` (row 443)" sits among the range checks, so it reads as a correct refusal. Row 443 is a defect: walk refuses `s: RR64 = 3000000000` "where the specification makes it hold the float `3000000000.0`". The reader carried it as a rule.
- The rest holds:
  - row 454: `NN32` and `NN64` under walk; `RR32` on both paths;
  - row 325: the compiled run raises; "Walk refuses it at the point of use";
  - F-79.

**Comprehension.** The reader could not resolve five things:
- how the library in scope changes a numeral's type. The checker resolves `IntLiteral` and `FloatLiteral` in whichever builtin library is in scope (`compiler/Types.java:61-62`; `evidence-B.md` section 3.1, "one checker line gives two different types");
- whether `Int`, `Long` and `BigNum` are Fortress types. They are the names walk prints for its `ZZ32`, `ZZ64` and `ZZ` values (`evidence-B.md` section 4.1);
- "the numeral switch";
- "witness `typecase`";
- when walk refuses.

**Failures.**
- Wording:
  - "The checker types a numeral `IntLiteral` or `FloatLiteral` by its form, as the builtin library in scope declares those types (F-79)."
  - "Walk types an integer numeral by its magnitude, as a `ZZ32`, `ZZ64` or `ZZ`, which it prints `Int`, `Long` and `BigNum`."
  - "In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy."
  - "… walk refuses it when it runs, at the typed binding it does not fit (row 325). Walk also refuses, against the specification, a numeral beyond `ZZ32`'s range bound to `RR64`, which should hold the float (row 443)."
  - Detail: "`perf-probes/prelude/distance-triage.md` section 2.3; `evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79), `x.zero` by reading".
- Concept: the witness `typecase`, in `library.md`, as `concepts.md` proposes.
- Concept: the numeral switch, in `library.md`, as `concepts.md` proposes. Or gloss it here: "the numeral switch's library half (F-79)".
- Concept: walk's printed names for its number values (`Int`, `Long`, `BigNum`, `Float`, `Ratio`), in `references/interpreter.md`. Every walk error message uses them, as in row 454's "RHS expression type Int is not assignable".

## F-58

**Fidelity: two failures.**
- "Both declarations of `^` that row 533 names have changed too". This is false. The assessment and the writer both have it.
  - `rung-integer-power/REPORT.md` section 7 says that `MultiplicativeRing`'s `^` "is now `abstract opr ^(self, other:AnyIntegral): T` (`:283`), and `RR64`'s api gains `opr ^(self, b:AnyIntegral):RR64` (`:366`)".
  - `RR64`'s `opr ^(self, b:RR64):RR64`, the first declaration of row 533's tie, stands unchanged at `Library/FortressLibrary.fsi:365`.
  - So one of the two changed, and a third declaration came. Settled from the tree. The history note in `proposals.apply` has the same error.
- "Since then the unused sizes are gone (F-35)" is broader than F-35. F-35 says that the api still has "8 declarations with a dead size". What went were "the 17 vector and matrix operators' dead sizes" (decision E's E3), and these are the sizes on which the `DOT` calls failed (`rung-array-sites/REPORT.md:160`, "by reading E3 clears them").

**Comprehension.** From "With the diff … (P-87), 14 remained" the reader concluded "a rough lower bound is 11" on C4's count today. The 14 were measured on a copy patched with decision D's diff, and P-87 says "Nothing of decision D is applied before PLAN's phase 5". C4 as written measured 26. The entry does not say that the diff is unapplied, and that gap caused the misreading. The reader also could not tell what "bridge" names.

**Failures.**
- Uncertain fidelity, settled: "Since then `MultiplicativeRing`'s `^` takes an `AnyIntegral` exponent, and `RR64` declares `^(self, b:AnyIntegral)` beside its `^(self, b:RR64)` (`Library/FortressLibrary.fsi:283`, `:365-366`). Whether the powers still tie, and between which two, is not measured."
- Wording:
  - "Since then the 17 vector and matrix operators' unused sizes are gone (F-35), so by reading the 3 `DOT` refusals are cleared."
  - "On a copy patched with decision D's diff, which sizes the model's arrays and is not applied before phase 5 (P-87), 14 remained: the 5 powers, 3 `DOT` calls …, 1 `reflect` bridge, `adam`'s, that passes arrays sized only at run time, and 5 small slips" (`array-design-ways.md` section 2: "1 is the `adam` bridge").

## F-59

**Fidelity: four failures that the assessment did not catch.** Three come from the old text. One comes from a sentence the rewrite took in.
1. **A condition that does not hold on the checker.** The title and body say that the checker needs the argument "where nothing at the call fixes the element type", which lets a reader think that the clauses can fix it. Row 731 says the checker fixes the parameter "by its bound or the expected type only, never from the clauses". `sum-replacement-judgement.md` section 5, Table 2, measured `SUM[j <- lo#i] (3 j)` declared `ZZ32` and unwritten: "refused". It explains why: inferring from the clauses "would have to solve one inference across a lambda's body, which its design avoids". For a big operator whose bound names its parameter, F-221 adds that "an F-bounded one is still refused". So on the checker every clause form of `SUM`, `PROD`, `BIG MAX` or `BIG MIN` needs its static argument written. The reader drew the wrong consequence: "Write the static argument … when the generators and the body do not fix the element type". C4 itself writes `SUM[\ZZ32\][j <- 0#i] matCount(j)` (`run-c4/src/MicroGptFlat.fss:43`).
2. **The declared-type sentence has no path.** "A declared type that receives the value does not fix the element type." It comes from P-78, which scopes it: "the compiled checker refuses the call without the static argument even then". Under walk a local variable's declared type does fix it. F-228: walk "instantiates its big operator by the declared type of its value, else by the join of its elements' run-time types, else at its bound". The rewrite puts the sentence just before the walk sentence and without a path.
3. **Walk's mechanism is out of date.** "Walk leaves an F-bounded `T` open, so such a call runs there (F-143)". Since F-228, walk leaves the parameter open only where the reduction has neither a declared type nor an element (`revival-changes.md`, "A type parameter whose bound names itself, under walk"). The reader saw that this conflicts with `library.md`.
4. **A clause narrower than its sources.** "A plain-bounded big operator takes the reduction's expected type instead (F-221)". The rewrite took this sentence in. A plain-bounded operator takes its bound first, and the expected type only "where the reduction's type at that bound does not fit it" (`revival-changes.md`). `InferBigOperatorUnwritten`, one of this entry's gates, is exactly a plain bound taken at the bound `ZZ32`.

The narrowing to bounds that name the parameter holds: `Library/FortressLibrary.fsi:1984-2011`. But the list "`SUM`, `PROD`, `BIG MAX` and `BIG MIN`" reads as complete, and `BIG MINMAX`'s bound names `T` too (`:2017`).

On the gates: neither one pins the refusal. `WitnessIdentityRungG` tests the witness on the compiled run, and `InferBigOperatorUnwritten` tests a plain bound that passes. No test in `compiler_tests/` or `tests/` names row 731. The entry should say that the refusal is held by the row, not by a gate.

**Comprehension.** Beyond the four points above, the reader lacked the witness `typecase`, "`SUM e`" and "F-bounded".

**Failures.**
- Uncertain fidelity, settled by row 731, Table 2, P-78 and F-228. The title: "… and the compiled checker needs that argument written in every clause form."
- The body: "The compiled checker takes the element type from neither the clauses nor a declared type that receives the value (row 731; P-78). So for a generic big operator whose bound names its parameter, such as `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, an unwritten static argument has no instance at its bound, and the call is refused. A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit (F-221). Walk runs such a call: it instantiates the big operator at its value's declared type, else at its elements' join, and leaves the parameter open only with neither (F-228, F-143)."
- Wording:
  - "`SUM e` over a collection `e`, and `x DOT y`, need none (P-78)."
  - "Gated, for the witness and a plain bound, by `compiler_tests/WitnessIdentityRungG` and `InferBigOperatorUnwritten`; the refusal is row 731's, and no test pins it."
  - Write "whose bound names its parameter", the core's phrase, in place of "F-bounded".
- Concept: the witness `typecase`, in `library.md`. "F-bounded" is in the core under "Static parameters", as "one whose bound names the parameter itself". The entry should use those words, or the core should add the name. `concepts.md` puts this in the core, and I agree.

## F-60

**Fidelity: pass.**
- The judgement's section 1 measured the zero and the one carried on both paths.
- "the wider type has values below the narrower type's least one"; "`ZZ` and `QQ` have none to carry".
- `ProjectFortress/tests/simpleSum.fss:57-59` asserts the empty `BIG MIN` (`catch x EmptyReduction`).
- `flattening-questions-ways.md` Question 1, section 2: "`BIG MAX` over nothing throws EmptyReduction" under walk.
- P-78: "an empty `BIG MAX` or `BIG MIN` raises `EmptyReduction`". "When measured" bounds the walk run, which predates the flat library.

**Comprehension.** The reader's account matches. Their open points are minor: that `MIN`'s identity is the greatest element, and whether P-78 is built (P-78: "Built for the number types"). Neither changes the meaning.

## F-61

**Fidelity: the three steps are stated as the whole way.** "Making the interpreter's library the compiler's library takes three steps … and the natives are PLAN's phase 4". The source is `perf-probes/prelude/REPORT.md` section 5. Its run stopped in the library's apis, "92 errors at TYPECHECK, in the library's *apis*, before the component is opened". It never reached the later phases, "DESUGAR and CODEGEN: untested". It ends: "And only then would we learn what DESUGAR and CODEGEN make of it."

Since then the component's own errors are the distance, which must reach zero before the switch-over (F-53; PLAN phase 3). So "takes three steps", with two done, lets a reader conclude that only the natives remain. The reader saw the gap: "I cannot tell whether [the distance] is a fourth step". The old text carried the same claim. The rewrite turned the quoted question into the plain goal, and that makes the claim read as current.

The three steps themselves match section 5 and the entries they cite: F-67, F-131, F-32, and PLAN phase 4, "The natives".

**Comprehension.** The reader could not tell what the shim is for, or what `FlatArrays` is. Section 4 settles both: the compiler's prelude, as shipped, reports "`Array is undefined.` 60". `FlatArrays.fss` is C4's (`explorations/run-c4/src/`), and it "*extends* the library's array hierarchy and uses its protocol".

**Failures.**
- Uncertain fidelity, settled from the report. "**`perf-probes/prelude/REPORT.md` named three steps to making the interpreter's library the compiler's: the checker's sizes and the tower's errors are done, and the natives are PLAN's phase 4.**" Then, after the steps: "The report's run stopped in the library's apis, before the component, desugaring and code generation (section 5). The component's errors since are the distance, which must also reach zero before the switch-over (F-53; PLAN phase 3)."
- Wording: "No minimal `Array` or `Vector` added to the compiler's prelude can serve C4's `FlatArrays` (`run-c4/src/FlatArrays.fss`), which extends the library's array hierarchy and uses its whole protocol. Such a shim would reproduce `NativeArray.fss` and about 1,000 lines of the library above it."

## F-63

**Fidelity: "declared otherwise" claims more than was measured.** "With the `split` pair or `zip` declared otherwise, the checker refused the api when measured." The rung measured only the forms before its repair. Family D, "String's duplicated split and splitWithOffsets (2 errors)", and family F, "List.fsi:99 zip (1 error)", are its "Defects and their homes". The other repairs that it tried read the same count as the ones kept:
- the plain pair kept once: "Both choices read 103";
- a `zip` narrowed to `ZeroIndexed[\(E,F)\]`: "Both read 103 (zipnarrow-noP)".

The report's Decisions chose the kept forms by the specification's export rules (`source-code.tex:372-384`, `:399-404`), not by a checker refusal. The reader drew the wrong consequence: "Changing `split` or `zip` makes the checker refuse the api". The old text had the same claim, and the assessment caught only the `Condition.map` half.

The rest holds:
- `Condition.map`: "only P's relaxation makes visible", and the export check compares return types (`ExportChecker.scala:598-610`, `equalOptTypes(retTyL, retTyR)`).
- `QQ`'s `comprises { ... }` is at `FortressLibrary.fsi:398`. The component's `QQ` `comprises { Ratio }` (`FortressLibrary.fss:580`), and `Ratio` is not in the api.

**Comprehension.** The reader could not tell:
- which two declarations make the `split` pair. They are `split` and `splitWithOffsets`, `fsi:2483-2484`;
- what "covariant `zip`" means. They guessed a narrower return type. The removed `List.fsi:99` was `zip[\F\](other: List[\F\]): Generator[\(E,F)\]`, which narrows the parameter of the inherited `zip[\F\](g:ZeroIndexed[\F\]):ZeroIndexed[\(E,F)\]` (`fsi:1333`);
- what `Condition` is;
- what "F-64's refusal misses it" means.

**Failures.**
- Uncertain fidelity, settled from the report: "In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count. The forms kept follow the specification's export rules (the report's Decisions)."
- Wording:
  - The title: "… declares `String`'s `split` and `splitWithOffsets` once, abstract, redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves, has `Condition.map` return `Condition[\G\]`, the component's type, and closes `QQ` by `comprises { ... }`."
  - "No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise."

## Concepts for every worker

The cold reader lacked these. Each is placed where every worker would meet it:
- **The count stage's scope and its early return** (F-53). Put it in the `fortress-repo` core's glossary, "count stage" and "distance". `concepts.md` does not list it.
- **The distance classes** (F-53, F-54). Put them in `references/gate.md`, as `concepts.md` proposes.
- **Tight juxtaposition** (F-56). Put it in the core's juxtaposition bullet. `concepts.md` does not list it.
- **The witness `typecase`** (F-57, F-59) and **the numeral switch** (F-57). Put both in `references/library.md`, as `concepts.md` proposes.
- **"F-bounded"** (F-59). The core already defines the idea. Either name it there, or the entries use the core's phrase.
- **Walk's printed names for its number values**: `Int`, `Long`, `BigNum`, `Float`, `Ratio` (F-57, and every walk error message). Put them in `references/interpreter.md`. `concepts.md` does not list them.
- **The record's paths.** For every entry, the reader could not tell what a path without a root is relative to: `explorations/` for notes, and `ProjectFortress/` for `tests/` and `compiler_tests/`. State this once, in `records.md`, "The record", or in the short orientation.
