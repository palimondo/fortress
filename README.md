# Fortress

Fortress was Sun Microsystems' experimental programming language for
high-performance computation, designed at Sun Labs under **Guy L. Steele Jr.**
and developed from 2003 to 2012. Its ambition was captured in its motto: *"to
do for Fortran what Java did for C."* In practice it became something broader —
a laboratory for programming-language ideas that are still being absorbed by
mainstream languages today:

- **A growable language.** Following Steele's "Growing a Language" (OOPSLA
  1998), almost everything — operators, loops, even the parallel machinery of
  `∑` and friends — is defined in libraries, not the compiler.
- **A mathematical language.** Syntax modeled on whiteboard mathematics:
  Unicode operators (`∈`, `⊆`, `⌊x⌋`, `∑`), juxtaposition as a user-definable
  operator (`3 sin pi x`), nontransitive operator precedence (`a+b ∨ c+d` is
  rejected rather than misparsed), and comments that render as wiki markup.
- **A parallel language.** Loops, tuples, argument evaluation, and big
  reduction operators are implicitly parallel; a work-stealing runtime
  balances the load ("do for processors what GC does for memory"); `atomic`
  blocks are backed by transactional memory.
- **Traits, multiple inheritance, and symmetric multimethod dispatch**, with
  overloading checked by the Meet Rule — plus algebraic traits (`Monoid`,
  `Ring`, …) and design-by-contract woven into the type system.

This repository is a **revival** of that codebase: the complete surviving
history (5,397 commits, January 2007 – August 2012) carried forward to a
modern toolchain, with a fully green test suite — the first in this lineage.

## Status (2026)

- Builds and runs on **JDK 25** with Scala 2.13.18 and ASM 9 (JDK 8–21 also
  verified). See the quickstart below.
- **Test suite fully green**: ~1,400 fast tests (including the full compiler
  suite) plus 382 interpreter system tests, zero failures. The 2012 mainline
  ended with 7 red; the history of the two fixes is in
  [`explorations/test-baseline-jdk8.md`](explorations/test-baseline-jdk8.md).
- Both execution paths work: the **interpreter** (`fortress <file>.fss`) and
  the partial **JVM bytecode compiler** (`fortress compile` + `fortress run`).
  The compiler is incomplete (some constructs are unimplemented), not broken.
- The modernization was done as a ladder of small, individually test-gated
  steps: see [`explorations/modernization-plan.md`](explorations/modernization-plan.md).
  Each rung is tagged `ladder/*`; pick the newest tag whose toolchain floor
  fits your JDK.

## Quickstart

Requires a JDK (8 through 25 all verified; 25 is the current development
rung) and Apache Ant.

```bash
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=$(pwd)          # repo root
ant compileAll                        # ~80 s
./bin/fortress explorations/claude_demo.fss   # run a program (interpreter)
```

The interpreter requires the filename (without `.fss`) to match the component
name. For the compiler path, imported library components must be compiled
into the cache first — recipe and troubleshooting in
[`explorations/repo-internals.md`](explorations/repo-internals.md), which is
also the architecture map for the whole source tree.

To run the test suite: `ant testFast` (~9 min) and `ant testSystem` (~2 min).

## The research

Fortress produced a substantial body of programming-language research. The
sources of the specification and of several papers live in this repository.

### The language specification

- [`Specification-1.0-frozen/`](Specification-1.0-frozen/) — the frozen
  **Fortress 1.0 specification** (March 2008), with the rendered
  [`fortress.1.0.pdf`](Specification-1.0-frozen/fortress.1.0.pdf).
- [`Specification/`](Specification/) — the post-1.0 evolving specification
  LaTeX, richer in places than any published PDF.
- [`Documentation/Specification/`](Documentation/Specification/) — a later,
  partial restart of the specification effort.

### Papers with sources in this repo

| Paper | Where | Status |
|---|---|---|
| *Type Checking Modular Multiple Dispatch with Parametric Polymorphism and Multiple Inheritance* — Allen, Hilburn, Kilpatrick, Luchangco, Ryu, Chase, Steele | [`Papers/Types/`](Papers/Types/) | **OOPSLA 2011** |
| *Implementing Fully Modular, Statically Typed, Symmetric Multimethod Dispatch* — Steele, Chase, et al. | [`Papers/Dispatch/`](Papers/Dispatch/) ([rendered PDF](Papers/Dispatch/SteelePOPL2011.pdf)) | POPL 2011 submission draft |
| *Dynamic Dispatch and Type Inference Semipredicates* (Welterweight Fortress) — Chase, Hilburn, Luchangco, et al. | [`Papers/Welterweight/`](Papers/Welterweight/) | unpublished draft |
| *The Return Type Rule and Generics* | [`Papers/Types/journal/`](Papers/Types/journal/) | draft |
| *Enforcing Fortress' Return Type Rule at Runtime* | [`Papers/RuntimeInstantiation/`](Papers/RuntimeInstantiation/) | draft + working notes |
| *Fortress function and method encodings* / *Mapping Fortress type relationships onto the JVM type system* | [`Papers/Implementation/`](Papers/Implementation/) ([rendered PDF](Papers/Implementation/FortressEncodings-rendered.pdf)) | implementation notes |

