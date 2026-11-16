<!-- The specification as HTML for a phone, in two editions since 2026-11-15: `spec2html.py` converts `Specification-1.0-frozen/` (the team's Working Draft of February 2011) into the static reader under `docs/specification/`, which GitHub Pages serves at https://palimondo.github.io/fortress/specification/, and `Specification/` (the LaTeX that the revival revises) into `docs/specification/revival/`, whose pages ask not to be indexed; `editions.html` lists the specification at its milestones; LaTeX itself sets every example, displayed formula, table, grammar box and drawing, and dvisvgm turns them into SVG whose text is text; the reader keeps the place, notes along the text and their export in the browser; this note says how to run the converter and its three checks, what the curator decided, and what differs from the PDF. -->

# The specification as HTML for a phone

`spec2html.py` converts the specification's LaTeX into a reader of static pages: the front matter, the 43 chapters and the 10 appendices, 54 pages. GitHub Pages serves them once `main` is pushed (`.github/workflows/pages.yml` publishes `docs/`). Nothing comes from another site.

## The two editions

The curator's decision of 2026-11-15: the team's text has the public address, and the revival's edition steps back, out of the search engines. `--source` names the source root, and the source root names the edition.

| | The Working Draft of 2 February 2011 | The revised edition of the 2026 revival |
|---|---|---|
| `--source` | `Specification-1.0-frozen` | `Specification` (the default) |
| Pages | `docs/specification/`, https://palimondo.github.io/fortress/specification/ | `docs/specification/revival/` |
| Beside the LaTeX, the conversion reads | the team's tree at the draft's commit `2f8b4331a` (F-163): `SpecData/`, `Fortify/`, the `.fsi` files of the library, taken from git into the work folder | the working tree |
| Work folder | `/tmp/spec-html-work-draft` | `/tmp/spec-html-work` |
| The revival's layer (callouts, tint, legend, "archived copy" links) | none | as before |
| `<meta name="robots" content="noindex">` | on no page | on every page |
| What the edition adds, and where | the reader's controls; the lines that start "This edition:" in small monospace (class `edline`): one under the title of the contents, one over each library listing, one in the front matter, and the foot of each page | one line at the top of each page (class `edline top`): "The Fortress revival's revised edition of 2026, not the text of the Fortress team", with a link to the same page of the Working Draft |
| Storage in the browser | `fortress-spec.*`, the keys in use since the first sample | `fortress-spec-revival.*` |

- **The pointer at the foot of a Working Draft page** links to the same chapter of the revised edition and says one of three things. "Changed this chapter": the chapter's LaTeX differs under the two roots (the chapter's own text and every file that it reads, comments apart; `chapter_latex`); 28 pages. "Did not change the text of this chapter; … its examples or library listings are those of the tree of 2026": the LaTeX is the same, and an example, a table of reserved words or a listed `.fsi` file differs (`chapter_companions`); 2 pages, the two chapters of library listings. "Did not change this chapter": 24 pages.
- **`editions.html`**, written by the build of the Working Draft and linked from the contents page of both editions, lists 1.0α, 1.0β, 1.0, the Working Draft and, set apart under "Not the team's work", the revised edition. Its dates and facts are from `Specification-history/README.md`, `explorations/coordinator/spec-editions-leads-2026-11-10.md`, F-163, `pdfinfo` and git. The build copies the three PDFs into `docs/specification/pdf/` (2.4, 2.0 and 1.2 MB; the same blobs as in the tree, so the repository does not grow). The PDF of the revised edition (2.5 MB) is linked at its GitHub address, not served from the site. The tree holds no PDF build of the Working Draft of 2011.
- **`revised-only.js`**, written by the build of the Working Draft from the pages of the revised edition: for each chapter, the ids of the blocks that only the revised edition has. Both editions load it (see "The notes across the two editions").
- **Build order.** The revised edition first, then the Working Draft, which reads the revised pages for `revised-only.js`. A crawler's `robots.txt` cannot be served for this site from this repository (it is read at the host's root only), so the `noindex` tag is the measure; `check.js` checks it on every page of both editions.
- **The examples of the Working Draft** are set as the team's tree of February 2011 set them: its `foreg` writes the `Fortress` environment, where the later tree's writes `FortressCode`. The converter takes both.

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
- `pdfcheck.py`: the words of every block against the words of a PDF (below).
- `notes-export-2026-11-15.txt`: the curator's 15 notes as he exported them before the editions were parted; `check.js` imports them.
- `curator-notes.md`: the curator's decisions and notes.
- `widthless-glyphs-2026-11-16.md`: every place of a glyph of no width in the displays of both editions, by page and section (see "The glyphs of no width").

