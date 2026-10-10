// Workflow script: one batch of the compile-path ladder climb.
//
// What it does, stage by stage, and why: explorations/coordinator/climb-batch-workflow.md
// (the manual) and explorations/coordinator/process-engineering/batch-redesign.md (the
// practice it builds, with the evidence and the cost of each choice). A batch is a manifest
// change and nothing else: the coordinator splices the block between the MANIFEST and END
// MANIFEST lines from the batch's generator (explorations/compile-ladder/plan-<N>/manifest/)
// and launches. Before the launch the coordinator builds the batch's one base build; each
// rung worker makes its own worktree, seeded from it:
//   Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js',
//             args: {base: '<the full hash of the base>', baseBuild: '<the base build, a built worktree at that commit>'}})
//
// The shape since the redesign of 2026-10-08: each rung's worker does the rung test first;
// its skeptic checks it and fixes what it finds, test first; a judge rules only on a fix
// the skeptic marks contested or on a rung it cannot fix, and a repair round runs only on
// the judge's word; no second skeptic. Then the gather lands the approved rungs on main,
// the merged-diff review and the gate run side by side, and the commit stage lands the
// gate's tables, runs the microGPT walk check and pushes. The batch writes no skill text:
// each rung's revival-change material goes into the batch's RECORD.md, and the standing
// skill writer writes the skill from it after the landing, before a cold read
// (explorations/reviews/skills-agenda-audit.md, "Proposed fix to the mechanism"). Every
// agent is pinned to Opus but a judge's second ruling on the same rung or tree, which runs
// on Fable (POSITIONS.md, "The judge's rulings."). Every prompt
// points to the fortress-repo skill for how to build, test, run the old code, wait and
// commit, and says only what the role does in this batch. No backticks and no non-ASCII
// character anywhere in this file.
//
// Every agent() call goes through callAgent ("An agent that comes back with nothing"),
// which runs a role again, up to two more times, when its agent returns nothing; a usage
// or rate limit, or a rung worker, skeptic or judge that returns nothing after its
// attempts, stops the run there and decides nothing, and resumeFromRunId with the same
// script and args then runs that role again.

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in seeded worktrees: each rung done test first by its worker and checked by a skeptic that fixes what it finds, a judge only on a contested fix or a refusal; gathered onto main, reviewed beside one gate, landed and pushed; its revival-change material left in the batch record for the skill writer',
  phases: [
    { title: 'Rung', detail: 'the rung done test first in its own seeded worktree, committed and pushed to its wip/ branch as it goes' },
    { title: 'Skeptic', detail: 'the rung checked by reading and by programs of its own on the old and new code; what it finds it fixes, test first, and it marks a fix contested when nothing on record settles it' },
    { title: 'Judge', detail: 'Opus for a first ruling, Fable for a second on the same rung or tree: only on a contested fix, a refusal, a worker that stopped, a blocking review or a red gate' },
    { title: 'Gather', detail: 'each approved rung applied to main in one commit with its record folded, the new ledger rows added through ledger.py, the rows it fixed closed' },
    { title: 'Review', detail: 'the merged diff, the skeptics\' fixes and the folded record read as a whole, once, beside the gate' },
    { title: 'Gate', detail: 'compileAll, the suites at four threads, testSpecData once a rung brings it, the atomic runs, the ladder regression, the checker count, and the distance stage beside them, reported and never red' },
    { title: 'Commit', detail: 'the gate\'s tables landed, the microGPT walk check run, the batch checked for skill text it should not have written, main pushed to its three branches, the worktrees removed; no push while a step that cannot be undone is unlifted' },
  ],
}

const OPUS = 'opus'   // every agent but a judge's second ruling
const FABLE = 'fable' // a judge's second ruling on the same rung or tree
const judgeTier = (priorRuling) => priorRuling ? { model: FABLE } : { model: OPUS }
const BASE = args && args.base
if (!BASE) throw new Error('args.base is required: the commit every wip/ branch is cut from')
// The batch's one base build (POSITIONS.md, "Nothing is built or run twice on the same code."): a
// worktree at BASE that the coordinator built once before the launch. Every rung worktree is
// seeded from it (tools/seed-worktree.sh), and the old code runs from it through
// tools/old-fortress.sh, each rung with a private caches folder in its worktree's tmp/; nobody
// builds, compiles or runs anything else in it.
const BASE_BUILD = args && args.baseBuild
if (typeof BASE_BUILD !== 'string' || !/^\/[A-Za-z0-9._\/-]+$/.test(BASE_BUILD) || /\/$/.test(BASE_BUILD))
  throw new Error('args.baseBuild is required: the absolute path of the worktree at the base, built once before the launch (climb-batch-workflow.md, "Before the launch"), with no trailing slash, space or quote')
const TOOLS = 'explorations/coordinator/tools'
const SEED = BASE_BUILD + '/' + TOOLS + '/seed-worktree.sh'
const OLD = BASE_BUILD + '/' + TOOLS + '/old-fortress.sh'   // runs the base's code from the base build
const oldCaches = (rung) => rung.path + '/tmp/old-caches'   // a rung's private caches folder for the old code
const PUSH_BRANCHES = ['claude/worker-brief-fable-vnnuv8', 'blinded-fable']   // every push of main goes to these too (explorations/protocol.md, hard rules)
const MAIN = '/home/user/fortress'
const LEDGER = TOOLS + '/ledger.py'

// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Generated by explorations/compile-ladder/plan-13/manifest/gen13.py from
// CLIMB-BATCH-13.md (section 3, each rung's section word for word; section 5, the
// manifest fields and the intro) and the briefings of lists13.py; check13.js checks it.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order only),
// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line
// for the batch table), section (the rung's section of the record, read by every role
// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the
// worker reads first, each with its reason), checks (the sub-list the skeptic, a judge
// and a repair round read), expectedMoves (ladder moves declared, none here), and the
// optional landsOnlyWith, expectedCheckerCount and expectedCheckerCrash (rung O declares
// the checker count 0, the count stage's last error being its row 582; no rung declares
// landsOnlyWith or a crash).
// No value is set at launch. The base and the base build are args.base and
// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The
// Workflow harness runs two agents at once on this box"); the scatter starts the
// longest expected worker first.
// ===========================================================================

const BATCH = '13'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-13.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-13/manifest/lists13.py'

const N_SECTION = [
"**The answers this rung follows.** Item 15 is answered (2026-10-09): 15a with its part (b) (POSITIONS, \"Arithmetic in a size: the checker compares size expressions by their written form after folding numerals, and a size name may equal a numeral (item 15, 15a with (b)).\"): the checker accepts a sum, difference, product or power in a size, compares two size expressions by their written form once numerals are folded (2 3 is 6; s0 s1 is not s1 s0) and range-checks what it folds; the class loader computes the value when it makes a class; a size name counts as possibly equal to a numeral; the team's storage fields stay sized by a product; the specification's identity sentence is revised in the S1 form with an Appendix I entry. Fork 3 (PLAN item 13, point 3) is not answered: this rung builds it at the default of explorations/reviews/array-fork3-judgement.md, way 4a, taken on the curator's standing go and listed for his review (section 2, Q13.3), and every line marked \"under Q13.3\" applies; if he answers otherwise before the launch, those lines are dropped. The order the judgement requires, the NatParam clause never on a tree without part (b), is met inside this rung: build and commit part (b) and 15a first, the clause after, and show on your tree that a typecase on a NatParam value with an N[\\0\\] clause is reachable. The judgement reads the curator's \"Sizes\" entry anew (an opened size is bound, not unknown) and widens the revival's own sentence at Specification/basic/traits.tex:238-240; both are listed for him. The array design's other questions stay open (POSITIONS, \"The array design's three questions are open.\"). Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Item 15, 13 sites, no row of its own (row 307's notes name XXXNatArithChecker): the storage fields of __DefaultArray2, __DefaultMatrix and __DefaultArray3, mem:PrimitiveArray[\\T, (s0 s1)\\] and its rank-3 twin (Library/FortressLibrary.fss:2619, :2783, :3006, two errors each, \"Ill-formed static argument: s0 s1 Arithmetic on nat static arguments is not supported by the type checker\"), the same two types at ProjectFortress/LibraryBuiltin/NativeArray.fsi:12 (2), reflect's helper __refl' at ProjectFortress/LibraryBuiltin/NatReflect.fss:45 and :47 twice (3), and the two typecase arms typecase N[\\b0\\] of N[\\0\\] that the checker calls unreachable (Library/FortressLibrary.fss:2423, :2434), because its size rule says a symbol is not any literal (scala_src/types/TypeAnalyzer.scala:354-362, pEqv). The refusal is hasSizeArithmetic (scala_src/typechecker/TypeWellFormedChecker.scala:41-47) and its three uses (:83-84, :148-149, :187-188); the equality is nEq (scala_src/typechecker/Formula.scala:95-105, \"A size with arithmetic in it equals nothing\"); the range check of a literal size is already there (sizeOutOfRange, TypeWellFormedChecker.scala:55-70), and what you fold passes through it. The loader: the name mangler spells a size expression out (compiler/NamingCzar.java:1899-1905, forIntBinaryOp); 15a asks that the class loader compute the value when it makes a class, so that Box[\\2 + 1\\] and Box[\\3\\] are one class; find where a template's static arguments are put in and compute there. Walk already computes a size exactly and range-checks it (interpreter/evaluator/EvalType.java:468-479). The test is ProjectFortress/compiler_tests/XXXNatArithChecker, which compiles and runs Box[\\2 + 1\\] and Box[\\k + 1\\].",
"- Under Q13.3, fork 3, 10 sites: the six run-time factories __arr1, __arr2, __arr3, __imm1, __parr and __piarr, each called with reflect(x) where N[\\n\\] is declared (Library/FortressLibrary.fss:2114, :2116, :2118, :2132, :2151, :2156), and the four rank-1 subarrays (:2249, :2257, :2307, :2315; row 664 records :2257 and :2315): \"Could not check call to function __arr1 ... is not applicable to an argument of type (()->E, NatReflect.NatParam)\". The team's rule, as a comment since 2007: trait NatParam (* comprises { N[\\n\\] } where [\\ nat n \\] *) (NatReflect.fsi:22-25, NatReflect.fss:23-26), with \"within that function n becomes a static nat parameter\" (NatReflect.fss:19-21). The repair, as the judgement's section 4 reads it: uncomment the clause in both files; KindEnv takes a nat (and int) where binding, where today it stops with \"non-type where clause bindings\" not yet implemented (scala_src/typechecker/staticenv/KindEnv.scala:117-127); TypeAnalyzer.pSubInner opens an argument whose type is a trait whose comprises clause lists an instantiation at where-clause variables, each variable a fresh name equal only to itself, and checks the listed type against the parameter (TypeAnalyzer.scala:130-169, beside the union case); TypeHierarchyChecker.checkDeclComprises accepts N[\\nat n\\] extends NatParam against the listed N[\\n\\] (scala_src/typechecker/TypeHierarchyChecker.scala:192-283); walk's loader binds the where-bound size so that comprises { N[\\n\\] } evaluates, and the comprises load check reads the listed N[\\n\\] as N at every n (interpreter/evaluator/BuildEnvironments.java:893-945, finishTrait and processWhereClauses; checkComprisesClauses at :1127). An opened size that reaches a declared sized type is refused, as it should be; one value opened twice in one call gets two names (no site does this).",
"- Under Q13.3, the two crash rows, 4 calls hidden: the checker stops on the whole of Array2 (:2491-2605) and Array3 (:2880-2993) at their asString's local row(i) and row(i,k), whose parameters have no type (\"Missing parameter type for i\", :2500, :2899; climb-batch-12/gate/distance.txt, the #crash rows). Type them row(i: ZZ32) and row(i: ZZ32, k: ZZ32), and any next untyped local parameter of the same two getters in the same way (plane(k) beside row(i,k)). Behind them, by reading, four calls of fork 3's shape: Array2's range subscript and shift (:2537, :2574) and Array3's (:2948, :2959); your rule clears them. Whatever else the two traits hold comes onto the list: count it by row and line, and give each new site a row or a note.",
"- Notes, not repairs: row 307 (item 15 clears its arithmetic half; NatReflectTest compiled still stops for want of NatReflect in the compiled library, and the compiled half of fork 3, a call whose size is read off the argument's descriptor and the code generator's refusal of a where clause, waits for the switch-over); row 25 (the reflect idiom stands, now accepted); row 636 (the same rule for a type, List's \"Not yet: comprises List[\\E\\] where [\\E\\]\": not this rung's); row 577 (count by row and line).",
"",
"**Distance sites.** Item 15's 13 and, under Q13.3, fork 3's 10: 23, all in components FortressLibrary, NatReflect and NativeArray's api. The 4 hidden calls are not on the 153; whatever the unhidden traits show is reported by row and line. Row 664 closes under Q13.3.",
"",
"**Files.**",
"- Under ProjectFortress/src/com/sun/fortress/scala_src/: typechecker/TypeWellFormedChecker.scala (hasSizeArithmetic and its three uses, :41-47, :83-84, :148-149, :187-188, with sizeOutOfRange, :55-70; not the static-argument bound check at :151-167, which V's new row names), typechecker/Formula.scala (nEq, :95-108), types/TypeAnalyzer.scala (pEqv, :354-362; pSubInner, :130-169; comprisesClause, :727-734, if a where-bound name must stay free there), and under Q13.3 typechecker/staticenv/KindEnv.scala (:112-127) and typechecker/TypeHierarchyChecker.scala (checkDeclComprises, :192-283).",
"- ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java (forIntBinaryOp, :1899-1905) and the loader code that puts a template's size arguments in.",
"- Under Q13.3: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java (finishTrait and processWhereClauses, :893-945; checkComprisesClauses, :1127 on); ProjectFortress/LibraryBuiltin/NatReflect.fsi:23 and NatReflect.fss:24; Library/FortressLibrary.fss:2500 and :2899 (and a next untyped local of the same two getters).",
"- Specification/basic/types-vals-vars.tex (:46-52), Specification/appendices/changes.tex (a new entry before \"Passages not yet revised\", :3126; under Q13.3 the entry \"The traits that extend a closed trait\", :1297-1397); under Q13.3 Specification/basic/traits.tex (:235-240) and Specification/basic/trait-parameters.tex (\"Nat and Int Parameters\", :80-112).",
"- New and promoted files in ProjectFortress/compiler_tests/ and ProjectFortress/tests/.",
"- Not: scala_src/types/TypeSchemaAnalyzer.scala and scala_src/typechecker/impls/Operators.scala (V's); the array family's headers, Vector, Matrix and their factories (V's); the reductions, orders, tuples and generators (O's and G's); interpreter/evaluator/values/Constructor.java and BuildEnvironments.forTraitDecl3 (W's); the model.",
"",
"**Tests, first.**",
"- Item 15: XXXNatArithChecker promoted to a name by topic, compiling and running Box[\\2 + 1\\] and Box[\\k + 1\\] with their values asserted, as it is written; through junit.sh on the base it shows today's refusal. Add to it, or beside it, a typecheck case that s0 s1 is not s1 s0 (refused) and one that a folded size out of range is refused with the range check's message.",
"- Item 15's part (b): a compiled test of its own, a typecase N[\\b0\\] of N[\\0\\] in a generic function, its N[\\0\\] arm reached for b0 = 0 and its value asserted; refused on the base as unreachable. It declares its own sized value object in NatReflect's shape, NT[\\nat n\\], since ProjectFortress/compiler_tests/ cannot import NatReflect (row 307), as the Q13.3 test below does.",
"- Under Q13.3: ProjectFortress/compiler_tests/ cannot import NatReflect (row 307), so the test declares its own trait NatParamT comprises { NT[\\n\\] } where [\\nat n\\], a value object NT[\\nat n\\] extends NatParamT, a maker mk(): NatParamT = NT[\\3\\], a generic take[\\nat n\\](x: NT[\\n\\]) whose sized result is widened to an unsized parent, and a typecase mk() of NT[\\0\\] => ... else => ... end reachable under part (b); seen failing on the base at the header (the KindEnv refusal), passing at the typecheck after. A second file, an expected failure, holds the refused line keep[\\nat n\\](x: NT[\\n\\]): NT[\\n\\] with y: NT[\\3\\] = keep(mk()), refused before and after. The compiled run of an opened size is fork 3's compiled half, after the switch-over: if you write it, it stays an expected failure under row 307.",
"- Under Q13.3: ProjectFortress/tests/NatReflectTest.fss under walk keeps its two OK lines; by reading the uncommented clause stops walk at load until walk's loader binds the where-bound size, which is the failing run of your walk edit.",
"- The count and distance stages once on your final tree, before from batch 12's landed tables, read by row and line: the 23 gone, and under Q13.3 the two crash rows gone and the unhidden traits' sites listed, their 4 calls among the gone.",
"- Keep their verdicts: the 19 compiler_tests/NatRt* tests, NatArgRungS, NatDispArmChecker, NatOverrideChecker, XXXNatBoolChecker (row 307's bool half); the seven walk array tests (vectorOps, matrixOps, ArrayScalarExtension, ArrayOperatorsBesideLibrary, FlatTowerRungF, TabulateRungA, sparseMatrix).",
"- After the edit: the compiler and library test tracks once (ant testQuick) and, since walk's loader and the library changed, the interpreter suite once (ant testSystem); the count and distance stages once.",
"",
"**Specification.** Item 15: the identity sentence, \"Two types are identical if and only if they are the same kind and their names and static arguments (if any) are identical\" (Specification/basic/types-vals-vars.tex:51-52, under the team's note that it \"isn't complete in any case\"), revised in the S1 form to say when two size expressions are the same (the same written form once numerals are folded) and that a size name is not known to differ from a numeral, as the team's Q&A answers (Specification/appendices/internal-document.tex:167-198); a new Appendix I entry before \"Passages not yet revised\" (Specification/appendices/changes.tex:3126) with the reason, the original sentence from Specification-1.0-frozen/, and route C (POSITIONS, \"Every change to the specification is recorded with its reason.\"; \"The S1 form\"). Under Q13.3: the comprises proviso at Specification/basic/traits.tex:238-240, \"provided that every static variable that occurs in its static arguments is a static parameter of T\", widened to admit a where-clause variable of T's declaration, which the listed type then holds at every value; one sentence in \"Nat and Int Parameters\" (Specification/basic/trait-parameters.tex:80-112) stating the opening; and the entry \"The traits that extend a closed trait\" (changes.tex:1297-1397) amended with the reason and the team's comment as route C. List every other sentence your change makes false.",
"",
"**Overlaps by file.**",
"- V edits the checker too, in TypeSchemaAnalyzer.scala and impls/Operators.scala, and the library's array family; no file of the checker is both rungs', and no library declaration: N types two local parameters inside Array2's and Array3's asString, V the bounds of Vector, Matrix and their family.",
"- V, O and G edit Library/FortressLibrary.fss; N only the two lines :2500 and :2899.",
"- W edits walk in Constructor.java and BuildEnvironments.forTraitDecl3; N edits BuildEnvironments' finishTrait, processWhereClauses and the comprises check, other methods.",
"- Specification/appendices/changes.tex: N adds an entry and amends \"The traits that extend a closed trait\"; V amends \"The contexts that give a call an expected type\"; W amends \"Traits with comprises clauses read at the level of values\". Different entries; the gather orders them.",
"- ProjectFortress/compiler_tests/: N and V add distinct files. ProjectFortress/tests/: N, V, O, G and W add distinct files.",
].join('\n')

const V_SECTION = [
"**The answers this rung follows.** Fork 2 (PLAN item 13, point 2) is not answered: this rung builds it at the default of explorations/reviews/array-fork2-judgement.md, taken on the curator's standing go and listed for his review (section 2, Q13.2), and every line marked \"under Q13.2\" applies. That default bends the letter of POSITIONS, \"The integration review's checks\" (\"the generic Vector/Matrix bodies are checked per operation's required capability, with no blanket ring bound that would exclude integer arrays\") on Vector and Matrix while keeping its reason: every number type of the flat tower is a ring at its own type, integers included (Library/FortressLibrary.fsi:443), so no integer array is excluded; the scalar block keeps its letter, a bound per operator. The checker's crash comes first, test first: without its fix the library's overloading and export stages crash on the bound and hide their errors. Row 660 is the next checker rung's by PLAN's line for it; Q48's part (b), row 455's argument faces beside it, is not answered and is not this rung's. Row 437's repair takes the form fork 2 gives it (batch 12's rung S left it so). Route A stands (POSITIONS, \"The exclusion rule stays and the tower is flat (route A)\"). Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- A checker crash, no row yet (NEW-V-1): TypeSchemaAnalyzer.boundsSubstitution (scala_src/types/TypeSchemaAnalyzer.scala:441-490, the team's \"TODO: FIX THIS FOR OPS\", David Chase, 2012) builds each parameter's bound list from the conjuncts of the meet of its bounds and casts each to BaseType (:474-477). The analyzer reads a closed trait as the intersection of its name with the union of its comprises members and distributes the intersection, so the meet of { Number, MultiplicativeRing[\\T\\] } is a union and the cast throws: \"ClassCastException: class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType\", under reduceED (:421), normalizeED (:216), subtypeEDInner (:171), whenever the overloading checker compares two overloads whose parameter carries the list. Measured by the judgement on a library copy: three stage crash rows, the api's and the component's overloading and the component's export. The judgement's reading of the fix: keep the image bounds as the list they are, each already a BaseType, never met into one type to be cast; the comparison at :487 compares types and needs no cast. One call is refused for the same reason by reading, the norm's squaredNorm(me) at Library/FortressLibrary.fss:2483 (\"is not applicable to an argument of type Vector[\\T,k\\]\"); whether the same code refuses it is for your test to say.",
"- Row 660, no distance site: the checker gives no expected type to a tight juxtaposition of items none of which is a function, a(b) where a is not a function. The SMathPrimary case (scala_src/typechecker/impls/Operators.scala:205-376, the left-associating tail at :355-374) tries the multifix juxtaposition and then the left-associated binary ones with no expected type, where the loose juxtaposition (:170-197) and, since batch 12's rung C, the repeated operator (:379-393) give it. The fix mirrors theirs. Gated by ProjectFortress/compiler_tests/XXXInferTightJuxtContext.",
"- Under Q13.2, 23 sites: arithmetic on T in the bodies, 15 (\"Could not check call to operator + ... is not applicable to an argument of type (T, T)\" and its kin): Vector's +, -, unary -, scale, pmul and dot (Library/FortressLibrary.fss:2395, :2397, :2398, :2399, :2401, :2403) and Matrix's +, -, unary -, scale, mul's two products and its accumulation, rmul and lmul (:2703, :2705, :2706, :2707, :2713, :2739, :2715, :2769, :2774); the scalar block, 8 (:4716, :4717, :4718, :4722, :4723, :4724, :4725, :4726). The repair, as the judgement measured it: T extends { Number, MultiplicativeRing[\\T\\] } in place of T extends Number on the array family, 29 lines of the component (Vector, __DefaultVector, the factories vector and tabulatedVector, pmul, squaredNorm, the norm, Matrix, __DefaultMatrix, TransposedMatrix, the factories matrix, and every sized DOT and juxtaposition of the family, :2391-2871) and 32 of the api (Library/FortressLibrary.fsi:1602-1785); in the block, + and - take { Number, AdditiveGroup[\\T\\] }, MIN { Number, StandardMin[\\T\\] }, MAX { Number, StandardMax[\\T\\] } (:4716-4726; api :2683-2693), 8 and 8. The precedent lines: MaxSumReductionPair's and MinSumReductionPair's two-trait bounds (:3262, :3268) and SUM's and PROD's algebra bounds (:3284-3301). One site comes, as read: :2399, scale's \"Function body has type Array1[\\T,0,s0\\], but declared return type is Vector[\\T,s0\\]\", which its arithmetic error hides today.",
"- Under Q13.2, the 2 factory sites stay: \"Ill-formed type: Vector[\\T,s0\\] The static argument T does not satisfy the corresponding bound Number\" at vector (:2454) and the same for Matrix at matrix (:2831). By the judgement's reading a checker slip, not the bound's: TypeWellFormedChecker.scala:154-167 tests the written T with no bound in scope at the first declaration of each overloaded factory pair. It gets a row (NEW-V-2), not a repair: TypeWellFormedChecker.scala is N's file.",
"- Under Q13.2, row 437, 1 site: matrix(v)'s off-diagonal numeral 0 (:2834, \"Function body has type OR(IntLiteral,T), but declared return type is T\") becomes v.zero, which AdditiveGroup gives T under the new bound (Library/FortressLibrary.fsi:260). Under walk, matrix(v) for NN32 and NN64, refused today, then runs.",
"- Notes, not repairs: row 591 (a two-bound parameter that no call fixes stays at Bottom under walk; the arrays' calls all fix T); row 455 (Q48's part b, held); row 577 (count by row and line).",
"",
"**Distance sites.** Under Q13.2, 23 gone, 1 come (:2399); row 437's 1 gone; net 23. The 2 factory sites stay. If the norm's call at :2483 stays refused, a point to report with its trace. No #crash stage row may come.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala (boundsSubstitution, :441-490).",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala (the SMathPrimary case, :205-376).",
"- Under Q13.2: Library/FortressLibrary.fss, the array family's T extends Number lines (:2391-2871), matrix(v) (:2833-2834) and the scalar block (:4716-4726); Library/FortressLibrary.fsi (:1602-1785, :2683-2693).",
"- Specification/appendices/changes.tex, the entry \"The contexts that give a call an expected type\" (:1985-2126), for row 660 only.",
"- New and promoted files in ProjectFortress/compiler_tests/; one new walk test in ProjectFortress/tests/.",
"- Not: TypeAnalyzer.scala, TypeWellFormedChecker.scala, Formula.scala, KindEnv.scala, TypeHierarchyChecker.scala (N's); Functionals.scala (the argument-context probe's, Q48 b); Array2, Array3 and every array declaration that is not the family's T extends Number line, matrix(v) or the block; the parent-trait bodies, the sizes tested in a branch, the export errors (a list of ways first); the model; walk.",
"",
"**Tests, first.**",
"- The crash, against the compiler's prelude, whose Number is not closed, so each test declares its own closed trait: trait K comprises { A, B }, a self-typed trait R[\\T extends R[\\T\\]\\], objects A and B extending both. An XXX test with two overloaded generic functions f[\\T extends { K, R[\\T\\] }\\](x: T, y: ZZ32) and f[\\T extends { K, R[\\T\\] }\\](x: T, y: String), called on A: the checker crashes on the base, and must check and run after. An XXX test with g[\\T extends { K, R[\\T\\] }\\](x: T): T = h(x) and h[\\T extends { K, R[\\T\\] }\\](x: T): T: refused on the base as :2483 is, checking after if the same code refuses it. Each promoted by the fix, or the second kept with a row if its cause is elsewhere. GenericBesidePlainTwoBounds.fss keeps its verdict under walk.",
"- Row 660: XXXInferTightJuxtContext promoted to a name by topic, compiling and its value asserted; a(b)(c) beside it.",
"- Under Q13.2: the count and distance stages are the test of the 23 and of row 437's site, before from batch 12's landed tables, after once on your tree, read by row and line: the 23 and :2834's OR(IntLiteral,T) gone, :2399 come, the 2 factory sites unchanged, no #crash stage row, the export, isLeftZero and distribute errors still counted. Read the stage's FortressLibrary time against 739 s and report it.",
"- Under Q13.2: one walk test, values asserted, of what the bound names for an integer and a float element type: an integer vector's dot and scale, an integer matrix product, the block's MIN and MAX with a ZZ32 and an RR64 array, and matrix(v) for NN32 (its stop on the base is the failing run, row 437).",
"- Keep their verdicts: the seven walk array tests (vectorOps, matrixOps, ArrayScalarExtension, ArrayOperatorsBesideLibrary, FlatTowerRungF, TabulateRungA, sparseMatrix), RationalTest, IntegerOrderNumerals, GenericBesidePlainTwoBounds; InferLooseJuxtContext, InferRepeatedOperatorContext, the inference tests of batches N, 8, 10 and 12; XXXInferContextDrops (row 455).",
"- After the edit: the compiler and library test tracks once (ant testQuick) and the interpreter suite once (ant testSystem), since walk reads the library; the count and distance stages once.",
"",
"**Specification.** Row 660: the entry \"The contexts that give a call an expected type\" says the checker \"still gives none to the juxtaposition operator application that a tight juxtaposition of items none of which is a function stands for ... (row 660)\" (Specification/appendices/changes.tex:2077-2081); your repair makes it false: amend it in the S1 form with the date and the row. The chapter's sentence already gives a tight juxtaposition the expected type (Specification/basic/inference.tex:149-151). Fork 2: none; the specification's elements of vectors and matrices are numbers (Specification/basic/expressions/aggregate.tex:152-170; Specification/preliminaries/overview.tex:917), which stays true; the library's bounds are the library's.",
"",
"**Overlaps by file.**",
"- N edits the checker too, in other files; no checker file is both rungs'.",
"- N, O and G edit Library/FortressLibrary.fss and .fsi: N two local parameters in Array2's and Array3's asString; O the comparisons, isLeftZero and the tuples (:93-215, :4448-4553; .fsi :93-164, :2624-2635); G Generator, Indexed's default pairs, a new object beside SimpleMappedIndexed and cond (:1141-1239, :1847-1848, :3600, :4651-4661; .fsi :729-829). No declaration is two rungs'.",
"- Specification/appendices/changes.tex: N and W amend or add other entries.",
"- ProjectFortress/compiler_tests/: N adds distinct files.",
].join('\n')

