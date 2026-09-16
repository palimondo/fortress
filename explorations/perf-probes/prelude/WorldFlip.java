// Probe driver: run the BYTECODE-COMPILER phase order (disambiguate, typecheck,
// desugar, overload-rewrite, codegen) with the INTERPRETER's prelude in scope
// (FortressLibrary / FortressBuiltin / AnyType) instead of the compiler's
// (CompilerLibrary / CompilerBuiltin / AnyType).
//
// This is exactly Pavol's proposal -- "use FortressLibrary for the compiler as
// well" -- expressed without editing a tracked file: Shell.useInterpreterLibraries()
// and Shell.setPhaseOrder() are both public, so the same switch WellKnownNames
// flips per subcommand can be flipped here.
//
// Usage:  java -cp <fortress classpath>:. WorldFlip [-stop <phase>] <file.fss|.fsi>
//   -stop disambiguate | typecheck | desugar   selects a truncated phase order,
//   so we can see which phase each error batch comes from; default = full
//   compilerPhaseOrder (through CODEGEN).
import com.sun.fortress.Shell;
import com.sun.fortress.compiler.phases.PhaseOrder;
import edu.rice.cs.plt.tuple.Option;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class WorldFlip {
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
                           + "  phases=" + stop + "  target=" + a);
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
