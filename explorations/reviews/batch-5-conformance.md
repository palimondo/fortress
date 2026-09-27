<!-- Conformance review of climb batch 5 (rung D ab914b6e0 with its evidence abe06a743; rung S 3924e7ec3 with the calculi follow-ups eb2d7e1e6 and 09d8dd4a1; rung Z e893a3e00), asked for by Pavol on 2026-09-27 in the form of the rung reviews of 2026-09-17, with four global questions added; written by a review worker reading only, on main at ba0f8cb09, nothing built or run. -->

# Climb batch 5 against the specification, the team's built intent, the design record and the plan

## Method

The method is the one of `explorations/reviews/rung-conformance-1-4.md` and `rung-conformance-5-8.md`. For each rung:
- `git show <hash>` first, then its `REPORT.md`, `record.md`, `JUDGE.md` and `SKEPTIC.md`, and the batch record (`explorations/coordinator/CLIMB-BATCH-5.md`, `explorations/compile-ladder/climb-batch-5/RECORD.md`);
- then the landed code as it stands on `main` at `ba0f8cb09`, which is after batch 6's rungs F (`d846e3644`) and T (`d9c415395`) landed on top;
- then the specification and the team's own code and drafts the rung touches.

Each rung is judged against three standards, kept apart:
1. the specification, `Specification/`, the July 2012 draft;
2. the team's built intent: the library's own practice, the interpreter and the compiler as the team left them, their drafts;
3. the design record outside the specification (`explorations/coordinator/map/design-intent-sources.md`).

Then four questions the 09-17 reviews did not ask:
- Does a choice made inside the rung, not by Pavol, conflict with a later phase of `explorations/coordinator/PLAN.md`: the checker at a true zero (phase 3), the switch-over to one library (phase 4), microGPT's static types and the array design with unboxed `double[]` (phase 5), unboxed arithmetic (phase 6)?
- Is anything built twice, or built so that the switch-over or the array work must undo it?
- Did the rung solve its problem the way the library already solves the same family, or invent a local device?
- What did the rung leave in the ledger or its report that should have reached Pavol and did not?

A structural fact first. Every rung of batch 5 carries decisions Pavol took by name (`explorations/coordinator/POSITIONS.md:81`, `:82`, `:84`, `:70`, `:95-99`). So the review separates what he decided from what a rung decided inside itself, and judges only the second as the rung's.

Claims marked "by reading" were not run. Nothing was built and no program was run for this review.

## The verdicts

- **Rung D, the wrapping operators: in the spirit.**
- **Rung S, the specification for route A: in the spirit**, with one sentence broader than the rule it states.
- **Rung Z, sizes at run time: in the spirit.** Its code is sound. What it found beyond its scope did not reach Pavol or the plan.

## Rung D, `ab914b6e0` (evidence `abe06a743`)

### What landed

- ∔ (`DOTPLUS`), ∸ (`DOTMINUS`, unary and binary) and ⨰ (`DOTTIMES`), abstract on `Integral[\I\]` (`Library/FortressLibrary.fsi:435-443`) and with bodies on `ZZ32`, `ZZ64`, `NN64` (`Library/FortressLibrary.fss:705-721`, `:789-805`, `:856-872`) and `NN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:407-423`).
- Each bound to a new native class, `Wrapping{Negate,Add,Sub,Mul}`, whose body is the old native's body (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:378-401`, `Long.java:371-394`, `NN32.java:271-294`, `UnsignedLong.java:332-355`). On `ZZ` they reuse `BigNum`'s natives (`Library/FortressLibrary.fss:934-940` and on).
- The wrap-reliant library bodies respelled: the six range splits, with the strided distance reordered on the checked operators (`Library/RangeInternals.fss:1030-1266`), `Library/Random.fss:235`, `:241`, `Library/IntMap.fss:675-676`, `Library/ChunkedSparseArray.fss:76`; six team tests restated; one new gated test, `ProjectFortress/tests/WrapOperatorsRungD.fss`.

### Standard 1: the specification

