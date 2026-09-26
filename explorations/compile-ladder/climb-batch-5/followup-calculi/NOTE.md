# Climb batch 5, follow-up: the calculi of Appendix A, option 1

Written 2026-09-26 by a worker on Pavol's answer to rung S's stop (`explorations/coordinator/POSITIONS.md`, the entry of 2026-09-26 on the calculi): option 1 of `explorations/compile-ladder/rung-spec-route-a/decision-record.md` § 4.2, a `\revision` callout at each of the three calculi and an entry in Appendix I. Base `04d7193b7`; the specification edit and the rebuilt PDF landed in `eb2d7e1e6`.

## 1. What § 4.2 says each calculus admits, checked against its text

All three agree with § 4.2. The calculi's files are byte for byte those of `Specification-1.0-frozen/` (`cmp`, before the edit), so the line numbers below hold in both trees.

**Core Fortress with Where Clauses** (`Specification/appendices/calculi/where/`): a where-clause variable may be typed in a supertype.
- Syntax: a trait or object definition is `trait T[\ᾱ extends N̄\] extends {M̄} where {β̄ extends ...}` (`Specification/latex-common/macros/where-calculus-macros.tex:78-86`), and "An object or trait definition may include where clauses" (`where/syntax.tex:84`, inside § 4.2's `:82-91`).
- The definition rules check the supertypes under an environment that holds the where-clause bounds: T-TraitDef takes Δ as the parameters' bounds followed by the where-clause bounds and checks `⊢ M̄` under it (`where/static.tex:56`, `:59`); T-ObjectDef checks `Δ' ⊢ M̄` with Δ' the same (`:71`, `:75`).
- S-Both, printed [S-Tapp] (`where/static.tex:329-342`), gives `C[τ̄] <: [τ̄W/β̄][τ̄/ᾱ]M_i` for any witnesses τ̄W that pass `validWitness`, one supertype per witness.
- Nothing refuses the shape: `validMI` is `oneOwner` and `validWhere` (`:136-146`), and `validWhere`'s condition 2 (`:181-192`) presupposes it, requiring a where-clause variable in a visible method's type to be the defining supertype's static argument at that parameter.
- Soundness claim: `where/static.tex:478-480`.

**Acyclic Core Fortress with Field Definitions** (`Specification/appendices/calculi/acffd/`): one self-extension whose arguments may be the parameters' bounds.
- The rule [Acyclic] (`acffd/static.tex:46-88`): condition (1) (`:56-65`) keeps self-extensions out of the acyclicity requirement; (2) (`:67-74`) allows at most one self-extension; (3) (`:75-83`) lets each of its static arguments be the parameter itself, the parameter's bound, or another parameter whose bound is this one.
- So `trait T[\X extends Object\] extends T[\Object\] end` passes (3) with the argument equal to the bound, T-TraitDef (`:93-105`) asks only well-formedness, method typing and `oneOwner`, and [S-Tapp] (`:256-261`) gives `T[\A\] <: T[\Object\]` for every `A`: `T[\A\]` is below two different instantiations of `T`, which the rule refuses (`Specification/basic/types-vals-vars.tex:233-235`).
- Soundness claim: `acffd/static.tex:370-373`.

**Basic Core Fortress** (`Specification/appendices/calculi/basic/`, the first section of Appendix A): the claim that its programs are all valid Fortress.
- The claim: "we have abided by the restriction that all valid \basiccore\ programs are valid Fortress programs" (`basic/calculus.tex:16-19`).
- Supertypes are any trait applications (`basic/syntax.tex:50-52`); T-TraitDef and T-ObjectDef (`basic/static.tex:57-82`) ask well-formed bounds and supertypes, method typing and `oneOwner`; `oneOwner` (`:263-272`) looks only at method names, `inherited` being a disjoint union of the supertypes' visible methods (`:285-293`).
- So `trait T[\X\] end` with `object O extends { T[\A\], T[\B\] } end` is valid Basic Core, and it is the shape of the rule's own "Not allowed" `Child` (`Specification/basic/traits.tex:299-313`).
- Basic Core has a soundness claim too, `basic/static.tex:301-303`, which § 4.2 does not list beside the other two. The callout leaves it alone like the others.

**Not in § 4.2.** Core Fortress with Overloading (Appendix A.3, `calculi/overloading/`) is also "an extension of \basiccore" (`overloading/calculus.tex:18`). Its definition rules (`overloading/static.tex:52-82`) add `validMeth` (`:107-136`), which quantifies over pairs of visible methods. By reading, then, it admits the same object as Basic Core, but it does not repeat Basic Core's claim about valid Fortress programs. It has no callout: the decision names three calculi. It is left to the coordinator.

## 2. What was added, and where (`eb2d7e1e6`)

- A callout `\revision{revival-calculi}{...}` after each calculus's opening paragraph: `Specification/appendices/calculi/basic/calculus.tex:20-28` (after the claim, which it qualifies), `where/calculus.tex:21-31`, `acffd/calculus.tex:19-32`. Each says that the calculus predates instantiation exclusion, names the shape it admits, and says that the calculus, its rules and its soundness claim are as the team wrote and proved them and are not changed.
- Appendix I, a new subsection "The calculi" (`\seclabel{revival-calculi}`, `Specification/appendices/changes.tex:362-420`), in rung S's form: affected sections, change, rationale (Pavol's reasoning, and the date of the decision), effect, original text, route C. The original text quotes Basic Core's claim from `Specification-1.0-frozen/appendices/calculi/basic/calculus.tex:16-19`, cites the frozen lines that admit the other two shapes, and quotes the paragraph it replaces. Route C is "by the revival's reading, not measured, the same": no shape named is a chain of instantiations of a self-typed parameterized trait. That is a reading, as in decision record § 5, and was not measured.
- "Passages not yet revised" (`changes.tex:422-`) loses its calculi paragraph (it was at `:378-386` before the edit) and keeps the number chapters. The where-clause entry's pointer to the calculi now names `revival-calculi` (`changes.tex:135-136`).
- Counts and lists. The front matter (`Specification/fortress/preamble.tex:54-64`) gives no count and names no unrevised passage, and it stays true: every revised passage still carries a box. No other file under `Specification/` counts the callouts. The decision record § 3.9 says "Sixteen callouts" of rung S; the line appended to § 4.2 says they are nineteen now. `Specification/appendices/internal-document.tex:527` still points to "Passages not yet revised" for the number chapters, which remain there.
- The team's line `\acffdcore\ is an extension of \basiccore\ with ` keeps its trailing space. Nothing under `Specification-1.0-frozen/` was touched.

## 3. The build

Built with `./ant genSource` and then `./ant tex` in `Specification/fortress/`, with `FORTRESS_HOME` set to the repository root. It was run once at the base (before) and once with the edit (after, still uncommitted at `04d7193b7`). Machine, from each log's first line: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21), `FORTRESS_THREADS=1`.

| run | load average at start | elapsed | result |
|---|---|---|---|
| before, genSource | 1.45 0.70 0.58 | 63 s (ant: 54 s) | BUILD SUCCESSFUL |
| before, tex | 1.52 0.89 0.66 | 48 s | 610 pages, BUILD SUCCESSFUL |
| after, genSource | 1.11 0.83 0.68 | 43 s | BUILD SUCCESSFUL |
| after, tex | 1.09 0.86 0.69 | 44 s | 611 pages, BUILD SUCCESSFUL |

Tails of the two "after" logs (the font list of the `tex` log elided):

```
     [move] Moving 3 files to /home/user/fortress/Specification/library/examples
     [move] Moving 58 files to /home/user/fortress/Specification/library/apis

genSource:

BUILD SUCCESSFUL
Total time: 43 seconds
# rc=0 elapsed=43s
```

```
     [exec] Output written on fortress.pdf (611 pages, 2025040 bytes).
     [exec] Transcript written on fortress.log.

BUILD SUCCESSFUL
Total time: 43 seconds
# rc=0 elapsed=44s
```

The last LaTeX pass of each build reports no undefined or multiply defined reference or citation. The full logs were not kept: the `tex` log is 11,000 to 15,000 lines, most of them fonts.

**What prints.** `pdftotext`, normalised by rung S's `norm.sh` (`explorations/compile-ladder/rung-spec-route-a/probes/build/norm.sh`), before against after: `build/before-vs-after-pdftotext-diff.txt`, 166 lines. It has the three callouts (headed "Revised by the 2026 revival, see Section I.1.9" in A.1, A.2 and A.4), the subsection "The calculi" as I.1.9, the removed paragraph, and the numbering after it moved by one (route C is now I.1.11, "Passages not yet revised" I.1.10). The rest are floats and page breaks that moved within Appendix A.

**The committed PDF.** `Specification/fortress.pdf` is the revival's committed build (rung S's landing and its gather copied `Specification/fortress/fortress.pdf` there; `climb-batch-5/RECORD.md`, "Noted for the review"). This commit does the same: sha256 `0be473c02e85...`, byte-identical to the build output. The committed PDF before this commit (610 pages) differs from the base build in Part IV only (`build/committed-vs-before-pdftotext-diff.txt`, 124 lines, every hunk between the text's lines 11178 and 13518, which are inside Part IV). Those are rung D's wrapping operators (`∔`, `−̇`, `×̇` on `I`, `N32`, `N64`, `Z32`, `Z64`), which D added to `Library/FortressLibrary.fsi` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` after the PDF was last built, and which `genSource` renders into Part IV, plus a few margin notes that `pdftotext` extracts in another order. So the new PDF carries D's operators in Part IV besides this change.

**The tree after the builds.** `git status` showed only the four edited `.tex` files after both builds. `genSource`'s output under `Specification/library/` and `Specification/fortress/fortress.pdf` are ignored by git, so no generated file had to be restored, and there was no generated-source churn in tracked files.

## 4. Disagreements with § 4.2

None on what the three calculi admit. There are two additions: Basic Core's own soundness claim (`basic/static.tex:301-303`), which § 4.2 did not list, and the overloading calculus, which § 4.2 does not name and which by reading admits Basic Core's shape (section 1).
