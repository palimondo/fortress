<!-- The drafted corrections of POSITIONS that the phase 3 exit review and climb batches 22c and 23 owe to the curator's decisions, one section per entry in the order of review-queue items 296, 312, 285 to 290 and 218: for each, the old text, the new text, the words that change, and what is false, why, and what the change alters in the work; where the record does not settle a text, the question for him in its place. Written by an Opus worker on 2026-10-30, checked against FACTS and the tree on `main` at `9033a0de0`; nothing is applied: a text enters POSITIONS only at his yes, by `record.py set`, which keeps the old line in POSITIONS-history.md. -->

# Corrections to POSITIONS, drafted for his yes or no

## How to read this

- Each section is one entry. It gives the entry's text as it reads now, the text drafted to replace it, the words removed and added, and in a few plain sentences what is false, why, and what the change alters in the work.
- Nothing here is applied. POSITIONS is his text, and he says yes or no to each section. At his yes, `explorations/coordinator/tools/record.py set` writes the new text, with a note that names this file's section; the tool keeps the old line in `POSITIONS-history.md`.
- The drafts follow his rules for a correction (`coordinator` skill, `references/record.md`): change as little as the fact needs; a false sentence is corrected; a reason that is not his goes to the history, and his meaning stays; no date goes into an entry.
- Where the record does not settle a text, the section holds a question with its options in place of a text. Two such questions are on P-42: its example (section 1) and its word "functions" (section 12).
- Each fact that makes a sentence false was checked against FACTS and the tree on `main` at `9033a0de0`. A citation `path:line` is of that tree; `a874948ac:path:line` is of the team's last commit.

## In short

1. **P-42** (item 296): its last sentence, that the compiled path bounds an unbounded type parameter by `Object` until the switch-over, goes; the compile command bounds it by `Any` (F-296). A question: the example of arrays indexed by pairs.
2. **P-45** (item 296): "four kinds of pair (rows 759 and 786 to 788)" becomes "three kinds of pair (rows 786 to 788)"; row 759 is closed.
3. **P-158** (item 296): the specification's export rule no longer asks less than P-158; the sentence says that the rule is revised to ask the same (F-294).
4. **P-58** (item 312): "Every binding still names a glue class." and its sentences on rows 796 and 309 give way to a pointer to F-32, which counts the bindings that still name a glue class; 21 bindings name helpers, and the two rows are closed.
5. **P-39** (item 312): the distance is measured in every batch's gate until the switch-over lands, for the moved bindings that only the distance checks; this writes item 306's answer into the entry.
6. **P-156** (item 285): the "Why" says that the bound is the team's wish and the tuple rule the revival's own rule, not "the team's own fix".
7. **P-146** (item 286): the POPL 2019 reason for the plain signatures goes to the history; the decision stays.
8. **P-154** (item 287): the reason becomes the reconciliation of the team's `LexicographicOrder` with the team's `List`, and the row 774 sentence names the wait for walk's half.
9. **P-155** (item 288): no draft; the false sentence left the entry on 2026-10-29, at his answer to item 279.
10. **P-79** (item 289): the list of demos known to fail is brought to the present: none under walk (F-283); `trips.fss` (row 817) and the reductions of row 731 on the compiled checker.
11. **P-68** (item 290): the account of today's rounding types is corrected: `truncate` is `ZZ64` everywhere, `round` `ZZ64` except in one declaration, `ZZ`.
12. **P-42** (item 218): a question, whether "functions" stays among what `Any` holds and `Object` does not.

## Lengths, in characters, old against new

- P-42: 639 to 418
- P-45: 1929 to 1922
- P-158: 767 to 752
- P-58: 1279 to 1164
- P-39: 1333 to 1402
- P-156: 1831 to 1925
- P-146: 1284 to 1116
- P-154: 1225 to 1306
- P-79: 1362 to 1032
- P-68: 600 to 649
- P-42 with both of its questions answered as drafted (section 12): 639 to 417
- P-155: no change

The record's guide for an entry is near 600 characters. The corrections cut only what their facts need, so P-45 (1,922), P-156 (1,925) and P-39 (1,402) stay far past it.

## 1. P-42, the bound on the compiled path (review-queue item 296)

**Old text**

> - P-42 **A type parameter declared without a bound has the implicit bound `Any`, not `Object`.** `Any` holds tuples, functions and `()`, which `Object` does not. The library instantiates its generic containers at tuple types: its arrays indexed by pairs, such as `(ZZ32,ZZ32)`, are among them. The specification states the bound `Any`, with a callout that records that the Working Draft of February 2011 said `Object`. The compiled path departs from it until the switch-over, which ends the departure: while it uses the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (row 412).

**New text**

> - P-42 **A type parameter declared without a bound has the implicit bound `Any`, not `Object`.** `Any` holds tuples, functions and `()`, which `Object` does not. The library instantiates its generic containers at tuple types: its arrays indexed by pairs, such as `(ZZ32,ZZ32)`, are among them. The specification states the bound `Any`, with a callout that records that the Working Draft of February 2011 said `Object`.

**The change**

