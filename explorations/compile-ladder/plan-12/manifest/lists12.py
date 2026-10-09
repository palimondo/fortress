# The briefing and checks lists of climb batch 12's four rungs, W, C, R and G (CLIMB-BATCH-12.md, section 3), in
# batch 11's form (explorations/compile-ladder/plan-11/manifest/lists11.py) for the redesigned workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on,
# and no process position or harness fact, which the brief's role text and the fortress-repo skill carry. Each
# briefing entry is a pair: its facts-extract.sh key and one line on why it is there and what the rung does with
# it. gen12.py renders the lines at the end of each rung worker's brief, in the order of the briefing. A checks list
# is a sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. `python3 lists12.py` checks
# every key with facts-extract.sh --check (each must match exactly one place) and every reason's form; it is run
# again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
TC = SRC + '/scala_src/typechecker'

PIR = "positions:A type parameter the arguments do not fix"
STD = "positions:The specification stays the standard"
COMPRISES = "positions:The comprises passages read at the level of values"
SPECREC = "positions:Every change to the specification is recorded with its reason"
S1 = "positions:The S1 form"
LIBP = "positions:The library's own practice is the standard"
RANGES = "positions:Scalar ranges are over ZZ32 only"
COUNTP = "positions:The checker count is measured, never red"
ORDER = "positions:The order of the work after batch 10"
SUMP = "positions:SUM and PROD without the Number catch-all"
MAYBE = "positions:Maybe's empty case"
INF = "doc:Specification/basic/inference.tex#"
CHG = "doc:Specification/appendices/changes.tex#"
OVL = "doc:Specification/advanced/overloading.tex#"
RRT = "doc:explorations/compile-ladder/rung-range-types/"
RCE = "doc:explorations/compile-ladder/rung-checker-expected-type/"
RWO = "doc:explorations/compile-ladder/rung-walk-open-param/"
RGS = "doc:explorations/compile-ladder/rung-generator-slips/"
P1J = "doc:explorations/reviews/p1-judgement.md#"
LIBRULE = "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement"
OPENFACT = "Under walk, a type parameter whose bound mentions itself and that nothing at a call fixes is left open"

