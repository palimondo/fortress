# The briefing and checks lists of climb batch 11's four rungs, W, C, E and L (CLIMB-BATCH-11.md, section 3), in
# batch 10's form (explorations/compile-ladder/plan-10/manifest/lists10.py), made leaner for the redesigned workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on,
# and no process position or harness fact, which the brief's role text and the fortress-repo skill now carry
# (context-study.md, section 5: none of batch 10's 87 POSITIONS and FACTS keys was named before a fix edit). Each
# briefing entry is a pair: its facts-extract.sh key and one line on why it is there and what the rung does with
# it. gen11.py renders the lines at the end of each rung worker's brief, in the order of the briefing. A checks list
# is a sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. `python3 lists11.py` checks
# every key with facts-extract.sh --check (each must match exactly one place) and every reason's form; it is run
# again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
TC = SRC + '/scala_src/typechecker'

PIR = "positions:A type parameter the arguments do not fix"
EXAMPLES = "positions:The specification's examples join the gate"
DEMOS = "positions:The team demos that write no static argument"
SUMP = "positions:SUM and PROD without the Number catch-all"
STD = "positions:The specification stays the standard"
COMPRISES = "positions:The comprises passages read at the level of values"
SPECREC = "positions:Every change to the specification is recorded with its reason"
S1 = "positions:The S1 form"
LIBP = "positions:The library's own practice is the standard"
RANGES = "positions:Scalar ranges are over ZZ32 only"
COUNTP = "positions:The checker count is measured, never red"
ROUTE = "positions:The library route"
BOUND = "positions:The implicit bound of an unbounded type parameter"
P1J = "doc:explorations/reviews/p1-judgement.md#"
INF = "doc:Specification/basic/inference.tex#"
CHG = "doc:Specification/appendices/changes.tex#"
OVL = "doc:Specification/advanced/overloading.tex#"
RRM = "doc:explorations/compile-ladder/rung-range-meets/"
RCD = "doc:explorations/compile-ladder/rung-checker-defects/"

