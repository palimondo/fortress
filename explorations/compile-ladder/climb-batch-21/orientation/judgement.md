<!-- The orientation workflow's judgement of climb batch 21's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz; both changed sections install (Dispatch and overloading, one wording fix; Traits and objects, changes A and B), and no section is held; the sizes and the size exception; what the install needs; findings on unchanged text for the next update. Read at `859c130c4`, where the skill is unchanged since the admission's `66ed71f52` and orientation.md is the fix round's text of 18:35. -->

# Climb batch 21's update of the orientation: the judgement

Mode: update. Read, in this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, and the two writer logs. Also read: the current part, `.claude/skills/fortress-repo/references/revival-changes.md`, unchanged since `66ed71f52` (`git log 66ed71f52..HEAD -- .claude/skills/fortress-repo/` prints nothing), and its `diff` against `orientation.md`; `SKILL.md`; `compiler.md:3-4` and `:77`; `library.md:32`; FACTS F-225, F-277 and F-278, and POSITIONS P-146, P-149, P-156 and P-157 (`facts-extract.sh`); ledger rows 364, 695, 713, 786, 804, 805 and 806 (`ledger.py show`); `explorations/perf-probes/self-type-exclusion/REPORT.md`, "In short"; `explorations/compile-ladder/rung-index-bound/REPORT.md:70-75`; `Library/FortressLibrary.fsi:530-536`, `:1243-1250`, `:1268-1271`, `:2170-2178`, `:2243`, `:2700-2709`; `Library/Random.fsi:260`; `ProjectFortress/LibraryBuiltin/` (no `Index`, by `grep`); `scala_src/disambiguator/SelfParamDisambiguator.scala:46-120`; `scala_src/typechecker/OverloadingChecker.scala:550-562`; `compiler_tests/XXXFunctionalMethodMeetTopLevelAbstract.fss` and its `.test`. The preservation check read the first text (17,024 characters). So I read its three failures against the final text, and each sentence that the fix round added against its source. I ran only reads, greps, `ledger.py`, `facts-extract.sh`, and `skills-lint.py` on a scratch copy of `orientation.md` laid out as the part (it passes, as the current part does).

Line numbers are those of the final `orientation.md`. "Old line" is the current part's.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-23 | line 23: "The Scala language accepts it" | install | `cold-read.md` 2.G; P-149 |
| Traits and objects | 25-49 | change A (line 42); change B (lines 44-47); three fixes of old text (lines 35-40) | install, with the area-part edits of "The install" | `preserve.md` failures 1 and 2 fixed, 3 met by the install; cases 12, 18, 21 and 22 right in both rounds; `cold-read-2.md` weighed below |
| Static parameters, `where` clauses and sizes | 51-70 | nothing | no change | none |
| Numbers | 72-80 | nothing | no change | none |
| Reductions and comprehensions | 82-92 | nothing | no change | none |
| Implementation limits | 94-98 | nothing | no change | none |

