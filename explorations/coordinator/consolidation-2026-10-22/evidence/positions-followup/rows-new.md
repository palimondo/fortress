<!-- The gap-ledger rows that the POSITIONS follow-up of 2026-10-22 drafts for eight entries whose unbuilt part no row held; for the coordinator to file with ledger.py add, nothing filed. -->

# Drafted ledger rows

Each row below is for one entry of `proposals.apply`, which cites it as "row NEW-k". To file one:

1. Write its line into a file under `tmp/`.
2. Run `python3 explorations/coordinator/tools/ledger.py add FILE --section TITLE`, with the section given.
3. Replace "NEW-k" in `proposals.apply` (the entry and its provenance note) by the number that `add` prints.

Each line passed `python3 explorations/coordinator/tools/ledger.py check --rows FILE`, one row to a file, with 0 in the number cell (`1 rows, 0 fail the template`). Here the cell holds `?`, the form that `add` takes. The commands and line numbers in the notes were run or read at `d4d454f9d`. The searches that found no row holding the gap are in `proposals.md`, under each entry.

## NEW-1, for P-12

- Section: "12. The compiled path: constructs, crashes and the switch-over".
- Beside row 69, the `typecheck` command's half. Row 19's notes hold walk's run-time choice of a coercion, its consequence.

```
| ? | walk runs no static type check on its programs: `fortress walk` turns the Scala checker off and never turns type checking on, so a walk program has no static types and walk cannot use the coercions that the compiled checker inserts | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/conversions-coercions.tex`, "Coercion Resolution" | none | POSITIONS cold read | siblings: 19, 69. At d4d454f9d, `sed -n 420,424p ProjectFortress/src/com/sun/fortress/Shell.java` prints walk's branch: `useInterpreterLibraries()`, `setScala(false)`, the phase order and `walk(args)`, with no `setTypeChecking(true)`. `compiler/StaticChecker.java:166` checks a unit only when type checking is on, though `compiler/phases/PhaseOrder.java:130` lists `TYPECHECK` in walk's phase order. So walk chooses each coercion by the run-time value (row 19, `XXXCoercionStaticRungC`). Decided: P-12, after the switch-over. |
```

## NEW-2, for P-17

- Section: "15. Performance and program shape".
- Beside rows 302 and 306, the cost of boxing.

```
| ? | the code generator boxes every number: an `RR64` value is an `FRR64` object between any two operations, and each operator unboxes its operands, calls a static helper that does the primitive `double` operation, and boxes the result, so no compiled `RR64` variable, field or element is a primitive | NEGATIVE-VERIFIED | implementation gap (codegen) | silent | none | POSITIONS cold read | siblings: 302, 306. At d4d454f9d, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FRR64.java:14-22` wraps a `final double val` behind `make(double)`, and `git grep -n -i -E 'DADD\|DMUL' -- ProjectFortress/src/com/sun/fortress/compiler/codegen` prints nothing. `opr +(self, other:RR64)` is `jDoubleAdd(self,other)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:938`), `return a + b` on two `double`s (`nativeHelpers/simpleDoubleArith.java:24-26`); the native interface unboxes with `getValue ()D` and boxes with `make (D)` (`compiler/nativeInterface/FortressMethodAdapter.java:144`). The cost: row 306. Decided: P-17; the arrays' `double[]` store is P-84's. |
```

## NEW-3, for P-54

- Section: "7. Numerals, floats and comparisons".
- Beside rows 330 (the float types' change) and 635 (`QQ`'s raise, fixed). The class is `deliberate (library)`: the raise follows his decision and the revised paragraph, and the change after the switch-over is decided. `implementation gap (library)` is the other reading.

```
| ? | `QQ`'s `floor` and `ceiling` return `ZZ` and raise `DivisionByZero` at +∞, −∞ and 0/0, where the float ruling that `QQ` is to follow has them return the argument's own type and pass the infinities through | NEGATIVE-VERIFIED | deliberate (library) | `Specification/basic-lib/numbers.tex`, "Rational Numbers" | `ProjectFortress/tests/NumberOrderListDeclarations.fss` | POSITIONS cold read | siblings: 330, 635. At d4d454f9d, `Library/FortressLibrary.fss:649-657`: `ceiling` and `truncate` throw at denominator 0, and `floor`, `round` and the brackets call them, all declared `ZZ`; the test's lines 22-31 pin the six raises, which the revised paragraph states (`\revision{revival-rational-rounding}`). Decided: P-54, after the switch-over, beside the float types' change (row 330, P-68): `floor` and `ceiling` return `QQ` and pass the infinities through, and the brackets, `round` and `truncate` give `ZZ`. |
```

## NEW-4, for P-58

- Section: "12. The compiled path: constructs, crashes and the switch-over".
- Walk's half of P-58. Row 309 holds the compiled half, and P-58 names it. The claim is by reading, not run: the cited lines of `NativeApp.java` show it.