const O_SECTION = [
"**The answers this rung follows.** Row 582 is decided (POSITIONS, \"LexicographicReduction.isLeftZero takes TotalComparison, so the team's answers are reached (row 582).\"): the team's isLeftZero(_:Comparison): Boolean = true is declared over TotalComparison, so that the inherited ReductionWithZeroes.isLeftZero no longer shadows it; LessThan and GreaterThan answer true and EqualTo false; the pin at ProjectFortress/tests/LibraryMeetDeclarations.fss:33 changes, its before and after listed; the count goes to 0. Item 43 is not answered: this rung builds the tuple half at the default of explorations/reviews/tuple-comparisons-judgement.md, way 1b, taken on the curator's standing go and listed for his review (section 2, Q43), and every line marked \"under Q43\" applies; the list half, LexicographicOrder at :1932, waits for the where-clause line. Under Q43 one value walk prints changes, ((1,2),3) < ((1,3),0) from true to a refusal, and a pair whose first elements are unordered answers false where it stops today. Row 667 is the next library rung's by PLAN's line for it. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Under Q43, row 634's tuple half, 17 sites: the ten order operators on pairs and triples compare elements whose type parameters have no bound, \"Could not check call to operator CMP ... is not applicable to an argument of type (A, A)\" (Library/FortressLibrary.fss:4459, :4469, :4479, :4489, :4499 twice, :4511 twice, :4521 twice, :4531 twice, :4541 twice, :4551 three times), under the 2008 comment \"Shouldn't these operators have to extend something? A,B,C?\" (:4448). The repair, way 1b: A, B and C extends StandardPartialOrder[\\A\\] (and [\\B\\], [\\C\\]) on the ten operators in the api (Library/FortressLibrary.fsi:2625-2629, :2631-2635) and the component (:4456, :4466, :4476, :4486, :4496, :4508, :4518, :4528, :4538, :4548); the two = operators stay unbounded (.fsi :2624, :2630; .fss :4450, :4502). Comparison gains the lazy opr LEXICO(self, other:()->Comparison): Comparison, its default = Unordered beside :138, TotalComparison's = self beside :177 and EqualTo's = other() beside :211, with their api lines beside .fsi :104, :133, :164; without the two arms, a thunk typed ()->Comparison would reach the default on the compiled path and answer Unordered. Each of the eight typecases (:4459, :4469, :4479, :4489, :4511, :4521, :4531, :4541) gains Unordered => false, what RR64's own <, <=, > and >= answer for a value that is not a number (:439-442). The precedent lines: PCMP, bounded per element by the team in 2008 (Integral per element, 0948c2b1c) and typed ZZ32 per element by the revival (Library/RangeInternals.fss:99-121); the tuple reductions' bounds (.fsi:2011-2027); the strict and lazy arms at :176-177 and :211; the team's compiler prelude's LEXICO on Comparison (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704). The comment at :4448 is answered and may go.",
"- Row 582, 2 sites: LexicographicReduction's isLeftZero(_:Comparison) (Library/FortressLibrary.fss:123; api Library/FortressLibrary.fsi:93) becomes isLeftZero(_:TotalComparison); the Meet Rule pair the checker refuses (\"Invalid overloading of isLeftZero in trait LexicographicReduction\", the api's and the component's) goes, and with it the count's last error. Nothing calls isLeftZero.",
"- Row 667, no distance site: IntMap's objects EmptyIM, SingletonIM and NodeIM (Library/IntMap.fss:142, :259, :406) define no body for IntMap's abstract genComb (:125), which combine calls (:112), so combine stops walk: \"MethodClosure genComb[\\That,Result\\](...) ... has neither body nor def\". The repair writes genComb in each object in the library's own shape: Map's combine on its empty and node objects (Library/Map.fss:260, :421-436) and IntMap's own union and intersection on the same three objects (IntMap.fss:191-196, :236, :333-346); name the precedent line of each body. A body for genComb comes before row 665's abstract half (row 665's notes).",
"- Notes, not repairs: row 634's list half (LexicographicOrder's fn(a:E,b:E) => a CMP b at :1932, the where-clause line); row 558, closed, whose fix is why the unordered pair stops with a MatchFailure today (no note: ledger.py writes no closed row); row 488 (BIG LEXICO(g) at :130, a site that varies from run to run: a point if it moves); row 665 and row 668 (not yours); row 577.",
"",
"**Distance sites.** Under Q43 row 634's 17; row 582's 2: 19, all in component FortressLibrary and its api. Row 667 none. The count 1 to 0.",
"",
"**Files.**",
"- Library/FortressLibrary.fss: LexicographicReduction's isLeftZero (:123); Comparison, TotalComparison and EqualTo's LEXICO lines (:138, :177, :211); the tuple operators (:4448-4553).",
"- Library/FortressLibrary.fsi: isLeftZero (:93); the LEXICO lines (:104, :133, :164); the tuple operators (:2624-2635).",
"- Library/IntMap.fss (EmptyIM, SingletonIM, NodeIM; :142-663).",
"- ProjectFortress/tests/: the pins LibraryMeetDeclarations.fss:33 and NumberOrderListDeclarations.fss:41 changed; new files named by topic.",
"- Not: LexicographicOrder (:1927-1937, .fsi:1333-1339), List, PureList, the = operators on tuples, Generator and the generators (G's), the array family (V's), the checker, walk, the specification, the team's tests.",
"",
"**Tests, first.**",
"- The count and distance stages are the failing-then-passing test of the 19 sites, before from batch 12's landed tables, after once on your tree, read by row and line: the 19 gone, no site come; the count's table at 0.",
"- Row 582: the pin at LibraryMeetDeclarations.fss:33 (isLeftZero(LessThan) is false today) changed to true, with GreaterThan true and EqualTo false beside it, failing on the base; its before and after listed for you.",
"- Under Q43: TupleOrderBounds.fss (or a name of yours by topic), red on the base at its unordered line: (1,2) < (1,3), (1,2,3) CMP (1,2,2), (1.5, 2) < (2.5, 1), a pair of strings, a pair of lists, a triple under <= and >=, (1, 0.0/0.0) CMP (2, 0.0/0.0) is LessThan, and (0.0/0.0, 1) < (1.0, 1) is false, each asserted. TupleOrderNestedRefused.fss with its .test, load_exception_contains=Cannot unify, the top-level binding nested: Boolean = ((1,2),3) < ((1,3),0): red on the base (it runs today), passing after. The line NumberOrderListDeclarations.fss:41 goes, its before and after listed.",
"- Row 667: a walk test of combine over one-entry and many-entry IntMaps, stopping on the base, its values asserted after.",
"- Keep their verdicts: NumberOrderListDeclarations (but :41), ResultBoundsRungB, RangeKindBodies, LibraryMeetDeclarations (but :33), the team's IntMap, range and list tests.",
"- After the edit: the interpreter suite once, since walk reads the library.",
"",
"**Specification.** None. The text is silent on tuple comparisons (Specification/basic/operators/opr-overview.tex:276-295) and on isLeftZero and genComb, and nothing it says is made false; Part IV renders the api lines when the PDF is rebuilt.",
"",
"**Overlaps by file.**",
"- N, V and G edit Library/FortressLibrary.fss and .fsi in other declarations: N two local parameters in Array2 and Array3, V the array family and the scalar block, G Generator, Indexed's default pairs, a new object and cond. No declaration is two rungs'.",
"- Library/IntMap.fss: O alone.",
"- ProjectFortress/tests/: N, V, G and W add distinct files; O alone changes the two pins.",
].join('\n')

const G_SECTION = [
"**The answers this rung follows.** Item 45 is not answered: this rung builds it at the default of explorations/reviews/generator-size-judgement.md, ways 1, 3 and 6, taken on the curator's standing go and listed for his review (section 2, Q45), and every line marked \"under Q45\" applies. The one new api declaration, Generator's opr |self|, is an extension the curator judges, shown its precedent line, Generator's own opr IN (process-engineering/library-extension-rule-archaeology.md section 5, point 4); the new object beside SimpleMappedIndexed is not in the api. No value walk prints today changes, by reading; what changes is where walk stopped. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Under Q45, row 629, 9 sites in three shapes. Shape A, |x| on a Generator, 5: DelegatedIndexed's |self| = |self.indices| (Library/FortressLibrary.fss:1961), PairGenerator's |self.e| |self.f| (:3720, two errors), NaiveSeqGenerator's size and |self| from |g| (:3798, :3800); \"Could not check call to operator |_| ... is not applicable to an argument of type Generator[\\I\\]\". Way 1: Generator gains opr |self| : ZZ32, declared in the api after opr IN (Library/FortressLibrary.fsi, Generator, :731-829) with a default in the component that counts by mapReduce over generate, self.mapReduce[\\ZZ32\\](fn (_:E):ZZ32 => 1, fn (a:ZZ32, b:ZZ32):ZZ32 => a + b, 0) (Generator, :1141-1239, beside opr IN at :1238), mapReduce rather than SUM so that the body does not meet row 425; the api comment says what opr IN's says, a naive O(n) default that sized types override. The five bodies stay as written.",
"- Under Q45, shape B, 3 sites and one hidden: RelationalPredicateCondition.cond reads x.size twice and then x[i], x[i+1] on x = target(), a Generator[\\E\\] (:4651-4661; the sites :4654 twice and :4657; the index at :4658 hidden). Way 3: cond becomes one generate with a MapReduceReduction whose element is (Boolean, Maybe[\\E\\], Maybe[\\E\\]), in the shape of Library/Generator2.fss:207-229 (efficientImplRelationalDistributiveImpl, whose join carries (R, R, Maybe[\\E\\], Maybe[\\E\\])), takeleft and takeright written in place since they are Generator2's; relation(), target() and the api unchanged.",
"- Under Q45, shape C, 1 site: Indexed's default indexValuePairs maps self.indices, a Generator, so it answers a Generator where Indexed[\\(I,E),I\\] is declared (:1847-1848). Way 6: one object beside SimpleMappedIndexed (:3600), for example SimpleIndexValuePairs[\\E,I\\](g: Indexed[\\E,I\\]) extends Indexed[\\(I,E),I\\], with generate over g.indices, opr[i] = (i, g[i]), opr[r] = SimpleIndexValuePairs(g[r]), bounds, indices and |self| from g, and a seq over seq(g.indices); the default at :1847-1848 answers it.",
"- Notes, not repairs: row 425 (why mapReduce and not SUM); row 577; the five families that declare indexValuePairs as Generator where the api says Indexed (List, PureList, Sparse, the rank-2 and rank-3 ranges), which draw no row today: a point if one moves.",
"",
"**Distance sites.** Under Q45, row 629's 9, all in component FortressLibrary; no index site surfaces at :4658. Row 629 closes.",
"",
"**Files.**",
"- Library/FortressLibrary.fss: Generator (:1141-1239, one declaration with its comment); Indexed's default indexValuePairs (:1847-1848); one new object beside SimpleMappedIndexed (:3600); cond (:4651-4661).",
"- Library/FortressLibrary.fsi: Generator (:731-829). If the checker refuses Indexed's abstract opr |self| (.fsi:1283) under the new concrete inherited one, that api line drops abstract; its body = self.size (.fss:1864) stays.",
"- ProjectFortress/tests/: three new tests, named by topic.",
"- Not: the checker, walk's Java, Specification/, Library/RangeInternals.*, Library/Generator2.*, List, Set, PureList, Sparse, the team's test lines, Indexed's and DelegatedIndexed's api comments (.fsi:1240-1243, :1343-1349), which stay true; the orders (O's), the array family (V's).",
"",
"**Tests, first.**",
"- GeneratorSize.fss (walk): |g| of a filtered range, a nested generator, a mapped generator, a cross of two ranges (the product, by PairGenerator's own body), a naive seq of a filter, and a type that extends DelegatedIndexed and defines only indices (the shape of ProjectFortress/tests/spuriousSelf.fss:44-52), each asserted; every case stops walk on the base and passes after. Beside them, |x| of a list, a range, a string and an array, passing before and after: the type's own size is chosen.",
"- RelationalPredicateTargets.fss (walk): the relational predicate applied to a list, a range, an array slice, an array with a nonzero lower bound, a filtered generator, an empty generator and a one-element generator, each cond value asserted through if; the shifted array and the filter fail on the base. The tests that reach cond keep their verdicts.",
"- IndexValuePairsDefault.fss (walk): the pairs of a string, a DefaultZip and a CaseInsensitiveString: elements in order, |pairs|, pairs[i], pairs[r], and ivmap through them, asserted, passing before and after; shape C's failing-then-passing test is the distance stage.",
"- The count and distance stages once on your final tree, before from batch 12's landed tables, read by row and line: the 9 gone, no new |_| site, none at Indexed's api line.",
"- Keep their verdicts: IndicesGetterCalls, PrefixSetIndices, RangeDeclarations, GeneratorDeclarations, spuriousSelf, MapTest, HeapTest, Region, the team's generator tests.",
"- After the edit: the interpreter suite once, since walk reads the library; if walk's load check asks for a meet for the new |self|, the suite names the type, and an excludes clause in the library's shape is the answer, a point to report.",
"",
"**Specification.** None. \"An instance of Generator[\\E\\] only needs to define the generate method\" (Specification/advanced/parallelism-locality/defining-generators.tex:22-25) stays true with a default; Part IV renders the new api line when the PDF is rebuilt.",
"",
"**Overlaps by file.**",
"- N, V and O edit Library/FortressLibrary.fss and .fsi in other declarations (N two local parameters in Array2 and Array3, V the array family and the block, O the comparisons, isLeftZero and the tuples). No declaration is two rungs'.",
"- ProjectFortress/tests/: N, V, O and W add distinct files.",
].join('\n')

const W_SECTION = [
"**The answers this rung follows.** Q2 of batch 12's rung W asked whether an override whose parameter types equal those of an inherited declaration overrides it; its entry under \"Climb batch 12, listed for his review\" held the landed reading, (a), as the default. The top-tier check explorations/reviews/walk-load-readings-check.md (section 3) found that the landed reading departs from the traits chapter's letter, \"a strict subtype\" (Specification/basic/traits.tex:585-595), with nothing later to outweigh it, and that no program in the tree writes such an override; the curator was told at 15:29 UTC on 2026-10-09 with the strict default. This rung builds it at that default on his standing go, listed for his review (section 2, QW2). Q1 of the same rung, PLAN item 51, is not answered: walk's allowance for a body at narrower parameter types stays as landed (row 666), and rows 668 and 669 wait with it. Row 665 is the next walk rung's by PLAN's line for it: its override half is this rung's; its abstract half waits, since checking each generic instance for a body would refuse IntMap's objects (row 667, rung O's in this batch) and SeededRandomGenWithDistribution (row 668, under item 51). The two tests batch 12's merged-diff review owes go into any rung that writes ProjectFortress/tests/, and this is the walk rung. Rows 614 and 615 stand as landed. Where this section says \"you\" or \"your\", it means the curator.",
"",
"**Rows.**",
"- Row 653's walk half, sharpened: Constructor.checkOverrides (interpreter/evaluator/values/Constructor.java:555-576) refuses an own override that overriddenBy (:615-634) relates to none of the inherited declarations; overriddenBy asks that each parameter type of the inherited declaration be a subtype of the override's, equality included, so object B extends A with override f(x: ZZ32) over A's f(x: ZZ32) loads. The chapter: such a declaration overrides nothing, since an equal parameter type hides by the inheritance rule's second clause (traits.tex:521-527) and is not a strict subtype (:589), and it is a static error (:594-595). The repair is in checkOverrides alone: the strict relation, each parameter type a subtype and not all equal; providedByTrait (:528-530) and OverloadedFunction's FunctionalMethodMeets.inherited (interpreter/evaluator/values/OverloadedFunction.java:1211-1233) stay as they are, since there the equal clause and the override clause rightly act together. Row 653 stays open for its compiled half (row 650).",
"- Row 665's override half: walk checks an override only for an object without static parameters (Constructor.finishInitializing, :261-267, the check under if (declared)) and a trait without static parameters (interpreter/evaluator/BuildEnvironments.java:869-876, forTraitDecl3, ft instanceof FTypeTrait); a generic object, an object expression in a generic function and a generic trait with an override that overrides nothing load and run. Extend the override check to them; say whether you check the generic declaration or each instance, and why, and report the cost on the one library's load. The library writes no override (a grep of Library/ and ProjectFortress/LibraryBuiltin/), so the check refuses nothing of it by reading. The abstract half (XXXAbstractMethodUndefinedGenericWalk, XXXAbstractMethodUndefinedGenericObjectExpressionWalk) keeps its verdict; the row stays open for it.",
"- The revival-covering callout: Specification/basic/functions.tex:441-443 says \"The compiled type checker checks, at each object declaration, that the object's concrete methods cover the abstract methods it inherits, reading no comprises clause\", and the Effect of the Appendix I entry \"Traits with comprises clauses read at the level of values\" says the same (Specification/appendices/changes.tex:2604-2606). Both are false: the checker's coverage check reads comprises clauses since the team's 59fdeff62 (2012-06-06; scala_src/types/TypeAnalyzer.scala:154-158; scala_src/typechecker/AbstractMethodChecker.scala:81-122), and batch 12's rung W measured it (compile-ladder/rung-walk-load-checks/REPORT.md, CoverAbstractProbe). Correct both sentences in the S1 form. The revision of traits.tex:570-572 to the team's coverage rule waits with item 51.",
"- review-routed.1, no row: under walk a program's own reduction without static parameters that extends AssociativeReduction and declares simpleJoin only at Any, or with untyped parameters, is refused at load, \"Object ... does not define an abstract method declared in type AssociativeReduction\" (Library/FortressLibrary.fss, AssociativeReduction's abstract simpleJoin; Constructor.java:423-453, checkForDef), stated by FACTS and the skill with no gated test. Write the test: such a program with a .test keyed load_exception_contains=does not define an abstract method declared in type AssociativeReduction, passing on the base and after.",
"- review-routed.2, no row: the one library's Pairs loads under walk only through row 666's allowance, SingleRange defining RunRanges's abstract BOXPLUS only at the two types of its comprises clause (Library/Pairs.fss:78-87); no gated test imports Pairs. Write a walk test that imports Pairs and asserts a value of runRanges (Pairs.fss:72-73), which reaches SingleRange's BOXPLUS, passing on the base and after; if no call of it runs today, one that only loads Pairs.",
"- Notes, not repairs: row 666 (item 51, as landed); row 668 and row 669 (item 51); row 667 (rung O's); row 650 (the compiled half of row 653); row 614 and row 615 (as landed); row 670 (the demos refused at load since batch 12; no demo is edited).",
"",
"**Distance sites.** None. The count and distance stages read no walk code they could move (FACTS, \"The checker-count and distance stages read only the compiler's phases, so an edit to the test corpora, the texts or walk's evaluator and natives cannot move them\"); the script's list of paths no stage reads names interpreter/evaluator/, where your edits are, and Specification/.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java (checkOverrides, :555-576; finishInitializing's override check, :261-267).",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java (forTraitDecl3 and declaresOverride, :869-884).",
"- Specification/basic/functions.tex (:435-444) and Specification/appendices/changes.tex (the entry \"Traits with comprises clauses read at the level of values\", :2549-2643, its Effect at :2604-2606).",
"- New and promoted files in ProjectFortress/tests/.",
"- Not: overriddenBy's other callers, providedByTrait, FunctionalMethodMeets, checkForDef and definedBelow (row 666's allowance); BuildEnvironments' finishTrait, processWhereClauses and checkComprisesClauses (N's); the library; the checker; the test harness; the demos.",
"",
"**Tests, first.**",
"- OverrideEqualTypesWalk.fss and its .test keyed load_exception_contains=does not override any inherited declaration: trait A with f(x: ZZ32): String = \"A\", object B extends A with override f(x: ZZ32): String = \"B\". It loads on the base, so it is red there; it passes after.",
"- Row 665's override half: XXXOverrideNothingGenericWalk and XXXOverrideNothingGenericTraitWalk promoted, each with its refusal at load named; an object expression in a generic function beside them, refused alike.",
"- review-routed.1 and .2: the two tests above, passing on the base and after.",
"- Keep their verdicts: OverrideNothingWalk, OverrideNothingInTraitWalk, OverrideInTraitWalk, AbstractOverrideUndefinedWalk, FunctionalMethodOverrideOtherPathWalk (row 615's pin), the team's disp0.fss, disp1.fss and FunctionalMethodMeetProvided.fss, which widen with override; XXXAbstractMethodPartlyDefinedWalk (row 666), XXXAbstractMethodUndefinedGenericWalk and XXXAbstractMethodUndefinedGenericObjectExpressionWalk (row 665's abstract half); the team's XXXUnimplementedMethod.fss.",
"- After the edit: the interpreter suite once (ant testSystem), since every load check reads every component walk loads.",
"",
"**Specification.** The two sentences of the revival-covering callout and its entry's Effect, corrected in the S1 form: the compiled checker reads comprises clauses in its coverage check. No other passage: the traits chapter already makes an equal-typed override a static error, and row 665's override half is a defect against its text.",
"",
"**Overlaps by file.**",
"- N edits BuildEnvironments.java too, in finishTrait, processWhereClauses and the comprises check; W only forTraitDecl3 and declaresOverride. No other rung edits Constructor.java.",
"- Specification/appendices/changes.tex: N and V amend or add other entries; Specification/basic/functions.tex is W's alone.",
"- ProjectFortress/tests/: N, V, O and G add distinct files.",
].join('\n')

