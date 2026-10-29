<!-- The final corrections of POSITIONS after the phase 3 exit review, entry by entry: the old text and the new text in full, and one sentence on what changed and why, for the page the curator reads. The texts are those of apply.txt beside this file, and then of the two pointers in facts-new.md. Written by an Opus worker on 2026-10-29; nothing applied. -->

# The corrections, entry by entry

## In short

- Sixteen entries change. Nine change by his page comments: P-27 rewritten whole; P-37, P-33, P-84, P-59, P-153, P-154, P-12 and P-58 by a sentence or a cut. Six change only by the sweep of P-26 as a cited reason: P-7, P-25, P-44, P-48, P-152 and P-158. P-9 changes only in its pointer words for P-27.
- P-42 and P-146 do not change. Neither cites P-26.
- Seven grounding corrections go to the history, not the texts (`history-notes.md`). Two new facts go to FACTS (`facts-new.md`), and then P-37 and P-158 take a pointer to them (the last section).
- Times are UTC, on 2026-10-29.

## Lengths, in characters, old against new

- P-9: 1242 to 1279
- P-27: 452 to 829
- P-37: 1056 to 1031; with the pointer of `facts-new.md`, 1089
- P-33: 913 to 1060
- P-84: 938 to 927
- P-59: 930 to 774
- P-153: 1142 to 1071
- P-154: 1115 to 1225
- P-12: 656 to 720
- P-58: 1148 to 1279
- P-7: 890 to 849
- P-25: 1365 to 1303
- P-44: 1208 to 1202
- P-48: 1570 to 1563
- P-152: 1488 to 1412
- P-158: 867 to 832; with the pointer of `facts-new.md`, 767
- All sixteen: 16980 to 17356

## P-9

P-27's pointer words change to P-27's new title, since he found the old words, "what microGPT invented goes into the library", too strong. It answers his page comment of 06:42 on P-27.

Old:

> - P-9 **The revival searches for the most readable expression of the microGPT algorithm.** C4 is the flat microGPT program (`explorations/run-c4/src/MicroGptFlat.fss`), whose data layout follows Aaron Hsu's flat style of APL (P-29: C4 is not edited for speed before microGPT runs compiled). In C4, the polishing happens in the vocabulary, the array operations that the model's lines call: `FlatArrays.fss` beside C4, and what of it has moved into the standard library (P-27: what microGPT invented goes into the library). P-87 holds the limit: the model's text is the notation, and a change to a model line is shown to the curator as a diff first. C4 is the target form of the APL microGPT program (`explorations/apl/mg/MicroGptApl.fss`): the APL program is written so that each of its lines expands into the line that C4 writes by hand. C4 writes its hyperparameters as tuple bindings, such as `(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`, the form to which the APL sub-language (P-10) expands a strand assignment, APL's binding of several names at once. The one-line form, declarations separated by semicolons such as `nEmbd = 16; blockSize = 16; ...`, is not used: the APL sub-language has no use for it.

New:

> - P-9 **The revival searches for the most readable expression of the microGPT algorithm.** C4 is the flat microGPT program (`explorations/run-c4/src/MicroGptFlat.fss`), whose data layout follows Aaron Hsu's flat style of APL (P-29: C4 is not edited for speed before microGPT runs compiled). In C4, the polishing happens in the vocabulary, the array operations that the model's lines call: `FlatArrays.fss` beside C4, and what of it has moved into the standard library (P-27: what a program builds that a more mature library would hold goes into the library). P-87 holds the limit: the model's text is the notation, and a change to a model line is shown to the curator as a diff first. C4 is the target form of the APL microGPT program (`explorations/apl/mg/MicroGptApl.fss`): the APL program is written so that each of its lines expands into the line that C4 writes by hand. C4 writes its hyperparameters as tuple bindings, such as `(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`, the form to which the APL sub-language (P-10) expands a strand assignment, APL's binding of several names at once. The one-line form, declarations separated by semicolons such as `nEmbd = 16; blockSize = 16; ...`, is not used: the APL sub-language has no use for it.

