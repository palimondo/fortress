# Evidence: did the team treat IntLiteral/FloatLiteral as the design or a stopgap?

Scout: words only, no judgement. Repository /home/user/fortress. Each item: command, source, author, date, words.

## 0. Caveat on this repository's history (affects every blame)

The repository holds the team's history in disconnected pieces. There are 147 root commits dated before 2013 (`git log --max-parents=0`), each a full tree. The 2007 to 2009-10 chain (to `3e0306166d`) and 2011-03 onward are separate pieces; `git blame` at HEAD attributes every unchanged team line to root `5a68404fdf` (David Chase, 2012-07-19, "Added odd random longs to MagicNumbers"), which is a snapshot, not the author. Where a line's true author could be recovered by `git log -S` it is given; where not, "author not recoverable". `git log -S'IntLiteral' -- Library ProjectFortress/LibraryBuiltin` as the brief wrote it returns only `5a68404fdf`; the pickaxe below starts from `3e0306166d` instead (`git log 3e0306166d -S...`).
`CompilerBuiltin.fss` has no comment in or beside the `trait IntLiteral` (line 883 to ~930) or `trait FloatLiteral` (~line 995) declarations. Commented-out members are inside them (quoted in 1.1). No history exists between 2009-11-17 and the 2011-03-19 snapshot for that file; between 2011-11-23 and 2011-12-05 the IntLiteral block grew from 11 to 45 lines (root snapshots `25f7cf9132` J-B Tristan 2011-11-23 and `9ac5af5401` J-B Tristan 2011-12-05 "Starting branch John"); the commit's author there is the branch owner, not necessarily the line author.

## 1. Compiler library: CompilerBuiltin.fss

### 1.1 The declarations (HEAD; `sed -n 880,935p` and `985,1005p`), no comments except these two
Lines 883 to 935 `trait IntLiteral extends { Number, Equality[\IntLiteral\] } excludes {ZZ32, ZZ64, NN32, RR64, RR32, Character, Boolean, String, NN64, ZZ}`; inside it, lines 889 to 893:
```
(*
    getter asZZ(): ZZ
    getter asRR32(): RR32
*)
```
and many `throw CompilerFailureDetectedAtRunTime` bodies (BOXMINUS, DOTMINUS, DOT, BOXDOT, CROSS, DIV, BITNOT, BITAND, BITOR, BITXOR, MINMAX, CHOOSE, even, odd). Lines ~992 to 996: `trait FloatLiteral excludes {RR32, RR64}` with `getter asRR32(): RR32` and `getter asRR64(): RR64`. Blame: `5a68404fdf` (snapshot) for the trait line; the body was edited by the revival (2026 commits `2027f519b9`, `54861b62ad`, etc. of the revival).
The same trait at `3e0306166d` (2009-10-16), same file: `object IntLiteral extends ZZ32` (line 97) and `object FloatLiteral extends RR64` (line 134).

### 1.2 Commit that made IntLiteral a trait with asZZ32/asZZ64/asRR64 and ZZ32 coerce from it
Command: `git log --since=2009-10-16 --until=2011-03-19 -S'trait IntLiteral' --format='%h %ad %an %s' --date=short` then `git show -s 128f313b5b`.
`128f313b5b` jmaessen, 2009-11-17. Full message:
```
[libraries, codegen] ZZ32 now coerces IntLiteral as described in the
spec.  Over the next few weeks expect more coercions to come on line
as we gradually migrate to a flat numeric hierarchy.

This checkin in particular was a massive joint effort between myself
and the Austin folks (Eric, Justin, and Scott); everyone had their
fingers on most of the bits of code at some point in the past few
days.  And now it actually works!
```
Diff of CompilerBuiltin.fss in it: `-object IntLiteral extends ZZ32` becomes `+trait IntLiteral` with `getter asZZ32(): ZZ32`, `getter asZZ64(): ZZ64`, a block `(* getter asNN32(): NN32 / getter asZZ(): ZZ / getter asRR32(): RR32 *)`, `getter asRR64(): RR64`; and `+    coerce(x: IntLiteral) = x.asZZ32` in `trait ZZ32`.

