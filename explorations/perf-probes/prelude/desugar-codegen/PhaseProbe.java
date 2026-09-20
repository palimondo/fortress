// Probe driver: run the compile path's later phases (DESUGAR, OVERLOADREWRITE,
// CODEGEN) on the INTERPRETER's library.  Two ways past the checker's crash on
// `nat`-kinded static parameters:
//   (1) leave TYPECHECK out of the phase order  (-order nocheck-*)
//   (2) keep it in and catch its failures per declaration  (-order full, with
//       -Dprobe.tolerant=true and the shadow classes of make-shadows.sh)
//
// Built only from public Shell entry points, exactly as ../WorldFlip.java is;
// no tracked file is modified.
//
// Usage: java -cp <shadow-classes>:<fortress classpath>:. PhaseProbe [flags] <file.fss|.fsi>
//   -order <name>     the phase order, below
//   -compilerlib      the compiler's prelude instead of the interpreter's (control)
//   -interpdesugar    the interpreter's desugaring settings instead of the
//                     compile path's (default: the compile path's)
//
// Phase orders:
//   full        compilerPhaseOrder, unchanged (TYPECHECK in)   -- reference
//   nocheck-pretc   through PRETYPECHECKDESUGAR, no TYPECHECK
//   nocheck-intlit  through INTEGERLITERALFOLDING, no TYPECHECK
//   nocheck-desugar through DESUGAR,              no TYPECHECK
//   nocheck-ovld    through OVERLOADREWRITE,      no TYPECHECK
//   nocheck-codegen through CODEGEN,              no TYPECHECK
//   typecheck       the compile path's typecheckPhaseOrder, for error counts
//   check-codegen   the full compiler order (TYPECHECK in) -- same as full
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class PhaseProbe {

    static PhaseOrder[] order(String name) {
        PhaseOrder P = PhaseOrder.PREDISAMBIGUATEDESUGAR;
        PhaseOrder D = PhaseOrder.DISAMBIGUATE;
        PhaseOrder G = PhaseOrder.GRAMMAR;
        PhaseOrder T = PhaseOrder.PRETYPECHECKDESUGAR;
        PhaseOrder I = PhaseOrder.INTEGERLITERALFOLDING;
        PhaseOrder C = PhaseOrder.TYPECHECK;
        PhaseOrder S = PhaseOrder.DESUGAR;
        PhaseOrder O = PhaseOrder.OVERLOADREWRITE;
        PhaseOrder Z = PhaseOrder.CODEGEN;
        if (name.equals("full") || name.equals("check-codegen"))
            return PhaseOrder.compilerPhaseOrder;
        if (name.equals("typecheck"))       return PhaseOrder.typecheckPhaseOrder;
        if (name.equals("nocheck-pretc"))   return new PhaseOrder[] {P,D,G,T};
        if (name.equals("nocheck-intlit"))  return new PhaseOrder[] {P,D,G,T,I};
        if (name.equals("nocheck-desugar")) return new PhaseOrder[] {P,D,G,T,I,S};
        if (name.equals("nocheck-ovld"))    return new PhaseOrder[] {P,D,G,T,I,S,O};
        if (name.equals("nocheck-codegen")) return new PhaseOrder[] {P,D,G,T,I,S,O,Z};
        throw new RuntimeException("unknown -order " + name);
    }

    public static void main(String[] args) throws Throwable {
        List<String> a = new ArrayList<String>(Arrays.asList(args));
        String name = "nocheck-codegen";
        // The compile path's desugaring settings, which useInterpreterLibraries()
        // turns off: extends-Object pre-desugaring, and the "compiled expression"
        // desugarings (typecase, case, type ascription, abstract marking).
        // -interpdesugar keeps the interpreter's settings instead, as a control.
        boolean compilerDesugar = true;
        // -compilerlib runs the compiler's own prelude instead, as a control.
        boolean compilerWorld = false;
        while (!a.isEmpty() && a.get(0).startsWith("-")) {
            if (a.get(0).equals("-order")) { name = a.get(1); a = a.subList(2, a.size()); }
            else if (a.get(0).equals("-interpdesugar")) { compilerDesugar = false; a = a.subList(1, a.size()); }
            else if (a.get(0).equals("-compilerdesugar")) { compilerDesugar = true; a = a.subList(1, a.size()); }
            else if (a.get(0).equals("-compilerlib")) { compilerWorld = true; a = a.subList(1, a.size()); }
            else break;
        }
        PhaseOrder[] ord = order(name);
        StringBuilder sb = new StringBuilder();
        for (PhaseOrder p : ord) sb.append(p.name()).append(" ");
        System.out.println("### order=" + name
                           + "  phases=[ " + sb + "]  target=" + a);
        System.out.println("### desugaring=" + (compilerDesugar ? "COMPILE-PATH" : "INTERPRETER")
                           + "  prelude=" + (compilerWorld ? "COMPILER" : "INTERPRETER"));
        if (compilerWorld) Shell.useCompilerLibraries();
        else Shell.useInterpreterLibraries();
        if (compilerDesugar) {
            Shell.setExtendsObjectPreDesugaring(true);
            Shell.setCompiledExprDesugaring(true);
        }
        Shell.setTypeChecking(true);   // inert when TYPECHECK is not in the order
        Shell.setScala(true);
        Shell.setPhaseOrder(ord);
        int rc = Shell.compilerPhases(a, Option.<String>none(), "compile");
        System.out.println("### rc=" + rc);
        System.exit(rc);
    }
}
