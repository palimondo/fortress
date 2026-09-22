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

---

# Rung S (`rung-default-rendering`): the skeptic's second judgement

The first judgement above is kept unchanged because `JUDGE.md` and `REPORT.md` cite its line numbers. This section is the re-judgement of the repaired branch at `1f4d805fb`.

**Verdict: approved, with two required corrections.** The repair does what the refusal asked for, and I re-ran every check it claims. `RR32` prints `1.5` and `StringVector` prints `[a b ]` again, both asserted in the gated test. The six expected-failure tests and the interpreter one behave as the report says. The provenance block, the recorded failure and the record hold up.

This round I measured one defect the repair round introduced into its own detection. The rung's default still overflows the stack for an object that declares or inherits a zero-argument Fortress member named `toString`. On the base tree this case overflowed too, so the rung makes nothing worse than the base. The failure stays loud, no program in the compiled corpora or the compiled prelude has this shape, and a fix has been verified. That makes the rung improvable rather than wrong, so I do not refuse a second time. The defect still needs a home, though. Under the three-homes rule it cannot be repaired after this judgement, so it goes to home 2 as an expected-failure test, which I wrote and ran (correction 1). The record must stop saying that row 321 is fully repaired (correction 2).

Captures from this round are under `explorations/compile-ladder/rung-default-rendering/probes/skeptic/`, prefixed `skeptic2-`, and are cited as `skeptic/…` below. The probes are the `Sk2*.fss` files there. Line numbers are those of `1f4d805fb`.

## The finding: the repaired detection is fooled by a Fortress member named `toString`

- **Measured.** I wrote four programs, each with an object that has no `asString` of its own:
  - `skeptic/Sk2FortToString.fss`: a method `toString(): String = "foo"`.
  - `skeptic/Sk2FortToStringGetter.fss`: a getter `toString`.
  - `skeptic/Sk2TraitToString.fss`: a getter `toString` on a trait, which the object inherits.
  - `skeptic/Sk2FieldToString.fss`: a field named `toString`.

  Walk prints the type name for all four (`Foo`, `Bar`, `Qux`, `Rec`). The compiled run prints the Fortress `toString` correctly when it is called (`foo`, `bar`, `named`, `r`), and then `java.lang.StackOverflowError` on `asString` or `println`. Captures: `skeptic/skeptic2-differentials.txt:2-13`, `:14-25`, `:26-37` and `:38-52`, compile rc=0 and run rc=1 each time. A member named `toString` that takes a parameter does not trigger it (`W` at `:47`), and neither does a `var` field (`Counter` at `:48`).
- **Mechanism.**
  - Codegen emits the Fortress member under its own name. The generated `Sk2FortToString$Foo` declares `public fortress.CompilerBuiltin$String toString();` (`skeptic/skeptic2-overflow-cycle.txt:8`).
  - `Class.getMethod("toString")` returns a matching public method declared in the class itself before it looks at any superclass, whatever the return type. So `hasOwnToString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:79-86`) sees `Foo` as the declaring class and answers true.
  - `a.toString()` at `:76` is the Java `toString()Ljava/lang/String;`, which resolves to `FValue.toString`, which is `this.asString()`. That call enters `CompilerBuiltin.fss:351`, which calls `defaultAsString` again. The trace shows exactly this four-frame cycle at `skeptic/skeptic2-overflow-cycle.txt:33-40`.
