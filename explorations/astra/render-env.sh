# Source from the repository root, after experiment/env.sh.
export USE_EMACS="$PWD/experiment/render-tools/emacs"
export PATH="$PWD/experiment/render-tools:$PATH"
export TEXINPUTS=".:$PWD/Fortify:"
export TEXMFHOME='{/tmp/fortress-render-tools/usr/share/texmf,/tmp/fortress-render-tools/usr/share/texlive/texmf-dist}'
export PYTHONPATH="/tmp/fortress-render-python${PYTHONPATH:+:$PYTHONPATH}"
