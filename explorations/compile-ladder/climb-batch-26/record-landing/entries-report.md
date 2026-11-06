<!-- The entries writer's report for climb batch 26's record landing: for each change of owed.md whose writer is entries, the old and new text, its meaning, its length, and the questions for the curator. -->

# The entries writer's report, climb batch 26

Files in this folder: `record.apply` (12 entries changed, 1 new), `rows.rewrite` (row 846), `rows.add` (one new row, see C32), `clean.txt` (the 13 new lines). No `cut-only.txt`: neither POSITIONS change only deletes words.

The whole old line of each entry is in `entries.md` under "Now" (F-257, P-159 and P-160 in `FACTS.md` and `POSITIONS.md` at AT). The whole new line is in `record.apply`. Below, each change gives the sentences that changed, old then new. Sizes are in characters, before and after.

I could not run `checks.sh`, `record.py` or `ledger.py`: in this session every `python3` call needs an approval that a headless session cannot get. So no mechanical check ran on these files. I resolved every `from` heading with `facts-extract.sh 'doc:...'`, and each resolves to one heading. I measured the lengths with `wc -c`.

## FACTS: the pass on each entry that the batch added or changed

### C1, C21. F-318 (2033 to 2010)

- Old: "It builds P-157 and P-152." New: "It builds P-157, on reading `self` so, and P-152, on the exclusion of two generic declarations."
- Old: "walk reads the pair as two own generics (`genericPairValid`), the trait's static parameters standing for the method's own; in `domainsExcludeTogether`'s meet, the self parameter of a trait self-typed directly (its parameter `X` bounded by the trait at `X`, no `comprises` clause or one that lists only `...`) excludes a type where the trait's instance or `X` does (`ProjectFortress/src/.../OverloadedFunction.java`, `validOnDeclaredDomains`, `traitMethodPairValid`, `selfTypeParameter`)." New: "walk reads the pair as two own generics, the trait's static parameters standing for the method's own (F-252). In the exclusion test, the `self` of a trait self-typed directly (its parameter `X` bounded by the trait at `X`, with no `comprises` clause or one that lists only `...`) excludes a type where the trait's instance or `X` does (`interpreter/evaluator/values/OverloadedFunction.java`)."
- Old: "..., and with `Number`'s `comprises` clause removed in a scratch copy walk loads and runs ..." New: a sentence of its own: "With `Number`'s `comprises` clause removed in a scratch copy, measured once at `2fd5d653e`, walk loads and runs ..."
- Old: "an object that extends a self-typed trait at a type it is not a subtype of now loads and runs one of two fitting declarations (row 893)". New: "it loads an object that extends a self-typed trait at a type that it is not a subtype of, and a call that two declarations fit runs one of them (row 893)".
- Meaning: unchanged. The scratch measure gains its commit (`compile-ladder/rung-walk-vector-scalar/REPORT.md`, section 3 gives `2fd5d653e` as the rung's last edit; section 4 the measure).
- Past 600: Q1 keeps the reading, its limit (the two forms not read), the scratch measure (it unblocks P-160's second step) and rows 893 and 894. Q2 keeps the self-typed condition. The tests are its evidence. Moved out first, to the report's section 1 (Q4): the five method names and the long path.

### C2, C24. F-319 (1073 to 1095)

- Old title: "A comparison at a NaN or at 0/0 answers `false`, on the specification's word too." New: "The specification says that `<`, `<=`, `>` and `>=` answer `false` at a NaN and at the rational 0/0."
- Old: "It builds P-159. The overview of operators says that `<`, `<=`, `>` and `>=` return `false` at a floating-point NaN and at the rational 0/0, that `CMP` returns ..." New: "It builds P-159, on NaN comparisons. The overview also says that `CMP` returns ..."
- Old: "...; both paths answer so, and nothing raises `FloatingComparisonError` or `RationalComparisonError`, which stay declared." New: "Walk answers so, and the compiled path at a NaN: its own library has no rational type and no `CMP` on floats. Nothing raises `FloatingComparisonError` or `RationalComparisonError`, which stay declared."
- Meaning: narrowed to its ground. "Both paths answer so" said more than the evidence. The Appendix I entry's effect, in the rung's section 1, says that the compiled path's own library declares no rational type and no `CMP` on floats until the switch-over.
- Past 600: Q1 keeps the specification's text, walk's departure (row 440) and the restart's contrary text. The tests are its evidence. It grew by 22 characters, the correction.

### C3, C22. F-320 (1498 to 1402)

- Old: "Each local function of a `LetFn` is a closure class made as a function expression's (`forFnExpr`), ..." New: "Each local function of a block is a closure class made as a function expression's, ..."
- Old: "(`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `forLetFn`, `localFunctionClosure`, `localFunctionOrNull`)". New: "(`compiler/codegen/CodeGen.java`)".
- Old: "Under the switch-over's setting all nine ..." New: "Under the switch-over's setting, measured once, all nine ..."
- Meaning: unchanged.
- Past 600: Q1 keeps the three refused forms and the varargs one (each a wall a worker meets), and the nine that now emit. The tests are its evidence. The method names went to the report's section 1 (Q4).

### C4, C23. F-321 (1280 to 1209)

- Old title clause: "so the one library cannot bind a helper of `nativeHelpers/systemOps`." New: "so a binding that names a helper of `nativeHelpers/systemOps` stops its component there."
- Old: "So the one library binds only helper classes all of whose methods map to its types;" New: "So a binding can name only a helper class all of whose methods map to the one library's types;"
- Old: "so they will stop wherever the checker reads it." New: "so `System` stops wherever the checker reads it."
- Old: "Shown by the distance stage with `Library/FlatString.fss`'s `natLineSeparator` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.'." New: "Observed once, by the distance stage on `19e9dbda5`, where `Library/FlatString.fss`'s `natLineSeparator` named `systemOps.lineSeparator`: 'File FlatString.fss has 1 error.'."
- The two line numbers of `systemOps.java` and `NamingCzar.java` cut: "(row 895, which gives the code's lines)".
- Meaning: the title is corrected to the body. The old title said that the library "cannot bind" a `systemOps` helper, but `System`'s two bindings do bind one. The body (its `System` sentence) and row 895 are the ground.
- Past 600: Q1 keeps the rule for choosing a helper class and `System`'s two latent stops. Q2 keeps why no test sees it. Moved out first: the line numbers (Q5, row 895).

### C5, C15, C19. F-299 (3263 to 3089)

- C15. Old: "a glue class bound over `String` receives a non-flat string's type name (row 846)." New: "a glue class bound over `String` receives a non-flat string's type name, and so would a helper bound in a method of the trait `String`, as `self`; the library binds no helper there (row 846)." Meaning: the departure now holds the latent `self` half (the review's finding C, split 6). I read it in the code at 61f1c6a93: `javaForSelf("String")` falls to `javaFor("String")`, a Java `String` (`StaticNativeApp.java:103-112`, `:51-62`), and `unbox` takes it by `v.getString()` (`:282`).
- Old: "carries `self` in a Java `String` (`javaForSelf(FType)`, `declaringComponent`);" New: "carries `self` in a Java `String`;".
- Old: "since a Java `String` cannot carry a rope;" New: "since a Java `String` cannot carry a string that is not flat;".
- Old: "(F-306), the five types' `REM` and `MOD` (F-312) and their divisors (F-314) among them, `ZZ32`'s and `ZZ64`'s `CHOOSE` among them (F-305)," New: "(F-306, with F-305, F-312 and F-314),".
- Old: "11 of `FlatString`'s 13 methods, `natLineSeparator`, `match`, and `printThreadInfo`, ... each a native over `FlatString` beside an overload over `String` that flattens in the library's `typecase` (`FlatString`'s `=` and `flatConcat` at a `Char` wait on review-queue item 331);" New: "11 of `FlatString`'s 13 methods, all but `=` and `flatConcat` at a `Char`; `natLineSeparator`; `match`; and `printThreadInfo`, ... each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`;". The old "each" could read as covering all seven. A review-queue item has no place in an entry.
- Tests: `ZZ32RemainderByZeroWalk`, `NativeHelperFamilyFloatBitsWalk`, `NativeHelperFamilyRR32Walk`, `NativeHelperFamilyAsFloatWalk` and `NativeHelperFamilyDivisorsWalk` cut, since F-312, F-303, F-310, F-311 and F-314 name them. "; the entries of the other families name their own tests." added.
- C5, the 306: unchanged; 25+3+26+22+57+1+50+2+8+27+24+3+39+1+18 = 306.
- Past 600: F-299 owns the count of bindings on helpers, so its kinds stay (the record's rule for a count). Q1 keeps the loader's rules and refusals and the departures. The loader-level tests are its evidence. Moved out first: the code names (Q4), the family pointers that the family entries give (Q5), and the families' tests (Q5). It still adds the `self` clause, about 70 characters.
- For the skill writer: the `fortress-repo` skill's `references/interpreter.md`, "Natives", is false at `:95`, `:99`, `:102`, `:107` and `:116` (the review's Part 3, items 3 to 7). F-299 sends the reader there for "the carriers and the messages". So I kept the carriers in F-299 until that part is fixed.

### C6, C20. F-252 (4262 to 4169)

- The gather's widened title and its sentence on F-318: kept.
- Old: "and unifies a symbolic size with a size parameter (`types/SymbolicNat.unifyStaticArg`)." New: "and unifies a symbolic size with a size parameter."
- Old: "It compares a generic dotted method in the same way, except where exactly one of the two declared domains lies inside the other; there it chooses the inner one (F-253)." New: "F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other."
- Meaning: unchanged. F-253 states the inner-domain rule.
- Kept: "At a call, walk compares a functional method of a generic trait or object on the instance that the call makes." F-253 points to F-252 for it.
- Past 600: Q1 and Q2 keep each condition of the reading (the definitions, the withdrawal, the Meet search's limits, the varargs and `where` exceptions). The tests are its evidence. It holds several claims, and could split into the reading at load and the withdrawal; that is a reorganization that no change asks for (below).

### C7. F-277: keep

The gather's sentence "walk loads the vector pairs' shape in a program's own component too, reading `self` so in its exclusion test (F-318)" is right. The checker's acceptance in the sentence before gives "too" its sense. A reword came out longer, so no line.

### C8, C17, C25. F-34 (1702 to 1521)

- Old: "Measured once, on climb batch 26's rung L tree (`dbf4825e0`'s code), by `...codegen.sh` with the tree's 288 helper strings put back on their glue classes: 'refused declarations 38 | emitted (OK lines) 703 | component failures 0', 'kinds 10'; the batch's base gave 47 in 11 kinds." New: "Measured once, on `dbf4825e0`'s code, by `...codegen.sh` with its 288 helper strings put back on their glue classes; before local functions compiled, the same probe gave 47 in 11 kinds."
- Old: "The three kinds that F-315 removes, `Any` in an `extends` clause, `forbid` and the `test` modifier, and the local function, which F-320 compiles, no longer occur: the nine declarations that stopped at 'Can't compile LetFn' emit." New: "The kinds that F-315 removes (`Any` in an `extends` clause, `forbid` and the `test` modifier) and the local function (F-320) no longer occur."
- C17: the review's correction of the ground goes in the same history block's note. One write gives one block for each entry, so it is not a separate `note F-34`. The correction: the measured tree is rung L's; the merged tree adds rung T's three overloads over `String`, which the code generator has not measured.
- Meaning: unchanged. The entry stays bounded to `dbf4825e0`.
- Past 600: Q1 keeps the measure's setting and bound, the kinds left with their rows, and the dispatch generator's result. Q2 keeps "counted at its first wall". The probe's output lines (Q4) and the nine (Q5, F-320) went first.

### C9. F-181 (1639 to 1636)

- Old: "A local function compiles as a closure, except in the three forms of row 304 (F-320)." New: "A local function compiles as a closure, except in the four forms that F-320 names."
- Meaning: corrected to F-320. A varargs local function does not compile either ('Can't compile VarArgs yet', row 624), and "the three forms of row 304" left it out.

### C10. F-307: keep

"The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten (F-299)." This is true (`Library/System.fss:51-55`; `Library/FortressLibrary.fss:4628-4644`). It tells a reader that these two are not among the eight.

### C11. F-32: keep

The gather changed two counts only (161 to 143, 288 to 306). The entry is in the record's form.

### C12. F-53: keep

The commit stage changed the batch number only. Its figures stay.

### C13, C14. F-240 (1975 to 1995)

- The commit stage's figures are kept as written.
- Old: "From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise." New: "From climb batch 22's gate to climb batch 26's it took between about 150 s and 180 s, one run at each gate, and no batch moved it by a measured difference."
- Old: "That rise has no measured cause: each gate ran the stage once, and at climb batch 25's gate the stage started 9 s before `testFast`, whose four JVMs ran beside it, where at climb batch 24's it started 53 s before." New: "That fall has no measured cause: each gate ran the stage once, and at both gates the stage started about 10 s before `testFast`, whose four JVMs ran beside it."
- Detail gains "`reviews/batch-26-review.md`, section 2;".
- Meaning: brought in line with climb batch 26's gate. The ground is the review's section 2: the count stage at 178 s or 181 s against 158 s, "One run each: no measured difference". The distance stage at 246 s against 271 s, started 12 s before `testFast` against 9 s, and "The fall is no measured difference either".
- Past 600: Q1 keeps the times and the load warning, which tell a rung how to compare a time. The 24-to-25 start times left the entry, since they explained a rise that is no longer the latest move. It grew by 20 characters, the Detail pointer that the extension owes.

## FACTS: sentences made false or left short

### C16. F-257 (2167 to 1896)

- Old: "or one has them and the other is a plain declaration (F-252, F-27)." New: "or one has them and the other is a plain declaration or a functional method of a generic trait that declares none of its own (F-252, F-27, F-318)."
- Old: "Or it is of neither kind above, as a functional method of a generic trait beside another," New: "Or it is of none of the kinds above, as two functional methods of generic traits,". In the old text, "beside another" could mean beside any declaration, which is now false for an own generic. I checked the new example in the code: `validOnDeclaredDomains` (`OverloadedFunction.java:772-786`) reads no pair of two trait methods.
- Old: the three messages quoted whole. New: "The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two say "not found" because ..."
- Meaning: the reading's reach widened to the tree's (F-318, `tests/GenericInsideTraitMethodReturnRuleWalk`). The messages are unchanged and moved to the report.
- Past 600: Q1 keeps the reach of the reading and which pairs keep the old message. The tests are its evidence. To let it grow by its clause, I first moved the messages' full text to the report it names (Q4). The full text is there, `rung-walk-trait-method-bounds/REPORT.md`, section 1. A test writer keys on the opening words.

### C18. F-?1, new, in "The checker and the one library" (800)

"- F-?1 **The compiled checker reads a helper's Java `String` parameter as the one library's `String`, a parameter that walk refuses at load, so the count and distance stages pass a binding that walk refuses.** In walk's world the checker reads a helper's Java types as the one library's (F-298), and its table maps a Java `String` to `String` (`compiler/NamingCzar.java`, `oneLibraryForeignJavaTranslations`). Walk refuses a helper parameter declared `String`, since a Java `String` cannot carry a string that is not flat (F-299). The two readings differ, and this bears on the design of the switch-over, where the compiled checker reads the one library's bindings. Read in the code. Detail: `compile-ladder/rung-string-natives/REPORT.md`, "Decisions", item 2; `reviews/string-natives-2026-11-05.md`."

- Meaning: new, from the review's Part 4, note (i), and split 5. I read it at 61f1c6a93: `NamingCzar.java:488` maps `String.class` to `String`; `StaticNativeApp.java:70-72` refuses the parameter.
- Past 600: Q1 keeps both readings and what they bear on.
- I placed it under its section; `record.py` places it in that section. The sort asked for it "beside F-298 and F-299". If the tool puts it at the section's end, a move is the coordinator's.

## POSITIONS

### C27. P-159: not cut only

- Old: "Both sentences are to be revised, in the form of Appendix I, to the rationals chapter's reading: 0/0 compares `false` "for compatibility with floating-point arithmetic", and the infinities are ordered. Row 672: that edit, which closes the row."
- New: "Both sentences are revised, in the form of Appendix I, to the rationals chapter's reading: 0/0 compares `false` "for compatibility with floating-point arithmetic", and the infinities are ordered (F-319). Row 672 closed with that edit."
- Decision, before and after: on `RR64` and `RR32`, `<`, `<=`, `>` and `>=` give `false` at a NaN, and `CMP` gives `Unordered`, on both paths. Unchanged.
- Reach, before and after: both paths, `RR64` and `RR32`, and the overview's two sentences. Unchanged.
- Requirement, before: revise the two sentences in Appendix I's form, which closes row 672. After: that edit is made (`3eabf8435`), and row 672 is FIXED. Nothing more is required.

### C28. P-160: not cut only

- Old: "The clause stays until the first step lands: without it, walk refuses the library's array operators at load, and with them most programs."
- New: "The clause stayed until the first step landed (F-318): without it, walk refused the library's array operators at load, and with them most programs."
- Decision, before and after: `Number`'s `comprises` clause goes, in two steps. Unchanged.
- Reach, before and after: the one library's `Number`, walk's load check, and the library's `.fss` and `.fsi`. Unchanged.
- Requirement, before: keep the clause until the first step lands, then remove it, with the generator, `=` and the tests. After: the first step has landed (`c41c3d2b0`); the second step's requirements are unchanged. The clause is still in the library.
- Note: rung W's report, "8. Sentences made false", says that this sentence "stays true as written". Its reason clause, "without it, walk refuses ... at load", is false since the first step: F-318's scratch measure runs four programs with the clause removed. So I took the sort's reading.

## The gap ledger

### C31. Row 846, notes only (`rows.rewrite`)

- Old notes, end: "A helper parameter declared `String` is refused at load (`interpreter/glue/StaticNativeApp.java:70`, `:178`), which `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss` checks. No binding of the library is over `String`. Fix: flatten the argument first, or bind over `FlatString`."
- New notes, end: "A helper parameter declared `String` is refused at load (`interpreter/glue/StaticNativeApp.java:70`, `:178`), but a `self` declared `String` is taken by `getString()` (`:282`): a helper bound in a method of the trait `String` would get the type's name. The library binds neither. Fix: flatten first, or bind over `FlatString`."
- The claim, the status and the other cells are unchanged. Notes 697 of 700 characters. To make room, I cut the test path of the refusal; F-299 names that test.
- The sort asked for `ledger.py note`. The cell was too full to add to, so it is a rewrite of the notes cell.

### C32. A new row (`rows.add`)

`rows.rewrite` goes through `ledger.py rewrite`, which refuses a number that is not in the ledger. So the new row is in `rows.add`, and `checks.sh` does not apply it. To apply it: `python3 explorations/coordinator/tools/ledger.py add --section '10. Strings, maps and printing' rows.add` (the number is `?`; `add` gives the next one).

"| ? | under walk, `getProperty` at an empty name, `""` or an `EmptyString`, raises Java's `java.lang.IllegalArgumentException: key can't be empty`, which reaches the program as a Java exception, not as one of the library's | NEGATIVE-BOUNDED | implementation gap (runtime) | silent | none | climb batch 26 rung T | ... |"

- Ground: rung T's report, "Values that move" (observed with `old-fortress.sh` on the base and `bin/fortress` on the tree), and the review's split 7. Read in the code at 61f1c6a93: `systemOps.getProperty` (`nativeHelpers/systemOps.java:20-21`) reaches `System.getProperty` through `ProjectProperties.get` (`repository/ProjectProperties.java:207-208`) and `useful/StringMap.java:164`. `StaticNativeApp.java:252-257` rethrows a helper's `RuntimeException` as it is.
- The status is `NEGATIVE-BOUNDED`, since the specification is silent; the template gives `NEGATIVE-VERIFIED` only where it settles the case. Rows 846 and 895, silent too, are `NEGATIVE-VERIFIED`.
- The review says "which no `catch` sees". I wrote what the code shows: it reaches the program as a Java exception, not as one of the library's. No test catches it.

## The other changes of owed.md

C26, C29, C30, C33 and C34 have writer "none". I wrote nothing for them.

## Decisions not taken

1. P-159's sentence "The specification's overview of operators says that this comparison throws that error, and the sentence before it that a rational comparison at 1/0 or 0/0 throws `RationalComparisonError` (`...opr-overview.tex:283-288`)" is false too. The overview now says `false`. No change of `owed.md` names it, and the brief limits me to the named sentence, so I kept it. Alternatives: (a) "said" for "says" and "threw" for "throws" twice, the fewest words; (b) leave it until the coordinator names it.
2. P-160: the sentence could be deleted whole, a cut only, since the two steps' order is in "First ... Then". I chose the tense change, which changes fewer words. Alternative: delete it, which `words-subset.py` would check.
3. F-252: a split into the reading at load and the withdrawal of an exclusion would bring each part nearer 600. No change asks for it.
4. The new row's section: "10. Strings, maps and printing", beside row 846. Alternative: "11. Parallelism, exceptions and control flow", since the defect is an exception that escapes.

## Questions for the curator

1. P-159 says that `CMP` gives `Unordered` at a NaN "on both paths, as the team built them". Rung S's report (section 1, the Appendix I entry's effect) says that the compiled path's own library declares no `CMP` on floats until the switch-over. Does the decision mean `Unordered` on the compiled path once the one library is its library? The cold reader could not tell. Its text is kept.

For the coordinator, not a question: P-159's sentence "The specification's overview of operators says that this comparison throws that error, ..." is false since `3eabf8435`. Its fewest words are "said" and "threw" twice. No change of `owed.md` names it, so I kept it. The check notes that the rule of 2026-10-31 covers it.

## The fix round

From `check.md`, `cold-read.md` and `mech-1.md`. Every mechanical check passed; the new entry is F-322. The text above gives the first round. This part gives each change of the fix round, and the "Meaning" lines that it changes.

### Failures of `check.md`

- **C3, F-320 (form).** "measured once" becomes "measured once on `dbf4825e0`'s code". Meaning: unchanged.
- **C4, F-321 (fidelity).** "So a binding can name only a helper class all of whose methods map to the one library's types" becomes "So a binding passes the checker only where every method of its helper class maps to the one library's types". The title's "Against the interpreter's prelude" becomes "Where it checks the one library against the interpreter's `FortressBuiltin`, as the count and distance stages do", since the cold reader did not know the term. Meaning: the condition on a binding, which `System`'s two bindings do not meet. It is no longer a limit that the library breaks.
- **C5, F-299 (form).** "(F-306, with F-305, F-312 and F-314)" becomes "(F-306; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314)". Meaning: unchanged.
- **C14, F-240's history note (fidelity).** The note now says that the band runs from climb batch 22's gate to 26's, about 150 s to 180 s, as the entry does.

### Passages that the cold reader read two ways or could not resolve

Fixed, each from its source:

- F-299: "all but `=` and `flatConcat` at a `Char`" becomes "all but `=` and the `flatConcat` overload over a `Char`" (`Library/FlatString.fss:71`, `:97`). "told by its declaring component" becomes "identified by the component that declares it".
- F-240: "Its rise" becomes "The count stage's rise". "271 s (205 s)" becomes "271 s (`FortressLibrary` 205 s)", the commit stage's figure.
- F-252 and F-257: "a functional method of a generic trait that declares none of its own" becomes "a generic trait's functional method that declares none of its own", so the clause attaches to the method (F-318). F-257: "The first two say "not found"" becomes "The first two contain the words "not found"".
- F-318: "two own generics" is glossed "declarations with static parameters of their own". The extender rule is given: "that an extender is a subtype of the static argument it gives" (P-146's text). "a call that two declarations fit runs one of them" becomes "at a call that two declarations fit it runs one of them".
- F-319: the title says "The specification, as the revival revised it, says", so it does not contradict the restart's sentence.
- F-34: "No test checks it" becomes "No test checks the 38".
- P-160: "The clause stayed until the first step landed (F-318)" becomes "The clause stayed until the first step landed, and stays until the second (F-318)". The cold reader read the past tense as the clause gone. The clause is in `Library/FortressLibrary.fss:381`; the scratch measure restored it. Not cut only. Decision, reach and requirement: as in C28 above, unchanged. The second step still removes the clause.
- F-322: "In walk's world" becomes "Where it checks the one library, as the count and distance stages do" (F-298).

Kept, since they are in text that this landing did not change, or no source settles them:

- F-34: why the probe puts the helper strings back, and the seven kinds not named. The report's section 5 holds both.
- F-240: how the count stage's rise since 21b splits between the export check and the symbolic operators. No source splits it.
- F-252: the two conditions of a standing exclusion, "reads ... from the declarations", "read whole", "compares ... on the instance", and a title that leaves out the case of a plain declaration (F-27 holds it). All are the gather's or the base's text. A rewrite of F-252 for clarity is a separate task.
- F-319: what `=` answers at 0/0 by the specification. The overview's sentence names only the four ordering operators.
- F-181: "opens its value", "the pair": the base's text.
- P-160: "the reflective QuickCheck generator": the curator's text.
- F-299: "live bindings" and the cut quote of P-58: the base's text.

### Lengths after the fix round

F-34 1525, F-240 2027 (base 1975), F-252 4166, F-257 1907, F-299 3149, F-318 2129 (base 2033), F-319 about 1127 (base 1073), F-320 1424, F-321 1303, F-322 854, P-160 1312 (base 1274). Each growth past the base comes from words that the check or the cold reader asked for.
- F-318 grew by the gloss of "own generic" and the extender rule (Q2: without them the reader misreads the entry).
- F-319 grew by the C2 correction and "as the revival revised it" (Q2).
- F-240 grew by the Detail pointer and the two named referents (Q2).
- P-160 grew by "and stays until the second" (Q2).

### Left for the coordinator

- C32's row is in `rows.add`. `checks.sh` does not apply it. Apply it by `ledger.py add --section '10. Strings, maps and printing'`.
- F-322's place: `record.py` put it at the end of its section. A move after F-299 is the coordinator's.