W_BRIEFING = [
  (STD, "The text is the standard: rows 649 and 653 are static errors by the traits chapter, row 647 by the Meet Rule, and walk refuses each at load; row 648 is a walk defect against the object expression's text."),
  (COMPRISES, "The Meet Rule's covering declarations, which your check of a generic provider accepts as walk's load check of a declared type does."),
  ("ledger:649", "Your first load check: an object that inherits an abstract method and gives it no body is refused at load; promote its test with its load key, and cover an object expression too."),
  ("ledger:653", "Your second load check, walk's half only: an override that overrides nothing is refused at load; write the owed XXXOverrideNothingWalk first, then promote it. The checker's half waits on row 650."),
  ("ledger:647", "Your third load check: the Meet Rule for Functional Methods on a generic object and on an object expression in a generic function; say whether you check the declaration or the instantiation, and why."),
  ("ledger:648", "Your binding order: a top-level variable initialised with an object expression stops at load because the lifted constructors are bound after the variables; bind them first; promote its test."),
  ("ledger:614", "What batch 11 built: walk reads what each trait provides by the traits chapter; your checks for rows 649 and 653 sit beside that bookkeeping."),
  ("ledger:615", "The landed reading of overridden, a type's own override declarations, which row 653's check follows; its pin keeps its verdict."),
  ("ledger:618", "Walk's Meet Rule check on object expressions without static parameters, batch 11's; row 647 extends it to the generic case."),
  ("ledger:570", "The checker's half of rows 618 and 647, not yours: after your rung walk refuses at load pairs the checker still accepts; say so in your report."),
  ("ledger:650", "The code generator's override, not yours: row 653's compiled half waits on it; a note, not a repair."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "The two sentences you make true under walk: an object inheriting an abstract method must define a body, and an override that overrides nothing is a static error."),
  (OVL + "Meet Rule", "The Meet Rule for Functional Methods per providing type, covering declarations among it, which applies to generic declarations and object expressions as to declared objects."),
  ("doc:Specification/basic/expressions/object.tex#Object Expressions", "What an object expression evaluates to: the text row 648's repair follows."),
  (RWO + "REPORT.md#1. What changed and why", "Batch 11's rung W on row 614: how walk now computes what a trait provides and what an override overrides, the bookkeeping your checks join."),
  (RWO + "SKEPTIC.md#3. Findings and corrections", "The skeptic that found rows 647, 648 and 649, with the programs and the outputs it rests on."),
  ("doc:explorations/compile-ladder/rung-checker-overloading/SKEPTIC.md#2. Findings, each with the output it rests on", "The skeptic that found row 653, with its program on both paths."),
  ("code:" + EV + "/BuildEnvironments.java#void checkFunctionalMethodMeets()", "Walk's load check of the Meet Rule, which visits declarations without static parameters: where row 647's generic case joins it."),
  ("code:" + EV + "/BuildEnvironments.java#public void finishObjectTrait(ObjectDecl x, FTypeObject ftt)", "Where an object expression's type is finished and checked only without static parameters: row 647's other site."),
  ("code:" + EV + "/values/OverloadedFunction.java#public static final class FunctionalMethodMeets", "The check itself, per providing type, built by batch 10's rung W; a generic provider is one more."),
  ("code:" + EV + "/values/Constructor.java#public void finishInitializing()", "Where walk builds an object's methods from what its traits provide: the place for row 649's check that every inherited abstract method has a body."),
  ("code:" + EV + "/values/Constructor.java#private Set<Applicable> overriddenInTraits()", "Row 614's bookkeeping of what each trait's override declarations override: the place for row 653's check that an override overrides something."),
  ("code:" + SRC + "/interpreter/env/CUWrapper.java#public void initVars()", "Row 648: the lifted constructors are registered after the component's variables are visited."),
  ("Walk applies at load the Meet Rule for Functional Methods", "What batch 10 and 11 built at load and the residues they left, rows 647 among them."),
]
W_CHECKS = [
  STD, COMPRISES,
  "ledger:649", "ledger:653", "ledger:647", "ledger:648", "ledger:615", "ledger:570",
  "doc:Specification/basic/traits.tex#Method Declarations", OVL + "Meet Rule",
  "code:" + EV + "/values/Constructor.java#private Set<Applicable> overriddenInTraits()",
]

