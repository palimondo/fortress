# The briefing and checks lists of climb batch 13's five rungs, N, V, O, G and W (CLIMB-BATCH-13.md, section 3), in
# batch 12's form (explorations/compile-ladder/plan-12/manifest/lists12.py) for the redesigned workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on,
# and no process position or harness fact, which the brief's role text and the fortress-repo skill carry. Each
# briefing entry is a pair: its facts-extract.sh key and one line on why it is there and what the rung does with
# it. gen13.py renders the lines at the end of each rung worker's brief, in the order of the briefing. A checks list
# is a sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. `python3 lists13.py` checks
# every key with facts-extract.sh --check (each must match exactly one place) and every reason's form; it is run
# again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'
TC = SC + '/typechecker'

STD = "positions:The specification stays the standard"
SPECREC = "positions:Every change to the specification is recorded with its reason"
S1 = "positions:The S1 form"
LIBP = "positions:The library's own practice is the standard"
COUNTP = "positions:The checker count is measured, never red"
ITEM15 = "positions:Arithmetic in a size"
RTSIZE = "positions:The run-time size design is B"
ARRAYQ = "positions:The array design's three questions are open"
INTEG = "positions:The integration review's checks"
ROUTEA = "positions:The exclusion rule stays and the tower is flat"
ISLZ = "positions:LexicographicReduction.isLeftZero takes TotalComparison"
IMPLICIT = "positions:The implicit bound of an unbounded type parameter is Any"
WHICH = "positions:Which decisions taken inside the work reach"
LIBRULE = "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement"
CHG = "doc:Specification/appendices/changes.tex#"
F3 = "doc:explorations/reviews/array-fork3-judgement.md#"
F2 = "doc:explorations/reviews/array-fork2-judgement.md#"
TUP = "doc:explorations/reviews/tuple-comparisons-judgement.md#"
GEN = "doc:explorations/reviews/generator-size-judgement.md#"
WLC = "doc:explorations/reviews/walk-load-readings-check.md#"
AFN = "doc:explorations/reviews/array-forks-now.md#"

