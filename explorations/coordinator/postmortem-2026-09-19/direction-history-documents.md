<!-- The direction history of the compiled-path library decision, reconstructed 2026-09-20
     from the committed documents only, in date order. No transcript was read; a second
     worker reconstructs the same history from the session transcripts. Every quotation is
     from the file and line named beside it, on the tree at the time of writing. Where a
     document priced something the number is quoted; where it did not, the entry says so.
     One line per paragraph. -->

# Direction history, from the documents: how the compiled path's library was chosen

The question this answers: when the project decided how to get microGPT running on the
compiled path, did it choose to grow the compiler's own library without ever pricing what
re-implementing the interpreter's arrays and algebra there would mean, and if so, why.

Two terms, as the documents use them. The **compiler prelude** is `Library/CompilerLibrary`
plus `LibraryBuiltin/CompilerBuiltin` (and, since 2026-09-17, `CompilerAlgebra`), the apis
`fortress compile` implicitly imports. The **library route** is the alternative of making
the interpreter's `FortressLibrary`/`FortressBuiltin` the prelude the compiler checks, so
that the standard library exists once for both worlds.

---

## 2026-08-24 — `explorations/compiled-path-gaps.md`

**What it decided.** That the gap is the library, not the code generator: "what blocks it is
that the compiler path's standard library (`Library/CompilerLibrary.fss`, 592 lines) is a
tiny monomorphic subset of the interpreter's `FortressLibrary.fss` (4,518 lines)" (`:58`).
Its worklist item 3 (`:454-458`) names the real work: "**G1 + G2 + G4** — generic
`Generator[\T\]`/`Reduction[\R\]` plumbing at the `CompilerLibrary` level, then `array`, then
`List` — are the real work. They are one project, not three … what is missing is the ~4,000
lines of `FortressLibrary` built on top of them."

**Alternatives named.** One, and it was rejected on evidence: the dormant top-level
`CompilerLibrary/` directory of `.fsi` stubs. "Overriding `FORTRESS_SOURCE_PATH` to put
`CompilerLibrary/` first was tried and produces *the same ten errors* … So the fix is a real
library-porting job, not a path tweak" (`:162-167`). The library route is **not** named.

**Priced.** ~4,000 lines of `FortressLibrary` to be built on the compiler path (`:458`); the
payoff, measured: "**~6.8× on scalar loops, ~8.9× on object-allocating autodiff-style code,
~8× on startup**" (`:466`), and 5.6× on `tparallel` from a one-line library fix (`:84-96`);
one-time library build 3 min 38 s, per-program compile 1.9-2.2 s, startup 5.1 s interpreted
against 0.67 s compiled (`:22-45`).

**Not priced.** Arrays separately from the rest: G2's entry says only "*Workaround*: none
short of writing a compiler-path array library" (`:189`), with no line count and no mention
of the algebra above `Number`. No comparison against any other route, because no other route
is named.

**Arrays and algebra in the compiler library, costed?** Arrays are inside the ~4,000-line
figure and are not broken out; the algebra layer is not mentioned at all.

---

## 2026-09-08 — `explorations/backend-options.md` (digest of a 2026-08-23 conversation)

**What it decided.** Nothing about libraries. It ranks execution backends — Truffle on
GraalVM first, Native Image second, LLVM third, MLIR as the missing middle — and states the
sequencing rule: "The front end survives every option, so nothing done in the modernization
ladder forecloses any of them." It observes that Fortress's generator/reducer algebra "lives
half-desugared in `FortressLibrary.fss`" because in 2012 there was nowhere else to put it.

**Priced.** Nothing in lines or hours; it carries the 7-9× compiled-against-interpreted
figure from the previous document. **Library route:** not mentioned. **Arrays/algebra in the
compiler library:** not costed.

---

## 2026-09-08 — `explorations/performance-roadmap.md`

**What it proposed.** Two routes, A (the compiler) and B (Truffle), both on a shared Phase 0,
with the compiler route's library work as steps A2 and A6. A2: "`Array1[\RR64,…\]` backed by
`double[]` … Requires the compiler library to gain generic arrays at all (gap G2)" (`:40`).
A6: "**Generic reductions in the compiler library** (gaps G1, G4, G3): `Σ`, `BIG MAX`,
comprehensions, `exp`/`log`. About 4,000 lines of library over generic traits the builtin
layer already declares" (`:48`). Order: "A6 and A2 unblock microGPT at all; A1, A3, A5
deliver the speed."

