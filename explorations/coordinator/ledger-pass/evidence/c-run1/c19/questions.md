# c19 questions for the prober

## Row 545: does each path still refuse the mixed family, and with which message?

Question: at c124c6b65, does `SkFnMixedTop` still fail on both paths, compiled 'Invalid overloading of tag in component SkFnMixedTop' and walk 'first parameters s:[S] and self:[T] are unrelated'? Walk's load check (6d187d069, 14e91723f) and the checker's overloading check (59b1d0a4d, 64fa505c4, 108ab82d6) changed since the row was measured; the row's messages are a month old, and the probe is not whole in its SKEPTIC.md (row-return-type-rule, line 146, describes it).

Program (`SkFnMixedTop.fss`, rebuilt from the row's claim):

```
component SkFnMixedTop
export Executable
trait S comprises { U, V } end
trait T comprises { V, W }
  tag(self): ZZ32 = 1
end
object U extends S end
object V extends { S, T }
  tag(self): ZZ32 = 2
end
object W extends T end
tag(s: S): ZZ32 = 3
run(): () = do
  println("tag(V) = " tag(V))
  println("tag(U) = " tag(U))
end
end
```

Paths and commands, from the main tree, in a scratch folder: `bin/fortress walk SkFnMixedTop.fss`; `bin/fortress compile SkFnMixedTop.fss && bin/fortress run SkFnMixedTop`.

Outcomes:
- Both refuse, messages as the row gives: the row stands; rewrite it with the status `CONTESTED` (the row says the specification does not settle which rule governs, which is the template's `CONTESTED`, not `NEGATIVE-VERIFIED`), the reproducer `none` with the commands and the two messages in the notes, the pins re-read at c124c6b65, and siblings: 492 dropped from the siblings (492 is FIXED) or kept as "the Meet Rule's example, fixed (492)".
- Both refuse with other messages: the same rewrite with the new messages.
- One path accepts and runs (say `tag(V) = 2`, `tag(U) = 3`): rewrite the claim to the path that still refuses, and say which rule the accepting path applied; still `CONTESTED`.
- Both accept and run: the paths now agree on one reading; the row stays `CONTESTED` until the curator or a POSITIONS entry settles the text; rewrite its claim to "both paths accept ...; the specification does not settle which rule governs".

## Row 315: does the compile of ConditionalOpTruncation still die with a duplicate closure class?

Question: at c124c6b65, does `bin/fortress compile ProjectFortress/tests/ConditionalOpTruncation.fss` still stop with 'java.util.zip.ZipException: duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class'? The row's reproducer is a plain walk test that passes, so it does not reproduce the claim, and the measurement is from ladder rung 4. The naming is unchanged (`NamingCzar.gensymArrowClassName(desc, span)` at `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:891-892`, used by `CodeGen.forFnExpr` at `CodeGen.java:3531`), but whether the checker still inserts two thunks at one position is not visible from the source.

Program: `ProjectFortress/tests/ConditionalOpTruncation.fss`, whole, as it is in the tree. Path: compiled. Command from the main tree, in a scratch copy: `cp ProjectFortress/tests/ConditionalOpTruncation.fss $SCRATCH/ && cd $SCRATCH && /home/user/fortress/bin/fortress compile ConditionalOpTruncation.fss && /home/user/fortress/bin/fortress run ConditionalOpTruncation`.

Outcomes:
- Dies with 'duplicate entry ... fn@...': rewrite the row with reproducer `none` (or a new `XXX` compiled test, a change of the tree for a later batch), the command and the message in the notes, the pins `CodeGen.java:3531` and `NamingCzar.java:891-892` at c124c6b65, and the `SkLitThunk` case kept as "probe no longer in the tree".
- Compiles and runs: the defect is gone for this program; then the prober also runs a numeral-only thunk passed where `() -> ZZ32` is expected (`sz(f: () -> ZZ32): ZZ32 = f()`, `run() = println(sz(fn () => 2147483646 + 1))`, compiled; walk prints `2147483647`). If that also runs, close the row with the commit the prober finds by bisect and `none` as test (no compiled test asserts it), or keep it open as `NEGATIVE-BOUNDED` until a test exists.

## XXX tests believed to pass now

None.