N_BRIEFING = [
  (ITEM15, "Item 15 answered, 15a with (b): sizes compared by written form once numerals are folded, folded values range-checked, a size name possibly equal to a numeral, the loader computing the value; your first half."),
  (STD, "The text allows arithmetic in a size and fixes its value once the names are known; the checker accepts what the text allows, and the identity sentence it never finished is revised."),
  (LIBP, "The team wrote a product in the storage fields and sums in result types, and the NatParam clause beside reflect: your rung accepts their text and changes none of it."),
  (RTSIZE, "A size at run time is the descriptor RTTIsize.of makes; the loader's computed size is one such descriptor, and an opened size is the one already on the N value."),
  (ARRAYQ, "What your rung leaves alone: the array design's other questions; fork 3 is built here at its judgement's default on the standing go, listed for the curator."),
  (WHICH, "Fork 3 is built at its default and listed for the curator; the reading of his Sizes entry and the widened comprises sentence are named in your report."),
  (SPECREC, "Why the identity sentence, the comprises proviso and the size chapter change: Appendix I entries with the reason, the original text and route C."),
  (S1, "The form of your text changes: each passage revised in place with a callout, each entry with its reason."),
  (COUNTP, "The count and the distance are reported and never red; you run them once on your final tree, against batch 12's landed tables."),
  ("ledger:664", "Under Q13.3: the rank-1 subarrays pass reflect's NatParam where N[n] is declared; two of fork 3's ten sites; the row closes with your rule."),
  ("ledger:307", "Item 15 clears its arithmetic half and XXXNatArithChecker; NatReflectTest compiled still stops, and fork 3's compiled half waits for the switch-over: a note."),
  ("ledger:25", "The reflect idiom, the sanctioned escape: it stands, now accepted by the checker; a note."),
  ("ledger:636", "The same where-bound listed instantiation for a type, List's commented clause: not yours."),
  (AFN + "Q15. Item 15", "Item 15 in the nine-step form: the 13 sites, the ways, the team's Q&A that a name may equal a numeral, the loader's half and XXXNatArithChecker."),
  (F3 + "2.9 The ways, judged", "Fork 3's ways, 4a the team's clause and rule, and what each clears; the one you build is 4a."),
  (F3 + "4. What it changes and what it costs", "Fork 3's edit, file by file: the clause, KindEnv, TypeAnalyzer's opening case, the hierarchy check, walk's loader, the two sentences and the entry."),
  (F3 + "5. How a batch 13 rung builds it, beside item 15's", "Fork 3's tests first, the sites it clears, the hidden calls, and why the clause must not land before part (b)."),
  (F3 + "6. Decisions and points for the curator", "The two readings fork 3 makes, which your report names for the curator."),
  ("The specification allows arithmetic in a size", "What the text says of size expressions and what it never said: when two are the same type."),
  ("A size beyond NN32 or ZZ32 is refused on both paths", "The range check every folded size passes through, on both paths."),
  ("A size is carried at run time as a descriptor from RTTIsize.of", "How a size reaches the compiled run, where the loader computes a folded size."),
  ("doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters", "The size chapter: under Q13.3 it gains one sentence stating the opening of a NatParam at a call."),
  ("doc:Specification/basic/trait-parameters.tex#Where Clauses", "The where-clause variable, the device the team's clause uses for n; bound in a where clause, not a static parameter."),
  ("doc:Specification/appendices/internal-document.tex#Overloaded operators", "The team's Q&A: n+1 beside 0 not allowed, 1 beside 0 allowed; a size name is not known to differ from a numeral, part (b)."),
  (CHG + "The traits that extend a closed trait", "The revival's entry on listed types, whose proviso at traits.tex:238-240 fork 3 widens to a where-clause variable; you amend it under Q13.3."),
  ("code:" + TC + "/TypeWellFormedChecker.scala#private def walkStaticArgs(", "One of the three uses of hasSizeArithmetic, the refusal by name, beside the range check you keep."),
  ("code:" + TC + "/Formula.scala#def nEq(a: IntExpr, b: IntExpr)", "Size equality today: a size with arithmetic in it equals nothing; 15a compares written forms once numerals are folded."),
  ("code:" + SC + "/types/TypeAnalyzer.scala#protected def pEqv(x: IntExpr, y: IntExpr)", "A symbol is not any literal: why the N[0] arms are unreachable; part (b) makes a name possibly equal to a numeral."),
  ("code:" + TC + "/staticenv/KindEnv.scala#case SWhereClause(info, bindings, _)", "Under Q13.3: a non-type where binding is not yet implemented here; your rung takes a nat binding."),
  ("code:" + TC + "/TypeHierarchyChecker.scala#def checkDeclComprises(", "Under Q13.3: the comprises check that must accept N[nat n] extends NatParam against the listed N[n]."),
  ("code:" + SRC + "/compiler/NamingCzar.java#public Triple<String,String,Integer> forIntBinaryOp(IntBinaryOp b)", "The compiled path spells a size expression out today; 15a has the loader compute the value instead."),
  ("code:" + EV + "/BuildEnvironments.java#private static EvalType processWhereClauses(", "Under Q13.3: walk reads a trait's where clause for constraints only; it must bind the where-bound size so the clause loads."),
  ("code:ProjectFortress/LibraryBuiltin/NatReflect.fss#trait NatParam", "Under Q13.3: the team's clause as a comment since 2007, with reflect's comment on what it means."),
]
N_CHECKS = [
  ITEM15, STD, WHICH, S1,
  "ledger:664", "ledger:307",
  AFN + "Q15. Item 15",
  F3 + "5. How a batch 13 rung builds it, beside item 15's",
  CHG + "The traits that extend a closed trait",
  "code:" + SC + "/types/TypeAnalyzer.scala#protected def pEqv(x: IntExpr, y: IntExpr)",
  "code:" + TC + "/TypeHierarchyChecker.scala#def checkDeclComprises(",
]

