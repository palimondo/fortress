<!-- The orientation workflow's preservation check, update mode, for climb batch 33b's landing: the one admitted entry, F-388, against the rewritten paragraph of "Numbers"; one failure (the compiled message stated past its measured scope). -->

# Preservation check: climb batch 33b

Checked: `orientation.md` in this folder against the skill's current part (`.claude/skills/fortress-repo/references/revival-changes.md`, 33,294 bytes), `admission.md` and `sources-mapping.md`. `diff` of the two files changes line 89 alone, the rule "The number types are flat siblings (P-43)", from 815 to 758 bytes. Sources read: F-388, F-379 and P-178 (`facts-extract.sh`); `sources.md:1386`; the code and tests named below.

## Failures

### 1. The compiled refusal's message is stated for every object, but holds for a declared one only

- Old passage (`revival-changes.md:89`): "So the checker accepts such an object, and the object dies when its class loads (row 866)."
- New passage (`orientation.md:89`): "Both paths refuse an object below one of the seven, as `object Mine extends ZZ32`. Walk refuses it at load: 'Attempt to extend object type ZZ32'. The compiled checker refuses it: 'Invalid type in extends clause: ZZ32'."
- Source: F-388 says only "a program's object below a number type is refused at the compile" and names no message. The message comes from `compiler_tests/XXXNumberTypeExtendRefusedCompiled.test` (`compile_err_contains=Invalid type in extends clause: ZZ32`), whose program declares `object MyNum extends ZZ32 end`, and from `TypeHierarchyChecker.scala:212`, which checks the extends clause of a declared trait or object. The writer's own note in `sources-mapping.md` gives that scope ("stated for an object only, the measured scope (`NumberTypeExtendRefusedCompiled.fss`, `object MyNum extends ZZ32 end`)"), but the sentence's "it" is "an object below one of the seven", which takes in an object expression too.
- What the landed code does with an object expression: rung N (`75f9f2fbf4`) changed the team's `compiler_tests/XXX6bx.test` so that `Compiled6.bx.fss:17`, `(object extends { ZZ32 } ... end)`, is refused with a different message, 'Objects can only extend traits.' (`scala_src/typechecker/impls/Misc.scala:366`, the `SObjectExpr` case). The merged tree's run shows it: "the team's `Compiled6.bx` with its two messages, 'No such method ZZ32.foo.' and 'Objects can only extend traits.', ' Saw expected failure'" (`climb-batch-33b/RECORD.md:48`).
- Consequence for a worker: a compiled test of an object expression below a number type, written with `compile_err_contains=Invalid type in extends clause: ZZ32` from this sentence, fails, and the worker may take the other message for a regression and chase it. Scope the message to a declaration, for example "The compiled checker refuses a declared one: 'Invalid type in extends clause: ZZ32'", or give both messages.

## Checked and kept

- F-388's rule is in the new text, in the section the admission names ("Numbers", `:89`): the prelude's seven are value objects, and the compile refuses a program's object below one. The rewrite is shorter than the sentences it replaces, as the admission asks.
- "In both libraries, seven are value objects (P-178)": the prelude, `CompilerBuiltin.fsi:103`, `:147`, `:210`, `:273`, `:332`, `:401`, `:444` (F-388); the interpreter's library, `Library/FortressLibrary.fsi:292`, `:511`, `:572`, `:642`, `:713` and `LibraryBuiltin/FortressBuiltin.fsi:41`, `:123` (F-379, `sources.md:1386`). "Both libraries" names the interpreter's library and the prelude, as `compiler.md:34` does.
- "In the interpreter's library, `QQ` is a trait ... (P-166). The compiler's prelude declares no `QQ`": no `QQ` in `CompilerBuiltin.fs?`, `CompilerLibrary.fs?` or `CompilerAlgebra.fs?` (`grep -n '\bQQ\b'` prints nothing); `FortressLibrary.fss:625`, `:719`.
- The path difference: walk at load with its message (unchanged, `tests/NumberTypeExtendRefusedWalk.test`, `load_exception_contains=Attempt to extend object type ZZ32`); the compiled path at the checker. Kept.
- The admission's points for the writer: the refusal stated for an object, not a trait (kept, apart from failure 1); P-178 cited, rows 1003 and 866 dropped, no other sentence cites them (`grep` of `orientation.md` for `1003`, `866`, `class load`, `dies when`); "route A" and "the tower" kept; payload classes, `F<T>.make`, rows 1081 and 1082 left out.
- No other line of the file changed, and no sentence elsewhere states the old compiled acceptance.

Not a failure of this text, for the caller: the regression key's case 36 (`regression/key.md:507`, `:508`, `:516`) still gives the compiled extender as accepted and dead at class load, so a reader of the new text who answers correctly is graded wrong there until the quiz author changes it (`admission.md`, "Outside the orientation").

## Count

One admitted entry checked (F-388), through its four rows of `sources-mapping.md` and the admission's five points for the writer. Failures: 1.
