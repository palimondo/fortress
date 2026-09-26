// Probe driver for switch-over-distance.md: run the compile path's phases over one
// component of the interpreter's library, with the interpreter's prelude in scope
// (FortressLibrary / FortressBuiltin / AnyType), under either desugaring setting.
//
// Built only from public Shell entry points, as the checker-count stage's WorldFlip.java
// and desugar-codegen/PhaseProbe.java are; no tracked file is modified.  The switches
// that make the checker run every stage and every declaration are -D properties read by
// the shadow classes of make-shadows.sh (probe.tolerant, probe.all, probe.skipOverloads).
//
// Usage: java -cp <shadow-classes>:<classes>:<fortress classpath> Distance
//             [-order check|full] [-setting walk|compile] [-compilerlib] <file.fss|.fsi>
//   -order check    the compiler's own order truncated after TYPECHECK
//                   (PREDISAMBIGUATEDESUGAR .. INTEGERLITERALFOLDING, TYPECHECK);
//                   the checker-count stage runs the whole compilerPhaseOrder, whose
//                   checker results are the same since TYPECHECK throws first
//   -order full     PhaseOrder.compilerPhaseOrder, through CODEGEN
//   -setting walk   Shell.useInterpreterLibraries() as it is: extends-Object
//                   pre-desugaring off, compiled-expression desugaring off
//                   (Shell.java:379-386) -- the setting the checker-count stage runs
//   -setting compile  the same prelude, with the two switches the compile path has
//                   put back: extends-Object pre-desugaring on (Shell.useCompilerLibraries,
//                   Shell.java:371-377) and compiled-expression desugaring on (its
//                   default, Shell.java:1285, which useInterpreterLibraries turns off)
//   -compilerlib    the compiler's own prelude instead (control)
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Distance {
    public static void main(String[] args) throws Throwable {
        List<String> a = new ArrayList<String>(Arrays.asList(args));
        String order = "check", setting = "walk";
        boolean compilerWorld = false;
        while (!a.isEmpty() && a.get(0).startsWith("-")) {
            String f = a.remove(0);
            if (f.equals("-order")) order = a.remove(0);
            else if (f.equals("-setting")) setting = a.remove(0);
            else if (f.equals("-compilerlib")) compilerWorld = true;
            else throw new RuntimeException("unknown flag " + f);
        }
        PhaseOrder[] ord;
        if (order.equals("full")) ord = PhaseOrder.compilerPhaseOrder;
        else if (order.equals("check")) ord = new PhaseOrder[] {
                PhaseOrder.PREDISAMBIGUATEDESUGAR, PhaseOrder.DISAMBIGUATE, PhaseOrder.GRAMMAR,
                PhaseOrder.PRETYPECHECKDESUGAR, PhaseOrder.INTEGERLITERALFOLDING, PhaseOrder.TYPECHECK };
        else throw new RuntimeException("unknown -order " + order);
        if (!setting.equals("walk") && !setting.equals("compile"))
            throw new RuntimeException("unknown -setting " + setting);

        if (compilerWorld) Shell.useCompilerLibraries();
        else Shell.useInterpreterLibraries();
        if (setting.equals("compile")) {
            Shell.setExtendsObjectPreDesugaring(true);
            Shell.setCompiledExprDesugaring(true);
        } else {
            Shell.setExtendsObjectPreDesugaring(false);
            Shell.setCompiledExprDesugaring(false);
        }
        Shell.setTypeChecking(true);
        Shell.setScala(true);
        Shell.setPhaseOrder(ord);
        StringBuilder sb = new StringBuilder();
        for (PhaseOrder p : ord) sb.append(p.name()).append(' ');
        System.out.println("### order=" + order + " phases=[ " + sb + "] setting=" + setting
                           + " (extendsObject=" + Shell.getExtendsObjectPreDesugaring()
                           + " compiledExpr=" + Shell.getCompiledExprDesugaring() + ")"
                           + " prelude=" + (compilerWorld ? "COMPILER" : "INTERPRETER")
                           + " target=" + a
                           + " overloadCache=" + System.getProperty("fortress.analyzer.overload.cache", "default(true)"));
        int rc = Shell.compilerPhases(a, Option.<String>none(), "compile");
        System.out.println("### rc=" + rc);
        System.exit(rc);
    }
}
