<!-- What Pavol, the curator, knows and where his gaps are, by area and by date, drawn from his messages of 2026-08-18 to 2026-10-16 and his public work, for the coordinating session to read before it explains something to him or puts a question to him. -->

# What Pavol knows: a profile for the coordinator

Built on 2026-10-16 from `evidence.md` (997 entries into his 1,946 messages) and `public-work.md`, both beside this file, with the indexed messages read in full. Section 4 is the checklist; the rest is its ground.

- Times are UTC, in 2026, written month-day hour:minute. `python3 -I explorations/coordinator/curator-profile/show.py 2026-09-15T09:49` prints his messages of that minute.
- "Knows" means a message shows it, not that it is deep.
- `POSITIONS.md`, "History he knows (do not re-explain)", holds what he knows of the project's history. This file doesn't repeat it.

## 1. Who he is, in short

1. A software engineer, not a language researcher, with a master's degree from the Technical University of Košice (2004). He works in Central European time, at times late into the night.
2. He calls the revival his hobby: spare-time learning about Fortress and agentic coding, begun as a test of the claim that coding is solved. He says the intelligence in the work is the model's and that he directs it without deep expertise. He took on microGPT partly to learn how language models and their mathematics work.
3. He came to Fortress through Steele's 2016 talks; "Four Solutions" is the one he remembers most. His first plan, complex numbers in Fortress after a chat ported his Mandelbrot toy program, ended when the compiler proved unfinished. He calls that program Scala once and Swift once.
4. In his words: Scala 2.8 at a startup, a language he loves; Swift, where he worked extensively on the benchmark suite.
5. Stack Overflow (`palimondo`): 45 answers, mostly 2011 to 2014 and mostly iOS and Objective-C. Scala shows as three learner's questions and one answer (2009, 2010), his highest-voted. From 2010 he asks what a feature costs.
6. Swift, 2017 to 2020: about 88 merged pull requests to the benchmark suite: Python tooling with unit tests (`BenchmarkDriver`, `BenchmarkDoctor`), the driver's sampling, and measurement statistics: quantiles, the interquartile outlier fence, run times with several modes, how many independent samples make a change believable. None that the search found touches the compiler's C++, type checker or optimizer. On the forums he wrote about benchmarks and the design of `Sequence` and `Collection`.
7. `MandelbrotSwifty` (2017, 2018) measures what generator-style iteration costs against a loop, the question that Fortress's generators and big operators raise. His only recent public code (2026) is Python written with Claude Code.
8. Relayed, not verified (a Claude chat's memory summary he pasted): over 20 years in software, now a product owner and technical contractor.
9. He writes English by dictation, and speaks Slovak around him.

Evidence, by point:

1. 10-13 00:56; 09-29 09:19; 10-13 01:40
2. 08-23 19:13; 09-29 09:34; 10-12 22:01; 10-16 12:48
3. 10-13 00:46; 08-23 19:13; 09-19 06:54
4. 08-21 15:19
5. `public-work.md`, section 1
6. `public-work.md`, sections 2 and 3
7. `public-work.md`, section 4
8. 10-12 21:49
9. 09-29 15:18

## 2. By area

### 2.1 Programming languages and tools

**Knows.**

1. Scala as a user: traits, value classes, `_` for an anonymous argument, its back ends. Unsure on 08-21 whether scalac is self-hosted; by 10-16 he takes it as self-hosted.
2. Swift as a writer of library and benchmark code: value types first, trapping against wrapping arithmetic, mangled names, lit tests, debug against optimized builds. He reasons from Swift more than from any other language.
3. Java and the JVM as a user: erased generics, one class per file, source and target levels.
4. Peers by name and main idea: Rust's monomorphization, Julia's specialization, Kotlin, Clojure, C++ templates. He asks what they do and doesn't claim their insides.
5. Python, and the vocabulary of statistics: median, quartiles, outliers.

**Said he doesn't know.**

6. APL: "nothing" on 09-11, still not learned on 09-15. Open; the side quest is closed (P-10).
7. Clojure's multimethods; Swift's names for unique references and copy-on-write (09-08).
8. He says he understands neither APL nor the Fortress code the agents wrote for it (09-15).

Evidence, by point:

1. 08-21 15:40; 09-15 08:03; 10-16 07:20
2. 08-23 19:32; 09-08 22:27; 09-17 11:55; 09-22 07:17
3. 08-21 17:18; 08-21 22:58; 09-08 20:08
4. 08-23 19:22; 09-08 21:37; 09-20 14:48; 09-22 07:17
5. 08-24 21:04; 10-12 16:42
6. 09-11 06:42; 09-15 07:28
7. 09-08 21:51; 09-08 22:37
8. 09-15 07:35

### 2.2 Type systems and language design

**Knows, as practical judgement.**

1. Coercion: an implicit conversion between operand types, tried only when nothing fits by subtyping. Flat number siblings need pairwise conversions. He asked to have this vocabulary corrected, then used it right.
2. `Any` is the type of every value, and `Object` leaves out `()`, which he first had to ask about.
3. Java erases generic types; Fortress keeps them, so its class loader chooses at run time.
4. Dispatch on all operand types is Fortress's defining feature, and exclusions are all over the library.
5. Conformance to the library's traits gives behavior for free; his anchor is the complex-number Mandelbrot. He judges by ergonomics and code reuse, not type-theoretic purity.
6. He proposes designs by analogy: the diagonal as a matrix subtype with its own product (it became P-88), a read-only matrix trait.
7. A `where` clause narrows where a declaration applies. He asks whether it risks soundness, and knows of the 2016 unsoundness of Java and Scala through `null`.
8. He applies the rule that the team's later word outweighs their earlier text, over his own reading.

**Said he doesn't know.**

9. Type theory as a whole: "out of my depth" or the like ten times from 08-21 to 10-16. Open. Options without a primer leave him "flipping a coin".
10. Smaller items: a nat-parameterised type (09-15; closed by 10-16); the "closure" of the integer tower (09-20, forgotten again 09-21); an interface against a trait (09-24); the options for resolving overloads (09-28); `thrower` and `reflect` in an array signature (10-16).

**Explained, and whether it stuck.**

11. Symmetric dispatch, asked "in detail" on 09-08: the idea stuck, the checker's overload rules didn't (09-28).
12. The `where` clause, walked through on 10-16: he followed it and asked well-placed questions. Too recent to judge.

**Corrected the coordinator.**

13. A matrix-plus-scalar `+` and a mask-plus-array `+` must coexist, since that is what dispatch is for (09-19).

Evidence, by point:

1. 09-26 15:52; 09-26 15:57; 09-29 15:26
2. 09-29 13:57; 10-03 04:14
3. 09-08 20:08; 09-23 07:10
4. 09-19 18:21; 09-19 18:31
5. 08-26 06:13; 09-24 01:20
6. 09-24 18:06; 09-24 18:25
7. 10-16 12:06; 10-16 12:14
8. 09-23 07:26; 09-29 17:34
9. 08-21 17:10; 09-29 12:17; 10-14 00:07; 10-16 12:48
10. 09-15 08:40; 10-16 11:49; 09-20 14:48; 09-21 17:01; 09-28 13:37
11. 09-08 21:25; 09-28 13:37
12. 10-16 11:49; 10-16 12:35
13. 09-19 18:21; 09-19 18:31

### 2.3 Mathematics

**Knows.**

1. A matrix product needs matching inner dimensions and takes products of rows and columns.
2. A rational is a numerator over a denominator; `ZZ` is signed and `NN` isn't negative.
3. Identity elements (zero, one, the bounds for minimum and maximum) belong to each type's algebraic structure.
4. IEEE rounding differs from Java's; `floor` on a float returns a float.

**Said he doesn't know.**

5. Ring, field, additive group: "you didn't explain it" (09-15), and still unknown on 10-16. Open for a month.
6. Multiplying vectors and matrices: a refresher asked on 09-15, first principles on 09-24, when he'd forgotten whether order matters. On 10-16 he doesn't know a dot product in detail. He thought microGPT's matrices square, which is half right: the coordinator first said they weren't, then checked C4 and found its attention weights, position table and activations 16×16, its token table and output weights 27×16, and its feed-forward weights 64×16 and 16×64. Open. His messages don't show whether the refreshers came; they didn't stick.
7. Reshape, planes, ravel, outer product (09-15); unsure he uses "tensor" right.
8. What `Q` means and whether `Z` holds negatives (09-19); he read `Number` as the naturals (09-21). Closed by 09-28.
9. Little background in mathematical notation (09-16); infinities in the rationals (09-26).

**Explained.**

10. The number tower worked explained from the bottom up and failed from the top down: "This isn't how you explained it to me before" (09-21).

Evidence, by point:

1. 09-15 09:42; 10-16 12:48
2. 09-21 17:28; 09-28 19:13
3. 09-26 15:25
4. 09-22 07:17; 09-29 15:18
5. 09-15 10:42; 10-16 12:48
6. 09-15 09:42; 09-24 16:41; 09-24 18:06; 10-16 13:01
7. 09-15 09:49; 09-15 09:06
8. 09-19 06:54; 09-21 01:36; 09-28 19:13
9. 09-16 22:43; 09-26 15:20
10. 09-21 01:36

### 2.4 Machine learning

**Knows.**

1. Karpathy's micrograd, microGPT and nanoGPT. microGPT's baseline is CPython or NumPy; he corrected the coordinator on this.
2. KV cache, loss curves, early stopping, Chinchilla, random initialization.
3. Models train at FP32 or lower; tokens are integers, so arrays must hold integers too.
4. A correctness check needs about two forward and backward passes, under a minute (P-30).
5. Differentiation over matrices is the more canonical mathematics; Karpathy's mutable visited flags are "the root of all evil".

**Said he doesn't know.**

6. How a functional or tape-style backpropagation works and what it costs: guesses, by his own account.
7. The boxed-plus big operator in ML papers; he is "hardly a yardstick".
8. Nothing shows him working attention or softmax himself. Learning this was the point of microGPT (10-16).

Evidence, by point:

1. 08-24 05:53; 08-27 15:17; 09-08 20:19
2. 08-27 04:53; 08-27 17:30
3. 09-25 23:29; 09-17 01:31
4. 10-08 17:49
5. 09-08 23:00
6. 09-08 17:16; 09-08 17:46
7. 08-27 04:06
8. 10-16 12:48

### 2.5 Fortress itself

**Knows, mostly from Steele's talks and the early work.**

1. Juxtaposition is an operator; some precedence is undefined, so parentheses are needed; loops are parallel by default on work-stealing pools; types are inferred; the specification has units and type aliases; `Σ` extends to new types, by Steele's idea of growing a language; the 2D rendering only presents the ASCII source (P-11).
2. The library: `Vector` and `Matrix` exist, limited to numbers for speed; exclusions are everywhere; the number tower convinced him Fortress had good ideas; commented-out code was left for reasons.
3. Design intent lives in the papers too; the specification quotes library text, so a citation can be circular.
4. Who did what: Ryu made most of the front end's commits; Park presented the POPL 2019 paper.
5. On 10-16 he reads an array declaration line by line, nat parameters included.

**Said he doesn't know.**

6. He hasn't read the specification, the type papers or the library (09-29; P-8), though he has opened the specification and the array code and spot-checked its PDFs.
7. Extensible syntax, DSL blocks and where whitespace counts (09-11, 09-12); transactional memory and `atomic` (09-19); `label`, which he took for a goto (10-09); arithmetic on sizes (10-02).
8. He has never read FACTS, POSITIONS or the original protocol.

**Explained, and whether it stuck.**

9. Walk against the compiled path (asked 08-21): stuck; walk's speed is irrelevant to him (P-29).
10. The compiler's prelude (asked 09-15): stuck; by 09-20 it's a bootstrap to remove (P-37).

**Corrected the coordinator.**

11. Read the TeX sources, not the PDF. `Σ` isn't sealed. An infix model expression turned into a call "is not Fortress" (P-87). Revising the specification "comes across quite arrogant": the revival reconciles contradictions. The library belongs among the sources reconciled.

Evidence, by point:

1. 09-12 09:15; 09-08 19:14; 08-24 05:53; 08-30 06:04
2. 08-30 08:43; 09-15 08:53; 09-20 07:20
3. 09-16 22:57; 09-21 02:03
4. 10-12 22:17; 10-10 06:56
5. 10-16 11:49
6. 09-29 12:17; 09-19 09:27; 09-24 18:25; 09-26 07:45
7. 09-11 06:42; 09-19 06:54; 10-09 06:55; 10-02 11:29
8. 10-12 16:42; 09-27 03:02
9. 08-21 17:10; 09-19 16:43
10. 09-15 23:21; 09-20 14:39
11. 08-26 06:13; 08-30 06:04; 09-19 18:13; 10-12 23:15; 10-13 00:52

### 2.6 Compilers and run times

**Knows.**

1. On 08-21 he knew bytecode "in JVM context" and little else. By 09-08 he reasons about boxing, the JIT, specialization and unboxed arrays of doubles (P-17). This is where he grew most.
2. The pipeline: the Rats! parser, desugaring, the checker in Scala, code generation to a jar, the run-time class loader.
3. A JVM array holds at most 2^31−1 elements, so ranges are `ZZ32`.
4. The caches are on disk, keyed by path, cheap to copy into a worktree.
5. A checker is never too fast; a fresh JVM for each compiled test loses its warmed-up code.
6. One test thread hides races.

**Said he doesn't know.**

7. Loom, the Vector API, Truffle and GraalVM (08-23). Closed by 09-08.
8. What dynamic class loaders do (09-20). Partly closed by 09-24, but the run-time descriptors were news to him then: "the first time you are explaining to me how the runtime works".
9. Which phases run the checker (09-08); that an earlier compiler existed (09-15); what run-time coercion costs (09-24); what a load of 30 means (09-29).
10. The counts: why compiler errors rose into thousands (09-27); on 10-16 he needs the checker count and the distance to the switch-over explained again.

**Corrected the coordinator.**

11. Generating Java source is "a stupid idea". No interpreter inside an interpreter for APL. A test that hit float-literal parsing was unfair. One test thread is a blind spot. The machine idles while the model runs, so probes needn't wait for an idle machine.

Evidence, by point:

1. 08-21 15:19; 09-08 20:53; 09-08 22:08; 09-19 18:32
2. 09-20 18:27
3. 09-27 06:38; 09-27 15:24
4. 10-02 19:27; 10-16 07:47
5. 10-14 19:03; 10-16 07:39
6. 10-08 15:53
7. 08-23 19:26; 08-23 19:27; 09-08 21:03
8. 09-20 18:27; 09-24 14:51; 09-24 15:07
9. 09-08 20:40; 09-15 23:46; 09-24 01:02; 09-29 11:12
10. 09-27 12:04; 10-16 09:07
11. 09-08 21:03; 09-12 10:17; 09-15 22:34; 10-08 15:53; 10-16 10:39

### 2.7 The repository, the tools and the process

**Knows.**

1. Git well: branches, tags, worktrees, message conventions, packing the object store.
2. Claude Code from the client's side: permission modes, `/context`, compaction, the prompt cache (five minutes for a subagent, an hour for the main session), check-ins 45 minutes apart.
3. Test-first as he means it: a probe's gap becomes a committed failing test, then the fix. A test holds its own assertions. A known failure stays an `XXX` test until a fix flips it.

**Said he doesn't know.**

4. Each once, most closed by use: orphan branches (08-19; closed by 09-18), empty commits (08-23), a Claude session against a remote one (10-05), whether `harness-one.sh` is the team's (10-08), what a finding is (10-08), secrets in a container (10-10), when the weekly limit resets (10-16), the three principles, though he knows the nine steps (10-14).
5. He forgets project terms and his own rulings after a gap: the switch-over (09-25), "answer 9" (09-28), his earlier rulings (10-09, 10-14).

**Corrected the coordinator.**

6. Mostly on its conduct: work done itself instead of delegated, wrong dates, re-measuring what the record holds, asking what the record settles, rules invented or widened, deciding what is his. The index lists 46.

Evidence, by point:

1. 08-19 00:03; 08-23 14:29; 09-28 07:40
2. 09-29 16:22; 09-29 17:44; 10-03 05:07; 09-28 09:32
3. 09-29 20:53; 10-02 15:48; 10-07 04:44
4. 08-19 06:57; 09-18 10:20; 08-23 14:23; 10-05 07:02; 10-08 15:53; 10-08 06:21; 10-10 09:01; 10-16 08:05; 10-14 11:55
5. 09-25 23:36; 09-28 13:10; 10-09 06:55; 10-14 07:10
6. 08-23 07:12; 09-17 19:46; 09-28 20:02; 10-12 16:59; 09-27 07:09; `evidence.md`, section 7

### 2.8 How he learns and reads

Section 3.

## 3. How he learns and reads

1. Concrete cases before the rule. He can't reason about abstract toy examples. He wants several specific cases, checks them for a contradiction, then derives or accepts the rule. He asks for the concrete program ("make this concrete on C4").
2. The frames that worked are systems he knows, mostly his own analogies: the complex-number Mandelbrot (traits give behavior), the diagonal matrix (a subtype with its own product), Swift's debug builds (walk's speed doesn't count), LLVM's lit (the test suite), Swift's mangled names (encoding sizes), debug and optimized builds (history files and FACTS).
3. An ask that works has five parts: the question, short context with a primer, numbered options, the ask, a one-line recommendation last. When he lacks the context, a refresher and what the peers do go before the options. Such asks got answers within minutes; rows 29, 31 and 43, in the nine-step form, were approved as recommended.
4. Terms defined where used. Undefined labels failed every time: "closure", "the switch-over", "decision F", "P1", "batch 8's judge", "review-queue item 62", back references to list items.
5. One ask at a time, answerable as "3b". Each option a real choice with its trade-off; a do-nothing option annoys him. No yes until he understands what it commits him to; proposed wording shown first.
6. Register: plain words, halfway to ASD-STE100, positive phrasing, a named concept with a few rules instead of an if-else list. Never clever turns, a coda after a semicolon, slogans, self-praise, a header on every paragraph, or "we" for him and Claude.
7. The phone: an iPhone, often with iOS Speak at a fast rate, so pages need a Select button per section. Links that open on the phone, not repository paths. No tables, no hard line breaks inside a paragraph, numbers as K and M. He taps stop by accident, holding the phone one-handed.
8. Dictation garbles terms; repair them silently unless two readings differ in meaning. Seen: Fortify as "forty five", compact as "contact", Fortress as "WordPress", Fable as "Table", Scala as "scalar", parallel as "Perl", checker as "Docker", type system as "time system", rung as "rank", nat as "net", Hsu as "Sue", POPL as "Popple", 64 as 16.
9. Length depends on the mode. While he reads turn by turn: three lines and "holding". An ask: about 1.5K to 3.3K characters, 5K with a refresher. When facts are being established, he welcomed a long reply. A long proposal he won't read; an unrequested expansion is "TL;DR slop".
10. The wall-of-text spiral, named at least eight times from 08-21 on: he answers parts of long turns as he reads, and each answer brings more text. The recovery that held: hold, list his points, say nothing else until he's done.
11. When tired ("executive function depletion") he takes the default ("I am not reading this, but go") or asks to revisit it with more energy.
12. "I can read fast, write fast, but can't remember." He rereads the conversation to check nothing is owed.
13. He thinks aloud in long dictated messages ending "how wrong am I?" Answer that question. His rambling isn't the golden source; he wants it refined and reflected back.
14. He wants decisions surfaced to keep his "cognitive debt" low and to learn the language. One surfaced for his learning should say so, not read as an ask that blocks a batch.
15. A picture helps where structure matters (a scatter-gather schematic), as does paper notation interleaved with code.
16. Failed asks. Row 40 (09-25): no options and no explicit ask, so "???". Answer 6 (09-26): it assumed what he didn't know. Q1 (10-15): it didn't first say what the designers' text says, offered Scala's behavior as an equal option, used the record's shorthand, and lacked the deciding fact, whether the library uses the shape. About 1.7M tokens written.

Evidence, by point:

1. 10-16 12:27; 09-24 01:20; 09-12 09:15
2. 08-26 06:13; 09-24 18:06; 09-19 16:43; `skills-review-style.md`, lens 12; 09-24 15:00; 09-30 05:24
3. `answer-form-archaeology.md`; 09-23 06:43
4. 09-21 17:01; 09-25 23:36; 09-21 00:38; 10-15 04:18; 09-20 15:40
5. 10-12 16:33; 10-13 23:13; 09-21 00:38; 10-07 02:30
6. 09-12 09:30; 08-24 05:53; 10-05 06:41; 10-07 03:37; 10-12 13:21; 10-12 13:43; 10-12 22:01
7. 10-08 11:36; 10-12 12:39; 09-22 05:21; 09-08 21:22; 09-23 05:19; 09-26 12:10
8. 09-20 06:34; 08-22 12:33; 09-19 09:22; 09-14 05:41; 10-13 01:28; 10-15 04:18; 09-17 15:27; 10-10 05:55; 10-16 12:48; 09-15 09:49; 08-22 08:37; 09-21 20:45
9. `wall-of-text-spiral.md`; `answer-form-archaeology.md`; 09-23 05:49; 09-27 03:04; 10-13 00:33
10. `wall-of-text-spiral.md`; 08-21 17:22; 09-20 08:01; 09-27 08:02
11. 09-19 14:51; 09-19 14:54; 09-29 17:44
12. 10-12 16:33; 09-23 06:43
13. 09-08 17:16; 10-13 09:05
14. 09-22 05:21; 09-29 17:44; 10-16 12:27
15. 09-17 15:51; 08-27 04:53
16. `answer-form-archaeology.md`; `explorations/reviews/q1-abstract-sibling-detour.md`

## 4. Before an explanation or an ask

**Take as known.**

1. The history in POSITIONS, "History he knows", and his decisions there. Cite a decision by what it says, never by its number: he often doesn't recall a ruling by its label.
2. Swift's language and library, measurement statistics, Python, git, lit-style tests, Claude Code's client and its cache timing.
3. Fortress's big ideas: dispatch on all arguments, juxtaposition, parallel by default, traits that give behavior, flat number siblings with coercion, `Any` against `Object`, boxing as the cost, walk against the compiled path.

**Explain from the ground up, each time.**

4. Any type-system question: a concrete Fortress program and several cases of it. First what the specification and the team's later word say, and which way they point; then the library's practice; then the peers, as context, never as an equal option (P-149). Say what each option does for a fast, compiled microGPT (P-8). The nine-step form worked.
5. Rings, fields, additive groups, matrix products, the dot product. Nothing has stuck. Start from a 2×2 matrix times a vector, and from microGPT's own matrix shapes, read from C4 (`explorations/run-c4/src/MicroGptFlat.fss:17`, `:41`): some square (16×16), some not (27×16, 64×16).
6. The number types, if they come up: bottom up, `ZZ32` first.
7. The run-time class loader and its descriptors: from his own picture, Swift's mangled names and sizes stamped into a class so the JIT drops bounds checks.
8. The checker count and the distance to the switch-over: what each counts, and why one can jump.
9. Fortress constructs he hasn't met: `label` and `exit`, `where`, `comprises`, `atomic`, `()`, nat parameters, `reflect`.
10. When he says he's tired: one item, a default he can take, an offer to come back to it.

**Words to avoid, or to define where used.**

11. Numbers and letters of entries, items, rows, rungs and batches alone ("P1", "row 40", "rung K", "answer 9"); "the judge"; "the line"; "closure"; "sealed". Name the thing.
12. "Tensor", "reshape", "ravel", "outer product", "ring", "field", "coercion" against "conversion".
13. Loose time words ("yesterday"), "we" for him and Claude, "the" opening a glossary entry, a closing coda.

**Contradictions the evidence leaves, not settled here.**

14. He demands short replies, yet praised a long one when facts were being established. The evidence fits a length set by the mode, not a fixed one.
15. He hasn't read the specification, papers or library, yet spot-checks the specification and array code and recalls Steele's talks precisely. What he has read is listed nowhere.
16. He says he knows no type theory, yet reasons soundly about coercion, bounds and erasure: practical judgement, not formal training.
17. He says Scala earned most of his Stack Overflow points; the record shows his top answer is Scala but most of the account iOS and Objective-C.
18. He asks what peers do, to learn, and rules that peers decide only between the designers' earlier and later choices (P-149). Peers in the primer, never among the options, is the record's reading, not his.
19. He wants to own every choice, yet at times takes a default unread ("I have no idea what I'm deciding on, but let's push forward to zero").
20. He remembers `main` as built from the clean ladder, free of the third-party port; F-165 says otherwise.
21. His claims about other languages are unchecked, such as Swift's witness tables doing something like symmetric dispatch. Check one before building on it.

Evidence, by point:

1. `POSITIONS.md`, "History he knows"; 09-28 13:10; 10-14 07:10
2. Sections 1, 2.1 and 2.7
3. Sections 2.2, 2.5 and 2.6
4. 10-16 12:27; `explorations/reviews/q1-abstract-sibling-detour.md`; 10-15 06:23; 09-29 12:17
5. 10-16 12:48; 10-16 13:01
6. 09-21 01:36
7. 09-24 14:51; 09-24 15:00
8. 09-27 12:04; 10-16 09:07
9. 10-09 06:55; 10-16 11:49; 09-19 06:54; 10-03 04:14
10. 09-19 14:54; 09-29 17:44
11. 10-15 04:18; 10-16 11:18; 09-21 00:38
12. 09-15 09:06; 09-15 09:49; 09-26 15:52
13. 09-23 05:39; 10-12 22:01; 10-08 11:28; 10-12 13:43
14. 09-23 05:49; 08-21 17:22
15. 09-29 12:17; 09-24 18:25; 08-27 17:30
16. 09-29 11:20; 09-26 15:52; 09-23 07:10
17. 08-21 15:19; `public-work.md`, section 1
18. 09-26 11:30; 10-15 06:23; `explorations/reviews/q1-abstract-sibling-detour.md`
19. 09-22 05:21; 10-09 15:10
20. 09-23 06:02; 09-23 06:04; F-165
21. 09-08 21:31