The specification spells the wrap, and says plain arithmetic throws. "For integer results, overflow throws an `IntegerOverflow`" (`Specification/basic/operators/opr-overview.tex:154-155`, `:195-196`). Wraparound is ∔ and ∸ (`:205-209`) and ⨰ (`:172-176`), "These operations do not overflow". On ℤ they "do exactly the same thing" as the plain operators (`Specification/basic-lib/basic-integers.tex:361-370`, `:384-394`, `:397-409`).

D follows this exactly, including ℤ's shared natives. The unsigned widths are the specification's "fixed-size integers" too, so their wrapping operators follow the same sentence.

The one gap is unary ∔, listed on ℤ (`basic-integers.tex:351-358`) and not declared. The library has no unary `+` either. It is row 429, a candidate with nothing to do now. Pavol's decision did not name it (`POSITIONS.md:81`).

The precedence rule is honoured. The three operators relate only to one another (`Specification/appendices/operators.tex:213-224`), and with no stated relation there is none (`:27-29`), so every respelled expression is fully parenthesised.

No finding against the specification.

### Standard 2: the team's built intent

Three team sources declare these operators, and D follows all three:
- the 2007 draft number api puts ∔ ∸ ⨰ on ℤ beside each plain operator, with ℤ a `CommutativeRing` under them (`Library/incomplete/basic/Fortress.Number.fsi:84-125`);
- the 2011 compiler prelude gives every integer type a wrapping native per operator beside the checked one (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:672-681`, `:766-775`), but with the spellings reversed, `BOX…` wrapping and `DOT…` saturating (row 348);
- the specification's listing (`basic-integers.tex:351-409`).

D takes the binding shape of the 2011 prelude and the spelling of the specification. In the one library D follows the layout of `+` in each trait: each new operator directly after its plain one. On ℤ it shares natives the way `DOT`, `TIMES` and juxtaposition already share `BigNum$Mul`.

The sites. Each respelled site was written by the team under a wrapping `walk`, at a time when the wrapping operators existed only in drafts (`explorations/reviews/wrap-dependent-code.md` section 8). Each one means a wrap: a bit mask, a hash modulo 2^32, a generator modulo 2^64. The one site that must not overflow, the strided distance, is reordered on the checked operators rather than respelled (`Library/RangeInternals.fss:1201`, `:1221`, `:1242`, `:1266`). That separation, a wrap spelled as a wrap and an overflow avoided by reordering, is how Steele's own 2011-2012 code under checked arithmetic reads (`wrap-dependent-code.md` section 8, "After the change of default").

One observation, by reading and not run. The compiled path's literal folder treats ∔ and ∸ on two numerals as exact addition (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:63-66`). Under `walk`, a numeral is an `IntLiteral`, which extends `ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117`), so `2147483647 DOTPLUS 1` goes to `Int$WrappingAdd`.
- The two paths should then print 2147483648 and -2147483648 for that line.
- This is the literal split the 09-17 review raised for `+` (`rung-conformance-5-8.md`, "The literal-wrap question"); D made ∔ one more operator on it.
- D's test uses typed variables only, so it does not see this. A note on the ledger's literal row would record it.

### Standard 3: the design record

- **The later word is the specification's spelling.** Steele's operator chapter of the 2012 restart keeps "Wraparound addition and subtraction on fixed-size integers are expressed by ∔ and ∸" (`Documentation/Specification/Prose/Language/Operators/operator-overview.tick:172-176`, `:205-209`). It was added in his `91e71e62e` of 2012-05-28, eight months after his compiler prelude reversed the spellings (`9ce7d8189`, 2011-09-08). So the reversed prelude is the outlier. Pavol's rule that the late, implementation-informed word weighs more (`POSITIONS.md:58`) points the same way as his decision (`:81`).
- **The box family means "toward zero".** On floats the same boxed operators round toward zero (`opr-overview.tex:181-183`, `:214-215`), and saturation clamps toward zero. That is a design reason behind the specification's pairing (`wrap-dependent-code.md` section 11).
- **Pavol's principle of 2026-09-22.** Where hardware behaviour can be written in bytecode, it gets its own spelling in the family the specification already has, as in Swift and Rust (`POSITIONS.md:52`). ∔ is that spelling for a bare `iadd`.
- **The algebra.** The two QuickCheck properties now state associativity of ∔ (`ProjectFortress/tests/QuickCheckTest.fss:89-90`, `ReflectiveQuickCheckTest.fss:17`). Arithmetic modulo 2^32 is a ring, so the law holds totally. `+` becomes partial once it throws. That keeps the stated law true, which is what the design record says algebraic laws are for (`map/design-intent-sources.md:104`).

