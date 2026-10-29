<!-- The seven findings of the phase 3 exit review whose home is POSITIONS-history.md, not the entry's text (postmortem-2026-10-28/evidence/findings-homes.md, "Totals"): for each, the entry, the correction of its grounding, and the record.py note command that writes it. Written by an Opus worker on 2026-10-29; nothing applied. -->

# The grounding corrections, for the history

## How to run

- Run these after `apply.txt`, from the repository root, each as its own call. One call writes one block per entry, and `apply.txt` already writes a block for P-58, P-153, P-154 and P-158.
- Each command writes a `noted` block. The entry stays as it is.
- Each note is in a quoted heredoc, so its quotes and backticks pass as written.
- All seven ran clean on a scratch copy of the record, after `apply.txt` (the final report gives the check).

## P-17, unboxed doubles

Correction: the specification states the same intent in its own words, and no block cites them. The text stays: his reason stands, and a reader acts the same with the citation or without it.

Source: `explorations/reviews/foundations/judgement.md`, "Tenet 7"; finding P-17 in `explorations/reviews/foundations/evidence/salvage-findings.md`; his page comment of 2026-10-29 07:18 UTC.

```bash
python3 explorations/coordinator/tools/record.py note P-17 \
  --from 'reviews/foundations/judgement.md#Tenet 7.' \
  --from 'coordinator/HELD.md#Held from his page comments (2026-10-29)' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
the grounding of the reason, which no block of this history gives: the Working Draft states the same intent. An implementation may freely copy value objects, among them floating-point numbers (`Specification-1.0-frozen/basic/objects.tex:38`), and a `LinearSequence` of a value type is a sequence of "unboxed" values (`Specification-1.0-frozen/advanced-lib/binary.tex:80`). The text is unchanged: his reason stands, and a reader acts the same with the citation or without it (foundations finding P-17, sorted to the history). At his page comment of 2026-10-29 07:18 UTC, "doubles" means every primitive number type that fast performance needs, as any reasonable reading infers.
EOF
)"
```

## P-42, the implicit bound `Any` (finding c)

Correction: the bound has two grounds that no block names, POPL 2019's default bound and the Working Draft's own sentence on instantiation. The text stays: the bound and its reason stand.

Source: `explorations/reviews/foundations/judgement.md`, "4. The bound: P-42 holds, on these grounds"; finding P-42 (c).

```bash
python3 explorations/coordinator/tools/record.py note P-42 \
  --from 'reviews/foundations/judgement.md#4. The bound: P-42 holds, on these grounds' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
the grounds of the bound, which no block of this history gives: the type group's POPL 2019 paper (Park, Hong, Steele and Ryu) gives every type parameter the upper bound `Any` by default (`research/extracts/ParkPOPL2019.txt:418-419`), and the Working Draft itself says that type parameters are instantiated with tuple and arrow types (`Specification-1.0-frozen/basic/trait-parameters.tex:53-54`). Before this, only the specification's callout cited POPL 2019. The text is unchanged: the bound and its reason stand (foundations finding P-42 c, sorted to the history).
EOF
)"
```

## P-43, the exclusion rule and the flat number types (finding b)

Correction: the language's grounds for the exclusion rule are the type group's texts after the Working Draft, which agree, and the Working Draft's own sentence. No block names them. The text stays, at his word.

Source: `explorations/reviews/foundations/judgement.md`, "Tenet 5"; finding P-43 (b); his page comment of 2026-10-29 05:35 UTC.

```bash
python3 explorations/coordinator/tools/record.py note P-43 \
  --from 'reviews/foundations/judgement.md#Tenet 5.' \
  --from 'coordinator/HELD.md#Held from his page comments (2026-10-29)' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
the language's grounds for the exclusion rule, which no block of this history gives: the type group's texts after the Working Draft agree on it: the 2011 paper (`Papers/Types/exclusion.tick:141-152`), the 2012 Types chapter (`Documentation/Specification/Prose/Language/types.tick:355-376`), Naden's 2012 write-up (`Papers/Types/journal/justificationOfRTR.tex:496-497`) and the POPL 2019 paper's rule [Anc-Same-Trait]. The Working Draft says that the number types "are mutually exclusive; no value has more than one of them" (`Specification-1.0-frozen/basic/types-vals-vars.tex:502`, kept at `types.tick:978`). His correction of 2026-10-26T07:46:17Z: "I think we did a plenty of digging which decided why we took the flat numeric tower." The text is unchanged, at his page comment of 2026-10-29 05:35 UTC: these grounds change nothing that a reader does, so they belong in this history.
EOF
)"
```

## P-58, the natives' binding form (finding a)

Correction: the first text grounded the form in the specification's printed declaration of `builtinPrimitive`, which holds only through the library api that the specification includes. The sound ground is that the language has no foreign-function interface, so the library's practice decides. `apply.txt` states that ground short; this note keeps its source, the Working Draft, at his word.

