# Worktrees, one build shared, and the old code beside the new

Read this when several agents work at once, or when you need the behaviour of the code before your edit.

## One build, many worktrees

Build one tree at the base commit once, and seed every other worktree from it instead of building each one.

The base build is a clean worktree at the base commit, built in place by ant, about 200 s:

    git -C /home/user/fortress worktree add --detach /home/user/fortress-base <base-commit>
    cd /home/user/fortress-base && source explorations/experiment/env.sh
    ant compileAll
    # the library order (build-and-caches.md), then warm walk's caches:
    bin/fortress ProjectFortress/tests/BooleanOps.fss

From then on nobody compiles, builds or runs anything in it except through `old-fortress.sh` (below). The seeding script refuses a base that is no longer clean.

Seeding a worktree takes about 3 s and 206 MB. The result runs walk and the compiled path at once, with the library already compiled:

    explorations/coordinator/tools/seed-worktree.sh <base-build> <new-worktree> <branch> [<start-point>]

- `<branch>`: a local branch, else origin's, else a new branch cut from `<start-point>` (default: the base's commit). `-` makes a detached worktree instead.
- Exit 2 means the base is not built or not clean, and nothing was made. Make the worktree with `git worktree add`, build it yourself, and say so.
- A worktree that already has a build is left alone, so a relaunch keeps its own build; `SEED_FORCE=1` replaces it.
- It lists the library sources that differ from the base. Recompile them (`build-and-caches.md`) before a compiled run.
- It warns when `ProjectFortress/src` differs from the base: the copied build is the base's. Run `ant compileAll` (it recompiles exactly the differing files), then run the library order.
- The base's file dates must be a build's: a base built in place by ant, or one seeded by this script.

Never symlink or plainly copy another tree's build or caches: cache entries are keyed by absolute path, and a symlinked build makes every cache path resolve to the other tree. The script translates the paths.

Each agent works only in its own worktree, and two agents never compile into one cache: every compile rewrites cache files of the tree it runs in. Scratch goes under `<worktree>/tmp/` (gitignored). Set up each shell as `build-and-caches.md` says, and check that `echo $FORTRESS_HOME` prints your worktree. Worktrees under the main tree's `.claude/worktrees/` and agent types under `.claude/agents/` are kept out of `git status` by the untracked `.git/info/exclude`, which a fresh clone lacks.

## The old code beside the new

To see how the base's code behaves once your worktree holds an edit (a test seen failing, a program compared old against new), never revert and rebuild your worktree. Run the base build through `old-fortress.sh`, with a private caches folder inside your worktree's `tmp/`:

    T=explorations/coordinator/tools/old-fortress.sh
    $T <base-build> <worktree>/tmp/old-caches compile P.fss     # compiled path ...
    $T <base-build> <worktree>/tmp/old-caches run P             # ... then run
    $T <base-build> <worktree>/tmp/old-caches P.fss             # walk

The interpreter harness on the base's code:

    FORTRESS_HOME=<base-build> <base-build>/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
        <worktree>/tmp/old-harness <worktree>/ProjectFortress/tests/X.fss

- The tool sets `FORTRESS_HOME` to the base build and `FORTRESS_CACHES` to the private folder, overriding what `env.sh` set. On first use it fills the folder with a copy of the base's caches (36 MB, 0.04 s); later runs reuse it.
- Every cache file a run writes goes to the private folder, and nothing it writes under the base stays (the parser's empty error logs beside a library source are removed at once). Several such runs at once, from several agents, are safe.
- Keep the folder and your programs outside the base build: the tool refuses a folder inside it (exit 2), and a program's own logs go beside the program.
- Never run the base build's `bin/fortress` without the tool: that compiles into the base's own caches.
- Any copy of the tool works, since it runs the base build named by its first argument.

A harness run against another build's classes must set `FORTRESS_CACHES` to that build's caches as well as passing `-Dfortress.caches`: the `run` step of a compiled `.test` is a separate `bin/fortress run` process, whose class path comes from `FORTRESS_CACHES`.
