<!-- The orientation workflow's admission, update mode, for climb batch 31b's landing (run 2 of climb batch 31): which of the landing's new and changed FACTS and POSITIONS entries change the fortress-repo skill's orientation (F-379, the form of the built-in number types, in "Numbers"), the home of each one not admitted, and the skill and quiz items outside the orientation that the landing bears on. -->

# Admission: climb batch 31b, run 2 of climb batch 31

**Inputs**

- Base: `main` at `c1e79529c6` (2026-11-17). The landing's commits are `06cd094706` (T), `f6e24650e7` (O), `d3095ca77f` (E), the rows' close `8895ca54ab`, the gather's record `4fdabc2ae8`, the review's fold `caa5363d72`, the gate's tables `00dd16a891`, the post-batch review `257cae9508`, and the record's landing `b95570a644` and `c1e79529c6`. The orientation was last changed at `e64da5d944` (2026-11-17 08:11 UTC), run 1's update, which landed on `main` while this batch ran. No commit since the landing touches `.claude/` (`git log 00dd16a891..HEAD -- .claude/`: none).
- The 44 entries, read with `explorations/coordinator/tools/facts-extract.sh` (three parts). What changed in each is taken from the judge's account, `climb-batch-31b/record-landing/diff.md`; the gather's record, `climb-batch-31b/RECORD.md`, "FACTS entries"; and the message of `caa5363d72`.
  - New: F-378 (T), F-379 (O, F-360 merged into it), F-380 (E).
  - Rewritten by the rungs: F-291, F-296, F-34, F-352 (T); F-361, F-344, F-328, F-299, F-303, F-313, F-306, F-307, F-311, F-323, F-375 (O); F-369, F-366 (E).
  - Reworded by the review's fold to drop the removed object names: F-24, F-74, F-79, F-122, F-229, F-262, F-305, F-306, F-308, F-310, F-314, F-327.
  - Changed by the record's landing: F-34, F-229, F-299, F-308, F-327, F-361, F-375, F-378, F-379, F-380, F-257, F-240, F-285, F-75, F-32, F-139, F-140. F-53 holds the gate's figures.
  - POSITIONS: P-68 (cut only), P-166, P-162, P-165, P-163 (respellings and lines). No decision changed.
- The orientation, `.claude/skills/fortress-repo/references/revival-changes.md`, read whole as it stands (32,123 bytes, 140 lines). Also read:
  - the core, `SKILL.md`;
  - the area parts, by `grep` for the removed names and the batch's rows: `interpreter.md:81`, `:121`, `:127`, `compiler.md:99`, `library.md:39`. No part names rows 959, 1003, 866, 697, 1054 to 1060.
