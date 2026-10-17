# Rung A of climb batch 17: the record lines

## FACTS

- **A type `where`-clause variable of a `comprises` clause is opened at a call, as a size is, and `AnyList`'s clause is live.**
  - The compiled checker gives an argument whose trait lists `Box[\E\] where [\E\]` a fresh type of its own for the call, bounded as the binding is.
  - It refuses that type where another type is declared, gives two values two types, and refuses Amin and Tate's shape. It does not open such a trait where it reaches it as a parent.
  - Walk binds the variable as a symbolic type at load.
  - With `AnyList`'s `addLeft`, `addRight` and the comprehension's unwrap respelled, the distance goes from 49 to 45 (row 636's four sites). The count, and walk's element types, are unchanged.
  - Tests: `OpenTypeChecker`, `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker`, `XXXOpenTypeBoundEvidenceChecker`, `OpenTypeWalk`, `AnyListElementTypeWalk`.
  - Detail: `compile-ladder/rung-anylist-comprises/REPORT.md`.

## Ledger notes

- Row 636: close it. Commits `b6cb13000` and `c6adc85f1`, test `OpenTypeChecker`. Note: "climb batch 17 rung A: the clause made live (opened at a call by the checker, bound at load by walk), with `AnyList`'s `addLeft`, `addRight` and the comprehension's unwrap respelled; the distance's `List.fss:88`, `:89`, `:90` and `:179` are gone (49 to 45); walk's element types are unchanged (`AnyListElementTypeWalk`)."
- Row 682: append "climb batch 17 rung A: the opening covers a type where-clause variable too, and the type face is refused the same way: `f(x: AnyBox)` beside `f[\E\](x: Box[\E\])`, for `trait AnyBox comprises { Box[\E\] } where [\E\]`, 'There are multiple declarations of f with the same parameter type: AnyBox' (`ProjectFortress/compiler_tests/XXXOpenTypeOverloadChecker.test`); walk runs the generic one."
- Row 701: append "climb batch 17 rung A: a trait with a type where-clause variable stops the code generator the same way, 'Can't compile TraitDecl AnyBox' (`XXXOpenTypeEscapeChecker`'s program made well typed), so the type opening's tests are typecheck tests or refusals."
- Row 307: append "climb batch 17 rung A: the checker opens a type where-clause variable of a comprises clause as it opens a size; the code generator reads neither off an argument, behind row 701."

## New rows (section "2. Types: generics, static parameters, inference and coercion")

| NEW-A-1 | the compiled checker opens a trait whose `comprises` clause lists a type at a `where`-clause variable also as a function type's result, once for all results: it accepts `apply2(g)`, `apply2[\nat n\](f: ZZ32 -> Nt[\n\]): ZZ32 = two(f(1), f(2))`, for a `g(i: ZZ32): NatParamT` of two sizes | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/trait-parameters.tex`, "Nat and Int Parameters" | none | climb batch 17 rung A | Sizes on the base (3aea3da53), types since rung A: the same program over `trait AnyBox comprises { Box[\E\] } where [\E\]` is accepted. `bin/fortress typecheck` prints no error for either; walk stops at the call, 'Cannot unify ZZ32->NatParamT ... with ZZ32->Nt[\n\]'. The opening is the trait case of `pSubInner` (`TypeAnalyzer.scala`), reached through the arrow case's range. The specification opens an argument whose own type is such a trait. No gated test shows it: a compiled refusal test is red while the program is accepted. |

| NEW-A-2 | the compiled checker does not open, as a parent, a trait whose `comprises` clause lists a type at a type `where`-clause variable: a value of an unlisted trait below it, `Mid[\ZZ32\]` for `trait Mid[\E\] extends AnyBox` and `object Box[\E\] extends Mid[\E\]`, is refused where `Box[\F\]` is expected | NEGATIVE-VERIFIED | design limit (checker) | silent | `ProjectFortress/compiler_tests/XXXOpenTypeThroughSubtraitChecker.test` | climb batch 17 rung A | 'is not applicable to an argument of type Mid[\ZZ32\]'. Not opening such a parent keeps a listed type from a second opening, `List[\E\]` through `AnyList`, which cost List 22 sites in the where-clause probe. A parent that lists a type at a size is opened as on the base, so the same shape at a size is accepted (`NatOpenThroughSubtraitChecker`). Walk runs the program. In the library only `List` extends `AnyList`. |

Added by the skeptic, from its own programs (`SKEPTIC.md`, "Defects measured"):

| NEW-A-3 | the compiled checker reads a listed type at every type of a bounded type `where`-clause variable when it checks the trait's extenders: it accepts `object NBox[\E extends Object\](item: E) extends AnyNumBox` for `trait AnyNumBox comprises { NBox[\E\] } where [\E extends Number\]` | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/traits.tex`, "Trait Declarations" | none | climb batch 17 rung A's skeptic | siblings: NEW-A-4. `bin/fortress typecheck` prints no error since rung A (`c6adc85f1`); the base refuses the clause, 'E is undefined.' The check puts one inference variable for each binding, without its bound (`TypeHierarchyChecker.scala:319-323`), so `NBox[\String\]` reads as listed. The text lists the type at every value of the variable, the types below its bound, and an object that extends the trait must be a subtype of a listed type. No gated test can pass while it shows: a compiled refusal test is red while the declaration is accepted. |

| NEW-A-4 | under walk, the comprises check at load reads a listed type at every type of a bounded type `where`-clause variable: it loads `object NBox[\E\](item: E) extends AnyNumBox` for `trait AnyNumBox comprises { NBox[\E\] } where [\E extends Number\]`, and runs `b: AnyNumBox = NBox[\String\]("s")` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/traits.tex`, "Trait Declarations" | `ProjectFortress/tests/XXXComprisesWhereBoundExtender.fss` | climb batch 17 rung A's skeptic | siblings: NEW-A-3. Since rung A the check reads a `where`-clause variable as a variable for any type, before the environment (`BuildEnvironments.java:1463-1467`, `named` at `:1513`), without its binding's bound; a size has none. The base refuses the clause, 'E is undefined.' The text lists the type at every value of the variable, the types below its bound, and an object that extends the trait must be a subtype of a listed type. |

| NEW-A-5 | under walk, a trait whose `comprises` clause lists a type at a `where`-clause variable is refused at load when a member's type names the variable: `getter item(): E` in `trait AnyBox comprises { Box[\E\] } where [\E\]` stops with 'Missing type E', and a size's `Nt[\n\]` with 'Missing type n' | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/trait-parameters.tex`, "Where Clauses" | `ProjectFortress/tests/XXXWhereVariableMemberWalk.fss` | climb batch 17 rung A's skeptic | siblings: NEW-A-6. The size face is on the base (3aea3da53) too, in `trait NatParamT comprises { Nt[\n\] } where [\nat n\]`; the type face since rung A, which puts the variable in scope in the members. The member's type is read by `BuildTraitEnvironment.forFnDecl3` (`BuildTraitEnvironment.java:148`), which the binding of `processWhereClauses` (`BuildEnvironments.java:948-970`) does not reach. The compiled checker accepts both declarations. The text: every static variable of a trait is a static parameter or a `where`-clause variable of its declaration. |

| NEW-A-6 | the compiled checker crashes on a call, outside its trait, of a member whose type names a type `where`-clause variable: `println(mk().item)`, with `getter item(): E` in `trait AnyBox comprises { Box[\E\] } where [\E extends Object\]`, stops with 'E is not in the kind env' | CONTESTED | implementation gap (checker) | silent | none | climb batch 17 rung A's skeptic | siblings: NEW-A-5. Since rung A; the base refuses the clause, 'E is undefined.' `TypeAnalyzer.staticParam` calls `bug` (`TypeAnalyzer.scala:981`) from the variable case of `pSubInner` (`:207`): the call's type keeps the unopened variable. The size face is accepted, on the base too: `sz(mk().me)` with `getter me(): Nt[\n\]`. The text does not say what type such a call has, an opened type as at an argument or none; a crash is neither. No gated test: the refusal is a crash. |

| NEW-A-8 | the compiled checker crashes on a generic function passed as a value: `useOne(count)`, for `count[\F extends Object\](b: Box[\F\]): ZZ32` and `useOne(g: Box[\ZZ32\] -> ZZ32): ZZ32`, stops with 'F is not in the kind env [][][]' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/functions.tex`, "Function Declarations"; `basic/types-vals-vars.tex`, "Relationships between Types" | none | climb batch 17 rung A's skeptic | siblings: 156. On the base (3aea3da53) and since rung A, `bin/fortress typecheck`; `TypeAnalyzer.staticParam` calls `bug` (`TypeAnalyzer.scala:981`). Walk refuses the call as row 156 gives for a `nat`-generic function: 'Unification error: Closure/Constructor for useOne param 1 (g:Box[\ZZ32\]->ZZ32) got arg count[\F extends FortressBuiltin.Object\](b:Box[\F\]) ... of type null'. No gated test: the refusal is a crash. |

## New row (section "14. Contracts, tests and tools"), added by the skeptic

| NEW-A-7 | `fortress compile P.fss` after `fortress typecheck P.fss` of the same unchanged file writes no jar and exits 0, so `fortress run P` stops with 'Could not load P' and 'Resource not found : P.class' | NEGATIVE-VERIFIED | implementation gap (tools) | silent | none | climb batch 17 rung A's skeptic | On the base (3aea3da53) and since rung A, with a private caches folder: `old-fortress.sh <base> <caches> typecheck SkTcThenCompile.fss`, then `... compile SkTcThenCompile.fss` (exit 0, no `SkTcThenCompile.jar` in `bytecode_cache/`), then `... run SkTcThenCompile`. By reading, the typecheck's entry in `analyzed_cache/` lets the compile take the file as done. A compile of a fresh copy of the file under another name writes its jar. Workaround: compile before any typecheck of the file. |

Every row here passes `ledger.py check --rows` with a number in place of the placeholder. `Specification/appendices/changes.tex:1495`, `:1499`, `:1504`, `:1510`, `:1513` and `:1516` cite `NEW-A-3`, `NEW-A-2`, `NEW-A-1`, `NEW-A-4`, `NEW-A-5` and `NEW-A-6`.

## Handover

Climb batch 17's rung A (`wip/rung-anylist-comprises`, `fa7f66b44`) did the following:
- `AnyList`'s clause is live: the checker opens a type `where`-clause variable at a call as it opens a size, and walk binds it at load.
- The distance goes from 49 to 45 (row 636's four sites); the count stays at 39.
- Rows NEW-A-1 (the opening under a function type's result, sizes and types) and NEW-A-2 (a type-opening parent is not opened) are open, and row 682 has a type face.
- Its skeptic's rows: NEW-A-3 and NEW-A-4 (an extender check that reads a bounded type `where`-clause variable at every type), NEW-A-5 (walk refuses at load a member whose type names the variable) and NEW-A-6 (the checker crashes at an outside call of such a member); NEW-A-7 and NEW-A-8 are older defects its programs met (a compile after a typecheck writes no jar; a generic function passed as a value crashes the checker).

## Revival change

**The change.**
- The team's source: the team's library carried the clause as a comment on `AnyList`, "Not yet: comprises List[\E\] where [\E\]" (`Library/List.fsi:56`, `List.fss:87` before this change), and wrote `AnyList`'s `addLeft` and `addRight` through the private `addL` and `addR` (`List.fss:89-90`, `:102-106` before).
- What both paths did: the disambiguator, which both paths share, refused a type `where`-clause variable in a `comprises` clause, "E is undefined." The compiled checker refused four of `AnyList`'s and the comprehension's calls, reading their arguments as a list of an unknown element type. For example: "Could not check call to function app ... is not applicable to an argument of type (List.AnyList, List.AnyList)" at `List.fss:88`, and "No such method CovariantCollection.AnyCovColl.toImmutableArray" at `:179`.
- What the tree now does:
  - The clause is live (`List.fsi:56`, `List.fss:87`).
  - A trait's type `where`-clause variables are in scope in the trait but for its extends clause.
  - The checker opens such a variable at a call, as it opens a size: the argument takes the listed type at a type of its own, bounded as the binding is, and known to equal only itself (`OpenTypeChecker`). The checker refuses that type where another is declared, and gives two values two types (`XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker`, `XXXOpenTypeBoundEvidenceChecker`). It does not open such a trait where it reaches it as a parent (`XXXOpenTypeThroughSubtraitChecker`).
  - Walk binds the variable as a type that stands for every type when it loads the trait, and its check at load reads a listed type at every type (`OpenTypeWalk`).
  - `addLeft` and `addRight` are `singleton(e) || self` and `self || singleton(e)`, and the comprehension's unwrap casts its collection to `CovariantCollection[\T\]`. Walk's element types are unchanged (`AnyListElementTypeWalk`).
- The reason:
  - the team's comment;
  - `Specification/basic/traits.tex`, "Trait Declarations", which lets a listed type hold a `where`-clause variable of the declaration at every value of it;
  - the checker's four refusals above.
- The departures: the opening also under a function type's result (row NEW-A-1); an unlisted extender is not opened (row NEW-A-2); the extenders are read at every type of a bounded variable, by the checker and by walk (rows NEW-A-3 and NEW-A-4); walk refuses at load a member whose declared type names the variable, and the checker crashes at an outside call of one that names a type variable (rows NEW-A-5 and NEW-A-6); the code generator does not compile a trait with a `where` clause (row 701).

**Provenance.**
- The decision: P-151, the curator's decision of 16 October 2026, "the team's comment `AnyList comprises List[\E\] where [\E\]` becomes live ... the rest of `AnyList` moves into `List`", built from the where-clause probe's B.1 and A.2.2.
- The batch: climb batch 17, rung A.
- The scope of the parent rule to type openings is this rung's decision, on the evidence of `NatOpenThroughSubtraitChecker`, and is listed for review.
