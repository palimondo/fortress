<!-- Conformance review of compile-path ladder rungs 5 to 8 (9373985b4, 54861b62a, 2027f519b, 40216550c), asked for by Pavol on 2026-09-17 through the coordinator: did these rungs fill their gaps in the spirit of the original team's design, or are they point solutions that make tests pass. Written by a review worker that read the commit diffs, the rung reports, the specification, the interpreter library, the compiler prelude and the compiler's own phases; no source file, ledger, or configuration was edited, nothing was built, and nothing was run. Rungs 1 to 4 are another worker's. The brief's original framing treated the rungs' record-and-continue choice on ledger row 317 as a discipline failure; Pavol challenged that, the coordinator withdrew it, and the sections on that question were rewritten against row 317's actual contents rather than caveated. -->

# Rungs 5 to 8 against the specification, the team's built intent, and the design record

## How to read the three standards

Standard 1 is the specification in `Specification/`, which is Pavol's measuring stick on record (POSITIONS.md, 2026-09-16: "finish what the designers intended, judged by the latest committed spec").

Standard 2 is the team's intent as built: the interpreter's finished library for the same concept, the compiler prelude's unfinished drafts, the commented-out blocks, and the compiler phases the team wrote and wired.

Standard 3 is the design record beyond the spec, indexed by `explorations/coordinator/map/design-intent-sources.md`.

One caveat that governs standard 1 throughout and that none of the four rungs states: `Specification/library/structure.tex:25-31` says in the team's own words that Part Library "is largely automatically generated from the API code for the libraries themselves, and describes the state of the libraries as of the release date of this specification. The libraries are presently in a state of flux."

So `Specification/library/apis/FortressLibrary.tex` is a rendering of `Library/FortressLibrary.fsi`, and `Specification/library/apis/CompilerBuiltin.tex` is a line-for-line rendering of `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` (compare `CompilerBuiltin.tex:374-395` against `CompilerBuiltin.fsi:378-400`; they are the same declarations in the same order).

Rung 5 cites `library/apis/FortressLibrary.tex:3302-3310` as "the shape is the spec's" and rung 7 cites `library/apis/CompilerBuiltin.tex:390` as "the published api"; in both cases the citation is to a generated copy of the file being reasoned about, and in rung 7's case it is a rendering of the unfinished compiler prelude's own `.fsi`, which is circular.

That does not make either rung wrong, but it means standards 1 and 2 collapse into one for those citations, and the reports present them as two.

---

## Rung 5, `9373985b4`: the operator `//` on `String`

### 1. The specification

The specification proper is silent on `//`: it appears nowhere in `Specification/basic/`, and the only statement about it is in the generated Part Library, `Specification/library/apis/FortressLibrary.tex:3302-3310`, which prints the prose "opr // concatenates with a single newline separator" and four declarations — `(self)`, `(self, a:String)`, `(self, a:Any)`, `(a:Any, self)`.

That prose and those four declarations are a rendering of `Library/FortressLibrary.fsi:2358-2362`, so there is no independent specification of `//` to violate, and the rung does not violate the rendering either: the one form it landed is one of the four.

No spec finding against the rung. The spec's silence is the finding.

### 2. The team's intent as built

The interpreter implements the four forms at `Library/FortressLibrary.fss:4057-4060` as `self || newline || a`, plus the top-level postfix `opr (x:Any)//` at `:4206`, and the separator is `newline`, which is `lineSeparator` at `Library/String.fss:557`.

The compiler prelude's `trait String` collapses the interpreter's `(self, a:String)` and `(self, a:Any)` pairs into a single `(self, b:Object)` for `||`, `|||` and `juxtaposition` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:387-389`), so the rung's single `(self, b:Object)` at `:390` follows the file's own collapse and is not the rung's invention.

Two narrowings remain, both named in the commit message and in ledger row 316: the prefix `//(self)` and the left-operand-at-`Any` form `(a:Any, self)` are not supplied, so `5 // "x"` and a leading `// s` are still undefined on the compiled path; and the separator is `makeCharacter(10)`, that is LF, where the interpreter uses the platform's `lineSeparator`.

`Object` is strictly below `Any` in this world (`CompilerBuiltin.fss:337`, `trait Object extends Any`; `AnyType.fss:15`, `trait Any end`), so the collapse is not literally total, but it is the collapse the team already made for `||` in the same trait, which is the relevant precedent.

### 3. The design rationale beyond the spec

`map/design-intent-sources.md:112` records that for the split between the compiler prelude and the interpreter library there is **no** rationale source anywhere from the project's own era; nothing argues for a separate `CompilerBuiltin` world at all.

That is the honest position for this rung: with no rationale to consult, following the target file's own idiom is the best available reading of intent, and that is what the rung did.

### Verdict: in the spirit

The edit is one line in the file's own idiom, the narrowings are argued and recorded, and the only substantive divergence from the interpreter — LF against `lineSeparator` — is invisible on this platform and is argued (the compiler world has no system-property counterpart).

---

## Rung 6, `54861b62a`: the comparing operators of `IntLiteral`

### 1. The specification

