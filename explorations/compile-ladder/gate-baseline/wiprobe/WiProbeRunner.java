import com.sun.fortress.tests.unit_tests.FileTests;

public class WiProbeRunner {
    public static void main(String[] a) throws Exception {
        junit.textui.TestRunner.run(FileTests.compilerSuite(a[0], true, false, false));
    }
}