**Alternatives named.** Route B, whose library step is the opposite arrangement: "B3
**Library on the same nodes**: the 2012 prelude runs through the new evaluator unchanged"
(`:62`) — one library, because the evaluator is rebuilt rather than the library. So one
library for both worlds appears here only as a property of the Truffle route, never as an
option for the compiler route. On whether to run both: "Both is not too ambitious if Phase 0
is shared and the two routes are kept in separate directories."

**Priced.** The 4,000 lines are carried forward for A6. Phase 0.4 counts the library's value
semantics (30 `value object` and 5 `value trait` against 543 `object` and 313 `trait`).
Nothing else in units.

**Not priced.** The array layer separately; the algebra above `Number`; what A2's "specialized
arrays" cost to write; and the alternative of letting the compiler check the interpreter's
library, which is not considered for route A.

---

## 2026-09-15 — `explorations/perf-probes/kernels/REPORT.md`

**What it established.** "**None of the three microGPT-shaped kernels compiles.** All three
fail identically, before codegen, with 77 errors of which the distinct messages are `Array is
undefined.`, `Vector is undefined.`, `Array3 is undefined.` The compiled prelude has no
`RR64` array type of any kind. That is the walking skeleton's first obstacle, and it is one
obstacle, not three" (`:25-28`). And the gap is wider than the ledger had it: "there is no
`Array`, `Array1`, `Array2`, `Array3`, `Vector` or `Matrix` on the compiler path at all"
(`:244-247`).

**What it concluded about the way forward.** "The order that follows from this probe: first
give the compiler library an `RR64` array type (G2) so the kernels exist on that path at all;
then the two one-line defects … then unboxing and `double[]`, which is where the remaining 6×
on array code lives, and which the first step must be designed for rather than retrofitted
to" (`:404-411`). This is the first document to fix the direction as *give the compiler
library the array type*.

**Priced.** Boxing, in Java models: 6.3× (dot product), 6.5× (matrix product), 2.6× (row
lift); the generic array object adds 9%, 1.6%, 4.8% on top; the fairly written compiled
scalar loop 0.4207 s, 9.7× primitive Java, against 9.3441 s for the boxing probe's spelling;
88.9% of the remaining samples under `BaseTask.inATransaction()`'s eager debug string.

**Not priced.** The cost of writing the array type in the compiler library — no lines, no
rungs, no hours. The alternative of the interpreter's library is not named. That alternative
was Pavol's own question and it arrived the next day.

**POSITIONS the same day** (`POSITIONS.md:14`): "The order now on record: the compiler
library's array type first, the two one-line runtime defects second, unboxing designed into
the first."

---

## 2026-09-16 — `explorations/perf-probes/prelude/REPORT.md`

**What it answered.** Pavol's question, quoted at its head (`:5-11`): "Couldn't the path
forward be just to use the FortressLibrary for the compiler as well? What breaks and when?"
This is the library route's only dedicated measurement.

**What it found.** "Almost nothing in `FortressLibrary.fss` is about bytecode generation.
4.7% of it (211 of 4,518 lines) is native bindings … What actually stops 'use FortressLibrary
for the compiler too' is not codegen at all: it is that `compile` turns the type checker
**on** and `walk` leaves it **off**" (`:17-23`). With the prelude flipped: disambiguation
clean, then "**92 errors at TYPECHECK**, in the library's *apis*" and "**A hard crash at
TYPECHECK**, `java.lang.Error: Not yet implemented`, whenever a `nat`-kinded static parameter
has to be inferred" (`:409-421`). "**DESUGAR and CODEGEN: untested.** Nothing got that far."

**What it concluded about the way forward.** Three things in order (`:425-441`): implement
`nat`/`int` static parameters in the checker "— or rewrite the library to avoid them, which
means giving up `Vector[\T,nat s\]`, `Matrix[\T,nat r,nat c\]` and `Array1..3`, i.e. the array
vocabulary the whole exercise wants"; fix or relax the 92 type errors, "a language-design
conversation about `comprises` and exclusion, not a typo hunt"; then port the 108 native
bindings, "~79 of which already have a Java counterpart in `nativeHelpers/`".

