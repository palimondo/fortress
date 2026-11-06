# Check of c21 (c-run3, base c124c6b65)

`mech.py` ran: 8 lines, 0 failing; applied on copies, `ledger.py check` and `check --base c124c6b65` exit 0. Read at the base: `OverloadSet.java:1338-1353`, `:1480-1490`, `:2040-2052` and its diff from `052a7c3fe` (one comment line at `:1501`); `Functionals.scala:820-834` against `811053f15:736-752` (same block); `OverloadingChecker.scala:252-255`; `parser/Identifier.rats:95-104`, `Parameter.rats:125-131`, `Compilation.rats:308-336`; `Specification-1.0-frozen/basic/components/source-code.tex:84-94`; the `.test` files and the api of `XXXImportExceptOperator`; ledger rows 41, 159, 493, 494, 495, 510, 706, 811, 851, 854; FACTS F-75, F-281; commits `fd5cb4864`, `6d187d069`, `93e5bf98d`; the probes in `ab067d9b6^` and `e879b6a44^`. No build or test run.

## 495 (keep): pass
Cited `OverloadSet.java:2393-2414` changed by one comment line elsewhere since `d4d454f9d`; the probe path is history-explained; siblings agree with 496's new line.

## 496 (rewrite): FAIL, fidelity
- Passage: "The dispatcher is not a template, so the call-site dispatch of top-level functions does not reach it".
- Source: the change this replaces ("rung G's call-site change") is `fd5cb4864`, "arms are dispatched at the template's parameters": `atTemplateParams` (`OverloadSet.java:1342-1353` at c124c6b65) returns null unless the arm has as many static parameters as the template (`templateStaticParams`, `:1338-1340`), so a dispatcher whose principal is the plain `peek(a: Any)` never calls the arm at the template's parameters. "Call-site dispatch of top-level functions" names no mechanism that the tree shows, and the cold reader then read "How a call ... reaches the generic one is not traced" as contradicting it.
- Correction (notes 694 of 700): replace `so the call-site dispatch of top-level functions does not reach it, and it is not passed the static return type (`OverloadSet.java:2048` at c124c6b65; PLAN phase 5)` with `so its arms are not called at the template's parameters (`OverloadSet.java:1342-1353`), and it is not passed the static return type (`:2048` at c124c6b65; PLAN phase 5)`.
- Nothing lost: `052a7c3fe` (pin superseded), rows 493, 494 (FIXED; history). Siblings 495, 538, 699 match those rows.

## 499 (rewrite): FAIL, cold read
- Passage: "Answer 9's rule as `e2f1aa7e8` builds it compares return types" and the claim's "do not agree position by position": the cold reader could not resolve either, and a worker would not know what the checker checks.
- Source: FACTS F-75 states the rule: generic declarations in the more-specific relation with as many static parameters agree in kind by position, and the more specific return type is a subtype of the other's read at its parameters by position.
- Correction (notes 671): replace `Answer 9's rule as `e2f1aa7e8` builds it compares return types` with `F-75's positional rule compares kinds and return types`.
- Otherwise holds: `:1342-1353` and `Functionals.scala:824-832` hold the cited code; row 159 is FIXED (`6d187d069`), so "walk refuses it" was false and "not measured" is right; reproducer `.test` exists. Nothing lost.

## 538 (rewrite): pass
`:1484` "Runtime inference for some cases", `:2048` "Not sure what to do with return type." at the base; siblings 496, 699, 706 match 699's and 706's lines (706 names 538). Nothing lost (pin only).

## 699 (rewrite): pass
`XXXGenericInstanceReturnOnly.test` exists (`run_out_does_not_contain=REACHED`) with `GenericInstanceReturnOnlyLink.test`; siblings match 706's. Nothing lost (the test moved to the reproducer cell).

## 813 (rewrite): pass
`ed4782762` is not in the base's history; `importsOnDemand` at `:252-255` reads only `getExceptNames`. Row 811 FIXED (`108ab82d6`; F-281); dropping it and "on the base too" loses nothing that the history does not keep.

