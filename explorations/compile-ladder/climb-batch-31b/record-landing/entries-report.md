<!-- The entries writer's report for climb batch 31b's record-landing: for each change of owed.md whose writer is entries, what was done, the old and the new words, the meaning, the size and the questions for the curator. -->

# The entries writer's report, climb batch 31b

The changes are in `record.apply` (22 entries after the fix round, F-308 added), `clean.txt` (the same 22 lines), and `cut-only.txt` (P-68). The fix round's changes are in the section "The fix round", and the past-600 questions for every entry of the pass are in "Past 600: the question that keeps each sentence". Where a block below and the fix round differ, the fix round holds. No change has a gap-ledger row as its home, so there is no `rows.rewrite`.

Sizes below count the line with its "- " opening. Where an old line is long, the report gives only the words that changed; `entries.md` holds each whole old line.

## The changes, in the order of `owed.md`

**C1, F-24: keep.** The merged-diff review renamed `Int.overflow()` to `ZZ32.overflow()`, and row 350 holds `ZZ32.overflow()`. The entry reads right. Size 951, the same as at the base; no sentence is new.

**C2 and C71, F-34: changed.**
- Old: "Measured twice on the code of `832f7d0d91`, with one result; the count on code with rows 81 and 875 fixed is not taken."
- New: "Measured twice on the code of `832f7d0d91`, with one result. On the code of `7858d0e97b`, with rows 81 and 875 fixed, the same script gave 21 refused, measured once: varargs 10, two of them declarations that met `label` or `atomic` first; the kind environment 4; the range operators 4; a closure class written twice 2; an intersection as a receiver 1. No count is taken on later code."
- Moved out first: the unpatched figure, "the other eleven components give 11 refused declarations in 6 kinds", to `PROBES.md` section 3, which holds it; "one of them a trait's" of varargs, to `switch-rehearsal.md` section 3, whose table holds it; and the kind of each of the four load-time walls of rows 990, 991, 992 and 732, to those two sections. The new sentence on them: "It sees no class that is emitted and fails when it loads; the four such walls of that code, rows 990, 991, 992 and 732, are fixed since." The Detail gains `reviews/batch-31b-review.md`, section 3.
- Size: 2467 to 2529. It grew by 62 characters, less than the added clause of about 340.
- Meaning: one claim changed, from its ground: the count with rows 81 and 875 fixed was taken, 21 on `7858d0e97b` (the review, section 3). No count after the landing.
- Past 600: the patch's three parts and the setting (question 2: without them the 24 cannot be read); the by-row list (question 1: it tells which rows stand between the library and bytecode); the command (question 1).

**C7, F-74: keep.** It names the objects `ZZ32`, `ZZ64` and `ZZ` (F-379), as the tree holds. Size 808, shorter than at the base.

**C9, F-79: keep.** The cut of "`RR64` comprises `Float` alone" holds, and the lines `FortressLibrary.fsi:456-464` were re-anchored. Size 1360.

**C12, F-122: keep.** Checked: `(long) Math.rint` stands at `interpreter/glue/prim/RR32.java:326` and `nativeHelpers/simpleDoubleArith.java:149`. Size 934.

**C17, F-229: changed.**
- Old: "The witness is of the result type because, while walk's `ZZ32` values were of its native object `Int` (before F-379), at `T = Int` a witness of the element type, `() -> Int`, would match the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError` (row 722, the same cast in `openRange`)."
- New: "The witness is of the result type because a witness of the element type failed while walk's `ZZ32` values were of a native object `Int`, now gone (F-379): at `T = Int`, `() -> Int` matched the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` threw `CastError` (row 722, the same cast in `openRange`)."
- Meaning: unchanged. "before F-379" treated an entry as an event; the reason is now told in the past.
- Size: 1561 to 1557. Past 600: each sentence gives a branch, a type that gets none, or the reason for the design (question 1).

**C22, F-262: keep.** "a `ZZ32` value" is right after the merge. Size 1329.

