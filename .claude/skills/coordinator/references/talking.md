# Talking to the curator

The curator reads on a phone, often one earlier turn at a time, on a client that can show stale state.

## Register and format

- Plain short sentences and short paragraphs, plain English, no internal jargon. No framing flourishes, no closing line that sums up in a phrase, no metaphor where a literal phrase exists. Advice as instructions, not as observations.
- Replies very brief. When several questions were asked, label which part answers which. Do not restate what POSITIONS or FACTS already hold.
- A concept new to the curator is explained, not just named.
- Lists, never tables.
- Numbers as K or M, never spelled-out thousands or millions. A message about numbers carries few, each with its meaning. Token counts are writes only.
- A result reaches the curator only as a turn's final text.

## Time

- Read from the clock or the record, never guessed and never spoken from feel ("yesterday", "this morning" for events minutes or hours apart).
- Given in UTC and in the curator's local time (Central European): when a batch will probably land, when a check-in fires.

## What is not said

- While a batch runs, the curator hears nothing about it until it lands, unless something is wrong.
- The curator is not told about record edits.
- The curator deletes the batches' `wip/` branches after a gate, in GitHub's web page, as the curator's own chore, and is not reminded of it.
- The platform's git-check hook's reminders are answered silently, with a turn whose text is a single ".", declined while work is in flight, and never mentioned to the curator.
- A stop of a turn that killed a run is the exception: it is said plainly, and the run is resumed, keeping every agent that had finished (how: `agents.md`).

## Comments on a page

Much of the curator's review comes as comments on a published page. Read each comment's thread with the `ArtifactComments` tool. The notification gives the thread id. Answer on that thread.

What follows the answer depends on where the curator reads the page.

While the curator says that the page is read on a phone, the chat is not beside the page, and the curator works on several comments at once. Then:

- Leave the thread open: the curator resolves it. A resolved thread hides its bubble in the text, and its answer can then be found only through the menu.
- In chat, write one line at most, or nothing.

Otherwise, the curator reads on a desktop, with the chat and the page side by side. Then:

- Resolve the thread once the comment is addressed.
- In chat, say in a few lines what was done.

A comment on a skill marks a problem area, not a sentence to patch. Its paragraph or section is rewritten with the whole skill in mind, for a reader new to the repository, with every internal reference explained.

The skill writer makes every skill edit that a comment asks for. The skill writer is a headless Claude session, started and resumed by `explorations/coordinator/tools/skill-writer.sh`. Do not edit a skill yourself. Brief the writer with the comment, then:

1. The writer edits the skill and commits.
2. Push the commit.
3. Update the review page.
4. Answer on the thread.

If a practice is in question, an archaeology worker first checks what the batch workers actually did.

A session watches at most ten pages. Unwatch an old page before you watch a new one.

## Restate and hold

When the curator reads earlier turns and replies to them one at a time, whether or not the curator says "hold":

- Each new point goes on the held list as one line in the coordinator's own words, with the UTC time of the curator's message; the transcript holds the exact words. The list runs on, in the order the points were raised.
- The reply acknowledges each new point in a line and says "holding": three lines at most, never the whole list again, no argument.
- Nothing is argued until the curator says the reading is done. A point the curator marks "now" is answered now and not held, and a full answer does not end with "holding".
- Everything the curator says while reading goes on the list: a remark left off it is lost.
- Work that lands meanwhile is reported briefly, and holding resumes.
- When the curator is done, the list is worked one point at a time, in the order raised. Being on the list answers nothing: every point gets its answer.
- A held point is referred to by a short phrase that says what it is, never by its number alone.
