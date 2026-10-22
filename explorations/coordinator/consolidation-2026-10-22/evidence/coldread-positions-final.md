<!-- The cold read of POSITIONS after the clarity pass, the scrape and the new revival part, 2026-10-22: an Opus reader with only the worker skill, the part read whole; 53 entries clear, 28 partly clear, none blocked. Saved by the coordinator from the reader's final message. -->

## Cold read of POSITIONS.md (81 entries), after the rewrite of the skill's revival part

**Counts:** 53 clear, 28 partly clear, 0 blocked. In every entry I could tell what the curator decided. The 28 partial entries fall short on what the decision requires of a worker, or on what of it the tree lacks. Three of them (P-12, P-17, P-54) fall short only because they name no ledger row.

**Terms that block more than one entry:**
1. **Choices the curator has not approved.** The phrases are "a choice taken without the curator's word" (P-46, P-49), "kept without the curator's word" (P-48), "an agent took without his approval" (P-33), "It is not the curator's answer" (P-85) and "against the option he chose" (P-151). Neither the skill nor these entries say what a worker does with such a choice: build on it, leave it alone, revert it, or raise it. `revival-changes.md` covers only sentences that cite no P-N entry. This is a project term the skill does not define.
2. **"rung".** The skill never defines it; it appears only in test and folder names. It blocks P-32, P-39 and P-58. In P-54, P-62, P-68, P-148 and P-155 the context makes it readable.
3. **"batch" and the words built on it:** "the batch's gate" with a "step 8", "commit stage", "repair batch", "climb batch 17" and "the same batch". These appear in P-30, P-33, P-39, P-79 and P-151. The skill defines "batch" only in `session.md`, as "a run of other agents that build and test at the same time". `gate.md` describes a gate of seven steps.
4. **Decided but unbuilt parts that name no ledger row:** P-12, P-17, P-54, P-58, P-73, P-84, P-88 and P-151.
5. **"decision A, the way the `double[]` store goes under a float vector":** in P-84 and P-85. It is unclear wording.

## Entries that are partly clear

- **P-12.** The whole step is unbuilt ("Walk is not changed for this before the switch-over"), and the entry names no row for it. P-68 names row 330 for a similar step after the switch-over. *Missing row.*
- **P-17.** "Today the code generator boxes every number": the entry names no row for this, and no time when unboxing is due. *Missing row.*
- **P-25.** "It says that `Bottom` cannot be written in a program." The entry counts this among the passages whose use "P-97 holds", but P-97 covers only exclusion and `covariant`. So it is unclear whether the revision adopts the rule and the tree should refuse a written `Bottom`, or whether the entry only reports it. *Unclear wording.*
- **P-27.** "The library's own practice is the standard" sits beside P-25's "`Specification/` stays the standard". The word "standard" is used in two senses. "No fix is designed from the specification alone" can also be read as library practice outranking the specification. `library.md` instead treats such a disagreement as a conflict, under `specification.md`. *Unclear wording.*
- **P-30.**
  - "must take less than a minute": the entry does not say whose duty this is, or what follows when a change makes the check slower. P-29 and `interpreter.md` ("Do not edit anything to make walk faster") rule out the obvious remedy. *Unclear wording.*
  - "after a batch" and "Each batch's commit stage". *Project term.*
- **P-32.**
  - "kept current": the entry does not say by whom. Does a worker who changes something that `explorations/coordinator/map/` describes update the map? *Unclear wording.*
  - "each rung's mission briefing (`references/batch.md`)" and "The boot" point to parts of the coordinator skill, which a worker does not load. "rung" is undefined. *Project term.*
- **P-33.**
  - The paragraph "One decision that an agent took without his approval: row 320 … gated the other as an expected failure instead of fixing it" gives no ruling: is the gated half accepted, or still to be fixed? *Unclear wording / project term.*
  - "The repair batch from the reviews of the landed batches" and "on 2026-09-27 he said". The date is out of place in a record that `records.md` says carries no dates. *Project term.*
  - "phase 3 … phase 6" clashes with the skill's "The phases", which are compiler phases, and phases 1 and 2 are never given. *Unclear wording.*
