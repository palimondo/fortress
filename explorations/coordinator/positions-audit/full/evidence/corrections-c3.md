<!-- The POSITIONS audit's full run, chunk c3 (P-41 to P-50): the corrected record proposed by the writer's brief (positions-audit/full/evidence/briefs/writer.md, rules 0 to 12), entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# Chunk c3 corrected: a proposal

Writer: one Opus session. Sources: `judgement-c3.md`; the ten scouts' reports in this folder (`P-41.md` to `P-50.md`); and, where the text turned on them, the coordinator's texts of 2026-09-24T00:14:12.114Z, 01:05:02.453Z and 14:36:56.498Z, of 2026-09-28T13:00:37.102Z and 13:10:43.877Z, and of 2026-09-29T16:52:08.446Z and 17:29:52.529Z (by `positions-audit/tools/near.py`, or the transcript line), his message of 2026-09-29T12:17:07.180Z whole (`curator-profile/show.py`), the specification (`basic/types-vals-vars.tex`, `basic/trait-parameters.tex`, `basic/overloading.tex`, `basic/inference.tex`, `basic-lib/basic-integers.tex`), the 2012 Types chapter (`Documentation/Specification/Prose/Language/types.tick`), the library, PLAN, PLAN-history, the review queue, the gap ledger's rows 412, 539, 642 and 759 to 788, `reviews/overloading-judgement.md` section 10, `reviews/conversion-overloading-judgement.md` and `coordinator/CLIMB-BATCH-15.md` and `CLIMB-BATCH-N.md`. Nothing in the real record changed.

- The apply file is `corrections-c3.apply`, beside this file. `record.py` ran it on a copy of the record, in the scratch folder `positions-audit/full/fix-c3/root/`, with `--root`.
- `rewritten-c3.txt` holds the ten entries as each would stand: all ten stay.
- `review-queue-items-c3.md` holds two drafted items, Q-?1 and Q-?2, and three small changes to items the queue already holds.
- Each entry's "Pointers elsewhere" is from `positions-audit/tools/pointers.py N`, run at HEAD `ed2a45803`; its output is `fix-c3/pointers.txt`.

