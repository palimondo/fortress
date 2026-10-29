<!-- Purpose: the two dates the record needs to say which of the team's words is later, the specification's export rule (the sentences at `Specification/basic/components/source-code.tex` lines 380 to 385) or the team's export check that counts every api member (`edb516dba`). Gathered 2026-10-29 by an archaeology scout agent, from git history and the record, cited only, with no judgement. -->

# Export rule and export check: the dates

All times are UTC unless a command prints another offset. Paths are from the repository root. A hash is the first nine characters of a commit.

## Summary

- The rule's sentence is in the team's 1.0 release, `Specification/fortress.1.0.pdf`, which `403afbe0b` added on 2008-03-31 (Sukyoung Ryu). It stands in section 20.2.2, "Export Statements", on page 119, in the same words as lines 380 to 385 today.
- The first commit that holds the sentence as LaTeX is `0f49d8698` of 2009-11-06 (Sukyoung Ryu), "[spec] Added the entire spec files." It is a bulk import: it takes `source-code.tex` from 16 lines to 512. The LaTeX copy is therefore not the sentence's first text: the 2008 release holds it already.
- Text copies of the sentence in code come earlier than the LaTeX: `8a843ad33` of 2009-02-02 pastes section 20.2.2 into a comment of `Disambiguator.java`, and `80d8c678a` of 2009-02-03 quotes it in `ExportChecker.scala`.
- The export check that counts every api member is `edb516dba`, 2009-03-10T20:31:32Z, author sukyoungryu (Sukyoung Ryu).
- In date order: 2008-03-31 (release PDF holds the sentence), 2009-02-02 and 2009-02-03 (code quotes it), 2009-03-10 (the check), 2009-11-06 (first LaTeX copy).

## 1. The record, read first

- Command: `explorations/coordinator/tools/facts-extract.sh 'F-294'`. Output: "F-294 **The specification's export rule asks a component to declare each field and non-abstract method of an api's trait or object, not its abstract methods.** ... The team's export check refused a missing abstract member from 2009 (row 816)." The entry sits at `FACTS.md:128`.
- Command: `explorations/coordinator/tools/facts-extract.sh 'P-158'`. Output: "P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** ... Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule asks no declaration of an abstract member (F-294)." The entry sits at `POSITIONS.md:69`.
- Command: `explorations/coordinator/tools/facts-extract.sh 'history:P-158'`. Output, the entry of 2026-10-29 13:01Z: "the team's check that refuses a component trait or object which leaves out a member of its api's trait or object, abstract members included, is Sukyoung Ryu's `equalListMembers` of 2009-03-10 (`edb516dba`), in its last form of 2009-04-13 (`77a8dd706`), with its messages improved on 2009-05-08 (`ac0d41de0`). The 2012 commits `5a68404fd` and `a9c625b1e` are parentless snapshots, not where the check was written. The check quoted the specification's export rule on 2009-02-03 (`80d8c678a`)."
- Command: `explorations/coordinator/tools/facts-extract.sh 'index:export'`. Output: 11 INDEX lines hold "export", 10 printed. The ones on the check are `perf-probes/export-check-full/REPORT.md`, `perf-probes/export-abstract-codegen/REPORT.md` and the batch records `CLIMB-BATCH-22.md` and `CLIMB-BATCH-22c.md`. None of the ten printed lines speaks of the date of the rule's sentence.
- The note that dates the check is `explorations/reviews/foundations/evidence/corrections/p/checks.md`, section "5. The export-check dates: the judge's claim holds, and item 280 is wrong". It says: "`git log -S'equalListMembers' ac0d41de0 -- <file>` gives only `edb516dba`." Section 3 below repeats only the author, the date and the one-line change, from the commit itself.
- Command: `git show -s --format='%h %ad %an | %s' --date=iso-strict 27d56aee5`. Output: `27d56aee5 2026-10-28T22:20:17+00:00 Claude | The team's export check dated right: it refused a missing member from 2009-03-10 (edb516dba, Sukyoung Ryu), five weeks after the checker quoted the specification's rule; the correction of 10-26 to 2009-05-08 named the commit that only added messages; row ...`. This is the correction of the check's date.

## 2. The rule's sentence

### 2.1 The text today

- Command: `sed -n 380,385p Specification/basic/components/source-code.tex`. Output:

```
and contains,
for each field declaration and non-abstract method declaration
in the exported declaration,
a satisfying declaration (or a set of declarations).
When a trait has an abstract method declared,
a satisfying trait declaration is allowed to provide a concrete declaration.
```

### 2.2 Blame and the path's log stop at a parentless snapshot

