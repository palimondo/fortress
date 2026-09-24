// Pre-edit: javac the abdfbb2db copies of simpleIntArith.java/simpleLongArith.java into a directory D against ProjectFortress/build, then
// java -cp .:D:ProjectFortress/build:default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar SkNatives ; post-edit: the same without D.
import com.sun.fortress.nativeHelpers.simpleIntArith;
import com.sun.fortress.nativeHelpers.simpleLongArith;
import java.util.function.LongSupplier;
public class SkNatives {
  static void p(String label, LongSupplier f) {
    String r;
    try { r = Long.toString(f.getAsLong()); }
    catch (Throwable t) { r = "THROWS " + t.getClass().getSimpleName() + (t.getMessage()==null?"":" " + t.getMessage()); }
    System.out.println(label + " = " + r);
  }
  public static void main(String[] a) {
    long M = Long.MIN_VALUE; int m = Integer.MIN_VALUE;
    p("intSaturatingAbs(0)", () -> simpleIntArith.intSaturatingAbs(0));
    p("intSaturatingDiv(0,-1)", () -> simpleIntArith.intSaturatingDiv(0,-1));
    p("intSaturatingNeg(0)", () -> simpleIntArith.intSaturatingNeg(0));
    p("intSaturatingAbs(MIN)", () -> simpleIntArith.intSaturatingAbs(m));
    p("intSaturatingDiv(MIN,-1)", () -> simpleIntArith.intSaturatingDiv(m,-1));
    p("longSaturatingAbs(0)", () -> simpleLongArith.longSaturatingAbs(0));
    p("longSaturatingDiv(0,-1)", () -> simpleLongArith.longSaturatingDiv(0,-1));
    p("longSaturatingNeg(0)", () -> simpleLongArith.longSaturatingNeg(0));
    p("longSaturatingAbs(MIN)", () -> simpleLongArith.longSaturatingAbs(M));
    p("longSaturatingDiv(MIN,-1)", () -> simpleLongArith.longSaturatingDiv(M,-1));
    p("longOverflowingMul(0,5)", () -> simpleLongArith.longOverflowingMul(0,5));
    p("longOverflowingMul(-2^32,2^31)", () -> simpleLongArith.longOverflowingMul(-(1L<<32), 1L<<31));
    p("longOverflowingMul(2^31,-2^32)", () -> simpleLongArith.longOverflowingMul(1L<<31, -(1L<<32)));
    p("longOverflowingMul(MIN,1)", () -> simpleLongArith.longOverflowingMul(M,1));
    p("longOverflowingMul(1,MIN)", () -> simpleLongArith.longOverflowingMul(1,M));
    p("longOverflowingMul(MIN,-1)", () -> simpleLongArith.longOverflowingMul(M,-1));
    p("longOverflowingMul(3037000500,3037000500)", () -> simpleLongArith.longOverflowingMul(3037000500L,3037000500L));
    p("longSaturatingMul(0,5)", () -> simpleLongArith.longSaturatingMul(0,5));
    p("longSaturatingMul(-2^32,2^31)", () -> simpleLongArith.longSaturatingMul(-(1L<<32), 1L<<31));
    p("longSaturatingMul(MIN,MIN)", () -> simpleLongArith.longSaturatingMul(M,M));
    p("longSaturatingMul(MAX,-2)", () -> simpleLongArith.longSaturatingMul(Long.MAX_VALUE,-2));
    p("longSaturatingMul(-1,MIN)", () -> simpleLongArith.longSaturatingMul(-1,M));
  }
}
