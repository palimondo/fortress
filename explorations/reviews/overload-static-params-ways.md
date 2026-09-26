<!--
2026-09-26. Written by a clean worker: it had not read the revival's earlier notes and did
not open anything under explorations/ except protocol.md, experiment/env.sh and the
checker-count tool. Sources: Specification/ (basic/overloading.tex, advanced/overloading.tex,
basic/types-vals-vars.tex, basic/trait-parameters.tex, appendices/future.tex),
Specification-1.0-frozen/fortress.1.0.pdf, Documentation/Specification/Prose/Language/
(types.tick, overloading.tick), Papers/Types, Papers/Dispatch, Papers/Welterweight,
Papers/RuntimeInstantiation, Library/ and ProjectFortress/LibraryBuiltin/, the two
implementations' sources, git history, research/authorship.md, and 25 probes run on both
paths (overload-static-params-ways/probes/, transcripts in .../captures/).
-->

# Overloads whose declarations differ in their static parameters: the ways, and the nine steps

**The question.** Fortress lets one name have several declarations (an *overload set*; each
declaration is an *arm*). An arm may have *static parameters* (the `[\T\]`, `[\nat n\]` list;
an arm with them is *generic*, one without is *plain*). Run over the interpreter's library,
the compiled path's checker refuses some sets whose arms differ in their static parameters:
a generic arm beside a plain one, or arms with different lists. The interpreter ("walk")
accepts those sets and runs them. What does the language say such a set means, and how is
the library to be made acceptable to the checker?

**Short answer, measured.** The checker does **not** refuse sets because their static
parameters differ. It checks every pair by the 2011 Types paper's rules, which were written
for exactly this case, and refuses a pair only when it cannot prove the pair unambiguous.
Sets with different lists pass when the arms' domains exclude each other (the library's
`SCMP`/`PCMP`, and probe `DifferExcl`). What fails is the proof: open traits that nothing
declares exclusive, and one reasoning step the checker's reduction does not take. The
sentence in the specification that forbids differing static parameters describes neither
path: walk has not followed that rule since May 2007, the sentence itself entered the
specification after the printed 1.0 of 2008, the type group's 2011 rules superseded it, and
the team's later restart of the specification dropped it. Four real defects surfaced on the
way (section 2.3).

Terms used below. *Domain*: the tuple of an arm's parameter types. *Exclude*: two types
exclude when no value can have both. *Meet*: an arm more specific than two others,
covering every call both apply to. *Return-type rule*: when a more specific arm is chosen
at run time, its return type must fit what the checker promised from the less specific
one. *Multiple instantiation exclusion* (MIE): no type is two different instantiations of
one generic trait (Route A keeps it). *Lifting*: the checker treats a functional method of
`trait S[\I\]` as if the method itself had `[\I\]` (`STypesUtil.scala:123-127`).

---

## The ways, the library's own first

Each line: the way, where it lives, what the two paths do with it today (probe names refer
to `overload-static-params-ways/probes/`), and, where a rule blocks it, how the library
gets around that rule.

**The library's own ways**

1. **Different names for different static-parameter lists.** `array1/2/3`,
   `left/right/open/sized/bounded/extent{1,2,3}Range`, `combine2D/3D`, `fullRange2D/3D`,
   `__builtinFactory1/2/3`, `immutableArray1`: 45 declarations in `FortressLibrary.fsi` and `RangeInternals.fsi`
   (e.g. `RangeInternals.fsi:605-609`). No pair across two numbered names is ever compared;
   the forced checker run's errors on these names (`combine2D` and `combine3D` 7 each,
   `array1` and `array2` 1 each) are between arms of one name with the same static
   parameters, on open traits (case E below). *Blocked for operators*: an operator's name is its symbol (`CAP`, `MIN`,
   juxtaposition), so it cannot be numbered. *The library's way around*: the operator keeps
   one name and forwards to named code: `INTERSECTION` of `Range2D` calls `combine2D`, and
   `ExtentScalarRange`'s calls `other.intersectWithExtent(self)`, a dotted method the
   subtypes override (`RangeInternals.fss:185-187, 438-439`), so the second choice is made
   by overriding, not by overloading.
