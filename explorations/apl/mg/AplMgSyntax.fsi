(* AplMgSyntax -- the grammar of the FOCUSED base: the microGPT subset of APL
   over Run C4's vocabulary.  DESIGN.md beside this file is the design; the
   probes that settled its two mechanisms are ../probes-4b/PROBES.md.

   The one principle: no function value crosses a rule boundary untyped.  There
   is no aplCall, no frame stack, no Any-typed read and no Object result.  A
   function appears in APL text only as a NAME, from the closed set AplFnName
   below, and the name resolves at the use site to a typed host declaration
   (ledger row 270), so that rows(rmsn, X) picks its overload by the arrow type
   (row 171, probe y01).  A derived function built from glyphs -- the two tacit
   trains of Dyalog L16 and L25 -- is expanded by ONE rule that writes its whole
   body, so hygiene's renaming stays inside one template (row 204, probe y02,
   and y05 for these two rules).  Rank stays in the type: an APL vector is a
   Vector, a matrix a Matrix, a rank-3 array an Array3; element types follow the
   host, integers ZZ32 and reals RR64, so the corpus keys are never converted.

   Every expansion is C4's own line (explorations/run-c4/src/MicroGptFlat.fss),
   or an entry of AplMg, the small glue library beside this file for the glyph
   patterns C4's vocabulary does not spell.  Each rule carries the Dyalog line
   it serves and the C4 line it expands to.

   The house rules this file obeys, all from the ladder and from probes-4b:
   free names resolve at the use site; SPACE and a literal space are both
   OPTIONAL whitespace; a backtick escape is seen by the preparser as an opening
   quote, so at least one APL glyph stands ABOVE every escape (the comment glyph
   of the first rule is above them all) and no backtick appears in any comment
   here; a nonterminal name must not be a word of two or more uppercase letters;
   a template cannot expand to a binding, which is why every APL binding is a
   lambda over the REST of the block; and a rule that puts a host Expr gap to
   the left of a terminal must choose a terminal that is not a Fortress operator
   -- which never arises here, because every gap is a nonterminal of this
   sub-language, as the ladder's base does it.

   What is NOT here, and never will be: braces, the operand glyphs, guards,
   each with a dfn, the general f/ and f.g and outer product, power, scans, and
   a glyph as a value.  That whole machinery is rungs 4-6's subject and stays in
   ../base. *)
