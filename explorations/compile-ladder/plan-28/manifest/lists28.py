# The briefing and checks lists of climb batch 28's rungs (CLIMB-BATCH-28.md, section 1, "The manifest, rung by
# rung"), made from plan-27/manifest/lists27.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is there, and CHECK where the
# record marks it (check): the checks list, read by the skeptic, a repair round and a judge, is those keys in order.
# No key holds a backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading
# without its backticks.
# Changed from lists27.py: the rungs are the record's seven, V, R, A, K, H, S and T, in the manifest's order; the keys
# are each rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks dropped
# and REC and PROBES spelled out, each with the record's reason, its first letter capitalized but where it opens with
# a code name (narrow, minimal, abort, getProperty); a check is marked on its entry, not listed apart. The record's
# one forks key, REC "Forks the batch takes, none consequential", is section 3's forks whole, 14.6K bytes; in its
# place each rung reads, as climb batch 27's second Fable review proposed (climb-batch-27-review-2.md, its notes for
# the coordinator), the batch's forks, its own and those of each rung that shares a file with it, by the @WORDS
# filter on section 3's bold leads ("For the whole batch", "Rung V", ...), each paragraph matched by its lead alone
# and each key one place. forks_keys() builds them from LEAD and SHARED, section 4's "The files that two rungs
# share", which check28.js reads again from the record. lists(ids) gives the lists of the rungs ids, a rung left out
# by --without dropping from the others' forks; LISTS and REASONS are lists(IDS).
# `python3 -B lists28.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form, in $FORTRESS_HOME (this checkout by default), and prints the bytes of each rung's forks keys; it is
# run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-28.md#"
PROBES = "doc:explorations/compile-ladder/plan-28/PROBES.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# Where the record lists its one forks key: forks_keys() takes its place.
FORKS = ('forks',)
FORKS_SECTION = REC + 'Forks the batch takes, none consequential'
FORKS_REASON = 'The defaults your rung builds, each with the ways not taken.'
# Section 3's bold leads, each the words of its key.
LEAD = {'batch': 'For the whole batch', 'V': 'Rung V', 'R': 'Rung R', 'A': 'Rung A', 'K': 'Rung K', 'H': 'Rung H',
        'S': 'Rung S', 'T': 'Rung T'}
# Section 4, "The rule the rungs keep, and how they meet": the files that two rungs share, with the rungs that edit each.
SHARED = (
  ('Library/FortressLibrary.fss', 'VRAH'),
  ('Library/FortressLibrary.fsi', 'VRA'),
  ('ProjectFortress/LibraryBuiltin/FortressBuiltin.fss', 'AVHR'),
  ('ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi', 'VH'),
  (SRC + 'interpreter/glue/NativeApp.java', 'HA'),
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


V_BRIEFING = [
  ('P-161', 'The decision you build, option 6 of the review.', CHECK),
  ('P-169', "IntLiteral's 8 as Fortress text over asZZ, before the names batch.", CHECK),
  ('P-162', "The pair pattern and ZZ32's big onto makeZZfromZZ32."),
  ('P-73', 'Fixed-width arithmetic raises, which the getters follow.'),
  ('P-72', 'narrow keeps the low 32 bits on the fixed widths, which stands.'),
  ('P-37', 'No declaration is added to the prelude.'),
  ('F-299', "Walk's loader of helpers, and the carriers your bindings over NN32 and NN64 meet."),
  ('ledger:858', 'A low-bits name missing on a type, which closes.', CHECK),
  ('ledger:859', 'A call that reached a low-bits name through a coercion, which closes.', CHECK),
  ('ledger:502', "ZZ's widen, which closes by the deletion.", CHECK),
  ('ledger:349', "ZZ's narrow half, which closes.", CHECK),
  ('ledger:578', "IntLiteral's own arithmetic answers a ZZ32 under walk, which stays."),
  ("doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 6. Option 3, with option 5's deletion folded in", 'The option, its callers and their new forms.', CHECK),
  ("doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 3. Steele's pattern, made total", "The getters, their owners and the helpers' two ways.", CHECK),
  ('doc:explorations/reviews/integer-conversions-2026-11-06.md#6.0 What every option shares', 'The transfer helpers and the tests over NN32 and NN64.'),
  ('doc:explorations/reviews/integer-conversions-2026-11-06.md#2.2 The one library, member by member', "Today's members, type by type."),
  ('doc:explorations/reviews/natives-device-2026-11-07.md#3.3 The numerals, 32 (Q1: yes, with a reading)', "IntLiteral's 8 over asZZ, not ZZ64 (row 328).", CHECK),
  ('code:Library/FortressLibrary.fss#private shiftCount32(b:AnyIntegral):ZZ32 =', "Rung I's private count functions, whose calls of ZZ's narrow you move.", CHECK),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number', 'The object whose 8 you write in Fortress.', CHECK),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait IntLiteral', "The prelude's IntLiteral, whose conversions and comparisons are Fortress over its getters, the form of yours."),
  ('doc:Specification/appendices/changes.tex#Shifts and narrowing on the integer types', 'The Appendix I entry whose sentences on narrow of a ZZ your deletion makes false, with its callout revival-shifts.', CHECK),
  ('code:Specification/basic-lib/basic-integers.tex#Like every number type, each of them is a subtype..TYP{IntegerOverflow} is thrown.', "The sentences you revise, narrow's among them."),
  FORKS,
]

