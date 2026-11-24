<!-- The decision record of climb batch 36's rung N: the specification's passages that read a numeral coercion's four numbers as values of type ZZ wherever they stand, brought in line with P-174, each with its original, its new text, the reason and the way back. -->
# Rung N: the four numbers in a numeral coercion's body, the decision record

The decision is the curator's, P-174 as it stands since 23 November 2026: "A coercion's body is a computation at compile time, with no method invocation: a number used as a value there converts where it stands, as a numeral does (P-173), into the type that its place fixes, and is refused statically where it does not fit ... where nothing fixes a type, it is an exact integer, `ZZ`." Fork N1 of `explorations/coordinator/CLIMB-BATCH-36.md`, section 3, gives its default on both paths. Every passage below is the revival's own text of 9 November 2026, not the Working Draft's: the Draft does not say how a coercion's body reads a numeral type's static parameters, so each passage's original is the base's text (`b5a758846d`), and Appendix I's new entry quotes the Draft's sentence that the design builds (`Specification-1.0-frozen/basic/expressions/literals.tex:142-145`).

## 1. The literals chapter (`Specification/basic/expressions/literals.tex`, section "Literals")

Original, `literals.tex:186-188` at the base:

```latex
The parameter of such a coercion has no value: its body computes the type's
value from the four numbers, which it reads as values, integers of type
\EXP{\mathbb{Z}} (\secref{natparams}).
```

New text, `literals.tex:186-205`: the body computes the type's value "with no method invocation"; each of the four, used as a value in the body, "is converted where it stands, as a numeral is: into the type that its place fixes, from its exact value; where nothing fixes a type, it is an integer of type ZZ"; a number that does not fit the type its place fixes, at a numeral's four numbers, "is a static error at that numeral's place, as a numeral out of the range of its place's type is"; ZZ32's coercion is `= v` and a byte type's `where { v < 256 } = Byte(v)`; and the box `\revision{revival-numeral-numbers}`.

Reason: P-174's sentence above; the old sentence made the one library's coercions and seventeen tests convert each number by a getter, `v.asZZ32`, which the curator refused on 23 November 2026 (P-174's history, the block of 14:33Z: "No method invocations").

Way back: restore the three lines above and the getters in the coercions (`Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `CompilerBuiltin.fss` and the tests), and the checker's, walk's and the code generator's reading of each number as a `ZZ` wherever it stands.

## 2. The box on a nat parameter used as a value (`Specification/basic/trait-parameters.tex`, section "Nat and Int Parameters")

Original, `trait-parameters.tex:115-118` at the base:

```latex
The revival decided on 9~November 2026 that the four numbers of a numeral
type (\secref{literals}) are \KWD{nat} parameters of any size, which, read as
values in the body of a coercion from that type, are integers of type
\EXP{\mathbb{Z}}: the bound of a \KWD{nat} or \KWD{int} parameter to the range
```

New text, `trait-parameters.tex:115-120`: "are \KWD{nat} parameters of any size, and on 23~November 2026 that, used as values in the body of a coercion from that type, they are converted where they stand, as a numeral is, and are integers of type ZZ where nothing fixes a type (\secref{revival-numeral-numbers}): the bound of ...", the rest of the box unchanged.

Reason and way back: as in 1.

## 3. Appendix I (`Specification/appendices/changes.tex`)

Three sentences of the entry `revival-numerals` read the four numbers as values of type `ZZ`; each now points to the new entry:

- The Change, `changes.tex:5202-5205` at the base, "whose body computes the type's value from the four numbers, read as values of type \EXP{\mathbb{Z}}: exactly into ...", now "... from the four numbers, each converted where it stands (\secref{revival-numeral-numbers}): exactly into ...".
- The Change, `changes.tex:5255-5257` at the base, "the four numbers of a numeral type, which are integers of type \EXP{\mathbb{Z}} in a coercion's body", now "which in a coercion's body are converted where they stand (\secref{revival-numeral-numbers})".
- The Effect, `changes.tex:5437-5439` at the base, the interpreter "with the four numbers bound as values of type \EXP{\mathbb{Z}}", now "bound as numbers that convert where they stand (\secref{revival-numeral-numbers})".

Two more sentences of Appendix I read the four numbers so, outside the passages that the rung's section names; the skeptic brought each in line, in the same form:

- `revival-inference`, `changes.tex:2303-2306` at the base, "The four numbers of a numeral type, read as values in the body of a coercion from it, are integers of type \EXP{\mathbb{Z}} instead, since the revival decided on 9~November 2026 that they are naturals of any size (\secref{revival-numerals}).", now "... used as values in the body of a coercion from it, are instead converted where they stand, as a numeral is, and are integers of type \EXP{\mathbb{Z}} where nothing fixes a type, since the revival decided on 9~November 2026 that they are naturals of any size (\secref{revival-numerals}) and on 23~November 2026 how the body reads them (\secref{revival-numeral-numbers}).".
- `revival-numerals`'s Rationale, `changes.tex:5364-5366` at the base, "are read in a coercion's body as values of type \EXP{\mathbb{Z}}, the bound of a size ...", now "are converted where they stand in a coercion's body, and are values of type \EXP{\mathbb{Z}} where nothing fixes a type (\secref{revival-numeral-numbers}), the bound of a size ...".

The new entry, `\subsection{The four numbers in a numeral coercion's body}`, `\seclabel{revival-numeral-numbers}`, before "The programming environment of the overview", gives the affected sections, the change, its rationale (P-174's decision of 23 November 2026, and the reversal), the effect with the two departures that the change leaves (rows NEW-N-1, at an integer type `IntegerOverflow` at class initialization and at `RR64` or `RR32` an infinity, and NEW-N-2 of the gap ledger, which the gather numbers), the Draft's sentence that it builds, and route C.

Reason and way back: as in 1; the way back also deletes the new entry and restores the three sentences.

## 4. What the passages do not settle, and the reading built

At a call, the text sends a number, "as a numeral is", to the declaration that the call runs, and P-173 sends a numeral to the most specific declaration that takes it, by its own conversion if need be. Walk does so at each run. The compiled checker checks a coercion's body once for every numeral, so it cannot know whether a number's conversion reaches a more specific declaration: it reads a number at a call as a `ZZ` where a declaration takes one, and converts it only where none does (`Functionals.typedApplication`). The new entry's Effect names this departure (row NEW-N-2); the report puts it to the curator.
