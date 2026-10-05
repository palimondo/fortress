# The base, worktrees seeded from its build, and the old code beside the new

Read this part if you need a worktree of your own, or the behaviour of the code before your edit.

## The base and the base build

The base is the commit that your work starts from. In a batch, it is the commit that every rung's branch starts from, and the brief names it. Outside a batch, it is the commit under your first change.

The base build is a clean worktree at the base, built once in place by ant. Every other worktree of the work is seeded from it, and the old code runs from it. After it is built, do not compile, build or run anything in it, except through `old-fortress.sh` (below).

- In a batch, the coordinator makes the base build before the launch, at a path such as `/home/user/fortress-base<N>`. The brief names it.
- Outside a batch, `git worktree list` shows the worktrees on the machine. A worktree can be your base build if `git -C <it> rev-parse HEAD` prints your base, `git -C <it> status --porcelain` prints nothing, and it holds `default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar`.
- If no worktree qualifies, build one at a path of your own, outside the main tree. It takes about 200 s. Say so in your report.

      git -C /home/user/fortress worktree add --detach <base-build> <base-commit>
      cd <base-build>          # then set up the call as build-and-caches.md says
      ant compileAll
      # then the library order (build-and-caches.md), then this walk run, which warms walk's caches:
      bin/fortress ProjectFortress/tests/BooleanOps.fss
      git status --porcelain   # must print nothing: the seeding script refuses a base build that is not clean

If you check another worker's fix against its old code, the base build's commit must be the commit that the fix starts from. Read the base build's commit with `git -C <base-build> rev-parse HEAD`. In a batch, the fix starts from the brief's base. Otherwise, it starts from `git merge-base <its branch> main`, or from the parent of its first commit on `main`. Old code from another commit measures another tree.

## Worktrees seeded from the base build

Seed a worktree instead of building it. Seeding takes about 3 s and 206 MB. The new worktree runs walk and the compiled path at once, with the library already compiled:

    explorations/coordinator/tools/seed-worktree.sh <base-build> <new-worktree> <branch> [<start-point>]

- `<branch>` is a local branch, or else origin's branch, or else a new branch cut from `<start-point>` (default: the base's commit). With `-`, the script makes a detached worktree.
- If the script exits 2, the base build is not built or not clean, and the script made nothing. Then make the worktree with `git worktree add`, build it yourself, and say so in your report.
- If the worktree already has a build, the script leaves it, so a relaunch keeps its own build. `SEED_FORCE=1` replaces the build.
- The script lists the library sources that differ from the base. Recompile them (`build-and-caches.md`) before a compiled run.
- If `ProjectFortress/src` differs from the base, the script warns: the copied build is the base's. Run `ant compileAll`, which recompiles exactly the files that differ. Then run the library order.
- The base build's file dates must be a build's dates. So the base build must be built in place by ant, or seeded by this script.

Do not symlink or plainly copy another tree's build or caches. Cache entries are keyed by absolute path, and with a symlinked build every cache path resolves to the other tree. The script translates the paths.

Two agents must never compile into one cache, because every compile rewrites cache files of the tree that it runs in.

- A rung worker makes its worktree with this script, as its brief says, and works only there.
- A worker launched alone works where its brief says, often in the main tree. If its task needs a build of its own, it seeds a worktree of its own.

Put scratch under `<worktree>/tmp/`, which is gitignored. Set up each call as `build-and-caches.md` says, and check that `echo $FORTRESS_HOME` prints your worktree.

Two lines of the untracked `.git/info/exclude` keep the main tree's `.claude/worktrees/` and `.claude/agents/` out of `git status`. A fresh clone lacks these lines, so these paths show as untracked there. Never commit them.

## The old code beside the new

You may need the base's behaviour after your worktree holds an edit: to see a test fail, or to compare a program's old and new output. Do not revert and rebuild your worktree for this. Run the base build through `old-fortress.sh`, with a private caches folder inside your worktree's `tmp/`:

    T=explorations/coordinator/tools/old-fortress.sh
    $T <base-build> <worktree>/tmp/old-caches compile P.fss     # the compiled path ...
    $T <base-build> <worktree>/tmp/old-caches run P             # ... then the run
    $T <base-build> <worktree>/tmp/old-caches P.fss             # walk
    $T <base-build> <worktree>/tmp/old-caches junit <worktree>/ProjectFortress/compiler_tests/X.test   # a compiled .test

To run the interpreter harness on the base's code, with its own scratch caches:

    FORTRESS_HOME=<base-build> <base-build>/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
        <worktree>/tmp/old-harness <worktree>/ProjectFortress/tests/X.fss

- The tool sets `FORTRESS_HOME` to the base build and `FORTRESS_CACHES` to the private folder, over your settings. A compiled `.test` runs its `run` step as a separate `bin/fortress run` process, which inherits both variables.
- On first use, the tool fills the private folder with a copy of the base build's caches (36 MB, 0.04 s). Later runs use the same folder.
- Every cache file that a run writes goes to the private folder. Nothing that a run writes under the base build stays: the parser removes its empty error logs beside a library source at once. So several such runs at once, from several agents, are safe.
- Keep the private folder and your programs outside the base build. The tool refuses a folder inside it (exit 2), and a program writes its own logs beside the program.
- Do not run the base build's `bin/fortress` without the tool. Do not point `FORTRESS_CACHES` at the base build's own `default_repository/caches`. Either compiles into the caches that every worktree is seeded from.
- Any copy of the tool works, because it runs the base build that its first argument names.

If you compose a harness run by hand with a private cache (`-Dfortress.caches=<folder>`), set `FORTRESS_CACHES` to the same folder. The one-track command in `tests-running.md` does this. The reason: the `run` step of a compiled `.test` takes its class path from `FORTRESS_CACHES`. Without it, the step fails with "Could not load ... Resource not found".
