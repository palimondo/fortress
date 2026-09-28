# Generates climb batch N's MANIFEST block from section 3 of the record (CLIMB-BATCH-N.md) and the
# briefing and checks lists of listsn.py beside it, into $FORTRESS_HOME/tmp/manifestn.js; checkn.js
# checks it. The form was batch 7R's generator (explorations/compile-ladder/plan-7r/manifest/gen7r.py)
# with batch 7's RUN switch; since 2026-09-28 it is batch 6.5's (explorations/compile-ladder/plan-6.5/
# manifest/gen65.py) in three respects Pavol decided that day: each tail is its rung's section word for
# word, the record's code-span backticks dropped, followed by its briefing entry by entry with one line
# of reason each (the process review's measure 5); a rung's count and distance before is the last
# landed gate's tables and its per-site list (POSITIONS.md, 2026-09-28, on rungs re-running measurements);
# and LEDGER_FROM and CHECKER_BASE are left unset, the block refusing to load until the coordinator sets
# them at launch. Each line JSON-quoted, ASCII only. Run 1 is I, K, T and M (M, row 484's library rung,
# added by the conversion judgement's decision 2), run 2 is Q.
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from listsn import LISTS, REASONS

ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
REC = os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-N.md')
OUT = os.path.join(ROOT, 'tmp/manifestn.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([IKTMQ])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == ['I', 'K', 'T', 'M', 'Q'], [h.group(1) for h in heads]
ORDER = 'IKTMQ'
FIRST_RUN = 'IKTM'

META = {
  'I': dict(path='/home/user/fortress-infer', minutes=200, writesState=False, testIsStage=False, landsOnlyWith=None),
  'K': dict(path='/home/user/fortress-walkinfer', minutes=220, writesState=False, testIsStage=False, landsOnlyWith=None),
  'T': dict(path='/home/user/fortress-specinfer', minutes=110, writesState=False, testIsStage=False, landsOnlyWith=['I']),
  'M': dict(path='/home/user/fortress-minmax', minutes=90, writesState=False, testIsStage=False, landsOnlyWith=None),
  'Q': dict(path='/home/user/fortress-numeral', minutes=260, writesState=False, testIsStage=False, landsOnlyWith=None),
}
# The rungs whose edits the count stage does not read predict the last landed total (CHECKER_BASE).
PREDICTS_BASE = 'KT'
BLURB = {
  'I': "the compiled checker infers a generic's static arguments with coercion, answer 8's promotion rule its number case and Q1's default for a numeral, chooses a declaration on its declared types before the promotion instantiates it, checks that a call has a most specific declaration, and keeps the expected type at a call written f(x) with a retry without it; rows 401 and 455, row 388's compiled half, the stock crash of a promoted generic; Scala.",
  'K': "walk infers a generic's static arguments with coercion at dispatch by the same rule, its coercion pass considers generic declarations, the declaration it chooses is re-instantiated by the promotion from run-time types, and a generic trait's coercion is applied; rows 389 and 388's walk half, row 486's expected failure; Java.",
  'T': "the specification's type-inference chapter, today notes only, written to rung I's rule in the S1 form (the choice of a declaration, then its instantiation, the numeral tie once), a size used as a value in the ranges section, answer 8's callout and Appendix I; lands only with I; no source and no test assertion.",
  'M': "each integer type, ZZ32, ZZ64, NN32, NN64 and ZZ, declares its own MIN, MAX and MINMAX, as QQ, RR64, the compiler library and the specification's ZZ do, so that walk answers b MAX 1 at answer 8's type; row 484; library only.",
  'Q': "the numeral's own type: the one library takes the compiler library's sibling IntLiteral with its coercions, walk gives every integer numeral that type and converts a body to its declared return type, Number's = answers a numeral, the library's numeral sites the switch breaks respelled; rows 79, 443, 387, 454's integer half; library, Java and specification.",
}
INTRO_RUNG = {
  'I': "I makes the compiled checker infer a generic's static arguments with coercion, answer 8's promotion rule its number case (the narrowest type every number argument converts into), and keep the expected type at a call written f(x), with a retry without it so that a binding's coercion still applies (POSITIONS.md, 2026-09-27, the numerics plans, decision 3); a declaration is chosen on its declared types and only then instantiated by the promotion, and a call with no most specific declaration is refused unless the tie is a numeral's (POSITIONS.md, 2026-09-28, the two decisions of the conversion judgement, decision 1).",
  'K': "K makes walk infer a generic's static arguments with coercion at dispatch, by the same rule: the arguments whose declared types mention a static parameter fix it, the others are converted, and a parameter that stands alone takes the narrowest type its arguments convert into; its coercion pass considers generic declarations, the declaration it chooses is re-instantiated by the promotion from the arguments' run-time types, and a generic trait's coercion is applied (row 389).",
  'T': "T writes the specification's type-inference chapter, today notes only, to the rule rung I builds, in the S1 form, the choice of a declaration first and its instantiation second, and writes Pavol's answer on a size used as a value into the ranges section; it lands only with I.",
  'M': "M gives each integer type its own MIN, MAX and MINMAX, the library's device for row 484 (POSITIONS.md, 2026-09-28, the two decisions of the conversion judgement, decision 2).",
  'Q': "Q gives a numeral its own type: the one library takes the compiler library's sibling IntLiteral with a coercion into each number type, walk gives every integer numeral that type and converts a body to its declared return type (row 387), Number's = answers a numeral correctly, and the library's numeral sites the switch breaks are respelled (POSITIONS.md, 2026-09-27, a numeral's type).",
}
INTRO_STOPS = {
  'I': "for I, a compiled test's verdict changing other than the two it promotes and its own, a new checker error the distance stage shows as caused and the report does not account for, a ladder file moving down, a ranking that lets a declaration needing a conversion win over one that fits the call as it is, an edit to the solver, to compiler/StaticChecker.java or to a file the count or distance stage shadows, any library, walk or specification edit, a binding chosen for a type parameter nothing at the call fixes other than today's, and a line of explorations/run-c4/src/ or explorations/apl/mg/",
  'K': "for K, a changed walk output its comparison does not account for, a changed microGPT value, an overload set whose load-time verdict changes, an edit to bestMatchInternal beyond the re-instantiation of the declaration its subtyping pass chooses, or to the load-time check, unreported, and any edit under interpreter/glue/prim/, to FIntLiteral.java, or to the library, the checker or the specification",
  'T': "for T, any edit under Specification-1.0-frozen/, normative text stating more than rung I builds or than both paths run today (an answer to the team's BottomType question among it), a passage whose new text neither the decisions nor I's section settles (reported, not chosen), an assertion changed in a re-anchored test, and a file another rung edits",
  'M': "for M, a changed walk output other than a call of MIN, MAX or MINMAX now answering at answer 8's type, an overload set of the library that walk refuses after, a changed microGPT value or a line of explorations/run-c4/src/ or explorations/apl/mg/, and an edit to a declaration other than its fifteen, to the compiler library, walk, the checker or the specification",
  'Q': "for Q, a changed walk output its comparison does not account for against probe Q's list, a changed microGPT value or any line of explorations/run-c4/src/ or explorations/apl/mg/, a team test line changed or a team expected failure turning green (XXXextendIntLiteral.fss among them), a comparison of numbers answering differently from the base where the values are equal, a new checker error the distance stage shows as caused and the report does not account for, and an edit to the compiler library, the checker, Specification-1.0-frozen/ or another batch's declaration beyond a numeral site the switch breaks, unreported",
}
INTRO_LIFTED = {
  'I': "I makes the checker accept calls it refuses today, refuses a call with no most specific declaration that it compiles today, changes the message of a call no attempt accepts, and promotes two expected-failure compiler tests (POSITIONS.md, 2026-09-27, the numerics plans, decision 3; 2026-09-28, the two decisions of the conversion judgement)",
  'K': "K changes which static arguments walk infers and which arguments it converts at a generic call, re-instantiates a declaration bestMatchInternal chose, and promotes two expected-failure interpreter tests (the same decisions)",
  'T': "T writes a chapter of the specification and revises a sentence of the ranges section (the same decisions, and 2026-09-28, a size used as a value)",
  'M': "M adds fifteen library declarations that change the answers of MIN, MAX and MINMAX under walk (2026-09-28, the two decisions of the conversion judgement, decision 2)",
  'Q': "Q changes the one library's declared numeral type and every integer numeral's run-time type under walk, declares IntLiteral as the compiler library does, changes the path of Number's = for a numeral, respells library numeral sites, and promotes expected-failure interpreter tests (POSITIONS.md, 2026-09-27, a numeral's type, and the numerics plans; 2026-09-28, the two decisions of the conversion judgement)",
}
OVERLAP_RUNG = {
  'I': "I edits, in ProjectFortress/src/com/sun/fortress/scala_src/, typechecker/impls/Functionals.scala (checkApplicable, checkApplicableWithInference, the checkApplication taking iargs with its ambiguity check, and new methods beside them, not its SCaseExpr case), typechecker/impls/Operators.scala (four cases of checkExprOperators), useful/STypesUtil.scala (moreSpecificCandidate), typechecker/CoercionOracle.scala and possibly typechecker/TraitTable.scala; and adds and promotes tests in ProjectFortress/compiler_tests/.",
  'K': "K edits, in ProjectFortress/src/com/sun/fortress/interpreter/evaluator/, EvaluatorBase.java (inferAndInstantiateGenericFunction), values/OverloadedFunction.java (bestMatchWithCoercion, and the re-instantiation in bestMatchInternal), values/Coercions.java (coercionFor) and possibly types/FType.java; and adds two tests and promotes two in ProjectFortress/tests/.",
  'T': "T edits Specification/basic/inference.tex, one sentence of Specification/basic/expressions/ranges.tex, the callout of Specification/basic-lib/basic-integers.tex, its subsection, two paragraphs of Passages not yet revised and one sentence of The integer type of a range in Specification/appendices/changes.tex, and the messages of tests whose citations its edits move; never Specification-1.0-frozen/ or Specification/fortress.pdf.",
  'M': "M edits, in Library/FortressLibrary.fsi and .fss, three members each of ZZ32, ZZ64, NN64 and ZZ, and in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss three members of NN32; and adds one test in ProjectFortress/tests/.",
  'Q': "Q edits IntLiteral and NN32's coercions in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss; in Library/FortressLibrary.fsi and .fss the comprises clauses of Number and ZZ32, Number's = and exactValue as its device needs, a coerce member in six number types, possibly ZZ32's comparison operators, and the numeral sites the switch breaks, each named; FIntLiteral.java, interpreter/glue/prim/IntLiteral.java, the return check of Simple_fcn.java and, for walk's default, the two methods rung K edited; Specification/basic/expressions/literals.tex, one sentence of conversions-coercions.tex and its subsection of changes.tex; and adds one test and promotes one or two in ProjectFortress/tests/.",
}
OVERLAPS_FIRST = ("No file and no declaration is shared among I, K, T and M. T's text states I's rule and lands only with it; after both are applied the gather checks T's chapter against I's landed tests. "
  "M's calls reach walk's coercion pass, which K edits, but M's declarations are plain and the conversion rule leaves plain declarations as they are; the merged gate runs M's test with K applied. "
  "On the checker, I's ambiguity check can report the MAX family's ties in the one library, which M's declarations resolve; each rung ties its own count and distance to its own edit. "
  "Batches 7, 7R, 7C and batch 6.5's first run have landed in the base: I edits no declaration of theirs (7R's rung J's SCaseExpr case of Functionals.scala lies below I's methods, its import at :15 moving them by one line); T revises the callout and the paragraphs of Passages not yet revised as 7R's rung U and 6.5's rung P left them, and inserts its Appendix I subsection after the last entry there; M's types are headers none of them edited. "
  "The checker count and the distance read I's and M's changes; K and T change nothing they read and predict the last landed total. "
  "The gather applies I, then K, then T, then M. The files every rung reaches are the three record files, folded centrally by the gather.")
OVERLAPS_SECOND = ("Q is alone in this run. Batch N's first run has landed in the base: Q edits two methods rung K edited, for walk's numeral default only, edits the integer types rung M added members to without touching those members, may promote K's row-486 test, and inserts its Appendix I subsection after rung T's. "
  "Batches 7, 7R and 7C and batch 6.5's first run landed earlier: Q edits no declaration of their rungs beyond a numeral site the switch breaks, each named (the identity functions as 6.5's rung G left them among them); if batch 6.5's second run has landed, Q re-reads Number's comprises clause and its =, which its rung V edited. "
  "The checker count and the distance read Q's changes to the FortressBuiltin and FortressLibrary apis. "
  "The files Q reaches beside its own are the three record files, folded centrally by the gather.")

def strip_ticks(t):
    return t.replace('`', '')

# The reasons block that ends each tail (Pavol, 2026-09-28, 14:18 UTC; the process review's measure 5), as
# batch 6.5's gen65.py renders it. checkn.js finds it by this line.
REASONS_HEAD = "**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it."

tails, titles = {}, {}
for i, h in enumerate(heads):
    rid, title, slug = h.group(1), h.group(2), h.group(3)
    end = heads[i + 1].start() if i + 1 < len(heads) else len(s3)
    body = s3[h.end():end].strip('\n')
    assert body.startswith('**The answers this rung follows.**'), rid
    title_plain = strip_ticks(title)
    words = title_plain.split(' ', 1)
    lower = words[0][0].lower() + words[0][1:] if (len(words[0]) == 1 or words[0][1:].islower()) else words[0]
    header_title = lower + ((' ' + words[1]) if len(words) > 1 else '')
    m = META[rid]
    branch = 'wip/' + slug
    lines = ['', '## Your rung: %s - %s' % (rid, header_title), '',
             'SLUG is %s. WORKTREE is %s, branch %s.' % (slug, m['path'], branch), '',
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-N.md, section 3, under \"%s. %s\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there." % (rid, title_plain), '']
    lines += [strip_ticks(l) for l in body.split('\n')]
    lines += ['', REASONS_HEAD]
    lines += ['- %s: %s' % (k, r) for k, r in REASONS[rid]]
    lines += ['']
    for l in lines:
        assert all(ord(c) < 128 for c in l), (rid, [c for c in l if ord(c) >= 128], l[:80])
    tails[rid] = lines
    titles[rid] = (title_plain, slug, branch)

def js_str(x):
    return json.dumps(x, ensure_ascii=True)

def js_list(keys, indent='      '):
    out, cur = [], ''
    for k in keys:
        piece = js_str(k)
        if cur and len(cur) + len(piece) + 2 > 150:
            out.append(indent + cur.rstrip())
            cur = ''
        cur += piece + ', '
    if cur:
        out.append(indent + cur.rstrip().rstrip(','))
    return '\n'.join(out)

L = []
A = L.append
for c in [
 '// ===========================================================================',
 '// MANIFEST - the coordinator replaces everything between this line and the',
 '// "END MANIFEST" line, and changes nothing else in this file.',
 '//',
 '// Concurrency, which the manifest does NOT set: at most two agents at once here',
 '// (FACTS.md, "The Workflow harness runs two agents at once on this box"), a',
 '// freed slot going to the next queued agent, FIFO. k is 4 in the first run',
 '// (I, K, T, M) and 1 in the second (Q).',
 '// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order',
 '// only), tail (the brief), blurb (one line for the shared prefix\'s table),',
 '// writesState, expectedMoves, and the checker-count fields testIsStage,',
 '// expectedCheckerCount (a printed prediction, never red) and',
 '// expectedCheckerCrash (compared exactly with the table\'s #crash field; no',
 '// rung of this batch declares one, so any change of the crash row is red).',
 '// K and T predict CHECKER_BASE, the last landed total; I, M and Q report.',
 '// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; T',
 '// names I, and the script applies it after the scatter, so T reaches the',
 '// gather only when I is approved. briefing: the rung\'s mission briefing, which',
 '// the planner writes from the record so that the agents learn in context what',
 '// they were never trained on: the keys of',
 '// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries',
 '// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier rulings',
 '// (doc:PATH#HEADING) the rung rests on; the notes already written on the',
 '// subject, found through INDEX.md (doc:); the specification\'s sections its',
 '// subject touches (doc: on a .tex heading, code: on a passage); the library,',
 '// checker and interpreter code that is the precedent for the same kind of',
 '// problem (code:PATH#FROM..TO); and the FACTS.md entries and map rows of its',
 '// area; in reading order, decisions first. The rung worker reads it whole as',
 '// its step 1. And checks, the sub-list of briefing that the skeptic, the',
 '// repair round and the judges read as their step 1: the decisions and ledger',
 '// rows their checks need, and the specification\'s sections and the precedent',
 '// code those checks compare against. No key holds a double quote, backtick,',
 '// dollar sign or backslash, since each is rendered in double quotes. Each list',
 '// is checked with the tool\'s --check to match exactly one place per key (on',
 '// main at the drafting; re-checked at each launch). Each briefing key has a',
 '// one-line reason, why it is there and what the rung does with it, rendered',
 '// at the end of the rung\'s tail (listsn.py; Pavol, 2026-09-28, the process',
 '// review\'s measure 5).',
 '//',
 '// Batch N\'s values are CLIMB-BATCH-N.md, sections 3, 6 and 7. Each tail is',
 '// that rung\'s section of section 3 word for word, with the record\'s code-span',
 '// backticks dropped (this file carries none), then its briefing\'s reasons;',
 '// ASCII only. I\'s, T\'s and Q\'s sections open with their answers line,',
 '// Q1 = (1), the default the conversion judgement took as the numeral tie',
 '// rule, which the coordinator changes at launch if Pavol answers otherwise.',
 '// Three values are set at each launch and nowhere else: RUN (\'first\' is',
 '// batch N, rungs I, K, T and M; \'second\' is batch Nb, rung Q, launched once',
 '// the first has landed; the record\'s section 1, "Two runs of one record"),',
 '// LEDGER_FROM (one above the highest row of the gap ledger at that launch)',
 '// and CHECKER_BASE (the #total of the last landed checker-count.txt); the',
 '// block refuses to load while either is unset. Manifest order is the ledger',
 '// numbering order: I, K, T, M in the first run, Q in the second. The scatter',
 '// starts the longest expected first: K, I, T, M. No rung declares a ladder',
 '// move. The base is <base>, passed at launch as args.base, not written here.',
 '// ===========================================================================',
 '']:
    A(c)
A("const RUN = 'first'     // SET AT LAUNCH: 'first' (batch N: I, K, T and M) or 'second' (batch Nb: Q, once the first run has landed); the record's section 1, \"Two runs of one record\"")
A("const LEDGER_FROM = null   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A("const CHECKER_BASE = null   // SET AT LAUNCH: the #total of the last landed checker-count.txt, the one the gate compares against (the newest explorations/compile-ladder/climb-batch-*/gate/ on the base)")
A("if (!Number.isInteger(CHECKER_BASE)) throw new Error('CHECKER_BASE is not set: the #total of the last landed checker-count.txt')")
A("if (!['first', 'second'].includes(RUN)) throw new Error('RUN is not one of first, second')")
A('')
A("const BATCH = RUN === 'second' ? 'Nb' : 'N'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-N.md'")
A('')
for rid in ORDER:
    A('const %s_TAIL = [' % rid)
    for l in tails[rid]:
        A(js_str(l) + ',')
    A("].join('\\n')")
    A('')
for rid in ORDER:
    title_plain, slug, branch = titles[rid]
    m = META[rid]
    b, c = LISTS[rid]
    extra = (" landsOnlyWith: %s," % js_str(m['landsOnlyWith'])) if m['landsOnlyWith'] else ''
    if rid in PREDICTS_BASE:
        extra += ' expectedCheckerCount: CHECKER_BASE,'
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: '%s', tail: %s_TAIL, expectedMinutes: %d, writesState: %s, testIsStage: %s,%s" % (
        rid, rid, slug, m['path'], branch, rid, m['minutes'], 'true' if m['writesState'] else 'false',
        'true' if m['testIsStage'] else 'false', extra))
    A('    blurb: ' + js_str(BLURB[rid]) + ',')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    checks: [')
    A(js_list(c) + '],')
    A('    expectedMoves: [] }')
    A('')
A("const RUNGS = RUN === 'first' ? [I_ENTRY, K_ENTRY, T_ENTRY, M_ENTRY] : [Q_ENTRY]")
A('const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)')
A('')
def js_obj(name, d):
    A('const %s = {' % name)
    for k, v in d.items():
        A('  %s: %s,' % (k, js_str(v)))
    A('}')
js_obj('INTRO_RUNG', INTRO_RUNG)
js_obj('INTRO_STOPS', INTRO_STOPS)
js_obj('INTRO_LIFTED', INTRO_LIFTED)
js_obj('OVERLAP_RUNG', OVERLAP_RUNG)
A('')
FIRST = "This run is climb batch N, the inference rule with the numeral switch, as Pavol decided it on 2026-09-27 (POSITIONS.md, the numerics plans, the synthesis's decision 3, \"Agreed.\"), with the rule for conversions and overloading and row 484's library fix he accepted on 2026-09-28 (POSITIONS.md, the two decisions of the conversion judgement, 19:06 UTC), in its first run: the checker's rule, walk's rule, the specification's chapter and each integer type's own MIN, MAX and MINMAX. It runs after climb batches 7, 7R and 7C and batch 6.5's first run have landed. Its second run, batch Nb, rung Q, the numeral's own type, runs once this one has landed, because the switch under walk needs walk's rule in its worker's tree (the record's section 1)."
SECOND = "This run is climb batch Nb, the second run of batch N, the inference rule with the numeral switch, as Pavol decided it on 2026-09-27 (POSITIONS.md, the numerics plans, the synthesis's decision 3, and a numeral's type), with the conversion rule of 2026-09-28: rung Q, the numeral's own type. Batch N's first run (rungs I, K, T and M: the checker's rule, walk's rule, the inference chapter and each integer type's own MIN, MAX and MINMAX) has landed before it, with I and K among its landed rungs, since the switch lands only with the rule on both paths."
GATE_BEFORE = "A rung that captures the checker count or the distance stage around its edit takes as its before the last landed gate's tables, the ones the gate itself compares against (checker-count.txt, distance.txt and its per-site list distance-sites.tsv in the newest explorations/compile-ladder/climb-batch-*/gate/ on the base: batch 6.5's first run's climb-batch-6.5/gate/, count 75 and distance 626, for the first run; the first run's climb-batch-N/gate/ for the second), and does not run the stages on its unchanged base; it captures only the after, on its own tree. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, 2026-09-28, on rungs re-running measurements the landed gate had already taken)."
REASONS_INTRO = "Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it (Pavol, 2026-09-28, the process review's measure 5): the worker reads that line before the entry and acts on it, and the skeptic, the repair round and the judges find the same lines in each tail of the record's section 7."
HOME2 = {
  'first': "A home-2 test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it (explorations/coordinator/climb-batch-workflow.md, the three homes). This run owes: K's expected-failure walk test of row 486 (u: NN32 = n for a nat n), the row's context measured by batch 7R and settled by Pavol's decision on a size used as a value; any defect a rung measures and does not repair gets its test in this run, not in run 2.",
  'second': "A home-2 test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it (explorations/coordinator/climb-batch-workflow.md, the three homes): any defect Q measures and does not repair gets its test in this run.",
}
REST = [
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next run waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); it leaves the files another rung edits, and the gather re-anchors those the same way after every rung is applied.",
]
GATHER_T = "The gather's rules: T lands only if I lands, whatever the approved list says (T's landsOnlyWith); after both are applied, the gather checks every rule T's chapter states against I's landed tests and the refusals they pin, fixes T's text where the decisions settle a mismatch, and reports any other to the review as blocking."
PDF = "No rung commits Specification/fortress.pdf: after every rung is applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since a rung edits the specification and Part IV is rendered from the library's .fsi files, and removes the build's ignored products."
DISK = "The worktrees share one disk: a rung that runs the three-pass comparison over ProjectFortress/tests/ or a distance run deletes each pass's caches and each run's scratch directory under its tmp/ once the outputs are captured, and reads df before each."
TAIL = [
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 7R.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
]
A('const BATCH_INTRO = [')
A("  RUN === 'first'")
A('    ? ' + js_str(FIRST))
A('    : ' + js_str(SECOND) + ',')
A("  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),")
A('  ' + js_str("Each rung's section of the record opens with the answers of its section 1 that it follows; section 1's one question, Q1, is taken at its default (1), the numeral tie rule of the conversion judgement, listed for Pavol's review, and the coordinator writes another answer into those lines at launch only if he gives one.") + ',')
A('  ' + js_str(GATE_BEFORE) + ',')
A('  ' + js_str(REASONS_INTRO) + ',')
A("  RUN === 'first' ? " + js_str(HOME2['first']) + " : " + js_str(HOME2['second']) + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file another rung of the run owns, or a declaration section 4 of the record names as another batch\\'s rung\\'s.',")
A("  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',")
for x in REST:
    A('  ' + js_str(x) + ',')
A("  HAS_RUNG('T') ? " + js_str(GATHER_T) + " : '',")
A('  ' + js_str(PDF) + ',')
A('  ' + js_str(DISK) + ',')
for x in TAIL:
    A('  ' + js_str(x) + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + (RUN === 'first' ? " + js_str(OVERLAPS_FIRST) + " : " + js_str(OVERLAPS_SECOND) + ")")
text = '\n'.join(L) + '\n'
assert '`' not in text, 'a backtick in the block'
assert all(ord(ch) < 128 for ch in text), 'non-ASCII in the block'
open(OUT, 'w').write(text)
print('wrote', OUT, len(L), 'lines')
for rid in ORDER:
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