api AplMgSyntax

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar AplMgG extends { Expression, Literal, Identifier }

    Expr |:= apl⦇ b:AplStm SPACE ⍝ t:AplCmt ⦈ => <[ (b) ]>
           | apl⦇ b:AplStm ⦈                  => <[ (b) ]>

    (* the book's trailing comment, one character at a time (gaps row 9) *)
    AplCmt :Expr:=
        NOT ⦈ _ t:AplCmt => <[ 0 ]>
      | NOT ⦈ _          => <[ 0 ]>

    (* the same tail bounded by the end of its line, so that it may follow a
       statement that is not the block's last.  Every symbol needs its # or the
       optional whitespace crosses the line break (gaps rows 31, and the base's
       s04_stm.out.0) *)
    AplLn :Expr:=
        NOT ⦈# NOT NEWLINE# _# t:AplLn => <[ 0 ]>
      | NOT ⦈# NOT NEWLINE# _          => <[ 0 ]>

    (* ------------------------------------------------------- statements ----
       APL's arrow binds, and what it binds is a LAMBDA PARAMETER: the rest of
       the block is the lambda's body, so the name is a real block-scoped
       Fortress variable and host code in the block sees it (gaps rows 23, 30).
       The Id gap is the one position a name may be spliced into; a name is READ
       only through the closed set AplName below (row 24).  A binding needs a
       REST to be the body of, so every binding alternative demands a separator
       and a following statement.  Copied from the ladder's base, less the
       default left argument and the guards, which this subset has no use for.

       Nine, three, two and one name, longest first: the program destructures
       nine views on Dyalog L14 and three-name strands on L16, L24, L25, L29. *)
    AplStm :Expr:=
        ⍝ c:AplLn
        r:AplStm                                      => <[ (r) ]>
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
      | s:AplE SPACE ⍝ c:AplLn                => <[ (s) ]>
      | s:AplE                                => <[ (s) ]>

    (* ------------------------------------------------------ expressions ----
       One rule per glyph pattern, longest first; the expansion names a typed
       host entry and nothing else.  Right-to-left evaluation comes from the
       shape of every dyadic rule, l:AplAtom GLYPH r:AplE, as in the base. *)
    AplE :Expr:=
      (* ---- L28: the whole gradient.  ravel-each, reduce-catenate and mix
              over a nine-name strand is C4's varargs flat (FlatArrays.fss:179),
              called at MicroGptFlat.fss:71.  It stands first: the strand would
              otherwise be eaten by AplTuple. ---- *)
        ⊃ , / , ¨ SPACE a:AplTName SPACE b:AplTName SPACE c:AplTName SPACE d:AplTName SPACE f:AplTName SPACE g:AplTName SPACE h:AplTName SPACE i:AplTName SPACE j:AplTName
            => <[ flat((a), (b), (c), (d), (f), (g), (h), (i), (j)) ]>

      (* ---- L25: the commuted tacit train.  X1 (+.x commute transpose) w is
              (transpose w) +.x X1, so the rule writes the whole derived
              function's body, three times, as a tuple of products; probe y05.
              MicroGptFlat.fss:68, (dQ^T x1, dK^T x1, dV^T x1).  The commuted
              form stands above the plain one, longest first. ---- *)
      | l:AplName SPACE ∘ ( `+ . × ⍨ ⍉ ) ¨ SPACE a:AplTName SPACE b:AplTName SPACE c:AplTName
            => <[ ((transpose((a))) ((l)), (transpose((b))) ((l)), (transpose((c))) ((l))) ]>
      (* ---- L16: the plain tacit train, X1 (+.x transpose) w is X1 +.x
              transpose w; MicroGptFlat.fss:58, (x1 wq^T, x1 wk^T, x1 wv^T) ---- *)
      | l:AplName SPACE ∘ ( `+ . × ⍉ ) ¨ SPACE a:AplTName SPACE b:AplTName SPACE c:AplTName
            => <[ (((l)) (transpose((a))), ((l)) (transpose((b))), ((l)) (transpose((c)))) ]>

      (* ---- L14: each over the first nine integers is nine typed calls and a
              tuple; MicroGptFlat.fss:53 ---- *)
      | f:AplFnName ¨ ⍳ 9
            => <[ ((f)(0), (f)(1), (f)(2), (f)(3), (f)(4), (f)(5), (f)(6), (f)(7), (f)(8)) ]>
      (* ---- L16, L24: each over a three-name strand is three typed calls;
              MicroGptFlat.fss:58 and :67 ---- *)
      | f:AplFnName ¨ SPACE a:AplTName SPACE b:AplTName SPACE c:AplTName
            => <[ ((f)((a)), (f)((b)), (f)((c))) ]>

      (* ---- L22, L23, L26: the DYADIC row lift, rows(f, x, y);
              FlatArrays.fss:147 and :159, MicroGptFlat.fss:65, :66, :69 ---- *)
      | l:AplAtom SPACE ( SPACE f:AplFnName ⍤ 1 SPACE ) SPACE r:AplE
            => <[ rows((f), (l), (r)) ]>
      (* ---- L15, L17, L18, L19: the MONADIC row lift, rows(f, m) over a
              matrix and over a rank-3 array; FlatArrays.fss:141 and :153,
              MicroGptFlat.fss:57, :59, :60, :61 ---- *)
      | f:AplFnName ⍤ 1 SPACE ⊢ SPACE r:AplE
            => <[ rows((f), (r)) ]>

      (* ---- L19: one element per row is pick; FlatArrays.fss:176,
              MicroGptFlat.fss:61 ---- *)
      | l:AplAtom SPACE ⌷ ⍤ 0 SPACE 1 SPACE ⊢ SPACE r:AplE
            => <[ pick((r), (l)) ]>
      (* ---- L20: a scalar per row is diag, which scales the rows without
              forming the diagonal; FlatArrays.fss:40-43, MicroGptFlat.fss:63 -- *)
      | l:AplAtom SPACE × ⍤ 0 SPACE 1 SPACE ⊢ SPACE r:AplE
            => <[ (diag((l))) ((r)) ]>

      (* ---- L17, L23, L24: the BATCHED product, the library product on every
              pair of planes; FlatArrays.fss:126, MicroGptFlat.fss:59, :66, :67.
              It stands above the plain product, which would stop at the rank
              operator. ---- *)
      | l:AplAtom SPACE `+ . × ⍤ 2 SPACE ⊢ SPACE r:AplE
            => <[ ((l)) ((r)) ]>
      (* ---- L17: a matrix added to every plane; FlatArrays.fss:134,
              MicroGptFlat.fss:59 ---- *)
      | l:AplAtom SPACE `+ ⍤ 2 SPACE ⊢ SPACE r:AplE
            => <[ (l) + (r) ]>
      (* ---- L17, L23: every plane transposed, a view; FlatArrays.fss:50 ---- *)
      | ⍉ ⍤ 2 SPACE ⊢ SPACE r:AplE
            => <[ transpose((r)) ]>
      (* ---- L16 onward: the matrix product is the host's juxtaposition, which
              probe y05 shows works between two parenthesised expressions ---- *)
      | l:AplAtom SPACE `+ . × SPACE r:AplE
            => <[ ((l)) ((r)) ]>

      (* ---- L7: the causal mask.  not (iota >= iota) is (iota < iota), so the
              negation folds into outerLt (glue) and the scalar multiply is the
              host's juxtaposition; MicroGptFlat.fss:29 builds the same matrix
              by a fill ---- *)
      | l:AplAtom SPACE × SPACE ~ SPACE m:AplAtom SPACE ∘ . ≥ SPACE r:AplE
            => <[ ((l)) (outerLt((m), (r))) ]>
      (* ---- L13: the validity mask, outerGt (glue); MicroGptFlat.fss:52 through
              FlatData.fss:116 ---- *)
      | l:AplAtom SPACE ∘ . > SPACE r:AplE
            => <[ outerGt((l), (r)) ]>
      (* ---- L20, L27: the one-hot; FlatArrays.fss:173, MicroGptFlat.fss:63, :70 *)
      | l:AplAtom SPACE ∘ . = ⍳ SPACE r:AplE
            => <[ onehot((l), (r)) ]>

      (* ---- L19: the FOLDED reduction.  Sum of a product is the shipped DOT,
              not a sum over a temporary; MicroGptFlat.fss:61.  It stands above
              the plain reduction, and here the order is load-bearing: inside a
              nonterminal PEG commits to the first alternative that succeeds
              (probe y06). ---- *)
      | `+ / SPACE l:AplAtom SPACE × SPACE r:AplE
            => <[ (l) DOT (r) ]>
      (* ---- L13: the plain reduction is the shipped SUM; MicroGptFlat.fss:52 - *)
      | `+ / SPACE r:AplE
            => <[ SUM (r) ]>

      (* ---- L13: reshape with a NAME as the shape is the cyclic fill, cycle
              (glue); MicroGptFlat.fss:52 through FlatData.fss:114 ---- *)
      | n:AplName SPACE ⍴ SPACE r:AplE
            => <[ cycle((n), (r)) ]>

      (* ---- L17, L22: a named function applied monadically.  It stands BELOW
              every rule that reads a name as an operand, so that the rank
              operator is seen first; MicroGptFlat.fss:54-55, :59, :65 ---- *)
      | f:AplFnName SPACE r:AplE
            => <[ (f)((r)) ]>

      (* ---- L21: the one elementwise product of two ARRAYS in the program,
              and it is always against a comparison; MicroGptFlat.fss:64,
              (dX4 f2) x (m0 > 0.0).  It stands above the general product,
              whose expansion is juxtaposition. ---- *)
      | l:AplAtom SPACE × SPACE m:AplAtom SPACE > SPACE 0
            => <[ (l) × ((m) > 0.0) ]>
      (* ---- L18: relu; FlatArrays.fss:31, MicroGptFlat.fss:60 ---- *)
      | 0 ⌈ SPACE r:AplE
            => <[ 0.0 MAX (r) ]>

      (* ---- powers.  A half power is the shipped SQRT, over an integer or a
              real scale (MicroGptFlat.fss:59, :66) and over an array (:79); a
              square is the elementwise product C4 writes (:78); anything else
              is the host caret (:79) ---- *)
      | l:AplAtom SPACE `* 0 . 5   => <[ SQRT (1.0 (l)) ]>
      | l:AplAtom SPACE `* 2       => <[ ((l)) × ((l)) ]>
      | l:AplAtom SPACE `* SPACE r:AplE => <[ (1.0 (l)) ^ (r) ]>

      (* ---- the elementwise algebra.  Every remaining product in the program
              has a SCALAR on the left, which is the host's juxtaposition
              (MicroGptFlat.fss:52, :77-79, :82); division is the host slash
              over an array and a scalar (FlatArrays.fss:30) and over two
              scalars (the library); plus and minus between two arrays of one
              shape are the library's, between a scalar and an array
              FlatArrays.fss:24-27, and between an integer and an integer array
              AplMg's ---- *)
      | l:AplAtom SPACE × SPACE r:AplE  => <[ ((l)) ((r)) ]>
      | l:AplAtom SPACE ÷ SPACE r:AplE  => <[ (l) / (r) ]>
      | l:AplAtom SPACE - SPACE r:AplE  => <[ (l) - (r) ]>
      | l:AplAtom SPACE `+ SPACE r:AplE => <[ (l) + (r) ]>

      (* ---- the monadic glyphs.  iota, ravel, transpose, log and tally are
              AplMg's or FlatArrays'; the right tack is its own right operand -- *)
      | ⍳ SPACE r:AplE => <[ iota((r)) ]>
      | , SPACE r:AplE => <[ ravel((r)) ]>
      | ⍉ SPACE r:AplE => <[ transpose((r)) ]>
      | ⍟ SPACE r:AplE => <[ log((r)) ]>
      | ≢ SPACE r:AplE => <[ tally((r)) ]>
      | - SPACE r:AplE => <[ - ((r)) ]>
      | ⊢ SPACE r:AplE => <[ (r) ]>
      | a:AplAtom      => <[ (a) ]>

    (* ---- bracket indexing, three shapes.  A row index is C4's gather, which
            is generic in the element type (FlatArrays.fss:168); a column index
            is AplMg's cols; a vector with a vector index is AplMg's gatherV.
            MicroGptFlat.fss:52 and :57, FlatData.fss:112-117 ---- *)
    AplAtom :Expr:=
        b:AplBase `[ SPACE i:AplE SPACE ; SPACE `] => <[ gather((b), (i)) ]>
      | b:AplBase `[ SPACE ; SPACE j:AplE SPACE `] => <[ cols((b), (j)) ]>
      | b:AplBase `[ SPACE i:AplE SPACE `]         => <[ gatherV((b), (i)) ]>
      | b:AplBase                                  => <[ (b) ]>

    AplBase :Expr:=
        ( SPACE e:AplE SPACE ) => <[ (e) ]>
      | t:AplTuple             => <[ (t) ]>
      | c:AplName              => <[ (c) ]>
      | n:AplNum               => <[ (n) ]>

    (* ---- a strand of names is a Fortress tuple.  The elements come from a
            SECOND closed set, AplTName, disjoint in use from the readable names
            though spelled the same: over AplName the rule is unusable, because
            SPACE crosses a line break and two ordinary names on consecutive
            lines would merge into one strand (the base's v07_tuple.out.0).
            Which is why every statement of the program's blocks ends in the
            statement separator. ---- *)
    AplTuple :Expr:=
        a:AplTName SPACE b:AplTName SPACE c:AplTName SPACE d:AplTName SPACE f:AplTName SPACE g:AplTName SPACE h:AplTName SPACE i:AplTName SPACE j:AplTName
            => <[ ((a), (b), (c), (d), (f), (g), (h), (i), (j)) ]>
      | a:AplTName SPACE b:AplTName SPACE c:AplTName => <[ ((a), (b), (c)) ]>
      | a:AplTName SPACE b:AplTName                  => <[ ((a), (b)) ]>

    (* ---- THE CLOSED FUNCTION-NAME SET.  Seven names: the four vector
            functions of Dyalog L7-L8 and the three adapters of L11, L16, L24.
            Each is one character class per letter glued with the no-whitespace
            marker and closed by the NOT predicate, because a terminal that is a
            valid identifier becomes a keyword of the whole language (gaps row
            25).  The underscore names stand first: the underscore is not in the
            class, so the NOT predicate would succeed after the shorter name
            (the base's x01). ---- *)
    AplFnName :Expr:=
        [r]# [m]# [s]# [n]# [`_]# [b]# NOT [A:Za:z0:9] => <[ (rmsn_b) ]>
      | [s]# [m]# [`_]# [b]# NOT [A:Za:z0:9]           => <[ (sm_b) ]>
      | [r]# [m]# [s]# [n]# NOT [A:Za:z0:9]            => <[ (rmsn) ]>
      | [s]# [m]# NOT [A:Za:z0:9]                      => <[ (sm) ]>
      | [v]# [w]# NOT [A:Za:z0:9]                      => <[ (vw) ]>
      | [h]# NOT [A:Za:z0:9]                           => <[ (h) ]>
      | [u]# NOT [A:Za:z0:9]                           => <[ (u) ]>

    (* ---- THE STRAND NAMES: every name the program puts in a strand, 29 of
            them (L14 nine, L16 two threes, L24, L25, L28 nine, L29 three).
            Longest first. ---- *)
    AplTName :Expr:=
        [g]# [W]# [T]# [E]# NOT [A:Za:z0:9] => <[ (gWTE) ]>
      | [g]# [W]# [P]# [E]# NOT [A:Za:z0:9] => <[ (gWPE) ]>
      | [l]# [o]# [s]# [s]# NOT [A:Za:z0:9] => <[ (loss) ]>
      | [g]# [W]# [Q]# NOT [A:Za:z0:9]      => <[ (gWQ) ]>
      | [g]# [W]# [K]# NOT [A:Za:z0:9]      => <[ (gWK) ]>
      | [g]# [W]# [V]# NOT [A:Za:z0:9]      => <[ (gWV) ]>
      | [g]# [W]# [O]# NOT [A:Za:z0:9]      => <[ (gWO) ]>
      | [g]# [L]# [M]# NOT [A:Za:z0:9]      => <[ (gLM) ]>
      | [g]# [F]# [1]# NOT [A:Za:z0:9]      => <[ (gF1) ]>
      | [g]# [F]# [2]# NOT [A:Za:z0:9]      => <[ (gF2) ]>
      | [d]# [Q]# [h]# NOT [A:Za:z0:9]      => <[ (dQh) ]>
      | [d]# [K]# [h]# NOT [A:Za:z0:9]      => <[ (dKh) ]>
      | [d]# [V]# [h]# NOT [A:Za:z0:9]      => <[ (dVh) ]>
      | [w]# [t]# [e]# NOT [A:Za:z0:9]      => <[ (wte) ]>
      | [w]# [p]# [e]# NOT [A:Za:z0:9]      => <[ (wpe) ]>
      | [w]# [q]# NOT [A:Za:z0:9]           => <[ (wq) ]>
      | [w]# [k]# NOT [A:Za:z0:9]           => <[ (wk) ]>
      | [w]# [v]# NOT [A:Za:z0:9]           => <[ (wv) ]>
      | [w]# [o]# NOT [A:Za:z0:9]           => <[ (wo) ]>
      | [l]# [m]# NOT [A:Za:z0:9]           => <[ (lm) ]>
      | [f]# [1]# NOT [A:Za:z0:9]           => <[ (f1) ]>
      | [f]# [2]# NOT [A:Za:z0:9]           => <[ (f2) ]>
      | [V]# [v]# NOT [A:Za:z0:9]           => <[ (Vv) ]>
      | [Q]# [h]# NOT [A:Za:z0:9]           => <[ (Qh) ]>
      | [K]# [h]# NOT [A:Za:z0:9]           => <[ (Kh) ]>
      | [V]# [h]# NOT [A:Za:z0:9]           => <[ (Vh) ]>
      | [d]# [Q]# NOT [A:Za:z0:9]           => <[ (dQ) ]>
      | [d]# [K]# NOT [A:Za:z0:9]           => <[ (dK) ]>
      | [d]# [V]# NOT [A:Za:z0:9]           => <[ (dV) ]>
      | [P]# [n]# NOT [A:Za:z0:9]           => <[ (Pn) ]>
      | [M]# [n]# NOT [A:Za:z0:9]           => <[ (Mn) ]>
      | [V]# [n]# NOT [A:Za:z0:9]           => <[ (Vn) ]>
      | [g]# [r]# NOT [A:Za:z0:9]           => <[ (gr) ]>
      | [Q]# NOT [A:Za:z0:9]                => <[ (Q) ]>
      | [K]# NOT [A:Za:z0:9]                => <[ (K) ]>

    (* ---- THE CLOSED NAME SET: every name the program READS in APL text.  A
            reference cannot be a gap (gaps row 24), so each name is one
            alternative whose template writes it as an ordinary free Fortress
            identifier, which resolves at the use site and meets the gap-bound
            lambda parameter of the same spelling.  A word of two or more
            uppercase letters is a Fortress OPERATOR, not an identifier (gaps
            row 78), so the Dyalog's BLK, NE, VS and the rest are Blk, Ne, Vs;
            a capital followed by a digit is fine, which is what lets B1 B2 Lr0
            M0 X1 X2 X3 X4 stand.  v and g are taken by the host, so the
            program's view function is vw and its gradient gr.  Longest first. *)
    AplName :Expr:=
        [N]# [s]# [t]# [e]# [p]# [s]# NOT [A:Za:z0:9] => <[ (Nsteps) ]>
      | [E]# [p]# [s]# [a]# NOT [A:Za:z0:9]           => <[ (Epsa) ]>
      | [T]# [o]# [k]# [m]# NOT [A:Za:z0:9]           => <[ (Tokm) ]>
      | [l]# [o]# [s]# [s]# NOT [A:Za:z0:9]           => <[ (loss) ]>
      | [g]# [W]# [T]# [E]# NOT [A:Za:z0:9]           => <[ (gWTE) ]>
      | [g]# [W]# [P]# [E]# NOT [A:Za:z0:9]           => <[ (gWPE) ]>
      | [L]# [r]# [0]# NOT [A:Za:z0:9]                => <[ (Lr0) ]>
      | [L]# [e]# [n]# NOT [A:Za:z0:9]                => <[ (Len) ]>
      | [B]# [l]# [k]# NOT [A:Za:z0:9]                => <[ (Blk) ]>
      | [i]# [d]# [s]# NOT [A:Za:z0:9]                => <[ (ids) ]>
      | [p]# [o]# [s]# NOT [A:Za:z0:9]                => <[ (pos) ]>
      | [w]# [t]# [e]# NOT [A:Za:z0:9]                => <[ (wte) ]>
      | [w]# [p]# [e]# NOT [A:Za:z0:9]                => <[ (wpe) ]>
      | [g]# [L]# [M]# NOT [A:Za:z0:9]                => <[ (gLM) ]>
      | [g]# [W]# [O]# NOT [A:Za:z0:9]                => <[ (gWO) ]>
      | [g]# [W]# [Q]# NOT [A:Za:z0:9]                => <[ (gWQ) ]>
      | [g]# [W]# [K]# NOT [A:Za:z0:9]                => <[ (gWK) ]>
      | [g]# [W]# [V]# NOT [A:Za:z0:9]                => <[ (gWV) ]>
      | [g]# [F]# [1]# NOT [A:Za:z0:9]                => <[ (gF1) ]>
      | [g]# [F]# [2]# NOT [A:Za:z0:9]                => <[ (gF2) ]>
      | [d]# [X]# [1]# NOT [A:Za:z0:9]                => <[ (dX1) ]>
      | [d]# [X]# [2]# NOT [A:Za:z0:9]                => <[ (dX2) ]>
      | [d]# [X]# [3]# NOT [A:Za:z0:9]                => <[ (dX3) ]>
      | [d]# [X]# [4]# NOT [A:Za:z0:9]                => <[ (dX4) ]>
      | [d]# [X]# [p]# NOT [A:Za:z0:9]                => <[ (dXp) ]>
      | [d]# [M]# [0]# NOT [A:Za:z0:9]                => <[ (dM0) ]>
      | [d]# [Q]# [h]# NOT [A:Za:z0:9]                => <[ (dQh) ]>
      | [d]# [K]# [h]# NOT [A:Za:z0:9]                => <[ (dKh) ]>
      | [d]# [V]# [h]# NOT [A:Za:z0:9]                => <[ (dVh) ]>
      | [B]# [1]# NOT [A:Za:z0:9]                     => <[ (B1) ]>
      | [B]# [2]# NOT [A:Za:z0:9]                     => <[ (B2) ]>
      | [M]# [k]# NOT [A:Za:z0:9]                     => <[ (Mk) ]>
      | [M]# [0]# NOT [A:Za:z0:9]                     => <[ (M0) ]>
      | [M]# [r]# NOT [A:Za:z0:9]                     => <[ (Mr) ]>
      | [M]# [n]# NOT [A:Za:z0:9]                     => <[ (Mn) ]>
      | [V]# [n]# NOT [A:Za:z0:9]                     => <[ (Vn) ]>
      | [P]# [n]# NOT [A:Za:z0:9]                     => <[ (Pn) ]>
      | [P]# [r]# NOT [A:Za:z0:9]                     => <[ (Pr) ]>
      | [X]# [p]# NOT [A:Za:z0:9]                     => <[ (Xp) ]>
      | [X]# [1]# NOT [A:Za:z0:9]                     => <[ (X1) ]>
      | [X]# [2]# NOT [A:Za:z0:9]                     => <[ (X2) ]>
      | [X]# [3]# NOT [A:Za:z0:9]                     => <[ (X3) ]>
      | [X]# [4]# NOT [A:Za:z0:9]                     => <[ (X4) ]>
      | [H]# [c]# NOT [A:Za:z0:9]                     => <[ (Hc) ]>
      | [H]# [d]# NOT [A:Za:z0:9]                     => <[ (Hd) ]>
      | [V]# [s]# NOT [A:Za:z0:9]                     => <[ (Vs) ]>
      | [V]# [v]# NOT [A:Za:z0:9]                     => <[ (Vv) ]>
      | [V]# [h]# NOT [A:Za:z0:9]                     => <[ (Vh) ]>
      | [Q]# [h]# NOT [A:Za:z0:9]                     => <[ (Qh) ]>
      | [K]# [h]# NOT [A:Za:z0:9]                     => <[ (Kh) ]>
      | [d]# [L]# NOT [A:Za:z0:9]                     => <[ (dL) ]>
      | [d]# [H]# NOT [A:Za:z0:9]                     => <[ (dH) ]>
      | [d]# [S]# NOT [A:Za:z0:9]                     => <[ (dS) ]>
      | [d]# [Q]# NOT [A:Za:z0:9]                     => <[ (dQ) ]>
      | [d]# [K]# NOT [A:Za:z0:9]                     => <[ (dK) ]>
      | [d]# [V]# NOT [A:Za:z0:9]                     => <[ (dV) ]>
      | [d]# [X]# NOT [A:Za:z0:9]                     => <[ (dX) ]>
      | [w]# [q]# NOT [A:Za:z0:9]                     => <[ (wq) ]>
      | [w]# [k]# NOT [A:Za:z0:9]                     => <[ (wk) ]>
      | [w]# [v]# NOT [A:Za:z0:9]                     => <[ (wv) ]>
      | [w]# [o]# NOT [A:Za:z0:9]                     => <[ (wo) ]>
      | [l]# [m]# NOT [A:Za:z0:9]                     => <[ (lm) ]>
      | [l]# [r]# NOT [A:Za:z0:9]                     => <[ (lr) ]>
      | [f]# [1]# NOT [A:Za:z0:9]                     => <[ (f1) ]>
      | [f]# [2]# NOT [A:Za:z0:9]                     => <[ (f2) ]>
      | [n]# [v]# NOT [A:Za:z0:9]                     => <[ (nv) ]>
      | [v]# [m]# NOT [A:Za:z0:9]                     => <[ (vm) ]>
      | [t]# [g]# NOT [A:Za:z0:9]                     => <[ (tg) ]>
      | [g]# [r]# NOT [A:Za:z0:9]                     => <[ (gr) ]>
      | [s]# [f]# NOT [A:Za:z0:9]                     => <[ (sf) ]>
      | [A]# NOT [A:Za:z0:9]                          => <[ (A) ]>
      | [B]# NOT [A:Za:z0:9]                          => <[ (B) ]>
      | [K]# NOT [A:Za:z0:9]                          => <[ (K) ]>
      | [M]# NOT [A:Za:z0:9]                          => <[ (M) ]>
      | [N]# NOT [A:Za:z0:9]                          => <[ (N) ]>
      | [P]# NOT [A:Za:z0:9]                          => <[ (P) ]>
      | [Q]# NOT [A:Za:z0:9]                          => <[ (Q) ]>
      | [R]# NOT [A:Za:z0:9]                          => <[ (R) ]>
      | [V]# NOT [A:Za:z0:9]                          => <[ (V) ]>
      | [X]# NOT [A:Za:z0:9]                          => <[ (X) ]>
      | [b]# NOT [A:Za:z0:9]                          => <[ (b) ]>
      | [t]# NOT [A:Za:z0:9]                          => <[ (t) ]>

    (* every numeral is the host literal it is written as, so that an index
       stays ZZ32 and a real stays RR64 *)
    AplNum :Expr:=
        n:LiteralExpr => <[ (n) ]>
end

end
