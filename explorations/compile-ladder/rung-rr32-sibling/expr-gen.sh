#!/bin/bash
# expr-gen.sh <out-dir>: one component per line of expr-list.txt (Name<TAB>expression), each printing
# the expression's value and run-time class, with a: RR32 = narrow(1.5), b: RR32 = narrow(2.5),
# f: RR64 = asFloat(3.0), a Float, z: ZZ64 = 3, and a generic gen[\T extends Number\](x:T, y:T):T = x.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
O=${1:?usage}; mkdir -p "$O"
while IFS=$'\t' read -r n e; do
  [ -z "$n" ] && continue
  cat > "$O/X$n.fss" <<FSS
component X$n
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
    println("$n: " kind($e))
  end
end
FSS
done < "$D/expr-list.txt"