W_BRIEFING = [
  (PIR, "The instance rule: never Bottom. An F-bounded parameter nothing at a call fixes has no bound to take, so by the answer to Q1 walk leaves it open (way 11), the rule's spirit."),
  (SUMP, "Why SUM[i <- 1#100] i stopped: answer 7 took the Number catch-all away, and walk then gave the clause form's parameter Bottom; leaving it open is the way back."),
  (EXAMPLES, "With your change the specification's five red examples run, and from this batch ant testSpecData is a gate step at zero red: see them green before you report."),
  (DEMOS, "The read after your edit: each of the 18 demos and the smoke test run once under walk, its verdict and first error line reported, none edited, no timing."),
  (STD, "Rows 614 and 618: walk runs what the traits chapter and the Meet Rule say, for a trait's override and for an object expression."),
  (COMPRISES, "The Meet Rule's covering declarations, which your check of an object expression accepts as walk's load check of a declared type does."),
  (SPECREC, "Why the two passages your P1 half makes false get a callout, and their Appendix I entries an amendment."),
  (S1, "The form of the text you change: the box revised in place as a revision callout, the entries amended with their reason."),
  ("ledger:424", "Your main repair: the F-bounded half closes when walk leaves the parameter open; promote ProjectFortress/tests/XXXUnwrittenSumRungF.fss to a name by topic."),
  ("ledger:555", "Its F-bounded form stays open, since there the arguments fix T and the question is walk's join: a note, not a repair."),
  ("ledger:425", "The checker's side, the rewriting of a reduction by its element type: not yours; the compiled path still refuses an unwritten reduction."),
  ("ledger:628", "The reductions typed at their element type, which your open parameter unblocks for batch 12's library rung: a note on your landing, nothing more."),
  ("ledger:614", "Walk runs a declaration that a trait's override overrides: drop overridden inherited declarations where walk gathers a trait's members; promote its test."),
  ("ledger:615", "The landed reading of overridden, a type's own override declarations, which row 614's repair follows; its pin keeps its verdict."),
  ("ledger:618", "Walk's half of the Meet Rule on object expressions: its load check visits declared traits and objects only; promote its test with its load key."),
  ("ledger:570", "The checker's half of row 618, not yours: after your rung walk refuses at load a pair the checker still accepts; say so in your report."),
  ("ledger:612", "An expected failure that keeps its verdict: a parameter bounded only from above whose bound mentions another static parameter; D5's question, not yours."),
  ("ledger:616", "An expected failure that keeps its verdict: two upper bounds walk cannot meet; row 591's question, not yours."),
  (P1J + "1. The way, stated", "The way you build: an F-bounded parameter nothing fixes is left open, its open type named OPEN where a program prints a type."),
  (P1J + "3. The work for batch 11", "The work line by line: the five files of the probe's patch, the tests and their values, the passages, the demos, the records."),
  (P1J + "5. Points still open", "What stays out of this rung: D2's plain-bounded big operators, row 555's form, the empty reduction over a type other than ZZ32."),
  ("doc:explorations/compile-ladder/plan-9/probes/P1.md#What was measured", "What the probe's patch P1-open.patch did on batch 9's tree, which you re-read on this base before you apply it."),
  (INF + "A Numeral Whose Conversions Tie", "The chapter's end: the interpreter's box at inference.tex:276-300, which you revise, and the list of what the chapter does not yet describe."),
  ("doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions", "The revision note on reductions at reductions.tex:27-44, whose sentences on walk your change makes false."),
  (CHG + "Reductions whose element type nothing fixes", "The Appendix I entry you amend; the other, The inference of a call's static arguments at changes.tex:1575, you open in the file at its interpreter sentences."),
  (OVL + "Meet Rule", "The Meet Rule for Functional Methods per providing type, covering declarations among it, which applies to an object expression as to a declared object."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "What overrides what in a trait: the text row 614's repair follows when walk gathers a trait's members."),
  ("code:" + EV + "/EvaluatorBase.java#private static ArrayList<FType> instanceOf(", "Walk's instance of each static parameter, where the F-bounded block of the probe's patch goes."),
  ("code:" + EV + "/types/BottomType.java#public class BottomType extends FType", "The type walk takes today; the patch adds the open type beside it."),
  ("code:" + EV + "/BuildEnvironments.java#void checkFunctionalMethodMeets()", "Walk's load check of the Meet Rule, which visits declared traits and objects only: where row 618's object expressions join it."),
  ("code:" + EV + "/values/OverloadedFunction.java#public static final class FunctionalMethodMeets", "The check itself, per providing type, built by batch 10's rung W; an object expression is one more provider."),
  ("Under walk, a type parameter that nothing at a call fixes takes its declared bound", "What batch 9 built, the rule your P1 half extends to the F-bounded case it left at Bottom."),
  ("Walk applies at load the Meet Rule for Functional Methods", "What batch 10 built at load, which your row 618 repair extends to object expressions."),
  ("ant testSpecData runs 130", "The five red examples, their one cause and their stop, which your change removes."),
]
W_CHECKS = [
  PIR, EXAMPLES, STD, COMPRISES,
  "ledger:424", "ledger:614", "ledger:618", "ledger:570",
  P1J + "1. The way, stated", P1J + "3. The work for batch 11",
  OVL + "Meet Rule",
  "code:" + EV + "/EvaluatorBase.java#private static ArrayList<FType> instanceOf(",
]