- **P-38.** "Its `Maybe` block … stay as landed": the entry does not say which block, or what "landed" refers to. Row 331 does not settle it. Row 348 does explain "reversed" (it means "inverts"). *Unclear wording.*
- **P-39.**
  - "The count's stage, step 8 of the batch's gate": `gate.md`'s gate has seven steps and no count stage. "The batch's gate" and "the gate" read as two different gates, so a worker briefed to run the gate cannot tell whether the count is his to run. *Project term.*
  - "a rung … listed in advance … in the field `expectedCheckerCrash` of its manifest": "rung" and "manifest" are undefined, and F-66 only repeats them. *Project term.*
- **P-40.**
  - "The 17 vector and matrix operators … lose their unused sizes by `explorations/perf-probes/array-sites/e3-rebased.patch`": is the patch applied or still to apply? A patch path rather than a commit suggests pending; the present tense suggests done. *Unclear wording.*
  - "the array design" is used before P-85 defines it. *Minor.*
- **P-45.**
  - "their static parameters must line up position by position, as Java's rule for overriding a generic method requires": the entry does not say what must match (the count, the bounds or the order), or whether either path enforces it. *Language concept the skill does not define.*
  - "two nested generic functional methods" reads as one method declared inside another. Row 779, as `interpreter.md` gives it, means declared domains that lie one inside the other. *Unclear wording.*
- **P-46.** "Walk … promotes from the arguments' run-time types: a choice taken without the curator's word": status unclear (term 1). *Project term.*
- **P-48.**
  - "Under walk, dispatch takes the value's type, and always will, since walk has no static types" contradicts P-12, under which walk gains static types after the switch-over. It reads either as "never" or as "until walk runs the checker". *Unclear wording.*
  - "(walk's `Bottom` for row 591 kept without the curator's word)": status unclear (term 1). *Project term.*
- **P-49.** "Between the two, the checker tries subtyping with the expected type, a choice taken without the curator's word": status unclear (term 1). The four attempts are spread over three sentences, but their order can be followed. *Project term.*
- **P-54.** "Later, a rung after the switch-over makes `QQ` follow the float ruling" is a decided change with no row. P-68's row 330 is said to cover only the float types. *Missing row.*
- **P-58.**
  - "The first natives rung builds them … the later rungs move the bindings": "rung" is undefined. *Project term.*
  - "the compiled checker sees each rung's bindings as that rung lands" reads two ways: the count includes them, or the checker type-checks the native bodies. *Unclear wording.*
  - "neither the loader nor the rewrite exists", but no row is named. *Missing row.*
  - `library.md` still says "A new native is a Java class under `interpreter/glue/prim/`". A worker who adds a native today cannot tell which form to use. *Unclear wording.*
- **P-60.**
  - "The addendum also asks that the checker use coverage only in its overloading rules … not in its general subtype test": this sits inside the "Why", so it is unclear whether it is a requirement on the checker. *Unclear wording.*
  - "at calls that need no coercion" leaves the case of a call that needs coercion open. *Unclear wording.*
  - No row and no FACTS entry says what of this is built. *Missing row.*
- **P-66.**
  - "The team did so with rounding" names no rule. *Unclear wording.*
  - "Where the JVM prevents a correct implementation, the project gives way for now" does not say what giving way requires of a worker: accept the JVM's result, or record a row? *Unclear wording.*
- **P-73.**
  - The title opens "Under walk", yet the rule is the specification's. It is unclear whether the decision also binds the compiled `NN32`/`NN64` arithmetic and the compiled powers (rows 441, 442 and 523, which other entries name). *Unclear wording.*
  - The saturating operators "wait for a later step of their own", with no row. *Missing row.*
