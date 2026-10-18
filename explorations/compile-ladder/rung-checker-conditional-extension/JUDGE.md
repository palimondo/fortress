# Rung X of climb batch 18: the judge's ruling

Rung `rung-checker-conditional-extension`, branch `wip/rung-checker-conditional-extension`, worktree `/home/user/fortress-condextend`, head judged `dfbbd6f73` (the skeptic's review). One contested fix, `bd18b6a47`. Nothing built or run for this ruling; every point below is read from the tree, the record and the skeptic's quoted results.

Decision: **stands**. `bd18b6a47` is upheld; nothing is reverted. The rung lands as the branch holds it.

## 1. The fix

`bd18b6a47`, "an extends entry is checked with its own conditions only": TypeWellFormedChecker's trait and object declaration cases walk each `extends` entry with the declaration's `where` clause and that entry's own conditions, wherever another entry is conditional. The members, parameters, `self`, and the `excludes` and `comprises` clauses are still walked with all the conditions (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:192-202`, `:209-219`). The same commit changes the rung's own specification sentences to match (`Specification/basic/trait-parameters.tex:375-378`, and the Change and Effect of the Appendix I entry "Conditional extension"). It also adds the test `ProjectFortress/compiler_tests/XXXCondExtendUnconditionalEntryChecker`: compile, keyed on 'has 1 error.' and on 'Ill-formed type: Wrap[\E\]' at `:10:33-39`.

## 2. Ruling: uphold

**What the decision says.** P-151 (POSITIONS.md, **Only the `where` forms the team wrote down are built.**) puts two things under the condition: the subtyping ("is that type only where the condition holds") and the members ("its members are checked under the condition"). It does not name the declaration's other supertypes. The curator's accepted reading names the members and overrides, and it names the peers whose rule it takes: "the condition holds inside the declaration while its members and overrides are checked, as Swift, Rust and Haskell check it" (`explorations/coordinator/BOOT.md:30`). In each of those languages a condition belongs to its own conformance:

- Rust: `impl<T: Ord> Shows for Bad<T>`;
- Swift: `extension Bad: Shows where E: Ord`;
- Haskell: `instance Ord a => Shows (Bad a)`.

None of them lets a second, unconditional conformance assume the first one's bound.

**What the rung's own paragraph says.** The paragraph's first sentence, written by this rung and kept by both sides, is the rule the fix follows. The declared type "extends the entry's type exactly where the constraints hold: an instance whose static arguments satisfy them is of that type, and an instance whose static arguments do not satisfy them is not" (`Specification/basic/trait-parameters.tex:371-374`). An entry with no clause holds at every instance. Checking it as if another entry's constraints held assumes them at instances where, by that same sentence, they do not. The skeptic's `CondOtherEntry` shows the consequence (SKEPTIC.md, section 2's table, and 4.2):

- the base refuses `object Bad[\E\](x: E) extends { Wrap[\E\], Shows where { E extends Ord[\E\] } }` for `trait Wrap[\T extends Ord[\T\]\]` with 'Ill-formed type: Wrap[\E\]';
- the worker's head compiles it, and the run prints 'REACHED' and then 'NoSuchMethodError: ... CondOtherEntry$Fn.lt(CondOtherEntry$Fn)'.

So the worker's head accepts a program the base refuses, and that program fails at link time. `Bad[\Fn\]` is a `Wrap[\Fn\]`, a type with no meaning.

**What the team's syntax says.** The grammar attaches each `where` clause to one entry, not to the clause as a whole: *TraitTypeWhere* ::= *TraitType* *Where*? (`Specification/basic/traits.tex:83`), the node `TraitTypeWhere(BaseType baseType, Option<WhereClause> whereClause)` in the checker's AST (`ProjectFortress/astgen/Fortress.ast:1694-1697`). The team's sketch of conditional subtyping gives each entry its own condition, with unconditional entries beside conditional ones. `CommutativeMonoid[...]` carries no clause, between `Field[...] where {...}` and `TotalOrderOperators[...] where { NOT nan }` (`Specification-1.0-frozen/appendices/internal-document.tex:484-495`). One entry's condition leaking into its neighbour is not what that layout says.

**Where the worker was right.**

- The conditional entry itself has to be checked under its own condition. Without that, the condition's own `Ord[\E\]` is ill formed (REPORT.md section 1, `:22`; the base's run in its section 2, 'Ill-formed type: Ord[\E\]'). The fix keeps this: the entry is walked with `withExtendsConditions(where, List(tw))` (`TypeWellFormedChecker.scala:198-201`, `:215-218`). The worker's stated reason is met in full.
- The worker ported the probe faithfully. B.3 says "the extends clause is checked with the condition holding" (`explorations/perf-probes/where-clauses/REPORT.md:343`), and the probe's diff walks `extendsC` under all conditions.

**Where the worker was wrong.**

- The probe was a shadow measurement, not a decision. None of its tests has an unconditional entry beside a conditional one, so nothing in it tested this point.
- The brief's line for these cases, "check the declaration with them holding", places the edit (`:193`, `:203`). It does not rule on the other entries. The rung's own summary in the same brief says "its members checked with them holding". Where a paraphrase and the decision it paraphrases differ, the decision binds (POSITIONS.md, **The specification stays the standard.**).

**The skeptic's claims.**

- Right: the defect is real and is a regression from the base (above).
- Right: the fix keeps everything the worker's reason needs.
- Right: the library is unaffected. `List`'s other entries need no condition: `AnyList` takes no static parameter (`Library/List.fsi:55`), and `ZeroIndexed[\E\]` is unbounded (`Library/FortressLibrary.fsi:1330`). The same holds of `PureList`'s `List` (`Library/PureList.fss:41`). So the count does not move, by reading.
- Right: the implementation is sound. When no other entry is conditional, each entry keeps the analyzer `inDecl` (`TypeWellFormedChecker.scala:197`, `:214`), which holds that entry's conditions only. Where another entry is conditional, an entry with no clause gets `oldAnalyzer.extend(sparams, where)`, the base's analyzer.
- The suite after the fix is quoted in SKEPTIC.md section 5: `ant testQuick`, 'Tests run: 1257, Failures: 0, Errors: 0', and ' compile .../XXXCondExtendUnconditionalEntryChecker  Saw expected failure'.

**Precedent.** None in the tree. The team's checker never read an entry's clause (`TypeHierarchyChecker.scala` at `a874948ac`, "TODO: Extend to handle non-empty where clauses.", REPORT.md section 3). The judgement follows the decision on record and the peers it names.

## 3. Notes for the gather, not rulings

- REPORT.md's provenance line for the missing decision record cites `Specification/appendices/changes.tex:198-200`. After `bd18b6a47` added one line, the pointer to REPORT.md is at `:199-201`. The skeptic says so (SKEPTIC.md, section 1).
- REPORT.md section 1 still says "check the `extends` clause and the members' types with them holding". This ruling and SKEPTIC.md section 6 give the landed reading. The specification and record.md's FACTS entry already state it.
- Observed by reading only, not run and not ruled: the `comprises` and `excludes` clauses are still walked with every entry's conditions holding (`TypeWellFormedChecker.scala:201`). A `comprises` entry that is well formed only under a conditional entry's condition would be accepted in the same way. No library declaration has that shape.
