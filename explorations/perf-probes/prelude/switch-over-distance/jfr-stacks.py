#!/usr/bin/env python3
"""jfr-stacks.py <recording.jfr> : where the execution samples of a JFR recording fall.

Runs `jfr print --events jdk.ExecutionSample --stack-depth 200` and reads each sample's
stack.  Prints, over all samples:
  * the top frame (self time), the 25 commonest;
  * every method of com.sun.fortress, scala_src included, counted once per sample in which
    it appears anywhere on the stack (inclusive share), the 60 commonest;
  * the samples by the first com.sun.fortress frame below the JDK and Scala library frames.
Line numbers are dropped, so a method is counted whatever line it was sampled at."""
import collections, re, subprocess, sys

out = subprocess.run(["jfr", "print", "--events", "jdk.ExecutionSample", "--stack-depth", "200", sys.argv[1]],
                     capture_output=True, text=True).stdout
FRAME = re.compile(r"^\s+([\w$.<>/]+)\(.*\)\s+line:")
samples, cur, inside = [], None, False
for line in out.splitlines():
    if line.startswith("jdk.ExecutionSample"):
        cur = []; samples.append(cur); inside = False
    elif "stackTrace = [" in line:
        inside = True
    elif inside:
        m = FRAME.match(line)
        if m: cur.append(m.group(1))
        elif line.strip().startswith("]"): inside = False
n = len(samples)
print("# %s: %d execution samples" % (sys.argv[1].split("/")[-1], n))
if not n: sys.exit(0)
top = collections.Counter(s[0] for s in samples if s)
print("\n## top frame (self), 25 commonest")
for m, c in top.most_common(25): print("%6d %5.1f%%  %s" % (c, 100.0 * c / n, m))
incl = collections.Counter()
for s in samples:
    for m in set(f for f in s if f.startswith("com.sun.fortress")): incl[m] += 1
print("\n## com.sun.fortress methods anywhere on the stack (inclusive), 60 commonest")
for m, c in incl.most_common(60): print("%6d %5.1f%%  %s" % (c, 100.0 * c / n, m))
first = collections.Counter()
for s in samples:
    f = next((x for x in s if x.startswith("com.sun.fortress")), "(none)")
    first[f] += 1
print("\n## first com.sun.fortress frame from the top, 25 commonest")
for m, c in first.most_common(25): print("%6d %5.1f%%  %s" % (c, 100.0 * c / n, m))
