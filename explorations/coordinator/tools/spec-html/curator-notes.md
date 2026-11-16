<!-- The curator's notes on the specification reader, as he exports them from the reader and pastes them into the chat, kept word for word with the coordinator's reading of each, for the worker of the reader's next run. Started 2026-11-10. -->

# The curator's notes on the specification reader

## Decisions of his that the next run builds (2026-11-10)

- The typeset view of code and formulas is LaTeX converted to SVG, at full fidelity; the Python converter's own rendering of them goes. One SVG source serves light and dark, by a colour keyword that follows the device's setting; text in it stays selectable. The earlier process is in `explorations/fortify/` (sheets set by LaTeX and converted to SVG). Open, asked of him: whether code words inside a sentence become SVG too, or stay HTML text.
- His idea of the editions as an exhibit: the 1.0 of 2008, the working draft as the project left it, and the revival's text, with jumps between them and notes on what changed (`explorations/coordinator/HELD.md`, "Held in chat (2026-11-10)", 16:4x).

## Notes exported 2026-11-10T17:02:01Z (2 notes)

### Note 1, on the preface, the paragraph "http://projectfortress.sun.com" (`preface.html#p-0ea553b6`)

His words: "This should probably link to Wayback machine's snapshot of the page from when it existed. This is some port processing layer, which enhances the original specification text?"

The coordinator's reading: a dead link of the team's text links to the Internet Archive's snapshot from the document's own time. The source text is not changed: the converter adds the link as a layer of the edition, and marks it as the edition's addition. A Wayback address with a partial timestamp, such as `https://web.archive.org/web/2011/http://projectfortress.sun.com/`, resolves to the capture nearest that date, so no lookup is needed (the container cannot reach the Internet Archive). He asks whether this is a post-processing layer over the original text: yes, and it is to be visible as one.

### Note 2, on the preface, the paragraph "In 2026 the Fortress revival revised this working draft where a decision taken for …" (`preface.html#p-033235cb`)

His words: "You said that our additions to the specification are marked in red delete this opening. Paragraph addendum is also one such case so it should get the same treatment like distinct presentation but very very very how do you say very subtle shit some some light colored background or slight tint of course it must work in both dark and light mode and this open section should introduce this graphical element. You know like an opening of books. They're in the preamble of a book. They show how these notations are used the document so that kind of language very brief."

The coordinator's reading: the revival's paragraph in the preface is an addition of the revival like the revision callouts, so it gets the same distinct presentation; that presentation is to be very subtle, a light tint of the background, in light and in dark; and the opening of the edition introduces the graphical element in a few words, as a book's front matter explains its notation.

## His message of 2026-11-10, about 17:3x UTC, with two screenshots (the PDF's page 45 beside `lexical-structure.html` in the dark theme)

### The tables must match the PDF, and renderings are checked in a browser

His words: "When you're rendering those complex parts, you need to verify that rendering in a browser, you would have spotted that this doesn't look right, I think. And I'm now talking about the character table. I see no ampersand here. Apostrophe is indented more than the rest of the table. Like, these two screenshots don't quite match."

What the screenshots show, in chapter 4's lists "special non-operator characters" and "special operator characters":
- the `&` of U+0026 AMPERSAND is missing, and its row's second half (U+0027 APOSTROPHE) is shifted right against the rows below;
- U+27E6 and U+27E7, the white square brackets, show as `[[` and `]]`, where the PDF sets the glyphs ⟦ and ⟧;
- the `^` of U+005E shows in a code box, unlike the other characters of its column.

For the next run's worker: every table and every display is compared with the same page of the PDF (`Specification/fortress.pdf`), side by side, in a browser at a phone's and at a desktop's width, before the chapter counts as converted; a difference is fixed or listed in the README. The first run looked at parts of each chapter only.

### Inline code stays as it is

His words: "About Fortress rendering to SVG, only where it shows the render text inline in the paragraph, we should do what we've been doing." So code words and formulas inside a sentence stay HTML text, as now; examples and displays become SVG from LaTeX. This answers the question that was open above.

### The revival's callouts do not show which text changed

He first wrote that the callout's look "is fine as it is", then, reading the one in chapter 4 (see Section I.1.56): "it is like a note. I don't know which part of this is a change"; "it is basically commenting in line about the change we did, but it is not marking the text itself. It's really like our own draft notes, just not signed Victor, but by the revival. Okay. Hmm." No decision of his yet. The coordinator's proposal, put to him at 17:4x: the reader marks the changed words themselves, with a light tint, and offers the Working Draft's text of the same passage one tap away, taken from `Specification-1.0-frozen/` by comparison; the specification's own form (P-96) does not change.

### His question on section 4.17.2, a radix written as a word

