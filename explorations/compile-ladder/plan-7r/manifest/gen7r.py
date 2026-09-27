# Generates climb batch 7R's MANIFEST block from section 3 of the record (CLIMB-BATCH-7R.md) and the
# briefing and checks lists of lists7r.py beside it, into $FORTRESS_HOME/tmp/manifest7r.js; check7r.js
# checks it. The form is batch 6.5's generator (explorations/compile-ladder/plan-6.5/manifest/gen65.py):
# each tail is its rung's section word for word, the record's code-span backticks dropped, each line
# JSON-quoted, ASCII only.
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lists7r import LISTS

ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
REC = os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-7R.md')
OUT = os.path.join(ROOT, 'tmp/manifest7r.js')   # tmp/ is ignored (.gitignore: /tmp/)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC).read()
s3 = rec[rec.index('\n## 3. The rungs\n'):rec.index('\n## 4. ')]
heads = list(re.finditer(r'^### ([JU])\. (.*), `([a-z0-9-]+)`$', s3, flags=re.M))
assert [h.group(1) for h in heads] == ['J', 'U'], [h.group(1) for h in heads]
ORDER = 'JU'

META = {
  'J': dict(path='/home/user/fortress-ranges', minutes=240, writesState=False, testIsStage=True, landsOnlyWith=None),
  'U': dict(path='/home/user/fortress-specranges', minutes=110, writesState=False, testIsStage=False, landsOnlyWith=['J']),
}
BLURB = {
  'J': "the one library's scalar ranges over ZZ32 only (RangeInternals and FortressLibrary's range operators lose their integer type parameter; the public range traits keep their index type), the compiled checker's GeneratorZZ32 crash fixed beside it, and the range tests of rows 450 to 452 and RangePrototype restated; library, tests and a few lines of Java.",
  'U': "the specification's ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout on mixed integer types revised to ranges over ZZ32, in the S1 form; lands only with J; no source and no test assertion.",
}
INTRO_RUNG = {
  'J': "J makes the one library's scalar ranges ZZ32 only: RangeInternals and the range operators of FortressLibrary lose their integer type parameter, multi-dimensional ranges are tuples of ZZ32 ranges, and the public range traits keep their index type; it fixes beside it the compiled checker's crash the change uncovers (ExtentScalarRange, \"Not in the trait table: FortressLibrary.GeneratorZZ32\"); and it restates the expected-failure range tests of rows 450 to 452 and the team's RangePrototype.",
  'U': "U revises the specification to match, in the S1 form: the ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout on mixed integer types (Specification/basic-lib/basic-integers.tex:61-65).",
}
INTRO_STOPS = {
  'J': "for J, a changed walk output its comparison does not account for, rangeOperators's among them; a team test line changed other than RangePrototype's; a line of the three restated revival tests beyond their ZZ64 and NN32 lines and row 452's restatement; a public range trait's type parameter removed; an edit to compiler/StaticChecker.java or to a file the count or distance stage shadows, a Java or Scala edit beyond the crash's site, the Character site, or any edit under interpreter/; a compiled test's verdict changing or a ladder file moving down; a new checker error the distance stage shows as caused and the report does not account for; and a line of explorations/run-c4/src/ or explorations/apl/mg/",
  'U': "for U, any edit under Specification-1.0-frozen/, normative text stating more than J's section builds, a passage whose new text neither the decision nor J's section settles (reported, not chosen), an example that does not run under walk on the base, and an assertion changed in a re-anchored test",
}
INTRO_LIFTED = {
  'J': "J removes the integer type parameter of RangeInternals' declarations and of FortressLibrary's range operators, so that a range over another integer type is refused, restates the team's RangePrototype and the ZZ64 and NN32 lines of the expected-failure tests of rows 450 to 452, and renames row 452's into a plain test (the ranges decision, POSITIONS.md 2026-09-27, the numerics plans)",
  'U': "U revises the specification's ranges section, its two ZZ64 examples, ZZ's factorial property and the revival's callout (the same decision)",
}
OVERLAP_RUNG = {
  'J': "J edits Library/RangeInternals.fsi and .fss; in Library/FortressLibrary.fsi and .fss the range operator block with its three point operators, openRange where needed, the written static arguments of RangeInternals names in the bounds getters and zeroIndices of ReadableArray1, Array2 and Array3, and possibly an excludes clause on a public range trait's header; in Library/Random.fsi and .fss randomR, randomManyR and UniformDistribution's parameter; compiler/Types.java and possibly the case site of scala_src/typechecker/impls/Functionals.scala; and restates four files and adds two in ProjectFortress/tests/.",
  'U': "U edits Specification/basic/expressions/ranges.tex, the callout and the factorial entry of Specification/basic-lib/basic-integers.tex, its entries and one paragraph of Specification/appendices/changes.tex, the two examples under SpecData/examples/ and the prose around them, and the messages and comments of the tests whose citations its edits move, J's four excepted; never Specification-1.0-frozen/ or Specification/fortress.pdf.",
}
OVERLAPS_TAIL = ("No file is shared. U's text describes J's library and lands only with it; the gather re-anchors the citations of ranges.tex lines in J's test files after both are applied. "
  "Batch 7 (H, A and B) has landed in the base: J edits none of its declarations (H's comparisons, Maybe family, Condition functions and the headers of AnyIntegral and Integral; A's fill and tabulate members and factories; B's fail, StandardMinMax, builtinPrimitive and List's comprehension); J edits members of Array2 and Array3 (bounds, zeroIndices) beside A's fill members, and declarations of Random.fss beside A's calls in MersenneTwister; U inserts its Appendix I entries after A's, before Passages not yet revised. "
  "The checker count reads J's changes, the FortressLibrary api's overloading rows among them, which the stage sees since batch 7's H; U changes nothing it reads. "
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
             "Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7R.md, section 3, under \"%s. %s\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there." % (rid, title_plain), '']
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
 '// freed slot going to the next queued agent, FIFO. k is 2 in this batch (J, U).',
 '// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order',
 '// only), tail (the brief), blurb (one line for the shared prefix\'s table),',
 '// writesState, expectedMoves, and the checker-count fields testIsStage,',
 '// expectedCheckerCount (a printed prediction, never red) and',
 '// expectedCheckerCrash (compared exactly with the table\'s #crash field; no',
 '// rung of this batch declares one, so any change of the crash row is red).',
 '// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; U',
 '// names J, and the script applies it after the scatter, so U reaches the',
 '// gather only when J is approved. briefing: the rung\'s mission briefing, which',
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
 '// Batch 7R\'s values are CLIMB-BATCH-7R.md, sections 3, 6 and 7. Each tail is',
 '// that rung\'s section of section 3 word for word, with the record\'s code-span',
 '// backticks dropped (this file carries none); ASCII only. No section carries',
 '// an answer letter: section 1 asks no question. One value is set at launch and',
 '// nowhere else: LEDGER_FROM, one above the highest row of the gap ledger at the',
 '// launch; it holds the drafting\'s value, 456, and is reset at the launch,',
 '// since batch 7, which runs first, opens its rows from 456 too. Manifest order',
 '// is the ledger numbering order: J, U. The scatter starts the longest expected',
 '// first: J, U. No rung predicts the checker total: J\'s is reported, and U',
 '// changes nothing the stage reads. No rung declares a ladder move. The base is',
 '// <base>, passed at launch as args.base, not written here.',
 '// ===========================================================================',
 '']:
    A(c)
