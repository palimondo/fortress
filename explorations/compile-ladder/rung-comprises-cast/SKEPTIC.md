# Rung K, rung-comprises-cast: the skeptic's check

Head judged: `f2d66de4e1`. Head after: the commit of this file, on `4bbb791012`. Verdict: **approved**, with one fix of the change and one commit of corrections, none contested.

Two launches of the skeptic worked the rung. The first ran for two minutes and left no commit and no file; this one started from the worker's head. REPORT.md and record.md were already on the branch, so the journal tool wrote nothing.

## What was checked

- **Stages.** The section gives the rung no stage, and the diff does not touch the compiled checker, so no count stage was run. `git diff --name-only c1ce2a35e1...HEAD` lists `compiler/codegen/CodeGen.java`, `Specification/appendices/changes.tex`, tests under `ProjectFortress/compiler_tests/` and the rung's folder under `explorations/`. The shadow patch on the head after the fix: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` printed 'shadow sources written to ...', exit 0.
- **Test first**, in the worker's transcript. `junit.sh base ... ComprisesValueAtListedTypeCompiled.test` at 01:13:39 (call `BYMpt2`): 'VerifyError: Bad type on operand stack', '... $Q$DefaultTraitMethods.bound ...', 'Tests run: 3,  Failures: 1'. `junit.sh base ... SelfTypeReturnSelfRunLink.test SelfTypeReturnSelfRun.test` at 01:13:56 (`MEoU4a`): 'VerifyError: Bad return type', 'Tests run: 3,  Failures: 1'. `CodeGen.java` was first edited at 01:16:22 (`hgrdox`) and last at 01:37:20; the passing run `junit.sh edit4` is at 01:38:35 (`xeZKUb`): both 'PASS'. `ant testFast` started at 01:39:19, after the last change of code. The three places that the test gained after the fix (an assignment, a value parameter, a generic method's returned value) were not seen failing one by one; the whole test fails on the base in the skeptic's run below, in the trait's one class.
- **The diff**, line by line. The new field `declaredResult` is set by each of the three callers of `generateActualMethodCode` on a generator made for that call (`new CodeGen(this)`, `CodeGen.java:2564`, `:2964`, `:3043`), so no value of it outlives its method. `castToTypeBelow` asks the type analyzer nothing unless the value has self's type.
- **The precedent**: `conditionallyCastParameter` (`CodeGen.java:7469`), followed in form. No device of the library's applies: the site is the code generator's.
- **The tests**: each file has one comment line; the citations name `traits.tex`, section "Trait Declarations", which says that every value of the trait is a value of a listed type (`Specification/basic/traits.tex:248`).
- **Names**: `castToTypeBelow` has no other declaration under `ProjectFortress/src`; `declaredResult` is also a static method of `interpreter/glue/StaticNativeApp.java:97`, another class.
- **The failure mode**: the rung turns no loud failure into a quiet value. A cast that the checker's reading did not justify would throw at run time.

## The skeptic's programs

Each was compiled and run by the base build (`old-fortress.sh /home/user/fortress-base35 <worktree>/tmp/old-caches`), by the worker's head and by the head after the fix, and run under walk. The programs are scratch; the table gives each whole enough to write again. `Q` is `trait Q comprises { R }` and `R` its one value object unless said.

