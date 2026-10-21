<!-- The evidence for each line of PROFILE.md, under its headings and in its order, by the line's first words, the timestamps of the curator's messages and the files that bear it. -->

# What Pavol knows: the sources

- A timestamp is UTC, in 2026, written month-day hour:minute. `python3 -I explorations/coordinator/curator-profile/show.py 2026-09-15T09:49` prints his messages of that minute, and `evidence.md` beside this file labels each one.
- A file without a path is beside this file. A P- or F- number is an entry of `explorations/coordinator/POSITIONS.md` or `FACTS.md`.
- The last section keeps the evidence of the old profile's points that the profile no longer carries.

## The scale

- "4, expert" to "0, new", and the arrow for a level that rose: set by the curator on 10-16 and relayed by the coordinating session; no indexed message bears them.

## Topics

### Languages and tools

- Benchmarking and measurement statistics: 10-12 16:42; `public-work.md`, sections 2 and 3.
- Swift as a library and benchmark writer: 08-21 15:19; 08-23 19:32; 09-08 22:27; 09-08 22:37; 09-17 11:55; 09-22 07:17; `public-work.md`, sections 2 and 3 (no pull request of his touches the compiler's C++, type checker or optimizer; forum posts on `Sequence` and `Collection`).
- Scala (2.8 era), Java and the JVM, Python, iOS: Scala 08-21 15:19; 08-21 15:40; 09-15 08:03; 10-16 07:20 (scalac self-hosted, unsure on 08-21, assumed on 10-16). Java 08-21 17:18; 08-21 22:58; 09-08 20:08. Python 08-24 21:04. iOS and Objective-C `public-work.md`, section 1.
- Rust, Julia, Kotlin, Clojure, C++ templates: 08-23 19:22; 09-08 21:37; 09-20 14:48; 09-22 07:17. Clojure's multimethods 09-08 21:51.
- What generators cost against a loop: `public-work.md`, section 4 (MandelbrotSwifty).
- APL: 09-11 06:42; 09-12 10:17; 09-15 07:28; 09-15 07:35 (he understands neither APL nor the Fortress written for it); P-10.

### Types and language design

- Type theory, formally: 08-21 17:10; 09-29 12:17; 10-14 00:07; 10-16 12:48.
- Dispatch on all arguments; exclusions; coercion; `Any` against `Object`: dispatch and exclusions 09-08 21:25; 09-19 18:21; 09-19 18:31 (a matrix-plus-scalar `+` and a mask-plus-array `+` must coexist). Coercion 09-26 15:52; 09-26 15:57; 09-29 15:26. `Any` and `Object` 09-29 13:57; 10-03 04:14.
- The checker's overload rules: 09-08 21:25; 09-28 13:37.
- Erased against kept generics; traits that give behavior; a subtype: 09-08 20:08; 09-23 07:10; 08-26 06:13; 09-24 01:20; 09-24 18:06; 09-24 18:25 (the diagonal matrix, a read-only matrix trait); P-88.
- `where` clauses; soundness: 10-16 11:49; 10-16 12:06; 10-16 12:14; 10-16 12:35.
- `nat` size parameters: 09-15 08:40; 10-16 11:49. Arithmetic on sizes 10-02 11:29.
- An interface against a trait: 09-24 18:25.

### Mathematics

- Matrix and vector products, the dot product: 09-15 09:42; 09-24 16:41; 09-24 18:06; 10-16 12:48; 10-16 13:01. The shapes: `explorations/run-c4/src/MicroGptFlat.fss:17` and `:41` (16×16 for the attention weights, position table and activations; 27×16 for the token table and output weights; 64×16 and 16×64 for the feed-forward weights).
- Rings, fields, additive groups: 09-15 10:42; 10-16 12:48.
- Identity elements on each type's algebra: 09-26 15:25.
- Q, Z and N: 09-19 06:54; 09-21 01:36; 09-21 17:28; 09-28 19:13.
- The library's number types: 09-21 01:36.
- Floating point: 09-22 07:17; 09-29 15:18 (`floor` on a float returns a float); 09-26 15:20 (infinities among the rationals).
- Reshape, ravel, outer product, tensor: 09-15 09:06; 09-15 09:49.
- Mathematical notation: 09-16 22:43; 08-27 04:53 (notation interleaved with code).

### Machine learning

- micrograd, microGPT, nanoGPT; FP32; integer tokens: 08-24 05:53; 08-27 15:17; 09-08 20:19; 09-17 01:31; 09-25 23:29; 10-08 17:49 (the correctness check, about two forward and backward passes); P-30.
- KV cache, loss curves, early stopping, Chinchilla: 08-27 04:53; 08-27 17:30.
- Backpropagation, functional or tape-style: 09-08 17:16; 09-08 17:46; 09-08 23:00 (differentiation over matrices the more canonical; mutable visited flags bad).
- Big operators as ML papers write them: 08-27 04:06.
- Attention and softmax: 10-16 12:48.

### Fortress, its sources and the record

- Steele's talks: 10-13 00:46 ("Four Solutions"); 08-24 05:53; 08-27 17:30; 08-30 06:04; 09-08 19:14; 09-12 09:15; P-11 (the 2D rendering only presents the ASCII source).
- Where intent lives: 08-26 06:13 (the TeX, not the PDF); 09-16 22:57; 09-21 02:03; 09-23 07:26; 09-29 17:34; 10-13 00:52 (the library among the sources); P-26.
- Who did what: 10-10 06:56; 10-12 22:17.
- The library's shape: 08-30 08:43; 09-15 08:53; 09-20 07:20.
- The specification, the papers, the library's text: 09-19 09:27; 09-24 18:25; 09-26 07:45; 09-29 12:17; P-8.
- Reading Fortress code: 10-16 11:49.
- `label` and `exit`, `comprises`, `atomic`, …: 09-11 06:42; 09-12 09:15; 09-19 06:54; 10-03 04:14; 10-09 06:55; 10-16 11:49.
- FACTS, POSITIONS, the original protocol: 09-27 03:02; 10-12 16:42.
- Walk against the compiled path; the compiler's prelude: 08-21 17:10; 09-19 16:43; P-29. The prelude 09-15 23:21; 09-20 14:39; P-37.

### Compilers and run times

- JVM performance: 08-21 15:19; 09-08 20:53; 09-08 21:03 (generating Java source "a stupid idea"); 09-08 22:08; 09-19 18:32; P-17.
- The pipeline, the caches, JVM array limits, …: 09-20 18:27; 09-27 06:38; 09-27 15:24; 10-02 19:27; 10-16 07:47; 10-14 19:03; 10-16 07:39; 10-08 15:53 (one test thread); 09-15 22:34 (a test that hit float-literal parsing was unfair); 10-16 10:39 (the machine idles while the model runs).
- Loom, the Vector API, Truffle, GraalVM: 08-23 19:26; 08-23 19:27; 09-08 21:03.
- The class loader and its descriptors: 09-20 18:27; 09-24 14:51; 09-24 15:00; 09-24 15:07.
- One-time facts: 09-08 20:40; 09-15 23:46; 09-24 01:02; 09-29 11:12.
- The checker count and the distance to the switch-over: 09-27 12:04 (compiler errors rose into thousands); 10-16 09:07.

### The repository and the process

- Git; Claude Code's client; test-first: git 08-19 00:03; 08-23 14:29; 09-28 07:40; orphan branches 08-19 06:57, closed 09-18 10:20; empty commits 08-23 14:23. Claude Code 09-28 09:32; 09-29 16:22; 09-29 17:44; 10-03 05:07. Test-first 09-29 20:53; 10-02 15:48; 10-07 04:44.
- The platform: 10-05 07:02; 10-10 09:01; 10-16 08:05.
- The project's own terms; his past rulings: 09-25 23:36; 09-28 13:10; 10-08 06:21 (what a finding is); 10-08 15:53 (whether `harness-one.sh` is the team's); 10-09 06:55; 10-14 07:10.
- POSITIONS, "History he knows", and his decisions: `explorations/coordinator/POSITIONS.md`, "History he knows (do not re-explain)"; 09-28 13:10; 10-14 07:10.
- The coordinator's three principles: 10-14 11:55.

