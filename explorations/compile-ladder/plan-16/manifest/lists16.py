# The briefing and checks lists of climb batch 16's four rungs, S, H, K and W (CLIMB-BATCH-16.md, section 3), in
# batch 15's form (explorations/compile-ladder/plan-15/manifest/lists15.py) for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on,
# and no process position or harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS
# and FACTS entries are keyed by their numbers; P-148, the decision the three checker rungs build, prints word for
# word at the head of their briefings. No probe was taken for this batch: rungs S and H start from the checker-speed
# probe of climb batch 15b (explorations/perf-probes/checker-speed-2/), K and W from their ledger rows and the
# notes that traced them. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is there
# and what the rung does with it. gen16.py renders the lines at the end of each rung worker's brief, in the order
# of the briefing. A checks list is a sub-list of its briefing's keys, read by the skeptic, a repair round and a
# judge. `python3 lists16.py` checks every key with facts-extract.sh --check (each must match exactly one place)
# and every reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'
TC = SC + '/typechecker'

CHG = "doc:Specification/appendices/changes.tex#"
CS2 = "doc:explorations/perf-probes/checker-speed-2/REPORT.md#"
CS2S = "doc:explorations/perf-probes/checker-speed-2/SKEPTIC.md#"
CS1 = "doc:explorations/perf-probes/checker-speed/REPORT.md#"
CBD = "doc:explorations/perf-probes/checker-bound-defects/REPORT.md#"
POPL = "doc:explorations/reviews/popl2019-examples.md#"
ROC = "doc:explorations/compile-ladder/rung-overloading-checker/"

