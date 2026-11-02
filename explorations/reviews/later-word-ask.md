<!-- The ask to the curator on what counts as the team's later word in P-26 and how "later" is dated (review-queue item 318), written 2026-11-02. -->

# The ask on the team's later word

## 1. The question

Which rule does P-26, the entry on the team's later word, state: what counts as that word, and how is "later" dated?

## 2. The context

- **Primer.** P-26 chooses between the team's sources: where the type group's later positions conflict with the specification's early text, the later positions win. The type group is the part of the team that built the type checker and the compiler. Open: does the team's code count as its later word, or only its texts? And is "later" the date of a commit, of the passage that the code departs from, or of the whole document?
- **One case: the integer power at a negative exponent,** `2^(-1)` with a `ZZ32` base. The team left three answers, and the revival took a fourth.
  - The Working Draft, the specification as the team left it, gives the rational 1/2: there an integer is also a rational, whose power at an integer exponent is a rational (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`).
  - The interpreter's library, which walk runs, typed every integer power `RR64`, as it did already in July 2008 (Guy Steele, `dc41d5000`), and walk gave the float 0.5.
  - The compiler's prelude, the compiled path's own small library, gives each integer type a power of its own type: `ZZ32` (Christine Flood, 2011-09-19, `489d3c1bb`), `NN32` (Jean-Baptiste Tristan, 2011-11-30, `a80f9d0a5`) and `NN64` (Tristan, 2012-01-03, `b22c4ac56`). Its Java helper casts `Math.pow`, so `2^(-1)` gives 0.
  - The revival's rule (P-153): the result stays `ZZ32`, and `2^(-1)` raises `IntegerOverflow`.
- **A second case: the number types.** The Working Draft nests them in its library chapters, yet its types chapter says "These types are mutually exclusive; no value has more than one of them" (`types-vals-vars.tex:502`). The interpreter's library kept them nested to the team's last commit (`a874948ac`, 2012-08-31). The prelude made them siblings on 2009-08-31 (David Chase, `6896886fb`: "ZZ32 is NOT a subtype of ZZ64"), added exclusion clauses until 2010-01-13 (Eric Allen, `d0cde7d17`), and kept them siblings while Steele (2011-11-03, `4a1ca19d8`) and Tristan (`b22c4ac56`) built on them. The revival made them siblings (P-43).
- **Why the rule exists.** Your words of 2026-09-23, in P-26's history: the specification was "written in a vacuum early on", as a wish; the type group tried to make it run and so knew what is feasible; "when that wish met reality, then the spec must change".
- **The team's texts, with their dates.**
  - The Working Draft: Sukyoung Ryu put its chapters into the repository from 2009-10-20 to 2009-11-11, the number chapters on 2009-11-03 (`6d53c0fc4`); its last edit of content is of 2010-12-09 (`44e03b176`); Flood updated its copyright notices on 2011-02-02 (`2f8b4331a`), the date that P-7 gives it.
  - The type group's 2011 paper (OOPSLA, October 2011, `Papers/Types/paper.tick:206`), which adopts the exclusion rule.
  - The 2012 restart, a new specification begun on 2012-02-20 (Victor Luchangco, `166841592`) and left unfinished; its Types chapter is of 2012-05-31 (`275b90773`).
  - Karl Naden's write-up "The Return Type Rule and Generics", 2012-08-31 (`8015b17f4`), the day of the team's last commit.
  - The POPL 2019 paper of Park, Hong, Steele and Ryu (January 2019).
  - The compiler's prelude: the commits of the two cases, 2009-08-31 to 2012-01-03.
- **Two readings.**
  - The foundations judgement, the review that you asked for on 2026-10-26 at 05:25 UTC (06:25 CET), weighs each ground in its own layer, your frame in that message: the language, the team's build on the Java virtual machine (the JVM), or the meeting of the two. By it, P-26's reason is a motive of the build; the prelude's siblings of 2009 are earlier than the Working Draft's last edit and the 2011 paper, so not "later"; the team's code mixes rules made on purpose with workarounds; and P-153 is a choice of the build in a gap of the texts, where the goal decides (`explorations/reviews/foundations/judgement.md`, tenets 1 and 2, sections 3 and 7).
  - Your reading: "by the standing position that later team’s work supersedes earlier one, we take the completed path’s way over the walk library’s" (2026-10-26, 04:28 UTC, 05:28 CET). In your page comments of 2026-10-29: P-26 is "like a general rule applied everywhere" (06:56 UTC, 07:56 CET); P-153 is "simply the application of the general rule that the later team's decision wins. Working draft was never implemented." (06:57); and a test that decides "based on a date" looks like "reward hacking your own testing" (06:49).
  - You said yes to rewording P-26 and P-37 on 2026-10-26 at 07:42 UTC (08:42 CET). No wording of the rule has been put to you since.
- **The library's own way.** In both cases the interpreter's library went a third way to the end, an `RR64` power and nested types, and the revival took the prelude's way.
- **The peers.** Web standards write down what browsers ship; C's committee codifies existing practice, yet says: "Existing code is important, existing implementations are not."
- **How to judge the fork.** P-43, P-153 and P-158 stand under every option, so judge by what a worker decides at the next fork without you. Three test cases: a prelude stub, such as a fixed number of arguments where the library takes any number, must not bind the one library; an error of the JVM's bytecode verifier must not by itself change the specification; and the integer power must stand.
- **The seven open questions** that your answer settles. A chunk is one part of the correction runs on POSITIONS; chunk p's questions are in `explorations/reviews/foundations/evidence/corrections/p/proposals.md`, chunk c1's in `.../c1/proposals.md`, each under its entry's heading.
  1. Chunk p, on P-37, its question 1: should P-37 say when a design of the prelude binds the one library?
  2. Chunk p, on P-26, its question 1: keep your reason, or take the judgement's, that the later texts agree and the Working Draft contradicts itself?
  3. Its question 2: keep "the number types of the compiler's prelude made siblings in 2009 and 2010" in P-26's list, or remove it so that "later" is a date?
  4. Its question 4: add the judgement's six rules (its section 7)?
  5. Its question 5: does P-26 also rank the team's later work over its earlier work, the prelude over the interpreter's library?
  6. Chunk c1, on P-7: does P-7 leave to P-26 which work in the compiler counts?
  7. Chunk c1, on P-153: is P-153's reason the judgement's, a choice of the build in a gap that the goal decides?

  P-26's question 3, on the sentence "The implementers' later word also outweighs unfinished text.", is review-queue item 215; every option keeps that sentence.
- **The switch-over does not need this answer.** No rung of phase 4 waits on it, and no option turns a decision. It is needed before the next fork where the prelude and the interpreter's library differ, such as whether a program may extend `Number` (review-queue item 23).

### The entries as they stand

- P-26 **Where the type group's later positions conflict with the specification's early text, the later positions win.** The early text was a wish. The type group, the part of the team that built the type checker and the compiler, then worked to make the language run, with performance as the goal and specialization a must, and learned what is feasible. Specialization, in the type group's design, is a special version of a generic function for one instantiation, such as `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, which dispatch chooses at run time. Where the two conflict, the specification is revised to follow their later word (P-95 records each change with its reason). Their later word includes the exclusion rule, specialization kept, the number types of the compiler's prelude made siblings in 2009 and 2010 (P-43: the library's numbers are flat in the same way), Karl Naden's 2012 write-up "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex`) and the type group's POPL 2019 paper with its technical report, the team's last word and work, kept in `Papers/` with their other papers (F-166; F-300). The implementers' later word also outweighs unfinished text. The revival does not second-guess them: it knows less than they did.

