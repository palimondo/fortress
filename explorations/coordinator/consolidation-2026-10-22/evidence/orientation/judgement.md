<!-- The orientation workflow's judgement of the consolidation of 2026-10-22: install or hold for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz; five parts install, two sections are held (Dispatch and overloading, Numbers); the sizes and the size exception; what the install needs. Read at `328261e28`, where orientation.md is the fix round's text of 13:32. -->

# The orientation: the judgement

Mode: consolidate. Read, in this folder: `orientation.md` (the final text), `outline.md`, `disposition.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, and the two writers' logs. Also read: the old part, `.claude/skills/fortress-repo/references/revival-changes.md` (unchanged since `df58b05b8`, so the text at `cc1da1cda` that the disposition names); `SKILL.md`; `interpreter.md`, "What walk checks"; FACTS F-225, F-255 and F-263; every gap-ledger row that the text cites, and row 542; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-456` and `CompilerBuiltin.fss:955-971`; `Library/List.fsi:67-68`; `Library/FortressLibrary.fsi:2005-2011`; `ProjectFortress/compiler_tests/XXXOverloadReturnEveryInstance.test`. The preservation check ran on the first text only. So I read each of its 22 failures against the final text, and each sentence that the fix round added against its source (`git diff` of `orientation.md`). I ran only reads, greps and `skills-lint.py` on scratch copies (both the text and the part as installed below pass).

Line numbers are those of the final `orientation.md`; "old line" is the old part's.

## Verdicts

| Part | Lines | Verdict | Rests on |
|---|---|---|---|
| The opening | 1-7 | install | `preserve.md` P18, P22 fixed; `cold-read-2.md` 2.1 met by the install |
| Dispatch and overloading | 9-23 | **hold** | `cold-read-2.md` 2.4 and 3.3; ledger row 536 `FIXED` |
| Traits and objects | 25-42 | install | P2, P4, P18, P19 fixed; cases 11-13, 18 right twice |
| Static parameters, `where` clauses and sizes | 44-63 | install | P1, P5, P9, P10, P16, P18 fixed; case 10 right twice |
| Numbers | 65-73 | **hold** | `quiz-grade-2.md`, "The failed case" (case 7); a preservation failure left |
| Reductions and comprehensions | 75-85 | install | P7, P8 fixed; cases 9, 12 right twice |
| Implementation limits | 87-91 | install | P14, P18 fixed; case 1 right twice |

The text does not install whole. Each held section keeps its old entries in the part, under its new heading ("The part after the install", below). Each held section is one item in `queue.md`.

### The opening: install

- Preservation: P22 is fixed (line 5 defines the Working Draft; line 7 restores "fixed-width arithmetic does not wrap"), and so is P18's reading rule (line 5, "A sentence that names a POSITIONS entry").
- Quiz: case 2, a specification against an implementation, is right in both rounds.
- Second cold read: 2.1 (high) sets line 3, "Read the part whole, after `SKILL.md`, before work", against the core's line for the part, which loads it only on a disagreement (`SKILL.md:194`). The orientation is right, and the core's line is to change with the install, with the core's description (`outline.md`, "Pointers to change at the install"; the workflow's README, "Installing its result"). This verdict depends on that change. 2.5 to 2.8 (medium or less) lead to no wrong action: the reader's own section 1 applies the reading rule rightly (its lines 9-14).

### Dispatch and overloading: hold

- Line 11 ends: "The more specific declaration's return type must be a subtype of the other's at every instance, not at one only (row 536)." Line 7, which the fix round added, reads every such citation: "A sentence that cites a ledger row states a known departure of one path from a rule. A fix can change it, so do not assert it as correct in a test."
- Row 536 is `FIXED` (`e2f1aa7e8`): the checker checks the Return Type Rule at every instance, and the pinned refusal `compiler_tests/XXXOverloadReturnEveryInstance.test` asserts it (`compile_err_contains=the return type of Round->Round @`). Read by line 7, line 11 tells a worker that a rule which the checker enforces and a gated test asserts is a known departure, and not to assert it in a test. The sentence says the contrary of its source: a preservation failure that the fix round's reading rule made. The second cold reader could not tell which path departs, or how (2.4, medium-high; 3.3).
- The old part cites no row here: its entry 2 gives the fix as history. The rule's one open departure is row 542: the checker refuses `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, with `Circle` an object. Neither the old part nor the new names it.
- The rest of the section passes. P3 (line 13), P11 (line 17), P12 (line 15), P13 (line 22) and P20 (line 19) are fixed. Cases 3, 14 and 18 are right in both rounds, and reader 1's hedge on case 14 is gone. 2.9 to 2.12 change no action.

