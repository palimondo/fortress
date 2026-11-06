# Cold read: reconcile r2, clean.txt

Six rows: 414, 489, 510, 416, 371, 293. Read with `CLAUDE.md`, the `fortress-repo` skill's core and its references (not `revival-changes.md`, not `sources.md`). The status words' definitions live in the ledger's row template, which a cold reader may not read; `records.md` lists the seven words but does not define them. I read `NEGATIVE-VERIFIED` as "the gap is confirmed to exist and is open", and say so below where it matters. No row's file holds a duplicate's added text.

Two cell words recur in every row and are not in the skill: "siblings:" (I read: related rows to read alongside, not duplicates) and "full text: history, row N" (I read: the row's earlier, longer text is in `explorations/fortress-gap-ledger-history.md`, which `records.md` names). Both readings are guesses from context; neither blocks a row.

## Row 414

- **Defect:** The rule that no type may extend two instantiations of one generic trait is not enforced by the compiled checker when one instantiation's argument is a static parameter. `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }` is accepted, because `n` might differ from 3; but when `n` is 3 the two coincide, so the rule should refuse it. The same holds for a type parameter (`Vt[\T\]` beside `Vt[\ZZ32\]`). The program then compiles and dies when the class loads: the JVM's `ClassFormatError` "Duplicate interface name". The cause: the extends check uses `definitelyExcludes` ("provably different", built for overloading) where the rule needs "not provably the same".
- **Where:** compiled path, the checker: `TypeHierarchyChecker.scala:297` at commit c124c6b65. Construct: an `extends` clause listing two instantiations of one generic trait, one at a static parameter. Walk also runs both programs, which the row hands to row 371.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNatExtendsTwice.test`; or compile the `O[\nat n\]` program from the claim and run it, and see `ClassFormatError` at load. The note gives a third form, `Odd[\T\]`, where the two instantiations arrive indirectly through `Full[\T\]` and `Tag[\ZZ32, T\]` (both reach `Box`); it is accepted, and refused once renamed `Odd[\V\]`, because of row 489's bug.
- **Status:** Open and confirmed; build a fix. The note names it: a declaration-rule check of its own in `TypeHierarchyChecker`, not a change to `definitelyExcludes` (which overloading also uses). No curator question is named.
- **Could not resolve:**
  - "the type twin": I read it as "the same program with a type parameter in place of the size", which the claim then spells out. Unclear wording, but resolvable.
  - "`079f54ea9` accepts": a commit hash used as the subject of "accepts". I read it as "the checker at commit 079f54ea9". It is not said whether the tree at the row's other pin, c124c6b65, or the current tree behaves the same. Unclear wording.
  - That `Full[\T\]` extends `Box[\T\]` is not stated, only that `Box` comprises it. I inferred it, since otherwise `Odd` would not reach two `Box` instantiations. Unclear wording, minor.
  - "rung Z (D4)" in Found by: "D4" means nothing to me. Provenance only, does not block.

## Row 489

- **Defect:** When the compiled checker checks that an extender of a generic subtrait is eligible under a generic closed trait's `comprises` clause, it reads the clause in the subtrait's own type-variable names and does not substitute the extender's arguments. So the verdict depends on what the extender calls its type variable: `trait Paired[\S\] extends { Filled[\S\], Marked[\S, ZZ32\] }` under `Crate[\T\] comprises { Filled[\T\] }` is refused ('immediate subtype Marked is not eligible'), and the same trait spelled `Paired[\T\]` is accepted. A verdict must not change under a rename.
- **Where:** compiled path, the checker: `TypeHierarchyChecker.scala:333` (check) and `:327` (`subst_comprises`), at c124c6b65. Construct: `comprises` on a generic trait, with a generic extender. Walk runs both spellings.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.test`, which holds the `Paired` program; compile it as `Paired[\S\]` and as `Paired[\T\]` and compare.
- **Status:** Open and confirmed, but do not build the fix yourself. A repair is written (`explorations/compile-ladder/rung-comprises-checker/SKEPTIC.md`), and it changes code that the curator approved (P-44, P-60), so the decision is the curator's: wait.
- **Could not resolve:**
  - Which verdict is right is not stated. The row says the verdict changes on a rename, but not whether `Paired[\S\]` should be accepted or refused, and it does not give `Marked`'s declaration. If `Marked[\A, B\]` extends `Crate[\A\]` (like row 414's `Tag[\T, U\] extends Box[\T\]`), then refusing `Paired[\S\]` is the bug; if it extends `Crate[\B\]`, then `Paired` extends `Crate[\S\]` and `Crate[\ZZ32\]`, row 414's gap, and accepting `Paired[\T\]` is the bug. The test exists, but a worker writing the fix needs the row to say which. Unclear wording (missing declaration).
  - "the subtrait": three generic traits are in play (`Crate`, `Marked`, `Paired`); the row's "subtrait" (the one whose variables are used) and "extender" are not tied to the names in the example. I read "subtrait" as `Marked` and "extender" as `Paired`. Unclear wording.
  - "in the subtrait's own type-variable names" versus "in the subtrait's variables, not substituting the extender's arguments to the subtrait": read together these say the same thing; fine.
  - POSITIONS P-44 and P-60 are cited without their titles, so a reader cannot tell what the approved code is without printing them. Unclear wording, resolvable by a query.

