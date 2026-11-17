(* The api of ApiTraitMethodNotFirstCompiled: a generic trait and a plain trait whose methods have their bodies in the component. *)
api ApiTraitMethodNotFirstApi

trait Ix[\E\]
    abstract one(): E
    map[\R\](f: E -> R): R
    twice(): E
end

trait Tagged
    tag(): String
    pick(self): String
end

end
