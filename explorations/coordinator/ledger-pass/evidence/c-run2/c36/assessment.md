# Assessment, chunk c36 (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 68: keep
Pass on all six. The claim holds: `Compilation.rats:45-49` still logs 'Component/API names must match their enclosing file names.' (evidence, holds). Reproducer `none` with the probe's old path in the notes, as the template allows. Read beyond the evidence: none.

## 112: keep
Pass on all six. No commit touches a cited file; a grep of `ProjectFortress/src` finds no check of a `var` field in a `value` object, so nothing enforces it still. Reproducer `none`, outputs and the probes' old paths in the notes. Read beyond: grep of the source for a value-object field check.

## 122: rewrite
- consistency: fails. F-182 says both paths run the index builder that refuses it; the row named only the in-object site and not the top-level one (`IndexBuilder.scala:189`, `case d:PropertyDecl => bug("Not yet implemented: " + d)`).
- comprehension: "siblings" missing: row 125 names this row.
- Others pass. New line pins `:189`, adds siblings 125, says the compiled path by reading (F-182).
- Dropped: "The production is `OtherDecl.rats:132`" (home: history, row 122, and the spec cell); "(property variant)" and "no Fortress-level diagnostic" shortened. Read beyond: `IndexBuilder.scala:180-192`, FACTS F-182.

## 124: rewrite
- evidence: fails. "`Field/getter/setter declarations should come before method declarations.`" had no pinned site; it is `NodeUtil.checkMembers`, `NodeUtil.java:1561-1566`.
- Others pass. Dropped: "The error surfaces far from its cause as an object grows." (home: history, row 124). The three run-b2 probes are written in one brace path so that each resolves as a history path. Read beyond: grep and `NodeUtil.java:1529-1570`.

## 125: rewrite
- evidence: fails, no mechanism: `NodeUtil.isFieldLike` counts `PropertyDecl` as field-like (`NodeUtil.java:1533`), so `checkMembers` refuses it after a method.
- comprehension: no workaround; "siblings: 124" omitted 122, which it names. New line adds both. Nothing dropped.

## 354: rewrite
- evidence: fails. "`TypeHierarchyChecker.scala:247-250`" moved; the refusal is now `:338-341` (`if ( isApi && NodeUtil.isComprisesEllipses(si.ast) )`).
- present meaning / ownership: "Fix: (a) skip the refusal when the extender is listed (`comprisesContains`); (b) refuse a non-listed extension declared outside a component exporting `T`'s api" is a repair design. The new line keeps only its pointer, "Repair: `explorations/compile-ladder/rung-library-defects/REPORT.md`"; `comprisesContains` and the two parts are in that report and in history, row 354.
- comprehension: added the workaround (declare the extender in the component; F-64: the refusal runs only for an api).
- "gate it" read as if the XXX tests were reproducers of a fix; they pin the refusal (F-64). Reworded "pin the refusal". Read beyond: `TypeHierarchyChecker.scala:325-345`, `XXX3q.test`, `XXX10p.test`, FACTS F-64, F-72.

## 357: rewrite
- evidence: fails. `IntMap.fsi:19-21` and `:63` moved by one (now `:20-22` and `:64`); `checker-count/run.sh:51` moved (`TARGET=Library/FortressLibrary.fss` is `:76`).
- consistency: "waits on row 354's part (a)" names a part that the new 354 line no longer labels; now "waits on row 354".
- Others pass. Nothing dropped. Read beyond: `Library/IntMap.fsi:17-25,62-65`, grep of `run.sh`.

## 762: rewrite
- consistency: fails. Row 870 names 762 as sibling; 762 did not name 870. New line adds 870 to siblings. Closed siblings 567, 21 kept: they explain the shape.
- Reproducer: the XXX test is gated and the newest gate holds, so it still fails. Pins hold (`Constructor.java:216`; `SingleFcn.java:215` is inside `createSymbolicInstantiation`, which starts at `:163`). Nothing dropped.

## 838: rewrite (status stays CONTESTED)
- ownership: "Climb batch 22c's planner, `OneShot`'s api parameter written `var`" tells a batch; reworded as the observation alone.
- comprehension: no workaround, no siblings; added "Workaround: no `var` in the api." and siblings 844. Dropped "(the team's)" after `SyntaxChecker.java:154-157` (home: history, row 838; git blame).

## 839: rewrite
- evidence: fails. `ExportChecker.scala:658-669` at c3c22817c moved; `equalParams` is now `:690-702`, `equalOptListParams` `:710`.
- ownership: "Old code and rung L's head alike" is a story; "a repair compares them for an object's parameters only" a repair design; restated as the fact (a function's parameter names do not count, an object's name its fields).
- consistency: 844 names 839 as sibling; added 844. Dropped: "Old code and rung L's head alike" (history, row 839). Read beyond: `ExportChecker.scala:686-712`.

## 844: keep (CONTESTED, question unsettled)
Pass on all six. `ExportChecker.scala:694` still drops `Modifiers.Var` on both sides; `OneShotFlag.fss:15` holds. The reproducer is a plain test that passes, and that is the behaviour the claim states; the notes say no gated test holds the text's rule. The FACTS lines at FACTS.md:121 and :130 agree.

## 870: rewrite
- evidence: fails. The pin `SingleFcn.java:231 at e1ab927ad` names a commit not in the base's history (mech: bad commits 1); line unchanged, re-pinned at c124c6b65. `Constructor.java` was ambiguous; full path given.
- ownership: "Compiled, since rung G, it runs" and "Walk is the same on the base, b0f6cd6b7" tell batches; dropped (history, row 870). Added: no workaround keeps the constraint on `T`.
- Reproducer XXX, gated green, still fails.

## Pairs, silent, closes, duplicates
None. 354's overlap 489 (chunk outside this run) and 839's overlap 836 (c13) state other defects: the generic subtrait's renamed type variable, and static-parameter names. No NEGATIVE-VERIFIED row of this chunk cites `silent`.

## mech.py
Last line: `MECH: 9 lines, 0 failing, every check passes.`
