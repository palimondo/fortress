⎕PW←10000
]BOXING 8
⎕←'@@CELL 1'
⎕IO ← 0            ⍝ Index origin is zero
]BOXING 8
⎕←'@@CELL 2'
⎕ ← mat ← 3 4⍴12?12 ⍝ Ladies and gentlemen: our matrix
⎕←'@@CELL 3'
≢7 5 1 2 9
≢'Hello world'
≢mat
⎕←'@@CELL 4'
≡1 2 3 4
≡(1 2)(3 4)
≡((1 2)(2 3))((4 5)(6 7))
≡(1 2)(3 4)3
⎕←'@@CELL 5'
1 2 3 4 ≡ 1 2 3 4 5
1 2 3 4 ≡ 1 2 3 4
1 2 3 4 ≡ 4 1 2 3
1 2 3 4 ≡ 1 4⍴1 2 3 4
⎕←'@@CELL 6'
⍉mat ⍝ Transpose
⌽mat ⍝ Reverse
⊖mat ⍝ Reverse first
⎕←'@@CELL 7'
⊖⍤1⊢mat ⍝ Apply reverse-first to second axis using Rank
⊖[1]mat ⍝ Apply reverse-first to second axis bracket-axis
⎕←'@@CELL 8'
1 2 ¯1 0⊖mat
⎕←'@@CELL 9'
⎕ ← v ← 'Hello' 'world'
↑v
⎕←'@@CELL 10'
⎕ ← m ← 3 3⍴9?9
↓m
⎕←'@@CELL 11'
⎕ ← v ← (0 6 3)(2 5 1)(4 7 8)
↓⍉↑v
⎕←'@@CELL 12'
↓⍉↑(1 2 3 4)(5 6)(7 8 9 10)
⎕←'@@CELL 13'
↑(1 2 3 4)(5 6)(7 8 9 10)
⎕←'@@CELL 14'
1↑(1 2 3 4)(5 6)(7 8 9 10) ⍝ Take 1
2↑(1 2 3 4)(5 6)(7 8 9 10) ⍝ Take 2
⎕←'@@CELL 15'
0⌷(1 2 3 4)(5 6)(7 8 9 10) ⍝ Squad 0 returns a cell
0⊃(1 2 3 4)(5 6)(7 8 9 10) ⍝ Pick 0 returns an element
⎕←'@@CELL 16'
¯1↑(1 2 3 4)(5 6)(7 8 9 10) ⍝ Take 1 from the back
⎕←'@@CELL 17'
1↓(1 2 3 4)(5 6)(7 8 9 10)  ⍝ Drop 1 from the front
¯1↓(1 2 3 4)(5 6)(7 8 9 10) ⍝ Drop 1 from the back
⎕←'@@CELL 18'
mat
1↑mat ⍝ Take first cell
1↓mat ⍝ Drop first cell
⎕←'@@CELL 19'
⍳10
⎕←'@@CELL 20'
⍳3 4
⎕←'@@CELL 21'
'Hello world'⍳'o'
⎕←'@@CELL 22'
'Hello world'⍳'od'
⎕←'@@CELL 23'
⎕ ← staff ← 'Adam' 'Bob' 'Charlotte'
lookup ← staff,⊂'Not found'
lookup[staff⍳'Bob' 'David']
⎕←'@@CELL 24'
⍸1 0 0 1 0 1 0 1 1 1 0 1 0 1
⎕←'@@CELL 25'
⎕←nums←⍳20
nums[⍸0=5|nums] ⍝ Find all numbers divisible by 5
⎕←'@@CELL 26'
3 3⍴1 0 0 1 1 0 0 1 0
⍸3 3⍴1 0 0 1 1 0 0 1 0
⎕←'@@CELL 27'
⍸0 1 0 2 0 3 0 4 0 5
⎕←'@@CELL 28'
1 3 5 7 9⍸8 9 0  ⍝ bin 8, 9 and 0 over the intervals 1 3 5 7 9
⎕←'@@CELL 29'
1 3 5 7 9⍸5      ⍝ elements on on boundary goes in the higher bin
⎕←'@@CELL 30'
3 5 7 9⍸0 100
⎕←'@@CELL 31'
'AEIOU'⍸'HELLO WORLD'
⎕←'@@CELL 32'
ciders←'Kopparberg Sparkling Rose' 'Bulmers Original' 'Crispin the Jacket' 'Old Mout Cherries & Berries'
abv←7.0 4.5 8.3 0.0
⎕←'@@CELL 33'
code←431 481 487 486
rate←0 40.38 50.71 61.04
limits←1.2 6.9 7.5 8.5
⎕←'@@CELL 34'
⎕←bin←1+limits⍸abv
⎕←'@@CELL 35'
⍕('Name' 'Rate' 'Code')⍪⍉↑(ciders (rate[bin]) (code[bin]))
⎕←'@@CELL 36'
simple ← 3 4⍴3 0 5 1 7 9 8 6 2 10 11 4
,simple ⍝ Ravel
∊simple ⍝ Enlist
⎕←'@@CELL 37'
⎕ ← nested ← ↑((2 3)(4 5))((6 7)(8 9))
,nested ⍝ Ravel
∊nested ⍝ Enlist
⎕←'@@CELL 38'
1 2 3 4 , 5 6 'hello'
1 2 3 4 5 6 , 'hello'
⎕←'@@CELL 39'
(3 3⍴⍳9),(3 3⍴⍳9) ⍝ Catenate-last (new cols)
(3 3⍴⍳9)⍪(3 3⍴⍳9) ⍝ Catenate-first/laminate (new rows)
⎕←'@@CELL 40'
'l'∊'Hello world'
⎕←'@@CELL 41'
'lo w'∊'Hello world'
⎕←'@@CELL 42'
'lo'(⍸⍷)'Hello world' ⍝ Index of start of substring
⎕←'@@CELL 43'
⎕ ← v ← 6 9 5 2 0 9
v↑⍨1     ⍝ Take 1 but commute arguments ⍨
⎕←'@@CELL 44'
{⍵⊂⍨1,2≠/⍵}
{(1,2≠/⍵)⊂⍵}
⎕←'@@CELL 45'
=⍨1 2 3 4 5
⎕←'@@CELL 46'
1 2 3 4 5 = 1 2 3 4 5
⎕←'@@CELL 47'
tally ← +/=⍨
⎕←'@@CELL 48'
tally 1 2 3 4 5
⎕←'@@CELL 49'
1⍨ 2
3 (1⍨) 2
1⍨ 2 3 4 5
1⍨¨ 2 3 4 5
⎕←'@@CELL 50'
⎕ ← m ← 3 3⍴9?9 
5⍨¨m ⍝ Make an array that looks like m, but will all elements 5
⎕←'@@CELL 51'
5⍴⍨⍴m
⎕←'@@CELL 52'
∪1 1 2 2 3 3 4 4 5 5 6 6
∪'hello world'
⎕←'@@CELL 53'
1 1 2 3 4 ∪ 1 2 5 6
⎕←'@@CELL 54'
1 1 2 3 4 ∩ 1 2 5 6
⎕←'@@CELL 55'
1 1 2 3 4 5 ~ 1 3 5
⎕←'@@CELL 56'
~1 0 1 1 0 0 1
⎕←'@@CELL 57'
⎕ ← data ← 110 109 204 40 105 201 2 208 160 143 213 31 21 317 132 242 164 176 67 18 75 89 18 7 20
data[⍋data]
⎕←'@@CELL 58'
⍋data
⎕←'@@CELL 59'
⎕ ← minidx ← ⊃⍋data ⍝ Index of smallest value: first element of Grade-up
data[minidx]
⎕←'@@CELL END'
