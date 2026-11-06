# Judgement of chunk c37, run c-run1, base c124c6b65

- **113: apply** (rewrite). The check passes it; the line is `rows.rewrite`'s unchanged (pin re-pointed `Library/FortressLibrary.fss:1503` to `:1640`).
- **126: apply** (rewrite), with the check's one correction: "A getter is a method, and a naked reference reaches fields;" replaced by "In `object Node(x: RR64)`, `getter grad(): RR64 = 2.0 x` is a method, while a naked reference reaches fields such as `x`;" (source: `git show e879b6a44^:explorations/gap-ledger-probes/g24.fss`, read by me: it declares exactly that object and getter).
- **320: apply** (rewrite), with the check's one correction: "so `fortress link` and walk refuse" replaced by "so `fortress link` and walk, through `GraphRepository.java:347`, refuse" (source: `ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:347` calls `Linker.whoIsImplementingMyAPI`, `:417` prints 'Could not find an implementation for API', read by me). Row 1,150 of 1,200.
- **323: keep, passes.** The row keeps its line; nothing to apply.
- **474: keep, passes.** The row keeps its line; nothing to apply.
- **830: apply** (rewrite). The check passes it (`siblings: 126` added); line unchanged.
- **842: apply** (rewrite). The check passes it (closed siblings 801, 816 dropped, `equalMember`/`equalAbstractMember` pinned, story dropped); line unchanged.
- **878: keep, passes.** The row keeps its line; nothing to apply.

No close, duplicate, silent line or pair in this chunk, so `final.closes`, `final.dups`, `final.silent` and `final.pairs` are empty.
