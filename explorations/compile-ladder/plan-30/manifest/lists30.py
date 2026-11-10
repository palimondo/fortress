# The briefing and checks lists of climb batch 30's rungs (CLIMB-BATCH-30.md, section 1, "The manifest, rung by
# rung"), made from plan-29b/manifest/lists29b.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is there, and CHECK where the
# record marks it (check): the checks list, read by the skeptic, a repair round and a judge, is those keys in order.
# No key holds a backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading
# without its backticks.
# Changed from lists29b.py: the record holds two runs, as CLIMB-BATCH-21.md did: run 1, climb batch 30, the rungs N, P
# and X; run 2, climb batch 30b, the rungs Y and C (RUNS; gen30.py and check30.js take --run). The keys are each
# rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks dropped and REC,
# PAR, REV, SNAP and SPEC spelled out as section 1's opening paragraph gives them, each with the record's reason, its
# first letter capitalized; a check is marked on its entry. The forks: the record's one forks key, REC "Forks the
# batch takes", section 3's forks whole, in every briefing once, with its (check) mark as section 1 gives it (on N, P,
# X and Y, none on C). Run 2's lists are the record's as drafted against run 1's base: its sections are re-read
# against run 1's landed tree before run 2's launch (the record's section 4), and this file is run again then.
# lists(ids) gives the lists of the rungs ids, a rung left out by --without dropping from the block; LISTS and REASONS
# are lists(IDS).
# `python3 -B lists30.py [--run 1|2]` checks every key with facts-extract.sh --check (each must match exactly one
# place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that run, or of both
# runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the batch is cut
# from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-30.md#"
PAR = "doc:explorations/reviews/parallelism-foundations-2026-11-08.md#"
REV = "doc:explorations/reviews/batch-29b-review.md#"
SNAP = "doc:explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

