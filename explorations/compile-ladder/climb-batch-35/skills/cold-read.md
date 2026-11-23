# Cold read: fortress-repo, base 9322330fa

Skill: `fortress-repo`, read as a worker new to the repository. Head: 0cb867d174. Parts read: `SKILL.md`, `references/compiler.md`, `references/interpreter.md`, `references/revival-changes.md`, `references/tests-writing.md`.

## 1. The lint's output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/revival-changes.md .claude/skills/fortress-repo/references/tests-writing.md

Output: none. Exit code 0. No hits.

## 2. What I would do differently, section by section

- `SKILL.md`, "Parallelism and mutable state" (deletion of the `exit` out of `atomic` sentence): I no longer set a flag in the block and exit after it. Nothing is left that a worker cannot act on.
- `SKILL.md`, "Fortress as a language", "Static parameters": I expect a size parameter of a numeral coercion, as `v` in `NaturalNumeral[\n, r, v\]`, to convert where it stands, as a numeral does. I cannot state the limit from this section: the double "where" hides which parameters it covers. It does not warn that the tree still reads these as `ZZ`. I learn that only in `revival-changes.md`.
- `compiler.md`, "What the compiled path cannot compile yet" (deletion of the one-JVM order paragraph): I no longer compile `FortressLibrary` first for the reason given there.
- `compiler.md`, same section, modifier sentence: I write `override` in a compiled program. I cannot bound the exception, "where a static parameter is involved". I do not know which `override` the code generator refuses, or what message it prints.
- `compiler.md`, "Traps of the compiled path" (deletion of the `self`-not-first trap): I no longer put `self` first in an object's overloads for this reason.
- `interpreter.md`, "How walk evaluates a program" (two deletions): I write `(first, second) = pairOnce()` directly. I take walk's `n` for a radix-point numeral with leading zeros as the rules' answer. Both lists stay coherent.
- `revival-changes.md`, opening paragraphs (F-N sentence): I treat a departure that cites an F-N entry as a known departure. Where the rules decide, I write an `XXX` test. I cannot tell what the test or report cites in place of the row, or whether I add a ledger row.
- `revival-changes.md`, "Traits and objects", "`override` widens": I expect the checker, as well as walk, to refuse an `override` that overrides nothing. This section no longer tells me that the code generator refuses some `override`s.
- `revival-changes.md`, "Numbers", flat siblings: no change of action. The "tower" sentence still helps me read the record's word. The deletion of "route A" removes a record name that changed no action.
- `revival-changes.md`, "Numbers", a program's own number type: I write the rule's body `Byte(v)` in an `XXX` test, and `Byte(v.asZZ32)` in a plain walk program. I do not know what to write in a compiled program. I do not know when the compiled path computes the coercion: at compile time or at class load.
- `revival-changes.md`, "Numbers", "`Number` declares nothing": I write `asFloat(x)` under walk, and assert `x.asRR64` only in an `XXX` test. The section does not say what a compiled program against the compiler's prelude needs.
- `tests-writing.md`, "A test program", superscript: I parenthesise after a call. The section is silent about a superscript after a subscript.

Repair history: none found in the changed text. Two status words, "yet" (`revival-changes.md:7`) and "today" (`revival-changes.md:99`), will go stale; the flags below fold them into restatements.

## 3. The flags

### `SKILL.md`

**F1.** `SKILL.md:133`.
- Passage: "a `nat` or `int` parameter used as a value is a `ZZ32`, but converts where it stands, as a numeral does, where it is one of a numeral type's numbers"
- Kind: a sentence that reads two ways.
- Problem: the two "where"s read as one condition or two, so a worker cannot tell which parameters convert and which are a `ZZ32`.
- Confidence: medium.
- Fix: restate: "sizes (a `nat` or `int` parameter used as a value is a `ZZ32`; the static parameters of a numeral coercion follow their own rule: `references/revival-changes.md`, "Numbers")".

**F2.** `SKILL.md:133`.
- Passage: "but converts where it stands, as a numeral does"
- Kind: a gotcha that the passage leaves out.
- Problem: the passage states the rule as if the tree built it, but walk, the checker and the code generator read these parameters as `ZZ` (`revival-changes.md:99`), so a worker who writes a coercion body from this line, as `Byte(v)`, meets walk's refusal.
- Confidence: medium.
- Fix: the restatement of F1, which sends the worker to the rule and its departure in one place.

### `compiler.md`