All times are UTC. Each is a message of his or of the coordinating session. No entry of this chunk has a comment of his on a page (each scout's section 7). "Rule n" is the brief's rule n.

## The verdicts

- **P-41**: kept, word for word. Its sources are listed below for the history, since the tool cannot add them.
- **P-42**: kept, word for word, and a question for him: "`Any` holds ... functions ..., which `Object` does not" is true by the specification the revival keeps and false by the team's 2012 Types chapter.
- **P-43**: rewritten. The reason turned his words round: his "the team's last record" was about the patents' forest rule, not the flattened prelude. It is reworded from his later word and the route ask he took, with a question to confirm it. A second question on the sentence "He cares that specialised code runs fast ...", kept as his.
- **P-44**: rewritten. One sentence struck as a one-time approval, carried out (rule 3): the re-approval of three landed library changes.
- **P-45**: rewritten. The smaller choices' sentence leaves: the review queue holds each, and its pointer to `PLAN.md` was false. "Built: ..." goes to the history, and the long not-built list becomes one "Still to build" line. From 1,678 to 1,031 characters.
- **P-46**: rewritten. The numeral tie rule leaves for the review queue (drafted item Q-?1). "Generic code is never fast", a premise that the coordinator corrected the same minute, is dropped from the reason. His broader rule is reworded to his words.
- **P-47**: rewritten. The premise is corrected: the specification's `ZZ` declares no `MINMAX`. Row 484's `NN32` half is struck, since it was not part of his decision; F-138 holds it.
- **P-48**: rewritten. The callout of the option he took comes back: walk still takes the value's type at a dispatched declaration. "Built under walk ... by climb batch 15" goes to the history, and its reading, which goes past the entry's letter, leaves for the review queue (drafted item Q-?2).
- **P-49**: kept, word for word. The third attempt that the checker keeps is a default that review-queue item 2 already holds.
- **P-50**: rewritten. The row 642 sentence is struck: a note on the ledger's tool, with no source of his.

## P-41

**Before and after.** Kept, word for word:

> - P-41 **At run time a size travels as the descriptor that a type argument has (design B).** It fills the slot that the team's code generator reserved. Each number has one descriptor, from a table, with no holder class, as the team instantiates types. Operator static arguments stay compile-time names (F-39): he sees no need to unify them.

**Why.** Each part is his decision, or his yes to a question that the entry states fairly (rule 1; `judgement-c3.md`, "P-41"):
- Design B and the slot: his "All right. B it is." at 2026-09-24T16:17:27.464Z. It answers the coordinator's 15:39:10.560Z ask ("Design B: a size gets the same descriptor object a type argument has, filling the slot the team's code generator already reserved"), which restates its 14:43:31.949Z ask. The slot was his own idea first. At 15:07:56.534Z he proposed that the existing run-time object gain a field for the size, and the coordinator's 15:09:48.821Z called that design B.
- One descriptor per number, from a table, with no holder class: his "Agreed, (b) factory" at 2026-09-26T09:44:10.939Z, to the coordinator's 09:30:07.795Z ask ("The ask: (b), the factory."). On 09-24, design B still meant one holder class per number. So the sentence takes both days' decisions together. "As the team instantiates types" is the coordinator's 09:35:03.762Z answer to his question of 09:34:25.735Z. He agreed after that answer.
- The operators: he asked at 15:14:48.777Z why operators differ, and whether they should be unified. The coordinator's 15:27:15.417Z answered "No, and not now", with the question to go into a ledger row. At 16:17:27 he said that he saw no need for the ledger row. He declined even to keep the question open, so "he sees no need to unify them" keeps his meaning. "Stay compile-time names" is the coordinator's reason from the specification (`trait-parameters.tex:253`), which F-39 states as a fact. It neither narrows nor adds (rule 7).

The tree bears the entry out: `CodeGen.java:5343-5357` (the slot), `RTTIsize.java:12-33` (the table), `InstantiatingClassloader.java:2700-2716` (the team's pattern) (scout §2).

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write".

**Questions for him.** None.

**Pointers elsewhere.** None needs a change.
- `FACTS.md`, F-129, "It builds P-41": needs nothing.
- `POSITIONS.md`, P-123, "(P-41)": needs nothing here. Chunk c8's proposal strikes P-123.
- `review-queue.md:1179` quotes P-41's title, which is unchanged.
- The block of 2026-10-13 18:16Z says that pointer words were refreshed in F-39. F-39 does not name P-41 today (scout §6). That is history and needs nothing.

## P-42

**Before and after.** Kept, word for word:

> - P-42 **An unbounded type parameter's implicit bound is `Any`, not `Object`.** `Any` holds tuples, functions and `()`, which `Object` does not, and the library instantiates its generic containers at tuples, arrays indexed by pairs among them. The specification states the bound, with a callout that keeps the Working Draft's `Object`. The compile path's `Object` bound departs from it until the switch-over (row 412).

**The parts.**
- The title, the library's tuples and the specification's callout: his yes, stated fairly (rule 1). His "Option one" at 2026-09-29T14:02:25.736Z (he called it an absolute no-brainer) answers the coordinator's 13:58:02.218Z text. Its option 1 writes `Any` into the specification with a callout recording that the draft said `Object`. Before it, his recap of 13:57:39.332Z: we go with `Any`, because that is the status quo. The tree: `Specification/basic/trait-parameters.tex:52-65`; `Library/FortressLibrary.fss:2248`, `:2267`, `:2678` instantiate at `(ZZ32,ZZ32)` (scout §2).
- "`Any` holds tuples, functions and `()`, which `Object` does not": a premise in dispute among the team's own texts.
  - The specification that the revival keeps agrees: "immediate subtypes of Any comprises of tuple types, arrow types, (), and Object" (`Specification/basic/types-vals-vars.tex:153`). Walk agrees: it stops on an arrow for a written `Object` (F-70).
  - The team's later Types chapter does not: `Object` "is a supertype of every trait type, arrow type and function type" (`types.tick:232-236`).
  - The callout names tuples and `()` only, and cites that chapter (`trait-parameters.tex:56-57`).
  - The coordinator's 13:58:02 text told him that the 2012 chapter has `Object` exclude function types. That misreads it.
  - Rule 8 corrects or drops a premise that is false today. This one is true by the specification in the tree and false by a later team text. So it is a conflict between the team's sources, not a false premise. His yes does not rest on the functions: the tuples carry it alone (the 163 refusals). I left the text and put the point to him (question 1).
- "The compile path's `Object` bound departs from it until the switch-over (row 412).": kept by rule 9, as what is still to build. The judgement reads it as the state of the project, with its home in row 412 and the callout. But it is the one line that tells a worker on the compiled path that an unbounded parameter there is still bounded by `Object` (row 412, NEGATIVE-VERIFIED, `compiler_tests/XXXImplicitBoundAny.test`). "The switch-over" names its PLAN item, phase 4.

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write".

**Questions for him.**
1. P-42 says that `Any` holds tuples, functions and `()`, "which `Object` does not". The specification in the tree, and walk, put functions outside `Object`. The team's 2012 Types chapter puts them inside it. On 09-29 the coordinator told you the opposite of what that chapter says. Your yes rested on the tuples. Keep "functions" in the sentence, or drop it, so that the sentence holds under both texts?

**Pointers elsewhere.**
- `FACTS.md`, F-174, "It states P-45 and P-42.": needs nothing.
- `reviews/open-asks-2026-10-16.md:39`: needs nothing. `:257` says that a bound on `LexicographicOrder`'s element would make "a list of tuples, functions or `()`" impossible to write. It stands or falls with question 1.
- Not a pointer, but the same claim: the `fortress-repo` skill, `SKILL.md`, "Fortress as a language", the static parameters' bullet: "bounded by `Any`, which holds tuples, functions and `()`, as `Object` does not". It follows question 1 too.
- PLAN's phase 4 does not name row 412, and the review queue does not name it either (scout §5). That is not a pointer to P-42, and I propose nothing for it.
- The block of 2026-10-13 18:16Z says that pointer words were refreshed in F-34. F-34 does not name P-42 today. That is history.

## P-43

**Before.**

> - P-43 **The exclusion rule stays, and the number tower is flat (route A).** The compiled checker keeps the multiple instantiation exclusion rule. So the library's numbers are flat, as the team (Chase, Ryu, Maessen and Allen) flattened the compiler prelude in 2009 and 2010. The fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. Why: the flattened prelude is the team's last record of the Fortress way, and its route leads to the POPL 2019 paper, which keeps the rule. He cares that specialised code runs fast, not how a specialisation is chosen. F-46 prices a return to route C.

**After.**

> - P-43 **The exclusion rule stays, and the number tower is flat (route A).** The compiled checker keeps the multiple instantiation exclusion rule. So the library's numbers are flat, as the team (Chase, Ryu, Maessen and Allen) flattened the compiler prelude in 2009 and 2010. The fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. Why: it is the compiler prelude's shape, taken for performance: with the rule kept, every type keeps its own specialised body. He cares that specialised code runs fast, not how a specialisation is chosen. F-46 prices a return to route C.

**Each sentence and its source.**
1. The title, the rule, the flat numbers, the siblings, their algebra and `Number` without catch-all operators: unchanged. They are his "Agreed. Route A it is." at 2026-09-24T14:41:40.798Z, which answers the coordinator's route ask of 14:36:56.498Z: "Route A keeps the rule and flattens the tower ... They become siblings under Number, each carrying its own algebra, and Number loses its catch-all operators." The authors are his correction: at 2026-10-12T22:20:54.637Z he asked for the Steele attribution to be fixed in POSITIONS and the reports, after the coordinator's 22:18:23.501Z. "Siblings under `Number`" holds in the wide sense, which is the ask's: the integer types sit under `AnyIntegral`, which extends `Number` (`Library/FortressLibrary.fsi:442`, `:533`, `:589`, `:646`), and none of the number types is a subtype of another (F-131).
2. The reason (changed; rule 4). The old text was "the flattened prelude is the team's last record of the Fortress way, and its route leads to the POPL 2019 paper, which keeps the rule".
   - His phrase was about the other side. At 2026-09-24T01:02:52.634Z, in a message that began "I'm not deciding yet", he answered question 2 of the coordinator's 00:14:12.114Z list: "Do you weigh the patents' forest rule, their latest text but never built, above Steele's implemented flattening of 2011? A yes points to C." His answer: "Yes, because that was the teams last record on how to do the "Fortress" way." (quoted to show the turn).
   - The coordinator's 01:05:02.453Z corrected the fact under it. The POPL 2019 paper did not continue the forest route. On the tower, the group's last published word is the rule kept with no nesting, route A's shape. His yes stood as his weighting.
   - Every text of the entry before `55f1a1352` put the phrase on the forest rule (scout §3). So the old reason turned his weighting round.
   - The new reason, from two sources. First, his later word (rule 12): at 2026-09-29T12:17:07.180Z he recalled that the flattening of the number hierarchy was taken from the compiler's library for performance reasons. Second, the route ask that his yes took (rule 1): under A, "Every type keeps its own specialised body, since the rule stays as the type group left it" (14:36:56). F-45 gives the same price from the other side: without the rule, every dispatcher must call its generic arms at its own static arguments.
   - Meaning could shift here. He gave no reason at 14:41, and his 12:17 words are a recollection ("if I recall correctly"), five days after the decision. So the reason goes to him to confirm (question 1).
   - The POPL clause leaves. It was the coordinator's correction, and it is true (`reviews/decisions-review/popl-recheck.md`), but it was not his reason. P-26 holds the later-word principle and names the flattened prelude (P-43) and the POPL 2019 paper among the team's later word. So a reader loses nothing.
3. "He cares that specialised code runs fast, not how a specialisation is chosen.": kept, word for word (rule 0). It condenses his words of 01:02:52, which answer question 4 of the same list (must the specialisation shortcut be kept?): without specialised code there is no performance, and how a specialisation is chosen does not matter to him, as long as it runs fast. The judgement calls it a remark that the coordinator read as an answer. It notes that the entry drops his caveat, "Which clearly isn't an answer to the question…". Rule 6 strikes a remark. Rule 0 keeps a sentence that is his and correct, and this one claims no answer to question 4. It also bears on the choice that P-95 keeps open: a return to route C is weighed on speed, not on how a specialisation is chosen. His 01:20:29.306Z says the same of type-theoretical reasons such as a tower by subtyping. I kept it and put it to him (question 2).
4. "F-46 prices a return to route C.": a pointer. He asked at 01:50:45.052Z whether A could later give way to C. The ask answered with its cost: "reversible only at the corrected cost from the last message".

**What leaves POSITIONS, and where it goes.** The old reason's two clauses, to the history. Nothing goes to the queue.

**History line.** The tool writes one block, given whole under "What record.py wrote". It holds the reason above and the sources the blocks lacked (`judgement-c3.md`, "P-43"): 14:41:40.798Z to 14:36:56.498Z; 01:02:52.634Z to 00:14:12.114Z, with the coordinator's 01:05:02.453Z; 01:50:45.052Z; and 2026-10-12T22:20:54.637Z to 22:18:23.501Z.

**Questions for him.**
1. P-43's reason read: "the flattened prelude is the team's last record of the Fortress way". Your words "the team's last record" were about the patents' forest rule (2026-09-24, 01:02 UTC), and they pointed to route C. The proposal reads: "it is the compiler prelude's shape, taken for performance: with the rule kept, every type keeps its own specialised body". That is your recollection of 2026-09-29, 12:17 UTC, and the route ask's own reason. Is that why you chose A?
2. "He cares that specialised code runs fast, not how a specialisation is chosen." These are your words of 01:02 UTC on 09-24, where you added that they were no answer to the coordinator's question. The proposal keeps the sentence, as your weighting when route C is weighed again. Keep it, or strike it as a remark?

**Pointers elsewhere.**
- `FACTS.md`, F-44 ("P-43 keeps it"), F-45 ("These prices decided P-43") and F-46: need nothing. F-45 agrees with the new reason.
- `POSITIONS.md`, P-26 ("the compiler prelude's tower flattened in 2009 and 2010 (P-43)") and P-95 ("(P-43)"): need nothing.
- `reviews/open-asks-2026-10-16.md:183`, "4. The later word: P-43": P-43 no longer states the later-word reason. The reference would read "P-26, and P-43 for the flattening". `:187` and `:262`: need nothing.
- PLAN, the review queue, HELD, BOOT and the skills: no pointer (`pointers.py 43`).

## P-44

**Before.**

> - P-44 **`AnyIntegral`'s closure stands, and the checker reads `comprises` the 2012 way.** The closure `AnyIntegral comprises { ... }` stands, with a `NOT YET` comment in the team's wording. So do the generic scalar-extension block, the `AnyAdditiveGroup` marker and the `Array3` exclusion. A generic child of a closed trait may extend it when every type that the checker knows below it is listed. The clause's text and walk stay as they are. Row 487 records the hole that every reading but the 2008 one shares: a program's own `Integral` subtype in another component is not caught.

**After.**

> - P-44 **`AnyIntegral`'s closure stands, and the checker reads `comprises` the 2012 way.** The closure `AnyIntegral comprises { ... }` stands, with a `NOT YET` comment in the team's wording. A generic child of a closed trait may extend it when every type that the checker knows below it is listed. The clause's text and walk stay as they are. Row 487 records the hole that every reading but the 2008 one shares: a program's own `Integral` subtype in another component is not caught.

**Each part and its source.**
1. The closure with its `NOT YET` comment: unchanged (rule 1). At 2026-09-21T17:08:18.165Z he said he had approved it already: the `NOT YET` comment, and whatever the tracer recommends. That answers the coordinator's 17:01:34.623Z, which gave the tracer's recommendation as "keep, with the comment". The list was `{ ZZ }` then, and it is five types since the flattening (`Library/FortressLibrary.fsi:442`). `{ ... }` covers both.
2. The 2012 reading, the generic child, the clause's text, walk and row 487: unchanged (rule 1). His "Option 1." at 2026-09-28T08:52:27.340Z answers the coordinator's 07:49:57.970Z, after he read the judgement's section 2, as he asked at 08:46:46.410Z. Each clause is in that ask: "A generic child of a closed trait is accepted when every type the checker sees under it is listed", walk untouched, and one ledger row for a gap that every option except the team's 2008 clause shares. The checker as built reads the types that immediately extend the closed trait (F-72, `everyKnownSubtypeListed`). The entry keeps the wording of the ask that he took (rule 0), and F-72 holds the built form.
3. Struck: "So do the generic scalar-extension block, the `AnyAdditiveGroup` marker and the `Array3` exclusion." It is a one-time approval, carried out, that carries no standing rule (rule 3).
   - Library commit `02d09a39f` (2026-09-19) landed without his go. The coordinator's 01:37:29.617Z on 09-21 asked him to approve or revert what had been done in his absence. Its 02:16:54.638Z listed the commit's other three changes, and he wrote "Others approved." at 02:26:08.016Z.
   - Carried out: all three stand (`Library/FortressLibrary.fss:4900`, `:356`, `:3045`).
   - No rule follows from the approval. It kept landed lines, and nothing proposes to remove them. P-88 already keeps the scalar block for the model's vocabulary, and P-27, the library's own practice, covers the rest.
   - The texts before `55f1a1352` also said that the block holds "two unnamed choices": what "number minus array" means, and a result type with no size (02:16:54). He never ruled on them as such. They left at that commit, and nothing brings them back.

**What leaves POSITIONS, and where it goes.** The struck sentence, to the history. Nothing goes to the queue.

**History line.** Given whole under "What record.py wrote": the strike with its reason, and the sources the blocks lacked (`judgement-c3.md`, "P-44").

**Questions for him.** None.

**Pointers elsewhere.**
- `FACTS.md`, F-62 and F-72 ("It builds P-44"), F-121 ("The closure as written stands (P-44)"): need nothing.
- `POSITIONS.md`, P-146 ("as P-44 does"): needs nothing.
- `review-queue.md:1207` quotes the title, which is unchanged.
- No line cites P-44 for the three library changes (`pointers.py 44`).

## P-45

**Before.**

> - P-45 **Overloads may differ in their static parameters (answer 9).** The specification drops its sentence that forbids it and states the type group's 2011 model, which the checker runs; the old sentence stays as superseded text. The checker keeps the paper's three overloading rules, checks the Return Type Rule over every instance, and requires two generic declarations in the more-specific relation to agree on their static parameters position by position, as Java's overriding rule does (row 398). Walk dispatches on declared domains, not by the order of the declarations, and its load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude, so that walk and the checker accept the same pairs (row 159). The library repairs its refused families with its own exclusions, and no model line changes. The judgement's smaller choices took the record's defaults, listed for his review in `PLAN.md`. Built: walk's load check over every pair of functions with static parameters, by climb batch 17's rung G. Not built: a functional method of a generic trait or object is still compared on its instances (F-26), the Meet Rule's search matches only some domains (row 539), two nested generic functional methods of a trait or object are refused at load where the same two functions load (row 779), and in a trait with static parameters load and fail at a call (row 780). Rung G's reading makes walk and the checker disagree on row 759's pair: walk refuses `g[\T\](a: T)` beside `g(a: Any)`, and the checker accepts it. Climb batch 19's reading of exclusion (P-152) leaves three more, rows 786 to 788.

**After.**

> - P-45 **Overloads may differ in their static parameters (answer 9).** The specification drops its sentence that forbids it and states the type group's 2011 model, which the checker runs; the old sentence stays as superseded text. The checker keeps the paper's three overloading rules, checks the Return Type Rule over every instance, and requires two generic declarations in the more-specific relation to agree on their static parameters position by position, as Java's overriding rule does (row 398). Walk dispatches on declared domains, not by the order of the declarations, and its load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude, so that walk and the checker accept the same pairs (row 159). The library repairs its refused families with its own exclusions, and no model line changes. Still to build: the pairs that walk or the checker still reads otherwise (F-26; rows 539, 759, 779, 780 and 786 to 788; PLAN, phase 3, item 19).

**Each part and its source.**
1. The rules, through "no model line changes", but for walk's load check: unchanged (rule 1). His "Yes, agreed." at 2026-09-26T12:07:33.636Z and "Agreed, the judgement's recommendation." at 12:08:32.187Z answer the coordinator's 12:01:53.076Z "Answer 9", which holds each part. He had asked for the judgement himself ("Run Fable judgement as well.", 10:21:32.097Z). As built, the positional rule compares two declarations only when they declare as many static parameters of their own, and only their return types. His answer 9 leaves that scope for his review, and review-queue item 60 holds it. So the entry states the rule as he took it (rule 0).
2. Walk's load check over every pair, "so that walk and the checker accept the same pairs (row 159)": unchanged (rule 1). At 2026-10-16T19:47:32.836Z he quoted the bullet of the coordinator's 18:36:34.247Z report, "Should walk compare every pair of generic declarations by the types they declare?", and said yes if that brings walk in line with the compiled checker. He added that the questions came with little context. The condition is the entry's last clause.
3. Leaves: "The judgement's smaller choices took the record's defaults, listed for his review in `PLAN.md`." (rules 2 and 8). Its only source is his go of 2026-09-27T05:49:41.431Z to launch phase 3's batch, which answers the coordinator's 05:15:38.486Z. `bc8902f47` merged it in. Its pointer is false today: PLAN.md has no such list. The review queue holds each of the judgement's section-10 items that is still open: item 36 (walk and an unused unknown size), item 67 (Naden's instantiation), and item 60 (the positional rule's scope). `seq`'s device is settled (row 556), and the implicit bound is P-42. No new item (`review-queue-items-c3.md`).
4. Leaves: "Built: walk's load check over every pair of functions with static parameters, by climb batch 17's rung G." (rule 9). It goes to the history (`6d187d069`). F-252 and ledger row 159 hold the built state.
5. Shortened (rule 9): the not-built list and the two disagreement sentences become "Still to build: the pairs that walk or the checker still reads otherwise (F-26; rows 539, 759, 779, 780 and 786 to 788; PLAN, phase 3, item 19)."
   - Each row stays in the ledger with its reproducer: 539, 779, 780, 759, 787 and 788 NEGATIVE-VERIFIED, 786 CONTESTED. F-26 holds the functional method compared on its instances.
   - Rows 759 and 786 to 788 bear on his condition of 10-16: walk and the checker still do not accept the same pairs. The short line keeps them in view without the detail.
   - The PLAN item: rows 759, 779, 780, 787 and 788 are among phase 3, item 19's "other candidates of item 18", and row 786 is held there for his answer (review-queue item 9). F-26's case and row 539 have no PLAN item (review-queue item 77: "no PLAN item repairs walk on row 539"). See "The rules, where they fit badly".

**What leaves POSITIONS, and where it goes.** The smaller choices, to the review queue (items 36, 60 and 67). "Built", to the history. The detail of the not-built list, to F-26 and the ledger rows, and to this history.

**History line.** Given whole under "What record.py wrote", with the sources the blocks lacked (`judgement-c3.md`, "P-45").

**Questions for him.** None.

**Pointers elsewhere.**
- `FACTS.md`, F-26, F-50, F-75 and F-77 ("It builds P-45") and F-174 ("It states P-45 and P-42"): need nothing.
- `POSITIONS.md`, P-46, "(P-45)": needs nothing.
- `PLAN.md:459` (G.skeptic.1, "a set that P-45's reading finds valid"): needs nothing.
- `PLAN.md:464` (gather.3 of climb batch 17): it records that the gather marked P-45's old "Still to build" as built. Its evidence, `POSITIONS.md:44`, now holds P-46, which was stale before. It is batch 17's history and needs nothing more. After this change P-45 has a "Still to build" line again, of other content.
- `review-queue.md:465` (item 60, the title) and `:1262` (item 78, "(P-45)"): need nothing. Item 67's home, "POSITIONS, answer 9": see `review-queue-items-c3.md`.
- `.claude/skills/fortress-repo/references/sources.md:681`, `:698`, `:699`, `:709`: they cite P-45 as the decision that the skill's walk sections follow, which stays. They need nothing.

## P-46

**Before.**

> - P-46 **A conversion makes a call possible, and never changes which declaration runs when one already fits.** Declarations are chosen on declared domains, by applicability and then specificity (P-45). The chosen one is instantiated by answer 8's promotion (P-74), its coercions inserted statically. So beside a plain arm over `Any`, a generic arm over `T extends Number` runs at `ZZ64` for a mixed-width call. A numeral whose candidate types are incomparable reads as `ZZ32`, or as `ZZ64` or `ZZ` by its magnitude. Why: generic code is never fast, and he wants code that a JVM can specialise. His own broader rule, to convert toward a specific declaration before a generic one, is not taken. Both paths infer static arguments with coercion and the same promotion, and P-49 orders the checker's attempts. Still open: the dispatch between two generic declarations (row 537, PLAN phase 5).

**After.**

> - P-46 **A conversion makes a call possible, and never changes which declaration runs when one already fits.** Declarations are chosen on declared domains, by applicability and then specificity (P-45). The chosen one is instantiated by answer 8's promotion (P-74), its coercions inserted statically. So beside a plain arm over `Any`, a generic arm over `T extends Number` runs at `ZZ64` for a mixed-width call. Why: he wants fast generic code that a JVM can specialise. His own broader rule, to apply any conversion that reaches a specific declaration and to fall back to a plain one only when none does, is not taken. Both paths infer static arguments with coercion and the same promotion, and P-49 orders the checker's attempts. Still open: the dispatch between two generic declarations (row 537, PLAN phase 5).

**Each sentence and its source.**
1. The title, the choice on declared domains, the promotion and the fork at `ZZ64`: unchanged (rule 1). His "C-O. Both recommendations for batch N accepted." at 2026-09-28T19:06:50.868Z took the page of the conversion judgement. The coordinator's 14:52:02.906Z put decision 1 to him: a conversion only makes a call possible and never switches it away from a version that fits; which version fits is judged on declared types; then answer 8 picks its type, `ZZ64` here. The fork is the coordinator's question of 13:00:37.102Z, where he chose option 2 at 13:32:53.221Z.
2. Leaves: "A numeral whose candidate types are incomparable reads as `ZZ32`, or as `ZZ64` or `ZZ` by its magnitude." (rule 2). It is the judgement's Q1 default, one of those "taken as defaults, listed for your review" (`reviews/conversion-overloading-judgement.md`, sections 3 and 4). His yes took decisions 1 and 2, not the defaults. `54208c796` labelled it a default, and every text since `bc8902f47` states it unlabelled. The queue holds two neighbours, item 96 (a numeral too large for every declaration) and item 85 (walk promotes from run-time types), but not the rule. So it is drafted as **Q-?1**.
3. The reason (changed; rule 8). The old text was "generic code is never fast, and he wants code that a JVM can specialise".
   - At 13:10:04.957Z he gave his principle: make it fast, since generic is never fast. He thought that the plain arm was the specialised one.
   - The coordinator's 13:10:43.877Z corrected the premise. Here the plain version is the catch-all over `Any`, and the generic one is the specialised code, stamped out per type, so that "generic is slow" holds of Java's generics, not of Fortress's design.
   - He then wrote at 13:32:53.221Z: "Option 2. Fast generics over Any.", and that, if the option is sound, he would pick fast generic code that the JVM can specialise.
   - So the first half was a premise that he gave up, and it contradicts the decision that it explains. The second half is his, and it stays.
4. His broader rule (changed; rule 4). The old text was "to convert toward a specific declaration before a generic one". His words at 13:51:00.915Z, answering the coordinator's 13:38:52.883Z: a conversion to a specific type is applied, and only when every combination is exhausted without reaching a specific implementation does a plain implementation run. His fallback is a plain implementation, not a generic one. "Is not taken" is his yes to decision 1, whose recommendation rejected this rule, way 4 (judgement, "Your idea, and what it becomes"). He also said of the idea that he could not be trusted to derive a rule that would not break the whole system.
5. The inference sentence: unchanged (rule 1). His "Agreed." at 2026-09-27T19:30:05.855Z answers the coordinator's 19:24:33.002Z: static arguments inferred with coercion, by his answer-8 promotion, built with the numeral switch as one batch.
6. "Still open: the dispatch between two generic declarations (row 537, PLAN phase 5).": kept (rule 9). `PLAN.md:103` holds it.

**What leaves POSITIONS, and where it goes.** The numeral tie rule, to drafted item Q-?1. The premise "generic code is never fast", to the history.

**History line.** Given whole under "What record.py wrote", with the sources the blocks lacked (`judgement-c3.md`, "P-46").

**Questions for him.** None for the entry. Q-?1 holds the numeral tie rule.

**Pointers elsewhere.**
- `FACTS.md`, F-27 ("It builds P-46 and P-60 under walk"), F-137 ("(P-46)") and F-173 ("It states P-46, P-48 and P-49"): need nothing. F-173 states the inference rule, not the tie rule.
- `POSITIONS.md`, P-48, "(P-46)": needs nothing.
- `.claude/skills/fortress-repo/references/sources.md:711`: needs nothing.

## P-47

**Before.**

> - P-47 **Each integer type declares its own `MIN`, `MAX` and `MINMAX`.** It follows `QQ`, `RR64`, the compiler library and the specification's `ZZ`, so that under walk the family answers at the promoted type. Row 484's `NN32` half, a numeral beside an `NN32`, is still open.

**After.**

> - P-47 **Each integer type declares its own `MIN`, `MAX` and `MINMAX`.** It follows `QQ`, `RR64` and the compiler library, and the specification's `ZZ`, which declares its own `MIN` and `MAX`, so that under walk the family answers at the promoted type.

**Each part and its source.**
1. The title and its precedents: his yes (rule 1). His "C-O. Both recommendations for batch N accepted." at 2026-09-28T19:06:50.868Z took decision 2 of the judgement's page: "Each integer type declares its own `MIN`, `MAX` and `MINMAX` ... Every such call then answers at answer 8's type. ... Recommendation. Option 1, the library's own device." (`reviews/conversion-overloading-judgement.md:75-89`). No chat turn put decision 2. The coordinator's 14:52:02.906Z put it on the page only.
2. The premise (corrected; rule 8). The page's context line, and the entry after it, say that `QQ`, `RR64`, the compiler library and the specification's `ZZ` all declare the three. The specification's `ZZ` declares `MAX` and `MIN` and no `MINMAX` (`Specification/basic-lib/basic-integers.tex:263-264`; grep finds no `MINMAX` in the chapter). `QQ` (`Library/FortressLibrary.fss:610-619`), `RR64` (`:454-456`) and the compiler library (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:137-139` and its other types) declare all three. The rung's report notes the same deviation (scout §2).
3. Struck: "Row 484's `NN32` half, a numeral beside an `NN32`, is still open." (rule 6). It is the state of the project, and it was not part of his decision: at his decision row 484 covered `b MAX 1` only (scout §2). It is no work left under this decision either, so rule 9 does not keep it. Its fix is walk's numeral switch (Q-walk). Ledger row 484 and F-138 ("Under walk an `NN32` operator with a numeral answers a `ZZ64` (row 484)") hold it.

**What leaves POSITIONS, and where it goes.** Row 484's half, to F-138 and the ledger row, which already hold it.

**History line.** Given whole under "What record.py wrote", with the source the blocks lacked (`judgement-c3.md`, "P-47").

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md`, F-138, "It builds P-47": needs nothing. No other line names P-47 (`pointers.py 47`). The scout left one point thin: whether "each integer type" reaches the numeral's own type, `IntLiteral`, which declares none in the one library (scout §2). The entry says nothing of it, and I propose nothing.

## P-48

**Before.**

> - P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** Its instance is the intersection of its upper bounds, constrained by the call's static return type, never the arguments' union or the value's type alone. The rule is the team's later word (POPL 2019). He ranks the team's later work above his own reading. It sets the instance, not which declaration runs (P-46). MicroGPT's types are concrete, so it is untouched. The library keeps the team's unbounded declarations. Built under walk for a reduction or comprehension that writes no static argument by climb batch 15 (`20474c144`). Still to build: a compiled dispatcher that carries the static return type (row 538, PLAN phase 5).

**After.**

> - P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** Its instance is the intersection of its upper bounds, constrained by the call's static return type, never the arguments' union or the value's type alone. The rule is the team's later word (POPL 2019). He ranks the team's later work above his own reading. It sets the instance, not which declaration runs (P-46). MicroGPT's types are concrete, so it is untouched. The library keeps the team's unbounded declarations. Walk has no static types, so where dispatch reaches a declaration it still takes the value's type. Still to build: a compiled dispatcher that carries the static return type (row 538, PLAN phase 5).

**Each sentence and its source.**
1. The rule, its source, his reason, its scope and microGPT: unchanged (rule 1).
   - The ask is the coordinator's 2026-09-29T16:52:08.446Z, restated at 17:29:52.529Z: should the project adopt the paper's rule for a type parameter that the arguments do not fix? `T` takes its declared bound, narrowed by whatever the call's static result type requires: "never `Bottom`, never a union, and never set by the value alone".
   - He answered at 17:34:18.956Z. He did not follow the options. But by his rule that the team's later work supersedes the earlier, and on the coordinator's word that the rule is the paper's, he would trust the team's work over his own understanding: "So you can record that."
   - The coordinator recorded option 1 (17:35:45.946Z), which is that rule. "He ranks the team's later work above his own reading" condenses his words fairly. The microGPT clause is the ask's ("Effect on microGPT: none").
2. The library's unbounded declarations: unchanged (rule 1). At 2026-10-03T04:14:20.092Z he said yes, put the library back to the team's own declarations. That answers item 20 of the coordinator's 04:01:11.833Z: drop the `extends Object` bounds on `fail`, `builtinPrimitive` and `List`'s empty comprehension.
3. New: "Walk has no static types, so where dispatch reaches a declaration it still takes the value's type." (rule 1). Option 1, which he took, included its callout: "a callout says both implementations still use the value's type at run time. The interpreter always will, because it has no static types. The compiled path will until phase 5." (16:52:08; quoted to show the source). The entry kept the compiled half as its "Still to build" and lost walk's. Without it, "never ... the value's type alone" reads as a rule that walk obeys, and walk cannot (`judgement-c3.md`, "P-48", first note). The specification's callout says the same (`Specification/basic/overloading.tex`, `\revision{revival-dispatch}`: "Both implementations of the revival take the dynamic type of the argument where the value does not fix the type parameter: the interpreter because it has no static types ...").
4. Leaves: "Built under walk for a reduction or comprehension that writes no static argument by climb batch 15 (`20474c144`)." (rules 9 and 2).
   - The built state goes to the history. F-228 and F-141 hold it.
   - Its reading is a default that an agent landed and that waits for his review. It is the coordinator's call 1 of climb batch 15. Walk fixes such a parameter by the declared type of the expression's value, else by the join of its elements' run-time types, else at the bound. The batch record says that it "reads past the letter of one, P-48's last clause" (`coordinator/CLIMB-BATCH-15.md`, section 2). PLAN lists it for his review ("Default: as built"). No item of the queue holds it: item 17, settled by the coordinator under P-48, names it only as "the call for his review". So it is drafted as **Q-?2**.
5. "Still to build: a compiled dispatcher that carries the static return type (row 538, PLAN phase 5).": kept (rule 9). `PLAN.md:100` and ledger row 538 hold it.

**What leaves POSITIONS, and where it goes.** "Built under walk ...", to the history, and its reading, to drafted item Q-?2.

**History line.** Given whole under "What record.py wrote", with the sources the blocks lacked (`judgement-c3.md`, "P-48").

**Questions for him.** None for the entry. Q-?2 holds batch 15's reading.

**Pointers elsewhere.** Thirty-one lines name P-48 (`pointers.py 48`). None needs a change:
- `FACTS.md`, F-56, F-70, F-78, F-84, F-141, F-166, F-173 and F-175: they cite the rule or the unbounded declarations, which stay. F-228, "It builds P-48 by the coordinator's call", already labels call 1 as the coordinator's.
- `POSITIONS.md`: the header comment's example, and P-79, "under P-48 (row 731)". `PLAN.md:61`, `:225`, `:426`: need nothing.
- `PLAN.md:408` and `:421` quote "never ... the value's type alone", which stays in the entry. They could name Q-?2 once it is numbered.
- `review-queue.md:53`, `:72`, `:1181`, `:1193`, `:1217` quote the title, which is unchanged. For `:1217` (item 17), see `review-queue-items-c3.md`.
- The coordinator skill (`SKILL.md:20`, `references/record.md:9`, `:19`) and the `fortress-repo` skill (`references/records.md:40`, `:66`, `references/sources.md:611`) use P-48 as an example of the form. `fortress-repo/references/sources.md:648`, `:649` and `:711` cite it as the rule that rungs C, B and W followed. They need nothing.

## P-49

**Before and after.** Kept, word for word:

> - P-49 **The checker tries a call without the expected type first, and with coercion only after (row 508).** It keeps the first attempt, by subtyping, when its result converts to the expected type, and only then tries coercion with the context. So a declaration that fits the arguments as they are is not passed over for one reached by coercion.

**Why.** It is his yes to a question that the entry states fairly (rule 1; judgement). The question is item 4 of the decisions audit's section 6 (`reviews/decisions-review/judgement.md:330-336`): option 1, try subtyping without the context first, keep it when its winner's result converts, then coercion with the context. Its page was announced to him at 2026-09-29T13:09:55Z.
- At 15:26:18.244Z he said that recommendation 1 made sense, since coercion should be tried when there are no matches, and he asked how he had contradicted it. The coordinator's 15:26:31.509Z explained it.
- At 15:49:10.603Z he recorded recommendation 1 for item 4.
- The "So" sentence is his reason, and his decision 1 of 09-28 (P-46).

The checker as built keeps a third attempt between the two, by subtyping with the expected type (`compile-ladder/rung-instance-bound/decision-record.md:57`; `PLAN.md:275`). That is a default that waits for his review, and review-queue item 2 holds it. The entry is not false: the first attempt still comes first, and coercion still comes after. So it stays (rule 0), and nothing goes to the queue (rule 2 is met by item 2).

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write".

**Questions for him.** None. Item 2 holds the third attempt.

**Pointers elsewhere.** `FACTS.md`, F-73, F-78, F-221 and F-173; `POSITIONS.md`, P-46; `PLAN.md:275`, `:400`; `review-queue.md:65`, `:66` (item 2); `.claude/skills/fortress-repo/references/sources.md:636`. None needs a change.

## P-50

**Before.**

> - P-50 **A `label` body takes the expected type of the whole `label` (item 48 (a)).** The specification types a `label` as the union of its body's last expression and its exits' `with` values. So the checker passes the expected type of the whole into the body and into the exits' values, as for a `typecase` clause, and the inference chapter lists both contexts. P-51 is the other half of item 48. Row 642 stays `CONTESTED` only because the ledger's tool cannot close it.

**After.**

> - P-50 **A `label` body takes the expected type of the whole `label` (item 48 (a)).** The specification types a `label` as the union of its body's last expression and its exits' `with` values. So the checker passes the expected type of the whole into the body and into the exits' values, as for a `typecase` clause, and the inference chapter lists both contexts. P-51 is the other half of item 48.

**Each part and its source.**
1. The rule: unchanged (rule 1). His "(a) has a yes" at 2026-10-09T06:59:48.891Z answers the coordinator's 06:56:20.441Z. That text explained `label` as a named block that code inside it can leave early, with a value, and asked again "now that the `typecase` rule behind it is explained". Before it, his 06:55:25.847Z, on the coordinator's Q48 of 06:46:36.728Z ("Recommendation: (a) yes, (b) not now."), asked what `label` and the `typecase` ruling were. He read the block as getting the same inference as a function body, which made sense to him.
2. "As for a `typecase` clause": kept (rule 0). That ruling is his "2-4 yes" of 2026-10-08T21:41:02.325Z, given in bulk. On 10-09 he said that he might just have agreed with some defaults. The explanation before his yes of 06:59 covered it, so the entry may lean on it (judgement).
3. "P-51 is the other half of item 48.": a pointer. His word on that half is "Q48(b) wide, go ahead" (2026-10-09T22:10:09.585Z).
4. Struck: "Row 642 stays `CONTESTED` only because the ledger's tool cannot close it." (rule 6). It is the state of the project, with no source of his: climb batch 12's gather wrote it (PLAN-history, "Climb batch 12, listed for his review", gather.2). It is not about the decision, but about the ledger's tool. Its homes hold it: PLAN, "Climb batch 12, listed for his review", gather.2 ("row 642 fixed in the tree and `CONTESTED` in the ledger"), review-queue item 165, and ledger row 642. Rule 5, a text with no source of his, does not apply: this is a note on one row's state, not a rule. The row's reproducer has since been renamed (`InferResultOnlyLabelBody.test`; scout §2), one more reason why the row, not this entry, carries its status.

**What leaves POSITIONS, and where it goes.** The row 642 sentence, to the history. PLAN's gather.2 and item 165 already hold it.

**History line.** Given whole under "What record.py wrote", with the sources the blocks lacked (`judgement-c3.md`, "P-50").

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md`, F-87 ("The `label` body builds P-50"): needs nothing. `review-queue.md:1188` (item 48) quotes the title, which is unchanged. For item 165, see `review-queue-items-c3.md`.

## History lines the tool cannot write

The tool has no route for these lines. An entry line equal to the entry is skipped, and a call that changes nothing is refused. I tried it on a second copy, `fix-c3/root2/`: P-41's line, unchanged, with a note, gives `record.py apply: nothing changes`, exit 1, and the files' `md5sum` is the same before and after (`fix-c3/probe-unchanged-out.txt`). The lines are written in the history's provenance form, ready for a provenance-only block once the tool has one. Each gives his message's time and a fair rewording. A quote appears only where a short answer is itself the decision (rule 10).

**P-41**
- 2026-09-24T16:17:27.464Z · his words: "All right. B it is." · answering the coordinator's 2026-09-24T15:39:10.560Z (design B: a size gets the descriptor that a type argument has, in the slot that the team's code generator reserved), which restates its 14:43:31.949Z ask.
- 2026-09-24T15:07:56.534Z · the slot is his idea: the existing run-time object gains a field for the size · answering the coordinator's 2026-09-24T15:01:24.045Z (the descriptor machinery explained); its 15:09:48.821Z named the idea design B.
- 2026-09-26T09:44:10.939Z · his words: "Agreed, (b) factory" · answering the coordinator's 2026-09-26T09:35:03.762Z ((b) is the team's instantiation pattern applied to numbers), on his question of 09:34:25.735Z on the ask of 09:30:07.795Z (one descriptor per number from a table, and no class written).
- 2026-09-24T16:17:27.464Z · in the same message: he sees no need for his operator question to go into a ledger row · answering the coordinator's 2026-09-24T15:27:15.417Z (should operators be unified: no, and not now; the question to go into a ledger row), on his question of 15:14:48.777Z why operators differ and whether they should be unified.

