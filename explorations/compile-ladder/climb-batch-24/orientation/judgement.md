<!-- The orientation workflow's judgement of climb batch 24's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz; the one changed section, "Static parameters, `where` clauses and sizes", installs with both of its changes (F-181 at line 67, F-270 at line 71), and no section is held; the sizes and the size exception; what the install needs; findings on unchanged text, for the next update. Read at `53a84b2e6`, where `revival-changes.md` is unchanged since the admission's base `453898c32`, and orientation.md is the fix round's text of 16:50 UTC. -->

# Climb batch 24's update of the orientation: the judgement

Mode: update.

**What I read.**
- In this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `quiz-cases.txt` (cases 24 and 25), and the two writer logs.
- The current part, `.claude/skills/fortress-repo/references/revival-changes.md`, and its `diff` against `orientation.md`: two hunks, lines 67 and 71. `git log 453898c32..HEAD -- .claude/skills/` prints one commit, `53a84b2e6`, which changes `compiler.md`, `interpreter.md` and `sources.md` only.
- FACTS F-181 (`FACTS.md:255`), F-270 (`:210`) and F-256 (`:112`), by `facts-extract.sh`. Ledger rows 307, 701, 777 and 867, by `ledger.py show`.
- `ProjectFortress/LibraryBuiltin/NatReflect.fsi:22-23`; `ProjectFortress/compiler_tests/XXXNatOpenRun.fss`, `XXXNatOpenRun.test` and `NatOpenRunLink.test`; `ProjectFortress/src/com/sun/fortress/parser/Keyword.rats:39`.
- `compiler.md:30-34`, `:40-44` and `:104-110`; `build-and-caches.md:97-124`; `SKILL.md`.
- The regression quiz's working-tree diff (`git diff -- explorations/coordinator/tools/orientation/regression/`): cases 24 and 25 are new there and not committed.

**What I ran.** Only reads, `grep`s, `diff`, `wc`, `facts-extract.sh`, `ledger.py show` and `skills-lint.py`. I ran the lint on a scratch copy of `orientation.md` laid out as the part (`.../.claude/skills/fortress-repo/references/revival-changes.md` in the scratchpad). It prints no hit and exits 0, as the current part does. Neither writer could run the lint (`writer-1.log`, `writer-2.log`), so this is the text's only lint.

**Which text each check read.**
- `preserve.md`, `cold-read.md` and `quiz-grade-1.md` read the first text (19,457 characters). `quiz-grade-1.md` quotes its line 67, "A compiled call whose own clause introduces a variable".
- `cold-read-2.md` and `quiz-grade-2.md` read the final text (19,773 characters).
- So I read the three preservation failures against the final text. I also read each sentence that the fix round wrote against its source, because no other check did.

Line numbers are those of the final `orientation.md`.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-24 | nothing | no change | none |
| Traits and objects | 26-50 | nothing | no change | none |
| Static parameters, `where` clauses and sizes | 52-71 | line 67 (F-181): the row 701 refusal replaced by the compile and the row 867 death; line 71 (F-270): "runs compiled only after the switch-over" replaced by two walls, the link and row 307 | install, both changes | `preserve.md` failures 1, 2 and 3 and its note on the prelude, all fixed in the final text; cases 24 and 25 right in both rounds (`quiz-grade-1.md`, `quiz-grade-2.md`: 2 right, 0 wrong, 0 against the orientation); `cold-read-2.md` section 1, "Static parameters", last two bullets, read right; its D and S weighed below |
| Numbers | 73-83 | nothing | no change | none |
| Reductions and comprehensions | 85-95 | nothing | no change | none |
| Implementation limits | 97-101 | nothing | no change | none |

The whole text installs. It is the current part with the two changes above. No section is held, so `queue.md` files no item.

The second cold read finds passages that could send a worker wrong in the unchanged parts (its D, F, H, L and O, rated medium to medium-high). This update does not change those sentences. A hold keeps the old text, which has the same passages, so a hold cannot fix them. They go to "Findings on unchanged text", for the next update.

### Static parameters, `where` clauses and sizes: install

#### Line 67, F-181: install

**The change.**
- Old: "The code generator refuses a declaration with a `where` clause of its own (row 701)."
- New: "The code generator compiles a declaration's own `where` clause and emits nothing for it: only the checker checks it. A compiled call of a function or method whose own clause introduces a `where`-clause variable, as `where [\nat n\]` does, dies at run time (row 867)."

