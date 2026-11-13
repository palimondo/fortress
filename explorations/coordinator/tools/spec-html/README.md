<!-- The specification as HTML for a phone: `spec2html.py` converts the whole of `Specification/` (the LaTeX that the revival revises) into the static reader under `docs/specification/`, which GitHub Pages serves at https://palimondo.github.io/fortress/specification/; LaTeX itself sets every example, displayed formula, table, grammar box and drawing, and dvisvgm turns them into SVG whose text is text; the reader keeps the place, notes along the text and their export in the browser; this note says how to run the converter and its three checks, what the curator decided, and what differs from the PDF. -->

# The specification as HTML for a phone

`spec2html.py` converts the specification's LaTeX into a reader of static pages: the front matter, the 43 chapters and the 10 appendices, 54 pages. The pages go to `docs/specification/`, beside the revival page, and GitHub Pages serves them at https://palimondo.github.io/fortress/specification/ once `main` is pushed (`.github/workflows/pages.yml` publishes `docs/`). Nothing comes from another site.

A first sample of 2026-11-10 held the front matter and chapters 1 to 6. The curator read it and decided how the rest is made; `curator-notes.md` holds his words. This run follows them:

1. Examples and displays are LaTeX converted to SVG. The converter's own rendering of displayed code and formulas is gone.
2. Code words and formulas inside a sentence stay HTML text, with the three rules of `reader.css` that he approved (no ligatures in code, the inline highlight with narrow side padding, serif curly quotation marks). Those rules are unchanged.
3. Every table and display is compared with the PDF. "The checks" below says how, and what a person still has to look at.
4. An address of the authors' text gets the edition's link to the Internet Archive.
5. The revival's paragraph in the preface has the tint of the revival's additions, and the opening explains the tint.
6. A quote pair around the whole of a typewriter span is curly; an apostrophe inside code stays as typed.
7. Where the specification shows ASCII, the page shows ASCII.

## The files

- `spec2html.py`: the conversion and the site's pages. Python 3 with its standard library and `fontTools` (to read the fonts it makes). It runs `latex`, `dvisvgm` and Emacs (for the tree's Fortify).
- `reader.css`, `reader.js`: the reader. The build copies them into `docs/specification/`.
- `check.js`: the reader in Chromium at a phone's width (below).
- `compare.js`: every display in Chromium against LaTeX's own picture of it (below).
- `pdfcheck.py`: the words of every block against the words of `Specification/fortress.pdf` (below).
- `curator-notes.md`: the curator's decisions and notes.

The build also writes `tex-fonts.css` and `fonts/` under `docs/specification/`: the fonts of the displays.

## Running it

From the repository root:

    python3 explorations/coordinator/tools/spec-html/spec2html.py --list            # every chapter with its slug
    python3 explorations/coordinator/tools/spec-html/spec2html.py --try variables,functions
    python3 explorations/coordinator/tools/spec-html/spec2html.py --try all
    python3 explorations/coordinator/tools/spec-html/spec2html.py                   # the whole specification, into docs/specification/

