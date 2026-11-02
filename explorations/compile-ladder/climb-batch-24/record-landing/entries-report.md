<!-- The entries writer's report on climb batch 24's landing: for each change of owed.md whose writer is entries, what changed in its entry, whether its meaning changed, and the questions for the curator. -->

# The entries writer's report, climb batch 24's landing

## Where the lines are

- The old line of each entry is its line at `43cd61b62`: `entries.md`, under the entry's heading, "Now:" (for F-220, P-73, P-151 and P-156: `facts-extract.sh 'F-220'` and so on).
- The new line of each entry is in `record.apply` and, alone, in `clean.txt`.
- Below, each change quotes the sentences that it changes, old and new, word for word. Every other sentence of the entry stands as it was, except for the cuts that the change lists.
- The sizes in the sections by change are round-1 estimates; `mech-1.md`'s `lengths.py` gives round 1's measured sizes. The fix round adds about 250 characters to F-298, and a few words to F-34, F-181, F-304 and F-308.

## FACTS: the pass (C1 to C17)

### C1, F-24: reword

- Old: "so a division by zero elsewhere ends the run (rows 336, 848)."
- New: "so `REM` and `MOD` by zero on these five types end the run (rows 336, 848)."
- Old: "and for a helper by `tests/NativeHelperRaiseWalk.fss`, `tests/ZZ32DivisionByZeroWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `tests/NN32DivisionByZeroWalk.fss` and `tests/NN64DivisionByZeroWalk.fss`."
- New: "and for a helper by `tests/NativeHelperRaiseWalk.fss` and by `tests/<T>DivisionByZeroWalk.fss` for each of the five types."
- Meaning: unchanged. "Elsewhere" now names what rows 336 and 848 hold: `REM` and `MOD` by zero on `ZZ32` and `ZZ64` (row 336), and on `NN32`, `NN64` and `ZZ` (row 848).
- Over 600 (about 900 characters): each sentence answers question 1 (the raise, the `ProgramError` that no `catch` takes, the tests that gate it).

### C2, F-32: reorganize

- Old title end: "the Java classes that most of the one library's native bindings name: of its 449 live bindings, 276 name one." New: "the Java classes that native bindings of the one library name; of the library's 449 live bindings, 276 still name one and 173 name a static helper."
- Old: "(F-298; F-299 holds the 173 that name one)". New: "(F-298, F-299)", and a new sentence: "The 173 by declaring type: trait `ZZ32` 20, trait `ZZ64` 21, trait `ZZ` 16, trait `NN64` 18, value object `NN32` 21, `Char` 40, `Float` 30, `Int`, `Long` and `BigNum` 2 each, and the function `char` 1."
- New: "The 276 are the 158, the 78, and 40 of the first two kinds."
- Old: "Of the 449, 24 are `IntLiteral`'s five conversions `asZZ32` to `asZZ` and 19 of its operators (`FortressBuiltin.fss:489-554`), 4 among the 154 and 20 among the 158; none of them can move yet, since". New: "24 bindings of `IntLiteral`, its five conversions and 19 operators, 4 among the 154 and 20 among the 158, cannot move yet:".
- Cut: "at `a1f8c4b8b`"; the line numbers; the pointer to `coordinator/CLIMB-BATCH-23.md`, section 4, replaced by `reviews/batch-24-review.md`, "6. The natives after phase 4's second batch", which holds the present count.
- Meaning: unchanged. F-32 now owns the count of the bindings, both the 276 and the 173, with the kinds that hold them, as "What an entry is" asks of a count that each landing changes. F-299 gives F-32's number. The 173 by type and the 40 are the review's (section 6).
- Over 600 (about 2,150 characters, from 2,069): the count's kinds answer the count rule; the `IntLiteral`, `Writer`, `nanoTime`, `getProgramArgsPrim` and `NativeArray` sentences answer question 1, since a planner of the natives acts on each. The entry grew by about 80 characters because it took the list of the 173 from F-299, which shrank by about 700.

