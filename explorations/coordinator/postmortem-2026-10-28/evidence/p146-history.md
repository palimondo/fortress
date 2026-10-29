<!-- P-146's history for the post-mortem: the five versions of its line and six history blocks, where its words on the library's text come from, what the corrections run's block does with them, his words by timestamp, the trap-test scenarios that name it. Evidence only. -->

# P-146: the history of the library words

Views: `explorations/coordinator/tools/facts-extract.sh 'history:P-146'`; his words, `python3 -I explorations/coordinator/curator-profile/show.py <UTC prefix>`; the coordinator's turn he answered, `python3 -I explorations/coordinator/positions-audit/tools/near.py 2026-10-13T23:32:11Z 1m`; a version, `git show <commit>:explorations/coordinator/POSITIONS.md`, line `- P-146`.

## 1. Result

- Both library sentences stand in the entry's first line, `fe7051d7a` (2026-10-13 23:38:38Z), and in all five later versions: no rewrite added them. The only words a rewrite added to that Why are the clarity pass's "the checker", "for the closure of `AnyIntegral`" and "that peer languages" (`6b560762f`). The run cuts that clause and keeps the first sentence (section 4).
- The run's block is unapplied: `9ac8b7810` says "nothing applied to POSITIONS"; line 59 of POSITIONS.md equals `cc636ae5a`'s version byte for byte.

## 2. Versions and blocks

A block holds the line it replaced (POSITIONS-history.md header), so `:1250` holds V0, `:1648` V1, `:1882` V2, `:2888` V3, `:3076` V4.

- V0 `fe7051d7a` 10-13 23:38:38Z, `:1236` "added · from `explorations/reviews/self-typed-bodies-judgement.md`, "For Pavol" · by coordinator". Words: "The library's text gains no self type and no `comprises` clause, and walk is unchanged." and "Why: it reads the library as the team wrote it, as P-44 does, by one rule the peers share."
- V1 `c5210e202` 10-14 06:10:08Z, `:1250` "the POSITIONS pass after climb batch 14". Only "Still to build: batch 14's rung S." became "Built by climb batch 14 (`1c32ccffd`)."
- V2 (audit c5) and V3 (clarity) both in `6b560762f` 10-22 08:30:36Z, "at his word of 08:19 UTC". `:1648`: "by the full run's writer for chunk c5 (Opus), proposed for his review ... The rest kept". `:1882`: "meaning unchanged from the audit's proposal ... the label "way 6" struck; the conformance rule stated". V3's Why is the "Cut" text of section 4. Word diff V2 to V3: "it reads" to "the checker reads"; "as P-44 does," to "as P-44 does for the closure of `AnyIntegral`,"; "the peers" to "that peer languages".
- V4 `382289832` 10-22 12:37:25Z, `:2888` "the scrape ... at the curator's word of 2026-10-22" (no minute). "Built (F-225 states the rule as built)." to "F-225 states the rule as built."
- V5 `cc636ae5a` 10-23 13:05:32Z, `:3076` "P-157 as he decided it at 13:03:22 UTC". Adds "Only the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X` (P-157)." This is line 59 now.

## 3. Where the words came from, and the two passes

- `self-typed-bodies-judgement.md:90` (911a4f2b0, 10-09): "bring the checker to read what the library says, not rewrite the library round the checker"; `:94`: "no clause enters the library".
- Coordinator, 10-13 23:24:28.785Z (transcript fe616d40, `parts/001.jsonl:6173`): "it reads the self type from the bound the library already writes ... That's my reading, not his words." and "Your `AnyIntegral` closure decision. There you had the checker read the library as the team meant it ... Option 1 is the same move." At 23:32:24.772Z (`:6243`): "The library's text doesn't change at all; only the checker learns a rule."
- Audit, `positions-audit/full/evidence/corrections-c5.md`, "P-146" item 3: "The Why: unchanged (rules 0 and 7). It is the coordinator's reasons, which he restated in part at 23:32:10.196Z ... "As P-44 does" is the coordinator's parallel. ... It neither narrows nor adds." `judgement-c5.md`: "The peers half is his; "as P-44 does" is the coordinator's. Fair, not his own reason word for word."