**Against the sources.**
- F-181: the code generator "compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause". "The clause's constraints are the checker's."
- Row 701 now holds only contracts. Its notes: "A declaration whose own header carries a `where` clause compiles, and nothing is emitted for its constraints".
- Row 867: "a call of a function or method whose own `where` clause introduces a `where`-clause variable links and dies, `NoClassDefFoundError`", for `g[\U, V\](u: U, v: V): String where [\nat n\]{...}`. The new sentence says "dies at run time" and cites the row, so by line 7 it is a departure that a fix can change.
- `compiler.md:44` states the same rule in full, with the `NoClassDefFoundError`. The contract refusal (row 701) stays there, as the admission asked.

**Preservation.** Failure 1 is fixed.
- "of a function or method" and "`where`-clause variable" are back, in the admission's words. So the sentence has a correct subject, and it no longer reaches a constructor call of an object, which nobody measured.
- The example `where [\nat n\]` separates a clause that binds a new variable in brackets from `where { U extends Named }`, which compiles, links and runs (`WhereBoundFunctionCompiled`). This is the mistake that the failure named.
- `cold-read.md` item 10 ("A call has no `where` clause") is fixed by the same words.

**Quiz.** Case 24 is right in both rounds. Reader 2 read the final text. It wrote (a) as a plain compiled test that passes today, and (b) as the `XXX` run-time pair keyed on row 867, with no wait for the switch-over (`quiz-grade-2.md`, case 24). Neither reader wrote an `XXX` compile test keyed on the old refusal, which is the key's first Wrong answer.

**The second cold read.** It read the change right: "The code generator emits no check, and a compiled call of a function whose clause introduces a variable dies (row 867)" (section 1, "Static parameters", fourth bullet). Its D quotes line 67's first sentence, which this update does not change.

**Weighed, and not a hold: "only the checker checks it".**
- The fix round added these words for `cold-read.md` item 10. In their sentence, which is about the code generator, they are true: on the compiled path nothing else checks the clause (F-181).
- Read alone as a rule of both paths, they are not exact. Walk refuses an object's own constraint at a use of its type (row 777's notes, on row 750), and the paragraph already gives walk's departures (rows 774, 777).
- No reader took the words for both paths. A worker who did would at most expect walk to check less than it does. No test of a rule depends on this. It goes to "Findings", item 7.

#### Line 71, F-270: install

**The change.**
- Old: "Such a call runs compiled only after the switch-over."
- New: "Such a call does not run compiled yet. Until the switch-over, compiled programs do not link `NatReflect`, which is part of walk's library. A second wall stays after it. `NatParam` is declared `comprises { N[\n\] } where [\nat n\]`, so its `comprises` clause lists a type at a `where`-clause size. A compiled call fails the JVM's verification if it passes a value of such a trait where a listed type is expected (row 307). This holds for a program's own trait too."

**Against the sources.**
- `NatParam`'s declaration is `trait NatParam` / `comprises { N[\n\] } where [\ nat n \]` (`NatReflect.fsi:22-23`). The text drops only the spaces inside the brackets.
- F-270: "The code generator compiles such a trait, and a compiled call that opens its value to the size fails the JVM's verification (row 307 ...)". Row 307's notes: "a call that opens its value to the size fails verification, a `VerifyError`".
- The new words for "opens" fit the measured program. `XXXNatOpenRun.fss` declares `mk(): NatParamT`, `size[\nat n\](x: Nt[\n\]): ZZ32 = n`, and calls `size(mk())`: it passes a value of the trait where the listed type `Nt[\n\]` is expected. The paragraph's own second sentence uses the same form for `reflect` ("passed where the object type `N[\n\]` is expected, binds `n`").
- The link sentence is true to the tree. `NatReflect.fsi` is in `ProjectFortress/LibraryBuiltin/` and is none of the prelude's three files (`compiler.md:32`). `build-and-caches.md:124` says that any other file of `Library/` or `ProjectFortress/LibraryBuiltin/` "is walk's library", and "compiled programs do not link it yet". By line 7, the sentence opens "Until the switch-over", so a worker does not add `NatReflect` to the prelude. `compiler.md:34` gives the same order.
- "A second wall stays after it" goes beyond F-270's text, which measures today's tree. It is the admission's reading (F-270's row: "The switch-over does not end this wall"), and the key's case 25 takes it as Expected, with `reflect`'s own compiled run as Open. The sentence that states the wall cites row 307, so by line 7 it is a departure that a fix can change, not a settled rule. `preserve.md` found "After it too" acceptable on the same ground.

**Preservation.** Failures 2 and 3 and the note on the prelude are fixed.
- Failure 2: the shape is now spelled out, at a size. So `AnyList`'s type-variable form (`comprises List[\E\] where [\E\]`), which compiles, links and runs (`ComprisesWhereFunctionalMethodCompiled`), is outside "such a trait".
- Failure 3: "yet" is back.
- The note: "the compiler's prelude has no `NatReflect`" is now "compiled programs do not link `NatReflect`, which is part of walk's library", the note's own suggested wording.
- `cold-read.md` item 9 ("opens", "this shape", no "yet") is fixed by the same changes.

