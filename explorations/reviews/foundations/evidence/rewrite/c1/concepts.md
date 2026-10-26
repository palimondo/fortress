<!-- Concepts that chunk c1 of the foundations rewrite (P-26, P-37, P-43, P-42, P-7, P-158) leans on, each with the entries that use it and where it should be defined for every worker. -->

# Concepts for chunk c1

| Term | Used by | Where to define it |
|---|---|---|
| the three layers (the language; the team's implementation on the JVM; Java interoperability) | P-26 (defined there), P-37, P-42, P-43 | The `fortress-repo` core, as a glossary term. Workers weigh grounds too: a worker who cites a `VerifyError` as a reason to change a specification sentence crosses layers. |
| compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`; the compiled path's library until the switch-over) | P-26, P-37, P-43, P-158 | The `fortress-repo` core, beside **one library**. |
| specialised overload; stamping | P-26 (defined there) | The `fortress-repo` core or the compiler area part. `references/exploring.md:18-22` lists "compiled code specialised to each instantiation" and "the compiled number tower, which they flattened in 2009 and 2010" as the team's later word; under the new P-26 the first is stamping (the implementation) and the second is earlier code, not the later word. That list needs the same correction. |
| the distance and its components (the stage that counts the compiled checker's errors over the one library's twelve components; the fourteen with `List`'s two imports) | P-37 | The coordinator skill already defines it (`references/batch.md:30`); for workers, the short orientation. F-53 owns the count. The cold reader could not name the twelve. |
| type group (the part of the team that built the type checker and the compiler) | P-26, P-43 | P-26 no longer glosses it; `fortress-repo` `references/exploring.md:16` defines it for workers. |
| export check (the compiled checker's check that a component declares every member of the api that it exports) | P-158 | The checker area part. |
| the export check's count (added by the judge: `equalListMembers` in `ExportChecker.scala`, which counted every member of the api against the component's; `031c38bbc` made it skip api members written `abstract`, and row 816's repair restores it) | P-158 (state line) | The checker area part, beside the export check. Row 816 holds it. The second cold reader could not tell what "count" names. |
| shape (added by the judge: one design that the compiler's prelude and the one library declare differently, such as the number types' hierarchy, `fail`'s result type or `String`'s concatenation; the foundations judgement, section 3) | P-37 | The coordinator skill, beside P-37's rule; workers meet it only through a brief. The second cold reader read it as "the same construct or design point", which is right. |
| route A, route C (the flat number tower under the exclusion rule; a nested tower under the forest rule of the 2012 patent applications) | P-43 | P-95 defines route C; nothing more is needed. |
| climb batch | P-42 (state line) | The coordinator skill already defines it. |
| gap-ledger row ("row N") | P-42, P-158 | The `fortress-repo` core names the gap ledger (`SKILL.md:145`), and the coordinator's `references/record.md` defines "row N"; nothing more is needed. |

Skill text that the new entries contradict, for the coordinator:

- `fortress-repo` `references/compiler.md`: row 412's `Object` bound lasts "until the switch-over"; under P-42 one line in `Shell.java` ends it. The specification's callout (`Specification/basic/trait-parameters.tex:62-65`) says the same and should change with that line.
- `fortress-repo` `SKILL.md`, "Static parameters": `Any` "holds tuples, functions and `()`"; under open answer 3, "functions" goes.
- `fortress-repo` `references/exploring.md:16-22`: the list of the type group's later word, as in the stamping row above.
