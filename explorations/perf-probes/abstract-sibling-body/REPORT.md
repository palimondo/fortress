<!-- Probe for climb batch 16's Q1: whether the one library and the compiler's library use row 572's shape (an abstract method from one trait, a body from a sibling, none of the type's own), and what Scala's way of accepting it costs in the specification, the checker, walk and the code generator, measured with shadows and reproducers at 423958063. -->

# Q1 probe: an abstract method from one trait, its body from a sibling

**Base.** `main` at 423958063. Its `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml`, `bin/` and both stage tools are identical to climb batch 15b's gate `3cf18a2b3`; `git diff --stat 3cf18a2b3 423958063 -- …` prints nothing.

**Method.** I built a detached worktree in place (`ant compileAll` and the library order), ran everything there, and removed it at the end. Nothing was committed or pushed. The shadows (copies of tracked classes put ahead on the class path) were:

| shadow | what it changes |
|---|---|
| `lifted` | Reading (a). `OverloadingChecker.scala:139-141` keeps every functional method; the `implemented` filter (`:151-156`) stays. |
| `scala` | `lifted`, plus one exemption: an abstract functional method is dropped from a type's set when the type also provides a body from another declaring type with the same self position, the same parameter types without self, and a return type at or below the abstract one's. |
| `scalab` | `scala`, with "another declaring type" narrowed to a sibling (a type not at or below the abstract one's). |
| `scalaeq` | `scalab`, with equal return types only. |
| `scala2`, `scalab2` | The same exemption also on the dotted set (`:387`). |
| `cg` | A bridge in `CodeGen.dumpMethodChaining` for a narrower sibling body. |
| `walk` | Two edits to walk, described in 2.3. |

All reproducers were written for this probe. The ones that matter are quoted.

## Summary

- **The library does not use row 572's shape.** No type in the one library or in the compiler's library inherits an abstract functional method and a sibling's body at the same parameter types without also providing their meet. The scan of the declarations and the shadow checker agree. With the filter lifted, the count stage (its limit raised) and the distance stage give tables and whole outputs identical to the base's.
- **Scala's way is clean for equal parameter and return types inside one component.**
  - Checker: reading (a) plus one exemption.
  - Walk: two edits.
  - Code generator: nothing.
  - Specification: two passages and an Appendix I entry.
  - No other program's result changed in any suite or stage I ran.
- **It reaches further in two cases:**
  - A narrower return type needs a code-generator bridge (I prototyped one and it works) and a fix of the code generator's static choice at the call (not prototyped; the class fails to load with `VerifyError`).
  - Across an api boundary, in either direction, it reaches two code-generator defects that already exist and that valid programs reach today.
- **The record's premise about walk is stale.** Walk does not stop at the call any more. It refuses row 572's shape at load (F-142). Row 572's walk note and Q1's text should be corrected.

## 1. The library's sites

### 1.1 By a scan of the declarations (parser only)

`DeclScan.java` parsed every `.fss` and `.fsi` file of `Library/` and `ProjectFortress/LibraryBuiltin/` with `Parser.parseFileConvertExn`. For every trait and object it read the extends clause and each method: name, self position, parameter types without self, return type, body or not. It shares no code with the checker.

A Python step then:
- took the component's declaration of a type over its api's;
- put in static arguments as text;
- computed "provides" as `traits.tex:573-581` says;
- kept the one library (with AnyType) and the compiler's library (`Compiler*.fs?` and AnyType) as two separate worlds.

A site is a type that provides an abstract declaration and a body of the same name, self position and parameter types, where the body's declaring type is not at or below the abstract one's, and the type declares none of its own.

| shape | functional | dotted | getter |
|---|---|---|---|
| row 572, no meet provided | **0** | 1 | 2 |
| row 572, a third declaration below both provided (valid under every reading) | 9 | 6 | 0 |
| row 727 (one type, abstract and body at one parameter type) | 0 | 0 | 0 |

The compiler's library has no site of any kind.

**The nine functional sites, all with their meet provided.** Each provides `opr INTERSECTION(self, other: Range[\ZZ32\])`:
- abstract in `BoundedRange[\I\]` (`Library/FortressLibrary.fss:4086`);
- a body in `ScalarRange` (`Library/RangeInternals.fss:185`), which is not below `BoundedRange`;
- the meet: `BoundedScalarRange`'s body (`RangeInternals.fss:592`; that trait extends `{ScalarRange, BoundedRange[\ZZ32\]}`).

The types, all in `Library/RangeInternals.fss`:
- objects `LeftScalarRange` (`:675`), `RightScalarRange` (`:844`), `CompactFullParScalarRange` (`:1301`), `CompactFullSeqScalarRange` (`:1347`), `StridedFullParScalarRange` (`:1483`), `StridedFullSeqScalarRange` (`:1584`);
- traits `FullScalarRange` (`:1004`), `CompactFullScalarRange` (`:1268`), `StridedFullScalarRange` (`:1456`).

**The six dotted sites with their meet provided.** Each provides `narrowToRange(other: Range[…])`:
- abstract in `BoundedRange` (`FortressLibrary.fss:4088`);
- bodies in `ScalarRange` (`RangeInternals.fss:192`), `Range2D` (`:249`) and `Range3D` (`:319`);
- met by `RangeInternals.fss:594`, `:647` and `:660`.

The types: `RangeInternals.fss:675`, `:745`, `:790`, `:844`, `:915`, `:960`.

**Unmet sites, none of them functional:**
- **Getter `holds()`** at value traits `Maybe[\T\]` (`FortressLibrary.fss:1624`) and `UniqueItem[\T\]` (`:1703`): abstract in `AnyUniqueItem` (`:1694`), body in `Condition[\E\]` (`:1519`). The objects below them, `Just`, `Nothing` and `NotUnique`, declare their own (`:1637`, `:1667`, `:1713`). Neither overloading check reads getters: `toMethodArrows` keeps only `DeclaredMethod` (`OverloadingChecker.scala:185`).
- **`opr[_:TrivialOpenRange]`** at trait `StandardMutableArrayType` (`FortressLibrary.fss:2304`): `Array`'s abstract (`:2229`, returning `Array[\E,I\]`) beside `Indexed`'s body (`:2014`, returning `Indexed[\E,I\]`). The body's type is above the abstract one's and its return type is wider, so even Scala's way leaves it as it is. No check reads subscript operators.

### 1.2 By the checker's shadow, the filter lifted (reading (a))

**The count stage, its limit raised.** I read "its limit" as F-42's limit: `StaticChecker` returns before the overloading check when a unit already has errors (`StaticChecker.java:268-272`). The FortressLibrary component has 39 errors, so its overloading check is never reached. In my copy of the stage:
- the shadow `StaticChecker` skips that return when `-Dprobe.overloadAnyway=true`;
- the timeout is raised from 900 s to 3600 s;
- the target can be chosen.

| run | table | whole `run.txt` (tree path masked) | seconds |
|---|---|---|---|
| base, tracked tool | equal to 15b's landed `checker-count.txt` (39 / 38) | — | 340 |
| lifted, limit kept | equal to base | identical (F-42: the component's check is not reached; an api's are already read in full) | 339 |
| base, limit raised | 41 / 41: 15b's 39 plus row 433's two return-type errors (`FortressLibrary.fss:3421-3424` against `:3233`) | — | 429 |
| **lifted, limit raised** | **equal to base, limit raised** | **identical** | 407 |
| scala (functional), limit raised | equal | identical; the exemption fired 0 times | 426 |
| scala2 (dotted, any other declaring type) | 40 / 40 | fired 92 times, all where the body's type is at or below the abstract one's (diamonds that pass today anyway); row 488's site `:130` gone | 405 |
| scalab2 (dotted, siblings only) | 40 / 40 | **fired 0 times**; the only difference is row 488's `:130` site | 423 |

- **Against 15b's landed table**, the lifted run with the limit raised differs only in `#total 39→41` and `#locations 38→41`, and the base with the limit raised differs in the same two lines. The difference comes from raising the limit, not from lifting the filter.
- **RangeInternals as the target**, with the limit raised, where the nine met sites are: base, lifted and scalab2 give identical tables and outputs and 0 firings. The one error is the export check, which runs only after an overloading check with no error.

**The distance stage**, all 12 components with every stage run, in my copy of the tool with the shadow ahead:
- base: 49, equal to 15b's landed `distance.txt` row for row, except `#seconds` and `#machine`;
- lifted: 49, table equal, sorted whole output identical, 0 firings;
- scalab2: 48, 0 firings; the one change is row 488's `:130` (class BR).

**The compiler's library.** Under `lifted` the library order compiles all five components, and the jars are byte-identical to the base's. CompilerJUTest under `lifted`, in one JVM at 4 threads: 1,212 tests, one failure: `XXXNoDuplicatesRuleAbstract`, "Saw wrong failure". That is row 727's expected failure, keyed on the code generator's message, now refused by the checker instead, as rung K plans. LibraryJUTest passes (86), and OtherCompilerJUTest passes (263).

**So by both ways, reading (a) moves no site of either library.**

## 2. Scala's way, part by part

### The reproducers

`Q1Sib`:

```
trait A  pick(self): String  end
trait B  pick(self): String = "b"  end
object O extends { A, B } end
viaA(x: A): String = pick(x)
viaB(y: B): String = pick(y)
run(): () = do
  println("O " pick(O)); x: A = O; println("A " pick(x)); y: B = O; println("B " pick(y))
  println(viaA(O)); println(viaB(O))
end
```

Variants:
- `SibRev`: `extends { B, A }`.
- `SibArgs`: `pick(s: String, self)`.
- `SibTrait`: `trait Z extends { A, B } end`, `object O extends Z end`.
- `SibGeneric`: `trait A[\T\] pick(self): T`, `object O extends { A[\String\], B }`.
- `SibDot` and `SibDotRev`: a dotted `m()`.
- `Dup`: row 727's `XXXNoDuplicatesRuleAbstract` program.
- `TwoBodies`: two bodies. `TwoBodiesDot`: two dotted bodies, `O extends {A, B}` and `P extends {B, A}`.
- `TwoAbs`: two abstract declarations; the object declares its own.
- `TwoAbsTrait`: two abstract declarations met in a trait with none of its own; the object below declares its own.
- `RetNarrow`: `A pick(self): R` abstract, `B pick(self): R1 = R1`, where `R1` is an object of trait `R`.
- `RetNarrowStatic`: the same with `o1: R1 = pick(O)`.
- `RetWide`: the return types swapped.
- `Diamond`: `trait C extends A` with the body.
- Api splits: `SibApiUse` has the abstract in an api trait first and the body local. `SibApiUse2` has the abstract local and the body in an api trait second. `SibApiUse2Rev` has the api trait first.

### The verdicts

Columns:
- "Scala, eq" is `scalaeq`.
- "Scala, narrow" is `scalab2` plus `cg`.
- "Walk, Scala" is the walk shadow.

| program | walk today | compiled today | reading (a) | Scala, eq | Scala, narrow | walk, Scala |
|---|---|---|---|---|---|---|
| Sib | refused at load (Meet) | `b` ×5 | refused | `b` ×5 | `b` ×5 | `b` ×5 |
| SibRev | refused | `b` ×3 | — | — | — | `b` ×3 |
| SibArgs | refused | `x b` ×3 | refused | `x b` ×3 | `x b` ×3 | `xb` ×3 |
| SibTrait | refused (in Z) | `b` ×3 | refused (in O and Z) | `b` ×3 | `b` ×3 | `b` ×3 |
| SibGeneric | refused | `b` ×3 | refused | `b` ×3 | `b` ×3 | `b` ×3 |
| SibDot | refused ("does not define an abstract method") | refused | refused | refused (functional only) | `b` ×3 | `b` ×3 |
| SibDotRev | **`b` ×3** | refused | refused | refused | `b` ×3 | `b` ×3 |
| Dup (row 727) | refused | code generator stop | refused, "multiple declarations … (S)" | refused | refused | refused |
| TwoBodies | refused | refused | refused | refused | refused | refused |
| TwoBodiesDot | **`a` for O, `b` for P** | refused | refused | — | refused | `a` / `b` (unchanged) |
| TwoAbs | `o o` | `o o` | `o o` | — | `o o` | `o o` |
| TwoAbsTrait | refused | `o o` | refused | — | refused | refused |
| RetNarrow | refused | **AbstractMethodError** at `pick(O)` | refused | refused | `r1` ×3 (bridge) | `r1` ×3 |
| RetNarrowStatic | refused | **VerifyError** at load | — | refused | **VerifyError** | `r1 r1` |
| RetWide | refused | **AbstractMethodError** | refused | refused | refused | refused |
| Diamond | `c c` | `c c` | `c c` | — | `c c` | `c c` |
| SibApiUse | refused | refused | refused | **code generator crash**, "Not in the trait table: A" | — | — |
| SibApiUse2 | refused | **AbstractMethodError** | refused | refused | — | — |
| SibApiUse2Rev | refused | `b` ×3 | refused | refused | — | — |

SibApiUse2 and SibApiUse2Rev stay refused under `scalaeq` because an api's index carries no bodies, so the exemption does not see the api trait's body.

**Peers, measured.**
- Java 25 refuses `class O implements A, B` (abstract `pick` in A, default in B): "O is not abstract and does not override abstract method pick() in A".
- The tree's Scala 2.13.18:
  - accepts O and the narrower-return O2, which print `b` and `r1`;
  - refuses two concrete siblings: "object P inherits conflicting members";
  - refuses a method declared twice in one trait: "method f is defined twice".

### 2.1 Specification

**Passages that bend.**
- **The override and inheritance definitions** (`Specification/basic/traits.tex:661-667`, or `:573-579`) need one more case: in a trait or object, an abstract method declaration that it inherits is overridden by a method definition that it inherits from another immediate supertrait with:
  - the same name;
  - the self parameter at the same position;
  - the same parameter type, the self parameter's apart;
  - an equal return type (or, for Scala's full rule, a subtype).

  With that case:
  - inheritance (`:575-576`, "except those … overridden") and "provides" (`:580-581`) both leave `A.pick` out of what O provides;
  - the abstract-method rule (`:628-633`) and `objects.tex:154` then find no inherited abstract method;
  - `objects.tex:149-151` already reads this way: "must include a definition for every method declared but not defined by its supertraits".
- **The choice at a call.** Functional applicability is by parameter types alone (`basic/overloading.tex:191-201`). So `A.pick` stays applicable to `pick(O)` beside `B.pick`, and neither is more specific. Today the Meet Rule makes O provide a meet, so the static call has a most specific declaration. Under the change no meet is required, and the static call has none. A sentence is needed, and the text already has it as a draft-only note (`traits.tex:653-655`): "Method declarations that are overridden by some declaration are not accessible." Made normative, as "not applicable to a call whose self argument's type does not provide it", this lets `B.pick` choose the call's type. The compiled checker already types `pick(O)` as `R1` (measured). The run-time rule of an arbitrary maximal declaration (`basic/overloading.tex:309-312`) then chooses between declarations that reach one definition.
- **Appendix I.** An entry and its `\revision` callouts, in the P-96 form.

**Unchanged.** The Meet Rule's wording (`advanced/overloading.tex:417-430` and `:469-485`) stays, because O no longer provides both declarations. P-147's coverage rule is satisfied under both readings: the team's abstract-method check counts inherited bodies (`AbstractMethodChecker.scala:94-107`, team lines).

**Under reading (a)** no normative sentence changes. Under both readings the Appendix I effect sentence at `changes.tex:2622-2627` ("reads no abstract functional method of a trait that the component it checks declares (row 727)") becomes half false.

**The type group's later word.**
- **Welterweight (2012, the calculus behind P-147)** refuses O:
  - `D-Object` checks Meet over `allVisible(O)` (`fig-wellformeddecls.tick:66-81`), which takes every method of every ancestor, abstract ones included (`fig-miscjudgments.tick:77-82`);
  - a method's domain includes its declaring type (`fig-msa.tick:52`);
  - so no third declaration is equivalent to `A ⊓ B` (`Meet-Third`, `fig-meetrule.tick:56`);
  - its `Covered` rule alone would accept O.
- **POPL 2019** has no abstract declarations (`ParkPOPL2019-extract.md:328`), so it is silent.
- **The Dispatch paper** (Steele, Chase, Allen, Luchangco and Ryu, POPL 2011 submission):
  - abstract declarations require objects that inherit them "directly or indirectly" to provide matching definitions (`Papers/Dispatch/body.tick:169-171`);
  - its implementation turns `f` with self at `j` into a dotted `f$j` plus a top-level forwarding function (`:1607-1650`), the scheme both implementations follow;
  - under that scheme the run time has no ambiguity for O.
- **The team's later restart** (`Documentation/Specification/Prose/Language/overloading.tick:24`, `:45`): the run time picks among definitions; the rules promise a unique most specific declaration at compile time. That second promise is the part that needs the call-choice sentence above.

### 2.2 Checker

**The smallest rule.** Reading (a) at `:139-141`, plus one exemption beside `implemented` (`:151-156`): drop an abstract functional method that the type provides beside a body c when:
- c's declaring type is not at or below the abstract one's;
- the self position is the same;
- `oracle.equiv` holds on both domains without self;
- the return types are equal (both directions of `returnBelow`, read as `checkOverridingReturnType` reads them).

For consistency, the same filter goes on the dotted set at `:387`. That is a team line; without it the dotted twin stays refused while the functional one is accepted. The variants are listed under Method above.

**It still refuses:**
- row 727, where the declaring type is the same;
- two sibling bodies;
- an abstract method beside a sibling body with another return type;
- two abstract declarations met in a type with none of its own. Scala accepts this last shape; walk refuses it today.

**It is local:**
- it fires 0 times over the count stage, RangeInternals and the distance stage;
- the compiler's library compiles with no firing;
- the `scala2`+`cg` suites match the `lifted` ones: CompilerJUTest has only the row 727 flip, LibraryJUTest has 86 OK, OtherCompilerJUTest has 263 OK.

**Two caveats.**
- The `scala` variants change 16–18 class files of CompilerBuiltin and 7 of CompilerLibrary, though the exemption never fires there. Only the order of an overload dispatcher's tests between excluding cases changes; for example, `CompilerBuiltin$Unordered`'s SQCAP tests the arrow type before or after `Comparison`. This is F-232 and row 488 territory. `lifted` alone and `cg` alone leave the jars byte-identical.
- Bodies in an imported api are invisible to the rule as built, because an api's index has no bodies. An api declaration without the `abstract` modifier would have to be read as a body.

### 2.3 Walk

**Why it refuses today.** It does not stop at the call. Since 833420ce4 (F-142), the per-provider Meet check refuses at load (`OverloadedFunction.java:1148-1162`): "Invalid overloading of pick in O: O provides the functional methods pick(self) of A and pick(self) of B …".

**What lies beneath.** The object's method table keeps the first declaration of each signature in extends order (`Constructor.java:182-183`, `putIfAbsent` at `:846`, `:854` and `:859`). I ran a shadow with only the Meet exemption:
- `extends { A, B }` is then refused by `checkForDef` (`:425-452`): "Object O does not define an abstract method declared in type A";
- `extends { B, A }` runs `b`.

The old internal error at the call (`MethodClosure.java:88`) is no longer reached by this shape.

**The smallest fix, two local edits:**
1. In `Constructor`, a body takes the place of an abstract declaration of the same signature whatever the extends order, when its return type is at or below the abstract one's.
2. In `FunctionalMethodMeets.check` (`:1156`), a pair of an abstract declaration and a sibling body that implements it needs no meet.

**Evidence.** SystemJUTest with the shadow ran 621 tests. It failed the same two, ReflectTest and ReflectiveQuickCheckTest, as the base does in one JVM with the same seed (`1a13ddfc5c1_16`). Both pass alone, at 1 and at 4 threads, on the base and on the shadow.

### 2.4 Code generator

**With equal return types it already runs B's body for every call form.** Calls typed by O, A and B, through `viaA` and `viaB`, with self second, through trait Z, and on the generic instance all print `b`.

**With a narrower body return type it does not.** Every call dies with AbstractMethodError, `pick(O)` included: O has no method with A's descriptor.
- A bridge in `dumpMethodChaining` (an object only, mirroring how `dumpOverloadedMethodChaining` narrows an object's own declaration) fixes the dispatch: `r1` ×3.
- `o1: R1 = pick(O)` still fails to load. The checker types the call `R1`, but the code generator compiles A's declaration (`R`): "Type R is not assignable to R1". That fix belongs in the code generator's choice of the declaration at a call; I did not prototype it.

**Across an api boundary, two defects that exist today and that valid programs reach (rows below):**
- A body inherited from an api trait that is not first in the extends clause is never forwarded, because `dumpMethodChaining` skips declarations without a body (`CodeGen.java:965`).
- An api trait first, plus a same-named method in a later trait, crashes the compile, "Not in the trait table" (`CodeGen.java:1006`). It crashes even for a valid overloading of `tag(self, n: ZZ32)` and `tag(self, s: String)`, which walk runs and prints `cd`.

## 3. The smallest clean resolution

**Scala's way for equal parameter and return types, within a component:**

| part | change |
|---|---|
| checker | reading (a) plus one exemption, and the dotted twin if the two forms are to agree |
| walk | two edits |
| code generator | none |
| specification | the override case and the normative non-accessibility sentence, plus Appendix I |

Measured: no other program's result changes, the library never triggers it, and rows 727 and 572 close the way Scala closes them.

It reaches further in three directions:
- covariant returns: the code generator's static call choice;
- api boundaries: two code-generator rows;
- two abstract siblings: a further rule that Scala has and the minimal rule does not.

Reading (a) remains one condition with no change to the specification. It agrees with the type group's calculus, with Java and with the specification's letter.

## 4. For the curator

**Question not taken: Q1 (review-queue item 62).** Its sources are listed in §2.1, with peer behaviour measured.

| option | what it changes |
|---|---|
| (a), K's default | refuses everything walk refuses |
| S= | accepts row 572's shape with equal return types, on both paths |
| S< | Scala's full override, covariant returns included; adds code-generator work |

Which keeps current behaviour:
- On the compiled path, S= keeps every run that works today, all of which have equal return types, and refuses only row 727 and the differing-return shapes that crash today.
- In walk, (a) keeps today's verdicts.

**Corrections to the record.**
- Row 572's walk note ("InterpreterBug … row 100's mechanism") and Q1's and K's text are stale. Walk refuses at load (F-142).
- "Row 727 is refused by every source" is overstated. Welterweight's `No-Dup-Abs-Conc` (`fig-meetrule.tick:14`; `static.tick:53`) admits an abstract declaration and a concrete one at an identical domain, and for methods that means one declaring type.
- Climb batch 16's K text says the compiler's library declares no abstract functional method. It does, in the api: `CompilerBuiltin.fsi:37-40` declares `abstract opr ||` and others. These are symbolic and api-side, and the measured guard is clean.

**Defects (rows for `ledger.py add`, each passing `ledger.py check --rows` except the `?` number cell):**

```
| ? | the code generator gives an object no forwarder for a method body that it inherits from an imported api's trait that is not first in its extends clause, so a call of that method on the object dies with `AbstractMethodError` | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/traits.tex`, "Method Declarations" | none | climb batch 16's Q1 probe | `dumpMethodChaining` forwards only declarations with a body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:965` at 423958063), and an api's declarations have none in its index. Probe: api `Q1ApiB` with `trait B pick(self): String end`, its component giving the body `"b"`; a program with `trait C other(self): String = "c" end`, `object O extends { C, B } end`, `pick(O)`: 'Receiver class ...$O does not define or inherit an implementation of ... pick?0()' of interface `Q1ApiB$B`. With `extends { B, C }` it runs `b`, as walk does in both orders. |
| ? | the code generator crashes, 'Not in the trait table: C', on an object whose first supertrait is an imported api's trait and whose later supertrait defines a method of a name that the api's trait declares, also where the two overload validly | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/traits.tex`, "Method Declarations" | none | climb batch 16's Q1 probe | siblings: the row of the api body not forwarded. `dumpMethodChaining` compares the trait of each same-named method of the first supertrait with the body's trait (`typeAnalyzer.equiv`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1006` at 423958063), and the api trait's type is not in the code generator's trait table. Probe: api `Q1ApiC` with `trait C abstract tag(self, n: ZZ32): String end`; a program with `trait D tag(self, s: String): String = s end`, `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`: the compile stops with the RuntimeException; walk prints `cd`. |
| ? | the compiled checker accepts an object that inherits an abstract functional method from one trait and a body of another return type from a sibling trait, and the program dies at its first call: `AbstractMethodError`, or `VerifyError` where it reads the call at the body's narrower type | NEGATIVE-VERIFIED | implementation gap (checker) | `advanced/overloading.tex`, "Meet Rule" | none | climb batch 16's Q1 probe | siblings: 572, 727. Row 572's mechanism (`OverloadingChecker.scala:139-141` at 423958063) with return types that differ: `trait A pick(self): R end`, `trait B pick(self): R1 = R1 end` (`R1` an object of trait `R`), `object O extends { A, B } end`; `pick(O)` dies, 'O does not define or inherit an implementation of the resolved method abstract R pick?0() of interface A'; the same with the return types swapped. `o1: R1 = pick(O)` passes the checker, which types the call `R1`, and the class fails to load, 'Type R is not assignable to R1'. Walk refuses all three at load. |
| ? | under walk an object that inherits two dotted declarations of one signature from sibling traits keeps the one of the first trait in its extends clause: two bodies run that one's, and an abstract one beside a body is refused or runs the body by the order | NEGATIVE-VERIFIED | implementation gap (walk) | `advanced/overloading.tex`, "Meet Rule" | none | climb batch 16's Q1 probe | siblings: 444, 572. The object's methods are keyed by signature (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:182-183` at 423958063) and the first declaration met is kept (`putIfAbsent`, `:846-859`), in the order of the extends clause. `m(): String = "a"` in `A`, `= "b"` in `B`: `object O extends { A, B }` prints `a`, `object P extends { B, A }` prints `b`. With `A`'s `m()` abstract, `extends { B, A }` runs `b` and `extends { A, B }` is refused, 'Object O does not define an abstract method declared in type A'. The compiled checker refuses all four, 'Invalid overloading of m in trait O'. |
```

A note for row 572: walk refuses its shape at load since 833420ce4, "Invalid overloading of pick in O …" (F-142).

**For FACTS:**
1. The two libraries hold no unmet row 572 shape. Nine RangeInternals types have it with their meet provided by `BoundedScalarRange`'s body. Reading (a) and Scala's exemption change nothing there. The evidence is the count stage with the limit raised (lifted and scala identical to base) and the distance stage (lifted 49, identical to base). Detail: §1.
2. The compiled path accepts row 572's shape and runs the body for every call form when the return types are equal, and dies when they differ. The evidence is the Sib and Ret runs. Detail: §2.4.
3. Walk refuses row 572's shape at load. Beneath that check, an object keeps the first declaration of each signature in extends order. The evidence is the SibDotRev and TwoBodiesDot runs. Detail: §2.3.

**Decisions I took.**
- I read "its limit" as F-42's return. Raising only the timeout would show nothing, and the lifted run with the limit kept proves it.
- I narrowed the exemption to siblings. The wider form fired 92 times on dotted diamonds, needlessly.
- I recommend equal return types, the smallest form that needs no code-generator change.
- I included the dotted twin for consistency, as a choice for you.

**P-148.** I ran each count-stage timing alone. Before each run `ps aux` showed no other java or ant process.

| run | seconds | load at start |
|---|---|---|
| base, tracked tool | 340 | 7.00 (decaying after my own suites; nothing running) |
| lifted, limit kept | 339 | 1.51 |
| base, limit raised | 429 | 1.28 |
| lifted, limit raised | 407 | 1.17 |
| scala, limit raised | 426 | 1.11 |
| scala2, limit raised | 405 | 1.14 |
| scalab2, limit raised | 423 | 1.28 |

Machine: nproc 4, Intel Xeon at 2.10 GHz (2100 MHz), openjdk 25.0.4.1, `FORTRESS_THREADS=1`.

All of these are within 6 % of their base, so no change is measurable. Steps 3 and 5–7 (commit, speed pass, memo audit) do not apply to a probe that commits no change and adds no memo. The three distance runs ran in parallel and are not timed comparisons: 1058, 1058 and 1052 s.

**Commands I worked out:**
- **The count stage with its limit raised.** Copy `tools/checker-count/`. In the copied shadow `StaticChecker`, guard the return before the overloading check (copy's `:280`) with `!Boolean.getBoolean("probe.overloadAnyway")`. In `run.sh`, take `D` and `TARGET` from the environment, raise the timeout to 3600, pass `-Dprobe.overloadAnyway`, and prepend `${SHADOW_CLASSES:+$SHADOW_CLASSES:}` to `-cp`.
- **The distance stage with shadows.** Copy `tools/distance/` and make the same `-cp` prefix and `D` change.
- **Suites in one JVM with shadows ahead.** From `ProjectFortress`:

  ```
  FORTRESS_CACHES=$C FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C.tmp" \
    java -Xmx768m -Xss32m -Djava.io.tmpdir=$C.tmp -Dfortress.junit.reset=false -Dfortress.caches=$C \
         -Dfile.encoding=UTF-8 -cp "$SHADOW:$CP" com.sun.fortress.tests.unit_tests.CompilerJUTest
  ```

  LibraryJUTest and OtherCompilerJUTest run the same way. SystemJUTest runs the same way with `-Dfortress.unittests.seed=…`.
- **A trap.** A shadow compile with copied caches is silently skipped if the program's jar is in the copy. Delete the program's entries from the copy first, or the run shows the base's verdict.
- **The scan.** Run `DeclScan` with `-Dstdout.encoding=UTF-8`; otherwise Unicode operator names print as `?`.

**An observation outside the question.** On the base, in one JVM with seed `1a13ddfc5c1_16`, SystemJUTest fails ReflectTest and ReflectiveQuickCheckTest: "Failed to find any matching overload" for `CUP` at `Library/Set.fss:124`. Both tests pass alone. The order dependence comes from state shared across tests, which the gate's four shards hide.