- P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over spares porting the interpreter's library into the compiler's; the revival develops the checker until it accepts that fuller library. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled; F-293 holds the compiler's fourth file, `CompilerSystem`). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.

- P-7 **The goal is to finish what the designers intended, measured by one program, microGPT, compiled to JVM bytecode and running fast.** What the designers intended is judged by the specification in `Specification/`: the team's Working Draft of February 2011, as the revival revises it, with the Types chapter of the team's 2012 restart cited beside it (P-25). The revival revises the specification to reconcile contradictions: where the team's later work, in the compiler or in the papers on types, contradicts the original text, the text is updated to follow that work. The language is not redesigned. The specification is a living document that states each change that the revival makes (P-95 says how a change is recorded). A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at.

- P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction.** Each integer type's `^` returns its own type at every exponent. At a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A program that wants a fraction writes a float or rational base, as in `2.0^(-1)`. Why: the team's later code gives an integer power the type of its integer base at a signed exponent. Overloads choose by type, and no type tells a negative exponent from a non-negative one, since a signed integer or a numeral can be either. So the split is on the base, and the sign of the exponent is tested at run time, as the library tests a value's sign everywhere (P-80, run-time sign tests in place of sign-refined types). Row 441: the same rule on the compiled path, whose own powers give 0 at a negative exponent and a raw Java exception at a base of 0, and overflow silently or with a raw Java exception (row 523).

