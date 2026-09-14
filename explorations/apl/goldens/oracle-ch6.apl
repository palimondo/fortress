⎕PW←10000
]BOXING 7
⎕←'@@CELL 1'
⎕IO ← 0
]BOXING 7
⎕←'@@CELL 2'
∘.×⍨⍳10
⎕←'@@CELL 3'
∘.<⍨⍳10
⎕←'@@CELL 4'
(⍳10) <⍤0 1 ⊢ ⍳10
⎕←'@@CELL 5'
prod ← ∘.×
rank ← ×⍤0 1
x←⍳1000
]runtime -c "x prod x" "x rank x"
⎕←'@@CELL 6'
(2=+⌿0=x∘.|x)/x←⍳20
⎕←'@@CELL 7'
]BOXING 8
A ← 3 4⍴3 2 0 8 11 7 5 1 4 9 6 10
A
B ← 4 3⍴8 10 11 2 4 6 5 1 7 9 3 0
B
A +.× B
]BOXING 7
⎕←'@@CELL 8'
⎕ ← row0col0prod ← A[0;]×B[;0]
⎕←'@@CELL 9'
+/row0col0prod
⎕←'@@CELL 10'
+/A[0;]×B[;1]
⎕←'@@CELL 11'
+/'GATTACA' = 'TATTCAG' ⍝ Equal-then-sum-reduce
⎕←'@@CELL 12'
'GATTACA' +.= 'TATTCAG'
⎕←'@@CELL 13'
data ← 19083 17341 19657 16896 16197 18256
⎕←'@@CELL 14'
prob ← 1 1 1 0.75 0.5 0
⎕←'@@CELL 15'
2×data+.×prob ⍝ Same as 2× +/ data×prob
⎕←'@@CELL 16'
X ← {f←⍺⍺ ⋄ ⍺←⊢ ⋄ '(',⍺,(⎕CR'f'),⍵,')'} ⍝ The product eXplanation operator
⎕←'@@CELL 17'
]BOXING 8
A ← 2 3⍴6?20
A
B ← 3 2⍴6?20
B
A +.× B
]BOXING 7
⎕←'@@CELL 18'
A +X.(×X) B
⎕←'@@CELL END'
