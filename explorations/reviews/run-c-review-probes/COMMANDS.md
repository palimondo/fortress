# Reviewer probes for the Phase 1 review of Run C

Environment for every Fortress command below:

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx4g -Xss64m"
```

| file | command | result |
|---|---|---|
| `recheck_threads1.txt` | `FORTRESS_THREADS=1`, from `explorations/run-c/src`: `../../../bin/fortress MicroGptFlatCheck.fss` | exit 0, 36 PASS, 0 FAIL, 451 s. No cold-cache failure on the first run. |
| `recheck_threads4.txt` | same at `FORTRESS_THREADS=4` | exit 0, 36 PASS, 0 FAIL, 226 s |
| `recheck_vs_shipped.diff` | `diff explorations/run-c/checks/threads1.txt recheck_threads1.txt` | six timing fields and the total; no measured value differs |
| — | normalise `( … ms)`, `total … s` and the `threads N` header in all four check files, then `md5sum` | all four `cca23bd8f8436e00db305134ec078ce0` |
| `regen_goldens/`, `goldens_regen_diff.txt` | `python3 goldens/extract_goldens.py /home/user/fortress` in a scratch directory, then diff each file against `explorations/run-c/goldens/` | all eight identical |
| `RvwParse.fss`, `RvwParse.out` | `./bin/fortress RvwParse.fss` — the run's `parseFloat` copied verbatim from `MicroGptFlat.fss:150-178`, on four weight-file tokens | `0.20683639988133196` → `0.206836399881332`; `0.0018616970326810873` → `0.0018616970326810877`; `¯0.22538753716769877` → `-0.2253875371676988`; `¯0.04273180935726127` exact. A Python emulation of the same routine over all 4192 tokens: 696 values 1 ulp off Python's correctly rounded parse, 3 values 2 ulp, worst absolute 5.55e-17. |
| `g140_strtofloat.out` | `./bin/fortress explorations/run-c/probes/g140_strtofloat.fss` | `strToFloat "-1.5" = -28.5`; `Overflow of ZZ32 100000000000000000` at `FortressLibrary.fss:4196`. Row 140 as claimed. |
| `g141_split.out` | `./bin/fortress explorations/run-c/probes/g141_split.fss` | `pieces of "a b  c".split(): 0`. Row 141 as claimed. |
| `transcript_tool_inputs.txt` | every `tool_use` input of the run's transcript, in order, with line numbers and timestamps | 108 calls; no excluded path; two `git log --oneline -3` |

Also checked without a saved artefact: the weight files and `goldens/P0.txt`
carry the same digit strings (4191 of 4192 tokens character-identical once `¯`
is read as `-`, the one exception `E-05` against `e-05`), which is why the
check's loader line must print 0.0.
