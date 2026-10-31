# Quiz grading, reader 2 (cases 24, 25)

Answers: `explorations/compile-ladder/climb-batch-24/orientation/quiz-answers-2.md`. Key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 24 and 25 (added on `main` at `453898c32`). Orientation read by the reader: `explorations/compile-ladder/climb-batch-24/orientation/orientation.md`, as revised by writer 2 (its `:67` on row 867 and `:71` on `reflect` and row 307).

## Counts

- Right: 2 (24, 25)
- Right without its path or scope qualification: 0
- Wrong: 0
- Failures counted against the orientation: 0

## Case 24: a declaration's own `where` clause on the compiled path. Right.

- (a) Matches the key. The code generator compiles the declaration and emits nothing for the clause, the checker infers `U = Cat` and checks `Cat extends Named` at the call, and the test is a plain compiled test that passes today. No `XXX` compile test keyed on a refusal, and no wait for the switch-over. The `.test` file (`link`, `run`, `run_out_WIcontains=PASS`, no `compile` line) differs from the key's form but is valid by `tests-writing.md` ("link compiles, then links"; `WIcontains` is a listed check, and the section's own example is this form). The key grades the decision, not the wording.
- (b) Matches the key. The checker accepts the program, it links, and the call dies at run time with `NoClassDefFoundError` (row 867). It is recorded under item 2 of "How a defect is recorded" as the `XXX` run-time pair: `XXXWhereNatVariableCall.fss` prints `REACHED` in `run()` before the call; `WhereNatVariableCallLink.test` has `tests=XXXWhereNatVariableCall` and `link`; `XXXWhereNatVariableCall.test` has `tests=XXXWhereNatVariableCall` and `run`, no `link`, and `run_out_contains=REACHED`, with `run_out_does_not_contain=REACHED` as the fallback if the direct run shows no `REACHED`, and never a `PASS` key. The files run in one `junit.sh` call with the link file listed first. Expected: the link green and the run an expected failure, and the `XXX` file red for one run with the failing `assert` removed. Promotion on a fix of row 867, in the three-file form. None of the key's Partial defects is present. The program matches the tree's own pair, `compiler_tests/XXXWhereVariableCallCompiled` with `WhereVariableCallCompiledLink.test`.
- Look-ups: `facts-extract.sh 'ledger:867'`, with what the reader does for a closed row and for an open row with an existing pair, and `git ls-files 'ProjectFortress/*XXX*'`. Each says where and what follows, as the key's "How to use it" asks.
- Scope: compiled path; the switch-over ends neither test (row 867 is the code generator's, and (a) needs only `String`). This is the key's "the switch-over changes neither".
- Passages: the orientation's sentences after "Three `where` forms are built (P-151)" (`orientation.md:67`) and `compiler.md`, "What the compiled path cannot compile yet", gave the rule, accurately. Nothing misled.
- Not against the reader or the orientation: like reader 1, the reader saw that `label` is the keyword of `label`/`exit` and renamed the function `nameOf`, with a parse to settle it. The note for the quiz's author in `quiz-grade-1.md` stands: `questions.md:65` and `key.md:287` still use `label`.

## Case 25: opening a value to a size known only at run time, compiled. Right.

- (a) Matches the key. The checker accepts the program (a fresh size at the call), the link succeeds, and the run fails the JVM's verification with a `VerifyError` (row 307), on the program's own trait. It is recorded under item 2 as the `XXX` run-time pair: `LenRuntimeSizeLink.test` (`tests=XXXLenRuntimeSize`, `link`) and `XXXLenRuntimeSize.test` (`run`, no `link`). The opening stands in `run()`, and the reader keys the file `run_out_does_not_contain=REACHED` because the component's class fails verification as it loads, switching to `run_out_contains=REACHED` if the direct run prints it. This is the key's Scope (a), which allows either. The red run replaces `size(mk())` with `size(L[\3\])`, conditioned on this being the change's first `XXX` test, which is the rule in `tests-writing.md`, "Writing an `XXX` test" (the reader's case 24 (b) is that first one). The test does not change at the switch-over, stays `XXX` until row 307 is fixed, and is then promoted. None of the key's Wrong answers is present.
- The reader's side check on whether the checker takes `= n` at return type `ZZ32` is settled by the tree: `compiler_tests/NatOpenChecker.fss:13` declares the same `size` and its `.test` is a plain `typecheck`. The check is harmless and does not change the decision.
- (b) Matches the key. Two walls, and only the first ends at the switch-over: (1) until the switch-over compiled programs do not link `NatReflect`, and the prelude has no array types (and no `Index`), so `FlatArrays2` does not compile; (2) after it, `reflect(nr)` and `reflect(nc)` give `NatParam` values passed where `N[\r\]` and `N[\c\]` are expected, and the compiled call fails verification (row 307), the orientation's "second wall". The reader says outright that row 307 stays after the switch-over. The further walls (rows 867, 812, the code generator's construct walls, the ladder phase file) are offered as things to check with their sources, which the key allows. Row 701's refusal of `NatParam`'s `where` clause is not listed, so neither the Wrong nor the Partial answer applies. The unboxed `double[]` is marked as speed, not a wall. The reader does not say that `reflect`'s own compiled run is unmeasured (key, Open); not required.
- Scope: compiled path; item 1 ends at the switch-over, item 2 remains after it; under walk the APL quick check passes today (`interpreter.md`). Complete.
- Passages: the orientation's paragraph "A size known only at run time comes from `reflect` in `NatReflect.fsi`" (`orientation.md:71`), the reader's only source for row 307 (key, Skill), and its opening rule on "Until the switch-over" sentences (`:7`). The reader followed both correctly and did not take case 24's correction ("the code generator compiles a declaration's own `where` clause") to mean that such a trait runs. Nothing misled.

## Failed cases

None.
