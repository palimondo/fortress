# Cold read: c-run3/c10

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, `references/records.md` (for status words, the history file, `$T` queries). Nothing else.

## Row 49
- **Defect:** under walk, an array literal with no declared element type is never turned into an array. Bound to an untyped variable it errors `Can't infer element type for array construction`; passed as an argument it arrives as the raw unfinished paste (a tuple-like `IUOTuple`), so `3 - [1 2]` fails dispatch on `(1,2): (Int,Int)`. The specification says the literal's type is an `Array` over the union of element types.
- **Where:** walk only. Array-literal expressions; `LHSEvaluator.forLValue` (`LHSEvaluator.java:140-145`) and `Evaluator.forArrayElements` (`Evaluator.java:854-861`), at c124c6b65.
- **Reproduce:** run `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss` under walk; or `x = [1 2]` / `3 - [1 2]`.
- **Status:** NEGATIVE-VERIFIED, open: build a fix (compute the join of element types in `forLValue`, finish the paste in argument position). Workaround: a literal-sized declared type.
- **Could not resolve:**
  - "paste": the skill never defines it; I read it as the intermediate value of a juxtaposed array literal before it is finished into an array (language/implementation concept not in the skill; inferable).
  - "Bites `RR64` as hard as a user type": unclear wording; I guess it means the failure is not limited to user-defined element types, but it could also mean RR64 has a particular extra problem.
  - "`Array`k`[\T, 0, n0, …\]`": garbled notation (stray `k` and backticks); presumably the spec's `Array_k[\T,0,n0,...\]` for a k-dimensional array. Unclear wording.
  - "full text: history, row 49": understood via `records.md` as the earlier text in `explorations/fortress-gap-ledger-history.md`; fine.
  - "ours, run-c3, climb batch 3 rung C": provenance; not needed to act.

## Row 104
- **Defect:** under walk, `w: Array[\RR64,ZZ32\] = [ ... ]` (or the 2-D `(ZZ32,ZZ32)` index form) raises nothing, but `w` is never stored; the next statement runs and the first use of `w` fails with `undefined variable [w]`.
- **Where:** walk only. Local declaration with a runtime-sized array type; the `if`-chain in `LHSEvaluator.forLValue` (`LHSEvaluator.java:179-203`, at c124c6b65) has no arm for `Array[\E,I\]`.
- **Reproduce:** no test. Probes `explorations/run-b/probes/c02f_silent_unbound.fss` and `c02e_pasting_variants.fss`, which I take to be deleted and recoverable with `git show ed6dafb52^:PATH`; or write the declaration then a use.
- **Status:** NEGATIVE-VERIFIED, open: build a fix (an arm in `forLValue` for `Array[\E,I\]`). Workarounds: literal-sized type or `array[\RR64\](n).fill(...)`.
- **Could not resolve:**
  - "It swallows even a paste that succeeds with a literal-sized type": readable two ways: (a) a literal that would build fine under a literal-sized type is still dropped when the declared type is runtime-sized; (b) the literal-sized case is itself swallowed, which would contradict the workaround. I read (a). Unclear wording.
  - "row 107": cited here but not in the siblings list; I do not know what row 107 holds beyond "a paste that succeeds" (row 106 also lists 107 as sibling). Unclear wording / missing context.
  - "in the parent of `e879b6a44`": I infer the probe was removed in that commit; the row does not say so. Unclear wording, inferable.
  - "paste": as row 49.

## Row 106
- **Defect:** under walk, a block paste whose grid of blocks has only one row or only one column (horizontal `[A B]`, vertical `[A ; B]`, `[h1 h2 h3 h4]`, even with square blocks) always fails its extent check with `Element at [0] has extent 2 along axis 1 but an earlier element has length 0`. Cause: `IUOTuple.finish` initialises `extents` to -1 (no constraint) but leaves `extentSums` at 0, and an axis beyond `extents.length` uses `extentSums`, whose `current < 0` guard never fires.
- **Where:** walk only. Matrix block pasting; `IUOTuple.java:113`, `:116-122`, `:199-205`, at c124c6b65.
- **Reproduce:** no test. Under walk paste two 2x2 matrices `[A B]`, or three `[a b c]`, untyped or `Array[\Any,ZZ32\]`. Probes `explorations/run-b2/probes/g1d_paste1.fss`, `g1d_hcat.fss`, recoverable from the parent of `22ea0cd90`.
- **Status:** NEGATIVE-VERIFIED, open: build a fix (initialise `extentSums` consistently, or fix the guard). Workarounds: `tabulate` over an index map; for matrices, `array[\Any\](n)` with puts or varargs (row 130).
- **Could not resolve:**
  - "block grid has a single row **or** a single column of matrix elements": I read it as the block layout being 1xN or Nx1; whether a 2x2 grid of blocks works is implied but not stated. Mild unclarity.
  - "with puts": I take "put" to be indexed assignment `a[i] := x`; not in the skill.
  - "row 130": varargs workaround is named but not described; must look up the row.
  - "row 107" as a sibling: content unknown.

