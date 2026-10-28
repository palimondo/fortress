<!-- This file lists, for each POSITIONS entry that the foundations review's reports name, what they found about its text, with sources and where the record already holds it; it judges nothing. -->

"At issue" quotes POSITIONS.md as it stands (last changed 5da8144e4). In quotes, [..] replaces a shorthand of the reports and "…" a cut. Sources (explorations/reviews/foundations/): judgement.md (the judge's; cited as "tenet N", its §2, or "§N"), tenets-evidence.md (evidence map), prelude-lens.md (prelude sweep), rewrite-results.md (rewrite note), evidence/trap-test/key.md and grades.md; "dialogue" is conversations/02-phase3-exit-foundations.md. Old reader: the trap-test reader with today's entries (10 of 12); "scenario N" is the trap test's. All times UTC. One-line entries: named as stated, no fault found.

**P-7**, revising the text. At issue: "the team's later work, in the compiler"
Reports: "'Later work in the compiler' is two things: a rule the team's checker enforces on purpose … and an accommodation of the JVM or of a checker gap" (tenet 1).
Plain: Two kinds of work are mixed; point to P-26.
Ground: the judge's reasoning only. Elsewhere: no.

**P-8**, deciding by the goal. Tenet 1 finds it right as it stands.

**P-12**, walk runs the checker. At issue: "walk runs the checker on its programs"
Reports: "walk has no case for `CoercionInvocation` …; and F-290's 624 errors stand between the checker and the components walk's programs import" (tenet 9).
Plain: Bigger than stated: Scala checker on under walk, inserted coercions read, components cleared; unmeasured.
Ground: code reading (`StaticChecker.java:228-229`), F-290. Elsewhere: F-9, row 833 (0d2206c5f); the entry: no.

**P-17**, unboxed doubles. At issue: "cannot box its numbers"
Reports: "they do not cite `objects.tex:38` or `binary.tex:76-82`, which are the [language] grounds" (tenet 7).
Plain: Missing reason: the specification's own words on unboxed values.
Ground: Working Draft `objects.tex:38`, `binary.tex:80`. Elsewhere: no.

**P-25**, the Types chapter. Link of P-7 and P-26 only.

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

**P-33**, the phase order. At issue: "reports no error on the interpreter's whole library"
Reports: ""The interpreter's whole library" is wider than F-53's twelve, and his 10-26 goal says "the fuller library"." (tenet 6).
Plain: The zero covers twelve components (fourteen with `List`'s imports). The other 38 block P-12's step; code generation was unmeasured (F-34); phase 3 closes with batch 22c; two zeros go to phase 4.
Ground: F-53, F-290, F-34; his words of 2026-10-26 04:47:50 and 07:30:36; dialogue §9. Elsewhere: those FACTS (numbers); BOOT.md ask 3 (the 38).

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

**P-38**, prelude defects. Cross-reference of P-37 only.

**P-42** (a), "functions". At issue: "`Any` holds tuples, functions and `()`"
Reports: ""Functions" … the [Working Draft] puts arrows outside `Object`, the Types chapter inside; drop the word" (§4).
Plain: The texts disagree on functions, agree on tuples and `()`; his yes rested on the tuples.
Ground: `types-vals-vars.tex:136`, `:215-216` against `types.tick:232-238`; his yes 2026-09-29 14:02:25. Elsewhere: review-queue item 218.

**P-42** (b), the departure. At issue: "which ends the departure"
Reports: "the switch-over ends nothing by itself; `Shell.java:372` does, and no step named it (F-289, 685 errors under the command's setting)" (§4).
Plain: False: one line holds `Object` (Steele's 2012 setting for one path); no plan step flips it. `()` and tuple-typed dotted methods fail under either bound too.
Ground: `Shell.java:371-386`; Steele's 91e71e62e, c61723f61, afb02f41d (2012-05-28 to 30). Elsewhere: F-289, F-291, rows 412, 339, 832 (0d2206c5f); rung B of climb batch 22c. The claim also stands in the specification's callout (`trait-parameters.tex:62-65`) and the skill's `compiler.md`.

**P-42** (c), grounds missing. At issue: "The specification states the bound `Any`"
Reports: "(1) cite POPL 2019, the [Working Draft's] instantiation sentence and the library's practice as the grounds" (§7).
Plain: Missing reasons: POPL 2019 (`ParkPOPL2019.txt:418-419`) says `Any`; the Working Draft itself (`trait-parameters.tex:53-54`) says parameters take tuple and arrow types.
Ground: those lines. Elsewhere: only the specification's callout cites POPL 2019.

**P-42** (d), a stale example. At issue: "its arrays indexed by pairs"
Reports: "Since P-156, the arrays' index parameter has an explicit bound `Index`, so P-42's example "arrays indexed by pairs" no longer rests on the implicit bound" (evidence map, tenet 4(c)).
Plain: False as an example; element types such as `(E,F)` still rest on the bound.
Ground: P-156's text; `FortressLibrary.fsi:759`, `:1364`. Elsewhere: no.

**P-43** (a), two reasons not his. At issue: "the flattened prelude is the team's last record of the Fortress way"; "not how a specialisation is chosen"
Reports: "his phrase "the team's last record" was about the forest rule"; "joins the two meanings of specialisation and he said it was not an answer" (tenet 5).
Plain: Reasons not his; wrong layer and date (2009 code, earlier than the texts).
Ground: his words 2026-09-24 01:02:52 (of the forest rule) and 14:41:40 ("Agreed. Route A it is.", no reason). Elsewhere: review-queue items 219, 220.

**P-43** (b), the language's grounds. At issue: "keeps the multiple instantiation exclusion rule"
Reports: "The exclusion rule is the type group's published position four times over … numeric types "are mutually exclusive; no value has more than one of them"" (tenet 5).
Plain: Missing reasons: the 2011 paper, the 2012 Types chapter, Naden 2012, POPL 2019, that sentence; the prelude's flat shape as the compiled world's instance of the same answer.
Ground: `types-vals-vars.tex:502` and the texts' lines in tenet 5; his words 2026-10-26 07:46:17 ("decided why we took the flat numeric tower"). Elsewhere: F-44 (`TypeMapping.tex:125`, 0d2206c5f), F-46; the sentence: in no FACTS or POSITIONS entry.

**P-44**, `AnyIntegral` closed. Example of 2012 texts as the later word.

**P-47**, own `MIN` and `MAX`. Rightly taken from the prelude.

**P-48**, unfixed parameters. POPL 2019's own rule (§3); Steele's `Zilch` `fail` (0886e9654) does not bind (F-84).

**P-58** (a), the reason. At issue: "the library's own form"
Reports: "The entry's ground "the specification prints `builtinPrimitive`'s declaration" is weak: it is true only through the included library api" (tenet 8).
Plain: The first text (2026-10-10, 046207371) gave that ground; the present text gives none. The form is outside the language, so library practice decides.
Ground: Working Draft `appendices/future.tex:675` (no foreign-function interface); F-32. Elsewhere: no.

**P-58** (b), his informed yes. At issue: "Every native binding is a `builtinPrimitive` call naming a static helper."
Reports: "the yes must be informed and must come before climb batch 23, since after 449 bindings move the other form costs a library sweep" (tenet 8).
Plain: Owed. On 2026-10-22 22:02:17 he wrote that he was "unable to make fully informed decision from this fragment".
Ground: his words. Elsewhere: BOOT.md ask 4; phase 3 exit judgement §1 item 5.

**P-59**, walk's coercions. At issue: "MicroGPT's static types are concrete"
Reports: "P-59's "microGPT's static types are concrete" is the coordinator's premise, unmeasured … measurable only when microGPT compiles" (tenet 9).
Plain: Reason not the curator's; unmeasured.
Ground: the coordinator's premise on the page he answered on 2026-09-29 14:07, not the option he took. Elsewhere: review-queue item 221.

**P-60** (`comprises` as values), **P-66** (integer principle), **P-68** (float rounding types): prelude sweep only.

**P-74**, mixed integer widths. Prelude sweep, evidence map.

**P-75**, `NN32` into `RR64`. Named once (dialogue §6): "P-75 withdrawn", an earlier open ask.

**P-76**, `IntLiteral`. Taken from the prelude; its arithmetic bodies there were a stub (prelude sweep).

**P-77**, ranges over `ZZ32`. The trap key flags its Why and title as possibly misleading; no reader was misled (trap grades §4).

**P-78** (`SUM`, `PROD`): prelude sweep only. **P-80** (sign-refined types): evidence map only.

**P-84**, the `double[]` store. At issue: "among them is decision A"
Reports: "stamping "only renames", so no generic instance can hold a `double[]` … (the class loader's way, A4, is unmeasured)" (tenet 7).
Plain: Missing: stamping alone gives no `double[]` field; way A4 is unmeasured; also the unboxing words of P-17.
Ground: `array-design.md` §2, probe 1; `array-design-ways.md` §3. Elsewhere: F-18 (0d2206c5f).

**P-85**, the open array questions. At issue: "the array decisions A, B and D"
Reports: "His 09-20 lean for the class-loader way was "recorded as your leans, to confirm" and is in no entry" (tenet 7).
Plain: Missing: his lean of 2026-09-20, as a lean to confirm.
Ground: the coordinator's text of 2026-09-20 14:34:56 ("Recorded as your leans, to confirm"). Elsewhere: no.

**P-95**, spec changes recorded. Where to weigh a return to route C (§7).

**P-98**, `TotalComparison`. Prelude sweep only.

**P-146** (a), a reason that misleads. At issue: "reads the library as the team wrote it"
Reports: ""Why: the checker reads the library as the team wrote it" invited the reviewer's ground" (trap grades §4).
Plain: It led the old reader to drop the rung copying the prelude's `comprises T` because the library never had it; the ground is the date (Naden, 2012-08-31, after Steele's edits).
Ground: trap test, scenario 2 (1 of 2); `justificationOfRTR.tex:626-630`. Elsewhere: no.

**P-146** (b), the idiom's history (not in the entry's text). Reports: "the history of the self-type idiom that P-146 rests on misses the team's last edit of that trait" (prelude sweep §7).
Plain and ground: Steele's 655e65d53 (2012-06-05) added `comprises T`; 59fdeff62 (2012-06-06) removed the F-bound. Elsewhere: F-225 (0d2206c5f).

**P-147** (covering bodies) and **P-149** (sibling bodies): prelude sweep only.

**P-152**, existential reduction. A language text used as the later word; review-queue item 228 asks about its reason.

**P-153**, the integer power. At issue: "gives an integer power the type of its integer base"
Reports: "its sound ground is that the [Working Draft's] ℚ-valued power was never built on either path and the prelude's rule is the only implemented one" (§3).
Plain: Wrong layer: compiled-path code called the language's later word.
Ground: the judge's reasoning; prelude sweep §2.2, P5 (5ad4a9957). Elsewhere: no; the rewrite note lists it as owed.

**P-154**, list order. At issue: "`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`"
Reports: "a library draft whose first commit in git is the root snapshot `5a68404fd`, 2012-07-19, so its date is unknown" (evidence map, tenet 2(c)).
Plain: "Later" cannot be shown for this draft. Ground: git. Elsewhere: no.

**P-155**, symbolic operators. At issue: "checks the overloads of symbolic operators"
Reports: "Row 782: the export check reads top-level symbolic operators (P-155 read to cover the export check …)" (§5, rung 2).
Plain: The entry speaks of the overloading check; the batch reads it as covering the export check. His yes is open.
Ground: dialogue §6; row 782. Elsewhere: BOOT.md ask 1; climb batch 22c, question 2; F-287.

**P-156**, `Index`. Why P-42's example is stale (P-42 (d)).

**P-157**, additive vectors. Prelude sweep; reasons not re-ruled (§3).

**P-158** (a), the specification. At issue: "asks for no body there, not for no declaration"
Reports: ""for each field declaration and non-abstract method declaration in the exported declaration", and may give an abstract one a concrete declaration" (rewrite note).
Plain: False: the export rule asks no declaration for an abstract member, so P-158 rests on the team's later export check (P-26), which tenet 2(e) lists among checker code counted as the language's later word (open: BOOT.md ask 2). The judge (§3) had called the text unclear.
Ground: `Specification/basic/components/source-code.tex:372-385`; the team's checker quoted the rule in 80d8c678a (2009-02-03). Elsewhere: climb batch 22c, question 3; BOOT.md ask 2.

**P-158** (b), the date. At issue: "export check of 2012 enforces it"
Reports: "the count is Sukyoung Ryu's, `ac0d41de0`, 2009-05-08; `5a68404fd` and `a9c625b1e` of 2012 are parentless snapshots" (rewrite note, "Still owed").
Plain: False date: the member count is of 2009-03-10.
Ground: commit edb516dba (sukyoungryu). Elsewhere: row 816 (60aaeb6bb); the entry: no.
