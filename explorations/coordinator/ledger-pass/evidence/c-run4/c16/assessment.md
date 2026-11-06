# Assessment, chunk c16 (run c-run4, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 367: keep
scope pass; present meaning pass (`Common.scala:106-108` still the `SUnionType` `NI.nyi`, unchanged since ae4f8e38a); evidence pass (`XXXUnionMethodRungS.test`, the mechanism holds); comprehension pass; ownership pass (365 is the return-type half, a separate defect at a separate site); consistency pass (no FACTS/POSITIONS line). Read beyond evidence: none.

## 695: keep
scope pass; present meaning pass: the refused notes of batches 14 and 15 (reproducer `XXXSelfTypeReturnSelfRun`, link test, `SelfTypeReturnSelfAtTraitRun`) are all in the line now, so the notes-refused signal is spent; evidence pass (XXX test); comprehension pass, though no code line is pinned: the row is NEGATIVE-BOUNDED and the site of the uncast return is not located, as for 365; ownership pass (siblings: 365); consistency pass (FACTS.md:94 calls it an open defect, row 695). Read beyond evidence: none.

## 732: rewrite
present meaning: pin "`CodeGen.java:965` at 423958063" shifted +3; the body test `if (!fnl.body().isSome())` is at `CodeGen.java:968` at c124c6b65 (read with git show). Other checks pass; the commits that touched CodeGen.java since (where clauses, local functions, extends Any) do not touch the forwarding test. Change: repin only. Dropped: nothing (the old pin stays in history).

## 849: rewrite (CONTESTED, status kept)
present meaning fail: "`BuiltinPrimitiveRewriter.java:105`, at 98b04d371" now reads the string literal; the varargs return is `:117` at c124c6b65, and the class comment `:30-31` says "A declaration with a varargs parameter is left alone." ownership fail: "siblings: 847" names a FIXED row, while the open limits of the same rewrite are 865 and 884 (FACTS.md:133 lists 849, 865, 884 together). evidence: "as the batch's design gave it (`explorations/coordinator/CLIMB-BATCH-23.md:139`)" is a batch citation; replaced by the class comment, which states the same choice in the tree. Dropped: the CLIMB-BATCH-23 cite and sibling 847, home: history, row 849. Read: BuiltinPrimitiveRewriter.java at base.

## 865: rewrite
evidence fail: the pin "at d1228e1f0" is a commit not in the base's history, and `:51` is now the `Aliases` class, `:66-85` the import building. At c124c6b65 `rewrite` walks `c.getDecls()` (`:59`) and `decl` (`:75-87`) recurses only into trait and object headers; no visitor reaches a body's local function or an object expression. Repinned to those lines. siblings: 849, 884 (884 is the same "not rewritten" at another site). Dropped: the old pins, home: history.

## 882: keep
All pass. `BuiltinPrimitiveRewriter.java:46-48`, `Shell.java:101-107`, `:561`, `:702` hold, unchanged since f7a33b97b. Reproducer `none` with command and output in the notes, and why a gated test cannot pin it. FACTS.md:133 agrees. silent: defect (silent.txt).

## 884: keep
All pass. `Parser.java:135`, `:262-285`, `:329` hold, unchanged since f7a33b97b (the "moved" verdicts are words of the sentence spread over the three cited lines). path-gone signal: `ProbeGrammarShimHelper.fss` was never committed; the notes give the program in words, the shims' old path (checked: `git show fc89ee7a5^:explorations/perf-probes/grammar-compile/shim/` lists them) and the output, as the template asks for `none`. FACTS.md:133 agrees.

## 885: keep
All pass. `:135-145` and `:196-206` hold, unchanged since bdb244edb; FACTS.md:138 agrees ("A helper overloaded at its arity gets no transfer (row 885)"). silent: defect.

## 886: rewrite
comprehension: "where the base gave 'ZZ64->ZZ64 ...'" tells the before and after of a batch, not the gap; dropped, home: history, row 886. Path `compiler/BuiltinPrimitiveRewriter.java` written from the repository root and pinned at c124c6b65; lines hold unchanged. Added siblings: 885 (FACTS.md:138 gives them together). silent: defect.

## 365: rewrite
present meaning fail: "`NamingCzar.java:1398-1401`" now ends another method; `forUnionType` is at `NamingCzar.java:1444-1447` at c124c6b65 (read with git show). "A method call on the union-typed result is row 367" moved into `siblings: 367, 695` (695 is the same `VerifyError: Bad return type` from an uncast return). Probes named by their old path, `explorations/compile-ladder/rung-default-rendering/probes/skeptic/`, in the parent of ab067d9b6 (the commit that deleted them). Dropped: nothing else.

## 288: rewrite
present meaning: `WellKnownNames.java:114-127` shifted; `useCompilerLibraries` is `:116-129` at c124c6b65. The four names are still absent from `Library/CompilerLibrary.fsi` at c124c6b65 (grep count 0 each), so the claim holds; but that list is row 71's defect (row 71's claim names all of them), so the line now points to row 71 and names it in siblings, with 290 and 884 which stand behind 288. Notes cut to fit 700: the four names' list, home: row 71's claim. Pair 288/71 in pairs.txt for the reconcile run (row 71 is outside this run). silent: defect.

## 290: rewrite
present meaning: "`Operators.scala:237` (at 052a7c3fe)" shifted; the message "Argument to function must be parenthesized." is at `Operators.scala:243` at c124c6b65. consistency: "(row 243)" names a DUPLICATE row, a pointer to 213; now names 213. Shortened "Walk never type-checks, so it does not see this." Dropped nothing else. silent: defect.

## mech.py
Last run: "MECH: 7 lines, 0 failing, every check passes."
