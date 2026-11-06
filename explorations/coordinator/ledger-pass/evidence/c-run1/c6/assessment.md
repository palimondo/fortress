# Assessment, chunk c6 (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. No build, test or program was run; the code each claim rests on was read at the base.

## 140: rewrite
- scope pass; present meaning FAIL: pin `Library/FortressLibrary.fss:4421-4426` at 052a7c3fe now reads `opr ||` overloads; `strToFloat` is at :4606-4611, its body the same but for an explicit `SUM[\ZZ32\]`; evidence pass (code read: sign as digit, ZZ32 `10^k`); comprehension pass; ownership pass; consistency pass.
- Change: re-pinned to :4606-4611 at c124c6b65; the body quoted as it reads now. Dropped: the old pin (history).

## 338: rewrite
- present meaning FAIL: "`Library/FortressLibrary.fss:730`, `:819` at 052a7c3fe" now point at a trait header and an excludes clause; the `minimum` getters are at :736 and :826. Evidence FAIL: bare "`s1.fss`" does not resolve. Others pass. No commit since 2026-10-08 names numerals in walk (git log --grep), so the claim stands.
- Change: re-pinned; the s1 probe given its full history path beside s7's; `s7.walk`/`s7.compiled` named as "their walk and compiled output" (the files stay in history at the parent of ab067d9b6). The "rather than the numeral read at the declared type" gloss cut (history).

## 579: rewrite
- present meaning FAIL: `FortressLibrary.fss:719-721` and `.fsi:443` moved (now :725-727 and `.fsi:449`, `Integral`'s api, which still declares neither bracket nor `round`, read at the base). Evidence FAIL: bare `check.sh` gone; its path is `explorations/reviews/numerics-plan-coordinator/probes-B/check.sh`, deleted by 84aef6a4f. Comprehension: "Repair as rung Q's" is a batch reference, cut.
- Change: re-pinned; check.sh given its full path and its parent commit; the long checker message shortened with "..." (the whole message: history and REPORT.md section 6).

## 321: rewrite
- present meaning FAIL: "The other half ... is fixed by `6bec1b004` (climb batch 3, rung S; test `DefaultRenderRungS`)" names a fixed half and a batch; `stringOps.java:79-86` and `:76` now read `typeName` and `asString`; the default is `jDefaultAsString` → `defaultAsString` (:108-110) → `hasOwnToString` (:112-118). Consistency pass: FACTS.md:180 and POSITIONS.md:101 agree.
- Change: mechanism re-traced through `defaultAsString`; the fixed half reduced to "an object with no such member prints its type name (`DefaultRenderRungS`)"; workaround added (name the member otherwise). Dropped: `6bec1b004` (history; FACTS.md:180 holds the present).

## 363: keep
- All pass: `FortressBuiltin.fss:42-47`, `CompilerBuiltin.fss:356-357` and `Comparison1.fss:33-36` hold at the base; FACTS.md:180 and POSITIONS.md:101 agree. silent.txt: defect.

## 369: rewrite
- present meaning FAIL: pins at d4d454f9d moved: the tuple `||` overloads are at :4425-4433, `println(a:Any)` at :4549, the `Any` fallback is `opr ||(a:String, b:Any)` at :4488 (the old note named it `opr ||(self, b:Any)` and `:4412`, which the checker read as `FTupleLike.java:4412`, past its end). The notes-refused signal (4190069c4) is the old cut of these notes; the present line holds their content.
- Change: re-pinned, the fallback named as declared, `FTupleLike.java:60` shortened.

## 374: rewrite
- present meaning FAIL: same moved pins as 369 (:4513, :4412); `objects.tex` ambiguous (four files). Others pass.
- Change: re-pinned to :4549 and :4488; fallback named `opr ||(a:String, b:Any)`; `basic-lib/objects.tex` made explicit.

## 75: rewrite
- present meaning FAIL: `Library/FortressLibrary.fsi:2547` at 63e420a33 now reads a juxtaposition comment; `nanoTime():ZZ64` is at :2563. Evidence: the reproducer `explorations/tparallel.fss` exits 0 under walk (evidence run), which is right: the claim is the compiled refusal; the note now says the reproducer fails only under `fortress compile`. FACTS.md:144 agrees.
- Change: re-pinned; how the reproducer reproduces stated. Dropped: `63e420a33` (history).

## 76: rewrite
- present meaning FAIL: `Library/FortressLibrary.fss:4328-4329` now reads `SimpleMappedIndexed`; walk's string juxtaposition is :4512-4514. "which the code generator now compiles" carried a repair story's "now".
- Change: re-pinned; the workaround (`||`) stated as one.

## 316: keep
- All pass: `CompilerBuiltin.fsi:37-40`, `CompilerBuiltin.fss:407`, `String.fss:578` hold; reproducer `none` with the probe's account in `explorations/compile-ladder/rung-library-meets/SKEPTIC.md` section 5 (present in the tree). Sibling 76 named.

## 458: rewrite
- present meaning FAIL: claim "where before climb batch 7 rung H it was `true`" is a batch story; pins `:4514`, `:4516`, `:4556-4566` now read juxtaposition and `errorPrint`; `andRelCond`/`andCondCombine` are at :4909-4916, called at :4860, :4862 (`SimpleFilterGenerator2`, not `FilterGenerator2`); `OverloadedFunction.java:490-498` moved after a 939-line change. Consistency: the record-says-fixed signal is FACTS F-44 (FACTS.md:41), which states the same open behaviour: agrees.
- Change: claim states the present (false, though the value is right and fusion holds); re-pinned; the walk overload-check line dropped (history; the exclusion reason stays); workaround added (call `andRelCond`). Dropped: "One generic `ANDCOND` lacks the element type" (history). silent.txt: choice.

## 313: rewrite
- evidence FAIL: the reproducer `ProjectFortress/tests/immutableTopLevel.fss` is a plain walk test that passes and asserts no order (report 5.5 item 4 names this row). Others pass.
- Change: reproducer `none`; the notes say how to see it (compile and run that program, compare with walk) and keep the old compiled output's history path.

## Overlaps
Rows 321, 363, 369, 374, 75, 76 share files (CompilerBuiltin, FortressBuiltin, the String `||` block) but state different defects; 369 and 374 already name each other, 76 and 316 likewise. No duplicate, no cross-chunk pair (314 in c11 is named by 76 only as a user of `||`).

## mech.py
Last line: "MECH: 10 lines, 0 failing, every check passes."
