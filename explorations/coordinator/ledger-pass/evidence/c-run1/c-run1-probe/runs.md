# Runs, prober of c-run1

Before any run: `git -C /home/user/fortress status --porcelain --untracked-files=no` printed nothing (head bc28dfa5c; the run's base c124c6b65, and no file under `Library/`, `ProjectFortress/src/` or `ProjectFortress/LibraryBuiltin/` differs between them); `bin/fortress explorations/claude_demo.fss` printed `SUM[i <- 1#100] i = 5050`, exit 0.

Setup of every call: the skill's lines (`FORTRESS_HOME=/home/user/fortress`, `FORTRESS_THREADS=1`, Java 25, `-Xmx4g -Xss64m`), then `flock /home/user/fortress/tmp/ledger-pass-jvm.lock nice -n 19 timeout -k 10 200`. Walk: `FORTRESS_CACHES=/home/user/fortress/tmp/ledger-pass/c-run1/run/caches`. Compiled: `FORTRESS_CACHES=<this folder>/probe/ccaches`, a copy of `default_repository/caches`. Programs are under `probe/`, one folder a row. "APL path" below: `FORTRESS_SOURCE_PATH=".:$PWD/../base:$PWD/../../../ProjectFortress/LibraryBuiltin:$PWD/../../../Library:$PWD/../../../ProjectFortress/test_library"`, run from `explorations/apl/rung-1`.

## Row 772 (c1)
- Program: `probe/p772/TraitWrapCompiled.fss`, as in `c1/questions.md`.
- `bin/fortress compile TraitWrapCompiled.fss`: exit 0. `bin/fortress run TraitWrapCompiled`: exit 0:
  - `trait wrap z r:  Box[Any]  v= ZZ32`
  - `top wrap z r:  Box[Any]  v= ZZ32`
- Control, `bin/fortress TraitWrapCompiled.fss` (walk): exit 0: `trait wrap z r: Box[RR64] v=RR64`, `top wrap z r: Box[RR64] v=RR64`.

## Row 545 (c19)
- Program: `probe/p545/SkFnMixedTop.fss`, as in `c19/questions.md`.
- `bin/fortress walk SkFnMixedTop.fss`: exit 1: `SkFnMixedTop.fss:12:1-19: and ... 5:3-21: first parameters s:[S] and self:[T] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present`.
- `bin/fortress compile SkFnMixedTop.fss`: exit 255: `Invalid overloading of tag in component SkFnMixedTop: (T & {V, W})->ZZ32 @ ...:5:3-21 and S->ZZ32 @ ...:12:1-19`, `File SkFnMixedTop.fss has 1 error.`

## Row 315 (c19)
- Program: `probe/p315/ConditionalOpTruncation.fss`, a copy of `ProjectFortress/tests/ConditionalOpTruncation.fss`.
- `bin/fortress compile ConditionalOpTruncation.fss`: exit 1: `Exception in thread "main" java.lang.RuntimeException: java.util.zip.ZipException: duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class`, `at com.sun.fortress.runtimeSystem.ByteCodeWriter.writeJarredFile(ByteCodeWriter.java:36)`.
- The compile died, so the numeral-only thunk's second program, asked only if it compiled, was not run.

## Row 853 (c23)
- Program: `probe/p853/BottomSpec.fss`, as in `c23/questions.md`.
- `bin/fortress compile BottomSpec.fss`: exit 0, no message. `bin/fortress run BottomSpec`: exit 0: `f =  1`.
- `bin/fortress walk BottomSpec.fss`: exit 1: `Overloading of f[\T extends Red\](g:T->FortressLibrary.ZZ32):FortressLibrary.ZZ32 ... and f(g:Blue->FortressLibrary.ZZ32):FortressLibrary.ZZ32 ... fails the Meet Rule: neither is found to be more specific than the other or to exclude it, and no declaration is found that is more specific than both and applies to every call to which both apply`.

## Row 24 (c28)
- Program: `probe/p24/T24.fss`, as in `c28/questions.md`. `bin/fortress walk T24.fss`: exit 1: `T24.fss:8:26-28: Unification error: Closure/Constructor for f param 1 (a:Matrix [\RR64\]^(3)) got arg __DefaultVector[\RR64,3\] of type __DefaultVector[\RR64,3\]`.
- One change, `f` and its call removed: `probe/p24/T24g.fss`. `bin/fortress walk T24g.fss`: exit 1: `Unification error: Closure/Constructor for g param 1 (a:Matrix [\V\]^(3)) got arg PrimitiveArray[\V,3\] of type PrimitiveArray[\V,3\]`.

## Row 53 (c28)
- Program: `probe/p53/T53.fss`: `object R(x: RR64) extends MultiplicativeRing[\R\]` with `zero`, `one`, `asString`, `+`, both `-`, `TIMES`, juxtaposition and `^`; `v = vector[\R,2\](R(1.0))`, `m = matrix[\R,2,2\](R(1.0))`; each operation in its own `try`/`catch e Exception`.
- `bin/fortress walk T53.fss`: exit 1: `v built`, `m built`, `v + v refused: Cast error`, `v.scale(R(2.0)) refused: Cast error`, `v.pmul(v) refused: Cast error`, `v.dot(v) = R(2.0)`, then `T53.fss:42:31: Failed to find any matching overload, args = (__DefaultVector[\R,2\],__DefaultVector[\R,2\])` at `v DOT v`, not caught.
- One change, the `v DOT v` block removed: `probe/p53/T53b.fss`, exit 0: as above to `v.dot(v) = R(2.0)`, then `m.t() = [0#2,0#2] [ R(1.0) R(0.0) R(0.0) R(1.0) ]`, `m.mul(m) = ...` (the same matrix), `m.rmul(v) = [0#2][ R(1.0) R(1.0) ]`, `m.lmul(v) = [0#2][ R(1.0) R(1.0) ]`.
- One change from T53, `v + v` alone with no `try`: `probe/p53/T53c.fss`, exit 1: `FortressLibrary.fss:36:13-27: CastError`, context `FortressLibrary.fss:2548:9-78` (Vector's `opr +`, `cast[\Vector[\T,s0\]\](ivmap[\T\](...))`).

## Row 254 (c28)
- Program: `probe/p254/T254.fss`, as in `c28/questions.md`. `bin/fortress walk T254.fss`: exit 1: `T254.fss:7:17: Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,3\],__DefaultMatrix[\RR64,2,3\]), overload = {` ...; no `caught:` and no `after` line.

## Row 44 (c32)
- Program: `explorations/apl/rung-1/r14_nested.fss`, APL path. `bin/fortress r14_nested.fss`: exit 1, before the `SUM`: `AplCore.fss:52:56-78: Unification error: Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr at .../AplCore.fss:61.15 ZZ32->RR64`. The APL base's `aplVec` calls `.fill(f)` with a function; since `f3b62bc83` (2026-09-28) `fill` takes a value and `tabulate` a function. So no program that imports `AplCore` runs at the base.
- One change, the row's question without the APL library: `probe/p44/T44.fss`, two `Array[\RR64,ZZ32\]` cells built by `tabulate`, then `SUM[ u <- seq(n) ] u`. `bin/fortress T44.fss`: exit 0: `|n| = 2`, `SUM over the cells:`, `  [0#3][ 5.0 7.0 9.0 ]`.

## Row 216 (c32)
- `bin/fortress r05a_comma.fss` (default path, from `explorations/apl/rung-1`): exit 1: `r05a_comma.fss:6:5: Syntax Error`.
- `bin/fortress r05e_ravel.fss`: exit 1: `r05e_ravel.fss:6:5: Syntax Error`.
- `bin/fortress r05c_bar.fss`: exit 0: `a | b = D3` (r05c declares the infix `|`, not the prefix).
- One change, r05c with a prefix `opr |(a: D)` and its use `(| D(1))`: `probe/p216/r05f_prebar.fss`. Exit 1: `r05f_prebar.fss:5:33: Syntax Error` (the use, on line 5; the declaration, line 4, passes).

## Row 219 (c32)
- Program: `probe/p219/r07t_edge.fss`, `explorations/apl/rung-1/r07_edge.fss` with each `.fill(` given a function (lines 9, 10 and 31) made `.tabulate(`; line 31 too, because its `fill` of a function would stop the run before `tally(c)`.
- `bin/fortress r07t_edge.fss` (walk): exit 0: `zilde: |e| = 0   tally = 0.0`, `tally(2.5) = 1.0`, `tally(a) = 4.0   tally(g) = 1.0`, `same(a,a) = 1.0   same(a,g) = 0.0`, `tally(c) = 5.0`, `c = [0#5][ h e l l o ]`.
- `bin/fortress compile r07t_edge.fss`: exit 255: `9:33-36: Array is undefined.`, `10:46-48: Char is undefined.`, `13:19-23: Vector is undefined.`, ..., `File r07t_edge.fss has 10 errors.` The compiler's prelude has no `Array`, `Vector` or `Char`, so the compiled path cannot state the family before the switch-over.

## Row 223 (c32)
- `bin/fortress r15_runtimerank.fss`, APL path: exit 1: `Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser456 (.../r15_runtimerank.fss:12:46: Syntax Error)`.

## Row 200 (c40)
- `bin/fortress q200a.fss` (`probe/p200/`): exit 1: `q200a.fss:4:12: Invalid string literal content: \`, `4:21: Invalid string literal content:`, `5:12: Invalid string literal content: \`. Both lines refused, so no split was needed.
- `bin/fortress q200b.fss`: exit 1: `q200b.fss:3:19: Invalid string literal content: \`, `3:29: Invalid string literal content:`.

## Row 342 (c15, optional)
- `explorations/apl/rung-5/v04_lib.fss`, APL path, a fresh caches folder `probe/cold342/`. Cold: exit 1, 13 s: `Overloading of =[\nat s,nat t\](a:Vector[\RR64,s\],b:Vector[\RR64,t\]):Array[\RR64,ZZ32\] (AplCore.fss:280:1-282:75) and ReadableArray[\E,I\].=(self:ReadableArray[\E,I\],other:HasRank):Boolean (FortressLibrary.fss:2198:5-2203:10) fails the Return Type Rule`.
- The same command again, warm: exit 1: `Overloading of BY(self:(RR64 & {Float, FloatLiteral}),b:RR64):RR64 (FortressLibrary.fss:462:5-64) and BY(a:RR64,b:RR64):RR64 (AplCore.fss:1209:1-1211:80) fails because their parameter lists have the same types`.