## 814 (rewrite): FAIL, cold read
- Passage: claim "leaves it imported, on both paths" beside the notes' "Walk runs the component with its own `-`, 2."; and "leaves the listed `-` out by its text ... the code generator's set holds both `-`".
- Source: the cold reader read these as contradicting (walk seems to honour the `except`) and could not tell which part keeps `A`'s `-`. `93e5bf98d` (fortress-repo, settled by the coordinator) says neither path leaves out a listed infix operator, and walk runs the component's own `-`; the test `XXXImportExceptOperator.fss` asserts 2 with its own `-`, and the api's `-` (`ImportExceptOperatorApi.fss`) answers 1.
- Correction (notes 699 of 700, both edits): replace `and accepts the component; the code generator's set holds both `-`.` with `and accepts the component; the disambiguator keeps `A`'s `-`, so the code generator's set holds both.`; replace `Walk runs the component with its own `-`, 2.` with `Without a `-` of its own, both paths run `A`'s `-`; with one, walk runs the component's, 2.`
- Nothing lost: 811 (FIXED; history), "as on the base..." (history; F-281). Pins re-pointed correctly; `TopLevelEnv.java:726-733`, `:956-958` hold.

## 851 (keep, CONTESTED): pass
No commit touches its cited files since the row; status kept; what settles it named.

## 854 (keep, CONTESTED, `silent`): pass
No commit touches its cited files since the row; not NEGATIVE-VERIFIED, so nothing for `silent.txt`.

## 706 (keep): pass
Siblings 510, 538, 699 now matched by 538 and 699. Pair 706/510 plausible (510's siblings name only 705).

## 42 (rewrite): FAIL, fidelity
- Passage: claim "`except { opr ∑ }` parses; only `except { opr BIG + }` actually works".
- Source: the probe `explorations/fable-review-probes/RvwExceptSigma.fss` (in `e879b6a44^`) only prints "except { opr ∑ } parsed"; nothing shows what `∑` leaves out. The cold reader could not resolve it. That `BIG +` works is row 41 (POSITIVE-VERIFIED).
- Correction (claim about 140 of 300): `except { opr SUM }` is a syntax error; `except { opr ∑ }` parses, and what it leaves out is not measured; `except { opr BIG + }` leaves out `SUM` (row 41)
- Otherwise holds: `Identifier.rats:95-104` `SimpleName` has no `SUM`; `Parameter.rats:129` is `SingleOp`'s `SUM` as `BIG +`; spec `:86-88` hold. Nothing lost (full path).

## 13 (rewrite): FAIL, reproducer and nothing lost
- Passage: "(`explorations/compile-ladder/rung-export-var/probes/skeptic/SkAlias.fss`; its capture beside it). Probe `explorations/alias-units-probes/p10_import_as.fss`, in the parent of `e879b6a44`."
- Source: `SkAlias.fss` and `skeptic-differentials.txt` are not in `e879b6a44^`; they were deleted by `ab067d9b6` (`ab067d9b6^:.../skeptic-differentials.txt:20-28` holds "Variable ctr is not defined." three times, `compile-exit=255`). The cold reader read all probes from `e879b6a44^`, which fails for these. The dropped token `skeptic-differentials.txt` had no home.
- Correction (notes 697 of 700, both edits): replace `The grammar's `AliasedSimpleName`` with ``AliasedSimpleName``; replace `; its capture beside it)` with `, capture `skeptic-differentials.txt`, in the parent of `ab067d9b6`)`.
- Otherwise holds: `Compilation.rats:308-336` takes `match` (`=>`, `Symbol.rats`); spec `:93` writes `as`; `p10`, `p12` in `e879b6a44^`.

## Questions and pairs
`questions.md`: no measure; the optional walk run of `XXXGenericPositionalFixed.fss` is narrow, runs from the main tree, and each outcome maps to a line or a new row: pass. `pairs.txt` 706/510: pass. No closes, no duplicates.

Counts: 7 pass, 5 fail (496, 499, 814, 42, 13).
