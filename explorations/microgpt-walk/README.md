<!-- The microGPT walk-through: the text, the drawings and the build of the pages under `docs/microgpt/`, which walk through the flat microGPT program `explorations/run-c4/src/MicroGptFlat.fss` line by line for the curator, in the look and behaviour of the specification reader; GitHub Pages serves them at https://palimondo.github.io/fortress/microgpt/. Started 2026-11-13. -->

# The microGPT walk-through

The pages under `docs/microgpt/` explain the flat microGPT program, `explorations/run-c4/src/MicroGptFlat.fss`, with the components that it imports and its quick check: the model and the code together, for one reader, the curator. GitHub Pages serves them at https://palimondo.github.io/fortress/microgpt/ once `main` is pushed.

## The files

- `src/NN-name.md`: the text, one file for each part. `00-index.md` is the start page's opening.
- `figs/*.svg`: the drawings, written by hand. They take their colours from the reader's stylesheet.
- `assets/walk.css`, `assets/walk.js`: what the pages add to the specification reader. The build copies them to `docs/microgpt/`.
- `build.py`: the build. It needs Python 3 with fontTools, `latex` and `dvisvgm` for the formulas and the typeset code, and `emacs`, which runs Fortify (`Fortify/fortify.el`).
- `notation.py`: the three notations of the code (below), the table of corrections to Fortify's output, and the shared fonts. `fragments.el`: the two Emacs functions that call Fortify for a file and for a list of fragments.
- `check.js`: the check in Chromium, through Playwright, at a phone's width.

`docs/microgpt/reader.css` and `reader.js` are copies of the specification reader's files in `docs/specification/`, byte for byte. The build copies them only when they are missing, or when it is run with `--reader`, so a change of the reader reaches these pages only when someone asks for it.

## Building and checking

From the repository root:

    python3 explorations/microgpt-walk/build.py --strict
    mkdir -p /tmp/walk-srv && ln -sfn "$PWD/docs" /tmp/walk-srv/fortress
    python3 -m http.server 8766 --directory /tmp/walk-srv &
    node explorations/microgpt-walk/check.js

- The build rewrites every page of `docs/microgpt/`, `tex-fonts.css` and the folder `fonts/`. It keeps the SVG files of the formulas and of the typeset code, and Fortify's LaTeX, in `tmp/microgpt-walk/`, which git ignores, and sets a formula or a line again only when its LaTeX changes. `--work DIR` names another folder for these, and `--out DIR` another folder for the pages.
- With `--strict` the build also stops on a LaTeX error in a typeset line, on a correction of the table below that applies to no line, on a character that the shared fonts lack, and on a code word that has no typeset form.
- The build reads the quoted lines from the program's files each time. It stops if a quoted fragment is not in the line that the text names. With `--strict` it also stops if some line of `MicroGptFlat.fss` is not quoted in full by the parts together; without it, it lists those lines.
- `check.js` opens every page at 390 px, light and dark, in each of the three notations. It fails on a page that scrolls sideways, on a typeset line that is wider than its box, on a block whose line numbers or links differ between the notations, on an SVG that holds a font, on a script error and on a request that leaves the site. It checks that a first visit shows Typeset and that the choice holds from part to part and over a reload. It then writes a note, reloads, and checks the note, the place, the export and that the notes are kept apart from the specification reader's. It saves a screenshot of each page; read some of them, since the script does not judge how the text looks.

## The markup of the text

A part is Markdown with a few additions. The build has its own small converter and knows only these forms:

- `# Title` once, then `> ` one line under the title. `## Section` and `### Subsection`.
- Paragraphs, `- ` lists and `1. ` lists. Inside a line: `` `code` ``, `**strong**`, `*emphasis*`, `[text](address)`, and `$...$` for a formula inside a sentence, which becomes HTML text.
- `` `code` `` is Fortress code and is shown in the three notations. A doubled backtick, ``` ``word`` ```, marks a code word that is not Fortress and stays as typed in every notation: a name or a character of the corpus, a file's name in the folder of starting values, a command, a label or a value that a run printed, a name of Karpathy's Python program, and the places where the text speaks of the ASCII spelling itself. A word that looks like a file name or a path stays as typed without a mark.
- A link's address may be `part:slug#anchor` for another part, or `src:path` for a file of the repository on GitHub.
- `@src 57` quotes line 57 of `MicroGptFlat.fss`; `@src 51-55` quotes a range; `@src 57: x = gather(wte, ids)` quotes a fragment of the line, which must occur in it. `@src FlatArrays.fss 14-17` quotes another file of the program's folder. Consecutive `@src` lines make one block.
- A fenced block marked `out` is what a run printed. Marked `fortress` it is Fortress code that is not in the program's files, shown in the three notations, each line fortified alone. Marked `text` it is other text, such as a shell command, in one form.
- `$$` on a line of its own opens and closes a displayed formula in LaTeX. `\c{name}` sets a name of the code in typewriter type.
- `@fig name | caption` places `figs/name.svg`.
- `!!! limit` to `!!!` is a box for a line that a limit of today's tree shapes. `!!! words Title | lead` to `!!!` is a folded box, used on the start page.

