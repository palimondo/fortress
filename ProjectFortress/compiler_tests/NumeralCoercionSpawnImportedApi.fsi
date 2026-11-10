(* A type whose coercion from a numeral starts a task, and a function whose body is a numeral's place at it. *)
api NumeralCoercionSpawnImportedApi

object Cell(s: String)
  coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])
end

made(): Cell

end
