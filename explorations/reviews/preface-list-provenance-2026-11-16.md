<!-- An answer for the curator's page comment of 2026-11-16 on the preface's list of features not yet supported (`answers-2026-11-15.md`, Note 6, "The whole list of the preface, today"): for each of the 27 named items, whether the part that works today already worked in the team's tree, at the Working Draft's last commit (`2f8b4331a`, 2011-02-02) and at the team's last commit (`a874948ac`, 2012-08-31), or was built after `8fe1daa8f`, with the commits and files; and when the team wrote the list. Gathered by reading git and the files, with no build and no run. -->

# Who built what on the preface's list

## The answer

The curator is right. The list is not the state of February 2011, and most of what works today on it is the team's.

- The team wrote the list on 2009-11-09 and last changed its items on 2009-11-11. The commit of 2011-02-02 changed only the copyright header. The team never touched the list again, up to its last commit in 2012.
- Of the 27 named items, 16 work today, whole or in part, as Note 6 states them. The other 11 do not work at all, so they have no part to attribute.
- Of the 16: the team wrote the working part of 8. The team and the revival each wrote some of the working part of 7. The revival wrote the working part of 1 (where clauses and conditional extension).
- No item is unsettled as a whole. Two points inside items need a run of the team's tree: whether a compiled multifix chain ran, and whether walk's check of abstract methods stopped a program.
- So the sentence "how far the revival has come on the team's own to-do list" does not hold. Half of the working items were the team's alone, and for 6 of the 7 shared ones the team's part was in the tree at the draft's date.

How an item is sorted here: by who wrote the code or the library lines that carry the part that works today. "The team" means the tree at `a874948ac`. "The revival" means the commits after `8fe1daa8f` (2026-08-18). Nothing of `8fe1daa8f` itself is counted for anyone. All findings are by reading. No program ran.

## What the preface says the list is

The file is `Specification-1.0-frozen/fortress/preamble.tex`. It equals `Specification/fortress/preamble.tex` at `a874948ac`, byte for byte.

- The first paragraph speaks of the interpreter: version 1.0 was "released in tandem with a compliant interpreter (as of March 31, 2008)" (`:13-14`).
- The second paragraph speaks of the compiler: "we have been building a Fortress compiler with a static type checker and various static constraints checker" (`:35-37`).
- The list has one line of introduction: "The not-yet-supported features include:" (`:56`). It names no implementation and no date.
- The draft "includes descriptions of unimplemented features in boxes at the beginning of sections" (`:49-51`). Those boxes repeat the list's items, chapter by chapter.

The file's versions in the team's history, found by reading the file at each of the team's 5,397 commits (a `git log` of the path stops at a cut of the conversion, at `5a68404fdf`):

- `5da7257089`, 2009-10-20: the preamble, without the list.
- `61e28a78c4`, 2009-11-09, "[spec] Added a list of NYI features.": the list, with every item of today.
- `93f5018fd2`, 2009-11-11: three items reworded ("where clauses" gains "and conditional extension", "contract checking" gains its parenthesis, "some types" gains `Numeral`, ℤ, ℕ, ℚ), and one spelling.
- `2f8b4331a`, 2011-02-02, "Updated Copyright notices": the header only. This version stays to `a874948ac`: 971 commits hold it.

The revival changed two items of the list in `Specification/`, in `4978a9b16e` (2026-11-09): "static expressions" gained "beyond the folding of numerals and of string literals", and "some types" lost `Numeral`.

## The 16 items that work today, whole or in part

### The team wrote the working part (8)

**Multifix operators.** The compiled checker's case for a repeated operator tries the multifix declaration first, then the binary ones. It is the same six lines at `2f8b4331a` and at `a874948ac` (`scala_src/typechecker/impls/Operators.scala:376-381`). The revival's `054c4bcfd9` (2026-10-09) passes the expected type into that case and changes nothing else of it (F-221). Not settled by reading: whether the team's code generator ran such a chain. The team's only test that names multifix, `compiler_tests/XXX5aw.test`, checks error messages. A compile and run, at `a874948ac`, of a program with a ternary `opr OPLUS` would settle it. Walk makes binary calls in the team's tree and today (row 29).

**Identifiers including connecting punctuation.** The team's library binds names with an underscore at the draft's date: `o_n : ZZ32 = o - b0` (`Library/FortressLibrary.fss:2167` at `2f8b4331a`). No commit of the revival is on this. The limit on `W_1` (row 15) is the team's lexer too.

