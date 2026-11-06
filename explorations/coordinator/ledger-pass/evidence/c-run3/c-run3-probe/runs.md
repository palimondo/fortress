# Runs, prober of c-run3

Before any run: `git -C /home/user/fortress status --porcelain --untracked-files=no` printed nothing (head 371a268b8; the run's base c124c6b65; `git diff --stat c124c6b65 HEAD -- Library ProjectFortress/src ProjectFortress/LibraryBuiltin bin` prints nothing). `bin/fortress explorations/claude_demo.fss` printed `SUM[i <- 1#100] i = 5050`, exit 0.

Setup of every call (`probe/w.sh`): the skill's lines (`FORTRESS_HOME=/home/user/fortress`, `FORTRESS_THREADS=1`, Java 25, `-Xmx4g -Xss64m`, `TMPDIR` the main tree's `tmp/`), then `flock /home/user/fortress/tmp/ledger-pass-jvm.lock nice -n 19 timeout -k 10 200`, from the program's folder. Walk: `FORTRESS_CACHES=/home/user/fortress/tmp/ledger-pass/c-run3/run/caches`. Compiled: `FORTRESS_CACHES=probe/ccaches`, a copy of `default_repository/caches` (its five library jars present). "APL path": `FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"`. Programs are under `probe/`, one folder a row, each as its chunk's `questions.md` gives it unless a change is named.

## Row 135 (c10)
- `probe/p135/G1eBigUnion1.fss`; walk `bin/fortress G1eBigUnion1.fss`: exit 0:
  - `typed = {a|->1, b|->2, c|->30}`
  - `untyped = {a|->1, b|->2, c|->30}`

## Row 747 (c10)
- Not run: it needs a library edit in a seeded worktree and the count stage (about 150 s, in the background), outside this folder. `queue.md`.

## Row 307 (c14)
- `probe/p307/NatReflectTest.fss`, a copy of `ProjectFortress/tests/NatReflectTest.fss`. `bin/fortress compile NatReflectTest.fss`: exit 0. `bin/fortress run NatReflectTest`: exit 1:
  - `java.lang.Error: Unable to read serialized data for NatReflect$N??, recommend you delete the Fortress bytecode cache and relink`
  - `at com.sun.fortress.runtimeSystem.InstantiatingClassloader.xlationForFunctionOrGeneric(InstantiatingClassloader.java:2519)`
  - `Caused by: java.io.IOException: Resource not found : NatReflect$N??.xlation`

## Row 499 (c21)
- `probe/p499/XXXGenericPositionalFixed.fss`, a copy of `ProjectFortress/compiler_tests/XXXGenericPositionalFixed.fss`; walk: exit 0: `REACHED`, `PASS` (its asserts: `grab(u)` is `tag`, `grab(t)` is `fixed`).

## Row 77 (c25)
- `probe/p77/p20.fss`. `bin/fortress compile p20.fss`: exit 255: `p20.fss:8:18-24: No such method Tree.tsum.`, the same at `8:29-35` and `12:18-24`, `File p20.fss has 3 errors.`
- Walk `bin/fortress p20.fss`: exit 0: `p20 3.0`.

## Row 78 (c25)
- `probe/p78/p10.fss`. `bin/fortress compile p10.fss`: exit 255: `p10.fss:7:23-30: Could not check call to function tsum`, `- Leaf->RR64 is not applicable to an argument of type Tree.`, `- Node->RR64 is not applicable to an argument of type Tree.`, the same at `7:35-42` and `10:18-23`, `File p10.fss has 3 errors.`
- Walk: exit 0: `p10 3.0`.

## Row 83 (c25)
- `probe/p83/NatApi.fsi`, `NatApi.fss`, `UseNatApi.fss`. Walk `bin/fortress UseNatApi.fss`: exit 0: `first 3.0`, `second 10.0`, `first again 3.0`.
- `bin/fortress compile UseNatApi.fss`: exit 255: `NatApi.fsi:2:18-22: Array1 is undefined.`, `File UseNatApi.fss has 1 error.`