### The global questions

- **Later phases.**
  - The flattening in batch 6 kept every line D added: they sit unchanged on the flat tower (`Library/FortressLibrary.fsi:435-443`, `:479-487`, `:520-527`, `:568-576`; `FortressBuiltin.fsi:87-95`).
  - At the switch-over, each of D's new native classes already has a compiled twin (`simpleIntArith.intWrappingAdd` and its siblings, bound at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:45`, `:90`, `:130`, `:172`). So D adds 20 native bindings to the switch-over's list, and none of them needs a new helper. The plan's counts, "29 of walk's 108 bindings" and "the 231 of `FortressBuiltin`" (`PLAN.md:61`), were measured before D and should be re-read then. The 10 compiled test files that use the reversed spellings are respelled at the switch-over, as decided (`PLAN.md:62`; `wrap-dependent-code.md:171`).
  - For unboxed arithmetic, ∔ is the bare JVM instruction and `+` is the checked one, the right split for phase 6.
  - microGPT's two check programs meet no wrap before or after D (rung D `REPORT.md` section 1).
- **The checker has not yet read D's declarations.** At batch 5's gate both apis stopped at their hierarchy errors before any method declaration (`CLIMB-BATCH-5.md` section 3, D, "The checker count"). D's operators have exactly the shapes of `+` and `-`. So whatever the full measurement after batch 6 reports of `+` and `-` (PLAN answer 11), it may report again of ∔, ∸ and ⨰. Nothing to do now. The measurement should be read by operator family.
- **Built twice.** No. The wrapping classes have the same bodies as today's natives only until rung O checks the old ones in place.
- **The library's way.** Yes, throughout.
- **What reached Pavol.** D's small items went to the ledger on his word (`POSITIONS.md:114`), and each one reached the next brief:
  - row 428, `QQ`'s `<`, was fixed by batch 6's rung F (ledger row 428);
  - row 427, the demo `HeapShakedown`, is in rung O's brief (`explorations/coordinator/CLIMB-BATCH-6.md:193`);
  - row 430 is why O's comparison lists `XXXInheritedOverload` as unstable (`CLIMB-BATCH-6.md:191`).

  One sentence in D's report is a correction of his words: his fifth answer named "the wrapping products" of `UnsignedTest`, and D found none that wraps. The products are exact, and the wrap is the `-x1` beside them, which D respelled (rung D `REPORT.md` section 5). D's reading is right. This is a line for the record, not for him.

### Verdict: in the spirit

It is the specification's own spelling, which the designers' 2012 text keeps. It follows the library's own layout and the 2011 prelude's binding shape. Every item D found reached the next batch.

## Rung S, `3924e7ec3`, with `eb2d7e1e6` and `09d8dd4a1`

### What landed

- The rule, stated once as a property of exclusion (`Specification/basic/types-vals-vars.tex:218-237`) and once as a rule on declarations (`Specification/basic/traits.tex:299-313`), over every static argument except operator arguments.
- The where-clause section's three examples kept as "Not allowed", each with the library's shape beside it (`Specification/basic/trait-parameters.tex:339-485`). `Nothing[\T\]` (`Specification/basic-lib/convenience.tex:34-79`). `Object` and `Tuple` without the algebraic supertraits (`Specification/basic-lib/objects.tex:81-194`). One sentence at each of three internal-appendix passages.
- A `\revision` callout at every changed passage (`Specification/fortress/fortress.tex:75-92`), Appendix I (`Specification/appendices/changes.tex`), a front-matter paragraph and a title-page line.
- The decision record `explorations/compile-ladder/rung-spec-route-a/decision-record.md`.
- After Pavol's answer on the calculi, a callout on each of the four calculi of Appendix A.

