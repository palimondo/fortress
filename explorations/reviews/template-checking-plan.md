# Template checking on the compile path: what the team intended, where it breaks, and the smallest fix

Reading task, 2026-09-16, for Pavol's question: "the DSL templating in the type checker: do you have any inkling how to proceed? How to make this the Fortress way?"
Starting facts are `explorations/perf-probes/grammar-compile/REPORT.md` (read whole): behind the prelude shims a user grammar compiles and runs, but three things fail in the type checker.
Nothing was run for this document; every claim is a citation into the tree or into that probe's recorded outputs.
Paths under `ProjectFortress/src/com/sun/fortress/` are written relative to it; `Fortress.ast` is `ProjectFortress/astgen/Fortress.ast`; the paper is cited by section and PDF page.

## (a) What the team intended

The paper is Allen, Culpepper, Nielsen, Rafkind, Ryu, "Growing a Syntax", FOOL 2009 (`research/README.md:60-72`; local copy `research/decks/GrowingASyntax-FOOL2009.pdf`; extract `research/extracts/growing-a-syntax.md`).
The spec's DSL chapter is a stub that defers to it (`Specification/advanced/domain-specific-languages.tex:12-16`), so the paper is the only prose design.

What an expansion is.
"The transformation expression is parsed into Fortress Abstract Syntax Tree (AST) nodes, containing placeholder nodes to represent pattern variables, and the act of transforming a use site is performed by substituting AST nodes in for the placeholders" (§4, p4).
Expansion is not string substitution and not user computation; the alternative was tried and rejected (§4 p4, §6 p9).

Where in the pipeline.
The paper names the whole process "syntax normalization", "the entire process from parsing a source program to creating a corresponding AST", in two stages, parsing and transformation (§5, p5).
Its output is "a Fortress AST without macros which can be interpreted by the Fortress interpreter" (§5, p4).
The implementation section says the same in mechanism: "The macro system is logically broken up into two stages: parsing, and transformation. The first stage consists of parsing the grammar declaration into an AST which contains transformation nodes instead of the template bodies … The system constructs a new parser for each unparsed template body and replaces the grammar AST node with a transformation node which contains the parsed template body. When a component is parsed, the grammars that it imports define the PEG used to parse the component body. The resulting AST will have nodes that specify a macro invocation. In stage two (transformation) the AST will be run through a macro processing engine which converts macro invocation nodes into their corresponding template bodies" (§6, p8).
So by design the expansion is finished before anything downstream of the parser sees the component, and the component that reaches the later phases is ordinary Fortress AST.
The design goals say the same from the user's side: "Use sites must be parsed along with the rest of the program and expanded directly into abstract syntax trees" and "syntax errors at use sites of a macro must refer to the unexpanded program at use sites, never to definition sites" (§1, p1).

What later phases were expected to do with it.
Nothing special: the later phases see a macro-free AST.
The template bodies stored in the api are a different matter, and the paper is explicit that checking them was never done: "Type checking macros is an interesting future direction … The goal of type checking macros would be to provide the static guarantee that if a macro definition is well typed then there is no type error at the use sites of the macro" (§9, p10).
That is the missing piece: a template body is quoted syntax with placeholders, and no phase in the design is responsible for checking it as code.
The paper also wants definition-site name resolution, "Syntactic abstractions can refer to types, variables, and functions declared in the API, and the references they produce in client components are resolved based on the components the client is linked to" (§8.2, p10); the implementation resolves template free names at the use site instead (ledger row 270). That is a separate, larger gap and this plan leaves it where it is.