2. **Functional methods in the generic traits**, dispatching on `self`: `CAP` in
   `ScalarRange[\I\]`, `Range2D[\I,J\]`, `Range3D[\I,J,K\]` (`RangeInternals.fsi:44-99`);
   `MIN` in `StandardMin[\T\]` (`FortressLibrary.fsi:184-186`); juxtaposition in
   `MultiplicativeRing[\T\]` (`:271`). Walk accepts these through its self-parameter rule
   (`OverloadedFunction.java:416-425`, "Somebody Else's Problem"). The checker lifts the
   trait's parameters, so it still sees arms with different lists and needs exclusion or a
   meet (probe `DifferMIEMethod`: walk runs it, the checker refuses).
3. **Exclusion declared through a plain parent trait.** `Rank1/2/3`, "Potemkin exclusion
   traits. Really we just want to say that `Rank[\n\] excludes Rank[\m\] where { m =/= n }`,
   but we cannot yet" (`FortressLibrary.fsi:1074-1084`); `AnyMaybe`, "makes excludes work
   without where clauses" (`:816-818`); `Vector` and `Matrix` `excludes { AnyMultiplicativeRing }`
   (`:1467, :1585`). *The rule it gets around*: an `excludes` clause cannot name a type
   variable (listed as future work, `future.tex:212-222`). Probes `DifferMIEPotemkin` (the
   `CAP` shape) and `TraitLiftAnyExcl` (the juxtaposition shape): **both paths accept and
   run them**; without the plain traits (`DifferMIEMethod`, `TraitLiftOpen`) the checker refuses.
4. **A witness argument that carries the static parameters.** A thunk:
   `openRangeHelper(__thrower[\I\])` picks the 1-, 2- or 3-parameter arm by the arrow type
   of the thunk (`RangeInternals.fsi:612-616`, `FortressLibrary.fss:3883`). A size:
   `reflect(x)` yields an object `N[\n\]`, so an arm `__arr1[\E, nat n\](w: ()->E, x: N[\n\])`
   reads `n` off an argument (`NatReflect.fsi`, `FortressLibrary.fss:1928-1936`). Walk runs
   both (`NullaryWitness`, `NatArmWitness`). *Blocked in the checker for the thunk*: arrow
   types never exclude one another, because an overloaded function value has several arrow
   types (`types-vals-vars.tex:400-403`, `types.tick:518-519`), so by the language's own
   rule the thunk arms are ambiguous. *The library's way around*: an object witness, as `N`
   is. The checker separates `Wit[\A\]` from a ground `Wit[\Other\]` or `Wit[\(T1,T1)\]`
   (`WitVsGround`, `WitVsTuple` pass and run) but not from `Wit[\(A,B)\]` (`NullaryObjWitness`
   refused; see way 11). The size witness passes the checker and fails in code generation,
   "Only handling some static args of generic types" (`NatArmWitness`).
5. **One declaration that asks about its static parameter.** Where two arms would differ
   only in a bound, the library writes one arm and a `typecase` on a thrower:
   `array1[\T, nat s0\]() = typecase __thrower[\T\] of () -> Number => vector[\T,s0\]() else => ...`
   (`FortressLibrary.fss:2245-2250`). This is the specification's own example of a wanted
   overloading, Jan's `array1` pair (`future.tex:241-245`). Probe `TypecaseWitness`: **both
   paths run it.**
6. **Padding (historical).** Until June 2007 every arm of an operator carried the same list,
   used or not: `opr juxtaposition[\T extends Number, nat n, nat m, nat p\](a:String, b:String)`,
   `opr [\N extends Number\]|a:RR64|` (removed in `b176e1440`, 2007-06-27, "Removed a tonne of
   gratuitous type parameters now that we support non-homogenous parameterization of
   overloadings"). Padded parameters appear in no parameter type, which today's checker
   treats as "never dispatched" (way 13).

**The specification's ways**

7. **Identical static parameters, up to renaming.** "It is an error for their static
   parameters to differ (up to α-equivalence), or for one declaration to have static
   parameters and another to not have them" (`basic/overloading.tex:100-107`;
   `advanced/overloading.tex:95-99`), with parameters "inferred ... before comparing their
   parameter types" (`basic/overloading.tex:292-295`). Neither path enforces it (sections 2, 7).
8. **Compare generic arms through their bounds.** The printed 1.0 specification (March 2008)
   had no such sentence; its §15.6.1 "Type Relationships with Static Parameters" used a type
   parameter's bounds as its supertypes, and said these relations "may be replaced when the
   static type checker and the type inference engine are implemented"
   (`Specification-1.0-frozen/fortress.1.0.pdf`, §15.6.1; byte-identical to the PDF at the
   `1.0` tag).