- Removed: "The compiled path departs from it until the switch-over, which ends the departure: while it uses the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (row 412)."
- Added: nothing

**What is false, and what the change alters**

The last sentence says that the compiled path bounds a type parameter declared without a bound by `Object` until the switch-over. That is false since climb batch 22c: `fortress compile` and the other commands that use the compiler's prelude now bound it by `Any`, as walk does (`ProjectFortress/src/com/sun/fortress/Shell.java:372`; F-296; row 412 closed), and tuple and arrow static arguments compile. So the sentence goes, as his lean of 21:0x UTC on 2026-10-29 has it (`coordinator/BOOT.md`, "Next, in this order", item 2), and nothing replaces it, since both paths now read the bound alike.

Nothing built changes, and no work waits any longer for the switch-over to change the bound. What still fails on the compiled path, a generic instantiated at `()` (row 339) and a generic dotted method whose single parameter has a tuple type (row 832), and the prelude's `||`, `print` and `println`, which take `Object`, are facts of the tree that F-296 holds; they are not a departure from the bound.

**Question for him: the example of arrays indexed by pairs.** His lean of 2026-10-29 is that this is asked, not changed without him.

The second and third sentences give the reason for the bound: the library instantiates its generic containers at tuple types, "its arrays indexed by pairs, such as `(ZZ32,ZZ32)`, are among them". Since P-156, the index parameter of every generic indexed type has the written bound `Index` (`Library/FortressLibrary.fsi:1290`, `:1502`), and a pair of `ZZ32` is an `Index`. So an array indexed by a pair no longer rests on the implicit bound, and the example no longer shows what the sentence claims, though the claim stays true. His yes of 2026-09-29 rested on the tuples, so the example is his to change.

- **Swap the example**, as the corrections run of 2026-10-29 drafted it (`reviews/foundations/evidence/corrections/c2/final.apply`): "The library instantiates its generic containers at tuple types: `zip`, for one, gives a `ZeroIndexed[\(E,F)\]`, whose element type is a pair." (`Library/FortressLibrary.fsi:1364`; the element parameter `E` of `Generator` and `Indexed` has no bound, `:759`, `:1290`). It gives up nothing built; the arrays leave the entry.
- **Keep the example as it reads.** It gives up an example that holds: a reader who checks it finds the bound `Index`, not the implicit bound, and may doubt the reason.

## 2. P-45, the pairs on which walk and the checker disagree (review-queue item 296)

**Old text**

> - P-45 **Overloaded declarations may differ in their static parameters.** The specification drops its sentence that forbids this, and keeps it as superseded text. It states instead the overloading model of the type group's 2011 paper (`Papers/Types/`), which the compiled checker already used. The checker keeps the paper's three rules: No Duplicates, Meet and Return Type. It checks the Return Type Rule over every instance of a generic declaration that the argument types allow, not over one guessed instance. One rule of the old sentence survives: if one generic declaration is more specific than another, their static parameters must line up position by position, as Java's rule for overriding a generic method requires. The compiled checker tests it only where the two declarations have as many static parameters of their own (F-75). Walk chooses among overloads by the parameter types that each declaration declares, not by the order in which they are written. At load, walk judges each pair of two generic declarations by the checker's rules on their declared parameter types. It does not refuse a pair only because none of their parameter types exclude, as when one declaration is more specific than the other. Walk and the checker must accept the same pairs. The library repairs, by declarations of its own, the overload sets that the checker refused, and no line of microGPT's two programs changes. Where walk or the checker still judges a pair against these rules: walk compares two functional methods of a generic trait or object on the instance that a call makes (F-26); both paths refuse the paper's own valid example (row 539); walk refuses two generic functional methods of a trait without static parameters whose declared domains lie one inside the other, and fails at a call on such a pair in a generic trait (rows 779 and 780); and walk and the checker disagree on four kinds of pair (rows 759 and 786 to 788).

**New text**

> - P-45 **Overloaded declarations may differ in their static parameters.** The specification drops its sentence that forbids this, and keeps it as superseded text. It states instead the overloading model of the type group's 2011 paper (`Papers/Types/`), which the compiled checker already used. The checker keeps the paper's three rules: No Duplicates, Meet and Return Type. It checks the Return Type Rule over every instance of a generic declaration that the argument types allow, not over one guessed instance. One rule of the old sentence survives: if one generic declaration is more specific than another, their static parameters must line up position by position, as Java's rule for overriding a generic method requires. The compiled checker tests it only where the two declarations have as many static parameters of their own (F-75). Walk chooses among overloads by the parameter types that each declaration declares, not by the order in which they are written. At load, walk judges each pair of two generic declarations by the checker's rules on their declared parameter types. It does not refuse a pair only because none of their parameter types exclude, as when one declaration is more specific than the other. Walk and the checker must accept the same pairs. The library repairs, by declarations of its own, the overload sets that the checker refused, and no line of microGPT's two programs changes. Where walk or the checker still judges a pair against these rules: walk compares two functional methods of a generic trait or object on the instance that a call makes (F-26); both paths refuse the paper's own valid example (row 539); walk refuses two generic functional methods of a trait without static parameters whose declared domains lie one inside the other, and fails at a call on such a pair in a generic trait (rows 779 and 780); and walk and the checker disagree on three kinds of pair (rows 786 to 788).

