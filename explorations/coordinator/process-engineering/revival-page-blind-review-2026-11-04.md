# Review of the revival page: text A and plan B

A is the current page text, and B is the proposed order. "Part N" and "line N" are in A. "Section N" is in B. An outsider is a reader who is not a member of the project.

## 1. A as a story, read fresh

**What A gives an outsider.**
- Part 6, "The team left three sources that disagree" (lines 293-301), tells why the revival changes the language.
- Part 6, "Example: the number types" (lines 303-310), shows that method on one case.
- Part 1 (lines 21-27) gives facts that a reader can check, such as 10.9 s against 22 ms for one training step.

**What A does not give an outsider.**
- A never says what Fortress is. Line 9 only names its designers.
- A never says who does the work. Only line 28 ("worker agents") and line 30 ("outside this session") show that AI models do it. A uses "curator" 22 times, from line 5, and never defines it.
- The rule ("custodians, not authors") comes at line 282. I read 280 lines before I knew why any change was made.

**Where I could not follow.**
- Part 2 is not in date order. The post-mortem of 09-29 (line 150) comes after batch 22 of 10-24 (line 141). Part 4 then goes back to 10-04.
- No part says what batches 11 to 13b did. Line 63 refers to part 4, and part 4 (line 202) gives only a start time.
- In the decisions list, 09-19 (line 78) comes after 09-26 (line 73), and five entries (lines 74-77, 79) have no date.
- A tells most changes three times, in parts 2, 5 and 6: overflow at lines 72, 230 and 363; the integer power at lines 81, 231 and 365; the self type at lines 85, 259 and 346.
- A contradicts itself. Line 90 says that the distance counts "every error over all the library's files", but line 163 says that it covers twelve components. Line 14 says "The checker accepts the one library", but line 157 says that the zero rests on three readings.

**Terms used before their definition.** "the ladder" (used at line 54, defined at 57); "coercion" (70, 229); "functional methods" (252, 314); "closed traits" (136, 345); "reduction" (160, 317); "tokens written" (143, 145). Never defined: "curator" (5), "coordinating session" (35), "the record" (52), `atomic` (54), "component" (106), "both programs" (134), "Fable judge" (215), "the protocol" (284).

**Content that only a member needs.** The notes for the curator (lines 1, 5); row 148 (line 39); the batch names 3.5, 6b, 7R and N (line 63); the machine restart (line 137); the token counts (lines 143-148); most of parts 3 and 4; the source paths.

**What I would change.**
- Add an opening that says what Fortress is, who does the work, and who the curator is. Put lines 282-310 after it.
- Tell each change once, by area: what a programmer sees (part 5) and which sources disagreed (part 6).
- Cut part 3 to line 184 and one sentence from line 179. Add one paragraph on batches 11 to 13b.

## 2. B against A

- **Section 1.** It adds what Fortress was and the measure. It does not say that AI agents do the work or that a curator directs them.
- **Section 2.** It removes the lines for each batch and the token list. But it uses "checker count", "distance", "phase", "walk" and "compiled path" before sections 3 and 5 define them. This is the largest fault in B's order. Write the block with no undefined term, or move it after section 5.
- **Section 3.** It moves lines 282-301 to the start, and so answers my main finding on A. It omits "the prelude", which the definition of the switch-over needs.
- **Section 4.** It cuts the run letters and row counts, but keeps "the map" and "the sealed tree", which neither terms list names. Its phrase "the runs that hunted gaps" is figurative.
- **Section 5.** It joins what A spreads over lines 49-55, 73 and 87-91. Keep line 91 ("A fix can raise both"): without it, the rise after batch 15b (line 106) reads as a loss. Without "the ladder", lines 57-61 need a plain description.
- **Section 6.** An order by phase removes the date disorder of lines 67-85. But a decision built over several phases splits: the inference rule (line 75) took batches N, 8, 9 and 11. B ends phase 3 on 30 October, and A gives its exit as 10-24 (line 155). B does not say where part 4 goes. I would miss the type-decisions review (lines 213-217), because it changed a decision.
- **Section 7.** It keeps 2.6K of member detail between the history and the language. Part 3 has no passage on tuning agents; that cut may mean part 4. Cut this section to 0.5K and put it after section 9.
- **Section 8.** "Part 5 whole" keeps the faults of lines 252 and 261: "functional methods" and "closed traits" come before section 9 defines them.
- **Section 9.** It keeps the 17 contradictions, which an outsider needs. Sections 6, 8 and 9 still tell each change three times. Merge sections 8 and 9 by area. From the cut quiz passage, keep line 310.
- **Section 10.** The glossary at the end does not help section 2.