## How to explain to him

- Pitch at a software engineer: 08-23 19:13; 09-29 09:34; 10-12 22:01; 10-13 00:56; 10-16 12:48; `public-work.md`, section 1 (from 2010 he asks what a feature costs).
- Concrete cases before the rule: 09-12 09:15; 09-24 01:20; 10-16 12:27.
- Frame in what he knows: 08-26 06:13; 09-19 16:43; 09-24 15:00; 09-24 18:06; 09-30 05:24; `explorations/reviews/skills-review-style.md`, lens 12.
- Define each term where it is used: 09-20 15:40; 09-21 00:38; 09-21 17:01; 09-25 23:36; 10-15 04:18.
- Show Fortress code as Fortress: 09-19 18:13; P-87. Notation and pictures 08-27 04:53; 09-17 15:51.
- An ask: `explorations/coordinator/answer-form-archaeology.md`; 09-23 06:43; 09-29 12:17; 10-15 06:23; 10-16 12:27; `explorations/reviews/q1-abstract-sibling-detour.md` (the failed Q1 of 10-15); P-8; P-149.
- One ask at a time: 09-21 00:38; 10-07 02:30; 10-12 16:33; 10-13 23:13. Surfaced for his learning 09-22 05:21; 09-29 17:44; 10-16 12:27.
- Length by mode: `explorations/coordinator/postmortem-2026-09-19/wall-of-text-spiral.md`; `explorations/coordinator/answer-form-archaeology.md`; 09-23 05:49; 09-27 03:04; 10-13 00:33.
- If he answers a long turn piece by piece: `explorations/coordinator/postmortem-2026-09-19/wall-of-text-spiral.md`; 08-21 17:22; 09-20 08:01; 09-27 08:02.
- When he's tired: 09-19 14:51; 09-19 14:54; 09-29 17:44.
- When he ends "how wrong am I?": 09-08 17:16; 10-13 09:05.
- He reads fast and forgets: 09-23 06:43; 10-12 16:33.
- Plain words: 08-24 05:53; 09-12 09:30; 10-05 06:41; 10-07 03:37; 10-12 13:21; 10-12 13:43; 10-12 22:01.
- The phone, with Speak: 09-08 21:22; 09-22 05:21; 09-23 05:19; 09-26 12:10; 10-08 11:36; 10-12 12:39.
- Dictation: 08-22 08:37; 08-22 12:33; 09-14 05:41; 09-15 09:49; 09-17 15:27; 09-19 09:22; 09-20 06:34; 09-21 20:45; 09-29 15:18; 10-10 05:55; 10-13 01:28; 10-15 04:18; 10-16 12:48.