The code agrees with the paper on the placement.
The bytecode compiler and the walk interpreter share one phase list with GRAMMAR in it (`compiler/phases/PhaseOrder.java:125-147`), but GRAMMAR is "Grammar Rewriting", the rewriting of grammar *definitions* in apis (`PhaseOrder.java:35-40`), and `GrammarPhase.execute` touches only apis and passes `previous.components()` through untouched (`compiler/phases/GrammarPhase.java:39-48`).
Its work is `GrammarRewriter.rewriteApis`: disambiguate item symbols, drop whitespace, rewrite escapes, desugar extensions, name transformers, then "Parse pretemplates and replace with real templates" (`syntax_abstractions/phases/GrammarRewriter.java:32-51, 63-67`).
That last step is `TemplateParser.parseTemplates`, which generates a Rats! parser for the grammar (`ParserMaker.parserForGrammar`, `syntax_abstractions/ParserMaker.java:79`) and replaces every `UnparsedTransformer` (a string, `Fortress.ast:1796`) with a `NodeTransformer(AbstractNode node)` holding the parsed template body (`Fortress.ast:1800`; `syntax_abstractions/phases/TemplateParser.java:43-57`).
A parsed template body holds `TemplateGap` nodes for pattern variables and `_SyntaxTransformation` nodes for macro invocations inside templates (`Fortress.ast:1962-1972`); astgen mints a `TemplateGapX` and `_SyntaxTransformationX` class per node kind (`Fortress.ast:43`; 241 `TemplateGap*` classes under `nodes/`).

The expansion of a *component* happens at parse time, before any phase.
`GraphRepository.refreshGraph` first analyzes the out-of-date apis under the current phase order (`repository/GraphRepository.java:492`, `parseApis` → `Shell.analyze` at `:735`), then for each component calls `parseComponent(syntaxExpand(node), result)` (`:511`).
`syntaxExpand` calls `Parser.macroParse` (`:815-833`), which collects the component's imported grammars (`compiler/Parser.java:111-136`) and, if there are any, `parseWithGrammars`: build a parser for the imported grammars (`ParserMaker.parserForComponent`, `syntax_abstractions/ParserMaker.java:85`, called at `Parser.java:266`), parse the file with it, then `Transform.transform(env, original)` (`Parser.java:282`).
`Transform` is "Macro expander: Traverses AST node, replacing transformation nodes with the results of their transformer executions" (`syntax_abstractions/phases/Transform.java:30-34`): a `_SyntaxTransformation` node is replaced by its transformer's output (`:612-653`), a `TemplateGap` by the bound argument node (`:541-555`), and `checkFullyTransformed` throws if any gap or transformation node survives (`:791-803`).
Hygiene is the gensym at `:110-118` (`RatsUtil.getFreshName(text + "-g")`) applied to binders after a macro has been invoked, with `SyntaxEnvironment` (`syntax_abstractions/phases/SyntaxEnvironment.java:16-53`) mapping old names to new and `forVarRef` looking references up in it (`Transform.java:122-135`).
Only then does `parseComponent` run `Shell.analyze` on the result (`GraphRepository.java:792-811`), i.e. the whole phase list: PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, … , TYPECHECK, … , CODEGEN.
So the component that reaches DISAMBIGUATE contains no template nodes and no macro invocations, and its expansions are disambiguated and type-checked like written code.
There is no second disambiguation pass, and none is needed for the component.

