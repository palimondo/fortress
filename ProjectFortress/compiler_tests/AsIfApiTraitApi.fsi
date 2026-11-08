(* The api of XXXAsIfApiTraitCompiled: a trait that declares a functional method twice. *)
api AsIfApiTraitApi

trait S
    tag(self, n: ZZ32): String
    tag(self, s: String): String
end

end
