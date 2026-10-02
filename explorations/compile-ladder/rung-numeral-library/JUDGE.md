# Judge, rung Q (rung-numeral-library): the skeptic's refusal

**Decision: repair.** The skeptic's refusal ground holds. With `IntLiteral` a sibling under `Number`, the compiled checker over the one library refuses numeral-only calls that the base accepted, and the rung gives them no home. The skeptic is also right on six of its seven corrections. The seventh, the `unsigned` stop, is ruled in section 3: the landed form stays and is listed for Pavol.

The worker is right on the rest: the model, kind A's device, row 517, the reflective-generator guard, the measurement, and the choice not to build R9. R9 is a fork between two of Pavol's decisions and goes to him.

This ruling reads the net diff `493b4076f...3ab32e5a9`, `SKEPTIC.md` beside this file, the worker's structured report (its `REPORT.md` and `record.md` texts, whose write the harness refused), the specification passages below, and the skeptic's probe outputs.

## 1. The refusal: numeral-only calls the checker no longer accepts

**What happens.** On the base, `object IntLiteral extends { ZZ32 }` (base `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:169`). So every declaration of `Integral[\I\]` (`Library/FortressLibrary.fsi:443-480`) applied to a numeral at `I = ZZ32`. After the rung, `IntLiteral` extends `Number` alone (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:178`). The skeptic's probes, quoted in `SKEPTIC.md`, section "The compiled checker over the one library", show eight calls refused on the head and accepted on the base: `odd(3)`, `even(4)`, `2^3`, `2^(-1)`, `floor(3)`, `ceiling(3)`, `truncate(3)` and `3 DIVIDES 6`. I read `SkqCk2.fss`, `SkqCk3.fss` and their `base` and `edit2` outputs. The error counts are 10 → 4 for `SkqCk2` and 2 → 7 for `SkqCk3`, and the head's lines are the ones `SKEPTIC.md` quotes.

**What the specification says about them.**

- **`odd`, `even` and `DIVIDES`.** These are declared only on `Integral[\I\]` (`Library/FortressLibrary.fsi:461`, `:478-479`). Under the specification, no instance of them is applicable to an `IntLiteral`, even with coercion, for three reasons:
  - A type can be coerced to `U` only if `U` declares a coercion from it or from one of its supertypes (`Specification/basic/conversions-coercions.tex:405-410`), and `Integral` declares none.
  - A type parameter that a parameter's declared type mentions other than as the whole type is fixed by subtyping (`Specification/basic/inference.tex:69-73`, and `:205-208` for the case left open).
  - The numeral rule (`Specification/basic/inference.tex:171-193`) settles a choice among declarations that are applicable, or an instantiation. It does not apply when no declaration is applicable.

  So for the library as landed, the checker's refusal is the specification's own answer. The repair is a declaration in the library, not a reading of the numeral rule. The skeptic's stated reason for these three ("the specification's numeral default reads such a numeral as a ZZ32", `SKEPTIC.md`, Recommended rows) is wrong. Its remedy is right.
- **`floor`, `ceiling` and `truncate`.** The declarations applicable with coercion are `RR64`'s and `QQ`'s (`Library/FortressLibrary.fsi:372-376`, `:428-432`), and they tie.
- **`2^3` and `2^(-1)`.** The declarations applicable with coercion are `IntLiteral`'s `^(self, b: AnyIntegral)` (`FortressBuiltin.fsi:209`) and the five per-type `^(self, b: IntLiteral)` that this rung added (`Library/FortressLibrary.fsi:522`, `:574`, `:631`, `:658`; `FortressBuiltin.fsi:168`). Each needs one coercion, and none is more specific.

  For these five calls, whether the numeral rule's reading as a `ZZ32` (`inference.tex:176-182`) reaches `Integral[\ZZ32\]`'s own declaration turns on how the rule is read:
  - The broad reading takes the numeral's type as `ZZ32` for the whole call.
  - The narrow reading only chooses among the declarations that apply to the `IntLiteral` call. The checker implements this one (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:736-760`), and `Integral`'s declarations are not among those candidates.

  The library makes the question moot. A declaration on `IntLiteral` that applies without coercion is chosen before any coercion is considered (`conversions-coercions.tex:475-480`; `inference.tex:62-63`).

**Who was right.**

