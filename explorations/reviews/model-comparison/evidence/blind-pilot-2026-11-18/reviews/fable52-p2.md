# Review

I ran nothing. "Traced" means followed through `after/`; "inferred" means it rests on files outside the folder (`Naming`, `InstantiatingClassloader`, the checker, the library).

## 1. Findings

**F1. Should fix: the else-arm cast is untested.** `after/…/CodeGen.java:4568`, traced.
Every test puts `self` in the then-arm or first clause:
- `chosen(c: Boolean): R = if c then self else R(0, 0) end`
- `mx(self, other: T): T = if lt(other, self) then self else other end`
- `1 => self` / `else => R(0, 0)`

The other arm already has the target type, so `castToTypeBelow` returns early there. Deleting `castToTypeBelow(maybe_else.unwrap(), joined);` turns no test red. The task says the library's `MIN`/`MAX` carry `self` "in one arm", so one of them very likely needs this line.

**F2. Should fix or report: an arm that is a tuple holding `self` gets no cast and has no test.** `CodeGen.java:7680`, inferred.
The mission names `MINMAX` beside `MIN` and `MAX`. Its result is presumably a pair, so its arms are tuples such as `(other, self)`. `castToTypeBelow` starts with `if (!(declared instanceof TraitType || declared instanceof VarType)) return;`, so a tuple-typed conditional is never cast. `forTupleExpr` builds the tuple at its own type (`makeTupleOfSpecifiedType(t)`, line 3890), with `self` at the trait. The library text is not in the folder, so I cannot say whether this fails. The task's motivating case is either covered by a test or reported as open; here it is neither.

**F3. Should fix: the `forIf` casts depend on the checker's type of the conditional, with no fallback.** `CodeGen.java:4535`, inferred.
`Type joined = x.getInfo().getExprType().unwrap(null);` feeds the same guard as F2. If the checker leaves a conditional's type as a union or as none, the cast silently vanishes. The existing comment at 7685 shows typecase does carry a union ("A typecase has the union of its arms' types"), and the new `XXXComprisesValueAtTypecaseArmRun` records exactly that failure. For `if`, only the promoted tests show the join reduces. The null case is safe (traced: `null instanceof` is false).

**F4. Nit: `interfaceByClassFile` changes loading for every rewritten owner, not only the circular one.** `MethodInstantiater.java:268-271`, traced in this file, loader side inferred.
- The base ran `Class.forName(new_owner_class_name, true, icl)`, which loads and initialises. Now any owner with a class file is neither loaded nor initialised here, so static initialisers move to first use.
- Each call site reopens the resource and parses the whole class (`new org.objectweb.asm.ClassReader(in)`), with no cache. `Class.forName` was cached by the JVM.
- The opcode choice itself is right: interface keeps `INVOKEINTERFACE`, otherwise `INVOKEVIRTUAL`, and null falls back to the old path.
- I could not check that `icl.getResourceAsStream` returns the bytes the loader defines, or that `Naming.dotToSep` exists; neither file is in the folder.

**F5. Nit: needless round trip of the name.** `MethodInstantiater.java:267` and `:305`.
`replaceAll("[/]", ".")` is undone by `Naming.dotToSep(dotted_name) + ".class"`. The mangled name before the replace is already the resource stem.

**F6. Nit: awkward shapes in the loader fix.** `MethodInstantiater.java:268-271`, `:304-316`.
- A tri-state `Boolean` with `if (is_interface != null) { if (!is_interface) … } else try {`.
- A `try` nested in a `try` only to close a stream.
- Fully qualified `java.io.InputStream` and `org.objectweb.asm.ClassReader`, where this file imports its ASM names (lines 17-23).

**F7. Nit: tests beyond the task.**
- `chosenByCase` is added to the promoted test. The task names no case expression. If `case` desugars to `if` (`forCaseExpr` is commented out, line 2100), it repeats the `forIf` path with `self` again in the first clause.
- `XXXComprisesSelfGetterCompiled` records a checker refusal ("has no getter called d") unrelated to rows 1050-1052. `context.md` permits recording a measured defect, but P-60 as given does not show the specification settles it.
- `XXXComprisesValueAtTypecaseArmRun` with its link file follows the pair convention and records a real neighbour of row 1051. I could not confirm that the other task has not already recorded it.

**F8. Nit: comment longer than its content.** `CodeGen.java:4532-4534`. Three lines; the second half restates `castToTypeBelow`'s own header.

No must-fix found. Traced and sound:
- `forFnExpr` (3968) and `localFunctionClosure` (4127) cast on the nested generator `cg`, before `ARETURN`, at the header's return type.
- `castToTypeBelow` is reused unchanged.
- `unwrap(null)` matches the existing form at line 2755.
- The three promotions follow the three-file convention, with `REACHED` removed and `PASS` asserted.
- The assertions in `SelfTypeArmRun` distinguish the two arms (7 and 5).

## 2. Removable lines

| Place | Lines | Why | Saved |
|---|---|---|---|
| `MethodInstantiater.java:307-316` | nested `try`/`finally` | try-with-resources, if the source level allows | 4 |
| `CodeGen.java:4532-4534` | comment | one line suffices | 2 |
| `ComprisesValueAtConditionalArmRun.fss:7-10, 25-26` | `chosenByCase` and its two asserts | not named by the task; same path, same arm | 6 |

Total: 6 firm, 12 with the case expression. Better than deleting those six: respell them with `self` in the else arm, which fixes F1. The `Class.forName` fallback (`MethodInstantiater.java:271-280`) may be dead if every non-generic owner has a class file; I cannot tell from the folder, so I do not count it.

## 3. Grades

- **Correct: 4.** The casts and the opcode choice trace correctly for every case that "What you build" names; F2 and F3 are open by inference, and F4 moves class initialisation.
- **Small and fitting: 4.** The code generator side is four statements reusing the existing helper at the right places; the loader side carries the avoidable lines of F5 and F6, and the tests carry F7.
- **Tests that matter: 3.** Each promoted and new plain test would fail without the change and asserts distinguishing values, but one of the four new cast sites is untested (F1), the `MINMAX` shape is absent (F2), and F7 adds cases outside the task.
- **Readable: 4.** The helper's doc comment explains why the load is circular, and `joined` is clear; F6 and F8 cost a little.

## 4. Summary

The change does the hard part well. It finds that the existing `castToTypeBelow` already expresses the settled design, and calls it at the two closure emitters and at each arm of `forIf`, with no new member and no edit to reserved code. It repairs the circular load at the place the task named, by not loading at all, with a comment that states the reason. The promotions follow the convention exactly. Before it lands I would ask the author to:

1. Add a case with `self` in the else arm (F1), most cheaply by respelling `chosenByCase`.
2. Either test a tuple-valued arm of the `MINMAX` shape or state in the report that it is open (F2).
3. Simplify `interfaceByClassFile` and its call site (F5, F6), and say in the report that owners are no longer initialised at expansion (F4).
4. Confirm that the two new `XXX` tests record defects not already held elsewhere (F7).