<!-- The orientation workflow's preservation check, update mode, for climb batch 31b (run 2 of climb batch 31): whether F-379, the one admitted finding, is carried into "Numbers" with its conditions, exceptions and path differences, and whether any changed sentence says more than its source. -->

# Preservation check: climb batch 31b, run 2 of climb batch 31 (update)

**Inputs.**
- In this folder: `orientation.md`, `admission.md`, `sources-mapping.md` and `writer-1.log`.
- The skill's current part, `.claude/skills/fortress-repo/references/revival-changes.md`, last changed at `e64da5d944`. I compared it with `orientation.md` by `diff`. Only two hunks differ, both in "Numbers" (`orientation.md:95-97` and `:118`). The rest of the file is the same, byte for byte.
- The sources, read with `facts-extract.sh`: F-379, F-303, P-178, P-43, P-160 and P-166. Ledger rows 551, 866, 959 and 1003. Rung O's report, `compile-ladder/rung-number-objects/REPORT.md`, "Programs run old against new" and "What a program sees differently".
- The tree at `HEAD` (`5a84f56cec`; no commit since 11:00 UTC touches `Library/` or `ProjectFortress/`):
  - `Library/FortressLibrary.fsi` and `.fss`;
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `CompilerBuiltin.fsi` and `.fss`;
  - `Library/CompilerLibrary.fsi` and `CompilerAlgebra.fsi`;
  - `interpreter/rewrite/DesugarerVisitor.java:1385-1436`;
  - rung O's parent, `f6e24650e7~1:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, and the team's, `a874948acb:` the same file.
- One probe under walk, run at 12:03 UTC by this check's first launch, before the interrupt (failure 2). I re-read its log rather than run it again, since the tree under it has not changed.

## Failures

### 1. The rule's last sentence asserts that traits which nest do not nest, and calls the seven value objects traits

- **Old** (`revival-changes.md:95`): "The record calls this choice route A. It still calls the number and order traits "the tower", which does not mean that they nest."
- **New** (`orientation.md:95`, last sentence): "The record calls this design route A, and calls the number and order traits "the tower": they do not nest."
- **Sources.**
  - P-43: "the number tower is flat (route A). … The fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`". In the record, "the tower" is the number types.
  - The admission, on this sentence: it "now names as traits five types that are objects". It also asked the writer to check the sentence against the new form.
  - The mapping's reason: "'Traits' kept: the order traits and `Number` are traits."
- **Says more than its source.**
  - (a) The colon makes the sentence assert that the number and order traits do not nest. The old sentence said only that the name does not imply nesting. Both kinds of trait do nest:
    - `trait StandardTotalOrder[\T …\] extends { StandardPartialOrder[\T\], StandardMinMax[\T\] }` (`Library/FortressLibrary.fsi:232-233`);
    - `trait Integral[\I …\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }` (`:471`);
    - `trait AnyIntegral extends { Number }` (`:466`).

    The orientation itself relies on this nesting, at `:30` ("`Integral[\I\]` below `AnyIntegral`") and in the self-typed form at `:39`. Only the number types are flat (P-43).
  - (b) Read as the number types, "the number … traits" calls traits the seven types that the same rule's first sentence names value objects. This is the point that the admission asked the writer to check, and it was not done. The mapping's reason fits `Number` and the order traits, but `Number` is the only number trait among them, and "they do not nest" is false of the others.
- **Consequence for a worker.**
  - Under reading (a), a worker can take `StandardTotalOrder[\T\]` and `StandardPartialOrder[\T\]`, or `Integral` and `Number`, to be unrelated. That worker then expects overloads at them to be siblings when one is more specific, writes a second bound that the first implies, or doubts `:30`.
  - Under reading (b), a worker meets "traits" at the end of the one rule that says these types are objects. The worker can then doubt that walk refuses an extender, or take the old sentence's sense, that the types are traits, as the current one.
- **Fix.** Apply the claim to the number types, for example: "The record calls this design route A, and still calls the number types "the tower", though they do not nest."

### 2. Walk's refusal at load, and the rule before it, are stated for every number type, `QQ` included