**Priced.** 92 errors; the crash; 81 `nat`-carrying declarations in `FortressLibrary.fss` and
58 in its api against 1 in `CompilerLibrary.fss` (that one "declared, and deliberately
**empty**"); 108 native bindings, ~79 with an existing counterpart; 4.7% native, 95.3% plain
Fortress. §4 prices the other direction — what a compiler-side shim would cost: "Reproducing
that is reproducing `NativeArray.fss` and the ~1,000 lines of `FortressLibrary` above it —
not a shim" (`:368-369`). **That sentence is the array slice priced as the library written a
second time**, and it is the sharpest such statement anywhere in the corpus.

**Not priced.** The two routes in one set of units: the report prices the library route in
errors, bindings and one unimplemented checker feature, and prices the compiler-side array
slice in lines, and does not put them side by side or recommend either. It also records one
observation it does not follow up: "The compiler's library is not a smaller library because
someone ran out of time on the arithmetic; it is a library written to stay inside what the
checker can do" (`:227-229`).

---

## 2026-09-16 — `explorations/coordinator/map/README.md` §5 step 2

**What it put on the table.** The two routes, as an explicitly deferred decision
(`:121-123`): "Two routes, Pavol's deferred decision ('fleshing out the standard library',
POSITIONS): (a) the interpreter's library becomes the prelude: it disambiguates cleanly, then
raises 92 checker errors in the tower under the exclusion rules and needs its 108
`builtinPrimitive` bindings redone as `import java` …; (b) the compiler library grows
`AdditiveGroup`/`MultiplicativeRing` above `Number`, then `Array`/`Vector`/`Matrix`/`Array3`
and generic reductions (rows 71-82, 305; worklist item 2, about 4,000 lines by the earlier
estimate of `compiled-path-gaps.md:454-458`; `GeneratorLibrary.fss` is the candidate seed for
reductions)."

**This is the one document that costs route (b) as arrays *and* algebra together**, at about
4,000 lines, and it does so by citing the 2026-08-24 figure rather than by a new count. It
adds where route (b) would start: "Route (b) starts from these, not from a blank file" —
`CompilerAlgebra`, `GeneratorLibrary.fss`, the commented `Maybe`/`Condition`/`Nothing` blocks,
`Fortress.Operators.fsi.INCOMPLETE` and `Library/incomplete/`.

**The phrase that later gets reused.** "Doing step 2 boxed and step 4 unboxed is the same
library written twice" (`:127`) — said of boxed against unboxed storage, not of the two
worlds.

**And the design-intent finding, in the same step** (`:129`): "nothing from the project's own
era argues for a separate compiler world at all (prelude row, 'none found')."

**Disposition.** Neither route is taken: §8 (`:224`) reserves it — "The route for step 2, the
unsealing itself and its tag, the gate decisions of §4 … Those are Pavol's."

---

## 2026-09-17 — `explorations/coordinator/PLAN.md`, and `POSITIONS.md:27`

**What the plan set.** Step 5 (`:41`): "the array types and the algebra above `Number`, with
the representation decided once (`double[]` and `int[]` backings; the probe on generic
instantiation in the class loader comes first)." Step 3 climbs the ladder by adding
declarations to `Library/CompilerLibrary.fss` or `LibraryBuiltin/CompilerBuiltin.fss`.

**The fork, reserved rather than decided** (`:49`): what stops the climb is "a design fork
(the array representation, boxed against `double[]`/`int[]`; **the library route, the
interpreter's library as prelude against growing the compiler library beyond what one rung
needs**; any change of semantics against the spec; deleting a test to get green)."

**What the owner accepted** (`POSITIONS.md:27`, 2026-09-17): "Order he accepted: the
compile-path ladder baseline first …, then the two one-line runtime fixes, then `nat`
checking, **then the compiler library grown from the team's own drafts**, test-driven."

