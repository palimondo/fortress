# Mechanical check of c10, the judge's files, base c124c6b65

## Row 900, rewritten (989 characters)
- lengths: row 989 of 1,200, claim 269 of 300, notes 608 of 700
- reproducer `none`: exists
- citations:
  - `Library/File.fss:79` (Library/File.fss): no word to check; reads: write(x:String):() = x.writeOn(self)
  - `Library/File.fsi:102` (Library/File.fsi): holds FileWriteStream, FileStream, WriteStream; reads: object FileWriteStream(fileName:FlatString) extends { FileStream }
  - `Library/File.fss:66` (Library/File.fss): words moved: write(x:String) at :79; x.writeOn(self) at :79; writeOn at :79; reads: object FileWriteStream(fileName:FlatString) extends { FileStream }
  - `Library/File.fss:79` (Library/File.fss): words moved: FileStream at :23,66; reads: write(x:String):() = x.writeOn(self)
  - `Library/Stream.fsi:64` (Library/Stream.fsi): words moved: WriteStream at :32,35,69; reads: abstract flush():()
- in the old line, not in the new: `File.fss`, `File.fss:79`, `s.writeOn(self)`, `write(s:String)`
- every check passes

## Row 901, rewritten (681 characters)
- lengths: row 681 of 1,200, claim 211 of 300, notes 358 of 700
- reproducer `none`: exists
- citations:
  - `Library/File.fsi:131` (Library/File.fsi): words moved: FileWriteStream at :97,100,102; reads: flush():()
  - `Library/File.fss:66` (Library/File.fss): holds object FileWriteStream; reads: object FileWriteStream(fileName:FlatString) extends { FileStream }
  - `Library/Stream.fsi:64` (Library/Stream.fsi): words moved: WriteStream at :32,35,69; reads: abstract flush():()
- in the old line, not in the new: `o = FileWriteStream("tmp/review-rows/flush-out.txt"); o.write("x\n"); o.flush()`, `tmp/review-rows/flush-out.txt`
- every check passes

## Row 747, rewritten (1049 characters)
- lengths: row 1049 of 1,200, claim 204 of 300, notes 698 of 700
- reproducer `explorations/perf-probes/integer-power/REPORT.md`: exists
- citations:
  - `Library/FortressLibrary.fss:4597` (Library/FortressLibrary.fss): words moved: SUM[\ZZ32\] at :4594,4610; fail[\T\] at :54; reads: fail[\ZZ32\]("strToInt(" s.asString "," radix "): non-digit " s[i].asString)
  - `Library/FortressLibrary.fsi:37` (Library/FortressLibrary.fsi): words moved: strToInt at :2618,2621; reads: fail[\T\](s:String):T
- in the old line, not in the new: `Library/FortressLibrary.fss:4544-4548`
- every check passes

## Row 49, rewritten (1149 characters)
- lengths: row 1149 of 1,200, claim 258 of 300, notes 669 of 700
- reproducer `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss`: exists
- citations:
  - `LHSEvaluator.java:140-145` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java): no word to check; reads: } else {
  - `Evaluator.java:854-861` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): holds IUOTuple; reads: public FValue forArrayElements(ArrayElements x) {
- in the old line, not in the new: `Array`, `Evaluator.java:725-733`, `LHSEvaluator.java:139-145`, `[\T, 0, n0, …\]`
- every check passes

## Row 106, rewritten (1032 characters)
- lengths: row 1032 of 1,200, claim 180 of 300, notes 689 of 700
- reproducer `none`: exists
- citations:
  - `IUOTuple.java:116-122` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/IUOTuple.java): words moved: current < 0 at :187,201; reads: for (int i = 0; i < extents.length; i++) {
  - `IUOTuple.java:113` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/IUOTuple.java): words moved: extents.length at :116,129,184; current < 0 at :187,201; reads: setLengths(new int[rank], new int[result_rank], new int[rank][]);
  - `IUOTuple.java:199-205` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/IUOTuple.java): words moved: extents.length at :116,129,184; reads: } else {
  - `explorations/run-b2/probes/g1d_paste1.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g1d_hcat.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `run-b2/probes/g1d_hcat.fss`
- every check passes

## Row 142, rewritten (1129 characters)
- lengths: row 1129 of 1,200, claim 214 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `BuildEnvironments.java:780-794` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): no word to check; reads: } else {
  - `explorations/run-c/probes/p08a_literal.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Type mismatch binding (27,16,27,16,16,16,16,64,16): (Int,Int,…) (type (Int,Int,…)) to shp (type Vector[\ZZ32,9\])`, `[0#9][ 27 16 27 16 16 16 16 64 16 ] shp[7] = 64`, `explorations/run-c/probes/`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 900: row 900: rewritten (989 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 901: row 901: rewritten (681 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 747: row 747: rewritten (1049 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 49: row 49: rewritten (1149 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 106: row 106: rewritten (1032 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 142: row 142: rewritten (1129 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 6 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 6 lines, 0 failing, every check passes.
