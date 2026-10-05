# The checker count and the distance to the switch-over

Both measurements run the compiled type checker over the interpreter's library. That library becomes the compiler's library at the switch-over, when the compiler's own prelude (CompilerLibrary, CompilerBuiltin, CompilerAlgebra) is deleted. The two numbers say how far the checker is from accepting it. A zero is necessary, not sufficient.

- The checker count is the number of errors that the checker reports on each api before that api's early return. The checker stops checking an api at its first errors. The interpreter's prelude is in scope. The table has one row for each api, then `#total`, `#locations`, `#crash`, `#cache` and `#shadow`. The rows for each api count each error twice; `#total` does not.
- The distance runs every stage of every unit, whatever the earlier stages reported. It covers the twelve prelude apis and their twelve components in one JVM. It counts every distinct error by kind, by root-cause class and by unit, and each crash. Its setting, `any`, is the compiled path with the implicit bound `Any`.

## Running them

Both need only built classes (`ant compileAll`): no library order and no warm cache. They use private caches and write nothing in the tree. Run them from the tree's root, after you set up the call:

    explorations/coordinator/tools/checker-count/run.sh <tree>/tmp/cc/checker-count.txt <tree>/tmp/cc
    explorations/coordinator/tools/distance/run.sh <tree>/tmp/dist/distance.txt <tree>/tmp/dist
    explorations/coordinator/tools/distance/compare.sh <last-landed-distance.txt> <tree>/tmp/dist/distance.txt

- The count takes about 20 s on an idle machine, and up to about 2.5 min beside other jobs.
- The distance runs one JVM on one busy core with 4 GB. It takes 13 to 24 minutes, mostly on `FortressLibrary`. Start it in the background and poll its log (`session.md`).
- The distance's third argument, `walk` or `compile`, runs another setting. Use it only to compare with older measurements. Leave it off when you compare with a landed table.
- `compare.sh` prints `DISTANCE DOWN`, `UP` or `SAME` with both totals, or `FIRST`, `NO TABLE`, `SETTING CHANGED` or `SHADOW STALE`. Then it prints each kind, class and unit whose count moved, and each crash row that went or came. It always exits 0.
- A run's list of sites, one row for each error, is `errors.tsv` in its scratch directory. The landed list is `explorations/compile-ladder/gate/distance-sites.tsv`, which each landing overwrites.

## Your before: the landed tables

Do not run a stage to get a before on code that has a landed table. Open the last landed tables:

    git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt'
    git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/distance.txt'

Use them with `explorations/compile-ladder/gate/distance-sites.tsv`.

- Run each stage once, on your final code. Your tables tie each moved row to your edit. A gate that runs on a tree with other changes in it mixes their effects, and the effects of two changes do not add.
- In your report, quote the totals and the moved rows, with the command. The table file is scratch: do not commit it.
- Do not run a stage's driver on chosen components of the library on code that the full stage will measure.
- If a commit already has a table, read that table. Do not run the stage again on that commit.

## Reading a change

- Neither number is red on its own. A fix can raise the count: if an api gets past its early errors, the checker shows errors that were hidden. Tie every new or risen row to a named edit.
- The distance varies by 2 to 4 errors between setups. The varying errors are in the bodies of big operators typed at their element, and in the type that a join infers for an array body. Three root-cause classes of the distance table move: BR (a reduction's body typed as the element), V2 (a sized array's body or factory) and O1 (overloading on the same parameter type). An overloading error may also name another pair of the LEXICO, SQCAP or INVERSE declarations. Repeated runs of one setup are identical, site for site. The cause is not known.
- If an edit moves the line of a crash row, the row prints as one gone and one new.
- The overloading checker's memo is off in both stages (`-Dfortress.analyzer.overload.cache=false`, the `#cache` row). With the memo on, the count would depend on the build order.

## Edits that break the tools

- The count runs a copy of `compiler/StaticChecker.java` ahead of the build, and records the tracked file's checksum (`STOCK_SHA` in `checker-count/run.sh`). If you edit `StaticChecker.java`, the `#shadow` row goes stale, and a stale shadow turns the gate red. So update the copy under `checker-count/shadow-src/` and the checksum in the same change.
- At every run, the distance makes its shadows from the tracked sources by text edits (`distance/shadow-patch.py`, `distance/add-patch.py`). Each edit must match exactly once. The patched files are `StaticChecker.java`, `phases/TypeCheckPhase.java`, `phases/DesugarPhase.java`, `phases/CodeGenerationPhase.java`, `codegen/CodeGen.java`, `Desugarer.java` and `nodes_util/NodeComparator.java`. If your edit there breaks a match, the run stops before the checker starts: `#shadow STALE`, and no total. So fix the patch scripts in the same change.

## Edits that cannot move them

Both stages run only the compiler's phases, which read no test, no text and no record. If every path of your edit is under the paths below, run neither stage, and name the paths in your report:

- `explorations/`, `Specification/`, `Documentation/`
- a test corpus: `ProjectFortress/tests/`, `ProjectFortress/*_tests/`
- the test harness: `ProjectFortress/src/com/sun/fortress/tests/`
- walk's evaluator and natives: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` and `interpreter/glue/`

Any other path may move them. After an edit there, run both stages once on your final code. Such paths include the sources of `Library/` and `ProjectFortress/LibraryBuiltin/`, the parser, the disambiguator, the desugarers, `scala_src/`, the code generator, `Shell` and the phase order. The rest of `interpreter/` is not in the list above, so it counts as any other path.
