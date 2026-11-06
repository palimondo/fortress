# Cold read: c-run1-probe, rows 24, 53, 200, 216, 254, 315, 545, 772, 853

Read with `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and look-ups in `references/records.md`, `interpreter.md`, `compiler.md`, `library.md`, `specification.md`, `tests-writing.md`. The seven status words are listed in `records.md` but defined only in the ledger's row template, which a cold reader may not read; I read `NEGATIVE-VERIFIED` as "the gap is confirmed to exist today" and `CONTESTED` as "an open question for the curator" throughout.

## Row 24

- **Defect:** under walk, a parameter declared with the power type `T^n` (`f(a: RR64^3)`, `g(a: V^3)`) accepts no array the library builds: `vector[\RR64,3\]` and a `PrimitiveArray[\V,3\]` both fail dispatch. Walk turns `T^n` into its own matrix type, `FTypeMatrix`, which no library `Vector` or `Array1` is a subtype of.
- **Where:** walk; the interpreter's type evaluation, `interpreter/evaluator/EvalType.java:594-601` and `interpreter/evaluator/types/FTypeMatrix.java:42-53`. The compiled path desugars only the two-extent form `T^(n BY m)` (`TypeNormalizer.java:144`).
- **Reproduce:** no reproducer and `T24.fss` is not in the tree; write it from the claim: declare `f(a: RR64^3)`, call it on `vector[\RR64,3\](...)`, run `bin/fortress walk`; expect 'Closure/Constructor for f param 1 (a:Matrix [\RR64\]^(3)) got arg __DefaultVector[\RR64,3\]'. Then drop `f` and do the same with `g(a: V^3)` on a `PrimitiveArray`. The old probe is only in git, in the parent of `e879b6a44`.
- **Status:** confirmed gap, open: build a fix. Workaround meanwhile: write `Vector[\T,n\]`.
- **Could not resolve:**
  - The class says `library gap vs spec (library)`, but every cited cause is walk's Java (`EvalType`, `FTypeMatrix`). Unclear wording: I cannot tell whether the fix belongs in the library or in the interpreter.
  - The compiled path: the note says it desugars only `T^(n BY m)`, but not what it does with the one-extent `T^3` (refuses it, or reads it some other way). Unclear wording: I cannot tell whether the row covers that path.
  - The cell gives no full path for `TypeNormalizer.java`. Unclear wording, minor.
  - Whether walk should map `T^n` to `Vector`, to `Array1` or to both: the spec section is cited, but the row does not say what it requires. Unclear wording.

## Row 53

- **Defect:** under walk, a user element type that extends `MultiplicativeRing[\R\]` but not `Number` can still build a `Vector` and a `Matrix`, and `dot`, `.t()`, `mul`, `rmul` and `lmul` work on them. But `+`, `-`, `scale` and `pmul` throw `CastError`, and `v DOT v` fails dispatch with an error that no `catch` takes.
- **Where:** walk; `Library/FortressLibrary.fsi:1678`, `:1686`, `:1782` (the bound `T extends { Number, MultiplicativeRing[\T\] }`) and `Library/FortressLibrary.fss:2548` (`+` casts `ivmap`'s result), `:36` (`cast`), `:2555-2556` (`dot` as `SUM[\T\]`). Nothing says whether the compiled path shows it; from `compiler.md` the compiler's prelude has no array types, so it cannot run there before the switch-over.
- **Reproduce:** no reproducer; write `object R(x: RR64) extends MultiplicativeRing[\R\]`, build a vector of `R`, and run `v + v` in a `try`, `v.dot(v)`, then `v DOT v` under `bin/fortress walk`. Expect `v + v refused: Cast error`, `v.dot(v) = R(2.0)`, then 'Failed to find any matching overload'. The old probe is in the parent of `e879b6a44`.
- **Status:** confirmed gap, open: build a fix.
- **Could not resolve:**
  - "unchecked at a factory": I read it as "walk does not check the `Number` bound when the factory is called", but it could also mean that the factory has no cast. Unclear wording.
  - Which way the fix goes: drop `Number` from the bounds so that a ring element works everywhere, or check the bound at the factory so that the build is refused at once. The row does not say which one the specification wants. Unclear wording.
  - How `Specification-1.0-frozen/basic/traits.tex:231-235`, "Trait Declarations", bears on the gap. Unclear wording.
  - "full text: history, row 53": I read it as "the earlier, longer text is in `explorations/fortress-gap-ledger-history.md`" (`records.md`). Unclear wording, minor.

## Row 200

- **Defect:** a string literal accepts only the escapes `\b \t \n \f \r \" \\` and the curly quotes. The specification's quoted-character escape (`"\'03B2'"`, `"\'beta'"`) and its restricted-word escape (`"x\ALPHA y"`) are refused with `Invalid string literal content: \`, and the backslash also breaks the quote pairing (`Unmatched delimiters`).
- **Where:** the parser, which both paths share: `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:175-176` (the refusal), `:182-195` (`EscapeSequence`).
- **Reproduce:** no reproducer; `q200a.fss` and `q200b.fss` are not in the tree. Write `println("\'03B2'")` and `println("\'beta'")` and run `bin/fortress` (walk): expect `Invalid string literal content: \` at each line. `"x\ALPHA y"` gives the same.
- **Status:** confirmed gap, open: build a fix in the grammar. Workaround: put the glyph itself in the UTF-8 source.
- **Could not resolve:**
  - "restricted-word escape": a language concept that I lack. The skill does not define it; I take `\ALPHA` as its form only from the example.
  - The specification cell names `basic/lexical-structure.tex` without its folder, so it can be `Specification/` or `Specification-1.0-frozen/`. Unclear wording.
  - The workaround's example (`v[3] ← ¯1` printing `9 2 6 ¯1 5 8 7 4 0 1`, in `AplCore.fss`, `aplFmt`) shows no escape; I read it as "the glyph `¯` written directly works", but its link to string escapes is not stated. Unclear wording.

## Row 216

- **Defect:** this row records mostly a capability. APL's glyphs `× ÷ - + * ⊖ ⊂ ⊃ ≡ ≢ ∘` each take a prefix and an infix operator declaration, so APL's monadic and dyadic forms are ordinary overloading. The exceptions: `,` takes no operator declaration, `⌈ ⌊` take none because the parser treats them as enclosers, and `|` takes only infix.
- **Where:** the parser, which both paths share; the notes ran walk only. The APL work is in `explorations/apl/` (`rung-1/`, `base/AplSyntax.fsi`).
- **Reproduce:** `explorations/apl/rung-1/r05a_comma.fss` under walk gives `Syntax Error` at `6:5`; `r05e_ravel.fss` (prefix `,`), `r05c_bar.fss` (infix `|` runs: `a | b = D3`), `r05b_ceil.fss` (`Unmatched delimiter "|/"`) and `r04_glyphs.fss` (`× a = D1`, `a × b = D2`) presumably sit beside it.
- **Status:** a design limit, not marked as a fix to build. I read it as "leave it and use the workaround" (the APL template expands dyadic `⌈ ⌊` to `MAX`/`MIN` and `,` to a call), but the row does not say so outright.
- **Could not resolve:**
  - "encloser": a language concept that I lack (the skill does not define it); I take it from the cited appendix title "Bracket Pairs for Enclosing Operators" as an operator written as a bracket pair.
  - The claim says `|` "takes only infix", and the notes say a prefix `|` declaration loads and only its use `(| D(1))` fails. Unclear wording: is the limit at the declaration or at the use?
  - `Unmatched delimiter "|/"` for a `⌈` declaration: I cannot see why the message names `|/`. Unclear wording.
  - "the template" in `AplSyntax.fsi`: a DSL grammar, a macro, or something else? Unclear wording.
  - The four `r0*.fss` files besides `r05a_comma.fss` are named without a folder. Unclear wording, minor.
  - Whether `design limit` means "keep as designed" or "no fix possible in the parser". Unclear wording.

## Row 254

- **Defect:** under walk, a `DOT` product of two arrays built at run time with mismatched sizes (two `matrix[\RR64,2,3\]`) fails dispatch with `Failed to find any matching overload`, a `ProgramError` that no `catch` clause takes, so the program exits. The shipped `opr DOT` is otherwise APL's inner product in all four rank pairs.
- **Where:** walk; `Library/FortressLibrary.fsi:1686-1701` (vector forms), `:1786-1812` (matrix forms), `Vector.dot` at `:1653`.
- **Reproduce:** no reproducer; write `m DOT n` of two `matrix[\RR64,2,3\](1.0)` inside `try ... catch e Exception` with a `println("caught:")` and a `println("after")`, run `bin/fortress walk`: expect 'Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,3\],__DefaultMatrix[\RR64,2,3\])', exit 1, and neither line printed.
- **Status:** confirmed gap, open. Workaround: a `requires` contract above the `DOT`, which fails catchably (`explorations/apl/base/AplCore.fss:2216-2232`).
- **Could not resolve:**
  - "The shared `nat` catches the mismatch at the dispatch": I read it as "the forms share one size parameter, so mismatched sizes match no overload", but "catches" reads like exception handling. Unclear wording.
  - `ProgramError`: not in the skill; I take it as walk's internal error class that sits outside Fortress's `Exception`. A concept that I lack.
  - The specification is `silent`, so what is the fix: a catchable exception raised by `DOT`, or a dispatch failure that `catch` can take? With the spec silent, `tests-writing.md` points to a test of today's behaviour, not a fix. Unclear wording: build or leave?
  - "all four rank pairs": I take them as vector-vector, vector-matrix, matrix-vector and matrix-matrix. Unclear wording, minor.

## Row 315

- **Defect:** on the compiled path the code generator names a closure class after its source position alone, so two function-typed nodes at one position get the same class name and the jar write dies with `ZipException: duplicate entry`. Two cases: `5 :OP: 6` over three overloads of `opr OP`, and `sz(fn () => 2147483646 + 1)`. Both nodes are coercion thunks.
- **Where:** compiled path, code generator: `compiler/NamingCzar.java:891-892` (`gensymArrowClassName`), `compiler/codegen/CodeGen.java:3531` (`forFnExpr`), the collision in `ByteCodeWriter.writeJarredFile`.
- **Reproduce:** copy the walk test `ConditionalOpTruncation.fss`, run `bin/fortress compile` on the copy: expect 'duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class'. The walk test itself passes.
- **Status:** confirmed gap, open: build a fix (a name that is unique per node, not per position).
- **Could not resolve:**
  - `5 :OP: 6`: a construct that I lack; the skill does not give the `:OP:` form (I guess a conditional operator, from the test name). A language concept.
  - "coercion thunk": not in the skill; I read it as a closure that the compiler wraps around an argument to coerce it. A concept that I lack.
  - The walk test's folder is not given (`ProjectFortress/tests/`?). Unclear wording.
  - The second case's probe `SkLitThunk.fss` is gone, so how the numeral-only thunk arises (from the `+` overflowing `ZZ32`?) is not said. Unclear wording.
  - The specification cell names `basic/conversions-coercions.tex` without its folder. Unclear wording, minor.

## Row 545

- **Defect:** an overload family that mixes a top-level function `tag(s: S)` with functional methods `tag(self)` in traits `T` and `V`, where `S comprises { U, V }`, `T comprises { V, W }` and `V extends { S, T }`, is refused by both paths, and the specification does not settle which overloading rule governs such a family, so whether it should be refused is open.
- **Where:** both paths. Compiled checker: `scala_src/typechecker/OverloadingChecker.scala:644-648`, `:683`. Walk's load check (message 'first parameters s:[S] and self:[T] are unrelated'). Specification: `Specification/advanced/overloading.tex`, "The Meet Rule for Functional Methods".
- **Reproduce:** no reproducer; write the family from the claim as `SkFnMixedTop.fss`; `bin/fortress compile` gives 'Invalid overloading of tag in component SkFnMixedTop: (T & {V, W})->ZZ32 ... and S->ZZ32', and `bin/fortress walk` gives 'first parameters s:[S] and self:[T] are unrelated'.
- **Status:** `CONTESTED`: wait on the curator's question; build nothing.
- **Could not resolve:**
  - The question itself is not stated as a question: I infer it is "which rule governs a function beside a functional method with differing self positions, and so should the family be accepted?". Unclear wording.
  - "the Subtype or Incompatibility Rule": a language concept that I lack; the skill names the No Duplicates, Meet and Return Type rules only.
  - "self position": I read it as the parameter position that `self` takes, but the skill does not define it. A concept that I lack.
  - `(T & {V, W})` in the checker's message: an intersection with a set of types? Unclear notation.
  - "The checker requires the pair and its resolving declarations at one self position": I cannot tell whether this is the checker's defect or its correct reading. Unclear wording.

## Row 772

- **Defect:** on the compiled path a generic function or a trait's generic method called on a `ZZ32` and an `RR64` infers `T = Any` and leaves the `ZZ32` unconverted: `wrap[\T\](a: T, b: T): Box[\T\]` on `3` and `2.5` gives `Box[\Any\]`, where walk gives `Box[\RR64\]`. The compiler's prelude's `RR64` declares no `coerce(x: ZZ32)`, so no type narrower than the bound fits both.
- **Where:** compiled path, the compiler's prelude: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`.
- **Reproduce:** the program is in `explorations/perf-probes/trait-generic-method-inference/REPORT.md`, section 7. Save it as `TraitWrapCompiled.fss`; `bin/fortress compile` and `run` print `trait wrap z r:  Box[Any]  v= ZZ32` and `top wrap z r:  Box[Any]  v= ZZ32`; walk prints `Box[RR64] v=RR64`.
- **Status:** the notes say the row waits for the one library (P-38): leave it until the switch-over, and do not add the `coerce` to the prelude (`compiler.md`).
- **Could not resolve:**
  - Status `NEGATIVE-VERIFIED` beside "the row waits": the status word alone reads as "open to fix", the notes as "leave". Unclear wording.
  - "(P-74)" in the claim: what that decision says (that walk's `Box[\RR64\]` is the right answer?) is not given; I would need to print it. Unclear wording.
  - "walk's trait line: `TraitGenericMethodInference`": a test name, a report, or a line of output? Unclear wording.
  - Class `library gap vs spec (prelude)`: whether the one library has the `coerce`, so that the gap closes by itself at the switch-over, is implied but not said. Unclear wording.

## Row 853

- **Defect:** the compiled checker can decide that one overload is more specific than another by instantiating a static parameter with `Bottom`. So `f(g: Blue -> ZZ32)` beside `f[\T extends Red\](g: T -> ZZ32)`, with `Red` and `Blue` objects, compiles and runs, though the POPL 2019 paper's rules leave the pair unordered and walk refuses it as failing the Meet Rule.
- **Where:** compiled path, the checker: `scala_src/types/TypeSchemaAnalyzer.scala:177` (`subEDsolution`) calls `inferStaticParamsHelper` (`scala_src/useful/STypesUtil.scala:1068`) without `toBounds`, so an open variable becomes `Bottom`. Walk refuses the pair at load (`interpreter.md`, Meet Rule).
- **Reproduce:** no reproducer; `BottomSpec.fss` is not in the tree. Write the pair from the claim with a call of `f`; `bin/fortress compile` and `run` print `f =  1`; `bin/fortress walk` gives 'Overloading of f[\T extends Red\]... and f(g:Blue->...) fails the Meet Rule'.
- **Status:** confirmed gap, open: build a fix in the checker (pass the bounds, so no `Bottom` instance can make the pair nest).
- **Could not resolve:**
  - "[E-Sub] and [U-Sub]": rule names of `Papers/Variance/rules.tex`; a concept that I lack, not in the skill.
  - "unnested": I read it as "neither is more specific than the other", the paper's word. Unclear wording, minor.
  - "siblings: 542": a related row, but how it relates is not said. Unclear wording.
  - "Pairs of the one library: unmeasured": I read it as "nobody has checked whether the interpreter's library holds such pairs, which a fix would then refuse". Unclear wording.

## Summary

- Row 24: blocked on whether the fix is in walk or the library, and on what the compiled path does with `T^n`.
- Row 53: blocked on which way the fix goes (drop `Number` from the bound, or check it at the factory).
- Row 200: clear to fix; "restricted-word escape" undefined, spec folder missing.
- Row 216: blocked on whether `design limit` means leave, and on the `|` prefix contradiction.
- Row 254: blocked on what to build when the specification is silent; "the shared `nat` catches" unclear.
- Row 315: clear to fix; `:OP:` and "coercion thunk" undefined.
- Row 545: clear to wait; the question is not stated, "Subtype or Incompatibility Rule" and "self position" undefined.
- Row 772: blocked on the status word against "waits for the one library", and on P-74.
- Row 853: clear to fix; [E-Sub]/[U-Sub] and "siblings: 542" unexplained.
