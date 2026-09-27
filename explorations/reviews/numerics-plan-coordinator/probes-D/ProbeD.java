// measure-D's driver for small programs: explorations/reviews/sum-replacement-judgement/CheckDriver.java
// (the checker-count tool's WorldFlip, the interpreter's library in scope, typecheckPhaseOrder) with
// DistanceMulti.java's -setting switch (switch-over-distance-flat/DistanceMulti.java:41-46):
//   walk     extends-Object pre-desugaring off, compiled-expression desugaring off (CheckDriver's own)
//   any      extends-Object off, compiled-expression desugaring on (batch 7 Q1 (a))
//   compile  both on (the compile path's)
// Compiled together with the fill worker's shadow StaticChecker so -Dprobe.dropApiErrors keeps the
// library api's own errors out of the probe's.
// Usage: java -Dprobe.dropApiErrors=1 -cp <classes>:<fortress cp> ProbeD -setting walk|any|compile <file.fss>
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.*;

public class ProbeD {
    public static void main(String[] args) throws Throwable {
        List<String> a = new ArrayList<String>(Arrays.asList(args));
        String setting = "walk";
        if (a.size() >= 2 && a.get(0).equals("-setting")) { setting = a.get(1); a = a.subList(2, a.size()); }
        if (!setting.equals("walk") && !setting.equals("compile") && !setting.equals("any"))
            throw new RuntimeException("unknown -setting " + setting);
        Shell.useInterpreterLibraries();
        Shell.setExtendsObjectPreDesugaring(setting.equals("compile"));
        Shell.setCompiledExprDesugaring(!setting.equals("walk"));
        Shell.setTypeChecking(true);
        Shell.setScala(true);
        Shell.setPhaseOrder(PhaseOrder.typecheckPhaseOrder);
        System.out.println("### ProbeD setting=" + setting + " (extendsObject=" + Shell.getExtendsObjectPreDesugaring()
                           + " compiledExpr=" + Shell.getCompiledExprDesugaring() + ") target=" + a);
        int rc = Shell.compilerPhases(a, Option.<String>none(), "compile");
        System.out.println("### rc=" + rc);
        System.exit(rc);
    }
}