**C28, F-291: keep.** Row 832 is fixed and row 1056 holds the generic operator applied to a tuple, as the ledger says. Size 1322.

**C29, F-296: keep.** "Row 339 is reached and stays open; row 832 is fixed since." Size 1151.

**C30, F-299: changed.**
- Old: "and `NN32` 30, `NN64` 31 and `Char` 40"
- New: "and `NN32` 30, `NN64` 31 (its 32nd binding, `signed`, counted with the small rest) and `Char` 40"
- Checked: the object `NN64` holds 32 `builtinPrimitive` bindings at `Library/FortressLibrary.fss:1063-1168`.
- Meaning: unchanged; the clause says what the figure counts. The count, 373 of 401, stays.
- Size: 3073 to 3131. It grew only by the owed clause. Past 600: the count by type is the entry's claim, and each pointer leads to the entry of a family (question 5).

**C32, F-303: keep.** Checked: `StaticNativeApp.java:64` maps `RR64` to `double`. The 61 are listed from `FortressLibrary.fss:384-576`, and the rung's report gives the same 61. Size 1485, shorter than at the base. Past 600: the list of the 61 lets a reader find a binding without the file (question 1); it could go to the rung's report by question 4 if the judge wants it shorter.

**C33, F-305: keep.** The objects' `CHOOSE` at `:918` and `:1030`. Size 1468.

**C34, F-306: keep.** `interpreter/evaluator/values/FBigNum.java` exists. Size 1307.

**C35, F-307: keep.** The getters are `ZZ64`'s and `ZZ`'s. Size 1106.

**C36, F-308: keep.** Its `NN64`'s 30 belongs to this entry's count of 100 bindings over `NN32`, `NN64` and `Char`. It differed from F-299's partition at the base too (27 against 28). The sources do not say which two of the object's 32 bindings F-308 leaves out. See the decisions not taken.

**C37, F-310: keep.** Every one of `RR32`'s 51 names a helper; the merged-diff review's history block gives the correction. Size 935.

**C38, F-311: keep.** Size 681.

**C40, F-313: keep.** The rewriter's `UnsignedLong` clause is gone (`BuiltinPrimitiveRewriter.java:189`), and the entry says so with row 886. Size 1132.

**C41, F-314: keep.** Size 1066.

**C43, F-323: keep.** `Float`'s bindings are named as `RR64`'s. Size 1115.

**C44 and C77, F-327: changed.**
- Old: "the 16 bindings count among F-299's 374"
- New: "the 16 bindings count among F-299's 373"
- Meaning: unchanged; the count follows F-299. The renaming of `Int.shiftCount` to `ZZ32.shiftCount` and the lines, both from the merged-diff review, are right.
- Size: 1232, the same.

**C45, F-328: keep.** `ObjectPrims.java:48-52` holds the ilk without the reading of the five. Size 1004.

**C48, F-344: keep.** `LanguageTypes.java` holds the four string objects only. Size 850.

**C51, F-352: keep.** Row 992 is named as fixed since. Size 2104.

**C55, F-361: changed.**
- Old: "Measured once on `832f7d0d91`; nothing landed, and no test holds it;"
- New: "Measured once on `832f7d0d91`, in a scratch tree that landed nothing; no test holds it;"
- Meaning: unchanged. "nothing landed" now plainly says the probe's tree; the merge landed by its own commit, as the entry's sentence on `main` says.
- Size: 1457 to 1476. Past 600: the probe's measurements are the entry's claim, bounded to their code (question 1); the gaps and rows tell what the probe met (question 2).

**C56, F-366: keep.** The clause on rows 1059 and 528 reads right; the entry grows by nothing. Size 2941.

**C58, F-369: keep.** Row 1031 is fixed, and `CodeGen.java:6776` was re-anchored. Size 1769.

