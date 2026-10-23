#  The briefing and checks lists of climb batch 21's seven rungs, in its two runs: S, B, V and N (run 1, climb batch 21)
# and C, E and D (run 2, climb batch 21b) (CLIMB-BATCH-21.md, section 3), in batch 20's form
# (explorations/compile-ladder/plan-20/manifest/lists20.py) for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's section
# cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on, and no
# process position or harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS
# entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is
# there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. The
# record's section 5, "The briefings", holds the same keys. No key holds a backslash, a backtick or a double quote,
# which the script refuses; facts-extract matches a heading without its backticks.
# `python3 -B lists21.py [--run 1|2]` checks every key of the run's rungs (both runs without --run) with
# facts-extract.sh --check (each must match exactly one place) and every reason's form; it is run again on the tree
# each run is cut from, run 2's on run 1's landed tree.
SRC = 'ProjectFortress/src/com/sun/fortress'
TA = SRC + '/scala_src/types/TypeAnalyzer.scala'
OC = SRC + '/scala_src/typechecker/OverloadingChecker.scala'
EC = SRC + '/scala_src/typechecker/ExportChecker.scala'
FL = 'Library/FortressLibrary.fss'
FLI = 'Library/FortressLibrary.fsi'

SO = "doc:explorations/perf-probes/symbolic-operators-2/REPORT.md#"
SOP = "doc:explorations/perf-probes/symbolic-operators-2/"
EX = "doc:explorations/perf-probes/export-check-full/REPORT.md#"
WC = "doc:explorations/perf-probes/walk-conditional-extension/REPORT.md#"
TD = "doc:explorations/perf-probes/team-demos/REPORT.md#"
TJ = "doc:explorations/reviews/type-decisions-review/judgement.md#"
CHG = "doc:Specification/appendices/changes.tex#"
REC = "doc:explorations/coordinator/CLIMB-BATCH-21.md#"

S_BRIEFING = [
  ("P-155", "The decision your rung builds the library half of: the check reads symbolic operators by the rules it applies to any function."),
  ("P-27", "The library's own practice is the standard: juxtaposition's three top-level operators are the device for String's families."),
  ("F-245", "The measurement your rung builds: 186 errors under the full check, 54 of them cleared by the known fixes."),
  ("ledger:585", "Your first row: String's four families pair (a:Any, self) with (self, b:Any), the shape the specification refuses."),
  ("ledger:784", "Five library slips only the full check sees: the api's vector operators, ZZ's =, |self| twice, Maybe's meets."),
  ("ledger:611", "EmptyString's ||, whose library half your rung fixes, and the expected failure that moves (fork 5)."),
  ("ledger:584", "The full check's row, which your rung notes: the library's symbolic errors outside the subscripts gone."),
  ("ledger:545", "A family mixing a top-level function with functional methods, refused by both paths: the shape to keep out of String's families."),
  (SO + "0. In short", "The probe in one table: the full check, the known fixes, the two designs, everything together at the gate's 5."),
  (SO + "1.1 The shadow", "The instrument your test uses: the three loops read every symbolic operator, a crash printed and the check going on."),
  (SO + "1.2 The families", "The 186 by family, against the earlier sort, with what moved and why."),
  (SO + "2. The known fixes (step 2)", "The seven fixes as they stand today, the header variant of |_| among them, and walk's one failure."),
  (SO + "3.3 Everything together", "The fixes with both designs: the gate's 5, the crash's three lines apart."),
  (SOP + "known-fixes.py", "The generator of your library text: each family's exact edits, abshead among them."),
  (SOP + "run-shadow.sh", "The full-check distance stage, your test for the library's sites."),
  (REC + "The planner's probe", "The run's text measured together: the full check 191 to 5, the stock stages 5 and 3, walk's suites and the demos."),
  ("code:" + FL + "#opr juxtaposition(a:Any, b:String):String", "The precedent: juxtaposition's three top-level operators, the shape String's families take."),
  ("code:" + FLI + "#trait String extends", "String's api, whose header and concatenation members your rung changes."),
  ("code:Library/String.fss#  value object EmptyString extends", "EmptyString's || members, which gain the meet."),
  ("doc:ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss", "Row 611's expected failure, which your text makes walk refuse for another reason (fork 5)."),
]
S_CHECKS = [
  "P-155", "F-245",
  "ledger:585", "ledger:784", "ledger:611",
  SO + "2. The known fixes (step 2)",
  SOP + "known-fixes.py",
  REC + "The planner's probe",
]

