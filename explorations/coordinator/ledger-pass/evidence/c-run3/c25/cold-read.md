# Cold read: c-run3 / c25

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md` and its `references/` (not `revival-changes.md`, `sources.md`).

Common to every row (not repeated below):
- `NEGATIVE-VERIFIED`: `references/records.md` lists it among the seven status words and says "the row template defines each", but the template lives in the ledger file, which a worker reading the skill does not see. I read it as "the gap is confirmed and still open", but the skill does not say so. Missing concept (definition not in the skill).
- `design limit` vs `implementation gap`: the skill gives only the example `implementation gap (checker)`. I read "design limit" as "the spec itself makes this so; do not fix", but that is inference. Missing concept.
- `Reproducer: none` while the notes name probes: a worker cannot tell whether "none" means "no committed test" or "nothing runnable". Unclear wording.
- `in the parent of <hash>`: I read it as "the file was deleted by <hash>; read it with `git show <hash>~1:PATH`". The skill does not define it. Unclear wording, but resolvable.
- `full text: history, row N`: I read it as "the earlier text is in `explorations/fortress-gap-ledger-history.md`" (records.md names that file). Clear enough.
- `Found by` labels (`blinded`, `run-c2`, `apl rung 2`): opaque, but a worker does not need them.

## Row 7

- **Defect:** an all-capital word of two or more letters (`BOS`, `GPT`, `BLK`) lexes as an operator word, not an identifier, so using it as a variable name fails (`Operator prefix BOS is not defined.`). Per the row this is what the spec intends for words with at least two different letters; only the looser case (`AAA`) is a gap, which belongs to row 193.
- **Where:** the parser, so both paths. The lexing rule is `NodeUtil.java:1466-1485`. It also bites names inside an APL DSL grammar (`BLK ← 4 ⋄ BLK`).
- **Reproduce:** declare and use `BOS` as a variable; or run `explorations/apl/rung-5/v06_caps.fss` and compare with its `.out.0` (from `1ee3b0bc5~1`); or the probe `RvwNameKeywords.fss` from `e879b6a44~1`.
- **Status:** leave it; rename (`Blk`). The spec's own rule is the cause.
- **Could not resolve:**
  - The claim's exception "other than a two-letter repeat such as `AA`" next to the note's "`AAA` is an operator too" makes the reader work out that only two-character repeats escape. Once worked out it is consistent with row 193, but the claim alone could read as "any repeated-letter word escapes". Unclear wording.
  - `Specification: basic/lexical-structure.tex` gives no tree. The repo has `Specification/` and `Specification-1.0-frozen/`, and other rows give the frozen prefix. Unclear wording.
  - Is this "design limit (parser)" also the place where walk and the compiled path both fail? The row does not name a path. Since the parser is shared I assume both.

## Row 133

- **Defect:** in an api (`.fsi`), a postfix operator declaration whose symbol is an exponent operator (`opr (self)^T`, `opr (A: Mat)^T`) is a `Syntax Error`; the same declaration parses in a component.
- **Where:** the parser, both paths: `parser/Parameter.rats:171-172` (api rule) lacks the `/ ExponentOp` alternative that the component rule at `:141-142` has (and that the comments at `:115`, `:159` copy from the spec). `^T` is an `exponentOp` (`parser/Symbol.rats:104-106`).
- **Reproduce:** put `opr (self)^T` in an api and parse it; the error is reported at column 1 of the next line. Probes in `explorations/run-c3/probes/g156_api_postfix/` from `a0a0c7c99~1`.
- **Status:** build a fix: add the missing alternative to the api rule so it matches the component rule.
- **Could not resolve:**
  - "the API rule lacks the second `/`": I read it as "lacks the `/ ExponentOp` alternative", but "the second `/`" is opaque without the file open. Unclear wording.
  - "`^T^` is refused later: `The operator, ^, is always an infix operator...`": I cannot tell whether this is a third declaration someone tried (`opr (self)^T^`), the form the api rule does accept (an `ExponentOp` then a caret), or what the fix must still refuse. Two readings. Unclear wording.
  - Whether, once the api parses, the checker or walk accepts the matching component. Not stated.

## Row 144

- **Defect:** a call directly followed by a postfix or superscript operator, `onehot(ids, vocabSize)^T`, is refused with `Syntax Error: a function argument should not be immediately followed by a non-expression element.`. The row says the spec makes this a static error, as it does `f()[i]` (row 4).
- **Where:** walk: its postfix branch takes the tight juxtaposition (`interpreter/evaluator/Evaluator.java:969-971`) and refuses the call (`:1322-1326`).
- **Reproduce:** run `explorations/run-c/probes/g144_callsuper.fss` from `4ebf80aec~1` under walk; its working half prints `(1) bound first: (a^T).sizes = 2 3`.
- **Status:** leave it; bind first (`oh = onehot(…); (oh^T) dX`) or use `.t()` (row 301).
- **Could not resolve:**
  - The class says "design limit (walk)" but the claim says the spec makes it a static error. If it is the spec's rule, why is its area walk and not the parser or the checker? And does the compiled path refuse it too? Not stated. Unclear wording.
  - A `Syntax Error` produced by `Evaluator.java` is surprising; I cannot tell whether the error is raised at load or at run time. Unclear wording.
  - Row 4 is cited for `f()[i]` but not given here; I cannot check the analogy.

## Row 158

- **Defect:** walk also refuses a parenthesised call followed by `^T` (`(onehot(ks, 5))^T dx`, `((onehot(ks, 5))^T) dx`) with row 144's error, though the grammar makes a parenthesised expression a `Primary` that an `ExponentOp` may follow. So, unlike row 144, this one is a real gap.
- **Where:** walk: the postfix branch at `interpreter/evaluator/Evaluator.java:969-971` tests only for a tight juxtaposition and ignores the parentheses; it refuses at `:1322-1326`. The error's span is on the call, not the parentheses.
- **Reproduce:** under walk, run `explorations/run-c/probes/q04f_callsuper.fss` and `q04a_varargs.fss` (from `4ebf80aec~1`), or `explorations/run-c3/probes/lift_g4.fss` (from `a0a0c7c99~1`).
- **Status:** build a fix in walk's postfix branch: let a parenthesised call take a postfix operator. Workarounds meanwhile: `transpose(onehot(ks, 5)) dx`, `(onehot(ks, 5)).t() dx`, or bind first.
- **Could not resolve:**
  - "(3)" and "(5)" after the probe names: line numbers, case numbers, or counts of failing cases? Unclear wording.
  - "`lift_g4b` beside the probe": I read it as a file `lift_g4b.fss` next to `lift_g4.fss` in the same commit, but the extension and commit are not given. Unclear wording.
  - Whether the compiled path accepts this form. The skill asks a row to say which paths show the defect; this row names walk only.

## Row 193

- **Defect:** in a DSL grammar, a word of two or more capitals (`WE`) cannot name a nonterminal, being lexed as an operator word, and gives a bare `Syntax Error` at the name. The implementation's rule is looser than the spec's: the spec needs at least two different letters, so `AAA` should be an identifier, but the implementation makes it an operator.
- **Where:** the parser, both paths: `parser/Symbol.rats:117-118` (`OpName = id &{NodeUtil.validOp(opn)}`) and the rule itself at `nodes_util/NodeUtil.java:1466-1485` (length >= 2, all capitals or `_`, no leading or trailing `_`, and only two-character repeats like `AA` and `AA_…` excluded).
- **Reproduce:** the eleven-name script `explorations/apl/v1-probes/p12a_oprword.sh` with `p12_name.out.0`, from `1ee3b0bc5~1`: it accepts `AA Ab AbC A W2 AB2` and rejects `WE AB ABC AAA A_B`. It ran on the retired library `explorations/apl/v1/base` at `0ff5eae27~1`.
- **Status:** build a fix: tighten `NodeUtil.validOp` to the spec's "at least two different letters" so `AAA` becomes an identifier. Words like `WE`, `BOS` stay operators by the spec (row 7); rename them (`WEx`).
- **Could not resolve:**
  - The script rejects `A_B`. Is that correct by the spec (two different letters, so an operator) or part of the gap? The row does not say which of the five rejections the fix should change; only `AAA` is named. Unclear wording.
  - `Specification: basic/lexical-structure.tex` gives no tree (`Specification/` or `Specification-1.0-frozen/`). Unclear wording.
  - Row 7 (class design limit) and this row (class implementation gap) cite the same lines of `NodeUtil.java`; a worker must infer that only the `AAA` case is the fix and row 7 is not. Clear once both rows are read, not from either alone.
  - "nonterminal": a grammar term the skill does not define (it defines a DSL grammar only); I take it as a name declared in a `grammar` declaration. Language concept, resolved by general knowledge.

## Row 257

- **Defect:** in an api holding a `grammar` declaration, a bare character class `[_]` is a `Syntax Error` at the character and must be written `` [`_] ``, because `_` is one of the macro language's special characters. Also, among a set of alternative names, one with an underscore (`rmsn_b`) must come before a name that is its prefix (`rmsn`), since `_` is outside `[A:Za:z0:9]` and the `NOT` terminator succeeds right after the prefix.
- **Where:** the parser's grammar for DSL grammars, both paths: `parser/Syntax.rats:395-398` (the SpecialChars). Example of the ordering: `explorations/apl/base/AplSyntax.fsi:610-617`.
- **Reproduce:** write `[_]` in a grammar api and parse; probe `explorations/apl/microgpt/probes/X01Syn.fsi` with `x01_names.out.0` (from `1ee3b0bc5~1`).
- **Status:** a fix for the bare `[_]` can be built in `Syntax.rats`; for the ordering, the row gives a rule to follow (longer name first), and I cannot tell whether it is a gap to fix or PEG ordered choice working as designed.
- **Could not resolve:**
  - "closed-set name": not defined in the skill; I guess a name among a fixed set of alternatives in a nonterminal. Language concept missing.
  - "the `NOT` terminator": which construct? A negative lookahead written after each name? Unclear wording / missing concept.
  - Two claims in one row with one class: is the ordering half also an "implementation gap", and what would its fix be? Unclear wording.
  - "as row 250": row 250 is not given, so I cannot tell what it adds. Unclear wording.
  - The last sentence ("so row 193 bars only words of two or more capitals") reads as a cross-check on row 193, not part of this defect. Clear, but out of place.

