# Toolchain and generated sources

- JDK 25 is the current JDK. Every javac task compiles at source and target level 25 (`javaSourceVersion` in `build.xml`). JDK 21 is installed beside it. Scala 2.13.18 and ASM 9.10.1 are vendored in `ProjectFortress/third_party/`. The classfiles that the code generator writes stay at version 1.6 (`compiler.md`).
- Before you change the version of a tool, read its step in the modernization plan. TOOL is `JDK`, `Scala` or `ASM`. It prints 4 to 6 KB: `explorations/coordinator/tools/facts-extract.sh 'doc:explorations/modernization-plan.md#The ladder@TOOL'`.
- scalac runs through `scala.tools.nsc.Main`, because Scala 2.13 has no ant tasks.
- All sources compile as UTF-8.
- ASM is vendored in `ProjectFortress/third_party/asm/`. In `compiler/asmbytecodeoptimizer/`, Fortress's own `Opcodes` hides `org.objectweb.asm.Opcodes`. Write ASM's constants there fully qualified.
- In a fresh container, run `apt-get install -y openjdk-25-jdk-headless ant`. `explorations/experiment/setup.sh` does the whole setup: the packages, LaTeX for the specification among them, the build and the transcript backup (the `cloud-container` skill).
- The generated sources are committed. `ProjectFortress/astgen/Fortress.ast` generates `nodes/` (over 1,000 files), `scala_src/nodes/FortressAst.scala` and `Library/FortressAst.fss` and `.fsi`. The Rats! grammars generate the parsers. Edit the input, never the output.
- The template parser, `parser/templateparser/`, has its own copy of each module of the main grammar, and `Gaps.rats` besides. If you change a rule in `parser/*.rats`, make the matching change in its copy. No gated test declares a grammar, so the suites hardly check the copy.
- Juxtaposition and operator precedence are not in the grammar. `parser_util/precedence_resolver/` resolves them, with the generated `Operators.java`.
- If a build changes generated sources, investigate it as a regression. Do not revert it as noise.
- If scalac reports arity errors in `S*Pattern` nodes, the generated nodes are stale. Run `touch ProjectFortress/astgen/Fortress.ast && ant compileAll`.