- The skeptic is right that these are regressions with no home.
- The skeptic is right that the worker's "none new" is scoped to its 135 calls of a typed integer with a numeral and is false as a statement about the checker. That phrase appears in REPORT section 6 ("6 errors ... none new"), section 14, the structured summary and the FACTS entry's "6 after".
- The skeptic is right that the precedent search missed the model's own `even` and `odd` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:429-430`). The rung took "the team's block as written ... nothing added" (REPORT section 4's table).

**The same defect elsewhere.** The precedent rule applies: a missed declaration is evidence of others. I counted the members of `Integral[\I\]` (`Library/FortressLibrary.fsi:443-480`) that `IntLiteral` does not declare (`FortressBuiltin.fsi:178-209`). There are 16:
- the two `DOTMINUS` and `DOTPLUS`;
- `TIMES` (a body at `FortressBuiltin.fss:523`, and no api line);
- `DOTTIMES`, `DIVIDES`, `/`, `numerator`, `denominator`;
- `floor`, `ceiling`, `truncate`;
- `MINNUM`, `MAXNUM`, `odd`, `even`.

The skeptic's probes reached 11 of these 16 (`3 TIMES 4`, `3 / 4`, `3 MAXNUM 4`, `numerator(3)`, `denominator(3)`, `floor(3)`, `ceiling(3)`, `truncate(3)`, `3 DIVIDES 6`, `odd(3)`, `even(4)`), and 6 of the 11 are refused. `MINNUM`, `DOTPLUS`, the two `DOTMINUS` and `DOTTIMES` were not probed by anyone. The repair round enumerates all 16 before it edits (instruction 2).

**The device.** The device is `IntLiteral`'s own declaration of each refused member:
- `even` and `odd` follow the model (`CompilerBuiltin.fsi:429-430`).
- `floor`, `ceiling` and `truncate` take `Integral`'s bodies at the type (`Library/FortressLibrary.fss:671-673`). This is the way the rung gave `MAXNUM` and `MINNUM` `Integral`'s bodies at each type.
- `DIVIDES` reads through the `asZZ` getter, as `QQ`'s `coerce(x: IntLiteral)` already does (`Library/FortressLibrary.fss:566`).
- `^(self, b: IntLiteral)` uses the body of the rung's own decision 8.
- `TIMES` gets the api line its body already has, which settles finding 7. Today `3 TIMES 4` checks at `ZZ32` while the rest of the block answers `IntLiteral`.

**Decision taken here.** For `floor`, `ceiling`, `truncate` and `DIVIDES`, the compiler library's model has no declaration to copy. Three alternatives were weighed:
- a ledger row alone, which leaves a numeral refused where the base accepted it;
- per-type declarations on the five integer types, 15 or more declarations that the checker's narrow numeral reading would then reach;
- a change to the checker's numeral rule, which is outside this rung's files (rung I's and rung O's).

I take `IntLiteral`'s own declarations. They are the smallest device, and they are the one the library already uses for a numeral's own operations. This is reported to Pavol.

## 2. The skeptic's seven corrections

1. **The refusal.** Right. It is ruled in section 1, and the repair is instructions 2 to 6.
2. **`IntegerOrderNumerals.fss` messages.** Right on both.
   - `Specification/basic-lib/basic-integers.tex` declares no `widen`. `grep -n widen` prints nothing, and the chapter's only section is "Integers" (`:13`).
   - The section "Summations and Other Reduction Expressions" gives a sum's equivalent code from `var result: ZZ32 = 0` (`Specification/basic/expressions/reductions.tex:76-96`). It says nothing of a product's start or of another width. The `ZZ32` sum message (`ProjectFortress/tests/IntegerOrderNumerals.fss:69`) stays as it is.
   - The record itself calls these assertions pins of the library's numeral sites (`explorations/coordinator/CLIMB-BATCH-8.md`, rung Q, "The test, first"), so the reworded messages say what they pin, with no specification citation.
3. **The provenance block.** Right.
   - `CMP` is at `Specification/basic-lib/basic-integers.tex:625-630`, and `:633-645` holds `MAX`, `MIN`, `MAXNUM` and `MINNUM` only. The citation becomes `:625-645`.
   - The `deviation:` line must name `Library/ReflectiveQuickCheck.fss:147` and `unsigned`'s two api lines.
