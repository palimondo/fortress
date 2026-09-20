<!-- Part six of the territory map, written 2026-09-20 for Pavol, who is about to take decisions about the compile path's type checker. Audience: knows Fortress the language, Java and class loaders, and that an interpreter exists; does not know this compiler's internals or the checker's state. It is a walkthrough, not a survey: it follows one program from the command line to a running JVM, one stage per section, and every term is defined where it is first used. Sources are the map's own parts (modules-and-phases.md, spec-to-implementation.md), repo-internals.md, FACTS.md, and the four reports named in section 0; the code was opened at every line cited. Nothing was run and nothing outside this file, INDEX.md and map/README.md was changed. -->

# The compile path, end to end

## 0. How to read this

There are two ways to run a Fortress program in this tree, and this document
follows the second one.

The **interpreter path** is `fortress foo.fss`: the program is parsed, rewritten
a few times, and then walked node by node by a tree-walking evaluator
(`repo-internals.md:123-129`).

The **compile path** is `fortress compile foo.fss` followed by
`fortress run foo`: the program is parsed, rewritten more times, type-checked,
turned into JVM bytecode in a jar, and then run in a second JVM
(`modules-and-phases.md` B.0, B.9).

Both paths run the same code for their first four stages and diverge after
that; the divergence is the subject of sections 4 and 5.

The eight stages below are the stages of the compile path in the order a
program meets them, one section each, and then a glossary. A reader who wants
only the checker can read section 3 and then section 8.

**What each claim rests on.** A claim about the code cites `file:line` in this
tree, opened while writing. A claim about behaviour cites the report that
measured it: `perf-probes/prelude/desugar-codegen.md` (2026-09-20, the
interpreter's library pushed through the compile path's later phases),
`perf-probes/prelude/REPORT.md` (2026-09-16, the same library through the
checker), `reviews/nat-checking-plan.md` (2026-09-16, a plan for `nat` in the
checker), `reviews/array-design-review.md` (2026-09-20, an adversarial review
of the array design, with probes in `compiler-probes/array-design-review/`).
Paths are relative to `explorations/` for reports and to
`ProjectFortress/src/com/sun/fortress/` for source, unless written out.

**Two numbers to keep in mind.** The compile path is 6.8× to 8.9× faster than
the interpreter on the code that does run on it (FACTS, execution model); and
of the target program's three kernels, none compiles today, because the
compiler's own library has no array types (FACTS, execution model; ledger 305).

---

## 1. Parsing and the syntax tree

**The command splits in the shell script.** `bin/fortress` looks at its first
argument: `run` is handed to `bin/run` and never reaches the Java front end;
everything else is handed to the class `com.sun.fortress.Shell`
(`bin/fortress:16-18`, `:32`). So `compile` and `run` are two different JVM
launches with two different class paths, and nothing in `Shell.java` knows
about `run` (`modules-and-phases.md` B.0).

**`Shell` picks a world and a phase order.** `Shell.subMain` is one `if`-chain
over the subcommand (`Shell.java:395-516`). Each arm sets three things: which
**prelude** the run links against (the library a program gets without importing
it), whether the type checker runs, and which list of phases to build. For
`compile` the three are: the compiler world (`useCompilerLibraries()`,
`Shell.java:371-377`), type checking on (`setTypeChecking(true)`,
`Shell.java:405`), and `compilerPhaseOrder` (`phases/PhaseOrder.java:137-147`).

**Parsing happens before the phase list, inside the repository.**
`GraphRepository` is the compilation manager: it builds a graph of the api and
component files reachable on the source path, decides what is stale, parses in
dependency order, and only then calls `Shell.analyze`, which builds and runs
the phase chain (`modules-and-phases.md` B.1, B.10; `Shell.java:1258-1266`).
Apis are parsed all at once; components one at a time, because one component's
user syntax may need another to have been parsed first
(`modules-and-phases.md` B.10).

**There are four grammars, not one.** All four are Rats! packrat grammars whose
Java parsers are generated at build time and checked in
(`modules-and-phases.md` B.2). `ImportCollector` runs first and returns only
the imports, so the system can see which user grammars a component imports
before it can parse it properly. `PreFortress` runs to produce readable syntax
errors. `Fortress` is the real parser. `TemplateParser` is the full grammar
again with holes added, and is the base every generated user-grammar parser
extends. After a successful parse, `parser_util/SyntaxChecker` walks the tree
for the rules the grammar cannot express (`modules-and-phases.md` B.2).

**Juxtaposition and precedence are resolved before the tree exists.** The
grammars call into `parser_util/precedence_resolver/`, whose operator table
`Operators.java` is itself generated from Unicode data
(`modules-and-phases.md` B.2). This matters later: the code generator inherits
juxtaposition from the resolver and has no visitor of its own for it
(`spec-to-implementation.md` §4.1, juxtaposition row).

**The tree is the only intermediate representation.** The AST classes live in
`nodes/`: 1,071 files and 353,318 lines, generated from
`ProjectFortress/astgen/Fortress.ast` and checked in
(`modules-and-phases.md` A.1, A.2). There is no lower intermediate
representation and no optimizing middle: the same tree goes from the parser to
the bytecode writer (`modules-and-phases.md` B.1).

**Where a type will later be written.** Every expression node carries an
`ExprInfo`, and an `ExprInfo` carries a span, a parenthesized flag and an
`Option<Type>` that is empty until the checker fills it
(`ProjectFortress/astgen/Fortress.ast:442`, `:2018`;
`nodes/ExprInfo.java:24, 38`). That one field is the whole of what type
checking adds to the program (section 3).

**A note for reading the Scala.** The same AST has a second face:
`scala_src/nodes/FortressAst.scala` (2,016 generated lines) gives every node a
Scala case class, so the checker pattern-matches on `STraitType`, `SIntArg`
and so on while the Java phases use `TraitType`, `IntArg`
(`modules-and-phases.md` A.2.3). `S`-prefixed names in section 3 are that face
of the same nodes.

