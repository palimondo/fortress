# Skeptic's verdict on rung T (rung-literals-spec)

Head judged: `38decb5c5d` (the worker's report and record were on the branch, so the journal step wrote nothing). Head after my fixes: `1184add1d9`, then this file. Verdict: **contested**, one fix of four.

## What I checked

1. **The stages.** The report declares neither (`STAGE_BLIND`). `git diff --name-only b430f9f428...38decb5c5d` lists the nine files under `Specification/` and two under `explorations/`, no other path; my fixes add `ProjectFortress/tests/XXXNotEqualNumeral.fss`, inside the brief's list of paths. No stage was run, by the worker or by me; the gate's tables on the merged tree are the record.
2. **Test first.** A prose rung: no failure to see. The build the report quotes ran on the final text: the worker's last edit of the text is the call ending `87kY4D` (03:51:15 UTC), its build `Z68LFx` started at 03:51:25, its wait `uhxdGL` printed at 03:52:48 `209:BUILD SUCCESSFUL`, `20701:BUILD SUCCESSFUL`, `20703:EXIT=0`, the warning grep (`JWh97S`) printed `0`, and the commit `xparto` (03:53:28) came after with no edit between.
3. **The diff against the decisions.** Read line by line against P-173, P-174, P-172, P-171, P-165, P-40, P-96, forks T1 to T3 and the rungs' forks (`CLIMB-BATCH-29.md:332-401`). Four findings below. Every Original text the entries quote I opened in `Specification-1.0-frozen/`: `basic/expressions/literals.tex:83-148` (the numeral types, lines 83-86, 104-108, 110-115, 117-125, 127-129; "Numerals are not directly converted", 132-141; kept, 141-148), `advanced-lib/binary.tex:1620-1621`, `:1659-1662` (the source comments) typeset at `:1681-1682`, `:1720-1723`, and the groups `:905-914`, `:1117-1135`, `:1750`, `:1860-1868`, `:2016`, `:2078-2082`, `:2114`, `:2271-2281`; all as quoted. The eight binary callouts sit after those ten groups, two pairs combined.
4. **Precedent.** The entries follow `revival-int-conversions`' form; the fourteen coercions between number types of `revival-asfloat`'s Effect count right on the base's apis (`grep -n coerce Library/FortressLibrary.fsi ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`: `RR64` 2, `QQ` 5, `NN64` 1, `ZZ64` 2, `ZZ` 4, beside seven from `IntLiteral`).
5. **The test.** None in the rung; mine below.
6. **Programs.** Mine, under `tmp/rung-literals-spec/skeptic/`, on the old code (`old-fortress.sh /home/user/fortress-base29 .../tmp/old-caches`). The head's code is the base's: the rung changes no code, and the base build stands at `8cde0b2c4f`, whose difference from `b430f9f428` is under `explorations/` only (`git diff --name-only 8cde0b2c4f b430f9f428 | grep -v '^explorations/'` prints nothing). So old against new is one column. A run of rung N's code (`old-fortress.sh /home/user/fortress-numeral-types ...`) was refused, 'old-fortress: /home/user/fortress-numeral-types is not a built tree'; what N's tree answers below is by reading N's library.
7. **Homes.** The worker's one defect, `=/=` at a numeral, is home 2, not 3 (finding 1).
8. **The ledger.** `facts-extract.sh 'ledger-find:=/='` gives row 807, the sibling of row 966: the library's `=/=` misses the `=` a value's own type declares. Row 945's claim says compiled `"ab" SEQV "ab"` is `false`; a program compiled against the prelude answers `true` (finding 2); the row is S's to close.
9. **The report.** Its provenance lines open as cited (`literals.tex:132-165` at the base is the paragraph and the box; `changes.tex:4890-4961` at the base is `revival-int-conversions`; `changes.tex:5111-5114` names the report; `inference.tex:302` the kept title; each of the nine files is present at `a874948ac`). Its list of sentences made false outside the named files holds; one more is likely: `Specification/fortress/preamble.tex:99`, "static expressions" among the features not yet supported, which the fold of numerals builds in part (left for the gather).
10. **Names.** `revival-numerals` and `revival-string-literals` are each labelled once (`changes.tex:4984`, `:5341`); no file in any rung's tree names `XXXNotEqualNumeral`; no other rung edits `Specification/`.
11. **Failure mode.** No code changes, so none.

## The programs, and the lines my findings rest on

    old-fortress.sh ... NeSk.fss                                  (walk)
    NN32 u = 0: false
    NN32 u =/= 0: true
    QQ q = 0.5: false
    QQ q =/= 0.5: true

    old-fortress.sh ... compile NeSkC.fss && ... run NeSkC        (compiled; u: NN32 = 0)
    NN32 u = 0: true
    NN32 u =/= 0: false

    old-fortress.sh ... StrSk.fss                                 (walk)
    lit SEQV lit: false
    cat SEQV lit: false
    str||char SEQV lit: false

    old-fortress.sh ... compile StrSkC.fss && ... run StrSkC      (compiled)
    lit SEQV lit: true
    cat SEQV lit: true

    old-fortress.sh ... compile SeqvNumC.fss && ... run SeqvNumC  (compiled; x = 3, z: ZZ32 = 3, y: RR64 = 0.5, a: RR64 = 0.25)
    x SEQV z: false
    y SEQV a+a: true
    old-fortress.sh ... SeqvNumC.fss                              (walk)
    x SEQV z: true
    y SEQV a+a: false

The last pair bears out the Effect's "where the compiled path answered false" (`x SEQV z`) and rows 943 and 944's walk half. No program writes a mutable variable shared between tasks, so none ran at one and four threads apart.

## Findings and fixes

1. **Contested (`1184add1d9`). The Effects stated a departure as the design's answer.** `revival-numerals` (`changes.tex:5143-5150` at `fcf9b18219`) and `revival-numeral-type` (`:3796-3802`) said that the top-level `≠` gives `u ≠ 0` `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q ≠ 0.5` `true` for `q: QQ = 1/2`, though the pairs make `u = 0` and `q = 0.5` `true`. The specification settles it the other way: "The expression \EXP{e \neq e'} is semantically equivalent to the expression \EXP{\neg(e = e')}" (`Specification/basic/operators/opr-overview.tex:272-273`), and "The infix operator \EXP{\neq} applies \EXP{\neg} to the result of \EXP{=} on the same operands" (`Specification/basic-lib/Fortress.NegatedOperators.tex:46-47`, `operator-NE`, which `numbers.tex:404` names for `≠` on the number types). The compiled path at the base answers `u =/= 0` `false` (above), through the prelude's `opr =/=(self, other: NN32)` and the like on each integer type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:230`, `:300`, `:360`). So the library's `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) departs; rung N adds no `=/=` (its `Library/FortressLibrary.fss` has only `:98` and `QQ`'s own `:590`). The ways: (a) keep the text, the worker's; (b) name the departure in both Effects with its row and a home-2 `XXX` test; (c) repair the library, which is N's declaration space and outside this rung. I took (b): both Effects now name it (`changes.tex:3802-3803`, `:5144-5156`), the second also saying that the prelude answers `false`; `ProjectFortress/tests/XXXNotEqualNumeral.fss` asserts the specification's answer; row 966 in `record.md` is rewritten as `NEGATIVE-VERIFIED`, `implementation gap (library)`, with the test as its reproducer and 807 as its sibling, and the record's finding 3 and its FACTS line say the same (they had the compiled path "at Any" reaching "the = pair"; it reaches the prelude's per-type `=/=`). The test through the harness on the old code:

       FORTRESS_HOME=/home/user/fortress-base29 .../rung-inference-walk/harness-one.sh .../tmp/old-harness .../ProjectFortress/tests/XXXNotEqualNumeral.fss
       FAIL: opr-overview.tex, the sentence on e =/= e' that closes subsection "GCD, LCM, and CHOOSE Operators": e =/= e' is NOT (e = e'), and numbers.tex, section "Rational Numbers": a zero NN32 = 0
        OK Saw expected exception
       OK (1 test)

   on the head (`explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/h-head ProjectFortress/tests/XXXNotEqualNumeral.fss`): ' OK Saw expected exception', 'OK (1 test)'; and changed for one run to assert the departure (`assert(u =/= 0, ...)` and the like, a copy under `tmp/`), red: 'PASS', ' Missing expected failure ', 'Tests run: 1,  Failures: 1,  Errors: 0'. It fails on the merged tree too, where `u = 0` is `true` by N's pairs and `u =/= 0` stays `true`.
   - *The worker's argument* (REPORT.md, "Decisions", 8): the inequality written into the two Effects as the design's answer, since P-173 converts a numeral at `Any` into its default and the library's `=/=` has no pairs; "Not taken: ... stating it as a departure with a row. Evidence: `specification.md`, 'so that no disagreement between the text and an implementation stays hidden'; the probes; P-173's places"; and the question to the curator, ways (a) to (c).
   - *Mine*: the disagreement the worker exposes is one between the library and the specification's own `≠`, which no decision changes; P-173 says where a numeral converts, not that `≠` stops being `¬(=)`. `specification.md`, "Changing the text": "The effect names each departure ... with its ledger row." The prelude, the team's later word, declares `=/=` per type and answers `false`. It is contested by the brief's rule (a): the worker argued for the text I changed.

2. **Settled (`8a2b7ae816`). `revival-string-literals`' Effect said both paths answered `"ab" SEQV "ab"` `false`.** The compiled program answers `true` at the base, by text (above; row 908), and only the helper the one library binds answered `false` (row 945's probe). The sentence now says so (`changes.tex:5386-5388`), beside the Effect's own sentence on row 908. Settled by `specification.md`, "Then the text claims no more than holds", and the run above. No test: prose; the build below.

3. **Settled (`11e753f17c`). "two places yield two objects"** (`literals.tex:221-222` at `fcf9b18219`). P-174 gives "one object per site", the coercion called once for each site; two sites' results are two objects only if the coercion makes new ones, and two string literals of one text, the sentence's own comparison, are one object (P-171). Now "each place has its own application of the coercion" (`literals.tex:222`). Settled by P-174's sentence and fork F5 ("each evaluation of the site reads the result, one object per site", `CLIMB-BATCH-29.md:379`).

4. **Settled (`4fe2cb1ab3`). The signed constant's kind by value.** `constant.tex:81-91` at `fcf9b18219` listed "an integer" first, so `0.5 + 0.5` read both as an integer (default `ZZ32`) and as "a constant computed from a numeral with a radix point" (default `RR64`), and `6/3` as an integer. P-173: the constant "defaults as an integer numeral, as a `QQ` for a quotient, or as an `RR64` with a radix point"; fork F1 writes "a result of operands among which one has a radix point" as a radix-point numeral (`CLIMB-BATCH-29.md:375`); rung F's fold joins its `Kind` over the operands (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:56`, `:158`, `:163-167`, `:200-206` on `wip/rung-literal-fold`). The text now gives the kind by the operands, with `6/3` a `QQ` and `0.5 + 0.5` an `RR64` (`constant.tex:81-97`). Settled by P-173's sentence.

The specification's build after my last edit, `( cd Specification/fortress && ./ant genSource && ./ant tex )` under `nohup nice -n 19`:

    209:BUILD SUCCESSFUL
    20734:BUILD SUCCESSFUL
    20736:EXIT=0

The skill's warning grep on `fortress.log` printed `0`, `grep -c '^! [A-Z]'` `0`, "Output written on fortress.pdf (715 pages, 2474886 bytes)"; the departure prints as "departs from Section 34.1.4, by which ̸= applies ¬ to the result of = on the same operands". The build's files were removed with `git clean -fXq -- Specification`. No suite: my fix adds a walk test and edits no Java or Scala.

## Where I differ from the worker's account, unchanged in REPORT.md

- Decision 8 and question 1: above.
- Question 2 says "The revised text names only the decided places". It does not: "Where nothing fixes a type" (`literals.tex:191`) is the complement of the places that fix one, and `conversions-coercions.tex:105-108` says the default "applies where coercion does not: where the declared type is a supertype of the default", so `f(3)` at `Index` takes `ZZ32`. That is way (a), and it is on record: the judgement's repair 1, "every other type, and no type, takes the default" (`explorations/reviews/literal-design-judgement-2026-11-08.md:9`), which P-173's headline keeps ("where nothing fixes one, into the machine default"), and rung C built it (`defaultFits`, `explorations/compile-ladder/rung-numeral-checker/REPORT.md:21`, `:130` on its branch). I left the text, which agrees with the record; `revival-index` (`changes.tex:4436-4439` now) is the worker's listed sentence for the gather.
- The box at `literals.tex:139` and the Change of `revival-numerals` say the explicit-radix types "fold into the radix, and \TYP{Literal} into the digit count"; P-174 and the judgement say all three "fold into the radix field". The worker's wording is the clearer account of where `Literal`'s fact (no leading zeros) goes, so I left it; it is a sentence the decision does not state in its words, listed as a point.
- The defect's home: 2, not 3; and the compiled path at the base answers `u =/= 0` `false`, so "on both paths by P-173" holds only after the switch-over.

## The record's line numbers

REPORT.md and `record.md` cite `fcf9b18219`'s lines. My commits move them: in `changes.tex`, by +1 after `:3802` (`revival-index` is `:4436-4439`, the natives effect `:4694-4695`), by +6 after `:5150`, by +8 after `:5380`, so `revival-numerals` is `:4984-5339` and `revival-string-literals` `:5341-5419`; in `constant.tex`, by +5 after `:91` (its boxes `:106`, `:126`, `:133`). Without the contested commit the moves after `:3802` and `:5150` fall away. I left the citations for the gather to set on the landed tree.

## Points to report

- Each passage revised, with its callout and entry: the worker's list, and my revisions of `constant.tex:81-97`, `literals.tex:222`, `changes.tex:3802-3803`, `:5144-5156`, `:5386-5388`.
- A file edited beyond those named: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (mine).
- Sentences the rungs' sections do not state: the departure of `≠` (resting on `opr-overview.tex:272-273` and my compiled run); `6/3` a `QQ` and `0.5 + 0.5` an `RR64` (P-173 and F's code; no rung's test asserts them); the `Literal` wording above.
- The build: above.