### 1.3 Commit history of CompilerBuiltin.fss (`git log --follow --format='%h %ad %an %s' --date=short -- ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss | tail -40`, subjects, those bearing on numbers)
- `c8d3014112` 2008-12-19 jmaessen: "[libraries, interpreter] Preliminary version of stripped-down minimalist fortress library for first crack at compilation, plus interpreter support to let it all run through gracefully."
- `bcb5698c57` 2009-04-13 jmaessen: "[compiler] Boxed integer arithmetic via native calls."
- `8a8547c11c` 2009-06-24 sukyoungryu: "[static checker] ... Implemented checking that if trait T excludes trait U, no third trait may extend both T and U, nor may either T or U extend the other. ... eliminated unnecessary excludes clauses in the CompilerBuiltin library."
- `b1579de5d3` 2009-08-17 dr2chase: "Jan's RR64 patches, plus fixes required to make the rest of the system cope, plus updates to error tests."
- `116e5e6fa2` 2009-08-21 jmaessen: full message in 3.5.
- `6896886fbc` 2009-08-31 dr2chase: "... ZZ32 is NOT a subtype of ZZ64, RR32 is NOT a subtype of RR64; this would be a good time to get coercion working."
- `3e0306166d` 2009-10-16 sukyoungryu: "[self-type idiom] Implemented the new self type.  Rewrote SelfParamDisambiguator in Scala.  Eliminated comprises clauses from ZZ32 and RR64.  Fixes here and there.  Added a test."
- `94af2c32e9` 2009-10-15 jmaessen: "[library] Made some methods abstract, mostly generator-y stuff in !CompilerLibrary."
- `57fa58dc94` 2009-05-01 sukyoungryu: "[Compiled3] Added a comprises clause to CompilerBuiltin.ZZ32.  Made the code generation phase ignore comprises clauses of traits because it does not generate bytecode for comprises clauses.  Added a test."
- (2010 to 2012 commits of this file: none in this repository's graph; see section 0.) 
No message of the pieces in the 2009 to 2012 window uses the words "temporary", "stopgap" or "for now" about IntLiteral or FloatLiteral (checked with `--grep='IntLiteral|FloatLiteral|numeral|coerc'`, section 6).

## 2. Interpreter library: FortressBuiltin.fss / .fsi

### 2.1 The comment "Do not enable these until coercion is implemented; ..."
Command: `git log 3e0306166d -S'Do not enable these' --format='%h %ad %an %s' --date=short -- Library ProjectFortress/LibraryBuiltin` returns one commit: `fca589bbb0` jmaessen, 2008-07-15. Its diff adds the comment to both files (`+(*` / `+Do not enable these until coercion is implemented; doing so will` / `+cause all our arithmetic to occur on IntLiterals.`). At `3e0306166d` (last team state before the 2011 snapshots; `git show 3e0306166d:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss | sed -n 478,500p`), `.fss` lines 489 to 492:
```
(*
Do not enable these until coercion is implemented; doing so will
cause all our arithmetic to occur on IntLiterals.

    opr -(self): IntLiteral =
        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Negate")
    opr +(self, b: IntLiteral): IntLiteral = ...Add
    opr -(self, b: IntLiteral): IntLiteral = ...Sub
    opr DOT(self, b: IntLiteral): IntLiteral = ...Mul
```
and in `FortressBuiltin.fsi` lines 126 to 130 the same two sentences followed by `opr -(self): IntLiteral`, `opr +(self, b: IntLiteral): IntLiteral`, ... Same `(*` block appears in both files. (The comment is no longer in HEAD: the revival enabled the block, see section 9.)
Full message of `fca589bbb0` (jmaessen, 2008-07-15):
```
IntLiteral is now a subtype of ZZ32 (and thus of every other numeric
type).  But there are a number of caveats:
* ZZ32 is now a trait, with subtypes Int and IntLiteral.  In practice
all the ZZ32 math you do will end up yielding results of type Int.
This means that when you stuff the results into a polymorphically-typed
container (such as Maybe or List) the type variable will invariably be
dynamically instantiated with Int, rather than ZZ32 as you'd expect.
Most of the changes in this checkin address this in the regression
tests.
* In order to obtain the expected behavior with large constants,
evaluation a too-large IntLiteral actually yields a ZZ.  This means in
practice that the interpreter never actually creates an object of type
IntLiteral.  The reason this is necessary is because we will otherwise
attempt to use ZZ32 arithmetic on any constant that is too big to fit
in ZZ64!  You might imagine an alternative workaround where we define
redundant math on IntLiterals that yields ZZ, but this will cause all
kinds of problems with the overloading rules as it violates
subtyping.  In practice programmers shouldn't notice this at all (in
stark, stark contrast to the previous bullet).
* A couple of test were invalidated.  XXXextendZZ32.fss doesn't spot
its failure condition (extending a closed trait); it was previously
extending a closed object type and failed as expected.  This has been
filed as a bug.
SpecData/examples/basic/StatPara.Opr.IDENTITYplus.fss appears to have
been fundamentally wrong all along, and we suddenly started spotting
and reporting the bug.  It's been deleted as it was unused in the spec.
```

### 2.2 FloatLiteral extends RR64
`3e0306166d:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:200`: `object FloatLiteral extends RR64` (HEAD `value object FloatLiteral extends RR64`, line 208, the word `value` added by the revival `598331c0d2`). No comment on it in any team state examined. Pickaxe `git log 3e0306166d -S'FloatLiteral' -- Library ProjectFortress/LibraryBuiltin` lists, from oldest: `1d2680d4d4` 2008-03-24 jmaessen ("Massive library reorganization..."), `a4227af19a` 2008-04-07 jmaessen ("Nativized String. TODO: Remove FTypeString and its ken."), `900bff59b6` 2008-04-15 jmaessen, `f5e78afde8` 2008-04-15 jmaessen, `5d221864df` 2008-06-27 jon, `c00d455af7` 2008-07-01 jon, `dc41d50003` 2008-07-21 gls, `e109c98122` 2008-09-30 jmaessen, `984d87fe4b` 2008-11-07 black, `76c267f987` 2009-03-30 jmaessen, `116e5e6fa2` 2009-08-21 jmaessen, `3e0306166d` 2009-10-16 sukyoungryu. Messages of the ones that speak of numbers:
- `900bff59b6` (jmaessen 2008-04-15): "This massive check-in accomplishes the following goals: 1. Moves all numeric types across to the new native types story.  This had to be done in bulk because of the relationships between these types.  Nativization is now complete, and a bit of code cleanup should be possible. 2. Adds information about comprises clauses to `FTypeTrait`. ... 3. We now account for comprises clauses when performing exclusion tests.  Our old numeric hierarchy was deliberately kludged and told some white lies to the exclusion checker to avoid the need for comprises information.  In order for the tests to pass we needed to stop lying and start looking at the true exclusion information. I depracated IndexedJUTest, because it was relying too heavily on artifacts of the old numeric representation, and because it's exercising classes that we want to get rid of anyhow." (middle of item 2 cut by me; full text via `git show -s 900bff59b6`.)
- `e109c98122` (jmaessen 2008-09-30): "Fix of Victor's bug: if we add a Ratio and an RR64, we got an error because Ratio isn't built in and consequently doesn't support the Java-level getFloat method.  We need to do the coercion explicitly on the Fortress side using the `asFloat()` functional method.  This requires cloning all the primitive methods on Number and RR64 and moving the originals down to Float, and adding implementations of `asFloat()` to all the numeric types."
- `f1fb3dd58e` (jon 2008-07-01): "[library] s/String/IntLiteral for the operators in IntLiteral"
- `dc41d50003` (gls 2008-07-21): "added NN32 and NN64 and QQ, / operator on integers now creates rationals, toString() getters on all numbers, NN64 and ZZ64 now support partitionL method, added methods even and odd on integers, added IEEE_PLUS_UP and related operators, and numeric literals may now contain apostrophes"
- `491020db1b` (jm143038, 2007-03-02, found by `git log 3e0306166d -i --grep=literal`): "Hack which makes ZZ32 a subtype of ZZ64; otherwise our operators break due to absence of IntLiteral coercion."
No comment line in `Library/*.fss` mentions IntLiteral/FloatLiteral except `Library/Constants.fss:15-16` (2012 snapshot): `pi : FloatLiteral = 3.141592653589793 (* Double whose sin is closest to 0 *)`.

## 3. Walk's glue

Command: `grep -n -i "TODO\|HACK\|XXX\|temporary\|for now\|until\|//\|/\*" <file>` on the four files, `git blame`, and pickaxe from 3e0306166d.
- `interpreter/glue/prim/IntLiteral.java:26-28`: `/** Functions from IntLiteral. */` (snapshot `5a68404fdf`). Lines 160-163: "Divide smaller by g, then multiply.  Quick whiteboard", 307-312 arithmetic notes. No TODO/HACK/temporary/for now.
- `interpreter/glue/prim/FloatLiteral.java`: no comments beyond licence.
- `interpreter/evaluator/values/FIntLiteral.java:85-87`: "WARNING!  In order to run the tests we must reset con for each new test, so it's not OK to ignore setConstructor attempts after the first one." (snapshot; same text in FFloatLiteral.java:51-53.)
- `interpreter/evaluator/values/FFloatLiteral.java:37`: `} // TODO Sam left this undone, not sure if intentional` (on `getString()`). Pickaxe: introduced `72ae6881b1` jm143038, 2007-01-04 (the initial import).
- `FFloatLiteral.java:44-45` (in `seqv`): "HACK that's only sort-of correct.  If we care about all the digits, there must be some sort of normalization." Pickaxe: `d56a402b41` jmaessen 2008-03-04 ("Preliminary (unsatisfactory) implementation of SEQUIV, plus some refactoring ..."), changed in `cd41f90eb1` jmaessen 2008-03-12 ("SEQV now handles value objects correctly, traversing their fields when the types match.  Re-factored seqv into a method of FValue ..."). Lines 46-47 of the same method are the revival's (`598331c0d2`, 2026-11-07).
- Compiled-path runtime `compiler/runtimeValues/FIntLiteral.java:21-23`: "Using a store-the-relevant-form-in-one-field trick as that's supposedly better (and IntLiterals should always be transient objects with minimal lifetime)." Present in `128f313b5b` (jmaessen, 2009-11-17). Line 79: "This is a cheap fix. Problem in codeGen.forIntLiteral." (not in 2009 version; author not recoverable, between 2011-03-19 and 2012-07-19).
### 3.5 Message of 116e5e6fa2 (jmaessen 2009-08-21, adds the TODO in 4 and touches the two literal objects)
```
[compiler, library, tests] Work on getting RR64 to run
(seems OK so far except for the usual warts that also hold for ZZ32;
eg literals don't support asString due to dotted method inheritance
bugs).  Note that ZZ32 and RR64 arithmetic can't be commingled at all
at the moment.

Moved desugaring of loops and generalized if/while to occur before
type checking. ... 
```
(rest about loops/Compiled7fo omitted.)

## 4. Checker and code generator comments

Command: `grep -n -i "IntLiteral\|FloatLiteral" .../scala_src/typechecker/impls/Misc.scala .../compiler/codegen/CodeGen.java`.
- `Misc.scala:468-474`: `SIntLiteralExpr(... Some(Types.INT_LITERAL))` and `SFloatLiteralExpr(... Some(Types.FLOAT_LITERAL))`; no comment on them (snapshot `5a68404fdf`).
- `CodeGen.java:2032-2034` (HEAD; line 1975 at `5a68404fdf`): "TODO: arbitrary-precision version of FloatLiteralExpr, correct handling of types other than double (float should probably just truncate, but we want to warn if we lose bits I expect)." Added by `116e5e6fa2`, jmaessen, 2009-08-21 (`git show 116e5e6fa2 -- CodeGen.java | grep arbitrary`).
- `CodeGen.java:6339`, `6354`: comments on IntLiteral for nat/int static parameters: revival's (`e893a3e0086`, 2026-09-26). Not the team's.
- Team commit `54226ad4f4` sukyoungryu 2009-05-20: "[type checker] Implemented type checking of If, While, For, GeneratorClause, IfClause, CharLiteralExpr, IntLiteralExpr, FloatLiteralExpr, and VoidLiteralExpr."

## 5. Team tests that state it in words
Command: `grep -n -i IntLiteral <files>`; all four comments are in snapshot `5a68404fdf` (authors not recoverable: pickaxe gives only that root).
- `ProjectFortress/compiler_tests/Compiled10.Comprehensions4.fss:15-24`: "Mock up of the kind of code we expect after desugaring of comprehensions, in order to see whether we can typecheck it. / TODO: This file crashes type inference.  My hypothesis is that this has to do with the fact that SumReduction.join should fail type inference with the present library (since IntLiteral <: ZZ32 has + that returns ZZ32 not IntLiteral).  This should turn into a graceful failure and be added to the test suite."
- `ProjectFortress/compiler_tests/Compiled6.bo.fss:27-30`: "(* Currently fails because IntLiteral <!: ZZ32 / var a : ZZ32 / a := 1 *)"
- `ProjectFortress/compiler_tests/Compiled12.coerceInt64.fss:17`: "(* Test coercion from IntLiterals and ZZ32s *)"
- `ProjectFortress/tests/setMakerTest0.fss:16-18`: "This test ought to pass once we can correctly coerce IntLiteral to ZZ32, or as soon as we can propagate result type information into the calling function."
- The team's error-output tests (`compiler_tests/XXX3u.test`, `XXX6at.test`, `XXX9h.test`, ...) print `IntLiteral` and `FloatLiteral` as the checker's type of a numeral, e.g. `XXX9h.test:15`: "Function body has type (IntLiteral, Boolean, FloatLiteral), but declared return type is ()."

## 6. Commit messages 2007 to 2012 that speak of literals/numerals/coercion
Command: `git log 3e0306166d -i --grep=literal --format='%h %ad %an %s' --date=short` (same on `5a68404fdf --before=2013-01-01`, which shows nothing newer: the 2010 to 2012 messages are not in the graph with those words). Relevant ones, in addition to those quoted above:
- `128f313b5b` 2009-11-17 jmaessen: section 1.2. 
- `6896886fbc` 2009-08-31 dr2chase: "...; ZZ32 is NOT a subtype of ZZ64, RR32 is NOT a subtype of RR64; this would be a good time to get coercion working."
- `2b3474bde7` 2008-07-15 sukyoungryu: "[parser/interpreter] Implemented numeric literals including radix specifiers."
- `7cdde00874` 2008-09-24 sukyoungryu: "[parser] Fixed parsing numerals according to the spec 1.0b."
- `649e982cb4` 2007-04-21 sr155864: "Numerals with radix specifiers are not yet implemented."
- `5821a38c37` 2008-05-05 jmaessen: "Minor tweak to IntLiteral code."
- `42005e7b32` 2008-04-07 jmaessen: "Add file `String.java` missed in last commit (sorry), removed FTypeString and FTypeStringLiteral.  Unified String and StringLiteral for the moment."
- `68b489a00b` 2008-06-17 jon: "[regex] add more modifiers, but using LiteralExpr instead of IntLiteralExpr. This should be fixed at some point"
- Coercion work (`--grep=coerc`): `ab00f28ad2` 2009-04-02 jrhil47 "Added Coercion Oracle"; `fc99e1ef20` 2009-08-18 jrhil47 "Added coercions to function application. Compiled9 works ..."; `67e2222f56` 2009-10-02 skilpat "Added lifting of coercion declarations and definitions!! ... Coercions can now be compiled."
None of these says "temporary" or "design" about IntLiteral/FloatLiteral.

## 7. The specification's own words (team's, Specification-1.0-frozen)
`Specification-1.0-frozen/basic/expressions/literals.tex` (snapshot `c02fa44d0a` 2012-01-04 Guy Steele "Cloned Specification directory into Specification-1.0-frozen"; earlier text in `Specification/`), lines 83-129 (verbatim, `sed -n 75,135p`):
```
A numeral containing only digits (let $n$ be the number of digits)
has type \EXP{\TYP{NaturalNumeral}\llbracket{}n,10,v\rrbracket} where $v$ is the value of the numeral
interpreted in radix ten.  If the numeral has no leading zeros, or is
the literal \EXP{0}, then it also has type \EXP{\TYP{Literal}\llbracket{}v\rrbracket}.
\note{Can the type \EXP{\TYP{NaturalNumeral}\llbracket{}n, 10, v\rrbracket}
have any value other than what you get from evaluating the corresponding literal?

What is the relationship between \EXP{\TYP{Literal}\llbracket{}v\rrbracket}
and \EXP{\TYP{NaturalNumeral}\llbracket{}n, 10, v\rrbracket}?

We need to describe the \TYP{Numeral} type hierarchy.
All the numeric/numeral types should be defined and their relations to each other given.
And a reference to where that is done should be appear in this section (probably at the beginning of the section).
}

\note{Ought we discuss digit-group separators here?
Or is that just part of lexical structure?
(I think we intend that a numeral consisting of digits and digit-group separators has
type \EXP{\TYP{NaturalNumeral}\llbracket{}n,10,v\rrbracket}
for appropriate values of \VAR{n} and \VAR{v}.)}
```
(lines 83-100), then the RadixPointNumeral paragraphs and: "Every numeral also has type \EXP{\TYP{Numeral}\llbracket{}n,m,r,v\rrbracket} for appropriate values of n, m, r, v." / "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic. For example, consider the numeral \EXP{3.1415926535897932384}; converting it immediately to a floating-point number may lose precision. If that numeral is used in an expression involving floating-point intervals, it would be better to convert it directly to an interval. Therefore, numerals have their own types as described above. This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations (see \secref{coercion} ...). \Library\ define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)."
Also lines 73-77: "\note{We may want to eliminate the distinction between simple and compound numerals, and just distinguish them by whether they have a radix point or not, when necessary (i.e., ``Numerals may have a radix point.'').  Again, that distinction is primarily a syntactic one, and can be discussed there if appropriate.}" 
Neither IntLiteral nor FloatLiteral occurs in prose of the frozen specification (`git grep -n IntLiteral HEAD -- Specification-1.0-frozen` finds only the grammar's `IntLiteralExpr`).

## 8. The record's account (revival's, 2026; kept apart)
`explorations/coordinator/tools/facts-extract.sh 'history:P-76'` and `'F-79'` print: P-76 (curator's decision of 2026-09-27/29; quotes the team's comment "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals."), the 2026-11-08 version "The design is the compiler's prelude's working one, taken in place of the specification's numeral types, which the team left unfinished", and F-79 "In the interpreter's library, `IntLiteral` ... is declared on the model of the compiler's prelude". These are the revival's words (not the team's).
`Specification/appendices/changes.tex:3730-3800` (`\seclabel{revival-numeral-type}`), the revival's entry: "Rationale ... the revival decided on 29 September 2026 that a numeral has a type of its own, IntLiteral, from which each number type converts, the compiled path's own library's working version taken in place of the numeral types of \secref{literals}, which no library declares ... Library declared their numeral type an object extending ZZ32, its arithmetic withheld by the comment ``Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals.'' (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, lines 495--496 before this change, in the revival's repository)."