- **Why the judge's safety argument missed it.** `JUDGE.md` section 3 and `REPORT.md:17` say that codegen emits no `toString` of its own, on the evidence of `grep -rn '"toString"'` over codegen. That grep finds only literal emissions of the name. It cannot find a method that codegen names after a Fortress declaration.
- **The specification.** `Specification/basic-lib/objects.tex:19-22` (read `:1-60`) says every object implements `Any`'s methods, and `toString(): String` is one of them (`:30`, rendered `:47`). Its contract at `:117-122` (read `:100-140`) asks for a textual representation. So declaring `toString` in an object is the specification's own way of rendering an object. The team's interpreter library does it in `Library/Generator22D.fss:64,107,172`, `Library/Generator2.fsi:61,70` and `Library/FortressLibrary.fsi:1841,1849`, and the interpreter's `trait Object` declares `getter toString(): String = self.asString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:51`). The program is legal, and a `StackOverflowError` is not a rendering. This is outcome 1 of rule 4 against the compiled run, on legality. The spelling `Foo` is Pavol's decision for row 321, and walk already prints it.
- **Relation to base and to the refused tree.** On the base tree this program overflowed, through `jAsString`, `a.toString()` and `FValue.toString`. On the refused tree (`typeName` bound) it would have printed `Foo`. So the repair round reopened this case of row 321, but relative to the base it is not a regression. None of the gated corpora or the five compiled prelude components declares a member named `toString`: `grep -n toString` over the prelude finds only the `jAPToString` import alias at `CompilerBuiltin.fss:313`, and the `compiler_tests` hits are the comment at `IntLiteralWrapRepairR2.fss:49`. The gate will not meet it.
- **Switch-over consequence.** If the one library keeps `FortressBuiltin.fss:51` on `trait Object`, every generated object class will declare a `toString()` forwarder, as `Sk2TraitToString` shows for a trait-declared `toString`. `defaultAsString` would then recurse for every object. The fix below is therefore a precondition for adopting that `Object`.
- **A fix, verified as a stand-in (not a proposal of record).** Replace `hasOwnToString`'s body with a walk up the superclass chain from the value's class, stopping at `FValue` or `Object`, that looks for a declared `toString` with no parameters and return type `java.lang.String`. That is five lines, with no new signature, so the native-wrapper constraint (row 359) is not touched (`skeptic/skeptic2-standin-fix.txt:4-16`). With it:
  - the four probes print `Foo`, `Bar`, `Qux`, `W`/`Counter`/`r`/`Rec` (`:18-37`);
  - `DefaultRenderRungS` still passes all 18 assertions, including `RR32` and `StringVector` (`:51-61`);
  - the proposed expected-failure test goes red (`:63-72`: `Did not see expected failure`);
  - after the good class is restored and shown identical by `cmp` (`:76`), the test is back to `Saw expected failure` (`:77-85`).

  Two limits of that capture: the `SkRR32Render` and `SkOldDefault` blocks at `:39-50` read `Could not load` because those probes were not yet compiled into my rebuilt cache (their repaired-tree outputs are at `skeptic/skeptic2-differentials.txt:138-152`); and the stand-in class was not passed through the native-wrapper generator by a library rebuild.
- **Its home: 2.** The three-homes rule requires a home-1 assertion to exist before the second skeptic runs, so this defect cannot be repaired after this judgement. The specification settles legality, so it is home 2. I wrote the pair, which the commit stage copies into the gated corpus (correction 1):
  - `probes/skeptic/proposed/XXXFortToStringRungS.fss` has one comment line and three asserts: `Foo(1).toString()` is `foo`, `Foo(1).asString` is `Foo`, and `Rec("r").asString` is `Rec`. The messages cite ledger row 321 and `objects.tex`.
  - `XXXFortToStringRungS.test` is `run` plus `run_out_contains=REACHED`, in the row-76 shape.
  - `FortToStringRungSLink.test` is `link`.

  Today the link is `OK` and the run is `Saw expected failure` (`skeptic/skeptic2-proposed-xxx-today.txt:3`, `:13`). Walk runs the file to `PASS`. On the stand-in fix it goes red, as shown above.

## 0. The provenance block (five lines)

I opened every cited line with `sed -n`.

- **problem:** these all match:
  - `DefaultRenderRungS.fss:18` is `println(Box(1))`.
  - `explorations/fortress-gap-ledger.md:332` is row 321.
  - `probes/test-preedit.txt:13` is the `StackOverflowError` line.
  - `probes/test-prerepair.txt:11` is `FAIL:  RR32 =/= 1.5; …`.
