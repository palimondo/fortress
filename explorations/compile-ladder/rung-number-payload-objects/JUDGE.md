# Rung N's judge: the contested fix of a number type named as a value

Decision: **stands**. The skeptic's one contested fix, `eabbfc918b`, is upheld, and nothing is reverted. The branch lands as it stands at `75853c80f6`. One launch of this role worked the rung: the branch's log held no commit of a judge, and the worktree held no uncommitted file of one. I ran no build, test or program. Every result below is quoted from the report that printed it.

## The fix ruled on

`eabbfc918b`, in `CodeGen.forVarRef`: a reference to an imported name whose type is a payload object, and which is that object's own name, is refused at the compile with 'Can't compile the number type ZZ32 as a value yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7003-7007`). Its test is `ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled.test`, an expected failure that names the wall. Its row is 1082 in `record.md`.

## The defect is real, and the rung made it

- The rung's code writes no singleton field for a payload object. `isSingletonObject` is false when `payload != null` (`CodeGen.java:4946`), and the `ONLY` field is written only under `if (isSingletonObject)` (`:5077-5113`).
- `forVarRef`'s branch for an imported name still names the object's class and reads that field (`CodeGen.java:7014`, `:7017`, `:7022`).
- The checker takes the name as a value. On the base, the prelude's `ZZ32` was a trait, and the program was refused at the compile. On the worker's head it compiled and died. The skeptic's run on the worker's head `f7ad195d7b`, against the base through `old-fortress.sh` (`SKEPTIC.md`, "Finding 1"):

      tmp/rung-number-payload-objects/skeptic/run-prog.sh SkObjectValue 4
      === SkObjectValue new compile
      rc=0
      Caused by: java.lang.NoSuchFieldError: Class fortress.CompilerBuiltin$ZZ32 does not have member field 'com.sun.fortress.compiler.runtimeValues.FZZ32 ONLY'
      === SkObjectValue old compile
          Variable 'ZZ32' not found.

So without the fix, the rung turns a program that the base refused at the compile into one that compiles and then dies when it runs. P-178 gives exactly that shape as its reason for the change: "the compiler prelude's open trait lets a program's object extend `ZZ32` ... (row 866, such a program compiles and dies when it runs)". A rung that carries out P-178 should not land a new case of it.

## Why the refusal, of the four ways

1. **Refuse in the code generator (taken).** This is the code generator's own way with a construct that it cannot compile yet. It calls `sayWhat` with 'Can't compile ... yet', and an `XXX` test names the wall: `CodeGen.java:4009-4018` refuses local functions this way, and the skill's `references/compiler.md`, "What the compiled path cannot compile yet", sets out the form. The failure stays at the compile, before any run, as on the base. The phase and the message differ: on the base, the checker refused the name as an undefined variable.
2. **Give the name walk's zero.** Walk builds each of the five number objects as a native singleton by the class of its name (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:454-475`). Its zero ('ZZ32 0', 'RR64 0.0') is what that construction happens to give, not a decision. No entry of POSITIONS says what the name denotes, and the brief takes walk as evidence, not as an oracle. Building it would choose a semantics that the record has not chosen.
3. **Refuse in the checker.** The section's "Files" exclude the checker's Scala.
4. **Change nothing, and pin the death with a run-time pair.** That lands the failure shape that P-178 names (above), and it moves a failure from the compile to the run.

## The fix stays inside the rung

- **Scope.** `forVarRef` is a site that names an object's class and its singleton field (`CodeGen.java:7014-7022`). The section's step 4 asks the rung to "Read every site that names an object's class, not only the three that the probe met". The worker's table of such places (`REPORT.md`, "Each place that names a payload object's type") misses this one.
- **No overlap.** No rung of run 2 declares `forVarRef` (`explorations/coordinator/CLIMB-BATCH-33.md`, "The rule the rungs keep", the run 2 list for `CodeGen.java`). The base has `forVarRef` at `:6923`. The other branches' hunks in `CodeGen.java`, from `git diff c799851472 <branch> -- .../CodeGen.java`, all lie elsewhere:
  - G's nearest hunks are at the base's `:5722` and `:7668`.
  - R's are at `:7123` and `:7164`.
  - W's lie between `:383` and `:4238`.

  So the gather's order N, W, G, R meets no conflict here.