There is no trait `IntLiteral` in the specification; it is the implementation's name for the numeral types, and what the spec fixes is the numeral's **value**: `Specification/basic/expressions/literals.tex:83-85` gives a digits-only numeral the type `NaturalNumeral[\n,10,v\]` "where $v$ is the value of the numeral interpreted in radix ten", and `:86-87` adds `Literal[\v\]`.

`literals.tex:132-148` gives the reason numerals have their own types at all: "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic", the worked example being loss of precision, and "\Library\ define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)."

Nothing in the spec bounds a numeral's value, and `Specification/basic-lib/basic-integers.tex:16-17` puts the target of that coercion, `ZZ`, at "all finite integers".

The spec is silent on how the comparing operators of a numeral type are implemented and on whether they exist at all, since under `literals.tex:132-148` the comparison is meant to happen after coercion, at a number type.

The rung's bodies do not by themselves violate the spec; what they expose does, and that is §6 below.

### 2. The team's intent as built

The rung says it draws "the line the interpreter draws for itself at `FortressBuiltin.fss:472-481`", and the operator selection is right: the interpreter keeps `<`, `<=`, `>`, `>=`, `=`, `CMP` live and comments the arithmetic family out from `:483`.

The implementation is not the interpreter's. The interpreter's comparisons go through `cmp` (`FortressBuiltin.fss:480-481`), which is `IntLiteral$Cmp` in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java`, comparing `BigInteger` values held in the value itself (`:36-45`, `toB`); the rung's go through `asZZ64`, which is 64 bits and throws above `2^64-1` (`compiler/runtimeValues/FIntLiteral.java:74-77`).

So the interpreter's comparison is exact at every magnitude and the rung's is not, and the rung's report presents the difference only as a boundary case ("on a literal of `bitLength` above 64 `asZZ64` raises ... where `walk` answers `false`"), not as a fidelity gap against the line it claims to be copying.

`asZZ` was available (`CompilerBuiltin.fsi:374`) and is the wider, more faithful route; the rung says so itself and left the choice open on the grounds that `ZZ`'s compiled path is exercised by nothing. That is a defensible conservatism, and it is not what makes this rung a problem.

`MIN` and `MAX` over this trait's own `<=` is sound and is the right place for them.

The larger intent question the rung did not ask: the compiler world has a whole phase for this. `PhaseOrder.java:57,137-147` puts `INTEGERLITERALFOLDING` in `compilerPhaseOrder` **before** `TYPECHECK` and nowhere in `interpreterPhaseOrder`; `desugarer/IntegerLiteralFoldingVisitor.java:58-108` folds `< <= > >= = NE` on two literal operands in `BigInteger` and emits a `BooleanLiteralExpr`; the team's own test for it is `ProjectFortress/compiler_tests/IntegerLiteralsFolding.fss`, whose assertions include `3 < 4 < 5` and `3 =/= 4`.

Read together with that phase, the `throw CompilerFailureDetectedAtRunTime` bodies stop looking like unfinished work and start looking like the bodies of cases the team's design intends to be unreachable — folded away before typecheck.

They are not in fact unreachable, because folding is syntactic and cannot see a literal bound to a variable, which is exactly the case the rung's three files hit, so the rung's bodies are genuinely needed and the rung is not duplicating the phase. What is missing is only the framing: the phase is where the team put this design, and knowing it was there would have told the rung that the throwing bodies are the bodies of a case meant to be folded away, not merely unfinished work. That matters much more for rung 7 than for rung 6.

### 3. The design rationale beyond the spec

`map/dormant-code.md:44` already indexes the commented-out block with its stated reason and cross-references it to ledger 19; `map/test-coverage.md:112` already records `IntegerLiteralsFolding` as one of 47 dark files in `compiler_tests`, and `:189` already records that in the compiler prelude's test suite "nothing mentions `QQ` or the literal types".

Both facts were written down before the climb and neither reached the rung.

### Verdict: deviation, argued and defensible

The deviation is `asZZ64`, not the rung's handling of what it surfaced.

The operator selection is the interpreter's. The implementation is narrower than the interpreter's, whose `cmp` is exact at every magnitude, and narrower than the spec's unbounded numeral, since `asZZ64` throws above `2^64-1` where `walk` answers. The rung named the narrowing, named `asZZ` as the wider route, and left the choice open, which is the right way to leave it.

The one thing I would put differently is a claim rather than a decision: the report says it is drawing "the line the interpreter draws for itself", and that is true of which operators are live and not of how they compare. The fidelity gap should have been stated.

On the consequence — the loud-to-quiet change on literals of `bitLength` exactly 32 or 64 — I examined whether the rung had any in-scope way to avoid or contain it and found none, which is dealt with in the literal-wrap section below. The rung's stated reason for landing ("not a regression, since the same program threw ... before this rung") is not the reason that justifies it, but the decision it reached was the only correct one available.

---

## Rung 7, `2027f519b`: four arithmetic operators of `IntLiteral`

### 1. The specification

Same ground as rung 6: `literals.tex:132-148` says numerals are not converted to number types and that libraries define coercions from them; the spec defines arithmetic on `ZZ` and its variants (`basic-lib/basic-integers.tex`) and on nothing called a numeral type.

Under that model, `a = 2147483647; b = 2; a b` should be an operation at a number type reached by coercion, not at the numeral type. Rung 7 makes it an operation at the numeral type.

The spec does not say which number type, and `basic/conversions-coercions.tex:19-37` is an open-questions note that leaves exactly this kind of case unsettled; `conversions-coercions.tex:762-905`, widest-need evaluation, decides it from context, and there is no context in `println (a b)`.

So: the spec is clear that the operation belongs at a number type after coercion, and silent on which. The rung deviates from the first half and could not have been guided by the second.

One thing the spec is not silent about, and which matters below: wrapping is a named, opt-in operation in Fortress. `basic-lib/basic-integers.tex:369-370` and `:400-401` make `BOXPLUS`/`DOTPLUS` and `BOXMINUS`/`DOTMINUS` the wrapping and saturating spellings, and say plain operations on `ZZ` "never need to wrap or saturate". Nothing in Fortress wraps silently by design.

### 2. The team's intent as built

`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:483-485` is the team's own instruction about this exact edit: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals."

It sits three lines below `:472-481`, which rung 6 cited by line number the same day. The rung read the file, took the lines above the comment, and did the thing the comment forbids without mentioning that the comment exists.

Its precondition is unmet: coercion is not implemented. Ledger row 19 is NEGATIVE-VERIFIED, "coercion declarations parse and are then ignored by both walk and typecheck", and the rung's own framing says the same thing from the other side — "because an applicable `IntLiteral` overload is always found, coercion to `ZZ32` or `ZZ64` never runs". Filling the bodies makes the precondition permanently unmeetable for these operators.

The mechanism the team built for compiled literal arithmetic is the folding phase, not a run-time helper: `IntegerLiteralFoldingVisitor.java:64-69` folds `+ BOXPLUS DOTPLUS` and `- BOXMINUS DOTMINUS` and `BY BOXCROSS DOTCROSS DOT BOXDOT juxtaposition` in `BigInteger`, `:143-158` folds prefix `-` and `|_|`, and `:70-76` even carries the division-by-zero cases into `Infinity`, `NegativeInfinity` and `UndefinedNumber`.

Rung 7's helper covers `add`, `sub`, `mul`, `neg` — a strict subset of the folder's family, computed with the same `BigInteger` operations, landed as a second implementation at run time.

The helper's own shape is only half the team's. The interpreter's `IntLiteral` glue holds a `BigInteger` in the value and reads it with `getLit()` (`interpreter/glue/prim/IntLiteral.java:40-42`); rung 7's `simpleIntLiteralArith.java:25-27` does `new BigInteger(a.toString())` on every operand of every operation and formats back on the way out.

That is forced by the compiler world's `FIntLiteral` representation (`compiler/runtimeValues/FIntLiteral.java:21-37`, the "store-the-relevant-form-in-one-field trick"), so it is not a free choice — but its consequence is that all untyped-literal integer arithmetic on the compiled path now goes through a decimal parse and a decimal format per operation, which is the same defect class as ledger row 302's finding that the `FFloatLiteral` decimal round trip is about 30 % of the compiled scalar loop's gap, and which `PLAN.md` step 2 names as one of the two runtime defects to remove.

One point in the rung's favour, which its report does not make and which matters: the folder is exact, so the compiler world's own design already answers literal arithmetic in arbitrary precision, and the compiler world's `ZZ32` arithmetic is **checked**, not wrapping — `nativeHelpers/simpleIntArith.java:74-76,94-98`, `intOverflowingMul` throws `fortress.CompilerBuiltin$IntegerOverflow`.

So the value rung 7 produces for `2147483647 · 2`, namely `4294967294`, agrees with what the team's folder would produce for the same expression written as two literals, and it is the interpreter's `-2` that is the outlier, because the interpreter's `IntLiteral extends ZZ32` (`FortressBuiltin.fss:461`) and its `ZZ32` wraps silently where the spec says wrapping has its own spelling.

That makes the rung's semantics arguably right and its process wrong, which is the distinction the verdict turns on.

### 3. The design rationale beyond the spec

`map/design-intent-sources.md:102` is the row for coercion and names commit `128f313b5` (2009-11-17, jmaessen, "coercion of `IntLiteral` by `ZZ32`, as we gradually migrate to a flat numeric hierarchy") as the one place the direction of travel is stated: literals were to be got out of the way by coercion, not given an arithmetic of their own.

`map/dormant-code.md:44` carries the commented-out block and its stated reason with the cross-reference to ledger 19.

### Verdict: deviation, unargued

The mechanism was argued well — the shadow run, the interface-descriptor finding, the `NamingCzar` clause and the `specialFortressDescriptors` alternative are all careful and all recorded.

What was never argued is the deviation itself: whether `IntLiteral` should carry arithmetic at all, against an instruction in the file the previous rung had just cited; whether a run-time helper or the existing folding phase is where it belongs; and which of exact numeral arithmetic, coercion-then-checked-`ZZ32`, or the interpreter's wrap is the answer the compiled path should give.

The commit message states "No design fork was taken and no test was moved or deleted." The first half is not true: `a = 2147483647; b = 2; println (a b)` now answers `4294967294` compiled against `-2` under `walk`, and that difference is a semantics choice, not a defect of the old code — before the rung the compiled program threw.

POSITIONS.md is explicit that "a decision made inside a worker's report and recorded in one line is a decision not made; flag it to him at the time", and this one was not recorded at all.

Again the remedy is depth rather than a halt: the architecture review POSITIONS.md (2026-09-17) calls for would have found the folding phase and the instruction before any Java was written.

---

## Rung 8, `40216550c`: the accumulator `SUM`

### 1. The specification

`Specification/basic/expressions/reductions.tex:29-33` gives the header of a big operator as generic: `opr BIG Op[\T\](g:(Reduction[\R0\],T->R0)->R0):R`.

`Specification/basic/operators/big-opr.tex:20-22` says the libraries "define several big operators including $\sum$, $\prod$, and `BIG` $\wedge$", and `reductions.tex:50-54` fixes `\sum a` as equivalent to `\sum [x <- a] x`, the unary form over a generator, which is the second of the two declarations the rung landed.

The spelling is right and is not a guess: `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:252-253` turns the token `SUM` into the operator named `BIG +`.

The rung's forms are monomorphic — `GeneratorZZ32` in, `ZZ32` out — where the spec's header is generic over `T` and `R`. That is narrower than the spec, but the spec does not forbid a library from declaring a monomorphic instance, and the rung declares no semantics the spec contradicts.

The empty-generator case the rung's test pins, the reduction's identity `0`, is what `ZZ32Addition.empty()` already said (`Library/CompilerLibrary.fss:464`) and is consistent with the spec's desugaring to `var result: ZZ32 = 0`.

No spec violation.

### 2. The team's intent as built

The two lines are a structural copy of the `opr BIG MAX` pair immediately below them (`Library/CompilerLibrary.fss:480-481`), and they use `ZZ32Addition` (`:463-466`), a reduction object the team wrote and nothing used — at `sealed-tree` it was at `:430` with the `BIG MAX` pair at `:444-445` and no `BIG +` anywhere.

That is the strongest possible standard-2 evidence: the team built the reduction object, built the idiom, wired the generator and `__bigOperator` (`CompilerLibrary.fss:330-336`), and left the two lines unwritten. The rung wrote exactly those two lines.

The interpreter's version is `opr SUM[\T extends Number\](): Comprehension[\T,Number,Number,Number\]` and `opr SUM[\T extends Number\](g: Generator[\T\]): Number` (`Library/FortressLibrary.fsi:1820-1822`, bodies `.fss:3041-3045`) over `SumReduction`, which extends `CommutativeMonoidReduction[\Number\]` and declares `DistributesOver` relations to the max and min reductions (`FortressLibrary.fss:3021-3040`).

So the generic form is a real destination and the monomorphic form is a stopgap — but it is the team's own stopgap, the same one they took for `BIG MAX`, `ReductionZZ32`, `ReductionString` and `GeneratorZZ32` throughout `CompilerLibrary`, and undoing it means building the generator tower, which is precisely the half of ledger row 74 the rung left open and said it was leaving open.

One unverified consequence worth a probe rather than a claim: the interpreter's `SUM` returns `Number` while the rung's returns `ZZ32`, and the compiler world's `ZZ32` addition is checked (`simpleIntArith.java:62-72,94-98`), so a sum that overflows 32 bits may throw compiled where the interpreter answers. No test in the tree covers it.

### 3. The design rationale beyond the spec

`map/design-intent-sources.md:106` is the row for generators and reducers: the whole construction exists "to defer the sequential-versus-parallel decision out of the program and into library code selected by dispatch", and `research/extracts/SteeleFourSolutions2015-code-extract.md:227-241` is the "Algebraic Properties Are Important!" slide, where associativity is what buys the parallelism.

The interpreter's `SumReduction` carries that apparatus and the compiler world's `ZZ32Addition` does not; `__bigOperator` in `CompilerLibrary.fss:330-336` is what decides whether the split happens at all.

The rung does not weaken any of this; it uses the mechanism as the team left it. Reaching the algebraic layer is Pavol's standing item (POSITIONS.md, 2026-09-15, "fleshing out the standard library") and is not this rung's business.

### Verdict: in the spirit

Four lines in the team's own idiom, over the team's own unused reduction object, in the parser's own spelling, with the residual scope named in the commit and in ledger row 74.

The monomorphic form is a stopgap that will need undoing when the generator tower lands, and the rung says so.

---

## The literal-wrap question

This is the section Pavol asked to be settled, so it is stated from the top rather than by reference.

### What the defect is

`CodeGen.forIntLiteralExpr` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3859-3893`) branches on `BigInteger.bitLength()`: `<= 32` emits `bi.intValue()`, `else if <= 64` emits `bi.longValue()`, else emits the decimal string.