- **spec:** these all match:
  - `objects.tex:117-122` is the `toString` contract, and `:19-22` is the every-object clause.
  - `FortressBuiltin.fss:51` is `getter toString(): String = self.asString`.
  - The grep `asString\|asDebugString\|ilkName` over `Specification/basic` and `Specification/basic-lib` prints nothing (rc=1).
  - No `Specification/library/apis/` path is cited.
  - The trailing `— none` on that line is stray and harmless.
- **precedent:** these all match:
  - `FortressBuiltin.fss:40-41`
  - `ObjectPrims.java:31-35`
  - `FObject.java:33-39`
  - `FTraitOrObject.java:184-191`
  - `FTypeTuple.java:61-63`
  - `FTypeArrow.java:107-109`
  - `InstantiatingClassloader.java:246-269`
  - `stringOps.java:43-46` (the old `a.toString()` body)
  - `stringOps.java:53` (the private `fortressTypeName(String)`)
- **deviation:** now one line, as the first judgement asked. Its citations match:
  - `RenderArgs-compiled-preedit.txt:10` (`…runtimeValues|FZZ32`)
  - `stringOps.java:54,61-70` and `:75-86`
  - `FortressMethodAdapter.java:257` (the `throw new Error("No Fortress type (yet) …")`)
  - `judgement-probes-both-paths.txt:16`
  - `Fortress.Core.fsi:14`
- **historical:** `stringOps.java:14-18,47-86` and `CompilerBuiltin.fss:282-283,351`. `git diff --name-status d610695c0...HEAD` confirms these are the only files of the 2012 tree the rung modifies; everything else is added.

## 1. The recorded failure

It exists, and it was taken test first.

- **Commit order.** Milestone `75741de9a` commits only the six added lines of `DefaultRenderRungS.fss` and `probes/test-prerepair.txt`. At that commit `CompilerBuiltin.fss:283`/`:351` still bind `jTypeName`, and `stringOps.java` has no `defaultAsString` (`git show 75741de9a:…`). The capture's header is at `rev=509d3bc61` with only the test file modified.
- **The failure line.** `probes/test-prerepair.txt:11` has the failing assertion, and `:37` has `Tests run: 2, Failures: 1`.
- **The first round's failure.** It stands at `probes/test-preedit.txt:13`, as verified in the first judgement.

## 2. The diff

`git diff d610695c0...HEAD` over the source changes:

- **`stringOps.java`.**
  - The `FValue` import (`:16`).
  - `typeName` and `fortressTypeName` (`:48-72`), unchanged since the first round.
  - `defaultAsString` (`:75-77`).
  - `hasOwnToString` (`:79-86`).
- **`CompilerBuiltin.fss`.**
  - `:283` imports `stringOps.defaultAsString => jDefaultAsString`.
  - `:351` is `getter asString(): String = jDefaultAsString(self)`.

No declaration is added to the prelude (`CLIMB-BATCH-3.md:164`). The edit is the judge's shape, with one deviation forced by the native-wrapper generator: `hasOwnToString` takes the value, not a `Class<?>`. It is as small as that shape allows. The one defect in it is the one above.

## 3. The precedent search

- **The reverse count the refusal asked for is present and right.** Of the 17 value classes, 2 have no `asString` at either level: `FRR32` and `FStringVector`. I re-tabulated the Java side of all 17 (`grep -c 'asString()'` and `public String toString` per file). Every one declares its own `toString`, and the seven with a Java `asString` are the seven the report names.
- **The private-helper convention.** It is right, and it is supported by the capture `probes/judge-shape-wrapper-error.txt:6-8`.
- **The miss.** The check "codegen emits no `toString`" was answered by grepping for the literal string. It should have been answered by compiling a program that declares one and running `javap` on the result. That is what I did (`skeptic/skeptic2-overflow-cycle.txt:3-14`).

## 4. The test

