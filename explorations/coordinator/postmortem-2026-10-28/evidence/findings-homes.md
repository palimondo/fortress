<!-- The 30 findings of the foundations review on 18 POSITIONS entries, each sorted into its home by record.md's rules (the entry's text, its history, FACTS, or no change), with what the corrections run of 2026-10-28 and 2026-10-29 did with it, by an Opus worker on 2026-10-29. -->

# Where each finding belongs

## Summary

Of the 30 findings, 8 belong in the entry's text, 7 in its history, 6 in FACTS (4 already held, 2 new), and 9 need no change (the curator's word, or the record holds it). The run left all 9 of the last kind and wrote a question for each, as it should. It wrote all 13 history and FACTS findings into the entries' texts. The 8 text findings each need a few words or one sentence; the run often wrote more. Three history findings and one FACTS finding remove false words from the text, a cut only. So 9 entries should change, most by a cut or one sentence, and 9 should not. The run changed 14, and the 18 grew from 16.3K to 19.8K characters. A fair rewrite would leave them about as long as before.

## Sources and terms

- Findings: `explorations/reviews/foundations/evidence/salvage-findings.md`, by entry and letter.
- The run's texts: `explorations/reviews/foundations/evidence/corrections/{p,c1,c2}/final.apply`; its questions: `queue.md` beside each; lengths: `corrections/summary.md`.
- The rules: `.claude/skills/coordinator/references/record.md`, "What an entry is". The curator's words: `explorations/coordinator/HELD.md`, 05:35 and 05:49 UTC on 10-29.
- Text: the finding changes what a reader decides or requires. History: a correction of the entry's grounding or provenance, in `POSITIONS-history.md`. FACTS: a fact about the tree or the sources, and the entry points to it. No change: the record holds it already, or it needs the curator's word.
- Item N is an item of the review queue.

## The 30 findings

**P-7**
- Two kinds of compiler work are mixed. No change. P-7 already sends the reader to P-26, which owns which work counts. Run: left it; wrote a question that P-26's questions cover.

**P-12**
- The step is bigger than stated: Scala checker off, no `CoercionInvocation` case, errors in the imported components. FACTS, held. F-9 and F-290 state all three; P-12 already points to F-9. Run: changed the text, three sentences.

**P-17**
- The specification's own words on unboxed values are not cited. History. His reason stands, and a reader does the same with the citation or without it. Run: changed the text, one long sentence; wrote a question that widens P-17 to every number type, which no finding asks.

**P-26**
- (a) A JVM limit ranks a language text, and 2009 code counts as "later". No change: his word. The sentence is his own reason and his own list. Run: left it; two questions.
- (b) "The implementers' later word also outweighs unfinished text" has no source. No change: item 215 holds it. A strike changes a ranking rule that other entries use, so it is his call. Run: left it; asked item 215 again.
- (c) The six rules for weighing sources are missing. No change: his word. The rules are the judge's reasoning. Run: left it; a question.

**P-27**
- Read alone, it led a reader to settle a choice between two team designs by library practice (scenario 2). Text, one short sentence of scope, at his review, since it narrows his rule. Run: changed the text and the title (+67%).

**P-33**
- "The interpreter's whole library" is wider than the twelve that F-53 counts. Text, a few words. He agreed that "whole" is wrong (10-26 04:47:50). The 38 other components and the two zeros of phase 4 are in F-290, F-289 and F-34, and in item 283. Run: changed the text. Its added sentence, "the library's other components are not part of phase 3", is one cause of scenario 4's fail. Two new questions, item 283 asked again.

**P-37**
- (a) His reason is missing: avoid porting walk's library into the compiler's. Text, one sentence. It is his reason, and it cuts against a bridge for `CompilerSystem` (scenario 4). Run: changed the text, a two-part "Why".
- (b) A permission to take a prelude design has no rule. No change: his word. The rule is the judge's. Run: left it; a question.
- (c) The premise is unmeasured: the library checks, but is not shown to run, compiled. FACTS, held: F-34. The entry may point to F-34 in a few words. Run: changed the text, one sentence.
- (d) `CompilerSystem`, a fourth wired file, falls outside the three files named. FACTS, new: the file is wired, is not in the prelude, and 27 compiled tests import it. Whether it goes is his word. Run: changed the text, two sentences that state the gap; a question. These words are the other cause of scenario 4's fail.

