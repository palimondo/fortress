<!-- Whether the revival must build the team's unfinished "where" feature to reach the switch-over: of the thirteen checker errors filed as waiting on it, twelve go away with ordinary edits of the library that change no answer microGPT or the walk tests compute (one revival test of the removed declarations aside), and the thirteenth, the ordering of lists, needs a list to count as ordered only when its elements are ordered, which the library cannot say today. -->

The probe worker returned this text when the harness refused it a report file; the coordinating session wrote it here unchanged on 2026-10-16. The worktree `/home/user/fortress-probe-where` holds the patches and the new tests.

# `where` clauses and the distance to the switch-over: a measurement

This is a measurement probe on the branch `wip/probe-where-clauses`, in the worktree `/home/user/fortress-probe-where`. The worktree was seeded from the base build `/home/user/fortress-base16` (`528438ac5`; `main` at `d731fc328` has changed no code since). The edits are uncommitted in the worktree; the patches are quoted inline below. There are two parts, written in this order and kept apart:

- **Part A** is the brief: library edits that use no new language, and what the code generator does with `NatParam`'s clause. Part A was finished and written before Part B began.
- **Part B** is the curator's addition, sent mid-task: the narrow `where`-clause forms, built as shadow patches in the compiled checker.

---

# Part A: library edits with no new language

## A.0 In short

| Group (ledger row) | Errors | Cause | Library edit that clears it |
|---|---|---|---|
| `SUM`'s fusion pairs with `MAX` and `MIN` (433) | 6 | Four errors: `SumReduction` (bound `AdditiveGroup`) names `MaxReduction[\T\]`, `MinReduction[\T\]` and their pairs, whose bounds it does not meet. Two errors: the `distribute` overloads answer a pair over `Maybe[\T\]`, where the inherited `distribute` answers a pair over `T`. No bound fixes those two. | **Yes: removal.** Only the team's experimental `Generator2` reaches these declarations, and none of its answers change. A `where` clause would clear only 4 of the 6. |
| `AnyList`'s `\|\|`, `addLeft`, `addRight`, and the list comprehension's unwrap (636) | 4 | `AnyList` and `AnyCovColl` are supertraits with no element type. Their bodies call functions that need a `List[\E\]` or a `CovariantCollection[\T\]`. | **Yes.** `\|\|` moves into `List[\E\]` through one private generic helper. `addLeft`/`addRight` become `singleton(e) \|\| self`. The unwrap takes `cast[\CovariantCollection[\T\]\]`. Walk prints the same 14 lines on a probe before and after. |
| The identities' numeral fallback (436) | 2 | `else => 0` and `else => 1` answer a numeral where `T` is declared. | **Yes, for the checker:** `cast[\T\](0)` and `cast[\T\](1)`, the device the branches above already use. Row 436's own defect (an empty sum over a non-number group has no zero) stays. |
| `LexicographicOrder`'s `CMP` (634, list half) | 1 | `a CMP b` on values of the unbounded element type `E`. | **No.** Each device loses something the judgement on record weighed. Clearing it needs a list to be ordered exactly when its elements are: conditional extension. |

- **Distance with all three edits: 49 to 37.** Exactly the twelve sites above go, and none appear.
- **Walk:** all 621 tests of `ProjectFortress/tests`, run in one JVM, give 2 failures. The base fails the same two with the same seed, and both pass when run alone. One revival test, `GeneratorDeclarations.fss`, needed three lines changed. microGPT's quick pair passes 7 of 7 checks each.
- **The code generator on `NatParam`:** it refuses the trait at its guard, "Can't compile TraitDecl" (`CodeGen.java:5027-5033`). With only that guard relaxed in a scratch copy, a trait with a bindings-only clause compiles and runs. Opening a value at a call then fails the JVM's verifier.

## A.1 The thirteen errors, traced

The sites are rows of `explorations/compile-ladder/gate/distance-sites.tsv`. Line numbers are `main`'s.

**Row 433, six errors** (`Library/FortressLibrary.fss`):

