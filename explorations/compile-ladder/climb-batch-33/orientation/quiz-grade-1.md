# Quiz grading, round 1 (cases 35, 36, 37)

The answers: `quiz-answers-1.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 35 to 37 (read on `main` at `9f2799fb19`). The orientation graded: `orientation.md` in this folder. Each case is graded on its decision and scope, by the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 2 (cases 35 and 36).
- Right without its path or scope qualification: 0.
- Wrong: 1 (case 37).
- Wrong and counted against the orientation: 1 (case 37).

## Case 35: right

- (a), (b), (c): each a plain compiled test that passes as written, with no change to the program, and no `XXX` form. This is the key's answer. The reader does not fall into the old orientation's `XXX` pairs for (b) and (c) or the `s: T = self` and body-in-`Late` workarounds. The `.test` files use `tests=Name`, `link`, `run` and `run_out_WIcontains=PASS`. The key's examples use `run_out_contains=PASS`. `run_out_WIcontains` is the template key in `tests-writing.md` (`:62`, `:69`), so it is right too.
- (d): as written, it compiles and links, and the run dies with a `VerifyError` when the class loads, after `REACHED` prints (row 1070). The passing form is `s: String => do r: T = self; r end`, as a plain test. The form as written is recorded under item 2 of "How a defect is recorded" as the full run-time pair: `XXXName.fss` printing `REACHED`, a link file (`tests=XXXName`, `link`), and `XXXName.test` (`run`, no `link`, `run_out_contains=REACHED`). They run in one `ONE_JVM=1` call with the link file first, and the pair is shown red once with the workaround. That is the key's full answer, not the partial one. The reader also says that row 1070's test is at a type that a `comprises` clause lists, and says what it does for either result of the ledger read. The key accepts that too.
- Scope: the switch-over changes none of the four, and a fix of row 1070 promotes the pair. Right. The question asks only about the compiled path, so the key's walk point is not needed.
- Not graded (the key's "none needed for a right answer"): the reader's (c) lists the trait's members as `lt`, then `getter key()`, then `keyOf`, and `Late`'s as `lt`, then `getter key()`. The key's run shows that both paths refuse that order: 'Field/getter/setter declarations should come before method declarations.' No part of the skill states this rule (a `grep` of `.claude/skills/fortress-repo/` finds none). It belongs in an area part, not the orientation, if anywhere.
- Passage relied on: orientation `:41` ("Traits and objects", the self-typed paragraph). It served the reader.

## Case 36: right

- (a): walk refuses the program at load, 'Int is undefined.' and 'Float is undefined.', so neither assertion runs. This holds on both paths. The reader also says that row 1064's tuple exception does not apply. Right, with the name and the path scope.
- (b): the arms are `ZZ32` and `RR64` with `else`, and the labels "Int" and "Float" are kept (the key accepts these). The type is `value object Meters(v: ZZ32) extends Number` with its own `+`. `kind(Meters(2))` gives "other", and `(Meters(2) + Meters(3)).v` is 5. The numerals take their defaults at `Number`. This is the key's program, nearly word for word. The reader also gets the case-12 point right: the object's `+` does not clash with the library's array-number `+`.
- (c): under walk, the planned `extends ZZ32` is refused at load with 'Attempt to extend object type ZZ32' (P-178). On the compiled path today, the checker accepts it (row 1003), and the object dies when its class loads (row 866). This lasts until the prelude limit is removed. The reader's own `Meters` runs on both paths. Right, with each path's behaviour. The reader gives no `IncompatibleClassChangeError` text, and the key does not require it.
- Passages relied on: orientation `:91` and the "Numbers" rules on flat siblings and P-160. They served the reader.

## Case 37: wrong

- (a): right under walk: 'x is undefined.' at load, neither assertion runs, and `Int` in the tuple arm alone draws no message (row 1064). Wrong on the compiled path. The reader says that the compile refuses `x` and, "by the rule", also `Int` in the tuple arm with 'Int is undefined.'. The key's **Wrong** for (a) lists "'Int is undefined.' given as a message of the program". The key's run of the compile stops with one error, 'x is undefined.', and an element of a tuple of names binds on both paths (F-382). The reader's alternative is also not the key's answer. That alternative applies if row 1064 shows the compiled path binds: 'typcase match failure!' from the code generator (row 964). So the reader's "look it up first" names where to look, but not a right action for the result.
- (b): right. The helper uses `(ZZ32, String) => "number and text"` and `x: Any => "other"`. `shape(("b", "a"))` gives "other" under walk, and `3` takes `ZZ32`. Not graded: the reader offers `(n: ZZ32, t: String) =>` as "a form for both paths". The key's run shows the compiled checker refuses that typed pattern as unreachable at the `Any` selector, and it shows that the code generator crashes on these calls with tuple arguments in any case.
- (c): partial. Under walk the reader is right: the program loads, both assertions pass, and `shape(("b", "a"))` gives "number and text" with no message, because `Int` binds (row 1064). On the compiled path the reader says 'Int is undefined.', or, as an alternative, 'typcase match failure!'. The key's answer is that the checker refuses the arm as unreachable: 'The typecase clause, Pattern at …, is unreachable.' (row 1064's notes). The key's **Partial** for (c) names exactly "the compiled refusal said to be 'Int is undefined.'".
- Scope: the switch-over changes neither. Right.
- The key's **Open** point (item 592, row 1064 `CONTESTED`) does not cause the miss. The reader's error is about what the tree does today, which the key settles by its run and row 1064's notes.
- **Counts against the orientation: yes, on both grounds.**
  - A passage misled the reader. Orientation `:91` says "On both paths, each is undefined as a type … A `typecase` arm at such a name … gets the same message", then "A name in a tuple arm still binds, so under walk `(NoSuchType, ZZ32) =>` takes `("s", 3)` (row 1064)". The reader read "under walk" as the exception's whole scope. So the reader applied the both-paths refusal to `Int` on the compiled path. The reader's answer quotes this inference: "the binding in a tuple arm is stated as walk's departure only".
  - A rule the key needs is missing: row 1064's compiled half. On the compiled path, the tuple's undefined name draws no 'undefined' message. With an `Any` selector, the checker refuses the arm as unreachable. No area part names row 1064, so the orientation is the reader's only source (key, case 37, **Skill**). This is the loss that `preserve.md` failure 1 reports.

## Failed cases

- Case 37 fails against the orientation. In `:91`, the tuple-arm exception ("under walk") sits beside the both-paths refusal and lacks row 1064's compiled half, so the reader gave 'Int is undefined.' as the compiled message. The compiled path actually gives no such message in (a) and refuses the arm as unreachable in (c) (`preserve.md` failure 1).