**The change**

- Removed: "and walk and the checker disagree on four kinds of pair (rows 759 and 786 to 788)."
- Added: "and walk and the checker disagree on three kinds of pair (rows 786 to 788)."

**What is false, and what the change alters**

The last clause counts four kinds of pair on which walk and the checker disagree, row 759 among them. Row 759 is closed: under the compile command's bound `Any`, the checker refuses `g[\T\](a: T)` beside `g(a: Any)`, whose declared domains are equal, as walk does, 'There are multiple declarations of g with the same parameter type: T' (`ProjectFortress/compiler_tests/XXXNoDuplicatesRuleUnboundedBesideAny.test`, a test that expects the refusal; F-274). Rows 786 to 788 stay open, so three kinds remain.

Nothing built changes. A worker no longer looks for a disagreement on that pair. The entry's other rows (539, 779 and 780) are open, as it says.

## 3. P-158, the specification's export rule (review-queue item 296)

**Old text**

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule asks no declaration of an abstract member (F-294). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

**New text**

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule is revised to ask the same (F-294). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

**The change**

- Removed: "The specification's export rule asks no declaration of an abstract member (F-294)."
- Added: "The specification's export rule is revised to ask the same (F-294)."

**What is false, and what the change alters**

The sentence says that the specification's export rule asks no declaration of an abstract member. That was the Working Draft's rule. Climb batch 22c revised the rule to follow P-158, in the revision form: a satisfying declaration now also declares each method that the api declares abstract, at its header, with a body or without one (`Specification/basic/components/source-code.tex:381-399`); Appendix I, "An abstract method of an exported trait", keeps the old rule (F-294).

Nothing built changes, and his meaning stays. The corrected sentence keeps the pointer to F-294, which holds the Working Draft's rule that he knew when he answered (review-queue item 280). A worker who reads the specification now finds P-158's rule there. The next sentence names row 816, now closed; it gives the reason for the declaration, which still holds, so it is left as it reads.

## 4. P-58, the natives' bindings (review-queue item 312)

**Old text**

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Why: the language has no foreign-function interface, only a planned one, so the library's own practice decides the binding's form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`.

**New text**

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Why: the language has no foreign-function interface, only a planned one, so the library's own practice decides the binding's form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. F-32 counts the bindings that still name a glue class.

**The change**

- Removed: "Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`."
- Added: "F-32 counts the bindings that still name a glue class."

**What is false, and what the change alters**

"Every binding still names a glue class." is false since climb batch 23: 21 of the one library's 449 live bindings name a static helper of `nativeHelpers/`, 19 of trait `ZZ32`'s operators and functions and `Int`'s `asString` and `asExprString` (F-299; in the tree, 19 such strings in `Library/FortressLibrary.fss` and 2 in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`). Rows 796 (walk loaded a binding's string only as a glue class) and 309 (the compiled path had no counterpart of `builtinPrimitive`) are closed (`4548bfb63`): walk's loader and the compiled path's rewrite are built (F-299, F-298).

The three sentences state a status, which the record keeps out of an entry, and a count that each batch of phase 4 changes has one home: F-32 counts the bindings that still name a glue class (428 of 449). So the three sentences give way to a pointer to F-32. The pointer keeps one thing that the cut would lose: without a word that bindings still name glue classes, the title reads as a fact about the tree, which the cold read of the corrections' final texts flagged (review-queue item 322, on P-84's title and the same pattern in P-58's). Nothing in the work changes: P-58's rule, that the bindings move onto helpers step by step and that the checker checks each one from the step that moves it, stays as it reads. The sentences "Walk is to load ..." and "the compiled path is to rewrite ..." state what the decision asks, which is now built; they stay true and are not changed.

## 5. P-39, the gates that measure the distance (review-queue item 312)

**Old text**

> - P-39 **Every batch's gate measures the checker count, and its total never turns the gate red.** A batch is a set of tasks, each called a rung, that agents build at once and land together. Its gate runs the gate's steps on their merged tree, and then the checker count, as step 8 (`explorations/coordinator/climb-batch-workflow.md`); the gate of `fortress-repo`'s gate part has no such step. The checker count and the distance to the switch-over both count the compiled checker's errors on the interpreter's library. The count stops where the checker crashes or meets an error that it cannot get past; the distance counts every error, over all apis and components (F-53 defines both and holds their values). A rise of the count's total is reported and never fails a batch on its own. The count's stage can still turn the gate red on the faults that F-66 names. One is a checker crash that no rung of the batch listed in advance as expected, in the field `expectedCheckerCrash` of the batch's manifest, the part of the batch's script that declares each rung's task. The gates of batches whose work drives the distance down also measure the distance, in a stage that only reports. Why: the distance's full measurement takes far longer than the count, and a batch pays for it only when the distance is the number that it tries to move.

**New text**