1. `wellformed`, `:3421`. `distribute(r: MaxReduction[\T\])` sits in `object SumReduction[\T extends AdditiveGroup[\T\]\]` (`:3417`). `MaxReduction`'s bound is `StandardMax[\T\]` (`:3456`).
2. `wellformed`, `:3423`. The same with `MinReduction` (bound `StandardMin`, `:3447`).
3. `wellformed`, reported at `:3405`, for the body `MaxSumReductionPair[\T\]` at `:3422`. The checker reports a call's unmet bound at the callee's declaration (ledger row 720).
4. `wellformed`, reported at `:3411`, for `MinSumReductionPair[\T\]` at `:3424`.
5. `return-type`, `:3421` against `:3233`. The overload answers `PossibleReductionPair[\Maybe[\T\]\]`. The inherited `distribute(r: Any)` of `ActualReduction[\R,L\]` answers `PossibleReductionPair[\T\]`. Static parameters are invariant, so the overload's result does not fit the inherited one.
6. `return-type`, `:3423`. The same for the `MinReduction` overload.

Errors 5 and 6 do not depend on any bound. I wrote a scratch component of the same shape with no bound anywhere (`tmp/probe/rt/LiftedPairReturn.fss`) and it gets the same refusal:

    trait Red[\R,L\]  distribute(r: Any): Pair[\R\] = NoPair[\R\]  end
    object Mx[\T\] extends Red[\T, Lifted[\T\]\] end
    object Sm[\T\] extends Red[\T,T\]
        distribute(r: Mx[\T\]): Pair[\Lifted[\T\]\] = SomePair[\Lifted[\T\]\]
    end

    $ bin/fortress compile LiftedPairReturn.fss
        For distribute,
    the return type of (Sm[\T\], Mx[\T\])->Pair[\Lifted[\T\]\] @ ...:15:5-73 should be a subtype of the
        return type of (Red[\T,T\], Any)->Pair[\T\] @ ...:11:5-47
    File LiftedPairReturn.fss has 1 error.

So the ledger's designed fix, a `where` clause per overload (row 433's notes), would clear errors 1 to 4 and leave 5 and 6.

The team saw the underlying problem: "This lifting type should be replaced with the type L of ReductionPair[\R, L\] returned by r.distribute(q). But, we do not have any way to capture the type L...." (`Library/Generator2.fss:170-173`, Emoto 2009, present at `a874948ac`).

**Row 636, four errors** (`Library/List.fss`):

7. `:88`, `app(self,f)` in `trait AnyList`. `self` and `f` are `AnyList`s, and `app` takes `List[\E\]` and `List[\F\]` (`:93`). The team's comment that would have said every `AnyList` is a `List[\E\]`, "comprises List[\E\] where [\E\]", remains a comment (`:87`; `List.fsi:56`, "Not yet").
8. `:89`, `addL(e,self)`, for the same reason (`:102`).
9. `:90`, `addR(self,e)`, for the same reason (`:105`).
10. `:179`, `cc.toImmutableArray()` on an `AnyCovColl`. `toImmutableArray` belongs to `CovariantCollection[\T\]` (`Library/CovariantCollection.fss:71-78`, `:144-146`).

**Row 436, two errors:**

11. `FortressLibrary.fss:3367`, `additiveIdentity`: body type `OR(IntLiteral,T)`, from `else => 0` at `:3380`.
12. `:3384`, `multiplicativeIdentity`: the same, from `else => 1` at `:3397`.

**Row 634, list half, one error:**

13. `FortressLibrary.fss:2063`, `fn(a:E,b:E): TotalComparison => a CMP b` in `LexicographicOrder[\T extends LexicographicOrder[\T,E\],E\]` (`:2058`). `E` is unbounded, and `List[\E\]` extends it at every `E` (`List.fss:112`).

## A.2 The edits, built as shadow patches

### A.2.1 Row 433: remove the `MAX`/`MIN` fusion with `SUM`

I removed these from `FortressLibrary.fss`:

- `MaxSumReductionPair` (`:3405-3409`) and `MinSumReductionPair` (`:3411-3415`).
- `SumReduction`'s two `distribute` overloads (`:3421-3424`).
- `LiftedCommutativeMonoidReduction` (`:3283-3309`), which only the two pairs used.

None of them is in the api.

**What reaches them.** `Generator2.fss:73`'s `r.distribute(q)` and its theorems for `inits`, `tails` and `segs`, reached through `Generator2.generate2` (`FortressLibrary.fss:4743`) from `__bigOperator2`'s fused arm (`:1468-1473`). Also the revival's `GeneratorDeclarations.fss`.

