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
// Generated by explorations/compile-ladder/plan-14/manifest/gen14.py from
// CLIMB-BATCH-14.md (section 3, each rung's section word for word; section 5, the
// manifest fields and the intro) and the briefings of lists14.py; check14.js checks it.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order only),
// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line
// for the batch table), section (the rung's section of the record, read by every role
// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the
// worker reads first, each with its reason), checks (the sub-list the skeptic, a judge
// and a repair round read), expectedMoves (ladder moves declared, none here), and the
// optional landsOnlyWith, expectedCheckerCount and expectedCheckerCrash (rung L declares
// the checker count 1, its one error at body(i), or row 680's crash if body(i) lands;
// no rung declares landsOnlyWith or a crash).
// No value is set at launch. The base and the base build are args.base and
// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The
// Workflow harness runs two agents at once on this box"); the scatter starts the
// longest expected worker first.
// ===========================================================================

const BATCH = '14'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-14.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-14/manifest/lists14.py'

const S_SECTION = [
"**The answers this rung follows.** The way for the self-typed bodies is decided, P-146, in its words: \"The checker reads self in a self-typed trait's method bodies as the implementing type (way 6). In a trait C[\\X\\] whose parameter X extends C[\\X\\], self in the trait's method bodies has the type C[\\X\\] & X; the signatures keep the plain trait type, as the POPL 2019 paper's assumption on declared types needs. A type that extends such a trait at another type is refused, Scala's conformance rule. The library's text gains no self type and no comprises clause, and walk is unchanged. It clears 29 sites of the distance; the thirtieth takes one numerator per integer type. Why: it reads the library as the team wrote it, as P-44 does, by one rule the peers share. Still to build: batch 14's rung S.\" This rung builds it from the judgement's recommendation, way 6 (explorations/reviews/self-typed-bodies-judgement.md, section 4, \"The recommendation\"). Beside it the rung builds a default the coordinator took after this record's review, on the review list, following P-146's reason: a type parameter of a trait with no comprises clause also counts as its self parameter when its bound is a self-typed trait that the trait extends at that parameter; never an object's or an object expression's, where rule (b) closes the check a trait passes down. So ContainmentBySubset[\\T extends Containment[\\T\\]\\] extends Containment[\\T\\] has T as its self parameter, rule (a) types self in its bodies as ContainmentBySubset[\\T\\] & T, and rule (b) checks its extenders, Relation[\\T\\] among them. This reading goes past what was measured: the measured patch reads only a parameter bounded by the trait itself, and no component the stages read has the mixin's shape, so your tests are its measure. The library's 29 bodies are the team's of 2008 (P-27). Route A (P-43) and the comprises decision (P-44) stand: under a comprises clause the self type is the clause's, so rule (a) is never reached there. P-146 sets aside a reading of an earlier record, \"no self type enters the library\" (explorations/coordinator/CLIMB-BATCH-8.md:113). The 2019 paper gives the confinement its reason, which the decision record states: the paper's declared types hold no intersection at all (Lemma 5.2's assumption, pp. 11:21-22) and its Return Type Rule compares declared domains (p. 11:13), the two places where the unconfined rule made 18 false errors (explorations/reviews/array-judgements-popl-check.md, sections 5 and 7.1). A compiled body that returns self dies at class load (row 695), so the compiled run is an expected failure, not this rung's repair. Numerator's default at :688 is rung L's, under the same P-146. Walk is untouched.",
"",
"**Rows.**",
"- The 29 sites, no row of their own (S1's 28 and R4's 1; S1's twenty-ninth, :688, is rung L's), in four families, every one a body the team wrote: the two order traits, 16: StandardPartialOrder at Library/FortressLibrary.fss:226 (the call and its filter, two errors), :231, :233; StandardTotalOrder at :285 (two), :289, :290 (three), :291 (three), :293 (three, R4's tuple among them); AdditiveGroup, 2: :360, :363; Integral, 7: :691, :692, :693, :713, :722, :723, :724; StandardMutableArrayType, 4: :2182, :2186, :2190, :2194. The messages: \"Function body has type Integral[\\I\\], but declared return type is I.\", \"Could not check call to operator < ... is not applicable to an argument of type (T, StandardTotalOrder[\\T\\])\" and the filter cascade \"Filter expressions in generator clauses must have type Boolean, but OpExpr at ... was not well typed\".",
"- Rule (a), measured as a patch (self-typed-bodies-judgement.md, \"The patch\": 114 lines, +63 -4, against 7cb479984), which git apply --check accepts on this base with no offset. SelfParamDisambiguator.scala, the trait case (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:63-72): when a trait has no comprises clause and a static parameter bounded by the trait at its own parameters, the self type lists that parameter, so self is C[\\X\\] & X. The confinement: FunctionalMethod's index entry (ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:43-58), which overloading, the Return Type Rule and call resolution read (scala_src/useful/STypesUtil.scala:161), gives the self parameter the plain trait type when the self type was read from the F-bound; a body's self is bound from the declaration's own parameters (scala_src/typechecker/impls/Decls.scala:198) and keeps the intersection. Apply it, read it, and own it.",
"- Rule (b), not yet built (judgement section 5, \"Checker\"; \"Way 6\", \"Clears\"): for each extended C[\\A\\] whose C has a self parameter at position k, the extending declaration's self type must be a subtype of A_k, with the error \"D extends C[\\A\\], whose self parameter is A, but D is not a subtype of A\"; the same for an object expression where its type is formed (STypesUtil.getObjectExprType, scala_src/useful/STypesUtil.scala:1949). Put it in a function of its own in scala_src/typechecker/TypeHierarchyChecker.scala, called beside checkDeclComprises (:60; the loop over extendsTypes at :207-261 shows the shape), editing none of checkDeclComprises. For the object expression, the precedent is the revival's checkObjectExprComprises in the same file (:66-100, aa07efb31), which already walks every object expression of a component with its static parameters in scope and forms its type from its extends clause.",
"- Rule (b) and the tree. This record's review found four declarations that extend a self-typed trait at another type, which rule (b) as P-146 words it refuses: the team's mixins trait ContainmentBySubset[\\T extends Containment[\\T\\]\\] extends Containment[\\T\\] and ContainmentByComparison (Library/Containment.fsi:22-23, :29-30; .fss:42, :57; Relation extends the first at itself, Library/Relation.fsi:17); the team demo's object generator(...) extends StandardTotalOrder[\\trip\\] (ProjectFortress/demos/trips.fss:97-98); and PureList's trait List[\\E\\] extends { Equality[\\E\\], ZeroIndexed[\\E\\] } (Library/PureList.fsi:41), ill-formed anyway. Under the coordinator's default the mixins' T is their self parameter, so rule (b) accepts them and Relation: build rules (a) and (b) with that reading, in the disambiguator, the confinement and the hierarchy check alike. By grep it reaches these two traits only; no object or object expression in the tree has the shape. The widened reading needs the bound's trait declaration, which the measured selfParam never reads: SelfParamDisambiguator is built with no environment (ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:145, :300), before TypeDisambiguator qualifies names (:152-154); give it the TopLevelEnv built just before it (:141, :297), resolve the bound's name as TypeDisambiguator does (explicitTypeConsNames, onDemandTypeConsNames, typeConsIndex), and read that trait's self position from its header, itself perhaps widened. The demo's object has no type parameter and PureList's E is unbounded, so by reading both stay refused: report whether each is, and edit neither. No stage or test reads any of the four. The one library trait with both an F-bound and a clause, InternalNodeHelper (Library/SkipList.fss:195-197), is extended at itself by its two listed objects.",
"- Row 695, a note: the compiled run of a default body that returns self as S dies with VerifyError: Bad return type (the judgement's \"The compiled run of a body that returns self\"). The rung gives the row its reproducer as an expected failure; no repair.",
"- Notes, not repairs: row 407 (walk's comprises T, untouched; under rule (a) no clause is needed); row 488 (the site at :130 went under the measured rule and has come and gone between landings: a point if it moves); row 577 (count by row and line).",
"",
"**Distance sites.** The 29 gone; no site come. Measured on batch 12's tree: 153 to 123, the 29 gone, none new, no stall (judgement, \"The measurement\"). Batches 13 and 13b changed the checker's paths since (TypeAnalyzer, TypeSchemaAnalyzer, TraitTable), so your stage run is the first measure here. The regression to watch is the unconfined rule's 21: 18 Return Type Rule errors at CMP between StandardPartialOrder and StandardTotalOrder, and CMP bodies typed Comparison at :1004, :1930 and :4178 (their lines on batch 12's tree; find them by message). On your tree :688 stays, rung L's: its message becomes \"Right-hand side has type (Integral[\\I\\] & {I}), but declared type is ZZ.\", which classify.py files under OT, so S1 reads 0 and OT one more with no site come (the judgement, \"Rule (a) alone\"). The count stays 1.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala (the trait case, :63-72).",
"- ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java (:43-58 and the helper the patch adds).",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala (a new function beside checkDeclComprises, called at :60), and the object expression's case beside checkObjectExprComprises (:66-100), or where its type is formed (scala_src/useful/STypesUtil.scala:1949, or its caller).",
"- Specification/basic/expressions/var-ref.tex (:53-70), Specification/basic/traits.tex (a passage for rule (b), beside the extends prose at :156-198 or the comprises passage at :235-276), Specification/appendices/changes.tex (a new entry before \"Passages not yet revised\", :3296).",
"- The rung's decision-record.md; new files in ProjectFortress/compiler_tests/.",
"- Not: the library (numerator is rung L's); the demos; walk; the overloading oracle and impls/Functionals.scala (rung A's); the code generator; the compiler prelude.",
"",
"**Tests, first.** Each through junit.sh on the base.",
"- SelfTypeFromBound, a typecheck test: trait Shape[\\S extends Shape[\\S\\]\\] with twin(self): S = self, opr MINS(self, other: S): S = if other < self then other else self end and a (S, S) body, and an object Pt extends Shape[\\Pt\\] with its <. Seen failing on the base with \"Function body has type Shape[\\S\\], but declared return type is S.\", then passing.",
"- Row 695's reproducer: the judgement's probe, object Pt(t: String) extends Shape[\\Pt\\] with run printing twin(Pt(\"b\")).tag, as F-103's pair, a plain link test and an XXX run test, failing as expected while the row stands; note the row with it.",
"- XXXSelfTypeExtenderWrong, a compile test: object Bad extends Shape[\\Pt\\], compile_err_contains the new message. On the base it reports \"Saw wrong failure\", since the base accepts it; after, the expected failure. Show it red once with Bad changed to extend Shape[\\Bad\\].",
"- SelfTypeExtenderThroughOwn, a typecheck test: trait Lex[\\T extends Lex[\\T,E\\], E\\] extends Shape[\\T\\] and trait Below extends Lex[\\Below, ZZ32\\], accepted; beside it XXXSelfTypeObjectExprWrong, an object expression extending Shape[\\Pt\\], refused.",
"- SelfTypeMixinBound, a typecheck test of the mixin's shape (Rows, \"Rule (b) and the tree\"): trait Sub[\\T extends Shape[\\T\\]\\] extends Shape[\\T\\] with a body that returns self as T, and object Q extends Sub[\\Q\\]; refused on the base at that body, accepted after. Beside it XXXSelfTypeMixinExtenderWrong, object Bad extends Sub[\\Pt\\], compile_err_contains rule (b)'s message: \"Saw wrong failure\" on the base, the expected failure after. And XXXSelfTypeMixinObject, object M[\\T extends Shape[\\T\\]\\] extends Shape[\\T\\], refused after: an object has no self parameter. If you find a mixin shape the widened reading still refuses, keep it as XXXSelfTypeMixinBound and report it.",
"- The confinement's test is the distance stage: a small program with two F-bounded traits whose subtrait narrows an operator's return type compiled clean even under the unconfined shadow (the judgement, \"Rule (a) alone\"), so only the library's own CMP pair shows the 18.",
"- The count and distance stages once on your final tree, before from 13b's landed tables (compile-ladder/climb-batch-13b/gate/, compile-ladder/gate/distance-sites.tsv), read by row and line: the 29 gone, none come. Read the stage's FortressLibrary time against 13b's 1,318 s and report it.",
"- Keep their verdicts: XXX10k (the clause's reading), Compiled10.l, Compiled10.m, Compiled17defgh, ComprisesGenericSubtrait, library_tests/EqualityRung1 and MaybeTest9; Compiled17ee stays undriven, a point if it compiles.",
"- After the edit: the compiler and library test tracks once (ant testQuick); the interpreter suite once (ant testSystem), since SelfParamDisambiguator runs in the disambiguation phase walk shares (ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:145, :300), though by reading walk reads a self type by its named trait alone (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:51-53, :535-537), so no walk verdict moves; the count and distance stages once.",
"",
"**Specification.** Rule (a): the paragraph that gives self its type (Specification/basic/expressions/var-ref.tex:53-54, \"The type of self is the type of the trait or object being declared\") and the team's self-type idiom after it (:63-70), one sentence for a trait with no comprises clause whose static parameter is bounded by the trait at its own parameters, or by a self-typed trait it extends at that parameter: in its method bodies self has the type T & X; with a \\revision callout. Rule (b): one passage in the traits chapter, with its callout. One Appendix I entry before \"Passages not yet revised\" (Specification/appendices/changes.tex:3296), with the original text of the self paragraph from Specification-1.0-frozen/basic/expressions/var-ref.tex, the reason (the judgement's sections 2 and 4, and the 2019 paper's reason for the confinement), route C, and the decision it follows (P-95, P-96). The sentence that a functional method's self parameter \"implicitly has the type of the enclosing trait or object\" (Specification/basic/traits.tex:553-555) stays true of the declaration's signature under the confinement; say so in its callout. The calculi of Appendix A are untouched, with no new callout. List every other sentence your change makes false.",
"",
"**Overlaps by file.**",
"- A edits the checker too, only scala_src/typechecker/impls/Functionals.scala; no checker file is both rungs'. S's FunctionalMethod.java changes what call resolution reads for a self-typed functional method, A's retry what it tries when no declaration fits: they meet only in the gate's measure.",
"- Specification/appendices/changes.tex: S adds an entry before :3296; A, W and P amend other entries, P's \"When two sizes are the same\" (:3224-3294) ending just above S's. var-ref.tex is S's alone; traits.tex is S's in \"Trait Declarations\" and at :553-555's callout, W's at :579-581.",
"- ProjectFortress/compiler_tests/: S, A and P add distinct files.",
"- L edits the library: numerator's lines are not S's.",
].join('\n')

