// Probe driver for fill-overloads-ways.md: run the bytecode compiler's phase order
// with the interpreter's prelude in scope (the checker-count stage's switch, copied
// from explorations/coordinator/tools/checker-count/WorldFlip.java), with one extra
// knob:
//
//   -objectBound   after Shell.useInterpreterLibraries(), turn back on the desugaring
//                  that gives every static parameter without an extends clause the
//                  bound Object (Shell.setExtendsObjectPreDesugaring, Shell.java:324;
//                  the compiler world turns it on at Shell.java:372, the interpreter
//                  world turns it off at Shell.java:380).
//
// Usage:  java -cp <classes>:<fortress classpath> WorldFlipFill [-objectBound] <file.fss>
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class WorldFlipFill {
    public static void main(String[] args) throws Throwable {
        List<String> a = new ArrayList<String>(Arrays.asList(args));
        boolean objectBound = false;
        if (!a.isEmpty() && a.get(0).equals("-objectBound")) { objectBound = true; a = a.subList(1, a.size()); }
        System.out.println("### world=INTERPRETER-LIBRARIES objectBound=" + objectBound + " target=" + a);
        Shell.useInterpreterLibraries();
        if (objectBound) Shell.setExtendsObjectPreDesugaring(true);
        Shell.setTypeChecking(true);
        Shell.setScala(true);
        Shell.setPhaseOrder(PhaseOrder.compilerPhaseOrder);
        int rc = Shell.compilerPhases(a, Option.<String>none(), "compile");
        System.out.println("### rc=" + rc);
        System.exit(rc);
    }
}