S_BRIEFING = [
  ("P-148", "The decision your rung builds, word for word: the checker's results kept the same, its time measured before and after, your skeptic checking both."),
  ("F-232", "The checker's output moves with the JVM's identity-hash sequence: why an order, or row 488's site, can move with no answer of yours wrong."),
  ("F-53", "The count, 39, and the distance, 49, at the last landed gate, and the 2 to 4 errors an unrelated edit can move: your tables' comparands."),
  ("ledger:688", "The ground memo that shares context-free subtype and exclusion answers across analyzers: the precedent for a shared memo of normalized meets."),
  ("ledger:730", "The walker split and the methods still over HotSpot's limit: the list your guard's allow-list starts from."),
  ("ledger:488", "The site at :130 that moves with what the checker queried earlier: read a move there through your audit, not as a result your change made."),
  (CS2 + "2.1 The phases", "Where the count stage's time goes by phase: the apis' overloading checks and the component's typeCheck."),
  (CS2 + "2.3 What is asked again", "The profile after the walker split: Formula.reduce, TypeAnalyzer.meet and normConjunct's pair test hold about 95 percent; your starting point."),
  (CS2 + "7. The audit", "How a change was audited branch by branch on one full run: the form of the audit your memo needs."),
  (CS2 + "11. Decisions, findings, questions", "Q2 and its two ways, and the commands worked out: JFR read without the dump, and the scan for methods over the limit."),
  (CS2S + "5. What else the landing must carry", "The methods over or near the limit after the split, each with its size and what runs it: your guard's list."),
  (CS1 + "6. The fix", "Row 688's ground memo: what it keys, why an answer that read no context can be shared, and how it stays exact."),
  ("code:" + TC + "/TraitTable.scala#private final val cacheGround..def ground(", "The ground memo itself, shared by every analyzer over one trait table: the shape a shared memo of meets would take."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#private val normalizeVarTypeMemo..protected def pNorm(", "The per-analyzer normalize memos, and a hit on a key that read the context counted as a read: what a shared memo must keep."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#protected def normConjunct(", "The conjunct step whose pair test at :721 holds most of the time: read it before you choose where to reuse answers."),
  ("code:" + TC + "/Formula.scala#def and(cs: Iterable[CFormula])..def and(c1: CFormula, c2: CFormula)", "Formula.and's fold, which reduces after every step: the second way of Q2."),
  ("code:" + TC + "/Formula.scala#def reduce(c: CFormula)", "The reduction that simplifies each variable's bounds by a meet and a join on every step of the fold."),
  ("code:" + SC + "/nodes/WalkerJUTest.java#public void testEveryMethodCompilable", "The walker's size test, read with java.lang.classfile: the precedent for the whole build's guard."),
]
S_CHECKS = [
  "P-148", "F-232", "ledger:688",
  CS2 + "2.3 What is asked again",
  CS2 + "7. The audit",
  "code:" + TC + "/TraitTable.scala#private final val cacheGround..def ground(",
  "code:" + SC + "/types/TypeAnalyzer.scala#protected def normConjunct(",
  "code:" + TC + "/Formula.scala#def and(cs: Iterable[CFormula])..def and(c1: CFormula, c2: CFormula)",
]

H_BRIEFING = [
  ("F-232", "The fact your rung makes false: every AST node's hash starts from its class's identity hash, so the checker's output moves with the hash sequence."),
  ("P-148", "The decision every checker change follows, word for word: the time before and after, then a pass that keeps the results."),
  ("F-53", "The 2 to 4 errors an unrelated edit can move, which your change is to stop moving: your tables' comparands."),
  ("F-108", "Walk's ambiguity message in an order that varies from run to run: walk's own hashes, row 430, not yours; read it to tell the two apart."),
  ("ledger:488", "The site at :130 whose moves are unexplained, F-232 its lead: note it or close it from your runs."),
  (CS2 + "9. Row 488: the checker's output depends on identity hashes", "The H runs: one extra identity hash reorders the api checks and prints three unions the other way; the measure of your change."),
  (CS2 + "6. Measurements", "How the probe compared tables and whole outputs run against run, and which runs agreed."),
  (CS2 + "11. Decisions, findings, questions", "Q3, and the command that moves the identity-hash sequence: a driver copy that asks for N identity hashes first."),
  ("doc:explorations/reviews/row-488-probe.md", "Row 488's probe: what moved between builds, what was ruled out, and the memos it named as leads."),
  ("code:" + SRC + "/nodes/AbstractNode.java#public final int hashCode()", "A node's hash, cached on first use from generateHashCode: the one place every node's hash comes from."),
  ("code:" + SRC + "/nodes/TraitType.java#public int generateHashCode()", "A generated node's hash, starting from getClass().hashCode(), the class's identity hash: the line 936 generated classes share."),
  ("code:" + SRC + "/nodes_util/UIDObject.java#This is mostly for testing purposes", "The team's hash for the nodes' base class, a counter the team chose for a more deterministic replay than Object.hashCode (its comment above)."),
  ("code:" + SRC + "/astgen/TransformationNode.java#private void writeGenerateHashCode(", "An in-repo generator writing the same hash line, as EllipsesNode and TemplateGapClass do: the generators the build runs beside ASTGen."),
  ("code:" + SRC + "/nodes_util/ErrorMsgMaker.java#public String for_InferenceVarType(", "An inference variable printed by an identity hash: another place a message can move with the hash sequence."),
  ("code:" + SRC + "/compiler/StaticChecker.java#for (Map.Entry<APIName, ApiIndex> api : apis.entrySet())", "The apis checked in the order of a hash map keyed by nodes: the order the H runs saw change."),
]
H_CHECKS = [
  "F-232", "P-148", "ledger:488",
  CS2 + "9. Row 488: the checker's output depends on identity hashes",
  "code:" + SRC + "/nodes/TraitType.java#public int generateHashCode()",
  "code:" + SRC + "/nodes_util/UIDObject.java#This is mostly for testing purposes",
]

K_BRIEFING = [
  ("P-148", "The decision every checker change follows, word for word: the time before and after, then a pass that keeps the results."),
  ("P-26", "The type group's late word and the implementers' outweigh unfinished text: the No Duplicates Rule and the Meet Rule as the papers state them."),
  ("F-80", "The checker judges two functional methods by the Meet Rule in each type that provides both, a component's own abstract one unchecked (row 572)."),
  ("F-42", "A unit's earlier error hides its overloading checks: why the count stage cannot see your overloading change and the distance stage can."),
  ("ledger:727", "Your first row: a component's own abstract functional method unread, so a duplicate beside a concrete one stops the code generator."),
  ("ledger:572", "Its sibling: an object that inherits an abstract method from one trait and a body from another runs the body, read by no check."),
  ("ledger:720", "Your third row: a static argument that fails the callee's bound reported at the callee's declared type, not at the call."),
  ("ledger:584", "The symbolic operators the overloading check skips, item 38's: your repair leaves them as they are."),
  ("ledger:726", "The symbolic-operator form of row 727, FlatString's api pair among them: not yours, and not reached."),
  ("ledger:707", "Row 727's sibling at two self positions, fixed by climb batch 15's rung O in the same checker: the precedent repair."),
  ("ledger:433", "The where clauses' row, whose two wellformed sites at :3405 and :3411 your row 720 repair moves to their calls."),
  (ROC + "JUDGE.md#7. Decisions taken here", "Decision 1, what the per-provider check reads in a component: reading (a), which your repair takes, and (b), the default it replaces."),
  (ROC + "SKEPTIC.md#4. Finding B", "SkAbsConc: the object both compiled states accept and run, the specification's two refusals, and the dotted twin the team's check refuses."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The No Duplicates Rule restated on the non-strict relation, which row 727's pair breaks."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The Meet Rule over what a type provides: row 572's object provides two declarations and none on their meet."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "What a trait provides, abstract declarations included, and that an object must define each abstract method it inherits."),
  (CHG + "Overloading with static parameters", "The entry whose Effect names row 727 as the checker's departure (:2620-2627): you amend that sentence; the next one, on row 373, is the gather's."),
  (CBD + "9. Defects, each with its home", "Row 720's text as the probe proposed it, and its reproducer."),
  ("doc:explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss", "Row 720's reproducer: its two errors name the callee's result at line 11, not the call at line 16."),
  ("code:" + TC + "/OverloadingChecker.scala#private def toFunctionalMethodArrows(", "The per-provider set's filter at :138-141 that drops a component's own abstract functional methods: rows 727 and 572's site."),
  ("code:" + TC + "/OverloadingChecker.scala#private def toMethodArrows(", "The team's dotted check, which reads abstract dotted methods with no body filter: the precedent your repair follows."),
  ("code:" + TC + "/OverloadingChecker.scala#def isDeclaredName(", "Which names the check reads at all: an operator only by validOp, row 584; left as it is."),
  ("code:" + TC + "/TypeWellFormedChecker.scala#override def walk(node:Any):Any = {", "The well-formedness walk: the bound's error reported at the type node, whose span is the callee's declaration (:158-165)."),
]
K_CHECKS = [
  "P-148", "P-26",
  "ledger:727", "ledger:572", "ledger:720", "ledger:584",
  ROC + "JUDGE.md#7. Decisions taken here",
  "doc:Specification/basic/traits.tex#Method Declarations",
  "code:" + TC + "/OverloadingChecker.scala#private def toFunctionalMethodArrows(",
  "code:" + TC + "/TypeWellFormedChecker.scala#override def walk(node:Any):Any = {",
]

W_BRIEFING = [
  ("P-26", "The type group's late word: the POPL 2019 paper's rules, which the expected failures of rows 697 and 373 test."),
  ("P-45", "Overloads may differ in their static parameters, each domain read over its own instances: what walk's check of two generic declarations takes."),
  ("P-48", "A type parameter that nothing at a call fixes takes its bound, constrained by the call's static return type: row 718's instance."),
  ("P-124", "The specification's examples join the gate at zero red: why you run testSpecData once after your change of walk's checks."),
  ("F-145", "What walk refuses at load today and why: the checks your repairs extend."),
  ("F-155", "Walk's refusal of two declarations whose parameters do not exclude, and its message: the key two of your promotions keep."),
  ("F-228", "Walk's instance of an unwritten clause form by a declared type, its elements or its bound, row 718 left open: your fourth row."),
  ("ledger:697", "Your first row: two parameter lists that differ only at an object type below the other's counted as excluding, so the return types are never compared."),
  ("ledger:373", "Your second row: two generic declarations read at one instantiation, so a pair whose domains overlap is found excluding."),
  ("ledger:673", "Your third row: an if whose clause is an object that is not a Boolean takes its else branch, or its then branch for an object named Just."),
  ("ledger:718", "Your fourth row: a user big operator whose declared result is its own trait gets no hint, so its parameter takes its bound."),
  ("ledger:444", "A sibling not repaired here: walk's check of a dotted method inherited beside one an object declares, its site not located."),
  ("ledger:433", "The library's distribute pair, which breaks the return-type rule the checker reads: the guard on your row 697 repair."),
  (POPL + "A4. A declaration at the meet", "Row 697's example, its expected failure and what each path does with it."),
  (POPL + "A6. Two generic", "Row 373's first example, two generic sorts with no meet, and its expected failure."),
  (POPL + "B4. The No Duplicates Rule", "Row 373's second example, dup's pair, and its expected failure under walk."),
  ("doc:Specification/advanced/overloading.tex#Subtype Rule", "The rule walk's check skips for row 697's pair: the more specific declaration's return type below the other's."),
  ("doc:Specification/basic/expressions/if.tex#If Expressions", "A clause without a binding must be an expression of type Boolean: row 673's rule."),
  ("code:" + EV + "/values/OverloadedFunction.java#public static class OverloadComparisonResult {", "Walk's pair analysis: the object-type shortcut at :432-433 and :486, the team's line, and the generic pair's exclusion at :454."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private boolean validOnDeclaredDomains(", "Where two generic declarations keep the pair analysis's check: row 373's path."),
  ("code:" + EV + "/Evaluator.java#public FValue forIf(If x)", "Walk's if: a Boolean, else an object named Just taken as true, else refused: row 673's site."),
  ("code:" + EV + "/EvaluatorBase.java#private static Type resultArgOf(", "The element and result types read off a declared result named BigReduction, Comprehension or BigOperator only: row 718's site."),
  ("code:Library/FortressLibrary.fss#trait ActualReduction[", "ActualReduction's distribute at Any, the team's comment calling it a hack to avoid the error of overloaded methods: one side of the pair your guard watches."),
  ("code:Library/FortressLibrary.fss#object SumReduction[", "SumReduction's distribute at MaxReduction and MinReduction, each with a return type not below the one at Any: the other side."),
]
W_CHECKS = [
  "P-26", "P-45",
  "ledger:697", "ledger:373", "ledger:673", "ledger:718", "ledger:433",
  "doc:Specification/advanced/overloading.tex#Subtype Rule",
  "code:" + EV + "/values/OverloadedFunction.java#public static class OverloadComparisonResult {",
  "code:" + EV + "/Evaluator.java#public FValue forIf(If x)",
]

IDS = ('S', 'H', 'K', 'W')
LISTS = {
  'S': ([k for k, _ in S_BRIEFING], S_CHECKS),
  'H': ([k for k, _ in H_BRIEFING], H_CHECKS),
  'K': ([k for k, _ in K_BRIEFING], K_CHECKS),
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
}
REASONS = {'S': S_BRIEFING, 'H': H_BRIEFING, 'K': K_BRIEFING, 'W': W_BRIEFING}


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
