<!-- ant compileAll now keeps the Fortress caches unless the implementation changed (a stamp over the build, the jars, bin and the configuration), skips scalac when its inputs did not change (20 s to 4 s with nothing changed), and the test targets build first; harness-one.sh keeps its cache between calls (17 s to 4 s), env.sh no longer deletes live parser folders and junit.sh no longer sources it, and the suites run at four threads with the run steps' JAVA_FLAGS pinned; both suites pass with batch 10's gate counts after a clean and an incremental build; item 5 measured and not built; 2026-10-08. -->

# Build efficiency: builds and test runs that do not depend on deleting the caches

Written 2026-10-08 for the coordinating session and the curator. Branch `build-efficiency`, worktree `/home/user/fortress-build-eff`, cut from `main` at `428e3c07d`. The main tree was not built, run or written.

The machine for every timing, unless a line says otherwise: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, `cpu MHz` 2100.000, openjdk 25.0.4.1 (build 25.0.4.1+1-1-24.04.4-Ubuntu), Ant 1.10.14. The load at start is given with each run. `ps` showed no other agent's build or Fortress run during the work.

The worktree could not be seeded: the main tree's `default_repository/caches/bytecode_cache/` holds no library jars, so `seed-worktree.sh` refuses it (its header; `suites-at-four-threads.md` met the same). The worktree was built once with `ant compileAll` (43 s).

## The short answer

- `ant compileAll` with nothing changed: before, 20 s, and the caches deleted; after, 4 s, and the caches kept, library jars included. scalac was 19 of the 20 s; it now runs only when its inputs changed.
- The caches are kept only when the implementation that will read them is byte for byte the one that filled them: a stamp over `ProjectFortress/build`, the jars, `bin` and the repository's configuration. Any edit of the Java, Scala, grammars, AST definition, jars, `bin` or `build.xml` still deletes them, at the same point of the build as before.
- A seeded worktree whose sources equal its base keeps the seeded caches through `ant compileAll`, so its worker no longer runs the library order (100 to 115 s) after its first build.
- `testFast`, `testSystem`, `testOnly` and the per-corpus targets build first. Before, a Java edit ran stale classes in a test target; now it is compiled first.
- A cold `harness-one.sh` JVM spends 14.3 to 14.7 s of its 17.6 to 17.9 s filling its cache. The script now keeps its cache beside its scratch folder: 17.2 s, then 3.7 s.
- env.sh removes only parser folders that no run can still be using. An agent's grammar run that broke while another agent sourced the old env.sh passed beside the new one. `junit.sh` no longer sources env.sh.
- The suites run at four threads. That exposed a dependence on the calling shell: from a shell without `JAVA_FLAGS`, `library_tests/TimingRungT` overflowed its stack in 8 of 12 runs. `fastTrack` now pins the run steps' `JAVA_FLAGS` as well.
- Both suites pass with batch 10's gate counts (1,815 and 516 tests), after a clean build and again after a Java edit built incrementally, from a shell with no `JAVA_FLAGS` or `FORTRESS_THREADS`.
- Not built: tracks and shards that start from a filled cache (item 5). Reusing a whole earlier run halves `testFast` and `testSystem`, but it can run a library edit's tests against the old library jars. The safe form, a seed of the library alone, saves under a tenth.

## 1. A cold and a warm `harness-one.sh` JVM (item 1)

The measurement `harness-cache-cost.md` asks for, section "The measurement still needed". The `java` line of `harness-one.sh` as it was (`FORTRESS_THREADS=1`), run twice in one shell on one caches folder, cold and then warm, with no `rm` between, over `ProjectFortress/tests/IntegerMaxNumMinNum.fss` and `IntegerOrderNumerals.fss`. The seed of the first JVM (`1a11cc41c99_16`) was passed to the other five, so `IntegerMaxNumMinNum` was the first test in all six. Each repeat began from an empty folder and waited for a load under 0.5. Tree `428e3c07d`, built in the worktree.

| repeat | cold: load | wall | first test | second test | `Time:` | warm: load | wall | first test | second test | `Time:` |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.46 | 17.78 s | 16.98 s | 0.61 s | 17.60 | 1.04 | 3.11 s | 2.62 s | 0.31 s | 2.93 |
| 2 | 0.48 | 17.88 s | 17.10 s | 0.59 s | 17.70 | 0.92 | 2.91 s | 2.45 s | 0.28 s | 2.73 |
| 3 | 0.47 | 17.57 s | 16.79 s | 0.61 s | 17.41 | 0.95 | 2.89 s | 2.45 s | 0.26 s | 2.71 |

The warm JVM started as the cold one ended, so its load was about 1 and not under 0.5.

- The cache fill, the first test cold minus warm: 14.4, 14.7 and 14.3 s.
- What a warm cache does not remove, the warm first test minus the warm second: 2.3, 2.2 and 2.2 s. That is the interpreter building the library's environment, which every JVM does, and a cold JVM.
- A whole cold JVM took 17.6 to 17.9 s, a warm one 2.9 to 3.1 s: a warm run takes a sixth of the time.
- `harness-cache-cost.md` put the first test minus a later test at 14.5 to 27.2 s under load 0.6 to 12. Idle, that difference is 16.2 to 16.5 s here, and the fill is 88 % of it. So of the 24 to 44 minutes that note estimated for batches 8 to 10, about 21 to 39 were the cache fill.

## 2. What the caches depend on, and the rule

Read in the code:

- `analyzed_cache` (with `depends/`), `presyntax_cache`, `syntax_cache` and `interpreter_parsed_cache` hold ASTs, written as text by `ASTIO.writeJavaAst` with the node `Printer` (`nodes_util/ASTIO.java:94-113`). They depend on the AST classes (generated from `Fortress.ast`), the parser (generated from the `.rats` grammars), and every phase that ran before the write: the disambiguator, both type checkers, the desugarers, in Java and Scala.
- `interpreter_cache` holds walk's rewritten ASTs (`interpreter/env/ComponentWrapper.java:67`, `:96`), so it depends on `interpreter/rewrite` too.
- `environment_cache` holds classes that `compiler/environments/TopLevelEnvGen.java:655` writes and `SimpleClassLoader.java:49` loads.
- `bytecode_cache` holds the code generator's jars (`compiler/phases/CodeGenerationPhase.java:103`, `:126`; `NamingCzar.java:132`), which call the run-time classes, and which the linker rewrites (`linker/Linker.java:258-263`).
- `nativewrapper_cache` holds the wrappers that `compiler/nativeInterface/FortressTransformer.java:33` generates for `import java`.
- `global.map` is the linker's state (`linker/RepoState.java:366-385`).
- Fortress compares an entry with its Fortress sources by date, and with a hash of the foreign Java signatures, and never with the implementation (`repository/GraphRepository.java:243-244`, `:282-283`; `build-cache-exploration.md`, section 6).

So each cache can depend on almost every part of the implementation. A rule finer than "the implementation as a whole" would need a proof per cache and per package, and the record has none. The rule built is therefore the conservative one: the caches are kept only when the implementation that will read them is, byte for byte, the one that filled them.

