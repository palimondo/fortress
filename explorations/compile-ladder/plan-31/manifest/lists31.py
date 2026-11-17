# The briefing and checks lists of climb batch 31's rungs (CLIMB-BATCH-31.md, section 1, "The manifest, rung by
# rung"), for the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each
# list holds what the rung's section cites, the decisions, the ledger rows, the notes and the code it rests on, and
# no process position or harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and
# FACTS entries are keyed by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is
# there, and CHECK where the record marks it (check): the checks list, read by the skeptic, a repair round and a
# judge, is those keys in order. No key holds a backslash, a backtick, a dollar sign or a double quote, which the
# script refuses; facts-extract matches a heading without its backticks.
# Brought in line with the record on 2026-11-16: the record's two runs are run 1, climb batch 31, the rungs M, K, L,
# A, V and X, and run 2, climb batch 31b, the rungs T, O and E (RUNS; gen31.py and check31.js take --run). Rungs N
# and D left with climb batch 32, and fork W with them, so there is no --fork-w. The keys are each rung's briefing
# bullets in section 1, in their order, each as the record writes it, its backticks dropped and REC, REH, PRB, MRG,
# SPEC and SRC spelled out as section 1's opening paragraph gives them, each with the record's reason, its first
# letter capitalized; a check is marked on its entry. The forks: the record's one forks key, REC "Forks the batch
# takes", section 3's forks whole, in every briefing once, as a check. Run 2's lists were brought in line again on
# 2026-11-17, when its sections were read again against run 1's landed tree (7858d0e97b) before run 2's launch: T
# gained rung K's cast, O rows 785 and 1044, and E P-50 and rows 1043 and 340.
# lists(ids) gives the lists of the rungs ids, a rung left out by --without dropping from the block; LISTS and REASONS
# are lists(IDS).
# `python3 -B lists31.py [--run 1|2]` checks every key with facts-extract.sh --check (each must match exactly one
# place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that run, or of both
# runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-31.md#"
REH = "doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#"
PRB = "doc:explorations/compile-ladder/plan-31/PROBES.md#"
MRG = "doc:explorations/compile-ladder/plan-31/probes/number-object-merge.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

