# c22 questions for the prober

## Row 789: does the compiled checker still refuse the overlapping pair with 'V is not in the kind env'?

Why a run: the row's only evidence is a run on 612869b4a; since then 64fa505c4 ("the overloading check's exclusion test reads ... the static parameters' bounds") and 108ab82d6 changed `OverloadingChecker.scala`, the code that reads exactly this pair's bound `T extends R[\ZZ32\]`. The reproducer is `none`.

Program `P789.fss` (compiled path), whole:

```
component P789
export Executable
trait R[\T\] end
trait Box[\T\] end
object Ob[\U\] extends R[\U\] end
object BoxOb extends Box[\Ob[\ZZ32\]\] end
h[\T extends R[\ZZ32\]\](x: Box[\T\], y: T): ZZ32 = 1
h[\U, V\](x: Box[\V\], y: Ob[\U\]): ZZ32 = 2
run(): () = println(h(BoxOb, Ob[\ZZ32\]))
end
```

Command, from the program's folder with `FORTRESS_CACHES` at the copied caches: `bin/fortress compile P789.fss` (and, if it compiles, `bin/fortress run P789`).

Outcomes:
- 'P789.fss:8:19: V is not in the kind env' and '1 error': the row stands; rewrite it with this probe as the command and output in its notes (reproducer stays `none`, or a new `XXX` compiler test), and drop "on 612869b4a and the rung's head".
- 'Invalid overloading of h': the defect is fixed; close row 789 by the commit that changed the message (look between 612869b4a and the base in `OverloadingChecker.scala`'s history, likely 64fa505c4), test `none` with the probe's output as the reason unless a compiler test asserts it.
- It compiles and runs (prints 1 or 2): a new defect, the checker accepts an overlapping pair; rewrite the row's claim to that, keeping walk's side as row 788.
- Control, only if the first outcome: the second declaration alone compiles and runs (the row's own control).

## Row 341: does walk, from an empty cache, still refuse a program's generic pair of a library operator beside the library's generic declaration?

Why a run: since the row was written (2026-10-08), 6d187d069, 9879d4386, 14e91723f and c41c3d2b0 changed walk's load check (`OverloadedFunction.java`, +939 lines), c41c3d2b0 for "a program's generic operators between an array and a number beside a self-typed group's own" (row 804, FIXED). F-269 still states the refusal of C4's former `MAX` pair.

Program `P341.fss` (walk), whole:

```
component P341
export Executable
opr MAX[\I\](s: RR64, a: Array[\RR64,I\]): RR64 = s
opr MAX[\I\](a: Array[\RR64,I\], s: RR64): RR64 = s
run(): () = println(3.0 MAX 4.0)
end
```

Command, from the program's folder, with a new empty private caches folder (the check runs only when walk analyses the library again, F-269): `FORTRESS_CACHES=<new empty folder> ... bin/fortress P341.fss`; then the same command again on that now warm folder.

Outcomes:
- the cold run dies with 'have parameters with generic type, at least one pair of parameters must have excluding types' naming `StandardTotalOrder`'s `MAX`, and the warm run prints 4.0: the row's refusal stands; rewrite it with this probe in its notes and the cold-cache half pointed to row 342 (pairs.txt).
- both runs print 4.0: the refusal beside the library is gone for this shape; the row closes by the commit that lifted it (likely c41c3d2b0 or 6d187d069, found in git) with test `none` and this output, unless a test under `ProjectFortress/tests/` asserts it; F-269's sentence on `MAX` then needs its own correction (hand-over to FACTS).
- another refusal: rewrite the claim to that refusal.

## XXX tests believed to pass now

None. Each walk `XXX` reproducer of this chunk (416, 697, 788, 522) ran green as an expected failure under the newest gate, which holds for the base; the compiled ones (570, 375, 353) are unrun here, and by reading `CodeGen.java` at c124c6b65 has neither `forObjectExpr` nor `forTryAtomicExpr`.
