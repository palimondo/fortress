#!/usr/bin/env python3
"""Climb batch 25's planner: writes a rung's text, or the planner's sample of one, into a tree at the batch's base, by
exact text, each edit matching once, so that `git diff` there gives the rung's patch. Usage:
    apply25.py <tree> R|U|A|N|D|P|asfloat-control ...
R, U and A are the rungs' whole texts as the planner measured them (rung-R.patch, rung-U.patch, rung-A.patch); N, D
and P are samples (sample-N.patch, sample-D.patch, sample-P.patch), a few of each rung's helpers and strings, written
where the rung writes the rest; asfloat-control moves Int's asFloat with its header kept at Float, the control that the
checker refuses. Where each rung puts its helpers: R right after the class's overflowing division (div in
simpleArbitraryPrecisionArith); A right before the class's addition helper; U's beside its own fixes; N and D at
the class's end; P in a class of its own, simpleFloatArith."""
import sys, os
T = sys.argv[1]
NH = 'ProjectFortress/src/com/sun/fortress/nativeHelpers/'
FL = 'Library/FortressLibrary.fss'
FB = 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fss'
G = 'com.sun.fortress.interpreter.glue.prim.'
H = 'com.sun.fortress.nativeHelpers.'
DZ = 'throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");'
OV = 'throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");'

def edit(path, old, new):
    p = os.path.join(T, path); s = open(p).read()
    assert s.count(old) == 1, (path, s.count(old), old[:80])
    open(p, 'w').write(s.replace(old, new))

def after(path, anchor_end, text):
    """Insert text after the method whose body ends with anchor_end (unique), then a blank line."""
    edit(path, anchor_end, anchor_end + text)

def at_end(path, text):
    p = os.path.join(T, path); s = open(p).read(); i = s.rstrip().rfind('}')
    open(p, 'w').write(s[:i].rstrip('\n') + '\n' + text + s[i:])

def bind(path, glue, helper, near=None):
    """Point the one string that names the glue class at the helper; near picks one of several by a header text."""
    p = os.path.join(T, path); L = open(p).read().split('\n')
    hits = [i for i, l in enumerate(L) if '"' + G + glue + '"' in l]
    if near is not None:
        hits = [i for i in hits if any(near in L[j] for j in range(max(0, i - 2), i + 1))]
    assert len(hits) == 1, (path, glue, near, [h + 1 for h in hits])
    L[hits[0]] = L[hits[0]].replace('"' + G + glue + '"', '"' + H + helper + '"')
    open(p, 'w').write('\n'.join(L))

def header(path, old_line_text, new_line_text, near_glue):
    p = os.path.join(T, path); L = open(p).read().split('\n')
    hits = [i for i, l in enumerate(L) if l.strip() == old_line_text and i + 1 < len(L) and '"' + G + near_glue + '"' in L[i + 1]]
    assert len(hits) == 1, (path, old_line_text, near_glue, hits)
    L[hits[0]] = L[hits[0]].replace(old_line_text, new_line_text)
    open(p, 'w').write('\n'.join(L))

