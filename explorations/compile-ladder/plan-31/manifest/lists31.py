# The briefing and checks lists of climb batch 31's rungs (CLIMB-BATCH-31.md, section 1, "The manifest, rung by
# rung"), made from plan-30/manifest/lists30.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is there, and CHECK where the
# record marks it (check): the checks list, read by the skeptic, a repair round and a judge, is those keys in order.
# No key holds a backslash, a backtick, a dollar sign or a double quote, which the script refuses; facts-extract
# matches a heading without its backticks.
# Changed from lists30.py: the record's two runs are run 1, climb batch 31, the rungs N, M, L, A and K, and run 2,
# climb batch 31b, the rungs T and D (RUNS; gen31.py and check31.js take --run). The keys are each rung's briefing
# bullets in section 1, in their order, each as the record writes it, its backticks dropped and REC, REH, PRB, NEQ,
# MCC, SPEC and SRC spelled out as section 1's opening paragraph gives them, each with the record's reason, its
# first letter capitalized unless the reason opens with code; a check is marked on its entry. The forks: the record's one forks key, REC "Forks the
# batch takes", section 3's forks whole, in every briefing once, as a check. Run 2's lists are the record's as
# drafted against run 1's base: its sections are re-read against run 1's landed tree before run 2's launch (the
# record's section 4), and this file is run again then.
# Fork W (the record's section 2, "The one question before the launch"): the lists are the record's, which is
# written for way (a), walk now. lists(ids, fork_w='b') gives rung N's lists for way (b), walk waits: the key of
# walk's choice for a call with a numeral, which the rung then does not edit, is left out, and the reasons of P-59
# and of rows 973 and 966 say that walk stays (W_B, below); gen31.py --fork-w b makes the same changes in a copy of
# the record, so that check31.js --fork-w b finds the two alike.
# lists(ids) gives the lists of the rungs ids, a rung left out by --without dropping from the block; LISTS and REASONS
# are lists(IDS).
# `python3 -B lists31.py [--run 1|2] [--fork-w a|b]` checks every key with facts-extract.sh --check (each must match
# exactly one place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that
# run, or of both runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the
# batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-31.md#"
REH = "doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#"
PRB = "doc:explorations/compile-ladder/plan-31/PROBES.md#"
NEQ = "doc:explorations/reviews/numeral-equality-ways-2026-11-10.md#"
MCC = "doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

