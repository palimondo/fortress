#!/bin/bash
# q10 -- the shipped Regex.fsi backtick-escapes ` * + ? { } | [ ] : # and the
# preparser accepts it ("fortress parse Regex.fsi" -> Ok), while our own
# rung-1/p08a_g.fsi, with one escaped +, is rejected (gap row 3).  Does the
# regex grammar's way of spelling its escapes AVOID the collision, or does it
# survive the way AplSyntax.fsi does -- because the preparser's token loop dies
# on some earlier character, so report() never runs?
#
# Method: the minimal regex-shaped api with ONE escape, then the same file with
# one construct of Regex.fsi added ABOVE the escape, one construct per run.  A
# construct that turns "Unmatched" into "Ok" is a construct the preparser cannot
# tokenise: it stops the loop, and the delimiter check is skipped from there on.
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS
cd $FORTRESS_HOME/explorations/apl/rung-2b

try () {   # $1 = label, $2 = the line to put above the escaped +
    cat > q10_min.fsi <<EOF
api q10_min

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar Q10m extends { Expression, Literal }
    Expr |:= x:Q10mE => <[ (x) ]>

    Q10mE :Expr:=
        $2
      | / \`+ / => <[ 2 ]>
end

end
EOF
    printf "%-34s " "$1"
    out=$($FORTRESS_HOME/bin/fortress parse q10_min.fsi 2>&1 | tr '\n' ' ')
    case "$out" in
        Ok*)         echo "Ok         (the escape went unchecked)" ;;
        *Unmatched*) echo "REJECTED   (the escape was seen)" ;;
        *)           echo "other: $out" ;;
    esac
}

echo "=== baselines ==="
printf "%-34s " "Regex.fsi as shipped"
$FORTRESS_HOME/bin/fortress parse $FORTRESS_HOME/ProjectFortress/syntax_abstraction_tests/Regex.fsi 2>&1 | tr '\n' ' '; echo
printf "%-34s " "base/AplSyntax.fsi"
$FORTRESS_HOME/bin/fortress parse $FORTRESS_HOME/explorations/apl/base/AplSyntax.fsi 2>&1 | tr '\n' ' '; echo
printf "%-34s " "rung-1/p08a_g.fsi (one escaped +)"
$FORTRESS_HOME/bin/fortress parse $FORTRESS_HOME/explorations/apl/rung-1/p08a_g.fsi 2>&1 | head -2 | tr '\n' ' '; echo

echo
echo "=== one escape, with one construct of Regex.fsi above it ==="
try "nothing above it"                 '/ x / => <[ 1 ]>'
try "^ (Regex.fsi:116)"                '^ => <[ 1 ]>'
try "\$ (Regex.fsi:117)"               '$ => <[ 1 ]>'
try ". (Regex.fsi:119)"                '. => <[ 1 ]>'
try "_ as any character"               '_ => <[ 1 ]>'
try "pling-escaped # (\\#)"            '\# => <[ 1 ]>'
try "a class [A:Za:z0:9~!@%&]"         'x:[A:Za:z0:9~!@%&] => <[ 1 ]>'
try "a bare # after a terminal"        'a# b => <[ 1 ]>'
try "an escaped : (\`:)"               '`: => <[ 1 ]>'
try "an APL glyph (the rung-1 recipe)" '⍳ => <[ 1 ]>'
rm -f q10_min.fsi

# --- part 2 (appended): WHERE the scan dies in Regex.fsi, by truncation.
# A prefix of the file plus one backtick: if the backtick is reported the scan
# ran to the end of that prefix; if nothing is reported it died inside it.
# Result: the flip is at Regex.fsi:93,
#   s1:Slash# e:Element#* s2:Slash# => <[ Regexp(<|e**|>) ]>
# and the three candidates in that line are bisected below.
try2 () {   # $1 = label, $2 = the template body
    cat > q10_min.fsi <<EOF
api q10_min

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar Q10n extends { Expression, Literal }
    Expr |:= q10n⦇ xs:Q10nE# ⦈ => <[ $2 ]>
    Q10nE :Expr:= x:LiteralExpr => <[ (x) ]>
end
\`
EOF
    printf "%-34s " "$1"
    out=$($FORTRESS_HOME/bin/fortress parse q10_min.fsi 2>&1 | tr '\n' ' ')
    case "$out" in
        *Unmatched*) echo "REPORTED   (the scan survived it)" ;;
        Ok*)         echo "Ok" ;;
        *)           echo "silent     (the scan died on it)" ;;
    esac
}
echo
echo "=== which token of Regex.fsi:93 stops the scan ==="
try2 "a plain template"            'q10n((xs))'
try2 "a list literal <| … |>"      'q10n(<|[\ZZ32\] 1 |>)'
try2 "the splice ** alone"         'q10n(xs**)'
try2 "<| xs** |> as in Regex.fsi"  'q10n(<|[\ZZ32\] xs** |>)'
rm -f q10_min.fsi