**C62, F-375: changed.**
- Old: "...With the merge of the number types with their objects (P-178, F-379) every generic-beside-plain pair over the five is read on its declared domains: walk's suite loads every pair it loaded before, and of its expected-failure tests none moves between a refusal at load and a failure at run time (`compile-ladder/rung-number-objects/REPORT.md`, "Every pair ..."). Where the reading and the team's shortcut differ, some pairs are refused and others load; the report runs each old against new."
- New: "...With the five number types merged with their objects (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains: walk's suite loads every pair that it loaded before, and none of its expected-failure tests moves between a refusal at load and a failure at run time. The reports run each pair whose verdict changed, old against new." The pointer to rung O's report moved to the Detail.
- Meaning: unchanged. Row 697 at the five types is left to F-379.
- Size: 2172 to 2110. Past 600: the choices made at a default, with who made them (question 1: a reader must not take them as the curator's); the merge's measured effect (question 1); the tests (evidence).

**C65 and C68, F-378: changed.**
- Cut: "(`CodeGen.tupleElementsBridge`)", "(`runtimeSystem/Instantiater.java:119-165`)" and "(`CodeGen.callTakesTupleBoxed`)". The Detail adds "which names the bridges' members and lines". The rung's report, "The convention as built", names the three members.
- Meaning: unchanged.
- Size: 1360 to 1296. Past 600: the two bridges and the dotted call's choice (question 2: without them the convention is misread); the rows still failing (question 1).

**C66 and C69, F-379: changed.**
- Old: "So `asif` at one of the five is the identity, walk's load check reads pairs over the five as over objects (rows 550, fixed, and 1044), and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. The team split each into a trait and one native object of `FortressBuiltin` for `IntLiteral` and for nesting (`fca589bbb0`), which the flat tower and the numerals' own types removed. Under walk an object of a native component takes its values from the Java class of its name in the component's package (`interpreter/evaluator/BuildNativeEnvironment.java:42-48`), and the five, in `FortressLibrary`, so by a table."
- New: "So `asif` at one of the five is the identity, and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. Walk's load check reads pairs over the five as over objects: a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed), and so do two kinds of invalid pair: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists against the Subtype Rule, such as `f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697)." The table clause moved into the second sentence: "walk finds their glue classes in `interpreter/glue/prim/` by a table of the five names".
- Meaning: one claim added, from its ground: row 697's pair at the five types now loads, against the Subtype Rule (the review, section 2, "What rung O made a program see"; Part 1; row 697's note). Walk refused it at the base.
- Moved out: the team's split, `fca589bbb0`, to the history (question 3); walk's general rule for an object of a native component to the rung's report, whose table of walk's Java gives `BuildEnvironments` and `BuildNativeEnvironment` (question 4).
- Size: 1602 to 1445. Past 600: the five objects' places and walk's table (question 1); the names that are gone, with row 959 (question 1: an arm at `Int` is silently wrong); the pairs that load (question 1); `QQ` and the prelude (question 2).

**C67 and C70, F-380: changed.**
- Cut: "(`scala_src/typechecker/impls/Functionals.scala`, `numeralResult` and `joinInto`)" and "(`NumeralConversion.outOfRangeAt` in `scala_src/typechecker/CoercionOracle.scala`)". The Detail says that the report names the checker's members; the skeptic's section names `outOfRangeAt`.
- Meaning: unchanged.
- Size: 1237 to 1107. Past 600: the places where the conversion holds and the one where it does not (question 1); the tests (evidence).

**C72, F-257: changed.**
- Old: "rows 539, 550 and 779 hold valid pairs that walk refuses."
- New: "rows 539, 779 and 1058 hold valid pairs that walk refuses."
- Meaning: unchanged; the list follows the ledger. Row 550 is fixed; row 1058 holds a valid pair refused with 'fails the Return Type Rule'.
- Size: 2035, the same.

**C73, F-240: changed.**
- Old: "The count table records no seconds, so its time is the file times of the gate's log; that time is not of one span with the whole stage, which rung runs of the same night timed longer, so it shows no fall since climb batch 31's gate, the one before; the distance stage..."
- New: "The count table records no seconds, so its time is the file times of the gate's log; the distance stage..."
- Meaning: unchanged; a clause written to explain a fall is cut, since the gate shows a rise, about 85 s against about 75 s. Every figure stays the commit stage's.
- Size: 2366 to 2202.