### C3, F-34: with C18 below.

### C4, F-53: keep

The commit stage wrote its title and its two totals, and the review read it against the tree. No other sentence changed. No line.

### C5, F-132: reword

- Old: "Its known gaps: the compiler prelude's ranges raise `IntegerOverflow` where their bounds sum beyond `ZZ32` (row 453); and `^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525). Its `CHOOSE` raises `IntegerOverflow` as walk's does (F-305)."
- New: "Its `CHOOSE` raises `IntegerOverflow` as walk's does (F-305). Its known gaps: the compiler prelude's ranges raise `IntegerOverflow` where their bounds sum beyond `ZZ32` (row 453), and `^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525)."
- Meaning: unchanged. The `CHOOSE` sentence came after the gaps, as if it were one; it now comes first.
- Over 600 (about 1,180 characters): the tests and the compiled path's gaps answer question 1 and question 2 (a reader would take walk's rule for the compiled path's).

### C6, F-181: reorganize

- Old title: "The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause, and refuses every function or method with a contract (row 701)."
- New title: "The code generator compiles a function, method, object or trait declaration whose own header carries a `where` clause, and emits nothing for the clause."
- New: "Three forms still fail: [row 307's call; row 812's crash; row 867's call]". The three sentences of the old line are gathered in one.
- New: "It still refuses a function or method with a contract (row 701), which walk checks, raising `CallerViolation`; the disambiguator drops a trait's or object's contract (row 781)."
- Meaning: unchanged. The title held two claims; it now holds the `where` claim, and the contract refusal is a sentence of the body.
- Over 600 (about 1,500 characters): the three forms that still fail and the contract refusal answer question 1 (a worker would compile one of them); the tests name the gate.

### C7, F-240: with C20 below.

### C8, F-270: keep

Each sentence answers question 1 or 2. "Way 4a of fork 3" names the array design's way, which P-85 holds. The gather's sentence on the code generator is right. No line.

### C9, F-281: reword

- Old: "read `isCheckedName`, which admits every operator (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:766-773`);"
- New: "read `isCheckedName` in `OverloadingChecker.scala`, which admits every operator;"
- Meaning: unchanged. The line numbers go to the report (question 4).
- Over 600 (about 1,420 characters): each import rule and row answers question 1 for a worker who edits imports or operators.

### C10, F-298: with C23 and C24 below.

### C11, F-299: with C21 below.

### C12, F-303: reorganize

- Cut: the list of the 30 bindings that moved, with its line numbers; "without it walk refused such a binding at load, 'no Java type carries the declared type of parameter a.'" (history, question 3); the line number of `javaFor`.
- Old: "its other 32 have no fitting helper". New: "`Float`'s other 32 bindings have no fitting helper".
- Old: "F-299 counts the bindings that name a helper." New: "F-32 counts the bindings that name a helper."
- Meaning: unchanged. The 32 left on glue classes stay listed, since a planner of `Float`'s rest acts on them.
- Over 600 (about 1,000 characters): the list of the 32 answers question 1.

### C13, F-304: reword

- Old title end: "walk rounds once." New: "walk rounds once (row 862)."
- Old: "`CodeGen.forFloatLiteralExpr` emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` (`compiler/codegen/CodeGen.java:1994-2004`)". New: "`CodeGen.forFloatLiteralExpr` adds the integer part's double to the numerator's double divided by a power of the base".
- Cut: the line numbers of the specification; "(row 862)" after the test, now in the title.
- Meaning: unchanged.
- Over 600 (about 780 characters): the advice to a compiled test's writer answers question 1.

### C14, F-305: reword

- Cut: the line numbers of `FortressLibrary.fss`, `simpleIntArith.java` and `simpleLongArith.java`.
- Old: "so calls in parallel no longer corrupt each other." New: "so calls in parallel do not corrupt each other."
- Old: "Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic." New: "On 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs swept, the helpers agree with the exact value and with walk's glue classes." The new wording is the CHOOSE probe's (`choose.md`, "agrees with the exact value and with walk's glue").
- Old: "`NN32`'s compiled `CHOOSE` through the `ZZ64` helper;". New: "the prelude's `NN32` `CHOOSE` goes through the `ZZ64` helper, and".
- Meaning: unchanged.
- Over 600 (about 1,250 characters): the tables' bounds, the scratch array and the sweep are the evidence (questions 1 and 2); the tests gate it.

