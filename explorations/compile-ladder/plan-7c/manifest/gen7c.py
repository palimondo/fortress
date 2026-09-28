# Generates climb batch 7C's MANIFEST block from section 3 of the record (CLIMB-BATCH-7C.md) and the
# briefing and checks lists of lists7c.py beside it, into $MANIFEST_OUT, by default
# $FORTRESS_HOME/tmp/manifest7c.js; check7c.js checks it. The form is batch 7R's generator
# (explorations/compile-ladder/plan-7r/manifest/gen7r.py): each tail is its rung's section word for
# word, the record's code-span backticks dropped, each line JSON-quoted, ASCII only. New here: the
# launch-set COUNT_BASE, from which rung Y's expectedCheckerCount is predicted.
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lists7c import LISTS

ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
REC = os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-7C.md')
OUT = os.environ.get('MANIFEST_OUT') or os.path.join(ROOT, 'tmp/manifest7c.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([YX])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == ['Y', 'X'], [h.group(1) for h in heads]
ORDER = 'YX'

# The rise the decision names, measured on the tree at 81f0151be: the clause's one error gone and the
# FortressLibrary api's 66 overloading and return-type errors in (22 to 87). Rung Y's prediction is
# COUNT_BASE, the #total of batch 7R's landed checker-count.txt, plus this.
COUNT_RISE = 65
META = {
  'Y': dict(path='/home/user/fortress-comprises', minutes=150, writesState=False, testIsStage=False, landsOnlyWith=None,
            count='COUNT_BASE + %d' % COUNT_RISE),
  'X': dict(path='/home/user/fortress-speccomprises', minutes=90, writesState=False, testIsStage=False, landsOnlyWith=['Y'],
            count=None),
}
BLURB = {
  'Y': "the compiled checker learns the 2012 reading of comprises: a generic subtrait of a closed trait is eligible when every trait the checker knows below it is below a listed type (everyKnownSubtypeListed, about 14 Scala lines in TypeHierarchyChecker.scala), so that AnyIntegral's clause checks as written; a compiler test and a false-list guard; the count stage declared.",
  'X': "the specification's draft note on comprises clauses (Specification/basic/traits.tex:234-246) replaced by rendered text in the later Types chapter's reading, with a revival callout and an Appendix I entry, in the S1 form; lands only with Y; no source and no test assertion.",
}
INTRO_RUNG = {
  'Y': "Y teaches the compiled checker the 2012 reading of a comprises clause, the later Types chapter's and Welterweight's: a generic immediate subtrait of a closed trait is eligible to extend it when at least one trait the checker knows extends it and every such trait is below a listed type (the narrow accommodation, everyKnownSubtypeListed, approved and parked on 2026-09-21), so that the one library's AnyIntegral clause checks as written and the FortressLibrary api's overloading and return-type checks run on the count stage.",
  'X': "X revises the specification to match, in the S1 form: the draft note at Specification/basic/traits.tex:234-246 becomes rendered text in the later Types chapter's reading (Documentation/Specification/Prose/Language/types.tick:384-390), with a revival callout and its Appendix I entry.",
}
INTRO_STOPS = {
  'Y': "for Y, a compiled test's verdict changing other than its new tests', or a ladder file moving down; an edit outside isEligibleToExtend and the one new method beside it, or to any other Java or Scala file; a switch or system property left in the rule; a line of Library/, ProjectFortress/LibraryBuiltin/ or interpreter/; a walk output changing; a count-stage error on its base that neither its edit nor a named edit of batch 7R accounts for, or a crash row it does not declare; and a line of explorations/run-c4/src/ or explorations/apl/mg/",
  'X': "for X, any edit under Specification-1.0-frozen/; normative text stating more than the decision and Y's section build, a type variable allowed in a comprises clause, a rule about objects declared in other units, or a change to the ellipsis sentence or the Molecule example among it; a passage of its list whose new text neither the decision nor Y's section settles (reported, not chosen); and an assertion changed in a re-anchored test",
}
INTRO_LIFTED = {
  'Y': "Y makes the compiled checker accept a generic immediate subtrait of a closed trait when every trait it knows below that subtrait is below a listed type, against the draft note at Specification/basic/traits.tex:235-246, which rung X revises (the comprises decision, POSITIONS.md 2026-09-28, AnyIntegral's comprises clause)",
  'X': "X replaces the draft note's first sentence with rendered normative text in the later Types chapter's reading (the same decision)",
}
OVERLAP_RUNG = {
  'Y': "Y edits isEligibleToExtend in ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala and adds one private method beside it, and adds its tests to ProjectFortress/compiler_tests/.",
  'X': "X edits the passage at Specification/basic/traits.tex:234-246, adds its subsection to Specification/appendices/changes.tex, and re-anchors the traits.tex citations in the messages and comments of two tests (ProjectFortress/tests/XXXFlatStringSplitRungL.fss and ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.fss); never Specification-1.0-frozen/ or Specification/fortress.pdf.",
}
OVERLAPS_TAIL = ("No file is shared. X's text states Y's rule and lands only with it. "
  "Batch 7R (J and U) has landed in the base: Y edits no file J edits (J's Scala edit, if it made one, is at the case site of Functionals.scala), and no library line; X inserts its Appendix I subsection after U's, before Passages not yet revised, and edits no line U edits. "
  "The checker count reads Y's change: the FortressLibrary api, which stops at its hierarchy pass on AnyIntegral's clause since batch 7, reaches its overloading and return-type checks; X changes nothing the stage reads. "
  "The files both rungs reach are the three record files, folded centrally by the gather.")

def strip_ticks(t):
    return t.replace('`', '')

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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7C.md, section 3, under \"%s. %s\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there." % (rid, title_plain), '']
    lines += [strip_ticks(l) for l in body.split('\n')]
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
 '// freed slot going to the next queued agent, FIFO. k is 2 in this batch (Y, X).',
 '// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order',
 '// only), tail (the brief), blurb (one line for the shared prefix\'s table),',
 '// writesState, expectedMoves, and the checker-count fields testIsStage,',
 '// expectedCheckerCount (a printed prediction, never red) and',
 '// expectedCheckerCrash (compared exactly with the table\'s #crash field; no',
 '// rung of this batch declares one, so any change of the crash row is red).',
 '// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; X',
 '// names Y, and the script applies it after the scatter, so X reaches the',
 '// gather only when Y is approved. briefing: the rung\'s mission briefing, which',
 '// the planner writes from the record so that the agents learn in context what',
 '// they were never trained on: the keys of',
 '// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries',
 '// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier rulings',
 '// (doc:PATH#HEADING) the rung rests on; the notes already written on the',
 '// subject, found through INDEX.md (doc:); the specification\'s sections its',
 '// subject touches (doc: on a .tex heading, code: on a passage); the library and',
 '// checker code that is the precedent for the same kind of problem',
 '// (code:PATH#FROM..TO); and the FACTS.md entries and map rows of its area; in',
 '// reading order, decisions first. The rung worker reads it whole as its step',
 '// 1. And checks, the sub-list of briefing that the skeptic, the repair round',
 '// and the judges read as their step 1: the decisions and ledger rows their',
 '// checks need, and the specification\'s sections and the precedent code those',
 '// checks compare against. No key holds a double quote, backtick, dollar sign or',
 '// backslash, since each is rendered in double quotes. Each list is checked',
 '// with the tool\'s --check to match exactly one place per key (on main at the',
 '// drafting; re-checked at the launch).',
 '//',
 '// Batch 7C\'s values are CLIMB-BATCH-7C.md, sections 3, 6 and 7. Each tail is',
 '// that rung\'s section of section 3 word for word, with the record\'s code-span',
 '// backticks dropped (this file carries none); ASCII only. No section carries',
 '// an answer letter: section 1\'s one question, Q1, is whether this batch runs',
 '// alone or rides in batch N\'s first run, and this block is launched only when',
 '// it runs alone. Two values are set at launch and nowhere else: LEDGER_FROM,',
 '// one above the highest row of the gap ledger at the launch, which holds the',
 '// drafting\'s value, 476, and is reset at the launch, since batch 7R, which',
 '// runs first, opens its rows from 476 too; and COUNT_BASE, the #total of',
 '// batch 7R\'s landed gate/checker-count.txt, which holds the drafting tree\'s',
 '// 22. Y\'s expectedCheckerCount is COUNT_BASE plus 65, the rise measured on',
 '// the tree at 81f0151be (the clause\'s error gone, the api\'s 66 in), printed',
 '// beside the measured total and never red; X changes nothing the stage reads.',
 '// Manifest order is the ledger numbering order: Y, X. The scatter starts the',
 '// longest expected first: Y, X. No rung declares a ladder move. The base is',
 '// <base>, passed at launch as args.base, not written here.',
 '// ===========================================================================',
 '']:
    A(c)
