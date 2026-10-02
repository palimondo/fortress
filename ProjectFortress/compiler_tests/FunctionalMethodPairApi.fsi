(* Two api traits each declare a functional method of one name, and no type of the api provides both, which the Meet Rule for functional methods accepts. *)
api FunctionalMethodPairApi

trait Fa
    pick(self): String
end
trait Fb
    pick(self): String
end

end
