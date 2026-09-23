# Rung M: the skeptic's first judgement

At the gather (2026-09-22) the provisional rows 354, 355, 356 and 357 this text cites became ledger rows 370, 371, 372 and 373.

**Verdict: refused, on one citation in the provenance block.** The rung itself is sound, and nothing below argues otherwise. The memo changes no answer I could find. The pre-edit table is what the stock code prints. The post-edit table comes out again when I run it. Every differential I wrote gives the same answer with the memo on and off, at one thread and at four. What fails is brief item 0. The `problem:` line maps the JFR capture's `:786` to `TypeAnalyzer.scala:757`, and line 757 does not say what the block says it says. The brief makes that a refusal. The repair round is textual: that line and the three required corrections below. No source change is asked for.

Worktree `/home/user/fortress-memo`, branch `wip/rung-analyzer-memo` at `a0e44bb16` (level with origin), four worker commits on `d610695c0`, `git status` clean when I started. I inherited nothing else. My probes and captures are under `explorations/compile-ladder/rung-analyzer-memo/probes/skeptic/`.

## 0. The provenance block

I opened every file:line cited in the five lines.

- `problem:` `explorations/perf-probes/nat/followup/f3-jfr-top.txt:40-42`: yes, 39,287 samples, 34,122 with `substitute` (87%), `parents$1` 17,591 at shadow line 756, `excludesClause$2` 16,213 at shadow line 786. `probes/timing.txt:4-9`: yes. **The mapping to the tree is wrong for one of the two lines.** The block says the capture's `:756`/`:786` are the tree's `TypeAnalyzer.scala:726` and `:757`. 726 is right (the `parents` substitute lambda). 757 is `val transitively = supers.flatMap{`, which calls no `substitute`. The lambda the capture names, `$anonfun$excludesClause$2(List, List, TraitTypeWhere)`, is `tw => substitute(args, params, tw.getBaseType)` at **:756**. Its three arguments are the captured `args` and `params` and the parameter `tw`. The shadow-to-tree offset is 30 at all three lambdas the capture lists (756→726, 783→753, 786→756). Evidence: `probes/skeptic/citations.txt`. A minor point: "87% … under `parents` … and `excludesClause`" is the capture's figure for *every* sample with `substitute`. The lambdas of the two functions account for 33,892 of 39,287 samples (86%). I note this and do not require a change, because the batch record uses the same phrasing.
- `spec:` `Specification/basic/types-vals-vars.tex:207-215` (208-214 carry the extends/excludes sentences; 207 is blank), `:163-164`, `Specification/basic/traits.tex:187-192`: yes, read with context. `matrix-unpasting.tex:52-53` and `probes/spec-grep.txt`: I re-ran the grep and got the same two hits. No `apis/` citation.
- `precedent:` `explorations/perf-probes/nat/shadow.patch:656-715` (the memo hunks), `TypeAnalyzer.scala:380-391` (`pExcMemo`), `TypeSchemaAnalyzer.scala:53` (one switch): all as described.
- `deviation:` `TraitTable.scala:81-97`, `:82`, `:83-84`, `:89-96`; `shadow.patch:710-715`; `followup.md:96-98`; `TypeAnalyzer.scala:722`, `:747`: all as described. `TypeAnalyzer.scala:62-69` is the block of seven cache switches plus `debugSubtype` at :62. The batch record says 63-69. This is harmless.
- `historical:` names both files the diff edits under `ProjectFortress/`, and both are 2012-tree files.

## 1. The recorded failure (the table) and my own run of the stage