## P-27

Rewritten whole around his refinement: a form that a program builds, which a more mature library would hold, goes into the library in the library's own way; the diagonal sentence and "No fix is designed ..." go to the history. It answers his page comments of 06:39 and 06:42 and the finding on P-27, as the gathering proposes.

Old:

> - P-27 **The library's own practice is the standard.** What microGPT invented goes into the standard library, in the library's own style. Whoever extends the library first studies how it does the same kind of thing, and follows that pattern; exclusion, for one, is all over it. He had to find the diagonal's override himself (P-88) because that study was skipped. No fix is designed from the specification alone or from a workaround on the user's side.

New:

> - P-27 **What a program builds that a more mature library would hold goes into the library, in the library's own way.** A program written on this library has a part that states its algorithm, and it can have a part that builds domain-independent machinery that the library lacks, as both microGPT programs do. A form of that second part goes into the standard library when, on reasonable judgment, it is not an extension of the program's own domain; a form that the library has for one number type, rank or sibling trait and lacks for another is the plainest case. Whoever writes it there first studies how the library does the same kind of thing, and follows that pattern, such as its `excludes` clauses. This rule governs how the library is extended; it does not choose between two of the team's designs of the language (P-26).

## P-37

His reason is added, condensed from the run's sentence; the run's sentence on F-34, a status line, and its sentences on `CompilerSystem` are not taken, since that question is open and his; the last two sentences, that the decision is not put to him again and that a plan he approved set the order of the work, go to the history. It answers his page comment of 05:22 (a trim, and the reason) and finding P-37 a.

Old:

> - P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library. The decision is not put to him again. How the checker comes to accept the library, its first step and the order of the work, was left to a plan for him, which he approved (P-33).

New:

> - P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over spares porting the interpreter's library into the compiler's; the revival develops the checker until it accepts that fuller library. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.

## P-33

The run's text, which he approved: phase 3 covers the apis and components that the distance counts, and the library's other components are outside phase 3, with a pointer to F-290 for their errors. It answers his page comment of 07:34 and the finding on P-33.

Old:

> - P-33 **The work toward microGPT compiled follows the phases, in the order that the curator approved.** These phases are steps of the work, not the compiler's phases, and they are numbered 3 to 6, after two earlier ones. Phase 3, the compiled checker reports no error on the interpreter's whole library (the distance to the switch-over at zero; F-53 defines it and holds its value); phase 4, the switch-over, first the natives, the library's `builtinPrimitive` bindings made to run on the compiled path, then the compiled path reads the interpreter's library and the compiler's prelude is deleted; phase 5, microGPT compiles: its static types, the array design and the code generator's open gaps; phase 6, microGPT runs fast. Code-generator work goes on beside that order, under either library (P-37). Row 320, an api implemented by a component of another name does not link, is part of the switch-over's design.

New:

> - P-33 **The work toward microGPT compiled follows the phases, in the order that the curator approved.** These phases are steps of the work, not the compiler's phases, and they are numbered 3 to 6, after two earlier ones. Phase 3 ends when the compiled checker reports no error on the apis and components of the interpreter's library that the distance to the switch-over counts (F-53 defines the distance, says what it counts and holds its value). The library's other components are not part of phase 3; F-290 counts their errors. Phase 4, the switch-over: first the natives, the library's `builtinPrimitive` bindings made to run on the compiled path, then the compiled path reads the interpreter's library and the compiler's prelude is deleted; phase 5, microGPT compiles: its static types, the array design and the code generator's open gaps; phase 6, microGPT runs fast. Code-generator work goes on beside that order, under either library (P-37). Row 320, an api implemented by a component of another name does not link, is part of the switch-over's design.

## P-84

The run's sentence on the class loader stays; the sentence that restated P-85's open array decisions is cut; decision A now points to P-85, and P-27's pointer words follow P-27's new title. It answers his page comments of 07:56 and 07:58.

Old:

> - P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** Why: a high-performance language cannot box its array elements, and the sizes are central to the team's design. So the storage and the sizes are one design: the sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them. The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected. Both halves follow the library's own patterns (P-27, the library's own practice is the standard). The compiled checker checks `nat` static parameters (F-67). The compiled path's `double[]` store waits with the other array decisions until after the switch-over; among them is decision A, how an `RR64` array made through the library's generic array traits gets that store (P-85).

New:

> - P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** Why: a high-performance language cannot box its array elements, and the sizes are central to the team's design. So the storage and the sizes are one design: the sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them. The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected. Both halves follow the library's own patterns (P-27, on extending the library in its own way). The compiled checker checks `nat` static parameters (F-67). The class loader, as it makes a generic instance's class, only renames the type parameter, so it gives no instance a `double[]` field; a loader that would, way A4 of array decision A (P-85), is unmeasured (F-18).

## P-59

The run's strike of the coordinator's unmeasured premise on microGPT's static types. It answers his page comment of 07:51 and the finding on P-59.

Old:

> - P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** Walk has no static types. So where a coercion is needed, walk chooses it by the value's run-time type. The specification and the compiled path choose it by the static type. The curator accepts this as the interpreter's limit, and walk is not changed for it before the switch-over. A callout in the coercion chapter (`Specification/basic/conversions-coercions.tex`) states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC`, the chapter's own printed example, and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12 orders the two steps), it uses the static coercions that the checker inserts. MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so on microGPT walk's choice and the static choice agree.

New:

> - P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** Walk has no static types. So where a coercion is needed, walk chooses it by the value's run-time type. The specification and the compiled path choose it by the static type. The curator accepts this as the interpreter's limit, and walk is not changed for it before the switch-over. A callout in the coercion chapter (`Specification/basic/conversions-coercions.tex`) states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC`, the chapter's own printed example, and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12 orders the two steps), it uses the static coercions that the checker inserts.

## P-153

The parenthesis that cites P-26 as the reason is struck; the rest stays as it was, which he judged correct, and the run's new Why is not taken. It answers his page comment of 06:56.

Old:

> - P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction.** Each integer type's `^` returns its own type at every exponent. At a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A program that wants a fraction writes a float or rational base, as in `2.0^(-1)`. Why: the team's later code gives an integer power the type of its integer base at a signed exponent (P-26, the team's later work outweighs the specification's early text). Overloads choose by type, and no type tells a negative exponent from a non-negative one, since a signed integer or a numeral can be either. So the split is on the base, and the sign of the exponent is tested at run time, as the library tests a value's sign everywhere (P-80, run-time sign tests in place of sign-refined types). Row 441: the same rule on the compiled path, whose own powers give 0 at a negative exponent and a raw Java exception at a base of 0, and overflow silently or with a raw Java exception (row 523).

New:

> - P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction.** Each integer type's `^` returns its own type at every exponent. At a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A program that wants a fraction writes a float or rational base, as in `2.0^(-1)`. Why: the team's later code gives an integer power the type of its integer base at a signed exponent. Overloads choose by type, and no type tells a negative exponent from a non-negative one, since a signed integer or a numeral can be either. So the split is on the base, and the sign of the exponent is tested at run time, as the library tests a value's sign everywhere (P-80, run-time sign tests in place of sign-refined types). Row 441: the same rule on the compiled path, whose own powers give 0 at a negative exponent and a raw Java exception at a base of 0, and overflow silently or with a raw Java exception (row 523).

## P-154

The run's text, minus "of an unfinished library draft of the team's", which the cited path already says, with "That file" for "The draft" in the next sentence. It answers his page comment of 07:02 and the finding on P-154.

Old:

> - P-154 **A list is ordered only where its element type is totally ordered.** The library's `List` extends its lexicographic order only where its element type extends `StandardTotalOrder` (conditional extension, P-151). Floats and `QQ` are only partially ordered, since NaN, and `QQ`'s 0/0, compare with nothing. So on the compiled checker a list of floats or of `QQ` has no order: no `<`, `CMP` or the other comparisons, though its `=` stays. A pair of floats stays ordered: the curator accepted that mismatch as a cost of the list rule. The tuples' own rule is not decided here. No lexicographic trait over partially ordered elements is added now: the team never wrote one, and the case touches neither the distance to the switch-over nor microGPT. Why: the team's later code bounds the element of both of its lexicographic traits by a total order (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`; P-26, the team's later word outweighs its early text), and conditional extension is a `where` form that the team wrote (P-151). Row 774: walk's half, since walk still gives every list an order.

New:

> - P-154 **A list is ordered only where its element type is totally ordered.** The library's `List` extends its lexicographic order only where its element type extends `StandardTotalOrder` (conditional extension, P-151). Floats and `QQ` are only partially ordered, since NaN, and `QQ`'s 0/0, compare with nothing. So on the compiled checker a list of floats or of `QQ` has no order: no `<`, `CMP` or the other comparisons, though its `=` stays. A pair of floats stays ordered: the curator accepted that mismatch as a cost of the list rule. The tuples' own rule is not decided here. No lexicographic trait over partially ordered elements is added now: the team never wrote one, and the case touches neither the distance to the switch-over nor microGPT. Why: the two lexicographic traits (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`) both bound the element by a total order, and conditional extension is a `where` form that the team wrote (P-151). That file is not shown to be later than the specification's sentence that lets a list's order be partial where its elements' order is, so it does not count as the team's later word (P-26). Row 774: walk's half, since walk still gives every list an order.

## P-12

The decision stays as it was, with one pointer to F-9 and F-290 for what the step needs, in place of the run's three parts and its size. It answers his page comment of 07:12 and finding P-12, which FACTS already holds.

Old:

> - P-12 **After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts.** The curator wants the checker usable on the programs that walk runs. Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs (F-9 holds this fact). Walk is not changed for this before the switch-over. After it, walk runs the checker on its programs and so gains their static types. Walk then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59, walk's choice of coercions until the switch-over).

New:

> - P-12 **After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts.** The curator wants the checker usable on the programs that walk runs. Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs (F-9 holds this fact). Walk is not changed for this before the switch-over. After it, walk runs the checker on its programs and so gains their static types; F-9 and F-290 say what walk and the library lack for that step. Walk then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59, walk's choice of coercions until the switch-over).

## P-58

One short sentence of ground: the language has no foreign-function interface, only a planned one, so the library's practice decides; the Working Draft as its source goes to the history. It answers his page comment of 07:48 and finding P-58 a.

Old:

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`.

New:

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Why: the language has no foreign-function interface, only a planned one, so the library's own practice decides the binding's form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`.

## P-7

The parenthesis that cites P-26 is removed: the sentence already states the rule in P-26's words. It answers his page comment of 06:56, the sweep. The sort's "no change" for finding P-7 rested on this pointer; P-26 stays in force everywhere.

Old:

> - P-7 **The goal is to finish what the designers intended, measured by one program, microGPT, compiled to JVM bytecode and running fast.** What the designers intended is judged by the specification in `Specification/`: the team's Working Draft of February 2011, as the revival revises it, with the Types chapter of the team's 2012 restart cited beside it (P-25). The revival revises the specification to reconcile contradictions: where the team's later work, in the compiler or in the papers on types, contradicts the original text, the text is updated to follow that work (P-26: the type group's later word wins). The language is not redesigned. The specification is a living document that states each change that the revival makes (P-95 says how a change is recorded). A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at.

