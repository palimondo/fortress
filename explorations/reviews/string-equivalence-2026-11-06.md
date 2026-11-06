<!-- The review for the curator's decision on whether Fortress strings are value objects or reference objects under strict equivalence, `SEQV`, that is, whether `"ab" SEQV "ab"` is true for two strings built apart, before the rung that fixes what `SEQV` means (P-162; `reviews/any-carrier-2026-11-06.md`, option (c)) joins climb batch 27; written 2026-11-06 by an Opus worker, reading only, with walk and compiled runs and two scratch library prototypes from the main tree's build at `a959ab2aa` in private caches folders. -->

# Strings under `SEQV`: value or reference, for the curator's decision

The tree is `main` at `a959ab2aa`. Its build is current: `ProjectFortress/build/implementation.stamp` and `default_repository/caches/implementation.stamp` both read `180a6844e44e…`. Every program below is a scratch file under `tmp/streqv/`, not committed. Each point quotes its output. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`.

## 1. The question and a primer

**The question.** Is `"ab" SEQV "ab"` true for two strings built apart? If yes, strings are value objects under `SEQV`. If no, they are reference objects.

**The words.**

1. *`SEQV`* is strict equivalence, also called object equivalence. Its symbol is ≣, U+2263, "strictly equivalent to". `SEQV` and `===` are its ASCII spellings (`parser/Literal.rats:303`; `parser_util/precedence_resolver/Operators.java:2109`). Note: it is not ≡, U+2261. The parser reads `EQV` and `EQUIV` as ≡, a different operator (`Literal.rats:301-302`).
2. *Value object*: an object with no identity. Two of them built apart can be the same. *Reference object*: an object with an identity. Two of them built apart are always different.
3. *Walk* is the interpreter. The *compiled path* compiles to JVM bytecode. Each has its own library today. The compiled one is the *prelude*. At the *switch-over* the compiled path moves onto walk's library, and the prelude goes (`.claude/skills/fortress-repo/SKILL.md`, "The phases").
4. A *flat string* is one Java string (`object FlatString`). A *rope* is a tree of strings (`object CatString`). A *substring* is a view into another string (`object SubString`).

**The specification's rule.** `Specification/basic/objects.tex:424-445`, "Object Equivalence":

> The trait Any declares the object equivalence operator ≣. This operator is automatically defined for all objects; it is a static error for the programmer to override it.

So `SEQV` is the one comparison that every value has. A program may not override it. The rule, in short:

- Different dynamic types, "including the instantiations of all static parameters": always false.
- Two value objects of one type: true "if and only if corresponding fields of the objects are themselves equivalent"; "two binary words are strictly equivalent if and only if they contain the same bit pattern" (so floats by their bits).
- Two references: true "if and only if the two object references refer to the identical reference object".
- Two functions: true only if they behave alike, and "the fortress implementation is free to return false".

**Which objects are value objects.** `objects.tex:22-31`: an object is "a reference object if it has an object trait type that is not declared with the `value` modifier", and a value object if it is a tuple, `()`, or declared `value`. The section "Value Objects" (`:347-422`) defines the modifier.

**The chapter's opening line.** `objects.tex:15`: "Value objects and properties are not yet supported."

**Why strings are the open kind.** The examples name booleans, numeric literals, floats and integers as value objects (`:39-43`). They name "arbitrary-precision numbers and aggregates such as arrays, lists and sets" as reference objects (`:52-54`). They never name strings. Just before that list the text asks itself: "What about reference objects that have no mutable fields?" (`:51`). Strings are exactly that kind.

## 2. The library's declarations

| Declaration | File and line | `value`? |
|---|---|---|
| `trait String` | `Library/FortressLibrary.fss:4341`, `.fsi:2447` | no |
| `object FlatString` | `Library/FlatString.fss:34`, `.fsi:16` | no |
| `object CatString(first, second)` | `Library/String.fss:75`, `.fsi:25` | no |
| `object SubString(baseString, range)` | `Library/String.fss:353`, `.fsi:34` | no |
| `value object EmptyString` | `Library/String.fss:282`, `.fsi:28` | yes |

So the library is split. Its empty string is a value object. Its other three are reference objects by the specification's definition.

**How a string's `=` is defined.**

1. `FlatString` declares `opr =(self, other: FlatString)` on the glue class `FlatString$Eq` (`FlatString.fss:70-71`). That class is Java's `self.equals(other)`, text equality (`interpreter/glue/prim/FlatString.java:131-136`). Its `<`, `>`, `CMP` use `cmp`, the helper `stringOps.compareTo` (`FlatString.fss:72-76`, `:85-86`).
2. `trait String` declares no `=` itself. It declares `CMP` character by character (`FortressLibrary.fss:4368-4369`). It inherits `=` from `StandardPartialOrder`: `opr =(self, other:T) = EqualTo = (self CMP other)` (`:232`). That is text equality for any two strings, of any shape.
3. There is no top-level `=` over `(String, String)` in walk's library (a grep for `opr =(` with `String` finds only `FlatString.fss:70` and `CaseInsensitiveString.fss:30`).
4. The fallback `opr =(a:Any, b:Any) = a SEQV b` (`FortressLibrary.fss:96`) and `Equality`'s `= ... self SEQV other` (`:101`) never see two strings: `StandardPartialOrder`'s `=` is more specific.

**Strings are immutable.** The string objects declare no `var` field (the `var`s in `String.fss` belong to `BalancingForest`, `:185-186`, `StringStats`, `:510-514`, and locals). The specification lists `String` with `Character` and the numerals among the "simple standard types for literals", and says "Values of these types are immutable" (`Specification/basic/types-vals-vars.tex:572-581`).

## 3. What each runtime does today

**Walk's code.** `interpreter/evaluator/values/FString.java:35-38`:

```java
public boolean seqv(FValue v) {
    if (!(v instanceof FString)) return false;
    return (getString().equals(v.getString()));
}
```

That is text equality for two flat strings. `AnyPrim.sequiv` tests identity first, then calls `seqv` (`interpreter/glue/prim/AnyPrim.java:23-26`). Author: Jan-Willem Maessen (`jmaessen`), 2008-03-12, commit `cd41f90eb`, "SEQV now handles value objects correctly ... Re-factored seqv into a method of FValue". `git blame` stops at the cut root `5a68404fd`; `git show cd41f90eb -- '*FString.java'` adds these four lines. His first `SEQV`, 2008-03-04 (`d56a402b4`), already compared strings by text: `return (y instanceof FString) && x.getString().equals(y.getString());`.

A rope or a substring is not an `FString`. It is a library object, an `FOrdinaryObject`. Its `seqv` answers false unless its type is declared `value` (`FOrdinaryObject.java:46-57`). So walk compares a rope by identity.

**The prelude's code.** `Library/CompilerLibrary.fss:62-71`, under "(* This is incomplete *)":

```
opr ===(a:Any, b:Any):Boolean = jSEQUIV(a,b)
...
opr ===(a:String, b:String):Boolean = a=b
```

Author: David Chase (`dr2chase`), 2010-05-05, commit `64e5f04db`, "Added definition of === for popular types" (`git log -S'opr ===(a:String, b:String)'`, its oldest entry). The line stands unchanged at the team's last commit (`git show a874948ac:Library/CompilerLibrary.fss`, line 68). Beside it, `jSEQUIV` is `equality.sEquiv`, which compares references: `return a == b;`, with "Eventually need to deal with tuples, value types, etc." (`nativeHelpers/equality.java:14-19`). The prelude's own `trait String` has a placeholder `=` (`CompilerBuiltin.fss:395`); its `JavaString` compares by `jCompareTo` (`:428`).

**Walk's answers.** `tmp/streqv/StrEqvWalk.fss`, run as `bin/fortress walk StrEqvWalk.fss` with the setup lines. `rope1` is `"abcdefghij" || "klmnopqrstuvwxyzABCDEFGHIJKLMN"`, past `maxLeafSize`, 32 (`String.fss:576`), so `FlatString`'s `||` builds a `CatString` (`FlatString.fss:121-129`). `rope2` is the same text split 30 and 10. `sub1` is `rope1[5#10]`, which crosses the halves, so `CatString.uncheckedSubstring` builds a `SubString` (`String.fss:148-161`).

```
1 flat, flat built apart: true =: true same: true
3 flat, rope: false =: true
4 rope, rope, other shape: false =: true
5 rope, rope, same shape built apart: false =: true same: true
7 sub, sub built apart: false =: true
8 sub, flat: false =: true
9 EmptyString, EmptyString: true; EmptyString, "": false =: true
10 tuples: true ropes in tuples: false
12 as Any: false numbers: true pair: true
rc=0
```

Line 2 printed the shapes: `J40/0:` for the flat string, `BC40/1:` with two leaves for each rope; line 6 printed `S10= [5:14]` for the substring. So walk's `SEQV` on equal texts depends on length and shape. Two flat strings: true. Anything with a rope or a substring: false. `=` is true in every case. Line 11, `Just(rope1) SEQV Just(rope2)`, printed true, but that is row 114 (`Just`'s fields are not compared at all), not a string rule. No ledger row holds the rope and substring answers (`facts-extract.sh 'ledger-find:rope*'`, `'ledger-find:string SEQV'`).

**The compiled path's answers.** `tmp/streqv/StrEqvComp.fss`, compiled with `java … -Dfortress.caches=<private copy of the warm caches> … com.sun.fortress.Shell compile StrEqvComp.fss` ('compile rc=0') and run with `bin/fortress run StrEqvComp`:

```
1 flat built apart === true SEQV true = true
2 as Any === true
3 long, other split === true = true
run rc=0
```

The prelude has no ropes. Its `||` is `jConcatenate` into one Java string (`CompilerBuiltin.fss:432`; no `CatString` in `CompilerBuiltin.fss` or `CompilerLibrary.fss`). So line 3, two 40-character strings split apart, is two flat strings. The dispatch picks the `String` overload at run time, also through `Any` (line 2).

The reference helper alone, bound in a program as `refEq(a: Any, b: Any): Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.equality.sEquiv")` (`tmp/streqv/StrRefComp.fss`, 'compile rc=0'):

```
1 sEquiv literal, same literal elsewhere: false
2 sEquiv literal, built by ||: false
3 sEquiv itself: true
4 === literal, built by ||: true
run rc=0
```

So under identity even two equal literals differ on the compiled path. Java would intern them; the compiled path wraps each.

**The team's tests.**

1. `ProjectFortress/tests/sequivTest.fss` (Maessen, 2008-03-06, `21946c933`) has no line on strings. Its values are numbers, an array, functions, tuples, booleans and `Maybe`s (`:29-114`). It is gated.
2. `ProjectFortress/compiler_regressions/seqv.fss` (copyright 2010, `.test` file; its author is not in git, whose history of the folder begins at the parentless cut root `26718e298`) asserts `"cat"==="cat"` (`:22`) and `"cat" NEQV "dog"` (`:25`). Compiled today it prints `PASS 'cat'==='cat'` and `PASS 'cat' NEQV 'dog'`, 'run rc=0'. Under walk it stops at load, 'Operator NEQV is not defined.' Nothing runs `compiler_regressions/` (`.claude/skills/fortress-repo/references/tests-running.md:63`).

## 4. The team's sources and which way they point

1. **The specification.** It is silent on strings. Read literally, `object FlatString` without `value` is a reference object, so `"ab" SEQV ("a" || "b")` is false. But the chapter says value objects are "not yet supported" (`objects.tex:15`), and it leaves open "reference objects that have no mutable fields" (`:51`). It groups `String` with `Character` and the numerals as immutable values of literals (`types-vals-vars.tex:572-581`). The team's later restart, `Documentation/Specification/Prose/Language/values.tick:39-56`, defines value and reference objects and does not name strings.
2. **Walk's library and code, 2008.** Text, for flat strings, from the first `SEQV` (`d56a402b4`) and in `FString.seqv` (`cd41f90eb`). Ropes and substrings fall to the object rule and get identity. No commit or comment says that ropes should differ from flat strings. The split comes from where the rope class lives, not from a stated rule. It makes `SEQV` change at `maxLeafSize`, a tuning variable.
3. **The prelude, 2010 to 2012.** Text: one overload of `===` over `(String, String)`, from 2010 to the team's last commit, by the compiled path's main author (`research/authorship.md:88`). The 2010 regression test asserts it. This is the team's later word (P-26). One limit: the family sits under "(* This is incomplete *)". P-26 says that code its author called a stub serves only the implementation. The note marks missing cases, which `equality.java:15` names: "tuples, value types". It does not mark the `String` line as a stub, and a test pins that line.
4. **Do they agree?** Yes, where the team wrote code for strings: both paths compare strings by their text. The only reading for identity is the specification's literal one, at a kind it does not name. The rope case under walk is the default of the object rule, not a team choice.

## 5. The peers, as context

Context only. Python, Java and Scala were run here (`tmp/streqv/`); the rest is from general knowledge, not run.

- **Swift.** `String` is a struct, a value type. `==` compares the text. `===` takes only class references, so a string has no identity.
- **Python.** `==` compares text. `is` compares identity, and its answer on equal strings depends on interning. Run: `py == : True  is : False`, with 'SyntaxWarning: "is" with 'str' literal. Did you mean "=="?'.
- **Haskell.** No identity at all. `String` is a list of `Char`; `==` is structural.
- **Java.** `==` on strings is identity, the known trap. Literals are interned, so two equal literals are `==`; a string built at run time is not. Run: `java ==: literal,literal true; literal,built false; equals true; intern true`.
- **Scala.** `==` calls `equals`, text. `eq` is identity. Run with the tree's Scala 2.13.18: `scala == true; eq false`.
- **Julia.** `String` is immutable. `===` on two equal strings is true: Julia compares strings by content, as it does other immutable values.

So the languages whose strict comparison means "no program can tell them apart" (Swift, Haskell, Julia) treat strings as values. Identity on strings survives only as Java's `==` and Python's `is`, both warned against.

## 6. What hangs on it in the tree

1. **microGPT.** `grep -c 'SEQV\|≡\|≣\|==='` over `explorations/run-c4/src/*.fs?` and `explorations/apl/mg/*.fs?` prints 0 for every file. The model compares strings, where it does, by `=`, which does not reach `SEQV` (section 2, point 4).
2. **`=` on strings.** Unchanged under either way: it is `CMP`, by text (section 2). Tuples have their own `=` element by element (`FortressLibrary.fss:4668`, `:4724`). Walk run `tmp/streqv/StrTupWalk.fss`: `1 tuple = flat: true rope: true =/=: false` and `2 assert passed`, 'rc=0'.
3. **The fallback `=`** at `FortressLibrary.fss:96` and `Equality`'s at `:101`: reached by a string only beside a non-string, where `SEQV` is false under both ways (different types).
4. **`AnyMaybe`'s `=`** (`:1615`): `Just` (`:1640`) has its own `=`, `x=o.get` (`:1660`), so two `Just`s of strings compare by text under both ways.
5. **`Set` and `Map`.** `if self SEQV other then true` (`Library/Set.fss:353`, `:360`, `:367`; `Library/Map.fss:448`) is a shortcut before a full comparison. The meaning changes only how often it fires.
6. **`Avl`.** `if v SEQV vv then (self,d) else (replaceValue(v),d)` (`Library/Avl.fss:177-180`). Both branches keep `v`, the old value, so the meaning does not change the tree's contents. (That `replaceValue(v)` keeps the old value and not `vv` may be a defect; not probed here.)
7. **Inside walk's run time.** `SEQV` on a tuple or a value object compares its parts by `FValue.seqv` directly (`FTupleLike.java:78`; `FOrdinaryObject.java:54`), not by the library's operator. So a string inside a tuple gets the run time's answer, whatever the library declares (section 7, (a), point 3).
8. **Tests that would change.** A grep of every test folder for `SEQV`, `===` and `≣` beside a string finds only `compiler_regressions/seqv.fss:22` and `:25`. No gated test asserts `SEQV` on strings. Indirect routes (strings inside tuples or value objects compared by `SEQV`) were not measured over the suites.
    - Under (a): no existing test changes.
    - Under (b): `seqv.fss:22` fails. It is the team's test, and ungated. `sequivTest.fss` does not change on strings.

## 7. The two ways

### (a) Strings are value objects, compared by their text

1. **Library.** One declaration over `String`, as the prelude's family did: `opr SEQV(a: String, b: String): Boolean = a = b`, beside `FortressLibrary.fsi:2645` and `FortressLibrary.fss:4650-4651`. The checker's rule refuses `===` only inside a trait or an object (`parser_util/SyntaxChecker.java:253-256`); Ryu's TODO there wants no top-level definition "when we have a better magic". The library is the language's own text, so this is a definition, not a programmer's override.
2. **Measured, prototype A.** Copies of `FortressLibrary.fss` and `.fsi` in `tmp/streqv/proto/`, each with that one line added, read by walk ahead of the library. The program of section 3, with a line 12 added, printed:

    ```
    3 flat, rope: true =: true
    4 rope, rope, other shape: true =: true
    7 sub, sub built apart: true =: true
    9 EmptyString, EmptyString: true; EmptyString, "": true =: true
    10 tuples: true ropes in tuples: false
    12 as Any: true numbers: true pair: true
    rc=0
    ```

    Walk loaded the overload beside the one at `Any`, and chose it by run-time types, also through `Any` (line 12). The plain build printed `12 as Any: false numbers: true pair: true`.
3. **Its limit.** Line 10 stays false: walk's run time compares tuple parts by `FValue.seqv`, not by the library's operator (section 6, point 7). The rung must close this: either the run time's recursion calls the library's `SEQV`, or each run time compares any `String` by text itself. On the compiled path, the same holds for `equality.sEquiv` once it compares tuples (row 907).
4. **The `value` modifier: not added.** A rope's fields are its halves, `first` and `second`. Under the specification's field rule, two equal texts of different shapes would be inequivalent. Measured, prototype V: `value object CatString` in copies of `String.fss` and `.fsi` (`tmp/streqv/proto2/`): `V1 equal text, same shape built apart: true`, `V2 equal text, other shape: false`, 'rc=0'. The declaration over `String` answers by the text and avoids this. `EmptyString` keeps its `value`: it has no fields, so all empty strings agree.
5. **Specification.** In the revision form (P-96): one Appendix I entry. A `\revision` callout at "Object Equivalence" (`objects.tex:424-445`): two strings are strictly equivalent if and only if they hold the same characters in the same order, whatever objects hold them. A callout at the lists (`:39-54`): strings among the value objects, compared by their characters. P-166's revision of the same list lands in the same rung. The entry quotes `Specification-1.0-frozen/basic/objects.tex`, says what a return to (b) would need, and names this decision.
6. **Runtimes.** Walk: the library line; the recursion of point 3. Compiled: none until the switch-over (`CompilerLibrary.fss:68` already answers so); then the one library's line serves, and the prelude goes.
7. **Tests.** None change. Add one test on both paths: two flat strings built apart, a flat string against an equal rope, two ropes of different shapes, a substring, `EmptyString` against `""`, through `Any`, and inside a tuple.

### (b) Strings are reference objects, the literal reading

1. **Library.** Nothing. `EmptyString` stays `value` and fieldless, so every `EmptyString` is `SEQV` every other, while two flat `""`s are not (section 3, line 9).
2. **Specification.** One Appendix I entry and a callout at the list (`objects.tex:52-54`), naming strings among the reference objects, so that the text says what it means. No rule changes.
3. **Walk.** `FString.seqv` (`FString.java:35-38`) answers false; `AnyPrim.sequiv`'s identity test (`AnyPrim.java:24`) still makes a string equivalent to itself.
4. **Compiled.** Delete `CompilerLibrary.fss:68`. Strings then fall to `:63`, `equality.sEquiv`, `a == b`. That is Java's `==` on the wrapping objects: false even for two equal literals (section 3, `StrRefComp`, line 1), unlike Java's own interned literals.
5. **Tests.** `compiler_regressions/seqv.fss:22`, the team's test, would print `FAIL 'cat'==='cat'`; it is ungated. No gated test changes. Add one test on both paths that two equal strings built apart are not `SEQV`.

## 8. How they weigh

The coordinator skill's three principles: the team's later word (P-26), the library as the team wrote it, and the peers only where the first two split or are silent (`.claude/skills/coordinator/SKILL.md:95`).

1. **The team's later word.** The prelude, 2010 to 2012, compares strings by text, and a test of 2010 pins it. The specification's only ground for identity is its silence. The later restart is silent too. So the later word points to (a).
2. **The library as the team wrote it.** Walk compares flat strings by text, from 2008. Its identity for ropes is a fallout of the object rule, which makes `SEQV` change with a string's length; nothing in the team's text asks for that. Its one `value` declaration among the strings is `EmptyString`. So the library points to (a), with the rope case as a gap.
3. **The peers.** The first two agree, so the peers do not weigh. As context, Swift, Haskell and Julia agree with (a); only Java's `==` and Python's `is` give (b).
4. **Agreement.** The principles that speak point the same way. The fork is settled by them.
5. **Is it consequential?** By the skill's test (`.claude/skills/coordinator/SKILL.md:99-104`): it touches no model line (section 6, point 1), changes no value the model computes, and changes no `=`. It reverses no decision of the curator; its specification entry sits beside P-166's, in the same rung. It can be undone in one commit: one library line, one spec entry. So it is not consequential, and could land as a default on the review list.

## 9. Recommendation

Take (a): strings are value objects compared by their text, by one `opr SEQV(a: String, b: String)` in the one library, no `value` on `FlatString`, `CatString` or `SubString`, the specification's lists and "Object Equivalence" revised in the revision form with P-166's entry, and walk's run-time recursion brought to the same answer for strings inside tuples, under one test on both paths.