### Standard 1: the specification

S is the specification's revision, so the question is whether it says what was decided, in the specification's own voice.

- **The rule.** The rule is Pavol's route A (`POSITIONS.md:69`), stated over every static argument except operator arguments (`:96`). The two-part form, a property in the types chapter and a rule on declarations, is the one Luchangco's later Types chapter uses (`Documentation/Specification/Prose/Language/types.tick:353-376`). The callout says what that chapter's stronger form becomes when every parameter is invariant (`traits.tex:319-325`).
- **Operator arguments.** The reason they do not count is the specification's own: an operator argument is a name the subtrait inherits (`trait-parameters.tex:224-229`). Without that exception, `Boolean`'s eight `BooleanAlgebra` instantiations could not be written.
- **The originals kept.** Each refused example stays in the text as "Not allowed", the form the specification already uses (`traits.tex:286-292`).

One sentence goes further than the rule. `trait-parameters.tex:339-340`: "A where-clause variable may not appear as a static argument in an extends clause."
- Its own reason, at `:341-344`, covers only a variable that "may stand for" more than one type. That is the case the rule refuses.
- A variable pinned down by a constraint on the declaration's own parameter is a different case. Take `trait Foo[\S\] extends Bar[\T\] where {S extends Baz[\T\]}`. Under instantiation exclusion, a given `S` extends at most one `Baz` instantiation, so each `S` yields exactly one `Bar` instantiation. By reading, the rule allows this, and the sentence refuses it.
- The breadth came from the judgement's section 5, which calls the sentence "the consequence" of the rule (`explorations/reviews/spec-refused-examples-judgement.md:137`). Pavol's "S2 yes" took it as such (`POSITIONS.md:84`). Nobody weighed a narrower wording.
- Both paths refuse every such declaration today, at name resolution: only a declaration's own static parameters are in scope for its extends clause (judgement section 3.1, citing `TypeDisambiguator.java:86`, `:118`). So the text still describes what runs.
- Nothing on microGPT's path uses a where clause: there is none in `explorations/run-c4/src/` or `explorations/apl/mg/`, and the code generator refuses any where clause on an object (`CodeGen.java:4088`, judgement section 3.1).

### Standard 2: the team's built intent

Each replacement is the library's own shape:
- `object Empty[\T\]` and a factory, as `Library/CovariantCollection.fss:96` and `Library/List.fsi:121` do;
- `value object Nothing[\T\]` (`Library/FortressLibrary.fsi:925`);
- the widening function with bounded static parameters (`Library/CovariantCollection.fss:15-35`);
- `trait Object extends Any` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`).

The compiled checker the type group left enforces the rule for type arguments (`checkP`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:455-468`).

S met one conflict inside the team's own record and stated it plainly. The library's comment at `Library/FortressLibrary.fsi:923-924` says `Nothing` "will become a non-parametric singleton when we get where clauses working". That comment is Maessen's of 2008 (`f861cca4d`), before the rule. The callout quotes it and says the rule closes that road (`convenience.tex:74-79`). That is the right weighing under `POSITIONS.md:58`.

`Tuple`'s change is not required by the rule. No tuple type extends a trait, and the callout says so (`objects.tex:190-194`). The library declares no `Tuple` at all, so "as the library has it" does not apply. The judgement named this "the rung's call, not a decision" (judgement section 3.4), and S made it for the prose's sake: the old text leaned on `Object`'s. Defensible, and honestly labelled.

The form is the team's layered form for 1.0 and 2009, which Pavol took (`POSITIONS.md:82`).

### Standard 3: the design record