const N_ENTRY = { id: 'N', slug: 'rung-size-expressions', path: '/home/user/fortress-sizes', branch: 'wip/rung-size-expressions', expectedMinutes: 150,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The checker's sizes: arithmetic in a size (item 15, 15a with its part b) and a size known only at run time (item 13's fork 3, way 4a)",
    blurb: "under item 15 (15a with b) the compiled checker accepts arithmetic in a size, compares sizes by their written form once numerals are folded and lets a size name equal a numeral, and the class loader computes a folded size; then, under Q13.3 (fork 3, default way 4a), the team's commented NatParam comprises clause is restored, the checker opens a NatParam argument as that value's own size for the call, walk's loader reads the where binding, and Array2's and Array3's untyped row parameters are typed; the identity sentence, the comprises proviso and the size chapter revised in the S1 form; 23 sites and 4 hidden, row 664.",
    section: N_SECTION,
    pointsToReport: [
      "A compiled test whose verdict changes other than by the rung's intent, or a ladder file that moves.",
      "A program the text allows that the checker now refuses, or one it refuses that the checker now accepts, outside sizes.",
      "Every site the unhidden Array2 and Array3 traits bring, by row and line, and every site gone beyond the 23 and the 4.",
      "The class loader's computed size: what it changes in a class name or a stamped descriptor, and any compiled test that moves with it.",
      "A walk value that changes, or a library type walk now refuses at load, with the clause's load check.",
      "A size opened twice in one call, or an opened size reaching a declared type, met in the library or the tests.",
      "Normative text changed beyond the identity sentence, the comprises proviso, the size chapter's sentence and their Appendix I entries.",
      "A library edit beyond NatReflect's clause and the typed row parameters, or a team test line changed.",
    ],
    briefing: [
      "positions:Arithmetic in a size", "positions:The specification stays the standard", "positions:The library's own practice is the standard",
      "positions:The run-time size design is B", "positions:The array design's three questions are open",
      "positions:Which decisions taken inside the work reach", "positions:Every change to the specification is recorded with its reason",
      "positions:The S1 form", "positions:The checker count is measured, never red", "ledger:664", "ledger:307", "ledger:25", "ledger:636",
      "doc:explorations/reviews/array-forks-now.md#Q15. Item 15", "doc:explorations/reviews/array-fork3-judgement.md#2.9 The ways, judged",
      "doc:explorations/reviews/array-fork3-judgement.md#4. What it changes and what it costs",
      "doc:explorations/reviews/array-fork3-judgement.md#5. How a batch 13 rung builds it, beside item 15's",
      "doc:explorations/reviews/array-fork3-judgement.md#6. Decisions and points for the curator", "The specification allows arithmetic in a size",
      "A size beyond NN32 or ZZ32 is refused on both paths", "A size is carried at run time as a descriptor from RTTIsize.of",
      "doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters", "doc:Specification/basic/trait-parameters.tex#Where Clauses",
      "doc:Specification/appendices/internal-document.tex#Overloaded operators",
      "doc:Specification/appendices/changes.tex#The traits that extend a closed trait",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala#private def walkStaticArgs(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala#def nEq(a: IntExpr, b: IntExpr)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def pEqv(x: IntExpr, y: IntExpr)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala#case SWhereClause(info, bindings, _)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#def checkDeclComprises(",
      "code:ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java#public Triple<String,String,Integer> forIntBinaryOp(IntBinaryOp b)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java#private static EvalType processWhereClauses(",
      "code:ProjectFortress/LibraryBuiltin/NatReflect.fss#trait NatParam"],
    reasons: [
      "Item 15 answered, 15a with (b): sizes compared by written form once numerals are folded, folded values range-checked, a size name possibly equal to a numeral, the loader computing the value; your first half.",
      "The text allows arithmetic in a size and fixes its value once the names are known; the checker accepts what the text allows, and the identity sentence it never finished is revised.",
      "The team wrote a product in the storage fields and sums in result types, and the NatParam clause beside reflect: your rung accepts their text and changes none of it.",
      "A size at run time is the descriptor RTTIsize.of makes; the loader's computed size is one such descriptor, and an opened size is the one already on the N value.",
      "What your rung leaves alone: the array design's other questions; fork 3 is built here at its judgement's default on the standing go, listed for the curator.",
      "Fork 3 is built at its default and listed for the curator; the reading of his Sizes entry and the widened comprises sentence are named in your report.",
      "Why the identity sentence, the comprises proviso and the size chapter change: Appendix I entries with the reason, the original text and route C.",
      "The form of your text changes: each passage revised in place with a callout, each entry with its reason.",
      "The count and the distance are reported and never red; you run them once on your final tree, against batch 12's landed tables.",
      "Under Q13.3: the rank-1 subarrays pass reflect's NatParam where N[n] is declared; two of fork 3's ten sites; the row closes with your rule.",
      "Item 15 clears its arithmetic half and XXXNatArithChecker; NatReflectTest compiled still stops, and fork 3's compiled half waits for the switch-over: a note.",
      "The reflect idiom, the sanctioned escape: it stands, now accepted by the checker; a note.",
      "The same where-bound listed instantiation for a type, List's commented clause: not yours.",
      "Item 15 in the nine-step form: the 13 sites, the ways, the team's Q&A that a name may equal a numeral, the loader's half and XXXNatArithChecker.",
      "Fork 3's ways, 4a the team's clause and rule, and what each clears; the one you build is 4a.",
      "Fork 3's edit, file by file: the clause, KindEnv, TypeAnalyzer's opening case, the hierarchy check, walk's loader, the two sentences and the entry.",
      "Fork 3's tests first, the sites it clears, the hidden calls, and why the clause must not land before part (b).",
      "The two readings fork 3 makes, which your report names for the curator.",
      "What the text says of size expressions and what it never said: when two are the same type.",
      "The range check every folded size passes through, on both paths.",
      "How a size reaches the compiled run, where the loader computes a folded size.",
      "The size chapter: under Q13.3 it gains one sentence stating the opening of a NatParam at a call.",
      "The where-clause variable, the device the team's clause uses for n; bound in a where clause, not a static parameter.",
      "The team's Q&A: n+1 beside 0 not allowed, 1 beside 0 allowed; a size name is not known to differ from a numeral, part (b).",
      "The revival's entry on listed types, whose proviso at traits.tex:238-240 fork 3 widens to a where-clause variable; you amend it under Q13.3.",
      "One of the three uses of hasSizeArithmetic, the refusal by name, beside the range check you keep.",
      "Size equality today: a size with arithmetic in it equals nothing; 15a compares written forms once numerals are folded.",
      "A symbol is not any literal: why the N[0] arms are unreachable; part (b) makes a name possibly equal to a numeral.",
      "Under Q13.3: a non-type where binding is not yet implemented here; your rung takes a nat binding.",
      "Under Q13.3: the comprises check that must accept N[nat n] extends NatParam against the listed N[n].",
      "The compiled path spells a size expression out today; 15a has the loader compute the value instead.",
      "Under Q13.3: walk reads a trait's where clause for constraints only; it must bind the where-bound size so the clause loads.",
      "Under Q13.3: the team's clause as a comment since 2007, with reflect's comment on what it means.",
    ],
    checks: [
      "positions:Arithmetic in a size", "positions:The specification stays the standard", "positions:Which decisions taken inside the work reach",
      "positions:The S1 form", "ledger:664", "ledger:307", "doc:explorations/reviews/array-forks-now.md#Q15. Item 15",
      "doc:explorations/reviews/array-fork3-judgement.md#5. How a batch 13 rung builds it, beside item 15's",
      "doc:Specification/appendices/changes.tex#The traits that extend a closed trait",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def pEqv(x: IntExpr, y: IntExpr)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#def checkDeclComprises("] }

const V_ENTRY = { id: 'V', slug: 'rung-array-bound', path: '/home/user/fortress-arraybound', branch: 'wip/rung-array-bound', expectedMinutes: 110,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The checker's bound lists (a crash) and a tight juxtaposition (row 660), then the arrays' bound (item 13's fork 2) and matrix(v) (row 437)",
    blurb: "the compiled checker stops crashing on a bound list that names a closed trait (the team's boundsSubstitution, test first) and gives a tight juxtaposition of non-functions its expected type (row 660, its Appendix I sentence amended); then, under Q13.2 (fork 2, the judgement's default), Vector, Matrix and their family take T extends { Number, MultiplicativeRing[T] }, the scalar block a bound per operator, and matrix(v) writes v.zero (row 437): 24 sites, 1 come; Scala under scala_src/types/ and scala_src/typechecker/impls/, and library bounds.",
    section: V_SECTION,
    pointsToReport: [
      "A compiled test whose verdict changes other than by the rung's intent, or a ladder file that moves.",
      "The norm's call at FortressLibrary.fss:2483 still refused after the fix, with its trace.",
      "A #crash stage row in the distance, or a site that comes beyond scale's at :2399.",
      "The stage's FortressLibrary time against 739 s.",
      "A value walk prints that changes, matrix(v) for NN32 and NN64 among them, each with its before and after.",
      "A change in which declaration an operator application or a call chooses once a tight juxtaposition gets its expected type.",
      "An array declaration edited beyond the family's bound lines, matrix(v) and the scalar block.",
      "A checker file of rung N's edited, or a walk edit.",
    ],
    briefing: [
      "positions:The integration review's checks", "positions:The exclusion rule stays and the tower is flat",
      "positions:The array design's three questions are open", "positions:The library's own practice is the standard",
      "positions:Which decisions taken inside the work reach", "positions:The checker count is measured, never red", "ledger:660", "ledger:437",
      "ledger:591", "ledger:455", "doc:explorations/reviews/array-fork2-judgement.md#2.2 What each path does today",
      "doc:explorations/reviews/array-fork2-judgement.md#3. The measurement",
      "doc:explorations/reviews/array-fork2-judgement.md#4. The recommendation, the default, what it changes and costs",
      "doc:explorations/reviews/array-fork2-judgement.md#5. A batch 13 rung: files, tests first, sites it clears, what it leaves",
      "doc:explorations/reviews/array-fork2-judgement.md#6. What it reverses or bends of his positions",
      "Route A's generic container obligations still need body-level checks", "The one library's numeral type is the compiler library's IntLiteral",
      "The compiled checker gives a call its expected type", "doc:Specification/basic/inference.tex#The Static Arguments of a Call",
      "doc:Specification/appendices/changes.tex#The contexts that give a call an expected type",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala#protected def boundsSubstitution(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case mp@SMathPrimary(info@SExprInfo(span,paren,optType),",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)",
      "code:Library/FortressLibrary.fss#trait Vector[", "code:Library/FortressLibrary.fss#trait Matrix[",
      "code:Library/FortressLibrary.fss#fn (e: T): T => e + y)..fn (e: T): T => y MAX e)", "code:Library/FortressLibrary.fss#(v:T):Matrix[",
      "code:Library/FortressLibrary.fss#object MaxSumReductionPair"],
    reasons: [
      "The curator's check for the array work, no blanket ring bound that would exclude integer arrays: under Q13.2 its letter bends on Vector and Matrix and its reason holds; listed for him.",
      "Route A moved the arithmetic from Number to each number type at its own type: the obligation fork 2 meets on the arrays.",
      "What your rung leaves alone: the array design's other questions, and every array site outside the family's bound, matrix(v) and the scalar block.",
      "The two-trait bound is the library's own form (MaxSumReductionPair), and v.zero the algebra's own zero: name each precedent line.",
      "Fork 2 is built at its default and listed; the bent letter is named in your report.",
      "The count and the distance are reported and never red; they are half two's test, before from batch 12's landed tables.",
      "Your second checker repair: a tight juxtaposition of non-functions gets no expected type; give it, as the loose one and the repeated operator do; promote XXXInferTightJuxtContext.",
      "Under Q13.2: matrix(v)'s numeral 0 becomes v.zero, which the ring bound gives T; walk's matrix(v) for NN32 and NN64 then runs.",
      "A two-bound parameter that no call fixes stays at Bottom under walk; the arrays' calls all fix T: a note.",
      "Q48's part (b), the argument faces beside row 660, is not answered: not yours; XXXInferContextDrops keeps its verdict.",
      "The crash read in the code: boundsSubstitution casts the meet's conjuncts, which a closed trait makes a union; and why the two factory sites are a checker slip.",
      "The two-trait bound measured on a library copy: 23 gone, :2399 come, the factories unchanged, three stage crashes, walk's seven array tests the same.",
      "The default you build: the family's bound, the block's bound per operator, what it changes and what it does not.",
      "Your rung in two halves, the checker's fix first, its tests first, and what it leaves with its homes.",
      "What the default bends, which your report names for the curator.",
      "The fact the fork comes from: the generic Vector and Matrix bodies have no arithmetic under T extends Number.",
      "Why a Vector of bare numerals is refused by the ring bound: IntLiteral is a Number and not a ring.",
      "What rungs E and C built for the expected type; row 660 is the tight juxtaposition they left.",
      "The chapter gives a call written by tight juxtaposition the expected type: row 660 is the checker's gap.",
      "Its sentence at changes.tex:2077-2081 says the checker gives a tight juxtaposition none (row 660); your repair makes it false: amend it in the S1 form.",
      "The crash's site, the team's TODO: FIX THIS FOR OPS; the cast at :474-477.",
      "Row 660's site: the multifix try and the left-associated fallback without the expected type.",
      "The loose juxtaposition, the model for row 660's repair.",
      "Vector's bodies, arithmetic on T under T extends Number: the sites the bound clears.",
      "Matrix's bodies, mul's products and accumulation, rmul and lmul: the rest of the arithmetic sites.",
      "The scalar block, eight operators: a bound per operator, AdditiveGroup, StandardMin, StandardMax.",
      "matrix(v), row 437's numeral 0.",
      "The precedent: the library's two-trait bound on a type parameter.",
    ],
    checks: [
      "positions:The integration review's checks", "positions:The exclusion rule stays and the tower is flat",
      "positions:The library's own practice is the standard", "positions:Which decisions taken inside the work reach", "ledger:660", "ledger:437",
      "doc:explorations/reviews/array-fork2-judgement.md#4. The recommendation, the default, what it changes and costs",
      "doc:explorations/reviews/array-fork2-judgement.md#5. A batch 13 rung: files, tests first, sites it clears, what it leaves",
      "doc:Specification/appendices/changes.tex#The contexts that give a call an expected type",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala#protected def boundsSubstitution(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case mp@SMathPrimary(info@SExprInfo(span,paren,optType),"] }

const O_ENTRY = { id: 'O', slug: 'rung-tuple-orders', path: '/home/user/fortress-orders', branch: 'wip/rung-tuple-orders', expectedMinutes: 90,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [], expectedCheckerCount: 0,
    title: "The library's orders: the tuple comparisons (row 634, item 43, way 1b), isLeftZero over TotalComparison (row 582) and IntMap's genComb (row 667)",
    blurb: "under Q43 (item 43, way 1b) each element of a tuple comparison is bounded by StandardPartialOrder, Comparison gains the lazy LEXICO with its two arms and each typecase an Unordered clause (row 634, 17 sites, one walk pin replaced by a refusal); under the curator's decision on row 582, LexicographicReduction's isLeftZero takes TotalComparison (2 sites, the count to 0); and IntMap's objects get the genComb body they lack (row 667); library declarations only.",
    section: O_SECTION,
    pointsToReport: [
      "A value walk prints that changes, each with its before and after: the nested pair now refused, the unordered pair's MatchFailure now false, isLeftZero's three answers, and any other.",
      "A new api declaration beyond the three LEXICO lines, or a team declaration removed.",
      "Walk's load check of the three LEXICO arms, and the overloading stage's answer to them.",
      "A site that comes behind the 17, or row 488's site at :130 moving.",
      "A library caller or a suite test that compares a pair of pairs or a pair with an unordered element.",
      "Each genComb body's precedent line, and a change to which declaration walk runs for an IntMap.",
      "A team test line changed.",
      "A checker or walk edit, or a site whose only repair is one.",
    ],
    briefing: [
      "positions:LexicographicReduction.isLeftZero takes TotalComparison", "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:The implicit bound of an unbounded type parameter is Any", "positions:Which decisions taken inside the work reach",
      "positions:The checker count is measured, never red", "ledger:634", "ledger:582", "ledger:667", "ledger:558", "ledger:488",
      "doc:explorations/reviews/tuple-comparisons-judgement.md#3. The recommendation, and what it changes",
      "doc:explorations/reviews/tuple-comparisons-judgement.md#4. The walk values that change",
      "doc:explorations/reviews/tuple-comparisons-judgement.md#6. How a library rung of batch 14 builds it",
      "code:Library/FortressLibrary.fss#object LexicographicReduction", "code:Library/FortressLibrary.fss#trait ReductionWithZeroes",
      "code:Library/FortressLibrary.fss#trait Comparison",
      "code:Library/FortressLibrary.fss#Shouldn't these operators have to extend something..(a1 CMP a2) LEXICO: (b1 CMP b2) LEXICO: (c1 CMP c2)",
      "code:Library/RangeInternals.fsi#opr SCMP(a: ZZ32, b: ZZ32): Comparison..opr PCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr LEXICO(self, other:()->Comparison): Comparison",
      "code:Library/IntMap.fss#private genComb[", "code:Library/Map.fss#if that.isEmpty then mapThis(self)"],
    reasons: [
      "Row 582 decided: isLeftZero over TotalComparison, so the team's answers are reached; the pin at LibraryMeetDeclarations.fss:33 changes; the count goes to 0.",
      "Each repair in the library's own spelling: the per-element bound PCMP took in 2008, the lazy LEXICO arms TotalComparison has, genComb in the shape of Map's combine.",
      "The library rule as the curator reads it: the lazy LEXICO on Comparison is an extension he judges, shown its precedent line; name it in your report.",
      "Why the containers stay at Any: lists of tuples and functions are written; only the tuple operators' own parameters take bounds.",
      "Item 43 is built at its default and listed: the one walk value that changes and the unordered pair's false are named in your report.",
      "The count and the distance are your rung's test, before from batch 12's landed tables; the count's table goes to 0.",
      "Under Q43, its tuple half: 17 sites; the list half, LexicographicOrder at :1932, waits for the where-clause line: a note.",
      "isLeftZero(_:Comparison) is shadowed by the inherited ReductionWithZeroes.isLeftZero at TotalComparison; two sites, the count's last error.",
      "IntMap's three objects define no genComb, which combine calls; write each body in the library's shape; a walk test failing on the base.",
      "A typecase with no matching clause throws MatchFailure: the unordered pair's stop today, which Unordered => false replaces.",
      "BIG LEXICO(g) at :130, a site that varies from run to run: a point if it moves beside your LEXICO arms.",
      "Way 1b for tuples: the ten headers, the lazy LEXICO and its two arms, the eight Unordered clauses, and why each.",
      "Each pin with its before and after: the nested pair refused, the rest unchanged, and the values not pinned.",
      "The rung's files, tests first and points, which your section takes over in this batch.",
      "Row 582's site, isLeftZero beside isLeftZero(_:EqualTo).",
      "The inherited isLeftZero(l:L) that shadows the team's today.",
      "Comparison's strict LEXICO, whose lazy sibling you add.",
      "The tuple operators under the 2008 comment: the 17 sites, the headers and the eight typecases you change.",
      "The precedent: the range tuples' comparison, bounded per element by the team.",
      "The team's compiler prelude declares the lazy LEXICO on Comparison: a precedent line for the extension.",
      "Row 667's abstract genComb, which combine calls and no object defines.",
      "Map's combine on its node object, splitting the other map at the key: the shape genComb's bodies follow.",
    ],
    checks: [
      "positions:LexicographicReduction.isLeftZero takes TotalComparison", "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:Which decisions taken inside the work reach", "ledger:634", "ledger:582", "ledger:667",
      "doc:explorations/reviews/tuple-comparisons-judgement.md#3. The recommendation, and what it changes",
      "doc:explorations/reviews/tuple-comparisons-judgement.md#4. The walk values that change",
      "code:Library/FortressLibrary.fss#object LexicographicReduction"] }

const G_ENTRY = { id: 'G', slug: 'rung-generator-size', path: '/home/user/fortress-gensize', branch: 'wip/rung-generator-size', expectedMinutes: 85,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [],
    title: "The library's generators: a generator's size and index (row 629, item 45, ways 1, 3 and 6)",
    blurb: "under Q45 (item 45, ways 1, 3 and 6) Generator gains opr |self| with a default that counts by running the generator, the relational predicate's cond becomes one reduction carrying each part's first and last element, and Indexed's default index-value pairs become a small object beside SimpleMappedIndexed (row 629, 9 sites); library declarations only.",
    section: G_SECTION,
    pointsToReport: [
      "A value walk prints that changes, and where walk now answers where it stopped (a filter's size, cond on an unsized target, the pairs' printed form), each with its before and after.",
      "Indexed's abstract opr |self| refused under the new concrete one, and the api line changed for it.",
      "A program walk refuses at load after the new declaration, and the meet or excludes clause added for it.",
      "A new api declaration beyond Generator's opr |self|, or a team declaration removed.",
      "A gated test whose pin names mapped(...) for a default pairs value.",
      "A family that declares indexValuePairs as Generator moving on the distance.",
      "A team test line changed.",
      "A checker or walk edit.",
    ],
    briefing: [
      "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:Which decisions taken inside the work reach", "positions:The checker count is measured, never red", "ledger:629", "ledger:425",
      "doc:explorations/reviews/generator-size-judgement.md#2.1 The nine sites come from three moments, none a design",
      "doc:explorations/reviews/generator-size-judgement.md#4. The recommendation: ways 1, 3 and 6",
      "doc:explorations/reviews/generator-size-judgement.md#5. The rung for batch 14",
      "The one library's generator, condition, reduction and generator-of-generators slips", "code:Library/FortressLibrary.fss#trait Generator[",
      "code:Library/FortressLibrary.fsi#trait Generator[", "code:Library/FortressLibrary.fss#trait RelationalPredicateCondition",
      "code:Library/FortressLibrary.fss#fn (i:I): (I,E) => (i,self[i])", "code:Library/FortressLibrary.fss#object SimpleMappedIndexed"],
    reasons: [
      "Each repair in the library's own way, family by family: a default counted by running, as opr IN is; one pass as Generator2's relational reduction is; a small object as map is.",
      "The library rule as the curator reads it: Generator's opr |self| is an extension he judges, shown its precedent line, opr IN; name it in your report.",
      "Item 45 is built at its default and listed: where walk now answers where it stopped is named in your report.",
      "The count and the distance are your rung's test, before from batch 12's landed tables.",
      "Under Q45: nine sites in three shapes, a size or index read from a Generator and the default pairs answering a Generator.",
      "The checker's rewriting of a reduction by its element type: why the default counts with mapReduce, not SUM.",
      "How the nine came about in the team's commits: the size moved off Generator, indices retyped, cond ill-typed from its first line.",
      "The default you build, what it changes under walk and what it costs.",
      "The rung's files, tests first and first measurements with their fallbacks, which your section takes over in this batch.",
      "What batch 10's rung G repaired in these families, and the sites it left, row 629's.",
      "Generator, where opr |self| gets its default beside opr IN.",
      "Generator's api, where the declaration and its comment go after opr IN.",
      "Shape B: cond reads a size and an index from a Generator.",
      "Shape C: the default pairs mapped over indices, a Generator.",
      "The sibling object beside which the pairs object goes, and the shape it follows.",
    ],
    checks: [
      "positions:The library's own practice is the standard",
      "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement",
      "positions:Which decisions taken inside the work reach", "ledger:629",
      "doc:explorations/reviews/generator-size-judgement.md#4. The recommendation: ways 1, 3 and 6",
      "doc:explorations/reviews/generator-size-judgement.md#5. The rung for batch 14", "code:Library/FortressLibrary.fss#trait Generator["] }

const W_ENTRY = { id: 'W', slug: 'rung-walk-override', path: '/home/user/fortress-walkoverride', branch: 'wip/rung-walk-override', expectedMinutes: 80,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "Walk: an override at equal parameter types refused (batch 12's rung W, Q2), the override check on generic types (row 665's override half), the revival-covering callout corrected, and two owed tests",
    blurb: "walk refuses at load an override whose parameter types equal the inherited declaration's, as the traits chapter's strict subtype says (batch 12's rung W, Q2, default strict), and checks an override that overrides nothing on generic objects, object expressions in generic functions and generic traits (row 665's override half); the revival-covering callout's sentence that the checker reads no comprises clause, false since 2012, is corrected with its Appendix I Effect; two tests batch 12's review owes (a reduction declaring simpleJoin at Any refused at load; Pairs loading); Java under interpreter/evaluator/.",
    section: W_SECTION,
    pointsToReport: [
      "An interpreter test whose verdict changes other than by the rung's intent: each with its before and after.",
      "A library type, a team test or a demo that walk now refuses at load, with the declaration and the check that refuses it.",
      "Whether the generic override check runs at the declaration or at each instance, with its cost on the one library's load.",
      "A change to which declaration walk runs for a set it loads today.",
      "Normative text changed beyond the two corrected sentences.",
      "A library, checker or test-harness edit, or a demo edited.",
    ],
    briefing: [
      "positions:The specification stays the standard", "positions:Which decisions taken inside the work reach",
      "positions:Every change to the specification is recorded with its reason", "positions:The S1 form", "ledger:653", "ledger:665", "ledger:666",
      "ledger:668", "ledger:650", "ledger:615",
      "doc:explorations/reviews/walk-load-readings-check.md#3. Q2: an override with equal parameter types overrides",
      "doc:explorations/reviews/walk-load-readings-check.md#4. Three gaps in the record", "doc:Specification/basic/traits.tex#Method Declarations",
      "doc:Specification/basic/functions.tex#Abstract Function Declarations",
      "doc:Specification/appendices/changes.tex#Traits with comprises clauses read at the level of values",
      "Walk refuses at load an object that leaves an inherited abstract method without a body",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static void checkOverrides(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static boolean overriddenBy(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#public void finishInitializing()",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java#private void forTraitDecl3(TraitDecl x)",
      "code:Library/Pairs.fss#trait RunRanges", "code:Library/FortressLibrary.fss#trait AssociativeReduction"],
    reasons: [
      "The text is the standard: an override at equal parameter types overrides nothing and is a static error by the traits chapter, and walk refuses it at load.",
      "Q2's strict reading is built at its default and listed for the curator; item 51's allowance stays as landed.",
      "Why the callout's sentence changes: it is false, and the Effect beside it in Appendix I with it.",
      "The form of your text change: the callout and the Effect revised in place.",
      "Your first check, sharpened: an override at equal parameter types overrides nothing; walk's half only, the row open for the checker's half.",
      "Your second check: the override check on generic objects, object expressions in generic functions and generic traits; its abstract half waits, so the row stays open.",
      "Walk's allowance for a body at narrower parameter types, item 51's question: not yours; keep it as landed.",
      "Why row 665's abstract half waits: checking each generic instance would refuse SeededRandomGenWithDistribution, under item 51.",
      "The code generator's override, not yours: row 653's compiled half waits on it.",
      "The landed reading of overridden that your check follows: what a type's own override declarations override.",
      "The check of Q2: the chapter's letter, its history, the implementations, the library and tests, the verdict and what replaces it.",
      "The callout's false sentence and why, with the other two gaps.",
      "The inheritance rule's equal clause, the override sentence's strict subtype, and the static error you make true for equal types.",
      "The revival-covering callout whose last sentence you correct.",
      "The entry whose Effect repeats the false sentence at changes.tex:2604-2606.",
      "What batch 12's rung W built, the allowance and the generic types it left unchecked.",
      "Your first site: the check that refuses an override overriding nothing, through overriddenBy.",
      "The non-strict relation, shared with providedByTrait, which stays as it is.",
      "Where the override check runs for a declared object only: row 665's site for objects.",
      "Where the override check runs for a trait without static parameters only: row 665's site for traits.",
      "review-routed.2's test: RunRanges and SingleRange's BOXPLUS, which runRanges reaches.",
      "review-routed.1's test: the abstract simpleJoin at R that a program's own reduction at Any leaves without a body.",
    ],
    checks: [
      "positions:The specification stays the standard", "positions:Which decisions taken inside the work reach", "ledger:653", "ledger:665", "ledger:666",
      "doc:explorations/reviews/walk-load-readings-check.md#3. Q2: an override with equal parameter types overrides",
      "doc:Specification/basic/traits.tex#Method Declarations",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static void checkOverrides("] }

const RUNGS = [N_ENTRY, V_ENTRY, O_ENTRY, G_ENTRY, W_ENTRY]
const BATCH_INTRO = "This run is climb batch 13, the record CLIMB-BATCH-13.md, phase 3's next batch after 12, toward the checker at a true zero: two checker rungs, two library rungs and one walk rung. The curator answered item 15 (15a with its part b) and decided row 582; the batch runs on his standing go for phase 3, so fork 3 (way 4a), fork 2 (the two-trait bound), item 43 (way 1b), item 45 (ways 1, 3 and 6) and rung W's strict override are built at their judgements' defaults and listed for his review. The distance stands at 153 and the count at 1 after batch 12 (compile-ladder/climb-batch-12/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another rung of the batch. N and V edit the checker in different files: N the size rules, the kind environment, the hierarchy check and the loader's size spelling, V the bound substitution and the tight juxtaposition. W edits walk's Constructor and one pass of BuildEnvironments; N edits other methods of BuildEnvironments. N, V, O and G edit Library/FortressLibrary.fss and .fsi in different declarations: N two local parameters in Array2 and Array3, V the array family's bounds, matrix(v) and the scalar block, O the comparisons, isLeftZero and the tuple operators, G Generator, Indexed's default pairs, one new object and the relational cond; N alone edits NatReflect, O alone IntMap. ProjectFortress/compiler_tests/ takes N's and V's distinct files, ProjectFortress/tests/ every rung's distinct files and O's two changed pins. N, V and W edit Specification/appendices/changes.tex in different entries; N also the types, traits and static-parameter chapters, W the functions chapter's callout. N, V, O and G all move sites of component FortressLibrary, and every rung reaches the interpreter suite; the gate measures and runs the merged tree. ant testSpecData runs in the gate because batch 12's landed summary has it."
// =========================== END MANIFEST ==================================

const BATCH_DIR = 'explorations/compile-ladder/climb-batch-' + BATCH
const GATE_DIR = BATCH_DIR + '/gate'
const SITES = 'explorations/compile-ladder/gate/distance-sites.tsv'   // the distance stage's per-site list, one path overwritten at each landing
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore ignores /tmp/
const GATE_OUT = LOG_DIR + '/out'   // the gate writes here; the commit stage copies it to GATE_DIR

// The scatter order: longest expected worker first. Manifest order is kept for the gather.
const SCATTER = RUNGS.slice().sort((a, b) => (b.expectedMinutes || 0) - (a.expectedMinutes || 0))

// ---------------------------------------------------------------------------
// The manifest, checked at load.
// ---------------------------------------------------------------------------

const LOOKUP_TOOL = TOOLS + '/facts-extract.sh'
const keyOk = (q) => typeof q === 'string' && q.trim() !== '' && !q.startsWith('-') && !/["\x60$\\\n]/.test(q)
RUNGS.forEach(r => {
  for (const field of ['id', 'slug', 'path', 'branch', 'section', 'blurb'])
    if (typeof r[field] !== 'string' || !r[field].trim()) throw new Error('rung ' + r.id + ': ' + field + ' is required')
  if (!/^\/[A-Za-z0-9._\/-]+$/.test(r.path) || r.branch !== 'wip/' + r.slug) throw new Error('rung ' + r.id + ': path must be an absolute path and branch wip/<slug>')
  for (const field of ['briefing', 'checks']) {
    if (r[field] === undefined) continue
    const bad = Array.isArray(r[field]) ? r[field].filter(q => !keyOk(q)) : [String(r[field])]
    if (bad.length) throw new Error('rung ' + r.id + ': ' + field + ' is a list of strings, none empty or opening with -, and none holding a double quote, a backtick, a dollar sign, a backslash or a newline, since each is rendered in double quotes: ' + bad.join(' | '))
  }
  const stray = (Array.isArray(r.checks) ? r.checks : []).filter(q => !(Array.isArray(r.briefing) && r.briefing.includes(q)))
  if (stray.length) throw new Error('rung ' + r.id + ': checks is a sub-list of briefing, and these keys are not in the briefing: ' + stray.join(' | '))
  if (Array.isArray(r.briefing) && (!Array.isArray(r.reasons) || r.reasons.length !== r.briefing.length)) throw new Error('rung ' + r.id + ': reasons holds one line per briefing key, in order')
})
const keysOf = (r, field) => Array.isArray(r[field]) ? r[field] : []
const lookupCommand = (keys) => ['        ' + LOOKUP_TOOL + ' \\'].concat(keys.map((q, i) => '            "' + q + '"' + (i < keys.length - 1 ? ' \\' : '')))
const SEARCH_FIRST = 'the record (explorations/coordinator/INDEX.md, FACTS.md, POSITIONS.md, the gap ledger through ' + LEDGER + ' find, and the maps under explorations/coordinator/map/)'
const MORE_PARTS = 'Output that ends by naming a next part is continued by the same command with --part 2, then 3, until it says it printed the last.'

// The worker's briefing, read whole as its first step after making its worktree: the
// agents were not trained on Fortress, and the briefing is in-context learning
// (POSITIONS.md, "The mission briefing.").
function briefingStep(rung, n) {
  const keys = keysOf(rung, 'briefing')
  if (!keys.length) return [n + '. Your briefing. This rung has none: search ' + SEARCH_FIRST + ' for its topics before the tree.']
  return [
n + '. Your briefing. Fortress is a language you were not trained on, whose design was never finished; it is not Java or Scala, and habits from them mislead here. Run this command in your worktree and read all it prints: the decisions on record, the ledger rows, the specification\'s sections, the notes and the code your rung rests on, gathered for it by the batch\'s planner, each entry with a line at the end of this brief on why it is there. Learn from it how Fortress does this kind of thing, then do the rung in the library\'s own way. ' + MORE_PARTS,
'',
...lookupCommand(keys),
'',
'   For a topic the briefing does not cover, search ' + SEARCH_FIRST + ' before the tree.',
  ]
}

// The checks slice of a briefing, read first by the skeptic, a judge and a repair round on
// one rung (rungs = [rung]), or by a repair on the merged tree for the rungs its ruling names.
function sliceStep(rungs, where, lead) {
  const sliced = rungs.filter(r => keysOf(r, 'checks').length)
  const one = rungs.length === 1
  const open = lead || 'Before anything else,'
  if (!sliced.length) return [open + ' search ' + SEARCH_FIRST + ' for the decisions and ledger rows ' + (one ? 'this rung rests on' : 'the rungs rest on') + ', before the tree.']
  return [
open + ' run ' + (sliced.length > 1 ? 'these commands' : 'this command') + ' in ' + where + ' and read all ' + (sliced.length > 1 ? 'they print' : 'it prints') + ': the part of ' + (one ? 'the rung\'s briefing' : 'each rung\'s briefing') + ' that a check of it needs, the decisions and ledger rows it rests on and the specification\'s sections and code it is checked against, each whole. ' + MORE_PARTS,
'',
...[].concat.apply([], sliced.map((r, i) => (i ? [''] : []).concat(one ? [] : ['        # ' + r.id]).concat(lookupCommand(keysOf(r, 'checks'))))),
'',
  ]
}

// The run's directory, found by an agent's own label, and the two jq programs that list a
// transcript's steps and print one call. They were tried on climb batch 8's transcripts (run
// wf_603242ca-111) and batch 9's (wf_f747fd3e-9e4).
const runDirLine = (label) => '    D=$(dirname "$(ls -t ~/.claude/projects/*/*/subagents/workflows/*/agent-*.meta.json | xargs grep -lE \'"description":"' + label + '(:attempt[0-9]+)?"\' | head -1)")'
const transcriptsLine = (labels) => '    grep -lE \'"description":"(' + labels.join('|') + ')(:attempt[0-9]+)?"\' $(ls -tr "$D"/agent-*.meta.json) | sed \'s/[.]meta[.]json$/.jsonl/\''
const JQ_LIST = 'select(.type == "assistant") | .timestamp as $t | .message.content[]? | select(.type == "tool_use") | select(.name == "Edit" or .name == "Write" or (.name == "Bash" and (.input.command | test("git (commit|stash)|junit|harness|nohup|wait_for|fortress compile|compileAll|ant ")))) | [$t[11:19], .id[-6:], .name, ((.input.command // .input.file_path) | gsub("[[:space:]]+"; " ") | .[0:150])] | join("  ")'
const JQ_CALL = 'select(.message.content | type == "array") | .timestamp as $t | .message.content[] | select((.type == "tool_use" and (.id | endswith($id))) or (.type == "tool_result" and (.tool_use_id | endswith($id)))) | $t[11:19] + "  " + (if .type == "tool_use" then (.input.command // .input.file_path // (.input | tostring)) else (.content | if type == "array" then map(.text // "") | join("\\n") else . end) end)'
const JQ_LINES = [
'    jq -r \'' + JQ_LIST + '\' T',
'    jq -r --arg id ID \'' + JQ_CALL + '\' T | head -80',
]
const reId = (id) => id.replace(/[^A-Za-z0-9]/g, '.')

// ---------------------------------------------------------------------------
// The head every role's brief opens with. Agents share the prompt cache only for the system
// prompt and tools, and the first message only when the whole prompt is identical (FACTS.md,
// "The Workflow harness runs two agents at once on this box"), so a head shared byte for byte
// saves nothing, and each role is given only what it needs. What every agent needs to know of
// how to work here is the fortress-repo skill's, which CLAUDE.md has every agent load
// (POSITIONS.md, "The skills are written for a reader new to the repository ..."): the head
// points there and does not repeat it.
// ---------------------------------------------------------------------------

function head(role) {
  return [
'# Fortress climb batch ' + BATCH + ' - ' + role,
'',
'You are an agent of a climb batch of the Fortress revival, run by a Workflow script. ' + BATCH_INTRO,
'',
'The fortress-repo skill says how to work in this repository: how to set up each call, build, run walk and the compiled path, run the old code beside the new, write and run tests, wait for a long command, stop processes, pick up after a stop, commit and report. Load it first, as CLAUDE.md asks, and open the parts your work reaches. This brief says what your role does in this batch and where. Where the brief and the skill differ, the brief holds, and it says so where it does.',
'',
'## The batch',
'',
RUNGS.length + ' rungs, each in its own worktree on its own branch, two agents running at a time, gated once together after the merge:',
'',
RUNGS.map(r => '- ' + r.id + ', slug ' + r.slug + ', worktree ' + r.path + ', branch ' + r.branch + ': ' + r.blurb).join('\n'),
'',
'Every branch is cut from the base, ' + BASE + ', on main. The batch\'s one base build, ' + BASE_BUILD + ', is a worktree at the base that the coordinator built once: every rung worktree is seeded from it, and the old code runs from it through ' + OLD + ' with a private caches folder (the skill\'s worktrees.md). Nobody builds, compiles or runs anything else in it. The batch record is ' + BATCH_RECORD + '; your brief carries what you need of it.',
'',
'## Points to report',
'',
'A point to report is a kind of change the curator reviews after the landing; the rung\'s list says which. A rung that reaches one finishes its work, lists the point with its evidence as file:line, and lands: it is reversible, and neither the push nor the next batch waits for it (POSITIONS.md, "Reversible stops do not hold a batch."). One kind holds the push: a step that cannot be undone, or that acts against a decision on record. Do not take such a step; report it as a decision not taken. If one was taken, list it with holdsPush true. A question for the curator goes in forCurator, with its evidence.',
'',
'## Citing',
'',
'Cite the tree at file:line, a FACTS.md entry and a POSITIONS.md entry by its bold title, and a result by quoting two to five of its lines with the command that printed them; never cite a file under tmp/. No model identifier goes into a file or a commit message. The commit footer is the skill\'s (committing.md).',
'',
'## If your context is compacted',
'',
'Your brief is the first message of your own transcript, the newest agent-*.jsonl under ~/.claude/projects/*/*/subagents/workflows/ whose first line holds this brief\'s title. Re-read from it what your next step needs, and the files you wrote, and go on. The boot that CLAUDE.md asks of the coordinating session is not yours.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The rung worker.
// ---------------------------------------------------------------------------

// The paths neither the checker count nor the distance stage reads: both run the compiler's
// phase order over the library (tools/checker-count/WorldFlip.java,
// tools/distance/DistanceMulti.java call Shell.compilerPhases), which reads no test, text or
// record and runs no code of walk's evaluator or natives or of the test harness (FACTS.md,
// "The checker-count and distance stages read only the compiler's phases ...").
const STAGE_BLIND = ['explorations/', 'Specification/', 'Documentation/', 'ProjectFortress/tests/', 'ProjectFortress/*_tests/',
  'ProjectFortress/src/com/sun/fortress/tests/', 'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/', 'ProjectFortress/src/com/sun/fortress/interpreter/glue/']
const STAGE_BLIND_TEXT = STAGE_BLIND.slice(0, -1).join(', ') + ' or ' + STAGE_BLIND[STAGE_BLIND.length - 1]

const COUNT_RUN = TOOLS + '/checker-count/run.sh'
const DIST_RUN = TOOLS + '/distance/run.sh'
const DIST_COMPARE = TOOLS + '/distance/compare.sh'
const LANDED_TABLES = 'the last landed gate\'s tables: checker-count.txt and distance.txt in the newest explorations/compile-ladder/climb-batch-*/gate/, and the per-site list ' + SITES

// The checker count and the distance, for a rung. Its before is the landed tables (POSITIONS.md,
// "No re-measuring what the record holds."); its after runs once, on its final code, with no
// partial run before it (climb batch 9's review, finding 4; batch 10's rung G ran one anyway).
function stagesStep(rung, n) {
  const after = [
'   The after runs once, on your final code, after your last edit is built, into tmp/' + rung.slug + '/: the count (20 s) at once, and the distance (13 to 24 minutes, one core) in the background, started with nohup in the form of the skill\'s session.md, "Long commands", and read when your report is written:',
'',
'        ' + COUNT_RUN + ' tmp/' + rung.slug + '/checker-count-postedit.txt tmp/' + rung.slug + '/cc-post',
'        nohup bash -c \'( ' + DIST_RUN + ' tmp/' + rung.slug + '/distance-postedit.txt tmp/' + rung.slug + '/dist-post ) > tmp/' + rung.slug + '/distance-run.txt 2>&1; echo EXIT=$? >> tmp/' + rung.slug + '/distance-run.txt\' >/dev/null 2>&1 &',
'',
'   Its before is ' + LANDED_TABLES + ': never run a stage on your unchanged base, and never run a stage\'s driver on part of the library on code the full stage then measures (POSITIONS.md, "No re-measuring what the record holds."). Put in REPORT.md the diff of the count tables, what ' + DIST_COMPARE + ' prints for the distance tables, and each site that moved, read through tmp/' + rung.slug + '/dist-post/errors.tsv against the per-site list by row, not by the stage\'s class (row 577). Commit no table: the gate\'s tables on the merged tree are the record.',
  ]
  if (rung.testIsStage) return [
n + '. The checker count and the distance are this rung\'s test: no program can yet be compiled against the interpreter\'s library, so the failing-then-passing test of a library site is the stage, its before the landed table and its after your tree\'s (library-route-judgement.md section 2, step 1). Beside it, the walk tests your section names, each through the harness, test first as for any rung.',
...after,
  ]
  return [
n + '. The checker count and the distance, where your section asks for them. When every path your edit adds or changes (git diff --name-only ' + BASE + ' and git status --short) is under ' + STAGE_BLIND_TEXT + ', neither stage can move: run neither, and say so in REPORT.md with the paths. Otherwise:',
...after,
  ]
}

// mode: 'first' (the first pass), 'resume' (after a judge ruled that a stop is none), 'repair'
// (after a judge's ruling on a refusal or a contested fix).
function rungRole(rung, mode) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  const steps = [
'1. Your worktree. Nobody made it at the launch. The command below adds it to the main tree\'s repository without touching the main tree\'s files, reuses a worktree that exists and a branch already pushed, and otherwise cuts the branch from the base; it seeds the worktree from the base build in about 3 s, so that walk and the compiled path run with the library compiled, and nothing needs building until your edit does. Then push the branch:',
'',
'        ' + SEED + ' ' + BASE_BUILD + ' ' + rung.path + ' ' + rung.branch + ' ' + BASE,
'        cd ' + rung.path + ' && git push -u origin ' + rung.branch,
'',
'   If it exits 2 it made nothing: make the worktree and build it as the skill\'s worktrees.md says, and say so in REPORT.md. Work only in ' + rung.path + ', with your scratch under its tmp/' + rung.slug + '/; never in the main tree, the base build or another rung\'s worktree.',
...(mode === 'repair' ? [sliceStep([rung], 'your worktree', '2. Before anything else,').join('\n')] : briefingStep(rung, 2)),
rung.testIsStage
  ? '3. The test. Step 7 below is this rung\'s test for the library\'s sites; the walk tests your section names are written first, as the skill\'s tests-writing.md, "The order", says.'
  : '3. The test, first, as the skill\'s tests-writing.md says ("The order"; "Promoting an XXX test"): the essence of the defect as a clean minimal program named by its topic, seen failing through the harness on the base\'s code in a run that ends before your edit is first built (under walk, before you edit a library source it reads), then the fix, then the test seen passing in your last run after your last change of code. The test and the fix may share a commit. ' + (mode === 'repair' ? 'The merged-diff review reads this order in your transcript' : 'Your skeptic reads this order in your transcript') + ' and runs nothing again, so the failing run goes through the harness, never only by hand. A rung that edits only prose has no test; its text is checked against the tree and the decisions on record.',
'4. Where the fix belongs, before you edit: explorations/coordinator/map/spec-to-implementation.md and modules-and-phases.md for the place, the skill\'s library.md for the library\'s own way. Where a precedent repaired the same defect, count the other sites in its file and give the number. List every way the language and the library offer before you choose, and put the choice in your decisions with the ways not taken.',
'5. The edit, as small as the test needs, and the build it needs (the skill\'s build-and-caches.md, "Building" and "After an edit of the library").',
'6. Whole suites, only as the skill\'s tests-running.md says ("When to run a whole suite"): once for each code state, after your last edit, when your edit changes Java or Scala of the checker, of walk or of a phase both share; your own tests otherwise. The gate is another agent\'s: run only the suite that part names for your edit (ant testQuick for the checker, ant testSystem for walk, both for a shared phase), once, and never the gate\'s whole set.',
...stagesStep(rung, 7),
'8. Every defect you measure gets one of the three homes of the skill\'s tests-writing.md ("How a defect is recorded"), and REPORT.md says which and why. A new ledger row goes in record.md in the row template of ' + LEDGER + ' (its header), with NEW-' + rung.id + '-1, NEW-' + rung.id + '-2 for its number, also where a test or a report cites it: the gather adds the rows through ' + LEDGER + ' and puts their numbers in. Never run ' + LEDGER + ' add or note yourself. The first XXX test you add is shown red on a deliberate fix, through the harness (tests-writing.md, "Writing an XXX test").',
'9. Grep both test corpora and ProjectFortress/src/com/sun/fortress/ whole for a competing declaration of every name you add.',
'10. Your change\'s own ladder subset, after your edit only, as the end of the skill\'s gate.md, "The ladder regression", says, the drivers copied under tmp/' + rung.slug + '/ladder/, compared with the newest landed ladder.tsv.',
'11. The specification\'s text, where your section has you change it, in the S1 form (the skill\'s specification.md). List in REPORT.md every sentence of the specification your change makes false, an Appendix I Effect or a note on walk or the compiled path, with its file:line; the gather corrects those your section does not have you edit.',
  ]
  return [
'',
'---',
'',
'# Your role: rung worker for ' + rung.id + ', ' + rung.slug + (mode === 'repair' ? ', repair round' : mode === 'resume' ? ', continued' : ''),
'',
'Your rung\'s section of the batch record, word for word, is at the end of this brief. It opens with the answers on record that it follows, and it is the whole of what the record asks of this rung' + (mode === 'repair' ? '.' : ', followed by your briefing\'s entries, each with why it is there.'),
'',
'## The order of work',
'',
...steps,
'',
'## What you write',
'',
'Under ' + dir + ' in your worktree:',
'- REPORT.md: opening with five provenance lines, each ending in a file:line or none: problem (the measurement that made this a rung), spec (the governing passage of Specification/basic or basic-lib; none with the grep that shows it), precedent (the declaration or shape you followed), deviation (one line per way your edit departs from the precedent and the specification\'s spelling), historical (every file of the original 2012 tree you edit, for the commit message). Then what changed and why; the failing run\'s lines and the passing run\'s line, each with its command; where the fix belongs and the precedent search; what the specification settles; each program you ran old against new; the sentences your change makes false; every point to report you reached; your decisions, each with the ways not taken; every defect with its home.',
'- record.md: the record lines the gather folds, as finished prose. The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md). Each ledger note (the row, and the text to append). Each new row (NEW-' + rung.id + '-n, in the row template). The handover line. And a section headed "Revival change": the material from which the skill writer, after the landing, writes the skill\'s part on what the revival changed in the team\'s Fortress, when your change makes the revival\'s Fortress differ from what one of the team\'s sources (the specification, walk, the compiler, the library) says or does. It has two labelled parts. "The change": the team\'s source and what it says or does, with file:line; what the tree now does, with the test that shows it; and the reason, as evidence (a passage of a source, a checker refusal, a measured failure). "Provenance": the question or item, the answer or default it follows, and the batch. Name no question, item, batch, rung or record file in the change, and give no decision\'s status there; provenance goes in its own part. You write no skill text: the gather copies both parts into the batch\'s RECORD.md for the writer. When your change makes no such difference, the section is the line "Revival change: none", with the reason.',
'- A decision record if your section asks for one. Nothing else under explorations/.',
'',
'Do not edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover, the tools under ' + TOOLS + '/, or anything under .claude/: the gather folds your record.md into them, since every rung would conflict on them. Commit and push your own files as you go, on your branch only, as the skill\'s committing.md says; never main, never another branch, never a force-push.',
'',
'## Your points to report',
'',
...(rung.pointsToReport || []).map(p => '- ' + p),
'',
'## Your result',
'',
'Return the structured result the tool requires, and the full detail in REPORT.md. reportText and recordText carry the full text of REPORT.md and record.md, word for word: the harness often refuses a worker\'s write of those two files, and then the text is the report; the run\'s journal keeps it, and ' + (mode === 'repair' ? 'the gather writes it onto main from there' : 'your skeptic writes it onto your branch from there') + '. decisions lists every choice you made among ways, each with the ways not taken and the evidence: ' + (mode === 'repair' ? 'the merged-diff review reads them' : 'your skeptic weighs its fixes against them') + '. pointsReached lists every point to report you reached, with its evidence. forCurator lists every question for the curator the rung leaves open. Set stopped only for a step you could not take because it cannot be undone or acts against a decision on record, and say which in stopReason.',
'',
  ].join('\n')
}

// The rung's own section, and the worker's briefing reasons, at the end of a worker's brief.
function rungTail(rung, withReasons) {
  const lines = ['', '## Your rung: ' + rung.id + ' - ' + rung.title, '', 'SLUG is ' + rung.slug + '. WORKTREE is ' + rung.path + ', branch ' + rung.branch + '.', '', rung.section, '']
  if (withReasons && keysOf(rung, 'briefing').length) {
    lines.push('**Your briefing, entry by entry.** Step 2\'s command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it.')
    rung.briefing.forEach((k, i) => lines.push('- ' + k + ': ' + rung.reasons[i]))
    lines.push('')
  }
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// The skeptic, which checks the rung and fixes what it finds (the curator, 2026-10-08:
// "just allowing Skeptic to fix the things that it discovers and then a judge just rules on
// that fix"). In batch 10 the three refusals cost 1.75M of 6.26M, a judge, a repair worker and
// a second skeptic each, for defects the first skeptic had already measured, and the second
// skeptics found nothing new but two citations (process-engineering/checking-roles-cost.md,
// sections 1 and 4; reviews/batch-10-review.md, section 4). The skeptic already holds the
// context: it fixes, test first, builds its own fix once (a new code state, which POSITIONS.md,
// "Nothing is built or run twice on the same code.", allows), and a judge rules only on a fix
// it marks contested or on a rung it cannot fix. process-engineering/batch-redesign.md,
// "The skeptic that fixes".
// ---------------------------------------------------------------------------

// What a skeptic runs to check, and what it builds: nothing, until its own fix.
function oldCodeLines(rung) {
  const priv = oldCaches(rung)
  return [
'    ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' compile P.fss && ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' run P    # the compiled path on the old code',
'    ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' P.fss                                       # walk on the old code',
  ]
}

function skepticRole(rung, worker) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  const id = reId(rung.id)
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug,
'',
'You did not do this rung: its worker did, in ' + rung.path + ' on ' + rung.branch + '. You decide whether the change is right and the record honest, and you fix what you find, so that the rung lands right with no repair round after you. A judge runs only on a fix you mark contested, or on a rung you cannot fix. You are not here to be agreeable, and not here to redo the worker\'s work: you check it, and you change what is wrong.',
'',
'## The rung\'s section of the record, word for word',
'',
rung.section,
'',
'Its points to report:',
'',
...(rung.pointsToReport || []).map(p => '- ' + p),
'',
'## What the worker returned',
'',
'Its own account, a claim to check, not evidence. Its REPORT.md and record.md texts are left out here: the first step below writes them onto the branch.',
'',
JSON.stringify(Object.assign({}, worker, { reportText: undefined, recordText: undefined }), null, 2),
'',
'## First, the worker\'s report and record on the branch',
'',
'The harness often refuses a worker\'s write of REPORT.md and record.md, so their texts are in the run\'s journal, in the worker\'s result. In ' + rung.path + ', write each of the two files the branch does not carry, byte for byte, with the journal tool, and commit them alone, titled "The worker\'s report and record, from the run\'s journal". The first line finds the run\'s directory by your own label; a command that exits 1 wrote nothing, and you say so in findings:',
'',
runDirLine('skeptic:' + id),
'    [ -e ' + dir + 'REPORT.md ] || python3 ' + TOOLS + '/journal-text.py --journal "$D"/journal.jsonl --out ' + dir + 'REPORT.md reportText rung:' + rung.id + ' resume:' + rung.id,
'    [ -e ' + dir + 'record.md ] || python3 ' + TOOLS + '/journal-text.py --journal "$D"/journal.jsonl --out ' + dir + 'record.md recordText rung:' + rung.id + ' resume:' + rung.id,
'',
'Then read REPORT.md as the report. The worker\'s transcripts are beside yours: the second line below prints their paths, oldest first; never read one whole. For a transcript T, the first jq line lists its edits, commits, builds and harness runs with their times (UTC) and the last six characters of each call\'s id, the second prints one call\'s command and output by that id:',
'',
transcriptsLine(['rung:' + id, 'resume:' + id]),
...JQ_LINES,
'',
'## Your briefing\'s slice',
'',
...sliceStep([rung], 'the rung\'s worktree'),
'## What you check',
'',
(rung.testIsStage
  ? '1. The test, which for the library\'s sites is the stage: the report\'s diff is the diff of ' + LANDED_TABLES + ' and the worker\'s post-edit tables under tmp/' + rung.slug + '/, and the transcript shows the run that wrote them on the head\'s code, after its last edit was built. Compare the distance tables with ' + DIST_COMPARE + ', a file read: what moved is what the report says, within the checker\'s run-to-run variation of 2 to 4 errors. The walk tests the section names: test first, as in check 2.'
  : '1. The count and distance tables the report declares, against the worker\'s files under tmp/' + rung.slug + '/, a file read; or, where the report says neither stage ran, that git diff --name-only ' + BASE + '...HEAD lists no path outside ' + STAGE_BLIND_TEXT + '.'),
'2. Test first, read in the worker\'s transcript, each point by its time and call id: the test seen failing through the harness on the base\'s code in a run that ended before the edit was first built (under walk, before a library source it reads was edited), with the lines recordedFailure quotes; and seen passing in the worker\'s last such run, after its last change of code, with the line recordedPass quotes. The skill\'s tests-writing.md, "The order", is the rule. A test the transcript does not show failing on the base\'s code is a defect of the change, which you fix ("What you do with a finding"). A rung that edits only prose has no failure to see: its text is checked against the tree and the decisions on record.',
'3. The diff (git diff ' + BASE + '...HEAD), line by line, against the section, the specification\'s passages it cites and each decision on record your slice printed: does the edit do what the report says, only that, as small as its test needs, the decision\'s rule stated neither narrower nor broader than the decision states it?',
'4. Where the fix belongs and the library\'s way: did the worker find what the team already did here, follow the right precedent, and count the other sites of a defect a precedent repaired? A device the rung invented where the library has one is a finding, with the library\'s file:line.',
'5. The test exercises the defect; each specification citation in its messages names the file and the section, never a line, and the section says what the message says; the file carries at most one comment line and is named by its topic.',
'6. Your own programs, the differential. For every construct the rung touches, programs the worker did not write, run under walk and on the compiled path, with the rung\'s build for the new code and the old code from the base build:',
'',
...oldCodeLines(rung),
'',
'   Write them under tmp/' + rung.slug + '/skeptic/. ' + (rung.writesState
  ? 'This rung touches mutable state: run each at FORTRESS_THREADS=1 and =4, as a prefix on the command, and report both columns; a difference is a finding.'
  : 'Where the diff shows a mutable variable, a field, an atomic block or a write into a library\'s state, run each at FORTRESS_THREADS=1 and =4 and say so.') + ' When walk and the compiled run disagree, the specification answers: the interpreter is evidence, not an oracle; a silent specification is a reason to think harder, not to stop.',
'7. The three homes (the skill\'s tests-writing.md, "How a defect is recorded") for every defect the report names and every defect your programs measure.',
'8. The ledger and the sibling sites: ' + LEDGER + ' find with your own words for rows that bear on the rung; the tree for every other site of the defect the rung repairs, in the files it edits, in the sibling types and widths, and on the other path.',
'9. The report: its five provenance lines, each cited line opened with sed -n and saying what the line claims; the sentences of the specification the change makes false, listed; the whole-suite run the skill asks of a checker or walk edit, its verdict, command and commit those of the head; every point to report the rung reaches; record.md\'s FACTS entry, notes, rows and Revival change section true as written.',
'10. Competing declarations of every name the rung adds, in both test corpora and ProjectFortress/src/com/sun/fortress/ whole.',
'11. The failure-mode question: where the rung turns a loud failure (a throw, an error, a crash) into a quiet value, what the value is, against the specification. It does not stop the rung; it is reported.',
'',
'## You build nothing to check',
'',
'To check, you start no build and no library compile and leave the rung\'s build as it is: the worker built this code and ran its test, and the gate runs every suite on the merged tree (POSITIONS.md, "Nothing is built or run twice on the same code."). You compile and run your own programs only, with the lines above, and read the worker\'s runs in its transcript and its logs. Only your own fix, below, is built, once, as a new code state.',
'',
'## What you do with a finding: fix it',
'',
'- A correction: a sentence of REPORT.md or record.md, a citation, a provenance line, a FACTS entry, a missing assertion of a value the rung\'s own test already reaches, a home-2 or home-3 test, a ledger row (NEW-' + rung.id + '-n in record.md, in the row template), a sentence of the specification the change makes false. Make it, and commit it. An assertion or a test you add is seen failing through the harness on the base\'s code, run with the old code tool (the skill\'s worktrees.md, "Running the old code"), and passing on the head: the fix is already in the tree, so the base is where it fails.',
'- A defect of the change: it is wrong, or incomplete, a sibling site its own repair owes, a crash where the text gives an error, a test not seen failing first. Fix it, test first: the program that measured it becomes a gated test or an assertion (the skill\'s tests-writing.md), seen failing through the harness on the worker\'s head before your edit; then the fix, where it belongs and in the library\'s way, after you have listed the ways; built as the skill\'s build-and-caches.md says; the test seen passing; and, when your fixes change Java or Scala of the checker, of walk or of a shared phase, the whole suite they reach once, after your last fix (the skill\'s tests-running.md). Commit each fix with its test in one commit whose title begins "Skeptic\'s fix:", and push. Run no count or distance stage after a fix: the gate\'s tables on the merged tree are the record, and SKEPTIC.md says that the report\'s tables are those of the worker\'s head.',
'- Settled or contested. A fix is settled when the rung\'s section, the specification or a decision on record says that what your fix makes the code do is right: cite that sentence with the fix. A fix is contested when (a) the worker\'s report argues for the behaviour your fix changes, not only for its form; or (b) nothing on record settles it and you chose among ways; or (c) it touches a path the section does not give the rung and no sentence you cite settles it. A fix that reaches a point to report, or touches a path outside the section, is not contested for that alone: when a sentence you cite settles it, it is settled, and the point or the path goes in pointsReached for the curator. Make a contested fix all the same, in a commit of its own, and list it in contested with the worker\'s argument and yours: a judge rules on it alone, and may revert it.',
'- Refuse only when the rung cannot be fixed here: its approach is wrong and a fix would redo it; the fix needs a path no rung of this batch may touch, or a decision of the curator; or it is larger than a repair round. Then make no fix for that finding, and refuse with the one thing that must change.',
'- Every point to report the rung as it stands reaches, whether or not the worker listed it, goes in pointsReached; a question for the curator, in forCurator. Do not edit the worker\'s account of its own decisions: say where you differ in SKEPTIC.md.',
'',
'## Your verdict',
'',
'Write SKEPTIC.md in ' + dir + ': what you checked, the lines of your programs\' output each finding rests on with their commands, each fix with its finding, its test\'s failing and passing lines and its commit, each contested fix with both arguments, and your verdict. Commit it alone, last, and push. Set verdict to approved when the rung, with your fixes, is right and none is contested; contested when it is right with your fixes and one or more is contested; refused when it cannot be fixed here. In skepticText put the single word committed once SKEPTIC.md is committed; only if the harness refused the write, say so in findings and carry the text in skepticText, word for word. headJudged is the head the worker left, before your first commit; headAfter the head after your last. Run no suite but the one your own fix needs, as "What you do with a finding: fix it" says; the gate runs every suite on the merged tree.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The judge. Called only on a contested fix, a refusal, a worker that stopped, a blocking
// review or a red gate. Its first ruling on a rung or on the merged tree runs on Opus, a second
// on the same one on Fable (judgeTier). It does not build or test. Its brief carries what it
// rules on and points to the files for the rest: in batch 10 a judge's brief carried the
// worker's whole result and the skeptic's verdict, two thirds of its 61K tokens, of which it
// used about 30% (checking-roles-cost.md, section 2).
// ---------------------------------------------------------------------------

function judgeRole(kind, rung, worker, verdict, extra) {
  const onRung = (kind === 'contested' || kind === 'refusal' || kind === 'stop')
  const where = onRung ? rung.path : MAIN
  const outFile = onRung ? 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md' : BATCH_DIR + '/JUDGE-' + kind + '.md'
  const question = {
    contested: 'The skeptic fixed what it found in this rung and marked the fixes below contested: the worker argued for what a fix changes, or nothing on record settles it, or it touches a path or a point beyond the rung. Rule on each contested fix, and on nothing else: uphold it, or revert it. A fix you revert you revert yourself on the branch, git revert --no-edit <its commit>, which takes its test with it, and you push. Decide by the specification, the decisions on record and the library\'s own way, each point cited at file:line. Your decision is stands when the rung, after your reverts, lands as the branch holds it; repair when a contested finding is right but neither the worker\'s way nor the skeptic\'s is, with numbered instructions for one repair round; drop when the rung\'s approach is wrong; stop when it is a fork the record reserves for the curator.',
    refusal: 'The skeptic refused this rung: it found what it could not fix here. Decide what follows, by citation: stands when the refusal is wrong and the rung lands as the branch holds it; repair with numbered instructions for one repair round, each concrete enough to be done without re-deriving your reasoning; drop when the approach is wrong; stop when it is a fork the record reserves for the curator.',
    stop: 'The rung worker stopped, reporting a step it could not take because it cannot be undone or acts against a decision on record. Decide whether it is one. If not, your decision is repair, and your numbered instructions are the continuation; if it is, stop, with what reaches the curator: the fork, the ways, what each costs, and your recommendation.',
    review: 'The merged-diff review found something blocking in the source hunks after the gather: its blockingCode findings, the ones whose repair touches code, are yours; its routed findings go to the next batch without a ruling. Diagnose it on the merged tree as a whole and decide the repair; do not bisect rungs. The gate is running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it. ' + LAND_RULE,
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The ways the gate is red: a failing or erroring JUnit suite (ProjectFortress/TEST-RESULTS/); a suite whose test count fell against the last landed summary, which usually means a .test file or a tests= line went missing; a FAIL or a repeated timeout in the four-thread atomic runs, a lost update in the transaction run time; a ladder regression, a file that compiled and ran before reaching a lower phase or printing other output; a failing example of testSpecData once it is a gate step; and, from the checker count, a crash line no rung declared or a stale checker shadow (its total is reported and never red, and the distance stage is never red). Find the source of the conflict as a whole and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong.',
  }[kind]
  const contested = (kind === 'contested' && verdict && Array.isArray(verdict.contested)) ? verdict.contested : []
  return [
'',
'---',
'',
'# Your role: judge (' + kind + ')' + (rung ? ' for ' + rung.id + ', ' + rung.slug : ''),
'',
'You are this batch\'s escalation point. You did not do the work and you do not repeat it: no build, no test run. You read, you rule, and you write instructions an Opus worker can carry out. You write one file and commit it' + (kind === 'contested' ? ', and the reverts you rule' : '') + ', nothing else.',
'',
question,
'',
...(rung ? ['## The rung\'s section of the record', '', rung.section, ''] : []),
'## What you rule on',
'',
...(kind === 'contested' ? ['The contested fixes, as the skeptic returned them:', '', JSON.stringify(contested, null, 2), '', 'The decisions the worker returned, each with the ways it did not take:', '', JSON.stringify((worker && worker.decisions) || [], null, 2), ''] : []),
...(kind === 'refusal' ? ['The skeptic\'s refusal, its findings and its fixes:', '', JSON.stringify({ refusalReason: verdict && verdict.refusalReason, findings: verdict && verdict.findings, fixes: verdict && verdict.fixes }, null, 2), ''] : []),
...(kind === 'stop' ? ['The worker\'s stop:', '', JSON.stringify({ stopReason: worker && worker.stopReason, decisions: worker && worker.decisions, summary: worker && worker.summary }, null, 2), ''] : []),
...(extra ? ['The stage that escalated to you returned:', '', JSON.stringify(extra, null, 2), ''] : []),
'## What to read, and no more unless a ruling needs it',
'',
...(onRung ? [
sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')', '1. First,').join('\n'),
'2. ' + (kind === 'contested' ? 'Each contested fix: git -C ' + rung.path + ' show <its commit>.' : 'The net change: git -C ' + rung.path + ' diff ' + BASE + '...HEAD, and its commits: git log ' + BASE + '..HEAD.'),
'3. In that worktree, explorations/compile-ladder/' + rung.slug + '/REPORT.md' + (verdict ? ' and SKEPTIC.md' : '') + ', the sections the point you rule on touches.',
'4. Every specification passage both sides cite, in the prose chapters, ten lines either side; the precedents both name; explorations/coordinator/map/spec-to-implementation.md only if the question is where a fix belongs.',
] : [
'1. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD, the hunks the findings name.',
'2. For a red gate, the failing tests\' own output under ProjectFortress/TEST-RESULTS/, and the summary and the comparison under ' + GATE_OUT + '/; the full logs, which are not committed, are under ' + LOG_DIR + '/.',
'3. The REPORT.md and SKEPTIC.md of the rungs the findings name, under explorations/compile-ladder/<slug>/.',
'4. The specification passages they cite.',
]),
'',
'## How to rule',
'',
'The specification is the standard and the decisions on record bind (POSITIONS.md, "The specification stays the standard."): the interpreter is evidence, not an oracle, and a silent specification is a reason to think harder, not to stop, unless PLAN.md names the point a fork. Rule as a whole: the goal is one tree with everything running. Every point of your ruling is a citation the next agent can check. Say which claims of each side were right. A decision you take where nothing on record settles it goes in forCurator, with the ways.',
'',
'Write the ruling to ' + outFile + ' in ' + where + (onRung
  ? ', commit it on ' + rung.branch + ' with the skill\'s footer, and push.'
  : ', and commit it locally on main with the skill\'s footer; do not push. Another agent may commit in this tree at the same time: retry once on an index.lock error after a few seconds.'),
'',
'Return the structured decision the tool requires.',
'',
  ].join('\n')
}

// The repair round on a rung, after a judge's ruling: a worker's brief with the ruling.
// No second skeptic follows it: its own test first, the merged-diff review, which reads every
// commit after the worker's, and the gate check it (batch-redesign.md, "No second skeptic").
function repairPrompt(rung, verdict, decision, kind) {
  return [
'',
'## The ruling you carry out',
'',
(kind === 'stop'
  ? 'You did this rung and stopped on what you took for a step that cannot be undone. The judge ruled that it is not one: this is the continuation, in ' + rung.path + '.'
  : 'This rung was done, checked, and ruled on: its skeptic ' + (kind === 'contested' ? 'fixed what it found and marked fixes contested' : 'refused it') + ', and the judge ordered one repair round, which is you, in ' + rung.path + '. No second skeptic follows: your own test first, the merged-diff review and the gate are its check.'),
'',
'The judge\'s decision:',
'',
JSON.stringify(decision, null, 2),
'',
'Its full ruling is explorations/compile-ladder/' + rung.slug + '/JUDGE.md on the branch' + (verdict ? ', and the skeptic\'s SKEPTIC.md is beside it' : '') + '. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it. Every defect you repair gets its assertion in a gated test, seen failing first, as step 3 says; one you do not gets home 2 or 3. Update REPORT.md and record.md on the branch to the rung as it now stands, and carry their full texts in reportText and recordText: they replace the earlier texts. Your structured result replaces the worker\'s too, so its pointsReached, forCurator, historicalFiles, newRows and rowsClosed describe the whole rung as it now stands, the worker\'s entries among them, not your round alone. Commit and push.',
'',
  ].join('\n')
}

const STATE_SCHEMA_POINTS = { type: 'array', description: 'every point to report reached: the kinds of change the curator reviews after the landing, from the rung\'s list or another of that kind; empty if none',
  items: { type: 'object', properties: {
    rung: { type: 'string', description: 'the rung id; may be empty in a rung\'s own result' },
    point: { type: 'string', description: 'the point, in the words of the list where it is on it' },
    evidence: { type: 'string', description: 'file:line, or the command and its line' },
    holdsPush: { type: 'boolean', description: 'true only for a step taken that cannot be undone, or that acts against a decision on record: it holds the push until the curator lifts it; false for every reversible point' },
  }, required: ['point', 'evidence', 'holdsPush'] } }

const RUNG_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    landed: { type: 'boolean', description: 'true if the edit is in place and its test passes' },
    stopped: { type: 'boolean', description: 'true only if the rung met a step it could not take because it cannot be undone or acts against a decision on record' },
    stopReason: { type: 'string', description: 'empty unless stopped' },
    filesChanged: { type: 'array', items: { type: 'string' }, description: 'path:line-range per changed source file, and the new test files' },
    historicalFiles: { type: 'array', items: { type: 'string' }, description: 'files of the original 2012 tree the rung edits, for the commit message; empty if none' },
    recordedFailure: { type: 'string', description: 'the harness command and the two to five lines of its run on the base\'s code that show the test failing, with the call\'s time; for a rung that edits only prose, none and why' },
    recordedPass: { type: 'string', description: 'the harness command and the verdict line of the test\'s last run on the edit' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'each choice made among ways: what was chosen, the ways not taken, and the evidence' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per measured defect: the defect, its home (1, 2 or 3) and where it is' },
    newRows: { type: 'array', items: { type: 'string' }, description: 'the placeholders of the new rows record.md holds (NEW-<rung>-<n>), each with its claim\'s first words' },
    rowsClosed: { type: 'array', items: { type: 'string' }, description: 'each row the rung fixes, with the test that closes it' },
    notDone: { type: 'array', items: { type: 'string' } },
    pointsReached: STATE_SCHEMA_POINTS,
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every question for the curator the rung leaves open, one entry each with its evidence as file:line; empty if none' },
    reportText: { type: 'string', description: 'the full text of REPORT.md, word for word' },
    recordText: { type: 'string', description: 'the full text of record.md, word for word' },
    summary: { type: 'string', description: 'at most 15 lines of prose' },
  },
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'recordedFailure', 'decisions', 'pointsReached', 'summary'],
}

const SKEPTIC_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    verdict: { type: 'string', enum: ['approved', 'contested', 'refused'], description: 'approved: right with your fixes, none contested; contested: right with your fixes, one or more contested; refused: it cannot be fixed here' },
    refusalReason: { type: 'string', description: 'empty unless refused: the one thing that must change' },
    fixes: { type: 'array', description: 'every commit of yours that changes the rung, corrections included', items: { type: 'object', properties: {
      commit: { type: 'string' },
      finding: { type: 'string', description: 'what was wrong, with file:line' },
      kind: { type: 'string', enum: ['correction', 'defect'], description: 'correction: report, record, citation, test or row; defect: a fix of the change itself' },
      settledBy: { type: 'string', description: 'for a settled fix, the sentence of the section, the specification or a decision on record that settles it, at file:line; empty for a contested one' },
      test: { type: 'string', description: 'for a defect, the test or assertion with its failing line on the worker\'s head and its passing line, each with its command' },
      paths: { type: 'array', items: { type: 'string' } },
    }, required: ['commit', 'finding', 'kind', 'paths'] } },
    contested: { type: 'array', description: 'each contested fix, for the judge; empty if none', items: { type: 'object', properties: {
      commit: { type: 'string' },
      finding: { type: 'string' },
      why: { type: 'string', enum: ['worker-argued', 'unsettled', 'beyond-the-rung'] },
      workerArgument: { type: 'string', description: 'the worker\'s argument for what the fix changes, cited from REPORT.md or its decisions' },
      skepticArgument: { type: 'string' },
    }, required: ['commit', 'finding', 'why', 'workerArgument', 'skepticArgument'] } },
    failureWasRecorded: { type: 'boolean', description: 'whether the worker\'s transcript shows its test failing through the harness on the base\'s code before the edit was built, and then passing; false for a rung that edits only prose' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'your own programs: program, walk answer, compiled answer, old against new; both thread columns where the rung writes state' },
    suiteRun: { type: 'string', description: 'the whole-suite run your fix needed (the command, the verdict line and the head), or none and why' },
    findings: { type: 'array', items: { type: 'string' } },
    pointsReached: STATE_SCHEMA_POINTS,
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every question for the curator, one entry each with its evidence as file:line; empty if none' },
    leftForGather: { type: 'array', items: { type: 'string' }, description: 'a correction you could not make on the branch, for the gather; empty if none' },
    skepticText: { type: 'string', description: 'the single word committed once SKEPTIC.md is committed; its full text only when the harness refused the write' },
    headJudged: { type: 'string', description: 'the head the worker left, before your first commit' },
    headAfter: { type: 'string', description: 'the head after your last commit' },
    summary: { type: 'string' },
  },
  required: ['slug', 'verdict', 'fixes', 'contested', 'failureWasRecorded', 'differentialsRun', 'pointsReached', 'headJudged', 'summary'],
}

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    kind: { type: 'string' },
    decision: { type: 'string', enum: ['stands', 'repair', 'drop', 'stop'], description: 'stands: the rung lands as the branch now holds it; repair: one repair round carries out the instructions; drop: the rung\'s approach is wrong, it does not land; stop: a fork reserved for the curator, it does not land' },
    rulings: { type: 'array', description: 'on contested fixes: one per fix', items: { type: 'object', properties: {
      commit: { type: 'string' }, ruling: { type: 'string', enum: ['uphold', 'revert'] }, revertCommit: { type: 'string', description: 'the commit of your revert; empty when upheld' }, why: { type: 'string' },
    }, required: ['commit', 'ruling', 'why'] } },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps for the repair round, each with the file:line it rests on; empty unless repair' },
    ruling: { type: 'string', description: 'which claims of each side were right and wrong, by citation' },
    forCurator: { type: 'array', items: { type: 'string' }, description: 'what reaches the curator: a fork with its ways and costs, a divergence that lands unrepaired, a decision taken where nothing on record settles it; empty if nothing' },
    summary: { type: 'string', description: 'at most 10 lines' },
  },
  required: ['kind', 'decision', 'instructions', 'ruling', 'summary'],
}

// The merged-diff review's judge has the decision land (POSITIONS.md, "A tests-only repair does
// not rerun the gate."): a ruling settled by tests and records only does not hold the batch for
// a repair; its steps go to the next batch, listed for the curator.
const LAND_RULE = 'You have a decision land beside repair, drop and stop: decide land when every finding you uphold is settled by tests and records only, test files of the corpora and files under explorations/, with no source, library, checker, interpreter or specification file changed. Then no repair runs: the batch lands on its gate, and your numbered instructions, written as for a repair worker, go to the next batch with the findings you uphold, listed for the curator. A finding whose settlement needs any other file is a repair, and so is a ruling that mixes the two.'
const REVIEW_JUDGE_SCHEMA = Object.assign({}, JUDGE_SCHEMA, {
  properties: Object.assign({}, JUDGE_SCHEMA.properties, {
    decision: { type: 'string', enum: ['repair', 'land', 'drop', 'stop'], description: 'repair: a repair on the merged tree carries out the instructions; land: every finding upheld is settled by tests and records only, the batch lands on its gate and the instructions go to the next batch; drop: a rung\'s approach is wrong; stop: a fork reserved for the curator' },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps, each with the file:line it rests on: for the repair on repair, for the next batch on land; empty otherwise' },
  }),
})

const GATE_JUDGE_SCHEMA = Object.assign({}, JUDGE_SCHEMA, {
  properties: Object.assign({}, JUDGE_SCHEMA.properties, {
    decision: { type: 'string', enum: ['repair', 'drop', 'stop'], description: 'repair: a repair on the merged tree carries out the instructions; drop: a rung\'s approach is wrong; stop: a fork reserved for the curator' },
  }),
})

// ---------------------------------------------------------------------------
// For the curator. Every item a rung's worker, skeptic or judge, the gather, the review or a
// merged-tree judge marks for the curator becomes an entry of PLAN.md, under one of the two
// sections named below (PLAN.md's own headings). The gather routes the rungs' items, the review
// its own and any the gather missed, a repair on the merged tree its judge's. Nothing waits on
// them: an item not in PLAN.md is logged and carried in the result for the coordinator.
// ---------------------------------------------------------------------------

const PLAN_SECTIONS = ['Pavol\'s answers, in the order they are needed', 'Off the path, parked']
const PLAN_RULE = 'Each item for the curator becomes an entry of explorations/coordinator/PLAN.md: under the heading "' + PLAN_SECTIONS[0] + '" when it asks for a decision or an answer before work on the path can go on, in the group of the phase it must come before; under "' + PLAN_SECTIONS[1] + '" otherwise. The entry says in one or two plain sentences what is asked or told, the default or recommendation on record if there is one, and where the evidence is, by file:line. An item PLAN.md already holds is not written again: name that entry. Several items on one point make one entry.'
const CURATOR_ROUTED = { type: 'array', description: 'one entry per item for the curator this role put into PLAN.md or found there, by its id; several ids may share one entry',
  items: { type: 'object', properties: {
    id: { type: 'string', description: 'the item\'s id, as the role gives it' },
    section: { type: 'string', description: 'the PLAN.md section the entry is in: ' + PLAN_SECTIONS.map(x => '"' + x + '"').join(' or ') },
    entry: { type: 'string', description: 'the entry\'s opening words, enough to find it' },
  }, required: ['id', 'section', 'entry'] } }
const strings = (x) => Array.isArray(x) ? x.filter(t => typeof t === 'string' && t.trim()) : (typeof x === 'string' && x.trim() ? [x] : [])
const numbered = (prefix, list) => strings(list).map((text, i) => ({ id: prefix + '.' + (i + 1), text }))
// A rung's items: its last worker's, its skeptic's and its judges'.
function curatorItemsOf(r) {
  return [].concat(
    numbered(r.rung + '.worker', r.worker && r.worker.forCurator),
    numbered(r.rung + '.skeptic', r.verdict && r.verdict.forCurator),
    numbered(r.rung + '.judge-stop', r.stopJudge && r.stopJudge.forCurator),
    (r.judge && r.judge !== r.stopJudge) ? numbered(r.rung + '.judge', r.judge.forCurator) : [])
}
const inPlanSection = (x) => typeof x === 'string' && PLAN_SECTIONS.some(sec => x.toLowerCase().indexOf(sec.toLowerCase().replace(/^pavol's /, '')) >= 0)
const routedIds = (results) => new Set([].concat.apply([], results.filter(Boolean).map(x => Array.isArray(x.curatorItems) ? x.curatorItems : []))
  .filter(e => e && typeof e.id === 'string' && inPlanSection(e.section)).map(e => e.id))

// ---------------------------------------------------------------------------
// The stages on the merged tree, in the main tree.
// ---------------------------------------------------------------------------

const MAIN_TREE_ROLE = [
'',
'---',
'',
'You work in the main tree, ' + MAIN + ', on branch main; the rungs\' worktrees are read-only history to you. Set up each call as the skill\'s build-and-caches.md says. The batch\'s base is ' + BASE + '. Commit locally with the skill\'s footer; push only if your role says so. Another agent of this batch may work in this tree at the same time: if a git command fails on index.lock, wait five seconds and retry, up to four times.',
'',
].join('\n')

// The texts a rung's agents returned for its files, for the gather to write where the branch
// lacks the file: the skeptic writes the worker's REPORT.md and record.md onto the branch from
// the run's journal, so these are the fallback when it could not, and the source when a repair
// round's texts replace the worker's (journal-text.py takes the last result of the labels).
const TEXT_TOOL = TOOLS + '/journal-text.py'
function rungTextCommands(r) {
  const dir = 'explorations/compile-ladder/' + r.slug + '/'
  const cmd = (file, field, labels) => 'python3 ' + TEXT_TOOL + ' --out ' + dir + file + ' ' + field + ' ' + labels
  const workers = ['rung', 'resume', 'repair'].map(p => p + ':' + r.rung).join(' ')
  const out = { 'REPORT.md': cmd('REPORT.md', 'reportText', workers), 'record.md': cmd('record.md', 'recordText', workers) }
  if (r.verdict) out['SKEPTIC.md'] = cmd('SKEPTIC.md', 'skepticText', 'skeptic:' + r.rung)
  return { textCommands: out, repaired: !!r.repaired }
}

function gatherRole(approved, notLanded, items) {
  return MAIN_TREE_ROLE + [
'# Your role: gather',
'',
'Compose one clean local commit per approved rung on main, then one that closes the ledger rows the rungs fixed. Nothing is merged: each branch stays as it is. You write the batch record, ' + BATCH_DIR + '/RECORD.md, once, last, with every hash it needs; no later stage rewrites it.',
'',
'First check that git status --porcelain is empty and that ' + BASE + ' is an ancestor of HEAD (git merge-base --is-ancestor); report it if not.',
'',
'## The order the rungs go in',
'',
'Ascending order of each rung\'s lowest edited line in the files two or more rungs share, so that a later rung\'s hunk does not shift the lines a landed record cites: work it out from git diff ' + BASE + '...<branch> per branch before you apply anything, and say in your result what order you chose and why.',
'',
'## For each rung, in that order',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > tmp/gather/<slug>.patch, then git apply --3way --index on it. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: in unrelated regions, resolve it by hand from both sides and say so; where both changed the same logic, do not guess: leave the tree clean, and return with the conflict named. Then its files under explorations/compile-ladder/<slug>/. The branch carries REPORT.md and record.md where the skeptic wrote them from the run\'s journal, and SKEPTIC.md. Where it lacks one, run that file\'s command from textCommands below, from ' + MAIN + ' (the journal tool finds the journal itself), and compose nothing; where the rung had a repair round (repaired true), run the REPORT.md and record.md commands even where the branch carries the files, since the repair round\'s texts replace the worker\'s. A command that exits 1 wrote nothing: report the file missing; so is a SKEPTIC.md whose text is only the word committed.',
'2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file\'s README gives the rule), after the section\'s last entry: the fact, its source and its test in a few lines. Each ledger note with ' + LEDGER + ' note N "TEXT". Each new row: its line, its number cell ?, into a file under tmp/gather/, then ' + LEDGER + ' add FILE --section "TITLE", the section its writer names or the one its class fits; the tool numbers it and checks it against the template, and a row it refuses you correct to the template, keeping its claim. Replace the row\'s placeholder (NEW-<rung>-<n>) with its number everywhere the rung\'s files and tests cite it, before the rung\'s commit. The handover line in the first section of explorations/microgpt-run-c-handover.md. The rung\'s "Revival change" section is folded into no file: copy it, both its parts word for word, or its line "Revival change: none" with the reason, to tmp/gather/<slug>-revival-change.md for step 7. Write nothing under .claude/: the batch writes no skill text, and the skill writer writes the skill from RECORD.md after the landing. Any file:line a record cites that an earlier rung\'s hunk shifted is re-anchored by symbol.',
'3. The corrections still owed: each leftForGather item of the rung\'s skeptic, below; each sentence of the specification that the rung\'s REPORT.md lists as made false by its change and that the rung did not edit, an Appendix I Effect or a note on walk or the compiled path, corrected to what the code does, each clause checked against the code line it states. Such a sentence states what the code does, so it is not a text mismatch.',
'4. Its items for the curator, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, at the line it is now at.',
'   A text mismatch is not blocking. Where one rung\'s specification text and another rung\'s code disagree and the decisions on record settle it, fix the side they settle. Where they do not, it is reversible and lands as a point to report: the text stands as the rung wrote it; the path that departs gets a ledger row and a gated XXX test asserting the text\'s rule; the text\'s entry in Specification/appendices/changes.tex names that row among its departures; all in the later rung\'s commit, and the mismatch goes in your forCurator.',
'5. One commit: the applied source and tests, the rung\'s REPORT.md, SKEPTIC.md and JUDGE.md if any, a decision record if it has one (record.md is folded, not landed: take it out of the index and the tree once step 2 has folded it), FACTS.md, the ledger and its history file, the handover, and PLAN.md when step 4 wrote to it. Stage them by an explicit list and read git diff --cached --stat before you commit. Title: what the repair does, in plain words; body: the two or three sentences of record.md that say why, and where the commit touches any path outside explorations/ and .claude/, a line beginning "historical:" naming the files of the original 2012 tree it edits, from the provenance block. The skill\'s footer. Do not push.',
'',
'## After the rungs',
'',
'6. Close each row a landed rung fixed, as its rowsClosed and REPORT.md name it, once its test passes on the merged tree as the rung last ran it: ' + LEDGER + ' close N --commit <the rung\'s commit on main> --test <the test>. Then ' + LEDGER + ' check. One commit, titled "Close the rows climb batch ' + BATCH + ' fixed".',
'7. ' + BATCH_DIR + '/RECORD.md: the rungs applied, in what order and why, each with its commit hash; the rows opened (number, rung, claim) and closed; each skeptic\'s fixes and contested rulings, by commit; every file written from the journal; the rungs that did not land (below); the points to report every landed rung reached, from the lists below; the items for the curator and where each is in PLAN.md; and last, under the heading "Revival changes, for the skill writer", one subsection per landed rung, headed by the rung, holding its "Revival change" section from tmp/gather/<slug>-revival-change.md, both parts word for word (the change, and its provenance), or its line "Revival change: none" with the reason. One commit.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nTheir source is not applied and their branches stay as they are. Their skeptics\' findings are about the tree, not the rung, so fold them under a heading "Not landed" in RECORD.md, one section per rung: the reason it did not land and the findings of its SKEPTIC.md; and add the new rows its record.md holds through ' + LEDGER + ' add, as step 2 says, in the commit that carries RECORD.md. Its items for the curator go into PLAN.md as step 4 says. Take its REPORT.md and SKEPTIC.md out of its branch by an explicit list of paths (git checkout <branch> -- <path>), writing a missing one with its command; apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || (r.verdict && r.verdict.refusalReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [] }, rungTextCommands(r))), null, 2) + '\n'
  : '## The rungs that did not land\n\nNone: every rung of this batch was approved.'),
'',
'The approved rungs, with what their skeptics fixed and left, their rows and their points to report:',
'',
JSON.stringify(approved.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state,
  historicalFiles: (r.worker && r.worker.historicalFiles) || [], rowsClosed: (r.worker && r.worker.rowsClosed) || [], newRows: (r.worker && r.worker.newRows) || [],
  skepticFixes: ((r.verdict && r.verdict.fixes) || []).map(f => f && (f.commit + ' ' + f.kind + ': ' + f.finding)),
  rulings: (r.judge && r.judge.rulings) || [], leftForGather: (r.verdict && r.verdict.leftForGather) || [],
  pointsReached: [].concat((r.worker && r.worker.pointsReached) || [], (r.verdict && r.verdict.pointsReached) || []) }, rungTextCommands(r))), null, 2),
'',
'The items for the curator, by id (' + (items.length ? items.length + ' of them' : 'none') + '):',
'',
JSON.stringify(items, null, 2),
'',
'Return the structured result the tool requires: each rung\'s commit hash, the order and why, the conflicts and how each was resolved, the rows opened and closed, forCurator (your own points, a text mismatch the decisions do not settle among them, as gather.1, gather.2), curatorItems, one entry for every id above and every gather.N with the PLAN.md section and entry that holds it, and curatorUnrouted, every id you could not put in, with the reason. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
'',
  ].join('\n')
}

const GATHER_SCHEMA = {
  type: 'object',
  properties: {
    commits: { type: 'array', items: { type: 'object', properties: { rung: { type: 'string' }, hash: { type: 'string' }, files: { type: 'array', items: { type: 'string' } } }, required: ['rung', 'hash'] } },
    applyOrder: { type: 'string', description: 'the order the rungs were applied in and the lowest edited line that decided it' },
    conflicts: { type: 'array', items: { type: 'string' }, description: 'each hunk that did not apply cleanly, the file, and how it was resolved or that it was not' },
    unresolved: { type: 'boolean', description: 'true if a conflict was left unresolved and the tree was returned to clean' },
    rowsOpened: { type: 'array', items: { type: 'string' }, description: 'one line per row added: its number, its placeholder and its rung' },
    rowsClosed: { type: 'array', items: { type: 'string' }, description: 'one line per row closed: its number, the commit and the test' },
    notLandedFolded: { type: 'array', items: { type: 'string' } },
    head: { type: 'string', description: 'the hash HEAD is at when you finish' },
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every point for the curator this gather finds itself, one entry each with its evidence as file:line; each goes into PLAN.md as gather.1, gather.2 in this order; empty if none' },
    curatorItems: CURATOR_ROUTED,
    curatorUnrouted: { type: 'array', description: 'every item for the curator you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'curatorItems', 'curatorUnrouted', 'summary'],
}

// The merged-diff review, once, beside the gate (POSITIONS.md, "A blocking second review does
// not hold a green batch.": it stays inside the batch as the check of the merged tree's records,
// the points and the routing before the push). Since the redesign it also reads every commit
// made after a worker's, a skeptic's fixes and a repair round, which no second skeptic reads,
// and it no longer re-reads what the skeptic read on each rung (the provenance lines, the three
// homes) or what the commit stage checks (the footers).
function reviewRole(gather, label, items, checkingByRung) {
  return MAIN_TREE_ROLE + [
'# Your role: merged-diff reviewer',
'',
'The rungs were checked one at a time in their own worktrees; nobody has yet read the changes together, nor the record as the gather folded it. You read both. THE GATE IS RUNNING BESIDE YOU in this same tree, on the gather\'s commits: keep your own corrections inside explorations/, and the gate\'s result stands.',
'',
'The composed commits: git log ' + BASE + '..HEAD; the whole change: git diff ' + BASE + '...HEAD. The gather returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The commits each rung\'s branch holds after its worker\'s, which no agent has read since its skeptic or its judge made it:',
'',
JSON.stringify(checkingByRung, null, 2),
'',
'Check, and cite file:line for every finding:',
'1. No two rungs add or change the same declaration, method, trait body or operator, and no rung\'s edit depends on another\'s for its meaning or its test; and what two rungs\' changes do together: a change one rung made wrong by another\'s.',
'2. Each fix above, as the gather applied it: it does what its finding says and only that; a defect fix has its test, seen failing through the harness on the worker\'s head and then passing, in its maker\'s transcript (the run\'s directory: ' + runDirLine('review').trim() + '; then grep for its label in "$D"/agent-*.meta.json and read the transcript with jq, never whole); a settled fix cites a sentence that settles it; a fix a judge reverted is gone from the tree.',
'3. The folded record as a whole: every FACTS line true as written, sourced and checkable; every ledger note and new row in place (' + LEDGER + ' check passes; no NEW- placeholder left where a row is cited: grep -rn "NEW-[A-Z]-[0-9]" explorations/fortress-gap-ledger.md explorations/coordinator/FACTS.md explorations/coordinator/PLAN.md explorations/compile-ladder/ ProjectFortress/, where a line of the batch\'s RECORD.md that gives a placeholder beside its number is not a finding, and the batch record and the synthesis under explorations/coordinator/, which name the form as an example, are not searched); every row the gather closed fixed by a landed commit; the handover\'s first section consistent; the revival-change material the gather copied into ' + BATCH_DIR + '/RECORD.md, under "Revival changes, for the skill writer", true of the code as landed.',
'4. Each sentence of the specification a rung\'s REPORT.md lists as made false: corrected, by the rung or the gather, to what the code does.',
'5. The points to report: every one a landed rung reaches, in its hunks or where its REPORT.md or SKEPTIC.md says so, in your pointsReached with the rung, the evidence and holdsPush; true only for a step taken that cannot be undone or acts against a decision on record. It is not a blocking finding.',
'6. The items for the curator: for each id below, the PLAN.md entry the gather\'s curatorItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says; one missing or misplaced you put in yourself in your corrections commit. Your own points go in forCurator, as ' + label + '.1, ' + label + '.2. ' + PLAN_RULE + ' It is not a blocking finding.',
'',
'The items for the curator from the rungs and the gather, by id:',
'',
JSON.stringify(items, null, 2),
'',
'Three kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections". A defect whose repair touches a path outside explorations/ that is not a test file (source, library, checker, interpreter or specification) you do not fix: return it in blockingCode, precisely enough that a judge can rule on it from your words and the diff; a repair runs, and the gate runs again only when it changed a path the gate reads (ProjectFortress/ but test files, Library/, build.xml). A finding settled by tests and records only that you do not fix yourself, a test owed or a test file to change, you return in routed, each with the step the next batch owes; put each into PLAN.md as review-routed.1, review-routed.2 in your corrections commit, and list the ids in curatorItems: it goes to the next batch and holds nothing. A text mismatch the gather filed as a point to report is not blocking: check its row, its XXX test and its Appendix I mention; complete a missing record yourself; return a missing test in routed. Do not run the gate, and do not push.',
'',
'Record the hash HEAD is at before your corrections commit and the hash after, run git diff --name-only <before> <after>, and return both hashes and every path it prints that is not under explorations/. Do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, which are the gate\'s.',
'',
  ].join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    approved: { type: 'boolean', description: 'true if blockingCode is empty after your own record fixes' },
    blockingCode: { type: 'array', items: { type: 'string' }, description: 'findings whose repair touches a path outside explorations/ that is not a test file, each with file:line and the rule or claim it breaks; empty if none' },
    routed: { type: 'array', items: { type: 'string' }, description: 'findings settled by tests and records only that you did not fix, each with file:line and the step the next batch owes; each into PLAN.md as review-routed.N; empty if none' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'record or mechanical defects you fixed, and the commit hash' },
    fixesChecked: { type: 'array', items: { type: 'string' }, description: 'one line per skeptic fix or repair commit you checked: the commit and what you found' },
    headBefore: { type: 'string' },
    headAfter: { type: 'string' },
    pathsOutsideExplorations: { type: 'array', items: { type: 'string' }, description: 'every path from git diff --name-only <headBefore> <headAfter> that is not under explorations/; empty if none' },
    pointsReached: STATE_SCHEMA_POINTS,
    forCurator: { type: 'array', items: { type: 'string' }, description: 'every point for the curator this review finds, with its evidence as file:line; empty if none' },
    curatorItems: CURATOR_ROUTED,
    summary: { type: 'string' },
  },
  required: ['approved', 'blockingCode', 'routed', 'fixed', 'fixesChecked', 'pointsReached', 'forCurator', 'curatorItems', 'summary'],
}

// ---------------------------------------------------------------------------
// The gate. Its steps and their reasons are the skill's gate.md, which this role follows; what
// stands here is what the skill points to the script for: the calls of the shell functions that
// write and compare the summary and the ladder (tools/gate-functions.sh, which a gate run by hand
// sources too), the atomic runs' lines in the summary, the checker count and the distance stage
// (the ladder's metrics, which the skill does not carry: POSITIONS.md, "The skills are written for
// a reader new to the repository ..."), testSpecData once a rung brings it, and the machine line.
// It commits nothing: the review commits in this tree beside it, and the commit stage lands its
// outputs.
// ---------------------------------------------------------------------------

const ATOMIC_OTHER = 'atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2'
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG'
const GATE_FUNCTIONS = TOOLS + '/gate-functions.sh'   // gate_summary, gate_compare, last_landed_summary, ladder_filter, ladder_compare, mg_phases; its gate_summary writes the machine line

function gateRole(expectedMoves, expectedChecker, specData) {
  return MAIN_TREE_ROLE + [
'# Your role: the gate',
'',
'Run the full gate once on the tree as it stands, as the skill\'s gate.md gives it, and report what it says. You change no source and commit nothing: the review is committing in this tree beside you, and the commit stage lands your outputs. Logs go to ' + LOG_DIR + '/, which is untracked; your three outputs are ' + GATE_OUT + '/summary.txt, checker-count.txt and distance.txt, written by the functions and scripts below and never by hand. Start every long step detached with nohup and wait for it with wait_for, both as the skill\'s session.md, "Long commands", gives them.',
'',
'1. mkdir -p ' + LOG_DIR + ' ' + GATE_OUT + '. The disk check of gate.md\'s step 1.',
'2. rm -rf ProjectFortress/TEST-RESULTS, then ant compileAll to ' + LOG_DIR + '/compileAll.txt; BUILD SUCCESSFUL must end it. At once, before step 3, start the distance stage in the background, once per gate run and never a second beside it; it reads only ProjectFortress/build and the library sources, with its own caches and temporary folder, and step 9 reads it:',
'',
'        nohup bash -c \'( ' + DIST_RUN + ' ' + GATE_OUT + '/distance.txt ' + LOG_DIR + '/distance ) > ' + LOG_DIR + '/distance.txt 2>&1; echo EXIT=$? >> ' + LOG_DIR + '/distance.txt\' >/dev/null 2>&1 &',
'',
'3. If step 2\'s build printed "Caches <tree>/default_repository/caches started again, empty", run the library order (the skill\'s build-and-caches.md) to ' + LOG_DIR + '/library.txt. Then, before anything else compiles into the caches, the ladder\'s two copies: mkdir -p ' + LOG_DIR + '/ladder/root, then cp -a default_repository/caches to ' + LOG_DIR + '/ladder/root/ladder-caches and to ' + LOG_DIR + '/ladder/root/pristine.',
'4. ant testFast to ' + LOG_DIR + '/testFast.txt, then ant testSystem to ' + LOG_DIR + '/testSystem.txt, never both at once. Both run at four threads, pinned in build.xml whatever the shell exports (POSITIONS.md, "The suites run Fortress in parallel.").' + (specData
  ? ' Then ant testSpecData to ' + LOG_DIR + '/testSpecData.txt: ' + specData + '; every example must pass.'
  : ''),
'5. The summary, with the machine it ran on, and its comparison with the last landed one. Its functions, and those of step 7, are in ' + GATE_FUNCTIONS + ': source it from ' + MAIN + ', with FORTRESS_HOME set as the skill\'s build-and-caches.md says, in each call that uses them, since each call starts a new shell:',
'',
'        source ' + GATE_FUNCTIONS,
'',
'   Then gate_summary ' + LOG_DIR + ' ' + GATE_OUT + '/summary.txt "gate batch ' + BATCH + '", and gate_compare "$(last_landed_summary)" ' + GATE_OUT + '/summary.txt. A COUNT DOWN or SUITE GONE line is red, with the suite named: it almost always means a .test file or a tests= line went missing. A count that went up is the batch\'s new tests. A suite that is new in the summary is not red by itself.',
'6. The four-thread atomic runs of gate.md, their lines appended to the summary:',
'',
'        ATOMIC_OTHER="' + ATOMIC_OTHER + '"        # other_compiler_tests/',
'        ATOMIC_COMPILER="' + ATOMIC_COMPILER + '"  # compiler_tests/',
'        atomic_runs () {                  # atomic_runs <out-file>; appends "# atomic ..." lines, exit 1 if any is not PASS',
'            local O="$1" p d i out rc',
'            case "$O" in /*) ;; *) O="$PWD/$O" ;; esac     # resolve before the cd',
'            cd "$FORTRESS_HOME/ProjectFortress" || return 1',
'            for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do',
'                case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac',
'                [ -f "$d/$p.fss" ] || { echo "# atomic $p ABSENT" >> "$O" ; continue ; }',
'                if ! timeout -k 5 300 ../bin/fortress compile "$d/$p.fss" >/dev/null 2>&1 ; then',
'                    echo "# atomic $p COMPILE-FAILED" >> "$O" ; continue',
'                fi',
'                for i in 1 2 3 ; do',
'                    out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?',
'                    if [ "$rc" -eq 124 ] ; then',
'                        out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?',
'                        [ "$rc" -eq 124 ] && { echo "# atomic $p run$i threads=4 TIMEOUT-TWICE" >> "$O" ; continue ; }',
'                    fi',
'                    case "$out" in',
'                      *FAIL*) echo "# atomic $p run$i threads=4 FAIL" >> "$O" ;;',
'                      *PASS*) echo "# atomic $p run$i threads=4 PASS" >> "$O" ;;',
'                      *)      echo "# atomic $p run$i threads=4 NO-PASS rc=$rc" >> "$O" ;;',
'                    esac',
'                done',
'            done',
'            ! grep -q \'FAIL\\|TIMEOUT-TWICE\\|NO-PASS\\|COMPILE-FAILED\' "$O"',
'        }',
'',
'   Run atomic_runs ' + GATE_OUT + '/summary.txt: 42 lines. Any FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE is red; a single timeout whose re-run passes is not.',
'7. The ladder regression, as gate.md\'s "The ladder regression" runs it, with OUT at ' + LOG_DIR + '/ladder and LADDER_ROOT at ' + LOG_DIR + '/ladder/root, where step 3 put the two copies. The eighteen microGPT components are compiled only, never linked or run here. Compare with ladder_compare and mg_phases from ' + GATE_FUNCTIONS + ', sourced as in step 5:',
'',
'   ladder_compare explorations/compile-ladder/baseline-2026-09-19 ' + LOG_DIR + '/ladder, and diff <(mg_phases explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md) <(mg_phases ' + LOG_DIR + '/ladder/microgpt-phase.md). Append the output to the summary, each line prefixed "# ladder ", and copy ladder.tsv, microgpt-phase.md and the comparison into ' + GATE_OUT + '/ladder/. A DOWN, a STDOUT or a MISSING line is red unless the manifest declared it; a move up is the batch\'s result. Declared moves:',
'',
(expectedMoves.length ? expectedMoves.map(m => '     - ' + m).join('\n') : '     (none: no rung of this batch expects to move a ladder file)'),
'',
'8. The checker count: the compiled checker over the interpreter\'s library, compared with the last landed table. Read the header of ' + COUNT_RUN + ', then run it from ' + MAIN + ':',
'',
'        ' + COUNT_RUN + ' ' + GATE_OUT + '/checker-count.txt ' + LOG_DIR + '/checker-count',
'',
'        last_landed_checker_count () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/checker-count.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' | grep -m1 \'checker-count.txt$\'',
'        }',
'        checker_compare () {              # checker_compare <last-landed-table> <this-table> [declared-totals] [declared-crash]; exit 1 if red; the total is never red',
'            local was now wasc nowc bad=0 decl="${3:-none}"',
'            was=$(awk -F\'\\t\' \'$1 == "#total" { print $2 }\' "$1")',
'            now=$(awk -F\'\\t\' \'$1 == "#total" { print $2 }\' "$2")',
'            wasc=$(awk -F\'\\t\' \'$1 == "#crash" { print $2 }\' "$1")',
'            nowc=$(awk -F\'\\t\' \'$1 == "#crash" { print $2 }\' "$2")',
'            [ -n "$now" ] || { echo "NO TOTAL   the table has no #total row" ; return 1 ; }',
'            if [ "$now" -gt "$was" ] ; then echo "COUNT UP   $was -> $now, declared $decl"',
'            elif [ "$now" -lt "$was" ] ; then echo "COUNT DOWN   $was -> $now, declared $decl"',
'            else echo "COUNT SAME   $now, declared $decl" ; fi',
'            if [ "$nowc" != "$wasc" ] ; then',
'                if [ -n "${4:-}" ] && [ "$nowc" = "$4" ] ; then echo "CRASH DECLARED   $wasc -> $nowc"',
'                else echo "CRASH CHANGED   $wasc -> $nowc" ; bad=1 ; fi',
'            fi',
'            case "$(awk -F\'\\t\' \'$1 == "#shadow" { print $2 }\' "$2")" in',
'              STALE*) echo "SHADOW STALE   the instrumented StaticChecker copy no longer matches the tracked one" ; bad=1 ;;',
'            esac',
'            diff "$1" "$2" | sed \'s/^/    /\'',
'            [ "$bad" = 0 ]',
'        }',
'',
'   Run checker_compare "$(last_landed_checker_count)" ' + GATE_OUT + '/checker-count.txt "' + ((expectedChecker && expectedChecker.counts && expectedChecker.counts.length) ? expectedChecker.counts.join(', ') : 'none') + '"' + ((expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length) ? ' "' + expectedChecker.crashes[0].replace(/^[^:]*: /, '') + '"' : '') + ' and append its output to the summary, each line prefixed "# checker ". The total is reported and never red (POSITIONS.md, "The checker count is measured, never red."); a crash line no rung declared, and SHADOW STALE, are red.',
'9. The distance stage started at step 2: wait for it with wait_for ' + LOG_DIR + '/distance.txt, called again until it prints its EXIT= line, and never start it again. Then ' + DIST_COMPARE + ' "$(git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \'explorations/compile-ladder/gate-baseline/distance.txt\' \'explorations/compile-ladder/climb-batch-*/gate/distance.txt\' | grep -m1 \'distance.txt$\')" ' + GATE_OUT + '/distance.txt, its output appended to the summary, each line prefixed "# distance ". It is reported and never red, whatever it prints.',
'',
'## What green means',
'',
'Zero failures and zero errors in every suite of testFast and testSystem' + (specData ? ' and testSpecData' : '') + ', BUILD SUCCESSFUL on each build and suite, no COUNT DOWN and no SUITE GONE line, every atomic run PASS, no undeclared DOWN, STDOUT or MISSING line from the ladder, and from the checker count an unchanged crash line, unless a rung declared it, and no stale shadow. Anything else is red. Return the structured result; if red, name every failing test and copy the first failure\'s output lines into it.',
'',
  ].join('\n')
}

const GATE_SCHEMA = {
  type: 'object',
  properties: {
    green: { type: 'boolean' },
    compileAll: { type: 'string', description: 'BUILD SUCCESSFUL or the first error' },
    testFast: { type: 'string', description: 'suites, tests, failures, errors' },
    testSystem: { type: 'string', description: 'shards, tests, failures, errors' },
    testSpecData: { type: 'string', description: 'tests, failures, errors, or not run' },
    countsDown: { type: 'array', items: { type: 'string' }, description: 'every COUNT DOWN or SUITE GONE line, with the suite named; empty if none' },
    atomicFourThread: { type: 'string', description: 'how many of the 42 runs PASS, and every line that is not PASS' },
    ladder: { type: 'string', description: 'moves up, moves down, stdout differences, and which were declared' },
    checkerCount: { type: 'string', description: 'the total, the last landed total, the crash line, every verdict line, the rows that moved' },
    distance: { type: 'string', description: 'the table\'s #total, the verdict line of compare.sh with the last landed total, the kinds and classes that moved, the crashes that went or came, #seconds and #shadow; or why the run produced no table' },
    failing: { type: 'array', items: { type: 'string' }, description: 'failing test names with the key output line each' },
    stopped: { type: 'boolean', description: 'true if the gate could not be run (disk, a build failure before the tests)' },
    summary: { type: 'string' },
  },
  required: ['green', 'failing', 'stopped', 'summary'],
}

// After a repair on the merged tree, the gate runs again only for a path it reads (POSITIONS.md,
// "A tests-only repair does not rerun the gate." and "Nothing is built or run twice on the same
// code."): under ProjectFortress/ but a test file a passing run of the repair exercised, under
// Library/, or build.xml. Every other path, the specification's text and the skill's among them,
// leaves the first gate's tables standing, recorded beside its summary.
const TEST_FILE = /^ProjectFortress\/(tests|[A-Za-z_]+_tests)\/[^/]+\.(fss|fsi|test)$/
const repoPath = (p) => p.trim().replace(/^\.\//, '')
const codePathsOf = (paths) => strings(paths).map(repoPath).filter(p => !p.startsWith('explorations/') && !p.startsWith('.claude/') && !TEST_FILE.test(p))
const testPathsOf = (paths) => strings(paths).map(repoPath).filter(p => TEST_FILE.test(p))
const GATE_READS = 'ProjectFortress/, Library/ or build.xml'
const gateReads = (p) => /^(ProjectFortress|Library)\//.test(p) || p === 'build.xml'
const gateCodeOf = (paths) => codePathsOf(paths).filter(gateReads)
const ungatedOf = (paths) => codePathsOf(paths).filter(p => !gateReads(p))

function repairTestsStep(kind, failing) {
  return [
'',
'## Your tests, and whether the gate runs again',
'',
'Record the hash HEAD is at before your first commit and after your last, return both, and in pathsChanged every path git diff --name-only <before> <after> prints. The script decides from it whether the whole gate runs again after you: a path the gate reads that is not a test file (under ProjectFortress/ or Library/, or build.xml) reruns it; the specification\'s text and other prose do not, and the first gate\'s tables stand beside a record of those paths; test files do not, when your runs below pass them.',
'',
'Every test file you add or change you run in the harness on the merged tree, placed where the gate reads it, all the files of one corpus together in one JVM, as the gate\'s tracks run them (the skill\'s tests-running.md: ONE_JVM=1 junit.sh for the .test files of each compiled corpus, harness-one.sh once for the interpreter tests), each run captured under ' + LOG_DIR + '/repair-' + kind + '-tests/, not committed. In testRuns return one entry per file: the file, the test paths its lines exercise, the summary row it adds to (fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system), the JUnit cases it adds, its verdict (pass only when its run printed OK), and the capture. A test path you changed that no run exercises, or a run that did not pass, reruns the gate.',
...(kind === 'gate' ? [
'',
'The gate was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'In failingAnswered return one entry per line, in order: the line, and the testRuns file whose passing run now answers it, or empty where none does. The gate does not run again only when every line is answered and your commit changed no path that reruns it.',
] : strings(failing).length ? [
'',
'The gate that ran beside the review was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'Your ruling is the review\'s: take on no line it does not touch. Where your ruling\'s edit is to the test a line names and your run passes it, that run answers the line. In failingAnswered return one entry per line, in order, with the answering file or empty. When every line is answered and your commit changed no path that reruns the gate, no gate judge and no gate repair run after you.',
] : []),
'',
  ]
}

function mergedRepairRole(decision, kind, failing) {
  return MAIN_TREE_ROLE + [
'# Your role: repair on the merged tree (' + kind + ')',
'',
...sliceStep(RUNGS, 'the main tree (' + MAIN + ')', 'First, for the rungs the ruling\'s instructions name and no other (by letter, slug or a path a rung\'s commit changed),'),
'   Run none where the instructions name no rung.',
'',
'The judge has ruled on the merged tree; you carry out the ruling. Its decision:',
'',
JSON.stringify(decision, null, 2),
'',
(strings(decision && decision.forCurator).length
  ? 'The judge marked these for the curator. ' + PLAN_RULE + ' The entries go in your commit, and curatorItems lists each by its id.\n\n' + JSON.stringify(numbered('judge-' + kind, decision.forCurator), null, 2) + '\n\n'
  : '') + 'Its full ruling is ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order; where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Every edit of code is test first, as the skill\'s tests-writing.md says; build what your edit needs (build-and-caches.md); commit locally, one commit, the records updated where the ruling says, a historical: line in the body if the commit touches a file of the 2012 tree. Do not run the full gate and do not push.',
...repairTestsStep(kind, failing),
  ].join('\n')
}

const MERGED_REPAIR_SCHEMA = Object.assign({}, RUNG_SCHEMA, {
  properties: Object.assign({}, RUNG_SCHEMA.properties, {
    curatorItems: CURATOR_ROUTED,
    headBefore: { type: 'string', description: 'the hash HEAD was at before your first commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after your last commit' },
    pathsChanged: { type: 'array', items: { type: 'string' }, description: 'every path git diff --name-only <headBefore> <headAfter> prints' },
    testRuns: { type: 'array', description: 'one entry per test file added or changed outside explorations/, run on the merged tree with the other files of its corpus; empty if none',
      items: { type: 'object', properties: {
        file: { type: 'string' },
        paths: { type: 'array', items: { type: 'string' } },
        suite: { type: 'string', description: 'fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system' },
        cases: { type: 'integer' },
        verdict: { type: 'string', enum: ['pass', 'fail'] },
        capture: { type: 'string' },
      }, required: ['file', 'paths', 'suite', 'cases', 'verdict', 'capture'] } },
    failingAnswered: { type: 'array', description: 'one entry per line of the gate\'s failing list when it is in your role; otherwise empty',
      items: { type: 'object', properties: { failing: { type: 'string' }, file: { type: 'string' } }, required: ['failing', 'file'] } },
  }),
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'pointsReached', 'summary', 'headBefore', 'headAfter', 'pathsChanged', 'testRuns'],
})

// Whether the gate runs again after a repair on the merged tree (repairRerun): when the repair,
// or the review's corrections before it, changed a path the gate reads that is not a test file;
// when a test path they changed is not exercised by a passing run; when the repair did not say
// what it changed; and, after the gate's repair, when the gate's own counts fell, when it named
// no failing line, or when a line it failed on is not answered by a passing run.
function repairRerun(repair, reviewPaths, redGate) {
  if (!repair) return { rerun: true, why: 'the repair returned nothing' }
  if (!Array.isArray(repair.pathsChanged)) return { rerun: true, why: 'the repair did not list the paths it changed' }
  const changed = strings(repair.pathsChanged).concat(strings(reviewPaths))
  const code = gateCodeOf(changed)
  if (code.length) return { rerun: true, why: 'changed a path the gate reads (' + GATE_READS + '), not a test file: ' + code.join(', ') }
  const runs = Array.isArray(repair.testRuns) ? repair.testRuns.filter(t => t && typeof t === 'object') : []
  const passing = runs.filter(t => t.verdict === 'pass')
  if (passing.length < runs.length) return { rerun: true, why: 'a test run of the repair did not pass: ' + runs.filter(t => t.verdict !== 'pass').map(t => t.file).join(', ') }
  const exercised = new Set([].concat.apply([], passing.map(t => testPathsOf([t.file].concat(strings(t.paths))))))
  const unrun = testPathsOf(changed).filter(p => !exercised.has(p))
  if (unrun.length) return { rerun: true, why: 'test path(s) no passing run of the repair exercises: ' + unrun.join(', ') }
  const lines = redGate ? strings(redGate.failing) : []
  if (redGate) {
    if (strings(redGate.countsDown).length) return { rerun: true, why: 'the gate\'s own counts fell or a suite went: ' + strings(redGate.countsDown).join('; ') }
    if (!lines.length) return { rerun: true, why: 'the gate was red and named no failing line for the repair to answer' }
    const answers = Array.isArray(repair.failingAnswered) ? repair.failingAnswered : []
    const passed = new Set(passing.map(t => repoPath(String(t.file))))
    const open = lines.filter(l => !answers.some(a => a && String(a.failing).trim() === l.trim() && typeof a.file === 'string' && passed.has(repoPath(a.file))))
    if (open.length) return { rerun: true, why: 'gate line(s) no passing run of the repair answers: ' + open.join('; ') }
  }
  const ungated = ungatedOf(changed)
  const kinds = [testPathsOf(changed).length ? 'test files' : '', ungated.length ? 'paths no gate stage reads (' + ungated.join(', ') + ')' : ''].filter(Boolean)
  return { rerun: false, runs: passing, answered: lines.length ? repair.failingAnswered : [], ungated, why: (kinds.length ? kinds.join(', ') + ' and ' : '') + 'records only' }
}

// The push is held only by a step taken that cannot be undone, or that acts against a decision
// on record (POSITIONS.md, "Reversible stops do not hold a batch."; the curator's comment of
// 2026-10-06: points to report, not stops). Read from each landed rung's last worker and its
// skeptic, the review, and the repairs on the merged tree; an entry that is not an object with a
// boolean holdsPush holds too.
function pushHeldBy(landed, review, repairs) {
  const holds = (s) => !(s && typeof s === 'object' && typeof s.holdsPush === 'boolean') || s.holdsPush
  const line = (id, s) => id + ': ' + ((s && s.point) || String(s)) + ((s && s.evidence) ? ' (' + s.evidence + ')' : '')
  const own = [].concat.apply([], landed.map(r => [].concat((r.worker && r.worker.pointsReached) || [], (r.verdict && r.verdict.pointsReached) || [])
    .filter(holds).map(s => line(r.rung, s))))
  const reviewed = ((review && review.pointsReached) || []).filter(holds).map(s => line((s && s.rung) || 'review', s))
  const repaired = [].concat.apply([], Object.keys(repairs || {}).filter(k => repairs[k]).map(k => (repairs[k].pointsReached || []).filter(holds).map(s => line(k, s))))
  return own.concat(reviewed, repaired)
}

// The repairs whose tests, or whose paths no gate stage reads, stand beside the gate's summary
// instead of a second gate: each { kind, runs, answered, ungated, commits }.
function besideStep(beside) {
  if (!beside.length) return []
  const cases = [].concat.apply([], beside.map(b => b.runs || [])).reduce((n, t) => n + (Number(t.cases) || 0), 0)
  const runs = beside.some(b => (b.runs || []).length)
  const ungated = beside.some(b => strings(b.ungated).length)
  return [
'1a. The gate below ran on the tree before a repair on the merged tree, or the review\'s corrections, that changed no path the gate reads (' + GATE_READS + ') but test files the repair ran, so it did not run again (POSITIONS.md, "A tests-only repair does not rerun the gate."): its tables stand. Record that beside the summary, in step 1\'s commit, after the gate\'s own lines, tab-separated:'
  + ' ' + [ungated ? 'for each entry below with ungated paths, a line "# repair-ungated" with its kind, its commits and those paths, saying that the tables above are of the tree before them' : '',
           runs ? 'one line per run below, prefixed "# repair-tests", with the repair\'s kind, the summary row it adds to, its JUnit cases, its verdict and the file; then, for each line the gate failed on that the repair answered, a line "# repair-tests answered", the gate\'s line and the file whose run answers it; and last "# repair-tests total" with ' + cases + ', the cases these runs add' : ''].filter(Boolean).join('; then ')
  + '. Do not change the gate\'s own rows. The entries:',
'',
JSON.stringify(beside, null, 2),
'',
  ]
}

const COMMIT_TITLE = 'Record the gate\'s tables and the microGPT walk check'
const MG_LOG = LOG_DIR + '/microgpt-walk.txt'
const MG_DIR = LOG_DIR + '/microgpt-walk'

// The commit stage. The gather already put every hash where it belongs and closed the rows the
// batch fixed through ledger.py, so this stage lands the gate's outputs, writes FACTS.md's landed
// figures, runs the microGPT walk check, which takes about a minute (POSITIONS.md, "The microGPT
// walk check is quick."), pushes main to its three branches, and removes the worktrees.
function commitRole(gather, gate, heldBy, beside) {
  const held = heldBy.length > 0
  beside = beside || []
  const answered = beside.some(b => strings((b.answered || []).map(a => a && a.failing)).length)
  const tree = beside.length
    ? 'The gate ran on the tree before a repair, or the review\'s corrections, that changed no path the gate reads but test files the repair ran, and did not run again; its tables stand, ' + (answered ? 'the lines it was red on answered by the repair\'s passing runs' : 'green') + ' (step 1a).'
    : 'The gate is green on the tree as it stands.'
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
tree + (held ? ' Land it on the local main; the script holds the push (step 3).' : ' Land it.'),
'',
'0. Start the microGPT walk check on the landed tree in the background, first, so that it runs while you work, and only if no earlier attempt started it (its log exists once it is started):',
'',
'        [ -e ' + MG_LOG + ' ] || nohup bash -c \'( ' + TOOLS + '/mg-run.sh ' + MG_DIR + ' batch-' + BATCH + ' ) > ' + MG_LOG + ' 2>&1; echo EXIT=$? >> ' + MG_LOG + '\' >/dev/null 2>&1 &',
'',
'   The tool runs the quick pair, MicroGptFlatQuick and MicroGptAplQuick, under walk, both at once, each from an empty private cache: two passes against the reference values, about a minute in all. Never pass it full.',
'1. Copy the gate\'s outputs into the tree: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/, and ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ' (mkdir -p its folder), the per-site list the next batch\'s rungs read as their before. Write the landed figures into explorations/coordinator/FACTS.md, numbers only, from ' + GATE_DIR + '/distance.txt and checker-count.txt: in the entry "The true distance to the switch-over", every figure it gives of the last landed gate, the lines of distance.txt it cites and the batch number in the paths it cites; in "The checker-count stage\'s table", the count\'s total and that path. Change no other word; a sentence the new figures make false you name in your summary for the coordinator. When a landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), build the PDF once, in Specification/fortress/, ./ant genSource then ./ant tex, each logged under ' + LOG_DIR + '/, and copy Specification/fortress/fortress.pdf to Specification/fortress.pdf. Then wait for step 0 with wait_for ' + MG_LOG + ', called again until it prints EXIT= (or 10 minutes have passed, which you then report), and append to ' + GATE_DIR + '/summary.txt its verdict lines, each prefixed "# microgpt-walk ": grep -h "VERDICT\\|^rc=" ' + MG_DIR + '/*.txt for the run\'s folder. A FAIL there is reported, and holds nothing. One commit, titled "' + COMMIT_TITLE + '": the summary, the two tables, ladder/, the per-site list, FACTS.md and the PDF; the logs under ' + LOG_DIR + '/ are never committed.',
...besideStep(beside),
'2. Check every commit since ' + BASE + ' (git log ' + BASE + '..HEAD --format=%B): each ends with the skill\'s two footer lines, none holds a model identifier, and each whose diff touches a path outside explorations/ and .claude/ carries a historical: line. Then run git diff --name-only ' + BASE + ' HEAD -- .claude/: it should print nothing, since a batch writes no skill text (the skill writer writes the skill from ' + BATCH_DIR + '/RECORD.md after the landing). Return every path it prints in skillTouched, for the coordinator; it holds nothing.',
held
  ? '3. Do NOT push: not main and no other branch. The script holds the push, because the batch took steps that cannot be undone or that act against a decision on record, and only the curator lifts them:\n\n' + heldBy.map(h => '- ' + h).join('\n') + '\n\n   Append to ' + BATCH_DIR + '/RECORD.md a paragraph headed "Not pushed." naming each, with its rung and evidence and the hash origin/main stays at; commit it locally.'
  : '3. Push main to its three branches, as the skill\'s committing.md says: git push origin main, then ' + PUSH_BRANCHES.map(b => 'git push origin main:' + b).join(', then ') + '. Retry a failed push up to four times, 2, 4, 8 and 16 seconds apart.',
held
  ? '4. Keep every wip/ worktree and its local branch: their removal follows the push.'
  : '4. For each rung\'s worktree (' + RUNGS.map(r => r.path).join(', ') + ', where it exists): confirm git -C <worktree> status -sb shows nothing ahead of its origin; then git worktree remove <worktree>, without --force (its ignored tmp/, the old code\'s private caches among it, goes with it), and git branch -D <branch>. A worktree git refuses to remove holds uncommitted or untracked work: keep it and its branch, and name it in your result with its git status --short. The base build, ' + BASE_BUILD + ', is the coordinator\'s and stays. Leave the remote wip/ branches.',
'',
'The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The gate stage returned:',
'',
JSON.stringify(gate, null, 2),
'',
'Return the structured result: the hash main is at, the branches pushed (empty when held), pushHeld and heldBy, what was cleaned up, in skillTouched the paths of step 2\'s check of .claude/, and in microgptWalk the verdict lines of the two programs.',
'',
  ].join('\n')
}

const COMMIT_SCHEMA = {
  type: 'object',
  properties: {
    mainHead: { type: 'string' },
    pushed: { type: 'array', items: { type: 'string' }, description: 'the branches pushed; empty when the push is held' },
    cleanedUp: { type: 'array', items: { type: 'string' } },
    pushHeld: { type: 'boolean' },
    heldBy: { type: 'array', items: { type: 'string' } },
    microgptWalk: { type: 'string', description: 'each program\'s VERDICT and rc= lines, or why the check did not finish' },
    skillTouched: { type: 'array', items: { type: 'string' }, description: 'every path git diff --name-only BASE HEAD -- .claude/ prints; empty if none' },
    summary: { type: 'string' },
  },
  required: ['mainHead', 'pushed', 'pushHeld', 'microgptWalk', 'skillTouched', 'summary'],
}

// ---------------------------------------------------------------------------
// An agent that comes back with nothing, and the retry (climb-batch-workflow.md, "An agent that
// comes back with nothing"; "A usage limit stops the run and decides nothing").
//
// agent() returns null for an agent the harness marked failed, even after it delivered its
// result (FACTS.md, "agent() in a Workflow returns null ..."), and throws on a malformed call, a
// spent budget or an abort. callAgent is the one door to agent(): it treats null, undefined and a
// thrown error alike, runs the role again up to two more times, each retry's prompt opening with
// what the earlier attempt may have left (the recover functions below) and its label ending
// ":attempt<n>", so that no two attempts share a journal key; attempt 1 is the call unchanged.
// A usage or rate limit (LIMIT_ERROR), or a role whose nothing would be read as a decision (a
// rung worker, a skeptic or a judge: needed), stops the run and decides nothing; resumeFromRunId
// with the same script and args then runs the stopped role again. The gather, the review, the
// gate, the commit and a repair on the merged tree that come back with nothing keep their
// paths.
// ---------------------------------------------------------------------------

const ATTEMPTS = 3
const LIMIT_ERROR = /usage limit|rate limit|rate_limit|ratelimit|weekly limit|daily limit|hit your .{0,30}limit|limit reached|reached your .{0,30}limit|too many requests|\b429\b/i
let runStop = null

function stopRun(why) {
  if (!runStop) {
    runStop = why
    log('The run stops here, nothing decided: ' + why + '. No agent starts after this. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone (a usage limit reset): the agents that finished come back from the journal, and this role runs again.')
  }
  return new Error('Run stopped, nothing decided: ' + runStop + '. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone; the agents that finished come back from the journal, and the role that stopped it runs again.')
}

function retryHead(role, attempt, recovery) {
  const earlier = attempt === 2 ? 'The first attempt' : 'The first ' + ['', 'one', 'two', 'three', 'four'][attempt - 1] + ' attempts'
  return [
'# Attempt ' + attempt + ' of ' + ATTEMPTS + ' at the role ' + role + ': read this first',
'',
earlier + ' at this same role ended without returning a result to the script: a false positive of the API\'s safety filter, or an agent that died. What came before you may have done none of this role\'s work, part of it, or all of it. What it left is yours: read it first, continue from where it stopped rather than redo it, and return the result your role asks for. Say in your summary that you are attempt ' + attempt + ', what you found, and what you took over.',
'',
'What ' + (attempt === 2 ? 'the earlier attempt' : 'the earlier attempts') + ' may have left, and how to take it over:',
'',
...recovery.map(s => '- ' + s),
'',
'The brief below is the one the first attempt received, word for word. Where it assumes a fresh start, read it as continuing from the state you found.',
'',
  ].join('\n')
}

async function callAgent(prompt, opts, recovery, needed) {
  const role = opts.label
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (runStop) throw stopRun()
    const retry = attempt > 1
    let result = null
    let why = 'no result (null: the agent died, was blocked, or was skipped)'
    try {
      result = await agent(retry ? retryHead(role, attempt, recovery) + prompt : prompt,
                           retry ? Object.assign({}, opts, { label: role + ':attempt' + attempt }) : opts)
    } catch (e) {
      const msg = String((e && e.message) || e).slice(0, 300)
      if (LIMIT_ERROR.test(msg)) throw stopRun(role + ', attempt ' + attempt + ' of ' + ATTEMPTS + ', failed on a usage or rate limit (' + msg + '), and is not run again now')
      result = null
      why = 'an error thrown by agent(): ' + msg
    }
    if (result !== null && result !== undefined) {
      if (retry) log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' returned its result')
      return result
    }
    log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' ended with ' + why
        + (attempt < ATTEMPTS ? '; running the role again as attempt ' + (attempt + 1) + ', told to take over what this one left'
          : needed ? '; no attempt left' : '; no attempt left, so the script takes its path for a dead agent'))
  }
  if (needed) throw stopRun(role + ' returned nothing after ' + ATTEMPTS + ' attempts, and a rung worker, skeptic or judge that returns nothing is read neither as a dead worker, a refusal nor a drop')
  return null
}

const bgCheck = (tree) => 'A command the earlier attempt started in the background with nohup may still be running. Before you start a build, a test or any long run, list what runs (ps -eo pid,etime,args | grep -E "ant|java|fortress" | grep -v grep, and readlink /proc/<pid>/cwd for the tree each runs in) and, as the skill\'s session.md says, wait for a step still running in ' + tree + ' and use its result; never start the same step beside it.'

function recoverRung(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '; if it does not exist, make it by step 1. Read git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb (commits not pushed show as ahead) and ls -lt tmp/ | head -20, and what exists of explorations/compile-ladder/' + rung.slug + '/ and of tmp/' + rung.slug + '/.',
    'Committed work is yours to verify, not to redo; uncommitted edits are yours once you have read them; a log that ends in its EXIT= line, or whose verdict or table is whole, stands unless the tree changed after it, and one cut off or failed is a step still to do (the skill\'s session.md). The earlier attempt\'s transcript is in this run\'s directory, under your own label: ' + runDirLine('rung:' + reId(rung.id)).trim() + ', then grep for your label in "$D"/agent-*.meta.json; read it with jq, never whole.',
    'Test first still holds: if the earlier attempt made the edit before its test was seen failing, see the test fail on the base\'s code with the old code tool (the skill\'s worktrees.md, "Running the old code"), never by reverting and rebuilding your worktree, and say so in REPORT.md.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push it, and go on from the first step not done.',
  ]
}