## Words to avoid

- A bare label: 09-21 00:38; 09-28 13:10; 10-14 07:10; 10-15 04:18; 10-16 11:18.
- "Closure" for the integer tower: 09-20 14:48; 09-21 17:01. "Sealed" 08-30 06:04. "Revising the specification" 10-12 23:15.
- "Tensor", "reshape", "ravel": 09-15 09:06; 09-15 09:49; 09-26 15:52.
- "Yesterday"; "we": 09-23 05:39; 10-08 11:28; 10-12 13:43; 10-12 22:01.

## Open contradictions

- Length: 08-21 17:22; 09-23 05:49.
- Reading: 08-27 17:30; 09-24 18:25; 09-29 12:17.
- Type theory: 09-23 07:10; 09-26 15:52; 09-29 11:20.
- Scala: 08-21 15:19; `public-work.md`, section 1.
- Peers: 09-26 11:30; 10-15 06:23; `explorations/reviews/q1-abstract-sibling-detour.md`; P-149.
- Ownership: 09-22 05:21; 10-09 15:10.
- History: 09-23 06:02; 09-23 06:04; F-165.
- Other languages: 09-08 21:31 (Swift's witness tables as something like symmetric dispatch).

## Evidence of points the profile no longer carries

- Central European time, and work late into the night: 09-29 09:19; 10-13 01:40.
- The revival as a hobby and a test of the claim that coding is solved: 08-23 19:13; 09-29 09:34; 10-12 22:01.
- His first plan, complex numbers in Fortress, which ended when the compiler proved unfinished; he calls his Mandelbrot program Scala once and Swift once: 08-23 19:13; 09-19 06:54; 10-13 00:46.
- His only recent public code, Python written with Claude Code: `public-work.md`, section 4.
- A relayed Claude chat's memory summary, unverified (over 20 years in software, a product owner and contractor): 10-12 21:49.
- Slovak spoken around him: 09-29 15:18.
- His 46 corrections of the coordinator's conduct (work done itself instead of delegated, wrong dates, re-measuring, asking what the record settles, rules invented or widened, deciding what is his): 08-23 07:12; 09-17 19:46; 09-27 07:09; 09-28 20:02; 10-12 16:59; `evidence.md`, section 7.
