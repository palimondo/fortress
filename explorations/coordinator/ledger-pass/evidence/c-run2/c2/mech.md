# Mechanical check of c2, the writer's files, base c124c6b65

## Row 318, rewritten (1001 characters)
- lengths: row 1001 of 1,200, claim 297 of 300, notes 608 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:896-928` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds CHOOSE; reads: opr |self| : IntLiteral = throw CompilerFailureDetectedAtRunTime
  - `NamingCzar.java:343` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: } else if (s.equals("Lfortress/CompilerBuiltin$IntLiteral;")) {
- in the old line, not in the new: `NamingCzar.fortressTypeForForeignJavaType`, `ProjectFortress/library_tests/IntLiteralArithRung7.test`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java`, `opr -(self)`, `row 19`, `trait IntLiteral`
- every check passes

## Row 453, rewritten (1069 characters)
- lengths: row 1069 of 1,200, claim 230 of 300, notes 642 of 700
- reproducer `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss`: exists
- citations:
  - `Library/CompilerLibrary.fss:361` (Library/CompilerLibrary.fss): words moved: lo : (lo+sz-1) at :444; reads: z = lo+hi                                           (*) Danger of overflow here
  - `Library/CompilerLibrary.fss:375` (Library/CompilerLibrary.fss): words moved: lo : (lo+sz-1) at :444; reads: z = lo+hi                                          (*) Danger of overflow here
  - `Library/CompilerLibrary.fss:385` (Library/CompilerLibrary.fss): words moved: lo : (lo+sz-1) at :444; reads: z = lo+hi                                           (*) Danger of overflow here
  - `Library/CompilerLibrary.fss:393` (Library/CompilerLibrary.fss): words moved: lo : (lo+sz-1) at :444; reads: z = lo+hi                                           (*) Danger of overflow here
  - `Library/CompilerLibrary.fss:402` (Library/CompilerLibrary.fss): words moved: lo : (lo+sz-1) at :444; reads: z = lo+hi                                           (*) Danger of overflow here
  - `Library/CompilerLibrary.fss:412` (Library/CompilerLibrary.fss): words moved: lo : (lo+sz-1) at :444; reads: z = lo+hi                                           (*) Danger of overflow here
  - `Library/CompilerLibrary.fss:444` (Library/CompilerLibrary.fss): holds lo : (lo+sz-1); reads: opr #(lo:ZZ32, sz:ZZ32): Range = lo : (lo+sz-1)
  - `Library/CompilerLibrary.fss:375` (Library/CompilerLibrary.fss): words moved: countedseqloop at :359,371,377; reads: z = lo+hi                                          (*) Danger of overflow here
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: (*) `floorAverage` computes `|\ (self+other)/2 /|` efficiently and without overflow.
- in the old line, not in the new: `:377`, `:387`, `:395`, `:404`, `:414`, `:446`, `Library/CompilerLibrary.fss:363`, `row 450`, `row 451`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 318: row 318: rewritten (1001 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 453: row 453: rewritten (1069 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 2 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 2 lines, 0 failing, every check passes.
