#!/bin/bash
# harness-one.sh <scratch-dir> <file.fss>... : rung C's harness-one.sh (explorations/compile-ladder/
# rung-interp-coercion/, itself rung I's shape): the testSystem harness (SystemJUTest, the class build.xml's
# testSystem shards run) over a directory holding only the named test files, with the JVM settings of
# build.xml's systemShard macro and a private cache. Run from FORTRESS_HOME with explorations/experiment/env.sh.
#
# The scratch directory is deleted when the call starts and when it ends. The private cache is the folder
# <scratch-dir>.cache beside it, kept between calls. A call starts from what that folder holds when it was
# filled under the implementation now built (ProjectFortress/build/implementation.stamp, which ant compileAll
# writes) and from the Fortress sources now on the source path outside the scratch directory (the .fss and
# .fsi files of Library, ProjectFortress/LibraryBuiltin, ProjectFortress/test_library and ProjectFortress);
# otherwise it empties the folder first. COLD_CACHE=1 empties it in any case. The folder is stamped only when
# the JVM ends normally, so a call that is killed leaves it to be emptied by the next one.
set -u
S=$(realpath -m -- "${1:?scratch dir}") ; shift
FH=${FORTRESS_HOME:?}
C=$S.cache
BUILT=$FH/ProjectFortress/build/implementation.stamp
sources_key () {
    ( cd "$FH" && { find Library ProjectFortress/LibraryBuiltin ProjectFortress/test_library -type f -name '*.fs[si]' -print0
                    find ProjectFortress -maxdepth 1 -type f -name '*.fs[si]' -print0 ; } \
        | sort -z | xargs -0 -r sha1sum | sha1sum | cut -c1-40 )
}
key () { [ -f "$BUILT" ] && echo "$(head -1 "$BUILT") sources $(sources_key)" ; }
rm -rf "$S" ; mkdir -p "$S/tests" "$S/tmp"
KEY=$(key)
if [ -z "${COLD_CACHE:-}" ] && [ -n "$KEY" ] && [ "$(cat "$C/harness.stamp" 2>/dev/null)" = "$KEY" ]; then
    CACHE=filled
else
    rm -rf "$C" ; mkdir -p "$C" ; printf '\0\0\0\0' > "$C/global.map" ; CACHE=empty
fi
rm -f "$C/harness.stamp"
for f in "$@" ; do cp "$f" "$S/tests/" ; done
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
echo "# harness-one $(date -u +%FT%TZ); tree $(git -C "$FH" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=4; cache $CACHE"
cd "$FH/ProjectFortress" && FORTRESS_THREADS=4 FORTRESS_JUNIT_VERBOSE=1 FORTRESS_CACHES="$C" \
  java -Xmx768m -Xss32m -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$C" -Dtests="$S/tests" \
       -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | grep -v '^\s*at ' | sed "s#$FH/##g"
RC=${PIPESTATUS[0]}
echo "exit=$RC"
# The cache is stamped only if the run ended normally and nothing it is keyed on changed meanwhile.
[ "$RC" = 0 ] && [ -n "$KEY" ] && [ "$(key)" = "$KEY" ] && echo "$KEY" > "$C/harness.stamp"
rm -rf "$S"
