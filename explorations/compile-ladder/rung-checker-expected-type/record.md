# Record lines of rung E of climb batch 11 (rung-checker-expected-type), for the gather

## FACTS entry (section "The checker and the one library")

- **The compiled checker gives a call its expected type in a clause of an `if` without `else` (`()`), a block's last expression after local declarations, a `typecase` clause and a loose juxtaposition, and renames an inherited method's own static parameters apart from the receiver's static arguments** (`compile-ladder/rung-checker-expected-type/REPORT.md`; rows 560 and 627 fixed).
  - The sites: `impls/Misc.scala:583-584` (the `if` without `else`), `:326`, `:340`, `:662-667` (the `typecase`), `impls/Decls.scala:51-58` (`checkLetBody`) and `impls/Operators.scala:173-192` (the loose juxtaposition).
  - `STypesUtil.instantiateMethodApart` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1737-1783`) instantiates each method that `commonInheritedMethods` returns. It first renames to `name$i` each of the method's own static parameters whose name the arguments mention, so the method invocation and a call by name inside a trait are repaired alike.
  - The checker still gives no expected type to an argument of another call (row 455, `XXXInferContextDrops`) or to the body of a `label` expression (row NEW-E-1, `XXXInferResultOnlyLabelBody`, `Library/String.fss:431`).
  - Gated by `compiler_tests/InferResultOnlyIfWithoutElse`, `InferResultOnlyAfterLocalDecl`, `InferResultOnlyTypecaseBranch`, `InferLooseJuxtContext`, `MethodStaticArgReceiverSameName` and `InheritedMethodByNameStaticParamSameName`.

The FACTS entry "The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, ..." changes in two places:
- In its list of tests, `XXXInferResultOnlyNoContext` becomes `InferResultOnlyIfWithoutElse`.
- Its last sentence's clause, "are refused where no expected type reaches the call (row 560's second part, pinned by `XXXInferResultOnlyNoContext`; REPORT section 5)", now reads: "are refused where no expected type reaches the call, now only at a `label` body (row NEW-E-1, `Library/String.fss:431`) and at an argument of another call (row 455)".

## Rows the rung fixes (for `ledger.py close`, after the landing commit)

- Row 560: `ProjectFortress/compiler_tests/InferResultOnlyIfWithoutElse.test` (commit `587ce436d`).
- Row 627: `ProjectFortress/compiler_tests/MethodStaticArgReceiverSameName.test` (commit `587ce436d`).

## Ledger notes

- **Row 560** (before its close): Climb batch 11 rung E (`587ce436d`): the four contexts give their expected types, and 12 of the 13 sites clear, gated by `InferResultOnlyIfWithoutElse`, `InferResultOnlyAfterLocalDecl`, `InferResultOnlyTypecaseBranch` and `InferLooseJuxtContext`. The thirteenth, `Library/String.fss:431`, is a `typecase` that ends a `label`'s body: row NEW-E-1.
- **Row 627** (before its close): The substitution site is `STypesUtil.commonInheritedMethods`, which instantiates each inherited method at its declaring trait's static arguments (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1733` at `83b1cae78`). Climb batch 11 rung E renames the method's clashing own static parameters there first (`instantiateMethodApart`). This also repairs the capture at a call by name inside a trait that inherits the method (`InheritedMethodByNameStaticParamSameName`, a `typecheck` test), whose compiled run dies of row NEW-E-2.
- **Row 455**: Climb batch 11 rung E (`587ce436d`) repairs the loose-juxtaposition face: `e: BoxV[\ZZ64\] = wrapV 3` checks and runs (`InferLooseJuxtContext`). `XXXInferContextDrops` keeps the two argument faces, keyed 'File XXXInferContextDrops.fss has 2 errors.'.
- **Row 340**: The same crash for a `try` as the body of a function returning `ZZ32` whose `catch` value is a numeral, `tried(): ZZ32 = try f() catch e InvalidRange => -1 end`: 'Error trying to close method scope' on `83b1cae78` (climb batch 11 rung E's probe).

## New rows

Section "2. Types: generics, static parameters, inference and coercion":

| NEW-E-1 | the compiled checker gives the body of a `label` expression no expected type, so a call that ends the body and whose type parameter only its result mentions takes the bound `Any`, and the body is refused: `Library/String.fss:431`, `SubString.verify` | CONTESTED | implementation gap (checker) | `basic/expressions/label.tex`, "Label and Exit"; `basic/inference.tex`, "A Numeral Whose Conversions Tie" | `ProjectFortress/compiler_tests/XXXInferResultOnlyLabelBody.test` | climb batch 11 rung E | siblings: 560, 455. `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:706` checks the body with no expected type (at 587ce436d), and the label's type is the join of the body's and its exits' types. `label.tex` gives that type as a union, which by the reading taken for a `typecase` clause (Q2, way 1) would give the body the enclosing expected type; the inference chapter lists a label's body as not yet described, so the reading is the curator's. The test pins today's refusal. Workaround: none in the library's practice. |

Section "12. The compiled path: constructs, crashes and the switch-over":

| NEW-E-2 | on the compiled path a generic method inherited from a generic trait and called by name inside another trait's method links and dies at run time with `NoSuchMethodError` on the calling trait's `mp` | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/traits.tex`, "Method Declarations" | `ProjectFortress/compiler_tests/XXXInheritedGenericMethodCalledByName.test` | climb batch 11 rung E | With `trait Gen[\E\]` declaring `mp[\G\](f: E->G): Gen[\G\]`, `trait Twice[\H\] extends Gen[\H\]` whose `again()` calls `mp[\String\](fn (e:H):String => "x")`, and `object Box[\E\](x: E) extends Twice[\E\]` providing `mp`, `Box[\ZZ32\](3).again()` dies: 'NoSuchMethodError: ... XXXInheritedGenericMethodCalledByName$\=Twice?...FZZ32?.\=mp??Arrow?Arrow?H,...'; the same on 83b1cae78, where the shape with no shared name compiles; walk prints `PASS`. Not traced. The pair is `InheritedGenericMethodCalledByNameLink.test` with the XXX run test. Workaround: none known. |

Both rows pass `python3 explorations/coordinator/tools/ledger.py check --rows`, apart from the placeholder number. `Specification/appendices/changes.tex` cites NEW-E-1 in the Effect of its entry "The contexts that give a call an expected type". The gather puts the row's number there too.

## Handover line

Climb batch 11's rung E (`wip/rung-checker-expected-type`): the compiled checker gives an expected type to a clause of an `if` without `else`, a block's last expression after local declarations, a `typecase` clause and a loose juxtaposition (item 36 under Q2, row 560), and renames an inherited method's own static parameters apart at their instantiation (row 627, also at a call by name inside a trait). The inference chapter's two lists are revised, with the Appendix I entry "The contexts that give a call an expected type". The count stays 1, and the distance falls from 253 to 235: 12 of item 36's sites and row 627's 6. `String.fss:431` stays: it is a `label` body, row NEW-E-1, put to the curator. Row NEW-E-2 records a code-generator death of an inherited generic method called by name inside a trait.

## Entry for `.claude/skills/fortress-repo/references/revival-changes.md`

Revival change: none. The change makes the compiled checker do what the team's own text already says: an `if` without `else` (`Specification/basic/expressions/if.tex:68`), a block (`blocks.tex:55-56`), an identifier reference's static arguments (`var-ref.tex:37-39`) and a `typecase` (`typecase.tex:110-111`). Walk already runs every program involved. The instance the call takes is the bound rule that the part's entry "A type parameter that a call does not fix" already gives. Row 627 was a capture defect of the team's checker against its own scoping rule (`trait-parameters.tex:22-23`), which walk already obeys. The text revised in the inference chapter is the revival's own, not the team's.
