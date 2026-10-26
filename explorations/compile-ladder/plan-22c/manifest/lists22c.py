# The briefing and checks lists of climb batch 22c's four rungs, O, B, L and A (CLIMB-BATCH-22c.md, section 3), made
# from explorations/compile-ladder/plan-22/manifest/lists22.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's section
# cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or harness fact,
# which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their
# numbers. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is there. A checks list is a
# sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. The record's section 5, "The
# briefings, rung by rung", holds the same keys. No key holds a backslash, a backtick or a double quote, which the
# script refuses; facts-extract matches a heading without its backticks.
# `python3 -B lists22c.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
FL = 'Library/FortressLibrary.fss'
EC = 'ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala'

ZA = "doc:explorations/reviews/phase3-exit/zero-audit.md#"
PJ = "doc:explorations/reviews/phase3-exit/judgement.md#"
FJ = "doc:explorations/reviews/foundations/judgement.md#"
EAC = "doc:explorations/perf-probes/export-abstract-codegen/REPORT.md#"
BA = "doc:explorations/perf-probes/bound-any-compiled/REPORT.md#"
P22C = "doc:explorations/compile-ladder/plan-22c/probes/"
REC = "doc:explorations/coordinator/CLIMB-BATCH-22c.md#"
SPEC_EXPORT = "doc:Specification/basic/components/source-code.tex#Export Statements"

O_BRIEFING = [
  ("P-155", "The decision your rung builds in the export check: symbolic operators read by the rules applied to any function."),
  ("F-287", "The 157 top-level operators of the twelve apis, 148 matching and 9 differing, none read by the export check."),
  ("F-282", "The export check as it stands: by name and header, the rules your rung applies to the operators."),
  ("ledger:782", "Your first row: the skip and the double key, with the zero audit's two shadows."),
  ("ledger:827", "Your second row: the 9 headers, each with its two sides, and the cost of a difference compiled."),
  ("ledger:769", "The check's exact header for a function where the text accepts a set: a sibling of the record's question 4."),
  (ZA + "A.4 The checker's known blind spots, row by row", "The zero audit's measurement of row 782: the double key's cause, the 9, the two-file probe, the 10 lines."),
  (PJ + "2.2 What the zero rests on, each ruled", "The ruling on row 782: one rung, half library text in library.md's direction, half the checker's double key."),
  (P22C + "rung-O.patch", "Your text as the planner measured it with the other rungs' at distance 0 over the fourteen."),
  (REC + "The planner's probes", "Your check alone, 2 errors listing exactly the 9; with the lines, 0; the compiled tracks and the prelude."),
  (REC + "Question 2, consequential: the export check reads symbolic operators (P-155)", "The curator's open reading your checker half rests on, with what each answer leaves of your rung."),
  (REC + "Question 4, consequential, landed and then reviewed: a narrower return type in the component", "The conflict your new row names: the text accepts a narrower return, the check and a compiled call do not."),
  ("code:" + EC + "#for ( f <- toSet(fnsInAPI.firstSet)", "The loop over the api's functions whose admission of names your rung changes."),
  ("code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala#private def buildFunction", "The double key: each function filed under its name and under a name made from its span."),
  ("code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#def isCheckedName", "The overloading check's admission of every operator, which your rung takes for the export check."),
  ("code:" + FL + "#The # and : operators serve as factories..bounded3Range(l1,l2,l3,h1,h2,h3)", "The component's six range factories, whose headers take the api's types."),
  ("code:Library/List.fsi#List comprehensions..opr BIG <|[", "List's api comprehension, whose type takes the component's."),
  (SPEC_EXPORT, "The text's rules for a function, a method and a trait in the component, and the subtype rule of question 4."),
]
O_CHECKS = [
  "P-155", "F-287", "ledger:782", "ledger:827",
  ZA + "A.4 The checker's known blind spots, row by row",
  P22C + "rung-O.patch", REC + "The planner's probes",
  "code:" + EC + "#for ( f <- toSet(fnsInAPI.firstSet)",
]