**What moves under walk.** `SumReduction[\ZZ32\].distribute(MaxReduction[\ZZ32\])` now answers `NoReductionPair`. As it stood, `GeneratorDeclarations` failed on that: "FAIL: J7/0:Nothing =/= J7/0:Just(5)". I changed three of its lines:

    -    some = SumReduction[\ZZ32\].distribute(MaxReduction[\ZZ32\])
    +    some = ProdReduction[\ZZ32\].distribute(SumReduction[\ZZ32\])
    -    assert(some.inner.empty().asString, "Just(0)", ...)
    -    assert(some.inner.join(Just[\ZZ32\](2), Just[\ZZ32\](3)).asString, "Just(5)", ...)
    +    assert(SumReduction[\ZZ32\].distribute(MaxReduction[\ZZ32\]).holds, false, "the sum has no fusion pair with the maximum")

**What does not move.** The team's `Generator2Test.fss` still prints `res = 46, ggres = 46`, `15, 15`, `8, 8` and passes. `fusedMax` still asserts 6, 4, 6, 4 and 5.

**Cost.** Emoto's fast path for the maximum or minimum of sums over a generator of generators is gone. Walk now computes those the naive way, with the same answers. The `PROD`-over-`SUM` fusion stays.

**Why no other device works.**

- A narrower bound would refuse `SUM` over every unordered group.
- Moving the overloads into `MaxReduction` does not help, because `T` lacks `AdditiveGroup` there.
- A per-type witness `typecase` can name `MaxSumReductionPair[\ZZ32\]`. But the method must still answer `PossibleReductionPair[\T\]`, so errors 5 and 6 stay, and a cast to that type would be false at run time.
- The team's own attempt, `distribute[\K\](r: ActualReduction[\R,K\])`, is commented out beside "a hack to avoid the error of overloaded methods" (`:3232-3237`; also `Generator2.fss:75-84`).

### A.2.2 Row 636: put `AnyList`'s bodies where the element type is known

    @@ Library/List.fss, trait AnyList
    -    opr ||(self, f:AnyList): AnyList = app(self,f)
    -    addLeft(e:Any): AnyList = addL(e,self)
    -    addRight(e:Any): AnyList = addR(self,e)
    +    opr ||(self, f:AnyList): AnyList = self.appendAny(f)
    +    addLeft(e:Any): AnyList = singleton(e) || self
    +    addRight(e:Any): AnyList = self || singleton(e)
    +    private appendAny(f:AnyList): AnyList
    +    private appendedTo[\D\](a:List[\D\]): AnyList
    @@ (addL and addR, now unused, removed)
    @@ trait List[\E\]
    +    private appendAny(f:AnyList): AnyList = f.appendedTo[\E\](self)
    +    private appendedTo[\D\](a:List[\D\]): AnyList = app(a,self)
    @@ opr BIG <|[\T\]|>
    -    ... fn (cc) => fromImmutableArray(cc.toImmutableArray()))
    +    ... fn (cc) => fromImmutableArray(cast[\CovariantCollection[\T\]\](cc).toImmutableArray()))

This is double dispatch through private generic methods. `List` already uses the same shape for `appendRC[\T\]` and its relatives (`List.fss:130-133`). `cast` is the library's run-time check (`FortressLibrary.fss:33-37`), and `List.fss:313` already uses it. The api is unchanged.

- **What it clears.** All four. A distance run over List alone takes List from 5 errors to 1; the one left is site 40, which is not among the thirteen.
- **Why not `addL(e,self)` inside `List`.** The checker still refuses it there ("not applicable to an argument of type (Any, List.List[\E\])"). Writing `addL[\Any,Any,E\]` would make walk's result a `List[\Any\]` instead of the join of the two element types.
- **What moves under walk.** Nothing. A probe of 14 values printed each list and which of `List[\ZZ32\]`/`Number`/`Object`/`Any` it is. The cases: heterogeneous `||`, `addLeft("y")` and `addRight(2.5)` on a `List[\ZZ32\]`, typed, untyped, empty and filtered comprehensions. The base and the edit print identical output (for example `e = <|1, 2, 2.5|> ZZ32:false Number:true Object:false Any:false`).
- **Cost.** Two private abstract methods on `AnyList`, two bodies on `List`, one more dispatch on a heterogeneous `||`, and a run-time check in every list comprehension's unwrap. No test or probe trips that check.

### A.2.3 Row 436: cast the fallback

    -        else => 0
    +        else => cast[\T\](0)
    -        else => 1
    +        else => cast[\T\](1)

- **What it clears.** Both errors.
- **What moves under walk.** Only runs that reach the fallback, which means a non-number `T`. There the numeral was never a `T` anyway. `XXXEmptyGroupSumRungF` stays an expected failure: on the base it raises a `ProgramError` at `FortressLibrary.fss:1315`, on the edit `FortressException: CastError`; both report "OK Saw expected exception".
- **What it leaves.** The empty sum's missing zero. Fixing that is `HasIdentity` (A.6, B.4).

