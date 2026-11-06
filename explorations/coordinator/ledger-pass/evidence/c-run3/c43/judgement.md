# Judgement of chunk c43, run c-run3, base c124c6b65

- **181: apply** (rewrite), with the check's correction: "`explorations/apl/base/AplSyntax.fsi` keeps `⌿ ⍬ ⍎` above its escaped `+`" replaced by "... keeps `⍝` (`:44`) above its first escape (`` `: ``, `:107`)". Confirmed at the base: `⍝` at `AplSyntax.fsi:44`, `` `: `` at `:107`; `⍬`/`⍎` appear only at `:660-669`, below the escapes, and the first `⌿` at `:419`.
- **183: apply** (rewrite), with the check's three corrections: the rule written `y4⦇ x:Expr ⋄ y:Expr ⦈` taking `x ⋄ y` as `DIAMOND` (`1ee3b0bc5^:explorations/apl/probes-4b/PROBES.md:97,112`); ", so the rule never matches" in place of "leaving a call of an undefined `y`"; the probe path written in full, `explorations/apl/probes-4b/y01_named.fss`.
- **186: keep, passes.** Nothing to apply.
- **196: apply** (rewrite), with the check's correction: `TemplateParser.java:100-121` pinned to `:116`, the `throw new MacroError("Could not parse '" + stuff + "'", e)` (confirmed at the base).
- **211: keep, passes.** Nothing to apply.
- **213: apply** (rewrite), with the check's three corrections: "An undefined name's span is in the grammar: " for the longer opening; " (the book's Ex 14)" deleted; the paper named, `research/extracts/growing-a-syntax.md` (its §1 sentence at `:94-95`). A fuller paraphrase of §1 ("requires ... to refer to the unexpanded program at use sites") was tried and refused by `ledger.py check` (notes 711 of 700), so the check's exact wording stands.
- **229: apply** (rewrite), with the check's correction: "The chapter's paper, `research/extracts/growing-a-syntax.md`, disagrees:".
- **235: apply** (rewrite) as written; the check passes it.
- **236: apply** (rewrite) as written; the check passes it.
- **239: apply** (rewrite) as written; the check passes it.
- **250: apply** (rewrite) as written; the check passes it.
- **287: apply** (rewrite) as written; the check passes it.

Silent: the nine lines of `silent.txt` as written, status kept on each (item 265); the check passes them. Pairs, duplicates, closes: none (the assessment's sibling reasoning, upheld by the check). No row holds a `measure`; `questions.md`'s two optional confirmation runs (229, 235) are not measures and change no line here. No `XXX` test is named.

Counts: 10 applied (all rewrites), 2 kept unchanged (186, 211), 0 held.