- **It passes on my own cache.** I wiped `default_repository/caches/*` and rebuilt the five components in order (`skeptic/skeptic2-cache-rebuild.txt`: all rc=0, 29 s, 126 s, 34 s, 2 s, 2 s). On that cache, `DefaultRenderRungS.test` gives link `OK`, run `Box`, `Cell[\ZZ32\]`, `Pt`, `PASS`, `OK (2 tests)` (`skeptic/skeptic2-gated-tests.txt:2-10`).
- **It covers the two restored renderings.** The two new assertions (`DefaultRenderRungS.fss:37`, `:41`) are exactly the ones the refusal asked for.
- **It has 18 assertions,** and each of the eight new test files carries exactly one comment line (`grep -c '(\*'`).
- **What it cannot cover.** The residual case above. That is correction 1, which puts it in a separate expected-failure file, not in this test.

## 5. The competing-declaration grep

I searched for these names across `ProjectFortress/tests`, every `ProjectFortress/*_tests`, `LibraryBuiltin`, `Library` and the whole of `ProjectFortress/src/com/sun/fortress/`, `.java`, `.scala` and `.test` included:

- the native names: `defaultAsString`, `jDefaultAsString`, `hasOwnToString`, `typeName`, `jTypeName`, `fortressTypeName`;
- every new test name: `XXXUnionReturnRungS`, `UnionReturnRungSLink`, `XXXOprParamRungS`, `OprParamRungSLink`, `XXXNatArgRungS`, `NatArgRungSLink`, `XXXUnionMethodRungS`, `XXXInferredStaticArgRungS`;
- my proposed name, `FortToStringRungS`.

Each occurs only at its new sites. The `typeName` locals the report lists are the only other hits, and `FortToStringRungS` occurs nowhere yet.

## 6. record.md

- **True and checkable as written:**
  - the row-76, row-307, 354, 355, 356, 357, 358 and 359 texts: I checked every `Specification/` line against `:±10`;
  - `Common.scala:106-108`, `NamingCzar.java:1398-1401` and `CodeGen.java:5784-5785`;
  - the `FileTests.java` lines: `:534-537`, `:583-585`, `:346-360`, `:605`, `:711`, and `:853` for the author's warning;
  - the `FValue.toString` clause.

  No row is renumbered, and the provisional numbers follow row 354.
- **Not true as written:**
  - The FACTS headline, "A compiled object with no `asString` of its own prints its bare Fortress type name".
  - The row-321 note's "Repaired", with "every entry this row names is repaired".
  - The handover line's "ledger row 321 repaired".

  All three are false for an object with a Fortress member named `toString`, and correction 2 says what they must say instead. The gate expectation changes with correction 1.

## 7. The three homes

| defect | home | what I checked |
|---|---|---|
| row 321, the rendering cycle | 1 | the 18 assertions pass (`skeptic/skeptic2-gated-tests.txt:2-10`) |
| void, tuple and arrow spellings | 1 | the same assertions; `SkArgsRender` compiled on the repaired tree is byte-identical to walk's 16 lines from the first round (`skeptic/skeptic2-differentials.txt:156-171` against `skeptic/differentials.txt:4-19`, `diff` empty) |
| `RR32` and `StringVector` as type names (my refusal) | 1 | `DefaultRenderRungS.fss:37,41` pass; `SkRR32Render` gives `1.5`, `[1.5]`, `2.5`, and `SkOldDefault` gives new equal to old (`skeptic/skeptic2-differentials.txt:141-151`) |
| `asDebugString`, `asExprString` | 3, row 354 | the silence grep re-run (rc=1); the captures are tracked |
| row 76 | 2 | link `OK`, run `Saw expected failure` (`skeptic/skeptic2-gated-tests.txt:11-21`) |
| inferred static argument (row 355) | 2, in `tests/` | through `SystemJUTest` over a directory holding a byte-identical copy: `OK Saw expected exception` (`:78-90`) |
| union-return `VerifyError` (row 356) | 2 | link `OK`, run `Saw expected failure`; the `VerifyError` goes to stderr before `REACHED` (`:22-46`) |
| `opr` parameter (row 357) | 2 | link `OK`, run `REACHED` then `NoSuchMethodError`, `Saw expected failure` (`:47-57`) |
| `nat` argument (row 307) | 2 | link `OK`, run `REACHED` then `NoClassDefFoundError: 3$RTTIc` (`:58-72`) |
| union-receiver checker NYI (row 358) | 2 | `compile_exception_contains` met, `OK Saw expected exception` (`:73-77`) |
| native-wrapper refusal of `Class` (row 359) | 3 | the prose is silent (`grep -rln 'import java\|foreign'` prints nothing); `probes/judge-shape-wrapper-error.txt` is tracked |
| **this round: an object with a Fortress member named `toString` still overflows** | **2, owed** | `probes/skeptic/proposed/` pair: expected failure today, red on a stand-in fix; correction 1 lands it |

