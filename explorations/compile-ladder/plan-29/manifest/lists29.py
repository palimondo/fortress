# The briefing and checks lists of climb batch 29's rungs (CLIMB-BATCH-29.md, section 1, "The manifest, rung by
# rung"), made from plan-28/manifest/lists28.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is there, and CHECK where the
# record marks it (check): the checks list, read by the skeptic, a repair round and a judge, is those keys in order.
# No key holds a backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading
# without its backticks.
# Changed from lists28.py: the rungs are the record's six, N, C, F, G, S and T, in the manifest's order; the keys are
# each rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks dropped and
# REC, PROTO, PROBES and JUDGE spelled out as section 1's opening paragraph gives them, each with the record's reason,
# its first letter capitalized but where it opens with a code name (asFloat, openRange, x); a check is marked on its
# entry. The record's one forks key, REC "Forks the batch takes", is section 3's forks whole; in its place each rung
# reads, as in climb batch 28, the batch's forks, its own and those of each rung that shares a file with it, by the
# @WORDS filter on that heading's bold leads ("For the whole batch", "Rung N", ...), each paragraph matched by its
# lead alone and each key one place. forks_keys() builds them from LEAD and SHARED, section 4's "The files that two
# rungs share", which check29.js reads again from the record; that list's last line, TupleOrderMixedRefused.test, is
# G's alone and shares nothing. T shares no file, so it reads the batch's forks and its own. lists(ids) gives the
# lists of the rungs ids, a rung left out by --without dropping from the others' forks; LISTS and REASONS are
# lists(IDS).
# `python3 -B lists29.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form, in $FORTRESS_HOME (this checkout by default), and prints the bytes of each rung's forks keys, and of
# section 3's forks whole beside them; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-29.md#"
PROTO = "doc:explorations/compile-ladder/plan-29/probes/literal-default.md#"
PROBES = "doc:explorations/compile-ladder/plan-29/PROBES.md#"
JUDGE = "doc:explorations/reviews/literal-design-judgement-2026-11-08.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# Where the record lists its one forks key: forks_keys() takes its place.
FORKS = ('forks',)
FORKS_SECTION = REC + 'Forks the batch takes'
FORKS_REASON = 'The defaults your rung builds, each with the ways not taken.'
# Section 3's bold leads under "Forks the batch takes", each the words of its key.
LEAD = {'batch': 'For the whole batch', 'N': 'Rung N', 'C': 'Rung C', 'F': 'Rung F', 'G': 'Rung G', 'S': 'Rung S',
        'T': 'Rung T'}
# Section 4, "The rule the rungs keep, and how they meet": the files that two rungs share, with the rungs that edit
# each, in the record's order of their places; the last is G's alone.
SHARED = (
  (SRC + 'scala_src/typechecker/impls/Functionals.scala', 'NC'),
  (SRC + 'interpreter/evaluator/EvaluatorBase.java', 'NG'),
  (SRC + 'interpreter/evaluator/Evaluator.java', 'SN'),
  (SRC + 'compiler/codegen/CodeGen.java', 'FC'),
  ('ProjectFortress/tests/TupleOrderMixedRefused.test', 'G'),
)


def _and(xs):
    return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]


def forks_keys(rid, ids):
    """The forks keys of rung rid among the rungs ids: the batch's, its own, then each other rung of ids, in the
    manifest's order, that edits a file of SHARED with it."""
    out = [(FORKS_SECTION + '@' + LEAD['batch'], 'The defaults for the whole batch, which every rung keeps, each with the ways not taken.'),
           (FORKS_SECTION + '@' + LEAD[rid], FORKS_REASON)]
    for o in ids:
        files = [os.path.basename(f) for f, rs in SHARED if rid in rs and o in rs and o != rid]
        if files:
            out.append((FORKS_SECTION + '@' + LEAD[o], "Rung %s's defaults: it also edits %s, at other declarations." % (o, _and(files))))
    return out


