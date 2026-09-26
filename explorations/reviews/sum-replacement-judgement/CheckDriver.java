// Probe driver for sum-replacement-judgement: the checker-count tool's WorldFlip
// (explorations/coordinator/tools/checker-count/WorldFlip.java, the bytecode compiler's
// phase order with the interpreter's prelude in scope) with its -stop switch, compiled
// together with the fill worker's shadow StaticChecker so that -Dprobe.dropApiErrors lets
// the pipeline go on to the probe component after the library api's own errors.
// Usage: java -Dprobe.dropApiErrors=1 -cp <classes>:<fortress classpath> CheckDriver [-stop <phase>] <file.fss>
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class CheckDriver {
    public static void main(String[] args) throws Throwable {
        List<String> a = new ArrayList<String>(Arrays.asList(args));
        PhaseOrder[] order = PhaseOrder.compilerPhaseOrder;
        String stop = "codegen";
        if (a.size() >= 2 && a.get(0).equals("-stop")) {
            stop = a.get(1);
            a = a.subList(2, a.size());
            if (stop.equals("disambiguate"))      order = PhaseOrder.disambiguatePhaseOrder;
            else if (stop.equals("typecheck"))    order = PhaseOrder.typecheckPhaseOrder;
            else if (stop.equals("desugar"))      order = PhaseOrder.desugarPhaseOrder;
            else throw new RuntimeException("unknown -stop " + stop);
        }
        System.out.println("### world=INTERPRETER-LIBRARIES (FortressLibrary/FortressBuiltin/AnyType)"
                           + "  phases=" + stop + "  target=" + a
                           + "  dropApiErrors=" + (System.getProperty("probe.dropApiErrors") != null));
        Shell.useInterpreterLibraries();
        Shell.setTypeChecking(true);
        Shell.setScala(true);
        if (stop.equals("desugar")) Shell.setObjExprDesugaring(true);
        Shell.setPhaseOrder(order);
        int rc = Shell.compilerPhases(a, Option.<String>none(), "compile");
        System.out.println("### rc=" + rc);
        System.exit(rc);
    }
}