The check the brief expected does not exist. FACTS says the first `fortress compile` after a rebuild of the compiler clears `bytecode_cache/`. The only code that deletes cache files is `Shell.resetRepository` (`Shell.java:115-135`, called by `CompilerJUTest`, `LibraryJUTest` and `NightlyCompilerJUTest` when `fortress.junit.reset` is true), the linker's jar replacement (`Linker.java:258-263`) and `ASTIO.deleteJavaAst`; `bin/fortress`, `bin/fortress_classpath` and `bin/run` check nothing. A run shows it: with the five library jars in place, a comment line added to `compiler/NamingCzar.java`, the old `build.xml` run with `-Dcache0=/nonexistent -Dcache1=/nonexistent` (javac recompiled 1,617 files, 36.5 s), then `fortress compile compiler_tests/Compiled10.fss` (exit 0): the five jars were still there, and `fortress run Compiled10` printed `pass`. The jars FACTS saw missing were deleted by `cleanCache` in `ant compileAll` itself. That FACTS entry should say so.

The rule, as built:

- **The build stamp.** `ProjectFortress/build/implementation.stamp` is a SHA-1 over the implementation as it runs: every file of `ProjectFortress/build`, `ProjectFortress/third_party` and `bin`, and `default_repository/configuration`, each with its path relative to the tree, followed by the JDK's version. It leaves out `build/scalac-compileAll.args`, which holds the tree's absolute path. `compileAll` deletes it first and writes it last, after a successful build.
- **The caches stamp.** A caches folder holds `implementation.stamp`, the build stamp it belongs to. At its end, `compileAll` keeps the folder only if that stamp equals the new build stamp. Otherwise it deletes the folder and starts it again, empty, with the new stamp.
- **The early deletion.** `ProjectFortress/build/implementation.sources` is a SHA-1 over what the build is made from: `ProjectFortress/src` (class files aside), `ProjectFortress/astgen`, `ProjectFortress/third_party`, `bin`, `build.xml`, `default_repository/configuration`, and the JDK's version. At its start, `compileAll` deletes the caches if the sources or the build directory differ from what the last successful build left, or if the caches' stamp is not that build's. This is where `cleanCache` ran before, so a build that then fails leaves no caches behind, as before.
- **The scalac step** runs only when its inputs (the sources stamp, after the generators ran) or the build directory differ from what the last successful build left.

Both stamps are content hashes with relative paths, so a copy of a tree at another path, as `seed-worktree.sh` makes, has the same stamps. For the caches, the sources stamp can only delete; whether they are kept rests on the build stamp.

## 3. The `build.xml` edits

In the order of the file. Line numbers are those of `main`'s `build.xml`.

### 3.1 The project element (line 22)

Before:

    <project name="Fortress" default="help">

After:

    <project name="Fortress" default="help"
             xmlns:if="ant:if" xmlns:unless="ant:unless">

- What it changes: nothing by itself. It lets a task run only when a property is set (`if:set`) or not set (`unless:set`). The edits below use it.
- Why it is safe: Ant has these attributes since 1.9.1. The machine's Ant is 1.10.14, and `ProjectFortress/third_party/ant/1.9.10` is new enough too.

### 3.2 The help text (line 215)

Before: `test - run all tests.  Includes cleanCache and compile`. After: `test - run all tests.  Includes compile`.

- What it changes: the text of `ant help`. `test` no longer deletes the caches.

### 3.3 `cleanCache` (lines 356-360)

Before:

    <target name="cleanCache" ...>
      <delete dir="${cache0}"/>
      <delete dir="${cache1}"/>
    </target>

After: the same two deletions, then:

    <loadfile property="cleanCache.stamp" srcFile="${build}/implementation.stamp" quiet="true">...
    <stampCache dir="${cache0}" stamp="${cleanCache.stamp}" if:set="cleanCache.stamp"/>
    <stampCache dir="${cache1}" stamp="${cleanCache.stamp}" if:set="cleanCache.stamp"/>

- What it changes: `ant cleanCache` still deletes both folders whole. If the tree has a build stamp, it then makes `default_repository/caches` again, holding only that stamp. So what the next runs put there survives the next `ant compileAll` when the implementation has not changed. `local_repository/caches` is made again only if `local_repository/configuration` exists, that is, only if it is a repository; in this tree it is not.
- Why it is safe: an empty folder belongs to any implementation. The stamp names the implementation now built, which is the one the next runs use.

### 3.4 `cleanScala` (lines 362-365)

After the deletion of the Scala classes: `<delete file="${build}/implementation.stamp"/>`.

- What it changes: after `ant cleanScala`, the build has no stamp until the next `ant compileAll`, and the next `compileAll` deletes the caches and runs scalac.
- Why it is safe: it withdraws a stamp that no longer describes the build directory.

### 3.5 New: the rule's comment and four macros (after `cleanScala`)

A comment, "The caches and the implementation", states the rule of section 2. The macros:

- `fingerprint` runs Ant's `<checksum algorithm="SHA-1" totalproperty=... forceoverwrite="yes">` over the files given, with a scratch folder `build/.fingerprint` that it deletes. Ant's total is a hash of each file's hash and its relative path, so it does not depend on where the tree is. The macro appends `java ${java.runtime.version}`.
- `sourcesFingerprint`: `ProjectFortress/src/**` without `**/*.class`, `ProjectFortress/astgen/**`, `ProjectFortress/third_party/**`, `bin/**`, `build.xml`, `default_repository/configuration`.
- `implementationFingerprint`: `ProjectFortress/build/**` without `scalac-compileAll.args`, `implementation.*` and `.fingerprint/**`; `ProjectFortress/third_party/**`; `bin/**`; `default_repository/configuration`.
- `stampCache dir= stamp=`: keeps the folder if its `implementation.stamp` equals the stamp; otherwise deletes it and, if its parent holds `configuration` (a repository), makes it again with the stamp. It prints `Caches <dir> kept` or `Caches <dir> started again, empty`.

- What it changes: nothing until a target calls them. The four fingerprints of a build with nothing changed take 1.1 to 1.3 s each (`ProfileLogger`).
- Why it is safe: they read files and write only under `build/.fingerprint` and in the caches folders.

### 3.6 New target `checkCaches`

It computes the sources stamp and the build stamp of the build directory as it finds it, reads the two stamps the last successful build wrote and the stamp of each caches folder, and then:

    <condition property="sources.unchanged">  sources stamp = recorded, and build directory = recorded
    <condition property="cache0.keep">  sources.unchanged, and cache0's stamp = the recorded build stamp
    <delete file="${build}/implementation.stamp"/>
    <delete file="${build}/implementation.sources"/>
    <delete dir="${cache0}" unless:set="cache0.keep"/>
    <delete dir="${cache1}" unless:set="cache1.keep"/>

It prints `Sources and build as the last build left them? yes` or `no`.

