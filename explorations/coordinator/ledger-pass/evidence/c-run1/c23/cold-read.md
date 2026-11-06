# Cold read: c23 (rows 542, 566, 573, 871, 787)

Read with only `CLAUDE.md`, the `fortress-repo` SKILL.md and its references (not revival-changes.md, sources.md). Terms found there: the seven status words (`records.md`, though their definitions live in the row template, which a worker reads in the ledger, not the skill), `XXX` tests and the `NameLink.test` / `XXXName.test` pair for a run-time defect (`tests-writing.md`), the history file (`records.md`), walk's `where`-clause reading over the whole tuple (`interpreter.md`, citing row 787), the checker's `where` constraints (`compiler.md`).

Terms common to several rows that I read one way, without a definition in the skill:
- `NEGATIVE-VERIFIED`: taken as "the defect is reproduced and still open". The skill lists the word but defines it only by pointing to the row template.
- `siblings: N, M`: taken as "related rows to read too"; the skill does not say whether a sibling shares a cause, a fix, or only a topic.
- `full text: history, row N`: taken as "the row's longer earlier text is in `explorations/fortress-gap-ledger-history.md`" (`records.md`). Clear once looked up.
- `Found by: climb batch X rung Y's skeptic`: provenance only; the skill does not define batch, rung or skeptic. Does not block the row.

## Row 542

- **Defect:** the compiled checker refuses a valid overload pair: a generic `ident[\T\](x: T): T` beside a plain `ident(x: Circle): Circle` where `Circle` is an object. Its Return Type Rule check keeps `T` quantified and also checks instances whose domain meet `Circle ∩ T` is `Bottom`, where the return types need not agree; the paper's rule only quantifies over instances whose meet is not `Bottom`. Since nothing is below an object but itself, the only such instance is `T = Circle`, where `Circle` fits. The same refusal holds with a generic `object Box[\U\]` in place of `Circle`.
- **Where:** compiled path, static checker (Scala), `satisfiesReturnTypeRule` in `scala_src/overloading/OverloadingOracle.scala:83` at c124c6b65; overloads of a generic and a plain declaration on an object type. Walk not mentioned.
- **Reproduce:** compile `ProjectFortress/compiler_tests/XXXOverloadReturnObjectDomain.fss` with `bin/fortress compile`; it is refused with 'the return type of Circle->Circle ...'.
- **Status:** open, a fix to build in the checker: restrict the rule to instances whose domain meet is not `Bottom`, per `Papers/Types/overloading-check.tick:180`. No question pending.
- **Could not resolve:**
  - "siblings: 853": row 853 not in the file; its relation unknown (wording).
  - Whether walk accepts the pair: the row says nothing about walk, and the skill asks a row to name the paths that show a defect (wording / omission).
  - The refusal text is truncated ('...'), so a worker cannot match the full message without running it (wording; minor).

## Row 566

- **Defect:** compiled dispatch among functional methods (`tag(self)`) declared in generic traits casts the argument to the wrong instantiation and dies with `ClassCastException` (`...$Vo cannot be cast to ...$\=V?fortress|CompilerBuiltin\%ZZ32?`, i.e. the specialised class `V[\ZZ32\]`). The checker accepts the program and it links; walk runs it and prints 'tag(s) = 3' and 'PASS'.
- **Where:** compiled path, code generator (dispatch method for an overloaded functional method over trait instantiations, `object Vo extends V[\ZZ32\]`). Not traced to a file.
- **Reproduce:** run `ComprisesMeetGenericTraitLink.test` then `ProjectFortress/compiler_tests/XXXComprisesMeetGenericTrait.test` in one `junit.sh` call (the link/run pair of `tests-writing.md`); the run throws the `ClassCastException`. Under walk the same program prints PASS.
- **Status:** open, a fix to build in the code generator; cause not traced, so a worker starts by tracing the dispatch method's cast.
- **Could not resolve:**
  - "Row 546's family as functional methods": the program's shape is defined only by reference to row 546, which is not in the file. A worker does not know what the family is (which traits, what comprises/meet structure) without printing row 546 (wording; row does not stand alone).
  - "siblings: 546, 571": relation unknown, as above.
  - The trait `V` and the other traits of the family are not shown; only `Vo extends V[\ZZ32\]` (wording).
  - The test name says "ComprisesMeet", and the specification cites the "Meet Rule", but the row never says what the meet or `comprises` clause is in the program (wording).

## Row 573

