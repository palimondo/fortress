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
    { title: 'Disk', detail: 'df -P /home/user read before the scatter; under the floor of 1.5 G a rung and 4 G for the main tree, the run stops before any rung starts' },
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
// Generated by explorations/compile-ladder/plan-28/manifest/gen28.py from
// CLIMB-BATCH-28.md (section 4, each rung's section word for word; section 1, the
// manifest fields; section 6, the intro) and the briefings of lists28.py; check28.js checks it.
// Climb batch 28: rungs V, R, A, K, H, S, T, the manifest's order; none lands only with another.
// A waits on his answer to Q2 (the record, section 1): it runs on his answer or its default by the go rule.
// S, for its second half, waits on his answer to Q3 (the record, section 1): it runs on his answer or its default by the go rule.
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order only),
// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line
// for the batch table), section (the rung's section of the record, read by every role
// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the
// worker reads first, each with its reason; of section 3's forks, the batch's, the
// rung's own and those of each rung that shares a file with it), checks (the sub-list
// the skeptic, a judge and a repair round read), expectedMoves (ladder moves declared,
// none here), and the optional landsOnlyWith, expectedCheckerCount and
// expectedCheckerCrash: no rung lands only with another or declares a checker count or
// a crash (the count is reported).
// A section keeps the record's few characters outside ASCII as \u escapes.
// No value is set at launch. The base and the base build are args.base and
// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The
// Workflow harness runs two agents at once on this box"); the scatter starts the
// longest expected worker first.
// ===========================================================================

const BATCH = '28'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-28.md'
const BRIEFING_LISTS = 'explorations/compile-ladder/plan-28/manifest/lists28.py'

const V_SECTION = [
"**The mission.** The one library's integer types convert by names that keep the low bits, and a call of one on a type that lacks it falls through a coercion to another type's (rows 858, 859). ZZ's narrow and widen are wrong code: its widen can narrow, and turns 2^63 negative (row 502). P-161 gives every integer type the checked getters, which raise IntegerOverflow where the value does not fit, and keeps the low-bits names as what they are. ZZ32's big and ZZ's two are 3 of the 102 bindings left on glue. P-169 adds IntLiteral's 8 conversions and comparisons, written in Fortress over its asZZ, before the names batch; four of them read the checked getters that this rung adds.",
"",
"**The decisions this rung builds.** P-161, his option 6 of reviews/integer-conversions-2026-11-06.md, whole: on each of ZZ32, ZZ64, NN32, NN64 and ZZ, the getters asZZ32, asZZ64, asNN32, asNN64 and asZZ, 25 in all, of which 5 are identities, 7 equal the coercions and 13 can raise; the four fixed widths' bitsAs... getters, which equal signed and unsigned; narrow, widen, unsigned, signed and big kept as the low-bits forms, declared on every type where they apply, ZZ excepted for narrow and widen; ZZ's narrow and widen deleted, their callers moved onto .asZZ32 or .asZZ64; ZZ32's big onto nativeHelpers/simpleArbitraryPrecisionArith.makeZZfromZZ32 (:130; P-162); the specification's sentences and an Appendix I entry. P-72 (narrow keeps the low 32 bits on the fixed widths), P-73 (fixed-width arithmetic raises) and P-74 (an exact conversion is implicit) stand. P-169: IntLiteral's 8 become Fortress text over its asZZ. P-37: no declaration is added to the prelude. This record's section 3, forks 1 to 5 and V1 to V6 (7 to 12), give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- Library/FortressLibrary.fss and .fsi, in the traits ZZ32 (:763), ZZ64 (:860), NN64 (:962) and ZZ (:1050); ProjectFortress/LibraryBuiltin/FortressBuiltin.fss and .fsi, in value object NN32 (:422): the 25 getters, each in the api; the four bitsAs...; the low-bits names where a type lacks one (fork V5). A getter that can raise is a Fortress body with a range test and throw IntegerOverflow, except the three pairs that bind an existing helper (fork V1). A new binding over NN32 or NN64 is tested on both paths at values where a signed and an unsigned reading differ, 2^31 and up for NN32, 2^63 and up for NN64 (the review's 6.0).",
"- ZZ's narrow and widen (Library/FortressLibrary.fss:1150-1154, .fsi) deleted; ZZ32's big (:854-855) onto makeZZfromZZ32.",
"- The callers moved, each value unchanged (fork V4): Library/Format.fss:70, :117, :122; Library/QuickCheck.fss:320, :322, :323; ProjectFortress/demos/sudoku.fss:42-43; ProjectFortress/compiler_tests/XXXZZNarrowRungP.fss; Library/FortressLibrary.fss:723 and :754, in rung I's private count functions. Find every other call of a ZZ's narrow or widen with git grep and by the walk suite; name each in your report.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, value object IntLiteral (:529): asZZ32, asZZ64, asNN32, asNN64 as self.asZZ followed by ZZ's getter; asString and asExprString as self.asZZ.asString; = at IntLiteral as self.asZZ = b.asZZ; cmp as -1, 0 or 1 by ZZ's order (forks V2, V3). Their api lines (FortressBuiltin.fsi:190-240, value object IntLiteral) stay.",
"- Specification/basic-lib/basic-integers.tex:39-45: the getters' sentences beside narrow's, ZZ dropped from it, with a callout and an Appendix I entry in Specification/appendices/changes.tex, in the revision form (P-96; fork V6). The entry \"Shifts and narrowing on the integer types\" (changes.tex:1725, label revival-shifts) and its callout (basic-integers.tex:63-66) state narrow on ZZ: amend the clauses that your deletion makes false, as climb batch 27's rung N amended one clause of another entry, and name each in your report.",
"- Not yours: the prelude; IntLiteral's other 21 and FloatLiteral's 3 (N5); the saturating operators (row 797); Appendix I's natives effect, which the gather revises (fork 5).",
"",
"**Tests, first.**",
"- ProjectFortress/tests/IntegerConversionsWalk.fss: each of the 25 getters at its edges, in range and one past each end, the 13 that can raise caught as IntegerOverflow; the four bitsAs...; each low-bits name on each type that now declares it; a ZZ that once took narrow or widen, now asZZ32 or asZZ64, in range and out. Seen failing on the base through the harness: the getters do not exist.",
"- ProjectFortress/tests/IntLiteralTextWalk.fss: the 8 at the object IntLiteral (its value 0; P-76: no walk numeral is an IntLiteral), and ZZ32's big of 2^31-1 and -2^31. A guard: the same answers on the base and after, since walk answers them today by glue.",
"- A compiled test of each new helper binding, if fork V1 adds one, bound in its own declarations as compiler_tests/NativeHelperBindingCompiled.fss binds a helper (compiler.md, \"Natives\").",
"- XXXZZNarrowRungP rewritten (fork V4): its run before and after through junit.sh.",
"- Keep their verdicts: walk's integer tests, FlatTowerRungF, NativeHelperFamilyZZ32Walk and the other families' tests; the demo driver at the gather.",
"- After the change: ant testSystem and ant testQuick once each; your compiled tests through junit.sh (fork 2).",
"",
"**The stages.** Both, once each on your final tree (fork 3), from the tree's root after ant compileAll:",
"",
"    explorations/coordinator/tools/checker-count/run.sh tmp/rung-integer-conversions/checker-count-postedit.txt tmp/rung-integer-conversions/cc-post",
"    explorations/coordinator/tools/distance/run.sh tmp/rung-integer-conversions/distance-postedit.txt tmp/rung-integer-conversions/dist-post",
"",
"Compare each with climb batch 27's gate table by diff, and the distance with explorations/coordinator/tools/distance/compare.sh; tie every new row to an edit. The crash rows: section 1's common fields.",
"",
"**Rows.** Rows 858, 859 and 502 close with your commit, each with its test; row 349's half on narrow of a ZZ closes, so your record.md gives its whole new line after you read it with ledger.py show 349. Row 578 stays.",
"",
"**Specification.** Yours: fork V6. List every sentence made false: F-172 and every FACTS entry on ZZ's narrow or widen (facts-extract.sh 'narrow'), the fortress-repo skill's parts on the library and on how revived Fortress differs, where they name the conversions, PLAN's line on P-161.",
"",
"**Files.**",
"- Library/FortressLibrary.fss and .fsi: the four integer traits, rung I's two count functions, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss and .fsi: value object NN32, value object IntLiteral, only.",
"- Library/Format.fss, Library/QuickCheck.fss, ProjectFortress/demos/sudoku.fss: the callers, only.",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/: a helper only where fork V1 needs one.",
"- Specification/basic-lib/basic-integers.tex, Specification/appendices/changes.tex: your entry, only.",
"- ProjectFortress/tests/, ProjectFortress/compiler_tests/: your tests and XXXZZNarrowRungP.",
"- Not: the prelude, walk, the checker, the tools, the natives effect of Appendix I.",
"",
"**Reserved points.** A step that would edit the prelude. A model line: none reaches a conversion (the review, section 5).",
"",
"**Overlaps by file.** FortressLibrary.fss with R (the reader trait, :1959-1967), A (its store trait, before __parr, :2392) and H (printTaskTrace, :4625): other declarations. FortressBuiltin.fss with R and A (native objects at other places) and H (Thread, :775-786). FortressLibrary.fsi with R and A. changes.tex: yours is the batch's only Appendix I entry.",
].join('\n')

const R_SECTION = [
"**The mission.** Every file a program reads, microGPT's data among them (explorations/run-c4/src/FlatData.fss:69-86), goes through FileReadStream, an object of the native component File whose 10 methods name glue classes that only walk can call; Reader and stdIn are the same in Reader's component, 10 more; FileWriteStream's 5 stayed on glue in climb batch 27, since an object of a native component cannot hold a field under walk (row 926). This rung makes the three objects plain Fortress objects over a Java-backed value in a field, as rung W made Writer, and ends both components' nativeness, so their 25 glue bindings go.",
"",
"**The decisions this rung builds.** P-164: the two traits take the prelude's names and methods; each method is a public native binding in P-58's form on a helper of nativeHelpers/fileOps; walk's loader carries JavaBufferedReader by name as the Java class FortressBufferedReader, through a private native object below the trait; FileReadStream and Reader leave their native components and each holds its Java-backed value in a field, as the team's BirdyLib FileReadStream does; the reader side's helpers are 9 existing and one new one for standard input. Item 373: FileWriteStream moves with this rung. F-330 gives the writer side as landed: both traits, both table entries (compiler/NamingCzar.java:453-454, :490-491), FileNotFoundException. No model line changes. This record's section 3, forks 1 to 5 and R1 to R7 (13 to 19), give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- Library/FortressLibrary.fss:1959-1960 and .fsi:1265-1266: trait JavaBufferedReader gains the prelude's eight methods (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:592-601), each a public binding on its fileOps helper: read(): Char on jbrRead (fork R1), readLine(): String on jbrReadLine, readk(k: ZZ32): String on jbrReadk, eof(): Boolean, ready(): Boolean, close(), whenUnconsumed() and consume() on theirs. After makeJavaBufferedStdErr (:1966-1967, .fsi:1271): makeJavaBufferedReader(name: FlatString) on jbrOpen, and makeJavaBufferedStdIn() on a new jbrStdIn (fork R4).",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java: jbrStdIn(), a FortressBufferedReader over System.in in UTF-8, named <stdin>, beside jbwStdErr (:91-94), as jbwStdOut is made.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, right after JavaBufferedWriterObject (:788-791): private object JavaBufferedReaderObject extends JavaBufferedReader end, its native constructor a new interpreter/glue/prim/JavaBufferedReaderObject.java with its nested Value holding a FortressBufferedReader, as JavaBufferedWriterObject.java is.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java: javaFor carries JavaBufferedReader by name in FortressBufferedReader (beside :67), carried admits it (:100), unbox takes the reader out of a JavaBufferedReaderObject.Value (beside :292-295), box makes one (beside :318).",
"- Library/File.fss and .fsi: component File, no longer native; object FileReadStream(fileName: String, under: JavaBufferedReader) extends { ReadStream, FileStream }, its methods in Fortress over under, uncheckedReadChar answering -1 at the end by under.eof (fork R1), asString as today's text (fork R5); its factory FileReadStream(filename: String) flattens the name and calls makeJavaBufferedReader, as Writer(fileName) does (Library/Writer.fss:21-24); object FileWriteStream(fileName: String, under: JavaBufferedWriter) extends { FileStream, WriteStream }, its writes, flush and close over under (fork R2), with its factory.",
"- Library/Reader.fss and .fsi: component Reader, no longer native; stdIn is Reader(\"<stdin>\", makeJavaBufferedStdIn()); object Reader(fileName: String, under: JavaBufferedReader), its methods over under; its one-argument factory.",
"- Not yours: the writer side's text; the prelude; FortressBufferedReader and the other run-time classes; the glue classes, which stay unused (fork R3); N5's run-time class and raise strings.",
"",
"**Tests, first.**",
"- ProjectFortress/tests/NativeHelperReaderWalk.fss: a file that the test writes through FileWriteStream (a flat string, two characters, a rope past 32 characters, flush), read back through FileReadStream: readLine, readChar, read(k), eof and ready, uncheckedReadChar -1 at the end, lines() and characters() counted, a read after consume caught as IOFailure, a missing file caught as FileNotFoundException; the same through a Reader on the file, isReady among them; stdIn.fileName and its asString; each object's asString. Seen failing on the base through the harness: the rope stops (row 900), flush is missing (row 901), and no catch sees the missing file (row 902).",
"- ProjectFortress/compiler_tests/NativeHelperFamilyReaderCompiled.fss and its .test: jbrStdIn and the reader helpers bound in its own declarations over the prelude's JavaBufferedReader, on a file it writes: the 0 at the end with eof set, readk, the refusal after consume. Seen failing on the base through junit.sh: fileOps has no jbrStdIn.",
"- Keep their verdicts: FileReadWrite, WordCountSmall, FileConversion, LongStringTests, NativeHelperWriterWalk, NativeHelperFamilyWriterCompiled; tests/printing/ConcurrentPrinting.fss at four threads, on the old code and the new.",
"- After the change: ant testSystem and ant testQuick once each; your compiled guard through junit.sh (fork 2).",
"",
"**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3). They read FortressLibrary's trait and FortressBuiltin's native object; neither reads File or Reader.",
"",
"**Rows.** Rows 926, 900, 901 and 902 close with your commit, each with your walk test. Row 841, walk's want of an export check, stays as it is. Row 928 holds the writer trait's limit, and the reader trait has the same; its notes have 23 characters left of 700, so your record.md gives its whole new line, its claim naming both traits, after you read it with ledger.py show 928.",
"",
"**Specification.** None: the specification names none of the I/O objects (rung W's report, \"What the specification settles\"). List every sentence made false: F-330's and F-32's counts, P-164's \"The writer side ... moves before the reader side\" as a statement of what is to come, PLAN's N4 reader line, the fortress-repo skill's part on the interpreter, its list of carriers.",
"",
"**Files.**",
"- Library/FortressLibrary.fss and .fsi: JavaBufferedReader and the two factories, only.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: the native object after JavaBufferedWriterObject, only.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java: the four methods, only; interpreter/glue/prim/JavaBufferedReaderObject.java, new.",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java: jbrStdIn, only.",
"- Library/File.fss, File.fsi, Reader.fss, Reader.fsi.",
"- Your tests.",
"- Not: Library/Writer.fss, the prelude, compiler/runtimeValues/, NamingCzar.java, the glue classes of the three objects, the checker.",
"",
"**Reserved points.** A printed line of microGPT's quick check that changes. An edit of a run-time class.",
"",
"**Overlaps by file.** FortressLibrary.fss and .fsi with V (the integer traits), A (its store trait, near the arrays' factories) and H (printTaskTrace): other declarations. FortressBuiltin.fss with A, whose native objects go right after trait Object's end (fork A5), and with V and H: other declarations. No other rung edits StaticNativeApp.java, fileOps.java, File or Reader.",
].join('\n')

