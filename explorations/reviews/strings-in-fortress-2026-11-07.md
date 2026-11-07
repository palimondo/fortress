<!-- The report on strings in Fortress that the curator asked for on 2026-11-07: representations, balancing, the compiled path, characters past U+FFFF, peers, a program's own `String`, the specification and open points, with four drafted ledger rows; written 2026-11-07 by an Opus worker, reading only, with walk and compiled runs at `1176c7979`. -->

# Strings in Fortress

**The tree.** `main` at `1176c7979`, its build current (both implementation stamps read `180a6844e44e…`). I wrote and ran every program below as a scratch file under walk, `bin/fortress P.fss`, and, where the compiler's prelude allows, compiled, with a private copy of the caches. None is kept. Each result quotes the output. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`.

**Words used throughout.**
- *Walk* is the interpreter. The *compiled path* turns a program into JVM bytecode and runs that.
- The *one library* is walk's library, in `Library/` and `ProjectFortress/LibraryBuiltin/`. The compiled path has its own small library, the *prelude*, until the *switch-over*. Then it moves onto the one library, and the prelude is deleted.
- A *native* is a library declaration whose body is `builtinPrimitive("…")`. The string names Java code that does the work: a *glue class*, which only walk runs, or a *helper*, a static Java method that both paths can call.
- A *row* is a row of the gap ledger, the project's list of known defects.

## 1. The representations

### 1.1 The trait

1. `String` is a trait, not a class. A trait declares members; objects define them. A program sees only the trait: a string literal has the type `String` (`Specification/basic/expressions/literals.tex:57`).
2. The trait is at `Library/FortressLibrary.fss:4341-4460`, its api at `Library/FortressLibrary.fsi:2447-2522`:

```
trait String extends { StandardTotalOrder[\String\], ZeroIndexed[\Char\], DelegatedIndexed[\Char,ZZ32\] }
        excludes { Number, Char, AnyMultiplicativeRing }
```
So a string is totally ordered, and is a sequence of `Char` indexed from 0 by `ZZ32`.
3. The api writes 14 members `abstract`, which every string object defines (F-286): `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)` and `writeOn`. The trait gives the rest bodies. `s[i]` checks the bounds, then calls `get` (`:4371-4380`). `s[r]`, with a range `r`, calls `uncheckedSubstring` (`:4382-4389`). `CMP` compares `get(i)` one by one (`:4368-4369`).
4. Concatenation, `||`, is three top-level operators, at `(Any, String)`, `(String, String)` and `(String, Any)` (F-276). The middle one picks the left side's own `||` by `typecase` (`FortressLibrary.fss:4482-4487`; F-249 says why):

```
opr ||(a:String, b:String):String =
    typecase a of
        a':FlatString => a' || b
        a':Concatenable => a' || b
        else => concatAndBalanceIfNecessary(a, b)
    end
```
Juxtaposition of two strings, `"a" "b"`, is `||` (`:4512-4514`).

### 1.2 The four objects

5. **`FlatString`**: one piece of text in one Java string (`Library/FlatString.fss:34`). Its component is a `native component` (`:12`): walk makes its objects in Java, as the box `FString`, whose one field is a `java.lang.String` (`interpreter/evaluator/values/FString.java:17-20`). It has no Fortress fields. Its members are natives over that Java string: `size` is `length()` (`FlatString.fss:35-36`), `get` is `charAt` (`:83-84`), a substring is Java's `substring` (`:89-90`). Every string literal is a `FlatString`.
6. **`CatString(first, second)`**: the *rope* node. A rope is a binary tree of strings whose leaves are flat. A `CatString` holds two strings and copies neither. Two more fields are computed when it is made (`Library/String.fss:75-79`):

```
object CatString(first: String, second:String)  extends {Concatenable, Balanceable}
    sizeField:ZZ32 = first.size + second.size
    depthField:ZZ32 = 1 + (first.depth MAX second.depth)
```
*Depth* counts the node levels above the deepest leaf: 0 for a flat string, 1 for a node over two flat strings.
7. **`SubString(baseString, range)`**: a view of a range of another string. It copies nothing. Its depth is its base's: "We pretend that substring nodes don't add depth" (`String.fss:353-355`).
8. **`EmptyString`**: the empty string as an object, with no fields. It alone is declared `value object` (`String.fss:282`).

### 1.3 What each operation costs

Here *n* is the string's size and *d* its depth. "Constant" means that the cost does not grow with *n*. I read these costs from the code; I timed nothing.

9. `FlatString`:
- `size`, `get`: constant.
- `uncheckedSubstring`: Java's `substring`, which copies the part. The team's comment, "supports substring without copying" (`FlatString.fss:62`), held for the Java of 2008; Java has copied since JDK 7u6 (Menard, Seaton and Daloze, ManLang 2018, section 6).
- `||`: up to `maxLeafSize` characters in all, a new Java string that copies both sides; above that, a new `CatString`, constant (`FlatString.fss:121-142`).
- `asFlatString`: itself (`:39`).
10. `CatString`:
- `size`: a field, constant.
- `get(i)`: down into the half that holds `i`, one level at a time, up to *d* steps (`String.fss:125-126`).
- `uncheckedSubstring(r)`: down while `r` lies in one half; where `r` crosses a node's two halves, a new `SubString` over that node. Up to *d* steps, no copy (`:148-161`).
- `||`: a new node, constant, unless a short right leaf merges by copy (`:61-71`) or a rebalance runs (1.5).
- `asFlatString`: flattens both halves, then copies them into one Java string, at every level (`:83-87`). So each character is copied once per level above it: about *n* × *d*. Nothing keeps the flat result.
11. `SubString`:
- `size`: the range's extent, constant (`:354`).
- `get(i)`: the base's `get` at `i` plus the range's start (`:480-483`).
- `uncheckedSubstring`: passed to the base, shifted (`:485-491`).
- `||`: a `CatString` over the view, constant.
- `asFlatString`: flattens the whole base, then copies the part (`:357`). A 4-character view of a long rope pays for the whole rope.
12. `EmptyString`: every operation constant; `||` answers the other side (`:325-327`).

