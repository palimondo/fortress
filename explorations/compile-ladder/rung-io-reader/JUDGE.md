# Rung R, climb batch 28: the judge's ruling

Head judged: `1bee165f` on `wip/rung-io-reader`. One contested fix: `c00f51c2`, `FileWriteStream`'s `write(x:String)`. Ruling: **upheld**. Decision: **stands**; no revert, no repair round.

## The fix

`c00f51c2` changes `Library/File.fss:56` on `9632f4e5`, `write(x:String):() = x.writeOn(self)`, into `write(x:String):() = under.write(x)` (now `Library/File.fss:57`), and adds `ProjectFortress/tests/FileWriteStreamParallelWalk.fss`. `JavaBufferedWriter`'s `write(s: String)` flattens by a `typecase` on `asFlatString` and makes one native write (`Library/FortressLibrary.fss:1949-1953`); that write is one call of `java.io.BufferedWriter.write(String, int, int)` (`compiler/runtimeValues/FortressBufferedWriter.java:47-50`, by `nativeHelpers/fileOps.java:109-111`), so one string reaches the file whole. The fix adds no `flush`; `writes`, `print` and `println` stay the team's text (`Library/File.fss:59-68`).

## What settles it

1. **The api asks for a monolithic append.** `FileWriteStream`'s `writes`: "To avoid interleaving with concurrent output to the same stream, this append step is done monolithically" (`Library/File.fsi:111-116`); `print` and `println` work "much like %writes%" (`:119`, `:122-124`). `writes` reaches `write(x:String)` whenever its joined string is not flat (`Library/File.fss:59-65`), so the leaf-by-leaf `writeOn` (`Library/String.fss:163-166`, `:493-505`) breaks the api's own promise. `WriteStream` says the same of every write stream (`Library/Stream.fss:49-54`, `:64-69`). The specification names no I/O object and says nothing of interleaved output (`grep -rn -i 'interleav\|monolithic' Specification/ --include=*.tex` finds only `parallelism.tex:90`, on scheduling implicit threads, and two unrelated hits).
2. **The library's own way writes a rope once.** The team's `Writer`, the one stream on which a rope reached `writeOn`, wrapped it in a `BufferedWriter` of size `|s|` and flushed that buffer, so the rope reached the stream in one write (`git show c2178040^:Library/Writer.fss`, lines 45-49; the glue's buffer is a `java.io.BufferedWriter(w.getWriter(), size)`, `interpreter/glue/prim/BufferedWriter.java:34-38`). Rung W kept that property by flattening and writing once (`Library/Writer.fss:31-35`), for the reason the skeptic quotes: the leaf-by-leaf form "would split a rope into its leaves, so parallel `println`s could interleave" (`explorations/compile-ladder/rung-io-writer/REPORT.md:144`, decision 7). The team's test of it names the intent: a rope "that reads as a sentence when other strings are not interleaved", printed from a parallel `for` (`ProjectFortress/tests/printing/ConcurrentPrinting.fss`).
3. **The batch's fork reads so.** Fork R2's default: "its `write`s, `flush` and `close` over `under`, as `Writer`'s are" (`explorations/coordinator/CLIMB-BATCH-28.md:406`). `Writer`'s `write(s: String)` is over `under` (`Library/Writer.fss:32-35`); the worker's head left `FileWriteStream`'s on `self`.
4. **The defect is measured and is the rung's to fix.** On `9632f4e5`, through the harness at four threads, the skeptic's test printed 'FAIL: a ZZ32: 432 =/= a ZZ32: 600; lines written by write from parallel tasks' and, on a second run, '252 =/= … 600' (`SKEPTIC.md`, finding 1, `harness-one.sh … FileWriteStreamParallelWalk.fss`); after the fix, with the seven guards, 'every line came back unbroken', 'OK (8 tests)'. The base could not break a line, since a rope stopped the run there ('Unification error: Closure/Constructor for writeOn param 1 (stream:WriteStream) got arg <Write handle to "NativeHelperReaderWalk.out"> of type FileWriteStream', `REPORT.md:59`): the rung's repair of row 900 made the broken lines reachable, so the rung carries their fix.

## Which claims were right

The worker, `REPORT.md`, "Decisions", 1, and "Where the fix belongs", last way:
- Right: rows 900 and 901 need only `WriteStream` and `flush` (`Library/File.fss:52`, `:69`). Right: the team's `FileWriteStream` flushes in none of its writes, and the fix keeps that buffering.
- Wrong as evidence: "the team's text already writes a rope through `writeOn`". That text never ran on the base (row 900, the stop quoted above), so it shows no design of the team's for a rope on this stream; where a rope did run, on `Writer`, the team wrote it once (point 2).
- Wrong: "the brief's 'its writes, flush and close over `under`' holds for the primitive writes". Fork R2 adds "as `Writer`'s are" (point 3), and `Writer`'s write over `String` is over `under`.

The skeptic, `SKEPTIC.md`, finding 1:
- Right: the measured broken lines; `File.fsi:111-116` and `:119`, `:122`; fork R2's words; rung W's decision 7; the base never broke a line. Its fix meets the api by one write per string.
- Partly right: "as `Writer`'s are" also covers `Writer`'s flush after a rope (`Library/Writer.fss:34`), which the fix leaves out. Nothing in `File.fsi` asks a write to flush (`:102-109`, `:127-128`), the monolithic append needs only the one write, and leaving it out keeps the worker's buffering point, so the omission stands; it goes to the curator below as a divergence from the fork's letter.

## The test

`ProjectFortress/tests/FileWriteStreamParallelWalk.fss` asserts each of 600 lines whole for `write`, `println` and `writes` from parallel `for`s; it asserts no crash row, no glue string and no walk message, and its three `.out` files are ignored (`.gitignore:50`, `*.out`). It failed on the worker's head and passes after (point 4). On a tree with the defect the failure is probabilistic (432 and 252 of 600 at four threads; 400 of 400 at one, `SKEPTIC.md`, "What I checked", 6, `SkConcWrite`); with the fix each line is one synchronized Java write, so the pass does not depend on the schedule.

## For the gather

- `REPORT.md:17` ("the team's `write(x:String) = x.writeOn(self)`, `write(x:Any)`, `writes`, `print` and `println` stay as they were"), `:149` and `:198` (decision 1) describe `9632f4e5`. On the landed tree `write(x:String)` is `under.write(x)` by this ruling; `write(x:Any)`, `writes`, `print` and `println` stay the team's.
- The skeptic's own items stand: `ant testSystem` counts two more walk tests than the worker's head; `FileWriteStream`'s `print` and `println` do not flush, where `WriteStream`'s do (`Library/Stream.fss:70-71`, `Library/File.fss:67-68`).

## For the curator

- `FileWriteStream`'s write of a string that is not flat makes one write and no flush (`Library/File.fss:57`), where `Writer`'s flushes after it (`Library/Writer.fss:32-35`) and fork R2's default says "as `Writer`'s are" (`explorations/coordinator/CLIMB-BATCH-28.md:406`). Ways: no flush, as landed, which keeps the file stream's buffering and its other writes' behaviour (`Library/File.fss:54-55`, `:67-68`); or a flush after it, as `Writer` and the team's `Writer` (`git show c2178040^:Library/Writer.fss`, line 48), one line, which makes a rope's write flush where a flat string's does not. Either keeps lines whole.
