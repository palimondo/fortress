# Cold read: c-run2/c9

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, `references/records.md`, `references/interpreter.md` ("Natives"), `references/compiler.md` and `references/library.md`.

One gap common to all rows: `records.md` says the seven status words are defined by the row template, which lives in the ledger file (`doc:explorations/fortress-gap-ledger.md#The row template`), which a cold reader may not open. I read `NEGATIVE-VERIFIED` as "the gap is confirmed in the tree and the row is open" and `CONTESTED` as "open, with a question that must be settled before a fix" (records.md's `close --settled` supports the second). That reading is inferred, not found.

## Row 607

- **Defect:** `FlatString.rangeContains(r, c)` looks up only the first index of `c` in the whole string (`javaIndexOf`) and tests whether that one index lies in `r`. A later occurrence inside `r` is missed. So `"abca".rangeContains(3#1, 'a')` is `false` (the first `a` is at 0, outside `3#1`, which I read as the range starting at 3 of length 1). The same wrong `false` reaches `'a' IN sub` / `'a' ∈ sub` for a `SubString`, and `CatString.rangeContains`, both of which delegate to the flat pieces.
- **Where:** walk; library `Library/FlatString.fss:117`; reached through `Library/String.fss:426-436` (SubString's `∈`) and `:128-133` (CatString). The row does not say whether the compiled path shows it (SKILL.md asks rows to name the paths); "under walk" only.
- **Reproduce:** run `ProjectFortress/tests/StringPieces.fss` under walk; it pins two `false`s (so it currently passes with the wrong answers, and a fix must change those expectations). The two longer examples in the notes can be typed into a probe directly.
- **Status:** open, build the fix: replace the body with `BIG ∨ [i ← self.bounds[r]] (self.get(i) = c)`, the curator's chosen fix (per `explorations/compile-ladder/rung-string-slips/JUDGE.md` section 2), and update the two pinned `false`s in `StringPieces.fss`.
- **Could not resolve:**
  - "a substring whose `a` lies past the string's first": "the string's first" what? I read "past the first `a` of the underlying string", but it can read as "past the string's first character". Unclear wording.
  - "The answer: Generator's comment (`FortressLibrary.fsi:854-855`)": the answer to what? I guess it means the intended meaning of `rangeContains` / `∈` is given by that comment, but the row does not say so. Unclear wording.
  - "Fix and workaround: ..., the curator's": "the curator's" is elliptic (the curator's decision? the curator wrote it?). Readable but loose.
  - "full text: history, row 607": I take it to mean the earlier, longer text is in `explorations/fortress-gap-ledger-history.md`; the cell does not name the file.
  - `NEGATIVE-VERIFIED`: definition not reachable (see top).

## Row 846

- **Defect:** under walk, a glue-class native bound with a parameter of type `String` receives, for a string that is not a `FlatString` (e.g. a `CatString` made by `||`), the string's type name instead of its characters. `p(a:String):()` bound to `StringPrim$PrintlnWithThread` prints ` Thread 26: CatString`. `StringPrim$GetEnvironment` does the same. A helper (nativeHelpers) bound in a method of trait `String` would get the type name for `self` the same way; a helper with a non-`self` `String` parameter is refused at load instead.
- **Where:** walk only (glue classes exist only there). `interpreter/glue/prim/Util.java:254`, `:286` (`SS2B`, `S2V` call `v.getString()`); `interpreter/evaluator/values/FObject.java:33-35` (`getString` answers `type().toString()`); `interpreter/glue/StaticNativeApp.java:70`, `:178`, `:282`; `NativeApp` passes values unconverted.
- **Reproduce:** run `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss` under walk. Per interpreter.md, `||` builds a `CatString` once the result exceeds `maxLeafSize` (32 chars), so the string must be longer than 32.
- **Status:** open, build a fix: flatten before calling the native, or bind over `FlatString` (the library already binds neither form, so it only bites user programs). Line numbers are as of c124c6b65.
- **Could not resolve:**
  - "Fix: flatten first, or bind over `FlatString`": flatten where, in `Util`/`NativeApp` (a walk fix) or in the program (a workaround)? Read two ways. interpreter.md line 117 gives the program-side form as advice, which suggests the second is a workaround and the first the fix; the row does not separate them.
  - "siblings: 877, 897": I read it as related rows, not duplicates; the term is not defined in the skill.
  - `NEGATIVE-VERIFIED`: see top.

## Row 857

- **Defect:** under walk, `char(n)` accepts any `ZZ32`, including negatives and values past U+10FFFF, and returns a `Char` holding it, with no exception: `char(-1).codePoint` is `-1`, `char(1114112).codePoint` is `1114112`.
- **Where:** walk; `Library/FortressLibrary.fss:4540` binds `char` to the helper `nativeHelpers/simpleChar.java:63`, which returns its `int` unchanged. The compiled path's prelude has no `char`; its `makeCharacter` (`LibraryBuiltin/CompilerBuiltin.fss:1058-1062`, `:1638-1639`) does check the range, raising `IntegerOverflow`. A compiled binding of the same helper also passes both values (so after the switch-over the compiled path would inherit the defect).
- **Reproduce:** run `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss` under walk.
- **Status:** open, build a fix in the helper `simpleChar.java:63` (compiler.md says fix the helper's Java, not the prelude). But the row does not say which exception the fix should raise.
- **Could not resolve:**
  - The intended result: `IntegerOverflow` (as `makeCharacter` does), `IndexOutOfRange` (as its comment says it "really should" be), or something else. The specification names no conversion, so the worker has no target. Missing decision, not a language concept.
  - The api comment about "the 16-bit plane" is quoted without saying what it implies here (that out-of-plane characters are knowingly unsupported? then is the row a gap at all?). Unclear wording.
  - Whether the helper may raise `IndexOutOfRange` at all: interpreter.md says a helper may raise only an exception both libraries declare as an object; the row does not say whether `IndexOutOfRange` qualifies.
  - `NEGATIVE-VERIFIED`: see top.

## Row 861

- **Defect:** the two paths render a non-ASCII `Char`'s `asExprString` differently. Walk's glue (`Char$ToExprString` = `FChar.toString`, quotes `Unprinter.enQuote(...)`) gives forms like `'\'0e9''` for é and `'\'0f600''` for U+1F600. The helper the compiled prelude binds (`simpleChar.charToExprString`) writes the character and its 4-digit hex (`'é 00e9'`), or only the hex past U+FFFF (`'1f600'`). They also differ at `\`, `"` and control characters.
- **Where:** both paths; walk: `interpreter/glue/prim/Char.java:177-181`, `interpreter/evaluator/values/FChar.java:104-106`; compiled: `nativeHelpers/simpleChar.java:21-44`.
- **Reproduce:** no test; print `char(233).asExprString` and `char(128512).asExprString` with `bin/fortress` (walk) and with a compile/run, at c141e7f6a.
- **Status:** wait on the question: which of the two forms the one library (the interpreter's library, which the compiled path adopts at the switch-over) should give. The specification names none. Do not build a fix until it is settled.
- **Could not resolve:**
  - "The two agree only at printable ASCII other than `\` and `"`, and at the five escapes": the examples that follow (`'\\'` vs `'\'`, `'\"'` vs `'"'`, `'\'05''` vs `'0005'`) show the two forms *differing*, so "agree ... at the five escapes" reads as a contradiction. Perhaps "differ also at"; perhaps the five escapes are other characters (`\n`, `\t` ...) and the three examples are a separate list. Unclear wording.
  - "the five escapes": which five are not listed. Unclear.
  - The nested quotes in `'\'0e9''` are hard to parse: is the output `'\'0e9''` literally, or `'\0e9'` wrapped in extra quotes by the row? Unclear wording.
  - "review `char-asexprstring-2026-11-06.md`, 2.3": no directory given; I guess `explorations/reviews/`.
  - Class `implementation gap (runtime)` though both cited sites are natives (glue, helper); minor.

## Row 877

- **Defect:** under walk, a program that declares its own type named `FlatString` or `JavaString` (e.g. `object FlatString end`) can bind a `builtinPrimitive` helper with a parameter of that type, and it loads: walk matches the declared type by name to Java `String`. At the call, `unbox` takes `v.getString()`, which for a plain object is its type name, so `slen(x: FlatString): ZZ32` bound to `simpleConcatenate.nativeStrlen` answers 10, the length of "FlatString".
- **Where:** walk; `interpreter/glue/StaticNativeApp.java:58` (`javaFor` maps the type by name), `:282` (`unbox`), `interpreter/evaluator/values/FObject.java:33-35`. Lines at c124c6b65.
- **Reproduce:** no test; the probe is in `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 4 (prints 'before', '10', rc=0; same with `object JavaString`).
- **Status:** open, build a fix: have `javaFor` read the parameter's type by its declaration (resolved type), as `javaForSelf(FType)` does for `self` (`StaticNativeApp.java:122-126`); the reproduction test comes first. Workaround for programs: name the type differently.
- **Could not resolve:**
  - "siblings: 847, 846": as in 846, read as related rows; 847 is not otherwise described.
  - "prints 'before'": the probe's first line, presumably a marker printed before the call; meaning not stated, harmless.
  - Specification cell names `default-libraries.tex`, "FortressBuiltin", without saying what that section says (that `FlatString`/`JavaString` are the library's builtin names?). Unclear what the citation supports.
  - `NEGATIVE-VERIFIED`: see top.
