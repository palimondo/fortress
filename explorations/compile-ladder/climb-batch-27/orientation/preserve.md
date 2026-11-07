<!-- Preservation check, update mode, of climb batch 27's orientation update: `orientation.md` against the skill's current `references/revival-changes.md` (at `c3df95aad`) and `admission.md`, with each admitted entry's FACTS or POSITIONS text and the ledger rows that the new text cites. Nothing was run but reads and searches. -->

# Climb batch 27: preservation check

The diff against the current part is one rewrite (`:80`, now `:88`) and three additions (`:24`, `:55-61`, `:92`). Nothing else of the old part changed. Seven failures, most severe first.

## Failures

### 1. "A type's own `=` decides wherever the type declares one" is false under walk for `=/=` and three-argument `assert` (row 807)

- **Source.** Row 807: "under walk, the library's `=/=` and three-argument `assert` compare by identity two values whose own `=` no `FortressLibrary` trait declares ... `assert(P(1), P(1), msg)` fails". Its notes: the call reaches "a value's own body only through a `FortressLibrary` trait such as `Equality`; else `opr =(a:Any, b:Any) = a SEQV b` (`:96`)". The admission's guidance asked for the sentence ("Say that a type's own `=` decides wherever it declares one"), but P-168 and F-326 do not state it, and they cite no limit on it.
- **New.** `orientation.md:61`: "A type's own `=` decides wherever the type declares one, and a string's `=` compares text. Give the value object an `=`, or compare the parts. `tests-writing.md` gives how `assert` reaches a type's `=`." Row 807 is not cited, and `=/=` is not named.
- **Consequence.** A worker follows the remedy and gives the value object its own `=`. Then the worker writes `assert(v1, v2, msg)` or `v1 =/= v2` under walk. Without `extends Equality[\P\]`, both still go to `SEQV`. So a value object that holds a string built apart still fails, and that is the mistake edit 2 is meant to prevent. The link does not fix this. Its target, `tests-writing.md:32`, still says "Otherwise they compare by identity (ledger row 807)". The admission lists that sentence as false, and the writer's log names the mismatch. **Fix:** qualify the sentence. Under walk, `=/=` and `assert(x, y, msg)` reach the type's own `=` only if the type extends `Equality[\P\]` (row 807). Otherwise write `assert(x = y, msg)`.

### 2. Walk's `FloatLiteral` departure (F-326) is in neither the new text nor its destination, and the admission's reason for routing it is too narrow

- **Source.** F-326: "Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, not `SEQV` a computed `RR64`". The admission routes it as follows: "Only a direct use of `SEQV` meets it, so it is detail for `interpreter.md`".
- **New.** The new text does not have it. `references/interpreter.md` does not have it either: a search for `FloatLiteral` returns nothing.
- **Consequence.** Edit 2 itself sends two cases to `SEQV`: a value object without its own `=`, and a tuple of four or more elements. Both are compared element by element. So `(0.5, a, b, c) = (x, a, b, c)`, with `x` computed as 0.5, should answer `false` under walk. So should a value object without `=` whose `RR64` field was bound to a numeral. In both cases the bits are equal, against the new text's "a float by its bits". I worked this out by reading F-326 and edit 2. I did not run it: `StrictEquivalenceRuleWalk` measures only the direct `SEQV` (`rung-seqv-meaning/REPORT.md:31`). A worker who hits it hunts for a defect that is walk's departure.

### 3. "can call nothing on a `T`" says more than its source

- **Source.** F-324: "The one library's `Number` declares nothing". P-165: `asFloat(x)` is "unchanged at every concrete type". `Library/FortressLibrary.fsi:288`: `trait Number extends { AnyAdditiveGroup, AnyMultiplicativeRing }`. Both of those traits are empty (`:263`, `:275`), but they are still `Object`s. The admission's guidance did ask for "can call nothing on `T`".
- **New.** `orientation.md:92`: "So generic code over `T extends Number` can call nothing on a `T`, not even `asFloat`."
- **Consequence.** The fallback `=` over `Any` still applies to a `T`, and so do `Object`'s `asString` and `ilkName`. The next sentence of the same rule relies on the `=`. A worker could stop printing or comparing generic values for no reason. **Fix:** "nothing that a number type declares: no arithmetic, no `asFloat`".

### 4. Edit 3 dropped the old sentence's explicit consequence, "`Box[\Int\]` is not `Box[\ZZ32\]`"

- **Old.** `revival-changes.md:80`: "but a generic instantiates at the class: `Box[\Int\]` is not `Box[\ZZ32\]` (row 364)".
- **New.** `orientation.md:88`: "but a generic instantiates at the class. ... `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]` (row 364)". The inequality is now only implied. Row 364 states the consequence: "a `Cell[\Int\]` dispatches past `Cell[\ZZ32\]` to `Any` (F-74), and walk refuses `a: BoxT[\ZZ32\] = BoxT(z)`".
- **Consequence.** The text has just said that `Int` "stands for" `ZZ32`. A reader can then take a `Cell[\Int\]` to match a `Cell[\ZZ32\]` overload or binding. The admission asked to "keep the sentence's claim about the class". **Fix:** add "and is no `Cell[\ZZ32\]`".

