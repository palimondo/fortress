# The briefing and checks lists of climb batch 27's rungs (CLIMB-BATCH-27.md, section 1, "The manifest, rung by
# rung"), made from plan-26/manifest/lists26.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is there. A checks
# list is a sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. No key holds a
# backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading without its
# backticks.
# Changed from lists26.py: the keys are the record's section 1, each rung's briefing bullets in their order, each key
# as the record writes it, its backticks dropped and REC spelled out, each with the record's reason, its first letter
# capitalized but where it opens with a code name (random's, flatConcat's, getProperty), and the checks those the
# record marks (check). The record gives every key its reason, so OWN_REASONS is empty; check27.js compares every
# key, reason and check, and the record's counts, with this file. The rungs, in the manifest's order: N, I, F, C, W,
# S. No rung has a planner's text or sample, so no key names plan-27/probes/.
# `python3 -B lists27.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form, in $FORTRESS_HOME (this checkout by default); it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-27.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
PROBES = REC + "The planner's probes"
FORKS = (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken.")

N_BRIEFING = [
  ('P-160', 'The decision whose second step you build.'),
  ('P-44', "AnyIntegral's clause, which stays."),
  ('F-318', 'The first step as landed, and the programs it loaded without the clause.'),
  ('F-151', "The vectors' bound by Number, whose stated reason your change removes."),
  ('ledger:551', 'The row whose test you retarget.'),
  ('ledger:596', 'The row whose Number half closes.'),
  ('ledger:440', "0/0 equal to itself, which Number's = reaches today at a program's type."),
  ('doc:explorations/reviews/number-closure-2026-11-05.md#6. The options', 'Option (b), its step 2 and its files.'),
  ('doc:explorations/reviews/number-closure-2026-11-05.md#2. What the clause does', 'What leans on the clause, measured.'),
  ('code:Library/ReflectiveQuickCheck.fss#object genType(top:Type)', 'The generator you give a way to make a Number.'),
  ('code:Library/FortressLibrary.fss#exactValue(x: Number): QQ', "The unlisted case that Number's = reaches."),
  ('doc:ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss', 'The test you retarget.'),
  (PROBES, 'The walk runs without the clause on this base.'),
  FORKS,
]
N_CHECKS = ['P-160', 'F-318', 'ledger:551', 'doc:explorations/reviews/number-closure-2026-11-05.md#6. The options',
  'doc:explorations/reviews/number-closure-2026-11-05.md#2. What the clause does',
  'code:Library/ReflectiveQuickCheck.fss#object genType(top:Type)',
  'code:Library/FortressLibrary.fss#exactValue(x: Number): QQ', PROBES]

I_BRIEFING = [
  ('P-162', "The decision whose integers' rung you build."),
  ('P-69', "A shift's count and width, on both paths."),
  ('P-153', "An integer power's type, and its negative exponents."),
  ('P-58', "The binding's form, and the check from the step that moves a binding."),
  ('F-308', 'The NN32 and NN64 transfers that the compiled rewrite adds.'),
  ('ledger:441', "The prelude's ZZ32 power, whose contract your helpers keep."),
  ('ledger:442', "The prelude's missing shifts on NN32 and NN64."),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.1 Group 1', 'The 16 bindings, their glue and their values under walk.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(a) A public converting declaration', 'The pair pattern, its two spellings and its files.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group', 'The option the decision took.'),
  ('code:' + SRC + 'interpreter/glue/prim/Int.java#public static long shiftCount(FValue y)', "The glue's count, which your conversion keeps."),
  ('code:' + SRC + 'interpreter/glue/prim/Int.java#public static long powCount(FValue y)', "The glue's exponent, which your conversion keeps."),
  ('code:' + SRC + 'interpreter/glue/prim/Int.java#public static long negativePow(long base, long exp)', "The glue's answers at a negative exponent."),
  ('map:compile-path-walkthrough.md#7. Native bindings in both worlds', "The territory map's two binding mechanisms."),
  (PROBES, "The base's sites, and the conversions one line below them."),
  FORKS,
]
I_CHECKS = ['P-162', 'P-69', 'P-153', 'P-58', 'doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.1 Group 1',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#(a) A public converting declaration',
  'code:' + SRC + 'interpreter/glue/prim/Int.java#public static long shiftCount(FValue y)',
  'code:' + SRC + 'interpreter/glue/prim/Int.java#public static long powCount(FValue y)', PROBES]

F_BRIEFING = [
  ('P-162', "The decision whose floats' rung you build."),
  ('P-58', "The binding's form, and the check from the step that moves a binding."),
  ('F-299', "The loader's carriers, FlatString's self and a Char in an int among them."),
  ('F-308', 'The Char transfer on the compiled path.'),
  ('F-301', 'Why a helper beats a Fortress composition on the compiled path.'),
  ('ledger:872', 'A Char past U+FFFF read as its low 16 bits, which flatConcat at a Char keeps.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.2 Group 2', 'The three over Number, and their defects at a rational.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.3 Group 3', 'The six, their glue and their values under walk.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(b) New helpers', 'The one-line helpers for group 3.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group', 'The option the decision took.'),
  ('code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class IFloor extends R2L', "A bracket's glue."),
  ('code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class Random extends Util.R2R', "random's glue, which your helper computes as."),
  ('code:' + SRC + 'interpreter/glue/prim/FlatString.java#public static final class Concat extends ss2S', "flatConcat's glue at a Char."),
  ('map:compile-path-walkthrough.md#7. Native bindings in both worlds', "The territory map's two binding mechanisms."),
  (PROBES, "The base's sites."),
  FORKS,
]
F_CHECKS = ['P-162', 'P-58', 'F-299', 'doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.2 Group 2',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.3 Group 3',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#(b) New helpers',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group',
  'code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class Random extends Util.R2R', PROBES]

C_BRIEFING = [
  ('P-163', 'The decision you build.'),
  ('P-96', 'The revision form.'),
  ('P-95', 'Why every change keeps its original.'),
  ('F-308', "Char's helpers, and the one binding left on glue."),
  ('ledger:861', 'The row you close.'),
  ('doc:explorations/reviews/char-asexprstring-2026-11-06.md#(d) The helper', 'The option the decision took.'),
  ('doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.4 Whether each form reads back', "The parser's two gaps and the sweep."),
  ('doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.3 The two forms', "Walk's and the helper's texts on the same characters."),
  ('doc:Specification/basic/lexical-structure.tex#Character Literals', 'The list you revise.'),
  ('doc:Specification/appendices/changes.tex#A comparison at a NaN', "An Appendix I entry's form."),
  ('code:' + SRC + 'nativeHelpers/simpleChar.java#public static String charToExprString(int x)', 'The helper you complete.'),
  ('code:' + SRC + 'parser/Literal.rats#private String UnicodeHexChar =', "The parser's rule you reorder."),
  ('doc:ProjectFortress/tests/NativeHelperFamilyCharWalk.fss', 'The walk guard you extend.'),
  ('doc:ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss', 'The compiled guard you extend.'),
  ('map:spec-to-implementation.md#Chapter 4, Lexical Structure', "The territory map's row for character literals."),
  FORKS,
]
C_CHECKS = ['P-163', 'P-96', 'F-308', 'ledger:861',
  'doc:explorations/reviews/char-asexprstring-2026-11-06.md#(d) The helper',
  'doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.4 Whether each form reads back',
  'doc:Specification/basic/lexical-structure.tex#Character Literals',
  'code:' + SRC + 'nativeHelpers/simpleChar.java#public static String charToExprString(int x)',
  'code:' + SRC + 'parser/Literal.rats#private String UnicodeHexChar =']

W_BRIEFING = [
  ('P-164', 'The decision whose writer rung you build.'),
  ('P-58', "The binding's form."),
  ('F-321', 'The checker reads the whole helper class, so both traits and both table entries come in this rung.'),
  ('F-299', "Walk's loader and its carriers, which your change extends."),
  ('ledger:841', "FileWriteStream's flush, declared in its api and absent from its component."),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type', 'The option the decision took, its files and its tests.'),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk', "Today's values, which your tests keep."),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.3 What the compiled prelude does', "The prelude's helpers for the same operations."),
  ('code:' + SRC + 'interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)', "The loader's carrier by name, which you extend."),
  ('code:' + SRC + 'interpreter/glue/StaticNativeApp.java#static FValue box(Class<?> c, String declared, Object r)', "How the loader boxes a helper's result."),
  ('code:' + SRC + 'compiler/NamingCzar.java#private static com.sun.fortress.nodes.Type oneLibraryTypeForForeignJavaType(String s, String method_name, boolean isResultType)', "The checker's walk-world reading of a helper's Java types."),
  ('doc:Library/Writer.fss', 'The component you rewrite.'),
  ('doc:' + SRC + 'nativeHelpers/fileOps.java', 'The helpers you bind.'),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait JavaBufferedWriter excludes', "The prelude's trait, whose names and methods yours take."),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Int extends ZZ32', "Walk's native object below a library trait, the precedent."),
  ('map:compile-path-walkthrough.md#7. Native bindings in both worlds', "The territory map's two binding mechanisms."),
  FORKS,
]
W_CHECKS = ['P-164', 'P-58', 'F-321', 'F-299',
  'doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type',
  'doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk',
  'code:' + SRC + 'interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)',
  'code:' + SRC + 'compiler/NamingCzar.java#private static com.sun.fortress.nodes.Type oneLibraryTypeForForeignJavaType(String s, String method_name, boolean isResultType)',
  'doc:Library/Writer.fss']

