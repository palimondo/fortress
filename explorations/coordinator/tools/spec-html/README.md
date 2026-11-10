<!-- The specification as HTML for a phone: `spec2html.py` converts chapters of `Specification/` (the LaTeX that the revival revises) into the static reader under `docs/specification/`, which GitHub Pages serves at https://palimondo.github.io/fortress/specification/, with the reader's place, notes along the text and their export kept in the browser; a first sample of 2026-11-10 holds the front matter and chapters 1 to 6, and this note says how to run it over more chapters and what does not convert yet. -->

# The specification as HTML for a phone

`spec2html.py` converts chapters of the specification's LaTeX into a reader of static pages: no server, no external resource, no web font. The pages go to `docs/specification/`, beside the revival page, and GitHub Pages serves them at https://palimondo.github.io/fortress/specification/ once `main` is pushed (`.github/workflows/pages.yml` publishes `docs/`).

The first sample holds the front matter (`preface`) and chapters 1 to 6: Introduction, Overview, Programs, Lexical Structure, Evaluation, Types. The contents page lists all 53 chapters and appendices, and marks the 47 that are not converted.

## The files

- `spec2html.py`: the conversion and the site's pages. Python 3, standard library only.
- `reader.css`, `reader.js`: the reader. The build copies them into `docs/specification/`. The colours, the type sizes and the Select button come from the revival page, `explorations/coordinator/process-engineering/revival-story.html`. The fonts are the system's: the house fonts are named first in the stacks and used only where a device has them.
- `check.js`: the check in Chromium, through Playwright, at a phone's width (below).

## Running it

From the repository root:

    python3 explorations/coordinator/tools/spec-html/spec2html.py --list          # every chapter with its slug
    python3 explorations/coordinator/tools/spec-html/spec2html.py --try variables,functions
    python3 explorations/coordinator/tools/spec-html/spec2html.py --chapters preface,intro,overview,programs,lexical-structure,evaluation,types,declarations,variables
    python3 explorations/coordinator/tools/spec-html/spec2html.py                 # the chapters of DEFAULT_CHAPTERS

- `--try` converts chapters into the work folder only (`/tmp/spec-html-work/try/`) and prints, for each, the constructs that did not convert. It writes nothing under `docs/`.
- A build without `--try` rewrites every page of `docs/specification/`: the chapters named, `index.html` (the contents), `notes.html`, `references.html`, `reader.css` and `reader.js`. To add chapters, add their slugs to `DEFAULT_CHAPTERS` in the script, so that a later plain run keeps them. A cross-reference into a chapter that is not in the list shows its number and the marker "[not converted yet]".
- The script exits 1 while a published chapter holds a construct that it did not convert. Such a construct shows in the page in red.
- `--base` sets the public address that the links of exported notes start with. `--work` sets the scratch folder.
- The script reads `Specification/`, `SpecData/examples/`, `SpecData/tables/` and `Fortify/fortify.el`. It writes nothing in the original tree. It builds and runs no Fortress.

After a build, check the pages as a reader sees them:

    mkdir -p /tmp/spec-srv && ln -sfn "$PWD/docs" /tmp/spec-srv/fortress
    python3 -m http.server 8765 --directory /tmp/spec-srv &
    node explorations/coordinator/tools/spec-html/check.js

`check.js` opens every page at 390 px, light and dark, and fails on a page that scrolls sideways. It then writes three notes (a paragraph, a code example, a heading), scrolls, reloads, and checks the notes, the offer to continue on the chapter and on the start page, the export's text, the clipboard, the saved file, a link of the export, edit and delete, an import into a cleared browser, the switch between the two forms of the code, the Select button, that no request leaves the site, and that the pages work when the browser refuses `localStorage`. It saves `spec-reader-light.png` and `spec-reader-dark.png` under `/tmp`. Read the two screenshots: the script does not judge how the text looks.

## How the text is converted

The script is a converter of its own over the macros that the chapters use. Two tools on this machine were tried first, on Chapter 2:

- `pandoc` 3.1.3 (`-f latex -t html --mathml`, with the tree's macro files before the chapter) drops what it does not know without a word. Every `\VAR`, `\TYP`, `\KWD` and `\EXP` of Fortify's markup vanished from the prose ("the type of is inferred"), as did every example, every `\note` and the `\revision` callout.
- `htlatex` (TeX4ht, which runs real TeX) stopped at its first use of a superscript under the tree's macros (`! Argument of \:tempc has an extra }`, at `\:tempb{sup}`) and wrote no page. The code environments of `Fortify/fortify.sty` set lines with TeX boxes, which TeX4ht would turn into pictures or lose in any case.

What the script does:

- **Structure.** It walks the `\input`s from `Specification/fortress/fortress.tex` and numbers parts, chapters, sections, subsections and figures as LaTeX does. The chapter numbers agree with the table of contents of `Specification/fortress.pdf`. Each page is one chapter. A section's anchor is its label (`\seclabel{overview:apis}` gives `#sec-overview-apis`), so it stays when sections are renumbered; a section without a label gets `#s-` and its title.
- **Blocks.** Every paragraph, code example, table and heading has an id that notes hang on. The id of a paragraph is a hash of its text (`#p-934d16e7`), so it stays while the paragraph's words stay, whatever is added before it. When a revision changes a paragraph, a note on it is kept and listed at the top of its chapter, with the words it was written on.
- **Code examples.** An example has two forms, and a switch above it changes all examples at once:
  - as the specification renders it. For an example that the build takes from `SpecData/examples/`, the script runs the tree's own tool `foreg` (Fortify, in Emacs, `bin/foreg`) on a copy of the `.fss` file in the work folder, as the specification's `ant genSource` does, and converts the LaTeX that it writes. For an example written by hand in a chapter (`\begin{Fortress}`), it converts that LaTeX. Tab stops become nested boxes, so continuation lines align as in print; a wide example scrolls inside its box.
  - as Fortress that a person types: the lines between `(** EXAMPLE **)` and `(** END EXAMPLE **)` of the `.fss` file, or, for a hand-written example, the commented lines that the authors left directly before `\begin{Fortress}`.
- **Math and Fortify's markup** become text with Unicode characters, italics, superscripts and subscripts, not pictures and not MathML, so that Speak reads them and a selection copies them.
- **Tables and grammar.** `tabular` becomes a table that scrolls inside its box; the `Grammar` environment becomes a box headed "Syntax". The three tables of reserved words, which the build generates with Perl from `SpecData/tables/`, are read from there.
- **Cross-references** are links where the target chapter is converted, and the number with "[not converted yet]" where it is not.
- **The revival's callouts.** `\revision{label}{text}` becomes a blue box headed "Revised by the 2026 revival", with the reference to its entry in Appendix I. The authors' `\note{}` boxes show as "Draft note", as in a draft build of the PDF.
- **Macros.** The `\newcommand`s of `Specification/latex-common/macros/` are read and expanded, so a chapter that uses the tree's own shorthand needs nothing new in the script.

## The reader

- **Place.** A chapter page stores, in `localStorage` under `fortress-spec.place.v1`, the block at the top of the screen, for each chapter and for the last one read. The start page offers to continue there; a chapter opened from the contents offers the place where that chapter was left.
- **Notes.** The pencil at the end of a paragraph, in the bar of a code example, or beside a heading opens a text box under that place. A place with a note has a bar at its left and the note under it, with Edit and Delete. The top of a chapter lists its notes; the bar shows the count; `notes.html` lists all. They are kept under `fortress-spec.notes.v1`.
- **Export and import.** `notes.html` shows all notes as text, copies it to the clipboard and saves it as a file. For each note the text gives the chapter, the section's number and title, a link to the place, the kind and first words of the passage, the time, the note's identity, and the note. The same page imports such a file, or its pasted text; a note that is already there is not doubled.
- **Without storage** (private browsing, storage switched off) the pages work, a note lasts until the page is left, and a warning says so.
- **Select.** The button beside a heading selects that section's text up to its first subsection, for Speak. The list of sections, the buttons and the reader's own notes are not selectable, so they are not read.

## What does not convert yet

`--try` over all 53 chapters and appendices, 2026-11-10: 33 of the 47 that are not published convert with no construct left over, though nobody has read them at a phone's width yet. The other 14 hold what this table lists:

| What | Where | Why |
|---|---|---|
| The API listings of the library | the library chapters (12 `\input`s of `Specification/library/apis/`) | The build generates them from the library's `.fsi` files with the tree's tool `fortex`; they are not in the tree. The script marks each as "not in this edition". `fortex` is Emacs too, so the script can run it as it runs `foreg`. |
| The five drawings of components | chapter 22 (`*.eepic`, 360 drawing commands) | They are pictures in LaTeX's `picture` language; each needs redrawing as SVG. |
| Overstruck operator symbols (`\OverStrike`, `\UPTRI`, `\DOWNTRI`) and the operator tables (`\UnicodeOp`, 979 rows, with `\>` tab stops) | chapter 16, appendix F (about 1,300 constructs between them) | The macros build a symbol from two boxes; each needs its Unicode character in the script's table. |
| Symbols missing from the table (`\ngeq`, `\preccurlyeq`, `\boxminus`, `\Cap`, `\bmod`, `\binom`, `\genfrac`, `\dddot` ...) | chapters 13, 16, 34, 40, 43, appendix D | One line each in `SYM`. |
| `\nolinkurl` (249 uses), `\thinmuskip`, `\lastskip`, `\tracingmacros` | appendix I, chapters 17, 31, 33, 40, 41 | Commands that the script does not know; each is a short handler. |
| Appendix A, the calculi | appendix A | The chapter sets its own `\home` and reads four macro files; the script does not follow that yet, and the inference rules (arrays of premises over a conclusion) have no rendering. This is the largest piece of work. |
| The bibliography's numbers | every `\cite` | The PDF numbers the cited works (BibTeX, `plain`); the reader cites by key, `[JLS]`, and `references.html` lists every entry of `fortress.bib` under its key. |
| The index | every `\index` | Dropped; the reader has no index page. |
| Stretching brackets around a matrix, fractions larger than two lines | chapter 2 (two examples), later chapters | The brackets keep their plain size. |
| Figures | later chapters | A figure stays where its source is; none floats. |
| The source form of a hand-written example without commented source | none in the sample | Such an example shows only as the specification renders it. |

The commented source before a hand-written example is the authors' own, and nothing checks that it still matches the LaTeX under it.
