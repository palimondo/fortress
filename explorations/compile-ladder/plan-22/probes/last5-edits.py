# The library text of climb batch 22, the batch for the distance's last 5 errors, written by its planner as named
# edits applied by exact text; it stops before writing anything if an edit does not match once
# (CLIMB-BATCH-22.md, section 4). Run from anywhere:
#     python3 -I last5-edits.py <tree> [edit ...]        (no edit named: every edit, the measured variants too)
# The batch's text is these edits, in this order, which last5-text.patch holds as one diff:
#     totalcmp rr64pow rr64comp condA maybeA2 justsq openrange distrib bigops delegsizeB deleggen arrbounds
#     str4h str5 strexcl strbodies min731 list731 cast46
# Two edits are measured variants that the batch does not take (section 4): rr64, the export probe's question 1
# settled as the api taking the component's rounding types (3 return-type errors in FortressBuiltin), and
# delegsize, DelegatedIndexed's api size line out (4 abstract-method errors in RangeInternals). Name the edits
# you want; never apply a variant beside the edit it replaces (rr64 with rr64pow or rr64comp, delegsize with
# delegsizeB).
import sys, os
T = sys.argv[1]; WANT = sys.argv[2:]
FLI = 'Library/FortressLibrary.fsi'; FL = 'Library/FortressLibrary.fss'
E = {}
def ed(name, path, old, new):
    E.setdefault(name, []).append((path, old, new))
