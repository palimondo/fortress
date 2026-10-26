<!-- The clarity workflow's judgement on chunk c1 of the foundations rewrite (P-26, P-37, P-43, P-42, P-7, P-158), 2026-10-26: one verdict per rewritten entry after the second cold read, with its reason and the source the judge checked; six apply, none held. -->

# Judgement, foundations rewrite c1: six apply, none held

Read: the run's brief (`scratchpad/foundations/rewrite-brief.md`) and the judge brief. In this folder: `proposals.md`, `proposals.apply`, `clean.txt` (the same six texts as `proposals.apply`, compared by `diff`), `check.md`, `cold-read-2.md`, `concepts.md` and `writer-2.log`. Also: `reviews/foundations/judgement.md` whole; `entries.py 26 37 43 42 7 158`; POSITIONS P-8, P-12, P-33, P-77, P-95 and P-153; FACTS F-18, F-34, F-44, F-46, F-166, F-289 and F-290; ledger rows 339, 412, 691 and 816; the curator's messages of 2026-09-23 07:26:28 and 2026-10-26 04:28:41, 04:47:50 and 05:25:27, printed by `show.py`; and c2's `judgement.md` and `final.apply`, for P-33 and P-84. For each failure that `check.md` named and the fix round says it settled, I read the final sentence against its source. Not opened: `reviews/foundations/evidence/`.

I also ran `record.py apply` of `proposals.apply` on a scratch copy of the four record files. It rewrote the six entries, and `record.py check` on the copy gave 0 failures. The paths it reported as unresolved are only those that the copy does not hold.

- **P-26: apply.** Every failure in `check.md` is settled.
  - The "Why" is in his own words: "written early and in a vacuum", and "does not second-guess them" is back (`show.py` 2026-09-23T07:26:28: "The spec was written in a vacuum early on"; "We are not Naden. We know nothing here.").
  - The judgement's ground now has its own label, "The ground in the language:". It claims only that the later texts agree on "the exclusion rule, the overloading rules and the default bound" (judgement, tenet 2).
  - "The curator decides by the goal (P-8)" is P-8's own wording (POSITIONS P-8, read).
  - The layer rule now says that a JVM or checker limit "never overrides what the language's texts say", and that where those texts give no answer, a ground from the implementation may weigh. So it no longer contradicts P-77. The specification records P-77 as a gap of the Working Draft, which "named no integer type" for ranges (`Specification/basic/expressions/ranges.tex:102-108`, read). The rule also matches the judgement's acceptance of P-77 and P-153 (section 3).
  - The Working Draft is named "of February 2011", with the team's last edit in 2010-12 (judgement, section 0).
  - The code rule covers only "the team's code in the implementation", because section 0 puts the library in the language.
  - The second reader produced all six behaviours of section 7 and answered both traps: it dates a 2009 prelude commit against the 2011 paper, and it lets no JVM limit override a sentence of the specification.
  - Its doubts change no action. "Later texts that agree with each other" reads two ways, but the title and the sentence on conflicting sources settle the case that matters. P-8 sits beside P-7's goal because the record splits them that way.
  - One doubt has no source: how the library's text is dated in the ranking. The judgement gives no rule for it (tenet 2; section 3, sharpening 3), so the entry is right to state none. The question is in `queue.md`.
- **P-37: apply.**
  - The dating test now applies only to a prelude line that counts as the team's later word, as sharpening 3 says, and not to case 2. So P-37 no longer contradicts P-43 or P-158 (judgement, section 3, read).
  - "Beside the natives (P-33)" is tenet 6's "the natives are the switch-over's definition".
  - What was measured and what was not stand apart, in the judgement's own words (tenet 3). The 52 refused declarations are counted over the twelve components (F-34, read).
  - "Parts of it 'bogus'" and "the switch to it a 'hopefully temporary hack'" match their source. `WellKnownNames.java:113-116` (read): "Re-points fortressLibrary etc. to special compiler (rather than interpreter) versions of the code. Hopefully temporary hack".
  - The "Why" keeps the meaning of his message of 04:47:50 (`show.py`, read), and is labelled "as the curator put it".
  - "Never names the compiler's" holds for the team's text: `Specification/library/structure.tex:15-20` (read) names "chiefly FortressLibrary and FortressBuiltin". Only the revival's changes appendix cites the compiler's files, as evidence.
  - The second reader produced the four behaviours of section 7 and answered both traps: fixed arities offered against varargs, and a checker zero offered as proof that the library runs compiled, since no library component has yet been compiled and run.
  - Its doubts are terms ("the distance stage" is in `concepts.md` and the coordinator skill; I added "shape" to `concepts.md`) or the judgement's own wording ("52 declarations of the twelve that the checker passes" is F-34's).
  - One change is not listed in `proposals.md`. "The curator sees the compiler's prelude ... as a bootstrap" became "is a bootstrap". The team's own words support it (tenet 3), and it changes no action.
  - The pointer "P-33 says when the library's other components are cleared" matches c2's applied P-33: the 38, cleared before P-12's step.
