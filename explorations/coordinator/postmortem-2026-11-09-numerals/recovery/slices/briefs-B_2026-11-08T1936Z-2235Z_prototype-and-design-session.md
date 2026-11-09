# Briefs to workers, 2026-11-08T1936Z-2235Z prototype-and-design-session

The prototype's brief (reading B on the compiled side, 19:36) and every message the coordinator sent it during the design session (19:48, 20:13, 21:23, 21:56), with the frozen-specification scout, the ledger-row writer of 20:47 and the scout for the team's words on IntLiteral and FloatLiteral (22:35).

Source: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`. L = 1-based line of the .jsonl. Each entry is the verbatim input of one tool call (Agent, SendMessage, Workflow, TaskStop), every field as written; nothing is cut. Tool results are left out.

## L4157 · 2026-11-08T19:36:32Z · Agent · Opus prototype: reading B on the compiled side

**description:** `Opus prototype: reading B on the compiled side`

**subagent_type:** `general-purpose`

**model:** `opus`

**effort:** `xhigh`

**run_in_background:** `true`

**prompt:**

``````
Load the `fortress-repo` skill first (/home/user/fortress/.claude/skills/fortress-repo/SKILL.md), read its `references/revival-changes.md` whole, and the parts your work needs: `build-and-caches.md`, `session.md`, `worktrees.md`, `toolchain.md`, `compiler.md`, `library.md`, `specification.md`, `tests-writing.md`, `tests-running.md`, `gate.md` (the count and distance stages), `records.md`, `exploring.md`, `committing.md`. You are exploring: you build a prototype in a worktree to measure a design, and you commit its report and its patch, not the code.

## The problem

The curator is deciding between two readings of what type a numeral has at a place that fixes no type. The measured review is `explorations/reviews/literal-fork-2026-11-08.md`; read it whole first, then `explorations/reviews/literals-one-picture-2026-11-08.md` sections 1 to 6. He leans to reading B: a numeral has its own type (`IntLiteral`, `FloatLiteral`) only while the checker types the program; at a typed place it converts exactly, once; where nothing fixes a type (an untyped binding `x = 3`, a parameter of type `Any`, a static argument that only the numeral fixes, a dotted receiver, a join) it becomes `ZZ32`, or `ZZ64` or `ZZ` by its value, or `RR64`; a tie between conversions reads `RR64` for a float numeral; no value of a numeral type exists at run time, since the code generator emits the converted constant; `IntLiteral` and `FloatLiteral` are not writable by a program. Before he decides, he wants B's compiled side built and measured, since the review costed it only by reading (its sections 4.2 and 6.3, rungs 2 to 4).

## What to build, in a worktree

1. **The base build for climb batch 29.** Main's head is the base; build it as `/home/user/fortress-base29` by `references/worktrees.md` (the base and its build), in the background with a log, and keep it: the batch's planner and rungs will use it. Read the disk first (`df -P /home/user`); stop if the build or the worktree would leave under 14 G. `/home/user/fortress-base28` is the earlier base; do not touch it.
2. **A worktree seeded from the base**, `/home/user/fortress-proto-b`, by `seed-worktree.sh`. Build and measure only there. Remove it when done.
3. **Reading B's compiled side**, as the review's section 4.2 lays it out, in this order, measuring after each step so that each result has one cause:
   - the library: `FloatLiteral` a type apart from `RR64` (the compiler's prelude's form, `trait FloatLiteral excludes {RR32, RR64}`), with coercions into `QQ` (exact), `RR64` and `RR32` (one rounding) and the `=` pairs that P-165 asks for (`facts-extract.sh 'P-165+'`, `'P-172+'`); the float tie rule; the `=` pairs over the literal types dropped, since no literal value reaches run time;
   - the checker's default at each kind of place (`scala_src/typechecker/impls/Decls.scala`, `Functionals.scala`, the sites the review names), the float tie rule, and `IntLiteral` and `FloatLiteral` unwritable by a program;
   - the fold: a coercion of a numeral becomes the converted constant (`compiler/desugarer/CoercionDesugarer.scala`, `compiler/codegen/CodeGen.java`, `forIntLiteralExpr`, `forFloatLiteralExpr`), with one rounding of a float numeral (row 862), and an expression of numerals alone folded exactly before the checker (the Working Draft's static expressions; today only a prefix `-` folds, `IntegerLiteralFoldingVisitor.java`);
   - then remove `IntLiteral`'s 21 glue bindings and its run-time arithmetic from the one library, since nothing reaches them after the fold; leave `FloatLiteral`'s 3 in place, and say in the report what walk still needs them for until walk's rung lands.
   Write first, as the skill asks, the test programs that assert B's answers on the compiled path: `x = 3` an `ZZ32`, `y = 0.5` an `RR64`, `Cell(3)` a `Cell[\ZZ32\]`, `<|1,2,3|>` a list of `ZZ32` (where lists exist), `f(3)` at `Any` a `ZZ32`, `3 SEQV z` true, `q: QQ = 0.5` exact, `1/2 = 0.5` with the fold, `3 + 4` and `2^40` folded, `bigN = 3000000000` a `ZZ64` and `g(bigN)` sound (row 946), `1 - b` for `b = 0.9` an `RR64`, `1.0 s` an `RR64`, a 17-digit numeral rounded once. Put them under your worktree's `ProjectFortress/compiler_tests/` as the suites' tests, see them fail, then pass.

## What to measure, and report with the command and its output

- The lines changed in each area, from `git diff --stat` in the worktree.
- The count stage and the distance stage on the one library, before and after each step, as the gate runs them (`references/gate.md`, `references/compiler.md`; the driver under `explorations/coordinator/tools/checker-count/`). The record's last figures are 0 and 0 at climb batch 28's gate (F-53): cite them, measure your tree.
- The checker's timing smoke test (`references/compiler.md`, "The checker's time").
- The compiled suites that the gate runs, before and after: which tests flip or break, by name and line, against the review's prediction (`InferCoercionShapes.fss:72`, `InferO2Num.fss:20`, `InferO2Pos.fss:18`, `XXXApplicationErrors.test`, the seven team tests that write `IntLiteral` as a type, `IntLiteralValue.fss`, `NumberMixedEqualityWalk.fss`). Run the walk suite too, once, after the library change, and report what the library change alone breaks under walk, since walk's own rungs are not part of this prototype.
- The library's own text: every place where the default retyped a library numeral (the review names `maxFib = 46`, `Library/String.fss:21`, and expects more at `Any` parameters and inferred static arguments), from the checker's output.
- microGPT: compile its two programs' components as far as the compiled path goes today (F-97: they stop at name resolution before the switch-over), and say what you could and could not check; measure nothing twice.

## What to deliver, committed

- The report `explorations/compile-ladder/plan-29/probes/literal-default.md`: what you built, each measurement with its command and output, the lines, what flipped or broke, what you could not build or measure, the defects you found, your decisions, and the questions for the curator as decisions not taken. Plain words, lists not tables, every claim with its source. End with a summary under 400 words.
- The patch `explorations/compile-ladder/plan-29/probes/literal-default.patch`: `git diff` of the worktree against the base, with your new test programs included (`git add -N` them first). This is how earlier probes were kept (`explorations/compile-ladder/plan-19/probes/*.patch`).
- An INDEX line for the report in `explorations/coordinator/INDEX.md`, in the form of the lines for `explorations/compile-ladder/`.
- Commit the three by named paths in the main tree `/home/user/fortress`, one commit, `git add -- <paths>` then `git commit -m MSG -- <paths>`, ending exactly with the two lines "Co-Authored-By: Claude <noreply@anthropic.com>" and "Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB". Do not push. Change nothing else in the main tree. Remove the worktree and its caches; keep `/home/user/fortress-base29`.

Run every build and suite in the background with a log under the worktree's `tmp/`, and poll; keep each wait under 240 s. If the whole takes more than about four hours of work, stop at the end of the step you are in, measure, and report what is left. Final message under 400 words: the commit, the headline measurements, and what is unbuilt.
``````

## L4226 · 2026-11-08T19:48:26Z · SendMessage · af02c1de6155a7afd

**to:** `af02c1de6155a7afd`

**summary:** `Add the user-type coercion case to the tests`

**message:**

``````
One case to add to your test programs and your report, at the curator's question: a program's own number type that takes a numeral. Today a program can declare `coerce(x: IntLiteral)` on its own type (the Working Draft's reason for numeral types: "library designers decide how numerals should interact with other types of objects by defining coercion operations"). Under B, with `IntLiteral` and `FloatLiteral` unwritable and no literal value at run time, say what `c: CC64 = 3` and `c: CC64 = 0.5` need from the program's type: coercions from the default types (`ZZ32`, `ZZ64`, `ZZ`, `RR64`), and what a 20-digit numeral then arrives as. Measure it on your tree with a small value object that declares such coercions, before and after your checker and fold steps, and list it among the consequences for a programmer, with the team's own example `3.1415926535897932384` from the Working Draft, `Specification-1.0-frozen/basic/expressions/literals.tex:132-141`. Keep the rest of the task as it stands.
``````

**type:** `message`

**recipient:** `af02c1de6155a7afd`

**recipient_kind:** `agent`

**content:** `One case to add to your test programs and your re…`

## L4268 · 2026-11-08T19:54:17Z · Agent · Scout: what the frozen specification copy is

**description:** `Scout: what the frozen specification copy is`

**subagent_type:** `general-purpose`

**model:** `sonnet`

**run_in_background:** `true`

**prompt:**

``````
You are an archaeology scout in the repository /home/user/fortress. You fetch exact words and dates with their sources. No judgement, no conclusion.

The question in dispute: what is the folder `Specification-1.0-frozen/`? One side says it is the unrevised copy of the team's Working Draft of February 2011, which `Specification/` revises. The other side says it is the specification's 1.0 release, and that the team made later revisions with draft notes, which `Specification/` extends. Fetch the evidence for both, verbatim:

1. `git log --follow --format='%h %ad %an %s' --date=short -- Specification-1.0-frozen | tail -5` and `| head -5`: when the folder appeared, by whom, and the commit message that created it. Show the creating commit's message whole (`git show -s --format=%B <hash>`), and its file list in brief (`git show --stat <hash> | tail -3`).
2. The same for `Specification/`: its first and last commits by date, and the first commit after 2026-01-01 (the revival's).
3. The title pages: `Specification-1.0-frozen/fortress/fortress.tex` lines 70 to 100, and the same lines of `Specification/fortress/fortress.tex` (or wherever its title is). Any `\date`, version, month and year strings in both.
4. Dates inside the two trees: `grep -rhoE '(January|February|March|April|May|June|July|August|September|October|November|December) 20(0[0-9]|1[0-9])' Specification-1.0-frozen | sort | uniq -c | sort -rn | head`, and the same for `Specification/`.
5. `fortress.1.0.pdf` in the frozen folder, if present: `ls -la`, `pdfinfo` if available, and the first page's text (`pdftotext -l 1`) if available.
6. Whether the two trees differed at the revival's start: `git diff --stat <last team commit on Specification> <first revival commit> -- Specification Specification-1.0-frozen | tail -3`, and whether `Specification-1.0-frozen` existed in the team's history at all (`git log --format=%h -1 --before=2013-01-01 -- Specification-1.0-frozen`).
7. The number of `\note{` boxes in each tree: `grep -rc '\\note{' Specification-1.0-frozen | awk -F: '{s+=$2} END {print s}'` and the same for `Specification/`.
8. The record's words: `grep -n -i "frozen" .claude/skills/fortress-repo/references/specification.md .claude/skills/fortress-repo/references/sources.md explorations/coordinator/POSITIONS.md explorations/coordinator/FACTS.md | head -20`, verbatim, and the history block for the specification part's sentence "Cite it as the Working Draft of February 2011" if `sources.md` names its source.
9. The team's own README or notes on the specification's versions: `grep -rn -i "working draft\|1\.0\|frozen" README* Specification/README* Specification-1.0-frozen/README* 2>/dev/null | head`, and `git log --all --format='%h %ad %s' --date=short -i --grep='spec' --before=2013-01-01 | head -15`.

Write the results to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/frozen-spec/evidence.md`, each item with its command and output verbatim (cut any output over 60 lines and say so). Change nothing in the repository; commit nothing. Final message under 200 words: the file's path and the items you could not fetch.
``````

## L4342 · 2026-11-08T20:13:09Z · SendMessage · af02c1de6155a7afd

**to:** `af02c1de6155a7afd`

**summary:** `Two more user-type cases and the hybrid, by reading`

**message:**

``````
Two more cases for your user-type test program, beside `CC64`, at the curator's question, and one design question to answer by reading in your report. (1) An interval type, the Working Draft's own example (`Specification-1.0-frozen/basic/expressions/literals.tex:137-141`, "convert it directly to an interval"): a value object `Iv(lo: RR64, hi: RR64)` whose coercion from a float numeral encloses the numeral's exact value between the two neighbouring doubles; today, under A, it reads the exact value from the literal (its numerator and denominator, or its text); under B, say what it can do when the numeral arrives as a double. (2) A reduced-precision float type for machine learning, such as bfloat16 as a value object over a `ZZ32` bit pattern, whose coercion from a float numeral must round once from the exact value: find a decimal numeral where rounding first to a double and then to bfloat16 gives a different bit pattern than one rounding from the exact rational (double rounding), and show it. Measure both on your tree under A (today) and after your B steps. (3) By reading, cost a hybrid: B's default where nothing fixes a type, but a program's own type may still declare `coerce(x: FloatLiteral)` or `coerce(x: IntLiteral)` and receives the exact literal value, so a literal value exists at run time only as the argument of such a coercion (Haskell's `fromInteger` and `fromRational` give a user type the literal exactly; Swift's `ExpressibleByFloatLiteral` gives it a `Double` and loses). Say what it keeps of B's gains (which of the 24 glue bindings must stay for the literal's accessors), what the checker and the fold must do differently, and whether `IntLiteral` and `FloatLiteral` then stay writable only as a coercion's parameter type. Keep the rest of the task as it stands, and keep the four-hour bound: if these do not fit, say which you left.
``````

**type:** `message`

**recipient:** `af02c1de6155a7afd`

**recipient_kind:** `agent`

**content:** `Two more cases for your user-type test program, b…`

## L4533 · 2026-11-08T20:47:47Z · Agent · Opus: file the ledger row for the prelude's bare FloatLiteral

**description:** `Opus: file the ledger row for the prelude's bare FloatLiteral`

**subagent_type:** `general-purpose`

**model:** `opus`

**run_in_background:** `true`

**prompt:**

``````
Load the `fortress-repo` skill (/home/user/fortress/.claude/skills/fortress-repo/SKILL.md) and read its `references/records.md` whole, in particular "The gap ledger" and "Writing to the record". You file one ledger row in the main tree /home/user/fortress, commit it by named path, and do not push.

## The defect, measured by the coordinator at 20:3x UTC on 2026-11-08

On the compiled path, against the compiler's prelude, a bare float numeral has no `asString`: `(1.5).asString` and `(1.1_2).asString` die with `java.lang.NullPointerException: Cannot invoke "fortress.CompilerBuiltin$Object.asString()" because "<parameter2>" is null`, raised inside `CompilerBuiltin.||` when the null string is concatenated. A typed binding is fine: `f: RR64 = 1.1_2` prints `1.5`, and so do `h: ZZ32 = FF_16` (255), `b: ZZ32 = 1010_2` (10), `o: ZZ64 = 777_8` (511), `g: RR64 = C.8_16` (12.5), and a bare integer numeral prints (`(FF_16).asString` is `255`). Walk prints all of them, the bare float numeral included. The cause, by reading: the prelude's `trait FloatLiteral excludes {RR32, RR64}` declares only `getter asRR32(): RR32` and `getter asRR64(): RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:996-999`), so the value that the code generator makes for a bare float numeral has no `asString` of its own and the prelude's default reaches a null.

The programs and the outputs are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/radix/`: `RadixComp.fss` with `compile.log` and `run.log`, `RadixComp2.fss` with `compile2.log`, and `RadixProbe.fss` for walk. They were compiled and run in a worktree seeded from `/home/user/fortress-base29` at main's head `8cde0b2c4f` (the worktree is removed; `/home/user/fortress-base29` stays and you may read it, but do not build or run in it). Measure nothing again; cite the logs.

## The task

1. Run the ledger queries first: `facts-extract.sh 'ledger-find:FloatLiteral'`, `'ledger-find:asString prelude'`, `'ledger:318'` and `'ledger:862'`. Row 318 records the prelude's `IntLiteral` stubs that throw `CompilerFailureDetectedAtRunTime`; row 862 the compiled float numeral's two or three roundings. Decide by the ledger's rules whether this is a new issue (a new row, with 318 as a sibling) or a fact to add as a note to an existing row; `records.md` says a new issue gets a new row.
2. If a new row: print the row template, write the row as one line with `?` in its number cell, status `NEGATIVE-VERIFIED`, class `implementation gap (prelude)`, the specification cell as the template asks (the prelude is the compiler's library; say "silent" or cite the literals chapter as the template's examples do), the reproducer `RadixComp2.fss` by its path in the scratchpad folder named above, "found by" the coordinator's probe of 2026-11-08 (the boot note names it), the notes with the cause by reading and the exact error. Say in the notes that the prelude is deleted at the switch-over (P-38; P-37), so the row closes with it, and that no bare `FloatLiteral` reaches run time under the reading B that the curator is deciding (`explorations/reviews/literal-fork-2026-11-08.md`). Add it with `ledger.py add FILE --section TITLE`, in row 318's section.
3. Commit the ledger by its named path, one commit, message ending exactly with the two lines "Co-Authored-By: Claude <noreply@anthropic.com>" and "Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB". Do not push.

Final message under 120 words: the row's number and its claim cell, or the row you noted and the note, and the commit.
``````

## L4643 · 2026-11-08T21:23:33Z · SendMessage · af02c1de6155a7afd

**to:** `af02c1de6155a7afd`

**summary:** `Hybrid by reading: the literal's accessors`

**message:**

``````
For the hybrid you cost by reading (part 3 of my earlier message), add this, by reading only, no build: under the hybrid the literal types carry the Working Draft's four parameters as accessors, not as static parameters: for a numeral with a radix point, the digit count, the count after the point, the base, and the digits read as one integer in that base (`Specification-1.0-frozen/basic/expressions/literals.tex:110-129`, `RadixPointNumeral[\n, m, r, v\]`), or equivalently a reduced numerator and denominator; for an integer numeral, the base and the value. Say what the one library's `FloatLiteral` and `IntLiteral` would declare (getters), what walk's `FFloatLiteral`, which already holds those parts (`values/FFloatLiteral.java:26`), and the code generator's literal node must expose, and about how many lines. Then say, by reading, whether three tests would pass under the hybrid: a round trip, a program type whose coercion prints the numeral back as written, `C.8_16` in and `"C.8_16"` out; a decimal type `Dec(unscaled: ZZ, scale: ZZ32)` receiving `3.14159` as 314159 and 5 exactly; and strict equivalence by value across bases, `0.1_2 SEQV 0.5` true and `0.1 = 0.1_16` false, which needs `SEQV` on the literal type to compare the reduced value, not the stored parts. Keep the four-hour bound; if these do not fit, list them as left.
``````

**type:** `message`

**recipient:** `af02c1de6155a7afd`

**recipient_kind:** `agent`

**content:** `For the hybrid you cost by reading (part 3 of my …`

## L4752 · 2026-11-08T21:56:49Z · SendMessage · af02c1de6155a7afd

**to:** `af02c1de6155a7afd`

**summary:** `Cost the Draft's way beside the hybrid, by reading`

**message:**

``````
One more design to cost by reading only, beside the hybrid, at the curator's question; no build. The Working Draft's own way for a program's type: the numeral's type carries the four numbers as `nat` static parameters, `RadixPointNumeral[\n, m, r, v\]` (`Specification-1.0-frozen/basic/expressions/literals.tex:110-129`), and a program's type declares a generic coercion over them, `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\])`, whose body uses `n, m, r, v` as values; at an untyped place reading B's default still applies, so these types live only in the checker, except that a coercion instantiated for a numeral is realised the way the compiled path realises every generic, a specialised class per instantiation, with the static arguments stamped in (F-129: a size read as a value is a constant the class loader replaces). Cost, by reading, what each path must change: the checker typing a numeral with four static arguments and inferring a generic coercion's static arguments from them (does the checker accept static parameters on a coercion today? row 513 says walk does not convert through one); `nat` beyond 32 bits in the checker's size arithmetic (F-67, F-146) and in the class loader's stamped constants (F-129), since `v` of a 20-digit numeral exceeds an `NN32`; walk's `nat` used as a value (row 486) and its instantiation per numeral; and whether a `where` clause on such a coercion, `where { v < 256 }`, could refuse an out-of-range numeral at compile time, which the hybrid cannot. Say what this way gains over the hybrid (no run-time literal value even for a program's type; static range checks) and what it costs beyond it, with the same three tests (round trip, decimal, equivalence by value across bases) judged by reading. Keep the four-hour bound; list what you leave.
``````

**type:** `message`

**recipient:** `af02c1de6155a7afd`

**recipient_kind:** `agent`

**content:** `One more design to cost by reading only, beside t…`

## L4888 · 2026-11-08T22:35:14Z · Agent · Scout: the team's words on IntLiteral and FloatLiteral

**description:** `Scout: the team's words on IntLiteral and FloatLiteral`

**subagent_type:** `general-purpose`

**model:** `sonnet`

**run_in_background:** `true`

**prompt:**

``````
You are an archaeology scout in the repository /home/user/fortress. You fetch the team's exact words, with their source, author and date. No judgement, no summary of meaning.

The question: did the Sun Labs team (2005 to 2012) regard the types `IntLiteral` and `FloatLiteral` as the language's design for numerals, or as a temporary device while the specification's numeral types (`NaturalNumeral`, `RadixPointNumeral`, `Numeral[\n,m,r,v\]`, in `Specification-1.0-frozen/basic/expressions/literals.tex:83-129`) were unbuilt? Fetch every comment, commit message and note of theirs that bears on it. The revival's own commits (2026) are not the team's; mark any you meet as the revival's and keep them apart.

Where to look, and what to fetch verbatim:
1. The compiler's library: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, the declarations of `IntLiteral` (around lines 880 to 930) and `FloatLiteral` (around 990 to 1000), with every comment in or beside them; `git log --follow --format='%h %ad %an %s' --date=short -- ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss | tail -40` and, with `git log -S'IntLiteral' --format='%h %ad %an %s' --date=short --before=2013-01-01 -- ProjectFortress/LibraryBuiltin/`, the commits that introduced or changed the two, with each commit's full message (`git show -s --format=%B`) where it mentions literals, numerals, coercion or `ZZ32`.
2. The interpreter's library: the history of the numeral type in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi` before 2013 (`git log -S'IntLiteral' ...`, `git log -S'FloatLiteral' ...` on `ProjectFortress/LibraryBuiltin/` and `Library/`), the team's comment "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" with its commit and author, and any comment on `FloatLiteral extends RR64`.
3. Walk's glue: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java`, and `interpreter/evaluator/values/FIntLiteral.java`, `FFloatLiteral.java`: header comments, any `TODO`, `HACK`, `XXX`, `temporary`, `for now`, `until` in them, with the blame of each such line (`git blame -L`) for author and date.
4. The checker and the code generator: `grep -rn -i "IntLiteral\|FloatLiteral" ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` for comments only (lines with `//` or `/*` near the matches), with blame for author and date of each comment.
5. The team's tests that state the design in words: `grep -rn -i "IntLiteral" ProjectFortress/compiler_tests/Compiled10.Comprehensions4.fss ProjectFortress/compiler_tests/Compiled6.bo.fss` and any other team test whose comment mentions `IntLiteral` (`grep -rln -i "IntLiteral" ProjectFortress/compiler_tests ProjectFortress/tests | head`), with the comment lines and blame.
6. Commit messages 2008 to 2012 across the repository: `git log --format='%h %ad %an %s' --date=short --before=2013-01-01 -i --grep='literal' | head -40`, and the full message of each that speaks of the numeral design.
7. The specification's own notes on the numeral types and the `IntLiteral` box: `Specification-1.0-frozen/basic/expressions/literals.tex:83-129` (the team's `\note{}` boxes there, verbatim) and `Specification/appendices/changes.tex`, the entry on the numeral type (grep `revival-numeral-type`), which quotes the team's comment.
8. The record's own account: `explorations/coordinator/tools/facts-extract.sh 'history:P-76'` and `'F-79'`, the lines that quote the team.

Write everything to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/numeral-names/evidence.md`, each item with its command, the source (file:line or commit), author, date and the words verbatim; cut any single output over 80 lines and say so. Change nothing in the repository; commit nothing. Final message under 200 words: the file's path, the count of team comments and commits found, and what you could not find.
``````

