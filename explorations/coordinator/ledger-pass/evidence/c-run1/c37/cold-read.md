# Cold read: c37 (rows 113, 126, 320, 830, 842)

Read with only CLAUDE.md, the fortress-repo SKILL.md and its references (not revival-changes.md, not sources.md). The skill names the seven status words but defines them only in the row template, which a cold reader may not print; I read `NEGATIVE-VERIFIED` as "the gap is confirmed present, row open" from its contrast with `FIXED`/`RETIRED`/`DUPLICATE` (records.md).

## Row 113

- **Defect:** Under walk, `===` (`SEQV`) on two objects compares only fields declared in the object body. Constructor parameters are not counted as fields, so an object whose state is all in its parameters (`VPlain(1,2)` vs `VPlain(1,3)`) is wrongly judged equivalent (`true`). Scalars compare correctly (`1.0 === 2.0` is `false`).
- **Where:** walk. `FOrdinaryObject.seqv` (`FOrdinaryObject.java:46-57`) iterates `ftype.getFieldNames()`; `FTypeObject`'s constructor (`FTypeObject.java:53-63`) records only `VarDecl` body fields. Library consequence: `Just[\T\](x:T)` at `Library/FortressLibrary.fss:1640`.
- **Reproduce:** No reproducer test. Write an object with constructor parameters and no body field, compare two unequal instances with `===` under walk; expect `true`. Or recover the probes `explorations/run-b2/probes/g1a_equality{,2,3}.fss` with `git show 22ea0cd90^:<path>`. A worker fixing it starts by writing that test (records.md: a fix starts with its reproduction).
- **Status:** Open, confirmed; build a fix in `FTypeObject` (include constructor parameters in `fields`) or in `seqv`. Workaround: declare one body field.
- **Could not resolve:**
  - "value objects": whether this means Fortress `value object` declarations only, or any object; the examples (`VPlain`, `P`) are not shown, so I cannot tell (language concept / unclear wording).
  - The compiled path is not mentioned: does it behave correctly, or was it not tried? (unclear wording).
  - "(row 114)": whether 114 is a separate open row for the `Just` case, a duplicate, or a sibling; the row does not say "siblings" as rows 126/830 do (unclear wording).
  - `VPlain` vs `VField` naming is guessable (plain = no body field, field = one body field) but not stated.

## Row 126

