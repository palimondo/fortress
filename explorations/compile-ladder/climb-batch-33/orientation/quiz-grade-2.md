# Quiz grading, round 2 (cases 35, 36, 37)

The answers: `quiz-answers-2.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 35 to 37 (read on `main` at `9f2799fb19`). The orientation graded: `orientation.md` in this folder, whose `:91` now carries row 1064's compiled half. Each case is graded on its decision and scope, against the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 3 (cases 35, 36 and 37).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

## Case 35: right

- (a), (b), (c): the reader gives each as a plain compiled test that passes as written, with no change to the program and no `XXX` form. This is the key's answer. The reader does not fall into the old orientation's traps: no `XXX` pair for (b) or (c), no `s: T = self` binding, no body moved into `Late`. In (b), the reader works out the value: `lt(Late(2), Late(1))` is false, so the body answers `other`, which is 2. Each `.test` file has `tests=Name`, `link`, `run` and `run_out_WIcontains=PASS`. That is the template key of `tests-writing.md` (`:62`, `:69`), so it is right, as in round 1.
- (d): as written, the checker accepts the program and the run dies with a `VerifyError` when the class loads (row 1070). The passing form is a plain test with `s: String => do r: T = self; r end`, which is row 1070's workaround at `T`, the key's form. The key accepts "the passing form, and row 1070 named for the form as written … with or without the pair", and the reader gives both. The reader also plans to run the form as written first. Then, depending on whether row 1070's reproducer already holds a case at the self-type parameter, the reader either adds nothing or adds the `XXX` run-time pair. That pair is complete:
  - `XXXName.fss` prints `REACHED` before the call;
  - a link file `NameLink.test` holds `tests=XXXName` and `link`;
  - `XXXName.test` holds `run` with no `link`, and `run_out_contains=REACHED`;
  - the pair is shown as an expected failure, then red with the failing part removed.

  None of the key's **Partial** defects applies (no missing link file, no `link` in the `XXX` file, no `PASS` key).
- Scope: the switch-over changes none of the four. Row 1070 is the code generator's wall, not the prelude's, and the pair turns red only when the fix lands. Right. The question asks only about the compiled path, so the key's point about walk is not needed.
- Not graded (the key's "none needed for a right answer", or detail the key leaves ungraded):
  - The reader's one-JVM command lists only the four plain tests. It does not show the conditional pair run in one call with the link file first, as `tests-writing.md:110` asks.
  - The reader names `run_out_does_not_contain=REACHED` as the fallback. That is the skill's own alternative (`tests-writing.md:111`). The key notes that the direct run printed `REACHED` first, and leaves the choice to the harness runs.
  - In (c), the reader does not state the order of the members, so the getter-before-method rule from round 1's note does not come up.
- Passage relied on: orientation `:41` ("Traits and objects", the self-typed paragraph). It served the reader.

## Case 36: right

- (a): the reader says neither assertion runs. Walk refuses the program at load with 'Int is undefined.' and 'Float is undefined.'. Right, and it gives the names.
- (b): the reader's answer is the key's program, nearly word for word:
  - arms `ZZ32` and `RR64` with `else`, keeping the labels "Int" and "Float", which the key accepts;
  - `value object Meters(v: ZZ32) extends Number` with its own `+`;
  - `kind(Meters(2))` gives "other", and `(Meters(2) + Meters(3)).v` is 5;
  - the numerals take their defaults at `Number`.

  The reader also gets case 12's point right: an `+` declared in an object does not overlap the library's `+` between an array and a number.
- (c): the planned `extends ZZ32` is refused at load under walk, 'Attempt to extend object type ZZ32'. On the compiled path today, the checker accepts it (row 1003) and the object dies when its class loads (row 866). The reader's `Meters` below `Number` runs on both paths. Right on each path. The reader scopes the compiled failure "until rows 1003 and 866 close". The key says until the prelude takes P-178's form or until the switch-over, which is row 866's "Ends when". The two say the same.
- Passages relied on: orientation `:89` and `:91` ("Numbers"), and `:24` (the `+` in an object). They served the reader.

## Case 37: right

- (a): walk stops at load with 'x is undefined.', neither assertion runs, and the test is red. `Int` in the tuple arm draws no message (row 1064). The compiled path stops on the same 'x is undefined.'. This is the key's answer. The reader gives no 'Int is undefined.', which was round 1's miss.
- (b): the reader keeps `(ZZ32, String) => "number and text"` and `x: Any => "other"`, with `shape(("b", "a"))` giving "other" under walk and `3` taking its default `ZZ32`. Right. The reader offers no typed pattern as a form for both paths, unlike round 1.
- (c): under walk, the program loads, both assertions pass, and `shape(("b", "a"))` gives "number and text" with no message, because `Int` binds (row 1064). Compiled, with the `Any` selector, the checker refuses the arm: 'The typecase clause, Pattern at ..., is unreachable.' This is the key's answer on both paths. The reader also declines to keep that green walk test, because it would hide row 1064. That agrees with orientation `:7` and with the key's **Open** (row 1064 `CONTESTED`).
- Scope: the bare binder's refusal holds on both paths, and (c) differs by path. Both right. The reader says the compiled answers hold "today", and does not say the switch-over changes neither. The question does not ask about the switch-over, and the key's **Partial** list does not name it.
- Passage relied on: orientation `:91`. Its new sentences on row 1064's compiled half served the reader. Round 1's failure, which `preserve.md` failure 1 reported, is gone in this text.

## Failed cases

None.
