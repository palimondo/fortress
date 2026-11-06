# c8 questions for the prober

## Row 377: does the fifteen-value `stringOps` program still stop the code generator?

The row's only evidence is a probe run of 2026-09 on climb batch 3's tree; its probes left the tree (ab067d9b6), and `CodeGen.java` has changed by +289 -9 lines since the pin 052a7c3fe. The message's throw site is now `CodeGen.java:2874` at c124c6b65.

Question: at the base, does `fortress compile` of the program below still stop with 'Error trying to close method scope.'? If so, which application is the first that fails (comment out the last five, `void`, `tuple`, `arrow`, `Nothing`, `None`, one at a time)?

Program, compiled path (the compiler's prelude), from `git show ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss`:

```
component Sk2OldNew
import java com.sun.fortress.nativeHelpers.{stringOps.asString => jOld, stringOps.defaultAsString => jNew}
export Executable

inc(x: ZZ32): ZZ32 = x + 1

run(): () = do
    a: ZZ32 = 7
    println("ZZ32 " || jOld(a) || " / " || jNew(a) || " / " || a.asString)
    b: RR64 = 2.5
    println("RR64 " || jOld(b) || " / " || jNew(b) || " / " || b.asString)
    c: String = "s"
    println("String " || jOld(c) || " / " || jNew(c) || " / " || c.asString)
    d: Boolean = true
    println("Boolean " || jOld(d) || " / " || jNew(d) || " / " || d.asString)
    e: ZZ64 = 9
    println("ZZ64 " || jOld(e) || " / " || jNew(e) || " / " || e.asString)
    f: NN32 = 4
    println("NN32 " || jOld(f) || " / " || jNew(f) || " / " || f.asString)
    g: Character = 'q'
    println("Character " || jOld(g) || " / " || jNew(g) || " / " || g.asString)
    h: RR32 = 1.5
    println("RR32 " || jOld(h) || " / " || jNew(h) || " / " || h.asString)
    v = makeZZ32Vector(2)
    println("ZZ32Vector " || jOld(v) || " / " || jNew(v) || " / " || v.asString)
    j = Just[\ZZ32\](3)
    println("Just " || jNew(j) || " / " || j.asString)
    println("None " || jNew(None) || " / " || None.asString)
    println("Nothing " || jNew(Nothing) || " / " || Nothing.asString)
    println("void " || jNew(()))
    println("tuple " || jNew((1, "a")))
    println("arrow " || jNew(inc))
  end

end
```

Command from the main tree (a scratch folder under `tmp/`):

```
mkdir -p tmp/probe-377 && git show ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss > tmp/probe-377/Sk2OldNew.fss
cd tmp/probe-377 && ../../bin/fortress compile Sk2OldNew.fss; echo rc=$?; ../../bin/fortress run Sk2OldNew; echo rc=$?
```

Outcomes:
- It still stops, rc=1, 'Error trying to close method scope.': rewrite 377 with reproducer `none`, the probe's old path and the command in its notes, the throw pinned at `compiler/codegen/CodeGen.java:2874` at c124c6b65, and the first failing application if the narrowing found it (then the claim names that value, and the row becomes a sibling of 340 and 819, same message).
- It compiles and runs: the defect is gone by an unnamed commit between 052a7c3fe and c124c6b65 (bisect over the commits that touch `CodeGen.java`, the newest d96242f0a, 8833d89c5, c324b841c); close 377 with that commit and test `none`, reason: no gated test asserts it; or add a compiled test of the program first.
- It fails otherwise (a checker error, another message): rewrite 377's claim to the new failure, at the base.

## XXX tests believed to pass now

None.
