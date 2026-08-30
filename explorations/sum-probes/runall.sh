#!/bin/bash
# Runs every probe and records its output. Probes p01..p20 expect the PRISTINE
# library; p21/p22 expect a patched one (see report.md).
cd "$(dirname "$0")" || exit 1
for f in p00_hello p01_own_bigop p02_sum_overload p03_sum_unary_only p04_static_args \
         p05_local_sum p07_v_extends_number p08_hijack_bigoperator p09_hijack_nostaticargs \
         p10_default_instantiation p11_unary_matched_staticparams p12_userspace_demo \
         p13_unicode_sigma p14_import_except p15_full_sum p16_library_sugar \
         p17_generic_sugar_diag p18_except_side_effects p19_except_removes \
         p20_except_spelling_sum; do
  echo "===================== $f ====================="
  ./run.sh "$f.fss" 2>&1 | head -12
done
