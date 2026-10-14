# Climb batch 14, rung W (`rung-walk-coverage`): the skeptic's verdict

- Head judged: `b00f75310` (the worker's last commit). My commits: `386ca2db4` (the worker's REPORT.md and record.md, written from the run's journal), `9897bcd53`, `dcf284277`, `323a852af`, and this file.
- Verdict: **approved**. The change is right: the two library repairs follow the library's own lines, walk's check reads coverage as P-147 states it, and the text is in the S1 form. My three commits are corrections (a citation, and two departures that lacked their homes); none changes code, and none is contested.

## 1. What I checked

1. **The count and distance tables.** Read against the worker's files, on `fb6ce967e`'s code: `diff explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt` against the worker's post-edit count prints nothing (`#total 1`); `explorations/coordinator/tools/distance/compare.sh` against 13b's `distance.txt` prints `DISTANCE SAME   85`; the per-site list, sorted, equals `explorations/compile-ladder/gate/distance-sites.tsv` (86 lines each). REPORT.md section 7 holds. The tables are those of the worker's head; my commits change no code.
2. **Test first**, in the worker's transcript:
   - 01:46:39-01:46:56, the five tests written; 01:47:03, the harness on the base's code and library (`tree 5bf8a7c84`): `Tests run: 5,  Failures: 4,  Errors: 0`, with `Missing expected refusal at load` for `AbstractMethodPartlyDefinedWalk` and `AbstractMethodNotCoveredWalk`, and `has neither body nor def` at `QuickCheck.fss:82` for `AnyGenPerturbOtherType`.
   - 01:48:06, `SeededRandomGenAbstractMethods` alone on the base, after the worker's syntax slip: `** bug! MethodClosure seedSize() ... has neither body nor def`, `Tests run: 1,  Failures: 1`.
   - The first library edit is at 01:49:40 (`Random.fss`), the first Java edit at 01:53:03 and its first build at 01:53:23, so every failing run ended before them.
   - The last code change is the restore of the final `Constructor.java` at 02:12:13, built at 02:12:21 (`Caches ... started again, empty`). After it: the 31-file run at 02:13:23, `OK (22 tests)`, every keeper of the section among them (row 665's two expected failures, `XXXComprisesLibraryTraitUnlistedExtender`, the seven importers); `ant testSystem` at 02:14:32, `BUILD SUCCESSFUL`, shards 144 + 146 + 148 + 146 = 584, 0 failures (13b's gate had 580; the four new files); and `SeededRandomGenAbstractMethods` at 02:21:29, `OK (1 test)`, after its assertion on `MersenneTwister` was added and seen red on the old code at 02:20:54.
3. **The diff, line by line.** `definedBelow` gathers the bodies of the name and self position at or below the abstract parameter types, returns at a body at those types, and otherwise asks that every combination of parts lie in one body's domain; `coverParts` splits a position through its `comprises` clause only while some gathered body's type there does not hold the part. Splitting finer never loses a cover (a part of a part below a body's type is below it too), and a part is left whole only when every gathered type holds it or it has no clause, so the search is sound and, inside its bounds, complete for the clauses read at the level of values (P-60). The self parameter is not counted (`MethodClosure.adjustParameterList`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/MethodClosure.java:55-57`). `OverloadedFunction.java` changes three modifiers and nothing else.
4. **The library's way.** Row 668: the proxy's `seedSize` and `reseed` delegate to `gen` as its getters and `perturbed` do (`Library/Random.fss:175-178`, `:186-187`), `reseed` returns itself as `SeededRandomGen`'s comment asks (`:92-97`); `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]` as the two others do (`:241`, `:315`). Row 669: `AnyGen`'s `perturb` takes the body of `Gen`'s default (`Library/QuickCheck.fss:119`). The api lines match the bodies (`Library/Random.fsi:163`, `:165`, `:242`; `Library/QuickCheck.fsi:60`). I agree with the worker's deviation from the section's suggestion: `overlapPieces` and `intersectionPieces` part an intersection and return one part for a type and its subtype (`OverloadedFunction.java:1028-1035`), so neither splits a type into its listed types; `coverParts` is a new splitter of that one kind, not a copy, and the helpers it shares are shared by access.
5. **The tests.** Each is named by its topic and carries one comment line; each specification citation names `traits.tex`, section "Method Declarations", whose revised sentence says what the messages say.
6. **My own programs**, section 2.
7. **The three homes.** Rows 666, 668 and 669 are home 1 in the rung's tests. My programs measured two departures that had none; section 3 gives them theirs.
8. **The ledger and the sibling sites.** `ledger.py find` on "abstract method", "reseed", "perturb", "AnyGen", "definedBelow", "cover" and the checker's message finds no row for the two departures of section 3. Row 551 (walk trusts a library clause's closure unchecked) bears on the new check, which reads library clauses as closed; it needs no new note. In `Random.fss` every other object defines each abstract method it inherits; in `QuickCheck.fss` no other abstract declaration takes `Any`.
9. **The report.** Its provenance lines open to what they claim (`Specification/basic/traits.tex:579-581` at the base, `functions.tex:431-434`, `OverloadedFunction.java:880-940`, `Random.fss:186-187`, `:236`, `:241`, `QuickCheck.fss:119`, `Constructor.java:542-574`, `OverloadedFunction.java:1028-1035`, `:890`, `:894`), save one citation (section 3, correction 1). The sentences outside the specification it lists as made false (F-145, the skill's `interpreter.md` and `revival-changes.md`) are false as it says. The Effect's sentence "Since the amendment ... the interpreter checks the same at load" holds of the rule but not of its reach: walk and the checker part on two shapes (section 3), now named beside it.
10. **Competing declarations.** The five test components, `seedOf`, `coverParts` and my two tests' names occur once each in both test corpora and `ProjectFortress/src/com/sun/fortress/`.
11. **The failure-mode question**, section 4.

## 2. My programs, old against new

Walk on the new code is `bin/fortress P.fss` in the rung's tree; walk on the old code is `/home/user/fortress-base14/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-coverage/tmp/old-caches-sk P.fss`; the compiled path is the same tool's `compile P.fss` then `run P`. The rung changes no file the compiled path reads (two Java files under `interpreter/evaluator/values/` and walk's `Random` and `QuickCheck`), and the rung's tree holds no compiled library since its build emptied the caches, so the compiled column is the old code's and stands for both. All at `FORTRESS_THREADS=1` unless said.

| program | walk, new | walk, old | compiled |
|---|---|---|---|
| `D comprises { P, Q }`, `f(self, other: D)`; `P` defines `f` over `P` only | refused: `Object P does not define an abstract method declared in type D` | loads; `f(P,Q)` stops: `has neither body nor def` | refused: `Domain D is not a subtype of P` |
| nested: `D comprises { P, E }`, `E comprises { Q, R }`; bodies over `P, Q, R`, and over `P, E` | loads; `O 1 2 3`, `O2 4 5 5` | the same | compiles; `O  1   2   3`, `O2  4   5   5` |
| the same with a third object over `P, Q` only | refused, naming `O3` | loads; `h(O3, R)` stops | — |
| dotted `m(x: D)`, bodies over `P` and `Q` | loads; `O 1 2` | the same | compiles; `O  1   2` |
| dotted, body over `P` only | refused, naming `O1` | loads; `O1.m(Q)` stops | refused: `Domain D is not a subtype of P` |
| `B extends Box[\D\]` with `Box[\T\]`'s `f(self, x: T)`; bodies over `P` and `Q` / over `P` only | loads, `B2 1 2` / refused, `f(D)` | loads / loads, then stops | — |
| `f(self, x: Maybe[\ZZ32\])`; bodies over `Nothing[\ZZ32\]` and `Just[\ZZ32\]` / over `Just` only | loads, `O 0 1` / refused | loads / loads, then stops | — |
| object expression in a plain function, bodies over `P` and `Q` / over `P` only | refused at load, naming the second only | loads, then `f(o1, Q)` stops | `Can't compile ObjectExpr` |
| `tag(self, x: Number)` over `Number`'s five listed types, and over the listed types with `AnyIntegral` split | loads; `O 1 4`, `O2 6 11` | the same | — |
| the same split without `NN32` | refused | loads; `O3 6` | `QQ is undefined` (the compiler's prelude) |
| `g(self, x: D, y: D)` over `(P,P)`, `(P,Q)`, `(Q,D)` | `PASS` | `PASS` | **refused**: `Domain (D, D) is not a subtype of OR((P, Q),(Q, D),(P, P))` |
| `g(self, a: D, ..., e: D)`, `D` comprising six objects, one body over `P1` five times | **loads**; `g at P1 1`, then `g at P2` stops | the same | refused: `Domain (D, D, D, D, D) is not a subtype of (P1, P1, P1, P1, P1)` |
| `comprises { }` | `Comprises clauses should not be empty.` | the same | — |
| `Random`: the twister's and the proxies' `seedSize`, a `LinearCongruential` proxy reseeded, a twister reseeded | `twister seedSize 624`, `lc proxy seedSize 1`, `lc after proxy reseed 277363943098 fresh 277363943098`, `twister first 3753896092 after reseed by init 7 1509011485 fresh by init 7 1509011485`, `twister proxy seedSize 624`; the same at `FORTRESS_THREADS=4` | stops at the proxy's `seedSize` | — |
| `SeededRandomGenAbstractMethods`, run directly | `PASS` at 1 thread and at 4 | — | — |

The proxy's `reseed` writes its generator's state, so the `Random` rows ran at one thread and at four, with the same values.

**Every library component, loaded alone.** A program `import X.{...}` for each of the 46 apis of `Library/` that walk can load (all but the compiler's, `GeneratorLibrary`, `FortressLibrary` and `Executable`), under walk on the new code and on the old: 45 load on both; `PrefixMap` is refused on both, by the same overloading of `BIG CUP` across `PrefixSet.fss:425` and `PrefixMap.fss:419`, unrelated to the rung. So no library component, imported by a test or not, is newly refused or newly accepted.

## 3. Findings and corrections

1. **A citation** (`9897bcd53`). REPORT.md section 4 and record.md's revival change cited `TypeAnalyzer.scala:154-158` for the checker's reading of a `comprises` clause; those lines end the intersection and union cases. The reading, 59fdeff62's, is `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:159-164` (`case (s: TraitType, t@SUnionType(_, ts)) => ... comprisedTypes(s) match`). Settled by the code at those lines.

2. **Walk's unsettled search, a departure without its row or test** (`dcf284277`). Where its search does not settle, walk's check does not refuse (the worker's decision 2, `Constructor.java:501-503`, `:514`, `:517`). My five-parameter program shows the result: walk loads an object that the traits chapter calls a static error and the compiled checker refuses. The Effect of Appendix I's entry named the departure with no ledger row, where the skill asks each departure named in an Effect for its row (`references/specification.md`, "Changing the text: the revision form", part 1), and the specification settles the answer, so it takes home 2 (`references/tests-writing.md`, "How a defect is recorded"). The behaviour stays as the worker chose it; only its record is added:
   - `ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.fss` and `.test` (`load_exception_contains=does not define an abstract method declared in type H`).
   - On the base's code, `FORTRESS_HOME=/home/user/fortress-base14 /home/user/fortress-base14/explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-coverage/tmp/rung-walk-coverage/skeptic/h-old /home/user/fortress-coverage/ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.fss /home/user/fortress-coverage/ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.test`, at 04:07:55Z:

         # harness-one 2026-10-14T04:07:55Z; tree 5bf8a7c84; ...
          Saw expected failure: loaded and ran, not refused at load
         OK (1 test)

   - On the head, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-coverage/skeptic/h-new ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.fss ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.test`, at 04:08:16Z, `tree 386ca2db4`: ` Saw expected failure: loaded and ran, not refused at load`, `OK (1 test)`.
   - Changed for one run to four parameters (1,296 combinations, inside the bound), the same command at 04:08:40Z is red, then the file was restored:

         Object O does not define an abstract method declared in type H:
         ...: g(D,D,D,D):ZZ32
         ... Refused at load as its keys name, in an XXX test.
         FAILURES!!!

   - Row NEW-W-1 in record.md; the FACTS line names it; the Effect's sentence now says that walk then loads an object the compiled checker refuses, "(a row of the revival's gap ledger)", whose number the gather writes in.

3. **The compiled checker refuses a cover of two parameters through combinations** (`323a852af`). The section asks walk to accept "a two-parameter abstract declaration covered only by combinations of parts", and `AbstractMethodCoveredWalk` shows it does. The compiled checker refuses the same shape, which the revised traits chapter, the covering of `internal-types` and `functions.tex` (an argument type that "is a tuple type, at least one of whose entries has a `comprises` clause", section "Abstract Function Declarations") count as covered. It is the checker's, not this rung's to repair; my program measured it, so it takes home 2 and a row:
   - `ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairs.fss` and `.test` (`compile`, `compile_err_contains=has no concrete implementation in the object Joiner`); the program asserts the four values and prints `PASS`, for its promotion.
   - Through the harness on the old code, `/home/user/fortress-base14/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-coverage/tmp/old-caches-sk junit /home/user/fortress-coverage/ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairs.test`, at 04:08:49Z:

         Domain (Side, Side) is not a subtype of OR((Ping, Pong),(Pong, Side),(Ping, Ping))
             has no concrete implementation in the object Joiner in component XXXAbstractMethodCoveredPairs.
          Saw expected failure
         OK (1 test)

     The head's compiled path is the base's (section 2), so this run stands for both; running it on the head would need the library order, which a check does not build.
   - Row NEW-W-2 in record.md; the FACTS entry names it; the Effect gains a sentence naming the departure, "(a row of the revival's gap ledger)", for the gather to number. The Effect's sentence on the checker that the brief keeps stays as it was, true of one position.

No defect of the change itself was found, so no fix was built and no suite was run: my commits add two expected failures and prose. The interpreter suite gains one file (585) and the compiler track one `.test`; the gate runs both.

## 4. The failure-mode question

- `AnyGen`'s `perturb`, given a value of a type its generator does not take, now returns the random number generator as it is, where walk stopped with `has neither body nor def`. That is `Gen`'s own default body (`Library/QuickCheck.fss:119`), though `Gen`'s comment asks `perturb` for "a copy of the generator which is independent of `g`" (`:115-117`): the default the team wrote already returns `g` itself. The specification is silent on QuickCheck.
- The proxy's `seedSize` and `reseed`, and `MersenneTwisterInit`'s `perturbed` by a generator that is not indexed, turn a stop into the values the delegation and the body compute, asserted equal to the plain spellings.
- The check itself turns no loud failure quiet: where it accepts without settling, a call outside the bodies still stops (`g at P2` above).

## 5. Where I differ from the worker

- The Effect's "checks the same" is now beside the two departures where the checks part; the worker's text is kept.
- No `decision-record.md`: I accept the worker's reading. The batch record lists one among the files of rung S alone, and the review the entry cites (`explorations/reviews/walk-load-readings-check.md`, section 2) is the repository document that holds the reasoning (P-96).
- Decision 2 (not refusing where the search does not settle) is the worker's, reversible, and no decision on record covers it; I record its departure and leave it.

## 6. For the gather

- Number NEW-W-1 and NEW-W-2 (record.md, section "3. Traits, objects and components") and write each number in the Effect of `\seclabel{revival-covering}` (`Specification/appendices/changes.tex`), in place of "a row of the revival's gap ledger" in the sentence that names it: NEW-W-1's after "a type it cannot read; it then loads an object that the compiled type checker refuses", NEW-W-2's after "which the interpreter accepts". The gather's search for placeholders does not read `Specification/`.
