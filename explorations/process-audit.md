<!-- Produced by a delegated process-audit worker session during the microgpt-native
     exploration; commissioned by Pavol's review of 2026-08-26. Probe programs:
     explorations/spec-probes/. Design journal: explorations/microgpt-native.md. -->

# Process audit: the epistemology of the microgpt design sessions

Scope: the coordinating session transcript
(`/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl`,
16,675 records, 2,506 assistant tool calls) plus all 55 delegated-worker
transcripts (1,803 further tool calls). Method: streamed extraction of
assistant text / thinking / tool-call arguments / tool results; counts are
mechanical, quotes verbatim. Repo untouched; no Fortress programs run.

**Verdict: the owner's suspicion is confirmed, and more sharply than stated.**
The language `Specification/` was never once consulted as a normative source
during any language-design decision in this project's history. It was read 161
times — every one of them as a LaTeX build target, a PDF provenance question,
or a typography fix. The de-facto authority hierarchy was
**interpreter error message > library source > in-tree test file > (nothing)**,
with the specification not in the stack at all.

---

## 1. SPEC CONSULTATION — counted

### 1.1 Raw counts

| measure | count |
|---|---:|
| assistant tool calls, all 56 transcripts | **4,309** |
| tool calls whose arguments touch a real `Specification/` or `Specification-1.0-frozen/` path | **172** |
| …of those, dated **before** today's audit (2026-08-21 → 08-23) | **161** |
| …of those 161 that query a *language construct* (overload / comprehension / reduction / generator / juxtaposition / subscript / coercion / literal / inference / trait / `opr` / `BIG`) | **0** |
| …dated 2026-08-26 (this audit round, after the owner's suspicion) | **11** |

The zero is mechanical, not impressionistic: filtering all 161 pre-audit
`Specification/` tool calls for any language keyword in the grep pattern, file
path, or command returns an empty set.

What the 161 actually were, by cluster:

- **2026-08-21 (46)** — locating the spec's chapter list and build files for a
  "where is the implementation documented" scout; `pdfinfo`/`pdftotext` on the
  1.0 PDF; Fortify `.sty` repair for the spec build.
- **2026-08-22 (65)** — building `fortress.pdf` with `pdflatex`, deciding which
  PDFs to commit, git-archaeology on `Specification/` provenance for the README
  and authorship map.
- **2026-08-23 (50)** — regenerating the keyword/reserved-word tables with the
  in-tree `keywords.pl`, page-diffing renders, the PREFIX_SUM/SUFFIX_SUM
  Fortify glyph fix.

### 1.2 The microgpt design phase, isolated

The design-and-implementation arc runs 2026-08-23T20:00 → 2026-08-26T06:00
(coordinating session) plus the two implementation workers.

| authority source | tool calls |
|---|---:|
| **`Specification/` (any path)** | **0** |
| interpreter runs (`bin/fortress`, `run.sh`, `runlog.sh`, `fortick`) | 106 |
| `Library/*.fss` / `*.fsi` / `CompilerLibrary` reads & greps | 29 |
| `ProjectFortress/src` + `ProjectFortress/tests` | 22 |
| `Papers/` + `research/` | 5 |
| total tool calls in the window | 556 |

Per-agent: coordinating session 369 calls (0 spec); `microgpt_native` worker
(`ab7f3fe2e8f7a5a94`) 86 calls (0 spec, 0 library, 20 runs); `microgpt_paper`
worker (`adbf76042b49fe58b`) 101 calls (0 spec, 1 library, 14 runs).

### 1.3 Why — three structural causes, all documentable

**(a) The project's own orientation documents classify the spec as a build
artifact.** `CLAUDE.md`: *"`Specification/` + `Specification-1.0-frozen/` — the
language spec LaTeX (in-repo, richer than the published PDF; **building it is
untested**)."* `explorations/repo-internals.md` — the file CLAUDE.md tells
sessions to read "before diving into the source" — mentions it once, as
*"`Specification/` (365 MB — 55% of the repo, mostly LaTeX…)"*. Neither
document says the spec answers language questions.

**(b) Zero pointers in any design document.** `grep -c "Specification/"` over
`microgpt-native.md`, `microgpt-native-brief.md`, `microgpt-port.md`, both
impl-reports, and `protocol.md` returns **0, 0, 0, 0, 0, 0**. Across *all*
`explorations/*.md` there are 12 mentions, all in `c2-proposal.md`,
`readme-plan.md`, `rebuild-plan.md`, `repo-internals.md` — every one about the
PDF or the directory's disk size.

**(c) The word "spec" was captured by something else.** In both impl reports
"the spec" means the *worker brief*, not the language Specification: *"The
spec's point 2 asks for `opr juxtaposition(p: List[\V\], m: List[\List[\V\]\])`"*
(`microgpt-paper-impl-report.md:70`); *"## Deviations from the spec: none
forced"* (`microgpt-native-impl-report.md:147`). All 5 uses of "the spec" in the
two reports refer to the brief. The real spec had no name in the working
vocabulary.

**(d) The knowledge was available and dropped.** On 2026-08-21T17:16 a scout
returned the spec's full chapter list to the coordinating session, naming
exactly the chapters that would have been needed three days later:

> "**Advanced** — Overloading and Multiple Dispatch; **Overloaded Functional
> Declarations**; Type Inference; **Conversions and Coercions**; **Operator
> Declarations**; … **Subscripting** … Appendices — … **Full Grammar for
> Fortress Implementors** …"

That inventory was used to answer "is the implementation documented in the
spec?" (answer: no), and then never revisited when overloading, coercion,
operator-declaration and subscripting questions each came up.

---

## 2. DEAD-END HANDLING — three reconstructions

### (a) `SUM` for user types declared "impossible" (journal "P3, why SUM is closed")

**Timeline** (coordinating session, 2026-08-24, elapsed 20:11:44 → 20:16:03,
≈4½ minutes, 3 runs):

| time | act | outcome |
|---|---|---|
| 20:11:44 | *"Interpreter alive. Now studying **the library machinery** before writing probes."* → 6 greps of `Library/FortressLibrary.fss/.fsi` | finds `opr SUM[\T extends Number\]()`, `Number comprises {RR64}` |
| 20:13:44 | writes `nprobe.fss` with attempt (a): bare nullary `opr SUM()` | 20:13:53 — *"Overloading of `BIG +[\T extends Number\]()` … and `BIG +():BigReduction[\W,W\]` fails because their parameter lists have the same types"* |
| 20:14:11 | attempt (b): generator-only `opr SUM(g: Generator[\W\])` | 20:14:21 — `CastError` in `FortressLibrary.fss:36` (the `cast[\Number\]`) |
| 20:15:09 | attempt (c): `opr SUM[\T extends Scalar\]()` with a bound disjoint from `Number` | 20:15:18 — same "parameter lists have the same types" |
| 20:15:50 | *"**Definitive negative**: the overload check ignores static params on nullary operators — `SUM` cannot be commandeered for user types."* | verdict written into the probe file and the journal |

**Judgement: three attempts, all within one authority (the interpreter);
no spec-sanctioned alternative tried; and the conclusion is mis-attributed.**

- Attempt (c) was **provably futile before it was run**, and the spec says so in
  one sentence: `Specification/basic/overloading.tex:102-106` — *"it is an error
  for their static parameters to differ (up to α-equivalence), or for one
  declaration to have static parameters and another to not have them. **Hence,
  static parameters do not enter into the determination of which declarations
  are applicable***." The journal records this as an implementation quirk —
  *"the check ignores static params"* — when it is normative language design.
  That mis-attribution matters: it makes the finding look like a fixable
  interpreter bug when it is the language's rule.
- Attempt (b) is the interesting one and was abandoned after a single run.
  `Specification/basic/expressions/reductions.tex:28-33` specifies the reduction
  expression as *"a call to the `BIG Op` operator, which has the following
  header: `opr BIG Op[\T\](g:(Reduction[\R0\],T→R0)→R0):R`"* — i.e. **the
  generator-taking form is the spec's only form**. The nullary
  `Comprehension`-returning declaration that the desugaring actually goes
  through is a 2012 library invention. So attempt (b)'s `CastError` is a
  genuine, publishable *implementation-diverges-from-spec* finding, and it was
  filed as "SUM is closed" instead.
- **Never tried, never mentioned: coercion.** The `CastError` is the library's
  `cast[\Number\]` refusing a `W`. Fortress has a first-class coercion
  mechanism — `coerce` is a reserved word
  (`Specification/fortress/fortress-keywords.tex:18`), it has its own chapter
  (Conversions and Coercions), it has its own clause in the overloading rules
  (`Specification/advanced/overloading.tex:449 "Coercion and Overloading
  Resolution"`), and the implementation has a whole shell mode for it
  (`Shell.java:256 testCoercion()`, `bin/fortress test-coercion`). Across all
  4,309 tool calls, `coerc*` appears 31 times — every one about JVM literal
  peepholes, blog-post archaeology, a 2010 Steele paper title, or `ZZ32→RR64`
  cosmetics. Its first appearance as a *design option* is at 2026-08-26T06:22,
  in the brief for this audit round.

### (b) Vector-times-matrix juxtaposition rejected (`microgpt_paper` round)

**Timeline** (worker `adbf76042b49fe58b`, 2026-08-25, elapsed 23:48:49 →
23:52:29, ≈3½ minutes, 1 run):

- 23:48:49 — `pprobe.fss` declares both `opr juxtaposition(List[\List[\V\]\], List[\V\])`
  and `opr juxtaposition(List[\V\], List[\List[\V\]\])`; interpreter:
  *"first parameters … are unrelated (neither subtype, excludes, nor equal) and
  **no excluding pair is present**"*.
- 23:49:50 — *"The two juxtaposition overloads collide in the overload checker.
  **Let me investigate the exclusion rule.**"*
- 23:49:52 — the investigation: **one grep of `ProjectFortress/tests/`**, finding
  `doubledOverloading3.fss` and its 2008 comment *"…we should consider these
  instantiations to be disjoint (right? right right?)"*.
- 23:52:01 — *"a known interpreter limitation … Let me probe the alternatives."*
  → three notation alternatives weighed (give Mat·Vec the second name;
  transpose; a second big operator), ⊞ adopted.

**Judgement: the best-reasoned dead-end in the corpus, and still spec-blind.**
Three alternatives really were weighed and the choice justified by usage counts
(7 `W x` vs 1 `p V`); the limitation was corroborated against an in-tree
artefact; and the report correctly separates language from implementation
(*"the register we wanted is expressible; what blocks it is the 2012 overload
checker's inability to see two instantiations of an invariant generic as
disjoint"*). But "investigate the exclusion rule" meant *grep the test
directory*, not *read the rule*. The rule is
`Specification/advanced/overloading.tex`, and its §"Meet Rule" (line 224) is
literally the language's answer to the error message the worker received:

> "If neither the Subtype Rule nor the Incompatibility Rule holds … we require a
> **disambiguating declaration** … either `P excludes Q` or there is a
> declaration `f(P ∩ Q)` …"

The interpreter's message — *"no excluding pair is present"* — is the checker
naming the Meet Rule's first disjunct. Whether the 2012 checker honours the
second disjunct (an intersection-typed third declaration) is an empirical
question that takes one probe file, and it was never asked. The claim
*"at most one overload of any operator may be declared on (List, List)"*,
propagated into the journal and the source header of `microgpt_paper.fss`, is
therefore an untested extrapolation from one failing pair.

### (c) "List-literal type ascriptions are load-bearing"

**Origin** (coordinating session, 2026-08-24, 20:44:59 → 20:48:00):

1. 20:44:59 — a deliberate simplification: strip `[\RR64\]` ascriptions from
   list literals *and* from expression-lists in `mgnative_{a,b,c}.fss`.
2. 20:45:45 — `mgnative_a.fss:35` fails:
   *"Unification error: … `$grads:List[\RR64\]` got arg `ArrayList[\FloatLiteral\]`"*.
   The offending list is `<|1.0 | a <- addends|>` — a genuine **literal**.
3. 20:45:56 — a **correctly scoped hypothesis** is formed:
   *"`FloatLiteral` inference strikes — **literals need the ascription;
   expressions of `RR64` don't**."* Ascriptions restored "only where literals
   appear".
4. 20:47:05 — the very next run falsifies it: `mgnative_b.fss:112` fails on
   `<|e.b.data, e.a.data|>` — field accesses of declared type `RR64`, not
   literals.
5. 20:47:32 — response: **blanket-restore every ascription in B**. No third
   experiment, no probe of a list whose elements never touched a literal.

The journal (`microgpt-native.md:231-237`) then generalises with a mechanism —
*"The interpreter infers element types from **runtime values**, and numeric
literals stay `FloatLiteral` even when stored in `RR64`-typed fields, so
`<|1.0, 1.0|>` and even `<|e.b.data, e.a.data|>` produce
`ArrayList[\FloatLiteral\]`"* — and a blanket rule: *"Ascriptions on value-list
literals are load-bearing; all restored."*

**Judgement: the rule was tested against exactly two data points, both with
literal-derived values, and then applied to everything.** The mechanism
sentence is a real insight (dynamic element typing, which the spec's *static*
aggregate-expression rules would not predict — a case where empiricism was
genuinely the right instrument). But the decisive experiment was never run: a
list literal whose elements are provably non-literal-derived, e.g.
`<|x + y|>` for `RR64` parameters, or elements read from a `File`. Without it
the true rule ("ascription needed iff any element's *dynamic* type is a
literal type") is indistinguishable from the blanket rule that was written down.

The downstream cost is explicit in both worker reports:
`microgpt-native-impl-report.md:117` — *"applied **pre-emptively**: every
`<|[\T\] ...|>` carries its ascription, including the `gold0/1/2` reference
vectors"*; `microgpt-paper-impl-report.md:242` — *"were applied **pre-emptively**
and all still bite"* (they were never removed, so "still bite" is not an
observation). Two deliverables carry an unknown number of unnecessary
ascriptions, in files whose entire purpose is notational purity.

---

## 3. SINGLE-DATA-POINT GENERALISATIONS — a census

### 3.1 The clearest case: a rule with **no** supporting data point at all

`microgpt-native-impl-report.md:113-116`, trap 2:

> "**A comprehension body ending in a subscript swallows the `|`.**
> `<|[\V\] m[i] | i <- 0#n|>` mis-parses; the fix is to wrap the whole body in
> parens: `<|[\V\] (m[i]) | i <- 0#n|>`. **Adopted as a blanket convention for
> every list comprehension in the file.**"

Reconstructed from the worker's own probe edits, **that example was never run.**
What was run (`mgnprobe.fss`, 21:12–21:15):

- `flat = <|[\V\] m[i][j] | i <- 0#2, j <- 0#3|>` → fails (`args = ()`,
  `overload = {_[_]...}`) — this is trap 1, the *chained* subscript;
- 21:13:09 edit → `<|[\V\] (m[i][j]) | ...|>` → **fails identically**, because
  the chained subscript is still there inside the parens;
- 21:14:56 edit → `<|[\V\] ((m[i])[j]) | ...|>` → passes.

Both the parenthesisation *and* the chained-subscript fix were applied at once
and the second failure was attributed to the parens. A single-subscript body
was never tested unparenthesised. The worker's own `p2.fss` even contains
counter-evidence that was not noticed: `c = <|[\RR64\] (i 10 + j) 1.0 | i <- 0#2,
j <- 0#3|>` and `d = <|[\RR64\] x | row <- m, x <- row|>` both have
unparenthesised bodies and both pass. **Trap 2 is very likely an artefact of
trap 1**, and it was promoted to a blanket convention across a 378-line
deliverable and then inherited by the next worker.

### 3.2 A generalisation that changed the architecture

`microgpt-native.md:253-258`, decision 1 (vectors are `List[\V\]`, **no** `Vec`
object, **no** vector-sum monoid):

> "a second `BIG OPLUS` registration for a vector carrier would collide with the
> scalar one (**nullary big-operator registrations are one-per-name — the P3
> lesson**)"

The "P3 lesson" is the collision between a *user* `SUM()` and the *library's*
`SUM()`. Extrapolating from that to "a second registration of *our own* operator
would collide" was never tested before the decision was taken. The paper worker
later tested it and found the opposite: journal `:514` — *"**The
one-registration-per-name rule is per-name, not per-carrier**: a second nullary
`BIG OPLUS()` collides; `BIG BOXPLUS()` coexists."* An architectural decision in
the flagship deliverable rests on an over-generalisation that a five-line probe
falsified two days later.

### 3.3 The inherited trap list — bought empirically, all documented

`microgpt-native-brief.md:182-187` hands workers eight rules as "syntax traps
already paid for": no `E`-notation numerals; `log`/`exp`/`cos` are prefix
functions; integer `DIV`; `at` is reserved; ALL-CAPS identifiers are operator
names (`object GPT` is illegal); mixed juxtaposition with `/` or `^` needs
parens; `then`/`end` lowercase; `fill(fn (i:ZZ32) => …)` builds arrays.

Every one of these is stated in the specification:
`Specification/fortress/fortress-keywords.tex:18` lists `at` (and `coerce`);
`Specification/basic/lexical-structure.tex:1169` — *"consists only of uppercase
letters and underscores (no digits or non-uppercase letters)"*;
`lexical-structure.tex:1053` §Numerals; `Specification/basic/operators/
juxtameaning.tex` for juxtaposition. "Paid for" is literal: each was purchased
with a failed run that a grep would have avoided.

### 3.4 Where a rule was correctly falsified — credit where due

`microgpt-paper-impl-report.md:230-234`, contest 10:

> "`fc2 relu(fc1 x)` needs **none of the spec's defensive parens**
> (`fc2 (relu (fc1 x))`): tight juxtaposition resolves `relu(fc1 x)` as an
> application and the outer pair as the matrix·vector operator."

An inherited blanket rule was tested and dropped. This is the one instance in
the corpus of a worker actively probing whether an inherited "always" is
necessary — and it is the counter-example that shows the rest of the process
could have worked the same way at negligible cost.

### 3.5 Claims correctly established

For balance: the `∇` (U+2207) claim in the journal — *"not a Fortress operator
at all"* — is right; `nabla` appears in zero spec files. And the "interpreter
performance law" (`microgpt-native.md:47-58`) is the corpus's best empirical
work: a surprising 8× was **not** accepted at face value, a dedicated
`tparallel.fss` isolated it, and the result is a 2×2 table (one-loop vs
2-tuple × 1 worker vs 2 workers) that inverts the naive reading. That is a
control experiment, and it exists because nothing in the spec could have
answered the question.

---

## 4. AUTHORITY HIERARCHY — the de-facto epistemology

Reconstructed from what was consulted, in what order, at each decision point:

1. **The interpreter's error message** — first, last, and usually only. 106
   interpreter invocations in the design window; the phrasing of a `ProgramError`
   is quoted verbatim into journals, source headers and reports, and repeatedly
   becomes the *statement of the rule* ("parameter lists have the same types",
   "no excluding pair is present").
2. **`Library/*.fss` / `*.fsi` source** — 29 reads, always to find out *what the
   2012 library happens to declare* (`opr SUM[\T extends Number\]()`,
   `Number comprises {RR64}`, `BIG LEXICO` as a registration template). Used as
   the definition of the language, never as one implementation of it.
3. **`ProjectFortress/tests/` and `src/`** — 22 reads, reached for only when an
   error needed corroboration (`doubledOverloading3.fss`). Notably, a 2008 test
   file's parenthetical self-doubt ("right? right right?") was accepted as the
   authoritative account of an overload rule.
4. **Prior journal entries and worker reports** — the strongest force in the
   system. Rules propagate forward unexamined ("applied pre-emptively"), and
   because reports are written before the next worker starts, a mis-derived rule
   in one report becomes a constraint on the next deliverable.
5. **The specification** — absent. 0 of 556 design-phase tool calls.

**Where the hierarchy served them well.** Three places, all of them cases where
the spec could not have helped:

- *The interpreter's performance law.* Emergent runtime behaviour of the 2012
  work-stealing scheduler; nothing normative exists. Empiricism plus a real
  control experiment produced the corpus's most valuable finding.
- *`FloatLiteral` dynamic element typing.* The spec's aggregate-expression rules
  are static; the observed behaviour is a property of the walking interpreter's
  runtime types. Only a run could have revealed it.
- *The compiled-path characterisation.* `CLAUDE.md` records that
  pluckyporcupine's "compiled programs don't run" is wrong *here* — a claim only
  measurement can settle, and the project's standing rule ("claims in old
  READMEs describe their eras — verify against the code") is exactly right.

**Where it failed them.** Four failures, each traceable to a specific missing
lookup:

| observed failure | the spec sentence that would have changed it |
|---|---|
| Attempt (c) of P3 run and recorded as an interpreter quirk | `basic/overloading.tex:102-106` — static parameters *by design* do not participate in applicability |
| "SUM is closed" as a **language** verdict | `basic/expressions/reductions.tex:28-33` — the spec's `BIG Op` takes a generator; the nullary/`Comprehension` path is a library invention, so attempt (b)'s `CastError` is a spec divergence, not a closed door |
| Coercion never considered as the route past `cast[\Number\]` | `advanced/overloading.tex:449` §Coercion and Overloading Resolution; `coerce` is a keyword; `Shell.testCoercion()` exists |
| "at most one overload on (List, List)" | `advanced/overloading.tex:224` §Meet Rule — a disambiguating declaration `f(P ∩ Q)` is the sanctioned escape from exactly this error |
| Chained subscripts filed as a "parse trap" | `appendices/grammars/concrete-syntax.tex:921` — `SubscriptExpr ::= Primary LeftEncloser [StaticArgs] [ExprList] RightEncloser`; a `SubscriptExpr` is **not** a `Primary`, so `m[i][j]` is ungrammatical *by design*, and the optional `StaticArgs` explains the `args = ()` in the error. `(m[i])[j]` is the language's form, not a workaround |

The last row is the sharpest illustration of the cost. A five-minute grammar
lookup would have converted a "trap" into a language fact, told the authors why
the error said `args = ()`, and — because the grammar shows a comprehension body
is an ordinary `Expr` — would very likely have prevented the fabricated trap 2
and the blanket parenthesisation of every comprehension in two deliverables.

**The meta-pattern.** The sessions consistently treated *the 2012 implementation*
as the definition of Fortress. That is defensible as an engineering stance — the
interpreter is what runs — but it silently discards the project's central asset.
The repo contains the language's own normative account, in-source, richer than
the published PDF, and it was used only to render PDFs. Every "impossible" in
`microgpt-native.md` is really "the 2012 interpreter refused three things I
tried"; without the spec there is no way to tell which of those are Fortress and
which are the interpreter — and that distinction is precisely the deliverable a
revival project owes its subject.

---

## 5. RECOMMENDATIONS

Each is tied to a specific observed failure above and is cheap enough to be a
standing rule rather than a project.

**R1. Reclassify the specification in the orientation documents.**
`CLAUDE.md` currently describes `Specification/` as LaTeX whose "building is
untested"; `repo-internals.md` mentions it as 55% of the repo's disk. Replace
both with a normative pointer and a chapter map: overloading →
`basic/overloading.tex` + `advanced/overloading.tex`; reductions/comprehensions →
`basic/expressions/{reductions,comprehensions,aggregate}.tex`; operator and
subscript declarations → `advanced/{operator-definitions,subscripting}.tex`;
coercion → `advanced` Conversions and Coercions + `advanced/overloading.tex:449`;
lexing/keywords/numerals → `basic/lexical-structure.tex` +
`fortress/fortress-keywords.tex`; the grammar of last resort →
`appendices/grammars/concrete-syntax.tex`.
*Ties to:* §1.3(a) — the root cause of 0/556.

**R2. Stop calling briefs "the spec".** Both impl reports use "the spec" for the
worker brief in all 5 occurrences, and neither mentions the language
Specification once. Rename brief sections to "the brief" / "the design contract"
and reserve "the spec" for `Specification/`. A vocabulary that has no word for a
source guarantees the source is not consulted.
*Ties to:* §1.3(c).

**R3. Standing order — spec-before-verdict.** No dead-end may be written into a
journal, report, or source header as "impossible", "closed", "cannot", or "at
most one" until the governing spec chapter has been read and either quoted in
support or recorded as diverging. Concretely: **no operator-overloading verdict
without `basic/overloading.tex` and `advanced/overloading.tex` §Meet Rule; no
big-operator or comprehension verdict without
`basic/expressions/reductions.tex`; no parse-trap entry without
`appendices/grammars/concrete-syntax.tex`.**
*Ties to:* §2(a) attempt (c) — futile per spec; §2(b) — the Meet Rule never
reached; §3.1 — a parse trap invented where the grammar had the answer.

**R4. Two-source rule for every negative result.** A negative must be
corroborated by a second, *different-kind* source before it is recorded. The one
place this happened (`doubledOverloading3.fss`) produced the corpus's best
dead-end write-up; the place it did not ("SUM is closed") produced a language
claim that is really an implementation claim.
*Ties to:* §2(a) vs §2(b).

**R5. Falsification probe before any blanket rule.** A rule of the form
"always X" / "never Y" / "blanket Z" may not be adopted until one probe has been
run with the *conjectured cause removed*. Two concrete, immediately actionable
instances:
- run `<|[\RR64\] x | i <- 0#3|>` and `<|[\RR64\] (m[0])[i] | i <- 0#3|>`
  unparenthesised — if they pass, trap 2 is void and the blanket
  parenthesisation should be removed from `microgpt_native.fss` and
  `microgpt_paper.fss`;
- run a list literal of non-literal-derived `RR64` values (e.g. of a
  parameter sum, or of `File`-read values) without ascription — this settles
  whether the "load-bearing ascriptions" rule is about literals or about all
  lists, and how many of the ascriptions in two deliverables are decorative.
*Ties to:* §3.1 (rule with zero data points), §2(c) (rule with two same-kind
data points).

**R6. Change one variable per probe.** The 21:13:09 edit changed
parenthesisation while the chained subscript was still present, and the resulting
failure was attributed to the wrong change. This one discipline would have
prevented §3.1 outright.
*Ties to:* §3.1.

**R7. Label every recorded rule with its evidence class.** In journals and
reports, tag each finding: `[spec]` (normative), `[impl]` (interpreter behaviour,
possibly divergent), `[measured]` (performance), `[conjecture]` (one data point,
untested). A `[conjecture]` may not be inherited by a downstream worker as a
constraint. The two inherited trap lists would then carry visible warning
labels instead of the authority of settled fact.
*Ties to:* §2(a) mis-attribution, §3.2 (a conjecture that set the architecture),
§3.3 ("already paid for").

**R8. Re-open the four skipped alternatives as a bounded probe round.** Each is
a single small `.fss` file and each could change a headline claim:
(i) a `coerce` declaration from `RR64`/`FloatLiteral` into the autodiff type `V`
— tests whether `SUM`'s `cast[\Number\]` can be satisfied, and would eliminate
`konst(...)` everywhere; (ii) a Meet-Rule disambiguating declaration for the two
`juxtaposition` overloads; (iii) a spec-shaped `opr BIG Op(g: Generator[\V\])`
as the *only* declaration, to establish precisely where the interpreter's
desugaring diverges from `reductions.tex`; (iv) the two falsification probes of
R5. Outcome either way is publishable: a working idiom, or the project's first
properly evidenced list of interpreter-vs-spec divergences — which is the thing
a revival is uniquely positioned to produce and which this corpus currently
cannot distinguish from ordinary language limitations.
*Ties to:* §2(a), §2(b), §2(c), §4 (the whole "which is Fortress, which is the
interpreter" problem).
