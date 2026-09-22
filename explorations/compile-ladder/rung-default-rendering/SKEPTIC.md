# Rung S (`rung-default-rendering`): the skeptic's first judgement

**Verdict: refused. One thing must change.**

The new default replaces a rendering that already worked. Before this rung, two built-in value classes printed their value through the old default, and now they print their type name:

- An `RR32` value: `x: RR32 = 1.5; println(x)` now prints `RR32`. Before the rung it printed `1.5`, and walk prints `1.5`.
- A `StringVector`: it printed `[a b ]` and now prints `StringVector`.

The compiled `Object.asString` default must keep the Java rendering that a run-time value class already has. `DefaultRenderRungS.fss` must assert both answers (`1.5`, and the vector's `[a b ]`), and those assertions must pass before the second skeptic runs. Once that holds, the sentence in the report and in the FACTS line, "`FValue.toString` is unchanged, so a Java caller sees the same text", is true again. Today it is false for these two classes.

Everything else the rung claims held up when I checked it. The details are below.

Captures are under `explorations/compile-ladder/rung-default-rendering/probes/skeptic/`, abbreviated `skeptic/` below. Line numbers are those of the rung's tree (`015783775`) unless marked "base" (`d610695c0`).

## The refusal, measured

- **The mechanism.** On the base tree the default was `getter asString(): String = jAsString(self)` (base `CompilerBuiltin.fss:350`), and `stringOps.asString` is `return a.toString()` (base `stringOps.java:38-41`). Most compiled classes did not override `toString`, so the call went back into `asString` and the cycle overflowed. A class that does override `toString` got its own rendering back instead.
- **The two affected classes.** I checked every class in `compiler/runtimeValues/` with three questions: does it extend a `CompilerBuiltin` trait's `DefaultTraitMethods`, does that trait declare a Fortress `asString`, and does the Java class declare `asString()` itself? Two classes have neither kind of `asString`:
  - `FRR32`: `trait RR32` at `CompilerBuiltin.fss:988-990` has only a `coerce`, and `FRR32.java:19` defines only `toString()`.
  - `FStringVector`: `trait StringVector` at `:1150-1155` has no `asString`. Its Java method is misspelled `asSring` (`FStringVector.java:34`), so only `toString()` at `:24` applies.
  
  For both, the old default reached their own Java `toString`. The new default returns the type name instead.
- **Measured.** `skeptic/SkOldDefault.fss` calls the old native directly, which is the old default's body verbatim (`import java …stringOps.asString => jOldAsString`). Capture `skeptic/differentials.txt:214-217`:
  - `RR32 new default: RR32`, `RR32 old default: 1.5`
  - `StringVector new default: StringVector`, `StringVector old default: [a b ]`
  
  `skeptic/SkRR32Render.fss` shows the effect through `println` and `||` (`:207-208`: `RR32`, `[RR32]`). Walk prints the value: `skeptic/SkRR32Walk.fss` gives `1.5` and `[1.5]` (`:222-223`). The walk file uses `narrow(1.5)`, because walk rejects `x: RR32 = 1.5` with "RHS expression type FloatLiteral is not assignable to LHS type RR32".
- **What the specification says.** This is outcome 1 of rule 4: the specification settles the question against the compiled run. The general contract of `toString` (`Specification/basic-lib/objects.tex:117-122`, read `:100-130`) asks for a representation that is "concise but informative", one that "textually represents this object". The type name `RR32` does not represent the value 1.5. The rung itself caused this divergence, so the repair is within its scope.
- **The batch record's rule is broken too.** The batch record keeps `FValue.toString` unchanged "so that a Java or Scala caller sees what `println` shows" (`explorations/coordinator/CLIMB-BATCH-3.md:134`). For `FRR32` and `FStringVector`, `toString()` now answers `1.5` and `[a b ]` while `println` shows `RR32` and `StringVector`. On the base tree they agreed.
- **Why no gate catches it.** No gated test prints an `RR32` or a `StringVector` on the compiled path. `grep -ln 'RR32\|StringVector' compiler_tests/*.fss not_working_library_tests/*.fss` finds only the `Compiled2*` files, which print `args[0]`, a `String`. So the gate would pass with this regression in it, and that is why it has to be asserted.
- **How to repair it (the worker's choice).** Two shapes are available:
  - Change the native: a value whose class declares a Java `toString` of its own keeps it, and only a class that inherits `FValue.toString` (every generated class) gets the type name. Checking the package `com.sun.fortress.compiler.runtimeValues.` is the cheaper test. Either way it is one or two lines in `stringOps.java`, with no new declaration. If the native keeps the name `typeName` after the change, the name misdescribes it.
  - Give `trait RR32` and `trait StringVector` a `getter asString()` each. These would be new declarations in `CompilerBuiltin`, which the batch record rules out for this batch (`CLIMB-BATCH-3.md:164`).
  
  Whichever shape is used, the assertions go in the gated test with messages citing `objects.tex:117-122` or ledger row 321.

## 0. Provenance block

I opened every cited line with `sed -n`.

- **problem:** `DefaultRenderRungS.fss:18` is `println(Box(1))`. Ledger `:332` is row 321. `probes/test-preedit.txt:13` is the `StackOverflowError` line. All match.
- **spec:** `objects.tex:117-122` is the contract of `toString`. `:19-22` says every object implements `Any`'s methods. `Fortress.Core.fsi:14` is `getter asString(): String` inside a `trait Any` whose property at `:24` is the specification's `toString` property. The interpreter's library says the same thing: `FortressBuiltin.fss:51` defines `getter toString(): String = self.asString (* deprecated *)`, which is stronger evidence than the report cites. I re-ran the grep and it prints nothing (rc=1). No `Specification/library/apis/` citation appears. All match.
- **precedent:** these all match:
  - `FortressBuiltin.fss:40-41` (`Object.asString` → `ObjectPrims$ToString`)
  - `ObjectPrims.java:31-35`
  - `FObject.java:33-39`
  - `FTraitOrObject.java:184-191` (`listInOxfords`)
  - `FTypeTuple.java:61-63` (`listInParens`)
  - `FTypeArrow.java:107-109` (`domain + "->" + range`)
  - `InstantiatingClassloader.java:246-269` (decode at `:246-251`, full-stem dispatch at `:252-269`)
  - `stringOps.java:42-45`
- **deviation:** all four cited lines say what the block says: `RenderArgs-compiled-preedit.txt:10`, `stringOps.java:53,60-69`, `judgement-probes-both-paths.txt:16` and `Fortress.Core.fsi:14`. **The format is wrong, though.** The block has four `deviation:` lines, eight lines in all, where the batch's format is five lines with one line per field (rungs B and M use one `deviation:` line). This is a correction, not the refusal.
- **historical:** `stringOps.java` and `CompilerBuiltin.fss` are the only files of the 2012 tree the diff edits. Both are named. The line ranges are right, except that `:14-18` includes the pre-existing `Useful` import at `:18`, which is harmless.

## 1. The recorded failure

It exists, and it was taken before the edit existed.

- **First capture.** Milestone `623c7baf3` (2026-09-22 19:39) commits the first draft of the test with `probes/test-preedit.txt` at `rev=d610695c0`, and `git status` shows only the two new test files: `. run compiler_tests/DefaultRenderRungS (9013ms) java.lang.StackOverflowError`. The typeName native was not in that commit (`git show 623c7baf3:…/stringOps.java | grep typeName` is empty).
- **Final capture.** The committed capture was retaken with the final test on the base prelude and native. Its header lines `:1-11` show the empty diff of the two source files against `d610695c0`, `:13` has the overflow, and `:1065` has `Tests run: 2, Failures: 1`.

## 2. The diff

- **What changed.** The source changes are the ones the report names: the native plus a private helper in `stringOps.java:47-71` with three imports, an import alias at `CompilerBuiltin.fss:283`, and the body at `:351`. No declaration was added to the prelude. The native is as small as its rules allow. I read it line by line against the class loader's decode (`InstantiatingClassloader.java:246-269`) and against walk's `FTypeArrow`/`FTypeTuple`. It compares full stems, so a user object named `Tuple` is not taken for a tuple. It handles `☃` as `()`. It parenthesizes an arrow's domain only when the stem carries more than one input, and a nested arrow reproduces walk's unparenthesized `ZZ32->ZZ32->ZZ32` exactly (`skeptic/differentials.txt:15,34`).
- **It does more than the report says.** The rung also changes the rendering of `RR32` and `StringVector` values (above). The report's list of what a compiled program now prints covers every `object` declaration without an `asString`. My scan reproduced exactly its eight names. But the list misses natively implemented traits, whose values relied on the old default reaching their Java `toString`.

## 3. The precedent search

- **Precedents found and followed.** The rendering precedent (walk's), the decoding precedents (`RTTI.className`, the class loader) and the absence of a class→Fortress-name table are all correctly found and followed.
- **The site count missed.** The search asked "which other natives call `toString()`" and answered 5, of which 1 closes the cycle. That is right as far as it goes. It did not ask the reverse question the repaired defect raises: which values relied on the old default calling `toString()`? The answer is 2 of the 17 value classes in `compiler/runtimeValues/`, `FRR32` and `FStringVector`, and the refusal is those two.
- **A small miss in the names grep.** `grep -rnw typeName ProjectFortress/src/com/sun/fortress` also finds two Java locals at `compiler/OverloadSet.java:1772,1776`, which the report's list omits. Neither is a declaration that can collide.

## 4. The test

- **It covers the defect.** `DefaultRenderRungS.fss` has 16 assertions. It reaches the defect through `println`, `||`, the `Nothing` and `None` singletons, and a `throw` of an object with no `asString`, on plain, generic, value, nested, tuple, arrow and void cases. Each message cites ledger row 321.
- **It passes.** I ran it on a bytecode cache I wiped and rebuilt myself in library order (`skeptic/cache-rebuild.txt`: AnyType 29 s, CompilerBuiltin 126 s, CompilerLibrary 35 s, CompilerAlgebra 2 s, CompilerSystem 2 s, all rc=0). Result: `Passed`, `OK (2 tests)` (`skeptic/gated-tests.txt:3-13`).
- **Comment lines.** The file has exactly one comment line, the pointer to REPORT.md, and so does `XXXJuxtConcatRungS.fss`.
- **What it lacks.** It has no assertion for a built-in value whose rendering must not change. That is the refusal.

## 5. The competing-declaration grep

I searched for `typeName`, `jTypeName`, `fortressTypeName`, `DefaultRenderRungS` and `JuxtConcatRungS` across `ProjectFortress/tests`, `compiler_tests`, every `*_tests` directory, `LibraryBuiltin`, `Library` and the whole of `ProjectFortress/src/com/sun/fortress/`, `.scala` files included. The new names occur only at their new sites. The existing `typeName`s are locals: `TemplateVisitorGenerator.java:179`, `OverloadSet.java:1772,1776`, and the `syntax_abstraction_tests` bindings. No other rung of the batch edits `CompilerBuiltin.fss` or `stringOps.java`.

## 6. record.md

- **The FACTS line.** It is false as written in one clause: "`FValue.toString` is unchanged, so a Java caller sees the same text". This is not so for `RR32` and `StringVector` (above), so after the repair the line must say what the repaired default does for them. Its clause "identical to walk on every probe" holds for static arguments written out. It does not hold for inferred ones. `skeptic/SkInferLit.fss` prints `Cell[\IntLiteral\]` and `Cell[\String\]` compiled, and `Cell[\Int\]` and `Cell[\FlatString\]` under walk (`skeptic/differentials.txt:58-66`). The difference comes from the argument each path infers, not from the native. For the string, the specification backs the compiled side: "A string literal has type `String`" (`Specification/basic/expressions/literals.tex:57`, read `:45-70`). The clause must be narrowed to written-out arguments.
- **The ledger notes.**
  - The row 321 note cites an existing row without renumbering. It is checkable, and its correction to the specification column is right.
  - The row 76 note is right: `CompilerBuiltin.fss:402` is `self ||| b`, and `simpleConcatenate.java:20-24` inserts the space.
  - Provisional row 354 follows the batch rule (highest row 353, `CLIMB-BATCH-3.md:160`). Its silence grep reproduces, and its capture is tracked.

## 7. The three homes

- **Row 321, home 1.** I ran the 16 assertions myself and they pass (`skeptic/gated-tests.txt:3-13`).
- **Void, tuple and arrow spellings, home 1.** These are among the same assertions. My own probe widens them to trait, `Maybe`, nested-arrow, arrow-with-tuple-range and generic-function-instantiated arguments, all byte-identical to walk (`skeptic/differentials.txt:4-19` against `:23-38`).
- **Row 76, home 2.**
  - The name starts with `XXX` and a `.test` file sits beside it. The link is split into a plain-named `JuxtConcatRungSLink.test`, the same shape as the landed rung W pair `BoxDotSpellingsRungWLink.test` + `XXXBoxDotSpellingsRungW.test`.
  - I ran both: `link … OK`, then `Saw expected failure (Exit code != 0)` after `REACHED` (`skeptic/gated-tests.txt:15-30`).
  - `probes/xxx-juxt-goes-red.txt:14-16,23` shows it going red on a deliberate local fix, as the brief requires for a rung's first `XXX` file.
  - The specification settles the question: `operators/intro.tex:68-70` (read `:58-76`) and `expressions/constant.tex:75-79` (read `:68-85`).
- **The `asDebugString` divergence, home 3.**
  - The report says the specification is silent and shows the grep. I re-ran it: it prints nothing.
  - The capture `probes/judgement-probes-both-paths.txt` is tracked.
  - The row is provisional row 354.
- **My own defect.** Once the worker repairs the regression, it goes to home 1 with an assertion in the gated test.

## Differentials

These are my own programs, written for this judgement and run under walk and under `fortress compile` + `fortress run` on the rebuilt cache (`skeptic/run-differentials.sh`, capture `skeptic/differentials.txt`).

| probe | walk | compiled | outcome |
|---|---|---|---|
| `SkArgsRender`: `Tag[\T\]` at `Object`, `Any`, `Number`, `Boolean`, `RR64`, `RR32`, `ZZ64`, `NN32`, `String`, a user trait, `Maybe[\ZZ32\]`, `ZZ32 -> (ZZ32 -> ZZ32)`, `ZZ32 -> (ZZ32, String)`, `Tag[\()\]`; `Cell[\T\]` built inside a generic function at `ZZ32` and at a trait | 16 lines, `:4-19` | the same 16 lines, byte for byte, `:23-38` | agree |
| `SkTraitTyped`: trait-typed variables holding `Sq` and `Circ(3)`, `Just(Circ(1))` | `Sq`, `Circ`, `BoxTwo`, `Just(Circ)` | the same | agree |
| `SkTraitTyped`: `Circ(1).asExprString` | `no expression for Circ` | `[no expression for  Circ ]` (the brackets come from `CompilerBuiltin.fss:352`, the doubled spaces from row 76) | the specification is silent (`asExprString` is not in the prose, per the grep above); it overflowed before this rung, so a loud failure became this value; recommended as an addition to row 354 |
| `SkInferLit`: `Cell(Box(1))`, `Cell(3)`, `Cell("s")`, static argument inferred | `Cell[\Box\]`, `Cell[\Int\]`, `Cell[\FlatString\]` | `Cell[\Box\]`, `Cell[\IntLiteral\]`, `Cell[\String\]` | the string case goes against walk (`literals.tex:57`); walk infers from the run-time class; recommended row |
| `SkRR32Render` / `SkOldDefault` / `SkRR32Walk`: an `RR32` value, a `StringVector` | `1.5`, `[1.5]` | now `RR32`, `[RR32]`, `StringVector`; the old default `1.5`, `[a b ]` | the refusal |
| `SkTwoArgPrint`: `println(Box(1), Pt(2))` | `(Box,Pt)` | `( Box ,  Pt )` | row 76 only; the names agree |
| `SkUnionReturn`: `pick(b) = if b then Box(1) else Pt(2) end`, no declared return type | `Box`, `Pt` | `java.lang.VerifyError: Bad return type` in `pick`, whose descriptor returns `Union⟦Pt,Box⟧` | pre-existing and not this rung's (the `: Object` twin `SkUnionReturnDeclared` prints `Box`, `Pt`); the specification settles it against the compiled side (`functions.tex:104`, the return type is optional; `expressions/if.tex:66-67`, an `if`'s type is the union of its clauses); recommended row |
| `SkOprParam`: `object Op[\opr ODOT\]() end; println(Op[\+\]())` | `Op[\+\]` | `NoSuchMethodError: SkOprParam$Op❮+❯$RTTIc.factory()` | pre-existing; the run never reaches the native. When it does, the native renders the `❮…❯` stem as-is, which the report already lists as unmeasured; recommended row |
| `SkNatParam`: `object Vec[\nat n\]() end; println(Vec[\3\]())` | `Vec[\3\]` | compiles rc=0, then `NoClassDefFoundError: 3$RTTIc` | pre-existing and close to row 307 (a run-time failure where row 307 records checker failures); recommended as an addition to row 307 |
| `SkFnRender`: `println(inc)`, `println(fn …)` | "Non-object receiver … trying to invoke method asString" | statically rejected: `Object->()` is not applicable to `ZZ32->ZZ32` | the default is not involved on either path |
| `SkObjExpr`: `object extends Shape end` | `*objectexpr_ObjectExpr at …` | "Can't compile ObjectExpr" | object expressions are absent from the compiled path (`explorations/coordinator/map/spec-to-implementation.md:224`); not this rung's |
| `SkArrowDomain`: `Tag[\(ZZ32 -> ZZ32) -> ZZ32\]` | `InterpreterBug: BoolBinaryOp is not a subtype of BoolExpr` | "Wrong number or kind of static arguments" | a parse or kind problem on both paths, unrelated to rendering |

**Threads.** The rung writes no mutable state, no field, no transaction and no library state: the native reads `getClass().getName()` and nothing else. So one thread (`FORTRESS_THREADS=1`) is enough for every differential.

## The failure-mode question

These are the loud failures that became quiet values:

- **An object with no `asString`.** `println`, `||`, `asString`, and a thrown object's message now give the bare type name where the stack overflowed. That value meets `objects.tex:117-122` and matches walk on every written-out case. The next person to meet it sees a name instead of a stack trace, and the name is the right answer.
- **`asExprString`** now gives `[no expression for  Circ ]`, and **`asDebugString`** now gives `Box`. Both overflowed before. Neither matches walk, and the specification says nothing on either.
- **The regression.** Separately, and not a loud-to-quiet change, two values that were already quiet and right (`RR32` → `1.5`, `StringVector` → `[a b ]`) became quiet and wrong. That is the refusal.

## Inherited, re-verified

I rebuilt the bytecode cache from empty rather than trusting the worker's (`skeptic/cache-rebuild.txt`; the header of `skeptic/gated-tests.txt` names it by its scratch path `tmp/skeptic/rebuild.txt`, which is this file). On that cache I re-ran `DefaultRenderRungS`, `JuxtConcatRungSLink` and `XXXJuxtConcatRungS`. I did not run `ant compileAll`: the worker's build has `stringOps.class` newer than its source, and `javap` shows `typeName(fortress.AnyType$Any)`. I compared the ladder subset's `pre/` and `post/` results: the exit-code columns are identical and every `.run` output is byte-identical (`cmp`); the TSVs differ only in the two timing columns. I did not run `testFast` or `testSystem`.
