# The base, worktrees seeded from its build, and the old code beside the new

## The base and the base build

The base build is a clean worktree at the base, built once in place by ant. Every other worktree of the work is seeded from it, and the old code runs from it. After it is built, compile, build or run nothing in it except through `old-fortress.sh` (below): any other run compiles into the caches that every worktree is seeded from.

- If your brief names a base build, use it. Earlier base builds are at paths such as `/home/user/fortress-base<N>`.
- If not, look in `git worktree list`. A worktree can be your base build if it passes three checks:
  - `git -C <it> rev-parse HEAD` prints your base;
  - `git -C <it> status --porcelain` prints nothing;
  - it holds `default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar`.
- If no worktree qualifies, build one at a path of your own, outside the main tree. It takes about 200 s. Say so in your report.

      git -C /home/user/fortress worktree add --detach <base-build> <base-commit>
      cd <base-build>          # then set up the call as build-and-caches.md says
      ant compileAll
      # then the library order (build-and-caches.md), then this walk run, which warms walk's caches:
      bin/fortress ProjectFortress/tests/BooleanOps.fss
      git status --porcelain   # must print nothing: the seeding script refuses a base build that is not clean

If you check a fix against its old code, use a base build at the commit that the fix starts from. Read a base build's commit with `git -C <base-build> rev-parse HEAD`. If a brief names the fix's base, the fix starts there. If not, the fix starts from `git merge-base <its branch> main`, or from the parent of its first commit on `main`.

## Worktrees seeded from the base build

Seed a worktree instead of building it. Seeding takes about 3 s and 206 MB. The new worktree runs walk and the compiled path at once, with the library already compiled:

    explorations/coordinator/tools/seed-worktree.sh <base-build> <new-worktree> <branch> [<start-point>]

- `<branch>` is a local branch, or else origin's branch, or else a new branch cut from `<start-point>` (default: the base's commit). With `-`, the script makes a detached worktree.
- If the script exits 2, the base build is not built or not clean, and the script made nothing. Then make the worktree with `git worktree add`, build it yourself, and say so in your report.
- If the worktree already has a build, the script keeps it. `SEED_FORCE=1` replaces it.
- The script lists the library sources that differ from the base. Recompile them (`build-and-caches.md`) before a compiled run.
- If `ProjectFortress/src` differs from the base, the script warns: the copied build is the base's. Run `ant compileAll`, which recompiles the files that differ. Then run the library order.
- Build a base build in place with ant, or seed it with this script: the script needs a build's file dates.

Do not symlink or plainly copy another tree's build or caches. Cache entries are keyed by absolute path, and with a symlinked build every cache path resolves to the other tree. The script translates the paths.

Do not compile into a cache that another agent compiles into: every compile rewrites cache files of the tree that it runs in. Your brief says where you work. If you need a build of your own, seed a worktree of your own and work only there.

In a fresh clone, `.claude/worktrees/` and `.claude/agents/` show as untracked: the lines of `.git/info/exclude` that hide them are not in the clone. Never commit these paths.

## The old code beside the new

If your worktree holds an edit and you need the base's behaviour, run the base build through `old-fortress.sh`. For example, use it to see a test fail, or to compare a program's old and new output. Do not revert and rebuild your worktree for this. Give the tool a private caches folder inside your worktree's `tmp/`:

    T=explorations/coordinator/tools/old-fortress.sh
    $T <base-build> <worktree>/tmp/old-caches compile P.fss     # the compiled path ...
    $T <base-build> <worktree>/tmp/old-caches run P             # ... then the run
    $T <base-build> <worktree>/tmp/old-caches P.fss             # walk
    $T <base-build> <worktree>/tmp/old-caches junit <worktree>/ProjectFortress/compiler_tests/X.test   # a compiled .test

To run the interpreter harness on the base's code, with its own scratch caches:

    FORTRESS_HOME=<base-build> <base-build>/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
        <worktree>/tmp/old-harness <worktree>/ProjectFortress/tests/X.fss

- The tool sets `FORTRESS_HOME` to the base build and `FORTRESS_CACHES` to the private folder, over your settings. The `run` step of a compiled `.test` is a separate `bin/fortress run` process, which inherits both.
- On first use, the tool fills the private folder with a copy of the base build's caches (36 MB, 0.04 s). Later runs use the same folder.
- Every cache file that a run writes goes to the private folder. Nothing that a run writes under the base build stays: the parser removes its empty error logs beside a library source at once. So several such runs at once, from several agents, are safe.
- Keep the private folder and your programs outside the base build. The tool refuses a folder inside it (exit 2), and a program writes its own logs beside the program.
- Do not point `FORTRESS_CACHES` at the base build's own `default_repository/caches`: the run would compile into the caches that every worktree is seeded from.
- Any copy of the tool works, because it runs the base build that its first argument names.

If you compose a harness run by hand with a private cache (`-Dfortress.caches=<folder>`), set `FORTRESS_CACHES` to the same folder. The `run` step of a compiled `.test` takes its class path from `FORTRESS_CACHES`. Without it, the step fails with "Could not load ... Resource not found".
