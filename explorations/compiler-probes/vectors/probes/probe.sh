# probe.sh <Name> [run args...]: compile <Name>.fss from this directory in a fresh copy of
# world.sh's cache, then run it. Run world.sh first.
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
n=$1; shift
W=$C; C=$P/c-$n; rm -rf $C; cp -a $W $C
echo "########## fortress compile $n.fss"
(cd $D && fsh compile $n.fss) 2>&1 | head -${LINES_C:-14}; echo "compile exit=${PIPESTATUS[0]}"
echo "########## fortress run $n $*"
(cd $D && frun $n "$@") 2>&1 | grep -v '^	at java.base' | head -${LINES_R:-14}; echo "run exit=${PIPESTATUS[0]}"
