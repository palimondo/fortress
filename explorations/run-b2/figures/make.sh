#!/bin/bash
# Per-definition figures rendered from the actual program source (src/MicroGPT.fss).
# Each entry: NAME|awk range (start pattern[,end pattern]) over the source.
set -e
S=../src/MicroGPT.fss
hdr='\documentclass{article}
\usepackage{fortify}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{6pt}
\begin{document}
\begin{preview}
`'
ftr='`
\end{preview}
\end{document}'
emit() { # name, then awk program(s) separated by ;;
  n="$1"; shift
  { printf '%s' "$hdr"; first=1; for prog in "$@"; do [ $first = 1 ] || echo; first=0; awk "$prog" $S; done; printf '%s\n' "$ftr"; } > "$n.tic"
  ./render.sh "$n.tic"
}
emit def_embed      '/^  embed\(/,/^  end/'
emit def_attention  '/^  attention\(/'
emit def_head       '/^  head\(/'
emit def_mha        '/^  mha\(/'
emit def_ffn        '/^  ffn\(/'
emit def_block      '/^  block\(/,/^  end/'
emit def_logits     '/^  logits\(/' '/^  loss\(/'
emit def_leaves     '/^object Transformer/,/^  d_k/'
emit def_rmsnorm    '/^rmsnorm\(/,/^end/'
emit def_softmax    '/^softmax\(/,/^end/'
emit def_relu       '/^relu\(/,/^end/'
emit def_concat     '/^concat\(/,/^end/'
emit def_nll        '/^nll\(/,/^end/'
emit def_causal     '/^causal\(/'
emit def_node       '/^value object Node/,/^end/' '/^param\(/'
emit def_rules      '/^opr \+\(A: Node, B: Node\)/,/^opr \(A: Node\)\^T/'
emit def_mat        '/^value object Mat/,/^zeros/'
emit def_params     '/^value object Params/,/^zerosLike/'
emit def_sum        '/^object PlusReduction/,/^opr SUM/'
emit def_adam       '/^beta1/,/^end/'
emit def_train      '/^trainStep\(/,/^end/'
emit def_sample     '/^choose\(/,/^end/' '/^sample\(/,/^end/'
emit def_tokenize   '/^tokenize\(/,/^  <\|/'
echo done
