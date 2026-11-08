(* The api of TraitTableApiTraitWalk: a trait and a generic trait, each with an abstract functional method. *)
api TraitTableApiTraitWalkApi

trait C
    abstract tag(self, n: ZZ32): String
end

trait G[\T\]
    abstract gtag(self, n: ZZ32): String
end

end