**P-42**
- (a) "Functions": the texts disagree, and his yes rested on tuples. Text, cut one word. The entry claims more than the sources agree on. Item 218 closes at his review. Run: cut it.
- (b) "The switch-over ends the departure" is false: one line of `Shell.java` sets `Object`. Text: replace the clause with a pointer to F-289 (row 412). A reader would wait for the switch-over to fix it. The tree's detail stays in F-289 and F-291. Run: changed the text, three sentences with rows 339 and 832.
- (c) The grounds are missing: POPL 2019 and the Working Draft's instantiation sentence. History. The bound and its reason stand. Run: changed the text, a "Why" sentence.
- (d) The example "arrays indexed by pairs" is stale since P-156. Text, swap the example. A false example misleads. Run: swapped it for `zip`.

**P-43**
- (a) Two reasons are not his. No change: items 219 and 220. Run: left them; asked both again.
- (b) The language's grounds for the exclusion rule are missing. History. The curator said so of this very text (05:35). Run: changed the text.

**P-58**
- (a) The present text gives no reason; the form is outside the language. History. The ground is the judge's, and the decision is the same with it or without it. His own reason comes with his informed yes. Run: changed the text, a "Why" through P-27.
- (b) His informed yes is owed. No change: item 282, ask 4 of the boot note. Run: left it; asked item 282 again.

**P-59**
- "MicroGPT's static types are concrete" is the coordinator's premise, unmeasured. Text, strike one sentence. It is not his, and a reader would rely on it. The history keeps it, and item 221 closes at his review. Run: struck it.

**P-84**
- Stamping alone gives no `double[]` field, and way A4 is unmeasured. FACTS, held: F-18. P-84 already points to decision A through P-85. Run: changed the text, one sentence that restates F-18.

**P-85**
- His lean of 2026-09-20 is in no entry. No change: his word. A lean to confirm is not a decision, and POSITIONS holds only decisions. Run: left it; a question.

**P-146**
- (a) "The checker reads the library as the team wrote it" led a reader to drop a rung (scenario 2). Text, replace that sentence with his reason of 10-13 (weak signal, precedent in other languages). Run: changed the text; its new "Why" carries the dates of finding (b) too.
- (b) The idiom's history misses Steele's last edits of 2012-06. FACTS, held: F-225 holds the dates. Run: wrote the dates into the text.

**P-153**
- Compiled-path code is called the language's later word. History, and a cut of the false clause from the text. The decision stands. The judge's ground, that only the prelude's power was built, is for his word, as the run's question asks. Run: changed the text, two sentences of new ground; a question.

**P-154**
- "Later" cannot be shown for the draft, whose date is unknown. History, and a cut of the label "the team's later word". He accepted the decision on 10-20, and it stands on that. Run: changed the text, two sentences; a question whether the decision stands.

**P-155**
- The batch reads it as covering the export check. No change: item 279, ask 1 of the boot note. Run: left it; asked item 279 again.

**P-158**
- (a) "The specification asks for no body there, not for no declaration" is false. FACTS, new: what the export rule (`source-code.tex:372-385`) asks. Cut the false sentence from the text. Whether P-158 stands against the rule is item 280. Run: changed the text, with "so the decision rests on the team's later work alone", the knot that the curator named at 05:49.
- (b) The member check dates from 2009, not 2012. History, and cut "of 2012" from the text. Run: changed the text, a new clause on the team's check.

## Totals

- Text: 8 (P-27, P-33, P-37 a, P-42 a, b and d, P-59, P-146 a). The run changed all 8, and wrote more than needed in P-27, P-33, P-42 b and P-146 a.
- History: 7 (P-17, P-42 c, P-43 b, P-58 a, P-153, P-154, P-158 b). Three of them also cut false words. The run wrote all 7 into the texts.
- FACTS: 6. Held: P-12 (F-9, F-290), P-37 c (F-34), P-84 (F-18), P-146 b (F-225). New: P-37 d (`CompilerSystem`), P-158 a (the export rule). The run wrote all 6 into the texts.
- No change: 9 (P-7, P-26 a, b and c, P-37 b, P-43 a, P-58 b, P-85, P-155). The run left all 9 and wrote a question for each.
- So 21 of the 30 changed the texts in the run, and 8 of those belong there.

## Each entry: what should change, against the run

Lengths in characters, old to the run's, from `summary.md`.

