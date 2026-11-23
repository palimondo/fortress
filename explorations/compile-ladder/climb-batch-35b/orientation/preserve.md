<!-- The orientation workflow's preservation check, update mode, for climb batch 35b's landing: the one admitted finding (F-403) against the rewritten sentence of the SEQV rule; no failures, two notes on what the sentence leaves to the core and to the coordinator. -->

# Preservation check: climb batch 35b, update

**Inputs**

- Old: `.claude/skills/fortress-repo/references/revival-changes.md` at `main` `ddfa65d880` (last changed `2dd2936b4e`), 34,761 bytes.
- New: `orientation.md` in this folder, 34,750 bytes. `diff` of the two prints one changed line, `:57`, and nothing else.
- `admission.md` (one admitted entry, F-403), `sources-mapping.md`, F-403 (`facts-extract.sh 'F-403'`, `FACTS.md:300`), `references/sources.md:1124` and `:1129`.
- The code and tests, read: `Library/FortressLibrary.fsi:2792-2794`, `.fss:4923-4924`; `Library/CompilerLibrary.fsi:31`, `.fss:71`; `LibraryBuiltin/CompilerBuiltin.fsi:465-466`; `parser_util/precedence_resolver/Operators.java:150,1250` and `operators.txt:180,210`; `tests/BooleanEquivalenceWalk.fss`; `one_library_tests/OneLibraryBooleanEquivalence.test` (`compile` only); gap-ledger rows 184 (FIXED), 1119 and 1120.

## Failures

None.

## The admitted finding

**F-403**, "Traits and objects", the rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)".

- Old: "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`."
- New: "The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only."

Is the rule in the new text? Yes. The admission's correction is that the interpreter's library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans. The new sentence states that, and its clause "for booleans only" is the clause the admission's mistake (c) asks for.

Conditions, exceptions and path differences:

- Scope. The old and new sentences are both scoped to "the interpreter's library", which `:3` sets against "the compiler's library". The new sentence makes no claim about the compiler's prelude. That is right, because the prelude differs: `NEQV` over `Any` (`CompilerLibrary.fss:71`, row 1119), and `EQV`/`NEQV` as methods of `Boolean` (`CompilerBuiltin.fsi:465-466`).
- "Only" holds for the interpreter's library. Outside `Library/incomplete/` (not built) and the prelude files, the only declarations are `FortressLibrary.fsi:2793-2794`. AplCore's `≡` and `≢` over `RR64` and arrays (F-403) are in `explorations/apl/base/AplCore.fss`, not in the library.
- Walk against the compiled path. The removed clause "walk stops on it (row 184)" is false: row 184 is FIXED (`e5cf04d47`), and `BooleanEquivalenceWalk.fss` runs both operators under walk. The new sentence claims nothing for compiled runs, which matches the admission's "No compiled-run claim": the one-library test is `compile` only.
- The removed workaround "write `a <-> b`" is dropped as the admission directs (P-180; review Part 3, item 1). `<->` is still declared (`FortressLibrary.fsi:2792`), so a worker who writes it still gets a working program. Nothing is lost.
- The rest of `:57-64` is byte-identical: the `≣` spellings, `≡` as `EQV` or `EQUIV`, the library's `=` over `Any`, the four `SEQV` bullets, and the prelude's "Until the switch-over" sentences.

Does the sentence say more than its source? No.

- "declares it": `FortressLibrary.fsi:2793`; F-403.
- "its negation `≢`": `NEQV`'s body `NOT (a EQV b)` (`.fss:4924`), which F-403 calls the specification's definition of `≢`.
- "(`NEQV`)": the ASCII name for `≢` (`Operators.java:150`; `operators.txt:210`, "not identical to, neqv"). The new sentence does not name `NOTEQUIV`, which neither path accepts (row 1120).
- No P-N is cited. That matches the admission, which says the top-level form is the batch plan's default and not the curator's decision (F-403).
- `sources-mapping.md` names F-403, `FortressLibrary.fsi:2793-2794` and `BooleanEquivalenceWalk.fss` as the source. It also flags `references/sources.md:1129`, which gives the old clause's source (row 184, `<->` at `FortressLibrary.fss:4768`) and must change with the install.

## Notes (not failures)

1. **The type-error clause is not written.** F-403's headline and the form the admission suggested ("so on other values either is a type error") are not in the new text. The new sentence leaves it implied by "for booleans only".
   - Under walk, `≡` on a program's object fails at the call: 'Unification error: ... EQV param 1 (a:Boolean) got arg Pt'. A compile refuses it statically: 'Could not check call to operator EQV'.
   - Both behaviours follow from the core (`SKILL.md`, "The phases": walk finds a type error only at run time, as a failed dispatch; a type error stops the compile).
   - A worker who reads "for booleans only" does not reach for `≡` on objects. So no worker acts differently.
   - The judge may still want the clause back, because the admission's mistake (c) names the type error. It costs about 45 characters.
2. **The prelude's `≢` over any values (row 1119) is not stated.** Until the switch-over, `Pt(1) ≢ Pt(2)` compiles and prints `true` under the compiler's prelude.
   - The paragraph's last two sentences state the prelude's departures for `=` and `≣`, but none for `≢`.
   - The old part never stated it either, and the admission excludes it ("No sentence for the prelude or the walls"; P-180). Its home is the coordinator's list (review Part 4, with the prelude's switch-over).
   - So nothing the old part held is lost. This note is for the judge only.

## Count

- 1 admitted finding checked (F-403). Its rule is in the new text, its scope is kept, and no sentence goes beyond its sources.
- 1 changed line checked against the old part. The other lines are identical (`diff`).
- 0 failures.
