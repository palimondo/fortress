# The SUM/PROD replacement applied to a library copy (Library/FortressLibrary.{fsi,fss}
# under <root>): one generic reduction per big operator, joined with T's own operator,
# its identity chosen from the static argument alone through the library's typecase over a
# () -> T witness (FortressLibrary.fss:2243-2250); the fusion pairs and the three
# Number-typed extremum operators (BIG MAXN, BIG MINN, BIG MINMAXN) are dropped in this
# probe copy.  apply(root, sum_bound, prod_bound): the bounds are strings such as
# "Number" or "AdditiveGroup[\\T\\]".  Every edit asserts its match, so a drifted source
# fails loudly.  Probe copy only: the identities cover ZZ32, ZZ64 and RR64.
import os

FSS_START = "object SumProdReductionPair extends ReductionPair[\\Number,Number\\]\n"
FSS_END = "        BIG MINMAXN[\\T\\](), g)\n"
FSI_START = "(* Hack to permit any Number to work non-parametrically. *)\nobject SumReduction"
FSI_END = "opr BIG MINMAXN[\\T extends Number\\](g: Generator[\\T\\]): (Number, Number)\n"

FSS_NEW = """(** The identity of + and of TIMES for a number type named by its static argument
    alone, with no element in hand: the library's own device for choosing by a static
    argument, a typecase over a () -> T witness (array1 above).  The narrowest type is
    tested first: the interpreter binds an unwritten static argument to Bottom, and a
    () -> Bottom is a () -> ZZ32, so a sum whose element type it cannot see gets the
    integer identity, as it did before.  Probe copy: ZZ32, ZZ64 and RR64 only. **)
additiveIdentity[\\T extends SB\\](): T =
    typecase __thrower[\\T\\] of
        () -> ZZ32 => 0
        () -> ZZ64 => widen(0)
        () -> RR64 => 0.0
        else => 0
    end

multiplicativeIdentity[\\T extends PB\\](): T =
    typecase __thrower[\\T\\] of
        () -> ZZ32 => 1
        () -> ZZ64 => widen(1)
        () -> RR64 => 1.0
        else => 1
    end

object SumReduction[\\T extends SB\\] extends CommutativeMonoidReduction[\\T\\]
    getter asString(): String = "SumReduction"
    empty(): T = additiveIdentity[\\T\\]()
    join(a: T, b: T): T = a + b
end

opr SUM[\\T extends SB\\](): BigReduction[\\T,T\\] = BigReduction[\\T,T\\](SumReduction[\\T\\])

opr SUM[\\T extends SB\\](g: Generator[\\T\\]): T =
    __bigOperatorSugar[\\T,T,T,T\\](SUM[\\T\\](), g)

object ProdReduction[\\T extends PB\\] extends CommutativeMonoidReduction[\\T\\]
    getter asString(): String = "ProdReduction"
    empty(): T = multiplicativeIdentity[\\T\\]()
    join(a: T, b: T): T = a b
end

opr PROD[\\T extends PB\\](): BigReduction[\\T,T\\] = BigReduction[\\T,T\\](ProdReduction[\\T\\])

opr PROD[\\T extends PB\\](g: Generator[\\T\\]): T =
    __bigOperatorSugar[\\T,T,T,T\\](PROD[\\T\\](), g)
"""

FSI_NEW = """additiveIdentity[\\T extends SB\\](): T
multiplicativeIdentity[\\T extends PB\\](): T

object SumReduction[\\T extends SB\\] extends CommutativeMonoidReduction[\\T\\]
    empty(): T
    join(a: T, b: T): T
end

opr SUM[\\T extends SB\\](): BigReduction[\\T,T\\]

opr SUM[\\T extends SB\\](g: Generator[\\T\\]): T

object ProdReduction[\\T extends PB\\] extends CommutativeMonoidReduction[\\T\\]
    empty(): T
    join(a: T, b: T): T
end

opr PROD[\\T extends PB\\](): BigReduction[\\T,T\\]

opr PROD[\\T extends PB\\](g: Generator[\\T\\]): T
"""


def replace_block(path, start, end, new):
    s = open(path, encoding="utf-8").read()
    assert s.count(start) == 1, (path, start[:60], s.count(start))
    i = s.index(start)
    j = s.index(end, i)
    assert j > i, (path, end[:60])
    j += len(end)
    open(path, "w", encoding="utf-8").write(s[:i] + new + s[j:])


def apply(root, sum_bound, prod_bound):
    fss = os.path.join(root, "Library", "FortressLibrary.fss")
    fsi = os.path.join(root, "Library", "FortressLibrary.fsi")
    replace_block(fss, FSS_START, FSS_END, FSS_NEW.replace("SB", sum_bound).replace("PB", prod_bound))
    replace_block(fsi, FSI_START, FSI_END, FSI_NEW.replace("SB", sum_bound).replace("PB", prod_bound))