`bitLength()` excludes the sign bit, so a non-negative value fits a signed `int` exactly when `bitLength() <= 31` and a signed `long` exactly when `bitLength() <= 63`; the two tests are each off by one, and every non-negative literal in `[2^31, 2^32-1]` and in `[2^63, 2^64-1]` is truncated to a negative value.

`4294967295` becomes `-1`. The author's comment two lines up is "This might not work" (`CodeGen.java:3862`), and the team flagged the same defect from the other end: `compiler/runtimeValues/FIntLiteral.java:79` reads "This is a cheap fix. Problem in codeGen.forIntLiteral."

Rung 7's own new code gets the same test right: `simpleIntLiteralArith.java:29` uses `r.bitLength() < 64` before calling `FIntLiteral.make(long)`, which is the correct signed test. The rung wrote the correct form of the test in a new file and left the incorrect form two files away untouched.

### Is `IntLiteral` arbitrary precision, per the spec

Yes, and the spec is unusually explicit for a reason it states.

`Specification/basic/expressions/literals.tex:83-85` gives a digits-only numeral the type `NaturalNumeral[\n,10,v\]` "where $v$ is the value of the numeral interpreted in radix ten"; `:86-87` adds `Literal[\v\]` for a numeral without leading zeros; `:127-129` says every numeral also has type `Numeral[\n,m,r,v\]`. The value is a static parameter of the numeral's own type, and nothing bounds it.

