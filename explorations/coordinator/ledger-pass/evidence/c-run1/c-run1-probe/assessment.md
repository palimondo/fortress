# Assessment, prober of c-run1

Each block: the question, the output's lines that matter (whole in `runs.md`), the disposition. Lines are in `rows.rewrite`; the close in `closes.txt`. Runs at the main tree's head bc28dfa5c, whose library and implementation equal the base c124c6b65's.

## Row 772 (c1): what does the compiled path infer for `wrap[\T\]` on a `ZZ32` and an `RR64`?
- Output: compiled `trait wrap z r:  Box[Any]  v= ZZ32`, `top wrap z r:  Box[Any]  v= ZZ32`; walk `Box[RR64] v=RR64` on both lines.
- Disposition: **rewrite**. The value moved from `Object` to `Any` (`1bc0a9083`, the unbounded parameter now bounded by `Any`); the top-level line shows the same defect, so the claim widens to "a generic function or a trait's generic method", and the old "Measured on a trait's generic method only" is dropped as false. Reproducer `none`, the command and output in the notes; the pin `CompilerBuiltin.fsi:433-435` re-read at c124c6b65 (`trait RR64` with `coerce(x: FloatLiteral)`, `coerce(x: RR32)`). Dropped: the rung W batch story (the history keeps it); the reproducer cell's report path moves into the notes as the program's home.

## Row 545 (c19): does each path still refuse `SkFnMixedTop`, and with which message?
- Output: walk exit 1, 'first parameters s:[S] and self:[T] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present'; compiled exit 255, 'Invalid overloading of tag in component SkFnMixedTop: (T & {V, W})->ZZ32 ... and S->ZZ32'.
- Disposition: **rewrite**, the first outcome: both refuse with the row's messages. Status `CONTESTED` (the row says the specification does not settle which rule governs). Reproducer `none` with both commands and messages; the pins re-read at c124c6b65: the one-self-position test is now `OverloadingChecker.scala:644-648` (`b1 = fsp == gsp`, `hsp == fsp`) and `:683` (`if (fsp != gsp ...`), shifted from `:580-584`, `:617`. Sibling 492 dropped from `siblings:` (FIXED) and named as "the Meet Rule's example, fixed". Dropped: the SKEPTIC.md probe path (the program is whole in `runs.md` and the c19 questions; the history keeps the path).

## Row 315 (c19): does the compile of `ConditionalOpTruncation` still die with a duplicate closure class?
- Output: exit 1, 'java.util.zip.ZipException: duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class' at `ByteCodeWriter.writeJarredFile(ByteCodeWriter.java:36)`.
- Disposition: **rewrite**, the first outcome: the reproducer is a walk test that passes, so it becomes `none` with the command and the message; the pins `NamingCzar.java:891-892` and `CodeGen.java:3531` at c124c6b65 (read: `gensymArrowClassName` returns `desc + "$fn@" + sp.toStringWithoutFiles()`; `forFnExpr` calls it with the node's span). The stale `ByteCodeWriter.java:40` and `CodeGen.java:3486`/`:4852` pins are dropped (the trace's line 36 is the current one). `SkLitThunk` kept as "no longer in the tree". The numeral-only second program was not run: the question asks it only if the compile succeeded.

