// measure-D: the compiler's type checker (fortress typecheck: the compiler's own library,
// PhaseOrder.typecheckPhaseOrder, Shell.java:453-457) over a list of compiler_tests files in ONE JVM
// with one private cache, as the gate's CompilerJUTest runs them in one JVM. Each file is marked on
// stderr, where Shell prints its diagnostics, and any Throwable is caught and printed per file.
// Usage: java -Dfortress.caches=<dir> -cp <shadow>:<drv>:<cp> TestsD <file.fss>...   (run in compiler_tests/)
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.*;

public class TestsD {
    public static void main(String[] args) throws Throwable {
        Shell.useCompilerLibraries();
        Shell.setTypeChecking(true);
        Shell.setPhaseOrder(PhaseOrder.typecheckPhaseOrder);
        long all = System.currentTimeMillis();
        for (String f : args) {
            System.err.println("=== " + f); System.err.flush();
            long t = System.currentTimeMillis();
            int rc;
            try {
                rc = Shell.compilerPhases(Collections.singletonList(f), Option.<String>none(), "typecheck");
            } catch (Throwable e) {
                System.err.println("### THROWN " + e.getClass().getName() + ": " + String.valueOf(e.getMessage()).split("\n")[0]);
                rc = 99;
            }
            System.err.println("### rc=" + rc + " " + f + " ms=" + (System.currentTimeMillis() - t)); System.err.flush();
        }
        System.err.println("### all ms=" + (System.currentTimeMillis() - all));
        System.exit(0);
    }
}
