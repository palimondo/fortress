# count-run

A one-time count of the interpreter tests whose output a change alters. `count-run.sh` runs every program of `ProjectFortress/tests/` under walk, one JVM a test, once on the base and once after the edit; `compare-normalised.py` compares the two passes, and holds apart the tests of `unstable.txt`, whose output varies from run to run. Each script's header gives its usage.

No gate and no batch step runs it. A test's verdict is the check, and nothing compares what a test prints with an earlier run's output (POSITIONS.md, P-103, "The suite's verdict is the check."). The tool stays only for a one-time count that a decision of the curator names, taken before a change of meaning lands. The one such count left is P-68's: row 330's library rung, after the switch-over, first counts the interpreter tests whose output changes. A brief that names no such decision asks for no count.
