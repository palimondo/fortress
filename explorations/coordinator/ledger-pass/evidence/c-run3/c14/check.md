# Check, chunk c14 (base c124c6b65)

mech.py: `MECH: 9 lines, 0 failing, every check passes.` No close, no duplicate, no pair; questions.md holds one optional run (row 307), narrow, runnable from the main tree, each outcome mapped to a line.

## 304: pass
`CodeGen.java:3588-3592` holds the three messages at d96242f0a (in the base's history) and at the base; the three XXX tests at the base assert exactly those messages. Siblings fine.

## 624: fail
- Passage: "A varargs call stops its caller too: the one library's `test stringifyChars()` (`Library/String.fss:337`) calling `assert`, from `CodeGen.resolveMethodAndSignature`."
- Source: the old line (evidence/624.md) gave the caller's message, "calling `assert`, 'Can't compile VarArgs yet' from `CodeGen.resolveMethodAndSignature`"; `assert(x:Any, y:Any, failMsg: Any...)` is varargs (`Library/FortressLibrary.fss:307` at the base). The writer's "home" for the message (the history and `XXXVarargsMethodCodeGeneration`) does not hold it: that test asserts `OptionUnwrapException` for a trait method. The cold read could not tell what the caller fails with.
- Correction (notes stay 695 of 700): replace "calling `assert`, from `CodeGen.resolveMethodAndSignature`" with "calling `assert`, 'Can't compile VarArgs yet' from `CodeGen.resolveMethodAndSignature`", and "fails to compile where walk prints `abc`" with "fails where walk prints `abc`".
- Otherwise: NamingCzar.java:1308, 1318, 1458, 1569 hold the throws, :945 the unwrap, CodeGen.java:3597 the local-function throw; `dumpTraitMethodSigs` no longer exists at the base (false, rightly dropped); the 0/1/6 argument counts live in `XXXVarargsMethodCodeGeneration.fss`.

## 643: pass (keep)
No cited line; 83b1cae78 is in the base's history; the reproducer and its link test exist; no commit since names the row.

## 701: fail
- Passage: "A declaration whose own header carries a `where` clause compiles, and nothing is emitted for its constraints, the checker's (`compiler_tests/WhereBound*Compiled`, ...)".
- Source: the cold read could not resolve "the checker's" (no noun); F-181 says "The clause's constraints are the checker's", i.e. only the checker enforces them.
- Correction (notes 625 of 700): replace "nothing is emitted for its constraints, the checker's (" with "nothing is emitted for its constraints, which only the checker enforces (".
- Otherwise: guards at CodeGen.java:3023, 4384, 5303 hold; the XXX test asserts "Don't know how to compile this kind of FnDecl"; dropped 823 (FIXED) and the four test names (the glob covers them) have homes; the where-clause refusal notes rightly not carried (c324b841c removed it).

## 763: pass (keep)
No cited line; commits since touch other cited-file paths only for conditional extension and Any bounds, nothing on `bool` RTTI naming; "Not traced further" is stated.

## 867: pass
FnNameInfo.java:99 holds; the rung-G story cut; row 749 (FIXED) dropped with home. Cold-read item "the method, row 868" resolves in the ledger (868: walk stops, 'Missing type n'), not a worker blocker.

## 25: pass
FortressLibrary.fss:2259 holds the `array` line; NatReflect.fsi:22-31, NatReflect.fss:33-35 and :38-40 hold; probes named with `parent of e879b6a44`; NatOpenChecker exists. The dropped `63e420a33` was the old pin. (Cold read's "which path prints `n is undefined.`" was also unsaid in the old line; no evidence in hand to add it.)

## 307: pass
STypesUtil.scala:585-606 unchanged since 63e420a33 (in history) and throws the quoted message; XXXNatBoolChecker asserts it; 9d323883f (not in history) rightly cut; the NatReflectTest half rests on a1a75716a (in history), with questions.md's run to refresh it.

## 761: fail (keep)
- Passage: "reached when `FTraitOrObjectOrGeneric.initializeFunctionalMethods` sorts the declarations (`:78`)".
- Source: a bare `:78` reads against the last file named, `NodeComparator.java`, where :78 is `compare(Param left, Param right)` (evidence/761.md, mech's "moved"); the sort is `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObjectOrGeneric.java:78` (the `filteredSortedSet` call, same at 3aea3da53 and the base).
- Correction: replace "(`:78`)" with "(`FTraitOrObjectOrGeneric.java:78`)". Everything else holds (NodeComparator.java:410-428's commented `BoolArg` case; gated XXX walk test).

## 764: pass
FnNameInfo.java:185-206 (`normalizedSchema`), :168-182 (`boundsFor`, type arg for non-size kinds), Functionals.scala:1152 (the call), StaticTypeReplacer.java:121-131 (`forTypeArg` unwraps) hold; the XXX test asserts the BoolExpr cast.

## 352: fail
- Passage: "commented out since 2011 (" and "Probe `explorations/compile-ladder/rung-tryatomic/probes/skeptic/SkepThrowsClause.fss` (... both paths print `CAUGHT`), gone."
- Source: the brief's "Present" forbids a date; the cold read found no commit to print the probe from. `git log --diff-filter=D c124c6b65 -- <probe>` gives ab067d9b6 ("Cleaning by kind: explorations/compile-ladder").
- Correction (notes 696 of 700, row 1074): replace "commented out since 2011 (" with "commented out ("; "the check belongs in the checker" with "it belongs in the checker"; "SkepThrowsClause.fss` (" with "SkepThrowsClause.fss`, parent of `ab067d9b6` ("; and "both paths print `CAUGHT`), gone." with "both paths print `CAUGHT`).".
- Otherwise: CodeGen.java:3022 (commented test), :4383, :5302 hold.

## 781: pass
TypeDisambiguator.java:112-113, :137-138 hold at the base; :161-162 keeps the function's clauses; a874948ac and 53ee5dc29 in history; Decls.scala:139-142 holds; the batch-base wording cut.
