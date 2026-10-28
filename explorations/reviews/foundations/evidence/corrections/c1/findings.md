<!-- The findings of a review on the entries of chunk c1, cut word for word from explorations/reviews/foundations/evidence/salvage-findings.md by cut-findings.py, after the source's note on its sources. -->

"At issue" quotes POSITIONS.md as it stands (last changed 5da8144e4). In quotes, [..] replaces a shorthand of the reports and "…" a cut. Sources (explorations/reviews/foundations/): judgement.md (the judge's; cited as "tenet N", its §2, or "§N"), tenets-evidence.md (evidence map), prelude-lens.md (prelude sweep), rewrite-results.md (rewrite note), evidence/trap-test/key.md and grades.md; "dialogue" is conversations/02-phase3-exit-foundations.md. Old reader: the trap-test reader with today's entries (10 of 12); "scenario N" is the trap test's. All times UTC. One-line entries: named as stated, no fault found.

**P-7**, revising the text. At issue: "the team's later work, in the compiler"
Reports: "'Later work in the compiler' is two things: a rule the team's checker enforces on purpose … and an accommodation of the JVM or of a checker gap" (tenet 1).
Plain: Two kinds of work are mixed; point to P-26.
Ground: the judge's reasoning only. Elsewhere: no.

**P-26** (a), reason and list. At issue: "learned what is feasible"; "made siblings in 2009 and 2010"
Reports: "A JVM limit the team hit is evidence about [the JVM layer], not a reason to rank a [language] text" (tenet 2).
Plain: Wrong layer: a JVM limit ranks a language text; 2009 code counts as "later".
Ground: the judge's reasoning, on his three-layers frame (2026-10-26 05:25:27); commit 6896886fb (Chase, 2009-08-31), before the Working Draft's last edit. Elsewhere: no.

**P-26** (b), no source. At issue: "The implementers' later word also outweighs unfinished text."
Reports: "…is the coordinator's sentence with no source" (tenet 2).
Plain: Reason not the curator's; the judge says strike it (§9, item 4).
Ground: commit bc8902f47 (2026-09-30); positions audit P-26 §3. Elsewhere: review-queue item 215.

**P-26** (c), no test for "later". At issue: "it knows less than they did"
Reports: "(4) date a code commit against the texts before calling it "later"; (5) where two later sources conflict, stop ranking and decide by P-8's goal" (§7).
Plain: Missing rules (§7 lists six); the old reader decided worse in scenario 2 (1 of 2).
Ground: the judge's reasoning; trap grades §4; his yes to rewording P-26 and P-37 (2026-10-26 07:42:15). Elsewhere: no.

**P-27**, the library's practice. At issue: "The library's own practice is the standard."
Reports: "supplied Y's wrong-[layer] ground … It does not decide between two of the team's own designs; the dated later word does" (trap grades §4; Y: the old reader).
Plain: Read alone, it led the old reader to drop a rung (scenario 2).
Ground: trap test, scenario 2. Elsewhere: no.

**P-37** (a), his reason is missing. At issue: "as a bootstrap to remove"
Reports: "His goal of 10-26 … is the [language] reason and is not in the entry" (tenet 3).
Plain: Missing reason; the old reader listed a `CompilerSystem` bridge (scenario 4: 1 of 2).
Ground: his words, 2026-10-26 04:47:50: "avoid the need to port walks library into the compilers library". Elsewhere: dialogue §4 only.

**P-37** (b), a permission with no rule. At issue: "may take a design of the prelude's"
Reports: "this reads an [JVM-layer] bootstrap as a design source with no rule for when" (tenet 3).
Plain: Missing rule. §3 gives it: a prelude design binds if later language text backs it, or the team's checker enforced it; never a stub; "later" is a date.
Ground: the judge's reasoning; his caution of 2026-10-26 07:30:36. Old reader: scenario 2, 1 of 2. Elsewhere: F-84, F-225 (two designs that do not bind); the rule: no.

**P-37** (c), the premise. At issue: "the compiled path reads the interpreter's library with it"
Reports: "the premise is unmeasured, not refuted … F-34 and [the phase 3 exit judgement's] two phase-4 zeros are now the answer, and the entry should carry it" (tenet 3).
Plain: The library is shown to check, not to run, compiled.
Ground: F-34 (52 refusals); his doubt of 2026-09-20 15:18:35. Elsewhere: F-34, F-291, rows 339, 832 (0d2206c5f); the entry: no.

**P-37** (d), three files. At issue: "`CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`"
Reports: "names three files, so that `CompilerSystem` falls outside its letter" (trap key, scenario 4).
Plain: A fourth wired file, `CompilerSystem`, is imported by 27 compiled tests.
Ground: prelude sweep §0; `phase3-exit/zero-audit.md` A.2. Elsewhere: no.

**P-43** (a), two reasons not his. At issue: "the flattened prelude is the team's last record of the Fortress way"; "not how a specialisation is chosen"
Reports: "his phrase "the team's last record" was about the forest rule"; "joins the two meanings of specialisation and he said it was not an answer" (tenet 5).
Plain: Reasons not his; wrong layer and date (2009 code, earlier than the texts).
Ground: his words 2026-09-24 01:02:52 (of the forest rule) and 14:41:40 ("Agreed. Route A it is.", no reason). Elsewhere: review-queue items 219, 220.

**P-43** (b), the language's grounds. At issue: "keeps the multiple instantiation exclusion rule"
Reports: "The exclusion rule is the type group's published position four times over … numeric types "are mutually exclusive; no value has more than one of them"" (tenet 5).
Plain: Missing reasons: the 2011 paper, the 2012 Types chapter, Naden 2012, POPL 2019, that sentence; the prelude's flat shape as the compiled world's instance of the same answer.
Ground: `types-vals-vars.tex:502` and the texts' lines in tenet 5; his words 2026-10-26 07:46:17 ("decided why we took the flat numeric tower"). Elsewhere: F-44 (`TypeMapping.tex:125`, 0d2206c5f), F-46; the sentence: in no FACTS or POSITIONS entry.

**P-146** (a), a reason that misleads. At issue: "reads the library as the team wrote it"
Reports: ""Why: the checker reads the library as the team wrote it" invited the reviewer's ground" (trap grades §4).
Plain: It led the old reader to drop the rung copying the prelude's `comprises T` because the library never had it; the ground is the date (Naden, 2012-08-31, after Steele's edits).
Ground: trap test, scenario 2 (1 of 2); `justificationOfRTR.tex:626-630`. Elsewhere: no.

