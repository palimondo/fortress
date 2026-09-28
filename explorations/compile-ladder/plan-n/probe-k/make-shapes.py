#!/usr/bin/env python3
"""make-shapes.py <out-dir>: writes one small program per shape of rung K's new test (CLIMB-BATCH-N.md,
section 3, K, "The test, first") and of the two expected failures it promotes, so that the shadow can be
checked against what the rule is meant to do before it is run over the corpus.  Each program is the
one-shape preamble (explorations/reviews/numerics-plan-fable/probes/one-shape/walk/) with one call in run();
walk's refusals are not catchable, hence one program per call."""
import os
import sys

PRE = r'''component %(name)s
import List.{...}
export Executable
typeOf(x: Any): String = typecase x of
    ZZ32 => "ZZ32"
    ZZ64 => "ZZ64"
    NN32 => "NN32"
    NN64 => "NN64"
    ZZ => "ZZ"
    RR64 => "RR64"
    else => "other"
  end
object Box[\T\](v: T)
    accept(x: T): String = "accept[" (typeOf x) "]"
end
scale[\T\](b: Box[\T\], x: T): String = b.accept(x)
scale64[\T\](b: Box[\T\], m: ZZ64): String = "scale64 m:" (typeOf m)
same[\T extends Number\](a: T, b: T): String = "same[" (typeOf a) "," (typeOf b) "]"
sameAdd[\T extends Number\](a: T, b: T): String = "a+b is " (typeOf (a + b))
lohi[\I extends AnyIntegral\](lo: I, hi: I): String = "lohi[" (typeOf lo) "," (typeOf hi) "]"
twice[\T extends Integral[\T\]\](a: T, b: T): String = "twice[" (typeOf a) "," (typeOf b) "]"
pick[\T\](a: T, b: T): String = "pick[" (typeOf a) "," (typeOf b) "]"
ov[\T extends Number\](a: T, b: T): String = "ov generic[" (typeOf a) "," (typeOf b) "]"
ov(a: String, b: String): String = "ov strings"
og[\T\](b: Box[\T\], x: T): String = "og generic " b.accept(x)
og(b: String, x: String): String = "og strings"
%(extra)strait Wide excludes { Narrow }
  coerce(x: Narrow) = WideOf(widen(x.small))
  getter big(): ZZ64
end
trait Narrow excludes { Wide }
  getter small(): ZZ32
end
object WideOf(b: ZZ64) extends Wide
  getter big(): ZZ64 = b
end
object NarrowOf(s: ZZ32) extends Narrow
  getter small(): ZZ32 = s
end
gf[\T\](x: Wide, y: T): String = "gf got " x.big " and " y
trait WideG[\T\] excludes { NarrowG[\T\] }
  coerce(x: NarrowG[\T\]) = WideGOf[\T\](x.v)
  getter w(): T
end
trait NarrowG[\T\] excludes { WideG[\T\] }
  getter v(): T
end
object WideGOf[\T\](a: T) extends WideG[\T\]
  getter w(): T = a
end
object NarrowGOf[\T\](a: T) extends NarrowG[\T\]
  getter v(): T = a
end
fg(x: WideG[\ZZ32\]): ZZ32 = x.w
run(): () = do
    z: ZZ32 = 3
    w: ZZ64 = widen(4)
    l: ZZ64 = widen(7)
    r: RR64 = 2.5
    u: NN32 = unsigned(5)
    b: Box[\RR64\] = Box[\RR64\](1.0)
    bs: Box[\String\] = Box[\String\]("s")
    println("%(label)s: " (%(call)s))
  end
end
'''

OP = r'''op[\T extends Number\](a: T, b: T): String = "op generic[" (typeOf a) "," (typeOf b) "]"
op(a: Number, b: Number): String = "op plain[" (typeOf a) "," (typeOf b) "]"
'''

SHAPES = [
    ('ScaleZ', 'scale(b, z)'), ('Scale3', 'scale(b, 3)'), ('ScaleR', 'scale(b, r)'),
    ('Scale64', 'scale64(bs, 3)'),
    ('SameZW', 'same(z, w)'), ('SameZZ', 'same(z, z)'), ('SameAddZW', 'sameAdd(z, w)'), ('SameZR', 'same(z, r)'),
    ('LohiZW', 'lohi(z, w)'), ('LohiZU', 'lohi(z, u)'), ('Lohi246', 'lohi(2, 46)'),
    ('TwiceLZ', 'twice(l, z)'), ('Twice34', 'twice(3, 4)'),
    ('PickZU', 'pick(z, u)'), ('PickLR', 'pick(l, r)'), ('PickZS', 'pick(z, "s")'),
    ('OvZW', 'ov(z, w)'), ('OgZ', 'og(b, z)'),
    ('GfNarrow', 'gf(NarrowOf(2), "two")'), ('FgNarrowG', 'fg(NarrowGOf[\\ZZ32\\](2))'),
    # the range factories' dummy ZZ32 (Library/RangeInternals.fss:1418-1441), met in XXXRangeSizeZZ64RungO
    ('RangeUU', 'typeOf((u:u).lower)'), ('RangeWW', 'typeOf((w:w).lower)'), ('HashUU', 'typeOf((u#u).lower)'),
    ('RangeZZ', 'typeOf((z:z).lower)'),
    # a generic declaration beside a plain one that both apply by subtyping (section 6's fork)
    ('OpZW', 'op(z, w)'), ('OpZZ', 'op(z, z)'),
]


def main():
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, 'list.txt'), 'w') as lst:
        for name, call in SHAPES:
            n = 'PK' + name
            with open(os.path.join(out, n + '.fss'), 'w') as f:
                extra = OP if name.startswith('Op') else ''
                f.write(PRE % {'name': n, 'label': call.replace('\\', '\\\\').replace('"', '\\"'), 'call': call,
                               'extra': extra})
            lst.write(n + '.fss\n')


if __name__ == '__main__':
    main()