N_BRIEFING = [
  ('P-174', "The decision you build: the numeral types, their four numbers as fields, a program's type through its coercion.", CHECK),
  ('P-76', "An integer numeral's conversions, exact into the five integer types and QQ, one rounding into RR64 and RR32, and walk's half.", CHECK),
  ('P-172', "A float numeral's conversions, its pairs, and walk's conversion at a binding, a parameter and a field.", CHECK),
  ('P-173', 'Where a numeral converts, the default where nothing fixes a type, the float tie, and walk place by place before P-12.', CHECK),
  ('P-165', 'asFloat on each number type, and an = pair for each coercion.'),
  ('P-168', "SEQV, with the one exception of two numeral values inside a coercion's body.", CHECK),
  ('P-169', 'The 24 numeral glue bindings, which leave with the two objects.'),
  ('P-49', 'A declaration that fits as it is wins over one that coercion reaches, the rule your walk dispatch keeps.'),
  ('P-37', 'No declaration is added to the prelude, whose names stay.'),
  ('F-74', "Walk's integer numeral by its value today, which your rule keeps where nothing fixes a type."),
  ('F-299', "Walk's loader of helpers and its carriers, which your rounding helpers meet."),
  ('ledger:943', 'A float numeral bound at RR64 stays a FloatLiteral under walk, which closes.', CHECK),
  ('ledger:944', 'QQ takes no float numeral, which closes.', CHECK),
  ('ledger:454', 'NN32, NN64 and RR32 bindings refuse numerals, which closes on both halves.', CHECK),
  ('ledger:443', 'Walk refuses a numeral beyond ZZ32 at RR64, which closes.'),
  ('ledger:578', "IntLiteral's own arithmetic, which goes with the object and its test."),
  (JUDGE + '1. Coherence', "The design's one rule and its six repairs, which the curator took.", CHECK),
  (JUDGE + 'Appendix: the test list and citations', 'The programs whose walk answers your tests assert.', CHECK),
  (PROTO + 'Step 1, the library', "The prototype's library change, which you rename and complete.", CHECK),
  (PROTO + '4.5 Walk', 'The 71 walk failures of the library change alone, and why walk needs your rule.'),
  (PROTO + '6. A program', "A program's own number type, an interval and bfloat16, your own-type tests."),
  (PROTO + '7.1 A hybrid', "The four numbers, walk's FFloatLiteral parts and the reduced-value SEQV."),
  (PROBES + 'Probe 1. The', "The pairs kept, count and distance 0, and RR32's missing coercion from an integer numeral.", CHECK),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number', 'The object you remove, with its 21 glue bindings.', CHECK),
  ('code:Library/FortressLibrary.fss#value object Ratio(num: ZZ, den: ZZ) extends { QQ }', "The library's value object with fields, the form of yours."),
  ('code:' + SRC + 'compiler/Types.java#public static void useFortressLibraries', 'The switch of names by library, which your two names join.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/FFloatLiteral.java#public class FFloatLiteral', "Walk's float numeral today, its parts and its double-based SEQV."),
  FORKS,
]

C_BRIEFING = [
  ('P-173', 'The decision whose checker you build: where a numeral converts, the default, the tie and the range.', CHECK),
  ('P-174', "A numeral type written only as a parameter type, and a program's type refusing a numeral without a coercion from the numeral type.", CHECK),
  ('P-49', "The checker's two attempts, which your default ranks within.", CHECK),
  ('P-40', 'A size used as a number converts to ZZ32, the type a nat value takes.', CHECK),
  ('P-74', 'An exact conversion is implicit, so a ZZ32 default still converts to ZZ64.'),
  ('P-37', 'No edit of the prelude, whose names your rule must exempt.'),
  ('P-148', "The checker's timing, a change and a pass.", CHECK),
  ('F-57', "A numeral's type by path and library today."),
  ('F-73', 'The coercion inference whose candidates the default narrows.'),
  ('ledger:79', 'A numeral at Object and Any stays IntLiteral compiled, which closes.', CHECK),
  ('ledger:946', 'A variable bound from a numeral read as ZZ32 at a tie, which closes.', CHECK),
  ('ledger:486', 'A nat value typed IntLiteral, which closes.', CHECK),
  ('ledger:325', 'A numeral out of range at run time, which closes statically.', CHECK),
  ('ledger:506', 'The 64-combination cap, whose test turns red under the default.'),
  ('ledger:362', "A float numeral's rendering, whose test turns red under the default."),
  (JUDGE + '1. Coherence', 'The definition of fixes a type, the default for numerals only, the narrowest default, refuse rather than chain.', CHECK),
  (JUDGE + 'Appendix: the test list and citations', 'The compiled answers your tests assert.'),
  (PROTO + 'Step 2, the checker', "The prototype's checker, which you complete.", CHECK),
  (PROTO + '4.3 The compiled suites', 'The tests that flip or break, and how the prototype respelled three.', CHECK),
  (PROBES + 'Probe 1. The', 'Step 5 and the chain not needed once the pairs are kept.', CHECK),
  ('doc:explorations/reviews/literal-fork-2026-11-08.md#3.7 A defect found on the way', "Row 946's mechanism."),
  ('code:' + SRC + 'scala_src/typechecker/staticenv/KindEnv.scala#def getType(x: Name)', 'Where a nat value is typed IntLiteral.'),
  ('doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie', 'The tie rule, which the default widens.'),
  FORKS,
]