- The landing: `RECORD.md`, "Rows opened" and "Revival changes, for the skill writer"; `explorations/reviews/batch-31b-review.md`, sections 1 and 2, Part 1 and Part 3; `record-landing/cold-read.md`, sections 9 and 10.
- The standard: `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers".
- The evidence searched:
  - the regression quiz (`explorations/coordinator/tools/orientation/regression/questions.md` and `key.md`, 35 cases), the pretraining quiz (`explorations/reviews/fortress-pretraining-quiz.md`) and the distillation audit (`skills-distillation-audit.md`), each by `grep` for `Int`, `Float`, `Long`, `BigNum`, `UnsignedLong`, `value object`, `extends ZZ32`, `typecase`, `comprises` and the tower;
  - the ledger, rows 959, 1003, 866, 551, 697, 528 and 908;
  - the tree:
    - `grep` of `Library/` and `ProjectFortress/LibraryBuiltin/` for a declaration of the five removed names: none, the compiler's prelude included;
    - the number types' headers (`Library/FortressLibrary.fsi:292`, `:394`, `:511`, `:572`, `:642`, `:713`; `FortressBuiltin.fsi:41`, `:123`);
    - the specification's `trait ℤ` (`Specification/basic-lib/basic-integers.tex:229`);
    - `tests/NumberTypeExtendRefusedWalk.fss` and `tests/NumberTypesAreObjectsWalk.fss`.

**The test.** An entry is admitted only if a worker would act differently without it, and the mistake it prevents has evidence: a failure on record, the regression quiz or the pretraining quiz. An entry is not admitted if the orientation already states it, if an area part owns it, or if it changes no action. Its row then says where it belongs.

**The result. One entry is admitted, F-379.** It adds no new rule. It gives the form of the built-in number types that the decision P-178 sets and the landing builds, and the correction that follows from it. "Numbers" says that the types are flat siblings and that a program's own number type extends `Number`. It does not say what the types are: a trait or an object, and which of walk's names still exist. The review lists "Numbers" as incomplete for this reason (Part 3). Rungs T and E make forms compile that a worker already expects to compile. What stays broken in each is a row on the compiled path that `compiler.md` owns. The other entries:

- walk's load check and its natives, which `interpreter.md` and `compiler.md` own;
- planning measures and gate figures;
- rewordings that drop the removed names;
- respellings of decisions.

## What the landing makes false or incomplete in the orientation

- **False:** no sentence. The review reads three sentences as holding:
  - `:56`, "`m[i, j]` passes the pair `(i, j)` as one index";
  - `:44`, `StandardTotalOrder`'s `MIN` and `MAX`;
  - `:116`, `u = 0` at `NN32` on both paths.

  I read `:17` against F-375 and F-257. Walk still refuses some valid pairs (rows 1058, 539, 779) and loads some invalid ones (rows 697, 1044), so it holds. I read `:101` and `:103` against F-380. The rule holds, and row 1060 is a compiled departure that `:103` sends to `compiler.md`.
- **Incomplete:** "Numbers", the rule "**The number types are flat siblings (P-43).**" (`:95`). It does not give the form of the eight types:
  - seven are value objects, and `QQ` is the only trait;
  - walk's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` are gone;
  - the compiler's prelude still declares open traits.

  Its last sentence, "It still calls the number and order traits 'the tower'", now names as traits five types that are objects.

## Admitted

| Entry | The default a worker holds | The correction for revived Fortress | The mistake it prevents | Evidence | Section it changes |
|---|---|---|---|---|---|
| F-379 | A built-in number type is an abstract type, with a concrete run-time object below it. A worker gets this from two sources. The team's sources and the record's older text: the specification's integers chapter declares `trait ℤ` (`basic-integers.tex:229`). The team's library declared `trait ZZ32 … comprises { Int, … }` with `value object Int extends ZZ32`, and `Float`, `Long`, `BigNum` and `UnsignedLong` in the same way. The team's `tests/NumberPrintTest.fss` named `BigNum` and `UnsignedLong` in `typecase` arms. The skill's area parts still name walk's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` as current (`interpreter.md:121`, `:127`; `compiler.md:99`; `library.md:39`), and so does the regression key (`key.md:360`). Pretraining: Haskell's numeric classes, and the audit's proposed core line "Numbers are library traits, side by side" (`skills-distillation-audit.md:364`). So a worker expects that a program may extend `ZZ32` or `RR64`, and that `Int` or `Float` names walk's run-time values in a `typecase`, a type or a test. | In the one library and walk, `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` are each one `value object`, as `NN32` and `RR32` already were (P-178). `QQ` alone stays a trait, and its values are the value object `Ratio` (P-166). An object is a leaf, so no type of a program extends a built-in number type. Walk refuses `object Mine extends ZZ32` at load: 'Attempt to extend object type ZZ32'. A program's own number type extends `Number` (P-160, already at `:116`). No library declares `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong`. As a type, each is undefined ('Float is undefined.'). As a `typecase` arm, each takes every value, with no message (row 959). The compiler's prelude keeps its open traits (row 1003). So on the compiled path such an object compiles, and dies when its class loads (row 866). | Two mistakes. (a) A `typecase` arm, a dispatch or an assertion at `Int`, `Float`, `BigNum` or `UnsignedLong`, copied from a team test, an old note or the skill's own area parts. Every value goes into the first such arm, so the program answers wrong with no error, and a test can pass for the wrong reason. (b) A number-like type of a program or of the library, declared below `ZZ32` or `RR64` to inherit its operators. Walk refuses it at load. On the compiled path the checker accepts it, and it dies when its class loads, so a plain compiled test of it fails only at run time. Also: a test that expects such a type to load, or a report that calls 'Attempt to extend object type' a defect. | Failures on record, for (a): row 959 (NEGATIVE-VERIFIED). Its note records that `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiteral' for a `ZZ32`, after `IntLiteral` left the library, until its arms were removed. Rung O's skeptic ran arms `Int`, `Float` and `else` on `3`, `1.5` and `"s"`. The base answered `3 Int; 1.5 Float; s else`, and the landed tree `3 Int; 1.5 Int; s Int`. The review calls this "the one landed change that turns a right answer into a silent wrong one for a program that still names `Int`" (`batch-31b-review.md`, section 2, O4). The regression key, case 29, "Trap": before climb batch 27, 48 lines of revival tests asserted printed `Int` names. For (b): row 866 (NEGATIVE-VERIFIED, `compiler_tests/XXXObjectExtendsZZ32Compiled.test`). On the base, rung O measured that `object Mine extends ZZ32` loaded and stopped at its first native method, 'getInt not implemented for FOrdinaryObject' (`RECORD.md`, rung O's revival change; row 551). This landing's cold reader had the core and the area parts but not the orientation. It drew the consequence and found the skill naming the removed objects as current (`record-landing/cold-read.md:189`, `:196-202`). Neither quiz has a case on it. | "Numbers": the rule "**The number types are flat siblings (P-43).**" (`:95`). Sentences go after the bold rule. Its sentence on "the number and order traits" is checked against the new form. |

