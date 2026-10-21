# The briefing and checks lists of climb batch 15's four rungs, B, C, L and O (CLIMB-BATCH-15.md, section 3), in
# batch 14's form (explorations/compile-ladder/plan-14/manifest/lists14.py) for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on,
# and no process position or harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS
# and FACTS entries are keyed by their numbers; P-48 and P-147, the decisions rungs B and O build, print word for
# word at the head of their briefings. Rungs B, C and L start from the patches of the two probes taken for this
# batch, which their briefings print whole. Each briefing entry is a pair: its facts-extract.sh key and one line
# on why it is there and what the rung does with it. gen15.py renders the lines at the end of each rung worker's
# brief, in the order of the briefing. A checks list is a sub-list of its briefing's keys, read by the skeptic, a
# repair round and a judge. `python3 lists15.py` checks every key with facts-extract.sh --check (each must match
# exactly one place) and every reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'
TC = SC + '/typechecker'

CHG = "doc:Specification/appendices/changes.tex#"
WPB = "doc:explorations/perf-probes/walk-plain-bound/REPORT.md#"
CBD = "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#"
CBP = "doc:explorations/perf-probes/checker-bound-defects/patches/"
WCV = "doc:explorations/compile-ladder/rung-walk-coverage/REPORT.md#"

B_BRIEFING = [
  ("P-48", "The decision you build, word for word: a parameter that nothing at a call fixes takes its bound, constrained by the call's static return type, never Bottom."),
  ("P-59", "Walk chooses a coercion by the value until the switch-over, which the coordinator's call reads as accepting the elements' run-time types for the type N of the desugaring too."),
  ("P-27", "Each library line in the library's own spelling: IntMap's comprehension declared as Map's, the collector typed as the reductions beside it."),
  ("P-124", "The specification's examples join the gate at zero red: why you run testSpecData once, since its unwritten clause forms now go through the collection step."),
  ("P-95", "Why the revival's sentences on walk's reductions change: each Effect and callout says what walk does, with its reason."),
  ("P-96", "The form of your text changes: each passage revised in place with its callout, each entry amended."),
  ("F-141", "Walk's instance of a parameter that nothing fixes, and decision D2, the departure your rung lifts."),
  ("F-143", "The open type of an F-bounded parameter, which the record reads as walk's counterpart of N, and rows 645, 646 and 662 that it leaves open."),
  ("F-220", "Why body(i) could not be typed under walk: the fact your rung makes false."),
  ("F-53", "The count, its one error at body(i), and its rise once row 680's crash goes too: what your count run reads."),
  ("F-42", "Item 47's refusal of an untyped local parameter: why body(i) is typed, and why the collector's functions must be."),
  ("ledger:703", "Walk refuses body(i: I) on unwritten list and map comprehensions: your row, closed with your test if the line lands."),
  ("ledger:645", "An empty unwritten reduction takes ZZ32's identity: way 7 repairs it through emptyRSum's declared RR64."),
  ("ledger:646", "A set comprehension built at its elements' run-time class and refused at Set[ZZ32]: way 6 repairs it."),
  ("ledger:662", "Set's unwritten BIG UNION and BIG INTERSECTION stop at their first element: way 6 repairs them."),
  ("ledger:424", "The F-bounded half of the open parameter, fixed; its note names decision D2, which you lift."),
  ("ledger:510", "A typed binding that fixes a static argument only the result mentions: the general repair way 7 is not; its test keeps its verdict."),
  (WPB + "1. The answer", "The ways measured side by side, and why 6 + 7 is the one to build."),
  (WPB + "2. The question and the record", "The mechanism: the desugarer, __bigOperator, the covariant collections and the lift that does nothing at BottomType."),
  (WPB + "3. The ways, the library's own first", "Ways 6 and 7 as built, the cache bypass and IntMap's declared result, and the ways not taken."),
  (WPB + "4. What was measured", "The suites and the probes under each way: the verdicts your rung must reproduce."),
  (WPB + "5. The changed tests, each read against the specification", "The seven tests the bound turned red and the three promotions: each value read against the specification."),
  (WPB + "6. Under the way to brief: rows 645 and 662, row 703, microGPT", "Row 703's programs with body typed, the three promotions and microGPT's quick check under the patch."),
  (WPB + "7. What the rung would change", "Files, design points, tests to write first, promotions and the sentences made false: the rung as the probe drew it."),
  (WPB + "8. Decisions", "The probe's own choices, the cache bypass and way 7's contexts among them, which you take over or change with a reason."),
  (WPB + "10. Defects", "IntMap's declared result, your new row, and the list face of rows 646 and 20."),
  ("doc:explorations/perf-probes/walk-plain-bound/patches/wayDE-elements-expected-body.patch", "The patch you start from: apply it after your tests, read it and own it; its collector is yours to type."),
  ("doc:Specification/advanced/parallelism-locality/defining-generators.tex#Simple Desugaring of Expressions with Generators", "The desugaring by the type N of the expression, figure generatedExpressions: the normative rule walk's elements stand in for."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The chapter's rule and its sentence that walk does not yet fix a type parameter by the expected type (:265), which you amend."),
  ("doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie", "What the implementations do not yet do, with walk's open parameter, rows 645 and 662 and D2's BottomType (:362-377): you correct it."),
  ("doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions", "The reductions' box that says neither implementation directs the element type yet (:30-37): you correct walk's half."),
  (CHG + "Reductions whose element type nothing fixes", "The entry whose Effect gives walk's empty reduction and the set reductions (:1068-1074): you amend it."),
  (CHG + "The inference of a call's static arguments", "The entry that states D2 (:1852-1857) and its Effect on rows 645 and 662 (:1977-1985): you amend both."),
  ("code:" + EV + "/EvaluatorBase.java#private static ArrayList<FType> instanceOf(", "Walk's instance of a generic's static parameters, D2's line at :170 and where the hints are read."),
  ("code:" + EV + "/EvaluatorBase.java#private static boolean bigOperator(", "How walk recognises a big operator, whose plain-bounded parameter D2 keeps at BottomType."),
  ("code:" + EV + "/Evaluator.java#public FValue for_RewriteFnApp(_RewriteFnApp that)", "Where the desugared __bigOperator call is evaluated: the patch's collection step goes in here."),
  ("code:" + EV + "/BuildLetEnvironments.java#public FValue forLocalVarDecl(LocalVarDecl x)", "A local variable declared with a type: one of way 7's two contexts."),
  ("code:" + EV + "/values/FunctionClosure.java#public FValue applyInnerPossiblyGeneric(List<FValue> args)", "A function's declared return type at its body: way 7's other context."),
  ("code:" + EV + "/values/OverloadedFunction.java#public FValue applyInnerPossiblyGeneric(List<FValue> args)", "The per-argument cache of an overloaded call, which the patch bypasses while a hint is set."),
  ("code:" + EV + "/values/GenericFunctionOrConstructor.java#public FValue applyInnerPossiblyGeneric(List<FValue> args)", "The per-argument cache of a generic call, likewise bypassed: key it by the hint or carry the hint past it."),
  ("code:" + EV + "/Evaluator.java#<T extends Expr> List<FValue> evalExprListParallel(", "Walk forks a call's arguments as tasks and joins them, so a thread that has set a hint and joins runs other tasks: the window your hint design must close."),
  ("code:Library/FortressLibrary.fss#desugaredClauses:(Reduction", "__bigOperator, the count's one error at body(i), and the place after it where the collector goes."),
  ("code:Library/FortressLibrary.fsi#trait BigOperator[", "The getters that make body(i: I) check, and the types the collector's declarations take."),
  ("code:Library/CovariantCollection.fss#object CVReduction[..covariantCompr[", "The comprehensions' collection, lifted to T by upward: why the instance decides a comprehension's element type."),
  ("code:Library/IntMap.fss#private fromCC[", "IntMap's comprehension and fromCC, whose declared result you correct; its uni is UPLUS, which rung L repairs."),
  ("code:Library/Map.fsi#AnyCovColl,AnyCovColl", "Map's comprehension operator, the precedent for IntMap's declared result."),
]
B_CHECKS = [
  "P-48", "P-59", "P-27", "F-141", "F-143",
  "ledger:703", "ledger:645",
  WPB + "7. What the rung would change",
  "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
  "code:" + EV + "/EvaluatorBase.java#private static ArrayList<FType> instanceOf(",
  "code:Library/FortressLibrary.fss#desugaredClauses:(Reduction",
]

C_BRIEFING = [
  ("P-26", "The type group's late word: the POPL 2019 paper's condition that no union the checker builds holds a type parameter, which the normal-form change keeps."),
  ("P-48", "A parameter that nothing fixes takes the intersection of its upper bounds: the solver's choice under the sibling's union cases."),
  ("F-94", "The checker's failures at a parameter bounded by a closed trait, which your normal-form change repairs; the fact is rewritten after the landing."),
  ("F-53", "The count and its rise: with body(i) typed and row 680 fixed the stage reads the component whole, which your second count run measures."),
  ("F-54", "The sized arrays' count is a floor while row 680's crash hides Array3's body: what your row 680 repair uncovers."),
  ("ledger:686", "Your site, the norm's squaredNorm(me) at :2493: refused at a type parameter bounded by a closed trait."),
  ("ledger:687", "The crash on a converted numeral beside such a parameter: the same cause, through the coercion attempt."),
  ("ledger:689", "The crash on the caller's own parameter as the argument: the same cause."),
  ("ledger:690", "The false Return Type Rule error at the meet of the two domains: the same cause."),
  ("ledger:680", "Array3's crash, whose claim and note the probe found false: your row, closed with its claim corrected."),
  ("ledger:518", "The mechanism the sibling's first case changes, a union on the right before the inference-variable cases: a note, and its test keeps its verdict."),
  ("ledger:688", "The memo that keeps the count stage within its 900 s limit: the limit your two count runs are read against."),
  ("ledger:695", "The compiled body that returns self at an object type: review-routed.1's test of its bound is yours to write."),
  (CBD + "1. The answer, row by row", "Each row's cause traced to its line and its patch, and the distance with the fixes together."),
  (CBD + "2.1 Reproduction", "The four gated programs and the sibling, their messages on the base, and the drifted lines."),
  (CBD + "2.2 The trace", "The normal form, the union rule and why each row fails: the reading behind the patch."),
  (CBD + "2.3 Does one fix in the inference step serve 686, 687 and 689?", "Why a guard in the solver is not the fix and the normal form is."),
  (CBD + "2.4 The fix and its check against the papers", "The fix read against the subtyping and meet figures, the POPL 2019 condition and the Return Type Rule, and the precision it gives up."),
  (CBD + "2.5 The sibling: a ground second bound", "The sibling's crash, its two union cases and what was measured: in your rung by the coordinator's call."),
  (CBD + "4. Row 680: the local function group, not", "The bisection, the thunks primed without the group, the compiled reproducers and the fix."),
  (CBD + "5. The tracks", "The three tracks with the patches: the four promotions are the only verdicts that change."),
  (CBD + "6. The distance stage with the three patches", "54 to 49 measured with your first two patches and rung L's: your stage's comparand."),
  (CBD + "7. The rungs", "The tests first, the distance and the specification for each fix, as the probe drew them."),
  (CBD + "9. Defects, each with its home", "The sibling's row, NEW-C-1, and row 680's false note: the text of your record lines."),
  (CBD + "10. Decisions", "Why the expansion is kept for ground meets, and the ways not taken."),
  (CBP + "rows-686-687-689-690-normal-form.patch", "The normal-form patch: apply it after your tests, read it and own it."),
  (CBP + "sibling-ground-bound.patch", "The sibling's two union cases, on top of the normal form: apply, read and own it."),
  (CBP + "row-680-local-function-group.patch", "The one line of row 680's repair: the thunks primed with the checker that holds the group."),
  ("doc:research/extracts/ParkPOPL2019-extract.md#6. What it proves and what it leaves open", "The completeness condition the normal-form change keeps: no type parameter inside a union the checker builds."),
  ("doc:Papers/Types/fig-subtype.tick", "The type group's subtyping algorithm, first-match: the order of the union rule and the variable cases."),
  ("doc:Specification/basic/functions.tex#Local Function Declarations", "Local functions of one scope are mutually recursive: why row 680 is the checker's."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#protected def normConjunct(", "The normal form's conjunct step, where a closed trait is expanded: your first patch's site."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#protected def pSubInner(", "The subtype rules, the union rule at :159-166 among them: the sibling's two cases go before it."),
  ("code:" + TC + "/impls/Decls.scala#case SLetFn(SExprInfo(span, paren, _), body, fns) => {", "The local function group's check, its thunks primed at :414: row 680's site."),
]
C_CHECKS = [
  "P-26", "F-94",
  "ledger:686", "ledger:680",
  CBD + "2.4 The fix and its check against the papers",
  CBD + "2.5 The sibling: a ground second bound",
  CBD + "4. Row 680: the local function group, not",
  "code:" + SC + "/types/TypeAnalyzer.scala#protected def normConjunct(",
  "code:" + TC + "/impls/Decls.scala#case SLetFn(SExprInfo(span, paren, _), body, fns) => {",
]

L_BRIEFING = [
  ("P-27", "Each repair in the library's own way: the arrays' factories in additiveIdentity's shape, UPLUS by the library's own addNew; name each precedent line."),
  ("P-96", "The form of your text change: the revival box in the internal document revised in place."),
  ("ledger:685", "Your four sites, whose claim the probe found false: closed with the claim corrected to the library line."),
  ("ledger:704", "IntMap's UPLUS of a many-entry and a one-entry map keeps a value where the reverse throws: your second row."),
  ("ledger:671", "SYMDIFF's repair of the same node map, the precedent for a library repair of IntMap and its pins."),
  ("ledger:364", "Walk's KeyOverlap carries the value's run-time class, so a catch of KeyOverlap[ZZ32] misses it: catch UncheckedException in your test."),
  ("ledger:678", "Array2's Col and Row, a size lost in a factory: not yours, a note."),
  (CBD + "3. Row 685: a library line, by the team's own TODO", "The trace of row 685 to the library's call at an unbounded T, the fix and what it changes under walk."),
  (CBD + "8. Sentences of the specification made false", "The revival box in future.tex that your patch makes false."),
  (CBD + "9. Defects, each with its home", "The corrected claim for row 685's close and the error-location row you file, NEW-L-1."),
  (CBD + "11. For the curator", "The two ways for row 685's record: the coordinator's call took (a)."),
  (CBP + "row-685-array-factories.patch", "The patch you start from: apply it after your tests, read it and own it."),
  ("doc:Specification/basic/trait-parameters.tex#Type Parameters", "An instance whose argument fails the parameter's bound is ill-formed: why the checker's refusal is right."),
  ("doc:Specification/appendices/future.tex#Functions and Overloading", "The revival box on Jan's pair and the factory, whose last clause you correct."),
  (CHG + "Overloading with static parameters", "The entry that records the box's revisions in its Change (:2398-2401) and Original text (:2559-2561): you record yours there; its Effect is rung O's."),
  ("doc:Specification/basic/expressions/comprehensions.tex#Comprehensions", "A map comprehension whose key repeats with a different value throws KeyOverlap (:76-80): what IntMap's comprehensions meet once UPLUS takes addNew."),
  ("code:Library/FortressLibrary.fss#static argument alone, with no element in hand..multiplicativeIdentity[", "The precedent: the identities built per number type by a typecase over the witness, each through cast."),
  ("code:Library/IntMap.fss#opr UPLUS(self, other: SingletonIM..opr UPLUS(self, other: NodeIM", "Row 704's site and the node-to-node UPLUS through nodeNode, which reaches it."),
  ("code:Library/IntMap.fss#private fromCC[", "fromCC builds every IntMap comprehension by UPLUS: why a repeated key now throws."),
  ("code:Library/Map.fss#lt(kv1, kv2): Boolean =..fromSortedArrayFragment", "Map's comprehension sorts its pairs and throws KeyOverlap on any repeated key: the library's precedent for IntMap's throw."),
  ("code:ProjectFortress/tests/IntMapUplusSingleton.fss#run(): () = do", "The revival test that pins today's two values: its lines 24 and 25 change."),
]
L_CHECKS = [
  "P-27",
  "ledger:685", "ledger:704",
  "doc:Specification/basic/expressions/comprehensions.tex#Comprehensions",
  CBD + "3. Row 685: a library line, by the team's own TODO",
  CBD + "9. Defects, each with its home",
  "code:Library/FortressLibrary.fss#static argument alone, with no element in hand..multiplicativeIdentity[",
  "code:Library/IntMap.fss#opr UPLUS(self, other: SingletonIM..opr UPLUS(self, other: NodeIM",
]

O_BRIEFING = [
  ("P-147", "The decision you build for rows 708 and 709, word for word: coverage defines an inherited abstract method, comprises clauses read, walk agreeing with the checker."),
  ("P-26", "The type group's late word: the 2011 and 2019 papers state the No Duplicates Rule on the non-strict relation, which refuses row 707's pairs."),
  ("P-60", "A comprises clause is read at the level of values: a cover of a tuple splits each position through its clause."),
  ("P-95", "Why the Appendix I sentences change: each Effect says what the implementations do."),
  ("P-96", "The form of your text changes: each entry amended in place."),
  ("F-145", "What walk refuses at load, its unsettled search that does not refuse (row 708) and the checker's miss of row 709: the fact your rung makes false."),
  ("F-27", "Walk's own cover through comprises clauses, every combination of parts below a declaration: the shape row 709's split follows."),
  ("ledger:707", "Your first row: the duplicate check that needs equal self positions, and the code generator's stop."),
  ("ledger:708", "Your walk row: the coverage search that does not settle and does not refuse."),
  ("ledger:709", "Your second checker row: a tuple of parameter types compared with each covering domain alone."),
  ("ledger:574", "Row 707's sibling, fixed by climb batch 10's rung C: the precedent repair in the same checker."),
  ("ledger:584", "The checker checks no overloading of a symbolic operator, so FlatString's opr || pair at two self positions is not reached; not yours, and left so."),
  ("ledger:696", "The No Duplicates Rule restated on the non-strict relation, with its compile test of dup's pair."),
  ("ledger:665", "Generic objects stay unchecked by walk's coverage: not yours, its expected failures keep their verdicts."),
  (WCV + "6. What walk now refuses and accepts", "The measurement on record: no search failed to settle in the suite, the demos or the specification's examples."),
  (WCV + "11. Decisions", "Decision 2, not to refuse where the search does not settle, which the coordinator's call reverses."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The No Duplicates Rule as restated, which row 707's pairs break."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "The coverage sentence and its callout: what both paths then do."),
  (CHG + "Overloading with static parameters", "The entry whose Effect names row 707 as the checker's departure (:2497-2502): you amend it."),
  (CHG + "Traits with comprises clauses read at the level of values", "The entry whose Effect names rows 708 and 709 (:2876-2888): you amend both sentences."),
  ("code:" + TC + "/OverloadingChecker.scala#private def checkOverloading(", "The duplicate check, its self-position condition at :441: row 707's site."),
  ("code:" + TC + "/AbstractMethodChecker.scala#private def checkObjectDeclaration(", "The compiled checker's coverage: the domain against the union of covering domains at :107, row 709's site."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#def comprisedTypes(", "How the checker reads a trait's comprises clause: read for your split, not edited, since TypeAnalyzer is rung C's."),
  ("code:" + EV + "/values/Constructor.java#private static boolean definedBelow(", "Walk's coverage check: row 708's three returns where the search does not settle, and the combination search row 709 follows."),
  ("code:" + EV + "/values/Constructor.java#private static List<Set<FType>> coverParts(", "Walk's split of a type into parts through comprises clauses, null where it does not settle."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private boolean overlapCoveredBy(", "Walk's Meet Rule cover, which refuses where its search does not settle: the precedent for row 708."),
]
O_CHECKS = [
  "P-147", "P-26", "P-60",
  "ledger:707", "ledger:708", "ledger:709", "ledger:584",
  (CHG + "Traits with comprises clauses read at the level of values"),
  "code:" + TC + "/OverloadingChecker.scala#private def checkOverloading(",
  "code:" + TC + "/AbstractMethodChecker.scala#private def checkObjectDeclaration(",
  "code:" + EV + "/values/Constructor.java#private static boolean definedBelow(",
]

IDS = ('B', 'C', 'L', 'O')
LISTS = {
  'B': ([k for k, _ in B_BRIEFING], B_CHECKS),
  'C': ([k for k, _ in C_BRIEFING], C_CHECKS),
  'L': ([k for k, _ in L_BRIEFING], L_CHECKS),
  'O': ([k for k, _ in O_BRIEFING], O_CHECKS),
}
REASONS = {'B': B_BRIEFING, 'C': C_BRIEFING, 'L': L_BRIEFING, 'O': O_BRIEFING}


def reason_problems(rid):
    out = []
    for k, r in REASONS[rid]:
        if not r or not r.strip():
            out.append((k, 'no reason'))
        elif '\n' in r or '`' in r or any(ord(c) > 127 for c in r):
            out.append((k, 'a reason is one ASCII line with no backtick'))
        elif not r.endswith('.') or len(r) > 240:
            out.append((k, 'a reason ends with a full stop and is at most 240 characters'))
    return out


if __name__ == '__main__':
    import subprocess, re, sys, os
    root = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
    bad = 0
    for rid, (b, c) in LISTS.items():
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            if len(set(keys)) != len(keys):
                print('   PROBLEM duplicate key in', rid, name); bad += 1
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            if badk:
                print('   PROBLEM keys the script refuses', rid, name, badk); bad += 1
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                if stray:
                    print('   PROBLEM checks keys not in the briefing', rid, stray); bad += 1
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys, capture_output=True, text=True, cwd=root)
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'NOT FOUND' in l or 'no match' in l.lower() or 'no line of' in l or 'no such file' in l]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