- **Old.** The old part has no such sentence. The sources:
  - F-379: "`object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'".
  - Row 551: "A program's object below `ZZ32`, `ZZ64`, `ZZ`, `NN64` or `RR64` is refused at load, 'Attempt to extend object type ZZ32', each being an object".
  - P-178: "An object is a leaf, so no type of a program extends a built-in number type". P-178 lists the five, "as `NN32` and `RR32` already are".
  - The admission, "What has been run": the refusal was run only for an object below `ZZ32`.
- **New** (`orientation.md:95`): "`QQ` is a trait, and its values are the value object `Ratio` (P-166). No type of a program extends a number type. … Walk refuses an object below a number type at load, as `object Mine extends ZZ32`: 'Attempt to extend object type ZZ32'."
- **Says more than its source.** Both sentences follow one that has just named `QQ` as a number type, and `QQ` is no object.
  - The library declares `trait QQ … excludes { RR64, AnyIntegral } comprises { ... }`, an open clause (`Library/FortressLibrary.fsi:394-397`).
  - Walk's refusal fires only where the parent is an `Object` in walk's type environment. A `Trait` parent takes the other branch and is processed (`interpreter/rewrite/DesugarerVisitor.java:1398`, `:1435-1436`).
  - P-178 grounds its rule on "An object is a leaf", which does not hold for `QQ`.
- **Probe.** `object Mine extends QQ`, with only `asString` and `asFloat`, under walk. It was refused for another reason, P-147's cover check: "Object Mine does not define an abstract method declared in type QQ: … isNaN():Boolean". It was not refused as an extension of an object. The files are `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/qqprobe/src/QQExtendProbe.fss` and `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/qqprobe/run.log`. No object that defines all of `QQ`'s abstract methods was run.
- **Consequence for a worker.** A worker can take walk's refusal as a guard for every number type, or "No type of a program extends a number type" as a rule that the tree enforces at `QQ`. That worker then writes a refusal-at-load test for a type below `QQ`, or reports its loading as a defect. A complete object below `QQ` gets no such refusal, by the code. The cost is a wrong test or a wrong report, not a wrong answer.
- **Fix.** "Walk refuses an object below one of the seven at load, …". Whether P-178's rule covers `QQ`, whose clause is `comprises { ... }`, is a question for the coordinator about P-178. It is not the writer's to settle.

### 3. The prelude sentence says "the number types" where the prelude has seven and no `QQ` (minor)

- **Old.** No old sentence. The sources:
  - Row 1003: "the compiler's prelude declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` as an open trait".
  - Row 866 ran the extender at `ZZ32` only, `MyNum + 1` for `object MyNum extends ZZ32`.
- **New** (`orientation.md:95`): "The compiler's prelude still declares the number types as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866)."
- **Says more than its source, partly.**
  - The prelude's `NN32` and `RR32` are traits too (`CompilerBuiltin.fsi:273`, `:444`), so seven holds by the tree.
  - The prelude declares no `QQ`: `grep -c QQ` gives 0 in `CompilerBuiltin.fsi`, `CompilerLibrary.fsi` and `CompilerAlgebra.fsi`. The orientation says so itself at `:122`.
  - The death at class load generalises one run at `ZZ32` to every type. The mechanism supports this, since each carrier is a class, but no other run is on record. The sentence cites rows, so it is already marked as not settled.
- **Consequence for a worker.** Small. A reader can take `QQ` to be a trait of the prelude that a compiled type can extend, until `:122` says the prelude has none.
- **Fix.** "declares the other seven as traits that a type can extend".

## Checked and kept