The api is the other half.
The api's template bodies are strings at DISAMBIGUATE (`UnparsedTransformer`), become ASTs at GRAMMAR (`TemplateParser`), and are then carried inside the api's `GrammarDecl` into PRETYPECHECKDESUGAR, TYPECHECK, DESUGAR and CODEGEN.
No phase disambiguates them (the disambiguator's grammar step handles nonterminal names only, `compiler/Disambiguator.java:78-99, 195-196`), and by the paper none should: they are quoted syntax.
The interpreter treats them accordingly: `BuildEnvironments.forGrammarDecl` is "Do nothing" (`interpreter/evaluator/BuildEnvironments.java:1030-1032`) and the interpreter's desugarer returns a `GrammarDecl` unchanged (`interpreter/rewrite/DesugarerVisitor.java:1035-1037`).

## (b) The hypothesis, confirmed in one half and refuted in the other

The hypothesis: DISAMBIGUATE runs before GRAMMAR, so names and types inside an expansion are never disambiguated, and the fix is to re-run disambiguation over expanded trees after GRAMMAR.

Refuted for the expansion.
The expansion lives in the component, and the component is expanded at parse time by `syntaxExpand`/`Parser.macroParse`/`Transform.transform` before `Shell.analyze` runs a single phase on it (`GraphRepository.java:511, 815-833`; `Parser.java:259-283`).
DISAMBIGUATE therefore sees an expansion as written code and does its ordinary work on it: a `VarRef` naming a function becomes an `FnRef` (`scala_src/disambiguator/ExprDisambiguator.scala:371-399`), a `VarType` naming a trait becomes a `TraitType` (`compiler/disambiguator/TypeDisambiguator.java:179-200`).
The probe's positive result is the evidence: `a02p_twice` went PARSE → GRAMMAR → DISAMBIGUATE → … → CODEGEN and printed `42` and `6` (`grammar-compile/REPORT.md` §5, `18-verify-positive.out`), with the `+` inside the expansion resolved by the component's own disambiguation.
A second disambiguation pass over the component would find nothing to do; a phase reordering would change nothing, because GRAMMAR never touches components.

Confirmed for the template bodies in the api, which is where the errors actually come from.
All three failures are raised while checking the **api**, not the using program.
Two of the three are in the recorded stacks and error spans: the `ClassCastException` stack is `assertAfterTypeChecking` ← `StaticChecker.checkCompilationUnit:264` ← `checkApis:126` ← `TypeCheckPhase.execute:43` (`16-shim2-rules-split.out`), and `checkApis` is the api loop (`compiler/StaticChecker.java:119-137`); `Unbound type: ZZ32` is reported at `G_lamp.fsi:1:10-12` and `:1:17-19`, the api file, and it is reported identically for `fortress compile G_lamp.fss` (the api's stub) and for `fortress compile u_lamp.fss` (the using program), because compiling the using program first re-analyzes the api graph (`refreshGraph`, `GraphRepository.java:492`) and dies there before the component is looked at (`TypeCheckPhase.java:43-47`: apis first, `MultipleStaticError` on failure).
The template bodies are the only code in the api that DISAMBIGUATE never saw, exactly as the hypothesis says, but for the reason that they were strings at that phase, not because of the order of GRAMMAR relative to DISAMBIGUATE.
Moving GRAMMAR before DISAMBIGUATE would make the disambiguator walk into the templates and either error on the gaps or resolve template free names at the definition site, which flips row 270; a re-run after GRAMMAR would do the second.
Neither is what the design asks for; the design asks that the checker not read templates as code.

The three failures, exactly.

1. `Argument to function must be parenthesized.` (`scala_src/typechecker/impls/Operators.scala:235-237`).
This one is component-side; `STypeChecker` runs only for components (`StaticChecker.java:245-247`), and the interpreter never runs it because `walk` leaves type checking off (`Shell.java:420-424` sets no flag; `Shell.java:1275` defaults `fortress.compile.typecheck` to false; `StaticChecker.java:166`).
The checker's rule is legitimate: in a juxtaposition `f x`, the argument must be a `ParenthesisDelimitedMI`.
The parenthesized flag is dropped in three places.
When the parser meets `( e )` it calls `ExprFactory.makeInParentheses` (`parser/DelimitedExpr.rats:208-210`), and that factory's case for a gap builds a new `TemplateGapExpr` with `NodeFactory.makeExprInfo(span)`, whose parenthesized flag is false (`nodes_util/ExprFactory.java:1980-1983`; `nodes_util/NodeFactory.java:704-706`), and its case for a macro invocation returns the node unchanged (`ExprFactory.java:1985-1987`).
So `<[ (a) ]>` loses its parentheses when the template is parsed, and `println((m1⦇ ⦈))` loses them when the use site is parsed; that is the probe's `m2` and `m7`.
The third place is `Transform`: when a gap or invocation node is replaced, the replacement is returned bare, without the replaced node's flag (`Transform.java:551-554` and `:650-652`), which is `m1`'s `<[ 42 ]>` and `m4`'s `<[ (a) + (a) ]>` arriving unparenthesized in `println(…)`.
`m3` works because `((a) + (a))` puts the parentheses on an `OpExpr`, which is neither a gap nor an invocation and keeps its flag; `m6` works because a binding's right-hand side is not a juxtaposition argument.

2. `Unbound type: ZZ32` (`scala_src/typechecker/TypeWellFormedChecker.scala:93-95`).
Api-side. `checkCompilationUnit` runs `TypeWellFormedChecker` over the whole api AST (`StaticChecker.java:220`, again at `:268`), and that walker has no case for `GrammarDecl` or `NodeTransformer`, so it descends into the template body and meets the lambda's `SVarType(ZZ32)`, which is still a `VarType` because the disambiguator never saw it (see above) and is not in the analyzer's static-parameter environment.
The `TypeDisambiguator` would have made it a `TraitType` (`TypeDisambiguator.java:179-200`) had it run; in the component's expansion it does.

3. `ClassCastException: BoxedUnit cannot be cast to AbstractNode` (`scala_src/useful/STypesUtil.scala:1938-1948`, `scala_src/nodes/FortressAst.scala:1685`).
Api-side, and a bug in the assertion itself rather than in the tree.
`assertAfterTypeChecking` walks the checked api with an `outFinder` whose `walk` sets `result = true` and returns Unit when it meets an `OutAfterTypeChecking` node (`STypesUtil.scala:1941-1944`).
The template `<[ (mydoublec(a)) ]>` is a juxtaposition, a `MathPrimary` or `Juxt`, both `OutAfterTypeChecking` (`Fortress.ast:883` `Juxt`, `:990` `MathPrimary`, `:1702` `MathItem`, `:1938` the interface), and it sits directly under the `NodeTransformer`; the generated `Walker`'s case for `SNodeTransformer` casts `walk(getNode)` to `AbstractNode` (`FortressAst.scala:1685`), receives Unit, and dies.
Had the assertion survived, `StaticChecker.java:264-266` would have reported "Result of typechecking still contains intermediate nodes", which is the honest message: the template body was never type-checked, so its juxtapositions were never resolved.
`TwiceP`'s `((a) + (a))` passed the same assertion because an `OpExpr` over two gaps contains no `OutAfterTypeChecking` node and a gap falls through the walker's `case _ => node` (`FortressAst.scala:2012`).

Why the interpreter never noticed.
The interpreter runs the same phase list on the api (`PhaseOrder.java:125-135`, TYPECHECK included) but `checkCompilationUnit` returns the AST untouched when type checking is off (`StaticChecker.java:166, 295-297`), the interpreter's environment builder ignores `GrammarDecl` (`BuildEnvironments.java:1030-1032`), and names in the expanded component are resolved at run time by environment lookup (`interpreter/evaluator/Evaluator.java:1446-1460`, `forVarRef` → `getValueNull`).
Both mechanisms of rows 270 and 285 therefore print their numbers on the interpreter (`02b-interpreter-usefn.out`).

Where the evidence is thin.
No component with a template-written function name or typed lambda has ever reached the component checker on the compile path, because the api check dies first; that the expansion then checks cleanly is inferred from the mechanism (expansion before phases) and from `a02p_twice`, not observed.
The hygiene renames (`RatsUtil.getFreshName`, `Transform.java:110-118`) have never been through DISAMBIGUATE either; the interpreter accepted them (`y02_lambda`, `y03_lamfn`), the compiler has not been asked.

## (c) The minimal design

The principle, from the paper and from the code as it is: a template is quoted syntax and is never checked as code; an expansion is checked as written code, where it is written, in the component.
The component half already holds.
What is missing is two small things: the api checkers must not descend into templates, and the parenthesized flag must survive the parser's and the expander's handling of gaps and invocations.
No second disambiguation pass, no phase reordering, no template cases in the type checker.

Four edits, all under the sealed tree, listed by file and function.

1. `scala_src/typechecker/TypeWellFormedChecker.scala`, `walk` (`:51-166`).
Add a case that does not descend into a `NodeTransformer` (the parsed template body, `Fortress.ast:1800`), before the default `case _ => super.walk(node)` at `:166`.
This removes `Unbound type: ZZ32` at `:93-95`, and anything else the well-formedness walk would say about a template.
The narrower skip (`NodeTransformer`, not the whole `GrammarDecl`) keeps checking the types written in nonterminal headers, which the disambiguator did resolve and which pass today.

2. `scala_src/useful/STypesUtil.scala`, `assertAfterTypeChecking` (`:1938-1948`).
Same skip in `outFinder.walk`: do not descend into a `NodeTransformer`.
This removes the `ClassCastException`.
A second, one-line robustness fix in the same function is worth taking at the same time: return `node` rather than Unit after setting `result = true`, so that if the assertion ever does find an intermediate node in a cast position it reports through `StaticChecker.java:264-266` instead of dying in the generated `Walker`.

3. `nodes_util/ExprFactory.java`, `makeInParentheses` (`:1779-1992`).
`forTemplateGapExpr` (`:1980-1983`) builds its copy with `NodeFactory.makeExprInfo(span)`, which is `parenthesized = false` (`NodeFactory.java:704-706`); build it with `makeExprInfo(span, true)`.
`for_SyntaxTransformationExpr` (`:1985-1987`) returns its argument; return a copy whose `ExprInfo` is parenthesized, keeping `getVariables()`, `getSyntaxParameters()` and `getSyntaxTransformer()` (constructor order as used at `Transform.java:598-601`).
After this, `<[ (a) ]>` and `println((m⦇ ⦈))` carry the flag out of the parser.

4. `syntax_abstractions/phases/Transform.java`, `forTemplateGapOnly` (`:541-555`) and `defaultTransformationNodeCase` (`:612-653`).
Before returning the substituted node, if the replaced node is an `Expr` that `NodeUtil.isParenthesized` and the result is an `Expr`, return `ExprFactory.makeInParentheses(result)`.
After this, an expansion in argument position is parenthesized whenever the template or the use site parenthesized it, and `m1`, `m2`, `m4`, `m7` of the probe's matrix compile like `m3`.
The checker's rule at `Operators.scala:235-237` stays as it is; it is right, and it now sees the flag it needs.

What is deliberately not touched.
`PhaseOrder.java`: both orders stay as they are; GRAMMAR's position is irrelevant to components.
`compiler/Disambiguator.java`, `ExprDisambiguator.scala`, `TypeDisambiguator.java`: nothing to add; the disambiguator is already the pass that makes an expansion indistinguishable from written code, because it runs on the component after expansion. (It is also tolerant of a second run, `ExprDisambiguator.scala:464-486` re-disambiguates an `FnRef`, but no second run is needed.)
`scala_src/typechecker/` otherwise: no `TemplateGap`/`_SyntaxTransformation` cases are needed, because `checkFullyTransformed` guarantees none reach a component (`Transform.java:791-803`), and the api's templates are skipped, not checked.
Row 270's use-site resolution: unchanged. Definition-site resolution (the paper's §8.2 and §9) is a different project; see (g).

The later api phases need nothing.
`PreTypeCheckDesugarer.desugarApis` and `Desugarer.desugarApis` (`compiler/phases/PreTypeCheckDesugarPhase.java:37`, `DesugarPhase.java:37`, `compiler/Desugarer.java:67`) are shared by both worlds and already ran over the lambda-bearing and function-naming templates on the interpreter path (`02b-interpreter-usefn.out`); `OverloadRewritingPhase` and `IntegerLiteralFoldingPhase` pass apis through (`:39`, `:37`); `CodeGenerationPhase` generates only for foreign apis (`:78-94`).
`TypeNormalizer`, `TypeHierarchyChecker`, `CompoundApiChecker`, `ApiLinker` and `OverloadingChecker` ran over `TwiceP`'s and `MatrixC`'s templates (`StaticChecker.java:176-219, 275`).

## (d) Size, and which interpreter-only rows it makes true on the compile path

In the project's units (`explorations/coordinator/POSITIONS.md:23`: a rung, a worker session, a check run).
The prototype is one worker session: copy four files into a shadow tree, make the edits above (about twenty changed lines in all), recompile them against the built classpath, re-run the grammar-compile probe's steps 13 to 17 with the shadow first on the classpath.
The real edit is one rung on the modernization ladder's terms: the same four files under the sealed tree, gated on the green suite (two check runs, `ant testFast` and `ant testSystem`) plus the syntax-abstraction runs in (e).
No AST change, so no astgen regeneration and no generated-source churn.

Rows.
Row 270 (a template naming a function declared in the using component) becomes true on the compile path: the api no longer crashes, and the component's expansion disambiguates `mydoublec` to an `FnRef` like written code.
Row 285 (a typed lambda written whole inside one template, applied and passed as a function value) becomes true on the compile path: `ZZ32` in the template is no longer checked in the api, and in the expansion it is disambiguated to a `TraitType`.
Both are stated as expectations from the mechanism; the probe's `u_dblp`, `u_lamp`, `u_app` (and the `q` variants) are the runs that will say so, still behind row 288's prelude shims.
Row 282 (the APL sub-language) does not follow from this alone: `AplMgSyntax` needs `FortressSyntax`/`FortressAst` in the compiler's world (row 288) and its vocabulary is `nat`-typed, which the Scala checker does not implement (`explorations/coordinator/FACTS.md:29`).
This plan removes the template obstacle only; the prelude and the `nat` obstacles stand in front of 282 independently.

## (e) The gate

- `ant testFast` zero failures and `ant testSystem` 382 pass, 0 fail, 0 skip, on a clean build (`explorations/protocol.md` §6).
- The shipped syntax-abstraction tests on the interpreter path as today: `SyntaxAbstractionJUTestAll` (`syntax_abstractions/SyntaxAbstractionJUTestAll.java:33-58`) runs every `*Use.fss` under `interpreterPhaseOrder`, `SXX*` expected to fail.
- The same tests through `fortress compile`. No shipped syntax-abstraction test has ever gone through the compile path or even through the checker: the fast suite's only entry is `ForUse.fss` with "type checking disabled" (`ProjectFortress/TEST-RESULTS/fast-misc/TEST-com.sun.fortress.syntax_abstractions.SyntaxAbstractionJUTest.txt:1-4`; `SyntaxAbstractionJUTest.java`, the list "trimmed to keep testing time quick"; `StaticTestSuite.java:334-335` forces `interpreterPhaseOrder`), and the `transformer/` directory does not parse at all (ledger row 268). Until a compiler-world `FortressSyntax` exists (row 288) this leg runs only behind the probe's prelude shims, and several of those tests use library names the shims do not supply; the gate for this rung is therefore the probe's own matrix, and the shipped tests join it when row 288 is closed.
- The grammar-compile probe re-run behind its shims: `m01`–`m07` all `rc=0` printing `42`; `G_dblp`, `G_lamp`, `G_app` and the `q` variants compile with `rc=0`; `u_*` compile, and `fortress run u_*` prints what `fortress u_*.fss` prints on the interpreter for the same file; the assertion at `StaticChecker.java:264` reports nothing.
- `explorations/apl/probes-4b/` (`y01`–`y03`) through `fortress compile`: blocked today by `nat`-typed `FlatArrays` and the prelude, so their re-cut in `ZZ32` (the probe's `G_*`/`u_*`) stands in for them until then.
- The focused base `explorations/apl/mg/` compiled and `MicroGptAplCheck` 40 of 40 through the compiled path once the prelude and the `nat` checking exist; the goldens are `apl/mg/checks/` (40 of 40 at pool sizes 1 and 4) and the losses in `apl/mg/REPORT.md`.

## (f) The route: prototype without touching a tracked file, then the real edit

Prototype, the way `explorations/perf-probes/prelude/` shadowed `StaticChecker` (`prelude/run-all.sh:33-35`, `prelude/REPORT.md:122-124`) and `grammar-compile/` shadowed the prelude apis.
Directory `explorations/perf-probes/template-check/` with `shadow-src/com/sun/fortress/…` holding copies of the four files, edited, and `shadow-classes/` for their output.
`CP=$(bin/fortress_classpath | tail -1)`; `ProjectFortress/build` is first on it (`bin/fortress_classpath`, the `CLASSPATH=` line), so the shadow directory must be placed before `$CP`.
The two Java files: `javac -nowarn -cp "$CP" -d shadow-classes shadow-src/…/ExprFactory.java shadow-src/…/Transform.java`.
The two Scala files: `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d shadow-classes shadow-src/…/TypeWellFormedChecker.scala shadow-src/…/STypesUtil.scala` (the build drives scalac the same way, `CLAUDE.md`, toolchain paragraph; `third_party/scala/scala-compiler-2.13.18.jar` is on `$CP`). `STypesUtil` compiles to several classes (`STypesUtil$`, the `outFinder` inner objects); all of them land in the shadow, which is what is wanted. If scalac wants more of `scala_src/useful` than the one file, compile that directory into the shadow.
Run from `explorations/perf-probes/grammar-compile/shim/` so the prelude shims apply (`.` first on the source path): `java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "shadow-classes:$CP" com.sun.fortress.Shell compile X.fss`, with `source experiment/env.sh` first; wipe the analysis caches between measurements as the probe did (`grammar-compile/run-all.sh:36-37`).
Outputs numbered beside the script, failures kept, a `REPORT.md` in the probe's form.

The real edit afterwards, file by file, flagged at commit time as edits under the sealed tree (`protocol.md` §4):
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala`, the `NodeTransformer` case.
- `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`, the `NodeTransformer` case and the `node` return in `outFinder`.
- `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java`, the two `makeInParentheses` cases.
- `ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/Transform.java`, the flag carried over in `forTemplateGapOnly` and `defaultTransformationNodeCase`.
- `explorations/fortress-gap-ledger.md`: rows 290 and 291 get their new status; row 288 stays.
- `explorations/repo-internals.md`, "The pipeline, phase by phase": one line saying that expansion is a parse-time step (`syntaxExpand`) and that GRAMMAR rewrites apis only.
No test file needs adding for the gate; `SyntaxAbstractionJUTest`'s trimmed list could be widened later, separately.

## (g) How three other systems order expansion against checking, where it changes a decision here

Racket.
The expander runs to a fixed point first and produces the fully expanded module; Typed Racket is a language whose type checker runs over that expanded program and never sees a macro's template. Errors point at use sites through the syntax objects' source locations.
That is the model this tree already implements for components, and it settles the first decision: skip templates in the api checkers, check expansions as written, add no template cases to the checker.
Racket's `syntax-parse` checks the pattern side of a macro at definition time; Fortress's GRAMMAR phase does the same for patterns (`GrammarRewriter.java:32-51`), and nothing more is owed there.

Scala 3 inline and quoted macros.
An `inline def` or a quoted macro body is type-checked at its definition site, with gaps typed as `Expr[T]`, and expansion happens after the typer on typed trees, the result being re-typed.
That is the paper's §9 "future direction", definition-site checking, and it needs types on gaps; Fortress gaps carry only a nonterminal kind (`Expr`, `Id`).
It settles what this plan does not attempt: no checking of templates, because there is nothing to check them against, and pursuing it would also move name resolution to the definition site, which flips row 270 and changes every APL grammar in `explorations/apl/`.

Template Haskell.
Splices run during type checking of the module, in declaration-group order; a splice's output is then renamed (Haskell's disambiguation) and type-checked exactly as if the programmer had written it. Quotes resolve names at the quote site (referential transparency), with `mkName` as the deliberate escape for use-site capture.
Two things follow. Renaming the output of an expansion is the normal design, and Fortress gets it for free by expanding before DISAMBIGUATE, so a second pass is not owed.
And Fortress's templates today are all `mkName`: every free name resolves at the use site. That is the convenience the APL base relies on and the paper's §8.2 argues against; this plan leaves it as it is and records the question as open, as the extract does (`research/extracts/growing-a-syntax.md`, row R5).
