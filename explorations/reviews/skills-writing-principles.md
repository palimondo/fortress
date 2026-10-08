<!-- Seven principles by which the fortress-repo skill is written as the curator would write it, each with its reason and a pair of texts from the skill's history, the one he marked and the one he accepted, for the writer of its parts. -->

# Writing the skills

The curator directs this restoration and reads every skill with human eyes. The writer edits a skill, a part is a file under its `references/`, and the record is the project's memory under `explorations/`. The register is Simplified Technical English (ASD-STE100), about halfway. Each principle gives its reason, then a text he marked and the text he accepted.

## 1. Define a term before you use it, and use plain words everywhere else

A reader new to the repository has only the skill, its brief and its training. A word with a meaning that the record gave it (a defect's "home", a "stop" that does not stop, "corpus") tells it nothing or the wrong thing. Where its training holds a near thing, name it ("as LLVM's lit does"): one clause corrects an assumption where a paragraph would not.
- Marked: "In every report, give each defect's home, ..."
- Accepted: "In your report, list each defect that you found, with the test or ledger row that records it."

## 2. Put the concepts first, as a dictionary, then the procedures in the order that the work meets them

A chain of do's and don'ts cannot be held in mind; a concept named once (an area, building, exploring, a point to report) makes each procedure short and tells the reader when to switch. A glossary entry is the term, then a noun phrase with no article. A comment marks a problem area: fix it at its paragraph or section, with the whole skill in mind.
- Marked: "- The base is the commit that your work starts from."
- Accepted: "**base**" / ": Commit that your work starts from."

## 3. Every sentence tells the reader what to do or a fact it needs to do it; cut the rest

Every agent pays for every token, and a sentence that changes nothing hides the ones that do: a slogan (a decision's title copied from the record), a step the agent takes anyway, a rule it cannot act on, a rule against a failure that never happened, a rule its system prompt gives, a back reference, a provenance word.
- Marked: "1. Read your brief. 2. Load the parts below that your task touches. [...] 4. Do the work."
- Accepted: "Load the parts below that your task touches before you run the query of the record that your brief gives. The parts give the words [...]"

## 4. State a rule for exactly the cases where it holds, and bound it to the agent's brief and its own work

A wider rule sends the agent to do what cannot be done: a test for a specification edit, a search through other agents' transcripts, a question to the curator. An absolute ("never wipe the caches") is wrong in the cases it did not name. Authority reaches an agent through its brief alone, and what a role or a workflow does belongs there, not in the skill.
- Marked: "Before you build or run something, look for its result on record. If the record or another agent's transcript holds the result [...], cite that result"
- Accepted: "Reuse each result of a build, a suite, a stage of the gate or a test that your brief cites or that your own work ran. Cite it."

Misapplied: cutting the default for a silent brief ("If it says nothing, commit your own files as you go") leaves the agent with no action. A cut never removes a default.

## 5. Say what to do, in the positive, one instruction per sentence, the condition first; add a reason only where it helps judge a case the rule does not name

A prohibition hides the mechanism it protects ("Do not ask the curator anything" hid how a question reaches him), and a compressed rule loses its purpose. A sentence that carries a list, a quoted title and a pointer cannot be held in mind; three short ones can.
- Marked: "Change one variable per step."
- Accepted: "When you probe or debug, change one thing at a time, so that each result has one cause."

## 6. State a fact once, where the reader builds on it, and never in more words than the text you replace

The curator reads for duplication at every scale: a word written twice, a fact said twice, a paragraph where a sentence does. A longer rewrite is a regression, however clear.
- Marked: "Do not pipe `ant` through `tail`: `tail` prints only after the command ends, and only its last lines. If the Bash tool's time limit stops the run first, you see nothing [...]"
- Accepted: "Do not pipe `ant` through `tail`: if the Bash tool's time limit stops the command, it shows nothing."

Misapplied: a word repeated for two things (the `walk` command walks the tree) is not duplication; the rule is one word for one thing, and a pronoun for the second mention of the same thing.

## 7. Put knowledge in the part loaded when it is needed; name a note only with a trigger and a narrow read

A mention of a file does not make an agent open it at the right moment, and a large note read whole costs more than the task. So the part holds what daily work needs, and a note it names comes with when to open it and the query that prints the slice. What only the coordinating session needs stays out of a skill every worker loads.
- Marked: "`explorations/modernization-plan.md` gives the versions and the classfile level."
- Accepted: "Before you change the version of a tool, read its step in the modernization plan. [...] It prints 4 to 6 KB: `facts-extract.sh 'doc:explorations/modernization-plan.md#The ladder@TOOL'`."
