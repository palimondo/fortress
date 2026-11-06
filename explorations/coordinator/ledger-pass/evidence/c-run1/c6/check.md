# Check, chunk c6 (run c-run1, base c124c6b65)

mech.py: "MECH: 10 lines, 0 failing, every check passes." Form passes on every new line. Cited lines were read at the base with `git show c124c6b65:PATH`. No build or test was run. closes.txt, dups.txt and pairs.txt are empty. questions.md hands nothing to the prober; its "lower-priority runs" are not dispositions, and each names a command that runs from the main tree. Its claim that the code under each run is unchanged holds for the lines read here.

Totals: 3 pass (363, 316, 313), 9 fail (140, 338, 579, 321, 369, 374, 75, 76, 458).

## 140: FAIL (path)
- Fidelity: `Library/FortressLibrary.fss:4606-4611` holds the body as quoted (`SUM[\ZZ32\]`, `10^k (both[|both| - 1 - k].codePoint - '0'.codePoint)`). `FlatData.fss:13` holds `parseFloat`. Dropped tokens: the old pin is false now, and the body is kept with spaces added.
- Failure: the line names no path, and the cold read flags this ("Which path(s) show it is not said"). `strToFloat` is declared only in the one library (`Library/FortressLibrary.fsi:2623`, `.fss:4606`). `git grep strToFloat c124c6b65 -- ProjectFortress/LibraryBuiltin` finds nothing, so the defect is walk's alone until the switch-over.
- Correction: in the claim, after "mis-parses a sign and overflows on a long mantissa", insert " under walk (the compiled prelude has no `strToFloat`)". The claim has room (182 of 300).

## 338: FAIL (cold read)
- Fidelity: `:736` and `:826` hold the `minimum` getters `-2147483647 - 1` and `-9223372036854775807 - 1`. The probes s1 and s7 sit at `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/` in ab067d9b6^. Dropped tokens: `:730` and `:819` are false now. `s1.fss` is kept with its full path. `s7.walk` and `s7.compiled` are kept as "their walk and compiled output".
- Failure: "Of the wider probe's five negative edges" cut the link the old line gave ("the wider probe `s1.fss`"), and the cold read could not tell which probe is meant.
- Correction: replace from "Of the wider probe's five" to the end of the probe sentence with: "Of the wider probe `s1.fss`'s five negative edges walk refuses only this one. Probes `s1.fss` and `s7.fss` in `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/`, with their walk and compiled output, in the parent of ab067d9b6." This is shorter than the present text, so it fits under 700.

## 579: FAIL (nothing lost: a path cut; cold read)
- Fidelity: `.fss:725-727` holds `opr |\self/|`, `opr |/self\|` and `round(self)` in `Integral`'s body. `Integral`'s api runs from `.fsi:449` to `:487` and declares neither bracket nor `round`. check.sh is in 84aef6a4f^ at the path given.
- Failure 1: the token `explorations/compile-ladder/rung-numeral-library/REPORT.md`, from mech's dropped list, is now written `compile-ladder/rung-numeral-library/REPORT.md`, which does not resolve from the repository root. The file is in the tree at the base, and its section 6 is the `IntLiteral` repair.
- Failure 2: "`IntLiteral` its own." reads as elliptical in the cold read. The old line said "its own three".
- Correction: write `explorations/compile-ladder/rung-numeral-library/REPORT.md` section 6. Write "`IntLiteral`'s api its own three". To stay under 700, cut "by coercion" after "only `RR64`'s and `QQ`'s apply,": the quoted message says "Ambiguous coercion".

## 321: FAIL (cold read; a citation lost)
- Fidelity: `CompilerBuiltin.fss:355` is `getter asString(): String = jDefaultAsString(self)`. `stringOps.java:108-110` is `defaultAsString`, and `:109` is `hasOwnToString(a) ? a.toString() : typeName(a)`. `:112-119` is `hasOwnToString`, true when `toString`'s declaring class is neither `FValue` nor `Object`. `FortressBuiltin.fss:51` is `getter toString(): String = self.asString`. FACTS F-123 (FACTS.md:180) and P-91 (POSITIONS.md:101) agree. Dropped tokens: `6bec1b004` is history and FACTS holds the present; `:76` and `:79-86` are false now.
- Failure: "reaches `FValue.toString`, which re-enters `asString`" leaves the loop's last step uncited. The cold read could not place `FValue` and could not tell how the loop re-enters. The earlier line cited it: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FValue.java:25-27`, `return this.asString().toString();`, which still holds at the base.
- Correction: replace "reaches `FValue.toString`, which re-enters `asString`" with "reaches `FValue.toString`, `this.asString().toString()` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FValue.java:25-27`)". To fit 700, cut the final sentence "Blocks adopting walk's `trait Object`, which declares `getter toString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:51`)." Its home is P-91 (POSITIONS.md:101).