**The terms lists.** "Terms that go" matches what I did not need. "Terms that stay" omits terms that the page still uses: "curator", "agent", "team", "checker", "the one library", "the prelude", "gap ledger", "sealed tree", and "tokens" if section 6 tells what went wrong. It does not choose between "walk" and "the interpreter", or between "compiled path" and "the compiler".

**The order I would use.**
1. Opening: Fortress, the revival, the curator and the agents, the measure.
2. The rule and the three sources (section 3).
3. How the work runs, with the two numbers (section 5).
4. Where it stands (section 2).
5. The 2012 tree (section 4), then the phases (section 6).
6. The changes by area: sections 9 and 8 in one.
7. The record, short (section 7).
8. Glossary (section 10).

## 3. ASD-STE100 applied

**Paragraphs with two topics.** Line 14 (a definition and a status); line 39 (row counts, row 148, the start of FACTS and POSITIONS); line 63 (the aim of the batches, their names, pointers); line 75 (two rules and their status); line 85 (a decision and a definition); line 165 (a batch, a definition, questions, an estimate).

**One word for two things.**
- "exclusion": the rule that no type extends two instantiations of one generic trait (line 307), and the relation in which no value fits two types (lines 80, 306).
- "run": the exploring runs (line 35), a batch run (line 180), and walk running a program (line 10).
- "check" and "review": the golden, walk, export and gate checks; the batch, merged-diff and type-decisions reviews, and "the review's default" (line 157).
- "library": two libraries (line 13), then "the library" for the one library (line 232).

**Two words for one thing.** "walk" and "the interpreter"; "the prelude" and "the compiler's library" (lines 229, 299); "the coordinating session" (line 35) and "the coordinator" (line 193); "batch" and "climb batch" (line 165).

**Figurative words.** "climb", "ladder", "rung" (lines 51-61); "side quest" (37); "territory map" (41); "sealed" (42); "folds" (39, 53); "stand side by side" (80); "red" and "green" (91, 134); "rests on" (157); "stand" (217); "die" (342).

**Sentence rules.**
- Too long: line 75 (40 words), line 136 (33 words), line 41 (about 30 words).
- No main verb: lines 137, 138, 141 and 143.
- Passive voice: lines 76, 179, 208, 287 and 291.
- A sequence in a sentence, not a list: lines 73, 153 and 200.
- Procedure order: lines 49-55 put two processes in the skeptic step (line 52). Number the current steps. Give the old process in one sentence after them.

**What B meets, and what it leaves to the writer.**
- B meets one topic per section: status, history and reference are apart.
- B partly meets "a term defined before it is used": section 3 does so, but sections 2 and 8 break the rule.
- B partly meets "no figurative words": it removes "ladder", "rung" and "climb", but keeps "gate", "landing" and "sealed tree", and adds "hunted".
- B partly meets "one word for one thing" (see part 2).
- B leaves to the writer: one topic per paragraph, sentence length, the active voice, a verb in each sentence, lists for sequences, and numbered steps.

## Report

1. A never says what Fortress is, who does the work, or who the curator is. The rule that explains each change (lines 282-301) comes last.
2. A tells most changes three times (parts 2, 5 and 6), and gives no account of batches 11 to 13b.
3. A uses terms before their definition or never defines them. It uses "exclusion", "run", "check" and "library" each for two or more things.
4. A contradicts itself on the scope of the distance (line 90, line 163) and on the checker's acceptance (line 14, line 157).
Verdict on B: its order is better than A's. It puts the rule first, cuts member detail and orders decisions by phase.
But section 2 uses five terms before sections 3 and 5 define them, and sections 6, 8 and 9 still tell each change three times.
My order: opening with the curator and the agents; the rule; how the work runs; where it stands; the 2012 tree and the phases; the changes by area, each told once; the record, short; glossary.
