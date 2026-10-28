<!-- Evidence on the page "Fortress Revival So Far" (artifact 8Gg1f2ZRXg462qmhcwx1T5) and the letter to Prof. Ryu, from session fe616d40, git and the record; quotes and pointers only; a Sonnet scout, 2026-10-28. -->

# The revival page and the letter to Professor Ryu: evidence

Times UTC. Quotes are exact; `[…]` is my cut to fit 16K, so a quote with no `[…]` is whole. Cut messages and comments are whole in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/revival-page-quotes-full.txt` (uncommitted). C the curator, K the coordinator, W a worker.

- **C's message by time:** `python3 -I explorations/coordinator/curator-profile/show.py 2026-10-08T09:25:07`
- **K's text or calls by time:** the command of `timeline-10-26-to-10-28.md` (the live file holds 10-08 12:53 on); for 10-08 before 12:53 its file is `$B.until-2026-10-08T15-41.jsonl.parts/003.jsonl`, `B=/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d`.

## 1. The page

**In the record.** `INDEX.md:341` describes it as "read-only from the record, revised at the curator's comments the same day". `PLAN-history.md:395`: "Wanted now, at his word of 2026-10-12, to be finished and used as a reference in his reply to Sukyoung Ryu". `BOOT.md:27` (10-28): "it was made when he wrote to Professor Sukyoung Ryu for the proofs part of the POPL 2019 paper, to show her the revival." A review of v22: `postmortem-2026-10-19-haiku/part-3-return.md`, entry 15. **In order:** v1 on 10-08 10:25:54; letter 1 first drafted 10-10 08:01:33; C ties the page to Ryu 10-12 22:53:49 (1.3); letter 2 drafts link its text from 10-12 23:29.

### 1.1 His first ask: C, 10-08T09:25:07.427Z (sent 09:25:07.262), whole

```
agreed about the ledger status cell with your option one. That's fine. What worries me more is you said that um, our health fix. Ah, okay, there are 55 fixed. Oh, I'd like to have one more insurance research. Can a worker go through all the batches reports and basically verify whether the report's findings are correctly reflected in the ledger. Like, maybe it's fine if this is like a scoped search. Maybe we do not need to re-verify all 55 fixed and the seven opened. Well, like I'd like to understand more from this as a general shape. Like we started the explorations in the repo by just playing with with toy programs, and during this we like this is one era of of ledger rows accumulating. And then when we started. working on, on, on, like, we unfroze the tree, uh, unsealed the tree, we started to work on fixing those so that we get the count of errors down and we, we move towards the switchover. Like, I, I want, uh, like, a high-level retelling now of like the story of what happened in all of those batches and then basically I don't know whether this goes into the deal or not but like I want to understand that like there was the initial state of the repository and we are now trying to improve it like For example, we decided on the numeric tabber being replaced with the flat numeric code from the compiler's library, which is one of the, like, look up what you did before compaction, that the research where we did a questionnaire with workers about what their preconceived notions about Fortress language are from their pre-training and what the most common misconceptions were for workers that they needed to relearn. I had like a sneaking suspicion that part of these were caused by the changes to the library that we already did after the fact. So maybe some kind of chronology of changes in the repo would be helpful at a certain point just to calibrate ourselves. I, I don't know, like, I don't want a report for report's sake. I want it for my personal learning and also derive it for some improvements to the skill for the workers. Does it make any sense what I'm asking for? Do you, do you understand my intention?
```

K's brief to the Opus writer, 10:09:44.279Z: "for their own learning and to calibrate the skills that agents read."

### 1.2 Versions (24) and the text file's commits (25)

Row: publish time, K's `label`, **html** = bytes of the page file K published (the Artifact listing shows 546 more: 43,546 at v14; 43,999, 44,030, 47,292 at v20 to v22), then the text file's commits: hash, bytes after, the message when it adds to the label ("Revival story: " dropped; all: `git log --follow --format='%h %aI %s' -- ` + file). The five commits after `09a0bde72` are 10-13 00:03 to 00:08. No commit at v2, v4, v5, v15, v16, v21, v22.

**10-08**
- v1 10:25:54 "First version"; html 40,554 W Opus; md `9c6b3faf9` 24,246 "the revival from 08-19 to 10-08 in […]"
- v2 11:20:32 "Review page style"
- v3 11:28:51 "Glossary in dictionary style"; md `998a9e02d` 24,249
- v4 11:36:43 "Select buttons for Speak"
- v5 11:45:23 "Chart at retina resolution"
- v6 11:55:12 "Part 6 in plain steps"; md `db7ad1380` 26,478
- v7 11:57:54 "Part 7 evidence at the bottom"; md `790d4359b` 26,466
- v8 12:05:57 "The eleven points listed"; md `eb56e693f` 27,810
- v9 12:08:57 "Why each change"; md `dc5e61ec8` 31,159
- v10 12:12:56 "Point 8 unchanged; SUM under numbers"; md `2e6eaa1bd` 31,373
- v11 12:18:14 "Original, resolution, reason"; md `c7df1b453` 31,180
- v12 12:23:22 "Part 6 retitled"; md `26dd89c74` 31,258
- v13 12:38:53 "Reasons in the resolutions"; md `360c1190c` 32,040
- v14 12:49:20 "Part 7 removed"; html 43,546 (listing); md `bb4dc760f` 29,282; `05df7fdc7` 29,371
**10-10**
- v15 00:10:18 "Record growth to batch 13"; html 43,561 W Sonnet
- v16 06:15:11 "Up to batch 13"; html 63,996 W Sonnet
**10-12**
- v17 23:52:22 "Through batch 13b, fact-checked"; html 77,472 W Opus; md `526a8b10c` 58,893 "Revival story updated through climb batch 13b, for the curator and Prof. […]"; `eba3f336c` 60,311
**10-13**
- v18 00:01:32 "Curator unnamed again"; html 77,198 (file saved 00:08); md `09a0bde72` 60,265; `1806a3bc4` 60,156; `3f4d4caae` 60,153; `b3a509e02` 60,186; `6f59f5d8c` 60,219; `99a0b5c0c` 60,079
- v19 00:51:53 "Version 15's frame, through batch 13b"; html 43,452 W Opus; md `57fa12360` 31,601 "Revival story back to its first version's framing, order and voice, brought through climb […]"
- v20 01:28:48 "Astra and Sol named plainly"; html 43,453; md `9556daf62` 31,602
- v21 20:32:52 "Chart through 10-13"; html 43,484
**10-19**
- v22 16:47:54 "Batches 14 to 18"; html 46,746
**10-24**
- v23 12:00:48 "(none)"; html 54,671 (= v24's) W Opus; md `e62489ef4` 40,911; `ef425379e` 40,997
- v24 13:53:02 "(none)"; html 54,671; md `703d005d1` 40,997


### 1.3 His later words on the page (`#id`: a page comment, by thread id)

