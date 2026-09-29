#!/bin/bash
# expr-all-gen.sh <out-dir>: the lines of expr-list.txt as one component, XAll.fss, one println each, with the
# helpers and bindings of expr-gen.sh; for a tree where no line is expected to end the run.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
O=${1:?usage}; mkdir -p "$O"
{
cat <<'FSS'
component XAll
export Executable

kind(v: Any): String = typecase v of
    RR32 => v.asString || " : RR32"
    RR64 => v.asString || " : RR64"
    ZZ64 => v.asString || " : ZZ64"
    ZZ => v.asString || " : ZZ"
    else => v.asString || " : other"
  end

gen[\T extends Number\](x: T, y: T): T = x

run(): () = do
    a: RR32 = narrow(1.5)
    b: RR32 = narrow(2.5)
    f: RR64 = asFloat(3.0)
    z: ZZ64 = 3
FSS
while IFS=$'\t' read -r n e; do
  [ -z "$n" ] && continue
  echo "    println(\"$n: \" kind($e))"
done < "$D/expr-list.txt"
cat <<'FSS'
  end
end
FSS
} > "$O/XAll.fss"