B_BRIEFING = [
  ("P-156", "The decision your rung builds: the Index bound, ranges excluding it, and a tuple of indices an Index on both paths."),
  ("P-42", "An unbounded parameter's bound is Any, which holds tuples where Object does not: why Index's place matters."),
  ("P-56", "The open range stays an OpenRange of Any, so Range stays unbounded and BoundedRange cannot take the bound."),
  ("P-155", "The check that the bound makes valid at every instance of the subscript pair."),
  ("P-148", "Your rung changes the checker: it times the count stage and makes the change fast."),
  ("F-245", "The 124 subscript errors your rung clears under the full check."),
  ("ledger:783", "Your row: the subscript pair over an unbounded index type, invalid at Object or Any."),
  ("ledger:584", "The full check's row, which your rung notes."),
  (SO + "3.1 Subscripts over an unbounded index type (row 783)", "The design measured: the bound, the tuple rule on both paths, the ways not taken, walk's failures without its rule."),
  (SOP + "subscripts-index-bound.patch", "Your library text as the probe measured it."),
  (SOP + "checker-tupleindex.patch", "The checker's rule as the probe built it: subtyping only, by the bare name."),
  (SOP + "walk-tupleindex.patch", "Walk's rule as the probe built it: subtypeOf, meet and excludesOther."),
  ("doc:explorations/compile-ladder/plan-21/probes/checker-tupleindex-exclusion.patch", "The checker's rule with its exclusion side and Index kept outside Object by the desugarer, as the planner measured them, by the bare name."),
  (REC + "Question 1, consequential: where the trait Index stands", "Index's place, so that a tuple of indices is an Index and never an Object: the question, its options and default."),
  (REC + "Question 2, consequential: whether BoundedRange's narrowed atMost goes", "BoundedRange's atMost: dropped, or kept under a method condition, with each measured."),
  (TJ + "V2. P-156's tuple rule is a departure from the designers' type text, not the team's magic read as subtyping; the Index bound itself finishes the team's wish.", "Why the tuple rule is recorded as the revival's departure: the designers' tuple-type text, quoted with its lines."),
  (TJ + "2. Batch 21's three type items", "The three changes to P-156's rung, the vectors' wait and row 774's, as the judgement gives them."),
  ("doc:Specification/basic/types-vals-vars.tex#Tuple Types", "The tuple types' rules, which gain the tuple rule and whose exclusion sentence you correct."),
  ("doc:Specification/appendices/future.tex#Traits and Objects", "The team's array-indexing item, its wish and its magic, which gains a revision box."),
  (CHG + "The implicit bound of a type parameter", "The Appendix I entry beside which the new entry for the bound and the rule is written."),
  ("code:" + TA + "#  protected def pSubInner(", "The checker's subtype cases, the tuple cases among them."),
  ("code:" + TA + "#  protected def pExcInner(", "The checker's exclusion cases, where a tuple excludes every trait type today."),
  ("code:" + SRC + "/interpreter/evaluator/types/FTypeTuple.java#    public boolean subtypeOf(", "Walk's tuple subtyping, which gains the rule."),
  ("code:" + SRC + "/compiler/desugarer/PreDisambiguationDesugaringVisitor.java#    private List<TraitTypeWhere> rewriteExtendsClause(", "The desugaring that makes every trait an Object, which question 1's default changes for Index."),
  ("code:" + FLI + "#trait Indexed[", "The api's Indexed, the subscript pair and the parameter your bound reaches."),
  ("code:" + FLI + "#trait BoundedRange[", "BoundedRange, whose narrowed atMost question 2 decides: by its default kept under a method condition."),
]
B_CHECKS = [
  "P-156", "P-42", "P-148", "ledger:783",
  SO + "3.1 Subscripts over an unbounded index type (row 783)",
  SOP + "subscripts-index-bound.patch", SOP + "checker-tupleindex.patch", SOP + "walk-tupleindex.patch",
  "doc:explorations/compile-ladder/plan-21/probes/checker-tupleindex-exclusion.patch",
  REC + "Question 1, consequential: where the trait Index stands",
  REC + "Question 2, consequential: whether BoundedRange's narrowed atMost goes",
  TJ + "2. Batch 21's three type items",
  "doc:Specification/basic/types-vals-vars.tex#Tuple Types",
]