---

## 2. Name resolution and grammar expansion

Four phases run before the checker on both paths, in this order:
PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR
(`phases/PhaseOrder.java:137-141`); on the compile path a fifth, integer-literal
folding, follows them (`:142`). The four are the same code on both paths and
differ only by switches, which section 4 takes up.

**PREDISAMBIGUATEDESUGAR.** A rewrite that must happen before names are bound,
because it introduces calls to names: `extends Object` made explicit,
conditional operators (`AND:`, `OR:`) turned into thunks, reductions made
explicit (`desugarer/PreDisambiguationDesugaringVisitor.java:39-52`). One of
its rewrites is compile-path-only and expensive; section 4 returns to it.

**DISAMBIGUATE is where a name becomes a declaration.** `Disambiguator` runs
four visitors in order: `SelfParamDisambiguator`, `TypeDisambiguator`,
`NonterminalDisambiguator` (apis only) and the Scala `ExprDisambiguator`
(`compiler/Disambiguator.java:90, 145, 153, 185, 300, 308, 362`). After this
phase every name is fully qualified, and nothing downstream re-resolves names
(`modules-and-phases.md` B.4).

**Two things it decides that matter later.** First, a bare name that could be a
function becomes an `FnRef` carrying a *candidate set* — every function of that
name in scope — and it carries two such lists: the interpreter's, which is all
matching names, and the "new" one, which is the unambiguous names that the type
checker will narrow (`modules-and-phases.md` B.4;
`compiler/desugarer/OverloadRewriteVisitor.java:107`). The two paths later read
different lists (section 4).

Second, static arguments get their kinds. Everything inside white brackets
parses as a *type* argument — the comment in the code says so, "All Args are
parsed as TypeArgs" (`compiler/disambiguator/TypeDisambiguator.java:663-665`) —
and the disambiguator looks each one up and rewrites it: if the parameter it
names was declared `nat` or `int`, the `TypeArg(VarType k)` becomes
`IntArg(IntRef k)` (`TypeDisambiguator.java:667-697`, the `forKindNat` case at
`:694-697`). This is why sizes reach the checker as a different kind of node
from types, and why they need their own treatment there (section 8).

**GRAMMAR, and the two moments of user syntax.** A user-defined grammar is
compiled in two places at two times (`modules-and-phases.md` B.3). When the
*api* that declares the grammar is analysed, the GRAMMAR phase rewrites the
grammar declarations and parses the template bodies into AST fragments with
holes (`phases/GrammarPhase.java:40`,
`syntax_abstractions/phases/GrammarRewriter.java:72-125`). When a *component*
that imports such a grammar is read, a parser for that grammar is generated on
the spot — a full Rats! run plus a `javac` run in a fresh temporary directory —
the component is parsed with it, and the macro expander `Transform` replaces
every use of user syntax with ordinary AST (`compiler/Parser.java:111-135`,
`:259-281`; `syntax_abstractions/rats/RatsParserGenerator.java:53-66`;
`syntax_abstractions/phases/Transform.java:61`).

The expansion happens in the repository, before any phase runs on the
component (`repository/GraphRepository.java:511`), so the GRAMMAR phase's
position in the phase array applies to apis only, and by phase 1 a program's
user syntax is already gone (`modules-and-phases.md` B.3).

**PRETYPECHECKDESUGAR.** The last phase before the checker. It produces code
that must itself be checked: comprehensions and big operators become
`__generate`/`__bigOperator` calls against the library's reduction objects,
generator lists become `loop` chains, generalized `if`/`while` become
`__cond`/`__whileCond`
(`desugarer/PreTypeCheckDesugaringVisitor.java:142-165, 245, 301, 333-335`).

**INTEGERLITERALFOLDING** follows, on the compile path only
(`phases/PhaseOrder.java:142`): integer-literal expressions are folded to
atoms.

**What is written to disk in between.** Analysis results are serialized as
text — a parenthesized dump of the tree — into `default_repository/caches/`:
`.tfi` for an api, `.tfs` for a component
(`nodes_util/ASTIO.java:92-120`; `repository/ProjectProperties.java:319, 323`).
Two facts about that cache decide a lot of debugging. The file name is the api
name plus a hash **of the source directory path, not of the content**
(`compiler/NamingCzar.java:244-254`), and staleness is decided by file dates
alone (`modules-and-phases.md` B.10). So a cache written under one prelude
poisons the other, and an edit that does not move a date is invisible; the
standing advice is to wipe (`repo-internals.md:152-160`).

---

## 3. The checker

### What it is, and when it runs

The type checker is written in Scala and lives under `scala_src/`: 59 files,
19,419 lines in nine subpackages (`modules-and-phases.md` A.2). The parts that
matter here, measured at HEAD: `typechecker/` 6,388 lines (the driver
`STypeChecker.scala`, 612, plus the standalone checkers beside it),
`typechecker/impls/` 3,086 (the cases, split five ways), `types/` 1,688 (the
subtype lattice, `TypeAnalyzer.scala` 799), `useful/` 3,438 (helpers, of which
`STypesUtil.scala` is 1,961), `typechecker/staticenv/` 682, `overloading/` 540,
`linker/` 494.

It runs only on the compile path. The TYPECHECK phase is in the interpreter's
phase list too (`phases/PhaseOrder.java:130`), but the property
`fortress.compile.typecheck` defaults to false (`Shell.java:1275`) and
`StaticChecker.checkCompilationUnit` returns the tree untouched when the flag
is off (`compiler/StaticChecker.java:163-166`). `walk` additionally calls
`setScala(false)` (`Shell.java:421-422`), which reaches an `Error` saying the
Java checker is gone if checking is ever switched on that way
(`StaticChecker.java:228-229`). There is no command-line switch that makes the
interpreter type-check (FACTS, execution model).

### What runs around it