### C15, F-306: with C19 below.

### C16, F-307: reword

- Cut: "They are at `LibraryBuiltin/FortressBuiltin.fss:380`, `:382`, `:470`, `:567`, `:569`, `:617` and `Library/FortressLibrary.fss:986`, `:4540`;" and the line numbers of `NamingCzar.java` (question 4).
- Old: "the four over `NN32`, `NN64` and `Char` name the special names". New: "The four over `NN32`, `NN64` and `Char` name the special names".
- Meaning: unchanged.
- Over 600 (about 780 characters): rows 856, 857 and 846 answer question 1.

### C17, F-308: with C22 below.

## FACTS: sentences made false or stale, sizes, and facts owed (C18 to C26)

### C18 and C3, F-34: reword

- Old title: "Under the switch-over's setting the code generator refuses 52 declarations of the library's twelve components, all of them declarations that the checker passes."
- New title: "On climb batch 22's code, under the switch-over's setting, the code generator refused 52 declarations of the library's twelve components, all of them declarations that the checker passes."
- Old: "A declaration counts at its first wall, and no emitted class was run, so after the switch-over the code generator stands between the library and bytecode at 52 declarations at least."
- New: "A declaration counts at its first wall, and no emitted class was run. Four of the 52 met a `where` clause in their own header as their first wall. The code generator now compiles such a clause (F-181), so the present count is not measured."
- Old: "and a header `where` clause, which the code generator now compiles (F-181)." New: the kinds end at "\"Not in the trait table\" (row 733)."
- Cut: the commits `2bff2fe23` and `aa5c67d48` (question 3; the history holds them).
- Meaning: changed, on the review's finding 6. Before: the code generator refuses 52 now, and at least 52 after the switch-over. After: it refused 52 on climb batch 22's code; four of them met a header `where` clause first, which rung G made compile; the present count is not measured.
- Over 600 (about 1,150 characters): the components' counts and the kinds answer question 1 (a planner sizes the code generator's rungs from them); "not measured" answers question 2.

### C19 and C15, F-306: reword

- Old: "`REM` and `MOD` still name glue classes and end the run at a zero divisor (row 336)."
- New: "`REM` and `MOD` still name glue classes and end the run at a zero divisor: on `ZZ64` row 336, on `ZZ` row 848."
- Cut: the line numbers of `FortressLibrary.fss`.
- Meaning: changed, a pointer only: for `ZZ` the row is 848 (rows.md).
- Over 600 (about 1,050 characters): the helpers, the `BigNum` limit and the tests answer question 1.

### C20 and C7, F-240: reword

- Old: "From climb batch 22's gate to climb batch 23's it stayed between about 150 s and 170 s, which no batch moved beyond noise:"
- New: "From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise:"
- Meaning: changed in its reach only: climb batch 24's gate gave about 150 s, no move beyond noise by the review (section 2). The gate's figures stay as the commit stage wrote them.
- Over 600 (1,833 characters, unchanged): the brief keeps the commit stage's figures; no other sentence changes.

### C21 and C11, F-299: reorganize

