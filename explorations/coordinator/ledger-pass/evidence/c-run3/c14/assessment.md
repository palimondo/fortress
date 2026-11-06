# Assessment, chunk c14 (base c124c6b65)

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## 304: rewrite
- scope pass; present meaning pass; evidence fail: the pin "at dbf4825e0" names a commit not in the base's history (its landed form is d96242f0a, which the evidence's "last written by" names; lines 3588-3592 hold the three messages at the base); comprehension pass; ownership fail: siblings are listed as "Also refused: ... (row 624) ... (row 865) ... (row 701)" with no `siblings:` cell first; consistency pass (FACTS.md:146 agrees; it also cites `dbf4825e0`'s code, which the coordinator should re-point to d96242f0a).
- Change: pin to d96242f0a; `siblings: 624, 701, 865` first.
- Beyond the evidence: `git log` of c124c6b65 for d96242f0a; CodeGen.java:3580-3597.
- Dropped facts: none.

## 624: rewrite
- scope pass; present meaning pass; evidence fail: `NamingCzar.java:1262`, `:1272`, `:1412`, `:1523`, `:899` hold unrelated text at the base ("makeBoxedTraitName", a comment, "}", `return ""`, a blank line); the four throws are at 1308, 1318, 1458, 1569, and the unwrap at 945; comprehension pass; ownership fail: no `siblings:` (304, which names it, and 604, the checker's varargs row); consistency pass (FACTS.md:31, 83, 145, 146 agree).
- Change: re-pinned at c124c6b65; added the local-function refusal `CodeGen.java:3597`; siblings 304, 604.
- Dropped facts: the 0, 1 and 6 extra arguments of the Tagger call, `dumpTraitMethodSigs` as the caller, and the repeated message at the `stringifyChars` call: home the history (row 624) and the test `XXXVarargsMethodCodeGeneration`.

## 643: keep
- scope pass; present meaning pass (the XXX test stands, nothing since touched it); evidence pass (an XXX run test with its link test); comprehension pass; ownership pass (no sibling); consistency pass. The notes say "Not traced": the mechanism is unknown, which is stated, not hidden.

## 701: rewrite
- scope pass; present meaning pass; evidence fail: `CodeGen.java:2971`, `:4109`, `:5029` at b0f6cd6b7 have moved: the contract guards are at 3023, 4384, 5303 at the base; ownership fail: siblings name 823, which is FIXED, and omit 352 (the same guards' throws test); consistency pass (FACTS.md:268 agrees).
- The two refused notes (batch 17 rung A, batch 18 rung K) describe the where-clause refusal that c324b841c removed; they no longer hold, and are not carried.
- Change: re-pinned; siblings 304, 352, 650, 781, 867; the WhereBound test list shortened to a glob.
- Dropped facts: row 823 as a sibling (closed; its own row holds it); the five test names written out (the glob `compiler_tests/WhereBound*Compiled` names the four).

## 763: keep
- scope pass; present meaning pass; evidence pass (XXX run test); comprehension pass; ownership pass (siblings 406, 761, 764); consistency pass. "Not traced further" stands: `NamingCzar`'s `forBoolBase` (NamingCzar.java:1897-1899) encodes the argument as "true", consistent with 'true$RTTIc', but I did not trace where the RTTI class name is made, so no pin is added.

## 867: rewrite
- evidence fail: the pin "at e1ab927ad" is not in the base's history (FnNameInfo.java:99 holds the same line at the base); comprehension fail: "Until rung G the code generator refused both, 'Don't know how to compile this kind of FnDecl.'" is a repair story; ownership pass; consistency pass (FACTS.md:268). Scope, present meaning pass.
- Change: pin at c124c6b65; the repair sentence cut; "Workaround: none known"; the history marker added (the history holds its line).
- Dropped facts: the old refusal message (home: the history, row 867, and row 701); row 749 as a sibling (it is FIXED: the checker now accepts the call, which is why this row's call reaches the code generator; its own closed row holds it).

## 25: rewrite
- (mech.py: the probe `p22_runtime_sized.fss` is now named by its full old path, and the wording of three sentences is shortened.)
- evidence fail: `Library/FortressLibrary.fss:2247` at 63e420a33 now reads `tabulate(...)`; `array[\E\](x) = __arr1(__thrower[\E\],reflect(x))` is at 2259; the probes are gone, and are named with the commit to read them from (allowed). Others pass. `NatReflect.fss:33-35` is the comment on `__refl'` (the function is at :42), which the sentence means. Ownership: added 304, since generic local functions are still refused compiled.
- Change: re-pinned at c124c6b65; sibling 304.
- Dropped facts: none.

## 307: rewrite
- evidence fail: "at `a1a75716a` and `9d323883f`": 9d323883f is not in the base's history; ownership fail: siblings omit 25 and 867, which name it or overlap; present meaning: the NatReflectTest half rests on a run at a1a75716a (2026-10-09), see questions.md; comprehension, scope, consistency pass (FACTS.md:185, 219, 268 agree).
- Refused notes: batch 13 N (the arithmetic half cleared: a repair story, in the history), batch 17 A (where-clause variables not read by the code generator: since changed by c324b841c), batch 17 W (walk's and the compiled path's bool forms: held by siblings 761, 763, 764). None carried.
- Change: the dead pin cut; siblings 25, 761, 763, 764, 867.
- Dropped facts: none beyond the dead pin.

## 761: keep
- every check passes; the XXX walk test ran green under the gate a12ab5c60, which holds for the base, so it still fails as asserted. `:78` is `FTraitOrObjectOrGeneric.java:78`, the `filteredSortedSet` call with `NodeComparator.fnAbsDeclOrDeclComparer` (:84), as the sentence says; the evidence's "moved" read it against NodeComparator.

## 764: rewrite
- evidence fail: `FnNameInfo.java:190-206` is now `normalizedSchema` at 185-206; `Functionals.scala:1094` is `checkExprFunctionals`' declaration, the call is at 1152 (and 1276); `:168-182` is FnNameInfo's `boundsFor` (holds), now named with its file; StaticTypeReplacer.java:121-131 holds (`forTypeArg` unwraps the bound). Ownership: added 761. Others pass.
- Change: re-pinned at c124c6b65; sibling 761.
- Dropped facts: none.

## 352: rewrite
- evidence fail: `CodeGen.java:2970`, `:4108`, `:5028` have moved: 3022, 4383, 5302 at the base; ownership fail: no siblings, though row 781 shows the object and trait tests are never reached (the disambiguator drops the clause) and row 701 shares the guards; consistency: the old "refuses a `throws` clause only on objects and traits" is not reachable, which the row now says.
- Change: re-pinned; siblings 701, 781; probe named by its full old path.
- Dropped facts: the sentence "The `throws` clause is decoration." (the claim states it).

## 781: rewrite
- comprehension fail: "exits 0 on the base and on main" names a batch's base; ownership fail: siblings omit 352 (the functional's throws check); others pass (`TypeDisambiguator.java:112-113`, `:137-138` hold; the a874948ac lines are the team's own file at that commit; Decls.scala:139-142 holds).
- Change: "on the base and on main" cut; sibling 352.
- Dropped facts: none.

## Pairs, duplicates, closes
- No duplicate: 352 (a functional's throws check) and 781 (the trait's and object's clause dropped) are siblings; 701 and 781 are siblings, as written.
- No pair for the reconcile run: 304/865, 624/604, 763/406 are siblings at different sites.
- No close; no NEGATIVE-VERIFIED row beside `silent`.

## mech.py
Last line: `MECH: 9 lines, 0 failing, every check passes.`
