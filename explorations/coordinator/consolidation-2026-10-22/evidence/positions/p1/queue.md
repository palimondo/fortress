<!-- The judge's items for the review queue from the clarity pass on POSITIONS, chunk p1 of the consolidation of 2026-10-22: no held entry; two questions for the curator that proposals.md writes for applied entries (P-11, P-19), in the form of coordinator/review-queue.md, and notes on three items already in the queue that the applied text touches. -->

# Review-queue items, positions p1

No entry of this chunk is held. Two applied entries carry a question for the curator. Number them when they go into `coordinator/review-queue.md`.

**May a worker change `Fortify/fortify.sty` when the specification's PDF build needs it, or does that wait for his ask (P-11)?** P-11 says that the 2D notation, Fortify's typesetting of Fortress source as mathematics, is a gimmick: no work on it unless he asks. The specification's build uses Fortify: it puts `Fortify/` on its search path (`Specification/fortress/build.xml:43`). Before his verdict, the revival changed `fortify.sty` twice so that the PDF builds (`3b9cf3e39`, 2026-08-21; `9622f9db3`, 2026-08-23). The coordinator's text that he answered "word" on 2026-09-16 at 22:46 UTC said that Fortify would be touched only if the specification's LaTeX build changed, and that after his verdict this is a no. No message of his speaks of a repair that the build needs.
   - Landed: The entry as it reads. Default: a repair of `fortify.sty` that the specification's build needs waits for his ask, until he answers.
   - The other way: A worker may make a change to Fortify that the specification's build needs, and reports it. The verdict then covers new work on the notation, not keeping the build working.
   - Its cost: One clause of P-11. No rung waits on a Fortify repair today.
   - Home: POSITIONS P-11; `coordinator/consolidation-2026-10-22/evidence/positions/p1/proposals.md`, "P-11", question 1; `check.md` beside it, "P-11"
   - Needed by: before a named later piece of work, the next rung whose specification build needs a change to `fortify.sty`; nothing waits on it today.

**May a worker correct a file's account of the tree's lineage while editing it for another reason, or does every such file wait for the lineage cleanup (P-19)?** P-19 says that the tree is not described as the third-party port's migration grafted onto the team's history. The files that still describe it so wait for the lineage cleanup, a task parked in PLAN ("Off the path, parked"); `coordinator/lineage.md`, "Files that still repeat it", lists them. On 2026-09-23 at 06:02 UTC he held the cleanup. At 06:33 UTC he gave a first cleanup its go (`a4e266faa`, 12 files), and the rest was parked. In the same message he said that he prefers that the record does not mislead anyone into thinking the tree is built on the port, because it is not. That leans to correcting a file when it is touched. No message of his says which.
   - Landed: The entry as it reads. Default: every such file waits for the lineage cleanup, until he answers.
   - The other way: A worker who edits such a file for another reason corrects its account of the lineage then, by P-19's account by history and by content; the cleanup takes the rest.
   - Its cost: One sentence of P-19. Neither way changes code.
   - Home: POSITIONS P-19; `coordinator/consolidation-2026-10-22/evidence/positions/p1/proposals.md`, "P-19", question 1; `coordinator/positions-audit/full/evidence/takeaway-c1.md`, "P-19"; PLAN, "Off the path, parked", the lineage cleanup
   - Needed by: never; the cleanup is parked, the default can stand, and either way can be undone at any time.

## Notes on items already in the queue

- Item 215 (P-26, "The implementers' later word also outweighs unfinished text") stands, and this chunk adds no item for it. Once P-26 is applied, the item's paraphrase "the type group then made the language run" reads "then worked to make the language run". The second cold reader adds one point to it: "unfinished text" could take in the unfinished 2012 restart, whose Types chapter P-25 counts as the designers' later word. A strike of the sentence removes that reading too.
- Item 223 (P-87, the diff rule for a change to a model line): P-9 now restates that rule in its pointer to P-87. If he strikes the rule, P-9's clause "and a change to a model line is shown to the curator as a diff first" goes with it.
- Item 216 (P-27, which extensions the standard library takes): P-9's pointer glosses P-27 as "what microGPT invented goes into the library", P-27's first sentence. If he narrows P-27, that gloss follows it.
