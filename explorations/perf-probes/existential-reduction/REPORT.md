<!-- The probe that P-152 asks for: the algorithm, on walk and on the compiled checker, that reads exclusion between two declarations with static parameters over the whole parameter type, as the type group's paper of 2011 decides it by existential reduction, built as a shadow on each path and measured. For the curator and the batch rung on each path that P-152 names. Method: a base build of main at ba93d28ec (/home/user/fortress-base-p152, built in place: no base build at main existed) and a worktree seeded from it on wip/probe-p152; each path's change made there, test first; old against new by explorations/coordinator/tools/old-fortress.sh. walk.patch and checker.patch beside this note are the two changes with their tests, against ba93d28ec; each applies with `git apply` (checked with `git apply --check` in the base build). Every build and run went under nice -n 19. The worker's write of this file was refused by the harness; the text is the worker's returned text, word for word (agent a7bc15c38fddac2ba, 2026-10-19; branch wip/probe-p152 at ff3221051). -->

# Exclusion read over the whole parameter type: the probe for P-152

## 1. In short

- **The algorithm.** Assume that a value has both parameter types. At every position, each generic type that both parameter types there are or extend is then extended at one instance, so its static arguments are equal. Gather these equalities over all positions and unify them. The two declarations exclude where the equalities cannot hold together, or where, at the unifier, the two parameter types at some position exclude. This is the paper's existential reduction. Its formal rule does not cover the case where the gathered constraint is False (section 2), and that case is rows 740 and 741.
- **The compiled checker** already gathers the constraint over the whole parameter type. Its reduction only drops the False case: `reduceED` cannot unify False, so it leaves the meet as it is. The change is one call in the exclusion test, plus a 15-line `emptyED` beside `reduceED`.
- **Walk** reads no exclusion across positions for two generic declarations: `genericMeetCovered` matches the domains position by position. The change is one new method, `domainsExcludeTogether` (about 110 lines). It reuses the file's own `matchApart`, `meetParams`, `argsMayBeEqual` and `mayBeEqual`. It is called from the Meet branch of `genericPairValid` and of the generic-beside-plain reading.
- **Rows 740 and 741.** Both expected-failure tests are promoted and green on their paths: `tests/GenericPairExcludesTogetherWalk` and `compiler_tests/GenericPairSharedSupertypeExclusion`. One new test of row 740's pair is added for the checker, and one refusal guard on each path.
- **What the changes accept and refuse.** Neither change refuses a pair that it accepted before: each only adds a way to be valid. On the eleven probe shapes and on rung G's ten tests, walk and the checker now agree on every pair but one. That pair is `tint`, two bounds that exclude (row 741's notes). Walk loads it, and the checker refuses it before and after; it is not a reading over the whole parameter type (question 1).
- **Suites, on the code state of both changes:**
  - `ant testSystem`: 657 tests, 0 failures.
  - `ant testSpecData`: 130 tests, 0 failures.
  - `ant testQuick`: 1,276 / 86 / 263 tests, 0 failures.
  - Count stage: both tables, and the outputs after the path is masked, are equal to the base's.
  - Distance stage: 34 = 34, the tables equal.
- **The library** holds no site of the distance. The distance has no overloading error before or after (section 6).

## 2. What the paper says, and the specification's passage