B_BRIEFING = [
  ("P-42", "The decision your rung builds on the compile command: the implicit bound Any, not Object."),
  ("F-289", "The distance's zero under the bound Any only, and the 685 errors under the compile command's setting."),
  ("F-291", "What the compiled path does with tuple, arrow and () static arguments under each bound."),
  ("F-292", "The compiled tracks under the bound Any: the 12 failures in 10 tests, each a test-side cost."),
  ("ledger:412", "Your row: the compile command's bound Object, Steele's 2012 setting, and the probe's measurement."),
  ("ledger:691", "A defect the flip touches and does not fix: under Object id((3, 4)) runs id(3), under Any it is refused."),
  ("ledger:832", "A defect the flip touches and does not fix: a generic dotted method with one tuple-typed parameter dies."),
  ("ledger:339", "A defect the flip touches and does not fix: () as a static argument dies under either bound."),
  ("ledger:653", "The checker's acceptance of an override that overrides nothing, which one of your tests' premises meets."),
  (BA + "The CompilerSystem tests, and the compiled tracks, under (ii) against (i)", "The ten test edits, each test with what fails under the bound Any and why."),
  (BA + "What the switch to Any would cost, in rungs (my reading)", "The probe's sizing of your rung: the line, the ten edits, the rows it leaves."),
  (FJ + "4. The bound: P-42 holds, on these grounds", "Why the flip lands now, and the default for CoercionGenericFnCompiledRungC."),
  (P22C + "rung-B.patch", "Your text as the planner measured it with the other rungs' at distance 0 over the fourteen."),
  (REC + "The planner's probes", "The compiled tracks, the ladder's one file and its respelling, the atomic runs, the stage's first form."),
  ("doc:Specification/appendices/changes.tex#The implicit bound of a type parameter", "The Appendix I entry whose effect your flip makes false."),
  ("doc:Specification/basic/trait-parameters.tex#Type Parameters", "The bound's text and the revision box whose last sentence your flip makes false."),
  ("code:ProjectFortress/src/com/sun/fortress/Shell.java#public static void useCompilerLibraries", "The compile command's switches, whose first line your rung sets false."),
  ("code:explorations/coordinator/tools/distance/DistanceMulti.java#public static void main", "The stage's driver, whose compile setting your rung reads from Shell.java."),
  ("doc:ProjectFortress/tests/doubledOverloading.fss", "The team's test that the bound Any moves down the ladder, and whose two parameters you respell."),
]
B_CHECKS = [
  "P-42", "F-292", "ledger:412",
  BA + "The CompilerSystem tests, and the compiled tracks, under (ii) against (i)",
  P22C + "rung-B.patch", REC + "The planner's probes",
  "code:ProjectFortress/src/com/sun/fortress/Shell.java#public static void useCompilerLibraries",
  "doc:ProjectFortress/tests/doubledOverloading.fss",
]