## Row 142
- **Defect:** under walk, a typed array literal in a top-level variable declaration (`shp: Vector[\ZZ32,9\] = [27 16 27 ...]`, or `RR64[9]`) is bound as an unfinished paste/tuple and fails `Type mismatch binding (27,16,...): (Int,Int,...) ... to shp (type Vector[\ZZ32,9\])`; with commas instead it fails `Operator [_] is not defined.` The same declaration inside a function body works.
- **Where:** walk only. Top-level `var` declarations; `BuildEnvironments.forVarDecl4` (`BuildEnvironments.java:780-794`, at c124c6b65) type-checks the raw paste, while only `LHSEvaluator.forLValue` (body declarations) builds the array.
- **Reproduce:** no test. A top-level `shp: Vector[\ZZ32,9\] = [...]` under walk; probes `explorations/run-c/probes/p08a_literal.fss` to `p08d`, from the parent of `4ebf80aec`.
- **Status:** NEGATIVE-VERIFIED, open: build a fix (finish the literal in `forVarDecl4`, likely sharing the code of row 49/104). Workaround: `array[\ZZ32\](9).tabulate(fn ...)`, or declare it in a function.
- **Could not resolve:**
  - "`p08c` (commas)": I read it as `[27, 16, ...]` with commas; whether the commas literal is even legal Fortress for an array is not said. Mild.
  - "paste": as row 49.

## Row 343
- **Defect:** under walk, a top-level variable named `shared` (any name the implicitly imported library also declares), exported through an api, is undefined at run time (`undefined variable [shared]`). Separately, neither walk nor the compiled path reports the static error of two declarations of one name in one namespace.
- **Where:** walk for the undefined variable: `BuildApiEnvironment.forVarDecl` (`BuildApiEnvironment.java:118-140`, `:132`, `:135`, at c124c6b65) against the library's `shared` at `Library/FortressLibrary.fsi:45`. The missing static error belongs to the compiled checker.
- **Reproduce:** no test. An api exporting `var shared: ZZ32` (or immutable), its component defining it, a program using it, run under walk. Probes `explorations/compile-ladder/rung-export-var/probes/skeptic/SkKw*.fss`, from the parent of `ab067d9b6`.
- **Status:** NEGATIVE-VERIFIED, open: build a fix on walk; the static error is checker work. Workaround: use a name the library does not declare.
- **Could not resolve:**
  - The mechanism: "binds the name only when `getValueRaw(sname)` answers a value, else adds it to `api.unresolvedExports`" and "`putValueRaw` copies the value": which environment `getValueRaw` searches and which value is copied (the library's function or the component's variable) is not said, so I cannot tell why the clash leads to "undefined" rather than to the library's `shared`. Unclear wording.
  - "neither path reports the static error": row 344 says the compiled prelude has no `shared`, so on the compiled path there is no second declaration to clash with; "neither path" reads two ways (no clash detection anywhere vs. this specific clash). Unclear wording.
  - "a free name": I read it as a name not declared by the library. Mild.
  - "rung X's skeptic": provenance, not needed.

## Row 344
- **Defect:** the compiler's prelude lacks the specification's locality functions `shared`, `isShared` and `localize`. Under walk `shared(3)` is `3`; compiled, it is refused with `Variable shared is not defined.`
- **Where:** compiled path (prelude). The interpreter's library has them at `Library/FortressLibrary.fsi:45,47,49`, bodies at `Library/FortressLibrary.fss:65,67,69` (at c124c6b65). Also `ProjectFortress/compiler_tests/ExportVarRungXApi.fsi:5`, which declares its own `var shared: ZZ32`.
- **Reproduce:** no test. `bin/fortress compile` on a program calling `shared(3)`; probe `explorations/compile-ladder/rung-export-var/probes/skeptic/SkKwCall.fss`, from the parent of `ab067d9b6`.
- **Status:** NEGATIVE-VERIFIED, but not to fix in the prelude: the prelude takes no new declarations, and the switch-over (compiled path onto the one library) brings them. A worker doing the switch-over must also fix `ExportVarRungXApi.fsi`, which will then clash (row 343). Otherwise leave it.
- **Could not resolve:**
  - "the prelude takes no new declaration": I read it as a standing decision (likely in POSITIONS), not a technical limit; the row does not cite where it is decided. Unclear wording, inferable.
  - "the switch-over breaks it": whether the break is the static error of row 343 or walk's undefined variable is not said. Mild.
  - Class "library gap vs spec (prelude)": clear enough.