| # | Item (F-379, its admission row, the admission's points, and the old text the update moved) | Where it stands now | Verdict |
|---|---|---|---|
| 1 | `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` are each one value object, as `NN32` and `RR32` already were (P-178) | `:95`, "Seven are value objects (P-178)". Checked at `FortressLibrary.fsi:292`, `:511`, `:572`, `:642`, `:713` and `FortressBuiltin.fsi:41`, `:123` | kept |
| 2 | Scope: the one library and walk, not the prelude | `:95`, in the prelude sentence three sentences later | kept. The scope follows the claim, within the same rule |
| 3 | `QQ` alone is a trait, and its values are the value object `Ratio` (P-166) | `:95`. `FortressLibrary.fss:719` is the only type below `QQ` in either library | kept |
| 4 | No type of a program extends a built-in number type (P-178) | `:95`, in P-178's words, without naming it | kept, but too wide at `QQ` (failure 2) |
| 5 | Walk's refusal at load, with its message | `:95`. The message is checked at `DesugarerVisitor.java:1436` | kept, but too wide in scope (failure 2) |
| 6 | A program's own number type extends `Number` (P-160) | `:95`, moved from the last sentence of the old `:116`. "May also" became an imperative after the prohibition. P-160: "so that a program may declare its own number type below `Number`" | kept, stated once |
| 7 | The prelude keeps open traits (row 1003): decided by P-178, not built | `:95`, with "still" and the row, without "Until the switch-over", as the admission asks | kept, with a minor overreach (failure 3) |
| 8 | Compiled: such an object compiles and dies when its class loads (row 866) | `:95` | kept, but generalised (failure 3) |
| 9 | No library declares the five names | `:97`. A `grep` of `Library/*.fs?` and `ProjectFortress/LibraryBuiltin/*.fs?` for a `trait`, `object` or `type` of each name finds none, the prelude included | kept |
| 10 | As a type, each is undefined: 'Float is undefined.' (F-303) | `:97`. The message is from rung O's run (`REPORT.md:150`, `:156`, "and so for `Int`, `Long`, `BigNum`, `UnsignedLong`") | kept. The binding of names is a phase that both paths share |
| 11 | As a `typecase` arm, each takes every value without a message (row 959, both paths) | `:97`. It names no path and cites the row, as the admission asks | kept |
| 12 | Mistake (a): an arm, a dispatch or an assertion at a removed name | `:97`: the arm sentence, the `RR64`-and-string example, the undefined type, and the replacements | kept |
| 13 | Mistake (b): a number-like type below `ZZ32` or `RR64`; walk's refusal; the compiled death at class load | `:95` | kept |
| 14 | The writer's addition: "write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`, in that order" | `:97`. `f6e24650e7~1:…/FortressBuiltin.fsi` has `Float extends RR64` (`:41`), `Int extends ZZ32` (`:126`), `Long extends ZZ64` (`:129`), `UnsignedLong extends NN64` (`:193`) and `BigNum extends ZZ` (`:196`) | kept, with its source checked |
| 15 | The writer's addition: an arm at `Int` "also takes an `RR64` and a string" | `:97`. Row 959: "under walk an arm `Int` takes `1.5` and `"s"`". Rung O's run gives `3 Int; 1.5 Int; s Int` | kept |
| 16 | Heading: "The team's" five names | `:97`. The team's `a874948acb:…/FortressBuiltin.fsi:41`, `:76`, `:79`, `:110`, `:145` declare all five | kept, with its source checked |
| 17 | Point: no "Until the switch-over" for the prelude | `:95` | kept |
| 18 | Point: the refusal was run only for an object | `:95` says "an object" | kept for objects. For `QQ`, see failure 2 |
| 19 | Point: name `NN32` and `RR32` | `:95` names all seven | kept |
| 20 | Point: walk's overloading at the five types (rows 697, 1044, 1058) stays in `interpreter.md` | absent from the orientation. `:17` still sends it there | kept |
| 21 | Point: the sentences that state the form name P-178; those that state a refusal or the silent arm state what the tree does, by its tests and rows | P-178 is named. The silent arm cites row 959. The refusal cites neither its test nor row 551, but it is settled behaviour, so no row is owed | kept |
| 22 | Old: "The record calls this choice route A." | `:95`, "this design route A" (P-43, "route A") | kept |
| 23 | Old: "It still calls the number and order traits "the tower", which does not mean that they nest." | `:95` | changed in meaning (failure 1 (a)) |
| 24 | The admission's point that this sentence "now names as traits five types that are objects" | `:95` keeps "traits" | not done (failure 1 (b)) |

**Count.** One admitted finding, F-379, checked as 24 items:
- its correction and its two mistakes;
- the admission's five points for the writer;
- the three sentences that the writer added beyond the admission's text;
- the old sentences that the update moved or merged;
- the admission's check of the "tower" sentence.

Three failures. Failures 1 and 2 change what a worker concludes. Failure 3 is minor. The entries that the admission did not admit are outside this check, since the update left every section but "Numbers" unchanged (`diff`). The admission's item on `:70` (`===` at `RR32`, row 528) is the coordinator's, and the update leaves that sentence unchanged.