## Row 853 (c23): does the checker accept a pair nested only at `T = Bottom`?
- Output: compile exit 0; run `f =  1`; walk refuses it, 'fails the Meet Rule'.
- Disposition: **rewrite**, the first outcome: the compile succeeds, the claim holds; status `NEGATIVE-VERIFIED` (the row's own "Settles it: a probe of that pair" is now done). The claim drops "by reading" and the `solve`/`solveToBounds` mechanism moves to the notes; the walk refusal is new and joins the claim, the paths differ. Pins re-read: `subEDsolution` is now at `TypeSchemaAnalyzer.scala:177` (was `:189-196`); `STypesUtil.scala:1068` holds `toBounds`. Dropped for length: `Formula.scala:597-599`, `STypesUtil.scala:2126-2129` and `subUA` at `TypeSchemaAnalyzer.scala:141` (home: `explorations/reviews/popl2019-rules-map.md`, finding 4, which the notes cite, and the history). The `XXX` compiled test that the outcome names is a change of the tree: `queue.md`.

## Row 24 (c28): what does `T^n` denote under walk?
- Output: `f` refused: 'Closure/Constructor for f param 1 (a:Matrix [\RR64\]^(3)) got arg __DefaultVector[\RR64,3\]'; with `f` removed, `g` refused: '... got arg PrimitiveArray[\V,3\]'.
- Disposition: **rewrite**, the second outcome: `T^n` is walk's own type, not the library's `Vector`; the claim becomes "accepts no library array under walk". Notes: the mechanism `EvalType.java:594-601`, `FTypeMatrix.java:42-53` (from the c28 question; not re-read by this run beyond the mech check), both messages, the compiled path's `TypeNormalizer.java:144`. The old probe path kept.

## Row 53 (c28): which operations run on a user ring element type?
- Output: `vector[\R,2\]` and `matrix[\R,2,2\]` build; `+`, `scale`, `pmul` 'Cast error' (caught); `dot`, `.t()`, `mul`, `rmul`, `lmul` run; `v DOT v` 'Failed to find any matching overload', not caught. `v + v` alone: `CastError` at `FortressLibrary.fss:36` from `:2548`.
- Disposition: **rewrite**, the second outcome: the list differs from the row's (`+ - scale pmul .t()` worked, `DOT rmul lmul mul` failed; now nearly the reverse). `-` was not run separately; it is the same `cast[\Vector\](ivmap ...)` form as `+` (`fss:2549-2550`), so the claim names it with `+`; a worker who needs it exact runs it. Pins: `fsi:1678`, `:1686`, `:1782`, `fss:2548`, `:2555-2556`. Dropped: the old `fsi:1638-1670`, `fss:2403-2404` pins and the `comprises` reading sentence (the history keeps it), the second spec citation `aggregate.tex:152-170` (for length; history).

## Row 254 (c28): does a mismatched `DOT` still escape `catch`?
- Output: 'Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,3\],__DefaultMatrix[\RR64,2,3\])', exit 1, neither `caught:` nor `after`.
- Disposition: **rewrite**, the first outcome: reproducer `none` with this program and output; the pins `fsi:1686-1701`, `:1786-1812`, `:1653`; the `.out` files dropped (history). `silent.txt`: defect.

## Row 44 (c32): does `SUM` still refuse a generator of RR64 arrays?
- Output: `r14_nested.fss` stops before its `SUM`, in the APL base: 'fill param 1 (v:RR64) got arg FnExpr' (`AplCore.fss:52`), because `fill` takes a value since `f3b62bc83`. One change, the same `SUM` without the APL library (`T44.fss`): `[0#3][ 5.0 7.0 9.0 ]`, exit 0.
- Disposition: **close**, against `d846e3644` (it replaced `opr SUM[\T extends Number\]` with its `cast[\Number\]` by `opr SUM[\T extends AdditiveGroup[\T\]\]`, read in `git show d846e3644 -- Library/FortressLibrary.fss`; no later commit touches `opr SUM`), test `none`: no gated test asserts a `SUM` of RR64 arrays. A gated test is owed: `queue.md`.

## Row 216 (c32): do `,`, `|` and prefix `,` still refuse a declaration?
- Output: `r05a_comma.fss:6:5: Syntax Error`; `r05e_ravel.fss:6:5: Syntax Error`; `r05c_bar.fss` runs, `a | b = D3`. The writer's expected "r05c refuses the prefix `|`" misread r05c, which declares the infix `|`; the row says `|` takes only infix, which r05c agrees with. One change, a prefix `|` (`r05f_prebar.fss`): the declaration passes, the use `(| D(1))` is `Syntax Error` at `5:33`.
- Disposition: **rewrite**, the first outcome in substance: reproducer `explorations/apl/rung-1/r05a_comma.fss`; the claim unchanged; the notes give each glyph's measured result. Dropped: row 279's probe `c13_shared_glyphs.fss` and `r05d_prefix.fss` (for length; history), the second half of the glyph list printed by `r04_glyphs.fss` (the file still prints it).

## Row 219 (c32): is a `Char` array beside an `RR64` vector in one family still refused?
- Output: walk, `r07_edge.fss` with `fill` of a function made `tabulate`: exit 0, `tally(c) = 5.0`. Compiled: 'Array is undefined', 'Char is undefined', 'Vector is undefined', 10 errors: the prelude cannot state the family.
- Disposition: **none written; queue**. Walk accepts the family and dispatches it, so the claim is false where the one library runs; the outcome asks a close at the commit that changed walk's rule, confirmed by bisect. A bisect builds other commits, which this brief forbids, and the log does not settle it: `6d187d069`, `5262a2412` and `14e91723f` each changed walk's pair check in `OverloadedFunction.java`, and the library's change of `Vector`'s bound to `{ Number, MultiplicativeRing[\T\] }` may matter too. The compiled path neither accepts nor refuses (it lacks the types until the switch-over). `queue.md` holds the close.
- The `fill(f)` failure is a probe bug, not a row: `fill` takes a value and `tabulate` a function since `f3b62bc83`, as the library designs it. The same bug stops the APL base itself (`AplCore.fss:52`, `aplVec`): `queue.md`.

## Row 223 (c32): does a computed left argument of `⍴` still fail to parse?
- Output: 'Error occurred while instantiating and executing a temporary parser: ... (r15_runtimerank.fss:12:46: Syntax Error)'.
- Disposition: **keep**: column 46, as the row says. (The template parse fails before `AplCore`'s `fill` would run, so this run is not stopped by it.)

## Row 200 (c40): are the specification's quoted-character and restricted-word escapes refused?
- Output: `q200a.fss:4:12` and `5:12`: 'Invalid string literal content: \'; `q200b.fss:3:19`: the same.
- Disposition: **rewrite**, the first outcome: both kinds refused; the line as the writer gave it, cut to the limits: claim the escapes that work and the two specified kinds refused; class `implementation gap (parser)`; notes with `Literal.rats:175-176`, `:182-195`, the run, the glyph workaround, the old probe. Dropped: "The probe ran on the retired first library" (the old probe's story; history).

## Row 342 (c15, optional): can `v04_lib.fss` serve as the row's probe again?
- Output: refused cold (Return Type Rule, `AplCore.fss:280` against `ReadableArray.=`), and refused warm with another message (`BY` at `FortressLibrary.fss:462` against `AplCore.fss:1209`, same parameter types).
- Disposition: **keep** (c15's judged line stands: reproducer `none`). The program is refused on both runs, so it cannot show a refusal that only a cold cache gives; nor does it disprove the row: the two runs report different pairs, and both involve `AplCore`, which a failed load leaves uncached. Not a reproducer either way.
