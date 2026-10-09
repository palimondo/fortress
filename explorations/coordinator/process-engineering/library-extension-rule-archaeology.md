<!-- Where the library rule of the fortress-repo skill ("Put each extension into this library, outside the compiler's files") comes from: the curator's words of 2026-09-19 18:31 UTC, the question of 2026-09-15 they answered, the later one-library decision, and a restatement for the skill's next revision. -->

# The rule "put each extension into this library", with its context

Written 2026-10-09 for the curator and the coordinating session. Dates are 2026, times UTC. Every quotation of Pavol is verbatim from a transcript (speech-to-text slips kept), with the transcript and line it comes from.

## 0. The short answer

His sentence of 2026-09-19 18:31 UTC was not about where a stray model-only helper goes. It answered a debate of that hour over how the model program's array operators could be made legal. He said: do it the way the standard library does it, and put what the model program invented into the standard library "in the spirit of the standard library". "Outside the compiler's files" is not in that sentence. It comes from a later decision, the one library (2026-09-20 14:39, confirmed 2026-09-21 02:40). The skill's wording merged the two and left out the qualifier "in the spirit of", which he spelled out the next morning (2026-09-20 07:20): the extension has to be a general shape with a precedent in the library, not a form made for the model.

## 1. 2026-09-15: the open question

### Sources

The 2026-09-15 exchange is not in the coordinating session's own transcript. That session (`fe616d40-…`) has records for 09-08, 09-09, 09-14, then 09-18 onward. The 09-15 session is the earlier archived one, `bdff267d-67dc-5bb9-b970-8c3dfaa634b6`, on the `transcripts` branch (`origin/transcripts`, `projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl.parts/001.jsonl`). It is not on `transcripts-blinded`. Line numbers below are lines of that part file. The 2026-09-19 and later exchanges are in `fe616d40-…until-2026-10-08T15-41.jsonl.parts/000.jsonl`.

### What the extensions were

The model program's vocabulary was a component of its own, `FlatArrays` (C4: `explorations/run-c4/src/FlatArrays.fsi` and `.fss`; the APL focused base had a smaller copy, `FlatArrays2`, in `apl/mg/`). The run's brief had told the worker that "everything you need beyond [the shipped library] is user-level code in your own component" (`explorations/reviews/c4-flatarrays-review.md` §2). The review of 2026-09-19 inventories it (`reviews/c4-flatarrays-review.md` §1): 38 declarations, of which 5 are aliases of library calls, 26 are new operations over the library's own `Array`, `Vector`, `Matrix` and `Array3`, and 9 are new structures (eight view objects and `Diag`). The 35 new things (26 operations and 9 structures), by family:

| family | declarations (names in `FlatArrays.fsi`) |
|---|---|
| scalar extension of `RR64` arrays | `+` and `-` with a scalar in both orders, `MAX` with a scalar |
| elementwise algebra | `×`, `/` (array by array and by scalar), `>`, `SQRT`, `exp`, `log` |
| rank-3 algebra | plane-wise `+` of a matrix to every plane of an `Array3`; batched product of two `Array3` |
| the diagonal | `Diag`, `diag`, `Diag` times a matrix |
| views (the 9 structures) | `view`, `row`, `row3`, `heads`, `unheads`, `plane`, the transposes |
| the row lift | `rows`, four overloads |
| keys | `gather`, `onehot`, `pick`, `flat` |

The library had almost nothing of this: scalar extension only for integer arrays and only `+ - MIN MAX`, no elementwise `×` or `/`, no rank-3 algebra, no `gather`, no `rows` (§2 of the same review).

### How the question came up

On 2026-09-15 he reviewed `FlatArrays.fsi` (40 declarations at the time). At 08:25:05 he wrote (line 10420):

> It looks like our extensions are working with specific type combinations here. And it seems like we are not expressing a generic form that could collapse the number of needed definitions. Do we have a good reason? Like this all looks like the code after type inference and specialization. For our specific use case. So my general feeling is just that if we are trying to express some extension of a functionality to standard fortress types, we should not be limiting the definitions and implementations to our specific cases. And I think what I see here is mostly operator operator overloading, etc. And I am not seeing this this fortress specific Uh, algebraic type definitions that give us traits for free.