function recoverRungRepair(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Read git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb, and explorations/compile-ladder/' + rung.slug + '/JUDGE.md, SKEPTIC.md and REPORT.md. The commits after the one that carries the judge\'s ruling, and uncommitted edits, are the earlier attempt\'s.',
    'Take the judge\'s instructions one at a time and check each against the tree before acting: a step done is not done again, an assertion in place is not added twice, a harness run made after the edit is not made again unless it was cut off.',
    bgCheck(rung.path),
    'Commit what you took over, push it, and finish as the ruling below says, with reportText and recordText describing the rung as it now stands.',
  ]
}

function recoverSkeptic(rung) {
  const dir = 'explorations/compile-ladder/' + rung.slug + '/'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Read git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/' + rung.slug + '/skeptic/. A commit titled "The worker\'s report and record, from the run\'s journal", a commit whose title begins "Skeptic\'s fix:", and a commit of ' + dir + 'SKEPTIC.md, after the worker\'s last commit, are the earlier attempt\'s.',
    'A fix already committed is not made again: read its diff, and confirm in its transcript (this run\'s directory, your own label with :attempt) that its test was seen failing before it and passing after; a fix whose test was not is finished, not redone. Uncommitted edits are a fix in progress: read them, and finish or discard them.',
    'If SKEPTIC.md is committed and complete, it is your verdict: return it, with skepticText the word committed, headJudged the worker\'s head and headAfter the branch\'s. If it is partial, finish the checks it has not done and complete it in place, never a second copy of a section. A program whose output exists and is whole is not run again.',
    bgCheck(rung.path),
  ]
}

