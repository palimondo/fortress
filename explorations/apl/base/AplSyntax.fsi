(* AplSyntax -- the grammar half of the APL sub-language.  Same sub-language
   apl⦇ … ⦈ as v1/base/AplSyntax.fsi, same strictly right-to-left evaluation, same
   strands, same index origin 0 -- but the templates expand to HOST CODE, not to
   a string-dispatched interpreter.  Where v1 wrote

       l:AplAtom SPACE f:AplFn SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
       ⍳ => <[ "iota" ]>   ×  => <[ "times" ]>   …

   and made AplCore switch on the name at run time, this file writes one rule
   per glyph per arity, and the expansion is the Fortress operator itself:

       l:AplAtom SPACE × SPACE r:AplE => <[ (l) × (r) ]>

   so the monadic/dyadic split and the rank split are both done by Fortress
   overload resolution, at the call, with no dispatch table in the library.

   Two consequences for the shape of the grammar.

   (1) One rule per glyph per arity is more rules than v1's one rule for all
       glyphs -- but each rule is a translation, so the library loses its
       aplDy/aplMon/aplRed switches (67 lines in v1) entirely.

   (2) Dyadic ⍴ is the one primitive whose RESULT RANK is the LENGTH of its left
       argument, a run-time value.  Rather than carry a runtime rank in the
       values, the grammar reads the rank off the SOURCE TEXT: `r c⍴x` is a
       matrix and fires aplReshapeM, `n⍴x` is a vector and fires aplReshapeV.
       These two rules must come first, before the strand in AplAtom can eat
       `r c` as one vector.

   The five things to know before editing this file all still hold:
   free names resolve at the use site; SPACE and a literal space are both
   OPTIONAL whitespace; a backtick escape is seen by the PREPARSER as an opening
   quote, so at least one APL glyph must stand ABOVE every escape (the ⍴ of the
   first rule is above them all); a nonterminal's name must not be a word of two
   or more uppercase letters; and a template cannot expand to a binding or an
   assignment, which is why rung 1 needs no APL names at all. *)
