(* The api of AsIfApiTraitOverrideCompiled: a trait that declares a functional method once and a dotted method once. *)
api AsIfApiTraitOverrideApi

trait R
    stamp(self, s: String): String
    seal(s: String): String
end

end
