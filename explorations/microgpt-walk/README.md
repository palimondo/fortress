<!-- The microGPT walk-through: the text, the drawings and the build of the pages under `docs/microgpt/`, which walk through the flat microGPT program `explorations/run-c4/src/MicroGptFlat.fss` line by line for the curator, in the look and behaviour of the specification reader; GitHub Pages serves them at https://palimondo.github.io/fortress/microgpt/. Started 2026-11-13. -->

# The microGPT walk-through

The pages under `docs/microgpt/` explain the flat microGPT program, `explorations/run-c4/src/MicroGptFlat.fss`, with the components that it imports and its quick check: the model and the code together, for one reader, the curator. GitHub Pages serves them at https://palimondo.github.io/fortress/microgpt/ once `main` is pushed.

## The files

- `src/NN-name.md`: the text, one file for each part. `00-index.md` is the start page's opening.
- `figs/*.svg`: the drawings, written by hand. They take their colours from the reader's stylesheet.
- `assets/walk.css`, `assets/walk.js`: what the pages add to the specification reader. The build copies them to `docs/microgpt/`.
- `build.py`: the build. Python 3 with the standard library; `latex` and `dvisvgm` for the displayed formulas.
- `check.js`: the check in Chromium, through Playwright, at a phone's width.

`docs/microgpt/reader.css` and `reader.js` are copies of the specification reader's files in `docs/specification/`, byte for byte. The build copies them only when they are missing, or when it is run with `--reader`, so a change of the reader reaches these pages only when someone asks for it.

## Building and checking

From the repository root:

    python3 explorations/microgpt-walk/build.py --strict
    mkdir -p /tmp/walk-srv && ln -sfn "$PWD/docs" /tmp/walk-srv/fortress
    python3 -m http.server 8766 --directory /tmp/walk-srv &
    node explorations/microgpt-walk/check.js

- The build rewrites every page of `docs/microgpt/`. It keeps the formulas' SVG files in `tmp/microgpt-walk/formulas/`, which git ignores, and sets a formula again only when its LaTeX changes.
- The build reads the quoted lines from the program's files each time. It stops if a quoted fragment is not in the line that the text names. With `--strict` it also stops if some line of `MicroGptFlat.fss` is not quoted in full by the parts together; without it, it lists those lines.
- `check.js` opens every page at 390 px, light and dark, and fails on a page that scrolls sideways, on a script error and on a request that leaves the site. It then writes a note, reloads, and checks the note, the place, the export and that the notes are kept apart from the specification reader's. It saves a screenshot of each page; read some of them, since the script does not judge how the text looks.

## The markup of the text

A part is Markdown with a few additions. The build has its own small converter and knows only these forms:

- `# Title` once, then `> ` one line under the title. `## Section` and `### Subsection`.
- Paragraphs, `- ` lists and `1. ` lists. Inside a line: `` `code` ``, `**strong**`, `*emphasis*`, `[text](address)`, and `$...$` for a formula inside a sentence, which becomes HTML text.
- A link's address may be `part:slug#anchor` for another part, or `src:path` for a file of the repository on GitHub.
- `@src 57` quotes line 57 of `MicroGptFlat.fss`; `@src 51-55` quotes a range; `@src 57: x = gather(wte, ids)` quotes a fragment of the line, which must occur in it. `@src FlatArrays.fss 14-17` quotes another file of the program's folder. Consecutive `@src` lines make one block.
- A fenced block marked `out` is what a run printed; marked `fortress` or `text` it is code that is not in the program's files.
- `$$` on a line of its own opens and closes a displayed formula in LaTeX. `\c{name}` sets a name of the code in typewriter type.
- `@fig name | caption` places `figs/name.svg`.
- `!!! limit` to `!!!` is a box for a line that a limit of today's tree shapes.

## Where the numbers come from

Every value in the text was printed by a run under walk: the program itself, its quick check, or a probe. The probes are copies of `MicroGptFlat.fss` with print lines added, and a file of small array examples. They are scratch and are not committed; the commands and the probes' text are in the transcript of the session that wrote the walk-through.

## What the pages need from the reader, and add to it

- The reader keeps notes and the place in the browser's storage under keys that start with `fortress-spec.`. Storage is shared by every page of the site. `walk.js` gives these pages their own keys, `fortress-microgpt.`, so their notes do not mix with the notes on the specification.
- The reader writes the specification's address and title into exported notes. On the notes page, `walk.js` puts the walk-through's address and title there, and names the saved file `microgpt-walk-notes-DATE.txt`.
- The Select button is for Speak, which reads a formula glyph by glyph and a box of numbers digit by digit. While the button's selection stands, `walk.js` and `walk.css` leave the formulas and the output boxes of more than 200 characters out of it. A selection made by hand can still take them.
- `walk.css` adds the line numbers of quoted lines, wrapping of long code lines, the Output box, the box for a limit of today's tree, the formulas' and the drawings' colours, and the listing page.