R_BRIEFING = [
  ('P-164', 'The decision whose reader rung you build.', CHECK),
  ('P-58', "The binding's form.", CHECK),
  ('F-330', 'The writer rung as landed, the pattern you follow.', CHECK),
  ('F-321', 'The checker reads the whole helper class, fileOps among them.'),
  ('F-299', "Walk's loader and its carriers, which your change extends.", CHECK),
  ('ledger:926', 'FileWriteStream left on glue while File is native, which closes.', CHECK),
  ('ledger:900', 'A rope written to a FileWriteStream, which closes.'),
  ('ledger:901', "FileWriteStream's flush, which closes."),
  ('ledger:902', 'A missing file that no catch sees, which closes.'),
  ('ledger:928', "A program's object below the writer trait, whose sibling your reader trait has."),
  ('doc:explorations/compile-ladder/rung-io-writer/REPORT.md#What changed and why', "The writer rung's files, classes and decisions, which yours mirror.", CHECK),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk', "Today's answers of the reader side, which your tests keep.", CHECK),
  ("doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type in each direction, held in a field: PLAN's line", 'The option the decision took.'),
  ('code:Library/FortressLibrary.fss#trait JavaBufferedReader excludes', 'The trait you complete.', CHECK),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait JavaBufferedReader excludes', "The prelude's trait, whose names and methods yours take."),
  ('doc:Library/Writer.fss', 'The writer objects over a field, the form of yours.', CHECK),
  ('doc:' + SRC + 'nativeHelpers/fileOps.java', 'The helpers you bind.'),
  (PROBES + "Probe 5. The compiled reader against walk's, at the end of a file (rung R), by reading", 'The 0 and the -1 at the end, and how eof tells them apart.', CHECK),
  FORKS,
]

A_BRIEFING = [
  ('P-169', "The decision whose arrays' shape you build.", CHECK),
  ('P-167', "The device, walk's loader answering a helper's name with walk's own operation.", CHECK),
  ('P-164', "The Java-backed trait, walk's native object below it and the table entry, the pattern of the store."),
  ('P-84', "An RR64 array's double[] store, decision A's, which stays boxed until then."),
  ('P-85', "The array design's three questions, which stay open."),
  ('F-299', "Walk's loader, and the table of F-328 that the device extends.", CHECK),
  ('F-328', 'The two names the device answers today.'),
  ('ledger:466', 'A second initialisation of an element, which the store meets.'),
  ("doc:explorations/reviews/natives-device-2026-11-07.md#3.1 The arrays' store, 7 (Q1: yes)", 'The way, its forced points and its forks.', CHECK),
  ('doc:explorations/reviews/natives-remainder-2026-11-07.md#2.4 NativeArray, 7', "The team's sources, the peers and the uses of the two objects.", CHECK),
  (PROBES + "Probe 1. Q2: the compiled array store's two shapes", 'The two shapes measured, and what each changes in the tree.', CHECK),
  ('doc:ProjectFortress/LibraryBuiltin/NativeArray.fss', 'The component you rewrite.', CHECK),
  ('doc:' + SRC + 'interpreter/glue/prim/PrimitiveArray.java', "Walk's store, which your rule answers with.", CHECK),
  ('code:' + SRC + 'interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,', 'Where the loader reads a string, and where your rule goes.', CHECK),
  ('doc:' + SRC + 'runtimeSystem/Transaction.java', 'The compiled transaction, its read and write sets.', CHECK),
  ('code:' + SRC + 'compiler/codegen/VarCodeGen.java#public static class MutableStaticBinding extends NeedsType {', 'How compiled code reads and writes a cell in and out of a transaction.'),
  ('doc:' + SRC + 'compiler/runtimeValues/FZZ32Vector.java', "The team's 2011 store over a Java array in a run-time class."),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#private object JavaBufferedWriterObject extends JavaBufferedWriter', "Walk's native object below a library trait, the precedent."),
  ('code:Library/FortressLibrary.fss#(** Casting *)..else => throw CastError', 'The cast at a read.'),
  FORKS,
]

K_BRIEFING = [
  ('ledger:929', 'The row you close.', CHECK),
  ('P-148', "The checker's speed after its correctness, in the same rung.", CHECK),
  ('F-54', "The distance's two crash rows, which go.", CHECK),
  ('F-53', 'The count and the distance at the last gate.'),
  ('F-66', 'An undeclared crash is red only from the count.'),
  ("doc:.claude/skills/fortress-repo/references/compiler.md#The checker's time", "The timing's steps, the audit and what you report.", CHECK),
  (PROBES + 'Probe 2. Row 929: a sort that is correct on a partial order, and its time', 'The reproducer, the prototype, its tables and its times.', CHECK),
  ('code:' + SRC + 'scala_src/typechecker/impls/Functionals.scala#// The candidates no other candidate is more specific than.', 'minimal and callType, two of your sites.', CHECK),
  ('code:' + SRC + 'scala_src/typechecker/impls/Functionals.scala#// Sort the arrows and instantiations to find the statically most', 'The sort that stops.', CHECK),
  ('code:' + SRC + 'scala_src/typechecker/CoercionOracle.scala#// Build app candidates and sort them to find the SMA.', 'The coercion sort.'),
  ('code:' + SRC + "scala_src/typechecker/Formula.scala#// Heuristic extension to Dan Smith's algorithm:", "The ancestors' sort."),
  FORKS,
]