- **P-43: apply.**
  - The impossibility keeps the judgement's condition, "whose every level carries the algebra traits at its own type" (tenet 5). The example holds in the library: `trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }` (`Library/FortressLibrary.fsi:536`, read).
  - The "mutually exclusive" sentence is at `Specification-1.0-frozen/basic/types-vals-vars.tex:502` (read).
  - The eight sibling types are written out, and route C is defined in P-95's words (read).
  - No "Why" is left that could put the judgement's grounds in his mouth. Under the default of open answer 3, the two old sentences go to history, as items 219 and 220 and section 9, item 4 ask.
  - The second reader produced the three behaviours and answered the trap: the library chapters' ℤ ⊂ ℚ loses to the later texts.
  - Its doubts are covered elsewhere: the route labels and the forest rule by P-95 and F-46, and who may reopen route C by the coordinator skill's test of a consequential choice.
- **P-42: apply.**
  - The library's example now has a tuple at a type parameter: `zip`'s `(E,F)` (judgement, section 4 (c)).
  - The miscompile is the probe's finding (row 691's notes, read).
  - Checked at source:
    - `Shell.java:371-372`: `setExtendsObjectPreDesugaring(true)` in `useCompilerLibraries()`, and `false` in `useInterpreterLibraries()`.
    - `NamingCzar.java:447`: `s(Object.class, anyLib, "Any")`.
    - The frozen `trait-parameters.tex:49-54`.
    - The callout, `Specification/basic/trait-parameters.tex:54-65`.
  - The second reader produced the five behaviours and answered both traps.
  - Its doubts change no action. The point about the 1.0 release is extra weight that the judgement gives (section 4 (b)), and P-26's ranking puts POPL 2019 last in any case. The conflict with `references/compiler.md` and with the callout is outside the entry; it goes to the coordinator below.
- **P-7: apply.**
  - One sentence changed, as tenet 1's ruling asks: "P-7 should not restate the rule; it should point to P-26".
  - The rest is the record's text word for word (compared with `entries.py 7`).
  - The changed sentence is now marked for his yes, as `check.md` asked.
  - The second reader read "later word" through P-26.
- **P-158: apply.**
  - Both sections that the judgement reads are cited, and they read so at source:
    - `apis.tex:250-256` asks for matching definitions of all declarations "other than the methods or fields declared abstract", and is silent on the declaration.
    - `source-code.tex:384-385`: "a satisfying trait declaration is allowed to provide a concrete declaration".
  - The year of the export check is settled. `git grep equalListMembers` finds the count in `9ac5af540` (2011-12-05, a commit with no parent). `36c7299c7` (2009-02-17) is the file's last commit with a parent before that snapshot, and it lacks the count. So "in their tree by 2011-12" is as far as git can show.
  - The state line is row 816's repair (row 816; judgement, section 5, rung 1: "12 bodyless lines in five component traits").
  - His reason stays his (04:28:41, read).
  - The second reader took the ambiguous text and the team's checker as the ground, and the `NoSuchMethodError` as the cost of the other reading, as section 7 asks.
  - Its doubts:
    - The present tense now reads beside "Still to build".
    - "The export check's count" is added to `concepts.md`.
    - "By the team's later word (P-26)" gives no date for the library's text. That is the open question queued under P-26, and the entry's ground does not depend on it.

## For the coordinator

- c2's applied texts point to this P-26 for the three layers (all seven) and for "stamping" (P-84). Apply the two chunks together.
- The sentences that depend on the curator's open answers 1 and 3 are listed per entry in `proposals.md`, with the other text for each. Answer 2 bears on P-37's pointer to P-33.
- Outside this run, as `proposals.md` and `concepts.md` list:
  - P-153's "Why" cites P-26 for undated prelude code. Under this P-26, that reads as a misapplication. The judgement names its sound ground: an implementation artefact in a gap of the language, which P-8 lets decide (tenet 2 (e); section 3).
  - Row 816 and the dialogue's section 3 carry "Chase's 2012 export check". They need P-158's correction.
  - `fortress-repo` `references/compiler.md` and the specification's callout (`Specification/basic/trait-parameters.tex:62-65`) both say that row 412's `Object` bound lasts "until the switch-over". `SKILL.md` says that `Any` "holds tuples, functions and `()`". `references/exploring.md:16-22` lists the old mixed later word.