A("const LEDGER_FROM = 456   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (456 at the drafting, 15255fd2b; reset at the launch, since batch 7 opens rows from 456)")
A("if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\\'s launch')")
A('')
A("const BATCH = '7r'")
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7R.md'")
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
A("const RUNGS = [J_ENTRY, U_ENTRY]")
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
  "This batch is climb batch 7R, the ranges batch, as Pavol decided it on 2026-09-27 (POSITIONS.md, the numerics plans, the synthesis's decision 1, \"Option 1, ZZ32\"): the one library's scalar ranges are over ZZ32 only, as the compiler library declares them. It runs after climb batch 7 (rungs H, A and B) has landed, and before batch N, the inference rule with the numeral switch (the same entry, decision 3).",
  None,  # INTRO_RUNG
  "Each rung's section of the record opens with the answers of its section 1 that it follows; section 1 asks no question.",
  None,  # stops
  None,  # lifted
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); it leaves the files the other rung edits, and the gather re-anchors those the same way after both rungs are applied.",
  "The gather's rules: U lands only if J lands, whatever the approved list says (U's landsOnlyWith); after both are applied, the gather checks every rule U's text states against J's landed library and runs U's two respelled examples under walk on the merged tree, as ant testSpecData runs them, fixes U's text where the decision settles a mismatch, and reports any other to the review as blocking.",
  "No rung commits Specification/fortress.pdf: after both rungs are applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since Part IV is rendered from Library/FortressLibrary.fsi, which J changes, and U edits the specification, and removes the build's ignored products.",
  "Two worktrees share one disk: J runs a three-pass comparison over ProjectFortress/tests/ and three distance runs, deletes each pass's caches and each distance run's scratch directory once its outputs are captured, and reads df before each.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 6.5.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
]
A('const BATCH_INTRO = [')
for x in INTRO:
    pass
A('  ' + js_str(INTRO[0]) + ',')
A("  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),")
A('  ' + js_str(INTRO[2]) + ',')
A("  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file the other rung owns, or a declaration batch 7\\'s rungs own (the record\\'s section 4).',")
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