- P-7, 890: none. Run: none.
- P-12, 656 to 1100: none, or a few words on the F-9 pointer.
- P-17, 495 to 754: none.
- P-26, 1166: none until his word. Run: none.
- P-27, 452 to 754: one short sentence of scope, title kept.
- P-33, 913 to 1060: a few words, "whole" to the twelve that F-53 counts. The run's added sentence misled.
- P-37, 1056 to 1653: one sentence of his reason, and a few words of pointer to F-34. The `CompilerSystem` sentences go.
- P-42, 639 to 1126: a word cut, an example swapped, a clause replaced by a pointer: about the old length.
- P-43, 662 to 950: none.
- P-58, 1148 to 1376: none.
- P-59, 930 to 774: strike one sentence. Run: the same.
- P-84, 938 to 1138: none.
- P-85, 851: none. Run: none.
- P-146, 1284 to 1568: one sentence replaced: about the old length.
- P-153, 1142 to 1257: a cut, so shorter.
- P-154, 1115 to 1270: a cut, so shorter.
- P-155, 1080: none. Run: none.
- P-158, 867 to 983: two cuts, so shorter.

So 9 entries should change: 6 by a few words or one sentence (P-27, P-33, P-37, P-42, P-59, P-146) and 3 by cuts only (P-153, P-154, P-158). Nine should not change. The run changed 14, 5 of them where nothing should change (P-12, P-17, P-43, P-58, P-84).

## The same 30 findings by significance

One test: does the finding change what a reader of the entry decides or does in the work, or would any reasonable reader already read the entry that way? Consequential: a reader decides or does otherwise. Minor: a true correction that changes no decision; it belongs in the history or FACTS, or is a word. None: a quibble; any reasonable reading already gives it.

- P-7: none. The entry already sends the reader to P-26.
- P-12: minor. F-9 holds the step's parts, and P-12 points there.
- P-17: none. "Doubles" stands for every primitive number type that speed needs, and the specification's words change nothing.
- P-26 (a): consequential. A reader would rank 2009 prelude code above the 2011 Working Draft.
- P-26 (b): consequential. The sentence is a ranking rule that readers apply to other forks.
- P-26 (c): minor. Its one rule that cuts, the date test, is (a)'s.
- P-27: consequential. Read alone, it led a reader to drop a rung (scenario 2).
- P-33: minor, a word. The entry's parenthesis already ties phase 3 to F-53's distance.
- P-37 (a): consequential. Without his reason, a reader planned a bridge for `CompilerSystem` (scenario 4).
- P-37 (b): consequential. With no rule, a reader can take a prelude stub as a design that binds.
- P-37 (c): minor. F-34 holds it, and the decision stands.
- P-37 (d): consequential. At the switch-over, a reader cannot tell whether `CompilerSystem` goes.
- P-42 (a): minor, a word. The bound is `Any` either way.
- P-42 (b): consequential. A reader would wait for the switch-over to end the departure, and no step does.
- P-42 (c): minor. The grounds go to the history.
- P-42 (d): none. Element types such as `(E,F)` still need the bound, so the rule reads the same.
- P-43 (a): minor. The decision stands, and the wrong-layer use of a reason is P-26 (a)'s.
- P-43 (b): minor. The grounds go to the history.
- P-58 (a): minor. The grounds go to the history.
- P-58 (b): consequential. His informed yes must come before climb batch 23. Item 282 holds it.
- P-59: minor. Walk is unchanged whether the premise holds or not.
- P-84: minor. F-18 holds it, and the store waits either way.
- P-85: minor. The questions stay open with no default, lean or not.
- P-146 (a): consequential. The reason led a reader to drop a rung (scenario 2).
- P-146 (b): minor. F-225 holds the dates.
- P-153: minor. The power's rule stands. The wrong ground misleads only as P-26 (a) does.
- P-154: minor. The list rule stands on his acceptance.
- P-155: consequential. Whether the export check reads symbolic operators changes a rung's work (row 782).
- P-158 (a): consequential. The false sentence hides a departure from the specification's export rule. That departure needs a revision recorded (P-95) or his word against it (item 280).
- P-158 (b): minor. The decision stands. The date bears on item 280.

**Counts.** Consequential 11, minor 16, none 3.

**The consequential ones.** P-26 (a), P-26 (b), P-27, P-37 (a), P-37 (b), P-37 (d), P-42 (b), P-58 (b), P-146 (a), P-155, P-158 (a).

**Against the first sort.** Of the 11, five wait for his word in the review queue or as a question: P-26 (a) and (b), P-37 (b), P-58 (b), P-155. Two go to FACTS with his question: P-37 (d), P-158 (a). Only four need new words in the text: P-27, P-37 (a), P-42 (b), P-146 (a). The run wrote 13 of the 16 minor findings and two of the three none findings (P-17, P-42 d) into the texts.
