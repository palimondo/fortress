# Check of `roadmap.md`

A fresh reader checked the roadmap against its sources on 2026-11-20, at `main` `7884530e10`. I built nothing, ran no program and changed no tracked file. Entries were printed with `facts-extract.sh`, queue items with `grep`, and web sources were read in `C-jvm-state.md` and in the saved pages under `web/`. Paths are under `explorations/` unless they start with `Library/`, `ProjectFortress/`, `Specification/` or `web/`.

## 1. Changes made in the roadmap

Each change has one reason. None changes a design or a proposal.

**Section 1, for the curator**
- The baseline is now "without the Adam update (F-355, measured once, in 10 fresh JVMs)". Reason: F-355 gives 0.10 ms without Adam and 0.113 ms with it, measured once.
- Added a sentence: a target is a goal set from the evidence named after it, and none was measured in Fortress. Reason: the line "'Estimate' marks a figure that nobody measured" made the unmarked targets (2 times, parity) read as measurements.
- Before stage 1: added "in a Java model", "measured once" and "on the products". Reason: F-356 is a Java model measured once, and F-11's 6.3 and 6.5 times are for the dot and matrix products (the row lift is 2.6).
- Stage 1: added "at one thread" and "a floor, since the model's leaves are plain Java loops". Split the item into short sentences, and defined store and transaction check. Reason: F-356 gives 1.4 times at one thread, and calls its times a floor.
- Stage 2: defined kernel, and wrote "of the Java step". Reason: the term was undefined, and the 65 % is of the Java step (JB §5).
- Stage 3: added "in Java (JB §5, one session, 5 fresh JVMs)". Reason: the brief asks how often each measurement was taken.
- Stage 4: now "roughly 100 µs, within a factor of ten (C §6 S2)", with S1 dropped from that citation. Reason: Lea's guidance gives the threshold with that condition (`web/dl_guidance.txt`), and S1 counts basic steps, not µs.
- Stage 5: added "in two runs", and "the gain would come from twice the lanes (an inference, C §3)". Reason: AW §6 has two runs, and C marks the gain [I]. C §1 S3 and S8 give only the lane counts.
- Stage 6, and items 3, 4, 7 and 8: defined value classes, the primer, which grains, incubator module and a sum's tree. Reason: these terms were undefined for a reader who is new to compilers.
- Item 2: decision A is now in P-85's words, and P-85's three questions are named. Reason: "how the factory picks the store" is the wording of P-85's first question, and P-85 says that the three questions are "apart from decisions A, B and D".
- Item 10: "at least 15 model lines", where the text had "about 15". Reason: the 15 are a grep for `RR64`. By reading, M:18's hyperparameters are an untyped binding and so `RR64` by default (`revival-changes.md`, "Numbers"), `SQRT (1.0 headDim)` at M:54 and M:61 is an `RR64`, and nothing converts into `RR32` (F-139). AW §6 counts the numeral lines apart.
- "Left out":
  - Defined Graal, Truffle, `Float16Vector`, Agrona, `Unsafe` and off-heap memory.
  - `Float16Vector`'s arrival in JDK 28 is now marked as an inference. Reason: C §1 marks it [I], from the merge date.
  - Agrona now "uses the JDK's internal `Unsafe`, which needs a module opened at every run". Reason: Agrona's build opens `java.base/jdk.internal.misc` (`web/gh/build.gradle.txt:211`). JEP 471 deprecates the public `sun.misc.Unsafe`'s memory access, which Agrona's buffers do not use.

**Section 2**
- Added the source of his quoted words: his request of 15:3x UTC on 2026-11-20, which the record holds only as the boot note's summary. Reason: the quotations cited no source. See section 2 below.

**Stage 1 (section 4)**
- Store access mode: the line now reads "PF §5 finds opaque mode enough, and warns that plain mode may tear a `double` (JLS 17.7)". Reason: PF §5 (`reviews/parallelism-foundations-2026-11-08.md:249`) does not find plain mode enough. The design's "plain or opaque" is kept.
- A1: added "on a probe's own one-method trait, not on the library's arrays (F-159)". Reason: that is F-159's condition.
- Decision A's heading and "Waits on": P-85's wording, and its three questions. Reason: as for item 2.
- Grains: "The record's default is the first compiled kernel" is now this: Q523 has nothing landed, the plan review recommends the first compiled kernel, and Q500's default keeps 16. Reason: Q523 has no default, only a recommendation.
- Risks: FA:23-30 is now FA:15-17 and :25-32. Reason: `tabulate` is at :16-17, and `exp` and `log` are at :31-32.
- Risks: F-301 and F-302 are now "each observed once, while the number types were traits". Reason: that is the condition of both entries, and neither has been measured since P-178.

