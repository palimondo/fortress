<!-- Produced by the delegated aliases/units research worker, 2026-08-27.
     Probes: explorations/alias-units-probes/ (all run; captured output in
     probe-run.log there). Coordinated per explorations/microgpt-iteration2-plan.md.
     Design journal: explorations/microgpt-native.md. -->

# Type aliases, dimensions and units — spec, implementation, and microgpt2

Spec read from `Specification/`. Every chapter cited is **byte-identical** in `Specification-1.0-frozen/` (`diff -q` silent on `fortress/preamble.tex`, `basic/types-vals-vars.tex`, `basic/dimensions.tex`, `basic/declarations.tex`, `basic/trait-parameters.tex`, `advanced/defining-dimensions.tex`, `basic-lib/dimensions.tex`).

Classification: **(I)** implementation gap · **(D)** design limit (spec itself forbids/omits) · **(S)** spec-declared not-yet-supported.

## The one-line answer to both questions

The spec's own canonical list of unimplemented features names both, side by side — `Specification/fortress/preamble.tex`:

```
:56   The not-yet-supported features include:
:59   \item multifix operators
:63   \item keyword and varargs parameters
:79   \item dimensions and units
:81   \item type aliases
```

Note the company: `multifix operators` is expressiveness-review finding 8; `keyword and varargs parameters` is the gap `microgpt2.fss:260-264` already records. **This list is a reliable oracle and is itself page-worthy content**: Fortress shipped a specification of a language larger than its implementation, and said so in print.

---

# Q1 — Type aliases

## Q1.1 The spec has exactly the feature asked for

`Specification/basic/types-vals-vars.tex:597-623`, section **Type Aliases** (`\seclabel{type-alias}`):

```
:601  TypeAlias ::= type Id [StaticParams] = Type
:605  Fortress allows names to serve as aliases for more complex type
:606  instantiations. …
:610  Parameterized type aliases are allowed but recursively
:611  defined type aliases are not.
```

Spec's three worked examples (ASCII source `:612-614`, typeset `:616-618`):

```
type IntList = List[\ZZ64\]
type BinOp = Float BY Float -> Float
type SimpleFloat[\nat e, nat s\] = DetailedFloat[\Unity,e,s,false,false,false,false,true\]
```

And decisively for Q3:

```
:621  All uses of type aliases are expanded before type checking.
:622  Type aliases do not define new types nor
:623  nominal equivalence relations among types.
```

`type KVCache = List[\Mat\]` **is** the spec's `type IntList = List[\ZZ64\]` with different names, and it is *transparent* — no new type, no lifting, no unwrapping. That transparency is why it would be cheap, and why nothing else substitutes for it.

Legal positions, from the spec's own grammar (`Specification/appendices/grammars/concrete-syntax.tex`):

| Position | Spec | Verdict |
|---|---|---|
| top-level component decl | `:177-184` (`Decl ::= … \| TypeAlias`) | allowed |
| API decl | `:189-197`, `basic/components/apis.tex:29` | allowed |
| `where` clause constraint | `:513` (`WhereConstraint ::= … \| TypeAlias`) | allowed |
| trait/object member | **absent** from the trait-member productions | **not allowed (D)** |

Spec's own warnings: `basic/types-vals-vars.tex:18-19` ("Dimensions and units, type aliases … are not yet supported"); `basic/declarations.tex:16-20` (same list, longer). Wanted-but-weaker-than-desired: `appendices/future.tex:75-96` lists **"More powerful type aliases"** (type-level functions, `type Double[\F extends FloatNumber[…]\]…`) as future work — so the 1.0 alias is deliberately the simple expand-before-typecheck kind.

## Q1.2 The implementation is half-wired — and the half that exists is the *expansion*

| Layer | Status | Evidence |
|---|---|---|
| Fortify (typesetter) | **full** | `Fortify/fortify.el:3998` — `("type" KEYWORD)`. A `type` line would typeset correctly. |
| Parser | **full** | `parser/OtherDecl.rats:102-115` builds a real `TypeAlias` node; `parser/Declaration.rats:41-50` admits it in `Decl`/`AbsDecl`. `fortress parse p1_alias_basic.fss` → `Ok`. |
| AST | **full** | `nodes/TypeAlias.java`, `WhereTypeAlias.java` + template/ellipses/visitor variants (55 files mention `TypeAlias`) |
| **Compiler index** | **DEAD END** | `scala_src/typechecker/IndexBuilder.scala:187` — `case d:TypeAlias => bug("Not yet implemented: " + d)` |
| Type analyzer | **implemented, unreachable** | `scala_src/types/TypeAnalyzer.scala:552-557` *does* expand: `case ti: TypeAliasIndex => walk(substitute(a, params, ti.ast.getTypeDef))`. `compiler/index/TypeAliasIndex.java` exists. Nothing can construct one — IndexBuilder `bug()`s first. |
| Interpreter env | **stub** | `interpreter/evaluator/BuildEnvironments.java:987-993` — `forTypeAlias` is `// TODO Auto-generated method stub; return Boolean.valueOf(false);`. Same at `EvalVarsEnvironment.java:109-112`. |
| Tests | **parse-only** | Only in-tree use: `ProjectFortress/parser_tests/DeclTest.fss:15` — `type IntList = List[\ZZ32\]`. `parser_tests` is driven by `ParserJUTest.java:34-42`, which only parses. Zero uses in `Library/`. |

**So the revival task is small and well-localised:** implement `buildTypeAlias` in `IndexBuilder` (put a `TypeAliasIndex` in `typeConses`) and the already-written `TypeAnalyzer` path takes over statically; the interpreter additionally needs `forTypeAlias` to bind the name (or a pre-walk expansion pass).