H_BRIEFING = [
  ('P-169', "The decision whose threads' shape you build.", CHECK),
  ('P-167', "The device, walk's loader answering a helper's name with walk's own operation.", CHECK),
  ('P-58', "The binding's form."),
  ('P-162', "The pair, for val's T."),
  ('F-328', "The loader's table, which you extend.", CHECK),
  ('F-298', "The compiled rewrite checks a binding against the helper's Java signature.", CHECK),
  ('ledger:82', 'Compiled spawn, which stays.', CHECK),
  ('doc:explorations/reviews/natives-device-2026-11-07.md#3.2 Threads, abort, the task trace, 6 (Q1: yes)', 'The way and its ground.', CHECK),
  ('doc:explorations/reviews/natives-remainder-2026-11-07.md#2.6 Thread 5 and printTaskTrace 1', "The team's sources and the ways."),
  ('code:' + SRC + 'interpreter/glue/NativeApp.java#static final java.util.Map<String, String> OWN_OPERATIONS', 'The table you extend.', CHECK),
  ('doc:' + SRC + 'nativeHelpers/runtime.java', "The team's helper class over the compiled run time, which you extend.", CHECK),
  ('doc:' + SRC + 'interpreter/glue/prim/Thread.java', "Walk's glue, which the table names."),
  ('code:' + SRC + 'runtimeSystem/BaseTask.java#public static boolean inATransaction() {', "The compiled run time's test of a transaction."),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x) {', 'The compiled atomic, which retries on the compiled abort.'),
  ('doc:Specification/advanced/parallelism-locality/transactions.tex#Abortable Atomicity', "abort's meaning, inside and outside an atomic expression."),
  FORKS,
]

S_BRIEFING = [
  ('doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355', 'The answer whose option 1 you build.', CHECK),
  ('F-321', 'The checker reads the whole helper class, and systemOps fails it.', CHECK),
  ('ledger:895', 'The row that closes with your rung.', CHECK),
  ('ledger:896', 'getProperty at an empty name, which stays as it is.'),
  ('P-58', "The binding's form."),
  ('P-37', "The compiler's prelude, which keeps its import of systemOps."),
  ("doc:explorations/reviews/natives-remainder-2026-11-07.md#2.5 System's getProgramArgsPrim, 1", "Q3's ways and its default.", CHECK),
  ('doc:' + SRC + 'nativeHelpers/systemOps.java', 'The helpers you move.', CHECK),
  ('doc:Library/System.fss', 'The bindings you retarget.', CHECK),
  ('doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss', 'The compiled guard you retarget.', CHECK),
  ('code:' + SRC + 'interpreter/glue/prim/StringPrim.java#public static final class GetProgramArgs extends NativeFn0 {', "Walk's arguments today and their driver."),
  ('doc:' + SRC + 'runtimeSystem/MainWrapper.java', 'The compiled main, which holds the arguments.'),
  (PROBES + "Probe 3. The checker over System, with rung S and with Q3's default", 'The base, control A and control B.', CHECK),
  ('map:README.md#7. Touch this, and that moves@nativeHelpers', "The territory map's row on helper classes and their wrappers."),
  FORKS,
]

T_BRIEFING = [
  ('ledger:733', 'The row you close.', CHECK),
  ('ledger:732', 'Its sibling in the same method, which is not yours.'),
  ('F-34', "The code generator's refusals in the library, by kind.", CHECK),
  ('P-33', 'Code-generator work beside the natives.'),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)', 'The method that stops.', CHECK),
  ('code:' + SRC + 'scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex', "The table's look-up that throws.", CHECK),
  ('code:' + SRC + 'compiler/phases/CodeGenerationPhase.java#private TypeAnalyzer newTypeAnalyzer(', "How the code generator's table is made, over the component and the api environment."),
  ('doc:ProjectFortress/compiler_tests/RecursiveApiTest3.test', 'A compiled test with its own apis, the form of yours.'),
  ('doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal', "The library's sites of each kind."),
  (PROBES + "Probe 4. Rung T's wall on today's tree", 'The wall on this base, with its stack.', CHECK),
  FORKS,
]


ORDER = ('V', 'R', 'A', 'K', 'H', 'S', 'T')
_B = {'V': V_BRIEFING, 'R': R_BRIEFING, 'A': A_BRIEFING, 'K': K_BRIEFING, 'H': H_BRIEFING, 'S': S_BRIEFING, 'T': T_BRIEFING}
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
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
