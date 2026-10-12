<!-- Fable 5.1's answers to the baseline interview, verbatim, 2026-10-12 12:42 UTC: Claude Code 2.1.296, effort xhigh, one turn, no tool call, 4.5K tokens out. The setting and the questions are beside this file. -->

Here are my defaults, numbered to match your questions.

**Memory and reports**

1. Project knowledge lives in the repository, in a notes directory, committed and pushed every time it changes. Plain markdown, one file per concern: a short index, current status, decisions, open questions, a run log. The container memory directory holds only how he likes to work. On any fresh start I read the index and status first, then follow links as needed.

2. I file the raw report unchanged under reports, named with date and worker. Then I extract. Measurements go into a results table with date, who measured, commit, and conditions. Decisions go into the decisions file marked as worker proposals, not approved. Open points go into the open questions file. I copy numbers, never paraphrase them. Dates and attribution are kept always, because without them I cannot tell stale from current.

3. The index, then the status file, then the newest decisions and open questions. A few hundred lines at most. Then a quick look at recent git history to see what actually landed. Old reports only when a task needs them.

4. I split by state, not by topic. An active file stays short. Older material moves to a dated archive that I read only when searching. Decisions are never dropped but condense to one line each with a link to context. Results keep the latest run per configuration in the active file. Pruning is moving, not deleting, and always in a commit.

5. Yes, one note per unit of work in the notes directory. At its top: date, what was asked, branch or commit, status, who did it. Then result, then open points. Small work gets a small note.

**Talking to him**

6. I reply with his eight points numbered in his order, one or two sentences each, so it reads cleanly aloud. Before replying I write each point into the task or open questions file, close to his wording. Anything I cannot answer yet gets a status line rather than being dropped.

7. Each reply is short and stands alone. It opens with a few words naming which point he is answering. One topic per reply. I record his answer in the notes and push before writing the next reply, so losing the container mid-thread costs nothing.

8. I search the notes and the thread for the order. If I find it, I apologize in one line and act on it. If not, I ask him to restate it and record it at once. The change: every imperative in a dictated message gets a line in an orders file before I reply, and I read that file before every plan.

9. I usually do not know it well. I estimate from the run log of similar past runs. If I have none, I say so and give the time of my next check-in instead. I give ranges and say what they rest on, and I update as soon as I have data.

10. I push it to the repository and tell him the path. Then a spoken-friendly summary: what it decides, what it changes, what it costs, what I need from him. Then the open questions, numbered, each answerable with a yes or a short word. I do not paste a long document into chat.

**Decisions**

11. In the decisions file, dated, his words nearly verbatim with one line of context, committed and pushed in the same turn. I also cross-reference it from the relevant task note. Before asking anything, I search that file. If his line is ambiguous I record my reading and tell him how I read it.

12. Before asking: read the code, tests, and history, check the decisions file, and try to settle it myself. The message, in order: the question in one sentence. My recommendation. The options, each with cost and risk in two sentences. What I need from him, phrased so a yes works. What I ruled out comes last or is left out.

13. I record it as a worker decision, attributed, with its reasoning. I check it against his orders and the decisions file. If it contradicts one, I hold or revert the work and tell him. If it is within scope and reversible, it stands and I flag it in my report as something he can overturn. If it is costly to reverse, I ask before merging.

14. I follow the rule and report that it hurt in this case, with the specific case and the alternative. I do not quietly break it. If the harm is clear and asking costs a day, I ask first. If the rule is his, I propose the exception in writing as an open question.

**Workers and runs**

15. I do the coordination: reading reports, keeping the notes, talking to him, deciding what goes next, reviews and small edits. Workers do anything over a few minutes of tool work: long runs, large changes, test runs, exploring unfamiliar code. Sonnet for mechanical work with a clear spec, searches, test runs, log summaries. Opus for code changes in unfamiliar areas, debugging, design drafts. Fable where being wrong is expensive: security-sensitive code, hard debugging, reviewing another worker's change before merge, and any document he will read as a design.

16. I do not sit on it. I hand the run to a worker, record start time and expected duration in the run log, push, and tell him it is running and when I will next check. Then I do other work. He hears one line at start and one line at finish with the result. Nothing in between unless it fails or the estimate doubles.

17. Clone the repository. Read the index and status. Compare the status file to the last commit to find work that was in flight and not pushed. Write down what was likely lost, tell him in one short message, and restart the in-flight work. Then push more often than before.

18. Read the relevant code and its tests. Run the suite before touching anything and record the baseline, including failures that already exist. Write or adjust a test for the change. Make the change small. Run the suite again and diff against the baseline. Commit with a message naming the behavior. Only then widen the change. If the suite is slow, run the affected subset first and the whole thing before pushing.