**F3.** `compiler.md:87`.
- Passage: "and an `override` where a static parameter is involved (ledger row 1106)"
- Kind: a sentence that reads two ways.
- Problem: "involved" can mean a method with static parameters of its own, a method of a generic trait or object, or a parameter type that names a static parameter, so a worker cannot tell whether its `override` compiles.
- Confidence: high.
- Fix: restate with the exact form, as the other refusals of this section do. For example: "It refuses an `override` of a method that has static parameters of its own [or: that a generic trait or object declares]: '<message>' (ledger row 1106)." The writer picks the form that row 1106 holds.

**F4.** `compiler.md:87`.
- Passage: "and an `override` where a static parameter is involved (ledger row 1106)"
- Kind: a gotcha that the passage leaves out.
- Problem: the refusal has no quoted message, unlike the other refusals of this section, so a worker who meets it cannot match the error to this sentence or to row 1106.
- Confidence: low.
- Fix: add the refusal's message to the restatement of F3.

### `interpreter.md`

No flags. The two deletions leave both lists coherent, and no other changed part points to the deleted cases.

### `revival-changes.md`

**F5.** `revival-changes.md:7`.
- Passage: "A departure that cites a FACTS entry (F-N) in place of a row has no row yet: treat it as one that cites a row."
- Kind: a gotcha that the passage leaves out.
- Problem: the next sentence says to cite the row in a plain test, and `tests-writing.md`, "How a defect is recorded", item 3, asks for a ledger row, so a worker does not know what to cite for an F-N departure, or whether to add a row; it may add a duplicate row or cite nothing. "yet" is also a status word that goes stale.
- Confidence: medium.
- Fix: restate: "A departure that cites a FACTS entry (F-N) in place of a row is known too: test it as one that cites a row, and cite the entry where you would cite the row." Add "Add no ledger row for it." or "Add its ledger row.", as the writer intends.

**F6.** `revival-changes.md:32`.
- Passage: "Walk refuses at load, and the checker refuses statically, an `override` that, by this rule, overrides nothing. So under walk a Java-style `override` in the library stops every program."
- Kind: a sentence that reads two ways.
- Problem: "under walk" now suggests that the compiled path is not affected, though the sentence before says that the checker refuses the same `override`; a worker cannot tell what a Java-style `override` in the library does to a compile with `FORTRESS_LIBRARY=one`.
- Confidence: low.
- Fix: restate: "So a Java-style `override`, one at the inherited declaration's own parameter types, in the library stops every program under walk, and [what it does on the compiled path]." Or drop "under walk" if it stops every program on both paths.

**F7.** `revival-changes.md:32`.
- Passage: the whole "`override` widens" paragraph, after the deletion of "Two departures: ... the code generator refuses every `override` modifier ... (row 650)."
- Kind: a gotcha that the passage leaves out.
- Problem: the paragraph no longer says that the code generator still refuses some `override`s (`compiler.md:87`, row 1106), and gives no pointer to `compiler.md`, so a worker who writes a compiled program from this rule meets that refusal unwarned.
- Confidence: medium.
- Fix: add at the end: "The code generator refuses an `override` [form of F3] (row 1106; `compiler.md`)."

**F8.** `revival-changes.md:99`.
- Passage: "The four static arguments are naturals of any size, without the `NN32` bound of a size."
- Kind: a sentence that reads two ways; a term not defined where it is used.
- Problem: "the four" names only `RadixPointNumeral`'s arguments, so a worker cannot tell whether `NaturalNumeral`'s three are also of any size; "the `NN32` bound of a size" is defined nowhere in the skill.
- Confidence: medium.
- Fix: restate: "The static arguments of either form are naturals of any size."

**F9.** `revival-changes.md:99`.
- Passage: "The body computes from them and invokes no method."
- Kind: a sentence that reads two ways.
- Problem: read as a rule, it forbids the walk form that the same paragraph gives, `Byte(v.asZZ32)`, whose `asZZ32` is a getter, a method (`revival-changes.md:110`); a worker cannot tell whether the workaround is allowed.
- Confidence: high.
- Fix: delete. "So `Byte`'s body is `Byte(v)`" already carries the point.

**F10.** `revival-changes.md:99`.
- Passage: "In the body, each converts where it stands, into the type that its place fixes, and is refused statically where it does not fit."
- Kind: a sentence that reads two ways.
- Problem: a worker cannot tell what is refused, and by what: the coercion's declaration, or a numeral written in the program whose number does not fit the place in the body.
- Confidence: low.
- Fix: restate, if this is the meaning: "In the body, each converts where it stands into the type that its place fixes. The checker refuses a numeral whose number does not fit there."