### 1.4 What each one prints

13. `asDebugString` shows the tree. A probe printed each value's object (by `ilkName`), size, depth and `asDebugString`. `lower` and `upper` hold the 26 letters of each case, and `c = lower || upper`:

```
show(n: String, s: String): () = do
  println(n ": " s.ilkName ", size " s.size ", depth " s.depth)
  println(s.asDebugString)
end
```
Under walk, rc 0 (lines chosen):

```
2 hello || world, 5 + 6: FlatString, size 11, depth 0
J11/0:hello world
5 26 + 26: CatString, size 52, depth 1
BC52/1:
        J26/0:abcdefghijklmnopqrstuvwxyz
        J26/0:ABCDEFGHIJKLMNOPQRSTUVWXYZ
6 c[24#4], across the halves: SubString, size 4, depth 1
S4= [24:27]
        BC52/1:
                (the two leaves of line 5, indented)
8 c[3#0], empty: EmptyString, size 0, depth 0
E0/0
9 c || "!", short string onto a rope: CatString, size 53, depth 1
BC53/1:
        J26/0:abcdefghijklmnopqrstuvwxyz
        J27/0:ABCDEFGHIJKLMNOPQRSTUVWXYZ!
10 c[24#4] || "xy": CatString, size 6, depth 2
```
14. How to read it:
- `24#4` is the range of 4 indices from 24, that is 24 to 27.
- `J` is a flat leaf: `J`, size, `/`, depth, `:`, the text (`FlatString.fss:112-113`).
- `C` is a rope node, its two halves indented by 8 below it. Before it, `B` means balanced, `b` almost balanced, `u` unbalanced (`String.fss:140-146`).
- `S` is a view: its size, its range, then its base, indented (`:367-369`).
- `E0/0` is `EmptyString` (`:292`).
- Line 9: the `!` joined the right leaf by copy, and no node was added.
- Line 10: a 6-character string of depth 2 keeps the whole 52-character rope alive, through its view.

### 1.5 The rope's balancing

15. **`maxLeafSize`** is the largest leaf that `||` makes by copying (`String.fsi:52-55`, `String.fss:576`):

```
(** The maximum size to which we grow a leaf node (by
      copying) before switching to a CatString of the pieces.
      Clients may assign to this variable **)
var maxLeafSize: ZZ32
```
Its value is 32. `FlatString`'s `||` reads it (`FlatString.fss:123-128`, a comment left out):

```
    elif self.size + b.size > maxLeafSize then
        CatString(self, b)
    else
        flatConcat(self, b)
```
16. **The three tests** compare the size with a Fibonacci number of the depth. `fib` is a table, `fib[0] = 0`, `fib[1] = 1`, up to `fib[46]` (`String.fss:18-27`). `AND:` is the "and" that skips its right side when its left is false. The tests (`:41-45`):

```
trait Balanceable extends String
  getter isBalanced():Boolean = self.depth ≤ 46 AND: |self| ≥ fib[self.depth]
  getter isAlmostBalanced():Boolean = self.depth ≤ 48 AND: |self| ≥ fib[self.depth-2]
  getter isExtremelyUnbalanced():Boolean = self.depth > 30 AND: (¬ self.isBalanced)
end Balanceable
```
So a rope of depth 16 is balanced if it holds at least `fib[16]` = 987 characters. A rope deeper than 30 is extremely unbalanced unless it holds at least `fib[31]` = 1,346,269.
17. **When it rebalances**: only where a concatenation makes a node (`:53-59`):

```
concatAndBalanceIfNecessary(s1: String, s2: String):String = do
    result = CatString(s1, s2)
    if result.isExtremelyUnbalanced
        then result.balanced()
        else result
    end
  end
```
A second overload, at `(CatString, FlatString)`, handles a rope whose right leaf is short: it merges that leaf with the addition by copy, while the two fit in `maxLeafSize` (`:61-71`). That made line 9 above.
18. **How it rebalances** (`:171-180`):

```
    balanced():String
    (*) ensures {outcome = self ∧ outcome.isAlmostBalanced}
    =
      label method
        if self.isBalanced then exit method with self end
        forest = BalancingForest()
        forest.add(self.first)
        forest.add(self.second)
        forest.contents
      end method
```
The forest takes the pieces left to right: a balanced subtree whole, an unbalanced node as its two halves (`:250-262`). The forest is an array of slots; slot *i* holds a string whose size is at least `fib[i]` and below `fib[i+1]` (`:187-188`). Each piece joins the smaller slots and settles where its size fits (`:215-239`). At the end the slots are joined, smallest first (`:190-205`). This is the rebalancing of Boehm, Atkinson and Plass (section 4).
19. **A worked example.** A probe appended one 33-character chunk 31 times, `r := r || chunk`, and printed the depth after each append. Under walk, rc 0 (the list of depths shortened by me):

```
depth after each of 31 appends: 1 2 3 ... 28 29 30 16
final: CatString, size 1056, depth 16, isBalanced true
same text as 32 chunks: true
after 30 appends: depth 30, isBalanced false, isAlmostBalanced false, isExtremelyUnbalanced false
```
Each append made a node one level deeper. At depth 30 the rope is unbalanced, but not extremely, so nothing happened. The 31st append would make depth 31 with 1,056 characters, below `fib[31]`, so `balanced()` ran. The result has depth 16, which passes: 1,056 ≥ `fib[16]` = 987.
20. Why 16, not 5, the depth of a perfect tree of 32 leaves? The test counts characters, not leaves. By my reading, the left spine's node of depth 14 holds 495 characters, at least `fib[14]` = 377, so the forest takes it whole and builds the rest around it. The guarantee bounds the depth at about 1.44 log2(*n*) + 2 levels, not a perfect tree.
21. So, the three cases: `"hello" || " world"` stays flat, since 11 ≤ 32. `"abcdefghijklmnop" || "qrstuvwxyzABCDEFG"` makes a rope, since 33 > 32; it prints `BC33/1` over two leaves. The 31st append above rebalances, from depth 31 to 16.

