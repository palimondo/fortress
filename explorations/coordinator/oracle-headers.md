# Oracle copyright headers in revival-era files

## The rule

Files the revival wrote from scratch must not carry Oracle's copyright header.
Many were made by copying a neighbour's first ten lines, so they claimed `Copyright
2011, Oracle and/or its affiliates` — or, later, `Copyright 2026, the Fortress
revival` — over Oracle's boilerplate (`All rights reserved. / Use is subject to
license terms. / This distribution may include materials developed by third
parties.`). Oracle wrote none of them: false attribution, so the whole block goes,
leaving any real description in the file intact. The team's own files keep their
header, even where the revival modified them — the BSD license requires it — and so
does a revival-era file that is a copy or adaptation of a team file: a derived work.

## Removed (2026-09-21): 55 files, header block only, no code line touched

- `ProjectFortress/compiler_tests/` — 25
- `ProjectFortress/library_tests/` — 29
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java` — 1

32 claimed Oracle, 23 claimed "the Fortress revival" over Oracle's boilerplate; both spellings were removed whole.

## Derived from a team file — header stays

Nine classpath-shadow copies, each of the same path under `ProjectFortress/src/`,
listed relative to `explorations/`:

- `perf-probes/prelude/shadow-src/` — `com/sun/fortress/compiler/StaticChecker.java`
- `perf-probes/prelude/exclusion-trace/shadow-src/` — `.../scala_src/typechecker/TypeHierarchyChecker.scala`, `.../scala_src/types/TypeAnalyzer.scala`
- `perf-probes/template-check/shadow-src/` — `.../nodes_util/ExprFactory.java`, `.../scala_src/typechecker/TypeWellFormedChecker.scala`, `.../scala_src/useful/STypesUtil.scala`, `.../syntax_abstractions/phases/Transform.java`
- `perf-probes/template-check/extra-src/` — `.../nodes_util/NodeReflection.java`
- `compile-ladder/rung7/probes/shadow-src/` — `.../compiler/NamingCzar.java`

No revival-era test turned out to be a copy of a 2012 test: the closest pair
(`XXXTryAtomicCodegenRungB.fss` against `compiler_tests/Compiled12.b0.fss`) shares only
the component/`run()` skeleton, and git's copy detection finds no team source for any
of them. The Shell-derived probe drivers (`perf-probes/prelude/WorldFlip.java`,
`perf-probes/prelude/desugar-codegen/PhaseProbe.java`) carry no header at all.

## Left alone: the header text is quoted, not claimed

`explorations/compile-ladder/climb-batch-2/REPAIR-review.md`,
`explorations/compile-ladder/rung-export-var/probes/xxx-goes-red.txt`,
`explorations/coordinator/postmortem-2026-09-19/tool-calls.tsv`,
`explorations/reviews/run-c2-review-probes/transcript.jsonl` — reports, probe
output and transcripts quoting a header inside a record. Also untouched: `research/`,
`Specification*/`, and everything first added in 2012 or by pluckyporcupine's overlay.

## Re-running the check

```sh
git grep -l -E 'Oracle and/or its affiliates|Use is subject to license terms|Copyright .* Sun Microsystems' |
while read -r f; do
  a=$(git log --diff-filter=A --no-renames --format='%ad %an' --date=short -- "$f" | tail -1)
  case "$a" in 2026*|202[7-9]*) printf '%s\t%s\n' "$a" "$f";; esac
done
```

A hit is a new offender unless it is derived (above) or merely quotes a header.