- **P-75.** "Each way to build it changes a decided behaviour": the entry does not say that the coercion is unbuilt, or what a worker does. Only printing row 575 shows that it waits for the curator's choice (status CONTESTED; "Not built; … for the curator"). *Unclear wording.*
- **P-78.** "writes its static argument where its generators and body do not fix the element type" conflicts with `revival-changes.md` ("Write it in every clause form") and with `library.md` ("also where the generators, the body or a declared type fix it"). Row 731 calls the refusal a checker gap and gives writing the argument as the workaround. So the entry reads either as a language rule or as a workaround to apply always. Its own example writes the argument where the generators and the body appear to fix the type. *Unclear wording.*
- **P-79.** "If a change breaks a demo … the same batch rewrites the demo": nothing in the skill (no suite, gate step or command) runs `ProjectFortress/demos/`, so a worker cannot tell whether his change broke a demo. "batch" is undefined. *Project term / unclear wording.*
- **P-84.**
  - "decision A, the way the `double[]` store goes under a float vector": "goes under" is unclear. *Unclear wording.*
  - The unbuilt `double[]` store has no row. *Missing row.*
- **P-85.**
  - "The whole preparation for the array work is to be done before the switch-over": "preparation" is undefined, and the entry does not say who does it or which tasks it holds. *Project term.*
  - "way 4a … It is not the curator's answer": should it be kept, reverted or flagged (term 1)? *Project term.*
  - "goes under a float vector", as in P-84. *Unclear wording.*
- **P-88.** "`ReadableArray2` … is also wanted": is that a decision with a schedule, or a wish? No row. *Unclear wording / missing row.*
- **P-90.** "Gating row 331 on static-argument inference instead is parked": the skill does not define "gating a row on" something, and row 331 does not explain the phrase. *Unclear wording.*
- **P-96.**
  - "P-80 and P-147 call it the S1 form": neither entry says "S1 form" any more, so the alias points at nothing. *Unclear wording.*
  - The entry asks for "what a return to route C would mean for it" on every change. `specification.md` asks for "what a reversal to the alternative not taken would need". For a change that has nothing to do with numbers, such as P-54 or P-147, the route-C item reads oddly. *Unclear wording.*
- **P-151.**
  - The entry says `addLeft` and `addRight` "move into `List`". It then says "Climb batch 17 kept `addLeft` and `addRight` in `AnyList` … against the option he chose", without saying whether the move is still owed (no row) or the batch's result stands. *Project term / missing row.*
  - "the team's commented-out generic `distribute`, after a measurement, the other two" contradicts F-242, the entry it cites. F-242 says the team's commented text "only moves the two errors", and that a different `distribute`, whose result is over its own `K`, clears them. "after a measurement" also reads as either done or pending. *Unclear wording.*

## Clear entries

7, 8, 9, 10, 11, 19, 26, 28, 29, 37, 41, 42, 43, 44, 47, 50, 51, 52, 53, 55, 56, 57, 59, 62, 67, 68, 69, 70, 71, 72, 74, 76, 77, 80, 87, 89, 91, 95, 97, 98, 102, 103, 124, 125, 146, 147, 148, 149, 150, 152, 153, 154, 155

Small points that did not change these verdicts:
- **P-7:** "A pure-Java microGPT is the baseline" gives no path for that program.
- **P-19:** "lineage cleanup" is undefined, though "wait for" makes clear the files are to be left alone.
- **P-26:** `tail(x: List[ZZ])` is written in the papers' notation; in Fortress, `[ZZ]` indexes.
- **Section heading of P-17 and P-19:** "History he knows (do not re-explain)" is addressed to the coordinator, not to a worker.
- **P-147:** "its earlier allowance … goes" reads as a plan, but `interpreter.md` shows it is done.

No file was changed and nothing was committed. Besides `POSITIONS.md`, `SKILL.md`, the whole of `revival-changes.md` and lookups in the other `references/` parts (not `sources.md`), I printed F-53, F-66 and F-242 and ledger rows 320, 331, 348, 575 and 731 with `facts-extract.sh`.