F_BRIEFING = [
  ('P-173', 'An expression of numerals alone folds exactly before the checker into a signed constant with its three defaults.', CHECK),
  ('P-174', "A program's coercion called once per class, at load, one object per site, review-queue item 440's default.", CHECK),
  ('P-172', 'One rounding into RR64 and RR32, and row 862.', CHECK),
  ('P-12', 'Walk runs the phases it runs today, the fold among them by your change.'),
  ('F-262', "Today's fold of prefix minus, the one sign a numeral node carries."),
  ('F-118', "How the code generator carries a numeral's value today."),
  ('ledger:862', 'Two or three roundings, which closes with XXXFloatNumeralOneRounding promoted.', CHECK),
  (JUDGE + '1. Coherence', "Repair 3, the fold's signed constant, and a program's coercion seeing written numerals only.", CHECK),
  (JUDGE + '4. The sub-choices', 'x = 7/2 a QQ, and the fold free and favoured by the Draft.'),
  (PROTO + 'Step 3, the fold', "The prototype's fold, which you complete and correct.", CHECK),
  (PROBES + 'Probe 2. The fold phase', "The phase in walk's order, 789 of 791, and the two tests.", CHECK),
  (PROBES + 'Probe 3. Two defects', 'The CHOOSE crash and the BOXPLUS fold.', CHECK),
  ('code:' + SRC + 'compiler/desugarer/IntegerLiteralFoldingVisitor.java#private Node foldBinaryOperator', 'The fold you rework.', CHECK),
  ('code:' + SRC + 'compiler/phases/PhaseOrder.java#static public final PhaseOrder[] interpreterPhaseOrder', "Walk's phase order, which gains the fold."),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forFloatLiteralExpr', 'The float constant, rounded two or three times today.'),
  ('doc:Specification/basic/expressions/constant.tex#Types of Static Expressions', 'The static expressions and the concatenation of literals.', CHECK),
  ('doc:Specification-1.0-frozen/basic/expressions/literals.tex#Literals', 'The rational value of a radix-point numeral and the one rounding.'),
  ('doc:explorations/reviews/literal-fork-2026-11-08.md#4.2 Reading B', "The fold's two parts and their sizes by reading."),
  FORKS,
]

G_BRIEFING = [
  ('P-48', "A type parameter that a call does not fix takes its bound; dispatch under walk takes the value's type, read here as its trait.", CHECK),
  ('P-167', 'The five stop being types a program sees, which your messages extend.'),
  ('P-154', "Row 774's walk half waits for row 364 for lists, integer and string."),
  ('P-74', 'Promotion, which the trait keeps.'),
  ('F-74', "Walk's integer numeral by its value, an Int, which you read at ZZ32."),
  ('F-328', 'The ilk that already prints the trait.'),
  ('F-229', 'The one type ZZ32 comprises.'),
  ('ledger:364', 'The gap you close, number and string halves.', CHECK),
  ('ledger:432', 'A bare big operator over a list of numerals, which closes.', CHECK),
  ('ledger:721', 'The array factories at Int, which closes.', CHECK),
  ('ledger:722', 'openRange at Int, which closes.'),
  ('ledger:717', "The inner comprehension at its elements' class, whose integer case closes."),
  ('doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#1. Where walk instantiates at a run-time class', 'The sites.', CHECK),
  ('doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#2. The ways (item 1)', 'Way A, its size, its flips and LongStringTests.', CHECK),
  ('doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#3. What else still shows the five to a program (item 2)', 'The messages and Reflect.', CHECK),
  ('doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#4. Conflicts with decisions (item 3)', 'P-48 and P-154 as the review read them.', CHECK),
  ('code:' + SRC + 'interpreter/glue/prim/ObjectPrims.java#static java.lang.String traitOf(FType t)', 'The test of the five, which you move.', CHECK),
  FORKS,
]

S_BRIEFING = [
  ('P-171', 'The decision you build, its walk way and its compiled way (i).', CHECK),
  ('P-168', 'Strings are reference objects, their text equality their =.', CHECK),
  ('ledger:945', 'Each evaluation makes a new string, which closes.', CHECK),
  ('doc:explorations/reviews/literals-2026-11-08.md#6.1 String literals', 'Ways S-b and S-d, the prototypes protoS and protoC, and their tests.', CHECK),
  ('doc:explorations/reviews/literals-2026-11-08.md#2.1 String literals', "Today's answers on both paths."),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forStringLiteralExpr', "Walk's literal, made at each evaluation.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/FString.java#public boolean seqv(FValue v)', "Walk's string SEQV, identity.", CHECK),
  ('code:' + SRC + 'nativeHelpers/equalityRule.java#static boolean sEquiv(Object a, Object b)', 'The compiled SEQV, a string a reference object.', CHECK),
  ('doc:Specification/basic/expressions/constant.tex#Types of Static Expressions', 'The fold of a concatenation of literals.', CHECK),
  ('doc:Specification/appendices/changes.tex#Which objects are value objects', 'Strings as reference objects, whose effect your change narrows for literals.'),
  FORKS,
]