S_BRIEFING = [
  ('doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355', 'The answer whose option 1 you build.'),
  ('F-321', 'The checker reads the whole helper class, and systemOps fails it.'),
  ('ledger:895', 'The row that closes with your rung.'),
  ('ledger:896', 'getProperty at an empty name, which stays as it is.'),
  ('P-58', "The binding's form."),
  ('P-37', "The compiler's prelude, which keeps its import of systemOps.getProperty."),
  ('doc:' + SRC + 'nativeHelpers/systemOps.java', 'The helpers you move.'),
  ('doc:Library/System.fss', 'The two bindings you retarget.'),
  ('doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss', 'The compiled guard you retarget.'),
  ('map:README.md#7. Touch this, and that moves@nativeHelpers', "The territory map's row on helper classes and their wrappers."),
  (PROBES, 'The checker over System on this base, and its control.'),
  FORKS,
]
S_CHECKS = ['doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355', 'F-321', 'ledger:895',
  'doc:' + SRC + 'nativeHelpers/systemOps.java', 'doc:Library/System.fss',
  'doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss', PROBES]

ORDER = ('N', 'I', 'F', 'C', 'W', 'S')
_B = {'N': (N_BRIEFING, N_CHECKS), 'I': (I_BRIEFING, I_CHECKS), 'F': (F_BRIEFING, F_CHECKS),
      'C': (C_BRIEFING, C_CHECKS), 'W': (W_BRIEFING, W_CHECKS), 'S': (S_BRIEFING, S_CHECKS)}
IDS = tuple(r for r in ORDER if _B[r][0])
LISTS = {r: ([k for k, _ in _B[r][0]], _B[r][1]) for r in IDS}
REASONS = {r: _B[r][0] for r in IDS}
# The keys whose reason the record does not give: none, since section 1 gives every key its reason.
OWN_REASONS = {}
assert all(k in LISTS[r][0] for r in OWN_REASONS for k in OWN_REASONS[r]), 'OWN_REASONS names a key not in its briefing'
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
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