The whole text installs: it is the current part with the changes of the two sections above. No section is held, so `queue.md` files no item. The second cold read finds two passages that would send a worker wrong in text that this update does not touch (line 22, the `h(self)` bullet, and the opening's reading scheme). A hold keeps the old text, which has the same passages, so a hold cannot fix them. They go to "Findings on unchanged text", for the next update.

### Dispatch and overloading: install

- **The change.** Old line 23 "Scala accepts it" now reads "The Scala language accepts it". The checker is a Scala program, so the first cold reader read "Scala accepts it" as a contradiction of "both paths refuse" (`cold-read.md` 2.G). The source bears out the new words: P-149 says "Scala's way, where the sibling trait's body implements the abstract method, is not taken".
- **Preservation.** No admitted entry touches the section. The sentence keeps its meaning.
- **Quiz.** No case fails. Case 14 (P-149) was not run again. The change does not move its expected answer.
- **Second cold read.** Its one high finding here, line 22 ("sends wrong"), is on old line 22, which is unchanged. See "Findings on unchanged text", item 1.

### Traits and objects: install

The changes (`sources-mapping.md`):
- Change A, line 42 (F-225, F-277, P-146, P-157). Signatures keep `T[\X\]` for every overloading rule except the exclusion test. That test reads `self` as `T[\X\] & X` and reads the declared bounds. With both readings, the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk refuses such a pair in a program's own component (row 804).
- Change B, lines 44-47 (F-278, P-156). This is a new rule: an indexed type's index parameter is bounded by `Index`.
- Three fixes of old text:
  - lines 35-38: the definition of a self-typed trait is now a list of two conditions (`cold-read.md` H);
  - line 40: "The checker refuses" an extender at another type (A; P-146);
  - line 40: "A compiled body of `T`" (I; row 695).

**Preservation:**
- **Failure 1 is fixed.** Line 42 names both readings, and "With both readings" replaces the "So" that put the pairs down to the self type alone. Probe A1 bears this out: the self reading alone clears 0 of the 8 pairs, the bounds alone clear 4, and both together clear all 8 (`perf-probes/self-type-exclusion/REPORT.md`, "In short").
  - The bound reading goes against the admission, which kept it out of the orientation (its F-277 row). It is one of the two fixes that `preserve.md` offers, and I accept it. Without it the sentence is false, and P-157's own title names both readings. The clause says no more than P-157 ("its existential reduction reads the static parameters' bounds").
  - F-277's narrower "at the top of the two domains' meet" goes to `compiler.md:77`, as the admission says (install step 1). This verdict depends on that step: as `compiler.md:77` stands, it says the opposite of line 42.
- **Failure 2 is fixed.** Line 44 says "To the checker a numeral is an `IntLiteral`, so it is no `Index`; walk takes it (row 364)". These are F-278's own words. Rung B's report cites row 364 for walk's half (`rung-index-bound/REPORT.md:75`).
- **Failure 3 is met by the install.** Three clauses of admitted entries belong in area parts that do not yet hold them. This verdict depends on install steps 2 and 3.
- **The fix round's other sentences hold against their sources:**
  - the prelude clause: `ProjectFortress/LibraryBuiltin/` declares no `Index`;
  - row 805's "takes one at a parameter of a type `I extends Index`": the row's notes say "A generic `[\I extends Index\](x: I)` takes the tuple";
  - "`Range` excludes `Index`": `FortressLibrary.fsi:2174-2175`;
  - the checker's refusal of an extender at another type: P-146;
  - the two conditions of lines 37-38: in `SelfParamDisambiguator.scala:72-80`, a `comprises` clause that lists any type gives the union self type, and otherwise the F-bound gives it (`:103-110`);
  - "Walk loads the library's pairs": row 804, "The library's own pairs ... load".

**Quiz.** Cases 12, 18, 21 and 22 are right in both rounds, and no case fails. Case 21 is change A and case 22 is change B. Reader 2 used the fix round's prelude clause in both 22(a) and 22(b), which closes reader 1's gap at 22(b). The P-157 clause misled neither reader on case 12.

**The second cold read, on the new text:**
- **"Which checker?" (high) and line 44, "contradictory as written" (high).**
  - The two statements are both true. The checker's refusal of an unbounded index parameter is on the interpreter's library, which the count stage reaches before the switch-over (`compiler.md:3-4`; `library.md:32`). The compiled path compiles no program that names `Index` today.
  - A worker who follows both writes the bound and does not try to compile the program to check it. Quiz reader 2 did exactly that in case 22, on this text.
  - No wrong action follows. A reader with only the core lacks the pointer to the count stage: see item 3 below.
- **Line 44, the numeral (medium-high).**
  - The clause is F-278's and says no more than F-278.
  - The reader feared that `a[3]` would fail. That reading leaves out the line's first sentence: a subscript takes the type's `I`, and a numeral converts to `ZZ32` (line 76).
  - For the next update: scope the clause as rung B's report does, "at a parameter declared `Index`" (item 4).
- **Line 37, "an open one, which lists only `...`" (medium).** The clause states the condition, "lists only `...`", and the code bears it out. The fix round's word "open" adds nothing (item 4).
- **Lower findings.** Line 42, "With both readings" and `&` (low-medium), and line 44's terms and placement (low) lead to no wrong action. The findings at lines 29, 31, 33 and 49 are on unchanged old text.

### The unchanged parts

Nothing changed in the opening, "Static parameters, `where` clauses and sizes", "Numbers", "Reductions and comprehensions" or "Implementation limits". Their text in the part stays as it is. Both cold reads' findings on them are on text that this update did not touch. The ones that would send a worker wrong are under "Findings on unchanged text".

## Size

- **Before:** the current part, 15,792 characters.
- **After:** `orientation.md`, 17,410 characters, 1,618 more:
  - "Traits and objects" goes from 3,514 to 5,119 characters. Change B is 1,150, change A is 457, and the fixes of old text are 2 fewer.
  - "Dispatch and overloading" goes from 2,728 to 2,741.
  - The other parts are unchanged.
- **Budget:** 8,000 to 12,000 characters (the workflow's README). The part was 3,792 over before this update and is 5,410 over after it.

**Size exception: accepted for this install, and the conflict is exposed.**
- **Why it is accepted.** Every added clause does one of three things:
  - states an admitted correction whose mistake is on record (`admission.md`, changes A and B);
  - restores a condition that the preservation check found missing (failures 1 and 2);
  - closes a gap that the quiz found (22(b)).

  Cutting any of them would bring back a failure of the reports (synthesis, "Acceptance and maintenance"). The admission already applied the competition for space: it admitted two changes from sixteen entries.
- **What overran.** Change A was meant to be one clause and is a paragraph of four sentences. The admission's own correction, consequence and path difference need them. A tighter wording would save about 130 characters, which does not change the verdict.
- **The conflict.** An update rewrites only the sections that it touches, so it cannot recover the overrun. The writer's candidate moves to area parts (`cold-read.md` section 3) total about 980 characters:
  - walk's three `Bottom` cases, 303;
  - the reductions' walk departures, 296;
  - the size-power limits, 239;
  - the compiler library's power defects, 144.

  To come down to 12,000, about 5,400 characters must leave the part. That needs a consolidation that moves path departures to `interpreter.md` and `compiler.md`, or a new budget. The coordinator decides which, and when. At this landing's rate, each update adds about 1,600 characters.

## The install

For the coordinator and the skill writer:

1. **`compiler.md:77`.** This step is a condition of the Traits verdict. Replace the overloads bullet's first two sentences with the admission's text (its F-258 row): the checker reads each static parameter at the top of the meet as its declared bounds (P-157). It still refuses `tint`, because `Box[\Bottom\]` lies in both domains (row 786, `CONTESTED`). Keep the bullet's sentence on row 759.
2. **`interpreter.md`.** This step is a condition of the Traits verdict (`preserve.md`, failure 3).
   - Walk refuses a program's own top-level type named `Index` or `Indexed` as ambiguous: "Type name may refer to: Index, FortressLibrary.Index" (F-278).
   - In "What walk checks": row 713's pair, which the checker accepts and runs and walk refuses at load (F-277).
3. **`library.md`.** This step is a condition of the Traits verdict (`preserve.md`, failure 3). `BoundedRange`'s `atMost(n: I): FullRange[\I\] where { I extends Index }` (`FortressLibrary.fsi:2243`), because the open range stays a range over `Any` (P-56). `UniformDistribution[\T extends Index\]` (`Random.fsi:260`) (P-156).
4. **The part.** Install `orientation.md` whole as `references/revival-changes.md`. Add `sources-mapping.md` to `references/sources.md`.
5. **The cold read.** Then the cold read of the installed part (the workflow's README).

The admission names homes for the ten entries that it did not admit. They are the coordinator's to route, and no verdict here depends on them. One of them makes a line of a skill part false now: `tests-writing.md:32`, on `assert` under walk (F-280, row 807).

## Findings on unchanged text, for the next update

None of these is a hold, because the update does not touch them, and a hold would keep the same text.

1. **Line 22, the `h(self)` bullet.** Both cold reads flag it: `cold-read.md` 2.F, medium-high, and `cold-read-2.md`, high, "sends wrong".
   - It sits under the duplicates rule, but it is a Meet Rule case. Its test says "whose parameter types are neither related nor exclusive, needs a declaration on their meet" (`compiler_tests/XXXFunctionalMethodMeetTopLevelAbstract.fss`, trait `S`).
   - Read as a duplicate, it tells a worker that an abstract functional method clashes with any top-level function of its name.
   - The fix: name the trait `S`, and give the reason: `S` and `String` neither exclude each other nor nest, and nothing covers their meet. Or move the bullet out of the duplicates list.
2. **The opening's reading scheme.** Both cold reads flag it: 2.A in each, and `cold-read-2.md`'s "Bold walk limitations without a row", medium-high.
   - Some bold rules are facts about one path.
   - Some sentences about one path cite no row, such as lines 29, 53, 68 and 96.
   - So a worker can assert a departure in a test.
3. **"Which checker?"** The text needs one sentence: before the switch-over, the checker's verdicts on the interpreter's library come from the count stage (`compiler.md:3-4`), and `fortress compile` uses the compiler's prelude.
4. **Wording in "Traits and objects".**
   - Line 37: drop "open", as F-225 reads, "one that lists only `...`".
   - Line 40: row 695's condition, "where `X` is an object type". The consolidation's judgement noted this too.
   - Line 44: the numeral clause scoped "at a parameter declared `Index`".
   - Line 44: walk's acceptance of a numeral at an `Index` parameter cites row 364, the row that rung B's report names. No row holds the acceptance itself (`ledger.py find numeral Index`).
5. **Line 53, the `pick` example.** It names neither `pick`'s static parameter nor its self-naming bound (`cold-read-2.md`, medium-high). The consolidation's judgement found that a reader reads it rightly. It is now flagged a second time.

## Outside the text

- **The regression key's case 18.** Its premise is false on walk's code. The second parameters exclude, so walk loads the pair (`quiz-grade-2.md`, first observation). The grader's fix is a second parameter that does not exclude, as in `checkSelection`.
- **`interpreter.md`, "What walk checks".** It quotes the message for a generic pair where a plain pair prints another message (`quiz-grade-2.md`, second observation).
- **The model program's unbounded index parameters.** `FlatArrays2.fsi`'s `exp`, `log` and others (`quiz-grade-1.md`, 22(a); PLAN item 61) are not the orientation's concern.