`literals.tex:132-140` states why numerals get their own types at all: "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic", with the worked example being precision loss on a long decimal.

The team implemented for that: `FIntLiteral` carries a `String` branch precisely for values that do not fit a `long` (`FIntLiteral.java:27-37`), and `forIntLiteralExpr`'s third branch emits one. Arbitrary precision is both specified and built; only the two range tests are wrong.

### Is a silent wrong answer a spec violation, or outside what the spec addresses

It is a violation, on two independent grounds.

First, the numeral's value: a compiled program in which `4294967295` denotes `-1` has given the numeral a value other than the `v` that `literals.tex:83-85` fixes, and there is no clause anywhere in `Specification/basic/` permitting a numeral to be truncated to fit a machine word.

Second, the manner: in Fortress, wrapping is a named operation with its own spelling. `basic-lib/basic-integers.tex:369-370` and `:400-401` define `BOXPLUS`/`BOXMINUS` as the wrapping operators and `DOTPLUS`/`DOTMINUS` as the saturating ones, and say the ordinary operators on `ZZ` "never need to wrap or saturate". A language that gives wrapping its own operators is a language in which silent wrapping is not an implementation liberty.

The compiler world agrees with that reading in its own code, which is why this is not merely my reading: `nativeHelpers/simpleIntArith.java:74-76` and `:94-98` make `ZZ32` multiplication throw `fortress.CompilerBuiltin$IntegerOverflow` rather than wrap.