T_BRIEFING = [
  ('P-173', "The default, the conversion, the tie, the fold, and the Draft's text it contradicts, for Appendix I.", CHECK),
  ('P-174', "The numeral types and their four numbers, and the binary chapter's text it contradicts.", CHECK),
  ('P-172', "The float numeral's conversions and the coercions of numbers.tex:43.", CHECK),
  ('P-76', "The integer numeral's conversions."),
  ('P-171', 'A string literal one object, and the folded concatenation.', CHECK),
  ('P-165', 'asFloat on each number type, and the sentence of numbers.tex it follows.'),
  ('P-96', 'The revision form.', CHECK),
  ('P-40', 'A size used as a number converts to ZZ32, against trait-parameters.tex:84-86.'),
  ('P-26', 'The bend P-173 takes, which its entry owns.'),
  (JUDGE + '3. Against the Draft', 'What the design keeps, changes in form and contradicts.', CHECK),
  (JUDGE + '1. Coherence', 'The six repairs, each a sentence of yours.'),
  ('doc:explorations/reviews/literal-fork-2026-11-08.md#5.3 The specification text', "Reading B's text, chapter by chapter.", CHECK),
  ('doc:Specification-1.0-frozen/basic/expressions/literals.tex#Literals', "The Draft's numeral types and sentences, the original text you quote.", CHECK),
  ('doc:Specification/basic/expressions/literals.tex#Literals', 'The revised chapter you revise again.', CHECK),
  ('doc:Specification/basic/expressions/constant.tex#Types of Static Expressions', 'The constant traits and the two concatenations.'),
  ('doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie', 'The section you widen.'),
  ('doc:Specification/appendices/changes.tex#The type of an integer numeral', 'The entry you revise, whose Effect the design makes false.', CHECK),
  ('doc:Specification/appendices/changes.tex#Integers in floating-point expressions', 'The entry whose box names IntLiteral.'),
  FORKS,
]


ORDER = ('N', 'C', 'F', 'G', 'S', 'T')
_B = {'N': N_BRIEFING, 'C': C_BRIEFING, 'F': F_BRIEFING, 'G': G_BRIEFING, 'S': S_BRIEFING, 'T': T_BRIEFING}
IDS = tuple(r for r in ORDER if _B[r])
assert all(_B[r].count(FORKS) == 1 for r in IDS), 'each briefing names the forks once'


def lists(ids=IDS):
    """(LISTS, REASONS) for the rungs ids: LISTS[r] is (briefing keys, checks keys), REASONS[r] the (key, reason) pairs."""
    assert all(r in IDS for r in ids), ids
    out_l, out_r = {}, {}
    for r in ids:
        es = []
        for e in _B[r]:
            es += [(k, why, False) for k, why in forks_keys(r, ids)] if e is FORKS else [(e[0], e[1], len(e) > 2 and e[2])]
        out_l[r] = ([k for k, _, _ in es], [k for k, _, c in es if c])
        out_r[r] = [(k, why) for k, why, _ in es]
    return out_l, out_r


LISTS, REASONS = lists(IDS)


def reason_problems(rid, reasons=None):
    out = []
    for k, r in (reasons or REASONS)[rid]:
        if not r or not r.strip():
            out.append((k, 'no reason'))
        elif '\n' in r or '`' in r or any(ord(c) > 127 for c in r):
            out.append((k, 'a reason is one ASCII line with no backtick'))
        elif not r.endswith('.') or len(r) > 240:
            out.append((k, 'a reason ends with a full stop and is at most 240 characters'))
    return out


if __name__ == '__main__':
    import subprocess, re, sys
    root = _ROOT
    bad = 0
    print('tree', root)
    print('rungs', ', '.join(IDS))
    for rid in IDS:
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
        # The forks keys alone: what each paragraph prints, and what the rung reads of section 3.
        fk = [k for k, _ in forks_keys(rid, IDS)]
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + fk, capture_output=True, text=True, cwd=root)
        sizes = [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
        total = [l for l in r.stdout.strip().splitlines() if l.startswith('Total')]
        print(rid, 'forks', ', '.join(k.split('@')[-1] for k in fk), '|', ' + '.join(map(str, sizes)), '=', sum(sizes), 'bytes |', total[0] if total else r.stderr.strip()[:200])
        if r.returncode or len(sizes) != len(fk):
            print('   PROBLEM a forks key matches no one place'); bad += 1
    # Beside them, what the record's one forks key would give every rung: the heading's section whole.
    r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check', FORKS_SECTION], capture_output=True, text=True, cwd=root)
    sizes = [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
    print('the forks whole,', FORKS_SECTION.split('#')[-1], '|', ' + '.join(map(str, sizes)), 'bytes | exit', r.returncode)
    if r.returncode or len(sizes) != 1:
        print('   PROBLEM the forks heading matches no one place'); bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