V_BRIEFING = [
  ("P-157", "The decision your rung builds: Vector and Matrix keep their own operators and leave AdditiveGroup, arrays excluding every additive group."),
  ("P-88", "The scalar block that microGPT uses, which stays beside the vectors' own operators."),
  ("P-146", "Why the vectors give way: the overload check reads a self-typed trait's self in a signature as the plain trait type."),
  ("F-245", "The full check's 8 vector errors your rung clears."),
  (SO + "3.2 A vector plus a number beside a vector plus a vector", "The vectors' eight errors and the ways, A2 the one taken, with what each moves under walk."),
  (SOP + "vector-not-additive-group.patch", "Your library text as the probe measured it."),
  (SOP + "designs.py", "The generator of your text, vecA2."),
  (SOP + "run-shadow.sh", "The full-check distance stage, your test for the library's sites."),
  (TJ + "V1. The chain bends in one place that matters: P-146's signature half forces P-157, and P-157 overrules the team's library on a conflict that is the checker's, not the library's.", "Why the rung stands apart: the judgement's case that P-157 should wait for a checker probe."),
  ("code:" + FLI + "#trait HasRank", "The arrays' root, which excludes every additive group after your rung."),
  ("code:" + FLI + "#trait Vector[", "The api's Vector, whose header loses AdditiveGroup."),
]
V_CHECKS = [
  "P-157", "F-245",
  SO + "3.2 A vector plus a number beside a vector plus a vector",
  SOP + "vector-not-additive-group.patch",
]

N_BRIEFING = [
  ("ledger:793", "Your first row: an Array2 based above zero, sliced, reads the wrong elements."),
  ("ledger:794", "Your second row: the same for an Array3, and its whole subscript a[:]."),
  ("P-27", "The library's own way: Array1's subarray already subtracts the base, and maps extend Equality."),
  ("P-154", "A list is ordered only where its element type is totally ordered, though its = stays."),
  ("ledger:774", "Walk's half of conditional extension, which waits; your Equality line lands before it."),
  (TJ + "V3. Walk's half of conditional extension (row 774) should wait: by the logic of the revival's own rules for walk, and because row 364 makes the fix wrong under walk today.", "Why row 774 waits and the Equality line lands now."),
  (WC + "3.2 The respellings, and what they clear", "Way E, the Equality line, as the walk probe measured it."),
  (WC + "7. Defects", "The =/= defect with its draft row, which you file with its expected failure."),
  ("doc:Specification/basic/operators/opr-overview.tex#Comparisons Operators", "The operators chapter's sentence that orders every list, which gains a revision note."),
  ("code:" + FL + "#trait Array1[", "The precedent: Array1's subarray hands its view the offset less the base."),
  ("code:Library/Map.fsi#trait Map[", "The precedent: Map extends Equality, as List will outside its condition."),
  ("code:" + FL + "#opr =/=(a:Any, b:Any)", "The library's =/=, which compares by identity a value whose = it cannot see: the defect you file."),
  ("code:Library/List.fsi#trait List[", "List's header, the conditional entry and the Equality line."),
  ("doc:ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss", "Row 793's expected failure, which your fix promotes."),
  ("doc:ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss", "Row 794's expected failure, which your fix promotes."),
]
N_CHECKS = ["ledger:793", "ledger:794", WC + "7. Defects", "doc:ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss", "doc:ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss"]

