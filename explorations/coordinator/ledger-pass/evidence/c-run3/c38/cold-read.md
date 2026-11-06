# Cold read: c-run3/c38

Read with `CLAUDE.md`, `fortress-repo/SKILL.md` and its references (not `revival-changes.md`, `sources.md`). Terms common to several rows:

- `NEGATIVE-VERIFIED` and `CONTESTED` are listed in `records.md` but defined only in the ledger's row template, which a cold reader may not read. I read `NEGATIVE-VERIFIED` as "the gap is confirmed and open" and `CONTESTED` as "open, but whether it is a gap is a question" (closed with `--settled`). Unclear wording (the skill points to a definition the reader lacks).
- "in the parent of `HASH`": I read it as "the probe was deleted by `HASH`; print it with `git show HASH^:PATH`" (the form `library.md` uses). Not defined in the skill; inferable.
- "full text: history, row N" / "probes and full text: history, row N": the earlier text in `explorations/fortress-gap-ledger-history.md` (`records.md`). Clear.
- "siblings: N": related rows. Not defined; inferable.
- "Found by": provenance only (`ours`, `run-b`, `run-c3`, a batch's skeptic); nothing a worker acts on.

## Row 5

- **Defect:** The Unicode summation sign U+2211 `∑` is not accepted as a big operator (accumulator). The grammar's `Accumulator` matches only the ASCII keyword `SUM`, so `∑ ...` is parsed as an application of a prefix operator, which is undefined, and the program is refused.
- **Where:** The parser, so both paths: `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:252`, `:260-261`.
- **Reproduce:** Write a reduction with `∑` in place of `SUM`; expect `Operator prefix SUM is not defined.` Probe: `git show e879b6a44^:explorations/sum-probes/p13_unicode_sigma.fss`. No gated test.
- **Status:** Open, confirmed. A worker may build a fix (add the `∑` alternative to the grammar); until then write `SUM`.
- **Could not resolve:**
  - The message says "prefix SUM", yet the claim says `∑` is not read as `SUM`. Does the lexer map `∑` to the name `SUM` but as an operator, not the keyword? Unclear wording.
  - The specification's grammar writes `Σ`; the row does not say whether that is U+2211 or Greek U+03A3, so which character the specification requires is open. Unclear wording.
  - "Fortify renders ASCII `SUM` as `Σ`, so the *rendered* form is unaffected": Fortify is not in the skill (I take it to be the tool that typesets Fortress source). Language/tool concept missing.

## Row 81

- **Defect:** The code generator cannot compile `label` / `exit`; compiling one throws `Can't compile Label`.
- **Where:** Compiled path only: `CodeGen.java` has no `forLabel`/`forExit`; the node falls to `defaultCase` → `sayWhat` (`CodeGen.java:1674-1676`, `:1558-1561`). Agrees with `compiler.md`, "What the compiled path cannot compile yet".
- **Reproduce:** Compile a program with `label L ... exit L with i end` round a `seq` loop; expect `Can't compile Label` at compile time. Probe: `git show c69cb2064^:explorations/compiler-probes/p31.fss`. No gated test.
- **Status:** Open, confirmed; a fix (codegen cases for `Label`/`Exit`) can be built. Workaround: a `while` loop over a mutable flag.
- **Could not resolve:** Nothing beyond the common terms.

## Row 92

- **Defect:** The checker refuses a local variable (or loop variable, or parameter) whose name is also a top-level function or variable in scope: `Variable step is already declared.` The same applies to a parameter in an api file whose name is a top-level function of that api.
- **Where:** The name-binding phase (shared by both paths): `checkForShadowingVar`, `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:745-762`. Specification: `declarations.tex:476-533` forbids all shadowing but a field or dotted method.
- **Reproduce:** A function `step` and a local `step` in another function; or an api with `rows(n: ZZ32): ZZ32` and `area(rows: ZZ32, cols: ZZ32): ZZ32` → `Variable rows is already declared.` at line 3, columns 6-8. Probes: `git show e879b6a44^:explorations/gap-ledger-probes/g21.fss`, `git show a0a0c7c99^:explorations/run-c3/probes/g164_api_param_name/UseG164.fss`. No gated test.
- **Status:** A "design limit": the tree does what the specification says, so I read this as leave it and rename. But `NEGATIVE-VERIFIED` on a design limit could also mean a gap to fix; the row does not say which.
- **Could not resolve:**
  - What `NEGATIVE-VERIFIED` asks of a worker on a `design limit` row: fix, or accept. Unclear wording (template not readable).
  - "Met for the loop variable `step`, and `model` and `rows`": met in which program (microGPT?). Unclear wording.
  - Does a parameter in an api count as "local" under the specification's rule, or is the api case beyond `declarations.tex`? Unclear wording.

## Row 147

- **Defect:** Two more cases of row 92's rule. Inside an object that extends `Matrix`, a method parameter named `t` is refused because the inherited transpose method `t()` is a bare name in the object body. A local `big` in a top-level function is refused because `big` is a functional method of `ZZ32` and `ZZ64`.
- **Where:** The checker, `ExprDisambiguator.scala:745-762`; the names come from `Library/FortressLibrary.fsi:1767` (`t`), `:590`, `:648` (`big(self): ZZ`).
- **Reproduce:** `git show 4ebf80aec^:explorations/run-c/probes/g147_param_t.fss` (one error per method with a parameter `t`); `git show e879b6a44^:explorations/gap-ledger-probes/g29.fss` (a local `big: ZZ32 = 10 x`). Expect `Variable t is already declared.` No gated test.
- **Status:** Design limit as row 92: rename (`ij`, `bigv`) after a grep of the api for the name.
- **Could not resolve:**
  - "functional method": a method with `self` in a parameter position, callable as a top-level function. Not in the skill; I know it only roughly. Language concept missing.
  - `10 x`: juxtaposition (multiplication of `10` by a variable `x`?), but no `x` is named. Unclear wording.
  - "a grep of the api": which api, `FortressLibrary.fsi` or every api the component imports? Unclear wording.
  - Whether a functional method name in scope should count as "a variable or function in scope" under the specification, or the check is too wide here (the class says design limit). Unclear wording.

## Row 167

- **Defect:** A third case of row 92's rule: a `nat` static parameter of a generic function may not share its name with a top-level value of the same component. With a top-level `q`, `f[\nat r, nat c, nat p, nat q\](...)` is refused, `Variable q is already declared.`, at the static parameter.
- **Where:** The checker, `ExprDisambiguator.scala:761` (row 92's check).
- **Reproduce:** `git show a0a0c7c99^:explorations/run-c3/probes/att_g_staticname.fss`: top-level `q` on line 5, `assignInto[\nat r, nat c, nat p, nat q\](...)` on line 6; expect the message at 6:38 (line 6, column 38). No gated test.
- **Status:** Design limit: rename the static parameter.
- **Could not resolve:**
  - "Met twice more by functions named `rows` and `block` against parameters of the same name": the claim is about top-level values, so does a top-level function also collide, and are these static parameters or ordinary ones? Unclear wording.

## Row 322

- **Defect:** On the compiled path, an `atomic` block that is the trailing expression of an arm of `do ... also ... end` yields a class that the JVM rejects: `VerifyError: Inconsistent stackmap frames at branch target 5`. Cause: the arm's task keeps `this` on the operand stack across the body, while the `atomic` retry handler, which empties the stack, jumps back to the block's start. `atomic` is safe only on an empty stack, so it also fails as a call argument after the first. A `try ... catch` in an arm fails the same way through `forTry`. Walk runs it correctly.
- **Where:** Compiled path: `CodeGen.generateTaskCompute` (`CodeGen.java:5028-5036`), `CodeGen.forAtomicBlock` (`:1736-1764`).
- **Reproduce:** A `do ... also` whose arm ends in `atomic ...`; load or run it compiled; expect the `VerifyError`. The `try` variant has the test `XXXTryInArmRungG`. Probes in the history. Reproducer cell: none.
- **Status:** Open, confirmed; a codegen fix can be built. Workaround: move the `atomic` into a function the arm calls (as `compiler_tests/AtomicTopLevelVar.fss`).
- **Could not resolve:**
  - `compiler.md` lists "`atomic` used as an expression" as a codegen wall (no case), yet this row has it compile to a bad class. Is the trailing `atomic` here a block, not an "expression"? Unclear wording.
  - "with row 497": row 497 is not here, and the relation (duplicate, cause, same test?) is not said. Unclear wording.
  - Folder of `XXXTryInArmRungG` not named (`compiler_tests/`, I suppose). Unclear wording.
  - "branch target 5", "`startOver`": JVM detail; clear enough.

## Row 324

- **Defect:** On the compiled path, a Fortress exception thrown out of an `atomic` block does not undo the block's writes: after `atomic do g := 7; throw Boom end`, caught, `g` reads 7 compiled, 100 (the old value) under walk. The same holds for a local and an object field, at 1 and 4 threads. `forAtomicBlock` catches only `TransactionAbortException`, so the transaction is not cleaned up and a later read (also from a child task, which takes its parent's transaction) sees the write.
- **Where:** Compiled path: `CodeGen.java:1742-1745`; `runtimeSystem/Transaction.java:144-149,159-168` (`TXRead`); `runtimeSystem/BaseTask.java:83-86`. Specification `atomic.tex`.
- **Reproduce:** The program in the claim, compiled, with `FORTRESS_THREADS=1` and `4`; print `g` after the catch. Probes in the history. No gated test.
- **Status:** Open, confirmed; a codegen fix (handle `FException` with cleanup, then rethrow) can be built. Workaround: throw after the block.
- **Could not resolve:**
  - "Derived from code, not measured" contradicts the claim's measured values (7 compiled, 100 walk, one thread and four). Which is it? Unclear wording.
  - "An `exit` to an enclosing `label` keeps the writes": a rule of the specification for contrast, or a second behaviour of the tree? `label`/`exit` does not compile at all (row 81). Unclear wording.
  - "ancestral write": a write recorded by an ancestor task's transaction. Inferable; concept not in the skill.
  - Where `g` starts at 100 is implicit. Unclear wording, minor.

## Row 526

- **Defect:** On the compiled path, a `try` expression used as an operand or argument after another value, as `"a" || (try f() catch e InvalidRange => "c" end)`, compiles but the class fails JVM verification at load ('Inconsistent stackmap frames'). The `catch` handler is inline and the JVM empties the operand stack at a handler, so the `catch` path reaches the join with one value fewer than the normal path. It fails also when nothing is thrown; as the first operand it works. Walk prints `ac`.
- **Where:** Compiled path: `CodeGen.forTry`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2022`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXTryOperandRungE.test` with its link test `TryOperandRungELink.test`, run in one call of `junit.sh` (link first), per `tests-writing.md`.
- **Status:** Open, confirmed; a fix can be built and the `XXX` test promoted. Workaround: bind the `try` to a local first.
- **Could not resolve:** "By reading, consistent with the verifier": the cause is reasoned, not traced; clear enough. Nothing else.

## Row 876

- **Defect:** On the compiled path, `drandom` and `drandomZZ32` (`DeterministicRandom`) are not deterministic above one thread: a binary tree of tasks drawing at every node sums to a different value in each run at `FORTRESS_THREADS=4`. A draw advances the current task's pedigree; a compiled `compute` sets the current task and never restores it, and `joinOrRun` restores it only around a forked join, so which task's pedigree advances depends on the schedule.
- **Where:** Compiled run time: `DeterministicRandom.java:52-56`; `runtimeSystem/BaseTask.java:108-111`, `:146-177`, `:57-61`; `CodeGen.java:5028-5033`; all at `c124c6b65`.
- **Reproduce:** `draws(12)` from `explorations/reviews/natives-shared-state-audit.md`, section 3.2, compiled, three runs at `FORTRESS_THREADS=4`: 4111.755423548555, 4111.368862987949, 4110.961144549375. No gated test.
- **Status:** `CONTESTED`: the specification is silent, but the name and the pedigree comment promise determinism. Wait on the question (a curator decision) before building a fix.
- **Could not resolve:**
  - "pedigree": the per-task position in the task tree that seeds a deterministic parallel generator. Not in the skill; I infer it from the comment the row cites. Language/run-time concept missing.
  - Whether walk shows the same; the row names only the compiled path, and `SKILL.md` asks rows to say which paths show a defect. Unclear wording.
  - Who settles the question and what would settle it is not said. Unclear wording.