**Priced.** Nothing about either route; the plan prices process (a rung, a gate, a batch)
elsewhere. **So the working direction — grow the compiler prelude — is fixed here, with the
library route reserved as a stop condition rather than as a choice to be made.** The
accepted order names growing the compiler library; the alternative to it is, from this point,
something that interrupts the climb rather than something the climb is chosen over.

---

## 2026-09-17 — `next-climb.md` and its three surveys

**`next-climb/candidates.md`.** The measurement that the fork-free work has run out
(`:7-13`): "Fourteen candidate rungs are free of the array-representation fork and the
library-route fork, and all fourteen of them together clear the disambiguate wall for **38 of
the 139 `tests/` files that stop there**"; "**104 of the 303 non-passing `tests/` files** are
gated directly on the array representation, the `nat` static parameters that the array types
need, or the generic generator and reduction tower." Its verdict (`:202`): "**most remaining
value is behind the array fork and the library route. The next climb is small, and the fork is
the real gate.**" Its recommendation (`:206-210`): run one batch of four, "Then put the two
reserved forks in front of Pavol as the next item rather than climbing further … Both are on
record as his; both now have a measured price for leaving them open, which is 104 files."

**`next-climb.md` §3a.** Three array shapes with what each costs, and the entanglement
(`:88-98`): shape 1, "generic and boxed … the only shape that makes the library route (the
interpreter's collections as prelude) coherent"; shape 2, "monomorphic and unboxed … what the
2012 team actually shipped in this world", needing no `nat` checking but "the target program
is not written that way"; shape 3, "generic type with a specialized representation", whose
obstacle is that "instantiation renames, it does not change representation". Then: "**The fork
stays open here.** Naming three shapes is not choosing one, and the second reserved fork — the
library route … is entangled with it."

**§6, the one experiment it asks for on the library route** (`:178`): "The library route's
price is ledger 308: with the interpreter's prelude made the compiler's, disambiguation passes
with zero errors and the checker then reports **92 errors at 95 locations in the library's own
apis**. Experiment: classify those 92 by cause … and count how many are one shared defect,
which turns an unknown into a number before the route is chosen." **That probe was not run
until 2026-09-20.**

**`next-climb/worlds.md`.** Establishes that the two worlds are separable — "No route was
found by which an edit confined to `Library/CompilerLibrary.fss` … can change the result of
any test `ant testSystem` runs" — with two named exceptions, and a four-clause rule for
dropping `testSystem` from a compiler-world-only batch. It prices the saving at 147.6 s a
batch. It treats the separation as a property to exploit, not as a cost.

**`next-climb/provenance.md`.** Measures where the last climb's solutions came from
(`:75`): "the interpreter's library was the source of truth about ten times as often as the
specification's prose", and (`:121`) "the brief encoded the interpreter's library as the source
of truth. The lever for the next climb is the brief, not the worker." Its §9 asks "Is the
interpreter's library the right default" and answers: keep it as the default *precedent* for
shape and spelling. The question of whether the interpreter's library should be the prelude
rather than the model is not asked here.

**Priced across the three.** 104 files behind the forks; 38 files from all fourteen fork-free
rungs; 92 errors as the library route's known price; 54 minutes a rung, 58.2 minutes saved
over eight rungs by batching. **Not priced:** what route (b) would cost in rungs or lines,
anywhere in these four documents; the 4,000-line figure is not carried into them.

---

## 2026-09-17 to 19 — the batch documents

`batched-climb-plan.md:216`: "The design forks that stop the climb and belong to Pavol: the
array representation, the library route, any change of semantics against the spec, deleting a
test to get green." `:94` adds that a design pass concluding one of these is reached triggers
"that existing fork … not a new one invented here."

`batched-climb-review.md` attacks the batch design in fourteen findings and none is about
which library; its one reserved-fork finding (`:91`) is about per-edit against per-batch
gating.

`REPAIR-BATCH.md:69,73`: "No further library name rungs. `next-climb.md` §0: 104 of the 303
non-passing tests are gated on the reserved forks, while all fourteen fork-free rungs together
move 38 files, so more small rungs are not where the value is." And: "No decision on the two
reserved forks. The array representation and the library route remain Pavol's."

