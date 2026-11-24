<!-- The check of climb batch 36's record, `CLIMB-BATCH-36.md`, with its probe notes `compile-ladder/plan-36/probes/fixes-36.md`, before the launch and after the curator's go of 00:2x UTC on 2026-11-24, by a fresh reader on Fable: run 1's citations at their sources on `main`'s code (`4b0e3abd6a`), run 1's reproducers run again on a worktree seeded from the base build `/home/user/fortress-wsuite`, each repair against the team's sources, each rung against the decisions on record, the forks, the merge, the measures and the estimate, and the section for the curator; of run 2, the repairs, the decisions, the forks and the estimate. One fork judged consequential, K1, which the record names and whose default reverses no decision; six corrections of the record in place. -->
<!-- History. Written 2026-11-24, 01:15 to 01:3x UTC. The machine restarted at 01:16 UTC during the work; the worktree and the record were whole, and each reproducer below ran once to its end. The reviewer's worktree, `/home/user/fortress-chk36`, was seeded with `seed-worktree.sh /home/user/fortress-wsuite /home/user/fortress-chk36 -` and removed after. -->

# The check of climb batch 36's record before its launch

## For the curator

**What I checked.** I read the batch record as a new reader. I ran the failing program of each rung of run 1 on today's code. I read each rule of the specification and each decision of yours that the record names, with its history. I read each fork.

**What I found.**

- Every program of run 1 fails today as the record says. So each rung has a test that fails first.
- The record's quotes of your decisions on `Byte(v)` and `x.asRR64` match your words of 23 November.
- One fork is bigger than the record said: fork K1, in rung K. It answers your question of last night, how `Ratio`'s declaration and `QQ`'s can be "equally good".
  - The record said that the checker was wrong and the specification right. That was not the whole truth. The team added a sentence to the specification in 2012. It says: in a trait with a `comprises` clause, `self` has the type of the trait met with the listed types. For `QQ` that type is exactly `Ratio`. The checker follows that sentence, also in the heading of `QQ`'s own declaration. So it sees two declarations on `Ratio`.
  - The team's sentence does not say whether it holds in a declaration's heading or only in its body. Fork K1 reads it for the body only. In the heading, `self` has the type of the trait that the declaration is written in. Then `Ratio`'s declaration is more specific than `QQ`'s, and the rules decide.
  - The other way keeps the team's sentence whole. The two declarations then have the same parameter types, and a second rule decides: the declaration in the type below hides the trait's. Nobody measured this way.
  - Your P-146 reads the self-typed traits as fork K1 does. It does not speak of a trait with a `comprises` clause. The record gave P-146 a reason, from a paper's proofs, that left P-146 on 31 October as not yours.
  - Fork K1 does not reverse a decision of yours. It follows your words of last night. It can be undone. So by your go it does not stop the launch. It is the first point of your review list for this batch.
- One program that compiles today is refused after rung K: `c = 0` for a number `c` of type `RR32`, under the prelude only. Today it compiles and then overflows the stack when it runs. No rule of the team refuses it. The refusal follows from fork K1.
- No rung changes a line of microGPT. No rung's section asks for a comparison of printed output.

**What I changed in the record.** Six things, all words, no design:

1. Your section and section 3 now say what the team's sentence of 2012 says, and that fork K1 narrows it.
2. The quote of P-146 is now P-146's text as it stands.
3. Fork K1 now names the other way.
4. Fork K8 now says that no rule of the team refuses the `RR32` program.
5. Rung K's first test prints a number that changes from run to run. The record gave 5 and 6. My run gave 2. The record now says so.
6. Rung G now writes a test for a numeral type as a variable's type and as a field's type. The record had a test only for a return type.

## 1. Changes of the record that I made

Each is in `CLIMB-BATCH-36.md` as committed with this review.

