<!-- Cold read of the sixteen entry texts in apply.txt (bold title and body; provenance lines skimmed, not judged). Context: CLAUDE.md, fortress-repo SKILL.md and references/revival-changes.md, coordinator SKILL.md (as the launch message allowed, wider than coldread.md), plus term look-ups in library.md, interpreter.md, compiler.md. Opus cold reader, 2026-10-29. -->

# Cold read: final corrections

Form: D decided, A applies, R requires, U unfinished; then **CR** (could not resolve), each with confidence that it misleads or makes me search.

**P-27** D: domain-independent machinery a program builds goes into the library, made the library's way. A: on extending the library; not a choice between team designs. R: study the library's like case first; follow it. U: none named.
CR: (1) "on reasonable judgment": whose, mine or the curator's? (medium, wording). (2) "not an extension of the program's own domain": is softmax or attention microGPT's domain? No test given (medium). (3) "A form of that second part": "form" reads as "piece" here and as "pattern" later (low). (4) Last sentence: "two of the team's designs ... (P-26)" is opaque without P-26 (medium).

**P-37** D: the interpreter's library becomes the compiled path's; the compiler's three prelude files are deleted at the switch-over. R: add nothing to the prelude; code-generator work goes on. U: the switch-over.
CR: "respelled" tests (P-38) (low, unclear wording). Clear.

**P-33** D: phases 3-6 in order: 3 distance to zero, 4 natives then switch-over, 5 microGPT compiles, 6 fast. R: other components wait (F-290). U: all four.
CR: (1) "Row 320 ... does not link, is part of the switch-over's design": a fact, or "fix it inside phase 4"? (medium). (2) "the array design": no pointer (P-84/P-85?) (low). (3) The skill says the checker already finds no error in the library; the entry cannot say if phase 3 is done (low, status not its job).

**P-84** D: `RR64` arrays as unboxed `double[]`; `nat` sizes stay in array types and are checked. R: no run-time-only sizes first. U: the store; loader way A4.
CR: (1) Title in present tense ("is stored") while the skill and the last sentence say no `double[]` exists: reads as fact (high, sends wrong). (2) With the cut sentence, nothing says when the store is built; only "P-85 holds the open decisions" hints it waits (medium). (3) "unmeasured (F-18)": what is unmeasured, speed or feasibility? (low).

**P-59** D: walk picks coercions by run-time value until it runs the checker after the switch-over. R: don't change walk before. U: walk's use of static coercions. Clear.

**P-153** D: integer `^` returns the base's type; negative exponent: 1/-1 exact, 0 DivisionByZero, else IntegerOverflow; fractions need float/rational base. U: compiled path (rows 441, 523).
CR: (1) "Row 441: the same rule on the compiled path, whose own powers give 0": first read says the compiled path follows the rule; it is the departure (medium; revival-changes resolves it). (2) "the team's later code": which code? (low). (3) When row 441 is fixed: P-37 forbids prelude additions, so after the switch-over? Not said (low).

**P-154** D: `List` ordered only for `StandardTotalOrder` elements; float/`QQ` lists have `=` only; pairs stay ordered. R: add no partial lexicographic trait now. U: walk (row 774); the tuples' rule.
CR: (1) "The draft" has no antecedent: only "incomplete" in the path says it is a draft (medium). (2) "The tuples' own rule is not decided here", yet revival-changes states a bold pair/triple rule without a P-number: decided or not? (medium).

**P-9** D: seek the most readable microGPT; C4's polish lives in its vocabulary (`FlatArrays.fss` and what moved to the library); APL lines expand to C4's lines; hyperparameters as tuple bindings. R: model-line changes shown as diffs first (P-87); no `a = 1; b = 2` form. U: none named.
CR: "Aaron Hsu's flat style" (low, outside term). Clear.

**P-12** D: after the switch-over walk runs the checker and uses its static coercions. R: nothing before it. U: the step (F-9, F-290).
CR: (1) Does a checker error then stop a walk run? Not said (medium). (2) Which phase holds the step: not in P-33's list (low).

**P-58** D: natives stay `builtinPrimitive("...")`, the string naming a static helper in `nativeHelpers/`; walk loads helpers; the compiled path rewrites to `import java` at parse and refuses unknown strings; migrate binding by binding, each checked from its move. R: no `import java` in the library. U: all of it (rows 796, 309).
CR: (1) Title in present tense ("Every native binding is"), then "Every binding still names a glue class" (medium, reads as fact first). (2) "glue class": not defined in SKILL.md; interpreter.md "Natives" (low). (3) "not all at once at the switch-over": attaches to the moving or the checking? (low).

**P-7** D: goal is finishing the designers' intent, by the revised 2011 Working Draft beside the 2012 Types chapter; reconcile to later work, no redesign; pure-Java microGPT is the baseline. Clear.
CR: where the pure-Java baseline lives (low, search).

**P-25** D: `Specification/` stays the standard; cite the 2012 Types chapter beside it; revise the spec to it on the revised rules. U: `covariant` (future, P-62).
CR: (1) "P-97 holds how the revision uses the first two": the first two passages (exclusion, `covariant`) or the exclusion rule's two parts? The enumeration ("It names...", "It adds...", "Third") supports both (high, wording). (2) "The revised Specification/ takes that form": done or to do? (medium).

**P-44** D: `AnyIntegral` stays closed by its five-type `comprises`; keep the `NOT YET` comment; checker accepts `Integral[\I\]` below it if all known types below are listed. R: library text and walk unchanged. U: row 487 hole.
CR: (1) "whose `where` form is not built": revival-changes (P-151) and compiler.md say `comprises ... where [\E\]` is built in the checker (code generator refuses, row 701). Can the comment become code? (high, sends wrong). (2) "Welterweight": undefined (medium, term). (3) "every type that the checker knows": in which components? (low; the hole sentence explains).

**P-48** D: an unfixed type parameter takes the meet of its bounds, narrowed by expected type, never `Bottom`. R: keep unbounded `fail`, `builtinPrimitive`, empty `List` comprehension. U: rows 538, 587, 591, 612.
CR: (1) "never the value's type alone", then "Under walk ... dispatch takes the value's type" with no row: accepted limit or departure? (medium). (2) Walk's `OPEN` (revival-changes) absent: fine or a gap? (low).

**P-152** D: both paths read exclusion over the whole parameter tuple by existential reduction. U: rows 787, 788. Clear.
CR: "existential reduction" undefined in text; path given (low).

**P-158** D: a component declares each api `abstract` member, at the api's header, body optional. R: add missing ones to the library. U: which members are missing (row 816).
CR: (1) "The compiled export check refuses a component that leaves one out" against library.md: "It requires no component member for an api member written `abstract`" (high: rule or fact, today or target?). (2) "header": defined only in library.md (low). (3) "that way wins over the interpreter's library" beside P-37's one library: resolvable via P-37's "may take a design of the prelude's" (low).

## Summary
Common pattern: present-tense titles that state a target (P-84, P-58); row cites whose role (fact, departure, task) is unstated (P-33, P-153, P-48). Four high flags: two contradict the skill (P-44, P-158), one reads as fact (P-84), one splits two ways (P-25).
