(* An api whose mixin trait has its self-type parameter through a self-typed trait it extends at that parameter. *)
api SelfTypeMixinApi

trait Shape[\S extends Shape[\S\]\]
    twin(self): S
end

trait Sub[\T extends Shape[\T\]\] extends Shape[\T\]
    again(self): T
end

end
