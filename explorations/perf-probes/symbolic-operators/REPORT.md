<!-- What the compiled type checker would refuse in the library if it also checked overloaded operators written with symbols such as || and [ ], which it skips today, and what moving String's four concatenation operators to the top level, as juxtaposition already is, clears: the full check finds 200 errors in 11 families, the move clears the 40 of those four families and none of the three string errors on the distance, which go by two other library edits. -->

The probe worker returned this text when the harness refused it a report file; the coordinating session wrote it here unchanged on 2026-10-16. The worktree `/home/user/fortress-probe-strings` holds the ways, their generator and the shadow checker.

# String's concatenation pairs and the checker's skip of symbolic operators: a measurement

This is probe P2 of `explorations/reviews/open-asks-2026-10-16.md`, section 3.

- **Where it ran.** On the branch `wip/probe-string-pairs`, in the worktree `/home/user/fortress-probe-strings`. That worktree is at `main` `d19ade2fb` and was seeded from the base build `/home/user/fortress-base16` (`528438ac5`). `main` has changed no code since.
- **How it ran.** Every build, distance stage, program and test ran under `nice -n 19`, one JVM at a time, beside climb batch 16. No timing here is one to compare.
- **What is in the tree.** No tracked file was changed in a commit. The shadow patches are quoted inline. The worktree is left with way JC applied.
- **The three parts.** Step 1 is section 1, step 2 is section 2, and step 3 is section 3.

## 0. In short