### A.2.4 Row 634's list half: no edit works

I checked each device against `explorations/reviews/tuple-comparisons-judgement.md` section 2:

- **Bound `LexicographicOrder`'s `E`** (its way 1c). Every `List[\E\]` would then need an ordered `E`, so lists of tuples, functions and `()` would be refused, against P-42, and the pins in `ResultBoundsRungB.fss:48-59` would stop.
- **A `typecase` per element type** (way 7). It has no answer for user types or lists of lists.
- **An `Any` fallback** (way 6). Either lists of floats are lost, or the declared `TotalComparison` breaks. The compiled dispatcher also dies on that shape (row 537).
- **No place in the library holds `E`'s order** where a declaration could be moved to.

## A.3 Checks run (Part A)

| Check | Result |
|---|---|
| Distance stage, all three edits (`distance/run.sh`, niced; `compare.sh` against `climb-batch-15b/gate/distance.txt`) | `DISTANCE DOWN   49 -> 37 (-12)` |
| Distance over List alone (a copy of `run.sh` with `COMPONENTS="Library/List.fss"`) | List: 5 to 1 |
| All of `ProjectFortress/tests` as one `SystemJUTest` JVM, `FORTRESS_THREADS=4` | `Tests run: 621, Failures: 2`; the base with seed `1a1449d46e1_16` fails the same 2 |
| `harness-one.sh` on the 22 tests that reach the edits | `GeneratorDeclarations` red as it stood, green after its three lines |
| microGPT quick pair, one program at a time | Flat `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`; Apl the same |
| The `AnyList` probe on the base and on the edit | 14 lines, identical |

## A.4 The distance with all three edits

    DISTANCE DOWN   49 -> 37 (-12)
        kind return-type 2 -> 0 (-2); kind wellformed 4 -> 0 (-4); kind typecheck 40 -> 34 (-6)
        class R3 2 -> 0; class F1 4 -> 0; class I3 2 -> 0; class NM 3 -> 2; class OT 12 -> 9
        unit component FortressLibrary 43 -> 35; unit component List 5 -> 1

I also compared the run's `errors.tsv` with `distance-sites.tsv` site by site, with line numbers masked. Exactly the twelve sites of rows 433, 636 and 436 are gone, nothing is new, and site 18 (`CMP`) stays. The table reports `#crash none` and `#shadow every shadow edit matched`. The run took `#seconds 976`, alongside batch 16. That is not a timing to compare.

## A.5 The walk folder in one JVM

To keep to one JVM, I ran the folder as a single `SystemJUTest` instead of four shards.

- **Failures.** 2 of 621: `ReflectTest` and `ReflectiveQuickCheckTest`. Both stop with "Failed to find any matching overload, args = (NodeSet[\(String,Type)\],NodeSet[\(String,Type)\])" at `Library/Set.fss:124:46`, and the overload set lists a `CUP ... [no type]` entry.
- **Not caused by the edits.** The base, with the three files stashed and the same seed, fails the same two in the same way. Both pass alone on the edit (`OK (2 tests)`). This is walk's `CUP` overload set failing when many tests share one JVM at four threads.
- **Not recorded.** No ledger row holds it.

## A.6 What the team left, and the smallest piece of language

**Row 634's list half.** What the team left:

- The grammar: `TraitTypeWhere(BaseType, Option<WhereClause>)` (`Fortress.ast:1697`).
- A test that only parses the form, `tests/conditionalExtension.fss`. Per the curator, it is a superseded design.
- The specification's sentence on comparing lists "whose elements support these same comparison operators" (`opr-overview.tex:294-295`) and `algebraic-constraints.tex:520-523`.
- "where clauses and conditional extension" in the list of unsupported features (`preamble.tex:95`).
- No rule for when such an extension holds.

The smallest piece of language is conditional extension of one trait: `List[\E\] extends LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }`, with `E` bounded. The checker's hierarchy, walk's dispatch and the code generator would each read the condition. Part B, item 3, builds the checker's half.

**The other three groups, had the team's own design been wanted:**

- **Row 433:** method `where` clauses, plus a way to name the pair's lifted type. For the second, the team left only the commented generic method and Emoto's comment.
- **Row 636:** the comment `comprises List[\E\] where [\E\]` (`List.fsi:56`, `List.fss:87`), with the checker opening an `AnyList` as a `List[\E\]` at a fresh `E`. Today it opens only `nat`/`int` variables (F-121, F-146). The api adds: "This should not be necessary in the presence of true type inference." (`List.fsi:50-54`).
- **Row 436:** `HasIdentity`'s `where { T coerces Identity[\ODOT\] }` (`algebraic-constraints.tex:772-797`), and the commented `Monoid` with `self.zero : T` (`FortressLibrary.fss:3189-3194`).