def rung_R():
    after(NH + 'simpleIntArith.java', '''    public static int intOverflowingDiv(int a, int b) {
	if (b==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
	if (b==(-1) && a==Integer.MIN_VALUE) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        return a / b;
    }
''', '''
    /* REM and MOD of ZZ32, as walk's Int$Rem and Int$Mod compute them, raising DivisionByZero at a zero divisor;
       MOD has the sign of the divisor. */
    public static int intRem(int a, int b) {
        if (b == 0) %s
        return a %% b;
    }

    public static int intMod(int a, int b) {
        if (b == 0) %s
        return Math.floorMod(a, b);
    }
''' % (DZ, DZ))
    after(NH + 'simpleLongArith.java', '''    public static long longOverflowingDiv(long a, long b) {
	if (b==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
	if (b==(-1) && a==Long.MIN_VALUE) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        return a / b;
    }
''', '''
    /* REM and MOD of ZZ64, as walk's Long$Rem and Long$Mod compute them, raising DivisionByZero at a zero divisor;
       MOD has the sign of the divisor. */
    public static long longRem(long a, long b) {
        if (b == 0) %s
        return a %% b;
    }

    public static long longMod(long a, long b) {
        if (b == 0) %s
        return Math.floorMod(a, b);
    }
''' % (DZ, DZ))
    after(NH + 'simpleUnsignedIntArith.java', '''    public static int unsignedIntOverflowingDiv(int a, int b) {
	if (b==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
	long c = toLong(a) / toLong(b);
        return (int) c; 
    }
''', '''
    /* REM and MOD of NN32, the same for natural numbers, as walk's NN32$Rem and NN32$Mod compute them, raising
       DivisionByZero at a zero divisor. */
    public static int unsignedIntRem(int a, int b) {
        if (b == 0) %s
        return Integer.remainderUnsigned(a, b);
    }

    public static int unsignedIntMod(int a, int b) {
        if (b == 0) %s
        return Integer.remainderUnsigned(a, b);
    }
''' % (DZ, DZ))
    after(NH + 'simpleUnsignedLongArith.java', '''    public static long unsignedLongOverflowingDiv(long n, long d) {
    	if (d==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
    	return divu(n,d);
    }
''', '''
    /* REM and MOD of NN64, the same for natural numbers, as walk's UnsignedLong$Rem and UnsignedLong$Mod compute
       them, raising DivisionByZero at a zero divisor. */
    public static long unsignedLongRem(long a, long b) {
        if (b == 0) %s
        return Long.remainderUnsigned(a, b);
    }

    public static long unsignedLongMod(long a, long b) {
        if (b == 0) %s
        return Long.remainderUnsigned(a, b);
    }
''' % (DZ, DZ))
    after(NH + 'simpleArbitraryPrecisionArith.java', '''    public static BigInteger div(BigInteger a, BigInteger b) { 
    	if (b.equals(BigInteger.ZERO)) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero"); 
    	return a.divide(b);
    }
''', '''
    /* REM and MOD of ZZ, as walk's BigNum$Rem and BigNum$Mod compute them, raising DivisionByZero at a zero divisor;
       MOD has the sign of the divisor. */
    public static BigInteger rem(BigInteger a, BigInteger b) {
        if (b.signum() == 0) %s
        return a.remainder(b);
    }

    public static BigInteger mod(BigInteger a, BigInteger b) {
        if (b.signum() == 0) %s
        if (b.signum() < 0) return a.negate().mod(b.negate()).negate();
        return a.mod(b);
    }
''' % (DZ, DZ))
    for g, h in [('Int$Rem', 'simpleIntArith.intRem'), ('Int$Mod', 'simpleIntArith.intMod'), ('Long$Rem', 'simpleLongArith.longRem'),
                 ('Long$Mod', 'simpleLongArith.longMod'), ('UnsignedLong$Rem', 'simpleUnsignedLongArith.unsignedLongRem'),
                 ('UnsignedLong$Mod', 'simpleUnsignedLongArith.unsignedLongMod'), ('BigNum$Rem', 'simpleArbitraryPrecisionArith.rem'),
                 ('BigNum$Mod', 'simpleArbitraryPrecisionArith.mod')]:
        bind(FL, g, h)
    bind(FB, 'NN32$Rem', 'simpleUnsignedIntArith.unsignedIntRem')
    bind(FB, 'NN32$Mod', 'simpleUnsignedIntArith.unsignedIntMod')