**Quiz.** Case 25 is right in both rounds. Reader 2 read the final text. In (a) it wrote the `XXX` run-time pair keyed on the `VerifyError` for the program's own trait, unchanged at the switch-over. In (b) it named two walls, the link before the switch-over and row 307 after it, "the orientation's 'second wall'" (`quiz-grade-2.md`, case 25). The key names this sentence as the reader's only source for row 307 (case 25, **Skill**), and both readers followed it.

**The second cold read.**
- It read the change right: "A compiled program fails now (`NatReflect` is not linked). It also fails after the switch-over, for any trait whose `comprises` lists a type at a `where`-size (row 307), including my own" (section 1, "Static parameters", last bullet).
- **D (medium-high)** lists "Such a call does not run compiled yet" among sentences that cite no row. The two sentences after it carry the marks of line 7: "Until the switch-over" for the first wall, and row 307 for the second. The reader's own reading puts each wall in its class. So no wrong action follows. Folding the sentence into the next two would remove the flag ("Findings", item 8).
- **S (low)**: "wall" is figurative. The cold reader, both quiz readers and the key read it as a cause that stops a compiled run. No wrong action follows.

**Why the two changes install together.** The old line 71 is the sentence that the admission shows to be false by line 7's own reading of a switch-over limit. No area part names row 307 since `453898c32` (admission, note 1; still true at `53a84b2e6` by `grep`). A hold of line 71 would leave the skill with no true sentence on the subject. If line 67 installed alone, its "compiles" would bring in the mistake that rung G's worker made, "compiles and runs", for a trait of `NatParam`'s shape (admission, F-270's row; `rung-codegen-where/SKEPTIC.md:101`).

### The unchanged parts

Nothing changed in the opening, "Dispatch and overloading", "Traits and objects", "Numbers", "Reductions and comprehensions" or "Implementation limits". Their text in the part stays as it is.

## Size

- **Before:** the current part, 19,181 characters (`wc -m`; the file is ASCII, so bytes are the same).
- **After:** `orientation.md`, 19,773 characters, 592 more. All of it is in "Static parameters, `where` clauses and sizes", 3,045 to 3,637:
  - line 67: 387 to 569 (+182);
  - line 71: 229 to 639 (+410).
