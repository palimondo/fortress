#!/usr/bin/env python3
"""wait.py FILE [SECONDS]: wait until FILE exists, at most SECONDS (default 540); print it if it does.

A Workflow agent that drives a long command runs it in the background, writing FILE when it ends, and calls
this until it prints. Exit 0 when FILE exists, 1 on timeout."""
import os, sys, time
f, limit = sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else 540
end = time.time() + limit
while time.time() < end:
    if os.path.exists(f):
        print(open(f).read()); sys.exit(0)
    time.sleep(10)
sys.exit(1)