- **The prelude only.** `payloadObjectClass` matches only the rows of `payloadObjects`, and every row is `CompilerBuiltin`'s (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:614-622`, `:633-637`, `:664-672`). Under the selector, the one library's number types have no row (fork N4), so the one library's compile does not change. The two stages that the worker ran on `6465bd6678` still describe the landed code: 'DISTANCE SAME 0' (`SKEPTIC.md`, "What I checked", item 1).
- **No reserved point.** The refused program never ran on the base, where the checker refused it. No gated `.test` pins a number type refused as a variable: `grep -rn "Variable '\(ZZ32\|...\|RR64\)'"` over the test folders prints nothing. The worker's whole tracks on the head showed one failure only, the row-496 test that the change repaired (`SKEPTIC.md`, item 9), so no suite program ran into the field that is missing. All of the rung's tests passed together after the fix:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-fix ProjectFortress/compiler_tests XXXNumberTypeAsValueCompiled.test ... XXXTypecaseArmExcludedRefused.test
      . compile ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled com.sun.fortress.exceptions.CompilerError:
       OK Saw expected exception
      OK (15 tests)

  Those 15 tests cover every test file that the rung adds or renames: `git diff --name-status c799851472 HEAD -- ProjectFortress/compiler_tests`. The whole suites run again at the gather.

## Which claims were right

**The worker.**
- Right that a payload object's class "is no singleton" (`REPORT.md`, "What changed and why", item 4; `CodeGen.java:4946`).
- Its report makes no argument against the refusal. It names no reference to the object as a value, and its list of the places that name a payload object's type left out `forVarRef`, the place that the section's step 4 asked the rung to find.

**The skeptic.**
- Right on the defect, which it reproduced and quoted.
- Right that the rung's design writes no singleton field (`:4946`, `:5077-5113`).
- Right that a refusal at the compile is the code generator's way with what it cannot compile yet (`:4009-4018`).
- Right that the checker is outside the section.
- Right that nothing on record says what the name denotes.
- One claim is loose: "it moves the failure back to compile time, as on the base". It holds for the timing only. The base's failure was the checker's 'Variable 'ZZ32' not found.', while the fix gives a code generator's wall.
- The test's comment line says that the name "compiles, since ZZ32 is a value object without value parameters, a singleton declaration". This holds of the text: `Specification/basic/objects.tex`, section "Object Declarations" (read at `:204-224`), says "A singleton declaration declares a sole, stand-alone, singleton object. It may have static parameters but it does not have a list of value parameters". P-178 gives each of the seven that form, and the checker accepts the name. But the singleton sentence does not fit a type with many values, and the library chapter still says "Here we present only the trait \EXP{\mathbb{Z}}" (`Specification/basic-lib/basic-integers.tex:106`). Neither `CompilerBuiltin` nor `FortressLibrary` is a `native` component (`CompilerBuiltin.fss:12`, `Library/FortressLibrary.fss:12`), so `Specification/basic/components/source-code.tex`, "Native Components", does not make the meaning implementation dependent.
- The test asserts only that the name compiles, and row 1082 leaves its value open ("Which value the name denotes is not settled."). I keep the test and the row as the skeptic homed them, home 2 and `NEGATIVE-VERIFIED`. That is a decision taken where nothing on record settles it, so it is listed for the curator below.

## For the curator

- **What a built-in number type's name denotes as a value**, as in `x: Object = ZZ32`. Nothing on record settles it. The ways:
  - (a) A static error on both paths: a type whose values are native is no singleton. This follows the library chapter's "the trait ℤ" (`basic-integers.tex:106`). It is a checker rung and a walk rung. `XXXNumberTypeAsValueCompiled` would become a refusal test, and row 1082 would become `CONTESTED` until then.
  - (b) The type's zero on both paths, as walk gives it (`BuildEnvironments.java:454-475`). The code generator would then write a sole instance for each payload object.
  - (c) The code generator's wall stays until (a) or (b) is chosen. Taken here, since it is reversible and lands no run-time death.

  The cost of (a) or (b) is one rung. Undoing (c) is one revert of `eabbfc918b`.
- **Row 1082's status:** `NEGATIVE-VERIFIED`, as the skeptic wrote it, reading `objects.tex`'s singleton sentence as making the name a value. It would be `CONTESTED` if the curator reads a native-valued object as no singleton, as in way (a).