**C74, F-285: changed.**
- Old: "`:2720`, `:3106`, `:3111`, ... `:4765`, `:4782`, ... (`:1586`) ... (`:2740`)"
- New: "`:2804`, `:3190`, `:3195`, ... `:4849`, `:4866`, ... (`:1670`) ... (`:2824`)"
- Checked by content at 00dd16a89: `cast[\O0\]` at `:1670`, `SUM[\T\]` at `:2804`, `:3190`, `:3195`, `N[\0\] => cast` at `:2824`, `SUM[\ZZ32\]` at `:4849`, `:4866`.
- Meaning: unchanged. Size 1683, the same.

**C75, F-75: changed.**
- Old: "By reading, not by a run, the rule brings no refusal to the one library's pairs of a generic and a plain declaration over the built-in number types once they are merged with their objects (P-178). ... In the interpreter's library the two rules refuse no pair: the distance holds no return-type or overloading error (F-53)."
- New: "In the interpreter's library, with the built-in number types merged with their objects (P-178, F-379), the two rules refuse no pair: the distance holds no return-type or overloading error (F-53)."
- Meaning: unchanged in scope; the claim's evidence changed from a reading to the distance on the merged library (the review, section 4).
- Size: 2122 to 1999.

**C76, F-32: changed.**
- Old: "28 of the one library's 402 live native bindings" and "F-299 holds the 374 that name one"
- New: "28 of the one library's 401 live native bindings" and "F-299 holds the 373 that name one"
- Meaning: unchanged; the counts follow F-299. Size 1911, the same.

**C78, F-139: changed.**
- Old: "On the compiled path the prelude's `RR32` has no `=` (row 528), and two `RR32`s answer an `RR64` (row 529)."
- New: "On the compiled path `=` at the prelude's `RR32` overflows the stack (row 528), and two `RR32`s answer an `RR64` (row 529)."
- Meaning: the mechanism follows row 528 as rung E rewrote it; the gap stays.
- Size: 533 to 549, under 600.

**C79, F-140: changed.**
- Old: "'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long'"
- New: "'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type ZZ64'"
- Meaning: unchanged; the message as row 527 holds it. Size 1740, the same.

**C80, P-68: changed, cut only.**
- Old: "today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` compiled, and `round` is `ZZ64`, but `ZZ` in the `FortressLibrary` component's `trait RR64`."
- New: "today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` compiled, and `round` is `ZZ64`."
- The decision, before and after: on the float types, `floor` and `ceiling` return the same float type, while the brackets, `round` and `truncate` return `ZZ`.
- Its reach, before and after: each of the library's declarations of the brackets, `round` and `truncate`; one library rung after the switch-over (row 330).
- Its requirement, before and after: that rung first counts the interpreter tests whose output changes, then makes them return `ZZ`.
- Only the sentence on today's tree changed: there is no `trait RR64`, and the one `round` is `round(self):ZZ64` (`Library/FortressLibrary.fss:548`).

**C81, P-166: changed.**
- Old: "The library declares `value object BigNum extends ZZ` (`LibraryBuiltin/FortressBuiltin.fss:544`, `.fsi:196`), so every `ZZ` value is a value object, and `QQ`'s object `Ratio` (`Library/FortressLibrary.fss:649`) is a `value object` too."
- New: "The library declares `value object ZZ` (`Library/FortressLibrary.fss:1170`), so every `ZZ` value is a value object, and `QQ`'s object `Ratio` (`Library/FortressLibrary.fss:719`) is a `value object` too."
- The decision, before and after: `ZZ`'s and `QQ`'s values are value objects, and the specification's list of reference objects stops naming arbitrary-precision numbers.
- Its reach, before and after: two `ZZ` values, or two rationals, built apart are `SEQV` when equal; the list in `Specification/basic/objects.tex`.
- Its requirement, before and after: the revision form (P-96) with one Appendix I entry.
- See question 1.

