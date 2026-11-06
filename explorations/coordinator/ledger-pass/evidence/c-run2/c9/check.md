# Check of c9 (base c124c6b65)

mech.md: 5 lines, 0 failing. closes.txt, dups.txt, pairs.txt empty; questions.md puts no row to measure. Read at the base: `Library/FlatString.fss`, `StaticNativeApp.java` 40-130, 170-185, 262-290, `simpleChar.java:21-44`, `Unprinter.enQuote`, `NativeApp.java:140-149`, `default-libraries.tex` (FortressBuiltin at :37), `perf-probes/loader-declaring-type/REPORT.md` headings. `git diff c141e7f6a c124c6b65` on the keeps' cited files: empty.

## 141 (keep): pass
`FlatString.fss:152` reads `split():Generator⟦String⟧ = Nothing⟦String⟧` at the base; 93884be8d moved the family's bindings to helpers and left `split` alone. The probe path is named with its deleting commit.

## 607 (rewrite): FAIL (cold read)
Fidelity: `FlatString.fss:117` holds at c124c6b65; String.fss :426-436, :128-133 and the .fsi :854-855 hold. Nothing lost ("skeptic" and pin 650263804 are in the history). Present, reproducer, status, form pass.
1. Passage (claim): "a substring whose `a` lies past the string's first". Source: cold-read.md, row 607, first item; the reader cannot tell "first `a`" from "first character". Correction: "a substring whose `a`s lie past the string's first `a`".
2. Passage (notes): "The answer: Generator's comment (`Library/FortressLibrary.fsi:854-855`)." Source: cold-read.md, row 607, second item; the line no longer says the answer is `true` (the history line said "Generator's comment gives the answer"). Correction: "The expected answer, `true`: Generator's comment (`Library/FortressLibrary.fsi:854-855`)." To stay within 700, also "Fix and workaround: `BIG ∨ ...`, the curator's" -> "Fix: `BIG ∨ ...`, the curator's choice" (the expression is a library edit, a fix).

## 846 (rewrite): FAIL (fidelity of an uncited claim, cold read)
Pins hold at the base (Util.java :254, :286; FObject :33-35; StaticNativeApp :70 `javaForParameter` refuses "String", :178, :282 `unbox`; `javaForSelf(FType)` :122-126 -> `javaForSelf("String")` -> `String.class`, so the `self` claim holds). Siblings fix is right. Dropped `NativeApp.java:208-212`: false as a citation (it reads `Class.forName` / `newInstance`, the class load), so dropping is correct, but the sentence "`NativeApp` hands a glue class walk's values as they come" is now uncited.
1. Passage: "`NativeApp` hands a glue class walk's values as they come;". Source: `interpreter/glue/NativeApp.java:149` at c124c6b65, `public abstract FValue applyToArgs(List<FValue> args);`. Correction: "`NativeApp` hands a glue class walk's values as they come (`interpreter/glue/NativeApp.java:149`);".
2. Passage: "Fix: flatten first, or bind over `FlatString`, at c124c6b65." Source: cold-read.md row 846, first item (fix in walk or in the program, read two ways); both forms are program-side (FACTS.md:137: the library's own natives are over `FlatString` beside `String` overloads that flatten); the trailing pin is attached to no citation. Correction: "Workaround: flatten first, or bind over `FlatString`." To stay within 700, drop "The library binds neither." (its home: FACTS.md:134, "the library binds no helper there").

## 857 (rewrite): FAIL (cold read)
Pins hold; "planner" in the history; FACTS.md:137 agrees.
1. Source: cold-read.md row 857, first item: the line gives a worker no target (`IntegerOverflow` as the prelude, or the `IndexOutOfRange` its comment names); POSITIONS.md has no entry on it. Passage: "The specification names no conversion from an integer to a `Char`." Correction: "The specification names no conversion from an integer to a `Char`, so which exception to raise is open." To stay within 700, drop ", as the glue class `Char$Chr` did" (home: the history, row 857's earlier line, `Char.java:165-169`).

## 861 (rewrite): FAIL (cold read)
Pins hold; CONTESTED kept, rightly (no POSITIONS entry). At the base the helper's five escapes are `\b`, `\t`, `\n`, `\f`, `\r` (`simpleChar.java:27-31`), where it and `enQuote` agree; `\` and `"` are printable ASCII and take the helper's first branch, `'\'` and `'"'`; U+0005 takes `charToHexString`.
1. Passage: "and at the five escapes: `\` gives `'\\'` and `'\'`, `"` `'\"'` and `'"'`, U+0005 `'\'05''` and `'0005'`". Source: cold-read.md row 861, first and second items (the colon makes the differences read as the agreeing escapes, and the five are unnamed); `nativeHelpers/simpleChar.java:24-31`. Correction: "and at the five escapes `\b`, `\t`, `\n`, `\f`, `\r`; they differ at `\`, `'\\'` and `'\'`, at `"`, `'\"'` and `'"'`, and at U+0005, `'\'05''` and `'0005'`".

## 872 (keep): pass
Written by 93884be8d; no commit since touches its cited files.

## 877 (rewrite): FAIL (reproducer)
Pins hold at c124c6b65: `:58` maps `FlatString`/`JavaString` to `String.class`, `:70` lets them through `javaForParameter`, `:282` `unbox`, `:122-126` `javaForSelf(FType)`. Dropped ":231" and ":54" are the old pins (moved, now :282 and :58); "on the base and on the shadow" in the history. Spec cell: `default-libraries.tex:37` is the FortressBuiltin section. The workaround holds (another name is refused at load, `:178-180`).
1. Passage: "Probe in `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 4: prints 'before', '10', rc=0". Source: check brief, a `none` reproducer needs the command in the notes; the line gives the output and the program's place but no command (REPORT.md section 10 holds the commands). Correction: "`bin/fortress` on the program of `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 4, prints 'before', '10', rc=0".

## 897 (keep): pass
Cited lines unchanged from pin c141e7f6a to the base; sibling 846 named.

## 899 (keep): pass
`Writer.fss:52-53` unchanged since c141e7f6a; `:53:54-57` is a run position.

## 902 (keep): pass
`FileReadStream.java:43-44`, `fileOps.java:37`, `:82` unchanged since c141e7f6a; the gone path is the program's missing file.

## 903 (keep): pass
`StaticNativeApp.java:265-274` (the `RAISE` map) reads the same at the base; no change since c141e7f6a. The class beside `silent` is review-queue item 265's.

## 904 (keep): pass
`simplePrintln.java` unchanged since c141e7f6a; the gone tokens are `System.out` and the review's program.

Counts: 7 pass, 5 fail.
