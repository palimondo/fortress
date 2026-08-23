# Fortress

Fortress was Sun Microsystems' experimental programming language for
high-performance computation, designed at Sun Labs under **Guy L. Steele Jr.**
and **Eric Allen** and developed from 2003 to 2012. The press framed its ambition as doing
*"for Fortran what Java did for C"*; the project's own tagline was simpler —
**"Simple parallelism, beautiful code."** In practice it became something
broader — a laboratory for programming-language ideas that mainstream
languages have been absorbing ever since:

- **A growable language.** Following Steele's "Growing a Language" (OOPSLA
  1998), almost everything — operators, loops, even the parallel machinery
  behind `∑` — is defined in libraries, not the compiler.
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

It looked like this — the heart of
[`buffons.fss`](ProjectFortress/demos/buffons.fss), one of the original Sun
Labs demos, estimating π by Buffon's needle. The `for` loop runs its
iterations in parallel, `atomic` guards the shared counters, juxtaposition
multiplies, and `0.0 < rsq < 1.0` is a chained comparison:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="explorations/fortify/buffons-excerpt-dark.svg">
  <img alt="The heart of buffons.fss typeset as mathematics: a parallel for loop with atomic counter updates" src="explorations/fortify/buffons-excerpt-light.svg">
</picture>

Fortress code was meant to be read as mathematics. The rendering above is
the canonical one, produced by [Fortify](Fortify/) — the project's own
Emacs-and-LaTeX typesetter, the tool behind the specification and Steele's
slides — from the ASCII source you actually type, where `delta_X` is δ_X,
`SQRT` is the radical, and `|/ … \|` and `|\ … /|` are ⌈ ⌉ and ⌊ ⌋:

```
for i <- 1#3000 do
   delta_X = random(2.0) - 1.0
   delta_Y = random(2.0) - 1.0
   rsq = delta_X^2 + delta_Y^2
  if 0.0 < rsq < 1.0 then
     y1 = tableHeight random(1.0)
     y2 = y1 + needleLength (delta_Y / SQRT rsq)
     (y_L, y_H) = (y1 MIN y2, y1 MAX y2)
     temp1:RR64 = y_L / needleLength
     temp2:RR64 = y_H / needleLength

      if |/ temp1 \| = |\ temp2 /| then
            atomic do hits:= hits + 1.0 end
      end
     atomic do n:= n + 1.0 end
   end
end
```

This repository preserves that codebase: the complete surviving history,
January 2007 through August 2012, carried forward so that it still builds
and runs on today's Java platform.

## History

**2003–2006: DARPA HPCS.** Fortress began in 2003 as Sun's language effort
within DARPA's High Productivity Computing Systems program, run by Sun
Labs' Programming Language Research Group. When DARPA narrowed HPCS funding
in late 2006, Sun continued Fortress as a research project.

**2007–2008: open source and Fortress 1.0.** The code — at that point the
reference interpreter — was opened in January 2007 (this repository's
history begins on 4 January 2007). The 1.0 specification, with a matching
interpreter release, followed in March 2008.

**2008–2012: the type-system frontier.** Work shifted from the interpreter
to compiling Fortress to the JVM, and to the hard theory: the Meet Rule,
the return type rule, and run-time instantiation of generics. Steele,
looking back in 2016, was frank about where that frontier stalled:
*"'Non-trivial' is a euphemism for 'exponential cost' […] So we had a grand
vision, but could not quite pull it off."* The original repository closes
in August 2012 with that problem still open — its last commits record the
attempt.