### 1.6 Who wrote it, and when

22. From `git log --follow -- Library/String.fss` and the files that it was before. The committer is `black`, whom the authorship notes take, unconfirmed, for Andrew P. Black (`research/authorship.md:59`).
- 2008-08-13, `725b9791a`: "The great restructuring of the world consequent on turning String into a trait and making the old flat string objects "JavaString"s".
- 2008-08-15, `08ea5915d`: the first `CatString`, in `Library/CordedString.fss`, renamed `String.fss` on 2008-10-16 (`cf5627135`).
- 2008-08-29: the Fibonacci table and the balancing trait (`00f0dfe8d`, `b729e72a9`).
- 2008-10-28 to 10-30: the forest, "Balancing routines written tested" (`6f95a4303`, `365149aae`).
- 2008-11-11, `9b9e49273`: `isExtremelyUnbalanced` and `concatAndBalanceIfNecessary`; 2008-11-14, `d3bf13292`: the short right leaf's overload.
- 2008-11-17, `083bc5c86`: `maxLeafSize`, and "The plan is to eliminate SubString in the next release". It never was.
- 2009-01-05, `5335ab745`, Jan-Willem Maessen: `JavaString` renamed `FlatString`.
23. `--follow` also lists whole-tree imports of 2012, such as `5a68404fd`, not edits of this file. The revival's edits are five commits of 2026, `d846e3644` to `c8e013faf`.

### 1.7 What a rope is for

24. A flat string's `||` copies both sides, so building a long string by repeated `||` copies about *n*²/2 characters. A rope's `||` makes one node, in constant time, and its substring is a view, with no copy. The price is paid at reads: `get` costs up to *d* steps, and flattening copies about *n* × *d* characters. The leaf rule keeps short joins flat; the balancer keeps *d* small.
25. In Fortress a rope also suits the parallel loops. A `for` over a string calls its generator, and `CatString`'s generator joins the results of its two halves (`String.fss:91-92`, `:272-276`), two arguments that Fortress may evaluate at once. This is my inference from the code; the team's text gives no reason.

## 2. The compiled path

### 2.1 Today

26. The prelude has its own `trait String` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:389-417`) and one trait with bodies below it, `JavaString` (`:421-449`). Every compiled string is one `FJavaString`, a box of one Java string (`compiler/runtimeValues/FJavaString.java:14-19`). There is no rope and no view.
27. Its `||` copies, by Java's `s1 + s2` (`:432`; `nativeHelpers/simpleConcatenate.java:16-18`):

```
opr ||(self, b:Object): JavaString =  jConcatenate(self, b.asString.asJavaString)
```
Its juxtaposition is `|||`, which adds a space (`:406`; row 76). The trait's own `<` and `=` answer `false` until `JavaString` overrides them: "Needs to be replaced by generic definition once big operators work" (`:394-399`).
28. A compiled probe classified each result with `typecase s of JavaString => "JavaString" else => "another String" end`. Compiled and run, rc 0:

```
1 26 || 26: JavaString, size 52
2 "ab" "cd" is ab cd, size 5
3 c.substring(24, 28) is yzAB, JavaString
4 c || 'x': JavaString, size 53
```

### 2.2 At the switch-over

29. The compiled path then compiles the one library with `String.fss` and `FlatString.fss`. Ropes, views and the balancer arrive in compiled programs.
30. What has been measured:
- **The checker.** `String.fss` and `FlatString.fss` hold no checker error (F-83). The gate's distance stage checks both (`explorations/coordinator/tools/distance/run.sh:88`).
- **The code generator.** A probe of 2026-10-23 at `aa5c67d48` ran it on each declaration (`explorations/perf-probes/codegen-distance/REPORT.md`, sections 0 and 4). `String`: 16 checked, 14 emitted, 5 refused: `CatString` and `EmptyString` at calls of the varargs `assert`; `SubString` and `concatAndBalanceIfNecessary` at `asif`, which has no code generation (row 818; `String.fss` holds 8 of the library's 13 sites); `test stringifyChars` at its modifier. `FlatString`: 1 refused, at `assert`. Four `label`s wait behind.
- **The natives.** The string family's 18 helper bindings, and their compiled guard `compiler_tests/NativeHelperFamilyStringCompiled` (F-299). In the one library's world the code generator refuses `FortressLibrary` at the helper classes' wrappers, for want of a converter of `FortressLibrary$String` (row 874). How the compiled path carries the one library's `FlatString` as a Java string is not designed yet (`reviews/string-natives-2026-11-05.md`, section 2.4, point 15).
31. Other compiled rows on strings (a grep of the ledger): 849 (varargs bindings), 76 and 316 (the prelude's juxtaposition and one-sided `||`), 377 (`stringOps` natives at fifteen values), 904 (`?` for non-ASCII in print).

## 3. Characters, down a level

### 3.1 What a `Char` is

32. `Char` is a value object over one Unicode *code point*, the number that Unicode gives a character, from 0 to U+10FFFF (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:611`). Walk holds it in a Java `int`: "Fortress chars are not equivalent to Java chars. Fortress supports 21-bit Unicode, so we use int to represent char instead of just Java char." (`interpreter/evaluator/values/FChar.java:19-21`).
33. `c.codePoint` answers the number (`FortressBuiltin.fss:616-617`), and so does `|c|` (`:618`). `char(n)` makes a `Char` from it (`Library/FortressLibrary.fss:4540`); both name helpers (F-307). `char` also takes a number outside the range (row 857). The literal `'1F600'` is the character of hexadecimal code 1F600, 😀.
34. P-163 decides how a `Char` writes itself as Fortress text, `asExprString`, with a form for a surrogate; walk's binding still names glue until it lands (`FortressBuiltin.fss:614-615`).

