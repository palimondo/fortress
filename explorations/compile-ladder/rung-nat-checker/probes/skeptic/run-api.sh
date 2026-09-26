#!/bin/bash
# the skeptic's export-checker probe: an api with a sized object and a sized function, its component, and a user;
# walk, then typecheck and compile of the component on the landed edit and (unedited checker as tmp/base-classes) typecheck
cd /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/skeptic/api
FH=/home/user/fortress-nat
CP=$($FH/bin/fortress_classpath 2>/dev/null | tail -1)
clean () { find $FH/default_repository/caches -name "*SkSized*" -exec rm -rf {} + 2>/dev/null; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable' | head -${1:-20}; }
clean
echo "########## walk: fortress SkSizedUse.fss"
timeout 300 $FH/bin/fortress SkSizedUse.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
clean
echo "########## fortress typecheck SkSizedApi.fss (the component against its api; landed edit)"
timeout 300 $FH/bin/fortress typecheck SkSizedApi.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
clean
echo "########## fortress compile SkSizedApi.fss (landed edit)"
timeout 300 $FH/bin/fortress compile SkSizedApi.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
echo "########## fortress compile SkSizedUse.fss (landed edit, after the component)"
timeout 300 $FH/bin/fortress compile SkSizedUse.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
clean
echo "########## fortress typecheck SkSizedApi.fss (unedited checker, tmp/base-classes first on the classpath)"
timeout 300 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$FH/tmp -cp "$FH/tmp/base-classes:$CP" com.sun.fortress.Shell typecheck SkSizedApi.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
clean
