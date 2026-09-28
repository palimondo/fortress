<!-- Two design questions for Pavol before climb batch N launches (explorations/coordinator/CLIMB-BATCH-N.md), written 2026-09-28 from 12:30 UTC by an Opus worker for the coordinator, on main at 7a81cdf44 (batch 7R landed; batch 7C running in its own worktrees, untouched). Question A is probe K's item 9 (explorations/compile-ladder/plan-n/probe-k/PROBE-K.md:17 and section 6); question B is PLAN.md item 24, ledger row 484. Read: the specification (Specification/, the restart's Documentation/Specification/Prose/Language/, Papers/Types/, Papers/Welterweight/), the one library and the compiler library, the checker and walk sources, and the record's notes cited. Measured here, only what no record answered: for A, the fork's call on both paths, stock and under batch N's rule, reusing the two shadows' builds that survive in the session scratch directory (6 compiled and 4 walk runs, before-n-questions/fork/), because the record held two readings of the checker that disagree; for B, 23 one-call walk programs on main's own build (walk-max/) and 2 compiled programs, stock and under the rule (max-compiled/); for the Java peer, one javac run (peers/). ant was not run; no tracked file outside this file and before-n-questions/ changed. Every other finding is cited from the record. Each question is in the form of protocol principle 3; the argument beyond it is in the appendix. -->

# Before batch N: two questions

## Question A: a generic arm beside a plain arm, when only the generic needs a conversion

**The question.** When a generic arm fits a call only after answer 8 converts an argument, and a plain arm fits the call as it is, which arm runs?

**Refresher.**
- A generic arm has type parameters, `op[\T extends Number\](a: T, b: T)`; a plain arm has none, `op(a: Any, b: Any)`. Answer 9 keeps such pairs legal.
- Answer 8's promotion: for `op(z, w)` with `z: ZZ32` and `w: ZZ64`, the generic arm's `T` becomes `ZZ64`, the narrowest type both convert into, and `z` is converted. So the generic arm needs a conversion; the plain arm needs none.
- Without the promotion (today), `T` is a common supertype, nothing is converted, and the generic arm wins as the more specific.