**Stage 2 (section 5)**
- `Matrix.mul` is at `FortressLibrary.fss:3129-3187`, where the text had 3129-3183. Reason: the method ends at :3187, as F-356 says.
- Walk's side: the citation P-58 is now "P-169's device, which bends P-58's walk half for the names that P-169 lists". Reason: P-58 has walk load the named helper itself. See section 3, point 2.
- "The model's product forwards to `mul`" now cites `FortressLibrary.fss:3271-3273`, the matrix juxtaposition, in place of FA:33-35. Reason: FA:33-35 is the comment on `Diag`.
- Packing: the copy "measured the same, within noise, in one fork". Reason: JB §3, decision 4.

**Stage 3 (section 6)**
- `reduction.tex:43-46` is now marked as said of the reduction variables, which are unbuilt. I added the generators chapter's traversal for a commutative monoid (`defining-generators.tex:384-388`). Reason: the cited sentence is about reduction variables, as B Q4 notes.
- The quotation is now "may even vary over time". Reason: that is the FloatVector javadoc's wording (`web/fv.txt`).
- `exp`'s last bits: "may change (estimate; M1 measures it)". Reason: the roadmap's own list of relaxed items calls this an estimate.
- FA:23-30 is now FA:25-32. Reason: `exp` and `log` are at :31-32.
- The claim that JB §5's reordered variant passed every check is now split. JB §5 reordered only the forward products' sums, and JB §6's variant at grain 4 split every sum of 16. Both passed. Reason: JB §5's variant does not reorder the sums of `rmsn` and `sm`.

**Stage 4 (section 7)**
- "One step on one core can't fall far below 75 µs" is now an estimate, with M1's rung (b) as its measure. Reason: JB §5 lists vectors in the other loops and `exp` in vectors as not measured.
- llama2.java: at 8 threads, its gap to llama2.c, which forks with OpenMP, is largest on its smallest model (0.35 times), and the source gives no cause. Reason: llama2.java itself gains from threads (237 to 438 tokens/s, `web/gh/mukel_llama2.java.md`), so "loses most" was relative to llama2.c.
- Slice size: "the rough 100 µs where a parallel stream pays". Reason: as for section 1, stage 4.

**Stage 5 (section 8)**
- The 2.5e-4 is now "up to about 2.5e-4 ... by the standard worst-case bound". I added the one `float` dot product that was measured, at 4e-6. Reason: AW §6 calls it "my reading of the standard bound".
- Added "in two runs", and "(B Q4, by reading)". Reason: those are the sources' own conditions.
- `FortressBuiltin.fsi:41-90` is now :41-121, and "no row holds this" is now row 1092. Reason: `RR32`'s declaration ends at :121, and row 1092 was filed in `8f6b20ca62`.
- Model lines: added the lines that meet `RR32` through untyped numerals (M:18, :54, :61, by reading). Reason: as for item 10.
- Size: "5 to 7 rungs" is now "5 or 6". Reason: its own parts add up to 5 or 6.

**Stage 6 (section 9)**
- `Float16Vector` in JDK 28 is now marked "by inference". Reason: C §1 marks it [I].
- Size: "6 to 10 rungs" is now "5 to 8". Reason: its own parts add up to 5 to 8.

**Stage M (section 10)**
- Agrona's `Unsafe` is now the JDK's internal one. Reason: as for "Left out".

**Section 11**
- M1: rung (c) is now "expected to" keep the checks (estimate). Reason: no run with FMA has been checked.
- M5: F-352's scratch tree is gone, and it is rebuilt from `compile-ladder/plan-31/probes/switch-rehearsal.patch`, against `832f7d0d91`. Reason: no worktree holds it now.

**Section 12**
- Q229 and Q230 now come "before the switch-over, by P-85". Reason: P-85 says "The whole preparation for the array work is to be done before the switch-over". The text had put them at stage 1.
- "Two rows to file" is now one row: `mul`'s grain. Reason: row 1092 holds `RR32`'s missing `exp` and `log`. The ledger has no row on the grain.

## 2. Points for the coordinator to settle before the curator reads it