## Q1.3 Probes (verbatim)

**`p1_alias_basic.fss`** — spec's own first example:
```
type IntList = List[\ZZ64\]
sum2(xs: IntList): ZZ64 = SUM [ x <- xs ] x
```
```
** bug! Not yet implemented: TypeAlias at …/p1_alias_basic.fss:10.1
	at com.sun.fortress.Shell.walk(Shell.java:1166)
```
`fortress parse` on the same file → `Ok`. **(I)**

**`p2_alias_minimal.fss`** (`type Idx = ZZ32`, no imports) — all three paths:
- walk → `** bug! Not yet implemented: TypeAlias at …:8.1`
- `typecheck` → same + `File p2_alias_minimal.fss has 1 error.`
- `compile` → same

**`p3_alias_param.fss`** (`type Pair[\T\] = List[\T\]`, spec `:610`) → same bug at `:10.1`. **(I)**

**`p7_alias_api.fsi/.fss`** — alias in an API (spec `basic/components/apis.tex:29`) → `** bug! Not yet implemented: TypeAlias at …/p7_alias_api.fsi:6.1`. **(I)** — `IndexBuilder.buildCompilationUnitIndex` is shared by components and apis (`isApi` flag); no api escape hatch.

**`p4_alias_where.fss` / `p5_alias_where_used.fss`** — the `where`-clause alias (spec `basic/declarations.tex:237`, grammar `concrete-syntax.tex:513`). p4, alias declared but unused: `f[\T\](x: T): ZZ32 where { type U = T } = 1` → **`f = 1`** (accepted). p5, alias used as a type: `f[\T\](x: U): U where { type U = T } = x` →
```
…/p5_alias_where_used.fss:10:11:
    U is undefined.
…/p5_alias_where_used.fss:10:15:
    U is undefined.
```
**(I)** — accepted and silently discarded. Same shape as expressiveness-review finding 2's `p16_covar.fss`.

**`p6_alias_in_object.fss`** — alias inside an object body →
```
null…/p6_alias_in_object.fss:10:7:
    Syntax Error
```
**(D) design limit, not a gap.** The spec's grammar puts `TypeAlias` only in `Decl`/`AbsDecl` (`concrete-syntax.tex:182,194`) and `WhereConstraint` (`:513`) — never in a trait/object member list. `Declaration.rats:41-50` agrees exactly. Nothing was missed.

## Q1.4 Nearest working substitutes, probed

**A — empty trait extension. Does not work, and cannot.** `p8_trait_subst.fss`:
```
trait Logits extends List[\RR64\] end
peek(x: Logits): RR64 = x[0]
… v: List[\RR64\] = <|[\RR64\] 1.0, 2.0|>; peek(v)
```
```
com.sun.fortress.exceptions.ProgramError: …/p8_trait_subst.fss:17:21-26:
Unification error: Closure/Constructor for peek param 1 (x:Logits) got arg ArrayList[\RR64\] of type ArrayList[\RR64\]
```
**(D).** A trait extension makes `Logits <: List[\RR64\]` — the arrow points the wrong way. To make ordinary lists members of `Logits` you would have to edit `Library/List.fss`. This is structurally why the spec has a separate `type` construct, and exactly what `types-vals-vars.tex:622-623` means.

**B — carrier object. Works. This is the route.** `p9_carrier_subst.fss`, two six-line carriers, same representation, different names, on the library's generator traits:
```
object Vec(xs: List[\RR64\])      extends { Rank1V, ZeroIndexed[\RR64\], DelegatedIndexed[\RR64,ZZ32\] } …
object ProbDist(xs: List[\RR64\]) extends { Rank1V, ZeroIndexed[\RR64\], DelegatedIndexed[\RR64,ZZ32\] } …
softmax(z: Vec): ProbDist = …
```
```
softmax = <|0.09003057317038046, 0.24472847105479767, 0.6652409557748219|>
sums to 1.0
```
Deliberate substitute — but **not an alias**: a new nominal type, values lifted in and unwrapped out at every boundary, no interoperation with the underlying type. (Prior art: expressiveness-review finding 4 / `p14_genwrap.fss`; microgpt2 already uses it for `Vec`/`Mat`.)

**C — import alias (`as` / `=>`). Parses, does nothing.** Spec `basic/components/source-code.tex:93` (`AliasedSimpleName ::= Id [as Id]`), `:154-160` for the api form. This is the *only* aliasing mechanism the spec places outside `type`. Three findings:

1. **Surface syntax diverges from the spec.** Spec writes `as`; the parser writes `=>` — `Compilation.rats:303-306` grammar comment (`Id (w => w Id)?`) and `Symbol.rats:234` (`transient void match = "=>" / "⇒";`).
   ```
   import List.{ List as Seq, ... }  →  …/p10_import_as.fss:9:15-36:  Missing comma.
   import List.{ List as Seq }       →  …/p11_import_as_only.fss:9:15-24:  Missing comma.
   ```
   **(I)** — a spec/impl syntax divergence.
2. With `=>` the import **parses** but binds nothing in the type namespace (`p12_import_arrow.fss`):
   ```
   import List.{ List => Seq, ... }
   heads(x: Seq[\ZZ32\]): ZZ32 = x[0]
   →  …/p12_import_arrow.fss:14:10-11:
          Seq is undefined.
   ```
