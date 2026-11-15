# The briefing and checks lists of climb batch 32's rungs (CLIMB-BATCH-32.md, section 1, "The manifest, rung by
# rung"), made from plan-31/manifest/lists31.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is there, and CHECK where the
# record marks it (check): the checks list, read by the skeptic, a repair round and a judge, is those keys in order.
# No key holds a backslash, a backtick, a dollar sign or a double quote, which the script refuses; facts-extract
# matches a heading without its backticks.
# Changed from lists31.py: the record has one run, climb batch 32, the rungs P, S, C, F and B (and, since the
# amendment below, N and D), so there is no --run. The keys are each rung's briefing bullets in section 1, in
# their order, each as the record writes it, its backticks dropped and REC, REV, PRB, NEQ, MCC, SPEC and SRC spelled out as
# section 1's opening paragraph gives them, each with the record's reason, its first letter capitalized unless the
# reason opens with code; a check is marked on its entry. The forks: the record's one forks key, REC "Forks the
# batch takes", section 3's forks whole, in every briefing once, as a check (added to the record by the check of
# 2026-11-15, coordinator/climb-batch-32-review.md, change 10). Rung P's four keys on row 177, the type on a mutable
# local, went with the row, which the coordinator's ruling of 2026-11-15 took out of the rung.
# Amended 2026-11-15: rungs N and D, with their lists as plan-31/manifest/lists31.py has them, moved into this
# batch with their sections (the record's head); their forks key is this record's, and NEQ and MCC are spelled out.
# Fork W (the record's section 3, "The consequential forks") stands at (a), walk now, and the lists are the record's.
# lists(ids, fork_w='b') gives rung N's lists for way (b), walk waits, as lists31.py did: the key of walk's choice for
# a call with a numeral, which the rung then does not edit, is left out, and the reasons of P-59 and of rows 973 and
# 966 say that walk stays (W_B, below); gen32.py --fork-w b makes the same changes in a copy of the record, so that
# check32.js --fork-w b finds the two alike. `python3 -B lists32.py [--fork-w a|b]` checks the keys for that answer.
# lists(ids) gives the lists of the rungs ids, a rung left out by --without dropping from the block; LISTS and REASONS
# are lists(IDS).
# `python3 -B lists32.py` checks every key with facts-extract.sh --check (each must match exactly one place) and
# every reason's form, in $FORTRESS_HOME (this checkout by default), and prints the bytes of each rung's forks key;
# it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-32.md#"
REV = "doc:explorations/reviews/c4-fortress-way-2026-11-15.md#"
PRB = "doc:explorations/compile-ladder/plan-32/PROBES.md#"
NEQ = "doc:explorations/reviews/numeral-equality-ways-2026-11-10.md#"
MCC = "doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