C_BRIEFING = [
  (STD, "The text is the standard: each repair makes the checker accept what the text allows and refuse what it refuses, and a crash becomes the text's error."),
  (COMPRISES, "Covering and the closed-trait case of the Meet Rule, which the per-provider cover of row 617 reads."),
  (BOUND, "The restriction on a single parameter applies to a bound written Any, never to the implicit one: row 619's dotted form among it."),
  (ROUTE, "No declaration goes into the compiler's prelude: row 463 has tests only, its fix waits for the switch-over."),
  (COUNTP, "The count and the distance are reported and never red; under Q4 the three crash rows become refusals and the distance may rise."),
  (SPECREC, "Why Q4's refusal gets a callout at the components chapter's passage and an Appendix I entry naming row 405 too."),
  (S1, "The form of the text you add: a revision callout at the passage and an Appendix I entry with its reason."),
  ("ledger:610", "Your first repair: the checker reads every functional method a supertype declares as provided, refusing disp0 and a widening override."),
  ("ledger:617", "The per-provider cover counts the self position: give the cover the arrows without self."),
  ("ledger:619", "A dotted method's single parameter written bounded by Any is accepted and the run dies: checkBoundAny refuses only the top-level form."),
  ("ledger:625", "A renamed parameter's bound left naming the object's parameter: rename every own parameter's bound in both places together."),
  ("ledger:637", "The export check asks an api declaration for a component trait's private abstract method; its one site is List.fss:12."),
  ("ledger:626", "A typecase arm naming an undeclared type with static arguments crashes the checker: report the name in the disambiguator."),
  ("ledger:463", "Tests only: a generator binding as an if or while clause, refused compiled; two expected failures over the compiler library's Maybe."),
  ("ledger:620", "Under Q4, the first local-function crash, Type is not inferred, becomes the refusal Missing parameter type."),
  ("ledger:621", "Under Q4, the second local-function crash, an untyped expression from TryChecker."),
  ("ledger:622", "Under Q4, the third local-function crash, intermediate nodes left in the result."),
  ("ledger:405", "The top-level refusal of the same omission, Missing parameter type for x, which Q4's way extends to local functions."),
  ("ledger:561", "The overloading checker's renaming of a method's own static parameters before substitution, the precedent rows 625 and 563 follow."),
  (OVL + "Meet Rule", "The Meet Rule for Functional Methods per providing type and its cover, which rows 610 and 617 make the checker read rightly."),
  (OVL + "Principles of Overloading", "The restriction on a single naked type parameter and its callout: row 619's text."),
  (CHG + "The implicit bound of a type parameter", "Its sentence that the checker applies the restriction to a bound written Any, which row 619's fix makes true of dotted methods."),
  ("doc:Specification/basic/components/type-inference.tex#Type Inference for Components", "The passage Q4's refusal departs from, where your callout goes."),
  (RCD + "REPORT.md#10. Decisions", "Batch 10's rung C on its crash rows, decision 9 and its three candidates, of which Q4's answer takes the first."),
  ("code:" + SRC + "/scala_src/useful/STypesUtil.scala#private def gatherMethods(tt_name: Id", "Row 610's first site: what a type provides."),
  ("code:" + TC + "/OverloadingChecker.scala#private def toFunctionalMethodArrows(", "Row 610's second site, and row 617's arrows."),
  ("code:" + TC + "/OverloadingChecker.scala#private def checkBoundAny(", "Row 619: the restriction as the checker applies it today."),
  ("code:" + TC + "/OverloadingChecker.scala#private def ownStaticParamsApart(", "Row 625's second site, and row 561's renaming, the precedent."),
  ("code:" + TC + "/AbstractMethodChecker.scala#private def domainApart(", "Row 625's first site."),
  ("code:" + TC + "/ExportChecker.scala#private def allAbstractsMadePublic(", "Row 637: skip private members here."),
  ("code:" + SRC + "/compiler/disambiguator/TypeDisambiguator.java#private Type handleTypeName(", "Row 626: an undefined name in a typecase clause, which rewrites instead of reporting."),
  ("code:" + TC + "/staticenv/STypeEnv.scala#Missing parameter type for", "The top-level refusal Q4's way takes for a local function."),
  ("The compiled checker judges two functional methods by the Meet Rule for Functional Methods", "What batch 8 built per providing type, which rows 610 and 617 correct."),
]
C_CHECKS = [
  STD, BOUND, ROUTE,
  "ledger:610", "ledger:617", "ledger:619", "ledger:625", "ledger:637", "ledger:626", "ledger:463", "ledger:620",
  OVL + "Meet Rule", OVL + "Principles of Overloading",
  "doc:Specification/basic/components/type-inference.tex#Type Inference for Components",
]