## A.7 The code generator and `NatParam`'s clause

The clause is `trait NatParam comprises { N[\n\] } where [\ nat n \]` (`NatReflect.fsi:23`, `.fss:24`). The team wrote it as a comment and the revival restored it (`7fd8fddc8`). The parser stores it as the trait header's `whereClause`, with bindings and no constraints (`Fortress.ast:1429-1430`).

The code generator's guards (`CodeGen.java`):

- `forTraitDecl` requires `getWhereClause().isNone()`, no throws clause and no contract (`:5023-5033`).
- Objects have the same guard (`:4105-4115`).
- Functions and methods have it too: "Don't know how to compile this kind of FnDecl." (`:2965-2976`).

Past the guards, the code generator already passes a declaration's where clause to its type analyzer (`:1878`, `:5106`).

A six-line component (`tmp/probe/np/NatParamWhere.fss`) compiles through the checker and stops in the code generator:

    trait NatP comprises { Nn[\n\] } where [\ nat n \]
    end
    value object Nn[\nat n\] extends NatP end
    $ bin/fortress compile NatParamWhere.fss
        Can't compile TraitDecl NatP at .../NatParamWhere.fss:4.1
            at ...CodeGen.forTraitDecl(CodeGen.java:5033)

I then built a scratch `CodeGen.java` that lets through a clause of bindings only (nothing tracked was changed):

- `NatParamWhere` compiles and runs (`PASS`).
- The gated `compiler_tests/XXXNatOpenRun.fss` compiles, then fails verification: `java.lang.VerifyError: Bad type on operand stack ... Type 'XXXNatOpenRun$NatParamT' ... is not assignable to 'XXXNatOpenRun$Nt?n#3?'`. The call passes the trait value with no class test and no size read: the open half of F-146 and row 307.

So for `NatParam` the code generator needs two things: the guard relaxed for bindings-only clauses, and code that opens a value at a call.

## A.8 Decisions, defects, hand-overs (Part A)

**Decisions** (no POSITIONS entry covers any of them):

1. Row 433 by removal. No typecase can clear errors 5 and 6.
2. `LiftedCommutativeMonoidReduction` removed too. Nothing else uses it, and the test cannot name it (walk: "Function LiftedCommutativeMonoidReduction is not defined.").
3. Row 636 through private helpers rather than making `AnyList`'s methods abstract, which would touch `List.fsi`.
4. `cast[\T\](0)` rather than `throw`, matching the branches above it.
5. The walk folder as one JVM, and microGPT's pair run sequentially; `mg-run.sh` starts both at once.

**Defects.** The walk folder in one JVM fails `ReflectTest` and `ReflectiveQuickCheckTest` on the base too (A.5). It needs a ledger row: way 3, reproducer none, with the command and seed of A.5 in the notes.

**For FACTS.**

- Two of row 433's errors are the overloading rule over invariant static parameters, not an unmet bound, so a method `where` clause clears 4 of the 6 (A.1, with its command and output).
- Twelve of the thirteen errors clear with library edits, taking the distance from 49 to 37 with nothing new (A.4).
- The code generator refuses `NatParam`'s clause only at the trait guard; past it, opening a value at a call fails verification (A.7).

**Commands worked out.**

- One-JVM walk folder, from `ProjectFortress/`: `FORTRESS_THREADS=4 FORTRESS_JUNIT_VERBOSE=1 FORTRESS_CACHES=<c> nice -n 19 java -Xmx768m -Xss32m -Djava.io.tmpdir=<t> -Dfortress.caches=<c> -Dtests=<tree>/ProjectFortress/tests [-Dfortress.unittests.seed=S] -Dfile.encoding=UTF-8 -cp "$(bin/fortress_classpath|tail -1)" com.sun.fortress.tests.unit_tests.SystemJUTest`. It takes 206 to 294 s. Delete `ProjectFortress/testFile.txt` afterwards.
- The distance stage over one component: a copy of `run.sh` with `COMPONENTS` set. About 120 to 140 s for List.
- microGPT one program at a time: a copy of `mg-run.sh` with an absolute `cd` and no `&`.

**Questions for the curator.**

