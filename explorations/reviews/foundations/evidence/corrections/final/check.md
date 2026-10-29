<!-- The check of the sixteen final corrections of POSITIONS (apply.txt beside this file) against the entries as POSITIONS holds them at 5da8144e4, the findings of corrections/{p,c1,c2}, his page comments as HELD.md holds them, and the P-27 gathering. Written by an Opus checker; nothing applied. -->

# Check of the final corrections

Read: `apply.txt` and `changes.md` beside this file; `p/`, `c1/` and `c2/findings.md`; HELD.md, "Held from his page comments (2026-10-29)"; `postmortem-2026-10-28/evidence/p27-gathering.md`; the runs' `final.apply` texts, diffed sentence by sentence against the new texts; `c1/check.md` on P-154's ground. Each old text in `changes.md` is the entry as POSITIONS holds it now (checked by string match), and each new text in `changes.md` is the one in `apply.txt`.

The sweep is complete: the only entries of POSITIONS that cite P-26 are P-7, P-25, P-44, P-48, P-152, P-153, P-154 and P-158, and all eight change. No new sentence carries a date, a count, a commit or a file path.

## P-27: pass

The text is the gathering's proposal (section 6) word for word. It answers his 06:39 and 06:42 comments: it is a whole rewrite centred on his refinement (a part that states the algorithm, and a part that builds domain-independent machinery that a more mature library would hold), and it cuts the P-88 sentence and "No fix is designed ...". "the plainest case" keeps the precedent of 09-20 as a sign and not a gate, as the gathering weighed it. "(P-26)" points to the rule that chooses between two of the team's designs. It is not cited as P-27's reason, so the sweep does not touch it. The growth, 452 to 829 characters, is the rewrite that he asked for.

## P-9: pass

Only the pointer words change, to P-27's new title (gathering, section 7, item 3).

## P-37: 1 failure

1. Uncertain fidelity to his 05:22 comment, "P-37 was over the limit before and is now excessively large: it needs a trim or a split." The new text is 1107 characters, against 1056 before. The cut of the last two sentences (history: how the order of the work was set, and "not put to him again", which the skill's rule on new evidence already covers) is right, and the Why is his words of 10-26 04:47:50. But the entry still ends longer than the text that he called over the limit. Proposed fix: condense the Why, as `record.md` asks where the exact words are not the decision. "Why: the switch-over spares porting the interpreter's library into the compiler's; the revival develops the checker until it accepts that fuller library." This is about 80 characters shorter and leaves the entry under its old length. His reading settles whether that is trim enough.

## P-33: pass, with a note on `changes.md`

The text is c2's `final.apply` text unchanged, which he called the first rewrite that does a good job (07:34). F-53 defines the distance and what it counts, and F-290 counts the other components' errors. Both were checked in FACTS.

Note: `changes.md` describes the text as "the library's other components are cleared part by part as the need arises". The text does not say that. It says only "The library's other components are not part of phase 3; F-290 counts their errors." Since he approved the text as written, fix the description on the page: "phase 3 covers what the distance counts; the library's other components are outside it (F-290)". Do not grow the entry.

## P-84: pass

The text is c2's text, with the sentence that restated P-85's open decisions cut (his 07:58) and the sentence on the class loader kept (his 07:56, "on reflection fine"). "array decision A (P-85)" keeps the pointer that the cut sentence carried. The P-27 gloss follows the new title. The claim matches F-18: the stamping only renames, and way A4 does not exist and is unmeasured.

## P-59: pass

The only change is the strike of the coordinator's unmeasured premise (finding P-59). He agreed at 07:51.

## P-153: pass

The only change is the strike of the parenthesis that cited P-26 (his 06:56). The rest is the old text, which he judged correct. The run's new Why is not taken.

## P-154: 1 failure

The Why is c1's text with "of an unfinished library draft of the team's" struck (his 07:02). The ground of its second sentence holds: `c1/check.md` verified it in git and at `algebraic-constraints.tex:519-522`.

1. Wording. The strike leaves "The draft is not shown to be later than ..." with no antecedent. No earlier words in the entry now name a draft, and the reader has only the path's `incomplete/` to go on. Proposed fix: "That file is not shown to be later than the specification's sentence that lets a list's order be partial where its elements' order is, so it does not count as the team's later word (P-26)." The trailing "(P-26)" says why P-26 does not apply. He read it and credited the strike, so it stays.

## P-12: pass

The decision is kept, and one pointer replaces the run's three parts and its size, as he asked at 07:12 ("plan material", "does not need to go into the position"). F-9 holds walk's lacks for the step. F-290 holds the library's errors that finding P-12 names.

## P-58: pass

One short sentence states the ground in his words of 07:48: no foreign-function interface, only a planned one (the Working Draft lists it among the proposed features, `appendices/future.tex`), so the library's practice decides. The Working Draft as the source goes to the history, as he asked. The run's "(P-27)" is dropped. That is right, since the new P-27 concerns extending the library, not the form of a native binding.

## P-7, P-25, P-44, P-48, P-152: pass

Each change only removes a citation of P-26 as a reason (his 06:56). In each, the sentence keeps its claim in its own words ("the team's later work", "the designers' latest intent", "its later word (P-25)", "trusts the team's later work above his own understanding", the paper's path). Each sentence still parses, and no condition is lost.

## P-158: pass

The only change is that "by P-26, on the team's later word," is removed (his 06:56), and the sentence still reads. Note: this text still holds the false date "of 2012" and the false sentence on the specification (findings P-158 a and b). The second step of `changes.md` corrects both, with the pointer to F-294. That step must run after this file, as `apply.txt`'s header says, or the false text stays. The same goes for P-37's pointer to F-293.

## His quotes

HIS 2026-10-26T04:47:50.485Z | Of course. The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses.

His page comments of 2026-10-29 are not among the messages that `show.py` prints (`--list 2026-10-29`). The check uses them as HELD.md records them: 05:22, 06:39, 06:42, 06:56, 07:02, 07:12, 07:34, 07:48, 07:51, 07:56 and 07:58.
