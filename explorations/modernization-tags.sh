#!/bin/sh
# Create and push the modernization/* tags on the final (post-C2) clean-ladder
# history. Run on Pavol's machine after `git fetch origin clean-ladder`.
# Approved in explorations/c2-proposal.md (revision 3); parked here because
# tag pushes go from Pavol's machine.
set -e

git fetch origin clean-ladder

git tag -a modernization/jdk8-baseline 002e997b8420bad3aa99a3c46443ae75fa63eeed -m "The revived 2012 trunk, fully green on JDK 8, with the parallelized test harness. Toolchain: Scala 2.10.7, ASM 3.1, vendored jsr166y. Full suite green (testFast 1,377 tests, testSystem 382, zero failures) on OpenJDK 1.8.0_492."
git tag -a modernization/scala-2.12 5c1e40047e283a08f932abc21a9a2b5d532be0ff -m "Scala 2.12.20. Minimum JDK: 8. Full suite green on JDK 8."
git tag -a modernization/jdk11 69b01f695e9590e047e8df820085582cb09b7aed -m "JDK 11, with the work-stealing runtime on java.util.concurrent. Minimum JDK: 11. Full suite green on JDK 11."
git tag -a modernization/jdk17 69b01f695e9590e047e8df820085582cb09b7aed -m "JDK 17 verification: zero changes needed — after the jsr166y retirement no JDK-version coupling remains. Minimum JDK: 11. Full suite green on JDK 17 (17.0.19)."
git tag -a modernization/jdk21 69b01f695e9590e047e8df820085582cb09b7aed -m "JDK 21 verification, zero changes needed (see modernization/jdk17). Minimum JDK: 11. Full suite green on JDK 21 (21.0.10)."
git tag -a modernization/asm-9 2de75c02a1e9633405611b74070222a60baceed2 -m "ASM 9.10.1. Minimum JDK: 11. Full suite green on JDK 21."
git tag -a modernization/scala-2.13 c4a10003d7ff46bbfc8006e696d314ee82041a2a -m "Scala 2.13.18. Minimum JDK: 11. Full suite green on JDK 21; verified again on JDK 25 (25.0.3) with zero changes."
git tag -a modernization/jdk25 8332bd34faad28cac7231c4eb261827b6ce7d9f9 -m "javac -source/-target 25. Minimum JDK: 25. Full suite green on JDK 25 (25.0.3). For an older compilation floor, check out an earlier modernization/* tag."

git push origin 'refs/tags/modernization/*'