**What the runs and the record say.**
- Measured on both paths: today both run the generic arm, `z` unconverted. Under batch N's rule, as the two shadows built it, both run the plain arm. With two `ZZ32`s, both keep the generic arm (`before-n-questions/fork/`, appendix A.1).
- So rungs I and K already agree. Probe K's note that the checker keeps the generic arm (`PROBE-K.md:69`) was a reading. It missed the checker's first test: a candidate using no conversion beats one using a conversion (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1085-1095`, the team's code; A.2).
- Probe K's own pair, the plain arm over `Number`, is refused by the checker as a duplicate (`fork/OpZW.stock.txt`): in the 2011 model the generic arm's domain is all of `(Number, Number)`. Walk loads it (`PROBE-K.md:69`). The legal form uses a wider plain arm, here `Any`.
- No test, demo or microGPT call reaches the case (`PROBE-K.md:11`, `:17`).
- The specification, read literally: take a declaration "applicable without coercion" first (`Specification/basic/conversions-coercions.tex:471-475`, `:539-548`), with static parameters "inferred ... before checking the applicability" (`Specification/basic/overloading.tex:173-175`). With answer 8's inference, that is the plain arm.
- Answer 9 decides applicability "on the quantified types" and instantiates afterwards (`explorations/reviews/overloading-judgement.md:85`). Read that way the generic arm wins and is then promoted: the only reading on file for option 2. Its walk half, batch 7b's rung W, compares arms on declared domains (`:97`), so option 1 needs W to keep judging applicability on the instance.
- The later sources are silent: the inference chapter is a note, the restart's coercion and inference chapters are empty, and the 2011 paper and Welterweight have no coercion (A.4).
- The library has no generic arm beside a plain arm over `Number` or `Any` (A.3). It handles mixed widths with a plain arm per type plus conversions: `z + w` reaches `ZZ64`'s own `+` (`PROBE-K.md:34`).
- Peers: Java never converts to fit `T`, runs the generic arm at the common supertype, and refuses probe K's exact pair (`peers/java.txt`). Swift and Julia run the plain arm; Julia's plain arm then promotes by itself. C# promotes `T` to `long` and runs the generic arm (A.5, read).

**The options.**
1. **The plain arm.** A generic arm counts as applicable without conversion only when the instance the rule picks takes the arguments as they are. Code: none beyond rungs I and K as briefed. Touches: a sentence in rung T's chapter; a note for batch 7b's specification rung and rung W; one test each in rungs I and K. Cost: a plain arm over a wider type takes mixed-width calls from a more specific generic arm; today's answer changes, for no recorded call.
2. **The generic arm, at `ZZ64`.** Applicability on the quantified type, as answer 9 words it, then answer 8 instantiates and `z` is converted. Touches: the checker's ranking of a promoted candidate (`STypesUtil.scala:1085-1095`) in rung I; in rung K, an edit to `bestMatchInternal`, which K's brief leaves to batch 7b (`explorations/coordinator/CLIMB-BATCH-N.md:179`); the chapter. Cost: two code changes and their tests; a call converts an argument although another arm takes it unconverted, the reverse of the coercion chapter's order.
3. **The generic arm, unconverted** (today; the paper and Welterweight). Answer 8's promotion is skipped when another arm applies without conversion. Cost: an exception in rungs I, K and T to answer 8; whether a call converts depends on an unrelated arm.
4. **Refuse the call as ambiguous.** Cost: a new error on both paths, where the specification promises every call a most specific arm.

**Yes to option 1** commits you to one sentence in the inference chapter, a note for batch 7b, and two small tests; the batch record's fork paragraph becomes the measured agreement. **No** (option 2) costs two code changes, one of them in code batch 7b owns.

**Recommendation, my reading: option 1**, because both paths already do it under the rule, it is the specification's order read literally and the checker's own ranking, and it moves no recorded call.

## Question B: `b MAX 1` for a `ZZ64` `b` (row 484)

**The question.** What should make `b MAX 1` answer under walk for a `ZZ64` `b`, as `b + 1` already does?

**Refresher.**
- On the integer types, `MIN`, `MAX` and `MINMAX` come from the generic order traits `StandardMax`, `StandardMinMax` and `StandardTotalOrder` (`Library/FortressLibrary.fss:252-290`). `QQ` and `RR64` declare their own (`:582-586`, `:427-429`); no integer type does (B.2 has the api lines). `ZZ64` does declare its own `+` and `<=` (`:796`, `:786`). All are the team's.
- When an argument must be converted, walk and the specification take the most specific declaration. A type's own declaration beats `QQ`'s, because `ZZ64` converts into `QQ` and nothing that converts into `ZZ64` is a rational (`Specification/basic/conversions-coercions.tex:486-500`). An inherited declaration has its `self` typed as the generic trait (`Specification/basic/overloading.tex:159-161`), which converts into nothing, so it ties with `QQ`'s.

**What the runs and the record say.** 23 walk runs on main's build, one call each (`before-n-questions/walk-max/summary.txt`, B.1):
- `ZZ64` and `ZZ`: `MAX`, `MIN` and `MINMAX` with a numeral all stop, "Ambiguous coercion".
- No numeral is needed: `w MAX z`, for a `ZZ64` `w` and a `ZZ32` `z`, stops too; `z MAX w` answers 4 as a `QQ`.
- `NN32` and `NN64` with a numeral answer as a `QQ`, since walk's numeral is a `ZZ32` and converts into neither. `ZZ32` and `RR64` answer at their own type.
- Controls: `b + 1` answers `ZZ` for an `NN64` `b`, through `ZZ`'s own `+` (`:943`): answer 8's type for `NN64` with `ZZ32`.
- The compiled path's library declares `MIN`, `MAX` and `MINMAX` on every number type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:198-200` for `ZZ64`, B.2 for the rest); there `b MAX 1` and `w MAX z` answer `ZZ64`, stock and under the rule (`max-compiled/`). The specification's `ZZ` declares its own `MAX` and `MIN` (`Specification/basic-lib/basic-integers.tex:234-235`).
- The specification's overloading rules ask for it: the inherited `MAX` and `QQ`'s both take a converted `ZZ32`, so they fail the Incompatibility Rule (`Specification/advanced/overloading.tex:187-216`), and the Meet Rule asks for a more specific declaration (`:224-235`). A type's own `MAX` is one.
- The compiled checker, by reading, accepts the call and takes whichever candidate its list holds first; it has no ambiguity check (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:460-463`; B.3).
- Batch N as briefed, by reading: rungs I and K leave the call as it is, since the receiver fixes `T`. Rung Q widens it: once a numeral is not a `ZZ32`, `ZZ32`'s `b MAX 1` stops too, and so, by reading, do the library's own `0 MAX (index - 1)` sites (`Library/SkipList.fss:310`, `Library/FortressLibrary.fss:3894-3896`; B.4).
- Peers: Java's `Math.max` and C#'s `Math.Max` have one overload per number type and widen the narrower argument; Julia promotes, then calls the per-type method. Swift and Rust type the literal from the other operand and refuse two variables of different widths.

**The options.**
1. **Each integer type declares its own `MIN`, `MAX` and `MINMAX`**, as `QQ`, `RR64`, the compiler library and the specification's `ZZ` do, and as `ZZ64` declares `+`: 15 declarations on `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32`, each in the api and the component. Every such call then answers at answer 8's type, numeral or variable, as `+` does (measured on the compiled path, by reading under walk). Touches the library and one walk test; walk, the checker and the specification's rules stay. Cost: a small library rung; the checker count reported, as always.
2. **Walk reads an inherited method's `self` as the receiver's type.** The row's "count the three as one" does not settle it alone: `QQ`'s and the one left still tie (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:163-190`). Touches walk, the checker's lifting and the specification's sentence on `self` (`basic/overloading.tex:159-161`). Cost: code on both paths and a revision against the text.
3. **Batch N's rule types a numeral at the other operand's type**, as Swift and Rust do. Touches rungs I, K, Q and T with a rule beyond answer 8. Cost: the largest; it does not cover `w MAX z` with two variables.
4. **Leave it.** Programs write `widen(1)`. Cost: `ZZ64` and `ZZ` stop, `NN32` and `NN64` answer a rational, and under rung Q the library's own sites stop.

