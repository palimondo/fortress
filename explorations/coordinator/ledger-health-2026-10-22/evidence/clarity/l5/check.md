<!-- The ledger clarity run's chunk l5: the checker's verdict on each rewritten row (665, 670, 682, 695, 697, 701, 713, 723, 726, 759) and on the closes, read against the tree at HEAD 8a210ee22. -->

# Chunk l5: check

HEAD is `8a210ee22`. The writer's base was `cdb84fba5`. `git diff --stat cdb84fba5 HEAD` touches only `explorations/coordinator/positions-followup/` files and the boot note, so every line cited at `cdb84fba5` reads the same at HEAD. Nothing was built or run.

**Form.** `python3 explorations/coordinator/tools/ledger.py check --rows explorations/coordinator/ledger-health-2026-10-22/evidence/clarity/l5/rows.rewrite` printed "10 rows, 0 fail the template" (exit 0).

**Closes.** `closes.txt` proposes none, so there is no close to check. The tree agrees: row 665's abstract half stands (`Constructor.java:263`, `:431`), and every other claim holds by reading.

Counts: 7 pass, 3 fail (665, 701, 713).

## Row 665: fail (fidelity, one wording)

- **Passage:** "...and `checkForDef` returns for an instance (`:431`); no check reads the generic declaration."
- **Source:** two checks do read the generic declaration. `BuildEnvironments.checkGenericOverrides` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:895`, called at `:592`, `:875` and `env/ComponentWrapper.java:186`) checks the `override`s. `checkGenericFunctionalMethodMeets` (`ComponentWrapper.java:187`) checks the Meet Rule. The row's own next sentence names the first one. So the cell contradicts itself.
- **Correction:** "no abstract-method check reads the generic declaration".
- Everything else holds. `Constructor.java:263` and `:431` are as cited. Both `XXXAbstractMethodUndefinedGeneric*Walk` tests exist, with `load_exception_contains=does not define an abstract method declared in type S`. P-147 is the coverage rule. Rows 667 and 668 are FIXED. Row 693 names 665 as its sibling. Dropping the `override` half and the generic-trait shape matches `efd6bb2f2`, F-145 and P-147 ("Row 665: walk's check of generic objects").

## Row 670: pass

- `GenomeUtil1z.fss:68`, `GenomeUtil2a.fss:74` and `npbft.fss:36-52` are as cited. `asFloat(self): RR64` is at `Library/FortressLibrary.fss:382`. No `nextRange` is called in the 1z/2a programs; only `BirdCount1y.fss:187` calls it, against `GenomeUtil1y`. `rung-walk-coverage/REPORT.md` § 6 lists "row 670's three" as refused. `rung-walk-load-checks/REPORT.md:151-153` gives both old results on base 7fa767d48: BirdCount exits 0, and npbft fails with "Failed to find any matching overload" at `npbft.fss:31:5-7`.
- Note, not a failure: `8803d2f45` is on `origin/wip/rung-walk-load-checks`, not in HEAD's history. It landed as `fdd377ead`. The commit exists and the measurement is pinned to it.

## Row 682: pass

- The opening is at `TypeAnalyzer.scala:285-298`: comment `:285`, case `:290`, end `:298`. `reviews/array-judgements-popl-check.md` § 7.2 backs three claims: the pair is valid without the opening, with the generic declaration strictly more specific; the refusal follows from the opening; and walk's check is nominal only. Review-queue item 30 (`review-queue.md:326`, `:330`, "Row 682 hangs on it") and F-270 back the hinge. `XXXOpenTypeOverloadChecker.test` (`compile_err_contains=There are multiple declarations of f with the same parameter type`) backs the type face, as does `climb-batch-17/RECORD.md:184`.

## Row 695: pass

- `XXXSelfTypeReturnSelfRun.test` (`run`, `run_out_contains=REACHED`), `SelfTypeReturnSelfRunLink.test` (`link`) and `SelfTypeReturnSelfAtTraitRun.test` (`run_out_contains=cat`) exist as described. P-146 and F-225 say that the checker accepts the body. F-225 itself names row 695 at an object-typed parameter. The `comprises S`, `ClassCircularityError` and control results come from `reviews/self-typed-bodies-judgement.md`, "The compiled run of a body that returns `self`". Commit `911a4f2b0` is in HEAD.

## Row 697: pass

- `OverloadedFunction.java:509` reads `distinct |= unequal && (allObjInstance1 || allObjInstance2);`, and `:437-442` hold the `coincide` exception. `tests/XXXReturnRuleObjectParamWalk.fss` reproduces the claim: `m1(x: C, y: C): B` beside `m1(x: C, y: B): C` differs only at C (object) against B (trait). Its key is `load_exception_contains=the first result is not a subtype of the second`. `reviews/popl2019-examples.md:90` keeps the compiled message that the new line drops. Row 433 is FIXED (`2b1cd8e63`), and `distribute[\K\](r: ActualReduction[\R,K\])` is at `FortressLibrary.fss:3250`. Row 788 names 697.

## Row 701: fail (fidelity, two points)

1. **Passage:** "A `comprises` clause's `where` counts: the reproducer's `trait NatParamT comprises { Nt[\n\] } where [\nat n\]` stops it".
   - **Source:** a trait's `where` is a trait clause of its own, a sibling of `Comprises` (`ProjectFortress/src/com/sun/fortress/parser/TraitObject.rats:100-112`). It is the header's where clause, which the guard reads (`CodeGen.java:5027`, `header.getWhereClause().isNone()`). F-181 describes it the same way: a header `where` that "only binds static parameters ... binds a size and states no constraint". No `comprises` clause carries a `where` of its own.
   - **Correction:** "A header `where` that only binds the size its `comprises` clause lists counts: the reproducer's `trait NatParamT comprises { Nt[\n\] } where [\nat n\]` stops it, 'Can't compile TraitDecl NatParamT'".
2. **Passage:** the claim and notes now state the object's `where` face and the function-contract face as fact. The old line's qualifier, "a function's or object's where clause and a contract are by reading, not run", is gone, and only the function's `where` face has a run since then (`XXXWhereBoundChecker.test`, `compile_exception_contains=Don't know how to compile this kind of FnDecl`; `climb-batch-18/RECORD.md:144`).
   - **Source:** no compiler test compiles an object with a header `where` or a function with a contract to the code generator. `Compiled10.c` and `Compiled5.z` stop in the checker (`XXX10c.test`, `XXX5z.test`).
   - **Correction:** add "An object's `where` clause and a function's contract stop here by reading the guards (`:4107`, `:2971`), not run."