All `.test` files were run one by one. Neither suite was run.

## Differentials (this round, my own programs)

These run on my rebuilt cache at `FORTRESS_THREADS=1`, with the first round's runner `skeptic/run-differentials.sh`. The capture is `skeptic/skeptic2-differentials.txt`.

| probe | walk | compiled (repaired) | verdict |
|---|---|---|---|
| `Sk2FortToString`: method `toString` | `foo`, `asString: Foo`, `Foo` | `foo`, then `StackOverflowError` | the finding; spec settles legality (`objects.tex:19-22,117-122`); home 2 |
| `Sk2FortToStringGetter`: getter `toString` | `bar`, `Bar`, `Bar` | `bar`, then overflow | the same |
| `Sk2TraitToString`: `toString` inherited from a trait | `named`, `Qux`, `Qux` | `named`, then overflow | the same; the switch-over case |
| `Sk2FieldToString`: `toString(x)` with a parameter, a `var` field, a field named `toString` | `W`, `Counter`, `r`, `Rec` | `W`, `Counter`, `r`, then overflow | a parameter or a `var` field is fine; a field named `toString` is the finding |
| `Sk2TraitAsString`: a trait's `asString` inherited, an object's own, a plain trait | `shape`, `circ 2`, `Tri`, `Tri` | the same | agree |
| `Sk2Generic`: `Holder[\T extends Object\]` rendering its argument's `asString`; `Just(Inner)` | 5 lines | the same 5 | agree |
| `Sk2Exc`: `Boom`, `Bang[\ZZ32\]`, an exception with its own `asString`, printed | `Boom`, `Bang[\ZZ32\]`, `pow!` | the same | agree; the catch-binding line then fails with `NoClassDefFoundError: Sk2Exc$e`, which is row 351 (`XXXClauseBindingRungB`), not this rung's |
| `Sk2Reach`: `().asString`, a tuple's `asString`, a function's `asString` | run-time "Non-object receiver" | statically rejected ("has no getter called asString") | the default is reachable only from an `Object`, so the native never sees a void, tuple or arrow value |
| `Sk2Tuple`: `println((1, "a"))`, `println((Box(1), 2))` | `(1,a)`, `(Box,2)` | `( 1 ,  a )`, `( Box ,  2 )` | both differ from `objects.tex:161-188` (`(1, a)`); the compiled half is row 76 (`CompilerBuiltin.fss:467`, juxtaposition), and walk's `,` has no row; recommended row below; not this rung's (the default is not involved) |
| `SkRR32Render`, `SkOldDefault`, `SkArgsRender` (first round) on the repaired tree | — | `1.5`, `[1.5]`, `2.5`; new = old for `RR32` and `StringVector`; the 16 lines byte-identical to walk | agree |
| `Sk2NewOne`: the native imported into a user component and applied to an `RR32`, a `Box`, a `ZZ32` | — | `1.5`, `Box`, `7` (`skeptic/skeptic2-native-import.txt:2-8`) | the rule works as stated |
| `Sk2OldNew`: both natives imported, applied to fifteen values including `()`, a tuple and a function | — | compile fails: ASM `Error trying to close method scope` (`skeptic/skeptic2-native-import.txt:12`, rc=1) | not narrowed and no row recommended: user code that imports the prelude's helpers, passing non-`Object` values to an `Any` parameter; nothing in the rung is involved |

