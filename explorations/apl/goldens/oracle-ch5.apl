⎕PW←10000
]BOXING 7
⎕←'@@CELL 1'
⎕IO ← 0
]BOXING 7
assert ← {⍺ ← 'assertion failure' ⋄ 0∊⍵: ⍺ ⎕signal 8 ⋄ shy ← 0}
⎕←'@@CELL 2'
×⍨¨1+⍳9  ⍝ Square elements via each (but see below!)
⎕←'@@CELL 3'
×⍨1+⍳9  ⍝ Square elements via scalar pervasion
⎕←'@@CELL 4'
⎕ ← V ← (1 2 3 4)(1 2)(3 4 5 6 7)(,2)(5 4 3 2 1)
≢¨V ⍝ Tally-each
⎕←'@@CELL 5'
+⌿1 2 3 4 5 6 7 8 9 ⍝ sum-reduce-first integers 1-9
⎕←'@@CELL 6'
1+2+3+4+5+6+7+8+9
⎕←'@@CELL 7'
-⌿1 2 3 4 5 6 7 8 9 ⍝ difference-reduction -- take care: right to left fold!
⎕←'@@CELL 8'
1-2-3-4-5-6-7-8-9
⎕←'@@CELL 9'
⎕ ← m ← 3 3⍴9?9
+⌿m
⎕←'@@CELL 10'
+/m
⎕←'@@CELL 11'
+⌿[1]m
⎕←'@@CELL 12'
2+⌿1 2 3 4 5 6 7 8 9
⎕←'@@CELL 13'
+⌿1 2 3 4 5 6 7 8 9 ⍝ Sum-reduce first
+⍀1 2 3 4 5 6 7 8 9 ⍝ Sum-scan first
⎕←'@@CELL 14'
+⌿1
+⌿1 2
+⌿1 2 3
+⌿1 2 3 4
+⌿1 2 3 4 5
+⌿1 2 3 4 5 6
+⌿1 2 3 4 5 6 7 
+⌿1 2 3 4 5 6 7 8
+⌿1 2 3 4 5 6 7 8 9
⎕←'@@CELL 15'
2÷⍨⍣=10 ⍝ Divide by 2 until we reach a fixed point
⎕←'@@CELL 16'
 {⍞ ← ?10}⍣{6=⍺} 0 ⍝ Keep generating random numbers between 1 and 10 until we get a 6
⎕←'@@CELL 17'
Sum ← {⍺ ← 0 ⋄ 0=≢⍵: ⍺ ⋄ (⍺+⊃⍵)∇1↓⍵}
⎕←'@@CELL 18'
⎕ ← mysum ← Sum 1 2 3 4 5 6 7 8 9
assert mysum=+/1 2 3 4 5 6 7 8 9
⎕←'@@CELL 19'
Sscan ← {⍺ ← ⍬ ⋄ 0=≢⍵: ⍺ ⋄ (⍺,⊃⍵+⊃¯1↑⍺)∇1↓⍵}
⎕←'@@CELL 20'
⎕ ← myscan ← Sscan 1 2 3 4 5 6 7 8 9
assert myscan≡+⍀1 2 3 4 5 6 7 8 9
⎕←'@@CELL 21'
Fib ← {⍺ ← 0 1 ⋄ ⍵=0: ⊃⍺ ⋄ (1↓⍺,+/⍺)∇⍵-1}
⎕←'@@CELL 22'
Fib¨⍳10 ⍝ The 10 first Fibonacci numbers
⎕←'@@CELL 23'
Quicksort ← {1≥≢⍵: ⍵ ⋄ S ← {⍺⌿⍨⍺ ⍺⍺ ⍵} ⋄ ⍵((∇<S),=S,(∇>S))⍵⌷⍨?≢⍵}
⎕←'@@CELL 24'
Quicksort ⎕←20?20
⎕←'@@CELL 25'
bsearch ← {⎕IO←0 ⋄ _bs_ ← {⍺>⍵: ⍬ ⋄ mid ← ⌈0.5×⍺+⍵ ⋄ ⍺⍺=mid⊃⍵⍵: mid ⋄ ⍺⍺<mid⊃⍵⍵: ⍺∇¯1+mid ⋄ ⍵∇⍨1+mid} ⋄ 0 (⍺ _bs_ (,⍵)) ¯1+≢,⍵}
⎕←'@@CELL 26'
5 bsearch 0 2 3 5 8 12 75
5 bsearch 0 2 3 5 8 12
5 bsearch 5 5
5 bsearch 5
]BOXING 8
1 bsearch 0 2 3 5 8 12
]BOXING 7
⎕←'@@CELL 27'
prefix1 ← {⎕IO←0 ⋄ p ← ⍵ ⋄ pi ← 0⍴⍨≢⍵ ⋄ j ← 0 ⋄ {0=≢⍵: pi ⋄ i ← ⊃⍵ ⋄ pi[i] ← j⊢←1+{⍵<0:⍵ ⋄ p[⍵]=p[i]:⍵ ⋄ 0≤⍵-1:∇pi[⍵-1] ⋄ ¯1} j ⋄ ∇1↓⍵} 1+⍳¯1+≢⍵}
⎕←'@@CELL 28'
prefix1 'CAGCATGGTATCACAGCAGAG'
⎕←'@@CELL 29'
prefix2 ← {⎕IO←0 ⋄ p ← ⍵ ⋄ pi ← 0⍴⍨≢⍵ ⋄ j ← 0 ⋄ 0 {⍺=≢⍵: pi ⋄ i ← ⍺⊃⍵ ⋄ pi[i] ← j⊢←1+{⍵<0:⍵ ⋄ p[⍵]=p[i]:⍵ ⋄ 0≤⍵-1:∇ pi[⍵-1] ⋄ ¯1} j ⋄ (⍺+1)∇ ⍵} 1+⍳¯1+≢⍵}
⎕←'@@CELL 30'
prefix2 'CAGCATGGTATCACAGCAGAG'
⎕←'@@CELL 31'
data ← ⊃⊃⎕NGET'../kmp.txt'1 ⍝ From http://rosalind.info/problems/kmp/
≢data ⍝ LONG STRING!
⎕←'@@CELL 32'
'cmpx'⎕CY'dfns' ⍝ Load `cmpx` - comparative benchmarking
⎕←'@@CELL 33'
cmpx 'prefix1 data' 'prefix2 data'
⎕←'@@CELL 34'
data ← ⍳100000 ⍝ A loooot of numbers
cmpx 'data ⍳ 17777' '17777 bsearch data' ⍝ Look for the number 17777
⎕←'@@CELL 35'
randInts ← 100000 ? 100000 
cmpx 'randInts⍳1' 'randInts⍳19326' 'randInts⍳46729'
⎕←'@@CELL 36'
find←randInts∘⍳
cmpx 'find 1' 'find 19326' 'find 46729'
⎕←'@@CELL 37'
cmpx 'data⍸1' 'data⍸19326' 'data⍸46729'
⎕←'@@CELL 38'
⎕ ← nesty ← (1 2 3 (3 4 (5 6)) 7)
⎕←'@@CELL 39'
-nesty
⎕←'@@CELL 40'
(1 2) 3 + 4 (5 6)
(1 1⍴5) - 1 (2 3)
⎕←'@@CELL END'