**C82, P-162: changed.**
- Old: "`Float`'s power", "`Float`'s floor and ceiling brackets, the mixed powers of `Float` and `RR32`"
- New: "`RR64`'s power", "`RR64`'s floor and ceiling brackets, the mixed powers of `RR64` and `RR32`"
- The decision, its reach and its requirement, before and after: the 30 native bindings that no bare helper reaches; the 20 over `AnyIntegral` or `Number` convert in Fortress around public bare bindings at the prelude's narrow headers; the 6 over carried types get one-line helpers; the three over `Any` leave glue by P-167's way. A respelling: the same declarations, now `RR64`'s object (F-303, F-323).

**C83, P-165: changed.**
- Old: "`Float`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`"
- New: "`RR64`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`"
- The decision, its reach and its requirement, before and after: `asFloat` and the `=` built on it leave `trait Number`; each built-in number type keeps its own `asFloat`; these four take an `RR64`, and coercion carries `ZZ32`, `RR32` and numerals to them. A respelling.

**C84, P-163: changed.**
- Old: "Walk's binding (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:594`)"
- New: "Walk's binding (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:409`)"
- Checked at 00dd16a89: `:409` holds `builtinPrimitive("com.sun.fortress.nativeHelpers.simpleChar.charToExprString")`.
- The decision, its reach and its requirement, before and after: unchanged; a line number.

## The fix round

Each failure of `check.md` and each passage of `cold-read.md` in an entry that I changed, and what I did. Sizes after the fix round:
F-34 2552, F-299 3232, F-308 2098, F-375 2139, F-378 1329, F-379 1560, F-380 1125. The other lines are as in the first round.

