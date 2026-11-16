(* The api of ApiPostfixExponentOpCompiled: postfix operators whose sign is an exponent operator. *)
api ApiPostfixExponentOpCompiledApi

object Sized[\nat n\]() end

opr (x: ZZ32)^T: ZZ32
opr (b: Sized[\n\])^T[\nat n\]: ZZ32
opr (s: String)^MIRROR: String

end
