<!-- The findings of a review on the entries of chunk c1, cut word for word from explorations/reviews/foundations/evidence/salvage-findings.md by cut-findings.py, after the source's note on its sources. -->

"At issue" quotes POSITIONS.md as it stands (last changed 5da8144e4). In quotes, [..] replaces a shorthand of the reports and "…" a cut. Sources (explorations/reviews/foundations/): judgement.md (the judge's; cited as "tenet N", its §2, or "§N"), tenets-evidence.md (evidence map), prelude-lens.md (prelude sweep), rewrite-results.md (rewrite note), evidence/trap-test/key.md and grades.md; "dialogue" is conversations/02-phase3-exit-foundations.md. Old reader: the trap-test reader with today's entries (10 of 12); "scenario N" is the trap test's. All times UTC. One-line entries: named as stated, no fault found.

**P-7**, revising the text. At issue: "the team's later work, in the compiler"
Reports: "'Later work in the compiler' is two things: a rule the team's checker enforces on purpose … and an accommodation of the JVM or of a checker gap" (tenet 1).
Plain: Two kinds of work are mixed; point to P-26.
Ground: the judge's reasoning only. Elsewhere: no.

**P-27**, the library's practice. At issue: "The library's own practice is the standard."
Reports: "supplied Y's wrong-[layer] ground … It does not decide between two of the team's own designs; the dated later word does" (trap grades §4; Y: the old reader).
Plain: Read alone, it led the old reader to drop a rung (scenario 2).
Ground: trap test, scenario 2. Elsewhere: no.

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

**P-12**, walk runs the checker. At issue: "walk runs the checker on its programs"
Reports: "walk has no case for `CoercionInvocation` …; and F-290's 624 errors stand between the checker and the components walk's programs import" (tenet 9).
Plain: Bigger than stated: Scala checker on under walk, inserted coercions read, components cleared; unmeasured.
Ground: code reading (`StaticChecker.java:228-229`), F-290. Elsewhere: F-9, row 833 (0d2206c5f); the entry: no.

**P-17**, unboxed doubles. At issue: "cannot box its numbers"
Reports: "they do not cite `objects.tex:38` or `binary.tex:76-82`, which are the [language] grounds" (tenet 7).
Plain: Missing reason: the specification's own words on unboxed values.
Ground: Working Draft `objects.tex:38`, `binary.tex:80`. Elsewhere: no.