3. Nor in the value namespace — second data point ruling out "type namespace only" (`p13_import_arrow_value.fss`):
   ```
   import List.{ emptyList => nil, ... }
   →  …:9:26-34:  Function nil is not defined.
   ```
   **(I).** Even working it would be *partial*: the grammar renames a **name**, never an **instantiation**. There is no way to write `List[\Value\] as Vec`. Only `type` can name an instantiation.

**D — a comment.** Always works, costs nothing, checks nothing. `microgpt2.fss:213-217` already does this well. It is the honest baseline against which any carrier's cost must be measured.

## Q1.5 Q1 verdict

**Fortress specifies type aliases exactly as asked, and the 2012 implementation does not have them.** One unimplemented case (`IndexBuilder.scala:187`), downstream expansion already written and unreachable (`TypeAnalyzer.scala:552-557`). **(I), small, well-localised.** Substitutes: carrier = a different thing (new nominal type); trait extension = **(D)**; alias in a trait body = **(D)**; import alias = another **(I)** and only partial anyway.

Proposed revival-worklist rows:

| Item | Spec | Evidence | Payoff |
|---|---|---|---|
| Type aliases (`buildTypeAlias` in IndexBuilder + interpreter binding) | `basic/types-vals-vars.tex:597-623` | `p1/p2/p3/p7`: `** bug! Not yet implemented: TypeAlias`; expansion at `TypeAnalyzer.scala:554` | signatures name spaces (`Logits`, `KVCache`) at zero runtime cost, zero lifting |
| Import alias binding (`=>`; and `as` per spec) | `basic/components/source-code.tex:93` | `p12`: `Seq is undefined`; `p13`: `Function nil is not defined`; `p10/p11`: `Missing comma` | renaming imports; fixes a spec/impl syntax divergence |

---

# Q2 — Dimensions and units

## Q2.1 What the spec promises — three chapters plus a library chapter

**`Specification/basic/dimensions.tex` (258 lines), "Dimensions and Units".** Header note `:15-17`: *"Dimensions and units are not yet supported. The examples in this chapter are not tested nor run by the interpreter."*
- **Type grammar** `:20-56`: `DimType ::= DimRef | TypeRef DimRef | TypeRef · DimRef | TypeRef / DimRef | TypeRef per DimRef | TypeRef UnitRef | … | TypeRef in DimRef`; `StaticArg` closed under `·`, juxtaposition, `/`, `^`, `per`, plus `square`/`cubic`/`inverse` (prefix) and `squared`/`cubed` (postfix).
- **Expression grammar** `:58-70`: `UnitExpr ::= UnitRef | Expr UnitRef | Expr · UnitRef | Expr / UnitRef | Expr per UnitRef | Expr in UnitRef`.
- **Library promise** `:78-119`: SI units (§`lib:siunits`) + English units (§`lib:englishunits`); 34-entry default dimension→unit table (Length/meter … MassDensity/kilograms per cubic meter); plurals are synonyms; SI prefixes on both name and symbol (`nanometer`, `nm`, 10⁻⁹).
- **The worked example** `:132-143`: `x: RR64 Length = 1.3 m_` / `t: RR64 Time = 5 s_` / `v: RR64 Velocity = x / t` / `w: RR64 Velocity in nm_/s_ = 17 nm_/s_` / `… in furlongs per fortnight`.
- **Rendering** `:84-88`: `m_` renders roman `m`, distinct from italic variable `m`.
- **Algebra** `:147-168`: free abelian group; rational powers whose numerator and denominator are `nat`-parameter instantiations; `square`/`cubic`/`inverse`/`squared`/`cubed` are *syntactic sugar expanded before type checking*.
- **Semantics** `:170-202`: dimensionless × unit = dimensioned value; `(17 nm)/s`; `in` converts by canonical-value ratio (`1.3 m in nm = 1 300 000 000 nm`); type × unit = dimensioned type (`RR64 meter`).
- **The payoff, stated** `:206-215`: *"…certain programming errors may be detected at compile time. When dimensioned values are added, subtracted, or compared, it is a static error if the units do not match. When dimensioned values are multiplied or divided, their units are multiplied or divided. When taking the square root of a dimensioned value, the unit of the result is the square root of the argument's unit. Other numerical functions, such as sin and log, require dimensionless arguments."*
- **Boxing story** `:217-253`, with Guy Steele's own note at `:244`: unit info is *static* (part of the type), erased exactly when type info is.

**`Specification/advanced/defining-dimensions.tex` (427 lines), "Dimension and Unit Declarations".** Header note `:15`: *"Dimensions and units are not yet supported."*
- Grammar `:17-30`: `DimUnitDecl ::= dim Id [= Type] (unit|SI_unit) Id+ [= Expr] | dim Id [= Type] [default Id] | (unit|SI_unit) Id+ [: Type] [= Expr]`
- Dimensions `:32-92` (`dim Length`; `dim Velocity = Length / Time`); units `:94-241` (`unit newton: Force = meter · kilogram / second^2`; `3 miles in kilometers` worked to `25146/15625` at `:221-225`; the `unit radian = meter/meter` vs `= 1 meter/meter` subtlety at `:227-240`).
- Abbreviations `:243-361`: synonym name lists (`unit foot feet ft_: Length`); `SI_unit` generates all 20 prefixed forms (yotta…yocto) on names *and* symbols; the collapsed `dim Length SI_unit meter meters m_`; the seven SI base units in seven lines `:351-359`.
- **Absorbing units** `:364-427`: `absorbs unit` makes `Vector[\Float,3\] meter` mean `Vector[\Float meter,3\]`, so `[3 2 5] m_` = `[(3 m)(2 m)(5 m)]`. *"This is the mechanism by which meaning is given to the multiplication and division of library-defined types by units."*