Points for the writer, so that the new sentences let a reader conclude no more than the evidence establishes:

- **The prelude's half is decided and not built, so do not write "Until the switch-over".** In the orientation that opening marks a limit of the compiler's library that is not to be fixed in the prelude (`:7`). P-178 says the reverse: the prelude takes the same form before the switch-over, by an exception to P-37. That work waits on fork H2's probe (review-queue item 577, open). So the prelude's open traits and the compiled extender are unsettled behaviour, cited by rows 1003 and 866.
- **What has been run.**
  - The refusal at load was run only for an object (`tests/NumberTypeExtendRefusedWalk.fss`). For a program's trait below a number type, it is P-178's rule, "no type of a program extends a built-in number type", with no run on record.
  - The arm that takes every value was run under walk only (the skeptic's program). Row 959 states it on both paths for an undefined name, as `IntLiteral`. No library declares any of the five names, the compiler's prelude included (`grep`, no line).
- **Name the two that were objects already.** The cold reader could not tell how "seven of the eight" follows from five (`cold-read.md:203`). `NN32` and `RR32` are value objects in `FortressBuiltin` (`FortressBuiltin.fsi:123`, `:41`).
- **Walk's overloading at the five types is not this section's.** Walk's load check now reads a pair over the five as a pair over object types. It loads `f(x: Number): ZZ32` beside `f(x: ZZ64): String`, against the Subtype Rule (row 697). It loads a plain declaration with no written return type beside a generic one (row 1044). It refuses row 1058's valid pair. `:17` sends these to `interpreter.md`, "What walk checks", and they go there.
- **Keep the decision visible.** The sentences that state the form name P-178. Those that state a refusal or a silent arm state what the tree does, by its tests and rows.

## Not admitted

| Entry | Verdict | Reason, and where it belongs |
|---|---|---|
| F-378 | not admitted | A compiled method whose one parameter is a tuple now compiles and runs: rows 992, 832 and 819 are fixed. A worker expects that, and `:56` holds. Rows 1054, 1055 and 1056 belong in `compiler.md`, "Traps of the compiled path": an object's method overloaded at a pair, an object's one pair value parameter, and a generic operator applied to a pair. The JVM convention and its two bridges also belong in `compiler.md`, for a reader of a `VerifyError` at a tuple parameter (review Part 3). |
| F-380 | not admitted | On the compiled path, a numeral that ends a block after a local declaration, or that stands in a tuple, now converts at a declared type. That is the orientation's rule "A numeral converts where it stands", and the specification's value of a block, so the worker's default is right. The trap that it removes is `compiler.md:112`, which is now false (review Part 3, False 3). What stays is row 1060: compiled, an untyped binding of such a block keeps its numeral type, and a later conversion dies. That is a compiled departure from `:101`'s "an untyped binding", which `:103` sends to `compiler.md`. |
| F-375 | not admitted | Walk's load check at object types, with row 550 fixed and the five types merged. `:17` holds. The mechanism and rows 697, 1044 and 1058 at the five types are `interpreter.md`'s, "What walk checks" (review Part 3, Incomplete). |
| F-257 | not admitted | Walk's messages per rule. Its change is row 550's fix. Home: `interpreter.md`, "What walk checks". |
| F-366 | not admitted | Its change is on the compiled path, until the switch-over. `u =/= 0` at `RR32` and `RR64` is refused (row 1059). `u = 0` at `RR32` overflows the stack (row 528). `:116` speaks of `NN32`, which holds on both paths. The refusal is loud and is the prelude's. Home: `compiler.md`, "The compiler's prelude, until the switch-over" or "Traps", with the review's workaround `NOT (r = 0)`. Finding 1 (item 586) is open with the curator, and 1a is landed. |
| F-369 | not admitted | Row 1031 is fixed. A typed tuple binding over an `if` compiles, as a worker expects. Home: `compiler.md`. |
| F-291, F-296 | not admitted | Row 832 is fixed. A generic operator at a tuple instance is row 1056. The implicit bound `Any` is the core's ("Static parameters"). Home: `compiler.md`. |
| F-34, F-352, F-361 | not admitted | Planning measures: the code generator's refusals over the library, the switch-over rehearsal, and the merge probe, now history beside F-379. Homes: PLAN and `compiler.md`. |
| F-53, F-240 | not admitted | The last gate's distance and count, and the stages' seconds. Homes: the `coordinator` skill's `references/batch.md`, and `compiler.md` on the stages. |
| F-24 | not admitted | `ZZ32.overflow()` replaces `Int.overflow()`. Home: `interpreter.md:147` (review Part 3, False 8). |
| F-74, F-79, F-262 | not admitted | Reworded to name the value objects in place of the removed names. The numeral's default, the numeral types and the sign of a numeral exponent are already in "Numbers" (`:97-101`, `:118`), and they are unchanged. |
| F-122, F-305, F-314, F-327 | not admitted | Reworded only. `round`'s ties, `CHOOSE`, the divisors, the shifts and the powers keep their values. Homes: `library.md`, and the "Natives" sections of `interpreter.md` and `compiler.md`. |
| F-229 | not admitted | The witness's reason is now in the past tense. "`array1` and `array2` give a `Vector` or a `Matrix` only at the eight number types" is already at `:103`. |
| F-299, F-303, F-306, F-307, F-308, F-310, F-311, F-313, F-323, F-328, F-32 | not admitted | Natives: their counts, their carriers and the helpers that they name, by the objects' names. Homes: `interpreter.md` and `compiler.md`, "Natives", and `library.md:39` (review Part 3, False 2, 5, 6 and 9). F-303's "a type named `Float` is undefined" is carried by F-379's sentences. |
| F-344 | not admitted | Walk reads only the four string objects at their traits. A number is an object of its own name, so `Cell(3)` is a `Cell[\ZZ32\]`, as a program saw before. Home: `interpreter.md`. The regression key's case 29 names the old reading (below). |
| F-285 | not admitted | Citations moved by 84 lines. Home: `library.md`. |
| F-75 | not admitted | The merge's clause is folded into the distance on the merged library. The rule is unchanged. Home: `compiler.md`, "The checker's gaps" (row 1048). |
| F-139 | not admitted | Row 528's compiled symptom is now a stack overflow, no longer an `AbstractMethodError`. A prelude limit. Home: `compiler.md`. See `:70` below. |
| F-140 | not admitted | Row 527's message is now 'got type ZZ64'. Home: `interpreter.md`. `:101`'s sentence on row 962 is unchanged. |
| P-68 | not admitted | Cut only: the clause on `trait RR64`'s `round` goes. The decision and its rung after the switch-over are unchanged. The skill states no `round` type. `library.md` takes it when its rung lands. |
| P-166 | not admitted | The ground is now `value object ZZ` (`Library/FortressLibrary.fss:1170`) and `Ratio` at `:719`, and the conclusion is unchanged. `:66` already compares an integer by its value. The curator's open question on its "Why" (`diff.md`, "For the curator") changes no action. |
| P-162, P-163 | not admitted | Respellings (`Float` to `RR64`) and a cited line. Natives: `interpreter.md` and `compiler.md`, "Natives". |
| P-165 | not admitted | `Float`'s `^` respelled as `RR64`'s. The orientation's rule "`Number` declares nothing (P-165)" (`:116`) stands as written. |

## Outside the orientation, for the skill writer and the quiz author

These are not this workflow's to change. The landing makes each false or incomplete (`batch-31b-review.md`, Part 3; `record-landing/diff.md`, "For the coordinator", C158 to C169):

- **False:**
  - `compiler.md:22` (`Int.java`, `Long.java`), `:99` (`UnsignedLong`'s transfer) and `:112` (rows 1014 and 1030, both fixed);
  - `interpreter.md:81` (row 550's `pickFirst`, fixed), `:121` (`Float` in `double`), `:127` (the five removed objects), `:141` (an extender loads; it is now refused at load) and `:147` (`Int.overflow()`);
  - `library.md:39` (`Float`'s natives).
- **Incomplete:**
  - `interpreter.md`, "What walk checks": rows 697, 1044 and 1058 at the five types; row 1057; row 959.
  - `compiler.md`, "Traps of the compiled path": rows 1054, 1055 and 1056, 1059, 528 and 1060, and F-378's convention.
- **The core, `SKILL.md:136`, "Numbers are siblings, not a tower".** It holds. Once "Numbers" names the form, the core can say "seven of them value objects", so that the two agree. `:113` ("as the library's numbers … do") is now true of the types themselves.
- **The regression key, case 29.**
  - `key.md:360` says that "F-344: walk reads a value of the five native number objects (`Int`, `Long`, `BigNum`, `Float`, `UnsignedLong`) or of the four string objects at its trait". `:363` speaks of "the nine objects above". Both are false since F-344's rewrite. The expected answer, `Cell(z)` is a `Cell[\ZZ32\]`, stands.
  - The quiz has no case for F-379. The quiz author can add one: a port of a team test whose `typecase` has arms at `Int` and `Float`, beside a wrapper type declared `extends ZZ32`. The expected answer: arms at `ZZ32` and `RR64`, an arm at a removed name taking every value (row 959), and the wrapper declared below `Number` with its own coercions, since walk refuses the extender at load.
- **`revival-changes.md:70`, older than this landing.** It reads: "Its own `≣`, declared as `===`, compares strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=`". At `RR32` that `=` overflows the stack. The prelude's `===` at `RR32` calls `=` (`Library/CompilerLibrary.fss:67`), which `Equality` answers with `===` (`Library/CompilerAlgebra.fss:26`; row 528). This landing did not make it false: row 528 dates from climb batch 6.5b, and F-139 only rewords its symptom. The coordinator's to judge for a later pass.
- **`m[i, j] := v` (T.worker.1, review-queue item 579, consequential, open).** `:56` holds for a subscript. Both paths read a subscripted assignment at a pair index as three arguments, so it does not reach `opr[t: (ZZ32, ZZ32)] := (e: ZZ32)`. No entry carries it, and no sentence is owed until the curator decides.
