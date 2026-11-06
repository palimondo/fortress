# Check of c37 (base c124c6b65)

`mech.md`: 5 lines, 0 failing; the copies pass `ledger.py check` and `check --base c124c6b65`. No close, no duplicate, no question, no pair, nothing silent. The cited files are the same at the base and at the head (`git diff c124c6b65 HEAD` over them is empty).

## Row 113 (rewrite): pass
- Fidelity: `FOrdinaryObject.java:46-57` is `seqv`, value types only (`:47`), loops `ftype.getFieldNames()` (`:52`); `FTypeObject.java:53-63` adds the parameters to `fields` inside `if (v instanceof VarDecl)` (`:55-60`); `Library/FortressLibrary.fss:1640` reads `value object Just[\T\](x:T) extends Maybe[\T\]`.
- Nothing lost: `Library/FortressLibrary.fss:1503` is false at the base (a generator line); re-pointed to `:1640`.
- Present, reproducer (`none`, probes in the parent of `22ea0cd90`, outputs quoted), status, form: pass. Cold read: its items (value objects, the compiled path, row 114) resolve from the claim's "value objects", the class `(walk)` and row 114's `DUPLICATE` line; none blocks a worker.

## Row 126 (rewrite): fail, 1
- Fidelity holds: `Specification/basic/traits.tex:438-439` is the note "Getters must always be called with the special syntax: receiver.getterName", in "Method Declarations"; probe `git show e879b6a44^:explorations/gap-ledger-probes/g24.fss` is `object Node(x: RR64)` with `getter grad(): RR64 = 2.0 x`, `viaSelf() = self.grad`, `viaNaked() = grad`. `siblings: 830` is right. Nothing lost.
- Failure (cold read): passage "A getter is a method, and a naked reference reaches fields;". The reader could not tell whether `grad` is an explicit `getter` declaration or a field's implicit getter, and a worker meets the same question: does a field declared in the object stay reachable by naked name? The probe shows it is an explicit getter, and the parameter field `x` is read naked in it. Source: g24.fss above. Correction: replace that passage with "In `object Node(x: RR64)`, `getter grad(): RR64 = 2.0 x` is a method, while a naked reference reaches fields such as `x`;" (notes about 455 of 700).

## Row 320 (rewrite): fail, 1
- Fidelity holds at the cited lines: `Operators.scala:467` `if (!isMutableName(id))`; `CodeGen.java:397` `packageAndClassName = NamingCzar.javaPackageClassForApi(c.getName())`; `CodeGen.java:4055-4115` is `functionalRefToPackageClassAndMethod`; `NamingCzar.java:1699-1702` `jvmClassForToplevelDecl`; `Linker.java:72-76` returns `api` when no map names it. The reproducer `XXXExportVarRungXLinked.test` runs `link` and expects 'Could not find an implementation for API ExportVarRungXLibApi'. 4e4b80253 exists.
- Nothing lost: `CodeGen.java:394`, `:3779-3839`, `NamingCzar.java:1653-1656`, `Operators.scala:444` are false at the base (shifted), re-pointed; "(climb batch 2, rung X)" and "at 052a7c3fe" are story, in the history's row 320. Present: pass.
- Failure (cold read): passage "so `fortress link` and walk refuse, 'Could not find an implementation for API'". The reader could not tell why walk refuses in a row classed `(codegen)`; a worker would look for the fix only in the code generator. Source: walk loads through the same repository, `ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:347` calls `Linker.whoIsImplementingMyAPI` and `:417` prints the message, and `interpreter/Driver.java:400,431` take that `GraphRepository`; FACTS F-22 (FACTS.md:16): "The missing step is the repository's ... Walk and `fortress link` need the first." Correction: replace the passage with "so `fortress link` and walk, through `GraphRepository.java:347`, refuse, 'Could not find an implementation for API'" (notes about 680 of 700, row about 1,140 of 1,200).

## Row 323 (keep): pass
- Spec lines unchanged since ae4f8e38a; no commit touches the cited files; probes are in the parent of `ab067d9b6` (signal path-gone, probe-explained). Nothing hidden.

## Row 474 (keep): pass
- `Thunker.scala:183-217` (`primeVariables`) unchanged since ae4f8e38a, no commit touches it; probes in the parent of `84aef6a4f`; FACTS.md:55 agrees. Nothing hidden.

## Row 830 (rewrite): pass
- `siblings: 126` added, the same rule; nothing lost. `Library/Avl.fss:103` reads `key()`; `asDebugStriing` is the file's own spelling (`:19`, `:63`, `:98`); `export Executable` at `:14`; `explorations/reviews/phase3-exit/zero-audit.md` holds "A.2 Scope" (`:31`), and the record cites detail paths relative to `explorations/`, as FACTS does. Cold read items resolve from the file.

## Row 842 (rewrite): pass
- Fidelity: `ExportChecker.scala:875-889` `equalMember` matches `SVarDecl` only with `SVarDecl`; `:860-872` `equalAbstractMember` takes a component `SVarDecl` for an api abstract getter only; `handleOne` (`:832-842`) gives "different field"; the spec quote is `Specification/basic/components/source-code.tex:408`; the test expects `compile_err_contains=different field x`.
- Nothing lost: `c3c22817c` is story (history); rows 801 and 816 are FIXED (fixed `031c38bbc`, `cc47b637d`), home in their own rows and the history. Present, status, form: pass. Cold read's setter item is the specification's open "and/or", not a defect of the line.

## Row 878 (keep): pass
- `Driver.java:495`, `:436-437`, `:315` hold their words since pin dc571c1f3 (the moved words are the function names, on other lines); no commit touches the file; the report path holds the probe. Nothing hidden.