A("const LEDGER_FROM = 476   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (476 at the drafting, 1f50087e6; reset at the launch, since batch 7R opens rows from 476)")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A("const COUNT_BASE = 22    // SET AT LAUNCH: the #total of explorations/compile-ladder/climb-batch-7r/gate/checker-count.txt, batch 7R's landed table (22 on the drafting tree)")
A("if (!Number.isInteger(COUNT_BASE)) throw new Error('COUNT_BASE is not set: the #total of batch 7R\\'s landed checker-count.txt')")
A('')
A("const BATCH = '7c'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7C.md'")
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
    count = (" expectedCheckerCount: %s," % m['count']) if m['count'] else ''
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: '%s', tail: %s_TAIL, expectedMinutes: %d, writesState: %s, testIsStage: %s,%s%s" % (
        rid, rid, slug, m['path'], branch, rid, m['minutes'], 'true' if m['writesState'] else 'false',
        'true' if m['testIsStage'] else 'false', count, extra))
    A('    blurb: ' + js_str(BLURB[rid]) + ',')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    checks: [')
    A(js_list(c) + '],')
    A('    expectedMoves: [] }')
    A('')
A("const RUNGS = [Y_ENTRY, X_ENTRY]")
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
INTRO = [
  "This batch is climb batch 7C, comprises after the 2012 reading, as Pavol decided it on 2026-09-28 (POSITIONS.md, AnyIntegral's comprises clause, \"Option 1.\"): the compiled checker learns the later Types chapter's reading of a comprises clause, the clause itself and walk staying as they are, and the specification says so. It runs after climb batch 7R (ranges over ZZ32) has landed, and before batch N, the inference rule with the numeral switch.",
  None,  # INTRO_RUNG
  "Each rung's section of the record opens with the answers of its section 1 that it follows; section 1's one question, whether the batch runs alone or in batch N's first run, changes no rung's work.",
  None,  # stops
  None,  # lifted
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "What the record has measured is handed over as findings to cite, with their sources, and is not measured again unless the tree has changed under it (explorations/protocol.md, principle 5; POSITIONS.md, 2026-09-28, the nine-steps worker's brief): each rung's section names what is new to measure.",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1).",
  "The gather's rules: X lands only if Y lands, whatever the approved list says (X's landsOnlyWith); after both are applied, the gather checks every rule X's text states against Y's landed code and tests, fixes X's text where the decision settles a mismatch, and reports any other to the review as blocking; and it writes the final number of Y's new ledger row into X's Appendix I entry, where X names that row.",
  "No rung commits Specification/fortress.pdf: after both rungs are applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since X edits the specification, and removes the build's ignored products.",
  "Two worktrees share one disk: Y runs two distance runs, deletes each run's scratch directory once its table is captured, and reads df before each.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 7R.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
]
A('const BATCH_INTRO = [')
A('  ' + js_str(INTRO[0]) + ',')
A("  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),")
A('  ' + js_str(INTRO[2]) + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file the other rung owns (the record\\'s section 4).',")
A("  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',")
for x in INTRO[5:]:
    A('  ' + js_str(x) + ',')
A("].filter(Boolean).join(' ')")
A("const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + " + js_str(OVERLAPS_TAIL))
text = '\n'.join(L) + '\n'
assert '`' not in text, 'a backtick in the block'
assert all(ord(ch) < 128 for ch in text), 'non-ASCII in the block'
open(OUT, 'w').write(text)
print('wrote', OUT, len(L), 'lines')
for rid in ORDER:
    print(rid, len(tails[rid]), 'tail lines;', titles[rid])
