# Questions, chunk c17

## Row 465

**Question.** Under walk at the base, can a program call an overload that only a component declares when its api declares another overload of the same name? The row's library example is gone: commit 031c38bbc put `Array2`'s `opr[_:TrivialOpenRange, i1:ZZ32]` and `opr[i0:ZZ32, _:TrivialOpenRange]` into the api (`Library/FortressLibrary.fsi:1729-1730`), and an earlier batch put `array3(v)` there, so no library case is known to remain.

**Program** (three files in one new scratch folder, path walk):

`Q465.fsi`:

    api Q465
    f(x: ZZ32): ZZ32
    end

`Q465.fss`:

    component Q465
    export Q465
    f(x: ZZ32): ZZ32 = x + 1
    f(x: String): String = x "!"
    end

`Q465Main.fss`:

    component Q465Main
    import Q465.{...}
    export Executable
    run(): () = do
      println(f(1))
      println(f("a"))
    end
    end

**Command** (from the main tree, with a private caches folder as the run's other probes): `cd DIR && /home/user/fortress/bin/fortress Q465Main.fss`

**Outcomes.**
- Prints `2` then `a!`: the gap stands. Rewrite row 465 to this line (it passes `ledger.py check`):

      | 465 | under walk, a program can call an overload that only the component declares, where the api declares others of the same name: with api `Q465` declaring `f(x: ZZ32)` and its component also `f(x: String)`, `f("a")` runs | NEGATIVE-VERIFIED | implementation gap (walk) | `Specification/basic/components/source-code.tex`, "Import Statements" | none | climb batch 7 rung A | Probe (the prober's, three files in one folder): `bin/fortress Q465Main.fss` prints `2` and `a!`. A name only the component declares is refused: `__thrower`, 'Function __thrower is not defined' (probe `explorations/compile-ladder/rung-tabulate/probes/ComponentOnly.fss`, in the parent of `9269f7bd2`). The library's cases are gone: its api now declares `Array2`'s `m[:, j]` and `m[i, :]` (`Library/FortressLibrary.fsi:1729-1730`) and `array3(v)`. Where walk takes the component's overloads over the api's is not located. Declaring them in the api makes the calls legal. full text: history, row 465 |

  The prober then keeps the three files where the reproducer cell can name them, or the cell stays `none` with this command in the notes, as the line has it.
- Prints `2`, then fails on `f("a")` with 'Function f is not defined' or a failed dispatch naming only `f(x: ZZ32)`: walk resolves through the api; the row's claim no longer reproduces. Close it with `031c38bbc` (the api now declares the library's component-only overloads) and test `none`, reason: "the library holds no component-only overload; the general case is refused under walk (prober's run)". If instead the reader judges the claim never held in general, `RETIRED` is the curator's call.
- Fails on load for another reason (export or api mismatch): the probe is malformed; report the message and keep the row's status, rewriting only to drop the false `Array2` example.

## XXX tests believed to pass now

- none. 808's `XXXArray2ShiftedSlice` ran green under the newest gate a12ab5c60, which holds for the base, so it still fails as it asserts. 837, 840, 890 and 891's compiled XXX tests were not run here and nothing in the base's history since their rows touches their mechanisms.