- **The rule and its sources.** The rule is the type group's "multiple instantiation exclusion" (`Papers/Types/exclusion.tick:141-152`), with Naden's 2012 write-up behind it (`Papers/Types/journal/justificationOfRTR.tex`). The callouts cite the paper and the later chapter.
- **The covariance road.** The covariance example keeps the road the type group was building, the `covariant` modifier (`types.tick:320-339`), in one sentence that says it runs on neither path, as Pavol decided (`POSITIONS.md:97`).
- **The wind-down post.** It names "conditional inheritance via where clauses" among the three things the team wished it had explored (`design-intent-sources.md:57`). S's where-clause sentence does not touch that: a where clause that constrains the declaration's own parameters stays legal (decision record section 1, item 21).
- **What the sentence does close.** It closes the hidden-type-variable supertype. The design record has no argued source for that feature at all (`design-intent-sources.md:102`), and the where calculus is its only formal home (`Specification/appendices/calculi/where/calculus.tex:21-31`, now marked as predating the rule).

### The global questions

- **Later phases.** No conflict with the switch-over, the arrays or unboxing. Two small couplings with phase 3:
  - Four passages state how far the compiled checker enforces the rule (`types-vals-vars.tex:246-248`, `traits.tex:316-318`, `Specification/fortress/preamble.tex:59`, `Specification/appendices/changes.tex:90-97`). Each time phase 3 closes row 406 (`bool`) or row 414 (a static parameter as the argument), those four must be edited and the PDF rebuilt. Rows 406 and 414 point there, so it will not be lost.
  - The team kept implementation status in draft-only notes (`\note{... not yet supported}`, `Specification/basic/traits.tex:15-16`; empty in a release build, `fortress.tex:35-36`). S's status sentences print in the release build. Pavol's S1 put the change callouts in every build, but not status lines about the checker in particular. This is a small departure, defensible as honesty about the implementation.
- **Row 331.** Pavol's decision on row 331 (2026-09-21) gated the bare `Nothing` on "where clauses binding a type variable in an extends clause" (`POSITIONS.md:49`). S's sentence forbids that gate outright. The judgement proposed re-gating it on static-argument inference, and that is parked (`PLAN.md:120`). The record knows this. It is one more reason the where-clause sentence should be narrowed or its breadth recorded as chosen.
- **Built twice.** Appendix I and the decision record both quote the originals. That is Pavol's S1, not a rung's choice.
- **The library's way.** Yes, for every replacement.
- **What reached Pavol.** The calculi stop reached him and was answered (`POSITIONS.md:116`). The where-clause sentence's breadth did not, because no one saw it as a choice.
- **The push.** The batch was pushed at about 17:56 UTC before that stop was answered, because the coordinator had not read the line that held it (batch record `RECORD.md:7`). The pushed text chose nothing for the calculi, so no content harm followed. It is still a break of the hard rule that a reserved stop waits for his yes. The record states it. Whether he was told is not on record.

### Verdict: in the spirit

Every revised passage carries a decision of Pavol's or the team's later Types chapter, in the team's own form, with the original kept and route C recorded. The where-clause sentence is a defensible deviation inside the rung: it matches what both paths do, but it is broader than the rule and no one decided the breadth.

## Rung Z, `e893a3e00`

### What landed

- A descriptor per number from `RTTIsize.of` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTIsize.java`), called by:
  - the loader (`ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java:133-134`, `:149-162`);
  - the extends-clause push (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, the formerly empty `IntArg` branch);
  - the dispatcher's literal leaf (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1105-1116`, `:1278`).