**The paper** (`Papers/Types/exc-reduction.tick`, the type group's OOPSLA 2011 paper, written December 2010 by its history; one of the late positions, P-26):

- It frames the reduction as a case analysis (`:7-21`). Where two domains should both apply to an argument W, an existential intersection type arises. It is either non-excluding, or "$S \exc T$ in which case the intersection has the same extent as \Bottom". Then the Meet Rule and the Return Type Rule "are both trivially satisfied by the presence of the implicit overloading on \Bottom" (`rules.tick:205-219`).
- The method is to "reason backwards" (`:22-33`): "Under the assumption that the intersection is nontrivial ..., gather the necessary constraints on type parameters". The example is `C[\X\] CAP C[\Y\]` not Bottom, which gives X equal to Y. The constraints are then reduced to an instantiation and tighter bounds.
- The rule (`:62-73`, Figure "Quantifier reduction judgments") has four premises:
  1. C, the constraint implied by the body T not being Bottom, its type parameters read as inference variables;
  2. C', the bounds;
  3. `unify(C ∧ C')`, which gives φ and a leftover C'';
  4. C'' written as bounds Δ''.

  The result is ∃Δ''.φ(T). Otherwise the existential "merely relates ... to itself".
- The constraint is computed over the whole type:
  - A tuple is Bottom if any element is (`exc-constraints.tick:73-85`).
  - Two tuples exclude where any pair of their elements does (`fig-exclusion.tick:55-57`).
  - Instances of one type constructor among the two types' ancestors exclude where their arguments differ (`fig-exclusion.tick:136-147`).
  - So for row 740's meet, `(P[\I\], Box[\I\]) ∩ (Q[\J\], Box[\J\])`, the exclusion constraint is `(I ≡ J) ∨ (I ≢ J)`. It is True, and C is False.
- **The formal rule's gap.** `unify` is partial, and `unify` of False has no solution. So the "otherwise" rule applies, and the meet is left unreduced. Its inner subtyping, with the bound variables X and Y, does not show it below Bottom. The prose case analysis decides it, and the figure does not. This is not stated anywhere in the paper; it is my reading of the rule against the prose.

**The checker follows the figure**, measured on row 740's pair. I traced it with a debug copy of `OverloadingOracle.excludes` in a scratch class folder (`meetED(fd, gd, true)`, `compile` of the pair):

    reduceED:
       e[sp] = (AND(P[\T$5\],Q[\T$6\]), AND(Box[\T$5\],Box[\T$6\]))[List(T$5 extends Object, T$6 extends Object)]
       ieNotBottom = False
        c = False
    Unify False produces False
    EXCLUDES [\T extends Object\](P[\T\], Box[\T\]) / [\T extends Object\](Q[\T\], Box[\T\]) -> false

- Row 741's `copyOf` traces the same: `AND(Frozen[\#zc6y\],Thawed[\#3fpy\])`, `ieNotBottom = False`, `-> false`.
- The code is `TypeSchemaAnalyzer.scala:398-404` at ba93d28ec, `unifyWithDebug(c, debug).getOrElse(return None)`, and `Formula.scala:729`, `case False => None`. Then `normalizeED` returns the meet as it was (`:215-220`).

**The specification's passage** (`Specification/advanced/overloading.tex:582-592`, the revival's text of 2026-09-30, restating the paper):

- **Faithful on the reading.** The passage reads the whole parameter type. "Parameter type" is the declaration's whole parameter type, with $\Ps_i$ its elements (`Specification/basic/overloading.tex:160-180`). "Each static parameter stands for any type within its bound" is the paper's C'. "Instantiation exclusion lets them meet only where the static arguments ... are the same" is the paper's C, read as the prose reads it, so the passage does not carry the figure's gap.
- **Narrower than the paper in one word.** It says "where the two parameter types *mention* one parameterized trait". The paper reads every pair of the two types' *ancestors* (`fig-exclusion.tick:136-147`). Row 741's `copyOf` excludes only through `Readable`, which neither parameter type mentions. A reader gets that pair from `basic/types-vals-vars.tex`, "Trait Types" (no type extends two instantiations of one generic trait), and not from this sentence. Section 9 has a proposed edit for the rung.

## 3. Walk: the change

