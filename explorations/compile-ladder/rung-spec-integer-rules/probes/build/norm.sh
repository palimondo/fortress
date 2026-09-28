#!/bin/bash
# norm.sh PDF : pdftotext with page layout removed: number-only and roman-numeral-only lines (page numbers, chapter numbers of the TOC), TOC dot leaders with their page number, blank lines; runs of white space collapsed
pdftotext "$1" - | sed -e 's/\f//g' | grep -v -E '^[[:space:]]*([0-9]+|[ivxlc]+)?[[:space:]]*$' | sed -E -e 's/( \.)+( [0-9]+)?$//' -e 's/[[:space:]]+/ /g'