New:

> - P-7 **The goal is to finish what the designers intended, measured by one program, microGPT, compiled to JVM bytecode and running fast.** What the designers intended is judged by the specification in `Specification/`: the team's Working Draft of February 2011, as the revival revises it, with the Types chapter of the team's 2012 restart cited beside it (P-25). The revival revises the specification to reconcile contradictions: where the team's later work, in the compiler or in the papers on types, contradicts the original text, the text is updated to follow that work. The language is not redesigned. The specification is a living document that states each change that the revival makes (P-95 says how a change is recorded). A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at.

## P-25

The parenthesis that cites P-26 is removed: the sentence says the same without it. It answers his page comment of 06:56, the sweep.

Old:

> - P-25 **`Specification/` stays the standard, and the Types chapter of the team's 2012 restart is cited beside it.** The restart is a new specification that the team began in 2012 and left unfinished (F-166). Where its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, a worker cites it beside `Specification/` as the designers' later word. On the rules that the revival revises, such as the exclusion rule, the chapter is the designers' latest intent, which the goal is to finish, and `Specification/` is revised to follow it (P-26: the specification is revised to the team's later word). Three of the chapter's passages bear on the specification; P-97 holds how the revision uses the first two. It names the exclusion rule "instantiation exclusion" and gives it in two parts: which instantiations of a generic exclude each other (`types.tick:355-360`), and, in its note, a rule on trait declarations (`:361-376`). The revised `Specification/` takes that form: the first part in its chapter on types, the second in its chapter on traits. It adds a `covariant` modifier for a trait's static parameters, which neither path implements and which is future work, off the path to microGPT (P-62). Third, it says that `Bottom` cannot be written in a program, as `Specification/basic/types-vals-vars.tex` already says of `BottomType`.