## 363 (keep): PASS
- `FortressBuiltin.fss:42-47` (the article form), `CompilerBuiltin.fss:356` (brackets) and `:357` (`self.asString`, with the article body commented out at :358ff) hold. `not_working_library_tests/Comparison1.fss:33-36` asserts `U.asDebugString = "Unordered"` and the rest. No commit since the row touches these lines. P-91 and F-123 agree. silent.txt: defect, accepted.

## 369: FAIL (cold read)
- Fidelity: `:4425-4433` holds the five tuple `||` overloads, each writing `","`. `:4549` is `println(a:Any) = println("" a)`. `:4488` is the top-level `opr ||(a:String, b:Any)` with `cast[\Object\](b).asString`. `FTupleLike.java:60` is `res.append(',')` in `getString`. `CompilerBuiltin.fss:471` juxtaposes `"(" str(a) ", " str(b) ")"`, which gives `( 1 ,  a )` under `|||`. The tests `XXXTupleSeparatorRungS.fss` and `XXXTupleSevenRungS.fss` exist. Dropped tokens: the old pins and the `opr ||(self, b:Any)` naming are false now.
- Failure: "with row 76 repaired it matches" does not say what it matches. "The one-element `tuple` prefix is not measured" names a form that neither the skill nor the line defines. The cold read could resolve neither.
- Correction: "with row 76 repaired it prints `(1, a)`, as the specification requires". Then either name the one-element form concretely, as the notes-refused cut 4190069c4 or history row 369 gives it, or cut the sentence.

## 374: FAIL (consistency; status of the compiled half)
- Fidelity: the walk half holds. `:4549` → `opr juxtaposition(a:String, b:Any) = a || b` (`:4514`) → `:4488` casts to `Object`. `FortressBuiltin.fss:37-41` is `trait Object extends Any` with `asString`. `CompilerBuiltin.fss:460` is `println(x:Object)`.
- Failure: "that half turns on a conflict: `types-vals-vars.tex` puts arrow types under `Any` beside `Object`, `basic-lib/objects.tex` makes `Object` the root of ... functions" presents as open what the record settles. P-42 (POSITIONS.md:39) says "`Any` holds tuples, functions and `()`, which `Object` does not". `references/compiler.md:100` names this very limit: the prelude declares `print` and `println` at `Object`, not `Any`, until the switch-over, and the one library declares them at `Any`. The cold read asked whether the compiled half is just that limit, and the line does not say.
- Correction: replace from "that half turns on a conflict" to the end of the notes with: "the prelude declares `println` at `Object`, not `Any`, until the switch-over. P-42 puts a function under `Any`, not `Object`, which settles the chapters' disagreement (`types-vals-vars.tex` against `basic-lib/objects.tex`), so the walk half's fix is a rendering for an arrow value at `Any`. full text: history, row 374". This is shorter than the present text.

## 75: FAIL (cold read)
- Fidelity: `CompilerBuiltin.fsi:23` is `nanoTime(): RR64` and `CompilerBuiltin.fss:352` its body. `Library/FortressLibrary.fsi:2563` is `nanoTime():ZZ64`. `.fss:4522` binds `simpleLongArith.longNanoTime`. FACTS F-314 (FACTS.md:144) says `nanoTime` answers `ZZ64` through a `long`, which the checker reads as `ZZ64`. `tparallel.fss:14` declares `ms(t0: ZZ64, t1: ZZ64)`, and walk runs it (evidence: exit 0). Dropped tokens: `63e420a33` is history; `fsi:2547` is false now.
- Failure: "the prelude's `RR64` one stays" can be read as meaning the gap is now closed, or that a second binding survives the switch-over. The cold read flagged it, and the row is open only because of that declaration.
- Correction: replace it with "the prelude's `RR64` declaration is unchanged, so the gap stands until the switch-over deletes the prelude". Add the tail "full text: history, row 75", as the other rows have. To fit 700, cut "The prelude is deleted at the switch-over, when the compiled path takes the interpreter's library.": the new sentence carries it.