const A_SECTION = [
"**The answers this rung follows.** P-51 is decided: when the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate declaration's parameter type as its expected type; the trigger is wide, any inferred static argument, so the inference rules are one rule everywhere; the rung promotes XXXInferContextDrops and XXXInferLoneUnionClosedTrait, whose refusals it repairs. P-49 settles the probe's third fork: the checker tries a call as written first, so the retry never displaces a declaration that already accepts the call. The probe's forks 2, 4 and 5 (explorations/reviews/argument-context-probe.md, section 6) are built as its patch has them and are on the review list: a generic outer call whose static arguments only retried arguments fix takes its bound; an ambiguity the retry finds is refused with today's not-applicable message; an argument that writes its static arguments is retried too, to no effect. The text already makes the context matter: an identifier's static arguments \"are statically inferred from the context of the function call\" (Specification/basic/expressions/var-ref.tex:38-40).",
"",
"**Rows.**",
"- Row 455's argument faces, no distance site: takesBox64(wrapT(3)) and takesBox64(mk()) (ProjectFortress/compiler_tests/XXXInferContextDrops.fss:10-11), refused today at BoxT[\\IntLiteral\\] and BoxT[\\Object\\]. The repair is the probe's wide patch (argument-context-probe.md, \"The patch (wide), against fe74fb738\"): one file, scala_src/typechecker/impls/Functionals.scala, 94 lines added and 1 removed, in typedApplication (:650-815), by the mechanism the checker already uses for a function literal argument (inferFnExprParams, :510-537). git apply --check accepts it on this base, its three hunks at :657, :736 and :835 (offset 13). Batch 13's rung N edited the coercion path of the same file at :324-389 (an opened argument opened once per call); the batch 13 review reads no overlap with the probe's hunks. Apply the patch, read it, and own it.",
"- Row 535, closed: its expected failure XXXInferLoneUnionClosedTrait pins the refusal of k(pk0(Tri, Sq)) at BoxT[\\Any\\]; under the retry the call compiles with T = Fig and runs. The test becomes a plain passing test with its run asserted, a revival test's pin changed.",
"- Notes, not repairs: row 642 (the label body, beside this context); row 577.",
"",
"**Distance sites.** None. On batch 11's tree the probe's stage was 207 to 207: the retry was tried at 10 library call sites and kept at none (argument-context-probe.md, section 4). A site that moves is a point to report. The count stays 1.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala (typedApplication and the methods the patch adds).",
"- Specification/basic/inference.tex (the list of contexts at :128-150; the item at :277-278) and Specification/appendices/changes.tex (the entry \"The contexts that give a call an expected type\", :2043-2190, its sentence on row 455 at :2125-2126).",
"- New and changed files in ProjectFortress/compiler_tests/.",
"- Not: Operators.scala, Misc.scala, STypesUtil.scala, Formula.scala, TypeAnalyzer.scala; SelfParamDisambiguator.scala, FunctionalMethod.java and TypeHierarchyChecker.scala (rung S's); the library; walk.",
"",
"**Tests, first.** Each through junit.sh on the base.",
"- Row 455: XXXInferContextDrops promoted to a name by topic, compiled and run, the two faces' values asserted with run_out_equals; through junit.sh on the base it shows today's refusal.",
"- Row 535: XXXInferLoneUnionClosedTrait rewritten as a plain test whose run prints BoxT[Fig]; refused on the base.",
"- From the probe's section 2, compiled and run, each instance asserted: the overloaded outer call, over(mk()) and over5(mk(), Tri) (the more specific arm wins); the generic outer call, kindOf(mk(), z64) with ZZ64 expected and pair(mk(), b64); the nesting, takesBox64(idB(idB(mk()))); the method Taker.take(mk()); the operator mk() BOXOP 3; the constructor takesBox64(BoxT(1)); over3(mk()) keeping its Any arm (P-49). Beside them an XXX compile test of the controls, refused before and after: takesBox64(mkS()), takesBox64(wrapT(\"s\")), takesBox32(wrapT(z64)), and over2(mk())'s ambiguity.",
"- Keep their verdicts: InferLooseJuxtContext, InferRepeatedOperatorContext, InferTightJuxtContext, InferCoercionShapes, the InferResultOnly*, InferLone* and Infer*Context tests, XXXNatArithInferChecker (row 681), XXXNatOpenOverloadChecker (row 682).",
"- The count and distance stages once on your final tree, before from 13b's landed tables: no site moves.",
"- After the edit: the compiler and library test tracks once (ant testQuick).",
"",
"**Specification.** The probe's section 5, under the wide trigger: the chapter's list of contexts (Specification/basic/inference.tex:128-150) gains the argument of a call that does not write its static arguments, where no declaration of the enclosing call fits without it, its expected type the parameter type at that position of each declaration in turn, instantiated by the other arguments and the enclosing call's expected type; the item at :277-278 drops \"an argument of another call\"; a revival-expected-contexts callout beside each, in the S1 form. Appendix I's entry \"The contexts that give a call an expected type\": the argument joins the Change, whose sentence that the item \"names an argument of another call and the body of a for loop\" (changes.tex:2061-2064) changes with the item, the Effect's sentence \"It still gives no expected type to an argument of another call (row 455 ...)\" (changes.tex:2125-2126) is amended, and the Rationale cites var-ref.tex:38-40 (P-95, P-96). The item is in the section \"A Numeral Whose Conversions Tie\", not in the list's own section. List every other sentence your change makes false.",
"",
"**Overlaps by file.**",
"- S edits the checker too, in other files (the disambiguator, the index entry, the hierarchy check); no checker file is both rungs'.",
"- Specification/appendices/changes.tex: S adds an entry; P amends \"Overloading with static parameters\"; W amends \"Traits with comprises clauses read at the level of values\"; A amends \"The contexts that give a call an expected type\". Specification/basic/inference.tex is A's alone.",
"- ProjectFortress/compiler_tests/: S, A and P add distinct files; A alone changes XXXInferContextDrops and XXXInferLoneUnionClosedTrait.",
].join('\n')