"10101101_TWO is rendered as 10101101 two ... Does this spelled out radix as a word too? We don't support that, right? Does parser accept it? It didn't come up in our numeral discussion." Answered at 17:4x from the tree: the parser reads a radix as digits or as a word (`parser/Literal.rats:102-109`, `RadixNames`; `nodes_util/NodeUtil.java:1251-1280`, `radix2Number`), the team's `tests/NumeralTest.fss:18-25` asserts `f_SIXTEEN + 2` is 17 and `DEAD.BEEF_16 = DEAD.BEEF_SIXTEEN`, and the static numerals carry the radix as a number, so the spelling is gone after the parser.

### His question on the quotation marks (18:3x UTC on 2026-11-10)

He saw a backtick and a straight apostrophe in the reader where the PDF has curly single quotes, and asked whether the source holds them or the converter makes them. Found: the LaTeX source writes every single quote as a backtick and an apostrophe, and LaTeX draws the pair as curly quotes. The converter makes the same change in running text. It leaves the pair as typed where the team wrote it inside a typewriter span, as in `\txt{`FBAB'}` at `Specification/basic/lexical-structure.tex:866`, while LaTeX's typewriter font draws it curly there too. Three places in the published pages, all in the chapter on lexical structure. For the reader's next run: a quote pair that wraps the whole content of a typewriter span becomes curly quotes; an apostrophe inside code stays as typed.

### His rule on typography near the source (18:3x UTC on 2026-11-10)

With two screenshots of rule 2 on enclosers (the reader and the PDF), he said the reader was hard to read there and the PDF easier, and: "we should keep it as close as possible to the original source, right? We can modernize" but "we should be careful what font are we using for the source code"; the house style's code font has ligatures, which he likes for the house style, "but here we need to be careful when it renders differently in a way that it hides the ASCII part. And converts stuff to Unicode rendering when the point is to show the ASCII."

Done in `reader.css` at once, checked in a browser on that passage: code inside a sentence first lost its box and padding (the box came back, see below), so the quotation marks sit close; ligatures are off wherever code is shown; the curly quotation marks alone come from a serif face (a font face limited to U+2018 to U+201F, from fonts already on the device), since a sans face draws them like straight ticks. The three changes are the coordinator's choices under his rule. On seeing the browser picture he said of the first: "you lost The color highlight. I want that back in." So inline code keeps its highlight, with side padding cut to a tenth of an em.

## His note of 2026-11-16, read on his phone: `=/=` becomes `=` in Appendix E

In section E.2.3, "Converting ASCII Symbol Sequences" (`ascii-unicode.html`), the table's row "`=/=` becomes ≠" showed a plain `=` in the reader, where the PDF shows ≠. Every other cell of the table was right, `|->` becomes ↦ among them. His question: "Are we encoding these conversions in some publishing script with bugs?"

The answer: no. The table is not made by a script of conversions. LaTeX sets it from the team's source (`\txt{=/=} & \emph{becomes} & $\neq$`), as it sets the PDF, and the reader shows LaTeX's own output as SVG.

What was found (the worker's run of 2026-11-16; the README, "The glyphs of no width"):

- TeX has no glyph for ≠: it sets the slash of `\not`, a glyph of no width, and `=` over it. The slash reached the page, as a character of advance zero alone in its piece of SVG text, in the font piece that holds it. Chromium, which the checks use, painted it; the phone's browser did not paint a piece of text of no width. The phone's picture could not be reproduced in the container, which has no browser but Chromium, so the browser's rule is inferred, not shown.
- The same slash stood alone at 68 places of the Working Draft's displays and 84 of the revised edition's, each showing its sign without the slash: 25 in section 33.1 (Rational Numbers), 42 in the revival's sections of Appendix I, 9 in section 41.1, 12 in the rules of the calculi of Appendix A. `widthless-glyphs-2026-11-16.md` lists every place by page and section.
- The repair: the converter draws every glyph of no width (the slash, and the bar of ↦) as a path from the glyph's outline, so no display depends on how a browser paints text of no width. `check.js` now fails on a display that leaves such a glyph to the text. `compare.js` could not have seen it: it looks through Chromium, and it measures the share of a whole display's ink.
- For him to look at on the phone: the same row of section E.2.3; section 33.1 of the Working Draft; sections I.1.11 to I.1.13 of Appendix I in the revised edition.
- Found beside it and repaired: `S \not\excludes D` in the proof of overloading resolution (Appendix B of the Working Draft, Appendix I of the revised edition) showed the word "mathrel" with a slash inside a sentence; it shows ◊ with the slash now. That paragraph's note id moved (the README, "The ids that notes hang on"); no note of his is on it.
- The table of the walk-through's Unicode view (`explorations/microgpt-walk/notation.py`), which is written by hand, was checked against the appendix and the operator tables by a script: one entry of 67 was wrong, `CROSS`, which gave × (U+00D7) where the operator tables give ⨯ (U+2A2F). The program does not use it.