**ASCII conversion.** The part that Note 6 calls built, the conversion of names, is the team's. The appendix's draft note, "Only [the section on names] is supported", is in the frozen text (`Specification-1.0-frozen/appendices/ascii-to-unicode.tex:15`). One thing changed after Note 6 was written: `5c8055dee` (2026-11-16) makes `∑` and `∏` begin a reduction, and row 5 is closed. That is the revival's, and it is outside the conversion of names.

**Tests and properties.** The `test` command is in `Shell.java` at both dates (`:439` at `2f8b4331a`, `:473` at `a874948ac`), and calls `walkTests`. The team's library declares `test` functions at the draft's date (`Library/Avl.fss`, `Relation.fss`, `SetClosure.fss`, `String.fss`, `ChunkedSparseArray.fss`). No commit of the revival changed the command. The frozen chapter's own note speaks of "the limited form the interpreter supports" (row 120).

**Abstract function declarations.** In a trait, the team's tests declare abstract methods on both paths at the draft's date: 10 files of `compiler_tests/` and 5 of `tests/` and `Library/` hold an `abstract` method line at `2f8b4331a`. The revival added one case to the checker, a type's abstract functional methods (`c23b85fdc2`, 2026-10-16). At top level the declarations run on neither path, then and now.

**Contract checking.** Walk's `requires` and `ensures` are the team's: `tests/contracts1.fss` dates from 2008-02-09 (`f7feee2e7e`, "Requires"), and `interpreter/rewrite/DesugarerVisitor.java` holds `CallerViolation` at both dates. No commit of the revival is on walk's contracts. The code generator's refusal (row 701) is the state the team left.

**Some types.** `trait ZZ` and `trait QQ` are in walk's library at the draft's date (`Library/FortressLibrary.fss:822` and `:521` at `2f8b4331a`), and already on 2009-11-09 (`61e28a78c4`), two days before the list gained ℤ and ℚ. The compiler's library has no `ZZ` at `2f8b4331a` and has one at `a874948ac` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:102`), so that one is the team's work after the draft. The revival reshaped walk's number types into siblings (`d846e3644c`, 2026-09-27) and made `ZZ`'s and `QQ`'s values value objects (`598331c0d`, 2026-11-07). It added no type of this item.

**Components linking.** `fortress link` as it works today is the team's, and later than the draft. `linker/Linker.java` first appears on 2012-01-31 (`1d4e967aac`). At `2f8b4331a` the folder `linker/` does not exist, though `Shell.java:376` already has a `link` command. The revival's one commit on this is `4e4b80253` (2026-09-20), which lets a mutable variable cross an api (row 320, the fixed half). The revival has no commit on `Linker.java`.

### The team and the revival each wrote some of it (7)

**Widening coercion.** The compiled path's coercion is the team's, from before the list: `scala_src/typechecker/CoercionOracle.scala` dates from 2009-04-02 (`ab00f28ad2`), and `compiler_tests/Compiled9.CompiledCoercions.fss` from 2009-10-02 (`67e2222f56`, "Added lifting of coercion declarations and definitions"). The compiler's library declares 6 `coerce` at `2f8b4331a` (`ZZ32` into `ZZ64`, `RR32` into `RR64`, and from literals) and 15 at `a874948ac`. Walk's half is the revival's. Walk's library declares no `coerce` at `a874948ac` and 23 today, the first in `d846e3644c` (2026-09-27). The team's walk left it as a note: "TODO add checks for COERCE, right here" (`interpreter/evaluator/values/OverloadedFunction.java:792` at `a874948ac`). Walk converts since `b628871a26` (2026-09-26) and `0416821881` (2026-09-29). The `widens` declaration itself is in no library at any of the three commits (P-74 defers it).

**Type coverage check.** As Note 6 reads it. The compiled check is the team's: `scala_src/typechecker/AbstractMethodChecker.scala` dates from 2009-08-13 (`d2ed6ba762`), is 210 lines at the draft's date, and was reworked in 2012 (185 lines at `a874948ac`). The team's tests `compiler_tests/XXX6an.test` and `XXX6m.test` expect its message. Walk's `checkForDef` is in `Constructor.java` at both dates. The revival added the reading of coverage through a `comprises` clause on both paths (`59b1d0a4d2` and `f9fe5c8742`, 2026-10-14) and walk's refusal at load (`fdd377ead9`, 2026-10-09). Not settled by reading: whether the team's walk stopped a program by `checkForDef`. A run at `a874948ac` of an object that leaves an inherited abstract method without a body would settle it. The draft's only other use of the word is "the coverage check" of the Meet Rule (`Specification-1.0-frozen/appendices/future.tex:285`). On that reading the item is the revival's (P-60; `e2f1aa7e8b`, 2026-09-30, "accepts the Meet Rule's comprises example").