| program | what it holds | base, compiled | worker's head | after the fix | walk |
|---|---|---|---|---|---|
| SkOps | `NEG self`, `self PLUS self`, `fst(self, 7)`, `(self)` returned, a block ending in `self`, `x = self; den(x)`, `den(idR(self))`, `den self` | `VerifyError: Bad type on operand stack ... $Q$DefaultTraitMethods.nested` | `-2 3 8 2 2 2 2 2 PASS` | the same | the same |
| SkGen | `trait G[\T\] comprises { B[\T\] }`: `me(): B[\T\] = self`, `unbox[\T\](self)`, `b: B[\T\] = self`, at `ZZ32` and `String` | `VerifyError ... DefaultTraitMethods.bound` | `5 5 5 s PASS` | the same | the same |
| SkSelf | `trait Shape[\S extends Shape[\S\]\]`: `dotted(): S = self`, `s: S = self`, `keep[\S\](self)`, `getter me(): S = self`; `object Pt` and a generic `object Gn[\T\] extends Shape[\Gn[\T\]\]` | `VerifyError: Bad return type ... DefaultTraitMethods.bound` | `b b b b 3 g 3 PASS` | the same | the same |
| SkMore | `var r: R = self; r := idR(self); r := self`; `if den(self) > 0 then self else self end`; `den(self)` in a `while`; `(a, b): (R, ZZ32) = (self, 4)`; `atomic do c.put(self) end` in a `for` over `1#40` | `VerifyError ... DefaultTraitMethods.varself`, at 1 and 4 threads | `2 2 4 6 2 PASS` at 1 and 4 threads | the same, at 1 and 4 threads | the same |
| SkL1 to SkL6, SkL8 | `(self, 4)` returned at `(R, ZZ32)`; `Taker.take2(self, 3)`; `Holder2(self, 1)`; `den(keep(self))`; `anyOf(self)` at `Any`; `r: R = keep[\R\](self)`; a block with an `if` statement that ends in `self` | L1, L2, L3, L5 run; L4, L6, L8 `VerifyError` | all run | all run | not run |
| SkL7 | `m(): R = typecase self of r: R => self end` | `VerifyError: Bad return type` | **`VerifyError: Bad return type`** | `2 PASS` | not run |
| SkMid | `trait Q comprises { M }`, `trait M extends Q comprises { R1, R2 }`: `mid(self)` for `mid(m: M)`, `asMid(): M = self`, `m: M = self` | `2 2 2 PASS` | `2 2 2 PASS`, with three new `checkcast` | the same bytecode as the worker's head | the same |
| SkPair2 | `pair(other: S): String = other.tag` in `trait Shape[\S extends Shape[\S\]\]`, `object Pt extends Shape[\Pt\]` | `ClassCircularityError: SkPair2$Pt` | the same | the same | `REACHED b PASS` |
| SkFldUp | `c.t := O` for `object Cell(var t: T)`, `object O extends T` | `NoSuchMethodError: ... $Cell.t(SkFldUp$O)` | the same | the same | `REACHED 2 PASS` |
| SkFld | `c.r := self` in `Q`, for `object Cell(var r: R)` | `NoSuchMethodError: ... $Cell.r(SkFld$Q)` | the same | the same | `REACHED 2 PASS` |

The diff shows a mutable variable (the assignment in `forExprsSerial`), so SkMore ran at `FORTRESS_THREADS=1` and `=4` on each code; the other programs that ran on the worker's head ran there at 4 threads too, with the same output. Walk and the compiled run agree wherever the compiled program runs.

The compiler's library compiled by the head after the fix holds the counts that the report gives for the base and the worker's head: `fortress.CompilerBuiltin classes=248 casts=2149 instructions=15996`, `fortress.CompilerLibrary classes=213 casts=466 instructions=4620`, `fortress.CompilerAlgebra classes=19 casts=1 instructions=160`.

## The reserved point: a cast at a place that verifies today

Reached; the worker reported 'none found'. SkMid runs on the base with no cast, since the JVM's verifier does not check an interface type, and the rung adds `checkcast SkMid$M` at the argument, the returned value and the binding. `diff` of `javap -c -p` over every class, base against the worker's head:

    <          1: invokestatic  #19  // Method SkMid.mid:(LSkMid$M;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32;
    >          1: checkcast     #15  // class SkMid$M
    >          4: invokestatic  #21  // Method SkMid.mid:(LSkMid$M;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32;

It is inside fork K1's test (the trait is not a subtype of the declared type by `extends`) and against K1's consequence, 'so a call that verifies today keeps its bytecode'. The output is the same, and the cast cannot fail where the checker's reading holds. No narrower test is at hand for a type variable, whose instance is a trait or an object only when the template is expanded. It is a point for the curator, reversible, and nothing was changed for it; record.md's finding 3 and REPORT.md's point 8 now say it. `compiler_tests/SelfTypeReturnSelfAtTraitRun` is the gated case: it ran on the base and runs after.

## Fix 1, a defect of the change: a typecase whose arms are self (`f9bc4f2546`)