**`Specification/basic/trait-parameters.tex:123-152`** — dim/unit static parameters: `StaticParam ::= dim Id | unit Id [: Type] [absorbs unit]`, with the example at `:147-149`: `opr SQRT[\unit U\](x: RR64 U^2): RR64 U = numericalsqrt(x/U^2) U`.

**`Specification/basic-lib/dimensions.tex` (312 lines)** — the library. §`Fortress.SIUnits` (`:15-197`): 7 base dimensions, 22 derived with special names, ~40 further derived (Area…RadiationExposure), plus non-SI-accepted units. §`Fortress.EnglishUnits` (`:198-312`): inch/foot/yard/mile/rod/furlong, nautical miles, knots, week/fortnight/**microfortnight**, and the entire US volume mess (gallon…minim, traditional vs federal tablespoons, dryPint…bushel, acre).

## Q2.2 What the 2012 implementation does — layer by layer

| Layer | Status | Evidence |
|---|---|---|
| Fortify | **full** | `Fortify/fortify.el:3981,3985,3998` register `SI_unit`, `dim`, `absorbs`, `default`, `unit`, `type` as KEYWORDs; `:7301`, `:7305` emit `\KWD{dim}` and the special `\KWD{SI{\char'137}unit}` |
| Parser | **near-full, two bugs** | `parser/OtherDecl.rats:29-99` implements all three `DimUnitDecl` alternatives; `TaggedDimType` is built; `absorbs unit` parses |
| AST | **full** | `DimDecl`, `UnitDecl`, `TaggedDimType`, `TaggedUnitType`, `DimRef`, `DimExponent`, `DimUnaryOp`, `DimBinaryOp`, `DimArg` |
| Compiler index | **built, then unused** | `IndexBuilder.scala:184-185` + `:424-433`; stored in `compiler/index/Dimension.java`, `Unit.java` |
| Disambiguator | **name resolution only** | `compiler/disambiguator/TopLevelEnv.java:175-193, 326-327, 381, 745-746, 853-854` |
| **Typechecker** | **hard NYI** | `TypeWellFormedChecker.scala:157-165` — `TaggedDimType`, `TaggedUnitType`, `DimRef`, `DimExponent`, `DimUnaryOp`, `DimBinaryOp` all inside a `/* Not yet implemented... */` **comment block**. `ExportChecker.scala:471-472`: `TaggedDimType : not supported yet`, `TaggedUnitType : not supported yet`. A `DimDecl` reaching the checker throws. |
| Interpreter env | **stub** | `BuildEnvironments.java:996-998` — `forDimUnitDecl` is `// TODO Auto-generated method stub`; `EvalVarsEnvironment.java:46` likewise. **No unit ever becomes a runtime value.** |
| Interpreter types | **no case** | `EvalType.java:312-314` — `defaultCase` → `bug("Can't EvalType this node type " + n.getClass())`. No `TaggedDimType` case anywhere under `interpreter/`. |
| Library | **written, shelved** | `Library/incomplete/basic/Fortress.SIUnits.fss` (118 lines), `.fsi` (104), `Fortress.EnglishUnits.fss` (69), `Fortress.InformationUnits.fss` (15) — real Fortress source matching the spec chapter line for line. Git: commit **`1d2680d4d`, 2008-03-24, jmaessen** ("Massive library reorganization") moved them from `StandardLibrary/basic/` → `Library/incomplete/`. They never returned in the remaining 4½ years. |
| Tests | **declaration-acceptance, and green** | `ProjectFortress/tests/dimensionUnitDecl.fss` is a **live member of the green `testSystem` suite** (`SystemJUTest.java:32` points at `ProjectFortress/tests`; 381 `.fss` there ≈ the 382 tests). It declares `dim`/`unit`/`absorbs unit` and prints `Hello, World!`. Also `not_passing_yet/conditionalExtension.fss:19` (`trait RationalQuantity[\unit U absorbs unit,…\]`) and `parser_tests/whereTest.fss:17` (`trait T[\S, int i, unit U, bool b\]`). |

**Answer to the prior-art hint: yes, there is a test, and it is green — but it is pure declaration acceptance.** Verified: `./bin/fortress ProjectFortress/tests/dimensionUnitDecl.fss` → `Hello, World!`. **Not one test in the tree multiplies a metre by a second.**

## Q2.3 Probes — including two genuine, new parser bugs

### PARSER BUG 1 — a bare `dim X` is rejected. **(I)**

Spec's very first dimension example (`defining-dimensions.tex:64-69`) is `dim Length`, and the grammar `:23-25` makes `default` optional.

`q3_bare_dim.fss` (`dim Length`):
```
null…/q3_bare_dim.fss:13:1-11:
    null is not a valid unit name.
```
`q4_dim_default.fss` (`dim Length default meter`) → **`dim with default accepted`** — second data point isolating the cause.

**Cause, exactly** — `parser/OtherDecl.rats`, second `DimUnitDecl` alternative:
```java
:65      a3:(w default w IdOrOpName)?
…
:73      Id unitId;
:74      if ( a3 instanceof Id ) {
:75          unitId = (Id)a3;
:76      } else {
:78          log(span, a3 + " is not a valid unit name.");
:79          unitId = NodeFactory.bogusId(span);
:80      }
```
When the optional clause is absent `a3` is `null`, `null instanceof Id` is false, and the parser logs `"null is not a valid unit name."` — a null-dereference in the error path of an **optional** clause. So **every base dimension, and every derived dimension without a default unit, is unwritable**, including `dim Velocity = Length / Time` (`defining-dimensions.tex:89`). `q1_dimunit_decl.fss` fails on exactly those lines:
```
…/q1_dimunit_decl.fss:12:1-29:   null is not a valid unit name.    (dim Velocity = Length / Time)
…/q1_dimunit_decl.fss:13:1-15:3: null is not a valid unit name.    (dim Area = Length^2)
```
One-line fix. The in-tree test never trips it — both its `dim` lines carry a unit or a `default` clause.

