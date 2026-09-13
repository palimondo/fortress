⎕PW←10000
]BOXING 7
⎕←'@@CELL 1'
⎕IO ← 0
]BOXING 7
⎕←'@@CELL 2'
assert ← {⍺ ← 'assertion failure' ⋄ 0∊⍵: ⍺ ⎕signal 8 ⋄ shy ← 0}
⎕←'@@CELL 3'
MyFirstFunction ← {⍺+⍵}
⎕←'@@CELL 4'
32 MyFirstFunction 98
⎕←'@@CELL 5'
Sum ← {total ← ⍺+⍵ ⋄ total}
⎕←'@@CELL 6'
32 Sum 98
⎕←'@@CELL 7'
{⍺ ← ¯99 ⋄ ⍺+⍵} 99
57 {⍺ ← ¯99 ⋄ ⍺+⍵} 99
⎕←'@@CELL 8'
{⍺ ← ¯99 ⋄ ⍺ ← ¯999999 ⋄ ⍺+⍵} 99
⎕←'@@CELL 9'
sum ← {⍺ ← 0 ⋄ 0=≢⍵:⍺ ⋄ (⍺+⊃⍵)∇1↓⍵}
⎕←'@@CELL 10'
sum ⍳10
100 sum ⍳10
⎕←'@@CELL 11'
Palinish ← {rev ← ⊖⍵ ⋄ rev≡⍵: 1 ⋄ 0}
⎕←'@@CELL 12'
Palinish 1 2 3 2 1
Palinish 1 2 3 4 5
Palinish 3
⎕←'@@CELL 13'
{⍵≡⊖⍵} 1 2 3 2 1 ⍝ Anonymous (unnamed) version
⎕←'@@CELL 14'
foo ← {47>flerp ⍵: 92+flumm ⍵ ⋄ 57+8} ⍝ Note: diamond separator
⎕←'@@CELL 15'
foo ← {answer ← ⍵ ⋄ a ← {⍵:42 ⋄ ¯99} answer}
⎕←'@@CELL 16'
foo ← {⎕IO←0 ⋄ answer ← ⍵ ⋄ a ← answer⊃¯99 42}
⎕←'@@CELL 17'
foo ← {a ← 45 ⋄ _ ← {a←¯99}⍬ ⋄ a}
⎕←'@@CELL 18'
foo ⍬ ⍝ Note: 45, not ¯99
⎕←'@@CELL 19'
foo ← {a ← 45 ⋄ _ ← {a +← 45}⍬ ⋄ a}
⎕←'@@CELL 20'
⎕ ← r ← foo ⍬
assert r=90
⎕←'@@CELL 21'
foo ← {a ← 45 ⋄ _ ← {a ⊢← ¯99}⍬ ⋄ a}
⎕←'@@CELL 22'
⎕ ← r ← foo ⍬
assert r=¯99
⎕←'@@CELL 23'
foo ← {a ← 3 3⍴1 ⋄ _ ← {a[1;1] ← 0}⍬ ⋄ a}
⎕←'@@CELL 24'
⎕ ← r ← foo ⍬
assert r≡3 3⍴1 1 1 1 0 1 1 1 1 
⎕←'@@CELL 25'
2 (+/) ⍳10 ⍝ Parentheses not required, added for illustrative purposes
⎕←'@@CELL 26'
sumred ← +/
2 sumred ⍳10
⎕←'@@CELL 27'
foldl ← {⍺ ← ⊃0⍴⍵ ⋄ ↑⍺⍺⍨/(⌽⍵),⊂⍺}
⎕←'@@CELL 28'
+foldl ⍳10
+/⍳10
-foldl ⍳10
-/⍳10
⎕←'@@CELL 29'
99 +foldl ⍳10
⎕←'@@CELL END'