**P-42**
- 2026-09-29T14:02:25.736Z · his words: "Option one" (to item 3, an absolute no-brainer to him) · answering the coordinator's 2026-09-29T13:58:02.218Z (option 1 writes `Any` into the specification with a callout recording that the draft said `Object`).
- 2026-09-29T13:57:39.332Z · his recap: we go with `Any`, as the status quo · answering the coordinator's 2026-09-29T13:51:26.859Z (items 3, 7 and 9 named as next).
- The coordinator's 13:58:02 text told him that the 2012 Types chapter has `Object` exclude function types. The chapter puts arrow types under `Object` (`types.tick:232-236`). His yes rests on the tuples.

**P-49**
- 2026-09-29T15:49:10.603Z · he records recommendation 1 for item 4 · answering the coordinator's 2026-09-29T15:26:31.509Z (item 4 explained: the first attempt matches without conversion and without demanding the result type, keeps the winner if its result converts, and only then tries conversions).
- 2026-09-29T15:26:18.244Z · recommendation 1 makes sense to him, since coercion should be tried when there are no matches; he asks how he contradicted it · answering the coordinator's 2026-09-29T15:19:11.530Z, on the audit's page announced at 2026-09-29T13:09:55Z.

**A defect common to the chunk's history.** Each block of 2026-10-13 18:16Z, by consolidation chunk P2, names the wrong commit for its rewrite. P-41 to P-49 name `bc8902f47` (2026-09-30), and P-50 names `4211391d1` (its creation, 2026-10-09). The rewrite is `55f1a1352` (2026-10-13T18:16:20Z, "the pilot chunks consolidated, F-51 to F-72 and P-37 to P-62"; `git show -s`). The history is append-only, so the old blocks stay. For P-41, P-42 and P-49 a provenance-only block would say so. For the seven entries that this proposal rewrites, the new block follows the wrong one, and the fact is noted here.

