(* MicroGptApl -- Karpathy's microGPT written in the APL sub-language of
   explorations/apl/mg (the focused base), over Run C4's array vocabulary
   and loaders.  The api is
   Run C4's own (explorations/run-c4/src/MicroGptFlat.fsi) with the component
   name changed, so MicroGptAplCheck is MicroGptFlatCheck with one import line
   changed and its paths adjusted.  See DESIGN.md beside this file. *)
api MicroGptApl
import FlatData2.{...}

(* the layout: nine matrices, row-major, in this order inside the flat vector *)
matName(i: ZZ32): String
matShape(i: ZZ32): (ZZ32, ZZ32)
matCount(i: ZZ32): ZZ32
matOffset(i: ZZ32): ZZ32
nParams(): ZZ32

(* the corpus, loaded once at component initialisation *)
corpus: Corpus

(* the step: batch keys -> (loss, flat gradient in the layout of p) *)
step(p: Array[\RR64,ZZ32\], b: Array[\ZZ32,ZZ32\]): (RR64, Array[\RR64,ZZ32\])

(* Adam over flat state: (p, m, v) -> (p', m', v'); t counts from 1 *)
adam(p: Array[\RR64,ZZ32\], m: Array[\RR64,ZZ32\], v: Array[\RR64,ZZ32\], g: Array[\RR64,ZZ32\], t: ZZ32, lr: RR64):
    (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\], Array[\RR64,ZZ32\])
learningRate(s: ZZ32): RR64

end
