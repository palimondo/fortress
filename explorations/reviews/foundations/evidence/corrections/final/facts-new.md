<!-- The two new FACTS entries that the sort of the phase 3 exit review's findings names (postmortem-2026-10-28/evidence/findings-homes.md, "Totals": P-37 d and P-158 a), each in the record's entry form with the report section that holds its detail and its record.py add command, and the pointers that P-37 and P-158 take once they exist. Written by an Opus worker on 2026-10-29; nothing applied. -->

# Two new FACTS entries, and their pointers

## How to run

- Run these after `apply.txt` and `history-notes.md`, from the repository root, in the order below.
- `add` numbers each entry itself. The highest number that FACTS has used is F-292, so the first add takes F-293 and the second F-294, if nothing is added before them. Each add prints its number. If a number differs, use the printed one in the two `set` commands.
- Each entry line is in a quoted heredoc, which the command reads as its FILE through `/dev/stdin`.
- All four commands ran clean on a scratch copy of the record, after `apply.txt` and the notes. The final report gives the check.

## F-293, the fourth compiler-only file (finding P-37 d)

The entry, 590 characters with its number:

> - F-293 **`CompilerSystem` is a fourth file of the compiler's library, outside its prelude, and compiled tests import it by name.** `Library/CompilerSystem.fsi` and `.fss` are the compiled path's own `System` api (`args`, `getProperty`). No program imports it by default: the compiled path's default imports are the prelude's three files and `AnyType` (`WellKnownNames.useCompilerLibraries`). 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it. P-37 names only the prelude's three files. Read in the tree. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".

- Its detail: `explorations/reviews/phase3-exit/zero-audit.md`, "A.2 Scope"; and `explorations/reviews/foundations/prelude-lens.md`, "0. How to read this", which names the four wired files of the compiler's library.
- Its evidence, read in the tree on 2026-10-29: `Library/CompilerSystem.fsi` declares `args` and `getProperty`. `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java`, `useCompilerLibraries()`, sets the default imports to `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra` and `AnyType`. `grep -rl 'import CompilerSystem'` finds 27 files in `ProjectFortress/compiler_tests/`, and `ProjectFortress/other_compiler_tests/Compiled2PreTest3.fss` names it too.
- It decides nothing. Whether `CompilerSystem` goes at the switch-over is open and his (`explorations/coordinator/postmortem-2026-10-28/evidence/compilersystem-words.md`). F-290 counts the errors of the one library's `System`, and F-292 holds the compiled tests that import `CompilerSystem` under the bound `Any`.

```bash
python3 explorations/coordinator/tools/record.py add F --section 'The checker and the one library' /dev/stdin \
  --from 'reviews/phase3-exit/zero-audit.md#A.2 Scope' \
  --by "the corrections' final writer (Opus)" \
  --note 'foundations finding P-37 d (salvage-findings.md), sorted to FACTS (postmortem-2026-10-28/evidence/findings-homes.md); the tree read on 2026-10-29: WellKnownNames.useCompilerLibraries, 27 importers in compiler_tests and 1 in other_compiler_tests' <<'ENTRY'
- **`CompilerSystem` is a fourth file of the compiler's library, outside its prelude, and compiled tests import it by name.** `Library/CompilerSystem.fsi` and `.fss` are the compiled path's own `System` api (`args`, `getProperty`). No program imports it by default: the compiled path's default imports are the prelude's three files and `AnyType` (`WellKnownNames.useCompilerLibraries`). 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it. P-37 names only the prelude's three files. Read in the tree. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".
ENTRY
```

## F-294, the specification's export rule (finding P-158 a)

The entry, 593 characters with its number:

> - F-294 **The specification's export rule asks a component to declare each field and non-abstract method of an api's trait or object, not its abstract methods.** The component's declaration has the api's header and may give an abstract method a body (`Specification/basic/components/source-code.tex`, "Export Statements"; `apis.tex` agrees). So P-158 asks more, and no revision note records it (P-95). The team's export check refused a missing abstract member from 2009 (row 816). Read in the source. Detail: `reviews/foundations/evidence/corrections/p/checks.md`, "5. The export-check dates".