- **C2, F-34, cold read: "in 8 kinds" against seven listed.** The first round cut "one of them a trait's" from varargs; that is the eighth kind, varargs in a trait (`switch-rehearsal.md` section 3, table). Restored: "varargs 8, one of them a trait's (row 624)". Meaning: unchanged. Size 2467 to 2552, +85, still less than C71's clause.
- **C30, F-299, fidelity.** The Detail opens with `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why", for the count of 373 of 401. The provenance line names that section too. Meaning: unchanged. Size 3073 to 3232: the owed clause on `NN64` and the owed source.
- **C36, F-308, fidelity.** New line in `record.apply`. Old: "`NN32`'s 30, `NN64`'s 30 and `Char`'s 40 bindings name their helpers." New: "`NN32`'s 30, `NN64`'s 30 (by this entry's count; F-299 counts 31 of the object's 32) and `Char`'s 40 bindings name their helpers." "All 100" stays, read as this count's. Meaning: unchanged; the clause states the scope. Size 2038 to 2098, by the clause alone.
- **C62, F-375, fidelity.** Old: "The reports run each pair whose verdict changed, old against new." New: "The reports run the pairs found to change, old against new." The Detail's pointer to rung O's report now names "Every pair that walk refuses at load after the change and loaded before" and "Programs run old against new". Meaning: unchanged from the base's "the report runs each old against new".
- **C65, F-378, form, and the cold read.** The Detail's "which names the bridges' members and lines" becomes "which names the bridges' members". The note names the section that holds the class loader's lines. For the cold read, the class loader's verb is written out, and "only such declarations" becomes "only declarations whose parameter is a type parameter". The rung's report holds that reading: "a call through an interface finds only the boxed form". Meaning: unchanged.
- **C66, F-379, fidelity, and the cold read.** The Detail adds "What a program sees differently", which holds rows 550, 1044 and 697 at the five types. For the cold read:
  - "against the Subtype Rule" now says what breaks it: "two plain lists whose more specific one returns a type not below the other's". `Specification/advanced/overloading.tex`, "Subtype Rule", holds it.
  - The glue classes: "the glue classes of the same names, such as `interpreter/glue/prim/ZZ32.java`, found by a table". This clause came out of the title, which keeps its other two claims.
  - "With `NN32` and `RR32`, objects already, seven of the eight number types are objects."
  - Meaning: unchanged. Size 1560, under its 1602 at the landing.
- **C67, F-380, the cold read.** "a later conversion of the variable dies" becomes "a later conversion of a variable bound to that block dies (row 1060)". Meaning: unchanged.
- **mech-1, the provenance notes of F-139, P-166 and P-163.** The backticks that the check read as paths are gone from those notes.

Passages of the cold read left as they are:
- In entries that I changed, the passages that lie in words older than this landing: F-34's "the bound `Any`", the patch's parts and "the count can be taken only on a patched tree"; F-75's title against its body; F-240's "Its rise"; F-257's "an own generic"; F-285's "clause form" and "twelve components"; F-361's purpose. The pass did not name them, and no source here settles a new wording that keeps each condition. F-240 has a question below.
- In POSITIONS: the curator's rule of 2026-10-31 lets only the named sentence change.
- The conflicts between F-379, F-375 and F-380 and the `fortress-repo` skill's `interpreter.md`, `compiler.md` and `library.md`, which still name `Int`, `Long`, `UnsignedLong`, `BigNum` and `Float`, row 550 as open, and rows 1014 and 1030 as the trap at a block's end. That detail belongs in the skill, which does not yet hold it. It goes to the skill writer.

## Past 600: the question that keeps each sentence

The questions are those of "What an entry is": 1, the reader would do otherwise without it; 2, the reader would misread another sentence without it; 4 does not keep a sentence; 5, the entry gives a pointer. "Evidence" is the entry's test or source, which the rule asks every entry to hold. For each entry: the size, then each sentence or group past the title and first sentence, with its question.

- F-24 (951): the helper's exception (1: a `catch` sees it); `ProgramError` (1); the tests (evidence); the report (evidence).
- F-74 (808): the converted numeral (2); the run-time type and the inference at `ZZ32` (1); a size used as a value (1, row 962).
- F-79 (1360): the numeral types' place and what they lack (2); the conversions and their rounding (1); the checker's names (1); walk's reach (5, F-341); the tests (evidence).
- F-122 (934): NaN and saturation (1); the near-tie reading (1); the gates and the observed parts, with the code (evidence and its kind).
- F-229 (1557): the branches (1); invariance (2); `Number` and `AnyIntegral` (1); row 729 (1); walk's inference (1); the witness's reason (1: without it a worker could change the witness); the tests and the distance (evidence).
- F-240 (2202): the history of each figure is kept as the count's one entry: a move reads only beside its causes and its load (2). Every figure is the commit stage's.
- F-257 (2036): the cases read on declared domains (2); the messages (1: a test matches them); the rows refused wrongly (1); the pairs that keep the old message (1); the tests (evidence).
- F-262 (1329): the numeral has no sign (2); the checker's type (2); the folding (1); walk's default (2); the reading as evidence (evidence).
- F-285 (1683): the sites (1: a worker must not remove them); the forms left unwritten (1); the fused arm (1); the checker's inference (1); walk's subscripts (1, row 824); the tests (evidence).
- F-291 (1322): the shapes measured (2); the class loader's names (evidence); the cost (1, F-292); row 832 (1); what was not run (1); `extends Object` (1).
- F-296 (1151): the twelve commands (1); the distance's setting (5, F-289); row 759 (1); the prelude's `Object` bound (1); rows 339 and 832 (1).
- F-299 (3232): the loader's rules (1); the 15 own operations (1); `FlatString`'s carrier (1); the skill's part (5); the count by type, each with its family's entry (5); the source of the count (evidence); the tests (evidence).
- F-303 (1485): the 61 (1); `fromRawBits` (1); the tests (evidence).
- F-305 (1468): the helpers on both paths (1); the overflow bound (1); the scratch arrays (1); the sweep (evidence); the tests (evidence).
- F-306 (1307): the 29 and 11 helpers (1); the wrapping bindings (1, row 348); the raises (1); the `ZZ` operand (1); the tests (evidence).
- F-307 (1106): the places (1); the special names (1); `signed` and `char` (1); the string natives (5, F-299); the tests (evidence).
- F-308 (2098): the transfer (1); rows 885 and 886 (1); the identities and the guards (1: the checker does not catch a wrong helper); the zero divisors (1); the count's scope (2); the skill's part (5); the tests (evidence).
- F-310 (935): the helpers and the carrier (1); the shared helpers (1); `^` and `asFloat` (5); the prelude (1); the tests (evidence).
- F-311 (681): the specification (evidence); the gone `Float` (2); the new helpers (1); the tests (evidence).
- F-313 (1132): the printing and negation (1); the transfer and row 886 (1); walk's values (1); the tests (evidence).
- F-314 (1066): the helpers' place (1); `nanoTime` (1, row 75); `CHOOSE` at `k < 0` (1, row 887); the tests (evidence).
- F-323 (1115): the declarations at `RR64` (1); the power's conversion (1); the new helpers (1, row 872); `printThreadInfo` (1); the counts (5); the tests (evidence).
- F-327 (1232): the converters (1); the helpers (1); the count and the decisions they hold (5); the tests (evidence).
- F-328 (1004): the mapping (1); `asString` (1); the ilk's names (1); the tests (evidence).
- F-344 (850): the string objects (1); the numbers (2, F-379); the ilk (1); the test (evidence).
- F-352 (2104): the scratch tree's setting (2); what ran and what did not (1); the two kinds of walls with their rows (1); the verifier (1); the check's time (1); bounded to one run (evidence).
- F-366 (2941): the answers at `=` (1); the two compiled rows (1); `Equality`'s `=/=` (1); the order (1); the tie (1); the cost (1); the departures (1, rows 1016 and 1017); the source and the tests (evidence).
- F-369 (1769): the checker's typing (2); the code generator's classes (1); the first read (1, row 1011); the model's lines (1); walk's runs (1, row 1026); rows 1029 and 1031 (1); the tests (evidence).
- F-375 (2139): as in the first round, under C62.
- F-75 (1999): the choices made by a worker (1); the paper (2); the accepted pair (1); row 1048 (1); the distance (1); the tests (evidence).
- F-32 (1897): the match at `a1f8c4b8b` (2: the 401 reads only beside it); where the families went, each with its entry (5); `Reflect` (1).
- F-140 (1727): the checker's ranges (1); walk's reading (1); the class loader (1, row 675); the gates (evidence); rows 527 and 962 (1).
- F-34, F-361, F-378, F-379, F-380: as in the first round, under C2, C55, C65, C66 and C67.

F-24's to F-366's sizes are unchanged by this landing's pass, save F-299 and F-308. None of the kept entries grew.

## Decisions not taken

1. F-308's `NN64` 30 (C36): done in the fix round, as the check corrected it. Another way: name the two bindings that F-308's count leaves out, after a count against `compile-ladder/rung-natives-hard/REPORT.md`.
2. F-303's list of the 61 bindings (C32). Kept. Another way is to move the list to the rung's report and keep its kinds, by question 4.

## Questions for the curator

1. P-166's reason. Its "Why: the library's `value` declaration is the deliberate word" rested on the team's own `value object BigNum extends ZZ`. That declaration is gone. `ZZ` is now a value object by the revival's merge of the number types (P-178). The new text names `value object ZZ` and keeps the "Why" word for word. Should the "Why" name the team's declaration, which the merge replaced, as its ground? Old and new text of the cited sentence are above, under C81.
2. F-240's "Its rise from about 90 s at climb batch 21b's gate": a cold reader could not tell which stage "Its" names. The sources that this run read do not settle it, so the wording stays. Should the entry name the stage, after a read of `reviews/batch-21b-review.md` and `reviews/batch-22-review.md`, section 2?

## For the landing report

The five POSITIONS changes (P-68, P-166, P-162, P-165, P-163) land without the curator's yes, by his rule of 2026-10-31. Each changes only a sentence that the tree made false; the old and the new words are above, under C80 to C84. P-68's change only deletes words.
