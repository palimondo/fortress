<!-- The entries writer's report of the record-landing workflow for climb batch 30, after its fix round: for each change of owed.md whose writer is entries, the old and the new sentences of its entry or row, whether the meaning changed, the reason for each entry's length, and the points for the coordinator. -->

# The entries writer's report, climb batch 30, after the fix round

## The files

- `record.apply`: 18 entry lines, each with its provenance line. 15 are FACTS entries and 3 are POSITIONS entries.
- `rows.add`: one new row, for section 11 of the gap ledger. `checks.sh` adds new rows from this file, so the run has no `rows.rewrite`.
- `clean.txt`: the 18 entry lines and the row line, with no provenance.
- `cut-only.txt`: empty. No POSITIONS change only deletes words.

For each change below, "Old" and "New" give the sentences that changed. The rest of each line is word for word the line at AT. I compared the two sets of lines with `git diff --no-index --word-diff`, and it shows no other difference. The whole old line is in the record at AT. The whole new line is in `record.apply`.

Lengths are bytes by `wc -m` in this session's locale, without the line end. They are a few more than the record tool's characters where a line holds `…` or `№`. The differences are exact.

## The pass on the entries that the batch wrote

### C1, F-53: keep

No line. The commit stage wrote the entry in the record's form, with the gate's figures. `owed.md` names no sentence of it as false.

### C2, F-240: keep

No line. The commit stage wrote every figure. `owed.md` names no sentence of it as false.

### C3, F-19

- Old: "Compiled, the arguments of a function call and of a dotted method call fork where the analyzer marked the argument tuple (`CodeGen.evalArg`; F-350), and the analyzer marks no call written in the compiler's prelude (row 982)."
- New: "Compiled, the arguments of a function call and of a dotted method call fork where the analyzer marked the argument tuple (`CodeGen.evalArg`; joins: F-350); it counts no call in the prelude's files (row 982) or of a function declared later in the file (row 987)."
- Old: "... walk's library splits a `ZZ32` range down to chunks of `grainSize`, 16, elements, each run by the sequential range's methods, and a range with a stride down to single elements (`Library/RangeInternals.fss:20`)."
- New: "... walk's library splits a `ZZ32` range into chunks of at most 16 elements (F-350), and a range with a stride down to single elements (`Library/RangeInternals.fss:1498-1585`)."
- Meaning: one clause added in the fix round: the entry names row 987, the calls of a function declared later in the file, which F-350 does not hold. Ground: the new row (C24). The cited lines change: `:20` is the grain's declaration, and the strided range is at `:1498-1585`.
- Length: 2033 to 2032, 1 fewer. The entry was past 600 before the batch.

### C4, F-134

- Old: "A local and a `try` with a named `catch` clause in a `do … also` arm after the first compile (row 497, fixed; `compiler_tests/TaskArmLocalSlot`, `TryInArmRungG`); a named `typecase` clause there has no gated test."
- New: "In a `do … also` arm after the first, a local and a `try` with a named `catch` clause compile (`compiler_tests/TaskArmLocalSlot`, `TryInArmRungG`); a named `typecase` clause there has no gated test."
- Meaning: unchanged. The closed row goes to the history.
- Length: 662 to 647, 15 fewer. The sentence past 600 stays by question 1: without it a reader takes a named clause in an arm for open, as the entry said before the batch.

### C5, F-347

- Old: "... spawns a task, which runs in place inside the root task in which the component's class is initialized (F-348; row 971, fixed)."
- New: "... spawns a task, which runs in place inside the root task that initializes the component's class (F-348)."
- Meaning: unchanged.
- Length: 1585 to 1562, 23 fewer.

### C6, F-348

- Old: "`MainWrapper.main` hands the program's component class, and after it the class of each component whose declarations its classes name, at any depth, to `FortressExecutable.initializeInRootTask`, reached through the class loader's copy of the run time's classes; the class loader finds the imported components by the class names in each component's jar."
- New: "The classes are the program's component class, then that of each component whose declarations its classes name, at any depth; the class loader finds them by the class names in each component's jar. The program's arguments are set before the classes are initialized."
- Old: "... come before the program's first output (rows 971 and 979, fixed)."
- New: "... come before the program's first output."
- New sentence: "This initialization adds about 40 ms to a compiled program's start: 249 to 313 ms with it, 214 to 263 ms before, five runs twice each, on rung N's code, which landed as `f36a651243`."
- The Source gains `:92-95` of `MainWrapper.java`. The Detail gains the review's section 2. The second test name loses its repeated folder.
- Meaning: two facts added, as C6 asks. Their ground is the review, "2. The three forks that landed at a default": the start's cost, and the arguments set first. I read `MainWrapper.java:92-95` in the tree.
- Length: 1283 to 1444, 161 more. Moved out first: how `MainWrapper.main` reaches `FortressExecutable.initializeInRootTask`, which the report's section 1 holds (question 4). The start's cost stays by question 1: a worker who times a compiled run needs it. The arguments stay by question 1: a class's initializer can read them.

