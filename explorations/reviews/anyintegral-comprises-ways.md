<!-- Every way to resolve the compiled checker's refusal of AnyIntegral's comprises clause, the last early error of the FortressLibrary api after climb batch 7 (ledger row 459, PLAN.md item 21), written 2026-09-28 by a clean worker (Opus) for the Fable judgement that follows and for Pavol, with no recommendation: the type question first (does a closed trait that lists concrete types admit a generic, F-bounded subtrait, by the specification, the later Types chapter, the papers and the checker's rule), then the ways, the library's own first, each marked "measured now" (on the tree at 81f0151be, whose Library/, LibraryBuiltin/ and ProjectFortress/src/ are batch 7's landing) or "cited" (with its source), then the peers, the history, and a list of what this worker measured again against the record. Scripts, library variants, shadows, probes and captures: explorations/reviews/anyintegral-comprises-ways/ (make-libs.py makes each variant; count.sh, guards.sh, ctests.sh, probe.sh, probe-all.sh, walk.sh and mg.sh run them; shadow-thc.py and shadow-walk407.py build the two shadows from the tracked sources). Private caches, no ant, no tracked file outside those paths changed. A reading of this worker's own is marked "my reading". -->

# `AnyIntegral`'s `comprises` clause: every way, with its evidence

The error, on `trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end` and `trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }` (`Library/FortressLibrary.fsi:433-436`): "Invalid comprises clause: FortressLibrary.AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it". The api's check stops there, before its overloading and return-type checks (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:269-272`), so the count stage never runs them.

## 1. The type question

Does a closed trait that lists concrete types admit a generic, F-bounded subtrait? Each source answers on its own terms (read).

- **The rendered specification: no.** A trait reference listed in a `comprises` clause "is a declared trait identifier" (`Specification/basic/traits.tex:161-165`), and the `Molecule` example forbids a trait the clause does not list to extend it (`:262-279`). `Integral` is such a trait. Victor Luchangco's note beside the first sentence asks the question this fork turns on: "Does it include instantiations of parametric traits?" (`:166-170`, a `\note`). The specification never declares `AnyIntegral` or `Integral`.
- **The draft note: no.** "The traits listed in its `comprises` clause are exactly the traits that immediately extend `T` and they must explicitly extend `T`" (`traits.tex:234-246`). It is a `\note`, which a release build drops (`Specification/fortress/fortress.tex:35-36`). It is not in the 1.0 release (`Specification-1.0-frozen/fortress.1.0.pdf`, whose text has no such sentence) and is in the draft by 2009-11-06 (`0f49d8698:Specification/basic/traits.tex:234-244`), after Sukyoung Ryu's checker rule of 2009-04-17, which it restates (section 4).
- **The later Types chapter: yes, as coverage.** "An instantiation of the generic type defined by such a declaration is covered by the union of the types in this set and the corresponding instantiations of the generic types in this set" (`Documentation/Specification/Prose/Language/types.tick:384-389`). It states no rule that extenders be listed. A clause lists "types and generic types determined by the generic type of the declaration", and `G` determines `G'` "if every parameter of `G'` is a parameter of `G`" (`:271-277`). So `AnyIntegral` may list the five types and may not list the generic `Integral`. `Integral[\I\]`'s own clause may list its parameter `I`, and then `Integral[\ZZ32\]` is covered by `ZZ32`. It names "covering" as a relation (`:38`) and never defines it (`:934`); it has no self-type passage.
- **The Types paper (OOPSLA 2011): no, at the type level.** A clause asserts that "any strict subtype of `C[\T\]` must also be a subtype of `[T/X]K_i` for some `K_i`" (`Papers/Types/exc-spec.tick:18-23`), and each listed `K_i` must be a subtype of `C[\T\]` (the footnote, `:47-51`). `Integral[\ZZ32\]` is a strict subtype of `AnyIntegral` and a supertype of `ZZ32`, below none of the five, unless it is identified with `ZZ32`.
- **Naden (2012): the identification is the self-type idiom.** "The self-type idiom is realized with the comprises clause which contains the instantiation of the self type ... the type `Ring[\X\]` is identified as `X`" (`Papers/Types/journal/justificationOfRTR.tex:580-582`). With `Integral[\I\] ... comprises I`, `Integral[\ZZ32\]` is `ZZ32`, and the five-type list on `AnyIntegral` holds at the type level for those five arguments.
- **Welterweight (2012): yes, at the value level.** "No value can belong to the trait unless it also belongs to one of the comprised types" (`Papers/Welterweight/grammar.tick:21-22`). Its rule D-Trait asks each listed type only to be well formed and a subtype of the trait at its own parameters, and asks nothing of the traits that extend it (`Papers/Welterweight/fig-wellformeddecls.tick:38-62`). Its grammar lists only constructed types in a clause, never a bare type parameter (`fig-grammar.tick:6-8`, `:33-37`).
- **The compiled checker's rule: no, unless the subtrait has a clause of its own.** A trait extending one with a clause must be below a listed type, or have a clause whose trait types are each eligible (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:199-208`, `:254-266`). The filter at `:262` drops a type variable from that clause, so `comprises I` makes any generic subtrait eligible. A type listed in a generic trait's clause must extend the trait at the trait's own parameters (`:221-240`), which refuses the 2008 list.
- **What the clause states, and a program that falsifies it.** It is a closed-world statement about `Integral`'s instantiations. It is true of every value the tree makes: only the five extend an instantiation of `Integral` (a `grep` of `Library/`, `ProjectFortress/tests/`, `test_library/`, `run-c4/` and `apl/`, measured now). A program's own `trait MyIntegral extends Integral[\MyIntegral\] end` falsifies it. Measured now (`probes/UserIntegralTrait.fss`, every stage run by `probe-all.sh`, `captures/probes/user-integral.txt`): the checker accepts that program with 0 errors on the tree, under both forms of the accommodation, and under the `self`, `open` and `skexcl` shapes. Only the 2008 clause with the instance rule refuses it. Written as the library's own leaves are, `extends { AnyIntegral, Integral[\MyIntegral\] }` (`probes/UserIntegralLeaf.fss`), it is refused on the tree with four errors, one of them "Type MyIntegral excludes FortressLibrary.AnyIntegral but it extends FortressLibrary.AnyIntegral". My reading: the checker derives from the five-type clause that an instantiation at a sixth argument excludes the clause's own trait.

## 2. The ways

The count stage's reading on the tree is 22, with the `FortressLibrary` api row at 2, one error counted twice (`captures/count/base.txt`; the gate's `compile-ladder/climb-batch-7/gate/checker-count.txt`). A way that clears the error lets the api's overloading and return-type checks run. The count is then **87** (measured now): the same 21 `RangeInternals` errors, and the api's **66**, which are 61 overloading errors and 5 return-type errors. The 66, by name: `FORWARD_CMP` 19, `IN` 7, `lift` 6, `seq` 5, `juxtaposition` 4, `generate` 4, `MIN` 4, `MAX` 4, `ivmap` 3, `map` 2, and one each of `isLeftZero`, `copy` and `SQCAP`. Every clearing way gives the same list once source positions are masked (`captures/count/compare.txt`). The distance stage already counts the 66, with the clause as class H2, 2 errors (`compile-ladder/climb-batch-7/gate/distance.txt:1-12`, cited). The only distance change a clearing way should make is those 2, by reading; no distance run finished for this note (section 5). A "load test" is C4's check (`explorations/run-c4/src/MicroGptFlatCheck.fss`) under walk from an empty cache, cut at 600 s. Its printed lines are compared, timings masked, with rung A's full captures on file (`compile-ladder/rung-tabulate/probes/mg-edit-*.txt`, 40 of 40; `captures/walk/compare.txt`).

### Way 1. The library's own practice: the open marker

- **What.** `trait AnyIntegral extends { Number } end`, as the team wrote the markers above its other generics: `AnyMaybe`, `HasRank` and `AnyList`, each open, with `excludes` and a "not yet: `comprises X[\T\] where [\T\]`" comment (`Library/FortressLibrary.fsi:882-885`, `:1129-1130`; `Library/List.fsi:52-56`). The api stood so from Ryu's `3d2849cef` (2009-04-17) to `02d09a39f` (2026-09-19).
- **Count.** It clears the error; cited rung H (`compile-ladder/rung-exclusion-remainder/REPORT.md` section 6), and 87 measured now (`captures/count/open.txt`).
- **Walk.** It refuses the library at load: the generic scalar block's `MAX[\T extends Number, I\](x: Array[\T,I\], y: T)` against `StandardTotalOrder[\T\].MAX` has no excluding pair of parameters. Cited rung H (`probes/integral/open-MicroGptFlatCheck.txt:8-14`), and the same measured now (`captures/walk/c4-open.txt`). The block (`Library/FortressLibrary.fss:4601-4611`) loads today because every leaf of `Number` is an object, and walk's exclusion test compares leaves (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:283-297`; `02d09a39f`'s message).
- **How the library gets around the blocking rule.**
  - Maessen's own advice with the open marker, "add `excludes { Number }` to traits involving some of the crazier sorts of overloading" (`82c85b03a`), does not apply. The colliding traits are the algebra's, and a number is a `StandardTotalOrder` and an `AdditiveGroup`, so such a clause would be false (my reading).
  - **The placeholder device for the orders, measured now.** The `AnyAdditiveGroup` pattern ("Place holder for exclusions of AdditiveGroup", `Library/FortressLibrary.fsi:255-260`) applied to `StandardMin` and `StandardMax`: `AnyStandardMin` and `AnyStandardMax`, which `HasRank` excludes; that is true, since no array is an order. It gets walk past `MAX`, and walk then stops at the block's `+` against `AdditiveGroup.+` (`captures/walk/c4-marker.txt`). Arrays cannot exclude `AnyAdditiveGroup`, because `Vector` and `Matrix` are additive groups (`.fsi:1535-1537`, `:1653-1655`). On the checker the device clears 8 of the 66 whatever else is done: the block's `MIN` and `MAX` against `StandardMin`, `StandardMax` and `StandardMinMax`, in both operand orders. That takes the count to **79** with this way, with the narrow accommodation and with way 2 (`captures/count/marker.txt`, `narrow-markeronly.txt`, `skmark.txt`). With the clause kept, walk loads, and 38 check lines match (`captures/walk/c4-markeronly.txt`).
  - **The block written per element type, measured now on the checker only.** The team shipped a `ZZ32`-only block before `02d09a39f` generalised it. Written for the seven number types, the block has 56 declarations for its 8. The count is 107, and 79 with the placeholders (`captures/count/ground.txt`, `groundmark.txt`). Walk was not run.
- **Cost.** Two library lines, blocked at walk; ten more for the placeholders, still blocked at `+`.

### Way 2. The keep-the-rule sketch, and the sketch with `Integral`'s exclusions restated

- **What.** `Integral[\I\]` without `AnyIntegral` in its `extends` clause (`reviews/mie-probes/keep/flat-tower-sketch.fsi:77-79`). The five keep `AnyIntegral`, so every integer value is still a `Number` and the clause is still true of the five. **`skexcl`** (new here) adds to `Integral` the exclusions it had through `Number`: `excludes { AnyMaybe, AnyUniqueItem, HasRank }`, the non-generic traits of the api that exclude `Number`. This is Maessen's device used the other way round. `Generator[\E\]`, `Array1`, the strided factories' trait and `Array3` also exclude `Number`, but a generic cannot be named in a clause without a `where` clause.
- **Count.** The sketch was cited rung H; both read 87 measured now (`captures/count/sketch.txt`, `skexcl.txt`).
- **Walk.** The sketch is refused at load: C4's `/[\I\]` (`explorations/run-c4/src/FlatArrays.fss:26`) against `Integral[\I\]./`. Cited rung H (`probes/integral/sketch-MicroGptFlatCheck.txt:8-14`), and the same measured now. `skexcl` loads, measured now: both microGPT checks pass 40 of 40, every check line identical to the capture on file (`captures/walk/skexcl-MicroGptFlatCheck.txt`, `skexcl-MicroGptAplCheck.txt`, `compare.txt`). The interpreter tests and the distance were not run (section 5).
- **Specification.** `AnyIntegral`'s immediate subtypes are exactly the five, so the rendered text and the note are met. The number chapters make each type a direct subtype of `Number` (`Specification/basic-lib/numbers.tex:27-49`), and the five still are.
- **Cost.** Two or three library lines per file.
- **Forecloses.** `Integral[\I\]` as a `Number` in generic code: a body over `I extends Integral[\I\]` loses `Number`'s members unless it bounds `I` by `Number` too. Whether any library body relies on them is what the distance would show; it did not finish. The exclusions written by hand must follow `Number`'s.

### Way 3. The self-type idiom, `comprises I`, with walk taught to stop

- **What.** `trait Integral[\I extends Integral[\I\]\] extends { ... } comprises I`: the team's idiom of 2009 (Ryu, `3a8ad3b67`), the compiler library's (`Library/CompilerAlgebra.fsi:16`, `:24`), and Naden's reading. `AnyIntegral`'s clause is kept.
- **Count.** Cited rung H, and 87 measured now; one message now prints the self type, `(Integral[\I\] & {I})` (`captures/count/self.txt`).
- **Walk.** Walk overflows its stack at load; cited rung H and row 407, and measured now (`captures/walk/c4-self.txt`). A 6-line walk edit stops the overflow, measured now (`shadow-walk407.py`, in `BuildEnvironments.finishTrait`). It leaves a type variable out of a trait's recorded clause, so the generic's symbolic instance records no clause, while `Integral[\ZZ32\]` records `comprises { ZZ32 }`, the idiom's reading. With that edit C4's check loads, and 38 check lines are identical (`captures/walk/c4-self-w407.txt`). The full checks and the tests were not run.
- **Specification.** A type variable is not "a declared trait identifier" (`traits.tex:163-164`), and Victor's note leaves the reading open. The later Types chapter allows it. Welterweight's grammar does not.
- **Cost.** Two library lines, and a walk edit of about 6 Java lines with its gated test.
- **Forecloses.** A form the designers' later calculus dropped. Route C's experiment overflowed the checker's `Formula` with `comprises T` on eight traits (FACTS, "Route C built whole as a shadow"); with one trait the count stage finishes.

### Way 4. The team's 2008 clause on `Integral[\I\]`, and the checker's instance rule

- **What.** `Integral[\I\] ... comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` beside `AnyIntegral`'s clause, as Maessen and Flood wrote it in 2008 (section 4).
- **Count.** The api stops on five "X is included in the comprises clause of Integral but X does not extend Integral[\I\]", Ryu's rule (`7d1ec0ac3`). Cited FACTS ("The tower closure of `02d09a39f`") and rung H's skeptic, 48 (`probes/skeptic/variant-counts.txt:3-30`); 26 measured now (`captures/count/y2008.txt`).
- **The instance rule, measured now.** The shadow relaxes the rule to "extends some instantiation" (`shadow-thc.py`, `-Dprobe.aicw.comprisesInstance=true`). The count is then **124**: the 66, plus 37 on each integer type's own operators against `Integral`'s, now read at `(Integral[\I\] & {ZZ, ZZ64, ZZ32, NN64, NN32})` (`REM`, `MOD`, `DIV`, `GCD`, `LCM` and others; `captures/count/compare.txt`; not traced). It also changes two of the team's gated tests that pin the rule: `XXX10h` goes from 2 errors to 1 and `XXX10n` from 1 to 0 (`captures/probes/switches.txt`).
- **Walk.** It loads, measured now: C4's check ran to its end, 40 of 40, identical (`captures/walk/c4-y2008.txt`). The APL check was not run.
- **Specification.** The Types paper and Welterweight require a listed type to be below the trait at its own parameters, and `ZZ` is not below `Integral[\I\]` for every `I`. Every peer accepts this shape (section 3).
- **Cost.** Two library lines, a checker rule the team wrote against in 2009, 37 errors more, and two team tests changed.
- **Forecloses.** A program's own integral type, which it refuses (section 1).

### Way 5. `Number`'s clause carrying the closure (measured now)

- `AnyIntegral` open, and `Number comprises` the seven number types directly: the count stays 22, and the error moves up one level, "Number has a comprises clause but its immediate subtype AnyIntegral is not eligible to extend it" (`captures/count/numlist.txt`).
- The seven listed together with `AnyIntegral`: the count is 87, and walk refuses the library as in way 1, because walk expands the open `AnyIntegral` to itself (`captures/count/numlist2.txt`, `captures/walk/c4-numlist2.txt`).
- Batch N's rung Q edits `Number`'s clause (`coordinator/CLIMB-BATCH-N.md:276`).

### Way 6. The generic named bare, as Java's `permits` and Scala's `sealed` name a class (measured now)

`AnyIntegral ... comprises { ZZ, ZZ64, ZZ32, NN64, NN32, Integral }` is refused before the hierarchy check, "Type requires static arguments: FortressLibrary.Integral", and the unit stops there (`captures/count/bare.txt`).

### Way 7. The api and the component differ (measured now)

- `AnyIntegral` is open in the api only; the component keeps the clause, and walk, which reads the component, keeps its closure.
- The count is 87. C4's check loads, and 36 check lines are identical (`captures/count/apionly.txt`, `captures/walk/c4-apionly.txt`).
- The specification refuses it: "A trait or object declaration is satisfied by a declaration that has the same header" (`Specification/basic/components/source-code.tex:372-381`). The export checker compares clauses (`ExportChecker.scala:363-364`). The component's own error stays, for the switch-over to meet.

### Way 8. The ellipsis (cited: blocked)

The checker refuses every api-declared extender of a clause with `...` (`TypeHierarchyChecker.scala:209-212`; row 354, guarded by `XXX3q` and `XXX10p`). The specification's note refuses an unlisted api-declared extender (`traits.tex:241-246`), and a satisfying component may add only types the api does not declare (`source-code.tex:386-392`). Rung H section 6.

### Way 9. The team's `where` spelling (cited: unbuilt)

`comprises Integral[\I\] where [\I\]` (`Library/FortressLibrary.fsi:434`): the grammar's `Comprises ::= comprises TraitTypes` has no `where` (`traits.tex:88`). Where clauses are unimplemented on both paths (row 331). The later Types chapter does not let `AnyIntegral` list a generic it does not determine.

### Way 10. The parked accommodation, broad form (5 lines; measured now)

- **What.** `isEligibleToExtend` accepts any generic immediate subtrait (`shadow-thc.py`, `-Dprobe.aicw.eligibleRelax=true`; the zero probe's disjunct re-applied to today's file).
- **Count.** 87, the `FortressLibrary` row 132, the clearing list exactly (`captures/count/relax-base.txt`).
- **False list.** It accepts `perf-probes/nat/zero/zElig.fss` (`S comprises { A }`, `B[\X\] extends S`), a false list (`captures/probes/switches.txt`).
- **Guards.** `XXX3q` and `XXX10p`, run as plain compiles, still fail with their pinned message and count (`captures/probes/guards.txt`). Of the 39 compiler tests whose source has a clause, it changes one: the team's `Compiled9.z` (`trait Foo[\T, U\] comprises Bar[\U, T\]` with `trait Bar[\V, W\] extends Foo[\V, W\]`, a genuinely false list) goes from 2 errors to 1, so `XXX9z` turns red (`captures/ctests/summary.txt`, `captures/probes/switches.txt`).
- **Walk and microGPT.** Cannot change; the edit is in the checker alone.

### Way 11. The parked accommodation, narrow form (14 lines; measured now)

- **What.** A generic immediate subtrait is accepted only when every trait the checker's table knows that immediately extends it is below a listed type (`everyKnownSubtypeListed`, zero.md's code verbatim, `-Dprobe.aicw.eligibleNarrow=true`).
- **Count.** 87, the `FortressLibrary` row 132, the clearing list exactly (`captures/count/narrow-base.txt`); 79 with the placeholder device.
- **False list.** It refuses `zElig.fss` and accepts `zElig2.fss`, whose list is true.
- **Guards.** `XXX3q` and `XXX10p` still fail as pinned. None of the 39 compiler tests changes.
- **What it cannot see.** A program's own `trait MyIntegral extends Integral[\MyIntegral\]` in another unit is accepted, as on the tree (section 1).
- **Walk and microGPT.** Cannot change.

### Way 12. Leave it

- The count stage reads 22 and never runs the api's 66; the distance stage counts them.
- Walk is unchanged.

## 3. The peers (read)

Every peer closes a family of type constructors and lets a member fix the family's parameter. None has the checker's rule that a listed member extend the generic at every instantiation.

- **Java 17.** `permits TypeName {, TypeName}` names classes without type arguments, and each must be a direct subclass (JLS SE 21 § 8.1.6, https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.6). Each is `final`, `sealed` or `non-sealed`, in the same module or package (JEP 409, https://openjdk.org/jeps/409). A sealed generic `Integral<I>` permitting `ZZ32 implements Integral<ZZ32>` is the 2008 shape.
- **Scala 3.** "A sealed class may not be directly inherited, except if the inheriting template is defined in the same source file ... subclasses of a sealed class can be inherited anywhere" (spec 3.4 § 5.2, https://scala-lang.org/files/archive/spec/3.4/05-classes-and-objects.html). Closure is by direct subclass, and a subclass may fix the parent's parameter (`case Refl[R](f: R => R) extends View[R]`, https://docs.scala-lang.org/scala3/reference/enums/adts.html).
- **Kotlin.** Direct subclasses of a sealed interface are in the same package, and "no new implementations can be created" once the module is compiled (https://kotlinlang.org/docs/sealed-classes.html).
- **Rust.** An enum's variants are fixed at its declaration and are not types one can extend (https://doc.rust-lang.org/reference/items/enumerations.html). A closed set of implementing types is the sealed-trait pattern (API Guidelines C-SEALED, https://rust-lang.github.io/api-guidelines/future-proofing.html).
- **Haskell.** A closed type family gives "the full set of equations" at its declaration (GHC User's Guide 6.4.10.2.3, https://downloads.haskell.org/ghc/latest/docs/users_guide/exts/type_families.html). A GADT constructor fixes the index, `Lit :: Int -> Term Int` (https://downloads.haskell.org/ghc/latest/docs/users_guide/exts/gadt.html): `Integral` indexed by the five, closed at its declaration.

## 4. The history (read; git)

- **2007-12-13, Maessen** (`1c492019f`): the first api writes `(* comprises Maybe[\T\] where [\T\] *)` above the marker, the form the "not yet" comments keep today.
- **2008-04-15, Maessen** (`900bff59b`): walk's exclusion starts to read clauses ("We now account for comprises clauses when performing exclusion tests"), and `Integral comprises { ZZ64, IntLiteral }`.
- **2008-07-02, Maessen** (`82c85b03a`): `Integral` made generic and `AnyIntegral` introduced, the clause kept on `Integral[\I\]`, with the message "the Number hierarchy is no longer strictly closed (since we can't write a comprises clause that mentions `Integral[\I\]`) ... you may find that you need to add `excludes { Number }`".
- **2008-07-10, Flood** (`25acd32f7`): the clause becomes `{ ZZ, IntLiteral }`.
- **2009-04-17, Ryu.** At 05:44 UTC the checker's comprises rule (`360905925`). At 15:43 UTC (`3d2849cef`, "Fixed comprises clauses in libraries") she deleted `Integral`'s clause and left `AnyIntegral` open, as it stayed until 2026 (`a874948ac:Library/FortressLibrary.fsi:406-408`).
- **2009-09-23 to 10-23, Ryu**: generic traits in the rule (`4f2b40774`); the self-type idiom proposal (`3a8ad3b67`), whose "(3) Eligibility to extend" is today's `isEligibleToExtend` (`ProjectFortress/compiler_tests/Compiled10.i.fss`); "extends all possible instances" (`7d1ec0ac3`); and the ellipsis rule (`5456bd1f2`).
- **2011-2012, the compiler library.** `Equality[\T\] comprises T` is in `CompilerAlgebra.fsi` at its first reachable copy (`26718e298`, 2011-12-06). `StandardTotalOrder ... comprises T` appears by the import of 2012-07-19 (`5a68404fd`); its author is not recorded. Naden names the idiom in 2012; Welterweight drops the bare type parameter from clauses.
- **2026.** `02d09a39f` closed the tower so walk would load the generic scalar block, and Pavol approved it with a `NOT YET` comment and parked the accommodation (POSITIONS 2026-09-21). Rung F made the list the five (`d846e3644`); rung H left it (`952892a00`, row 459).

## 5. Stopped on the narrowed brief, and not measured

On the coordinator's narrowing at 07:16 UTC these were stopped and not restarted:

- the interpreter tests and the distance stage, for every way;
- the full microGPT checks for `self` with the walk edit;
- the APL check for the 2008 clause, the api-only split and the placeholders;
- walk for the per-type scalar block;
- the user probes after the leaf form on the tree.

What each way would do to the distance is therefore by reading only (the 2 H2 errors), and walk's 422 interpreter tests were not run on any variant. Their runners are in the directory and have produced no capture: `distance.sh`, `tests.sh` with `compare-tests.py`, and `mg.sh` for the self edit.

## 6. Re-measured against the record

- **The count on the tree.** 22, `FortressLibrary` row 2 (`captures/count/base.txt`), against 22 in the gate (`compile-ladder/climb-batch-7/gate/checker-count.txt`): they agree.
- **The count with the clause cleared.** 87, `FortressLibrary` 132, `NativeArray` 0, `RangeInternals` 42, against rung H's 190, `FortressLibrary` 294, `NativeArray` 44, `RangeInternals` 42 (`compile-ladder/rung-exclusion-remainder/probes/cleared/checker-count-cleared.txt`, and FACTS). They differ by 103: the api has 81 fewer errors and `NativeArray` 22 fewer. The cause is a tree change: rung H measured on its base `ff1649cea` before rungs A (`f3b62bc83`, `fill`/`tabulate`, `NativeArray` 44 to 0) and B (`de22fd928`) landed.
- **The three shapes giving one list.** `self`, `sketch` and `open` give one list, against rung H's "one list of 192 errors" (`probes/cleared/checker-count-ways.txt`): they agree, and the numbers differ by the same tree change.
- **The 2008 clause.** 26 with 5 "does not extend Integral[\I\]" errors, against the skeptic's 48 with the same 5 (`probes/skeptic/variant-counts.txt:3-30`): the 5 agree, and the 22 of difference is `NativeArray`'s, removed by rung A (`f3b62bc83`).
- **Walk on `open`, `sketch` and `self`.** The same refusals and the same overflow cycle as rung H's (`probes/integral/open-MicroGptFlatCheck.txt:8-14`, `sketch-...:8-14`, `self-...:22-60`): they agree. The library line numbers differ (for example `.fss:657` against `:662` for `Integral`'s `/`) through rungs A and B's edits; the overflow's frames `SymbolicType.java:74` and `FType.java:291` are present in mine.
- **The accommodation's false-list probes.** `zElig` accepted by the broad form and refused by the narrow, and `zElig2` accepted by both, against `perf-probes/nat/zero/03-elig-probe.out`: they agree.
- **The accommodation's count.** 22 to 87 on the tree, against zero.md's "115 → 114, the error sets differing in exactly one entry" (`perf-probes/nat/zero.md` section 2): they differ by design of the tree. Then the api stopped on other hierarchy errors as well, which the flattening (`d846e3644`) and rung H (`952892a00`) removed, so clearing this one error now lets the overloading and return-type checks run.
- **`XXX3q` and `XXX10p`.** They fail with their pinned text on the tree, against row 354's record (`compile-ladder/rung-library-defects/probes/skeptic/junit-xxx3q-10p-stock-skeptic.txt`): they agree.
- **C4's check under walk on the tree.** 37 lines identical to rung A's full capture (`compile-ladder/rung-tabulate/probes/mg-edit-MicroGptFlatCheck.txt`): they agree, over the lines the 600-s cut printed.
