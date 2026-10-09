# The base build, seeded worktrees and the old code

**seeding**
: Making a worktree with a copy of the build and caches of a built, clean worktree. `seed-worktree.sh` makes the copy and rewrites the paths in it (`SKILL.md`, "The caches").

**base build**
: Clean worktree at the base, built in place by ant, or seeded. Every other worktree is seeded from it.

**old code**
: Base's code, run from the base build with a private caches folder.

Once the base build is built, run its code only as "Running the old code" says, with a private caches folder outside it. Any other run writes into the caches that every worktree is seeded from.

## Finding or building a base build

- If your brief names a base build, use it.
- If not, look in `git worktree list`. Earlier base builds are at paths such as `/home/user/fortress-base<N>`. A worktree can be your base build if it passes three checks:
  - `git -C <it> rev-parse HEAD` prints your base;
  - `git -C <it> status --porcelain` prints nothing;
  - it holds `default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar`.
- If no worktree passes them, build one at a path of your own, outside the main tree. It takes about 200 s: start the build and the library order detached, with the `nohup` line of `session.md`, "Long commands". `<base-commit>` is your base: the commit that your brief names, else your tree's `HEAD` when you start. Say so in your report.

      git worktree add --detach <base-build> <base-commit>
      cd <base-build>          # then set up the call as build-and-caches.md says
      ant compileAll
      # then the library order (build-and-caches.md), then this walk run, which warms walk's caches:
      bin/fortress ProjectFortress/tests/BooleanOps.fss
      git status --porcelain   # must print nothing: the seeding script refuses a base build that is not clean

If you check a fix against its old code, use a base build at the commit that the fix starts from. If a brief names the fix's base, the fix starts there. If not, the fix starts from `git merge-base <its branch> main`, or from the parent of its first commit on `main`.

## Seeding a worktree

A build, and a run of `bin/fortress` without a private caches folder, walk's too, write into the caches of the tree that they run in. So build and run only in a tree whose caches no other agent uses. Your brief says where you work. If your work builds or runs code and your brief gives you no tree of your own, seed a worktree of your own instead of building one. Then work only there.

Seeding takes about 3 s and 206 MB of disk. The new worktree runs walk and the compiled path right away, with the library already compiled.

    explorations/coordinator/tools/seed-worktree.sh <base-build> <new-worktree> <branch> [<start-point>]

- The script checks out `<branch>`: a local branch, else origin's, else a new branch cut from `<start-point>`, by default the base build's commit. With `-`, it makes a detached worktree at `<start-point>`.
- If the script exits 2, the base build is not built or not clean, and the script made nothing. Then make the worktree with `git worktree add`, build it yourself, and say so in your report.
- If the worktree already exists, the script keeps its branch. If it already has a build, the script keeps that too. `SEED_FORCE=1` replaces it.
- If you start in a worktree that has no build, seed it in place: name it as `<new-worktree>`, and its branch as `<branch>`.
- The script lists the library sources that differ from the base build's commit. Before a compiled run, take for each the step that `build-and-caches.md`, "After an edit of the library", gives.
- If the script warns that the copied build is the base's, run `ant compileAll`, then the library order. Without the warning, `ant compileAll` keeps the seeded caches.
- If another agent seeded your worktree, make the script's two lists yourself: `git diff --name-only <base> -- Library ProjectFortress/LibraryBuiltin` for the library sources, and `git diff --name-only <base> -- ProjectFortress/src ProjectFortress/astgen build.xml` for the warning.
- Reuse another tree's build or caches only through this script.

## Running the old code

If your worktree holds an edit and you need the base's behaviour, run the old code instead of reverting your edit. For example, see a test fail, or compare a program's old and new output.

`old-fortress.sh` runs the base build's `bin/fortress`. It sets `FORTRESS_HOME` to the base build and `FORTRESS_CACHES` to the private caches folder that you name, over your settings. Name a folder inside your worktree's `tmp/`:

    OLD=explorations/coordinator/tools/old-fortress.sh
    $OLD <base-build> <worktree>/tmp/old-caches compile P.fss     # the compiled path ...
    $OLD <base-build> <worktree>/tmp/old-caches run P             # ... then the run
    $OLD <base-build> <worktree>/tmp/old-caches P.fss             # walk
    $OLD <base-build> <worktree>/tmp/old-caches junit <worktree>/ProjectFortress/compiler_tests/X.test [Y.test ...]   # compiled .test files, in one JVM

- Any copy of the tool works, because it runs the base build that its first argument names.
- On first use, it fills the private folder with a copy of the base build's caches (36 MB, 0.04 s). Later runs use the same folder.
- Every cache file that a run writes goes to the private folder, and nothing else that it writes under the base build stays. So several agents can run the old code at once.
- Keep your programs outside the base build too, because a program writes its own logs beside it. The tool refuses a private folder inside the base build (exit 2).

To run interpreter tests on the old code, run the base build's `harness-one.sh` with `FORTRESS_HOME` set to the base build:

    FORTRESS_HOME=<base-build> <base-build>/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
        <worktree>/tmp/old-harness <worktree>/ProjectFortress/tests/X.fss

The `run` step of a compiled `.test` is a separate `bin/fortress run` process. It inherits `FORTRESS_HOME` and `FORTRESS_CACHES`, and takes its class path from `FORTRESS_CACHES`. If you compose a harness run by hand with `-Dfortress.caches=<folder>`, set `FORTRESS_CACHES` to the same folder. Otherwise the `run` step fails with "Could not load ... Resource not found".