P_BRIEFING = [
  ('P-87', "No line of the model or of its helper file changes in this batch.", CHECK),
  ('ledger:133', "The api's rule, which closes.", CHECK),
  ('ledger:5', "The sum sign as a prefix operator, which closes.", CHECK),
  ('ledger:166', "The null before the file name in the message, a neighbour that is not yours."),
  (PRB + '3. One trial build', "What a one-line edit of each site gave, and what it left for row 5.", CHECK),
  (SPEC + 'basic/expressions/reductions.tex#Summations and Other Reduction Expressions', "The accumulator's grammar.", CHECK),
  ('code:' + SRC + 'parser/Parameter.rats#FnHeaderFront AbsOpHeaderFront', "The api's rule.", CHECK),
  ('code:' + SRC + 'parser/Parameter.rats#FnHeaderFront OpHeaderFront', "The component's rule, the precedent."),
  ('code:' + SRC + 'parser/Symbol.rats#transient Op Accumulator', "The accumulator.", CHECK),
  ('map:modules-and-phases.md#B.2 Rats! parsing', "How the grammars are built and what a grammar edit makes stale."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

S_BRIEFING = [
  ('P-87', "No line of the model changes.", CHECK),
  ('ledger:84', "The grammar's gap, which closes.", CHECK),
  ('ledger:158', "Walk's refusal, which closes.", CHECK),
  ('ledger:144', "The language's rule, which stays.", CHECK),
  ('ledger:301', "The method form .t() after a call, which runs today and stays."),
  (SPEC + 'basic/operators/juxtameaning.tex#Juxtaposition', "A tight juxtaposition with a dot is left-associated; the reassociation and its two static errors.", CHECK),
  (SPEC + 'basic/expressions/operator-app.tex#Operator Applications', "A postfix operator's operand.", CHECK),
  ('code:' + SRC + 'parser/Expression.rats#constant Expr LeftAssociatedPrimary', "The dotted forms.", CHECK),
  ('code:' + SRC + 'parser/Expression.rats#constant Expr MathPrimary', "Where a superscript attaches today.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forOpExpr(OpExpr x)', "Walk's postfix branch.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#private FValue forTightJuxt(Juxt x, boolean isPostfix)', "Walk's refusal.", CHECK),
  ('map:compile-path-walkthrough.md#1. Parsing and the syntax tree', "The tree that both paths read."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

C_BRIEFING = [
  ('P-78', "The reduction's decision; the written argument is row 731's workaround.", CHECK),
  ('P-51', "A call written as an argument is typed again against each parameter type.", CHECK),
  ('P-48', "A type parameter that a call does not fix takes its bound.", CHECK),
  ('P-148', "The checker's timing for your edit.", CHECK),
  ('P-79', "The team demos whose reductions leave out the argument."),
  ('F-59', "What the checker does today with an unwritten argument, and what walk does.", CHECK),
  ('F-221', "The retry as built, and where a self-bounded big operator falls out of it.", CHECK),
  ('F-285', "The library's written sites, which this rung does not unwrite."),
  ('ledger:731', "The refusal, which closes.", CHECK),
  ('ledger:758', "The crash, which closes if step 2 lands.", CHECK),
  ('ledger:716', "Walk's empty sum, a neighbour that is not yours."),
  ('ledger:817', "The demo trips.fss, a neighbour that you report on if it moves."),
  ('ledger:156', "Walk's half of the function as a value, rung F's."),
  ('doc:explorations/compile-ladder/rung-argument-context/REPORT.md#5. Old against new', "The self-bounded case, measured, and why the retry is not reached.", CHECK),
  (SPEC + 'basic/expressions/reductions.tex#Summations and Other Reduction Expressions', "The reduction is for the type of its expression; the box that says what each path does today.", CHECK),
  (SPEC + 'basic/inference.tex#The Static Arguments of a Call', "The contexts that give an expected type.", CHECK),
  (SPEC + 'appendices/changes.tex#The contexts that give a call an expected type', "The Effect that you bring in line.", CHECK),
  (SPEC + 'basic/expressions/var-ref.tex#Identifier References', "A reference to a generic function takes its static arguments from the context.", CHECK),
  ('code:' + SRC + 'scala_src/typechecker/impls/Functionals.scala#private def retypedApplication(', "The retry.", CHECK),
  ('code:' + SRC + 'scala_src/types/TypeAnalyzer.scala#def staticParam(x: Id)', "Where the crash is raised.", CHECK),
  ('map:compile-path-walkthrough.md#3. The checker', "How the checker walks a call."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

F_BRIEFING = [
  ('P-87', "No line of the model changes; the sized row lift is decision D's diff, not yours.", CHECK),
  ('P-48', "A type parameter that a call does not fix takes its bound, and walk's open parameter.", CHECK),
  ('P-55', "Sizes are compared by their written form."),
  ('P-12', "Walk has no static types until after the switch-over."),
  ('ledger:156', "The three failures, which close.", CHECK),
  ('ledger:165', "A neighbour under walk's overloading."),
  ('ledger:171', "The arrow-typed parameter that the workaround uses."),
  ('ledger:758', "The checker's half, rung C's."),
  (REV + '1.2 Lines 27 to 34 and 51', "The model's lines and the run with the size written.", CHECK),
  (SPEC + 'basic/expressions/var-ref.tex#Identifier References', "The static arguments of a reference come from its context.", CHECK),
  (SPEC + 'basic/functions.tex#Function Declarations', "A function is a value.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/Fcn.java#public FType type()', "The value's missing type.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction(List<FValue> args,', "How a direct call fixes the static arguments.", CHECK),
  ('map:modules-and-phases.md#B.8 The interpreter tail', "Where walk binds and applies."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

B_BRIEFING = [
  ('P-87', "No line of the model changes.", CHECK),
  ('P-173', "Where a numeral converts, which the elements of a typed literal meet.", CHECK),
  ('ledger:142', "The binding, which closes.", CHECK),
  ('ledger:49', "The untyped literal, in a function body too, which is left out."),
  ('ledger:104', "A sibling on the array literal."),
  (SPEC + 'basic/expressions/aggregate.tex#Array Expressions', "The literal and its type.", CHECK),
  (SPEC + 'basic/variables.tex#Top-Level Variable Declarations', "The top-level declaration.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/BuildEnvironments.java#private void forVarDecl4', "The top-level binding.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/LHSEvaluator.java#public Voidoid forLValue(LValue x)', "The body's binding, the precedent.", CHECK),
  ('map:modules-and-phases.md#B.8 The interpreter tail', "How walk builds a component's environment."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

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
# the reason given here. gen32.py's W_B_RECORD holds the same changes of the record's bullets.
W_B_DROP = ('code:' + SRC + 'interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchForNumerals',)
W_B_REASON = {
  'P-59': 'Walk chooses a coercion by the run-time value; by the answer to fork W, walk is not changed in this rung.',
  'ledger:973': 'u = 0 under walk, which stays open.',
  'ledger:966': 'u =/= 0 under walk, which stays open.',
}

# The one run of the record, in the manifest's order (section 1's table).
ORDER = ('P', 'S', 'C', 'F', 'B', 'N', 'D')
_B = {'P': P_BRIEFING, 'S': S_BRIEFING, 'C': C_BRIEFING, 'F': F_BRIEFING, 'B': B_BRIEFING, 'N': N_BRIEFING, 'D': D_BRIEFING}
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
    fork_w = sys.argv[sys.argv.index('--fork-w') + 1] if '--fork-w' in sys.argv else 'a'
    assert fork_w in ('a', 'b'), 'usage: lists32.py [--fork-w a|b]'
    print('rungs', ', '.join(IDS), '(one run)', '| fork W at (' + fork_w + ')')
    LISTS, REASONS = lists(IDS, fork_w)

    def check(keys):
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + list(keys), capture_output=True, text=True, cwd=root)
        return r, [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
    for rid in IDS:
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
