# Toolchain and generated sources

The build needs JDK 25: every javac task compiles at level 25 (`javaSourceVersion` in `build.xml`). The container's profile sets `JAVA_HOME` to JDK 21, under which the build stops: `invalid target release: 25`. The setup lines in `build-and-caches.md` set JDK 25, and say how to install it.

Scala 2.13.18 and ASM 9.10.1 are vendored in `ProjectFortress/third_party/`. scalac runs through `scala.tools.nsc.Main`, because Scala 2.13 has no ant tasks. All sources compile as UTF-8.

- In `compiler/asmbytecodeoptimizer/`, Fortress's own `Opcodes` hides `org.objectweb.asm.Opcodes`. Write ASM's constants there fully qualified.
- Before you change the version of a tool, read its step in the modernization plan. TOOL is `JDK`, `Scala` or `ASM`. It prints 4 to 7 KB: `explorations/coordinator/tools/facts-extract.sh 'doc:explorations/modernization-plan.md#The ladder@TOOL'`.

## Generated sources

These generated sources are committed:

- `ProjectFortress/astgen/Fortress.ast` generates `nodes/`, `scala_src/nodes/FortressAst.scala`, and `Library/FortressAst.fss` and `.fsi`.
- The parser grammars generate the parsers.
- `parser_util/precedence_resolver/operators.txt` generates `Operators.java`. Juxtaposition and operator precedence are resolved there, outside the parser grammars.

The template parser, `parser/templateparser/`, is part of each parser made for a DSL grammar (`build-and-caches.md`). Its grammar copies each module of `parser/*.rats`, and adds `Gaps.rats`.

- Edit the input, never the output.
- If you change a rule in `parser/*.rats`, make the matching change in its copy. The suites check the copy on one program only (`tests-running.md`).
- If a build changes a generated source whose input you did not edit, investigate it as a regression. Do not revert it as noise.
- If scalac reports arity errors in `S*Pattern` nodes, the generated nodes are stale. Run `touch ProjectFortress/astgen/Fortress.ast && ant compileAll`.
