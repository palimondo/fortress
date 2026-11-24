<!-- The cold reader's check of the consolidation's pilot, rounds 1 and 2, 2026-11-24: each entry that a round rewrote, merged into or split, read with only CLAUDE.md and the fortress-repo skill (core and references, without revival-changes.md and sources.md), by record-clarity/coldread.md. -->

# The pilot's checks: cold reader

Brief: `sorting-map/brief-pilot-checks.md`, role "cold reader", by `record-clarity/coldread.md`. The entries were read as they stand in `/home/user/rec-pilot-1` and `/home/user/rec-pilot-2` (`explorations/coordinator/FACTS.md`); each entry line of `round-1.apply` and `round-2.apply` is in its tree's FACTS verbatim (checked with `grep -xF`). Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term lookups in `references/compiler.md`, `committing.md`, `gate.md`, `interpreter.md`, `records.md`, `tests-writing.md`. No old text, no writer's report, no source of an entry was opened.

One departure from a clean cold read: to list the entries, I read the apply files' comment and provenance lines (the round's case headings and the `from:`/`note:` lines) before reading the round-2 entries. Those lines are not in FACTS. They name some moves (for example "the open type and mk() to F-141"), so the round-2 reads may be slightly less cold than the round-1 reads. No verdict below rests on a provenance note.

Verdict rule: **fail** when the entry holds a word or sentence that a worker with only the skill cannot resolve, and that bears on what the entry establishes or requires. Other problems are listed as notes under the entry's pass.

## Verdicts

| Round | Entry | Verdict |
|---|---|---|
| 1 | F-374 | pass (note) |
| 1 | F-351 | **fail** |
| 1 | F-279 | **fail** |
| 1 | F-157 | **fail** |
| 1 | F-63 | pass (note) |
| 1 | F-286 | pass |
| 1 | F-297 | pass |
| 1 | F-64 | pass |
| 1 | F-171 | **fail** |
| 1 | F-240 | pass |
| 1 | F-111 | pass |
| 1 | F-43 | pass |
| 1 | F-179 | pass (note) |
| 1 | F-102 | pass |
| 1 | F-103 | pass |
| 1 | F-104 | pass (note) |
| 1 | F-383 | pass |
| 1 | F-108 | pass |
| 1 | F-98 | pass |
| 2 | F-28 | pass |
| 2 | F-59 | pass (note) |
| 2 | F-73 | **fail** |
| 2 | F-78 | pass (note) |
| 2 | F-85 | **fail** |
| 2 | F-87 | pass |
| 2 | F-221 | pass |
| 2 | F-242 | pass (note) |
| 2 | F-285 | pass |
| 2 | F-344 | **fail** |
| 2 | F-364 | pass |
| 2 | F-365 | **fail** |
| 2 | F-114 | pass (note) |
| 2 | F-137 | pass |
| 2 | F-141 | **fail** |
| 2 | F-144 | pass |
| 2 | F-228 | pass (note) |
| 2 | F-367 | pass |
| 2 | F-173 | pass |
| 2 | F-273 | pass |
| 2 | F-300 | pass |

