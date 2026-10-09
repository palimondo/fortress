# Rung C of climb batch 11, judgement on the skeptic's contested fix

Judged head: `6efdf2d9c` on `wip/rung-checker-overloading`, base `83b1cae78`. One contested fix: `15a4be724`, a typecase clause's body disambiguated as other code. Ruling: **uphold**. No revert. Decision: **stands**: the rung lands as the branch holds it.

## 1. The fix

`TypeDisambiguator.forTypecaseClause` (`ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:227-252`) now clears `forTypecaseClause` and `rewriteTypecaseClause` (`:248-249`) before it walks the clause's body (`:250`). On the worker's head `307c1ab69` it walked the body first and cleared the flags after (`:247-249` there). The test is `ProjectFortress/compiler_tests/XXXTypecaseBodyUndeclaredType.test`, a refusal keyed `compile_err_contains=Nonesuch is undefined.`.

## 2. Why it stands

1. **The text.** A typecase clause is "*TypecaseTypes* ⇒ *BlockElems*" (`Specification/basic/expressions/typecase.tex:66-71`). Its body is an expression block like any other (`:96-98`). The identifiers a typecase binds are values, bound to the value of the binding expression (`:88-95`, `:101-109`). No passage gives a clause's body a scope of type names. "It is a static error for a reference to a name to occur at any point in a program at which the name is not in scope" (`Specification/basic/declarations.tex:416-418`). So `y: Nonesuch = x` in a clause's body is a static error, as it is anywhere else. POSITIONS, "The specification stays the standard", makes that the answer.
2. **The binding form lives in the clause's type only.** It has two rewrites. The bare name becomes the clause's name over `Any` (`TypeDisambiguator.java:234-238`), and the tuple of names becomes a pattern (`:239-246`). Both read `matchType_result` and run before the body. The flag has one reader (`:380`), which sets `rewriteTypecaseClause`, and that is read only at `:239`. While the body was walked with the flag set, the flag's only effect was to suppress "X is undefined." for a bare type name. No rewrite took that name. Walk binds no type in a clause either: `Evaluator.forTypecase` puts only values in the environment (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1396-1428`). So no name a body could use as a type depends on the flag.
3. **The team's order was a slip, not a design.** The flag is a plain field (`TypeDisambiguator.java:59`), set on entry and cleared on exit, never saved and restored. A typecase nested in a clause's body therefore cleared it for the rest of the outer body. The `else` block is a field of `Typecase` beside the clauses (`ProjectFortress/astgen/Fortress.ast:605-607`). `TypeDisambiguator` has no `forTypecase` of its own (its overrides start `:86`, `:118`, `:142`, `:163`, `:179`, `:227`, `:255`, `:289`), so the generated visitor walks the `else` block after the last clause, with the flag already cleared. So by the code, the same undeclared name was refused in an `else` arm and let through in a clause arm. The fix makes the clause arm agree with the `else` arm.
4. **It is row 626's fix.** The row reads: "Fix: the disambiguator reports an undeclared name in a typecase arm that the binding rewrite does not take" (`explorations/fortress-gap-ledger.md:605`). A clause's body is part of the arm, and no binding rewrite takes a name there (point 2). The worker's own edit already refuses an applied undeclared name in a body. Its test, `that instanceof VarType` (`TypeDisambiguator.java:380`), does not look at where the name is (SKEPTIC.md, finding 2). Left alone, the body would refuse `Nonesuch[\ZZ32\]` and let `Nonesuch` through.
5. **It is not beyond the rung.**
   - The file is the rung's: "Java in `compiler/disambiguator/`" (`explorations/coordinator/CLIMB-BATCH-11.md:370`), and the brief's file list names `TypeDisambiguator.java`.
   - Its effect on walk is the point "A library or walk edit, or a declaration added to the compiler's prelude" (`CLIMB-BATCH-11.md:377`). The worker's own row 626 edit reaches that point in the same way (REPORT.md section 10, `:205`). Under walk, a program whose clause body names an undeclared type is now refused at load, where it failed at run time and only when the arm ran.
   - A point to report lands and is listed (`CLIMB-BATCH-11.md:342`; POSITIONS, "Reversible stops do not hold a batch.").
   - The edit moves two lines, so it can be undone. No decision on record asks walk to defer a static error to run time.
6. **Nothing it keeps from working is on record as working.**
   - The skeptic's whole-suite runs on the fixed code: `ant testQuick` 86/263/1058 with 0 failures, and `ant testSystem` 131/128/131/126 with 0 failures (SKEPTIC.md section 3).
   - The bare-name and tuple binding forms still run under walk (SKEPTIC.md section 4).
   - Batch 10's landed distance table has no "not in the kind env" or "is undefined" site (`grep` of `explorations/compile-ladder/climb-batch-10/gate/distance.txt` prints nothing). So no library site of this shape is on file to move.
   - The gate measures the merged tree.

## 3. Each side's claims

The worker (REPORT.md decision 8, `:221`; section 1, `:34`):

- **Right.** Refusing every undeclared name in a typecase *clause* would end the bare-name binding form (`TypeDisambiguator.java:234-238`). The fix does not do that: the clause's type is still walked with the flag set (`:228-246`).
- **Not an argument against the fix.** The report scopes row 626 to the clause's type and never considers the body. No reason is given there for letting a body's undeclared name through.

The skeptic (SKEPTIC.md finding 2 and section 4):

- **Right.** The binding form lives only in the clause's type, at `:234-246`.
- **Right.** The flag reached the body only through the order of the statements.
- **Right.** A bare undeclared name in the body is "an undeclared name in a typecase arm that the binding rewrite does not take" (ledger row 626).
- **Right.** `declarations.tex:416-418` makes it a static error.
- **Right.** The contest rests only on the walk point, the one the worker's edit reached in the same way.
- **Not checked here.** The quoted outputs of the old and new runs ('Nonesuch is not in the kind env [][][]' at `CompilerBuiltin.fsi:210:7-9`, 'Missing type Nonesuch' under walk) were not re-run, by the judge's brief. The ruling rests on the code and the text above, not on them.

## 4. For the curator

Nothing on record left open by this ruling. The walk point lands with the rung, listed by the worker (REPORT.md `:205`) and the skeptic (SKEPTIC.md section 5): through the shared disambiguator, walk now refuses at load a program that names an undeclared type in a typecase arm, in its type when applied to static arguments or anywhere in its body, where it failed at run time when the arm ran.