## What record.py wrote

**How it ran.** The scratch root `fix-c3/root/` holds copies of the four record files from `explorations/coordinator/`: `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`. It ran with `--root` on the copy, with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base. The base is HEAD at the run, `ed2a45803`. The four record files there are the same as in the working tree. The commands, run from the scratch folder:

    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply /home/user/fortress/explorations/coordinator/positions-audit/full/evidence/corrections-c3.apply --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root

**check before the apply** (`fix-c3/check-before.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

**apply** (`fix-c3/apply-out.txt`), exit 0:

    P-43: rewritten
    P-44: rewritten
    P-45: rewritten
    P-46: rewritten
    P-47: rewritten
    P-48: rewritten
    P-50: rewritten

**check after the apply** (`fix-c3/check-after.txt`), exit 0:

    reported, not failing:
      POSITIONS.md: size: 18 entries over 600 characters: P-40 1129, P-43 649, P-45 1031, P-46 813, P-48 709, P-51 696, P-60 805, P-146 727, P-147 669, P-148 632, P-149 812, P-151 1095, P-152 1303, P-154 948, P-155 831, P-79 836, P-153 986, P-85 653
    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

What changed, against the run before the apply:
- POSITIONS still has 83 entries: nothing is struck whole.
- The same 18 POSITIONS entries are over 600 characters. Four of this chunk are among them, each shorter: P-45 1,678 to 1,031, P-46 887 to 813, P-48 724 to 709, P-43 662 to 649. The question that keeps each extra sentence:
  - P-45: would a worker on walk or the checker do otherwise without the four rules? Yes: each is a rule of answer 9 that a rung must keep. The still-to-build line keeps his condition of 10-16 in view.
  - P-46: would a reader weigh a change to the order right without the reason and the rule not taken? No: the judgement found that both, as they stood, would mislead him (`judgement-c3.md`, "P-46", Actionable).
  - P-48: would a reader of the walk path misread "never ... the value's type alone" without the new sentence? Yes.
  - P-43: the reason and his weighting, questions 1 and 2 above.
- FACTS is unchanged (`fix-c3/FACTS.diff` is empty), and so is its size list.
- A first run of the apply, on an earlier copy, wrote one note with the words "the texts from `bc8902f47` on". `check` then reported, without failing, "from: P-46: bc8902f47 is no file", since it reads "from" plus a path as a citation. The note now says "every text since `bc8902f47`", and the run above is on a fresh copy.

**POSITIONS.md.** Seven lines rewritten, each as in its "After"; P-41, P-42 and P-49 unchanged (`fix-c3/POSITIONS.diff`). The blocks that the tool appended to `POSITIONS-history.md` are below, verbatim, from `fix-c3/POSITIONS-history.diff`. The time is the copy's clock, and a real apply would stamp its own and name its own `by`.

```
### P-43

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-43" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-43" · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: the reason reworded, since the old one turned his words round. It read "the flattened prelude is the team's last record of the Fortress way, and its route leads to the POPL 2019 paper, which keeps the rule". He wrote "the team's last record" at 2026-09-24T01:02:52.634Z of the patents' forest rule, answering question 2 of the coordinator's 00:14:12.114Z list (does he weigh the forest rule above the 2011 flattening? a yes points to C), in a message that opened by saying he was not deciding yet; the coordinator's 01:05:02.453Z then corrected the fact under it: the POPL 2019 paper did not continue the forest route, and the group's last published word on the tower is the rule kept with no nesting, route A's shape, his yes standing as his weighting. The new reason is his own later word and the ask he took: at 2026-09-29T12:17:07.180Z he recalled that the flattening was taken from the compiler's library for performance; and the coordinator's route ask of 2026-09-24T14:36:56.498Z said that under A every type keeps its own specialised body, since the rule stays as the type group left it. It is put to him to confirm. The rest kept. Its sources: 2026-09-24T14:41:40.798Z, his "Agreed. Route A it is.", answering that route ask (A keeps the rule and flattens the tower: the number types become siblings under Number, each with its own algebra, and Number loses its catch-all operators; full C is blocked behind the checker's overflow); 2026-09-24T01:02:52.634Z, answering question 4 of the 00:14:12.114Z list (must the specialisation shortcut be kept?): without specialised code there is no performance, and how a specialisation is chosen does not matter to him as long as it runs fast, which, he added, was no answer to the question; 2026-09-24T01:50:45.052Z, his question whether A could later give way to C, which the route ask's cost of a return answered (F-46); 2026-10-12T22:20:54.637Z, his request to fix the Steele attribution in POSITIONS and the reports, after the coordinator's 22:18:23.501Z.