def rung_U():
    edit(NH + 'simpleUnsignedLongArith.java', '''    public static String unsignedLongToString(long x) {
        return Long.toString(x);
    }
''', '''    public static String unsignedLongToString(long x) {
        return Long.toUnsignedString(x);
    }

    /* asFloat of an NN64, rounded to the nearest double, as walk's UnsignedLong$AsFloat computes it: a value above
       the signed half is halved, its low bit kept as a sticky bit, converted and doubled. */
    public static double unsignedLongToDouble(long a) {
        if (a >= 0) return (double) a;
        return ((double) ((a >>> 1) | (a & 1L))) * 2.0;
    }
''')
    edit(NH + 'simpleUnsignedLongArith.java', '''    public static long unsignedLongWrappingNeg(long a) { 
    	return a;
    }''', '''    public static long unsignedLongWrappingNeg(long a) { 
    	return -a;
    }''')
    R = 'ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/'
    edit(R + 'FNN32.java', 'public String toString() { return String.valueOf(val);}', 'public String toString() { return Integer.toUnsignedString(val);}')
    edit(R + 'FNN32.java', 'public FJavaString asString() { return FJavaString.make(String.valueOf(val));}',
         'public FJavaString asString() { return FJavaString.make(Integer.toUnsignedString(val));}')
    edit(R + 'FNN64.java', 'public String toString() { return "" + val;}', 'public String toString() { return Long.toUnsignedString(val);}')
    edit('ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java', '''        if (desc.equals("J") && declared.equals("NN64"))
            return result ?''', '''        /* UnsignedLong, walk's object of NN64, is an NN64: its self takes the argument transfer. */
        if (desc.equals("J") && (declared.equals("NN64") || (!result && declared.equals("UnsignedLong"))))
            return result ?''')
    p = os.path.join(T, FB); L = open(p).read().split('\n')
    hits = [i for i, l in enumerate(L) if '"' + G + 'UnsignedLong$ToString"' in l]
    assert len(hits) == 2, hits
    for i in hits: L[i] = L[i].replace('"' + G + 'UnsignedLong$ToString"', '"' + H + 'simpleUnsignedLongArith.unsignedLongToString"')
    open(p, 'w').write('\n'.join(L))
    header(FB, 'asFloat(self): Float =', 'asFloat(self): RR64 =', 'UnsignedLong$AsFloat')
    bind(FB, 'UnsignedLong$AsFloat', 'simpleUnsignedLongArith.unsignedLongToDouble')
    bind(FL, 'UnsignedLong$WrappingNegate', 'simpleUnsignedLongArith.unsignedLongWrappingNeg')
    bind(FB, 'NN32$Choose', 'simpleUnsignedIntArith.unsignedIntOverflowingChoose')

def rung_A():
    edit(NH + 'simpleLongArith.java', '''    public static long longAdd(long a, long b) {''', '''    /* asFloat of a ZZ64, as walk's Long$AsFloat computes it. */
    public static double longToDouble(long a) {
        return (double) a;
    }

    public static long longAdd(long a, long b) {''')
    edit(NH + 'simpleArbitraryPrecisionArith.java', '''    public static BigInteger add(BigInteger a, BigInteger b) {''', '''    /* asFloat of a ZZ, as walk's BigNum$AsFloat computes it. */
    public static double toDouble(BigInteger a) {
        return a.doubleValue();
    }

    public static BigInteger add(BigInteger a, BigInteger b) {''')
    for glue, helper in [('RR32$AsFloat', 'simpleDoubleArith.floatToDouble'), ('Int$AsFloat', 'simpleIntArith.intToDouble'),
                         ('Long$AsFloat', 'simpleLongArith.longToDouble'), ('NN32$AsFloat', 'simpleUnsignedIntArith.unsignedIntToDouble'),
                         ('BigNum$AsFloat', 'simpleArbitraryPrecisionArith.toDouble')]:
        header(FB, 'asFloat(self): Float =', 'asFloat(self): RR64 =', glue)
        bind(FB, glue, helper)

def asfloat_control():
    bind(FB, 'Int$AsFloat', 'simpleIntArith.intToDouble')

