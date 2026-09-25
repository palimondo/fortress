/* Probe 1 of ../size-rung-probes.md: what a size's descriptor answers under each
 * way of making it.  A check, not a shadow: it modifies nothing.
 *
 *   java SizeCheck holder    the descriptor read from <n>$RTTIc.ONLY, the class
 *                            asked of the Fortress loader (stamped ahead of the
 *                            run by ../java/StampSizeRTTI.java and found on the
 *                            class path, or made by the loader under
 *                            -Dprobe.nat.sizeEmit=true, size-emit.patch)
 *   java SizeCheck factory   the descriptor from RTTIsize.of (size-factory.patch)
 *
 * Prints className(), identity and equals() of two fetches of one number,
 * runtimeSupertypeOf between equal and unequal numbers, and how many distinct
 * hashes the numbers 0 to 16 give: the descriptor's own hashCode(), and the key
 * a generic's factory dictionary files a one-argument instantiation under
 * (RttiTupleMap.Node.h, MagicNumbers.hashArray of the arguments).
 */
import java.util.HashSet;
import java.util.Set;

import com.sun.fortress.compiler.runtimeValues.RTTI;
import com.sun.fortress.compiler.runtimeValues.RTTIsize;
import com.sun.fortress.runtimeSystem.InstantiatingClassloader;
import com.sun.fortress.useful.MagicNumbers;

public class SizeCheck {
    static boolean holder;

    static RTTI size(String n) throws Exception {
        if (holder) {
            Class<?> c = Class.forName(n + "$RTTIc", true, InstantiatingClassloader.ONLY);
            return (RTTI) c.getField("ONLY").get(null);
        }
        return RTTIsize.of(n);
    }

    public static void main(String[] args) throws Exception {
        holder = args[0].equals("holder");
        RTTI a3 = size("3"), b3 = size("3"), a4 = size("4");
        System.out.println("mode " + args[0] + ", descriptor class " + a3.getClass().getName());
        if (holder)
            System.out.println("holder class 3$RTTIc defined by "
                + Class.forName("3$RTTIc", false, InstantiatingClassloader.ONLY).getClassLoader().getClass().getSimpleName());
        System.out.println("className() of 3, of 4: " + a3.className() + ", " + a4.className());
        System.out.println("two fetches of 3 are one object: " + (a3 == b3) + "; equals: " + a3.equals(b3)
                           + "; 3 equals 4: " + a3.equals(a4));
        System.out.println("3 :> 3 " + a3.runtimeSupertypeOf(b3) + ", 3 :> 4 " + a3.runtimeSupertypeOf(a4)
                           + ", 4 :> 3 " + a4.runtimeSupertypeOf(a3));
        Set<Integer> own = new HashSet<Integer>(), key = new HashSet<Integer>();
        for (int i = 0; i <= 16; i++) {
            RTTI r = size(Integer.toString(i));
            own.add(r.hashCode());
            key.add(MagicNumbers.hashArray(new Object[] { r }));
        }
        System.out.println("sizes 0..16: " + own.size() + " distinct hashCode(), "
                           + key.size() + " distinct factory-dictionary keys");
    }
}
