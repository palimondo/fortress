# Quiz answers 1: cases 28 and 39

I read `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, its area parts (all of `references/` except `revival-changes.md` and `sources.md`), and the orientation file. I ran nothing: the answers below come from those texts. Where I would check something before I acted, I say what I would check and where.

## 28. Value objects, strings and a 4-tuple under `assert(x, y, msg)`

### Decision

Under walk, the two-value `assert` calls a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`. Otherwise it compares by `SEQV` (strict equivalence). `Point`, `Run` and tuples extend no such trait, so all three assertions compare by `SEQV`. `SEQV` compares a value object field by field, a tuple element by element, an integer by its value, and a string, which is a reference object, by identity only.

- **`assert(Point(1, 2), Point(1, 2), "point")` passes.** The numerals convert to `ZZ32` at the value parameters, and `1 SEQV 1` and `2 SEQV 2` are true because integers compare by value.
- **`assert(Run(s, 3), Run("abc", 3), "run")` fails.** `s` is built at run time: `t` is a variable, so `t || "c"` does not fold. The literal `"abc"` is a different string object, and a string is `SEQV` only to itself, so the `name` fields are not `SEQV`.
  - This is not a defect. It is the rule's answer (P-168), and the orientation gives this exact case: "`V(s) = V(t)` is `false` where `s` and `t` are equal strings made by two computations."
  - Had `s` been `"ab" || "c"`, the two literals would fold into one, and one text gives one object (P-171), so the assertion would pass. That is why the test uses a variable operand.
- **`assert((1, 2, 3, s), (1, 2, 3, "abc"), "four")` fails** (`false`).
  - The interpreter's library declares `=` on pairs and triples only. A 4-tuple has no `=`, so the comparison is `SEQV` element by element, and `s` against `"abc"` is again `false`. The orientation states this with the same shape: `(s, 1, 2, 3) = (t, 1, 2, 3)` "falls back to `SEQV` and is `false` (row 923)".
  - This is a known behaviour that ledger row 923 records, not a new defect, so I write no new row.
  - Before I wrote anything about it, I would print the row with `explorations/coordinator/tools/facts-extract.sh 'ledger:923'`. If the row reads as a departure that the rules decide, its reproducer names the `XXX` test. If it is a case the rules leave open, the reproducer names a plain test of today's behaviour. Either way, the case is already asserted once, so my test does not assert it again ("Assert each case in one test only").
  - Even a pair or a triple, under the two-value `assert`, goes through the row-807 path, because a tuple extends no `Equality`. To reach the pair or triple `=`, I would write `assert(x = y, msg)`.

Before I wrote the explanation in a report, I would reproduce it ("Reproduce a behaviour before you explain it") by running the test through `harness-one.sh`. I expect the run to stop at the first failing assertion ("run"), so I would see "four" in a second run without the "run" line.

The checks that I keep compare by content, with `String`'s `=`, which compares text. I use the Boolean form `assert(flag, msg)`, so that `String`'s `=` runs and not `SEQV`:

    component ValueObjectContentWalk
    export Executable

    value object Point(x: ZZ32, y: ZZ32) end
    value object Run(name: String, steps: ZZ32) end

    run(): () = do
        t: String = "ab"
        s: String = t || "c"
        (* a value object without its own = compares field by field; a string is compared by its text *)
        assert(Point(1, 2), Point(1, 2), "point")
        r = Run(s, 3)
        assert(r.name = "abc", "run name")
        assert(r.steps = 3, "run steps")
        (a, b, c, d) = (1, 2, 3, s)
        assert(a = 1, "four first")
        assert(b = 2, "four second")
        assert(c = 3, "four third")
        assert(d = "abc", "four text")
    end

    end

The alternative for `Run` is to give it an `=` that compares `name` by `=` and `steps` by `=`, and make `Run` extend `Equality[\Run\]`, so that the two-value `assert` calls that `=`. Comparing the parts is the smaller change.

### Path and scope

- This is walk only: a walk test in `ProjectFortress/tests/`.
- Before the switch-over, the program does not suit the compiled path. The compiler's library declares the two-value `assert` only for `ZZ32`, `String` and `Character`, and declares no `=` over `Any` and none on tuples. Its `===` compares strings and the four number types by `=`, not by identity (row 908).
- After the switch-over, `SEQV` follows the specification on both paths, so the same answers hold.

### Passages relied on

- `references/tests-writing.md`, "A test program": "Under walk, `assert(x, y, msg)` checks that `x` equals `y`. It and `=/=` call a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`, such as `Equality` (ledger row 807). Otherwise they compare by `SEQV` … If a type `P` has its own `=`, make `P` extend `Equality[\P\]`, or write `assert(x = y, msg)`." The same section says "A test of run-time arithmetic or concatenation needs a variable operand".
- Orientation, "Traits and objects", "**Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168).**":
  - the `SEQV` bullets: a value object field by field, a tuple element by element, an integer by its value, "a reference object, a string among them, is equivalent only to itself";
  - "So for a value object `V` without its own `=`, `V(s) = V(t)` is `false` …";
  - "Two string literals of one text are one object (P-171)";
  - "The interpreter's library declares `=` on pairs and triples only, so `(s, 1, 2, 3) = (t, 1, 2, 3)` falls back to `SEQV` and is `false` (row 923). To compare by content, give the value object an `=`, or compare the parts. A string's `=` compares text."
  - The compiler's library sentence: "Until the switch-over, … no `=` over `Any` and none on tuples …" (row 908).
