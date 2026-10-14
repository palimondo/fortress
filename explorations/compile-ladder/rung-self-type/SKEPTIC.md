# Rung S, climb batch 14: the skeptic's verdict

Verdict: **approved**, with one fix of the change and four corrections, none contested.

- Head judged: `20193383e`, the worker's last commit. The worker's REPORT.md and record.md were written onto the branch from the run's journal (`journal-text.py`, both writes exit 0) and committed alone at `dfbe11194`.
- My commits: `9a2cc93af`, `207eb7f06`, `63e507ba4` (corrections), `37f02419d` (the fix, "Skeptic's fix:"), `302aee6d6` (correction), then this file.
- The report's count and distance tables are those of the worker's head (`7612a9477`'s code). I ran no stage after my fix: the gate's tables on the merged tree are the record. By reading, my fix changes nothing the stages read (below, F1).

## 1. What I checked, and what it rests on

1. **The tables, against the worker's files.** `tmp/rung-self-type/distance-postedit.txt` holds "#total 55", "#seconds 1552 FortressLibrary 847"; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-13b/gate/distance.txt tmp/rung-self-type/distance-postedit.txt` prints "DISTANCE DOWN 85 -> 55 (-30)", "class S1 29 -> 0 (-29)", "class R4 1 -> 0 (-1)", "class BR 4 -> 3 (-1)", "class OT 16 -> 17 (+1)". `tmp/rung-self-type/checker-count-postedit.txt` holds "#total 1", and its diff against `climb-batch-13b/gate/checker-count.txt` is empty. My own comparison of the run's `errors.tsv` with `explorations/compile-ladder/gate/distance-sites.tsv`, matched by location and message (a short Python script over the two files), lists 31 rows gone and 1 come. Gone: the 29 (per-site rows 16, 17, 20-27, 31, 34, 36-39, 54-60, 70-75), row 76 (`FortressLibrary.fss:130`, BR, row 488's site) and row 78 (`:688`). Come: `:688` only, as "Right-hand side has type (Integral[\I\] & {I}), but declared type is ZZ.". This agrees with the report's section 4.
2. **Test first, in the worker's transcript** (`agent-a07c4afccdaa490de.jsonl`). It wrote the nine tests at 00:59:37-01:00:00. Its harness run on the base's code, call `fHPJnY`, ran 01:00:07-01:00:13Z and ended "Tests run: 9,  Failures: 9,  Errors: 0", with the lines recordedFailure quotes. After that run it applied the judgement's patch (`git apply`, call `nrHLq1`, 01:00:30). It then wrote the code: `UF6nxz` at 01:03:38 and `socpeZ` at 01:04:34 (python writes), and `MHfPj1` at 01:03:53 (`sed -i` on `Disambiguator.java`). The first build, `3vw2iL`, started at 01:04:49 and printed "BUILD SUCCESSFUL". The tests passed at 01:07:43 (`vWcyBc`, "OK (9 tests)"). The last run after its last change of code is `ant testQuick` at 01:42:45 (`SdAW9d`): `TEST-RESULTS/fast-compiler` "Tests run: 1127, Failures: 0, Errors: 0, Skipped: 0", "BUILD SUCCESSFUL". The first `XXX` test was shown red on a deliberate fix at 01:08:01 (`awRih4`: "Saw wrong failure. compile"). The order holds.
3. **The diff against the section, the specification and the decisions.**
   - `FunctionalMethod.java` is the judgement's patch byte for byte: the diff's index line `1efa6cd45..ae6dad884` is the patch's (`explorations/reviews/self-typed-bodies-judgement.md`, "The patch").
   - `SelfParamDisambiguator.scala` holds the patch's rule (a), the coordinator's widened reading (`explorations/coordinator/CLIMB-BATCH-14.md:86`, `:118`) and an own-name test that also accepts an api-qualified name. That test is harmless, since both names must print alike.
   - `TypeHierarchyChecker.scala` holds rule (b) as two functions of their own. `checkDeclComprises` and `checkObjectExprComprises` are untouched.
   - The specification passages are where the section puts them.
   - Two places in the text said less than the checker does (F2). One place in the code read a raw trait of another api in the wrong scope (F1).
4. **Where the fix belongs, and the precedents.** The team's own self type under a `comprises` clause is in the disambiguator, and rule (a) reuses it. `checkObjectExprComprises` is the precedent for the object-expression walk. Name resolution follows `TypeDisambiguator.handleTypeName`. No device was invented where the tree has one.
5. **The tests.** Each test file has one comment line and is named by its topic, with no citation in a message. Each one exercises its rule: the base's run shows the sites' own message, "Function body has type Shape[\S\], but declared return type is S.".
6. **My own programs**, under `tmp/rung-self-type/skeptic/` (section 3).
7. **The three homes** (section 4).
8. **The ledger and sibling sites.**
   - `ledger-find` with my own words ("self type", "self-typed", "F-bound*", "Containment*", "extends Equality", "object expression*", the two class names) finds rows 695, 407, 488, 355, 375, 414 and 570. Row 414 (the declaration rule at a static parameter) and row 570 (object expressions in the overloading check) are not moved.
   - For siblings, my scan of every `.fss` and `.fsi` in the tree (`tmp/rung-self-type/skeptic/extenders.py`) lists every declaration that extends one of the 16 self-typed traits of `Library/` at a type other than its own name. Only the trips demo's `generator` extends one at another type (`ProjectFortress/demos/trips.fss:96`). The rest extend at a type parameter: the library's chains, PureList's `List[\E\]` (`Library/PureList.fsi:41`), the two `Containment` mixins, and the team's test copies, `Compiled17ee`, `other_compiler_tests/Gen0.fss` and `not_working_library_tests/MatchErrorBug.fss`. Each of those is bounded by its own trait except `List` and the two mixins.
   - The compiler's prelude declares no F-bound without a clause: `Library/CompilerAlgebra.fsi:16`, `:24` use `comprises T`. So rule (a) changes no prelude body that the code generator compiles.
   - On the other path there is nothing to change: walk reads a self type by its named trait alone (`interpreter/evaluator/EvalType.java:51-53`, `:535-537`).
9. **The report.**
   - I opened each provenance line with `sed -n`. Each says what its line holds: `climb-batch-13b/gate/distance.txt:16-17` holds the S1 and R4 classes, `var-ref.tex:53-54` the self sentence, `SelfParamDisambiguator.scala:68-69` at the base the clause case, `TypeHierarchyChecker.scala:66-100` at the base `checkObjectExprComprises`, `traits.tex:285-286` the new term, and `changes.tex:3296` the entry.
   - The worker's whole-suite runs are on `7612a9477`'s code, with the verdicts the report quotes.
   - The worker lists every point to report that the rung reaches.
   - record.md is true as written, but for row 695's bound and the clause wording that I corrected (F3).
10. **Competing declarations.** None of the rung's 9 test components and none of my 4 new test components or 4 apis has a name that occurs elsewhere in the test corpora. The same holds for the new Scala and Java names: `selfParamPosition`, `checkDeclSelfParams`, `checkObjectExprSelfParams`, `selfParamArg`, `selfIndexOf`, `throughBound`, `resolveTrait`, `homeOf` and `selfFromBound` each occur only in the files that declare and call them. The sibling branches' new test files have other names (`git diff --name-only` of `origin/wip/rung-argument-context` and `origin/wip/rung-popl-examples`).
11. **The failure-mode question.** The rung turns a loud refusal into acceptance and a value. Under rule (a), a body that returns `self` as the self-type parameter now compiles. At run time it answers the receiver when the parameter is a trait type (`SkSelfSuperType`, "cat"). It dies loudly with `VerifyError: Bad return type` when the parameter is an object type (row 695). Both match the specification: the value is the receiver. `resolveTrait` and `sameType` swallow an exception into "no widened self-type parameter", and the body's refusal stays loud.

## 2. Findings, and what I did with each

### F1, a defect of the change, fixed (`37f02419d`, settled)

The widened reading read a not-yet-disambiguated trait's header in the importing unit's names, so its verdict depended on the order in which apis are analysed.

- **Where.** `SelfParamDisambiguator.selfIndexOf` reads the self position of a bound's trait that is still raw from its header, and its recursion resolved that header's names with the environment of the unit being disambiguated. Apis are disambiguated together (`Disambiguator.disambiguateApis`), so a trait of another api of the same batch is raw, and its names need not be in scope in the importer.
- **Probe.** Three apis: `SkChA` declares `Shape`, `SkChB` declares `Mix[\T extends Shape[\T\]\] extends Shape[\T\]` and imports `Shape`, and `SkChC` declares `Mix2[\T extends Mix[\T\]\] extends Mix[\T\]` and imports `Mix` only. A component `SkChUse` imports `SkChC`. The command, on the worker's code with a fresh caches copy, was `FORTRESS_CACHES=<copy> bin/fortress typecheck SkChUse.fss`:

      SkChC.fsi:3:42-49:
          SkChC.Mix2[\T\] extends SkChB.Mix[\T\], whose self parameter is T, but SkChC.Mix2[\T\] is not a subtype of T.
      File SkChUse.fss has 1 error.

  With `SkChB` analysed first (a component importing it typechecked into the same caches beforehand), the same command printed nothing.
- **Test.** `compiler_tests/SelfTypeMixinChain.test` (typecheck) runs over `SelfTypeChainShape.fsi`, `SelfTypeChainMix.fsi` and `SelfTypeChainMixOfMix.fsi`. On the worker's code, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh workerhead ProjectFortress/compiler_tests SelfTypeMixinChain.test` (03:32:16Z, tree `63e507ba4`, before my edit):

      . typecheck ProjectFortress/compiler_tests/SelfTypeMixinChain ProjectFortress/compiler_tests/SelfTypeChainMixOfMix.fsi:5:46-53:
          SelfTypeChainMixOfMix.MixOfMix[\T\] extends SelfTypeChainMix.Mix[\T\], whose self parameter is T, but SelfTypeChainMixOfMix.MixOfMix[\T\] is not a subtype of T.
      Tests run: 1,  Failures: 1,  Errors: 0

  After the fix, built (`ant compileAll` "BUILD SUCCESSFUL", then the library order, five jars), `junit.sh fix` over it and the rung's twelve self-type tests in one JVM gave "OK (13 tests)". The probe gave no error for `SkChUse`, and for `SkChUseBad` only "Bad extends SkChC.Mix2[\P\], whose self parameter is P, but Bad is not a subtype of P.".
- **The ways, listed before the fix.**
  - (a) Resolve a raw trait's header in its own api's environment, a `TopLevelEnv` over the global environment's index of that api, as `Disambiguator` builds when it disambiguates that api. Chosen: it is the scope the header's names have, and it is about 15 lines.
  - (b) Disambiguate apis in the order of their imports, so that no raw trait of another api is ever read. Not chosen: it changes the loop of a phase walk shares, for every api.
  - (c) Read no raw trait of another api. Not chosen: it keeps the false refusal.
  - (d) Run the pass over all apis of a batch first and rebuild the indexes. Not chosen: larger.
- **Settled by** the section's own sentence, `explorations/coordinator/CLIMB-BATCH-14.md:118`: "resolve the bound's name as TypeDisambiguator does (explicitTypeConsNames, onDemandTypeConsNames, typeConsIndex), and read that trait's self position from its header, itself perhaps widened". TypeDisambiguator resolves a unit's names in that unit's environment. The worker's decision 2 argues for reading the raw header, which the fix keeps; it does not argue for the scope.
- **The library is not moved.** By reading, the fix changes no verdict on the library: its only mixins, `ContainmentBySubset` and `ContainmentByComparison`, are bounded by `Containment` in their own api (`Library/Containment.fsi:13`, `:21`, `:28`), where the current environment is the api's own, and no component the stages read has the mixin's shape.

### F2, a correction of the specification, made (`9a2cc93af`, settled)

The text said less than the checker does, in two places.

- **Rule (a).** The checker gives a trait whose clause is `comprises { ... }` a self-type parameter (`SelfParamDisambiguator`'s trait case; the worker's decision 3). The text said "no comprises clause" only.
- **Rule (b).** The checker compares a trait's self type: its type intersected with the types its `comprises` clause lists, or with its own self-type parameter (`checkDeclSelfParams` reads `typeOfSelf`; the worker's decision 5). The text put the requirement on the trait's own type when the trait has a clause. My program `SkSelfComprisesOther` (`trait Foo extends Shape[\O1\] comprises { O1 }`, `object O1 extends Foo`) compiles on the new code with no error, though the text refused it.
- **The edits.** `var-ref.tex:70`, `traits.tex:285-286` and `:298-300`, the Appendix I entry's Change item (`changes.tex:3302-3316`) and the decision record now state the checker's rule, with each file's line count kept.
- **Settled by** P-95, "No discrepancy between the specification and the implementation stays open to confuse a reader" (`explorations/coordinator/POSITIONS.md:95`), and by P-146's "Scala's conformance rule" (`:61`), a rule on self types. The specification builds: "Output written on fortress.pdf (673 pages", and `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0.

### F3, row 695 bounded, a correction (`207eb7f06`, `302aee6d6`)

The compiled body that returns `self` dies only when the self-type parameter is an object type.

- **Evidence.** My `SkSelfSuperType` declares `trait Animal extends Shape[\Animal\]` and `object Cat extends { Animal, Shape[\Animal\] }`, and runs `twin(Cat)`. On the new code it compiles, and `bin/fortress run SkSelfSuperType` prints "cat", "PASS". `SkSelfTwoLevel`, with the parameter at the object `Q`, dies with "java.lang.VerifyError: Bad return type".
- **The edits.** The Appendix I Effect item (`changes.tex:3375-3379`), record.md's FACTS entry and its Revival change, and row 695's note now say so.
- **Also in record.md.** The rule (b) line now says that a trait stands as its self type, and the test lists name the api tests.

### F4, the library's own shape as tests, a correction (`63e507ba4`)

The team's mixins are declared in an api, and the rung's tests read a mixin within one component only. I added three tests:

- `SelfTypeMixinApi`: a typecheck of an api's mixin bodies, over `SelfTypeMixinApi.fsi` and `.fss`.
- `SelfTypeMixinImported`: a typecheck of an imported mixin, with a mixin of it declared in the importer.
- `XXXSelfTypeMixinImportedWrong`: a compile test of rule (b) against an imported mixin.

On the base's code, `old-fortress.sh /home/user/fortress-base14 tmp/rung-self-type/skeptic/old-caches-junit junit <the three>` gave "Tests run: 3,  Failures: 3,  Errors: 0". Its lines include "Function body has type SelfTypeMixinApi.Sub[\T\], but declared return type is T." and "Saw wrong failure. compile". On the head, `junit.sh skeptic` gave "OK (3 tests)", and with the rung's nine in one JVM "OK (12 tests)".

### Not a finding of this rung

- On both paths' old and new code, `"<" x.tag ">"` prints `<a>` under walk and `< a >` compiled. That is row 76.
- An abstract getter in an api and its component gives "Unmatched declarations ... Asbtract method tag" on the old and the new code alike (`SkGet`, `SkGetPlain`). It is not the rung's.

## 3. My programs: old against new, on both paths

Each was compiled with the new code (`FORTRESS_CACHES=<copy of the worktree's caches> bin/fortress compile P.fss`) and with the old code (`old-fortress.sh /home/user/fortress-base14 tmp/rung-self-type/skeptic/old-caches compile P.fss`), and run under walk with each.

| program | compiled, new | compiled, old | walk, new and old |
|---|---|---|---|
| `SkSelfLocal` (`self` bound to locals, a dotted body, a body returning the trait type) | compiles; run prints `< a >`, `b`, `c`, `PASS` | the same | `<a> b c PASS`, identical |
| `SkSelfTwoLevel` (a mixin of a mixin in one component) | compiles; run dies, `VerifyError: Bad return type` (row 695) | "Function body has type Sub[\T\], but declared return type is T." and the same for `Sub2` | `qq PASS`, identical |
| `SkSelfTwoLevelBad` | "Bad extends Sub2[\Q\], whose self parameter is Q, but Bad is not a subtype of Q." | accepted | `PASS`, identical |
| `SkSelfGenericOther` (`trait G[\T\] extends Shape[\G[\ZZ32\]\]`) | "G[\T\] extends Shape[\G[\ZZ32\]\], whose self parameter is G[\ZZ32\], but G[\T\] is not a subtype of G[\ZZ32\]." | accepted | `PASS`, identical |
| `SkSelfSuperType` (the parameter at a trait type; a generic object at its own instantiation) | compiles; run prints `cat`, `PASS` | "Function body has type Shape[\S\], but declared return type is S." | `cat PASS`, identical |
| `SkSelfComprisesOther` | accepted | accepted | `PASS`, identical |
| `SkSelfMixinComprises` (a mixin with a `comprises` clause) | rule (b)'s "Foo[\T\] extends Shape[\T\], whose self parameter is T, but Foo[\T\] is not a subtype of T." beside the clause's error | the clause's error only | — |
| `SkSelfObjExprInTrait` (an object expression at `Shape[\S\]` in the trait's own body) | "An object expression extends Shape[\S\], whose self parameter is S, but the object expression is not a subtype of S." | `CompilerError: Can't compile ObjectExpr` (row 375) | `PASS`, identical |
| `xunit/SkMixUse` (a mixin across an api, and a mixin of it) | accepted | "Function body has type Sub2[\T\], but declared return type is T." | `PASS`, identical |
| `xunit/SkMixUseBad` | "Bad extends SkMixApi.Sub[\Q\], whose self parameter is Q, but Bad is not a subtype of Q." | accepted | `PASS`, identical |
| `chain/SkChUse` (three apis) | worker's code: refused (F1); after the fix: accepted | — | — |

No program touches mutable state, a field write, an `atomic` block or a library's state, so no thread count applies.

## 4. The defects and their homes

- **The 29 bodies, and the unsound extenders.** Home 1, as the report says.
- **Row 695.** Home 2: the worker's `SelfTypeReturnSelfRunLink.test` and `XXXSelfTypeReturnSelfRun.test`. F3 bounds the note.
- **The trips demo's `generator`.** Home 3: a ledger row only (row 710), since no gated test reads the demo under the checker and walk cannot observe it. The demo's `CMP` is at `generator` (`ProjectFortress/demos/trips.fss:100`), so the slip is the extends clause's.
- **PureList's `List[\E\]`.** A note on row 355, as the report says.
- **F1, the order-dependent false refusal.** Home 1: fixed, with `SelfTypeMixinChain`.

## 5. Where I differ from the worker's account

- **Decision 2** reads a raw trait's header "through the TopLevelEnv". It resolved that header in the importer's environment. F1 resolves it in the declaring api's environment.
- **Section 8**, "Sentences of the specification made false: None found". The text the rung wrote was narrower than its checker in two places (F2), now corrected. No sentence outside the rung's passages is made false: I checked `overloading.tex:180-182`, `traits.tex:598`, `objects.tex` and `expressions/object.tex`, and the preamble's paragraph on the revision.
- **The compiler track's count.** It grows by my four `.test` files, `SelfTypeMixinApi`, `SelfTypeMixinImported`, `XXXSelfTypeMixinImportedWrong` and `SelfTypeMixinChain`. So the gate should see 13b's 1118, plus the rung's 9, plus these 4, which is 1131.

## 6. The suites my fix needed

`SelfParamDisambiguator` runs in the disambiguation phase that walk shares, so I ran both suites once, after my last change of code, on `302aee6d6`'s code:

- `ant testQuick`, started 03:36:27Z: "BUILD SUCCESSFUL", "Total time: 8 minutes 49 seconds".
  - `TEST-RESULTS/fast-compiler`: "Tests run: 1131, Failures: 0, Errors: 0, Skipped: 0". That is the worker's 1127 plus my four.
  - `fast-library`: "Tests run: 86, Failures: 0, Errors: 0".
  - `fast-othercompiler`: "Tests run: 263, Failures: 0, Errors: 0".
- `ant testSystem`, started 03:45:22Z: "BUILD SUCCESSFUL", "Total time: 3 minutes 6 seconds". The four shards ran "Tests run: 146", "149", "141" and "144", each with "Failures: 0, Errors: 0", the worker's counts. No walk verdict moved.

## 7. Points to report

The worker lists five, all reversible. My fix reaches the same two again:

- **The patch changed from the judgement's.** The pass now also takes the global environment (`ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:145`, `:300`; `SelfParamDisambiguator.scala:178-189`).
- **A phase walk shares, edited.** The verdict is in section 6.

Nothing holds the push.
