<!-- The clarity workflow's check of FACTS chunk f0 (F-151, F-263, F-264): each rewritten entry against the record's text and its sources, the cold reader's answers against the source meaning, and each failure classed with a proposed fix. -->

# FACTS chunk f0: the check

The writer's base is `main` at `df0728b81`. I read at `30ee7ae4b`; `git diff --stat df0728b81 HEAD` over `Library/`, `ProjectFortress/`, the gap ledger and `compile-ladder/gate/` is empty, so every line cited below holds at both. I read the record's entries with `facts-extract.sh 'F-N+'` and `'history:F-N'`, then the sections, rows and code that each sentence cites. I ran nothing but reads.

| Entry | Fidelity | Comprehension | Failures |
|---|---|---|---|
| F-151 | one claim misattributed, settled | four passages unresolved | uncertain fidelity 1 (settled), wording 3, concept 1 |
| F-263 | one claim broader than its source, settled | four passages unresolved | uncertain fidelity 1 (settled), wording 3, concept 1 (listed) |
| F-264 | one claim misstated, settled; one broader than its measurement | three passages unresolved | uncertain fidelity 2 (settled), wording 2, concept 1 (listed) |

## F-151

### Fidelity

**1. Which declarations need `Number`'s exclusion (uncertain fidelity, settled against the entry).** Quoted: "`Number` stays because its `comprises` clause is closed, so an element type excludes `String` and the arrays. Only that exclusion makes the scalar extension's mirror pairs, an array and a scalar in either order, a valid overloading (F-119)." The record's text: "`Number` stays, since the scalar block's mirror pairs (F-119) overload validly only through its closure."

The bound that F-151 states is the family's bound. The scalar extension has bounds of its own: `opr +[\T extends { Number, AdditiveGroup[\T\] }, I\](x: Array[\T,I\], y: T)` and the same with `StandardMin` and `StandardMax` (`Library/FortressLibrary.fsi:2702-2712`; F-119). The measurement that tells which declarations need which exclusion is `reviews/array-design-ways.md:271-277`, which the judgement's section 2.9, way 3, summarizes:
- With the ring alone on the family, and the scalar extension keeping `Number` (variant RINGVM), the checker reported four new overloading errors: "the api's scalar juxtapositions of `Vector` and `Matrix` ... against the library's juxtapositions with a `String`, `(Any, String)` and `(String, Any)`. With `T extends Number` the element type excluded `String`, because `Number` is closed". It also reported a fifth new error, "the norm's `asFloat` on a `T`, which `Number` declares and the ring does not". Today these juxtapositions are `FortressLibrary.fsi:1675-1682` and `:1797-1804`, and the `String` ones are `:2532-2534`.
- Only with the ring on the scalar extension too (variant RING) did walk refuse that extension's `MAX` at load, "the same loss of `Number`'s exclusions".

So the exclusion of `String` that the family's `Number` gives keeps the family's own scalar juxtapositions valid beside the `String` juxtapositions. The scalar extension's mirror pairs rest on the `Number` in their own bounds. The record's sentence already joined the two. The rewrite makes the join explicit, since it ties the `String` exclusion to F-119's pairs. The cold reader drew the conclusion that the evidence does not support: "A worker must not remove `Number` from the bound, or the mirror pairs stop being valid overloads." The reader could also not see why `String` matters to those pairs.

Proposed wording, in place of the two sentences:

> `Number` stays in the bound because its `comprises` clause is closed, so an element type excludes `String`. So the family's scalar juxtapositions, a vector or a matrix beside a `T` in either order, overload validly beside the library's juxtapositions with a `String`. With the ring alone, the checker refused those four pairs. `Number` also declares the `asFloat` that the norm calls. The scalar extension keeps `Number` in its own bounds for the same exclusion (F-119).

The `asFloat` sentence is optional: the sources hold it (the judgement, "In short", "`Number` stays, so its exclusions, its `asFloat` ... stay"), but the record's entry does not. With this fix, the Detail line should add the judgement's section 2.9, way 3 (the ring alone, measured). The `proposals.md` line "Meaning: unchanged" and the apply note's "meaning unchanged" then become one correction, which says which declarations need `Number`'s exclusion, with `reviews/array-design-ways.md:271-277` as its source.

