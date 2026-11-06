# Chunk c23, assessment (base c124c6b65)

Marks: scope / present meaning / evidence / comprehension / ownership / consistency. Compiled `XXX` reproducers are taken as still failing: the newest gate a12ab5c60 holds for the base (evidence of 787) and no commit since the rows were written names them.

## 413: keep
pass / pass / pass / pass / pass / pass. Cited lines hold at the base: `OverloadSet.java:1873` still throws "Expecting a TypeArg when checking genericity" in `isGeneric`; `:1850-1851` still name `typeName + RTTI_CLASS_SUFFIX` inside `generateRTTIfromStaticType` (starts :1837). The only change since the pin, 1bc0a9083, rewrote a comment at :1501 (read with `git show 1bc0a9083 -- OverloadSet.java`). The patch path is deleted and the row says where to read it (parent of ab067d9b6), as the template allows. FACTS.md:185 agrees.

## 537: keep
All pass. Commits touching its cited spec files since the row do not touch the overload codegen. FACTS.md:47, :255 and POSITIONS.md:43 agree. Row 539 (c19) is walk's refusal of the paper's set; different path, not a pair.

## 542: rewrite
Present meaning fails: "Before `e2f1aa7e8` both compiled and failed `VerifyError: Bad return type`; walk ran the generic one" is a repair story, and walk's reading changed since (6d187d069, 14e91723f) so "walk ran" is unmeasured now. Evidence: the paper citation `overloading-check.tick:176-178` no longer holds the words; "U ≢ Bottom" is at :180 (read). Pin re-set to the base; line :83 unchanged in text. Added `siblings: 853` (853 names 542).
Dropped: the VerifyError before e2f1aa7e8 and walk's run on that base, home the history (old line kept whole).

## 546: keep
All pass. `OverloadingOracle.scala:190` still reads `if (hs.isEmpty || !ground(fa) || ... ) return false` in `coversOverlap` (:188). The signal record-says-fixed is a false lead: FACTS F-175 says the checker refuses, as the row does.

## 564: keep
All pass; the mechanism is honestly "Not traced". Row 567 (walk) is FIXED and the row says so.

## 566: rewrite
Present meaning fails: "which the checker accepts since climb batch 8's rung O" is a batch story. New notes state the program (from row 546's earlier line: `tag(self)`, `object Vo extends V[\ZZ32\]`), its link test, the message, walk's output; `siblings: 546, 571` added. Nothing dropped.

## 571: keep
All pass. The refused note (climb-batch-11 RECORD.md:143, the `mark?1` case through `comprises`) is already in the line in substance. Both SKEPTIC.md paths exist in the tree. Row 565 (c19) is a different site ('duplicate entry' in the compile), not a pair.

## 573: rewrite
Present meaning fails: "Older than climb batch 8." is a when-it-arose remark. The short path written as `compile-ladder/...` is given in full; the link test from the earlier line is named. Dropped: "older than climb batch 8", home the history.

## 853: measure
CONTESTED by reading, reproducer none; the row names its own settling probe. Citations moved by words only (the lines read the same, pin 501140f96 unchanged). Question in questions.md.

## 871: rewrite
Evidence fails: reproducer `none` without the command; "since rung G" is a batch story; sibling 677 is FIXED. New notes name `bin/fortress compile` and keep every output; 677 moves from `siblings:` to a sentence. Dropped: nothing.

## 879: keep
All pass for a CONTESTED row: its open question is whether P-146's plain-signature rule covers a trait that `comprises` its own parameter; P-146 and P-157 speak of F-bounded self-typed traits only, so POSITIONS does not settle it. Reproducer is a probe path, allowed.

## 787: rewrite
Evidence fails: the pin 84957e6ef is not in the base's history (mech.tsv bad commits 1), and the cited lines moved: the `where` refusals are now `OverloadedFunction.java:1013` (domainsExcludeTogether) and `:1238` (genericMeetCovered), read at the base. Present meaning fails: sibling 740 is FIXED; "the code generator then stops, 'Don't know how to compile this kind of FnDecl'" is stale: c324b841c compiles a function whose own header carries a where clause, and row 871 records the compiled where pair running. FACTS.md:211, :214 and POSITIONS.md:64 agree with the claim.
Dropped: "refused on 612869b4a" and the codegen wall on the rung's head, home the history; 740 moves to "row 740, fixed".

## Files
rows.rewrite (542, 566, 573, 871, 787), questions.md (853); closes, dups, pairs, silent empty: no NEGATIVE-VERIFIED row of the chunk cites `silent`, and no cross-chunk pair states one defect.
mech.py: "MECH: 5 lines, 0 failing, every check passes."
