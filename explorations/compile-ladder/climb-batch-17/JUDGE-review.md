<!-- Climb batch 17, the judge of the merged-diff review: its three blocking findings are upheld. Finding 1 is ruled a departure to record (the review's repair (b)), finding 2 a specification repair wider than the review asked, and finding 3 is routed to the next batch that edits walk's OverloadedFunction.java. Decision repair: specification text, one compiled expected failure, a ledger row and the record, with no path the gate reads but that test. -->

# Climb batch 17: the judge's ruling on the merged-diff review

Written 2026-10-17 by the batch's judge (Opus), on `main` at `21dce2148`. Nothing was built or run for it, and the gate's folders were not read. Every point below is either a reading of the tree at that commit, marked "by reading" where no run backs it, or a result that the review quotes with its command.

## 1. Ruling

**Decision: repair.** All three blocking findings are upheld.

- **Finding 1** (rungs A and L). The checker's opening of a type `where`-clause variable ignores a trait constraint of the clause on that variable. This departs from the text, and Appendix I does not name it. The repair is the review's way (b): an expected failure, a ledger row, and the departure named in the Effect of "The traits that extend a closed trait". The code stays as it is, for the reasons of section 2.3. The way not taken goes to the curator.
- **Finding 2** (rung W). Upheld in its conclusion, with the exception made more precise. The box of `inference.tex` overclaims in two places, not one, and row 765 is named nowhere in the specification. The repair is text only.
- **Finding 3** (rungs W and G). Upheld. `ownGeneric`'s comment is half false on `main`. It is a comment under `ProjectFortress/`, and editing it would rerun the gate. So it goes to the next batch that edits walk's `OverloadedFunction.java`, as climb batch 16's judge did with two comments in that file (`explorations/compile-ladder/climb-batch-16/JUDGE-review.md`, section 6).

The decision cannot be land: findings 1 and 2 need edits of `Specification/`. The repair changes no path the gate reads except one new test pair under `ProjectFortress/compiler_tests/`. The repair runs that pair itself, so the gate does not run again (`explorations/coordinator/climb-batch-workflow.js:1520-1543`, `repairRerun`; `:1444-1447`, the paths the gate reads).

## 2. Finding 1: a trait constraint on an opened type `where`-clause variable

### 2.1 What the tree does

- `whereSizes` builds each type `where`-clause binding as a type parameter from the binding's own supers. That is `NF.makeTypeParam(NU.getSpan(b), b.getName, b.getSupers, none[Type], false)` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:868`). The constraints of the clause (`SWhereExtends`) are not read.
- `openWhereSizes` bounds the opened `E#k` by those supers alone, substituted at the trait's own static arguments (`TypeAnalyzer.scala:907-910`). It then registers the opened type with that bound (`KindEnv.registerOpened`, `:910`).
- Rung L's `KindEnv.constraintBounds` adds each constraint `X extends B` of a `where` clause to `X`'s bounds whenever an environment is extended with that clause (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:44-59`, `:111-131`). That covers the trait's own clause inside the trait.
- So one clause is read two ways. Inside `AnyBox`, `E` extends `Foo`. At a call, the opened `E#k` does not.

The review measured the consequence on the gather's build of the five patches, with `bin/fortress typecheck` on its `WhereConstraintOpen.fss` (the program of section 6, step 1):

    Could not check call to function fooOf
    - [\E extends Foo\]Box[\E\]->ZZ32 is not applicable to an argument of type AnyBox.
    File WhereConstraintOpen.fss has 1 error.

The same program with `where [\E extends Foo\]` typechecks, and walk prints `7` for both forms.

### 2.2 What the text says

- A `where` clause's trait constraint "consisting of the identifier of a naked type variable, followed by `extends` followed by a set of trait references" constrains that variable, and `where`-clause variables "must be bound in a `where` clause" (`Specification/basic/trait-parameters.tex:333-358`).
- A listed type holds at every value of a `where`-clause variable of the declaration (`Specification/basic/traits.tex:235-245`).
- The specification reads a `comprises` clause at the level of values (P-60).

So every value of `AnyBox` is a `Box[\X\]` for some `X` that extends `Foo`, and `fooOf[\E extends Foo\](b: Box[\E\])` applies to it. The checker refuses a call that the text accepts. Appendix I's Effect says only that the opened type is "bounded as the variable's binding bounds it" (`Specification/appendices/changes.tex:1489-1490`). That is true of what it says, but it names no departure and no row. The skill requires the Effect to name each departure with its ledger row, so that the text claims no more than holds (`.claude/skills/fortress-repo/references/specification.md`, "Changing the text: the revision form", item 1, and "When the text and an implementation disagree").

### 2.3 Why the departure is recorded and the code stays

Four reasons, each from the tree or the record.

1. **No program of the tree uses the form.** No live `comprises` clause has a `where` constraint. The only such clause the team wrote is the commented one on `HasRank`, `comprises Array[\T,E,I\] where [\T,E,I\]{ T extends Array[\T,E,I\] }` (`Library/FortressLibrary.fsi:1207`). The other clauses with a `where` clause are bindings: `List.fss:87`, `List.fsi:56`, `NatReflect.fss:24`, and the commented ones of `FortressLibrary` and `Reflect`. Whether `Array`'s clause becomes live is the curator's open item A.skeptic.1, to which the review added this finding as review.1 (`explorations/coordinator/PLAN.md:468`). Under P-151, "Only the `where` forms the team wrote down are built", only `AnyList`'s clause is made live. So reading the constraint at the opening builds toward a clause that waits on his word.
2. **The opening's bound holds only as far as the extender check reads it, and that check reads no bound.** Both extender checks read a listed type at every type of a bounded type `where`-clause variable (rows 753 and 754). The compiled one puts one inference variable for each binding, without its bound (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:319-323`). It would read constraints no better.
   - By reading: with `object Box[\E\](item: E) extends AnyBox`, Box unbounded, the extender check accepts `Box[\String\]` as a listed type. A bound `E#k <: Foo` at the opening would then type `b.get().foo()` on a `String`.
   - The binding form already has this hole (rows 753 and 754, A.skeptic.2 at `PLAN.md:469`, "Repair it before a bounded clause reaches the library?"). Repair (a) would extend the hole to the constraint form.
   - The record's soundness test for the opening is the refusal of Amin and Tate's shape, whose clause carries a constraint (`ProjectFortress/compiler_tests/XXXOpenTypeBoundEvidenceChecker.fss:5`; F-251, F-244).
3. **Repair (a) would not reach the one clause the team wrote in this form.** `Array`'s constraint names `where`-clause variables in its bound (`T extends Array[\T,E,I\]`). `openWhereSizes` substitutes into an opened type's bounds the trait's own static arguments only, never the other opened names (`TypeAnalyzer.scala:908-909`, by reading). The bound would keep the raw `T`, `E` and `I`, which no environment at the call binds.
4. **Cost.** A checker change falls under P-148: the count stage timed on the base and on the change, a profile and a second pass. It would also rerun the whole gate (`climb-batch-workflow.js:1525`). Recording the departure costs neither. The record's practice for a departure that a rung's checker change leaves at a call is exactly this: rows 749, 751, 752 and 756, each with its test or its command, and its Effect sentence.

The reading of the constraint is a small change in `whereSizes`. It belongs with rows 753 and 754 and with the substitution of opened names into bounds, in a rung that makes a constrained clause live. It goes to the curator as a fork (forCurator, item 1).

## 3. Finding 2: the box of "The Static Arguments of a Call"

The sentence on `main` (`Specification/basic/inference.tex:283-287`):

    It infers the static arguments of a generic dotted method that a call does not
    write as it infers a generic function's, whether the method is alone under its
    name or among the overloads of its receiver, and compares declarations with
    static parameters on the parameter types they declare, generic dotted methods
    among them; ...

It claims more than holds in two ways.

**A functional method of a generic trait or object is compared on the instance that a call makes.** `ownGeneric` leaves out `GenericFunctionalMethod`, and `declaredDomain` compares anything that is not an own generic on its instance (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2240-2241`, `:2249-2251`). F-26 says the same of "a generic trait's functional method". By reading, walk builds a `GenericFunctionalMethod` for every functional method of a trait or object that has static parameters (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObjectOrGeneric.java:85-102`). A generic object is an `FTypeGeneric` too (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:467-469`), as a generic trait is (`:836-838`).

The review's "generic functional methods" is wider than that. A functional method with its own static parameters in a plain trait or object is built as `GenericFunctionalMethod.Own` (`FTraitOrObjectOrGeneric.java:119-122`). That class extends `FGenericFunction` (`GenericFunctionalMethod.java:151`), which is a `GenericFunctionOrConstructor` (`FGenericFunction.java:33`), so `ownGeneric` holds of it. This is by reading.

**A generic dotted method is compared on its declared domain only where exactly one of the two declared domains lies inside the other.** Otherwise `preferredDeclaration` falls through to `moreSpecificDeclaration`, which compares it on its instance (`OverloadedFunction.java:2154-2168`, `:2249-2251`). F-253 and F-252 say the same. The box says "generic dotted methods among them" with no limit. The review did not name this half.

**Row 765 is not named in the specification.** `grep -n 765` over `Specification/basic/inference.tex`, `Specification/appendices/changes.tex` and both `overloading.tex` files prints only `row~753` (`changes.tex:1495`).

Row 765's call fails to find an overload where only an inherited generic functional method fits: "Failed to find any matching overload, args = (Square)", on the old code and the new (`ProjectFortress/tests/XXXInheritedGenericFunctionalMethodBesidePlain.fss:20`). That method is declared in the plain trait `Describes` (`:10-12`), so by the reading above it is an own generic. Its failure is therefore not the comparison by instance that the review ties it to; the mechanism is untraced (row 765's notes). It is still a call with static parameters that the box's rule says walk runs: walk infers the static arguments of a declaration with static parameters and instantiates the declaration its dispatch chooses (`inference.tex:236-240`). So the box and the Effect name it.

Appendix I's Change paragraph has the same overclaim: "and compares such a method on the parameter types it declares" (`changes.tex:1916-1917`). The Effect names rows 21, 760, 761, 762, 744 and 766 (`:2148-2167`), not 765.

## 4. Finding 3: `ownGeneric`'s comment

On `main` (`OverloadedFunction.java:2235-2238`): "A functional method of a generic trait is instantiated from its self argument, and a generic dotted method has no symbolic instantiation to read its declared domain from; both are compared on the instance a call makes."

- Rung W's `methodDeclaredBelow` reads a symbolic instance's domain as its declared domain (`:2173-2180`). `preferredDeclaration` then compares a generic dotted method on it wherever exactly one of the two declared domains lies inside the other (`:2154-2168`). So the second half is false of dispatch as a whole.
- The sentence stays true of `ownGeneric` itself and of `moreSpecificDeclaration`, as W's report says (`explorations/compile-ladder/rung-walk-method-sargs/REPORT.md:155`).
- By section 3's reading, "of a generic trait" also leaves out a generic object.

W was right to leave it: `ownGeneric` belongs to G's load check, and no two rungs change one declaration. G's report scoped its own check by that comment as its branch held it (`explorations/compile-ladder/rung-walk-generic-pairs/REPORT.md:155`), which was true there. The comment lands half false.

Correcting it edits a path the gate reads (`climb-batch-workflow.js:1444-1446`), so it goes to the next batch that edits `OverloadedFunction.java`, with this text for the comment:

    A declaration whose own static parameters a call's arguments
    instantiate: a generic function or constructor, or a functional method
    with static parameters of its own in a trait or object that has none.
    A functional method of a generic trait or object is instantiated from
    its self argument and compared on the instance a call makes; so is a
    generic dotted method here, which preferredDeclaration compares on its
    declared domain where exactly one of two declared domains lies inside
    the other.

## 5. Which claims of each side were right

The review:

- **Finding 1, the mechanism and the measurement.** Right: `TypeAnalyzer.scala:868` and `:907-910`, `KindEnv.scala:111-131`, the three output lines, the binding form passing, walk printing `7` for both.
- **Finding 1, "Rule broken".** Right: `trait-parameters.tex:333-358`, `traits.tex:235-245`, and the Effect at `changes.tex:1489-1490` naming no row.
- **Finding 1, "the team's commented `Array` clause uses exactly this form".** Right that it has a constraint. Its constraint names `where`-clause variables, which repair (a) as worded would not open (section 2.3, item 3).
- **Finding 1, "(b) needs no gate rerun".** Right (`climb-batch-workflow.js:1520-1543`), provided the repair's run of the new test passes.
- **Finding 2, the conclusion.** Right: the box claims more than holds, and row 765 is named nowhere.
- **Finding 2, the exception "for a generic functional method".** Too wide (section 3): only a functional method of a generic trait or object. The review also missed the dotted method's own limit.
- **Finding 2, "It touches no path the gate reads".** Right: `Specification/` is not among them (`climb-batch-workflow.js:1444-1445`).
- **Finding 3.** Right in full, with its citations `:2233-2239`, `:2173-2181` and `:2161-2168`. Its offer to route the comment is taken.
- **The review's fixed list and fixesChecked.** Not contested here. `RECORD.md:155`, as the review corrected it, is right about A and L. It is wrong about W, whose sentences it calls "each true of the merged tree's code and tests". Step 8 of section 6 corrects it.

The rungs:

- **A.** Right that its Effect states what the code does. It left the constraint form unnamed.
- **L.** Its F-250 states the reading inside the declaration and nothing at an opening.
- **W.** Its sentence overclaims as section 3 says. Its `REPORT.md:155` is right about the comment, and right to leave it to G.
- **W's skeptic.** It filed row 765 with its test, but gave it no sentence, while giving row 766 three (`RECORD.md:137`).
- **G.** It did not edit the comment, which its scope did not need on its own branch.

## 6. The repair

The instructions are those of the structured decision, repeated here. Work in the main tree, `/home/user/fortress`, after the gate there has finished. Use the skill's setup for each call (`.claude/skills/fortress-repo/references/build-and-caches.md`). Do not edit any file under `ProjectFortress/src/` or `Library/`.

1. **Write the expected failure** `ProjectFortress/compiler_tests/XXXOpenTypeWhereConstraintChecker.fss`. It is the review's program, renamed, with a first-line comment that gives the text's answer:

       (* A value whose trait lists Box[\E\] where [\E\] { E extends Foo } is a Box at a type that extends Foo, so fooOf applies to it; trait-parameters.tex, section "Where Clauses", and traits.tex, section "Trait Declarations". *)
       component XXXOpenTypeWhereConstraintChecker
       export Executable

       trait Foo
         foo(): ZZ32
       end
       object F extends Foo
         foo(): ZZ32 = 7
       end

       trait AnyBox comprises { Box[\E\] } where [\E\] { E extends Foo }
       end
       object Box[\E extends Foo\](item: E) extends AnyBox
         get(): E = item
       end

       mk(): AnyBox = Box[\F\](F)
       fooOf[\E extends Foo\](b: Box[\E\]): ZZ32 = b.get().foo()

       run(): () = println(fooOf(mk()))

       end

   Beside it goes `XXXOpenTypeWhereConstraintChecker.test`, three lines: `tests=XXXOpenTypeWhereConstraintChecker`, `typecheck`, `typecheck_err_contains=is not applicable to an argument of type AnyBox.`

   This rests on the form of `ProjectFortress/compiler_tests/XXXSelfTypeObjectExprWrong.test:1-3` and `OpenTypeChecker.test:1-2`. A `typecheck` command keeps the code generator's wall for a trait with a `where` clause (rows 307 and 701, `changes.tex:1505-1506`) out of the test. It is the skill's item 2 of "How a defect is recorded" (`.claude/skills/fortress-repo/references/tests-writing.md`).
2. **Run it through the harness on the merged tree**, from its place in `compiler_tests`, with `ONE_JVM=1` and the skill's `junit.sh` (`tests-running.md`). Capture each run under the repair's test-log folder, not committed.
   - As written, it must report an expected failure.
   - Once with `where [\E extends Foo\]` in place of `where [\E\] { E extends Foo }`, it must be red: the review measured that form typechecking. Then restore it and run it again; it must report an expected failure.
   - Copy the program under `tmp/` and run it under walk with a private caches folder (`interpreter.md`, `worktrees.md`). It should print `7`, which backs step 4's "a call the interpreter runs".
   - Keep two to five lines of each output with its command.
3. **Add the ledger row** with `explorations/coordinator/tools/ledger.py add FILE --section "2. Types: generics, static parameters, inference and coercion"`. Its number is the one `ledger.py` gives (771 if nothing else is added first); call it NNN below. The cells:
   - claim: "the compiled checker bounds a type `where`-clause variable that it opens at a call by the variable's binding alone, not by a trait constraint of the clause on it: for `trait AnyBox comprises { Box[\E\] } where [\E\] { E extends Foo }`, `fooOf(mk())` with `fooOf[\E extends Foo\](b: Box[\E\])` is refused"
   - status `NEGATIVE-VERIFIED`; class `implementation gap (checker)`; spec citation `basic/trait-parameters.tex`, "Where Clauses"; reproducer `ProjectFortress/compiler_tests/XXXOpenTypeWhereConstraintChecker.test`; found by `climb batch 17 merged-diff review`.
   - notes, in at most 700 characters:
     - "siblings: 753, 754, 749, 636."
     - The message 'is not applicable to an argument of type AnyBox'.
     - The binding form `where [\E extends Foo\]` is accepted, and walk prints 7 for both (step 2).
     - `whereSizes` takes the binding's own supers (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:868` at 21dce2148), and `openWhereSizes` bounds the opened type by them (`:907-910`).
     - `KindEnv.constraintBounds` reads the constraint as a bound inside the trait (`KindEnv.scala:111-131`).
     - The extender check reads no bound (row 753), so reading the constraint at the opening waits on it.
     - The team's commented `Array` clause has a constraint (`Library/FortressLibrary.fsi:1207`).

   Then run `ledger.py check`. It must print only the base's ten failures of the template.
4. **Name the departure in A's Effect.** In `Specification/appendices/changes.tex`, replace lines 1489-1490 with these five lines. The rest of the sentence, from "reaches a type naming another type" at `:1491`, stays as it is. This rests on section 2 and on steps 2 and 3.

       type at a type of the value's own for that call, bounded as the variable's
       binding bounds it and known to equal only itself; it does not bound that type
       by a trait constraint of the clause on the variable (\secref{where-clauses}),
       so that it refuses a call that needs the constraint's bound, a call the
       interpreter runs (row~NNN); it refuses an opened type that

5. **Correct the box of `inference.tex`.** Replace `Specification/basic/inference.tex:283-291` with these lines. Line 292 ("A generic dotted method that a trait declares ...") stays.

       It infers the static arguments of a generic dotted method that a call does not
       write as it infers a generic function's, whether the method is alone under its
       name or among the overloads of its receiver.
       It compares declarations with static parameters on the parameter types they
       declare, but for two kinds: a functional method of a generic trait or object it
       compares on the instance that a call makes, and a generic dotted method on the
       parameter types it declares only where exactly one of the two declarations'
       declared parameter types lies inside the other's, and otherwise on that instance.
       Where an object declares a plain functional method beside a generic one of the
       same name that it inherits from a trait, a call that only the generic one fits
       finds no overload (row~765 of the revival's gap ledger).
       It stops at load on an object or trait that declares a generic dotted method
       beside a plain one of the same name (row~760 of the revival's gap ledger), and
       it stops on an object that extends a generic trait whose dotted method has a
       static parameter of its own bounded by the trait's, at load or at a generic
       object's first instance (row~762).

   This rests on `OverloadedFunction.java:2154-2168`, `:2240-2241` and `:2249-2251`; `FTraitOrObjectOrGeneric.java:85-102`; F-26, F-253, `MethodStaticArgDeclaredDomain`; and row 765 with `XXXInheritedGenericFunctionalMethodBesidePlain`. Each is a fact or a gated test, so the box needs no new run.
6. **Correct the Change of "The inference of a call's static arguments".** Replace `changes.tex:1916-1917` with the lines below. `:1918` then continues "dotted method on which it still stops, ...", as now.

       alone under its name or among the overloads of its receiver, and compares such
       a method on the parameter types it declares only where exactly one of two
       declarations' declared parameter types lies inside the other's, says that it
       compares a functional method of a generic trait or object on the instance that
       a call makes, names the call of an inherited generic functional method that
       finds no overload, names the two forms of generic

7. **Name row 765 in that entry's Effect.** After `changes.tex:2154` ("chosen where the plain one does not apply."), insert:

       A generic functional method that a trait declares and an object inherits beside
       a plain functional method of its own is not chosen where only it applies: the
       call finds no overload, on the base as now (row~765).

   Every line number in steps 4 to 7 is `main`'s at `21dce2148`. Steps 4 and 6 move the lines below them, so apply the steps from the bottom of each file up, or find each passage by its text.
8. **Correct `explorations/compile-ladder/climb-batch-17/RECORD.md`.**
   - In "Text mismatches" (`:155`), replace "and returned it as a blocking finding" with "and returned it as a blocking finding, which its judge ruled a departure to record (row NNN, `JUDGE-review.md`)".
   - In the same paragraph, replace "each true of the merged tree's code and tests" with "each true of the merged tree's code and tests, but for W's box, which compared every declaration with static parameters on its declared domain and named no row 765 until the repair after the review".
   - After that paragraph, add a paragraph "**Corrections, after the review.**" It gives:
     - each new sentence of steps 4 to 7, with its file and line;
     - step 2's commands with their output lines;
     - row NNN and its test;
     - this ruling, `explorations/compile-ladder/climb-batch-17/JUDGE-review.md`;
     - that finding 3's comment is left for the next batch that edits `OverloadedFunction.java`, with section 4's text;
     - that this record's other citations of `changes.tex` past `:1489` and of `inference.tex` past `:283` are `main`'s lines at `21dce2148`.
9. **In `explorations/coordinator/PLAN.md:468`**, at the end of A.skeptic.1's sentence of review.1 ("that clause would need the opening to read the constraint first"), add "(row NNN)". Add the judge's items for the curator as the repair brief says.
10. **Build the specification** as `.claude/skills/fortress-repo/references/specification.md`, "Building it", says.
    - Both commands must end in `BUILD SUCCESSFUL`.
    - `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` must print 0. `\secref{where-clauses}` is defined at `Specification/basic/trait-parameters.tex:314`.
    - Then run `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`.
11. **Commit once, locally, on `main`.**
    - Paths: the two test files, `Specification/basic/inference.tex`, `Specification/appendices/changes.tex`, `explorations/fortress-gap-ledger.md` (and its history file if `ledger.py` wrote it), `RECORD.md` and `PLAN.md`.
    - The message says that the commit edits the original tree's specification and test folder. It carries the line `historical: Specification/basic/inference.tex, Specification/appendices/changes.tex`, as the batch's commits do, and the skill's footer (`committing.md`).
    - Do not push. Do not edit `OverloadedFunction.java`.

## 7. Left as it is, for the curator

- **The fork of finding 1.**
  - Taken: the departure recorded (row NNN).
  - Not taken: reading a clause's trait constraints as the opened type's bounds in `whereSizes` (`TypeAnalyzer.scala:860-875`). Its cost:
    - a checker change under P-148, with its timing and second pass, and a gate rerun;
    - it is sound only once the extender checks read the bound (rows 753 and 754, A.skeptic.2);
    - it reaches `Array`'s clause only once the opened names are substituted into bounds (`TypeAnalyzer.scala:908-909`).
  - It belongs with A.skeptic.1's answer for `Array`. A reversal is a small edit with the expected failure promoted.
- **Finding 3's comment** (`OverloadedFunction.java:2233-2239`). It is for the next batch that edits that file, with section 4's text.
- **F-252's limit** (`explorations/coordinator/FACTS.md:171`): "a generic functional method is compared on the instance a call makes". By section 3's reading, this is true of a functional method of a generic trait or object only. F-26 has the narrower words. It is for the coordinator's consolidation of F-250 to F-254. Being a record, it is not this repair's: the review did not name it.
