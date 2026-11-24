<!-- The hand-back of the Opus writer of chunk checker-2 of the FACTS consolidation of 2026-11-24, copied whole from the session transcript: what stayed over 600, what was removed or merged, what was made true of the tree, the skill sentences to change, the pointers left for the coordinator and the entries to investigate. Applied at `888be70380`. -->

# Follow-ups of chunk checker-2

Chunk checker-2 is done. The apply file runs cleanly: `record.py apply` then `check --base HEAD` gave 0 failures, and none of the citation warnings are mine. I committed nothing, and I restored the worktree's record files after the trial.

**Apply file:** `/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/apply-checker-2.md`. Its header gives `--by 'consolidation of 2026-11-24, chunk checker-2 (Opus writer)'`.

**Size:** 30 entries and 31,450 characters before (chunks.json says 31,480). After: 27 entries and 15,771 characters, against a budget of 16,200. 27 stay, 3 are merged, none are removed.
- F-82 is merged into F-81 (the library's Meet Rule meets).
- F-91 is merged into F-89 (the range kinds over `ZZ32`).
- F-74 is merged into F-341 (walk's numeral). F-341 is in landed-2; its text is kept as it stands.

**Over 600:**
- F-75 (788): it gives the scope of the positional rule and the width of the object-domain skip, and says a worker chose both. Review-queue items 60, 979 and 520 read F-75 for the rule as built. Without it, a reader applies the rule to every generic pair.
- F-76 (731): it keeps the boundary of intersection typing (no static parameters). Without it, a reader takes P-60's tie rule to cover generic declarations.

**Removed:** none. F-92's rule is almost all in revival-changes.md, "Traits and objects". F-92 stays short only for the way around row 511, which the skill lacks.

**Made true of the tree:**
- F-63: the pilot's text.
- F-66: a `#stopped` table is red.
- F-78: the attempt order is in the list `attempts` in `Functionals.scala`, not at lines 962-966. It is retitled to the four attempts.
- F-87: "The expected type" is a paragraph of the chapter, not a heading.
- F-77: row 555 is now called contested.
- F-67, F-75 and F-90: status words cut ("still to build", "the curator has not decided").

**Skill sentence to change:** in revival-changes.md, "Traits and objects", after "...as `(1,2) < (1,2.5)` (row 511).", add: "Operands declared with one type at each position, as `p: (ZZ32,RR64) = (1,2)`, compare." F-92 then leaves FACTS. Also, `fortress-repo/references/sources.md:1193` cites "row 962 (F-74, F-140)"; F-74 is now F-341.

**Pointers for you:**
- The F-74 merge rewrote the pointers in F-118, F-262, F-263 and P-76 to F-341. So POSITIONS.md changes, and F-118 and F-262 now read "(F-341, F-341)": drop the duplicate.
- If the landed-1 or landed-2 apply files still name F-74 and run after mine, they will be refused.
- F-55 cited F-78 for "a parameter that nothing fixes takes `Any`", which is now in P-48 and the skill. F-250 cited F-85 for the identity fallbacks, which are in rung-generator-slips section 5. The checker-1 and checker-3 apply files on main already drop both pointers.
- F-285 (checker-4) repeats the `cast[\O0\]` sentence; F-85 is its home.

**Investigate:** none.

**Not done:** nothing.
