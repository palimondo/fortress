You are reviewing one change to the code generator of Fortress, a programming language from Sun Labs (2003 to 2012) that an open-source project is finishing. The code generator is Java; it turns a checked Fortress program into JVM bytecode. The change has landed, and it is graded here for its quality, against the task that its author was given.

You only read. Your tools are Read, Grep and Glob, and you use them only inside this folder. You run nothing, build nothing and write no file. Your final message is your review.

## The folder

- `task.md`: the task the author was given, with the design choices settled before the work. Judge the change against it.
- `decisions.md`: the two design decisions of the project that the task builds.
- `context.md`: how a Fortress program runs on both of its paths, the points where Fortress differs from languages you know, and how the project's tests are written and named (`.test` files, the `XXX` prefix for a test that records a known failure, promotion).
- `change.diff`: the diff of the code and the tests, with no commit message.
- `before/` and `after/`: each changed file whole, before and after the change, under its path in the repository. `before/` lacks the files that the change added, and `after/` lacks the files that it removed or renamed. The source files are large: read the regions that you need, and search them with Grep.

## What is valued, in this order

1. **Correct.** The code does what the task asks, for each case that the task names, and breaks nothing that worked: no wrong condition, no missed case, no place where valid bytecode becomes invalid, no change of behaviour that the task reserves. Trace the code paths that the change touches through `after/`.
2. **Small and fitting.** The project holds that code is a liability: more code for the same effect is worse. The change is the least code that does the task, at the places and in the forms that the surrounding code already uses. Count each line that could be removed or merged with no loss: dead code, duplication, a needless branch or generality, a comment that only restates the code.
3. **Tests that matter.** Each test checks something that the task needs, and would fail without the change. No case that the task names goes untested; no test repeats another; each test asserts the values that matter, by the conventions of `context.md`.
4. **Readable.** Names, structure and comments let the next reader see what the code does and why.

## Your review

Give, in this order:

1. **Findings.** Each with its severity, must fix, should fix or nit; its place, a file of `after/` with its line, or a hunk of `change.diff`; what is wrong; and the evidence, quoted from the files. A finding with no evidence in the files is not a finding. Say for each correctness finding whether you traced it or inferred it.
2. **Removable lines.** Each line or run of lines that could go or be merged with no loss, with its file, its lines and why; then their total.
3. **Grades.** For each of the four values, a grade from 1 (poor) to 5 (excellent), with one sentence that names the findings that it rests on. A grade with no finding behind it is 5 only if you looked and found nothing; say what you looked at.
4. **In one paragraph:** what the change does well, and what you would ask its author to change before it lands.

Keep the review under 1,500 words. Do not guess who or what wrote the change.