**Threads.** The diff writes no mutable state, field, transaction or library state. The native reads `getClass()` and reflects on it, and nothing else. One thread is enough. The `Counter` object's `var` field in `Sk2FieldToString` is in my probe, not in the rung.

## The failure-mode question

- **The rung as a whole.** It turned the `StackOverflowError` of an object with no `asString` into its bare type name, which is Pavol's decision and matches walk on every written-out case. `asDebugString` and `asExprString` became quiet values that diverge from walk; row 354 records them and the specification is silent.
- **The repair round.** It changed no other loud failure into a quiet value. It restored two values that the first round had made quietly wrong (`RR32`, `StringVector`) to their base renderings.
- **The residual case.** An object with a Fortress member named `toString` stays loud: the same `StackOverflowError` as on the base tree. That keeps the failure diagnosable until correction 1's test is closed.

## Required corrections (the commit stage closes both)

1. **Land the home-2 test for the residual case.** Copy these three files byte-identical into `ProjectFortress/compiler_tests/`:
   - `explorations/compile-ladder/rung-default-rendering/probes/skeptic/proposed/XXXFortToStringRungS.fss`
   - `explorations/compile-ladder/rung-default-rendering/probes/skeptic/proposed/XXXFortToStringRungS.test`
   - `explorations/compile-ladder/rung-default-rendering/probes/skeptic/proposed/FortToStringRungSLink.test`

   Then run both `.test` files from `ProjectFortress/` and see link `OK` and run `Saw expected failure`. They were verified from the proposed directory (`skeptic/skeptic2-proposed-xxx-today.txt:3,13`), and red on a stand-in fix was shown (`skeptic/skeptic2-standin-fix.txt:63-72`). The gate expectation in `REPORT.md` ("What the gate should expect") and in `record.md` ("Gate expectations") becomes: `testFast` +13 junit tests from 12 `.test` files. `testSystem` is unchanged at +1.
2. **Make the record say that row 321 has one open case.**
   - **`record.md`'s FACTS bullet.** It must qualify its headline with this exception: an object that declares or inherits a zero-argument Fortress member named `toString` (a method, a getter or a field) still overflows. Codegen emits that member as a Java `toString()` returning `fortress.CompilerBuiltin$String`, `Class.getMethod("toString")` answers it, and `hasOwnToString` (`stringOps.java:79-86`) answers true, so `a.toString()` re-enters the default through `FValue.toString`. Cite `explorations/compile-ladder/rung-default-rendering/probes/skeptic/skeptic2-differentials.txt:2-52` and `explorations/compile-ladder/rung-default-rendering/probes/skeptic/skeptic2-overflow-cycle.txt`, and say it is gated as an expected failure by `compiler_tests/XXXFortToStringRungS`.
   - **The row-321 note.** It must say the same, replacing "Repaired" with "Repaired except for …" and dropping "every entry this row names is repaired" or qualifying it.
   - **The handover line.** "ledger row 321 repaired" must carry the same exception.
   - **`REPORT.md:17`.** The sentence that grounds the detection ("for every generated class `toString` resolves to `FValue`'s (codegen defines none …)") must say that this holds for the Java descriptor `()Ljava/lang/String;` only. A Fortress member named `toString` is emitted under that name, and `getMethod` returns a declared method before an inherited one. `REPORT.md`'s "Defects and their homes" gains this defect as home 2, and "What is not done" gains its repair.

## Recommended rows (not required corrections; the gather opens or refuses each)

