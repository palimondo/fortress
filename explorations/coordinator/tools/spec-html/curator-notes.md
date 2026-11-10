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
