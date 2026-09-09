# Extract: Guy L. Steele Jr., "Four Solutions to a Trivial Problem" (Google TechTalks 2015)

> **DRAFT — captions-only extract.** This is based solely on the human-made
> YouTube captions of the talk. The slides — full of charts, diagrams, and
> Fortress code in mathematical notation — were **not** available (no slide
> PDF has been found on the open web; see `research/README.md` for the
> recovery routes), so all slide content described below is inferred from
> what Steele says. Obvious transcription artifacts in the captions
> (garbled notation, lowercased "Fortress", split-up words) have been
> corrected in the quotations below; paraphrase stays outside quotation
> marks. A proper transcript aligned with reconstructed slides (frame
> extraction from the video) is planned, will be cleaned the same way,
> and will supersede this draft.

- **Title:** Four Solutions to a Trivial Problem
- **Speaker:** Guy L. Steele Jr. (Oracle Labs)
- **Venue:** Google TechTalks (talk given at a Google office; introduced by "Matt")
- **Date given:** 2015-12-01; **uploaded to YouTube:** 2016-01-28
- **Duration:** 1:01:47
- **Video:** https://www.youtube.com/watch?v=ftcIcn8AmSY

Extract made 2026-08-22 from the full captions. Timestamps are approximate
(caption cue times). Cross-references to the palimondo/fortress repo state
are marked **[repo]**. This is one of Steele's two retrospective-era talks;
the other is the JuliaCon 2016 keynote (`SteeleJuliaCon2016-extract.md`),
whose slides 4–9 reproduce this talk's toy problem and cite this talk by
name. Where JuliaCon compresses the parallelism story to a few slides, this
talk develops it for a full hour.

## Thesis [0:55–2:25]

"The best way to write parallel applications is, as much as possible, not to
have to think about the parallelism" [1:10]. The real issue is
*independence of computation*, which today's languages can't express. His
"over-simplified slogan" [1:51]: "accumulators are bad. Divide and conquer
is good." And: algebraic properties are important — programmers should be
aware of them and communicate them to the compiler. This is the same thesis
as his ICFP 2009 keynote "foldl and foldr Considered Slightly Harmful" and
Strange Loop 2010 "How to Think about Parallel Programming: Not!" (both in
the adjacent canon list in `research/README.md`), here developed with a
worked four-solution example.

## Warm-up 1: summing a million numbers [2:25–5:30]

A Fortran DO loop summing an array (he first "forgets" to initialize SUM —
"a very common bug"). The loop's semantics are inherently sequential: its
computation tree has a long left-linear spine. "Fran Allen won a Turing
Award for devoting her life to writing compilers that can undo code like
this, and turn it into code that a parallel computer can really run"
[2:47]. A mathematician instead writes Σ — like Fortran 90's SUM intrinsic,
it "says what to do... but doesn't tell you how, so there's no commitment
yet as to strategy" [3:14]. Marking the DO parallel gives race conditions;
adding atomic makes it correct but sequential again. What you want is the
balanced pairwise tree: log-depth given enough processors.

## Warm-up 2: length of a Lisp list [5:30–8:30]

Linear-linked lists force a linear algorithm: "data can dictate the way code
works", and linearly-linked lists are "inherently sequential" [6:40].
Analogy to Peano arithmetic vs. binary numbers [6:48]: unary representation
is the list; positional binary gives log-size representation and (with carry
look-ahead) log-log addition. Then Haskell code for list length with a
*three-way* decomposition — empty / singleton / concatenation of two parts
`a ++ b` — where the code does not say *how* to split; if splits are
balanced and cheap, delay is Θ(log n). Multiway decomposition is the key
paradigm shift.

## The trivial problem [8:30–11:15]

An array of integers read as a bar chart; pour water over it; how much water
is retained? Credited to Dan Nussbaum and Steve Heller [8:39] (same credit
as JuliaCon slide 4); "it actually may have appeared in some Google
questionnaires for employment — I'm not sure" [8:41]. The example array
(height-16, answer 35) matches the JuliaCon deck's
`2 6 3 5 2 8 1 4 2 2 5 3 5 7 4 1`. Key insight: water above each bar =
(max to the left MIN max to the right) − bar height, so the per-bar
computations are independent — "this gives us a decomposition into
independent pieces" [9:25].

## Solution 1: sequential sweeps (Fortress) [11:15–13:45]

Audience-participation reveal that the code on screen is Fortress: "Fortress
is a programming language designed to look kind of like mathematical
pseudocode and to use mathematical notation. But I assure you this is
actually actual, functioning, running code, or at least it was as of three
years ago, last time I checked it" [11:40–11:50]. **[repo]** December 2015
minus three years ≈ late 2012 — i.e. Steele last ran Fortress right around
the July 2012 wind-down announcement and this repo's HEAD (Aug 2012). The
revival's green suite makes his code runnable again.