function recoverJudgeRung(rung, kind) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Read git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short and git status -sb, and ' + f + '.',
    'JUDGE.md may hold an earlier ruling on this rung on another question (a stop comes before a skeptic\'s verdict). The earlier attempt\'s is a ruling on this question, the ' + kind + ', written after the skeptic\'s last commit; a revert commit after it is the earlier attempt\'s too, and a fix already reverted is not reverted again.',
    'If that ruling is complete, it is yours: commit and push it if it is not, and return the decision it records. If it is partial, complete it in place, then commit and push once.',
  ]
}

function recoverJudgeMain(kind) {
  const f = BATCH_DIR + '/JUDGE-' + kind + '.md'
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --oneline ' + BASE + '..HEAD and git status --short, and ' + f + '. Whatever that file holds is the earlier attempt\'s.',
    'If its ruling is complete, it is yours: commit it locally if it is not, and return the decision it records. If it is partial, complete it in place and commit once. Do not push.',
  ]
}

function recoverGather() {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean: a dirty tree now is the earlier attempt\'s work in progress and your starting point. Check only that ' + BASE + ' is still an ancestor of HEAD.',
    'Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --cached --stat and git diff --stat. An approved rung whose commit is already on main is done: never apply its patch again. Before you apply another, regenerate it and run git apply --reverse --check on it: if that succeeds, it is applied and not committed; continue that rung after the apply. A file with conflict markers is a 3-way apply left half resolved.',
    'The record may already carry a rung\'s fold. Before you fold, grep FACTS.md and the ledger (' + LEDGER + ' find with the row\'s words, and for each placeholder its claim) for its lines, and fold only what is missing: never a line or a row twice. A row closed already is not closed again (' + LEDGER + ' show N). The same holds for PLAN.md\'s entries and RECORD.md.',
    'Retry a git command that fails on index.lock.',
  ]
}