E_BRIEFING = [
  (PIR, "A result-only parameter the arguments do not fix takes its bound, never Bottom: so the checker must pass in the type the text requires."),
  (STD, "The text says the type each of the four contexts gives; the checker passes it in."),
  (LIBP, "Why way 4 is out: the library does not write fail[\\()\\] at each call to route round a checker gap."),
  (COUNTP, "The count and the distance are reported and never red."),
  (SPECREC, "Why the inference chapter's two lists change with your rung, in an Appendix I entry of your own."),
  (S1, "The form of your text change: the lists revised in place with a callout, a new entry with its reason."),
  ("ledger:560", "Your main repair, item 36: its second part's 13 sites, by the answer to Q2 all four contexts, the typecase branch by the union rule."),
  ("ledger:627", "Your second repair: a method's own static parameter captures the caller's of the same name at a method call; rename before substituting."),
  ("ledger:561", "The renaming the overloading checker does for the same capture, the precedent for row 627."),
  ("ledger:563", "The same capture in the abstract-method checker, fixed by batch 10: its renaming is the other precedent."),
  ("ledger:455", "The argument of another call, a context outside item 36's four: XXXInferContextDrops keeps that face as an expected failure."),
  (INF + "The Static Arguments of a Call", "The rule, and at inference.tex:128-136 the list of contexts with an expected type, which gains the four."),
  (INF + "A Numeral Whose Conversions Tie", "The chapter's end, and at inference.tex:254-258 the list of what it does not yet describe, which loses them."),
  ("doc:Specification/basic/expressions/if.tex#If Expressions", "An if without else: every clause must have type (), the type the clause's call is given."),
  ("doc:Specification/basic/expressions/blocks.tex#Do Expressions", "A block's value and type are its last expression's, the type the block is given."),
  ("doc:Specification/basic/expressions/var-ref.tex#Identifier References", "Static arguments inferred from the context of the call: the loose juxtaposition's case."),
  ("doc:Specification/basic/expressions/typecase.tex#Typecase Expressions", "The union of the right-hand sides' types, by which each branch is given the enclosing expected type (Q2)."),
  ("doc:explorations/reviews/batch-8-review.md#2. The bodies' kind", "Why three of the four contexts are new work and not a fork: the review's reading the answer to Q2 confirms."),
  ("doc:explorations/compile-ladder/rung-inference-checker/REPORT.md#8. Every defect measured, and its home", "Batch N's rung I on the faces the text settles, the argument face among them, gated by XXXInferContextDrops."),
  ("code:" + TC + "/impls/Misc.scala#case SIf(SExprInfo(span,parenthesized,_), clauses, None)", "An if without else, today checked with no expected type for its clause."),
  ("code:" + TC + "/impls/Misc.scala#Matches if block is not an atomic block.", "A block: its last expression is checked against the expected type, but not after a local declaration."),
  ("code:" + TC + "/impls/Misc.scala#case STypecase(SExprInfo(span, paren, _),", "A typecase: where each branch can be given the enclosing expected type."),
  ("code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)", "A loose juxtaposition, the three cases."),
  ("code:" + TC + "/impls/Functionals.scala#case SMethodInvocation(SExprInfo(span, paren, _), obj, method, sargs, arg, _, _)", "A method call: where row 627's substitution starts; the trace finds its site."),
  ("code:" + TC + "/OverloadingChecker.scala#private def ownStaticParamsApart(", "Row 561's renaming apart, the model for row 627."),
  ("The compiled checker instantiates a type parameter that nothing at a call fixes", "What batch 8 built: the bound for a parameter nothing fixes, which leaves these contexts refused until the type reaches the call."),
]
E_CHECKS = [
  PIR, STD, LIBP,
  "ledger:560", "ledger:627", "ledger:455",
  INF + "The Static Arguments of a Call", INF + "A Numeral Whose Conversions Tie",
  "doc:Specification/basic/expressions/typecase.tex#Typecase Expressions",
  "code:" + TC + "/OverloadingChecker.scala#private def ownStaticParamsApart(",
]

