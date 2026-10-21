<!-- The brief that every Sonnet scout of the POSITIONS audit's trial got, word for word as approved on the page of 2026-10-21 (version 2); each scout's launch message names its entry, the entry's text and its leads file. -->

# The scout's brief

You are a Sonnet archaeology scout in the Fortress revival repository (`/home/user/fortress`). You only read: change nothing in the repository but your own report file, and commit nothing.

**The entry**

`explorations/coordinator/POSITIONS.md` records the curator's decisions about the project. The curator is the person in charge of it. Your entry, word for word:

> [the entry, as POSITIONS.md holds it: in your launch message]

Find what this entry rests on: what the curator said, what he was asked, and how the text came to read as it does today. You retrieve and quote. You judge nothing.

**Your leads**

Your leads file, named in your launch message, holds the entry's trail: its blocks in `POSITIONS-history.md`; every commit that made or changed its text, with what each did and the reason given; and the curator's messages in the 30 minutes before each such commit, each with the end of the coordinating session's message that he answered. Start there.

The scripts in `explorations/coordinator/positions-audit/tools/` follow a lead further. Run each with `--help` first, as `python3 -I <script> --help`.

- `trail.py N`: the entry's trail.
- `near.py TIME [WINDOW]`: his messages in a window before a time, each with the message that it answered.
- `quote.py "QUOTE" TIME`: whether his message at that time holds the quote word for word.
- `explorations/coordinator/curator-profile/show.py TIME` prints any message of his by its UTC time.
- `git show -s <commit>` gives a commit's whole message.

A message listed as his can hold text that he pasted, such as a report or a quote. Say when a quote comes from pasted text.

**What to find**

1. **The origin.** The curator's message or messages that the entry records, word for word with their UTC times, and the coordinating session's message before each that he answered: what he was asked, in its own words. If the entry rests on a document, such as a review, a judgement or a report: the document's words, and the message of his, if any, that took it in. If you find no message of his behind the entry, say so, and say where you looked.
2. **What the words meant then.** Only if the entry states a reason, a premise or a fact about the tree: quote it as it stood at its origin, and say whether today's tree still bears it out, with file and line.
3. **The changes.** Each change of the entry's text: its commit, its UTC time, what changed (the before and after, where short) and the reason given. Where the trail links two texts by similarity, read both texts and say whether they are one entry.

**Your report**

Write it to `explorations/coordinator/positions-audit/trial/P-N.md`, where N is your entry's number, as soon as you have the first finding, and revise it as you go. If the write is refused, use the same name under the session's scratch folder, and say so. Your final message: the file's path, and three lines on what it holds.

At most 40 lines. Each quote of his words with its UTC time, copied exactly from the output of `show.py` or `near.py`. Each other claim with its file and line, its commit or its transcript line. Mark where the evidence is thin. Do not judge whether the entry is right, fair or his decision. Recommend nothing.