**Yes to option 1** commits you to about 30 short library lines and one test, in batch N (with rung Q, which meets the problem, or earlier); no model line changes. **No** leaves row 484 open and the rational answers in place, and rung Q meets the library's sites.

**Recommendation, my reading: option 1**, because it is the library's own device in this family, the compiler library's and the specification's, and it needs no language change.

## Appendix: the argument beyond the asks

### A.1 What was run for question A, and why

The record held two readings of one call: probe K read the checker's shadow as keeping the generic arm (`PROBE-K.md:69`, marked "[read]"), and the checker's code reads the other way (A.2). Both shadows' builds survived in the session scratch directory, so the call was run on each path, stock and under the rule, one JVM at a time (protocol principle 4: a fork a probe can settle is probed before the batch is briefed).
- The compiled path: `fork/run-compiled.sh` compiles and runs a program with the checker shadow's classes (`explorations/reviews/inference-rule-shadow/`, `rule.patch` over the snapshot of `59a84a385`) and a private copy of its compiler-library cache. Since that snapshot the checker changed only at the `case` site (`3be1fecd7`), which this call does not reach.
- Walk: `fork/run-walk.sh` runs the program in probe K's private home (`158aa7dce`) with its shadow in apply mode, as probe K's `run-pass.sh` does. Walk's sources have not changed since.
- The programs: `OpZW.fss` (probe K's pair, the plain arm over `Number`), `OpAnyZW.fss` (the plain arm over `Any`) and `OpAnyZZ.fss` (its control with two `ZZ32`s).
- The results, one line each:
  - `OpZW`, compiled, stock and rule: refused at declaration, "multiple declarations of op with the same parameter type: (Number, Number)".
  - `OpAnyZW`, compiled: stock `op generic[ ZZ32 , ZZ64 ]`, rule `op plain[ ZZ32 , ZZ64 ]`.
  - `OpAnyZW`, walk: stock `op generic[ZZ32,ZZ64]`, apply `op plain[ZZ32,ZZ64]`, with the shadow's line "today op[\T extends ...Number\] ... rule op(a:Any,b:Any)".
  - `OpAnyZZ`, both paths, stock and rule: `op generic[ZZ32,ZZ32]`.

### A.2 Why the checker's shadow takes the plain arm

- `checkApplication` sorts the applicable candidates with `moreSpecificCandidate` and takes the head (`Functionals.scala:460-463`).
- `moreSpecificCandidate` first asks whether each candidate's arguments hold a coercion: "If one did not use coercions and the other did, the one without coercions is more specific" (`STypesUtil.scala:1085-1095`). Only when both or neither do does it compare domains.
- The shadow's promotion runs inside the first attempt (`rule.patch`, the "promotion case" at the end of `checkApplicableWithInference`) and returns the generic candidate with `z` wrapped in a coercion built by `checkApplicableWithCoercion`. The plain candidate holds none, so it sorts first. Probe K's reading stopped at "the more specific", which is the second test, not the first.
- The same rule is the checker's form of the specification's order ("applicable without coercion" first), so option 1 is what the team's checker already encodes for plain arms; the rule extends it to a promoted generic arm without any new code.

### A.3 The library grep

A script over `Library/*.fsi` and `ProjectFortress/LibraryBuiltin/*.fsi` collected every declaration whose static parameters are bounded by `Number`, `AnyIntegral`, `Integral`, `RR64` or `ZZ` (15 names: `+`, `-`, `BITXOR`, `MAX`, `MIN`, `generate`, `left`, `matrix`, `max`, `min`, `right`, `sparse`, `squaredNorm`, `tabulatedVector`, `vector`) and every plain declaration with a parameter of type `Number`, `Any` or `AnyIntegral` (43 names, among them `print`, `println`, `random`, `atan2`, `=`, `||`). No name is in both lists. The generic `MIN` and `MAX` are the array arms (`Library/FortressLibrary.fsi:2596-2599`), whose `T` comes from the array, not from a promotion. The nearest family to the fork is the order operators of question B, where a generic trait's method stands beside `QQ`'s and `RR64`'s plain arms.

### A.4 The specification in detail

- `conversions-coercions.tex:471-475`: "we first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected; if not, then coercions are explicitly added". `:539-548` states it with the sets Σ and Σ′.
- `basic/overloading.tex:100-105`: "it is an error ... for one declaration to have static parameters and another to not have them" (the sentence answer 9 removes). `advanced/overloading.tex:95-96` says the same.
- `basic/overloading.tex:137-138`: "We assume throughout this chapter that all static variables in functional calls have been instantiated or inferred." `:173-175` and `:292-295`: inferred "before checking the applicability" and "before comparing".
- Answer 9's revision (`overloading-judgement.md:85`) rewrites `:173-176` and `:292-295` as "inference instantiates the chosen declaration; it does not precede the comparison". Option 1 needs that text to say which instance decides applicability; this is the one place where a top-tier reading could add something, in batch 7b's specification rung.
- The later sources. The inference chapter is one note, "This chapter will include the Fortress static type inference mechanism" (`basic/inference.tex:15`). The restart's `coercion.tick` and `type-inference.tick` are headers only (`Documentation/Specification/Prose/Language/`); its `overloading.tick` drops the static-parameter sentence but keeps "inferred ... before" (`:180-181`, `:299-302`); its `types.tick` defines coercion (`:938-947`) and says nothing of overloading. The 2011 paper (`Papers/Types/`) and Welterweight (`Papers/Welterweight/`) never mention coercion: a declaration "is applicable to a type if and only if at least one of its instances is" (`Papers/Types/setup.tick:394-397`), dynamic instantiation is "beyond the scope of this paper" (`Papers/Types/rules.tick:120-130`), and Welterweight's dispatch infers each parameter's lower bound, the join of the arguments (`Papers/Welterweight/dispatch.tick:67`, `:187-193`).
- Walk loads probe K's pair and runs it (`PROBE-K.md:35`, `:69`); walk's load-time check does not apply the No Duplicates rule the checker applies.
- Coercion is resolved statically (`conversions-coercions.tex:584-617`); walk has only run-time types. So under any option, a call whose static types are wider than its values (`z, w: Number` holding a `ZZ32` and a `ZZ64`) can take the generic arm at `Number` on the compiled path and the plain arm under walk. This is a property of walk's rule for any promoted call, not of this fork, and is not measured here.

### A.5 The peers in detail

- Java (JLS 15.12.2): strict invocation (subtyping and primitive widening), then loose invocation (boxing), then varargs; an arm applicable in an earlier phase wins. Inference never widens an `Integer` to a `Long` to fit `T`. Measured (`peers/java.txt`): the exact pair is refused, "name clash: op(Number,Number) and <T>op(T,T) have the same erasure"; `op(Integer, Long)` beside `op(Object, Object)` runs the generic arm with `T` the common supertype; `pr(int, long)` runs `pr(long, long)` (widening) over the generic arm (boxing).
- C# [read, the specification's type inference, "fixing", and "better function member"]: `T` is fixed to the candidate every other candidate converts into implicitly, so `long` for `(int, long)`; `Op<long>(long, long)` then beats `Op(object, object)` by better conversions.
- Scala [read]: Scala 2 infers `Long` for an `Int` and a `Long` by weak conformance; Scala 3 dropped weak conformance and adapts only literals.
- Swift [read]: no implicit numeric conversion; `Int32` and `Int64` cannot both bind one `T`.
- Julia [read, `base/promotion.jl`]: the method `op(a::T, b::T) where T` applies only to arguments of one type; the library's plain `Number` methods promote explicitly, e.g. `+(x::Number, y::Number) = +(promote(x,y)...)`.

### B.1 Every walk result for question B

From `walk-max/summary.txt`; each capture under `walk-max/captures/` carries its machine line. The receivers are made with the library's own conversions (`widen`, `unsigned`, `big`).
- `ZZ64`, `b MAX 1`, `b MIN 1`, `b MINMAX 1`: rc 1, "Ambiguous coercion", candidates `FortressLibrary.fss:584` (or `:582`, `:586`) and `:286`, `:267`, `:253` (or their `MIN` and `MINMAX` lines).
- `ZZ`: the same three refusals.
- `ZZ32`: `3`, `1`, `(1, 3)`, all `ZZ32`.
- `NN32` and `NN64`: `3`, `1`, `(1, 3)`, all `QQ`.
- `RR64` (`b = 3.5`): `3.5`, `1.0`, `(1.0, 3.5)`, all `RR64`.
- `1 MAX b`, `b: ZZ64`: `3 : QQ`.
- `w MAX z`, `w: ZZ64`, `z: ZZ32`: rc 1, the same refusal. `z MAX w`: `4 : QQ`.
- Controls: `b + 1` for `NN64` and for `ZZ`: `4 : ZZ`.

The ledger's own capture (`compile-ladder/rung-spec-ranges/probes/examples/WideMaxNumeral-base-walk.txt`) was taken on batch 7R's base; the line numbers of the refusal are unchanged on main.

### B.2 Why `+` and `<=` answer where `MAX` does not

- Who declares what. The one library: `QQ`'s `MIN`, `MAX`, `MINMAX` at `FortressLibrary.fss:582-586` (api `FortressLibrary.fsi:412-414`); `RR64`'s at `:427-429` (api `:326-328`); `ZZ64`'s own `+` and `<=` at `:796`, `:786` (api `:574`, `:569`); `ZZ`'s own `<`, `<=`, `CMP` and `+` at `:931-943`; `NN64`'s own `+` at `:863`; `NN32` declares its own `<` and `+` and no `MIN` or `MAX` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82-112`, `.fss:387-`). `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` inherit `MIN`, `MAX` and `MINMAX` from `StandardTotalOrder` through `Integral` (`FortressLibrary.fss:650`, `:286-290`). The compiler library declares all three on `ZZ` (`CompilerBuiltin.fsi:137-139`), `ZZ64` (`:198-200`), `ZZ32` (`:261-263`, although it also extends `StandardTotalOrder[\ZZ32\]`, `:210`), `NN32` (`:318-320`), `NN64` (`:378-380`) and `IntLiteral` (`:425-427`), and `MIN`, `MAX` on `RR64` (`:449-450`).
- Walk's coercion pass (`OverloadedFunction.java:821-853`) keeps the declarations applicable with a conversion and reports "Ambiguous coercion" unless one is more specific than every other, by the specification's relation (`Coercions.java:163-190`; `conversions-coercions.tex:486-500`).
- For `b + 1` the candidates include `ZZ64`'s own `+(self, b: ZZ64)`, whose domain `(ZZ64, ZZ64)` beats `QQ`'s `(QQ, QQ)` position by position (each `ZZ64` excludes `QQ`, converts into it, and rejects it, since `ZZ32` and `NN32` exclude `QQ`) and beats the inherited `+` by subtyping. It is the unique most specific.
- For `b MAX 1` there is no such declaration. The three inherited ones order among themselves by subtyping, `StandardTotalOrder[\ZZ64\]` below the other two, but none of them is comparable with `QQ`'s, so collapsing them leaves the tie.
- With option 1, `ZZ64`'s own `MAX` plays the part of its `+`. By the same reading, `NN32`'s `b MAX 1` would reach `ZZ64`'s `MAX` (`ZZ64` converts from both `NN32` and `ZZ32` and is more specific than `ZZ` and `QQ`) and `NN64`'s would reach `ZZ`'s, as the `+` control does.
- The four per-type declarations cited (`ZZ64`'s `+` and `<=`, `QQ`'s `MAX`, the compiler library's `ZZ64` `MAX`) are present at the history's earliest reachable commit, `5a68404fd` (2012-07-19): the team's, not the revival's.

### B.3 The compiled checker, by reading

- For an operator that is a method of a generic trait, the checker first fixes the lifted parameter from the receiver (`Functionals.scala:141-160`, `STypesUtil.scala:1038-1061`), so the inherited `MAX` becomes a plain candidate with domain `(StandardTotalOrder[\ZZ64\], ZZ64)` and `1` converted. `QQ`'s `MAX` is a plain candidate with both arguments converted.
- Both use a conversion, so `moreSpecificCandidate` compares domains with the oracle's relation (`CoercionOracle.scala:72-82`); `StandardTotalOrder[\ZZ64\]` does not convert into `QQ`, so neither is more specific, and the sort keeps its input order.
- `checkApplication` has no check that the head is more specific than the rest (`Functionals.scala:463`, a comment with no code). So the checker accepts the call, where walk refuses it, and its answer is whichever candidate its list holds first.
- Not run: the one-library driver's snapshot (`inference-rule-shadow/check.sh`) predates batch 7's change to `StandardMinMax`, so a run there would not stand for main.

### B.4 Rung Q, by reading

- Rung Q gives the one library a sibling `IntLiteral` with a conversion into each number type (`CLIMB-BATCH-N.md:276`). Then `ZZ32`'s `b MAX 1` converts the numeral and meets the same tie as `ZZ64` today, and `NN32` and `NN64` stop instead of answering `QQ`.
- The library's numeral-left sites (`0 MAX (index - 1)`, `SkipList.fss:310`, bound to a `ZZ32`) answer today because both operands are `ZZ32`s. Under Q the numeral on the left converts into no generic trait, so, as `1 MAX b` reaches only `QQ`'s declaration today (B.1), the site would reach only the declarations of types the numeral converts into, `QQ`'s and `RR64`'s, which tie; by reading it would stop.
- Rung Q already names this device for `ZZ32`'s comparisons: "`ZZ32`'s comparison operators if the rung states them on `ZZ32` itself" (`CLIMB-BATCH-N.md:276`), the plan-6.5 probe's model A1 (`CLIMB-BATCH-N.md:249`). Option 1 extends it to `MIN`, `MAX` and `MINMAX`.
- One condition for option 1 to settle a numeral under Q: the reject relation needs every type that converts into `ZZ32` to exclude `QQ`, so Q's `IntLiteral` must exclude `QQ`, as the compiler library's `IntLiteral` excludes every number type it has (`CompilerBuiltin.fsi:390`).

### B.5 What option 1 would write

On each of `ZZ32`, `ZZ64`, `NN64` and `ZZ` in `Library/FortressLibrary.fsi` and `.fss`, and on `NN32` in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`, three declarations at the type's own type, with the bodies `StandardTotalOrder` already gives (`FortressLibrary.fss:288-290`):
- `opr MIN(self, other: ZZ64): ZZ64 = if other < self then other else self end`
- `opr MAX(self, other: ZZ64): ZZ64 = if other < self then self else other end`
- `opr MINMAX(self, other: ZZ64): (ZZ64, ZZ64) = if other < self then (other, self) else (self, other) end`

The api form is the compiler library's (`CompilerBuiltin.fsi:198-200`). The test: the calls of B.1 that stop or answer `QQ` today, each asserting its value and type.

### Files

- `before-n-questions/fork/`: `OpZW.fss`, `OpAnyZW.fss`, `OpAnyZZ.fss`; `run-compiled.sh`, `run-walk.sh`; the captures `<Name>.stock.txt`, `<Name>.rule.txt`, `<Name>.walk-stock.txt`, `<Name>.walk-apply.txt`.
- `before-n-questions/walk-max/`: `make-programs.py` (writes the 23 programs and `list.txt`), `run.sh`, `summarize.py`, `summary.txt`, `captures/`.
- `before-n-questions/max-compiled/`: `CMaxNumZZ64.fss`, `CMaxVarZZ64ZZ32.fss` and their stock and rule captures, run with `fork/run-compiled.sh`.
- `before-n-questions/peers/`: `Dup.java`, `Fork.java`, `java.txt`.
- The two `fork/` scripts and `max-compiled/` reuse builds that live only in the session scratch directory (the inference-rule shadow's snapshot, classes and compiler-library cache; probe K's private home and shadow), as those probes' own scripts do; they are not kept in the tree.
- Machine, on every capture: nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`; load at start 1.4 to 4.1 (batch 7C's rungs ran beside). No timing here is a comparison.
