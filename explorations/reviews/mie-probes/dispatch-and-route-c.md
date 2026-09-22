<!-- Two measurements for Pavol's choice between routes B(b) and C of ../multiple-instantiation-exclusion.md §8, taken 2026-09-22 by a delegated worker on main 3326c7272, JDK 25, compiler path. Every run had a private -Dfortress.caches outside the repository; no tracked source was modified. The shadow is shadow/shadow.patch: rung P's measurement switch verbatim (origin/wip/rung-exclusion-relax, probes/measurement-switch.patch) plus a 28-line route C sketch in OverloadingOracle.scala. Commands: dispatch-run.sh. Captures: *.compiled.txt, javap-excerpts.txt, routeC-library.txt, routeC-textcount.txt. -->

# Where a dispatched generic gets its instantiation, and route C's overload half

## 1. The instantiation: at the call site when nothing can be dispatched, from the run-time value when it can

Every probe with a multiply instantiating object links only under `-Dprobe.rungP=hier`; under `off` each such object gets the four hierarchy errors (`MieDispatch.compiled.txt:1-11`). `Both` extends `Tag[\String\]` and `Tag[\ZZ32\]` (`MieDispatch.fss:14`). Each function is `f[\X\](t: Tag[\X\]): Marker[\X\]`, so `X` is in the return type.

| call | how the call reaches the generic | prints or throws |
|---|---|---|
| `which(z)`, `z: Tag[\ZZ32\] = Both` / `which(s)`, `s: Tag[\String\]` | one declaration, no overloading | `Marker[ZZ32]` / `Marker[String]` (`MieDispatch.compiled.txt:15-16`) |
| `pick(z)` / `pick(s)` | beside `pick(p: Plain)`, whose domain excludes `Tag` | `Marker[ZZ32]` / `Marker[String]` (`:17-18`) |
| `grab(z)` / `grab(s)`, and `gz: Marker[\ZZ32\] = grab(z)`, `gs: Marker[\String\] = grab(s)` | beside the less specific `grab(a: Any): Any` | `Marker[ZZ32]` / `Marker[String]`, and each binding holds that (`:21-24`) |
| `grab(a)`, `a: Any = Both` | only by dispatch from `grab(Any)` | `ClassCastException`: `Both` cannot be cast to `Tag⟦CompilerBuiltin%ZZ32⟧` (`:25-27`) |
| `grab(b)`, `b: Tag[\Blue\] = Mixed`, where `Mixed extends { Sub[\Red\], Tag[\Blue\] }` and a second generic `grab[\X\](t: Sub[\X\])` is declared | the checker picks the `Tag` generic at `X = Blue`, and the `Sub` one may apply at run time | `ClassCastException`: `Marker⟦Red⟧` cannot be cast to `Marker⟦Blue⟧` (`MieDispatchSub.compiled.txt:15-18`) |

**At the call site the static argument is a constant in the name of the class the call loads.** For `grab(z)` and `grab(s)`, `run()` does `getstatic` on the closure class of `grab⟦ZZ32⟧` and `grab⟦String⟧` (`javap-excerpts.txt:12-13`):

    204: getstatic #204 // Field "MieDispatch?$\\=grab?com\\|sun\\|fortress\\|compiler\\|runtimeValues\\|FZZ32??$\\=?Arrow?MieDispatch\\%Tag?X?,…
    234: getstatic #214 // Field "MieDispatch?$\\=grab?fortress\\|CompilerBuiltin\\%String??$\\=?Arrow?MieDispatch\\%Tag?X?,…

javap prints the non-ASCII brackets as `?`, so `grab?…FZZ32??` is `grab⟦ZZ32⟧`. The code generator puts the checker's static arguments into that name (`compiler/codegen/CodeGen.java:3670-3735`). The class loader expands the template under that name when the class is first loaded, rewriting each method with `MethodInstantiater` (`runtimeSystem/Instantiater.java:166`). The call does not go through a dispatcher when no more specific declaration can apply at run time. Even `grab`, which has a less specific sibling, is called this way.