The cause of row 740 on walk is in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java` at ba93d28ec:

- A pair of two own generics that the parameter check refuses is read by `genericPairValid` (`:891-914`).
- Where neither declaration holds the other, only `genericMeetCovered` (`:1001-1046`) can make the pair valid. It needs the two domains to match position by position (`matchApart`, `:1137-1156`). `P[\T\]` against `Q[\U\]` does not match, so the pair is refused, "fails the Meet Rule".
- No step reads an exclusion that comes from two positions together. The withdrawal of the shared reading (`excludesOverInstances` and `oneInstance`, `:1227-1260`) reads one position at a time.

The change (`walk.patch`, `OverloadedFunction.java`, +127 -8 lines) adds `domainsExcludeTogether(o1, o2)`. It takes an own generic function f, and an own generic function or a declaration without static parameters g, each over its own static parameters by `Apart`. Its steps:

1. For each position, and each pair of generic instances among the two types and their supertypes (`withSupertypes`) that are instances of one generic type:
   - where their static arguments cannot be equal (`argsMayBeEqual`), the domains exclude;
   - otherwise they are matched (`matchApart`) into one union-find over the static parameters. A match that fails is undone, and its parameters are left apart, which shows less.
2. In each class, two members that are not parameters and cannot be equal (`mayBeEqual`) make the domains exclude. Two that may be equal but differ make the method answer "not shown".
3. Each class is read as one by `meetParams`, the file's own maker of the meet, with one added output: g's static arguments. A class of size parameters alone becomes one of them, f's where it holds one, since `meetParams` makes one only of type parameters.
4. At these static arguments, the two parameter types at some position exclude (`excludesOther`). For two instances of one generic type over static parameters, the method uses `argsMayBeEqual` instead, as `excludesOverInstances` does. Then the domains exclude.

Where clauses, varargs and parameter lists of different lengths are not read, and any exception answers "not shown". The call sites are two:

- `genericPairValid`'s Meet branch: `genericMeetCovered(o1, o2, all) || domainsExcludeTogether(o1, o2)`.
- The generic-beside-plain Meet branch of `validOnDeclaredDomains`: `genericOverlapCovered(...) || domainsExcludeTogether(gen, plain)`.

`meetParams` takes the one extra output parameter, `null` at its old call. It changes no team line: the file's lines that it touches are the revival's (rung G, F-238, F-252).

**Tests** (`walk.patch`):

- `tests/XXXGenericPairExcludesTogetherWalk.fss` is promoted to `GenericPairExcludesTogetherWalk.fss`. It keeps row 740's pair and its two assertions, and adds four pairs:
  - the pair with renamed static parameters (`r[\T\]` beside `r[\U\]`), a separate path in walk (not shared);
  - its form over sizes (`w[\nat n\]` beside `w[\nat m\]`);
  - the microGPT shape over traits (`pairOf[\T\](Ring[\T\], Ring[\T\])` beside `pairOf[\T\](RingZ, RingS)`), where the forced argument would be two types;
  - the same beside a plain declaration (`plainOf`).
- New guard: `tests/GenericPairFreeArgumentWalk.fss` with `.test` (`load_exception_contains=fails the Meet Rule`). It holds `o[\T\](P[\T\], Box[\T\])` beside `o[\T, U\](Q[\U\], Box[\T\])`, which `Box` does not separate.

The failing run, on the old code, before the final change was built:

    FORTRESS_HOME=/home/user/fortress-base-p152 .../harness-one.sh $W/tmp/old-harness \
        $W/ProjectFortress/tests/GenericPairExcludesTogetherWalk.fss $W/ProjectFortress/tests/GenericPairFreeArgumentWalk.fss ...test
    . interpret .../GenericPairFreeArgumentWalk
     OK Saw expected refusal at load
    . interpret .../GenericPairExcludesTogetherWalk
    Overloading of o[\T\](x:Q[\T\],b:Box[\T\]) ... and o[\T\](x:P[\T\],b:Box[\T\]) ...
    Tests run: 2,  Failures: 1,  Errors: 0

The passing run, after the last change of code (22:47 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h-walk-new <the same three files>
    . interpret tmp/h-walk-new/tests/GenericPairExcludesTogetherWalk
    PASS
    OK (2 tests)

**Suites**, once, on the code state of both changes (walk's change with the plain branch, and the checker's). The checker's change does not reach walk.

    ant testSystem      Tests run: 160 / 171 / 162 / 164, Failures: 0, Errors: 0 (657); BUILD SUCCESSFUL; Total time: 3 minutes 1 second
    ant testSpecData    Tests run: 130, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 49 seconds

The last landed gate ran 656 system tests (`climb-batch-18/gate/summary.txt`). The one more is `GenericPairFreeArgumentWalk`; the promotion keeps the count.

## 4. The compiled checker: the change

The change (`checker.patch`):

- `OverloadingOracle.scala:326`: `sa.subtypeED(md, BOTTOM)` becomes `sa.subtypeED(md, BOTTOM) || sa.emptyED(md)`. This is the oracle's one exclusion test, called only by `validOverloadingInner` (`typechecker/OverloadingChecker.scala:585`).
- `TypeSchemaAnalyzer.scala:434-456`, new `emptyED(ed)`: reduceED's first premise alone. It reads the type parameters as inference variables, and asks whether `negate(ta.equivalent(body, BOTTOM))` is False. If it is, the existential has no instance but Bottom, the paper's prose case. Its setup lines repeat reduceED's (`:369-380`), so reduceED itself is untouched.
- It reads no bounds. reduceED's own C' is the conjunct `ub`, which reads each parameter's `dominatesClause` (the fifth field of `SStaticParam`, `:385`; `Fortress.ast:1545-1552`). It was Any in both traces, "TPrimitive(Set(),Set(),Set(Any)...)" for `T extends Object`. No probe showed a pair that the bounds would decide here, so I left C' out.
- Since the test runs only where `subtypeED` failed, and only for pairs that are already neither more specific nor met, it can only turn an "Invalid overloading" into a valid pair.

**Tests** (`checker.patch`):

- `compiler_tests/XXXGenericPairSharedSupertypeExclusion.{fss,test}` is promoted to `GenericPairSharedSupertypeExclusion` (`compile`, `link`, `run`, `run_out_contains=PASS`).
- New: `compiler_tests/GenericPairExcludesTogether.{fss,test}`. It holds row 740's pair, its renamed form, and the `pairOf` and `plainOf` pairs, compiled and run.
- New guard: `compiler_tests/XXXGenericPairFreeArgument.{fss,test}`, the free-argument pair, `compile_err_contains=Invalid overloading of o in component XXXGenericPairFreeArgument`.

The failing run, on the old code:

    FORTRESS_HOME=$W explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base-p152 $W/tmp/old-caches junit \
        $C/GenericPairSharedSupertypeExclusion.test $C/GenericPairExcludesTogether.test $C/XXXGenericPairFreeArgument.test
        Invalid overloading of copyOf in component GenericPairSharedSupertypeExclusion:
        Invalid overloading of o in component GenericPairExcludesTogether:     (and r, pairOf, plainOf)
     Saw expected failure                                                   (the guard)
    FAILURES!!!
    Tests run: 7,  Failures: 6,  Errors: 0

The passing run, after the build of the change and the library order:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new ProjectFortress/compiler_tests \
        GenericPairSharedSupertypeExclusion.test GenericPairExcludesTogether.test XXXGenericPairFreeArgument.test
    . run ProjectFortress/compiler_tests/GenericPairSharedSupertypeExclusion (480ms) PASS
    . run ProjectFortress/compiler_tests/GenericPairExcludesTogether (521ms) PASS
    OK (7 tests)

The generated dispatch picks the right declaration in each pair, since the runs assert every call.

**Suites and stages** (same code state):

    ant testQuick       Tests run: 1276 / 86 / 263, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 4 minutes 17 seconds

The landed gate ran 1,270 compiler-track tests. The six more are the promotion's two more cases (link and run), the new test's three, and the guard's one.

| stage | base (ba93d28ec) | change | comparison |
|---|---|---|---|
| count (`checker-count/run.sh`) | `#total 30`, `#locations 29`, `#crash none`; 61.2 s | the same table; 59.0 s | tables equal (`diff` prints nothing); `run.txt` equal after each tree path is replaced by `TREE` |
| distance (`distance/run.sh`) | `#total 34` (overloading 0, typecheck 31, export 3), `#crash none`; 143 s | the same; 135 s | `compare.sh`: `DISTANCE SAME 34`; `errors.tsv` equal, `run.txt` equal but for its `seconds=` lines |

