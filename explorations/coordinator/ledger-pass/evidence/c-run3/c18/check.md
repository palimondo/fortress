# Check, chunk c18 (base c124c6b65)

mech.py: 4 lines, 0 failing. No closes, duplicates, questions to measure or pairs.

## Row 864: pass
- Fidelity: at c124c6b65, `StaticNativeApp.java:189-193` holds the declarer self check ('no Java type carries ... the type of self.'); `MethodClosure.java:36` is the constructor's `super(within, fndef, false, definer)`. The reproducer at the base makes no `Box` instance and prints 'loaded', as the new sentence says.
- Nothing lost: `StaticNativeApp.java:137-141` was a stale pin (d1228e1f0 is not in the base's history; 137-141 now read `declaringComponent`); repinned, so false as a location, its history line keeps it.
- Present, status (NEGATIVE-VERIFIED beside `silent`, item 265), form: pass.
- Cold read: matches. "siblings" is a template term; not a worker's stumble.

## Row 883: fail (cold read)
- Fidelity: pass. `compiler/Parser.java:157-159`, `:117`, `:132` and `GraphRepository.java:1025` hold at the base. Dropped tokens `Parser.java`, `Parser.java:117`, `:132` are kept, now disambiguated as `compiler/Parser.java`.
- Failure: the cold read's "Could not resolve" (3): the notes name three full parses (`readCUFor` -> `importCollector`, `macroParse` -> `importCollector`, `macroParse`'s own parse) against the claim's four. A worker reducing the parses would stumble on it. Source: `importCollector` has two callers at the base (`git grep importCollector c124c6b65`: `compiler/Parser.java:117` and `GraphRepository.java:1025`), and `readCUFor` is called from `GraphRepository.java:438` and `:449`; the row's own counts for a component without a helper (3 import-only parses, one of them `macroParse`'s) put two calls on `readCUFor`. Also cold read (2): "parses the whole component, rewritten" leaves unsaid what is rewritten; the code's comment at `Parser.java:159` says "its builtinPrimitive bodies rewritten".
- Correction: replace the Notes cell with (661 characters):

  For such a file `Parser.importCollector` parses the whole component, its `builtinPrimitive` bodies rewritten (`compiler/Parser.java:157-159`, at c124c6b65); `GraphRepository.readCUFor` calls it, twice in one compile (`repository/GraphRepository.java:1025`), and `macroParse` calls it again (`compiler/Parser.java:117`) and then parses the file (`compiler/Parser.java:132`). An instrumented copy of `Parser` printing each `parseCU` and `preParser` call, `fortress compile` of a new component with one binding: 4 full parses and 4 pre-parses; of one without: 1 full parse, 1 pre-parse and 3 import-only parses. A cost, not a wrong answer: no program observes it.

## Row 888: pass
- Fidelity: `CodeGen.java:2033` at the base is `mv.visitTryCatchBlock(l0,l1,l2, ...FException)`, before `body.accept(this)` at :2035. d96242f0a, the one commit since the row touching `CodeGen.java`, does not touch `forTry` or `visitTryCatchBlock`, so the probe's output still stands for the base.
- Nothing lost: `CodeGen.java:2032` repinned to :2033 (shifted +1); the old line is in the history.
- Present: "On the old code" removed; pass. Reproducer is an XXX compiled test with its Link test named; pass. Cold read: matches.

## Row 892: pass
- Fidelity: `SKEPTIC.md:28` at the base reads "`TestCallDiff`: `run()` calls `test t()`. The rung's compiled run and walk on both codes print 'in test', 'DONE'." 8833d89c5 (rung C) is in the base's history, so "compiles and runs on the compiled path" holds without the batch clause.
- Nothing lost: `TestCallDiff.fss` was never a tracked path (signals: path-gone, never), so false as a path; the notes now say "never in the tree". The command `bin/fortress compile TestCallDiff.fss && bin/fortress run TestCallDiff` is kept in the notes in substance (compile, then `bin/fortress run TestCallDiff`). The dropped guard message has its home in row 823 (FIXED) and the history.
- Present: batch story removed from the claim; pass. Reproducer `none` with command and output in the notes; pass. Cold read: matches; its points on "refer to" against "calls" and walk's share do not change what a worker builds (a checker refusal).
