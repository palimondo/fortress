#!/bin/bash
source /home/user/fortress/experiment/env.sh
C=explorations/run-c4/cold-cache/operators/C/caches; rm -rf $C; mkdir -p $C explorations/run-c4/cold-cache/operators/C/tmp
cd explorations/run-c4/cold-cache/operators/C/src && FORTRESS_CACHES=$C JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=explorations/run-c4/cold-cache/operators/C/tmp" exec /home/user/fortress/bin/fortress MicroGptFlatCheck.fss