### 3.2 What the Java string counts

35. The Java string underneath counts 16-bit *units*, in UTF-16. A code point up to U+FFFF takes one unit. A code point past it takes two, a *surrogate pair*: a high unit from U+D800 to U+DBFF, then a low one from U+DC00 to U+DFFF. 😀 is U+D83D then U+DE00.
36. The probe held `e = "a😀b"`, three characters, and `l = "aλb"`, three characters below U+FFFF. Walk read the emoji in the literal. Two helpers printed the code point of each element, by index and by a `for` loop; `seq(...)` makes a loop sequential:

```
byIndex(s: String): String = do
  var out: String := ""
  for i <- seq(s.indices) do out := out || " " || s[i].codePoint end
  out
end

byLoop(s: String): String = do
  var out: String := ""
  for c <- seq(s) do out := out || " " || c.codePoint end
  out
end
```
Under walk, rc 0 (lines chosen; 55357 is U+D83D, 56832 is U+DE00, 62976 is U+F600):

```
1 |e| = 4, e.size = 4, |l| = 3, l.size = 3
2 e[i] by index: 97 55357 56832 98
3 l[i] by index: 97 955 98
4 e by for loop: 97 55357 56832 98
6 e.indexOf('b') = Just(3), e.indexOf('1F600') = Just(1), l.indexOf('b') = Just(2)
8 e[0#2] by index: 97 55357, size 2
9 e[2#2] by index: 56832 98, size 2
10 e[0#2] || e[2#2] = e: true
11 "x" || '1F600' by index: 120 62976, size 2
12 "x" || '1F600'.asString by index: 120 62976
13 ("x" || e[1]) || e[2] by index: 120 55357 56832, equals "x😀": true
16 "😀" < "�" as strings: true, '1F600' < 'FFFD' as chars: false
17 reverse(e) by index: 98 56832 55357 97
```
37. What each operation counts, for `e`:
- `|s|` and `s.size`: Java units, 4 for 3 characters (`FlatString.fss:35-36`, `:54-55`).
- `s[i]`, `get` and `for c <- s`: Java units. `e[1]` and `e[2]` are the two halves of the pair, each a `Char` that is no character (`FlatString.fss:83-84`, `:45-46`; `nativeHelpers/stringOps.java:31-33`).
- `indexOf`: it searches by code point, through Java's `indexOf(int)`, but answers a unit index (`stringOps.java:35-37`). So `e.indexOf('1F600')` is `Just(1)`, and `e[1]` is U+D83D, not the character.
- `IN`: by code point, the same native, so `'1F600' IN e` is `true` (`FlatString.fss:115`).
- A substring across the character: `e[0#2]` ends in a lone high surrogate, and `e[2#2]` starts with a lone low one. Joined again, they give `e` back (line 10).
- `||` with `'1F600'`: neither. The character loses its top bits and becomes U+F600 (line 11). Walk's glue reads `FChar.getString`, `String.valueOf((char) val)`, under the comment "This needs to get fixed" (`FChar.java:97-102`). `asString` does the same (line 12; row 872). Only joining the two surrogate `Char`s builds the right string (line 13).
- `<` and `CMP`: Java units. So 😀 sorts below U+FFFD, while the two `Char`s compare by code point, the other way (line 16).
- `reverse`: Java units, so the pair comes out low before high, which is not valid text (line 17).
- With `l`, all agree: 3, and 97 955 98.
38. A second probe: `e.upto('1F600')` stops the run, `EmptyReduction` at `Library/FortressLibrary.fss:3308`. `upto` asks `c IN self`, which finds the code point. It then takes `BIG MIN` of each `i` with `self[i] = c`, but no unit equals the character, so the minimum is over nothing (`FortressLibrary.fss:4408-4412`). `beyond` is built the same way (`:4414-4418`).
39. Walk prints it right: UTF-8 bytes F0 9F 98 80 (by `od`), even for `CatString(e[0#2], e[2#2])`, whose halves split the pair.
40. **The compiled path agrees on every count.** Compiled and run, rc 0:

```
1 |e| = 4, |l| = 3
2 e[1].codePoint = 55357, e[2].codePoint = 56832, l[1].codePoint = 955
3 |e.upto('b')| = 3, |e.upto('1F600')| = 1
4 e.beyond('1F600'): size 2, first code point 56832
5 e.substring(0, 2): size 2, last code point 55357
6 "x" || '1F600': size 2, x[1].codePoint = 62976
7 "?" < "?" as strings: true, '1F600' < 'FFFD' as characters: false
8 printed between bars: |a?b|
```
The prelude's `upto` is right, but its `beyond` cuts one unit early, at `k+1` (`CompilerBuiltin.fss:446`), and starts with the low surrogate. The `?` of lines 7 and 8 is the compiled printing of non-ASCII (row 904).
41. The team knew: "This implementation is incorrect for supplementary characters!" (`nativeHelpers/simpleChar.java:17`).

### 3.3 Swift, Java, and where Fortress stands