`TypeCheckPhase` builds the index objects for apis and components, checks the
apis, then the components (`phases/TypeCheckPhase.java:32-58`). For one
component `StaticChecker` runs, in order: an api type extractor, a type
normalizer, a trait table and a `TypeAnalyzer`, a `Thunker` that gives elided
return types thunks, then `STypeChecker.typeCheck`, then well-formedness again,
the overloading rules, export checking and the variance checker
(`StaticChecker.java:196-290`). One of those is switched by path: the variance
checker is skipped when the compiled-expression desugaring is off, with the
comment "Hack: don't run the variance checker if running the interpreter"
(`StaticChecker.java:288-290`).

### How it walks the tree

`STypeChecker` is an abstract class with two abstract methods: `check(node)`
and `checkExpr(expr, expected)` (`typechecker/STypeChecker.scala:403, 419`).
The second takes an *expected type* — the checker is bidirectional: it can push
a type down into an expression as well as read one out, and that expected type
is what drives inference (`:405-417`).

The implementation is mixed in as five traits, and the routing is one pattern
match: a `Component`, `TraitDecl`, `ObjectDecl`, `FnDecl` or `VarDecl` goes to
`Decls`; a function application, `case`, `fn` expression, functional reference,
method invocation, operator application or subscript goes to `Functionals`; an
assignment, chained comparison, juxtaposition or `MathPrimary` goes to
`Operators`; an `Op` or `Link` also to `Operators`; everything else to `Misc`
(`typechecker/impls/Dispatch.scala:59-99`).

`typeCheck` is the only entry external code may call, and it swallows a
`ProgramError` into the error list rather than propagating it
(`STypeChecker.scala:430-440`). Note what it does *not* catch: a `NotYetImple-
mented` error or a `ClassCastException` is not a `ProgramError`, and takes the
whole compile down. That distinction is the whole of section 8's problem.

### What it writes onto the tree

A type, per expression, and nothing else. `SExprUtil.addType` returns the same
expression with the type inserted into its `ExprInfo`
(`scala_src/useful/SExprUtil.scala:60-77`); `getType` reads it back
(`:31`). No new representation is produced, which is why the same `nodes/` tree
continues into desugaring and code generation
(`modules-and-phases.md` B.6).

One more thing is recorded and easy to miss: at a call site the checker chooses
a candidate and records the static arguments it settled on, on the reference
node, for the code generator to mangle into a name later
(`nat-checking-plan.md` §b step 12; `compiler/NamingCzar.java:1888-1910`).

### How mature it is, in today's counts

The measurement is the interpreter's own library — 4,507 lines, 446 top-level
declarations — pushed through the compile path with the checker's failures
caught per declaration (`perf-probes/prelude/desugar-codegen.md` §2.3, §5.1):

| | count |
|---|---|
| checked with no error of its own | 237 |
| checked, errors reported on it | 97 |
| **crashed the checker** | **112** |

The 112 crashes: 81 at `STypesUtil.makeInferenceArg` (the `nat`/`int`/`bool`
kinds), 29 `ClassCastException: TraitType cannot be cast to IntExpr` at
`NodeUpdateVisitor.forIntArg:5310` (a size written out as a static argument),
1 "Type is not inferred", 1 "Not in the trait table"
(`desugar-codegen.md` §5.1).

Three further facts from the same measurement. The prelude apis raise 960
errors, 257 distinct, of which **712 are one rewrite's doing** — the compile
path's own `extends Object` pre-desugaring, section 4 (`desugar-codegen.md`
§4.3). Overload dispatch generation, which consumes the checker's results, ran
**1,046 seconds on this library without emitting a single declaration** and was
stopped by hand (`desugar-codegen.md` §3 caveat 3). And of the code
generator's 313 refusals, only **5** are on declarations the checker had
checked clean (§5.1) — so the distance between the interpreter's library and
bytecode is the checker, not the back end (`desugar-codegen.md` §6).

### What it refuses or has never implemented

- **Non-type static parameters.** `makeInferenceArg` is `NI.nyi()` for
  `KindInt`, `KindBool`, `KindDim`, `KindUnit` and `KindNat`
  (`scala_src/useful/STypesUtil.scala:546-559`). Section 8.
- **Equality of two sizes.** `pEqv(IntArg, IntArg)` returns `pTrue()` under the
  comment "Not handling all static args properly yet"
  (`scala_src/types/TypeAnalyzer.scala:327-337`): today any two sizes are
  equal. Exclusion has the matching hole, "Todo: Handle int, nat, bool args"
  (`:445-451`).
- **Export checking of sizes.** `ExportChecker.equalIntExprs` is `= false` with
  the comment "Not implemented!" (`typechecker/ExportChecker.scala:648`).
- **Non-type where-clause bindings.** `NI.nyi("non-type where clause
  bindings")` (`typechecker/staticenv/KindEnv.scala:126`); type bindings are
  handled (`spec-to-implementation.md` chapter 12 row).
- **Type aliases.** `IndexBuilder` calls `bug("Not yet implemented")`
  (`scala_src/typechecker/IndexBuilder.scala:187`) — and `IndexBuilder` runs on
  both paths, so this one is not compile-path-only
  (`spec-to-implementation.md` chapter 6 row).
- **Templates.** There is no `TemplateGap` or `_SyntaxTransformation` case
  anywhere under `scala_src/typechecker/`, so a program using a user grammar
  cannot be checked as written (FACTS, a user grammar on the compile path).

### How it differs from the interpreter's run-time dispatch

The interpreter never consults a static type. An overloaded name is resolved
per call, on the run-time values, in `OverloadedFunction.bestMatch`
(`interpreter/evaluator/values/OverloadedFunction.java:787`); a failure reads
"Failed to find any matching overload" (`:795`). The compile path instead
generates one dispatch method per overloaded name that tests argument types
from most to least specific (`compiler/OverloadSet.java:1944, 1964`), and the
candidate lists the two start from are different: the interpreter's come from
the disambiguator, the compiler's from the checker
(`modules-and-phases.md` B.7).

