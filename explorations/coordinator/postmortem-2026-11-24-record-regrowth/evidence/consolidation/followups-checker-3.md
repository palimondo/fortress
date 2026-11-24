<!-- The hand-back of the Opus writer of chunk checker-3 of the FACTS consolidation of 2026-11-24, copied whole from the session transcript: what stayed over 600, what was removed, what was made true of the tree, the skill sentences to change, the pointers left for the coordinator and the entries to investigate. Applied at `a8fe49436f`. -->

# Follow-ups of chunk checker-3

The apply file for chunk checker-3 is written. `record.py check --base HEAD` passes with 0 failures, and the chunk is under its 600-per-entry budget.

**Apply file:** `/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/apply-checker-3.md`. Its header gives the `--by` value: `'consolidation of 2026-11-24, chunk checker-3 (Opus writer)'`. I applied it only in my worktree. `FACTS.md` and `FACTS-history.md` there are changed and not committed; nothing was pushed.

**Sizes:** 38,872 → 13,298 characters, against a budget of 13,800 (600 × 23).
- **Stay (23):** 22 rewritten, F-233 kept as it was.
- **Merged (5):** F-94 into F-227, F-220 into F-266, F-243 into F-242, F-244 into F-255, F-256 into F-250.
- **Removed (2):** F-231 and F-236.

**Over 600, with the sentence that needs the room:**
- F-225 (724): two readings that agents chose beyond P-146 (the `Containment` mixins, and `self` in a `comprises` trait). `record.md` says an entry must state that a worker chose it, and review-queue item 212 reads F-225 for the mixins.
- F-227 (678): the row 712 sentence. Without it, a reader concludes that every call through `{K, R[\T\]}` checks.
- F-237 (639): "The coordinator chose this place" (PLAN gives it as a default), and that the program is still refused at row 776.
- F-255 (644): rows 773 and 774. F-181 points here for row 774, and row 773 is the one hole left by the where-clauses probe's soundness tests.

**Removed, with their homes:** both go to the skill's `compiler.md`, "The checker's time". F-231's rule is the `Walker` split, `MethodSizeJUTest` and `WALKER_CASES_PER_METHOD`. F-236's twelve listed methods are in `MethodSizeJUTest.java`.

**Made true of the tree:**
- F-94/F-227: `Number` has no `comprises` clause now, so no library call meets the closed-trait case.
- F-268: `CodeGen.java:6781-6785` and the `GETSTATIC` description were stale; the `Any` case now goes through `generateTypeReference`.
- F-93 and F-237 now say that a worker or the coordinator chose the design, per PLAN.
- F-245 is retitled as a measurement bounded to climb batch 21's base, with its 8 cited to P-157.
- F-265 now says its evidence: observed once, by a probe that is no longer in the tree.
- F-235 is scoped to the solver's three memos; the checker has others.
- F-251 states that the tree departs from P-151 (`addLeft` and `addRight` stay in `AnyList`; row 799, contested).
- F-277: the old text named `FunctionalMethod.ast`, which does not exist; the file is `compiler/index/FunctionalMethod.java` (corrected in the provenance note).

**Skill sentences to change** (all in `compiler.md`):
- "The checker's time", the hash sentence: add "Inference variables, walk's wrapped values and the nodes that hold them hash by the JVM's identity hashes, as the checker's `DeclaredFunction`s do; no count-stage output and no checker choice reads that order." With this, F-232 could leave.
- "The checker's time", `MethodSizeJUTest`: add "and if a listed method is gone or back under the limit".
- "The checker's time": "about 80 to 180 seconds" should read "about 60 to 180 seconds" (F-240: about 65 s).
- "The checker's gaps", `where` constraint: add "Both paths refuse a type `where`-clause variable that a function or method introduces, 'E is undefined.': P-151 builds one only in a `comprises` clause."

**Pointers left for you:**
- **FACTS:** F-151 → F-227 (`squaredNorm(me)`) now lives in F-94's block of F-227's history. F-85 → F-250 (the identity functions' `cast` and `embiggen`) now lives in F-250's history and `rung-library-distribute/REPORT.md` §1. F-142 → F-245 (measured at `d212b2c1f`) now lives in `perf-probes/symbolic-operators/REPORT.md` §1.5. F-249 → F-276 ("while String's abstract `||` stood") is now in F-276's history. F-81 → F-245 ("no overloading error") now belongs to F-53, and F-81's "17 types" was never in F-245. F-181 → F-255 (how each path reads, row 774) is now in the skill's `revival-changes.md`.
- **PLAN and review queue:** PLAN:501 (F-236) → `compiler.md`. Review-queue item 188 (lines 554–557, F-243) → F-251. Review-queue line 1439 (F-243, F-250) → F-85 and row 436.
- **`sources.md`:** :671 (F-231) → `checker-speed-2/REPORT.md` §2, §6. :713, :724, :794, :801 (F-256) → F-250. :824 (F-278's own-`Index` refusal) → `rung-index-bound/SKEPTIC.md`. :1355 and :1492 (F-225) → F-377 and row 1094. :715 (F-255, row 781) → F-181. :725 and :812 (F-255) → F-255's history.

**Investigate:**
- F-267: does the checker still refuse a subtrait that inherits an abstract method named by an operator static argument? No ledger row or test holds it, and its probes are gone.
- F-265: does walk still stop with an `InterpreterBug` at an `Object`-bounded type variable given a tuple? Row 471 has no reproducer.
- F-255: the checker's other readers of an `extends` clause ignore a conditional parent, and no ledger row holds this.

Nothing was left undone. I ran no build or suite and launched no agents.
