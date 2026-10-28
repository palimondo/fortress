<!-- The findings of a review on the entries of chunk c2, cut word for word from explorations/reviews/foundations/evidence/salvage-findings.md by cut-findings.py, after the source's note on its sources. -->

"At issue" quotes POSITIONS.md as it stands (last changed 5da8144e4). In quotes, [..] replaces a shorthand of the reports and "…" a cut. Sources (explorations/reviews/foundations/): judgement.md (the judge's; cited as "tenet N", its §2, or "§N"), tenets-evidence.md (evidence map), prelude-lens.md (prelude sweep), rewrite-results.md (rewrite note), evidence/trap-test/key.md and grades.md; "dialogue" is conversations/02-phase3-exit-foundations.md. Old reader: the trap-test reader with today's entries (10 of 12); "scenario N" is the trap test's. All times UTC. One-line entries: named as stated, no fault found.

**P-33**, the phase order. At issue: "reports no error on the interpreter's whole library"
Reports: ""The interpreter's whole library" is wider than F-53's twelve, and his 10-26 goal says "the fuller library"." (tenet 6).
Plain: The zero covers twelve components (fourteen with `List`'s imports). The other 38 block P-12's step; code generation was unmeasured (F-34); phase 3 closes with batch 22c; two zeros go to phase 4.
Ground: F-53, F-290, F-34; his words of 2026-10-26 04:47:50 and 07:30:36; dialogue §9. Elsewhere: those FACTS (numbers); BOOT.md ask 3 (the 38).

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

**P-84**, the `double[]` store. At issue: "among them is decision A"
Reports: "stamping "only renames", so no generic instance can hold a `double[]` … (the class loader's way, A4, is unmeasured)" (tenet 7).
Plain: Missing: stamping alone gives no `double[]` field; way A4 is unmeasured; also the unboxing words of P-17.
Ground: `array-design.md` §2, probe 1; `array-design-ways.md` §3. Elsewhere: F-18 (0d2206c5f).

**P-85**, the open array questions. At issue: "the array decisions A, B and D"
Reports: "His 09-20 lean for the class-loader way was "recorded as your leans, to confirm" and is in no entry" (tenet 7).
Plain: Missing: his lean of 2026-09-20, as a lean to confirm.
Ground: the coordinator's text of 2026-09-20 14:34:56 ("Recorded as your leans, to confirm"). Elsewhere: no.

**P-155**, symbolic operators. At issue: "checks the overloads of symbolic operators"
Reports: "Row 782: the export check reads top-level symbolic operators (P-155 read to cover the export check …)" (§5, rung 2).
Plain: The entry speaks of the overloading check; the batch reads it as covering the export check. His yes is open.
Ground: dialogue §6; row 782. Elsewhere: BOOT.md ask 1; climb batch 22c, question 2; F-287.