V_BRIEFING = [
  (INTEG, "The curator's check for the array work, no blanket ring bound that would exclude integer arrays: under Q13.2 its letter bends on Vector and Matrix and its reason holds; listed for him."),
  (ROUTEA, "Route A moved the arithmetic from Number to each number type at its own type: the obligation fork 2 meets on the arrays."),
  (ARRAYQ, "What your rung leaves alone: the array design's other questions, and every array site outside the family's bound, matrix(v) and the scalar block."),
  (LIBP, "The two-trait bound is the library's own form (MaxSumReductionPair), and v.zero the algebra's own zero: name each precedent line."),
  (WHICH, "Fork 2 is built at its default and listed; the bent letter is named in your report."),
  (COUNTP, "The count and the distance are reported and never red; they are half two's test, before from batch 12's landed tables."),
  ("ledger:660", "Your second checker repair: a tight juxtaposition of non-functions gets no expected type; give it, as the loose one and the repeated operator do; promote XXXInferTightJuxtContext."),
  ("ledger:437", "Under Q13.2: matrix(v)'s numeral 0 becomes v.zero, which the ring bound gives T; walk's matrix(v) for NN32 and NN64 then runs."),
  ("ledger:591", "A two-bound parameter that no call fixes stays at Bottom under walk; the arrays' calls all fix T: a note."),
  ("ledger:455", "Q48's part (b), the argument faces beside row 660, is not answered: not yours; XXXInferContextDrops keeps its verdict."),
  (F2 + "2.2 What each path does today", "The crash read in the code: boundsSubstitution casts the meet's conjuncts, which a closed trait makes a union; and why the two factory sites are a checker slip."),
  (F2 + "3. The measurement", "The two-trait bound measured on a library copy: 23 gone, :2399 come, the factories unchanged, three stage crashes, walk's seven array tests the same."),
  (F2 + "4. The recommendation, the default, what it changes and costs", "The default you build: the family's bound, the block's bound per operator, what it changes and what it does not."),
  (F2 + "5. A batch 13 rung: files, tests first, sites it clears, what it leaves", "Your rung in two halves, the checker's fix first, its tests first, and what it leaves with its homes."),
  (F2 + "6. What it reverses or bends of his positions", "What the default bends, which your report names for the curator."),
  ("Route A's generic container obligations still need body-level checks", "The fact the fork comes from: the generic Vector and Matrix bodies have no arithmetic under T extends Number."),
  ("The one library's numeral type is the compiler library's IntLiteral", "Why a Vector of bare numerals is refused by the ring bound: IntLiteral is a Number and not a ring."),
  ("The compiled checker gives a call its expected type", "What rungs E and C built for the expected type; row 660 is the tight juxtaposition they left."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The chapter gives a call written by tight juxtaposition the expected type: row 660 is the checker's gap."),
  (CHG + "The contexts that give a call an expected type", "Its sentence at changes.tex:2077-2081 says the checker gives a tight juxtaposition none (row 660); your repair makes it false: amend it in the S1 form."),
  ("code:" + SC + "/types/TypeSchemaAnalyzer.scala#protected def boundsSubstitution(", "The crash's site, the team's TODO: FIX THIS FOR OPS; the cast at :474-477."),
  ("code:" + TC + "/impls/Operators.scala#case mp@SMathPrimary(info@SExprInfo(span,paren,optType),", "Row 660's site: the multifix try and the left-associated fallback without the expected type."),
  ("code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)", "The loose juxtaposition, the model for row 660's repair."),
  ("code:Library/FortressLibrary.fss#trait Vector[", "Vector's bodies, arithmetic on T under T extends Number: the sites the bound clears."),
  ("code:Library/FortressLibrary.fss#trait Matrix[", "Matrix's bodies, mul's products and accumulation, rmul and lmul: the rest of the arithmetic sites."),
  ("code:Library/FortressLibrary.fss#fn (e: T): T => e + y)..fn (e: T): T => y MAX e)", "The scalar block, eight operators: a bound per operator, AdditiveGroup, StandardMin, StandardMax."),
  ("code:Library/FortressLibrary.fss#(v:T):Matrix[", "matrix(v), row 437's numeral 0."),
  ("code:Library/FortressLibrary.fss#object MaxSumReductionPair", "The precedent: the library's two-trait bound on a type parameter."),
]
V_CHECKS = [
  INTEG, ROUTEA, LIBP, WHICH,
  "ledger:660", "ledger:437",
  F2 + "4. The recommendation, the default, what it changes and costs",
  F2 + "5. A batch 13 rung: files, tests first, sites it clears, what it leaves",
  CHG + "The contexts that give a call an expected type",
  "code:" + SC + "/types/TypeSchemaAnalyzer.scala#protected def boundsSubstitution(",
  "code:" + TC + "/impls/Operators.scala#case mp@SMathPrimary(info@SExprInfo(span,paren,optType),",
]

O_BRIEFING = [
  (ISLZ, "Row 582 decided: isLeftZero over TotalComparison, so the team's answers are reached; the pin at LibraryMeetDeclarations.fss:33 changes; the count goes to 0."),
  (LIBP, "Each repair in the library's own spelling: the per-element bound PCMP took in 2008, the lazy LEXICO arms TotalComparison has, genComb in the shape of Map's combine."),
  (LIBRULE, "The library rule as the curator reads it: the lazy LEXICO on Comparison is an extension he judges, shown its precedent line; name it in your report."),
  (IMPLICIT, "Why the containers stay at Any: lists of tuples and functions are written; only the tuple operators' own parameters take bounds."),
  (WHICH, "Item 43 is built at its default and listed: the one walk value that changes and the unordered pair's false are named in your report."),
  (COUNTP, "The count and the distance are your rung's test, before from batch 12's landed tables; the count's table goes to 0."),
  ("ledger:634", "Under Q43, its tuple half: 17 sites; the list half, LexicographicOrder at :1932, waits for the where-clause line: a note."),
  ("ledger:582", "isLeftZero(_:Comparison) is shadowed by the inherited ReductionWithZeroes.isLeftZero at TotalComparison; two sites, the count's last error."),
  ("ledger:667", "IntMap's three objects define no genComb, which combine calls; write each body in the library's shape; a walk test failing on the base."),
  ("ledger:558", "A typecase with no matching clause throws MatchFailure: the unordered pair's stop today, which Unordered => false replaces."),
  ("ledger:488", "BIG LEXICO(g) at :130, a site that varies from run to run: a point if it moves beside your LEXICO arms."),
  (TUP + "3. The recommendation, and what it changes", "Way 1b for tuples: the ten headers, the lazy LEXICO and its two arms, the eight Unordered clauses, and why each."),
  (TUP + "4. The walk values that change", "Each pin with its before and after: the nested pair refused, the rest unchanged, and the values not pinned."),
  (TUP + "6. How a library rung of batch 14 builds it", "The rung's files, tests first and points, which your section takes over in this batch."),
  ("code:Library/FortressLibrary.fss#object LexicographicReduction", "Row 582's site, isLeftZero beside isLeftZero(_:EqualTo)."),
  ("code:Library/FortressLibrary.fss#trait ReductionWithZeroes", "The inherited isLeftZero(l:L) that shadows the team's today."),
  ("code:Library/FortressLibrary.fss#trait Comparison", "Comparison's strict LEXICO, whose lazy sibling you add."),
  ("code:Library/FortressLibrary.fss#Shouldn't these operators have to extend something..(a1 CMP a2) LEXICO: (b1 CMP b2) LEXICO: (c1 CMP c2)", "The tuple operators under the 2008 comment: the 17 sites, the headers and the eight typecases you change."),
  ("code:Library/RangeInternals.fsi#opr SCMP(a: ZZ32, b: ZZ32): Comparison..opr PCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison", "The precedent: the range tuples' comparison, bounded per element by the team."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr LEXICO(self, other:()->Comparison): Comparison", "The team's compiler prelude declares the lazy LEXICO on Comparison: a precedent line for the extension."),
  ("code:Library/IntMap.fss#private genComb[", "Row 667's abstract genComb, which combine calls and no object defines."),
  ("code:Library/Map.fss#if that.isEmpty then mapThis(self)", "Map's combine on its node object, splitting the other map at the key: the shape genComb's bodies follow."),
]
O_CHECKS = [
  ISLZ, LIBP, LIBRULE, WHICH,
  "ledger:634", "ledger:582", "ledger:667",
  TUP + "3. The recommendation, and what it changes",
  TUP + "4. The walk values that change",
  "code:Library/FortressLibrary.fss#object LexicographicReduction",
]

G_BRIEFING = [
  (LIBP, "Each repair in the library's own way, family by family: a default counted by running, as opr IN is; one pass as Generator2's relational reduction is; a small object as map is."),
  (LIBRULE, "The library rule as the curator reads it: Generator's opr |self| is an extension he judges, shown its precedent line, opr IN; name it in your report."),
  (WHICH, "Item 45 is built at its default and listed: where walk now answers where it stopped is named in your report."),
  (COUNTP, "The count and the distance are your rung's test, before from batch 12's landed tables."),
  ("ledger:629", "Under Q45: nine sites in three shapes, a size or index read from a Generator and the default pairs answering a Generator."),
  ("ledger:425", "The checker's rewriting of a reduction by its element type: why the default counts with mapReduce, not SUM."),
  (GEN + "2.1 The nine sites come from three moments, none a design", "How the nine came about in the team's commits: the size moved off Generator, indices retyped, cond ill-typed from its first line."),
  (GEN + "4. The recommendation: ways 1, 3 and 6", "The default you build, what it changes under walk and what it costs."),
  (GEN + "5. The rung for batch 14", "The rung's files, tests first and first measurements with their fallbacks, which your section takes over in this batch."),
  ("The one library's generator, condition, reduction and generator-of-generators slips", "What batch 10's rung G repaired in these families, and the sites it left, row 629's."),
  ("code:Library/FortressLibrary.fss#trait Generator[", "Generator, where opr |self| gets its default beside opr IN."),
  ("code:Library/FortressLibrary.fsi#trait Generator[", "Generator's api, where the declaration and its comment go after opr IN."),
  ("code:Library/FortressLibrary.fss#trait RelationalPredicateCondition", "Shape B: cond reads a size and an index from a Generator."),
  ("code:Library/FortressLibrary.fss#fn (i:I): (I,E) => (i,self[i])", "Shape C: the default pairs mapped over indices, a Generator."),
  ("code:Library/FortressLibrary.fss#object SimpleMappedIndexed", "The sibling object beside which the pairs object goes, and the shape it follows."),
]
G_CHECKS = [
  LIBP, LIBRULE, WHICH,
  "ledger:629",
  GEN + "4. The recommendation: ways 1, 3 and 6",
  GEN + "5. The rung for batch 14",
  "code:Library/FortressLibrary.fss#trait Generator[",
]

W_BRIEFING = [
  (STD, "The text is the standard: an override at equal parameter types overrides nothing and is a static error by the traits chapter, and walk refuses it at load."),
  (WHICH, "Q2's strict reading is built at its default and listed for the curator; item 51's allowance stays as landed."),
  (SPECREC, "Why the callout's sentence changes: it is false, and the Effect beside it in Appendix I with it."),
  (S1, "The form of your text change: the callout and the Effect revised in place."),
  ("ledger:653", "Your first check, sharpened: an override at equal parameter types overrides nothing; walk's half only, the row open for the checker's half."),
  ("ledger:665", "Your second check: the override check on generic objects, object expressions in generic functions and generic traits; its abstract half waits, so the row stays open."),
  ("ledger:666", "Walk's allowance for a body at narrower parameter types, item 51's question: not yours; keep it as landed."),
  ("ledger:668", "Why row 665's abstract half waits: checking each generic instance would refuse SeededRandomGenWithDistribution, under item 51."),
  ("ledger:650", "The code generator's override, not yours: row 653's compiled half waits on it."),
  ("ledger:615", "The landed reading of overridden that your check follows: what a type's own override declarations override."),
  (WLC + "3. Q2: an override with equal parameter types overrides", "The check of Q2: the chapter's letter, its history, the implementations, the library and tests, the verdict and what replaces it."),
  (WLC + "4. Three gaps in the record", "The callout's false sentence and why, with the other two gaps."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "The inheritance rule's equal clause, the override sentence's strict subtype, and the static error you make true for equal types."),
  ("doc:Specification/basic/functions.tex#Abstract Function Declarations", "The revival-covering callout whose last sentence you correct."),
  (CHG + "Traits with comprises clauses read at the level of values", "The entry whose Effect repeats the false sentence at changes.tex:2604-2606."),
  ("Walk refuses at load an object that leaves an inherited abstract method without a body", "What batch 12's rung W built, the allowance and the generic types it left unchecked."),
  ("code:" + EV + "/values/Constructor.java#private static void checkOverrides(", "Your first site: the check that refuses an override overriding nothing, through overriddenBy."),
  ("code:" + EV + "/values/Constructor.java#private static boolean overriddenBy(", "The non-strict relation, shared with providedByTrait, which stays as it is."),
  ("code:" + EV + "/values/Constructor.java#public void finishInitializing()", "Where the override check runs for a declared object only: row 665's site for objects."),
  ("code:" + EV + "/BuildEnvironments.java#private void forTraitDecl3(TraitDecl x)", "Where the override check runs for a trait without static parameters only: row 665's site for traits."),
  ("code:Library/Pairs.fss#trait RunRanges", "review-routed.2's test: RunRanges and SingleRange's BOXPLUS, which runRanges reaches."),
  ("code:Library/FortressLibrary.fss#trait AssociativeReduction", "review-routed.1's test: the abstract simpleJoin at R that a program's own reduction at Any leaves without a body."),
]
W_CHECKS = [
  STD, WHICH,
  "ledger:653", "ledger:665", "ledger:666",
  WLC + "3. Q2: an override with equal parameter types overrides",
  "doc:Specification/basic/traits.tex#Method Declarations",
  "code:" + EV + "/values/Constructor.java#private static void checkOverrides(",
]

IDS = ('N', 'V', 'O', 'G', 'W')
LISTS = {
  'N': ([k for k, _ in N_BRIEFING], N_CHECKS),
  'V': ([k for k, _ in V_BRIEFING], V_CHECKS),
  'O': ([k for k, _ in O_BRIEFING], O_CHECKS),
  'G': ([k for k, _ in G_BRIEFING], G_CHECKS),
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
}
REASONS = {'N': N_BRIEFING, 'V': V_BRIEFING, 'O': O_BRIEFING, 'G': G_BRIEFING, 'W': W_BRIEFING}


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
    root = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
    bad = 0
    for rid, (b, c) in LISTS.items():
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            if len(set(keys)) != len(keys):
                print('   PROBLEM duplicate key in', rid, name); bad += 1
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
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