### C7, F-349

- Old: "... (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle; so a call with three declarations in a chain of coercions, which ended in 'Ambiguous coercion', runs the first, as the compiled path does, and a float numeral to the left of an `RR32` operand runs `RR32`'s operator (row 958, fixed)."
- New: "... (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle. So a call with three declarations in a chain of coercions runs the first, as the compiled path does, with no 'Ambiguous coercion' (a probe, no test), and a float numeral to the left of an `RR32` operand runs `RR32`'s operator."
- Meaning: unchanged. The entry now says that the chain was seen in a probe and has no test. "Wherever the relation has no cycle" agrees with the specification's text, which calls the relation not necessarily transitive, and with the skeptic's correction.
- Length: 880 to 874, 6 fewer.

### C8, F-350

- Old: "... a `VirtualMachineError` leaves without the joins (`runtimeSystem/BaseTask.java`, `joinIfForked`; rows 947, 951 and 497, fixed)."
- New: "... when an exception leaves, an arm not yet forked is not run, and a `VirtualMachineError` leaves without the joins (`runtimeSystem/BaseTask.java:113-131`, `joinIfForked`)." The old clause was "an arm that was never forked is not run", which the cold reader could read as an arm that never runs at all.
- Old: "... the one library's parallel `ZZ32` range stops its split at `grainSize`, 16 (`Library/RangeInternals.fss:20`). What it means: a compiled reduction of the one library will fork its halves, and an exception leaves no arm running."
- New: "... the one library's parallel `ZZ32` range splits only a range of more than `grainSize`, 16, elements (`Library/RangeInternals.fss:20`, `:1320`, `:1337`). What it means: compiled against the one library, a reduction over more than 16 elements will fork its halves, and an exception leaves no arm running. By reading, not run: microGPT's vectors are 16, 16, 4 and 4 wide (`explorations/run-c4/src/MicroGptFlat.fss:17`), so a reduction over one of them forks nothing on either path."
- The Detail gains the review's section 2. The second test name loses its repeated folder.
- Meaning: changed in one sentence, as C8 asks. The old sentence let a reader expect the model's reductions to fork. The ground is the review's finding 1 and its section 2, fork G. I read `RangeInternals.fss:1320` and `:1337` and `MicroGptFlat.fss:17` in the tree: the test is `0 <= (hi DOTMINUS lo) < grainSize`, so a range of 16 elements or fewer runs in sequence.
- Length: 1196 to 1544, 348 more. Nothing else could move out: each other sentence is a condition of the fork or of the joins (question 1). The new sentences stay by question 1: a reader who plans the work on speed decides by them.

### C9, F-351

- Old title: "**The compiled transaction: what a read records, who validates, and which block an abort restarts.**"
- New title: "**A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.**"
- Old: "... and throws everything else on, an exception after the nested transaction's reads went to its parent."
- New: "... and throws everything else on, after a nested transaction has handed its reads to its parent."
- Old: "... so a nested one is taken first (rows 933, 934, 937, 888, 324, 949 and 950, fixed; a plain write of the outer block beside a nested block, row 984)."
- New: "... so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984)."
- Old: "... starts the block again for an abort of that transaction (or any abort at the outermost block) ..."
- New: "... starts the block again for an abort that names that transaction or names none (or any abort at the outermost block) ..."
- Meaning: one clause corrected in the fix round. The cold reader took a program's `abort()` in a nested block to pass to the outermost block. By `runtimeSystem/BaseTask.java:286-291` and `:308-311`, an abort that names no transaction is taken by the innermost block, which starts again. The rest is unchanged: the title states two of the body's facts, and the seven closed rows go to the history.
- Length: 1783 to 1768, 15 fewer. "The block's generated handler" is now "The block's handler", and the Source no longer repeats `leaveTransaction`.

## Sentences that the landing made false or stale

### C10, F-57

- Old: "The checker refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically, and walk refuses an integer numeral out of range when it runs, at the place it does not fit (F-342, F-341)."
- New: "The checker refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically; walk refuses both when the place that fixes the type runs (F-342, F-341)."
- Meaning: changed to what the tree does. Walk now also refuses a numeral that rounds to an infinity at a typed place. Ground: the review's section 1, rung N, "Walk".
- Length: 1500 to 1466, 34 fewer.

### C11, F-341