42. **Swift**, from my own knowledge, unverified here:
- Since Swift 5 (2019), a native string stores UTF-8.
- Its element, `Character`, is an *extended grapheme cluster*: what a reader sees as one character. It can be several code points, as "e" with a combining accent, or a flag.
- Views give the other levels: `unicodeScalars` (code points), `utf8` and `utf16` (units).
- Indices are opaque `String.Index` values; there is no `s[3]`. `count` counts clusters, by walking the text.
- `==` holds for canonically equivalent text, as "é" in one code point or two.
43. **Java**, checked on the tree's JDK, OpenJDK 25.0.4.1, with a small scratch `Peer.java`:
- `char` is one UTF-16 unit: `"a😀b".length()` is 4, `codePointCount` 3, `charAt(1)` 55357, `codePointAt(1)` 128512.
- `indexOf(0x1F600)` is 1, a unit index, as in Fortress. `compareTo` orders by units: 😀 against U+FFFD gives -10176.
- `StringBuilder.reverse` keeps a pair in order: 98 55357 56832 97. Fortress's `reverse` does not.
- `Character.toString(0x1F600)` has length 2; `(char) 0x1F600` is 62976, Fortress's U+F600.
- Since JDK 9, a string of Latin-1 characters is stored in one byte each, a *compact string*; the API still counts UTF-16 units (Menard, Seaton and Daloze, section 6; the storage detail is my own knowledge).
44. **Fortress stands between.** Its `Char` is a code point, like Swift's `Unicode.Scalar`, unlike Java's `char`. Its store is UTF-16, like Java's, and its `String` counts, indexes, slices, loops and orders by units, like Java's, while its element type says code point. So `s[i]` can answer half a character. The specification takes the code-point side (section 6). Nothing in the tree builds grapheme clusters.

## 4. Peers on representation

Facts in this section about systems outside the tree cite a source by name. A fact marked "unverified" is from my own knowledge, checked against nothing.

45. **Ropes.** Boehm, Atkinson and Plass, "Ropes: an Alternative to Strings", *Software: Practice and Experience* 25(12), 1995, designed for the Cedar language at Xerox PARC (Menard, Seaton and Daloze, section 2.2, cite it so). Unverified in detail: a node per concatenation, short leaves joined by copy, a Fibonacci test of length against depth, and rebalancing through Fibonacci slots. `CatString` follows it step by step; its first name, `CordedString`, echoes "cord", the authors' C package. Unverified: the paper calls depth *d* balanced at length F(*d*+2) or more, where `isBalanced` asks only `fib[d]`.
46. **V8**, the JavaScript engine of Chrome, calls its concatenation ropes `ConsString`, and SpiderMonkey has `JSRope` (Menard, Seaton and Daloze, section 6). V8 flattens a rope before it shares the characters (the same). Unverified: V8 makes a `ConsString` only for results of 13 characters or more, and a `SlicedString` as a view for long substrings. The program cannot see which form it holds. This is the nearest living analogue of `CatString` and `SubString`.
47. **Editors**, unverified: xi-editor, Zed and Helix keep buffers as balanced trees of text; VS Code uses a piece table, Emacs a gap buffer.
48. **Swift's `Substring`**, unverified: a separate type that shares its base's storage and keeps the base alive. Fortress's `SubString` is a `String` like any other, and also keeps its base alive (1.4, line 10). Swift also stores up to 15 UTF-8 units inside the string value itself, a *small-string optimisation*; Fortress's nearest rule is the 32-character leaf.
49. **The JVM languages that reuse Java's `String`.**
- Scala: `String` is `java.lang.String`, a long concatenation too (`reviews/string-natives-2026-11-05.md`, section 4, point 2, which ran it).
- Clojure: "Clojure strings are Java Strings." (the same review, point 3, citing clojure.org).
- Kotlin: `java.lang.String` maps to `kotlin.String`; "The mapping only matters at compile time, the runtime representation remains unchanged." (kotlinlang.org, "Calling Java from Kotlin", "Mapped types").
- Groovy, unverified: the same, with `GString` for interpolation.
50. **The JVM languages that tried their own.** What they tried, what it cost or gained, what they kept:
- **JRuby** keeps a Ruby string as bytes: `private ByteList value;` (`org/jruby/RubyString.java` in the JRuby repository, read 2026-11-07). The reason given: Ruby strings are mutable, and "converting every external string to UTF-16 (the internal encoding of Java String) would be expensive in a language supporting strings with different encodings"; its byte lists share by copy-on-write for literals and substrings, but have no lazy concatenation, and a string is limited to 2 GB (Menard, Seaton and Daloze, section 6). The cost: a Java API needs a `java.lang.String`, and `decodeString()` decodes one from the bytes at each call (the same file). JRuby also carries its own regular expressions over bytes, Joni, a "Java port of Oniguruma regexp library" (the Joni README, read 2026-11-07).
- **TruffleRuby** (Ruby on GraalVM) went further, to ropes: `ConcatRope`, `SubstringRope` and a lazy `RepeatingRope`, with leaves that record their encoding, and each node records its byte length, character length and hash. It never rebalances, accepting that indexing "may degrade to a linked list if the tree is extremely unbalanced", and it caches a flattened byte array at the root. Against the C Ruby, MRI: string equality slightly slower than byte arrays, since it flattens first; character retrieval by index 6.8 times faster, mostly from knowing the character length; an ERB template 9.4 times faster, where TruffleRuby's own byte buffers ran 2.7 times and JRuby, without invokedynamic, 1.7 times (Menard, Seaton and Daloze, "Specializing Ropes for Ruby", ManLang 2018, sections 3 to 7). What it kept: TruffleRuby's strings were re-implemented "again" in 2022 as a blend, "a ropes-based representation as well as a mutable byte array", chosen per call site (Kevin Menard, "Rethinking Strings", RubyKaigi 2023, transcript on rubyevents.org); its 22.3.0 release notes say "TruffleString is now used to represent Ruby Strings".
- **Jython** keeps Python's `unicode` in a Java string, in UTF-16, but indexes by code point, as Python requires. A string with no surrogate pair uses the `BASIC` translator, which passes indices through. One with a pair gets a `Supplementary` translator, a table of pair counts per block of 16, searched at each index (`org/python/core/PyUnicode.java` in the Jython repository, read 2026-11-07). This is the price of a code-point API over a UTF-16 store, the price that Fortress's `String` does not pay today (section 3).
- **Rhino** and **Nashorn**, the JavaScript engines in Java, each add a `ConsString`: a rope node that implements `CharSequence`, flattens on `toString()` or `charAt()`, and keeps the flat result. Rhino's comment: "optimized for concatenation using the "+" operator"; "Both the name and the concept are borrowed from V8." (`ConsString.java` in the Rhino and Nashorn repositories, read 2026-11-07).
- A lesson from outside the JVM: PyPy "has concatenation ropes, and earlier versions experimented with additional rope operations such as lazy substrings, but useful speedups were not observed and the more complex ropes were removed" (Menard, Seaton and Daloze, section 6).
51. **What the peers teach.** The JavaScript engines flatten once and keep the result; Fortress flattens at each `asFlatString` and keeps nothing (1.3). TruffleRuby kept ropes for measured gains, with a mutable byte array beside them. PyPy dropped lazy substrings for want of gains. Jython shows the cost of code-point indexing over UTF-16.
52. **Why Fortress did not reuse Java's `String`, as far as the team's text says.** It says little.
- No commit message gives a reason. `String` became a trait, so that several objects could be strings, two days before the rope (`725b9791a`).
- The comments speak only of cost and unfinished work: "if this were to be used heavily, we should collect the result in a StringBuffer" (`String.fss:82`); "this is a placeholder, until I write the better code using split, or eliminate SubString entirely" (`:362-363`).
- The specification's library part has no chapter on strings. Its listings are typeset from the apis (F-162), so they say what `FortressLibrary.fsi` says.
- `git grep` of `a874948ac`, the team's last commit, finds "rope" and "cord" only in demo data.

