# Mechanical check of c10, the writer's files, base c124c6b65

## Row 49, rewritten (1070 characters)
- lengths: row 1070 of 1,200, claim 229 of 300, notes 619 of 700
- reproducer `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss`: exists
- citations:
  - `LHSEvaluator.java:140-145` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java): no word to check; reads: } else {
  - `Evaluator.java:854-861` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): holds IUOTuple; reads: public FValue forArrayElements(ArrayElements x) {
- in the old line, not in the new: `Evaluator.java:725-733`, `LHSEvaluator.java:139-145`
- every check passes

## Row 104, rewritten (994 characters)
- lengths: row 994 of 1,200, claim 186 of 300, notes 661 of 700
- reproducer `none`: exists
- citations:
  - `LHSEvaluator.java:179-203` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java): no word to check; reads: } else {
  - `explorations/gap-ledger-probes/g19.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b/probes/c02f_silent_unbound.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b/probes/c02e_pasting_variants.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `LHSEvaluator.java:178-202`
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

## Row 343, rewritten (1135 characters)
- lengths: row 1135 of 1,200, claim 235 of 300, notes 640 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/declarations.tex:426-431` (Specification-1.0-frozen/basic/declarations.tex): no word to check; reads: It is also a static error
  - `Library/FortressLibrary.fsi:45` (Library/FortressLibrary.fsi): no word to check; reads: shared[\T extends Any\](x:T): T
  - `BuildApiEnvironment.java:118-140` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java): holds getValueRaw(sname), api.unresolvedExports; reads: @Override
  - `BuildApiEnvironment.java:135` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java): words moved: getValueRaw(sname) at :129; reads: api.unresolvedExports.add(x);
  - `BuildApiEnvironment.java:132` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java): holds putValueRaw; reads: bindInto.putValueRaw(sname, fv);
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java:118-140`
- every check passes

## Row 344, rewritten (1034 characters)
- lengths: row 1034 of 1,200, claim 224 of 300, notes 615 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:45` (Library/FortressLibrary.fsi): no word to check; reads: shared[\T extends Any\](x:T): T
  - `Library/FortressLibrary.fsi:47` (Library/FortressLibrary.fsi): no word to check; reads: isShared(x:Any): Boolean
  - `Library/FortressLibrary.fsi:49` (Library/FortressLibrary.fsi): no word to check; reads: localize[\T extends Any\](x:T): T
  - `Library/FortressLibrary.fss:65` (Library/FortressLibrary.fss): no word to check; reads: shared[\T extends Any\](x:T): T = x
  - `Library/FortressLibrary.fss:67` (Library/FortressLibrary.fss): no word to check; reads: isShared(x:Any): Boolean = true
  - `Library/FortressLibrary.fss:69` (Library/FortressLibrary.fss): no word to check; reads: localize[\T extends Any\](x:T): T = x
  - `ProjectFortress/compiler_tests/ExportVarRungXApi.fsi:5` (ProjectFortress/compiler_tests/ExportVarRungXApi.fsi): holds var shared: ZZ32; reads: var shared: ZZ32
  - `explorations/compile-ladder/rung-export-var/probes/skeptic/SkKwCall.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `.fss:65`
- every check passes

## Row 841, rewritten (1114 characters)
- lengths: row 1114 of 1,200, claim 275 of 300, notes 688 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java:48-136` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java): no word to check; reads: //exporter.missingExportedVars.put(fname);
- in the old line, not in the new: `733d73574`, `WalkAbsent.fss`, `bin/fortress WalkAbsent.fss`, `compile-ladder/rung-abstract-declared/REPORT.md`
- every check passes

## Row 900, rewritten (897 characters)
- lengths: row 897 of 1,200, claim 269 of 300, notes 516 of 700
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

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 49: row 49: rewritten (1070 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 104: row 104: rewritten (994 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 106: row 106: rewritten (1032 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 142: row 142: rewritten (1129 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 343: row 343: rewritten (1135 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 344: row 344: rewritten (1034 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 841: row 841: rewritten (1114 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 900: row 900: rewritten (897 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 901: row 901: rewritten (681 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