- Row 433: remove the `MAX`/`MIN` fusion (every answer stays the same; the fast path goes), or keep it and wait for a design of `distribute`'s result type that nothing the team left supplies.
- Row 436: does the missing zero wait for `HasIdentity`?

---

# Part B: the narrow `where`-clause forms, as shadow patches in the checker

I built these by compiling the changed Scala and Java files with `scalac`/`javac` and copying the classes over the worktree's `ProjectFortress/build`. The originals are saved in `tmp/build-orig/classes.tar`. I did not use ant. The full checker diff is `tmp/partB-checker-final.patch` (353 lines). I wrote every test first and saw it fail on the unpatched checker.

## B.0 In short

| Form | Clears, with the team's spelling in the library | Soundness tests | Hole measured |
|---|---|---|---|
| 1. A type variable in a `comprises` clause, opened at a call (`AnyList`) | `app(self,f)`: 1 of row 636's 4 | escape refused; two values not taken as one; the Amin–Tate shape refused | none in this form |
| 2. A `where` constraint read as a bound (row 677) | row 433's 4 `wellformed` errors; its 2 `return-type` errors stay, as A.1 predicted | calls with an unmet constraint on the function's own parameter are refused | a constraint on the enclosing trait's parameter is not checked at a dotted call |
| 3. Conditional extension, by the accepted rule | row 634's `CMP` | lists of numbers and of strings compare; a list of functions does not; a vector of numbers adds, a vector of strings does not | a member checked under the condition stays callable where the condition fails |
| 4. `HasIdentity` | not built: it needs a `coerces` constraint, a fourth kind of clause | — | — |

**Distance runs:**

- **All forms, with the team's spellings and no Part A edits: 49 to 43.** Six sites clear: 433's 4, 636's `app`, 634's `CMP`. Nothing new appears beyond two array errors whose union members swapped order. Still open: 433's 2 return-type errors, `addL`/`addR`, the comprehension, and 436's 2.
- **Part A plus only the form it could not avoid (conditional extension): 37 to 36.** `CMP` clears and nothing is new. So all thirteen are cleared by Part A plus conditional extension.

**Tests:**

- The compiler track (`CompilerJUTest` in one JVM): 1221 tests, 3 failures. These are the three red tests below that mark holes or a promotion. Every other test passes, including the `NatOpen*` tests.
- The library track: `OK (86 tests)`. The other-compiler track: `OK (263 tests)`. Both counts match batch 15b.
- Walk, on both Part B libraries: 19 where-clause, list and generator tests give `OK (19 tests)`.
- The whole walk folder on Part A plus conditional extension: 621 tests, the same 2 failures as the base.
- microGPT on Part A plus conditional extension: 7 of 7 each.

## B.1 A type variable opened from a `comprises` clause

**Lines changed** (worktree):

- `TypeDisambiguator.java:88-99, 111, 115-116, 120, 122`: a trait's `where`-bound type variables are in scope in its `comprises` clause, self type, parameters and members, but not in its extends clause. Without this, "E is undefined." The self type and the `self` parameters carry the comprised types.
- `TypeAnalyzer.scala:820-824`: `whereSizes` now includes type bindings.
- `TypeAnalyzer.scala:845-861`: `openWhereSizes` makes a fresh `E#k`, bounded by its binding's bounds at the trait's arguments.
- `TypeAnalyzer.scala:808, 911`: the arguments are passed through.
- `TypeAnalyzer.scala:307-312`: a comprising trait reached as a parent is not opened. Without this, List lost 22 sites to a second, wrong opening.
- `KindEnv.scala:79-81, 111-118`: a registry of opened names, found from every environment.
- `BuildEnvironments.java:954-962` (walk): a type `where` variable is bound as a symbolic type. Without it, walk stops at load with "Missing type E", then "Get of unset extends".

**Tests** (`ProjectFortress/compiler_tests`, uncommitted):

- `OpenTypeChecker` (typecheck): before, "E is undefined."; after, `OK`.
- `XXXOpenTypeEscapeChecker`: after, "Function body has type E#7, but declared return type is ZZ32." and "Right-hand side has type Box[\E#25\], but declared type is Box[\ZZ32\]." The harness reports "Saw expected failure".
- `XXXOpenTypeTwoChecker`: after, "two ... is not applicable to an argument of type (AnyBox, AnyBox)". Expected.
- `XXXOpenTypeBoundEvidenceChecker`: after, "Could not check call to function upcast - [\A extends Object, T extends Object, B extends A\](Constrain[\A,T,B\], B)->A is not applicable to an argument of type (Witness[\U,T\], T)." Expected.

