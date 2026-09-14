#!/usr/bin/env bash
# Run the APL test suite via Dyalog in script mode.
# Assumes dyalog is on PATH or at the default Windows install path.
#
# Usage:
#   ./run_tests.sh                  # run all tests
#   ./run_tests.sh forward_kv       # run a specific test

set -euo pipefail

cd "$(dirname "$0")"

DYALOG_CANDIDATES=(
    "dyalog"
    "/c/Program Files/Dyalog/Dyalog APL-64 20.0 Unicode/dyalog.exe"
    "/c/Program Files/Dyalog/Dyalog APL 20.0 Unicode/dyalog.exe"
)

DYALOG=""
for c in "${DYALOG_CANDIDATES[@]}"; do
    if command -v "$c" >/dev/null 2>&1 || [ -x "$c" ]; then
        DYALOG="$c"
        break
    fi
done

if [ -z "$DYALOG" ]; then
    echo "dyalog not found. Install Dyalog APL v20 (64-bit Unicode) from dyalog.com." >&2
    exit 1
fi

TEST="${1:-forward_kv}"

run_script() {
    local script="$1"
    "$DYALOG" +s -script "$script"
}

case "$TEST" in
    forward_kv)
        echo "=== test_forward_kv ==="
        run_script test_forward_kv.apl
        ;;
    forward)
        echo "=== test_forward ==="
        run_script test_forward.apl
        ;;
    backward)
        echo "=== test_backward ==="
        run_script test_backward.apl
        ;;
    gradcheck)
        echo "=== test_gradcheck ==="
        run_script test_gradcheck.apl
        ;;
    training)
        echo "=== test_training ==="
        run_script test_training.apl
        ;;
    all)
        echo "=== test_forward_kv ==="
        run_script test_forward_kv.apl
        echo ""
        echo "=== test_forward ==="
        run_script test_forward.apl
        echo ""
        echo "=== test_backward ==="
        run_script test_backward.apl
        echo ""
        echo "=== test_gradcheck ==="
        run_script test_gradcheck.apl
        echo ""
        echo "=== test_training ==="
        run_script test_training.apl
        ;;
    *)
        echo "unknown test: $TEST" >&2
        exit 2
        ;;
esac