**Generic overloading check.** The compiled checker's check is the team's: `OverloadingChecker.scala` dates from 2009-03-07 (`9f196847ad`), and at the draft's date it reads static parameters in its exclusion and meet tests (`:351-402`). The team reworked it by 2012 to the model of its 2011 paper, which P-45 says the checker "already used". The revival added the Return Type Rule over every instance (`e2f1aa7e8b`, 2026-09-30), the Meet Rule for functional methods (`70d5486f99`), exclusion by existential reduction (P-152; `64fa505c4e`), and all of walk's load check of generic pairs (`8f7e183d49`, `6d187d0697`).

**Keyword and varargs parameters.** Walk's varargs are the team's, from the start: `tests/restTest.fss` is in the first commit (2007-01-04), and the library uses them at the draft's date (`assert(x:Any, y:Any, failMsg: Any...)`, `Library/FortressLibrary.fss:296`). The team's `tests/XXXvarargsObject.fss` records the constructor's limit (row 11). The compiled checker's typing of a varargs parameter is the revival's (`aa07efb310`, 2026-10-03; F-86). Keyword parameters: neither.

**Some modifiers.** The team's: the `atomic` block on both paths (9 files of `compiler_tests/` use it at `2f8b4331a`); walk's reading of `value` (`FTraitOrObject.java:98`) and of `override` (`Constructor.java:459`), both at the draft's date; the parser's acceptance of `io` and of `atomic` on a function. The revival's: `SEQV` on value objects on the compiled path (`598331c0d`, 2026-11-07; row 906), and walk's refusal of an `override` that overrides nothing (`fdd377ead9`, 2026-10-09). One correction to Note 4: no code reads the `atomic` modifier of a function. `Modifiers.isAtomic()` has no caller at `2f8b4331a`, at `a874948ac` or today. So "it runs under walk" means that walk accepts the modifier and ignores it, as the team's walk did.

**Non-type static parameters.** Walk's `nat` and `opr` parameters are the team's: `trait Rank[\ nat n \]` (`Library/FortressLibrary.fss:1592`) and `trait Monoid[\ T, opr OPLUS \]` (`:2821` at `2f8b4331a`), at both dates. The compiler's library also has `nat` parameters at the draft's date (`LibraryBuiltin/NativeArray.fss`, `NatReflect.fss`). The compiled checker's check of `nat` and `int` is the revival's (`3f297441c3`, 2026-09-26; P-55).

**Static expressions.** The fold of numerals and of string literals is the revival's (`3de571bac7` and `4978a9b16e`, 2026-11-09; P-173, P-171). Arithmetic in a size under walk is the team's: `PrimitiveArray[\T, (s0 s1) \]` at `Library/FortressLibrary.fss:2416` at `2f8b4331a`. The compiled checker's reading of such a size is the revival's (`3f297441c3`; P-55).

### The revival wrote the working part (1)

**Where clauses and conditional extension.** The team's tree parses the clauses and does no more. Its test says so: `tests/conditionalExtension.fss` at `2f8b4331a` ends `println "Conditional extension with where clauses can be parsed."`, and by `a874948ac` a copy is also in `not_passing_yet/`. The team's library keeps its clauses in comments: `(* comprises List[\E\] where [\E\] *)` (`Library/List.fss:87` at `a874948ac`), "not yet" (`Library/FortressLibrary.fsi:814`, `:1059`). The checker of `a874948ac` passes a `where` clause into its type analyzer (`STypeChecker.scala:184-202`), with "To Do: Check for the where-clause variables" (`TypeWellFormedChecker.scala:54`). The three forms of P-151 are the revival's: `2b1cd8e639` and `24db899faa` (2026-10-17), `396e4ed8da` (2026-10-18), and the code generator's `c324b841c9` (2026-10-31).

## The 11 items with nothing that works

Note 6 states these as built on neither path, so there is nothing to attribute: the definite assignment check; qualified names; array comprehensions; reduction variables; distributions; matrix unpasting; dimensions and units; type aliases; checked, deferred and chained exceptions; tail-call optimization; import of api names.

## Not settled by reading

- Multifix: whether the team's compiled path ran a chain through a multifix declaration. The run is named above.
- Type coverage: whether the team's walk stopped at `checkForDef`. The run is named above.
- The group of nine small items of Note 6's last line was outside this note.
