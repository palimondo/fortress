# Run C3 gap rows 156-172: independent replication

Every row of `explorations/run-c3/gaps.md` re-run from its cited reproducer on
2026-09-14. Environment: `source experiment/env.sh` (JDK 25,
`FORTRESS_HOME=/home/user/fortress`, `FORTRESS_THREADS=1`,
`JAVA_FLAGS=-Xmx4g -Xss64m`), walk interpreter, each probe run from its own
directory. Commands below are shown relative to
`explorations/run-c3/probes/`; `F` stands for `$FORTRESS_HOME/bin/fortress`.
All cited `.out` files already existed; none had to be created.

Verdicts judge the row's *wording*, not just its gist: quoted error text is
checked verbatim, and every cited spec, library and grammar line was opened.

---

**156 — CONFIRMED WITH CORRECTION.** Behaviour reproduces exactly.
`cd g156_api_postfix && F UseTr1.fss` → `Tr1.fsi:3:1:` / `    Syntax Error`
(the declaration is on line 2, so "at the following line" is right);
`F UseTr4.fss` → `Tr4.fsi:2:1-3:1:` /
`    The operator, ^, is always an infix operator but it is declared to be postfix.`
(verbatim); `F UseTr5.fss` → prints the transposed matrix, exit 0. The grammar
reading is right but **the `Parameter.rats` line numbers are wrong**: the
`AbsOpHeaderFront` postfix alternative is at **171-172**, not 170-171
(`171: / opr w a1:AbsValParam w a2:(Op / ExponentOp`, `172: caret {…}`), and
the `/` before `caret` that `OpHeaderFront` has is at line **141**, not 143
(`141: / opr w a1:ValParam w a2:(Op / ExponentOp /`, `142: caret {…}`).
Strengthening evidence the row does not cite: the file's own comments at
`Parameter.rats:115` and `:159` both write `(Op | ExponentOp | ^)`, and so does
the spec's `AbsOpHeaderFront` at `concrete-syntax.tex:738` — the code deviates
from both. Spec range off by one: `AbsFnDecl` starts at 390 but
`AbsFnHeaderFront ::= AbsNamedFnHeaderFront | AbsOpHeaderFront` runs 398-**400**,
so cite `:390-400`.

**157 — CONFIRMED WITH CORRECTION.** `F lift_g2.fss` (exit 1) prints, verbatim:
`Unification error: Closure/Constructor for applyIt param 1 (f:Array[\RR64,ZZ32\]->Array[\RR64,ZZ32\]) got arg dblG[\nat n\](v:Vector[\FortressLibrary.RR64,n\]):Array[\FortressLibrary.RR64,FortressLibrary.ZZ32\]/…/lift_g2.fss:6:1-97 of type null`.
The row's quote names `rows` and `rmsn[\nat n\](x: Vector[\RR64,n\])`, which do
not occur in the cited reproducer at all — it spells the higher-order function
`applyIt` and the generic `dblG`. Rewrite the quote with the probe's names (or
cite the model file the names come from). The positive half is confirmed: the
non-generic `applyIt(dblC, v)` prints `(non-generic) [0#3][ 2.0 4.0 6.0 ]` on
the line before the error.

**158 — CONFIRMED** (behaviour). `cd g158_untyped_overload && F G158.fss`, exit 0,
decisive line `(3) untyped scalar lambda -> vector-result overload: 3.0`
against `(1) typed scalar lambda   -> scalar-result overload: 3.0`; the
vector-result overload is the first declared (`G158.fss:7`), and no diagnostic
is printed. *Correction to the spec citation:* `basic/expressions/function.tex`
does **not** say parameter types of a function expression may be omitted — its
grammar is `fn ValParam (IsType)? (Throws)? ⇒ Expr` and the prose calls out the
optional *return* type only. Cite the `ValParam` production instead, or drop
the parenthetical.

**159 — CONFIRMED** (behaviour), **with a correction to the spec citation.**
`F lift_g3.fss` → `lift_g3.fss:13:46-47:` /
`    Operator declarations are not allowed in block expressions.` (verbatim; no
output precedes it — this is a parse-time failure). `F lift_g3b.fss` and
`F lift_g3d.fss` → `com.sun.fortress.exceptions.InterpreterBug: … ** bug! The
number of parameters (2) does not match with the number of arguments (0).`
(verbatim, after `(0) infix works: [0#3][ 2.0 6.0 12.0 ]`). `F lift_g3c.fss`
confirms the eta-expansion workaround, exit 0. The probe spells the call
`applyIt(opr ×, a, b)`, not `rows(opr ×, v, m)`. *Correction:*
`basic/operators/operator-app.tex` is a 38-line section titled "Operator Names"
that lists which characters may be used as operators; it says nothing about
operators appearing only in operator applications. The second half of the
citation is confirmed: `grep -n OpRef concrete-syntax.tex` returns nothing.

