# Cold read: c-run1/c6

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (not `revival-changes.md`, `sources.md`). Common to all rows:

- `NEGATIVE-VERIFIED`: `references/records.md` lists the seven status words and says the last three close a row, but the definitions live in the row template, which a cold reader may not print. Read here as "a confirmed, open defect": a worker may build a fix. Not settled by the skill.
- "full text: history, row N": read as the row's earlier text in `explorations/fortress-gap-ledger-history.md` (`records.md`). Clear.
- "in the parent of HASH": read as "the file existed at HASH^ and was removed by HASH"; so `git show HASH^:PATH`. Plausible, not stated anywhere in the skill.
- "at c124c6b65" after a line number: the commit at which the cited lines were read. Clear.

## Row 140

- **Defect:** the interpreter's library's `strToFloat` treats every character, the sign included, as a digit (`-` counts as `'-'.codePoint - '0'.codePoint` = -3), so `strToFloat "-1.5"` gives -28.5; and its place values `10^k` are `ZZ32`, so a mantissa of 10 or more digits overflows (17 digits: `Overflow of ZZ32 100000000000000000`). Unsigned short input such as `"1.5"` is right.
- **Where:** the one library, `Library/FortressLibrary.fss:4606-4611` (at c124c6b65). Path not stated; read as walk (the interpreter's library); on the compiled path only after the switch-over.
- **Reproduce:** no test. Probe `explorations/run-c/probes/g140_strtofloat.fss` from the parent of 4ebf80aec, or write `println(strToFloat "-1.5")` under walk.
- **Status:** open defect; build a fix (parse sign, accumulate in a wide type). A workaround exists: `parseFloat` in `explorations/run-c/src/FlatData.fss:13`.
- **Could not resolve:** "the high minus" (presumably the Unicode minus sign U+2212, a language/library concept not in the skill); "Class: library bug (library)" names the area twice, fine. Which path(s) show it is not said (`SKILL.md` asks rows to say).

## Row 338

- **Defect:** walk refuses the literal assignment `d: ZZ32 = -2147483648` (the minimum `ZZ32`) with "RHS expression type Long is not assignable to LHS type ZZ32"; the compiled path accepts and prints it. Read: walk types the positive numeral 2147483648 as a Java long before negating.
- **Where:** walk; integer literal with unary minus, at a typed declaration. Site in walk unknown (the notes say so).
- **Reproduce:** no test; probes `s1.fss` and `s7.fss` under `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/`, from the parent of ab067d9b6, run under walk and compiled.
- **Status:** open defect; a fix needs first finding where walk decides the numeral's type, and checking `ZZ64 = -9223372036854775808`. Workaround: `-2147483647 - 1`.
- **Could not resolve:** "Of the wider probe's five negative edges": which probe is "the wider probe" (s7?) and what the five edges are (unclear wording). "the library's `minimum` getters" at `:736`, `:826`: which types' getters is not said, minor.

## Row 579

- **Defect:** with the compiled checker run against the one library, `|\ x /|` / `|/ x \|` (floor/ceiling brackets) on a `ZZ32` or on a numeral are refused as an ambiguous coercion (to `RR64` or `QQ`), and `round` of a `ZZ32` is typed `ZZ` (via `QQ`) instead of `ZZ32`. Cause: `Integral` declares the brackets and `round(self)` in its body (`FortressLibrary.fss:725-727`) but not in its api (`FortressLibrary.fsi:449`), so the checker only sees `RR64`'s and `QQ`'s versions, reached by coercion.
- **Where:** the compiled checker over the one library (`Library/FortressLibrary.fsi`, trait `Integral`, and `IntLiteral`). Not walk (walk does not check types).
- **Reproduce:** `explorations/reviews/numerics-plan-coordinator/probes-B/check.sh FloorBracketCk base` and `... edit3`, from the parent of 84aef6a4f: 5 errors each. No test.
- **Status:** open, repair is named: declare the three in `Integral`'s api and in `IntLiteral`'s. Not urgent: no gated program sees it before the switch-over.
- **Could not resolve:** "floor and ceiling brackets": the operator spelling is not in the skill (language concept, guessed). "`IntLiteral` its own": read as "IntLiteral's api declares its own three", elliptical. "base" and "edit3" arguments of `check.sh` are undefined (unclear wording; presumably library variants). "`QQ`'s `ZZ`": read as "the `ZZ` that `QQ`'s `round` returns". "climb batch 8 rung Q" and "repair round" are provenance only.

## Row 321

- **Defect:** on the compiled path, rendering (printing, `asString`) an object that declares or inherits a zero-argument member called `toString` recurses until stack overflow; walk prints the type name. Chain: codegen emits the member as a JVM `toString()` returning a Fortress `String`; default `asString` calls `jDefaultAsString` / `defaultAsString`, whose `hasOwnToString` is then true, so it calls `a.toString()`, landing in `FValue.toString`, which calls `asString` again.
- **Where:** compiled path, runtime: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`, `nativeHelpers/stringOps.java:108-118`, `FValue.toString`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXFortToStringRungS.test` (expected failure); contrast `DefaultRenderRungS`.
- **Status:** open defect, build a fix; it blocks adopting walk's `trait Object` (with its `getter toString`). Workaround: name the member otherwise.
- **Could not resolve:** "re-enters `asString`": read as "`FValue.toString` calls the Fortress `asString`", but whether that happens because the generated `toString` overrides the JVM's or because `FValue.toString` itself delegates is ambiguous (unclear wording). Where `FValue` lives is not given. `DefaultRenderRungS`: test file extension/folder not given.

## Row 369

- **Defect:** under walk, a tuple's rendering separates elements with `,` where the specification asks for `, `: `println((1, "a"))` prints `(1,a)`. A seven-element tuple cannot be rendered at all (`CastError`), because only two- to six-element tuples have `opr ||` overloads, and the fallback `opr ||(String, Any)` casts to `Object`, which a tuple is not. The compiled path prints `( 1 ,  a )`, wrong only by row 76's spaces.
- **Where:** walk, the one library: `Library/FortressLibrary.fss:4425-4433` (the five overloads), `:4488` (fallback), `:4549` (`println(a:Any)`). Not `FTupleLike.java:60`.
- **Reproduce:** `ProjectFortress/tests/XXXTupleSeparatorRungS.fss`; seven elements: `ProjectFortress/tests/XXXTupleSevenRungS.fss`.
- **Status:** open, build a fix: change `","` to `", "` in the five overloads; the seven-element case needs its own fix. Sibling of row 374 (same fallback).
- **Could not resolve:** "The one-element `tuple` prefix is not measured": what the `tuple` prefix is (a language/library construct for a one-element tuple?) is not in the skill. "with row 76 repaired it matches": matches the specification, or walk? Read as the specification's `, ` (unclear wording).

## Row 374

- **Defect:** a function value (a named function such as `inc`, or an `fn` lambda) cannot be printed on either path: walk raises `CastError` (the `String || Any` fallback casts to `Object`, and a function is not an `Object` there); the compiled checker refuses the call, since the prelude's `println` takes `Object`, not an arrow type.
- **Where:** both paths. Walk: `Library/FortressLibrary.fss:4549`, `:4488`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:37-41`. Compiled: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:460`.
- **Reproduce:** `ProjectFortress/tests/XXXFnRenderRungS.fss`.
- **Status:** walk half: open, buildable. Compiled half: waits on a specification conflict (`types-vals-vars.tex` puts arrow types under `Any`, beside `Object`; `basic-lib/objects.tex` makes `Object` the root of functions too), so a curator's choice is needed before fixing it. The status word does not say this; the notes do.
- **Could not resolve:** whether a walk fix (render an arrow value) is wanted before the conflict is settled, or the whole row waits (unclear wording). Compiled half partly overlaps the known prelude limit in `references/compiler.md` (print declared at `Object`); the row does not say whether it is just that limit until the switch-over.

## Row 75

- **Defect:** `nanoTime()` returns `RR64` on the compiled path (the prelude, `CompilerBuiltin.fsi:23`) but `ZZ64` under walk and in the one library's api (`FortressLibrary.fsi:2563`, which the specification typesets), so a program passing it to a `ZZ64` parameter runs under walk and is refused by `fortress compile`.
- **Where:** compiled path's prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23`, body `.fss:352`) vs `Library/FortressLibrary.fss:4522` (bound to `simpleLongArith.longNanoTime`).
- **Reproduce:** `bin/fortress compile explorations/tparallel.fss`: "(ZZ64, ZZ64)->ZZ64 is not applicable to an argument of type (RR64, RR64)" at `ms(t0, t1)`. Walk runs it.
- **Status:** leave it: the prelude is deleted at the switch-over and must not be edited (`references/compiler.md`), after which the one library's `ZZ64` applies. Read so; the row itself does not say "no fix" explicitly.
- **Could not resolve:** "the prelude's `RR64` one stays": stays until the switch-over, or stays as a second binding after it? (unclear wording). The status `NEGATIVE-VERIFIED` beside a gap that resolves itself at the switch-over: whether a worker should do anything is left to inference. No `full text: history` pointer, unlike the others (fine). "Found by: ours" undefined.

## Row 76

- **Defect:** on the compiled path, juxtaposing strings (`a b`) concatenates with a space (`|||`), where the specification and the one library use `||` (no separator); e.g. walk prints `k=5`, compiled `k= 5`. This changes the output of nearly every compiled program.
- **Where:** compiled path's prelude, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:406` (one token); compare `Library/FortressLibrary.fss:4512-4514`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXJuxtConcatRungS.test`; also `tests/simplify1.fss` (prints FAIL, "cat dog"); link test `ProjectFortress/compiler_tests/JuxtConcatRungSLink.test`.
- **Status:** open; the fix is one token, but `references/compiler.md` forbids editing the prelude's text. So the row reads as "leave it, workaround `||`, fixed by the switch-over", while the note "the expected failure goes red on a local fix" suggests a fix is anticipated. Conflict not resolved by the row.
- **Could not resolve:** "G6" (an identifier from some earlier list, undefined). Whether the one-token fix is allowed given the prelude rule (unclear). "goes red": read as the XXX test then passes unexpectedly and must be renamed (`tests-writing.md` convention), plausible. "as rows 314 and 316 do": rows not available to me. "the ladder file" (compile ladder, from `gate.md`), clear enough.

## Row 458

- **Defect:** under walk, a program's own `p1 ANDCOND p2` of two relational predicates evaluates correctly but is not itself recognised as relational: `relational[\ZZ32\](p1 ANDCOND p2)` is `false`, because `relational` reads the declared arrow type and the program's `ANDCOND` yields a plain `Condition[\()\]`. `filter` still fuses the two, through `andRelCond`. A fix by an overload returning the relational type would need an `excludes` declaration that the checker refuses, hence "design limit".
- **Where:** walk, the one library: `Library/FortressLibrary.fss:4909-4916` (`andCondCombine`, `andRelCond`), `:4860`, `:4862` (`SimpleFilterGenerator2`), `Library/Generator2.fss:88-93` (`relational`).
- **Reproduce:** no test; probe `explorations/compile-ladder/rung-exclusion-remainder/probes/values/HValues.fss` from the parent of ab067d9b6, under walk.
- **Status:** leave it (design limit); workaround: call `andRelCond` directly.
- **Could not resolve:** "relational predicate", `ANDCOND`, `Condition[\()\]` and what fusing in `filter` buys: library concepts not in the skill (language/library concept). "a program's own" `ANDCOND` versus "the api's": read as a user-defined operator versus the library's, but which the library actually exports is unclear. "beside the api's would be legal under walk only by ... excludes ...": hard to parse (unclear wording).

## Row 313

- **Defect:** a top-level singleton object's field initializer with a side effect runs eagerly under walk (at component start) and lazily on the compiled path (at the first read of `P.ff`, when the JVM runs the class's `<clinit>`). Only the order of output lines differs; the count is the same. Top-level variables already get the right order.
- **Where:** compiled path, code generator: top-level `object` declarations compiled to classes with `<clinit>`.
- **Reproduce:** run `ProjectFortress/tests/immutableTopLevel.fss` under walk and compiled, compare line order (the test asserts no order); recorded compiled output `explorations/compile-ladder/rung3/raw/immutableTopLevel.fss.run` from the parent of ab067d9b6. Its other difference is row 76.
- **Status:** open, build a fix (eager initialisation in component order, per `initialization.tex`).
- **Could not resolve:** "ladder rung 3": provenance only. `O.p(1)` in the example: `O` is not defined in the row (presumably another object that prints). "The side-effect count is 7": of that test program, not of the one-line example (unclear wording). Which order the specification requires is implied (walk's), not stated.