### 5. The compiled half of row 923 is not kept

- **Source.** Row 923, which the new text cites, says in its notes: "Compiled: the prelude declares no tuple `=`." In the compiler's library (`Library/Compiler*.fss`, `LibraryBuiltin/CompilerBuiltin.fss`), a search finds no `opr =(a:Any, b:Any)`. Row 807 also says "compiled, `P(1) =/= P(1)` is refused, 'Could not check call to operator NE'".
- **New.** `orientation.md:55-61` states the fallback rule with no path qualification. Its only "Until the switch-over" sentence is about `===`.
- **Consequence.** Until the switch-over, a compiled test that compares 4-tuples, or value objects without `=`, may be refused statically and not answer `false`. Neither the admission nor F-326 states this path difference, so its weight is low. The remedy, comparing the parts, works on both paths.

### 6. P-167's other half, the loader's table, is not in its destination

- **Source.** The admission: "the loader's table goes to `interpreter.md`, 'Natives'". F-328 gives `NativeApp.java` and `OWN_OPERATIONS`, which maps `stringOps.typeName` and `equality.sEquiv` to walk's own operations.
- **New.** `references/interpreter.md` has none of `OWN_OPERATIONS`, `sEquiv`, `typeName` or `ilk`.
- **Consequence.** A worker in the natives area reads that walk loads every helper named by a `builtinPrimitive` string. That is false for these two names. The orientation is correct to leave this out. The area part has not received it yet.

### 7. F-324's detail is not in the sources mapping

- **Source.** The admission: "The pairs' count and the norm's eight declarations are detail for `sources.md`, not orientation text."
- **New.** In `sources-mapping.md`, the row for "`Number` declares nothing" names neither the 42 declarations of `=` (21 coercions) nor the norm at the eight types.
- **Consequence.** The consequence is small: `sources.md` is used only to maintain the skill. Someone maintaining it later cannot trace edit 1's "only where a coercion carries one into the other" to the 42 pairs.

## Checked and kept

- **P-165, F-324, F-131, F-311.** Edit 1 (`:92`) is kept. It is placed after the coercion rule. It names `asFloat` into `RR64` on the eight types and `IntLiteral`, which corrects the admission's "nine number types" against `changes.tex:2760-2763`. It says that `=` crosses types only through a coercion and otherwise falls to `SEQV` and answers `false`. It gives `1/2 = 0.5` and `ZZ64` against `RR64`, which agree with `changes.tex:2776-2782` and F-131's "a `ZZ64` goes into `RR64` only when written out". It gives `asFloat(x) = y` as the way to compare across types.
- **P-160.** The open `Number` is in edit 1. The Meet Rule sentence (`:24`) is kept: `excludes { Number }` or excluding arrays, walk's refusal at load, the checker's refusal within one component and its acceptance against the library's `+` (row 918), and `-`, `MIN` and `MAX` given as unmeasured (F-119). These agree with `rung-number-open/REPORT.md:104`.
- **P-168, F-326.** The three cases of `SEQV` are kept, on both paths. So are strings as reference objects, a string's own `=` comparing text, the 4-tuple case (row 923), the remedy, and the link to `tests-writing.md`. The one "Until the switch-over" sentence on `===` (row 908) is kept, as the admission asked. It names strings and the four number types, which `CompilerLibrary.fss:64-67` confirms. It leaves out booleans (`:68`, `a<->b`), and that does not change an answer.
- **F-328, P-167 (printing half), F-57.** Edit 3 is kept. Walk prints by the traits' names, also inside static arguments. Row 364's new example is used. The point that walk's own messages still say `Int` agrees with `rung-any-carrier/REPORT.md:187`, decision 3. The text leaves out tuples and arrows, as the admission's destination column allows.
- **P-166.** It is not used, which the admission allows ("may say"). Its destination, `specification.md`, does not have it. That revision went into the specification itself (`changes.tex`), so I do not count it as a failure.

## Count

The disposition table has 31 rows. I checked the 7 admitted rows (P-165, F-324, P-160, P-168, F-326, F-328, P-167) and the 4 rows folded into edits (F-57, F-131, F-311, P-166). In update mode, the 20 rows not admitted are the area parts' work, under "Elsewhere", and I did not check them. I also checked the one passage of the old part that the diff removes, `:80`. Failures: 7. Three need a change to the orientation text before it is installed: failure 1, and the wording of failures 3 and 4. Failures 2, 5 and 6 belong to `interpreter.md` and the compiled area, and failure 7 to `sources.md`.