- Old: "... a numeral out of the type's range, at a type with no coercion from it, or outside its coercion's `where` clause is refused there when it runs ..."
- New: "... a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs ..."
- New sentence, before the tests: "At load walk refuses a numeral type written as a type that a trait or an object extends, or as a static argument; one in a `comprises` clause loads (row 981)."
- The Tests gain `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss` and `NumeralTypeStaticArgumentWalk.fss`. The Detail gains rung N's report, section 1.
- Meaning: two facts added, as C11 asks. Ground: rung N's report, "1. What changed and why", items 5 and 7. I checked that the six test files and `BuildEnvironments.checkNumeralTypesWritten` are in the tree.
- Length: 1656 to 2188, 532 more. The growth is the two facts, their six tests and their report. I found no detail to move out: each other sentence is a condition or a bounded observation. The new sentence stays by question 1. The tests stay as the entry's evidence.

### C12, F-283

- Old: "... one such `IntegerOverflow` stop in a run is not a regression."
- New: "... one such `IntegerOverflow` stop in a run is not a regression (row 986)."
- Meaning: unchanged. The sentence itself says what the row holds.
- Length: 979 to 989, 10 more: the pointer.

### C13 to C17, cited lines only

Meaning: unchanged in each. I read each new range in the tree and compared it with the old range at the base.

- C13, F-175: `Specification/appendices/changes.tex:3346-3542` to `:3345-3541`, and `:3612-3619` to `:3611-3618`. `:1616-1619` stays: it is above rung N's edit.
- C14, F-268: `CodeGen.java:6250-6255` to `:6318-6323`.
- C15, F-302: `compiler/codegen/CodeGen.java:5527-5534` to `:5595-5602`.
- C16, F-315: `CodeGen.java:3029-3031` to `:3087-3089`.
- C17, F-337: `runtimeSystem/InstantiatingClassloader.java:2897-2919` to `:2969-2991`. "Which the compiled main sets" still holds.

## POSITIONS

Each change is under the curator's rule of 2026-10-31. None is "cut only": each adds a word.

### C18, P-175

- Old: "... `red.join(loop'(lo, mid-1), loop'(mid, hi))`, and splits down to single elements (`Library/RangeInternals.fss:1308-1342`); the code generator evaluates a call's arguments in order (F-19, row 951), under the team's comment "Why isn't this parallel???" (`compiler/codegen/CodeGen.java:7068`), so every `SUM`, `DOT` and `BIG MAX` of microGPT would run its bodies one at a time once compiled programs run the one library."
- New: "... `red.join(loop'(lo, mid-1), loop'(mid, hi))`, and split down to single elements when the curator decided (`Library/RangeInternals.fss:1312-1350`); the code generator evaluated a call's arguments in order, under the team's comment "Why isn't this parallel???", so every `SUM`, `DOT` and `BIG MAX` of microGPT would have run its bodies one at a time once compiled programs ran the one library."
- Old: "... which the compiled path does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947; `reviews/parallelism-foundations-2026-11-08.md`, section 7.1)."
- New: "... which the compiled path did not do (`CodeGen.genParallelExprs` joined on the normal path only; `reviews/parallelism-foundations-2026-11-08.md`, section 7.1); F-350 gives what it does now."
- Meaning: the account of the tree is in the past. The decision is unchanged.
- The decision, before and after: on the compiled path a call's arguments run in parallel where `ParallelismAnalyzer` judges them worth a task, and the one library's parallel range stops its split at a grain size.
- Its reach, before and after: the compiled path's calls, and the one library's parallel range.
- Its requirement, before and after: a group of forked arms joins every arm before it completes abruptly, and the split stops at a chunk that runs efficiently in sequence.
- Length: 1704 to 1699, 5 fewer.

### C19, P-174

- Old: "Rows 960 and 974 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written as a static argument or as a type that an object or a trait extends."
- New: "Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause."
- Meaning: the list of departures follows the tree. The decision is unchanged.
- The decision, before and after: a numeral's type exists only at compile time, and every number type takes a numeral through a coercion generic over the four numbers.
- Its reach, before and after: every number type, the library's too, on both paths.
- Its requirement, before and after: no numeral value exists when a program runs, and a numeral type is written only as a coercion's or an operator's parameter type.
- Length: 2287 to 2243, 44 fewer.

### C20, P-176

- Old: "Rows 957 and 971 hold where the tree departs: a place whose type names a type parameter, and a coercion that spawns a task."
- New: "Row 957 holds where the tree departs: a place whose type names a type parameter."
- Meaning: the list of departures follows the tree. The decision is unchanged.
- The decision, before and after: a numeral at a place denotes one value, the same on both paths and made once.
- Its reach, before and after: every numeral's place, on both paths.
- Its requirement, before and after: the compiler folds the coercion, or fills a `static final` field when the class loads, and walk runs the coercion at the place's first evaluation.
- Length: 1140 to 1097, 43 fewer.