## Row 510

- **Defect:** Under walk, a typed binding's declared type is not used to infer a call's static argument when that argument appears only in the call's result type. `a: BoxK[\ZZ64\] = wrapK(3)` infers the argument from `3` alone, gets `BoxK[\Int\]`, and is refused as not assignable to `BoxK[\ZZ64\]`. A method call, `a: BoxT[\ZZ64\] = Fac.mk()`, gets `BoxT[\Any\]` (the bound). The specification's inference uses the expected type, and the compiled checker gets `T = ZZ64`. A bare result (`i: ZZ64 = idK(3)`) works only because the binding converts the value itself, which no coercion does for a box.
- **Where:** walk only. Construct: a variable declaration with a type, whose right side is a generic function or method call with an unfixed static parameter mentioned only in the result. Code named for the repair: `LHSEvaluator`, `BuildEnvironments` (interpreter).
- **Reproduce:** `ProjectFortress/tests/XXXInferExpectedTypeRungK.fss`, run under walk. The method form, which also covers assignment and a field declaration, is `XXXExpectedTypeFixRungT`.
- **Status:** Open and confirmed; the fix's shape is known (pass the declared type into the call's inference), but whether to do it before the switch-over is the curator's (P-12). So: wait on that question before building it; meanwhile write `wrapK[\ZZ64\](3)`.
- **Could not resolve:**
  - `Int` in `BoxK[\Int\]`: not one of the number types the skill lists (`ZZ32`, `ZZ64`, ...). I guess it is the library's type of an integer literal, or a trait above the integer types. A language concept I lack and could not find in the skill.
  - "takes `BoxT[\Any\]`": I read it as "is given the bound `Any`", per the skill's rule that an unfixed parameter takes its bound; it is not said whether the binding then fails or runs. Unclear wording.
  - "A clause form takes the binding's declared type (F-228)": what is a "clause form"? A comprehension or reduction (the skill says walk instantiates those at the declared type), or a `where` clause? I read the first. Unclear wording.
  - `XXXExpectedTypeFixRungT` has no folder or extension. I guess `ProjectFortress/tests/XXXExpectedTypeFixRungT.fss`. Unclear wording, minor.
  - "since the binding converts a result that is the type parameter itself": I read "when the result type is the bare type parameter, walk converts the value to the declared type". Readable on a second pass.
  - "whether before the switch-over (P-12) is the curator's": does P-12 already decide it (and the row should say how), or is it an open question? Read two ways. Unclear wording.

## Row 416

- **Defect:** Walk's overload check at load does not know that two distinct instantiations of one generic trait exclude each other (they must, since no type may extend both). So it refuses `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` as "unrelated", though the pair is valid; the compiled path accepts it and dispatches, printing 3 and 4. It likewise refuses overloads on two traits extending `Tg[\3\]` and `Tg[\4\]`, and row 97's `Array[\RR64,ZZ32\]` beside `Array[\RR64,(ZZ32,ZZ32)\]`.
- **Where:** walk only, its check at load: the refusal in `OverloadedFunction.java:589-604` at c124c6b65; the missing case, by reading only, in `FType.excludesOther` (`FType.java:197-210`).
- **Reproduce:** `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss` under walk; it is refused at load with "first parameters b:[Tg[\4\]] and b:[Tg[\3\]] are unrelated". Run it compiled to see 3 and 4.
- **Status:** Open and confirmed; build a fix: teach `excludesOther` that two different instantiations of one generic type exclude each other. No curator question named. The cause's location is "by reading", so confirm it before editing.
- **Could not resolve:**
  - "instantiation exclusion": not a term in the skill. I read it from the skill's rule "No type may extend two instantiations of one generic trait", from which the exclusion follows. A language concept, found only by inference.
  - "and overloads on two traits extending `Tg[\3\]` and `Tg[\4\]`": refuses them, or the opposite ("overloads" as a verb, i.e. accepts)? Read two ways. I read "refuses". Unclear wording.
  - The last two sentences: "Two generic declarations that differ only in an element type load (F-155). So `checkSelection` is named by rank (`Library/RangeInternals.fss:125-172`; F-91)." I cannot tell how they bear on the defect, what "named by rank" means, or why "So" follows. My best guess: because walk refuses such overloads, the library had to give one function separate names per rank instead of overloading on instantiations, which a fix would let be undone. Unclear wording; this is the hardest passage in the file.
  - "the three homes", item 5, in a cited report: a heading, so it does not need understanding here.

## Row 371