const L_SECTION = [
"**The answers this rung follows.** Item 47 is answered (PLAN item 47, way 1; F-42): the checker refuses a local function's parameter left untyped, \"Missing parameter type for i\", and the library writes the type; __bigOperator's body(i) is the one such site left, the count's one error (F-53). Each repair takes the library's own spelling (P-27): Array2's offset takes the shape of Array1's and Array3's; IntMap's node map takes the singleton map's own SYMDIFF. Integral's numerator per type follows P-146, whose whole text heads your briefing: \"It clears 29 sites of the distance; the thirtieth takes one numerator per integer type.\" The thirtieth site is numerator's default (explorations/reviews/self-typed-bodies-judgement.md, \":685, shape C, apart\"): one body per integer type in ZZ's shape, four api lines that the review list judges as an extension, shown ZZ's line (process-engineering/library-extension-rule-archaeology.md section 5, point 4). Rows 668 and 669 are rung W's, in Random and QuickCheck.",
"",
"**Rows.**",
"- The count's error, no row: __bigOperator's local body(i): L = r.lift((o.body)(i)) (Library/FortressLibrary.fss:1311), its parameter untyped, \"Missing parameter type for i\"; the count's one error and the distance's crash row \"FnDecl FortressLibrary.fss:1309:1-1313:4 TypeError\" (compile-ladder/climb-batch-13b/gate/distance.txt). The repair: body(i: I): L. By reading the body then checks: o.body is I->R, r an ActualReduction[\\R,L\\] with lift: R->L, unlift: L->R, and o.unwrap R->O (BigOperator, Library/FortressLibrary.fsi:1940-1944). Under walk the parameter is checked at each call of body, which every big operator and comprehension reaches through __bigOperator; where walk gives I a type the elements are not in, the call is refused, and by reading that is every list or map comprehension: the desugarer passes the big operator with only the static arguments the program writes (ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:405-408), walk leaves a big operator's plain-bounded parameter at BottomType (F-141, D2; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:143-147, :170, :181), as it does BIG <|[\\T\\]|>'s T (Library/List.fss:178), so __bigOperator's I is BottomType, which admits no value (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:108-113); rows 645 and 662 show the F-bounded cousins. Today nothing checks an element against I. So check it first: write the line, run one walk program with a list comprehension over a generator clause, and run the interpreter suite only if that passes. If walk refuses a call at body's parameter, do not land the line; report the program and the instance walk gave I. Typing body(i) then waits on the open question of review-queue.md item 17 (a big operator's plain-bounded parameter at BottomType under walk) and the walk rung on rows 645 and 662, and the count's error stays at :1311.",
"- What the count does if the line lands, by reading: the run stops at a component's first thrown error (F-53); the next is Array3's crash at :2923 (row 680, \"TryChecker returned an untyped expr\", an InterpreterBug), which Shell.compilerPhases returns as one error (ProjectFortress/src/com/sun/fortress/Shell.java:978-996). So the count stays 1, its error now row 680's. It shows the component's own errors, 79 in component FortressLibrary by the distance, only once row 680's crash goes too. The stage then checks the component past :1311 for the first time: 13b's stage took 387 s of its 900 s limit, the component to :1311 about 108 s (explorations/perf-probes/checker-speed/REPORT.md section 7), the rest unmeasured; a run past the limit leaves the table without a total, which the gate reads red, so report the stage's time.",
"- Row 679, 1 site (:2525): Array2's offset answers oops(...) in two branches of its if, and oops is declared () (:1778), so the body types as OR((ZZ32, ZZ32),()). The repair in the shape of Array1's offset (:2238-2242) and Array3's (:2934-2941): each bound check a statement, if NOT (...) then oops(...) end, then the pair. Walk answers the same values.",
"- Under P-146, 1 site (:688): Integral's default numerator(self):ZZ = do z: ZZ = self; z end (the revival's, d846e3644), \"Right-hand side has type Integral[\\I\\], but declared type is ZZ.\": an I has no coercion into ZZ. The repair: Integral's numerator stays declared and loses its body; ZZ32, ZZ64 and NN64 (Library/FortressLibrary.fss:727, :814, :906) and NN32 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:385) each get numerator(self): ZZ = do z: ZZ = self; z end, which converts by ZZ's coercion from the concrete type, with the api line each as ZZ's (Library/FortressLibrary.fsi:672 in ZZ; .fsi:531, :586, :485; FortressBuiltin.fsi:131). Walk's value is the same conversion at the concrete type. Every object below Integral must then reach a body: walk refuses at load one that does not (F-145).",
"- Row 671, no distance site: NodeIM's opr SYMDIFF(self, other: SingletonIM[\\Val\\]) = self.seek(other.key) SYMDIFF other (Library/IntMap.fss:570-571) keeps of self only the entry seek finds, so under walk {0,1,2} SYMDIFF {5} is {2,5}. The repair answers what the library's comment says, \"the key/value mappings contained in exactly one input map\" (:360), in the singleton map's own shape (SingletonIM's SYMDIFF, :361-363, other.updateWith(...)), or by delegating to it; name the precedent line.",
"- Notes, not repairs: row 680 (the count's next error, by reading); row 678 (Array2's other two sites, Col and Row at :2568 and :2572, a list of ways); row 639 (an out-of-bounds index fails through fail, whose FAIL no interpreter test can hold); row 577.",
"",
"**Distance sites.** Row 679's :2525 and, under P-146, :688: 2 gone. If body(i) lands, the crash row at :1309 goes, and whatever __bigOperator's body shows is reported by row and line (none by reading). The count: 1 to 1 by reading, its error moving from :1311 to row 680's crash if body(i) lands, and staying at :1311 if walk makes you hold it; if the stage prints otherwise, a point to report, never red.",
"",
"**Files.**",
"- Library/FortressLibrary.fss: __bigOperator (:1309-1313); Array2's offset (:2525-2536); Integral's numerator (:688); numerator bodies in ZZ32, ZZ64 and NN64 (:727, :814, :906).",
"- Library/FortressLibrary.fsi: the numerator lines in ZZ32, ZZ64 and NN64 (:531, :586, :485).",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss and .fsi: NN32's numerator (:385, :131).",
"- Library/IntMap.fss (:570-571).",
"- ProjectFortress/tests/: IntMapSymdiffSingleton.fss's two pins (:12-13) changed; new files named by topic.",
"- Not: Array2's Col and Row lines (row 678), Array3 (row 680), the array family, the checker, walk, the specification, the team's tests.",
"",
"**Tests, first.**",
"- The count and distance stages are the failing-then-passing test of :1311, :2525 and :688, before from 13b's landed tables, after once on your final tree, read by row and line: :2525 and :688 gone, the :1309 crash row gone if body(i) landed, the count's table read (1 by reading, its error row 680's or :1311's) with the stage's time.",
"- Row 671: IntMapSymdiffSingleton.fss's two today's-value lines (:12-13) changed to the right values, {0,1,2,5} and {0,2}, red on the base, green after; beside them a node map SYMDIFF a singleton on a key it holds and on one it lacks, each asserted against the reverse order.",
"- Under P-146: NumeratorPerType.fss (walk), numerator(x) for one value of each of the five integer types against its ZZ value and denominator(x) against 1; it passes on the base, since walk converts the same way today, so it is seen passing, and the site's test is the stage.",
"- Row 679: a walk test of Array2's subscripts in bounds, passing before and after; the site's test is the stage.",
"- body(i): first one walk program with a list comprehension over a generator clause, refused by reading (Rows); if it runs, the interpreter suite after your last edit (below) is body(i)'s test, every big operator and comprehension under walk.",
"- Keep their verdicts: IntMapTest and the team's IntMap tests, RationalTest, the reductions' and comprehensions' tests, the seven walk array tests.",
"- After the edit: the interpreter suite once (ant testSystem), since walk reads the library.",
"",
"**Specification.** None. The text gives numerator on each integer type (Specification/basic-lib/basic-integers.tex:664-667), which stays true; Part IV renders the api lines when the PDF is rebuilt.",
"",
"**Overlaps by file.**",
"- L and W edit the library in different components: L FortressLibrary, FortressBuiltin and IntMap; W Random and QuickCheck. S's 29 sites are bodies L does not touch; numerator's lines are not S's. On the merged tree W's coverage check reads Integral's numerator without its default: each integer type's own body at numerator's own types is the plain case, so they meet only in the interpreter suite.",
"- ProjectFortress/tests/: L, P and W add distinct files; L alone changes IntMapSymdiffSingleton.fss.",
].join('\n')