- Old title: "Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 173 of the one library's 449 live bindings name one."
- New title: "Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes."
- Cut: "The 173: [the list by family] ...; the other 276 still name glue classes." (F-32 holds the count now); the line numbers of `NativeApp.java`, `StaticNativeApp.java`, `FortressLibrary.fss` and `FortressBuiltin.fss`; "`MethodClosure`'s definer or `FunctionalMethod`'s self type" (question 4); the `DivisionByZero` tests, which F-24 and F-306 hold.
- Old: "For a method it is told the declaring type, ...: it refuses at load a type that no Java type carries". New: "For a method, walk tells the loader which type declares it. The loader refuses at load a declaring type that no Java type carries".
- Old: "It raises a helper's ... as the library's `<Name>`." New: "Walk raises a helper's ... as the library's `<Name>` (F-24)."
- Old: "With F-298 the compiled checker reads the 173 against their helpers' Java signatures from this step on (P-58)." New: "With F-298 the compiled checker reads each binding that names a helper against the helper's Java signature (P-58); F-32 counts these bindings."
- Meaning: unchanged. The count moved to F-32.
- Over 600 (about 2,100 characters, from 2,789): the loader's refusals, the reading of `self` by name, rows 864, 551 and 846 each answer question 1 for a worker who moves a binding; the tests gate it.

### C22 and C17, F-308: reword

- Cut: the line numbers of `BuiltinPrimitiveRewriter.java`, `CompilerBuiltin.fss`, `FortressBuiltin.fss` and `FortressLibrary.fss`; "where the checker refused it before" (question 3); "the count and the distance stay 0 and 0" (F-53 holds it, question 5); "(`compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode")" moved to the Detail.
- Old: "The transfers are identities, so the composition checks whatever the helper computes:". New: "The transfers are identities, so the checker accepts the composition whatever the helper computes:".
- Old: "six of the 82 over these types stay on glue classes (rows 326, 860, 861; `NN32`'s `asFloat` and `CHOOSE`)." New: "Six of the 82 bindings over these types stay on glue classes: `NN32`'s `asFloat` and `CHOOSE`, and four behind rows 326, 860 and 861."
- Meaning: unchanged. "the composition checks" read two ways (who checks); the new words name the checker.
- Over 600 (about 2,100 characters, from 2,330): the transfers, their two limits, the identity cost and the six left answer question 1; the identity cost answers question 2 for every later binding over these types.

### C23, C24 and C10, F-298: reword

- New sentence: "The rewrite reaches only a component's top-level declarations and its traits' and objects' members: such a body in a local function or in an object expression's method stays a call of `builtinPrimitive`, and its compile stops 'Variable builtinPrimitive is not defined.', where walk runs it (row 865)."
- Old: "and so does walk's own reading of a written `import java` (F-180; row 845); where the declaration gives `NN32`, `NN64` or `Char` to a position whose Java `int` or `long` the checker reads as `ZZ32` or `ZZ64`, the rewrite puts the matching transfer helper around that argument or the call, so the checker reads the composition (F-308)."
- New: "as walk reads a written `import java` (F-180; row 845). Where the declaration gives `NN32`, `NN64` or `Char` to a position that the checker reads as `ZZ32` or `ZZ64`, the rewrite puts a transfer helper around that argument or around the call (F-308)."
- Cut: the line numbers of `Shell.java`, `BuiltinPrimitiveRewriter.java`, `Parser.java`, `FortressBuiltin.fsi`, `Decls.scala` and `NamingCzar.java`, and "the body's expected type".
- Meaning: changed, on row 865: the rewrite's reach is now stated. Before, "a body that is exactly `builtinPrimitive(...)`" had no limit of place.
- Over 600 (about 2,050 characters, from 2,156): the reach (row 865), the static error, the untyped glue strings, the reading in walk's world and the transfers answer question 1 for a worker who binds a helper.

### C25, F-220: reword

- Old: "The distance stage finds no error at the line, and the checker count's three errors (F-53) do not include it."
- New: "The distance stage and the checker count find no error at the line (F-53)."
- Meaning: unchanged in what the entry claims of the line; the stale count of three goes. F-53 gives the count 0, at the base too.
- Under 600.

### C26, a new entry in "The checker and the one library" (F-?1)