function recoverReview() {
  return [
    'You are in the main tree, ' + MAIN + ', with the gate running beside you or finished. A commit titled "Fold the review\'s corrections" after the gather\'s last commit is the earlier attempt\'s: then headBefore is that commit\'s parent, so that pathsOutsideExplorations covers both attempts\' corrections.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: keep what is right and commit them with your own, in one more commit of the same title. Do not fix a finding twice. Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/.',
  ]
}

function recoverMergedRepair(kind) {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --stat, ' + BATCH_DIR + '/JUDGE-' + kind + '.md and ' + BATCH_DIR + '/REPAIR-' + kind + '.md if it exists. A commit after the one that carries JUDGE-' + kind + '.md is the earlier attempt\'s repair, and uncommitted edits its repair in progress.',
    'Take the judge\'s instructions one at a time and check each against the tree: a step done is not done again. If the earlier attempt made its commit, what you finish goes in one more commit; headBefore is then the parent of its first commit, and a test run it captured under ' + LOG_DIR + '/repair-' + kind + '-tests/ on the tree as it still is stands. Do not push.',
    bgCheck(MAIN),
  ]
}

function recoverGate() {
  return [
    'You are in the main tree, ' + MAIN + '. The earlier attempt\'s logs are under ' + LOG_DIR + '/ and its outputs under ' + GATE_OUT + '/: ls -lt both. A log counts only if it is newer than the newest commit that touches a path outside explorations/ and .claude/ (git log -1 --format=%ci -- . ":(exclude)explorations" ":(exclude).claude").',
    bgCheck(MAIN),
    'A step whose log ends in EXIT=0 with BUILD SUCCESSFUL is done: do not run it again, and above all do not repeat step 2 once step 4 has finished, since its rm -rf ProjectFortress/TEST-RESULTS deletes the suites\' results. Step 3\'s copies stand only if both exist. The distance stage: when its log ends in EXIT= it finished; when not and a java DistanceMulti runs in ' + MAIN + ', it still runs; either way do not start it again. Only when its log has no EXIT= line and no such process runs, remove the log and start it again.',
    'Steps 5 to 9 write into summary.txt, step 5 anew and the later ones appending: continue at the first whose lines are not there; if one stopped partway, run again from step 5, so that no line lands twice (the distance stage itself is not run again for that, only its comparison).',
  ]
}