New:

> - P-25 **`Specification/` stays the standard, and the Types chapter of the team's 2012 restart is cited beside it.** The restart is a new specification that the team began in 2012 and left unfinished (F-166). Where its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, a worker cites it beside `Specification/` as the designers' later word. On the rules that the revival revises, such as the exclusion rule, the chapter is the designers' latest intent, which the goal is to finish, and `Specification/` is revised to follow it. Three of the chapter's passages bear on the specification; P-97 holds how the revision uses the first two. It names the exclusion rule "instantiation exclusion" and gives it in two parts: which instantiations of a generic exclude each other (`types.tick:355-360`), and, in its note, a rule on trait declarations (`:361-376`). The revised `Specification/` takes that form: the first part in its chapter on types, the second in its chapter on traits. It adds a `covariant` modifier for a trait's static parameters, which neither path implements and which is future work, off the path to microGPT (P-62). Third, it says that `Bottom` cannot be written in a program, as `Specification/basic/types-vals-vars.tex` already says of `BottomType`.

## P-44

P-26 is removed from the pointer "(P-25, P-26)"; P-25 stays, and the sentence already calls the 2012 texts the team's later word. It answers his page comment of 06:56, the sweep.

Old:

> - P-44 **`AnyIntegral` stays closed by its `comprises` clause, and the compiled checker reads the clause as the team's 2012 texts do.** The library's `AnyIntegral`, whose `comprises` clause lists the five integer types `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`, stays closed. Beside the clause stays a comment in the team's `NOT YET` form, by which the team's library records a clause that it cannot write yet: here `comprises Integral[\I\] where [\I\]`, whose `where` form is not built. `Integral[\I\]` extends `AnyIntegral` and is not in the list. The checker accepts such a generic trait below a closed trait when every type that the checker knows below it is listed. The clause's text in the library, and walk, stay as they are. Why: the team's 2012 texts, Luchangco's Types chapter and Welterweight, are its later word (P-25, P-26), and by them the clause is right as written. The rule leaves a hole that every way of closing `AnyIntegral` shares, except the team's 2008 way, a `comprises` clause on `Integral[\I\]` itself: a program's own subtype of `Integral`, declared in another component, is accepted although no listed type is above it. Row 487 records the hole, and this decision does not close it.

New:

> - P-44 **`AnyIntegral` stays closed by its `comprises` clause, and the compiled checker reads the clause as the team's 2012 texts do.** The library's `AnyIntegral`, whose `comprises` clause lists the five integer types `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`, stays closed. Beside the clause stays a comment in the team's `NOT YET` form, by which the team's library records a clause that it cannot write yet: here `comprises Integral[\I\] where [\I\]`, whose `where` form is not built. `Integral[\I\]` extends `AnyIntegral` and is not in the list. The checker accepts such a generic trait below a closed trait when every type that the checker knows below it is listed. The clause's text in the library, and walk, stay as they are. Why: the team's 2012 texts, Luchangco's Types chapter and Welterweight, are its later word (P-25), and by them the clause is right as written. The rule leaves a hole that every way of closing `AnyIntegral` shares, except the team's 2008 way, a `comprises` clause on `Integral[\I\]` itself: a program's own subtype of `Integral`, declared in another component, is accepted although no listed type is above it. Row 487 records the hole, and this decision does not close it.