1. **His quoted words.** Seven phrases in quotation marks are in neither `handover.md` nor any entry: "Fast GEMM, but no external BLAS", "Vectorized operation (SIMD multiplications)", "microGPT trained in batches, on multiple cores", "Float instead of double as the last performance gain", "As far as possible on JVM 25, then Valhalla", "relaxed numerical precision, like when LLMs are trained on GPU clusters", and "LMAX Disruptor and Agrona with custom memory management, if that proves a bottleneck". The boot note (`coordinator/BOOT.md:5`) gives a summary that covers all but the last. The handover names the Disruptor and Agrona only in its "set aside" table. Check each phrase word for word against his message of 15:3x UTC on 11-20. He will hear them read back as his.
2. **Phase 5's array design.** P-33 puts "the array design" in phase 5. PLAN.md:110 puts there P-85's questions, decision A and the width. Q320's "Needed by" is "before microGPT compiles". Section 3 of the roadmap gives phases 4 and 5 as "the switch-over, decision D and the code generator's gaps", without the array design. Stage 1 then decides A and builds the store after microGPT runs, and section 12 lists the width's move but not A's. There are two ways to settle it:
   - Stage 1's store and decision A are phase 5's work. Then section 3 and stage 1 say so.
   - The roadmap moves them out of phase 5. That reads P-33's phase order anew, so it is consequential and goes to him.
3. **Where stage 3's sum kernel goes.** The range's leaf, `generate[\T\](red, body: ZZ32->T)` (`Library/RangeInternals.fss:1365`), sees a range and a body function, not arrays. So it cannot tell that "its operands are unboxed stores". The two arrays are known at `Vector.dot` (`Library/FortressLibrary.fss:2803-2804`, reached by `DOT` at :2873-2874) and in an array's own generator. This is a design finding: the writer should name the place.
4. **Stage 5's "5e inside the library's kernels, out of the model's sight".** Two readings, and neither fits the text:
   - A kernel that sums `RR32` data in `double` and rounds once breaks the specification's rounding of each `RR32` `+` (`opr-overview.tex:212`). That is the objection that the roadmap raises against its "sixth way".
   - AW §6's 5e is a set of library declarations, such as a `DOT` of two `RR32` vectors that answers `RR64`. Then the model's types see it: the loss line M:56 is a `DOT`.

   The roadmap should say which reading it proposes. The gradient sum across slices is in stage 4's own library function, so its type can be `RR64` without either problem.
5. **Graal is left out "by P-7".** P-7 asks for JVM bytecode, and GraalVM's compiler runs the same bytecode, so P-7 does not exclude it. The record has no decision on Graal (A §10). C §10 gives reasons from evidence: GraalVM left Java's release train, and its Vector API support is "partial". Give those reasons, or mark leaving Graal out as the roadmap's own choice. Truffle, LLVM and a GPU are rightly outside P-7 and the plan review's Route 5.
6. **Targets and estimates, against their grounds.**
   - Stage 2's parity does not follow from "the products are 65 % of the step". Say the products reach Java's scalar speed and the rest stays at stage 1's 2 times. Then the step is about 65 + 2 × 35 = 135 µs, 1.35 times (my inference). Parity also needs the other operations near Java's speed, and the roadmap should say what brings them there.
   - Stage 4's target, "at least 3 times stage 3's" on 4 threads, means 25 µs or less. Section 1's estimate is 25 to 35 µs, which mostly misses that target. Say which of the two the curator reads.
   - Stage 4's "3 times" and stage 5's "within 1.5 times of rung (g)" state no ground.
   - The 100 to 500 times before stage 1 multiplies two factors from Java models. The only Fortress figure is F-358's: about 100 times, from one run. It is marked as an estimate, which is right.
7. **The order.** No stage needs a result from a later stage. Two "Waits on" lines state a preference, not a dependency:
   - Stage 4's library function and its fix of the analyzer need nothing from stages 2 and 3. Only the size of a slice does.
   - Stage 6's frames and class-file version need nothing from stage 5.

   TW §6 says Way 2 can land before the switch-over, and the roadmap puts it after phases 4 and 5. PLAN's primer comes first, so that order holds.
8. **Stage 6's precondition on frames.** B says that "the loader's rewriting keeps no stack-map frames", as `fortress-repo`'s `compiler.md:72` does. But the loader's expansion of a template writes with ASM's `COMPUTE_FRAMES` (`runtimeSystem/InstantiatingClassloader.java:479`, in `readAndExpandGenericThing`), and so do its other class writers (:585, :1040, :1117 and others). So why the version stays at 1.6 needs a probe before stage 6's "frames and version, 2 to 4 rungs" is sized. If `compiler.md:72` is wrong, it is a fix of the skill.
9. **The analyzer (stage 4).** Row 987 says: "Open: whether the analyzer is repaired before the switch-over; the curator's". Q501 waits on him too. Section 1's list of his decisions has no item for the analyzer. PLAN.md:132 puts the fix in the first batch after the switch-over. Add it to the list, or say why it needs no decision of his.
10. **"D1".** The roadmap uses D1 for Q509, the parallelism review's question. Q37 uses D1 for decision D's first way, the re-based diff. He may read "D1" as decision D. Name it in words in section 1: "the store and transactions".
11. **The page.** Section 1 keeps its citations inside the items, and Speak would read "(C §9 S5, S6)" aloud. The coordinator skill's page rules put references at the bottom of each section. Move them when the page is built.