`CLIMB-BATCH-1.md` (2026-09-19) ranks four rungs by what the target program names, and keeps
`Maybe` "for its cascade value (59 of 139 disambiguate files, the prerequisite of every
collection rung **and of the library route**)" (`:11`). Its closing list (`:78`) repeats: "The
two reserved forks, untouched."

`batch-2-open-decisions.md` A5 (`:29-30`): "no array type can be declared before the
representation is chosen …; `ImmutableArray` and `LexicographicOrder` wait on the library
route"; default "batch 2 is fork-free only". B8 (`:54`): "the library route is entangled with
the representation … Default: commission the sketch and the `nat` shadow prototype now."

`CLIMB-BATCH-2.md:7,15`: "The array design is the real path to microGPT; this batch is what
can be done without waiting for it"; "microGPT does not move one phase … the wall is arrays. …
If that is too little to spend a gate on, the alternative is to skip the batch and wait for the
array sketch; that is Pavol's call."

`process-decisions-review-1.md:238` records the compounding cost of the direction, on one
rung: "reversing 331 is not a rung but a fork with a growing bill" — the `Maybe` spelling
chosen for the compiler world is now pinned by a gated test.

**Priced in this group.** Process only: rung 54 minutes, batch 3-5 hours, the 58.2-minute
saving, batch 1's measured 3 h 11 min / 15 agents / 3.02 M tokens (FACTS `:113`). **Library
route:** named in every one of these documents, and in every one it is deferred, not weighed.
**Arrays and algebra in the compiler library:** not costed in any of them.

---

## 2026-09-19 — the owner's rulings, `POSITIONS.md:39-40`

Two rulings and a method. On where extensions go (`:39`): "all the extensions that [microGPT]
invented need to go directly to the standard library in the spirit of the standard library",
with "study the existing parts of the Fortress library meticulously, and use those patterns
for extending the standard library in the native way". On storage and sizes (`:40`): "we must
go to double array for performance … If this should have been high performance language, it
cannot be boxed", and "I don't know [that] we can sidestep the nat issue. That is a central
design point that they are using."

The commit that applied the first ruling, `02d09a39f`, edited `Library/FortressLibrary.fss`
and `.fsi` — the **interpreter's** library (`postmortem-2026-09-19/array-work-brief.md` §1).
Neither ruling says which world's library the compiled path uses.

---

## 2026-09-19 — `explorations/coordinator/array-design.md`

**What it decided, in one line, in §7** (`:179`): "Where microGPT's 26 operations go is not a
question after the third ruling: into `CompilerLibrary` in the library's own style."

**What it priced.** Option (a), the rejected boxed port (`:63`): "about 1,200 lines of trait
layer moved into `CompilerLibrary` over an `Object[]` native class; the fastest route to 'the
kernels compile'; the 6.3-6.5× kept; unboxing afterwards a second storage class under the same
traits, 'the same library written twice' (`map/README.md:127`)." Option (c), the chosen
default, is costed in rungs, not lines (`:87`): "one `.java` rung (store class, factory helper,
the non-generic store trait, full gate), one library rung (the trait layer in Fortress,
`testFast` alone), then the native operations as in (b)". The measured boxing costs are carried
in (6.26×, 6.53×, 2.59×; the generic array object 9%, 1.6%, 4.8%), and the probes of §9 are new
(stamping renames, `nat` in a type crashes, `nat` in value position loses its class).

**What it did not price.** The algebra above `Number` in the compiler world — `AdditiveGroup`
and `MultiplicativeRing` are not mentioned in the document at all, although `Vector` in the
interpreter's library extends `AdditiveGroup`. The library route is not named anywhere in it.
It does not compare its chosen world against the interpreter's library; the 1,200-line figure
is attached to the rejected boxed option, not to the route.

**Disposition of the library route.** Closed by omission, in one sentence, inside a worker's
design document.

---

## 2026-09-20 — `explorations/reviews/array-design-review.md`