## P-48

The pointer to P-26 after "the curator trusts the team's later work above his own understanding" is removed: that clause states P-26 in its own words. It answers his page comment of 06:56, the sweep.

Old:

> - P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** The arguments leave a parameter unfixed when it occurs only in the result type; when two arguments meet at it with no narrowest type into which both convert (a `ZZ32` and a `ZZ64` have one, `ZZ64`, by P-74); or when dispatch, at run time, picks a generic declaration and must choose the instance to run. Its instance is then the intersection of its upper bounds (`Any` if it has none). At checking, that is narrowed by what the call's expected type (P-49 defines it) requires of the declared return type; at run time, by the static type that the checker gave the call. It is never `Bottom`, never the union of the arguments' types, and never the value's type alone. The rule sets the instance, not which declaration runs (P-46). Why: the rule is the team's later word, from the POPL 2019 paper on multiple dispatch, and the curator trusts the team's later work above his own understanding (P-26). The rule changes nothing in microGPT, whose types are concrete. The library keeps the team's declarations of `fail`, `builtinPrimitive` and `List`'s empty comprehension, whose type parameters have no written bound, without the `extends Object` that a batch had added. Under walk, which has no static types, dispatch takes the value's type. Row 538: a compiled dispatcher that carries the static type that the checker gave the call, so that a generic declaration reached only at run time gets this instance. Rows 587, 591 and 612: three cases in which walk still gives `Bottom`.

New:

> - P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** The arguments leave a parameter unfixed when it occurs only in the result type; when two arguments meet at it with no narrowest type into which both convert (a `ZZ32` and a `ZZ64` have one, `ZZ64`, by P-74); or when dispatch, at run time, picks a generic declaration and must choose the instance to run. Its instance is then the intersection of its upper bounds (`Any` if it has none). At checking, that is narrowed by what the call's expected type (P-49 defines it) requires of the declared return type; at run time, by the static type that the checker gave the call. It is never `Bottom`, never the union of the arguments' types, and never the value's type alone. The rule sets the instance, not which declaration runs (P-46). Why: the rule is the team's later word, from the POPL 2019 paper on multiple dispatch, and the curator trusts the team's later work above his own understanding. The rule changes nothing in microGPT, whose types are concrete. The library keeps the team's declarations of `fail`, `builtinPrimitive` and `List`'s empty comprehension, whose type parameters have no written bound, without the `extends Object` that a batch had added. Under walk, which has no static types, dispatch takes the value's type. Row 538: a compiled dispatcher that carries the static type that the checker gave the call, so that a generic declaration reached only at run time gets this instance. Rows 587, 591 and 612: three cases in which walk still gives `Bottom`.

## P-152

The citation of P-26 is removed from the parenthesis after the paper's path; the paper's path stays. It answers his page comment of 06:56, the sweep.

Old:

> - P-152 **Walk and the compiled checker read the exclusion of two generic declarations over their whole parameter types, by existential reduction.** With static parameters, the parameter types of two declarations can exclude each other as a whole, even where no single parameter excludes its counterpart. In `o[\T\](x: P[\T\], b: Box[\T\])` beside `o[\T\](x: Q[\T\], b: Box[\T\])`, where `P[\T\]` excludes `Q[\T\]` only at the same `T`, neither parameter excludes alone. But no value is a `Box` of two types, so `b` fixes the same `T` for both declarations, and no argument fits both. A generic trait in `Box`'s place fixes `T` in the same way. Both paths read such a pair as excluding, and judge it on that reading by the overloading rules (P-45: the 2011 paper's No Duplicates, Meet and Return Type rules). Why: the type group's 2011 paper decides exclusion between parameter types with static parameters by existential reduction (`Papers/Types/exc-reduction.tick`; P-26, the type group's later word outweighs the specification's early text), as the revised specification states (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters"). Walk refuses such a pair at load where one declaration has a `where` clause, which the checker accepts (row 787); and walk reads an object type over a static parameter, such as `Box[\T\]`, as excluding a type that it equals at some instance, such as `Box[\ZZ32\]`, so that it loads a pair that the checker refuses (row 788).