- Its detail: `explorations/reviews/foundations/evidence/corrections/p/checks.md`, "5. The export-check dates: the judge's claim holds, and item 280 is wrong".
- Its evidence, read in the source on 2026-10-29: `Specification/basic/components/source-code.tex:372-385`, "Export Statements". A satisfying trait or object declaration "contains, for each field declaration and non-abstract method declaration in the exported declaration, a satisfying declaration", and "a satisfying trait declaration is allowed to provide a concrete declaration" of an abstract method. `Specification/basic/components/apis.tex:250-256` asks "definitions for all declarations other than the methods or fields declared abstract". Neither file holds a `\revision` callout. The team's check: `edb516dba` (Sukyoung Ryu, 2009-03-10). The tree's check skips abstract api members (row 816).
- It decides nothing. Whether P-158 stands against the rule, with a revision recorded under P-95, is his (review-queue item 280).

```bash
python3 explorations/coordinator/tools/record.py add F --section 'The checker and the one library' /dev/stdin \
  --from 'reviews/foundations/evidence/corrections/p/checks.md#5. The export-check dates' \
  --by "the corrections' final writer (Opus)" \
  --note 'foundations finding P-158 a (salvage-findings.md), sorted to FACTS (postmortem-2026-10-28/evidence/findings-homes.md); the export rule read at Specification/basic/components/source-code.tex:372-385 and apis.tex:250-256 on 2026-10-29' <<'ENTRY'
- **The specification's export rule asks a component to declare each field and non-abstract method of an api's trait or object, not its abstract methods.** The component's declaration has the api's header and may give an abstract method a body (`Specification/basic/components/source-code.tex`, "Export Statements"; `apis.tex` agrees). So P-158 asks more, and no revision note records it (P-95). The team's export check refused a missing abstract member from 2009 (row 816). Read in the source. Detail: `reviews/foundations/evidence/corrections/p/checks.md`, "5. The export-check dates".
ENTRY
```

## The pointers, once the entries exist

Each is one `set` on the text that `apply.txt` leaves.

**P-37.** A pointer in the parenthesis on the tests. It names the file and decides nothing.

- Words added: "; F-293 holds the compiler's fourth file, `CompilerSystem`".
- The entry, 1165 characters (after `apply.txt`, 1107):

> - P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over exists to avoid the need to port the interpreter's library into the compiler's library; the revival is developing the type checker further, so that it will accept the fuller library that the interpreter uses. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled; F-293 holds the compiler's fourth file, `CompilerSystem`). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.

```bash
python3 explorations/coordinator/tools/record.py set P-37 /dev/stdin \
  --from 'coordinator/HELD.md#Held from his page comments (2026-10-29)' \
  --by "the corrections' final writer (Opus)" \
  --note 'a pointer to F-293, the compiler-only file CompilerSystem, in place of the sentences that the corrections run wrote on it; whether it goes at the switch-over is his (postmortem-2026-10-28/evidence/compilersystem-words.md)' <<'ENTRY'
- P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over exists to avoid the need to port the interpreter's library into the compiler's library; the revival is developing the type checker further, so that it will accept the fuller library that the interpreter uses. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled; F-293 holds the compiler's fourth file, `CompilerSystem`). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.
ENTRY
```

**P-158.** The pointer takes the place of the false sentence, as the sort says (finding P-158 a: cut it, and point to the fact). The false date "of 2012" is cut in the same step (finding P-158 b; the history note gives the true date).

- Cut: "The specification asks for no body there, not for no declaration (`Specification/basic/components/apis.tex`, "Component and API Identity")."
- Cut: "of 2012", in "the team's export check of 2012 enforces it".
- Added: "The specification's export rule asks no declaration of an abstract member (F-294)."
- The entry, 767 characters (after `apply.txt`, 832):

> - P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule asks no declaration of an abstract member (F-294). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).

```bash
python3 explorations/coordinator/tools/record.py set P-158 /dev/stdin \
  --from 'reviews/foundations/evidence/corrections/p/checks.md#5. The export-check dates' \
  --by "the corrections' final writer (Opus)" \
  --note 'the false sentence on the specification ("asks for no body there, not for no declaration", citing apis.tex, "Component and API Identity") replaced by a pointer to F-294, the export rule (foundations finding P-158 a; source-code.tex:372-385); "of 2012" cut from the clause on the export check, a false date (finding P-158 b: the check is of 2009-03-10, edb516dba)' <<'ENTRY'
- P-158 **A member that an api writes `abstract` is declared in the component that exports the api.** The component's trait or object declares each such member at the api's header, with a body or without one. The compiled export check refuses a component that leaves one out, and the checker then checks that each object defines it. Why: the compiler's prelude, the team's later work, restates each such member in the component without a body, and the team's export check enforces it; that way wins over the interpreter's library, written earlier for walk, which leaves some out. The specification's export rule asks no declaration of an abstract member (F-294). Without the declaration, a compiled client's call of the member dies with `NoSuchMethodError` (row 816).
ENTRY
```