## 3. The options

### Option 1. Your general rule.

P-26, three changes:

- The title becomes "The team's later decision wins over its earlier one, whether the team made it in a text or in code."
- The sentence that starts "Where the two conflict" becomes: "Where a later decision conflicts with the specification's early text, the specification is revised to follow it (P-95 records each change with its reason), and where it conflicts with the team's earlier code, such as the interpreter's library, the one library follows it. A decision is what the team wrote, or built and kept, as the way Fortress works; a line that its own author called a stub, temporary or a hack is not one. "Later" is the date of the team's work on the point at issue. Where two later decisions conflict, the goal decides (P-8)."
- The list's "Their later word includes" becomes "The type group's later word includes", and its "made siblings in 2009 and 2010" becomes "made siblings from 2009 and kept so until 2012".

P-37, one change: the clause that starts "the one library may take" becomes "the one library takes a design of the prelude's where it is the team's later decision, as it took the prelude's flat shape of the number types."

P-7 and P-153 stay as they read.

What it changes in the work: P-26 becomes one rule, with your reason. At a later fork, a design that the prelude made after the interpreter's library binds the one library, unless its author called it a stub; an unmarked workaround of a JVM limit binds too.

The seven: 1, yes, where the design is the team's later decision; 2, keep your reason; 3, keep the item, dated by the team's work on it, 2009 to 2012; 4, no, only the stub, date and conflict rules, in your terms; 5, yes; 6, no, P-7 stays; 7, no, P-153 stays.

### Option 2. The judgement's layer rule.

P-26, five changes:

- The title becomes "Where the team's later texts on the language conflict with the specification's early text, the later texts win; the team's code counts only where the texts are silent or unclear."
- The two sentences from "The early text was a wish." to "and learned what is feasible." become: "The Working Draft, last edited in December 2010, contradicts itself on the number types. The type group, the part of the team that built the type checker and the compiler, wrote later texts that agree with each other: the 2011 paper, the 2012 Types chapter, Naden's 2012 write-up and the POPL 2019 paper."
- After "which dispatch chooses at run time.", add: "The class per instantiation that the compiled run time makes is another thing, a means of the build."
- The sentence that starts "Where the two conflict" becomes: "Where the later texts conflict with the early text, the specification is revised to follow them (P-95 records each change with its reason). Each ground is weighed in its own layer, the language, the team's build on the JVM, or the meeting of Fortress and Java, and a limit of the JVM or of the checker never decides what the language says. The team's code counts as its word on the language only where the texts are silent or unclear and the team wrote the rule on purpose, in a commit message, a comment or a checker rule; a stub or a workaround never counts. "Later" is a date: the texts rank by date, the POPL 2019 paper last, and a commit is dated against them. Where two later sources conflict, the goal decides (P-8), and the decision says so."
- The list's "Their later word includes" becomes "The type group's later word includes", and it loses "the number types of the compiler's prelude made siblings in 2009 and 2010 (P-43: the library's numbers are flat in the same way), ".

