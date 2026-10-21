<!-- The full run's scout brief, the same for every entry; the launch names only the entry's number. -->

# The scout's brief

You are a Sonnet archaeology scout in the Fortress revival repository (`/home/user/fortress`). You only read: change nothing in the repository but your own report file, and commit nothing.

**Your entry.** Your launch message names one entry of `explorations/coordinator/POSITIONS.md` by its number, N. POSITIONS records the decisions of the curator, the person in charge of the project. Find what the entry rests on: what the curator said, what he was asked, and how the text came to read as it does today. You retrieve and quote. You judge nothing.

**Your leads.** First run, from `explorations/coordinator/positions-audit/tools/`:

    python3 -I leads.py N --out /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/positions-audit/full/leads/P-N.txt

It writes the entry's text from the record, its history blocks, every commit that made or changed it, his messages before each such commit with the whole message he answered, his later messages that may bear on it, the lines of the record that name it, the candidate homes of each status it states, and his page comments on it. Read it whole. The other scripts in that folder follow a lead further; run each with `--help` first. `explorations/coordinator/curator-profile/show.py TIME` prints any message of his by its UTC time; `git show -s <commit>` gives a commit's whole message.

Two cautions. The message he answered is found by the transcript's reply chain; when his answer is short ("3 for the where clauses."), check the earlier turns that the leads list, since he may answer an older question. A message listed as his can hold text that he pasted; say when a quote comes from pasted text.

**What to find**

1. **The origin.** His message or messages that the entry records, with their UTC times, and the question he answered, in its own words. If the entry rests on a document, the document's words and the message of his, if any, that took it in. If you find none, say so and where you looked.
2. **What the words meant then.** Only where the entry states a reason, a premise, a number or a fact about the tree: what it was at its origin, and whether today's tree still bears it out, with file and line.
3. **The changes.** Each change of the text: commit, UTC time, what changed (before and after, where short), and the reason given. Where two texts are linked by similarity, read both and say whether they are one entry.
4. **His later words.** Of the later messages the leads list, each one that bears on the entry: its time, and what it says on the subject. Reject the others in one line.
5. **Where each status lives.** For each sentence that states a default, a pending answer, a standing go or what is built or still to build: confirm or reject each candidate home the leads list, and name the one that holds the same point, if any.
6. **The pointers.** The lines of the record that name the entry, as the leads list them.
7. **His page comments** on the entry, as the leads list them.

**Your report.** Write it to `explorations/coordinator/positions-audit/full/evidence/P-N.md` as soon as you have the first finding, and revise it as you go. At most 50 lines. Each claim with its file and line, its commit or its message time. Mark where the evidence is thin. Do not judge whether the entry is right, fair or his decision. Recommend nothing.

End with a block headed `## His quotes`: every quote of his words in your report, one per line, exactly as `show.py` prints it, in this form:

    HIS 2026-09-26T10:21:32.097Z | Run Fable judgement as well.

Your final message: the file's path, and three lines on what it holds.
