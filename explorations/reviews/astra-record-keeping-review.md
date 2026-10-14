# Fortress record-keeping review: handover to Fable

Date: 14 October 2026. Reviewer: Astra. Reviewed repository: `palimondo/fortress`, checkout fast-forwarded from `main` to `06448ebf2`. Findings below concern that snapshot; check later changes before applying them.

This handover preserves the findings, explanations, and proposed skill refinements from the discussion with Pavol. It is a consolidated account, not a session transcript. Section 4 preserves the complete actionable-takeaway response that Pavol wanted to forward, including its preamble and coda.

## 1. What Pavol asked and what Astra did

Pavol asked Astra to update from `main`, load only the Fortress Repo skill, and compare the consolidated records with Zettelkasten. Astra then read all of FACTS and POSITIONS and identified three apparent conflicts. Pavol asked it to load only the coordinator’s record-keeping section and investigate without editing anything. Astra traced the entry histories, cited reports, ledger rows, and relevant source code. Two cases exposed missing scope qualifications in the summaries; the third was already explained by the cited report. No builds or probes were run, and no records were changed.

Skills read for this work:

- `.claude/skills/fortress-repo/SKILL.md` and its record-keeping reference.
- `.claude/skills/coordinator/references/record.md` only. The coordinator core was not loaded, and no coordinator duties were undertaken.

The history queries were `history:F-70`, `history:F-87`, `history:F-140`, `history:F-170`, `history:P-86`, and `history:F-151`, through `facts-extract.sh`. Ledger rows 470 and 486 were then read, followed by the cited reports and relevant implementation source. No workers were launched for this review.

## 2. What the Zettelkasten comparison established

The consolidated record already has most of the useful structural ingredients:

| Need | Existing mechanism |
| --- | --- |
| Address a specific claim | Permanent F-, P-, and ledger IDs |
| Preserve reusable knowledge | FACTS entries |
| Preserve a decision and its reason | POSITIONS entries |
| Find supporting evidence | Reports, tests, and measurements |
| Follow related claims | References between IDs |
| Find incoming references | Queries such as `F-27+` |
| Find starting points | INDEX, the territory map, and skills |
| Recover earlier wording and provenance | Separate history files |

The logical card is an addressed entry, not necessarily a physical file. There is no need to create one file per fact or migrate to another tool.

The first suggestion was to strengthen explanatory links: “implements,” “depends on,” “limits,” or “provides a counterexample to,” rather than an unexplained “see also.” Reading the complete record showed that many entries already do this well. A general campaign to add reasoning links would duplicate work.

Good existing chains include:

- P-43, F-44–46, F-131: why the tower was flattened, the failure from dropping exclusion alone, the cost of the alternative, and the implemented result.
- P-78, F-59, F-143: an empty reduction’s identity, the checker’s inference limit, and walk’s different behavior.
- P-76, F-74: why walk’s numeral change waits, with measured failures and missing prerequisites.
- P-74–75: why an individually exact conversion can still make overload selection ambiguous.
- P-60, F-76, F-175: the coverage rule, proof boundary, narrower implementation, and remaining runtime gaps.

Two useful kinds of connection remain worth distinguishing:

- Evidence: where a claim comes from.
- Reasoning: what a claim implies, requires, or rules out.

Short question-oriented routes in the existing map could help when a discussion repeatedly reconstructs the same connection. This was an optional idea, not a recommendation to create a new index or rewrite the map. For example, “What makes parallel reduction valid?” could connect algebraic requirements, numeric limitations, generator behavior, and scheduling. Such a route should link to claims rather than copy them.

