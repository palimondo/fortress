<!-- A comparison, written 2026-11-10 for the curator, of the pure-Java microGPT (`explorations/java-baseline/`) with the pure-Python microGPT, the NumPy one and the APL one under dzaima/APL: every timing of those programs that the record holds, which of them compute what the flat Fortress program computes, and the four timed one after another in one session on this machine, with spread and load. His expectation was Java faster than pure Python and slower than NumPy; the first half holds by three orders of magnitude, the second does not hold at this model's size. -->

# The pure-Java microGPT beside Python, NumPy and dzaima/APL

Paths are under `explorations/` unless they say otherwise. "The flat program" is `run-c4/src/MicroGptFlat.fss`. A path marked *(history)* is not in the tree: the cleaning commits of 2026-09-30 (`1ee3b0bc54` for `apl/`, `5ded475c94` for `astra/`) removed it, and it is read by `git show $(git log -1 --diff-filter=D --format=%h -- PATH)^:PATH`.

## 1. The answer

One training step is the forward pass, the backward pass and the Adam update, for one document (batch 1), in 64-bit floats, at n_embd 16, block 16, 4 heads, 1 layer, vocabulary 27, 4,192 parameters. All five lines were measured on 2026-11-10 between 14:36 and 14:46 UTC on this machine, one program after another, with another worker's builds and runs beside them (load 1.6 to 5.4 on 4 CPUs). Section 4 gives the method and the spread.

    program                                  seconds per step   what the time includes
    pure Java (flat layout)                  0.000113           step + Adam, 16 padded positions; after 4 s of warm-up
    NumPy (flat layout, microgpt_flat.py)    0.000201           step + Adam, 16 padded positions; after 500 steps
    dzaima/APL (flat layout)                 0.0130             step + Adam, 16 padded positions; after 500 steps
    dzaima/APL (object layout, microgpt.apl) 0.0077             step + Adam, the document's own positions (mean 7.2); after 500 steps
    pure Python (Karpathy's microgpt.py)     0.132              step + Adam, the document's own positions (mean 7.3); after 20 steps

Ratios, from the medians:

- NumPy / Java = 1.8. Java is the faster one.
- dzaima flat / Java = 115; dzaima flat / NumPy = 65.
- pure Python / Java = 1,180 as each program runs. The pure Python program does less work in a step: it computes only the document's positions, 7.3 on average, where the flat programs compute 16. Per position, pure Python takes 18.2 ms and Java 0.0070 ms: 2,600 times.
- pure Python / NumPy = 660 per step as each runs; pure Python / dzaima flat = 10.

Which comparisons are of one session: all of them. The Python, NumPy and dzaima runs were interleaved in five rounds, and the Java bench ran between rounds 3 and 4. The Java number is from the Java worker's program as it stood uncommitted at 14:42; `java-baseline/REPORT.md` did not exist when this note was written, after 24 minutes of polling, so the Java worker's own timings are not compared here, and the program may have changed since (section 4, "Java").

**His expectation.** "Java faster than pure Python": holds, by three orders of magnitude. "Java slower than NumPy": does not hold at this size. Java is 1.8 times faster at batch 1, and about level at batch 4 (Java 404 µs, NumPy 414 µs for the step alone).

**The reason, by reading.** At widths of 16 the step is about 200,000 multiply-adds: the forward products are about 64,000 (three 16×16 by 16×16 for Q, K, V; 4 heads of 16×4 by 4×16 and 16×16 by 16×4; one 16×16; two between 16 and 64 wide; one to 27 wide), and each has two products in the backward pass.

- *Java* does that arithmetic and little else. 0.113 ms for 200,000 multiply-adds is about 1.8 billion a second, the rate of scalar double arithmetic on one core of this machine. Its step is bound by arithmetic.
- *NumPy* makes 190 function calls per step, counted by `cProfile`, 29 of them matrix products. On this machine a 16×16 by 16×16 product costs 0.80 µs, `x*x` on 16×16 0.33 µs, `np.sqrt` 0.46 µs, and a `mean(-1, keepdims=True)` 2.3 µs; the arithmetic inside a 16×16 product is 4,096 multiply-adds, about 1 µs of scalar work and less in BLAS. So each call pays as much for the interpreter, argument checking, dispatch and the result's allocation as for its arithmetic: 190 calls at about 1 µs is the 0.2 ms. NumPy's step is bound by the number of calls, not by the arithmetic, and BLAS has nothing to win on 16×16. The same is in the record from a third party: at this size a GPU under PyTorch loses to NumPy because launch overhead dominates 16×16 products (`apl/reference/nydhal-dyalog/README.md:193-196`).
- *Pure Python* builds a graph of scalar `Value` objects: 59,647 nodes for a document of 7 positions, about 8,300 per position, counted in the program. Each node is an object allocation, a tuple of children and a tuple of local gradients in the forward pass, then a visit in the topological sort and a loop over children in the backward pass; Adam is a Python loop over 4,192 objects. 120 ms for 60,000 nodes is 2 µs a node. Its step is bound by interpreted bytecode and allocation per scalar operation.
- *dzaima/APL* interprets a tree in Java. Its matrix product in these programs is a dfn, `mm←{↑(↓⍺)∘.{+/⍺×⍵}↓⍉⍵}`, which calls an interpreted function once per element of the result: about 4,000 calls in the forward pass and twice that in the backward. Its step is bound by interpreted calls per element, which is why it sits between pure Python (interpreted per scalar operation) and NumPy (interpreted per array operation).

His expectation is the usual result for larger arrays, where the BLAS kernel outruns a plain Java loop. This model is below that size. In this session NumPy's step alone went from 0.17–0.24 ms at batch 1 to 0.41 ms at batch 4, 1.41 ms at batch 16 and 2.66 ms at batch 32, about 83 µs a document at batch 32; Java's went from 0.101 ms at batch 1 to 0.404 ms at batch 4, 101 µs a document. So NumPy passes Java somewhere above batch 4, by a small factor. These batch timings were taken under load 3.5 to 4.7, with OpenBLAS's thread count left at its default, and the Java bench has no batch above 4, so the crossing is not measured.

## 2. The record

Every measurement of a Python, NumPy or dzaima/APL microGPT that the record holds:

| # | date | program | configuration | number | includes | machine | where |
|---|---|---|---|---|---|---|---|
| 1 | 2026-08-23 | pure Python: Karpathy's `microgpt.py`, assembled from the blog post, `random.seed(42)` added | n_embd 16, block 16, 4 heads, 1 layer, vocabulary 27, 4,192 parameters, 1,000 steps | 120.3 s, "≈ 0.12 s/step" | the whole process: loading and shuffling 32,033 names, 1,000 steps, 20 samples | this container then: CPython 3.11.15, 4-core Xeon @ 2.10 GHz | `microgpt-port.md:134-149`; `process-records/01-microgpt-port.md:25` |
| 2 | 2026-08-24 | pure Python, the "nano twin" of the first Fortress port | n_embd 8, block 8, 2 heads, 2,000 documents, 250 steps | 22 ms/step | not stated | not stated (the same exploration) | `microgpt-port.md:233`; `microgpt-native-brief.md:48`, `:163` |
| 3 | 2026-09-14 | NumPy: `microgpt_flat.py`, unmodified, `check=5 steps=1000` | the flat program's configuration, batch 1, float64 | "5 steps x 1: 0.40 ms/step, 2506 names/s" | step + Adam, the mean of the first five steps of a fresh process, the first cold step among them | Python 3.11.15, NumPy 2.4.6; machine not stated | `experiment/run-c-goldens/goldens.json`, `batch1_five_steps.printed_by_unmodified_script`; `experiment/run-c-goldens/README.md` |
| 4 | before 2026-09-14 | NumPy: `microgpt_flat.py` at fp32, and "the autograd numpy rung" (`microgpt_np2.py`) | batch size not stated (the usage line shows `batch=32`) | 16–19 thousand names/s flat, 7–11 thousand autograd, "in the same session" | not stated | a session outside this repository | `apl/reference/hsu-flat/HANDOVER-HSU.md:43` |
| 5 | before 2026-09-13 | dzaima/APL: `microgpt.apl`, the object layout | n_embd 16, block 16, 4 heads, 1,000 steps, each document's own positions | "1000 steps in ~13 s on one vCPU" | the whole process, it seems; not stated | a session outside this repository | `apl/reference/dzaima/README.md:10`; `apl/reference/HANDOVER-APL.md:26` |
| 6 | before 2026-09-14 | dzaima/APL: `microgpt_flat.apl`, the flat layout | the flat program's configuration, batch 1 and batch 16 | 12 ms/step at batch 1, 190 ms/step at batch 16 | not stated | a session outside this repository | `apl/reference/hsu-flat/HANDOVER-HSU.md:41`; `apl/reference/hsu-flat/README.md:69` |

What the record does not hold: any timing in `training-dynamics.md` or `prng-findings.md` (they report losses, not times); any timing of Dyalog APL (the Dyalog programs were never run here); any NumPy timing taken in the same session as a Fortress or a pure-Python one. Three statements in the record are ratios derived from rows 1 and 2, not measurements: walk "about a thousand times slower than Karpathy's pure-Python microGPT" (`performance-roadmap.md:11`), "two to three orders of magnitude slower than CPython" (`run-b/article.md:252`), and the roadmap's target "within 2x of pure CPython on one core" (`performance-roadmap.md:114`). The curator's profile takes microGPT's baseline to be CPython or NumPy (`coordinator/curator-profile/PROFILE.md:47`).

**Which sources exist.**

- In the tree today: none of the Python or APL model programs. The tree keeps their notes, the weights and document order they share (`apl/reference/dzaima/w/`, `apl/reference/dzaima/docs.txt`), `names.txt`, and the goldens made from the NumPy one.
- In the repository's history, and so recoverable:
  - `apl/reference/hsu-flat/microgpt_flat.py` *(history)*, the NumPy program, 141 lines, sha256 `c57d651b…f0c`, the hash that the goldens' README records.
  - `astra/worker/reference/microgpt.upstream.py` *(history)*, Karpathy's `microgpt.py` unmodified, 199 lines, sha256 `d47d88c2…ccee`, imported with Astra's experiment tree on 2026-09-08 (`81c1687790`).
  - `apl/reference/hsu-flat/microgpt_flat.apl` and `apl/reference/dzaima/microgpt.apl` *(history)*, the two dzaima/APL programs.
- Only in a session's scratch, and gone: the assembled `microgpt.py` of row 1 (never committed, the blog code's licence being unstated, `microgpt-port.md:136-138`); the nano twin `microgpt_nano.py` of row 2 and its instrumented copy `microgpt_nano_val.py` (`training-dynamics.md:10`, `:363`); `microgpt_np2.py`, the autograd NumPy rung of row 4, and `microgpt_oracle.py` (`apl/reference/HANDOVER-APL.md:15`), which came from sessions outside this repository and were never in it.
- dzaima/APL itself was never in the repository. Its notes give the clone command (`apl/reference/dzaima/README.md:18`).