- Command: `git blame -L 380,385 --date=short -- Specification/basic/components/source-code.tex | cut -c1-70`. Output: all six lines read `^5a68404fd (David Chase 2012-07-19 38x) ...`. The caret marks a boundary commit.
- Command: `git log --format='%h %ad %an | parents=%p | %s' --date=short -- Specification/basic/components/source-code.tex | cut -c1-120`. Output: two commits. `576b4c287 2026-09-30 Claude | parents=e2f1aa7e8 | The specification's overloading chapters ...` and `5a68404fd 2012-07-19 David Chase | parents= | Added odd random longs to MagicNumbers`. The second has no parent. Its `git show --name-status` line for the file is `A`.
- Command: `git rev-list --max-parents=0 HEAD | wc -l`. Output: `147`. The record says the conversion cut 146 parent links (`records.md`, "The repository's history"; `research/authorship.md`).
- Command: `git log --follow --format='%h' -- Specification/basic/components/source-code.tex | wc -l`. Output: `153`. Of them, 146 show the file as `A` (a root snapshot adds the whole tree). The other seven include copy detections: `git log --follow --name-status` prints `C095 Specification/basic/tests.tex Specification/basic/evaluation/intro.tex` at `7e6e40458` (2009-10-29) and `C100 Specification/basic/evaluation/intro.tex Specification/basic/components/source-code.tex` at the same commit, and `A` and `M` lines for `Specification/basic/tests.tex` at `d8859d236` and `1a51f191e` (2009-10-20). The follow list therefore reaches 2009-10-20, a date that does not belong to this file; the file's own `M` lines are `576b4c287` (2026-09-30), `2f8b4331a` (2011-02-02, "Updated Copyright notices") and `0f49d8698` (2009-11-06). The record's `explorations/reviews/mie-probes/spec-sentences-dated.md` says the same of `--follow` here.

### 2.3 The pickaxe on the specification paths

- Command: `git log --all --full-history -S'non-abstract method declaration' --format='%h %ad %an | parents=%p | %s' --date=iso-strict --name-only -- Specification Specification-1.0-frozen '*source-code.tex'`. Output: 147 commits. 146 have empty `parents=` and add the sentence at `Specification/basic/components/source-code.tex`, and from `c02fa44d0` (2012-01-04) also at `Specification-1.0-frozen/basic/components/source-code.tex`. The snapshots run from `3d113107d` 2011-03-19 to `5a68404fd` 2012-07-19. The one commit that has a parent:

```
0f49d8698 2009-11-06T19:31:17+00:00 sukyoungryu | parents=997a0dc6a | [spec] Added the entire spec files.  The next task is to integrate the technical decisions since 1.0.
Specification/basic/components/source-code.tex
```

### 2.4 The first commit is a bulk import

- Command: `git show --shortstat --format= 0f49d8698`. Output: ` 52 files changed, 10627 insertions(+), 12 deletions(-)`. `git show --name-status --format= 0f49d8698 | awk '{print $1}' | sort | uniq -c` gives 7 `A`, 44 `M` and 1 `R091`.
- Command: `git show 997a0dc6a:Specification/basic/components/source-code.tex | wc -l`, then the same for `0f49d8698`. Output: `16`, then `512`. The parent `997a0dc6a` (2009-11-06T15:53:57Z, dr2chase) holds a 16-line stub, the copyright header, and no `non-abstract`. `cec470a34` (2009-11-02) holds the same 16 lines.
- Command: `git diff 997a0dc6a 0f49d8698 --stat -- Specification/basic/components/source-code.tex`. Output: ` 496 insertions(+)`.
- Command: `git show 0f49d8698:Specification/basic/components/source-code.tex | grep -n 'non-abstract'`. Output: `387:for each field declaration and non-abstract method declaration`.
- The record's `explorations/reviews/mie-probes/spec-sentences-dated.md` calls `0f49d8698` "the earliest reachable git copy" of the specification's LaTeX, and `explorations/coordinator/positions-audit/full/evidence/P-26.md:13` says the sentences it dated are byte-identical from `0f49d8698` to HEAD and that it found no 2008 git date. `spec-sentences-dated.md` concerns five other sentences (trait exclusion, generic self-extension, overload static parameters).

### 2.5 The words have not changed since 2009-11

- Command: for each of `0f49d8698`, `5a68404fd` and `576b4c287`, `git show C:Specification/basic/components/source-code.tex | sed -n '/^A trait or object declaration is satisfied by/,/^a satisfying trait declaration is allowed to provide a concrete declaration\./p' | md5sum`; and the same on `5a68404fd:Specification-1.0-frozen/basic/components/source-code.tex`. Output: `b180f17194e8` on all four. At `0f49d8698` the passage is 14 lines.

### 2.6 The 2008 release already holds the sentence

