# Rung C (`rung-checker-contexts`, climb batch 12): the judge's ruling on the contested fix

Written 2026-10-09 by the batch's judge, on the branch `wip/rung-checker-contexts` at `a0cd3e3be`. Nothing was built or run for it. Every point below is a read of the tree at that commit, of the base `7fa767d48`, of the team's last commit `a874948ac`, or of a result that the skeptic's commit `b73143297` and `SKEPTIC.md` quote with its command.

## 1. Ruling

**Decision: stands.** One fix was contested, `b73143297`, "Skeptic's fix: an atomic body's checker refuses a spawn whether or not an expected type comes with it". It is **upheld**, and nothing is reverted. The rung lands as the branch holds it.

## 2. What the rung changed, and what it broke

- At the base, an exit's `with` value was checked through `checkExpr(returnExpr)`, the overloading without an expected type (`git show 7fa767d48:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala`, `:730`). The rung checks it through `checkExpr(returnExpr, labelExpected)` (`impls/Misc.scala:739`). That is the curator's answer to Q48(a), which names the exits' values (POSITIONS, "A `label` body takes the expected type of the whole `label` (item 48, row 642).").
- `AtomicChecker` refused a `spawn` only by overriding `checkExpr(e: Expr)` (`git show 7572db348:.../impls/Misc.scala`, `:983`). Every other check goes through `checkExpr(e, expected: Option[Type])`: `checkExpr(expr)` is `checkExpr(expr, None)` (`STypeChecker.scala:511`), and the forcing overloading calls `checkExpr(expr, Some(expected))` (`STypeChecker.scala:478`). So once the exit's value took the second path, a `spawn` there passed the atomic check. The refusal that the base gave became a crash. The skeptic measured this, old code against new:

      bin/fortress typecheck SkAtomicSpawnExit.fss                       # the worker's head
      Exception in thread "main" java.lang.RuntimeException: Not in the trait table: CompilerBuiltin.Thread
      old-fortress.sh /home/user/fortress-base12 <tree>/tmp/old-caches typecheck SkAtomicSpawnExit.fss   # the base
      SkAtomicSpawnExit.fss:7:19-25:
          A 'spawn' expression must not occur inside an 'atomic' do block.

  (`SKEPTIC.md`, section 2.1.) So the rung regressed a refusal that the specification asks for: "A \KWD{spawn} expression cannot be run within the body of an \KWD{atomic} expression" (`Specification/basic/expressions/spawn.tex:28-31`). The rung's own change caused it. Repairing it belongs to the rung, whatever the section's list of sites says.

## 3. Why the fix is upheld