const P_SECTION = [
"**The answers this rung follows.** The type group's late positions outweigh the early text (P-26): the POPL 2019 paper's and talk's worked examples test rules the revival implements, and the paper's No Duplicates Rule (Fig. 5, p. 11:13) and the 2011 paper's (Papers/Types/rules.tick:158-161) refuse a pair whose domains are each below the other. The specification's passage is the revival's own (576b4c287) and is restated on the non-strict relation in the S1 form (P-95, P-96); the compiled checker already refuses such a pair by its own duplicate check, so the defect is the text's alone. The examples' note (explorations/reviews/popl2019-examples.md, \"For the next batch\") lists the tests: each failing example becomes an expected-failure test, written test first; none of rows 697, 698, 699, 444, 373 or 537 is repaired here. Rows 697, 698 and 699 are filed; the optional walk row R4 and the notes on rows 444, 373, 537 and 696 are this rung's to file. Row 676's repair is named by its row: a fourth case, an exact power with the compiled path's refusal out of range. The expected-failure test owed for row 693 by batch 13's merged-diff review (review-routed.1) is a walk test, and this is the rung that writes walk tests.",
"",
"**Rows.**",
"- Row 696, no distance site: \"more specific\" is defined strictly (Specification/advanced/overloading.tex:539-542, \"and not the other way round\"), so the No Duplicates Rule, \"d1 and d2 are not each more specific than the other\" (:548-549), refuses no pair, and an equivalent pair falls to the Meet Rule. Restate it on the non-strict relation, or define \"as specific as\" beside the strict one: your wording, with the reason, both papers, and route C.",
"- The examples, in the note's list (\"Candidate test rung (group A, new or failing)\"). Failing today, each an expected failure: XXXDottedMethodMeetBothBodiesWalk (A1, row 444); XXXReturnRuleObjectParamWalk (A4, row 697); XXXGenericBoundsNoMeetWalk (A6, row 373); XXXOverloadZZ32BesideUserTrait.test (A10, row 698); XXXGenericInstanceReturnOnly.fss with GenericInstanceReturnOnlyLink.test and XXXGenericInstanceReturnOnly.test (A-C4, row 699); XXXGenericInstanceReturnOnlyWalk.fss (A-C4), under row R4 if you file it; and, low priority, XXXGenericBoundsMeet.fss with its two .test files (A-B2, row 537). Green today, plain or expected-failure as the note gives: XXXDottedMethodMeetBothBodies.test (A1); TwoTraitsNoMeetWalk and XXXTwoTraitsNoMeet.test (A3); XXXReturnRuleMeetCrossing.test (A4); DispatchCrossingMeetWalk and DispatchCrossingMeet (A5); XXXGenericBoundsNoMeet.test (A6); DispatchSymmetricSortedWalk and DispatchSymmetricSorted (A10, without the two-argument ZZ32 declaration), and A10's whole set under walk; GenericBoundsMeetWalk (A-B2). Beside them, B4's pair, dup[\\T\\](x: Box[\\T\\]) beside dup[\\U\\](x: Box[\\U\\]): a compile test keyed compile_err_contains=There are multiple declarations of dup, green on the base, the test row 696's close names.",
"- Row 676, no distance site: under walk Box[\\2^3\\] stops, \"EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented.\", since EvalType.forIntBinaryOp computes +, - and juxtaposition only (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-480). The compiled path computes the power by Naming.sizeOp (ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1222): a nonnegative exponent, any power of 0, 1 or -1, otherwise an exponent up to 4096. Walk's fourth case: an exact power, refused for a negative exponent and, by the same message walk gives a sum out of range, for a value beyond the size's range (F-140).",
"- Row 693's owed test: the generic object of batch 13's review.1, object H[\\T\\](y: T) extends A[\\T\\] where { T extends ZZ32 } with override f(x: String): String over A[\\T\\]'s f(x: T), which loads today against Specification/basic/traits.tex:603-604; an XXX walk test with its .test keyed load_exception_contains=does not override any inherited declaration, beside XXXOverrideObjectExpressionOverParamWalk, so that the row's repair promotes both.",
"- The rows' notes, from the note's \"Candidate ledger rows\": row 444 (A1's shape), row 373 (two reproducers, A6 and B4), row 537 (a third shape, A-B2), row 696 (the checker already refuses an equivalent pair); and each of rows 697, 698 and 699 noted with its test.",
"",
"**Distance sites.** None. Every path of the rung is one the count and distance stages do not read (tests, the specification, walk's evaluator): run neither and list the paths.",
"",
"**Files.**",
"- New files in ProjectFortress/tests/ and ProjectFortress/compiler_tests/, as the note names them; XXXNatArithPowerWalk.fss promoted.",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java (forIntBinaryOp, :468-480).",
"- Specification/advanced/overloading.tex (:531-560, \"Declarations with Static Parameters\") and Specification/appendices/changes.tex (the entry \"Overloading with static parameters\", :2270-2431).",
"- Specification/basic/expressions/constant.tex (the note, :15-21) and Specification/appendices/changes.tex (the entry \"When two sizes are the same\", its Effect's last sentence at :3280-3282), for row 676.",
"- Not: walk's load checks (OverloadedFunction.java, the repairs of rows 697, 444 and 373), the checker, the code generator, the compiler prelude, the library, every other walk file.",
"",
"**Tests, first.**",
"- Each example through the harness on the base, as the note ran them (its \"How the examples were run\"): each failing one seen failing as written and then gated as an expected failure; each green one seen passing.",
"- Row 676: XXXNatArithPowerWalk promoted to a name by topic, red on the base, with an exponent of 0 and a power of 1 and of -1 asserted. Each refusal, a negative exponent and a power out of the size's range, in a program of its own that instantiates the size in a top-level variable, with a .test keyed load_exception_contains on walk's message (the fortress-repo skill's tests-writing.md: a failure while the top-level variables are initialised counts as a refusal at load).",
"- Row 693: the XXX test above, passing on the base as the expected failure.",
"- Keep their verdicts: XXXOverloadExistentialMeet and XXXOverloadExistentialMeetWalk (rows 537, 539), XXX2f.test, XXXoverloadTest5, the walk size tests (NatReflectTest and the Nat*Walk tests), XXXOverrideObjectExpressionOverParamWalk, the Override*Walk tests.",
"- After the edit: the interpreter suite once (ant testSystem) and the compiler test track once (ant testQuick), since the rung adds files to both.",
"",
"**Specification.** Row 696: the No Duplicates sentence restated on the non-strict relation in the S1 form, with a callout, and the Appendix I entry \"Overloading with static parameters\" amended with the reason, the 2011 paper's and the 2019 paper's rule, and route C. Row 676: the text already gives a power in a static expression (Specification/basic/expressions/constant.tex, \"Static Expressions\"), so no normative sentence changes, but two revival sentences say walk stops on a power and your repair makes both false: the note at the head of that section, \"Of the static expressions in a size, the interpreter computes a sum, a difference and a product, and stops on a power (row~676 of the revival's gap ledger)\" (constant.tex:15-17), and the Effect of the Appendix I entry \"When two sizes are the same\" (Specification/appendices/changes.tex:3224-3294), \"The interpreter computes a sum, a difference and a product exactly when it instantiates a type and refuses a size outside its kind; it stops on a power (row~676).\" (:3280-3282). Correct each to what walk then does, each clause checked against EvalType.forIntBinaryOp. List every other sentence your change makes false.",
"",
"**Overlaps by file.**",
"- W edits walk too, in Constructor.java's abstract-method check and the coverage helpers of OverloadedFunction.java; P edits EvalType.forIntBinaryOp alone.",
"- Specification/appendices/changes.tex: S adds an entry before :3296, A amends another and W a third; P amends \"Overloading with static parameters\" and the last sentence of \"When two sizes are the same\", which ends just above S's new entry. Specification/advanced/overloading.tex and constant.tex are P's alone.",
"- ProjectFortress/compiler_tests/ and ProjectFortress/tests/: S, A, L, P and W add distinct files.",
].join('\n')