**Amin and Tate's shape.** Fortress can write it: `trait Witness[\A,T\] comprises { Constrain[\A,T,B\] } where [\B extends A\] { T extends B }`. The false evidence still never forms, for two reasons:

- Measured: an opened variable carries only its binding's own bound, not the constraint's lower bound.
- By reading, not tested: no value of `Witness[\U,T\]` can exist for unrelated `T` and `U`. Fortress has no null, and an object extending `Witness` must be a listed `Constrain[\U,T,B\]` for a `B` its own declaration names. That declaration's well-formedness is checked (`traits.tex:235-245`). My first attempt, which wrote the binding without `extends A`, was refused for exactly that ("B does not satisfy the corresponding bound A").

**In the library** (`List.fsi:56`, `List.fss:87` uncommented):

- `app(self,f)` clears.
- `addL`/`addR` stay, now on `(AnyList & {List[\E\]})`. Their element-type inference over `Any` fails as it does in Part A.
- The comprehension stays. `AnyCovColl` has no clause, and the opening applies to arguments, not to method receivers.

## B.2 A `where` constraint read as a bound (row 677)

**Lines changed:**

- `KindEnv.scala:48-49, 57-58, 136-153` (`constraintBounds`): inside a declaration, `X extends B` bounds `X`, whether `X` is the declaration's own parameter, a `where` variable, or an enclosing trait's parameter.
- `STypesUtil.scala:189-207`: a constraint on the function's own parameter is folded into its schema, so calls are checked against it.

**Tests:**