> - P-39 **Every batch's gate measures the checker count, and its total never turns the gate red.** A batch is a set of tasks, each called a rung, that agents build at once and land together. Its gate runs the gate's steps on their merged tree, and then the checker count, as step 8 (`explorations/coordinator/climb-batch-workflow.md`); the gate of `fortress-repo`'s gate part has no such step. The checker count and the distance to the switch-over both count the compiled checker's errors on the interpreter's library. The count stops where the checker crashes or meets an error that it cannot get past; the distance counts every error, over all apis and components (F-53 defines both and holds their values). A rise of the count's total is reported and never fails a batch on its own. The count's stage can still turn the gate red on the faults that F-66 names. One is a checker crash that no rung of the batch listed in advance as expected, in the field `expectedCheckerCrash` of the batch's manifest, the part of the batch's script that declares each rung's task. Until the switch-over lands, every batch's gate also measures the distance, in a stage that only reports. Why: the count checks only the `FortressLibrary` component (F-53), so a native binding moved onto a helper in another component is checked by the distance alone, and P-58 has each moved binding checked from the step that moves it.

**The change**

- Removed: "The gates of batches whose work drives the distance down also measure the distance, in a stage that only reports. Why: the distance's full measurement takes far longer than the count, and a batch pays for it only when the distance is the number that it tries to move."
- Added: "Until the switch-over lands, every batch's gate also measures the distance, in a stage that only reports. Why: the count checks only the `FortressLibrary` component (F-53), so a native binding moved onto a helper in another component is checked by the distance alone, and P-58 has each moved binding checked from the step that moves it."

**What is false, and what the change alters**

The last two sentences say that only the gates of batches whose work drives the distance down measure it, because a batch pays for the measurement only then. Climb batch 23's question 1, which he took at its default with his go at 22:36:37 UTC on 2026-10-29 ("And you need to run both batches."), keeps the distance stage in every gate, report-only, until the switch-over lands (`coordinator/CLIMB-BATCH-23.md`, section 2, "Question 1"; review-queue item 306). Its reason: the count checks only the `FortressLibrary` component (F-53), and from climb batch 23 on, a binding moved onto a helper in another component, such as `FortressBuiltin`, is checked by the distance alone; that batch's planner measured such a case, the count 0 and the distance 1. So the sentences no longer describe phase 4's gates, and the old reason no longer holds; it goes to the history with the old line.

The work keeps what climb batch 23's gate already did: a stage of about four minutes of one core in each gate, beside the suites, until the switch-over. This text rests on item 306: it writes that answer, taken at its default, into P-39. If he takes item 306 the other way, the count only, P-39's two sentences stay as they read and the stage leaves the gates. Left out: the default's "each site that comes goes on your list", which is how the coordinator routes what the stage finds, not a rule for the gate; he may want it in.

## 6. P-156, the reason for the index bound and the tuple rule (review-queue item 285)

**Old text**

> - P-156 **A collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`.** Every index parameter of the library's generic indexed types is bounded `I extends Index`; `ZZ32` extends `Index`, and `Range` excludes it. So a subscript that takes one index and a subscript that takes a range never apply to the same value, and the pair is a valid overloading at every instance. A tuple type whose elements are all `Index` types is itself an `Index`, on both paths and in the specification: a typing rule that changes no value, so `m[i, j]` passes its tuple `(i, j)` as before. Why: it is the team's own fix for this pair (`Specification/appendices/future.tex:186-207`), its "magic" read as subtyping. A `where` constraint `I excludes Range[\I\]` was weighed and not taken: the team left such a constraint as an open question, and the code generator refuses a `where` clause in a declaration's header. `Index` stands beside `Any` and `Object`, outside `Object`: it is declared `trait Index extends Any`, which the desugaring and walk keep as written and the traits chapter names as an exception to the rule that every trait extends `Object`, so a tuple of indices is an `Index` and never an `Object`, and P-42's tuples stay out of `Object`, as the specification's `trait Tuple extends Any excludes { Object }` keeps them. `BoundedRange`, which cannot take the bound, since the open range `(:)` stays a range over `Any` (P-56), keeps its narrowed `atMost(n: I): FullRange[\I\]` under the method condition `where { I extends Index }`, the library's form for a member that applies at some instances only; after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701). Row 783: the subscript pair.

**New text**

> - P-156 **A collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`.** Every index parameter of the library's generic indexed types is bounded `I extends Index`; `ZZ32` extends `Index`, and `Range` excludes it. So a subscript that takes one index and a subscript that takes a range never apply to the same value, and the pair is a valid overloading at every instance. A tuple type whose elements are all `Index` types is itself an `Index`, on both paths and in the specification: a typing rule that changes no value, so `m[i, j]` passes its tuple `(i, j)` as before. Why: the bound is the team's own wish for this pair (`Specification/appendices/future.tex:186-207`); the tuple rule is the revival's own rule, where the team asked for a conversion that would change every index value. A `where` constraint `I excludes Range[\I\]` was weighed and not taken: the team left such a constraint as an open question, and the code generator refuses a `where` clause in a declaration's header. `Index` stands beside `Any` and `Object`, outside `Object`: it is declared `trait Index extends Any`, which the desugaring and walk keep as written and the traits chapter names as an exception to the rule that every trait extends `Object`, so a tuple of indices is an `Index` and never an `Object`, and P-42's tuples stay out of `Object`, as the specification's `trait Tuple extends Any excludes { Object }` keeps them. `BoundedRange`, which cannot take the bound, since the open range `(:)` stays a range over `Any` (P-56), keeps its narrowed `atMost(n: I): FullRange[\I\]` under the method condition `where { I extends Index }`, the library's form for a member that applies at some instances only; after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701). Row 783: the subscript pair.

