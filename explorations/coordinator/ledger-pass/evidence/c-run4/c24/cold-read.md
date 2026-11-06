# Cold read: c-run4/c24

Read with `CLAUDE.md`, the `fortress-repo` skill's core and its references (not `revival-changes.md`, not `sources.md`). One note for every row: the skill names the seven status words but leaves their definitions to the ledger's row template, which a cold reader may not open. So I read `NEGATIVE-VERIFIED` as "a confirmed gap: build a fix", `NEGATIVE-BOUNDED` as "a confirmed gap whose reach is limited", and `CONTESTED` as "waits on a question". Those readings are inferences, not definitions.

## Row 400

- **Defect:** take two overloads, `ea[\nat n\](f: Box[\n\] -> ZZ32)` and `ea(f: Any)`. The call `ea(fn (b: Any): ZZ32 => 3)` fits the sized arm for every `n`, because the argument's domain `Any` lies above `Box[\n\]`, so the call cannot fix `n`. The checker should refuse the call. Instead it quietly drops the sized arm and compiles the call to `ea(f: Any)`, which prints 2. Walk runs the sized arm with `n` unbound and prints 1. When the size appears in no parameter type, the checker does refuse (`XXXNatUnknownSizeArm`). The gap is the case where the size appears inside the parameter type.
- **Where:** compiled checker, overload applicability. `Functionals.scala:257` at `c124c6b65` builds the refusing candidate only when the inferred domain holds no inference variable. Walk is also affected: it runs sized arms with the size unbound.
- **Reproduce:** no test. Write the two declarations and the call from the claim and run them on both paths: walk prints 1, compiled prints 2. A probe exists, `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomain.fss`, "in the parent of `ab067d9b6`". I take this to mean the probe was deleted in `ab067d9b6` and can be read with `git show ab067d9b6^:<path>`.
- **Status:** build a fix in the checker so that it refuses the call. The walk side waits on "E3". Workaround: write the static argument.
- **Could not resolve:**
  - "E3, the library's dead sizes": E3 is not in the skill, and I cannot tell what a "dead size" is. Missing concept or label.
  - "in the parent of `ab067d9b6`": could mean the parent commit or the parent directory. Unclear wording; I took it as the commit.
  - It is not clear whether the walk half belongs to this row or to row 446. The notes describe it with row 446's `ee` example. Unclear wording.
  - `XXXNatUnknownSizeArm` has no folder. I assume `compiler_tests/`. Minor.

## Row 446

- **Defect:** `ee[\nat n\](x: ZZ32)` beside `ee(x: Any)`, with `ee(a)` where `a: Any` holds a `ZZ32`. At check time the static type `Any` selects only `ee(x: Any)`, so the checker's refusal of an unfixed size (P-40) never looks at the sized arm. At run time both paths dispatch on the value and run the sized arm with no size, printing 1. If the body reads `n`, walk fails with 'undefined variable [n]'. The compiled run dies with a Java `NumberFormatException`, because the class loader parses the size's text "n" as a numeral (`MethodInstantiater.java:227` at `c124c6b65`).
- **Where:** both paths at run time (dispatch, and the compiled class loader), plus the checker's static check, which reads only the arm chosen for the static type.
- **Reproduce:** no test. Run the snippet from the notes on both paths, first with body `= 1` and then with body `= n`. Probe `.../probes/skeptic/SkDynZZ32Val.fss`, recovered from the commit before `ab067d9b6` as in row 400.
- **Status:** build a fix. Workaround: write the static argument.
- **Could not resolve:**
  - The fix's location. The class is "runtime", but the cause is described as the checker reading only one arm. I cannot tell whether a worker should make the checker refuse the call, or make dispatch skip or report an arm whose size is unfixed. The specification's intent (refuse at compile time, or not dispatch to the arm) is not stated. Unclear wording.
  - P-40: a POSITIONS entry, so it can be looked up. Its content is only half given ("refusal of an unfixed size").
  - The second specification section, "Applicability to Named Functional Calls", names no file. I assume `basic/overloading.tex`. Minor.

## Row 682

