(* An api declaring a top-level operator -, imported by XXXImportExceptOperator except for -. *)
api ImportExceptOperatorApi

trait Pm end
object Pm1 extends Pm end
opr -(x: Pm, y: Pm): ZZ32

end