C_BRIEFING = [
  ("P-155", "The decision your rung builds: the overloading check reads every symbolic operator before the switch-over."),
  ("P-148", "Your rung changes the checker: it times the count stage and makes the change fast."),
  ("P-151", "AnyList's comprises clause with its where-variable, live: the clause the crash meets."),
  ("P-45", "The overloading rules the check applies, and where walk and the checker still judge a pair apart."),
  ("F-245", "The full check's 186, three of them the crash's lines; the first run cleared the rest."),
  ("F-251", "How the checker opens a comprises clause's where-variable at a call."),
  ("ledger:584", "Your row: the check skips every operator whose name is not a word of capitals."),
  ("ledger:775", "The crash's sibling, a comprises clause's where-variable missing from the kind environment."),
  ("ledger:789", "Another kind-environment refusal beside the crash."),
  ("ledger:726", "The pair the code generator stops on, which your check refuses first."),
  ("ledger:611", "Walk's and the checker's meet checks skip symbolic operators: the checker's half is yours."),
  ("ledger:782", "The export check's own skip of symbolic names, which stays (fork 13)."),
  (SO + "1.1 The shadow", "The three loops and the export check's isDeclaredName, which stays."),
  (SO + "1.3 The crash", "The crash: where it is, its stack, the program that shows it without an operator."),
  (SOP + "checker-full-check.patch", "The check as the probe built it, its catch wrappers aside."),
  ("doc:explorations/compile-ladder/plan-21/probes/prelude-full-check.patch", "The check, the double count's fix and the prelude's repair, as the planner measured them on the compiled path."),
  ("ledger:481", "The prelude's always-false range =, which the repair takes out, its expected failure kept."),
  (REC + "The compiled path under the full check", "The prelude's 17 errors, the double count, the always-false =, and the compiled tests the full check refuses."),
  ("code:" + OC + "#    def checkOverloading(): JavaList[StaticError] = {", "The top-level set, its three loops' first and the import-star loops."),
  ("code:" + OC + "#    def isDeclaredName(", "The name filter the three loops read today."),
  ("code:" + TA + "#      def checkCC(s: TraitType, t: TraitType): CFormula = {", "The comprises clause's exclusion check, beside the excludes check that reads the clause's parameters."),
  ("code:Library/CompilerLibrary.fsi#trait GeneratorZZ32", "The prelude's generator trait, whose = has no meet under the full check."),
]
C_CHECKS = [
  "P-155", "P-148", "F-245", "ledger:584", "ledger:775", "ledger:726",
  SO + "1.3 The crash", SOP + "checker-full-check.patch",
  "doc:explorations/compile-ladder/plan-21/probes/prelude-full-check.patch",
  REC + "The compiled path under the full check",
]

E_BRIEFING = [
  ("P-27", "The library's own practice is the standard: the api states what its component defines."),
  ("P-90", "Maybe's empty case, beside which Maybe's export entries wait."),
  ("P-148", "Your rung changes the checker: it times the count stage and makes the change fast."),
  ("ledger:800", "Your first row: the export check matches members without their names."),
  ("ledger:801", "Your second row: a field compared by its type only."),
  ("ledger:802", "Your third row: the component-to-api half with its arguments swapped."),
  ("ledger:782", "The export check's skip of symbolic names, which stays."),
  (EX + "In short", "The probe in one page: the 115 differences, 4h, 4i and what remains."),
  (EX + "3.1 4h, 66: the api aligned with the component (library-4h.patch)", "The 66 lines: abstract written, members declared, the plain slips."),
  (EX + "3.2 4i, 8 (and String's 2)", "The check brought to the specification's rule, as the shadow applied it."),
  (EX + "4.3 Each new error, the line that brings it, and the line that clears it", "The 23 errors the abstract lines bring, and the 19 api lines that clear them."),
  (EX + "6. Defects found on the way", "The rows' defects, the count's blind spot's twin in the distance stage among them."),
  ("doc:explorations/compile-ladder/plan-21/probes/run2-api.patch", "Your api text as the planner wrote it on the first run's api and measured it."),
  ("doc:Specification/basic/components/apis.tex#Component and API Identity", "The rule the check is brought to: a definition of the same name, abstract members aside."),
  ("code:" + EC + "#  private def equalFnHeaders(", "Row 800's place: the header's name bound to nothing."),
  ("code:" + EC + "#  private def allAbstractsMadePublic(", "Row 802's place: the component-to-api half."),
  ("code:" + EC + "#  private def equalLValue(", "Row 801's place: two lines read as two statements."),
]
E_CHECKS = [
  "P-148", "ledger:800", "ledger:801", "ledger:802",
  EX + "3.1 4h, 66: the api aligned with the component (library-4h.patch)",
  EX + "3.2 4i, 8 (and String's 2)",
  "doc:explorations/compile-ladder/plan-21/probes/run2-api.patch",
  "doc:Specification/basic/components/apis.tex#Component and API Identity",
]