**The change**

- Removed: "Why: it is the team's own fix for this pair (`Specification/appendices/future.tex:186-207`), its "magic" read as subtyping."
- Added: "Why: the bound is the team's own wish for this pair (`Specification/appendices/future.tex:186-207`); the tuple rule is the revival's own rule, where the team asked for a conversion that would change every index value."

**What is false, and what the change alters**

The "Why" calls the tuple rule, under which a tuple of indices is an `Index`, "the team's own fix for this pair ..., its "magic" read as subtyping". The phase 3 exit judgement (section 3.2, item 4), as the review of 2026-10-23 did, finds two parts in it. The bound `Index` finishes the team's wish: "We want to say that the type variable I extends a type, say, Index which either excludes Range[I] ...". The tuple rule is the revival's own: the team asked for a "magic to convert" the tuple argument, a conversion would change every index value, and the team's texts on tuple types let no tuple type lie below a trait type (the Working Draft; the 2012 Types chapter, `Documentation/Specification/Prose/Language/types.tick:341`, `:424`). Appendix I already says so: "The tuple rule is the revival's departure from the designers' text on tuple types" (`Specification/appendices/changes.tex:4205-4206`).

The draft keeps the true half of the reason, the bound, and corrects the other half; the rule itself does not change, and nothing built changes. A worker no longer takes the tuple rule for the team's design, and so does not cite it as the team's word where it meets their tuple-type text. For whoever puts this to him: the judgement asks that this correction also be the moment to tell him in plain words what he decided on 2026-10-23, since his three answers that day were on a primer and on the ask's defaults.

## 7. P-146, the reason for the plain signatures (review-queue item 286)

**Old text**

> - P-146 **In a self-typed trait, the compiled checker types `self` in the method bodies as also being the implementing type.** A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`. In its method bodies, `self` has the type `C[\X\] & X`. The method signatures keep the plain trait type, because the proofs of the POPL 2019 paper on multiple dispatch (Park, Hong, Steele and Ryu) assume that no declared type holds a type parameter inside an intersection. Only the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X` (P-157). The checker refuses a type that extends such a trait at another type, since an extender must be a subtype of the static argument that it gives: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`. Scala has the same rule for self types. The library's text gains no self type and no `comprises` clause, and walk is unchanged. The rule accepts every self-typed method body of the library except `Integral`'s `numerator`, which each integer type declares instead. Why: the checker reads the library as the team wrote it, as P-44 does for the closure of `AnyIntegral`, by one rule that peer languages share. F-225 states the rule as built.

**New text**

> - P-146 **In a self-typed trait, the compiled checker types `self` in the method bodies as also being the implementing type.** A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`. In its method bodies, `self` has the type `C[\X\] & X`. The method signatures keep the plain trait type. Only the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X` (P-157). The checker refuses a type that extends such a trait at another type, since an extender must be a subtype of the static argument that it gives: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`. Scala has the same rule for self types. The library's text gains no self type and no `comprises` clause, and walk is unchanged. The rule accepts every self-typed method body of the library except `Integral`'s `numerator`, which each integer type declares instead. Why: the checker reads the library as the team wrote it, as P-44 does for the closure of `AnyIntegral`, by one rule that peer languages share. F-225 states the rule as built.

**The change**

- Removed: "The method signatures keep the plain trait type, because the proofs of the POPL 2019 paper on multiple dispatch (Park, Hong, Steele and Ryu) assume that no declared type holds a type parameter inside an intersection."
- Added: "The method signatures keep the plain trait type."

**What is false, and what the change alters**

The sentence gives as the reason that a self-typed trait's method signatures keep the plain trait type that "the proofs of the POPL 2019 paper ... assume that no declared type holds a type parameter inside an intersection". The review of 2026-10-23 found that this assumption is the paper's lemma on matching types at run-time dispatch, which bears on whether the compiled dispatcher is complete, not on the static exclusion test where the vectors' pair had failed, and the phase 3 exit judgement confirms it (section 3.2, item 5). The reason is not his: he said that the option "is more in line with weak signal from repo and has precedent in other languages" (23:32 UTC on 2026-10-13), and the paper's assumption came from the coordinator's ask before his "1.". So, by his rule, the reason goes to the history, and the decision stays: the signatures keep the plain type, and only the exclusion test reads the intersection (the next sentence, P-157).

