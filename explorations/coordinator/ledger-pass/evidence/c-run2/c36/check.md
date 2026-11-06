# Check, chunk c36 (base c124c6b65)

mech.py: `MECH: 9 lines, 0 failing, every check passes.` No closes, duplicates, pairs or silent rows; questions.md asks no measurement, and its XXX reasoning holds (762, 870 gated; XXX3q's asserted message is still emitted at `TypeHierarchyChecker.scala:338-341`).

## 68 (keep): pass
`Compilation.rats:45-49` holds the message at the base; no commit touches it; probe path read from history.

## 112 (keep): pass
No commit touches the cited files; the probes are read from history; row 115 still states the trait rule.

## 122 (rewrite): fail
- Class. Passage: `implementation gap (walk)`. Source: both sites are in the shared index builder, `scala_src/typechecker/IndexBuilder.scala:189` (`case d:PropertyDecl => bug("Not yet implemented: " + d)`) and `:349` (`NI.nyi`); FACTS F-182: "in the index builder that both paths run". The cold reader could not tell whether the gap is walk's or the checker's; a worker would look in `interpreter/`. Correction: class `implementation gap (checker)`, and in the notes "Seen under walk, which runs the checker's index builder; by reading, the compiled path stops there too (F-182)."
- Otherwise pass: `:189` and `:349` read as cited; dropped `OtherDecl.rats:132` has a home (history, row 122); 125 named as sibling.

## 124 (rewrite): pass
`NodeUtil.java:1561-1566` emits the message inside `checkMembers`, called from the parser (`TraitObject.rats:129`, `:214`), so `(parser)` holds. The three probe tokens are kept in the brace path. Dropped sentence has its home in history.

## 125 (rewrite): fail
- Fidelity of the workaround. Passage: "Workaround: put a property before the methods." Source: a property before the methods passes `checkMembers` (`NodeUtil.java:1561-1566`) but then stops in the index builder (`IndexBuilder.scala:189` top level, `:349` in an object; row 122), so no property declaration runs anywhere; the cold reader also asked what counts as green after a fix. Correction: "Workaround: none while row 122 stands; a property before the methods passes this check and then stops as row 122 records."
- Otherwise pass: `isFieldLike` includes `d instanceof PropertyDecl` (`NodeUtil.java:1533`); siblings 124, 122.

## 354 (rewrite): fail
- Nothing lost. Passage: "or a stale cache shows it red". Source: mech's dropped token `XXX`; the old line read "shows the `XXX` test red". "it" now has no antecedent (the component? the repair?), and the cold reader read it as "keeps it red". Correction: "or a stale cache shows the `XXX` test red" (row 1,194 of 1,200).
- Otherwise pass: `:338-341` is `if ( isApi && NodeUtil.isComprisesEllipses(si.ast) )` with the quoted message; `Compiled3.q.fsi:12-15` is `trait T comprises { O, ... }` / `object O extends T`; `XXX3q.test` asserts the refusal at `:14`; `XXX10p.test` exists; REPORT.md exists and holds `comprisesContains` (home of the dropped token and the repair parts); the workaround matches F-64 (refusal only for an api).

## 357 (rewrite): pass
Re-pins hold (`IntMap.fsi:20-22`, `:64`, `IntMap.fss:26`, `run.sh:76`); "waits on row 354" matches the new 354. Reproducer `none` with the capture's old path, as the template allows.

## 762 (rewrite): pass
`Constructor.java:216` calls `SingleFcn.createSymbolicInstantiation`; `SingleFcn.java:215` is `st.setExtendsAndExcludes(eval_type.getFTypeListFromList(oext), null)` inside it (starts `:163`); neither file changed between 3aea3da53 and the base. 870 added as sibling.

## 838 (rewrite, CONTESTED kept): fail
- Reproducer / cold read. Passages: "`OneShot`'s api parameter written `var` gives …" and "(`ExportVarObjectParameter`)". Source: the cold reader could not locate either; the object is `object OneShot( canTryIt : Boolean )` at `Library/OneShotFlag.fsi:14`, and `ExportVarObjectParameter` is `ProjectFortress/compiler_tests/ExportVarObjectParameter.test`. With the batch story removed, the reproducer cell `none` has neither command nor probe path. Correction: "With the parameter of `object OneShot( canTryIt : Boolean )` (`Library/OneShotFlag.fsi:14`) written `var`, the parse gives 'var cannot modify an object parameter, canTryIt'." and "(`compiler_tests/ExportVarObjectParameter.test`)". Notes are at 691 of 700: make room by shortening "Against: `basic/traits.tex`, "Abstract Field Declarations", abstract field declarations do not include `var`." to "Against: `basic/traits.tex`, "Abstract Field Declarations", which leaves out `var`."
- Otherwise pass: `SyntaxChecker.java:154-157` checks `Modifiers.ApiFldMod` with the quoted message; status kept CONTESTED; no date or batch left.

## 839 (rewrite): fail
- Reproducer. Passage: reproducer `none`; the notes give outputs ("Both pairs compile rc 0; `Tq(1, 2).a` is 2 …") but no command and no probe path. Source: the template's reproducer cell ("`none` … with the command and its output, or the probe's old path"); no Np/Tq probe exists in history. Correction: add to the notes (564 of 700): "Reproduce: an api `object Np(a: ZZ32)`, a component `object Np(z: ZZ32)` and a client reading `Np(3).a`; `bin/fortress compile` the component and the client, then `bin/fortress run` the client."
- Otherwise pass: `ExportChecker.scala:690-702` binds `nameL`/`nameR` and compares neither; reached from `:372-374` through `equalOptListParams` at `:710`; dropped `:658-669`, `:703-704` are re-pins; 844 added as sibling.

## 844 (keep, CONTESTED): pass
`ExportChecker.scala:694` is `modsL.remove(Modifiers.Var).equals(modsR.remove(Modifiers.Var))`; `OneShotFlag.fss:15` is `object OneShot( var canTryIt : Boolean )`; commits naming it are routing and FACTS, none changes the code.

## 870 (rewrite): pass
`SingleFcn.java:231` is the cast of `ge.getLeafType(we_name)` at the base; e1ab927ad is not an ancestor of the base, so the re-pin is right; the XXX test asserts 'mixed cat' with `where { T extends Named }` on `trait Pair[\T\]`'s `mixed`.