- **Defect:** in compiled code, a call of a functional method whose `self` parameter comes last, overloaded inside an object by the object's own declarations beside one it inherits, is dispatched so that an argument is cast to the wrong parameter type and the run dies with `ClassCastException` (`SkNarrowLastOld$C cannot be cast to SkNarrowLastOld$N1`). The program links. Walk chooses correctly.
- **Where:** compiled path, code generator (dispatch of functional methods with self last, own plus inherited overloads). Not traced.
- **Reproduce:** run the link test `FunctionalMethodOverloadSelfLastLink.test` then `ProjectFortress/compiler_tests/XXXFunctionalMethodOverloadSelfLast.test`; the skeptic's program `SkNarrowLastOld` prints `REACHED`, `C1`, then the exception on a call that only `C0` applies to; walk prints `C1`, `C0`.
- **Status:** open, a fix to build in the code generator; cause not traced.
- **Could not resolve:**
  - `C0`, `C1`, `C`, `N1`: the declarations and types of the program are not shown. `C0`/`C1` read as the labels each overload prints, and `C`/`N1` as types, but the row does not say which declarations are the object's own and which is inherited, or what types the parameters have (wording; the row depends on the program).
  - The notes describe the skeptic's program `SkNarrowLastOld` and cite `explorations/compile-ladder/rung-overloading-checker/SKEPTIC.md` section 5, a report a worker would have to read; it is not said whether the reproducer `.test` runs that same program and prints the same lines (wording).
  - "self last" is clear (self is the last parameter), but whether the defect needs self last, or whether self first also fails, is not said (wording).
  - No siblings named, though rows 566 and 546 look related (minor).

## Row 871

- **Defect:** the compiled checker's overloading check ignores a `where` constraint on a function's own static parameter as a bound. With `pick[\U\](u: U): String where { U extends Named }` beside `pick(z: ZZ32): String`, it accepts the pair; with `U extends Named` written in the header it refuses the pair as 'Invalid overloading of pick'. By P-151 the two forms mean the same, so the checker should give both the same answer. Conversely, `h[\U\](u: U) where { U extends A }` beside the same with `B`, `A excludes { B }`, is refused as two declarations with the same parameter type `U` (walk refuses it too), while with the bounds in the header the checker accepts it.
- **Where:** compiled path, static checker, overloading check of generic functions with `where` clauses. No file named. Walk mentioned only for comparison.
- **Reproduce:** none committed ("No test holds the first pair yet"). A worker writes the two `pick` programs and the two `h` programs and runs `bin/fortress compile` on each; the `where` pick pair compiles and runs ('named cat', 'int'), the header pick pair is refused.
- **Status:** open, a fix to build in the checker, test first; the worker writes the missing test.
- **Could not resolve:**
  - "P-151": a POSITIONS entry, not in the skill. The row says what it holds ("a `where` condition on a function's own static parameters bounds them"), so this is resolvable but leans on the record.
  - The claim's "which it refuses" reads two ways: that the checker refuses `pick(z: ZZ32)`, or that it refuses the header pair. Only the notes settle it as the header pair (unclear wording).
  - Which answer is correct for the pick pair, accept or refuse, is not said: walk accepts and runs the `where` pair, the checker refuses the header pair. The row says the checker is wrong to differ, but does not say which of its two answers the fix should keep. Whether `Named` and `ZZ32` exclude is the language question behind it; `Named` is not defined (language concept and wording).
  - For the `h` pair, which direction is the defect: the `where` form refused (as walk refuses it), or the header form accepted? "(then row 537)" reads as "and then it hits row 537's defect" but could mean "see row 537" (unclear wording).
  - "Row 677, fixed, is the same reading in a body": "in a body" is unclear; perhaps a `where` constraint read in a function body or a call (wording).
  - "each pair is its header twin": reads as "each `where` pair should be checked as its header-bound version" (clear after a second read).
  - Specification cell names `advanced/overloading.tex` without the `Specification/` prefix (minor).

## Row 787

- **Defect:** walk refuses at load, as failing the Meet Rule, a pair of generic declarations whose parameter types exclude each other only when read over the whole parameter tuple, whenever one of them has a `where` clause: `o[\T\](x: P[\T\], b: Box[\T\]): String where { T extends Object }` beside `o[\T\](x: Q[\T\], b: Box[\T\])`. The compiled checker accepts it. Without the `where` clause walk loads it (row 740, fixed). The cause: `domainsExcludeTogether` returns false when either declaration has a `where` clause, as `genericMeetCovered` does, so the pair falls through to the Meet Rule refusal. Matches `interpreter.md`'s note on row 787.
- **Where:** walk, its overload check at load: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1013` (`domainsExcludeTogether`) and `:1238` (`genericMeetCovered`), at c124c6b65.
- **Reproduce:** `bin/fortress ProjectFortress/tests/XXXGenericPairWhereExcludesTogetherWalk.fss` (walk) is refused at load with 'fails the Meet Rule'; the passing control is `GenericPairExcludesTogetherWalk`.
- **Status:** open, a fix to build in walk: let the exclusion test read the `where` clause rather than give up. Workaround for programs: drop a `where` clause whose bound is `Object`.
- **Could not resolve:**
  - "exclude only together": read as "no single parameter position excludes, but the tuple as a whole does". `P`, `Q` and `Box` are not defined, so a worker cannot see why the pair excludes over the tuple (for instance whether `P` and `Q` exclude, or whether it is the shared `T`). Language concept partly in `interpreter.md`; the example lacks its declarations (wording).
  - Whether the fix should read the clause's bound or only skip clauses that bound by `Object`: the workaround suggests the latter is the common case, but the row does not say what a general fix looks like (wording; minor).
  - "siblings: 871": relation clear enough (both are `where` clauses read as bounds in overloading, one per path).
  - Specification cell names `advanced/overloading.tex` without the `Specification/` prefix (minor).