- What it changes: this is where the caches were deleted before (through `cleanCache`), and they still are whenever the build may change the implementation: any edit under `ProjectFortress/src`, `astgen`, `third_party`, `bin`, or of `build.xml` or `default_repository/configuration`; a build directory that something else compiled into; caches that do not carry the last build's stamp. When nothing changed, the caches stay.
- Why it is safe: in every case where the old file deleted the caches and the implementation then changed, this deletes them too, at the same point of the build. It deletes the build stamps as well, so after a build that fails no stamp describes the build directory, and the next build deletes whatever caches there are. The case it keeps is the one where the sources and the build directory are byte for byte what the last successful build left; the final decision is then taken at the end of the build (3.7).

### 3.7 `compileAll` becomes three targets (lines 539-586)

Before:

    <target name="compileAll" depends="compileCommon, makeAST, parser, operatorsGen" ...>
      <pathconvert property="scalac.compileAll.sources" ...>  ... <java classname="scala.tools.nsc.Main" ...>
      <javac ...> ... </javac>
    </target>

After:

    <target name="checkScalaUptodate" depends="compileCommon, makeAST, parser, operatorsGen">
      sources stamp again if a generator ran (else the one of checkCaches);
      build stamp of the build directory if the sources are the last build's;
      scala.uptodate = both equal what the last successful build recorded
    <target name="compileScala" depends="checkScalaUptodate" unless="scala.uptodate" ...>
      the pathconvert, the args file and the scalac call, unchanged
    <target name="compileAll" depends="compileCommon, makeAST, parser, operatorsGen, compileScala" ...>
      the javac call, unchanged but for updatedProperty="java.compiled"
      the build stamp (taken again unless scalac was skipped and javac compiled nothing)
      <echo file="${build}/implementation.sources" .../>
      <echo file="${build}/implementation.stamp" .../>
      <stampCache dir="${cache0}" .../>  <stampCache dir="${cache1}" .../>

- What it changes: with nothing changed, scalac does not run and `ant compileAll` takes 4 s instead of 20 s (section 5). At the end, each caches folder is kept if it carries the new build's stamp and started again empty if not. `ant compileAll` prints `Scala classes up to date? yes|no` and one `Caches ...` line per folder.
- Why the scalac skip is safe: scalac's output is a function of its sources (every `.java` and `.scala` file under `src`, given on its command line), its class path (the jars of `third_party`, and `build/` for the classes not compiled from those sources, such as `useful/` and `unicode/`), its flags (`build.xml`) and the JDK. The sources stamp covers the first, third and fourth and the jars; the build stamp taken before scalac covers `build/`, and so also notices any Scala class that something deleted since (`ant cleanScala`, or `<depend closure="yes">` in `compileCommon` after a source's date changed). With the same inputs scalac writes the same bytes: two runs of the old `compileAll` with nothing changed left `build/` with identical SHA-1s over all 4,099 files, and a rebuild after a Java edit and its revert (1,617 Java files and all Scala recompiled) gave the same build stamp as before the edit (`21f2b962...`). Ant's `ant.jar` is also on scalac's class path and not in the stamp; no Scala source refers to Ant (only `ant_tasks/BatchTask.java` does).
- Why keeping the caches at the end is safe: the build stamp covers everything the run time loads from the tree (the classes, the jars, the scripts that set the class path and the JVM flags, the repository's configuration) and the JDK's version. Equal stamps mean the same implementation, byte for byte.

### 3.8 `compileCommon` and `compileCommonLint` (lines 711-715 and 737)

Before: `<target name="compileCommon" depends="init, cleanCache"`, and `compileCommonLint` with `depends="init"`. After: `depends="init, checkCaches"` for both, and a line under Eric Allen's comment: "checkCaches does this now, and only when the implementation changes".

- What it changes: every target that compiles into `build/` runs the rule of 3.6 first: `compileAll`, `compileJava`, `generated`, `compileLint`. `compileJava`, `generated` and `compileLint` write no stamp, so after them the next `compileAll` deletes the caches.
- Why it is safe: before, `compileLint` compiled into `build/` and deleted no cache; now it is under the rule. The others deleted the caches always and now delete them by the rule.

### 3.9 `testOnly` (lines 774-777)

Before: no dependency, and the comment "Note that testOnly no longer depends upon compileAll, as this entails a cache flush! That rules out the only isolated method we have of pinning down cache corruption bugs." After: `depends="compileAll"`, and the comment says why the reason is gone.

- What it changes: `ant testOnly -DtestPattern=X` builds first, incrementally, and never runs a stale class. The build keeps the caches unless the implementation changed, so the comment's reason no longer holds.

### 3.10 The per-corpus targets (lines 818-894)

Before: `testCompiler`, `testOtherCompiler`, `testLibrary` and `testQuick` each had `depends="cleanCache, compile"` and one `<junit>` batch over their classes, in `default_repository/caches`, with no thread pin, and the classes' own reset of those caches (`fortress.junit.reset` unset, so `Shell.resetRepository`).

After: `depends="compileAll"`, and each runs its corpus as testFast's tracks: `fastTrack id="compiler"` and `"othercompiler"` (in parallel) for `testCompiler`, `"othercompiler"` for `testOtherCompiler`, `"library"` for `testLibrary`, all three in parallel for `testQuick`. Each deletes only its own tracks' folders under `ProjectFortress/test-caches` first.

- What it changes: they build first, and they no longer delete or reset `default_repository/caches`. `ant testLibrary` is exactly testFast's library track, with the gate's JVM settings, so the hand-made track recipe of the skill is no longer needed. Their results are in `TEST-RESULTS/fast-<track>/`, not in `TEST-RESULTS/`.
- Why it is safe: the tracks run the same macro as the gate's `testFast`.

### 3.11 `fastTrack` and `testFast` (lines 921-966)

Before: the comment at 927 ("FORTRESS_THREADS=1 is pinned here, as in systemShard below, so the thread count the tests run at is a property of this target and not of the shell that called ant"), `<env key="FORTRESS_THREADS" value="1"/>` at 947, and `<target name="testFast"` with no dependency. After: the pin is `value="4"`; the comment says why (POSITIONS, "The suites run Fortress in parallel."): Fortress runs tuple elements, arguments and `for` iterations in parallel, so a test that fails or varies under parallelism is found and not hidden; the pin keeps the count the same on any machine and independent of the calling shell. `testFast` has `depends="compileAll"`.

A second pin, added after the first final run (section 6.1), in its own commit:

    <env key="JAVA_FLAGS"
         value="-Xmx4g -Xss64m -Djava.io.tmpdir=${basedir}/${PF}/test-tmp"/>

with a paragraph in the comment saying why. A compiled test's run step is a `bin/fortress run` process, which takes its heap and stack from `JAVA_FLAGS`, and otherwise from `bin/run`'s default (`-Xmx1536m`) with the JVM's 1 MB thread stacks. Above one thread the program runs on the pool's worker threads, whose stacks `-Xss` sets. Before, the run steps took `JAVA_FLAGS` from whatever shell called ant. env.sh and the skill's setup both export `-Xmx4g -Xss64m`, which is likely why the four-thread run of `suites-at-four-threads.md` passed (its note does not record the shell's `JAVA_FLAGS`); from a shell without it, `testFast` failed (6.1). The pin makes the result independent of the calling shell, as the thread pin does, at the values env.sh exports. The temporary directory is the suite's own `test-tmp`, which `testFast` makes and deletes.