Machine: nproc 4, Intel Xeon @ 2.10 GHz, load 2.2 to 3.0 at the starts, openjdk 25.0.4.1, FORTRESS_THREADS=1; one run of each, base then change, in one sequence (`tmp/stages.sh`, scratch). The times are a smoke test: they show no slowdown. I made no speed pass and no profile (section 8, decision 4).

## 5. Old against new, and whether the paths agree

Each probe ran under walk and compiled: old with `old-fortress.sh /home/user/fortress-base-p152`, new with this tree's `bin/fortress`. Compiled means `compile`, then `run` where it compiled; every run asserts its calls. The probes are scratch, under `tmp/probe/`; each shape is below.

| shape | walk old | walk new | checker old | checker new | the rules |
|---|---|---|---|---|---|
| row 740: `o[\T\](P[\T\], Box[\T\])` beside `o[\T\](Q[\T\], Box[\T\])`, `P[\T\] excludes { Q[\T\] }` | refused, Meet Rule | loads, `oP`, `oQ` | Invalid overloading of o | compiles, runs PASS | valid |
| the same, renamed: `o[\U\](Q[\U\], Box[\U\])` | refused | loads | refused | PASS | valid |
| row 741: `copyOf[\T\](Thawed[\T\])` beside `copyOf[\T\](Frozen[\T\])` | loads | loads | refused | PASS | valid |
| row 741's notes: `tint[\T extends Red\](Box[\T\])` beside `tint[\T extends Blue\](Box[\T\])` | loads | loads | refused | refused | question 1 |
| through a supertype: `o[\T\](P[\T\], R[\T\])` beside `o[\U\](Q[\U\], SubR[\U\])` | refused | loads | refused | PASS | valid |
| no forcing: `o[\T\](P[\T\], R[\T\])` beside `o[\U\](Q[\U\], S[\U\])` | refused | refused | refused | refused | invalid (a value of `P[\ZZ32\]`, `Q[\String\]`, `R[\ZZ32\]`, `S[\String\]` has both) |
| free argument: `o[\T\](P[\T\], Box[\T\])` beside `o[\T, U\](Q[\U\], Box[\T\])` | refused | refused | refused | refused | invalid |
| sizes: `o[\nat n\](P[\n\], Box[\n\])` beside `o[\nat m\](Q[\m\], Box[\m\])` | refused | loads | compiles, PASS | PASS | valid |
| two forced types, generic: `h2[\T\](R[\T\], R[\T\])` beside `h2[\T\](V, M)`, `V extends R[\ZZ32\]`, `M extends R[\String\]` | refused | loads | refused | PASS | valid |
| the same beside a plain `h(V, M)` | refused | loads | refused | PASS | valid |
| microGPT's old pair, walk's library: `mul[\I\](Array[\RR64,I\], Array[\RR64,I\])` beside `mul[\nat s, nat r, nat c\](Vector[\RR64,s\], Matrix[\RR64,r,c\])` | refused, Meet Rule | loads; `elementwise` for `(v, v)` and `(m, m)`, `vecmat` for `(v, m)` | | | valid |
| a bound against a ground argument: `g[\T extends Red\](Box[\T\])` beside `g(Box[\Blue\])`, and its two-generic form | loads | loads | PASS | PASS | valid |