- **Defect:** Inside an object, a method that names a getter without a receiver (`grad`) fails at name binding, 'Variable grad is not defined.'; `self.grad` works and returns `6.0`. The specification says getters must always be called as `receiver.getterName`, so this matches the design.
- **Where:** walk (the class says walk only); objects with getter declarations; spec `Specification/basic/traits.tex:438-439`.
- **Reproduce:** Object with a getter `g`, a method body reading naked `g`; run under walk; see 'Variable g is not defined.'. Probe at `explorations/gap-ledger-probes/g24.fss`, recoverable with `git show e879b6a44^:explorations/gap-ledger-probes/g24.fss`.
- **Status:** A design limit the spec mandates: leave it; write `self.g`. Sibling row 830 is the library code that breaks this rule.
- **Could not resolve:**
  - The claim says `g`, the notes say `grad`: the same getter under two names (unclear wording, minor).
  - "a naked reference reaches fields": whether a field declared in the object (which has an implicit getter) is reachable by naked name while an explicit `getter` declaration is not; the row does not say which kind of declaration `grad` was (language concept I lack: field vs explicit getter scoping).
  - Why a design limit is `NEGATIVE-VERIFIED` rather than closed: what a worker is meant to do with an open row that the spec endorses (status word's definition not in the skill).
  - Compiled path not mentioned.

## Row 320

- **Defect:** On the compiled path, when an api `P8Api` (say) is implemented by a component with a different name, references to the api's exported variables or functions are emitted against a JVM class named after the api, but only the component's class exists. Result: link fails or `NoClassDefFoundError`. Half of the original issue (mutability of a variable across the api) is fixed.
- **Where:** compiled path, code generator and linker: `CodeGen.java:397` (`packageAndClassName`), `CodeGen.java:4055-4115` (`functionalRefToPackageClassAndMethod`), `NamingCzar.java:1699-1702` (`jvmClassForToplevelDecl`), `linker/Linker.java:72-76` (`whoIsImplementingMyAPI`). Also walk: it refuses with 'Could not find an implementation for API'.
- **Reproduce:** Run `ProjectFortress/compiler_tests/XXXExportVarRungXLinked.test` (expected failure). By hand: `fortress link`, or compile the files one at a time and see `NoClassDefFoundError: P8Api$shared`.
- **Status:** Open; build a fix so references resolve to the implementing component's class (and the linker finds it). The fixed half is `4e4b80253`, test `ExportVarRungX`. Workaround: name the api after its component.
- **Could not resolve:**
  - Whether walk's refusal is part of this gap (the class says codegen only) or a separate one (unclear wording).
  - "files compiled one by one": versus what other way of compiling (together? via link?) (unclear wording).
  - `P8Api$shared`: the `$shared` class suffix is not explained in the skill; I read it as the class holding top-level variables (language/implementation concept I lack).
  - Spec cites the frozen spec by line for the overview; fine per records.md.
  - "full text: history, row 320": read as `explorations/fortress-gap-ledger-history.md`; clear.

## Row 830

- **Defect:** `Library/Avl.fss` fails name binding on both walk and compiled path with 25 errors ('Variable key is not defined' and similar) because its trait bodies call the getters `key`, `val`, `depth`, `asDebugStriing` without a receiver, which the spec forbids (row 126).
- **Where:** both paths; `Library/Avl.fss`, e.g. `AvlNode.check` at line 103 reading `key()`.
- **Reproduce:** Run `Library/Avl.fss` under walk, or run the gate's distance stage over the library components; it stops with 'File Avl.fss has 25 errors.'.
- **Status:** Open library bug; build a fix by editing `Library/Avl.fss` to use `self.key` and so on. Note that no gate runs the file as a program, so a worker must run it by hand to check the fix.
- **Could not resolve:**
  - `key()` with parentheses: is that a naked getter call, or calling `key` as a method, which might need a different fix (`self.key` vs `self.key()`)? (language concept I lack).
  - `asDebugStriing`: a typo in the row, or the real (misspelt) name in the file? (unclear wording).
  - "the phase 3 exit review's zero audit": provenance; and the detail is at `reviews/phase3-exit/zero-audit.md`, A.2, without saying whether that path is under `explorations/` (unclear wording).
  - "The file exports `Executable`": I read this as "it is a runnable program", but whether that matters to the fix is unstated.

## Row 842

- **Defect:** The compiled path's export check rejects a component trait that satisfies an api field `x: ZZ32` with an explicit getter `getter x(): ZZ32`, reporting 'different field x'. The spec says a field declaration in an api is satisfied by a (possibly implicit) getter and/or setter, so this should be accepted.
- **Where:** compiled path, static checker: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`, `equalMember` (`:875-889`) accepts only a component field for an api field; `equalAbstractMember` (`:860-872`) handles the reverse (field for getter) but not this direction.
- **Reproduce:** Run `ProjectFortress/compiler_tests/XXXExportFieldByGetter.test`; the harness shows 'due to different field x' and 'Saw expected failure'.
- **Status:** Open; build a fix in `equalMember` so a getter (and/or setter) satisfies an api field, then promote the XXX test. Workaround: declare the field in the component's trait.
- **Could not resolve:**
  - "climb batch 22c rung A's skeptic": provenance only; does not affect the work.
  - Whether a setter is also needed to satisfy a mutable (`var`) api field: the spec's "and/or" leaves which declarations a `var` field needs open (language concept).
  - Walk is not mentioned: whether walk has an export check at all (unclear wording, minor).