## 3. Comparability with the flat program

The flat program (`run-c4/src/MicroGptFlat.fss:17-18`, `:52-73`, `:76-83`): n_embd 16, block 16, 4 heads of 4, vocabulary 27, rmsnorm ε 1e-5, Adam with lr 0.01 decaying linearly over 1,000 steps, β1 0.85, β2 0.99, ε 1e-8. Its step takes a batch of document keys, pads each document to 16 positions, runs all 16 through the forward and the hand-written backward pass as matrix products, and multiplies the padded positions out of the loss. Its run is five steps at batch 1.

| program | same function and optimizer? | what differs |
|---|---|---|
| `microgpt_flat.py` (NumPy) | Yes, and the same layout line for line: it is the oracle of the flat program's goldens, which agree to 1e-12 (`run-c4/design.md:47`). A time per step compares directly. | Its training loop draws its own initial parameters (the same values as the files under `dzaima/w/`, checked by the goldens' driver) and takes documents from all 31,733 training names, not the first 2,000. Neither changes the work in a step. |
| the pure-Java program | By its design a port of the flat program; its 40-check run passed in this session on the state timed here. Not otherwise examined in this note. | Its bench's `train5` repeats steps 1 to 5 from the initial parameters; the others run on through later steps. The work per step is the same. |
| `microgpt_flat.apl` (dzaima) | Yes: the same flat vector, corpus matrix, padded step and Adam; five losses equal to the oracle's to the 15 digits it prints. | Attention is a list of documents of lists of heads paired with `¨`, not a rank-3 block; the matrix product is a dfn per element. |
| `microgpt.apl` (dzaima, object layout) | The same function, optimizer and losses. | Nine matrices in a namespace, Adam per matrix, and each document's own positions (1 + its length, 7.2 on average), not 16. A step does less than half the work of a flat step. |
| `microgpt.py` (pure Python) | The same function and the same Adam: its first five losses are `3.3659669475848504 3.4242727838717717 3.177802125458052 3.066355684224198 3.220883089750623`, the flat programs' to 15 digits. | Scalar reverse-mode autograd over a graph of `Value` objects, where the others have a hand-written backward pass in matrices; one position at a time with a growing key-value cache, where the others take all positions with a causal mask; each document's own positions, not 16; Adam as a loop over 4,192 scalars. So it differs in method and in the work per step, not in what it computes. |