4. **The Appendix I entry's Effect.** Right. "its calls reach the declarations they reached before" (`Specification/appendices/changes.tex`, the entry "The type of an integer numeral", item Effect) is false under walk. Since this rung, walk's `MAXNUM` and `MINNUM` reach each type's own declaration: row 517's repair is a walk repair, and `SkqNN`'s `u MAXNUM 1` went from `QQ` to `ZZ64`. So do `CMP` and the comparisons that `ZZ32`, `NN32` and `NN64` now state (`Library/FortressLibrary.fss:721-727`, `:896-902`; `FortressBuiltin.fss:402-408`).
5. **A home-2 test for walk's `NN32` with a numeral.** Right.
   - On the base library a numeral was below `ZZ32`, so `u + 1` for an `NN32` `u` answered `ZZ64` by answer 8 on both readings.
   - This rung makes `NN32` coerce from a sibling `IntLiteral` (`FortressBuiltin.fsi:132`, `.fss:386`). Under the specification and the landed library, the call has no declaration applicable without coercion, and `NN32`'s own is the unique most specific (`conversions-coercions.tex:475-480`, and the relation of `:510-518`): `NN32` excludes `ZZ64`, coerces into it, and rejects it. So the answer is `NN32`.
   - Walk answers `ZZ64` because its numeral is an `Int`; the skeptic's `SkqNN` shows `u MAX 1` = `5 ZZ64`, `u + 1` = `6 ZZ64` and `u MAXNUM 1` = `5 ZZ64`.
   - The divergence arises with this rung's library, the specification settles it, and the repair is Q-walk's, which is home 2. The rule that the test is owed in the batch that measures the defect applies (the shared prefix, "What a measured defect is worth"). Row 484's note ("The `NN32` and `NN64` calls with a numeral answer `ZZ64` and `ZZ` while `walk`'s numeral is a `ZZ32`; rung Q's switch decides them", `explorations/fortress-gap-ledger.md:495`) is not a test.
