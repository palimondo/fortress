<!-- The worked examples of Park, Hong, Steele and Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance", POPL 2019 (`research/extracts/ParkPOPL2019.pdf`, its text `ParkPOPL2019.txt`), and of Gyunghee Park's talk on it (`research/extracts/ParkPOPL2019-talk.md`), sorted into what each can do for the test suite: (A) a test of a rule the revival implements, (B) a rule the revival does differently, (C) a feature the revival lacks. Written 2026-10-10 at the coordinating session's brief, for the coordinating session, which plans the next batch, and for the curator, Pavol. Every Fortress form below was run under walk and through the compiled path on the tree at 75be286ac (its code unchanged since 19561b245, the commits between touching the record only; built, caches kept); nothing in the original tree was edited, and no ledger row was opened. Page numbers are the paper's (11:1 to 11:28); slide numbers are the talk's. -->

# The POPL 2019 examples, sorted for the test suite

## In short

- The paper and the talk hold 24 worked examples once the talk's builds that repeat a paper example are folded into it: 11 in group A, 4 in group B, 9 in group C.
- Of the 11 in group A, today's tree fails 5: four on one path, and one (A8) on both, which its gated expected failures already record. Two tests derived from group B and C examples fail too:
  - walk loads an object that inherits `m(x: Number)` with a body from two unrelated traits (p. 11:2; row 444's family);
  - walk loads `f(x: B): C` beside `f(x: C): B` with `object C extends B`, the talk's "NOT TYPE-SOUND" set (slide 4; a new row);
  - walk loads two generic `sort`s bounded by `A` and by `B` with no declaration at their meet (p. 11:5, slide 7; row 373);
  - the compiled path refuses the talk's opening `add` set, because the compiler prelude's `ZZ32` is an open trait (slide 2; a new row);
  - the paper's `ArrayList`/`List` triple fails on both paths, as its gated expected failures say (p. 11:13; rows 537 and 539);
  - derived: the paper's `sort` set with its meet written `P extends { A, B }` dies compiled (row 537), and the invariant core of the paper's `sort`/`merge` example fails on both paths (p. 11:7; one new compiled row, one walk row optional).
- Group B holds no new question for Pavol. The paper's two sets that rest on "C is the only subtype of both A and B" become valid in Fortress through `comprises` clauses, which the revival's Meet Rule reads as coverage; the union instance of `O.m(3, true)` is his decision for the bound; the No Duplicates wording is row 696.
- Group C waits on the `covariant` keyword (row 404), lower bounds on a method's type parameters, and the static return type carried to run time (phase 5).

## How the examples were run

- Each Fortress form is a test program in the form the `fortress-repo` skill gives (`tests-writing.md`, "A test program"): `component Name`, `export Executable`, the declarations shown, and `run(): () = do ... end` with the body shown. The scratch copies live in the tree's ignored `tmp/` and are not committed.
- Under walk: `bin/fortress walk P.fss`. Compiled: `bin/fortress compile P.fss`, then `bin/fortress run P`. Both with `FORTRESS_CACHES` pointing at a private copy of `default_repository/caches`, so the shared caches took no scratch entry.
- The existing tests named below were run through the harness: `harness-one.sh` on `XXXOverloadExistentialMeetWalk.fss` and `XXXGenericBesidePlainSameDomain.fss` printed `OK (2 tests)`; `junit.sh` with `ONE_JVM=1` on `OverloadExistentialMeetLink.test`, `XXXOverloadExistentialMeet.test`, `XXX2f.test`, `GenericInstanceUnfixedLink.test` and `XXXGenericInstanceUnfixed.test` printed `OK (5 tests)`, each `XXX` file as "Saw expected failure".
- In FGFV a method is called `e.m(e')`; the Fortress forms use top-level functions, which the revival overloads by the same rules (`Specification/basic/overloading.tex`, "Principles of Overloading"). FGFV's classes become traits, or objects where the example needs a value.
- An overloading that breaks a rule is a static error on both paths: the rules are "checked statically" for the declarations, "whether or not these calls actually appear" (`Specification/advanced/overloading.tex`, "Principles of Overloading"). Walk checks overload sets when it loads a program (`fortress-repo` skill, `interpreter.md`, "What walk checks"), so its form of a static error is a refusal at load.

## Group A: rules the revival implements

### A1. Two traits each give `m(x: Number)` a body; an object extends both (p. 11:2)

- **Source.** §1: classes `A` and `B` each declare `m` at `Number`, `C` extends both, and `c.m(0)` is ambiguous, "because neither A nor B is more specific than each other".
- **Fortress form.**

      trait A  m(x: Number): ZZ32 = 1  end
      trait B  m(x: Number): ZZ32 = 2  end
      object C extends { A, B } end
      run body: println(C.m(0))

- **Expected.** A static error on both paths. `C` provides both dotted methods, `(A, Number)` and `(B, Number)` are neither ordered nor incompatible, and `C` provides no declaration at their meet (`advanced/overloading.tex`, "Meet Rule", paragraph "The Meet Rule for Dotted Methods").
- **Today.** Compiled: refused, "Invalid overloading of m in trait C: (A, Number)->ZZ32 ... and (B, Number)->ZZ32". Walk: loads and prints `1`. With `trait C extends { A, B }` and an object below it, walk prints `1` too.
- **Existing tests.** Walk: `ProjectFortress/tests/XXXDottedMethodMeetInheritedWalk.fss`, the diamond with one abstract and one concrete `g` (row 444's diamond shape). Compiled: none of this shape; the functional-method diamonds `XXXFunctionalMethodMeetSelfSecondNoMeet` and `XXXFunctionalMethodMeetInheritedFromApi` are its siblings.
- **Test.** New, and a failing one under walk: `tests/XXXDottedMethodMeetBothBodiesWalk.fss` with a `.test` file, `load_exception_contains=Invalid overloading of m`, recorded under row 444. Compiled, new and green: `compiler_tests/XXXDottedMethodMeetBothBodies.test`, `compile` with `compile_err_contains=Invalid overloading of m in`.

### A2. `m1` at `(B, C)` beside `m1` at `(C, B)`, with `C` below `B` (p. 11:4; slide 4, first build; slide 3, the three-declaration build)

- **Source.** §2.1: `m1(x: B, y: C): B` and `m1(x: C, y: B): B`; `m1(c, c)` is ambiguous "due to symmetric multiple dispatch". Slide 4 returns `C` from the second; slide 3 has the same crossing pair as `add` over `List` and `SortedList`, beside `add(List, List)`.
- **Fortress form.**

      trait B end
      object C extends B end
      m1(x: B, y: C): B = x
      m1(x: C, y: B): B = y
      run body: println(m1(C, C))

- **Expected.** A static error on both paths: neither parameter type is a subtype of the other, they do not exclude, and no declaration is at `(B, C) ∩ (C, B)`, which is `(C, C)` (`advanced/overloading.tex`, "Meet Rule", paragraph "The Meet Rule for Functions").
- **Today.** Both refuse. Compiled: "Invalid overloading of m1 in component ...: (B, C)->B ... and (C, B)->B". Walk: "Overloading of ... m1(x:C,y:B):B ... and ... m1(x:B,y:C):B ... fails because (first) x is more specific than (second) x but (first) y is less specific than (second) y". Slide 3's `add` set without its fourth declaration gives the same two refusals.
- **Existing tests.** Compiled: the team's `compiler_tests/Compiled2.f.fss` through `XXX2f.test`, `f(x: O, y: T)` beside `f(x: T, y: O)`, refused today. Walk: the team's `tests/XXXoverloadTest5.fss`, `a(s: S, t: T)` beside `a(t: T, s: S)`, an expected failure with no `.test` file, green while walk refuses it.
- **Test.** Exists on both paths. Nothing new; a `.test` file naming walk's message, `load_exception_contains=is less specific than`, would pin the refusal's cause, which the bare `XXX` name does not.

### A3. `m2` at `A` beside `m2` at `B`, two unrelated traits (p. 11:4; slide 6, first builds)

- **Source.** §2.1: `m2(x: A): Boolean` and `m2(x: B): Boolean`; `m2(c)` is ambiguous "due to multiple inheritance". Slide 6 returns `C` from both.
- **Fortress form.**

      trait A end
      trait B end
      object C extends { A, B } end
      m2(x: A): Boolean = true
      m2(x: B): Boolean = false
      run body: println(m2(C))

- **Expected.** A static error on both paths. The specification's own `bar(x: Printable)` beside `bar(x: Throwable)` is this pair, "statically rejected" (`advanced/overloading.tex`, "Meet Rule").
- **Today.** Both refuse. Compiled: "Invalid overloading of m2 in component ...: A->Boolean ... and B->Boolean". Walk: "first parameters x:[B] and x:[A] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present".
- **Existing tests.** Walk: the functional-method form, `tests/FunctionalMethodMeetInherited.fss`, carries this message. Compiled: the team's `Compiled5.j` (`XXX5j.test`) refuses a closed form of it. Neither has the two plain traits.
- **Test.** New on both paths, green today: `tests/TwoTraitsNoMeetWalk.fss` with `load_exception_contains=are unrelated (neither subtype, excludes, nor equal)`, and `compiler_tests/XXXTwoTraitsNoMeet.test` with `compile_err_contains=Invalid overloading of m2`.

### A4. A declaration at the meet whose return type is too wide (slide 4, middle build)

- **Source.** Slide 4 only: beside `m1(x: B, y: C): B` and `m1(x: C, y: B): C`, the disambiguating `m1(x: C, y: C): B` makes the call's run-time type `B` where its static type is `C`, "NOT TYPE-SOUND!".
- **Fortress form.**

      trait B end
      object C extends B end
      m1(x: B, y: C): B = x
      m1(x: C, y: B): C = x
      m1(x: C, y: C): B = y
      run body: c1: C = C; c2: B = C; r: C = m1(c1, c2); println("ran")

  The smallest form of the same defect is `f(x: B): C = C` beside `f(x: C): B = x`.
- **Expected.** A static error on both paths: `m1(C, C)` is more specific than `m1(C, B)`, and its return type `B` is not a subtype of `C`, so no rule makes the pair valid (`advanced/overloading.tex`, "Subtype Rule", paragraph "The Subtype Rule for Functions and Functional Methods").
- **Today.** Compiled: refused, "For m1, the return type of (C, C)->B ... should be a subtype of the return type of (C, B)->C"; the smallest form, "the return type of C->B ... should be a subtype of the return type of B->C". Walk: loads and prints `ran`; the smallest form prints `C`. With `trait C extends B` and `object Co extends C` in place of `object C`, walk refuses: "fails because the first parameter list is a subtype of the second, but the first result is not a subtype of the second".
- **Why walk loads it.** Walk's pair check skips the parameters at which the two lists are equal, and marks the pair excluding when every other parameter of one list is an object type (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:427-433` and `:486`, the team's code at 75be286ac). An object trait type "excludes any type that is not its supertype" (`Specification/basic/types-vals-vars.tex`, "Object Trait Types"), and `B` is a supertype of `C`, so the mark is wrong and the return-type condition is never checked. Row 99 records the shortcut's sound use, an object unrelated to the other parameter.
- **Existing tests.** None of this shape. The compiled refusals that name an overload's return type are of generic declarations (`the return type of Circle->Circle`, `Round->Round`) and of a declaration that covers two closed traits' overlap (`XXXCoverageReturnBad.test`, `V->LeftResult`); no walk test names walk's message.
- **Test.** New, and a failing one under walk: `tests/XXXReturnRuleObjectParamWalk.fss` with `load_exception_contains=the first result is not a subtype of the second`, under a new row (candidate R1 below). Compiled, new and green: `compiler_tests/XXXReturnRuleMeetCrossing.test` with `compile_err_contains=should be a subtype of the`.

### A5. The crossing pair with its meet, called through a wider static type (p. 11:4; slides 3 to 5, last builds)

- **Source.** §2.1: `d11: m1(x: B, y: C): B`, `d12: m1(x: C, y: B): C`, `d13: m1(x: C, y: C): C`, valid by the Meet Rule for `d11` and `d12` and by the return-type condition for the rest. Slide 4: `c1` of static type `C` and `c2` of static type `B`, both holding a `C`: static resolution picks `d12`, of type `C`, and dispatch runs `d13`. Slide 3's fourth `add(SortedList, SortedList): SortedList` is the same shape.
- **Fortress form.**

      trait B end
      object C extends B end
      var ran: String = "none"
      m1(x: B, y: C): B = do ran := "BC"; x end
      m1(x: C, y: B): C = do ran := "CB"; x end
      m1(x: C, y: C): C = do ran := "CC"; x end
      run body: c1: C = C; c2: B = C; r: C = m1(c1, c2)
                assert(ran, "CC", "the values (C, C) run the declaration at the meet")

- **Expected.** Valid on both paths; the static call has type `C` (`r: C` checks), and the call runs `m1(C, C)`, the most specific declaration applicable to the values (`Specification/basic/overloading.tex`, "Overloading Resolution").
- **Today.** Both print `PASS`. Slide 3's form, `add` over `(List, List)`, `(List, SortedList)`, `(SortedList, List)` and `(SortedList, SortedList)` called on `a: List` and `b: SortedList`, both holding a `SortedL`, asserts `"SS"` and prints `PASS` on both paths.
- **Existing tests.** Compiled: the team's `Compiled2.g.fss`, the crossing pair with its meet, is only type-checked (`AfterTypeChecking.test`); nothing runs the dispatch. Walk: none of this shape.
- **Test.** New on both paths, green today: `tests/DispatchCrossingMeetWalk.fss` and `compiler_tests/DispatchCrossingMeet.fss` with `compile`, `link`, `run` and `run_out_contains=PASS`.

### A6. Two generic `sort`s bounded by `A` and by `B`, no meet (p. 11:5; slide 7, first builds)

- **Source.** §2.2: `sort[P <: A](x: ListI[P]): SortedListI[P]` and `sort[P <: B](x: ListI[P]): SortedListI[P]`, with `ListI` invariant; `sort(l)` for `l` of run-time type `ListI[C]` is ambiguous.
- **Fortress form.**

      trait A end
      trait B end
      trait C extends { A, B } end
      object ListI[\X\] end
      object SortedListI[\X\] end
      sort[\P extends A\](x: ListI[\P\]): SortedListI[\P\] = SortedListI[\P\]
      sort[\P extends B\](x: ListI[\P\]): SortedListI[\P\] = SortedListI[\P\]
      run body: println(sort(ListI[\C\])); println("ran")

- **Expected.** A static error on both paths: the two parameter types meet at every `ListI[P]` with `P` below both bounds, neither declaration is more specific, and no declaration of the set covers the overlap (`advanced/overloading.tex`, "Declarations with Static Parameters", the Meet Rule).
- **Today.** Compiled: refused, "Invalid overloading of sort ...: [\P extends A\]ListI[\P\]->SortedListI[\P\] ... and [\P extends B\]ListI[\P\]->SortedListI[\P\]". Walk: loads, prints `SortedListI[\C\]` and `ran`.
- **Existing tests.** None. Row 373 ("walk accepts two generic overloads whose domains overlap and runs one for a call both apply to") has no reproducer.
- **Test.** New, and a failing one under walk: `tests/XXXGenericBoundsNoMeetWalk.fss` with `load_exception_contains=at least one pair of parameters must have excluding types` (walk's message for two generic declarations, row 539), as row 373's reproducer. Compiled, new and green: `compiler_tests/XXXGenericBoundsNoMeet.test` with `compile_err_contains=Invalid overloading of sort`.

### A7. A generic declaration applies to every subtype of its bound (p. 11:5)

- **Source.** §2.2: `m[P <: A](x: P): P` "is applicable to Bottom, C, and A".
- **Fortress form.** `m[\P extends A\](x: P): P = x`, called on an `A` held as `A` and on an object `C extends A`, with `name()` telling them apart. `Bottom` cannot be written in Fortress, as in FGFV (p. 11:9).
- **Expected.** Both calls run (`basic/overloading.tex`, "Applicability to Named Functional Calls": a declaration with static parameters applies when some instance does).
- **Today.** Both paths print `PASS`.
- **Existing tests.** `compiler_tests/InferContextKeepsFit.fss` (`k[\T extends N\](x: T): T` on an `NOf`) and `tests/DispatchDeclaredDomain.fss` (`describe[\T extends Shape\](x: T)` on a `Square`).
- **Test.** None new.

### A8. The `ArrayList`/`List` triple (p. 11:13)

- **Source.** §4.2: `m[P](x: ArrayList[P])`, `m[Q <: T](y: List[Q])`, `m[R <: T](z: ArrayList[R])`, with `ArrayList` below `List` and both invariant. The set is valid, though the domains' intersection is not a subtype of the third's domain; existential reduction closes the gap by instantiation exclusion.
- **Fortress form.** The tree's `compiler_tests/XXXOverloadExistentialMeet.fss` and `tests/XXXOverloadExistentialMeetWalk.fss`, in the names `Seq`, `ArraySeq` and `Num`.
- **Expected.** Valid on both paths; an array of numbers runs the third, an array of strings the first (`advanced/overloading.tex`, "Declarations with Static Parameters": exclusion "by existential reduction").
- **Today.** Both fail, as gated. Walk refuses at load (row 539, "OK Saw expected exception"); the compiled run dies, "Unable to read serialized data for XXXOverloadExistentialMeet?$\=m{...}" (row 537).
- **Test.** Exists on both paths. Nothing new.

### A9. Inference from an invariant position (pp. 11:24-25)

- **Source.** §5.4: a `List[String]` passed to `foo[T](x: List[T])` binds `T` to `String`, the cheap invariant case of run-time inference.
- **Fortress form.**

      object Lst[\T\] end
      object Tag[\T\] end
      foo[\T\](x: Lst[\T\]): Tag[\T\] = Tag[\T\]
      same[\T\](a: Tag[\T\], b: Tag[\T\]): String = "same"
      run body: assert(same(foo(Lst[\String\]), Tag[\String\]), "same", "T is String")

- **Expected.** `T` is `String` (`Specification/basic/inference.tex`, "The Static Arguments of a Call", the first item of "Instantiation").
- **Today.** Both paths print `PASS`.
- **Existing tests.** The shape is inside many tests, for example `compiler_tests/InferUnionInstanceArg.fss` (`one[\T\](a: BoxT[\T\])`) and `compiler_tests/DispatchRenamedArmRungG.fss`.
- **Test.** None new.

### A10. Symmetric dispatch over `List` and `SortedList`, beside `add` over numbers (slide 2)

- **Source.** Slide 2 only: `add(Int, Int)`, `add(Int, Int, Int)`, `add(List, List): List`, `add(SortedList, SortedList): SortedList`; `a: List` and `b: SortedList` both hold a `SortedList`, and dispatch runs the last.
- **Fortress form.**

      trait List end
      trait SortedList extends List end
      object PlainL extends List end
      object SortedL extends SortedList end
      add(a: ZZ32, b: ZZ32): ZZ32 = a + b
      add(a: ZZ32, b: ZZ32, c: ZZ32): ZZ32 = a + b + c
      add(a: List, b: List): List = PlainL
      add(a: SortedList, b: SortedList): SortedList = SortedL
      run body: a: List = SortedL; b: SortedList = SortedL; r: List = add(a, b)
                assert(typecase r of SortedList => "sorted"; else => "list" end, "sorted", ...)

- **Expected.** Valid; the call runs `add(SortedList, SortedList)` (`basic/overloading.tex`, "Overloading Resolution"). Validity of `add(ZZ32, ZZ32)` beside `add(List, List)` rests on exclusion: the one library declares `trait ZZ32 ... comprises { Int }` (`Library/FortressLibrary.fsi:531-533`) and `value object Int extends ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`), so every `ZZ32` value is an `Int`, an object that excludes `List` (`types-vals-vars.tex`, "Object Trait Types"; `advanced/overloading.tex`, "Incompatibility Rule").
- **Today.** Walk prints `PASS`. Compiled: refused, two errors, "Invalid overloading of add ...: (List, List)->List ... and (ZZ32, ZZ32)->ZZ32" and the same for `(SortedList, SortedList)`. The compiler prelude declares `trait ZZ32 extends { Number, ... } excludes { ZZ64, RR32, RR64 }` with no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`), so a user trait may extend it. Without the two-argument `add` over `ZZ32`, both paths print `PASS`.
- **Existing tests.** None of this shape.
- **Test.** New on both paths, green today: the form without the two-argument `ZZ32` declaration, `tests/DispatchSymmetricSortedWalk.fss` and `compiler_tests/DispatchSymmetricSorted.fss`. A failing one, compiled only: `compiler_tests/XXXOverloadZZ32BesideUserTrait.test`, `compile` with `compile_err_contains=Invalid overloading of add`, under a new row (candidate R2) that the switch-over closes; walk runs the same program as a plain test.

### A11. The talk's form of the crossing pair (slide 3)

- **Source.** Slide 3 sets single, asymmetric and symmetric dispatch side by side on `add(List, List)`, `add(List, SortedList)` and `add(SortedList, List)`. Single dispatch would take the second, asymmetric the third; symmetric dispatch finds the call ambiguous and needs `add(SortedList, SortedList)`.
- **Fortress form, expected outcome and today.** A2 (without the fourth declaration: refused on both paths) and A5 (with it: `PASS` on both paths). Fortress dispatch is symmetric, so neither of the other two answers is a Fortress outcome.
- **Test.** A2's and A5's; either may be written in the talk's names.

### Derived from groups B and C

Two examples outside group A have a core that tests a rule the revival implements. Both fail today.

- **A-B2. The paper's `sort` set with its meet written as an intersection of bounds** (from B2, p. 11:6, slide 7). Fortress form: A6's two declarations, returning `String`, and `sort[\R extends { A, B }\](x: ListI[\R\]): String = "A and B"`; `sort(ListI[\C\])` asserts `"A and B"`, and `sort(ListI[\Ao\])` for `object Ao extends A` asserts `"A"`. Expected: valid, the third covers the overlap (`advanced/overloading.tex`, "Declarations with Static Parameters"). Today: walk prints `PASS`. Compiled with the paper's one name `P` for all three, the compile stops, "java.util.zip.ZipException: duplicate entry: ...$sort...$\=?Arrow?...ListI?P?,fortress\|CompilerBuiltin\%String?.class"; with `P`, `Q` and `R`, the program compiles, and the run dies after printing `REACHED`, "Unable to read serialized data for ...$\=sort{...}". Both are row 537, whose notes already name the duplicate class name. Test: `tests/GenericBoundsMeetWalk.fss`, plain and green; compiled, `compiler_tests/XXXGenericBoundsMeet.fss` with `GenericBoundsMeetLink.test` and `XXXGenericBoundsMeet.test` (`run_out_contains=REACHED`), a third reproducer for row 537, low priority.
- **A-C4. The invariant core of the paper's `sort`/`merge` example** (from C4, p. 11:7, slides 9 and 16). The paper's point survives without variance: a declaration that only dispatch reaches, whose type parameter only the return type mentions, must run at the instance the call's static type gives.

      trait Lst end
      object Lone extends Lst end
      object Ltwo extends Lst end
      trait A end
      object Sorted[\P\] end
      sort(x: Lst): Sorted[\A\] = Sorted[\A\]
      sort[\P\](x: Ltwo): Sorted[\P\] = Sorted[\P\]
      merge[\P\](x: Sorted[\P\], y: Sorted[\P\]): String = "merged"
      run body: l1: Lst = Lone; l2: Lst = Ltwo; println("REACHED")
                assert(merge(sort(l1), sort(l2)), "merged", "sort(l2) runs the generic declaration at Sorted[A]")

  The pair is valid: the generic one is more specific, and its instance at `A` meets the return-type condition. Expected: `sort(l2)` is typed `Sorted[\A\]` by the plain declaration, dispatch runs the generic one "at the instance in which each type parameter is the intersection of the upper bounds placed on it", here `A` from the static type of the call (`basic/overloading.tex`, "Overloading Resolution"; POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`"), and `merge` returns `"merged"`. Today: walk prints `REACHED`, then "Unification error: Closure/Constructor for merge param 1 (x:Sorted[\Any\]) got arg Sorted[\A\] of type Sorted[\A\]": walk has no static type of the call, so `P` takes its bound `Any`, as the section's `revival-dispatch` callout says of walk. Compiled: the checker accepts and the main class fails verification before `run` prints, "java.lang.VerifyError: Bad return type ... PoplReturnOnlyInstance.sort(LPoplReturnOnlyInstance$Lst;)... Type 'PoplReturnOnlyInstance$Sorted?P?' ... is not assignable to 'PoplReturnOnlyInstance$\=Sorted?PoplReturnOnlyInstance\%A?'": the dispatcher returns the uninstantiated template. Existing: `compiler_tests/XXXGenericInstanceUnfixed.fss` (row 538) gates the case where the parameter is a parameter's whole type; nothing gates a return-only parameter. Test: compiled, `compiler_tests/XXXGenericInstanceReturnOnly.fss` with `GenericInstanceReturnOnlyLink.test` and `XXXGenericInstanceReturnOnly.test` (`run_out_does_not_contain=REACHED`), under a new row (candidate R3); walk, `tests/XXXGenericInstanceReturnOnlyWalk.fss`, under row R4 if the coordinator opens it.

## Group B: rules the revival does differently

### B1. `m2` at `A`, `B` and `C`, valid because `C` is "the only subtype of both" (p. 11:4; slide 6, last build)

- **Source.** §2.1 assumes "class C is the only subtype of both classes A and B" and calls `d21: m2(x: A)`, `d22: m2(x: B)`, `d23: m2(x: C)` valid, `d23` being "the meet of the first two declarations" under the older calculus FF, whose meet is defined among the declarations. Slide 6 adds `m2(x: C): C` the same way.
- **What departs.** Fortress components are open: a later type may extend both `A` and `B`. The revival's Meet Rule asks for a declaration on `A ∩ B`, or for declarations that together cover every value of both, and "it is not necessarily the case that S = (P ∩ Q) since another type may be more specific than both" (`advanced/overloading.tex`, "Meet Rule", and its `revival-meet` callout: "the paper of 2019 has no traits with comprises clauses"). Fortress states the paper's assumption with `comprises` clauses, which FGFV lacks (p. 11:3).
- **Fortress forms and today.**
  - Plain traits `A` and `B`, `object C extends { A, B }`, the three `m2`: refused on both paths, compiled "Invalid overloading of m2 ...: A->String ... and B->String", walk "first parameters x:[B] and x:[A] are unrelated ...". That is the revival's rule.
  - With `trait A comprises { C, Ao }`, `trait B comprises { C, Bo }`, objects `Ao`, `Bo` and `C extends { A, B }`: valid; `m2(a)` for `a: A` holding `C` asserts `"C"`, `m2(Ao)` asserts `"A"`; both paths print `PASS`.
- **Ledger and questions.** None: the text settles it (POSITIONS, "The `comprises` passages read at the level of values (PLAN item 26, row 491)"). `ComprisesMeetCompiled.fss` and `ComprisesMeetWalk.fss` gate the coverage, and the team's `Compiled5.j` the refusal where the listed traits do not exclude.

### B2. `sort` bounded by `A`, `B` and `C`, valid because `C` is the only subtype of both (p. 11:6; slide 7, last build)

- **Source.** §2.2: `d3: sort[P <: C](x: ListI[P])` disambiguates `d1` and `d2` of A6, under §2.1's assumption; the return-type condition for `d1` and `d3` holds because `ListI` is invariant, so each `ListI[X]` has exactly one instance of `d1`.
- **What departs.** As in B1: the third declaration covers the overlap only where `comprises` clauses make it so (`advanced/overloading.tex`, "Declarations with Static Parameters": "declarations of the set ... that together cover every argument to which both are applicable also satisfy the Meet Rule", with its `revival-meet` callout).
- **Fortress forms and today.**
  - Plain traits: compiled refuses, "Invalid overloading of sort ...: [\P extends A\]ListI[\P\]->String ... and [\P extends B\]ListI[\P\]->String", which is the revival's rule. Walk loads it and runs the third, `PASS`, which breaks the revival's rule: row 373, as in A6.
  - With `trait A comprises { C, Ao }`, `trait B comprises { C, Bo }`, objects `Ao` and `Bo`, `trait C extends { A, B }`, and the parameters named `P`, `Q`, `R`: the compiled checker accepts the set by coverage, and the run dies, "Unable to read serialized data for ...$\=sort{...}" (row 537). Walk prints `PASS`.
  - With the meet written `R extends { A, B }`: A-B2 above.
- **Ledger and questions.** None new: rows 373 and 537 hold the two failures. The compiled checker accepts the closed form; this note did not trace whether its coverage check or its reading of the `comprises` clauses in the overlap does it.

### B3. `O.m(3, true)` annotated at the union `Int ⊔ Boolean` (p. 11:21)

- **Source.** §5.2.5: `object O' [Q] m'(x: Q): Q`, `object O m[P](x: P, y: P): P = O'[P].m'(x)`, and the typed call `O.m(3, true): (Int ⊔ Boolean)`; at run time the dispatcher infers `P` as the union, and the union then flows into `m'`.
- **What departs.** The revival's static inference gives such a parameter its bound, "the intersection of its upper bounds: its declared bound, Any if it has none", never the union (`Specification/basic/inference.tex`, "The Static Arguments of a Call", with its `revival-inference` callout; POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`": "never the union of the arguments' types"). The paper gives no static inference algorithm (p. 11:25), and its dispatcher, given the static type `Any`, would take `Any` too; so the departure is from the paper's example, not from its rules.
- **Fortress form.** `object Op[\Q extends Any\] end`, `m[\P extends Any\](x: P, y: P): Op[\P\] = Op[\P\]`, and `kind(m(3, true))` by a `typecase` over `Op[\Any\]` and `Op[\Object\]`.
- **Today.** Both paths print `PASS`: `P` is `Any`. Written as the paper writes it, with no bound, walk prints `PASS` and the compiled checker refuses `Op[\Any\]`, "The static argument Any does not satisfy the corresponding bound Object" (row 412, the compiled path's implicit bound `Object`).
- **Ledger and questions.** None: decided. `compiler_tests/InferLoneUnbounded.fss` and `tests/InferLoneUnboundedWalk.fss` gate the bound (row 516, fixed).

### B4. The No Duplicates Rule (Fig. 5, p. 11:13; slide 12)

- **Source.** A rule with no worked example: [No-Dup-Not-Less] and [No-Dup-Not-Gtr] refuse exactly a pair whose domains are each below the other. The `sort` and `ArrayList` sets meet it "trivially" (p. 11:6).
- **What departs.** The revival's text states the rule on a strict "more specific", so it refuses nothing, and an equivalent pair falls to the Meet Rule (row 696, `advanced/overloading.tex`, "Declarations with Static Parameters").
- **Fortress form.** `object Box[\T\] end`, `dup[\T\](x: Box[\T\]): ZZ32 = 1` beside `dup[\U\](x: Box[\U\]): ZZ32 = 2`, called on `Box[\String\]`.
- **Today.** Compiled: refused by the checker's own duplicate check, "There are multiple declarations of dup with the same parameter type: Box[\T\]". Walk: loads and prints `1`, row 373's family.
- **Ledger.** A note on row 696: the checker already refuses the pair, so only the text is wrong; walk runs it.

## Group C: features the revival lacks

| # | Source | The example | Feature it needs | Ledger |
|---|---|---|---|---|
| C1 | p. 11:3 | Scala's `List[+A]` with `:::[B >: A](prefix: List[B]): List[B]` | a covariant class parameter; a lower bound on a method's type parameter (Fortress writes it as a `where` clause, `where { A extends B }`) | row 404; row 677 (the compiled checker reads no `where` constraint as a bound); the code generator refuses a `where` clause (`fortress-repo` skill, `compiler.md`) |
| C2 | p. 11:6; slide 9 | covariant `ListC` and `SortedListC`: `sort(ListC[A])`, `sort(ListC[B])` overlap at `ListC[C]`; `sort(ListC[C]): SortedListC[C]` disambiguates | `covariant` | row 404 |
| C3 | p. 11:6; slide 9 | the same with `SortedListI` invariant: `SortedListI[A]` is not above `SortedListI[C]`, so the set breaks the Return Type Rule ("NOT TYPE-SOUND!") | `covariant` | row 404 |
| C4 | p. 11:7; slides 9 and 16 | `sort[P](x: ListC[C]): SortedListI[P]` beside the two plain `sort`s, and `merge[P]` of two `SortedListI[P]`; run time must take `P = A` from the static type | `covariant`; the static return type at run time on the compiled path | row 404; PLAN phase 5 (`OverloadSet.java:2048`); its invariant core is A-C4 |
| C5 | p. 11:9; slide 8 | `trait T[+P, -Q, =S]` with `U2 <: U1`: `T[U2, U1, U1] <: T[U1, U2, U1]` | `covariant`, `contravariant` | row 404; row 17 (the specification's `where`-clause covariance idiom refused) |
| C6 | p. 11:12 | the type context of `((P, T[Q]) → Any)` with `T` contravariant: `P` must be contravariant or invariant, `Q` covariant or invariant | the variance position check of [D-Method] | row 404 |
| C7 | p. 11:19 | the Cartesian product of bound lists, `⟨A ⊔ E, B ⊔ F⟩, ...`, from matching a union | union and intersection types at run time, and the paper's match-and-solve dispatcher | none; phase 5 |
| C8 | pp. 11:20-21 | `append[P, {P} <: Q]` over covariant `SortedList` and `List`; static type `List[C3]`, ilks `SortedCons[C1]` and `Cons[C2]`; the first fails to match, the second runs at `[C3/P, C3/Q]`, with the match and solve derivations | `covariant`; a lower bound on a method's type parameter; the static return type at run time | rows 404 and 677; phase 5 |
| C9 | p. 11:24 | the Ancestor Meet Rule's equivalences `T[α ⊓ α'] ≡ T[α] ⊓ T[α']` for covariant `T`, `T[α ⊔ α'] ≡ T[α] ⊓ T[α']` for contravariant `T`, and only `(T[α] ⊔ T[α']) <: T[α ⊔ α']` | `covariant`, `contravariant`, and union and intersection types | row 404 |

All nine wait on worklist item 12 and on POSITIONS, "The `covariant` keyword is future work". None needs a row now beyond those named.

## Passages that are not worked examples

- Fig. 1 (p. 11:5) and slides 11 to 15 draw the three rules; Figs. 2 to 10, Theorem 4.1, Lemmas 5.1 to 5.9 and Theorems 5.5 to 5.11 state the calculus. B4 covers the No Duplicates Rule; the Meet and Return Type Rules are A2 to A6.
- Fig. 4's [Anc-Same-Trait] (p. 11:11) states the exclusion rule with no example of its own; A8 is its one worked use. The record holds the rule and its tests (FACTS, "The compiled checker's exclusion rule is the designers' 'multiple instantiation exclusion' ...").
- The default bounds `Any` and `Bottom` (p. 11:9) agree with the revival's implicit bound `Any` (`fortress-repo` skill, `revival-changes.md`, "The bound of a type parameter that has none written"); the compiled path's `Object` is row 412 (`XXXImplicitBoundAny`), met in B3. It is no departure.
- §5.4's alternatives of 2012 (p. 11:24): invariant arrow domains with coercion of function values, and type theories without unions or intersections. The paper rejects them; the revival keeps contravariant arrow domains in its text, and its compiled dispatch ignores them (`fortress.disable.contravariance`, `compiler.md`, "Traps of the compiled path").
- Slide 10 (FGFV's syntax), slides 17 to 21 (the static return type carried to run time, Match and Solve, soundness) and the questions after the talk (performance, "might exponentially blow up in some cases") hold no example.

## For the next batch

### Candidate test rung (group A, new or failing)

Failing today, each with its row; write the test first, then see it fail through the harness:

1. `tests/XXXDottedMethodMeetBothBodiesWalk.fss` with its `.test` file (A1), row 444.
2. `tests/XXXReturnRuleObjectParamWalk.fss` with its `.test` file (A4), candidate row R1.
3. `tests/XXXGenericBoundsNoMeetWalk.fss` with its `.test` file (A6), row 373's first reproducer.
4. `compiler_tests/XXXOverloadZZ32BesideUserTrait.test` (A10), candidate row R2.
5. `compiler_tests/XXXGenericInstanceReturnOnly.fss` with `GenericInstanceReturnOnlyLink.test` and `XXXGenericInstanceReturnOnly.test` (A-C4), candidate row R3.
6. `tests/XXXGenericInstanceReturnOnlyWalk.fss` (A-C4), if R4 opens.
7. Optional: `compiler_tests/XXXGenericBoundsMeet.fss` with its two `.test` files (A-B2), row 537.

New and green today:

8. `compiler_tests/XXXDottedMethodMeetBothBodies.test` (A1).
9. `tests/TwoTraitsNoMeetWalk.fss` with its `.test` file, and `compiler_tests/XXXTwoTraitsNoMeet.test` (A3).
10. `compiler_tests/XXXReturnRuleMeetCrossing.test` (A4).
11. `tests/DispatchCrossingMeetWalk.fss` and `compiler_tests/DispatchCrossingMeet.fss` (A5).
12. `compiler_tests/XXXGenericBoundsNoMeet.test` (A6).
13. `tests/DispatchSymmetricSortedWalk.fss` and `compiler_tests/DispatchSymmetricSorted.fss` (A10, without the two-argument `ZZ32` declaration), and A10's whole set under walk as a plain test.
14. `tests/GenericBoundsMeetWalk.fss` (A-B2).

Gated already, failing as expected: A8's `XXXOverloadExistentialMeet` and `XXXOverloadExistentialMeetWalk` (rows 537, 539). Gated already and green: A2 (`XXX2f.test`, `XXXoverloadTest5.fss`). Covered already: A7, A9.

### Candidate ledger rows

Each new row below passes `ledger.py check --rows` but for its `?` number. The reproducer cell reads `none` until the rung's test lands.

- **R1, new (walk), section 4, "Operators and overloading under walk".** "walk's load check counts two parameter lists as excluding when every parameter at which one differs is an object type, even an object below the other's type: `f(x: B): C` beside `f(x: C): B`, with `object C extends B`, loads and runs". Status `NEGATIVE-VERIFIED`; class `implementation gap (walk)`; citation `advanced/overloading.tex`, "Subtype Rule"; siblings 99. Mechanism: `OverloadedFunction.java:427-433`, `:486` at 75be286ac (A4).
- **R2, new (prelude), section 5, "Overloading on the compiled path: checker and dispatch".** "the compiler prelude's `trait ZZ32` lists no `comprises` clause, so `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a user trait `List` is refused by the compiled Meet Rule, where walk, on the one library whose `ZZ32` comprises `Int`, runs the pair". `NEGATIVE-VERIFIED`; `implementation gap (prelude)`; `advanced/overloading.tex`, "Incompatibility Rule"; the switch-over closes it, and the prelude takes no new declaration (A10).
- **R3, new (codegen), section 5.** "on the compiled path, a generic declaration reached only by dispatch whose type parameter only its return type mentions fails verification: `sort[\P\](x: Ltwo): Sorted[\P\]` beside `sort(x: Lst): Sorted[\A\]` compiles, and the run dies, 'VerifyError: Bad return type'". `NEGATIVE-VERIFIED`; `implementation gap (codegen)`; `basic/overloading.tex`, "Overloading Resolution"; siblings 496, 538. If the coordinator counts it as row 538's issue, it is a note there instead (A-C4).
- **R4, optional (walk), section 4.** "under walk, a generic declaration reached by dispatch whose type parameter only its return type mentions runs at its bound, not at the call's static type: ... gives `Sorted[\Any\]`, and `merge` of it with a `Sorted[\A\]` fails". `NEGATIVE-VERIFIED`; `design limit (walk)`; siblings 510, 538. The `revival-dispatch` callout states walk's departure and names no row; a row gives it a reproducer (A-C4).
- **Note on row 444.** The paper's p. 11:2 shape, two traits each with a body for `m(x: Number)` and an object below both that declares none: walk prints `1`; the compiled checker refuses it (A1).
- **Note on row 373.** Two reproducers: `sort[\P extends A\](x: ListI[\P\])` beside `sort[\P extends B\](x: ListI[\P\])` runs for `ListI[\C\]` (A6, B2), and `dup[\T\](x: Box[\T\])` beside `dup[\U\](x: Box[\U\])` runs (B4); the compiled checker refuses both.
- **Note on row 696.** The compiled checker refuses an equivalent pair by its own check, "There are multiple declarations of dup with the same parameter type", so the defect is the text's alone (B4).
- **Note on row 537.** A third shape: the meet written as a type parameter with two bounds (A-B2), and the closed form of the paper's `sort` set, which the checker accepts by coverage (B2).

The four new rows, as checked, for `ledger.py add` once their tests land (R1 to R4 in order):

```
| ? | walk's load check counts two parameter lists as excluding when every parameter at which one differs is an object type, even an object below the other's type: `f(x: B): C` beside `f(x: C): B`, with `object C extends B`, loads and runs | NEGATIVE-VERIFIED | implementation gap (walk) | `advanced/overloading.tex`, "Subtype Rule" | none | POPL 2019 examples sorting | siblings: 99. `allObjInstance1` and `allObjInstance2` skip equal parameters (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:427-433`), and `distinct \|= unequal && (allObjInstance1 \|\| allObjInstance2)` (`:486`, at 75be286ac, the team's line) marks the pair excluding though `C` extends `B`, so the return-type condition is never checked. Walk prints `C`; the compiled checker refuses, 'the return type of C->B ... should be a subtype of the return type of B->C'. The talk's slide 4 `m1(x: C, y: C): B` beside `m1(x: C, y: B): C` loads too; with `trait C` and an object below it walk refuses. `explorations/reviews/popl2019-examples.md` |
| ? | the compiler prelude's `trait ZZ32` lists no `comprises` clause, so `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a user trait `List` is refused by the compiled Meet Rule, where walk, on the one library whose `ZZ32` comprises `Int`, runs the pair | NEGATIVE-VERIFIED | implementation gap (prelude) | `advanced/overloading.tex`, "Incompatibility Rule" | none | POPL 2019 examples sorting | 'Invalid overloading of add in component ...: (List, List)->List ... and (ZZ32, ZZ32)->ZZ32', the talk's slide 2 set. The prelude declares `trait ZZ32 ... excludes { ZZ64, RR32, RR64 }` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`); the one library declares `trait ZZ32 ... comprises { Int }` (`Library/FortressLibrary.fsi:531-533`) and `value object Int extends ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`). Ends at the switch-over; the prelude takes no new declaration. `explorations/reviews/popl2019-examples.md` |
| ? | on the compiled path, a generic declaration reached only by dispatch whose type parameter only its return type mentions fails verification: `sort[\P\](x: Ltwo): Sorted[\P\]` beside `sort(x: Lst): Sorted[\A\]` compiles, and the run dies, 'VerifyError: Bad return type' | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/overloading.tex`, "Overloading Resolution" | none | POPL 2019 examples sorting | siblings: 496, 538. The paper's p. 11:7 `sort`/`merge` example made invariant: `merge(sort(l1), sort(l2))` with `l2: Lst` holding an `Ltwo`; the text gives `Sorted[\A\]`, the bound `Any` under the call's static type. The dispatcher `sort(Lst)` returns the arm's `Sorted?P?`, the uninstantiated template, where its signature says `Sorted[\A\]`, and the main class fails to load before `run` prints. The dispatcher is not given the static return type (`OverloadSet.java:2048`, row 538). `explorations/reviews/popl2019-examples.md` |
| ? | under walk, a generic declaration reached by dispatch whose type parameter only its return type mentions runs at its bound, not at the call's static type: `sort[\P\](x: Ltwo): Sorted[\P\]` beside `sort(x: Lst): Sorted[\A\]` gives `Sorted[\Any\]`, and `merge` of it with a `Sorted[\A\]` fails | NEGATIVE-VERIFIED | design limit (walk) | `basic/overloading.tex`, "Overloading Resolution" | none | POPL 2019 examples sorting | siblings: 510, 538. 'Unification error: Closure/Constructor for merge param 1 (x:Sorted[\Any\]) got arg Sorted[\A\] of type Sorted[\A\]'. Walk has no static types, so no static type of the call bounds the instance; the section's `\revision{revival-dispatch}` callout states walk's departure but names no row. The paper's p. 11:7 example, made invariant. `explorations/reviews/popl2019-examples.md` |
```

No question goes to Pavol: group B's four are settled by the text, by his decisions or by row 696.

### What waits

Group C's nine examples, on the `covariant` and `contravariant` keywords carried to run time (row 404, worklist item 12, POSITIONS "The `covariant` keyword is future work"), on lower bounds of a method's type parameters (`where` clauses, row 677), and on the static return type at run time on the compiled path (phase 5). C4 and C8 are the design examples for phase 5's dispatcher, and C4's invariant core is already a test of the rung above.