Nothing built changes. A worker who meets the signature half no longer reads it as forced by the paper; Appendix I keeps the two reasons with their limits, specificity and the Return Type Rule (`Specification/appendices/changes.tex:4058-4073`). The other way is the judgement's own text, which puts a new reason in place of the old: the signatures keep the plain type "for specificity and the Return Type Rule as the conservative choice until phase 5's dispatcher is built". That reason is the judge's, not his, and it names a phase of the plan, which an entry does not hold; so the draft leaves it out. If he wants a reason kept in the entry, that text is the one to take.

## 8. P-154, the reason for the list order and the wait for walk's half (review-queue item 287)

**Old text**

> - P-154 **A list is ordered only where its element type is totally ordered.** The library's `List` extends its lexicographic order only where its element type extends `StandardTotalOrder` (conditional extension, P-151). Floats and `QQ` are only partially ordered, since NaN, and `QQ`'s 0/0, compare with nothing. So on the compiled checker a list of floats or of `QQ` has no order: no `<`, `CMP` or the other comparisons, though its `=` stays. A pair of floats stays ordered: the curator accepted that mismatch as a cost of the list rule. The tuples' own rule is not decided here. No lexicographic trait over partially ordered elements is added now: the team never wrote one, and the case touches neither the distance to the switch-over nor microGPT. Why: the two lexicographic traits (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`) both bound the element by a total order, and conditional extension is a `where` form that the team wrote (P-151). That file is not shown to be later than the specification's sentence that lets a list's order be partial where its elements' order is, so it does not count as the team's later word (P-26). Row 774: walk's half, since walk still gives every list an order.

**New text**

> - P-154 **A list is ordered only where its element type is totally ordered.** The library's `List` extends its lexicographic order only where its element type extends `StandardTotalOrder` (conditional extension, P-151). Floats and `QQ` are only partially ordered, since NaN, and `QQ`'s 0/0, compare with nothing. So on the compiled checker a list of floats or of `QQ` has no order: no `<`, `CMP` or the other comparisons, though its `=` stays. A pair of floats stays ordered: the curator accepted that mismatch as a cost of the list rule. The tuples' own rule is not decided here. No lexicographic trait over partially ordered elements is added now: the team never wrote one, and the case touches neither the distance to the switch-over nor microGPT. Why: the team's `LexicographicOrder` computes `CMP` on its elements as a total comparison, which only totally ordered elements give (`a874948ac:Library/FortressLibrary.fss:1735-1741`), and the team's `List` extended it at every element type (`a874948ac:Library/List.fsi:67`); conditional extension, a `where` form that the team wrote (P-151), reconciles the two. Row 774: walk's half, since walk still gives every list an order; it waits until walk runs the checker (P-12) or row 364, walk's typing of a generic at its argument's run-time class, is fixed.

**The change**

- Removed: "Why: the two lexicographic traits (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`) both bound the element by a total order, and conditional extension is a `where` form that the team wrote (P-151). That file is not shown to be later than the specification's sentence that lets a list's order be partial where its elements' order is, so it does not count as the team's later word (P-26)."
- Added: "Why: the team's `LexicographicOrder` computes `CMP` on its elements as a total comparison, which only totally ordered elements give (`a874948ac:Library/FortressLibrary.fss:1735-1741`), and the team's `List` extended it at every element type (`a874948ac:Library/List.fsi:67`); conditional extension, a `where` form that the team wrote (P-151), reconciles the two."
- Removed: "Row 774: walk's half, since walk still gives every list an order."
- Added: "Row 774: walk's half, since walk still gives every list an order; it waits until walk runs the checker (P-12) or row 364, walk's typing of a generic at its argument's run-time class, is fixed."

**What is false, and what the change alters**

The reason. The item quotes "the team's later code"; the correction of 2026-10-29 already took those words out, and kept the two lexicographic traits of the unfinished file as the reason, with a sentence that the file does not count as the team's later word. The phase 3 exit judgement (section 3.2, item 6), as the review of 2026-10-23 did, finds the reason elsewhere: the team's own `LexicographicOrder` computes `CMP` on its elements as a total comparison, which only totally ordered elements give, while the team's `List` extended it at every element type (both checked at the cited lines); so the team's library contradicted itself, which walk hid, and conditional extension reconciles the two. The draft puts that reason in place of the file's traits, and the sentence on the file's date goes with them.

Row 774. Walk's half of conditional extension waits until walk runs the checker (P-12) or row 364 is fixed: today walk types a list of numerals at the run-time class `Int`, so the condition would take the order from every list of unwritten numerals or strings (`coordinator/CLIMB-BATCH-21.md`, section 2, "Defaults already taken, on your review list", item 6; PLAN, "Walk's half of conditional extension"). That wait is the coordinator's reading of P-12 and P-59, taken as a default; at his yes it becomes his.

Nothing built changes. A worker no longer cites a file of unknown date as the ground of the rule, and does not build walk's half before walk runs the checker or row 364 is fixed. His page comment of 07:02 UTC on 2026-10-29 found "the two lexicographic traits" useful, since it says what awaits at the link; under this draft the link leaves with the reason, and the history keeps it.

## 9. P-155, the symbolic operators (review-queue item 288): no draft