## 5. Extending `String` from a program

53. **The trial.** A program's own object, `Rep(ch, n)`: a string of `n` copies of one character, held as the character and the count. It extends `String`, defines the 14 abstract members and `asDebugString`, and imports `String.{...}`, `FlatString.{...}` and `Stream.{...}`:

```
object Rep(ch: Char, n: ZZ32) extends String
    getter size(): ZZ32 = n
    getter depth(): ZZ32 = 0
    getter asFlatString(): String = do
        var t: String := ""
        for i <- seq(0#n) do t := t || ch end
        t.asFlatString
    end
    getter isBalanced(): Boolean = true
    getter asDebugString(): String = asDebugStringIndented(0)
    verify(): () = ()
    asDebugStringIndented(indent: ZZ32): String = spaces(indent) || "R" || n || "/0:" || ch
    get(i: ZZ32): Char = ch
    uncheckedSubstring(r: Range[\ZZ32\]): String =
        if r.isEmpty then EmptyString else Rep(ch, |r|) end
    rangeContains(r: Range[\ZZ32\], c: Char): Boolean = (NOT r.isEmpty) AND c = ch
    splitWithOffsets(): ZeroIndexed[\(ZZ32, String)\] = Nothing[\(ZZ32, String)\]
    split(): Generator[\String\] = Nothing[\String\]
    balanced(): String = self
    opr ||(self, c: Char): String = if c = ch then Rep(ch, n + 1) else self.asFlatString || c end
    writeOn(stream: WriteStream): () = stream.write(self.asFlatString)
end
```
Under walk, with `r = Rep('a', 5)`, rc 1 at the last call:

```
1 |r| = 5, r.size = 5, ilk Rep
2 r.asDebugString = R5/0:a
3 println(r):
aaaaa
4 r = "aaaaa": true, "aaaaa" = r: true, r = Rep('a', 5): true
5 r < "aab": true, "aab" < r: false, r CMP "aaaaa": EqualTo
6 r || "xyz": CatString, size 8, depth 1, text aaaaaxyz
7 "xyz" || r: FlatString, size 8, text xyzaaaaa
9 r || 'b': FlatString, text aaaaab
11 'a' IN r: true, r.indexOf('a'): Just(4)
13 printlnWithThread(r):
 Thread 26: aaaaa
15 match("a+", r):
Closure/Constructor for match parameter 2 (some:FlatString) got type Rep
```
54. **What works:** `||` both ways, `=` both ways, `<`, `CMP`, `|r|`, slicing (`r[1#3]` is a `Rep` of 3), `IN` and `println`; `match("a+", r.asFlatString)` is `true`. `=` and `<` come from the trait's `CMP`, which reads `get`.
55. **The Meet Rule pairs it meets: none.** The *Meet Rule* asks, for two declarations of one name whose parameter types overlap without nesting, a third declaration at their overlap. `Rep`'s own `||` is at `(Rep, Char)`. It lies inside the top-level `(String, Any)`, and it implements the trait's abstract `(String, Char)`. It cannot overlap `(Any, String)` or `(String, String)`, since `Char` excludes `String`. It cannot overlap `FlatString`'s or `Concatenable`'s `(…, Char)`, since an object excludes every type that it does not extend. So an object below `String` meets nothing, and walk loaded it without complaint. F-276's need for `excludes { String }` or a meet is for a program's own *trait* with a functional `||` that can overlap `String`.
56. **How it reaches the natives: through `asFlatString`.** A program cannot bind a helper of its own with a parameter declared `String`: walk's loader refuses it at load, since no Java type carries a string that is not flat (F-299; test `tests/NativeHelperNonFlatStringWalk`). The library's natives over strings take `FlatString`. Those with an overload over `String` flatten by `typecase` on `asFlatString`, as `printlnWithThread` does (`FortressLibrary.fss:4640-4644`; line 13). Those without refuse `Rep` at the call, as `match` did (line 15; `:4615`). So `asFlatString` must answer a real `FlatString`.
57. **What else breaks, or surprises:**
- `r || "xyz"` is a `CatString` of 8 characters (line 6): the top-level `||` sends any other left side to `concatAndBalanceIfNecessary`, which always makes a node.
- `r.indexOf('a')` is `Just(4)`, not 0 (line 11). `Rep` inherits the generic `indexOf`, which answers "an index at which e can be found" from a parallel loop (`FortressLibrary.fss:2040-2048`). A rope does the same: in a third probe, the same 52 characters gave `Just(26)` as a `CatString` and `Just(0)` flat.
- A second run without `Rep`'s own `asDebugString` printed `a Rep: aaaaa`, `Object`'s default, and `r.asExprString` printed `no expression for aaaaa`. The api's `String` asks neither of a string object.
- `r SEQV Rep('a', 5)` and `"aaaaa" SEQV r` were `false`, and `r SEQV r` was `true`: `Rep` is a reference object.
- Without `writeOn`, walk refused the program at load: "Object Rep does not define an abstract method declared in type String: …/Library/FortressLibrary.fss:4449:5-41: writeOn(WriteStream):()" (P-147).
58. Not tried compiled: the prelude's `String`, which the switch-over deletes, has other members.