### Traits and objects: install

- Preservation: P2 (line 42), P4 (lines 37-40), P18 for T1 and T5 (lines 27, 37) and P19 (line 33) are fixed. The sentences that the fix round added hold against their sources: row 416 (line 27); row 650, "every `override` modifier" (line 31); the specification's "Not allowed" (old line 90).
- Quiz: cases 11, 12, 13 and 18 are right in both rounds, and reader 1's thin point on case 18 is resolved by line 27.
- Second cold read:
  - 2.3 (high): `comprises { ... }` (line 35), literal or an elision. It is literal: F-225's "one that lists only `...`", and old line 147. The reader itself notes that the other reading "excludes nothing", so only the literal reading gives the condition a sense. No wrong action follows.
  - 2.16 (medium): line 40 drops F-225's condition "when the trait's self-type parameter is an object type". This narrows a warning: a worker who heeds it avoids or recognises the `VerifyError` in the case that F-225 and row 695 name, and no promise of the text fails.
  - 2.13 to 2.15 and 2.17 change no action.
- For a later update, not a hold: "lists only `...`" beside `comprises { ... }`; "when `X` is an object type" in line 40; `Tg` named as one generic trait (line 27).

### Static parameters, `where` clauses and sizes: install

- Preservation: P1 (line 59), P5 (line 61), P9 (lines 48-50), P10 (line 46), P16 (line 61) and P18 for S4 (lines 61, 63) are fixed. P15 is the disposition's error, not the text's (install note 4). The fix round's sentences hold: the conditional-extension example is `Library/List.fsi:67-68`; line 59 is F-255 ("read as before: as a parent at every instance"); the file is `ProjectFortress/LibraryBuiltin/NatReflect.fsi`.
- Quiz: case 10 is right in both rounds. Line 52's "Under walk, write `mk[\ZZ64\]()`" gave reader 2 the fix that reader 1 lacked.
- Second cold read:
  - 2.2 (high): line 46, "A generic type that holds `OPEN` admits no more than at `Bottom`", against the core's "every value passes it" (`SKILL.md:132`). Line 46 is the old part's sentence (old line 198), which follows there "Wherever walk checks a value against the open parameter, every value passes"; the core keeps that half. F-143's example (`preserve.md` P10: beside `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`) bears out the reader's own "likely meaning". So the reader reads it rightly.
  - 2.18 (medium): "built" (line 54). The same paragraph gives each path's departure with its row (line 59), and the reader's section 1 applies them rightly.
  - 2.19 changes no action.

### Numbers: hold

- Line 73, which the fix round added: "Until the switch-over, the compiler's library has powers only at `ZZ32`, `NN32` and `NN64`, with an exponent of the same type."
- The compiler's prelude also declares `opr ^(self, other:RR64): RR64` and `opr ^(self, other:ZZ32): RR64` in `trait RR64` (`CompilerBuiltin.fsi:433`, `:455-456`). The second takes a negative exponent as `1.0 / (self^(-other))` (`CompilerBuiltin.fss:955-971`). The old part limits the sentence to the integer powers (old line 319, inside "An integer power"), and F-263 speaks of "its `ZZ32` power". Without "integer", the sentence says more than its source.
- Reader 2 took it for every power, and concluded that `10.0^(-k)`, the spelling that the rule recommends, does not compile before the switch-over (`quiz-grade-2.md`, case 7, right without its compiled scope). Both criteria fail: a preservation failure is left, and a quiz case fails because of the text.
- The rest of the section passes. P6's other halves, P17 (line 71), P18 for N3 (line 71) and P21 (line 69) are fixed. Cases 4, 5 and 16 are right in both rounds. 2.20 to 2.22 change no action.

### Reductions and comprehensions: install

