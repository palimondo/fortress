// Probe driver for switch-over-distance-flat.md: Distance.java's run (../switch-over-distance/),
// repeated over several components in ONE JVM, one private cache, so that the whole distance
// is one command.  The candidate for the report-only distance stage of phase 3's gates.
//
// The first target is checked with every api stage (-Dprobe.all), as Distance's run over
// FortressLibrary.fss is; before each later target the driver sets probe.componentOnly, so
// that the apis are not checked with every stage again, as run-all.sh's separate runs do.
// Each target's start and elapsed seconds are printed (### target, ### done).
//
// Usage: java -cp <shadow-classes>:<classes>:<fortress classpath> DistanceMulti
//             [-order check|full] [-setting walk|compile|any] <file.fss>...
//   -setting walk, compile   as Distance.java
//   -setting any    extends-Object pre-desugaring off (walk's), compiled-expression desugaring
//                   on (the compile path's): the compiled path with the implicit bound Any,
//                   the setting the switch-over would take under answer (a) of
//                   coordinator/CLIMB-BATCH-7.md, Q1
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class DistanceMulti {
    public static void main(String[] args) throws Throwable {
        List<String> a = new ArrayList<String>(Arrays.asList(args));
        String order = "check", setting = "walk";
        while (!a.isEmpty() && a.get(0).startsWith("-")) {
            String f = a.remove(0);
            if (f.equals("-order")) order = a.remove(0);
            else if (f.equals("-setting")) setting = a.remove(0);
            else throw new RuntimeException("unknown flag " + f);
        }
        PhaseOrder[] ord;
        if (order.equals("full")) ord = PhaseOrder.compilerPhaseOrder;
        else if (order.equals("check")) ord = new PhaseOrder[] {
                PhaseOrder.PREDISAMBIGUATEDESUGAR, PhaseOrder.DISAMBIGUATE, PhaseOrder.GRAMMAR,
                PhaseOrder.PRETYPECHECKDESUGAR, PhaseOrder.INTEGERLITERALFOLDING, PhaseOrder.TYPECHECK };
        else throw new RuntimeException("unknown -order " + order);
        if (!setting.equals("walk") && !setting.equals("compile") && !setting.equals("any"))
            throw new RuntimeException("unknown -setting " + setting);

        Shell.useInterpreterLibraries();
        Shell.setExtendsObjectPreDesugaring(setting.equals("compile"));
        Shell.setCompiledExprDesugaring(!setting.equals("walk"));
        Shell.setTypeChecking(true);
        Shell.setScala(true);
        Shell.setPhaseOrder(ord);
        System.out.println("### order=" + order + " setting=" + setting
                           + " (extendsObject=" + Shell.getExtendsObjectPreDesugaring()
                           + " compiledExpr=" + Shell.getCompiledExprDesugaring() + ")"
                           + " prelude=INTERPRETER targets=" + a
                           + " overloadCache=" + System.getProperty("fortress.analyzer.overload.cache", "default(true)"));
        int worst = 0;
        long t0 = System.nanoTime();
        for (int i = 0; i < a.size(); i++) {
            if (i > 0) System.setProperty("probe.componentOnly", "true");
            String f = a.get(i);
            long s = System.nanoTime();
            System.out.println("### target " + f + " componentOnly=" + Boolean.getBoolean("probe.componentOnly"));
            int rc;
            try {
                rc = Shell.compilerPhases(Collections.singletonList(f), Option.<String>none(), "compile");
            } catch (Throwable t) {
                System.out.println("### target-crash " + f + " " + t);
                rc = 99;
            }
            worst = Math.max(worst, rc);
            System.out.println("### done " + f + " rc=" + rc + " seconds=" + (System.nanoTime() - s) / 1000000000L);
        }
        System.out.println("### all seconds=" + (System.nanoTime() - t0) / 1000000000L + " rc=" + worst);
        System.exit(worst);
    }
}