### PARSER BUG 2 — a trailing unit-name list swallows the next declaration. **(I)**

`q11_siunit_alone.fss` — the exact line the SI library opens with (`Fortress.SIUnits.fss:18`, `defining-dimensions.tex:332`):
```
dim Length  SI_unit meter meters m_

run() = println "SI_unit declaration accepted"
```
```
null…/q11_siunit_alone.fss:11:4:
    Syntax Error
```
The error lands on `run(`**`)`** — the parser consumed `run` as another unit name.

**Cause:** `OtherDecl.rats:37` — `a4:IdOrOpName a5s:(wr Id)* a6:(w equals w NoNewlineExpr)?`. `(wr Id)*` is greedy and `wr` crosses line breaks, so the next declaration's leading identifier is absorbed.

Two confirming data points: `q13_siunit_greedy.fss` (next decl starts with the **keyword** `dim`) → `greedy absorption stopped by the dim keyword`; `q14_siunit_terminated.fss` (name list closed by `= Expr`) → `terminated by = clause`. `dimensionUnitDecl.fss` survives only because it never places an identifier-initial declaration after a unit-name list.

With both bugs dodged, the **whole declaration vocabulary parses and runs** (`q15_dimset_clean.fss` → `full declaration set accepted`):
```
dim Length  SI_unit meter meters m_
dim Time    SI_unit second seconds s_
dim Mass default kilogram
dim Velocity = Length / Time  SI_unit mps = meter/second
unit inch inches: Length = 0.0254 meter
unit foot feet ft_: Length = 12 inch
unit gram grams g_: Mass = 0.001 kilogram
```

### Units are not values. **(S)**

`q5_dimensioned_var.fss` — the spec's own `x: RR64 Length = 1.3 m_` (`basic/dimensions.tex:132-134`):
```
com.sun.fortress.exceptions.ProgramError: …/q5_dimensioned_var.fss:17:24:
undefined variable [m_]
```
**The canonical Fortress code sample cannot be evaluated.**

### Dimensioned *types* parse into `TaggedDimType` and die in the evaluator. **(S)/(I)**

`q8_dimtype_parse.fss` (parameter), `q9_dimtype_positions.fss` (top-level var), `q10_dimtype_local.fss` (local var), `q16_dimcheck.fss` (the dimension check), `q20_absorbs_unit.fss` (`Boxed[\RR64\] meter`) — five independent positions, identical error:
```
com.sun.fortress.exceptions.InterpreterBug: …:13:6-15:
Can't EvalType this node type class com.sun.fortress.nodes.TaggedDimType
```
(`EvalType.java:313`.) So `RR64 Length` is a **well-formed parse** — the type grammar of `basic/dimensions.tex:23-24` is genuinely implemented — and there is no type below it.

### The typechecker refuses even the declarations. **(I)**

```
$ fortress typecheck q15_dimset_clean.fss
Exception in thread "main" java.lang.Error: Not yet implemented: class com.sun.fortress.nodes.DimDecl
	at com.sun.fortress.scala_src.typechecker.impls.Misc.checkMisc(Misc.scala:199)
	at com.sun.fortress.scala_src.typechecker.impls.Misc.checkMisc$(Misc.scala:157)
	at com.sun.fortress.scala_src.typechecker.STypeCheckerImpl.checkMisc(STypeChecker.scala:111)
```
Note the asymmetry: the **walk interpreter tolerates** dim/unit declarations (stub returns false, program runs), while the **typechecker hard-crashes**. `dimensionUnitDecl.fss` is green in `testSystem` and would not be in a typechecking suite.

### `in` does not exist. **(S)**

`q18_in_operator.fss` — the spec's headline feature (`basic/dimensions.tex:184-188`):
```
…/q18_in_operator.fss:16:35:
    Operator in is not defined.
```

### The `unit` static parameter parses; the elaboration is inert. **(I)**

`q17_unit_staticparam.fss` — the spec's own operator, declared but never called → **`unit static parameter accepted`**. Call it and the emptiness shows: `q19_unit_param_called.fss` (explicit static arg) and `q21_unit_param_infer.fss` (inferred) both → `null…:15:33: Syntax Error`. `q22_unit_param_prefix.fss` (prefix-operator call form, which does parse):
```
com.sun.fortress.exceptions.ProgramError: …:15:35-36:
Unification error: …:11:24-31:
Cannot unify FloatLiteral(class com.sun.fortress.interpreter.evaluator.types.FTypeObject)
  with TaggedDimType at …:11.24(class com.sun.fortress.nodes.TaggedDimType) abm=()
```
A declaration you can write and never call.

## Q2.4 Q2 verdict

**Parses: everything** (with two fixable parser bugs). **Evaluates: nothing.** **Checks: nothing** — the typechecker throws on the declaration itself.

**(S)** at the language level (`preamble.tex:79`, plus explicit notes in `basic/dimensions.tex:15`, `advanced/defining-dimensions.tex:15`, `basic/types-vals-vars.tex:18`, `basic/declarations.tex:20`), with **(I)** gaps in the already-built layers:

| Item | Spec | Evidence | Size |
|---|---|---|---|
| `dim X` without `default` → "null is not a valid unit name" | `advanced/defining-dimensions.tex:23-25,64-69` | `q3` fails, `q4` passes | one line, `OtherDecl.rats:73-78` |
| Unit-name list swallows the next declaration | `advanced/defining-dimensions.tex:248-263` | `q11` fails, `q13`/`q14` pass | one production, `OtherDecl.rats:37` |
| Typechecker throws on `DimDecl` | whole `defining-dimensions.tex` | `q15`/`q16` typecheck → `java.lang.Error … Misc.scala:199` | small (a no-op case) |
| `TaggedDimType` unevaluable | `basic/dimensions.tex:190-198` | `q8`–`q10`, `q16`, `q20` | large (real dimension algebra) |
| Units are not values | `basic/dimensions.tex:170-182` | `q5`: `undefined variable [m_]` | large |
| `in` operator | `basic/dimensions.tex:184-188` | `q18`: `Operator in is not defined` | large |
| SI/English unit libraries | `basic-lib/dimensions.tex` | shelved 2008-03-24 (`1d2680d4d`) | ready to un-shelve once the above lands |

This **confirms and sharpens** expressiveness-review finding 14 ("257 lines of grammar and semantics, zero implementation. Nothing was missed here"). Corrections: it is *four* spec chapters (~1000 lines); the parser and AST **are** implemented; there **is** a green in-tree test; there **is** a written-and-shelved SI library; and the two parser bugs are new.

---

# Q3 — Would named types help microgpt2?

## Q3.1 Premise, corrected

Since `type` aliases do not exist, "adopt type aliases" is not on the table for a *running* deliverable. The live question is: should `microgpt2.fss` grow **more carrier objects** whose only purpose is to name a space? It already answers yes twice — `Vec` (`:136`) and `Mat` (`:148`), with the payoff stated in its own header (`:127-134`).

**Units: don't adopt, and they would be noise even if they worked.** ML papers write `x ∈ ℝᵈ`, never `x ∈ ℝᵈ·metre`; the transformer has no physical dimension anywhere. The one place unit-*like* typing would bite — *shape* checking (`d_k` vs `nEmbd` vs `vocab`) — is the `nat`-parameter machinery, not the dimension machinery; it is already recorded as available (expressiveness-review finding 13, `p9_natvec.fss`) and already ruled out for this file, because microgpt2's dimensions are runtime config values (`nEmbd: ZZ32 = 8`, `:366`), not literals. Cite the spec chapters on the page as a spec-vs-implementation exhibit if useful; keep them out of the model.

## Q3.2 Where naming would echo the literature's `∈` statements

### Case 1 (STRONGEST) — `List[\Mat\]` means two different things

`microgpt2.fss` uses the identical spelling for the **per-head weight bundle** `_Wq, _Wk, _Wv: List[\Mat\]` (`:219`) and the **KV cache** `kh, vh: List[\Mat\]` (`:230`), including `forward`'s return `(Vec, List[\Mat\], List[\Mat\])` (`:231`). The file needs a five-line comment (`:213-217`) to say which is which. The paper's own noun is *KV cache*, an object with two operations: index by head, extend at right.

**Before** (`:230-231`):
```
forward(t: ZZ32, i: ZZ32, kh: List[\Mat\], vh: List[\Mat\])
    : (Vec, List[\Mat\], List[\Mat\]) = do
```
**After** (probed, `p16_kvcache.fss`):
```
step(nHead: ZZ32, x: Vec, kh: KVCache, vh: KVCache): (Vec, KVCache, KVCache) = do
```
```
K after two steps = KVCache<|Mat<|Vec<|1.0, 2.0|>, Vec<|1.0, 2.0|>|>, Mat<|…|>|>
|K2[0]| = 2
```
Cost: one 7-line carrier — and it *removes* code: `emptyHist` (`:253`) becomes `emptyCache`, and the two parallel `<| (kh[h]).addRight(…) | h <- 0#nHead |>` comprehensions (`:235-236`) become `kh.extend(…)`. **Net negative lines, one name earned.**

### Case 2 (STRONG) — `softmax : ℝⁿ → Δⁿ⁻¹`

Every treatment of the transformer distinguishes logits from a distribution; the attention line's whole point is that softmax's output is a convex weighting. `microgpt2.fss:201` writes `softmax(a: Vec): Vec` — the reader must already know.

**Before** (`:201, :208, :300`):
```
softmax(a: Vec): Vec = do …
nll(logits: Vec, y: ZZ32): Value = do …
sample(p: Vec): ZZ32 = do …
```
**After** (probed):
```
softmax(a: Vec): ProbDist = do …
nll(logits: Vec, y: ZZ32): Value = do …
sample(p: ProbDist): ZZ32 = do …
```

**The structural risk, answered.** `microgpt2.fss:225` is the flagship line:
```
attend(q: Vec, K: Mat, V: Mat): Vec = softmax(q K^T / SQRT d_k) V
```
If softmax returns `ProbDist`, then `softmax(…) V` is a **ProbDist × Mat** juxtaposition needing a new overload that must coexist with the existing `Mat × Vec` and `Vec × Mat` pair (`:165`, `:169`), whose legality rests on `Rank1 excludes Rank2`. Does a *third* `Rank1` carrier break it?

