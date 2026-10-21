<!-- Climb batch 19, the judge of the merged-diff review: its one blocking finding, that Appendix I's Effect of "Overloading with static parameters" does not name row 788, is upheld with all its claims. Decision repair: one sentence of the specification, F-258's list of the two paths' differences completed with the same row, and RECORD.md re-anchored; no path the gate reads. -->

# Climb batch 19: the judge's ruling on the merged-diff review

Written 2026-10-20 by the batch's judge (Opus), on `main` at `25b55a1a1`. Nothing was built or run for this ruling, and the gate's folders were not read. Each point below is a reading of the tree at that commit, or a result that the record quotes with its command.

## 1. Ruling

**Decision: repair.** The review's one blocking finding is upheld in full: the Effect of Appendix I's "Overloading with static parameters" (`Specification/appendices/changes.tex:2810-2888`) names no departure for row 788, and row 788 is a way in which walk does not do what the section says.

The repair adds one thing the review did not ask for. F-258, the fact this batch landed for rung P, lists the two paths' differences on exclusion between declarations with static parameters as rows 786 and 787 (`explorations/coordinator/FACTS.md:176`). Row 788 is a third, and it bears on F-258's own title, so it goes into that list too. This is a record edit.

The decision cannot be land. The repair edits `Specification/appendices/changes.tex`, and the brief allows land only when no specification file changes. The repair changes no path the gate reads: those are `ProjectFortress/`, `Library/` and `build.xml` (`explorations/coordinator/climb-batch-workflow.js:1152-1155`). It adds no test. So the gate does not run again (`repairRerun`, `climb-batch-workflow.js:1229-1251`).

The two routed findings (review-routed.1 and .2, `explorations/coordinator/PLAN.md:502`, `:504`) go to the next batch without a ruling, as the brief says. No skeptic's fix is contested.

## 2. The finding: row 788 and the Effect

**The rule.** The skill's revision form asks that "The effect names each departure: each way in which walk or the compiled path does not do what the new text says, with its ledger row". It also says: "If the passage has an Appendix I entry, name the departure or the conflict in the entry's effect, with its ledger row. Then the text claims no more than holds." (`.claude/skills/fortress-repo/references/specification.md`, "Changing the text" and "When the text and an implementation disagree").

**What the text says.**
- A set is a valid overloading only if every pair meets the Meet Rule: the two exclude each other, or one is more specific, or a third declaration of the set covers their overlap (`Specification/advanced/overloading.tex:551-553`).
- Two parameter types with static parameters exclude each other by existential reduction. Each static parameter stands for any type within its bound, and instances of one parameterized trait meet where their static arguments are the same (`overloading.tex:582-589`). This passage is the one rung P revised.

**What walk does (row 788).** The row is at `explorations/fortress-gap-ledger.md:385`.
- Take `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, with `Box` an object type. The two overlap at a `Box[\ZZ32\]` and a `ZZ32`, and neither is more specific than the other. So the pair breaks the Meet Rule.
- Walk loads it. Two types that cannot be extended exclude each other (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:212-217`). The exclusion is withdrawn only between two own generics, under `ownPair` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:420`, `:439`, `:467-476`). Here one of the two is plain. So `Box[\T\]` is read as excluding `Box[\ZZ32\]`, which it is at `T = ZZ32`, and the pair passes as distinct (`:477-479`).
- The bound face is `h[\T extends R[\ZZ32\]\](x: Box[\T\], y: T)` beside `h[\U\](x: Box[\Ob[\U\]\], y: Ob[\U\])`. It loads too (`ProjectFortress/tests/XXXGenericBoundObjectOverlapWalk.fss:11-12`).

**The evidence.**
- Rung P's skeptic ran both programs on walk and on the compiled path, on the base and on the rung's head (`explorations/compile-ladder/rung-existential-reduction/SKEPTIC.md:102-103`):

      | `KSameObjPlain`: `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, `Box` an object | `generic` (loads) | the same | the same | Invalid overloading of g | the same |
      | `KBoundObj2`: ... | `first` (loads) | the same | the same | Invalid overloading of h | the same |

- The skeptic filed row 788 at home 2, with two gated expected failures, each keyed `load_exception_contains=fails the Meet Rule` (`SKEPTIC.md:122`): `ProjectFortress/tests/XXXGenericObjectInstanceBesidePlainWalk` and `XXXGenericBoundObjectOverlapWalk`.
- The gather's harness run on the merged tree printed ` Saw expected failure: loaded and ran, not refused at load` for both (`explorations/compile-ladder/climb-batch-19/RECORD.md:30`).

**What the Effect says.**
- It names rung P's other departures: row 787 at `changes.tex:2871-2873`, written by the skeptic in `5f06c723b`; `tint`, row 786, at `:2874-2883`; and row 759's sentence at `:2845-2851`.
- No sentence names row 788 (`grep -n 'row~78' Specification/appendices/changes.tex` prints `:215`, outside the entry, and `:2837`, `:2873` and `:2882`).
- The sentence on row 539 (`:2825-2831`) covers only pairs "no pair of whose parameter types excludes each other as it compares them parameter by parameter". Row 788's pairs are exactly those that walk's comparison finds excluding, so that sentence does not reach them.