**10-08**
- 09:30:06 "[…] in the story for my learning […]"
- 11:57 #cef5805b "[…] the evidence is all at the bottom […]"
- 12:30 #bb8dc080 "[…] a living document that needs to be refreshed or revised after every every batch […]"
- 12:48 #e7bb1e55 "[…] a separate part resources/revival that lists the changes […]"
**10-10**
- 06:27:03 "[…] I am against Sonnet workers touching my artifacts. […]"
**10-12**
- 22:53:49 "We should update the revival so far. Last update revision by Sonnet was reverted, brace it didn’t do synthesis, but only copied last batches results, breaking the tone of the document. This should be in our record, with goal to finish the update. Then we should use it as one of references in our email to Ryu. Given that by number of commits, Fortress was mostly her work, I’d like to demonstrate how we approached the repo curation and how we approached the revival. I want to make it clear the respect we have for the team’s work, we are not kidnapping her baby, we’re trying to finish what they didn’t get time and resources to do, now that it’s became possible with frontier agentic coding systems. Does this make sense?"
**10-13**
- 00:22 #b37c5028 "This probably didn’t needed to be reworded as for Ryu only. This will be referenced from email which already uses this language. We should go back to previous versions framing, or halfway back. Rewrite should have just updated the revision to reflect what landed in recent batches. Not reframe the document in the emails framing!"
- 00:31:13 "> process study's close and the coordinator rewrite. This wasn’t in v15, because it has nothing to do with Fortress as a language. Nothing about improving the agentic coding has place here!"
- 00:33:57 "Main problem with the lasted version was expansion in didn’t ask for, resulting in TL;DR slop."
- 00:37:15 "Keep v 15 scope and content with update up to batch 13, plus corrections and approved additions. […]"
**10-19**
- 16:15:22 "[…] We had this revival so far document that included the changes in the language. So that one should be updated, […]"
**10-24**
- 11:36:23 "[…] I want you to update the, we have an artifact called revival so far. […]"
- 13:46:37 "The revival so far has not updated the chart."

Whole, in the scratch file: all 24 comments and every message above; also chart asks 10-09 23:58:18, 10-13 17:26:39.

## 2. The letter to Professor Ryu

**Where.** No sent text in `research/` or `explorations/`; `explorations/reviews/popl2019-provenance.md` 5.1 (d1a5d19f8) quotes the drafts of 10-10; the rest is in the transcript only. Nothing shows the send or date of letter 1, or the date of her first reply.

### 2.1 Letter 1, the proofs request

- K, draft 1, 10-10T08:01:33.105Z: "Here is a draft for you to send to Gyunghee Park and Sukyoung Ryu." It opens "Dear Dr. Park, dear Prof. Ryu,".
- C, 08:09:49.441Z, asked for the addresses "together with your draft as mail:// link". K, draft 2, 08:10:39.089Z: "To: sryu.cs@kaist.ac.kr", "Subject: Extended report for "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)".
- C, 10-13T01:16:53.620Z: "[…] here’s the final bit of context for you what my initial ask was: […]"; his paste equals draft 2's body byte for byte (script):

