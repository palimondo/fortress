#!/bin/sh
# p12a -- why p12_g.fsi was rejected with a bare "Syntax Error" at the
# nonterminal's own name.  The first spelling of the new expression nonterminal
# was called WE.  A word of two or more uppercase letters is an OPERATOR in
# Fortress (spec basic/lexical-structure.tex:1167-1172), so WE is not an
# identifier and cannot name a nonterminal.  This script parses one tiny api per
# candidate name with `fortress parse` (0.6 s each, gap row 13) and prints Ok or
# the error.  It also measures where the implementation's rule and the spec's
# part company: the spec asks for "at least two different letters", so AAA
# should be an identifier, but NodeUtil.validOp excludes only the two-character
# repeat (AA) and the XX_ form.
t() {
    name=$1
    { echo "api $name"
      echo 'import FortressAst.{...}'
      echo 'import FortressSyntax.{Expression, Literal}'
      echo "grammar G$name extends { Expression, Literal }"
      echo "    Expr |:= $name⦇ e:$2 ⦈ => <[ (e) ]>"
      echo "    $2 :Expr:= x:[A:Za:z] => <[ \"\" x ]>"
      echo end
      echo end
    } > "$name.fsi"
    printf '%-28s ' "nonterminal $2:"
    $FORTRESS_HOME/bin/fortress parse "$name.fsi" 2>&1
    rm -f "$name.fsi"
}
for n in WE AB ABC AA AAA A_B Ab AbC A W2 AB2; do t "n$n" "$n"; done