The nano twin of row 2 is another configuration (width 8, block 8, 2 heads), about a fifth of the work, and compares with nothing here.

## 4. The measurement

**Machine.** 4 CPUs, Intel Xeon @ 2.30 GHz, 2,300 MHz; 15 GB; the cloud container, 7 hours up. CPython 3.11.18; NumPy 2.4.6, already installed, with its bundled OpenBLAS 0.3.31 and no thread setting; OpenJDK 25.0.4.1. Another worker built and ran Java and Fortress throughout, so no run had the machine to itself, against `records.md`, "Timings and citations". The rounds and the Java bench ran at normal priority.

**Sources.** The four Python and APL programs were written from history into a scratch folder, unmodified; nothing was restored into the tree. dzaima/APL was cloned from `https://github.com/dzaima/APL` (its last commit, `5eb0a420`, of 2021-10-17) and built by its own `build` script with the JDK's `javac`. `input.txt` was a copy of `names.txt` (sha256 `0a30b555…cc4d`, the hash in the goldens).

**The rounds.** Five rounds, each running in turn the NumPy program, the pure Python one, the flat APL one and the object-layout APL one. Every program printed first losses equal to the oracle's.

- *NumPy.* A driver executes `microgpt_flat.py` up to its self-test section, as `experiment/run-c-goldens/make_goldens.py` does, then runs the script's own loop body with `time.perf_counter` around the step and the three Adam lines: 5,500 steps at batch 1, the first 500 dropped.
- *Pure Python.* A driver executes `microgpt.upstream.py` with a timer around the body of its training loop and its sampling cut: 320 steps, the first 20 dropped. CPython has no compiler to warm up; the first step was not slower than the rest.
- *dzaima/APL.* The program with its loop returning `⎕MILLIS` beside each loss, the one changed line: 2,000 steps, the first 500 dropped. The clock has a resolution of 1 ms, so the figure is the span divided by 1,500, and its spread is over windows of 100 steps. The first 100 steps ran at 15 to 17 ms a step in the flat program.

    program          rounds   per-round value: min, median, max      within a round                              load, 1-minute, over the rounds
    NumPy            5        median 0.1988, 0.2012, 0.2044 ms       p05 0.195, p25 0.198, p75 0.225, p95 0.29   1.6 to 5.4
                              mean   0.2103, 0.2176, 0.2293 ms       step without Adam: median 0.170 ms
    pure Python      5        mean 128.1, 132.5, 137.6 ms            median 122, p05 76, p95 205 (document length) 1.6 to 5.2
                              per position 17.6, 18.2, 18.9 ms       7.27 positions a step on average
    dzaima flat      5        mean 12.63, 12.98, 13.16 ms            100-step windows 12.1 to 14.3 ms            2.0 to 5.3
    dzaima object    5        mean 7.57, 7.72, 7.83 ms               100-step windows 7.1 to 8.8 ms              3.0 to 5.4