9. **Where clauses instead of static parameters.** "Relaxing restrictions on static
   parameters of overloaded functionals or replace static parameters with where clauses as
   much as possible" (`future.tex:236-237`; where clauses, `trait-parameters.tex:284-320`,
   "not yet supported", `traits.tex:15`). Not measured.

**The type group's ways (the designers' later word)**

10. **Existential domains and three rules.** Each arm's domain is read as existentially
    quantified over its static parameters, "a monomorphic definition is then regarded as a
    degenerate generic definition" (`Papers/Types/introduction.tick:326-331`); a set is
    valid under No Duplicates, Meet and Return Type rules (`Papers/Types/rules.tick:158-180`).
    This is what the checker implements (`OverloadingOracle.scala:66-117, 201-206`,
    `TypeSchemaAnalyzer.scala:150-251`), and what the 2012 Welterweight model states
    (`Papers/Welterweight/static.tick:46-60`). A failing return-type rule is repaired by making
    the special arm generic with a tighter bound (`Papers/Types/examples.tick:146-172`,
    the `baz` pair).
11. **Exclusion derived from MIE.** Two instantiations of one trait exclude unless their
    arguments are equal (`types.tick:355-360`, `introduction.tick:420-426`); the paper
    derives it inside existential types by "existential reduction"
    (`Papers/Types/exc-reduction.tick`). The checker does this for ground arguments
    (`MIEGround` passes) but cannot conclude exclusion when the only way two domains could
    meet contradicts a bound (`DifferMIE`: `S[\I extends Num[\I\]\] <: R[\I\]` against
    `P[\I,J\] <: R[\(I,J)\]`, where `I` would have to be a tuple). Neither the paper's rule
    ("otherwise" relates the type to itself) nor the code (`TypeSchemaAnalyzer.scala:215-221`,
    the unreduced meet is kept) draws that conclusion. Drawing it is sound, but it is an
    extension, not the paper.
12. **Run-time instantiation restricted by the return type** (Karl Naden, 2012,
    `Papers/RuntimeInstantiation/2012-6-15 ...txt:1-20`, `RTRinstantionTheory.tex`): when
    dispatch picks a more specific generic arm, its static parameters are bound so that its
    return type fits the one the checker used, including a parameter that appears only in
    the return type (`f[\P\](x: String): empty[\P\]`, same file). Not implemented.

**The two implementations' ways**