**160 — CONFIRMED WITH CORRECTION.** `F lift_g6.fss` and `F lift_g6b.fss` both
give `Element at [0] has extent 2 along axis 1 but an earlier element has
length 0` (verbatim, untyped at `lift_g6.fss:10:11-15` and `Array[\Any,ZZ32\]`-typed
at `lift_g6b.fss:9:30-34`); `F lift_g6c.fss` prints
`(g6c scalars) sc[1] = 2.0` and `(g6c generic array) ms[2][1,1] = 3.11`, exit 0.
Two corrections. (a) The quote `Can't infer element type` is **truncated** —
the message is `Can't infer element type for array construction`. (b) **No
cited reproducer contains that case**: `lift_g6c.fss` only has the working
`sc: Vector[\RR64,3\] = [1.0 2.0 3.0]`. I confirmed it with a throwaway
component in the scratchpad (untyped `sc = [1.0 2.0 3.0]` in a `do` block →
`Can't infer element type for array construction`), but the row should cite
`lift_REPORT.md:126` or add a probe. `aggregate.tex:180-183` checks out
("If an element is an array expression, it is ``flattened'' (pasted)").

**161 — CONFIRMED.** `F lift_g4.fss` → `lift_g4.fss:11:11-22:` /
`Syntax Error: a function argument should not be immediately followed by a
non-expression element.` (verbatim); `F lift_g4b.fss` → `(g4b) bound first,
oh^T sizes = (5,3) t1[1,1] = 1.0`, exit 0. The probe spells the call
`(onehot(ks, 5))^T`, the row `(onehot(idx, 5))^T`. `juxtameaning.tex:159-160`
carries the sentence ("It is a static error if either the argument is not
parenthesized, or the argument is immediately followed by a non-expression
element"), inside the cited 156-162.

**162 — CONFIRMED** (behaviour), **with a correction to the spec citation.**
`F att_f_staticparams.fss` → `null/…/att_f_staticparams.fss:5:29:` /
`    Syntax Error` — the `null` prefix is exactly as described. The probe's
declaration is `sumOf(m: Matrix[\RR64,r,c\])[\nat r, nat c\]: RR64`, not the
row's schematic `f(x: ZZ32)[\nat n\]`. *Correction:* `concrete-syntax.tex:721-731`
is the **OpHeaderFront** production (the one that *allows* the postfix-`opr`
placement the row contrasts against). `NamedFnHeaderFront ::= Id (StaticParams)?
ValParam` — the production that puts static parameters after the name — is at
**402-403**.

**163 — CONFIRMED.** `F att_g_staticname.fss` → `att_g_staticname.fss:6:38:` /
`    Variable q is already declared.` (verbatim). Line 6 is the
`assignInto[\nat r, nat c, nat p, nat q\](…)` declaration and column 38 is the
`q` of `nat q`; `q` is the top-level value on line 5.
`declarations.tex:476-533` is the shadowing section, ending at 533 with "No
other shadowing is permitted in a Fortress program." — the rule the row invokes.

**164 — CONFIRMED WITH CORRECTION** (second spec citation). `cd g164_api_param_name
&& F UseG164.fss` → `…/G164.fsi:3:6-8:` / `    Variable rows is already declared.`
(verbatim); `G164.fsi:3` is `area(rows: ZZ32, cols: ZZ32): ZZ32` and columns 6-8
are the parameter `rows`, against `rows(n: ZZ32): ZZ32` on line 2 — so "fails at
the parameter" is right. Two corrections. (a) "before any component is read" is
not observable from the output; what the output shows is that the error is
*located in the api file*, and `G164.fss` carries the identical clash, so the
probe cannot separate the two. (b) `basic/components/apis.tex` contains no
statement that an api's declarations share one scope (`grep -n scope` finds
nothing in it); it supplies only the `AbsDecls`/`AbsDecl` grammar. The scoping
rule is `declarations.tex:476-533`, already cited first.

**165 — CONFIRMED WITH CORRECTION** (quote spacing). `F lift_c3.fss` → exit 1,
`Failed to find any matching overload, args = (__DefaultVector[\RR64,3\],1: ZZ32,CompactFullParScalarRange[\ZZ32\]), overload = {…`
— the row inserts spaces after the commas that the interpreter does not print.
Note also that the four overloads listed after `overload = {` come out in a
**nondeterministic order** (my run's order differs from the stored
`lift_c3.out`), so the ledger should not quote that part. Library citation
exact: `FortressLibrary.fss:2341` is `(*` and `:2357` is `*)`, wrapping the four
`opr[r0:Range[\ZZ32\], r1:Range[\ZZ32\]]` etc. declarations. *Correction:*
`ranges.tex:76-80` is about **implicit** ranges (`:`) supplied by an array
subscript context, not the `0#cols` form the probe uses.

