#!/usr/bin/env python3
"""lib-variants.py <dir> <variant>

Library copies for array-design-ways.md.  <dir> holds a copy of every .fsi/.fss of Library/ and
ProjectFortress/LibraryBuiltin/; the variant edits FortressLibrary.fss/.fsi there in place.  Every
edit must match the stated number of times, or the script stops (so a moved line cannot pass
silently).  None of these is a proposal; each measures one way of a question.

NUMOBJ  Question 6, the slip first: the three storing objects that implement Vector and Matrix
        (__DefaultVector, __DefaultMatrix, TransposedMatrix) declare their element type with no
        bound, where the traits they extend require T extends Number; they get the traits' bound.
RING    Question 6, way "the ring bound": NUMOBJ's three objects, and every T extends Number of the
        array section and the scalar-extension block, in the component and the api, bounded by
        T extends MultiplicativeRing[\\T\\] (the library's own algebra trait, which extends
        AdditiveGroup[\\T\\] and which every number type of the flat tower carries at its own type).
RINGVM  Question 6, the ring bound on Vector and Matrix alone: RING without the scalar-extension block,
        whose own T extends Number is left as it is (under walk the block's MAX with the ring bound is
        refused beside StandardTotalOrder's MAX, captures/walk-RING-vectorOps.txt).
RINGNUM Question 6, RINGVM's places with the two-trait bound T extends { Number, MultiplicativeRing[\\T\\] },
        the library's own form of a bound with two traits (MaxSumReductionPair, FortressLibrary.fss:3179),
        which keeps Number's exclusions beside the ring's arithmetic.
STORE   Question 3, the library's own way around the checker's refusal of arithmetic in a size:
        the three storing objects whose field is sized by a product (__DefaultArray2,
        __DefaultMatrix, __DefaultArray3) make it with the library's run-time-size factory
        primitiveArray[\\T\\](n), the product computed as a value, the field typed by the unsized
        Array[\\T,ZZ32\\] that factory returns.
"""
import re, sys

def sub_exact(src, old, new, count, what):
    n = src.count(old)
    if n != count:
        sys.exit('%s: expected %d of %r, found %d' % (what, count, old, n))
    return src.replace(old, new)

def sub_lines(src, lo, hi, pat, new, count, what):
    lines = src.split('\n'); k = 0
    for i in range(lo - 1, hi):
        lines[i], m = re.subn(pat, lambda _: new, lines[i]); k += m
    if k != count:
        sys.exit('%s: expected %d substitutions in lines %d-%d, made %d' % (what, count, lo, hi, k))
    return '\n'.join(lines)

def objects(src, bound):
    src = sub_exact(src, 'object __DefaultVector[\\T, nat s0\\]()', 'object __DefaultVector[\\T extends %s, nat s0\\]()' % bound, 1, 'vector object')
    src = sub_exact(src, 'object __DefaultMatrix[\\T, nat s0, nat s1\\]()', 'object __DefaultMatrix[\\T extends %s, nat s0, nat s1\\]()' % bound, 1, 'matrix object')
    src = sub_exact(src, 'object TransposedMatrix[\\T, nat s0, nat s1\\](', 'object TransposedMatrix[\\T extends %s, nat s0, nat s1\\](' % bound, 1, 'transposed object')
    return src

def main(d, v):
    fss_p, fsi_p = d + '/FortressLibrary.fss', d + '/FortressLibrary.fsi'
    fss, fsi = open(fss_p).read(), open(fsi_p).read()
    ring = 'T extends MultiplicativeRing[\\T\\]'
    if v == 'NUMOBJ':
        fss = objects(fss, 'Number')
    elif v == 'RING':
        fss = objects(fss, 'MultiplicativeRing[\\T\\]')
        fss = sub_lines(fss, 2300, 2800, r'\bT extends Number\b', ring, 26, 'component arrays')
        fss = sub_lines(fss, 4620, 4640, r'\bT extends Number\b', ring, 8, 'component scalar extension')
        fsi = sub_lines(fsi, 1540, 1735, r'\bT extends Number\b', ring, 32, 'api arrays')
        fsi = sub_lines(fsi, 2595, 2615, r'\bT extends Number\b', ring, 8, 'api scalar extension')
    elif v == 'RINGVM':
        fss = objects(fss, 'MultiplicativeRing[\\T\\]')
        fss = sub_lines(fss, 2300, 2800, r'\bT extends Number\b', ring, 26, 'component arrays')
        fsi = sub_lines(fsi, 1540, 1735, r'\bT extends Number\b', ring, 32, 'api arrays')
    elif v == 'RINGNUM':
        both = 'T extends { Number, MultiplicativeRing[\\T\\] }'
        fss = objects(fss, '{ Number, MultiplicativeRing[\\T\\] }')
        fss = sub_lines(fss, 2300, 2800, r'\bT extends Number\b', both, 26, 'component arrays')
        fsi = sub_lines(fsi, 1540, 1735, r'\bT extends Number\b', both, 32, 'api arrays')
    elif v == 'STORE':
        fss = sub_exact(fss, 'mem:PrimitiveArray[\\T, (s0 s1) \\] = PrimitiveArray[\\T, (s0 s1) \\]()',
                        'mem:Array[\\T,ZZ32\\] = primitiveArray[\\T\\](s0 s1)', 2, 'rank-2 stores')
        fss = sub_exact(fss, 'mem:PrimitiveArray[\\T,(s0 (s1 s2))\\] = PrimitiveArray[\\T,(s0 (s1 s2))\\]()',
                        'mem:Array[\\T,ZZ32\\] = primitiveArray[\\T\\](s0 s1 s2)', 1, 'rank-3 store')
    else:
        sys.exit('unknown variant ' + v)
    open(fss_p, 'w').write(fss); open(fsi_p, 'w').write(fsi)
    print('%s: written' % v)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
