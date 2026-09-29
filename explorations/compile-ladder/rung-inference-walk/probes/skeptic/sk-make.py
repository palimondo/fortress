#!/usr/bin/env python3
"""sk-make.py <out-dir>: the skeptic's own one-call programs for rung K, one program per call (walk's
refusals cannot be caught in Fortress), each with only the declarations it needs, so that the compiled
path's refusal of one declaration does not hide another call.  Writes <out-dir>/list.txt."""
import os
import sys

SHW = '''shw(v: Any): String =
  typecase v of
    v1: ZZ32 => v1.asString || ":ZZ32"
    v2: ZZ64 => v2.asString || ":ZZ64"
    v3: NN32 => v3.asString || ":NN32"
    v4: RR64 => v4.asString || ":RR64"
    v5: String => v5 || ":String"
    else => "other"
  end'''

D = {
 'tri': 'triS[\\T\\](a: T, b: T, c: T): String = shw(a) " " shw(b) " " shw(c)',
 'first': 'firstS[\\T\\](a: T, b: T): T = a',
 'mul': 'mulS[\\T extends Integral[\\T\\]\\](a: T, b: T): T = a b',
 'bigger': 'biggerS[\\T extends StandardTotalOrder[\\T\\]\\](a: T, b: T): T = if a < b then b else a end',
 'pair': 'object PairS[\\T\\](p: T, q: T)\n  show(): String = shw(p) " " shw(q)\nend',
 'cell': 'object CellS[\\T\\](v: T)\n  put(x: T): String = shw(x)\nend',
 'fill': 'fillS[\\T\\](c: CellS[\\T\\], x: T, y: T): String = c.put(x) " " c.put(y)',
 'last': 'lastS[\\T\\](x: T, c: CellS[\\T\\]): String = c.put(x)',
 'sized': 'sizedS[\\T\\](x: T, n: ZZ64): String = shw(x) " " shw(n)',
 'ov': 'ovS[\\T extends Number\\](a: T, b: T): String = "generic " shw(a) " " shw(b)\novS(a: String, b: String): String = "strings"',
 'wide': ('trait WideS[\\T\\] excludes { NarrowS[\\T\\] }\n  coerce(x: NarrowS[\\T\\]) = WideSOf[\\T\\](x.v)\n  getter w(): T\nend\n'
          'trait NarrowS[\\T\\] excludes { WideS[\\T\\] }\n  getter v(): T\nend\n'
          'object WideSOf[\\T\\](a: T) extends WideS[\\T\\]\n  getter w(): T = a\nend\n'
          'object NarrowSOf[\\T\\](a: T) extends NarrowS[\\T\\]\n  getter v(): T = a\nend\n'
          'takeW(x: WideS[\\String\\]): String = x.w\n'
          'takeWZ(x: WideS[\\ZZ64\\]): String = shw(x.w)'),
 'user': ('trait Aaa excludes { Ccc }\n  coerce(x: Ccc) = AaaOf(x.k)\n  getter n(): ZZ32\nend\n'
          'object AaaOf(m: ZZ32) extends Aaa\n  getter n(): ZZ32 = m\nend\n'
          'trait Ccc excludes { Aaa }\n  getter k(): ZZ32\nend\n'
          'object CccOf(m: ZZ32) extends Ccc\n  getter k(): ZZ32 = m\nend\n'
          'kindS(x: Any): String = typecase x of\n    Aaa => "Aaa"\n    Ccc => "Ccc"\n    else => "other"\n  end\n'
          'userS[\\T\\](a: T, b: T): String = kindS(a) " " kindS(b)'),
 'var': 'varS[\\T\\](xs: T...): String = shw(xs[0]) " " shw(xs[1])',
 'tup': 'tupS[\\T\\](p: (T, T)): String = do (a, b) = p; shw(a) " " shw(b) end',
 'wrap': 'wrapS[\\T\\](a: T, b: T): CellS[\\T\\] = CellS[\\T\\](a)',
 'sib': ('trait QQk end\nobject Q1 extends QQk end\nobject Q2 extends QQk end\nobject Q3 extends QQk end\n'
         'kindQ(x: Any): String = typecase x of\n    Q1 => "Q1"\n    Q2 => "Q2"\n    Q3 => "Q3"\n    else => "other"\n  end\n'
         'triQ[\\T\\](a: T, b: T, c: T): String = kindQ(a) " " kindQ(b) " " kindQ(c)'),
 'ev': 'evS[\\T extends ZZ32\\](a: T, b: T): String = shw(a) " " shw(b)',
}

BINDS = '''    z: ZZ32 = 100000
    w: ZZ64 = widen(200000)
    u: NN32 = unsigned(7)
    r: RR64 = 0.5'''

