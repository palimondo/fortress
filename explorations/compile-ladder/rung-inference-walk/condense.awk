# condense.awk: walk-run.sh's output with each program's printed lines, the first two lines of an error
# (its class and message) and the exit code; the context lines, the launcher's hint and the scratch paths dropped.
/^# walk-run/ { print; next }
/^== / { print; err = 0; next }
/^rc=/ { print "   " $0; next }
/^com.sun.fortress.exceptions/ { err = 2; sub(/^com.sun.fortress.exceptions./, ""); print "   ! " $0; next }
err > 0 { err--; if ($0 !~ /^Context:/) print "   ! " $0; next }
/^(Context:|toplevel:|Turn on|java.lang.Throwable|tmp\/walk-run)/ { next }
NF { print "   " $0 }