- A plain run takes about a minute when the work folder is warm, and about three minutes when it is empty. It rewrites every page of `docs/specification/`: the 54 chapter pages, `index.html` (the contents), `notes.html`, `references.html`, `reader.css`, `reader.js`, `tex-fonts.css` and `fonts/`. No page is edited by hand.
- `--try` converts into the work folder only (`<work>/try/`, with the reader's files, so the pages can be opened) and prints, for each chapter, what did not convert. It writes nothing under `docs/`.
- `--chapters a,b` publishes only those chapters; a cross-reference into a chapter that is left out shows its number and "[not converted yet]".
- The script exits 1 if a published chapter holds a construct that it did not convert, a display on which LaTeX reported an error, or a display that uses a character that the fonts lack. Such a place shows in the page in red, and the report names it.
- `--work` sets the scratch folder (default `/tmp/spec-html-work`): the examples as Fortify renders them, the LaTeX file of each chapter's displays with its log, the SVGs, the fonts. `--base` sets the public address that the links of exported notes start with.
- The script reads `Specification/`, `SpecData/examples/`, `SpecData/tables/`, `Fortify/`, and the `.fsi` files of `Library/` and `ProjectFortress/LibraryBuiltin/`. It writes nothing in the original tree. It builds and runs no Fortress.

## How the text is converted

The script is a converter of its own over the macros that the chapters use (`pandoc` and `htlatex` were tried on the first sample: the first drops Fortify's markup without a word, the second stops under the tree's macros).

- **Structure.** It walks the `\input`s from `Specification/fortress/fortress.tex` and numbers parts, chapters, sections, subsections, figures, lemmas and theorems as LaTeX does. Each page is one chapter. A section's anchor is its label (`\seclabel{overview:apis}` gives `#sec-overview-apis`); a section without a label gets `#s-` and its title.
- **Running text** becomes HTML: paragraphs, lists, headings, footnotes, the authors' `\note` boxes ("Draft note"), the revival's `\revision` callouts. Fortify's markup and formulas inside a sentence become HTML text with Unicode characters, italics, superscripts and subscripts. The `\newcommand`s of `Specification/latex-common/macros/` are read and expanded, and so are the definitions that a chapter makes for itself (`\def`, `\newcommand`, `\renewcommand`, `\RenewDocumentCommand`), and the macro files that Appendix A reads for each of its calculi, in its order.
- **Displays** are set by LaTeX. A display is an example (`\begin{Fortress}`, or a file of `SpecData/examples/` that the tree's tool `foreg` renders, as the specification's `ant genSource` does), a displayed formula (`\[ \]`, `$$ $$`, `align`, `eqnarray`), a table (`tabular`, `array`), a grammar box (`Grammar`, `GrammarTwo`), a `tabbing` or `ttt` block, a drawing (`*.eepic`), and a table of reserved words (written as the build's Perl scripts write it). For each chapter the script writes one LaTeX file with the preamble of `fortress.tex` and one page for each display, in a box of the PDF's text width; the chapter's own definitions go into the file at their places; the labels of the whole specification go into its `.aux` file, so that a reference inside a display prints its number and links to its page. `latex` sets the file, `dvisvgm` converts each page, and the script puts the SVG into the page, inline.
  - The text of a display is SVG text in the TeX fonts, so it can be selected and copied. The fonts are made by dvisvgm from the fonts of the TeX installation and are served from `fonts/`; a page loads only those that it shows.
  - One SVG serves the light and the dark theme: its ink is `currentColor`, the colour of the text around it.
  - A display wider than the screen scrolls sideways inside its frame, at the PDF's proportions: a display is not reflowed.
  - A footnote inside a display joins the chapter's footnotes, and the display shows its number.
  - An example that has a source form shows it too, as before: the lines between `(** EXAMPLE **)` and `(** END EXAMPLE **)` of the `.fss` file, or the commented lines that the authors left before `\begin{Fortress}`. A switch above an example changes all examples.
- **A formula inside a sentence that HTML text cannot show** (an array, an overstruck operator, a binomial, a command that the converter does not know) is set by LaTeX too, as an SVG on the line's baseline. There are 83 of them, most in chapters 16 and 34 and Appendix A. Every other inline formula is HTML text, as the curator decided.
- **The API listings of the library** (chapters 29 and 30) are made as the build makes them: the tree's tool `fortex` on a copy of each `.fsi` file. Their code is set by LaTeX, their documentation comments are running text. They show the library as it is in the tree today.
- **Cross-references** are links. **Citations** show the key of the work and link to `references.html`.

## The edition's layer over the authors' text

The source text is not changed for any of this; the converter adds it, and it is visible as the edition's.

- **The tint.** What the 2026 revival added stands on a light tint of the ground (`.rv` and `aside.revision` in `reader.css`, the colour `--rev-bg`, in light and in dark): the callout of a revised passage, the revival's paragraph in the preface, the revival's section of Appendix I, and the links below. The contents page and the preface open with one sentence that shows the tint and says what it means. The converter knows the revival's paragraph and section from two short lists at its top, `REVIVAL_PARAGRAPHS` and `REVIVAL_SECTIONS`: the source does not mark them.
- **Archived copies.** Beside each address of the authors' text (`http://projectfortress.sun.com` and the others, also in the references), the edition puts a link "archived copy" to `https://web.archive.org/web/2008/<address>`. The Internet Archive resolves a partial date to the nearest capture. 2008 is the year of the release that the preface names with the address; `ARCHIVE` at the top of the script sets it. The container cannot reach the Internet Archive, so no link was opened.
- Not built, because the curator has not decided it: marking which words of a revised passage changed (`curator-notes.md`, "The revival's callouts do not show which text changed").

## The reader

- **Place.** A chapter page stores, in `localStorage` under `fortress-spec.place.v1`, the block at the top of the screen, for each chapter and for the last one read. The start page offers to continue there; a chapter opened from the contents offers the place where that chapter was left.
- **Notes.** The pencil at the end of a paragraph, in the bar of a code example, under a table or beside a heading opens a text box under that place. `notes.html` lists all notes, exports them as text, and imports such a text. They are kept under `fortress-spec.notes.v1`.
- **Without storage** (private browsing) the pages work, a note lasts until the page is left, and a warning says so.
- **Select.** The button beside a heading selects that section's text up to its first subsection, for Speak.

### The ids that notes hang on

- The id of a paragraph is a hash of its words (`#p-934d16e7`). Every paragraph of the first sample keeps its id, among them the two that carry the curator's notes, `preface.html#p-0ea553b6` and `preface.html#p-033235cb`. To keep them, the hash still counts the words "[not converted yet]" after a reference into a chapter outside the first sample, as that sample showed them; the edition's own links are not counted.
- One paragraph of chapter 4 changed its id, because its words changed: the one with a quote pair inside a typewriter span (decision 6). 
- The ids of tables (`t-`), grammar boxes (`g-`), and code blocks without a source form (`c-`) changed: 34 in the first sample's chapters (14 in chapter 2, 12 in chapter 4, 2 in chapter 5, 6 in chapter 6). They were hashes of the HTML that the converter's own rendering made, which is gone; they are now hashes of the display's LaTeX source. A code block with a source form keeps its id. `reader.js` keeps a note whose place is gone and lists it at the top of its chapter, with the words it was written on.

## Changes to reader.css and reader.js

For a page that uses the reader's files, such as the walk-through under `docs/microgpt/`:

- `reader.js` is unchanged.
- No rule of `reader.css` was changed or removed, and no class was renamed.
- Added to `reader.css`, at its end: `svg.tx` and `svg.tx.il` (a display, and one inside a sentence), `.mw` (the frame of a long formula inside a sentence), `.rv`, `a.ed`, `.legend` (the edition's layer), `.doc` (the documentation text of an API listing), `.hr` (a rule inside a formula), and `white-space: normal` for `.m` inside headings, `dt`, `figcaption`, `summary` and `nav`.
- The converter no longer writes these, whose rules stay in the stylesheet: `.fx-r .tb`, `.fx-r .l`, `.gapline`, `.cm`, `table.tab`, `table.grammar`, `div.words`, `.tw.gr .label`. `.fx-r`, `.dm` and `.tw` now hold one `svg.tx`.
- A chapter page with displays links `tex-fonts.css` and carries a `<style>` with the font classes of its SVGs (`svg.tx text.t0` and so on).

## The checks

Serve the pages, then run the three:

    mkdir -p /tmp/spec-srv && ln -sfn "$PWD/docs" /tmp/spec-srv/fortress
    python3 -m http.server 8765 --directory /tmp/spec-srv &
    node explorations/coordinator/tools/spec-html/check.js
    node explorations/coordinator/tools/spec-html/compare.js /tmp/spec-html-work http://localhost:8765/fortress/specification/
    python3 explorations/coordinator/tools/spec-html/pdfcheck.py

- **`check.js`** (about a minute) opens every page that the contents lists at 390 px, light and dark. It fails on a page that scrolls sideways, on a construct left unconverted, on a display whose font is missing or lacks a character, and if the ink of the displays is not the colour of the text in both themes. It checks that the text of a display can be selected, the three rules for code inside a sentence, the curly quote pair, the two note-carrying ids of the preface, the archive link, and the tint. Then, as before: notes on a paragraph, a code example and a heading, the place, export and import, the switch between the two forms of the code, Select, that no request leaves the site, and the pages without `localStorage`. It saves two screenshots.
- **`compare.js`** (about five minutes) sets each chapter's displays a second time, with `pdflatex` from the same file, makes a picture of each page with `pdftoppm`, takes a picture of the same display in Chromium, and compares the two: their sizes, and the share of the ink of each that lies within two pixels of the other's. This is the check that would have caught the chapter 4 tables of the first sample. It found two faults while this run was built: dvisvgm wrote the Courier font without the characters U+002E to U+005F when it wrote the whole font at once (the fonts are now written in pieces of 32 codes, and the build reads each piece back and fails if a character that a display uses is missing), and the frame of a table lost its top and left lines at the edge of the picture (each SVG now has a margin).
- **`pdfcheck.py`** (ten seconds) reduces every paragraph, heading, list item, caption and display of the pages to its letters and digits, does the same with the text of `Specification/fortress.pdf`, and looks for each block's runs of ten characters in the PDF. A block that lost a row, was set from the wrong source or was filled with something else fails. It found the lemma numbers of Appendix B, the lost footnotes of grammar boxes, and four commands that the text form had mishandled (`\rule`, `\vspace*`, `\not` before a macro, and the calculi's own `\exp`).

Results of 2026-11-13, on the 54 pages:

- `check.js`: all pass.
- `compare.js`: 1,229 displays compared, 5 differ, none by a fault of the page. Three of chapter 16 agree to 77–92 % where the limit is 92 % (one small glyph, and a row of typewriter symbols that the two renderers hint differently). One of chapter 23 holds a citation and one of chapter 33 a reference, which the reader shows as a key and a link and the second LaTeX run shows as `?`.
- `pdfcheck.py`: 6,845 blocks compared, 8 not found in the PDF, each with 63–75 % of its runs where the limit is 75 %: three paragraphs and five displays dense with symbols (chapters 9, 13, 16, 40 and Appendix F), read and found right. 98 more are displays of symbols with too few letters to judge by words; `compare.js` covers them.

What these checks do not do, and what was looked at by eye:

- No tool here places a display beside its page of the PDF. `compare.js` compares with LaTeX's picture from the same source and macros as the PDF, and `pdfcheck.py` compares words with the PDF. Together they cover every display, but neither is a person looking at the PDF's page.
- Looked at beside the PDF's page, at 390 px and at a desktop's width: the preface; the character tables of chapter 4 (page 45 of the PDF, the curator's example: the `&`, the row, and the white brackets are right) and its reserved words (page 51); the grammar boxes of sections 7.1 and 9.5 (page 96); Figure 16.1 (page 172); Figure 22.1 (page 228); the first two figures of Appendix A (page 506); sections F.2 to F.4 of Appendix F (page 547).
- Not looked at beside the PDF by a person: the other displays and tables, among them most of the 979 rows of the operator tables of Appendix F, the inference rules of Appendix A apart from the first figure, and the API listings.

## What differs from the PDF

| What | Where | Why |
|---|---|---|
| A display does not reflow | every chapter | It is LaTeX's page at the PDF's width; on a phone a wide one scrolls inside its frame. |
| Formulas inside a sentence are HTML text in the device's fonts | every chapter | The curator's decision. Brackets do not stretch, spacing is the browser's, a fraction is two short lines. |
| Some symbols of a display copy as private-use characters | displays with `⟦ ⟧`, `⊢`, primes, large delimiters and other glyphs that the TeX fonts name without a Unicode value | dvisvgm gives such a glyph a code point from U+E000. The picture is right; a copy of the text, and Speak, get a character without meaning. |
| The bibliography's numbers | every `\cite`, also inside displays | The PDF numbers the cited works; the reader cites by key, `[JLS]`, and `references.html` lists every entry of `fortress.bib` under its key. |
| The index | every `\index` | Dropped; the reader has no index page. |
| The arrowheads of the five drawings are solid | chapter 22 | The PDF is made by pdflatex with `eepicemu`, which cannot fill; the reader's drawings come from `latex` with `eepic`, which fills them as the drawing asks. |
| Figures and tables stay where their source is | every chapter | None floats to the top of a page. |
| A display inside a draft note has the size of the text | a few notes | In the PDF the note's box sets it smaller, in the sans face. |
| The API listings show today's library | chapters 29 and 30 | They are made from the `.fsi` files of the tree, as the build makes them; a listing has no source form in the reader. |
| The page numbers of `\pageref` | rare | The reader has no pages. |
| The title page and the table of contents | front | The contents page of the reader stands for both. |
| Appendix I's section of the revival is tinted as a whole | Appendix I | The edition's layer. |

The commented source before a hand-written example is the authors' own, and nothing checks that it still matches the LaTeX under it.

## Faults of the source text that the conversion met

Nothing under `Specification/` was changed. These are for whoever edits it:

- `Specification/basic-lib/objects.tex:17` holds `\tracingcommands=1\tracingmacros=1`, a TeX debugging switch left in the chapter. It prints nothing, but it makes the build's log very large from there on.
- `Specification/basic/expressions/literals.tex:45`, in a margin note: ``\b'' is LaTeX's accent command (a bar under the next character), where the authors meant a backslash and the letter b. The PDF shows a quotation mark with a bar under it.
- `Specification/basic/lexical-structure.tex:866`: of three quoted code points in one sentence, the second has its quote pair inside the typewriter span and the others outside (`` `\txt{001C}', \txt{`FBAB'}, `\txt{1D11E}' ``). The reader shows all three alike.