N_BRIEFING = [
  ('P-174', "The numeral types, every number type's coercion generic over the four numbers, a numeral type written only as a parameter's type.", CHECK),
  ('P-176', 'One value per place, filled when the class loads; row 971 is where the tree departs.', CHECK),
  ('P-173', "Where a numeral converts, the refusal of one outside its type's range, the default; the specification names the one that rounds to an infinity.", CHECK),
  ('P-37', "The prelude's exception for the numerals, under which the two coercions fall.", CHECK),
  ('P-12', 'Walk refuses when a place runs, until it runs the checker.'),
  ('ledger:442', "The prelude's gaps; its numeral half closes, the rest stays.", CHECK),
  ('ledger:971', 'The coercion that starts a task, which closes.', CHECK),
  ('ledger:958', 'The float numeral left of an RR32, which closes.', CHECK),
  ('ledger:967', 'The numeral that rounds to an infinity under walk, which closes.', CHECK),
  ('ledger:974', 'The numeral type written under walk, which closes if step 7 lands.', CHECK),
  ('ledger:960', "The leading zeros; its reproducer is yours, its repair rung C's."),
  ('ledger:973', 'The number and the numeral at =, which is not yours and whose test you leave.'),
  (REV + '1. Fidelity', "The eight places of the field numerals' code, and the library types' own ways.", CHECK),
  (REV + '2. The two paths', 'Where the two paths still answer differently.', CHECK),
  (REV + 'Findings', 'Findings 1 and 2, with the ways and the recommended ones.'),
  (SNAP + '3. The design', "The design in the curator's confirmed words.", CHECK),
  (SNAP + '4. What it is not', 'The field numerals, whose remains you delete.'),
  ('code:' + SRC + 'runtimeSystem/MainWrapper.java#public static void main', 'Where the component class is loaded and initialized.', CHECK),
  ('map:modules-and-phases.md#B.11 The runtime', 'The compiled run time, its pool and its class loader.'),
  ('map:modules-and-phases.md#B.8 The interpreter tail', 'How walk runs a program after the phases.'),
  (REC + "The planner's probes", "Row 971's stack, by the planner's run.", CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

P_BRIEFING = [
  ('P-175', 'The decision you build: forked arguments, the grain size, every arm joined.', CHECK),
  ('F-19', 'What may run in parallel, and what each path forks today.', CHECK),
  ('ledger:947', 'The group that does not wait, which closes.', CHECK),
  ('ledger:951', 'The arguments in order, which closes.', CHECK),
  ('ledger:497', "The arm's local in slot 0, which closes.", CHECK),
  ('ledger:322', 'The atomic block that ends an arm; its arm case is yours.', CHECK),
  ('ledger:640', 'The deep recursion of forked operands, which forked arguments widen.'),
  ('ledger:876', 'The current task after an arm run in place, which you leave.'),
  (PAR + '1.3 Compiled: tasks', 'The pool, the tasks and the arms as the code has them.', CHECK),
  (PAR + '1.7 ParallelismAnalyzer', "The analyzer's rule and its defects.", CHECK),
  (PAR + '1.8 Library', "The one library's range and the prelude's parloop.", CHECK),
  (PAR + '1.1 Walk: tasks', "Walk's group, which joins every arm: the precedent."),
  (PAR + '5. The JVM side', 'Publication by fork and join, and what an arm left running breaks.'),
  (SPEC + 'basic/evaluation/parallelism.tex#Threads and Parallelism', 'When a group completes abruptly.', CHECK),
  (SPEC + 'basic/expressions/also.tex#Parallel Do Expressions', 'The arms of a parallel do.'),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void genParallelExprs', 'The fork and the joins.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void evalArg', 'The arguments in order.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void generateTaskCompute', "An arm's method."),
  ('code:' + SRC + 'runtimeSystem/BaseTask.java#public final void joinOrRun', 'The join, with the current task saved and restored.'),
  ('code:Library/RangeInternals.fss#object CompactFullParScalarRange', "The parallel range's split.", CHECK),
  ('code:Library/RangeInternals.fss#object CompactFullSeqScalarRange', "The sequential range, the library's own way for a chunk.", CHECK),
  ('map:compile-path-walkthrough.md#5. Code generation', 'How the code generator walks the tree.'),
  ('map:modules-and-phases.md#B.11 The runtime', 'The compiled run time.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

X_BRIEFING = [
  ('P-169', "The compiled store and the transaction's slots, the shape your work stays within.", CHECK),
  ('ledger:933', 'The block that never ends, which closes.', CHECK),
  ('ledger:934', "The nested block's abort at the outer handler, which closes.", CHECK),
  ('ledger:937', 'The nested abort that reruns the outer block, which closes.', CHECK),
  ('ledger:888', 'The nested try, the same order of handlers, which closes.', CHECK),
  ('ledger:324', 'The exception that leaves the writes, which closes.', CHECK),
  ('ledger:949', 'The shared read set, which closes.', CHECK),
  ('ledger:950', "The nested block's view, which closes.", CHECK),
  ('ledger:466', 'The element initialized twice; its sentence on two transactions is yours.', CHECK),
  ('ledger:948', 'Plain writes beside a block, which is not yours.'),
  ('ledger:641', 'The check before every access, which you leave as it is.'),
  (PAR + '1.4 Compiled: the STM', 'The algorithm as the code has it.', CHECK),
  (PAR + '1.5 Compiled: arrays', 'The stores inside a transaction.'),
  (PAR + '1.6 The code generator', "The block's handler and its gaps.", CHECK),
  (PAR + '1.2 Walk: the STM', "Walk's transaction, the reference for the semantics."),
  (PAR + '3.2 Targeted programs', "The review's programs and their results, your tests' models.", CHECK),
  (PAR + '4. Design', 'What the specification defines, and what each path does.'),
  (PAR + '7.2 Known rows', "Row 933's wider mechanism, and the rows confirmed.", CHECK),
  (SPEC + 'basic/expressions/atomic.tex#Atomic Expressions', 'The atomic expression.', CHECK),
  (SPEC + 'advanced/parallelism-locality/transactions.tex#Abortable Atomicity', 'Abort.'),
  (SPEC + 'basic/expressions/try.tex#Try Expressions', 'The try expression.'),
  ('code:' + SRC + 'runtimeSystem/Transaction.java#private Any TXReadLocation..public void TXCommit', 'The read, the validation and the commit.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)', "The block's code and its handler.", CHECK),
  ('code:' + SRC + 'compiler/runtimeValues/FortressArrayStore.java#public boolean init', "The store's init."),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

Y_BRIEFING = [
  ('ledger:353', 'The tryatomic that does not compile, which closes.', CHECK),
  ('ledger:875', 'The atomic expression that does not compile, which closes.', CHECK),
  ('ledger:952', "Walk's tryatomic inside a block, which closes.", CHECK),
  ('ledger:319', 'The mutable field outside the transaction, which closes.', CHECK),
  ('ledger:322', "The atomic block on a stack that is not empty, after rung P's arm case.", CHECK),
  ('ledger:641', 'What a check before every access costs.'),
  (PAR + '1.6 The code generator', "The block's code and its gaps.", CHECK),
  (PAR + '1.4 Compiled: the STM', 'The transaction, as run 1 left it changed.'),
  (PAR + '1.2 Walk: the STM', "Walk's transaction and its tryatomic."),
  (SPEC + 'basic/expressions/atomic.tex#Atomic Expressions', 'Atomic and tryatomic.', CHECK),
  (SPEC + 'advanced/parallelism-locality/transactions.tex#Abortable Atomicity', 'Abort and tryatomic.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forTryAtomicExpr', "Walk's tryatomic.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forAtomicExpr', "Walk's atomic, the precedent."),
  ('code:' + SRC + 'compiler/codegen/VarCodeGen.java#public static class MutableFieldVar', "A field's read and write.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)', "The block's code, as run 1 left it changed."),
  (REC + 'X. The compiled transaction', 'What rung X built, which you build on.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

C_BRIEFING = [
  ('P-173', 'The default where nothing fixes a type.', CHECK),
  ('P-174', 'The four numbers, the digit count among them.', CHECK),
  ('P-176', "One value per place, and per instance where the place's type names a type parameter.", CHECK),
  ('P-148', "The checker's timing for your edit.", CHECK),
  ('ledger:960', 'The leading zeros, which closes.', CHECK),
  ('ledger:963', "The selector's type, which closes.", CHECK),
  ('ledger:964', "The code generator's stop that a reachable clause then meets."),
  ('ledger:957', 'The place at a type parameter, which closes.', CHECK),
  (REV + '1. Fidelity', "The code generator's and the checker's numerals as landed."),
  (REV + '2. The two paths', 'The differences that stand.', CHECK),
  (SNAP + '3. The design', "The design in the curator's confirmed words.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private String numeralCoercionSiteDesc', 'Which places get a field.', CHECK),
  ('map:compile-path-walkthrough.md#6. The run', "The class loader that makes an instance's class."),
  ('map:modules-and-phases.md#B.6 Type checking', "The checker's place in the phases."),
  (FORKS_SECTION, 'The defaults you build.'),
]

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('N', 'P', 'X'), '2': ('Y', 'C')}
ORDER = RUNS['1'] + RUNS['2']
_B = {'N': N_BRIEFING, 'P': P_BRIEFING, 'X': X_BRIEFING, 'Y': Y_BRIEFING, 'C': C_BRIEFING}
IDS = tuple(r for r in ORDER if _B[r])
assert all([e[0] for e in _B[r]].count(FORKS_SECTION) == 1 for r in IDS), 'each briefing names the forks once'


def lists(ids=IDS):
    """(LISTS, REASONS) for the rungs ids: LISTS[r] is (briefing keys, checks keys), REASONS[r] the (key, reason) pairs."""
    assert all(r in IDS for r in ids), ids
    out_l, out_r = {}, {}
    for r in ids:
        es = [(e[0], e[1], len(e) > 2 and e[2]) for e in _B[r]]
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
    run = sys.argv[sys.argv.index('--run') + 1] if '--run' in sys.argv else None
    assert run is None or run in RUNS, 'usage: lists30.py [--run 1|2]'
    CHECKED = RUNS[run] if run else IDS
    print('rungs', ', '.join(CHECKED), '(run ' + run + ')' if run else '(both runs)')

    def check(keys):
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + list(keys), capture_output=True, text=True, cwd=root)
        return r, [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
    for rid in CHECKED:
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
            r, _ = check(keys)
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'NOT FOUND' in l or 'no match' in l.lower() or 'no line of' in l or 'no such file' in l]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
        # The forks key alone: what the rung reads of section 3.
        fk = [k for k in b if k == FORKS_SECTION]
        r, sizes = check(fk)
        total = [l for l in r.stdout.strip().splitlines() if l.startswith('Total')]
        print(rid, 'forks', ', '.join(k.split('#')[-1] for k in fk), '(whole) |', ' + '.join(map(str, sizes)), '=', sum(sizes), 'bytes |', total[0] if total else r.stderr.strip()[:200])
        if r.returncode or len(sizes) != len(fk) or len(fk) != 1:
            print('   PROBLEM the forks key is not held once, or matches no one place'); bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