const W_SECTION = [
"**The answers this rung follows.** Item 51 is decided, P-147, in its words: \"An object defines an inherited abstract method when its bodies of that name at narrower parameter types together cover the abstract method's parameter types (item 51). It is the team's rule of 2012, in Steele's compiled checker and Welterweight's Covered rule, with comprises clauses read as the checker reads them; a body at the abstract method's own types is the plain case. So the team's Pairs and FileConversion stay valid, walk agrees with the checker, and the traits chapter's sentence is revised in the S1 form (P-96). Walk's allowance of any one narrower body goes. Still to build: batch 14's walk rung, which first repairs rows 668 and 669, then closes row 666.\" The coverage rule refuses the library without the two repairs (explorations/reviews/walk-load-readings-check.md, section 2.6), so they come first in this rung, each test first and committed, then walk's check, then the text. Each library repair takes the library's own way (P-27): name the precedent line of each. A comprises clause is read at the level of values (P-60), as walk's Meet Rule check of an overloaded function already reads one (F-27). The compiled checker already checks coverage (scala_src/typechecker/AbstractMethodChecker.scala:81-122) and is not this rung's. Row 665's abstract half, the same check on generic objects, object expressions in generic functions and generic traits, is not this rung's: the record keeps it out for a measurement (section 4), and its two expected failures keep their verdicts.",
"",
"**Rows.**",
"- Row 668, no distance site, two parts in Library/Random.fss. SeededRandomGenWithDistribution (:171-187) defines no body for SeededRandomGen's abstract getter seedSize and reseed(seedvec: Indexed[\\Seed,ZZ32\\]) (:88, :99), so MersenneTwisterInit(1).distributed[\\ZZ32\\](UniformDistribution[\\ZZ32\\](2:9)).seedSize stops walk, \"MethodClosure seedSize() ... has neither body nor def\"; walk loads the object only because its check skips generic objects (row 665). The trait's comment says what the proxy does, it \"behaves as like the original generator for reseed and perturbed calls\" (:131-132), and its own perturbed delegates to gen (:182-183): seedSize and reseed delegate the same way, reseed returning the proxy itself, as the comment on reseed asks (:92-97), with their api lines (Library/Random.fsi:155-166). And MersenneTwisterInit (:323-349) defines perturbed only at Indexed[\\ZZ32,ZZ32\\] (:341; api Library/Random.fsi:240) under the abstract perturbed(perturbvec: Generator[\\ZZ32\\]) (:126), which no body covers; its body only iterates seq(perturbvec), so by reading it takes the abstract declaration's own type, as LinearCongruential's and MersenneTwister's perturbed do (:237, :311).",
"- Row 669, no distance site: AnyGen declares perturb(obj: Any, g: AnySeededRandomGen) abstract (Library/QuickCheck.fss:80-83; api Library/QuickCheck.fsi:58-61), and the generators define perturb only at their element type (Gen[\\T\\]'s default perturb(obj: T, g) = g at :119; genZZ32's at :274 and the like), so under the coverage rule the generators without static parameters in QuickCheck and ReflectiveQuickCheck are refused (walk-load-readings-check.md section 2.6 counts 14), and today g: AnyGen = genZZ32; g.perturb(\"not a ZZ32\", MersenneTwisterInit(1)) stops walk. It is the Any device of row 628, retired for simpleJoin by typing it at the implementer's type (aadd02f23); AnyGen has no static parameter to type it at. By reading, the smallest repair in the library's own spelling is AnyGen's perturb with the body Gen's default already has, = g (:119), its api line no longer abstract; a covering perturb(obj: Any, g) = g in Gen is the other way. The design is yours, from the library's way; either changes a team declaration, a point to report.",
"- Row 666, no distance site, walk's allowance: Constructor.checkForDef (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:425-454) passes an inherited abstract declaration when definedBelow (:468-487) finds one body of the same name and self position whose parameter types are each at or below the abstract one's. One is enough, so XXXAbstractMethodPartlyDefinedWalk, tag(self, x: ZZ32) under the abstract tag(self, x: Number), loads. The repair, as the check reads it (section 2.5): gather every such body, and ask that together they cover the abstract declaration's parameter types, the self parameter not counted (Welterweight, Papers/Welterweight/static.tick:27-47), comprises clauses read. Walk's Meet Rule check already reads a cover so: OverloadedFunction.overlapCoveredBy (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:880-939) splits each position into parts through comprises clauses (overlapPieces, :1023; intersectionPieces, :963) and asks that every combination of parts lie below one declaration's domain. Follow that shape, sharing its helpers by widening their access, not by a copy; a body at the abstract declaration's own types is the plain case. Where the search does not settle (a cycle, its step bound, a type walk cannot read), say what the check does and why: overlapCoveredBy refuses, while definedBelow today accepts a domain it cannot read (:483-485).",
"- What it changes (the check's section 2.6): Pairs (RunRanges, Library/Pairs.fss:78-99), the team's FileConversion.fss (dna, :65-82) and the 20 demos that import Pairs load as today; row 666's shape is refused; the team's XXXUnimplementedMethod.fss stays refused. Without the repairs it would refuse MersenneTwisterInit, and with it Random, QuickCheck, ReflectiveQuickCheck and the tests that import them: LibraryMeetDeclarations, QuickCheckTest (the team's), RandomTest, ReflectiveNumberTypes, ReflectiveQuickCheckTest, UniformDistributionStridedRange and XXXUniformDistributionRangeType.",
"- Notes, not repairs: row 665 (its abstract half, kept out); row 670 (the demos that leave a method with no body at all, refused under every reading); row 628 (the precedent); row 577.",
"",
"**Distance sites.** None. The stages check the twelve components of distance.txt, among them neither Random nor QuickCheck, and walk's evaluator is a path they do not read; Library/ is not on the script's list of paths no stage reads, so run both once on your final tree, as your brief says, expecting no move. The count stays 1.",
"",
"**Files.**",
"- Library/Random.fss (SeededRandomGenWithDistribution, :171-187; MersenneTwisterInit's perturbed, :341) and Library/Random.fsi (:155-166, :240).",
"- Library/QuickCheck.fss (AnyGen, :80-83, or Gen, :110-125) and Library/QuickCheck.fsi (:58-61, or Gen's lines).",
"- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java (checkForDef and definedBelow, :411-487) and ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java (the access of the coverage helpers, :880-1065).",
"- Specification/basic/traits.tex (:579-581, in \"Method Declarations\"), Specification/basic/objects.tex (:149-154) if you revise it, and Specification/appendices/changes.tex (the entry \"Traits with comprises clauses read at the level of values\", :2614-2740).",
"- New and promoted files in ProjectFortress/tests/.",
"- Not: the checker; walk's override and Meet Rule checks and its generic stand-in (BuildEnvironments.checkGenericOverrides); EvalType.java (P's); FortressLibrary, FortressBuiltin and IntMap (L's); Pairs.fss, the demos and the team's tests.",
"",
"**Tests, first.**",
"- Row 668: a walk test by topic, through the harness, red on the base: the seedSize of a distributed seeded generator (the generator's own, 1), a reseed through it, after which its values equal those of a fresh proxy over the generator reseeded the same way, and MersenneTwisterInit's perturbed given a Generator[\\ZZ32\\] that is not Indexed (a filtered range), each value asserted. Then the repair.",
"- Row 669: a walk test, red on the base: g: AnyGen = genZZ32; g.perturb(\"not a ZZ32\", r) for a seeded r, its answer asserted as your repair defines it, with a perturb at the generator's own type beside it, unchanged. Then the repair.",
"- Row 666: XXXAbstractMethodPartlyDefinedWalk promoted to a name by topic, its .test keyed load_exception_contains=does not define an abstract method declared in type S; as the expected failure it passes on the base.",
"- Covered: a walk test, trait D comprises { P, Q } with an abstract f(self, other: D) and objects P and Q each defining f over P and over Q, run and its values asserted, passing on the base and after; beside it a two-parameter abstract declaration covered only by combinations of parts.",
"- Not covered: the same shape with D declaring no comprises clause, an object below D defining f over P and over Q only: a program with its .test keyed load_exception_contains=does not define an abstract method declared in type D, red on the base, where it loads.",
"- Keep their verdicts: PairsRunRangesWalk, FileConversion and XXXUnimplementedMethod (the team's), AbstractMethodUndefinedWalk, AbstractMethodUndefinedObjectExpressionWalk, XXXAbstractMethodUndefinedGenericWalk and XXXAbstractMethodUndefinedGenericObjectExpressionWalk (row 665), XXXComprisesLibraryTraitUnlistedExtender, and the seven tests that import Random, QuickCheck or ReflectiveQuickCheck (Rows).",
"- After the edit: the interpreter suite once (ant testSystem), since every load check reads every component walk loads; the count and distance stages once.",
"",
"**Specification.** The traits chapter's sentence, \"An abstract method declaration declares an abstract method; any object inheriting an abstract method must define a body expression for the method\" (Specification/basic/traits.tex:579-581; the Working Draft's at Specification-1.0-frozen/basic/traits.tex:511), revised in the S1 form in the words the functions chapter already uses for abstract functions, \"or definitions that together cover those types\" (Specification/basic/functions.tex:431-434), with a callout: the object defines the method by a body at its parameter types, or by bodies at narrower parameter types that together cover them, comprises clauses read. The objects chapter says an object \"must define all abstract methods inherited from its supertraits\" (Specification/basic/objects.tex:149-154): revise it in the same words, or say in the callout why it stays true. Amend the Appendix I entry \"Traits with comprises clauses read at the level of values\" (Specification/appendices/changes.tex:2614-2740), the home of the coverage reading: the traits chapter's section joins its Affected sections, its Change and Effect gain the sentence and what walk now refuses and accepts, its Original text the Working Draft's sentence, and its Rationale P-147's reasons (P-95, P-96). The callout at functions.tex:435-445 and the entry's Effect (changes.tex:2692-2696), on the compiled checker's coverage, corrected by climb batch 13's rung W (efd6bb2f2), stay true. List every other sentence your change makes false.",
"",
"**Overlaps by file.**",
"- Specification/basic/traits.tex: S's rule (b) passage is in \"Trait Declarations\" and its callout at :553-555 above W's sentence at :579-581. Specification/appendices/changes.tex: W amends \"Traits with comprises clauses read at the level of values\"; S, A and P add or amend other entries.",
"- Walk: P edits EvalType.forIntBinaryOp alone. The library: L edits FortressLibrary, FortressBuiltin and IntMap, W Random and QuickCheck; W's check reads L's Integral, whose numerator loses its default, only in the interpreter suite, each integer type's own body being the plain case.",
"- ProjectFortress/tests/: L, P and W add distinct files; W alone promotes XXXAbstractMethodPartlyDefinedWalk.",
].join('\n')

