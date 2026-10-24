<!-- The files and commands of climb batch 22's planner's probes (coordinator/CLIMB-BATCH-22.md, section 4, holds their results), run 2026-10-24 by an Opus planning worker in worktrees seeded from /home/user/fortress-base22 at 08c95c708, whose code is 32242b80d's; the probe programs are given here inline and were not kept as files. -->

# Climb batch 22: the planner's probes, their files and commands

Each command runs from the root of a worktree seeded from the base build, after the `fortress-repo` skill's setup lines (`build-and-caches.md`, "Setting up each call"), and in the background with a log, as its `session.md` gives it. Results: `coordinator/CLIMB-BATCH-22.md`, section 4.

## The files

- `last5-edits.py`: the batch's library text as 21 named edits by exact text (19 taken, 2 measured variants); its header lists them and the batch's order. `python3 -I last5-edits.py <tree> [edit ...]`.
- `last5-text.patch`: the 19 edits together, the text measured at distance 0. `rung-E.patch`, `rung-R.patch`, `rung-T.patch`: the same per rung; each applies to the base alone, and E, R and T applied in that order give `last5-text.patch` byte for byte.
- `export-check-shadow-22.patch`: the export probe's shadow (`perf-probes/export-check-full/export-check-shadow.patch`) re-based on rung E's check of climb batch 21b. It drops its own `isAbstractMember` for the tracked one, takes 4i always, compares the component's abstract members with the api's member first, as row 802's fix does, and runs `equalListMembers` to its end, keeping the stock verdict's count. It prints one `#XDIFF` line per difference. It never lands.
- `export-differences-base.tsv`: its 50 `#XDIFF` lines on the base, paths cut to the file name: 41 differences, 5 member-count stops and 4 component halves of api-side rows.
- `export-check-alt4i.patch`: a shadow of the export check under 4i's first rule alone, for the record's question 1. Every api member counts against the component's, and an api member written `abstract` is matched by a component member of the same name and header, abstract or not (`equalFnHeaders(..., true)`). It never lands.
- `checker-count-clean.patch`: the count stage's reading of a clean check, for the coordinator's change before the launch (the record's fork 19). It runs `WorldFlip -stop typecheck` and reads a run that reached the component's check and ended rc 0 with no error line as `#total 0`. Its canned case in `tools/checker-count/test_run.py` is not written.

## The commands

**A shadow of `ExportChecker` in a distance run** (the export probe's section 1, its commands):

    F=ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala ; S=$PWD/tmp/shadow
    mkdir -p $S/src $S/classes && cp $F $S/src/ExportChecker.scala
    patch $S/src/ExportChecker.scala < explorations/compile-ladder/plan-22/probes/export-check-shadow-22.patch
    CP=$(bin/fortress_classpath | tail -1)
    java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d $S/classes -encoding UTF-8 $S/src/ExportChecker.scala
    sed 's#-cp "$SCRATCH/shadow-classes:#-cp "${XCP:+$XCP:}$SCRATCH/shadow-classes:#' \
        explorations/coordinator/tools/distance/run.sh > tmp/run-shadow.sh && chmod +x tmp/run-shadow.sh
    XCP=$S/classes tmp/run-shadow.sh tmp/runs/s0.txt tmp/runs/s0
    grep '^#XDIFF' tmp/runs/s0/run.txt | cut -f4 | sort | uniq -c

The same with `export-check-alt4i.patch` in place of the shadow gives question 1's other reading.

**The batch's text and the stock distance stage:**

    python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py $PWD totalcmp rr64pow rr64comp condA \
        maybeA2 justsq openrange distrib bigops delegsizeB deleggen arrbounds str4h str5 strexcl strbodies \
        min731 list731 cast46
    explorations/coordinator/tools/distance/run.sh tmp/runs/t3.txt tmp/runs/t3
    python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/runs/t3/errors.tsv

**The count stage with the fix, without changing the tracked tool:**

    cp explorations/coordinator/tools/checker-count/run.sh tmp/count-fix.sh
    patch tmp/count-fix.sh < explorations/compile-ladder/plan-22/probes/checker-count-clean.patch
    tmp/count-fix.sh tmp/count/fix.txt tmp/count/fix

Run on the base build, with `FORTRESS_HOME` the base build and the scratch folder outside it, it leaves the base build as it was (`git status --porcelain` empty after).

**A component under the checker against the interpreter's library, fast:** the distance stage's driver, on one file, with the shadow classes a distance run left in its scratch folder:

    CP=$(bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
    S=$PWD/tmp/runs/condA        # a finished distance run's scratch folder
    java -Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp/p731/jt -Dfortress.caches=$PWD/tmp/p731/caches \
         -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false \
         -cp "$S/shadow-classes:$S/classes:$CP" DistanceMulti -order check -setting any tmp/p731/P731.fss
    grep '@@SC ERR' <its output>

About 50 s. The component it checked, row 731's shapes:

    component P731
    import List.{...}
    export Executable
    direct[\E\](l: List[\E\], n: Range[\ZZ32\]): List[\E\] = do
        r = (0 # |l|).narrowToRange(n)
        <| l[i] | i <- r |>
      end
    inIf[\E\](l: List[\E\], n: Range[\ZZ32\]): List[\E\] = do
        r = (0 # |l|).narrowToRange(n)
        if r.stride = 1 then l else <| l[i] | i <- r |> end
      end
    inIfTyped[\E\](l: List[\E\], n: Range[\ZZ32\]): List[\E\] = do
        r = (0 # |l|).narrowToRange(n)
        if r.stride = 1 then l else do x: List[\E\] = <| l[i] | i <- r |>; x end end
      end
    inIfWritten[\E\](l: List[\E\], n: Range[\ZZ32\]): List[\E\] = do
        r = (0 # |l|).narrowToRange(n)
        if r.stride = 1 then l else <|[\E\] l[i] | i <- r |> end
      end
    minPlain(s: String, c: Char): ZZ32 = BIG MIN[i <- s.indices, s[i]=c] i
    minTyped(s: String, c: Char): ZZ32 = do n: ZZ32 = BIG MIN[i <- s.indices, s[i]=c] i; n end
    minWritten(s: String, c: Char): ZZ32 = BIG MIN[\ZZ32\][i <- s.indices, s[i]=c] i
    minLocal(s: String, c: Char): String = do n = BIG MIN[i <- s.indices, s[i]=c] i; s[0#n] end
    run():() = ()
    end

**String's four members under walk**, each a component `export Executable` with `import String.{...}`, run by `bin/fortress` and by `tools/old-fortress.sh /home/user/fortress-base22 <tree>/tmp/old-caches`:

    a = "abcdefghijklmnopqrstuvwxyz0123456789"
    b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()"
    c = a || b                                         (* a CatString: longer than maxLeafSize *)
    println("Cat rangeContains: " c.rangeContains(0#70, 'Z'))
    f = "abc"; println("Flat balanced " f.balanced())
    e = c.uncheckedSubstring(3#0); println("empty isBalanced " e.isBalanced); println("empty balanced [" e.balanced() "]")
    c2 = (a || b) || (a || b); s = c2[2#100]; println("in substring of cat: " ('Z' IN s))

**Row 756's program**, by `bin/fortress typecheck -debug stacktrace`:

    component Row756Item
    export Executable
    trait AnyBox comprises { Box[\E\] } where [\E extends Object\]
        getter item(): E
    end
    object Box[\E\](item: E) extends AnyBox end
    mk(): AnyBox = Box[\ZZ32\](3)
    run(): () = do
        println(mk().item)
      end
    end

The same component with `b: AnyBox = mk()` in place of the call of `item` checks, rc 0.