- **The full overloading check.** `OverloadingChecker`'s three loops were shadowed so that they admit every operator. The distance run then goes `DISTANCE UP 49 -> 249 (+200)`.
  - All 200 new errors come from the overloading check. They fall in 11 families, listed in the table of section 1.2.
  - String's four families are 40 of the 200.
  - EmptyString's `||` (row 611) is 1, and FlatString's api duplicate (row 726) is 2.
  - The subscripts are 125, the integer power `^` 16 (P1's subject), the arrays' and vectors' `+` and `-` 9, Number's `=` 4, and `|_|` 3.
  - Nothing is gone.
- **The export check.** It reads the same `isDeclaredName` (`ExportChecker.scala:275`). Admitting symbolic names there too adds 2 more export errors (total 251).
- **Walk's own meet check.** With symbolic operators admitted, it refuses the library at load at EmptyString's `||` alone.
  - One declaration on that meet clears it.
  - The whole walk folder then gives the base's verdicts, except that row 611's expected failure is refused at load as its keys name.
  - The ranges' half of row 611 is already repaired (`b872d65a1`).
- **Juxtaposition's device on the four families.** Three top-level operators per family, with the meet declared, clear the 40 pair errors under the full check.
  - The device clears none of the three sites on today's distance.
  - Alone it moves the two `asString` errors to the new top-level declarations: distance 48 with F.
- **The conversion.** The two `asString` sites are freed by the library's own conversion: `("" || a)` on the left, as juxtaposition's own body and `print` do, and `cast[\Object\]` at the bottom. This works with or without the device.
- **FlatString's export error.** It is freed by two lines of its api.
- **With all of them,** `DISTANCE DOWN 49 -> 46 (-3)`, exactly the three sites, with nothing new.
- **What walk sees under the device.** Programs reach the String component's objects' own `||` only through String's abstract `opr ||(self, b:String)`.
  - Moving that member to the top level either changes what kind of string every concatenation builds (JCp) or needs String's api to declare the objects' `||` (JC, 5 lines).
  - Keeping it (JH) is refused by the checker, whose meet must sit at the pair's self position (row 545).
- **What moves under walk.**
  - Any form of the device makes walk refuse at load a program that declares `||` on a trait that does not exclude String. This is seen in `XXXFunctionalMethodMeetOperator`, whose refusal message changes.
  - The conversion makes `(1,2) || "s"`, `() || "s"` and `() // "s"` print where today they stop.
  - Under the conversion a function or a 7-tuple raises `CastError` instead of `ProgramError`.
  - The team test `extendAny` stops with `CastError`, because an object declared `extends Any` is not an `Object` on either path (new defect, section 5).
- **What does not move.** microGPT's quick pair passes 7 of 7 each on JC. The 34 concatenating demos keep their exit codes and outputs, apart from timings, random draws and moved library lines.

## 1. The full overloading check (step 1)

### 1.1 The shadow

`isDeclaredName` admits an `SOp` only when `NodeUtil.validOp` holds:

- `isDeclaredName` is at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:723-727`.
- `validOp` is at `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1466`; it admits capitals, underscores and eight words.
- The checker reads `isDeclaredName` in three loops: the top-level sets (`:236`), the trait and object sets (`:383`), and the overridden-return check (`:392`).
- The export check reads it too (`ExportChecker.scala:275`).
- The parser reads `validOp` (`parser/Fortress.java:58271`, and others), so `validOp` is not the place for a shadow.

The shadow leaves `isDeclaredName`, which the export check reads, unchanged. It adds a second name test for the checker's own loops:

```
-        for ( f <- toSet(functions) ; if isDeclaredName(f) ) {             (:236, and the same at :383, :392)
+        for ( f <- toSet(functions) ; if isCheckedName(f) ) {
+    def isCheckedName(f: IdOrOpOrAnonymousName) = f match {
+        case SOp(_,_,_,_,_) => true
+        case _ => isDeclaredName(f)
+    }
```

- **Build.** It was compiled with `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d <classes> -encoding UTF-8 OverloadingChecker.scala`, where `CP` is `bin/fortress_classpath`.
- **Run.** It went ahead of everything on the class path of a copy of `explorations/coordinator/tools/distance/run.sh`. The copy's one changed line is `-cp "${EXTRA_CP:+$EXTRA_CP:}$SCRATCH/shadow-classes:..."`.
- **Probe.** `OpBlind.fss`, under `fortress typecheck -compiler-lib`, has `||` and `+` pairs over unrelated traits, a `MYOP` pair, and `||` at two self positions in one trait. The base reports only `MYOP`. The shadow also reports both `||` pairs and the two "multiple declarations of || with the same parameter type" errors.

### 1.2 The families it refuses

The library is as on `main`. `compare.sh` was run against `climb-batch-15b/gate/distance.txt`:

    DISTANCE UP   49 -> 249 (+200)
        kind overloading 0 -> 196; kind return-type 2 -> 3; kind other/overloading 0 -> 3
        class M1 0 -> 188 (the Meet Rule); class L1 0 -> 6; class O1 0 -> 2; class R3 2 -> 3; class OT 12 -> 15
        unit api FortressLibrary 0 -> 80; api String 0 -> 21; api FortressBuiltin 0 -> 7; api FlatString 0 -> 6;
        component FortressLibrary 43 -> 122; component FortressBuiltin 0 -> 6; component String 0 -> 1
    #crash none   #shadow every shadow edit matched the tracked sources

The run's `errors.tsv` was compared site by site with `explorations/compile-ladder/gate/distance-sites.tsv`, with numbers masked. None is gone and 200 are new, all of them overloading-check errors:

| Family | Errors | Declarations (line numbers at `d19ade2fb`) | Record |
|---|---|---|---|
| `_[_]` subscript | 107 | 69 distinct pairs in 17 types: `Indexed`, the arrays, the ranges, the mapped and reversed generators, and `Maybe`. All but one pair are `Indexed`'s three subscripts or their overrides: `opr[i:I]`, `opr[r:Range[\I\]]` and `opr[_:TrivialOpenRange]` (`Library/FortressLibrary.fsi:1296`, `:1308`, `:1309`), with `I` unbounded (`:1259`), so none excludes another. The one other pair is `Maybe`'s `[i:ZZ32]` from `Condition` (`:922`) beside `Indexed`'s. | none |
| `_[_]:=` | 18 | The same three shapes for assignment in `MutableIndexed` and `Array` (`:1385-1391`, `:1472-1474`). | none |
| `^` | 16 | `MultiplicativeRing`'s `opr ^(self, other:ZZ64): T` (`:283`) beside each integer type's `opr ^(self, b:AnyIntegral): RR64` (`:472`, `:524`), beside `RR32`'s and `NN32`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:110`, `:167`), and beside `Float`'s two (`FortressBuiltin.fss:158-161`). | P1; rows 438, 441, 445 |
| `\|\|` | 11 | `String`'s `(a:Any, self)` beside `(self, b:Any)` (`FortressLibrary.fsi:2494-2495`, `.fss:4397-4398`) in String, FlatString, Balanceable, CatString, Concatenable, EmptyString and SubString, and in both FortressLibrary units: 10 errors. EmptyString's `(self, String)` beside Concatenable's `(self, EmptyString)` (`Library/String.fss:317`, `:36`): 1 error. | rows 585, 611 |
| `\|\|` same parameter type | 2 | FlatString's api `opr \|\|(self, b:FlatString)` beside `opr \|\|(a:FlatString, self)` (`Library/FlatString.fsi:17`, `:20`). | row 726 |
| `\|\|\|`, `//`, `///` | 10 each | The same pair as `\|\|`, in the same 10 places (`FortressLibrary.fsi:2501-2514`, `.fss:4403-4429`). | row 585 |
| `-`, `+` | 6 + 3 | `AdditiveGroup`'s `+` and `-` (`:267-268`) beside the top-level array-scalar `+` and `-` (`:2694-2700`): 6 errors. One fancy-rule error per name: a top-level Vector or Matrix `+`/`-` (`:1649-1656` or Matrix's) is more specific than a functional method. Which pair is named varies between runs; it was Vector's here and Matrix's in the C, JCp and JC runs. | none |
| `=` | 4 | `Number`'s `opr =(self, other:Number)` (`:293`) beside `StandardPartialOrder`'s `opr =(self, other:T)` (`:180`), in `ZZ`, `Integral` and `BigNum`. | none |
| `\|_\|` | 2 + 1 | `Maybe`: `Condition`'s (`:921`) beside `Indexed`'s (`:1294`). SubString in String's api: `DelegatedIndexed`'s (`:1365`) beside `String`'s (`:2444`). String's api lacks the component's `DelegatedIndexed` parent (`FortressLibrary.fsi:2430` against `.fss:4312`). Return type: `Float`'s `opr \|self\| : Number` (`FortressBuiltin.fss:79`) beside `RR64`'s `: RR64` (`fsi:364`). | none |

By unit, String's four families fall in api FlatString (4), api FortressLibrary (8), api String (20) and component FortressLibrary (8).

### 1.3 Rows 611, 726 and 727 among them

- **Row 611.** EmptyString's `||` is refused, 1 error.
  - The ranges' `opr |self|` is not refused, because it is repaired: `CompactFullRange2D` and `CompactFullRange3D` declare their own (`Library/RangeInternals.fss:1400`, `:1437`), since `b872d65a1` (climb batch 11, rung L).
  - The device on the meet is F-81's: one line in EmptyString, `opr || (self, _:EmptyString): String = self` (after `Library/String.fss:317`).
  - On a probe of the same shape under the shadow (`EMeetBefore` and `EMeetAfter`, `fortress typecheck -compiler-lib`), the refusal "Invalid overloading of || in trait Es: (Conc, Es)->St ... and (Es, St)->St" goes away with that line.
  - Under walk, `EmptyString || EmptyString` answers an `EmptyString` before and after.
- **Row 726.** FlatString's api pair is refused twice, as "There are multiple declarations of || with the same parameter type", once for `(FlatString)` and once for `(FlatString, FlatString)`. Dropping `opr ||(a:FlatString, self)` from the api clears both.
- **Row 727.** The shadow does not change the mechanism: a component's bodiless functional methods stay unread (`OverloadingChecker.scala:83`). A scan of the library's one-line `opr` declarations finds no symbolic operator of that shape. It finds only `IntMap`'s `UNION`, `UPLUS` and `SYMDIFF`, and `Relation`'s `INVERSE`, which are word operators the check already reads.

### 1.4 The export check's own skip

A first run let `isDeclaredName` itself admit every `SOp`, so that the export check (`ExportChecker.scala:275`) read the symbolic top-level sets too. It gave 251, which is 249 plus 2 export errors:

- List's component lacks `<|_|>`, `BIG <|_BIG |>` and `BIG CONCAT` as its api states them.
- RangeInternals' export error names its six `SCMP` and `PCMP` as missing, though the api and the component spell them alike (`RangeInternals.fsi:30-40`, `.fss:87-118`). This was seen in one run and not traced.
- FortressLibrary's export message also lists `BIG SQCAP`, `BIG SQCUP` and Vector's `+` and `-`.

### 1.5 Walk's check

Walk's meet check reads the checker's names (`checkedName`, `interpreter/evaluator/values/OverloadedFunction.java:1237-1241`). It was shadowed to admit every `Op`:

```
-        if (n instanceof Op) return NodeUtil.validOp(((Op) n).getText());
+        if (n instanceof Op) return true;
```

- **Library as on `main`.** Every program stops at load: "Invalid overloading of || in EmptyString: EmptyString provides the functional methods ||(self, String) of EmptyString and ||(self, EmptyString) of Concatenable ... and provides no declaration on". Walk names the first refusal only.
- **With EmptyString's meet line added.** The library loads.
- **The whole walk folder in one JVM, with seed `1a1449d46e1_16`.** It gives `Tests run: 621, Failures: 3`: the base's two (`ReflectTest`, `ReflectiveQuickCheckTest`, which fail the same way on the base in one JVM) and `XXXFunctionalMethodMeetOperator`. That test is now "Refused at load as its keys name", so it is promotable.
- **The rest.** Walk's check does not judge String's pairs, whose self positions differ, nor the subscripts, which are dotted methods. It does not judge `^` and `=` either: it compares the parameters without self, and they are ordered there.

## 2. Juxtaposition's device on the four families (step 2)

### 2.1 What the checker accepts: probes of the shape

The shapes were checked with the shadow, under `fortress typecheck -compiler-lib`. `S` is a trait excluding `N`; `So` is an object of `S`.

| Shape | Full check |
|---|---|
| E: today's shape, `(a:Any, self)` and `(self, b:Any)` in `S` | refused in the API, in `S` and in `So` |
| A: top-level `(Any,S)` and `(S,Any)`, meet = `S`'s abstract functional `(self, b:S)` | refused in the API: no meet |
| B: A plus a top-level `(S,S)` | "Overload violation: the declaration of top-level function \|\| ... is more specific than the declaration of the functional method \|\|" |
| C: only `(a:Any, self)` moved to the top level | refused in the API |
| D: all three top-level, no functional `(self,S)` on `S` | accepted |
| F: D, with `So` declaring its own functional `(self, b:S)` | accepted |

The checker asks the pair's meet at the pair's self position (`meetRule`, `OverloadingChecker.scala:607-613`, `hsp == fsp`). So for `||` the device holds only if String itself no longer declares `opr ||(self, b:String)`. The text accepts A, since a functional method overloads with a function by the Meet Rule for functions (`Specification/advanced/overloading.tex:525-528`). That is row 545's mechanism.

### 2.2 The ways, as shadow patches

**F, FlatString's api (in every way below):**

```
-  object FlatString extends { String }
+  object FlatString extends { String, DelegatedIndexed[\Char, ZZ32\] }
-    opr ||(a:FlatString, self): String
```

**JC, the device with the conversion (left applied in the worktree):**

- In `Library/FortressLibrary.fss`, out of `trait String`: `opr ||(self, b:String):String` (`:4384`), the two `Any` members of `||` (`:4397-4398`), all three `|||` (`:4403-4409`), and the binary three of `//` and of `///` (`:4417-4419`, `:4427-4429`). The prefix `//(self)` and `///(self)` stay.
- In `Library/FortressLibrary.fsi`, the same 13 members leave String's api. Twelve top-level declarations go in before juxtaposition's three.
- The new top level, before `opr juxtaposition(a:Any, b:String)`:

```
opr ||(a:Any, b:String):String = ("" || a) || b
opr ||(a:String, b:String):String =
    typecase a of
        a':FlatString => a' || b
        a':Concatenable => a' || b
        else => concatAndBalanceIfNecessary(a, b)
    end
opr ||(a:String, b:Any):String = a || cast[\Object\](b).asString
opr |||(a:Any, b:String): String = (""||a) ||| b
opr |||(a:String, b:String): String =
    if |a| = 0 then b
    elif |b| = 0 then a
    else a || " " || b
    end
opr |||(a:String, b:Any): String = a ||| (""||b)
opr //(a:Any, b:String): String    = a || newline || b
opr //(a:String, b:String): String = a || newline || b
opr //(a:String, b:Any): String    = a || newline || b
(and /// the same with doubleNewline)
```

- In `Library/String.fsi`, the component's own declarations become visible, `Concatenable`'s (`String.fss:34-37`) and `EmptyString`'s (`:317-318`):

```
   trait Concatenable extends String
+    opr ||(self, other:String): String
+    opr ||(self, _:EmptyString): String
+    opr ||(self, other:Char): String
   end
   value object EmptyString extends {String, Concatenable}
+    opr ||(self, other:String): String
+    opr ||(self, other:Char): String
   end
```

**The other ways:**

- **J**: JC with the two `||` bodies as they were: `a.asString || b` and `a || b.asString`.
- **JCp**: JC with the meet's body `if |b| = 0 then a else concatAndBalanceIfNecessary(a, b) end` (Concatenable's), and no String api lines.
- **JH**: JC, but String keeps its abstract `opr ||(self, b:String):String` in api and component. There is no top-level `||(a:String, b:String)` and no String api lines. This is shape A for `||` and shape D for the other three.
- **C**, the conversion alone, with String's members kept:

```
-    opr ||(a:Any, self):String = a.asString || self
-    opr ||(self, b:Any):String = self || b.asString
+    opr ||(a:Any, self):String = ("" || a) || self
+    opr ||(self, b:Any):String = self || cast[\Object\](b).asString
```

### 2.3 The distance and the full check, per way

Each way was run once with the full-check shadow (C, J, JC, JH) or with the gate's checker (JCp), with the library patched. A full-check run less its symbolic-operator overloading errors equals the gate's run site by site. This was checked twice: `main` (249 less 200 is the landed 49) and JCp (205 less 159 is the gate run's 46).

| Way | Distance (gate checker) | Sites gone / moved | Full check | Full check against 249 |
|---|---|---|---|---|
| none (`main`) | 49 | none | 249 | none |
| C | 46 | FlatString's export error and both `asString` sites gone; none new | 245 | the four families' 40 stay; FlatString's duplicates gone (2); FlatString's `\|_\|` new (1, from F's extends line) |
| J | 48 | FlatString's gone; the two `asString` errors move to the new `FortressLibrary.fss:4447` and `:4454` | 208 | the 40 gone; FlatString's duplicates gone; FlatString's `\|_\|` new; EmptyString's `\|\|` now also refused in String's api (+1) |
| JCp | 46 | the three gone; none new | 205 | the 40 gone; FlatString's duplicates gone; FlatString's `\|_\|` new |
| JC | 46 | the three gone; none new | 206 | as JCp, plus EmptyString's `\|\|` in String's api |
| JH | 46 | the three gone; none new | 207 | the 40 gone; FlatString's duplicates gone; FlatString's `\|_\|` new; the top-level `\|\|` pair refused in the API and in the component (+2) |

- Every table reports `#crash none` and `#shadow every shadow edit matched the tracked sources`.
- The distance with JC is `DISTANCE DOWN 49 -> 46 (-3)`: `kind typecheck 40 -> 38; kind export 3 -> 2; unit component FlatString 1 -> 0; unit component FortressLibrary 43 -> 41`.
- The fancy-rule `-` errors name a Vector pair in some runs and a Matrix pair in others. This happens even in C, which moves no api line, so the choice is the checker's own order, not an effect of a way.

### 2.4 Under walk, the device cuts the route to the string objects' own `||`

- **The route.** A program that imports only the prelude reaches FlatString's, Concatenable's and EmptyString's `||` only through String's abstract `opr ||(self, b:String)`.
- **What a marked meet shows.** The JCp meet's body was marked with `"MARK" || b`. Then `"s" || "t"` printed `sMARKt`, so walk ran the top-level meet for two FlatStrings. Inside FortressLibrary, `"s" || 5` still reached FlatString's own `||`, because FortressLibrary imports FlatString's api, which declares it.
- **Kinds under JCp.** The `CatKinds` probe prints a result's `ilkName` and `depth`. Under JCp, `"s" || "t"`, `EmptyString || "ab"` and `"abcdef"[1#3] || "s"` become `CatString` depth 1, where `main` gives `FlatString` depth 0. The printed values are the same.
- **JC without the String api lines.** The typecase meet re-entered itself for the Concatenable arm until the JVM failed (`BootstrapMethodError` deep in the recursion), from `EmptyString || "ab"` on.
- **With the five api lines (JC), and with JH.** `CatKinds` (14 lines) and `CatPins` (52 lines) print exactly `main`'s output.

### 2.5 What moves under walk, and what does not

**The probes, `CatPins` and the eight one-line programs.** J gives `main`'s values and failures, with library lines moved. C, JC and JH give these changes:

| Expression | `main` | C, JC, JH |
|---|---|---|
| `(1,2) \|\| "s"` | ProgramError "Non-object receiver (1,2) ... asString" | `(1,2)s` |
| `() \|\| "s"` | the same ProgramError | `()s` |
| `() // "s"` | the same ProgramError | `()` newline `s` |
| `"s" \|\| f` or `f \|\| "s"` for a function `f`, and `"s" \|\| (1,...,7)` | ProgramError | `CastError` |

Every other value stays: the 52 lines of `CatPins` (numbers, characters, `()`, 2- to 6-tuples, objects, Booleans, floats, lists, `|||`, `//`, `///`, juxtaposition, `BIG ||`, `join`) and `(1,2) ||| "s"` = `(1,2) s`.

**The walk folder in one JVM** (`SystemJUTest`, `FORTRESS_THREADS=4`, seed `1a1449d46e1_16`, 621 tests):

| Library | Failures | Beyond the base's two |
|---|---|---|
| `main` | 2: `ReflectTest`, `ReflectiveQuickCheckTest` | none |
| J | 3 | `XXXFunctionalMethodMeetOperator` |
| C | 3 | `extendAny` |
| JC | 4 | both |
| JH | 4 | both |

- **`XXXFunctionalMethodMeetOperator`.** On `main` it loads and prints `Vo || 3 = 1`, an expected failure. Under any form of the device walk refuses it at load for another reason, so its keys no longer hold: "first parameters a:[String,Any] and self:[T,ZZ32] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". The pair is the top-level `||(a:String, b:Any)` and the program's `opr ||(self, b: ZZ32)` in `trait T`. Any program that declares one of the four operators as a functional method of a trait not excluding String is refused so. Juxtaposition is in the same place today: `tests/wrapZZ.fss` declares it on an object, which excludes String.
- **`extendAny`** (`ProjectFortress/tests/extendAny.fss`, the team's, 2007). `object Infinity extends Any` with its own `asString`. It prints `Infinity` today, because `b.asString` is a dynamic call on an `Any`. With `cast[\Object\]` it raises `CastError`, since walk does not make it an `Object` (section 5).

**Walk's string tests.** There are 62 files: every `tests/*.fss` that uses `||`, `|||`, `//` or `///`, the ones named for strings, printing or juxtaposition, and the rendering `XXX` tests. Each was run directly from `ProjectFortress/`, on `main` and on JC.

- Outputs are identical, with library lines masked, except for `XXXFnRenderRungS` and `XXXTupleSevenRungS`, which fail with `CastError` instead of "Non-object receiver ... asString". Both stay expected failures in the folder runs.
- The other differences are timings (`ArrayListQuick`, `PureListQuick`, `WordCountSmall`) and random draws (`QuickCheckTest`).
- `RangePrototype` prints in parallel; its 231 lines are identical once sorted.

**The team's demos that concatenate.** These are the 31 runnable demos using the four operators, plus `SatEx`, `Cfa` and `FeatherweightJava`, which import concatenating components. Each ran under walk on `main` and on JC, cut at 120 s; none was cut.

- The exit codes are the same: 20 exit 0, 13 exit 1 and `BirdCount2d` 255, on both.
- The outputs differ only by timings, the random inputs of `conjGrad` and `posFeedback`, and juxtaposition's moved library lines in the overload listings of `BirdCount1m`, `1n` and `1o`.

**microGPT on JC.** The quick pair ran one program at a time, through a copy of `mg-run.sh` without `&`:

- Flat: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0`.
- Apl: the same.

### 2.6 The library's own way to turn any value into a string

- **The library's way.** It is concatenation with the empty string: `print(a:Any) = print("" a)`, "because the formulation with concat also works for tuples" (`Library/FortressLibrary.fss:4498-4501`). Juxtaposition's own `(a:Any, b:String)` is `(""||a) || b` (`:4462`).
- **Where the chain ends.** That chain ends in `||(self, b:Any)` (`:4398`), which calls `asString` on an `Any`: the same site. Tuples of 2 to 6 elements and `()` get there through String's more specific members (`:4387-4396`).
- **What reaches the bottom.** Only objects, functions and tuples of 7 or more elements reach the bottom. For it the library's devices are `assert`'s typecase on `Object` (`:306-316`) and `cast` (`:33-37`, which is that typecase with `throw CastError`). C, JC and JH use `cast[\Object\]`.
- **Functions.** Nothing in the library prints a function (row 374), and nothing here changes that.
- **Not taken, by reading.** Declaring the bottom at `Object` instead of `Any` would leave `"" || a` with `a: Any`, in `print`, juxtaposition and `|||`, with no applicable declaration. So the checker would refuse those bodies.

## 3. One question or two, and which part frees which site

They are two questions, and neither part frees a site of today's distance.

- **Part (a): when the check reads symbolic operators.** This decides whether the four families' shape is a site at all.
  - Today's checker never sees it, so on today's distance part (b) frees nothing.
  - Answered "now", part (a) adds 200 errors in 11 families. String's four are 40 of them; EmptyString's 1 and FlatString's 2 sit beside them.
  - The other 157 need devices of their own: the subscripts 125, `^` 16 (P1's ask), the arrays' and vectors' `+` and `-` 9, `=` 4 and `|_|` 3.
  - Part (b) answers 40 of the 200.
- **Part (b): the device.** Under the full check it frees the four families' 40 pair errors and nothing else. Its forms differ in what they cost:
  - **JC** needs 5 lines of String's api.
  - **JCp** changes the kind of string walk builds.
  - **JH** needs the checker's meet rule to accept a meet at another self position (row 545).
  - **Every form** makes walk refuse a program that declares `||`, `|||`, `//` or `///` as a functional method of a trait not excluding String.
- **The three sites.**
  - `FortressLibrary.fss:4397` and `:4398` are freed by the conversion (C), with or without the device. The device alone moves them.
  - `FlatString.fss:12` is freed by F, FlatString's two api lines. F's first line is also what frees row 726's pair under the full check. F's second line costs one full-check error (FlatString's `|_|`, as SubString's), which aligning String's api header with its component's would remove; that was not measured.
- **The order.** Part (b) matters only once part (a) is answered "check them". Part (a) does not depend on part (b).
- **Walk.** Part (a) costs walk one line (EmptyString's meet) and promotes row 611's test.

## 4. Checks run

| Check | Result |
|---|---|
| Distance, overloading-check shadow, library as on `main` | `DISTANCE UP 49 -> 249 (+200)`; site by site 0 gone, 200 new |
| Distance, both checks admitting symbolic names | 251 (2 more export errors) |
| Distance, gate checker, JCp | `DISTANCE DOWN 49 -> 46 (-3)`; site by site 3 gone, 0 new |
| Full-check distance: C, J, JCp, JC, JH | 245, 208, 205, 206, 207 |
| The same, less the operator errors (the gate's distance) | 46, 48, 46, 46, 46 |
| Shape probes A to F, E (EmptyString) | section 2.1, section 1.3 |
| Walk folder, one JVM: `main`, J, C, JC, JH; walk's check admitting operators plus EmptyString's meet | 2, 3, 3, 4, 4; 3 failures |
| 62 string tests directly: `main`, JC | section 2.5 |
| 34 demos, 120 s cut: `main`, JC | exit codes identical |
| microGPT quick pair, JC | 7 of 7 each |
| `AnyObjectWalk` and `AnyObjectCompiled` | section 5 |

## 5. Decisions, defects, hand-overs

**Decisions.** No POSITIONS entry covers any of them.

1. The shadow admits symbolic operators in the overloading check's own three loops and leaves `isDeclaredName`, which the export check reads, as it is. One run measured both together (251), to separate the export check's 2 errors.
2. Every way carries F, measured with each way, not alone. The FlatString message names both reasons (the extends clause and the method); the two lines were not measured one at a time.
3. The conversion uses `cast[\Object\]`, since `cast` is `assert`'s typecase on `Object`.
4. For `||`, the device's meet delegates by typecase to the objects' own `||` (JC). The two other forms were measured beside it: a body of its own (JCp) and the abstract member kept (JH).
5. EmptyString's meet was measured on a probe of its shape and under walk's check, not on a distance run.
6. The walk folder ran as one JVM. The demos ran at `FORTRESS_THREADS=1`, one at a time.

**Defect, new row.** It belongs in section 12 or the walk section of the ledger. The cell text:

`| ? | an object whose extends clause names Any is not an Object on either path: for object Inf extends Any end, typecase Inf of Object => ... takes the else arm under walk and compiled, so cast[\Object\](Inf) throws CastError | NEGATIVE-VERIFIED | implementation gap (walk) | basic/traits.tex, "Trait Declarations" | none | probe P2 (symbolic operators) | Every trait but Any and Object implicitly extends Object unless it does so explicitly (Specification/basic/traits.tex:186-188); the immediate subtypes of Any are Object, Tuple and () (Specification/basic-lib/objects.tex:19-21). Probe: object Inf extends Any end, object Plain end, kind(x:Any) = typecase x of Object => "an Object" else => "not an Object" end; walk and compiled both print "Inf: not an Object", "Plain: an Object". The team's tests/extendAny.fss passes only because String's opr \|\|(self, b:Any) calls asString on an Any (Library/FortressLibrary.fss:4398, a distance site); with cast[\Object\] there it stops with CastError. |`

**Notes for rows.**

- **Row 584**: with the checker's three loops admitting every operator, the distance's run goes 49 to 249: 200 errors in 11 families (this report, section 1.2). The export check's own `isDeclaredName` (`ExportChecker.scala:275`) adds 2.
- **Row 585**: the device (three top-level operators per family) clears the 40 under the full check and none of the distance's string sites. For `||` its meet must delegate to the objects' own `||`, which String's api must then declare; otherwise walk runs the meet's own body. The hook-kept form is refused by the one-self-position meet (row 545).
- **Row 611**: the ranges' half is repaired (`b872d65a1`, `RangeInternals.fss:1400`, `:1437`). The full check and walk's check, both admitting operators, refuse only EmptyString's `||`; `opr ||(self, _:EmptyString): String = self` clears both, with no value moved.
- **Row 726**: dropping `opr ||(a:FlatString, self)` from FlatString's api clears both full-check errors and half of FlatString's export error.
- **Row 727**: no symbolic-operator site of its shape in the library by a scan of the one-line declarations.

**Not traced.** With the export check admitting symbolic names, RangeInternals' `SCMP` and `PCMP` were reported missing though api and component match. This was seen in one run. No row is proposed until it reproduces.

**For FACTS**:

- **The full check's count.**
  - Fact: admitting symbolic operators to the compiled overloading check takes the distance's run from 49 to 249: 200 errors in 11 families, String's four families 40 of them.
  - What it means: answering row 584 "now" brings 157 errors outside item 38.
  - The number: 200, split as in section 1.2's table.
  - The command: the distance stage with the shadow of section 1.1, output `DISTANCE UP 49 -> 249 (+200)`.
  - Detail: section 1.2.
- **The three string sites.**
  - Fact: they go by `("" || a)` with `cast[\Object\]` in the two `||` bodies and by FlatString's two api lines, 49 to 46 with nothing new. Juxtaposition's device alone only moves the two `asString` sites (48).
  - What it means: the sites do not wait on item 38.
  - The command: the gate's distance with way C.
  - Detail: section 2.3.
- **Walk's route to the string objects' `||`.**
  - Fact: under walk, a program reaches the string objects' own `||` only through String's abstract `opr ||(self, b:String)`.
  - What it means: a top-level meet must delegate to declarations an imported api states, or every concatenation runs the meet's own body.
  - The probe: `CatKinds` under JCp, with `"s" || "t"` a `CatString` of depth 1.
  - Detail: section 2.4.
- **Walk's own meet check.**
  - Fact: admitting symbolic operators to walk's meet check refuses only EmptyString's `||` in the library.
  - What it means: one line clears it, and then the walk folder holds but for row 611's test, which becomes promotable.
  - Detail: section 1.5.

**Commands worked out.**

- **Distance with an extra class directory first:** a copy of `distance/run.sh` whose `java -cp` starts `${EXTRA_CP:+$EXTRA_CP:}`, run as `EXTRA_CP=<classes> nice -n 19 <copy> <out> <scratch>`.
- **The gate's distance from a full-check run:** drop the rows of kind `overloading` and `other/overloading` and the `return-type` rows on `|_|` from `errors.tsv`. Checked equal twice.
- **Sites compared:** two `errors.tsv` files keyed on kind, operator family, location and message, with numbers masked. This is the where-clauses probe's comparison.
- **Walk with a scratch interpreter class:** `java $JAVA_FLAGS -Dfortress.caches=<c> -cp "<classes>:$CP" com.sun.fortress.Shell P.fss`. The walk folder takes the same prefix on its class path.

**Questions for the curator, as decisions not taken.** None is recommended; these are measurements.

- **(a)** When the overloading check reads symbolic operators: before the switch-over, with 200 errors in 11 families, or later. There is no default on record (PLAN item 38).
- **(b)** If (a) is answered "now", the four families' device, among these three:
  - JC: 5 String api lines.
  - JH: the checker's meet at another self position, row 545.
  - JCp: walk's concatenations become `CatString`s.
  - Each form brings walk's new refusal of `||` declared on a trait that does not exclude String.
- **(c)** Whether the conversion's `CastError` for `extendAny` waits on the new defect's repair, or the conversion waits.