const S_ENTRY = { id: 'S', slug: 'rung-self-type', path: '/home/user/fortress-selftype', branch: 'wip/rung-self-type', expectedMinutes: 140,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The checker's self type: read from a trait's F-bound, with its extender check (the self-typed bodies, way 6, P-146)",
    blurb: "under P-146 (the self-typed bodies, way 6) the compiled checker types self in a method body of a trait with no comprises clause and an F-bounded parameter as the trait and that parameter at once, each declaration's signature keeping the plain trait type, and checks that whatever extends such a trait at X is an X; by the coordinator's default a trait's parameter bounded by a self-typed trait it extends at that parameter counts as its self parameter too, never an object's, so the Containment mixins stay valid; the self paragraph, rule (b)'s passage and an Appendix I entry in the S1 form; 29 sites, row 695's reproducer as an expected failure; Scala and Java under scala_src/ and compiler/index/.",
    section: S_SECTION,
    pointsToReport: [
      "A compiled test whose verdict changes other than by the rung's intent, or a ladder file that moves.",
      "A site that comes, by row and line, above all a Return Type Rule error at CMP or a CMP body typed Comparison, the unconfined rule's 21; a site gone beyond the 29.",
      "The distance stage's FortressLibrary time against 13b's 1,318 s, or a stage that stalls.",
      "An extender in the library, the demos or the tests that rule (b) refuses, the trips demo's object and PureList's List named, whether the widened reading accepts each, the Containment mixins and their extenders accepted or not, or a program the text allows that the checker now refuses outside self types.",
      "XXX10k's verdict moving, or Compiled17ee compiling.",
      "The patch changed from the judgement's, with the reason.",
      "Normative text changed beyond the self paragraph, rule (b)'s passage and their Appendix I entry, and every sentence made false.",
      "A library, walk or code-generator edit, or a walk test whose verdict changes (the disambiguator is a phase walk shares).",
    ],
    briefing: [
      "P-146", "P-27", "P-43", "P-44", "P-26", "P-95", "P-96", "F-53", "F-54", "F-121", "ledger:695", "F-103", "ledger:407",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#Way 6: the self type read from the F-bound",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#4. The recommendation",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#5. What it changes",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#6. The rung, and the one measurement",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#7. What it reverses or bends",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#Rule (a) alone, as section 6 asks",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#Rule (a) confined to bodies",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#The compiled run of a body that returns",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#What it means for the rung",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#The patch", "doc:explorations/reviews/array-judgements-popl-check.md#5. Batch 14",
      "doc:Specification/basic/expressions/var-ref.tex#Identifier References", "doc:Specification/basic/traits.tex#Trait Declarations",
      "map:spec-to-implementation.md#Chapter 10, Traits; Chapter 11, Objects",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala#case STraitDecl(_, STraitTypeHeader(sparams,_,name,_,_,_,_,_,_),",
      "code:ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java#public FunctionalMethod(FnDecl ast, TraitObjectDecl traitDecl, List<StaticParam> traitParams)",
      "code:ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java#SelfParamDisambiguator selfDisambig = new SelfParamDisambiguator();",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#def checkDeclComprises(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala#def getObjectExprType(obj: ObjectExpr): SelfType",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#private def checkObjectExprComprises(",
      "code:Library/FortressLibrary.fss#trait Integral[", "code:Library/FortressLibrary.fss#trait StandardTotalOrder[",
      "code:Library/FortressLibrary.fss#trait StandardMutableArrayType[", "code:Library/Containment.fsi#trait ContainmentBySubset[",
      "code:Library/Relation.fsi#trait Relation["],
    reasons: [
      "The decision you build, word for word: way 6, rules (a) and (b), the signatures kept plain, the library and walk unchanged, and its reason, which the coordinator's default on a mixin's parameter follows.",
      "The library's 29 bodies are the team's and stay as written; the checker is brought to read them as walk runs them.",
      "Route A stands: no clause enters the library and no type is identified with another; the reading that no self type enters the library is what P-146 sets aside.",
      "The comprises decision: the clause's text and walk stay; under a comprises clause the self type is the clause's, so rule (a) is never reached there.",
      "The type group's late word: Naden's construct used only in bounds, and the 2019 paper's declared types without intersections, which give the confinement its reason.",
      "Why the self paragraph and the traits chapter change: an Appendix I entry with the reason, the original text and route C.",
      "The form of your text changes: each passage revised in place with a callout, the entry with its reason.",
      "The distance and the count at the last landed gate, and where your before comes from: 13b's tables and the per-site list.",
      "The distance's classes: S1's 28 and R4's 1 are your 29 sites; S1's twenty-ninth, numerator at :688, is rung L's and files under OT once your rule changes its message.",
      "The team's spelling of the tower closure stays a comment: way 5, the clause, is the way not taken.",
      "A compiled body that returns self dies at class load: your run test is its reproducer, an expected failure; no repair is yours.",
      "A run-time failure needs a plain link test and an XXX run test over one component: the form of row 695's reproducer.",
      "Walk overflows on a trait that comprises its own parameter: why the clause way needs walk first; untouched here, a note.",
      "Way 6 read against the sources: rule (a), rule (b), what each clears, and why every extender in the tree meets rule (b).",
      "Why way 6, in order of weight, and the fallback that the measurement made unneeded.",
      "The edit file by file: the disambiguator, the hierarchy check, the two passages and the entry; the library and walk untouched.",
      "The rung as the judgement drew it: files, tests first, the specification and the overlaps, which your section takes over.",
      "The reading on record that the rule bends, and what it does not reverse: your decision record names it.",
      "The unconfined rule's 21 new sites and their cause in the Return Type Rule and call resolution: the regression your stage run watches.",
      "The confinement in FunctionalMethod.java and its measured result: the 29 gone, none new, no stall.",
      "The VerifyError of row 695, its probe and its controls: the shape of your expected-failure run test.",
      "What the rung still writes beyond the patch: rule (b), the object expression's case, the text and the tests.",
      "The measured patch, two files, which git apply --check accepts on the base: apply it, read it and own it.",
      "The 2019 paper against rules (a) and (b): no self types there, and the confinement's reason, which your decision record states.",
      "The self paragraph and the team's self-type idiom, where rule (a)'s sentence and its callout go.",
      "The extends and comprises passages, beside which rule (b)'s passage goes, and the revival's comprises callout as the form.",
      "Where traits and objects live in the checker, walk and the code generator: the hierarchy checker is your rule (b)'s home.",
      "Where a trait's self type is built today, from the comprises clause or the trait alone: rule (a)'s site.",
      "The index entry overloading, the Return Type Rule and call resolution read: the confinement's site.",
      "Where the self-param disambiguator runs, with no environment and before names are qualified: the widened reading needs the TopLevelEnv built just above it to read the bound's trait.",
      "The loop over extends clauses whose shape rule (b) follows, in a function of its own beside this one.",
      "Where an object expression's type is formed: rule (b)'s object-expression case.",
      "The precedent for rule (b)'s object-expression case: a walk over every object expression with its static parameters in scope, in the same file.",
      "Seven of your sites, the bodies that return self as I, and numerator's default, which is rung L's.",
      "Nine of your sites, the total order's bodies, R4's tuple among them.",
      "Four of your sites, dotted methods that return self as T: rule (a) reaches dotted methods too.",
      "The team's mixin whose parameter is bounded by Containment, which it extends at that parameter: by the coordinator's default its self parameter, so rule (b) accepts it.",
      "The mixin's extender at itself, which rule (b) then checks and accepts.",
    ],
    checks: [
      "P-146", "P-27", "P-43", "P-44", "ledger:695", "doc:explorations/reviews/self-typed-bodies-judgement.md#4. The recommendation",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#Rule (a) alone, as section 6 asks",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#Rule (a) confined to bodies",
      "doc:Specification/basic/expressions/var-ref.tex#Identifier References",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala#case STraitDecl(_, STraitTypeHeader(sparams,_,name,_,_,_,_,_,_),",
      "code:ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java#public FunctionalMethod(FnDecl ast, TraitObjectDecl traitDecl, List<StaticParam> traitParams)"] }