## The three notations of the code

A control under the bar of every page chooses how the program's code is shown: Typeset, Unicode or ASCII. The quoted lines, the `fortress` blocks, the listing page and the code words inside the sentences change together. All three forms are in the markup, and `walk.css` shows one by the attribute `data-notation` on `<html>`, which `walk.js` sets and keeps in the browser under `fortress-microgpt.notation`. A first visit shows Typeset. Without script the pages show ASCII.

- **Typeset** is Fortify's rendering, the form of the specification and of the team's papers. Fortify sets each of the program's files whole, one output line for each source line, and each fragment alone. A quoted line becomes one SVG, set by `latex` and converted by `dvisvgm`, drawn in `currentColor` with its text as text, so one file serves light and dark. A code word in a sentence becomes HTML text in the reader's classes for a formula in a sentence (`notation.tex_html`), with the inline highlight of a code word.
- **Unicode** is the source after the specification's ASCII conversion (Appendix "ASCII to Unicode" and `operators.tex`), outside strings and comments: the brackets `[\ \]`, the arrows and comparisons, the operators' short names and the Greek letters' short names. The table in `notation.py` is written by hand for the tokens of this program. `ZZ32` and `RR64` stay as typed: the double-struck letter is a rule of rendering (Appendix "Rendering of Fortress Identifiers", rule (a)), not a character of the source. `SUM` stays as typed too: today's parser does not take the sign ∑ as a big operator (the gap ledger's row 5).
- **ASCII** is the source as it is in the files.

A typeset line that is wider than a phone's screen (176 pt) is set as a paragraph whose later lines hang by 1.6 em. TeX breaks it after a relation, an operator or a comma, and at a higher price after a declaration's colon, a slash, a semicolon, `do`, `then` and `else`, before a juxtaposed operand, before a method call's dot, and before or inside a string, after a space or a slash. For that, a string and a comment after code are cut into one box for each word, and `\left(` and `\right)` become parentheses of a fixed size. The breaks are made for a phone and are the same on a wide screen. No line scrolls sideways inside its box at 390 px, and `check.js` fails if one does.

No SVG holds a font. Each text of an SVG names a class for its TeX font and size, and `tex-fonts.css` gives the classes and the fonts, whose files are in `docs/microgpt/fonts/`. The method is the specification reader's (`build_fonts` in `explorations/coordinator/tools/spec-html/spec2html.py`): each font is written in pieces of 32 characters, and a browser fetches the pieces that a page shows. The displayed formulas use the same fonts.

### Comments

Fortify sets a comment over several lines as one ruled paragraph that it fills again, so its lines are not the file's lines. The pages set each line's own words as text between `(*` and `*)`, and a comment on a line of its own in the same way. In a comment, TeX draws `--` and `---` as dashes, so a run of hyphens would become one rule; the build keeps the hyphens apart.

### Where Fortify's output is corrected

`Fortify/` is the team's tool and is not edited here. Where its output for this program is wrong, the table `OVERRIDES` in `notation.py` replaces a piece of its LaTeX, in every line and code word whose source holds the source text. The build reports a row that applies nowhere.

| Source | Fortify writes | The pages set | Reason |
|---|---|---|---|
| `g0[i]` | `g_0_{i}` | `g_0[i]` | LaTeX refuses a second subscript ("Double subscript") and prints 0 and i side by side; the index keeps its brackets, as Fortify sets an index of two (the gap ledger's row 62). |
| `BIG MAX` | `\BIGOPR{MAX}` | `\mathop{\mathtt{BIG\ MAX}}` | Fortify sets the big operator as one large MAX: the word BIG, which the program types and the text names, is not on the page. |
| `(m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]` | `^{T\llbracket\KWD{nat} r, \KWD{nat} c\rrbracket}` | `^{T}\llbracket\KWD{nat} r, \KWD{nat} c\rrbracket` | Fortify sets the declaration's static parameters inside the exponent, beside T; they are not part of the operator. |
| `^T[\nat a, nat b, nat c\]` | `^{T\llbracket\KWD{nat} a, \KWD{nat} b, \KWD{nat} c\rrbracket}` | `^{T}\llbracket\KWD{nat} a, \KWD{nat} b, \KWD{nat} c\rrbracket` | The same, in the declaration for a rank-3 array. |
| `⍤` | `\FortressUnknownCharacter{U+2364}` | `\(\ddot{\circ}\)` | Fortify prints a box with the code point for APL's rank sign, in a comment; the sign is drawn as a small circle under two dots. |
| `⌷` | `\FortressUnknownCharacter{U+2337}` | `{\fboxsep=0pt\fbox{\phantom{l}}}` | The same for APL's index sign, in a comment; the sign is drawn as an upright box. |
| `(* ^T on a matrix` | `{\char'136}T` | `{\tt\char'136}T` | In a comment, Fortify sets the sign ^ in the roman font, where that place holds the circumflex accent; the typewriter font has the sign. |
| `name: Type := value` | `\KWD{value}` | `\VAR{value}` | In this pattern of the text, value is a placeholder; Fortify sets it as the keyword value. |

Three forms of Fortify are kept as they are, though a reader of the typeset form does not see what to type: a name that ends in a digit gets a subscript (`x1`), an index of one gets a subscript (`ks[i]`), and `SQRT` and `^` lose their parentheses.

## Where the numbers come from

Every value in the text was printed by a run under walk: the program itself, its quick check, or a probe. The probes are copies of `MicroGptFlat.fss` with print lines added, and a file of small array examples. They are scratch and are not committed; the commands and the probes' text are in the transcript of the session that wrote the walk-through.

## If the reader changes

The pages are written against the reader as it was on 2026-11-13 (`reader.css` and `reader.js` as in the tree of commit `098742f77d`). To take a newer reader, run the build with `--reader`, then `check.js`, and read the screenshots. The pages rely on these parts of the reader:

- `body` with `data-page` (`chapter`, `index`, `notes`), `data-slug` and `data-chapter`, where a part's `data-chapter` starts with its number and a full stop;
- `nav.bar` with a link of class `notes-link`; the empty boxes `#resume` and `#chapter-notes` on a part, `#continue` on the start page;
- `section.sec` with `data-num` and `data-title` and a heading as its first child, for the Select button and for a note's section;
- every block that takes a note has the class `nb` and an `id`: a `p`, a heading, a `div.fx` that holds a `pre.fx-s`, a `pre.vb`, a `div.dm`, a `figure`;
- on the notes page, the ids `export-text`, `copy-notes`, `save-notes`, `export-status`, `import-file`, `import-text`, `import-paste`, `import-status`, `notes-list` and `storage-warning`;
- the storage keys start with `fortress-spec.`, and the export holds the address `https://palimondo.github.io/fortress/specification/` and the title "Notes on the Fortress Language Specification", which `walk.js` replaces.

## What the pages need from the reader, and add to it

- The reader keeps notes and the place in the browser's storage under keys that start with `fortress-spec.`. Storage is shared by every page of the site. `walk.js` gives these pages their own keys, `fortress-microgpt.`, so their notes do not mix with the notes on the specification.
- The reader writes the specification's address and title into exported notes. On the notes page, `walk.js` puts the walk-through's address and title there, and names the saved file `microgpt-walk-notes-DATE.txt`.
- The Select button is for Speak, which reads a formula glyph by glyph and a box of numbers digit by digit. While the button's selection stands, `walk.js` and `walk.css` leave the formulas and the output boxes of more than 200 characters out of it. A selection made by hand can still take them.
- The reader takes the first words of a note's passage from the block's `textContent`, which would hold each code word in its three forms. For a block with code words, `walk.js` gives `textContent` the text with each code word once, as typed.
- `walk.css` adds the three notations and their control, the line numbers of quoted lines, wrapping of long code lines, the Output box, the box for a limit of today's tree, the formulas' and the drawings' colours, and the listing page.