**F11.** `revival-changes.md:99`.
- Passage: "The tree departs: walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk, write `Byte(v.asZZ32)` today, as the one library does."
- Kind: a gotcha that the passage leaves out.
- Problem: it says that the checker reads each argument as a `ZZ`, but not what the compiled path does with `Byte(v)`, so a worker writing for both paths does not know whether to write `v.asZZ32` there too; with the deletion of "So `v.asZZ32` is `ZZ`'s getter, which raises `IntegerOverflow` outside `ZZ32`'s range", it also no longer knows that the getter can raise. "today" is a status word.
- Confidence: medium.
- Fix: restate: "The tree departs: walk, the checker and the code generator read each as a `ZZ`, so walk [and the checker] refuse `Byte(v)` (F-341, F-342, F-347). Write `Byte(v.asZZ32)`, as the one library does. `asZZ32` is `ZZ`'s getter, and raises `IntegerOverflow` outside `ZZ32`'s range."

**F12.** `revival-changes.md:99`.
- Passage: "walk computes it at the place's first run, the compiled path at compile time or when the class loads."
- Kind: a sentence that reads two ways.
- Problem: "at compile time or when the class loads" does not say which, and `compiler.md`, "What the code generator does", says that the compiled path runs it in the component class's static initializer, before `run()`, and at each evaluation where the place's type names a type parameter (row 957); a worker testing a coercion that raises cannot tell whether the compile or the run fails.
- Confidence: medium.
- Fix: restate: "walk computes it at the place's first run, the compiled path in the component class's static initializer, before `run()` (`compiler.md`, "What the code generator does")."

**F13.** `revival-changes.md:112`.
- Passage: "The one library departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)."
- Kind: a gotcha that the passage leaves out.
- Problem: until the switch-over the compiler's prelude has no `asFloat` (`compiler.md:147`), so a compiled program against the prelude fails at `asFloat(x)`, and at the same section's "write `asFloat(x) = y`".
- Confidence: medium.
- Fix: restate: "The one library departs: each declares `asFloat(self): RR64` instead, so under walk and with `FORTRESS_LIBRARY=one` write `asFloat(x)` (F-324). Until the switch-over, the compiler's prelude has no `asFloat` (`compiler.md`, "Traps of the compiled path")."

### `tests-writing.md`

**F14.** `tests-writing.md:34`.
- Passage: "After a call, parenthesise first, as `(f(x))^T`: `f(x)^T` is a static error."
- Kind: a gotcha that the passage leaves out.
- Problem: the deletion leaves the part silent about a superscript after a subscript, as `x[5]^2`, so a worker must test or search whether to parenthesise there.
- Confidence: low.
- Fix: restate the sentence before, if the subscript case now works: "It can follow a dotted access or a subscript: `p.wq^T` is `(p.wq)^T`, and `x[5]^2` is `(x[5])^2`."

## 4. Undefined terms

- "the `NN32` bound of a size": `revival-changes.md:99`.
- "a numeral type's numbers": `SKILL.md:133` (defined only later, at `revival-changes.md:93`; the phrase was in the base too).
- "Java-style `override`": `revival-changes.md:32` (in the base too; the changed sentence keeps it).

## 5. Gotchas

- A worker writes a numeral coercion's body as `Byte(v)` from the rule in `SKILL.md:133`, and walk refuses it.
- A worker writes an `override` in a compiled program and cannot predict or recognise the code generator's refusal (`compiler.md:87`).
- A worker cites nothing, or adds a duplicate ledger row, for a departure that cites an F-N entry (`revival-changes.md:7`).
- A worker writes an `override` in a compiled program from "`override` widens" and meets row 1106's refusal with no pointer (`revival-changes.md:32`).
- A worker writes `Byte(v)` in a compiled program, or does not know that `v.asZZ32` raises `IntegerOverflow` (`revival-changes.md:99`).
- A worker expects a compiled coercion that raises to fail the compile, not the run (`revival-changes.md:99` against `compiler.md`, "What the code generator does").
- A worker writes `asFloat(x)` in a compiled program against the compiler's prelude, which has no `asFloat` (`revival-changes.md:112`).
- A worker does not know whether to parenthesise a superscript after a subscript (`tests-writing.md:34`).

## 6. Count

Flags: 14. High: 2 (F3, F9). Medium: 8 (F1, F2, F5, F7, F8, F11, F12, F13). Low: 4 (F4, F6, F10, F14). Lint hits: 0.
