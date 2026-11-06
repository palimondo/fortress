# Mechanical check of c-run1-probe, the judge's files, base c124c6b65

## Row 772, rewritten (1129 characters)
- lengths: row 1129 of 1,200, claim 253 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: coerce(x: ZZ32) at :105,149; reads: trait RR64 extends { Number, Equality[\RR64\] } excludes ZZ64
- in the old line, not in the new: `5dd54b64b`, `Box[\Object\]`, `explorations/perf-probes/trait-generic-method-inference/REPORT.md`
- every check passes

## Row 545, rewritten (1120 characters)
- lengths: row 1120 of 1,200, claim 291 of 300, notes 659 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:644-648` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): no word to check; reads: val b1 = fsp == gsp
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:683` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): no word to check; reads: if (fsp != gsp || (isMethod && fsp.isEmpty)) false
- in the old line, not in the new: `:617`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:580-584`, `SkFnMixedTop`, `explorations/compile-ladder/rung-return-type-rule/SKEPTIC.md`
- every check passes

## Row 315, rewritten (1092 characters)
- lengths: row 1092 of 1,200, claim 251 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:891-892` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): words moved: FnExpr at :1183,1251,1349; reads: 
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3531` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds NamingCzar.gensymArrowClassName; reads: String className = NamingCzar.gensymArrowClassName(Naming.deDot(thisApi().getText()), x.getInfo().getSpan());
  - `explorations/compile-ladder/rung-overflow-natives/probes/skeptic/SkLitThunk.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `() -> ZZ32`, `()->ZZ32`, `2147483647`, `ByteCodeWriter.java`, `ByteCodeWriter.java:40`, `CodeGen.evaluateSubExprsAppropriately`, `CodeGen.forOpExpr`, `CodeGen.java`, `CodeGen.java:3486`, `CodeGen.java:4852`, `CodeGenClassWriter.dumpClass0`, `ConditionalOpTruncation$\=fn@20\!15.class`, `row 315`
- every check passes