**P-146** (b), the idiom's history (not in the entry's text). Reports: "the history of the self-type idiom that P-146 rests on misses the team's last edit of that trait" (prelude sweep §7).
Plain and ground: Steele's 655e65d53 (2012-06-05) added `comprises T`; 59fdeff62 (2012-06-06) removed the F-bound. Elsewhere: F-225 (0d2206c5f).

**P-153**, the integer power. At issue: "gives an integer power the type of its integer base"
Reports: "its sound ground is that the [Working Draft's] ℚ-valued power was never built on either path and the prelude's rule is the only implemented one" (§3).
Plain: Wrong layer: compiled-path code called the language's later word.
Ground: the judge's reasoning; prelude sweep §2.2, P5 (5ad4a9957). Elsewhere: no; the rewrite note lists it as owed.

**P-154**, list order. At issue: "`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`"
Reports: "a library draft whose first commit in git is the root snapshot `5a68404fd`, 2012-07-19, so its date is unknown" (evidence map, tenet 2(c)).
Plain: "Later" cannot be shown for this draft. Ground: git. Elsewhere: no.

**P-158** (a), the specification. At issue: "asks for no body there, not for no declaration"
Reports: ""for each field declaration and non-abstract method declaration in the exported declaration", and may give an abstract one a concrete declaration" (rewrite note).
Plain: False: the export rule asks no declaration for an abstract member, so P-158 rests on the team's later export check (P-26), which tenet 2(e) lists among checker code counted as the language's later word (open: BOOT.md ask 2). The judge (§3) had called the text unclear.
Ground: `Specification/basic/components/source-code.tex:372-385`; the team's checker quoted the rule in 80d8c678a (2009-02-03). Elsewhere: climb batch 22c, question 3; BOOT.md ask 2.

**P-158** (b), the date. At issue: "export check of 2012 enforces it"
Reports: "the count is Sukyoung Ryu's, `ac0d41de0`, 2009-05-08; `5a68404fd` and `a9c625b1e` of 2012 are parentless snapshots" (rewrite note, "Still owed").
Plain: False date: the member count is of 2009-05-08.
Ground: commit ac0d41de0 (sukyoungryu). Elsewhere: row 816 (60aaeb6bb); the entry: no.