function recoverCommit(held) {
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. A commit titled "' + COMMIT_TITLE + '" is the earlier attempt\'s step 1: do not make it again, and finish what it left in one more commit. Lines "# repair-tests", "# repair-ungated" or "# microgpt-walk" already in ' + GATE_DIR + '/summary.txt are the earlier attempt\'s: do not copy the gate\'s summary over the file again, and do not append them twice.',
    'If ' + MG_LOG + ' exists, step 0 was taken: do not start the check again; wait for it.',
    held
      ? 'The push is held: a "Not pushed." paragraph in ' + BATCH_DIR + '/RECORD.md is the earlier attempt\'s; do not append it again. Push nothing.'
      : 'Check what is pushed: git fetch origin, then git rev-parse HEAD origin/main ' + PUSH_BRANCHES.map(b => 'origin/' + b).join(' ') + '; push only what a branch lacks. git worktree list and git branch --list "wip/*" show what step 4 has already removed.',
  ]
}

// ---------------------------------------------------------------------------
// The run.
// ---------------------------------------------------------------------------

log('Climb batch ' + BATCH + ': ' + RUNGS.length + ' rungs (' + RUNGS.map(r => r.id).join(', ') + '), two agents at a time, the workers in the order '
    + SCATTER.map(r => r.id).join(', ') + '; each rung checked by a skeptic that fixes what it finds; then gather, review beside the gate, commit. Base ' + BASE + '.')

