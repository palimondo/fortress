# Toolchain and generated sources

- JDK 25 is the current JDK. Every javac task compiles at source and target level 25 (`javaSourceVersion` in `build.xml`). JDK 21 is installed beside it. `explorations/modernization-plan.md` gives the versions and the classfile level.
- scalac runs through `scala.tools.nsc.Main`, because Scala 2.13 has no ant tasks.
- All sources compile as UTF-8.
- ASM is vendored in `ProjectFortress/third_party/asm/`. In `compiler/asmbytecodeoptimizer/`, Fortress's own `Opcodes` hides `org.objectweb.asm.Opcodes`. Write ASM's constants there fully qualified.
- In a fresh container, run `apt-get install -y openjdk-25-jdk-headless ant`. `explorations/experiment/setup.sh` does the whole setup: the packages, LaTeX for the specification among them, the build and the transcript backup (the `cloud-container` skill).
- The generated sources are committed. `ProjectFortress/astgen/Fortress.ast` generates `nodes/` (over 1,000 files), `scala_src/nodes/FortressAst.scala` and `Library/FortressAst.fss` and `.fsi`. The Rats! grammars generate the parsers. Edit the input, never the output.
- If a build changes generated sources, investigate it as a regression. Do not revert it as noise.
- If scalac reports arity errors in `S*Pattern` nodes, the generated nodes are stale. Run `touch ProjectFortress/astgen/Fortress.ast && ant compileAll`.
