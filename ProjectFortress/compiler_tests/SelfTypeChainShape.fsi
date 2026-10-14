(* A self-typed trait, the first of three apis whose mixin traits are read together. *)
api SelfTypeChainShape

trait Shape[\S extends Shape[\S\]\]
    twin(self): S
end

end
