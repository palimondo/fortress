# Judgement of chunk c33 (c-run3, base c124c6b65)

`mech.py --final`: every check passes. No prober ran this chunk's questions (no `runs.md` in the run). Applied 6, held 6.

- **29: apply.** The check passes; `mech.md` passes. Line as written.
- **11: apply.** The check passes. Line as written.
- **97: apply.** The check passes. Line as written. Its pair 97/416 goes to `final.pairs`.
- **735: apply, corrected.** The check fails the clause "no library type is so". Correction made from the check's sources: read the extends clauses of every library type that names `DelegatedIndexed` at the base (`FortressLibrary.fss:2060`, `:2139`, `:4341`, `List.fss:255`, `RangeInternals.fss:1128`, `:1194`, `String.fss:353`, `Reflect.fss:340`, `FlatString.fss:34`, `CaseInsensitiveString.fss:22`): `DelegatedIndexed` is last in each but the two `RangeInternals` traits, where `ActualRange2D`/`ActualRange3D` follow it, and their chain (`Range2D`/`Range3D`, `Range`, `StandardPartialOrder`, `Contains`) gives `size` no body. The clause now reads "by reading, no library type puts it before another `size` body". For room: "Methods are keyed" to "Methods keyed", "in the extends clause's order: with ... and ..., " to "by the extends order: ..., ...: ", "`DelegatedIndexed` declares `size` (...): " to "`DelegatedIndexed`'s `size` (...) wins: ", "`Sized`'s `size` 77" to "`Sized`'s 77", "The test is `{ B, A }` with `A` abstract." to "The test: `{ B, A }`, `A` abstract.".
- **265: apply, corrected.** The check fails "`aplCall` reads the top (`:1172-1177`)": `aplCall` pushes, calls `f()` and pops in a `finally`; the reads are `topF`/`topA`/`topO` (`AplCore.fss:1165-1167`, read at the base). Now: "the callee reads the top (`topF`/`topA`/`topO`, `:1165-1167`) inside `aplCall`'s `try` (`:1172-1177`)". For room: "a strand written as a tuple" to "a tuple"; "outside any `atomic`" to "outside `atomic`"; "`aplEachT2` and `aplEachT3` (...) sequence their calls in a block, and the model" to "`aplEachT2`, `aplEachT3` (...) sequence their calls; the model" (the workaround still says a block).
- **258: apply, corrected (CONTESTED kept).** The check fails the notes for not naming the open point. Added from the row's own facts, in place of "It runs; the type is contested: a tuple type is a subtype of `Any` and of nothing else.": "Unsettled: the specification makes a tuple type a subtype of `Any` alone, the APL base relies on walk's accepting it, and no POSITIONS entry chooses." For room, as the check proposed, "row 252's strand-as-tuple on a computed strand" to "row 252's strand-as-tuple"; also "when every cell is a matrix" to "when all cells are matrices", "Only matrix cells do so: a vector cell result is a nested array and stays" to "A vector cell's nested array result stays", "`Any` as the result kills" to "An `Any` result kills", "the one declarable type" to "the one type left". Its sentence on row 240 waits on row 240's measure (queue).
- **30: hold.** A measure; no prober ran it. The check's correction to its fourth outcome is carried in its queue item.
- **145: hold.** A measure; no prober ran it.
- **164: hold.** A measure; no prober ran it.
- **240: hold.** A measure; no prober ran it; row 258's dependent sentence waits on it.
- **297: hold.** A measure; no prober ran it. Its pair 297/416 is held with it (its diagnosis is pending the measure) and is not in `final.pairs`.
- **444: hold.** A measure; no prober ran it. Its XXX sentence is now row 735's reproducer.

Closes, duplicates, silent: none (the writer's files are empty; no row here is NEGATIVE-VERIFIED beside `silent`).