Item 288 is settled (`coordinator/review-queue.md`, "(a) Settled or stale", "Answered by a decision of his"). The sentence that it named, "Today its overloading check reads an operator only if its name is a word of capitals, such as `MAX`, so `+`, `^`, `||`, the subscripts and the other symbolic operators pass unchecked.", left P-155 at his answer to item 279 (`POSITIONS-history.md`, P-155's block of 2026-10-29 21:33Z). The text as it reads states nothing false: it names the team's two checks as those that skip symbolic operators, and both checks in the tree now read them (rows 584 and 782 closed).

**Text as it reads, unchanged**

> - P-155 **The compiled checker checks symbolic operators before the switch-over.** The team's overloading check, and its export check, which compares an api's declarations with its component's, read an operator only if its name is a word of capitals, such as `MAX`, so `+`, `^`, `||`, the subscripts and the other symbolic operators pass unchecked. Both checks must read them by the rules that they apply to any function, so that the distance to the switch-over reaches zero with them checked. Why: the skip is a gap that the team knew, not a rule: the specification's appendix of proposed features calls the library's two subscript operators "not really a valid overloading" (`Specification/appendices/future.tex:186-207`, its item on array indexing). A zero with them unchecked would hide known errors. Each design that the check needs is brought to the curator before its rung, with the probe's measurement (`perf-probes/symbolic-operators-2/REPORT.md`); the two it found are decided: P-156, the subscripts' index bound, and P-157, vectors that stay additive groups by a change to the checker's exclusion test. Row 584: the check and its rungs.

One point, not drafted, for him to take or leave: the last words, "Row 584: the check and its rungs.", name a closed row, and the record names a row in an entry for a part that the tree still lacks.

## 10. P-79, the demos known to fail (review-queue item 289)

**Old text**

> - P-79 **Every team demo is kept running as the tree changes.** The team demos are the programs in `ProjectFortress/demos/`; no suite or step of the gate runs them. If a change breaks a demo and the way to repair the demo is known, the batch that makes the change also rewrites the demo. A batch is a set of tasks, each called a rung, that agents build at once and land together. For example, the change that made `10^(-4)` an error (P-153, the integer power) also wrote `10.0^(-4)` in `BiCGSTAB.fss` and `BiCGSTAB2.fss`, and `10.0^(-6)` for `10^(-6)` in `npbft.fss`. A demo that fails for want of a feature is made to run again once the feature is built. So the demos known to fail today are to be respelled where the way is known: the five demos that walk refuses at load, since they leave an inherited abstract method without a body (row 670, which names them); `trips.fss`, which walk runs but the compiled checker refuses, since its `generator` object extends `StandardTotalOrder[\trip\]` without being a `trip` (row 710); the timing line of `BiCGSTAB.fss` and `BiCGSTAB2.fss`, which divides a `ZZ64` by a float and so stops walk (row 791); and the reductions that the compiled checker refuses because they leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731).

**New text**

> - P-79 **Every team demo is kept running as the tree changes.** The team demos are the programs in `ProjectFortress/demos/`; no suite or step of the gate runs them. If a change breaks a demo and the way to repair the demo is known, the batch that makes the change also rewrites the demo. A batch is a set of tasks, each called a rung, that agents build at once and land together. For example, the change that made `10^(-4)` an error (P-153, the integer power) also wrote `10.0^(-4)` in `BiCGSTAB.fss` and `BiCGSTAB2.fss`, and `10.0^(-6)` for `10^(-6)` in `npbft.fss`. A demo that fails for want of a feature is made to run again once the feature is built. So the demos known to fail today are to be respelled where the way is known. Under walk, the 52 demos that `DemoTests` lists reach their end (F-283). The compiled checker refuses `trips.fss` (row 817), and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731).

**The change**

- Removed: "So the demos known to fail today are to be respelled where the way is known: the five demos that walk refuses at load, since they leave an inherited abstract method without a body (row 670, which names them); `trips.fss`, which walk runs but the compiled checker refuses, since its `generator` object extends `StandardTotalOrder[\trip\]` without being a `trip` (row 710); the timing line of `BiCGSTAB.fss` and `BiCGSTAB2.fss`, which divides a `ZZ64` by a float and so stops walk (row 791); and the reductions that the compiled checker refuses because they leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)."
- Added: "So the demos known to fail today are to be respelled where the way is known. Under walk, the 52 demos that `DemoTests` lists reach their end (F-283). The compiled checker refuses `trips.fss` (row 817), and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)."

**What is false, and what the change alters**

The list of the demos known to fail is stale. Rows 670, 710 and 791 are closed, and since climb batch 21b the 52 demos that `DemoTests` lists each reach their end under walk, run one at a time (F-283; the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13). What is still known to fail is on the compiled checker: it refuses `trips.fss` for reasons past row 710's repair (row 817), and the reductions that leave out a big operator's static argument (row 731). The sentences around the list hold, among them "no suite or step of the gate runs them" (`fortress-repo`, `references/tests-running.md:57`).

Nothing built changes. A worker no longer takes the five demos that walk refused at load, or `BiCGSTAB`'s timing line, for work to do. No probe has yet run the compiled checker over every demo (review-queue item 51, its "Needed by"), so the sentence keeps the word "known".