**2012: wind-down.** Oracle Labs
[concluded the project in the summer of 2012](https://web.archive.org/web/20121007034544/https://blogs.oracle.com/projectfortress/entry/fortress_wrapping_up).

**2015–2016: coda.** Steele revisited Fortress in a pair of retrospective
talks: [*Four Solutions to a Trivial Problem*](https://www.youtube.com/watch?v=ftcIcn8AmSY)
at Google (December 2015), on the generator/reducer decomposition at the
language's core, and the JuliaCon 2016 keynote
[*Fortress Features and Lessons Learned*](https://www.youtube.com/watch?v=EZD3Scuv02g),
the fullest account of what the project proved and where it got stuck.

## The research

Fortress produced a substantial body of programming-language research. The
sources of the specification and of several papers live in this repository.

### The language specification

- [`Specification-1.0-frozen/`](Specification-1.0-frozen/) — the frozen
  [**Fortress 1.0 specification**](Specification-1.0-frozen/fortress.1.0.pdf)
  (March 2008).
- [`Specification/`](Specification/) — the post-1.0 evolving specification
  LaTeX, a [Working Draft](Specification/fortress.pdf) richer in places
  than any published PDF.
- [`Documentation/Specification/`](Documentation/Specification/) — a later,
  partial restart of the specification effort.

### Papers with sources in this repo

Inside [`Papers/`](Papers/):

- [`Types/`](Papers/Types/) — [*Type Checking Modular Multiple Dispatch with
  Parametric Polymorphism and Multiple Inheritance*](Papers/Types/paper.pdf)
  (Allen, Hilburn, Kilpatrick, Luchangco, Ryu, Chase, Steele —
  **OOPSLA 2011**), with a
  [journal draft on the return type rule](Papers/Types/journal/justificationOfRTR.pdf).
- [`Dispatch/`](Papers/Dispatch/) — [*Implementing Fully Modular, Statically
  Typed, Symmetric Multimethod Dispatch*](Papers/Dispatch/SteelePOPL2011.pdf)
  (Steele, Chase, et al.), a POPL 2011 submission draft.
- [`Welterweight/`](Papers/Welterweight/) — [*Dynamic Dispatch and Type
  Inference Semipredicates*](Papers/Welterweight/paper.pdf)
  ("Welterweight Fortress"; Chase, Hilburn, Luchangco, et al.), an
  unpublished draft.
- [`RuntimeInstantiation/`](Papers/RuntimeInstantiation/) — [*Enforcing
  Fortress' Return Type Rule at Runtime*](Papers/RuntimeInstantiation/RTRinstantionTheory.pdf),
  a draft with working notes.
- [`Implementation/`](Papers/Implementation/) — implementation notes:
  [*Fortress function and method encodings*](Papers/Implementation/FortressEncodings-rendered.pdf)
  and *Mapping Fortress type relationships onto the JVM type system*.

The unpublished drafts all concern one problem: combining generic
methods, multiple inheritance, and symmetric dispatch requires solving
systems of type constraints at run time. Oracle filed a family of patents
on this dispatch machinery
([US 8,843,887](https://patents.google.com/patent/US8843887B2/en) and
siblings) on 31 August 2012, the same day as the original repository's
[last commits](https://github.com/palimondo/fortress/commit/a874948acb5b4b6aa7791e8d735657437910d879).

## Repository tour

The top level:

- [`ProjectFortress/`](ProjectFortress/) — the toolchain: all Java/Scala
  source under `src/com/sun/fortress/`, the `.fss` test corpora, and
  vendored third-party jars. Built by the root [`build.xml`](build.xml)
  (the one inside `ProjectFortress/` is a deprecation stub).
- [`Library/`](Library/) — the standard library, written in Fortress itself
  as `.fss`/`.fsi` component pairs; `FortressLibrary.fss` is the prelude.
  [`CompilerLibrary/`](CompilerLibrary/) holds API stubs for the compiler
  path.
- [`bin/`](bin/) — the `fortress` launcher and its supporting scripts.
- [`Specification/`](Specification/), [`Papers/`](Papers/),
  [`Documentation/`](Documentation/) — the research record, plus
  [`Fortify/`](Fortify/), the Emacs-based renderer that typesets Fortress
  source as LaTeX math for those documents.
- [`explorations/`](explorations/), [`research/`](research/) — revival-era:
  verified experiments and the authorship map.
- [`README.txt`](README.txt) — Sun's original SVN-era repository guide.

Inside [`ProjectFortress/src/com/sun/fortress/`](ProjectFortress/src/com/sun/fortress/),
the shape of the implementation:

- [`Shell.java`](ProjectFortress/src/com/sun/fortress/Shell.java) — the CLI
  entry point, dispatching `walk` (interpret), `compile`, `run`, `parse`,
  `typecheck`, and friends.
- [`parser/`](ProjectFortress/src/com/sun/fortress/parser/) — four
  Rats!-generated packrat parsers (the main grammar plus a preparser,
  template parser, and import collector), with hand-written precedence and
  layout support in
  [`parser_util/`](ProjectFortress/src/com/sun/fortress/parser_util/) and
  the extensible-syntax machinery in
  [`syntax_abstractions/`](ProjectFortress/src/com/sun/fortress/syntax_abstractions/).
- [`nodes/`](ProjectFortress/src/com/sun/fortress/nodes/) — the generated
  AST classes, produced (along with Scala and Fortress mirrors of the AST)
  from [`ProjectFortress/astgen/Fortress.ast`](ProjectFortress/astgen/Fortress.ast).
  Generated code is committed; `ant makeAST` regenerates.
- [`scala_src/`](ProjectFortress/src/com/sun/fortress/scala_src/) — the
  type checker, rewritten in Scala beginning in late 2008 (remains of the
  older Java checker sit in
  [`compiler/typechecker/`](ProjectFortress/src/com/sun/fortress/compiler/typechecker/)).
- [`compiler/`](ProjectFortress/src/com/sun/fortress/compiler/) —
  disambiguation, desugaring, and the JVM bytecode backend
  ([`codegen/`](ProjectFortress/src/com/sun/fortress/compiler/codegen/),
  [`asmbytecodeoptimizer/`](ProjectFortress/src/com/sun/fortress/compiler/asmbytecodeoptimizer/));
  its [`WellKnownNames.java`](ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java)
  is the switch that gives the interpreter and compiler paths their
  different preludes.
- [`interpreter/`](ProjectFortress/src/com/sun/fortress/interpreter/) — the
  tree-walking reference evaluator, with native primitives in
  [`glue/`](ProjectFortress/src/com/sun/fortress/interpreter/glue/).
- [`runtimeSystem/`](ProjectFortress/src/com/sun/fortress/runtimeSystem/) —
  the work-stealing runtime, and the class-load-time instantiation of
  generics that compiled code links against.

## Building, walking and running

Fortress needs only a JDK and Apache Ant.

```bash
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=$(pwd)                    # repo root
ant compileAll
./bin/fortress ProjectFortress/demos/buffons.fss
```

That last command *walks* — the interpreter's own term for direct
evaluation — the Buffon's-needle demo excerpted at the top of this README.

There is also a partial JVM bytecode compiler (`fortress compile`, then
`fortress run`); it is incomplete — some constructs were never implemented
— but what exists works. The interpreter requires the filename (without
`.fss`) to match the component name, and the compiler path needs imported
library components compiled into its cache first.

To run the test suite: `ant testFast` and `ant testSystem`.

## Lineage and license

This repository carries the full available git history of the original
`projectfortress.sun.com` Subversion repository, from the January 2007
opening to the August 2012 wind-down, together with the later migration
work that keeps it running — see the commit history for lineage and
attribution.

Most of the code is the work of a small core — Sukyoung Ryu on the front
end from parser to type checker, David Chase on the compiler and runtime,
Jan-Willem Maessen on the standard library, Christine Flood on
transactions and the work-stealing runtime — with a wider circle of
students, interns, and visitors around them; the map of who wrote what,
reconstructed from the history, is in
[`research/authorship.md`](research/authorship.md).

Fortress is BSD-licensed, with third-party exceptions noted in
[`LICENSE`](LICENSE).