6. **record.md's FACTS entry, "Walk reaches none of it".** Right, for the same reason as correction 4.
7. **REPORT section 3, "no walk call reaches the block".** Right. The object name `IntLiteral` is the value `FIntLiteral.ZERO` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java:34-37`). A program that names it reaches the block: the skeptic's `SkqLit` `x + x` prints `0 ZZ32`.

## 3. Points outside the refusal

**The `unsigned` stop.** The skeptic is right that the stop was met on the strict reading: two api lines (base `Library/FortressLibrary.fsi:466` removed, `Library/FortressLibrary.fsi:635` added). The worker's reading is also defensible: one declaration, `Integral`'s, is removed, and `ZZ64`'s api states the declaration its body already had (`Library/FortressLibrary.fss:878`, base `:855`).

The batch rule is that a rung finishes as its section says. Read alone, this section's outcome for the stop is a row. Three things weigh against reverting:
- The stop is reversible (POSITIONS, "Reversible stops do not hold a batch").
- Reverting restores a Return Type Rule error that the specification settles.
- The one-line alternative the skeptic names, `Integral`'s return type widened to `AnyIntegral`, has a cost that neither the worker nor the skeptic stated. The base `ZZ64` api states no `unsigned`, so a client's `unsigned(w)` for a `ZZ64` `w` would type `AnyIntegral` on the checker where the base typed `NN64`. That changes what the checker accepts, for example at `v: NN64 = unsigned(w)`.

**Decision taken here:** the landed form stays, the stop stays in stopsMet with `liftedBy` "Reversible stops do not hold a batch", and Pavol gets three candidates:
1. the landed form;
2. the row, which is the section's outcome;
3. the widening, with its cost.

The repair round verifies the cost by one probe before the report states it (instruction 13).

**R9 not built.**
- The worker and the skeptic each measured the conflict on their own copy. With `RR64`'s `coerce(x: NN32)`, `z + u` for a `ZZ32` and an `NN32` ties `ZZ64`'s and `RR64`'s `+`. Neither type coerces into the other.
- A tie that is not a numeral's is a static error (`Specification/basic/inference.tex:190-193`). That contradicts answer 8's `ZZ64`, and it turns two team tests red (REPORT section 8).
- The worker was right not to build R9, and not to edit R9's passages. The omission is reversible and holds nothing.
- The skeptic adds candidate 1's cost. With the mixed-width declarations, the numeral rule reads `u + 1`'s numeral as a `ZZ32`, so the checker types `u + 1` at `ZZ64` (`SKEPTIC.md`, differential 5).
- The callout's reason "since that decision names only ℤ32 and the numerals" (`Specification/basic/conversions-coercions.tex:81-82`) is literally true of answer 8. It is not true of the decisions on record, so it goes to Pavol with the fork. The repair round does not edit it.

**`Library/ReflectiveQuickCheck.fss:147`.** This is outside the record's file list, and no rung of section 4 owns it. Without it the team's `ReflectiveQuickCheckTest` overflows the stack, and the skeptic confirmed the guard both ways. It is not a reserved stop, it stays, and it is listed for Pavol, as the worker did.

**The object `IntLiteral` under walk.** The skeptic's `SkqLit` measured two things:
- **Its conversions.** On the base, `w: ZZ64 = IntLiteral` stopped with "Value 0 does not fit in ZZ32."; on the head every number type takes it. That is a loud failure turned into the value the specification's coercions give, repaired in this rung, so it is home 1 and owes an assertion. Its `exactValue` arm is also observable through it (`IntLiteral = widen(0)` is `true`), against the record's "cannot be seen under walk".
- **`x + x` printing `0 ZZ32`** against the declared `IntLiteral`. The specification's prose does not say what type a numeral type's own arithmetic answers; only the library's `.fsi`, which this rung wrote, does, and citing it is circular (rule 3). So this is home 3: a pin and a ledger row. Q-walk's `FIntLiteral.make` change will move it.

**`ZZ`'s api arithmetic** (the worker's provisional row 561). The specification declares `ZZ`'s operators (`Specification/basic-lib/basic-integers.tex`, section "Integers"). The bodies exist (`Library/FortressLibrary.fss:1000-1013`), and the device is the one the rung used for `ZZ`'s comparisons. The repair round states them in the api (instruction 5). If they bring a new distance error, it reverts them and keeps the row.

**`z = 0` resolving to `Number`'s catch-all `=` on the checker.** The skeptic is right that this follows the specification's order (`conversions-coercions.tex:475-480`). `Number`'s `=` (`Library/FortressLibrary.fss:366-375`) applies without coercion now that `IntLiteral` is under `Number`. It is not a defect. It does contradict the premise of `explorations/reviews/numeral-switch-judgement.md` section 4.5. It goes to Pavol with the one device that would change it (each integer type's own `=(self, b: IntLiteral)`, not built).

**The measurement and the stages.** The skeptic confirmed both: `compare2.txt` and `stages2/`. They stand for the code state they measured, `608c4e91f`. The repair round changes the library, so the count, the distance and the edit pass run once more on its final library (instructions 10 and 11).

The microGPT checks are not re-run. The record says once, and the repair adds members of `IntLiteral`, which no walk numeral is, and api lines whose bodies already run. The edit pass is the check that walk still loads and dispatches as before.

## 4. What the specification settles

- **Numeral-only calls of `odd`, `even` and `DIVIDES`.** The specification settles them: no declaration is applicable to an `IntLiteral` without one on `IntLiteral` (`conversions-coercions.tex:405-410`, `:433-435`; `inference.tex:69-73`). So the library must declare them.
- **`floor`, `ceiling`, `truncate` and `2^3`.** The numeral rule (`inference.tex:176-182`) does not settle them on one reading. A declaration on `IntLiteral` makes them applicable without coercion, which the specification settles (`conversions-coercions.tex:475-480`).
- **Walk's `NN32` with a numeral.** The specification settles it at `NN32` against walk.
- **The object `IntLiteral`'s arithmetic type.** The specification is silent; it is home 3.
- **R9 with answer 8.** The specification settles that R9 alone makes `z + u` a static error. The choice between the two decisions is Pavol's.

## 5. Instructions for the repair round

Work in `/home/user/fortress-numlib` on `wip/rung-numeral-library`, with the shell set up as the shared prefix says. No `ant compileAll` is needed: the repair edits `.fsi`, `.fss` and `.tex` files only. Every probe runs with a private cache through the rung's own drivers. Commit and push at each milestone named below, with the shared prefix's footer.

1. **Read the inherited state** (`git log --oneline 493b4076f..HEAD`, `git status --short`). Extract the worker's report texts into scratch, as the base the corrections apply to:

   `python3 -c "import json; [print(open('/home/user/fortress-numlib/tmp/rung-numeral-library/repair/'+k+'.md','w').write(b['input'][k+'Text'])) for l in open('/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_603242ca-111/agent-a56223983843b6350.jsonl') for d in [json.loads(l)] for b in (d.get('message',{}).get('content') if isinstance(d.get('message',{}).get('content'),list) else []) if isinstance(b,dict) and b.get('type')=='tool_use' and b.get('name')=='StructuredOutput' for k in ('report','record')]"`

   Run `mkdir -p tmp/rung-numeral-library/repair` first. It writes `report.md` (30442 characters) and `record.md` (8543). If the transcript is gone, the same texts are the `reportText` and `recordText` of the worker's structured report quoted in this judge's brief.

2. **Enumerate before editing.** In `tmp/rung-numeral-library/check/`, write `NumeralOnly.fss`, one zero-parameter function per call, each declared `: Any`, with numerals only.
   - Cover the 16 members of `Integral[\I\]` that `IntLiteral` does not declare (section 1: unary and binary `DOTMINUS`, `DOTPLUS`, `TIMES`, `DOTTIMES`, `DIVIDES`, `/`, `numerator`, `denominator`, `floor`, `ceiling`, `truncate`, `MINNUM`, `MAXNUM`, `odd`, `even`), plus `MIN`, `MAX`, `MINMAX`, `CMP`, `2^3` and `2^(-1)`.
   - Copy the skeptic's `tmp/rung-numeral-library/skeptic/check/SkqCk2.fss` and `SkqCk3.fss` beside it.
   - Run `./check.sh <Name> base` and `./check.sh <Name> edit2` for all three.
   - Tabulate each call as accepted or refused, base against head. Quote the head's refusal lines in REPORT.

3. **Tests first** (commit "Rung Q repair: the tests alone"):
   - (a) **`ProjectFortress/tests/IntLiteralValue.fss`.** One comment line: what it checks.
     - `x = IntLiteral` bound at `ZZ32`, `ZZ64`, `ZZ`, `QQ`, `NN32`, `NN64` and `RR64`. Each is asserted as its value with its type through a `shown` typecase that has an `IntLiteral` clause: `0 : ZZ32` … `0.0 : RR64`. The messages cite `literals.tex`, section "Literals" (the libraries define coercions from numerals to integers and rationals), and, for `RR64`, `conversions-coercions.tex`, section "Principles of Coercion" (integer numerals convert to ℝ64).
     - `x = widen(0)` is `true`, its message a pin of the library's `exactValue` numeral case with no citation.
     - `shown(x + x)` is `0 : ZZ32`, its message saying that it pins today's interpreter, where `IntLiteral`'s own `+` answers a `ZZ32`.
     - Show it failing on the base library: `tmp/rung-numeral-library/walklib.sh base <out> ProjectFortress/tests/IntLiteralValue.fss`, expected to stop at the `ZZ64` binding with "Value 0 does not fit in ZZ32.". Show it passing with `walklib.sh tree`.
   - (b) **`ProjectFortress/tests/XXXNumeralWithNN32.fss`.** One comment line, which may name row 484.
     - For `u: NN32 = unsigned(5)`, assert `shown(u + 1)` = `6 : NN32`, `shown(u MAX 1)` = `5 : NN32` and `shown(u MAXNUM 1)` = `5 : NN32`.
     - The messages cite `literals.tex`, section "Literals" (a numeral has its own type, which the libraries convert), and `conversions-coercions.tex`, section "Coercion Resolution" (`NN32`'s own declaration is the most specific). For `MAXNUM`, they also cite `basic-integers.tex`, section "Integers".
     - Show it through the harness as an expected failure: `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-numeral-library/h6 ProjectFortress/tests/XXXNumeralWithNN32.fss`.
     - Then make a scratch copy, `tmp/rung-numeral-library/xxxfix/XXXNumeralWithNN32.fss`, with the three expected answers set to walk's `6 : ZZ64`, `5 : ZZ64` and `5 : ZZ64`. Run `harness-one.sh` on it and quote the harness failing the passing XXX file. Delete the copy.
     - Quote both verdict lines with their commands.

4. **The `IntLiteral` declarations** (commit "Rung Q repair: IntLiteral's own declarations for the members a numeral no longer reaches").
   - In `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, inside `object IntLiteral`, after `:209`, add:
     - `opr TIMES(self, b: IntLiteral): IntLiteral`
     - `opr ^(self, b: IntLiteral): RR64`
     - `opr DIVIDES(self, b: IntLiteral): Boolean`
     - `floor(self): IntLiteral`
     - `ceiling(self): IntLiteral`
     - `truncate(self): IntLiteral`
     - `even(self): Boolean`
     - `odd(self): Boolean`
   - In `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, inside `object IntLiteral`, after `:550`, add the bodies (`TIMES` has one at `:523`):
     - `opr ^(self, b: IntLiteral): RR64 = self^(b.asZZ32)`
     - `opr DIVIDES(self, b: IntLiteral): Boolean = self.asZZ DIVIDES b.asZZ`
     - `floor(self): IntLiteral = self`
     - `ceiling(self): IntLiteral = self`
     - `truncate(self): IntLiteral = self`
     - `even(self): Boolean = even(self.asZZ)`
     - `odd(self): Boolean = odd(self.asZZ)`
   - If a body does not check or does not run on the object `IntLiteral` under walk, use `Integral`'s body form (`Library/FortressLibrary.fss:676-677`), and say so.
   - For any further member that instruction 2 found refused on the head and accepted on the base, add the same device: `IntLiteral`'s own declaration, with `Integral`'s body at `IntLiteral` where `Integral` returns `I`, or through `asZZ` where it does not. If one cannot be given that way, it gets a provisional ledger row quoting its probe line.

5. **`ZZ`'s api** (same commit or the next). In `Library/FortressLibrary.fsi`, inside `trait ZZ` (`:639-662`), state the operators its body declares at `Library/FortressLibrary.fss:996-1013`, with the body's signatures: unary `-` and `DOTMINUS`, `+`, `DOTPLUS`, binary `-` and `DOTMINUS`, `DOT`, `juxtaposition`, `TIMES`, `DOTTIMES`. If instruction 10's distance shows a new error at any of them, remove those lines again and keep provisional row 561 as the worker wrote it.

6. **Re-probe.**
   - Copy the worktree's `Library/` and `ProjectFortress/LibraryBuiltin/` into `tmp/rung-numeral-library/check/libs/edit3/`, as `libs/edit2` holds them.
   - Run `./check.sh <Name> edit3` for `NumeralOnly`, `SkqCk2`, `SkqCk3`, `NumeralCk` and `NumeralCk2`.
   - Required:
     - no call refused on `edit3` that `base` accepts, except one that instruction 4 gave a row;
     - `NumeralCk` at 0 errors;
     - `NumeralCk2` at 0 errors if instruction 5 held, or at its 6 if it did not.
   - Quote the tallies and every remaining refusal line.

7. **`ProjectFortress/tests/IntegerOrderNumerals.fss` messages.**
   - Line 75 becomes "pins the library: widen of the numeral 0 is the ZZ64 zero".
   - Lines 70-74 become, each, "pins the library: an empty SUM (or PROD) over <type> is the <type> zero (or one)", with no citation.
   - Line 69 stays.
   - No assertion changes. Commit with instruction 8.

8. **`Specification/appendices/changes.tex`, the entry "The type of an integer numeral".**
   - In item Effect, replace the sentence "The interpreter is unchanged: … and its calls reach the declarations they reached before." with: "The interpreter still gives an integer numeral the type \EXP{\mathbb{Z}32}, \EXP{\mathbb{Z}64} or \EXP{\mathbb{Z}} by its value, so a numeral reaches none of the declarations of \TYP{IntLiteral} there. Its calls of the comparisons, \OPR{CMP}, \OPR{MAXNUM} and \OPR{MINNUM} on an integer type reach that type's own declarations, which answer as the declarations inherited before did, except that \OPR{MAXNUM} and \OPR{MINNUM} with a converted argument, which stopped at a tie with those of \EXP{\mathbb{Q}}, now answer at the type."
   - In the same item, after the sentence on the comparisons, add: "\TYP{IntLiteral} declares its own \VAR{even}, \VAR{odd}, \VAR{floor}, \VAR{ceiling}, \VAR{truncate}, \OPR{DIVIDES}, \OPR{TIMES} and a power with a numeral exponent, since no declaration of \TYP{Integral} is applicable to a numeral of that type, even with coercion (\secref{applicability-with-coercion})."
   - If instruction 5 held, add a sentence that `ZZ` states its own arithmetic.
   - Edit no other passage.

9. **Build the specification once in scratch**, as REPORT section 13 did (a copy, placeholders for the generated inputs, `pdflatex` twice). Quote "no error" and the entry's number. Do not commit `fortress.pdf`.

10. **The checker count and the distance, once each on the final library**, into `tmp/rung-numeral-library/stages3/`, with the commands of REPORT section 11. Report:
    - the totals against the landed tables (59 and 598) and against `stages2/` (58 and 596);
    - every site that moved, with lines mapped back through the diff as REPORT section 11 did.

    A new error at an added declaration is fixed or the declaration removed, with the call it served given a row.

11. **The named measurement, once after the last library edit.**
    - Run `explorations/coordinator/tools/count-run/count-run.sh tmp/rung-numeral-library/edit-pass/q-edit3` in the background with the shared prefix's `run_bg`.
    - Then run `compare-normalised.py` against the coordinator's base pass, exactly as REPORT section 12 ran it for `q-edit2`.
    - Every changed output gets its cause: two new tests, the promotion, any overload listing that now names an added `IntLiteral` or `ZZ` declaration, row 430's order.
    - Any change the cause list does not account for is the record's stop. Name it in stopsMet with liftedBy "Reversible stops do not hold a batch".
    - Do not re-run the microGPT checks. State in REPORT why not (section 3, last paragraph).

12. **Run the harness on every test of the rung**:

    `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-numeral-library/h7 ProjectFortress/tests/IntegerMaxNumMinNum.fss ProjectFortress/tests/IntegerOrderNumerals.fss ProjectFortress/tests/ReflectiveNumberTypes.fss ProjectFortress/tests/IntLiteralValue.fss ProjectFortress/tests/XXXNumeralWithNN32.fss ProjectFortress/tests/XXXextendIntLiteral.fss`

    It is expected to report "OK (6 tests)" with both XXX files "Saw expected exception". Quote the lines.

13. **Verify the `unsigned` alternative's cost** by one probe before stating it.
    - Make `tmp/rung-numeral-library/check/libs/widen/`: the base library with `Integral`'s `unsigned(self): NN64` (base `Library/FortressLibrary.fsi:466`) changed to `: AnyIntegral`.
    - Run a probe `UnsignedCk.fss` with `f(w: ZZ64): NN64 = unsigned(w)` through `./check.sh UnsignedCk base` and `./check.sh UnsignedCk widen`.
    - Quote both.
    - If the widened copy accepts it, drop the cost from section 3's list for Pavol and say so.

14. **Write `explorations/compile-ladder/rung-numeral-library/REPORT.md`** from the extracted `report.md`, corrected:
    - **Header.** The `spec:` line cites `Specification/basic-lib/basic-integers.tex:625-645`. The `deviation:` line adds `Library/ReflectiveQuickCheck.fss:147`, `unsigned`'s two api lines, and `IntLiteral`'s own declarations beyond the model (this ruling's section 1).
    - **Section 3.** Add the object-name exception (`glue/prim/IntLiteral.java:34-37`).
    - **Section 6.** Replace "none new" with the numeral-only refusals (instruction 2's table) and their repair (instructions 4-6), quoting the probe lines.
    - **Section 9.** Add the two new tests with their failing and passing lines (instructions 3 and 12).
    - **Section 11.** Replace with instruction 10's numbers, keeping the `608c4e91f` figures as the intermediate state.
    - **Section 12.** Replace with instruction 11's comparison, keeping the microGPT result as measured on `608c4e91f`.
    - **Section 14.** Add the homes: the numeral-only refusals (home 1, by probe, since no gated program observes the checker over the one library); the object's conversions (home 1, `IntLiteralValue.fss`); its arithmetic (home 3, the pin and a row); walk's `NN32` with a numeral (home 2, `XXXNumeralWithNN32.fss`).
    - **Section 16.** Add the repair's decisions with their alternatives, citing this file for the ones taken here. Add the `unsigned` alternative's measured cost.
    - **Summary and `specCitations`.** Correct them to match.
    - If the harness refuses the write, say so and carry the full corrected text in the structured result.

15. **Write `record.md`** from the extracted `record.md`, corrected:
    - **The FACTS entry.** Replace "Walk reaches none of it" with: walk's numeral is still an `Int` and reaches none of `IntLiteral`'s declarations, while walk's comparisons, `CMP`, `MAXNUM` and `MINNUM` on an integer type reach the type's own. Name `IntLiteral`'s own `even`, `odd`, `floor`, `ceiling`, `truncate`, `DIVIDES` and `^`. Scope the "48 / 6" figures to their probe and add instruction 6's numeral-only figures. Add the two new tests to "Gated by".
    - **Row 484's note.** Add that `XXXNumeralWithNN32.fss` is the home-2 test of its `NN32` sentence.
    - **New provisional row: the object `IntLiteral`'s own arithmetic answering a `ZZ32` under walk.**
      - Home 3: `IntLiteralValue.fss` pins it.
      - Quote the skeptic's `SkqLit` lines "N2 x + x: 0 ZZ32" and "N3 x + 1: 1 ZZ32" with `walkwith.sh tree`.
      - Cause: `FIntLiteral.make` normalises (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`).
      - Q-walk's.
    - **Row 561.** Drop it if instruction 5 held, and record the fix in REPORT instead.
    - **Unrepaired refusals.** Add a provisional row for any refusal instruction 6 leaves.
    - **The handover line.** Correct it to the final count and distance.

