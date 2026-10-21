<!-- What Pavol, the curator, knows, graded by topic, for pitching an explanation or an ask at him, with each line's evidence in PROFILE-sources.md beside it. -->

# What Pavol knows

A topic reads `topic — level — how to pitch it`. `1 → 3` is a level that rose: pitch at the later one.

- 4, expert: hands-on depth; talk as to a peer.
- 3, working: uses it correctly; no explanation, define only the project's own terms.
- 2, familiar: knows the idea, not the details; a one-line reminder before it is used.
- 1, heard of: knows the name; explain it with one concrete case before using it.
- 0, new: explain from the ground up, concrete cases first, with the shortest grounding that worked where there is one.

## Topics

### Languages and tools

- Benchmarking and measurement statistics — 4 — talk as to a peer; frame speed results this way.
- Swift as a library and benchmark writer — 3 — his first frame; its compiler's insides, and its names for unique references and copy-on-write, are 1.
- Scala (2.8 era), Java and the JVM, Python, iOS, as a user — 3 — take as known; their compilers' insides are new.
- Rust, Julia, Kotlin, Clojure, C++ templates — 2 — one line on the peer's idea; Clojure's multimethods are 1.
- What generators cost against a loop — 3 — he measured it himself; use it for big operators.
- APL — 0 — the side quest is closed.

### Types and language design

- Type theory, formally — 0 — a concrete Fortress program and several cases before any rule.
- Dispatch on all arguments; exclusions; coercion against subtyping; `Any` against `Object` — 1 → 3 — take as known.
- The checker's overload rules — 1 — the idea stuck, the rules didn't; show concrete pairs of declarations.
- Erased against kept generics; traits that give behavior; a subtype with its own operation — 3 — he judges by ergonomics and reuse, not purity.
- `where` clauses; soundness — 0 → 2 — remind him that `where` narrows where a declaration applies.
- `nat` size parameters — 0 → 2 — remind him that a `nat` is a size the type carries; arithmetic on sizes is 0.
- An interface against a trait — 1 — he is unsure of the words; say "extends".

### Mathematics

- Matrix and vector products, the dot product — 1 — he knows only that inner dimensions match; start from a 2×2 matrix times a vector, show that order matters, then C4's shapes: 16×16 (attention), 27×16 (token table), 64×16 (feed-forward).
- Rings, fields, additive groups — 0 — no grounding has worked yet.
- Identity elements on each type's algebra — 3 — take as known.
- Q, Z and N; `ZZ` signed, `NN` not — 0 → 3 — take as known.
- The library's number types — 2 — bottom up, `ZZ32` first; top down failed.
- Floating point — 2 — he knows IEEE rounding against Java's; infinities among the rationals were new.
- Reshape, ravel, outer product, tensor — 0 — define each on a small array.
- Mathematical notation — 1 — set it beside the Fortress code that computes it.

### Machine learning

- micrograd, microGPT, nanoGPT; FP32; integer tokens — 3 — take as known; microGPT's baseline is CPython or NumPy.
- KV cache, loss curves, early stopping, Chinchilla — 2 — a one-line reminder.
- Backpropagation, functional or tape-style, and its cost — 1 — his views are guesses.
- Big operators as ML papers write them — 1 — "hardly a yardstick", he says.
- Attention and softmax — 0 — learning them was microGPT's point for him; teach from C4's code.

### Fortress, its sources and the record

- Steele's talks: juxtaposition, undefined precedence, parallel loops, inference, units, `Σ` over new types — 3 — take as known.
- Where intent lives: the papers, the TeX not the PDF, the team's later word, the library among the sources — 3 — his rules.
- Who did what: Ryu's front end, Park's POPL 2019 paper — 3 — take as known.
- The library's shape: `Vector` and `Matrix` for numbers only — 2 — a one-line reminder.
- The specification, the papers, the library's text — 1 — unread; quote the line that decides.
- Reading Fortress code — 1 → 2 — he reads a declaration line by line; gloss each new construct.
- `label` and `exit`, `comprises`, `atomic`, `thrower`, `reflect`, DSL blocks, where whitespace counts — 0 — one concrete case each.
- FACTS, POSITIONS, the original protocol — 0 — never read; say what an entry says.
- Walk against the compiled path; the compiler's prelude — 0 → 3 — take as known.