- A size symbol in an arm treated as a type variable.
- A size read as a value compiled to one `CONST.Nat` call that the loader replaces by the numeral (`CodeGen.java:5987-6008`; `MethodInstantiater.java:225-241`).
- Sizes counted as closures' free static parameters (`ProjectFortress/src/com/sun/fortress/compiler/codegen/FreeVarTypes.java:32`, `:106-166`).
- An atomic serial-number counter (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTI.java:19`).
- Row 402's case in `cP` for two different literal sizes (`TypeAnalyzer.scala:463`).

### Standard 1: the specification

- **Sizes at run time.** "These parameters are instantiated at runtime with numeric values" (`Specification/basic/trait-parameters.tex:82`). Z makes that true on the compiled path. Dispatch on a size follows the dispatch rules (`Specification/basic/overloading.tex:262-276`). The exclusion case follows the rule as rung S states it (`types-vals-vars.tex:218-237`).
- **The deviation Z names.** A nat parameter "may ... appear in any context that a variable of type ℕ32 can appear" (`trait-parameters.tex:83-86`). Z types a size read as a value as `IntLiteral`, the checker's type for it (the team's `KindEnv`), and reads it back exactly at any magnitude (rung Z `REPORT.md` section 4, decisions 5 and 11). `compiler_tests/NatRtBigSize` gates sizes up to 2^64-1.
  - The judge calls the specification silent on a size's range (`explorations/compile-ladder/rung-size-runtime/JUDGE.md:271-278`).
  - That is arguable: the ℕ32 sentence is at least a strong hint that a nat's value fits ℕ32.
  - `IntLiteral` coerces into ℕ32 wherever one is needed, so every use the specification names still works. Defensible.
  - It is a decision Pavol has not seen (below).

### Standard 2: the team's built intent

Z is built almost entirely from the team's own devices:
- **The factory.** Get, construct, `putIfAbsent`, keep the winner: `InstantiatingClassloader.java:2744-2752` and `RttiTupleMap.java:114-117`. Pavol recognised it as the team's pattern when he chose it (`POSITIONS.md:98`).
- **The extends clause.** The team left an empty `IntArg` branch in the extends-clause push, with "Only emitting RTTI for types right now" after it. Z filled the slot the team reserved, pushing a size parameter's field as the branch above does for a type parameter.
- **Value position.** The loader's `CONST` substitute-at-load channel already carried `hash` and `String` (`MethodInstantiater.java:216-224`). Z added `Nat` beside them. The emitted code is `CodeGen.forIntLiteralExpr`'s three branches (`CodeGen.java:3875-3910`), so a size reads back exactly as a literal does.
- **The dispatcher.** A size leaf is a new `TypeStructure` subclass in the team's own family. `DOT`'s shared size needs only the team's second-occurrence check (`OverloadSet.java:1516-1540`, the precedent line of rung Z's `REPORT.md`).
- **The checker.** `cP` implements the int and nat half of the team's own `//Todo: Handle int, nat, bool args`, and leaves `bool` with the TODO.

Two local devices, both small and argued:
- `isSizeLiteral` recognises a size by its first character (`MethodInstantiater.java:149-152`), since no Fortress name begins with a digit or a minus sign.
- `FreeVarTypes` gates a size read as a value by a stack of enclosing size-parameter names (`FreeVarTypes.java:111-166`), because that visitor has no scope. Rung Z `REPORT.md` section 4, decision 12, gives the reason and the skeptic probed the edge cases (`probes/skeptic/ZsFieldLit.fss`, `ZsFieldLit2.fss`).

One workaround sits in the dispatcher: `OverloadSet.java:1461` skips the `extends Object` bound for `nat` and `int` parameters.
- That bound comes from Steele's change of 2012-05-28, "static parameters now have implicit bound of Object if none given" (`91e71e62e`). It was meant for type parameters. A size has no type bound (`trait-parameters.tex:66-90`).
- So the skip is right in effect, and the real fix is at the desugarer for size kinds (row 412).
- When phase 3 takes up that setting's errors (`explorations/perf-probes/prelude/switch-over-distance.md:20`), Z's skip becomes dead code. That is harmless.

### Standard 3: the design record

- **Types never erased.** Every generic instance is stamped out with its arguments in its name (`map/design-intent-sources.md:114`; `Papers/RuntimeInstantiation`). Design B puts a size into the slot a type argument already has, so a size is carried at run time exactly where a type is.
- **Steele's note on static information.** Guy's note says static information "can be omitted from a run-time representation exactly when type information can be omitted" (`Specification/basic/dimensions.tex:244-254`). Design B follows it: the descriptor is the boxed case, and nothing stops an unboxed `double[]` from carrying no size at all.
- **Sizes live in types.** The specification's own motivation is that types "can be parametric with respect to other types and values (most notably natural numbers)" (`Specification/preliminaries/intro/nutshell.tex:85-86`). Z makes that run.

### The global questions

- **The switch-over gets shorter.** W1 measured 12 of the one library's overload sets refused by the dispatch generator for "a size in an overload arm" (`switch-over-distance.md:18`). Z's dispatcher leaf (row 411) is what removes that refusal. Z's decision 9 also kept its gated tests neutral between the two libraries, so the switch-over will not turn them red (rung Z `REPORT.md` section 4).
- **Arrays and unboxing.**
  - A size read as a value is an `FIntLiteral` box, built after an `LDC` of the number in the stamped class. A literal is compiled the same way, so phase 6's unboxing by static type must cover both or neither, and the number is a constant the JIT sees (`explorations/reviews/size-runtime-design-brief.md:105`). No conflict.
  - The size range is a live question for the array design, since a JVM array's length is an `int`.
- **Built twice.** The three-branch literal emission now lives in two places: `CodeGen.forIntLiteralExpr` (`CodeGen.java:3875-3910`) and the loader's `Nat` case (`MethodInstantiater.java:225-241`).
  - The run-time package must not depend on the compiler (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:13-16`), but the compiler may call the run-time package.
  - So one static helper in `runtimeSystem` could serve both. A later change to how a literal is emitted, such as phase 6's unboxing or a width rule like row 317's, would otherwise have to be made twice.
  - Small, optional. Nothing must be undone.
- **What Z found beyond its scope, and where it sits.** Z's skeptics and repair round found three compiled-path defects that types share with sizes and that predate Z:
  - Row 417: the class loader's first load of an instantiated closure class races. A parallel `for` that dispatches a generic arm over eight instantiations fails 5 of 5 compiled runs at four threads.
  - Row 419: a parallel task in a generic declaration is not made generic over its free static parameters. A 13-line fix is written and shown working on both forms, not landed (`explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo-fix.patch`).
  - Row 420: a generic method of a generic object that builds instances over both the object's and its own static parameters fails at load.

  By reading, the one library uses the shapes two of these fail on:
  - `iaf[\R, T extends R, A extends T, B extends T\]` calls `initArrayFrom[\R,B\]` in the second front of an `also` block (`Library/CovariantCollection.fss:50-55`), row 419's shape. `aaf` does the same at `:64-69`.
  - `Indexed`'s `map[\R\]` builds `SimpleMappedIndexed[\E,R,I\]` over the trait's `E` and `I` and its own `R` (`Library/FortressLibrary.fss:1805`), row 420's shape.
  - Whether the switch-over reaches these was not checked. W1 could not have seen them, because it compiled and did not run.

  Row 417 hits any compiled program that first reaches generic dispatch on several threads at once. microGPT compiled will be such a program, because the compiled `for` is already parallel (`explorations/c4-parallelism.md:404-410`).

  None of the three is in the plan. Phase 5 lists rows 304 and 340 as its code-generation holes (`PLAN.md:70`), phase 4 lists natives and names (`PLAN.md:61-62`), and batch 6's manifest carries none of them.
- **What reached Pavol.** Z's report ends with a list for him (rung Z `REPORT.md` section 13), and its judge with another (`JUDGE.md:269-287`):
  - the size range;
  - the gap in the gate for a defect that shows only above one thread (row 417);
  - two 2012-tree files outside the brief's list;
  - the lookup cost;
  - row 419's fix, measured and not landed.

  The handover says these "go to Pavol" (`explorations/microgpt-run-c-handover.md:17`). There is no entry for any of them in POSITIONS, in the plan, or in batch 6's manifest. The gate's thread count has been on his list of smaller items since 2026-09-20 (`explorations/coordinator/postmortem-2026-09-19/held-list.md:40`). Row 417 is the first concrete defect that shows why it matters.

### Verdict: in the spirit

Design B and the factory are Pavol's. Z built them from the team's own factory, `CONST` channel, dispatcher structures and reserved slots. Its deviations are argued and small. What is not in the spirit is where its findings went, not the code: three defects on the path of phases 4 to 6 stayed rows, and its list for Pavol stopped at the handover.

## Findings that need Pavol

Each has what it would take to fix.

1. **Three compiled-path defects that Z found are on the path of the switch-over and of microGPT's parallel run, and the plan does not list them.** Row 417 is a class-loader race at four threads. Row 419 is a parallel task in a generic declaration. Row 420 is a generic method that builds over two sets of parameters. By reading, the one library uses the shapes of 419 and 420 (`Library/CovariantCollection.fss:50-55`, `Library/FortressLibrary.fss:1805`).
   - Fix: name them in phase 4's design. Land row 419's written 13-line fix as one rung with a gate run. Locate row 420's site. Give row 417 its own rung: a lock around the first load, shown free of deadlock.
   - Cost: about three small rungs. Doing them before the switch-over is cheaper than meeting them inside it.
2. **The gate cannot hold a defect that shows only above one thread.** Compiled tests run at one thread. The four-thread stage runs only the `atomic` programs, and an expected-failure test there would turn it red. Row 417 has no gated home for that reason.
   - Fix: a JUnit test that drives the loader from several threads, which gives row 417 a home now. Later, a four-thread compiled track.
   - Cost: one small rung for the JUnit test. The track is a gate decision of its own, on his list since 2026-09-20.
3. **A size's range was decided by a judge and not shown to him.** A size read as a value is exact at any magnitude, gated up to 2^64-1. The specification says a nat parameter appears where an ℕ32 variable can.
   - Default: keep it, since it matches the checker's own typing, and take it up again with the array design, where lengths are `int`.
   - Cost to change later: one test's expectations and the loader's three branches.
4. **One sentence of the revised specification is broader than the rule.** The sentence is "A where-clause variable may not appear as a static argument in an extends clause". It also refuses a variable that a constraint pins down to one type, which the rule allows.
   - Fix: narrow it to a variable that more than one type can satisfy, or keep it and say in the decision record that the breadth is chosen.
   - Cost: one sentence here and in Appendix I, a PDF rebuild, no code. Nothing on microGPT's path depends on it.

## Smaller findings, for the record

- The literal ∔ split, by reading: the compiled folder is exact on two numerals, while `walk` wraps them through `IntLiteral extends ZZ32`. It belongs as a note on the literal row, with a two-line probe.
- D's declarations are unread by the checker so far. The full measurement after batch 6 should be read by operator family.
- `PLAN.md:61`'s native counts were measured before D's 20 bindings. All 20 have compiled helpers.
- Z's literal emission exists twice. One helper in `runtimeSystem` would make it once.
- S's status sentences about the checker print in the release build, where the team kept status in draft-only notes. Rows 406 and 414 point at the four passages.
- Rows 406 and 414 cite Appendix I's coverage sentence as `Specification/appendices/changes.tex:84-91`. Batch 6's rung T moved it to `:90-97`.
- The `Tuple` passage was changed though the rule does not require it. The change is honestly labelled, and was the rung's call by the judgement's word.
- Batch 5 was pushed before rung S's reserved stop was answered. The record says so. Whether Pavol was told is not on record.

## What went right, globally

- D's items travelled. Every row D opened reached batch 6's brief or was fixed there (rows 427, 428, 430).
- Batch 6's flattening kept D's lines, as the plan's split into two batches intended (`PLAN.md:19`).
- S deferred the number chapters and batch 6's rung T wrote them, so the specification never ran ahead of the library.
- Z's cross-rung dependency on S was foreseen in the manifest, handled at the gather, and repaired in four passages at the review.

## What I did not do

- Built nothing, ran no program, edited no source, library, test, ledger or record file.
- Did not measure the literal ∔ split, or whether the switch-over reaches rows 419 and 420 through `CovariantCollection` and `Indexed.map`. Both are stated as by reading.
- Did not review batch 6, except where it changed what batch 5 landed.
