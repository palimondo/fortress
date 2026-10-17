#  The briefing and checks lists of climb batch 17's five rungs, W, L, A, C and G
# (CLIMB-BATCH-17.md, section 3), in batch 16's form (explorations/compile-ladder/plan-16/manifest/lists16.py) for
# the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds
# what the rung's section cites, the decisions, the ledger rows, the specification's sections, the notes and the
# code it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill
# carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a
# repair round and a judge. The record's section 5, "The briefings", holds the same keys and reasons word for word.
# `python3 lists17.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'
TC = SC + '/typechecker'

CHG = "doc:Specification/appendices/changes.tex#"
WGS = "doc:explorations/perf-probes/walk-generic-static/REPORT.md#"
GD = "doc:explorations/perf-probes/generic-distribute/REPORT.md#"
WC = "doc:explorations/perf-probes/where-clauses/REPORT.md#"
W16 = "doc:explorations/compile-ladder/rung-walk-overload-if/REPORT.md#"

L_BRIEFING = [
  ("P-151", "The decision your rung builds: the method where conditions on the fusion pairs, the fusion kept, the team's generic distribute measured for its two errors."),
  ("P-148", "The decision every checker change follows: your KindEnv and STypesUtil edits are timed before and after, then a second pass keeps every result."),
  ("P-27", "The library's own practice is the standard: embiggen takes the typed shape of MapReduceReduction, the library's own."),
  ("F-242", "The six sites of the fusion pairs: four unmet bounds a method condition clears, two results only the generic distribute over its own K clears."),
  ("F-248", "Under walk the generic distribute keeps every fused answer but stops a nested reduction with no fused pair until rung W lands: why you land only with W."),
  ("F-243", "The where-clause sites and the identities' cast, which clears their two sites and changes no walk value."),
  ("F-244", "The holes the shadow left: a method's condition on its trait's parameter is not checked at a dotted call; your new row records it."),
  ("F-53", "The count 39 and the distance 49 at the last landed gate, and the one site that moves with no edit of its own, :130."),
  ("ledger:433", "Your first row: the fusion pairs' four unmet bounds and two return types, cleared by L4 of the generic-distribute probe."),
  ("ledger:677", "Your second row: the checker reads no where constraint as a bound; the shadow you build reads it, and the reproducer then stops in the code generator."),
  ("ledger:436", "Your third row's sites: the identities' numeral fallback; the cast clears the two distance sites, not the row's own defect."),
  ("ledger:631", "Your fourth row: embiggen unwraps an Any to T; the typed form and the callers whose declared types it retypes."),
  ("ledger:701", "The code generator's half of where clauses, after the switch-over: where row 677's reproducer goes once your checker part lands."),
  ("ledger:737", "The checker's choice of an api declaration by identity-hash order: why :130 moves with your shadow, as it did in the probe."),
  (GD + "1. In short", "The measurement your library change rests on: L4 clears the six sites, 49 to 42, and what walk keeps and loses."),
  (GD + "2. What I built", "The checker shadow, the team's lines and the variants L0 to L4, each patch quoted: L4 and the shadow are your starting point."),
  (GD + "3. The checker on the bound-free shape", "Why only the result over K passes the Return Type Rule over the generic's instances, and why the Any method cannot stay beside it."),
  (GD + "4. The distance stage, per variant", "The distance per variant, site by site: your before and after for row 433."),
  (GD + "5. Walk", "Walk's answers with L4: the fused pairs kept, the nested reductions that stop without rung W's fix."),
  (GD + "9. Decisions", "The probe's decisions: the result over K by Emoto's comment, and leftDistribute and rightDistribute given the same K."),
  (WC + "B.2 A", "The method-condition part of the where shadow, its tests and its hole at a dotted call: the checker part you build."),
  (WC + "A.2.3 Row 436", "The identities' cast and what it clears."),
  (WGS + "8. Part A alone", "LibraryOverloadFamilies fails at its line 37 with your library and without rung W's fix: the one red line your branch shows alone."),
  ("doc:Specification/basic/trait-parameters.tex#Where Clauses", "The where clauses' rules: a constraint bounds the variable it names inside the declaration."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The Return Type Rule read over every instance of a generic declaration: why the result over K passes and the Any method fails."),
  ("code:Library/FortressLibrary.fss#If this reduction left-distributes over r..a hack to avoid the error of overloaded methods", "ActualReduction's three methods and the team's commented generic: the lines you change."),
  ("code:Library/FortressLibrary.fss#object MaxSumReductionPair..opr SUM", "The fusion pairs and SumReduction's two distribute overloads, which take the method conditions."),
  ("code:Library/FortressLibrary.fss#trait DistributesOver..object MaxSumReductionPair", "The identities' numeral fallbacks, which take the cast."),
  ("code:Library/FortressLibrary.fss#object MIMapReduceReduction..Helpers for maps and cross products", "MIMapReduceReduction and embiggen, which take the typed shape of MapReduceReduction just above them."),
  ("code:Library/Generator2.fss#checking distributivity of r over q..One solution of the problem", "The call r.distribute(q) that walk infers once rung W lands, and the team's 2009 notes on it: left as it is."),
  ("code:" + TC + "/staticenv/KindEnv.scala#def extend(node: Node, where: Option[WhereClause]): KindEnv = {..def getType(", "The two extend methods with a where clause, where the shadow adds the constraints' bounds."),
  ("code:" + SC + "/useful/STypesUtil.scala#def makeArrowFromFunctional(f: Functional, lifted: Boolean, omitSelf: Boolean", "The arrow of a declaration, where the shadow folds a constraint on its own static parameter into its bound."),
  ("code:ProjectFortress/tests/LibraryOverloadFamilies.fss#product distributes over sum", "The gated test that SumReduction's distribute over ProdReduction is no pair: red on your branch alone, green with rung W."),
  ("doc:explorations/compile-ladder/rung-generator-slips/REPORT.md#8. The sites left", "Row 631's typed form and its callers, as climb batch 10 found them."),
]
L_CHECKS = [
  "P-151", "P-148", "F-242", "F-248",
  "ledger:433", "ledger:677",
  GD + "4. The distance stage, per variant",
  WC + "B.2 A",
  WGS + "8. Part A alone",
  "code:" + TC + "/staticenv/KindEnv.scala#def extend(node: Node, where: Option[WhereClause]): KindEnv = {..def getType(",
  "code:" + SC + "/useful/STypesUtil.scala#def makeArrowFromFunctional(f: Functional, lifted: Boolean, omitSelf: Boolean",
]

W_BRIEFING = [
  ("P-45", "Walk dispatches on declared domains and infers a generic declaration's static arguments at dispatch: the rule your fix gives generic dotted methods."),
  ("F-248", "Why your fix comes first: rung L's generic distribute stops a nested reduction under walk without it; your nested-reduction test guards the pair."),
  ("ledger:21", "Your row: a generic method's own static arguments are not inferred under walk, with the cases its notes list."),
  ("ledger:744", "Not yours: explicit static arguments on an overloaded receiver stop in typeApply; its expected behaviour stays as it is."),
  ("ledger:510", "The function path's twin of the expected-type case your fix leaves: the home of XXXExpectedTypeFixRungT's case."),
  ("ledger:723", "The functional-method sibling of the generic method beside a plain one that stops at load, a case your fix leaves."),
  ("ledger:307", "Bool static parameters: the checker refuses to infer them and walk does not unify them; the sibling of the bool defect you file."),
  ("ledger:567", "A fixed sibling of the trait-bound defect you file: walk refused a generic functional method of a trait, 'Missing type R'."),
  ("ledger:364", "The caveat of your fix: a lone T taken from a ZZ32 argument becomes Int, this row's case, not yours."),
  (WGS + "1. On base", "The cases that fail and pass on the base, each with its message: your failing runs."),
  (WGS + "2. The smallest fix", "Parts A and B of the fix, what each changes and why part A alone is not enough."),
  (WGS + "3. The nested cases", "The nested reductions with the fix and rung L's library: 11 and 3, the fused pairs kept."),
  (WGS + "4. Which cases of entry 21", "What the fix covers and what it leaves, with a rough size for each case left."),
  (WGS + "5. Walk tests and microGPT", "The 66 walk tests and the whole system suite with the fix: the before and after of your suite run."),
  (WGS + "6. Defects found", "The two defects new on the base, a bool static parameter and a bound from the trait's parameter: you file their rows and expected failures."),
  (WGS + "8. Part A alone", "Part A alone leaves every receiver whose generic sits in an overloaded method set failing: why part B is in your rung."),
  (GD + "5. Walk", "The nested reductions and the fused pairs under walk with the library change, and the team's diagnosis of 2009."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The rule your fix follows, and walk's revision box whose sentence on generic dotted methods (row 21) it makes false."),
  ("code:" + EV + "/values/DottedMethodApplication.java#public FValue applyInnerPossiblyGeneric(", "Part A's site: a dotted call writing no static argument applies the symbolic instance an object holds."),
  ("code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion(", "Part B's first site: an overloaded set's choice with coercion, which infers only a generic declaration today."),
  ("code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchInternal(", "Part B's second site: the choice without coercion and its re-instantiation of the best match."),
  ("code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction(", "The function path's inference, which part A calls in the generic method's evaluation environment."),
  ("code:ProjectFortress/tests/XXXMethodStaticArgRungT.fss#object O..run(): () = do", "The expected failure your fix promotes, renamed by topic."),
  ("code:Library/Generator2.fss#checking distributivity of r over q..One solution of the problem", "The library call that meets your fix once rung L lands, and the team's notes of 2009 on the same gap."),
]
W_CHECKS = [
  "P-45", "F-248", "ledger:21",
  WGS + "2. The smallest fix",
  WGS + "8. Part A alone",
  "doc:Specification/basic/inference.tex#The Static Arguments of a Call",
  "code:" + EV + "/values/DottedMethodApplication.java#public FValue applyInnerPossiblyGeneric(",
  "code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchInternal(",
]

A_BRIEFING = [
  ("P-151", "The decision your rung builds: the team's comment on AnyList's comprises clause becomes live, and the rest of AnyList moves into List."),
  ("P-148", "The decision every checker change follows: the count stage timed before and after, then a second pass that keeps every result."),
  ("F-243", "The where-clause sites: moving AnyList's bodies into List clears row 636's four with no walk value moved."),
  ("F-244", "The opened type variable passed the escape, two-value and Amin and Tate tests; no hole was measured in this form."),
  ("ledger:636", "Your row: AnyList's four sites and the team's own comment, Not yet: comprises List[E] where [E]."),
  ("ledger:682", "The opening of a where-clause size at a call, which the checker already builds for sizes: the mechanism you widen to types."),
  ("ledger:701", "The code generator's half of where clauses, after the switch-over: it does not compile a trait with a where clause."),
  (WC + "B.0 In short", "What each narrow form cleared and what it left, with the tests run: your before and after."),
  (WC + "B.1 A type variable opened", "The opened type variable as a shadow, line by line, with its tests: your starting point, built on the base before climb batch 16."),
  (WC + "A.2.2 Row 636", "AnyList's bodies moved where the element type is known: the rest of AnyList, beside the comprises clause."),
  (WC + "B.6 Decisions", "The probe's decisions on scope, among them that a where-bound type variable is not in scope in the extends clause."),
  ("doc:Specification/basic/trait-parameters.tex#Where Clauses", "The where clauses' rules and the comprises clause at a where-clause variable."),
  (CHG + "The traits that extend a closed trait", "The entry whose sentence that the checker does not yet open a type where-clause variable (row 636) your rung makes false: you edit it."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#def whereSizes(..def parents(", "Where-clause sizes and their opening at a call: the code the shadow widens to type variables."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#case (s: TraitType, t: TraitType) if opensSizes(s) =>", "The subtype case of a trait that opens: where the shadow keeps a comprising trait reached as a parent from opening twice."),
  ("code:" + SRC + "/compiler/disambiguator/TypeDisambiguator.java#public Node forTraitDecl(final TraitDecl that) {", "The disambiguator's trait case, where the shadow puts a where-bound type variable in scope but for the extends clause."),
  ("code:" + EV + "/BuildEnvironments.java#private static EvalType processWhereClauses(", "Walk's where clauses at load, where the shadow binds a type variable as a symbolic type so that walk loads the clause."),
  ("code:" + TC + "/staticenv/KindEnv.scala#object KindEnv extends StaticEnvCompanion", "The kind environment's companion, where the shadow keeps the opened names; rung L adds another member there."),
  ("code:Library/List.fss#Lists of some item type..(** %List%.", "AnyList, its commented clause and its three operations: the lines you change."),
]
A_CHECKS = [
  "P-151", "P-148", "ledger:636",
  WC + "B.1 A type variable opened",
  WC + "A.2.2 Row 636",
  CHG + "The traits that extend a closed trait",
  "code:" + SC + "/types/TypeAnalyzer.scala#def whereSizes(..def parents(",
  "code:Library/List.fss#Lists of some item type..(** %List%.",
]

C_BRIEFING = [
  ("P-148", "The decision every checker change follows: the count stage timed before and after, then a second pass that keeps every result."),
  ("P-149", "The curator's refusal of an abstract method inherited beside a sibling's body: its reasons reach row 739's top-level set."),
  ("P-26", "The type group's late word: the Meet Rule for functions as the papers state it."),
  ("F-53", "The count 39 and the distance 49, and the one site, :130, that moves with no edit of its own until row 737 is repaired."),
  ("F-232", "The checker's output and identity hashes: since climb batch 16 only row 737 still depends on them."),
  ("F-42", "An earlier error of a unit hides its overloading checks: why the count stage may not see row 739's change and the distance stage can."),
  ("ledger:737", "Your first row: a component function that leaves out its return type takes the first api declaration of its name in identity-hash order."),
  ("ledger:738", "Your second row: the per-provider message calls an object a trait; one line, and the tests that pin the word."),
  ("ledger:739", "Your third row: the top-level set reads no abstract functional method of a component's own trait."),
  ("ledger:681", "Your fourth row: a static argument written with a static parameter in it is not inferred; Formula.isNatTerm."),
  ("ledger:727", "Row 739's sibling in the per-provider set, repaired in climb batch 16: the precedent."),
  ("ledger:683", "Row 681's neighbour: two different static parameters counted as different sizes; not yours."),
  ("doc:explorations/reviews/batch-16-review.md#1. The count 39", "Row 737's mechanism read four ways, and why repairing it takes :130 out for good."),
  ("doc:Specification/basic/components/type-inference.tex#Type Inference for Components", "The rule row 737's repair follows: a left-out return type is that of the api declaration of the function's own parameter types."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The Meet Rule for functions, which judges a functional method beside a top-level function: row 739's rule."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "Row 681's rule: a static argument is inferred where the identity of types makes the call applicable."),
  (CHG + "When two sizes are the same", "The entry whose sentence on row 681 your repair makes false: you edit it."),
  ("doc:explorations/compile-ladder/rung-checker-abstract-callsite/SKEPTIC.md#6. My programs", "Row 739's probes: the abstract shape that passes the top-level set and its refused concrete twin."),
  ("code:" + TC + "/ApiTypeExtractor.scala#private def isExported(f: FnDecl", "Row 737's site: the first declaration of the name, with no parameter types compared."),
  ("code:" + TC + "/OverloadingChecker.scala#private def toFunctionArrows(", "Row 739's site: the top-level set's filter onlyConcrete."),
  ("code:" + TC + "/OverloadingChecker.scala#private def toFunctionalMethodArrows(", "The per-provider set as rung K of climb batch 16 left it: the precedent for row 739."),
  ("code:" + TC + "/OverloadingChecker.scala#val traitKindAndName", "Row 738's line: the kind word tests the compilation unit where the trait or object is meant."),
  ("code:" + TC + "/Formula.scala#def isNatTerm(", "Row 681's site: a size inference variable binds a static parameter or a numeral only."),
]
C_CHECKS = [
  "P-148", "P-149",
  "ledger:737", "ledger:738", "ledger:739", "ledger:681",
  "doc:Specification/basic/components/type-inference.tex#Type Inference for Components",
  "code:" + TC + "/ApiTypeExtractor.scala#private def isExported(f: FnDecl",
  "code:" + TC + "/OverloadingChecker.scala#private def toFunctionArrows(",
  "code:" + TC + "/Formula.scala#def isNatTerm(",
]

G_BRIEFING = [
  ("P-45", "The decision your rung builds: walk's load check reads every pair of generic declarations on their declared domains by the checker's rules (row 159)."),
  ("P-152", "Not yours: exclusion read over the whole parameter type, which changes the same check after a probe; your rung leaves rows 740 and 741 as they are."),
  ("P-26", "The type group's late word: the overloading rules as the papers state them."),
  ("P-124", "The specification's examples join the gate at zero red: why you run testSpecData once after your change of walk's checks."),
  ("F-238", "Climb batch 16's reading of a withdrawn exclusion, on the declared domains and each over its own instances: the reading you widen to every pair."),
  ("F-145", "What walk refuses at load today and why: the checks your change extends."),
  ("F-155", "Walk's refusal of two declarations whose parameters do not exclude, and its message: what your change lifts for generic pairs."),
  ("ledger:159", "Your first row: walk refuses two generic declarations unless a parameter pair excludes, microGPT's own pair of opr times among them."),
  ("ledger:742", "Your second row: walk loads two generic declarations whose declared domains are equal."),
  ("ledger:549", "Your third row: walk loads a generic declaration beside a plain one at its bound, the same mechanism as row 742."),
  ("ledger:740", "Not yours: a pair that excludes only together, P-152's; its expected failure keeps its verdict."),
  ("ledger:697", "Not yours: the object-type shortcut in the same class, which waits for rung L's library to land."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The rules for declarations with static parameters, and the sentence on row 159 your change makes half false: you edit it."),
  (CHG + "Overloading with static parameters", "The entry whose clauses on rows 159, 549 and 742 your change makes false: you edit them."),
  (W16 + "Row 373: two generic", "How climb batch 16 read a withdrawn pair on its declared domains, each over its own instances: the code you extend."),
  ("doc:explorations/compile-ladder/climb-batch-16/JUDGE-review.md#6. Left as it is", "The two source comments in the declarations you change, to be corrected to F-238's reading."),
  ("code:" + EV + "/values/OverloadedFunction.java#public static class OverloadComparisonResult {", "Walk's pair analysis at load: the exclusion loop and the generic pair's limit, your site; the object-type shortcut is row 697's."),
  ("code:" + EV + "/values/OverloadedFunction.java#public boolean overloadOk()", "The verdict that asks two generic declarations for an excluding pair: row 159's limit."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private boolean validOnDeclaredDomains(", "Where a pair is read on its declared domains today, only when its exclusion was withdrawn."),
]
G_CHECKS = [
  "P-45", "P-152",
  "ledger:159", "ledger:742", "ledger:549",
  "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters",
  "code:" + EV + "/values/OverloadedFunction.java#public static class OverloadComparisonResult {",
  "code:" + EV + "/values/OverloadedFunction.java#static private boolean validOnDeclaredDomains(",
]

IDS = ('W', 'L', 'A', 'C', 'G')
LISTS = {
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
  'L': ([k for k, _ in L_BRIEFING], L_CHECKS),
  'A': ([k for k, _ in A_BRIEFING], A_CHECKS),
  'C': ([k for k, _ in C_BRIEFING], C_CHECKS),
  'G': ([k for k, _ in G_BRIEFING], G_CHECKS),
}
REASONS = {'W': W_BRIEFING, 'L': L_BRIEFING, 'A': A_BRIEFING, 'C': C_BRIEFING, 'G': G_BRIEFING}


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
    root = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
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