Finding: the checker types a typecase as the union of its arms' types, `OR(BottomType,(Q & {R}))` for `typecase self of r: R => self end` (the type is printed by the checker's refusal of `takeS(typecase ...)` for `takeS(s: String)`). `castToTypeBelow` read only a `TraitSelfType` itself (`CodeGen.java:7439` at the worker's head), so the typecase returned at `R` got no cast and failed as on the base. An `if`, a `case` and a `try` whose arms are all `self` have self's type and ran. The section's first test asks for 'a trait that lists two types, with a typecase before the use'; this is the typecase of the one-type trait, at the rung's own returned value.

The ways: (a) the member reads a union whose members, the empty type apart, are one type as that type, twelve lines inside the rung's own member; (b) fork K1's wider form, a cast wherever the value's type is not a subtype of the declared type, which the worker tried and which stopped a link that passes today; (c) an expected-failure test and a row. (a) was built: the site is the rung's own member, and the test it needs is one case in the rung's plain test.

Settled by: fork K1, 'The cast is emitted only where the value's static type is not a subtype of the declared type by the `extends` clauses' (`explorations/coordinator/CLIMB-BATCH-31.md:581`), and 'every value of type T is a value of one of the listed types' (`Specification/basic/traits.tex:248`).

The test: `cased(): R = typecase self of r: R => self end` and its assertion in `compiler_tests/ComprisesValueAtListedTypeCompiled`. On the worker's head, before the edit was built, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests ComprisesValueAtListedTypeCompiled.test ...` (header 2026-11-17T02:33:49Z):

    . run ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled (266ms) java.lang.VerifyError
    Caused by: java.lang.VerifyError: Bad return type
        ComprisesValueAtListedTypeCompiled$Q$DefaultTraitMethods.cased(LComprisesValueAtListedTypeCompiled$Q;)LComprisesValueAtListedTypeCompiled$R; @37: areturn

After `ant compileAll` ('BUILD SUCCESSFUL', 43 seconds, caches started again) and the library order (exit 0, five jars), `junit.sh skfix` over the worker's fourteen files and the four new ones (header 2026-11-17T02:35:52Z):

    . run ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled (455ms) PASS
    . run ProjectFortress/compiler_tests/SelfTypeReturnSelfRun (465ms) PASS
    OK (23 tests)

On the base's code, `old-fortress.sh ... junit` of the same test: 'VerifyError: Bad type on operand stack', 'Tests run: 7,  Failures: 1'. No whole suite was run: the skill leaves the tracks to the gate after an edit of the code generator. `ant testFast`'s verdict in REPORT.md is that of the worker's head `34fb6364d6`, not of this fix.

## Fix 2, corrections (`4bbb791012`)

1. **A defect that the closed row alone held.** Row 695's notes hold a `ClassCircularityError` beside the `VerifyError`, and the rung closes the row. SkPair2 shows it on the base and after: a default body of a self-typed trait that calls a method on a value of the self-type parameter, for an object that lists the trait first. Home 2: `compiler_tests/XXXSelfTypeParameterReceiverRun` with `SelfTypeParameterReceiverRunLink`, and row 1052 in record.md. It is the first expected-failure test of this commit, shown both ways: as it is, 'ClassCircularityError: XXXSelfTypeParameterReceiverRun$Pt', 'Saw expected failure (Exit code != 0)'; with the body changed to `"c"` for one run (`junit.sh skred`), 'REACHED', 'PASS', 'Failed to satisfy run_out_does_not_contain', 'Tests run: 2,  Failures: 1'; then restored.
2. **A cast needed at a field, reported with its program.** SkFld is the program the section asks for: `c.r := self` dies before any cast matters, since the setter's call names the value's static type. SkFldUp shows the same for any strict subtype, with no `comprises` clause. `ledger.py find` with 'setter', 'var field', 'mutable field' and 'NoSuchMethodError' found no row. Home 2: `compiler_tests/XXXVarFieldAssignedSubtypeRun` with `VarFieldAssignedSubtypeRunLink`, 'REACHED', 'NoSuchMethodError: ... $Cell.t(XXXVarFieldAssignedSubtypeRun$High)', 'Saw expected failure'; row 1053. Rung A's branch does not change the setter's call (its diff of `CodeGen.java` edits `forObjectDeclPrePass`'s fields and adds `forAtomicExpr`), so the test should stay an expected failure on the merged tree; the gate shows it.
3. **The report's lines.** REPORT.md's problem line cited `Library/FortressLibrary.fss:570`, which is `getter isNumber`; `isFinite` is `:571`. The lines cited for `castToTypeBelow` and `conditionallyCastParameter` follow fix 1 (`:7308-7331`, `:7341`). Point 8 and record.md's finding 3 state the reserved point. record.md's finding 1, FACTS entry and Revival change name the typecase.

Both pairs ran on the base's code through `old-fortress.sh ... junit` with the same two expected failures.

## Where the skeptic differs from the worker's account

- Decision 1 says 'every cast it emits is one that K1 emits'. That holds; K1's consequence does not, at a trait type (above).
- Decision 5 defers a conditional with `self` in one arm to `forIf`. A typecase with `self` in every arm was the member's own to read, and is fixed; a typecase with `self` in one arm and a listed value in another has the type of row 1051's conditional and was not tried.

## Left for the gather and the curator

- The skill's `references/revival-changes.md`, "Traits and objects", and F-225 still say that a compiled body returning `self` fails verification (row 695).
- `Specification/appendices/changes.tex:4447` cites row 1050 by its placeholder.
- The report's tables: none; the gate's tables on the merged tree are the record. `ant testFast` in REPORT.md is of the worker's head.
