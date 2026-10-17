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

Both rows pass `ledger.py check --rows` with a number in place of the placeholder. `Specification/appendices/changes.tex:1497` and `:1502` cite them as `NEW-A-2` and `NEW-A-1`.

## Handover

Climb batch 17's rung A (`wip/rung-anylist-comprises`, `fa7f66b44`) did the following:
- `AnyList`'s clause is live: the checker opens a type `where`-clause variable at a call as it opens a size, and walk binds it at load.
- The distance goes from 49 to 45 (row 636's four sites); the count stays at 39.
- Rows NEW-A-1 (the opening under a function type's result, sizes and types) and NEW-A-2 (a type-opening parent is not opened) are open, and row 682 has a type face.

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
- The departures: the opening also under a function type's result (row NEW-A-1); an unlisted extender is not opened (row NEW-A-2); the code generator does not compile a trait with a `where` clause (row 701).

**Provenance.**
- The decision: P-151, the curator's decision of 16 October 2026, "the team's comment `AnyList comprises List[\E\] where [\E\]` becomes live ... the rest of `AnyList` moves into `List`", built from the where-clause probe's B.1 and A.2.2.
- The batch: climb batch 17, rung A.
- The scope of the parent rule to type openings is this rung's decision, on the evidence of `NatOpenThroughSubtraitChecker`, and is listed for review.