N_BRIEFING = [
  ('P-46', "The decision you build, with the numeral's rule and its tie.", CHECK),
  ('P-49', "The checker's order of attempts, and its exception for a numeral.", CHECK),
  ('P-173', "Where a numeral converts, and its default as the last resort.", CHECK),
  ('P-174', "The numeral types; no = ties one to a number type.", CHECK),
  ('P-176', "One value for each place where a numeral is written."),
  ('P-168', "The library's = over Any, which stays.", CHECK),
  ('P-165', "Which pairs of number types compare by =."),
  ('P-59', "Walk chooses a coercion by the run-time value; fork W reads it.", CHECK),
  ('P-12', "Walk runs the checker only after the switch-over."),
  ('P-148', "The checker's timing for your edit.", CHECK),
  ('P-37', "The prelude is not changed for this."),
  ('ledger:973', "u = 0 under walk, which closes.", CHECK),
  ('ledger:966', "u =/= 0 under walk, which closes.", CHECK),
  ('ledger:975', "The case clause, its kin.", CHECK),
  ('ledger:976', "A program's own number type, its kin.", CHECK),
  ('ledger:390', "The dispatcher at Any that is never emitted; its numeral case is yours.", CHECK),
  ('ledger:989', "The float numeral beside a value, two declarations by coercion.", CHECK),
  (NEQ + 'Way B. A numeral goes to the most specific declaration that takes it; the default is the last resort', "The way, what it sees, keeps and bends.", CHECK),
  (NEQ + '2.3 The one thing measured: the checker against the one library', "What the checker chooses today, call by call.", CHECK),
  ("doc:explorations/reviews/batch-30-review.md#Part 5. What changes run 2's plan", "The sites in walk and the checker that the last landing left."),
  (MCC + '2. A line of the model that the checker refuses against the one library', "The model line and its driver."),
  (SPEC + 'basic/conversions-coercions.tex#Coercion Resolution', "The specification's rule and the sentences you change.", CHECK),
  ('code:' + SRC + 'scala_src/typechecker/impls/Functionals.scala#def typedApplication(', "The checker's attempts at a call.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchForNumerals', "Walk's choice for a call with a numeral.", CHECK),
  ('code:Library/FortressLibrary.fss#trait Equality', "Where =/= goes."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

M_BRIEFING = [
  ('P-47', "Each integer type declares its own MIN, MAX and MINMAX beside the inherited ones: the library's shape that row 990 meets.", CHECK),
  ('P-149', "An abstract method from one trait and its body from another.", CHECK),
  ('P-147', "An object defines an inherited abstract method by bodies that cover it."),
  ('ledger:990', "The method written twice, which closes.", CHECK),
  ('ledger:732', "The body inherited through an api's trait, which closes.", CHECK),
  ('ledger:571', "The nearest older row; its test is a guard or a promotion.", CHECK),
  ('ledger:495', "The generic dotted methods' dispatch, which is not yours."),
  (REH + 'W6. One method written twice into a class', "The library's 27 classes, and the hack that failed after a rebuild.", CHECK),
  (REH + "W16. The library's vector algebra", "The library's site, Indexed's map on a range object.", CHECK),
  (PRB + '2. The walls under the prelude', "The reproducers and their narrowing.", CHECK),
  (SPEC + 'basic/traits.tex#Method Declarations', "What a trait's own declaration does to an inherited one.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void dumpMethodChaining', "Where the forwarders are gathered.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl', "How one forwarder is written."),
  ('code:Library/FortressLibrary.fss#trait StandardTotalOrder', "The library's precedent, bodies beside inherited bodies."),
  ('map:compile-path-walkthrough.md#5. Code generation', "How the code generator walks a trait and an object."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

L_BRIEFING = [
  ('P-175', "A group joins every arm that it forked before it completes abruptly, which an exit out of a parallel loop meets.", CHECK),
  ('F-19', "What may run in parallel, and what each path forks."),
  ('ledger:81', "The refusal, which closes.", CHECK),
  (REH + 'W9. ', "The library's sites of label.", CHECK),
  (SPEC + 'basic/expressions/label.tex#Label and Exit', "The construct.", CHECK),
  (SPEC + 'basic/evaluation/parallelism.tex#Threads and Parallelism', "When a group completes abruptly."),
  (SPEC + 'basic/expressions/atomic.tex#Atomic Expressions', "What an exit out of an atomic block does to the block's writes.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forLabel', "Walk's label, the precedent.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forExit', "Walk's exit.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forFnExpr', "How a loop's body becomes a closure, which an exit leaves."),
  ('code:Library/FortressLibrary.fss#trait Indexed[', "The library's indexOf, an exit out of a for."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

A_BRIEFING = [
  ('P-169', "The compiled transaction's slots, the shape your work stays within.", CHECK),
  ('ledger:875', "The atomic expression, which closes.", CHECK),
  ('ledger:319', "The field outside the transaction, which closes.", CHECK),
  ('ledger:641', "What a check before every access costs."),
  ("doc:explorations/reviews/parallelism-foundations-2026-11-08.md#1.6 The code generator's", "The block's code and its gaps.", CHECK),
  (SPEC + 'basic/expressions/atomic.tex#Atomic Expressions', "The atomic expression.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)', "The block's code and handler, as climb batch 30 landed them.", CHECK),
  ('code:' + SRC + 'compiler/codegen/VarCodeGen.java#public static class MutableFieldVar', "A field's read and write.", CHECK),
  ('code:' + SRC + 'compiler/codegen/VarCodeGen.java#public static class FieldVar', "A value parameter's read and write, a var one's among them.", CHECK),
  ('code:Library/OneShotFlag.fss#object OneShot', "The library's site.", CHECK),
  ('map:modules-and-phases.md#B.11 The runtime', "The compiled run time and its transaction."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

K_BRIEFING = [
  ('P-60', "A comprises clause speaks of values.", CHECK),
  ('P-146', "self in a self-typed trait.", CHECK),
  ('ledger:991', "The missing cast, which closes.", CHECK),
  ('ledger:695', "The returned self, which closes if the same cast reaches it.", CHECK),
  ('ledger:307', "The run-time size's VerifyError, a kin that you report on."),
  ('ledger:815', "The functional method of a listed object, a kin that you report on."),
  (REH + "W7. Missing casts that the JVM's verifier refuses", "The library's site, QQ and Ratio.", CHECK),
  ("doc:explorations/reviews/carriers-ways-2026-11-13.md#Way C. The object's class carries the value, and the trait stays an interface", "What a trait with one listed object may mean for descriptors later; not built here."),
  (SPEC + 'basic/traits.tex#Trait Declarations', "The comprises clause.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void conditionallyCastParameter(Option<Type> apparent_type', "Where an argument is cast today.", CHECK),
  ('map:compile-path-walkthrough.md#5. Code generation', "How the code generator walks a call.", CHECK),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

T_BRIEFING = [
  ('P-156', "An index type extends Index, and a tuple of indices is an Index.", CHECK),
  ('ledger:992', "The method over a tuple index type, which closes.", CHECK),
  ('ledger:832', "The generic dotted method with a tuple parameter, which closes.", CHECK),
  ('ledger:819', "The postfix operator on a tuple operand, which closes.", CHECK),
  (REH + 'W15. An array of rank 2', "The library's site.", CHECK),
  (PRB + '2. The walls under the prelude', "The reproducer, and its form with the verifier on.", CHECK),
  (SPEC + 'basic/expressions/method-invocation.tex#Dotted Method Invocations', "A dotted call's argument.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private Type receiverPrependedDomainType', "Where the receiver joins a tuple domain's elements.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl', "The forwarder, as run 1 left it.", CHECK),
  (REC + "M. The methods that a trait's or an object's class inherits", "What rung M built in the same code, which you build on."),
  ('map:compile-path-walkthrough.md#5. Code generation', "How the code generator walks a method and a call."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

D_BRIEFING = [
  ('P-9', "The model writes its hyperparameters as tuple bindings.", CHECK),
  ('P-87', "A model line does not change."),
  ('P-173', "The default type of a numeral where nothing fixes one, which each name of such a binding takes.", CHECK),
  ('P-148', "The checker's timing for your edit.", CHECK),
  ('ledger:988', "The stop, which closes.", CHECK),
  ('ledger:474', "The names typed so that they are accepted anywhere, which closes.", CHECK),
  ('ledger:175', "The single-binding form, the workaround that the model does not take."),
  (MCC + "3. The model's hyperparameter lines do not compile under either library", "The runs and the code generator's site.", CHECK),
  (SPEC + 'basic/variables.tex#Top-Level Variable Declarations', "The tuple notation.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void forVarDeclPrePass', "The code generator's case.", CHECK),
  ('map:compile-path-walkthrough.md#3. The checker', "How the checker types top-level variables."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

# Fork W at (b), walk waits: what changes in rung N's lists. A key in W_B_DROP is left out; a key in W_B_REASON takes
# the reason given here. gen31.py's W_B_RECORD holds the same changes of the record's bullets.
W_B_DROP = ('code:' + SRC + 'interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchForNumerals',)
W_B_REASON = {
  'P-59': 'Walk chooses a coercion by the run-time value; by the answer to fork W, walk is not changed in this rung.',
  'ledger:973': 'u = 0 under walk, which stays open.',
  'ledger:966': 'u =/= 0 under walk, which stays open.',
}

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('N', 'M', 'L', 'A', 'K'), '2': ('T', 'D')}
ORDER = RUNS['1'] + RUNS['2']
_B = {'N': N_BRIEFING, 'M': M_BRIEFING, 'L': L_BRIEFING, 'A': A_BRIEFING, 'K': K_BRIEFING, 'T': T_BRIEFING, 'D': D_BRIEFING}
IDS = tuple(r for r in ORDER if _B[r])
assert all([e[0] for e in _B[r]].count(FORKS_SECTION) == 1 for r in IDS), 'each briefing names the forks once'
assert all(k in [e[0] for e in N_BRIEFING] for k in W_B_DROP + tuple(W_B_REASON)), 'fork W names keys of rung N'


def lists(ids=IDS, fork_w='a'):
    """(LISTS, REASONS) for the rungs ids: LISTS[r] is (briefing keys, checks keys), REASONS[r] the (key, reason) pairs."""
    assert all(r in IDS for r in ids), ids
    assert fork_w in ('a', 'b'), fork_w
    out_l, out_r = {}, {}
    for r in ids:
        es = [(e[0], e[1], len(e) > 2 and e[2]) for e in _B[r]]
        if r == 'N' and fork_w == 'b':
            es = [(k, W_B_REASON.get(k, why), c) for k, why, c in es if k not in W_B_DROP]
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
    assert run is None or run in RUNS, 'usage: lists31.py [--run 1|2] [--fork-w a|b]'
    fork_w = sys.argv[sys.argv.index('--fork-w') + 1] if '--fork-w' in sys.argv else 'a'
    assert fork_w in ('a', 'b'), 'usage: lists31.py [--run 1|2] [--fork-w a|b]'
    CHECKED = RUNS[run] if run else IDS
    print('rungs', ', '.join(CHECKED), '(run ' + run + ')' if run else '(both runs)', '| fork W at (' + fork_w + ')')
    LISTS, REASONS = lists(IDS, fork_w)

    def check(keys):
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + list(keys), capture_output=True, text=True, cwd=root)
        return r, [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
    for rid in CHECKED:
        b, c = LISTS[rid]
        rp = reason_problems(rid, REASONS)
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