## 4. The run's block (`c1/final.apply`) against line 59

- Kept word for word: "The library's text gains no self type and no `comprises` clause, and walk is unchanged."
- Cut: "the checker reads the library as the team wrote it, as P-44 does for the closure of `AnyIntegral`, by one rule that peer languages share."
- Changed to: "Why: the team's later texts point, if weakly, toward the rule, and peer languages share it."
- Added: "The compiler's prelude writes the self type as a `comprises T` clause instead, and that form does not bind the library: Naden's write-up on the Return Type Rule (P-26 names it), later than the team's last edits of that clause, puts the self type in bounds only, the form `X extends C[\X\]` that the library writes."
- "F-225 states the rule as built." became "... as built and holds the dates."
- The run's reasons: `proposals.md` "P-146": "The comparison with P-44 left with the old clause. It was the coordinator's reason, not the curator's"; `judgement.md`: "'the library's own form' is gone". Its round one had "the rule follows the library's own form of the self type, the bound `X extends C[\X\]`" (`check.md`, "P-146" item 1); `writer-2.log`: "was the coordinator's reading, and it brought back the ground the finding faults." The block's note names "grades.md section 4, POSITIONS 146, scenario 2; key.md scenario 6".

## 5. His words (UTC; `show.py` prints each)

- 10-13 23:13:41.506Z (`:1236`): "Instead you should have explained what the trade offs for your options 2 and 3 are."
- 23:23:46.460Z (`:1236`): "I’m unclear how clear the signal from later team’s decisions is that justifies removal of `comprises`…  does latest POPL2019 paper help us decide this or not?"
- 23:32:10.196Z (`:1236`, `:1648`): "I’m still unclear on what the consequences are, but am hearing that option 1 is more in line with weak signal from repo and has precedent in other languages as well, so you’ll probably know got to implement that? And it is not a removal of `comprises`?"
- 23:37:34.404Z (`:1236`, `:1648`, `:1882`): "1. Let’s also decide item 51, of that fits into batch, too."
- 10-14 00:07:32.184Z (`:1648`): "I don’t recall wording anything about mixins. ... I feel extremely out of my depth here. ... These aren’t informed decisions I am making."
- 00:12:14.696Z (`:1648`): "Yes, that's how I want it."
- 07:10:28.105Z (`:1648`): "if, if the numerator, numerator is an easier choice, it sounds like just something that you are informing me about a choice that you did, then let's unblock this"
- 10-22 08:19:30.563Z (named in `6b560762f`'s message): "I think I can approve this"
- 10-22 11:04:09.395Z (nearest to `:2888`, which names no minute): "Yes, to the scrape and then the report"
- 10-23 13:03:22.473Z (`:3076`): "Yes, of course, option one. That was my original stance, so you talked me out of it this morning and the reason prevailed."
- 10-29 06:49 page comment: not in the transcripts (`show.py 2026-10-29T06:4`: none); only `HELD.md:9` (`20563d883`): "he recalls that a previous rewrite of this entry explicitly added the part the run now dropped; a scout checks."

## 6. Trap-test scenarios naming P-146 (`explorations/reviews/foundations/evidence/trap-test/`)

`questions.md` §2 (`:35-59`) and §6 (`:125-145`). §2's reviewer (`:45`): "Drop the rung. P-146 settled the self type. ... the checker reads the library as the team wrote it." §6's worker (`:131`): "P-146's reason is that the checker reads the library as the team wrote it".

`key.md` §2, date sentences: `:82` '"Later" is a date: a prelude line counts as the team's later word only if it is later than the library's text on the same shape and no later text of the team's on the language contradicts it.'; `:83` "Naden's write-up, dated 2012-08-31" ... "later than Steele's edits" ... "only in bounds"; `:85` "The reason to drop the rung is the dated later word, not the prelude's status."; `:110` "the finding tested by date: Naden's text of 2012-08-31, later than Steele's edits, points to the bound-based form, and POPL 2019 has no self types, so the spelling does not bind".

`key.md` §6: `:215` "The rule's ground is the meaning of the self type in the team's dated word, not the library's text." and "Naden's text of 2012-08-31, later than Steele's edits, puts the self-type idiom in bounds only ..., the F-bound that the library writes (F-225)."; `:235` "grounded in what the self type means in the team's dated word (Steele's message or Naden's text of 2012-08-31)". `:223` lists as inviting the wrong decision P-146's Why and "The library's text gains no self type and no `comprises` clause".

`key.md:26`: scenarios 5 to 9 were "written blind to the corrections run" and give "no score from 10-26". `grades.md:212-217` (scenario 2): "The library's text gains no self type ... gave both readers the right verdict on the rung, which was better." and "Why: the checker reads the library as the team wrote it" "invited the reviewer's ground". Run's scores (`c1/checks.md:66-67`): scenario 2 "new 3, old 3"; scenario 6 "new 2 then 3, old 3 then 3".

## 7. Did he approve the Why? (transcript fe616d40, `parts/001.jsonl`)

Coordinator before "1.": 23:24:28.785Z (`:6173`): "Your `AnyIntegral` closure decision. There you had the checker read the library as the team meant it, rather than rewriting the library to suit the checker. Option 1 is the same move." 23:32:24.772Z (`:6243`): "The library's text doesn't change at all; only the checker learns a rule." The Why text is first in the transcript at 23:38:28.588Z (`:6297`, a tool call, 54 s after "1."); no message to him holds it.

Coordinator after: 00:08:24.734Z (`:6493`): "I've taken option 2, because it follows the reason for your choice: read the team's library as the team wrote it. It goes on your review list." ... "Is that how you want it?"

His answers, whole (23:13:41 and 07:10:28 mention neither the Why nor the library; `show.py` prints both):
- 23:23:46.460Z: "What I am hearing is that we are reconciling contradiction between old spec wording, missing checker feature (that option 1 will implement) and  I’m unclear how clear the signal from later team’s decisions is that justifies removal of `comprises`…  does latest POPL2019 paper help us decide this or not? It didn’t use the keyword and modeled the self types in the way option 1 you recommended? Did we already make earlier decisions in the revival that have bearing in the choice now?"
- 23:32:10.196Z: "I’m still unclear on what the consequences are, but am hearing that option 1 is more in line with weak signal from repo and has precedent in other languages as well, so you’ll probably know got to implement that? And it is not a removal of `comprises`?"
- 23:37:34.404Z: "1. Let’s also decide item 51, of that fits into batch, too."
- 10-14 00:07:32.184Z: "What do you meant in option 1, role as I worded it? I don’t recall wording anything about mixins. Mission of some of your suggestions? I feel extremely out of my depth here. And these option explanations are not helping me grasp the underlying type system topics. They just document that I have a huge gap in my knowledge here and a flipping a coin. These aren’t informed decisions I am making."
- 00:12:14.696Z: "Yes, that's how I want it. And hold this as coordinator skill fine-tuning item, so that we don’t stumble on such shape again"

From the words alone: "1." says yes to the decision, before the Why existed. No word of his names the library as written, `AnyIntegral` or P-44; his reasons are "weak signal from repo" and "precedent in other languages". "Yes, that's how I want it." answers "Is that how you want it?", a question on the coordinator's method, in a text that also calls the library as written "the reason for your choice": a yes to a text holding both, to a question on the method.

Audit, judgement-c5.md "P-146" (`:7`): '"Why": the coordinator's reasons, which his 23:32 message restated in part'; "The peers half is his; "as P-44 does" is the coordinator's. Fair, not his own reason word for word."