- Command: `git log -1 --format='%H %ad %an %p' --date=iso 1.0`. Output: `0e8ede7e7f6ae1f15c67023ec4ded3345419b1a9 2008-03-31 20:37:28 +0000 sukyoungryu 52a1511af`. The tag `1.0` is a lightweight tag on this commit, and `git merge-base --is-ancestor 0e8ede7e7 HEAD` succeeds.
- Command: `git ls-tree -r --name-only 1.0 | grep -E '\.(tex|pdf)$'`. Output: `Fortify/example/buffons.pdf`, `Fortify/example/buffons.tex`, `Fortify/fortify-macros.tex`, `Specification/fortress.1.0.pdf`. The 1.0 tree has no specification LaTeX, only the PDF.
- Command: `git log 1.0 --format='%h %ad %an | %s' --date=short --name-status -- Specification/fortress.1.0.pdf`. Output: `403afbe0b 2008-03-31 sukyoungryu | Added the Fortress Language Specification, Version 1.0.` with status `A`. `git show -s --format='%h author=%an %ad parents=%p' --date=iso-strict 403afbe0b` gives `2008-03-31T18:32:09+00:00 parents=57310aa15`. The record's `explorations/coordinator/spec-lineage.md`, section 1, dates the PDF the same way.
- Command: `git show 1.0:Specification/fortress.1.0.pdf > fortress.1.0.pdf; pdfinfo fortress.1.0.pdf`. Output: `Pages: 262`, `CreationDate: Mon Mar 31 18:09:59 2008 UTC`, `Producer: pdfeTeX-1.304`.
- Command: `pdftotext -layout fortress.1.0.pdf f10.txt; grep -n -i -E "satisfied by|non-abstract" f10.txt`. Output, lines 5013 and 5014: "A trait or object declaration is satisfied by a declaration that has the same header,2 and contains, for each field declara- tion and non-abstract method declaration in the exported declaration, a satisfying declaration (or a set of declarations)." Line 5015 follows: "When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration."
- Command: `pdftotext -layout -f 119 -l 119 fortress.1.0.pdf - | grep -n -E "Export Statements|non-abstract"`. Output: `1:20.2.2      Export Statements` and `15:tion and non-abstract method declaration in the exported declaration, ...`. The sentence is on PDF page 119, section 20.2.2.
- Command: a script that takes the passage from "A trait or object declaration is satisfied by" to "allowed to provide a concrete declaration." out of `0f49d8698:Specification/basic/components/source-code.tex` (footnote cut) and out of the PDF text (footnote mark `2` and hyphenation cut), keeps the letters in lower case, and compares. Output: `main text equal ...: True 303 303`. So the PDF passage and the LaTeX passage have the same 303 letters in the same order.
- Command: `git rev-parse 1.0:Specification/fortress.1.0.pdf HEAD:Specification-1.0-frozen/fortress.1.0.pdf`. Output: `1f1e914dd4c7e4b14b1a279f24adc5817e6130ea` twice. The PDF in `Specification-1.0-frozen/` is the same blob as the 1.0 release PDF.
- Command: `git show -s --format='%h %ad %an | %s' --date=iso-strict c02fa44d0`. Output: `c02fa44d0 2012-01-04T15:50:44-05:00 Guy Steele | Cloned Specification directory into Specification-1.0-frozen`. The LaTeX under `Specification-1.0-frozen/` is a January 2012 clone of the working draft (`explorations/coordinator/spec-lineage.md`, Summary), so its copy of the sentence is not a 2008 text. Only its PDF is the 2008 release.
- No other 2008 release text is in git: `git log --all --full-history --diff-filter=A --name-only -- '*.pdf'`, with the parentless commits filtered out, (first 25 lines of the date-sorted list) names `Specification/fortress.1.0.pdf` once, at `403afbe0b`. The next specification PDF that a parented commit adds is `Documentation/Specification/fortress.pdf` at `37d7e5619` (2012-05-07, Guy Steele), the later restart, and then the revival's own builds of 2026-08-21 (`414b790e3`).

### 2.7 Text copies in code, before the LaTeX

- Command: `git log --all --full-history --until='2009-11-06T19:31:16Z' -S'non-abstract method declaration' --format='%h %ad %an | parents=%p | %s' --date=iso-strict --name-only` (whole tree, every ref, every commit dated before the import). Output, all of it:

```
80d8c678a 2009-02-03T06:51:18+00:00 sukyoungryu | parents=c9eda14f1 | [Compiled0] Implemented checking matching top-level declarations in components and APIs in Scala.
ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java
ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala
8a843ad33 2009-02-02T17:17:42+00:00 sukyoungryu | parents=2c4d58732 | [Compiled0] Fixed the static error message on Compiled0.t
ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java
```

  No LaTeX file and no other file holds the phrase before `0f49d8698`. The search cannot read the PDF, which is binary.