## Row 841
- **Defect:** walk never checks a component against the apis it exports. If an api's trait declares `f()` and `g()` but the component's trait declares only `g()` (or `f` at another header, e.g. `f(): String` vs. `f(): ZZ32`), walk loads and runs it, dispatching to the object's `f` (prints `mk().f() = 3, mk().g() = 2`, or `mk().f() = other header`, rc 0). The specification's export rule and the compiled path's export check refuse such a component.
- **Where:** walk only. `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java:48-136` (the missing-exports check is commented out), at c124c6b65; no walk pass compares trait members with the api's.
- **Reproduce:** no test. The programs in `explorations/compile-ladder/rung-abstract-declared/REPORT.md`, section 7 (program `WalkAbsent`), run with `bin/fortress`.
- **Status:** NEGATIVE-VERIFIED; "Home: P-12's step" suggests the fix belongs to a step of the curator's decision P-12, so do not build it on its own: look up P-12 first (`$T 'P-12'`).
- **Could not resolve:**
  - "Home: P-12's step": I know P-12 is a POSITIONS entry, but not what step it names, whether it is scheduled, or whether a worker may fix this now. Missing context.
  - "where the object defines it": reads as "provided the object `O` defines the method", but could be read as a location. Unclear wording.
  - "the text's export rule": I take "the text" to mean the specification. Unclear wording.
  - Specification cell `basic/components/source-code.tex` lacks the `Specification/` prefix the other rows use. Unclear which tree (current or frozen).
  - "siblings: 816": row 816's content unknown.

## Row 900
- **Defect:** under walk, writing a rope (a string over 32 characters built with `||`) to a `FileWriteStream` stops the run with `Unification error: Closure/Constructor for writeOn param 1 (stream:WriteStream) got arg <Write handle to ...> of type FileWriteStream`, because `FileWriteStream` extends only `FileStream`, not `WriteStream`, so the rope's `writeOn` cannot take it. Flat strings write fine.
- **Where:** walk; the library: `Library/File.fsi:102`, `Library/File.fss:66` and `:79`, at c141e7f6a; `Library/Stream.fsi:64`.
- **Reproduce:** no test. Under walk, `o.write("a rope: abc...xyz" || "ABC...XYZ\n")` on a `FileWriteStream`; rc=1 with the error quoted.
- **Status:** NEGATIVE-VERIFIED, open: build a fix: make `FileWriteStream` extend `WriteStream`, which then requires a `flush()` (row 901); fix both together.
- **Could not resolve:**
  - "which the review's option (b) does": which review (presumably the finder, `io-objects-carrier-2026-11-06`) and what option (b) is, is not given; I cannot locate it from the skill. Missing context.
  - "abc…xyz": I read it as the literal alphabet written out, so the concatenation exceeds 32 characters. Mild.
  - Whether the compiled path shows it is not said (class says only "library").

## Row 901
- **Defect:** in the one library, `FileWriteStream` defines no `flush()`, though its api `Library/File.fsi:131` declares one; under walk `o.flush()` stops the run with `Cannot find definition for method flush given receiver <Write handle to ...>`. Walk does not catch the missing method at load (row 841).
- **Where:** walk; the library: `object FileWriteStream` in `Library/File.fss:66`, at c141e7f6a; `WriteStream`'s `abstract flush()` at `Library/Stream.fsi:64`.
- **Reproduce:** no test. Under walk, `o = FileWriteStream("out"); o.write("x\n"); o.flush()`; rc=1 with the error quoted.
- **Status:** NEGATIVE-VERIFIED, open: build a fix: add `flush()` to `FileWriteStream`, together with row 900's `extends WriteStream`.
- **Could not resolve:**
  - "the one library's": defined in the skill (interpreter's library); clear.
  - Whether the compiled path is affected is not said. Mild.

## Summary
- Row 49: clear, except "Bites `RR64` as hard as a user type" and the garbled `Array`k`[...]` notation; "paste" undefined in the skill.
- Row 104: mostly clear; "swallows even a paste that succeeds with a literal-sized type" reads two ways; row 107 cited without context.
- Row 106: clear; minor: "puts", row 130 workaround undescribed.
- Row 142: clear.
- Row 343: blocked on mechanism (`getValueRaw`/`putValueRaw` which value) and on "neither path reports the static error" given row 344.
- Row 344: clear; "the prelude takes no new declaration" uncited decision.
- Row 841: blocked on "Home: P-12's step" (whether to fix now); "where the object defines it", "the text's export rule" unclear; spec path lacks prefix.
- Row 900: clear except "the review's option (b)".
- Row 901: clear.
