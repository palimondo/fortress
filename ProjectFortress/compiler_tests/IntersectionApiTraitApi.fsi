(* The api of IntersectionApiTraitCompiled: a result trait whose method get it declares twice, below a trait that declares tag. *)
api IntersectionApiTraitApi

trait Tagged
    tag(): String
end

trait LeftResult extends Tagged
    left(): String
    get(n: ZZ32): String
    get(b: Boolean): String
end

end
