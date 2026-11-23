# Climb batch 35: the judge's ruling on the merged-diff review

Decision: **repair**, of specification text and records only. One clause of an Appendix I effect is narrowed, and the FACTS entry and the gather's record line that restate it follow. No source, library, checker, interpreter or test file changes, so the gate does not run again: a repair reruns the gate only where it changes a path under `ProjectFortress/` or `Library/`, or `build.xml`, outside the test files, and `Specification/` and `explorations/` are not among those paths (`explorations/coordinator/climb-batch-workflow.js:1336-1337`, `gateReads`, applied by `repairRerun` at `:1452-1457`; the skill's `gate.md`, "When to run it"). The edit adds no example, so `ant testSpecData` (P-124) reads nothing it changes. It is not **land**: the settlement edits `Specification/appendices/changes.tex`, and the land rule admits only tests and records.

The review's routed finding (review-routed.1, the test owed where rungs S and O meet, `PLAN.md:943`) goes to the next batch as the review routed it; I give it no ruling. The review's own record fixes (`b0a5943e76`, `explorations/` only) are not contested and stand. I did not read the gate's output.

## The finding, upheld

`Specification/appendices/changes.tex:6423-6425`, in the effect of the entry "The features not yet supported, in the preface and the introduction" (`\seclabel{revival-supported}`, `:6367`), reads: "the compiled type checker refuses an \KWD{override} in a generic trait over a declaration that the trait inherits under a \KWD{where} clause (row~1107)." The gather wrote it in O's commit `d56eb8a882` (its message: "the gather's correction"; `climb-batch-35/RECORD.md:131`).

The code refuses less than that:

- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:384-385` extends the type analyzer with the trait's static parameters and `None`: a `where` clause of an `extends` entry is not held, so the clause's static parameter keeps its declared bound. Row 1107's note says the same: "The overloading check reads `A`'s `f` with `T` unbounded, the condition not held".
- `:410-411` reads what the trait provides, and which own declaration overrides which inherited one, on that analyzer (`STypesUtil.providedAndOverridden`). `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1715-1716` pairs an `override` with an inherited declaration whose parameter types are equivalent to, or below, its own.
- `OverloadingChecker.scala:424` (`checkOverridesSomething`, `:755-789`) refuses an `override` that is in no pair.

So an inherited declaration whose parameter types do not name the clause's static parameter is read exactly, and an `override` over it is accepted. The reviewer's probe shows it on the merged code (`e922c2ea1a`): with `override g(x: Number)` in `G` over `A`'s `g(x: ZZ32)`, `bin/fortress typecheck` and `bin/fortress compile` exit 0 and `bin/fortress run` prints `G`; with `override f(x: ZZ32)` over `A`'s `f(x: T)` added, the checker refuses: 'Invalid override of f in trait G: (G[\T\], ZZ32)->String ... has the modifier override and does not override any inherited declaration.', 'Invalid overloading of f in trait G'. The sentence names every override over a declaration inherited under a `where` clause, so it is false of the first program.

The rule broken: an effect names each departure with its ledger row, so that "the text claims no more than holds" (the skill's `specification.md`, "When the text and an implementation disagree"; P-95, "Every change to the specification is recorded with its reason."). Row 1107's own claim names only the inherited declaration whose parameter type is the clause's static parameter.

## Which claims were right

- The reviewer: right that the clause is broader than the code and than row 1107's claim, and right that the repair needs no gate.
- The reviewer's suggested wording, "... and whose parameter type is that clause's static parameter (row~1107)", may still claim more than the code at one point. By `STypesUtil.scala:1716`, an `override` whose parameter type lies above the static parameter's declared bound, as `override f(x: Any)` over `f(x: T)` with `T` bounded by `Any`, is paired as an override even with the clause not held, so the checker would accept it. I ran nothing (my role runs no program); step 1 below settles it with one typecheck, and step 2 picks the wording by its result.
- The gather: wrong in `climb-batch-35/RECORD.md:131`, "each clause checked against `CodeGen.checkOverrideCompilable` ... and `OverloadingChecker.scala:410-411`, `:424`. Each states what the code does": the row-1107 clause did not. The same over-reach is in F-400 ("the checker refuses an override under a conditional extension that walk runs (row 1107)"), which the review did not name; it follows the repair, since FACTS binds later work.
- Rung O: its own records are exact. `rung-override-compiled/REPORT.md:84`, `:88` and `:134` and row 1107 name the one form tested.

## The repair

1. On the merged tree, with a private caches folder as the reviewer used, write and type check this program (`bin/fortress typecheck`, not `compile`: the code generator refuses an override over a declaration that names a static parameter, row 1106):

       component OverrideAboveBoundProbe
       export Executable
       trait A[\T\]
         f(x: T): String = "A"
       end
       trait G[\T\] extends A[\T\] where { T extends ZZ32 }
         override f(x: Any): String = "G"
       end
       object O extends G[\ZZ32\] end
       run(): () = println(O.f(3))
       end

   Keep it under your tree's `tmp/`. Quote its exit status and its first lines in your record. Exit 0 is outcome (a); 'Invalid override of f in trait G' is outcome (b).

2. `Specification/appendices/changes.tex:6423-6425`: replace the three lines

       the compiled type checker refuses an \KWD{override} in a generic trait over
       a declaration that the trait inherits under a \KWD{where} clause
       (row~1107).

   On outcome (a), with:

       the compiled type checker reads a declaration that a generic trait inherits
       under a \KWD{where} clause without that clause's bound, so it refuses an
       \KWD{override} that overrides the declaration only by that bound, as one
       whose parameter type is the bound over one whose parameter type is the
       clause's static parameter (row~1107).

   On outcome (b), with the reviewer's wording:

       the compiled type checker refuses an \KWD{override} in a generic trait over
       a declaration that the trait inherits under a \KWD{where} clause and whose
       parameter type is that clause's static parameter (row~1107).

   Change nothing else of the entry. The preface's item (`Specification/fortress/preamble.tex:87-88`, "\KWD{override} in compiled code where a static parameter is involved") holds and stays.

3. F-400 (`explorations/coordinator/FACTS.md:296`): with `explorations/coordinator/tools/record.py set`, replace only the clause "the checker refuses an override under a conditional extension that walk runs (row 1107)" with, on outcome (a), "the checker refuses an override that overrides a declaration inherited under a conditional extension only by the clause's bound, which walk runs (row 1107)", or on outcome (b), "the checker refuses an override over a declaration inherited under a conditional extension whose parameter type is the clause's static parameter, which walk runs (row 1107)". Commit `FACTS.md` and `FACTS-history.md` together.

4. On outcome (a) only, row 1107 (`explorations/fortress-gap-ledger.md:572`): with `ledger.py rewrite 1107 FILE`, replace in its claim "over the inherited declaration whose parameter type is the clause's static parameter" with "over an inherited declaration that it overrides only by the clause's bound", keeping the example and every other cell. The row is at 1,179 of 1,200 characters; the new words are shorter. Add no note. On outcome (b), leave the row.

5. `explorations/compile-ladder/climb-batch-35/RECORD.md:131`: after "Each states what the code does, so neither is a text mismatch.", add one sentence: the row-1107 clause stated more than the code, and the review's repair narrowed it (this file; the repair's commit). Leave `PLAN.md:939`, whose "the checker's refusal under a conditional extension (row 1107)" names the refusal, not its reach.

6. Build the specification once, on the text after step 2, as the repair's brief and the skill's `specification.md`, "Building it", say, and only after the gate running in this tree has ended. Both commands must end in `BUILD SUCCESSFUL` and the warnings grep must print 0. Keep the PDF where the repair's brief says, then `git clean -fXq -- Specification`.

7. Run no gate, no suite and no stage: nothing that the gate reads changed. Commit the paths of steps 2 to 5 with the skill's footer, saying that the commit edits the original tree (`Specification/`).
