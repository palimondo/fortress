(* An api whose trait declares a prefix and an infix functional operator -, imported by OperatorPrefixInfixImport. *)
api OperatorPrefixInfixApi

trait Pt
  opr -(self): ZZ32
  opr -(self, other: Pt): ZZ32
end
object Pt1 extends Pt end

end
