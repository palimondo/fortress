#!/usr/bin/env python3
"""range-edit.py: the rung's edit of the range bodies of rows 450 and 451, applied to the tree with exact
string replacement (each old text must occur once), from FORTRESS_HOME. Reverse it with git checkout of the
two files."""
import os, sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../..'))

def edit(p, pairs):
    s = open(p).read()
    for old, new in pairs:
        assert s.count(old) == 1, (p, old[:70])
        s = s.replace(old, new)
    open(p, 'w').write(s)

edit('Library/RangeInternals.fss', [
('''    getter size(): ZZ32 = do
        l = self.lower
        r = self.upper
        res = narrow(r-l+1)
        if res <= 1 AND: l>r then 0 else res end
      end
''', '''    getter size(): ZZ32 = do
        l = self.lower
        r = self.upper
        if l > r then 0 else narrow(r-l+1) end
      end
'''),
('''    generate[\\T\\](red:Reduction[\\T\\], body: ZZ32->T): T = do
        result : T := red.empty()
        i : ZZ32 := l
        while i <= r do
            b = body(i)
            result := red.join(result, b)
            i += 1
        end
        result
      end
    loop(body: ZZ32->()): () = do
        i : ZZ32 := l
        while i <= r do
            body(i)
            i += 1
        end
      end
''', '''    generate[\\T\\](red:Reduction[\\T\\], body: ZZ32->T): T = do
        result : T := red.empty()
        i : ZZ32 := l
        if l <= r then
            result := red.join(result, body(i))
            while i < r do
                i += 1
                result := red.join(result, body(i))
            end
        end
        result
      end
    loop(body: ZZ32->()): () = do
        i : ZZ32 := l
        if l <= r then
            body(i)
            while i < r do
                i += 1
                body(i)
            end
        end
      end
'''),
('''    getter size(): ZZ32 = do
        res = narrow((self.right.get-self.left.get) DIV self.stride + 1)
        if res <= 1 AND: self.isEmpty then 0
        else res end
      end
''', '''    getter size(): ZZ32 =
        if self.isEmpty then 0
        else narrow((self.right.get-self.left.get) DIV self.stride + 1) end
'''),
('''    generate[\\T\\](red:Reduction[\\T\\], body: ZZ32->T): T = do
        result : T := red.empty()
        i : ZZ32 := l
        if str > 0 then
            while i <= r do
                b = body(i)
                result := red.join(result,b)
                i += str
            end
        else (* str < 0 *)
            while i >= r do
                b = body(i)
                result := red.join(result,b)
                i += str
            end
        end
        result
      end
    loop(body: ZZ32->()): () =
        if str > 0 then
            i : ZZ32 := l
            while i <= r do
                body(i)
                i += str
            end
        else (* str < 0 *)
            i : ZZ32 := l
            while i >= r do
                body(i)
                i += str
            end
        end
''', '''    generate[\\T\\](red:Reduction[\\T\\], body: ZZ32->T): T = do
        result : T := red.empty()
        i : ZZ32 := l
        if str > 0 then
            if l <= r then
                result := red.join(result,body(i))
                while (r >= 0 AND: (i <= r - str)) OR: (r < 0 AND: (i + str <= r)) do
                    i += str
                    result := red.join(result,body(i))
                end
            end
        else (* str < 0 *)
            if l >= r then
                result := red.join(result,body(i))
                while (r < 0 AND: (i >= r - str)) OR: (r >= 0 AND: (i + str >= r)) do
                    i += str
                    result := red.join(result,body(i))
                end
            end
        end
        result
      end
    loop(body: ZZ32->()): () =
        if str > 0 then
            i : ZZ32 := l
            if l <= r then
                body(i)
                while (r >= 0 AND: (i <= r - str)) OR: (r < 0 AND: (i + str <= r)) do
                    i += str
                    body(i)
                end
            end
        else (* str < 0 *)
            i : ZZ32 := l
            if l >= r then
                body(i)
                while (r < 0 AND: (i >= r - str)) OR: (r >= 0 AND: (i + str >= r)) do
                    i += str
                    body(i)
                end
            end
        end
'''),
('''sized1Range(lo:ZZ32,ex:ZZ32): CompactFullParScalarRange =
    CompactFullParScalarRange(lo,lo+ex-1)
sized2Range(l1:ZZ32,l2:ZZ32,ex1:ZZ32,ex2:ZZ32): CompactFullRange2D =
    CompactFullRange2D(l1,l2,l1+ex1-1,l2+ex2-1)
sized3Range(l1:ZZ32,l2:ZZ32,l3:ZZ32,ex1:ZZ32,ex2:ZZ32,ex3:ZZ32): CompactFullRange3D =
    CompactFullRange3D(l1,l2,l3,l1+ex1-1,l2+ex2-1,l3+ex3-1)
''', '''sized1Range(lo:ZZ32,ex:ZZ32): CompactFullParScalarRange =
    if ex > 0 then CompactFullParScalarRange(lo,lo+(ex-1))
    elif lo > lo.minimum - ex then CompactFullParScalarRange(lo,lo+ex-1)
    else CompactFullParScalarRange(0,-1) end
sized2Range(l1:ZZ32,l2:ZZ32,ex1:ZZ32,ex2:ZZ32): CompactFullRange2D = do
    (r1, r2) = (sized1Range(l1,ex1), sized1Range(l2,ex2))
    CompactFullRange2D(r1.lower,r2.lower,r1.upper,r2.upper)
  end
sized3Range(l1:ZZ32,l2:ZZ32,l3:ZZ32,ex1:ZZ32,ex2:ZZ32,ex3:ZZ32): CompactFullRange3D = do
    (r1, r2, r3) = (sized1Range(l1,ex1), sized1Range(l2,ex2), sized1Range(l3,ex3))
    CompactFullRange3D(r1.lower,r2.lower,r3.lower,r1.upper,r2.upper,r3.upper)
  end
'''),
])

edit('Library/FortressLibrary.fss', [
('''        l':ZZ32 => 0 MAX ((u - l') + 1)
        l':(ZZ32, ZZ32) => do (l1, l2) = l'; (u1, u2) = u; (0 MAX ((u1 - l1) + 1)) (0 MAX ((u2 - l2) + 1)) end
        l':(ZZ32, ZZ32, ZZ32) => do (l1, l2, l3) = l'; (u1, u2, u3) = u; (0 MAX ((u1 - l1) + 1)) (0 MAX ((u2 - l2) + 1)) (0 MAX ((u3 - l3) + 1)) end
''', '''        l':ZZ32 => if u < l' then 0 else (u - l') + 1 end
        l':(ZZ32, ZZ32) => do (l1, l2) = l'; (u1, u2) = u; if (u1 < l1) OR (u2 < l2) then 0 else ((u1 - l1) + 1) ((u2 - l2) + 1) end end
        l':(ZZ32, ZZ32, ZZ32) => do (l1, l2, l3) = l'; (u1, u2, u3) = u; if (u1 < l1) OR (u2 < l2) OR (u3 < l3) then 0 else ((u1 - l1) + 1) ((u2 - l2) + 1) ((u3 - l3) + 1) end end
'''),
])
print('applied')