# --- export: TotalComparison's = as the component's two forms
ed('totalcmp', FLI, '''        comprises { LessThan, EqualTo, GreaterThan }
    opr =(self, other:Comparison): Boolean
''', '''        comprises { LessThan, EqualTo, GreaterThan }
    opr =(self, other:TotalComparison): Boolean
    opr =(self, other:Unordered): Boolean
''')
# --- export: RR64's ^ at the component's exponent, and the rounding results by P-68's call
ed('rr64', FLI, '''    opr |self| : RR64
    opr ^(self, b:RR64):RR64
    opr ^(self, b:AnyIntegral):RR64
''', '''    opr |self| : RR64
    opr ^(self, b:Number):RR64
    opr ^(self, b:AnyIntegral):RR64
''')
ed('rr64', FLI, '''    opr |\\self/| : ZZ64
    ceiling(self):RR64
    opr |/self\\| : ZZ64
    truncate(self):ZZ64
''', '''    opr |\\self/| : ZZ
    ceiling(self):RR64
    opr |/self\\| : ZZ
    truncate(self):RR64
''')
# --- export: Condition's component text in the api (way A+), Maybe's api header without ZeroIndexed
ed('condA', FLI, '''trait Condition[\\E\\] extends SequentialGenerator[\\E\\]
''', '''trait Condition[\\E\\] extends { ZeroIndexed[\\E\\], SequentialGenerator[\\E\\] }
''')
ed('condA', FLI, '''    getter indices(): CompactFullRange[\\ZZ32\\]
    getter indexValuePairs(): Generator[\\(ZZ32,E)\\]
    opr |self|: ZZ32
    opr [i:ZZ32]:E throws NotFound
''', '''    getter indices(): Generator[\\ZZ32\\]
    getter indexValuePairs(): Condition[\\(ZZ32,E)\\]
    opr |self|: ZZ32
    opr [i:ZZ32]:E throws NotFound
    opr [r:Range[\\ZZ32\\]]: Condition[\\E\\]
''')
ed('condA', FLI, '''    map[\\G\\](f: E->G): Condition[\\G\\]
    ivmap[\\G\\](f: (ZZ32,E)->G): Generator[\\G\\]
''', '''    map[\\G\\](f: E->G): Condition[\\G\\]
    ivmap[\\G\\](f: (ZZ32,E)->G): Condition[\\G\\]
''')
ed('condA', FLI, '''        extends { AnyMaybe, Condition[\\T\\], ZeroIndexed[\\T\\], UniqueItem[\\T\\] }
''', '''        extends { AnyMaybe, Condition[\\T\\], UniqueItem[\\T\\] }
''')
# --- export: Just's and Nothing's 1.0 range subscripts out of the api (way A++)
ed('maybeA2', FLI, '''    opr[i:ZZ32]:T
    opr[r:Range[\\ZZ32\\]]:Maybe[\\T\\]
''', '''    opr[i:ZZ32]:T
''')
ed('maybeA2', FLI, '''    opr[_:ZZ32]: T
    opr[r:Range[\\ZZ32\\]]: Nothing[\\T\\]
''', '''    opr[_:ZZ32]: T
''')
# --- export: Just's SQCAP and SQCUP at the component's headers
ed('justsq', FLI, '''    opr SQCAP(self, o:Maybe[\\T\\]): Maybe[\\T\\]
    opr SQCAP(self, o:UniqueItem[\\T\\]): Maybe[\\T\\]
    opr SQCUP(self, o:UniqueItem[\\T\\]): UniqueItem[\\T\\]
    unique(self): Maybe[\\T\\]
''', '''    opr SQCAP(self, o:Maybe[\\T\\]): Maybe[\\T\\]
    opr SQCAP(self, o:NotUnique[\\T\\]): Just[\\T\\]
    opr SQCAP(self, o:Just[\\T\\]): Maybe[\\T\\]
    opr SQCUP(self, o:Nothing[\\T\\]): Just[\\T\\]
    opr SQCUP(self, o:Just[\\T\\]): UniqueItem[\\T\\]
    unique(self): Maybe[\\T\\]
''')
# --- export: the arrays' api subscript at an OpenRange of ZZ32, which the component never defined, out
for tail in ('ImmutableArray1[\\T,0,s0\\]', 'Array1[\\T,0,s0\\]'):
    ed('openrange', FLI, '''    opr[_:OpenRange[\\ZZ32\\]] : %s
    opr[_:TrivialOpenRange] : %s
''' % (tail, tail), '''    opr[_:TrivialOpenRange] : %s
''' % tail)
ed('openrange', FLI, '''  opr[_:OpenRange[\\ZZ32\\]] : Array2[\\T,0,s0,0,s1\\]
''', '')
ed('openrange', FLI, '''    opr[_:OpenRange[\\ZZ32\\]] : Array3[\\T,0,s0,0,s1,0,s2\\]
''', '')
# --- export: ActualReduction's three distributes at the component's headers
for m in ('leftDistribute', 'rightDistribute', 'distribute'):
    ed('distrib', FLI, '''    %s(r: Reduction[\\R\\]): Maybe[\\(Reduction[\\R\\],Reduction[\\R\\])\\]
''' % m, '''    %s[\\K\\](r: ActualReduction[\\R,K\\]): PossibleReductionPair[\\K\\]
''' % m)
# --- export: BigReduction's and Comprehension's value parameters named as the component names them,
#     their getters that restate the parameters out
ed('bigops', FLI, '''object BigReduction[\\R,L\\](r:ActualReduction[\\R,L\\]) extends BigOperator[\\R,R,R,L\\]
    getter reduction(): ActualReduction[\\R,L\\]
    getter body(): R->R
''', '''object BigReduction[\\R,L\\](reduction:ActualReduction[\\R,L\\]) extends BigOperator[\\R,R,R,L\\]
    getter body(): R->R
''')
ed('bigops', FLI, '''object Comprehension[\\I,O,R,L\\](u: R->O, r: ActualReduction[\\R,L\\], singleton:I->R)
        extends BigOperator[\\I,O,R,L\\]
    getter reduction(): ActualReduction[\\R,L\\]
    getter body(): I->R
    getter unwrap(): R->O
end
''', '''object Comprehension[\\I,O,R,L\\](unwrap: R->O, reduction: ActualReduction[\\R,L\\], body:I->R)
        extends BigOperator[\\I,O,R,L\\]
end
''')
# --- export: DelegatedIndexed: the api's size line out (the component inherits Indexed's body);
#     the component's generator at the api's type
ed('delegsize', FLI, '''    getter generator(): Generator[\\E\\]
    getter size(): ZZ32
    opr |self| : ZZ32
    generate[\\R\\](r: Reduction[\\R\\], body: E->R): R
''', '''    getter generator(): Generator[\\E\\]
    opr |self| : ZZ32
    generate[\\R\\](r: Reduction[\\R\\], body: E->R): R
''')
ed('deleggen', FL, '''    getter generator(): Indexed[\\E,I\\] =
        self.indexValuePairs.map[\\E\\](fn (i:I, e:E): E => e)
''', '''    getter generator(): Generator[\\E\\] =
        self.indexValuePairs.map[\\E\\](fn (i:I, e:E): E => e)
''')
# --- export: Array2's and Array3's bounds and zeroIndices at the api's type, in the component
ed('arrbounds', FL, '''  getter bounds():CompactFullRange2D = sized2Range(b0,b1,s0,s1)
''', '''  getter bounds():CompactFullRange[\\(ZZ32,ZZ32)\\] = sized2Range(b0,b1,s0,s1)
''')
ed('arrbounds', FL, '''  zeroIndices():CompactFullRange2D = sized2Range(0,0,s0,s1)
''', '''  zeroIndices():CompactFullRange[\\(ZZ32,ZZ32)\\] = sized2Range(0,0,s0,s1)
''')
ed('arrbounds', FL, '''    getter bounds():CompactFullRange3D =
        sized3Range(b0,b1,b2,s0,s1,s2)
''', '''    getter bounds():CompactFullRange[\\(ZZ32,ZZ32,ZZ32)\\] =
        sized3Range(b0,b1,b2,s0,s1,s2)
''')
ed('arrbounds', FL, '''    zeroIndices():CompactFullRange3D =
        sized3Range(0,0,0,s0,s1,s2)
''', '''    zeroIndices():CompactFullRange[\\(ZZ32,ZZ32,ZZ32)\\] =
        sized3Range(0,0,0,s0,s1,s2)
''')
# --- export: String: abstract written on the four the component leaves without a body
for old, new in (('    getter size() : ZZ32\n    getter indices() : CompactFullRange[\\ZZ32\\]\n',
                  '    abstract getter size() : ZZ32\n    getter indices() : CompactFullRange[\\ZZ32\\]\n'),
                 ('    getter asFlatString(): String\n    getter isBalanced(): Boolean\n',
                  '    abstract getter asFlatString(): String\n    getter isBalanced(): Boolean\n'),
                 ('    uncheckedSubstring(r0: Range[\\ZZ32\\]) : String\n    allButLast(): String\n',
                  '    abstract uncheckedSubstring(r0: Range[\\ZZ32\\]) : String\n    allButLast(): String\n'),
                 ('    opr ||(self, c:Char):String\n    opr ||(self, b:()):String\n',
                  '    abstract opr ||(self, c:Char):String\n    opr ||(self, b:()):String\n')):
    ed('str4h', FLI, old, new)