Source: `explorations/reviews/foundations/judgement.md`, "Tenet 8"; finding P-58 (a); his page comment of 2026-10-29 07:48 UTC.

```bash
python3 explorations/coordinator/tools/record.py note P-58 \
  --from 'reviews/foundations/judgement.md#Tenet 8.' \
  --from 'coordinator/HELD.md#Held from his page comments (2026-10-29)' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
the source of the ground that the text now states short: the Working Draft lists a foreign-function interface only among its proposed features ("Proposed Features", `Specification-1.0-frozen/appendices/future.tex:675`, kept at `Specification/appendices/future.tex:708`), so the form of a native binding is outside the language, and the library's practice decides it. This corrects the ground of the first text, `046207371` (2026-10-10), that the specification prints the declaration of `builtinPrimitive`: that holds only through the library api that the specification includes (foundations judgement, tenet 8). At his page comment of 2026-10-29 07:48 UTC the Working Draft as the source goes to this history. His informed yes on the form stays owed (review-queue item 282).
EOF
)"
```

## P-153, the integer power

Correction: the review held that the old Why calls code of the compiled path the team's later word on the language. Its ground was that the Working Draft's power was never built, and the prelude's power is the only one built. The curator reads that same fact as the team's later decision winning. The note records both readings. The text keeps its Why, without the P-26 parenthesis.

Source: `explorations/reviews/foundations/judgement.md`, "3. The prelude question"; finding P-153; his page comments of 2026-10-29 06:56 and 06:57 UTC.

```bash
python3 explorations/coordinator/tools/record.py note P-153 \
  --from 'reviews/foundations/judgement.md#3. The prelude question' \
  --from 'coordinator/HELD.md#Held from his page comments (2026-10-29)' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
the grounding of the Why: the foundations review held that it calls code of the compiled path the team's later word on the language, and that the sound ground is this: the Working Draft's power, with a rational result at a signed exponent, was never built on either path, and the compiler's prelude's power, which gives `ZZ32`, `NN32` and `NN64` each a power of its own type, is the only one built (foundations judgement section 3; prelude sweep, prelude-lens.md section 2.2, P5). At his page comment of 2026-10-29 06:57 UTC the curator reads the same fact as the team's later decision winning: the Working Draft's power was never implemented, and the prelude's was. Which reading of the compiled path's code holds is his question, and it decides other findings like this one. The decision stands under either reading.
EOF
)"
```

## P-154, list order

Correction: the old Why called the draft `Fortress.PartialTotalOrders.fss` the team's later code. Its date cannot be shown against the specification's sentence. The decision stands on his acceptance.

Source: `explorations/reviews/foundations/evidence/corrections/c1/judgement.md`, "For the coordinator, not the curator" (which corrects the run's own note on the date); finding P-154; the evidence map, `explorations/reviews/foundations/tenets-evidence.md`, tenet 2 (c).

```bash
python3 explorations/coordinator/tools/record.py note P-154 \
  --from 'reviews/foundations/evidence/corrections/c1/judgement.md#For the coordinator, not the curator' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
the grounding of the Why: the old text called the draft `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140` the team's later code, but its date cannot be shown. Its first commit at that path is the parentless snapshot `5a68404fd` (2012-07-19), and both its lexicographic traits are already in `eeda9cd95` (2007-09-26), under `StandardLibrary/advanced/`. The specification's sentence that lets a list's order be partial where its elements' order is (`Specification/advanced-lib/algebraic-constraints.tex:519-522`) is in a file that first appears in the parentless snapshot `26718e298` (2011-12-06), and `git blame` takes its lines to `5a68404fd`, so its date before the team's snapshots is unknown too (foundations evidence map, tenet 2 c). The decision stands on his acceptance of 2026-10-20, the block that added the entry.
EOF
)"
```

## P-158, the abstract members (finding b)

Correction: the team's export check that counts every api member dates from 2009, by Sukyoung Ryu, not from 2012. The 2012 commits are parentless snapshots.

Source: `explorations/reviews/foundations/evidence/corrections/p/checks.md`, "5. The export-check dates"; finding P-158 (b).

```bash
python3 explorations/coordinator/tools/record.py note P-158 \
  --from 'reviews/foundations/evidence/corrections/p/checks.md#5. The export-check dates' \
  --by "the corrections' final writer (Opus)" \
  --note "$(cat <<'EOF'
correcting the date in the Why, "the team's export check of 2012": the team's check that refuses a component trait or object which leaves out a member of its api's trait or object, abstract members included, is Sukyoung Ryu's `equalListMembers` of 2009-03-10 (`edb516dba`), in its last form of 2009-04-13 (`77a8dd706`), with its messages improved on 2009-05-08 (`ac0d41de0`). The 2012 commits `5a68404fd` and `a9c625b1e` are parentless snapshots, not where the check was written. The check quoted the specification's export rule on 2009-02-03 (`80d8c678a`).
EOF
)"
```
