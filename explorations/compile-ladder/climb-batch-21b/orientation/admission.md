<!-- The orientation workflow's admission, update mode, for climb batch 21b's landing: which of the landing's new and changed FACTS entries change the fortress-repo skill's orientation, with the wrong default, the correction, the mistake prevented and its evidence for the one admitted, and the home of each one not admitted. -->

# Admission: climb batch 21b

**Inputs**

- Base: `main` at `aff478ca5`, 2026-10-23.
- The entries were read with `explorations/coordinator/tools/facts-extract.sh`: each entry alone, then its `history:` block to see what this landing changed.
- The orientation read is `.claude/skills/fortress-repo/references/revival-changes.md` as it stands. It is 18,155 characters, already over the budget of 8,000 to 12,000.
- The landing is `explorations/compile-ladder/climb-batch-21b/RECORD.md`: rungs C (`108ab82d6`, every operator checked), E (`031c38bbc`, the export check and the api) and D (`5e60e356a`, the team demos), and the rows' closes (`5ef2e93f3`).
- The standard is `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers".

**The test.** An entry is admitted only if both hold:

- a worker would act differently without it;
- the mistake it prevents has evidence on record, in the regression quiz or in the pretraining quiz.

An entry is not admitted if the orientation already states it, if an area part owns it, or if it changes no action. Its row then says where it belongs instead.

**The result.** One change is admitted, from one entry: F-284, as the general rule that it rests on. On two integers, `/` answers a `QQ`, and `DIV` truncates (change A below).

Seventeen of the entries are changed and four are new (F-281 to F-284). Of the seventeen changed entries:

- six change no meaning: F-35, F-44, F-58 and F-63 are re-anchored line citations, and F-158 and F-225 lose a closed row;
- ten follow from rung C's check of every operator, or from its crash repair: F-50, F-80, F-81, F-82, F-142, F-223, F-244, F-245, F-276 and F-278;
- one, F-83, follows from rung E's api.

None of them makes an orientation sentence false. The orientation never named the checker's skip of symbolic operators, so its overloading rules, which state no exception for operators, now describe the checker exactly. The gather's reading says the same (`RECORD.md`, "FACTS and POSITIONS left for the coordinator", last item). No row that this landing closed is cited anywhere in the skill (grep of `.claude/skills/fortress-repo/` for rows 449, 464, 468, 584, 670, 710, 726, 775, 791 and 800 to 811).

## The entries

| Entry | Verdict | Reason | Section it changes, or where it belongs |
|---|---|---|---|
| F-35 (changed) | Not admitted | Only re-anchored: `FortressLibrary.fsi:1225` is now `:1243`, moved by rung E's api text (`RECORD.md`, rung E, "Corrections"). Its meaning is unchanged. Dead sizes, and the export checker's comparison of static-parameter lists, change no worker's action that the orientation covers. | The record. No skill home. |
| F-44 (changed) | Not admitted | Only re-anchored: `:121-123` and `:961` are now `:122-124` and `:979` (`RECORD.md`, "Lines moved"). The orientation already states the exclusion rule and walk's departure from it, row 416. | Already in "Traits and objects", the rule "The compiled checker applies the exclusion rule (P-43, P-97)". No change. |
| F-50 (changed) | Not admitted | The entry loses the sentence "its overloading check never reads a pair of symbolic operators such as `+` (P-155, row 584)". The orientation's P-45 rule never named that gap, so the rule stays true and now holds for operators too. No worker would act differently. | Already in "Dispatch and overloading", the rule "Overloads may differ in their static parameters (P-45)". No change. |
| F-58 (changed) | Not admitted | Only re-anchored: `:283` and `:365-366` are now `:284` and `:366-367`. The entry measures microGPT's errors on an earlier library, and the orientation names no counts. | The record. No skill home. |
| F-63 (changed) | Not admitted | Only re-anchored: `:915` is now `:933`, and `:398` is now `:399`. The entry records repairs of the api's declarations. | The record. No skill home. |
| F-80 (changed) | Not admitted | The title loses "unless their name is a symbol", and the "Unchecked" sentence loses the symbolic operators. The checker's Meet Rule for functional methods now covers every operator (F-281). The core ("Dispatch is on every argument") and the orientation's "Dispatch and overloading" state the rules with no exception for operators. So the landing closes a gap; it adds no rule. Row 570 is unchanged. | No change. `compiler.md`, "The checker's gaps", never named the skip, so nothing there is false. |
| F-81 (changed) | Not admitted | The skip sentence now says that the checker checks every operator, gated by the distance stage. Batch 21's admission sent the skip (row 584) to `compiler.md` and the full-check stage to `library.md`. Neither part received them. With row 584 closed (`5ef2e93f3`), neither part needs them now. | `library.md`, for the String families' form, as batch 21's admission placed it (its F-276 row). |
| F-82 (changed) | Not admitted | A library fact about the ranges' meets. Its subscript clause now reads "need none since the index bound (F-278)", which the orientation's `Index` rule already implies. Open row 603, the string of a range's `map(...).reverse`, is a library bug. | The ledger. `library.md`, if it gains a line on ranges. |
| F-83 (changed) | Not admitted | String's entry in the export error now differs only in `size` and in its `excludes` clause. That is detail of the library and the export check. Rows 607 and 609 are unchanged. | The ledger. No orientation home. |
| F-142 (changed) | Not admitted | Walk's Meet Rule check still skips symbolic operators (row 611), "though the compiled checker checks them". This is now a path difference. Walk loads a symbolic-operator pair with no meet, which the checker refuses (`tests/XXXFunctionalMethodMeetOperator.fss`; `compiler_tests/XXXFunctionalMethodMeetOperatorChecker`). The orientation already says that walk's load check is not the verdict. It sends the reader to `interpreter.md`, "What walk checks", for the case and its row. That part's Meet Rule bullet does not say that the check skips symbolic operators. | `interpreter.md`, "What walk checks", the bullet "two functional methods that break the Meet Rule for Functional Methods": walk skips every symbolic operator (row 611), so it loads such a pair, which the checker refuses. |
| F-158 (changed) | Not admitted | The entry loses "A demo still passes a function to `fill` (row 464)", a row now closed. `library.md` already states `fill` and `tabulate`. | Already in `library.md`, "The curator's decisions on the library", last bullet. No change. |
| F-223 (changed) | Not admitted | "It checks no symbolic operator (row 584)" becomes the checker's refusal of `opr ||(self, y: S)` beside `opr ||(x: S, self)`. The orientation already states the rule with no operator exception: "Two functional methods with equivalent parameter types are duplicates, wherever `self` stands". The landing makes the checker meet that rule as written. | Already in "Dispatch and overloading". No change. |
| F-225 (changed) | Not admitted | The entry loses `trips.fss`'s `generator` (row 710), which was repaired in the demo. The orientation's self-typed trait rule cites neither `trips.fss` nor row 710. Row 695, which it does cite, is still open. | Already in "Traits and objects". No change. |
| F-244 (changed) | Not admitted | Row 775, a crash on such a trait's override, is fixed. Rows 751, 752 and 773 stand. The orientation's `where` rule sends the checker's gaps to `compiler.md`, and `compiler.md`'s bullets do not cite row 775. | No change. |
| F-245 (changed) | Not admitted | Measurements: the full check fell from 191 errors to 5, and the distance stage is now that check. As batch 21's admission found for this entry, the orientation names no counts. | The record. No skill home. |
| F-276 (changed) | Not admitted | Only its test sentence changes: the distance stage replaces the full-check shadow, which no longer matches the tree. The homes are the ones batch 21's admission gave. | `library.md`: the families' form, and `excludes { String }` for a program's own concatenation operator. `interpreter.md`: row 342. |
| F-278 (changed) | Not admitted | Only its test sentence changes. The orientation's `Index` rule, installed from batch 21's change B, already states the entry. | Already in "Traits and objects", the rule "An indexed type's index parameter is bounded by `Index` (P-156)". No change. |
| F-281 (new) | Not admitted | The compiled checker checks the overloading of every operator. A worker who reads the core expects the overloading rules to apply to every overload, and that is now true, so there is nothing to correct. The mistake that batch 21's admission feared was taking a clean count stage as proof that an operator overload is valid. That mistake, whose evidence was F-245's three invalid overloads, can no longer happen. The rest is detail of the compiled path: (1) the export check still reads `isDeclaredName` (row 782, latent); (2) an on-demand api's declaration of a name imported by name from another api is still read (row 813); (3) an `except` clause that lists an infix operator leaves it imported, on both paths (row 814); (4) outside its trait, the self type of a trait whose `comprises` clause lists types at a `where`-clause variable is read as the trait type, and such a program then stops in the code generator (rows 812 and 701). No worker failure is on record for (2) to (4): rung C's skeptic found them. | `compiler.md`, "The checker's gaps": add the reading outside the trait and row 812 to the bullet on a `comprises` clause at a `where`-clause variable, and add rows 813 and 814 as a line on imports. Walk's half is F-142's row. |
| F-282 (new) | Not admitted | The compiled export check now matches an api's members by name and header, and asks no definition for a member written `abstract`. A worker expects an export check to match by name, as OCaml checks a `.mli` and Java checks an `implements` clause. The team's check matched by header, whatever the name; the revived check does what the worker expects, so there is no default to correct. One residue remains. A component can leave out a member that its api writes `abstract`, the check passes, and a compiled client's call dies with `NoSuchMethodError` (row 816). That row is `CONTESTED` and is before the curator (E.skeptic.1, `explorations/coordinator/PLAN.md:563`), so no rule can state it yet. No worker failure is on record. | `library.md`, "Designing a change": the api states the component's members at the component's headers, and a member without a body is written `abstract` there (F-282). `compiler.md`, "Traps of the compiled path": row 816, once the curator decides. |
| F-283 (new) | Not admitted | All 52 team demos reach their end under walk, and no suite or stage of the gate runs them (P-79). This is a process rule. It corrects no default about Fortress, so it is outside what the orientation is for. Row 817, the checker's other refusals of `trips.fss`, is a gap of one path. | `tests-running.md`, "Outside the gate". `ProjectFortress/demos/` runs in no suite or stage of the gate. A change to walk or to its library runs the demos again with the driver of `explorations/compile-ladder/rung-team-demos/REPORT.md` section 13 ('demos: 52 run, 52 reached their end'). The same batch rewrites a demo that the change breaks, where the repair is known (P-79). Row 817 goes to the ledger. |
| F-284 (new) | **Admitted, change A** | The `rects` fact itself is library detail. The rule that it rests on is not: `/` on two integers answers a rational, and the library's halving is `DIV`. No part of the skill states that rule. The orientation implies it only in passing, in "a `QQ` base as `(2/3)^(-1)`". Failures are on record. See change A below. | "Numbers", the rule "An integer power answers its base's type (P-153)": a contrast clause folded into it, or one sentence right after it |

## Change A: integer division answers a rational

Entry: F-284, generalised to the rule that it rests on.

- **Default.** On two integers, `/` truncates, as in Java, C, Scala, Rust and Go. Python 3 and Julia give a float, and Haskell has no `/` on `Int`. The orientation's own rule invites the truncating reading: "An integer power answers its base's type" leads a reader to expect every integer operator to answer the base's type, and so `7 / 2` to be `3`. The regression key records the same habit for powers, in case 7's trap: "`2^(-1)` is 0.5 (Python, the team's walk)".
- **Correction.**
  - In the interpreter's library, as in the specification and in the team's library, `/` on two integers answers a `QQ`, so `7 / 2` is `7/2`. The sources: `Integral`'s `abstract opr /(self, other:I):QQ` (`Library/FortressLibrary.fsi:476`), `ZZ32`'s `opr /(self, other:ZZ32):QQ` (`:583`) and `Specification/basic/operators/opr-overview.tex:125-128`.
  - Truncating division is `DIV` (÷), which answers its operands' type (`ZZ32`'s `opr DIV(self,b:ZZ32):ZZ32`, `:569`). The library halves with it (`n DIV 2`, `Library/FortressLibrary.fss:4389`), and so does the repaired `rectsImpl` (`Library/Generator22D.fss:144`, `:145`, `:150`).
  - For a float, make one operand a float, as `(1.0 s) / n`. A `ZZ64` operand needs `asFloat` first (`library.md`, the `RR64` bullet).
- **Scope.** Until the switch-over, by reading, the compiler's prelude has no `QQ`. It declares `/` only in `RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:448`), and `DIV` in each integer type and in `IntLiteral` (`:131`, `:175`, `:238`, `:294`, `:354`, `:420`). No record measures what a compiled `7 / 2` does, so the clause should claim nothing about it beyond this. `DIV` is spelled the same on both paths.
- **Mistakes prevented.**
  - **Halving or averaging an index or a size with `/`**, as in `(lo + hi) / 2` or `n (n+1) / 2`. Under walk the `QQ` then fails dispatch where an integer is wanted: 'Failed to find any matching overload, args = (Ratio,Ratio)'. That is row 468, `Generator22D`'s `rectsImpl`, measured through the harness on the base by rung D (`RECORD.md`, "Revival changes, for the skill writer", D, "Reason").
  - **A `QQ` that spreads silently where a float was meant.** Row 174 records a learning-rate schedule written `s / scheduleLength`; run-c3 found it while porting microGPT. The flat program now writes `(1.0 s) / nSteps` (`explorations/run-c4/src/MicroGptFlat.fss:82`).
  - **A timing line `(fin - start) / 10^6` that gives a `Ratio` where an `RR64` is declared.** That is row 449, `HeapShakedown.fss`: 'Type of expression, Ratio, not a subtype of …'.
- **Evidence.**
  - Row 174, `POSITIVE-VERIFIED`, found by run-c3 on the model program, with the probe output '7.0 / 2.0 = 3.5  7 / 2 = 7/2'.
  - Rows 468 and 449, both fixed in `5e60e356a` and both failures measured under walk.
  - F-284 and its test, `tests/Generator22DRects.fss`.
  - Neither quiz tests the rule. The pretraining quiz has "`QQ` holds rationals. **[likely]**" (`explorations/reviews/fortress-pretraining-quiz.md:159`), but nothing on what `/` gives on integers. The regression quiz has no such case.
- **For the writer.**
  - Write one or two sentences in "Numbers", as the integer power rule's contrast, for example: "`/` on two integers answers a `QQ`: `7 / 2` is `7/2`. Truncate with `DIV`. For a float, make an operand a float, as `(1.0 s) / n`."
  - Add a scope clause on the prelude, folded into the power rule's existing "Until the switch-over, the compiler's library ..." sentence.
  - Leave out the `rects` narrative and the demo rows.
  - The orientation is over its budget, so keep the addition under about 300 characters, or pay for it by tightening the power rule's sentence on the prelude.
- **For the quiz author.** One case would test this rule: port Java's `int mid = (lo + hi) / 2;` for `lo, hi: ZZ32`.
  - **Expected:** `mid = (lo + hi) DIV 2`, because `/` answers a `QQ` under walk.
  - **Wrong:** `(lo + hi) / 2`.

## Notes for the coordinator, outside the orientation

- **The regression key's case 21** (`explorations/coordinator/tools/orientation/regression/key.md`, "Case 21", **Scope**) still says "Until row 584 closes, the stock checker skips every symbolic operator, so only the full check judges these pairs". Its **Evidence** cites row 584 (F-81) for that scope. Row 584 closed in `5ef2e93f3`, so the scope sentence is now false. The expected answer stands, so the key should drop the sentence or put it in the past tense.
- **The regression key's case 5** cites row 791 as its worker failure. That row is now closed, by repairing the demos. The failure still happened, so the trap's evidence stands.
- **The area-part homes named above**, gathered for the skill writer:
  - `interpreter.md`: row 611 (F-142).
  - `compiler.md`: rows 812, 813 and 814, and the reading of a self type outside its trait (F-281); row 816, once the curator decides (F-282).
  - `library.md`: the api states its component's members, and a member without a body is written `abstract` (F-282).
  - `tests-running.md`: the team demos and P-79 (F-283).
- **This landing makes no sentence of the skill false**, by this reading and by the gather's.