The pure Python step grows faster than its positions: the median was 103 ms at 6 positions, 121 at 7, 146 at 8, 162 at 9, 191 at 10 and 234 at 11 (330, 465, 350, 140, 70 and 30 steps). No step of the 1,500 had 16 positions. A step of 16 positions would take about 285 ms by the mean per position and about 360 ms by a fit of `a n + b n²`; neither is a measurement.

**Java.** `java-baseline/run.sh bench 5 5` at 14:42, between rounds 3 and 4, with its classes under a scratch folder (`JAVA_BASELINE_OUT`), load 1.60 before and 3.38 after. Each fork is a fresh JVM that warms up for 4 s and takes 30 samples of 20 ms of each workload:

    train5 us/call, the five forks' medians:  562.31  541.30  583.35  555.85  569.33    (quartiles within a fork 529 to 607; max 962)
    step1  us/call, the five forks' medians:  100.91   98.05  103.33  100.11  101.65
    step4  us/call, the five forks' medians:  404.14  391.24  410.29  399.91  408.27

`train5` is five steps with Adam, so one training step is its fifth: 0.108 to 0.117 ms over the forks, median 0.1125 ms. `step1` is the step without Adam, 0.101 ms, against NumPy's 0.170 ms. The same run gave the cold figures: the five-step process 158 ms of wall time (median of 5), its fifth step 1.7 ms. The script was the worker's uncommitted state of that minute; the worker edited it while it ran, and its last lines failed with a syntax error after the bench section had printed. `Bench.java` and `run.sh` changed again after the run. When `REPORT.md` lands, its bench should be compared with the figures above before either is quoted alone.