## 11. P-68, today's rounding types on the floats (review-queue item 290)

**Old text**

> - P-68 **On the float types, `floor` and `ceiling` return the same float type, while the brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`, the unbounded integer.** So `floor(2.5)` is the `RR64` value 2.0, and ⌊2.5⌋ is to be the `ZZ` value 2. Row 330: one library rung after the switch-over, which first counts the interpreter tests whose output changes, then makes the brackets, `round` and `truncate` return `ZZ` in each of the library's declarations of them; today the brackets are `ZZ64` under walk and `RR64` compiled, and `round` and `truncate` are `ZZ64`, `ZZ` or `RR64` by declaration.

**New text**

> - P-68 **On the float types, `floor` and `ceiling` return the same float type, while the brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`, the unbounded integer.** So `floor(2.5)` is the `RR64` value 2.0, and ⌊2.5⌋ is to be the `ZZ` value 2. Row 330: one library rung after the switch-over, which first counts the interpreter tests whose output changes, then makes the brackets, `round` and `truncate` return `ZZ` in each of the library's declarations of them; today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` compiled, and `round` is `ZZ64`, but `ZZ` in the `FortressLibrary` component's `trait RR64`.

**The change**

- Removed: "today the brackets are `ZZ64` under walk and `RR64` compiled, and `round` and `truncate` are `ZZ64`, `ZZ` or `RR64` by declaration."
- Added: "today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` compiled, and `round` is `ZZ64`, but `ZZ` in the `FortressLibrary` component's `trait RR64`."

**What is false, and what the change alters**

The account says that `round` and `truncate` are "`ZZ64`, `ZZ` or `RR64` by declaration". In the tree, `truncate` on the floats is `ZZ64` in every declaration of both libraries (`Library/FortressLibrary.fsi:382`, `Library/FortressLibrary.fss:501`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:190`, `:339`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:470`), since climb batch 22 moved the component's `truncate` and brackets to `ZZ64`, the api's type. `round` is `ZZ64` in walk's `Float` and `RR32` and in the compiler's prelude (`FortressBuiltin.fss:192`, `:341`; `CompilerBuiltin.fsi:471`), and `ZZ` in the `FortressLibrary` component's `trait RR64` (`FortressLibrary.fss:502`). No declaration of either is `RR64`. The account of the brackets, `ZZ64` under walk and `RR64` compiled, holds (`FortressLibrary.fsi:379`, `:381`; `CompilerBuiltin.fsi:457-458`).

Nothing in the work changes: P-68's decision, that row 330's rung makes the brackets, `round` and `truncate` return `ZZ` after the switch-over, stands, and only its account of today is corrected.

## 12. P-42, the word "functions" (review-queue item 218): a question

**The sentence as it reads**

> `Any` holds tuples, functions and `()`, which `Object` does not.

**Briefing**

P-42 gives as the reason for the bound `Any` that "`Any` holds tuples, functions and `()`, which `Object` does not". On functions the team's texts split. The specification in the tree lists arrow types, the types of functions, beside `Object` among the immediate subtypes of `Any` (`Specification/basic/types-vals-vars.tex:152-154`), and both paths agree with it: under walk, a function passed where a type parameter bounded by `Object` is expected stops the program (F-265; row 471), and the compiled checker puts only trait types below `Object` and lets an arrow type exclude every type but an arrow (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:262`, `:570-571`; read in the code, not run). The team's 2012 Types chapter makes `Object` "a supertype of every trait type, arrow type and function type" (`Documentation/Specification/Prose/Language/types.tick:232-236`). The text that he answered on 2026-09-29 at 13:58 UTC told him the opposite of what that chapter says, and his yes rested on the tuples. The specification's own callout on the bound already names only tuples and `()` (`Specification/basic/trait-parameters.tex:56-57`). The item cites F-70 for walk's stop; the fact that holds it is F-265, and F-70 holds another.

**Options**

- **Keep "functions".** The sentence holds for the specification in the tree, for walk and for the checker, and contradicts the team's 2012 chapter. It gives up a sentence that holds under one of the team's two texts only.
- **Drop it:** "`Any` holds tuples and `()`, which `Object` does not." The sentence holds under both texts. It gives up the entry's word that a function is no `Object` here; the specification and F-265 still say it. The same words are in the `fortress-repo` skill's `SKILL.md`, "Fortress as a language", the bullet on static parameters, which the skill writer changes with it.

The bound stays `Any` under either answer, and nothing built changes.

**P-42 with all three changes taken as drafted** (the last sentence cut, section 1; the example swapped, section 1; "functions" dropped, this section)

> - P-42 **A type parameter declared without a bound has the implicit bound `Any`, not `Object`.** `Any` holds tuples and `()`, which `Object` does not. The library instantiates its generic containers at tuple types: `zip`, for one, gives a `ZeroIndexed[\(E,F)\]`, whose element type is a pair. The specification states the bound `Any`, with a callout that records that the Working Draft of February 2011 said `Object`.
