(* PROBE-ONLY SHIM.  `.` is first on fortress.source.path, so running the
   compiler from THIS directory shadows Library/FortressLibrary.fsi with this
   near-empty api.  Its only purpose is to measure how much of the 1342
   disambiguation errors of 06-compile-stub.out is the two preludes colliding
   (the red herring of perf-probes/prelude/REPORT.md §1) and how much is a name
   the compiler's prelude genuinely does not have.

   It declares nothing but `ExtentRange`, which FortressAst.fsi:6 names in its
   `import FortressLibrary.{...} except ExtentRange`. *)
api FortressLibrary

trait ExtentRange extends Object end

end