C_BRIEFING = [
  (PIR, "A result-only parameter the arguments do not fix takes its bound, never Bottom: so the checker must pass in the type the text requires, at a label body and at a repeated operator."),
  (STD, "The text says the type each context gives; the checker passes it in. Row 651 is a crash where the text gives a check."),
  (ORDER, "The answer to batch 11's Q2: a typecase clause takes the enclosing expected type by the union rule; Q48 reads a label body the same way."),
  (COUNTP, "The count and the distance are reported and never red."),
  (SPECREC, "Why the inference chapter's two lists change under Q48, in the amended Appendix I entry."),
  (S1, "The form of your text change: the lists revised in place with a callout, the entry amended with its reason."),
  ("ledger:644", "Your first repair: the multifix fallback drops the expected type; try the multifix application with it, else check the left-associated applications with it, as the loose juxtaposition does since rung E."),
  ("ledger:651", "Your second repair: a written static argument is checked against its bound with the other written arguments not put in; substitute them; promote both expected failures."),
  ("ledger:642", "Under Q48 (default yes): the label body and the with values of its exits take the expected type; promote XXXInferResultOnlyLabelBody; one site, String.fss:431."),
  ("ledger:455", "The argument faces, not yours at Q48's default: XXXInferContextDrops keeps them as an expected failure; a note."),
  ("ledger:560", "Item 36's thirteen sites, twelve cleared by rung E; row 642 is the thirteenth."),
  ("ledger:627", "Rung E's renaming of a method's own static parameters, which exposed row 651's second shape; the renaming is right."),
  (INF + "The Static Arguments of a Call", "The rule, and at inference.tex:128-141 the list of contexts with an expected type: an operator application is on it (row 644), and under Q48 the label body joins it."),
  (INF + "A Numeral Whose Conversions Tie", "The chapter's end, and at inference.tex:262-264 the list of what it does not yet describe, which under Q48 loses the label body and keeps the argument of a call."),
  ("doc:Specification/basic/expressions/label.tex#Label and Exit", "The type of a label: the union of its body's last expression and its exits' with values, the form Q48 reads as a typecase's."),
  ("doc:Specification/basic/expressions/typecase.tex#Typecase Expressions", "The union rule the curator read for a typecase clause (batch 11's Q2), the model for the label body."),
  ("doc:Specification/basic/operators/chained-multifix.tex#Chained and Multifix Operators", "How an operator repeated between operands is read: the multifix application where one applies, else the binary ones; the application has the expected type either way."),
  ("doc:Specification/basic/expressions/method-invocation.tex#Dotted Method Invocations", "A dotted method invocation with written static arguments, row 651's shape."),
  (CHG + "The contexts that give a call an expected type", "Rung E's Appendix I entry, which names the label body as outside the list; under Q48 you amend it in the S1 form."),
  (RCE + "REPORT.md#8. Questions for the curator", "Where row 642's question was put, with its yes and no."),
  (RCE + "SKEPTIC.md#2. A written static argument whose bound names a renamed parameter", "Row 651's second shape, the trace to staticArgsMatchStaticParamsForApp, and the repair the skeptic names."),
  (RCE + "SKEPTIC.md#3. An operator repeated between three operands gets no expected type", "Row 644 as the skeptic found it, with the program and the output."),
  ("code:" + TC + "/impls/Operators.scala#case SAmbiguousMultifixOpExpr(info, infixOp, multifixOp, args)", "Row 644's site: the multifix try and the left-associated fallback, both without the expected type."),
  ("code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)", "The loose juxtaposition since rung E: the multifix try with the expected type and the fallback with it, the model for row 644."),
  ("code:" + TC + "/impls/Misc.scala#case label@SLabel(SExprInfo(span, paren, _), name, body)", "Row 642's site: the body checked with no expected type, and the exit types joined with it."),
  ("code:" + SRC + "/scala_src/useful/STypesUtil.scala#def staticArgsMatchStaticParamsForApp(", "Row 651's site: each written argument against its bound, the other written arguments not substituted."),
  ("The compiled checker gives a call its expected type", "What rung E built: the four contexts and the renaming; your rung adds the repeated operator and, under Q48, the label body."),
]
C_CHECKS = [
  PIR, STD, ORDER,
  "ledger:644", "ledger:651", "ledger:642", "ledger:455",
  INF + "The Static Arguments of a Call", INF + "A Numeral Whose Conversions Tie",
  "doc:Specification/basic/expressions/label.tex#Label and Exit",
  "code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)",
]