## 3. Points that would change a decision of the curator's

1. **P-7, "the optimal result, the one to aim at".** P-7 ends: "A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at". Its history gives his words of 2026-09-16T22:43:26Z. The roadmap keeps the scalar program as the base of the ratio, Q524's landed default, which "Not a decision of his" marks. It sets the targets of stages 3 to 5 below that base: 75 µs a step, then 25 to 35 and 15 to 25 µs a document. So the scalar program is no longer the one to aim at. Section 1, item 1, section 11 ("M1 and Q524") and section 12, item 5 read P-7 anew, and none is marked consequential. His request of 15:3x asks for SIMD, batches and `float`, as the boot note records. That is his new word, but no entry holds it. Whichever way Q524 goes, P-7's last sentence changes. Give it to him with P-7's words.
2. **P-58's walk half, for the new kernels.** Stage 2 has walk's loader answer each kernel's name with walk's own operation, and stages 3 and 5 add more kernels the same way. P-58 has walk load the named helper. Its history (2026-11-07) bends that half only "for the runtime's own operations": P-167's two names and the bindings that P-169 lists. P-167's reason is that those are "the runtime's own operations, not calls into Java helpers". A product, sum or `exp` kernel is a call into a Java helper. So extending the bend reads P-58 and P-169 anew, and it is not marked. One other way stays inside P-58: walk's `double[]` store becomes the helper's own class, and walk then loads the helper itself.
3. **P-9, C4 as the target form of the APL program.** Stage 5 keeps the APL program in `RR64` under walk, citing P-10, while C4 moves to `RR32`. P-9 says: "the APL program is written so that each of its lines expands into the line that C4 writes by hand". That is his, of 2026-09-19T17:01:32Z, in P-9's history. With two widths, the APL lines no longer expand into C4's lines. P-10 keeps the APL program in the walk check and says nothing of its width. Give it to him inside the width decision (Q37, fork 4).

## 4. Checked and holding, one line each

- These decisions are read as written: P-17, P-84 (his "HPC" words of 2026-11-08 are in its history), P-85 (after the fix in section 1), P-87 (the model diffs in stages 4 and 5 are marked), P-29 (stage 4 comes after microGPT runs compiled), P-175 ("forking constants" is his), P-159, P-26 (way 5d), P-27, P-178, P-172 and P-173.
- These queue items are read as written:
  - Q320 is a lean, and the roadmap marks its A1 proposal as bending it.
  - Q524's scalar baseline was landed and is "Not a decision of his".
  - Q37, fork 4: the width was placed there by the coordinator, and his question on it is owed an answer.
  - Q509, Q500, Q22, Q205, Q229, Q230, Q362, Q501 and Q510.
  - His premise on 32 bits is in P-85's history (2026-09-25T23:29:15Z).
- These ledger rows hold: 18, 37, 305, 306, 641 (64 % at 7 checks an element, and TW says Way 2 clears all 7), 948, 953, 982 and 987.
- The figures in JB §§3 to 6 hold: 101.4 and 75.5 µs, the products at 65 %, 407 µs at batch 4, 1.4, 2.5 and 4.8 times, 128 by 128, Adam's 10.8 µs and 1.8 to 3 times.
- These line citations hold: the model and vocabulary lines, `RangeInternals.fss:20`, :1326 and :1365-1385, `CompilerLibrary.fss:482-518`, `arrayOps.java:34-36`, `build.xml:138`, `bin/fortress:28-32`, `InstantiatingClassloader.java:78`, `FortressLibrary.fsi:373-374`, `MicroGptFlatCheck.fss:16-18` and the specification's lines.
- These web sources hold against the saved pages:
  - JEP 508, JEP 537 (twelfth incubator, no change to the API) and JEP 11 (`--add-modules`, the warning at run time, the rename).
  - JEP 401 (64 bits with the null flag, no size limit on scalarization, abstract value classes).
  - JDK 28's general availability on 2027-03-09.
  - The javadocs of `DoubleStream` and `ForkJoinTask`.
  - The eme blogs on aliasing in JDK 26 and on float reductions, and the panama-dev post on HotSpot not fusing.
  - JVBench's 134.69 to 941.49 times, the cuBLAS and PyTorch pages, and the panama-dev array, segment and `Unsafe` timings.
