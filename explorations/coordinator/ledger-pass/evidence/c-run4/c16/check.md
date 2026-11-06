# Check, chunk c16 (run c-run4, base c124c6b65)

mech.py: "MECH: 7 lines, 0 failing, every check passes." Every cited line below was read with `git show c124c6b65:<path>`. No closes, no duplicates, no questions to measure. Pair 288/71: pass (288's fix needs the List names that row 71's claim lists; a shared half, not one defect).

## 365 (rewrite): pass
`NamingCzar.java:1444-1447` is `forUnionType`; `Specification-1.0-frozen/basic/expressions/if.tex:66-67` gives the union type; the probes exist at `ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/` (both files listed). Dropped tokens: `:1398-1401` false (now another method), the two probe names kept in the new path. "A method call ... is row 367" kept as `siblings: 367`. Cold read: no stumble a worker would hit.

## 367 (keep): pass
`Common.scala:105-107` at the base still holds the `SUnionType` `NI.nyi` and its message (the cited `:106-108` covers it); the two commits touching cited files do not change that case.

## 695 (keep): pass
No commit touches its cited files; the notes-refused signal is answered (the line holds the reproducer, link test and at-trait test). NEGATIVE-BOUNDED kept.

## 732 (rewrite): fail (cold read)
Fidelity: `CodeGen.java:968` is `if (!fnl.body().isSome()) {` in `dumpMethodChaining`; pass. Dropped `:965`: false (shifted). Failure: the cold reader could not resolve "an api's declarations have none in its index" nor why the order of the extends clause matters, and a worker fixing it needs both. Source: `CodeGen.java:924-940` at the base: the first extended trait's methods are put in `alreadyIncluded` (`STypesUtil.allMethods` of `extendsClause.get(0)`) and reach the object through the class hierarchy; every other inherited method needs a forwarder, which `:968` skips when the `Functional` has no body.
Correction: replace "and an api's declarations have none in its index." with "and the methods of an imported api's trait come from the api, whose declarations carry no body; the first extended trait's methods need no forwarder, since they come through the class hierarchy (`:934-940`)."

## 849 (rewrite, CONTESTED kept): fail (cold read)
Fidelity: `BuiltinPrimitiveRewriter.java:117` is `if (p.getVarargsType().isSome()) return f;`, `:30-31` "A declaration with a varargs parameter is left alone."; `FortressBuiltin.fsi:14-29` holds the revised comment. Dropped: `:105` false (now the string literal), `CLIMB-BATCH-23.md:139` home history and replaced by the class comment, `row 847` home history (FIXED). Siblings 865, 884: FACTS.md:133 gives them together; pass.
Failure 1: "as P-58 does. Contested: no decision says which holds." reads two ways (cold read): P-58 (POSITIONS.md:55) says the compiled path "is to rewrite each such body", which a worker reads as the decision that settles it. Correction: replace "as P-58 does. Contested: no decision says which holds." with "as P-58 does for every binding; P-58 does not name a varargs declaration, so whether one is rewritten or refused is for the curator."
Failure 2: class `deliberate (checker)`: the rewriter runs at the parse (class comment: "Parser applies it to the parse of a component"), and siblings 865, 882, 884, 885, 886 give the area `parser`. Correction: class `deliberate (parser)`.

## 865 (rewrite): fail (reproducer)
Fidelity: `:59` walks `c.getDecls()`; `decl` (`:75-87`) with `header` (`:89-95`) reaches trait and object members only, and `fn` never descends into a body; pass. Dropped `:51`, `:66-85`: false (shifted), home history. Failure: the claim names "or an object expression's method", but `XXXNativeHelperLocalFunctionCompiled.test` reproduces only the local function, and the notes give no command or program for the object-expression case. Correction: give in the notes the object-expression program and its output (or a test), or cut "or an object expression's method" from the claim and "An object expression's method so bound gets the same message." from the notes.

## 882 (keep): pass
`BuiltinPrimitiveRewriter.java:46-48`, `Shell.java:101-107` (`setEnabled(cache != interpreterCache)`), `:561`, `:702` (`parseFileConvertExn`) hold; no commit since. Reproducer `none` with command and output.

## 884 (keep): pass
`Parser.java:135` (`parseWithGrammars`), `:262-285`, `:329` (`rewrite(parseCU(...))`) hold; no commit since. "row 289's shims" names row 289, the POSITIVE row whose shims are `shim/FortressLibrary.fsi` and `shim/List.fsi`; the shim folder is listed at `fc89ee7a5^`. The path-gone signal (`ProbeGrammarShimHelper.fss`) is the program's own name in the output, written in words; answered.

## 885 (keep): fail (keep hides a change)
Lines `:135-145` (`soleMethod` call) and `:196-206` (`soleMethod`) hold; no commit since. Failure: `silent.txt` judges 885 `defect` ("a limit of its implementation ... not a choice the team made"), but the line keeps the class `design limit (parser)`; with a spec citation of `silent` and a defect verdict, the class is an implementation gap, as for 886. Correction: class `implementation gap (parser)`, status NEGATIVE-VERIFIED kept.

## 886 (rewrite): fail (cold read, Status)
Fidelity: `simpleName` `:169-173`, `transfer` `:186-188` (`Char`/`Character`), `:189-190` (`UnsignedLong`, argument only) hold. Dropped `compiler/BuiltinPrimitiveRewriter.java[:169-173]`: kept under the full path. Failure: "A refusal is right: no Java type carries the program's type." leaves the reader unable to say what the gap is (cold read, Status "unclear"); `silent.txt` gives it: "the refusal is right but its reason is wrong". Also "A program cannot name its own `NN32` on the compiled path, nor `Char` under walk." is unexplained. Correction: replace those two sentences with "A refusal is right, since no Java type carries the program's type; the gap is its message, which names the library's transfer: matching the declared type by its full name would refuse it at the string. A program's own `NN32` is not reachable on the compiled path, nor its own `Char` under walk, so those two are not tested."

## 288 (rewrite): fail (cold read, wording)
Fidelity: `FortressSyntax.fsi:14` imports `FortressAst`, `FortressAst.fsi:6` imports `FortressLibrary`, `WellKnownNames.java:116-129` is `useCompilerLibraries`, `GraphRepository.java:815-823` `syntaxExpand` calls `Parser.macroParse`, `PhaseOrder.java:137-147` lists GRAMMAR after DISAMBIGUATE; pass. Dropped: the four List names, home row 71's claim (verified, line 824 of the ledger at the base); `WellKnownNames.java:114-127` false (shifted). Failure: "reaches the interpreter's prelude" contradicts the skill's terms (the prelude is the compiler's three files; the interpreter's is its library). Correction: "whose api graph reaches the interpreter's library, `FortressLibrary`,".

## 290 (rewrite): fail (cold read, fidelity)
`Operators.scala:243` raises 'Argument to function must be parenthesized.'; `row 243` to `row 213` correct (243 DUPLICATE). Failure 1: "Reachable only behind row 288's shims." Row 288 defines no shims; they are row 289's (the POSITIVE row: `shim/FortressLibrary.fsi`, `shim/List.fsi`), as row 884 says. Correction: "Reachable only behind row 289's shims."
Failure 2: "The template translator loses `isParenthesized`" asserts a site the evidence does not locate (cold read: class not named); the grammar transform `syntax_abstractions/phases/Transform.java` copies `NodeUtil.isParenthesized(that)` at each node it rebuilds (`:132`, `:194` and on). Correction: "Where the expansion loses `isParenthesized` is not located;".