So the departure exists and sits on the passage rung P revised. It was found and filed in this batch, and the entry does not name it.

Rung S does not change this. Its desugaring rewrites only an `extends` clause that names `Any` alone (F-259; `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java`). Neither program writes an `extends` clause on `Box`, and `Ob`'s clause names `R[\U\]`. The gather's run on the merged tree (above) shows walk still loading both.

## 3. Which claims of each side were right

The review:
- **"Row 788 ... a departure that rung P's skeptic measured against the same section's Meet Rule"**: right. See `SKEPTIC.md:102-103` and `:111` ("The pairs that walk loads above break the Meet Rule, so walk is wrong on them"), and `overloading.tex:551-553`.
- **"The checker refuses both ('Invalid overloading')"**: right (`SKEPTIC.md:102-103`, both columns of the compiled path).
- **Its citations.** All right: the ledger at `fortress-gap-ledger.md:385`, the two XXX tests, `RECORD.md:30` and the Meet Rule at `overloading.tex:551-553`.
- **"The same skeptic followed that rule for row 787 ... but not for row 788"**: right. Commit `5f06c723b` added the row 787 sentence (`changes.tex:2871-2873`). The skeptic's own section on the specification names only that sentence and row 759's (`SKEPTIC.md` section 6, "Specification"), while its home table files row 788 (`:122`).
- **"The departure was already there at 612869b4a"**: right. The row's notes say "Both on 612869b4a and the rung's head", and the table's base columns agree. Being older than the batch does not excuse it. The rule asks for each known departure from the text, and rung P revised both the passage and its entry.
- **"The repair is one sentence after :2873"**: right in place and in size.
- **"It touches no path the gate reads"**: right (`climb-batch-workflow.js:1152-1155`).

The rung and the gather:
- **Rung P's skeptic** was right to file row 788 at home 2 with its two XXX tests (`SKEPTIC.md:122`). It was right to name row 787 in the Effect. It was wrong to leave row 788 out of the Effect, because its home table puts the row on the section the entry covers.
- **The gather** was right that the rung's specification sentences were the rung's own and that no text mismatch arose between the rungs (`RECORD.md:109-111`). Its check of the Effect stopped at the sentences the rung had edited (`RECORD.md:88`, `:155`). It did not check the rows the rung opened against the entry.

## 4. The repair

The instructions are those of the structured decision, repeated here.

1. **Where and how.** Work in the main tree, `/home/user/fortress`, after the gate there has finished. Use the skill's setup for each call (`.claude/skills/fortress-repo/references/build-and-caches.md`). Edit no file under `ProjectFortress/` or `Library/`, and add no test.

