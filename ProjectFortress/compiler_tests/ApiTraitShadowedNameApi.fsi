(* The api of ApiTraitShadowedNameCompiled: a trait B with a functional method, below a trait C that the test imports alone. *)
api ApiTraitShadowedNameApi

trait B
    tag(self, x: Object): String
end

trait C extends B end

end