- **Defect:** Walk does not check an `excludes` clause against an `extends` clause. `object Both extends { A, B }` with `trait A excludes { B }` should be refused, since no value may have both types, but walk loads and runs it. The same holds for the generic form (`U[\T\] excludes { V[\T\] }`), the size form (`Vec[\3\]` and `Vec[\4\]`, row 414), and `trait Tx extends Any excludes { Object }` with an object of type `Tx`, which is an `Object` anyway. The compiled checker refuses each, with 'Types A and B exclude each other' or 'Type Both excludes A but it extends A'.
- **Where:** walk only. It does not run `TypeHierarchyChecker` (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:166-190`), the compiled checker's home for these checks (`TypeHierarchyChecker.scala:298-300` and `:307-308` at d4d454f9d). A fix could go in walk's ordering of a trait's extends list (`FTraitOrObject.java:236-251`).
- **Reproduce:** no test is named. Write the `Both` program from the claim, run it under walk (it runs) and compile it (refused). The other forms in the notes serve as further cases. Row 293's carrier is a form where walk loads the program and the failure shows later, as a `+` that fails with 'has neither body nor def instanceof Method'.
- **Status:** Open and confirmed; build a fix, under walk, one of the two named places. No curator question. A worker must write the reproducer test first.
- **Could not resolve:**
  - "refusing with 'Types A and B exclude each other' ...": the subject is `TypeHierarchyChecker`, which walk skips; on a first read it seems to say walk refuses. Unclear wording, resolved by the claim.
  - "or one where walk orders a trait's extends": "one" means "a check of its own", placed in `FTraitOrObject`. Unclear wording, resolvable.
  - "its object an `Object`": I read "the object that extends `Tx` is an `Object`, which `Tx` excludes". Terse, resolvable.
  - The size form (`Vec[\3\]`, `Vec[\4\]`) is an extends-two-instantiations case, not an `excludes` clause; I read it as the implicit exclusion between instantiations (row 416). So walk's half of row 414's rule seems to live here, while row 414 is classed as the checker's. A worker fixing walk should take it from this row; the row could say so. Unclear wording.
  - The checker is cited at d4d454f9d here and at c124c6b65 in rows 414 and 489, with nearby but different lines (`:297` there, `:298-300` here). Not an obstacle, but a reader wonders whether these are the same code.

## Row 293

- **Defect (what holds):** A design limit, not a bug: `Vector` and `Matrix` are declared `excludes { AnyMultiplicativeRing }`, because for them juxtaposition means the inner product, not the ring product. So no elementwise `×` is defined on them through the ring traits. The obvious way out, a type that extends both `Matrix` and `MultiplicativeRing`, does not work: the compiled checker refuses it, and under walk it loads but its inherited `+` fails (row 371).
- **Where:** the library: `Library/FortressLibrary.fsi:1647` and `:1759`. Both paths, since it is a library declaration.
- **Reproduce:** no test. The probes `explorations/run-c4/probes/vocabulary/v01c_matrix_times.fss`, `v02_ring_excluded.fss` (the carrier) and `v02b_ring_juxt.fss`, which existed in the parent of commit `11bf69c39`; read one with `git show 11bf69c39^:<path>`.
- **Status:** Leave it. It is by design; the class says "design limit". Use the workaround: a top-level `×` function (row 161). It is the cause of row 109, so a worker on row 109 should read this one first.
- **Could not resolve:**
  - `NEGATIVE-VERIFIED` on a design limit: if the word means "a confirmed open gap" (my reading for the other rows), it does not say whether anything is to be done here. The template's definitions are not readable cold. Unclear wording, or a concept missing from the skill.
  - "carrier": I read "a type that carries both declarations". A term not in the skill, resolved from the context.
  - `AnyMultiplicativeRing` versus `MultiplicativeRing`: the first is in the exclusion, the second in the way-out. I guess `AnyMultiplicativeRing` is the non-generic root above `MultiplicativeRing[\T\]`. A library concept I lack (`library.md` does not name either).
  - "in the parent of `11bf69c39`": does it mean the files were deleted by that commit? I read so. Unclear wording, minor.
  - "Cause of row 109" and "row 161": what they hold is not said; a worker must look them up. Fine for a cross-reference.
  - "run-c4 vocabulary" in Found by: provenance only.

## Summary

| Row | Verdict |
| --- | --- |
| 414 | Clear. Small doubts: "the type twin", the hash `079f54ea9` as subject. |
| 489 | Blocked in part: the row does not say which verdict is right, nor give `Marked`'s declaration; "subtrait" and "extender" are not tied to the example's names. |
| 510 | Mostly clear. `Int` is not a type I know; "clause form" reads two ways; whether P-12 settles the timing is unclear. |
| 416 | Defect clear. Its last two sentences (F-155, "`checkSelection` is named by rank") do not connect to it; "overloads on two traits" reads two ways. |
| 371 | Clear. The size form mixes in row 414's walk side without saying so; no reproducer, so a worker writes one. |
| 293 | Clear as a design limit. `NEGATIVE-VERIFIED` does not say "leave it"; `AnyMultiplicativeRing` is not in the skill. |