## Row 286

- **Defect:** a DSL template (`<[ … ]>`) that writes the host language's caret `^` silently drops the caret's right operand: `<[ (1.0 (l)) ^ (r) ]>` expands to `1.0 (l)`, with no diagnostic. So `apl⦇ 10*10 ⦈` gives `10.0` and `apl⦇ 2*3 ⦈` gives `2.0`. In microGPT-in-APL this made the causal mask `-10` instead of `-1E10` and moved every loss from the seventh digit.
- **Where:** the template translator, shared by both paths; the skill places the template parser in `parser/templateparser/` (`references/toolchain.md`). Example grammar: `explorations/apl/mg/AplMgSyntax.fsi:234`.
- **Reproduce:** change the `*` rule at `AplMgSyntax.fsi:234` to `<[ (1.0 (l)) ^ (r) ]>` and run `apl⦇ 2*3 ⦈`; compare with `explorations/apl/mg/checks/model_run.out` and `.out.1` (from `1ee3b0bc5~1`).
- **Status:** build a fix in the template translator (or at least make it report an error). Meanwhile, in a sub-language, call a glue function such as `pow(b: RR64, e: ZZ32): RR64 = b^e` (`explorations/apl/mg/AplMg.fss:37`) instead of writing `^` in a template.
- **Could not resolve:**
  - "the template translator": no file is named; I assume `parser/templateparser/` from the skill, but the row does not say whether the fault is in the template parser or in the later expansion. Unclear wording.
  - Which `.out` is the bad run and which the good: `model_run.out` and `.out.1` are both named without saying which holds `3.3659665281147144`. Unclear wording.
  - "`^` is also the type-application and postfix-operator character": type application in Fortress is `[\ \]` per the skill; I cannot tell what "type-application" use of `^` means here. Language concept missing.