2. **Insert eleven lines in `Specification/appendices/changes.tex`.** They go after line 2873, which ends `code generator does not compile (row~787 of the revival's gap ledger).`, and before line 2874, which begins `They also differ on a pair whose static parameters' bounds exclude each other, as`. Insert exactly these lines:

       The interpreter also reads an object type over a static parameter as excluding
       a type that the object type is at some instance of the static parameters, and
       so loads pairs that the Meet Rule refuses, as
       \EXP{\VAR{g}\llbracket{}T\rrbracket(x\COLON \TYP{Box}\llbracket{}T\rrbracket,
       y\COLON \mathbb{Z}32)} beside \EXP{\VAR{g}(x\COLON
       \TYP{Box}\llbracket\mathbb{Z}32\rrbracket, y\COLON \TYP{Any})}, where \TYP{Box}
       is an object type: the two overlap at a
       \EXP{\TYP{Box}\llbracket\mathbb{Z}32\rrbracket} and a \EXP{\mathbb{Z}32}, and
       neither is more specific than the other; the interpreter runs the first for a
       call to which both apply, and the compiled type checker refuses the pair
       (row~788 of the revival's gap ledger).

   - The sentence rests on `explorations/fortress-gap-ledger.md:385` and `SKEPTIC.md:102`, the `generic` output and 'Invalid overloading of g'. It also rests on `ProjectFortress/tests/XXXGenericObjectInstanceBesidePlainWalk.fss:8-12` and `RECORD.md:30`, and on the Meet Rule at `Specification/advanced/overloading.tex:551-553`.
   - The macros are those of the neighbouring sentences: `changes.tex:2875-2878`, and `\mathbb{Z}32` as at `:343`.
   - "They also differ" at the old `:2874` still follows: the interpreter and the checker differ on row 788's pair too.
   - Change no other line of the entry. The new sentence is then at `:2874-2884`, and `tint`'s at `:2885-2894`.

3. **No new run for the sentence.** The skill asks that a sentence saying what walk or the compiled path does rest on a run (`specification.md`, "Check each changed sentence"). That run is on record: the skeptic's table (`SKEPTIC.md:102`) and the gather's merged-tree run (`RECORD.md:30`). Rung S's rewrite reaches no declaration of the program (section 2 of this ruling), so the skill's rule on reusing results holds ("Reuse each result ... Run it again only after the code changes").

4. **Complete F-258's list of differences** (`explorations/coordinator/FACTS.md:176`).
   - Copy F-258's line into a scratch file under `tmp/`. In that copy, replace the sentence `The two paths differ on two type parameters whose bounds exclude (row 786), and on such a pair one of whose declarations has a `where` clause, which walk refuses and the checker accepts (row 787).` with:

         The two paths differ on two type parameters whose bounds exclude (row 786); on such a pair one of whose declarations has a `where` clause, which walk refuses and the checker accepts (row 787); and on a pair that walk's parameter check reads apart, reading an object type over a static parameter as excluding a type it is at some instance, as `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, which walk loads and the checker refuses (row 788).

   - Write it with `python3 explorations/coordinator/tools/record.py set F-258 <file> --from 'compile-ladder/climb-batch-19/JUDGE-review.md#The repair' --note 'row 788 named among the two paths differences, as in Appendix I'`.
   - If `record.py` refuses the write, write nothing in `FACTS.md`. Name the refusal and the sentence in step 5's paragraph, and in your report for the coordinator.
   - The sentence rests on `fortress-gap-ledger.md:385`, `FType.java:212-217` and `OverloadedFunction.java:439`, `:467-479`.

5. **Update `explorations/compile-ladder/climb-batch-19/RECORD.md`.**
   - Re-anchor the citations of `main`'s lines below `changes.tex:2873`; the eleven inserted lines move them down by eleven:
     - At `RECORD.md:88`, `changes.tex:2882` becomes `:2893`. Its `:2873` stays.
     - At `RECORD.md:155`, `:2865-2883` becomes `:2865-2894`.
     - `RECORD.md:23` maps P's tree to `main` as the gather found it. Leave its figures, and append this sentence: "After the review's repair, which added row 788's sentence at `:2874-2884`, the Effect is `:2865-2894` on `main` (`:2865-2887` for the skeptic's range)."
   - After `RECORD.md:90` (the paragraph that begins "`REPORT.md` section 8's other sentences of the specification") and before `### S (`rung-string-conversion`), landed second as `4190069c4`` (`:92`), add a paragraph that begins `**Corrections, after the review.**`. It says:
     - that Appendix I's Effect now names row 788 at `changes.tex:2874-2884`, quoting the sentence's first line;
     - F-258's new sentence, or its refusal under step 4;
     - that this ruling is `explorations/compile-ladder/climb-batch-19/JUDGE-review.md`;
     - that no test was added and no path the gate reads changed.
   - The rungs' own `REPORT.md` and `SKEPTIC.md` cite their own trees and stay as they are.

6. **Build the specification** as `.claude/skills/fortress-repo/references/specification.md`, "Building it", says, with its log under `tmp/`.
   - Both commands must end in `BUILD SUCCESSFUL`.
   - `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` must print 0.
   - Then run `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`: the landing builds it (`climb-batch-workflow.js:1312`).

7. **Check the record.** Run `python3 explorations/coordinator/tools/record.py check --base 612869b4a2934caf40cd17a7afcf2ab149fc9252`. It must print 0 failures, as the review's run did.

8. **Commit once, locally, on `main`.**
   - Use the skill's command form (`.claude/skills/fortress-repo/references/committing.md`). Name the paths: `Specification/appendices/changes.tex`, `explorations/compile-ladder/climb-batch-19/RECORD.md`, and, if step 4 wrote, `explorations/coordinator/FACTS.md` with whatever `record.py` wrote to `explorations/coordinator/FACTS-history.md` (check with `git status --short -- explorations/coordinator`).
   - The message says that the commit edits the original tree's specification. It ends with the skill's footer.
   - Do not push. Retry once on an `index.lock` error after a few seconds.
   - Return in `pathsChanged` every path that `git diff --name-only <before> <after>` prints, and an empty `testRuns`.

## 5. Left as it is

- **RECORD.md's revival change for rung P** (`RECORD.md:193-196`) says what the change does. Row 788 is older than the change and the change does not touch it, so the revival change needs no sentence on it. The skill's `revival-changes.md` is likewise untouched by this ruling.
- **Row 789** is the checker's message 'V is not in the kind env' for a pair it refuses anyway (`fortress-gap-ledger.md:460`). The pair is refused, so this is no departure from what the text says, and it does not belong in the Effect. Its owed test is review-routed.1 (`PLAN.md:502`).
- **The Change and the passage.** `overloading.tex:582-606` states the rule, and departures go in the Effect only (`specification.md`, item 1 of the revision form). So no callout and no other part of the entry changes.