L_BRIEFING = [
  (RANGES, "Scalar ranges are over ZZ32 and the public range traits stay generic: the comparisons belong to the ZZ32 and tuple kinds (item 40, way a)."),
  (LIBP, "Each repair in the library's own spelling: a named meet for rank 2 and 3 as for rank 1 (item 39, way a), a declared type widened to what the body answers (item 41, way a)."),
  (COUNTP, "The count and the distance are reported and never red; they are your rung's test, before from batch 10's landed tables."),
  ("ledger:599", "Item 39's 15 sites: no type for a bounded range of rank 2 or 3; BoundedRange2D and BoundedRange3D, and the six casts go."),
  ("ledger:600", "Item 40's 18 sites: the generic range bodies compare indices of their type parameter; move them to the ZZ32 kinds of rank 1 to 3."),
  ("ledger:601", "Item 41's 3 sites: the bounds' order repaired so that |#(0,3)| is 0, and the declared types widened to RangeWithExtent."),
  ("ledger:633", "Three getters invoke the getter indices with (): write s.indices."),
  ("ledger:638", "The bare constructor throw ForbiddenException at five library sites and two revival tests: give it its argument, as rung N did."),
  ("ledger:577", "The distance stage's classes read by stale line ranges: count your sites by row, never by class."),
  ("ledger:628", "Not yours: the reductions' Any devices wait for batch 12, after rung W's open parameter lands."),
  (RRM + "REPORT.md#6. The three homes of each defect measured", "Batch 9's rung R left the 36 sites under rows 599 to 601, with their lines at its base."),
  (RRM + "REPORT.md#7. Decisions", "Its decisions, among them the six CAP casts it chose in the curator's stead, which item 39's way removes."),
  (RRM + "SKEPTIC.md#8. For", "The forks its skeptic sent to the curator, now answered by Q3."),
  ("doc:Specification/basic/expressions/ranges.tex#Ranges", "The text describes no range of rank 2 and is silent on the three items; your text change is none."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "A getter method must be invoked with the field access syntax: row 633."),
  ("doc:Specification/basic/expressions/throw.tex#Throw Expressions", "A throw takes an exception value: row 638."),
  ("code:Library/RangeInternals.fsi#trait BoundedScalarRange", "The rank-1 named meet, the precedent for BoundedRange2D and BoundedRange3D."),
  ("code:Library/RangeInternals.fsi#opr SCMP(a: ZZ32, b: ZZ32): Comparison..opr PCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison", "The comparisons, declared at ZZ32 and the two tuple types only: where item 40's bodies go."),
  ("code:Library/RangeInternals.fss#extent1Range(x:ZZ32):ExtentRange..extent3Range(x:ZZ32,y:ZZ32,z:ZZ32)", "Item 41's three sites: the bounds' order and the declared types."),
  ("code:Library/FortressLibrary.fss#= throw ForbiddenException(CallerViolation)", "Rung N's repair of the bare throw, the precedent for row 638."),
  ("The one library's range types provide a declaration on the meet", "What batch 9's rung R built for the ranges, which your rung completes."),
  ("The one library's scalar ranges are over", "Batch 7R's ZZ32 kinds, the model for moving the generic bodies."),
]
L_CHECKS = [
  RANGES, LIBP,
  "ledger:599", "ledger:600", "ledger:601", "ledger:633", "ledger:638",
  RRM + "REPORT.md#6. The three homes of each defect measured",
  "code:Library/RangeInternals.fsi#trait BoundedScalarRange",
]

IDS = ('W', 'C', 'E', 'L')
LISTS = {
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
  'C': ([k for k, _ in C_BRIEFING], C_CHECKS),
  'E': ([k for k, _ in E_BRIEFING], E_CHECKS),
  'L': ([k for k, _ in L_BRIEFING], L_CHECKS),
}
REASONS = {'W': W_BRIEFING, 'C': C_BRIEFING, 'E': E_BRIEFING, 'L': L_BRIEFING}


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