**Probed: no.** `p14_named_spaces.fss` declares `Vec` and `ProbDist` (both `Rank1`) and `Mat` (`Rank2`), with all three juxtaposition overloads, and runs the attention line verbatim in shape:
```
opr juxtaposition(w: Mat, x: Vec): Vec = …
opr juxtaposition(p: Vec, m: Mat): Vec = …
opr juxtaposition(p: ProbDist, m: Mat): Vec = …          (* the new one *)
softmax(a: Vec): ProbDist = …
attend(q: Vec, K: Mat, V: Mat, d_k: ZZ32): Vec = softmax(q K^T / SQRT d_k) V
```
```
softmax(q K^T/SQRT 2) = ProbDist<|0.6697615493266569, 0.3302384506733431|>
attend = Vec<|3.6604769013466862, 4.660476901346686|>
```
Hand-verified: `K = I` so `q K^T = [1,0]`; `/√2 = [0.7071, 0]`; `softmax = [e^0.7071/(e^0.7071+1), 1/(e^0.7071+1)] = [0.66976, 0.33024]` ✓; `0.66976·[3,4] + 0.33024·[5,6] = [3.66048, 4.66048]` ✓.

**Cost, honestly:** one 6-line carrier **plus one duplicated juxtaposition body** — the `ProbDist × Mat` overload is a verbatim copy of the `Vec × Mat` one, because the two carriers share no supertype carrying that operation. **That duplication is itself the exhibit: it is precisely the price of not having transparent type aliases.** With `type ProbDist = Vec` the overload would not exist at all, the signature would still read `softmax(a: Vec): ProbDist`, and the alias would expand before type checking (`types-vals-vars.tex:621`).

### Case 3 (WEAK — do not adopt) — the scalar spaces

`ZZ32` in `microgpt2.fss` stands for token ids (`t`, `y`, `bos`), positions (`i`, `pos`), head counts (`nHead`), dimensions (`d_k`, `nEmbd`, `blockSize`), and plain loop indices. Naming these is where a language *with* aliases gives the biggest documentation win for zero cost.

Without aliases, probed and running (`p15_scalar_named.fss`):
```
object TokenId(v: ZZ32) … end
object Position(p: ZZ32) … end
object Mat(rows: List[\Vec\]) …
  opr [i: ZZ32]:     Vec = rows[i]
  opr [t: TokenId]:  Vec = rows[t.v]        (* COST 1: one subscript overload per space *)
  opr [i: Position]: Vec = rows[i.p]
end
embed(_We: Mat, _Wp: Mat, t: TokenId, i: Position): Vec = …
→ h0 = Vec<|3.1, 4.2|>
  token ids = <|4, 0, 1|>
```
The costs are severe and all in the *harness*, where a reader is least helped: `tokenize` (`:294`) returns `List[\TokenId\]`, so `toks[pos+1]` needs `TokenId` arithmetic; `sample` (`:300-304`) computes `|short| MIN (|p| - 1)` in raw `ZZ32` and must wrap; `tid + 97` (`:429`) needs `.v`. Every one is `.v`/`.p` noise on a line that currently reads as arithmetic — and none buys a line that looks more like the paper, because **papers do not write scalar type ascriptions inline**; they write `t ∈ V` once, in prose, which a comment does for free.

## Q3.3 Recommendation — **ADOPT NARROWLY: two carriers, not a scheme**

1. **`KVCache` — adopt.** Removes the file's one genuine ambiguity, shortens `forward`'s signature to `(Vec, KVCache, KVCache)`, absorbs `emptyHist` and the two parallel extension comprehensions, and costs **net negative lines**. Probed: `p16_kvcache.fss`.
2. **`ProbDist` — adopt if the page wants the exhibit.** Makes `softmax : Vec → ProbDist` state the paper's `Δⁿ⁻¹` by eye; `nll` and `sample` then read as consuming a distribution. Costs 6 lines plus one duplicated overload. Probed working against the flagship attention line: `p14_named_spaces.fss`. **Its value here is double**: better signatures *and* a running demonstration of what the missing `type` alias costs — the duplicated overload is the price tag, which serves the mission's machinery-as-content half as directly as the inheritance-ledger narrative.
3. **`TokenId` / `Position` / `Logits` / `Embedding` — do not adopt.** `Logits`/`Embedding` would be `Vec` carriers with no operations of their own, paying lifting at every residual-stream arithmetic site (`h0 = _We[t] + _Wp[i]`, `x5 = ffn(x4) + x3`) — pure noise. `TokenId`/`Position` pay `.v`/`.p` across the whole harness for documentation a comment already gives. Probed cost: `p15_scalar_named.fss`.
4. **Units — do not adopt.** Not applicable to the mathematics, and unimplemented besides.

**What to put on the page instead of adopting more** — one honest paragraph, itself a finding: *Fortress specifies type aliases — `type KVCache = List[\Mat\]`, expanded before type checking, defining no new type — and the 2012 implementation stops one line short of them (`IndexBuilder.scala:187`), with the expansion machinery already written and unreachable. So a Fortress signature can name a space only by minting a new type, and the cost of minting shows up as a duplicated `ProbDist × Mat` overload next to the `Vec × Mat` one. The literature's `p ∈ Δⁿ⁻¹` costs six lines and a copied operator here; with the alias it would have cost nothing.* That is a paired before/after a reader can judge by eye — exactly the fitness function.

---

# Probe index (all run; output in `probe-run.log`)

