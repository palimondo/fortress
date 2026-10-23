(* An api declaring a function pick, imported by ImportExceptOverload except for pick. *)
api ImportExceptOverloadApi

trait P end
object P1 extends P end
pick(x: P): ZZ32

end