- P-43 **The exclusion rule stays, and the number tower is flat (route A).** The compiled checker keeps the multiple instantiation exclusion rule. So the library's numbers are flat, as the team (Chase, Ryu, Maessen and Allen) flattened the compiler prelude in 2009 and 2010. The fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. Why: the flattened prelude is the team's last record of the Fortress way, and its route leads to the POPL 2019 paper, which keeps the rule. He cares that specialised code runs fast, not how a specialisation is chosen. F-46 prices a return to route C.

### P-44

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-44" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-44" · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: "So do the generic scalar-extension block, the `AnyAdditiveGroup` marker and the `Array3` exclusion." struck as a one-time approval, carried out, that carries no standing rule: his "Others approved." at 2026-09-21T02:26:08.016Z answered the coordinator's 02:16:54.638Z list of the other three changes of library commit `02d09a39f`, which had landed without his go, to approve or revert. All three stand in the library, and P-88 keeps the scalar block for the model's vocabulary. The rest kept. Its sources: 2026-09-21T17:08:18.165Z, answering the coordinator's 17:01:34.623Z (keep the closure with a NOT YET comment in the team's wording, or remove it; recommendation keep): he had approved it already, the NOT YET comment and whatever the tracer recommends; 2026-09-28T08:52:27.340Z, his "Option 1.", answering the coordinator's 07:49:57.970Z (teach the checker the 2012 reading: a generic child of a closed trait is accepted when every type the checker sees under it is listed; walk untouched; one ledger row for the hole that every option but the team's 2008 clause shares), after he read the judgement's section 2, as he asked at 08:46:46.410Z.

