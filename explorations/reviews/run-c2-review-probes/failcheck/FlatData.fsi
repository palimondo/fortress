(* FlatData -- the loaders of Run C: a float parser, a whitespace tokenizer,
   text files as lines, vectors and matrices, and the corpus as one padded
   integer matrix with a length per document. *)
api FlatData

parseFloat(s: String): RR64
numbersOf(line: String): Array[\RR64,ZZ32\]
readLines(path: String): Array[\String,ZZ32\]
readVector(path: String, n: ZZ32): Array[\RR64,ZZ32\]
readMatrix(path: String, rows: ZZ32, cols: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]

(* the corpus (documents x width), padded with pad, and 1 + each name's length *)
loadCorpus(path: String, width: ZZ32, pad: ZZ32): (Array[\ZZ32,(ZZ32,ZZ32)\], Array[\ZZ32,ZZ32\])

end