**2. The rest holds.**
- The title: `FortressLibrary.fsi:1616`, `:1736`, and the factories and operators at `:1649-1690`.
- "`Number` declares no arithmetic": `:286-294`.
- "`Vector[\Number,n\]` is not well formed": F-229.
- "The checker accepts a call whose argument carries the caller's type parameter under the same bound": row 686's own words, FIXED by `f237148ac`. F-227 gives its cause.
- "built at the default ..., and waits for his review": PLAN item 13, fork 2, "built at the judgement's default ...; his answer on the bound itself is pending"; review-queue item 31, "It waits for his review", and "The other way: a rule per operation instead of one on the whole type".
- Dropping P-85 is right. Its three questions do not include the bound.

### Comprehension

The cold reader's account matches the source on the bound's two halves, on the plain array at `Number`, on the norm's call, and on the bound being provisional with another way open. It differs, or stops, at these points:

- **The mirror pairs.** The reader's consequence is the misattribution of Fidelity 1. Fix: the wording there.
- **No library named** ("The entry does not say whether this is the interpreter's library, the compiler's prelude, or both"). Wording: begin the title "In the interpreter's library, `Vector`, `Matrix` ...". The bound is in `Library/FortressLibrary.fsi` and `.fss` only.
- **"built at the default of the array design's question on it"**: the reader could not resolve it. The phrase also collides with P-85, "The array design's three questions are open, with no default", whose questions are other ones. Also, "not by a ruling of the curator" is true of the bound, but a reader may conclude that he had no part in it, when it landed at his word (PLAN item 11, "climb batch 13b, outside a batch at his word"; review-queue item 31, "at his 'land it now' it landed"). Wording:

  > The bound is the default that the judgement below recommended, landed at the curator's word to land it; his answer on the bound itself is pending (PLAN item 13, fork 2; review-queue item 31, which also gives the other way, a bound for each operation).
- **"is not well formed ... give a plain array"**: the reader could not tell whether this is the checker's or a run-time result. Wording:

  > `Vector[\Number,n\]` is ill formed under the bound, so `array1` and `array2` have no arm for `Number`: called there, they give a plain array at run time, not a vector or a matrix (F-229, which names the eight number types that get one).

  Source: F-229, whose `typecase` arms are the eight number types, gated by the walk tests `ArrayFactoryNumberTypes` and `ArrayFactoryAbstractNumber`.
- **"its `comprises` clause is closed"**: a concept the reader lacked. The skill's core says what `comprises` means, but not that this makes a trait closed. `concepts.md` says that the entry defines it, but the entry uses the word without defining it. The concept is not this entry's alone: F-227 and row 686 use "closed trait" too. Define it in the `fortress-repo` core, "Traits and objects, no classes", beside `comprises`: a trait whose `comprises` clause lists every type below it is closed (the judgement's section 0).
- **"the scalar extension"**: the reader inferred it from the gloss. It is F-119's term too, so if the term stays after Fidelity 1, define it for every worker in `references/library.md`: the eight operators `+`, `-`, `MIN` and `MAX` between an array and a scalar, in both orders.
- **PLAN and the review queue**: a concept the reader lacked. It is listed in `concepts.md`, for the short orientation.
- **Which element types meet the bound**: the reader found this missing. An optional sentence: "The eight number types meet it; the numeral type `IntLiteral` does not, since it is a `Number` but no ring." Its source is the judgement, "In short", "What it leaves", and section 2.9, way 4: "it admits every number type but the numeral type". It adds a claim that the record's entry does not hold, so the fix round decides.
- "carries the caller's type parameter": the reader's reading ("has a type built from") is right. No change is needed.

## F-263

### Fidelity

**1. The compiled path's negative power (uncertain fidelity, settled against the entry).** Quoted: "The compiled path's own library does not follow these rules: at a negative exponent its power gives 0, or a raw Java exception at a base of 0 (row 441)." Row 441 says: "on `ZZ32` `2^(-1)` is ... `0` compiled, and `0^(-1)` is ... a raw `java.lang.RuntimeException` compiled", and "`jIntExp` casts `Math.pow` to `int` (row 523): a quiet 0 but for bases 0, ±1". The compiled prelude takes a signed exponent only in `ZZ32`'s power (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`). `NN32`'s and `NN64`'s powers take unsigned exponents (`:326`, `:385`). The sentence drops "but for bases ±1" and the type, so it lets a reader conclude that `1^(-1)` is 0 when compiled, and the cold reader asked exactly that. P-153 has the same wording, and the record's entry had it before the rewrite. Proposed wording:

> The compiled path's own library does not follow these rules: at a negative exponent its `ZZ32` power gives 0 at every base but 0, 1 and -1, and a raw Java `RuntimeException` at a base of 0 (row 441).

**2. The rest holds.**
- The title is now scoped to declarations in the interpreter's library and to walk's rules. Rung I's report, section 1, lists every integer `^` declared at its base's type, `IntLiteral`'s included (`FortressBuiltin.fsi:213-214`). The natives are in walk.
- The five types, the exponent types and the exponent beyond 64 bits: `tests/IntegerPowerContractWalk.fss`, `negativeZZ32` to `negativeZZ` and `exponentTypes`.
- "Under walk a numeral is a `ZZ32` value (F-74), so `2^(-1)` raises `IntegerOverflow`": F-74; `FortressBuiltin.fsi:125`, `value object Int extends ZZ32`; the test's `ZZ32` `two^(-1)`. Under contract E, the three team tests that write `10^(-k)` failed (the probe's "In short", the contract table, row E), and rung I respelled them with a float base. This sentence is a consequence that the record's entry did not state. The sources hold it, so it passes, but `proposals.md`'s "two corrections of scope, and nothing else" should list it as an added consequence.
- "The compiled checker accepts the library's own uses of these powers": this is now a present claim, not the rung's measurement. It holds at the last landed gate. `compile-ladder/gate/distance-sites.tsv` has no power site, and its export error names no `^` entry.
- `QQ`'s exponent: `fsi:431`, `tests/QQPowerExponent.fss`.
- The fractions: the test's `fractions`.
- microGPT's one power: the probe's "In short", "Uses", and section 1.6.
- Rows 441 and 523, as P-153 assigns them.
- Dropping "Walk's values moved only at a negative exponent" and "(contract E)" is right. Moving the six sites, `fail[\ZZ32\]`, 44 to 43 and the respelled tests and demos to the note line moves no current property.

