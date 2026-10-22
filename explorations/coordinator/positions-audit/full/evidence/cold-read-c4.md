# Cold read, chunk c4

Source: `rewritten-c4.txt`, ten entries (P-51 to P-62), read with nothing else from the repository.

## P-51

1. **Do.** When no candidate survives the checker's attempt at a call, check again each argument that is itself a call with inferred static arguments, once for each candidate, using that candidate's parameter type as the expected type. Apply this to any inferred static argument, not only to result-only type parameters. It is built, so don't narrow it.
2. **Decides.** A wide argument-context retry. Why: one inference rule then covers every case, including cases the team did not build.
3. **Unclear.**
   - "When the checker's attempts at a call keep none": none of what? I read it as "no overload remains applicable", but it could also mean that every attempt failed for some other reason, such as inference.
   - The title says "each declaration's parameter type" and the body says "each candidate's". Are the candidates all declarations of the name, or only those still in play (for example, those of the right arity)?
   - Nothing says what happens when the retry makes more than one candidate succeed (an ambiguity error, or the most specific one?), or whether the retry nests (an argument of an argument).
   - "past the cases the team built" can mean "extends the team's design" or "departs from it". A worker needs to know whether this is a deviation from the team.

## P-52

1. **Do.** For ranges of rank 2 or 3, the bounds check behind `narrowToRange` compares bounds axis by axis (`PCMP`), never by tuple order, which is for sorting. `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` must raise `IndexOutOfBounds`.
2. **Decides.** Containment is checked on each axis separately. The only reason given is that tuple order serves sorting.
3. **Unclear.**
   - The title covers containment in general ("checks containment"), but the body names only the check behind `narrowToRange`. Do other containment tests on ranges (membership, subrange tests) follow the same rule?
   - "corner by corner" (title) against "point-by-point order" (body). "Corner" could be read as comparing whole corner tuples, which is the tuple order the entry rejects. Probably both mean axis by axis, but the wording differs.
   - It does not say whether this is built or still to do. P-51 and P-58 do say.

## P-53

1. **Do.** On a non-empty `String`, `left` returns `Just` of the first character and `right` returns `Just` of the last, matching the declared `Maybe[\Char\]` and the `left`/`right` of ranges and lists. Expect walk to print `Just(c)`, not `c`.
2. **Decides.** The declared type and the library's other `left`/`right` methods win over returning a bare character.
3. **Unclear.**
   - It does not say what an empty string gives. Presumably `Nothing`.
   - "So walk prints Just of the character": is this the output tests should now expect, or a report of what walk does today? The compiled path is not mentioned.

## P-54

1. **Do.** `QQ`'s `ceiling` and `truncate` return `ZZ` and raise at +∞, −∞ and 0/0. `floor`, `round` and "the two brackets" raise there too. The specification paragraph that returns the argument at an infinity is revised. A later rung, after the switch-over, moves `QQ` to the float ruling (row 330).
2. **Decides.** The declared integer result and the peer languages win over the specification's paragraph.
3. **Unclear.**
   - The last sentence seems to reverse the first. Now "ceiling and truncate keep ZZ". After the later rung, "the methods keep the type, and the brackets, round and truncate give ℤ". Is `ceiling` one of "the methods"? If so, does it then return `QQ`? Does "keep the type" mean the argument's type (`QQ`) or keeping `ZZ`? `truncate` is a method too, yet it is listed as giving ℤ. Which state is the target, and why it changes, is not said.
   - `ZZ` and `ℤ` both appear in one entry. Are they the same type in two spellings, or is ℤ a different integer type?
   - "the two brackets": which operators (presumably floor and ceiling brackets)? What do they return today?
   - The entry does not give the current result type of `floor` and `round`, or which exception "raise" means. P-52 does name its exception.
   - "that paragraph is revised": already done, or a task for a worker?

## P-56

1. **Do.** Leave `(:)` typed `OpenRange[\Any\]`. Keep its `truncL`, `truncR`, `every`, `imposeStride` and `atMost` as `fail` bodies with a message, and keep the five tests that pin them. Don't retype `(:)` over `ZZ32` (way (c)).
2. **Decides.** The wildcard type stays because a range over `ZZ32` is not a range over `Any`, so none of those bodies can be typed. Way (c) is rejected because probe P3 found it lost more than it gained.
3. **Unclear.**
   - "more values lost than gained": test cases, programs, or run-time values? The measure is not stated here.
   - Only the rejected way is lettered. The chosen way's letter, and what ways (a) and (b) were, are missing, so "(c)" has no anchor.
   - "Nothing in the tree calls them on `(:)`": a fact about today, or a rule against adding such calls? If someone needs one, what should they do?
   - P-62's declaration-site covariance would make a range over `ZZ32` a range over `Any`, which removes the obstacle this entry names. Neither entry says whether P-56 is revisited when covariance lands.

## P-57

