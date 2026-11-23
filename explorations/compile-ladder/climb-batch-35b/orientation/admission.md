<!-- The orientation workflow's admission, update mode, for climb batch 35b's landing (run 2 of CLIMB-BATCH-35.md, rungs E, L and M): which of the landing's 12 FACTS entries and 1 POSITIONS entry change the fortress-repo skill's orientation (one change: F-403, the `≡` sentence of the SEQV rule, which row 184's fix made false), where each other entry belongs, and the skill, coordinator and quiz items outside the orientation that the landing bears on. -->

# Admission: climb batch 35b

**Inputs**

- Base: `main` at `ddfa65d880` (2026-11-23 21:57 UTC).
  - The orientation, `.claude/skills/fortress-repo/references/revival-changes.md`, was read whole as it stands (34,761 bytes). The core, `SKILL.md`, was read too.
  - The orientation was last changed at `2dd2936b4e` (17:03 UTC), before the batch's base `5a59551554` (17:49 UTC). Nothing under `.claude/` has changed since (`git diff --stat 2dd2936b4e HEAD -- .claude/` prints nothing). So the skill writer has not yet brought the parts in line with this landing.
- The entries, each read with `explorations/coordinator/tools/facts-extract.sh`. What changed in each is a word diff of `FACTS.md` and `POSITIONS.md`, `5a59551554..HEAD`. The commits that changed each:
  - Rung E (`e5cf04d474`): F-403 and F-404, new.
  - Rung L (`5c31f2b68a`): F-405, new; F-257, F-341 and F-375, rewritten.
  - Rung M (`08860c527f`): F-406, new; F-377, rewritten.
  - The gate's tables (`1caac80b3b`): F-53 and F-240, figures only.
  - The record-landing (`96cd5ade28`): F-26 and F-253 name row 1125's exception; F-375, F-403 and F-406 reworded; P-174's sentence on where the tree departs names row 1124 in place of row 981. Its decision is unchanged. F-404's and F-405's rewrites were held, so both keep their landed text (the commit's message; `record-landing/entries-report.md`).
- The landing:
  - `climb-batch-35b/RECORD.md`: "Rows opened", "Rows closed", "FACTS and POSITIONS entries", "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer".
  - `reviews/batch-35b-review.md`: section 3 (gather.1, row 1125), section 5 (P-180 in this batch), Part 3 (for the skill writer) and Part 5 (the batch after).
  - Ledger rows 184 and 1118 to 1127, and row 1094 for comparison. Row 184's history entry (`fortress-gap-ledger-history.md:1101-1105`).
  - P-180 and `403a0e60cb`: the skill drops workarounds, and a new trap goes to the coordinator, not into the skill as a sentence.
- The code, by `grep` and reading:
  - `Library/FortressLibrary.fsi:2792-2794` and `.fss:4922-4924`: `<->`, `EQV` and `NEQV`, each over two booleans.
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:465-466`: the prelude's `EQV` and `NEQV` as methods of `Boolean`. `Library/CompilerLibrary.fss:71`: its `NEQV` over `Any` (row 1119).
  - `parser_util/precedence_resolver/Operators.java:1250`: `EQUIV` is an alias of `EQV`, so the orientation's spelling holds.
  - `ProjectFortress/tests/BooleanEquivalenceWalk.fss` (walk, asserts `≡`, `EQV`, `≢` and `NEQV` on the four pairs of booleans). `one_library_tests/OneLibraryBooleanEquivalence.test` has the `compile` command only.
- The standard: `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers".
- The evidence searched:
  - The regression quiz (`regression/questions.md` and `key.md`). A `grep` searched for `≡`, `≢`, `EQV`, `EQUIV`, `<->` and rows 184, 744, 815, 981, 1053, 1057, 1058, 1122 to 1127. No case asks about `≡` or `≢`. Case 3 (the order of declarations, a top-level pair), case 32 (`:420`, a numeral type as a field's, variable's or return's type) and case 38 (row 1094, and its "Open" list) were read whole for the rows they touch.
  - The pretraining quiz (`explorations/reviews/fortress-pretraining-quiz.md`), by `grep` for the same words and for the order of declarations, "most specific" and return types. Nothing names `≡`. `:75` ("among declarations applicable to the dynamic argument types, the most specific is chosen" **[sure]**) bears on row 1125. `:80` (the Return Type Rule as covariant returns) bears on row 1127.
  - The APL probe that opened row 184, `explorations/apl/v1-probes/p10_eqv.fss`, removed by `1ee3b0bc54` and read at its parent: "the interpreter apply ≡ (EQV) to a user value object with no such definition".
- Probes: none were run. Each behaviour that this report gives comes from the record, the code as read or the tests as read, and the report cites the source each time.

**The test.** An entry is admitted only if a worker would act differently without it, and if the mistake that it prevents has evidence: a failure on record, the regression quiz or the pretraining quiz. An entry is not admitted if the orientation already states it, if an area part owns it, or if no worker would act differently. Its row then says where it belongs.

**The result: one change is admitted, and it carries one entry.**

- F-403, in "Traits and objects", the rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": its sentence on `≡` (`:57`).

The rest of the landing belongs to walk, the compiled path, a tool or the record. Rung L's and rung M's changes make walk and the compiled path do what the rules and the worker's default already expect. They make false sentences in area parts (`interpreter.md:29`, `:80` and `:82`; `compiler.md:172` and `:174`), not in the orientation. The landing's ten new rows (1118 to 1127) are walls. By P-180 and `403a0e60cb`, each goes to the coordinator, not into the skill as a sentence. The review's Part 5 already orders them for the batch after, with row 1125 first.

## What the landing makes false in the orientation

- `:57`: "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." This is false. Rung E declared `EQV` and `NEQV` over two booleans in the interpreter's library (`FortressLibrary.fsi:2793-2794`). `BooleanEquivalenceWalk` runs them under walk, and row 184 is FIXED (`e5cf04d47`; F-403). The workaround is needless, and P-180 drops it (review Part 3, item 1).

These were checked and still hold:

- `:15`, "Walk chooses by declared parameter types, never by the order of the declarations. It compares declared domains where one lies strictly inside the other." This stays the rule, P-45 as walk builds it.
  - Row 1125 is a new departure for one shape: two generic dotted methods of one name, one number of parameters and static parameters of the same kinds that differ only in their bounds. Of these, the first met is kept (F-26, F-253, F-405). The review lists the sentence as "short, on no list" (Part 3).
  - Before rung L, every set of generic dotted methods of one name stopped walk (row 1057, `interpreter.md:82`). So the sentence never held for these sets, and the orientation never cited row 1057.
  - The next sentences hold. Walk infers a dotted generic method's static arguments from the run-time types, and a trait's generic method fails with 'Cannot unify' outside a bound (F-253).
- `:17`: walk's load check refuses some valid pairs, and its cases are in `interpreter.md`, "What walk checks". F-257 swaps row 1058 for row 1122 in its list; the pointer stands. Row 780 is unchanged.
- `:41`: the `typecase` with `self` in one arm (row 1070). F-377 keeps it.
- `:43`: row 1094, the checker's intersection where an object redeclares a self-typed trait's dotted method. Row 1127 is a sibling at a trait with a `comprises` clause and a functional method. The sentence is scoped to self-typed traits and dotted methods, so it stays true.
- `:57`, the rest. `≡` is not `≣`. `EQUIV` is `EQV`'s alias (`Operators.java:1250`). The library's `=` over `Any` answers `SEQV`.
- `:93`, `:97` and `:99`: the numeral types, the four numbers and the sentence "Write a numeral type only as the parameter type of a coercion or an operator. The checker refuses it as the type of a variable, a field or a return (P-174)."
  - P-174's change is only its row: walk now refuses a numeral type in a `comprises` clause (row 981, fixed). It still loads one written as a return type, a variable's type or a field's type (row 1124). The orientation names neither row.
  - `:99`'s departure, citing F-341, F-342 and F-347, still holds: F-341 still binds the four numbers as `ZZ` values.

## Admitted

| Entry | The default a worker holds | The correction for revived Fortress | The mistake it prevents | Evidence | Section it changes |
|---|---|---|---|---|---|
| F-403 | Two defaults.<br>(1) `≡` (IDENTICAL TO) compares any two values, as APL's match or mathematical identity. A worker applied it to a program's own value object, and walk stopped with an internal error. That is row 184's origin.<br>(2) The orientation's own sentence at `:57`: the interpreter's library declares `≡` for no type, walk stops on it, and a worker writes `a <-> b`. | The interpreter's library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans, as top-level operators beside `<->` (`FortressLibrary.fsi:2793-2794`). Walk runs them (`BooleanEquivalenceWalk`). A compile under the one library checks them (`OneLibraryBooleanEquivalence.test`, compile only).<br>On a program's own objects, each is a type error. Under walk it fails at the call: 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt'. Compiled, it is refused statically: 'Could not check call to operator EQV' (F-403). Row 184 is fixed.<br>For objects, `SEQV` (`===`) or a type's own `=` stays the comparison: the rule at `:57-64`, unchanged. | (a) A worker who follows `:57` treats `≡` on booleans as unusable and row 184 as open. Such a worker avoids the specification's operator in library or test code, asserts walk's old stop in a test (that test now fails, since the library declares the operator), or reports walk's behaviour wrongly.<br>(b) The workaround stays taught in the skill that every worker reads whole. P-180 says the skill drops it.<br>(c) Without the clause "over two booleans only", the default (1) returns. A worker who reaches for `≡` on objects gets a type error, not strict equivalence. | Row 184's origin: the APL worker's probe `p10_eqv.fss` (removed by `1ee3b0bc54`; read at its parent) records that `p06_cross` "died with "** bug! Expect all oprefs to be top level EQV" when ... the interpreter appl[ied] ≡ (EQV) to a user value object". The ledger history's row 184 holds it (`fortress-gap-ledger-history.md:1105`). That is evidence for default (1).<br>The curator's comment of 2026-11-08: "tell "strictly equivalent" from "identical to"" (`references/sources.md:1124`). That is the reason the sentence exists.<br>The review names `:57` as made needless: Part 3, item 1, and section 5.<br>Limit: no regression-quiz case and no pretraining-quiz line asks about `≡` (`grep`). No worker's failure after reading `:57` is on record. So (a) rests on the false sentence itself. | "Traits and objects", the rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": the sentence "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." (`:57`). |

### Points for the writer

These points keep the rewritten text from letting a reader conclude more than the evidence establishes.

- **Size.** Replace the one sentence, at no greater length. The orientation is 34,761 bytes, against the 8K to 12K budget (`tools/orientation/README.md`).
- **The words.** State the declaration and its reach. Drop the stop, the row and the workaround. One form: "The interpreter's library declares it, and its negation `≢` (`NEQV`), over two booleans only, so on other values either is a type error."
- **No decision cited.** The top-level form is a default of the batch's plan, which the curator has not decided (F-403, within P-37). Under `:5`, a sentence without a P-N is built on but not cited as a decision. So cite no P-N. The source goes to `sources-mapping.md`: F-403, `FortressLibrary.fsi:2793-2794`, `tests/BooleanEquivalenceWalk.fss`. Update `references/sources.md:1129`, which gives the old clause's source (row 184, `<->`).
- **No compiled-run claim.** Write that the library declares the operators, not that compiled code runs them. The one-library test is `compile` only. F-403's headline, "the compiled path under the one library run[s] them", says more than that test shows (below, for the coordinator).
- **No sentence for the prelude or the walls.** These are:
  - row 1119: under the compiler's prelude, `≢` takes any two values and answers strict non-equivalence, so `Pt(1) ≢ Pt(2)` compiles and prints `true`;
  - row 1121: no `⊕`, `⊼`, `⊽` or `majority` in the one library;
  - row 1118: an undeclared chain operator under walk;
  - row 1120: the ASCII shorthands such as `NOTEQUIV`;
  - the one overload set with AplCore's `≡` under walk (F-403; no gated program imports AplCore).

  Each is a wall or a default for the coordinator (P-180, `403a0e60cb`). The review's Part 4 homes row 1119 with the prelude's switch-over and rows 1118 and 1121 in the batch after (Part 5, items 2 and 4).
- **Keep the rest of `:57-64`.** The `≣` and `≡` spellings, the library's `=` over `Any`, and the four bullets of `SEQV` are unchanged.

## Not admitted

| Entry | Admitted? | Reason, and where it belongs |
|---|---|---|
| F-26 | not admitted | Its change: walk chooses a generic dotted method by F-253, except two that differ only in their bounds, of which the first met is kept (row 1125).<br>Default: the most specific declaration runs. This is the pretraining quiz's `:75` **[sure]**, Java's choice, and the orientation's `:15`.<br>The orientation states the rule (P-45) at `:15`. Row 1125 is a new departure from it, a quiet wrong value for one shape: `Nested.tk(n)` answers 2 where the rule gives 3 (review, section 3).<br>No worker's failure and no quiz case turns on the shape. Before rung L, every call of such a pair stopped walk (row 1057), so no program that ran on the base gives another value now (review, section 3). By P-180 and `403a0e60cb` the row goes to the coordinator: it heads the batch after's list (review Part 5, item 1; gather.1).<br>Its home in the skill, until fixed, is `interpreter.md`, beside `:82`'s bullet on row 1057, which now goes. Case 3's top-level pair is unaffected: the same pair as top-level functions answers 3 and 2 (row 1125's notes). |
| F-253 | not admitted | The same change as F-26, at the dotted call. Its other sentences, on inference, the trait's bounds and the 'Cannot unify' message, are unchanged, and `:15` states them. As F-26. |
| F-405 | not admitted | Default: a trait's or an object's overloaded generic methods dispatch, as in Java or Scala. Walk now does so (row 1057, fixed; `GenericMethodOverloadArity`, `GenericMethodOverloadSetWalk`). So the default is right, and no worker needs a correction.<br>The false sentence is `interpreter.md:82`, "Give the two methods two names", which goes (review Part 3, item 2).<br>The walls that remain are rows 744, 1123, 1125 and 1126, all walk's. They go to the coordinator (review Part 5, items 1, 3 and 6). |
| F-257 | not admitted | Its change: row 1122 replaces the fixed row 1058 in the list of valid pairs that walk refuses. The orientation's `:17` states the general point and points to `interpreter.md`, "What walk checks", which owns the list. `interpreter.md:80` (row 1058) is now false (review Part 3, item 3). Row 1122 goes to the coordinator, with row 1125 (review Part 5, item 1). |
| F-375 | not admitted | Its change: walk's load check reads a tuple result element by element at object arguments (row 1058, fixed). This is the internals of walk's load check, which `interpreter.md`, "What walk checks", owns. The worker's default, that tuple types are covariant, now matches walk. No orientation sentence names it. |
| F-341 | not admitted | Its change: walk refuses at load a numeral type in a `comprises` clause (row 981, fixed). It loads one written as a return type, a variable's type or a field's type, and refuses it only where a numeral meets it (row 1124).<br>The orientation's `:99` already tells the worker to write a numeral type only as a coercion's or an operator's parameter type, and says that the checker refuses the other forms. A worker who follows it writes none of them. So no worker acts differently.<br>`interpreter.md:29` (row 981) is now false or narrows to row 1124 (review Part 3, item 4). Row 1124 goes to the coordinator (review Part 5, item 6). Case 32's key (`:420`) agrees with row 1124. |
| P-174 | not admitted | Only its sentence on where the tree departs changed: row 1124 in place of row 981. The decision, its reach and its requirement are unchanged (`record-landing/entries-report.md`, C13). The orientation's `:93-99` states the decision and cites neither row.<br>The entries writer's two wording questions for the curator do not touch the orientation. The title's "four numbers" against `NaturalNumeral`'s three: `:93` already writes `NaturalNumeral[\n, r, v\]`. The `NN32` bound: `:99` says "naturals of any size", as P-174 does. |
| F-377 | not admitted | Its change: an assignment from outside an object to its `var` field passes the value at the field's type (row 1053, fixed). This is the compiled code's cast, which `compiler.md` owns. `compiler.md:174` and its workaround go (review Part 3, item 5). The worker's default, a setter taking a subtype, now holds. `:41`'s row 1070 is unchanged. |
| F-406 | not admitted | Its change: a compiled setter's call passes its value at the field's type, and a compiled call of several declarations names an overload method that the class holds (rows 1053, 815 and 390, fixed). This is the code generator's, for `compiler.md:171-174`. The record gives M's skeptic's replacement text (`RECORD.md`, "Left for the coordinator and the skill writer").<br>Row 1127 is new: the checker refuses a comprised object's functional method at a narrower return type, where walk runs it. Its default is the pretraining quiz's `:80` and covariant returns. It is the sibling of `:43`'s row 1094, at a trait with a `comprises` clause and a functional method.<br>It is not admitted: it is a new wall (P-180, `403a0e60cb`); the refusal is a loud compile error; no declaration of the fourteen components that the distance checks has the shape, since the distance is 0 (F-53); and no worker's failure is on record. The review's Part 5, item 5, schedules it with row 1112. |
| F-404 | not admitted | A defect of the seeding tool: `seed-worktree.sh` copies `ProjectFortress/build` and not `build-one`. So a seeded worktree's first `ant` target rebuilds the Scala and empties the seeded caches. The tool's part owns it: `worktrees.md:45`, "Without the warning, `ant compileAll` keeps the seeded caches", is false (review Part 3, "False, on no list"). `:36`, "runs walk and the compiled path right away", is short under `FORTRESS_LIBRARY=one` (the record-landing's cold reader; `entries-report.md`, "For the skill writer"). The fix of the tool is the coordinator's (PLAN item E.worker.2). The orientation names no tool. |
| F-53, F-240 | not admitted | The last landed gate's figures: distance 0 and count 0; the count stage about 70 s and the distance stage 130 s. They belong to the `coordinator` skill's `references/batch.md`.<br>`compiler.md:245`, "about 80 to 180 seconds, more under load", is now a little above this gate's 70 s. That is the skill writer's to judge. |

## Outside the orientation, for the skill writer, the coordinator and the quiz author

None of these is this workflow's to change.

**The skill, false or needless** (review Part 3, read on `main` at `87180e9863`; `.claude/` is unchanged since, and each line was re-read here):

1. `references/interpreter.md:82`: row 1057 is fixed (F-405). "Give the two methods two names" goes. Add no sentence for rows 1123, 1125 or 1126 (P-180).
2. `references/interpreter.md:80`: row 1058 is fixed (F-375). Row 1122 goes to the coordinator.
3. `references/interpreter.md:29`: row 981 is fixed (F-341). The bullet goes, or narrows to the forms that still load, row 1124. That is the writer's call against P-180.
4. `references/compiler.md:172` and `:174`: rows 815 and 1053 are fixed (F-406, F-377). The list at `:171-174` keeps row 839's item, in M's skeptic's text (`RECORD.md`, "Left for the coordinator and the skill writer").
5. `references/worktrees.md:45`: false (F-404). `:36` is short under `FORTRESS_LIBRARY=one`.
6. `references/compiler.md:245`: "about 80 to 180 seconds" against this gate's 70 s (F-240). Minor.
7. `references/sources.md:1129`: the source line of `:57`'s old clause. It changes with the admitted change.

**For the coordinator** (P-180 and `403a0e60cb`: walls, not skill sentences):

- The landing's ten new rows, 1118 to 1127. The review's Part 5 orders them for the batch after, with row 1125 first. Its Part 4 notes that rows 1118, 1122, 1126 and 1127 had no line of their own in `PLAN.md`.
- `:15`'s sentence "never by the order of the declarations" is contradicted by row 1125 for one shape until that row's fix lands. This admission adds no qualifier (above, F-26). If the fix is not in the batch after, the question of a qualifier comes back at that landing.
- F-403's headline says that "walk and the compiled path under the one library run them". The one-library test is `compile` only (`OneLibraryBooleanEquivalence.test`), and E.worker.1's item is that a run test can pass now. The record says more than its test shows. That is a wording point for the record's next pass, not for the orientation.

**The regression quiz:**

- No case's expected answer is made wrong.
  - Case 3: its pair is top-level, generic beside plain, and its answer, "the order ... does not matter", holds (row 1125's notes: the top-level pair answers 3 and 2).
  - Case 32: `:420` agrees with row 1124.
  - Case 38: its answer holds.
- Case 38's "Open" lists, as not measured beyond row 1094's form, "a functional method ... a trait whose `comprises` clause lists types". Row 1127 now measures one such form: refused by the checker, run by walk. The quiz author may cite it there.
- A case is owed for the admitted change, since no case asks about `≡`. A form for the quiz author:
  - The question: a walk test compares two values of `value object Pt(x: ZZ32)` with `a ≡ b`, meant as "identical to", and two booleans with `ok ≡ expected`.
  - Expected: `≡` is logical equivalence on booleans. The boolean check runs. The object check is a type error under walk at the call ('Unification error: ... EQV param 1 (a:Boolean) got arg Pt'), and the compile refuses it ('Could not check call to operator EQV'). For the objects, write `a SEQV b` (or `===`), which is `true` field by field for a value object, or `a = b`, which falls back to it.
  - Wrong: `≡` taken as identity or strict equivalence on objects; walk said to stop on `≡` of booleans (row 184, fixed); `<->` said to be required.
  - Evidence: F-403, P-168, `tests/BooleanEquivalenceWalk.fss`, row 184's history.
