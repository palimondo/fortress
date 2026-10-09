# Rung G (`rung-generator-size`): record lines for the gather

Climb batch 13, rung G, on `wip/rung-generator-size` (tests `24a924bc6`, edit `af2127f5d`). `<G>` stands for the rung's landed commit.

## FACTS.md

Under "The checker and the one library", a new entry after "The one library's generator, condition, reduction and generator-of-generators slips ...":

- **A generator's size is a counted default on `Generator`; the relational predicate reads neither a size nor an index; `Indexed`'s default index-value pairs are an object over the indexed value** (`compile-ladder/rung-generator-size/REPORT.md`; row 629; item 45 at its default, ways 1, 3 and 6). `Generator` declares `opr |self| : ZZ32` after `opr IN`, a default that counts by `mapReduce` over `generate` (`Library/FortressLibrary.fsi:829-833`, `.fss:1239-1242`); a type with its own `|self|` keeps it, by dispatch. `RelationalPredicateCondition.cond` is one `generate` with a `MapReduceReduction` over `(Boolean, Maybe[\E\], Maybe[\E\])` (`.fss:4670-4687`). `Indexed`'s default `indexValuePairs` is `SimpleIndexValuePairs[\E,I\](self)` (`.fss:1851-1852`, `:3624-3637`), whose range subscript maps the narrowed bounds and keeps each pair's index. Under walk, `|g|` answers on a filter, a nest, a mapped filter, a naive `seq` or a cross of unsized generators and a `DelegatedIndexed` type that defines only its indices; `cond` answers on an unsized target and on an array indexed from a nonzero bound; a default pairs value prints as its elements, not `mapped(...)`. The nine sites of row 629 are gone. Gated by `tests/GeneratorSize.fss`, `tests/RelationalPredicateTargets.fss` and `tests/IndexValuePairsDefault.fss`.

In the entry "The one library's generator, condition, reduction and generator-of-generators slips ...", the title's words "a `Generator`'s size and index," and the words "`|g|`, `g.size` and `g[i]` on a `Generator` (629)," are removed: row 629 is repaired (the entry above).

## Ledger

- **Row 629**, appended to its notes, then closed by `<G>` and `GeneratorSize`: "Fixed in climb batch 13, rung G, under item 45's default (ways 1, 3 and 6): `Generator`'s counted `opr |self|`, `cond` as one reduction carrying each part's ends, and `SimpleIndexValuePairs` for the default pairs; the nine sites are gone (`compile-ladder/rung-generator-size/REPORT.md` section 3). Walk now answers where it stopped: `|g|` on a filter, a nest, a mapped filter, a naive `seq` or a cross of unsized generators; `cond` on an unsized target and on an array indexed from 5; a default pairs value prints as its elements, not `mapped(...)`."
- **Row 488**, appended to its notes: "Climb batch 13 rung G's distance run, on `af2127f5d`, lost the site of `BIG LEXICO`'s body (`Library/FortressLibrary.fss:130`) with no edit of that declaration, as batch 12 rung R's run did."
- **New row NEW-G-1**, in the section "11. Parallelism, exceptions and control flow":

| NEW-G-1 | under walk, an `if` whose clause is an object that is not `Boolean` runs its `else` branch unless the object's type is named `Just`: with `object O end`, `if O then ... else ... end` takes the else branch, as does `if c then` for a relational predicate's condition that holds | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/if.tex`, "If Expressions" | none | climb batch 13 rung G | Walk's `forIf` tests `instanceof FBool`, else treats an object whose type is named `Just` as true and any other object as false, with no error (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:582-609` at a1a75716a); a non-object value stops with "If clause did not return boolean". The compiled checker refuses the program: "Filter expressions in generator clauses must have type Boolean, but O had type O." Workaround: bind the condition, `if _ <- c then`, or test `c.holds`. Home 2 owed: an `XXX` walk test with a `.test` naming the refusal; the rung's brief named three tests. |

## Handover state line

Climb batch 13, rung G (a generator's size and index; row 629, item 45 at ways 1, 3 and 6) on `wip/rung-generator-size`: `Generator` gains a counted `opr |self|`, the relational predicate's `cond` is one reduction carrying each part's ends, and `Indexed`'s default pairs are `SimpleIndexValuePairs`; on the rung's tree the nine sites are gone, the distance 153 to 143 (one more, `BIG LEXICO`'s, row 488's variation) and the count 1; the interpreter suite ran 557 green; new row NEW-G-1, walk's `if` on a non-`Boolean` object.

## The skill's part on what the revival changed

In `.claude/skills/fortress-repo/references/revival-changes.md`, under "Loops and reductions are library code", after "The lifted type of a reduction without an identity":

**A generator's size, the relational predicate and the default index-value pairs**

- Original: the interpreter's library declared no size on `Generator`, though three of its bodies read one, and the relational predicate read a size and indices from 0 off its target, a `Generator`. Under walk, `|g|` of a filter, a nest or a mapped filter stopped, and so did the relational predicate on a filter; on an array whose indices start above 0 it read outside the bounds. `Indexed`'s default `indexValuePairs` answered a mapped generator, printed `mapped(...)`, where an `Indexed` is declared. The checker refused the nine sites.
- Resolution: `Generator` has `opr |self|`, a default that counts the elements by running the generator, as `opr IN` searches them. A type with its own size keeps it. The relational predicate is one reduction in the natural order, as `Generator2`'s fused relational reduction is. The default pairs are an object over the indexed value, `SimpleIndexValuePairs`, which prints as its elements; a slice of it keeps each pair's index. This is the default of item 45 in `explorations/coordinator/CLIMB-BATCH-13.md`, which the curator has not answered.
- Reason: the checker's refusals. A default keeps "only needs to define the generate method" true (`Specification/advanced/parallelism-locality/defining-generators.tex`). Counting consumes a consumable generator and never ends on an endless one, as every other derived default of `Generator` does.