New:

> - P-152 **Walk and the compiled checker read the exclusion of two generic declarations over their whole parameter types, by existential reduction.** With static parameters, the parameter types of two declarations can exclude each other as a whole, even where no single parameter excludes its counterpart. In `o[\T\](x: P[\T\], b: Box[\T\])` beside `o[\T\](x: Q[\T\], b: Box[\T\])`, where `P[\T\]` excludes `Q[\T\]` only at the same `T`, neither parameter excludes alone. But no value is a `Box` of two types, so `b` fixes the same `T` for both declarations, and no argument fits both. A generic trait in `Box`'s place fixes `T` in the same way. Both paths read such a pair as excluding, and judge it on that reading by the overloading rules (P-45: the 2011 paper's No Duplicates, Meet and Return Type rules). Why: the type group's 2011 paper decides exclusion between parameter types with static parameters by existential reduction (`Papers/Types/exc-reduction.tick`), as the revised specification states (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters"). Walk refuses such a pair at load where one declaration has a `where` clause, which the checker accepts (row 787); and walk reads an object type over a static parameter, such as `Box[\T\]`, as excluding a type that it equals at some instance, such as `Box[\ZZ32\]`, so that it loads a pair that the checker refuses (row 788).

## P-158

"by P-26, on the team's later word," is removed: the sentence already calls the prelude the team's later work and the library earlier. It answers his page comment of 06:56, the sweep. The run's text is not taken.

Old:

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check of 2012 enforces it; by P-26, on the team's later word, that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification asks for no body there, not for no declaration (`Specification/basic/components/apis.tex`, "Component and API Identity"). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

New:

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check of 2012 enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification asks for no body there, not for no declaration (`Specification/basic/components/apis.tex`, "Component and API Identity"). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

## After the new facts: the two pointers

Once F-293 and F-294 exist, P-37 and P-158 change once more (`facts-new.md`).

### P-37

A pointer to F-293, the compiler's fourth file `CompilerSystem`, is added in the parenthesis on the tests. It names the file and decides nothing. It answers finding P-37 d, which the sort puts in FACTS.

New:

> - P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over spares porting the interpreter's library into the compiler's; the revival develops the checker until it accepts that fuller library. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled; F-293 holds the compiler's fourth file, `CompilerSystem`). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.

### P-158

The false sentence on the specification is replaced by a pointer to F-294, the export rule, which asks no declaration of an abstract member, and the false date "of 2012" is cut from the clause on the team's export check. It answers findings P-158 a and b, which the sort puts in FACTS and the history, each with a cut.

New:

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule asks no declaration of an abstract member (F-294). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

### The two new facts

> - F-293 **`CompilerSystem` is a fourth file of the compiler's library, outside its prelude, and compiled tests import it by name.** `Library/CompilerSystem.fsi` and `.fss` are the compiled path's own `System` api (`args`, `getProperty`). No program imports it by default: the compiled path's default imports are the prelude's three files and `AnyType` (`WellKnownNames.useCompilerLibraries`). 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it. P-37 names only the prelude's three files. Read in the tree. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".

> - F-294 **The specification's export rule asks a component to declare each field and non-abstract method of an api's trait or object, not its abstract methods.** The component's declaration has the api's header and may give an abstract method a body (`Specification/basic/components/source-code.tex`, "Export Statements"; `apis.tex` agrees). So P-158 asks more, and no revision note records it (P-95). The team's export check refused a missing abstract member from 2009 (row 816). Read in the source. Detail: `reviews/foundations/evidence/corrections/p/checks.md`, "5. The export-check dates".
