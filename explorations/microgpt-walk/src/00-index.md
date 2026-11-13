# microGPT in Fortress, line by line
> A walk through `MicroGptFlat.fss`, the flat microGPT program of the Fortress revival: what each line computes, what each array holds, and what one training step does to the numbers.

The program is a small GPT, after Andrej Karpathy's microGPT. It learns to continue first names, one character at a time. It has 98 lines and 4,192 parameters, and it runs under walk, the interpreter.

This text explains the model and the code together. It takes the lines in the order that a reader needs, which is not always the file's order. Every line of the file is quoted somewhere, with its line number. [The program on one page](part:listing) shows the file whole, and each line number there leads to the place that explains the line.

How the pages work:

- A grey number at the left of a code line is the line's number in `MicroGptFlat.fss`. It links to the file on GitHub. A long line wraps on a phone; a new line of the file always starts with its number. A block from another file names that file above its lines.
- Where a formula helps, it stands after the code that computes it, and a list ties each symbol to a name in the code.
- A box headed "Output" shows what a run printed. Every number in this text comes from a run under walk on 13 November 2026, or from a calculation on such numbers that the text shows.
- A box headed "A limit of today's tree" marks a line whose shape comes from a gap in today's implementation and not from the language's design. [Part 9](part:fortress) collects these boxes.
- The page remembers where you stopped, in this browser. The pencil at the end of a paragraph, a code block, a formula or a heading attaches a note to it. [Notes](notes.html) lists the notes and exports them as text. They are kept apart from your notes on the specification.
- The Select button beside a heading selects that section's text, for Speak. Its selection leaves out the formulas and the long boxes of numbers. The text around them says what they hold.

All the examples use one document of the corpus, the name `yuheng`, so that the same numbers return from part to part.