The practical consequence, measured: a function declared on a sized subtype and
applied to a value whose *static* type is the unsized supertype is refused by
the checker and runs on the interpreter. Probe `p3_static_dispatch.fss`:
compile path, `(Vec[\RR64\], Vec[\RR64\])->RR64 is not applicable to an
argument of type (Arr[\RR64\], Arr[\RR64\])`; interpreter, prints its answer
(`compiler-probes/array-design-review/p3_static_dispatch.compile.out`,
`.interp.out`). This is how the target program is written throughout, and it is
the first thing a `nat` fix does *not* repair (`array-design-review.md`
finding 1).

---

## 4. Desugaring, overload rewriting, and the switches

### Three desugarings, split by what must be known

The split is by information, not by path (`modules-and-phases.md` B.5).
PREDISAMBIGUATEDESUGAR must precede name binding because it introduces names.
PRETYPECHECKDESUGAR produces code that must itself be checked. DESUGAR runs
*after* checking because getter/setter and coercion rewriting need types
(`compiler/Desugarer.java:36-45`). `Desugarer.desugarApi` is a no-op: an api
comes out unchanged (`Desugarer.java:82-85`).

### The switches, which are what make the two paths differ

Which visitors run is decided by flags on `Shell`, not by the phase list. The
two world-setters are seven and eight lines:

- `useCompilerLibraries()` sets the `extends Object` pre-desugaring **on** and
  assignment desugaring on (`Shell.java:371-377`).
- `useInterpreterLibraries()` sets the `extends Object` pre-desugaring off and
  the compiled-expression desugaring **off** (`Shell.java:379-386`).

Three further getters are gated on `use_scala`, which `walk` turns off
(`Shell.java:421-422`): coercion desugaring (`Shell.java:280-282`), chained
comparison (`:284-286`) and compound/tuple assignment with subscript rewriting
(`:268-270`). The defaults themselves are one block of fields
(`Shell.java:1273-1286`).

Read as a table, for the four desugarings that differ:

| desugaring | interpreter | compile path | site |
|---|---|---|---|
| `extends Object` on unbounded static parameters | off | **on** | `PreDisambiguationDesugaringVisitor.java:134-148` |
| case expressions, type ascription | off | on | `Desugarer.java:123-127`, `:140-144` |
| typecase, bodyless-`FnDecl`-to-abstract | off | on | `PreTypeCheckDesugarer.java:117-126` |
| coercion, chained comparison, assignment/subscript | off (`use_scala` false) | on | `Shell.java:268-270, 280-286` |

Coercion is the sharpest of these: the compile path has coercion and the
interpreter has none at all — no `Coercion` or `coerce` anywhere under
`interpreter/` (`spec-to-implementation.md` §4.1, coercion row).

### The `extends Object` rewrite, and why it is on this page

When the switch is on, every unbounded static parameter is given an
`extends Object` bound (`PreDisambiguationDesugaringVisitor.java:134-148`).
The checker then rejects every instantiation of such a parameter **at a tuple
type**, because a tuple type is not a subtype of `Object` in this checker:
`Ill-formed type: Condition[\()\]`, `Generator[\(T,U)\]`, and so on. On the
interpreter's library that is 712 of the 960 prelude-api errors and 618 of the
1,204 component errors — larger than the 93 tower errors already on record
(`desugar-codegen.md` §4.3). It costs no code-generation failure, because
nothing gets that far.

This is a decision point, not a bug report: the rewrite exists for the compiler
world's own benefit, and the largest single obstacle between one library text
and the compile path is this switch rather than anything in the library.

### DESUGAR itself

Case expressions, coercions, getters and setters, type ascription
(`Desugarer.java:114-147`). Measured on the interpreter's library: DESUGAR and
OVERLOADREWRITE together report **zero diagnostics** on all 4,507 lines
(`desugar-codegen.md` §4.2). Whatever is wrong between that library and the
compile path, it is not the desugaring.

### OVERLOADREWRITE

A reference with several candidates is replaced by a reference to one synthetic
name spelled `f{f1,f2,…}`, and a `_RewriteFnOverloadDecl` declaring it is
appended to the component (`compiler/OverloadRewriter.java:66-92`). The same
class runs on both paths with a flag: `forInterpreter=false` on the compile
path, `true` on the other, and the flag decides which of the disambiguator's
two candidate lists is read (`OverloadRewriteVisitor.java:107`).

Downstream, the interpreter turns that declaration into an
`OverloadedFunction` that searches at run time, and the code generator hands it
to `OverloadSet`, which emits a decision tree (`modules-and-phases.md` B.7).
On the interpreter's library, 100 of the code generator's 313 refusals are on
these synthesized declarations, and that figure is a floor, because dispatch
generation had to be switched off to finish the measurement at all
(`desugar-codegen.md` §3 caveat 3, §5.1).

### The interpreter's own tail, for contrast

After its phase chain the interpreter runs one more rewrite the compiler has no
counterpart for: every variable, function and operator reference is annotated
with its lexical nesting depth, and the result is cached
(`interpreter/env/ComponentWrapper.java:109-114`;
`interpreter/rewrite/DesugarerVisitor.java:61-85`).

---

## 5. Code generation

**What runs.** `CodeGenerationPhase` runs three analyses per component — free
variables, free-variable types, and a parallelism analysis — and then `CodeGen`
(`phases/CodeGenerationPhase.java:183-196`).

**What `CodeGen` is.** One Java file, 6,819 lines, a visitor over the AST
(`compiler/codegen/CodeGen.java:199`) with 45 `public void for…` methods, two
of them helpers, so about 43 node kinds have a case (counted at HEAD).
Anything with no `forX` method reaches `defaultCase`, which throws
`Can't compile <node>` (`CodeGen.java:1668-1670`, `sayWhat` at `:1551-1553`).
So "absent on the compile path" usually means "no visitor"
(`spec-to-implementation.md` §2, codegen column).

