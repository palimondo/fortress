# Rung E, rung-seqv-meaning: the skeptic's check

Head judged: `4a4969363` (the worker's last commit). Head after: the commit of this file, after `623277683`.

The branch already carried REPORT.md and record.md (`9ae190053` and the two report commits after it), so no commit "The worker's report and record, from the run's journal" was made: the journal step wrote nothing because both files existed.

## What I checked

1. **Count and distance.** `diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt tmp/rung-seqv-meaning/checker-count-postedit.txt` prints nothing; the worker's `distance-postedit.txt` reads '#total	0' and every '#kind' line 0; `dist-post/errors.tsv` holds its header only. Both stages were started at 06:44:18 (call `CVJn8r`), after the code commit `bae1e7965` at 06:44:06 and its build at 06:41:46 (`rUGaYb`, `ant compileAll`); the later commits change only tests, the specification and the record. The tables are those of the worker's head. No checker or Scala change, so no count run of mine.
2. **Test first.** Walk on the base's code, 06:39:29 (`hA1zX3`), before the first code edit at 06:40:32 (`xkJDFF`) and the library edit at 06:40:42 (`fUahAG`): 'FAIL: CC64(1,2) = CC64(1,3) is false', 'FAIL: 45 SEQV 45.0: ', 'FAIL: a Boolean: true =/= a Boolean: false; a ZZ32 3 and a ZZ64 3 differ in type', 'Tests run: 4,  Failures: 3,  Errors: 0'. Compiled on the base, 06:39:50 (`sw9hZz`): '. run ProjectFortress/compiler_tests/StrictEquivalenceRuleCompiled (219ms) FAIL:  two ZZ32 3s', 'Tests run: 4,  Failures: 1,  Errors: 0'. Passing after the last code change: harness-one at 06:57:50 on `bae1e7965` with the final walk test (`TA5vKH`), 'OK (4 tests)'; junit.sh `after1` at 06:43:07 (`ZkaJjs`), 'OK (4 tests)'. The tuple-limit assertions were added after the code (`TA5vKH`), so their failure on the base was not in the worker's runs; I ran them alone through the base build's harness (below): they fail on the base and pass on the head.
3. **The diff**, line by line, against the section, `Specification/basic/objects.tex` "Object Equivalence" and P-166, P-168: each walk class compares within its class only (integers by value, floats by raw bits), `FString` answers false after `AnyPrim.sequiv`'s identity test, `FTypeObject` adds the value parameters once after the loop, `FOrdinaryObject` recurses through `AnyPrim.sequiv`; `getFieldNames()` has no other caller in the tree (`grep -rn "getFieldNames()"`), so the field list change reaches only `SEQV`. `CodeGen.java:4522-4529` adds the mark in a copy, `superInterfaces` unchanged. `equalityRule` keeps `equality` to its one method at `(Any, Any)`. The library's three `value` modifiers, the eight `sequivTest` lines, the two `TransposedMatrixAndFreeze` assertions (a revival test, `74b28e9d4`). No edit of the loader, the prelude, the checker or `runtimeSystem/`.
4. **Precedent.** `FChar.seqv` (`interpreter/evaluator/values/FChar.java:108-111`) and `FTupleLike.seqv` (`FTupleLike.java:78`) are the walk form followed; the other callers of `seqv` are only `AnyPrim.java:25` and `FTupleLike.java:78`. The union instantiation reads a class's interfaces (`runtimeSystem/InstantiatingClassloader.java:2035-2042`); the mark has no methods, so it adds no forwarding method.
5. **The tests.** Each exercises its defect; each carries one comment line naming `objects.tex`, section "Object Equivalence", which says what the comment says; named by topic. No assertion reads `ilkName` or a printed type name.
6. **My programs** (below).
7. **Homes.** Rows 113, 909, 906, 907, 910, 911: home 1 as the report says; row 908 narrowed; row 923 home 3 with today's answer asserted. My programs measured no new defect.
8. **Ledger and siblings.** `ledger.py find "value object" --open` and `find "SEQV" --open`: rows 112, 113, 114 (a duplicate of 113), 115, 807, 906 to 909; none other bears. Walk's sibling classes: `FChar` and `FBool` already follow the rule, `FRange` answers false, the immutable arrays identity; no other number class. On the compiled path the prelude's `===` family stays (P-38).
9. **The report.** Provenance lines opened: `CLIMB-BATCH-27.md:1333`, `:1345` (probes 16, 17), `objects.tex:433`, `:22`, `FChar.java:108`, `FTupleLike.java:78`, `NativeHelperBindingCompiled.fss:8`, `equalityRule.java:66` hold what they claim; `changes.tex:4563` was the base's line of "A comparison at a NaN", which is `:4644` on the head (corrected). The note lines `:66`, `:68`, `:266`, `:297`, `:336` were the base's; on the head they are `:75`, `:77`, `:275`, `:306`, `:345` (corrected). Sentences made false: `tests-writing.md:32`, `compiler.md:62`, `PLAN.md:50` and `objects.tex:15` open as quoted. The suites: `testSystem.txt` 'BUILD SUCCESSFUL', 194/194/186/184 with 0 failures; `testQuick.txt` 86, 263, 1434, 0 failures, 'BUILD SUCCESSFUL'; both on `bae1e7965`'s code; `spec.txt` two 'BUILD SUCCESSFUL'.
10. **Competing declarations.** `ValueObjectMark`, `equalityRule`, `StrictEquivalenceRuleWalk`, `ValueObjectCC64Walk`, `StrictEquivalenceRuleCompiled`: each declared once in `ProjectFortress/src/com/sun/fortress/`, `tests/`, `compiler_tests/` and the other test folders.
11. **Loud to quiet.** None: the walk change turns no error into a value, and `equalityRule` throws a `RuntimeException` where reflection cannot read a tuple or a field.

## My programs, old against new

All under `tmp/rung-seqv-meaning/skeptic/`. Walk: `bin/fortress SkW.fss` (new) and `old-fortress.sh /home/user/fortress-base27 tmp/old-caches SkW.fss` (old), at `FORTRESS_THREADS=1`; the new run at 4 printed the same (`diff new-walk1.txt new-walk4.txt`, nothing):

    new: 1 generic: false true false          old: 1 generic: false true true
    new: 3 strfield: false true eq false      old: 3 strfield: true true eq true
    new: 4 nested: true false                 old: 4 nested: true true
    new: 5 tuplefield: true false             old: 5 tuplefield: true true
    new: 6 floatfield: false true true        old: 6 floatfield: true true true
    new: 8 nn: true false                     old: 8 nn: true true
    new: 12 empty: false lits false           old: 12 empty: true lits true
    new: 13 tuples: true false false true     old: 13 tuples: true false true true

Line 1: `value object Vgen[\T\](x: ZZ32)`, `[\ZZ32\](1)` against `[\ZZ64\](1)`, `[\ZZ32\](1)` and `[\ZZ32\](2)`; 3: a value object over two strings built apart, the same string, and their `=`; 4: a value object over `VPlain(1,2)` against an equal one and `VPlain(1,3)`; 5: over the tuple `(1,2)` against `(1,2)` and `(1,3)`; 6: over `0.0`/`-0.0`, a NaN, an `RR64`; 8: two `NN64` 3s, an `NN32` against an `NN64`; 12: two `""` and two `"cat"` literals, flat strings, so reference objects (P-168); 13: nested tuples, arity, pairs of strings built apart, pairs of a value object. Unchanged lines: a value object with a body field `true false`, the singleton `true` and two value types of the same fields `false`, `RR32` and `ZZ64` pairs `true true`, `ZZ64` against `RR32` `false`, `QQ` `false true`, booleans and characters `true false true`, and `=` on a value object, a 4-tuple of numbers and `Just` over strings built apart `true true true`. Every new answer is the rule's.

Compiled: `bin/fortress compile SkC.fss && bin/fortress run SkC` (new), the same through `old-fortress.sh` (old); at `FORTRESS_THREADS=4` the new run printed the same:

    new: 1 generic:  false   true   false     old: 1 generic:  false   false   false
    new: 3 strfield:  false   true            old: 3 strfield:  false   false
    new: 4 nested:  true   false              old: 4 nested:  false   false
    new: 6 floatfield:  false   true          old: 6 floatfield:  false   false
    new: 9 scalars:  true   true   true       old: 9 scalars:  false   true   false
    new: 13a nested tuples:  true             old: 13a nested tuples:  false
    new: 13d value tuples:  true              old: 13d value tuples:  false
    new: 15 fns:  false   true                old: 15 fns:  false   true

and on both `7 singleton:  true  kinds  false`, `13b arity:  false`, `13c string tuples:  false`, `13e static types differ:  false`. Line 9: two `ZZ64`, two `Boolean`, two `Character`. Line 13e, a `(ZZ32, ZZ32)` against a `(ZZ32, Any)` both written `(1, 2)`, is `false` because the second tuple's `2` stays an `IntLiteral` (F-57); `SkC2.fss`, the same with a `ZZ32` variable as the element, prints '13e static types differ:  true   (ZZ32,ZZ32)   (ZZ32,Any)': the helper compares tuples by their elements, not by their static classes.

The tuple limit alone, `TupleLimitOnly.fss` (the walk test's three tuple assertions), through the harness: on the base build (`FORTRESS_HOME=/home/user/fortress-base27 .../harness-one.sh`, tree `551b02858`, whose code is the base's: `git diff --stat 551b02858 ed8652dc0` touches only `explorations/`, `.claude/` and `.github/`) 'FAIL: a Boolean: true =/= a Boolean: false; a tuple of four has no = of its own and compares by SEQV', 'Tests run: 1,  Failures: 1'; on the head 'OK (1 test)'.

## Findings and corrections

No defect of the change. Corrections, in `623277683`:

- `Specification/appendices/changes.tex`, the entry's effect: "an integer numeral is a ZZ32 value in the interpreter, by its magnitude" is false for a numeral outside `ZZ32`, which walk types `ZZ64` or `ZZ` (F-57); now "a ZZ32, ZZ64 or ZZ value". "answers SEQV on numbers, strings and booleans by =" claimed more than holds: the prelude's family covers `ZZ32`, `ZZ64`, `RR32` and `RR64` (`Library/CompilerLibrary.fss:63-69`), so an `NN32` or `NN64` reaches the helper; now named so. The same in record.md's finding 2 and FACTS entry. My edit uses only macros the file already uses (`\EXP{\mathbb{R}32}` 20 times); I did not build the specification again (the disk held under 400 MB, and a build's log can reach 400 MB); the gather's one build covers it.
- REPORT.md: `changes.tex:4563` to `:4644`; the chapter's other notes at the head's lines; `objects.tex:39-64` to `:39-63`; the entry's span `3935-4015` to `3935-4017` (also record.md); the numeral wording as in the entry.

## Where I differ from the worker

Nowhere on the code. The worker's reading that the walk `FloatLiteral` case is a consequence of P-168 rather than a gap stands: fork E1 (`CLIMB-BATCH-27.md:572`) reads the library's `object FloatLiteral extends RR64` as a distinct type, so no ledger row is owed for it.

## Verdict

Approved: the change is right, with corrections only, none contested.
