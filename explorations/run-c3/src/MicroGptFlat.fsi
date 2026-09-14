(* MicroGptFlat -- Karpathy's microGPT in native Fortress arrays, the data laid
   out after Hsu's "Designing Your Data": one flat parameter vector whose nine
   matrices are views, one integer corpus matrix, one pure step, Adam as
   whole-vector expressions. See explorations/run-c3/design.md. *)
api MicroGptFlat
import FlatData.{...}

(* the layout: nine matrices, row-major, in this order inside the flat vector *)
matName(i: ZZ32): String
matRows(i: ZZ32): ZZ32
matCols(i: ZZ32): ZZ32
matOffset(i: ZZ32): ZZ32
nParams(): ZZ32

(* the corpus, loaded once at component initialisation *)
corpus: Corpus

(* the step: batch keys -> (loss, flat gradient in the layout of p) *)
step(p: Array[\RR64,ZZ32\], b: Array[\ZZ32,ZZ32\]): (RR64, Array[\RR64,ZZ32\])

(* Adam over flat state: (p, m, v) -> (p', m', v'); t counts from 1 *)
adam(p: Array[\RR64,ZZ32\], m: Array[\RR64,ZZ32\], v: Array[\RR64,ZZ32\],
     g: Array[\RR64,ZZ32\], t: ZZ32, lr: RR64): (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\], Array[\RR64,ZZ32\])
learningRate(s: ZZ32): RR64
end