**Where the output goes.** The constructor opens the jar immediately —
`bytecode_cache/<dotted component name>.jar`
(`CodeGen.java:392-394`, the cache path from `compiler/NamingCzar.java:132`) —
which is why a failed compile leaves a truncated or zero-byte jar behind
(FACTS, execution model). There is no link step producing a single artifact:
`compile` leaves jars and `run` finds them by class path
(`modules-and-phases.md` B.9).

**How types are lowered.** Every Fortress type becomes a JVM reference type:
traits become interfaces, `RR64` becomes the runtime class `FRR64`, and there
is no `dadd` or `dmul` anywhere in a generated loop — arrays are library
objects over `get`/`put`, not `double[]`
(`repo-internals.md:129`; FACTS, execution model, with the bytecode in
`perf-probes/boxing/javap/`). Classes are written with ASM using
`COMPUTE_FRAMES` (`CodeGen.java:406`), at classfile version 1.6, because the
load-time rewriting of section 6 does not maintain stack-map frames
(`repo-internals.md:129`).

**Generic declarations are emitted once.** A generic trait, object or function
is compiled to a *template* class; the instances are produced later, at class
load (`modules-and-phases.md` B.9, B.11). Section 6.

**What it refuses, deliberately.** Four places compute a boolean called
`canCompile` and throw if it is false:

| site | requires |
|---|---|
| `FnDecl` (`CodeGen.java:2948-2957`) | no where clause, no contract, no unhandled modifiers, **not inside a block** — so no local functions |
| `ObjectDecl` (`:4086-4097`) | no where clause, no throws clause, no contract |
| `TraitDecl` (`:4997-5006`) | the same three |
| `SubscriptExpr` (`:4939-4940`) | no static arguments, an operator present, the object a plain `VarRef` |

Where clauses are therefore refused outright on all three declaration forms
(`:2949`, `:4089`, `:5000`), and a local function is refused with
`Can't compile LetFn` (FACTS, execution model; ledger 304). A `throws` clause
on a function has been accepted since 2011 by a comment in the code, but is
still refused on traits and objects (`:4089`, `:5000`;
`spec-to-implementation.md` chapter 14 row).

**What it refuses by omission**, on the features the target program uses:
`label`/`exit`, `spawn`, array literals (`ArrayElements`), array
comprehensions, and `atomic` in expression position all have no `forX` method
(`spec-to-implementation.md` chapters 5 and 13 rows).

**What it did on the interpreter's library**, once the checker was stepped
around (`desugar-codegen.md` §5.1): 275 declarations emitted, 313 refused. Of
the 313, 227 lacked a type annotation, 55 had no visitor (`Juxt` 53, `Label` 1,
`AmbiguousMultifixOpExpr` 1), 14 were a `nat` static argument, 7 a malformed
overload set, 6 a type-reference or RTTI limit, 2 a kind-environment failure,
2 other. `canCompile` refused **nothing** in this library, and no native
binding was missing. And of all 313, only five were on a declaration the
checker had checked clean: four of them a number where a type was expected
(`nat s0` in a parameter list, `Rank[\1\]` in an extends clause), one a method
call on an intersection-typed receiver (`desugar-codegen.md` §5.1, "The five").

---

## 6. The run: the second JVM and the class loader

**The second JVM.** `bin/fortress run` hands off to `bin/run`, which launches
`com.sun.fortress.runtimeSystem.MainWrapper` (`bin/fortress:16-18`,
`bin/run:41`). The class path puts `bytecode_cache`, `bytecode_cache/*` and
`nativewrapper_cache` **ahead** of the tool class path
(`bin/run_classpath:26`).

**The trap in that ordering.** If the library jars are not in
`bytecode_cache`, the loader silently falls back to frozen stubs compiled from
checked-in Java sources into `ProjectFortress/build/fortress/` — an older
snapshot of `CompilerBuiltin` — and the program dies with a
`NoSuchMethodError` on a method that plainly exists in the `.fss`
(`repo-internals.md:162-182`; `modules-and-phases.md` B.13). The cure is to
compile the five library components in order first; the recipe is in
`repo-internals.md:170-180`. This is a cache problem misread as a compiler bug
for years (`repo-internals.md:152-160`).

**What `MainWrapper` does.** It loads the named class through
`InstantiatingClassloader.ONLY` and invokes its no-argument `main`; the program
arguments are stashed in a static field rather than passed
(`runtimeSystem/MainWrapper.java:19, 27, 65`).

**The class loader is where compiled Fortress stops being ordinary bytecode.**
`InstantiatingClassloader.loadClass` (2,946 lines in the file; the method at
`runtimeSystem/InstantiatingClassloader.java:178`) examines the class *name*
for markers and, for most of them, **generates** the class instead of reading
it (`:227-296`):

- a tuple RTTI class, an arrow RTTI class (`:227-232`);
- a generic function instance, by reading the template and rewriting it
  (`:233-242`);
- a closure (`:243-244`);
- for a name in oxford or angle brackets: arrow interfaces and their abstract
  and wrapped forms, tuple types, concrete and "any" tuples, union types, and —
  the general case — an instantiation of a generic template
  (`:245-280`);
- an RTTI class, translated to flush out symbolic references (`:281-290`);
- otherwise, the bytes as they are (`:292-294`).

**What the rewriting is.** `Instantiater` is an ASM `ClassVisitor` holding two
substitution maps, one for types and one for operators; `visit` replaces the
class's own name, its superclass and each interface with the substituted name
(`runtimeSystem/Instantiater.java:26-38, 47-58`). The bracket and mangling
conventions are `runtimeSystem/Naming.java` (1,203 lines).

