# Toolchain and generated sources

Read this part if the build fails or behaves oddly, before you change the JDK or the build file, and before you edit anything generated.

- scalac runs through `scala.tools.nsc.Main`, because Scala 2.13 has no ant tasks.
- ASM is vendored in `ProjectFortress/third_party/asm/`. In that package, Fortress's own `asmbytecodeoptimizer.Opcodes` hides `org.objectweb.asm.Opcodes`.
- All sources compile as UTF-8.
- Every javac task sets `target=` to the source version. The reason: ASM 3.1 reads the class of every `import java`, and it cannot read newer classfiles.
- Fortress writes its classfiles at version 1.6, because the rewriting at load time keeps no stack-map frames. Do not raise this version.
- In a fresh container, run `apt-get install -y openjdk-25-jdk-headless ant`. `explorations/experiment/setup.sh` does the whole setup of a fresh container: the packages (LaTeX for the specification among them), the build, and the transcript backup. The transcript backup is the hook that copies every session's transcripts to an orphan branch and pushes it (the `cloud-container` skill).
- JDK 25 is the current JDK (`JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64`). JDK 21 is installed beside it. JDKs 8, 11, 17 and 21 also build the tree and pass the gate. Versions and the classfile level: `explorations/modernization-plan.md`.
- The generated sources are committed. `ProjectFortress/astgen/Fortress.ast` generates `nodes/` (over 1,000 files), `scala_src/nodes/FortressAst.scala` and `Library/FortressAst.fss` and `.fsi`. The Rats! grammars generate the parsers. Edit the input, never the output.
- If a build changes generated sources, investigate it as a regression. Do not revert it as noise.
- If scalac reports arity errors in `S*Pattern` nodes, the generated nodes are stale. Run `touch ProjectFortress/astgen/Fortress.ast && ant compileAll`.