## Row 853, rewritten (1140 characters)
- lengths: row 1140 of 1,200, claim 278 of 300, notes 683 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:177` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala): words moved: inferStaticParamsHelper at :141,194; reads: def subEDsolution(s: Type, t: Type): Option[(Type, List[StaticArg])]  =  {
  - `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1068` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala): words moved: inferStaticParamsHelper at :991,1014,1112; Bottom at :625,1009,1052; reads: val (tSub, oSub, nSub) = (if (toBounds) solveToBounds(bounded) else solve(bounded)).getOrElse(return None)
  - `Papers/Variance/rules.tex:159` (Papers/Variance/rules.tex): words moved: toBounds at :191,258; reads: \rep{\gamma\neq\Bottom} \\[3pt]
  - `Papers/Variance/rules.tex:171` (Papers/Variance/rules.tex): words moved: toBounds at :191,258; reads: \rep{\gamma\neq\Bottom} \\[3pt]
- in the old line, not in the new: `Formula.scala`, `Formula.scala:597-599`, `STypesUtil.scala`, `STypesUtil.scala:1068`, `STypesUtil.scala:2126-2129`, `T = Bottom`, `TypeSchemaAnalyzer.scala`, `TypeSchemaAnalyzer.scala:141`, `TypeSchemaAnalyzer.scala:189-196`, `solve`, `solveToBounds`, `subUA`
- every check passes

## Row 24, rewritten (1076 characters)
- lengths: row 1076 of 1,200, claim 238 of 300, notes 671 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/aggregate.tex:152-170` (Specification-1.0-frozen/basic/expressions/aggregate.tex): holds Vector; reads: An array of two
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:594-601` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java): no word to check; reads: public FType forMatrixType(MatrixType x) {
  - `types/FTypeMatrix.java:42-53` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeMatrix.java): no word to check; reads: public boolean subtypeOf(FType other) {
  - `ProjectFortress/src/com/sun/fortress/compiler/typechecker/TypeNormalizer.java:144-163` (ProjectFortress/src/com/sun/fortress/compiler/typechecker/TypeNormalizer.java): no word to check; reads: List<ExtentRange> dims) {
  - `explorations/fable-review-probes/RvwTypePow.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Closure/Constructor for f param 1 (a:Matrix [\V\]^(3))`, `Matrix`, `Number`
- every check passes

## Row 53, rewritten (1136 characters)
- lengths: row 1136 of 1,200, claim 264 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/traits.tex:231-235` (Specification-1.0-frozen/basic/traits.tex): words moved: dot at :162,236,312; mul at :294,501; reads: If a trait declaration of \VAR{T} includes a \KWD{comprises} clause
  - `Library/FortressLibrary.fsi:1678` (Library/FortressLibrary.fsi): words moved: dot at :1653; rmul at :1765; lmul at :1766; scale at :1651,1763; pmul at :1652,1683; CastError at :1198; reads: vector[\T extends { Number, MultiplicativeRing[\T\] }, nat s0\]():Vector[\T,s0\]
  - `Library/FortressLibrary.fsi:1686` (Library/FortressLibrary.fsi): words moved: dot at :1653; rmul at :1765; lmul at :1766; scale at :1651,1763; pmul at :1652,1683; CastError at :1198; reads: opr DOT[\ T extends { Number, MultiplicativeRing[\T\] }, nat n \]
  - `Library/FortressLibrary.fsi:1782` (Library/FortressLibrary.fsi): words moved: dot at :1653; rmul at :1765; lmul at :1766; scale at :1651,1763; pmul at :1652,1683; CastError at :1198; reads: matrix[\T extends { Number, MultiplicativeRing[\T\] }, nat s0, nat s1\]():Matrix[\T,s0,s1\]
  - `Library/FortressLibrary.fss:2548` (Library/FortressLibrary.fss): no word to check; reads: cast[\Vector[\T,s0\]\](ivmap[\T\](fn (i:ZZ32, e: T):T => e + v.get(i)))
  - `Library/FortressLibrary.fss:36` (Library/FortressLibrary.fss): no word to check; reads: else => throw CastError
  - `Library/FortressLibrary.fss:2549-2551` (Library/FortressLibrary.fss): no word to check; reads: opr -(self, v:Vector[\T,s0\]): Vector[\T,s0\] =
  - `Library/FortressLibrary.fss:2555-2556` (Library/FortressLibrary.fss): holds SUM[\T\]; reads: dot(v: Vector[\T,s0\]): T =
  - `explorations/libvector-probes/p32_ring_route.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `+ - scale pmul .t()`, `:1746-1786`, `AdditiveGroup`, `DOT`, `Library/FortressLibrary.fsi:1638-1670`, `Library/FortressLibrary.fss:2403-2404`, `SUM`, `Specification-1.0-frozen/basic/expressions/aggregate.tex`, `Specification-1.0-frozen/basic/expressions/aggregate.tex:152-170`, `Specification/basic/traits.tex`, `Vector.dot`, `[\T extends Number\]`, `cast[\Number\]`, `comprises`, `row 53`
- every check passes

## Row 254, rewritten (973 characters)
- lengths: row 973 of 1,200, claim 216 of 300, notes 667 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:1686-1701` (Library/FortressLibrary.fsi): no word to check; reads: opr DOT[\ T extends { Number, MultiplicativeRing[\T\] }, nat n \]
  - `Library/FortressLibrary.fsi:1786-1812` (Library/FortressLibrary.fsi): no word to check; reads: opr DOT[\ T extends { Number, MultiplicativeRing[\T\] }, nat n, nat m, nat p\]
  - `Library/FortressLibrary.fsi:1653` (Library/FortressLibrary.fsi): no word to check; reads: dot(v: Vector[\T,s0\]): T
  - `explorations/apl/base/AplCore.fss:2216-2232` (explorations/apl/base/AplCore.fss): holds aplMatMul; reads: aplMatMul[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): RR64
- in the old line, not in the new: `+.×`, `1ee3b0bc5`, `:1610`, `:1754-1773`, `Ex 7c`, `Library/FortressLibrary.fsi:1650-1651`, `Matrix`, `Rung6.out`, `explorations/apl/rung-6/w01_dot.fss`, `nat`, `w01_dot.out`, `w01_dot.out.0`
- every check passes