1. **It repairs the cause, and it follows the team's stated intent.** The class's own comment is "A type checker that signals an error if a spawn expr occurs inside it" (`impls/Misc.scala:960`). The team built it to extend through every nested check: `constructor` makes every `extend` another `AtomicChecker` (`:974-979`). An override of one overloading of two did not meet that intent. The leak predates the revival: the team's own block check gives its last expression `checkExpr(last, expected)` (`git show a874948ac:.../impls/Misc.scala`, `:434`; now `:435`). This is why a `spawn` that ends an atomic block crashed on both codes (`SKEPTIC.md` section 2.1). The fix changes one signature and its `super` call (`impls/Misc.scala:983-988`). It is the only `checkExpr` override in the checker (`grep -rn "override def checkExpr" ProjectFortress/src/com/sun/fortress/scala_src/` finds only `impls/Misc.scala:985`).
2. **The other ways are worse.** Way 2, a `spawn` special-cased in the exit's code, is a device that restores the base at one site and leaves the same leak at the block's last expression and at every typed function expression. Way 3, taking the label's type away from the exit's value, undoes the curator's answer to Q48(a) (POSITIONS entry above; `Specification/basic/inference.tex:143-148`, as the rung amended it).
3. **It verifies.** The fix comes with its test, `compiler_tests/XXXSpawnInAtomicExitValue`. That is a compile `XXX` test with `compile_err_contains`, which is the skill's form for a refusal at compile time. The test failed on the worker's head ("Did not satisfy compile_err_contains") and passed after the fix ("Saw expected failure", `OK (15 tests)`, with the team's `XXX1am`, `XXX1ap` and `XXX9i` among them). Then `ant testQuick` passed: "Tests run: 1086, Failures: 0" (compiler), 86 (library), 263 (othercompiler), "BUILD SUCCESSFUL". All of these are quoted with their commands in `SKEPTIC.md` section 2.1 and in the message of `b73143297`. The team's three tests pin the shapes that the override already caught: `atomic (spawn ())`, `tryatomic (spawn ())` and `ignore(spawn true)` in an atomic block (`compiler_tests/Compiled1.am.fss:19`, `Compiled1.ap.fss:15`, `Compiled9.i.fss:19`). They are unchanged.
4. **"Beyond the rung" does not hold it back.** The section lists `impls/Misc.scala` for the label and its exit case. It forbids only the library, walk, the overloading checker and the disambiguator. No other rung of the batch edits the checker (the brief, "Overlaps by file"). So this edit in the same file overlaps nothing. It repairs the rung's own regression.
5. **It also guards against a future change.** The worker asks the curator whether an `atomic` body takes the expected type of the whole (`REPORT.md` section 10). If the answer is yes, `forAtomic` (`impls/Misc.scala:151-152`) would pass the type through `checkExpr(body, expected)`. Under the old override, every `spawn` in an atomic body would then have escaped.

## 4. What reaches further than the exit, and why it stands

The fix also refuses two shapes that crashed on both codes (`SKEPTIC.md` section 2.1):

- **A `spawn` that ends an atomic block** (`g(): Any = atomic do spawn 3 end`). `spawn.tex:28-31` refuses it, so this is a crash turned into the refusal that the text asks for.
- **A `spawn` in a typed function expression made in an atomic block** (`k(): Any = atomic do g = fn (): Any => spawn 3; g end`). The skeptic lists this as a point to report (`SKEPTIC.md` section 4), and I agree. The text says "cannot be run within", which is about evaluation, and this `spawn` is only made there. Even so, the team's checker already reads the rule by where the code is written. An *untyped* function expression's body is checked through `this.extend(params).checkExpr(body)` (`impls/Functionals.scala:1152`), and that `extend` is an `AtomicChecker` (`impls/Misc.scala:974-979`). So by reading, the base's own code already refuses `fn () => spawn 3` inside an atomic block (not run for this ruling). The fix only makes the refusal independent of whether a return type is written: with one, the body goes through the forcing overloading (`impls/Functionals.scala:1146-1150`, `STypeChecker.scala:478`), which the old override did not see. No program loses a run. On both codes this program stopped the checker, 'Not in the trait table: CompilerBuiltin.Thread' (`SKEPTIC.md` section 2.1), and the code generator has no `spawn` visitor (FACTS.md, "The territory map", the entry that begins "Codegen refuses any declaration carrying a where clause": "`spawn`, `label`/`exit`, object expressions, ... have no visitor"). The point is reversible and holds nothing. It goes to the curator (section 7).

## 5. Each side's claims

The skeptic was right that:
- the exit's `with` value lost the base's refusal and crashed (section 2 above);
- the cause is the override of one overloading of two, and the fix belongs there (section 3, point 1);
- the fix turns two crashes into refusals, and the second may be a program that the text allows (section 4);
- reverting the fix would bring the crash back.

The worker was right that:
- the exit's value takes the label's expected type, not its own position's type (`Specification/basic/expressions/label.tex:66-70`; POSITIONS entry above). The fix keeps this.

The worker missed:
- the `spawn` case. Its probes did not try a `spawn` inside an atomic body (`SKEPTIC.md` section 5). Its own list of subclasses that a new field would have to reach names `AtomicChecker` (`REPORT.md` section 10, first decision). The section's list of sites names the files the rung works in. It does not forbid repairing a regression that the rung's own edit causes.

## 6. The worker's other decisions

They are not contested, and I make no ruling on them. The skeptic found that they "stand as the report gives them" (`SKEPTIC.md` section 5).

## 7. For the curator

**A program that the text may allow is now refused, where it used to crash. It is reversible and holds nothing.** The program is `k(): Any = atomic do g = fn (): Any => spawn 3; g end` (`SKEPTIC.md` section 4). The record does not settle whether the atomic body's ban on `spawn` is read by where the code is written or by when it runs. `spawn.tex:28-31` says "run within". Its note says "Static checking for \KWD{io} actions are not yet supported" (`spawn.tex:15`). The team's checker reads the ban by where the code is written (section 4 above). The two ways:
- **(a) Keep the reading by where the code is written, as landed.** The team's `AtomicChecker` reaches into function expressions through `extend`, typed or not. Cost: a program that only builds a function expression holding a `spawn` inside an atomic block is refused, as the base's code already refuses the untyped form (by reading, section 4; not run).
- **(b) Exempt function expression bodies from the atomic check.** `SFnExpr` (`impls/Functionals.scala:1128-1160`) would check its body with a plain checker. Cost: a change to the team's checker, and no program gains a run: on both codes the checker stopped at this program's `spawn`, and the code generator has no `spawn` visitor.

I took (a), because it is the team's own way. If the curator chooses (b), a later checker rung makes that change, with a test that such a function expression passes the atomic check. `XXXSpawnInAtomicExitValue` stays either way, because its `spawn` runs within the atomic body.