MAT = '''    m = matrix[\\RR64,2,2\\]()
    m[0,0] := 1.5
    m[0,1] := 2.0
    m[1,0] := 0.5
    m[1,1] := 4.0
    i: ZZ32 = 3
    a: Array[\\RR64,ZZ32\\] = array[\\RR64\\](2)
    a[0] := 1.5
    a[1] := 0.25'''

CASES = [
 ('tri(z,u,w)', ['tri'], 'triS(z, u, w)', 'ZZ64 each: the narrowest type every argument converts into (answer 8)'),
 ('tri(u,u,u)', ['tri'], 'triS(u, u, u)', 'control: NN32 each'),
 ('tri(z,z,r)', ['tri'], 'triS(z, z, r)', 'RR64 each: ZZ32 into RR64 exact (answer 8)'),
 ('tri(u,z,r)', ['tri'], 'triS(u, z, r)', 'no common conversion target unless NN32 converts into RR64'),
 ('firstS(z,w)', ['first'], 'shw(firstS(z, w))', 'result at T = ZZ64: the ZZ32 converted'),
 ('mulS(z,w)', ['mul'], 'shw(mulS(z, w))', 'T = ZZ64 under an F-bound: 20000000000:ZZ64'),
 ('biggerS(z,w)', ['bigger'], 'shw(biggerS(z, w))', 'T = ZZ64 under StandardTotalOrder: 200000:ZZ64'),
 ('PairS(z,w)', ['pair'], 'PairS(z, w).show()', 'generic constructor, T = ZZ64'),
 ('fillS(CellS[RR64],z,r)', ['cell', 'fill'], 'fillS(CellS[\\RR64\\](1.0), z, r)', 'T fixed by the cell, z converted'),
 ('lastS(z,CellS[ZZ64])', ['cell', 'last'], 'lastS(z, CellS[\\ZZ64\\](w))', 'the lone argument before the one that fixes T'),
 ('sizedS(z,z)', ['sized'], 'sizedS(z, z)', 'a declared ZZ64 parameter of a generic, the ZZ32 converted (row 388)'),
 ('ovS(z,w)', ['ov'], 'ovS(z, w)', 'overloaded generic chosen as today, re-instantiated at ZZ64'),
 ('ovS(z,z)', ['ov'], 'ovS(z, z)', 'control: the generic at ZZ32'),
 ('ovS(z,"s")', ['ov'], 'ovS(z, "s")', 'no declaration: refused'),
 ('takeW(NarrowS[String])', ['wide'], 'takeW(NarrowSOf[\\String\\]("s"))', 'row 389 at another type argument'),
 ('takeWZ(NarrowS[ZZ32])', ['wide'], 'takeWZ(NarrowSOf[\\ZZ32\\](3))', 'no coercion from NarrowS[ZZ32] into WideS[ZZ64]: refused'),
 ('userS(AaaOf,CccOf)', ['user'], 'userS(AaaOf(1), CccOf(2))', 'a user coercion at a lone parameter'),
 ('userS(CccOf,CccOf)', ['user'], 'userS(CccOf(1), CccOf(2))', 'control'),
 ('varS(z,w)', ['var'], 'varS(z, w)', 'varargs over mixed widths'),
 ('tupS((z,w))', ['tup'], 'tupS((z, w))', 'a tuple parameter over mixed widths'),
 ('wrapS(z,w).put(w)', ['cell', 'wrap'], 'wrapS(z, w).put(w)', 'T only in the result structure and lone'),
 ('evS(z,u)', ['ev'], 'evS(z, u)', 'a bound no promotion meets: refused'),
 ('triQ(Q1,Q2,Q3)', ['sib'], 'triQ(Q1, Q2, Q3)', 'three sibling objects: the join of three types'),
 ('(a + i)[1]', 'MAT', '(a + i)[1]', 'row 388 flat-tower consequence'),
 ('(i MAX a)[0]', 'MAT', '(i MAX a)[0]', 'row 388 flat-tower consequence'),
 ('(m i)[0,0]', 'MAT', '(m i)[0,0]', 'row 388 flat-tower consequence'),
]


def main():
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, 'list.txt'), 'w') as lst:
        for k, (label, decls, expr, why) in enumerate(CASES):
            name = 'SkK%02d' % (k + 1)
            with open(os.path.join(out, name + '.fss'), 'w') as f:
                f.write('component %s\nexport Executable\n\n' % name)
                f.write(SHW + '\n\n')
                if decls != 'MAT':
                    for d in decls:
                        f.write(D[d] + '\n\n')
                f.write('run(): () = do\n')
                f.write((MAT if decls == 'MAT' else BINDS) + '\n')
                if decls == 'MAT':
                    f.write('    println("%s = " shw(%s))\n' % (label, expr))
                else:
                    f.write('    println("%s = " (%s))\n' % (label.replace('"', '\\"'), expr))
                f.write('  end\n\nend\n')
            lst.write('%s|%s|%s\n' % (name, label, why))


if __name__ == '__main__':
    main()