## 6. What is specified and what is the library's

59. A grep of `Specification/` (`.tex`, whole words, any case): `String`, 236 lines in 29 files; `rope`, `CatString`, `maxLeafSize`, none; `FlatString`, 3 lines, all in the revival's Appendix I entry on natives (`appendices/changes.tex:4489-4520`); `substring`, 6 lines of typesetting examples and one unrelated use (`appendices/rendering.tex:334-392`, `ascii-to-unicode.tex:414`). The type is named `\TYP{Char}` at `basic/lexical-structure.tex:816`, and `\TYP{Character}` at `basic/expressions/literals.tex:40`, `basic/expressions/constant.tex:47` and `basic/types-vals-vars.tex:575`.
60. What the specification says of strings:
- **Characters.** "every character in a Fortress program is associated with a single code point" (`basic/lexical-structure.tex:121-126`). A footnote treats canonically equivalent characters as identical, in program text (`:107-113`).
- **Character literals.** A character literal "evaluates to a value of type Char, which represents an abstract Unicode character" (`:816-817`). It may also be written as hexadecimal digits, `'1D11E'`, or a name (`:860-891`).
- **String literals.** A string literal "evaluates to a value of type String, which represents a finite sequence of abstract Unicode characters" (`:945-946`). Straight or curly double quotes delimit it. It has three kinds of escape: the character-literal escapes, restricted-word escapes as `\AND`, and quoted-character escapes as `\'beta'` (`:966-1016`). The parser builds only the first kind (row 200).
- **Typing.** "A string literal has type String." (`basic/expressions/literals.tex:57`). `String` is among the "simple standard types for literals", and "Values of these types are immutable." (`basic/types-vals-vars.tex:572-581`).
- **The library part** "is largely automatically generated from the API code" (`library/structure.tex:25-31`), from a `FortressLibrary.tex` that the tree does not hold; so the type's mention there is the api's text (F-162). The chapters `basic-lib/` and `advanced-lib/` have none on strings.
61. So the representation, the four objects, `maxLeafSize`, the balancing and the substring view are the team's library text alone, written by one author in 2008. The specification fixes only that a string is an immutable sequence of characters, each one code point.

## 7. Open points for the curator

62. **Size, index, loop and slice count Java units, not characters.** `"a😀b"` has size 4, and `s[1]` is a surrogate; both paths (3.2, lines 1 to 9). No row: draft A.
63. **Strings order by units, `Char`s by code point.** `"😀" < "�"` is `true`, `'1F600' < 'FFFD'` is `false`; both paths (line 16). No row: draft B, `CONTESTED`, since the specification says nothing of order.
64. **`upto` and `beyond` at a character past U+FFFF.** Walk stops with `EmptyReduction`; the compiled `beyond` starts with a lone surrogate (points 38, 40). No row: draft C.
65. **`||` with a `Char` past U+FFFF keeps its low 16 bits**, on both paths (line 11). Row 872 has the mechanism for `asString`, but its claim names only `asString`, and its notes have 70 characters left (`ledger.py note 872 … --check`). Draft D, its sibling; or the coordinator rewrites 872 to cover both.
66. **`indexOf` answers a unit index**, so `s[s.indexOf(c).get]` is not `c` for such a character (line 6). In draft A.
67. **No library function makes a string from a code point past U+FFFF.** `char(n).asString` and `||` truncate (row 872, draft D); only a literal, or two surrogate `Char`s joined, works (line 13). No row.
68. **Strings under `SEQV`: decided.** P-168 makes strings reference objects, strictly equivalent only when they are one object; text equality is `=`. It overrules the equivalence review's recommendation of value objects (`reviews/string-equivalence-2026-11-06.md`, section 9).
69. **`indexOf` differs by representation:** `Just(0)` flat, `Just(26)` as a rope (point 57); the api allows "an index" (`FortressLibrary.fsi:1356-1358`). No row: should `String` promise the first?
70. **A program's string has no `asExprString`:** `no expression for aaaaa` (point 57). No row.
71. **Flattening keeps nothing:** each `asFlatString` of a rope copies again (point 51). A cost, not a defect.
72. **A small view keeps a large rope alive:** 6 characters hold 52 (1.4, line 10), as Swift's `Substring` does. A cost, not a defect. The team's comment that a flat substring does not copy is out of date (point 9).
73. **The specification names the type twice:** `Char` and `Character` (point 59); the one library says `Char`, the prelude `Character`. No row.
74. **Rows already open on strings:** 607 (`rangeContains` finds only the first occurrence), 609 (`"abcdef"[:3:2]` is `bd`), 846 (a program's glue binding over `String` reads a rope's type name), 900 (a rope written to a `FileWriteStream` stops the run), 904 (`?` for non-ASCII), 364 (walk infers `Cell[\FlatString\]` from a literal).