Rung G's tests, each compiled before and after:

- `DispatchRenamedGenericArmWalk` and `DispatchSwappedGenericArmWalk` compile before and after.
- `GenericBesideGenericSameDomain` and `GenericBesidePlainSameDomain`: "multiple declarations of tie", before and after, as walk refuses them.
- `GenericReturnRuleOuterParamWalk` and `GenericReturnRuleInvariantWalk`: the checker's Return Type Rule error, before and after, as walk refuses them.
- `GenericPairNestedBoundsWalk`, `GenericReturnRuleHoldsWalk` and `GenericMethodBesideConditionedMethodWalk`: only "Could not check call to function assert", the compiler prelude's `assert` taking no objects. They have no overloading error, as walk loads them.
- `GenericPairExcludingWalk`: "Invalid overloading of copyOf" and "of tint" before, only "of tint" after. Walk loads every pair.

Every rung G test passes under walk on the change (`ant testSystem` above). So walk and the checker agree on every pair of rows 740 and 741 and of rung G's tests, but `tint`.

## 6. The library

- The distance stage reads the twelve prelude components. It has no overloading error (`#kind overloading 0`), on base and on the change, and its tables are equal (section 4). So the shape is no site of the distance.
- The checker change only turns an overloading error into a valid pair, and there is none to turn.
- Under walk, every library component loads on base: the suites, and rung G's skeptic's load of each api that no test imports (`rung-walk-generic-pairs/SKEPTIC.md` section 3). The walk change only turns a Meet Rule refusal into a load. So the library holds no pair of the shape that walk reads.
- Outside the twelve, `Library/Shuffle.fss:21` and `:30` have `copyOf`'s one-position shape (row 741's notes). Walk loads it already (`ShuffleTest`). The probe did not run the checker on it.
- The shape's one known use is outside the library: microGPT's earlier `opr ×` pair, which row 159 and the `Diag` workaround record. Its `mul` form loads on the change (section 5). No model line changes.