const A_ENTRY = { id: 'A', slug: 'rung-argument-context', path: '/home/user/fortress-argctx', branch: 'wip/rung-argument-context', expectedMinutes: 90,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The checker's argument retry: a call written as another call's argument (P-51, row 455)",
    blurb: "under P-51 (item 48 b, wide) the compiled checker, when no declaration of a call fits, checks again an argument that is a call with inferred static arguments against each declaration's parameter type, never passing over a declaration that already fits (P-49): row 455's two faces compile and run and row 535's pinned refusal becomes a passing test; the inference chapter's list of contexts and its Appendix I entry amended; no site; Scala in impls/Functionals.scala.",
    section: A_SECTION,
    pointsToReport: [
      "A compiled test whose verdict changes other than XXXInferContextDrops and XXXInferLoneUnionClosedTrait, or a ladder file that moves.",
      "A count or distance site that moves.",
      "A call whose chosen declaration changes, or a retried argument that displaces a declaration that already accepted the call.",
      "The probe's forks 2, 4 and 5 as built, and any departure from the probe's patch, with the reason.",
      "Normative text changed beyond the list of contexts, its item and the Appendix I entry.",
      "A checker file edited beyond Functionals.scala.",
    ],
    briefing: [
      "P-51", "P-49", "P-50", "P-95", "P-96", "F-87", "F-173", "F-78", "ledger:455", "ledger:535",
      "doc:explorations/reviews/argument-context-probe.md#The answers", "doc:explorations/reviews/argument-context-probe.md#The mechanism",
      "doc:explorations/reviews/argument-context-probe.md#The patch (wide), against fe74fb738",
      "doc:explorations/reviews/argument-context-probe.md#2. The faces and my programs",
      "doc:explorations/reviews/argument-context-probe.md#3. The compiler track", "doc:explorations/reviews/argument-context-probe.md#4. The distance",
      "doc:explorations/reviews/argument-context-probe.md#5. What the specification would need to say",
      "doc:explorations/reviews/argument-context-probe.md#6. Forks met, not decided",
      "doc:Specification/basic/inference.tex#The Static Arguments of a Call", "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
      "doc:Specification/basic/expressions/var-ref.tex#Identifier References",
      "doc:Specification/appendices/changes.tex#The contexts that give a call an expected type", "map:compile-path-walkthrough.md#How it walks the tree",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def typedApplication(preCandidates: List[PreAppCandidate],",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def inferFnExprParams(unchecked: FnExpr,",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)"],
    reasons: [
      "Item 48 (b) decided, wide: an argument that is a call with inferred static arguments is retried against each declaration's parameter type; the two tests it promotes.",
      "The order of the checker's attempts: a declaration that fits as written is never passed over, which settles the probe's third fork.",
      "The label body's expected type, decided the same way: the contexts are one rule everywhere.",
      "Why the inference chapter and its Appendix I entry change: the entry gains the context with its reason.",
      "The form of your text changes: the context added in place with a callout, the entry amended.",
      "The contexts the checker already gives an expected type, and the one it does not, another call's argument: its last clause becomes false.",
      "The inference chapter states the rule the checker builds: your text keeps that true.",
      "The checker's attempts at a call and the instance of a parameter nothing fixes: what the retry builds on.",
      "Your row: the two argument faces, refused today; the loose juxtaposition face was repaired before.",
      "Closed, but its expected failure pins a refusal that the retry repairs: the test becomes a plain passing run.",
      "The probe in ten points: one file, the two triggers, the faces, 22 probe calls, the track, the distance and the forks.",
      "How the retry works and where it runs: only when no attempt is kept, never displacing a declaration that fits.",
      "The patch you apply, which git apply --check accepts on the base at an offset of 13 lines: apply it, read it and own it.",
      "The 22 probe calls with their instances: the shapes your tests take, and the controls refused by every trigger.",
      "The two verdicts that change and why no other program of the track reaches the retry.",
      "The stage unmoved on batch 11's tree, the retry tried at 10 library sites and kept at none.",
      "The text under the wide trigger: the context added to the list, the item trimmed, the entry amended.",
      "The five forks: 1 decided wide, 3 by P-49, and 2, 4 and 5 built as the patch has them, on the review list.",
      "The chapter's list of contexts, which gains the argument of a call.",
      "The list of what the chapter does not yet describe, whose item on another call's argument you trim.",
      "Static arguments inferred from the context of the function call: the sentence your Appendix I Rationale cites.",
      "The entry whose Effect says the checker gives another call's argument no expected type (row 455): you amend it.",
      "The checker is bidirectional: an expected type pushed down drives inference, and Functionals takes every call form.",
      "Where every call form meets and the attempts run: the retry goes here, after rung N's earlier hunk at :324-389.",
      "The checker's own way of checking an unchecked argument again under an expected type: the retry's precedent.",
      "The loose juxtaposition's retry with the expected type: the same mechanism, a second precedent.",
    ],
    checks: [
      "P-51", "P-49", "ledger:455", "ledger:535", "doc:explorations/reviews/argument-context-probe.md#5. What the specification would need to say",
      "doc:explorations/reviews/argument-context-probe.md#6. Forks met, not decided",
      "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
      "doc:Specification/appendices/changes.tex#The contexts that give a call an expected type",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#def typedApplication(preCandidates: List[PreAppCandidate],"] }

const L_ENTRY = { id: 'L', slug: 'rung-library-followups', path: '/home/user/fortress-followups', branch: 'wip/rung-library-followups', expectedMinutes: 120,
    writesState: false, testIsStage: true, gateJoins: [], expectedMoves: [], expectedCheckerCount: 1,
    title: "The library's loose ends: __bigOperator's body(i) typed (the count's error), Array2's offset (row 679), Integral's numerator per type (P-146) and IntMap's SYMDIFF (row 671)",
    blurb: "__bigOperator's local body(i) typed body(i: I) under item 47's refusal, the count's one error, which then moves by reading to Array3's crash (row 680), the line held if walk refuses it, as by reading it does on every list comprehension; Array2's offset in Array1's shape (row 679); under P-146 each integer type's own numerator in ZZ's shape, Integral's default removed; IntMap's node map SYMDIFF a singleton keeping its other entries (row 671, two revival pins changed); 2 sites; library declarations only.",
    section: L_SECTION,
    pointsToReport: [
      "A walk test or a team test whose verdict changes, above all a reduction or comprehension refused at body's parameter, with the program and the instance walk gave I.",
      "The count's table after the edit, its total and its error, the stage's time against its 900 s limit (13b's 387 s), and any site that __bigOperator's body brings.",
      "A library or test type below Integral that walk refuses at load once numerator has no default.",
      "Each repair's precedent line, and a new api declaration beyond the four numerator lines.",
      "The pins changed in IntMapSymdiffSingleton.fss, each with its before and after.",
      "A team test line changed.",
      "A checker or walk edit, or a site whose only repair is one.",
    ],
    briefing: [
      "P-146", "P-27", "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement", "F-42", "F-53", "F-145",
      "F-141", "ledger:679", "ledger:671", "ledger:680", "ledger:678", "ledger:639",
      "doc:explorations/reviews/self-typed-bodies-judgement.md#:685, shape C, apart", "code:Library/FortressLibrary.fss#desugaredClauses:(Reduction",
      "code:Library/FortressLibrary.fsi#trait BigOperator[",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#private static ArrayList<FType> instanceOf(",
      "code:ProjectFortress/src/com/sun/fortress/Shell.java#private static Iterable<? extends StaticError> compilerPhases(Path path,",
      "code:Library/FortressLibrary.fss#offset(t1:(ZZ32,ZZ32)):(ZZ32,ZZ32) = do", "code:Library/FortressLibrary.fss#offset(i:ZZ32):ZZ32 = do",
      "code:Library/FortressLibrary.fss#offset(t:(ZZ32,ZZ32,ZZ32)):(ZZ32,ZZ32,ZZ32) = do", "code:Library/FortressLibrary.fss#trait Integral[",
      "code:Library/FortressLibrary.fsi#trait ZZ extends", "code:Library/IntMap.fss#opr SYMDIFF(self, other: SingletonIM",
      "code:Library/IntMap.fss#other.updateWith(fn (mv) => if mv.holds then", "code:ProjectFortress/tests/IntMapSymdiffSingleton.fss#run(): () = do"],
    reasons: [
      "The decision word for word; its last sentences give your numerator lines: the thirtieth site takes one numerator per integer type.",
      "Each repair in the library's own spelling: Array1's offset, ZZ's numerator, the singleton map's own SYMDIFF; name each precedent line.",
      "The library rule as it is read: the four numerator api lines are an extension the review list judges, shown ZZ's line; name it in your report.",
      "Item 47's refusal of an untyped local parameter, and why clearing an earlier error can change what the count shows.",
      "The count stops at a component's first error, now body(i): why it stays 1 by reading once body(i) is typed.",
      "Walk refuses at load an object that leaves an inherited abstract method without a body: what Integral's numerator without a default asks of every type below it.",
      "Under walk a big operator's plain-bounded parameter that nothing fixes stays at BottomType: why body(i: I) is refused on a list comprehension by reading.",
      "Array2's offset answers oops in two branches: your site at :2525.",
      "IntMap's node map SYMDIFF a singleton keeps one entry: your walk repair and the two pins its test holds.",
      "Array3's crash, the count's next error by reading once body(i) is typed: a note, not yours.",
      "Array2's two other sites, a size lost in a factory, a list of ways: not yours.",
      "No interpreter test can hold fail's FAIL: why the offset's out-of-bounds path has no walk test.",
      "Numerator's default at :688: why no self type reaches it and the per-type body in ZZ's shape, under P-146.",
      "__bigOperator, the count's one error at body(i): the type you write.",
      "The getters whose types make body(i: I) check: body I->R, unwrap R->O, reduction ActualReduction[R,L].",
      "Walk's instance of a static parameter: a big operator's unfixed plain-bounded one stays BottomType, which body(i: I) would then check each element against.",
      "Why a crash in the component's check counts as one error: the reading behind the count's declared 1.",
      "Array2's offset, row 679's site.",
      "Array1's offset, the precedent: each bound check a statement, then the value.",
      "Array3's offset, the same shape at rank 3.",
      "Integral, whose numerator loses its default body under P-146.",
      "ZZ's api, whose numerator line is the precedent for the four you add.",
      "Row 671's site, the node map's SYMDIFF with a singleton.",
      "The singleton map's own SYMDIFF body, the precedent for row 671's repair.",
      "The revival test that pins today's two wrong values: its lines 12 and 13 change.",
    ],
    checks: [
      "P-146", "P-27", "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement", "F-42", "F-141",
      "ledger:679", "ledger:671", "doc:explorations/reviews/self-typed-bodies-judgement.md#:685, shape C, apart",
      "code:Library/FortressLibrary.fss#offset(i:ZZ32):ZZ32 = do", "code:Library/FortressLibrary.fss#trait Integral["] }

const P_ENTRY = { id: 'P', slug: 'rung-popl-examples', path: '/home/user/fortress-popl', branch: 'wip/rung-popl-examples', expectedMinutes: 100,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The POPL 2019 examples as tests (rows 697 to 699), the No Duplicates Rule restated (row 696), walk's power in a size (row 676) and row 693's owed test",
    blurb: "the POPL 2019 paper's and talk's worked examples as tests, seven green and seven expected failures gating rows 697, 698 and 699 with notes on rows 444, 373 and 537 (row R4 if filed), the No Duplicates Rule restated on the non-strict relation with its Appendix I entry (row 696), walk's power in a size (row 676, XXXNatArithPowerWalk promoted, with the note and Appendix I sentence that say walk stops on it corrected) and the expected failure owed for row 693; tests, the overloading chapter, the static expressions' note and one walk function.",
    section: P_SECTION,
    pointsToReport: [
      "An example that passes where the note says it fails, or fails where it says it passes, with its run.",
      "A walk or compiled test whose verdict changes other than XXXNatArithPowerWalk's promotion.",
      "Each row filed and each note written, and row R4 filed or not, with the reason.",
      "A power in a size whose value or refusal differs between walk and the compiled path.",
      "Normative text changed beyond the No Duplicates Rule and its Appendix I entry, and each sentence on walk's power in a size corrected (constant.tex's note, the Effect of \"When two sizes are the same\").",
      "A walk edit beyond EvalType.forIntBinaryOp, or a checker, library or code-generator edit.",
    ],
    briefing: [
      "P-26", "P-25", "P-95", "P-96", "F-174", "F-175", "F-50", "F-27", "F-103", "F-140", "F-147", "ledger:696", "ledger:697", "ledger:698", "ledger:699",
      "ledger:444", "ledger:373", "ledger:537", "ledger:676", "ledger:693", "doc:explorations/reviews/popl2019-examples.md#How the examples were run",
      "doc:explorations/reviews/popl2019-examples.md#Group A: rules the revival implements",
      "doc:explorations/reviews/popl2019-examples.md#B4. The No Duplicates Rule",
      "doc:explorations/reviews/popl2019-examples.md#Candidate test rung (group A, new or failing)",
      "doc:explorations/reviews/popl2019-examples.md#Candidate ledger rows",
      "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters",
      "doc:Specification/appendices/changes.tex#Overloading with static parameters", "doc:Specification/basic/expressions/constant.tex#Static Expressions",
      "doc:Specification/appendices/changes.tex#When two sizes are the same",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public FType forIntBinaryOp(IntBinaryOp n)",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java#public static java.math.BigInteger sizeOp("],
    reasons: [
      "The type group's late word outweighs the early text: the 2019 paper's examples test the revival's rules, and its No Duplicates Rule is non-strict.",
      "The specification is the standard: a wording that refuses nothing is the text's defect, restated.",
      "Why the overloading chapter and its Appendix I entry change: the reason, both papers and route C.",
      "The form of your text change: the rule restated in place with a callout, the entry amended.",
      "The specification states the 2011 overloading model, a declaration with static parameters read over its instances.",
      "The run-time instance of a dispatched declaration follows the 2019 paper: what A-C4's tests test.",
      "The checker lets overloads differ in static parameters and refuses only pairs it cannot prove unambiguous.",
      "Walk's load check of a generic declaration beside a plain one, on declared domains: what A6 and A-B2 test under walk.",
      "An XXX compile test can express a compile-stage failure only: a run-time failure needs a link test and an XXX run test.",
      "A size beyond NN32 or ZZ32 is refused on both paths and walk reads a size exactly: the refusal your power case keeps.",
      "Walk reads an override by the strict subtype and checks a generic declaration's override at its declaration: row 693's lenience.",
      "Your text row: the No Duplicates Rule on a strict relation refuses no pair.",
      "Walk's load check reads a differing object type as excluding: A4's expected failure gates it.",
      "The compiler prelude's ZZ32 has no comprises clause: A10's expected failure gates it until the switch-over.",
      "A dispatched generic declaration whose parameter only its return type mentions fails verification: A-C4's pair gates it.",
      "Walk loads an inherited functional method with two bodies and no meet: A1's expected failure, a note.",
      "Walk runs two generic overloads whose domains overlap: A6's and B4's reproducers, a note.",
      "Two generic declarations with different bounds die compiled: A-B2's third shape, a note.",
      "Walk stops on a power in a size: your one walk repair, a fourth case in forIntBinaryOp.",
      "Walk accepts an override that overrides nothing over a static parameter: the owed expected failure of the generic object's shape.",
      "How each example became a program and ran on both paths: the form your tests take.",
      "Each example, its source page, its Fortress form, what today's tree does and its test: your tests, written from these.",
      "B4's pair, refused by the checker's own duplicate check: row 696's close test and the note.",
      "The fourteen tests by name, failing and green: your list.",
      "The rows filed as 697 to 699, the optional R4 and the notes on rows 444, 373, 537 and 696, as checked.",
      "The strict definition of more specific and the No Duplicates Rule you restate.",
      "The entry that recorded the passage: you amend it with the restatement's reason.",
      "The text gives a power in a static expression; the note at its head says walk stops on a power (row 676), which your repair makes false: you correct it.",
      "The entry whose Effect ends that the interpreter stops on a power (row 676): you correct that sentence.",
      "Walk's size arithmetic: plus, minus and juxtaposition computed exactly, the power missing.",
      "The compiled path's size arithmetic, the power with its exponent limit: the behaviour walk's case matches.",
    ],
    checks: [
      "P-26", "ledger:696", "ledger:676", "doc:explorations/reviews/popl2019-examples.md#Candidate test rung (group A, new or failing)",
      "doc:explorations/reviews/popl2019-examples.md#Candidate ledger rows",
      "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters",
      "doc:Specification/appendices/changes.tex#When two sizes are the same",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#public FType forIntBinaryOp(IntBinaryOp n)"] }

const W_ENTRY = { id: 'W', slug: 'rung-walk-coverage', path: '/home/user/fortress-coverage', branch: 'wip/rung-walk-coverage', expectedMinutes: 110,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "Walk's coverage rule for an inherited abstract method (item 51, P-147): rows 668 and 669 repaired first, then row 666",
    blurb: "under P-147 (item 51, coverage) the library sites that lean on walk's allowance are repaired first, Random's distributed generator and MersenneTwisterInit (row 668) and QuickCheck's AnyGen.perturb (row 669), then walk counts an inherited abstract method as defined when the object's narrower bodies together cover its parameter types, comprises clauses read, and no longer when one narrower body does (row 666, XXXAbstractMethodPartlyDefinedWalk promoted); the traits chapter's sentence revised in the S1 form, Appendix I's coverage entry amended; generic objects left out; no site; Fortress under Library/ and Java under interpreter/evaluator/values/.",
    section: W_SECTION,
    pointsToReport: [
      "A library type, a team test or a demo that walk now refuses at load or newly accepts, with the abstract declaration and the bodies.",
      "Each library repair's precedent line, and each team declaration changed (MersenneTwisterInit's perturbed, SeededRandomGenWithDistribution's seedSize and reseed, AnyGen's or Gen's perturb) with its api line.",
      "What the coverage check does where its search does not settle, each type it could not decide, and a walk value that changes in a test importing Random or QuickCheck.",
      "Normative text changed beyond the traits chapter's sentence, the objects chapter's if revised, and the Appendix I entry.",
      "A checker or code-generator edit, a walk edit beyond the abstract-method check and the access of the helpers it calls, or a count or distance site that moves.",
    ],
    briefing: [
      "P-147", "P-27", "P-60", "P-26", "P-95", "P-96", "F-145", "F-27", "ledger:666", "ledger:668", "ledger:669", "ledger:665", "ledger:628", "ledger:670",
      "doc:explorations/reviews/walk-load-readings-check.md#2.2 The chapter's letter",
      "doc:explorations/reviews/walk-load-readings-check.md#2.3 The team's later word",
      "doc:explorations/reviews/walk-load-readings-check.md#2.4 The team's library and tests",
      "doc:explorations/reviews/walk-load-readings-check.md#2.5 Verdict",
      "doc:explorations/reviews/walk-load-readings-check.md#2.6 What replacing it would change",
      "doc:explorations/compile-ladder/rung-walk-load-checks/REPORT.md#4. What the library, the team's tests and the demos meet",
      "doc:Specification/basic/traits.tex#Method Declarations", "doc:Specification/basic/functions.tex#Abstract Function Declarations",
      "doc:Specification/basic/objects.tex#Object Declarations",
      "doc:Specification/appendices/changes.tex#Traits with comprises clauses read at the level of values",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private void checkForDef(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static boolean definedBelow(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#static private boolean overlapCoveredBy(",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#static private List<Set<FType>> overlapPieces(",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala#private def checkObjectDeclaration(",
      "code:Library/Random.fss#trait SeededRandomGen[", "code:Library/Random.fss#object SeededRandomGenWithDistribution[",
      "code:Library/Random.fss#object MersenneTwisterInit(", "code:Library/QuickCheck.fss#trait AnyGen", "code:Library/QuickCheck.fss#trait Gen[",
      "code:Library/Pairs.fss#trait RunRanges"],
    reasons: [
      "The decision you build, word for word: coverage defines an inherited abstract method; rows 668 and 669 repaired first, then row 666 closed and the traits sentence revised.",
      "Each library repair in the library's own way: the proxy delegating as its perturbed does, a parameter at the abstract declaration's type, Gen's own default for perturb.",
      "The specification reads a comprises clause at the level of values: covering is defined once, and your sentence uses it.",
      "The type group's late word, Steele's checker of 2012 and Welterweight's Covered rule, outweighs the Working Draft's sentence.",
      "Why the traits chapter and its Appendix I entry change: the reason, the original text and route C.",
      "The form of your text change: the sentence revised in place with a callout, the entry amended.",
      "What walk refuses at load today, the allowance of row 666 that goes, and why generic objects are skipped (row 665).",
      "Walk's load check of an overloaded function covers an overlap through comprises clauses (overlapCoveredBy): the reader your coverage test shares.",
      "Your walk row: one narrower body passes today; XXXAbstractMethodPartlyDefinedWalk is promoted and the row closes.",
      "Your first library row: the distributed generator without seedSize and reseed, and MersenneTwisterInit's perturbed at a narrower type.",
      "Your second library row: AnyGen's abstract perturb at Any that the generators define only at their element type.",
      "The same check on generic objects, its abstract half: not yours, kept out for a measurement; its expected failures keep their verdicts.",
      "The Any device retired for simpleJoin by typing it at the implementer's type: the precedent row 669's repair weighs.",
      "The demos that leave a method with no body at all, refused under every reading: a note, no demo edited.",
      "The traits chapter's sentence and the functions chapter's covering words, the two texts your revision joins.",
      "Steele's checker, its comprises reading since 59fdeff62, and Welterweight's Covered rule: P-147's sources.",
      "Pairs and FileConversion, which coverage keeps valid, and the two library sites, rows 668 and 669, which need repairs.",
      "The rule to build and where: definedBelow gathering every body and testing coverage with walk's comprises reader.",
      "What coverage accepts and refuses, and why the library repairs come first: the tests that must keep their verdicts.",
      "The one measurement of the check on the library, at instances on batch 12's tree: what the exact reading refused.",
      "The sentence at :579-581 you revise, beside the inheritance rule it rests on.",
      "The covering words at :431-434 your sentence takes, and the callout already true of the compiled checker.",
      "The objects chapter's sentence that an object defines every inherited abstract method: revise it or say why it stays true.",
      "The coverage reading's entry, which you amend: its affected sections, change, effect, original text and rationale.",
      "The check that refuses an object leaving an inherited abstract method without a body.",
      "The allowance that goes: one body at or below the abstract types is enough today.",
      "Walk's own coverage test for the Meet Rule: parts through comprises clauses, every combination below one declaration; the shape to follow.",
      "Walk's reader of comprises clauses, which splits a type into the types its clause lists, and gives no answer on a symbolic type.",
      "The compiled checker's coverage rule, Steele's of 2012: the rule walk now agrees with.",
      "The abstract seedSize, reseed and perturbed, and the comment on what the distributed proxy does.",
      "Row 668's first site: no seedSize, no reseed; its perturbed delegates to gen, the shape the two new bodies take.",
      "Row 668's second site: perturbed at Indexed under the abstract at Generator.",
      "Row 669's site: perturb abstract at Any.",
      "Gen's own default perturb, the body by reading AnyGen's takes.",
      "The team's coverage shape in the library: RunRanges covered by its two listed types, which must stay valid.",
    ],
    checks: [
      "P-147", "P-27", "ledger:666", "ledger:668", "ledger:669", "doc:explorations/reviews/walk-load-readings-check.md#2.5 Verdict",
      "doc:explorations/reviews/walk-load-readings-check.md#2.6 What replacing it would change", "doc:Specification/basic/traits.tex#Method Declarations",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java#private static boolean definedBelow("] }

const RUNGS = [S_ENTRY, A_ENTRY, L_ENTRY, P_ENTRY, W_ENTRY]
const BATCH_INTRO = "This run is climb batch 14, the record CLIMB-BATCH-14.md, phase 3's next batch after 13 and 13b, toward the checker at a true zero: two checker rungs, one library rung, one walk rung with the two library repairs it needs first, and one rung of tests, texts and one walk function. The decisions on record built here are P-146 (the self-typed bodies, way 6), P-147 (item 51, coverage), P-51 (item 48 b, wide) and item 47's refusal of an untyped local parameter; beside P-146, a default the coordinator took is on the review list: a trait's parameter bounded by a self-typed trait it extends at that parameter counts as the trait's self parameter. The distance stands at 85 and the count at 1 after climb batch 13b (compile-ladder/climb-batch-13b/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another. S and A edit the checker in different files: S the self-parameter disambiguator, the functional method's index entry and the hierarchy check, A impls/Functionals.scala. L and W edit the library in different components: L FortressLibrary, FortressBuiltin and IntMap; W Random and QuickCheck. W edits walk's abstract-method check in Constructor.java and the access of OverloadedFunction's coverage helpers; P edits walk's EvalType.forIntBinaryOp alone. The test folders take each rung's distinct files. Specification/appendices/changes.tex takes S's new entry and A's, P's and W's amendments of four other entries; the traits chapter takes S's rule (b) passage and its callout at :553-555, and W's sentence at :579-581. S, A and L move the checker's view of component FortressLibrary; S, L, P and W reach the interpreter suite; the gate measures and runs the merged tree. ant testSpecData runs in the gate because 13b's landed summary has it."
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
'   The after runs once, on your final code, after your last edit is built, into tmp/' + rung.slug + '/. Both stages can run past the Bash tool\'s 300 s limit, so start each in the background with nohup, in the form of the skill\'s session.md, "Long commands", never in the foreground: the count (about 5 minutes, 280 to 390 s in climb batches 13b and 14), which you wait for with that section\'s wait_for on tmp/' + rung.slug + '/count-run.txt, called again until it prints its EXIT= line; and the distance (about half an hour, one core: 26 to 29 minutes in climb batch 14), read when your report is written:',
'',
'        nohup bash -c \'( ' + COUNT_RUN + ' tmp/' + rung.slug + '/checker-count-postedit.txt tmp/' + rung.slug + '/cc-post ) > tmp/' + rung.slug + '/count-run.txt 2>&1; echo EXIT=$? >> tmp/' + rung.slug + '/count-run.txt\' >/dev/null 2>&1 &',
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