At 10:42:06 (line 10966), after the coordinator had explained Ring and Field and the finding that the shipped `RR64` does not satisfy the specification's `AdditiveGroup`:

> I think that fleshing out the standard library is one very important task to close it. So, the bug that you found in the algebraic constraints, what was it? That the uh, shipped RR64 does not even satisfy the specs additive group. Like, we should. First, finish that one and then apply those principles and, and go to the higher dimension. [...] Extending the, the library flavor that was given with the existing things like the additive glue, group, multiplicative ring, etc. Uh, like I'd like to see that shape of the library extended so that the expression expressing the machine learning concepts with the matrices and tensors have the mathematical rigor that this flavor of library construction promises.

### The two choices, as the coordinator put them

At 10:45:07 (line 11020):

> **"Fleshing out the standard library."** Recorded as your position. One question only you can answer, and I have not assumed the answer: the standing rule is that `Library/` is never modified, and this direction reads as modifying it. The alternative is building the algebraic layer in our own tree, over the shipped traits, which is what every run so far has done. Worklist item 4 is literally "unseal the linear-algebra layer", five rows. Say which.

At 11:02:11 (line 11056), among three items waiting on him:

> 2. Whether "fleshing out the standard library" means editing the sealed `Library/`, which the standing rule forbids, or building the algebraic layer in our own tree over the shipped traits.

So the choices were:

- **Edit the sealed `Library/`.** The standing rule came from 2026-08-30 11:11:46, when the coordinator offered to unseal `Number` by one token and he answered "We are not unsealing anything!!! You’re again claiming something is impossible with your self imposed constraints." (line 1414). The exploration treated the original tree as a historical artifact (his words of 09-16, below).
- **Build it in "our own tree".** That meant what every run had done: the project's own components next to the shipped library (C4's `FlatArrays`, the focused base's `FlatArrays2`), over the library's traits, with `Library/` untouched. The coordinator's default, recorded at 10:44 (`POSITIONS-history.md:19`), was this one "until he says otherwise".

At 2026-09-15 21:14:56 he answered the three items (line 11066):

> 1. ?!?
> 2. Later
> 3. Yes

On 2026-09-16 22:43:26 he already spoke of the change as coming (line 12007): "as we go into unsealing the library and we start changing what the fortress is. Uh, until now we've approached it as, as a historical artifact". On 2026-09-17 the tree was tagged `sealed-tree` (`75cca6683`) and later commits were allowed to edit the original sources, test first (`POSITIONS-history.md:25`). Whether the library was meant was still the open item until 09-19.

One more thing from that night bears on later wording. He said "the standard library" in the singular on 09-15 at 10:42. By 23:21 that night he was asking about the compiler's own library (a prelude of 592 lines against the interpreter's 4,518): "What’s the compiler prelude that is so lacking?" (line 11266). At 23:51 he proposed the single library himself: "Couldn’t the path forward be just to use the FortressLibrary for compiler as well? What breaks and when?" (line 11326).

## 2. 2026-09-19: his message

### What led to it, 16:55 to 18:31

- 16:55:12 (line 6691) and 17:01:32 (line 6707), on the proposal to rename C4's `MAX`: "I don't think the fix is a rename. The fix is to compose the algorithm using the standard array operations. What am I missing?" A separate worker, which he asked for, wrote `reviews/c4-flatarrays-review.md`.
- 18:13:00 (line 7169), on a repair that rewrote `mask + (qh kh^T) / SQRT (1.0 headDim)` as `planeSum(mask, ...)`: "NO. NO! NOOOOO! That's not Fortress!"
- 18:21:22 (line 7221), on the coordinator's statement that the interpreter accepts at most one user-written `+` with array or float operands beside the library's own: "Isn't the defining feature of Fortress this special type of dispatch? If I have operand and there are different types on each end, those are different implementation. How can they conflict with each other? [...] We, we are, in Fortress we are defining this whole numeric tower and the basic types and we must be able to compose them in, in normal mathematical ways. That, that, that is the whole purpose of the language. I don't understand what the issue is."