- Preservation: P7 (line 79) and P8 (line 85) are fixed. "`BIG MAX` over a generator still answers `R`" is `FortressLibrary.fsi:2011`.
- Quiz: cases 9 and 12 are right in both rounds, and neither reader was misled by U1, `library.md`'s `SUM` bullet.
- Second cold read: 2.23 to 2.25 change no action. 2.25's "A generic one" keeps the old part's form (old line 388).

### Implementation limits: install

- Preservation: P14 (line 91) and P18 for L1 (line 89) are fixed.
- Quiz: case 1 is right in both rounds. The fix round dropped "A walk run does not prove a program well typed"; the core holds it ("A program that runs under walk can be ill-typed").
- Second cold read: 2.26: row 405 says that the compiled path refuses an untyped parameter "wherever it appears", so "Write every parameter type" sends no worker wrong. 2.27 changes no action.

## Size

- Before: the old part, 74,260 characters (74,278 bytes), 54 entries.
- The orientation as written: 15,414 characters. The budget is 8,000 to 12,000 (`outline.md`, "Budget"), so it is 3,414 over. The first text was 12,613.
- The part after this judgement: about 31,700 characters (31,725 in a trial assembly). That is the opening and the five installed sections, 10,268; Dispatch's old entries, 15,120; Numbers' old entries, 6,325.
- If both items of `queue.md` take their other way: about 15,400.

**Size exception.** For the installed parts, accepted. They take 10,268 characters against the outline's guide of 7,100 for them. The growth since the first text is the conditions that the preservation check found missing or overstated (P1, P2, P4, P5, P7 to P10, P14, P16, P19, P22). Each changes what a worker does, and cutting them would reopen those failures (synthesis, "Acceptance and maintenance"). The second writer's alternative, moving the walk-only departures to `interpreter.md` for about 2,500 characters, is a decision not taken, and no verdict here depends on it. The held sections' 21,445 characters are no standing exception: they leave the part when the items are answered.

## The part after the install

For the coordinator and the skill writer:

1. **The held sections.** Each keeps its new heading, with the old entries that its rules replace (`sources-mapping.md`) below it, whole:
   - Dispatch and overloading: entries 1 to 6 (old lines 19-77), 13 (117-124) and 22 (183-187);
   - Numbers: entries 34, 35, 36 (old lines 290-306), 38, 39 (314-326) and 45 (358-362).

   The old sections' other entries keep the destinations of `disposition.md`, which the preservation check passed.
2. **Their form.** The held entries keep the form Original, Resolution, Reason, which the new opening does not explain. Keep above them the old opening's sentence, "Each resolution is the rule of this tree" (old line 11), or a line that says so. Every row that they cite is open, so line 7's reading rule holds for them.
3. **A broken name.** Entry 36 points to "Comparing pairs and triples", which the installed Traits section renames. Point it to "Pairs and triples are ordered only where each element type extends `StandardPartialOrder`".
4. **Moves for the installed sections**, at the install (`disposition.md`):
   - row 10, to `interpreter.md`;
   - rows 27, 28 and 31, to `compiler.md`;
   - row 32, with P15's correction: walk's row 755 goes to `interpreter.md`, "What walk checks", not to `compiler.md`;
   - row 44: settle U1, so that `library.md`'s `SUM` bullet takes F-59's rule, as line 79 does.
5. **Moves for the held sections**, which wait for the items' answers: rows 5 and 6 (to `interpreter.md` and `compiler.md`); row 38's typed `fail` (to `library.md`; entry 38 keeps it meanwhile). While Dispatch is held, the pointer at `interpreter.md:38` to "Walk's check of two generic declarations" stays valid.
6. **Provenance.** Add `sources-mapping.md` to `sources.md` for the installed headings only. The Dispatch and Numbers headings go in with the items' answers.
7. **Pointers.** The core's line for the part (`SKILL.md:194`) and the core's description change at the install, to read the part whole before work (the opening's verdict depends on it). `SKILL.md:132`'s pointer to "Static parameters" still works (line 44). `exploring.md:41-42` changes as `outline.md` says. U2 and U3 of `outline.md` lie outside the text.
8. Then the cold read of the installed part (the workflow's README).

## Candidates outside the old part

C1, C2 and C3 of `outline.md` are not admitted. None is in the text, the run has no further round, and the outline cites for none of them the failure on record or the quiz case that the admission test asks for. An update run can admit them on such evidence.