P-37, one change: the sentence that starts "The decision settles which files survive" becomes: "The decision settles which files survive, not the designs inside them. The prelude is a bootstrap of the build, so its designs are evidence, not authority. One binds the one library where the team's later texts on the language back it, as the exclusion rule backs the flat number types, or where those texts are silent or unclear and the team's checker enforces it as a rule; a stub, or a way around a limit of the JVM or of the checker, does not bind."

P-7, one change: the clause that starts "where the team's later work" becomes "where the team's later word contradicts the original text, the text is updated to follow it; P-26 says what counts as that word, and when the team's work in the compiler counts."

P-153, one change: the sentence that starts "Why: the team's later code" becomes: "Why: the Working Draft's power, which gives a rational at a signed exponent, was never built on either path; the only power with an integer result type that the team built, the compiler prelude's, gives each integer type its own type at every exponent."

What it changes in the work: workers weigh the language's texts first, and count code only in their gaps. The interpreter's library counts as a statement of the language, so it outweighs later prelude code wherever the texts speak. P-43's and P-158's reasons are then restated on the language's grounds.

The seven: 1, yes, the judgement's section 3 rule; 2, take the judgement's reason; 3, remove the item; 4, yes, all six rules; 5, no, the prelude outranks the library only where the texts are silent or unclear; 6, yes; 7, yes.

### Option 3. Your rule, with the judgement's guards on code.

P-26, four changes:

- The title becomes "The team's later decision wins over its earlier one, whether the team made it in a text or in code that it wrote as the language's rule."
- After "and learned what is feasible.", add: "What they learned about the JVM changes the language only where they made it the language's rule."
- The sentence that starts "Where the two conflict" becomes: "Where a later decision conflicts with the specification's early text, the specification is revised to follow it (P-95 records each change with its reason), and where it conflicts with the team's earlier code, such as the interpreter's library, the one library follows it. Code is a decision where the team wrote it on purpose, built alike across its types or stated in a commit message, a comment or a checker rule; a stub by its author's words, or a way around a limit of the JVM or of the checker, is not. "Later" is the date of the team's work on the point at issue. Where two later decisions conflict, the goal decides (P-8)."
- The list changes as in option 1.

P-37, the change of option 1.

P-7, the change of option 2.

P-153 stays as it reads.

What it changes in the work: at a later fork, a design that the team wrote on purpose, later than the text or library it departs from, binds the one library; a stub or a workaround never does, marked or not.

The seven: 1, yes, as in option 1; 2, keep your reason, with one sentence on the build; 3, keep the item, dated; 4, in part: the guard on JVM limits, the test of code written on purpose, the date and the conflict rule; 5, yes; 6, yes; 7, no, P-153 stays.

## 4. How they weigh

- **Option 1** is the shortest and closest to your words, and leaves P-7 and P-153 as they read. It gives up the guard of the first two test cases: an unmarked stub or workaround in later prelude code binds the one library.
- **Option 2** is the strongest guard. It keeps the library's text above the prelude's code where the texts speak, close to the coordinator's second principle, the library as the team wrote it. It gives up your reason and your reading of 06:57, so P-153 stands on the gap reading that you did not take, and it puts six rules into P-26.
- **Option 3** keeps your rule, your reason and your reading of P-153, and adds only the guards that the first two test cases need. It gives up the layer rule as a rule of its own, and its test, code written on purpose, needs judgement case by case.
- P-26 grows by about 440 characters in option 1, 750 in option 2 and 660 in option 3.
- In every case found so far, options 2 and 3 reach the same outcome by different reasons. They part where later code that the team wrote on purpose departs from a Working Draft text that still fits the revived language, and no later paper speaks: option 3 follows the code, option 2 the text.

## 5. The recommendation

Option 3: your rule, your reason and P-153 stay, and P-26 gains only the guards that keep a stub or a JVM workaround from passing as the language's word.