```
Dear Prof. Ryu,

I am reviving the Fortress language from Sun's last source tree, and your POPL 2019 paper with Gyunghee Park, Jaemin Hong and Guy Steele is the type group's last published word we build on. The paper cites a 2018 extended report with the full proofs. The lab's link to it on Google Drive is no longer accessible, and the KAIST repository is offline. Could you or Gyunghee Park share a copy?

Thank you,
Pavol Vaskovic
```

### 2.2 Her first reply, in C's message of 10-12T21:27:17.248Z, whole

```
Ryu replied to our email with following request:

Dear Pavol Vaskovic,

Thank you for your interest in our work.

Could you please briefly introduce yourself and let us know where and how you plan to maintain the Fortress language work? Thank you.

Best,
Sukyoung

***

Help me draft the brief reply.
```

### 2.3 Letter 2, C's reply to her, with the page

- **Drafts**, all K (Opus 5.5), full letters in chat: 10-12 21:28:37, 21:33:46, 21:49:53, 22:01:33, 23:04:42, 23:16:12, 23:29:16, 23:53:09; 10-13 00:39:58, 00:44:24, 00:52:46, 01:11:09, 01:17:25, 01:30:49. Another hand: a self-introduction "From Claude chat:" that C pasted at 10-12T21:49:21.927Z.
- **C on the drafts:** 10-12 22:01:05 "[…] the proofs we’re asking her for to be made public is possible […]"; the rest: `show.py --list 2026-10-12T2`, `2026-10-13T0`.
- **The page:** K, 10-12T23:53:09.090Z: "**GitHub copy for Ryu:**" and the link of `process-engineering/revival-story.md`, the link the letter holds; the text then was `9556daf62` (10-13T01:28:57, v20).
- **Last full draft**, K, 10-13T01:30:49.334Z, whole, after C's "Give me full draft again, no indent" (01:30:40.016Z). C, 01:33:39.562Z: "Email sent." The text he sent may differ; it is not on record.

```
Dear Prof. Ryu,

Thank you for your reply.

I'm a software engineer from Košice, Slovakia. I have a master's degree in computer science from the Technical University of Košice (2004) and have worked in the field since. I'm not a language researcher. My closest earlier work was on the Swift project's benchmark suite and [how it measures performance](https://forums.swift.org/t/towards-robust-performance-measurement/11490), from 2017 to 2020.

I learned about Fortress from Guy Steele's talks. This summer I wanted to see whether its mathematical notation could help me understand how large language models work, and how well those models work in a language they were not heavily pretrained on. So I asked Claude to port Karpathy's [microGPT](https://karpathy.github.io/2026/02/12/microgpt/) to Fortress. It grew into a hobby and a learning exercise in my spare time, equal parts about Fortress and agentic coding. Claude writes all of the code and the documents. The one goal is a working compiler, so that microGPT runs compiled.

The work is public at https://github.com/palimondo/fortress. The team's last source tree builds and runs again on current Java and Scala, and its test suites pass. The [README](https://github.com/palimondo/fortress/blob/main/README.md) introduces the language and the team. [Who wrote what](https://github.com/palimondo/fortress/blob/main/research/authorship.md) was reconstructed from the history, which is how I know that much of the code the revival works in is yours. The repository isn't an official continuation and doesn't speak for the team.

The revival's first principle is to be a custodian of the team's language, not its author. Most of the work is reconciling the specification, the libraries, the interpreter, the compiler and the type papers where they disagree. The largest step follows [a comment the team left in the compiler](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java#L110-L113), which calls its separate library a "hopefully temporary hack": the compiler is being brought onto the interpreter's library, so that one library serves both, as the specification describes. Where the team's later work departs from the original specification, the revival follows the later work. The specification is then updated to match, with the original text and the reason kept in an appendix. That's how your POPL 2019 paper came in: its rule for a type parameter that the arguments don't fix is now in the type checker and the specification. A longer account is [here](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/revival-story.md).

The [extended report](https://plrg.kaist.ac.kr/research/publications) would let me check my reading of the paper's proofs. Its Google Drive link on the lab's publications page no longer works: Google answers that I don't have access, even when I'm signed in. Could it be shared again, publicly if possible? Everything in the repository is public, and I'd like to cite and use the proofs there. If it can't be public, I'd keep a copy for my own use.

Best regards,
Pavol Vaskovic
```

### 2.4 Her second reply, in C's message of 10-28T21:29:03.452Z, whole

```
Side quest: there’s a Revival so far artifact page. Latest updates have drifted from the original intention. Send Archeology scout and librarian to give you its initial purpose, evolution, growth and purpose drift. We need to get it back into the shape like when we started, as we asked Professor Ryu for the proofs part of the POPL 2019 paper. 

I missed her reply in my inbox … just checked now and she replied:

***

Dear Pavol Vaskovic,

That's really impressive! If you have any questions about the Fortress team, I'd be happy to answer them to the best of my knowledge.

I’ve attached the TR file. I hope you find it helpful.

Best,
—
Sukyoung

***

She attached a 74 page long version of the paper (Extended with Formalization). I should probably ask her explicitly whether I can include it publicly in the repo. In will need your help in drafting the ask (scout for original message we wrote to her previously).
```

Her only earlier reply on record: 2.2.
