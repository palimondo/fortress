# Runs, c-run2 probe

Main tree at `ba03acb76`, clean (`git status --porcelain --untracked-files=no` empty). `bin/fortress explorations/claude_demo.fss` printed `SUM[i <- 1#100] i = 5050`, rc 0. Each command below ran through `probe/r.sh DIR CACHES ARGS` (the skill's call set-up, then `cd DIR && FORTRESS_CACHES=CACHES flock /home/user/fortress/tmp/ledger-pass-jvm.lock nice -n 19 timeout -k 10 200 /home/user/fortress/bin/fortress ARGS`). Walk runs used the run's private caches `tmp/ledger-pass/c-run2/run/caches` unless named; compiled runs used `probe/ccaches`, a copy of `default_repository/caches`. Programs are under `probe/`, full outputs under `probe/logs/`. No run hit the timeout.

## Row 850 (c13), compiled

- `probe/p850/P850.fss` (the question's program): `bin/fortress compile P850.fss`, rc 255:
  - `P850.fss:10:22-27: Types C[\Dog\] and C[\Animal\] exclude each other.  D must not extend them.`
  - `P850.fss:10:22-28: Type D excludes C but it extends C.`
  - `File P850.fss has 4 errors.`
- `probe/p850/P850f.fss` (the question's second program, object `DC`): `bin/fortress compile P850f.fss`, rc 255: `P850f.fss:10:3-33: DC is not a valid object name.` and `File P850f.fss has 1 error.` The name, not the overloading, is refused; one change made next.
- `probe/p850/P850g.fss` (the same with the object renamed `DogCatC`): `bin/fortress compile P850g.fss`, rc 0; `bin/fortress run P850g` prints `1`, rc 0.

## Row 465 (c17), walk

- `probe/q465/` (`Q465.fsi`, `Q465.fss`, `Q465Main.fss`, the question's three files): `bin/fortress Q465Main.fss` prints `2` then `a!`, rc 0.

## Row 789 (c22), compiled

- `probe/p789/P789.fss` (the question's program): `bin/fortress compile P789.fss`, rc 255: `P789.fss:8:19:` / `V is not in the kind env [][][]` / `File P789.fss has 1 error.`
- Control `probe/p789/P789c.fss` (the second declaration alone): compile rc 0; `bin/fortress run P789c` prints `2`, rc 0.

## Row 341 (c22), walk, cold then warm

- `probe/p341/P341.fss` (the question's program), caches `probe/cold341/` new and empty: `bin/fortress P341.fss` prints `4.0`, rc 0 (10 s; the run wrote `FortressLibrary-34d14513.tfs` into the empty `interpreter_cache`, so the library was analysed again); the same command again, warm, prints `4.0`, rc 0.
- One more shape, the row's own old probe (`explorations/run-c4/cold-cache/p4/`, from `11bf69c39^`, copied to `probe/p341b/`: api `MaxLib4` with the pair `MAX[\I\](s: RR64, a: Array[\RR64,I\])` and `(a, s)`, importer `MaxUser4`), caches `probe/cold341b/` new and empty: `bin/fortress MaxUser4.fss` prints `3.0` and `1.0`, rc 0, cold and again warm. Its `run1.txt` of 2026-09-19 held the refusal 'have parameters with generic type, at least one pair of parameters must have excluding types' against `FortressLibrary.fss:280`.
- The claim's sized face, `probe/p341c/P341c.fss` (`opr +[\nat n\](a: Vector[\RR64,n\], s: RR64)` and `(s, a)`, calls `v + 2.0`, `2.0 + v`, `1.0 + 2.0`), caches `probe/cold341c/` new and empty: prints `3.0`, `3.0`, `3.0`, rc 0.

## Row 390 (c26), compiled

- `probe/p390/XXXCoercionAnyOverloadRungC.fss` (copy of the test's source): compile rc 0; `bin/fortress run XXXCoercionAnyOverloadRungC` prints `REACHED`, then `java.lang.NoSuchMethodError: 'fortress.CompilerBuiltin$String XXXCoercionAnyOverloadRungC.\=p{...fss\!20\!1-30,...fss\!21\!1-29}(fortress.AnyType$Any)'`, rc 1.
- The gated test itself: from `ProjectFortress/compiler_tests`, `bin/fortress compile XXXCoercionAnyOverloadRungC.fss` rc 0, then from `ProjectFortress/`, `../bin/fortress junit compiler_tests/XXXCoercionAnyOverloadRungC.test`: `REACHED`, the same `NoSuchMethodError` naming `\=p{_|ProjectFortress|compiler_tests|XXXCoercionAnyOverloadRungC\,fss\!20\!1-30,...}(fortress.AnyType$Any)`, `Saw expected failure (Exit code != 0)`, `OK (1 test)`. (A first junit run reused the probe copy's jar of the same component name; with that jar removed the `.test`, which only runs, could not load the class; so the test's source was compiled first. Both junit runs that loaded showed the same error.)
- Face `probe/p390/Face1.fss` (`g1(y: Object)`, `g1(y: ZZ32)`, `g1(5)`): compile rc 0; run: `NoSuchMethodError: '... Face1.\=g1{...fss\!3\!1-32,...fss\!4\!1-28}(fortress.CompilerBuiltin$Object)'`, rc 1.
- Face `probe/p390/Face2.fss` (`h[\T extends Shape\](x: T, y: ZZ32)`, `h(x: Circle, y: Any)`, `h(x: Circle, y: ZZ32)`, `h(Circle, 3)`): compile rc 0; run: `NoSuchMethodError: '... Face2.\=h{...fss\!6\!1-36,...fss\!7\!1-38}(Face2$Circle, fortress.AnyType$Any)'`, rc 1.

## Row 23 (c30), walk

- `probe/p23/RvwNatArray.fss` (the question's program): `bin/fortress RvwNatArray.fss` prints `literal size: 3`, then `Unification error: .../RvwNatArray.fss:3:15-20:` / `Cannot unify __DefaultVector[\RR64,3\](class com.sun.fortress.interpreter.evaluator.types.FTypeObjectInstance)` / `with ArrayType at .../RvwNatArray.fss:3.15(class com.sun.fortress.nodes.ArrayType) abm=()`, rc 1.

## Row 393 (c30), both paths

- `probe/p393/SkCycle.fss` (the question's program), compiled: compile rc 0; `bin/fortress run SkCycle` prints `fp(QOf(1)) =  1` and `fq(POf(2)) =  2`, rc 0.
- Walk: `bin/fortress SkCycle.fss` prints `fp(QOf(1)) = 1` and `fq(POf(2)) = 2`, rc 0.

## Row 852 (c41), both paths

- `probe/p852/DupParam.fss`: walk `bin/fortress DupParam.fss` prints `2`, rc 0; compile rc 0, `bin/fortress run DupParam` prints `2`, rc 0.
- `probe/p852/DupStaticParam.fss`: walk prints `3`, rc 0; compile rc 0, `bin/fortress run DupStaticParam` prints `3`, rc 0.
