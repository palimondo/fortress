package com.sun.fortress.tests.unit_tests;

import com.sun.fortress.Shell;
import com.sun.fortress.compiler.WellKnownNames;
import com.sun.fortress.repository.ProjectProperties;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import java.io.IOException;

/**
 * The .test files of ProjectFortress/one_library_tests, compiled and run against the one
 * library: under FORTRESS_LIBRARY=one, as ant testOneLibrary runs them.  Without the
 * selection the suite is one failing test that says so.
 */
public class OneLibraryJUTest {
    public static void main(String[] args) throws IOException {
        junit.textui.TestRunner.run(suite());
    }

    public static Test suite() throws IOException {
        if (!WellKnownNames.compiledPathUsesOneLibrary) {
            TestSuite unselected = new TestSuite("ProjectFortress/one_library_tests without the one library's selection");
            unselected.addTest(new TestCase("oneLibrarySelected") {
                @Override
                protected void runTest() {
                    fail("one_library_tests runs only where FORTRESS_LIBRARY=one selects the one library, as ant testOneLibrary does");
                }
            });
            return unselected;
        }
        // Make sure there are no compiled files from earlier tests lurking in the
        // repository, unless the harness has already emptied the caches for the run.
        if (ProjectProperties.getBoolean("fortress.junit.reset", true)) {
            Shell.resetRepository();
        }

        String testDir = ProjectProperties.BASEDIR + "one_library_tests";
        boolean failsOnly = !ProjectProperties.getBoolean("fortress.junit.verbose", false);
        TestSuite suite = new TestSuite(
                "Test all .test files in 'ProjectFortress/one_library_tests' against the one library");
        suite.addTest(FileTests.compilerSuite(testDir, true, failsOnly, false));
        return suite;
    }
}
