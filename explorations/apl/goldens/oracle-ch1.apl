⎕PW←10000
]BOXING 7
⎕←'@@CELL 1'
⎕IO ← 0
⎕←'@@CELL 2'
⎕ ← data ← (1 2 3 4) (2 5 8 6) (8 6 2 3) (8 7 6 1)
⎕←'@@CELL 3'
⊃+⌿↑data
⎕←'@@CELL 4'
↑data
⎕←'@@CELL 5'
+⌿↑data
⎕←'@@CELL 6'
⊃+⌿↑data
⎕←'@@CELL 7'
⍴5
⎕←'@@CELL 8'
⍝ Some visualisation help, please.
]BOXING 8
⎕←'@@CELL 9'
⍴5
⎕←'@@CELL 10'
]BOXING 7
⎕←'@@CELL 11'
⍬≡⍴5 ⍝ Does zilde match shape of 5?
⎕←'@@CELL 12'
]BOXING 8
8 5 2 3 ⍝ A vector, yay
]BOXING 7
⎕←'@@CELL 13'
]BOXING 8
⍴ 8 5 2 3 ⍝ What's the shape of my vector?
]BOXING 7
⎕←'@@CELL 14'
m ← ↑(1 2 3 4)(5 6 7 8)(9 10 11 12)
]BOXING 8
m
]BOXING 7
⎕←'@@CELL 15'
⍴m
⎕←'@@CELL 16'
]BOXING 8
⍴⍴m
]BOXING 7
⎕←'@@CELL 17'
≢⍴m ⍝ Rank
⎕←'@@CELL 18'
1 + 1          ⍝ Scalar + scalar
1 + 1 2 3      ⍝ Scalar + vector
1 2 3 + 9 3 2  ⍝ Vector + vector
⎕←'@@CELL 19'
]BOXING 8
2 4⍴⍳8 ⍝ Reshape vector to 2×4 matrix
]BOXING 7
⎕←'@@CELL 20'
]BOXING 8
v ← 8 6 2 9     ⍝ Vector of length 4
v
]BOXING 7
]BOXING 8
m ← 1 4⍴v       ⍝ Reshape vector to 1×4 matrix
m
]BOXING 7
⎕←'@@CELL 21'
≢⍴v
≢⍴m

v≡m ⍝ Does v match m?
⎕←'@@CELL 22'
v 
m

v≡m ⍝ ?????
⎕←'@@CELL 23'
⎕ ← m ← 2 4⍴0 1 2 3 4 5 6 7 ⍝ y=2, x=4
⍴m
⎕←'@@CELL 24'
⎕ ← v ← 1 2 3
⊂v         ⍝ Enclose the vector 1 2 3
v≡⊂v       ⍝ Does the vector v match the enclosed v? Of course not!
⎕←'@@CELL 25'
≢⍴v  ⍝ Rank of vector should be 1
≢⍴⊂v ⍝ Rank of scalar should be 0
⎕←'@@CELL 26'
]BOXING 8
v ← (1 2 3) (2 3 4) (2 3 4)
v
]BOXING 7
⎕←'@@CELL 27'
v[1] ⍝ Get position 1 -- we get back an enclosed vector
⎕←'@@CELL 28'
(1 ('hello' 2)) (3 ('world' 4))
⎕←'@@CELL END'
