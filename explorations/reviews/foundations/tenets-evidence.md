<!-- This file is step 2 of the foundations review of 2026-10-26: an evidence map, with no verdicts, of the grounds of the nine foundational tenets of the revival, each ground filed under the language, the team's JVM implementation or Java interoperability, for the Fable judge who rules on each tenet. -->

# The nine tenets of the revival: their grounds, by layer

Evidence worker's map, read-only, tree at `24314b0b9` (branch `main`), 2026-10-26. I ran nothing that edits the tree. I give no verdicts.

**The curator's frame.** His message of 2026-10-26T05:25:27.242Z (T-now): "I hope you are incorrectly mixing the aspects: what Fortress does with how is Fortress implemented on JVM and probably related is a topic of interoperability with Java." His goal behind the switch-over, 2026-10-26T04:47:50.485Z (T-now), as the brief cleans it: "The whole point of the switch-over is to avoid the need to port walk's library into the compiler's library. The revival is continuing the development of the type checker, so that it would accept the fuller Fortress library that the interpreter uses."

**The three layers.**

- **L1, the language**: the Working Draft, the revised specification, the papers, the 2012 restart, the team's library as a statement of the language, and the team's later published word in `research/extracts/`.
- **L2, the team's implementation on the JVM**: the compiled path's checker, code generator, class loader and run time, and what the team's code and commits show it needs. Walk is also an implementation; I file it under L2 and name it.
- **L3, Java interoperability**: how Fortress types and natives meet Java types and classes.
- **"L2→L1"** marks a ground of one layer used as the reason for a choice in another layer. The first layer named is the ground's, the second the choice's.

**Abbreviations.**

- POS = `explorations/coordinator/POSITIONS.md`; HIST = `explorations/coordinator/POSITIONS-history.md`; FACTS = `explorations/coordinator/FACTS.md`; "row N" = gap-ledger row N; "rq N" = item N of `explorations/coordinator/review-queue.md`.
- WD = `Specification-1.0-frozen/`, the Working Draft of 2011-02-02 (F-163). Spec = `Specification/`, the same draft as the revival revises it. Types = `Documentation/Specification/Prose/Language/types.tick`, Luchangco's chapter of 2012-05-31.
- Audit P-N = `explorations/coordinator/positions-audit/full/evidence/P-N.md`, the scout reports of the POSITIONS audit of 2026-10-22, which trace each entry to his messages.
- Transcripts. T-now = `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl` (from 2026-10-08). T-blind/00N = part 00N of `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/` on branch `transcripts-blinded`. T-old = `projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl.parts/001.jsonl` on `origin/transcripts` (2026-08-18 to 2026-09-17). His messages are `"type":"user"` records with `origin.kind == "human"`. Times are UTC.
- **How a history block reads.** Each block of HIST holds the text that stood **before** the change that its header line names. The present text is the one in POS.

---

## Tenet 1. The goal and its measure (P-7, P-8)

### (a) The entries

POS.md:7:

> - P-7 **The goal is to finish what the designers intended, measured by one program, microGPT, compiled to JVM bytecode and running fast.** What the designers intended is judged by the specification in `Specification/`: the team's Working Draft of February 2011, as the revival revises it, with the Types chapter of the team's 2012 restart cited beside it (P-25). The revival revises the specification to reconcile contradictions: where the team's later work, in the compiler or in the papers on types, contradicts the original text, the text is updated to follow that work (P-26: the type group's later word wins). The language is not redesigned. The specification is a living document that states each change that the revival makes (P-95 says how a change is recorded). A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at.

POS.md:8:

> - P-8 **Where the designers' own sources, the specification, the papers, the library and the implementations, give no answer, the curator decides by the goal, a compiled microGPT running fast, not by type-theoretic purity, and he stays true to the spirit of Fortress.** On the way to a compiled microGPT, he accepts the language's unfinished corners as they are, so that the work does not stall in theory. He has not read the specification, the papers on its type system or the library, and he takes the designers to have known more than he does.

Linked: P-7 points to P-25 (POS.md:23), P-26 (POS.md:24) and P-95 (POS.md:102). Nothing points to P-7 or P-8.

### (b) The grounds as recorded

**History of P-7** (`$T 'history:P-7'`, HIST.md:9, :624, :1900, :2132, :2522):

- 2026-10-13 17:58Z, numbered.
- 2026-10-13 19:07Z, rewritten from `reviews/decisions-review/judgement.md`, "F1. The goal and its measuring stick". The text before it: "**The measuring stick.** Finish what the designers intended, judged by ... the Working Draft of 2010-12 ... A pure-Java microGPT is written later as the floor to measure against."
- 2026-10-22 08:48Z, noted. It names his messages: 2026-09-16T22:43:26.489Z, unprompted; 2026-09-16T22:46:21.111Z, "word", to the coordinator's reflection of 22:44:25.808Z; 2026-09-29T15:49:10.603Z, his yes to item 11 of the decisions review (the living document); 2026-09-26T09:04:41.396Z, the plan.
- 2026-10-22 09:45Z, clarity pass: "floor" replaced by his "baseline" and "optimal result"; the sentence on revision taken from his 2026-10-12T23:15:30.246Z.
- 2026-10-22 12:37Z, the scrape (status deleted). The present text.

**History of P-8** (HIST.md:13, :630, :1486, :1904, :2138): numbered 10-13; rewritten 10-13 from the decisions review's "In short"; on 10-22 the audit struck a sentence that made his one-time request for a review read as a standing practice; clarity pass 10-22 09:45Z. Its one source is his message of 2026-09-29T12:17:07.180Z.

**His words.**

- 2026-09-16T22:43:26.489Z (T-old): "I, I see no reason to make this language something that it wasn't designed to be. I, I would just like to use AI coding to try to finish those ideas as the original designers intended them"; "here we will be talking not about the 1.0 specification, but the latest one that was committed in this repository. ... We, we assume that the later version was a correction compared to the 1.0. And we need to stay true to that spec and get to compiler that produces a fast code for our toy example"; "the stuff with boxing, like if if this was supposed to be high performance language, I think we should still use our focusing example of ... micro GPT"; "At a certain point, we will probably take and rewrite the micro GPT algorithm in pure Java to know where our baseline lies ... if we were to get the optimal result."
- 2026-09-29T12:17:07.180Z (T-blind/002, per Audit P-8): "I don't care about type theoretical purity and I'm accepting all unfinished corners of the language because I want to get to a compiled version of micro GPT"; "That's our guiding star. But along the way, I want to stay true to the spirit of Fortress"; "I haven't read the Fortress specification, none of the papers about its type system. I haven't read even the standard library"; "I assume those people knew much more than I do right now."
- 2026-10-12T23:15:30.246Z (T-now): "we are reconciling the contradictions and when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival."
- 2026-10-22T22:02:17.752Z (T-now): "Since I saw how my off hand remarks turn into words of gospel when they enter POSITIONS, I am very worried about answering these correctly"; "none of these were decisions of mine that must be turned into gospel."

**What he was told before he decided.**

- 2026-09-08T19:39:54.049Z (T-old), the coordinator: Steele's wrap-up post "says they hit 'severe technical challenges having to do with the mismatch between the (rather ambitious) Fortress type system and a virtual machine not designed to support it ...'"; "So the boxing and the unspecialized generics were not an oversight they planned to fix later. They were the frontier they were still fighting when the project ended."
- 2026-09-16T22:44:25.808Z (T-old), the coordinator's reflection, which he took with "word": "Finish what the designers intended, judged by the latest spec, not redesign the language. The measuring stick is one program: microgpt compiled to bytecode and running fast. A pure-Java microgpt later gives the floor to aim at." The words "measuring stick" and "floor" are the coordinator's (Audit P-7, section 1).

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| The standard is `Specification/`, the Working Draft of February 2011 | L1 | F-163; `coordinator/spec-lineage.md`, Summary: the team's last text edit is 2010-12-09, the copy of 2011-02-02 | Yes. His 09-16 words say "the latest one that was committed", which he took to be "a correction compared to the 1.0". |
| The Types chapter of 2012 beside it | L1 | F-166; `spec-lineage.md` §6: Types is "a complete, from-scratch rewrite" of 2012-05-31, never adopted | Yes. |
| The language is not redesigned | L1 | his 09-16 words | Yes, his words. |
| The aim "running fast" | L1 aim | WD `preliminaries/intro/philosophy.tex:14-18` ("designed for producing robust high-performance software"), `:33-35` ("a language for high-performance computation") | The language states a high-performance aim. P-7 does not cite it. |
| The measure: "compiled to JVM bytecode" | L2 | the WD names no virtual machine and no bytecode: `grep -i 'virtual machine\|bytecode\|JVM'` over the WD finds only `basic/components/overview.tex:63`, the Fortress shell ("a virtual machine, a compiler, and a library registry all rolled into one") | The JVM is the team's implementation choice, not a language rule. |
| Later compiler work updates the text | L2→L1 | his 2026-10-12T23:15:30.246Z words | Yes, his words; "to match the current state of the implementation". |
| A pure-Java microGPT is the baseline | L2/L3 (Java) | `git ls-files` holds no Java microGPT; PLAN.md phase 6 ("not written yet") | Not built. |
| P-8: decide by the goal where the sources are silent | L2 measure as tie-breaker for L1 | his 09-29 words | Yes, his words. P-8 lists "the implementations" among "the designers' own sources". |

### (d) The evidence since the decision

- `reviews/decisions-review/judgement.md`, F1: "a call, and the right frame", with a wording fix (the "July 2012" label), since done.
- `reviews/type-decisions-review/evidence.md` §1.1: every type entry rests on P-7 and P-8.
- The team's later word on the goal's two halves: the wind-down post (`research/extracts/fortress-websites-wayback.md:110-113`, the type system against "a virtual machine not designed to support it"); Steele 2016, slide 44, "So we had a grand vision, but could not quite pull it off" (`research/extracts/SteeleJuliaCon2016-extract.md:419-425`), and slide 45, "My current thinking is to back off and try to exploit a subset of these ideas using a less complex type system" (`:439`).
- No compiled microGPT exists (PLAN.md, phase 5) and no pure-Java baseline exists (PLAN.md, phase 6).

### (e) Grounds that mix layers, and grounds he was not told

- **The goal joins two layers by design.** The intent is judged in L1 (the specification). The measure is L2 (JVM bytecode, speed).
- **P-7's second sentence is L2→L1.** "Where the team's later work, in the compiler ..., contradicts the original text, the text is updated to follow that work." His own words of 10-12 say "to match the current state of the implementation in the revival".
- **P-8 is L2 over L1 where L1 is silent.** It also counts "the implementations" as the designers' sources, beside the specification and the papers.
- He was told the team's wind-down sentence on 2026-09-08, before P-7 (above). I found no sign that Steele's 2016 slide 45 ("back off ... a less complex type system") was put to him in relation to the goal; I did not search every turn.

### (f) What would make the tenet wrong, and what has measured it

- If finishing the designers' L1 intent and running fast on the JVM (L2) pull against each other on the path to microGPT, the goal's two halves conflict. The team's own wind-down names such a conflict (type system against the VM). No measurement settles it for microGPT: the model does not compile yet, and the baseline is not written.
- P-8 cannot be measured; it is a rule for weighing. The reviews of 2026-09-29, 2026-10-23 and 2026-10-24 checked his decisions against it.