**When the call is dispatched, each generic arm takes its static argument from the run-time value.** The dispatcher asks the argument for its run-time type (`getRTTI`). It then asks that type for its `Tag` parameter (`Tag__1()`) and passes the answer to `RTHelpers.loadClosureClass` (`javap-excerpts.txt:18-47`). That call builds the class name from the run-time type's own name (`runtimeSystem/RTHelpers.java:172-178`), and the loader expands the template at load. `OverloadSet.java:1411-1696` emits this for every generic arm that has type variables, the last arm included, although the comment at `:1378-1381` says the checker provides the last arm's static arguments. `:1487` says "a valid instantiation must use the runtime type".

The run-time type of `Both` records one `Tag` parameter, `ZZ32`, the one listed last (`javap-excerpts.txt:50`). The reason is that the direct supertypes are kept in a map keyed by the generic's name (`scala_src/useful/STypesUtil.scala:1276`). With user types the choice is visible: `RedBlue` gives `Marker[Blue]` and `BlueRed` gives `Marker[Red]` (`MieDispatchAny.compiled.txt:23-25`).

**`MieDispatchSub` shows that a call-site constant does not survive dispatch.** `grab(b)` loads `grab⟦Blue⟧` (`javap-excerpts.txt:57`). The template behind it is the dispatcher for the two generics. Its `Sub` arm reads `Red` from `Mixed`'s run-time type (`Sub__1()`, `:67-69`) and returns `Marker⟦Red⟧`. The instance's own cast to `Marker⟦X⟧`, now `Marker⟦Blue⟧` (`:71`), throws. Under the specification the set's static parameters are fixed once at the call site (`Specification/basic/overloading.tex:106-108`, `trait-parameters.tex:374`). `X = Blue` would leave `Sub[\Blue\]` inapplicable, and the call would return `Marker[Blue]`. The two declarations have the same static parameters, so route B(a) (`overloading.tex:100-105`) accepts this set. Route B(b), which targets only a non-generic specialisation, accepts it too.

**B(b)'s precondition does not hold:** the code generator instantiates a dispatched generic arm from the run-time value, not from the call site, so B(b) leaves `MieDispatchSub` type-checking and failing at run time. The same holds under B(a).

Two defects found on the way do not involve multiple instantiation:
- Through a less specific declaration, a generic whose return type mentions `X` always throws. The dispatcher casts the result to the uninstantiated `Marker⟦X⟧` (`javap-excerpts.txt:46`); with `RedTag`, which is a `Tag` at one instantiation only, the result is a `ClassCastException` (`MieDispatchAny.compiled.txt:27-28`).
- An instantiation at `ZZ32` made at run time names `ZZ32` `fortress|CompilerBuiltin%ZZ32`, the run-time type's class name. Static code names it `com|sun|fortress|compiler|runtimeValues|FZZ32`, so the instance and the object disagree. `IntTag` fails this way with no multiple instantiation (`MieDispatchZZ32.compiled.txt:4-5`), and `grab(a)` on `Both` hits this defect first.

## 2. Route C's overload half: 28 lines; 69 library pairs refused, 54 in the B(b)-shaped variant

**Where it goes.** The check goes in `OverloadingOracle.satisfiesReturnTypeRule`, as a guard on the `Some` case of the solution (`scala_src/overloading/OverloadingOracle.scala:88-89`). This is the one place that holds both declarations' static parameters, the less specific declaration's domain and return type, and the solved instantiation. It is reached for every valid pair, in both orders (`typechecker/OverloadingChecker.scala:421-422`). **What it tests.** The more specific declaration has no static parameters. Some static parameter `T` of the generic declaration has a bound, or a domain, that applies one of the seven self-typed traits to a type mentioning `T`. The seven are `Equality`, `StandardPartialOrder`, `StandardMin`, `StandardMax`, `StandardMinMax`, `StandardTotalOrder` and `Integral` (`Library/FortressLibrary.fsi:73`, `:167`, `:184`, `:195`, `:206`, `:219`, `:411`). Mode `all` refuses every such pair. Mode `ret` refuses the pair only when the generic's return type mentions `T`, which is B(b)'s shape.