16. **Commit REPORT.md and record.md** if written, and push. Return the structured result with:
    - stopsMet: the `unsigned` stop as listed, plus any from instruction 11;
    - the forPavol entries of this ruling;
    - each instruction's evidence line.

## 6. For Pavol

- **R9 against answer 8.** `RR64`'s `coerce(x: NN32)` makes every operator that both `RR64` and `ZZ64` declare ambiguous for an `NN32` with a `ZZ32`. Neither type coerces into the other, and a tie that is not a numeral's is a static error (`Specification/basic/inference.tex:190-193`). Two team tests go red (`ProjectFortress/tests/UnsignedTest.fss:51`, `fib13.fss:17`). The candidates:
  1. About 32 mixed-width declarations. The checker then types `u + 1` for an `NN32` `u` at `ZZ64` (`SKEPTIC.md`, differential 5).
  2. R9 alone, giving up answer 8 for `NN32` with `ZZ32`.
  3. `ZZ64` into `RR64` as well, which is lossy.
  4. Not built, which is the landed state.

  The coercion chapter's callout still gives answer 8's reason for the conversion staying explicit (`Specification/basic/conversions-coercions.tex:81-82`).
- **The `unsigned` stop.** It was met on the strict reading and the landed two api lines were kept by this ruling. The alternatives are the section's row, or `Integral`'s return type widened to `AnyIntegral`, whose cost to a client's `unsigned(w)` for a `ZZ64` `w` the repair round measures.
- **Taken under this ruling.** `IntLiteral` declares its own `even`, `odd`, `floor`, `ceiling`, `truncate`, `DIVIDES`, `TIMES` and `^(self, b: IntLiteral)`, because no declaration whose `self` is `Integral[\I\]` is applicable to a sibling numeral, even with coercion (`Specification/basic/conversions-coercions.tex:405-410`). The model declares only `even` and `odd`. The alternatives were rows, per-type declarations, or a checker change outside the rung. The consequence for the switch-over: every operation numerals are to support is declared on `IntLiteral` itself.
- **`z = 0` for a `ZZ32` `z`.** On the checker over the one library it resolves to `Number`'s catch-all `=` (`Library/FortressLibrary.fss:366-375`), which applies without coercion, by the specification's order (`conversions-coercions.tex:475-480`). The numeral-switch judgement's section 4.5 assumed `ZZ32`'s own `=`, so the `exactValue` path is what a compiled `i = 0` runs after the switch-over. One device would change it, each integer type's own `=(self, b: IntLiteral)`; it is not built.
- **`Library/ReflectiveQuickCheck.fss:147`.** This is an edit outside the record's file list: `IntLiteral`'s reflective generator, `genZZ32`.
- **The two microGPT checks cannot run on the tree** since the cleaning `1ee3b0bc5` removed their inputs (the worker's provisional row 560). The commit stage's microGPT step stops at `FileNotFound` unless the main tree holds them.