- P-44 **`AnyIntegral`'s closure stands, and the checker reads `comprises` the 2012 way.** The closure `AnyIntegral comprises { ... }` stands, with a `NOT YET` comment in the team's wording. So do the generic scalar-extension block, the `AnyAdditiveGroup` marker and the `Array3` exclusion. A generic child of a closed trait may extend it when every type that the checker knows below it is listed. The clause's text and walk stay as they are. Row 487 records the hole that every reading but the 2008 one shares: a program's own `Integral` subtype in another component is not caught.

### P-45

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-45" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-45" · commit `6d187d069` · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: two parts leave. "The judgement's smaller choices took the record's defaults, listed for his review in `PLAN.md`." goes to the review queue, which holds each of them (items 36 and 67, and item 60 for the positional rule's scope; `seq`'s device settled by row 556's fix; the implicit bound decided as P-42); PLAN.md holds no such list, and the sentence's only source is his go of 2026-09-27T05:49:41.431Z to launch phase 3's batch, answering the coordinator's 05:15:38.486Z. The status is cut to one line: "Built: walk's load check over every pair of functions with static parameters, by climb batch 17's rung G" goes to this history (`6d187d069`; F-252); the list of what is not built and the rows where walk and the checker disagree (row 759, and rows 786 to 788 after climb batch 19's reading of exclusion, P-152) become one "Still to build" line, their detail in F-26 and the ledger rows. The rest kept. Its sources: 2026-09-26T12:07:33.636Z "Yes, agreed." and 12:08:32.187Z "Agreed, the judgement's recommendation.", answering the coordinator's 12:01:53.076Z "Answer 9" (the specification to the 2011 paper's rules, the old sentence kept as superseded text; the Return Type Rule over every case, and the positional rule that closes row 398; walk no longer choosing by the order of the declarations; the library repaired with its own techniques; no model line), the judgement being one he asked for at 2026-09-26T10:21:32.097Z; 2026-10-16T19:47:32.836Z, on the bullet of the coordinator's 18:36:34.247Z report that asked whether walk should compare every pair of generic declarations by the types they declare: yes, if that brings walk in line with the compiled checker, with his remark that the questions came with little context.

- P-45 **Overloads may differ in their static parameters (answer 9).** The specification drops its sentence that forbids it and states the type group's 2011 model, which the checker runs; the old sentence stays as superseded text. The checker keeps the paper's three overloading rules, checks the Return Type Rule over every instance, and requires two generic declarations in the more-specific relation to agree on their static parameters position by position, as Java's overriding rule does (row 398). Walk dispatches on declared domains, not by the order of the declarations, and its load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude, so that walk and the checker accept the same pairs (row 159). The library repairs its refused families with its own exclusions, and no model line changes. The judgement's smaller choices took the record's defaults, listed for his review in `PLAN.md`. Built: walk's load check over every pair of functions with static parameters, by climb batch 17's rung G. Not built: a functional method of a generic trait or object is still compared on its instances (F-26), the Meet Rule's search matches only some domains (row 539), two nested generic functional methods of a trait or object are refused at load where the same two functions load (row 779), and in a trait with static parameters load and fail at a call (row 780). Rung G's reading makes walk and the checker disagree on row 759's pair: walk refuses `g[\T\](a: T)` beside `g(a: Any)`, and the checker accepts it. Climb batch 19's reading of exclusion (P-152) leaves three more, rows 786 to 788.

### P-46

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-46" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-46" · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: three changes. "A numeral whose candidate types are incomparable reads as `ZZ32`, or as `ZZ64` or `ZZ` by its magnitude." leaves for the review queue as a drafted item: it is the conversion judgement's Q1 default, one of those "taken as defaults, listed for your review" (`reviews/conversion-overloading-judgement.md`), which `54208c796` labelled a default and every text since `bc8902f47` states unlabelled; his yes took decisions 1 and 2, not the defaults. In the reason, "generic code is never fast" is dropped, a premise that the coordinator corrected the same minute: at 2026-09-28T13:10:04.957Z, on the coordinator's question of 13:00:37.102Z, he gave his principle as making it fast, generic being never fast; the coordinator's 13:10:43.877Z answered that here the plain version is the catch-all over `Any` and the generic one the specialised code, stamped out per type, so that "generic is slow" holds of Java's generics and not of Fortress's design; at 13:32:53.221Z he then chose fast generics over `Any`, generic code that the JVM can specialise, if the option is sound. His broader rule is reworded to his words of 13:51:00.915Z, answering the coordinator's 13:38:52.883Z: a conversion that reaches a specific implementation is applied, and only when every combination is exhausted without one does a plain implementation run; the old text said "before a generic one". The rest kept. Its sources: 2026-09-28T19:06:50.868Z, his "C-O. Both recommendations for batch N accepted.", answering the coordinator's 14:52:02.906Z (decision 1, which version runs when conversions meet overloading, with the recommendation on the page; decision 2 on the page); 2026-09-27T19:30:05.855Z, his "Agreed.", answering the coordinator's 19:24:33.002Z (static arguments inferred with coercion by his answer-8 promotion, built with the numeral switch as one batch).

- P-46 **A conversion makes a call possible, and never changes which declaration runs when one already fits.** Declarations are chosen on declared domains, by applicability and then specificity (P-45). The chosen one is instantiated by answer 8's promotion (P-74), its coercions inserted statically. So beside a plain arm over `Any`, a generic arm over `T extends Number` runs at `ZZ64` for a mixed-width call. A numeral whose candidate types are incomparable reads as `ZZ32`, or as `ZZ64` or `ZZ` by its magnitude. Why: generic code is never fast, and he wants code that a JVM can specialise. His own broader rule, to convert toward a specific declaration before a generic one, is not taken. Both paths infer static arguments with coercion and the same promotion, and P-49 orders the checker's attempts. Still open: the dispatch between two generic declarations (row 537, PLAN phase 5).

### P-47

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-47" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-47" · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: the premise corrected from its source: the specification's `ZZ` declares `MIN` and `MAX` and no `MINMAX` (`Specification/basic-lib/basic-integers.tex:263-264`), where the judgement's context line, and the entry after it, gave all three. "Row 484's `NN32` half, a numeral beside an `NN32`, is still open." struck as the state of the project: it was not part of his decision, since row 484 covered `b MAX 1` only when he took it; row 484 and F-138 hold it. The rest kept. Its source: 2026-09-28T19:06:50.868Z, his "C-O. Both recommendations for batch N accepted.", which took decision 2 of the conversion judgement's page (option 1: each integer type declares its own `MIN`, `MAX` and `MINMAX`, so that every such call answers at answer 8's type, the library's own device); the coordinator's 14:52:02.906Z had put decision 2 on the page only.

- P-47 **Each integer type declares its own `MIN`, `MAX` and `MINMAX`.** It follows `QQ`, `RR64`, the compiler library and the specification's `ZZ`, so that under walk the family answers at the promoted type. Row 484's `NN32` half, a numeral beside an `NN32`, is still open.

### P-48

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-48" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-48" · commit `20474c144` · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: the option's callout comes back as one sentence: option 1 of the coordinator's 2026-09-29T16:52:08.446Z, which he took, said that both implementations still use the value's type at run time, the interpreter always, since it has no static types, and the compiled path until phase 5; the specification's callout says the same (`Specification/basic/overloading.tex`, `revival-dispatch`). "Built under walk for a reduction or comprehension that writes no static argument by climb batch 15 (`20474c144`)." goes to this history, and its reading, the coordinator's call 1 of climb batch 15, which reads past this entry's "never ... the value's type alone" (`CLIMB-BATCH-15.md`; PLAN, "Climb batch 15, listed for his review", call 1), leaves for the review queue as a drafted item. The rest kept. Its sources: 2026-09-29T17:34:18.956Z, answering the coordinator's 17:29:52.529Z (the options unchanged, option 1 recommended), which restates its 16:52:08.446Z ask whether to adopt the POPL 2019 paper's rule for a type parameter that the arguments do not fix: he did not follow the options, but by his rule that the team's later work supersedes the earlier, and on the coordinator's word that the rule is the paper's and resolves the question cleanly, he trusts the team's work over his own understanding, and it may be recorded; 2026-10-03T04:14:20.092Z, answering the coordinator's 04:01:11.833Z item 20 (drop the `extends Object` bounds on `fail`, `builtinPrimitive` and `List`'s empty comprehension): yes, the library goes back to the team's own declarations.

- P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** Its instance is the intersection of its upper bounds, constrained by the call's static return type, never the arguments' union or the value's type alone. The rule is the team's later word (POPL 2019). He ranks the team's later work above his own reading. It sets the instance, not which declaration runs (P-46). MicroGPT's types are concrete, so it is untouched. The library keeps the team's unbounded declarations. Built under walk for a reduction or comprehension that writes no static argument by climb batch 15 (`20474c144`). Still to build: a compiled dispatcher that carries the static return type (row 538, PLAN phase 5).

### P-50

2026-10-22 01:38Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c3.md`, "P-50" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c3.md`, "P-50" · by the POSITIONS audit's writer for chunk c3 (Opus), proposed for his review: "Row 642 stays `CONTESTED` only because the ledger's tool cannot close it." struck as the state of the project, with no source of his: climb batch 12's gather wrote it (PLAN-history, "Climb batch 12, listed for his review", gather.2), and PLAN, "Climb batch 12, listed for his review", gather.2, review-queue item 165 and ledger row 642 hold it. The rest kept. Its sources: 2026-10-09T06:59:48.891Z, his "(a) has a yes", answering the coordinator's 06:56:20.441Z, which explained `label` as a named block left early with a value and the `typecase` rule behind Q48, and asked again; before it, his 06:55:25.847Z, on the coordinator's Q48 of 06:46:36.728Z (recommendation: (a) yes, (b) not now), asked what `label` and the `typecase` ruling were, and read the block as getting the same inference as a function body, which made sense to him. The `typecase` ruling is his "2-4 yes" of 2026-10-08T21:41:02.325Z, which he did not recall on 10-09.

- P-50 **A `label` body takes the expected type of the whole `label` (item 48 (a)).** The specification types a `label` as the union of its body's last expression and its exits' `with` values. So the checker passes the expected type of the whole into the body and into the exits' values, as for a `typecase` clause, and the inference chapter lists both contexts. P-51 is the other half of item 48. Row 642 stays `CONTESTED` only because the ledger's tool cannot close it.
```

**What check does not see.** It checks pointers only inside FACTS and POSITIONS, and only for a live target and its quoted words. The lines elsewhere that this proposal makes stale, or that were stale before it, pass. Each entry's "Pointers elsewhere" lists them:
- `reviews/open-asks-2026-10-16.md:183` (P-43's later word) and `:257` (P-42's functions, with question 1);
- the `fortress-repo` skill's `SKILL.md` on `Any` and functions (question 1);
- `PLAN.md:464` (P-45's line number, stale before);
- review-queue items 17, 67 and 165 (`review-queue-items-c3.md`).

## The rules, where they fit badly

- **Rule 0 against rule 6, on P-43's "He cares ..." sentence.** The judgement calls it a remark, which rule 6 strikes. It is his, condensed fairly, and it claims nothing false, which rule 0 keeps. It also weighs on the route C that P-95 keeps open. I kept it and asked him (P-43, question 2).
- **Rule 4 and P-43's reason.** Rule 4 rewords from his intent, or puts the point to him where no wording follows. He gave no reason when he chose A. The new reason comes from his later recollection and from the ask he took, so I wrote it and asked him to confirm (P-43, question 1).
- **Rule 8 and P-42's functions.** Rule 8 is for a premise false today. This premise is true by the specification that the revival keeps, and false by the team's later Types chapter: a conflict between the team's sources, which no decision of his settles. Rule 0 keeps it, and the conflict goes to him (P-42, question 1).
- **Rule 9 against the judgement, on P-42's row 412 sentence.** The judgement reads it as the state of the project. Rule 9 keeps what is still to build, with its PLAN item: the departure ends at the switch-over, PLAN's phase 4. I kept it word for word.
- **Rule 9 and P-45's rows.** "One short line with its PLAN item": six of the eight rows are under PLAN, phase 3, item 19. F-26's case and row 539 have no PLAN item. I named the item that covers most of them rather than drop the two.
- **Rule 9 against rule 6, on P-47's row 484.** It reads as "still open", but it is no work left under this decision: his decision is built, and the `NN32` half is walk's numeral switch. So rule 6 strikes it, and F-138 holds it.
- **Rules 9 and 2 together, on P-48's batch 15 sentence.** The built state goes to the history (rule 9), and the reading behind it goes to the queue (rule 2), since the batch record says that it reads past the entry's letter.
- **Rule 0 against rule 1, on P-48's new sentence.** It adds words. They are the callout of the option he took, and without them the entry says more than he decided. Rule 1 asks for the part of the rule that cuts, so I added it.
- **Rule 3 on a sentence, not an entry, in P-44.** The sentence kept three landed changes. P-88 and P-27 cover them, so nothing that a worker needs leaves with it.
- **Rule 10 and the history.** I quoted his words only where a short answer is the decision: "All right. B it is.", "Agreed, (b) factory", "Option one", "Agreed. Route A it is.", "Option 1.", "Others approved.", "Yes, agreed.", "Agreed, the judgement's recommendation.", "C-O. Both recommendations for batch N accepted.", "Agreed.", "(a) has a yes" and "2-4 yes". His longer messages are reworded.
- **The brief's "edit none" and the tool.** No strike in this chunk needs another entry's pointer rewritten, so the apply touches only the chunk's own lines.