**Against the record.** The pure Python mean, 0.13 s, agrees with row 1's 0.12 s, taken in another session on another CPU model. NumPy's 0.20 ms is half of row 3's 0.40 ms, which averaged a cold first step into five. dzaima's flat 13.0 ms agrees with row 6's 12 ms; its object layout's 7.7 ms a step warm is below row 5's 13 ms, which was a whole process. These agreements are across sessions and prove nothing by F-12; they say only that today's figures are of the order the record expects.

## 5. For the report

**Decisions.**

1. *The sources were run from history, in scratch.* The brief asked for the Python programs "in the tree"; none is. The alternative was to report that and time nothing. The record's history holds each source byte for byte, the cleaning commit's message says a removed path is read from history, and the NumPy file's hash is the one the goldens record.
2. *Java was timed from the worker's uncommitted program.* `REPORT.md` had not appeared after 24 minutes of polling, 4 more than the brief allowed. The alternative was no Java line. The figure is marked as of that state.
3. *dzaima/APL was fetched from GitHub and built in scratch*, as the coordinator's addition asked.
4. *No NumPy model was written.* The record held one.

**A refusal to report.** Before the history copy of `microgpt.upstream.py` was found, Karpathy's gist was downloaded to scratch, and the automatic permission check refused to run it as code from outside. It was not run and was deleted. The history copy has the same sha256 as that download, so the program timed is the repository's own file, imported on 2026-09-08.

**For FACTS.** One candidate, to be taken only after the Java worker's report confirms the Java figure: at microGPT's size (width 16, batch 1), one training step took 0.11 ms in pure Java, 0.20 ms in NumPy, 13 ms under dzaima/APL and 132 ms in pure Python (at 7.3 positions against 16), in one session; NumPy's step is bound by its 190 calls, not by arithmetic. What it means for the work: a compiled Fortress step is measured against 0.1 to 0.2 ms, not against the 0.12 s of pure Python that the roadmap's target names (`performance-roadmap.md:114`). No test checks it; the commands are in section 4. Detail: this note, sections 1 and 4.

**Commands worked out.**

- `git log --all --diff-filter=A --name-only --format= -- 'explorations/**/*.py'` lists every Python file the history ever held under `explorations/`.
- `java -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -jar APL.jar -f FILE.apl`, with `LANG=C.UTF-8`, from a folder holding `w/`, `docs.txt` and `nsteps.txt` (`<steps> <schedule length> <batch>` for the flat program, `<steps> <schedule length>` for the other), runs a dzaima/APL microGPT; `⎕MILLIS` is its clock, in milliseconds since the interpreter started.

**Questions for the curator.** None. One point for whoever reads the Java report: the pure Python baseline of the roadmap is 1,200 times slower than the Java one, so "within 2x of pure CPython" and "near Java" are targets three orders of magnitude apart.