M_BRIEFING = [
  ("P-47", "Each integer type declares its own MIN, MAX and MINMAX beside the inherited ones: the library's shape that row 990 meets.", CHECK),
  ("P-149", "An abstract method from one trait and its body from another.", CHECK),
  ("P-147", "An object defines an inherited abstract method by bodies that cover it."),
  ("ledger:990", "The method written twice, which closes.", CHECK),
  ("ledger:732", "The body inherited through an api's trait, which closes.", CHECK),
  ("ledger:571", "The nearest older row; its test is a guard or a promotion.", CHECK),
  ("ledger:495", "The generic dotted methods' dispatch, which is not yours."),
  ("ledger:1013", "A functional method of a generic trait as a value, a kin that you report on."),
  (REH + "W6. One method written twice into a class", "The library's 27 classes, and the hack that failed after a rebuild.", CHECK),
  (REH + "W16. The library's vector algebra", "The library's site, Indexed's map on a range object.", CHECK),
  (PRB + "2. The walls under the prelude", "The reproducers and their narrowing.", CHECK),
  (SPEC + "basic/traits.tex#Method Declarations", "What a trait's own declaration does to an inherited one.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private void dumpMethodChaining", "Where the forwarders are gathered.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl", "How one forwarder is written."),
  ("code:Library/FortressLibrary.fss#trait StandardTotalOrder", "The library's precedent, bodies beside inherited bodies."),
  ("map:compile-path-walkthrough.md#5. Code generation", "How the code generator walks a trait and an object."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

K_BRIEFING = [
  ("P-60", "A comprises clause speaks of values.", CHECK),
  ("P-146", "Self in a self-typed trait.", CHECK),
  ("ledger:991", "The missing cast, which closes.", CHECK),
  ("ledger:695", "The returned self, which closes if the same cast reaches it.", CHECK),
  ("ledger:307", "The run-time size's VerifyError, a kin that you report on."),
  ("ledger:815", "The functional method of a listed object, a kin that you report on."),
  (REH + "W7. Missing casts that the JVM's verifier refuses", "The library's site, QQ and Ratio.", CHECK),
  ("doc:explorations/reviews/carriers-ways-2026-11-13.md#Way C. The object's class carries the value, and the trait stays an interface", "What a trait with one listed object may mean for descriptors later; not built here."),
  (SPEC + "basic/traits.tex#Trait Declarations", "The comprises clause.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private void conditionallyCastParameter(Option<Type> apparent_type", "Where an argument is cast today.", CHECK),
  ("map:compile-path-walkthrough.md#5. Code generation", "How the code generator walks a call.", CHECK),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

L_BRIEFING = [
  ("P-175", "A group joins every arm that it forked before it completes abruptly, which an exit out of a parallel loop meets.", CHECK),
  ("F-19", "What may run in parallel, and what each path forks."),
  ("ledger:81", "The refusal, which closes.", CHECK),
  (REH + "W9. ", "The library's sites of label.", CHECK),
  (SPEC + "basic/expressions/label.tex#Label and Exit", "The construct.", CHECK),
  (SPEC + "basic/evaluation/parallelism.tex#Threads and Parallelism", "When a group completes abruptly."),
  (SPEC + "basic/expressions/atomic.tex#Atomic Expressions", "What an exit out of an atomic block does to the block's writes.", CHECK),
  ('code:' + SRC + "interpreter/evaluator/Evaluator.java#public FValue forLabel", "Walk's label, the precedent.", CHECK),
  ('code:' + SRC + "interpreter/evaluator/Evaluator.java#public FValue forExit", "Walk's exit.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forFnExpr", "How a loop's body becomes a closure, which an exit leaves."),
  ("code:Library/FortressLibrary.fss#trait Indexed[", "The library's indexOf, an exit out of a for."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

A_BRIEFING = [
  ("P-169", "The compiled transaction's slots, the shape your work stays within.", CHECK),
  ("ledger:875", "The atomic expression, which closes.", CHECK),
  ("ledger:319", "The field outside the transaction, which closes.", CHECK),
  ("ledger:641", "What a check before every access costs."),
  ("doc:explorations/reviews/parallelism-foundations-2026-11-08.md#1.6 The code generator's", "The block's code and its gaps.", CHECK),
  (SPEC + "basic/expressions/atomic.tex#Atomic Expressions", "The atomic expression.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)", "The block's code and handler, as climb batch 30 landed them.", CHECK),
  ('code:' + SRC + "compiler/codegen/VarCodeGen.java#public static class MutableFieldVar", "A field's read and write.", CHECK),
  ('code:' + SRC + "compiler/codegen/VarCodeGen.java#public static class FieldVar", "A value parameter's read and write, a var one's among them.", CHECK),
  ("code:Library/OneShotFlag.fss#object OneShot", "The library's site.", CHECK),
  ("map:modules-and-phases.md#B.11 The runtime", "The compiled run time and its transaction."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

V_BRIEFING = [
  ("P-178", "The decision that the two repairs come before.", CHECK),
  ("P-45", "Overloads may differ in their static parameters, and the Return Type Rule holds at every instance that the argument types allow.", CHECK),
  ("P-12", "Walk has no static types before the switch-over."),
  ("ledger:997", "The type parameter bounded by a value type, which closes.", CHECK),
  ("ledger:998", "The invalid pair that loads at an object type, which closes.", CHECK),
  ("ledger:550", "The valid pair that walk refuses, whose test at ZZ64 stays an expected failure until rung O.", CHECK),
  ("ledger:697", "Two plain parameter lists at an object type, which is not yours."),
  ("ledger:1036", "The expected failure that step 3 writes.", CHECK),
  ("ledger:1019", "Its kin, the immutable top-level variable, and the form of its test."),
  (MRG + "Obstacles, in the order met", "Obstacles 5 and 6, the two defects as the probe met them.", CHECK),
  (SPEC + "advanced/overloading.tex#Declarations with Static Parameters", "The rule for a generic declaration beside another.", CHECK),
  ('code:' + SRC + "interpreter/evaluator/types/FTraitOrObject.java#private void enforceValueness", "The check that stops the symbolic type.", CHECK),
  ('code:' + SRC + "interpreter/evaluator/values/OverloadedFunction.java#static private DomainReading validOnDeclaredDomains", "Walk's reading of a pair on its declared domains.", CHECK),
  ('code:' + SRC + "interpreter/evaluator/values/OverloadedFunction.java#static private boolean returnRuleAtEveryInstance", "The precedent, the rule at every instance for two generic declarations."),
  ("map:modules-and-phases.md#B.8 The interpreter tail", "How walk loads and runs a component."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

X_BRIEFING = [
  ("P-45", "The Return Type Rule over declared domains, at every instance that the argument types allow.", CHECK),
  ("P-178", "Why the refusal would reach the number types."),
  ("P-148", "The checker's timing for your edit.", CHECK),
  ("F-75", "What the checker's two rules find in the one library today.", CHECK),
  ("ledger:542", "The refusal of a valid pair, which closes.", CHECK),
  ("ledger:853", "The sibling in the specificity test, which is not yours."),
  (SPEC + "advanced/overloading.tex#Declarations with Static Parameters", "The rule.", CHECK),
  ('code:' + SRC + "scala_src/overloading/OverloadingOracle.scala#def satisfiesReturnTypeRule(f: Functional, g: Functional)", "The checker's Return Type Rule.", CHECK),
  ("map:modules-and-phases.md#B.7 Overloading", "Where the checker's overloading rules run."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

T_BRIEFING = [
  ("P-156", "An index type extends Index, and a tuple of indices is an Index.", CHECK),
  ("ledger:992", "The method over a tuple index type, which closes.", CHECK),
  ("ledger:832", "The generic dotted method with a tuple parameter, which closes.", CHECK),
  ("ledger:819", "The postfix operator on a tuple operand, which closes.", CHECK),
  (REH + "W15. An array of rank 2", "The library's site.", CHECK),
  (PRB + "2. The walls under the prelude", "The reproducer, and its form with the verifier on.", CHECK),
  (SPEC + "basic/expressions/method-invocation.tex#Dotted Method Invocations", "A dotted call's argument.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private Type receiverPrependedDomainType", "Where the receiver joins a tuple domain's elements.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl", "The forwarder, as run 1 left it.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private void castToTypeBelow", "Rung K's cast of one argument, which a bridge method may need for a self among a tuple's elements."),
  (REC + "M. The methods that a trait's or an object's class inherits", "What rung M built in the same code, which you build on."),
  ("map:compile-path-walkthrough.md#5. Code generation", "How the code generator walks a method and a call."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

O_BRIEFING = [
  ("P-178", "The decision you build, in the one library and walk.", CHECK),
  ("P-160", "A program's own number type extends Number.", CHECK),
  ("P-167", "Walk's native objects are no types that a program sees or prints.", CHECK),
  ("P-68", "Round, truncate and the brackets wait for a library rung after the switch-over.", CHECK),
  ("P-37", "The prelude's half of the decision, which is not in this rung."),
  ("P-87", "No line of the model program or of its helper files changes.", CHECK),
  ("F-361", "The probe's result: the two measures, walk's suite, the gaps that widen.", CHECK),
  ("F-344", "Walk reads a native object's value at its trait, which the numbers stop needing."),
  ("F-328", "The ilk names, which the numbers stop needing."),
  ("ledger:1003", "The row of the decision, whose one-library half you build.", CHECK),
  ("ledger:1000", "Round declared twice, which the merge reduces to one declaration.", CHECK),
  ("ledger:551", "A program's object below a number type, which walk loads today.", CHECK),
  ("ledger:550", "The valid pair at ZZ64 that walk refuses, whose test you promote.", CHECK),
  ("ledger:959", "A typecase arm at a name that no declaration defines.", CHECK),
  ("ledger:330", "The row of the decision on round, truncate and the brackets."),
  ("ledger:785", "A plain declaration with no written return type, which walk refuses over a trait type."),
  ("ledger:1044", "The same declaration over an object type, which walk loads unjudged."),
  (MRG + "What was built", "The probe's change, file by file, and what it left undone.", CHECK),
  (MRG + "Obstacles, in the order met", "Each obstacle and how the probe passed it.", CHECK),
  (MRG + "The bodies of trait RR64 that go through asFloat(self)", "Which bodies of the trait run today, and which survive.", CHECK),
  (MRG + "Sentences of the specification made false", "The Effect's sentences that name the objects.", CHECK),
  ("doc:explorations/reviews/carriers-ways-2026-11-13.md#Way D. One object per type: each number trait merged with its one object", "The way, and why the split is there.", CHECK),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object NN32", "The library's precedent, a number type as one value object.", CHECK),
  ("code:Library/FortressLibrary.fss#trait RR64", "The largest of the five traits."),
  ('code:' + SRC + "interpreter/evaluator/BuildEnvironments.java#protected void forObjectDecl1", "Where walk builds an object's environment.", CHECK),
  ("map:modules-and-phases.md#B.13 Where each library enters", "Where each path reads its library."),
  ("map:compile-path-walkthrough.md#7. Native bindings in both worlds", "How a native binding and a native object reach Java on each path."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

E_BRIEFING = [
  ("P-173", "A numeral converts where it stands, a declared return type among the places.", CHECK),
  ("P-176", "One value for each place where a numeral is written.", CHECK),
  ("P-174", "The numeral types and their coercions."),
  ("P-50", "The body of a label and each value of an exit take the label's expected type, the decision for the label's kin.", CHECK),
  ("P-37", "The prelude is not changed for this.", CHECK),
  ("P-148", "The checker's timing, if your edit is there.", CHECK),
  ("ledger:1014", "The numeral that ends a block after a declaration, which closes.", CHECK),
  ("ledger:1030", "The tuple with a numeral element, which closes.", CHECK),
  ("ledger:1031", "The tuple binding over an if, a kin that you report on."),
  ("ledger:1043", "A numeral as the value of an atomic expression, a kin that you report on."),
  ("ledger:340", "The code generator's crash at a coerced value, whose label case is a kin that you report on."),
  (SPEC + "basic/expressions/blocks.tex#Do Expressions", "A block's value and type."),
  (SPEC + "basic/conversions-coercions.tex#Coercions for Tuple and Arrow Types", "How a tuple converts, element by element.", CHECK),
  ("map:compile-path-walkthrough.md#What it writes onto the tree", "What the checker writes onto the tree, the coercions among it.", CHECK),
  ("map:compile-path-walkthrough.md#5. Code generation", "How the code generator walks a function's body."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait RR32", "The prelude's RR32, which declares no =/=."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('M', 'K', 'L', 'A', 'V', 'X'), '2': ('T', 'O', 'E')}
ORDER = RUNS['1'] + RUNS['2']
_B = {'M': M_BRIEFING, 'K': K_BRIEFING, 'L': L_BRIEFING, 'A': A_BRIEFING, 'V': V_BRIEFING, 'X': X_BRIEFING, 'T': T_BRIEFING, 'O': O_BRIEFING, 'E': E_BRIEFING}
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
    assert run is None or run in RUNS, 'usage: lists31.py [--run 1|2]'
    CHECKED = RUNS[run] if run else IDS
    print('rungs', ', '.join(CHECKED), '(run ' + run + ')' if run else '(both runs)')
    LISTS, REASONS = lists(IDS)

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
