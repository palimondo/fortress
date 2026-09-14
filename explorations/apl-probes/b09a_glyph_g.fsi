api b09a_glyph_g
import FortressSyntax.{Expression}
grammar Gly extends { Expression }
    Expr |:= g⦇ ⍳ ⦈ => <[ "U+2373 iota" ]>
           | g⦇ ⍴ ⦈ => <[ "U+2374 rho" ]>
           | g⦇ ⍵ ⦈ => <[ "U+2375 omega" ]>
           | g⦇ ⍺ ⦈ => <[ "U+237A alpha" ]>
           | g⦇ ⌽ ⦈ => <[ "U+233D circle stile" ]>
           | g⦇ ⍉ ⦈ => <[ "U+2349 circle backslash" ]>
end
end