- Orientation, "Numbers", the fold paragraph: "`||` of string literals folds into one literal (P-171) … write … `t: String = "ab"`, then `t || "c"`."
- Orientation, opening section: "A sentence that cites a ledger row states a behaviour that is not settled … Where the rules decide the case, assert their answer in an `XXX` test. Where they do not, assert today's behaviour in a plain test …".
- `references/records.md`, "Reading the record", for the `ledger:ROW` query.
- `SKILL.md`, "Rules for every task", for reproducing before explaining.

## 39. `≡` is not "identical to"

### Decision

`≡` (IDENTICAL TO, written `EQV` or `EQUIV`) is logical equivalence on booleans. The interpreter's library declares it, and its negation `≢`, for booleans only. The operator that compares any two values is strict equivalence, `≣` (STRICTLY EQUIVALENT TO), written `SEQV` or `===`. So reading `≡` as "identical to" is wrong.

Under walk:

- **`assert(small ≡ true, "small")` passes, but by luck.** `small` is `p.x < 2`, which is `1 < 2`, which is `true`, and `true ≡ true` is `true` as logical equivalence. On booleans, logical equivalence agrees with equality, so the check gives the answer the writer meant, through the wrong reading.
- **`assert(p ≡ q, "same point")` does not run.** No `≡` takes two `Pt` values. Walk has no static types, so it finds this only when the call runs, as a failed dispatch. The run stops with an error there, and the harness reports the test red.
  - I would run it once through `harness-one.sh` to quote the exact message, and record it as no defect: the library declares `≡` on booleans only, by design.
  - What the writer meant, `p SEQV q`, is `true`: `Pt` is a value object, so it compares field by field, and `1` against `1` compares by value.

**The program does not compile.**

- The compiled checker types `p ≡ q` statically, finds no applicable declaration at `(Pt, Pt)`, and the type error stops the compile.
- Against the interpreter's library (`FORTRESS_LIBRARY=one`, and so after the switch-over), the cause is that `≡` is declared for booleans only.
- Against the compiler's prelude, before the switch-over, I would check what it declares before I claimed more, with `grep -n 'EQV\|≡' ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi Library/CompilerLibrary.fsi Library/CompilerAlgebra.fsi`. Nothing in my sources gives the prelude a `≡` at a program's own object, so `p ≡ q` is refused there too.

The checks that I keep:

    value object Pt(x: ZZ32) end

    run(): () = do
        p = Pt(1)
        q = Pt(1)
        small: Boolean = p.x < 2
        assert(small, "small")
        assert(p SEQV q, "same point")
    end

- `assert(small, "small")` states the Boolean directly, with no `≡` that a reader could take for identity.
- `p SEQV q`, which can also be written `p ≣ q` or `p === q`, is the strict equivalence that the writer meant. I write the ASCII `SEQV` so that the glyph cannot be confused with `≡` again.
- Since `Pt` declares no `=`, `assert(p = q, "same point")` or `assert(p, q, "same point")` would give the same `SEQV` answer under walk. I keep `SEQV` because it names what is tested.
- Under walk, both kept checks pass.

### Path and scope

- The test is walk only, in `ProjectFortress/tests/`. Under walk, the original second check fails at run time, and the kept checks pass.
- On the compiled path, the original program is refused statically.
- My kept version also does not suit the compiled path before the switch-over. The compiler's `===` is declared to compare strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=` (row 908), not a program's own value object. I would confirm with the grep above before saying so in a report.
- After the switch-over, `SEQV` follows the specification on both paths: field by field for a value object, so `true`. The compiled `SEQV` reads the `ValueObjectMark` that the `value` modifier adds.

### Passages relied on

- Orientation, "Traits and objects", "**Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168).**":
  - "Strict equivalence is the operator `≣` (STRICTLY EQUIVALENT TO), written `SEQV` or `===` in ASCII. The operator `≡` (IDENTICAL TO, `EQV` or `EQUIV`) is a different one: logical equivalence on booleans. The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only."
  - The bullet "a value object is equivalent field by field, … an integer … by its value".
  - The compiler's library sentence on `===` (row 908).
- `SKILL.md`, "The phases": "The tree has no static types, so walk finds a type error only at run time, as a failed dispatch." The same section: "A type error stops the compile."
- `SKILL.md`, "Parallelism and mutable state": a value object "has only immutable fields and value semantics".
- `references/compiler.md`, "What the code generator does": "The `value` modifier adds the mark interface `ValueObjectMark` … The compiled `SEQV` (`nativeHelpers/equality.java`) reads the mark."
- `references/tests-writing.md`, "A test program", on the two-value `assert` falling back to `SEQV` (row 807), and the compiler library's `assert(flag, msg)`, which takes any `Boolean`.
- `references/tests-writing.md`, "Where a test goes, and how it passes": a walk test is green only if it throws no exception.