def sample_N():
    at_end(NH + 'simpleIntArith.java', '''
    /* The planner's sample of rung N: GCD of ZZ32 and partitionL, as walk's Int$Gcd and Int$Partition. */
    public static int intGcd(int u, int v) {
        long g = gcdOfLongs(u, v);
        if (g > Integer.MAX_VALUE) %s
        return (int) g;
    }

    private static long gcdOfLongs(long u, long v) {
        if (u < 0) u = -u;
        if (v < 0) v = -v;
        while (v != 0) { long t = u %% v; u = v; v = t; }
        return u;
    }

    public static int intPartition(int u) {
        return Integer.highestOneBit(u - 1);
    }

''' % OV)
    at_end(NH + 'simpleLongArith.java', '''
    /* The planner's sample of rung N: nanoTime at ZZ64, as walk's Long$NanoTime. */
    public static long longNanoTime() {
        return System.nanoTime();
    }

''')
    at_end(NH + 'simpleUnsignedLongArith.java', '''
    /* The planner's sample of rung N: GCD of NN64, as walk's UnsignedLong$Gcd. */
    public static long unsignedLongGcd(long u, long v) {
        while (v != 0) { long t = Long.remainderUnsigned(u, v); u = v; v = t; }
        return u;
    }

''')
    at_end(NH + 'simpleArbitraryPrecisionArith.java', '''
    /* The planner's sample of rung N: ZZ's cmp, as walk's BigNum$Cmp. */
    public static int cmp(BigInteger a, BigInteger b) {
        return a.compareTo(b);
    }

''')
    for g, h in [('Int$Gcd', 'simpleIntArith.intGcd'), ('Int$Partition', 'simpleIntArith.intPartition'),
                 ('UnsignedLong$Gcd', 'simpleUnsignedLongArith.unsignedLongGcd'), ('BigNum$Cmp', 'simpleArbitraryPrecisionArith.cmp'),
                 ('Long$NanoTime', 'simpleLongArith.longNanoTime')]:
        bind(FL, g, h)

def sample_D():
    at_end(NH + 'simpleDoubleArith.java', '''
    /* The planner's sample of rung D: Float's isNaN, rawBits, narrow and PLUS_UP, and fromRawBits, as walk's
       Float$isNaN, Float$RawBits, Float$Narrow, Float$AddUpNoNaN and Float$FromRawBits. */
    public static boolean doubleIsNaN(double a) {
        return Double.isNaN(a);
    }

    public static long doubleRawBits(double a) {
        return Double.doubleToRawLongBits(a);
    }

    public static float doubleToFloat(double a) {
        return (float) a;
    }

    public static double doubleAddUpNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.addUpNoNaN(a, b);
    }

    public static double doubleFromRawBits(long a) {
        return Double.longBitsToDouble(a);
    }

''')
    for g, h in [('Float$isNaN', 'simpleDoubleArith.doubleIsNaN'), ('Float$RawBits', 'simpleDoubleArith.doubleRawBits'),
                 ('Float$Narrow', 'simpleDoubleArith.doubleToFloat'), ('Float$AddUpNoNaN', 'simpleDoubleArith.doubleAddUpNoNaN')]:
        bind(FB, g, h)
    bind(FL, 'Float$FromRawBits', 'simpleDoubleArith.doubleFromRawBits')

def sample_P():
    open(os.path.join(T, NH + 'simpleFloatArith.java'), 'w').write('''/*******************************************************************************
 The planner's sample of climb batch 25's rung P: RR32's +, < and asString over a Java float, as walk's RR32$Add,
 RR32$Less and RR32$ToString compute them.
 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

public class simpleFloatArith {

    public static float floatAdd(float a, float b) {
        return a + b;
    }

    public static boolean floatLT(float a, float b) {
        return a < b;
    }

    public static String floatToString(float a) {
        return java.lang.Float.toString(a);
    }
}
''')
    for g, h in [('RR32$Add', 'simpleFloatArith.floatAdd'), ('RR32$Less', 'simpleFloatArith.floatLT')]:
        bind(FB, g, h)
    p = os.path.join(T, FB); L = open(p).read().split('\n')
    hits = [i for i, l in enumerate(L) if '"' + G + 'RR32$ToString"' in l]
    assert len(hits) == 2, hits
    L[hits[0]] = L[hits[0]].replace('"' + G + 'RR32$ToString"', '"' + H + 'simpleFloatArith.floatToString"')
    open(p, 'w').write('\n'.join(L))

DO = {'R': rung_R, 'U': rung_U, 'A': rung_A, 'N': sample_N, 'D': sample_D, 'P': sample_P, 'asfloat-control': asfloat_control}
for w in sys.argv[2:]:
    DO[w]()
    print('applied', w)