- **By round:** the writer's first text added 276 (`writer-1.log`). The fix round added 316 (`writer-2.log`).
- **The other parts:** the opening 1,660, "Dispatch and overloading" 3,355, "Traits and objects" 5,528, "Numbers" 3,041, "Reductions and comprehensions" 1,722, "Implementation limits" 830, all unchanged.
- **Budget:** 8,000 to 12,000 characters (the workflow's `README.md`, "update"). The part was 7,181 over before this update and is 7,773 over after it.

**Size exception: accepted for this install, and the conflict is exposed again.**
- **Why it is accepted.** Every added clause does one of three things:
  - states one of the two admitted corrections, whose mistakes are on record: the two `XXX` tests keyed on the old refusal, and rung G's worker's "compiles and runs" (admission, F-181's and F-270's rows);
  - repairs a preservation failure: "of a function or method", "`where`-clause variable", the shape of the trait, "yet", and the cause of the first wall;
  - closes a first cold read item on the new text: items 9 and 10.

  Cutting any of them would bring back a failure of the reports (synthesis, "Acceptance and maintenance").
- **The competition for space was applied.** The admission admitted 2 of 17 entries. Each rewrites one sentence, and neither adds a rule.
- **What overran.** The admission estimated about 250 characters for both. The preservation check showed that the admission's own suggested sentences lost two conditions and a qualifier. Their repairs cost the rest.
- **What a later writer could save.** About 100 characters: fold "Such a call does not run compiled yet." into the two walls, and shorten the shape sentence. That does not change the conflict.
- **The conflict.**
  - This is the third update in a row whose judge accepts an exception. Climb batch 21 grew the part from 15,792 to 17,410 characters. Climb batch 21b grew it from 18,155 to 18,749, and its install fixes (`1c10695d7`, `dab13f1ef`) brought it to 19,181. This update brings it to 19,773.
  - An update rewrites only the sentences that its entries change, so it cannot recover the overrun.
  - About 7,800 characters must leave the part to reach 12,000. Earlier judges named the ways: a consolidation that moves path departures to `interpreter.md` and `compiler.md`, or a new budget. The coordinator decides which, and when.

## The install

For the coordinator and the skill writer:

1. **The part.** Install `orientation.md` whole as `references/revival-changes.md`. Its only differences from the current part are lines 67 and 71 (`diff`). The other parts are identical.
2. **The sources.** Add `sources-mapping.md` to `references/sources.md` as a dated entry (synthesis, "Sources audit and provenance during consolidation", step 3). It maps both hunks to F-181, F-270, rows 307, 701 and 867, and the report lines.
3. **The cold read.** Then the cold read of the installed part (the workflow's `README.md`).
4. **The regression quiz.** `explorations/coordinator/tools/orientation/regression/questions.md` and `key.md` are changed in the working tree and not committed. Cases 24 and 25 are new there. Commit them with the install. The quiz graders' "added on `main` at `453898c32`" means the base that they were written against. Before the commit:
   - Case 24 (a) names its function `label`, which is a reserved word (`Keyword.rats:39`), so the program as given does not parse. Both readers saw this and renamed it (`quiz-grade-1.md` and `quiz-grade-2.md`, case 24). Rename it in `questions.md:65` and `key.md:287`. The tree's own test uses `g`.
   - The admission's note 7 says that case 23's pointer to walk's `Int$Div` (`key.md:281`) is stale: `ZZ32`'s `DIV` names `simpleIntArith.intOverflowingDiv` (`FortressLibrary.fss:779`). The pointer is still there.

No verdict here depends on an edit of an area part. The admission's notes for the coordinator stand as follows at `53a84b2e6`:
- Note 3 (the identity transfers) and note 4 (row 864) are met by `53a84b2e6` (`compiler.md`, "Natives": "The transfer helpers return their argument unchanged"; `interpreter.md:113`).
- Note 1 is still open: no area part names row 307 (`grep`). The orientation's line 71 is now its only home.
- Note 2 is still open: F-304, row 862, is in no skill part.
- Note 5: P-151's and P-156's sentences on the old refusal are the curator's text (PLAN, gather.1 of climb batch 24). The orientation repeats none of them, and line 67 cites rows, not P-151.
- The curator's answer to G.skeptic.1 (PLAN) may make the code generator refuse row 867's form at compile time. If he takes it, line 67's second sentence and case 24 (b) both change.

## Findings on unchanged text, for the next update

None of these is a hold. Items 1 to 6 are on text that this update did not change, so a hold would keep the same text. Items 7 and 8 are on the new text, and neither sends a worker wrong (weighed above). Where both cold reads flag a passage, both are named.

1. **Line 45, the order to write `I extends Index` and its compiled limit** (`cold-read-2.md` F, medium-high; `cold-read.md` item 3, medium-high). This is the third update whose cold reads flag it. Climb batch 21b's judgement asked for the limit beside the order ("Findings", item 2). `cold-read-2.md` G and `cold-read.md` item 14 add that the reason given for `a[3]` rests on `IntLiteral`'s conversion, which line 77 introduces later.
2. **The opening's reading scheme: departures that cite no row** (`cold-read-2.md` D, medium-high; `cold-read.md` item 8). Line 67's first sentence (the checker's silent unconditional reading), line 54 (`OPEN` in overload comparison), line 69 (walk's negative size exponent) and line 99 (walk's `Maybe` condition). Climb batch 21b's judgement, item 1, lists most of these.
3. **What to cite for a bold rule without a P-N** (`cold-read-2.md` A; `cold-read.md` item 1). The fix is a change to the core's citation rule, and is the coordinator's.
4. **Line 60, P-51 against row 705, and line 81, rows inside an "Until the switch-over" paragraph** (`cold-read-2.md` L and E; `cold-read.md` items 6 and 7). In each, a worker cannot tell whether walk's or the prelude's behaviour is a fix to make or a limit to leave.
5. **Line 32, `override`** (`cold-read-2.md` H; `cold-read.md` item 5): two readings of "only where", and whether a widening `override` belongs in the one library while the code generator refuses every one (row 650).
6. **Line 95, an empty `BIG MAX`, `BIG MIN` or `BIG //`** (`cold-read-2.md` O; `cold-read.md` item 16): the text does not say what it gives. Also line 54's `pick` example (`cold-read-2.md` K; `cold-read.md` item 8), which climb batch 21b's judgement (item 4) already counted three reads against, and line 101's row 405 (`cold-read-2.md` P; `cold-read.md` item 15).
7. **Line 67, "only the checker checks it."** Say "on the compiled path, only the checker checks it", or cut the clause. Walk refuses an object's own constraint at a use of its type (row 750).
8. **Line 71, "Such a call does not run compiled yet."** Fold it into the two walls, for example: "Two walls stop such a call compiled. Until the switch-over, ... After it, ... (row 307)." This removes `cold-read-2.md` D's flag on the sentence, and saves characters.