### 3.12 `systemShard` and `testSystem` (lines 1164-1214)

Before: the comment at 1164-1165 ("testSystem used to have compileAll as a target, but now does not as this cleans the cache."), the comment at 1169 ("FORTRESS_THREADS=1 stops four interpreter runtimes from oversubscribing the CPUs"), the pin at 1188, and `<target name="testSystem"` with no dependency. After: the first comment says testSystem builds first, as testFast does; the second gives the pin of 4 the reason given in `fastTrack`; the pin is `value="4"`; `testSystem` has `depends="compileAll"`.

- What 3.11 and 3.12 change: both suites build first, incrementally, so a Java edit is compiled before the suite runs (section 5). The tests run at four threads. Each suite still deletes `ProjectFortress/test-caches` at its start, so the tracks and shards start empty, as before (item 5, section 8).
- Why it is safe: `suites-at-four-threads.md` found both suites passing at four threads with batch 10's counts, and section 6 repeats it twice on this branch.

### 3.13 `.gitignore`

One line, `/default_repository/caches/implementation.stamp`, beside the line for `global.map`. The file lists each cache folder rather than the caches folder, so without the line every tree would show the stamp as untracked, and `seed-worktree.sh`, which refuses a base with changes under `default_repository`, would refuse every built base.

## 4. The script edits

### 4.1 `explorations/compile-ladder/rung-inference-walk/harness-one.sh`

Before (lines 9-10, 13-14):

    rm -rf "$S" ; mkdir -p "$S/tests" "$S/caches" "$S/tmp"
    printf '\0\0\0\0' > "$S/caches/global.map"
    ... FORTRESS_THREADS=1"
    cd "$FH/ProjectFortress" && FORTRESS_THREADS=1 FORTRESS_JUNIT_VERBOSE=1 FORTRESS_CACHES="$S/caches" \

After:

    S=$(realpath -m -- "${1:?scratch dir}") ; shift
    C=$S.cache
    key () { [ -f "$BUILT" ] && echo "$(head -1 "$BUILT") sources $(sources_key)" ; }
    rm -rf "$S" ; mkdir -p "$S/tests" "$S/tmp"
    KEY=$(key)
    if [ -z "${COLD_CACHE:-}" ] && [ -n "$KEY" ] && [ "$(cat "$C/harness.stamp" 2>/dev/null)" = "$KEY" ]; then
        CACHE=filled
    else
        rm -rf "$C" ; mkdir -p "$C" ; printf '\0\0\0\0' > "$C/global.map" ; CACHE=empty
    fi
    rm -f "$C/harness.stamp"
    ... FORTRESS_THREADS=4; cache $CACHE"
    cd "$FH/ProjectFortress" && FORTRESS_THREADS=4 FORTRESS_JUNIT_VERBOSE=1 FORTRESS_CACHES="$C" \
    ...
    [ "$RC" = 0 ] && [ -n "$KEY" ] && [ "$(key)" = "$KEY" ] && echo "$KEY" > "$C/harness.stamp"

`BUILT` is `ProjectFortress/build/implementation.stamp`; `sources_key` is a SHA-1 over the `.fss` and `.fsi` files of `Library`, `ProjectFortress/LibraryBuiltin`, `ProjectFortress/test_library` and `ProjectFortress` itself, the source path of `default_repository/configuration:44` outside the scratch folder.

- What it changes: the cache is the folder `<scratch-dir>.cache` beside the scratch folder, kept between calls. A call starts from it when it was filled under the build stamp now in the tree and from the library sources now in the tree; otherwise the call empties it. `COLD_CACHE=1` empties it in any case. The header line says `cache filled` or `cache empty`. The scratch folder itself is still deleted at the start and the end. A relative scratch path now works, since the script makes it absolute.
- Why it is safe: a filled cache is used only with the same implementation, byte for byte (the build stamp), and the same library sources, byte for byte. So a library edit, a Java edit or a rebuild that changed anything gives an empty cache, as every call had before. The tests themselves are copied into the scratch folder at each call, newer than any cache entry, so walk analyses them again by its own date check. A call that is killed, or a library edit during the call, leaves the cache unstamped, so the next call empties it; a half-written entry is never reused. Two calls at once must use two scratch folders, as before, and so use two caches.
- One more change: `FORTRESS_THREADS=1` became `4`. The script's own header says it uses the JVM settings of `systemShard`, and `systemShard` now pins 4 (3.12). This is a decision for the curator (question 2).

### 4.2 `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`

Before (line 10): `source "$(dirname "$0")/../../../experiment/env.sh"`.

After:

    export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
    export PATH="$JAVA_HOME/bin:$PATH"
    export FORTRESS_HOME="$(cd "$(dirname "$0")/../../../.." && pwd)"
    unset JAVA_TOOL_OPTIONS
    export FORTRESS_THREADS=4
    mkdir -p "$FORTRESS_HOME/tmp"
    export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FORTRESS_HOME/tmp"