So: the tree contains a silent wrap of a literal in a language whose own compiler prelude throws rather than wrap, and that is a specification violation of the implementation, predating every rung on this ladder.

### Did rungs 6 and 7 make it worse in a way that matters

The defect got wider three times, and the three should be kept apart. Widening is not the same as culpability, and the next section takes that separately; this section is only what changed.

First, reach. Before rung 6, the undeclared-binding path threw `CompilerFailureDetectedAtRunTime` from the stub; after it, `compiler-probes/p37.fss` answers `true` where `walk` answers `false`. Rung 6 did not create the class — the declared path through `ZZ64.coerce` was already silently wrong, which is what `p37a.fss` shows — but it extended the silent class from declared bindings to undeclared ones, which is the common case.

Second, kind. Rung 7 moved the defect from comparison to arithmetic: `compile-ladder/rung7/probes/p39.fss`, `a = 4294967295; b = 1; println (a + b)`, gives `4294967296` under `walk` and `0` compiled, and the committed `p39.walk` and `p39.compiled` say so. A wrong boolean is recoverable by inspection; a wrong number propagates.

Third, and not recorded anywhere, rung 7 made the compiled path disagree with itself. `println (4294967295 + 1)` is two literal operands, so `IntegerLiteralFoldingVisitor.forOpExprOnly` (`:162-168`) folds it before typecheck to the literal `4294967296`, whose `bitLength` is 33 and which therefore takes the correct `long` branch and prints `4294967296`; the same arithmetic written through two variables is `p39`, which prints `0`. The same expression, same magnitudes, two answers on the same backend, decided by whether the operands were named. This is reasoned from `IntegerLiteralFoldingVisitor.java:162-168`, `PhaseOrder.java:142` and the committed `p39` outputs; it was not run, and it should be run before it is put in the ledger.

### Was recording the row, rather than repairing, the right call

Yes, for rung 6, and I take back the framing I started this review with.

`PLAN.md` says "Then the edit, as small as the test needs", and says of Java and Scala edits "Shadow first when the edit is in Java or Scala and the outcome is uncertain". Rung 6's test is eight comparison bodies in one `.fss`; `CodeGen.java` is neither what the test needs nor something the rung could touch without `ant compileAll`, a shadow run and a codegen test of its own. Rung 3 is the standing precedent that a codegen rung is a legitimate rung, which is to say a separate one.