## 7. Defects and their homes

- **Row 740** (walk, and the checker by its notes): the cause is located on each path (sections 2 and 3). It is repaired by the two patches, home 1: `tests/GenericPairExcludesTogetherWalk` and `compiler_tests/GenericPairExcludesTogether`. The rung closes it after the patches land.
- **Row 741** (the checker): `copyOf` is repaired by `checker.patch`, home 1: `compiler_tests/GenericPairSharedSupertypeExclusion`. `tint` stays refused by the checker and loaded by walk. If row 741 closes on `copyOf`, `tint` needs a row of its own, home 3, whichever path question 1 moves.
- **No new row.** The paper's formal gap (section 2) is a finding about a team source, not a defect of the tree.

## 8. Decisions

1. **Walk's change also reads a generic declaration beside a plain one**, in the Meet branch of `validOnDeclaredDomains`. Not taken: two generic declarations only, as P-152's title says. The evidence:
   - The checker's change reads every pair through its one exclusion test, so the narrower walk change leaves `h[\T\](R[\T\], R[\T\])` beside `h(V, M)` loaded by one path and refused by the other.
   - A declaration without static parameters "is the case with none" (`Specification/basic/overloading.tex:117`).
   - The paper's domain of a plain declaration is ∃[].T.

   On the narrower variant, which I measured first, walk refused that program, "fails the Meet Rule". No decision of the curator covers it.
2. **The checker's change is local to its exclusion test** (`emptyED` beside `subtypeED` in `excludes`). Not taken: making `reduceED` or `normalizeED` return Bottom for an empty existential. That reading would reach `lteq`, `equiv`, `isMeet` and the Return Type Rule's special arrow. `normalizeUA` would also build an arrow without static parameters over their variables. It is not measured.
3. **Neither change reads the bounds into the False test** (section 4). Walk's reads them where `meetParams` and `mayBeEqual` already do.
4. **No speed pass of the checker.** The skill's "The checker's time" asks for one after a change of the checker. This probe lands nothing, and its two timed runs show no slowdown: 59 s against 61 s, and 135 s against 143 s. The batch rung that lands `checker.patch` owes it.
5. **The tests extend row 740's walk test** with four more pairs, in place of a test file for each. They are the revival's tests, and every assertion of the original is kept.

## 9. Questions for the curator, and points for the rung

