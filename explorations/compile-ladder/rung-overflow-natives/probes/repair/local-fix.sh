#!/bin/bash
# local-fix.sh: the judge's deliberate local fix of the three wrap-reliant range bodies (JUDGE.md section 7,
# instruction 1), applied to the working tree for the red demonstration only and reverted with
# git checkout -- Library/RangeInternals.fss Library/FortressLibrary.fss; prints git diff Library.
set -eu
cd "$(dirname "$0")/../../../../.."
echo "\$ bash $(dirname "$0" | sed "s#^$(pwd)/##")/local-fix.sh"
python3 - <<'PY'
p='Library/RangeInternals.fss'; s=open(p).read()
a='    CompactFullParScalarRange[\\I\\](lo,lo+ex-1)\n'; assert s.count(a)==1
s=s.replace(a,'    CompactFullParScalarRange[\\I\\](lo,lo+(ex-1))\n')
b='        res = narrow(r-l+1)\n        if res <= 1 AND: l>r then 0 else res end\n'; assert s.count(b)==1
s=s.replace(b,'        if l > r then 0 else narrow(r-l+1) end\n')
open(p,'w').write(s)
p='Library/FortressLibrary.fss'; s=open(p).read()
c="        l':ZZ32 => 0 MAX ((u - l') + 1)\n"; assert s.count(c)==1
s=s.replace(c,"        l':ZZ32 => if u < l' then 0 else (u - l') + 1 end\n")
open(p,'w').write(s)
PY
echo '$ git diff Library'
git diff Library