I looked for an in-scope containment and there is none. The wrap is in the emitted constant, so `FIntLiteral` holds `smallerVal = -1` with no record that the source numeral was `4294967295`; the two are indistinguishable to every getter and therefore to every library body. My own earlier suggestion — make the wrap loud — is itself an edit to `CodeGen.java` or `FIntLiteral.java`, so it fails the same scope test it was offered against, and I withdraw it as a criticism of rung 6. It remains a live option for the codegen rung.

So rung 6 had exactly two moves: land the comparisons with a verified row naming the defect and its fix, or refuse the rung. POSITIONS.md (2026-09-17) rules out the second. It made the only correct one.

Row 317 is the artefact that makes that judgement stand, and it meets the standard a deferred defect has to meet: NEGATIVE-VERIFIED; a specification citation, `basic/expressions/literals.tex:83-85`; probes kept both ways with outputs committed under `compile-ladder/rung6/probes/`; the exact location of the fix and the exact form of it, "the two narrow branches need to test the signed range rather than `bitLength`"; the statement that no library edit reaches it; and the consequence in the row's own words, "Surfaced by rung 6 ..., which turned the loud half of it into a quiet one". A row a later rung can execute from without rediscovering anything is the ledger working, not a rung evading.

Rung 7's widening of the row is the same call on the same reasoning and I judge it the same way. The finding against rung 7 in this review is not about row 317 and does not depend on it.

### Does the specification settle it, and what follows for process

It settles it, against the implementation, and that matters for what the correct process response is.

Row 317 already carries `literals.tex:83-85`, which fixes the numeral's value as `v` interpreted in radix ten. The second half is not in the row and should be: `basic-lib/basic-integers.tex:369-370` and `:400-401` give wrapping and saturating their own operator spellings and say ordinary operations "never need to wrap or saturate", so a silent wrap is not an implementation liberty in this language, and the compiler world's own `ZZ32` throws `IntegerOverflow` rather than wrap (`simpleIntArith.java:74-76,94-98`).

Because the spec settles it, this is not the case POSITIONS.md (2026-09-17) is about. That position governs "a divergence the specification does not settle". This is a plain conformance defect with a known site and a known fix, so the response owed is not a fork, not a halt and not a deeper architectural pass — it is a verified row and a scheduled rung, which is what exists.

What follows is about ranking rather than about either rung: a NEGATIVE-VERIFIED row that violates the specification, is silent, has a known two-site fix and is the third member of a class the ledger already annotates "The most dangerous item here" (row 79) should outrank further library rungs on the same trait. Which rung comes next is the coordinator's call and not the worker's, which is the subject of the next section.

### The reporting question, about the loop and not the rungs

The decision to keep climbing over a known silent divergence was taken inside the loop, written into a ledger row and two rung reports, and never put to Pavol as a decision at the time. I think that is a defect of the loop's reporting surface, and it is separable from the rungs' engineering, which was correct.

The rungs discharged what a rung can discharge. Row 317 is complete; both commit messages state the consequence in their opening paragraphs rather than burying it; the probes are committed both ways. Nothing was concealed and nothing was under-recorded.

What has no owner is the step above. POSITIONS.md says "A decision made inside a worker's report and recorded in one line is a decision not made; flag it to him at the time", and nothing in the loop carries a row of this class out of the ledger and into a message. The ledger is an accumulator, not an alarm: rows 79, 317 and the unrecorded `2147483647 · 2` case are three members of one class — the compiled path silently answering differently from the interpreter — and no mechanism ranks that class, raises it, or reports that it grew twice in one day.

The concrete gap, stated so it can be fixed: there is no rule that opening or widening a NEGATIVE-VERIFIED row of the silent-divergence class is surfaced at the time, and no derived view that lists that class. Both are cheap. That is my answer to whether the non-surfacing was a rung failure: it was not, and looking for it in the rungs is looking in the wrong place.

### The repair, and why it is not a typo fix

Changing `l <= 32` to `l <= 31` and `l <= 64` to `l <= 63` at `CodeGen.java:3864` and `:3874` makes both branches exact for both signs, and nothing else in `forIntLiteralExpr` needs to move.

It does not stand alone. `FIntLiteral.asNN32` (`:80-85`) and `asNN64` (`:86-91`) currently depend on the wrap: an `NN64` literal in `[2^63, 2^64-1]` is stored as a negative `long` today and `asNN64` returns exactly the right unsigned bit pattern, whereas after the fix it would take the `String` branch and `asNN64` would throw `outOfRange`. So the codegen fix has to be landed together with `asNN32`/`asNN64` learning to read `largerVal`, and the "cheap fix" comment at `FIntLiteral.java:79` is the team pointing at that coupling.

That makes this a small codegen-plus-runtime rung with its own test, not a two-character edit — which is worth saying plainly, because "it was two characters" would be the wrong lesson.

### Blast radius of the coercion path

The rung 6 repair agent's claim is correct and is narrower than the truth.

`ZZ64.coerce(x: IntLiteral) = x.asZZ64` was at `CompilerBuiltin.fss:557` when rung 6 cited it and is at `:562` now, because rung 7 inserted a five-line `import java` block above it; ledger row 317's citation of `:557` is stale as of `2027f519b`.