L_BRIEFING = [
  ("F-288", "The twelve not closed under import: List's two imports, which the checker refuses."),
  ("ledger:828", "Your first row: CovariantCollection's 12 errors and 2 crashes, which the record's section 4 sorts."),
  ("ledger:829", "Your second row: OneShot's var parameter against the api's plain one."),
  ("P-27", "The library's own practice is the standard: the team's own devices in CovariantCollection."),
  ("F-264", "The library's cast device, which upward's general arm and Singleton's dirtyIAF take."),
  ("F-75", "The Return Type Rule over every instance, which refuses upward's arms while R is fixed by no argument."),
  ("F-282", "A field matched with its modifiers other than var, the rule your rung extends to an object's parameter."),
  (ZA + "A.2 Scope", "The zero audit's measurement of List's two imports and why every list and ArrayList needs them."),
  (ZA + "A.3 The settings, and what the tools leave out", "The stage's own gap that a later target's api errors print no line the table counts."),
  (P22C + "rung-L.patch", "Your text as the planner measured it with the other rungs' at distance 0 over the fourteen."),
  (REC + "The planner's probes", "Each error and crash with its cause and way, the api's var refused, the walk tests and the cast arm."),
  ("doc:Library/CovariantCollection.fss", "The component whose text your rung changes, the team's unchanged since 2012."),
  ("doc:Library/CovariantCollection.fsi", "Its api, which states the component's members and headers after your rung."),
  ("doc:Library/OneShotFlag.fss", "OneShot's var parameter, which stays."),
  ("code:" + EC + "#private def equalParams", "The parameter comparison whose modifiers your rung compares less var."),
  ("code:" + EC + "#private def equalLValue", "The field comparison that already leaves var out, your precedent."),
  ("code:ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java#public void forObjectDecl", "Why an api cannot write var on an object's parameter."),
  ("doc:ProjectFortress/tests/OpenParameterListComprehensionWalk.fss", "The walk test that pins CastError at the open type, which upward's general arm keeps."),
]
L_CHECKS = [
  "F-288", "ledger:828", "ledger:829", "F-282",
  P22C + "rung-L.patch", REC + "The planner's probes",
  "doc:Library/CovariantCollection.fss", "code:" + EC + "#private def equalParams",
]

A_BRIEFING = [
  ("P-158", "The decision your rung builds: a member an api writes abstract is declared in the component."),
  ("P-26", "The team's later word, on which P-158 rests: the prelude and the team's 2012 export check."),
  ("F-282", "The export check as it stands, its reading of abstract that your rung reverses."),
  ("F-286", "String's api and the 7 members its component's trait does not declare."),
  ("ledger:816", "Your row: the defect, the team's count, the repair, the run-time death."),
  (EAC + "In short", "Why a compiled call dies even where every object defines the member, and which 3 of the 12 resolve."),
  (EAC + "5. The library's 12 members", "Each of the 12, its api line, its component's trait, its callers and its objects."),
  (PJ + "3.1 Bends and reversals", "The ruling on row 816: the team's three sources, the designers' way, the 12 lines."),
  ("doc:explorations/conversations/02-phase3-exit-foundations.md#3. Row 816 and P-158 (10-25 19:06 to 10-26 04:28)", "The curator's decision and his reason, with the chain that led to the weakened check."),
  (P22C + "rung-A.patch", "Your text as the planner measured it with the other rungs' at distance 0 over the fourteen."),
  (REC + "The planner's probes", "Your check alone, 5 entries; with the 12 lines, 0; the team's strict comparison, 2 entries."),
  (REC + "Question 3, consequential: P-158 and the specification's export rule", "The sentence your rung revises, and the curator's informed yes it waits on."),
  (SPEC_EXPORT, "The text's rule for a trait in the component, whose abstract-method sentence your rung revises."),
  ("doc:Specification/basic/components/apis.tex#Component and API Identity", "The text P-158 reads: no body asked of an abstract member, which stays true."),
  ("code:" + EC + "#private def equalListMembers", "The member comparison whose count and match your rung restores."),
  ("code:" + EC + "#private def equalFnHeaders", "The team's ignoreAbstract, through which an abstract api member meets a member with a body or without."),
  ("code:Library/CompilerLibrary.fss#trait GeneratorZZ32 extends", "The prelude's way: the component restates each abstract api member, bodyless."),
  ("code:" + FL + "#trait String extends", "String's component trait, which gains its 7 bodyless declarations."),
]
A_CHECKS = [
  "P-158", "F-282", "ledger:816", EAC + "In short",
  P22C + "rung-A.patch", REC + "The planner's probes",
  SPEC_EXPORT, "code:" + EC + "#private def equalListMembers",
]

IDS = ('O', 'B', 'L', 'A')
_B = {'O': (O_BRIEFING, O_CHECKS), 'B': (B_BRIEFING, B_CHECKS), 'L': (L_BRIEFING, L_CHECKS), 'A': (A_BRIEFING, A_CHECKS)}
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