The function `histogramWater(x)` does three loops: a left-to-right MAX
accumulation, a right-to-left MAX accumulation, and a final
MIN/subtract/accumulate pass. "I said the nasty word accumulation. This is
going to be a sequential algorithm" [10:14]. An optimizing compiler could
fuse the last two loops into a two-pass version — "that's a difficult thing
for a compiler to do" [13:15].

## Solution 2: pure divide-and-conquer — bitonic globs [13:45–23:35]

Recursively split the bar chart, solve halves, merge. The merge abstraction
is a "glob": a *bitonic* outline ("it can go up and then it can go down —
or, as they said of the Monty Python brontosaurus..." [15:10]) plus the
amount of water already inside (just an integer — the shape of the water is
never needed). Representation: list of plateaus (height–width pairs) left of
the peak, the peak's height and width, plateaus right of the peak, and the
water count — five components. Combining two globs has three cases (left
peak higher / right higher / equal); the awkward part is a three-way *split*
of one outline at a given height.

The Fortress code declares `object GlobReduction extends
MonoidReduction[\Glob\]` [18:42] — "that's essentially a promise that the ⊕ operator, the
combining operator, is going to be associative. That, in turn, will justify
a parallel implementation" [18:45]. Is the complicated ⊕ actually
associative? He has verified it by hand ("It's a pain. It'd be nice to have
a theorem prover do it, or a theorem prover built into a compiler — even
better" [21:25]) — the same theorem-prover wish as JuliaCon slide 15's
`property` laws. **[repo]** `trait Monoid[\T, opr OPLUS\]`
(`Library/FortressLibrary.fss:2823`) and `trait MonoidReduction`
(`:2952`, also `Library/GeneratorLibrary.fss:414`) are exactly this shipped
machinery; the `BIG` operator desugaring lives in `__bigOperatorSugar` /
`__bigOperator` (`Library/FortressLibrary.fss:1114`).

Given ⊕, the solution is a one-liner [22:40–23:07]: map every element to a
singleton glob, hit it with big ⊕, extract the water component. "It was
very, very clever to be able to write this solution as a one-liner, once we
built up this very complicated data structure and its associated operations"
[23:10] — the irony is intentional.

In Q&A [55:40–56:55] he concedes the glob merge is not constant-time: the
three-way split is a binary (log-time) decomposition of the outline list,
so combining is not O(1) and the overall delay is "probably the square of
log n". "I'd love to find a way to do better in this
approach."

## Solution 3: monoid-cached tree [23:35–29:15]

Build an explicit in-memory tree over the array whose internal nodes cache
the MAX of their leaves — a "monoid-cached tree", monoid being "a technical
mathematician's term that just means the operation is associative, and that
it has an identity" [23:58]. Fortress code: `trait CachedTree comprises
{NullNode, SingletonNode, PairNode}`; the NullNode holds the identity (−∞
for MAX); construction splits the list into approximately equal pieces with
a comment "parallel recursion here" — "Fortress allows the two expressions
in a tuple expression to be computed independently" [25:35]. **[repo]**
This is the same `maxCachedTree`/`walk` code shown (against a sequential
Scala twin) on JuliaCon slides 18–19; implicit parallelism of tuples and of
binary-operator operands is JuliaCon slide 21/36.

Then a downward sweep passes information left-child→right-child to compute
the left-to-right MAX sweep in log jumps; mirrored, the *same* tree serves
the right-to-left sweep ("the MAX-cached tree itself is symmetric" [27:00]);
careful coding computes both at once. Two pages of code instead of four or
five, no bespoke glob structure, "and it made use of an abstraction, the
monoid-cached tree, that might actually be useful in other settings"
[29:00] — the beginnings of a library routine.

## Solution 4: parallel prefix — the true one-liner [29:15–33:20]

The sweeps are parallel prefix operations (checkbook running-balance
metaphor [29:30]). Abstract them as library operators — MAX with a
left-arrow or right-arrow over it, "a conceptual left-to-right sweep. I'm
not going to see how it's implemented any more than I see how big sigma is
implemented" [30:50]. Then: "Once I have those operators in my library, no
more boilerplate. I have a true one-liner in Fortress here — and this works
in Fortress" [31:20]: zip x with its MAX-prefix and MAX-suffix, and for
each triple `(v, left, right)` sum up `(left MIN right) − v`. This is
exactly the concise solution typeset on JuliaCon slide 9. He names the
structure: "this is a generate step in the yellow, a mapping step... and a
reduce operation, the big sigma. So this is map-reducing math notation. And
I think this is actually a really good way to program, not only in the
large, but also in the small" [33:00] — a pointed remark at Google.
**[repo]** The Library really does ship `opr PREFIX_SUM` and `opr
SUFFIX_SUM` (`Library/FortressLibrary.fss:4480`, `:4485`) — each marked
"`(*) For now, use a sequential implementation`": the interface-without-
commitment the talk advocates, with the parallel implementation left as
future work.

## The argument: deferring the sequential/parallel decision [33:20–40:30]

Is the one-liner sequential or parallel? Deliberately unanswered. Inlining
sequential implementations + loop fusion yields the efficient two-pass
sequential solution (he has done the transformation by hand — "this is
about the biggest program I can do it by hand on" [34:20]); inlining
parallel implementations + "deforestation, which I would describe as loop
fusion on trees" [34:55] yields the two-pass parallel solution of the
monoid-cached tree. "This is the main point of the talk... it's possible to
write solutions to problems that don't have a commitment as to whether to
be sequential or parallel" [35:10], with the decision automated at compile
time or run time.

Accumulation vs. divide-and-conquer, structurally: the accumulator's update
operator has type (solution, input) → solution — *asymmetric*, so its
computation trees are forced linear; superb for one sequential processor
(historical aside [36:20]: CPU registers were called "accumulators" from
Hollerith card machines through the early '70s), and space-efficient. The
merge operator has type (solution, solution) → solution: "Just from its
type signature, you can tell it has the possibility to be associative in a
way that the accumulator combining operation does not. And its
associativity is the key to parallelism" [37:55]. Also: "identifying this
associative combining operator usually lends deeper insight into the
problem" [38:10] — he only saw the monoid-cached tree after first building
the glob machinery.

The algebra glossary in programmer's terms [39:10–40:00]: associativity —
"the way you group them doesn't matter, and that is the key to
parallelism"; commutativity — order doesn't matter; idempotence —
duplicates don't matter (MAX yes, + no); identity — "this value doesn't
matter"; zero — "the other values don't matter. I'm the king, and I trump
everybody else." Such invariants give the implementation "wiggle room"
[40:12] — the freedom to use parallelism, or not, as resources dictate.

## Manifesto, then engineering [40:30–45:15]

"DO loops are so 1950s" [40:59]; linked lists likewise (Lisp, 1950s);
Java-style iterators "still so last millennium" — the iterator API "commits
you to a sequential processing paradigm. As soon as you say, well, first
let's set SUM to zero, you're already hosed" [41:20]. A C/Java for loop is
"probably the worst possible way to say map" [41:35]. This has changed his
own style even for sequential code — to the chorus of critics' voices in his
head (Pixar's "Inside Out" [42:33]) he adds: "are you sure you want an
accumulator? Maybe there's a better way to do this" [42:25].

Parallel languages are typically "a well-known sequential language, and then
bolting on a couple of parallel features on the side. I think it's possible
to do better. **Fortress was an attempt to do that. I think we achieved
partial success, but I think more needs to be done**" [43:00–43:10] — the
talk's central retrospective verdict on the project. Mindset: don't split a
problem into "the first and the rest"; split into equal pieces and merge;
map inputs to singleton solutions and merge those ("that's usually
trickier" [43:40]).

Then the backing-off [43:47]: "I have put forward a rather extreme
manifesto... And I'm going to back off slightly. In practice, engineering
needs to be done." Optimizations: special-case singleton leaves; branching
factors larger than 2 — he cites Clojure choosing 64-ary trees (Clojure's
tries are in fact 32-way): "I'm not sure that 64 is the ideal number, but I
know it's way better than two. It's also way better than 10 million"
[44:35]; self-balancing trees (red-black, finger trees);
parallel near the root, sequential at or near the leaves; arrays at the
leaves; dynamic choice between sequential processing and recursive
subdivision when iterating an integer range — "This is something we were
experimenting with in Fortress" [45:14]. **[repo]** That experiment is the
generator/reducer machinery of `Library/GeneratorLibrary.fss` and the
work-stealing runtime (now on stdlib ForkJoin after the jsr166y retirement
rung).

## Conclusion: parallelism management as garbage collection [45:15–48:10]

Linear-decomposition programs are "very hard to parallelize. I repeat,
someone won a Turing Award for writing compilers to do that. It shouldn't be
that hard" [45:28]. Programs organized around independence and
divide-and-conquer can run either way, "with the decisions being made
dynamically according to available resources" [45:50].

The GC analogy (compare JuliaCon slide 36's "Goal: do for processors what GC
does for memory"): garbage collection also dates to the 1950s, was feared
for decades, went mainstream with Java; we accepted its overheads because
manual management "is so terribly hard" [46:40]. "I argue that the
management of parallelism is very much like garbage collection. It's the
automatic assignment of processors, rather than the automatic assignment of
storage. It's the automatic allocation of code to processors, rather than
data to memory" [46:55–47:08]. Overheads will look daunting, then shrink
without disappearing, as with GC. In a world of wildly varying and
heterogeneous processors (and memories): "I think this is our only hope for
true program portability, and not to have to keep rewriting code every five
years" [47:45].

## Q&A [48:10–1:01:30] — the retrospective material

- **Getting the ideas into existing languages** [48:30]: purely functional
  languages are one strategy for independence, "Haskell, I think, is the
  preeminent example"; "we see now map-and-reduce features that are being
  introduced into Java, for example, that were quite explicitly inspired by
  Haskell. And I know that the Java design group at Sun, and then Oracle,
  has kept an eye on the Haskell evolution for about the last 10-15 years"
  [49:04] (i.e. Java 8 streams/lambdas, from the JCP insider). But bolting
  on leaves the old idioms "tempting the programmers" — "The question is,
  how do you get old things to drop off?" [49:40]. Language evolution and
  decay may beat designing from scratch.
- **The odds he gave Fortress** [49:55]: it's really hard to get a
  full-blown language adopted if it's unfamiliar and new, he agrees — "**I
  gave Fortress only, at most, a 20% chance of becoming big and making it.
  And surprise, surprise, it is in the 80%. But I think we learned a few
  things from it.**"
- **The JuliaCon invitation, before the fact** [50:05]: he has "had some
  inquiries recently from a Julia users group wanting to... hear a talk
  about Fortress, hoping it can inform the evolution of Julia, which is a
  language that has gained more traction and is headed in this direction" —
  this is the genesis of the JuliaCon 2016 keynote, seven months before it
  was given. **[repo]** The two talks are a pair: this one is the
  parallelism lesson in depth; JuliaCon is the full design retrospective.
- **Complexity objection** [50:30]: a Googler notes the concise solution
  "took the better part of half an hour to explain... to a roomful of Google
  engineers". Steele's answer [51:15–54:45]: he hasn't *proved* it correct
  ("you flatter me"); unfamiliarity is an education problem — poll: ~15
  hands knew parallel prefix, all knew Σ; he wrote papers on parallel
  primitives in the '80s at Thinking Machines (Connection Machine)
  [52:40]; and the analogy is the structured-programming revolution — the
  1972 ACM national conference go-to debate, in which he took part as a
  student, with Bill Wulf (BLISS: systems programming without go-to)
  [53:25]. "It's a matter of figuring out what are the relevant
  primitives" and building community consensus; parallel primitives could
  cover "90% of the structuring of our code" as if-then-else/while did for
  sequential code [54:00]. "It's a grand vision. It's the result of
  synthesizing 40 years of experience" [54:21].
- **Grammars are left/right-recursive** [54:55]: only because parser
  generators emit sequential parsers; "If your parser generator were going
  to generate a parallel parser, you might write your grammars... in a
  different way. And I speak from experience. I've actually tried those
  experiments" [55:10].
- **A thank-you from the audience** [56:55]: "I have used a lot of the
  things that you have built over the years. And I just wanted to say
  thanks." — "Thank you. That means a lot to me that you found something
  useful."
- **Which languages carry the torch** [57:30]: "Julia and Haskell and
  Clojure are probably the most widely used languages that are
  intentionally exploring in these directions. I think such exploration
  could also be done in say, Scala. But the Scala community, I think, has
  not made a priority of investigating that dimension." On Python [58:10]:
  he'd be delighted, but the exploring fraction is small; Julia's community
  is small "but they are really pressing in this direction. And they're all
  more popular than Fortress, you know? So help me, Obi-Wan, you're my only
  hope" [58:29]. "I'm just going around talking to all kinds of
  communities, including you, hoping to find some interest. And maybe
  you'll take it in a direction I never thought of" [58:40].
- **Inertia of today's larger community** [58:50]: more inertia, but "less
  resistance today to new ideas" than the fractious 1960s–70s ("Fortran is
  good enough for us, thank you — or COBOL"); he sees "a lot less of the
  programming language, religion wars" [1:00:10].
- **UI programming** [1:00:20]: "part of the problem is that our users tend
  to be sequential. If only we had parallel users, then things might be
  easier" [1:00:53]; HTML designed differently would expose more
  independent parts of a page; "I think there's opportunity everywhere" —
  whether to exploit it is engineering.

## Open items for the slide-aligned redo

- Reconstruct the slides by frame extraction from the video (route 3 in
  `research/README.md`); align quotes to slide numbers as in the JuliaCon
  extract.
- Recover the exact Fortress code for: the three-loop sequential
  `histogramWater`, the glob object/⊕/split, the CachedTree +
  `process` two-pass sweep, and the prefix/suffix one-liner — then try to
  run them on the revived interpreter. **[repo]** JuliaCon slide 9 gives
  the one-liner's typeset form; the rest exists only in this video.
- Check whether the talk's deck is another Archivist DOC_ID on the Oracle
  Labs APEX host (CDX enumeration, `research/README.md`).
