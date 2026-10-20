# Rung S (rung-string-conversion): record lines for the gather

## FACTS

- **An object, trait or object expression whose `extends` clause names `Any` alone is an `Object` on both paths, and `String`'s two `||` members over `Any` convert by the library's own way.**
  - The pre-disambiguation desugaring that both paths run gives such a clause `{Object}`, as it gives an empty one, and leaves `Any`'s and `Object`'s own declarations as written.
  - `opr ||(a:Any, self)` is `("" || a) || self` and `opr ||(self, b:Any)` is `self || cast[\Object\](b).asString`; `FlatString`'s api states its component's header, with no `opr ||(a:FlatString, self)`.
  - So a tuple or `()` concatenates on the left of a string, and a function or a tuple of seven or more elements beside one raises `CastError`.
  - The team test `extendAny` prints `Infinity`, and the distance's three `String` sites are gone: 34 to 31, the count 30 to 28.
  - F-246's last sentence ("The conversion makes the team test `extendAny` stop with `CastError`") holds only without this repair.
  - Tests: `tests/ExtendsAnyIsObjectWalk.fss`, `compiler_tests/ExtendsAnyIsObject.test`, `tests/ConcatAnyOnLeftWalk.fss`; the distance stage.
  - Detail: `compile-ladder/rung-string-conversion/REPORT.md`, sections 1, 4 and 5.

## Ledger

- Row 743: close it with the fix's commit on `main` (`7ba1a846d` on the branch) and the test `ProjectFortress/tests/ExtendsAnyIsObjectWalk.fss`; the compiled test is `ProjectFortress/compiler_tests/ExtendsAnyIsObject.test`.
- Row 726, note: "`FlatString`'s api no longer declares the pair (`Library/FlatString.fsi:16-21`); the compiled test stays."
- Row 585, note: "`FlatString`'s api now has its component's header, without the second `||`."
- Row 374, note: "Walk: now `CastError` at `cast[\Object\]` (`FortressLibrary.fss:4394`)."
- Row 369, note: "Seven elements: now `CastError` (`FortressLibrary.fss:4394`)."

Rows 726, 585, 374 and 369 are within 61 characters of their limits (notes of 684, 699, 654 and 663 of 700 characters), so `ledger.py note` may refuse these; the gather lists them for the coordinator then.

## New rows

None.

## Handover

Rung S cleared the distance's three `String` sites with the library's own conversion (`("" || a)`, and `cast[\Object\]` at the bottom) and made `FlatString`'s api match its component. Beside it, row 743 is repaired in the pre-disambiguation desugaring: an `extends` clause naming `Any` alone gives `Object`. The distance is now 31 and the count 28.

## Revival change

### The change

1. **An object or trait declared `extends Any`.**
   - The team's source: the pre-disambiguation desugaring gives an empty `extends` clause `{Object}` and leaves every other clause as written (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:62-72` at `612869b4a`). So under walk and compiled, an object or trait declared `extends Any` was not an `Object`: `typecase` took the `else` arm, and an object with no `asString` of its own had none ("Cannot find definition for method asString given receiver Inf"). The team's own test of such an object says "We ought to be able to extend the builtin type Any." (`ProjectFortress/tests/extendAny.fss:16`).
   - What the tree now does: a clause each of whose types is `Any` gets `{Object}` too, except in the declarations of `Any` and `Object` themselves (`PreDisambiguationDesugaringVisitor.java:59-68`, `:76`, `:123-124`). Tests: `ProjectFortress/tests/ExtendsAnyIsObjectWalk.fss`, `ProjectFortress/compiler_tests/ExtendsAnyIsObject.test`.
   - The reason: "every trait except Any and Object implicitly extends the trait Object if it does not do so explicitly" (`Specification/basic/traits.tex:186-188`); `Object` "is the root of the type hierarchy for all user-constructed objects" (`Specification/basic-lib/objects.tex:131-132`); "Any comprises of tuple types, arrow types, (), and Object" (`Specification/basic/types-vals-vars.tex:153`).
2. **`String`'s concatenation with a value of any type.**
   - The team's library: `opr ||(a:Any, self):String = a.asString || self` and `opr ||(self, b:Any):String = self || b.asString` (`Library/FortressLibrary.fss:4393-4394` at `612869b4a`), which call a method of `Object` on an `Any`. Walk stopped with `ProgramError` "Non-object receiver (1,2): (Int,Int) trying to invoke method asString" for a tuple or `()` on the left of a string, and the compiled checker refuses both bodies: "Any has no getter called asString".
   - What the tree now does: `("" || a) || self` and `self || cast[\Object\](b).asString`. A tuple or `()` on the left of a string concatenates as on the right, and a function or a tuple of seven or more elements beside a string raises `CastError` where it raised `ProgramError`. Test: `ProjectFortress/tests/ConcatAnyOnLeftWalk.fss`; the checker no longer reports either body.
   - The reason: the library's own comment on `print(a:Any) = print("" a)`, "These use concatenation rather than .asString because the formulation with concat also works for tuples" (`Library/FortressLibrary.fss:4494-4495`); the checker's refusal above.
3. **`FlatString`'s api.**
   - The team's api: `object FlatString extends { String }` with `opr ||(a:FlatString, self): String` (`Library/FlatString.fsi:16`, `:20` at `612869b4a`), where its component extends `{ String, DelegatedIndexed[\Char, ZZ32\] }` and declares no such member (`Library/FlatString.fss:34`).
   - What the tree now does: the api has the component's header and drops the member (`Library/FlatString.fsi:16-21`). Test: the checker's export check reports no mismatch for `FlatString`.
   - The reason: the checker's export error, "The following declarations in API FlatString are not matched by the declarations in component FlatString ... due to different extends clauses ... different method ||".

### Provenance

- F-246 (the conversion, the probe's way C, and FlatString's two lines).
- PLAN's phase 3, item 17: the `String` sites taken with row 743 repaired beside, which answers the symbolic-operators probe's question (c).
- Climb batch 19's forks 10 to 14 (the conversion alone; the repair in the pre-disambiguation desugaring; walk's moved values as the conversion gives them; FlatString's two api lines; no speed pass).
- Rows 743 (closed), 726, 585, 374 and 369 (noted).
- Climb batch 19, rung S.