13. **Compiled: an arm whose static parameters cannot be inferred is never dispatched**
    (`STypesUtil.scala:1101-1132`; "Overloadings are no longer dynamically applicable if
    they have static params that couldn't be inferred", `a7f149194`, Kilpatrick 2009).
14. **Walk: instantiate each generic arm from the arguments, then keep the first strictly
    more specific** (`OverloadedFunction.java:856-895`), after a load-time check that asks
    arms with generic parameters for "at least one pair of parameters [with] excluding
    types" (`:519-527`) unless a self parameter or an object type settles it (`:416-425, 466`).

---

## 1. Refresher

A generic declaration `f[\T <: B\](x: T)` denotes a family of functions, one per type `T`
within the bound. Overloading picks, for each call, one arm by the argument types. Two
readings of a generic arm among plain ones exist. **(a) Instantiation reading**: the arm
stands for all its instances, each an ordinary overload. **(b) Existential reading**: the arm
is one declaration whose domain is "some `T <: B`, and an argument of type `T`", i.e. the set
of all argument types any instance accepts. Under (b), arm 1 is more specific than arm 2 when
every argument arm 1 accepts, arm 2 also accepts; no instance is chosen first. Under (a),
`quux[\X\](x: X)` beside `quux(x: ZZ)` is ambiguous for a `ZZ` argument (the instance at
`X = ZZ` has the same domain), and for an `NN <: ZZ` argument the instance at `NN` wins, which
nobody wants (`Papers/Types/introduction.tick:171-251`). Renaming a declaration's own
parameters consistently (α-equivalence) changes nothing; comparing two declarations' lists
position by position is a separate choice, made for overriding.

## 2. What each path does today, measured

Machine and tree: `captures/machine.txt` (4 cores, JDK 25, one thread). Each probe was run
alone, walk and compiled each in a private cache, the compiled run against the compiler's
library components compiled into that cache (`run-probe.sh`).

### 2.1 The library

`explorations/coordinator/tools/checker-count/run.sh` over the interpreter's library: 125
errors, 71 locations; the `FortressLibrary` api stops with 110 before its overloading check
(`captures/checker-count-table.txt`). With the overloading check forced to run past those
errors (`run-overload-anyway.sh`, a copy of `StaticChecker.java` with one guarded block,
`probe-src/`), it reports **482** overloading errors: 421 in `FortressLibrary`, 39 in
`RangeInternals`, 22 in `NativeArray` (`captures/library-overloading-forced.txt`). Sorted by
the two arms' static parameters (`classify.py`, `captures/library-overloading-classified.txt`):

| arms | refused as invalid | return-type rule | total |
|---|---|---|---|
| different lists | 27 | 2 | 29 |
| one generic, one plain | 5 | 132 | 137 |
| same list (up to renaming) | 54 | 4 | 58 |
| both plain | 102 | 113 | 215 |
| "same parameter type" (duplicates) | | | 43 |

All 132 generic-plus-plain return-type errors, and the 43 duplicates, have a plain arm on a
numeric-tower or `Comparison` type (`ZZ32`, `QQ`, `TotalComparison`...). Those types are
reported as excluding their own supertypes (`FortressLibrary.fsi:121, 373, 438, 465`), and my
reading is that the checker then treats them as empty, so their arms look more specific
than every other arm; Route A's flattening addresses the cause. I did not rerun on a
flattened library. What remains is the families the brief names:

- **`CAP`** (12 different-list, 5 same-list): `ScalarRange[\I\]` against `Range2D[\I,J\]`
  and `Range3D[\I,J,K\]`; the domains exclude only through MIE plus the bound (way 11).
- **`MIN`/`MAX`** (8): the array arms `opr MIN[\T extends Number, I\](x: Array[\T,I\], y: T)`
  (`FortressLibrary.fsi:2557-2563`) against `StandardMin[\T\]`'s functional method: two open
  traits. Two more are a declaration slip: `StandardMinMax` declares `opr MIN(self, other:T): (T,T)`
  (`FortressLibrary.fsi:209-210`) where the body returns one `T` (`FortressLibrary.fss:260-261`),
  already so in the 2012 tree.
- **`openRangeHelper`** (3): the thunk witness (way 4).
- **`seq`** (5): `[\E,I\]ReadableArray[\E,I\]` and `[\E\]FilterGenerator[\E\]` against
  `[\E\]SequentialGenerator[\E\]`: open traits.
- **juxtaposition** (3): `String`'s arms against `MultiplicativeRing[\T\]`'s; nothing
  declares `String` exclusive of `AnyMultiplicativeRing`, as `Vector` is.
- **`CMP`** (2 plus the tower-shaped ones): `Comparison` extends
  `StandardPartialOrder[\Comparison\]` and `TotalComparison` extends both `Comparison` and
  `StandardTotalOrder[\TotalComparison\]` (`FortressLibrary.fsi:100-121`): the same MIE
  breach as the numeric tower, in a hierarchy that is not numeric.
- **`MINMAX`** (2): tower-shaped only.

The library's own `SCMP`/`PCMP`, overloaded over 1, 2 and 3 static parameters on scalar
versus tuple domains (`RangeInternals.fsi:30-40`), draw no error.

### 2.2 The probes

| probe | shape | walk | checker | compiled run |
|---|---|---|---|---|
| `GenPlainSub` | `describe[\T extends Shape\](x:T)` beside `describe(x: Circle)` | accepts; prints `generic` three times; `circle, generic, circle` when the plain arm is declared first | accepts | `circle, generic, circle` |
| `GenPlainRTR` | the paper's `baz`: generic arm returns `T`, plain arm on subtrait `Round` returns `Round` | refuses at load | **accepts** | `VerifyError: Bad return type` |
| `GenBoundedFix` | the paper's repair: both arms generic, bounds `Shape` and `Round`, both named `T` | refuses at load | accepts | code generation: duplicate class name |
| `GenBoundedFixU` | the same, second parameter renamed `U` | refuses at load | accepts | run: "Unable to read serialized data" for the overload |
| `DifferExcl` | `size[\T\](Box[\T\])`, `size[\A,B\](Pair[\A,B\])`, objects | `1, 2` | accepts | `1, 2` |
| `DifferOpen` | the same on traits | refuses | refuses | — |
| `DifferMIE` | the `CAP` shape, top-level | refuses | refuses | — |
| `DifferMIEMethod` | the `CAP` shape, functional methods | `scalar, pair` | refuses | — |
| `DifferMIEPotemkin` | plus plain exclusion traits (way 3) | `scalar, pair` | accepts | `scalar, pair` |
| `MIEGround` | `A <: R[\Z\]`, `B <: R[\W\]`, no generics | refuses | accepts | `a, b` |
| `NullaryStatic` | `mk[\A\]()`, `mk[\A,B\]()` | refuses (same parameter types) | refuses (duplicate) | — |
| `NullaryWitness` | thunk witness (way 4) | `one, two` | refuses | — |
| `NullaryObjWitness` | `Wit[\A\]` against `Wit[\(A,B)\]` | `one, two` | refuses | — |
| `WitVsGround`, `WitVsTuple` | `Wit[\A\]` against `Wit[\Other\]`, `Wit[\(T1,T1)\]` | correct | accept | correct |
| `TraitLiftOpen` | trait functional method beside a plain arm on an open trait | refuses | refuses | — |
| `TraitLiftAnyExcl` | plus `Word excludes { AnyRing }` | `ring, word` | accepts | `ring, word` |
| `TypecaseWitness` | way 5 | `tag, other` | accepts | `tag, other` |
| `PermuteOverride` | override returns `B` for the trait's `A` | runs the call, refuses the binding | refuses (return-type rule) | — |
| `PermuteReturn` | override's static parameters only in its return type, permuted | refuses the binding | **accepts** | `ClassCastException` |
| `NatArmNoParam`, `NatArmViaAny`, `NatArmDispatcher` | `f(x: Any)` beside `f[\nat n\](x: ZZ32)` | `sized` | accepts | `any` in all three |
| `NatArmShowN` | the sized arm reads `n` | "undefined variable [n]" | accepts | `any` |
| `NatArmWitness` | `f[\nat n\](w: N[\n\])` | `sized, sized` | accepts | code generation fails |

### 2.3 Defects found (not the question, but on its path)

1. **Walk's choice between a generic and a plain arm depends on declaration order**
   (`GenPlainSub`): it instantiates the generic arm at the argument's type, the instance's
   domain equals the plain arm's, and the strict comparison keeps whichever came first
   (`OverloadedFunction.java:871-892`). This is the instantiation reading the Types paper
   rejected.
2. **The checker's return-type rule takes one solution where the paper asks for all
   instances.** The paper: "every instance ... of d2 applicable to T" (`rules.tick:174-180`);
   the code solves the domain match once and checks that instance
   (`OverloadingOracle.scala:81-117`), keeping only sizes as free (`:92-94`). Result:
   `GenPlainRTR` (the paper's own counter-example) passes and fails the JVM verifier;
   `PermuteReturn` passes and throws `ClassCastException`. This is the brief's first failure.
3. **Code generation for two generic arms whose parameter is a bare type variable** fails
   (`GenBoundedFix`, `GenBoundedFixU`); with lists on distinct objects it works (`DifferExcl`).
4. **An arm whose static parameter is in no parameter type**: the checker never dispatches
   it (way 13), walk always does, with the parameter unbound (`NatArmShowN`). On my four
   shapes the compiled run never chose the arm; the divergence is between the paths. This
   is the brief's second failure as I could reproduce it.

## 3. The specification's prose, and the same idea under other spellings

- **The sentence**: `basic/overloading.tex:100-107` and `advanced/overloading.tex:95-99`
  (quoted in way 7); the three rules of the advanced chapter are then stated for plain
  arms only ("static parameters ... are ignored in the remainder of this chapter", `:95-102`).
  The comparison is by instantiation: "they are inferred ... before comparing"
  (`basic/overloading.tex:173-176, 292-295`). The two go together: with identical lists,
  instantiate-then-compare is coherent; without them it is the reading of section 1 (a).
- **Its date**: the LaTeX carrying it is headed 2009 and 2009-2010; the printed 1.0 of March
  2008 has the bounds-as-supertypes section instead (way 8). The LaTeX in
  `Specification-1.0-frozen/` is the later text, not the source of that PDF.
- **The spec's own doubt**: `future.tex:236-266` lists "Relaxing restrictions on static
  parameters of overloaded functionals" with Jan's `array1` pair and Marc's `conjugate` pair
  (arms with different bounds), David's "nice" proposal (email of 2007-05-18), and "What is
  the exclusion rule for a pair of overloaded declarations with different static parameters?"
- **Other spellings**: a functional method of a generic trait has static parameters only
  through its trait (`basic/overloading.tex:167`, "static parameters may appear in the types
  P0, P, and U"); the sentence does not say whether they count. The rule that "a functional
  which takes a single parameter of type a naked type parameter of bound Any cannot be
  overloaded" (`advanced/overloading.tex:114-128`, checked at `OverloadingChecker.scala:375,
  433-439`) is the one static-parameter rule the checker enforces by name. The 2012 function
  type is "a finite set of arrow types" (`types-vals-vars.tex:411-441`), with no generic member.
- **The designers' later word** (brief: the restart's Types chapter): a function type is "a
  set of arrow types and universal arrow types" (`types.tick:553-558`), i.e. one overloaded
  function holds generic and plain arms together; a universal type is a subtype of another
  when each instance of the second has an instance of the first below it (`types.tick:794-801`);
  "if a static parameter of a quantified type does not appear in the type's constituent
  generic type, then the quantified type is equivalent to one in which the binding ... is
  removed" (`types.tick:764-767`); instantiation exclusion (`types.tick:355-360`). The same
  restart's overloading chapter drops the sentence: `overloading.tick:111-114` goes from the
  operator note straight on, where `basic/overloading.tex:100-107` stood (its backup
  `overloading.tex~` has no such sentence either); it keeps "inferred ... before comparing"
  (`overloading.tick:299-302`), which, without the sentence, is the instantiation reading.
  The restart is unfinished; that sentence and the Types chapter pull different ways.

## 4. Where it sits in the type system

Three pieces meet here. **Specificity** of generic arms: subtyping of existential types
(`TypeSchemaAnalyzer.scala:150-200`). **Exclusion**: declared (`excludes`, `comprises`,
object types), structural (trait against tuple or arrow), and MIE; the checker proves the
meet of two existential domains empty by reduction (`:234-251, 366-491`). **Type
preservation under dispatch**: the return-type rule over universal arrows
(`OverloadingOracle.scala:81-117`), and at run time the choice of an instance for the arm
dispatch picks (`Papers/Welterweight/dispatch.tick:20-22`, the "dispatch semipredicate",
not erasing static types). Route A's MIE is the rule that makes the `CAP` and `baz`-repair
reasoning possible at all (`Papers/Types/examples.tick:36-140`). Coercion does not enter:
none of the failing families involves it.

## 5. What the library already does in the same family

Ways 1 to 6. In numbers: 45 numbered declarations (way 1); plain parent traits named in
`excludes` clauses, `AnyMaybe`, `AnyAdditiveGroup` and `AnyMultiplicativeRing` in
`FortressLibrary.fsi` (`:1063, 1467, 1585, 1661`) and `AnyMappedGenerator`, `AnyGen`,
`AnyMatrix`, `AnyVector` in the sibling libraries (`GeneratorLibrary.fsi:170`,
`QuickCheck.fsi:297, 451`), plus the `Rank1/2/3` traits (way 3); 3 witness devices (thunk,
value `_: I` arguments in the numbered range factories, `N[\n\]`, way 4); 2 `typecase`-on-thrower factories (`array1`, `array2`,
`FortressLibrary.fss:2245-2250, 2606-2610`, way 5). Where the library overloads across
different lists and succeeds with the checker, the domains exclude structurally (`SCMP`).
Where it fails, the arms sit on open traits the library never declared exclusive. The
library's practice is overloading across different lists (since `b176e1440`, 2007), made
checkable by declared exclusion or avoided by names; it is not the specification's sentence.

## 6. What peers do, by family

From the languages' published definitions, not measured here.

- **JVM.** Java: generic and plain methods overload; choice is static (JLS §15.12.2.5);
  explicit type arguments drop generic candidates with a different count (§15.12.2.1); two
  methods whose erasures coincide are an error (§8.4.8.3); an overriding generic method is
  matched to the overridden one position by position and must have a substitutable return
  type, so `PermuteReturn`'s override is refused (§8.4.2, §8.4.8.3). Erased, no
  specialization. Scala and Kotlin: the same shape, erasure clashes refused.
- **Close to the metal.** C++: templates overload with plain functions; when equally good,
  the plain function wins ([over.match.best]); templates are ordered by partial ordering;
  explicit template arguments select by count, so `NullaryStatic` is legal C++; every
  instance is compiled separately. Rust: no overloading; one generic function per name,
  traits with non-overlapping implementations, different arities get different names
  (way 1); monomorphized.
- **Scientific.** Julia: run-time multiple dispatch over parametric methods; `f(x::Circle)`
  is more specific than `f(x::T) where T<:Shape` regardless of order (the compiled path's
  answer, not walk's); ambiguity is reported at the call; a `where` variable used in no
  argument type draws a warning and is undefined in the body (walk's `NatArmShowN`);
  specialized per argument types by the JIT. Fortran: the specific procedures of a generic
  interface must differ in type, kind or rank of some argument (an exclusion rule at
  declaration, kinds included).
- **Unbounded.** CLOS: all methods of a generic function must have congruent parameter
  lists, the analogue of the specification's sentence; dispatch by class precedence.
  Haskell: one type per name, overloading only through type classes whose instances must
  not overlap. Cecil and MultiJava: modular multimethod checking, the lineage of Fortress's
  meet rule (`Papers/Dispatch/body.tex:2505-2522`).

## 7. The history in the commits

Walks from `HEAD` stop at severed roots (`research/authorship.md:14-24`); these are
`git log --all` message searches, each commit read.

- Before May 2007, the interpreter required identical lists and the library padded (way 6).
- `3e05c3424` (2007-05-21, David Chase): "Changed overloading to implement (roughly) the
  'nice' proposal where functions with different numbers of static parameters can all be
  overloaded together", three days after the email `future.tex:260` cites.
- `b176e1440` (2007-06-27, Jan-Willem Maessen): the padding removed from the library.
- `7945fd05a` (2007-09): "0-arity generic overloadings ... overloaded factories: the result
  type is generic (and will need to be provided explicitly)"; `bd6db98ba` (2007-12): "symbolic
  types must be indexed by their bounds and not their symbolic name" (compare defect 3).
- March 2008: the printed 1.0, bounds as supertypes (way 8).
- `2b3a40d42`, `b9cbc8c4d` (2009, Sukyoung Ryu): the static overloading checker learns
  "simple generics"; the 2009-2010 LaTeX carries the identical-lists sentence.
- `a7f149194` (2009-10, Scott Kilpatrick): uninferable arms are not dispatched (way 13).
- 2010-2011 (Kilpatrick, Hilburn): constraint solving for non-exclusion (`d95bf286d`,
  2010-05) and existential reduction (`48e28961c`, "[oopsla paper] ... existential
  reduction"); the Types paper, OOPSLA 2011.
- 2010-2012 (Chase, Naden): compiled dispatch over generic arms, "most-to-least-specific
  ordering (which is what we need to be sane in the presence of generics)" (`0916f53c6`);
  "overload dispatch appears to be working for generic methods in simple cases"
  (`e2bc291b8`, 2012-05); Naden's return-type instantiation notes, 2012-06 to 08.
- 2012: the restart drops the sentence (section 3).
- 2026 (revival): `3f297441c` makes the checker handle sizes, including the "escaped" sizes
  of the return-type rule; the revival also changed `openRangeHelper`'s bounds from
  `AnyIntegral` to `Integral[\I\]` in the api (`git diff a874948ac -- Library/RangeInternals.fsi`).

## 8. The derivation from Pavol's principles, case by case

Principles: the library's practice is the standard (P1); where the specification's wish met
the type group's reality, the specification changes, and specialization is a must (P2);
microGPT compiled and fast (P3).

- **Case A, a generic arm beside a more specific plain arm** (`GenPlainSub`; every numeric
  type's operators against the ordering and ring traits). P1: pervasive. P2: the Types paper
  admits it; the sentence forbids it. Follow the paper; revise the sentence. Cost: walk's
  dispatch must compare declared domains, not instances (defect 1), a change to
  `bestMatchInternal` and its load check. JVM: none; the compiled path already does this.
- **Case B, the return-type rule across generic and plain** (`GenPlainRTR`, `PermuteReturn`).
  P2: the paper refuses both; the checker must implement the rule over all instances
  (defect 2). Library arms that then fail are repaired the paper's way (make the special arm
  generic) or by declaration. Cost: checker work in `satisfiesReturnTypeRule`; code
  generation for the paper's repair shape (defect 3). JVM: none at run time; the refused
  programs are the ones that crash today.
- **Case C, different lists, domains exclude by declaration or structure** (`DifferExcl`,
  `SCMP`). All principles agree: keep. Cost: nil.
- **Case D, different lists, exclusion only through MIE and a bound** (`CAP`). Two ways:
  the library's plain exclusion traits (way 3; both paths run `DifferMIEPotemkin` today),
  or teach the reduction to conclude "empty" when the constraints for a nonempty meet
  contradict a bound (way 11, an extension). P1 favours the library's device; P2 is
  satisfied by either (MIE is the type group's). Cost: a handful of plain traits in
  `RangeInternals`; or checker work with a soundness argument to write.
- **Case E, different or equal lists on open traits** (`seq`, the `MIN`/`MAX` array arms,
  juxtaposition on `String`). The refusal is right: another component may declare a type
  extending both. P1: declare the exclusion the way `Vector` does (`excludes
  { AnyMultiplicativeRing }`), each a small design decision (is an array ever a
  `StandardMin`?). Cost: library declarations; walk unaffected.
- **Case F, arms that differ only in static parameters** (`NullaryStatic`, `openRangeHelper`).
  No Fortress document gives them meaning (C++ does). P1 offers three ways: names (way 1),
  one declaration with `typecase` (way 5, both paths run it), an object witness (way 4,
  needs the way-11 extension). The thunk witness is ambiguous by the language's own rule.
  Cost: rewriting `openRangeHelper` and its caller.
- **Case G, static parameters in no parameter type.** Overriding (`PermuteReturn`): case B
  settles it. Overloading (`NatArm*`): the later Types chapter makes such an arm's domain
  the plain one with its parameter free (`types.tick:764-767`), so nothing can supply the
  value at dispatch. P1: the witness `N[\n\]` (way 4). The compiled rule (way 13) is the
  type group's; walk should follow it, or the checker should refuse the declaration. P3:
  the witness costs one object per call and code generation for sizes (the revival's
  run-time rung).

## 9. Options for the decision, and what each commits him to

1. **Revise the specification to the Types paper's model** (existential domains, three
   rules, MIE-derived exclusion; strike `basic/overloading.tex:100-107` and
   `advanced/overloading.tex:95-99`, rewrite "inferred before comparing"), recording the
   original text and why, and the 1.0 section it replaced. Commits him to: fixing walk's
   dispatch (defect 1) and the checker's return-type rule (defect 2); repairing the failing
   library families one by one (options 3 or 4); code generation for generic arms (defect 3).
   Matches what the checker, the restart and Welterweight already say.
2. **Enforce the sentence as written.** Commits him to: both paths refusing every set with
   differing lists, including lifted functional methods if they count (then every numeric
   operator); renaming or padding across the library, undoing `b176e1440`; padding clashes
   with way 13. Contradicts P1 and P2.
3. **Option 1, with the library repaired by its own devices**: plain exclusion traits for
   `CAP` and its kin, declared exclusions for the open-trait families, `typecase` or names
   for `openRangeHelper`, the `StandardMinMax` return types corrected, and the `Comparison`
   hierarchy given Route A's treatment. Commits him to: library edits only for the
   families; no checker extension.
4. **Option 1, with the checker taught the bound step of way 11**, so `CAP` and the object
   witness pass without new traits. Commits him to: an extension beyond the paper, its
   soundness argument, and a specification paragraph that the paper does not have.
5. **Add a rule that every static parameter of an arm must be fixed by its parameter types
   (or by the witness device).** Commits him to: a new static error for case G, the
   specification text for it, and walk and the checker agreeing on it; the library's
   factories that take explicit static arguments (`array1[\T,s0\]()`) would need the rule to
   exempt calls with explicit arguments.
6. **Make walk the standard** (drop refusals walk does not make). Commits him to: giving up
   the static guarantee of unambiguous dispatch and the return-type safety the JVM verifier
   already enforces (`GenPlainRTR`). Contradicts P2 and P3.

**My reading (mine, not a decision).** Option 1 is where the evidence points: neither
implementation has followed the sentence since 2007, the library dropped its padding in
2007, the sentence is younger than the 1.0 text it displaced and older than the 2011 rules
that superseded it, and the later restart removed it. Within option 1, the
library's own devices (option 3) clear every named family I could reproduce without
touching the checker's logic, and both paths already run them; defects 1 and 2 need fixing
whichever option is chosen, because today each path gives a wrong answer the other does not.

## Open ends

- The families' counts after Route A's flattening were not measured; the tower-shaped
  errors are attributed to the tower by reading, not by a rerun.
- Walk's order dependence was shown on top-level arms; whether any library family depends
  on declaration order was not checked.
- Where clauses (way 9) and explicit-count selection were not probed.