D_BRIEFING = [
  ("P-79", "The decision your rung builds: every team demo kept running, the known failures respelled where the way is known."),
  ("P-74", "A ZZ64 converts to RR64 only by asFloat: the timing lines' repair."),
  ("ledger:791", "The timing line of BiCGSTAB and BiCGSTAB2, and the same in ten other demos."),
  ("ledger:670", "The demos walk refuses at load, their inherited abstract methods without a body."),
  ("ledger:449", "HeapShakedown's first stop, a quotient where a float is wanted."),
  ("ledger:464", "mg's constructor field passed to fill."),
  ("ledger:468", "Generator22D's rects, the library edit your test comes first for."),
  ("ledger:710", "trips.fss's generator, refused by the checker, which your rung respells."),
  (TD + "In short", "The probe in one page: 30 run, 22 stop, all 52 with the patch."),
  (TD + "1. How it was run", "How each demo runs: from the demos folder, the limit, the arguments and input."),
  (TD + "3.1 Demo by demo", "Each repair, and what the demo did then."),
  (TD + "5. Defects, and the draft ledger rows", "The nine drafts, which stay in the report (fork 25)."),
  (TD + "6. Decisions", "The probe's choices and the ways not taken, demo by demo."),
  ("doc:explorations/perf-probes/team-demos/demos-repairs.patch", "Your text as the probe measured it."),
  (REC + "The demos on the first run's text", "The 52 demos with the patch on the first run's library, as the planner ran them."),
  ("doc:Library/Generator22D.fss", "rects, halving with / where DIV is meant."),
]
D_CHECKS = [
  "P-79", "ledger:791", "ledger:670", "ledger:468", "ledger:710",
  TD + "3.1 Demo by demo", "doc:explorations/perf-probes/team-demos/demos-repairs.patch",
]

RUNS = {'1': ('S', 'B', 'V', 'N'), '2': ('C', 'E', 'D')}
IDS = RUNS['1'] + RUNS['2']
_B = {'S': (S_BRIEFING, S_CHECKS), 'B': (B_BRIEFING, B_CHECKS), 'V': (V_BRIEFING, V_CHECKS), 'N': (N_BRIEFING, N_CHECKS),
      'C': (C_BRIEFING, C_CHECKS), 'E': (E_BRIEFING, E_CHECKS), 'D': (D_BRIEFING, D_CHECKS)}
LISTS = {r: ([k for k, _ in _B[r][0]], _B[r][1]) for r in IDS}
REASONS = {r: _B[r][0] for r in IDS}


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
    run = sys.argv[sys.argv.index('--run') + 1] if '--run' in sys.argv else None
    ids = RUNS[run] if run else IDS
    bad = 0
    for rid in ids:
        b, c = LISTS[rid]
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            if len(set(keys)) != len(keys):
                print('   PROBLEM duplicate key in', rid, name); bad += 1
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k) or any(ord(ch) > 127 for ch in k)]
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
