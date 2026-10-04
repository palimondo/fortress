# Toolchain and generated sources

Read this when the build itself fails or behaves oddly, when changing JDKs or the build file, or before editing anything generated.

- scalac runs through `scala.tools.nsc.Main`, since Scala 2.13 has no ant tasks. ASM is vendored in `ProjectFortress/third_party/asm/`, and Fortress's own `asmbytecodeoptimizer.Opcodes` shadows `org.objectweb.asm.Opcodes` in that package. Sources compile as UTF-8.
- Every javac task pins `target=` to the source version, because ASM 3.1 reads the class of every `import java` and cannot read newer classfiles. Fortress's emitted classfiles stay at version 1.6, because the load-time rewriting keeps no stack-map frames: do not raise it.
- JDK 25 is current (`env.sh` sets `JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64`; 21 is installed beside it); 8, 11, 17 and 21 also build and pass the gate. Versions and the classfile level: `explorations/modernization-plan.md`.
- Generated sources are committed. `ProjectFortress/astgen/Fortress.ast` generates `nodes/` (over 1,000 files), `scala_src/nodes/FortressAst.scala` and `Library/FortressAst.fss`/`.fsi`; the Rats! grammars generate the parsers. Edit the input, never the output. Churn in generated sources after a build is a regression to investigate, never noise to revert. scalac arity errors in `S*Pattern` nodes mean the generated nodes are stale: `touch ProjectFortress/astgen/Fortress.ast && ant compileAll`.