api AplSyntax

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar AplG extends { Expression, Literal, Identifier }

    Expr |:= apl⦇ b:AplStm SPACE ⍝ t:AplCmt ⦈ => <[ (b) ]>
           | apl⦇ b:AplStm ⦈                  => <[ (b) ]>

    (* the book's own trailing comment, one character at a time: a NOT inside a
       repetition group runs to the end of the file (apl/gaps.md row 9) *)
    AplCmt :Expr:=
        NOT ⦈ _ t:AplCmt => <[ 0 ]>
      | NOT ⦈ _          => <[ 0 ]>

    (* the same comment tail bounded by the END OF ITS LINE, so that it may
       follow a statement that is not the block's last: NEWLINE is an Item of the
       macro language (apl/gaps.md row 31) and NOT is the PEG not-predicate, so
       two NOTs in sequence read "while neither the closing bracket nor a line
       break is next".  Every symbol here needs its #: without it the optional
       whitespace between two symbols crosses the line break, the NOT then looks
       PAST the newline, and the comment swallows the statements below it
       (s04_stm.out.0, `s04_stm.fss:21:42: Syntax Error`).  The # on a
       NOT-prefixed symbol is honoured -- Syntax.rats:248-254 lifts the
       NoWhitespaceSymbol back out over the predicate. *)
    AplLn :Expr:=
        NOT ⦈# NOT NEWLINE# _# t:AplLn => <[ 0 ]>
      | NOT ⦈# NOT NEWLINE# _          => <[ 0 ]>

    (* ------------------------------------------------ rung 2: statements ----
       APL's ← binds, and what it binds is a LAMBDA PARAMETER: the rest of the
       block is the lambda's body, so the name is a real block-scoped Fortress
       variable and host code in the block sees it (apl/gaps.md rows 23, 30).
       The Id gap is the one position a name may be spliced into; a name can only
       be READ through the closed set of AplName below (row 24).

       ⋄ and a line break both separate statements, the line break becoming the
       host parser's own br.  A binding needs a REST to be the body of, so both
       binding alternatives demand a separator and a following statement; a lone
       `v ← e` has no production and is a Syntax Error.

       No cell, and no rebinding to an updated copy: the library's arrays are
       MUTABLE (s01_ix.out (a)), so v[3] ← ¯1 is an in-place put on the array the
       name is already bound to.  Rebinding is not available anyway -- a second
       lambda parameter of the same name is "Variable v is already declared"
       (row 29, s05_rebind.out). *)
    AplStm :Expr:=
      (* ---- rung 4.  A dfn's body is this same statement chain, so the three
              shapes a dfn adds are three groups of alternatives here, all of
              them ABOVE the binding rule: a line that is nothing but a comment
              (the chapter's dfns open with one); the default left argument
              `⍺ ← e`, which is not a binding at all but a call on the frame
              stack, and which must stand above the binding rule because ⍺ is
              not an Id (rung-4/u05_glyphid.out.0); and the GUARD `c: e`, whose
              else branch is the rest of the body -- exactly APL's own flow.
              The guard's colon needs the backtick escape (rung-4/u06_guard.out),
              and the guard rules must stand above the bare-expression rules:
              below them `0=≢⍵` would match as a whole statement, the `:` would
              be left over, and PEG does not re-enter a nonterminal that has
              already succeeded (gap row 60). ---- *)
        ⍝ c:AplLn
        r:AplStm                                      => <[ (r) ]>
      | ⍺ SPACE ← SPACE e:AplE SPACE ⍝ c:AplLn SPACE r:AplStm
            => <[ (fn _ => (r))(aplDefaultAlpha((e))) ]>
      | ⍺ SPACE ← SPACE e:AplE SPACE ⋄ SPACE r:AplStm
            => <[ (fn _ => (r))(aplDefaultAlpha((e))) ]>
      | ⍺ SPACE ← SPACE e:AplE
        r:AplStm
            => <[ (fn _ => (r))(aplDefaultAlpha((e))) ]>
      | c:AplE SPACE `: SPACE e:AplE SPACE ⍝ m:AplLn SPACE r:AplStm
            => <[ if aplTruthy((c)) then (e) else (r) end ]>
      | c:AplE SPACE `: SPACE e:AplE SPACE ⋄ SPACE r:AplStm
            => <[ if aplTruthy((c)) then (e) else (r) end ]>
      | c:AplE SPACE `: SPACE e:AplE
        r:AplStm
            => <[ if aplTruthy((c)) then (e) else (r) end ]>
      (* ---- rung 5: DESTRUCTURING.  APL's `a b c ← e` takes a strand of
              arrays apart; a strand of arrays is a Fortress TUPLE here, so the
              binding is a lambda of two or three parameters applied to one
              tuple-valued expression (rung-5/v03_destr.out).  These stand above
              the single-name binding, longest first; `_` is still not an Id
              (row 69), so a throw-away element has to be named. ---- *)
      (* ---- microgpt rung: NINE names.  `wte wpe lm wq wk wv wo f1 f2←vw¨⍳9`
              (L14) takes the nine weight views apart in one line, so the
              three-name rule is copied at arity nine and stands above it,
              longest first as the other destructuring rules are.  The gap
              names skip `e`, which is the expression's.  No arity between
              four and eight is needed and none is added. ---- *)
      | a:Id SPACE b:Id SPACE c:Id SPACE d:Id SPACE f:Id SPACE g:Id SPACE h:Id SPACE i:Id SPACE j:Id SPACE ← SPACE e:AplE SPACE ⍝ m:AplLn SPACE r:AplStm
            => <[ (fn (a, b, c, d, f, g, h, i, j) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE c:Id SPACE d:Id SPACE f:Id SPACE g:Id SPACE h:Id SPACE i:Id SPACE j:Id SPACE ← SPACE e:AplE SPACE ⋄ SPACE r:AplStm
            => <[ (fn (a, b, c, d, f, g, h, i, j) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE c:Id SPACE d:Id SPACE f:Id SPACE g:Id SPACE h:Id SPACE i:Id SPACE j:Id SPACE ← SPACE e:AplE
        r:AplStm
            => <[ (fn (a, b, c, d, f, g, h, i, j) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE c:Id SPACE ← SPACE e:AplE SPACE ⍝ m:AplLn SPACE r:AplStm
            => <[ (fn (a, b, c) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE c:Id SPACE ← SPACE e:AplE SPACE ⋄ SPACE r:AplStm
            => <[ (fn (a, b, c) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE c:Id SPACE ← SPACE e:AplE
        r:AplStm
            => <[ (fn (a, b, c) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE ← SPACE e:AplE SPACE ⍝ m:AplLn SPACE r:AplStm
            => <[ (fn (a, b) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE ← SPACE e:AplE SPACE ⋄ SPACE r:AplStm
            => <[ (fn (a, b) => (r))((e)) ]>
      | a:Id SPACE b:Id SPACE ← SPACE e:AplE
        r:AplStm
            => <[ (fn (a, b) => (r))((e)) ]>
      | n:Id SPACE ← SPACE e:AplE SPACE ⍝ c:AplLn SPACE r:AplStm
            => <[ (fn n => (r))((e)) ]>
      | n:Id SPACE ← SPACE e:AplE SPACE ⋄ SPACE r:AplStm
            => <[ (fn n => (r))((e)) ]>
      | n:Id SPACE ← SPACE e:AplE
        r:AplStm
            => <[ (fn n => (r))((e)) ]>
      | s:AplE SPACE ⍝ c:AplLn SPACE r:AplStm => <[ (fn _ => (r))((s)) ]>
      | s:AplE SPACE ⋄ SPACE r:AplStm         => <[ (fn _ => (r))((s)) ]>
      | s:AplE
        r:AplStm                              => <[ (fn _ => (r))((s)) ]>
      (* rung 4: the LAST statement of a dfn body may carry the book's trailing
         comment, which the top-level expander rule catches for a whole block
         but which has no production inside the braces.  It stands above the
         bare `s:AplE` because that alternative would match and leave the
         comment for the closing brace. *)
      | s:AplE SPACE ⍝ c:AplLn                => <[ (s) ]>
      | s:AplE                                => <[ (s) ]>

    AplE :Expr:=
      (* ---- indexed and selective assignment.  One production per left-hand
              shape, and the expansion is an in-place put on the array the name
              is bound to, so nothing is rebound and nothing is copied. ---- *)
        c:AplName `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `] SPACE ← SPACE r:AplE
            => <[ aplIxPut2((c), (i), (j), (r)) ]>
      | c:AplName `[ SPACE i:AplE SPACE ; SPACE `] SPACE ← SPACE r:AplE
            => <[ aplIxPutRow((c), (i), (r)) ]>
      | c:AplName `[ SPACE ; SPACE j:AplE SPACE `] SPACE ← SPACE r:AplE
            => <[ aplIxPutCol((c), (j), (r)) ]>
      | c:AplName `[ SPACE i:AplE SPACE `] SPACE ← SPACE r:AplE
            => <[ aplIxPut1((c), (i), (r)) ]>
      | ( SPACE s:AplAtom SPACE / SPACE c:AplName SPACE ) SPACE ← SPACE r:AplE
            => <[ aplSelPut((c), (s), (r)) ]>
      | ( SPACE 0 SPACE 0 ⍉ SPACE c:AplName SPACE ) SPACE ← SPACE r:AplE
            => <[ aplDiagPut((c), (r)) ]>

      (* ---- ⌷ squad.  Like dyadic ⍴, the LENGTH of the left argument decides
              the result's rank, so the grammar counts the numerals it can see
              (apl/gaps.md row 47); (⊂i)⌷m selects leading-axis cells. ---- *)
      | ( SPACE ⊂ SPACE i:AplE SPACE ) SPACE ⌷ SPACE r:AplE
            => <[ aplSquadEncl((i), (r)) ]>
      | a:AplNum SPACE b:AplNum SPACE ⌷ SPACE r:AplE => <[ aplSquad2((a), (b), (r)) ]>
      | a:AplNum SPACE ⌷ SPACE r:AplE                => <[ aplSquad1((a), (r)) ]>

      (* ---- rung 4: rank 3.  The same trick as the two-axis reshape, one
              axis further: the grammar counts the atoms it can see, so
              `(a,b,c)⍴x` and `2 3 4⍴x` fire aplReshape3 and the rank of the
              result is fixed at expansion.  Both stand above the two-atom
              rules, which would otherwise match the first two atoms and then
              fail on the comma.  `1 0 2⍉t` reads its three numerals the same
              way and hands them to aplPerm, whose contract refuses every other
              permutation. ---- *)
      | ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE , SPACE c:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE
            => <[ aplReshape3((a), (b), (c), (r)) ]>
      | a:AplNum SPACE b:AplNum SPACE c:AplNum SPACE ⍴ SPACE r:AplE
            => <[ aplReshape3((a), (b), (c), (r)) ]>
      | a:AplNum SPACE b:AplNum SPACE c:AplNum SPACE ⍉ SPACE r:AplE
            => <[ aplPerm((a), (b), (c), (r)) ]>

      (* ---- dyadic ⍴: the rank of the result is fixed HERE, at expansion.
              `(a,b)⍴x` is the same rule with an EXPRESSION shape, and its two
              gaps must be ATOMS: an AplE gap eats the comma as a catenation and
              the rule is then never matched (rung-3/t02_gram.out.5).  It stands
              above the numeral rules because a parenthesis would otherwise be
              taken by AplAtom's own `( AplE )` first. ---- *)
      | ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE
            => <[ aplReshapeM((a), (b), (r)) ]>
      (* microgpt rung: a NAME as the shape, for `N⍴⍳Blk` (L13).  The rank is
         still read off the source text -- one name is a SCALAR shape and so
         yields a vector, which is the only case the program needs.  It stands
         above the numeral rules; a name is not a numeral, so the order is for
         reading and not for correctness. *)
      | n:AplName SPACE ⍴ SPACE r:AplE               => <[ aplReshapeV((n), (r)) ]>
      | a:AplNum SPACE b:AplNum SPACE ⍴ SPACE r:AplE => <[ aplReshapeM((a), (b), (r)) ]>
      | a:AplNum SPACE ⍴ SPACE r:AplE                => <[ aplReshapeV((a), (r)) ]>

      (* ---- ↑ and ↓ with a two-element left argument: the same numeral count
              as ⍴ and ⌷, and for the same reason -- `1 2↑m` must not read its
              left argument as one strand. ---- *)
      | a:AplNum SPACE b:AplNum SPACE ↑ SPACE r:AplE => <[ aplTake((a), (b), (r)) ]>
      | a:AplNum SPACE b:AplNum SPACE ↓ SPACE r:AplE => <[ aplDrop((a), (b), (r)) ]>

      (* ---- rung 4: the rank operator ⍤.  The rank is read off the SOURCE, as
              a reshape's is, so `1` and `2` are terminals and the monadic and
              dyadic forms name different library functions.  Two spellings per
              valence: the book's `f⍤1⊢r`, where ⊢ separates the operator from
              its argument, and the parenthesised `(f⍤1)r`, which is what the
              microGPT program writes.  These stand above ⍨ and above the calls
              so that the glyph is read as an OPERAND before it is read as an
              operator. ---- *)
      (* ---- rung 6: ⍤ with TWO ranks.  `0 1` pairs every scalar of ⍺ with the
              whole of ⍵ (a vector) or with one row of it (a matrix), and the
              outer product is a special case of it.  Both numerals are
              terminals, as the one-numeral ranks are, and these rules stand
              above them: `⍤ 0` matches neither `⍤ 1` nor `⍤ 2`, so the order is
              for reading and not for correctness. ---- *)
      | l:AplAtom SPACE f:AplFnD ⍤ 0 SPACE 1 SPACE ⊢ SPACE r:AplE
            => <[ aplRankD01((f), (l), (r)) ]>
      | l:AplAtom SPACE ( SPACE f:AplFnD ⍤ 0 SPACE 1 SPACE ) SPACE r:AplE
            => <[ aplRankD01((f), (l), (r)) ]>

      | l:AplAtom SPACE ( SPACE f:AplFnD ⍤ 1 SPACE ) SPACE r:AplE
            => <[ aplRankD1((f), (l), (r)) ]>
      | l:AplAtom SPACE ( SPACE f:AplFnD ⍤ 2 SPACE ) SPACE r:AplE
            => <[ aplRankD2((f), (l), (r)) ]>
      | l:AplAtom SPACE f:AplFnD ⍤ 1 SPACE ⊢ SPACE r:AplE
            => <[ aplRankD1((f), (l), (r)) ]>
      | l:AplAtom SPACE f:AplFnD ⍤ 2 SPACE ⊢ SPACE r:AplE
            => <[ aplRankD2((f), (l), (r)) ]>
      | ( SPACE f:AplFnM ⍤ 1 SPACE ) SPACE r:AplE => <[ aplRank1((f), (r)) ]>
      | ( SPACE f:AplFnM ⍤ 2 SPACE ) SPACE r:AplE => <[ aplRank2((f), (r)) ]>
      | f:AplFnM ⍤ 1 SPACE ⊢ SPACE r:AplE         => <[ aplRank1((f), (r)) ]>
      | f:AplFnM ⍤ 2 SPACE ⊢ SPACE r:AplE         => <[ aplRank2((f), (r)) ]>

      (* ---- rung 5: ⍣ Power.  The count is read off the SOURCE, as ⍤'s rank
              is, but it may be a NAME as well as a numeral (the program writes
              `step⍣BLK⊢…`), so the gap is an atom.  With a FUNCTION right
              operand ⍣ is a while-loop: f is applied until the condition is
              true of the new value as ⍺ and the old one as ⍵.  The count rules
              stand first: an atom is not a glyph, so the two cannot collide.
              The last form is the book's own `2÷⍨⍣=10`, which has no ⊢. ---- *)
      | f:AplFnM ⍣ SPACE n:AplAtom SPACE ⊢ SPACE r:AplE
            => <[ aplPower((f), (n), (r)) ]>
      | ( SPACE f:AplFnM ⍣ SPACE n:AplAtom SPACE ) SPACE r:AplE
            => <[ aplPower((f), (n), (r)) ]>
      | f:AplFnM ⍣ SPACE g:AplFnD SPACE ⊢ SPACE r:AplE
            => <[ aplPowerUntil((f), (g), (r)) ]>
      | f:AplFnM ⍣ SPACE g:AplFnD SPACE r:AplE
            => <[ aplPowerUntil((f), (g), (r)) ]>

      (* ---- microgpt rung: `⊃,/,¨` over a strand, as ONE direct rule.  The
              program's last line (L28) ravels every element of a strand and
              catenates them all into one flat vector, which is C4's varargs
              `flat`.  Read generally it would be `,¨` over the strand (cells
              that are not scalars), then `,/` folded over the NESTED vector
              that makes, then `⊃` -- and this base has no nested array, so the
              direct rule is the only reading.  It stands above the ¨ rules and
              far above the monadic ⊃, both of which would otherwise take the
              head of it. ---- *)
      | ⊃ , / , ¨ SPACE t:AplTuple => <[ aplFlatten((t)) ]>

      (* ---- rung 5: ¨ Each.  The first two alternatives read a NAME STRAND --
              two or three names, which is a Fortress tuple -- and hand the
              elements over one by one, so no overload has to tell a tuple from
              an array.  They stand above the general rules, which would
              otherwise take the strand through AplTuple and hand aplEach a
              tuple.  The dyadic rule stands above the monadic one and both
              above the calls. ---- *)
      | f:AplFnM ¨ SPACE a:AplTName SPACE b:AplTName SPACE c:AplTName
            => <[ aplEachT3((f), (a), (b), (c)) ]>
      | f:AplFnM ¨ SPACE a:AplTName SPACE b:AplTName
            => <[ aplEachT2((f), (a), (b)) ]>
      | l:AplAtom SPACE f:AplFnD ¨ SPACE r:AplE => <[ aplEach((f), (l), (r)) ]>
      | f:AplFnM ¨ SPACE r:AplE                 => <[ aplEach((f), (r)) ]>

      (* ---- rung 6: OUTER PRODUCT ∘.g .  The dot is a plain item: `.` is not
              one of the macro language's SpecialChars and the backtick escape
              is a Syntax Error for it (rung-5/v02_term.out.1).  Eight glyphs
              get a direct rule that reaches a typed library entry with no frame
              push; every other operand goes through aplCall.  The commuted
              forms come first because `∘.×⍨⍳10` has no left atom at all.  All
              of them stand ABOVE rung 4's `a∘g` bind rule, which would
              otherwise take the `∘`; in fact it cannot, because AplDy has no
              `.`, but the order is the design's and costs nothing. ---- *)
      | ∘ . × ⍨ SPACE r:AplE  => <[ aplOuterMul((r), (r)) ]>
      | ∘ . = ⍨ SPACE r:AplE  => <[ aplOuterEq((r), (r)) ]>
      | ∘ . ≠ ⍨ SPACE r:AplE  => <[ aplOuterNe((r), (r)) ]>
      | ∘ . < ⍨ SPACE r:AplE  => <[ aplOuterLt((r), (r)) ]>
      | ∘ . ≤ ⍨ SPACE r:AplE  => <[ aplOuterLe((r), (r)) ]>
      | ∘ . > ⍨ SPACE r:AplE  => <[ aplOuterGt((r), (r)) ]>
      | ∘ . ≥ ⍨ SPACE r:AplE  => <[ aplOuterGe((r), (r)) ]>
      | ∘ . `| ⍨ SPACE r:AplE => <[ aplOuterRes((r), (r)) ]>
      | ∘ . g:AplFnD ⍨ SPACE r:AplE => <[ aplOuter((g), (r), (r)) ]>
      | l:AplAtom SPACE ∘ . × SPACE r:AplE  => <[ aplOuterMul((l), (r)) ]>
      | l:AplAtom SPACE ∘ . = SPACE r:AplE  => <[ aplOuterEq((l), (r)) ]>
      | l:AplAtom SPACE ∘ . ≠ SPACE r:AplE  => <[ aplOuterNe((l), (r)) ]>
      | l:AplAtom SPACE ∘ . < SPACE r:AplE  => <[ aplOuterLt((l), (r)) ]>
      | l:AplAtom SPACE ∘ . ≤ SPACE r:AplE  => <[ aplOuterLe((l), (r)) ]>
      | l:AplAtom SPACE ∘ . > SPACE r:AplE  => <[ aplOuterGt((l), (r)) ]>
      | l:AplAtom SPACE ∘ . ≥ SPACE r:AplE  => <[ aplOuterGe((l), (r)) ]>
      | l:AplAtom SPACE ∘ . `| SPACE r:AplE => <[ aplOuterRes((l), (r)) ]>
      | l:AplAtom SPACE ∘ . g:AplFnD SPACE r:AplE => <[ aplOuter((g), (l), (r)) ]>

      (* ---- rung 6: INNER PRODUCT f.g .  `+.×` is matrix multiplication and
              gets a direct rule; so does `+.=`.  The general rule reads two
              AplFnD operands, and it must stand BELOW the `+.×` rule: AplFnD's
              own first alternative is `+.×`, so at the `+` of `A +.× B` it
              succeeds, is memoized, and the general rule then looks for a `.`
              that is not there (row 60). ---- *)
      | l:AplAtom SPACE `+ . × SPACE r:AplE => <[ aplMatMul((l), (r)) ]>
      | l:AplAtom SPACE `+ . = SPACE r:AplE => <[ aplInnerPlusEq((l), (r)) ]>
      | l:AplAtom SPACE f:AplFnD . g:AplFnD SPACE r:AplE
            => <[ aplInner((f), (g), (l), (r)) ]>

      (* ---- rung 4: ∘ with a bound left argument.  `relu ← 0∘⌈` is a FUNCTION
              value, so the rule expands to a closure over the frame stack and
              not to a call. ---- *)
      | a:AplAtom SPACE ∘ SPACE g:AplFnD => <[ aplBindLeft((g), (a)) ]>

      (* ---- Commute ⍨.  The glyph is looked up in AplDy, whose alternatives
              are host lambdas -- as of rung 4 ZERO-PARAMETER lambdas over the
              frame stack -- so the two arguments are handed over swapped by
              aplCall, which pushes them.  The monadic form f⍨r is r f r.  The
              operand may now also be a dfn or a named function.  These rules
              stand above the plain dyadic ones so that the glyph is read as an
              operand before it is read as an operator. ---- *)
      | l:AplAtom SPACE f:AplFnD ⍨ SPACE r:AplE => <[ aplCall((f), (r), (l)) ]>
      | f:AplFnD ⍨ SPACE r:AplE                 => <[ aplCall((f), (r), (r)) ]>

      (* ---- rung 4: ∇ is the function the current frame is running ---- *)
      | l:AplAtom SPACE ∇ SPACE r:AplE => <[ aplCall(aplSelf(), (l), (r)) ]>
      | ∇ SPACE r:AplE                 => <[ aplCall1(aplSelf(), (r)) ]>

      (* ---- rung 4: applying a dfn or a named function.  The operand is
              AplUser -- a dfn or a name -- and NOT AplFnD: were the glyph
              tables admitted here, these two rules would stand above the plain
              dyadic and monadic glyph rules and shadow every one of them, and
              rungs 1-3 would pay a frame push per primitive.  A glyph used
              directly still expands to the host operator itself. ---- *)
      | l:AplAtom SPACE f:AplUser SPACE r:AplE => <[ aplCall((f), (l), (r)) ]>
      | f:AplUser SPACE r:AplE                 => <[ aplCall1((f), (r)) ]>

      (* ---- rung 4: ⊢ Right and ⊣ Left, and dyadic ⊃ Pick from a vector ---- *)
      | l:AplAtom SPACE ⊢ SPACE r:AplE => <[ (r) ]>
      | l:AplAtom SPACE ⊣ SPACE r:AplE => <[ (l) ]>
      | ⊢ SPACE r:AplE                 => <[ (r) ]>
      | ⊣ SPACE r:AplE                 => <[ (r) ]>
      | l:AplAtom SPACE ⊃ SPACE r:AplE => <[ aplPickAt((l), (r)) ]>

      (* ---- dyadic glyphs.  Each expands to the host operator of the same
              shape; ⌈ and ⌊ are enclosers in the host table and cannot be
              declared, so they expand to MAX and MIN while the APL source keeps
              the glyph.  , cannot be an operator in any arity, so it expands to
              a call. ---- *)
      | l:AplAtom SPACE × SPACE r:AplE => <[ (l) × (r) ]>
      | l:AplAtom SPACE ÷ SPACE r:AplE => <[ (l) ÷ (r) ]>
      | l:AplAtom SPACE ⌈ SPACE r:AplE => <[ (l) MAX (r) ]>
      | l:AplAtom SPACE ⌊ SPACE r:AplE => <[ (l) MIN (r) ]>
      | l:AplAtom SPACE ≡ SPACE r:AplE => <[ (l) ≡ (r) ]>
      | l:AplAtom SPACE ≤ SPACE r:AplE => <[ (l) ≤ (r) ]>
      | l:AplAtom SPACE , SPACE r:AplE => <[ aplCat((l), (r)) ]>
      | l:AplAtom SPACE = SPACE r:AplE => <[ (l) = (r) ]>
      | l:AplAtom SPACE - SPACE r:AplE => <[ (l) - (r) ]>
      | l:AplAtom SPACE `+ SPACE r:AplE => <[ (l) + (r) ]>
      | l:AplAtom SPACE `* SPACE r:AplE => <[ (l) * (r) ]>

      (* ---- rung 3's dyadic glyphs.  ≠ < > ≥ ∧ ∨ and ⊖ are oprs of AplCore,
              so their rules are translations like × and ÷; ↑ ↓ ⌽ ⍳ ⍸ ∊ ∪ ∩ ~ ⍪ ⍟
              and | are calls, | being a host encloser and the rest not being in
              the host's operator table.  Every one of these glyphs parses as a
              terminal, the backtick escape being needed only for |
              (rung-3/t02_gram.out). ---- *)
      | l:AplAtom SPACE ≠ SPACE r:AplE => <[ (l) ≠ (r) ]>
      | l:AplAtom SPACE < SPACE r:AplE => <[ (l) < (r) ]>
      | l:AplAtom SPACE > SPACE r:AplE => <[ (l) > (r) ]>
      | l:AplAtom SPACE ≥ SPACE r:AplE => <[ (l) ≥ (r) ]>
      | l:AplAtom SPACE ∧ SPACE r:AplE => <[ (l) ∧ (r) ]>
      | l:AplAtom SPACE ∨ SPACE r:AplE => <[ (l) ∨ (r) ]>
      | l:AplAtom SPACE ⊖ SPACE r:AplE => <[ (l) ⊖ (r) ]>
      | l:AplAtom SPACE ↑ SPACE r:AplE => <[ aplTake((l), (r)) ]>
      | l:AplAtom SPACE ↓ SPACE r:AplE => <[ aplDrop((l), (r)) ]>
      | l:AplAtom SPACE ⌽ SPACE r:AplE => <[ aplRotate((l), (r)) ]>
      | l:AplAtom SPACE ⍳ SPACE r:AplE => <[ aplIndexOf((l), (r)) ]>
      | l:AplAtom SPACE ⍸ SPACE r:AplE => <[ aplBin((l), (r)) ]>
      | l:AplAtom SPACE ∊ SPACE r:AplE => <[ aplIn((l), (r)) ]>
      | l:AplAtom SPACE ∪ SPACE r:AplE => <[ aplUnion((l), (r)) ]>
      | l:AplAtom SPACE ∩ SPACE r:AplE => <[ aplIntersect((l), (r)) ]>
      | l:AplAtom SPACE ~ SPACE r:AplE => <[ aplWithout((l), (r)) ]>
      | l:AplAtom SPACE ⍪ SPACE r:AplE => <[ aplCatFirst((l), (r)) ]>
      | l:AplAtom SPACE ⍟ SPACE r:AplE => <[ aplLog((l), (r)) ]>
      | l:AplAtom SPACE `| SPACE r:AplE => <[ aplResidue((l), (r)) ]>

      (* ---- reductions.  f/ is the last axis, f⌿ the first.  v1 had ONE rule
              for every glyph because the glyph became a string; here there is
              one rule per glyph, and the expansion names the library function
              whose body is the shipped SUM / PROD / BIG MAX. ---- *)
      | `+ / SPACE r:AplE => <[ aplSumLast((r)) ]>
      | `+ ⌿ SPACE r:AplE => <[ aplSumFirst((r)) ]>
      | × / SPACE r:AplE  => <[ aplProdLast((r)) ]>
      | ⌈ / SPACE r:AplE  => <[ aplMaxLast((r)) ]>
      | - / SPACE r:AplE  => <[ aplDifLast((r)) ]>
      | ⌊ / SPACE r:AplE  => <[ aplMinLast((r)) ]>
      | ⌊ ⌿ SPACE r:AplE  => <[ aplMinFirst((r)) ]>
      | ⌈ ⌿ SPACE r:AplE  => <[ aplMaxFirst((r)) ]>
      | × ⌿ SPACE r:AplE  => <[ aplProdFirst((r)) ]>
      | - ⌿ SPACE r:AplE  => <[ aplDifFirst((r)) ]>

      (* ---- rung 5: SCANS.  `\` is the last axis and `⍀` the first; element k
              of a scan is the REDUCTION of the first k+1 items, so -\1 2 3 is
              1 ¯1 2.  Neither `\` nor `⍀` takes the backtick escape -- neither
              is one of the macro language's SpecialChars, and the escape is a
              Syntax Error for `\` (rung-5/v02_term.out.0). ---- *)
      | `+ \ SPACE r:AplE => <[ aplSumScanLast((r)) ]>
      | × \ SPACE r:AplE  => <[ aplProdScanLast((r)) ]>
      | ⌈ \ SPACE r:AplE  => <[ aplMaxScanLast((r)) ]>
      | ⌊ \ SPACE r:AplE  => <[ aplMinScanLast((r)) ]>
      | - \ SPACE r:AplE  => <[ aplDifScanLast((r)) ]>
      | `+ ⍀ SPACE r:AplE => <[ aplSumScanFirst((r)) ]>
      | × ⍀ SPACE r:AplE  => <[ aplProdScanFirst((r)) ]>
      | ⌈ ⍀ SPACE r:AplE  => <[ aplMaxScanFirst((r)) ]>
      | ⌊ ⍀ SPACE r:AplE  => <[ aplMinScanFirst((r)) ]>
      | - ⍀ SPACE r:AplE  => <[ aplDifScanFirst((r)) ]>

      (* ---- rung 5: the GENERAL f/ f⌿ f\ f⍀ , below every direct rule above,
              so that `+/` keeps the shipped SUM and only a dfn or a glyph the
              direct rules do not name reaches aplCall.  A glyph is not an
              atom, so these cannot mask compress below them either. ---- *)
      | f:AplFnD / SPACE r:AplE  => <[ aplFoldLast((f), (r)) ]>
      | f:AplFnD ⌿ SPACE r:AplE  => <[ aplFoldFirst((f), (r)) ]>
      | f:AplFnD \ SPACE r:AplE => <[ aplScanLast((f), (r)) ]>
      | f:AplFnD ⍀ SPACE r:AplE  => <[ aplScanFirst((f), (r)) ]>

      (* ---- Compress and Replicate.  A glyph is not an atom, so these cannot
              mask the reductions above them. ---- *)
      | l:AplAtom / SPACE r:AplE => <[ aplCompress((l), (r)) ]>
      | l:AplAtom ⌿ SPACE r:AplE => <[ aplCompressFirst((l), (r)) ]>

      (* ---- monadic glyphs ---- *)
      | ⍴ SPACE r:AplE => <[ aplShapeOf((r)) ]>
      | ⍳ SPACE r:AplE => <[ aplIota((r)) ]>
      | ≢ SPACE r:AplE => <[ ≢ (r) ]>
      | ⊃ SPACE r:AplE => <[ ⊃ (r) ]>
      | ⊖ SPACE r:AplE => <[ ⊖ (r) ]>
      | ⌽ SPACE r:AplE => <[ aplRev((r)) ]>
      | ⍉ SPACE r:AplE => <[ aplTrans((r)) ]>
      | ⌈ SPACE r:AplE => <[ aplCeil((r)) ]>
      | ⌊ SPACE r:AplE => <[ aplFloor((r)) ]>
      | ⍸ SPACE r:AplE => <[ aplWhere((r)) ]>
      | × SPACE r:AplE => <[ × (r) ]>
      | ÷ SPACE r:AplE => <[ ÷ (r) ]>
      | , SPACE r:AplE => <[ aplRavel((r)) ]>
      | - SPACE r:AplE => <[ - (r) ]>
      | `+ SPACE r:AplE => <[ (r) ]>
      (* ---- rung 3's monadic glyphs.  Monadic ↑ (Mix) and ↓ (Split) are NOT
              here: both make nested arrays. ---- *)
      | ⍋ SPACE r:AplE  => <[ aplGradeUp((r)) ]>
      | ⍒ SPACE r:AplE  => <[ aplGradeDown((r)) ]>
      | ~ SPACE r:AplE  => <[ aplNot((r)) ]>
      | ∊ SPACE r:AplE  => <[ aplEnlist((r)) ]>
      | ∪ SPACE r:AplE  => <[ aplUnique((r)) ]>
      | ⍪ SPACE r:AplE  => <[ aplTable((r)) ]>
      | ⍟ SPACE r:AplE  => <[ aplLog((r)) ]>
      | `| SPACE r:AplE => <[ aplAbs((r)) ]>
      | `* SPACE r:AplE => <[ * (r) ]>
      (* a dfn standing on its own is a VALUE: `sum ← {…}` is the ordinary
         binding rule with this alternative on its right *)
      | d:AplDfn       => <[ (d) ]>
      | a:AplAtom      => <[ (a) ]>

    (* ---- the glyph tables the operators read.  Each alternative is a host
            lambda -- as of rung 4 a ZERO-PARAMETER lambda that reads ⍺ and ⍵
            off the frame stack, which is the shape EVERY APL function value
            now has, dfns included (rung-4/u04_frame.out).  A glyph used
            directly still expands to the operator itself; it is only as an
            OPERAND of ⍨ ⍤ ∘ that it becomes a value.  The lambda keeps APL's
            rank polymorphism: the overload is chosen from the arguments at the
            call, not here.  The result is ascribed `: Any` so that the value's
            type is ()->Any, which is what the rank operator's parameter wants
            (rung-4/u14_api.out.0). ---- *)
    AplDy :Expr:=
        × => <[ fn (): Any => aplAlpha() × aplOmega() ]>
      | ÷ => <[ fn (): Any => aplAlpha() ÷ aplOmega() ]>
      | `+ => <[ fn (): Any => aplAlpha() + aplOmega() ]>
      | - => <[ fn (): Any => aplAlpha() - aplOmega() ]>
      | `* => <[ fn (): Any => aplAlpha() * aplOmega() ]>
      | ⌈ => <[ fn (): Any => aplAlpha() MAX aplOmega() ]>
      | ⌊ => <[ fn (): Any => aplAlpha() MIN aplOmega() ]>
      | = => <[ fn (): Any => aplAlpha() = aplOmega() ]>
      | ≠ => <[ fn (): Any => aplAlpha() ≠ aplOmega() ]>
      | ≤ => <[ fn (): Any => aplAlpha() ≤ aplOmega() ]>
      | < => <[ fn (): Any => aplAlpha() < aplOmega() ]>
      | ≥ => <[ fn (): Any => aplAlpha() ≥ aplOmega() ]>
      | > => <[ fn (): Any => aplAlpha() > aplOmega() ]>
      | ∧ => <[ fn (): Any => aplAlpha() ∧ aplOmega() ]>
      | ∨ => <[ fn (): Any => aplAlpha() ∨ aplOmega() ]>
      | ≡ => <[ fn (): Any => aplAlpha() ≡ aplOmega() ]>
      | ⊖ => <[ fn (): Any => aplAlpha() ⊖ aplOmega() ]>
      | ↑ => <[ fn (): Any => aplTake(aplAlpha(), aplOmega()) ]>
      | ↓ => <[ fn (): Any => aplDrop(aplAlpha(), aplOmega()) ]>
      | ⌽ => <[ fn (): Any => aplRotate(aplAlpha(), aplOmega()) ]>
      | ⍳ => <[ fn (): Any => aplIndexOf(aplAlpha(), aplOmega()) ]>
      | ⍸ => <[ fn (): Any => aplBin(aplAlpha(), aplOmega()) ]>
      | ∊ => <[ fn (): Any => aplIn(aplAlpha(), aplOmega()) ]>
      | ∪ => <[ fn (): Any => aplUnion(aplAlpha(), aplOmega()) ]>
      | ∩ => <[ fn (): Any => aplIntersect(aplAlpha(), aplOmega()) ]>
      | ~ => <[ fn (): Any => aplWithout(aplAlpha(), aplOmega()) ]>
      | , => <[ fn (): Any => aplCat(aplAlpha(), aplOmega()) ]>
      | ⍪ => <[ fn (): Any => aplCatFirst(aplAlpha(), aplOmega()) ]>
      | ⍟ => <[ fn (): Any => aplLog(aplAlpha(), aplOmega()) ]>
      | `| => <[ fn (): Any => aplResidue(aplAlpha(), aplOmega()) ]>
      | ⍴ => <[ fn (): Any => aplReshapeV(aplAlpha(), aplOmega()) ]>
      | ⊃ => <[ fn (): Any => aplPickAt(aplAlpha(), aplOmega()) ]>
      (* rung 6: ⌷ as a glyph VALUE, for `tg⌷⍤0 1⊢Pr` *)
      | ⌷ => <[ fn (): Any => aplSquad1(aplAlpha(), aplOmega()) ]>

    (* ---- rung 4: the same table for the MONADIC glyphs, which an operator
            needs as soon as `⌽⍤1⊢m` or `,⍤2⊢t` is written ---- *)
    AplMo :Expr:=
        ⍉ => <[ fn (): Any => aplTrans(aplOmega()) ]>
      | ⌽ => <[ fn (): Any => aplRev(aplOmega()) ]>
      | ⊖ => <[ fn (): Any => ⊖ aplOmega() ]>
      | , => <[ fn (): Any => aplRavel(aplOmega()) ]>
      | ⍴ => <[ fn (): Any => aplShapeOf(aplOmega()) ]>
      | ⍳ => <[ fn (): Any => aplIota(aplOmega()) ]>
      | ≢ => <[ fn (): Any => ≢ aplOmega() ]>
      | ⊃ => <[ fn (): Any => ⊃ aplOmega() ]>
      | - => <[ fn (): Any => - aplOmega() ]>
      | ÷ => <[ fn (): Any => ÷ aplOmega() ]>
      | × => <[ fn (): Any => × aplOmega() ]>
      | `* => <[ fn (): Any => * aplOmega() ]>
      | ⍟ => <[ fn (): Any => aplLog(aplOmega()) ]>
      | ⌈ => <[ fn (): Any => aplCeil(aplOmega()) ]>
      | ⌊ => <[ fn (): Any => aplFloor(aplOmega()) ]>
      | ~ => <[ fn (): Any => aplNot(aplOmega()) ]>
      | ∊ => <[ fn (): Any => aplEnlist(aplOmega()) ]>
      | ∪ => <[ fn (): Any => aplUnique(aplOmega()) ]>
      | ⍋ => <[ fn (): Any => aplGradeUp(aplOmega()) ]>
      | ⍒ => <[ fn (): Any => aplGradeDown(aplOmega()) ]>
      | ⍸ => <[ fn (): Any => aplWhere(aplOmega()) ]>
      | ⍪ => <[ fn (): Any => aplTable(aplOmega()) ]>
      | `| => <[ fn (): Any => aplAbs(aplOmega()) ]>
      | `+ => <[ fn (): Any => aplOmega() ]>

    (* ---- rung 4: the dfn itself.  `{ b }` is a zero-parameter lambda over the
            statement chain; ⍺ and ⍵ inside it are frame reads, so nothing is
            bound and dfns nest to any depth (u01-u04).  The braces need the
            backtick escape. ---- *)
    AplDfn :Expr:=
        `{ SPACE b:AplStm SPACE `} => <[ fn (): Any => (b) ]>

    (* ---- rung 4: a function value that is not a glyph -- a dfn or a name
            from the closed function-name set.  This is what the two CALL rules
            read; AplFnD and AplFnM, which the operators read, add the glyph
            tables to it.  The grammar knows a function's valence from where it
            stands, and a dfn or a name takes either. ---- *)
    AplUser :Expr:=
        d:AplDfn   => <[ (d) ]>
      | n:AplFnName => <[ (n) ]>

    AplFnD :Expr:=
      (* rung 6: `+.×` as a function VALUE, so that `Qh+.×⍤2⊢⍉⍤2⊢Kh` reaches
         rung 4's aplRankD2 with matrix cells.  It must stand FIRST: below
         AplDy the `+` alone would match and the `.×` would be left over. *)
        `+ . × => <[ fn (): Any => aplMatMul(aplAlpha(), aplOmega()) ]>
      | d:AplDfn    => <[ (d) ]>
      | n:AplFnName => <[ (n) ]>
      | g:AplDy     => <[ (g) ]>

    AplFnM :Expr:=
      (* rung 5: a commuted glyph is a MONADIC function value.  `×⍨` is ⍵×⍵
         and `2÷⍨` is ⍵÷2 -- the second binds the RIGHT argument, which is the
         only way the book's `2÷⍨⍣=10` parses.  The atom form stands first. *)
        a:AplAtom SPACE g:AplDy ⍨ => <[ aplBindRight((g), (a)) ]>
      | g:AplDy ⍨   => <[ aplCommute((g)) ]>
      | d:AplDfn    => <[ (d) ]>
      | n:AplFnName => <[ (n) ]>
      | g:AplMo     => <[ (g) ]>

    (* ---- rung 4: THE CLOSED FUNCTION-NAME SET, disjoint from AplName and
            spelled the same way, one character class per letter with the NOT
            predicate ending the name.  Longer names first, so that `foo` is not
            read as `f`. ---- *)
    AplFnName :Expr:=
      (* microgpt rung's function names.  rmsn_b and sm_b must stand ABOVE
         rmsn and sm: `_` is not in [A:Za:z0:9], so the NOT predicate SUCCEEDS
         after the `rmsn` of `rmsn_b` and the shorter name would win (x01).
         An underscore inside a name needs the backtick escape even inside a
         character class -- `[_]` alone is a Syntax Error (x01_names.out.0). *)
        [r]# [m]# [s]# [n]# [`_]# [b]# NOT [A:Za:z0:9]           => <[ (rmsn_b) ]>
      | [s]# [m]# [`_]# [b]# NOT [A:Za:z0:9]                     => <[ (sm_b) ]>
      | [r]# [m]# [s]# [n]# NOT [A:Za:z0:9]                      => <[ (rmsn) ]>
      | [s]# [m]# NOT [A:Za:z0:9]                                => <[ (sm) ]>
      | [v]# [w]# NOT [A:Za:z0:9]                                => <[ (vw) ]>
      | [M]# [y]# [F]# [i]# [r]# [s]# [t]# [F]# [u]# [n]# [c]# [t]# [i]# [o]# [n]# NOT [A:Za:z0:9] => <[ (MyFirstFunction) ]>
      | [P]# [a]# [l]# [i]# [n]# [i]# [s]# [h]# NOT [A:Za:z0:9] => <[ (Palinish) ]>
      | [S]# [s]# [c]# [a]# [n]# NOT [A:Za:z0:9]                => <[ (Sscan) ]>
      | [s]# [t]# [e]# [p]# NOT [A:Za:z0:9]                     => <[ (step) ]>
      | [F]# [i]# [b]# NOT [A:Za:z0:9]                          => <[ (Fib) ]>
      | [h]# NOT [A:Za:z0:9]                                    => <[ (h) ]>
      | [u]# NOT [A:Za:z0:9]                                    => <[ (u) ]>
      | [r]# [m]# [s]# [n]# [o]# [r]# [m]# NOT [A:Za:z0:9]      => <[ (rmsnorm) ]>
      | [s]# [o]# [f]# [t]# [m]# [a]# [x]# NOT [A:Za:z0:9]      => <[ (softmax) ]>
      | [r]# [e]# [l]# [u]# NOT [A:Za:z0:9]                     => <[ (relu) ]>
      | [S]# [u]# [m]# NOT [A:Za:z0:9]                          => <[ (Sum) ]>
      | [s]# [u]# [m]# NOT [A:Za:z0:9]                          => <[ (sum) ]>
      | [f]# [o]# [o]# NOT [A:Za:z0:9]                          => <[ (foo) ]>
      | [f]# [a]# [c]# [t]# NOT [A:Za:z0:9]                      => <[ (fact) ]>
      | [s]# [q]# NOT [A:Za:z0:9]                               => <[ (sq) ]>
      | [f]# NOT [A:Za:z0:9]                                    => <[ (f) ]>
      | [g]# NOT [A:Za:z0:9]                                    => <[ (g) ]>

    (* ---- bracket indexing: six shapes, six productions.  A repeated gap does
            splice as a list (apl/gaps.md row 19), so the ;-list could have any
            arity -- what forces one production per shape is the ELIDED axis,
            which would need a sentinel value in an optional gap.  The rank of
            each result is settled by the library's overloads on the INDEX's
            rank, not here. ---- *)
    AplAtom :Expr:=
        b:AplBase `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `]
            => <[ aplIx2((b), (i), (j)) ]>
      | b:AplBase `[ SPACE i:AplE SPACE ; SPACE `] => <[ aplIxRow((b), (i)) ]>
      | b:AplBase `[ SPACE ; SPACE j:AplE SPACE `] => <[ aplIxCol((b), (j)) ]>
      | b:AplBase `[ SPACE ⊂ SPACE i:AplE SPACE `] => <[ aplPick((b), (i)) ]>
      | b:AplBase `[ SPACE c:AplCoord SPACE `]     => <[ aplScatter((b), (c)) ]>
      | b:AplBase `[ SPACE i:AplE SPACE `]         => <[ aplIx1((b), (i)) ]>
      | b:AplBase                                  => <[ (b) ]>

    (* a list of coordinate vectors, folded into a k×rank matrix.  ⊂ and the
       parenthesised pairs are absorbed here: no enclosure is ever a value. *)
    AplCoord :Expr:=
        ( SPACE v:AplE SPACE ) SPACE r:AplCoord => <[ aplIdxCons((v), (r)) ]>
      | ( SPACE v:AplE SPACE )                  => <[ aplIdxOne((v)) ]>

    (* ⍬ is zilde; ⍎(…) escapes to a Fortress expression, the parentheses being
       load-bearing because an undelimited Expr gap is greedy (gaps row 5) and an
       Id gap is not an expression at all (gaps row 4) *)
    AplBase :Expr:=
      (* rung 4: ⍺ and ⍵ are frame reads.  Neither is a legal Fortress
         identifier (u05_glyphid.out.0) and both are sub-grammar terminals. *)
        ⍺                        => <[ aplAlpha() ]>
      | ⍵                        => <[ aplOmega() ]>
      | ⍬                        => <[ aplZilde() ]>
      | ⍎ ( SPACE e:Expr SPACE ) => <[ (e) ]>
      | ( SPACE e:AplE SPACE )   => <[ (e) ]>
      (* rung 5: a NAME STRAND is a Fortress tuple.  It stands above the
         single name, longest first, and cannot collide with a call, because
         AplName and AplFnName are disjoint sets. *)
      | t:AplTuple               => <[ (t) ]>
      | c:AplName                => <[ (c) ]>
      | s:AplStrand              => <[ (s) ]>

    (* rung 5: two or three NAMES side by side are APL's strand of arrays, and
       a Fortress tuple is exactly that.  A numeral strand stays a vector; only
       names build a tuple.

       The names come from a THIRD closed set, AplTName, and not from AplName.
       Over AplName the rule is unusable: SPACE is optional whitespace and
       crosses a line break (row 68), so two ordinary names on consecutive
       lines -- `abv ← …` then `bin ← …` then `bin`, which is rung 3's Ex 34 --
       merge into one strand and the block loses its last statement
       (rung-5/v07_tuple.out.0, v07_tuple.out.1).  AplTName is disjoint from
       every name rungs 1-4 use, and the same trap still applies INSIDE it: two
       strand names on consecutive lines are one strand. *)
    AplTuple :Expr:=
      (* microgpt rung: NINE names, for `⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1
         gF2` (L28).  Longest first, as every name rule here is. *)
        a:AplTName SPACE b:AplTName SPACE c:AplTName SPACE d:AplTName SPACE f:AplTName SPACE g:AplTName SPACE h:AplTName SPACE i:AplTName SPACE j:AplTName => <[ ((a), (b), (c), (d), (f), (g), (h), (i), (j)) ]>
      | a:AplTName SPACE b:AplTName SPACE c:AplTName => <[ ((a), (b), (c)) ]>
      | a:AplTName SPACE b:AplTName                  => <[ ((a), (b)) ]>

    (* the names a STRAND may be built from; each is also an ordinary AplName
       below, so `Q+K` still reads as two names and an addition *)
    AplTName :Expr:=
      (* microgpt rung's strand names: every name the program puts in a strand,
         26 of them, on top of rung 5's nine.  Each is an ordinary AplName
         below as well, so `loss gr` is a tuple and `Q+K` is still an addition.
         Row 81's trap survives inside the set: two of these on consecutive
         lines are ONE strand, which is why every statement of the program's
         blocks ends in ⋄ . *)
        [g]# [W]# [T]# [E]# NOT [A:Za:z0:9] => <[ (gWTE) ]>
      | [g]# [W]# [P]# [E]# NOT [A:Za:z0:9] => <[ (gWPE) ]>
      | [l]# [o]# [s]# [s]# NOT [A:Za:z0:9] => <[ (loss) ]>
      | [g]# [W]# [Q]# NOT [A:Za:z0:9]   => <[ (gWQ) ]>
      | [g]# [W]# [K]# NOT [A:Za:z0:9]   => <[ (gWK) ]>
      | [g]# [W]# [V]# NOT [A:Za:z0:9]   => <[ (gWV) ]>
      | [w]# [t]# [e]# NOT [A:Za:z0:9]   => <[ (wte) ]>
      | [w]# [p]# [e]# NOT [A:Za:z0:9]   => <[ (wpe) ]>
      | [g]# [L]# [M]# NOT [A:Za:z0:9]   => <[ (gLM) ]>
      | [g]# [W]# [O]# NOT [A:Za:z0:9]   => <[ (gWO) ]>
      | [g]# [F]# [1]# NOT [A:Za:z0:9]   => <[ (gF1) ]>
      | [g]# [F]# [2]# NOT [A:Za:z0:9]   => <[ (gF2) ]>
      | [Q]# [h]# NOT [A:Za:z0:9]        => <[ (Qh) ]>
      | [K]# [h]# NOT [A:Za:z0:9]        => <[ (Kh) ]>
      | [V]# [h]# NOT [A:Za:z0:9]        => <[ (Vh) ]>
      | [d]# [Q]# NOT [A:Za:z0:9]        => <[ (dQ) ]>
      | [d]# [K]# NOT [A:Za:z0:9]        => <[ (dK) ]>
      | [d]# [V]# NOT [A:Za:z0:9]        => <[ (dV) ]>
      | [l]# [m]# NOT [A:Za:z0:9]        => <[ (lm) ]>
      | [w]# [o]# NOT [A:Za:z0:9]        => <[ (wo) ]>
      | [f]# [1]# NOT [A:Za:z0:9]        => <[ (f1) ]>
      | [f]# [2]# NOT [A:Za:z0:9]        => <[ (f2) ]>
      | [g]# [r]# NOT [A:Za:z0:9]        => <[ (gr) ]>
      | [P]# [n]# NOT [A:Za:z0:9]        => <[ (Pn) ]>
      | [M]# [n]# NOT [A:Za:z0:9]        => <[ (Mn) ]>
      | [V]# [n]# NOT [A:Za:z0:9]        => <[ (Vn) ]>
      | [d]# [Q]# [h]# NOT [A:Za:z0:9] => <[ (dQh) ]>
      | [d]# [K]# [h]# NOT [A:Za:z0:9] => <[ (dKh) ]>
      | [d]# [V]# [h]# NOT [A:Za:z0:9] => <[ (dVh) ]>
      | [w]# [q]# NOT [A:Za:z0:9]      => <[ (wq) ]>
      | [w]# [k]# NOT [A:Za:z0:9]      => <[ (wk) ]>
      | [w]# [v]# NOT [A:Za:z0:9]      => <[ (wv) ]>
      | [V]# [v]# NOT [A:Za:z0:9]      => <[ (Vv) ]>
      | [Q]# NOT [A:Za:z0:9]           => <[ (Q) ]>
      | [K]# NOT [A:Za:z0:9]           => <[ (K) ]>

    (* THE CLOSED NAME SET (apl/gaps.md rows 24, 25).  A reference cannot be a
       gap -- a TemplateGapId inside a VarRef is never substituted -- so each name
       is one alternative whose template writes it as an ordinary free Fortress
       identifier, which resolves at the use site and meets the gap-bound lambda
       parameter of the same spelling.  Each name is a sequence of one-character
       CLASSES glued with #, never a bare terminal: a terminal that is a valid
       identifier becomes a keyword of the whole language and then Id excludes it.
       The NOT predicate ends the name, and the longer names come first. *)
    AplName :Expr:=
      (* microgpt rung's names, 65 of them: the program's own, less the ones
         rungs 5 and 6 already left here (Blk B Hd Vs Pr ids tg vm dX A Q K Vv
         Qh Kh wq wk wv dQh dKh dVh t b e x y).  BLK, NE, VS and the rest of
         the all-capital spellings cannot be APL names at all (row 78), so they
         are Blk, Ne, Vs; a capital followed by a DIGIT is fine (x01), which is
         what lets B1 B2 Lr0 M0 X1 X2 X3 X4 stand.  v and g are taken, so the
         program's view function is vw and its gradient gr. *)
        [N]# [s]# [t]# [e]# [p]# [s]# NOT [A:Za:z0:9]  => <[ (Nsteps) ]>
      | [E]# [p]# [s]# [a]# NOT [A:Za:z0:9]            => <[ (Epsa) ]>
      | [T]# [o]# [k]# [m]# NOT [A:Za:z0:9]            => <[ (Tokm) ]>
      | [l]# [o]# [s]# [s]# NOT [A:Za:z0:9]            => <[ (loss) ]>
      | [g]# [W]# [T]# [E]# NOT [A:Za:z0:9]            => <[ (gWTE) ]>
      | [g]# [W]# [P]# [E]# NOT [A:Za:z0:9]            => <[ (gWPE) ]>
      | [B]# [o]# [s]# NOT [A:Za:z0:9]                 => <[ (Bos) ]>
      | [E]# [p]# [s]# NOT [A:Za:z0:9]                 => <[ (Eps) ]>
      | [L]# [r]# [0]# NOT [A:Za:z0:9]                 => <[ (Lr0) ]>
      | [L]# [e]# [n]# NOT [A:Za:z0:9]                 => <[ (Len) ]>
      | [p]# [o]# [s]# NOT [A:Za:z0:9]                 => <[ (pos) ]>
      | [g]# [L]# [M]# NOT [A:Za:z0:9]                 => <[ (gLM) ]>
      | [d]# [X]# [4]# NOT [A:Za:z0:9]                 => <[ (dX4) ]>
      | [g]# [F]# [2]# NOT [A:Za:z0:9]                 => <[ (gF2) ]>
      | [d]# [M]# [0]# NOT [A:Za:z0:9]                 => <[ (dM0) ]>
      | [g]# [F]# [1]# NOT [A:Za:z0:9]                 => <[ (gF1) ]>
      | [d]# [X]# [3]# NOT [A:Za:z0:9]                 => <[ (dX3) ]>
      | [d]# [X]# [2]# NOT [A:Za:z0:9]                 => <[ (dX2) ]>
      | [g]# [W]# [O]# NOT [A:Za:z0:9]                 => <[ (gWO) ]>
      | [g]# [W]# [Q]# NOT [A:Za:z0:9]                 => <[ (gWQ) ]>
      | [g]# [W]# [K]# NOT [A:Za:z0:9]                 => <[ (gWK) ]>
      | [g]# [W]# [V]# NOT [A:Za:z0:9]                 => <[ (gWV) ]>
      | [d]# [X]# [1]# NOT [A:Za:z0:9]                 => <[ (dX1) ]>
      | [d]# [X]# [p]# NOT [A:Za:z0:9]                 => <[ (dXp) ]>
      | [w]# [t]# [e]# NOT [A:Za:z0:9]                 => <[ (wte) ]>
      | [w]# [p]# [e]# NOT [A:Za:z0:9]                 => <[ (wpe) ]>
      | [N]# [e]# NOT [A:Za:z0:9]                      => <[ (Ne) ]>
      | [N]# [h]# NOT [A:Za:z0:9]                      => <[ (Nh) ]>
      | [B]# [1]# NOT [A:Za:z0:9]                      => <[ (B1) ]>
      | [B]# [2]# NOT [A:Za:z0:9]                      => <[ (B2) ]>
      | [M]# [k]# NOT [A:Za:z0:9]                      => <[ (Mk) ]>
      | [b]# [b]# NOT [A:Za:z0:9]                      => <[ (bb) ]>
      | [n]# [v]# NOT [A:Za:z0:9]                      => <[ (nv) ]>
      | [X]# [p]# NOT [A:Za:z0:9]                      => <[ (Xp) ]>
      | [X]# [1]# NOT [A:Za:z0:9]                      => <[ (X1) ]>
      | [V]# [h]# NOT [A:Za:z0:9]                      => <[ (Vh) ]>
      | [H]# [c]# NOT [A:Za:z0:9]                      => <[ (Hc) ]>
      | [X]# [2]# NOT [A:Za:z0:9]                      => <[ (X2) ]>
      | [X]# [3]# NOT [A:Za:z0:9]                      => <[ (X3) ]>
      | [M]# [0]# NOT [A:Za:z0:9]                      => <[ (M0) ]>
      | [M]# [r]# NOT [A:Za:z0:9]                      => <[ (Mr) ]>
      | [X]# [4]# NOT [A:Za:z0:9]                      => <[ (X4) ]>
      | [d]# [L]# NOT [A:Za:z0:9]                      => <[ (dL) ]>
      | [d]# [H]# NOT [A:Za:z0:9]                      => <[ (dH) ]>
      | [d]# [S]# NOT [A:Za:z0:9]                      => <[ (dS) ]>
      | [d]# [Q]# NOT [A:Za:z0:9]                      => <[ (dQ) ]>
      | [d]# [K]# NOT [A:Za:z0:9]                      => <[ (dK) ]>
      | [d]# [V]# NOT [A:Za:z0:9]                      => <[ (dV) ]>
      | [g]# [r]# NOT [A:Za:z0:9]                      => <[ (gr) ]>
      | [l]# [r]# NOT [A:Za:z0:9]                      => <[ (lr) ]>
      | [s]# [f]# NOT [A:Za:z0:9]                      => <[ (sf) ]>
      | [M]# [n]# NOT [A:Za:z0:9]                      => <[ (Mn) ]>
      | [V]# [n]# NOT [A:Za:z0:9]                      => <[ (Vn) ]>
      | [P]# [n]# NOT [A:Za:z0:9]                      => <[ (Pn) ]>
      | [l]# [m]# NOT [A:Za:z0:9]                      => <[ (lm) ]>
      | [w]# [o]# NOT [A:Za:z0:9]                      => <[ (wo) ]>
      | [f]# [1]# NOT [A:Za:z0:9]                      => <[ (f1) ]>
      | [f]# [2]# NOT [A:Za:z0:9]                      => <[ (f2) ]>
      | [N]# NOT [A:Za:z0:9]                           => <[ (N) ]>
      | [R]# NOT [A:Za:z0:9]                           => <[ (R) ]>
      | [X]# NOT [A:Za:z0:9]                           => <[ (X) ]>
      | [P]# NOT [A:Za:z0:9]                           => <[ (P) ]>
      | [M]# NOT [A:Za:z0:9]                           => <[ (M) ]>
      | [V]# NOT [A:Za:z0:9]                           => <[ (V) ]>
      | [r]# NOT [A:Za:z0:9]                           => <[ (r) ]>
      (* rung 6's names.  HD, NE, VS and the rest of the program's all-capital
         names cannot be APL names at all (row 78), so they are Hd, Ne, Vs. *)
      | [r]# [o]# [w]# [0]# [c]# [o]# [l]# [0]# [p]# [r]# [o]# [d]# NOT [A:Za:z0:9]
            => <[ (row0col0prod) ]>
      | [p]# [r]# [o]# [b]# NOT [A:Za:z0:9]           => <[ (prob) ]>
      | [i]# [d]# [s]# NOT [A:Za:z0:9]                => <[ (ids) ]>
      | [Q]# [h]# NOT [A:Za:z0:9]                     => <[ (Qh) ]>
      | [K]# [h]# NOT [A:Za:z0:9]                     => <[ (Kh) ]>
      | [H]# [d]# NOT [A:Za:z0:9]                     => <[ (Hd) ]>
      | [V]# [s]# NOT [A:Za:z0:9]                     => <[ (Vs) ]>
      | [P]# [r]# NOT [A:Za:z0:9]                     => <[ (Pr) ]>
      | [v]# [m]# NOT [A:Za:z0:9]                     => <[ (vm) ]>
      | [t]# [g]# NOT [A:Za:z0:9]                     => <[ (tg) ]>
      | [d]# [X]# NOT [A:Za:z0:9]                     => <[ (dX) ]>
      | [A]# NOT [A:Za:z0:9]                          => <[ (A) ]>
      | [B]# NOT [A:Za:z0:9]                          => <[ (B) ]>
      | [S]# NOT [A:Za:z0:9]                          => <[ (S) ]>
      (* rung 5's names *)
      | [m]# [y]# [s]# [u]# [m]# NOT [A:Za:z0:9]      => <[ (mysum) ]>
      | [m]# [y]# [s]# [c]# [a]# [n]# NOT [A:Za:z0:9] => <[ (myscan) ]>
      | [d]# [Q]# [h]# NOT [A:Za:z0:9]                => <[ (dQh) ]>
      | [d]# [K]# [h]# NOT [A:Za:z0:9]                => <[ (dKh) ]>
      | [d]# [V]# [h]# NOT [A:Za:z0:9]                => <[ (dVh) ]>
      | [B]# [l]# [k]# NOT [A:Za:z0:9]                => <[ (Blk) ]>
      | [w]# [q]# NOT [A:Za:z0:9]                     => <[ (wq) ]>
      | [w]# [k]# NOT [A:Za:z0:9]                     => <[ (wk) ]>
      | [w]# [v]# NOT [A:Za:z0:9]                     => <[ (wv) ]>
      | [V]# [v]# NOT [A:Za:z0:9]                     => <[ (Vv) ]>
      | [Q]# NOT [A:Za:z0:9]                          => <[ (Q) ]>
      | [K]# NOT [A:Za:z0:9]                          => <[ (K) ]>
      | [a]# [n]# [s]# [w]# [e]# [r]# NOT [A:Za:z0:9] => <[ (answer) ]>
      | [t]# [o]# [t]# [a]# [l]# NOT [A:Za:z0:9]      => <[ (total) ]>
      | [r]# [e]# [v]# NOT [A:Za:z0:9]                => <[ (rev) ]>
      | [n]# [h]# NOT [A:Za:z0:9]                     => <[ (nh) ]>
      | [h]# [d]# NOT [A:Za:z0:9]                     => <[ (hd) ]>
      | [n]# [e]# NOT [A:Za:z0:9]                     => <[ (ne) ]>
      | [e]# NOT [A:Za:z0:9]                          => <[ (e) ]>
      | [x]# NOT [A:Za:z0:9]                          => <[ (x) ]>
      | [y]# NOT [A:Za:z0:9]                          => <[ (y) ]>
      | [t]# NOT [A:Za:z0:9]                          => <[ (t) ]>
      | [p]# NOT [A:Za:z0:9]                          => <[ (p) ]>
      | [s]# [e]# [l]# [e]# [c]# [t]# NOT [A:Za:z0:9] => <[ (select) ]>
      | [s]# [i]# [m]# [p]# [l]# [e]# NOT [A:Za:z0:9] => <[ (simple) ]>
      | [m]# [i]# [n]# [i]# [d]# [x]# NOT [A:Za:z0:9] => <[ (minidx) ]>
      | [l]# [i]# [m]# [i]# [t]# [s]# NOT [A:Za:z0:9] => <[ (limits) ]>
      | [n]# [u]# [m]# [s]# NOT [A:Za:z0:9]           => <[ (nums) ]>
      | [c]# [o]# [d]# [e]# NOT [A:Za:z0:9]           => <[ (code) ]>
      | [r]# [a]# [t]# [e]# NOT [A:Za:z0:9]           => <[ (rate) ]>
      | [d]# [a]# [t]# [a]# NOT [A:Za:z0:9]           => <[ (data) ]>
      | [m]# [a]# [t]# NOT [A:Za:z0:9]                => <[ (mat) ]>
      | [a]# [b]# [v]# NOT [A:Za:z0:9]                => <[ (abv) ]>
      | [b]# [i]# [n]# NOT [A:Za:z0:9]                => <[ (bin) ]>
      | [m]# [1]# NOT [A:Za:z0:9]                     => <[ (m1) ]>
      | [v]# NOT [A:Za:z0:9]                          => <[ (v) ]>
      | [m]# NOT [A:Za:z0:9]                          => <[ (m) ]>
      | [n]# NOT [A:Za:z0:9]                          => <[ (n) ]>
      | [q]# NOT [A:Za:z0:9]                          => <[ (q) ]>
      | [a]# NOT [A:Za:z0:9]                          => <[ (a) ]>
      | [b]# NOT [A:Za:z0:9]                          => <[ (b) ]>
      | [c]# NOT [A:Za:z0:9]                          => <[ (c) ]>
      | [d]# NOT [A:Za:z0:9]                          => <[ (d) ]>
      | [w]# NOT [A:Za:z0:9]                          => <[ (w) ]>

    (* strand notation: 1 2 3 is one vector, 3 alone is a scalar.  The tail is a
       scalar when it has one element and a vector when it has more, and aplCons
       is overloaded on exactly that, so the grammar counts nothing. *)
    AplStrand :Expr:=
        n:AplNum SPACE s:AplStrand => <[ aplCons((n), (s)) ]>
      | n:AplNum                   => <[ (n) ]>

    (* ¯ is APL's high minus, part of the numeral; every APL number is an RR64 *)
    AplNum :Expr:=
        ¯# n:LiteralExpr => <[ aplNegS(1.0 (n)) ]>
      | n:LiteralExpr    => <[ (1.0 (n)) ]>
end

end