### Comprehension

The cold reader's account matches the source on the declared types, walk's rules at the five types, the numeral as `ZZ32`, `QQ`, the fractions, microGPT, and the compiled path's gap with its expected failure. It differs, or stops, at these points:

- **Does the compiled path give `1^(-1)` 0?** This is Fidelity 1. Fix: the wording there.
- **"the value named `IntLiteral`"**: the reader could not tell what value this is, nor whether its `ZZ32` answer is a defect. So the reader read it as "an exception to the title". In fact the title speaks of declared types, and `IntLiteral`'s power is declared `IntLiteral`. Row 578: "The name `IntLiteral` is the value `FIntLiteral.ZERO`", "No numeral reaches it while walk's numeral is an `Int`", classed "implementation gap (walk)". The test's `numeralType` asserts `lit^3 = 0` and `lit^(-1)` raising `DivisionByZero`. Wording:

  > Under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches; its power follows the same rules but answers a `ZZ32`, as all its arithmetic does, against its declared `IntLiteral`, a gap of walk (row 578).
- **"one beyond 64 bits included"**: the reader could not tell whether this means a type or a value. It is a value: the test's `huge = (big(2))^70`, and rung I's report, section 1, "an exponent beyond 64 bits becomes the long of its sign and parity nearest it". Wording: "with an exponent of any integer type, including a `ZZ` exponent too large for 64 bits, such as 2^70".
- **"that power's overflow (row 523)"**: the reader could not tell what goes wrong. Wording, from row 523 and P-153: "and that power's overflow, which throws a raw Java exception that no Fortress `catch` sees, or saturates silently (row 523)".
- **"the distance stage"**: a concept the reader lacked. It is listed in `concepts.md` for `references/compiler.md`, which is the right place.
- `QQ` at a base of 0 and a negative exponent: the reader marked it as a gap. The entry claims nothing about it, and nothing needs adding.

## F-264

### Fidelity

**1. What the subscripts' cast types (uncertain fidelity, settled against the entry).** Quoted, the title: "... and `Array2`'s column and row subscripts get their declared type through the function `cast`"; the body: "the subscripts are `a[:, j]` and `a[i, :]`". The subscripts are declared `Array[\T,ZZ32\]` (`Library/FortressLibrary.fss:2707`, `:2711`), and they do not reach that type through `cast`. The cast is on the value that they pass to `Col` or `Row`: `Col(cast[\Array2[\T,0,s0,0,1\]\](self[(b0,i1)#(s0,1)]))`. Its range subscript answers the unsized `Array[\T,(ZZ32,ZZ32)\]`, and `Col`'s and `Row`'s field takes a sized `Array2` (`object Col[\T, nat b0, nat s0\](mem: Array2[\T,b0,s0,0,1\])`, `:2821`, `:2832`). Rung A's report, section 1, item 3d, says the same, and so did the record's text: "`Col`'s and `Row`'s subscript value". The cold reader could not say which type the subscripts are cast to. Proposed wording, for the title:

> In the interpreter's library, nine `Vector` and `Matrix` operators and three factory arms get their declared type through the function `cast`, and so does the sub-array that `Array2`'s column and row subscripts pass to `Col` and `Row`.

And in the body: "the subscripts are `a[:, j]` and `a[i, :]`, whose range subscript answers an unsized `Array`, cast to the sized `Array2` that `Col`'s or `Row`'s field takes."

**2. The walk claim at landing (uncertain fidelity, minor, settled).** Quoted: "When the casts landed, no value of the tree's tests and demos moved under walk, microGPT's quick pair included." The measurement under it is narrower:
- 42 walk test files, the ones whose text holds `Vector`, `Matrix` or `DOT`, with `subArray`, `Array2SubscriptInBounds`, the guard and the new `XXX`, were compared value by value. That is rung A's report, section 5.
- `ant testSystem` checked every walk test by verdict, 666 of 666.
- Four demos were run: `conjGrad`, `lutx`, `mm` and `BiCGSTAB2` (`SKEPTIC.md` section 2, its table).
- microGPT's quick pair passed.

The record's text says the same as the rewrite, and the skeptic's own verdict is "true of the 42 tests and of the tree's demos" (`SKEPTIC.md` section 4). So the wording has the skeptic's support, but it lets a reader conclude that every walk test's values were compared. Proposed wording:

> When the casts landed, no walk value moved in the 42 test files that use the array family, compared value by value, or in four array demos; every walk test passed, and so did microGPT's quick pair.

**3. The rest holds.**
- `cast`: `fss:33-37`.
- The nine operators and their `map` and `ivmap`: `fss:2535-2542`, `:2856-2861`, and the api's `map` and `ivmap` typed `Array1`.
- "and so through `replica`": `SKEPTIC.md` finding 3, and the library's comment, `fss:2461-2463`.
- The three arms: `fss:2562`, `:2573`, `:2963-2964`; each casts to its factory's declared result.
- The redeclared `fill` and `tabulate`: `fsi:1625-1626`, `:1747-1748`.
- The checker's acceptance holds at the last gate: `distance-sites.tsv` has no array site.
- The casts at the eight types: the guard.
- The `CastError` case: `SKEPTIC.md` finding 3.
- Moving the counts, the dead sizes, `immutableArray`'s ranks and `array3(v)` out changes no current property.

### Comprehension

The cold reader's account matches the source on `cast`, the nine operators, `replica`, the `CastError` case and the guard. The reader's advice to build a new operator with `fill` or `tabulate` is the reader's own inference, and the entry does not give it. That is harmless, and no change is needed. The reader differs, or stops, at these points:

- **The subscripts' type**: this is Fidelity 1. Fix: the wording there. The reader asked the same of the factory arms. Name it there too, as below.
- **"the base-0 arms"**: the reader lacked "arm" and "base 0". "Base" is also the skill's word for the commit a worker starts from. Wording: "the arms of `__builtinFactory1`, `__immutableFactory1` and `__builtinFactory2` for an array whose lowest index is 0, each cast to its factory's declared result type".
- **"The operators that build with `fill` or `tabulate` need no cast"** (wording; the reader did not stop here, but a worker who looks for these operators finds none). The five bodies are the factories `vector(v)`, `tabulatedVector` and `matrix(v)` and `Matrix`'s methods `rmul` and `lmul` (`fss:2605-2608`, `:2921-2927`, `:2994-2995`; rung A's report, section 1, item 1a). Wording: "The five bodies that build with `fill` or `tabulate`, the factories `vector(v)`, `tabulatedVector` and `matrix(v)` and `Matrix`'s `rmul` and `lmul`, need no cast, since `Vector` and `Matrix` redeclare those two at their own type (F-158)."
- **"the distance stage"**: a concept the reader lacked, listed in `concepts.md`.
- `ivmap` and `pmul`: the reader guessed both rightly (`ivmap` maps over index and value; `pmul` is the elementwise product), and the entry does not depend on them. No change is needed.

### For the coordinator, beside the writer's list

- F-158 says "`Vector` and `Matrix` also redeclare them at their own type, with the meet's bodies (F-264)". The rewritten F-264 no longer says "with the meet's bodies", and it points back to F-158. Repoint F-158's reference to `compile-ladder/rung-array-sites/REPORT.md` section 1, item 1a.