- `probes/checker-count-preedit.txt` is committed in `3264d93e6` (19:51:13), which carries that file alone. The edit is committed in `fe83db93e` (19:54:06). The pre-edit table is byte-identical to `explorations/compile-ladder/gate-baseline/checker-count.txt`.
- **I showed that the pre-edit table is what the stock code prints.** I compiled `TypeAnalyzer.scala` and `TraitTable.scala` *at `d610695c0`* with scalac 2.13.18 into the stage's scratch classes directory, which `run.sh` puts ahead of `ProjectFortress/build`. The stage then printed a table identical to the pre-edit capture and to the gate baseline (`probes/skeptic/stock-overlay.sh`, run twice, `probes/skeptic/stage.txt`).
- **I reproduced the post-edit table.** I ran my own `ant compileAll` (37 s, and afterwards I restored the tracked `default_repository/caches/global.map` with `git checkout`, which confirms the worker's operational note). I then ran `explorations/coordinator/tools/checker-count/run.sh` with the switch at its default. The table is identical to `probes/checker-count-postedit.txt`: `#total 93`, `#locations 52`, the same `nat` crash line at `STypesUtil.scala:557`, `#shadow` fresh.
- With the switch off (`FORTRESS_ANALYZER_CLAUSES_CACHE=false`) the table is identical to the pre-edit capture. The checker's full output behind the three tables is identical line for line: memo on, memo off and stock code, 253 lines, 96 located error lines, the header and `### rc` lines excluded.
- **Manifest:** the report names the total, 93, with no `expectedCheckerCount` and no `expectedCheckerCrash` for M. That matches `CLIMB-BATCH-3.md:65`. Nothing rises and the crash line does not move.
- **Timing** (single samples on the shared box, `stage.txt`): memo on 12.6 s, memo off 23.4 s, stock code 24.5 s. This agrees with `probes/timing.txt`. Every run used a fresh private scratch cache (`run.sh` passes `-Dfortress.caches=$SCRATCH/caches`), and the fast and slow runs share one build. So the speed-up is the memo, not a warm cache or a build artefact.

## 2. The diff, line by line

Two files change. `TypeAnalyzer.scala`: exactly two lines, the `def` lines of `parents` (:722) and `excludesClause` (:747). Each now passes its unchanged body by name to `traits.memoParents(t)` / `traits.memoExcludesClause(t)`. No line is added, so P's `:443-457` does not move. `TraitTable.scala`: two imports and the memo at :81-97, 20 lines added. The edit does what the report says and nothing else.

**Soundness, which is the question the batch record puts to the skeptic** (`CLIMB-BATCH-3.md:148`: "that the memo is dropped or invalidated wherever the trait table changes"):

- *What the two functions read.* `typeCons` is `traits.typeCons` (`TypeAnalyzer.scala:708-710`). `substitute` (`TypeAnalyzerUtil.scala:35-60`) is a pure syntactic walk. It replaces a `VarType` by name and does not walk into what it substitutes. Neither function reads `env`. A key such as `List[\T\]` therefore means the same thing to the memo under every `KindEnv`, because the result is the same syntax whatever `T`'s bounds are.
- *The key.* `TraitType.equals` (`nodes/TraitType.java:74-95`) compares info, name, args and trait static params. `TypeInfo.equals` compares static params and where clause. `SpanInfo.equals` is always true. So the key covers everything `parents` and `excludesClause` read (name and args), and the only thing a hit can hand back that differs is spans.
- *The table never changes under the memo.* `TraitTable`'s constructor parameters are never reassigned. `CompilationUnitIndex` wraps its type constructors in `CollectUtil.immutable` (`:41`). `TraitIndex._ast` is `final` (`TraitIndex.java:33`), so `extendsTypes` and `staticParameters` are fixed. `ProperTraitIndex._excludes` is mutated only by `IndexBuilder.checkTraitClauses` (`IndexBuilder.scala:235,245,261`), and only on the unit's own `typeConses` map while that map is being built. `TypeParser.scala:131-132` does the same before `:173` makes its table. The checker gets its `GlobalEnvironment` as `FromMap`. `FromRepository` is constructed only for parsing (`GraphRepository.java:823`). All eight `new TraitTable` sites are the ones the report lists, and every `TypeAnalyzer` is made either from one of them or by `extend`/`extendJ` over the same table (`TypeAnalyzer.scala:768-772,798`). `StaticChecker.java:248` rebuilds the component index, and the analyzer over the old table is used again at `:268`. The report says so, and memo or no memo that path reads the old index.
- *Exceptions and recursion.* Nothing is stored until a computation returns, so a throw from `typeCons` or from a cast recurs exactly as before. A cyclic hierarchy is caught by `TypeHierarchyChecker` before any of this, and the diagnostics are identical both ways (`SkMemoCycle`, `SkWalkCyclePlain` below). `get` then `putIfAbsent` outside any mapping function is safe under `excludesClause`'s recursion into its own map.
- *Threads.* There is no thread, executor or fork-join use in `compiler/`, `scala_src/` or `repository/` (my grep has one hit, the emitted descriptor at `compiler/codegen/CodeGen.java:651`). No file under `runtimeSystem/` names `TraitTable` or `TypeAnalyzer`. `FORTRESS_THREADS` reaches only the run and walk, never the checker.
- *Cross-rung, rung P.* P relaxes `checkP` (`:443-457`) and possibly raises the relaxation for the whole overloading check. Neither memoized function reads `checkP`, `pExc` or any relaxation state. They return the declared clauses instantiated. So an answer cached under P's relaxation is the answer outside it, and M's memo needs no twin under P. That stays true as long as P does not make `parents` or `excludesClause` read its switch, and the batch record says it does not (`CLIMB-BATCH-3.md:47-50`: P edits `:443-457`, the two hierarchy checks and `checkOverloading`, or takes the broad form inside `pExcInner`, which neither memoized function calls).

## 3. The precedent search

The count of ten memos is right: seven in `TypeAnalyzer.scala` (:97, :380, :504-508, switches :63-69), two in `TypeSchemaAnalyzer.scala` (:90, :148, switch :53), and `validOverloadingMemo` (`typechecker/OverloadingChecker.scala:441`, switch :77). My grep of `scala_src` for memo and cache declarations finds no eleventh. The worker named the one precedent with a key defect: `validOverloadingMemo`'s key at :452 omits `signatures`, `isMethod` and `oa` (:443-448), and the entry is already on record (`FACTS.md:41`). The worker gave the count, one of ten, and did not copy that shape. The three departures from the precedent are recorded as decisions with their alternatives: the switch on the table, one switch for two memos, and `ConcurrentHashMap`. I agree with all three. None changes an answer.

## 4. The test

No test file. The two tables are identical by design, and the "difference" the rung claims is the time, which I re-measured (§1) and showed not to be a cache or build artefact. The gated assertion is what the gate's eighth step checks: the total, 93, and the crash line. That is weaker than "identical line for line", and the report says so honestly ("after landing, the gate's eighth step rechecks the total and the crash line"). The compiler-test corpus that `testFast` runs is the stronger backstop, and the worker's 435-unit on/off differential shows it unmoved. The one source comment (`TraitTable.scala:81`) states the invariant a future editor must keep. It is not provenance.

## 5. The competing-declaration grep

`probes/skeptic/grep.txt`. The added names (`memoParents`, `memoExcludesClause`, `cacheClauses`, `parentsMemo`, `excludesClauseMemo`, `fortress.analyzer.clauses.cache`, `FORTRESS_ANALYZER_CLAUSES_CACHE`) appear only in the two edited files, across `src/com/sun/fortress/` as a whole, every `*_tests` corpus, `tests/`, `LibraryBuiltin/`, `Library/`, `default_repository/` and both `build.xml`. No configuration sets any `fortress.analyzer.*` property. There is no collision. The report's sentence about the word `memo` is wrong in two details (required correction 3). It says "three interpreter classes (`FTypeTuple.java:46`, `FTypeArrow.java:37`, `IntNat.java:41`)". But `IntNat.java:41` is a use (`return memo.make(ll)`); the field is at `:57`. And fourteen files outside `TraitTable.scala` use the word, not three. None of them is in a hierarchy with `TraitTable`, which has no subclass.

## 6. record.md

- The FACTS line is true as written except for one count, which is required correction 2. "The prelude's 556 class files" is wrong: the worker's own unpacked comparison (`tmp/jcmp/on`) holds 556 *files*, of which 462 are `.class` and 94 are `.xlation`. My rebuild gives the same 462 `.class` entries in the five prelude jars (`probes/skeptic/prelude.txt`). The "2,049 class files" of the corpus comparison is right (`tmp/jcmp3/on`: 2,049 `.class` of 2,423 files). The "14 analyzed-cache files" I cannot reproduce. My prelude build leaves 15 files: 12 `.tfi`/`.tfs` at the top of `analyzed_cache/` and 3 under `depends/`. The line should say what it counted. Every other citation in the line opens to what it says.
- The ledger note opens a new row (provisional 354). It renumbers nothing, has the ledger's eight columns and cites committed captures. A reader six months from now can check it: `timing.sh` and `stock-overlay.sh` both rerun from the tree. Its status "POSITIVE-VERIFIED (measurement)" has precedent in row 139. A note for the gather, not a correction: the ledger's cost rows live in §15 "Program shape and cost" (139, 154, 302, 303, 306), while the worker files this row under §10, where rows 307-310 are the WorldFlip checker rows. Either placement is defensible.
- The handover line is accurate.
- The worker says the launch had not created this worktree, and that it created it with the `remote-container.md:103-109` recipe. I cannot verify the history of that. I can say the worktree is registered, the branch is cut from `d610695c0`, and it is level with origin.

## 7. The three homes

- **The rung's defect** (the checker re-instantiates a trait's clauses on every call): repaired here. Its home is the one the batch record assigns: the committed timing capture plus provisional row 354 (`CLIMB-BATCH-3.md:148`), because a wall-clock time cannot be a gated assertion. The assertion the gate can hold is the unchanged total. I re-measured both.
- **The span property of a memo hit** (the earlier caller's source spans): I went looking for it with `SkMemoSpan`, three objects that each reach `U[\ZZ32\]` through `Mid[\ZZ32\]` from different lines and columns. Every one of the 12 errors is located on its own declaration's line and columns, and the output is identical on and off. This is a property, not a defect, as the worker says.
- **Two interpreter defects my differentials measured.** Neither is the rung's, and neither moves with the memo, because walk never runs this code. The specification settles both. Neither can be a gated XXX test, though. An XXX file means "expected to fail", and the correct behaviour here *is* failure, a rejection. Today walk accepts the first program, so an XXX file would be red today. And for the cycle it would pass both before and after a repair, because the program fails either way. So their record is the committed probes plus the two rows in recommendedRows, for the gather to open or refuse.

## The differentials, both thread columns

I wrote eight programs of my own. Every one ran under walk at `FORTRESS_THREADS=1` and `4`, and through `fortress compile` + `fortress run` at 1 and 4, against two prelude caches built in library order, one with the memo on and one with it off (`probes/skeptic/walk.txt`, `compiled-on.txt`, `compiled-off.txt`, `prelude.txt`; scripts `walk.sh`, `comp.sh`, `libbuild.sh`).

| program (what it exercises) | walk, T=1 | walk, T=4 | compiled, memo on, T=1 / T=4 | compiled, memo off, T=1 / T=4 | verdict |
|---|---|---|---|---|---|
| `SkMemoTower`: `excludesClause` recursing through `D[\T\] → C[\T\] → A[\T\] excludes B[\T\]`, three instantiations, runtime dispatch | 7 lines `kEA kFB mDZA mDZA mFB nDSA nGB` | same | compiles; same 7 lines / same | identical | agree |
| `SkMemoAmbig`: the key must hold the static arguments. `f(R)/f(S)` excludes through `P[\ZZ32\]`, `g(R2)/g(S2)` through `P[\String\]`, and `h(R)/h(S2)` must not | rejected at startup: `x:[S2] and x:[R] are unrelated` | same | `Invalid overloading of h`, 1 error; f and g accepted | identical | agree: both reject exactly `h` |
| `SkMemoCycle`: generic cycle `X[\T\] extends Y[\T\] extends X[\T\]` | `StackOverflowError` in `FTraitOrObject.visitTrait` | same | `Cyclic type hierarchy` ×2 | identical | both reject; walk by crashing |
| `SkWalkCyclePlain`: the same cycle without generics | `StackOverflowError` | same | `Cyclic type hierarchy` ×2 | identical | as above |
| `SkMemoObjExcl`: `object Clash extends { W, V[\ZZ32\] }` with `W extends U[\ZZ32\]`, `U[\T\] excludes V[\T\]`, beside a legal `Fine1` | `both objects accepted` | same | 4 errors, all on `Clash` | identical | **diverge** |
| `SkMemoSpan`: three such objects at different columns, for the span property | `all three accepted` | same | 12 errors, each at its own line and columns | identical | **diverge**; spans unchanged by the memo |
| `SkWalkExclDirect`: `object Both extends { U[\ZZ32\], V[\ZZ32\] }` | accepted | same | 4 errors | identical | **diverge** |
| `SkWalkExclPlain`: `trait A excludes { B }`, `object Both extends { A, B }` | accepted | same | 4 errors | identical | **diverge** |

The compiled prelude built on and off gives identical unpacked bytecode (462 `.class` in five jars, plus `SkMemoTower`'s 44) and an identical `analyzed_cache` (16 files).

**Rule 4 on the divergences.** The four programs that diverge are outcome 2: the specification settles it against the interpreter. `Specification/basic/traits.tex:218-222` says "If a trait T excludes a trait U, the two traits are mutually exclusive: neither can extend the other, and no trait can extend them both." `Specification/basic/types-vals-vars.tex:142-143` says "no value can have a type that is a subtype of two types that exclude each other". The compiled path's rejection is right, and walk accepts because it never runs `TypeHierarchyChecker` (`TypeHierarchyChecker.scala:181`), the same mechanism ledger row 22 records for `comprises`. The two cycle programs are not a divergence in outcome: both paths reject, as `traits.tex:191-194` requires ("This relation must form an acyclic hierarchy"). Walk rejects by overflowing the stack in `FTraitOrObject.visitTrait` (`FTraitOrObject.java:245-247` recurses on `getExtends()` with no in-progress mark). None of this involves the rung, whose code walk never runs. Both are in recommendedRows.

**Thread counts.** Every probe ran at 1 and at 4, on both paths, both memo settings. The two columns agree everywhere. That is expected, because the memo lives in the single-threaded compiler, but the brief asks for both columns because the table is shared state, and I ran them.

## The failure-mode question

The rung replaces no loud failure with a value. With the memo on, a throw inside either function stores nothing and recurs on the next call as before. With the switch off, every call runs the unchanged body. The one behavioural difference is spans on a hit, and I found no output that shows it. Loud to quiet: none.

## Findings

1. **Refusal ground (item 0):** the provenance `problem:` line maps `f3-jfr-top.txt`'s `:786` to `TypeAnalyzer.scala:757`. The substitute lambda is at `:756`, and `:757` is the `transitively` `flatMap` (`probes/skeptic/citations.txt`).
2. **Count error in the record:** "556 class files" is 556 files, of which 462 are `.class` (REPORT.md:68, `probes/differential.txt:21`, the record.md FACTS line). The "14 analyzed-cache files" does not reproduce; my rebuild leaves 15.
3. **Citation error:** REPORT.md's "Names added" paragraph gives `IntNat.java:41` (a use; the field is `:57`) and says "three interpreter classes" where fourteen files use the word.
4. **Substance, no change asked:** the memo is sound on every axis the batch record names. The table is never mutated during its life, every rebuild is a new table, the key covers every input, the value is independent of `env`, there are no threads, and it is sound under rung P's relaxation.
5. **Notes for the gather, not corrections:** "87%" is every `substitute` sample, and the two functions' lambdas are 86%. Row 354 could sit in §15 by the precedent of rows 139/302/303/306. `:62-69` includes `debugSubtype`.

# Rung M: the skeptic's second judgement

**Verdict: approved, with one required correction to one sentence of `REPORT.md`.** The refusal ground of the first judgement is repaired: the `problem:` line now maps the capture's shadow `:786` to `TypeAnalyzer.scala:756`, and line 756 is the lambda the capture names. Every correction the judge listed is made, and it is made correctly. Where the worker departed from the judge's wording, it followed the tree, and the tree agrees with the worker (the fourteen files, the capture line ranges, walk's unused `TraitTable`). I rebuilt the tree and ran the stage again. The post-edit table comes out, the memo-off table and the stock-code table equal the pre-edit capture, and the checker's full output is identical all three ways. I wrote seven new programs and ran each under walk and compiled, memo on and off, at one and four threads. The memo changed no answer. One of the programs measured a defect outside the rung, in walk's overload check, and it is in recommendedRows. This part is appended below the first judgement so that the lines `REPORT.md`, `record.md` and `JUDGE.md` cite (`SKEPTIC.md:11`, `:62`, `:64-81`) do not move.

**Inherited and re-verified.** The branch is at `a8589973f`, level with origin, and the worktree was clean. Since my first judgement (`f25a1080b`) it has the judge's `0a0aea932` and the worker's repair `a8589973f`. `git diff a0e44bb16 HEAD` touches nothing under `ProjectFortress/`, and the net source change against the batch base is the same 22 added and 2 changed lines I read in the first judgement. I re-ran every check below and did not rely on the earlier captures.

## 0. The provenance block, five lines, opened again

- `problem:` `f3-jfr-top.txt:40` gives 34,122 of 39,287 samples (87%) with `substitute` on the stack. `:41` is `parents$1`, 17,591 samples at shadow 756. `:42` is `excludesClause$2(List, List, TraitTypeWhere)`, 16,213 samples at shadow 786. `:44` is `excludesClause$1`, 88 samples at shadow 783. Together that is 33,892 samples, which is 86.3% of the total. `TypeAnalyzer.scala:726` is the `parents` substitute lambda. `:756` is `val supers = ….map(tw => substitute(args, params, tw.getBaseType))`. `:753` is the excludes-clause `substitute`. `citations.txt:37-40` states the offset of 30, and `timing.txt:4-9` is the six timed rows. **The line now says what the capture says.**
- `spec:` `types-vals-vars.tex:207-215`, `:163-164` and `traits.tex:187-192`: read again with ten lines either side. They say what the line says, and none of them is an `apis/` rendering.
- `precedent:` `shadow.patch:656-715`, `TypeAnalyzer.scala:380-391` and `TypeSchemaAnalyzer.scala:53`: as described.
- `deviation:` `TraitTable.scala:81-97`, `:82`, `:83-84` and `:89-96`; `shadow.patch:710-715`; `followup.md:96-98`; `TypeAnalyzer.scala:722` and `:747`. The block of seven is now cited as `:63-69`, which is right: `:62` is `debugSubtype`.
- `historical:` names the two files the diff edits, and both are 2012-tree files.

## 1. The recorded failure and pass, and my own run of the stage (`probes/skeptic/stage2.txt`)

- The pre-edit table is committed alone in `3264d93e6` (19:51:13), before the edit commit `fe83db93e` (19:54:06), and it is byte-identical to `gate-baseline/checker-count.txt`.
- I ran `ant compileAll` from the root: 27 s, and scalac ran. Both edited classes were rewritten, and `javap` shows `memoParents` and `memoExcludesClause` on `TraitTable`. I restored `global.map` with `git checkout`.
- With the memo on, the stage took 9.3 s, and its table equals `checker-count-postedit.txt`. With the memo off it took 21.8 s, and its table equals `checker-count-preedit.txt`.
- The stock code, the batch base's two files compiled ahead of the build by `stock-overlay.sh`, gives a table equal to `checker-count-preedit.txt`. The TraitTable in that overlay has no memo member.
- The full checker output behind the three tables (253 lines, 96 located error lines) is identical on, off and stock.
- **The total is 93 and the crash line is unchanged.** The report names no `expectedCheckerCount` and no `expectedCheckerCrash`, as `CLIMB-BATCH-3.md:65` has it.

## 2. The diff

It is unchanged, and my first reading holds (`SKEPTIC.md` §2 above). This round I checked two more things.

- **Walk never reaches the memoized functions.** Walk's phases are `PhaseOrder.java:125-135`. Its `TYPECHECK` phase enters the checker only under `Shell.getTypeChecking()` (`StaticChecker.java:166`). That switch defaults to false (`Shell.java:1275`), and walk's branch never sets it (`Shell.java:420-424`). `Desugarer.java:121` constructs a table and never uses it. `PreTypeCheckDesugarer.java:28` imports `TraitTable` and uses nothing from it. The interpreter's overload rewrite names neither class. So the worker's correction is right: the memo's field initializers run under walk, and `parents` and `excludesClause` never do.
- **What a memo hit can hand back.** The report says a hit differs from a recomputation only in spans (`REPORT.md:45`, "Nothing else can differ"). My first judgement said the same (§2 above), and the judge repeated it (`JUDGE.md` §4). All three are wrong by one field. `TypeInfo` extends `ParenthesizedInfo` (`nodes/TypeInfo.java:23`), whose `_parenthesized` flag (`nodes/ParenthesizedInfo.java:24`) is left out of `TypeInfo.equals` (`nodes/TypeInfo.java:58-72`) and of `generateHashCode` (`:81-87`), just as the span is. So a hit can return an argument whose `parenthesized` flag differs from the caller's.
  - This is the span's twin, not a defect. No output shows it: the worker's 230 serialized analyzed ASTs were identical, and so were the three analyzed-cache files and 67 class files of my new probes.
  - The sentence still states a soundness invariant wrongly, and that is required correction 1.

## 3. The precedent search

It is unchanged, and it is right. There are ten memos, and one of them has the key defect (`OverloadingChecker.scala:443-448` against `:452`, `FACTS.md:41`). The worker counted it and did not copy it.

## 4. The test

There is no test file. The two tables are identical by design. The difference the rung claims is time, which I measured again at 21.8 s off and 9.3 s on. Both runs used fresh private caches and one build, so the speed-up is not a cache or build artefact.

## 5. The competing-declaration grep, re-run at `HEAD`

`memoParents` and `memoExcludesClause` occur only in the two edited files. `cacheClauses`, `parentsMemo`, `excludesClauseMemo` and `fortress.analyzer.clauses.cache` occur only in `TraitTable.scala`. `FORTRESS_ANALYZER_CLAUSES_CACHE` occurs nowhere. I searched `ProjectFortress/src/com/sun/fortress/`, `ProjectFortress/tests`, every `*_tests` corpus, `LibraryBuiltin/`, `Library/`, `default_repository/configuration` and both `build.xml`.

I checked the worker's refined count of the word `memo` file by file. Twelve files declare a field of that name:

- `FTypeArrow.java:37`, `FTypeGeneric.java:293`, `FTypeOpr.java:31`, `FTypeOverloadedArrow.java:35`, `FTypeRest.java:25`, `FTypeTuple.java:46` and `IntNat.java:57`
- `FGenericFunction.java:120`, `GenericConstructor.java:65`, `GenericMethod.java:80`, `GenericSingleton.java:49` and `OverloadedFunction.java:941`

`SingleFcn.java:49` and `useful/LazyMemo1PCL.java:18-21` use the word only in comments. The worker's sentence is right, and so was its choice to follow the tree over the judge's "field or local".

## 6. record.md

- **The FACTS line.** The counts are corrected: 462 class files (556 with the 94 `.xlation` files), and the analyzed-cache count is stated with what was enumerated. The 87%/86% restatement matches the capture, and every citation in the line opens to what it says.
- **Row 354** is unchanged apart from the same restatement. It renumbers nothing.
- **Rows 355 and 356.** Row 356 is the judge's appendix text byte for byte. Row 355 differs in one clause. "Outside rung M, which changes code walk never runs" became "whose two memoized functions walk never calls (`compiler/StaticChecker.java:166`)". That is the more accurate sentence, for the reason in §2.
- **Citations in the rows.** I opened every one:
  - `TypeHierarchyChecker.scala:80-82`, `:119-121`, `:178-181` and `:187-189`
  - `FTraitOrObject.java:236-251` and `:245-247`, `Shell.java:420-424`, and `FileTests.java:932`, `:587`, `:654`, `:639-643`, `:534-539` and `:583-585`
  - `traits.tex:193-194` and `:220-222`, and `types-vals-vars.tex:142-143` and `:199-200`
  - the ledger's `:57-58`, `:127-151` and `:136`
  - `walk.txt:44-51`, `:52-75`, `:76-83` and `:3`, and `compiled-on.txt:42-48`, `:59-69`, `:80-106`, `:117-127`, `:138-148` and `:159-165`
  - `SkWalkExclPlain.fss:5-7` and `SkWalkCyclePlain.fss:5-6`
  
  All of them say what the rows say.
- **The appended correction in `differential.txt:54-55`.** It is placed at the end so that `:38` does not move. I agree with that choice.
- **The handover line and the decisions paragraph** are accurate.
- **For the gather** (a note, not a correction): folding three rows also moves the ledger's "Counts by status" section (`fortress-gap-ledger.md:643`).

## 7. The three homes

- **The rung's defect** (the clauses re-instantiated on every call) was repaired here. Its home is the timing capture plus row 354, by the batch record's designation (`CLIMB-BATCH-3.md:148`). I re-measured it (§1).
- **A and B** (walk accepts extension of mutually excluding traits, and walk overflows on a cyclic hierarchy) now have provisional rows 355 and 356 in `record.md`, plus the committed probes.
  - Both rows say why neither can be held in the second home: the specified behaviour is a rejection, and an `XXX` file cannot express that polarity (`FileTests.java:932`, `:587`, `:654`). A `.test` content check fails whatever the prefix (`:534-539`, `:583-585`).
  - I checked those lines, and the reasoning holds. The gap in the rule goes to Pavol through `record.md`'s decisions paragraph.
- **The parenthesized-flag property** (§2) is a property, not a defect, like the span.
- **The one new defect my probes measured** (below, "C") is walk's, and it is outside the rung. Its home is a ledger row plus the committed probes. That is the third home, and the reason is given with the row in recommendedRows. The specification's prose disagrees with itself on this point, the design paper settles it, and the settled behaviour is a rejection. So the second home is closed to it for row 355's reason.

## The differentials of the second judgement, both thread columns

I wrote seven new programs. The worker did not write them, and neither did I in the first judgement. Each ran under walk at `FORTRESS_THREADS=1` and `4`, and through `fortress compile` + `fortress run` at 1 and 4 against the prelude caches I built in library order in the first judgement, one with the memo on and one with it off. The compiler source has not changed since those caches were built.

- Captures: `probes/skeptic/walk2.txt`, `compiled2-on.txt`, `compiled2-off.txt` and `genovl-ctl.txt`.
- Scripts: `walk.sh` and `comp.sh`, with `PROBES` set as each capture's header records.
- The compiled captures on and off are identical apart from the word `on`/`off`. The three programs that compile leave jars (67 classes unpacked) and analyzed-cache files that are byte-identical on and off.

| program (what it exercises) | walk, T=1 | walk, T=4 | compiled, memo on, T=1 / T=4 | compiled, memo off, T=1 / T=4 | verdict |
|---|---|---|---|---|---|
| `SkM2Diamond`: `excludesClause` through a diamond (`D[\T\] extends { L[\T\], R[\T\] }`, both over `Top[\T\] excludes { Other[\T\] }`), where the shared ancestor is reached twice, at two instantiations; overloads `k`, `q`; subtyping to `Top[\ZZ32\]`, `Top[\String\]` | 6 lines `kDZTop kOZOther qOSOther qDSTop upZTop upSTop` | same | compiles; same 6 lines / same | identical | agree |
| `SkM2DiamondBad`: `k2(D[\ZZ32\])`/`k2(Other[\String\])` must not exclude through the diamond (the key must carry the argument) | rejected at startup: `x:[Other[\String\]] and x:[D[\ZZ32\]] are unrelated` | same | `Invalid overloading of k2`, 1 error | identical | agree: both reject exactly `k2` |
| `SkM2ParentsKeyBad`: `parents` keyed by argument: `f(x: A[\ZZ32\])` called with `B[\ZZ32\]` first, then with `B[\String\]` | `fZ`, then a run-time `Unification error` at `:13:11-17` | same | `Could not check call to function f … not applicable to an argument of type ObjBS`, 1 error at `:13:11-16` | identical | both reject the second call; walk at run time, the known shape of an interpreter with its checker off |
| `SkM2VarScope`: `B[\T\] <: A[\T\]` through `parents` with a type variable, `T extends ZZ32` in `f` and `T extends String` in `g`, one key `B[\T\]` for both | `fhA ghA` | same | compiles; same / same | identical | agree |
| `SkM2Infer`: a joined inferred type checked against `A[\ZZ32\]` through `parents` (`viaA(pick(B2, B1))`) | `viaA B1` | same | compiles; same / same | identical | agree |
| `SkM2GenOvl`: `o[\T\](P[\T\])`/`o[\T\](Q[\T\])` with `P[\T\] excludes { Q[\T\] }`, and a call `o(Mixed)` with `Mixed extends { P[\ZZ32\], Q[\String\] }` | accepted; `oP` `oP` | same | `Invalid overloading of o`, 1 error | identical | **diverge (C)** |
| `SkM2GenOvlCtl`: the same pair without the `excludes` clause (a control) | rejected: `… at least one pair of parameters must have excluding types` | same | `Invalid overloading of o`, 1 error | identical | agree; shows walk's check ran on `SkM2GenOvl` and passed it because of the clause |

Two first versions were discarded, and both are recorded here.

- The first version of each program named its objects with two capital letters (`DZ`). Walk refuses such names ("`DZ is not a valid object name`"), so I renamed them.
- The first `SkM2Infer` called a method on the inferred type. The compile then stopped at the known `NI.nyi` for a method call on a union type (`OR(B1,B2)`, `scala_src/typechecker/impls/Common.scala:108`), which is already recorded (`explorations/coordinator/map/dormant-code.md:214`; `tests/commonSuper.fss` on the ladder). It stopped identically with the memo on and off. The committed version calls no method on the union.
- The first `SkM2VarScope` also held C's pair, which rejected the whole file on the compiled path. I moved that pair into `SkM2GenOvl`.

**Rule 4 on C.** Walk and the compiled path disagree on `SkM2GenOvl`. The specification's prose disagrees with itself, and the design intent settles it.

- **The literal rules accept the pair.** `basic/overloading.tex:100-108` and `advanced/overloading.tex:95-103` say that overloaded declarations have identical static parameters "up to α-equivalence" and that the rules ignore them. Read that way, `P[\T\]` and `Q[\T\]` exclude by the declared clause, and the Incompatibility Rule (`advanced/overloading.tex:214-216`) accepts the pair.
- **The purpose and the guarantee reject it.** The rules exist "to eliminate the possibility of ambiguous calls at run time" (`advanced/overloading.tex:60-65`). The Incompatibility Rule rests on there being "no call to which two overloaded declarations are both applicable" (`:178-181`). Each declaration's static parameters are inferred for the call (`basic/overloading.tex:173-175`, `:292-295`). And among the applicable declarations one is more specific than all the others (`:288-291`). `o(Mixed)` is a call to which both declarations apply, with `T = ZZ32` for one and `T = String` for the other. Neither is more specific. `Mixed` itself is legal, because `P[\ZZ32\]` excludes only `Q[\ZZ32\]` (`types-vals-vars.tex:212-214`), and the compiled path reports no hierarchy error for it.
- **The design paper decides.** It is the source the compiled checker follows (`explorations/coordinator/map/design-intent-sources.md:20`). A generic declaration's domain is the existential type over its own parameters (`Papers/Types/overloading-check.tick:30-39`), so `∃T.P[\T\]` and `∃T.Q[\T\]` overlap at `Mixed`.
- **So the compiled rejection is right, and walk is wrong.** Walk's rule for two generic declarations requires an excluding pair (`interpreter/evaluator/values/OverloadedFunction.java:497-499`, message `:527`). It found one, which only holds if both declarations share one `T`, and it then dispatched `o(Mixed)` to the first declaration without a word, at both thread counts. That is the second outcome of rule 4, with the repair outside this rung. It sits beside row 159 (walk's same rule is too strict there) and row 355 (walk's other missing exclusion check).

**Thread counts.** Every program ran at 1 and at 4, on both paths, with both memo settings, and the columns agree everywhere.

## The failure-mode question

The rung turns no loud failure into a quiet value. A throw inside either memoized function stores nothing and recurs on the next call. With the switch off, every call runs the unchanged body. C is a quiet failure, since walk gives an answer where no single answer exists. It is walk's and it predates the rung.

## Findings

1. **Closed:** the first judgement's refusal ground, and its correction items 2 and 3. They are repaired as the judge instructed, and in two places more exactly than instructed.
2. **Required correction 1:** `REPORT.md:45`, "Nothing else can differ", must also name the `parenthesized` flag. `nodes/TypeInfo.java:58-72` and `:81-87` leave it out of `equals` and `hashCode`, as they leave out the span, so a hit can return a substituted argument whose flag differs from the caller's. The conclusion stands, and the sentence should say it for both fields.
3. **Recommended row (C):** walk accepts an overloading of two generic functions whose domains overlap, and it dispatches an ambiguous call silently. The row is in recommendedRows, with the probe and captures committed here.
4. **For the gather:** folding rows 354-356 moves the ledger's "Counts by status" section.