**What it does not do.** *Instantiation renames; it does not change
representation* (`modules-and-phases.md` B.11, and the same conclusion in the
map's summary, `map/README.md` §2). There is no mechanism for giving one
instantiation a different field shape from another: the expando hook that would
do it is a stub, `if (false) { // Here will go all the magic expando-stuff. }`
(`InstantiatingClassloader.java:168-171`). A probe in the array review confirms
that stamping cannot produce a `double[]` field
(`array-design-review.md` Q4).

**What it does with a size in a type, today.** The compiler mangles a size into
the instantiation name: `NamingCzar` maps `KindNat` and each `IntArg` to the
tag `Naming.XL_INTNAT` (`compiler/NamingCzar.java:1826-1832`, `:1888-1910`).
Nothing reads it back. The runtime's generic RTTI class holds one field per
static parameter, all typed as type RTTI, and the only kind the runtime
consults is `opr` (`InstantiatingClassloader.java:1600-1622`;
`Naming.java:95-108`); `XL_INTNAT` is declared at `Naming.java:213` and that is
its only runtime mention. Measured consequence: a `nat` used in *value*
position compiles to a `getstatic` of a class the loader cannot produce and
dies at run time with `NoClassDefFoundError`
(`array-design-review.md` §1b, probe 6). And the code generator refuses a size
in an `extends` clause before that, with
`CompilerError("Only emitting RTTI for types right now")`
(`CodeGen.java:5793`).

**The rest of the runtime.** A compiled program's entry class extends
`FortressExecutable`, whose static initializer creates one work-stealing pool
sized by `FORTRESS_THREADS` (`runtimeSystem/FortressExecutable.java:22-56`).
Transactions are static methods on `BaseTask` that generated code calls
(`runtimeSystem/BaseTask.java:180-260`). Both are duplicated: the interpreter
has its own independent task and transaction implementations under
`interpreter/evaluator/` (`modules-and-phases.md` B.11), so a fix in one is not
a fix in the other. Two one-line defects on this side — an eagerly built debug
string in `BaseTask.inATransaction()` and a float literal kept as a `String`
and re-parsed per use — were repaired on 2026-09-17 and are on record with
their before/after numbers (FACTS, execution model).

---

## 7. Native bindings in both worlds

The two paths bind Java code by two mechanisms that share nothing but the word
"native" (`modules-and-phases.md` B.12).

**The interpreter: `builtinPrimitive`.** A function whose body is literally
`builtinPrimitive("some.java.Class")` is pattern-matched by
`NativeApp.checkAndLoadNative` (`interpreter/glue/NativeApp.java:157-215`,
the test at `:188`), and that class — a subclass of `NativeFn0..3` or
`NativeMeth0..3` under `interpreter/glue/` — is loaded reflectively and takes
the evaluator's boxed values directly. There are 231 such bindings in
`LibraryBuiltin/FortressBuiltin.fss`, 108 in `Library/FortressLibrary.fss` and
7 in `LibraryBuiltin/NativeArray.fss`; 427 across the whole interpreter world
(`modules-and-phases.md` B.12; `perf-probes/prelude/REPORT.md`, quoted in
FACTS).

**The compile path: `import java`.** A `.fss` writes
`import java com.sun.fortress.nativeHelpers.{class.method => name, …}` — 16
such lines in `LibraryBuiltin/CompilerBuiltin.fss`, 3 in
`Library/CompilerLibrary.fss`. `ForeignJava` reads the Java class with ASM and
synthesizes a Fortress api for it
(`repository/ForeignJava.java:132-136, 565-575`), and `FortressTransformer`
rewrites the class into a wrapper whose methods take and return the compiled
world's boxed values, written into `nativewrapper_cache`
(`compiler/nativeInterface/FortressTransformer.java:33, 37`). The helpers
themselves are plain static Java methods: `nativeHelpers/`, 24 classes,
2,377 lines (`modules-and-phases.md` A.2).

**A third route, easy to miss.** `import java` also works on the interpreter
path: `ForeignComponentWrapper` populates an environment from `ForeignJava`'s
synthesized declarations (`interpreter/env/ForeignComponentWrapper.java:59`)
and `ClosureMaker` generates a `NativeFn<n>` subclass at run time
(`interpreter/env/ClosureMaker.java:44-52`). No test under
`ProjectFortress/tests/` uses it, so whether it still works on this toolchain
is unknown (`modules-and-phases.md` B.12, "Not verified").

**In the other direction** there is nothing: a Fortress program can be called
from Java only by loading its generated classes through
`InstantiatingClassloader`, which is what `MainWrapper` does
(`modules-and-phases.md` B.12).

**Why this matters for a checker decision.** If the interpreter's library ever
becomes the compile path's prelude, its 108 `builtinPrimitive` bindings must be
redone as `import java`. That is the *smallest* part of the job:
`nativeHelpers/` already ships 355 static methods covering about 79 of the 108
by another name, and the measurement's own ordering is "implement `nat` in the
checker; fix or relax the tower errors; port the native bindings"
(FACTS, the interpreter's library fed to the compiler). Code generation found
**no** missing native binding when it was run over that library
(`desugar-codegen.md` §5.1).

**One constraint worth knowing before designing storage.** A foreign helper
cannot be generic: `import java` binds static methods with fixed types
(`array-design-review.md` finding 2), so a native cannot be the thing that
chooses a representation per element type.

---

## 8. `nat`: a size in a type

### What the specification says it is

A `nat` static parameter is the keyword `nat` followed by an identifier, in the
same white brackets as a type parameter
(`Specification/basic/trait-parameters.tex:68-81`). Three sentences fix its
meaning. "These parameters are instantiated at runtime with numeric values"
(`:82`) — so a size is not erased. A `nat` parameter "may be used to
instantiate other `nat` parameters, or to appear in any context that a variable
of type `N32` can appear, except that it cannot be assigned to" (`:83-86`) — so
in value position it is a read-only number, and in type position it may only
instantiate other sizes. And the chapter's single example is exactly an array
shape: `makeVector[\T extends Number, nat s0\](): Vector[\T,s0\]`
(`:94-97`), one symbol occurring in the parameter list and in the return type,
which must agree.

The chapter opens with its own status note: "Non-type static parameters and
static expressions are not yet supported. The examples in this chapter are not
tested nor run by the interpreter." (`:15-17`). So the gap is not a regression;
the team shipped the specification saying so (`nat-checking-plan.md` §a).

Sizes were meant to check shapes, not to optimize anything: the spec builds no
optimization on them anywhere (FACTS, execution model). The one recorded
implementation stance in the team's own internal appendix is "don't
instantiate" — the checker treats a size as opaque, two different literals are
different types, and arithmetic on sizes is not something the checker reasons
about (`nat-checking-plan.md` §a, from
`Specification/appendices/internal-document.tex:182, 206`).

### Where sizes actually occur

The interpreter's library has 81 declarations with `nat`/`int`/`bool`
parameters; the target program's array vocabularies have 30 and 27; the
compiler's own prelude has exactly **one**, and it is empty:
`trait Matrix[\T, nat s0, nat s1\] extends Object end`
(`Library/CompilerLibrary.fss:512`; census in `nat-checking-plan.md` §d). In
every one of them the arguments are symbols and literals; the census found no
arithmetic inside white brackets in the library or either vocabulary
(`nat-checking-plan.md` §d) — with three exceptions in storing objects that a
later review found (`array-design-review.md` finding 5), which matters if the
rule adopted is "refuse arithmetic".

That the compiler prelude has one empty `nat` declaration is the shape of the
whole problem: the compiler's library is written to stay inside what the
checker can do (`spec-to-implementation.md` §4.3; FACTS, ledger 307).

### What the checker lacks, in three parts

**Representation.** There is no inference variable for a size. When the checker
needs to infer static arguments at a call, it makes one fresh variable per
static parameter; for a type parameter that is `TypeArg(_InferenceVarType)` and
for an operator parameter `OpArg(_InferenceVarOp)`, and for `KindNat`,
`KindInt`, `KindBool`, `KindDim` and `KindUnit` it is `NI.nyi()`
(`scala_src/useful/STypesUtil.scala:546-559`). That call is reached from
ordinary call-site inference and from the overloading checker alike, which is
why the crash appears twice when a library is checked
(`nat-checking-plan.md` §b). Two representations are on the table: a new AST
node `_InferenceVarInt` beside the existing two, which is symmetric but
regenerates every visitor class; or an `IntRef` with a reserved name, which
needs no AST change and can therefore be prototyped under a classpath shadow
(`nat-checking-plan.md` §c, "Representation").

**Equality.** Two sizes are compared in exactly one place, and today it says
yes to everything: `case (_: IntArg, _: IntArg) => pTrue()`, under the comment
"Not handling all static args properly yet"
(`scala_src/types/TypeAnalyzer.scala:332`). Exclusion has the twin hole
(`:445-451`), and the export checker's `equalIntExprs` is `= false`
(`typechecker/ExportChecker.scala:648`). The rule the plan proposes is the
interpreter's own: a literal must equal a literal, a symbol equals itself, a
symbol is not a literal, and an inference variable takes an equality constraint
— which is a port of `IntNat.unifyStaticArg`
(`interpreter/evaluator/types/IntNat.java:127-147`;
`nat-checking-plan.md` §c, "Rules").

**Inference.** The constraint solver has two tracks, types and operators: `And`
carries a map per type variable and a map per operator variable
(`scala_src/typechecker/Formula.scala:50`), and `solve` returns a pair of
substitutions (`:420-460`). A size needs a third track, unified as the operator
track is, by cliques with structural equality
(`nat-checking-plan.md` §c, §"What it touches"). One more hole travels with it:
`hasInferenceVars` looks only for type variables
(`STypesUtil.scala:778-789`), so an unsolved size would leak silently into a
generated name instead of producing "not enough context".

**Size of the change, and the caveat on it.** About 24 functions in five Scala
files, 200-300 lines, most of it the mechanical third track in `Formula.scala`;
no catalogued test flips; five compiler tests must stay green
(`nat-checking-plan.md` §d). The caveat: the plan's "no Java" is unproven — one
of the two known crashes has Java frames, in the static-type replacer, and six
Java files in `compiler/` handle `IntArg`
(`array-design-review.md` finding 6). The instrument that settles it is a
shadow session (edited copies compiled and put first on the class path), which
has been done once before for a checker plan and gated green
(FACTS, the template-checking fix), and has not been done for this one
(`array-design-review.md` §1b).

### What the loader and the code generator lack

Section 6 in one paragraph: the size is mangled into the instantiation name
(`NamingCzar.java:1826-1832`, `:1888-1910`) and nothing reads it back — the
runtime consults only the operator kind (`Naming.java:95-108`), the generic
RTTI class has no size field (`InstantiatingClassloader.java:1600-1622`), a
size in an `extends` clause is refused outright
(`CodeGen.java:5793`), and a size in value position compiles to a reference the
loader cannot satisfy (`array-design-review.md` §1b, probe 6). So the first
sized object that compiles will need work in Java after the checker work in
Scala; the review counts at least three gated batches where the design counted
two (`array-design-review.md` finding 6).

### The thing a `nat` fix does not fix

The target program's values carry their sizes at run time and not in their
static types: `array[\E\](n)` reflects `n` into a size and returns the *unsized*
`Array[\RR64,ZZ32\]`, and the interpreter then dispatches on the run-time
object. On the compile path the static type is what is consulted, so the
applications fail even with no `nat` in sight — probe `p3_static_dispatch`
above (`array-design-review.md` finding 1). Teaching the checker sizes makes
sized *declarations* checkable; making the model's *applications* check is a
separate decision about how the model is typed.

### Four precedents, and what each would mean here

These four are background from outside this tree — nothing in the repository
documents them — offered because each one already took a decision that is now
in front of us. The in-tree consequence after each is cited.

**Dependent ML.** Xi and Pfenning's design indexes types by a separate, decidable
domain of integers, with constraints solved by an arithmetic solver, precisely
so that dependent types do not drag full term evaluation into type checking.
Here it names the boundary question: whether sizes live in a small language of
their own with a solver behind them, or stay symbols and literals compared by
equality — which is what the plan proposes and what the team's own "don't
instantiate" stance implies (`nat-checking-plan.md` §a, §c).

**X10's constrained types.** X10 attaches boolean constraints to types —
`Array[T]{rank==2}` — and discharges them with a pluggable constraint solver,
which buys array-shape checking at the cost of a solver in the compiler and a
constraint language in the surface syntax. Here it is the shape of the *next*
step past equality, and the reason to take equality first: Fortress already has
the syntax for it, a where clause with an `IntConstraint`
(`ProjectFortress/astgen/Fortress.ast:1485-1496`), and the checker ignores
where clauses entirely (`STypesUtil.scala:625`;
`typechecker/staticenv/KindEnv.scala:126`).

**Haskell's type-level naturals.** `GHC.TypeLits` gives a kind of naturals with
literals and type-level arithmetic that the compiler solves only for closed
literals — real algebra needs a normalizing solver supplied as a plugin — plus
a `KnownNat` dictionary to read a size back as a value. Here the second half
already exists (`LibraryBuiltin/NatReflect.fsi` reflects a size to a number),
and the first half is the honest price of arithmetic in types, which is why the
plan draws its line at symbols and literals and refuses `Vector[\T, n+1\]` as
ill-formed rather than promising to check it (`nat-checking-plan.md` §c, §g).

**C++ non-type template parameters.** `template<size_t N>` instantiates a
distinct class per value, equality of sizes is syntactic identity after
constant folding, and the size is a compile-time constant with no run-time
representation at all. Here it is the contrast that matters most: Fortress
sizes are "instantiated at runtime with numeric values"
(`trait-parameters.tex:82`), the interpreter really does evaluate `+`, `-` and
`*` on them while instantiating
(`interpreter/evaluator/EvalType.java:431-464`), and the class loader stamps by
name only (section 6) — so C++'s per-value specialization is *not* what this
loader does, and any plan that assumes a size disappears at compile time is
assuming the wrong runtime.

### What is a decision, not a fact

Four things the record leaves to Pavol, each already stated in a report:
whether the inference variable is a new AST node or a reserved name
(`nat-checking-plan.md` §c); what an unconstrained size does — default to 0, or
be an error at first use as the interpreter does, with the six library
declarations that carry dead sizes as the test case
(`nat-checking-plan.md` §c; `array-design-review.md` finding 7); whether
arithmetic inside white brackets is refused as ill-formed, which three library
storing objects would then fail (`array-design-review.md` finding 5); and
whether the checker rung is scheduled before or after a shadow session has
shown where the crash actually lives (`array-design-review.md` §1b).

---

## 9. Glossary

**AST** — abstract syntax tree; here, the classes under `nodes/`, generated
from `astgen/Fortress.ast`, and the only intermediate representation in either
path (`modules-and-phases.md` B.1).

**api / component** — the two kinds of compilation unit: an api is an interface
(`.fsi`), a component an implementation (`.fss`). Their analysed forms are
cached as `.tfi` and `.tfs` (`repository/ProjectProperties.java:319, 323`).

**bidirectional checking** — checking an expression with an expected type
pushed down into it, rather than only reading a type out; the second argument
of `checkExpr` (`typechecker/STypeChecker.scala:405-419`).

**bytecode cache** — `default_repository/caches/bytecode_cache`, one jar per
compiled component, and the first entry on the run class path
(`NamingCzar.java:132`, `bin/run_classpath:26`).

**candidate set** — the list of functions a name could refer to, attached to a
reference by the disambiguator; there are two, and the paths read different
ones (`OverloadRewriteVisitor.java:107`).

**desugaring** — a tree-to-tree rewrite that replaces a surface construct with
a simpler one; three phases of it here, gated by switches on `Shell`
(section 4).

**gate** — the check a change must pass: `ant testFast` (about 1,377 tests) and
`ant testSystem` (382), zero failures, on a clean build
(`protocol.md` §6).

**IntArg / IntExpr / IntRef / IntBase** — the AST nodes a size travels in: an
`IntArg` holds an `IntExpr`, which is a literal (`IntBase`), a symbol
(`IntRef`) or an arithmetic node (`Fortress.ast:1275-1348`).

**`nat` parameter** — a static parameter whose argument is a number rather than
a type; a size in a type (section 8).

**phase** — one named step in the list built from `PhaseOrder`; the two paths
are two arrays in one file (`phases/PhaseOrder.java:125-147`).

**prelude** — the library a world links without an import: `FortressLibrary` +
`FortressBuiltin` + `AnyType` for the interpreter, `CompilerLibrary` +
`CompilerBuiltin` + `AnyType` for the compiler
(`compiler/WellKnownNames.java:113-137`).

**sayWhat** — the code generator's refusal: `Can't compile <node>`, thrown from
`defaultCase` for any node with no visitor (`CodeGen.java:1551-1553`,
`:1668-1670`).

**shadow** — a way to prototype an edit to the sealed tree without changing it:
compile edited copies of the files and put the class files first on the class
path (`map/README.md` §0; FACTS, the template-checking fix).

**static parameter / static argument** — what stands between white brackets in
a declaration (`[\T, nat s0\]`) and in a use (`[\RR64, 16\]`). Five kinds
exist; the checker implements two (`STypesUtil.scala:546-559`).

**stamping** — producing a class for one instantiation of a generic by
rewriting a template's bytes at class-load time; it renames and does not change
representation (`Instantiater.java:47-58`; `modules-and-phases.md` B.11).

**template (two senses)** — in syntax abstraction, the body of a grammar rule
with holes in it (section 2); in code generation, the single class emitted for
a generic declaration and stamped at load time (sections 5 and 6). They are
unrelated.

**world** — which prelude a run links against; set per subcommand by
`useCompilerLibraries` / `useInterpreterLibraries`
(`Shell.java:371-386`).