### (g) Dependencies

- Depends on: nothing. It is the root.
- Depended on by: every other tenet. P-7 names P-26 (tenet 2). P-8 is the tie-breaker cited by tenets 5 and 7 ("he cares that specialised code runs fast"; "cannot be boxed").

---

## Tenet 2. The team's later word wins (P-26)

### (a) The entry

POS.md:24:

> - P-26 **Where the type group's later positions conflict with the specification's early text, the later positions win.** The early text was a wish. The type group, the part of the team that built the type checker and the compiler, then worked to make the language run, with performance as the goal and specialization a must, and learned what is feasible. Specialization, in the type group's design, is a special version of a generic function for one instantiation, such as `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, which dispatch chooses at run time. Where the two conflict, the specification is revised to follow their later word (P-95 records each change with its reason). Their later word includes the exclusion rule, specialization kept, the number types of the compiler's prelude made siblings in 2009 and 2010 (P-43: the library's numbers are flat in the same way), Karl Naden's 2012 write-up "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex`) and the type group's POPL 2019 paper (F-166). The implementers' later word also outweighs unfinished text. The revival does not second-guess them: it knows less than they did.

Linked: P-26 points to P-95, P-43, F-166. Pointed to by F-223, P-7, P-25, P-44, P-48, P-152, P-154, P-158, P-153.

### (b) The grounds as recorded

**History** (HIST.md:53, :690, :1932, :2180):

- 2026-10-13 17:58Z, numbered; earlier texts at `a74f5a2b7:explorations/coordinator/POSITIONS-history.md:1124`.
- 2026-10-13 19:07Z, rewritten from `reviews/decisions-review/judgement.md`, "F3". The text before it held his quotes: "was written in a vacuum early on", "as a wish", "then the type group went in and tried to make it run. So they knew much more about what's feasible and what's not. The goal was performance. The specialization is a must", "whatever the spec was dreaming about in 2008 is irrelevant because it met hard reality", "We are not Naden. We know nothing here."
- 2026-10-22 08:48Z, noted. Sources: 2026-09-23T07:26:28.248Z, answering the coordinator's 07:16:28.611Z; 2026-09-29T12:17:07.180Z ("we are valuing their latest positions on record above whatever they said earlier"); 2026-10-10T06:09:08.402Z (his acceptance in use of "the type group's late word, POPL 2019 included"); 2026-10-12T22:20:54.637Z (the flattening's authors fixed from "Steele" to Chase, Ryu, Maessen and Allen).
- 2026-10-22 09:45Z, clarity pass. The present text. Specialization's definition is "marked as the type group's design, not his requirement (his 2026-09-24T01:02:52.634Z)". The sentence on unfinished text is "kept word for word for his answer to the audit's question".
- Audit P-26, section 3: the sentences "the POPL 2019 paper" and "the implementers' later word outweighs unfinished text" were added on 2026-09-30 (`bc8902f47`) with no source. rq 215 asks him to confirm or strike the second; it is open.

**His words, 2026-09-23T07:26:28.248Z (T-blind/000):** "The spec was written in a vacuum early on. ... let's say 2009 or something. And then the type group went in and tried to make it run. So they knew much more about what's feasible and what, what's not. The goal was performance. The specialization is a must. ... And then you said Steele was the one who tried to adapt the numeric tower ... the spec cannot be all authoritative on, on something that was written as a wish. And when that wish met reality, then the spec must change. ... I believe you are placing those decisions in 2012. ... So whatever the spec was dreaming about in 2008 is irrelevant because it met hard reality and impossibility of implementation. ... We are not Naden. We know nothing here. ... we are not going to re-speculate how to implement the letter of specifications from 2008, which was misinformed."

His later applications: 2026-09-29T17:34:18.956Z, "then I will trust the team's work over whatever my misunderstanding of the things are"; 2026-10-26T04:28:41.037Z (T-now), "by the standing position that later team's work supersedes earlier one, we take the completed path's way over the walk library's" (the reason of P-158).

**What he was told before he decided (T-blind/000).**

- 07:10:43.420Z: "Fortress's compiled path does not erase. The class loader stamps out a separate class for each instantiation ... The spec's answer is that the call site's static type chooses. Java forbids the double membership for the opposite reason, erasure cannot tell the two apart at all"; "Their working answer was to flatten the compiler's own library, the commented-out extends clauses."
- 07:16:28.611Z, "Here is the whole thing in plain words": "They kept the special versions and forbade the double membership"; "In the compiler's own small library, Steele commented out the extends clauses ... So the compiled world's practical answer was: keep the rule, keep the special versions, flatten the tower, widen by coercion"; the choice put as "The type group's trade ... Or the spec's trade".
- 07:27:17.853Z, after his message: "July 2011: Steele himself comments out the tower's extends clauses in the compiler's library. So the flat compiled tower is his own late answer, inside the rule." The record later found that Chase cut the subtyping on 2009-08-31 (`6896886fb`; `reviews/flattening-questions-ways.md:55-64`), and fixed the attribution on 2026-10-12.

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| "The early text was a wish" | L1 about L1 | `reviews/mie-probes/spec-sentences-dated.md`, items 1-5: the WD sentences on double membership and the overload sentence are byte-identical from `0f49d8698` (2009-11-06) to the team's end | Dated 2009 at the latest; "never revised after 2010". "2008" is his figure; Audit P-26 found no 2008 git date. |
| The type group "built the type checker and the compiler" | L2 (who) | the definition is the record's; `.claude/skills/fortress-repo/references/exploring.md:16` | The ranking is by implementers. |
| "with performance as the goal and specialization a must" | L2 motive | `Papers/Types/journal/justificationOfRTR.tex:82-88`: a specialised function exists "so that as much information can be used to make the algorithm efficient" | Partly. No team text states "specialization a must" as a decision (Audit P-26, section 2, "thin"). |
| "learned what is feasible" | L2 | `fortress-websites-wayback.md:110-113` (the type system against the VM); Steele 2016 slide 44 ("nontrivial run-time constraint solving", "exponential cost") | Yes: the team's later word names implementation limits. |
| Specialization defined as an overload chosen at run time | L1 | `justificationOfRTR.tex:75-88` (`tail(x: List[ZZ])` beside the generic) | Yes. |
| The exclusion rule | L1 and L2 | `Papers/Types/exclusion.tick:141-152` (the 2011 paper); Types `:355-376`; the checker since 2010 (F-44) | Yes. |
| "specialization kept" | L1 in P-26; L2 in the skill | P-26 defines it as an overload (L1). `exploring.md:20` lists it as "compiled code specialised to each instantiation of a generic, which they kept" (L2, the class loader's template classes) | The two record texts name different layers. |
| The prelude's numbers made siblings, 2009-2010 | L2 (the compiled path's own library) | `6896886fb` (Chase, 2009-08-31) is a code-generator commit (CodeGen.java +720 lines; FZZ32, FRR64 made to implement the generated trait interfaces) whose message ends "ZZ32 is NOT a subtype of ZZ64 ... this would be a good time to get coercion working"; `128f313b5` (Maessen, "[libraries, codegen]", "gradually migrate to a flat numeric hierarchy") | The commits state no reason. They are L2 work on the compiled path. |
| Naden's 2012 write-up | L1 (type theory) | `justificationOfRTR.tex:477-478` ("specialization of generic functions or multiple instantiation inheritance, but not both"); `:496-497` ("blanket multiple instantiation exclusion for the semantic benefits and the simplicity of the restriction"); `:629-632` ("more work needs to be done ... the numerical hierarchy") | Yes. His stated reason for the rule is semantic (L1), not the JVM. |
| POPL 2019 | L1 | F-166, F-271; `research/extracts/ParkPOPL2019.txt` | Yes; later than all. |
| "The implementers' later word also outweighs unfinished text" | L2→L1 | no source (Audit P-26; rq 215) | Not his words. |

**What counts as "later": the team's sources in order of time** (dates from the record's archaeology; the cut history makes some uncertain):

| When | Source | Kind | Layer |
|---|---|---|---|
| 2007-2012 | the interpreter's library: nested tower from 2008, kept to the team's last commit (`a874948ac:Library/FortressLibrary.fsi:461`, `ZZ32 extends { ZZ64, Integral[\ZZ32\] }`; `:495`) | code, never type-checked | L1 artefact; walk (L2) |
| 2008-03-31 | the 1.0 text (`fortress.1.0.pdf`) | text | L1 |
| 2008-12-19 | the compiler prelude born (`c8d301411`, "stripped-down minimalist ... first crack at compilation") | code | L2 |
| 2009-08-31 to 2010-01 | the prelude flattened (`6896886fb`, `3e0306166`, `128f313b5`, `2ef730c88`, `d0cde7d17`) | code | L2 |
| by 2009-11-06 | the WD's sentences on double membership and on overloads (earliest git copy, `0f49d8698`) | text | L1 |
| 2010-05-28, 2010-07-26 | the exclusion rule in the checker; `checkP` | code | L2 |
| 2010-12-09 (copy 2011-02-02) | the WD's last text edit, with "These types are mutually exclusive" (WD `basic/types-vals-vars.tex:502`; not in 1.0, in the draft by 2011) | text | L1 |
| 2011 | the OOPSLA type paper (`Papers/Types/`) | paper | L1 |
| 2011-2012 | Steele builds on the flat prelude (`da5291587`, `d535963cb`, `304f2743a`) | code | L2 |
| 2012-02-20 to 05-31 | the restart; Types (2012-05-31) | text | L1 |
| 2012-05-21 to 05-30 | `Papers/Implementation/` (TypeMapping, MethodMapping) | notes | L2 |
| 2012-05-28 to 05-30 | Steele's switch of the implicit bound (tenet 4) | code | L2 |
| 2012 (date not in git) | Welterweight | paper | L1 |
| 2012 | the compiled export check (Chase; `reviews/phase3-exit/judgement.md` §1 item 2) | code | L2 |
| 2012-06-27 | the last prelude edit, "bogo-trait ZZ32" (`b16964470`) | code | L2 |
| 2012-08-31 | Naden's write-up and run-time instantiation theory; the patents filed | text | L1 |
| 2012-07 | the wind-down post | team word | L2 limit on L1 |
| 2016 | Steele's JuliaCon talk (a flat tower slide, `SteeleJuliaCon2016-extract.md:346`; "back off", `:439`) | talk | L1 |
| 2019 | POPL 2019 (Park, Hong, Steele, Ryu) | paper | L1 |

**Where the record has applied "later", and to what kind of source:**