- **Provisional row 360 (or an addition to row 321, at the gather's choice).** Proposed text: "**The compiled default `asString` still overflows the stack for an object that declares or inherits a zero-argument Fortress member named `toString`** (a method, a getter, or a field; a trait's included). Codegen emits the member as `toString()Lfortress/CompilerBuiltin$String;`. `Class.getMethod("toString")` returns a declared method before any inherited one, so `stringOps.hasOwnToString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:79-86`) answers true, and `a.toString()` (`:76`) resolves to `FValue.toString`, which re-enters `CompilerBuiltin.fss:351`. Walk prints the type name (`Foo`). | NEGATIVE-VERIFIED | implementation gap | `Specification/basic-lib/objects.tex:19-22`, `:117-122`: every object implements `toString`, whose contract is a textual representation; the program is legal | `explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2FortToString.fss`, `Sk2FortToStringGetter.fss`, `Sk2TraitToString.fss`, `Sk2FieldToString.fss`; captures `probes/skeptic/skeptic2-differentials.txt:2-52`, `probes/skeptic/skeptic2-overflow-cycle.txt` | ours (rung S's second skeptic, climb batch 3, 2026-09-22) | Introduced by rung S's repair round, whose declaring-class test replaced the first round's unconditional type name; on the base tree the same programs overflowed through `jAsString`. Gated as an expected failure by `compiler_tests/XXXFortToStringRungS` (run) and `FortToStringRungSLink` (link). Fix, verified as a stand-in (`probes/skeptic/skeptic2-standin-fix.txt`): `hasOwnToString` walks the superclass chain below `FValue` and counts only a declared `toString` with no parameters returning `java.lang.String`; `DefaultRenderRungS` still passes with it. This is a precondition of the switch-over: the interpreter's `trait Object` declares `getter toString(): String = self.asString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:51`), which would give every generated object class a declared `toString()`." Probe: `Sk2FortToString.fss` (compiled run rc=1, `StackOverflowError`).
- **A new row against walk's tuple rendering.** Proposed text: "**walk renders a tuple value with `,` between its elements where the specification requires `", "`**: `println((1, "a"))` prints `(1,a)` and `println((Box(1), 2))` prints `(Box,2)`. `Specification/basic-lib/objects.tex:161-188` (the `Tuple` trait's `toString`: `(`, each element's `toString`, `", "` between elements, `)`) gives `(1, a)`. The compiled path prints `( 1 ,  a )`, because `CompilerBuiltin.fss:467` builds the text by juxtaposition, which is row 76; with row 76 repaired it gives the specified form. | NEGATIVE-VERIFIED | implementation gap (interpreter) | `objects.tex:161-188` | `explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2Tuple.fss`, capture `probes/skeptic/skeptic2-differentials.txt:53-62` | ours (rung S's second skeptic, 2026-09-22) | Walk's `println(a:Any)` is `println("" a)` (`Library/FortressLibrary.fss:4138`, whose comment says the concatenation form "also works for tuples"); the separator is presumably `FTupleLike.getString` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FTupleLike.java:52-64`, `','` at `:60`), but the route from the concatenation to it was not traced. The one-element `"tuple"` prefix of `:166-167` was not measured." Probe: `Sk2Tuple.fss` (walk `(1,a)`).

## Inherited, re-verified

- **What I inherited.** The branch at `1f4d805fb` and a clean worktree.
- **The build.** I did not run `ant compileAll`. `ProjectFortress/build`'s `stringOps.class` (22:41) is newer than its source (22:36), and `javap -p` lists `defaultAsString(fortress.AnyType$Any)` and `private hasOwnToString(fortress.AnyType$Any)`.
- **The cache.** I wiped it and rebuilt the library myself.
- **What I re-ran.** The gated test, all ten `.test` files and the interpreter expected failure one by one, the first round's three rendering probes, and the `pre/` and `post/` ladder subsets (exit-code columns identical, all ten `.run` byte-identical by `cmp`).
- **What I did not run.** `testFast` and `testSystem`.
- **The one temporary edit.** The only change I made to the tree outside my own files was the stand-in class copied over `ProjectFortress/build/…/stringOps.class`, restored and shown identical by `cmp` (`skeptic/skeptic2-standin-fix.txt:76`).
