<!-- Concepts that the inference chunk's clean entries use and do not define, with where each should be defined for every worker; from the FACTS clarity pass of 2026-11-24. -->

# Concepts for the inference chunk

- **expected type**: the type that a call's context asks for, such as the declared type of the variable it initializes. Used by F-78, F-87, F-221, F-364, F-365. Define in the `fortress-repo` core: the checker area uses it everywhere, and F-87 lists its contexts.
- **static argument**, and **writing** one: the type or number between `[\ \]` at a call, as in `SUM[\ZZ32\]`; an unwritten one is inferred. Used by every entry of the chunk. Define in the `fortress-repo` core.
- **lone type parameter**, with its **candidates** and **narrowest candidate**: a type parameter that is the whole declared type of some argument and that no other argument fixes; its candidates are the types among which inference picks. Defined in F-137; used by F-73 (the checker, row 506) and F-141 (walk). Since both paths use it, define it in the `fortress-repo` core.
- **multifix operator declaration**: an operator declared over three or more operands, which a chain `a OPLUS b OPLUS c` runs before the binary one (`Specification`, `chained-multifix.tex`). Used by F-221, which defines it in passing. Define in the checker area part.
- **fusion**: computing one reduction of another in one pass through `distribute`, as `MAX` over `SUM`; a reduction pair answers `PossibleReductionPair`. Used by F-242, F-248, F-285. Define in the library area part.
- **big operator**, **clause form** and **reduction**: `SUM`, `PROD`, `BIG MIN` and the like; a clause form is `SUM[i <- g] body`, which desugars to a call `__bigOperator(BIG OP(), clauses)`. Used by F-59, F-221, F-242, F-248, F-285, F-364. Define in the short orientation that replaces the revival part, since microGPT's sums are reductions.
- **plain-bounded big operator** against **a big operator whose bound names its parameter** (such as `SUM`, `PROD`, `BIG MAX`, `BIG MIN`): the first has an instance at its bound, the second has none. Used by F-59, F-221, F-285, F-364. Define in the checker area part, with the reduction.
- **the distance** and **the checker count**: the checker's error count over the components that `explorations/coordinator/tools/distance/run.sh` lists, and the count stage's error count. Used by F-242, F-285. Owned by F-53; define in the `fortress-repo` core, which the gate uses.
- **walk** and **the compiled path** (the two paths): the interpreter against the checker and code generator. Used by every entry. Already in the `fortress-repo` core.
- **C4**, microGPT's flat program (`explorations/run-c4/src/MicroGptFlat.fss`), and **the quick pair**: used by F-59, F-248. Define in the short orientation.
- **F-bound**: a bound that mentions its own parameter, `T extends Rel[\T\]`. Used by F-141 (F-143 defines it). Define in the walk area part.
- **expected failure** (`XXX` test): a test whose name starts with `XXX` and that passes while the defect shows. Used by F-73, F-141, F-365. Already in the `fortress-repo` core.
- **worker's default** in a decision record (D3, D4, D5): a choice that a worker made inside a rung without the curator's word. Used by F-78, F-141. Define in the `fortress-repo` core, beside "rung".