Background source for the comparison: [Introduction to the Zettelkasten Method](https://zettelkasten.de/introduction/). The recommendations below are grounded in the repository review, not a requirement to adopt that author’s whole method.

## 3. Investigated findings and their evidence

### 3.1 F-70 and F-87: the call form was lost

The current behavior at the reviewed tree distinguishes two forms:

- A dotted method call checks its written type arguments against their bounds.
- A top-level function call still lacks that check.

F-70 says the checker checks no written static argument against its bound. F-87 says it checks a written static argument against its bounds. Both summaries are too broad.

The evidence trail resolves the apparent contradiction:

- Ledger row 470 explicitly ends: “a dotted call now checks it; a top-level call does not.”
- `explorations/compile-ladder/rung-checker-contexts/REPORT.md`, section 1, describes the dotted-method repair for row 651.
- F-87’s history preserves the narrower wording “a written static argument of a method.” That qualification was lost during consolidation.
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala` uses `staticInstantiationForApp` for dotted methods and `staticInstantiation` for function references.
- In `scala_src/useful/STypesUtil.scala`, the former path checks substituted bounds; the latter matching step checks kinds, not bounds.

Classification: a real contradiction between the summaries, caused by lost scope and a related entry not being brought up to date. It does not reveal contradictory underlying evidence or a newly discovered implementation defect.

Proposed repair: narrow both entries. Do not mark F-70’s issue simply fixed; the top-level-call gap remains. If F-87 is split as proposed below, put the scoped positive claim in its new or existing specific home.

### 3.2 F-140 and F-170: a small value became a universal claim

F-170’s supporting range investigation used `n = 3`. Ledger row 486 and `ProjectFortress/tests/XXXNatValueNN32RungK.fss` also concern a small size assigned to `NN32`.

That case remains valid: walk produces a signed `ZZ32`, and the `NN32` binding is refused. It does not establish that every `nat` parameter becomes an `Int`.

F-140’s broader account is supported by:

- `explorations/compile-ladder/rung-size-range/REPORT.md`, sections 6 and 8.
- `interpreter/evaluator/BaseEnv.java`: `putNat` calls `FIntLiteral.make`.
- `interpreter/evaluator/values/FIntLiteral.java`: the factory produces `FInt` within the signed 32-bit range and `FLong` above it for valid larger `nat` sizes.
- `ProjectFortress/tests/NatBigSizeWalk.fss`, with sizes `3000000000` and `4294967295`.

Classification: F-170’s final sentence overgeneralizes a measured case. F-140 does not invalidate row 486.

Proposed repair: preserve the small-size binding example and refer to F-140 for the general representation rule.

### 3.3 P-86 and F-151: the premise changed, and the report says so

The original integration review warned against a ring bound because the flat sketch then under review did not make integers members of `MultiplicativeRing`. That bound would have excluded integer vectors.

The implemented tower differs: `Integral[I]` extends `MultiplicativeRing[I]`. The current `Library/FortressLibrary.fsi` declaration confirms this.

`explorations/reviews/array-fork2-judgement.md`, section 2.8, explicitly revisits P-86. It:

- Identifies the old premise.
- Explains why the bound no longer excludes integer arrays.
- Acknowledges the compromise relative to per-operation bounds.
- Explains that per-method bounds need unsupported `where` clauses, while moving products out of the traits would lose the existing override design.
- Retains per-operation bounds on the top-level scalar operators.

F-151 still marks the bound as the judgement’s default, with Pavol’s answer pending. Explaining the design does not convert that default into his approval.

Classification: no demonstrated conflict with the requirement to preserve integer arrays. The design compromise is already explained by the cited report. Astra’s initial criticism was incomplete because it had not yet followed that pointer.

No correction is required from this finding alone. An optional clarification of the two roles in the combined bound is proposed below.

## 4. Complete actionable-takeaway response to forward

**You are mostly fine. This needs two wording repairs and a small addition to the existing validation step—not a new reconciliation process.**

The failure is **loss of scope when summarizing a claim**. A statement about one case became a statement about all cases. The evidence stayed intact, but the summary could lead a worker to act incorrectly.

The histories distinguish two causes:

- **F-87:** consolidation dropped the qualification “of a method.” This is a compression error.
- **F-70:** the broad statement remained after dotted-method checking had been repaired. This is an update missed in a related entry.
- **F-170:** a measurement at `n = 3` became a general statement about `nat` values. This is an overgeneralization.
- **P-86 / F-151:** no repair is required on the evidence reviewed. The cited report explains the changed premise and the design compromise.

So I would not attribute everything to one writer. Nor would I assume that a coordinator with the full record in context would prevent it. Full context helps expose conflicts, but it does not enforce consistency.

These are **small edits with a meaningful effect**, rather than cosmetic changes. A worker could incorrectly conclude that bound checking is complete, or absent everywhere. Your skill says an entry should let a worker act correctly without opening its report. The fact that I recovered the answer from the reports shows that the recovery mechanism works; it does not make the misleading summary harmless.

Here is the concise feedback I would give Claude Code:

> **Finding: preserve scope during record rewrites.**
>
> The record’s evidence trails worked. Three summary claims need correction:
>
> - F-70: restrict the missing bound check to written static arguments at top-level function calls.
> - F-87: restrict the positive bound-check claim to dotted method calls.
> - F-170: state the measured small-size case (`n = 3`), and refer to F-140 for the general representation rule.
>
> The array concern, P-86 against F-151, is resolved in the cited judgement and needs no correction from this review.
>
> **Suggested addition to the existing pass:**
> “Check that the rewritten claim preserves the source’s scope: execution path, call form, value range, and conditions. When behavior changes, find other current entries that state the same behavior. Update them or explain the difference.”
>
> Apply this within the existing source check. Use references and a bounded text search for related claims. No new review stage is needed.

This adds a concrete check to a principle the skill already contains: keep a sentence when its absence would cause a misreading.

For occasional consolidation checks, the useful question is: **“Does this summary let a reader conclude more than the evidence establishes?”** That would have caught the lost qualifications here. It is a better target than making every entry longer or requiring every worker to reread the complete record.

## 5. Further skill refinement: one independently maintainable claim

Suggested wording:

> **Keep one independently maintainable claim per entry.** Keep its conditions, exceptions, and evidence with it. Split an entry when its claims answer different questions and can change independently. Length alone is not a reason to split. Connect the resulting entries where their relationship matters.

This does not mean separating a rule from its necessary qualifications. A long entry can be coherent if it states one rule and its limits. The warning sign is several claims that need different updates or answer different questions.

### Priority candidate: F-87

F-87 combines three independently changing behaviors:

1. Expected-type propagation. Keep this in F-87. Refer to F-221 for the enclosing-call retry.
2. Renaming inherited methods’ static parameters. Give this its own entry, with its specific report and tests.
3. Checking written static arguments on dotted methods. Give this its own entry, explicitly distinguishing the unchecked top-level calls covered by F-70 and row 470.

Before splitting, check whether another entry already owns either latter claim. Reuse it if so. Do not preassign new IDs in this handover. Preserve history and the meaning of incoming references through the repository’s record tools.

F-87 is the strongest candidate: it exhibits both independent changes bundled together and a lost scope qualification. Astra omitted it from one later list of candidates; Pavol caught that omission. It belongs before F-52 in priority.

### Second candidate: F-52

F-52 combines:

- Where an empty reduction gets its identity.
- How mixed-width calls choose a type.
- Why `RationalQuantity` cannot be constructed.

The first two already have more focused homes in F-59 and F-55. F-52 could retain the distinct `RationalQuantity` claim. Preserve history and inspect existing references before merging or removing duplicated text.

## 6. Selective synthesis: state a useful relationship once

Suggested guidance:

> When several entries jointly establish a useful conclusion, state that conclusion once and reference its supporting entries. Add it only when it prevents repeated reconstruction. Keep an unverified interpretation in a report.

Refinement after discussing a concrete example:

> First improve an existing entry that owns the conclusion. Add a synthesis entry only when no existing entry does.

A synthesis states a claim about relationships and needs evidence. A hub note merely provides starting points. Neither requires a new record type or a separate Zettelkasten process.

### Concrete proposal: improve F-166, rather than create a duplicate

F-166 already owns the proof boundary. The relevant part could read:

> **The POPL 2019 soundness proof does not cover the library’s F-bounded functions, including `SUM` and `BIG MAX`.** P-48 adopts the paper’s instance rule, but that does not extend the theorem to these functions. F-59 records the compiled checker’s reduction behavior; F-143 records walk’s different treatment of an unfixed F-bounded parameter. Those implementation results do not establish the missing proof. Evidence: `research/extracts/ParkPOPL2019-extract.md`, sections 6 and 8; `reviews/array-judgements-popl-check.md`, section 7.1.

This is proposed wording, not an edit or a newly verified proof claim. Before accepting it, check the precise restriction in those source passages. Preserve F-166’s other needed content or give it an appropriate home if the entry is split.

| Pointer | Purpose |
| --- | --- |
| P-48 | The decision whose justification could be read too broadly |
| F-59 | What the compiled checker does for affected reductions |
| F-143 | What walk does differently |
| Paper extract and review | Evidence for the theorem’s scope |

The fact-to-fact links provide navigation. The paper and review support the central proof-scope claim. Implementation tests do not establish a theorem’s scope.

The purpose is to prevent the mistaken inference: “We adopted the paper’s rule, therefore the paper proves our `SUM` implementation sound.” Being outside a proof does not establish unsoundness.

### Other optional relationship clarifications

| Existing entry | Relationship to state | Pointers |
| --- | --- | --- |
| F-20: sizes | A size can support shape checks without improving execution speed. | F-67: static checks; F-129: runtime representation; F-40: measured costs and absence of optimization |
| F-59: identities | Acceptance by walk does not establish that the checker can infer the element type. | F-143: open F-bounded parameter; P-78: when a written type argument is needed |
| F-151: array bounds | `Number` and `MultiplicativeRing[T]` serve different purposes in the combined bound. | F-119: mirrored scalar overloads; F-94: remaining checker limits; P-86: integration requirements |

For F-151, proposed explanatory wording:

> `MultiplicativeRing[T]` supplies the array bodies’ arithmetic. `Number` supplies the closed numeric domain needed to distinguish the mirrored scalar overloads (F-119). Removing either part loses a different requirement.

F-151 already contains much of this explanation. Make the roles explicit only if that improves retrieval; do not add another entry just to restate them. The array-fork judgement supplies the argument. The sizes and reduction entries already communicate their relationships reasonably well and do not justify a general rewrite.

## 7. Recommended scope for Fable

1. Check whether the reviewed claims have already changed since `06448ebf2`.
2. Repair the scope errors in F-70, F-87, and F-170, preserving provenance.
3. Consider the small scope-check addition within the existing record pass.
4. Apply the independent-change rule first to F-87, then consider F-52; reuse existing homes before creating entries.
5. Treat synthesis and explanatory-link proposals as selective improvements, not a migration or mandatory new review stage.

The review supports the existing system: its evidence trails recovered the distinctions. The actionable problem is that current summaries must retain enough scope to let a reader act correctly without always reopening those trails.

No repository records, skills, code, or tests were modified by this review. This handover does not approve pending language or array-design decisions.