There are five coercions out of `IntLiteral`, and every one of them reads the value after the wrap has already happened, because the wrap is in the emitted constant and not in any getter.

`ZZ.coerce(x: IntLiteral) = x.asZZ` (`CompilerBuiltin.fss:501`) goes through `FIntLiteral.asZZ()`, which is `FZZ.make(this.toString())` (`FIntLiteral.java:92-94`), and `toString()` renders the wrapped `smallerVal`. So `a: ZZ = 4294967295` is `-1` in the type the spec defines as "all finite integers" (`basic-lib/basic-integers.tex:16-17`). This is the worst of the five and is not called out in row 317.

`ZZ64.coerce` (`:562`) returns the wrapped `long` for both affected ranges.

`ZZ32.coerce(x: IntLiteral) = x.asZZ32` (`:620`) is worse than wrong-valued: `FIntLiteral.asZZ32` (`:67-72`) range-checks `smallerVal` against `Integer.MIN_VALUE`/`MAX_VALUE`, and the wrapped `-1` passes that check, so the out-of-range diagnostic the team wrote is defeated by the wrap and `a: ZZ32 = 4294967295` silently becomes `-1` instead of raising `Not in range for ZZ32`.

`NN32.coerce` (`:684`) and `NN64.coerce` (`:747`) are accidentally correct, because the wrapped two's-complement pattern is the unsigned value; `FIntLiteral.java:79`'s "cheap fix" comment is the team recording that accident.

`RR64` and `RR32` are not in the radius through coercion — `CompilerBuiltin.fss:857` and `:905` coerce only from `FloatLiteral` — but `IntLiteral.asRR64` (`FIntLiteral.java:96-99`) reads the same wrapped field, so an explicit `.asRR64` on such a literal gives `-1.0`.

So the blast radius is: every non-negative integer literal with `bitLength` exactly 32 or exactly 64 — that is `[2^31, 2^32-1]` and `[2^63, 2^64-1]`, about 2.1 billion values in the first range alone — reaching `ZZ`, `ZZ64` or `ZZ32`, whether the binding is declared or not, in every compiled program, with the `ZZ32` range check defeated, `NN32`/`NN64` accidentally right, and no workaround known.

Since the folder emits `makeIntLiteralExpr` with a `BigInteger` result (`IntegerLiteralFoldingVisitor.java:64-69`), the same wrap catches folded constants too, so the radius includes compile-time-folded arithmetic whose result lands in those ranges.

---

## Genuine defects found, ranked

1. **`CodeGen.forIntLiteralExpr`'s two off-by-one range tests** (`CodeGen.java:3864,3874`) — a specification violation against `literals.tex:83-85` and `basic-lib/basic-integers.tex:369-370`, silent, reaching five coercion paths and the folder's output, with the `ZZ32` range check defeated as a side effect. Correctly deferred by rungs 6 and 7 to a codegen rung and correctly recorded as row 317; the finding here is what the row still lacks — the `ZZ` half, the defeated `ZZ32` check, the second spec citation, and that the repair is coupled to `FIntLiteral.asNN32`/`asNN64`. It should be the next rung on this trait.

2. **The compiled path now answers a literal expression two different ways depending on whether the operands are named** — folded and correct for `println (4294967295 + 1)`, run-time and wrong for `p39`'s variable form. New with rung 7, unrecorded anywhere, reasoned from `IntegerLiteralFoldingVisitor.java:162-168` and `PhaseOrder.java:142` and not yet run.

3. **A new silent compiled-against-`walk` divergence on in-range literals**: `a = 2147483647; b = 2; println (a b)` gives `4294967294` compiled and `-2` under `walk`, created by rung 7, found by its skeptic, never written down. Unlike defect 1 this is not a wrap defect; it is the semantics choice rung 7 made, and the compiled answer is arguably the better one, which is why it needs a row and a decision rather than a fix.

4. **`ProjectFortress/compiler_tests/IntegerLiteralsFolding.fss` has no `.test` file**, so the team's only test of the folding phase is dark (`map/test-coverage.md:112`). Writing the missing `.test` file is the smallest possible rung, and had it been written first it would have led the climb to the folder before rung 7 built a second one.

5. **Rung 7 introduced a decimal round trip per arithmetic operation** on the compiled path (`simpleIntLiteralArith.java:25-31`), the same defect class as ledger row 302's `FFloatLiteral` re-parse, on the path `PLAN.md` step 2 is trying to make fast. Forced by `FIntLiteral`'s representation, so it is a design consequence rather than a mistake, but it belongs on the performance record.

6. **Ledger row 317 cites `CompilerBuiltin.fss:557` for `ZZ64.coerce`**, which rung 7 shifted to `:562` five hours later. Small, but it is the citation the row rests on.

7. **Rung 5's LF against the interpreter's `lineSeparator`** (`CompilerBuiltin.fss:390` against `Library/String.fss:557`) is a latent compiled-against-interpreted output divergence on any platform whose line separator is not LF. Invisible here, real elsewhere, and not in the ledger.

---

## Proposed ledger changes, for the coordinator to make or reject

I have added nothing. These are proposals.