1. **Do.** Declare `LexicographicReduction`'s `isLeftZero` overload over `TotalComparison`, so that the inherited `ReductionWithZeroes.isLeftZero` no longer shadows it. Expected answers: `LessThan` and `GreaterThan` give `true`, `EqualTo` gives `false`.
2. **Decides.** Narrow the parameter type so that the team's overload is reached. Why: it cleared the count stage's last api error (F-53).
3. **Unclear.**
   - "The team's overload `isLeftZero(_:Comparison)` is declared over `TotalComparison`" has two readings. Either the team's overload already is declared that way (a fact), or the project changed its parameter from `Comparison` to `TotalComparison` (a decision). The title ("takes `TotalComparison`") suggests a change, but the present passive reads like a fact.
   - The mechanism is not stated: why did a `Comparison` parameter lose to the inherited method while a `TotalComparison` one does not?
   - If `Comparison` has values that are not total (an unordered result), it does not say what they now get. Presumably the inherited answer.

## P-58

1. **Do.** Write each native binding as a body that is exactly `builtinPrimitive("…")`, with a string that names a static helper in `nativeHelpers/`, not an interpreter glue class. Don't put `import java` blocks in the library (way 2). The compiled path rewrites these bodies at parse time into a synthetic `import java` plus a call, and refuses unknown names. Each natives rung's bindings go through the checker as that rung lands.
2. **Decides.** Natives keep one library form that both paths serve. Status: the natives rungs are still to build (PLAN phase 4).
3. **Unclear.**
   - "Every native binding is…" (present tense) against "Still to build". Is this already true of existing bindings, or the target once the rungs land? Do existing strings that name glue classes break the rule now, and must they be moved over?
   - "Walk loads the string through a loader beside its glue classes": "beside" could mean in addition to them (walk keeps its glue classes and also loads helpers) or stored next to them. Does walk also refuse an unknown name, as the compiled path does?
   - No reason is given for rejecting way 2.
   - "meet the checker as they land": a gate each rung must pass, or a description of what will happen?

## P-59

1. **Do.** Until the switch-over, accept that walk picks a coercion from the run-time value. Don't fix walk's divergence from the static rule. It is recorded in one callout in the coercion chapter and in `XXXCoercionStaticRungC` and `XXXCoercionStaticNarrowRungC`. After the switch-over, walk uses the static coercions the checker inserts.
2. **Decides.** This is an accepted limit of the interpreter. It is harmless for microGPT because microGPT's static types are concrete.
3. **Unclear.**
   - "After the switch-over walk takes the static coercions": does walk survive the switch-over and run on checked code? If it does, should the two XXX tests pass then and be renamed? Not said.
   - "the coercion chapter": presumably the specification's, but that is not stated, and it is not said whether the callout exists yet or is still to be written.
   - "both paths agree on it": "it" is presumably microGPT. Nothing covers programs whose static types are not concrete.

## P-60

1. **Do.** The specification reads `comprises` at the level of values: "covers" is defined once, and the Meet Rule has a closed-trait case. A call whose argument lies between closed traits is typed by the intersection of its candidates' return types, relying on run-time uniqueness instead of static uniqueness. Generic declarations that need a run-time instance fall outside this, and the specification says so.
2. **Decides.** The value-level reading, justified by the proof addendum: it is sound for ground declarations, at calls that need no coercion, with a local coverage search.
3. **Unclear.**
   - The title says "at the level of values", while the cited proof is named `comprises-type-level-proof-addendum`. Unless one knows the addendum's subject, the two read as opposites.
   - "sits between closed traits" is not defined. Does the argument's type lie above several cases of a closed trait, or between two traits in a hierarchy?
   - The proof covers only ground declarations and calls that need no coercion. It does not say what the checker does outside that: reject, fall back to static uniqueness, or allow without proof. "The specification states that boundary" covers the specification, not the checker.
   - "with the coverage search local to overload checking": a condition the implementation must meet, or a description of the proof's setting?
   - Status (built, or specification text written) is not stated.

## P-62

1. **Do.** Don't work on `covariant` now: it is off the path to microGPT. Expected-failure tests for row 404's hole (the checker accepts variance, but neither path carries it to run time) are owed in a batch rung. Later, declaration-site variance goes to run time on both paths, and then a rung tries to bring back the specification's sign-refined number types as covariant static parameters.
2. **Decides.** Variance is deferred as future work because microGPT does not need it.
3. **Unclear.**
   - "the checker accepts variance": does it check variance statically, or accept the keyword and ignore it? With run time ignoring it, may a worker write `covariant` in the library today, or must they avoid it? Not said.
   - "Its expected-failure tests are owed in a batch rung": owed by whom, and when? Should a worker write them now or wait?
   - It does not mention P-56, where covariance would remove the stated obstacle.

## Across the chunk

- Status is marked unevenly. P-51 says "Built" and P-58 says "Still to build". P-52, P-53, P-54, P-56, P-57, P-60 and P-62 say neither, so a worker can't tell whether each is a description of the tree or a task.
- Some entries end in an explicit "Why:" (P-51, P-57, P-60) and others leave the reason implied (P-52, P-53) or give none for a rejected alternative (P-58's way 2).