- L2 code as the later word: P-43 (the prelude's flattening); P-153 ("the team's later code gives an integer power the type of its integer base", from the prelude's powers); P-158 (the compiled export check of 2012 and the prelude, "by P-26 ... that way wins over the interpreter's library, written earlier for walk"); his 2026-10-26T04:28:41.037Z words.
- L1 texts as the later word: P-48 (POPL 2019); P-152 (the 2011 paper, after rq 228's change of reason); P-44 (Types and Welterweight); F-223 (the papers of 2011 and 2019); P-154 (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`, a library draft whose first commit in git is the root snapshot `5a68404fd`, 2012-07-19, so its date is unknown).

### (d) The evidence since the decision

- `reviews/decisions-review/judgement.md`, F3: "a call, and the right one ... Its limit, which the exclusion brief named: it ranks texts by date and by whether they ran, and the two implemented halves (the interpreter's nested library, the compiler's flat prelude and rule) are both the group's."
- `reviews/exclusion-design-brief.md:129-130`: "the interpreter and its library are the group's too, and they kept the nesting and refused the shortcut to the end"; "So between A and C the premise leaves a judgement, not a ranking".
- `reviews/type-decisions-review/judgement.md`, V5: the roots stand, "with the exclusion brief's limit stated".
- rq 215 (the unfinished-text sentence) and rq 228 (P-152's reason) are open.

### (e) Grounds that mix layers, and grounds he was not told

- **P-26 ranks L2 above L1 by its definition.** The "type group" is the implementers, and their later work in the compiler counts as the language's later word.
- **L2 code read as L1 positions.** The flattened prelude (a bootstrap library of the compiled path), the compiled export check and the prelude's powers are counted as the team's later word on the language (P-43, P-158, P-153).
- **"Impossibility of implementation"** in his 09-23 words is an L2 reading of why the text changed. The record's own measurement of the spec's side (route B) was 43 lines of call-site dispatch (`exclusion-design-brief.md:95-105`); nothing on record shows that the WD's double membership could not be implemented.
- **The coordinator's 09-23 explanation used L2 and L3** (the class loader, erasure, Java) to explain an L1 trade.
- **"specialization kept" names two layers** in two record texts (P-26: an overload; the skill's `exploring.md:20`: compiled code per instantiation).
- **Not told before he decided:** that the flattening (2009) is earlier than the WD's last edit (2010-12) and its "mutually exclusive" sentence, so that on the tower "later by date" does not single out the flattening; that `6896886fb` is a code-generator commit with no stated reason; the right authors and dates (he was told "Steele, July 2011"; fixed 10-12).

### (f) What would make the tenet wrong, and what has measured it

- If the later positions record what the team's JVM implementation could carry (L2 limits), then P-26 brings implementation limits into the language. The team's wind-down names such limits. Naden's own reason for the rule is semantic (`justificationOfRTR.tex:496-497`). Nothing measures this; it is a rule of weighing.
- Where two later sources conflict (the interpreter's 2012 nested library against the prelude's flattening; the 2012 patents' forest rule against POPL 2019), P-26 gives no order. The exclusion brief says so.

### (g) Dependencies

- Depends on: tenet 1 (P-7 names it).
- Depended on by: tenet 5 (P-43's "Why"), tenet 4 (the specification's callout cites POPL 2019 as the later word), P-44, P-48, P-152, P-153, P-154, P-158, F-223. Tenet 3 by its clause "the one library may take a design of the prelude's".

---

## Tenet 3. One library, the interpreter's (P-37)

### (a) The entry

POS.md:34:

> - P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled). The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library. The decision is not put to him again. How the checker comes to accept the library, its first step and the order of the work, was left to a plan for him, which he approved (P-33).

Linked: P-38 (POS.md:35), P-33 (POS.md:30); pointed to by F-11 (FACTS.md:9).

**The premise to check:** the compiled path can run the interpreter's library, not only check it.

### (b) The grounds as recorded

**History** (HIST.md:85, :461, :1956, :2210, :2558):

- 2026-10-13 17:58Z numbered; 18:16Z rewritten from `perf-probes/prelude/REPORT.md`, "5. The answer". The text before it: "**The library route.** 'we need to unify this. into single library'; 'the compiler second library is just a bootstrap and we need to get rid of it.' ..."
- 2026-10-22 08:48Z noted. Sources: 2026-09-20T14:33:50.777Z, answering 14:28:17; 14:39:06.836Z, answering 14:34:56.912Z; 2026-09-21T02:40:19.981Z, answering 02:36:16.321Z ("That decision is made"); 2026-09-24T01:02:52.634Z, "Only which file survives."; 2026-09-29T12:17:07.180Z.
- 2026-10-22 09:45Z clarity pass; 12:37Z the scrape. The present text.
- P-37 does not hold his reason of 2026-10-26T04:47:50.485Z. The coordinator said at 04:50:10.441Z (T-now): "What P-37 lacks is the reason in your words of today ... I'll add that to P-37 when we finish this discussion." HIST shows no block after 2026-10-22 12:37Z.

**His words.**

- 2026-09-15T23:51:36.527Z (T-old): "Couldn't the path forward be just to use the FortressLibrary for compiler as well? What breaks and when?"
- 2026-09-20T14:33:50.777Z (T-blind/000): "we need to unify this. into single library".
- 2026-09-20T14:39:06.836Z: "I fully believe that the compiler second library is just a bootstrap and we need to get rid of it. Like, I don't even think that is a question that's worth deliberating about alternatives. Like, what, what would be a reason to re-implement the thing from, from the compiler?"
- 2026-09-20T15:18:35 (from `postmortem-2026-09-19/positions-checker-gate.md:31`): "running this count, okay, gives you a metric, but it tells you nothing of how much work is to get the interpreter running with the compiler because there is the whole work with the type checker. ... it is absolutely unclear whether... this has been priced in." That note's judgement: "not answered. ... the desugar/codegen holes stayed unmeasured" (`:34`).
- 2026-09-21T02:40:19.981Z: "You decoded it correctly. Disregard it as sparse message. Don't revert!??"
- 2026-09-24T01:02:52.634Z: "Only which file survives."
- 2026-10-24T11:36:23.562Z (T-now): "My understanding is that phase 3 was about driving the checker to the state where we can now type check the full interpreter's library."
- 2026-10-26T04:47:50.485Z: the brief's quoted goal.

**What he was told before he decided.**

- 2026-09-15T23:21:44 (T-old, per `postmortem-2026-09-19/direction-history-transcripts.md`): the two routes, "porting the needed parts of the 4,518-line prelude into the 592-line one, or making the compiler consume the interpreter's prelude".
- 2026-09-16T00:13:03.265Z (T-old): "**Almost nothing in the library is specific to bytecode generation.** 211 of its 4,518 lines are the 108 native bindings; the other 95% is plain Fortress"; and, as item 5: "Desugaring and code generation were never reached, so no bytecode-specific failure has been seen yet."
- 2026-09-20T14:34:56.912Z (T-blind/000): "Whether they meant that prelude as a bootstrap toward compiling the full library one day, or as a permanent second library, is not on record yet."
- 2026-09-20T15:03:24.261Z: the judgement's ruling, "nothing on record argues for keeping the compiler's second library. ... The team's three and a half years of growing the copy is a record of what they could do behind the JVM wall, not a position to overrule."
- The judgement itself, `coordinator/library-route-judgement.md`, step 4: "No run has ever reached [DESUGAR and CODEGEN] with this library; the size is not on record." Its §1 also kept the compiled path's implicit `extends Object` as "the spec's" (tenet 4).

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| The specification knows one default library | L1 | WD `library/structure.tex:15-20` ("chiefly `FortressLibrary` and `FortressBuiltin`"); `library/default-libraries.tex:15-39` (two sets, the second the builtins, `\input{\home/library/apis/FortressBuiltin.tex}`) | Yes. No `.tex` names `CompilerLibrary` (`two-libraries.md` §1). |
| The split is a "hopefully temporary hack" | L2 comment; its reason L3 | `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:113-116`: "Re-points fortressLibrary etc. to special compiler (rather than interpreter) versions of the code. Hopefully temporary hack as we work on importing java objects cleanly." | Yes. The reason it gives is Java imports (L3), not the checker. |
| The team called the prelude's contents "bogus" and "bogo-trait" | L2 | `b16964470` (Chase, 2012-06-27, "Added missing CMP method to bogo-trait ZZ32"), checked; `ccccbe26f`, `525264af1` per `two-libraries.md` §1 | Yes. |
| No team plan to end the split | L1/L2 | `two-libraries.md` §1, "What no source says" | The record found none. |
| 95.3% of `FortressLibrary.fss` is plain Fortress | L1 artefact, read as an L2 claim | `perf-probes/prelude/REPORT.md` §3 (a count of source lines) and §2, "DESUGAR and CODEGEN: never reached" (`:235-246`) | The count is a reading of the text. The code generator was not reached. |
| The checker is the gate: 92 errors then; 0 now over the twelve | L2 | F-53 (FACTS.md:47) | Yes, for the twelve and the bound `Any` (tenet 4, tenet 6). |
| Natives are the only codegen-specific part | L3 | row 309; F-32 | Yes as counted; 78 of 424 need more than a helper (F-32). |

### (d) The evidence since the decision, on the premise

- **Code generation, per declaration, failures caught:** under the bound `Any` it refuses 52 declarations of the twelve, all of which the checker passes; "no emitted class was run" (F-34, FACTS.md:28). `perf-probes/codegen-distance/REPORT.md` §6: "An emitted declaration is not a working one: no emitted class was loaded or run."
- **The class loader and run time with tuple, arrow and `()` static arguments:** `perf-probes/bound-any-compiled/REPORT.md`, "The answer in short": tuple and arrow arguments compile, load and run in every shape; `()` fails with `AbstractMethodError` under either bound (row 339); a new defect, a generic dotted method with a single tuple-typed parameter dies with `ClassCastException` (`CodeGen.java:6250-6263`), no row yet. Its own limit: "The one library on the compiled path ... did not run compiled; the shapes stand in."
- **Run-time faults that the checker does not see:** row 321 (stack overflow when an object inherits walk's `trait Object` with `getter toString`); row 816 (9 of 12 `abstract` members die with `NoSuchMethodError`); row 782 (9 operator headers differ; `#` and `:` die with `NoSuchMethodError`); row 701 (header `where` clauses; 4 of 5 walls are revival lines); row 320 (an api implemented by a component of another name does not link).
- **Natives:** F-32: 424 bindings, 78 that "need more", among them `NativeArray` and `getProgramArgsPrim`, which microGPT needs and which have no compiled analogue.
- **The rest of the library:** F-290 (FACTS.md:124): 624 component errors in 30 of the 40 other components, at least 92 api errors, 25 crashes.
- `reviews/phase3-exit/judgement.md` §2.4: "code generation's 52 (the library must emit, not only check, before the compiled tests can run against it)".
- Reviews of the decision: `reviews/decisions-review/judgement.md`, D1, "faithful"; the 2026-10-23 and 2026-10-24 reviews keep it.

### (e) Grounds that mix layers, and grounds he was not told

- **L1 artefact read as an L2 claim.** "Almost nothing in the library is specific to bytecode generation" rests on a reading of the library's source (L1 artefact), while the code generator, class loader and run time (L2) were not reached. He was told the second half (item 5 of 09-16), not as a condition on the route.
- **L1→L2 in the library-route judgement.** §1 read the WD's `Object` sentence as the reason to keep the compiled path's `extends Object` setting ("the compiler's setting is the spec's and the interpreter's is the divergence; the reconciliation keeps the compiler's"). The coordinator named this on 2026-10-26T05:27:11.048Z: "The judgement of 09-20 read layer 1 as a reason for layer 2."
- **L2 limit as the reason, then an L2 design imported as L1.** The ruling he received framed the prelude as "what they could do behind the JVM wall" (L2). P-37 then says "the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types" (an L2 bootstrap shape taken into the L1 library; see tenet 5).
- **The split's stated reason is L3** (Java imports, `WellKnownNames.java:115`). P-58 (tenet 8) is the decision that answers that reason.
- **His own doubt was not answered.** His 09-20T15:18:35 objection, that the checker's count is not the work to run the library on the compiled path, is recorded as "not answered" (`positions-checker-gate.md:34`).

### (f) What would make the tenet wrong, and what has measured it

- **The premise fails** if the compiled path cannot compile, load or run some of the library's designs at a cost above a port of the needed parts. Measured: code generation per declaration (F-34: 52 walls on checked declarations); toy shapes on the class loader (tuple and arrow run; `()` and the tuple-domain method fail). **Not measured:** any jar of a library component loaded and run on the compiled path; the library's own instantiations at tuples run compiled; the 27 compiled tests that import `CompilerSystem` against the one library.
- **The curator's goal of today speaks of the checker only** ("so that it would accept the fuller Fortress library"). The run-time half of the premise is not in that sentence.

### (g) Dependencies

- Depends on: tenet 1 (no redesign; one program). Tenet 2 weakly (the prelude's design taken).
- Depended on by: tenet 4 (the switch-over ends the departure), tenet 5 ("Only which file survives" let route A stand), tenet 6 (phases 3 and 4 carry it out), tenet 7 (the arrays reach the compiled path with the one library, F-11), tenet 8 (the natives are the switch-over's first step), tenet 9 (walk runs the checker after the switch-over; F-290).

---

## Tenet 4. The implicit bound `Any` (P-42)

Step 1 of this review holds the detail: `explorations/reviews/foundations/bound-archaeology.md` (the bound by layer; what he was told) and `explorations/perf-probes/bound-any-compiled/REPORT.md` (the compiled path under the bound `Any`). I cite them and checked their key lines.

### (a) The entry

POS.md:39:

> - P-42 **A type parameter declared without a bound has the implicit bound `Any`, not `Object`.** `Any` holds tuples, functions and `()`, which `Object` does not. The library instantiates its generic containers at tuple types: its arrays indexed by pairs, such as `(ZZ32,ZZ32)`, are among them. The specification states the bound `Any`, with a callout that records that the Working Draft of February 2011 said `Object`. The compiled path departs from it until the switch-over, which ends the departure: while it uses the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (row 412).

Pointed to by F-289, F-173, F-174, P-156.

### (b) The grounds as recorded

- **History** (HIST.md:105, :493, :1972, :2228, :2582). The noted block of 2026-10-22 08:48Z gives his sources: 2026-09-29T14:02:25.736Z, "Option one", answering 13:58:02.218Z; 13:57:39.332Z, his recap, "we go with `Any`, as the status quo". It adds: "The coordinator's text of 13:58:02 told him that the 2012 Types chapter has `Object` exclude function types, but the chapter puts arrow types under `Object` (`types.tick:232-236`), so his yes rests on the tuples." rq 218 asks whether "functions" stays; open.
- **Earlier:** batch 7 took `Any` as its default on his "Yes." of 2026-09-27T18:43:34.570Z (archaeology §4.3).
- **What he was told** (archaeology §4.3-4.4): that the compile path writes `Object` and that this refuses tuples (09-20, 09-29); that "Steele switched this bound off in 2012 'so that interpreter tests will pass' (`c61723f61`)" (09-26T10:57:29.817Z); at 14:02:59.997Z: "Yes, it's a correction to the specification, and nothing in the code changes because of it." He was not shown `afb02f41d`, which made the compiled side set `Object`, nor the code that reads the bound (archaeology §4.4).
- **His doubt today,** 2026-10-26T05:25:27.242Z: "The question of the bound seems like a linchpin".

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| The WD gives `Object` | L1 | WD `basic/trait-parameters.tex:49-50` | Yes. The same section (`:53-54`) says type parameters are instantiated with tuple and arrow types. Not in the 1.0 text; first in git 2009-11 (archaeology §1.2). |
| The revised specification gives `Any` | L1 (revival) | Spec `basic/trait-parameters.tex:53-61`, callout `revival-bound`, citing POPL 2019 | Yes. |
| POPL 2019: "By default, each type parameter has an upper bound Any" | L1 | `research/extracts/ParkPOPL2019.txt:418-419` | Yes. |
| `Any` holds tuples, functions and `()`, which `Object` does not | L1 | Types `:232-238`: `Object` is above "every trait type, arrow type and function type", and excludes `Void` and every tuple type; Spec `basic/types-vals-vars.tex:150-156`: arrows beside `Object` under `Any` | Tuples and `()`: both texts agree. Functions: the texts disagree (rq 218). |
| The library instantiates generics at tuples | L1 artefact | `Library/FortressLibrary.fsi:759` (`trait Generator[\E\]`, unbounded), `:1364` (`zip[\F\](...): ZeroIndexed[\(E,F)\]`); `:1290`, `:1502` (`Indexed[\E, I extends Index\]`, `Array[\E,I extends Index\]`); `:1269` (`trait Index extends Any`) | Yes for element types. Since P-156, the arrays' **index** parameter has an explicit bound `Index`, so P-42's example "arrays indexed by pairs" no longer rests on the implicit bound; element types such as `(E,F)` still do. |
| The compiled path sets `Object` | L2 | `ProjectFortress/src/com/sun/fortress/Shell.java:371-377` (`setExtendsObjectPreDesugaring(true)` in `useCompilerLibraries`), `:379-386` (false for walk) | Yes. Steele's three commits of 2012-05-28 to 05-30 (archaeology §2.2). No team text says the compiled path needs `Object` (archaeology §2.6, §5 item 2). |
| The compiled path under `Any` | L2 | `bound-any-compiled/REPORT.md` | Tuple and arrow static arguments run; `()` fails under both bounds (row 339); tracks: 12 failures in 10 tests, all test-side. |
| `java.lang.Object` is Fortress `Any` at the foreign boundary | L3 | `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:447` (`s(Object.class, anyLib, "Any")`) | Yes. No text ties Fortress `Object` to `java.lang.Object` (archaeology §3). |

### (d) The evidence since the decision

- F-289 (FACTS.md:123): under the compile command's setting the twelve give 685 errors, 580 on the bound `Object`; the zero holds only under `Any`. `reviews/phase3-exit/zero-audit.md`, Part C item 1: "No PLAN line names the step." PLAN.md's phase 4 has no such line (read).
- The bound-Any probe (above), with its two questions for him (when the flip lands; what happens to `CoercionGenericFnCompiledRungC`). No decision on them.
- `reviews/decisions-review/popl-recheck.md` §1.7: the paper confirms `Any`.

### (e) Grounds that mix layers, and grounds he was not told

- **L1→L2:** the library-route judgement (09-20) kept the compiled `Object` setting because the WD says `Object` (tenet 3, (e)).
- **He was told that nothing in the code changes** (14:02:59). The compiled path's setting is code (`Shell.java:372`), and F-289 shows its weight.
- **He was told a wrong L1 fact** on functions (13:58:02; Types `:232-236`).
- **Not told** (archaeology §4.4): the 2012 commit history of the setting, the code that reads the bound, `NamingCzar.java:447`.

### (f) What would make the tenet wrong, and what has measured it

- If the compiled run time needed `Object` for some shape. Measured for tuple and arrow arguments in the probe's shapes: no. `()` fails under either bound. Not measured: the one library compiled under `Any`; the misc track, `testSystem`, demos; a native that receives a tuple (probe, "What I could not measure").
- If the team meant `Object` as the language's rule after 2012. POPL 2019 says `Any`; Naden's theory of 2012-08-31 calls `Object` "the distinguished top type" (archaeology §1.5).

### (g) Dependencies

- Depends on: tenet 2 (POPL 2019 as the later word); tenet 3 (the switch-over ends the departure).
- Depended on by: tenet 6 (the zero's meaning, F-289); tenet 3's premise; P-48 (an unfixed parameter takes its bound, `Any` if none); P-156 (`Index extends Any`).

---

## Tenet 5. The exclusion rule and the flat number types (P-43, with F-44 to F-47)

### (a) The entries

POS.md:40:

> - P-43 **The exclusion rule stays, and the number tower is flat (route A).** The compiled checker keeps the multiple instantiation exclusion rule. So the library's numbers are flat, as the team (Chase, Ryu, Maessen and Allen) flattened the compiler prelude in 2009 and 2010. The fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. Why: the flattened prelude is the team's last record of the Fortress way, and its route leads to the POPL 2019 paper, which keeps the rule. He cares that specialised code runs fast, not how a specialisation is chosen. F-46 prices a return to route C.

FACTS.md:38:

> - F-44 **The compiled checker enforces the multiple instantiation exclusion rule and relies on it, and the one library meets the rule.** The rule: no type extends two different instantiations of one generic trait. The checker's Return Type Rule relies on it: with the rule relaxed alone, a program passes the checker and dies with `IncompatibleClassChangeError` (`OverloadingOracle.scala:81-105`; the probe `ProbeMIEPick`). F-48 gives the kinds of static argument that the rule compares. Walk applies no instantiation exclusion: it accepts a type that extends two instantiations, and its overloading check does not count them as excluding (row 416; the review's section 3). P-43 keeps the rule. Besides the flat number tower of P-43, the library meets it by three changes of `952892a00`: `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]`, no longer `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends `AnyUniqueItem` alone, no longer `Equality[\AnyMaybe\]` beside it; and `andCondCombine` chooses `andRelCond` by a `typecase`, in place of a second `ANDCOND`. So under walk, a program's `p1 ANDCOND p2` of two relational predicates, conditions built from a relation over a generator, which `filter` fuses, is no longer itself a relational predicate (row 458). The distance holds no exclusion error (F-53). Detail: `reviews/multiple-instantiation-exclusion.md` sections 1 to 3; `Library/FortressLibrary.fsi:122-124`, `:981`; `Library/FortressLibrary.fss:4883-4889`.

FACTS.md:39:

> - F-45 **Without the exclusion rule, every dispatcher would have to call its generic arms at the call site's static arguments, and no published work resolves a value that is in two instantiations of one generic under run-time dispatch.** The loader already gives a generic dispatcher the call site's static arguments; without the rule, its arms would have to use them instead of arguments read from the value (`reviews/mie-probes/scope-call-site-dispatch.md` section 3). The call at the dispatcher's static arguments is built for template dispatchers (F-136), and, by reading, not for one with an `opr` or `nat` static parameter (`compile-ladder/rung-generic-runtime/REPORT.md` section 9). The team's 2012 patents allow a self-typed generic, one that comprises exactly its parameter, at several instantiations along a chain of subtypes: the forest rule (`reviews/mie-probes/patents-forest-rule.md` section 1). Alone, the forest rule leaves the specialisation hole open: a specialised declaration, more specific than the generic one, runs for a value at a narrower level of the chain, a subtype, and returns a type that a caller typed at that narrower level does not expect. Compiled under a shadow checker with the forest rule, a patched copy of the checker that never landed, such a run dies with `IncompatibleClassChangeError`; the tree's checker refuses such a program (the same note, section 3). Route C adds a return-type rule that closes the hole (F-46). Detail: `scope-call-site-dispatch.md` section 3; `reviews/mie-probes/literature.md`, "What the field settled and what it did not".

FACTS.md:40:

> - F-46 **Route C, the patents' forest rule with a return-type rule over every level of a chain, closes the specialisation hole (F-45), but going back to a nested number tower under it needs work beyond the checker.** The library's tower was nested before route A flattened it (P-43). Built as a shadow checker on 2026-09-24 and run through the zero probe's stack on a library copy without the reduction markers, route C refuses 25 pairs at 21 of the nested tower's declarations: specialisations that a level below does not cover. Completing the tower needs seven more declarations and the identification of `Integral[\ZZ32\]` with `ZZ32`. The patents' `comprises T` on the self-typed traits licenses that identification, but it overflows the checker's stack (measured on the zero probe's copy of the checker, in the recursion of `Formula.scala` that the tree shares). A hierarchy check of its own could enforce the identification instead; none is built. Leaving route A for route C also needs: the tower nested again; the call-site fix in every dispatcher (F-136); in the code generator, a method for each middle level of a chain, whose absence, by the error text, makes such a chain die with `AbstractMethodError`; walk to accept the specialised pairs without overflowing on `comprises T`; and, for the identification, a way past the checker's overflow or the hierarchy check. Detail: `reviews/mie-probes/route-c-experiment.md` sections 2 to 5.

FACTS.md:41:

> - F-47 **The exclusion rule refuses some of the specification's own examples; in their place, a parametric object with a factory, or a widening function, runs on both paths as a user program.** The refused examples are E1 to E10 of `reviews/spec-refused-examples.md`, "What was found": among them three `where`-clause examples, the Working Draft's `Nothing`, the nested number tower and `RationalQuantity`. The `where`-clause examples stop on both paths before the rule, in name resolution, at `T is undefined`. The alternatives were measured as user programs that declare their own types: a parametric object with a factory, such as `object Empty[\T\]` with `emptyList[\E\]()`, and a widening function, such as `widen[\T, S extends T\](c: C[\S\]): C[\T\]`. The library's `Nothing[\String\]` does not yet run on the compiled path's prelude (row 331, F-167). A marker object with a `coerce` in the generic trait, as `AltEmptyCoerce` has in `SList[\T\]`, also runs compiled, and walk applies such a coercion (row 389). The 2012 `covariant` keyword passes the compiled checker and dies at run time (row 404). The compiled checker refuses a coercion with its own static parameter between two instantiations, `coerce[\S extends T\](c: C[\S\])`, as a cyclic hierarchy. Inferred from the forest rule: route C (F-46) would rescue neither the `where`-clause examples, `Nothing` nor E8, the internal appendix's "Disjunctive Constraints"; only the tower (E5) and the root `Object`'s algebra (E7) would keep their original text under it. Detail: the same note.

Linked: P-43 points to F-46; pointed to by F-44, F-131, P-26, P-95.

### (b) The grounds as recorded

**History** (HIST.md:109, :500): numbered 2026-10-13 17:58Z ("earlier texts in its POSITIONS-history.md, line 1125"); rewritten 2026-10-13 18:16Z from `reviews/exclusion-design-brief.md` §5. The text before it read: "'Agreed. Route A it is.' ... His readings while the fork was open stand: the patents' forest rule against the flattened prelude was 'the team's last record on how to do the "Fortress" way', the route culminating in the POPL 2019 paper ... and 'without specialized code there will be no change at performance. But how a specialization is chosen "ist mir egal", as long as it runs fast.'" The present "Why" sentence was written then by consolidation chunk P2. Audit P-43 §3 item 9: "Earlier four texts attach his last-record phrase to the patents' forest rule; this one attaches it to the flattened prelude. No message of his in the 30 minutes before." rq 219 and rq 220 ask him about the two "Why" sentences; he held P-43, so it is unchanged.

**His words (T-blind/001).**

- 2026-09-24T01:02:52.634Z, under "I'm not deciding yet": to Q2 ("Do you weigh the patents' forest rule, their latest text but never built, above Steele's implemented flattening of 2011? A yes points to C."): "Yes, because that was the teams last record on how to do the 'Fortress' way. From brief glance at literature.md, this path culminated in POPL 2019 paper?"; to Q3: "Only which file survives."; to Q4: "without specialized code there will be no change at performance. But how a specialization is chosen 'ist mir egal', as long as it runs fast. Which clearly isn't an answer to the question…"; to Q5: "Does that happen in the clear loader? Will JVM JIT be able to eliminate overhead?"
- 01:20:29.306Z: "I don't care about some type-theoretical reasons, such as numeric towers being expressed by sub-typing. If we get the same ergonomics for users with same economy of code reuse, we are good."
- 07:03:57.849Z: "I think I'm leaning A ... preserve the option to go the route C".
- 14:41:40.798Z: "Agreed. Route A it is." No reason given.
- Later, 2026-09-29T12:17:07.180Z: the flattening "was something we adopted from the compiler's library for performance reasons, if I recall correctly".

**What he was told before he decided (T-blind/001).**

- 01:05:02.453Z, on Q2: "A correction: the published path did not continue the forest route. POPL 2019 keeps the rule for invariant traits ... and has no self types and no numeric tower ... Your 'yes' stands as your weighting; the fact underneath it is narrower than you read it." On Q4: "Two things get called specialisation. One: the class loader stamps out a class per type argument, like C++ templates. Every route keeps that, and unboxing will build on it. Two: a hand-written special version of a generic function ... That is the shortcut; the exclusion rule exists to make it sound".
- 14:36:56.498Z, the route ask: A flattens the tower "as Steele flattened the compiler prelude in 2011"; "The checker count on the flat library goes from 103 to 22"; "Every type keeps its own specialised body"; on C: "Full C is blocked behind the checker overflow, with no scope for that fix, and needs the code generator's forwarding method, interpreter work and seven library declarations on top"; on the interpreter's coercion, "the interpreter's cost does not count by your own rule"; "My recommendation: route A."
- The brief's own weighing, `reviews/exclusion-design-brief.md:124-133`, including "So between A and C the premise leaves a judgement, not a ranking".

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| The rule, 2011 paper | L1 | `Papers/Types/exclusion.tick:141-152` | Yes. |
| The paper's reason: "easy to enforce statically ... it is already required in Java" | L3 used for L1 | `exclusion.tick:154-156`; and decidability (Kennedy and Pierce), `:158-161` | Yes: the team's own L1 text cites Java. |
| The rule, 2012 Types | L1 | Types `:355-376`, with the note "the rule we impose is stronger" (`:363`) | Yes. |
| The rule, POPL 2019 [Anc-Same-Trait]; no covariant road to a self-typed tower ([D-Method]) | L1 | `reviews/decisions-review/popl-recheck.md` §1.1 (I did not reopen the paper) | Per the recheck. |
| Naden: "blanket ... for the semantic benefits and the simplicity" | L1 | `justificationOfRTR.tex:496-497` | Yes. |
| WD: a trait may "extend other instantiations of themselves" | L1 (against) | WD `basic/trait-parameters.tex:339-345` | Yes; 2009 text (spec-sentences-dated item 2). |
| WD: the numeric types "are mutually exclusive" | L1 (for flat) | WD `basic/types-vals-vars.tex:502`; Types keeps it (`:977-980` per the judgement) | Yes. Not cited by the route-A brief (`reviews/decisions-review/judgement.md`, D4). |
| WD library chapters: ℤ a subtype of ℚ | L1 (for nested) | WD `basic-lib/basic-integers.tex:28-29`, `:195-196` | Yes. |
| The team's interpreter library nested to 2012 | L1 artefact (for nested) | `a874948ac:Library/FortressLibrary.fsi:461`, `:495` | Yes. |
| The prelude flattened 2009-2010 | L2 | `6896886fb` (a code-generator commit; no reason stated); `128f313b5` ("[libraries, codegen]") | The commits do the flattening; they give no reason. |
| The checker relies on the rule | L2 | F-44 (`OverloadingOracle.scala:81-105`; `IncompatibleClassChangeError` when relaxed) | Per the record. |
| The JVM type mapping relies on the rule | L2 | `Papers/Implementation/TypeMapping.tex:125` (Chase, 2012-05-21): "The transitive closure of the extends lists ... cannot mention the same generic stem with different parameters more than once, so the number of types generated for each instantiation is proportional to the size of the closure ...; the type created by classloader template expansion, looks like a Java type, and the type relationships carry over." | Yes. The record's exclusion notes do not cite this line (grep over `explorations/` finds `TypeMapping.tex` only in the map, the nat plan and the bound archaeology). |
| Route C's price | L2 (mostly) | F-46: the checker's stack overflow in `Formula.scala`; a code-generator method per middle level (`AbstractMethodError`); walk's overflow on `comprises T` | Per the record. |
| Java: no class implements two parameterizations of one interface | L3 | `reviews/multiple-instantiation-exclusion.md:58` (JLS §8.1.5); the coordinator's 09-23T07:10:43 | Per the record; general knowledge, not a team text. |

### (d) The evidence since the decision

- `reviews/decisions-review/judgement.md`, D4: "faithful to the designers' latest implemented word, and justified", with the reasons listed there, and the note that the brief did not cite "mutually exclusive". Costs: row 434 (`Number`'s `=` not transitive); 89 team test lines respelled; 21 of 24 demos with an unwritten clause-form sum fail.
- `reviews/decisions-review/popl-recheck.md` §1.1: confirms the rule and the flattening; variance cannot rescue the tower.
- `reviews/type-decisions-review/judgement.md`, V5: route A stands; "The record's reason sentences in P-43 are not his words (rq 219, 220), which is a record question, not a defect of the decision."
- rq 219, rq 220 open.

### (e) Grounds that mix layers, and grounds he was not told

- **L2→L1 in P-43's "Why".** "The flattened prelude is the team's last record of the Fortress way" takes the shape of the compiled path's bootstrap library (L2) as the language's position (L1). The ruling he received four days earlier framed that library as "what they could do behind the JVM wall" (tenet 3, (b)). His phrase "the teams last record" was about the forest rule (rq 219).
- **L1 paper used for an L2 library's shape.** "Its route leads to the POPL 2019 paper": the paper keeps the rule and has no numbers and no tower (popl-recheck §1.1). The coordinator told him on 09-24 that "the fact underneath it is narrower than you read it".
- **Two layers in one word.** "He cares that specialised code runs fast, not how a specialisation is chosen" joins L1 specialisation (an overload chosen at run time) and L2 specialisation (a class per instantiation). He was told the two apart at 01:05:02, with "unboxing will build on" the class loader's stamping; the array design of 2026-09-19 had found that stamping cannot give a `double[]` field (tenet 7).
- **L2 limits used against an L1 shape.** Route C was set aside partly on the checker's overflow and code-generator work (14:36:56; F-46).
- **L2 reliance on the rule not on record or told:** `TypeMapping.tex:125`.
- **Not told:** that `6896886fb` is a code-generator commit, in which the hand-written run-time classes `FZZ32` and `FRR64` were made to implement the generated trait interfaces (`git show 6896886fb -- ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/`); the WD's "mutually exclusive" sentence (absent from the route-A brief); the right authors (he was told "Steele, 2011").

### (f) What would make the tenet wrong, and what has measured it

- **The rule.** If the compiled path did not need the rule and the language did not mean it. Against that: F-44's `IncompatibleClassChangeError` (measured), `TypeMapping.tex:125` (read), the 2011, 2012 and 2019 texts (L1).
- **The flat types.** If the 2009 flattening was a JVM bootstrap measure, not the type group's language position, P-43's stated reason falls; the L1 grounds for a flat tower (the WD's "mutually exclusive", Types, Steele 2016) stay. Nothing on record measures or states why the prelude was flattened (section "What I could not find").
- **Route C** stays open at F-46's price (P-95). Its checker half was measured as a shadow; its code-generator and walk halves were not built.

### (g) Dependencies

- Depends on: tenet 2 (its "Why"), tenet 3 ("Only which file survives" kept route A possible), tenet 1 (P-8, "runs fast").
- Depended on by: P-44, P-47, P-74, P-76, P-78, P-80, P-146, P-153, P-157 (type-decisions-review evidence, P-43); tenet 9 (walk's run-time coercion is route A's price, P-59); tenet 7 (`RR64` a sibling with concrete static types, where unboxing by static type would apply).

---

## Tenet 6. The phase order (P-33)

### (a) The entry

POS.md:30:

> - P-33 **The work toward microGPT compiled follows the phases, in the order that the curator approved.** These phases are steps of the work, not the compiler's phases, and they are numbered 3 to 6, after two earlier ones. Phase 3, the compiled checker reports no error on the interpreter's whole library (the distance to the switch-over at zero; F-53 defines it and holds its value); phase 4, the switch-over, first the natives, the library's `builtinPrimitive` bindings made to run on the compiled path, then the compiled path reads the interpreter's library and the compiler's prelude is deleted; phase 5, microGPT compiles: its static types, the array design and the code generator's open gaps; phase 6, microGPT runs fast. Code-generator work goes on beside that order, under either library (P-37). Row 320, an api implemented by a component of another name does not link, is part of the switch-over's design.

Linked: F-53 (FACTS.md:47), P-37.

### (b) The grounds as recorded

- **History** (HIST.md:81, :726, :966, :1546, :1952, :2204, :2552, :2930). Its source is his "Yes, this order and workers are go." of 2026-09-26T09:04:41.396Z, answering the coordinator's 08:40:51.388Z, after his request of 08:20:06.663Z. The present text was applied at 2026-10-22 22:14Z "at the curator's word of 22:12 UTC on 2026-10-22, 'apply all the improvements drafted', without his review of each change".
- **His words.** 08:20:06.663Z (T-blind/001): "I need you to help me as executive assistant to, to get a good hold on all open issues and organize them into optimal order so that we can get to the running compiler." 2026-09-27T06:13:29.788Z: reviews may yield batches before phase 3. 2026-10-24T11:36:23.562Z: phase 3 was "driving the checker to the state where we can now type check the full interpreter's library ... we should reassess our plan and not rush into the next phase yet". 2026-10-26T04:47:50.485Z, to the coordinator's "The plan never meant to include them, so the word 'whole' is wrong": "Of course. ... Before final decision, we need to discuss this and solidify our goal alignment."
- **What he was told,** 08:40:51.388Z: the six phases; "The routes are all decided. What remains is building them"; W1 "measures, on shadow copies, how far the switch-over really is". Phase 4 was not designed (PLAN.md:83, "Not yet designed as briefs").

### (c) The grounds by layer

The order is a work plan. Its premises, by layer:

| Premise | Layer | Source | Checked |
|---|---|---|---|
| The checker's zero comes before the switch-over | L2 (checker), for an L1 rule (Fortress is "statically typed", WD `philosophy.tex:14`) | P-33; F-53 | Yes. |
| The checker's zero carries most of the code generator | L2 | `reviews/decisions-review/judgement.md`, omission 1: "so the checker's zero carries most of that half with it" (on the 2026-09-27 count) | Stated as a reading then. |
| The natives first in phase 4 | L3 | P-58; PLAN.md phase 4 | Yes. |
| The array design after the switch-over (phase 5) | L2 store, L1 sizes | P-85; PLAN.md phase 5 | Yes; P-85 adds "The whole preparation for the array work is to be done before the switch-over". |
| Unboxing last (phase 6) | L2 | PLAN.md phase 6 | Yes. |
| Phase 3's goal is "the interpreter's whole library" | L1 artefact | P-33 against F-53 (twelve components) and F-290 (40 others) | The text says "whole"; the measure covers twelve. |

### (d) The evidence since the decision

- `reviews/phase3-exit/judgement.md` §1 item 6: "Phase 3 is done by P-33's letter, and its exit is to be restated. The zero is the twelve prelude components under the bound `Any`, not 'the interpreter's whole library'. The switch-over's own zero ... is wider: the thirteen with `List`'s two imports, the 9 operator headers matched, row 816 read the team's way, under the compile command's own setting (P-42's flip)."
- F-289: the zero holds only under the bound `Any`; no PLAN step for the flip.
- F-34: 52 code-generator refusals on declarations the checker passes. So the checker's zero did not carry those.
- The two side tracks he approved on 2026-09-29T14:18:19.202Z ("Yeah, go, go ahead"): the natives' shape probe (`perf-probes/prelude/natives-shape.md`) and the array questions (`reviews/array-design-ways.md`).
- The coordinator's question 2 of 2026-10-26T04:31:43.673Z (is phase 3 done, with its goal restated) waits for his answer.

### (e) Grounds that mix layers, and grounds he was not told

- **L2 gate for L1 and L2 goals.** The order puts the checker (L2) first on the premise that it is the main obstacle; the code generator and the run time (L2) come after, unmeasured at approval.
- **"Whole library"** names the L1 artefact; the measure (F-53) covers twelve components. He read phase 3 as the full library on 10-24.
- **Not told at approval:** that phase 4 had no design and its code-generation half was unmeasured (W1 was launched to measure it after the yes).

### (f) What would make the tenet wrong, and what has measured it

- If a later phase forces changes into an earlier phase's result. Measured cases: P-42's flip changes the zero's meaning (F-289, 685); code generation stands at 52 walls after the zero (F-34). Not measured: whether the array design's decision A (phase 5) needs changes to the library's generic array traits that phase 3 checked; whether unboxing by static type (phase 6) needs more static information than the checker gives.

### (g) Dependencies

- Depends on: tenet 3 (it carries out P-37), tenet 4 (the zero's setting), tenet 8 (phase 4's first step), tenet 7 (phases 5 and 6), tenet 9 (PLAN's Q-walk sits in phase 4).
- Depended on by: the batches.

---

## Tenet 7. Unboxed doubles and `double[]` arrays (P-17, P-84), on the compiled path's template classes

### (a) The entries

POS.md:16:

> - P-17 **Unboxed doubles and arrays of unboxed doubles are required: without them the revival misses its point.** Why: a language meant for high performance cannot box its numbers. Today the code generator boxes every number: an `RR64` value is an object of the class `FRR64`. In Java models of microGPT's three array kernels, the dot product, the matrix product and the row lift, boxing is the main cost (F-11 holds the measurement). How arrays store doubles, as `double[]`, is P-84's decision.

POS.md:92:

> - P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** Why: a high-performance language cannot box its array elements, and the sizes are central to the team's design. So the storage and the sizes are one design: the sizes stay in the array types as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks them. The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected. Both halves follow the library's own patterns (P-27, the library's own practice is the standard). The compiled checker checks `nat` static parameters (F-67). The compiled path's `double[]` store waits with the other array decisions until after the switch-over; among them is decision A, how an `RR64` array made through the library's generic array traits gets that store (P-85).

Linked: F-11 (FACTS.md:9), P-27 (POS.md:25), F-67 (FACTS.md:61), P-85 (POS.md:93).

### (b) The grounds as recorded

- **History of P-17** (HIST.md:37, :666, :1510, :1920, :2162, :2534). Sources (audit block of 2026-10-22 08:30Z): 2026-09-15T10:42:06.544Z; 2026-09-15T22:34:55.554Z (his request for a fairer test, which the kernels probe answered); 2026-09-19T18:32:48.384Z.
- **History of P-84** (HIST.md:249, :846, :2092, :2438, :2792, :3014). Sources: 2026-09-19T18:32:48.384Z, answering the coordinator's 18:24:23.475Z (questions 1 and 4 of `coordinator/array-design.md`); 18:31:44.057Z (the library's patterns, now P-27). The present text was applied at 2026-10-22 22:14Z without his review of each change.
- **His words.** 2026-09-15T10:42:06.544Z (T-old): "why is the compiler just a 10 times faster than the interpreter? ... the fucking shit is using box types everywhere for the numerics. ... not to box the doubles but have an array of doubles so that something usable can come out of this at runtime which the JVM compiler would be able to optimize ... Like it is a an academic toy language without being able to run fast on even the JVM." 2026-09-19T18:32:48.384Z (T-blind/000): "And for the arrays, like I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using. And yes, we must go to double array for performance. There is again no question about this. If this should have been high performance language, it cannot be boxed." 2026-09-20T14:27:53.739Z: "I can overrule that. by saying that high-performance language that doesn't use native array representation on the JVM cannot be high-performance." 2026-09-20T14:48:08.960Z: "the standard Fortress library must provide fast numerical computation and this necessitated limiting the contents of ... arrays vectors matrices to numerics so that they can like implement fast native double arrays in the end".
- **What he was told.**
  - 2026-09-15T10:45:07.996Z (T-old): "that boxing is the cause of the ceiling is an inference from `repo-internals.md`".
  - The boxing probe (`perf-probes/boxing/REPORT.md`, head): in the scalar loop, boxing "accounts for 2% of that gap"; the kernels probe then measured Java models of the kernels (F-11).
  - 2026-09-19T18:24:23.475Z (T-blind/000): Q1 "Storage: boxed objects or Java `double[]`? Default `double[]`. A probe showed that a generic type stamped out at class-load time can never later be made unboxed, so this cannot be retrofitted"; "stamping only renames a type parameter, so no generic instance can hold a `double[]`".
  - 2026-09-20T14:28:17.365Z: "unboxed `double[]` and sizes in the type are the specification's own shape, and the team left breadcrumbs pointing that way"; "How `double[]` gets under the generic array. The design's default, a factory choosing the store at run time, is refused by the checker. The routes left are both Java: specialising in the class loader, the team's own direction, or one storing object per element type."
  - 2026-09-20T14:34:56.912Z: "Recorded as your leans, to confirm: for the unboxed store, the team's own direction, the class loader, unless a clear reason appears". I found no POSITIONS entry that holds this lean (searched POS at `3e85b709c` and HIST at `a74f5a2b7` for "class loader").
  - 2026-09-24T01:05:02.453Z (T-blind/001): "the class loader stamps out a class per type argument ... Every route keeps that, and unboxing will build on it."

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| Fortress is meant for high performance | L1 aim | WD `preliminaries/intro/philosophy.tex:17`, `:34` | Yes. It says nothing on representation. |
| Floats are value objects that "an implementation may freely copy" | L1 | WD `basic/objects.tex:22-43` (`:38`) | Yes. P-17 does not cite it. |
| A `LinearSequence` of a value type "describes a sequence of 'unboxed' values" | L1 | WD `advanced-lib/binary.tex:76-82` (`:80`) | Yes. Not cited in the array notes (`array-design.md`, `array-design-review.md`, `array-design-ways.md`). |
| Jan's note: a fixed-bounds array is not unboxed; "Unboxed arrays are a different other thing" | L1 (internal note) | WD `appendices/future.tex:42` | Yes. The review reads it as: the store under a sized array is what is unboxed (`array-design-review.md`, Minor 11). |
| A value in an array of `Object` is boxed | L1 | WD `basic/dimensions.tex:238-247` | Yes. |
| The library's arrays carry `nat` sizes | L1 artefact | `Library/FortressLibrary.fss:2534` (`trait Vector[\T ..., nat s0\]`), `:2557-2558` (`mem: PrimitiveArray[\T,s0\]`); WD `basic/trait-parameters.tex:82` ("These parameters are instantiated at runtime with numeric values.") | Yes. |
| The team's own unboxed `RR64` store | L1 artefact / walk | `ProjectFortress/LibraryBuiltin/NativeArray.fss:43` (`object PrimImmutableRR64Array[\nat s0\]()`), over walk glue | Yes; nothing selects it (`array-design-ways.md` §3). |
| The code generator boxes every number | L2 | F-11 | Yes. |
| Boxing is the main cost on the kernels | L2, in Java models | F-11; row 306: boxing 6.3×, 6.5×, 2.6× over `double[]`; the generic array object "adds only 9 %, 1.6 % and 4.8 %" | Yes, in Java models over the run time's box shape. No Fortress kernel compiles (row 305). |
| Stamping renames; no generic instance holds a `double[]` | L2 | `coordinator/array-design.md` §2 (probe 1: `LT;` becomes `LFRR64;`; "`[D` is not a class name"); `Papers/Implementation/MethodMapping.tex:134` | Yes. |
| The team's direction for unboxing | L2 | `ProjectFortress/src/com/sun/fortress/compiler/optimization/Unbox.java:21-27` ("1) primitive. ZZ{8,16,32,64}, RR{32,64}, Boolean ... 3) unboxed fields"); `runtimeSystem/InstantiatingClassloader.java:168-172` (`if (false) { // Here will go all the magic expando-stuff.`) | Yes, as a plan referenced by nothing. |
| An unboxed store alone buys nothing | L2 | `reviews/array-design-review.md`, Serious 4: dot product 8.9× primitive with a `double[]` through a boxing accessor, against 6.4× boxed | Yes, measured in Java. |
| The library's selection device works with `cast` | L2 | F-159; `array-design-ways.md` §3 (`WayACast`, `WayACastSized`) | Yes, on toy traits, both paths. |
| A native helper cannot take a Java array | L3 | F-183 ("the wrapper generator skips such methods") | Yes. |
| A Java `double` is Fortress `RR64` at the foreign boundary | L3 | `NamingCzar.java:444-446` | Yes. |

### (d) The evidence since the decision

- `reviews/decisions-review/judgement.md`, D2: "faithful to the design, which put sizes in types and intended unboxing, and never built either on the compiled path"; omission 3: "Decision A, the mechanism under `double[]` ... No design, no probe since. On the path, and it is the 'fast' half of the goal."
- `reviews/array-design-ways.md` (2026-09-29): five ways A1 to A5; A1 and A2 measured on toy shapes; A4, the loader way, "nothing of it exists and no probe has been run".
- P-85: the three questions open, no default; decision A after the switch-over. rq 229 asks whether the third question still waits.
- F-32: `NativeArray` waits for decision A.

### (e) Grounds that mix layers, and grounds he was not told

- **L1→L2.** P-17's "Why: a language meant for high performance cannot box its numbers" takes the L1 aim as the reason for an L2 representation rule. His own words frame it on the JVM ("on even the JVM"; "native array representation on the JVM").
- **An L2 measure in Java models.** F-11's numbers are Java programs over the run time's box shape, not compiled Fortress.
- **L1 overstated for an L2 choice.** On 09-20 he was told "unboxed `double[]` ... is the specification's own shape". `array-design.md` §5 says "Nothing in the prose says boxed or unboxed"; the review's breadcrumb (`future.tex:42`) puts unboxing in the store under a sized array.
- **Two statements on stamping.** On 09-19 he was told stamping "only renames", so no generic instance can hold a `double[]`. On 09-24 he was told "unboxing will build on" stamping. The class loader's way (A4) is unmeasured.
- **L1 grounds not used or told:** `binary.tex:76-82` (`LinearSequence` of value types is unboxed) and `objects.tex:38` (value objects may be freely copied).
- **His class-loader lean of 09-20** was "recorded as your leans, to confirm" and is in no entry.
- **P-84 joins L1 and L2 as "one design":** the sizes in the types (L1) and the `double[]` store (L2), whose mechanism under the template classes is open (decision A).

### (f) What would make the tenet wrong, and what has measured it

- If boxing is not the main cost on compiled microGPT. Measured only in Java models (F-11) and in a scalar loop (boxing 2% of that gap). No compiled kernel exists.
- If no mechanism puts `double[]` under the generic traits within the class loader's template classes at an acceptable cost. A1 and A2 were measured on toy traits; A4 was not probed.
- If the store helps nothing without unboxed traffic (measured in Java: it does not) and decision B, unboxing by static type, is the larger piece (PLAN phase 6; `array-design-review.md`, decision B).

### (g) Dependencies

- Depends on: tenet 1 (fast), tenet 3 (the arrays reach the compiled path with the one library, F-11), tenet 6 (phases 5 and 6), tenet 5 (`RR64` a flat sibling).
- Depended on by: P-85 and decisions A, B, D; tenet 8 (`NativeArray`'s natives wait for decision A).

---

## Tenet 8. The natives' form (P-58)

### (a) The entry

POS.md:55:

> - P-58 **Every native binding is a `builtinPrimitive` call naming a static helper.** A native binding is a library body that is exactly `builtinPrimitive("…")`, the library's own form, and it keeps that form. Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of a glue class of walk, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper. The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over. The other form, `import java` declarations written in the library itself, is not taken. Every binding still names a glue class. Row 796: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`.

Linked: F-32 (FACTS.md:27); pointed to by F-180 (FACTS.md:236).

### (b) The grounds as recorded

- **History** (HIST.md:169, :597, :1630, :1786, :2028, :2300, :2660, :2978). The first text (2026-10-10, `046207371`) gave the reasons: "the library's practice for all its bindings, and the form the specification prints in the builtins api". Source: his "Item 35, agreed with recommendation, option 1." of 2026-10-10T05:27:34.812Z (T-now), answering the coordinator's 00:17:43.858Z. The present text was applied at 2026-10-22 22:14Z without his review of each change.
- **His words.** 2026-10-09T23:12:54.624Z: "Item 35: I have no intuition for deciding between the two forms. Fable helps decide or we run smash bonded prototype to choose based on data?" 2026-10-22T22:02:17.752Z: "I don't recall my decision asking for static methods so I am unable to make fully informed decision from this fragment." 2026-10-24T11:36:23.562Z: "the walk will end up calling the same static Java methods that we will be compiling in the compiler path. Is this the correct understanding?" The coordinator answered at 11:41:16.444Z: "Your understanding is correct." I found no later message of his on the natives (searched T-now to 2026-10-26T07:00).
- **What he was told.** The write-up `reviews/item35-natives-binding.md`, "Why 1": "The library binds all 424 natives this way"; "The specification prints `builtinPrimitive`'s declaration and has no `import java`"; "Under 1 the type checker reads today's text until the switch-over, so the distance cannot move from this work." The probe's report at 00:17:43.858Z: "Form 1 doesn't avoid checking the natives; it only decides *when* the checking starts"; option 3, "the compiler library's form, which the specification doesn't have".

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| The specification prints `builtinPrimitive` | L1 by inclusion; its text is an L2 statement | WD `library/default-libraries.tex:35-39` includes the generated builtins api; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`: "The %builtinPrimitive% function is actually recognized as a special piece of built-in magic by the Fortress interpreter. The %javaClass% argument names a Java Class which is a subclass of `com.sun.fortress.interpreter.glue.NativeApp`" | The specification prints it only as part of the library api, and the comment describes walk's mechanism. No WD `.tex` file names `builtinPrimitive` (grep). |
| The specification has no `import java` | L1 | grep over the WD: none; "foreign function interface" is a proposal, WD `appendices/future.tex:675` | Yes. The language has no foreign-function interface. |
| The library binds every native this way | L1 artefact (P-27) | F-32; row 796 (`git grep` prints 412 one-line bindings, all to `com.sun.fortress.interpreter`) | Yes. |
| Walk loads the string as a glue class only | L2 | row 796 (`interpreter/glue/NativeApp.java:164`, `:196`) | Per the row, by reading. |
| The compiled path has no counterpart | L2 | row 309 | Yes. |
| The compiled rewrite costs one rung | L2 | `perf-probes/prelude/natives-binding-probe.md`, "The answers" 1: 116 lines and two hooks in `Parser.java`; five shapes ran | Measured as a shadow. |
| Walk parses through the same repository | L2 | the same note: "a landed switch must keep walk off" | Yes. |
| Helpers take plain Java values; the foreign-type table | L3 | F-32; `coordinator/map/modules-and-phases.md` §B.12 | Yes. |
| A helper raises a compiled prelude class; 50 helper parameters or results are compiled-path classes | L3 | F-180 (`fortress.CompilerBuiltin$IntegerOverflow`; `FZZ32Vector`, `CompilerBuiltin$IntLiteral`) | Yes, by reading and probe. |
| A helper cannot take a Java array | L3 | F-183 | Yes. |
| The split's stated reason was Java imports | L3 | `WellKnownNames.java:115` | Yes (tenet 3). |

### (d) The evidence since the decision

- `reviews/phase3-exit/decisions-evidence.md` §4, P-58: "Never judged"; "**Marks:** [not followed] (10-22)".
- `reviews/phase3-exit/judgement.md` §1 item 5: "Before it starts he owes two words: the informed yes to P-58, which he said on 10-22 he did not recall, and the call that phase 3 is done". I found no such yes.
- `reviews/phase3-exit/zero-audit.md`, Part C item 3: 449 live bindings; the checker reads none until climb batch 23's rung C.
- Climb batch 23 (`coordinator/CLIMB-BATCH-23.md`) is held.

### (e) Grounds that mix layers, and grounds he was not told

- **L1 by inclusion, for an L3 choice.** "The specification prints `builtinPrimitive`'s declaration" is true only through the included library api, whose comment states an interpreter mechanism (L2). The ground is used for a choice of binding form between Fortress and Java (L3).
- **An L2 measure convenience.** "The distance cannot move from this work" was weakened by the probe: "Way 1 does not keep the natives away from the checker; it only chooses when the checker reads them" (`natives-binding-probe.md`, answer 3).
- **Told in the write-up:** the raise translation and "the same renaming on the switch-over day" (`item35-natives-binding.md:12`, `:88`). He said he had "no intuition" and asked for data; the probe gave data on the compiled half.

### (f) What would make the tenet wrong, and what has measured it

- If walk cannot take helpers whose parameters or raises are compiled-path classes (F-180: by reading, 50 such); if helpers cannot carry arrays (F-183), so that `NativeArray` needs another form; if the parse-time rewrite cannot be kept off walk. Measured: both halves as shadows on small shapes (`natives-binding-probe.md`; `natives-shape.md` §1). Not measured: the library's methods under walk's loader (`item35-natives-binding.md:64`, "methods, where most bindings sit, were not run under it").

### (g) Dependencies

- Depends on: tenet 3 (one library), tenet 6 (phase 4's first step).
- Depended on by: tenet 9 (after the switch-over walk calls the same helpers); tenet 7 (`NativeArray` waits for decision A).

---

## Tenet 9. Walk runs the checker after the switch-over (P-12, with P-59)

### (a) The entries

POS.md:12:

> - P-12 **After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts.** The curator wants the checker usable on the programs that walk runs. Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs (F-9 holds this fact). Walk is not changed for this before the switch-over. After it, walk runs the checker on its programs and so gains their static types. Walk then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59, walk's choice of coercions until the switch-over).

POS.md:56:

> - P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** Walk has no static types. So where a coercion is needed, walk chooses it by the value's run-time type. The specification and the compiled path choose it by the static type. The curator accepts this as the interpreter's limit, and walk is not changed for it before the switch-over. A callout in the coercion chapter (`Specification/basic/conversions-coercions.tex`) states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC`, the chapter's own printed example, and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12 orders the two steps), it uses the static coercions that the checker inserts. MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so on microGPT walk's choice and the static choice agree.

Linked: F-9 (FACTS.md:8), F-128 (FACTS.md:159).

### (b) The grounds as recorded

- **History of P-12** (HIST.md:29, :654, :1498, :1858, :1916, :2528). The audit dropped "sees it as low-hanging fruit" "as a premise false today". Sources: 2026-09-29T14:07:20.452Z; 2026-09-15T10:42:06.544Z; 2026-09-08T21:16:25.193Z.
- **History of P-59** (HIST.md:173, :604, :1792, :2032, :2306, :2666). The noted block: the coordinator's 2026-09-29T14:08:16.691Z "is the source of 'takes the static coercions that the checker inserts', and he did not take it up"; "'MicroGPT's static types are concrete, so both paths agree on it' is the coordinator's premise ... nothing has measured it". rq 221 is open.
- **His words.** 2026-09-08T21:16:25.193Z (T-old): "why not use type checking in the interpreter?" 2026-09-15T10:42:06.544Z (T-old): "one of the lower hanging fruit is to run the type checker optionally in, in the walk. Am I missing this?" 2026-09-29T14:07:20.452Z (T-blind/002): "item seven as recommended. So one now and two after the switch. ... we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch. Am I missing anything?"
- **What he was told.** 2026-09-15T10:45:07.996Z (T-old): "Making the checker usable on interpreter programs means giving it the interpreter's prelude". The review's item 7 (`reviews/decisions-review/judgement.md:354-360`): option 2, "Make walk match: needs static types under walk, which is the checker on interpreter programs, after the switch-over." 2026-09-29T14:08:16.691Z: "running the checker on interpreter programs gives walk the types, but walk won't use them by itself. ... Walk then has to take those inserted coercions ... That's a small change of its own ... MicroGPT's types are concrete, so both paths give it the same answers." 2026-10-26T05:00:01.310Z (T-now): "So the other 40 components do not block the switch-over. They block P-12's step, where walk runs the checker."

### (c) The grounds by layer, checked at the source

| Ground | Layer | Source opened | Does it say so? |
|---|---|---|---|
| Fortress is statically typed | L1 | WD `philosophy.tex:14` | Yes. |
| The coercion is chosen statically | L1 | Spec `basic/conversions-coercions.tex:44-50`; callout `revival-coercion-walk`, `:666-677` | Yes. |
| Walk has no static types | L2 | `Shell.java:420-424` (`walk`: `useInterpreterLibraries()`, `setScala(false)`, interpreter phase order; no `setTypeChecking`); `compiler/StaticChecker.java:166` (the check runs only if type checking is on) | Yes. |
| Walk's phase list holds the checker | L2 | `compiler/phases/PhaseOrder.java:125-130` (`interpreterPhaseOrder` lists `TYPECHECK`) | Yes. |
| Walk cannot run the checker as it is set | L2 | `StaticChecker.java:228-229`: with Scala off, "The Java version of the type checker is gone now." | Yes: walk would need the Scala checker switched on. |
| The checker inserts coercions into the tree | L2 | `ProjectFortress/astgen/Fortress.ast:933-968` (`CoercionInvocation` and its kinds); used in `scala_src/typechecker/` | Yes. |
| Walk can use the inserted coercions | L2 | `grep -rl CoercionInvocation ProjectFortress/src/com/sun/fortress/interpreter` finds no file | By reading, walk has no case for these nodes. Not built. |
| `fortress typecheck` checks against the compiler's prelude | L2 | F-9; row 69 | Yes. |
| MicroGPT's static types are concrete | L1 (the model) | the coordinator's premise; rq 221 | Not measured. |

### (d) The evidence since the decision

- F-290: 624 component errors in 30 of the library's 40 other components. A walk program that imports them would meet them once walk runs the checker.
- `reviews/decisions-review/popl-recheck.md` §1.11: walk "cannot implement the designers' last model of dispatch either", which needs the static types of calls at run time.
- `reviews/type-decisions-review/judgement.md`, V3: row 774's walk half should wait for P-12 or row 364.
- PLAN.md phase 4, "Q-walk": the walk half of the numeral switch waits for the batch that gives walk the checker's static types.

### (e) Grounds that mix layers, and grounds he was not told

- **An L2 plan for an L1 rule.** P-12 brings walk (L2) to the language's static coercion (L1) by running the compiled path's checker (L2). Walk would then take the checker's known departures (open checker rows such as 470 and 731) as its own.
- **"Low-hanging fruit" (his 09-15 words) was a premise found false** (the audit).
- **Not told:** that walk runs with Scala off and the Java checker is gone (`StaticChecker.java:228-229`); that walk has no case for `CoercionInvocation`; the breadth of the library outside the twelve (until 2026-10-26).

### (f) What would make the tenet wrong, and what has measured it

- If the checker cannot run over walk's programs at the needed breadth (F-290); if walk's use of checker-inserted nodes is a large change, not "a small change of its own"; if the checker refuses programs that walk runs today (row 731: "the team demos are refused by the checker, and so are user programs that omit the argument", `reviews/phase3-exit/zero-audit.md`, Part C item 10); if P-59's premise fails on microGPT. None of this is measured. P-59's premise can be measured only when microGPT compiles.

### (g) Dependencies

- Depends on: tenet 3 (the checker accepts the interpreter's library), tenet 5 (walk's run-time coercion is route A's price), tenet 6 (after the switch-over), tenet 8 (shared helpers).
- Depended on by: P-76's walk half, row 774's walk half, PLAN's Q-walk.

---

## The dependencies among the tenets

| Tenet | Depends on | Depended on by |
|---|---|---|
| 1. Goal and measure (P-7, P-8) | — | all |
| 2. Later word (P-26) | 1 | 4 (POPL 2019 in the callout), 5 (P-43's "Why"), and P-44, P-48, P-152 to P-154, P-158 |
| 3. One library (P-37) | 1; 2 weakly | 4, 5, 6, 7, 8, 9 |
| 4. Bound `Any` (P-42) | 2, 3 | 6 (F-289), 3's premise, P-48, P-156 |
| 5. Exclusion and flat numbers (P-43) | 1 (P-8), 2, 3 | 7, 9 (P-59), and P-44, P-47, P-74, P-76, P-78, P-80, P-146, P-153, P-157 |
| 6. Phase order (P-33) | 3, 4, 7, 8, 9 | the batches |
| 7. Unboxed doubles (P-17, P-84) | 1, 3, 5, 6 | P-85, decisions A, B, D; 8 (`NativeArray`) |
| 8. Natives' form (P-58) | 3, 6 | 9, 7 |
| 9. Walk runs the checker (P-12, P-59) | 3, 5, 6, 8 | P-76, row 774, Q-walk |

Points where the grounds of two tenets pull against each other:

- **Tenet 3 against tenet 5, on what the compiler prelude is.** The ruling behind P-37 (2026-09-20T15:03:24.261Z) called the prelude "a record of what they could do behind the JVM wall, not a position to overrule" (L2). P-43's "Why" calls the flattened prelude "the team's last record of the Fortress way" (L1). P-37's sentence "the one library may take a design of the prelude's, as it took the prelude's flat shape" joins the two.
- **Tenet 2's "later" against tenet 5's dates.** The flattening (2009) is earlier than the WD's last edit (2010-12) and its "mutually exclusive" sentence, and the interpreter's nested library lasted to 2012.
- **Tenet 5 against tenet 7, on stamping.** He was told on 2026-09-24 that unboxing would build on the class loader's stamping; on 2026-09-19 he was told that stamping cannot give a `double[]` field.
- **Tenet 3 against tenet 9.** P-37 settles the twelve components for the switch-over (F-53). P-12's step needs the components walk's programs import (F-290).
- **Tenet 4 against tenet 6.** P-42 says the switch-over ends the compiled path's `Object` setting; P-33's phase 4 and PLAN name no step for it (F-289).
- **Tenet 6's word "whole" against tenet 3's scope.** P-33 says "the interpreter's whole library"; the measure covers twelve; his goal of 2026-10-26 says "the fuller Fortress library".

---

## What I could not find

1. **Why the team flattened the compiler prelude in 2009.** `6896886fb`'s message states no reason. The commit is a code-generator commit that also made the run-time classes `FZZ32`, `FRR64` and `FRR32` implement the generated trait interfaces. `116e5e6fa` (2009-08-21, "ZZ32 and RR64 arithmetic can't be commingled at all at the moment", per `reviews/flattening-questions-ways.md:529-530`) is an implementation limit. No team text says whether the flattening was a language position or a JVM measure. The record does not ask.
2. **A compiled run of any part of the interpreter's library.** Code generation was run per declaration with failures caught (F-34); no emitted class was loaded or run. The bound-Any probe used toy shapes.
3. **A team text that ranks the interpreter's library against the compiler prelude as the statement of the language.** The record found none (`two-libraries.md` §1).
4. **A record decision that defines "later"** (texts against code; date against "implementation-informed"). P-26 and the skill's `exploring.md:16-22` list examples, and they name "specialization kept" in different layers.
5. **His reason for route A in his own words.** He gave none at 14:41:40 (rq 219).
6. **His informed yes to P-58** after his 2026-10-22 message. None found to 2026-10-26T07:00.
7. **A recorded entry for his 2026-09-20 class-loader lean** on the unboxed store.
8. **A measurement of the class loader's way to a `double[]` store** (way A4). None.
9. **Any measurement of walk running the checker**, or of walk evaluating checker-inserted `CoercionInvocation` nodes. None; by reading, walk has no case for them.
10. **A pure-Java microGPT** (P-7's baseline). Not written.
11. **A ledger row for the tuple-domain dotted-method defect** of the bound-Any probe. None yet.
12. **The dates of Welterweight and of `Library/incomplete/`** (their first commit in git is the root snapshot `5a68404fd`), and **who composed the WD's `Object` sentence** (bound-archaeology §5).
13. **Whether the team meant the compiled `Object` bound as a JVM need** (bound-archaeology §5 items 2 and 4).