const A_SECTION = [
"**This rung runs only with his answer to Q2, or its default under the go rule** (section 2). Its default shape is (i), a cell per element; the shape (ii) line of \"What you build\" applies if he takes the slot API.",
"",
"**The mission.** Every array, vector, matrix, varargs list and args of the one library is built on PrimitiveArray or PrimImmutableArray (Library/FortressLibrary.fss:2392-2398, :2655, :2702, :2708, :2879, :3051, :3281; Library/List.fss:488; Library/System.fss:34; compiler/WellKnownNames.java:53-56), objects of the native component NativeArray whose 7 methods name glue classes. A body left on glue compiles to the one library's own builtinPrimitive, which fails, so by reading a compiled program would raise at its first array (reviews/natives-remainder-2026-11-07.md, section 1, finding 1). This rung puts the elements in a compiled store behind a Java-backed trait, and keeps walk's store as it is.",
"",
"**The decisions this rung builds.** P-169, its arrays: a store trait in FortressLibrary whose bindings name helpers of a new nativeHelpers/arrayOps over a compiled class that holds the elements; PrimitiveArray and PrimImmutableArray leave the native component and hold the store in a field; walk's native object below the trait holds an AtomicArray, and walk answers the arrayOps names with its glue, re-targeted, P-167's device; PrimImmutableRR64Array's two move onto a compiled double[] class that no factory chooses until decision A (P-84, P-85). Q2's answer gives the compiled store's shape. P-164 gives the pattern of a Java-backed trait, its native object and its table entry. This record's section 3, forks 1 to 5 and A1 to A7 (20 to 26), give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- Library/FortressLibrary.fss and .fsi, right before __parr (:2392) and in the api beside the array factories (.fsi:1594-1604): trait JavaArrayStore excludes { String, Number, Boolean, Char, JavaBufferedReader, JavaBufferedWriter } with get(i: ZZ32): Any, put(i: ZZ32, v: Any): () and init(i: ZZ32, v: Any): Boolean, each a binding on arrayOps, and makeJavaArrayStore(n: ZZ32): JavaArrayStore; trait JavaRR64ArrayStore with get(i: ZZ32): RR64, init(i: ZZ32, v: RR64): Boolean and makeJavaRR64ArrayStore(n: ZZ32) (fork A2).",
"- ProjectFortress/LibraryBuiltin/NativeArray.fss and .fsi: component NativeArray, no longer native (fork A5); PrimitiveArray[\\T, nat s0\\]() with the field mem: JavaArrayStore = makeJavaArrayStore(s0), get(i) = cast[\\T\\](mem.get(i)) (fork A3), put and init00 over mem; PrimImmutableArray likewise without put; PrimImmutableRR64Array over a JavaRR64ArrayStore. Their opr [ ], init0 and the comment on a failed transaction stay.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, right after trait Object's end (:52): private object JavaArrayStoreObject extends JavaArrayStore end and private object JavaRR64ArrayStoreObject extends JavaRR64ArrayStore end, each with a native constructor under interpreter/glue/prim/ whose value holds walk's store: an AtomicArray for the first, as PrimitiveArray.java:26-36 makes one, and walk's double[] for the second, as PrimImmutableRR64Array.java:39-46 does.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java, where the loader reads the string (:209): every name of com.sun.fortress.nativeHelpers.arrayOps answered by walk's store glue by one rule, the method's name to the glue class's operation; a name that the rule does not hold is refused at load, as today (fork A4). The glue operations are today's get, put and init0 of PrimitiveArray.java, PrimImmutableArray.java and PrimImmutableRR64Array.java, re-targeted to the new native objects' values.",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/arrayOps.java, new: make(int), get(store, int), put(store, int, Any), init(store, int, Any), and the RR64 store's three over double. Every method's types map to the one library (compiler.md, \"Natives\"), since the checker reads the class whole (F-321).",
"- ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/, new: the store class and the RR64 store class over a double[]. **Shape (i):** the store holds a MutableFValue[], its cells made with it; get and put test BaseTask.inATransaction() and call TXRead and TXWrite on the element's cell, else getValue and setValue, as compiler/codegen/VarCodeGen.java:310-371 emits for a variable. **Shape (ii):** the store holds an Object[]; runtimeSystem/Transaction.java gains a location key, TXReadSlot(Object[], int) and TXWriteSlot(Object[], int, Any), and slot cases in TXValidateHelperTopLevelTransaction, TXValidateHelperNestedTransaction and both branches of TXCommit, its element accesses by a volatile VarHandle (the planner's model, section 5, probe 1); BaseTask unchanged.",
"- ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java, the walk-world table, after :491: the two store classes to JavaArrayStore and JavaRR64ArrayStore.",
"- Not yours: decision A (no factory chooses the RR64 store); the code generator and the class loader; the prelude; Thread and H's table entries.",
"",
"**Tests, first.**",
"- ProjectFortress/tests/ArrayStoreWalk.fss: arrays of each rank, vectors and an immutable array made, written, read, filled twice (row 466's answer, unchanged), subscripted out of bounds; writes to distinct elements from a parallel for, and atomic read-modify-writes of one element from a parallel for, whose sum is exact; PrimImmutableRR64Array made through its own constructor and read. A guard on the base, and passing after; run it at four threads too.",
"- ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java (fork A6): arrayOps over the store class outside a transaction, inside one, and from four tasks on the compiled task pool each adding into one element inside atomic, whose total is exact; the RR64 store. Seen failing on the base: the classes do not exist. Run it with ant testOnly -DtestPattern=ArrayStoreJUTest.",
"- Keep their verdicts: the walk suite's array, vector, matrix and atomic tests; the demos at the gather.",
"- After the change: ant testSystem and ant testQuick once each (fork 2).",
"",
"**The measure.** P-30's: the quick pair once on your tree, explorations/coordinator/tools/mg-run.sh tmp/rung-array-store/mg rung-array-store from your tree's root, in the background with its log, after your last change of code is built; report both VERDICT lines and both secs= lines (climb batch 27's landing: ALL PASS, 42 s and 35 s, compile-ladder/climb-batch-27/gate/summary.txt). Walk is not timed old against new (fork A3), so do not run the pair on the old code.",
"",
"**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3). They read NativeArray, FortressLibrary, FortressBuiltin and arrayOps whole.",
"",
"**Rows.** Row 466's claim stays; its notes cite the glue's init0, which your change moves, and have 31 characters left of 700, so your record.md gives its whole new line, its notes citing the store's init, after you read it with ledger.py show 466.",
"",
"**Specification.** None. List every sentence made false: F-32 and F-299's counts, F-11 and F-18 where they say what holds an array's elements, PLAN's D2 line, the fortress-repo skill's parts on the compiled path and on the library, where they name the arrays' store.",
"",
"**Files.**",
"- Library/FortressLibrary.fss and .fsi: the two traits and their factories, only.",
"- ProjectFortress/LibraryBuiltin/NativeArray.fss and .fsi.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: the two native objects after trait Object, only.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java: the rule, only; new classes under interpreter/glue/prim/; the three store glue classes, re-targeted.",
"- nativeHelpers/arrayOps.java and the two store classes, new; NamingCzar.java's two entries; runtimeSystem/Transaction.java with shape (ii) only.",
"- Your tests.",
"- Not: the code generator, the class loader, the prelude, StaticNativeApp.java, NativeApp.java's table.",
"",
"**Reserved points.** A change of the compiled transaction beyond shape (ii)'s; a model line; the quick pair past P-30's minute on your tree, or a check of it that fails.",
"",
"**Overlaps by file.** NativeApp.java with H, whose six names go into the table (:47-53): your rule is at :209. FortressLibrary.fss and .fsi with V, R and H: other declarations. FortressBuiltin.fss with V, R and H: your objects after trait Object, R's at the component's end. NamingCzar.java: yours alone.",
].join('\n')

const K_SECTION = [
"**The mission.** The compiled checker sorts with Scala's sortWith by an order that is partial: a call's candidates by moreSpecific, the coercions' candidates by moreSpecificCandidate, and a trait's ancestors by subtyping. sortWith reads two elements that neither precedes as equal, which is not transitive, and Java's TimSort, which checks the order's contract when it merges 32 elements or more, raises 'Comparison method violates its general contract!'. Since climb batch 27 the distance stage stops so inside value object Char, at x = -1 in digit, which meets 33 candidates of =, and does not check the rest of Char's body, its 41 helper bindings among it (row 929; F-54). This rung makes the four sorts correct on a partial order, and by P-148 as fast as today.",
"",
"**The answers this rung follows.** Row 929: the four sites, Functionals.scala:761 (the call's sort) and :728 (callType), CoercionOracle.scala:255, Formula.scala:609. P-148: the rung times the checker before and after, makes the change correct first, then fast, in the same rung, without changing which programs the checker accepts or refuses. The brief records a rank sort that fixed the crash at 299 s of the distance stage against 137 s. The planner's prototype (section 5, probe 2) removed both crash rows, kept every other result of both stages, and took 145 s against 140 s for the distance and 88.9 s against 88.9 s for the count. This record's section 3, forks 1 to 3, 6 and K1 to K5 (27 to 31), give the defaults you build.",
"",
"**What you build.**",
"- The test first (below).",
"- ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala, new (fork K1): class PartialOrder[T](xs: List[T], lt: (T, T) => Boolean) that reads lt at most once a pair through a memo, with minimal, the elements that no other element is lt, in xs's order, and linear, a linear extension, each element after every element lt it and otherwise in xs's order; on a cycle, the rest in xs's order. An element is compared with each other element, not with itself; where xs holds one object twice, the two are not each other's predecessors, as the old minimal's !(d eq c) reads them.",
"- scala_src/typechecker/impls/Functionals.scala: minimal (:717) over the class; callType (:727-728) the head of minimal, or cs.head where it is empty (fork K3); the call's sort (:761) and top (:776) from one PartialOrder over the candidates, so they share its memo; the tie at :824-833 keeps sorted.headOption, now the first minimal candidate (fork K2).",
"- scala_src/typechecker/CoercionOracle.scala:255 and Formula.scala:609: the class's linear extension with each site's own predicate.",
"- The second pass: a profile of the count stage's checker with JFR (compiler.md, \"The checker's time\"); take any gain that it shows, and audit the memo on one full run in an instrumented copy (fork K5).",
"- Not yours: which candidate the rules make most specific; moreSpecificCandidate itself; item 403.",
"",
"**Test, first.** ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled.fss and its .test (compile, link, run, run_out_contains=PASS): two chains of traits T0 to T7 and U0 to U7, each extending the one before, object A extends T7, object B extends U7, and the 64 declarations f(x: Ti, y: Uj): ZZ32 = 100 i + j in an order that stops the base's checker, with run asserting f(A, B) is 707 and printing PASS (fork K4). The order follows the overloadings' names, so find it at the test's own name and path: generate shuffles with the planner's generator below, each written to compiler_tests/PartialOrderCandidatesCompiled.fss, and compile each on the base through old-fortress.sh until one stops with 'Comparison method violates its general contract!' at Functionals.scala:761; in probe 2, one of twelve did. Seen failing on the base through junit.sh; passing after.",
"",
"    import random, sys      # gen.py SEED: the 64 declarations in a shuffled order, blank lines between",
"    seed, n, name = int(sys.argv[1]), 8, \"PartialOrderCandidatesCompiled\"",
"    rnd = random.Random(seed)",
"    out = [\"component \" + name, \"export Executable\", \"\"]",
"    for c in \"TU\":",
"        out += [\"trait %s%d%s end\" % (c, i, \"\" if i == 0 else \" extends %s%d\" % (c, i - 1)) for i in range(n)]",
"    out += [\"object A extends T%d end\" % (n - 1), \"object B extends U%d end\" % (n - 1), \"\"]",
"    decls = [\"f(x: T%d, y: U%d): ZZ32 = %d\" % (i, j, 100 * i + j) for i in range(n) for j in range(n)]",
"    rnd.shuffle(decls)",
"    for d in decls: out += [d] + [\"\"] * rnd.randint(0, 2)",
"    out += [\"run():() = do\", \"  assert(f(A, B), 707, \\\"the most specific of 64\\\")\", \"  println(\\\"PASS\\\")\", \"end\", \"\", \"end\"]",
"    open(name + \".fss\", \"w\").write(\"\\n\".join(out) + \"\\n\")",
"",
"Keep their verdicts: the compiler track and the library track, ant testQuick once after the second pass (compiler.md, \"The checker's time\", step 4).",
"",
"**The measure.** P-148's, as compiler.md, \"The checker's time\", gives it: the count stage on the base build and on your change, base and change, then pass after the second pass; each run's seconds, the diff of the base and change tables, the comparison of their run.txt files with each tree's path replaced, and that pass has change's results. Then the distance stage once on your final tree, as rung V's section gives the command with your slug: #crash none, and @@TC DECL-OK on FortressBuiltin.fss:661:1-773:2 in its run.txt; compare with climb batch 27's gate table by compare.sh, which prints the two crash rows as gone.",
"",
"**Rows.** Row 929 closes with your commit, its test PartialOrderCandidatesCompiled.",
"",
"**Specification.** None. List every sentence made false: F-54's two crash rows; F-53's \"its check of value object Char did not finish, so the 0 holds no completed check of that declaration's body\"; PLAN's line on row 929 and its \"Where we stand\".",
"",
"**Files.**",
"- scala_src/useful/PartialOrder.scala, new; scala_src/typechecker/impls/Functionals.scala, CoercionOracle.scala, Formula.scala: the four sites, only.",
"- ProjectFortress/compiler_tests/: your test.",
"- Not: the rest of the checker, the code generator, walk, the library, the tools.",
"",
"**Reserved points.** A change of any error, its text or its place, on the one library, or of a compiled test's verdict: the change is then not only a sort.",
"",
"**Overlaps by file.** None: no other rung edits the checker.",
].join('\n')

const H_SECTION = [
"**The mission.** Thread's val, wait, ready and stop and the top-level abort (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-786), and printTaskTrace (Library/FortressLibrary.fss:4625), name glue classes. After the names batch a compiled body left on glue falls through to the library's builtinPrimitive, which fails. Walk desugars every spawn into Thread (interpreter/rewrite/DesugarerVisitor.java:1004-1030), and abort reruns the innermost atomic (Specification/advanced/parallelism-locality/transactions.tex, \"Abortable Atomicity\"). This rung names compiled helpers for all six and keeps walk's answers.",
"",
"**The decisions this rung builds.** P-169, its threads: helpers in a nativeHelpers class over the compiled run time, as the team's nativeHelpers/runtime.java is; Thread's four raise until the code generator compiles spawn (row 82); walk's loader answers the names with today's glue, P-167's device. P-58: the binding's form. F-298: the compiled rewrite checks a binding against the helper's Java signature, so val(): T cannot name a helper that answers Object: a pair (P-162). This record's section 3, forks 1 to 5 and H1 to H4 (32 to 35), give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java (fork H1): abort(), which throws runtimeSystem.TransactionAbortException when BaseTask.inATransaction() and else returns; printTaskTrace(), the compiled task chain from BaseTask.getCurrentTask() through its parent (runtimeSystem/BaseTask.java:46), one line a task, as walk's BaseTask.printTaskTrace prints (interpreter/evaluator/tasks/BaseTask.java:171-177); threadVal, threadWait, threadReady and threadStop, each over fortress.AnyType.Any and raising FailCalled \"spawn is not compiled yet\" by Utility.makeFortressException(\"fortress.CompilerLibrary$FailCalled\", ...) (fork H2).",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-786: Thread's val(): T = cast[\\T\\](valAny()) over a bare binding valAny(): Any on runtime.threadVal; wait, ready and stop bare on theirs; abort on runtime.abort. Library/FortressLibrary.fss:4625: printTaskTrace on runtime.printTaskTrace. The apis do not change, but for valAny if the api must declare it.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-53: six entries in OWN_OPERATIONS, each helper's name to today's glue: Thread$val, Thread$wait, Thread$ready, Thread$stop, Thread$abort, StringPrim$PrintTaskTrace (fork H4). Walk's Thread constructor stays glue.",
"- Not yours: compiled spawn (row 82); walk's tasks and transactions; the compiled transaction; A's rule at NativeApp.java:209.",
"",
"**Tests, first.**",
"- ProjectFortress/tests/RuntimeOwnOperationsWalk.fss: spawn with val, wait, ready and stop; abort() outside atomic, which does nothing; abort() inside atomic on the first try of a block that counts its tries in a variable outside it, whose second try commits; printTaskTrace() from a spawned task. A guard on the base and after: walk answers each as today.",
"- ProjectFortress/compiler_tests/RuntimeOwnOperationsCompiled.fss and its .test: runtime.abort bound in its own declarations, called outside atomic and inside one on its first try; runtime.printTaskTrace from a compiled for's task, run_out_contains its first line; runtime.threadVal caught as FailCalled. Seen failing on the base through junit.sh: runtime has no such helper.",
"- Keep their verdicts: tests/taskTrace2.fss, taskTrace3.fss; the walk suite's spawn and atomic tests; Library/Lazy.fss's abort by any test that reaches it.",
"- After the change: ant testSystem and ant testQuick once each; your compiled test through junit.sh (fork 2).",
"",
"**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3): runtime.java is read whole for the first time.",
"",
"**Rows.** Row 82 stays; your record.md gives a note that Thread's helpers raise until spawn compiles, after ledger.py note 82 TEXT --check.",
"",
"**Specification.** None. List every sentence made false: F-32 and F-299's counts, F-328's table of two names, PLAN's D2 line.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java.",
"- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (and .fsi for valAny only if needed): Thread and abort, only.",
"- Library/FortressLibrary.fss: printTaskTrace, only.",
"- ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java: OWN_OPERATIONS' static block, only.",
"- Your tests.",
"- Not: the code generator, walk's tasks, runtimeSystem/, NativeApp.java beyond the table.",
"",
"**Reserved points.** A change of walk's spawn or atomic; a compiled run that the helpers change beyond the six names.",
"",
"**Overlaps by file.** NativeApp.java with A, whose rule is at :209. FortressBuiltin.fss with V (NN32, IntLiteral), R (its object at the end) and A (its objects after trait Object). FortressLibrary.fss with V, R and A: other declarations.",
].join('\n')

const S_SECTION = [
"**Its second half runs only with his answer to Q3, or its default under the go rule** (section 2). Without it, build the first half and stop there.",
"",
"**The mission.** The territory map's table of what moves with what gives the rule behind this rung: the compiled path's wrapper generator wraps every method of a helper class that it is given, and fails the import on a type that it cannot map (map/README.md, section 7, its row on nativeHelpers/). Against the one library, the checker reads a helper class in the same way (F-321). System's two bindings name systemOps, whose getArgs answers a type that the one library does not declare, so the checker cannot read System, which both microGPT programs import. With the first half the checker reaches System's component and finds two errors, at args and getProgramArgs; with the second half it reads System whole with no error (section 5, probe 3).",
"",
"**The decisions this rung builds.** Review-queue item 355, answered with option 1: the two helpers moved from systemOps into stringOps, the class of the other string helpers, with the two binding strings and a compiled guard; row 895 closes when this lands. F-321: a binding passes the checker only where every method of its helper class maps to the one library's types. P-37: the compiler's prelude is not changed before it is deleted. Row 896 stays. With Q3's answer: its option 1, two scalar helpers outside systemOps, a count and the i-th argument, and args built in Fortress by the library's immutable-array factory (reviews/natives-remainder-2026-11-07.md, section 2.5 (a)). This record's section 3, forks 1 to 5 and S1 to S4 (36 to 39), give the defaults you build.",
"",
"**What you build, the first half.**",
"- The tests first (below).",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java: getProperty(String, String) and getEnvironment(String, String), each computing as systemOps' does (nativeHelpers/systemOps.java:20-27), right after lineSeparator (stringOps.java:76-78).",
"- Library/System.fss:41 and :51: their strings name stringOps.",
"- nativeHelpers/systemOps.java: getEnvironment removed; getProperty and getArgs stay (fork S1).",
"- ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss:16-17: the two bindings name stringOps.",
"",
"**What you build, the second half (Q3).**",
"- ProjectFortress/src/com/sun/fortress/nativeHelpers/programArgs.java, new (fork S3): a static String[], count() and at(int). interpreter/glue/prim/StringPrim.java's GetProgramArgs.registerProgramArgs (:121-123) and runtimeSystem/MainWrapper.java (cachedArgs, :21, :67) each set it from the arguments that they already hold.",
"- Library/System.fss:29-35 (fork S4): args : ImmutableArray[\\String,ZZ32\\] = immutableArray[\\String\\](programArgCount()).tabulate(fn (i:ZZ32): String => programArg(i)), over two private bindings programArgCount(): ZZ32 and programArg(i: ZZ32): String on the two helpers; getProgramArgsPrim and getProgramArgs deleted. System.fsi declares only args (:28), and does not change.",
"- Not yours: Library/CompilerSystem.fss and its deletion (item 319); systemOps.getArgs; row 896; the arrays' store, which a compiled args needs (rung A).",
"",
"**Tests, first.**",
"- The compiled guard, NativeHelperFamilyStringCompiled, retargeted: seen failing on the base through junit.sh, where stringOps has no getProperty, and passing after.",
"- With Q3: ProjectFortress/tests/SystemArgsWalk.fss, which asserts |args| is 0, as the harness passes no argument, and prints each element; a guard on the base and after. Run it once by hand with two arguments on the old code and the new (bin/fortress ProjectFortress/tests/SystemArgsWalk.fss a b), and report both outputs: no harness key passes arguments (grep of the .test files finds none). A compiled test binding programArgs.count and at in its own declarations, asserting the count 0; seen failing on the base through junit.sh.",
"- Keep their verdicts: walk's NativeHelperStringRopeWalk, which calls getEnvironment and getProperty at ropes and flat strings; every test that reads args; the compiler track's tests that import CompilerSystem.",
"- After the change: ant testSystem and ant testQuick once each; your compiled tests through junit.sh (fork 2).",
"",
"**The measure.** The checker over System against the one library, once on your final tree, by the planner's command (section 5, probe 3, and CLIMB-BATCH-27.md, section 5, probe 3):",
"",
"    SCR=$PWD/tmp/sys-check; mkdir -p $SCR/classes $SCR/caches",
"    CP=$(bin/fortress_classpath | tail -1)",
"    javac -nowarn -cp \"$CP\" -d $SCR/classes explorations/coordinator/tools/checker-count/WorldFlip.java \\",
"        explorations/coordinator/tools/checker-count/shadow-src/com/sun/fortress/compiler/StaticChecker.java",
"    java -Xmx4g -Xss64m -Dfortress.caches=$SCR/caches -Dfortress.analyzer.overload.cache=false \\",
"        -cp $SCR/classes:$CP WorldFlip -stop check Library/System.fss",
"",
"Its before: 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.'. After the first half: the two errors at System.fss:29 and :35, as probe 3's control A. After the second half: ### rc=0, as control B. Report the run's error lines.",
"",
"**The stages.** Both, once each on your final tree, as rung V's section gives the commands with your slug (fork 3): both read stringOps whole. Neither reads System or programArgs.",
"",
"**Rows.** Row 895: the gather closes it with your commit, --test none with a note that names your runs of the checker over System (fork S2). Row 896: your record.md gives its whole new line, its notes' helper path stringOps, after you read it with ledger.py show 896; its claim stays.",
"",
"**Specification.** None. List every sentence made false: F-321's \"System's getEnvironment and getProperty name systemOps, and neither stage reads System\"; row 895's claim; PLAN's lines on System's rung and on getProgramArgsPrim.",
"",
"**Files.**",
"- nativeHelpers/stringOps.java: the two helpers after lineSeparator, only; nativeHelpers/systemOps.java: getEnvironment removed, only.",
"- Library/System.fss: the two strings, and with Q3 args and its two bindings.",
"- With Q3: nativeHelpers/programArgs.java, new; interpreter/glue/prim/StringPrim.java's registerProgramArgs and runtimeSystem/MainWrapper.java, each one line that sets the static.",
"- compiler_tests/NativeHelperFamilyStringCompiled.fss: its two bindings; your tests.",
"- Not: Library/CompilerSystem.fss, System.fsi, the checker, the tools.",
"",
"**Reserved points.** A step that would edit the prelude.",
"",
"**Overlaps by file.** None: no other rung edits stringOps, systemOps, System, StringPrim.java or MainWrapper.java.",
].join('\n')

const T_SECTION = [
"**The mission.** Another of F-34's kinds, and the wall of the library's 2-D and 3-D ranges: OpenRange2D (Library/RangeInternals.fss:380) extends { OpenRange[\\(ZZ32,ZZ32)\\], ActualRange2D[...] }, and the code generator stops, 'Not in the trait table: OpenRange', at 8 declarations of RangeInternals (perf-probes/codegen-distance/REPORT.md, section 3). This rung lets such an object compile.",
"",
"**The answers this rung follows.** Row 733: the code generator crashes on an object whose first supertrait is an imported api's trait and whose later supertrait defines a method of a name that the api's trait declares, also where the two overload validly; dumpMethodChaining compares the trait of each same-named method of the first supertrait with the body's trait (typeAnalyzer.equiv, compiler/codegen/CodeGen.java:1010), and the table does not find the api's trait. On this base the stack runs TypeAnalyzer.typeCons (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:884) \u2190 ... \u2190 dumpMethodChaining (CodeGen.java:1010) \u2190 forObjectDeclPrePass (:4691) (section 5, probe 4). The code generator's table is made over the component and the api environment (compiler/phases/CodeGenerationPhase.java:179, :206-210), so the trait is in the environment and the type that the comparison reads names it in a way that the table does not find. Walk runs row 733's form and prints cd. The two tag methods overload validly: their parameter types exclude each other. Row 732, the sibling in the same method, is not yours (fork T2). This record's section 3, forks 1, 2, T1 and T2 (40, 41), give the defaults you build.",
"",
"**What you build.**",
"- The tests first (below).",
"- The comparison in dumpMethodChaining (CodeGen.java:916-1022) reads an imported api's trait (fork T1): the fix where the compared type is made or read, with the reason, in your report. If the fix must change the checker's trait table, it is a change of checking code: take P-148's measure as compiler.md, \"The checker's time\", gives it, run the count stage and the distance stage, and list it as a point to report.",
"- Not yours: row 732 (fork T2); RangeInternals itself; the checker unless fork T1 sends you there.",
"",
"**Tests, first.**",
"- ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.fss with an api ProjectFortress/compiler_tests/TraitTableApiTraitApi.fsi and its component, and its .test (tests=, compile, link, run, run_out_contains=PASS), as compiler_tests/RecursiveApiTest3.test drives a program with its own apis: row 733's form, the api's trait C abstract tag(self, n: ZZ32): String end, the program's trait D tag(self, s: String): String = s end and object O extends { C, D } tag(self, n: ZZ32): String = \"c\" end, with tag(O, 1) asserted \"c\" and tag(O, \"d\") asserted \"d\"; and a second object whose first supertrait is a generic api trait at a tuple static argument, as OpenRange2D's is. Seen failing on the base through junit.sh: 'Not in the trait table: C' (probe 4). Passing after.",
"- ProjectFortress/tests/TraitTableApiTraitWalk.fss, with its api in ProjectFortress/test_library/: the same program under walk, a guard passing on the base and after.",
"- Keep their verdicts: the compiler track.",
"- After the change: your tests through junit.sh, in one JVM, and the walk guard through the harness; the tracks to the gate (fork 2).",
"",
"**Rows.** Row 733: the gather closes it with your commit, its test TraitTableApiTraitCompiled. Row 732: no change, unless your fix reaches it; then your record.md gives its whole new line.",
"",
"**The stages.** Neither, unless your fix changes the checker (fork T1): list your files (STAGE_BLIND; fork 3).",
"",
"**Specification.** None. List every sentence made false: F-34's kinds, row 733's claim, and any sentence of the fortress-repo skill's compiler.md that lists what the code generator refuses.",
"",
"**Files.**",
"- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java: dumpMethodChaining, only, and anything the comparison needs, named in your report; the checker's trait table only by fork T1.",
"- ProjectFortress/compiler_tests/, ProjectFortress/tests/ and ProjectFortress/test_library/: your tests and their apis.",
"- Not: forObjectDeclPrePass and the call visitors; interpreter/; Library/; ProjectFortress/LibraryBuiltin/; nativeHelpers/; Specification/; the tools.",
"",
"**Reserved points.** A change of the checker's code (fork T1). Report it, with its evidence and the count stage's times.",
"",
"**Overlaps by file.** None: no other rung edits the code generator. K edits the checker's Scala, which a T fix by fork T1 would also reach: other files, TypeAnalyzer.scala against K's four.",
].join('\n')

const V_ENTRY = { id: 'V', slug: 'rung-integer-conversions', path: '/home/user/fortress-integer-conversions', branch: 'wip/rung-integer-conversions', expectedMinutes: 60,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The integer conversions: the checked getters, bitsAs..., the low-bits names on every type, ZZ's narrow and widen deleted, big on its helper, and IntLiteral's 8 over asZZ (P-161, P-169)",
    blurb: "P-161, his option 6: on each of ZZ32, ZZ64, NN32, NN64 and ZZ the getters asZZ32, asZZ64, asNN32, asNN64 and asZZ, raising IntegerOverflow where the value does not fit; the four fixed widths' bitsAs... getters; narrow, widen, unsigned, signed and big kept as the low-bits forms and declared on every type where they apply (rows 858, 859); ZZ's narrow and widen deleted, their callers in Format, QuickCheck, the demo sudoku, XXXZZNarrowRungP and rung I's private count functions moved onto .asZZ32 or .asZZ64 with their values unchanged (rows 502, 349); ZZ32's big onto makeZZfromZZ32; with P-169, IntLiteral's 8 conversions and comparisons as Fortress text over its asZZ; basic-integers.tex's sentences with an Appendix I entry.",
    section: V_SECTION,
    pointsToReport: [
      "Each getter as declared, in the component and the api, and whether it is a Java helper or a Fortress body, with each new helper's Java signature.",
      "The 25 getters' answers at their edges under walk, the 13 that can raise among them, and each compiled guard's answers.",
      "Each low-bits name newly declared, by type, and each call that reached one through a coercion before.",
      "Each caller of ZZ's narrow or widen, with its before and after, the team's lines of Format.fss, QuickCheck.fss and sudoku.fss among them, and rung I's private count functions.",
      "IntLiteral's 8 as written, and their answers at the object IntLiteral before and after.",
      "The revised sentences, their callouts and the Appendix I entry's Effect; the specification's build: both BUILD SUCCESSFUL lines and the warnings count.",
      "The count table and the distance table on your final tree, and any site that comes; the crash rows you see.",
      "Each test whose verdict changes in ant testSystem or ant testQuick.",
      "Every sentence made false.",
      "A file edited beyond those named, any edit of the prelude, of walk or of the checker, and any other line of a team test or demo changed.",
    ],
    briefing: [
      "P-161", "P-169", "P-162", "P-73", "P-72", "P-37", "F-299", "ledger:858", "ledger:859", "ledger:502", "ledger:349", "ledger:578",
      "doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 6. Option 3, with option 5's deletion folded in",
      "doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 3. Steele's pattern, made total",
      "doc:explorations/reviews/integer-conversions-2026-11-06.md#6.0 What every option shares",
      "doc:explorations/reviews/integer-conversions-2026-11-06.md#2.2 The one library, member by member",
      "doc:explorations/reviews/natives-device-2026-11-07.md#3.3 The numerals, 32 (Q1: yes, with a reading)",
      "code:Library/FortressLibrary.fss#private shiftCount32(b:AnyIntegral):ZZ32 =",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait IntLiteral",
      "doc:Specification/appendices/changes.tex#Shifts and narrowing on the integer types",
      "code:Specification/basic-lib/basic-integers.tex#Like every number type, each of them is a subtype..TYP{IntegerOverflow} is thrown.",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung V",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung R",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung A",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung H"],
    reasons: [
      "The decision you build, option 6 of the review.",
      "IntLiteral's 8 as Fortress text over asZZ, before the names batch.",
      "The pair pattern and ZZ32's big onto makeZZfromZZ32.",
      "Fixed-width arithmetic raises, which the getters follow.",
      "narrow keeps the low 32 bits on the fixed widths, which stands.",
      "No declaration is added to the prelude.",
      "Walk's loader of helpers, and the carriers your bindings over NN32 and NN64 meet.",
      "A low-bits name missing on a type, which closes.",
      "A call that reached a low-bits name through a coercion, which closes.",
      "ZZ's widen, which closes by the deletion.",
      "ZZ's narrow half, which closes.",
      "IntLiteral's own arithmetic answers a ZZ32 under walk, which stays.",
      "The option, its callers and their new forms.",
      "The getters, their owners and the helpers' two ways.",
      "The transfer helpers and the tests over NN32 and NN64.",
      "Today's members, type by type.",
      "IntLiteral's 8 over asZZ, not ZZ64 (row 328).",
      "Rung I's private count functions, whose calls of ZZ's narrow you move.",
      "The object whose 8 you write in Fortress.",
      "The prelude's IntLiteral, whose conversions and comparisons are Fortress over its getters, the form of yours.",
      "The Appendix I entry whose sentences on narrow of a ZZ your deletion makes false, with its callout revival-shifts.",
      "The sentences you revise, narrow's among them.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
      "Rung R's defaults: it also edits FortressLibrary.fss, FortressLibrary.fsi and FortressBuiltin.fss, at other declarations.",
      "Rung A's defaults: it also edits FortressLibrary.fss, FortressLibrary.fsi and FortressBuiltin.fss, at other declarations.",
      "Rung H's defaults: it also edits FortressLibrary.fss, FortressBuiltin.fss and FortressBuiltin.fsi, at other declarations.",
    ],
    checks: [
      "P-161", "P-169", "ledger:858", "ledger:859", "ledger:502", "ledger:349",
      "doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 6. Option 3, with option 5's deletion folded in",
      "doc:explorations/reviews/integer-conversions-2026-11-06.md#Option 3. Steele's pattern, made total",
      "doc:explorations/reviews/natives-device-2026-11-07.md#3.3 The numerals, 32 (Q1: yes, with a reading)",
      "code:Library/FortressLibrary.fss#private shiftCount32(b:AnyIntegral):ZZ32 =",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number",
      "doc:Specification/appendices/changes.tex#Shifts and narrowing on the integer types"] }

const R_ENTRY = { id: 'R', slug: 'rung-io-reader', path: '/home/user/fortress-io-reader', branch: 'wip/rung-io-reader', expectedMinutes: 50,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "N4's reader rung: FileReadStream, Reader and FileWriteStream over the Java-backed traits, and File and Reader plain components (P-164)",
    blurb: "P-164's reader rung, with FileWriteStream (item 373): FortressLibrary's JavaBufferedReader gains the prelude's eight methods on existing fileOps helpers, its factory over a file name on jbrOpen and one for standard input on a new jbrStdIn; walk carries the trait by name as FortressBufferedReader through a private native object in FortressBuiltin; FileReadStream, Reader and FileWriteStream become plain Fortress objects over a field, and File and Reader plain components, so their 25 glue bindings go; FileWriteStream becomes a WriteStream with its flush (rows 900, 901); a missing file and a read after consume raise the library's exceptions, which a catch sees (row 902); the -1 at the end of a file kept.",
    section: R_SECTION,
    pointsToReport: [
      "Each method changed in StaticNativeApp and each class added under interpreter/; the new helper and its Java signature.",
      "Each binding moved with the helper it names; each method that became Fortress text.",
      "File.fsi and Reader.fsi as changed, with each header before and after.",
      "The answers at the end of a file, after consume, after close and at a missing file, under walk before and after; each printed text that changes.",
      "Your tests before and after through the harness and junit.sh; FileReadWrite, WordCountSmall, FileConversion and LongStringTests; ConcurrentPrinting at four threads.",
      "The count table and the distance table on your final tree, and any site that comes; the crash rows you see.",
      "Each test whose verdict changes in ant testSystem or ant testQuick.",
      "Every sentence made false, and each of rows 900, 901, 902 and 926 closed, and row 928 rewritten.",
      "A file edited beyond those named, any edit of the prelude, of the run-time classes or of the writer side.",
    ],
    briefing: [
      "P-164", "P-58", "F-330", "F-321", "F-299", "ledger:926", "ledger:900", "ledger:901", "ledger:902", "ledger:928",
      "doc:explorations/compile-ladder/rung-io-writer/REPORT.md#What changed and why",
      "doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk",
      "doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type in each direction, held in a field: PLAN's line",
      "code:Library/FortressLibrary.fss#trait JavaBufferedReader excludes",
      "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait JavaBufferedReader excludes", "doc:Library/Writer.fss",
      "doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 5. The compiled reader against walk's, at the end of a file (rung R), by reading",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung R",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung V",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung A",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung H"],
    reasons: [
      "The decision whose reader rung you build.",
      "The binding's form.",
      "The writer rung as landed, the pattern you follow.",
      "The checker reads the whole helper class, fileOps among them.",
      "Walk's loader and its carriers, which your change extends.",
      "FileWriteStream left on glue while File is native, which closes.",
      "A rope written to a FileWriteStream, which closes.",
      "FileWriteStream's flush, which closes.",
      "A missing file that no catch sees, which closes.",
      "A program's object below the writer trait, whose sibling your reader trait has.",
      "The writer rung's files, classes and decisions, which yours mirror.",
      "Today's answers of the reader side, which your tests keep.",
      "The option the decision took.",
      "The trait you complete.",
      "The prelude's trait, whose names and methods yours take.",
      "The writer objects over a field, the form of yours.",
      "The helpers you bind.",
      "The 0 and the -1 at the end, and how eof tells them apart.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
      "Rung V's defaults: it also edits FortressLibrary.fss, FortressLibrary.fsi and FortressBuiltin.fss, at other declarations.",
      "Rung A's defaults: it also edits FortressLibrary.fss, FortressLibrary.fsi and FortressBuiltin.fss, at other declarations.",
      "Rung H's defaults: it also edits FortressLibrary.fss and FortressBuiltin.fss, at other declarations.",
    ],
    checks: [
      "P-164", "P-58", "F-330", "F-299", "ledger:926", "doc:explorations/compile-ladder/rung-io-writer/REPORT.md#What changed and why",
      "doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk",
      "code:Library/FortressLibrary.fss#trait JavaBufferedReader excludes", "doc:Library/Writer.fss",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 5. The compiled reader against walk's, at the end of a file (rung R), by reading"] }

const A_ENTRY = { id: 'A', slug: 'rung-array-store', path: '/home/user/fortress-array-store', branch: 'wip/rung-array-store', expectedMinutes: 60,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The arrays' store: PrimitiveArray and PrimImmutableArray over a compiled store in a field, walk's AtomicArray behind P-167's device, and PrimImmutableRR64Array over a double[] class (P-169; Q2)",
    blurb: "P-169's arrays: FortressLibrary declares a store trait whose bindings name helpers of a new nativeHelpers/arrayOps over a compiled store class, in the shape that Q2's answer gives; PrimitiveArray and PrimImmutableArray become plain objects over a field of that trait, each read a cast to T, and NativeArray a plain component; walk's private native object below the trait holds an AtomicArray, and walk's loader answers the arrayOps names with walk's glue by one rule for the class, so walk's arrays and their transactions do not change; PrimImmutableRR64Array's two move onto a compiled double[] class that no factory chooses; the checker's walk-world table gains the store classes; a test of the compiled store outside and inside the compiled transaction at four threads.",
    section: A_SECTION,
    pointsToReport: [
      "The store trait, its factories and walk's native object as declared; the loader's rule as written.",
      "The compiled store class, its shape, and arrayOps' helpers with their Java signatures; the change to runtimeSystem/Transaction.java if Q2 gave shape (ii).",
      "PrimitiveArray, PrimImmutableArray and PrimImmutableRR64Array as written, and NativeArray.fsi before and after.",
      "The cast at a read: its form; the quick pair's verdicts and seconds on your tree, against P-30's minute.",
      "Your tests before and after through the harness and your compiled store's test, at four threads; the atomic tests of the walk suite.",
      "The count table and the distance table on your final tree, and any site that comes; the crash rows you see.",
      "Each test whose verdict changes in ant testSystem or ant testQuick; row 466's behaviour before and after.",
      "Every sentence made false.",
      "A file edited beyond those named, any edit of the code generator, of the class loader or of the prelude.",
    ],
    briefing: [
      "P-169", "P-167", "P-164", "P-84", "P-85", "F-299", "F-328", "ledger:466",
      "doc:explorations/reviews/natives-device-2026-11-07.md#3.1 The arrays' store, 7 (Q1: yes)",
      "doc:explorations/reviews/natives-remainder-2026-11-07.md#2.4 NativeArray, 7",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 1. Q2: the compiled array store's two shapes",
      "doc:ProjectFortress/LibraryBuiltin/NativeArray.fss", "doc:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimitiveArray.java",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,",
      "doc:ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java#public static class MutableStaticBinding extends NeedsType {",
      "doc:ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32Vector.java",
      "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#private object JavaBufferedWriterObject extends JavaBufferedWriter",
      "code:Library/FortressLibrary.fss#(** Casting *)..else => throw CastError",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung A",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung V",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung R",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung H"],
    reasons: [
      "The decision whose arrays' shape you build.",
      "The device, walk's loader answering a helper's name with walk's own operation.",
      "The Java-backed trait, walk's native object below it and the table entry, the pattern of the store.",
      "An RR64 array's double[] store, decision A's, which stays boxed until then.",
      "The array design's three questions, which stay open.",
      "Walk's loader, and the table of F-328 that the device extends.",
      "The two names the device answers today.",
      "A second initialisation of an element, which the store meets.",
      "The way, its forced points and its forks.",
      "The team's sources, the peers and the uses of the two objects.",
      "The two shapes measured, and what each changes in the tree.",
      "The component you rewrite.",
      "Walk's store, which your rule answers with.",
      "Where the loader reads a string, and where your rule goes.",
      "The compiled transaction, its read and write sets.",
      "How compiled code reads and writes a cell in and out of a transaction.",
      "The team's 2011 store over a Java array in a run-time class.",
      "Walk's native object below a library trait, the precedent.",
      "The cast at a read.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
      "Rung V's defaults: it also edits FortressLibrary.fss, FortressLibrary.fsi and FortressBuiltin.fss, at other declarations.",
      "Rung R's defaults: it also edits FortressLibrary.fss, FortressLibrary.fsi and FortressBuiltin.fss, at other declarations.",
      "Rung H's defaults: it also edits FortressLibrary.fss, FortressBuiltin.fss and NativeApp.java, at other declarations.",
    ],
    checks: [
      "P-169", "P-167", "F-299", "doc:explorations/reviews/natives-device-2026-11-07.md#3.1 The arrays' store, 7 (Q1: yes)",
      "doc:explorations/reviews/natives-remainder-2026-11-07.md#2.4 NativeArray, 7",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 1. Q2: the compiled array store's two shapes",
      "doc:ProjectFortress/LibraryBuiltin/NativeArray.fss", "doc:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimitiveArray.java",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,",
      "doc:ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java"] }

const K_ENTRY = { id: 'K', slug: 'rung-checker-partial-order', path: '/home/user/fortress-checker-partial-order', branch: 'wip/rung-checker-partial-order', expectedMinutes: 50,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The checker's four sorts by a partial order made a linear extension, read once a pair (row 929; P-148)",
    blurb: "row 929: the compiled checker sorts a call's candidates, a coercion's candidates and a trait's ancestors with sortWith over a partial order, which Java's TimSort refuses at 32 elements or more; a class over a list and a strict order gives the minimal elements and a linear extension, reading each pair at most once; the four sites use it, and the call's sort shares its answers with minimal; a compiled test of 64 candidates that stops the checker on the base; P-148's timing before and after, and its second pass.",
    section: K_SECTION,
    pointsToReport: [
      "The class as written, and each site's change.",
      "Your compiled test before and after through junit.sh, with the base's stack.",
      "The count stage's three runs, base, change and pass, with their seconds, the diff of their tables and the comparison of their run.txt files.",
      "The distance table on your final tree, its #crash row, and Char's declaration's line in run.txt.",
      "The profile's top frames, and what the second pass took or why it took nothing; the audit of any reuse.",
      "Each test whose verdict changes in ant testQuick or the compiler track.",
      "Every sentence made false.",
      "A file edited beyond those named, any change of what the checker accepts or refuses.",
    ],
    briefing: [
      "ledger:929", "P-148", "F-54", "F-53", "F-66",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 2. Row 929: a sort that is correct on a partial order, and its time",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#// The candidates no other candidate is more specific than.",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#// Sort the arrows and instantiations to find the statically most",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala#// Build app candidates and sort them to find the SMA.",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala#// Heuristic extension to Dan Smith's algorithm:",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung K"],
    reasons: [
      "The row you close.",
      "The checker's speed after its correctness, in the same rung.",
      "The distance's two crash rows, which go.",
      "The count and the distance at the last gate.",
      "An undeclared crash is red only from the count.",
      "The reproducer, the prototype, its tables and its times.",
      "minimal and callType, two of your sites.",
      "The sort that stops.",
      "The coercion sort.",
      "The ancestors' sort.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
    ],
    checks: [
      "ledger:929", "P-148", "F-54",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 2. Row 929: a sort that is correct on a partial order, and its time",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#// The candidates no other candidate is more specific than.",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#// Sort the arrows and instantiations to find the statically most"] }

const H_ENTRY = { id: 'H', slug: 'rung-runtime-threads', path: '/home/user/fortress-runtime-threads', branch: 'wip/rung-runtime-threads', expectedMinutes: 40,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The run time's own threads, abort and the task trace on compiled helpers that walk's loader answers with its glue (P-169)",
    blurb: "P-169's threads: Thread's val, wait, ready and stop, the top-level abort and printTaskTrace name helpers of nativeHelpers/runtime, over the compiled run time; walk's loader answers the six names with today's glue through P-167's table, so walk's spawn and transactions do not change; compiled, abort throws the compiled abort inside a transaction and does nothing outside one, printTaskTrace prints the compiled task chain, and Thread's four raise FailCalled until the code generator compiles spawn (row 82); val is a pair over a bare binding at Any; a walk test and a compiled guard.",
    section: H_SECTION,
    pointsToReport: [
      "The six helpers as written, with their Java signatures, and the loader table's six entries.",
      "Thread's four and abort as declared, val's pair among them.",
      "Your tests before and after through the harness and junit.sh: abort inside and outside atomic on each path, and spawn's four under walk; tests/taskTrace2.fss and taskTrace3.fss.",
      "The count table and the distance table on your final tree, and any site that comes; the crash rows you see; runtime.java read whole.",
      "Each test whose verdict changes in ant testSystem or ant testQuick.",
      "Every sentence made false.",
      "A file edited beyond those named, any edit of the code generator, of walk's tasks or of the compiled transaction.",
    ],
    briefing: [
      "P-169", "P-167", "P-58", "P-162", "F-328", "F-298", "ledger:82",
      "doc:explorations/reviews/natives-device-2026-11-07.md#3.2 Threads, abort, the task trace, 6 (Q1: yes)",
      "doc:explorations/reviews/natives-remainder-2026-11-07.md#2.6 Thread 5 and printTaskTrace 1",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#static final java.util.Map<String, String> OWN_OPERATIONS",
      "doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java", "doc:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Thread.java",
      "code:ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java#public static boolean inATransaction() {",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x) {",
      "doc:Specification/advanced/parallelism-locality/transactions.tex#Abortable Atomicity",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung H",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung V",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung R",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung A"],
    reasons: [
      "The decision whose threads' shape you build.",
      "The device, walk's loader answering a helper's name with walk's own operation.",
      "The binding's form.",
      "The pair, for val's T.",
      "The loader's table, which you extend.",
      "The compiled rewrite checks a binding against the helper's Java signature.",
      "Compiled spawn, which stays.",
      "The way and its ground.",
      "The team's sources and the ways.",
      "The table you extend.",
      "The team's helper class over the compiled run time, which you extend.",
      "Walk's glue, which the table names.",
      "The compiled run time's test of a transaction.",
      "The compiled atomic, which retries on the compiled abort.",
      "abort's meaning, inside and outside an atomic expression.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
      "Rung V's defaults: it also edits FortressLibrary.fss, FortressBuiltin.fss and FortressBuiltin.fsi, at other declarations.",
      "Rung R's defaults: it also edits FortressLibrary.fss and FortressBuiltin.fss, at other declarations.",
      "Rung A's defaults: it also edits FortressLibrary.fss, FortressBuiltin.fss and NativeApp.java, at other declarations.",
    ],
    checks: [
      "P-169", "P-167", "F-328", "F-298", "ledger:82",
      "doc:explorations/reviews/natives-device-2026-11-07.md#3.2 Threads, abort, the task trace, 6 (Q1: yes)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java#static final java.util.Map<String, String> OWN_OPERATIONS",
      "doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java"] }

const S_ENTRY = { id: 'S', slug: 'rung-system-natives', path: '/home/user/fortress-system-natives', branch: 'wip/rung-system-natives', expectedMinutes: 30,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "System's natives: getEnvironment and getProperty onto stringOps, and, with Q3's answer, args built in Fortress over two scalar helpers (item 355; row 895; Q3)",
    blurb: "item 355, option 1, and row 895: System's getEnvironment and getProperty name two new helpers of stringOps that compute as systemOps' do, so that no binding of the one library names systemOps; systemOps keeps getProperty and getArgs for the compiler's prelude; the compiled guard retargeted. With Q3's default: args built in Fortress by immutableArray and tabulate over two scalar helpers of a new class, a count and the i-th argument, which walk's driver and the compiled main both fill, so that getProgramArgsPrim and getProgramArgs go and the checker reads System whole with no error; the checker run over System before and after.",
    section: S_SECTION,
    pointsToReport: [
      "The helpers and their Java signatures; what systemOps keeps and why.",
      "The compiled guard before and after through junit.sh.",
      "The checker over System, before and after, with its error lines.",
      "With Q3: args as written, the two helpers, where each path fills their static, and args' answers under walk with arguments and without.",
      "The count table and the distance table on your final tree, and any site that comes.",
      "Each test whose verdict changes in ant testSystem or ant testQuick.",
      "Every sentence made false, row 896's new line among them.",
      "A file edited beyond those named, any edit of CompilerSystem or of systemOps.getArgs.",
    ],
    briefing: [
      "doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355", "F-321", "ledger:895", "ledger:896", "P-58", "P-37",
      "doc:explorations/reviews/natives-remainder-2026-11-07.md#2.5 System's getProgramArgsPrim, 1",
      "doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java", "doc:Library/System.fss",
      "doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java#public static final class GetProgramArgs extends NativeFn0 {",
      "doc:ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 3. The checker over System, with rung S and with Q3's default",
      "map:README.md#7. Touch this, and that moves@nativeHelpers",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung S"],
    reasons: [
      "The answer whose option 1 you build.",
      "The checker reads the whole helper class, and systemOps fails it.",
      "The row that closes with your rung.",
      "getProperty at an empty name, which stays as it is.",
      "The binding's form.",
      "The compiler's prelude, which keeps its import of systemOps.",
      "Q3's ways and its default.",
      "The helpers you move.",
      "The bindings you retarget.",
      "The compiled guard you retarget.",
      "Walk's arguments today and their driver.",
      "The compiled main, which holds the arguments.",
      "The base, control A and control B.",
      "The territory map's row on helper classes and their wrappers.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
    ],
    checks: [
      "doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355", "F-321", "ledger:895",
      "doc:explorations/reviews/natives-remainder-2026-11-07.md#2.5 System's getProgramArgsPrim, 1",
      "doc:ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java", "doc:Library/System.fss",
      "doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 3. The checker over System, with rung S and with Q3's default"] }

const T_ENTRY = { id: 'T', slug: 'rung-codegen-trait-table', path: '/home/user/fortress-codegen-trait-table', branch: 'wip/rung-codegen-trait-table', expectedMinutes: 35,
    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],
    title: "The code generator's trait table: an object whose first supertrait is an imported api's trait (row 733)",
    blurb: "row 733, one of F-34's kinds, the wall of the library's 2-D and 3-D ranges: dumpMethodChaining's comparison of an inherited method's trait with the body's trait reads an imported api's trait, so that an object whose first supertrait is an api's trait and whose later supertrait gives a method of the same name compiles and runs each body; a compiled test with its own api and its walk guard.",
    section: T_SECTION,
    pointsToReport: [
      "Where the fix is, the type that the comparison read, and why the table did not find it.",
      "Your tests before and after through junit.sh and the harness.",
      "Whether row 732, the sibling, is reached, and what you measured of it.",
      "Every sentence made false.",
      "A file edited beyond those named; any edit of the checker's Scala, with the count stage's times and its second pass (fork T1).",
    ],
    briefing: [
      "ledger:733", "ledger:732", "F-34", "P-33",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex",
      "code:ProjectFortress/src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java#private TypeAnalyzer newTypeAnalyzer(",
      "doc:ProjectFortress/compiler_tests/RecursiveApiTest3.test", "doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 4. Rung T's wall on today's tree",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@For the whole batch",
      "doc:explorations/coordinator/CLIMB-BATCH-28.md#Forks the batch takes, none consequential@Rung T"],
    reasons: [
      "The row you close.",
      "Its sibling in the same method, which is not yours.",
      "The code generator's refusals in the library, by kind.",
      "Code-generator work beside the natives.",
      "The method that stops.",
      "The table's look-up that throws.",
      "How the code generator's table is made, over the component and the api environment.",
      "A compiled test with its own apis, the form of yours.",
      "The library's sites of each kind.",
      "The wall on this base, with its stack.",
      "The defaults for the whole batch, which every rung keeps, each with the ways not taken.",
      "The defaults your rung builds, each with the ways not taken.",
    ],
    checks: [
      "ledger:733", "F-34",
      "code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex",
      "doc:explorations/compile-ladder/plan-28/PROBES.md#Probe 4. Rung T's wall on today's tree"] }

const RUNGS = [V_ENTRY, R_ENTRY, A_ENTRY, K_ENTRY, H_ENTRY, S_ENTRY, T_ENTRY]
const BATCH_INTRO = "This run is climb batch 28, the sixth batch of the plan's phase 4, the switch-over. It takes up to 50 of the 102 bindings that still name a glue class off them (section 2, \"Where the natives stand\"), makes the checker's sorts correct on a partial order, and takes one wall of the code generator. Its rungs:\n\n- V, P-161 and P-169: the checked integer getters, bitsAs..., the low-bits names on every type, ZZ's narrow and widen deleted with their callers moved, ZZ32's big on its helper, IntLiteral's 8 in Fortress over asZZ, and the specification's sentences;\n- R, P-164's reader rung: FileReadStream, Reader, stdIn and FileWriteStream as plain objects over the Java-backed JavaBufferedReader and JavaBufferedWriter, and File and Reader plain components;\n- A, P-169's arrays, if Q2 is answered: PrimitiveArray and PrimImmutableArray over a compiled store in a field, walk's AtomicArray behind P-167's device, PrimImmutableRR64Array over a double[] class;\n- K, row 929: the checker's four sorts by a partial order made a linear extension, read once a pair, as fast as today (P-148);\n- H, P-169's threads: Thread's four, abort and printTaskTrace on compiled helpers that walk's loader answers with its glue;\n- S, item 355's option 1 and, if Q3 is answered, Q3's: System's two natives onto stringOps, and args built in Fortress over two scalar helpers;\n- T, row 733: the code generator compiles an object whose first supertrait is an imported api's trait.\n\nEach rung has tests that fail on the base and pass after, and guards that pass on both. Only K changes the checker's checking code, and it makes P-148's speed pass. Every rung but T changes text that the stages read, so each runs the count stage and the distance stage once on its final tree, against climb batch 27's landed 0 and 0 (F-53); the distance's two crash rows in value object Char are row 929's, and on a rung's own tree they may stay, go or move: report them, declare none. Three rules hold for every rung's tests, since other rungs change what tests can meet: assert no crash row; assert no glue string, since V, R, A, H and S move them; and assert no walk message that no catch sees at a missing file or a consumed reader, which R makes the library's exceptions. No rung builds on another, none lands only with another, and no two change one declaration. The gather composes them, revises Appendix I's natives effect to the merged count, builds the specification once for V's entry, and runs the 52 team demos on the merged tree. ant testSpecData runs in the gate because the landed summary has it."
// =========================== END MANIFEST ==================================

const BATCH_DIR = 'explorations/compile-ladder/climb-batch-' + BATCH
const GATE_DIR = BATCH_DIR + '/gate'
const SITES = 'explorations/compile-ladder/gate/distance-sites.tsv'   // the distance stage's per-site list, one path overwritten at each landing
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore ignores /tmp/
const GATE_OUT = LOG_DIR + '/out'   // the gate writes here; the commit stage copies it to GATE_DIR
const SPEC_PDF = MAIN + '/tmp/gather/fortress-batch-' + BATCH + '.pdf'   // the gather's build of the specification, which the commit stage takes when no later commit changes Specification/

// The disk free on /home/user that the run needs before its scatter, in GiB: 1.5 a rung and 4 for the
// main tree. A rung worktree is seeded at about 206 MB (the skill's worktrees.md) and grows with its
// builds, its test runs and the old code's private caches: du -sh gave 0.28 to 1.1 G each in climb
// batch 27's agents. The main tree's stages write the gather's builds and demos, the gate's
// TEST-RESULTS and the ladder's two copies of the caches, and the specification's build. Climb batch
// 27 started its ten rungs without that margin: the allowance ran out (31 MB to 443 MB free through
// the batch), rungs S and T never started, and other stages skipped their measures (its RECORD.md,
// "Not landed"; PLAN.md item 68). The figures are the coordinator's of 2026-11-07, after that batch.
const DISK_FLOOR_G = { perRung: 1.5, mainTree: 4 }

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
const MORE_PARTS = 'Output that ends by naming a next part is continued by the same command with --part 2, then 3, until it says it printed the last, each part in a call of its own: two parts in one call pass the 30,000 characters past which the tool saves the output to a file, and climb batch 26\'s rung S, which printed its parts 2 and 3 together, then read them only by grep.'

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
'The fortress-repo skill says how to work in this repository: how to set up each call, build, run walk and the compiled path, run the old code beside the new, write and run tests, wait for a long command, stop processes, pick up after a stop, commit and report. Load it first, as CLAUDE.md asks; read whole, before work, the part on how revived Fortress differs, which its SKILL.md says every task needs; and open the other parts your work reaches. This brief says what your role does in this batch and where. Where the brief and the skill differ, the brief holds, and it says so where it does.',
'',
'Two rules of this brief beside the skill. Open each part of the skill in a call of its own, never several in one cat: a call\'s output past 30,000 characters is saved to a file under a 2K preview and takes another call to read, as 17 results of climb batch 26 were, most of them several parts at once. And send each wait_for call alone in its message, with no other call beside it: calls sent together hold your turn until the last returns, and climb batch 26\'s gate, with two waits in one message, went 481 s without a request, past the five minutes your prompt cache lives, so its next call wrote 94K again.',
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
'A point to report is a kind of change the curator reviews after the landing; the rung\'s list says which. A rung that reaches one finishes its work, lists the point with its evidence as file:line, and lands: it is reversible, and neither the push nor the next batch waits for it (POSITIONS.md, "Reversible stops do not hold a batch."). One kind holds the push: a step that cannot be undone, or that acts against a decision on record. Do not take such a step; report it as a decision not taken. If one was taken, list it with holdsPush true, and cannotBeUndone true for a step that cannot be undone, false for one a later commit can take back: a repair on the merged tree that settles one of the second kind lifts its hold, and only the curator lifts one of the first. A question for the curator goes in forCurator, with its evidence.',
'',
'## Citing',
'',
'Cite the tree at file:line, a FACTS.md entry and a POSITIONS.md entry by its bold title, and a result by quoting two to five of its lines with the command that printed them; never cite a file under tmp/. No model identifier goes into a file or a commit message. The commit footer is the skill\'s (committing.md).',
'',
'## Your scratch',
'',
'Every file you write that your role does not commit (a saved output, an extract of a briefing or a transcript, a program, a copy of code) goes under the tmp/ of the worktree your role works in, which git ignores: in the folder your role\'s part below names, or else in one named for your role. Never write one in the session\'s scratchpad directory, though your system prompt names it; this brief holds over it, since every agent of this run shares that folder, and in climb batch 24 two skeptics wrote one file name there.',
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
'   Its before is ' + LANDED_TABLES + ': never run a stage on your unchanged base, and never run a stage\'s driver on part of the library on code the full stage then measures (POSITIONS.md, "No re-measuring what the record holds."). The same holds for every other result of the base\'s code that your section or briefing gives, a planner\'s probe among them: it is your before, and you run that probe on your code only, never on the base again for a comparison in one session, since a count of refusals or errors is not a timing and the machine\'s load does not move it (the skill\'s SKILL.md, "Rules for every task"). Put in REPORT.md the diff of the count tables, what ' + DIST_COMPARE + ' prints for the distance tables, and each site that moved, read through tmp/' + rung.slug + '/dist-post/errors.tsv against the per-site list by row, not by the stage\'s class (row 577). Name the commit each stage ran on; where a change of code followed a stage\'s start, say so, and do not call its table your final tree\'s (climb batch 26\'s rung T did, its count one code commit before its last). Commit no table: the gate\'s tables on the merged tree are the record.',
'   When your edit changes the compiled checker, its Scala under scala_src/ or the code the build generates for it, do also what the skill\'s compiler.md, "The checker\'s time", says, which holds here where this brief differs: time the count stage on the base build before your edit and on your tree once the change is correct, in one session, make the second pass that section asks for, which makes the checker faster and keeps its results the same, and give in REPORT.md each run\'s seconds and the comparisons that show the results the same (POSITIONS.md, "The checker\'s speed comes right after its correctness.").',
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

// How a worker and a skeptic write their reports: in climb batch 24 the harness refused four of seven
// workers' Write of REPORT.md and none of the three heredocs (reviews/batch-24-review.md, finding 5).
const BY_HEREDOC = 'through a Bash heredoc or a script, not the Write tool: the harness refused the Write of REPORT.md to four of climb batch 24\'s seven workers (\'Subagents should return findings as text, not write report files.\') and none of the three heredocs'

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
'   When the run is resumed after a kill, you run again from your start, with this brief, on what this role\'s earlier launch left. If ' + rung.path + ' already holds ' + (mode === 'first' ? 'commits past ' + BASE : 'commits after the one that carries the judge\'s ruling') + ' or uncommitted edits, they are that launch\'s, and the head it reached is the newest of those commits (git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short, and git status -sb for what it did not push): take over from that head, its commits yours to verify, not to redo, and test first still holding. Its transcript is in this run\'s directory, ' + runDirLine((mode === 'first' ? 'rung' : mode) + ':' + reId(rung.id)).trim() + ', then grep for your label in "$D"/agent-*.meta.json; read it with jq, never whole, and put any extract of it under tmp/' + rung.slug + '/.',
...(mode === 'repair' ? [sliceStep([rung], 'your worktree', '2. Before anything else,').join('\n')] : briefingStep(rung, 2)),
rung.testIsStage
  ? '3. The test. Step 7 below is this rung\'s test for the library\'s sites; the walk tests your section names are written first, as the skill\'s tests-writing.md, "The order", says.'
  : '3. The test, first, as the skill\'s tests-writing.md says ("The order"; "Promoting an XXX test"): the essence of the defect as a clean minimal program named by its topic, seen failing through the harness on the base\'s code in a run that ends before your edit is first built (under walk, before you edit a library source it reads), then the fix, then the test seen passing in your last run after your last change of code. The test and the fix may share a commit. ' + (mode === 'repair' ? 'The merged-diff review reads this order in your transcript' : 'Your skeptic reads this order in your transcript') + ' and runs nothing again, so the failing run goes through the harness, never only by hand. A rung that edits only prose has no test; its text is checked against the tree and the decisions on record.',
'4. Where the fix belongs, before you edit: explorations/coordinator/map/spec-to-implementation.md and modules-and-phases.md for the place, the skill\'s library.md for the library\'s own way. Where a precedent repaired the same defect, count the other sites in its file and give the number. List every way the language and the library offer before you choose, and put the choice in your decisions with the ways not taken.',
'5. The edit, as small as the test needs, and the build it needs (the skill\'s build-and-caches.md, "Building" and "After an edit of the library").',
'6. Whole suites, only as the skill\'s tests-running.md says ("When to run a whole suite"): once for each code state, after your last edit, when your edit changes Java or Scala of the checker, of walk or of a phase both share; your own tests otherwise. The gate is another agent\'s: run only the suite that part names for your edit (ant testQuick for the checker, ant testSystem for walk, both for a shared phase), once, and never the gate\'s whole set.',
...stagesStep(rung, 7),
'8. Every defect you measure gets one of the three homes of the skill\'s tests-writing.md ("How a defect is recorded"), and REPORT.md says which and why. A new ledger row goes in record.md in the row template of ' + LEDGER + ' (its header), with NEW-' + rung.id + '-1, NEW-' + rung.id + '-2 for its number, also where a test or a report cites it: the gather adds the rows through ' + LEDGER + ' and puts their numbers in. Never run ' + LEDGER + ' add, note, rewrite or close yourself. The first XXX test you add is shown red on a deliberate fix, through the harness (tests-writing.md, "Writing an XXX test").',
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
'- record.md: the record lines the gather folds, each a complete finding: the claim, the conditions under which it holds, its evidence (the file:line, the command with its output, the test) and what it means for the work. Completeness is yours; the record pass owns the final wording. The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md). Each change to an existing ledger row: a note that adds a fact (the row, and the text to add), only where the row with it stays within the limits of ' + LEDGER + '\'s header (notes 700 characters, the row 1,200), else the row\'s whole new line, its notes cut back to what holds now; or, where your change alters what the row says (a half of it fixed, a message renamed, its XXX test promoted or renamed, its claim narrowed), the row\'s whole new line in the row template, for the gather\'s ' + LEDGER + ' rewrite, its claim and notes stating the gap as it stands after your change and not its repair history. Each new row (NEW-' + rung.id + '-n, in the row template). Lint each whole row line you give, and each row\'s line with its note added, by ' + LEDGER + ' check --rows FILE, the lines in a file under tmp/' + rung.slug + '/; it writes nothing, and a NEW- number fails only its number rule (in climb batch 26 six row writes were refused for length at the gather). The handover line. And a section headed "Revival change": the material from which the skill writer, after the landing, writes the skill\'s part on what the revival changed in the team\'s Fortress, when your change makes the revival\'s Fortress differ from what one of the team\'s sources (the specification, walk, the compiler, the library) says or does. It has two labelled parts. "The change": the team\'s source and what it says or does, with file:line; what the tree now does, with the test that shows it; and the reason, as evidence (a passage of a source, a checker refusal, a measured failure). "Provenance": the question or item, the answer or default it follows, and the batch. Name no question, item, batch, rung or record file in the change, and give no decision\'s status there; provenance goes in its own part. You write no skill text: the gather copies both parts into the batch\'s RECORD.md for the writer. When your change makes no such difference, the section is the line "Revival change: none", with the reason.',
'- A decision record if your section asks for one. Nothing else under explorations/.',
'',
'Write each of these files ' + BY_HEREDOC + '.',
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
'When the run is resumed after a kill, you run again from your start, with this brief, on what this role\'s earlier launch left: on the branch after the worker\'s last commit, a commit titled "The worker\'s report and record, from the run\'s journal", a commit whose title begins "Skeptic\'s fix:" and a commit of SKEPTIC.md, and the files under tmp/' + rung.slug + '/skeptic/ (git log --format="%h %ci %s" ' + BASE + '..HEAD, git status --short, ls -lt tmp/' + rung.slug + '/skeptic/). Take over from them: a fix committed is yours to verify, not to redo, a program whose output is whole is not run again, and test first still holds. That launch\'s transcript is beside yours, under your own label; read it with jq, never whole:',
'',
transcriptsLine(['skeptic:' + id]),
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
  : '1. The count and distance tables the report declares, against the worker\'s files under tmp/' + rung.slug + '/, a file read; or, where the report says neither stage ran, that git diff --name-only ' + BASE + '...HEAD lists no path outside ' + STAGE_BLIND_TEXT + '.')
  + ' Read each stage\'s nohup call in the transcript against the worker\'s last change of code: a stage started before it ran on an earlier code state, which REPORT.md must name, a correction, not a run of yours. When the diff changes the compiled checker, its Scala under scala_src/ or the code the build generates for it, run the count stage yourself, on the base build and on the worker\'s head in one session, as the skill\'s compiler.md, "The checker\'s time", gives a reviewer: check the two times, and that your table and output equal those of the worker\'s run before its second pass, the same results as that section defines them.',
'2. Test first, read in the worker\'s transcript, each point by its time and call id: the test seen failing through the harness on the base\'s code in a run that ended before the edit was first built (under walk, before a library source it reads was edited), with the lines recordedFailure quotes; and seen passing in the worker\'s last such run, after its last change of code, with the line recordedPass quotes. The skill\'s tests-writing.md, "The order", is the rule. A test the transcript does not show failing on the base\'s code is a defect of the change, which you fix ("What you do with a finding"). A rung that edits only prose has no failure to see: its text is checked against the tree and the decisions on record.',
'3. The diff (git diff ' + BASE + '...HEAD), line by line, against the section, the specification\'s passages it cites and each decision on record your slice printed: does the edit do what the report says, only that, as small as its test needs, the decision\'s rule stated neither narrower nor broader than the decision states it?',
'4. Where the fix belongs and the library\'s way: did the worker find what the team already did here, follow the right precedent, and count the other sites of a defect a precedent repaired? A device the rung invented where the library has one is a finding, with the library\'s file:line.',
'5. The test exercises the defect; each specification citation in its messages names the file and the section, never a line, and the section says what the message says; the file carries at most one comment line and is named by its topic.',
'6. Your own programs, the differential. For every construct the rung touches, programs the worker did not write, run under walk and on the compiled path, with the rung\'s build for the new code and the old code from the base build:',
'',
...oldCodeLines(rung),
'',
'   Write them, and every other scratch file of yours, under tmp/' + rung.slug + '/skeptic/. ' + (rung.writesState
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
'- A correction: a sentence of REPORT.md or record.md, a citation, a provenance line, a FACTS entry, a missing assertion of a value the rung\'s own test already reaches, a home-2 or home-3 test, a ledger row (NEW-' + rung.id + '-n in record.md, in the row template), a sentence of the specification the change makes false. Make it, and commit it. A test of a defect you find, here or below, goes in the test folder for its kind that the skill\'s tests-writing.md, "Where a test goes, and how it passes", gives, ProjectFortress/tests/ or a compiled one such as ProjectFortress/compiler_tests/, whatever the section\'s list of files says; where that list lacks the folder, the test\'s path goes in pointsReached, as a path outside the section does (below). An assertion or a test you add is seen failing through the harness on the base\'s code, run with the old code tool (the skill\'s worktrees.md, "Running the old code"), and passing on the head: the fix is already in the tree, so the base is where it fails.',
'- A defect of the change: it is wrong, or incomplete, a sibling site its own repair owes, a crash where the text gives an error, a test not seen failing first. Fix it, test first: the program that measured it becomes a gated test or an assertion (the skill\'s tests-writing.md), seen failing through the harness on the worker\'s head before your edit; then the fix, where it belongs and in the library\'s way, after you have listed the ways; built as the skill\'s build-and-caches.md says; the test seen passing; and, when your fixes change Java or Scala of the checker, of walk or of a shared phase, the whole suite they reach once, after your last fix (the skill\'s tests-running.md). Commit each fix with its test in one commit whose title begins "Skeptic\'s fix:", and push. Run no count or distance stage after a fix: the gate\'s tables on the merged tree are the record, and SKEPTIC.md says that the report\'s tables are those of the worker\'s head.',
'- Settled or contested. A fix is settled when the rung\'s section, the specification or a decision on record says that what your fix makes the code do is right: cite that sentence with the fix. A fix is contested when (a) the worker\'s report argues for the behaviour your fix changes, not only for its form; or (b) nothing on record settles it and you chose among ways; or (c) it touches a path the section does not give the rung and no sentence you cite settles it. A fix that reaches a point to report, or touches a path outside the section, is not contested for that alone: when a sentence you cite settles it, it is settled, and the point or the path goes in pointsReached for the curator. Make a contested fix all the same, in a commit of its own, and list it in contested with the worker\'s argument and yours: a judge rules on it alone, and may revert it.',
'- Refuse only when the rung cannot be fixed here: its approach is wrong and a fix would redo it; the fix needs a path no rung of this batch may touch, or a decision of the curator; or it is larger than a repair round. Then make no fix for that finding, and refuse with the one thing that must change.',
'- Every point to report the rung as it stands reaches, whether or not the worker listed it, goes in pointsReached; a question for the curator, in forCurator. Do not edit the worker\'s account of its own decisions: say where you differ in SKEPTIC.md.',
'',
'## Your verdict',
'',
'Write SKEPTIC.md in ' + dir + ': what you checked, the lines of your programs\' output each finding rests on with their commands, each fix with its finding, its test\'s failing and passing lines and its commit, each contested fix with both arguments, and your verdict. Write it ' + BY_HEREDOC + '. Commit it alone, last, and push. Set verdict to approved when the rung, with your fixes, is right and none is contested; contested when it is right with your fixes and one or more is contested; refused when it cannot be fixed here. In skepticText put the single word committed once SKEPTIC.md is committed; only if the harness refused the write, say so in findings and carry the text in skepticText, word for word. headJudged is the head the worker left, before your first commit; headAfter the head after your last. Run no suite but the one your own fix needs, as "What you do with a finding: fix it" says; the gate runs every suite on the merged tree.',
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
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The ways the gate is red: a failing or erroring JUnit suite (ProjectFortress/TEST-RESULTS/); a suite whose test count fell against the last landed summary, which usually means a .test file or a tests= line went missing; a FAIL or a repeated timeout in the four-thread atomic runs, a lost update in the transaction run time; a ladder regression, a file that compiled and ran before reaching a lower phase or printing other output; a failing example of testSpecData once it is a gate step; and, from the checker count, a crash line no rung declared, a stale checker shadow or a table with no total (its total is reported and never red, and the distance stage is never red). Find the source of the conflict as a whole and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong.',
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
    holdsPush: { type: 'boolean', description: 'true only for a step taken that cannot be undone, or that acts against a decision on record: it holds the push until the curator lifts it, or a repair on the merged tree settles one that can be undone; false for every reversible point' },
    cannotBeUndone: { type: 'boolean', description: 'with holdsPush true: true for a step that cannot be undone, which only the curator lifts; false for a step against a decision on record that a later commit can take back, which a repair on the merged tree can settle. false with holdsPush false' },
  }, required: ['point', 'evidence', 'holdsPush', 'cannotBeUndone'] } }

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

// The pairs the gather's order puts first: each approved rung after the rungs it lands only with.
const landsAfterText = (approved) => approved.map(r => RUNGS.find(m => m.id === r.rung))
  .filter(m => m && (m.landsOnlyWith || []).length)
  .map(m => m.id + ' after ' + m.landsOnlyWith.join(' and ')).join('; ') || 'none in this batch'

function gatherRole(approved, notLanded, items) {
  return MAIN_TREE_ROLE + [
'# Your role: gather',
'',
'Compose one clean local commit per approved rung on main, then one that closes the ledger rows the rungs fixed. Nothing is merged: each branch stays as it is. You write the batch record, ' + BATCH_DIR + '/RECORD.md, once, last, with every hash it needs; no later stage rewrites it.',
'',
'First check that git status --porcelain is empty and that ' + BASE + ' is an ancestor of HEAD (git merge-base --is-ancestor); report it if not.',
'',
'Start every step that can take more than a minute or two (the build of the merged tree, the library order, a harness run, the team demos, the specification\'s build) detached with nohup, in the form of the skill\'s session.md, "Long commands", and wait for it with that section\'s wait_for on its log, each wait a Bash call of its own, called again until it prints its EXIT= line. Never wait longer in one call, by a loop, a sleep or beside Monitor: a call held past five minutes lets your prompt cache lapse, and your next call writes your whole context again (climb batch 25\'s gather waited twice for 600 s on the demos, two refills of 354K each).',
'',
'## The order the rungs go in',
'',
'First, a rung goes after every rung it lands only with (landsOnlyWith in the manifest; here: ' + landsAfterText(approved) + '), so that no commit on main holds a rung without the rungs it needs. Then the rungs that share a file go in the ascending order of their lowest edited line in that file, so that a later rung\'s hunk does not shift the lines a landed record cites: a line is compared only with a line of the same file, never across files, and rungs that share no file keep the manifest\'s order. Where two shared files would order one pair both ways, the pair keeps the manifest\'s order, and the later rung\'s cited lines are re-anchored by symbol, as step 2 below says. Work it out from git diff ' + BASE + '...<branch> per branch before you apply anything, and say in your result what order you chose and why.',
'',
'## For each rung, in that order',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > tmp/gather/<slug>.patch, then git apply --3way --index on it. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: in unrelated regions, resolve it by hand from both sides and say so; where both changed the same logic, do not guess: leave the tree clean, and return with the conflict named. Then its files under explorations/compile-ladder/<slug>/. The branch carries REPORT.md and record.md where the skeptic wrote them from the run\'s journal, and SKEPTIC.md. Where it lacks one, run that file\'s command from textCommands below, from ' + MAIN + ' (the journal tool finds the journal itself), and compose nothing; where the rung had a repair round (repaired true), run the REPORT.md and record.md commands even where the branch carries the files, since the repair round\'s texts replace the worker\'s. A command that exits 1 wrote nothing: report the file missing; so is a SKEPTIC.md whose text is only the word committed.',
'2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file\'s README gives the rule), after the section\'s last entry: the fact, its source and its test in a few lines. Each change to an existing ledger row: a note that adds a fact with ' + LEDGER + ' note N "TEXT"; a row\'s new line, and any change to what a row says (its claim narrowed, a half fixed, its test promoted or renamed, its notes at the limit), with ' + LEDGER + ' rewrite N FILE, the whole line in a file under tmp/gather/, its claim and notes stating the gap as it stands now and not its repair history. A note the tool refuses for length goes in through rewrite, the row\'s notes cut back to what holds now: none is left out. Each new row: its line, its number cell ?, into a file under tmp/gather/, then ' + LEDGER + ' add FILE --section "TITLE", the section its writer names or the one its class fits; the tool numbers it and checks it against the template, and a row it refuses you correct to the template, keeping its claim. Replace the row\'s placeholder (NEW-<rung>-<n>) with its number everywhere the rung\'s files and tests cite it, before the rung\'s commit. The handover line in the RECORD.md of the batch, section "Handover lines" (the first section of the old handover file is retired into the first section of PLAN.md, which the coordinator keeps). The rung\'s "Revival change" section is folded into no file: copy it, both its parts word for word, or its line "Revival change: none" with the reason, to tmp/gather/<slug>-revival-change.md for step 7. Write nothing under .claude/: the batch writes no skill text, and the skill writer writes the skill from RECORD.md after the landing. Any file:line a record cites that an earlier rung\'s hunk shifted is re-anchored by symbol.',
'3. The corrections still owed: each leftForGather item of the rung\'s skeptic, below; each sentence of the specification that the rung\'s REPORT.md lists as made false by its change and that the rung did not edit, an Appendix I Effect or a note on walk or the compiled path, corrected to what the code does, each clause checked against the code line it states. Such a sentence states what the code does, so it is not a text mismatch.',
'4. Its items for the curator, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, at the line it is now at.',
'   A text mismatch is not blocking. Where one rung\'s specification text and another rung\'s code disagree and the decisions on record settle it, fix the side they settle. Where they do not, it is reversible and lands as a point to report: the text stands as the rung wrote it; the path that departs gets a ledger row and a gated XXX test asserting the text\'s rule, or, where no such test can show the departure, as when it shows only in the one library\'s world, a gated test of today\'s behaviour, the row saying why; the text\'s entry in Specification/appendices/changes.tex names that row among its departures; all in the later rung\'s commit, and the mismatch goes in your forCurator.',
'5. One commit: the applied source and tests, the rung\'s REPORT.md, SKEPTIC.md and JUDGE.md if any, a decision record if it has one (record.md is folded, not landed: take it out of the index and the tree once step 2 has folded it), FACTS.md, the ledger and its history file, the handover, and PLAN.md when step 4 wrote to it. Stage them by an explicit list and read git diff --cached --stat before you commit. Title: what the repair does, in plain words; body: the two or three sentences of record.md that say why, and where the commit touches any path outside explorations/ and .claude/, a line beginning "historical:" naming the files of the original 2012 tree it edits, from the provenance block. The skill\'s footer. Do not push.',
'',
'## After the rungs',
'',
'6. Close each row a landed rung fixed, as its rowsClosed and REPORT.md name it, once its test passes on the merged tree as the rung last ran it: the walk tests of all the landed rungs in one harness-one.sh call, each X.test named beside its X.fss where it has one, as the skill\'s tests-running.md, "One test, or a few", says (climb batch 26\'s gather ran its 20 twice, the first call without the five .test files); a row whose test is the checker count or the distance stage closes on the rung\'s run of it, the gate\'s tables on the merged tree its check, and you run neither stage: ' + LEDGER + ' close N --commit <the rung\'s commit on main> --test <the test>. Then ' + LEDGER + ' landing-check ' + BASE + ', which fails on any finding, a failure the base already had among them: a row that breaks the template, an XXX test the batch deleted or renamed that an open row still names, an open row that a landed commit says it fixed, a FACTS or POSITIONS entry that states a row\'s status otherwise. Clear each before this commit, through ' + LEDGER + ' rewrite, close or note, or the entry reworded, and run it again until it prints no finding. One commit, titled "Close the rows climb batch ' + BATCH + ' fixed".',
'7. ' + BATCH_DIR + '/RECORD.md: the rungs applied, in what order and why, each with its commit hash; the rows opened (number, rung, claim) and closed; each skeptic\'s fixes and contested rulings, by commit; every file written from the journal; the rungs that did not land (below); the points to report every landed rung reached, from the lists below; the items for the curator and where each is in PLAN.md; and last, under the heading "Revival changes, for the skill writer", one subsection per landed rung, headed by the rung, holding its "Revival change" section from tmp/gather/<slug>-revival-change.md, both parts word for word (the change, and its provenance), or its line "Revival change: none" with the reason. One commit.',
'',
'When you build the specification to check its text (the skill\'s specification.md, "Building it"), build it once, on main\'s text after the last edit under Specification/, and before you remove the build\'s files copy Specification/fortress/fortress.pdf to ' + SPEC_PDF + ', from whichever tree you built in: the commit stage takes that copy in place of a build of its own when no commit after yours changes Specification/.',
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
    applyOrder: { type: 'string', description: 'the order the rungs were applied in and what decided it: a rung after the rungs it lands only with, then the lowest edited line in each file two rungs share' },
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
'3. The folded record as a whole: every FACTS line true as written, sourced and checkable; every ledger note, rewrite and new row in place (' + LEDGER + ' landing-check ' + BASE + ' prints no finding, with no allowance for a failure the base already had: each finding is a record defect you fix in your corrections commit, through ' + LEDGER + ' rewrite, close or note, or the entry reworded; no NEW- placeholder left where a row is cited: grep -rn "NEW-[A-Z]-[0-9]" explorations/fortress-gap-ledger.md explorations/coordinator/FACTS.md explorations/coordinator/PLAN.md explorations/compile-ladder/ ProjectFortress/, where a line of the batch\'s RECORD.md that gives a placeholder beside its number is not a finding, and the batch record and the synthesis under explorations/coordinator/, which name the form as an example, are not searched); every row the gather closed fixed by a landed commit; the handover\'s first section consistent; the revival-change material the gather copied into ' + BATCH_DIR + '/RECORD.md, under "Revival changes, for the skill writer", true of the code as landed.',
'4. Each sentence of the specification a rung\'s REPORT.md lists as made false: corrected, by the rung or the gather, to what the code does.',
'5. The points to report: every one a landed rung reaches, in its hunks or where its REPORT.md or SKEPTIC.md says so, in your pointsReached with the rung, the evidence and holdsPush; true only for a step taken that cannot be undone or acts against a decision on record, with cannotBeUndone true only for the first. It is not a blocking finding.',
'6. The items for the curator: for each id below, the PLAN.md entry the gather\'s curatorItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says; one missing or misplaced you put in yourself in your corrections commit. Your own points go in forCurator, as ' + label + '.1, ' + label + '.2. ' + PLAN_RULE + ' It is not a blocking finding.',
'',
'The items for the curator from the rungs and the gather, by id:',
'',
JSON.stringify(items, null, 2),
'',
'Three kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections". A defect whose repair touches a path outside explorations/ that is not a test file (source, library, checker, interpreter or specification) you do not fix: return it in blockingCode, precisely enough that a judge can rule on it from your words and the diff; a repair runs, and the gate runs again only when it changed a path the gate reads (ProjectFortress/ but test files, Library/, build.xml). A finding settled by tests and records only that you do not fix yourself, a test owed or a test file to change, you return in routed, each with the step the next batch owes; put each into PLAN.md as review-routed.1, review-routed.2 in your corrections commit, and list the ids in curatorItems: it goes to the next batch and holds nothing. A text mismatch the gather filed as a point to report is not blocking: check its row, its XXX test (or its test of today\'s behaviour, where the row says why no XXX test can show the departure) and its Appendix I mention; complete a missing record yourself; return a missing test in routed. Do not run the gate, and do not push.',
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
'5. The summary, with the machine it ran on, and its comparison with the last landed one. Its functions, and those of step 7, are in ' + GATE_FUNCTIONS + ': source it from ' + MAIN + ', in each call that uses them, since each call starts a new shell, after the call\'s whole setup of the skill\'s build-and-caches.md, its exports and its unset JAVA_TOOL_OPTIONS, not FORTRESS_HOME alone: gate_summary\'s machine lines read that shell\'s java -version and FORTRESS_THREADS, and climb batch 26\'s gate, which set FORTRESS_HOME alone, committed the proxy\'s "Picked up JAVA_TOOL_OPTIONS" line and FORTRESS_THREADS=unset:',
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
'   Run checker_compare "$(last_landed_checker_count)" ' + GATE_OUT + '/checker-count.txt "' + ((expectedChecker && expectedChecker.counts && expectedChecker.counts.length) ? expectedChecker.counts.join(', ') : 'none') + '"' + ((expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length) ? ' "' + expectedChecker.crashes[0].replace(/^[^:]*: /, '') + '"' : '') + ' and append its output to the summary, each line prefixed "# checker ". The total is reported and never red (POSITIONS.md, P-39); a crash line no rung declared, SHADOW STALE and NO TOTAL (a library that stops before the checker) are red.',
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

// The points that hold the push and that this repair can settle (holdState), each by its id: the
// repair says of each whether it settled it, with the evidence, and pushHeldBy decides from that.
function holdsStep(holding, kind) {
  if (!holding.length) return []
  return [
'',
'## The points that hold the push',
'',
'These points to report hold the push: each is a step taken against a decision on record that a later commit can take back. One is settled when the tree after your commit no longer acts against the decision it names, as that decision\'s own check, run on the repaired tree, shows: for a team demo that stopped, the demos run again on it and every one reaching its end. For each, return in holdsSettled its id, settled, and evidence: the command you ran on the repaired tree and two to five lines it printed. Where your ruling\'s instructions do not reach a point, run no check for it, and return it settled false with the reason. The script lifts the hold of a point only when your repair lands and you return it settled with its evidence; every other point holds the push for the curator. Name in ' + BATCH_DIR + '/REPAIR-' + kind + '.md each point you settled, with the same lines.',
'',
JSON.stringify(holding.map(h => ({ id: h.id, from: h.from, point: h.s.point, evidence: h.s.evidence })), null, 2),
'',
  ]
}

function mergedRepairRole(decision, kind, failing, holding) {
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
...holdsStep(holding || [], kind),
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
    holdsSettled: { type: 'array', description: 'one entry per point of your brief\'s "The points that hold the push"; empty when it lists none',
      items: { type: 'object', properties: {
        id: { type: 'string', description: 'the point\'s id, as hold.1' },
        settled: { type: 'boolean', description: 'true only when the repaired tree no longer acts against the decision the point names, as the evidence shows' },
        evidence: { type: 'string', description: 'the command run on the repaired tree and two to five lines it printed; for a point not settled, why' },
      }, required: ['id', 'settled', 'evidence'] } },
  }),
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'pointsReached', 'summary', 'headBefore', 'headAfter', 'pathsChanged', 'testRuns', 'holdsSettled'],
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

// The push is held only by a step taken that cannot be undone, or that still acts against a
// decision on record after the repairs (POSITIONS.md, "Reversible stops do not hold a batch."; the
// curator's comment of 2026-10-06: points to report, not stops; and of 2026-11-07, on climb batch
// 27's demo that its repair made run again: "When it was fixed, then it should land."). The points
// are read from each landed rung's last worker and its skeptic, the review, and the repairs on the
// merged tree; an entry that is not an object with a boolean holdsPush holds too. Each repair on the
// merged tree, in order, is given the points that still hold and can be undone (cannotBeUndone
// false), each by its id, and returns in holdsSettled whether it settled each, with the evidence: a
// point a landed repair settled with evidence no longer holds. One that cannot be undone, or is not
// marked false, is never dropped. A gate red after its repair stops the batch before this.
const holds = (s) => !(s && typeof s === 'object' && typeof s.holdsPush === 'boolean') || s.holdsPush
const undoable = (s) => !!(s && typeof s === 'object' && s.cannotBeUndone === false)
function holdState(landed, review, repairs) {
  const points = []
  const add = (fromOf, list) => [].concat(list === undefined || list === null ? [] : list).filter(holds)
    .forEach(s => points.push({ id: 'hold.' + (points.length + 1), from: fromOf(s), s }))
  landed.forEach(r => add(() => r.rung, [].concat((r.worker && r.worker.pointsReached) || [], (r.verdict && r.verdict.pointsReached) || [])))
  if (review) add(s => (s && s.rung) || 'review', review.pointsReached)
  for (const k of Object.keys(repairs || {})) {
    const rp = repairs[k]
    if (!rp) continue
    const given = points.filter(h => !h.settledBy && undoable(h.s))
    if (rp.landed === true && rp.stopped !== true && Array.isArray(rp.holdsSettled)) for (const a of rp.holdsSettled) {
      const h = a && a.settled === true && typeof a.evidence === 'string' && a.evidence.trim() && given.find(g => g.id === String(a.id).trim())
      if (h) { h.settledBy = k; h.settledEvidence = a.evidence.trim() }
    }
    add(() => k, rp.pointsReached)
  }
  return points
}
const holdLine = (h) => h.from + ': ' + ((h.s && h.s.point) || String(h.s)) + ((h.s && h.s.evidence) ? ' (' + h.s.evidence + ')' : '')
// The points a repair on the merged tree is given: those that hold before it and can be undone.
const settleable = (landed, review, repairs) => holdState(landed, review, repairs).filter(h => !h.settledBy && undoable(h.s))
function pushHeldBy(landed, review, repairs) {
  return holdState(landed, review, repairs).filter(h => !h.settledBy).map(holdLine)
}
const holdsSettledBy = (landed, review, repairs) => holdState(landed, review, repairs).filter(h => h.settledBy)
  .map(h => holdLine(h) + ', settled by ' + h.settledBy + ': ' + h.settledEvidence)

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
'1. Copy the gate\'s outputs into the tree: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/, and ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ' (mkdir -p its folder), the per-site list the next batch\'s rungs read as their before. Write the landed figures into explorations/coordinator/FACTS.md, numbers only, by python3 ' + TOOLS + '/record.py set N FILE (its header gives the form), FILE the entry\'s whole new line under ' + LOG_DIR + '/, one call per entry, with --by "climb batch ' + BATCH + ' commit stage" and a --note naming the lines read; the tool writes FACTS-history.md beside it, and python3 ' + TOOLS + '/record.py check --base <the commit before your edits> prints 0 failures before the commit. In F-53, from ' + GATE_DIR + '/distance.txt and checker-count.txt: every figure it gives of the last landed gate, the lines of distance.txt it cites and the batch number in its title and in the paths it cites. In F-240, in its own form, the two stages\' seconds at the last landed gate: the count stage\'s, which its table does not record, from the gate\'s log, echo $(( $(stat -c %Y ' + LOG_DIR + '/checker-count/run.txt) - $(stat -c %Y ' + LOG_DIR + '/checker-count/javac.txt) )), the stage\'s start to its last write, written "about N s" to the nearest 5 s (where F-240 names the gate\'s call times as that figure\'s source, name the file times of the gate\'s log; where the two files are gone, leave the figure and say so in your summary); the distance stage\'s from distance.txt, its #seconds line\'s total and FortressLibrary figure, the first load of its #machine line and the components its first line counts; the figures F-240 gave of the gate before, as the figures it now compares them against, with that gate\'s batch; and the batch number in its title and in the path it cites. Change no other word; a sentence the new figures make false you name in your summary for the coordinator. When a landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), Specification/fortress.pdf takes the PDF of the landed text: where the gather kept its build, ' + SPEC_PDF + ', and git diff --name-only <the gather\'s head, in its result below> HEAD -- Specification/ prints nothing, copy that file to Specification/fortress.pdf and build nothing, since it is the same text; otherwise build the PDF once, in Specification/fortress/, ./ant genSource then ./ant tex, each logged under ' + LOG_DIR + '/, and copy Specification/fortress/fortress.pdf to Specification/fortress.pdf. Then wait for step 0 with wait_for ' + MG_LOG + ', called again until it prints EXIT= (or 10 minutes have passed, which you then report), and append to ' + GATE_DIR + '/summary.txt its verdict lines, each prefixed "# microgpt-walk ": grep -h "VERDICT\\|^rc=" ' + MG_DIR + '/*.txt for the run\'s folder. A FAIL there is reported, and holds nothing. One commit, titled "' + COMMIT_TITLE + '": the summary, the two tables, ladder/, the per-site list, FACTS.md with FACTS-history.md, and the PDF; the logs under ' + LOG_DIR + '/ are never committed. When the PDF is in it, its message carries the line "historical: Specification/fortress.pdf, built from the landed text", which step 2 asks of a commit that touches a path outside explorations/ (climb batches 25 and 26 amended their commit for it).',
...besideStep(beside),
'2. Check every commit since ' + BASE + ' (git log ' + BASE + '..HEAD --format=%B): each ends with the skill\'s two footer lines, a model\'s name in its Co-Authored-By line being fine and never reported, and each whose diff touches a path outside explorations/ and .claude/ carries a historical: line. Then run git diff --name-only ' + BASE + ' HEAD -- .claude/: it should print nothing, since a batch writes no skill text (the skill writer writes the skill from ' + BATCH_DIR + '/RECORD.md after the landing). Return every path it prints in skillTouched, for the coordinator; it holds nothing.',
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
// The disk before the scatter (climb-batch-workflow.md, "The disk before the scatter"). The script
// cannot run a command, so one agent reads df -P and returns its output; the script reads the
// Available column of the line for /home/user and decides. Under the floor (DISK_FLOOR_G) the run
// stops before any rung starts: the coordinator frees disk and launches again. A launch, not a
// resume: a resume would return this reading from the journal.
// ---------------------------------------------------------------------------

const DISK_PATH = '/home/user'
const DISK_COMMAND = 'df -P ' + DISK_PATH
const DISK_SCHEMA = { type: 'object', properties: { dfOutput: { type: 'string', description: 'everything the command printed, word for word' } }, required: ['dfOutput'] }
const diskPrompt = () => 'You are the disk check of climb batch ' + BATCH + ' of the Fortress revival, which runs before any rung starts. Run this one command, alone, and nothing else: no skill, no file, no other command.\n\n    ' + DISK_COMMAND + '\n\nReturn in dfOutput everything it printed, word for word. Delete nothing and free nothing: the script reads the figure and decides.'
// The Available column, in 1024-blocks, of the line of df -P's output for the mount; null if no such line.
function dfAvailableKB(out) {
  for (const l of String(out || '').split('\n')) {
    const m = /^\S+\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+%\s+(\/\S*)\s*$/.exec(l.trim())
    if (m) return { kb: Number(m[3]), line: l.trim() }
  }
  return null
}

// ---------------------------------------------------------------------------
// The run.
// ---------------------------------------------------------------------------

{
  const floorG = DISK_FLOOR_G.perRung * RUNGS.length + DISK_FLOOR_G.mainTree
  const floorText = floorG + ' G (' + DISK_FLOOR_G.perRung + ' G for each of the ' + RUNGS.length + ' rungs and ' + DISK_FLOOR_G.mainTree + ' G for the main tree)'
  const disk = await callAgent(diskPrompt(), { label: 'disk', phase: 'Disk', schema: DISK_SCHEMA, model: OPUS, effort: 'low' }, ['Nothing is left to take over: run the one command again and return its output.'])
  const read = dfAvailableKB(disk && disk.dfOutput)
  const relaunch = ' No rung has started. Free disk by the cloud-container skill\'s machine.md, "The disk allowance", then launch the batch again with the same args: a new launch, not resumeFromRunId, which would return this reading from the journal.'
  if (!read) throw new Error('Run stopped before the scatter: the disk check of ' + DISK_PATH + ' returned no line of ' + DISK_COMMAND + ' to read (' + JSON.stringify(String((disk && disk.dfOutput) || 'nothing').slice(0, 200)) + '), and the run needs ' + floorText + ' free.' + relaunch)
  const freeG = Math.round(read.kb / 1048576 * 10) / 10
  if (read.kb < floorG * 1048576) throw new Error('Run stopped before the scatter: ' + DISK_PATH + ' has ' + freeG + ' G free, under the floor of ' + floorText + '; ' + DISK_COMMAND + ' printed "' + read.line + '".' + relaunch)
  log('The disk: ' + DISK_PATH + ' has ' + freeG + ' G free, at or above the floor of ' + floorText + ' ("' + read.line + '")')
}

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
    report.repairReview = await callAgent(head('repair on the merged tree') + mergedRepairRole(decision, 'review', redBeside ? gate.failing : undefined, settleable(approved, review, {})), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
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
  report.repairGate = await callAgent(head('repair on the merged tree') + mergedRepairRole(decision, 'gate', gate.failing, settleable(approved, review, { 'repair:review': report.repairReview })), { label: 'repair:gate', phase: 'Gate', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('gate'))
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

const mergedRepairs = { 'repair:review': report.repairReview, 'repair:gate': report.repairGate }
const heldBy = pushHeldBy(approved, review, mergedRepairs)
const holdsSettled = holdsSettledBy(approved, review, mergedRepairs)
if (holdsSettled.length) log('Settled by a repair on the merged tree, so no longer holding the push: ' + holdsSettled.join('; '))
if (heldBy.length) log('Push held: ' + heldBy.length + ' step(s) that cannot be undone or still act against a decision on record: ' + heldBy.join('; '))
const commit = await callAgent(head('commit') + commitRole(gather, gate, heldBy, beside), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
report.commit = commit
// A batch writes no skill text (skills-agenda-audit.md): a path under .claude/ that changed since the
// base is listed for the coordinator, and holds nothing.
if (commit) mergedItems.push(...numbered('skill-touched', strings(commit.skillTouched).map(p => 'The batch changed ' + p.trim() + ' (git diff --name-only ' + BASE + ' HEAD -- .claude/), though a batch writes no skill text: only the skill writer edits the skills, after the landing.')))
// The quick pair prints "VERDICT: n PASS, 0 FAIL of n -- ALL PASS" each when it passes. Anything
// else, a failing check, a run cut off or refused, is listed for the coordinator; it holds nothing.
const mgPassed = (t) => typeof t === 'string' && (t.match(/-- ALL PASS/g) || []).length >= 2 && !/-- FAILED|rc=[1-9]/.test(t)
if (commit && !mgPassed(commit.microgptWalk)) mergedItems.push(...numbered('microgpt-walk', ['The microGPT walk check on the landed tree did not show both quick programs passing: ' + ((commit.microgptWalk || '').trim() || 'no lines returned')]))
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, holdsSettled, besideGate: beside, microgptWalk: commit && commit.microgptWalk })