- **Defect:** `trait NatParamT comprises { Nt[\n\] } where [\nat n\]`, with `f(x: NatParamT)` beside `f[\nat n\](x: Nt[\n\])`. The compiled checker refuses the pair as duplicates ('multiple declarations of f with the same parameter type'). Walk loads the pair and calls the generic one. The checker's subtype relation "opens" the trait to its listed type, so each domain lies below the other and the No Duplicates rule fires. Without the opening, the generic arm is strictly more specific (POPL 2019). The error message names either parameter type, varying from run to run. A type `where` variable is refused in the same way (`XXXOpenTypeOverloadChecker`).
- **Where:** compiled checker, `TypeAnalyzer.scala:287-300` at `c124c6b65`. Walk's load check reads only `Nt[\n\] <: NatParamT`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNatOpenOverloadChecker.test`, an expected failure.
- **Status:** wait. The row is open on review-queue item 30, the curator's answer on "way 4a" (F-270). The curator set the status word. Do not build a fix.
- **Could not resolve:**
  - "opens", "opening": the skill does not define opening a `comprises` trait to its listed type. Missing concept, and central to the row.
  - "way 4a", and "opens a size known only at run time": I cannot tell what way 4a is, or what the curator is being asked. F-270 can be looked up, but the row does not say what the question is. Unclear wording.
  - "the status word is his": I read it as "the curator set CONTESTED". Readable, but oblique.
  - "No Duplicates": I take it to be a rule of the specification, but no section is named for it. Minor.

## Row 713