- New: "`ForeignJava` reads every public method of a helper class once per JVM, at the first import of any of them, and keeps that reading; each compile that builds the foreign api writes the class's wrapper in `nativewrapper_cache/` anew from that compile's reading." With: what `ForeignJava` is; what it means (a helper's type must not depend on the binding that names it); that the probe found no defect in the tree; how it was observed; no test.
- Meaning: new, from the hard-set probe's section 9, "For FACTS", (a), with its detail in section 4.2. Its (b) and (c) are held by F-308.
- Over 600 (about 820 characters): the sentence on what `ForeignJava` is answers question 6; the evidence sentence states how the fact was observed.

### C27, F-305: no change; writer none in `owed.md`.

## POSITIONS: sentences the tree made false (C28 to C31)

All four are cut only (`cut-only.txt`), under the curator's rule of 2026-10-31.

### C28, P-73: cut only

- Old: "On the compiled path the rule holds as the specification's (P-25, the standard), and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)."
- New: "On the compiled path the rule holds as the specification's (P-25, the standard), and the compiled path departs from it at `^` (rows 523 to 525)."
- The decision, before and after: under walk, fixed-width integer arithmetic raises `IntegerOverflow` when its result does not fit, on `NN32` and `NN64` too.
- Its reach, before and after: every operation whose result can leave its type, `^`, `CHOOSE` and `LCM` included; the decision is walk's.
- Its requirement, before and after: code that means to wrap uses the wrapping operators, fully parenthesised.
- Meaning: unchanged. The cut clause stated a departure of the compiled path that rung K removed.

### C29, P-151: cut only

- Old: "Row 773: the members scoped to the condition, since a member checked under it stays callable where the condition fails. Row 774: walk's half of conditional extension. Row 701: the code generator's half."
- New: "Row 773: the members scoped to the condition, since a member checked under it stays callable where the condition fails. Row 774: walk's half of conditional extension."
- The decision, before and after: only the `where`-clause forms that the team wrote down are built: conditional extension, a function's or a method's condition, and `AnyList`'s `comprises` clause.
- Its reach, before and after: those three forms, with `AnyList`'s join and `SUM`'s fusion as stated.
- Its requirement, before and after: the three forms are built where the team left design intent or where they are on the critical path.
- Meaning: unchanged. The cut sentence named the code generator's half as a gap; rung G built it.

### C30 and C31, P-156: cut only

- Old (C31, in the Why): "A `where` constraint `I excludes Range[\I\]` was weighed and not taken: the team left such a constraint as an open question, and the code generator refuses a `where` clause in a declaration's header."
- New: "A `where` constraint `I excludes Range[\I\]` was weighed and not taken: the team left such a constraint as an open question."
- Old (C30): "keeps its narrowed `atMost(n: I): FullRange[\I\]` under the method condition `where { I extends Index }`, the library's form for a member that applies at some instances only; after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)."
- New: "keeps its narrowed `atMost(n: I): FullRange[\I\]` under the method condition `where { I extends Index }`, the library's form for a member that applies at some instances only."
- The decision, before and after: a collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`; the constraint `I excludes Range[\I\]` is not taken.
- Its reach, before and after: every index parameter of the library's generic indexed types, both paths and the specification; `BoundedRange` keeps its method condition.
- Its requirement, before and after: the bound `I extends Index` on those parameters.
- Meaning: unchanged in the decision, its reach and its requirement. The Why loses one of its two reasons for not taking the constraint; the reason that stays is the team's open question.

## The fix round

Each failure of `check.md` in my homes, and each passage of `cold-read.md` that I fixed, with its new words. The "Meaning" lines above stay true except where this part says otherwise.

- **C2, F-32 (fidelity, evidence):** the Detail keeps `coordinator/CLIMB-BATCH-23.md`, section 4, "The count", the source of the 449's kinds on the new base, beside the review's section 6. Meaning: unchanged.
- **C6, F-181 (fidelity, broader):** old round-1 words "which walk checks, raising `CallerViolation`"; new "It still refuses a function or method with a contract (row 701); walk runs the contract, and a broken `requires` raises `CallerViolation`." This is row 701's claim. Meaning: unchanged against the line at `43cd61b62`.
- **C10, F-298 (fidelity, less than the old):** new "the rewrite puts the matching transfer helper around that argument or around the call, so the checker reads the composition (F-308)." The old words are back.
- **C13, F-304 (fidelity, evidence):** new "The specification (`basic/expressions/literals.tex`) asks for \"at most one floating-point rounding error\"."
- **C18, F-34 (form, batch in an entry):** new title "Under the switch-over's setting the code generator refused 52 declarations of the library's twelve components, all of them declarations that the checker passes, measured once before it compiled a `where` clause in a declaration's own header." The body opens "Measured with the checker's failures caught per declaration ..."; the dispatch sentence opens "Measured once on an earlier base, the dispatch generator refused none". The batches and commits are in the history. Meaning: as C18 above.
- **Cold read, F-298:** the reader took "on every repository but walk's" and "in walk's world" for undefined terms, and read the glue strings' typed call as true of a compile, against the `fortress-repo` skill's `compiler.md`, "Natives". New: "At the parse, in a compile and in the gate's count and distance stages but not under walk, a body ..."; "In the two stages, which check the one library, every other string ... stays a call of `builtinPrimitive[\T\](javaClass:String):T` ...; so does a declaration with a varargs parameter (row 849). In a compile, both stop 'Variable builtinPrimitive is not defined.' In the stages the checker reads the helper's Java types as the one library's ..."; the test's "the reading in the stages". Meaning: the scope is now stated; the claims are those of the rung's report (`Shell.specificRepository`) and the skill.
- **Cold read, F-306:** the title read as if `ZZ64` had 20 bindings in all. New: "Under walk, 20 of trait `ZZ64`'s native bindings and 16 of trait `ZZ`'s name helpers ...". Meaning: unchanged.
- **Cold read, F-308:** "every other position of such a binding" read two ways. New: "A helper overloaded at its arity gets no transfer at any position. `self` in a generic owner gets none, but the other positions of that binding get theirs." This agrees with `compiler.md`, "Natives". "Six of the 82 bindings over these types" read as 82 or 85 with F-307's three. New: "Of the 82 bindings over these types that cannot name their helper as a bare string, six stay on glue classes". Meaning: unchanged.
- **Cold read, kept with no source to settle it** (see the questions below): F-32's "their helpers take and answer the compiled path's `IntLiteral`"; F-304's "A compiled test compares such a double by its string"; F-309's "once per JVM" against "each compile". The rest of the cold reader's points are on sentences that this run did not change, or on terms that the skill defines elsewhere.

## Decisions not taken

- F-181: split into two entries, one for the `where` clause and one for the contract refusal, since they change apart. Not taken: only F-34 points to F-181, but row 701 and the skill tie the two together, and the retitle answers the two-claims fault. The other way: a new entry for the contract refusal, with F-181 pointing to it.
- F-32 against F-299 as the owner of the count. F-32 taken, since its subject is the bindings and their kinds; F-299's subject is walk's loader. The other way: F-299 owns the count and F-32 gives its number.
- F-299: a sentence that a binding of a `FlatString` method cannot name a helper yet, from the review's split 4. Not added: no change of `owed.md` names it, and the skill writer's C103 carries it.
- F-270: a cut of "way 4a of fork 3". Not taken: P-85 holds the array design's names.

## Questions for the curator

- P-156 (C31): the cut leaves one reason for not taking `I excludes Range[\I\]`, that the team left such a constraint as an open question. The code generator's refusal was the other reason, and it is gone. Does the decision not to take the constraint stand on the one reason? The record keeps the decision as it stands.
- F-32: of `IntLiteral`'s 24 bindings, 20 need a new helper, so "their helpers take and answer the compiled path's `IntLiteral`" reads two ways. No source in hand says what the 20's helpers would take. The wording is kept.
- F-304: "A compiled test compares such a double by its string" does not say how that protects the test. The wording is the rung's, kept.
- F-309 (`ForeignJava`): does "each compile" mean one `fortress compile` run, one JVM, or one component's compile within a JVM? The probe does not say. The wording is kept.