**Decisive 3** (`:37-45`) reopens it: "The second reserved fork, the library route, is closed
by default in §7, against the ruling as it was applied the same evening." It states what the
compiler-world route means, "which the design does not say": "The compiler world has no
`AdditiveGroup` and no `MultiplicativeRing` …, no `Indexed`, no `ReadableArray`, no `Array`;
`Vector[\T extends Number, nat s0\] …` cannot be declared 'as the team designed' without the
algebra above `Number` being written a second time in that world. From then on the standard
library exists in two texts … the map's warning 'the same library written twice'
(`map/README.md:127`) was about boxed and unboxed, and it applies here unchanged." And:
"Severity. A reserved fork decided in one line of a worker's document, which `POSITIONS.md:48`
says is a decision not made."

**Decision C** (`:155-163`) puts the three ways in front of the owner: (C1) the compiler world,
(C2) the library route, (C3) "One text, two bindings … whether the two worlds can share a
prelude file is unprobed". What it changes: "whether the standard library exists once or twice
from here on … the 92 tower errors and 108 native bindings of the library route (FACTS) against
the second copy of about 1,200 lines plus the algebra." "Default: none can be labelled; this is
the reserved fork and it is Pavol's. The cheapest fact before deciding is the classification of
the 92 errors."

**Priced.** The first side-by-side statement of the two prices: 92 errors + 108 bindings
against ~1,200 lines + the algebra. Also new measurements against the design's "natives first"
default: an unboxed store read through a boxing accessor is 8.9× and 6.6× primitive, against
boxed storage at 6.4× and 6.2× — "The store buys nothing until the traffic is unboxed."

---

## 2026-09-20 — `explorations/coordinator/two-libraries.md`

**What it establishes** (evidence brief, recommends nothing). The split's origin and its own
words: born 2008-12-19, "Preliminary version of stripped-down minimalist fortress library for
first crack at compilation"; the switch comment still in the tree, "**Hopefully temporary hack
as we work on importing java objects cleanly**"; the team's own word for its contents,
"bogus" (2009) and "bogo-trait" (2012); "**The specification knows one library, not two**";
"**What no source says.** No commit message, no README, no text under `Papers/`, no spec
`\note{}` states an intention to compile the full library one day, or any plan for ending the
split."

**The three routes, costed in one set of units** (§4). (a) Keep growing the compiler prelude —
its own heading is "**the standard library written twice**": costed by what it has done, "eight
rungs moved the compile-path pass count from 59 to 81 of 410 corpus files, +22 … thirteen
revival commits grew the four compiler-prelude files by 298 lines", forecast 38 more files;
"the route runs out before the target program, and every declaration it writes is the copy the
other two routes would delete". (b) One library, the interpreter's: `nat` kinds in the checker
(PLAN step 4), then 93 errors at 48 sites — of which C, D and F at 18 sites "are ordinary
library edits, a batch or two" and A, B and E at 27 sites "are not edits but a language-design
conversation" — then 339 native bindings of which ~79 of 108 already have a counterpart.
(c) One text, two bindings: the same 93 errors and the same `nat` gap, plus three desugaring
settings and four well-known types; its first experiment is "one probe … at roughly half a
worker session".

**New measurement.** The 92 became 93 at 96 locations across 48 sites, re-run on the current
tree; the extra one is the revival's own `comprises { ZZ }` of `02d09a39f`. And the two
libraries' overlap counted: 183 top-level declarations in the compiler world, 276 in the
interpreter's, **75 in both**; "**201 exist only in the interpreter's**: the array and range
vocabulary …, the reductions and generators …, the algebra above `Number`".

---

## 2026-09-20 — `explorations/coordinator/library-route-judgement.md`

**The decision** (`:65`): "make the specification's default library, `FortressLibrary` and
`FortressBuiltin`, the compiler's prelude, and delete `CompilerLibrary`, `CompilerBuiltin` and
`CompilerAlgebra` when the switch-over lands; from now on no declaration goes into the compiler
prelude, and codegen rungs continue."

**Why the reasons for two did not hold.** §1 takes each in turn — the sandbox the interpreter
cannot see ("True … and never used: every batch gate has run `testSystem` anyway"), the two
native mechanisms ("a reason for two *binding* files, not two libraries"), the desugaring
settings ("the compiler's setting is the spec's"), the checker's `nat` gap ("Blocks every route
equally, growing the copy included"), the 27 exclusion sites ("The compiler world avoids this
today only by keeping its tower flat …, the bogo-trait; a copy grown 'in the library's own
patterns' would meet the same rules").

