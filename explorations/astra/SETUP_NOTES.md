# Setup observations

- System package installation failed on container user/group operations.
  Switched to portable distributions without changing container permissions.
- Downloaded JDK/Ant archives and checked their publisher-provided SHA256/SHA512.
- The extracted JDK module file was truncated between workspace commands.
  An initial Ant invocation failed before reading the build. That failure is
  retained in the first `*-build` evidence directory.
- Re-extracted Java under `/tmp/fortress-toolchains`; javac then worked across
  separate command calls. GNU tar is used in the reproduction script.
- `ant clean compileAll` passed in 61.133 seconds, with unchanged historical
  Fortress sources and build configuration.
- First attempted smoke command used the nonexistent `interpret` subcommand.
  It printed help and exited zero. Kept that output; corrected the invocation
  to `walk` after inspecting CLI usage/source. A zero exit alone is insufficient
  evidence that a Fortress program executed.

- The first actual interpreter run rejected `6 * 7`: `Operator * is not defined`.
  Replaced the smoke expression with `40 + 2`; this check only needs to establish
  that the interpreter executes a program and prints the expected result.

- Corrected `bin/fortress walk experiment/smoke.fss` printed exactly `42`,
  exited zero, and completed in 4.332 seconds.

- `ant testFast` passed in 467.769 seconds: 47 suite summaries, 1,377 tests,
  zero failures, zero errors, zero skipped. The raw output and parsed count
  summary are retained together.

- `ant testSystem` exited zero in 129.810 seconds. Its four JUnit reports
  contain 95 + 95 + 97 + 95 = 382 tests, zero failures/errors/skips.
- The system-test combined console log is incomplete despite the successful
  process completion. The complete per-shard JUnit reports were copied into
  its evidence directory and are the source of its summary counts. The cause
  of the lost log tail is unconfirmed; it occurred during overlapping workspace
  tool calls. The recorder now writes its live output under `/tmp`, copying it
  into the evidence directory only after the command finishes.