- **Defect:** take `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, where `K comprises { A, B, C }`, `Z excludes { A, B }`, and `C` extends `Z` but not `R`. Only `C` could be in both domains, and the bound `R[\T\]` excludes `C`, so the domains cannot meet. Walk refuses the pair at load ('fails the Meet Rule'): its check (`ruleFailure`) finds neither an exclusion nor a covering third declaration. The compiled checker reads `T` as its bounds, `K & R[\#T\] & Z`, normalises that to Bottom (`TypeSchemaAnalyzer.meetEmptyWithBounds`, P-157), and accepts and runs the program. The skill's `interpreter.md` describes the same difference.
- **Where:** walk's load check, `OverloadedFunction.java:901` at `c124c6b65`.
- **Reproduce:** `ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.fss` asserts walk's refusal. `compiler_tests/OverloadTwoBoundsClosedTraitExclusion` prints PASS on the compiled path.
- **Status:** wait. The specification has not settled whether two parameter types exclude when only static arguments that a bound rules out could meet them (Appendix I, "Passages not yet revised"). Leave walk as it is. The walk test pins the current refusal.
- **Could not resolve:**
  - "design limit (walk)" against "implementation gap": the skill never defines "design limit". I read it as "walk does this by design, not by mistake", which does not quite fit a CONTESTED row. Missing concept.
  - `#T`: I guess an inference variable for `T`, but the skill does not define the notation. Missing concept.
  - "reads `T` at the top of the meet as its bounds": readable only roughly. Unclear wording.

## Row 770

- **Defect:** an api declares `trait Q comprises { R }` with the abstract functional method `num(self): ZZ32`, and `object R extends Q` declares `num(self): ZZ32` too. The compiled checker refuses the api with 'multiple declarations of num with the same parameter type'. Walk runs it. For a component, the checker leaves out an abstract functional method that a subtype's declaration implements. For an api, `toFunctionArrows` returns every functional method unfiltered.
- **Where:** compiled checker, `OverloadingChecker.scala:139` (api, no filter) against `:140-162` (component filter), at `c124c6b65`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXApiFunctionalMethodOfComprisedObject.test`. The component twin `AbstractFunctionalMethodImplementedByComprised` passes.
- **Status:** build a fix: apply the component filter to the api's set too. Workaround: keep the object's declaration out of the api. The library does not meet this today (`QQ` and `Ratio` are not in its api).
- **Could not resolve:**
  - "A trait inherits no method whose parameter type equals that of one it declares": it is not clear which trait is meant, or how this bears on the fix. It reads as an override rule that justifies the filter, but its subject could be `Q` or a type that extends it. Unclear wording.
  - "Without an api, compiled, `num(R)` on the object dies at run time (row 815)": this looks like a second defect on the component path, so the twin test passing is not the whole picture. It points elsewhere without saying how the two fixes interact. Unclear wording.

## Row 786

- **Defect:** `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`, where `Red`, `Blue` and `Box` are objects. Walk loads the pair, reading two type parameters whose bounds exclude as never the same type (`mayBeEqual`, `OverloadedFunction.java:1539` at `c124c6b65`). The compiled checker refuses it with 'Invalid overloading of tint'. It merges the two declarations into one parameter bounded by both, `[\T$6 extends Blue Red\]Box[\T$6\]`, and `Box[\Bottom\]` is an instance of that, so the meet is not empty. Bottom lies within both bounds, so the checker's reading may be the sound one.
- **Where:** compiled checker (`TypeSchemaAnalyzer.meetEmptyWithBounds`) against walk's load check.
- **Reproduce:** `ProjectFortress/tests/GenericPairExcludingWalk.fss` (walk loads it). `compiler_tests/XXXExclusionExcludingBoundsBox` (the checker refuses it).
- **Status:** wait. It is open which path should change. P-26 points to the checker's refusal. Do not build either fix yet.
- **Could not resolve:**
  - "existential", and "the checker's reduction": the skill does not say that the checker turns a pair of generic declarations into an existential type. Missing concept.
  - "P-26 points to the checker's refusal": this could mean that P-26 supports the refusal (so walk should change), or that it merely mentions it. Can be read two ways.
  - "design limit (checker)": as in row 713, the term is undefined. Both paths are in question, so the area "checker" seems to prejudge the open question. Unclear wording.
  - `Red` and `Blue` are objects, which are leaves, so `T extends Red` admits only `Red` and Bottom. The row does not say whether Bottom is a legal static argument in Fortress. Missing concept.

## Row 803

- **Defect:** the compiled checker's constraint solver recurses forever on an intersection that holds an inference variable beside its F-bound, such as `#T & Numb & AddG[\#T\] & AddG[\#V\]`. `Formula.tImplies` and `primImp` call each other through `TypeAnalyzer.excludes` until a `StackOverflowError`, even with a 1 GB stack.
- **Where:** compiled checker, `Formula.scala:282` and `:287-292` at `c124c6b65`. It is reached from `normConjunct`'s subtype test (`TypeAnalyzer.scala:805`) under `equivalent(body, BOTTOM)`. The team's comment there warns that a recursive implies does not terminate, and `forall`'s `stackLevel` guard (`:308-314`) is not on this path.
- **Reproduce:** only through `shadow.py bounds keepvar`, typechecking the probe's `VecPairsLeft`, as `explorations/perf-probes/self-type-exclusion/REPORT.md` describes. No plain-checker program is known to reach it, because the exclusion test as built reads each parameter as its bounds alone (`compiler_tests/ExclusionBoundsScalarLeft`).
- **Status:** I read `NEGATIVE-BOUNDED` as "real, but out of reach of today's checker": leave it unless your work turns on the keep-variable mode, or meets a parameter with its bounds in the exclusion test.
- **Could not resolve:**
  - `shadow.py bounds keepvar`: the skill does not describe this tool or its mode. Missing concept.
  - "plain-checker program": I take it to mean the checker as built, without the shadow mode. Unclear wording.
  - `NEGATIVE-BOUNDED`: undefined for a cold reader (see the top of this report).
  - The reproducer cell names a report, not a program or a test, so a worker must first find the probe source. Unclear wording.

## Row 894

- **Defect:** the declarations are `PLUS[\T extends AddG[\T\]\](x: Sub[\T\], y: T): T` beside `AddG`'s `opr PLUS(self, other: T): T`, with `Sub[\T\] extends AddG[\T\]`. The top-level function's domain lies inside that of the functional method, and the Return Type Rule holds at every instance. The compiled checker refuses it ('Overload violation: the declaration of top-level function PLUS ... is more specific than the declaration of the functional method PLUS'). Walk loads it and runs each object's own `PLUS`. The refusing check, `checkFancyRule`, refuses every top-level function more specific than a functional method of the same name, and `advanced/overloading.tex` states no such rule. The skill's `interpreter.md` describes the same difference.
- **Where:** compiled checker, `OverloadingChecker.scala:413-424` at `c124c6b65`.
- **Reproduce:** `ProjectFortress/tests/GenericInsideTraitMethodWalk.fss` shows that walk loads it. Compiling the same program shows the refusal.
- **Status:** wait. No decision says whether `checkFancyRule` is a rule of the language (`reviews/popl2019-rules-map.md`, section 18). Do not remove the check.
- **Could not resolve:**
  - The claim, "a generic function inside a self-typed trait's functional method's declared domain whose return type holds": "whose return type holds" could attach to the function or to the method. Only the notes make clear that it means "for which the Return Type Rule holds". Unclear wording.
  - Class "implementation gap" with status CONTESTED: if the rule turns out to be the language's, this is not a gap. Readable, but the class prejudges the question. Unclear wording.

## Row 752

- **Defect:** the compiled checker does not "open", as a parent, a trait whose `comprises` clause lists a type at a type `where`-clause variable. Example: `trait Mid[\E\] extends AnyBox` and `object Box[\E\] extends Mid[\E\]`. A value of type `Mid[\ZZ32\]` is refused where `Box[\F\]` is expected ('is not applicable to an argument of type Mid[\ZZ32\]'), although every `Mid[\ZZ32\]` must be a `Box`. Walk runs the program. The same shape at a size is accepted (`NatOpenThroughSubtraitChecker`). Not opening is deliberate: it keeps a listed type from being opened a second time, as `List[\E\]` through `AnyList`, which cost `List` 22 sites in the where-clause probe.
- **Where:** compiled checker, `throughParent`, `TypeAnalyzer.scala:308-317` at `c124c6b65`. A conditional parent is read the same way.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXOpenTypeThroughSubtraitChecker.test`.
- **Status:** a confirmed design limit. Because of the List cost, I read this as "leave it", not "fix it". But the status word alone (`NEGATIVE-VERIFIED`) would suggest building a fix.
- **Could not resolve:**
  - `AnyBox`'s own `comprises` clause, for example `comprises { Box[\E\] } where [\E\]`, is never given. The example only works if a reader supplies it. Unclear wording.
  - "where `Box[\F\]` is expected": `F` is not introduced. Unclear wording.
  - "open", "a second opening", "opened as on the base": the same missing concept as row 682.
  - "which cost List 22 sites in the where-clause probe": I cannot tell what a "site" is (checker errors, call sites?) or which probe is meant. Unclear wording.
  - It is unclear whether a worker should fix this or leave it. Design limit plus NEGATIVE-VERIFIED reads two ways.

## Row 893

- **Defect:** under walk, `object Bad extends { Arry[\Rr\], AddG[\Rr\] }` loads, although `AddG` is self-typed and `Bad` is not a subtype of `Rr`. The specification makes that a static error, and the compiled checker refuses it ('whose self parameter is Rr, but Bad is not a subtype of Rr'). Walk's exclusion test reads the trait's self parameter as `C[\X\] & X` (`selfTypeParameter`). So beside `MINUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T)`, the call `Bad MINUS Rr` runs the array operator ('array minus number'), even though `AddG[\Rr\]`'s `MINUS` also fits and neither is more specific. Walk applies no extender rule of P-146.
- **Where:** walk's load check, `OverloadedFunction.java:845-867` at `c124c6b65`. The specification's text is at `Specification/appendices/changes.tex:4105-4110`.
- **Reproduce:** `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss`, an expected failure that should turn green once walk refuses `Bad` at load.
- **Status:** build a fix in walk: refuse an object that extends a self-typed trait at a type it is not a subtype of (P-146's extender rule).
- **Could not resolve:**
  - `C[\X\] & X`: the notation is clear, but `C` and `X` are not tied to `AddG` and `Rr` in the row. Minor wording.
  - "the extender rule of P-146": the content is only implied. It can be looked up.
  - It is not clear whether the ambiguous-call half is a separate defect that remains after the load refusal, or just a consequence of it. I read it as a consequence. Unclear wording.