## 8. For the record

75. **Defects.** Four, without rows, drafted for the coordinator to file with `ledger.py add` in "10. Strings, maps and printing". Each passed `ledger.py check --rows`, numbered 991 to 994 for the lint. The probes were scratch, so each reproducer is `none`.

Draft A:

    | ? | a `String` sizes, indexes, slices and iterates by Java's 16-bit units, not by characters: under walk `"a😀b"`, three characters, has size 4, `s[1]` and `s[2]` are the surrogates U+D83D and U+DE00, a `for` over it gives four `Char`s, and `s[0#2]` ends in a lone surrogate | NEGATIVE-VERIFIED | library gap vs spec (library) | `basic/lexical-structure.tex`, "String Literals" | none | review strings-in-fortress-2026-11-07 | siblings: 872. `FlatString`'s `size` and `get` name `simpleConcatenate.nativeStrlen` and `stringOps.charAt`, Java's `length()` and `charAt` (`Library/FlatString.fss:35-36`, `:83-84`, at 1176c7979); the rope's `get` and the generators rest on them. `indexOf('1F600')` answers 1, a unit index; `reverse` puts U+DE00 before U+D83D. The team's own comment: 'This implementation is incorrect for supplementary characters!' (`nativeHelpers/simpleChar.java:17`). Compiled, the prelude's `JavaString` answers 4, 55357 and 56832 too. `bin/fortress` on `e = "a😀b"` printing `\|e\|` and each `e[i].codePoint`: '4', '97 55357 56832 98'. |

Draft B:

    | ? | `String`'s `<` and `CMP` order by Java's 16-bit units, so a character past U+FFFF sorts below U+E000 to U+FFFF, against `Char`'s order by code point: under walk `"😀" < "�"` (U+1F600, U+FFFD) is `true` and `'1F600' < 'FFFD'` is `false` | CONTESTED | design limit (library) | silent | none | review strings-in-fortress-2026-11-07 | `FlatString`'s `cmp` names `stringOps.compareTo`, Java's `compareTo`, which orders by units (`Library/FlatString.fss:85-86`, `nativeHelpers/stringOps.java:23-25`, at 1176c7979); `trait String`'s `CMP` compares `get(i)`, also units, for the other objects (`Library/FortressLibrary.fss:4368-4369`); `Char`'s `<` names `simpleChar.charLT` on code points (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:621-622`). Compiled, `JavaString`'s `<` is `jCompareTo` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:426`): 'true' and 'false' too. Contested: the specification says nothing of string order, and Java orders by units. |

Draft C:

    | ? | under walk `String`'s `upto` and `beyond` stop with `EmptyReduction` at a character past U+FFFF that the string holds, as `"a😀b".upto('1F600')`; compiled, the prelude's `beyond` cuts one unit early and answers a string that starts with the lone surrogate U+DE00 | NEGATIVE-VERIFIED | library bug (library) | silent | none | review strings-in-fortress-2026-11-07 | `upto` and `beyond` test `c IN self`, which a `FlatString` answers by `javaIndexOf`, Java's `indexOf(int)`, which finds the code point; then `BIG MIN` takes each `i` with `self[i]=c`, but `self[i]` is a unit, so none matches (`Library/FortressLibrary.fss:4408-4418`, `Library/FlatString.fss:115`, at 1176c7979). Expected: 'a' and 'b'. The prelude's `beyond` takes `substring(k+1, \|self\|)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:446`): size 2, first code point 56832. `bin/fortress` on `println("a😀b".upto('1F600').size)`: 'EmptyReduction' at `Library/FortressLibrary.fss:3308`. |

Draft D:

    | ? | `\|\|` of a string and a `Char` past U+FFFF keeps only the character's low 16 bits: under walk `"x" \|\| '1F600'` is two units, `x` and U+F600, and compiled the same | NEGATIVE-VERIFIED | implementation gap (runtime) | `basic/lexical-structure.tex`, "Character Literals" | none | review strings-in-fortress-2026-11-07 | siblings: 872. Walk: `FlatString`'s `\|\|(self, b:Char)` calls `flatConcat(self, b)`, bound to the glue `FlatString$Concat`, which takes `other.getString()`, and `FChar.getString` is `String.valueOf((char) val)` (`Library/FlatString.fss:96-97`, `:144-149`; `interpreter/glue/prim/FlatString.java:173-178`; `interpreter/evaluator/values/FChar.java:97-102`, at 1176c7979). Compiled: `JavaString`'s `\|\|` takes `b.asString`, row 872's helper (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:432`). Workaround: join the two surrogates as `Char`s, `("x" \|\| e[1]) \|\| e[2]`. `bin/fortress` on `"x" \|\| '1F600'`, each unit's code point: '120 62976'. |

76. **Sentences of the specification made false:** none. Nothing was changed.
77. **Decisions** (mine; no decision of the curator covers them): draft B is `CONTESTED`, since the specification is silent on order and Java orders as walk does; the `||` truncation is a new row, D, since 872's notes are nearly full. Section 4's JVM languages with strings of their own were added at the curator's request.
78. **For FACTS:** none. The findings are defects, for the rows.
79. **Commands:** none beyond the skill's.
80. **Question for the curator**, a decision not taken: does a Fortress string count code points or Java units? The specification and `Char` say code points; every operation measured counts units, on both paths. Points 62 to 67 hang on it. Jython's way (point 50) keeps the Java store and pays a table only for strings that hold a pair.
