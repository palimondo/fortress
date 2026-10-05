# The checker count and the distance to the switch-over

Both run the compiled type checker over the interpreter's library: the one library that becomes the compiler's at the switch-over, when the compiler's own prelude (CompilerLibrary, CompilerBuiltin, CompilerAlgebra) is deleted. They say how far the checker is from accepting it. A zero is necessary, not sufficient.

- The checker count: the errors the checker reports on each api before that api's early return (the checker stops checking an api at its first errors), with the interpreter's prelude in scope. Its table has one row per api, then `#total`, `#locations`, `#crash`, `#cache` and `#shadow`. The per-api rows count each error twice; `#total` does not.
- The distance: every stage of every unit run whatever the earlier stages reported, over the twelve prelude apis and their twelve components in one JVM, counting every distinct error by kind, by root-cause class and by unit, plus each crash. Its setting, `any`, is the compiled path with the implicit bound `Any`.

## Running them

Both need only built classes (`ant compileAll`): no library order and no warm cache. They use private caches and write nothing in the tree. From the tree's root with `env.sh` sourced:

    explorations/coordinator/tools/checker-count/run.sh <tree>/tmp/cc/checker-count.txt <tree>/tmp/cc
    explorations/coordinator/tools/distance/run.sh <tree>/tmp/dist/distance.txt <tree>/tmp/dist
    explorations/coordinator/tools/distance/compare.sh <last-landed-distance.txt> <tree>/tmp/dist/distance.txt

- The count takes about 20 s on an idle machine and up to about 2.5 min beside other jobs.
- The distance runs one JVM on one busy core with 4 GB: 13 to 24 minutes, most of it on `FortressLibrary`. Start it in the background and poll (the `claude-session` skill, long commands).
- The distance's third argument, `walk` or `compile`, runs another setting, only for comparison with older measurements. Leave it off when comparing with a landed table.
- `compare.sh` prints `DISTANCE DOWN`, `UP` or `SAME` with both totals (or `FIRST`, `NO TABLE`, `SETTING CHANGED`, `SHADOW STALE`), then each kind, class and unit whose count moved and each crash row that went or came. It always exits 0.
- A run's per-site list, one row per error, is `errors.tsv` in its scratch directory. The landed one is `explorations/compile-ladder/gate/distance-sites.tsv`, overwritten at each landing.

## The landed tables are your before

Do not run a stage to get a before on code that has a landed table. Open the last landed tables:

    git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt'
    git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/distance.txt'

together with `explorations/compile-ladder/gate/distance-sites.tsv`. Run each stage once, on your final code. Do not run a stage's driver on chosen components of the library on the code the full stage will then measure. Nobody runs a stage again on a commit whose table exists; read that table.

## Reading a change

- Neither number is red on its own. A fix can raise the count, because an api that gets past its early errors shows errors that were hidden, and two changes' effects do not add. Tie every new or risen row to a named edit.
- The distance varies by 2 to 4 errors between setups: in big operators' bodies typed at their element, and in the type a join infers for an array body (the classes BR, V2 and O1 move); an overloading error may name another pair of the LEXICO, SQCAP or INVERSE declarations. Repeated runs of one setup are identical site for site. The cause is not known.
- A crash row whose line moved, because an edit above it moved it, prints as one gone and one new.
- The overloading checker's memo is off in both (`-Dfortress.analyzer.overload.cache=false`, the `#cache` row): with it on, the count would depend on the build order.

## Edits that break the tools

- The count runs a copy of `compiler/StaticChecker.java` ahead of the build, and records the tracked file's checksum (`STOCK_SHA` in `checker-count/run.sh`). An edit to `StaticChecker.java` makes the `#shadow` row stale, and a stale shadow turns the gate red. Update the copy under `checker-count/shadow-src/` and the checksum with the edit.
- The distance makes its shadows from the tracked sources at every run, by text edits that must each match exactly once (`distance/shadow-patch.py`, `distance/add-patch.py`), in `StaticChecker.java`, `phases/TypeCheckPhase.java`, `phases/DesugarPhase.java`, `phases/CodeGenerationPhase.java`, `codegen/CodeGen.java`, `Desugarer.java` and `nodes_util/NodeComparator.java`. An edit there that breaks a match stops the run before the checker starts: `#shadow STALE`, no total. Fix the patch scripts with the edit.

## Edits that cannot move them

Both stages run only the compiler's phases, which read no test, no text and no record. An edit all of whose paths are under the following runs neither stage, and its report says so, naming the paths:

- `explorations/`, `Specification/`, `Documentation/`
- a test corpus: `ProjectFortress/tests/`, `ProjectFortress/*_tests/`
- the test harness: `ProjectFortress/src/com/sun/fortress/tests/`
- walk's evaluator and natives: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` and `interpreter/glue/`

Any other path may move them, and its change runs both once on its final code: the sources of `Library/` and `ProjectFortress/LibraryBuiltin/`, the parser, the disambiguator, the desugarers, `scala_src/`, the code generator, `Shell` and the phase order. The rest of `interpreter/` is not on the list above, so it counts as any other path. The gate measures both on the landing tree either way.
