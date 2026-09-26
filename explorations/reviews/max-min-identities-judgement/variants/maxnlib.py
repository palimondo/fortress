# The "keep them" shape for BIG MAXN, BIG MINN and BIG MINMAXN applied to a library copy
# (Library/FortressLibrary.{fsi,fss} under <root>), after sumlib.py has replaced the
# SUM/PROD block (which removes today's three Number-typed operators with it): one generic
# reduction per operator, joined with T's own MAX / MIN, its identity the least or the
# greatest element of T chosen from the static argument alone through the library's
# typecase over a () -> T witness (the device of answer 7); a type with no least or
# greatest element (ZZ, QQ) gets EmptyReduction when the identity is asked for.
# apply(root, bound): the bound is a string such as "Number" or "StandardMinMax[\\T\\]".
# Every edit asserts its match, so a drifted source fails loudly.  Probe copy only: the
# elements cover ZZ32, ZZ64 and RR64.  On today's nested tower the branches must run from
# the narrowest type up, with ZZ and QQ before RR64: a () -> ZZ is a () -> RR64 there, so
# without its own branch ZZ took the RR64 branch and the reduction's join then refused the
# float (MaxNWalk.maxn-first.walk.txt); on the flat tower the order is immaterial.
import os

FSS_ANCHOR = "object MinReduction[\\T extends StandardMin[\\T\\]\\] extends CommutativeReduction[\\T\\]\n"
FSI_ANCHOR = "object MinReduction[\\T extends StandardMin[\\T\\]\\] extends CommutativeReduction[\\T\\]\n"

FSS_NEW = """(** The least and the greatest element of a number type named by its static argument
    alone: the identities of MAX and of MIN on the types that have them.  ZZ and QQ have
    none, so their empty maximum is EmptyReduction, as BIG MAX's is.  Probe copy: ZZ32,
    ZZ64 and RR64. **)
leastElement[\\T extends MB\\](): T =
    typecase __thrower[\\T\\] of
        () -> ZZ32 => -2147483647 - 1
        () -> ZZ64 => -9223372036854775807 - 1
        () -> ZZ   => throw EmptyReduction
        () -> QQ   => throw EmptyReduction
        () -> RR64 => -1.0/0.0
        else => throw EmptyReduction
    end

greatestElement[\\T extends MB\\](): T =
    typecase __thrower[\\T\\] of
        () -> ZZ32 => 2147483647
        () -> ZZ64 => 9223372036854775807
        () -> ZZ   => throw EmptyReduction
        () -> QQ   => throw EmptyReduction
        () -> RR64 => 1.0/0.0
        else => throw EmptyReduction
    end

object MaxReductionN[\\T extends MB\\] extends CommutativeMonoidReduction[\\T\\]
    getter asString(): String = "MaxReductionN"
    empty(): T = leastElement[\\T\\]()
    join(a: T, b: T): T = a MAX b
end
opr BIG MAXN[\\T extends MB\\](): BigReduction[\\T,T\\] = BigReduction[\\T,T\\](MaxReductionN[\\T\\])
opr BIG MAXN[\\T extends MB\\](g: Generator[\\T\\]): T =
    __bigOperatorSugar[\\T,T,T,T\\](BIG MAXN[\\T\\](), g)

object MinReductionN[\\T extends MB\\] extends CommutativeMonoidReduction[\\T\\]
    getter asString(): String = "MinReductionN"
    empty(): T = greatestElement[\\T\\]()
    join(a: T, b: T): T = a MIN b
end
opr BIG MINN[\\T extends MB\\](): BigReduction[\\T,T\\] = BigReduction[\\T,T\\](MinReductionN[\\T\\])
opr BIG MINN[\\T extends MB\\](g: Generator[\\T\\]): T =
    __bigOperatorSugar[\\T,T,T,T\\](BIG MINN[\\T\\](), g)

object MinMaxReductionN[\\T extends MB\\] extends CommutativeMonoidReduction[\\(T,T)\\]
    getter asString(): String = "MinMaxReductionN"
    empty(): (T,T) = (greatestElement[\\T\\](), leastElement[\\T\\]())
    join(a: (T,T), b: (T,T)): (T,T) = do
        (na,xa) = a
        (nb,xb) = b
        (na MIN nb, xa MAX xb)
      end
end
opr BIG MINMAXN[\\T extends MB\\](): Comprehension[\\T,(T,T),(T,T),(T,T)\\] =
    Comprehension[\\T,(T,T),(T,T),(T,T)\\](fn x => x, MinMaxReductionN[\\T\\], fn x => (x,x))
opr BIG MINMAXN[\\T extends MB\\](g: Generator[\\T\\]): (T,T) =
    __bigOperatorSugar[\\T,(T,T),(T,T),(T,T)\\](BIG MINMAXN[\\T\\](), g)

"""

FSI_NEW = """leastElement[\\T extends MB\\](): T
greatestElement[\\T extends MB\\](): T

object MaxReductionN[\\T extends MB\\] extends CommutativeMonoidReduction[\\T\\]
    empty(): T
    join(a: T, b: T): T
end
opr BIG MAXN[\\T extends MB\\](): BigReduction[\\T,T\\]
opr BIG MAXN[\\T extends MB\\](g: Generator[\\T\\]): T

object MinReductionN[\\T extends MB\\] extends CommutativeMonoidReduction[\\T\\]
    empty(): T
    join(a: T, b: T): T
end
opr BIG MINN[\\T extends MB\\](): BigReduction[\\T,T\\]
opr BIG MINN[\\T extends MB\\](g: Generator[\\T\\]): T

object MinMaxReductionN[\\T extends MB\\] extends CommutativeMonoidReduction[\\(T,T)\\]
    empty(): (T,T)
    join(a: (T,T), b: (T,T)): (T,T)
end
opr BIG MINMAXN[\\T extends MB\\](): Comprehension[\\T,(T,T),(T,T),(T,T)\\]
opr BIG MINMAXN[\\T extends MB\\](g: Generator[\\T\\]): (T,T)

"""


def insert_before(path, anchor, new):
    s = open(path, encoding="utf-8").read()
    assert s.count(anchor) == 1, (path, anchor[:60], s.count(anchor))
    i = s.index(anchor)
    open(path, "w", encoding="utf-8").write(s[:i] + new + s[i:])


def apply(root, bound):
    fss = os.path.join(root, "Library", "FortressLibrary.fss")
    fsi = os.path.join(root, "Library", "FortressLibrary.fsi")
    insert_before(fss, FSS_ANCHOR, FSS_NEW.replace("MB", bound))
    insert_before(fsi, FSI_ANCHOR, FSI_NEW.replace("MB", bound))
