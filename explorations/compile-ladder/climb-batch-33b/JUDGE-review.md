# Climb batch 33b: the judge's ruling on the merged-diff review

The ruling is by reading only: no build, no test and no program was run, and nothing under `tmp/gate-batch-33b/` was read. The tree read is `main` at `17b55bcc72`, the review's own commit on the gather's `f9acd7f6c2`. One launch of the judge worked this stage: no earlier `JUDGE-review.md` was in the batch folder.

## Decision: repair

One finding, upheld. Its settlement is a sentence of `Specification/appendices/changes.tex`, a file of the specification, so by the brief it is a repair and not a landing on tests and records. Reading the merged tree as a whole, I add one more sentence of the same entry, a callout in `Specification/preliminaries/intro/nutshell.tex` that the same rung made false and that no one listed. The repair changes no code, no test, no library file and no path that the gate reads.

## The finding

The review's one blocking finding: the Effect of the Appendix I entry "The features not yet supported, in the preface and the introduction" (`\seclabel{revival-supported}`, `Specification/appendices/changes.tex:6361-6362`) says, at `:6407-6409`:

    Keyword parameters are built in neither implementation (row~652); the code
    generator refuses a varargs parameter (row~624), and an object takes none
    (row~11).

Rung G (`e9bc2ed3e3`) made the middle clause false, and the batch closed row 624 (`49c11ccfd5`).

## What each side had right

The review is right on each of these:

- The rule. The Effect of an Appendix I entry names each way in which walk or the compiled path does not do what the text says, with its ledger row, so that "the text claims no more than holds" (the skill's `references/specification.md`, "Changing the text: the revision form", item 1, and "When the text and an implementation disagree", third point).
- The row is closed. Row 624 is `FIXED`, "fixed `e9bc2ed3e`; under the selection", with the note that against the compiler's prelude, which declares no `ImmutableArray` (P-37), the code generator still refuses a varargs declaration (`explorations/fortress-gap-ledger.md:995`). It is the only citation of a row that this batch closed anywhere under `Specification/`: a grep of the spec's `.tex` files for each of the nine rows that `49c11ccfd5` closed (1003, 866, 698, 566, 315, 624, 942, 940, 1061), as `~N`, `row N` or `rows N`, printed this one line alone.
- The code. Under the prelude the refusal stands and names the missing type (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1028-1034`; `ProjectFortress/compiler_tests/XXXVarargsMethodCodeGeneration.test:3`, 'declares no ImmutableArray, the type of a varargs parameter'). Under the selection the code generator compiles a varargs declaration and its calls (`ProjectFortress/one_library_tests/OneLibraryVarargsCount.test:1`), and the gather saw it compile on the merged tree, `ant testOneLibrary`: "'OneLibraryVarargsCount  OK'" and "'Tests run: 14, Failures: 0, Errors: 0'" (`explorations/compile-ladder/climb-batch-33b/RECORD.md:50`). No such program runs, since no program compiled against the one library runs (row 1062).
- The omission. G's report lists three sentences made false or checked (`explorations/compile-ladder/rung-varargs/REPORT.md:131-133`), and not this one; the gather's record names only `preamble.tex:84` as left to it (`RECORD.md:169`).
- The preface's item stays. "varargs parameters in compiled code" stands among the features not yet supported (`Specification/fortress/preamble.tex:84-85`): no program with a varargs parameter runs on the compiled path, as the varargs entry's own Effect says (`changes.tex:4053-4054`).

The review's suggested clause is right in substance and I keep it, with two changes of form: it names, beside the refusal, that against the one library the code generator compiles one, which is what row 624's close records; and it points to `\secref{revival-varargs}` (`changes.tex:3996`), whose Effect names the forms still not compiled (row 1086) and the spread argument that neither implementation passes (row 1085), instead of repeating them.

## A second sentence of the same entry

The entry's callout in the introduction reads (`Specification/preliminaries/intro/nutshell.tex:108-111`):

    \revision{revival-supported}{The Working Draft said that keyword parameters and
    variable size argument lists are supported.
    Keyword parameters are not built, and compiled code takes no variable size
    argument list.}

Since `e9bc2ed3e3`, `fortress compile` under the selection writes compiled code whose method takes the arguments of a varargs parameter as one array (`CodeGen.java:7775-7911`; `NamingCzar.java:1036-1045`, `varargsDomainAsArray`), so "compiled code takes no variable size argument list" is false as written. What holds is the preface's reading: no program with one runs on the compiled path (row 1062). A callout "says what walk or the compiled path does" (`references/records.md`, "Sentences of the specification made false"), so it is corrected in the same repair. The sentence of the introduction itself, "Variable size argument lists are also supported under the interpreter" (`nutshell.tex:106-107`), and the team's note at `nutshell.tex:14-15` stay.

## No other finding

- The review's corrections commit, `17b55bcc72`, changes only paths under `explorations/` (`git show --stat 17b55bcc72`: twelve files, all under `explorations/`).
- The batch's other edits under `Specification/` are G's (`git diff --stat c799851472 HEAD -- Specification`: `changes.tex`, 18 lines, and `functions.tex`, 9 lines), which the review checked and the gather built ('Output written on fortress.pdf (727 pages, 2533509 bytes)', `RECORD.md:53`).
- No FACTS entry or ledger row cites `changes.tex:64xx`, `nutshell.tex` or `revival-supported` (a grep of `FACTS.md` and the ledger printed nothing), so the repair moves no citation of the record.

## The repair

1. In `Specification/appendices/changes.tex:6407-6409`, replace the three lines quoted under "The finding" with these six:

       Keyword parameters are built in neither implementation (row~652).
       The code generator refuses a varargs parameter under the compiled path's own
       library, which declares no \TYP{ImmutableArray}; against \library\ it compiles
       one, but a program compiled against \library\ does not run yet (row~1062), and
       \secref{revival-varargs} names the forms that it does not yet compile.
       An object takes no varargs parameter (row~11).

   `\TYP` is used so at `changes.tex:4043`, `\library` is defined in `Specification/latex-common/macros/macros.tex:78`, and `revival-varargs` is the label at `changes.tex:3996`. Change nothing else of the entry: its Rationale's count of items (`:6385-6386`) and the preface's list are unchanged, since the preface's item stays.

2. In `Specification/preliminaries/intro/nutshell.tex:110-111`, replace

       Keyword parameters are not built, and compiled code takes no variable size
       argument list.}

   with

       Keyword parameters are not built, and no program with a variable size argument
       list runs on the compiled path yet.}

   leaving `:108-109` as they are.

3. Check that no sentence of the specification still cites row 624: `grep -rn '~624' Specification --include=*.tex` prints nothing.

4. Build the specification once in the main tree, as the skill's `references/specification.md`, "Building it", says (detached, with its log under `tmp/`). Both commands end in `BUILD SUCCESSFUL`, and the warning `grep -c` over `Specification/fortress/fortress.log` prints 0. With `pdftotext`, quote the new Effect sentence and the new callout from the built PDF. Then `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`. Build nothing under `ProjectFortress/` and run no test: no code changes, and an edit of the specification has no test (`SKILL.md`, "Rules for every task").

5. In `explorations/compile-ladder/rung-varargs/REPORT.md`, "Sentences of the specification made false" (`:129-133`), add two items after `:133`, each quoted at `c799851472` with its file and line and marked as found by the merged-diff review and changed by this repair: `changes.tex:6407-6409` ("the code generator refuses a varargs parameter (row~624)") and `nutshell.tex:110-111` ("compiled code takes no variable size argument list"). Give each its new text.

6. In `explorations/compile-ladder/climb-batch-33b/RECORD.md`, rung G's section (`:155-169`), add one line after `:169`: the review's finding, the judge's addition of the callout, the two passages changed, and the specification's build lines from step 4.

7. Commit the four paths in one commit on `main`, by the skill's `references/committing.md` (the paths named, its footer), with a message that says it edits the original tree's specification, and push as the repair stage's brief says.

## For the curator

Nothing. The rule that settles both sentences is on record (`references/specification.md`, "When the text and an implementation disagree"), and the reading that the preface's item stays is the gather's and the varargs entry's (`RECORD.md:169`; `changes.tex:4053-4054`).
