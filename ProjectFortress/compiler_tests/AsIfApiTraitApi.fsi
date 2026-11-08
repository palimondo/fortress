(* The api of XXXAsIfApiTraitCompiled: a trait that declares a functional method twice and a dotted method twice. *)
api AsIfApiTraitApi

trait S
    tag(self, n: ZZ32): String
    tag(self, s: String): String
    m(n: ZZ32): String
    m(s: String): String
end

end
