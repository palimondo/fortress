# The briefing and checks lists of climb batch 23's two rungs, C and W (CLIMB-BATCH-23.md, section 3), in batch 22's
# form (explorations/compile-ladder/plan-22/manifest/lists22.py) for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's section
# cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or harness fact,
# which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their
# numbers. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is there. A checks list is a
# sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. The record's section 5, "The
# briefings, rung by rung", holds the same keys. No key holds a backslash, a backtick or a double quote, which the
# script refuses; facts-extract matches a heading without its backticks.
# `python3 -B lists23.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress/'
NS = "doc:explorations/perf-probes/prelude/natives-shape.md#"
BP = "doc:explorations/perf-probes/prelude/natives-binding-probe.md#"
P23 = "doc:explorations/compile-ladder/plan-23/probes/"
REC = "doc:explorations/coordinator/CLIMB-BATCH-23.md#"

C_BRIEFING = [
  ("P-58", "The decision your rung builds half of: the bare builtinPrimitive form, the rewrite at the parse, the refusal, the check from the first moved binding."),
  ("F-180", "The import java machinery your rewrite goes through, its five gaps on walk, and the two findings that bear on a binding both paths share."),
  ("F-111", "The two stages call the compiled path's phases only, which is why your switch must be on there and the sentence your rung makes false."),
  ("ledger:309", "Your row: builtinPrimitive with no compiled-path counterpart, which the gather closes with your commit."),
  ("ledger:560", "How the checker reads a glue string's body today, which stays so for every string your rewrite leaves alone."),
  (BP + "1. Way 1's compiled half", "The rewrite as the binding probe built and ran it in a shadow: the shapes, the failures, why at the parse, and its cost."),
  (NS + "The names", "The foreign-type table and the well-known types that the switch-over renames, beside which your rung puts a stand-in reading now."),
  (P23 + "rung-C.patch", "Your text as the planner measured it with rung W's: the class, the hooks, the switch, the table and your three tests."),
  (REC + "The planner's probes", "The compiled half's tests, both stages on the two halves and the control that they check a moved binding, on the old base and the new."),
  (REC + "Forks the batch takes, none consequential", "Forks 2 to 5 and 14 to 18, the defaults your rung builds, each with the ways not taken."),
  ("code:" + SRC + "compiler/Parser.java#public static CompilationUnit importCollector(File file)", "The import collector, whose view of a file the repository builds its graph and foreign apis from: your second hook."),
  ("code:" + SRC + "repository/GraphRepository.java#private CompilationUnit readCUFor", "Where the repository reads that view, so a synthetic import must already be in it."),
  ("code:" + SRC + "Shell.java#private static GraphRepository specificRepository(Path p, CacheBasedRepository cache )", "The one place both repositories are made, the compiled path's and walk's: your switch."),
  ("code:" + SRC + "compiler/NamingCzar.java#public static com.sun.fortress.nodes.Type fortressTypeForForeignJavaType(String s, String method_name, boolean isResultType)", "How the checker reads a helper's Java types, the six special names among them, which your stand-in reading points at the one library."),
  ("code:" + SRC + "interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod)", "The body shape walk recognizes as a native, which your rewrite must recognize alike."),
]
C_CHECKS = [
  "P-58", "F-180", "ledger:309", BP + "1. Way 1's compiled half",
  P23 + "rung-C.patch", REC + "The planner's probes",
  "code:" + SRC + "compiler/Parser.java#public static CompilationUnit importCollector(File file)",
  "code:" + SRC + "Shell.java#private static GraphRepository specificRepository(Path p, CacheBasedRepository cache )",
]

W_BRIEFING = [
  ("P-58", "The decision your rung builds half of: walk loads the helper a builtinPrimitive string names, and the bindings move step by step."),
  ("P-29", "Walk's speed is irrelevant to every judgement of performance: the reflective call weighs nothing."),
  ("F-32", "The bindings and their classes, which your rung's first family begins to move, and whose count it changes."),
  ("F-180", "The five gaps of import java on walk and the two findings that bear on a shared binding: the raise and the compiled-world types."),
  ("ledger:796", "Your first row: walk loads a string only as a glue class, which the gather closes with your commit."),
  ("ledger:336", "Your second row: walk's DIV, REM and MOD by zero end the run, of which your family fixes ZZ32's DIV."),
  ("ledger:521", "Why CHOOSE stays on its glue class: its helper fails past its table, which walk would then meet."),
  (NS + "What each gap does to it", "The shape probe's gaps 4 and 5, the conversions and the raise translation your loader takes."),
  (NS + "The library's own construct, walk's half", "The 72-line loader your StaticNativeApp re-bases, measured with the suite green."),
  (P23 + "rung-W.patch", "Your text as the planner measured it with rung C's: the loader, its hook, the family's 21 strings and your five tests."),
  (REC + "The planner's probes", "The loader's tests, the family's texts, the values compared, and the suites on the batch's text, on the old base and the new."),
  (REC + "Forks the batch takes, none consequential", "Forks 6 to 15, the defaults your rung builds, each with the ways not taken."),
  (REC + "Question 2, consequential: the first family in this batch", "The curator's question your family depends on, with what each answer costs."),
  ("code:" + SRC + "interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod)", "Walk's native loader, where your hook goes before the glue class's load."),
  ("code:" + SRC + "interpreter/glue/prim/Int.java#public static FortressError overflow()", "How a native raises the library's IntegerOverflow so that a catch sees it: your raise translation's precedent."),
  ("code:Library/FortressLibrary.fss#trait ZZ32 extends", "Trait ZZ32 in the component, whose 19 bindings your family moves."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Int extends ZZ32", "Walk's numeral object Int, whose two getters your family moves and whose asFloat stays."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#The %builtinPrimitive% function is actually recognized..builtinPrimitive[", "The printed comment your rung revises in the revision form."),
  ("doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators", "What the specification says of integer division by zero, which your division test cites."),
]
W_CHECKS = [
  "P-58", "ledger:796", "ledger:336", "ledger:521",
  NS + "The library's own construct, walk's half",
  P23 + "rung-W.patch", REC + "The planner's probes",
  "code:" + SRC + "interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod)",
]

IDS = ('C', 'W')
_B = {'C': (C_BRIEFING, C_CHECKS), 'W': (W_BRIEFING, W_CHECKS)}
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
    bad = 0
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
