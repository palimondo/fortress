Task complete: report to parent delivered. Ordinary SUM resolved using
`import FortressLibrary.{...} except { opr BIG + }`.
Authoritative executable probe: NotationExceptSum.fss (10.0, 4.0).
Actual Fortify render inspected by eye: render-except/NotationExceptSum.png.
Numeric maximum probe: NotationNamedSum.fss (10.0,4.0,4.0), spelling
`BIG MAXNUM[i <- 1#4] (1.0 i)`. Also rendered and inspected.
All details in NOTES.md, successful run output in except-run.log/named-run.log.
Use sourced experiment/env.sh and render-env.sh, JAVA_FLAGS set to
-Dfortress.caches=/tmp/fortress-microgpt-notation-cache.
Boundary remains: never inspect forbidden sibling fortress or transcripts,
or experiment/coordinator. No setup/rebuild/baselines performed.
Follow-up complete: NotationDot.fss proves user-vector DOT => central dot,
prints 25.0,6.0,3.5355339059327378; render-dot PNG viewed by eye.