## 9. The revival's own commits touching these (not the team's)
`9d2e4c8563` 2026-10-02 Claude "The one library's numeral type is IntLiteral, a sibling under Number that each integer type, QQ and RR64 coerce from ..."; `598331c0d2` 2026-11-07 Claude "SEQV answers by the specification's rule ... Ratio and the two numeral objects are value objects (P-168, P-166)"; `54861b62ad`, `2027f519b9` 2026-09-17 Claude "Ladder rung 6/7: ... intliteral ..."; `e893a3e0086` 2026-09-26 (CodeGen comments). Test `ProjectFortress/library_tests/IntLiteralRung6.fss:20-22` quotes the team's comment.

## 10. Not found
- No team comment, note or commit message that calls IntLiteral or FloatLiteral temporary, a stopgap, or the design for numerals; none that cites NaturalNumeral/RadixPointNumeral/Numeral by name in code.
- Only team phrase about the spec: 128f313b5b "ZZ32 now coerces IntLiteral as described in the spec" and its "gradually migrate to a flat numeric hierarchy".
- Authors of the comments in section 5 and of the "cheap fix" in FIntLiteral.java, and of the 2011 to 2012 growth of CompilerBuiltin's IntLiteral block (unattributable snapshots).
- No team commit messages between 2009-11-17 and 2012-07 mentioning IntLiteral/FloatLiteral (messages exist for other changes in the window; `git log --grep` across `5a68404fdf` found none).
- Papers/ : grep of `IntLiteral|FloatLiteral` in Papers returned nothing.