The last four are the written record of the problem that ultimately stopped
the project (see the history below): making generic methods, multiple
inheritance, and fully symmetric dispatch coexist soundly requires solving
systems of type constraints at run time.

Related published work by the team (sources not in this repo) includes
*Object-Oriented Units of Measurement* (OOPSLA 2004), *Growing a Syntax*
(FOOL 2009), and Steele's ICFP 2009 talk *Organizing Functional Code for
Parallel Execution; or, foldl and foldr Considered Slightly Harmful* — the
generators-and-reducers story. A curated index of talks, decks, and recovery
provenance is in [`research/README.md`](research/README.md).

## History

**2003–2006: DARPA HPCS.** Steele started the project in 2003 as Sun's
language effort within DARPA's High Productivity Computing Systems program.
When DARPA narrowed HPCS funding in late 2006, Sun continued Fortress as a
research project.

**2007–2008: open source and Fortress 1.0.** The code was opened in January
2007 (this repository's history begins 2007-01-04). The 1.0 specification
and the reference interpreter followed in 2008.

**2008–2012: the type-system frontier.** Work shifted from the interpreter
to compiling Fortress to the JVM, and to the hard theory: the Meet Rule,
the return type rule, and run-time instantiation of generics. In his 2016
JuliaCon retrospective, Steele was frank about where it stalled: solving
type constraints at run time was "non-trivial — a euphemism for exponential
cost." *"So we had a grand vision, but could not quite pull it off."* The
final commits in this history (August 2012) are exactly that work — the
return-type-rule papers above.

**2012: wind-down.** Oracle Labs concluded the project in the summer of
2012. Steele's retrospective lists what they consider proven and worth
reusing: symmetric multimethod dispatch with generics, work-stealing
implicit parallelism, generator/reducer-factored collections, mathematical
syntax that both parses and pretty-prints, nontransitive precedence, and
physical dimensions and units in the type system. Ideas seeded here have
since surfaced elsewhere — Steele points to Swift's optional binding
(`if let`) as a direct descendant of Fortress's `if x <- z then … end`.

**2018: a first migration attempt** by GitHub user pluckyporcupine moved
the build to Java 9 and Scala 2.10 but lost the project history; its work
is preserved here as a grafted overlay commit.

**2026: this revival.** Full history restored, toolchain modernized rung by
rung (JDK 8 → 25, Scala 2.10 → 2.13, ASM 3 → 9, vendored jsr166y →
`java.util.concurrent`), every step gated on the fully green suite.

Retrospective sources: Guy L. Steele Jr., *Fortress Features and Lessons
Learned*, JuliaCon 2016 — [video](https://www.youtube.com/watch?v=EZD3Scuv02g);
notes in [`research/extracts/`](research/extracts/SteeleJuliaCon2016-extract.md).

## Repository tour

- Original Fortress tree (everything not listed below) — the historical
  artifact being revived; treat with care.
  [`README.txt`](README.txt) is Sun's original SVN-era repository guide,
  kept as an artifact.
- [`ProjectFortress/`](ProjectFortress/) — interpreter, compiler, standard
  library, and ~1,800 tests.
- [`explorations/`](explorations/) — revival-era experiments and writeups:
  verified running programs, the modernization plan, repo internals, test
  baselines.
- [`research/`](research/) — the Guy Steele research corpus: a links-only
  index and working notes (copyrighted PDFs are never committed).
- [`Specification/`](Specification/), [`Papers/`](Papers/) — see above.

## Lineage and license

This repository carries the full available git history of the original
`projectfortress.sun.com` Subversion repository (root commit 2007-01-04,
mainline HEAD August 2012), with pluckyporcupine's 2018 migration grafted
on top as a tree overlay; see the graft commit messages for attribution.
The revival work (2026–) continues from there.

Fortress is BSD-licensed — see [`LICENSE`](LICENSE).
