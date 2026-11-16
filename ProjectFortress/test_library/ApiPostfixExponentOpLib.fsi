(* A postfix operator whose sign is an exponent operator, declared in an api. *)
api ApiPostfixExponentOpLib

object Sized[\nat n\]() end

trait Turned
    opr (self)^T: ZZ32
end

object Quarter extends Turned end

opr (x: ZZ32)^T: ZZ32
opr (b: Sized[\n\])^T[\nat n\]: ZZ32
opr (s: String)^MIRROR: String
bump(x: ZZ32): ZZ32

end