- Command: `git show 8a843ad33 -- ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java | grep -n -B2 -A2 'non-abstract'`. Output: the added lines "A trait or object declaration is satisfied by a declaration that has the same header, and contains, for each field declaration / and non-abstract method declaration in the exported declaration, a satisfying declaration (or a set of declarations). / When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration." They sit in a block comment under "Implements the semantics of export statements described in Section 20.2.2 in the Fortress language specification Version 1.0." and one line holds the PDF ligature "ﬁeld".
- Command: `git show 80d8c678a:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala | grep -n -B2 -A3 'non-abstract'`. Output, lines 102 to 107: "A trait or object declaration is satisfied by a declaration that / has the same header, and contains, for each field declaration / and non-abstract method declaration in the exported declaration, / a satisfying declaration (or a set of declarations). / When a trait has an abstract method declared, a satisfying trait / declaration is allowed to provide a concrete declaration."
- The same file's header comment at `edb516dba` reads " * in Section 20.2.2 "Export Statements"" and " * in the Fortress language specification Version 1.0." (`git show edb516dba -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`, context line of the first hunk).

## 3. The check

- Command: `git show --no-patch --format='%H%nauthor: %an <%ae>%nauthor date: %ad%ncommit date: %cd%nparents: %p%nsubject: %s' --date=iso-strict edb516dba`. Output:

```
edb516dbab6455f9252fd1167ab206d3dfb2c78e
author: sukyoungryu <sukyoungryu@localhost>
author date: 2009-03-10T20:31:32+00:00
commit date: 2009-03-10T20:31:32+00:00
parents: be4361de4
subject: [compiler library] Fixed mismatch between the API CompilerBuiltin and the component CompilerBuiltin. [export checker] Added checks for traits and object trait types.
```

- What it changed about counting members, in one line: it adds `equalListMembers`, which in `ExportChecker.scala` reads `left.length == right.length && List.forall2(left, right)((l,r) => equalMember(l,r))`, and calls it from the new `equalTraitTypeHeaders`, so a component's trait or object is refused unless it holds as many member declarations as its api's, abstract methods among them (the member comparison `equalFnHeaders(headerL, headerR, true)` drops only the `Abstract` modifier before comparing).
- Command: `git show be4361de4:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala | grep -c -E 'equalListMembers|equalMember'`. Output: `0`. The parent holds neither function.
- Command: `git log -S'equalListMembers' --format='%h %ad %an' --date=short edb516dba -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`. Output: `edb516dba 2009-03-10 sukyoungryu`. It is the only commit in its history that changes the count of the name.
- Command: `git show -s --format='%h %ad %an' --date=iso-strict 77a8dd706 ac0d41de0 80d8c678a`. Output: `77a8dd706 2009-04-13T19:06:16+00:00 sukyoungryu`, `ac0d41de0 2009-05-08T02:58:03+00:00 sukyoungryu`, `80d8c678a 2009-02-03T06:51:18+00:00 sukyoungryu`. The record's note (section 1 above) reads these two later commits as the check's last form and its message edit; this scout did not read their code again.

## 4. The dates side by side

| Date (UTC) | Commit or file | Author | What it holds |
|---|---|---|---|
| 2008-03-31 | `403afbe0b`, `Specification/fortress.1.0.pdf` (built 18:09:59, committed 18:32:09) | sukyoungryu | the sentence, section 20.2.2, page 119 |
| 2009-02-02 | `8a843ad33`, `Disambiguator.java` | sukyoungryu | the sentence pasted in a comment |
| 2009-02-03 | `80d8c678a`, `ExportChecker.scala` | sukyoungryu | the sentence quoted in a comment |
| 2009-03-10 | `edb516dba`, `ExportChecker.scala` | sukyoungryu | `equalListMembers`: the member counts must be equal |
| 2009-11-06 | `0f49d8698`, `Specification/basic/components/source-code.tex` | sukyoungryu | the sentence as LaTeX, in a 52-file bulk import |
| 2012-01-04 | `c02fa44d0`, `Specification-1.0-frozen/` | Guy Steele | a clone of the working draft's LaTeX, same sentence |
| 2012-07-19 | `5a68404fd` | David Chase | parentless snapshot; where `git blame` stops |

## 5. What this scout did not do

- It ran the pickaxe over the whole tree only for commits dated before the import (section 2.7), and over the specification paths for all commits (section 2.3). A pickaxe over the whole tree for all dates was started and not waited for, since it can only add later copies.
- It did not read the 1.0 release's other sections, and did not compare the rest of section 20.2.2 with the LaTeX.
- It read no code of `77a8dd706` or `ac0d41de0`.
- It did not look for a pre-2008 draft of the specification outside this repository.