- Everything else holds. The guards are at `:2967`, `:2971` → `:2976` (`forFnDecl`), `:4107`, `:4109` → `:4115` (`forObjectDeclPrePass`) and `:5027`, `:5029` → `:5033` (`forTraitDecl`). `sayWhat` gives "Can't compile " (`:1557`). The disambiguator's `Option.<Contract>none()` and `Option.<List<Type>>none()` are at `TypeDisambiguator.java:112-113` and `:137-138`. Rows 774 and 781 and F-181 agree.

## Row 713: fail (fidelity, one point)

- **Passage:** "Walk refuses it at load, 'fails the Meet Rule'." It names no commit.
- **Source:** the skeptic of batch 18 rung W measured that message (`compile-ladder/rung-walk-trait-method-bounds/SKEPTIC.md:76`, `SkM1`; landed as `5262a2412`). After that, `14e91723f` changed walk's verdict for exactly this shape, a generic declaration beside a plain one. `OverloadedFunction.java:794` now returns VALID where `genericOverlapCovered(gen, plain, all) || domainsExcludeTogether(gen, plain)` holds, with `domainsExcludeTogether` at `:936`. No record measures row 713's pair after it. Both `rung-existential-reduction/` and `climb-batch-19/` were searched for "713" and "TwoBoundsClosedTrait", with no hit. The message may still hold, but the line states it as present without evidence.
- **Correction:** "Walk refused it at load at `5262a2412`, 'fails the Meet Rule' (`rung-walk-trait-method-bounds/SKEPTIC.md`, `SkM1`); not measured since `domainsExcludeTogether` (`OverloadedFunction.java:936`)." Or run `bin/fortress walk` on the pair, as a side question in the style of `questions.md`.
- Everything else holds. `normConjunct` is at `TypeAnalyzer.scala:762-774` and expands only against a conjunct with no variable. `changes.tex:4092-4097`, under "Passages not yet revised" (`:4062`), lists the question. The test's key is `compile_err_contains=Invalid overloading of f`.

## Row 723: pass

- `GenericMethod.finishInitializing` (`:138-153`) evaluates the parameters in `getEnv()` at `:149`, with the TODO at `:144-145`. `OverloadedFunction.java:161` lies inside `finishInitializingFirstPart` (`:147`). The `InterpreterBug` sentence is pinned to `317fc0ef5`. Row 760 is the dotted pair and names 723. Row 724 is the compiled face. `tests/XXXGenericFunctionalMethodBesidePlainWalk.fss` holds the object pair.

## Row 726: pass

- `OverloadSet.java:410-411` throws the quoted `CompilerBug`. `isDeclaredName` (`OverloadingChecker.scala:742-746`) admits an `SOp` only through `NodeUtil.validOp` (`NodeUtil.java:1466-1483`). That means the eight words plus capitals and `_` (`:1463-1465`). A doubled character such as `||` is refused (`:1475`). The abstract functional methods' loop filters by the same predicate (`:402`). `Library/FlatString.fsi:16-21` declares each `||` with `self` first. `FortressLibrary.fsi:2502-2503` pairs `(a:Any, self)` with `(self, b:Any)`, which is row 585's claim.

## Row 759: pass

- `changes.tex:2887-2893`, inside "Overloading with static parameters" (`:2715`), gives the same scope and names row 759. F-274 and `rung-existential-reduction/REPORT.md:88`, `:96` and `:98` back the walk refusal, the compiled `generic`, the `Object`-bound refusal and the row 412 mechanism. Row 412 is open.
- Note, not a failure: `a93fb3bfd` is the rung's branch commit and is not in HEAD's history. It landed as `14e91723f`. The commit exists and the measurement is pinned to it.