| Probe | Question | Result |
|---|---|---|
| `p0_smoke.fss` | harness sanity, out-of-tree file | `smoke ok` |
| `p1_alias_basic.fss` | spec's `type IntList = List[\ZZ64\]` | `** bug! Not yet implemented: TypeAlias` (parse alone → `Ok`) |
| `p2_alias_minimal.fss` | alias, no imports; walk/typecheck/compile | same bug on all three paths |
| `p3_alias_param.fss` | parameterized alias | same bug |
| `p4_alias_where.fss` | `where { type U = T }`, unused | runs (`f = 1`) — tolerated |
| `p5_alias_where_used.fss` | same, used | `U is undefined.` ×2 |
| `p6_alias_in_object.fss` | alias in an object body | `Syntax Error` — **(D)** |
| `p7_alias_api.{fsi,fss}` | alias in an API | same bug, from the `.fsi` |
| `p8_trait_subst.fss` | `trait Logits extends List[\RR64\]` | `Unification error: … (x:Logits) got arg ArrayList[\RR64\]` — **(D)** |
| `p9_carrier_subst.fss` | two same-shape carriers | runs; `softmax(z: Vec): ProbDist` |
| `p10_import_as.fss` | `import List.{List as Seq, ...}` | `Missing comma.` |
| `p11_import_as_only.fss` | `import List.{List as Seq}` | `Missing comma.` |
| `p12_import_arrow.fss` | `import List.{List => Seq, ...}` | parses; `Seq is undefined.` |
| `p13_import_arrow_value.fss` | `import List.{emptyList => nil, ...}` | `Function nil is not defined.` |
| `p14_named_spaces.fss` | **Q3** 3rd Rank1 carrier + `ProbDist × Mat` + attention line | runs, values hand-verified |
| `p15_scalar_named.fss` | **Q3** scalar named spaces, cost | runs; two costs demonstrated |
| `p16_kvcache.fss` | **Q3** `KVCache`, `(Vec, KVCache, KVCache)` | runs |
| `q1_dimunit_decl.fss` | full spec declaration vocabulary | 2 × `null is not a valid unit name.` |
| `q2_dimensioned_var.fss` | spec's `x: RR64 Length = 1.3 m_` | `null is not a valid unit name.` (bug 1) |
| `q3_bare_dim.fss` | `dim Length` | `null is not a valid unit name.` — **parser bug 1** |
| `q4_dim_default.fss` | `dim Length default meter` | runs — isolates bug 1 |
| `q5_dimensioned_var.fss` | dimensioned value, bugs dodged | `undefined variable [m_]` |
| `q6_dim_type_only.fss` | `x: RR64 Length = 1.3` | `Syntax Error` (bug 2 upstream) |
| `q7_dim_mismatch.fss` | Time passed where Length declared | `Syntax Error` (bug 2 upstream) |
| `q8_dimtype_parse.fss` | `RR64 Length` in a parameter | `Can't EvalType … TaggedDimType` — type grammar IS implemented |
| `q9_dimtype_positions.fss` | same, top-level var | same |
| `q10_dimtype_local.fss` | same, local var | same |
| `q11_siunit_alone.fss` | `dim Length SI_unit meter meters m_` alone | `Syntax Error` — **parser bug 2** |
| `q12_siunit_then_dimtype.fss` | same + dimensioned parameter | `Syntax Error` |
| `q13_siunit_greedy.fss` | next decl starts with keyword `dim` | runs — isolates bug 2 |
| `q14_siunit_terminated.fss` | name list closed by `= Expr` | runs — isolates bug 2 |
| `q15_dimset_clean.fss` | full vocabulary, both bugs dodged | runs; typecheck → `java.lang.Error: … DimDecl` |
| `q16_dimcheck.fss` | **the dimension check** | `Can't EvalType … TaggedDimType`; typecheck → same `DimDecl` Error |
| `q17_unit_staticparam.fss` | `opr SQRT[\unit U\](x: RR64 U^2): RR64 U` declared | runs (never called) |
| `q18_in_operator.fss` | `d in inches` | `Operator in is not defined.` |
| `q19_unit_param_called.fss` | explicit unit static arg | `Syntax Error` |
| `q21_unit_param_infer.fss` | inferred unit | `Syntax Error` |
| `q22_unit_param_prefix.fss` | prefix-operator call form | `Cannot unify FloatLiteral … with TaggedDimType` |
| `q20_absorbs_unit.fss` | `absorbs unit` + `Boxed[\RR64\] meter` | `Can't EvalType … TaggedDimType` |
| — | in-tree `ProjectFortress/tests/dimensionUnitDecl.fss` | `Hello, World!` (green testSystem member) |

## Dead ends worth recording

- **`p14_named_spaces.fss`, first run** — `Unification error: Closure/Constructor for Vec param 1 ($xs:List[\RR64\]) got arg ArrayList[\FloatLiteral\] of type ArrayList[\FloatLiteral\]`. Not a design finding: expressiveness-review finding 1's known rule that `[\RR64\]` ascriptions on comprehensions are *not* redundant when the elements' runtime class is `FloatLiteral`. Fixed by ascribing. `microgpt2.fss` never meets this because its elements are `Value` objects.
- **`p9_carrier_subst.fss`, first run** — `Operator prefix EXP is not defined.` The exponential is the lower-case function `exp` (`FortressLibrary.fss:413`; `microgpt2.fss:85`), not an operator. My error, recorded for the trap list.
- **`p1_alias_basic.fss` under `fortress typecheck`** — 10 errors of the form `Maybe is undefined. / Comprehension is undefined. / BigReduction is undefined.` from `Library/List.fsi`. Nothing to do with aliases: importing `List.{...}` breaks the typechecker's environment independently. That is why `p2_alias_minimal.fss` (no imports) is the probe of record for the typecheck path.