## 76: FAIL (cold read; a false aside)
- Fidelity: `CompilerBuiltin.fss:406` is `opr juxtaposition(self, b:Object): String = self ||| b`. `FortressLibrary.fss:4512-4514` use `||`. `tests/simplify1.fss:29` is `joinString(a:String, b:String):String = a b`. `JuxtConcatRungSLink.test` and `XXXJuxtConcatRungS.test` exist. Dropped token: `:4328-4329` is false now.
- Failure 1: "G6 —" opens the claim and nothing defines it (the cold read could not resolve it). It is an old list label: history.
- Failure 2: "One token ... the expected failure goes red on a local fix of the token" reads as an invitation to edit the prelude. `references/compiler.md:34` says "Do not edit the prelude's text", and the cold read reports the conflict as unresolved.
- Failure 3: "Workaround: write `||`, as rows 314 and 316 do." Row 314 at the base is about `assert` and states no use of `||`. Row 316 shows the compiled `||` takes a `String` on the left only (`CompilerBuiltin.fsi:37`), so `||` works around the spaces only with a `String` left operand.
- Correction: drop "G6 — " from the claim. After "goes red on a local fix of the token", add "; the prelude's text is not edited, so the switch-over, when the compiled path takes `:4512-4514`, closes it". Replace the workaround with "Workaround: write `||` with a `String` on the left (row 316)".

## 316 (keep): PASS
- `CompilerBuiltin.fsi:37-40` declares the four at `(self, b:Object)`. `CompilerBuiltin.fss:407` puts `makeCharacter(10)` in `//`. `String.fss:578` is `newline: String = lineSeparator`. Walk's top-level `opr ||(a:Any, b:String)` is at `FortressLibrary.fss:4481`. The two commits since, 93884be8d and bb3925156, change none of these words. SKEPTIC.md section 5 is in the tree.

## 458: FAIL (fidelity; cold read)
- Fidelity: `:4909` is `andRelCond` and `:4911-4916` is `andCondCombine`, which calls it at `:4915`. `:4860` and `:4862` call `andCondCombine`. `Generator2.fss:88-93` is `relational`. The api's `ANDCOND` is the generic `opr ANDCOND[\I\](p1:I->Condition[\()\], p2:I->Condition[\()\]): I->Condition[\()\]` (`.fsi:966`, `.fss:1565`). FACTS F-44 agrees. silent.txt (choice) is accepted.
- Failure 1: "from `SimpleFilterGenerator2` (`:4860`, `:4862`)": the two methods at those lines are `trait FilterGenerator2`'s (`:4856`), which `object SimpleFilterGenerator2` (`:4870-4871`) extends. The writer dropped `FilterGenerator2` as wrong, but it is the declaring site. This is minor, but the dropped token is true.
- Failure 2: "would be legal under walk only by `RelationalPredicateCondition[\E\] excludes Condition[\()\]`" lost its citation (`OverloadedFunction.java:490-498`, which moved in a 939-line change), and the line gives no present site. At the base, walk's rule for generic overloads is `OverloadedFunction.java:585` ("with generic type, at least one pair of parameters must have excluding types").
- Failure 3: the cold read could not parse "a program's own `ANDCOND` ... beside the api's", and could not tell which `ANDCOND` the library exports.
- Correction: "`filter` fuses via `andRelCond` (`:4909`), called by `andCondCombine` (`:4911-4916`) from `FilterGenerator2`'s `filter` and `__generate2filtered` (`:4860`, `:4862`)". Then: "the api's generic `ANDCOND` (`Library/FortressLibrary.fsi:966`) answers a plain `I->Condition[\()\]`. An overload of `ANDCOND` at relational predicates beside it would pass walk's check of generic overloads (`OverloadedFunction.java:585` at c124c6b65) only by `RelationalPredicateCondition[\E\] excludes Condition[\()\]`, which the checker refuses." Shorten the probe sentence if needed to fit 700.

## 313: PASS
- The new reproducer `none` is right: `tests/immutableTopLevel.fss` asserts only the count (`effects = 7`), not the order. Its `object P ff:ZZ32 = do O.p(1); 17; end` and `O.p` are as the claim quotes. The history output `explorations/compile-ladder/rung3/raw/immutableTopLevel.fss.run` in ab067d9b6^ prints `O.p( 1 ) called` after `d =  2`, which is the lazy order, with row 76's spaces. `tests/InitOrderWithMutable.fss` exists. The cold read's open items ("count 7" belongs to the program; `O` is defined in the program) resolve once the named program is opened.