# --- export: String: the five members the component's String never declared, written abstract in the api
for old, new in (('    getter depth() : ZZ32\n', '    abstract getter depth() : ZZ32\n'),
                 ('    getter isBalanced(): Boolean\n    getter generator(): Generator[\\Char\\]\n',
                  '    abstract getter isBalanced(): Boolean\n    getter generator(): Generator[\\Char\\]\n'),
                 ('    verify() : ()       (* Verify', '    abstract verify() : ()       (* Verify'),
                 ('    rangeContains(r: Range[\\ZZ32\\], c: Char) : Boolean\n',
                  '    abstract rangeContains(r: Range[\\ZZ32\\], c: Char) : Boolean\n'),
                 ('    balanced(): String (*  ensures', '    abstract balanced(): String (*  ensures')):
    ed('str5', FLI, old, new)
# --- export: String's excludes clause, one text: the component's, less List's AnyList, which the api
#     cannot name and which AnyList's own clause states (List.fsi:55)
ed('strexcl', FLI, '''trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\], DelegatedIndexed[\\Char,ZZ32\\] }
        excludes { AnyMultiplicativeRing }
''', '''trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\], DelegatedIndexed[\\Char,ZZ32\\] }
        excludes { Number, Char, AnyMultiplicativeRing }
''')
ed('strexcl', FL, '''             excludes {Number, Char, AnyMultiplicativeRing, AnyList}
''', '''             excludes {Number, Char, AnyMultiplicativeRing}
''')
# --- row 731: the static argument written, the library's own way (SUM[\\T\\] at fss:2553; Format.fss:438)
ed('min731', FL, '''        n = BIG MIN[i <- self.indices, self[i]=c] i
        self[ 0#n ]
''', '''        n = BIG MIN[\\ZZ32\\][i <- self.indices, self[i]=c] i
        self[ 0#n ]
''')
ed('min731', FL, '''        n = BIG MIN[i <- self.indices, self[i]=c] i
        self[ (n+1): ]
''', '''        n = BIG MIN[\\ZZ32\\][i <- self.indices, self[i]=c] i
        self[ (n+1): ]
''')
ed('list731', 'Library/List.fss', '''            <| self[i] | i <- r |>
''', '''            <|[\\E\\] self[i] | i <- r |>
''')
# --- item 46: the fused arm's result cast to O0
ed('cast46', FL, '''        (outer'.unwrap)(gg'.generate2[\\I0,L0,L1\\](outer'.reduction, inner'.reduction, fn x => (inner'.body)(innerBody(x))))
''', '''        cast[\\O0\\]((outer'.unwrap)(gg'.generate2[\\I0,L0,L1\\](outer'.reduction, inner'.reduction, fn x => (inner'.body)(innerBody(x)))))
''')
# --- export: RR64's rounding, second way: the component's RR64 at the api's ZZ64, as Float and FloatLiteral
#     declare it (FortressBuiltin.fss:184-191, :339-340); the api's three lines kept
ed('rr64pow', FLI, """    opr |self| : RR64
    opr ^(self, b:RR64):RR64
    opr ^(self, b:AnyIntegral):RR64
""", """    opr |self| : RR64
    opr ^(self, b:Number):RR64
    opr ^(self, b:AnyIntegral):RR64
""")
ed('rr64comp', FL, """    opr |\\self/| : ZZ = |\\asFloat(self)/|
    ceiling(self):RR64 = ceiling(asFloat(self))
    opr |/self\\| : ZZ = |/asFloat(self)\\|
    truncate(self):RR64 = truncate(asFloat(self))
""", """    opr |\\self/| : ZZ64 = |\\asFloat(self)/|
    ceiling(self):RR64 = ceiling(asFloat(self))
    opr |/self\\| : ZZ64 = |/asFloat(self)\\|
    truncate(self):ZZ64 = truncate(asFloat(self))
""")
# --- export: DelegatedIndexed's size, second way: the api's line kept, the component's trait states it,
#     Indexed's body restated (fss:1976)
ed('delegsizeB', FL, """trait DelegatedIndexed[\\E,I extends Index\\] extends Indexed[\\E,I\\]
    getter generator(): Indexed[\\E,I\\] =
""", """trait DelegatedIndexed[\\E,I extends Index\\] extends Indexed[\\E,I\\]
    getter size(): ZZ32 = |self|
    getter generator(): Indexed[\\E,I\\] =
""")
# --- String: the bodies the api's abstract members ask of the string objects that lack them
ed('strbodies', 'Library/FlatString.fss', """    getter isExtremelyUnbalanced():Boolean = false
""", """    getter isExtremelyUnbalanced():Boolean = false

    balanced():String = self
""")
ed('strbodies', 'Library/String.fss', """    getter depth():ZZ32 = 0
    getter isEmpty():Boolean = true
""", """    getter depth():ZZ32 = 0
    getter isBalanced():Boolean = true
    getter isEmpty():Boolean = true
""")
ed('strbodies', 'Library/String.fss', """    split():Generator⟦String⟧ = Nothing⟦String⟧
""", """    split():Generator⟦String⟧ = Nothing⟦String⟧
    balanced():String = self
""")
ed('strbodies', 'Library/String.fss', """    get(i:ZZ32): Char =
        if i ∈ first.indices then first.get(i) else second.get(i - |first|) end
""", """    get(i:ZZ32): Char =
        if i ∈ first.indices then first.get(i) else second.get(i - |first|) end

    rangeContains(r: Range⟦ZZ32⟧, c: Char):Boolean = do
        leftBounds' = r ∩ first.bounds
        rightBounds' = (r ≪ first.size) ∩ second.bounds
        ((¬ leftBounds'.isEmpty) AND: first.rangeContains(leftBounds', c)) OR:
            ((¬ rightBounds'.isEmpty) AND: second.rangeContains(rightBounds', c))
      end
""")
names = WANT or [n for n in E if n not in ('rr64', 'delegsize')]
texts = {}
for n in names:
    assert n in E, ('no such edit', n)
    for path, old, new in E[n]:
        if path not in texts: texts[path] = open(os.path.join(T, path), encoding='utf-8').read()
        c = texts[path].count(old)
        assert c == 1, (n, path, c, old[:80])
        texts[path] = texts[path].replace(old, new)
for path, s in texts.items():
    open(os.path.join(T, path), 'w', encoding='utf-8').write(s)
print('applied', ' '.join(names))
