# Fortress revival

Fortress was an experimental programming language from Sun Labs (2003–2012).
This repository revives it: the goal is to finish the original team's design,
judged by its specification (`Specification/`) and its type research
(`Papers/`), and measured by one program, microGPT, compiled to bytecode and
running fast.

## Where your training applies, and where it does not

- Known languages: the interpreter, the code generator and the run time are
  Java (`ProjectFortress/src/com/sun/fortress/`); the static type checker is
  Scala (`.../scala_src/`); the parser grammars are Rats! (`.../parser/*.rats`);
  the syntax tree is generated from `ProjectFortress/astgen/Fortress.ast`; the
  build is Ant; the specification and the papers are LaTeX.
- Fortress itself: the library (`Library/`, `ProjectFortress/LibraryBuiltin/`),
  the tests (`ProjectFortress/tests/`, `compiler_tests/` and the other test
  folders) and every `.fss` and `.fsi` file. Fortress is not in your training
  in any depth. It looks like Scala in places, and its library's algebraic
  traits recall Haskell's numeric classes, but its rules differ (multiple
  dispatch, juxtaposition as an operator, loops parallel by default), so
  assuming it behaves like a language you know can lead you astray.

## How to work here

- Before any build, test run, edit, measurement, commit or agent launch, load
  the `fortress-repo` skill; for the container, the session, restarts and
  agents, the `remote-container` skill.
- The coordinating session follows the boot order of
  `explorations/coordinator/README.md` at session start and after every
  compaction, and works by the `coordinator` skill.
- Never committed: a copyrighted PDF or deck (`research/decks/` is
  gitignored) or a model identifier.