R_BRIEFING = [
  (RANGES, "Scalar ranges are over ZZ32 and the public range traits stay generic: the bounds check moves to the ZZ32, pair and triple kinds with its callers (item 40, way a)."),
  (LIBP, "Each repair in the library's own spelling: a body its declared type cannot hold is a fail (Q49), the ranges' own order is PCMP (Q50), a missing indices is written as ZeroIndexed writes bounds (row 658)."),
  (ORDER, "The answer to batch 11's Q3: item 40's way (a), the generic bodies moved to the ZZ32 kinds, which row 655's move completes."),
  (COUNTP, "The count and the distance are reported and never red; they are your rung's test, before from batch 11's landed tables."),
  (LIBRULE, "The library rule as the curator reads it: extend only where the library has a form for one type, rank or sibling and lacks it for another, and cite the precedent line; row 658's 0 # |s| cites ZeroIndexed's bounds."),
  ("ledger:655", "Your main move: checkSelection's > and < on I, two sites; it moves to the ZZ32 kinds with its three generic callers, which become abstract in the generic traits."),
  ("ledger:657", "Under Q50 (default yes): the rank-2 and rank-3 checks compare point by point with PCMP, a value walk prints; the pin at RangeKindBodies.fss:94 changes with its before and after listed."),
  ("ledger:654", "FullRange.narrowToRange over an open range, one site: the sibling's typecase, a FullRange meet, or a body at each ZZ32 kind; the library's own way, and why."),
  ("ledger:656", "Under Q49 (default way a): fail bodies for the open range's five methods, five sites; five values walk prints become stops, listed with their values today."),
  ("ledger:658", "PrefixSet declares no indices, a walk stop: 0 # |s|, as ZeroIndexed's bounds; one walk test failing on the base."),
  ("ledger:608", "ImmutableArray1 reads r'.lower where FullRange declares left: r'.left.get as the Array1 twin reads, the stride kept; one site."),
  ("ledger:600", "Item 40's row, closed by rung L: the eleven sites it cleared and the seven it left, rows 655 and 656; how it moved CMP, FORWARD_CMP and |self| to the ZZ32 kinds, the model for your move."),
  ("ledger:634", "The tuples' lexicographic order the generic check dispatches to today, and the team's doubt about it; under Q50 the moved check uses PCMP instead."),
  ("ledger:659", "A stop you do not touch: a bounded range of rank 2 or 3 strided both ways; a note if your move meets it."),
  ("ledger:577", "The distance stage's classes read by stale line ranges: count your sites by row, never by class."),
  (RRT + "REPORT.md#9. Decisions", "Rung L's decisions: what it moved and how (3, 5, 8, 9), and what it left for you (4, 6, 7), with the ways it did not take."),
  (RRT + "REPORT.md#10. Defects and their homes", "The rows rung L opened, 654 to 659, each with its home and its measurement."),
  ("doc:Specification/basic/expressions/ranges.tex#Ranges", "The text describes no range of rank 2 and no method of the open range; your text change is none."),
  ("code:Library/RangeInternals.fss#checkSelection", "The bounds check you move, with its two comparisons on I."),
  ("code:Library/FortressLibrary.fss#trait Range[", "The first generic caller, Range.narrowToRange(other: Range[I]), which becomes abstract."),
  ("code:Library/FortressLibrary.fss#trait BoundedRange[", "The second generic caller."),
  ("code:Library/FortressLibrary.fss#trait FullRange", "The third generic caller, rung E's site, and row 654's sibling body beside it."),
  ("code:Library/RangeInternals.fss#trait BoundedRange2D", "Batch 11's named meet of rank 2 with its fail bodies, a precedent for Q49's way and a kind that takes a moved body."),
  ("code:Library/RangeInternals.fsi#opr SCMP(a: ZZ32, b: ZZ32): Comparison..opr PCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison", "The comparisons declared at ZZ32 and the two tuple types, PCMP among them: what the moved checks compare with under Q50."),
  ("code:Library/FortressLibrary.fss#object TrivialOpenRange", "The open range's object and its five methods, row 656's sites, under Q49."),
  ("code:Library/FortressLibrary.fss#trait ZeroIndexed", "The precedent line for row 658: bounds written as 0 # |self|."),
  ("code:Library/PrefixSet.fss#value object IndexValuePrefixSetGenerator", "Row 658's site, the indices that read s.indices."),
  ("The one library's range types provide a declaration on the meet", "What batch 9's rung R and batch 11's rung L built for the ranges, which your rung completes."),
  ("The one library's scalar ranges are over", "Batch 7R's ZZ32 kinds, the model for moving the generic bodies."),
]
R_CHECKS = [
  RANGES, LIBP, LIBRULE,
  "ledger:655", "ledger:657", "ledger:654", "ledger:656", "ledger:658", "ledger:608",
  RRT + "REPORT.md#9. Decisions",
  "code:Library/RangeInternals.fss#checkSelection",
  "code:Library/FortressLibrary.fss#trait ZeroIndexed",
]