The build also writes `tex-fonts.css` and `fonts/` in each edition's folder: the fonts of the displays.

## Running it

From the repository root:

    python3 explorations/coordinator/tools/spec-html/spec2html.py --list            # every chapter with its slug
    python3 explorations/coordinator/tools/spec-html/spec2html.py --try variables,functions
    python3 explorations/coordinator/tools/spec-html/spec2html.py --try all
    python3 explorations/coordinator/tools/spec-html/spec2html.py                   # the revised edition, into docs/specification/revival/
    python3 explorations/coordinator/tools/spec-html/spec2html.py --source Specification-1.0-frozen   # the Working Draft, into docs/specification/

`--source` goes with every form above (`--list`, `--try`).

- A plain run takes about a minute when the work folder is warm, and about three minutes when it is empty. It rewrites every page of its edition's folder: the 54 chapter pages, `index.html` (the contents), `notes.html`, `references.html`, `reader.css`, `reader.js`, `tex-fonts.css` and `fonts/`. No page is edited by hand.
- `--try` converts into the work folder only (`<work>/try/`, with the reader's files, so the pages can be opened) and prints, for each chapter, what did not convert. It writes nothing under `docs/`.
- `--chapters a,b` publishes only those chapters; a cross-reference into a chapter that is left out shows its number and "[not converted yet]".
- The script exits 1 if a published chapter holds a construct that it did not convert, a display on which LaTeX reported an error, or a display that uses a character that the fonts lack. Such a place shows in the page in red, and the report names it.
- `--work` sets the scratch folder (by default one for each edition, see the table): the examples as Fortify renders them, the LaTeX file of each chapter's displays with its log, the SVGs, the fonts. `--base` sets the public address that the links of exported notes start with.
- For the revised edition the script reads `Specification/`, `SpecData/examples/`, `SpecData/tables/`, `Fortify/`, and the `.fsi` files of `Library/` and `ProjectFortress/LibraryBuiltin/`; for the Working Draft it reads `Specification-1.0-frozen/` and the same folders as `git archive 2f8b4331a` gives them. It writes nothing in the original tree. It builds and runs no Fortress.

## How the text is converted

The script is a converter of its own over the macros that the chapters use (`pandoc` and `htlatex` were tried on the first sample: the first drops Fortify's markup without a word, the second stops under the tree's macros).

- **Structure.** It walks the `\input`s from `Specification/fortress/fortress.tex` and numbers parts, chapters, sections, subsections, figures, lemmas and theorems as LaTeX does. Each page is one chapter. A section's anchor is its label (`\seclabel{overview:apis}` gives `#sec-overview-apis`); a section without a label gets `#s-` and its title.
- **Running text** becomes HTML: paragraphs, lists, headings, footnotes, the authors' `\note` boxes ("Draft note"), the revival's `\revision` callouts. Fortify's markup and formulas inside a sentence become HTML text with Unicode characters, italics, superscripts and subscripts. The `\newcommand`s of `Specification/latex-common/macros/` are read and expanded, and so are the definitions that a chapter makes for itself (`\def`, `\newcommand`, `\renewcommand`, `\RenewDocumentCommand`), and the macro files that Appendix A reads for each of its calculi, in its order.
- **Displays** are set by LaTeX. A display is an example (`\begin{Fortress}`, or a file of `SpecData/examples/` that the tree's tool `foreg` renders, as the specification's `ant genSource` does), a displayed formula (`\[ \]`, `$$ $$`, `align`, `eqnarray`), a table (`tabular`, `array`), a grammar box (`Grammar`, `GrammarTwo`), a `tabbing` or `ttt` block, a drawing (`*.eepic`), and a table of reserved words (written as the build's Perl scripts write it). For each chapter the script writes one LaTeX file with the preamble of `fortress.tex` and one page for each display, in a box of the PDF's text width; the chapter's own definitions go into the file at their places; the labels of the whole specification go into its `.aux` file, so that a reference inside a display prints its number and links to its page. `latex` sets the file, `dvisvgm` converts each page, and the script puts the SVG into the page, inline.
  - The text of a display is SVG text in the TeX fonts, so it can be selected and copied. The fonts are made by dvisvgm from the fonts of the TeX installation and are served from `fonts/`; a page loads only those that it shows.
  - One SVG serves the light and the dark theme: its ink is `currentColor`, the colour of the text around it.
  - A display wider than the screen scrolls sideways inside its frame, at the PDF's proportions: a display is not reflowed.
  - A footnote inside a display joins the chapter's footnotes, and the display shows its number.
  - A glyph of no width is drawn as a path, not left to the text ("The glyphs of no width", below).
  - An example that has a source form shows it too, as before: the lines between `(** EXAMPLE **)` and `(** END EXAMPLE **)` of the `.fss` file, or the commented lines that the authors left before `\begin{Fortress}`. A switch above an example changes all examples.
- **A formula inside a sentence that HTML text cannot show** (an array, an overstruck operator, a binomial, a command that the converter does not know) is set by LaTeX too, as an SVG on the line's baseline. There are 83 of them, most in chapters 16 and 34 and Appendix A. Every other inline formula is HTML text, as the curator decided.
- **The API listings of the library** (chapters 29 and 30) are made as the build makes them: the tree's tool `fortex` on a copy of each `.fsi` file. Their code is set by LaTeX, their documentation comments are running text. They show the library as it is in the tree today.
- **Cross-references** are links. **Citations** show the key of the work and link to `references.html`.

## The glyphs of no width

The curator's note of 2026-11-16: on his phone the table of section E.2.3 of Appendix E showed `=` in the row "`=/=` becomes ≠", where the PDF shows ≠ (`curator-notes.md`).

- **The cause.** TeX has no glyph for ≠. It sets the slash of `\not` (code 54 of the symbol font cmsy), a glyph whose width is zero and whose ink lies to the right of its place, and then `=` over it. The bar of `\mapsto` (code 55) is the same kind, set before →. dvisvgm writes each as a character whose advance is zero. The slash and `=` are in different fonts (cmsy and cmr), so the slash came out alone: `<text class='t2' x='80.33' y='56.19'>&#xE036;</text>`, a piece of text of no width. Nothing was lost in the conversion: the LaTeX, the DVI, the SVG and the font piece all held the slash, and Chromium painted it. The phone's browser did not paint that piece of text. The bar of ↦, which stands in one `<text>` with its arrow, was painted there.
- **Not shown here.** No browser but Chromium runs in the container (Playwright's WebKit lacks its system libraries), so the phone's picture was not reproduced, and which rule of its browser drops the piece is not established; the reading above rests on his report, on the SVG, and on the difference between the slash (alone, lost) and the bar (with its arrow, kept).
- **The repair** (`draw_widthless` in `spec2html.py`). After the fonts are read, every character whose glyph has an advance of zero is taken out of the text of every display, and the glyph's outline, read from the same font piece, is drawn at its place as `<path class='nw'>`. Nothing else moves, since the glyph had no advance. This covers the slash alone, the slash beside its sign and the bar: 161 glyphs in the Working Draft and 177 in the revised edition, on 20 pages of each. The build fails if a display still leaves such a glyph to the text. In Chromium the displays look as before.
- **The places.** `widthless-glyphs-2026-11-16.md` lists them by page and section. The lost kind, the slash alone, stood at 68 places of the Working Draft and 84 of the revised edition, each showing its sign without the slash (`=` for ≠ at 45 and 55 of them). The worst: section 33.1, Rational Numbers (25 in the Working Draft); sections I.1.11 to I.1.13 and I.1.25 of Appendix I in the revised edition (42); section 41.1 (9 in each); the rules of the calculi in sections A.2.2, A.3.3 and A.4.3 (12 in each), where a premise read `=` for ≠.
- **Inside a sentence** a formula is HTML text, and the converter writes ≠, ∉ and their like as one Unicode character, so nothing of this kind is there. Where Unicode has no character for a negated sign, the converter writes the sign and U+0338, the combining slash, which the device's font draws: 25 places in each edition, most in chapter 34 (⊏, ⊐, ⊒, ≣ and others). They were not changed. One was wrong for another reason and is repaired: `S \not\excludes D` in the proof of overloading resolution showed the word "mathrel" with a slash, because the tree's macro `\excludes` is `\mathrel{\lozenge}`; it now shows ◊ with the slash.
- **The walk-through of microGPT** (`explorations/microgpt-walk/notation.py`) makes its SVGs by the same method. Its pages use no glyph of no width; its build now reports one as a problem.

## The edition's layer over the authors' text

This layer is the revised edition's only; the Working Draft has none of it. The source text is not changed for any of this; the converter adds it, and it is visible as the edition's.

- **The tint.** What the 2026 revival added stands on a light tint of the ground (`.rv` and `aside.revision` in `reader.css`, the colour `--rev-bg`, in light and in dark): the callout of a revised passage, the revival's paragraph in the preface, the revival's section of Appendix I, and the links below. The contents page and the preface open with one sentence that shows the tint and says what it means. The converter knows the revival's paragraph and section from two short lists at its top, `REVIVAL_PARAGRAPHS` and `REVIVAL_SECTIONS`: the source does not mark them.
- **Archived copies.** Beside each address of the authors' text (`http://projectfortress.sun.com` and the others, also in the references), the edition puts a link "archived copy" to `https://web.archive.org/web/2008/<address>`. The Internet Archive resolves a partial date to the nearest capture. 2008 is the year of the release that the preface names with the address; `ARCHIVE` at the top of the script sets it. The container cannot reach the Internet Archive, so no link was opened.
- Not built, because the curator has not decided it: marking which words of a revised passage changed (`curator-notes.md`, "The revival's callouts do not show which text changed").

## The reader

- **Place.** A chapter page stores, in `localStorage` under `fortress-spec.place.v1` (the Working Draft) or `fortress-spec-revival.place.v1` (the revised edition), the block at the top of the screen, for each chapter and for the last one read. The start page offers to continue there; a chapter opened from the contents offers the place where that chapter was left.
- **Notes.** The pencil at the end of a paragraph, in the bar of a code example, under a table or beside a heading opens a text box under that place. `notes.html` lists all notes, exports them as text, and imports such a text. They are kept under `fortress-spec.notes.v1`, or `fortress-spec-revival.notes.v1` in the revised edition.
- **Without storage** (private browsing) the pages work, a note lasts until the page is left, and a warning says so.
- **Select.** The button beside a heading selects that section's text up to its first subsection, for Speak.

### The ids that notes hang on

- The id of a paragraph is a hash of its words (`#p-934d16e7`). Every paragraph of the first sample keeps its id, among them the two that carry the curator's notes, `preface.html#p-0ea553b6` and `preface.html#p-033235cb`. To keep them, the hash still counts the words "[not converted yet]" after a reference into a chapter outside the first sample, as that sample showed them; the edition's own links are not counted.
- One paragraph of chapter 4 changed its id, because its words changed: the one with a quote pair inside a typewriter span (decision 6). 
- 2026-11-16: one paragraph changed its id, because its words changed (the repair of `\not\excludes`, above): `overloaded-functional.html#p-e3f30724` became `#p-c3996be5` in the Working Draft, and `spec-changes.html#p-f691a211` became `#p-69abb85a` in the revised edition. None of the curator's notes is on it. The repair of the glyphs of no width changed no id.
- The ids of tables (`t-`), grammar boxes (`g-`), and code blocks without a source form (`c-`) changed: 34 in the first sample's chapters (14 in chapter 2, 12 in chapter 4, 2 in chapter 5, 6 in chapter 6). They were hashes of the HTML that the converter's own rendering made, which is gone; they are now hashes of the display's LaTeX source. A code block with a source form keeps its id. `reader.js` keeps a note whose place is gone and lists it at the top of its chapter, with the words it was written on.

### The notes across the two editions

Notes written before 2026-11-15 were written on the revised edition at the addresses that now show the Working Draft, and they are in the browser under `fortress-spec.notes.v1`. `localStorage` belongs to the host, not to the folder, so both editions can read it.

- The Working Draft keeps that key. A paragraph that the revival did not change has the same words, so the same id, in both editions, and its note stays on it.
- A note on a block that only the revised edition has (its id is in `revised-only.js`) stays in the Working Draft's storage. Its chapter page lists it at the top with "The passage of this note is in the revised edition" and a link to the passage there; `notes.html` lists it with the same words, and the export gives it the link into `revival/` and a line `Edition: the passage of this note is in the revised edition`. An import reads such a note back.
- The revised edition has its own storage. Once, on the first page of it that a browser opens, it takes a copy of the notes of the old key whose passage only it has, so that such a note also shows on its passage; nothing else is copied, and nothing is removed from the old key (`fortress-spec-revival.adopted.v1` records that it was done).
- Of the curator's 15 notes of `notes-export-2026-11-15.txt`, 14 stay on their paragraphs of the Working Draft (`preface.html`: `p-0ea553b6`, `p-f85a28b6`, `p-0ee6a8b8`, `p-56c0c623`, `p-3e0c2dfb`; `intro.html`: `p-f9d62312`, `p-284c2aab`, `p-edfaffe1`, `p-a3cd883e`; `overview.html`: `p-136580aa`, `p-18267c77`, `p-ade874e1`, `p-e17a0706`, `p-ffe59943`), and one, on the revival's paragraph of the preface (`p-033235cb`), is listed as a note whose passage is in the revised edition and is copied there. `check.js` imports the file and checks this.

## Changes to reader.css and reader.js

Of 2026-11-15, for the two editions:

- `reader.js`: the storage keys take their prefix from `data-store` on `<body>` (a page without the attribute has `fortress-spec`, as before); `data-edition` on `<body>` is `draft` or `revised`; `window.FORTRESS_REVISED_ONLY`, if a page defines it before `reader.js`, marks the notes whose passage is in the revised edition (their link, a line on their card, a line `Edition:` in the export), and lets the revised edition take its copy once. A page that sets none of the three behaves as before.
- `reader.css`, added at its end: `.edline`, `.edline.top` (the edition's own lines), `ol.editions` and `section.apart` (the page of the editions). No rule was changed or removed.

Of 2026-11-13:

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
    S=explorations/coordinator/tools/spec-html U=http://localhost:8765/fortress/specification/
    node $S/check.js $U                                   # the Working Draft
    node $S/check.js ${U}revival/ /tmp/shots-revised      # the revised edition
    node $S/compare.js /tmp/spec-html-work-draft $U
    node $S/compare.js /tmp/spec-html-work ${U}revival/
    python3 $S/pdfcheck.py                                # the revised edition against Specification/fortress.pdf
    git show 414b790e3f:Specification/fortress.pdf > /tmp/spec-html-work-draft/draft-2026-08-21.pdf
    python3 $S/pdfcheck.py --pages docs/specification --pdf /tmp/spec-html-work-draft/draft-2026-08-21.pdf

The tree holds no PDF of the Working Draft. The nearest is in git: `414b790e3f` (2026-08-21) committed the first PDF that the revival built, before it revised the text; its LaTeX differs from the frozen copy in the preamble of `fortress.tex` (the build's repair) and one line of `basic-lib/objects.tex`, and its library listings are those of the library of that day. `pdfcheck.py` on the Working Draft runs against that file.

- **`check.js`** (about a minute) opens every page that the contents lists at 390 px, light and dark. It fails on a page that scrolls sideways, on a construct left unconverted, on a display whose font is missing or lacks a character, on a display that leaves a glyph of no width to the browser's text (it asks the browser for the extent of every character of every display, and a visible character of extent zero fails), and if the ink of the displays is not the colour of the text in both themes. It reads the edition from the page and checks: in the revised edition, `noindex` on every page, the line at the top with its link to the same page of the Working Draft, the two note-carrying ids of the preface, the archive link and the tint; in the Working Draft, no robots tag, no callout, tint, legend or archive link on any page, the link to the revised chapter at the foot and nowhere else, and the curator's 15 notes of 2026-11-15 across the two editions. In both it checks that the text of a display can be selected, the three rules for code inside a sentence, and the curly quote pair. Then, as before: notes on a paragraph, a code example and a heading, the place, export and import, the switch between the two forms of the code, Select, that no request leaves the site, and the pages without `localStorage`. It saves two screenshots.
- **`compare.js`** (about five minutes) sets each chapter's displays a second time, with `pdflatex` from the same file, makes a picture of each page with `pdftoppm`, takes a picture of the same display in Chromium, and compares the two: their sizes, and the share of the ink of each that lies within two pixels of the other's. This is the check that would have caught the chapter 4 tables of the first sample. It found two faults while this run was built: dvisvgm wrote the Courier font without the characters U+002E to U+005F when it wrote the whole font at once (the fonts are now written in pieces of 32 codes, and the build reads each piece back and fails if a character that a display uses is missing), and the frame of a table lost its top and left lines at the edge of the picture (each SVG now has a margin). It did not and cannot see the fault of 2026-11-16, the slash of ≠ that a phone did not paint, for two reasons. It looks through Chromium, which painted the slash, so its two pictures agreed. And its measure is the share of a whole display's ink: a trial that hid every glyph of no width in four chapters left all but one display over the limit of 92 %, and the largest connected piece of ink that went missing was 12 to 24 pixels, where displays without a fault differ by pieces of up to 33 pixels (hinting), so no limit on a piece separates the two. `check.js` has the check for this kind.
- **`pdfcheck.py`** (ten seconds) reduces every paragraph, heading, list item, caption and display of the pages to its letters and digits, does the same with the text of `Specification/fortress.pdf`, and looks for each block's runs of ten characters in the PDF. A block that lost a row, was set from the wrong source or was filled with something else fails. It found the lemma numbers of Appendix B, the lost footnotes of grammar boxes, and four commands that the text form had mishandled (`\rule`, `\vspace*`, `\not` before a macro, and the calculi's own `\exp`).

Results of 2026-11-16, on both editions, after the repair of the glyphs of no width:

- `check.js`: all pass on the Working Draft (46 checks) and on the revised edition (43). The new check fails on the pages as they were before the repair (50 characters of no extent on the Working Draft's pages).
- `compare.js` (about thirty-five minutes for each edition, both at once, beside other work on the machine): the Working Draft, 1,177 displays compared, 3 differ; the revised edition, 1,229 compared, 4 differ; the same displays as on 2026-11-15, none by a fault of the page.
- `pdfcheck.py`: the revised edition, 6,845 blocks, 7 not found; the Working Draft against the PDF of `414b790e3f`, 5,680 blocks, 17 not found. One fewer in each than on 2026-11-15: the paragraph of `\not\excludes`.

Results of 2026-11-15, on both editions:

- `check.js`: all pass on the Working Draft (45 checks) and on the revised edition (42).
- `pdfcheck.py`, the revised edition: 6,845 blocks, 8 not found, as on 2026-11-13. The Working Draft against the PDF of `414b790e3f`: 5,680 blocks, 18 not found: 7 displays of chapter 29, whose listing is the library of February 2011 where that PDF lists the library of August 2026, and 11 blocks at 58–75 % of their runs, dense with symbols or holding a draft note.
- `compare.js` (about fifteen minutes for each edition when both run at once): the Working Draft, 1,177 displays compared, 3 differ; the revised edition, 1,229 compared, 4 differ; none by a fault of the page. The three of chapter 16 are those of 2026-11-13, in both editions. The fourth, display 1 of chapter 26 in the revised edition, holds a reference: the second LaTeX run frames it as hyperref frames a link, which makes its picture seven pixels wider.

Results of 2026-11-13, on the 54 pages (then one edition, the revised one):

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
| The slash of a negated sign and the bar of ↦ are drawings, not text | 161 places of the Working Draft's displays, 177 of the revised edition's | "The glyphs of no width". A copy of ≠ from a display gives `=`; before, it gave a private-use character and `=`. |
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