## Row 216, rewritten (1183 characters)
- lengths: row 1183 of 1,200, claim 246 of 300, notes 628 of 700
- reproducer `explorations/apl/rung-1/r05a_comma.fss`: exists
- citations:
  - `Specification-1.0-frozen/appendices/operators.tex:67-70` (Specification-1.0-frozen/appendices/operators.tex): no word to check; reads: \UnicodeOp{U+2308}{LEFT CEILING}{$\lceil$}{\texttt{|/}} \\
  - `Specification-1.0-frozen/advanced/operator-definitions.tex:24-27` (Specification-1.0-frozen/advanced/operator-definitions.tex): no word to check; reads: the operator.  Like other functionals, operators may have overloaded
  - `r05a_comma.fss:6` (explorations/apl/rung-1/r05a_comma.fss): no word to check; reads: opr ,(a: D, b: D): D = D(a.n + b.n)
  - `r05a_comma.fss:5` (explorations/apl/rung-1/r05a_comma.fss): no word to check; reads: object D(n: ZZ32) getter asString(): String = ("D" n) end
  - `r05e_ravel.fss:6` (explorations/apl/rung-1/r05e_ravel.fss): no word to check; reads: opr ,(a: D): D = D(5 a.n)
  - `r05e_ravel.fss:5` (explorations/apl/rung-1/r05e_ravel.fss): no word to check; reads: object D(n: ZZ32) getter asString(): String = ("D" n) end
- in the old line, not in the new: `explorations/apl-probes/c13_shared_glyphs.fss`, `explorations/apl/rung-1/r04_glyphs.fss`, `row 216`, `row 279`, `∘ ⊖`
- every check passes

## Row 219, rewritten (1035 characters)
- lengths: row 1035 of 1,200, claim 225 of 300, notes 661 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/aggregate.tex:152-170` (Specification-1.0-frozen/basic/expressions/aggregate.tex): no word to check; reads: An array of two
- in the old line, not in the new: `Failed to find any matching overload, args = (PrimitiveArray[\Char,5\])`, `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fsi:1530-1531`, `Rank1`, `ReadableArray1 extends { …, Rank1, … }`, `T extends Number`, `aplShowC`, `aplTallyC`, `explorations/apl/rung-1/REPORT.md`, `explorations/apl/rung-1/r14_nested.fss`, `r08_edge.fss`, `row 199`, `showN`, `… have parameters with generic type, at least one pair of parameters must have excluding types`
- every check passes

## Row 200, rewritten (904 characters)
- lengths: row 904 of 1,200, claim 222 of 300, notes 548 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:175-176` (ProjectFortress/src/com/sun/fortress/parser/Literal.rats): words moved: EscapeSequence at :170,182,199; reads: / a1:[\\]
  - `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:182-195` (ProjectFortress/src/com/sun/fortress/parser/Literal.rats): holds EscapeSequence; reads: private String EscapeSequence =
  - `explorations/apl/base/AplCore.fss:41` (explorations/apl/base/AplCore.fss): no word to check; reads: if v < 0.0 then ("¯" aplFmt(-v))
  - `explorations/apl/v1-probes/p18_uesc.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `0ff5eae27~1`, `9 2 6 ¯1 5 8 7 4 0 1`, `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:182-195`, `Unmatched delimiter "component"`, `Unmatched delimiters "\"" and "]"`, `v[3] ← ¯1`
- every check passes

## Row 342, rewritten (1053 characters)
- lengths: row 1053 of 1,200, claim 209 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:112` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; getFunctionals() at :199; reads: componentCache.put(graphRepository.pathTaggedComponent(transformed.getName()), transformed);
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:121` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; getFunctionals() at :199; reads: getEnvBuilder().visit(cu);
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:53-57` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getFunctionals() at :199; reads: private Component getCached(ComponentIndex comp) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:108-114` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; getFunctionals() at :199; reads: if (transformed == null) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:199-203` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; reads: public Set<String> getFunctionals() {
- in the old line, not in the new: `:197-201`, `AdditiveGroup.+`, `interpreter_parsed_cache/FortressLibrary*`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 772: row 772: rewritten (1129 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 545: row 545: rewritten (1120 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 315: row 315: rewritten (1092 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 853: row 853: rewritten (1140 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 24: row 24: rewritten (1076 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 53: row 53: rewritten (1136 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 254: row 254: rewritten (973 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 216: row 216: rewritten (1183 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 219: row 219: rewritten (1035 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 200: row 200: rewritten (904 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 342: row 342: rewritten (1053 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 11 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 11 lines, 0 failing, every check passes.