## The gap ledger

### C24, a new row in section 11

The row line is in `rows.add`, under `## 11. Parallelism, exceptions and control flow`.

- Claim: the parallelism analyzer counts a call as worth a task by where its function is declared, not by its work. Every call of a named function whose declaration starts above the call counts, a recursive call too. A call of one declared below does not. The fix round added "above the call" and the recursive call, which the cold reader could not settle; `forFnDeclDoFirst` adds the name before the body is visited.
- Number: `checks.sh` gave it 987 in round 1, and F-19 names it so. The number holds while the ledger's highest row at AT is 986.
- Status: `CONTESTED`. Class: `implementation gap (codegen)`. Reproducer: `none`.
- Ground: the parallelism review's section 1.7, and the skeptic of rung P, "Where I differ from the report, without a fix", "Which calls count". I read `ParallelismAnalyzer.java:125-130`, `:186-192` and `:204-226` in the tree: `forFnDeclDoFirst` adds the name, and `forFnDeclOnly` removes the declaration's node, so no name leaves the set.
- The claim has 291 characters, the notes 675, the row 1,145.

## The fix round

- C3, F-19, fidelity: fixed as `check.md` corrects it, in fewer words. The entry names rows 982 and 987 and keeps F-350 for the joins.
- C6, F-348, fidelity: fixed from `reviews/batch-30-review.md:82`. The sentence gives the sample, "five runs twice each", and says which range is the code before.
- Cold read, F-350: "an arm that was never forked is not run" now opens with "when an exception leaves".
- Cold read, F-351: the `abort()` clause and the "Open" sentence, as above.
- Cold read, P-175: "when he decided" is "when the curator decided". The decision, its reach and its requirement are unchanged.
- Cold read, the new row: the claim, as above.
- `mech-1.md`: no check failed. The four entries that `lengths.py` names grew by what their changes owe. F-348 and F-350 grew a little more in this round, by the two fixes above.

Passages that the cold reader could not resolve, and that I left, because no change of `owed.md` names them and their text is older than the batch:

- F-134: why a local makes `cast[\T\]` match; "a clause's pattern".
- F-347: two senses of "fold"; "runs once with it"; no pointer to P-174 for "the four numbers".
- F-349: the title's "read through other applicable declarations"; "runs the first"; "is apart from it".
- F-57 and P-174: three static parameters of `NaturalNumeral` beside "the four numbers".
- F-341: "a store keeps its default alone"; "reads a tie at the default"; "its own type's coercions".
- F-175: "It builds P-60"; "stands between two closed traits".
- F-302: "In those loops", which needs F-301; "inlines down to depth 12 ... against the 16"; "no longer removed".
- F-315: the `finally` clause that does not run is not marked as a defect.
- F-337: the title's "only through".
- F-351: "once the global lock has moved", "did not get the lock at its snapshot".

Terms that the cold reader did not find in the `fortress-repo` skill, for the skill writer: "rung", "root task", "springboard".

## Questions for the curator

None from this writer. The questions on P-175 and P-176 that the batch raised are the routing writer's items.

## Decisions not taken, for the coordinator

- The new row's status. I wrote `CONTESTED`, since no run on record shows the defect and its repair waits for the curator. The alternative is `NEGATIVE-BOUNDED`, as its sibling row 982 has, but the template asks there for a failure that reproduces.
- F-341 holds walk's load check, as C11 says it can. The alternative is a new entry for the load check, which keeps F-341 532 characters shorter.
- F-351 does not say that a nested block whose handed-over reads no longer hold starts again in place of throwing (`runtimeSystem/BaseTask.java:301-307`). C9 asks for wording only. The alternative is one more clause, from rung X's report.
- F-349 does not say what a cycle of coercions does. By the skeptic's probe, walk ends in 'Ambiguous coercion' and the compiled path runs the first declaration. The alternative is one clause with a pointer to the row on the accepted cycle.
- F-350's "an exception leaves no arm running" stands as the gather wrote it, beside the sentence on `VirtualMachineError`. The alternative is to name the exception there.

## What I could not follow

- I could not run `record.py`, `ledger.py` or `lengths.py`: this session refuses Python. So `record.apply` and `rows.add` are not checked by the tools. I checked by hand that each `from` heading resolves through `facts-extract.sh`, and I counted the row's cells with `wc`.
- The brief names `rows.rewrite` for a row. A new row has no number, and `checks.sh` adds new rows from `rows.add`, so I wrote that file.
- No detail went to the skill writer: nothing that I moved out belongs in a skill.