Counts: round 1, 19 entries, 15 pass, 4 fail; round 2, 21 entries (those that `round-2.apply` rewrites; the chunk's 23 include two that it does not), 16 pass, 5 fail. In all, 40 entries, 31 pass, 9 fail.

## Failures

### F-351 (round 1)

- Quoted: "Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor."
- Fails: "the global lock has moved" and "get the lock at its snapshot" name a mechanism (a versioned global lock?) that neither the entry nor the skill defines. Unclear wording, or a concept that I lack and could not find.
- Quoted also: "a read of an empty array element with a mark" — "a mark" is undefined.
- Smallest fix: one clause defining the lock ("the global version lock, which every commit advances") and saying what the mark is ("with a marker for 'no value'").

### F-279 (round 1)

- Quoted (title): "except a shifted `Array2`."; body: "so its slices read the wrong elements and its shifts fail".
- Fails: "a shifted `Array2`" and "its shifts" are not defined. The body names `SubArray2`, so it may mean any view made by `subarray`, or an `Array2` whose base was moved by a `shift` operation; the title's exception cannot be applied without knowing which.
- Smallest fix: in the title, "except a slice of a slice of an `Array2` (a `SubArray2`)", or whatever "shifted" means, and name the shift operation in the body.

### F-157 (round 1)

- Quoted: "13 to 63 times a row-scaling operator (row 299, whose 54 the probe's timings correct)".
- Fails: "whose 54" — 54 of what (a ratio that row 299 states?), and corrected to what? Unclear wording.
- Smallest fix: "(row 299 states 54 times; the probe measured 13 to 63)".

### F-171 (round 1)

- Quoted (title): "The specification reads a `comprises` clause as the restart's Types chapter does".
- Fails: "the restart" is undefined; the reader cannot tell which document is meant or whether it is a source to consult. Also "only a draft note refuses the api's own declaration of an extender" relies on "draft note", which the skill does not define (inferable as a specification annotation, but not stated).
- Smallest fix: name the document ("as the Types chapter of <named document> does") or drop the comparison from the title; gloss "draft note" in a word.

### F-73 (round 2)

- Quoted: "On both paths, a parameter typed by a type variable that another argument fixes converts a narrower argument: ... So under walk the library's array-scalar `+`, `-`, `MIN` and `MAX`, and the matrix-scalar juxtaposition and `DOT`, take a `ZZ32` scalar with `RR64` elements."
- Fails: after "On both paths", "So under walk" reads two ways: the library's operators take the mixed arguments only under walk, or they do on both and only walk was measured. A worker deciding whether a compiled program may pass a `ZZ32` scalar cannot tell.
- Quoted also: "A tie among coerced declarations is refused, \"Ambiguous coercion\", outside three narrow cases (the report's section 3.2). ... When the tied declarations differ only at positions where the call passes a numeral, the checker reads the numeral as `ZZ32` ..."
- Fails: the three cases are not stated, and the reader cannot tell whether the numeral rule is one of them or a fourth. Which ties the checker accepts is the rule a worker needs.
- Smallest fix: "Under walk (not measured on the compiled path), ..." or "On both paths, ..."; and "outside three cases: <a>, <b>, and the numeral case below".

### F-85 (round 2)

- Quoted (title): "The interpreter's library writes its generator, condition, reduction and nested-generator declarations in forms that the compiled checker accepts and that the library already uses".
- Fails: the forms are not named, so the title states nothing a worker can follow or check; only the `cast[\O0\]` and `cond[\Maybe[\G\]\]` details are concrete. Also "no site of these declarations is on the distance" relies on "on the distance" meaning "among the distance stage's errors", which is inferable but not stated.
- Smallest fix: name the forms in one clause, or reduce the title to the concrete claims ("`__bigOperator2`'s fused branch casts its result to `O0`, and `Condition`'s calls of `cond` write their static argument") and point to the report for the rest.

### F-344 (round 2)

- Quoted: "The ilk still names a string object by its own name, `FlatString`."
- Fails: "the ilk" is undefined in the entry and in the skill; a language or implementation concept I lack. The sentence is the entry's one limit, so it matters.
- Smallest fix: "The ilk (<what prints or returns it>) still ...".

### F-365 (round 2)

- Quoted: "The applied value of an untyped binding is refused with a message." and later "Refused or stopped: ... an untyped binding never applied (row 1010)."
- Fails: both an applied and a never-applied untyped binding seem refused, so the distinction the entry draws is unclear; "the applied value of an untyped binding" also reads two ways (a binding `f = pick` that is later applied, or the result of applying it).
- Smallest fix: one example each: "`f = pick; f(3)` is refused: '<message>'; `f = pick` with no application is stopped (row 1010)".

### F-141 (round 2)

- Quoted: "where overloads are compared, a tuple, arrow or generic type that holds it admits no more than at `Bottom` (row 663)".
- Fails: unreadable without the row; "admits no more than at `Bottom`" could mean the type is treated as if it held `Bottom` instead of the open type. Unclear wording.
- Quoted also: "Two more rules are defaults of the walk-instance rung's decision record." and "Defects of the open type, both contested".
- Fails: the status words are unclear: "defaults" (a worker's choice the curator may revisit? built and in force?) and "contested" (by whom; is the behaviour a defect or not?). A worker cannot tell whether to build on D3 and D5 or treat rows 663 and 825 as defects to avoid.
- Smallest fix: "(the open type is treated as `Bottom` there)"; "are a worker's defaults, built, not decided by the curator"; "contested: <who> holds them correct".

## Notes on passing entries

- F-374: "The batch's planner" names no batch; "the transaction's variable code" is vague. Readable, since the claim does not rest on them.
- F-63: "which the checker then refuses beside the extender that the api declares" — "refuses beside" is odd; read as "refuses, together with the extender" (F-64 confirms).
- F-179, F-104: "Read in the code:" followed by a note under `explorations/`, not code. The label contradicts the citation.
- F-59: "measured before P-48 and before the checker inferred an unwritten argument" — the reader cannot tell whether the measurement still holds after P-48; the entry should say whether it does.
- F-78: "never `BottomType`" beside the skill's "`Bottom`"; F-173 uses `BottomType` too, F-141 `Bottom`. One word for one thing.
- F-242: "hold no site of the distance" — read as "cause no distance-stage error"; say so.
- F-114: "the last landed gate's `summary.txt`" goes stale as gates land; name the batch, as F-240 does.
- F-228: "so an empty `SUM` takes `ZZ32`'s zero" follows from "takes its bound or stays open" only if one knows `SUM`'s bound and F-59's witness; a clause would make the step visible.

## Cold reads, entry by entry

Each: Established; Conditions; Consequence; Evidence; Could not resolve (C = concept lacking, W = unclear wording).

### Round 1

- **F-374.** E: on the compiled path an object's `var` field is a `MutableFValue` cell in a final JVM field; every access checks for a transaction. C: compiled path; fields without `var` hold values directly. Q: `atomic` tracks `var` fields; every access pays the check (row 641); a new nested context must capture the cell; don't give a `value` object a `var` field (row 112). The cell is a planner's default, undecided by the curator. Ev: test `AtomicFieldCompiled`, rung report. CNR: "the batch's planner" (W), "the transaction's variable code" (W).
- **F-351.** E: compiled `atomic` is a nested transaction validating itself and its ancestors; aborts restart the named block; `atomic e` compiles as a block holding `e`. C: compiled path; limits rows 984, 322, 1043. Q: an atomic expression inherits block limits; don't use a numeral as its value where a type is declared. Ev: `*Atomic*Compiled`, two reports. CNR: "the global lock has moved", "get the lock at its snapshot" (C/W), "with a mark" (W).
- **F-279.** E: under walk, slices of nonzero-based `Array2`/`Array3` work, except a shifted `Array2`, whose `SubArray2.subarray` subtracts the wrong base. C: walk; row 808. Q: avoid slicing a shifted `Array2` (or use row 808's way around). Ev: tests `Array*SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`. CNR: "shifted", "its shifts" (W).
- **F-157.** E: a view is an object implementing the array trait over other storage; a `Matrix` subtype overriding `mul` gets its product via `DOT` and juxtaposition under walk; the library's views are slower than user views. C: walk only, measured. Q: write a user view for speed; no api line is needed for an override. Ev: two notes. CNR: "whose 54 the probe's timings correct" (W).
- **F-63.** E: three api lines (`List` without `zip`, `Condition.map`'s return, `QQ` closed by `comprises { ... }`) match their components. C: the Condition claim is read, not measured; `PureList.fsi` and `IntMap.fsi` still depart (rows 355, 357). Q: an api may omit a private type only by `...`. Ev: rung report. CNR: "refuses beside" (W, minor).
- **F-286.** E: `FortressLibrary` declares every api-abstract member; `String`'s 14 abstract members are defined by all four string objects. C: `CatString.rangeContains` carries row 607. Q: none beyond keeping it so. Ev: walk test, distance stage. CNR: none.
- **F-297.** E: the compiled export check requires each api-abstract member declared at the api's header in the component; a field matches an abstract getter. C: an api field met by a component getter is refused (row 842); walk checks nothing (row 841). Q: declare every abstract member. Ev: `*ExportAbstract*`, code. CNR: none.
- **F-64.** E: the checker refuses any api-declared extender of a trait whose `comprises` has `...`, listed or not — a checker defect. C: `QQ` escapes; `IntMap` does not. Q: a fix turns `XXX3q` and its partner red, so promote them. Ev: rung report. CNR: none.
- **F-171.** E: the specification reads `comprises` as covering every value; extenders must be below a listed type, with two exceptions; `...` allowed in apis. C: bare type variable unsettled (row 407); the checker departs three ways plus F-64; F-121 open. Q: follow the specification's reading. Ev: decision record, `traits.tex`. CNR: "the restart" (W), "draft note" (C).
- **F-240.** E: at batch 36's gate the count stage took about 66 s and distance 117 s; load can more than double a time. C: one run each; load values given. Q: compare times only under like load. Ev: log file times, `distance.txt`, two reviews. CNR: none.
- **F-111.** E: the count and distance stages run only the compiled checker's phases on the library, so edits to the listed areas cannot move their counts. C: read, not measured. Q: don't rerun those stages after such edits. Ev: the scripts and `PhaseOrder.java`. CNR: none.
- **F-43.** E: the overloading checker's memo key covers all it reads; the gate runs with it off anyway. C: one measurement of equality on/off. Q: `-Dfortress.analyzer.overload.cache=false` turns it off. Ev: rung report. CNR: none.
- **F-179.** E: tasks and transactions exist twice, independently. C: none. Q: fix both copies. Ev: a map note. CNR: none.
- **F-102.** E: `XXX*.fss` in `tests/` must fail; without a `.test` any failure counts. C: interpreter corpus. Q: add `.test` only for `load_` keys; apis come from `test_library/`. Ev: `FileTests.java`. CNR: none.
- **F-103.** E: an `XXX` `.test` makes every command must-fail, so compile-then-run-fail needs two files. C: `compiler_tests/`, `library_tests/`. Q: one plain `link` test plus one `XXX` `run` test; a compile-time failure needs one `XXX` test. Ev: code and measurement, two reports. CNR: none.
- **F-104.** E: an uncaught `CompilerError` shows on the exception stream, keyed on the `tests=` component. C: an `XXX` component's exception is green unless a key fails. Q: pin walls with `compile_exception_contains`. Ev: a review. CNR: none.
- **F-383.** E: walk's harness counts a pre-run static error as a load refusal. C: walk. Q: `load_` keys can match it. Ev: code, a test. CNR: none.
- **F-108.** E: walk's ambiguity message orders its declarations nondeterministically; three JVM flags fix it per library. C: which flag fixes it unknown. Q: don't test the order. Ev: observed, judge note. CNR: none.
- **F-98.** E: `.test` keys check three streams; `_WIcontains` collapses whitespace on both sides; unknown keys check nothing; default `run_out` check is `pass`. Q: spell keys correctly. Ev: `generalTestFailed`. CNR: none.

### Round 2

- **F-28.** E: walk instantiates a generic returning `Any`. C: the visitor's 11 missing cases matter only for dimensions, which walk lacks. Q: none. Ev: test, report. CNR: none.
- **F-59.** E: `SUM`/`PROD` get identity via a witness `typecase`; non-number additive groups give `CastError` when empty (row 436); identity-free reductions are typed at the element type and lift to `Maybe[\R\]`; inference of an unwritten argument per F-364/F-221/F-228; C4 sums at `ZZ32`. C: `AnyMaybe` as argument stops walk. Q: write `Maybe[\R\]`, not `AnyMaybe`. Ev: test, review measured before P-48. CNR: whether P-48 changes the measurement (W).
- **F-73.** E: the compiled checker infers by coercion to the narrowest type all arguments convert into within the bound. C: ties refused outside three cases; numeral ties read as `ZZ32`; rows 506, 507. Q: as stated. Ev: `InferCoercionShapes`, report. CNR: "So under walk" after "On both paths" (W); the three cases (W).
- **F-78.** E: an unfixed parameter takes the intersection of its bounds (`Any` if none); result-only parameters narrowed by expected type; four attempts in a fixed order. C: intersection instances die at load (row 559). Q: P-49 decides two of the four. Ev: `InferResultOnly*`, report, decision record, code. CNR: `BottomType` vs `Bottom` (W, minor).
- **F-85.** E: the library writes these declarations in checker-accepted forms; `__bigOperator2`'s fused branch casts to `O0`; `Condition` writes `cond`'s argument. Q: keep the cast. Ev: `NestedReductionFusion`, distance stage. CNR: which forms (W); "on the distance" (W).
- **F-87.** E: the list of contexts where the compiled checker gives a call an expected type, including `f(x)`, method calls, operators. Q: see the spec chapter for all. Ev: `Infer*Context`, report, measure-D. CNR: none.
- **F-221.** E: an argument call is retried against each enclosing declaration's parameter type when the enclosing call fails otherwise. C: walk gives no such expected type (row 705). Q: a chain can choose the multifix declaration. Ev: `InferCallArgument*`, report. CNR: none.
- **F-242.** E: `SUM`'s fusion pairs with `MAX`/`MIN` cause no distance error (via `where` clauses) and fuse under walk. C: explicit `distribute[\L1\]` breaks walk (row 744). Q: don't write the static argument there. Ev: `GeneratorDeclarations.fss`, two reports. CNR: "hold no site of the distance" (W, minor).
- **F-285.** E: the library writes static arguments on F-bounded clause forms and list comprehensions; `body(i: I): L` declares its type. C: plain-bounded and `BIG LEXICO` left unwritten. Q: keep the library's sites written. Ev: `WrittenReductionArgumentsWalk`, reports. CNR: none.
- **F-344.** E: walk reads the four string objects as `String` when inferring and printing types. C: numbers need none. Q: `Cell("s")` is `Cell[\String\]`. Ev: test, report. CNR: "the ilk" (C).
- **F-364.** E: the compiled checker instantiates an unwritten reduction by expected type, else body type, when the written call fails. C: differs from walk at some places (row 1008); refusals rows 1007, 1015. Q: write the argument at those places for both paths. Ev: test, report. CNR: none.
- **F-365.** E: the compiled checker instantiates a generic function reference from the receiving arrow type, refusing an under-fixed one. C: rows 1009–1013; the model's `rows(rmsn, x)` form untested. Q: give the reference an arrow type that fixes all parameters. Ev: tests, report. CNR: applied vs never-applied untyped binding (W).
- **F-114.** E: `ant testSpecData` runs 130 of 135 spec examples under walk, all pass. C: `library/`'s five run nowhere. Ev: last gate's summary. CNR: none.
- **F-137.** E: walk infers with coercion from run-time types; lone parameter definition; narrowest admitting candidate. C: rows 509–511; a lone `ZZ32` numeral case by inference. Q: paths may differ where static type is wider. Ev: `InferCoercionRungK`, report. CNR: none.
- **F-141.** E: walk's rule for unfixed, F-bounded (open), lone and contravariant parameters; D3, D5; many defects; dispatch instantiates at run-time type. Q: expect `OPEN` for F-bounded unfixed parameters. Ev: `Infer*Walk.fss`, several reports. CNR: row 663's sentence (W); "defaults", "contested" (W).
- **F-144.** E: `BIG MINMAX`, its tuple forms and `BIG CONCAT` run unwritten under walk; `simpleJoin` at `Any` is refused at load, except for generic objects (row 665). Ev: tests, reports. CNR: none.
- **F-228.** E: walk instantiates an unwritten reduction or comprehension by declared type, else elements' join, else the bound (open if F-bounded). C: listed non-directing contexts; rows 716, 717, 510, 705, 824. Q: declare a local's type to direct it. Ev: tests, report; chosen by the coordinator. CNR: none (see note).
- **F-367.** E: under walk a generic function is a value received at an arrow type's instance; stays generic where unfixed. C: rows 1018–1021. Q: compiled path refuses the generic-value forms. Ev: tests, report. CNR: none.
- **F-173.** E: the specification's inference rule: choose the declaration, then infer; whole-type parameters take the narrowest convertible type or the bound; never `BottomType`. C: compiled prelude lacks `NN32`→`ZZ64` (row 442); walk departures in callouts. Ev: `InferLone*`, report, `inference.tex`. CNR: none.
- **F-273.** E: the specification gives a dispatched, unselected generic's instance by the POPL 2019 rule; both paths depart (rows 538, 496). Ev: `overloading.tex`, decision record. CNR: none.
- **F-300.** E: the POPL 2019 paper, report and sources are in `Papers/Variance/`, with a README on licence. Ev: the README. CNR: none.