const results = await pipeline(
  SCATTER,

  // Stage 1: the rung worker.
  (rung) => callAgent(head('rung worker') + rungRole(rung, 'first') + rungTail(rung, true), {
    label: 'rung:' + rung.id, phase: 'Rung', schema: RUNG_SCHEMA, model: OPUS,
  }, recoverRung(rung), true),

  // Stage 2: the skeptic, which fixes what it finds; a judge only on a contested fix, a refusal
  // or a worker's stop; one repair round only on the judge's word.
  async (worker, rung) => {
    let stopJudge = null
    const out = (state, extra) => Object.assign({ rung: rung.id, slug: rung.slug, branch: rung.branch, state, stopJudge }, extra)
    if (!worker) return out('worker-died', { worker: null, verdict: null })

    if (worker.stopped) {
      log(rung.id + ' stopped: ' + (worker.stopReason || '(no reason given)') + '; the judge rules whether it is a step that cannot be undone')
      stopJudge = await callAgent(head('judge') + judgeRole('stop', rung, worker, null, null), Object.assign({
        label: 'judge:' + rung.id + ':stop', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeRung(rung, 'stop'), true)
      if (stopJudge.decision !== 'repair') return out('stopped', { worker, verdict: null, judge: stopJudge })
      const resumed = await callAgent(head('rung worker') + rungRole(rung, 'resume') + repairPrompt(rung, null, stopJudge, 'stop') + rungTail(rung, true), {
        label: 'resume:' + rung.id, phase: 'Rung', schema: RUNG_SCHEMA, model: OPUS,
      }, recoverRungRepair(rung), true)
      if (resumed.stopped || !resumed.landed) return out('stopped', { worker: resumed, verdict: null, judge: stopJudge })
      worker = resumed
    }

    const verdict = await callAgent(head('skeptic') + skepticRole(rung, worker), {
      label: 'skeptic:' + rung.id, phase: 'Skeptic', schema: SKEPTIC_SCHEMA, model: OPUS,
    }, recoverSkeptic(rung), true)
    const fixes = Array.isArray(verdict.fixes) ? verdict.fixes.length : 0
    if (verdict.verdict === 'approved') {
      if (fixes) log(rung.id + ': its skeptic approved it with ' + fixes + ' fix(es) of its own, none contested; no judge runs')
      return out('approved', { worker, verdict })
    }

    const kind = verdict.verdict === 'contested' ? 'contested' : 'refusal'
    log(rung.id + ': ' + (kind === 'contested'
      ? 'its skeptic marked ' + (verdict.contested || []).length + ' of its ' + fixes + ' fix(es) contested; the judge rules on those alone'
      : 'its skeptic refused it (' + (verdict.refusalReason || 'no reason returned') + '); the judge rules'))
    const decision = await callAgent(head('judge') + judgeRole(kind, rung, worker, verdict, null), Object.assign({
      label: 'judge:' + rung.id, phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(stopJudge)), recoverJudgeRung(rung, kind), true)
    if (decision.decision === 'stands') return out('approved-after-ruling', { worker, verdict, judge: decision })
    if (decision.decision !== 'repair') return out(decision.decision === 'stop' ? 'stopped' : 'dropped', { worker, verdict, judge: decision })

    const repaired = await callAgent(head('rung worker') + rungRole(rung, 'repair') + repairPrompt(rung, verdict, decision, kind) + rungTail(rung, false), {
      label: 'repair:' + rung.id, phase: 'Rung', schema: RUNG_SCHEMA, model: OPUS,
    }, recoverRungRepair(rung), true)
    return out((repaired.landed && !repaired.stopped) ? 'approved-after-repair' : 'dropped', { worker: repaired, verdict, judge: decision, repaired: true })
  },
)

// A run stopped inside the scatter has a rung whose stage threw: nothing is read from it, so no
// rung is marked dropped, withheld or not landed, and the gather does not start.
if (runStop) throw stopRun()

const byId = {}
for (const r of results.filter(Boolean)) byId[r.rung] = r

// landsOnlyWith: a rung whose manifest entry names rungs it lands only with is withheld when any
// of them was not approved, repeated until nothing moves.
const isApproved = (r) => r.state === 'approved' || r.state === 'approved-after-ruling' || r.state === 'approved-after-repair'
function applyLandsOnlyWith(rungs, manifest) {
  const needs = {}
  for (const m of manifest) needs[m.id] = m.landsOnlyWith || []
  let out = rungs
  for (;;) {
    const stateOf = {}
    for (const r of out) stateOf[r.rung] = r.state
    let moved = false
    out = out.map(r => {
      const missing = isApproved(r) ? (needs[r.rung] || []).filter(id => !isApproved({ state: stateOf[id] })) : []
      if (!missing.length) return r
      moved = true
      return Object.assign({}, r, { state: 'withheld', approvedAs: r.state,
        withheldReason: r.rung + ' lands only with ' + needs[r.rung].join(', ') + ' (landsOnlyWith in the manifest), and '
          + missing.map(id => id + (stateOf[id] ? ' is ' + stateOf[id] : ' did not report')).join(', ') + ': not applied, its findings folded' })
    })
    if (!moved) return out
  }
}

const rungs = applyLandsOnlyWith(RUNGS.map(r => byId[r.id]).filter(Boolean), RUNGS)
const approved = rungs.filter(isApproved)
const notLanded = rungs.filter(r => !isApproved(r))
const withheld = rungs.filter(r => r.state === 'withheld')
if (withheld.length) log('Withheld by landsOnlyWith: ' + withheld.map(r => r.withheldReason).join('; '))
const approvedEntries = RUNGS.filter(m => approved.some(a => a.rung === m.id))
const expectedMoves = [].concat.apply([], approvedEntries.map(m => (m.expectedMoves || []).map(x => m.id + ': ' + x)))
const expectedChecker = {
  counts: approvedEntries.filter(m => m.expectedCheckerCount !== undefined).map(m => m.id + ': ' + m.expectedCheckerCount),
  crashes: approvedEntries.filter(m => m.expectedCheckerCrash !== undefined).map(m => m.id + ': ' + m.expectedCheckerCrash),
}
// A gate step an approved rung brings (testSpecData with W), or one the last landed summary
// already carries, which the gate then runs from that batch on.
const joins = [].concat.apply([], approvedEntries.map(m => (m.gateJoins || []).map(j => j + ' (rung ' + m.id + ')')))
const specData = joins.some(j => /^testSpecData /.test(j))
  ? 'rung ' + joins.filter(j => /^testSpecData /.test(j)).map(j => j.replace(/^.*\(rung |\)$/g, '')).join(', ') + ' brings it into the gate in this batch (POSITIONS.md, "The specification\'s examples join the gate at zero red.")'
  : 'run it only if the last landed summary has a specdata/ row, which makes it a step of every gate after the batch that brought it'

// What the checking cost in agents, per rung, for the post-batch review's measures
// (process-engineering/batch-redesign.md, "The measures").
const checking = {}
for (const r of rungs) checking[r.rung] = {
  state: r.state,
  skepticVerdict: (r.verdict && r.verdict.verdict) || null,
  skepticFixes: (r.verdict && Array.isArray(r.verdict.fixes)) ? r.verdict.fixes.length : 0,
  contested: (r.verdict && Array.isArray(r.verdict.contested)) ? r.verdict.contested.length : 0,
  judge: (r.judge && r.judge.decision) || null,
  reverted: (r.judge && Array.isArray(r.judge.rulings)) ? r.judge.rulings.filter(x => x && x.ruling === 'revert').length : 0,
  repairRound: !!r.repaired,
  stopJudge: (r.stopJudge && r.stopJudge.decision) || null,
}
const report = { batch: BATCH, base: BASE, rungs, checking }

const rungItems = [].concat.apply([], rungs.map(curatorItemsOf))
const routers = []
const mergedItems = []
function curatorStatus() {
  const routed = routedIds(routers)
  return rungItems.concat(mergedItems).map(i => Object.assign({}, i, { inPlan: routed.has(i.id) }))
}
const finish = (extra) => Object.assign(report, { forCurator: curatorStatus() }, extra)

if (approved.length === 0) {
  log('No rung approved; nothing to gather. ' + rungs.map(r => r.rung + ': ' + r.state).join(', '))
  return finish({ landed: false, reason: 'no rung approved' })
}
log('Approved: ' + approved.map(r => r.rung + ' (' + r.state + ')').join(', ')
    + (notLanded.length ? '. Not landed, findings folded anyway: ' + notLanded.map(r => r.rung + ' (' + r.state + ')').join(', ') : '')
    + '. Gathering onto main.')

const gather = await callAgent(head('gather') + gatherRole(approved, notLanded, rungItems), { label: 'gather', phase: 'Gather', schema: GATHER_SCHEMA, model: OPUS }, recoverGather())
report.gather = gather
routers.push(gather)
if (!gather || gather.unresolved) {
  log('Gather stopped: ' + ((gather && gather.summary) || 'agent died'))
  return finish({ landed: false, reason: 'gather unresolved' })
}
mergedItems.push(...numbered('gather', gather.forCurator))
const reviewItems = rungItems.concat(numbered('gather', gather.forCurator))

// The commits each rung's branch holds after its worker's: the skeptic's fixes and a repair round,
// which the review reads, there being no second skeptic.
const checkingByRung = approved.map(r => ({ rung: r.rung, branch: r.branch, state: r.state,
  skepticFixes: (r.verdict && r.verdict.fixes) || [], rulings: (r.judge && r.judge.rulings) || [],
  repairRound: r.repaired ? { judgeInstructions: (r.judge && r.judge.instructions) || [], summary: (r.worker && r.worker.summary) || '' } : null }))

// The review beside the gate: the review reads and never builds, the gate builds and never reads
// the record; the gate commits nothing, so the two never commit at once.
const gateRun = callAgent(head('gate') + gateRole(expectedMoves, expectedChecker, specData), { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
gateRun.catch(() => null)
let review = await callAgent(head('merged-diff reviewer') + reviewRole(gather, 'review', reviewItems, checkingByRung), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
report.review = review
routers.push(review)
mergedItems.push(...numbered('review', review && review.forCurator))
if (!review) {
  log('The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts: the batch lands on its gate without one, listed as review-missing.1 for the landing report')
  report.reviewMissing = true
  mergedItems.push(...numbered('review-missing', ['The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts, so no review read this batch\'s merged diff, its skeptics\' fixes and its folded record beside its gate; the post-batch review is the first to read them.']))
}
const routedFindings = strings(review && review.routed)
if (routedFindings.length) {
  log('The review routed ' + routedFindings.length + ' finding(s) settled by tests and records only to the next batch; no judge runs for them')
  report.reviewRouted = { findings: routedFindings }
  mergedItems.push(...numbered('review-routed', routedFindings))
}
const reviewBlocks = !!(review && strings(review.blockingCode).length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found ' + strings(review.blockingCode).length + ' finding(s) that touch code; the judge rules while the gate runs on')
  reviewDecision = await callAgent(head('judge') + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: REVIEW_JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeMain('review'), true)
  report.reviewJudge = reviewDecision
  mergedItems.push(...numbered('judge-review', reviewDecision && reviewDecision.forCurator))
}
let gate = await gateRun
report.gate = gate

const reviewPaths = strings(review && review.pathsOutsideExplorations)
const reviewGated = reviewPaths.map(repoPath).filter(gateReads)
const reviewUngated = ungatedOf(reviewPaths)
let gateIsStale = reviewGated.length > 0
const beside = []
if (gateIsStale) log('The review\'s corrections touched ' + reviewGated.length + ' path(s) the gate reads (' + reviewGated.join(', ') + '); the gate runs again')
else if (reviewUngated.length) log('The review\'s corrections touched ' + reviewUngated.length + ' path(s) outside explorations/ that no gate stage reads (' + reviewUngated.join(', ') + '); the gate stands, and the commit stage records why')
const redBeside = !!(gate && !gate.stopped && !gate.green && !gateIsStale)
let redAnswered = false

if (reviewBlocks) {
  const decision = reviewDecision
  if (decision && decision.decision === 'land') {
    log('The review\'s judge ruled land: its ' + strings(decision.instructions).length + ' step(s) of tests and records go to the next batch, listed for the curator (' + BATCH_DIR + '/JUDGE-review.md); no repair runs')
    report.reviewRouted = { findings: routedFindings.concat(strings(review.blockingCode)), instructions: strings(decision.instructions), ruling: BATCH_DIR + '/JUDGE-review.md' }
    mergedItems.push(...numbered('judge-review-land', decision.instructions))
  } else if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  } else {
    report.repairReview = await callAgent(head('repair on the merged tree') + mergedRepairRole(decision, 'review', redBeside ? gate.failing : undefined), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
    routers.push(report.repairReview)
    const rr = report.repairReview
    if (!rr || rr.stopped || rr.landed === false) {
      log('The review\'s repair ' + (!rr ? 'returned nothing' : rr.stopped ? 'stopped (' + (rr.stopReason || 'no reason given') + ')' : 'did not land') + ': its code finding(s) go to the next batch as review-unrepaired, listed for the curator; they do not hold the push')
      report.reviewUnrepaired = strings(review.blockingCode)
      mergedItems.push(...numbered('review-unrepaired', review.blockingCode))
    }
    const after = repairRerun(report.repairReview, reviewPaths, null)
    report.repairReviewRerun = after
    if (after.rerun) {
      log('After the review\'s repair the gate runs again: ' + after.why)
      gateIsStale = true
    } else {
      const red = redBeside ? repairRerun(report.repairReview, reviewPaths, gate) : null
      if (red) report.repairReviewRed = red
      if (red && !red.rerun) {
        redAnswered = true
        log('The review\'s repair changed ' + red.why + ' and its runs answer the line(s) the gate beside the review was red on; the gate does not run again, and no gate judge or gate repair runs')
        beside.push({ kind: 'review', runs: red.runs, answered: red.answered, ungated: red.ungated, commits: (rr.headBefore || '?') + '..' + (rr.headAfter || '?') })
      } else {
        if (red) log('The gate beside the review was red, and the review\'s repair does not answer it (' + red.why + '); the gate judge rules on it')
        if (strings(rr && rr.pathsChanged).length) {
          log('The review\'s repair changed ' + after.why + '; the gate does not run again and its tables stand')
          beside.push({ kind: 'review', runs: after.runs, answered: [], ungated: after.ungated, commits: (rr.headBefore || '?') + '..' + (rr.headAfter || '?') })
        }
      }
      gateIsStale = false
    }
  }
}

if (!gateIsStale && reviewUngated.length && !beside.some(b => b.kind === 'review')) {
  beside.push({ kind: 'review-corrections', runs: [], answered: [], ungated: reviewUngated, commits: ((review && review.headBefore) || '?') + '..' + ((review && review.headAfter) || '?') })
}

if (gateIsStale || !gate) {
  gate = await callAgent(head('gate') + gateRole(expectedMoves, expectedChecker, specData), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gateAfterReview = gate
  beside.length = 0
}

if (!gate || gate.stopped) return finish({ landed: false, reason: 'gate could not run' })
if (!gate.green && !redAnswered) {
  log('Gate red: ' + strings(gate.failing).length + ' failing; the judge diagnoses on the merged tree')
  const decision = await callAgent(head('judge') + judgeRole('gate', null, null, null, gate), Object.assign({ label: 'judge:gate', phase: 'Judge', schema: GATE_JUDGE_SCHEMA }, judgeTier(report.reviewJudge)), recoverJudgeMain('gate'), true)
  report.gateJudge = decision
  mergedItems.push(...numbered('judge-gate', decision && decision.forCurator))
  if (decision.decision !== 'repair') return finish({ landed: false, reason: 'gate red, judge did not order a repair' })
  report.repairGate = await callAgent(head('repair on the merged tree') + mergedRepairRole(decision, 'gate', gate.failing), { label: 'repair:gate', phase: 'Gate', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('gate'))
  routers.push(report.repairGate)
  const after = repairRerun(report.repairGate, [], gate)
  report.repairGateRerun = after
  if (after.rerun) {
    log('After the gate\'s repair the gate runs again: ' + after.why)
    gate = await callAgent(head('gate') + gateRole(expectedMoves, expectedChecker, specData), { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
    report.gate2 = gate
    beside.length = 0
    if (!gate || !gate.green) {
      log('Gate red after one repair: the batch stops here, nothing pushed')
      return finish({ landed: false, reason: 'gate red twice' })
    }
  } else {
    log('The gate\'s repair changed ' + after.why + ' and its runs answer the line(s) the gate was red on; the gate does not run again and its tables stand beside the runs')
    beside.push({ kind: 'gate', runs: after.runs, answered: after.answered, ungated: after.ungated, commits: ((report.repairGate && report.repairGate.headBefore) || '?') + '..' + ((report.repairGate && report.repairGate.headAfter) || '?') })
  }
}

const notInPlan = curatorStatus().filter(i => !i.inPlan)
if (notInPlan.length) log('Items for the curator not in PLAN.md, for the coordinator: ' + notInPlan.map(i => i.id).join(', ')
    + ((gather && Array.isArray(gather.curatorUnrouted) && gather.curatorUnrouted.length) ? '; the gather says why: ' + gather.curatorUnrouted.map(u => u && (u.id + ': ' + u.why)).join('; ') : ''))

const heldBy = pushHeldBy(approved, review, { 'repair:review': report.repairReview, 'repair:gate': report.repairGate })
if (heldBy.length) log('Push held: ' + heldBy.length + ' step(s) that cannot be undone or act against a decision on record: ' + heldBy.join('; '))
const commit = await callAgent(head('commit') + commitRole(gather, gate, heldBy, beside), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
report.commit = commit
// A batch writes no skill text (skills-agenda-audit.md): a path under .claude/ that changed since the
// base is listed for the coordinator, and holds nothing.
if (commit) mergedItems.push(...numbered('skill-touched', strings(commit.skillTouched).map(p => 'The batch changed ' + p.trim() + ' (git diff --name-only ' + BASE + ' HEAD -- .claude/), though a batch writes no skill text: only the skill writer edits the skills, after the landing.')))
// The quick pair prints "VERDICT: n PASS, 0 FAIL of n -- ALL PASS" each when it passes. Anything
// else, a failing check, a run cut off or refused, is listed for the coordinator; it holds nothing.
const mgPassed = (t) => typeof t === 'string' && (t.match(/-- ALL PASS/g) || []).length >= 2 && !/-- FAILED|rc=[1-9]/.test(t)
if (commit && !mgPassed(commit.microgptWalk)) mergedItems.push(...numbered('microgpt-walk', ['The microGPT walk check on the landed tree did not show both quick programs passing: ' + ((commit.microgptWalk || '').trim() || 'no lines returned')]))
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside, microgptWalk: commit && commit.microgptWalk })
