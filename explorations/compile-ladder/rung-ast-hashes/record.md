# Rung H (rung-ast-hashes): the record lines

## FACTS

- **The syntax tree's hashes do not depend on the JVM's identity hashes; one checker site still does.**
  - Every generated node's hash starts from the hash of its class's name. makeAST's post-processing of ASTGen's output and the in-repo generators write it (`build.xml:679-697`).
  - A field whose type holds an Option is hashed by `NodeHash.of` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeHash.java`), since the PLT Option classes hash by identity hashes.
  - So hash maps and sets of nodes iterate in one order whatever code asked for an identity hash before, and so do the apis that `StaticChecker.checkApis` takes in turn.
  - Two kinds of node still hash by an identity hash: `_InferenceVarType`, `_InferenceVarOp` and `_InferenceVarInt`, whose id is a bare `Object` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeFactory.java:1166-1184`), and walk's `_WrappedFValue`, which hashes its `FValue` (`interpreter/evaluator/_WrappedFValue.java:170-177`). No output of the count stage moves through the first (`compile-ladder/rung-ast-hashes/REPORT.md`, section 4.4); the second is walk's own (row 430).
  - The checker's output still moves at row 488's `:130`, through NEW-H-1.
  - The entry replaces F-232, which the change makes false.
  - Test: `NodeHashJUTest.testHashesDoNotDependOnIdentityHashes`; for the site that still moves, `XXXOmittedReturnTypeFromApi.test`.
  - Detail: `compile-ladder/rung-ast-hashes/REPORT.md`, sections 4.2 to 4.4.
- F-53's sentence "An edit can move 2 to 4 errors that it does not touch (row 488; F-232)" holds now only through NEW-H-1. Read: "An edit can move errors that it does not touch where a component's function leaves out its return type beside a same-named api declaration (row 488; NEW-H-1)". This rung's edit, which touches no library line, moved one such error, `:130`, in the distance stage (`compile-ladder/rung-ast-hashes/REPORT.md`, section 7).

## Ledger notes

- **Row 488.** Its notes hold 686 of their 700 characters, so this text is for the coordinator: "Climb batch 16 rung H fixed the nodes' hashes; the H runs then move only `:130` (absent at N = 0, present at 1 and 1000). Mechanism: NEW-H-1. `ApiTypeExtractor` gives `BIG LEXICO(g)` (`Library/FortressLibrary.fss:129-130`) the nullary declaration's `BigReduction` return type when that comes first in `DeclaredFunction` identity-hash order (`compile-ladder/rung-ast-hashes/REPORT.md` 4.3)."
- **Row 430** (at its limit; for the coordinator): "Climb batch 16 rung H fixed the syntax tree's hashes. Walk's orders here come from `FType`'s counter and `FunctionClosure`'s identity hash, which it left; testSystem's 621 verdicts are unchanged."
- **Row 730** (at its limit; for the coordinator): "Climb batch 16 rung H regenerated the nodes twice: `FortressAst.scala` is byte for byte the same and `WalkerJUTest` passes 4/4."
- **Row 577:** "Climb batch 16 rung H moved no library line; its distance sites, read by row: `:130` gone, `:1463`'s union reversed."

## New rows

Section "3. Traits, objects and components":

| NEW-H-1 | the compiled checker gives a component's function that leaves out its return type the return type of the exported api's first declaration of its name, in identity-hash order, not of the declaration of its own parameter type, so one overload's body is checked against another's (`ApiTypeExtractor`) | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/components/type-inference.tex`, "Type Inference for Components" | `ProjectFortress/compiler_tests/XXXOmittedReturnTypeFromApi.test` | climb batch 16 rung H | `isExported` returns the first `SDeclaredFunction` of `functions.matchFirst(name)` and compares no parameters (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala:116-122` at 528438ac5); the relation is an `IndexedRelation` (`IndexBuilder.scala:158-159`) of `DeclaredFunction`s, which declare no `hashCode` (`compiler/index/DeclaredFunction.java:25`), so the pick moves with the identity-hash sequence. Row 488's `:130` is this case: `BIG LEXICO(g)` takes `BIG LEXICO()`'s `BigReduction` when that comes first. Compiled path only: walk checks no types. Workaround: write the return type. |

## Handover

Climb batch 16 rung H: the syntax tree's nodes hash by their class's name, and their Option fields by `NodeHash`, so the checker's api order and union spellings no longer move with identity hashes. Row 488's `:130` still moves, through `ApiTypeExtractor`'s name-only match over identity-hashed `DeclaredFunction`s (NEW-H-1, `XXXOmittedReturnTypeFromApi`), outside the AST and left for a checker rung. The count stays 39; the distance read 48 on this tree, since `:130` fell out of the distance stage by hash order.

## Revival change

Revival change: none. The change alters no program's acceptance, refusal or run:
- the suites' verdicts and the ladder are unchanged;
- the count's table is unchanged;
- the distance moved only by row 488's hash-order site.

It fixes the order in which the checker takes the apis and prints a union's members. No source of the team's says what that order is: it moved from run to run in the team's compiler, and the team's own comment asked for "a more deterministic replay than Object.hashCode()" (`ProjectFortress/src/com/sun/fortress/nodes_util/UIDObject.java:28-29`).