**Amend row 317**, four additions: that `ZZ.coerce(x: IntLiteral) = x.asZZ` (`CompilerBuiltin.fss:501`) puts `-1` into the type the spec defines as all finite integers, which is the row's strongest single statement and is currently absent; that `ZZ32.coerce` defeats `FIntLiteral.asZZ32`'s own range check rather than merely returning a wrong value; that the repair is `l <= 31` and `l <= 63` at `CodeGen.java:3864,3874` **coupled** to `FIntLiteral.asNN32`/`asNN64` learning to read `largerVal`, because those two currently depend on the wrap; and that the `ZZ64.coerce` citation is now `:562`.

**Amend row 317's spec column** to add `basic-lib/basic-integers.tex:369-370,400-401`, which is what makes this a violation rather than an unaddressed case: wrapping in Fortress has its own operator spellings, so silent wrapping is not an implementation liberty.

**Open a new row** for the folded-against-run-time disagreement: the same literal arithmetic answers `4294967296` when written as two literals and `0` when written through two variables, `IntegerLiteralFoldingVisitor.java:162-168` against `compile-ladder/rung7/probes/p39.*`. Status should be UNVERIFIED until someone runs the two-line probe; I did not run it.

**Open a new row** for rung 7's semantics divergence: `a = 2147483647; b = 2; println (a b)` gives `4294967294` compiled and `-2` under `walk`, created by `2027f519b`, with the three candidate answers named — exact numeral arithmetic (what landed, and what the team's folder does), coercion to `ZZ32` then `IntegerOverflow` (what the compiler world's own checked arithmetic implies), and the interpreter's silent wrap (which `basic-lib/basic-integers.tex:369-370` says should not exist). This row is a fork, not a bug.

**Open a small row** for the dark `compiler_tests/IntegerLiteralsFolding.fss`: the team's own test of a phase that is wired into `compilerPhaseOrder` and has never been run in this lineage.

**Amend row 316** with one sentence: the separator is LF where the interpreter's is `lineSeparator`, so the two backends' output differs on any platform whose separator is not LF.

---

## Decisions the deeper pass owes, and the one fork that reaches Pavol

POSITIONS.md, 2026-09-17: new forks invented at the point of difficulty do not reach Pavol; the forks already reserved in `PLAN.md` do. So these are sorted by that rule rather than presented as four equal questions.

**Reaches Pavol, because it is reserved.** Not the wrap — the spec settles that one and it is a scheduled rung, not a fork. The fork is what type an untyped literal's arithmetic happens at. `PLAN.md:47` reserves "any change of semantics against the spec", and rung 7 made the operation happen at the numeral type where `literals.tex:132-148` puts it after coercion at a number type; the spec is silent only on *which* number type. That silence is what makes the rest of it a decision rather than a defect: the compiler world folds literal arithmetic exactly before typecheck (`PhaseOrder.java:142`) and throws `IntegerOverflow` on `ZZ32` (`simpleIntArith.java:94-98`), where the interpreter computes at the narrowest applicable type and wraps silently, which `basic-lib/basic-integers.tex:369-370` says should not happen at all. The ladder's success criterion is "output byte-identical to `walk`", and on integer literals the interpreter cannot be both the oracle and wrong. Either the interpreter stops being the oracle for this one area, or the compiler world's folding and checking are what change. The rungs took the first answer without saying so, which is why this is the item on the list that reaches him.

**For the deeper pass, not for Pavol: where literal arithmetic lives.** The team put it in a compile-time phase and left the run-time bodies throwing; rung 7 put it at run time and left the phase alone. Both now exist over overlapping families and disagree with each other on the same values. Keep both and make them agree, retire the phase in favour of the bodies, or widen the phase and return the bodies to throwing — an architecture call the next rung should make and execute, with a test that pins both spellings of the same expression.

**For the deeper pass: `asZZ64` or `asZZ` for the comparisons.** Rung 6 left this open in its own commit message. `asZZ` is wider and closer to the spec's unbounded numeral; it costs an unmeasured compiled path; it does not repair the wrap either way. It should be closed by the same rung that repairs `forIntLiteralExpr`, not left open a third time.

**For the deeper pass: the `//` forms and the separator.** Rung 5's two narrowings are cheap to close once anything needs them, and the separator question (LF against `lineSeparator`) is decided by whether the compiler world ever gets a system-property counterpart.

## What I did not do

I did not build, did not run `ant`, and did not run `fortress`; every behavioural claim is either quoted from a committed probe output under `explorations/compile-ladder/rung6/probes/` and `rung7/probes/` or reasoned from source and labelled as such.

I did not review rungs 1 to 4, did not read the batched-climb design documents, and did not check whether the defects above are reachable from `microgpt.fss` as currently written.

POSITIONS.md gained its 2026-09-17 entry on deeper passes against halts while this review was being written; the two paragraphs on stop conditions were rewritten against it, and the rest of the review was written before it and does not rest on it.

I did not verify the claim that rung 8's `ZZ32`-returning `SUM` can throw `IntegerOverflow` where the interpreter's `Number`-returning `SUM` does not; no test in the tree covers it and I did not write one.