### The coordinator's message he answered

At 18:22:33 the coordinator told the C4-operators worker to add a fourth route, D: declare in the library that numbers and arrays exclude each other. At 18:22:49 it answered him (the message of that hour that named the exclusion):

> The mask is a matrix, T by T. [...] So C4 declares its own `+` for matrix plus 3-D array, and its own `+` for array plus scalar, because the library has no scalar extension for float arrays either. [...] It exists only where a trait says `excludes`. Nothing in the library says a number is not a 3-D array. [...] So your intuition is right and the language is unfinished. A mathematician assumes a scalar is not an array. The library never told the language so. The correction that honours your point is in the library, not in C4: declare that the numeric types and the array types exclude each other, and C4's declarations pass as written, zero lines changed. I have added exactly that as a fourth route for the worker to probe, ordered first if it passes. The mask-as-object route and the interpreter-check route stay as fallbacks.

At 18:25:24 its batch-2 message ended: "Still running: the worker probing the four ways to keep C4's operators as they are." Afterwards, at 18:32:33, the coordinator said of this explanation that it "came from the reviewer's reading of the specification and not from the library's practice".

### His message, 2026-09-19 18:31:44 UTC

(Part 000, line 7304; queued at 18:31:43.973.)

> I hope the C4 operators worker is a fable with fresh context. Because from all these debates, I have like, okay, I know nothing about the spec, but I think you profoundly misunderstand how the language works. Like, I think you were hinting at, at the correct so solution with the exclusion. Like, it is a practice that is all over the standard library, and it looks like you are designing solution without the full context. Like, the the worker that does it should like study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way. And the same goes with the micro GPT's use of like all, all the extensions that it invented need to go directly to the standard library in the spirit of the standard library.

Next to it, same hour:

- 18:32:48 (line 7326), on the array design: "And for the arrays, like I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using. And yes, we must go to double array for performance. There is again no question about this. If this should have been high performance language, it cannot be boxed."
- 18:32:11 the coordinator relayed his words to the worker. 18:32:22 it recorded them (`219920545`). 18:32:33 it replied to him: "That also closes the question from 2026-09-15 of whether the library itself may be edited. It may."
- 18:44:35 the coordinator told him, of the revised array design: "One thing the worker settled on its own from your ruling: the twenty-six invented operations go into the compiler's library in the style of its existing integer scalar-extension block. The interpreter's library gets the same in the C4 repair. Say if that is not what you meant." No reply to that sentence is on record. The array design of that hour says why: "Where microGPT's 26 operations go is not a question after the third ruling: into `CompilerLibrary` in the library's own style" (`explorations/coordinator/array-design.md` at `d55aa91a6`, line 179). So at the time of the ruling the rule did not yet exclude the compiler's prelude.

## 3. How it was carried out

### 2026-09-19: the scalar extension and the tower

The worker probed the four routes on empty caches (`explorations/run-c4/cold-cache/operators/`). The two user-side routes failed (the mask as an object is not buildable, the interpreter-check route is refused by the specification under either reading). The library route worked. Its survey of how the library declares disjointness is `operators/D/SURVEY.md` (three patterns: `excludes` between concrete families, placeholder traits such as `AnyMultiplicativeRing`, closed `comprises` chains on the numeric tower). Landed as `02d09a39f` (2026-09-19 20:24), in `Library/FortressLibrary.fss` and `.fsi`:

- the integer scalar-extension block for `+ - MIN MAX` becomes eight generic declarations over `T extends Number`, both operand orders (`Library/FortressLibrary.fsi:2681-2691` today);
- `AnyIntegral comprises { ZZ }`, closing the tower's one open link;
- a marker trait `AnyAdditiveGroup`, on the pattern of `AnyMultiplicativeRing`;
- `Array3 excludes { Number, String, AnyAdditiveGroup, AnyMultiplicativeRing }`.