**The price of the route not taken** (`:57`): "Growing the copy to the same target costs the
copy itself, the array layer and the algebra above `Number` written a second time (about 1,200
lines plus `AdditiveGroup`, `MultiplicativeRing`, `Indexed`, `ReadableArray`, finding 3), at
least three batches; plus the same `nat` rung, the same A and B, the same exclusion rules as its
tower grows; and never the checker on interpreter programs. It is cheaper only for the 38 files
it can move by one phase." Against it, the route taken: "about four to five gated batches and
four worker sessions" to one checked prelude, "The array work after it is the same under any
route."

---

# Summary, on one screen

**Where the direction was fixed, in four steps.**

1. **2026-08-24, `compiled-path-gaps.md`.** The gap is named as the compiler's library and the
   remedy as porting ~4,000 lines of `FortressLibrary` into the compiler world. No alternative
   route exists in the document, so none is weighed.
2. **2026-09-15, `perf-probes/kernels/REPORT.md`.** "First give the compiler library an `RR64`
   array type (G2)" becomes the order, and `POSITIONS.md:14` records it the same day. The
   library route had not yet been measured; it was the owner's question the next day.
3. **2026-09-16/17, `map/README.md` §5 step 2 → `PLAN.md`.** The map states both routes and
   prices route (b) at "about 4,000 lines"; the plan then reserves the library route as a
   *stop condition* while the accepted order (`POSITIONS.md:27`) says "then the compiler
   library grown from the team's own drafts". From here the compiler world is the default
   the climb runs on, and the alternative is something that would interrupt it.
4. **2026-09-19, `array-design.md` §7:179.** "Where microGPT's 26 operations go is not a
   question after the third ruling: into `CompilerLibrary` in the library's own style." The
   reserved fork is closed in one line of a worker's document, with no comparison, and the
   review of 2026-09-20 reopens it as decision C.

**Was re-implementing the interpreter's arrays and the algebra in the compiler's library ever
priced?** In lines, three times, and never in the same units as the alternative until
2026-09-20: ~4,000 lines for the whole library layer (2026-08-24 `:458`, repeated at
`performance-roadmap.md:48` and `map/README.md:123`); ~1,000 lines for the array slice alone
(2026-09-16 `prelude/REPORT.md:369`); ~1,200 lines for the trait layer (2026-09-19
`array-design.md:63`, 2026-09-20 `library-route-judgement.md:57`). The **algebra above
`Number`** — `AdditiveGroup`, `MultiplicativeRing` — appears in the cost only twice: inside the
map's route (b) sentence of 2026-09-16, and then not again until the review's Decisive 3 and
the judgement of 2026-09-20. `array-design.md`, the document that closed the fork, does not
mention it. Between 2026-09-17 and 2026-09-19 the planning documents priced the *climb*
(rungs, batches, files moved: 104 behind the forks, 38 reachable) and did not price either
library route at all.

**The earliest document that already contained the information that the array slice would be
the library written twice.** `explorations/compiled-path-gaps.md`, 2026-08-24, has it in two
places: G2's "*Workaround*: none short of writing a compiler-path array library" (`:189`) and
worklist item 3's "what is missing is the ~4,000 lines of `FortressLibrary` built on top of
them" (`:458`). Its sharpest form, and the first with the array slice separated out and
counted, is `explorations/perf-probes/prelude/REPORT.md:368-369`, 2026-09-16: "Reproducing that
is reproducing `NativeArray.fss` and the ~1,000 lines of `FortressLibrary` above it — not a
shim." That report was written to answer the library-route question, and its §5 gave the
route's price; the number for the other side of the comparison was in the same file, three
sections earlier, and the two were not put together until `two-libraries.md` §4 and
`library-route-judgement.md` §3, 2026-09-20.

**One further fact that sat unused.** The map recorded on 2026-09-16 (`:129`) that "nothing
from the project's own era argues for a separate compiler world at all", and
`prelude/REPORT.md:227-229` that the compiler's library "is a library written to stay inside
what the checker can do". Both were available to every document listed above; the history
sourced from them is `two-libraries.md`, four days later.