1. **`tint`, two type parameters whose bounds exclude** (row 741's notes; `GenericPairExcludingWalk` asserts that walk loads it).
   - The paths: walk loads `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`, reading two such parameters as never equal (`mayBeEqual`, `OverloadedFunction.java:1306`). The checker refuses it before and after. Its reduction makes one parameter bounded by both, `[\T$6 extends Blue Red\]Box[\T$6\]`, and does not show that Bottom.
   - Its sources: the 2011 paper's types include Bottom, "Since $\Bottom$ is well-formed" (`rules.tick:205`), so `Box[\Bottom\]` is an instance in both domains. The revised specification says each static parameter "stands for any type within its bound" (`overloading.tex:584`), and Bottom is within both. It also says Bottom "cannot be written in a program" (`basic/types-vals-vars.tex:106-107`).
   - How the principles point:
     - The team's later word (P-26) points to the checker's refusal.
     - The library as the team wrote it is silent: the distance has no overloading error.
     - The peers are near silent. In Julia, `Box{Union{}}` is a type, and two methods `where T<:Red` and `where T<:Blue` both apply to it, so it is ambiguous at a call.
   - Default: both stay as they are. That keeps today's behaviour, with a new row for `tint` when row 741 closes.
2. **For the rung, a specification sentence.**
   - `overloading.tex:585`, "where the two parameter types mention one parameterized trait", is narrower than the paper's ancestors (`fig-exclusion.tick:136-147`), and row 741's `copyOf` needs the ancestors.
   - A revision would read "where the two parameter types are or extend instances of one parameterized trait".
   - The team's later word points to it. It is a revision of revival text, which the rung makes with the code, and it can be undone.
3. **Sentences made false if the patches land:** `Specification/appendices/changes.tex:2844-2850`, in the Effect of "Overloading with static parameters":
   - "The compiled type checker and the interpreter both refuse two declarations with static parameters whose parameter types exclude only together, ... (row~740)" becomes false.
   - "... the compiled type checker refuses two pairs ... one whose parameter types exclude through the one instance of a supertype they share" becomes false. Its other half, the bounds, stays true.

## 10. For FACTS

- **The checker's existential reduction leaves an existential whose nontriviality constraint is False as it is, so its overloading check cannot show such a meet Bottom.**
  - The code: `reduceED`, `TypeSchemaAnalyzer.scala:398-404` with `Formula.scala:729`, at ba93d28ec. The paper's formal rule has the same gap; its prose reads the case as Bottom (`exc-reduction.tick:7-21`, `:62-73`).
  - What it means: it is the checker's cause of row 740 and of row 741's `copyOf`. A pair whose domains exclude only through the whole parameter type is refused, "Invalid overloading of".
  - The test that fails if it stops holding: `compiler_tests/XXXGenericPairSharedSupertypeExclusion` (green while refused).
  - Detail: this note, section 2.
- **Walk's load check reads no exclusion across positions between two declarations with static parameters.**
  - The code: `genericPairValid`'s Meet branch, through `genericMeetCovered`, which matches the domains position by position (`OverloadedFunction.java:909`, `:1137-1156`, at ba93d28ec).
  - What it means: it is walk's cause of row 740, for shared and renamed static parameters, for sizes, and beside a plain declaration.
  - The test: `tests/XXXGenericPairExcludesTogetherWalk`.
  - Detail: sections 3 and 5.
- **The twelve prelude components hold no overloading error for P-152's reading to remove.**
  - The evidence: the distance stage's `#kind overloading 0`, and its tables are equal with and without `checker.patch`.
  - The command: `explorations/coordinator/tools/distance/run.sh <out> <scratch>` on each tree, then `compare.sh`, which prints `DISTANCE SAME 34`.
  - Detail: sections 4 and 6.

## 11. Commands

- To trace the checker's reduction on one pair, compile a copy of `OverloadingOracle.scala` whose `excludes` calls `sa.meetED(fd, gd, true)` into a scratch folder with `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d $Q/classes`. Then run `java ... -cp "$Q/classes:$CP" com.sun.fortress.Shell compile P.fss` with a fresh copy of the caches. This is the skill's quick loop. `reduceED` prints its `ieNotBottom`, `c` and unifier.
- The base build was made at main with `git worktree add --detach`, `ant compileAll`, the library order and one walk run, in one `nohup nice -n 19` line (about 2 minutes). The probe worktree was seeded from it by `seed-worktree.sh`.