C4 dropped its six scalar declarations and, at that time, its diagonal product; `MicroGptFlat.fss` stayed byte for byte (the diagonal's product came back as an override of `mul` on `Diag extends Matrix`, `POSITIONS.md:79`). The tower clause was later reshaped by the flattening (`FACTS.md:67`, `POSITIONS.md:44`).

### 2026-09-20 07:20: what "in the spirit" means (his message)

(Part 000, line 7997.) Asked what was moved, he wrote:

> I am okay with C4 and APL base now being simpler because something has moved to the standard library, but I want to specifically know what was moved to the standard library, and I want to be judge of whether it is like. It needs to be proven to me that the extensions that we did are completely in the spirit of the library. I don't want that we extend the library f with some uh, forms that are specific to our use case in C4. APL micro GPT like the point of a standard library is to have generic reusable shapes that allow building a stuff like micro GPT easy so there I think I, I need like a very detailed design review because As long as the extensions that we did have a precedent in the library itself, I, I'm fine with that. Like, if we are taking patterns from natural numbers or in, in integers and extending them to float, that's perfect. That is exactly what I will be after. [...] And I don't want that we invent some kind of one of reinterpretations for the context of micro GPT. It must be the other way around. Like we have a use case which should clearly show the benefit of the Fortress library modeling system because we get an easy we get easy time implementing the micro GPT on top of the library [...]

He added that a line the team left commented out must be assumed to have been left for a reason. The coordinator (07:21:32) took that as the standard: "Extensions earn their place by precedent in that library, integer patterns lifted to floats being the ideal case. microGPT is the demonstration of the library, never the reason to bend it." An Opus reviewer, blinded from the workers' arguments, judged the four changes (`explorations/reviews/library-scalar-extension-review.md`: three "in the spirit of the library, with precedent", one "defensible, with the tower's own pattern as precedent [...] but not yet proven"; none a one-off). At 13:57:41 he said: "Good. That calms my biggest fears. So we just fixed uh, small defects in the library that allowed us to express the C4 without having to re-implement the gaps in user space." On 2026-09-21 he approved all four: "Others approved" (02:26:08) and, for the tower clause, at 17:08:18 (line 9903): "There, there was a tracer and whatever it recommends, let's do that." (`POSITIONS-history.md:64`, `:554`).

### 2026-09-20 and 09-21: one library

- 2026-09-20 14:39:06 (line 8522): "Like, I fully believe that the compiler second library is just a bootstrap and we need to get rid of it. Like, I don't even think that is a question that's worth deliberating about alternatives. Like, what, what would be a reason to re-implement the thing from, from the compiler?"
- 2026-09-21 02:34 the coordinator listed "the library decision" as still to prepare. At 02:35:47 he answered (line 9643): "2. What’s decisions there to make that want ahead make?!?" At 02:36:16 the coordinator said it was already made, and gave its reading of what it means:

  > **From now, no declaration goes into the compiler's own library.** The fourteen small "add a missing name to the compiler prelude" rungs still on the ladder stop. Code-generator rungs continue, because they are compiler work under any library.
  >
  > **At the switch-over, the three compiler prelude files are deleted**, not kept as a sandbox. Their tests stay.

  At 02:37:02 he wrote "That wasn’t already made" (autocorrect for "was"); the coordinator reverted its record (`8fcca6703`). At 02:40:19 he wrote:

  > Fuck. I was just correcting autocorrect, while you’re previous answer was in flight. You decoded it correctly. Disregard it as sparse message. Don’t revert!??

  It was reinstated (`3e85b709c`, 02:40:29). Recorded in `POSITIONS.md:37`, "The library route", and `POSITIONS-history.md:557`.
- After 2026-09-21 the prelude files changed only in bodies and bindings of existing declarations (`6bec1b004`, 09-23; `ce0c7f453`, 09-24); no declaration was added.

### Where each family stands today

The library has the scalar extension and the `Array3` exclusion. The rest of the 26 operations and the 9 views are still in `explorations/run-c4/src/FlatArrays.fsi` (56 lines), the other families of §1's table. The worker of 2026-09-19 left a plan for housing each in the library's patterns, "plan, not a migration" (its hand-back, part 000 line 7380): elementwise operators as `[\T extends Number, I\]` in the scalar block's section with `map`/`ivmap` bodies; views as objects extending `Matrix`, `Vector` or `Array3` on `TransposedMatrix`'s pattern; `gather`, `onehot`, `pick` as `fill` factories; `flat` and `rows` with no precedent. The migration has not started. The sized signatures are the parked decision D (`reviews/decision-d-diff.md`, phase 5), and the array-design questions went back to him on 2026-09-25 with "the library's own way first" (`POSITIONS-history.md:644`). The reinforcement of 2026-09-24 18:30:37 (part 001 line 2661): "Okay, agreed. That is the plan. And now a uh, critique. Like, why the fuck did I have to invent this solution? Why wasn't it obvious to you or the workers?" The coordinator tied the skipped step to "his rule of 09-19 that the library's practice is the standard" (`POSITIONS-history.md:148`).

## 4. What "outside the compiler's files" adds

It is not his word. His words of 09-19 say "the standard library", and the same hour's array design read the ruling as putting the 26 operations into `CompilerLibrary`. The restriction came from the library route: his belief of 09-20 14:39 and the coordinator's reading of it on 09-21 02:36, which he confirmed at 02:40.

The skill had the two rules apart until 2026-10-08. Before `24af7743b` (library.md, "Designing a change"):

> Put extensions into this library itself, never into a separate library tree of our own. Do not add a declaration to the compiler's prelude.

The first sentence answers the question of 09-15 ("our own tree", the second choice, refused). The second is the library route. The rewrite of 2026-10-08 22:54 merged them into "Put each extension into this library, outside the compiler's files." and made "This includes an extension that only the model program needs" out of "the extensions that [microGPT] invented". It lost two things: the plain refusal of a tree of our own, and the qualifier "in the spirit of the standard library". "The compiler's files" is defined at the head of `library.md` (the `Compiler*` files of `Library/` and `LibraryBuiltin/`: `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, `CompilerBuiltin`), but not at the sentence.

Why the sentence reads strangely: "an extension that only the model program needs" invites a worker to add whatever the model uses, in the model's shape. On 09-20 07:20 he refused exactly that ("forms that are specific to our use case").

## 5. Restatement

1. **Where.** An extension that Fortress's library lacks and a program needs, the model program's included, goes into the standard library: `Library/` and `ProjectFortress/LibraryBuiltin/`, the interpreter's library. It does not go into a component of the program, a library tree of our own, or the compiler's prelude (the `Compiler*` files), which takes no new declaration and is deleted at the switch-over. *Rests on:* his 2026-09-19 18:31 words and the coordinator's "It may" (the library may be edited), and the one-library decision (09-20 14:39, 09-21 02:40).
2. **How.** Write it as a general shape on the library's own pattern, with a precedent line you can cite: an integer pattern lifted to the other number types, a marker trait and `excludes` as the library writes them, a view as an object that extends `Matrix` or `Array3`. Study the library's existing parts first. A form made only for the model's use case is not the library's way; if no precedent exists, put the fork to the curator with the library's own way first. *Rests on:* "study the existing parts of the fortress library meticulously, and use those patterns" (09-19 18:31), "in the spirit of the standard library" (09-19 18:31), "generic reusable shapes" and "a precedent in the library itself" (09-20 07:20).
3. **What stays fixed.** The model's text is not changed to fit: its operators stay operators. The edit is made test first, like any edit of the original tree. *Rests on:* "That's not Fortress!" (09-19 18:13), and the test-first rule of 09-17 (`POSITIONS-history.md:25`).

A bullet for the skill at its next revision:

> - Put each extension that a program needs, the model program's included, into this library (`Library/`, `ProjectFortress/LibraryBuiltin/`; not the `Compiler*` files), never into the program's own components or a library tree of our own. Make it a general shape on the library's own pattern, with a precedent line you can cite, not a form only the model uses. If the library has no precedent, put the fork to the curator.

## 6. What the record does not settle

- No ruling covers an invented form that has no precedent and cannot be given a general shape (`flat` is the worker's example: "no precedent (row 106)"). The reading in §5 point 2 follows from his 09-20 07:20 message and the protocol's fork rule, not from a decision about such a case.
- The 18:44:35 flag about housing the 26 operations in the compiler's library got no recorded answer; the library route made the question moot.
- The migration of the remaining invented families into the library is a plan only.
