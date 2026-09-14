(* FlatData -- the loaders and the corpus for MicroGptFlat (Run C4). *)
api FlatData
import FlatArrays.{...}

parseFloat(s: String): RR64
numbersOf(line: String): Array[\RR64,ZZ32\]
readLines(path: String): Array[\String,ZZ32\]
readVector(path: String, n: ZZ32): Array[\RR64,ZZ32\]
loadParams(dir: String, name: ZZ32 -> String, count: ZZ32, total: ZZ32): Array[\RR64,ZZ32\]

(* the corpus: one padded integer matrix (documents x block+1) and a length per document *)
object Corpus(tokm: Array[\ZZ32,(ZZ32,ZZ32)\], len: Array[\ZZ32,ZZ32\], blk: ZZ32)
    size(): ZZ32
    length(d: ZZ32): ZZ32
    token(d: ZZ32, j: ZZ32): ZZ32
    tokens(b: Array[\ZZ32,ZZ32\], off: ZZ32): Array[\ZZ32,ZZ32\]
    positions(b: Array[\ZZ32,ZZ32\]): Array[\ZZ32,ZZ32\]
    valid(b: Array[\ZZ32,ZZ32\]): Array[\RR64,ZZ32\]
end
loadCorpus(path: String, blk: ZZ32, bos: ZZ32): Corpus
end