### Compilers and run times

- JVM performance: boxing, the JIT, specialization, unboxed doubles — 1 → 3 — where he grew most.
- The pipeline, the caches, JVM array limits, warm-up, races hidden by one thread — 3 — take as known.
- Loom, the Vector API, Truffle, GraalVM — 0 → 2 — a one-line reminder.
- The class loader and its descriptors — 0 → 2 — from his own picture: sizes stamped into a class, as Swift mangles names, so the JIT drops bounds checks.
- One-time facts: which phases run the checker, the earlier compiler, a coercion's cost at run time, a load of 30 — 1 — one line when it comes up.
- The checker count and the distance to the switch-over — 1 — each time: what each counts, and why one can jump.

### The repository and the process

- Git; Claude Code's client; test-first, with `XXX` tests until a fix flips them — 3 — take as known.
- The platform: remote sessions, secrets in a container, the weekly reset — 1 — one line when it matters.
- The project's own terms; his past rulings — 2 — he forgets them after a gap; restate them by content.
- POSITIONS, "History he knows", and his decisions — 3 — take as known; cite a decision by what it says, never by its number.
- The coordinator's three principles — 1 — he knows the nine-step form, not these.

## How to explain to him

- Pitch at a software engineer who directs the work, not a researcher. Say what a feature costs.
- Concrete cases before the rule: several, on C4 or a Fortress program. He checks them for a contradiction, then takes the rule.
- Frame in what he knows, his own analogies first: the complex-number Mandelbrot, the diagonal matrix, Swift's debug builds, LLVM's lit.
- Define each term where it is used.
- Show Fortress code as Fortress, infix, not calls. Set notation beside the code. Draw a picture where structure matters.
- An ask: the question, context with a primer, numbered options with trade-offs and none that does nothing, the ask, the recommendation last. On types: the specification and the team's later word first, then the library, then the peers as context only. Say what each option does for a fast microGPT.
- One ask at a time, answerable as "3b". Show the wording before a yes. Mark a decision surfaced for his learning as one.
- Length by mode: three lines and "holding" while he reads turn by turn; an ask 1.5K to 3.3K, 5K with a refresher; long only to establish facts, never unasked.
- If he answers a long turn piece by piece: hold, list his points, and wait.
- When he's tired: one item, a default he can take, an offer to come back to it.
- When he ends "how wrong am I?": answer it, and reflect his idea back refined.
- He reads fast and forgets: restate, don't refer back.
- Plain words, halfway to ASD-STE100, positive phrasing.
- The phone, with Speak: a Select button per section, links not paths, no tables, numbers as K and M. A stop can be an accidental tap.
- Dictation: repair a term silently unless two readings differ. Seen, as heard → meant: forty five → Fortify, contact → compact, WordPress → Fortress, Table → Fable, scalar → Scala, Perl → parallel, Docker → checker, time system → type system, rank → rung, net → nat, Sue → Hsu, Popple → POPL, 16 → 64.

## Words to avoid

- A bare label: "P1", "row 40", "answer 9", "the judge", "the line". Name the thing.
- "Closure" for the integer tower; "sealed" for `Σ`; "revising the specification" for reconciling its contradictions.
- "Tensor", "reshape", "ravel", "outer product", "ring", "field", undefined; "coercion" for "conversion".
- "Yesterday"; "we" for him and Claude; a coda, a slogan, a clever turn.

## Open contradictions

- Length: he demands short replies, yet praised a long one while facts were being established.
- Reading: he says he hasn't read the specification or the library, yet spot-checks them and recalls Steele's talks exactly.
- Type theory: he says he knows none, yet reasons soundly about coercion, bounds and erasure.
- Scala: he says it earned his Stack Overflow points; most of the account is iOS.
- Peers: he asks what they do, yet rules that they only decide between the designers' choices; "context only" is the record's reading.
- Ownership: he wants every choice, yet at times takes a default unread.
- History: he recalls `main` as free of the third-party port; the record says otherwise.
- Other languages: his claims about them are unchecked; check one before building on it.