**Size.** The sketch is 28 added lines, 23 without comments (`shadow/shadow.patch`, last file). It reports through the return type rule's own message plus an `@@ROUTEC` line. A version to land would want its own message in `returnTypeCheck` (`OverloadingChecker.scala:523-535`), a few lines more, and the trait list shared with route C's `checkP` exemption, which is not built here.

**Check on a small program.** `RouteCProbe` compiles under the stock checker and runs (`RouteCProbe.compiled.txt:25-29`). Under `all`, `f` and `g` are refused (`:1-15`). Under `ret`, only `g` is refused, because its return type is `T` (`:16-24`). The control `h`, the same shape over a trait that is not exempted, is untouched in all three modes.

**The library, measured.** The overloading check only reaches the `FortressLibrary` api once the earlier errors clear, so the measurement uses the zero probe's stack. The stock run reproduces its 173 errors and the api's 260 (`routeC-library.txt:4`, `perf-probes/nat/zero.md`).

| mode | pairs refused | of them already refused by the stock rule | whole-unit errors |
|---|---|---|---|
| `all` | 69 | 6 | 231 |
| `ret` | 54 | 4 | 224 |

Figures from `routeC-library.txt:4-6`. All 69 pairs are declared in `FortressLibrary.fsi`, and every one is a trait of the numeric tower or a comparison type implementing a functional method of an exempted trait:
- By the trait that declares the specialisation: `ZZ64` 17, `NN64` 15, `ZZ32` 15, `Number` 6, `QQ` 5, `LessThan` 4, `GreaterThan` 4, `EqualTo` 2, `TotalComparison` 1.
- By the generic they sit beside: `Integral`'s 16 functional methods 45, `CMP` of `StandardPartialOrder`/`StandardTotalOrder` 14, `MIN`/`MAX`/`MINMAX` 10 (`routeC-library.txt:32-57`).
- No top-level pair is refused. The library's top-level generics over these traits (`BIG MIN` … `BIG MAX_MAX`, `.fsi:1869-1914`) have no specialised sibling. The generic `BIG BITXOR` is commented out, and a `ZZ32` one stands in its place (`.fsi:1944-1966`).
- In every refused pair the generic's return type is `T`, `(T,T)`, or a type without `T` (`routeC-library.txt:60-128`).

**Symbolic operators are not in that count, because the compiled checker never examines their overloads.** `isDeclaredName` (`OverloadingChecker.scala:546-550`, used at `:169` and `:314`) accepts an operator only if `NodeUtil.validOp` does, and that accepts only upper-case letters and `_` (`nodes_util/NodeUtil.java:1457-1477`). So `=`, `<`, `+`, `-` and the rest escape both the stock check and the sketch. Counted from the text by name and parameter count (`routeC-textcount.py`), they add at most 57 pairs, 9 of them in the `ret` variant (`routeC-textcount.txt:5-7`). The same text count gives 70 for the names the checker does examine, one more than the checker found: `.fsi:124` beside `:222` is not a specialisation. So 57 is an upper bound.

## 3. Not settled

- **What route B needs from the code generator.** The dispatcher would need to take the call site's static arguments. Today it has no parameter for them: the dispatcher's signature is `grab(Any)` (`javap-excerpts.txt:18-19`). Alternatively it would need to check each arm's inferred instantiation against them. The size of either change was not measured.
- **Whether route C needs the same code generator change.** A generic-beside-generic set over an exempted trait would be dispatched in the same way. This was not probed.
- **The interpreter on `MieDispatchSub`.** It was not run.
- **The 57 symbolic pairs.** They are counted from the text only. Enabling the check for symbolic operators would also run the rest of the overloading check on them, which has never happened.
- **The two defects in §1 and the symbolic-operator skip.** None of the three is in the gap ledger.
