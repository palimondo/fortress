⎕PW←10000
]BOXING 7
⎕←'@@CELL 1'
⎕IO ← 0
⎕←'@@CELL 2'
]BOXING 7
⎕←'@@CELL 3'
⎕ ← v ← 9 2 6 3 5 8 7 4 0 1
v[5]    ⍝ Grab the cell at index 5
⎕←'@@CELL 4'
v[5 2]  ⍝ Grab the cells at indices 5 and 2
⎕←'@@CELL 5'
v[3] ← ¯1
v
⎕←'@@CELL 6'
]BOXING 8
m ← 3 3⍴4 1 6 5 2 9 7 8 3 ⍝ a 3×3 matrix
m
]BOXING 7
m[1;1]  ⍝ Row 1, col 1
m[1;]   ⍝ Row 1
m[;1]   ⍝ Col 1
⎕←'@@CELL 7'
m[⊂1 1] ⍝ Centre
⎕←'@@CELL 8'
m[(0 0)(1 1)(2 2)] ⍝ Three points along the main diagonal
⎕←'@@CELL 9'
⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
⎕←'@@CELL 10'
]BOXING 8
m[1;1] ⍝ Note the returned enclosure.
]BOXING 7
⎕←'@@CELL 11'
⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
⎕←'@@CELL 12'
1⌷m       ⍝ Row 1
⎕←'@@CELL 13'
1 1⌷m     ⍝ Cell 1 1
⎕←'@@CELL 14'
(⊂1 2)⌷m  ⍝ Rows 1 and 2
⎕←'@@CELL 15'
2⌷[1]m
⎕←'@@CELL 16'
2⌷⍉m
⎕←'@@CELL 17'
n ← 3 3⍴4 1 6 5 2 9 7 8 3
⎕←'@@CELL 18'
n[⊂1 1] ⍝ Centre
⎕←'@@CELL 19'
n[(0 0)(1 1)(2 2)] ⍝ Three points along the main diagonal
⎕←'@@CELL 20'
1 1⌷n ⍝ Centre
⎕←'@@CELL 21'
(⊂1 1)⌷n ⍝ Repeat row 1
⎕←'@@CELL 22'
I←⌷⍨∘⊃⍨⍤0 99 ⍝ Sane indexing
⎕←'@@CELL 23'
⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
⎕←'@@CELL 24'
1 2I m   ⍝ Sane:  select leading axis cells 1 and 2, or m[1 2;]
1 2⌷ m   ⍝ Squad: select m[⊂1 2]
⎕←'@@CELL 25'
(⊂1 2)I m  ⍝ Sane:  select m[⊂1 2]
(⊂1 2)⌷ m  ⍝ Squad: select m[1 2;]
⎕←'@@CELL 26'
(0 0)(1 2)(2 2)I m ⍝ Multiple cells by index, like m[(0 0)(1 2)(2 2)]
⎕←'@@CELL 27'
data   ← 0 1 2 3 4 5 6 7 8 9
select ← 0 0 1 0 1 1 0 1 1 0 ⍝ Select elements 2, 4, 5, 7 and 8
select/data
⎕←'@@CELL 28'
select ← 1 3 0 0 5 0 7 0 0 1
select/data
⎕←'@@CELL 29'
m ← 3 3⍴9?9
]BOXING 8
m
]BOXING 7
⎕←'@@CELL 30'
select ← 0 1 0
⎕←'@@CELL 31'
select⌿m ⍝ Replicate first
⎕←'@@CELL 32'
select/m ⍝ Replicate
⎕←'@@CELL 33'
⎕ ← m ← 3 3⍴(1 2 3)(3 2 1)(4 5 6)(5 3 1)(5 6 8)(7 1 2)(4 3 9)(3 7 6)(4 5 1)
⎕←'@@CELL 34'
(⊂1 1)⊃m
⎕←'@@CELL 35'
⊃m
⎕←'@@CELL 36'
⎕ ← G ← 2 3⍴('Adam' 1)('Bob' 2)('Carl' 3)('Danni' 4)('Eve' 5)('Frank' 6)
G[⊂(0 1)0] ⍝ First element of the vector nested at ⊂0 1 of G
G[((0 0)0)((1 2)1)]
⎕←'@@CELL 37'
]BOXING 8
m ← 3 3⍴9?9
m
]BOXING 7
(0 0⍉m) ← ¯1 ¯1 ¯1 ⍝ 0 0⍉m is the main diagonal.
]BOXING 8
m
]BOXING 7
⎕←'@@CELL 38'
data   ← 0 1 2 3 4 5 6 7 8 9
select ← 0 0 1 0 1 1 0 1 1 0

(select/data) ← ¯1 ¯1 ¯1 ¯1 ¯1
data
⎕←'@@CELL 39'
⎕ ← s ← 'This is a string'
(2↑s) ← '**'
s
⎕←'@@CELL 40'
s←'This' 'is' (,'a') 'string' 'without' 'is.'
((s='i')/¨s)←'*'
s
⎕←'@@CELL END'