1. **Section 2, rung K's two bullets on "equally good"; section 3, "Which declaration is more specific"; section 4, K's mission.** The record cited `Specification/basic/expressions/var-ref.tex:53-54`, "The type of `self` is the type of the trait or object being declared", as "the declared type of `self` is the trait", and told the curator "The specification says: compare the types that each declaration was written with." The next sentence of the same paragraph (`var-ref.tex:63-69`, David Chase's commit `5a68404fdf` of 2012-07-19, under the comment "The new self-type idiom") says that for a trait with a `comprises` clause "the type of `self` is instead `T ∩ (U1 ∪ ... ∪ Un)`", and names no place. The checker's reading of the signature follows that sentence. Reason: a sentence that contradicts its source. The manifest needs no change for this.
2. **Section 3, "The signature at the plain trait type"; section 2, "Your review list"; section 4, K's mission; section 1, K's briefing line for P-146.** The record quoted P-146 with "because the proofs of the POPL 2019 paper ... assume that no declared type holds a type parameter inside an intersection" and said that P-146 keeps the plain signature "for a reason that holds for every trait", and to the curator "Your P-146 says so ..., for a reason that holds for these too". P-146 as it stands holds no such clause: its history block of 2026-10-31 08:38Z took it out, since "it came from the coordinator's ask, not from him" and bears on the dispatcher, not on the static test. Reason: a premise stated as the curator's that his entry does not hold. Section 1's briefing reason for P-146 read "the signatures keep the plain trait type, and why"; it now reads "..., in a self-typed trait". **The manifest's generator takes that reason from section 1, so `lists36.py` must carry the new words.**
3. **Section 3, fork K1.** It now says that it revises the team's sentence, and names the way not taken that keeps the sentence whole: the meet in the signature too, and the tie of two declarations at one domain decided for the declaration in the type below (`Specification/basic/traits.tex:584-590`: a trait does not inherit a declaration "whose parameter type (not including the type of the self parameter) is equal to the parameter type of a method declaration that occurs in the trait declaration"). Reason: a fork is given with its other way.
4. **Section 3, fork K8, and the review list's line on row 528.** They now say that the program compiles today and is refused after, by no rule of the team. Reason: check 3 of the brief, a refusal needs its rule shown or its lack said.
5. **Section 4, K, the first test's "Seen failing".** The count before `=/= 12` varies: the planner saw 5 and 6, my run 2. Reason: the worker states this failure and the skeptic checks it, so it must not pin the number.
6. **Section 4, G, "The tests first" and the reserved points.** Row 1124's one test, `tests/XXXNumeralTypeReturnTypeWalk`, covers the return type only, and the rung repairs three forms: the section now asks for a test of the variable's and of the field's form first. It names `tests/NumeralTypeNoValueWalk.test`, which pins 'Type mismatch binding 3' for a variable of a numeral type and which fork G3 may turn, and adds "A pinned message changed" to the reserved points. It gives the third test's failure as the harness reports it for a plain copy: 'Missing expected refusal at load'. Reason: a test before each fix, and the failure as the harness reports it. The manifest needs no change for this.
7. **Section 2, "Cost and time", the disk.** One sentence added with the review's reading, 10.95 GiB free.

## 2. Points for the coordinator to decide before the launch

1. **Fork K1 is consequential by the rule, in my reading; it does not hold the launch by the go's terms.** By `.claude/skills/coordinator/SKILL.md`, "The curator's role and decisions": it takes P-146's sentence on signatures past its words (P-146 defines the self-typed trait and speaks of it only), and it chooses between two ways where the principles do not point one way: the team's later word, the sentence of 2012, gives `self` the meet and names no place; the library as the team wrote it uses the idiom in the prelude's `Equality[\T\] comprises T`, where the 1,416 ties are. The default reverses no decision, follows his words of the evening ("how is it that you are saying that ratios implementation and QQs is the same, like equally good?", "there must be ... a rule ... and it must be stable"), agrees with rows 1112 and 1127 as landed, and can be undone. So it goes to him the second way, landed and then asked: a review-queue item with rung K as its work, and one line at the landing. The options, in the terms of their source:
   - **1, the default.** In a declaration's signature the `self` parameter has the type of the trait, `T`, also where `T` has a `comprises` clause; the bodies and the overloading check's exclusion test keep `T ∩ (U1 ∪ ... ∪ Un)`. `var-ref.tex:63-69` is revised, the team's sentence kept as the original text. Measured by the planner's hack: the distance 0, 5 of 1,770 compiled tests change, rows 1112, 1127 and 770 close, row 528's `c = 0` becomes a static error under the prelude.
   - **2.** The team's sentence whole: the meet in the signature too. The trait's declaration and a listed type's then have one domain, and the declaration in the type below hides the trait's (`traits.tex:584-590`), with the Return Type Rule read one way, the lower's return type below the upper's. No sentence of the team is revised, and row 528's program still compiles. Not probed: the distance, the tests that change and the prelude's `Equality` ties under it are unknown.
2. **Fork G3 against the words of row 1124 and of review-queue item 503.** Both say "P-12 leaves the other forms to the checker once walk runs it". The record calls that a routing. I agree that it is no decision: P-174's own text names row 1124 as "where the tree departs", P-180 fixes departures, and rows 974 and 981 were closed in the same load check, the second on his go of 08:4x UTC on 2026-11-23. Not consequential. The record-landing should bring row 1124's and item 503's words in line.
3. **`lists36.py`** must take section 1's new reason for P-146 (change 2 above).
4. **The disk margin is 0.95 GiB.** `df -P /home/user` gave 11,481,284 blocks available after my tree was removed, against the floor of 10,485,760 for four rungs. Another worker's gate was running in `/home/user/fortress-p103`. Read `df` again at the launch.
5. **Rung C's two new run tests are not known to pass after the fixes.** `Arr` and `Dot` die today at 'Duplicate method name "-?0"' in `Vector`'s class, as the record says; what they meet after rows 1091 and 994 are repaired, nobody ran (the record's "Not run"). Fork C3 covers it: a test that still fails stays an expected failure and names its row. A new wall there needs a row, `NEW-C-<n>`.

## 3. Points that would change a decision of the curator's

None. No fork's default reverses a decision on record, and no rung changes a line of microGPT (P-87, P-9).

## 4. The evidence, check by check

### Check 1, citations (run 1)

Read at their sources on `4b0e3abd6a`, and right: `compiler/index/FunctionalMethod.java:153-166` (`parameters()`, `if (!_selfFromBound) return ps;`); `Functionals.scala:943-956` (`groundFamily`, `tieType`), `:1104-1140` (`traitOfSelf`, `takesSelfAtTrait`, `head`, `sorted.headOption`); `OverloadingChecker.scala:567-575` (`selfTyped`: the exclusion test takes the declaration's own parameters where `parameters()` differs from them); `CoercionOracle.scala:85` (`moreSpecificDeclared`); `OverloadSet.java:962`, `:1421`, `:1784`, `:1788`; `CodeGen.java:1230` (`bridged`); `OverloadedFunction.java:1305` (`if (rOut != p) return false`), `:911` (`belowAtObjectArguments`); `BuildEnvironments.java:1211` (`checkNumeralTypesWritten`); `Constructor.java:847-881` (`genericKey`, `putIfAbsent`); `Numerals.java:514` (`FBigNum.make`); `KindEnv.scala:72`; `Library/FortressLibrary.fss:386-389`, `:635`, `:847`, `:954`, `:1065`, `:1374`; `CompilerBuiltin.fss:578`, `:663`; `overloading.tex:309-311`, `:353-372`; `traits.tex:584-590`; `changes.tex:3745-3753`. Rows 1100, 935, 1112, 1127, 543, 770, 528, 1124, 1125 and 1122 say what the record says. Wrong: the two of section 1 above, changes 1 and 2.

Not checked for want of time: the line numbers of `changes.tex` and `inference.tex` in the sections "Specification" of G, N and C, and section 6's list of skill passages.

### Check 2, reproducers (run 1)

Each ran once. Walk through `harness-one.sh` on plain copies; compiled through `junit.sh` with `ONE_JVM=1`; the one library through `old-fortress.sh /home/user/fortress-wsuite <tree>/tmp/old-one junit` with `FORTRESS_LIBRARY=one` and a private copy of the base build's `caches-one`.

- **K.** `P36GenericTiesDeclaredCompiled`: compiles, the run fails, 'FAIL:  2 =/= 12; each direct call on a Box runs the declaration on Box, the more specific by its declared parameter types'. `P36ComprisesSelfListedTypeCompiled`: 'Function body has type Q, but declared return type is R.' Row 1127's program as a plain run test: 'the return type of (Q & {R})->Q ... should be a subtype of the return type of R->R'. Row 543's program as a plain compile test: 'Right-hand side has type RightResult, but declared type is LeftResult.' at the binding of `left`. All as the record says, but for the count (change 5).
- **G.** Row 1125: 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific'. Row 1122: 'Overloading of ident[\T extends Round\](x:T):(T, FortressLibrary.ZZ32) ... fails the Return Type Rule'. Row 1124, plain copy with its `.test`: 'REACHED: a numeral type is a return type', 'Missing expected refusal at load'.
- **N.** Walk: 'Unification error: Closure/Constructor for Byte param 1 ($b:ZZ32) got arg 200:ZZ of type ZZ'. Compiled: 'ZZ32->Byte is not applicable to an argument of type ZZ.', and the same for `Digits`; its third assertion fails too, for want of an `assert` at `ZZ` in the prelude, as the record says.
- **C.** `OneLibraryStringEquality`: 'REACHED', then 'java.lang.NoClassDefFoundError'. `OneLibraryConditionalReduction`: 'REACHED', then 'Duplicate method name "narrowToRange"'. `OneLibraryVarargsCount`: 'REACHED', then 'Duplicate method name "copy"'. `Arr` and `Dot`: 'Duplicate method name "-?0"' in `Vector`'s class. 'Tests run: 12, Failures: 5': the compiles pass and the five runs fail.

No rung's test passes on the base, and none fails for another reason than its gap.

### Check 3, repairs against the team's sources

- **K.** `overloading.tex:353-372` asks for the comparison on declared parameter types, with no static argument inferred for generic declarations: it grounds the second cause and forks K2 (generic part) and K3 ("guarantee that among all applicable declarations, one is more specific than all the others"). `traits.tex:584-590` grounds the redeclaration below. The first cause rests on fork K1, which the text does not settle (section 2, point 1). Refused after and compiling today: row 528's `c = 0` under the prelude, by no rule of the team (change 4). The probe found no other.
- **G.** `advanced/overloading.tex`, "Declarations with Static Parameters", grounds rows 1125 and 1122. Row 1124's refusal at load rests on P-174, the curator's, and on the checker's refusal; a program that walk loads today is refused after, by his rule.
- **N.** P-174 and its history of 2026-11-23 14:33Z.
- **C.** No rule is at stake: three crashes.
- **Run 2.** F rests on P-165 and its history of 2026-11-23 14:33Z ("Yes", then "Agreed. 1" for the getter). B on `basic-lib/booleans.tex:60-69`, `:131` and F-403's form. T on `basic/expressions/atomic.tex:45-48`. Y on walk's behaviour, with item 617 not consequential.

### Check 4, decisions

Printed with their histories: P-146, P-157, P-60, P-45, P-37, P-38, P-174, P-173, P-165, P-180, P-12, P-103, P-87, P-9; F-225, F-394, F-318; review-queue items 58 ("the text's boundary stands; row 543 holds the change to it (P-180)"), 503, 616 and 617. P-174's history holds "This is all compile time computation. No method invocations." and his "YES!!" to "a static number in the coercion's body converts where it stands ... and the checker refuses it if v can't fit": fork N1 is that. Fork K5 is P-60's text, "A declaration with static parameters, whose instance dispatch must choose at run time, is outside the proof", with Appendix I's boundary and item 58. One premise given as the curator's and not in his entry: the reason for P-146's plain signatures (change 2).

### Check 5, the forks

- X1, X2: not consequential; the brief's order and the disk.
- **K1: consequential in my reading** (section 2, point 1); named by the record, default reverses nothing.
- K2: not; the text's definition and `traits.tex`.
- K3: not; the text's guarantee, and his "it must be a static failure if it's impossible to decide".
- K4: not; an order of the implementation, undone by one edit.
- K5: not; P-60, Appendix I and item 58.
- K6: not; F-377's cast extended.
- K7: not; a report.
- K8: not by itself; it follows K1, in the prelude only, at a program that dies today.
- G1, G2: not; walk brought to the checker's verdict (P-45).
- G3: not (section 2, point 2).
- N1, N2: not; P-174.
- C1, C2, C3: not; crashes, and tests.
- F1, Y1, B1, T1: not; P-165, item 617, F-403's form, `atomic`'s precedent.

A fork that the record does not name: none found.

### Check 6, the merge

Run 1 merges with no `landsOnlyWith`. By file: `CodeGen.java`, K at the emission of a call's arguments, C at `:974-1240`, N at the numeral coercion's method only; `Functionals.scala`, K alone; `changes.tex`, four rungs at entries apart, the nearest G's `:5447-5448` and N's `:5437-5439`; `FortressLibrary.fss`, N alone. No pair changes one behaviour two ways. No rung needs another's result: G is walk only; C's tests do not reach `QQ`. The one meeting is on the merged tree: K's tie-as-error and N's new tests first run together at the gate. Fork X1's reasons hold: the floor of four rungs is 10 GiB against 10.95 free, and `FortressLibrary.fss:386-387` (F) and `:388-389` (N) are adjacent lines.

### Check 7, the measures and the estimate

The count and the distance are 0 and 0 by the planner's hack run for K1; N's effect on them is not measured, and N runs both stages. microGPT: no line changes; N changes the body of the library coercions that walk runs for its numerals. The estimates use the reviews' figures rightly: E 0.62, L 0.91, M 1.27 and the fixed roles 1.14 of run 2 of 35 (`batch-35b-review.md`, section 7); run 1 of 35 wrote 5.69M against 4.5M. Both runs of 35 came 26 % and 31 % over their estimates without the reserve. So run 1 here, with the two largest rungs yet, more likely writes 6.4M to 7.2M than 5.6M; that is inside the record's range. Run 2's 3.8M fits.

### Check 8, the section for the curator

It gives each rung a program, its message today and the result after, the forks with their defaults, what is left out and why. It was wrong on the ground of rung K (changes 1 and 2), now corrected. Left as it is: "The forks that wait for you: None new" stands beside the review list's new line on K1; the coordinator words the ask.