- What it changes: the script no longer deletes `/tmp/fortress*rats`. Its JVMs keep their temporary files, parser folders among them, in the tree's `tmp/`, as the skill's per-call setup does. It still runs the tree it is in (the same `FORTRESS_HOME` env.sh computed, from the script's own place).
- `FORTRESS_THREADS` was 1, from env.sh. It is 4 now, the pin of `fastTrack`, whose tracks the script's `ONE_JVM=1` mode imitates (its header). Question 2 too.

### 4.3 `explorations/experiment/env.sh`

Before (line 10): `rm -rf /tmp/fortress*rats 2>/dev/null`.

After:

    (
      oldest=$(ps -C java -o etimes= 2>/dev/null | sort -n | tail -1 | tr -d ' ')
      now=$(date +%s)
      find /tmp -maxdepth 1 -type d -name 'fortress*rats' -mmin +60 -printf '%T@ %p\n' 2>/dev/null |
      while read -r t d ; do
        [ -n "$oldest" ] && [ "${t%.*}" -ge $(( now - oldest )) ] && continue
        [ -n "$(find "$d" -newermt '60 minutes ago' -print -quit 2>/dev/null)" ] && continue
        rm -rf "$d"
      done
    )

- What it changes: sourcing env.sh removes a parser folder only if nothing in it was written for an hour and every `java` process now running started after its last write. The subshell keeps the variables out of the caller's shell.
- Why it is safe: a run makes its parser folder after it starts and uses it until it ends (`RatsUtil.getTempDir`, FACTS). A folder written to in the last hour may belong to a live run, and so may an older folder if a `java` process has been running longer than the folder's age; both are kept. Every other user of env.sh gets the same safety: `run-ladder.sh`, `repair-r1-atomic-static/run-subset.sh` and `setup.sh` source it, and the batch, repair and ladder workflows and the headers of `tools/checker-count/run.sh` and `tools/distance/run.sh` tell agents to.
- What it still does: the folders of finished runs older than an hour go, so the disk allowance does not fill.

## 5. Before and after

Each pair ran in the worktree, on the machine of the heading, one after the other. "Before" is `main`'s `build.xml` (`ant -f tmp/build-old.xml -Dbasedir=<worktree>` where the new one was already in place), "after" this branch's.

### 5.1 `ant compileAll` with nothing changed (items 2 and 3)

Before, load 0.82, the caches holding what one walk run of `BooleanOps.fss` left (45 files, 24 MB):

    Target cleanCache: finished ... (24)
    Target compileCommon: finished ... (1699)
    Target compileAll: finished ... (18887)
    java: finished ... (18776)        <- scalac
    BUILD SUCCESSFUL
    Total time: 20 seconds
    ls: cannot access 'default_repository/caches': No such file or directory

A second run took 20 s too. The SHA-1s of all 4,099 files of `build/` (all but `scalac-compileAll.args`) were the same before and after it: scalac and javac rewrote nothing that differs.

After, load 1.69, the caches holding the five library jars and a walk run's entries (85 files, 36 MB):

    [echo] Sources and build as the last build left them? yes
    [echo] Scala classes up to date? yes
    [echo] Caches /home/user/fortress-build-eff/default_repository/caches kept
    BUILD SUCCESSFUL
    Total time: 4 seconds

Wall 4.7 s. The 85 files and the five jars were still there, and the next walk run of `BooleanOps.fss` took 2.7 s against 16.4 s on the empty caches before. Profiled (load 1.25): `checkCaches` 2.4 s (its two fingerprints 1.1 and 1.2 s), `compileCommon` 0.5 s (`depend`), `checkScalaUptodate` 1.4 s (one fingerprint), the javac step 0.06 s. The fingerprints are now most of a build with nothing changed.

### 5.2 A change the caches depend on (item 2)

A Java edit (one line in `useful/BitsJUTest.java`), built by `ant testOnly` (5.3), load about 1:

    [echo] Sources and build as the last build left them? no
    [delete] Deleting directory /home/user/fortress-build-eff/default_repository/caches
    [javac] Compiling 1 source file to .../ProjectFortress/build
    [echo] Scala classes up to date? no
    [echo] Caches /home/user/fortress-build-eff/default_repository/caches started again, empty
    Total time: 25 seconds

The caches held 108 files with the five library jars before. Other cases, each with the same four lines:

- `build.xml` edited (the work's own edits): deleted, 22 s.
- A comment line in `compiler/NamingCzar.java`, compiled by the old `build.xml` with `-Dcache0=/nonexistent` (so the caches stayed), then reverted, with another edit of `BitsJUTest.java` pending: deleted, javac 1,617 files, 40.9 s. Here both the sources and the build directory differed from what the last build recorded; by the code, the build-directory check alone catches such a revert, since the build directory then differs from the recorded build stamp.
- After the edits were reverted and built, the build stamp was the one from before them, `21f2b962...`: 1,617 Java files and all of the Scala recompiled to the same bytes.

### 5.3 A Java edit and a test target run without `ant compileAll` (item 4)

The edit makes `BitsJUTest` fail: `assertEquals("BUILD-EFF probe: this edit fails the test", 1, 2);`. Load 0.8 to 1.4.

Before, `ant testOnly -DtestPattern=BitsJUTest` (0.8 s), the class file older than its source (18:23 against 18:55):

    [junit] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.013 sec
    BUILD SUCCESSFUL

After, the same command (25.8 s):

    [echo] Sources and build as the last build left them? no
    [javac] Compiling 1 source file to .../ProjectFortress/build
    [junit] Tests run: 2, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.014 sec
    [junit] BUILD-EFF probe: this edit fails the test expected:<1> but was:<2>
    BUILD FAILED

`testFast` and `testSystem` build the same way; their logs in section 6 open with the build.

### 5.4 `harness-one.sh` twice (item 6)

`harness-one.sh <worktree>/tmp/h1 ProjectFortress/tests/IntegerMaxNumMinNum.fss ProjectFortress/tests/IntegerOrderNumerals.fss`, load 1.4 to 1.9:

| call | header | wall | first test | `Time:` |
|---|---|---|---|---|
| 1 | `cache empty` | 17.2 s | 16.3 s | 16.96 |
| 2 | `cache filled` | 3.7 s | 2.8 s | 3.43 |
| 3 | `cache filled` | 4.0 s | 3.0 s | 3.69 |
| 4, after a comment line was added to `Library/FortressLibrary.fss` | `cache empty` | 17.2 s | | 16.94 |
| 5, the line removed, `COLD_CACHE=1` | `cache empty` | 17.1 s | | 16.85 |
| 6 | `cache filled` | 3.8 s | | 3.56 |

All six: `OK (2 tests)`, `exit=0`. The scratch folder was gone after each call; `tmp/h1.cache` held the caches and `harness.stamp` (the build stamp, then `sources <SHA-1>`).

### 5.5 Two agents, one of them sourcing env.sh (item 7)

Agent A ran `ProjectFortress/syntax_abstraction_tests/ForUse.fss`, which imports the `For` grammar, under walk with an empty private cache and its parser folders in `/tmp`. Agent B sourced env.sh every 0.3 s until A ended.

- Old env.sh (16 times): A ended with exit 1: `error: file not found: /tmp/fortress17707991139545914130rats/com/sun/fortress/parser/templateparser/TemplateParser23.java` and `RuntimeException: A compiler error occured while compiling a temporary parser.`
- New env.sh (75 times): A ended with exit 0 and printed `Ok, im done!`. Its two parser folders were still there.
- Then one of the two was dated two hours back, with everything in it. Sourcing the new env.sh removed that one and kept the other.

`junit.sh` with a live parser folder in `/tmp` (`ONE_JVM=1 ... junit.sh demo ProjectFortress/compiler_tests Compiled10.test`):

- Old: `OK (3 tests)`, header `FORTRESS_THREADS=1`; the parser folder was deleted.
- New: `OK (3 tests)`, header `FORTRESS_THREADS=4`; the parser folder was kept.

### 5.6 A seeded worktree (items 2 and 3)

`seed-worktree.sh /home/user/fortress-build-eff <scratch> -` (3 s), then `ant compileAll` in the scratch worktree: 3.9 s, `yes`, `yes`, `Caches ... kept`, the five jars still there, and `Compiled10` compiled and printed `pass`. Before, the same build deleted the seeded caches, and the worker ran the library order (100 to 110 s) before its first compiled run. The stamps do not depend on the tree's path.

## 6. The final suite runs

Every run below was started from a shell with neither `JAVA_FLAGS` nor `FORTRESS_THREADS` exported, to show that the suites no longer depend on the calling shell. Batch 10's gate is `explorations/compile-ladder/climb-batch-10/gate/summary.txt`; each comparison is a `diff` of its 52 rows (class, tests, failures, errors, skipped) with the same columns of this run's `TEST-*.txt` files.

### 6.1 The first final run, and what it found

On `3e13fabe2` (the first commit), after `ant clean` and `ant compileAll`, load 2.42 at the start: `ant testFast` ended `BUILD FAILED` after 8 min 43 s. 47 rows equal the gate; `fast-library/LibraryJUTest` ran 86 tests with 1 failure:

     run .../library_tests/TimingRungT (477ms) java.lang.StackOverflowError
    	at TimingRungT.countDown(.../library_tests/TimingRungT.fss:39)
    	at TimingRungT$task1.compute(.../library_tests/TimingRungT.fss:39)
    	at java.base/java.util.concurrent.ForkJoinTask.join(ForkJoinTask.java:669)
    	at com.sun.fortress.runtimeSystem.BaseTask.joinOrRun(BaseTask.java:170)
    Failed to satisfy run_out_contains; expected
    PASS

`TimingRungT.fss:39` is `countDown(n: ZZ32): ZZ32 = if n <= zero() then zero() else one() + countDown(n - one()) end`, called with 1,000. The code under `ProjectFortress`, `Library` and `bin` is the same as at `b5cde136e`, on which `suites-at-four-threads.md` passed this test. Its run step, 12 times each, with the track's caches:

| `FORTRESS_THREADS` | `JAVA_FLAGS` | `PASS` | `StackOverflowError` |
|---|---|---|---|
| 4 | none (`bin/run`'s `-Xmx1536m`, 1 MB thread stacks) | 4 | 8 |
| 4 | `-Xmx4g -Xss64m` (env.sh's) | 12 | 0 |
| 1 | none | 12 | 0 |

So the four-thread suites depended on the calling shell's `JAVA_FLAGS`. The fix is the second pin of 3.11 (commit `767ba4a3b`). The overflow itself is a defect to record (section 8.2).

### 6.2 After a clean build

On `767ba4a3b`:

- `ant clean` (1 s), then `ant compileAll`: `BUILD SUCCESSFUL`, 47 s, load 0.54 at the start. It regenerated the AST nodes, the parsers and `Operators.java`, and `git status` was clean afterwards.
- `ant testFast`, load 2.02 at the start: its build printed `yes`, `yes` and `kept`, then `BUILD SUCCESSFUL`, `Total time: 8 minutes 42 seconds`. 1,815 tests: compiler 1,043 (515 s), library 86 (344 s), othercompiler 263 (354 s), misc 423 over 45 classes. All 48 rows equal the gate's.
- `ant testSystem`, load 2.61 at the start: `BUILD SUCCESSFUL`, `Total time: 2 minutes 21 seconds`. Shards 131, 128, 126 and 131 tests (101, 107, 137 and 106 s), 516 in all. All 4 rows equal the gate's.

Batch 10's gate took 11 min 11 s and 3 min 46 s at one thread on a 2.8 GHz machine; `suites-at-four-threads.md` took 8 min 47 s and 2 min 17 s at four threads on this machine's type.

### 6.3 After a Java edit, without a clean build

A comment line added at the top of `interpreter/glue/prim/IntLiteral.java` (it shifts every line number, so the class changes). No `ant compileAll` by hand.

- `ant testFast`, load 4.06 at the start. Its build:

      [echo] Sources and build as the last build left them? no
      [echo] Scala classes up to date? no
      [javac] Compiling 1 source file to .../ProjectFortress/build
      [echo] Caches /home/user/fortress-build-eff/default_repository/caches started again, empty

  then `BUILD SUCCESSFUL`, `Total time: 8 minutes 57 seconds`. 1,815 tests: compiler 1,043 (510 s), library 86 (344 s), othercompiler 263 (351 s), misc 423. All 48 rows equal the gate's.
- `ant testSystem`, load 3.32 at the start. Its build printed `yes`, `yes` and `kept` (testFast had built the edit). `BUILD SUCCESSFUL`, `Total time: 2 minutes 16 seconds`. Shards 131, 128, 126 and 131 tests (103, 109, 133 and 108 s), 516 in all. All 4 rows equal the gate's.

The edit was then removed; it is not committed.

### 6.4 One per-corpus target

`ant testLibrary` on `767ba4a3b`, load 6.51 at the start (the edit just removed): its build compiled the one file back (`no`, `no`, javac 1 file, `started again, empty`), then the library track ran: 86 tests, no failure, `BUILD SUCCESSFUL`, 5 min 23 s, results in `TEST-RESULTS/fast-library/`. The build stamp afterwards was again `21f2b962...`. `testCompiler`, `testOtherCompiler` and `testQuick` were not run; they use the same macro, two or three times in parallel as `testFast` does.

## 7. Lines of the `fortress-repo` skill that this change makes wrong

The skill was not edited. Each line below is quoted from `/home/user/fortress/.claude/skills/fortress-repo/` at `428e3c07d`, with what it should say once this branch lands.

`SKILL.md`

- Line 59: "The suites run at one thread, so they do not show races." Should say: "The suites run at four threads, once each, so a race can show in them; a passing run does not prove there is none."
- Line 98: "Do not run `source explorations/experiment/env.sh` while a build or a Fortress program may be running: the script deletes files that they use." Should say: "env.sh removes only parser folders that no run can still be using, so sourcing it is safe beside other runs." Or drop the sentence.

`references/build-and-caches.md`

- Line 13: "It also deletes the caches whole, because its `compileCommon` step depends on `cleanCache`. Only a build that keeps the caches (below, "Keeping the caches through a build") skips this." Should say: "It deletes the caches only when the implementation changes. It prints `Caches <folder> kept` when the build left the implementation as it was, and `Caches <folder> started again, empty` when it changed it."
- Line 24: "The build deletes the caches for this reason." Should say: "So the build deletes the caches whenever the implementation changes."
- Line 29: "The suites build no implementation. They test the classes that are already in their tree's `ProjectFortress/build/` ..." Should say: "The suites run `ant compileAll` first, so they test the implementation as the tree's sources are now ..."
- Line 41: "... These runs use private caches (...), and need neither the library order nor warm caches: `harness-one.sh`, the gate's ladder regression (`gate.md`) and both ant suites." Should add: "`harness-one.sh` keeps its private cache beside its scratch folder between calls (`tests-running.md`)."
- Line 49: "after a build that deleted the caches, and in a tree whose caches are empty;" Should say: "after a build that printed `Caches default_repository/caches started again, empty`, and in a tree whose caches are empty;"
- Lines 87-92, on env.sh: "They leave out env.sh's last line, `rm -rf /tmp/fortress*rats`." Should say: "They leave out env.sh's removal of old parser folders."
- Line 96: "Warning: `source env.sh` can break a live run. It deletes every parser directory in `/tmp`, also the directory of a run that still uses it. ..." Should say: "`source env.sh` removes the parser folders in `/tmp` that nothing has written to for an hour and that are older than every `java` process running. It does not touch a live run's folder."
- Line 107: "On an idle machine, it takes about 25 to 60 s on a built tree, and about 80 s on a new one. ..." Should say: "With nothing changed it takes about 4 s. After an edit it takes about 25 to 60 s on an idle machine (scalac about 19 s of it), and about 50 to 80 s on a new or cleaned tree. ..."
- Line 109: "After a build that deleted the caches, run the library order before the next compiled run." Should say: "After a build that started the caches again, run the library order before the next compiled run."
- Lines 112-130, the section "Keeping the caches through a build" with `ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll`: should go. The build keeps the caches by itself when the implementation does not change. When it does change, the recipe keeps the caches only until the next plain `ant compileAll`, which deletes them because their stamp is the old build's, and every stamp check (`harness-one.sh`) treats them as not belonging to the build. In their place: one paragraph on the rule (`build.xml`, the comment "The caches and the implementation"), and "`ant cleanCache` deletes the caches whatever their stamp."

`references/tests-running.md`

- Line 29: "Neither suite builds the implementation. Each tests the classes already in `ProjectFortress/build/`, and gives no warning if they are stale." Should say: "Each suite runs `ant compileAll` first (about 4 s if nothing changed), so it never tests stale classes."
- Line 30: "Each JVM gets 768 MB, a 32 MB stack and `FORTRESS_THREADS=1`, whatever the shell exports." Should say: "... and `FORTRESS_THREADS=4`, whatever the shell exports. The compiled tests' run steps get `JAVA_FLAGS=-Xmx4g -Xss64m`, also whatever the shell exports."
- Line 36: "After you edit Java, Scala or a parser grammar (`parser/*.rats`), run `ant compileAll` in the same tree before you run a suite." Should go: the suite does it.
- Line 57: "Warning: both of these targets run `ant compileAll` first, which deletes the tree's caches." Should say: "Both run `ant compileAll` first, which deletes the caches only if the implementation changed."
- Line 78: "any behaviour above one thread, except the gate's atomic runs." Should say: "a behaviour above one thread that one run of each suite at four threads does not hit."
- Line 93: "... It uses an empty private cache." Should say: "It keeps its cache in the folder `<scratch-dir>.cache` and starts from it while the build and the library sources are those it was filled with; otherwise, or with `COLD_CACHE=1`, it starts empty. Its header says `cache filled` or `cache empty`. It runs at `FORTRESS_THREADS=4`."
- Line 95: "... A relative path fails with "tests does not exist", because the script changes to `ProjectFortress/` first." Should say: "A relative path works. The folder `<scratch-dir>.cache` beside it is kept."
- Line 97: "It takes 15 to 25 s, mostly to analyse the library." Should say: "It takes 15 to 25 s with an empty cache, mostly to analyse the library, and about 4 s with a filled one."
- Line 112, the warning that `junit.sh` sources env.sh: should go.
- Line 121: "Its JVMs take env.sh's `JAVA_FLAGS`, so they keep their parser directories in `/tmp`." Should say: "Its JVMs keep their temporary files in the tree's `tmp/` and run at `FORTRESS_THREADS=4`."
- Line 131: "To run one unit-test class: `ant testOnly -DtestPattern=BitsJUTest`. It takes about 90 s, mostly for ant to scan `build/`. It uses the tree's own caches and the shell's `FORTRESS_THREADS`." Should say: "... It builds first, about 4 s if nothing changed. It uses the tree's own caches and the shell's `FORTRESS_THREADS`." (Here the run itself took 0.8 s.)
- Line 133: "Warning: `ant testCompiler`, `ant testLibrary` and `ant testOtherCompiler` also exist, but each runs `ant compileAll` first, which deletes the tree's caches." Should say: "`ant testCompiler` (compiler and othercompiler tracks), `ant testOtherCompiler`, `ant testLibrary` and `ant testQuick` (the three) run testFast's tracks of their corpus, with the same JVMs and private caches, after the build."
- Lines 135-141, the recipe to run one track by hand: should give `ant testLibrary` (or `testOtherCompiler`, `testCompiler`) in its place.

`references/tests-writing.md`

- Line 120: "`harness-one.sh`, `junit.sh` and the suites force one thread, so run the program directly with the prefix `FORTRESS_THREADS=4`, and check its exit code and output." Should say: "`harness-one.sh`, `junit.sh` and the suites force four threads; to see one thread, run the program directly with the prefix `FORTRESS_THREADS=1`."

`references/gate.md`

- Line 31, step 3: "Run the library order (`build-and-caches.md`). ..." Should say: "If step 2's build printed `Caches default_repository/caches started again, empty`, run the library order. ..."
- Line 39: "The suites run at one thread, so they cannot see a lost update or a race in the class loader's first load." Should say: "The suites run at four threads, once each, so a rare lost update or race can pass them."

`references/compiler.md`

- Line 95: "# after any ant compileAll: the library order (build-and-caches.md)". Should say: "# after an ant compileAll that started the caches again: the library order".

`references/worktrees.md`

- Line 35: "If `ProjectFortress/src` differs from the base, the script warns ... Run `ant compileAll`, which recompiles the files that differ. Then run the library order." Is still right. It should add: "If nothing differs, `ant compileAll` keeps the seeded caches (about 4 s), and no library order is needed."

`references/interpreter.md` line 40 ("Your setup sets 1.") stays right: the per-call setup still exports `FORTRESS_THREADS=1` for direct runs.

Outside the skill, three texts still say one thread for the suites or their tools: the gate prompt of `explorations/coordinator/climb-batch-workflow.js:1839` ("The gate is pinned to one thread - env.sh:6 and, since 2026-09-19, the fastTrack and systemShard macros themselves"), `explorations/experiment/env.sh:6` (`export FORTRESS_THREADS=1`, the default for direct runs in a shell that sources it) and `explorations/coordinator/tools/count-run/count-run.sh:23`. FACTS' entry "`ant compileAll` leaves the bytecode cache holding no library jars" should name `cleanCache` as the cause (section 2) and say that the build now deletes the caches only when the implementation changes.

## 8. What was not built, and why

### 8.1 Tracks and shards that start from a filled cache (item 5): measured, not built

The measurement: right after the final cold `ant testFast` (section 6), the three compiled tracks ran again on the private caches that run had left (`tmp/warm.xml`, scratch: the `fastTrack` macro three times in parallel, no delete). The same for `ant testSystem`'s four shards. Shell without `JAVA_FLAGS`, build `767ba4a3b`.

| | cold (the suite) | warm (again on its caches) |
|---|---|---|
| compiler track | 515 s | 274 s |
| library track | 344 s | 57 s |
| othercompiler track | 354 s | 138 s |
| wall of the compiled tracks | 8 min 42 s (`testFast`, with misc) | 4 min 35 s |
| testSystem shards | 101, 107, 137, 106 s | 46, 50, 70, 50 s |
| testSystem wall | 2 min 21 s | 1 min 11 s |

What the cold tracks spend on filling: the first test of each compiled track took 137 to 139 s (`InheritedAbstractMethodStaticParamSameName` 29.6 + 107.2 s in compiler, `IntLiteralArithRung7` 139.3 s in library, `TupleCastPass` 28.4 + 108.3 s in othercompiler); that is the library's analysis and compile, a quarter to two fifths of each track. The warm runs also skip each test's own compile, which is why they save more than that.

Why it is not built:

- A warm track reuses entries by Fortress's own date check. That check has a known hole on the compiled path: compiling a program never rebuilds a library component that is already in the cache, even when its source is newer (`build-cache-exploration.md`, section 2). The library and othercompiler tracks have no test that compiles the library explicitly; only the compiler track has (`CompilerBuiltinComponent.test`, `CompilerLibraryComponent.test`). So a track seeded from an earlier run, or from `default_repository/caches`, would run a library edit's tests against the old library jars, with no warning, and the gate could pass a broken library. The same hole applies to a test's own imported test components.
- A seed that is never wrong must therefore be keyed on the build stamp and on every Fortress source the tracks read (the library, and the test folders), as `harness-one.sh`'s cache is keyed (4.1). Such a seed is valid only when neither the implementation nor the Fortress sources changed since it was filled. The gate runs only after a change, and the record already skips a gate when no code changed (`build-cache-exploration.md`, sections 4 and 5). A worker runs a suite after its own edit. So a valid seed would exist almost only for a repeated run of one code state, for example to look for a flaky test.
- A seed of the library alone (the library order into a folder, copied into each track) would be valid after a test-only edit too. Making it costs the library order, about 115 s, before the tracks start; the tracks today fill in parallel, in about 137 s. So for one run it saves about 20 s of wall time, and it adds the question whether the library order's jars equal what each track compiles for itself, which nothing here shows.

The shards: the first test of each cold shard took 35.6 to 36.3 s, four shards filling at once, and 5.8 to 7.8 s warm. So the library's fill is about 30 s of each shard's 101 to 137 s; the rest of the warm saving is each test's own analysis, reused. A seed of the library alone for walk, keyed like `harness-one.sh`'s cache (build stamp and library sources), would be as safe as that cache. Made within the run, it costs one cold walk JVM (about 17 s, section 1) before the shards start, and saves about 30 s in each of four shards that run at once: about 13 s of a 141 s suite. Kept between runs, it stays valid only until the next Java or library edit. Not built: under a tenth of `testSystem` for one more mechanism (question 5).

### 8.2 The rest

- **A way to keep the caches through a change that does not reach them.** The old `-Dcache0=/nonexistent` recipe now only postpones the deletion (section 7). A deliberate override (`-Dcaches.keep=true` that also writes the new stamp) would bring back the human judgement the record found risky (`build-cache-exploration.md`, section 6). Not built.
- **A check inside Fortress.** The build stamp guards every change made through `build.xml`. It cannot see a change to `ProjectFortress/build` made outside it (an IDE, a hand `javac`, an old `build.xml`) followed by a run and then undone before the next `ant compileAll`. Only the run time itself could refuse a caches folder whose stamp is not the build's (for example in `ProjectProperties`, beside the `ensureDirectoryExists` calls). That is a Java change. Not built.
- **Restoring the library jars after the caches are started again.** The build could run the library order (100 to 115 s) whenever it starts `default_repository/caches` again. Not built, as the brief says; it would also make every Java edit's build two minutes longer, also for workers who do not run the compiled path.
- **Deleting the parser folders in the Java source.** `RatsUtil.getTempDir` could mark its folder for deletion when the JVM exits. Not built, as the brief says.
- **A finer rule.** Section 2: each cache can depend on almost every package. A rule that keeps the caches after an edit of, say, walk's evaluator only would need a proof per cache. Not built.
- **`testCodegen`, `testSpecData`, `testNotPassing`, `testsyntax`, `testDemos`, `testParser`, `testCruiseControl`, `testUntil`** depend on `compileAll` and so now delete the caches only by the rule. They still run in `default_repository/caches`, and `testCodegen` and `testCruiseControl` run classes that reset the repository (`Shell.resetRepository`, which also deletes the stamp, so the next build starts the caches again). Not changed: the brief named testFast, testSystem and the per-corpus targets.
- **A defect in `junit.sh`'s clean step,** found in 5.5. `clean` takes the component name from the line `tests=` with `sed -n 's/^tests=//p'`. When the line has a space after `=` (`tests= Compiled10`), the name keeps it, `find -name "* Compiled10*"` matches nothing, and the entries are never removed: `Compiled10.jar` was still in `bytecode_cache` after the run. 50 of the 609 `.test` files of the three compiled corpora have the space, and 2 continue the line (`tests=\`), which fails the same way. Not fixed: it is beyond the eight items.
- **The four-thread stack overflow** (section 6.1). The run steps are pinned to the stack env.sh gives, so the suites pass whatever the shell exports. The fragility stays: a compiled program run above one thread with the JVM's default 1 MB thread stack overflows on a recursion 1,000 calls deep whose operands are forked (`library_tests/TimingRungT`, 8 of 12 runs). It is a defect of the run time's worker threads or of the code generator's forking, and it wants a ledger row; not recorded here, since the brief limits the committed paths.
- **`harness-one.sh` and `junit.sh` at a stable path with a usage line** (`testing-practices.md`, practice 5). Not built.

## Questions for the curator (decisions not taken)

1. **Land the `JAVA_FLAGS` pin with the four-thread pin.** What it changes: the suites' compiled run steps always get `-Xmx4g -Xss64m`, the values env.sh exports, whatever shell calls ant. Without it, the four-thread suites fail about two runs in three from a shell that exports no `JAVA_FLAGS` (6.1). Default: yes, and a ledger row for the overflow itself (a compiled program above one thread on the JVM's default 1 MB worker stacks), so that it is fixed in the run time and not only avoided.
2. **`harness-one.sh` and `junit.sh` at four threads.** What it changes: the two scripts that run named tests now run them at `FORTRESS_THREADS=4`, as the suites they imitate do; before, both ran at one (harness-one by its own pin, junit.sh through env.sh). A no is one line in each script. Default: yes, so that a worker's own run and the gate run the same way.
3. **The skill drops the `-Dcache0=/nonexistent` recipe.** What it changes: there is then no way to keep the caches through a change of the implementation; the build keeps them whenever the implementation does not change. The recipe now only postpones the deletion to the next build (section 7). Default: yes.
4. **Item 5 stays unbuilt.** What it changes: the tracks and shards keep starting empty. Default: yes. Revisit if repeated suite runs on one code state become common (for example, hunting flaky tests at four threads), where reusing the whole earlier run halves both suites (8.1).
5. **A walk seed for the shards.** A seed of the library alone, keyed like `harness-one.sh`'s cache, would save about 13 s of a 141 s `testSystem` per run, more when reused across runs at one code state. Default: no, for now.

## Files

- Changed: `build.xml`, `.gitignore`, `explorations/experiment/env.sh`, `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, `explorations/compile-ladder/rung-inference-walk/harness-one.sh`.
- Scratch, not committed: the worktree's `tmp/` (the measurement script and logs, the runs' logs, `build-old.xml`, `warm.xml`).