## Row 184 (c29)
- `probe/p184/EqvUser.fss`; walk: exit 1: `before`, then `com.sun.fortress.exceptions.InterpreterBug: .../EqvUser.fss:10:13:`, `** bug! Expect all oprefs to be top level EQV`; no `after`.

## Row 30 (c33)
- `probe/p30/G10.fss`; walk: exit 1:
  - `user top-level +: W(3.0)`
  - `ProgramError: /home/user/fortress/Library/FortressLibrary.fss:3448:27: Failed to find any matching overload, args = (W,W), overload = {` then the library's `+` declarations (`AdditiveGroup` `:361`, `RR64` `:459`, `QQ` `:622`, `Integral` `:703`, `ZZ32` `:762`, ...), no user `+`.
  - Context `FortressLibrary.fss:1440`, `:1318` (`__bigOperator`), `G10.fss:12:46-59` (the `SUM`).

## Row 145 (c33)
- `explorations/apl/rung-3/t03_and.fss`, APL path, from its folder: exit 0:
  - `false AND bump()        = false, bump ran 1 time(s)`
  - `false AND (fn () => …)  = false, bump ran 0 time(s)`
  - `true OR bump()          = true, bump ran 1 time(s)`

## Row 164 (c33)
- `probe/p164/G158.fss`, as given; walk: exit 1: `Unification error: Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr` at `G158.fss:3` (`fill` takes a value since `f3b62bc83`, `tabulate` a function).
- One change, `.fill(` made `.tabulate(` (lines 3): `probe/p164/G158T.fss`; walk: exit 0:
  - `(1) typed scalar lambda   -> scalar-result overload: 3.0`
  - `(2) typed vector lambda   -> vector-result overload: [0#3][ 0.0 1.0 2.0 ]`
  - `(3) untyped scalar lambda -> vector-result overload: 3.0`
  - `(4) untyped vector lambda -> vector-result overload: [0#3][ 0.0 1.0 2.0 ]`

## Row 240 (c33)
- One change from the question's program, its two `.fill(fn` made `.tabulate(fn` (as row 164): `probe/p240/A01AnyResultT.fss`; walk: exit 0:
  - `  objres(f, v) = 1.5   objres(f, m) = 2.5`
  - `  anyres(f, v) = 1.5`

## Row 297 (c33)
- One change, `.fill(fn` made `.tabulate(fn`: `probe/p297/V18PairT.fss`; walk: exit 0, with the run's caches and again on an empty caches folder (`probe/cold`): `(1) m^T = [0#3,0#2]` `[ 0.0 3.0 / 1.0 4.0 / 2.0 5.0 ]`, `(2) t^T = [0#2,0#2,0#3]` (the array unchanged).
- Control, one change from V18PairT, the `Matrix[\RR64,r,c\]` member made `Array[\RR64,(ZZ32,ZZ32)\]`, no static parameters: `probe/p297/V18PairPlain.fss`; walk: exit 1: `V18PairPlain.fss:5:1-78: and ...:4:1-71: first parameters t:[Array[\RR64,(ZZ32,ZZ32,ZZ32)\]] and m:[Array[\RR64,(ZZ32,ZZ32)\]] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present`.

## Row 444 (c33)
- `probe/p444/Sk2InheritedPlain.fss` and `Sk2Inherited.fss`, walk on an empty caches folder (`probe/cold2`): each exit 0, `1`, `2`. The run's caches gave the same.

## Row 229 (c43)
- `explorations/apl/rung-2/s07_chain.fss`, APL path (parser directories in `probe/jtmp`, removed after): exit 255: `s07_chain.fss:8:51-59: Variable apl is not defined.`

## Row 235 (c43)
- `explorations/apl/rung-3/t02_gram.fss`, APL path: exit 1: `ProgramError: /home/user/fortress/Library/FortressLibrary.fss:462:5-64: and .../explorations/apl/base/AplCore.fss:1209:1-1211:80: Overloading of BY(self:(FortressLibrary.RR64 & ...),b:FortressLibrary.RR64) ... and BY(a:FortressLibrary.RR64,b:FortressLibrary.RR64) ... fails because their parameter lists have the same types`, context `T02Syn.fsi:1:16`. No `TA gaps` line.
