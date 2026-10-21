#  The briefing and checks lists of climb batch 18's three rungs, W, X and K
# (CLIMB-BATCH-18.md, section 3), in batch 17's form (explorations/compile-ladder/plan-17/manifest/lists17.py) for
# the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds
# what the rung's section cites, the decisions, the ledger rows, the specification's sections, the notes and the
# code it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill
# carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a
# repair round and a judge. The record's section 5, "The briefings", holds the same keys.
# `python3 -B lists18.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'
TC = SC + '/typechecker'

CHG = "doc:Specification/appendices/changes.tex#"
TGM = "doc:explorations/perf-probes/trait-generic-method-inference/REPORT.md#"
WC = "doc:explorations/perf-probes/where-clauses/REPORT.md#"
TCJ = "doc:explorations/reviews/tuple-comparisons-judgement.md#"
WHERE = "doc:Specification/basic/trait-parameters.tex#Where Clauses"

W_BRIEFING = [
  ("P-46", "Both paths infer static arguments with coercion and the same promotion: the rule row 766 breaks for a method that a trait declares."),
  ("P-48", "A type parameter that the arguments do not fix takes its bound, never Bottom: the trait's make case, which gives Empty of BOTTOM today."),
  ("P-74", "The narrowest type both sides coerce into: why a ZZ32 and a ZZ64 give ZZ64, the ZZ32 converted."),
  ("P-45", "Walk reads a generic pair on its declared domains with no parameter pair required to exclude: the refusal message you change names the rule it removed."),
  ("F-253", "Walk's inference for a generic dotted method, with the exception of a trait's method that your fix removes."),
  ("F-252", "Walk's reading of a pair of functions with static parameters by the three rules: the refusals whose message you change."),
  ("F-155", "Walk's refusal of two declarations whose parameters do not exclude, and the message it gives."),
  ("ledger:766", "Your first row: a trait's generic dotted method instantiated without its bounds and coercions, quietly wrong where the base stopped."),
  ("ledger:765", "Your second row, repaired by the same change: an inherited generic functional method beside an object's own plain one."),
  ("ledger:772", "Not yours: the compiled path's counterpart, which waits for the switch-over."),
  ("ledger:539", "The Meet Rule's search that matches only some domains: refusals whose message now names the rule."),
  (TGM + "2. The cause", "Where walk reads a trait method's bounds and coercion targets, and why the member environment fails there: your first site."),
  (TGM + "3. The ways", "The ways weighed, A to H: you build A, the default; D reaches every reader of the environment, which the team kept apart."),
  (TGM + "4. The patch", "Way A's patch and the two lines measured one at a time: the line at 491 needed, the one at 875 left as it is."),
  (TGM + "5. Values", "The values your test asserts, before and after, beside the same methods in an object and as functions."),
  (TGM + "6. Tests", "The promoted tests, their runs on the base and on the patch, and the system suite: your before and after."),
  (TGM + "8. Sentences made false", "The sentences the fix makes false: walk's box and Appendix I, which you edit, and FACTS F-253."),
  ("doc:explorations/reviews/batch-17-review.md#Findings, most important first", "Finding 1, row 766 against P-46, P-48 and P-74, and finding 3, the stale message and the tests that pass on any refusal."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The rule your fix follows, and walk's revision box whose sentences on rows 765 and 766 it makes false."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The three rules by their names, which walk's refusal names after your change."),
  ("code:" + EV + "/EvaluatorBase.java#private static FType boundAtInstances(", "A static parameter's bound at its instances, read in the declaring environment: the patch's first line."),
  ("code:" + EV + "/EvaluatorBase.java#private static Simple_fcn inferWithCoercionOrFail(", "The inference with coercion, whose bounds and coercion targets are read in the trait's member environment today."),
  ("code:" + EV + "/values/GenericMethod.java#boolean isTraitMethod;..this.evaluationEnv = evaluationEnv;", "A trait's generic method's two environments, and the team's note that keeps them apart."),
  ("code:" + EV + "/values/OverloadedFunction.java#private void describeOverloadingFailure(", "The refusal that still names the rule P-45 removed: your second site."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private boolean validOnDeclaredDomains(", "Where a pair is read on its declared domains and refused without saying which rule failed."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private boolean genericPairValid(", "Two own generics read by the No Duplicates, Return Type and Meet Rules: where the rule that failed is known."),
  ("code:ProjectFortress/tests/XXXTraitGenericMethodInference.fss#trait Makes", "The expected failure you promote, to which the patch adds three assertions."),
]
W_CHECKS = [
  "P-46", "P-48", "P-45", "F-253",
  "ledger:766", "ledger:765",
  TGM + "2. The cause",
  TGM + "4. The patch",
  "doc:Specification/basic/inference.tex#The Static Arguments of a Call",
  "code:" + EV + "/EvaluatorBase.java#private static FType boundAtInstances(",
  "code:" + EV + "/values/OverloadedFunction.java#private void describeOverloadingFailure(",
]

X_BRIEFING = [
  ("P-151", "The decision your rung builds: a trait that extends another under a where condition is that type only where it holds, its members checked under it."),
  ("P-148", "The decision every checker change follows: the count stage timed before and after, then a second pass that keeps every result."),
  ("P-42", "An unbounded type parameter's bound is Any: lists of tuples, functions and () stay lists, and only their order becomes conditional."),
  ("P-27", "The library's own practice: LexicographicOrder's = is the body of the structural = you keep on List."),
  ("F-243", "The where-clause sites: twelve cleared in climb batch 17, the list comparisons' site left for conditional extension."),
  ("F-244", "The holes the shadows left, among them a member checked under the condition that stays callable where it fails: your new row."),
  ("F-251", "AnyList's clause live and opened at a call, rung A's reading in the subtype case you change, which you keep."),
  ("ledger:634", "Your row: the list comparisons over an element type with no bound, the site at FortressLibrary.fss:2063."),
  ("ledger:752", "Rung A's choice not to open a comprising trait reached as a parent, in the same subtype case."),
  ("ledger:748", "Rung K's row: a condition on the trait's parameter checked at a dotted call, which members scoped to your condition need."),
  ("ledger:701", "The code generator's half of where clauses, after the switch-over."),
  (WC + "B.3 Conditional extension", "The shadow you re-base, line by line, with its tests, its library lines and its hole."),
  (WC + "A.2.4 Row 634", "Why no library edit without new language clears the site."),
  (WC + "A.6 What the team left", "What the team left for conditional extension, and the smallest piece of language that clears the site."),
  (WC + "B.6 Decisions", "The probe's decisions: only clauses of constraints alone are conditional, and ZeroIndexed is written outside the condition."),
  (TCJ + "2. The ways, weighed", "Way 3 for lists, and the structural = that a list of pairs loses without it."),
  (TCJ + "3. The recommendation", "The rung's shape: the bound, the conditional entry, the structural =, and the partial order of lists left to the rung."),
  ("doc:explorations/reviews/open-asks-2026-10-16.md#Ask 1. A", "A primer on the clause, what walk does with it today, and walk's override check under it since climb batch 13."),
  (WHERE, "The where clauses' rules: the section your revision box joins, with the condition's meaning."),
  ("doc:Specification/basic/operators/opr-overview.tex#Comparisons Operators", "The text's sentence that lists compare lexicographically when their elements support the comparison."),
  (CHG + "Where-clause variables in extends clauses", "The entry your new Appendix I entry follows; a clause that binds a new variable keeps its reading."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#case (s:TraitType , t: TraitType) =>..case (s: ObjectExprType, t)", "The subtype case of a trait type, with rung A's reading of a parent that opens: where a conditional parent counts."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#def parents(t: TraitType)", "A type's parents, memoized: the reader that leaves a conditional parent out."),
  ("code:" + TC + "/staticenv/KindEnv.scala#object KindEnv extends StaticEnvCompanion", "Rung L's constraintBounds, which reads your conditions as bounds, and where you add withExtendsConditions."),
  ("code:" + TC + "/impls/Decls.scala#case t@STraitDecl(info,..case o@SObjectDecl(info,", "The trait and object declarations' checks, which check members with the conditions holding."),
  ("code:" + TC + "/TypeWellFormedChecker.scala#case STraitDecl(_,..case SObjectDecl(_,", "The well-formedness of a declaration's extends clause, checked with the conditions holding; the trait-type case after them is rung K's."),
  ("code:Library/FortressLibrary.fss#trait LexicographicOrder", "LexicographicOrder, its CMP over E at the site and its =: the bound you add."),
  ("code:Library/List.fss#extends { AnyList, LexicographicOrder", "List's extends line, which takes the conditional entry, and where the structural = goes."),
  ("code:ProjectFortress/tests/NumberOrderListDeclarations.fss#lists(): () = do", "A list of pairs compared by =, which your structural = keeps where pairs are not ordered."),
]
X_CHECKS = [
  "P-151", "P-148", "F-243", "F-244",
  "ledger:634",
  WC + "B.3 Conditional extension",
  TCJ + "3. The recommendation",
  WHERE,
  "code:" + SC + "/types/TypeAnalyzer.scala#case (s:TraitType , t: TraitType) =>..case (s: ObjectExprType, t)",
  "code:" + SC + "/types/TypeAnalyzer.scala#def parents(t: TraitType)",
  "code:Library/FortressLibrary.fss#trait LexicographicOrder",
]

K_BRIEFING = [
  ("P-151", "The where forms built: a method's condition bounds its static parameters; your rows are the checks left beside them."),
  ("P-148", "The decision every checker change follows: the count stage timed before and after, then a second pass that keeps every result."),
  ("F-250", "The checker reads a where constraint as a bound, with its four holes, three of them your rows."),
  ("F-251", "A type where-clause variable opened at a call, rung A's: the opening rows 753 and 771 bound."),
  ("F-244", "The holes the shadows left: a method's condition on its trait's parameter is not checked at a dotted call."),
  ("ledger:748", "Your first row: a method's condition on its trait's parameter, not checked at a dotted call."),
  ("ledger:749", "Your second row: a constraint whose bound names a where-clause variable refuses every call."),
  ("ledger:750", "Your third row: a trait's or object's own where constraint, not checked where its type is used."),
  ("ledger:753", "Your fourth row: the extender check reads a listed type at every type of a bounded variable."),
  ("ledger:771", "Your fifth row, after the fourth: an opened type bounded by its binding alone, not by the clause's constraint."),
  ("ledger:470", "Not yours: a static argument written at a top-level call is not checked against a folded bound."),
  ("ledger:754", "Not yours: walk's sibling of row 753 at load."),
  (WC + "B.2 A", "The method-condition shadow and its hole at a dotted call, with the probe's test of it."),
  (WHERE, "The where clauses' rules: a constraint holds for the declaration and bounds the variable it names."),
  ("doc:Specification/appendices/calculi/where/static.tex#Static Semantics", "The team's where calculus, whose invocation rule checks a method's bounds at a dotted call."),
  (CHG + "The traits that extend a closed trait", "The entry whose clauses on rows 771 and 753 your rung makes false: you edit them."),
  ("code:" + SC + "/useful/STypesUtil.scala#def makeArrowFromFunctional(f: Functional, lifted: Boolean, omitSelf: Boolean", "The arrow and its fold of a constraint on the declaration's own parameter: rows 748 and 749."),
  ("code:" + TC + "/impls/Functionals.scala#def getCandidatesForMethod(", "A dotted call's candidates, instantiated at the receiver: where row 748's check goes."),
  ("code:" + TC + "/TypeWellFormedChecker.scala#case t@STraitType(_, name, sargs, _) =>", "A trait type's static arguments checked against their bounds only: row 750's site."),
  ("code:" + TC + "/TypeHierarchyChecker.scala#def checkDeclComprises(", "The extender check of a comprises clause, its where-clause variables read without their bounds: row 753's site."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#def whereSizes(..def parents(", "Where-clause variables as static parameters, and their opening at a call: row 771's site."),
  ("doc:explorations/compile-ladder/rung-checker-abstract-callsite/JUDGE.md#5. What lands unmeasured", "The residual case of a nested call that climb batch 16's judge left for the next rung editing TypeWellFormedChecker.scala: you reproduce it once."),
]
K_CHECKS = [
  "P-151", "P-148", "F-250",
  "ledger:748", "ledger:749", "ledger:750", "ledger:753", "ledger:771",
  WHERE,
  "code:" + SC + "/useful/STypesUtil.scala#def makeArrowFromFunctional(f: Functional, lifted: Boolean, omitSelf: Boolean",
  "code:" + TC + "/impls/Functionals.scala#def getCandidatesForMethod(",
  "code:" + TC + "/TypeHierarchyChecker.scala#def checkDeclComprises(",
]

IDS = ('W', 'X', 'K')
LISTS = {
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
  'X': ([k for k, _ in X_BRIEFING], X_CHECKS),
  'K': ([k for k, _ in K_BRIEFING], K_CHECKS),
}
REASONS = {'W': W_BRIEFING, 'X': X_BRIEFING, 'K': K_BRIEFING}


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