**166 — CONFIRMED WITH CORRECTION** (library line). `F lift_c2.fss` → exit 0,
`(c2) [0#4,0#3]` with row 1 printed as `1.0 2.0 3.0` and every other row zero,
so `Row[\4,3\](out, 1).assign(y)` did write the vector into row 1. The matrix
half is at `src/MicroGptFlat.fss:47-48` (`view(g,0).assign(g0)` … `view(g,8).assign(g8)`
inside `flat`, declared at :44), and `checks/threads1.txt` ends
`VERDICT: 36 PASS, 0 FAIL of 36 -- ALL PASS` / `exit status 0`. *Corrections:*
`FortressLibrary.fss:1993` is `assign(f:I->E):T` — assign from a **function**.
The one the row describes ("from another indexed value … goes through the
view's `put`") is **:1989-1992**, `assign(v:T):T = do for i <- zeroIndices() do
put(i,v.get(i)) end`, in `trait StandardMutableArrayType` (:1987). Also, no
`assign` is declared on `Indexed` anywhere in the library (`grep -n "assign("`
gives only :1912, :1989, :1993), so "`Indexed.assign`" is a misnomer. And
`traits.tex:231-235` is the note on `comprises` clauses — relevant to the probe
only insofar as the user `Row` object extends `Vector`, not to `assign`/`put`.

**167 — CONFIRMED WITH CORRECTION** (the label range). `F lift_c.fss` → exit 0.
The four overloads are at `lift_c.fss:47` (`Array->Array`), `:56` (`Array->RR64`),
`:64` (`(Array,Array)->Array`) and `:73` (`(RR64,Array)->Array`), exactly the
arrow types the row lists, and they coexist with no diagnostic. *Correction:*
the run prints labels **(1), (2), (5), (6), (7)** — there is no (3) or (4) — so
"lines (1)–(7)" should read "lines (1), (2), (5), (6), (7)". Decisive line:
`(7) scalar-result overload: |sv| = 64  sv[5] = 3.7203411149839445`, which is
the `Array->RR64` overload picked by a typed lambda.
`cd g158_untyped_overload && F G158.fss` lines (1)-(2) confirm the typed-lambda
half.

**168 — CONFIRMED WITH CORRECTION** (the count, and "operator"). `F alg_a2.fss`
→ exit 0, output byte-identical to `alg_a2.out`, last line
`library scalars still: 3.0 / 2.0 = 1.5  SQRT 9.0 = 3.0  2.0 MAX 5.0 = 5.0  1.0 > 0.0 = true  1.0 = 1.0 = true  exp 0.0 = 1.0  log 1.0 = 0.0`.
*Correction:* `grep -c "opr " alg_a2.fss` = **24**, not 28. `exp` and `log`
(`alg_a2.fss:47-50`, four overloads) are ordinary **function** overloads, not
operator declarations; 24 operators + 4 functions = the 28 the row counts.
Second correction: the row's list omits that the component declares `+` and `-`
**only with a scalar** (`:35-42`); the `V+V` and `M+M` lines in the output are
the library's array `+`, not user declarations. The workaround note checks out:
`FortressLibrary.fss:352` is `comprises { RR64 }` under `trait Number` (:349).

**169 — CONFIRMED** (read, not run, as instructed). `src/FlatData.fsi:12-19`
declares `object Corpus(tokm: Array[\ZZ32,(ZZ32,ZZ32)\], len: Array[\ZZ32,ZZ32\],
blk: ZZ32)` with methods `size(): ZZ32`, `length`, `token`, `tokens`,
`positions`, `valid`, and `loadCorpus(…): Corpus` on :20. It is constructed in
its component at `src/FlatData.fss:123` (`Corpus(tokm, keys(…), blk)`).
`src/MicroGptFlat.fsi:16` exports `corpus: Corpus` as a top-level value, and
`src/MicroGptFlatCheck.fss` imports both apis (:8, :10) and uses
`corpus.token(d, j)` / `corpus.length(d)` (:36, :69) — so the two importing
components are `MicroGptFlat` and `MicroGptFlatCheck`. The mutable top-level
values are `passed: ZZ32 := 0` and `failed: ZZ32 := 0`
(`MicroGptFlatCheck.fss:18-19`), updated inside `report` at :22
(`if ok then passed += 1 else failed += 1 end`). "The check runs" is confirmed
by `checks/threads1.txt` ending `VERDICT: 36 PASS, 0 FAIL of 36 -- ALL PASS` /
`exit status 0`.

**170 — CONFIRMED.** `cd g170_fail_exit && F ExitFail.fss; echo $?` → `before`
(so the pre-`fail` `println` is flushed), then `FAIL: verdict FAIL`, then
`/home/user/fortress/Library/FortressLibrary.fss:56:5-23:` / `FailCalled` and a
`Context:` block; shell exit status **1**. `println "after"` never runs.
`FortressLibrary.fsi:37` is `fail[\T\](s:String):T` and `:962` is
`object FailCalled(s:String) extends UncheckedException` — both exact. Minor
note: the stored `ExitFail.out` carries a hand-added trailing line
`exit status 1` that the program itself does not print.

**171 — CONFIRMED** (all three citations; `threads4.txt` completed at 08:23
during this replication, so it is now available). `FORTRESS_THREADS=1 F
lift_c.fss` vs `FORTRESS_THREADS=4 F lift_c.fss`: the only differing line is
the `(t) 10 x rows(rmsn,x): …` timing line; all five reported sums and elements
are identical to the last digit (e.g. `(1) rows(rmsn, x)           sum =
5.397680725415225  [5,7] = 1.0717557896191623`). `FORTRESS_THREADS=1 F att_b.fss`
vs `=4`: the only differing lines are the three `ms` timings; all twelve
`sum`/element lines match to the last digit (e.g. `dQ  sum 0.7870326833403783
dQ[5,7] -0.015176485293592131`). `checks/threads1.txt` vs `checks/threads4.txt`,
after stripping `(NNNN ms)`, the `total N s` line and the `threads N` header:
**identical**, both ending `VERDICT: 36 PASS, 0 FAIL of 36 -- ALL PASS`.
*Correction:* `att_b.fss:96-97` spells the parallel loop
`rs = array[\Any\](bsz nHead)` / `for d <- 0#bsz, h <- 0#nHead do rs[d nHead + h] := …`,
not `0#nd, h <- 0#nc` over `array[\Any\](nd nc)`. The row-view loop is
`lift_c.fss:52` (`for i <- 0#nr do rowOf(out, i).assign(…) end`), as claimed.
`for.tex:28-32` carries "the programmer must assume that each loop iteration
will occur independently in parallel unless every generator is explicitly
sequential".

**172 — CONFIRMED.** `F alg_g3.fss` → exit 0, decisive line
`(5) scalar / still scalar: 7.0 / 2.0 = 3.5  7 / 2 = 7/2`. *Sharpening of the
library citation:* `FortressLibrary.fss:851` is `opr /(self,other:ZZ):QQ`,
declared on `trait ZZ extends Integral[\ZZ\]` (:822) and inherited by ZZ32
(`trait ZZ32 extends { ZZ64, Integral[\ZZ32\] }`, :642); there is no
ZZ32-specific `/`, so say "inherited from `trait ZZ`" rather than implying a
ZZ32 declaration. The spec half of the citation is the literal placeholder
`basic/…` and cannot be checked — it needs a real file and line.

---

## Summary

| row | verdict |
|---|---|
| 156 | CONFIRMED WITH CORRECTION (rats lines 171-172 and 141, not 170-171 and 143; spec range 390-400) |
| 157 | CONFIRMED WITH CORRECTION (quoted message names `rows`/`rmsn`; the probe has `applyIt`/`dblG`) |
| 158 | CONFIRMED (spec citation `function.tex` does not state the omission it is cited for) |
| 159 | CONFIRMED (spec citation `operator-app.tex` is about operator *names*) |
| 160 | CONFIRMED WITH CORRECTION (message truncated; the third clause has no cited reproducer) |
| 161 | CONFIRMED |
| 162 | CONFIRMED (spec citation should be 402-403, not 721-731) |
| 163 | CONFIRMED |
| 164 | CONFIRMED WITH CORRECTION ("before any component is read" unobservable; `apis.tex` has no scope statement) |
| 165 | CONFIRMED WITH CORRECTION (quote has extra spaces; overload list order is nondeterministic) |
| 166 | CONFIRMED WITH CORRECTION (library line 1989, not 1993; no `assign` on `Indexed`) |
| 167 | CONFIRMED WITH CORRECTION (labels are (1),(2),(5),(6),(7)) |
| 168 | CONFIRMED WITH CORRECTION (24 `opr`, not 28; `exp`/`log` are functions) |
| 169 | CONFIRMED |
| 170 | CONFIRMED |
| 171 | CONFIRMED (`att_b`'s generators are `0#bsz, 0#nHead`) |
| 172 | CONFIRMED (`/` is inherited from `trait ZZ`; the spec citation is a placeholder) |

No row is NOT CONFIRMED: every claimed behaviour reproduced. All corrections
are to cited line numbers, quoted text, counts, and one unobservable inference.