```
| ? | walk loads a `builtinPrimitive("…")` string only as the name of a glue class: a string that names a static method of `nativeHelpers/`, as P-58 asks of every native binding, is not loaded | NEGATIVE-VERIFIED | implementation gap (walk) | silent | none | POSITIONS cold read | siblings: 309. By reading, not run, at d4d454f9d: `NativeApp.checkAndLoadNative` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:164`) loads the string with `Class.forName` (`:196`) and casts the instance to a `NativeApp`; a method's name is no class, so the load reports 'Native class … not found.' (`:203`). `git grep -h -o 'builtinPrimitive("com.sun.fortress.[a-zA-Z]*' -- Library ProjectFortress/LibraryBuiltin \| sort \| uniq -c` prints `412 builtinPrimitive("com.sun.fortress.interpreter`: every binding written on one line names a glue class. Decided: P-58, a loader beside the glue classes. |
```

## NEW-5, for P-73

- Section: "6. Integer arithmetic".
- Beside rows 348 (the compiler prelude's inverted spellings, whose note holds the wait) and 429 (unary ∔).

```
| ? | the one library declares none of the specification's saturating operators on the fixed-size integers: ⊞ (`BOXPLUS`), ⊟ (`BOXMINUS`), ⊡ (`BOXDOT`) and ⊠ (`BOXTIMES`) | NEGATIVE-VERIFIED | library gap vs spec (library) | `Specification/basic/operators/opr-overview.tex`, "Addition and Subtraction Operators" | none | POSITIONS cold read | siblings: 348, 429. At d4d454f9d, `grep -c -E 'BOXPLUS\|BOXMINUS\|BOXDOT\|BOXTIMES' Library/FortressLibrary.fsi Library/FortressLibrary.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` prints 0 for each; Outside the compiler prelude (row 348), `BOXPLUS` stands in `Library/Pairs.fss`, on its own run ranges, and in the unloaded draft `Library/incomplete/basic/Fortress.Number.fsi:87-88`. The section "Multiplication, Division, Modulo, and Remainder Operators" gives saturating multiplication as ⊡ or ⊠. Decided: P-73, a step of their own after the wrapping operators. |
```

## NEW-6, for P-84

- Section: "9. Arrays, vectors and matrices".
- Beside rows 305 (no array type on the compiled path) and 306 (the cost). P-17 reaches it through P-84.

```
| ? | the compiled run time has no unboxed `RR64` array store: none of its classes holds a Java `double[]`, and its only array classes are `FZZ32Vector`, over an `int[]`, and `FStringVector` | NEGATIVE-VERIFIED | implementation gap (runtime) | silent | none | POSITIONS cold read | siblings: 305, 306. At d4d454f9d, `grep -rn 'double\[\]' ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ ProjectFortress/src/com/sun/fortress/runtimeSystem/` prints nothing. Walk has the team's one unboxed store, `PrimImmutableRR64Array` over a `double[]` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:43`; `interpreter/glue/prim/PrimImmutableRR64Array.java:40`), which no library factory selects (`explorations/reviews/array-design-ways.md`, section 3). The compiled path has no array type yet (row 305). Decided: P-84, the store with the arrays' `nat` sizes; how an `RR64` array made through the library's generic array traits gets it is array decision A (P-85). |
```

## NEW-7, for P-88

- Section: "9. Arrays, vectors and matrices".
- Review-queue item 248 asks whether P-88 fixes the shape as `ReadableArray2`; the claim says only that no read-only matrix trait exists, and the notes name the probe's other shape.

```
| ? | the library declares no read-only matrix trait: `Array2` extends no `ReadableArray2`, as `Array1` extends `ReadableArray1`, so a read-only matrix such as microGPT's diagonal `Diag` extends the mutable `Matrix` | NEGATIVE-VERIFIED | implementation gap (library) | silent | none | POSITIONS cold read | siblings: 299. At d4d454f9d, `Library/FortressLibrary.fsi:1591-1593` has `Array1` extend `ReadableArray1`, and `:1695-1697` has `Array2` extend `Indexed1`, `Indexed2`, `Rank2` and `StandardMutableArrayType` only; `grep -n ReadableArray2 Library/FortressLibrary.fsi` prints nothing. `Diag` is `explorations/run-c4/src/FlatArrays.fss:36`. The immutable-arrays probe sketched another shape, a standalone `ImmutableArray2` (`explorations/perf-probes/immutable-arrays/REPORT.md`, "Decisions", 1). Decided: P-88. |
```

## NEW-8, for P-151

- Section: "8. Generators, reductions and ranges".
- Beside row 636 (`AnyList`'s clause, fixed). The status is `CONTESTED`, since review-queue item 188 holds whether the departure stands; its Landed line says that no worker makes the move before he answers. If he keeps the move, the row is `NEGATIVE-VERIFIED`; if he keeps the respelling, the row is not filed and P-151's sentence changes instead.

```
| ? | `AnyList`'s `addLeft` and `addRight` are declared and defined in `AnyList`, respelled under its live `comprises { List[\E\] } where [\E\]` clause, where P-151 moves them into `List` | CONTESTED | implementation gap (library) | silent | none | POSITIONS cold read | At d4d454f9d, `sed -n 55,60p Library/List.fsi` prints `AnyList` with `addLeft(e:Any): AnyList` and `addRight(e:Any): AnyList`, and `Library/List.fss:89-90` defines them there. P-151 moves them into `List`; the library keeps them in `AnyList`, which leaves the question for the curator: the bodies can move into `List` in any library change, and nothing built later rests on the respelling. `ProjectFortress/tests/AnyListElementTypeWalk.fss` tests the two on an `AnyList`. |
```