G_BRIEFING = [
  (LIBP, "Each repair in the library's own spelling: the devices typed at the type the api and the sibling Set already write, and nothing new declared."),
  (LIBRULE, "The library rule as the curator reads it: your rung extends nothing; where you write a type anew, cite the line that already writes it, Set's Intersection and the api's lift(r: R)."),
  (PIR, "The instance rule: never Bottom. Walk leaves an F-bounded parameter open since batch 11, which is what lets the typed reductions run; D2's plain bounds still get Bottom, which probe P2 measured."),
  (SUMP, "Why the reductions carry Any devices: answer 7 took the Number catch-all away, and walk then gave an unwritten static argument Bottom."),
  (COUNTP, "The count and the distance are reported and never red; they are your rung's test, before from batch 11's landed tables."),
  (MAYBE, "Maybe's parametric spelling Nothing[T] is the one library's: the lifted type you write is Maybe[R], never a bare Nothing."),
  ("ledger:628", "Your repair: simpleJoin and lift at R, the lifted type Maybe[R] where AnyMaybe stood, in the two traits, the lifted monoid wrapper and the identity-less big operators' declared types; 13 sites."),
  ("ledger:424", "The F-bounded half closed by rung W: walk leaves the parameter open, so a typed simpleJoin accepts every element."),
  ("ledger:425", "The checker's side: an unwritten reduction is still refused compiled; not yours."),
  ("ledger:645", "The empty reduction's identity under walk, an expected failure that keeps its verdict; not yours."),
  ("ledger:473", "BIG MINMAX's open half, an expected failure that keeps its verdict or moves: a point to report."),
  ("ledger:433", "The fusion pairs' distribute, which declares PossibleReductionPair[AnyMaybe]: it follows the lifted type's spelling, its bounds stay, its six sites stay; a point to report if they move."),
  ("ledger:436", "The identities' else => 0, not yours: additiveIdentity and multiplicativeIdentity stay as they are."),
  ("ledger:631", "embiggen's Comprehension[T,T,Any,Any], its own Any devices and a team test line; not yours."),
  (P1J + "5. Points still open", "D2's case, a big operator's plain-bounded parameters at Bottom: what P2 measured against your typing, and what stays out."),
  (P1J + "3. The work for batch 11", "The judgement's records paragraph on row 628: typing the reductions at their element type is this rung, after rung W."),
  (RGS + "REPORT.md#8. The sites left, each with its row", "Batch 10's rung G on the thirteen sites it left under row 628, with the two stops it measured before rung W."),
  ("doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions", "The operators your reductions implement; the text describes no lifting, so your text change is none."),
  ("doc:Specification/basic/expressions/if.tex#If Expressions", "The generator binding if av <- a, which needs a Condition: why the lifted type must be Maybe[R], not AnyMaybe."),
  ("code:Library/FortressLibrary.fss#trait AssociativeReduction", "The trait with all three devices: simpleJoin(a: Any, b: Any), the AnyMaybe join and lift(r: Any)."),
  ("code:Library/FortressLibrary.fss#object LiftedCommutativeMonoidReduction", "The lifted monoid wrapper, also over AnyMaybe, which takes the same lifted type."),
  ("code:Library/FortressLibrary.fss#trait MonoidReduction", "lift(r: Any): R = r against the api's lift(r: R): the one-line device, one site."),
  ("code:Library/FortressLibrary.fss#object MinReduction", "An implementer that declares simpleJoin without types; the eight implementers are the abstract-method sites."),
  ("code:Library/FortressLibrary.fss#object NewlineReduction", "The implementer at String, the eighth site."),
  ("code:Library/FortressLibrary.fsi#trait AssociativeReduction", "The api's declarations you make the component meet: lift(r: R), and the lifted type you change there too."),
  ("code:Library/FortressLibrary.fsi#trait ActualReduction", "The abstract reduction with lift(r: R) and unlift(l: L), the shape every device must meet."),
  ("code:Library/FortressLibrary.fss#value trait AnyMaybe", "The trait that stays: Maybe extends it and HasRank excludes it."),
  ("code:Library/Set.fss#object Intersection", "The sibling that already names Maybe[Set[E]] as its lifted type: your precedent line."),
  ("code:Library/FortressLibrary.fss#object UniqueItemMeetReduction", "A monoid reduction under a plain-bounded big operator, BIG SQCAP[T]: one of the clause forms P2 ran and your test asserts."),
  (OPENFACT, "What rung W built: the open parameter, every value passing where walk checks against it, and the cases that still get Bottom."),
]
G_CHECKS = [
  LIBP, LIBRULE, PIR,
  "ledger:628", "ledger:433", "ledger:473",
  P1J + "5. Points still open",
  "code:Library/FortressLibrary.fss#trait AssociativeReduction",
  "code:Library/FortressLibrary.fsi#trait AssociativeReduction",
  "code:Library/Set.fss#object Intersection",
]

IDS = ('W', 'C', 'R', 'G')
LISTS = {
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
  'C': ([k for k, _ in C_BRIEFING], C_CHECKS),
  'R': ([k for k, _ in R_BRIEFING], R_CHECKS),
  'G': ([k for k, _ in G_BRIEFING], G_CHECKS),
}
REASONS = {'W': W_BRIEFING, 'C': C_BRIEFING, 'R': R_BRIEFING, 'G': G_BRIEFING}


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