- `WhereBoundMethodChecker`: before, "No such method T.show."; after, `OK`.
- `XXXWhereBoundChecker` (row 677's gated reproducer): before, "No such method U.f." After, the checker accepts it and the code generator refuses: "Don't know how to compile this kind of FnDecl. node = g[\U extends Object\](u:U):String". It is red, ready for promotion to a code-generator `XXX` test.
- `XXXWhereBoundCallChecker` (red, the hole):
  - `g("s")` is refused: "[\U extends Object Shows\]U->String is not applicable to an argument of type String".
  - `Holder[\String\]("s").showIt()`, whose method constrains its trait's `T`, is accepted. Before the `STypesUtil` fold, both calls were accepted.

**In the library.** I added `where { T extends StandardMax[\T\] }` and `where { T extends StandardMin[\T\] }` to `SumReduction`'s overloads. The 4 `wellformed` errors clear and the 2 `return-type` errors stay. Walk runs `GeneratorDeclarations` with these clauses (green).

## B.3 Conditional extension, by the accepted rule

The rule: inside a declaration that extends a type under a `where` clause, the condition holds while its members are checked, and the subtyping itself is conditional.

**Lines changed:**

- `TypeAnalyzer.scala:872-896` (`isConditional`, `conditionalParents`): `parents` leaves out a parent whose clause has only constraints. A clause that binds new variables keeps today's reading.
- `TypeAnalyzer.scala:317-321`: a conditional parent counts as a parent exactly where its condition holds. The condition is a formula, so inference flows through it.
- `KindEnv.scala:120-134` (`withExtendsConditions`).
- `Decls.scala:87-88, 133-134`: members are checked with the condition holding.
- `TypeWellFormedChecker.scala:116-117, 127-128`: the extends clause is checked with the condition holding.

**Tests** (self-contained; `Num` stands in for `ZZ32`, because a test cannot make `ZZ32` extend its own trait):

- `CondExtendChecker`: before, 4 errors ("Ill-formed type: Ord[\E\] ...", "No such method E.lt."); after, `OK`.
- `XXXCondExtendRefuseChecker`: after, exactly 2 errors, on `(Lst[\Fn\], Lst[\Fn\])` and `(Vec[\String\], Vec[\String\])`.
- `XXXCondExtendMemberChecker` (red, the hole): `Lst[\Fn\](...).lt(...)` is accepted. Swift, Rust and Haskell avoid this by scoping such members to the condition.

**In the library:**

- `LexicographicOrder[\T ..., E extends StandardTotalOrder[\E\]\]` in `FortressLibrary.fsi:1344` and `.fss:2058`.
- `List[\E\] extends { AnyList, ZeroIndexed[\E\], LexicographicOrder[...] where { E extends StandardTotalOrder[\E\] } }` in `List.fsi:67`, `List.fss:112`, and `PureList.fss:41`.

`ZeroIndexed[\E\]` must be written outside the condition. Without it the distance went from 49 to 71: List lost `|l|`, `generate` and `filter` wherever `E` is unconstrained, giving 22 new sites such as "operator |_| ... not applicable to an argument of type List.List[\E\]". This is the same point as the judgement's structural `=`.

Walk passes every test with these edits, including lists of tuples. So walk checks neither the new bound nor the condition, and its behaviour is unchanged.

## B.4 The empty `SUM`'s zero: does `HasIdentity` need a `where` clause?

In the specification's design, yes. Its one clause is `where { T coerces Identity[\ODOT\] }` (`algebraic-constraints.tex:774-797`). "Coercions, unlike methods, are not inherited" (`conversions-coercions.tex:244-247`), so a bound alone cannot promise every `T` a coercion from `Identity`. The design needs three things:

- a fourth kind of clause, a `coerces` constraint, which is not a bound;
- the checker carrying a trait's constraint on its self-type parameter to every `T` bounded by it;
- an `opr` static parameter.

I probed it with `tmp/probe/hi/HasIdentityProbe.fss`: `zeroOf[\T extends HasId[\T\]\](): T = Identity` gives "Function body has type Identity, but declared return type is T." The checker parses the clause and ignores it. I did not build it.

## B.5 What the code generator would then need (row 701)

- **Bindings-only clauses** (`NatParam`, `AnyList`): `forTraitDecl`'s guard (`CodeGen.java:5027`) relaxed. A.7 shows that suffices for the class.
- **Opening a value at a call:** a test of the value's class, then its type or size argument read off its run-time descriptor. The dispatcher already does this when it calls a generic arm through its closure table (`OverloadSet.java:1029-1068`). Today the code generator emits a direct call that fails verification (A.7).
- **Method `where` clauses:** the `forFnDecl` guard (`:2967`) lifted. For a constraint on the function's own parameter, nothing at run time. For one on the enclosing trait's parameter, nothing either, as long as the method's argument types already carry the bound, as `MaxReduction[\T\]` does.
- **Conditional extension:** the code generator never reads an extends-clause entry's `where` clause; it only prints it (`:215`). So it would make every `List` class implement `LexicographicOrder`, and a run-time type test of a list of functions would answer wrongly. The class loader, which builds each instantiation, would have to add that interface only where the condition holds at the instantiation's static arguments.
- **`HasIdentity`:** a statically chosen coercion from a `where` clause, which none of the paths has.

## B.6 Decisions, defects, hand-overs (Part B)

**Decisions** (no POSITIONS entry covers them):

- Type `where` variables are in scope in the whole trait body except its extends clause, per `trait-parameters.tex`'s "All static variables ... must occur ... as a where-clause variable" and its extends-clause rule.
- A comprising trait reached as a parent is not opened.
- Own-parameter constraints are checked at calls. Enclosing-parameter constraints are left unchecked: not built.
- Only constraint-only clauses are treated as conditional.
- `ZeroIndexed[\E\]` is written outside the condition.
- I built the shadows by copying classes into the build, not with ant (one JVM at a time).

**Defects / holes** (each shown by a red gated-style test):

- An enclosing-parameter constraint is not checked at a dotted call (`XXXWhereBoundCallChecker`).
- A member checked under the condition stays callable where the condition fails (`XXXCondExtendMemberChecker`).
- Row 677's reproducer now reaches the code generator's FnDecl refusal (`XXXWhereBoundChecker`).

**For FACTS.**

- With the team's spellings, the checker forms clear 6 of the 13 errors (distance 49 to 43).
- Conditional extension alone, added to Part A, clears the 13th (36, nothing new). It requires `List` to keep `ZeroIndexed` outside the condition.
- The opened type variable passes the escape, two-value and Amin–Tate tests.

**Command worked out.** `tmp/run-track.sh <Class> <label>` runs one testFast track's JUnit class in one JVM with `fastTrack`'s settings (private caches, `-Xmx768m -Xss32m`, `FORTRESS_THREADS=4`, `JAVA_FLAGS=-Xmx4g -Xss64m`). Times: compiler 273 s, library 73 s, other-compiler 126 s.

**Questions for the curator.**

- Conditional extension's rule as accepted lets a member be called where the condition fails. Should such members be scoped to the condition, as Swift, Rust and Haskell do?
- Should a method's constraint on its trait's parameter be checked at calls (not built)?

**Worktree left at:** the Part A library plus conditional extension (`tmp/partA-CE-library.patch`), with all Part B checker patches in source and build. The other states are saved as `tmp/partA-library.patch` and `tmp/partB-library.patch`, and the new tests are untracked in `compiler_tests/`.
