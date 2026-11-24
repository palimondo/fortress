(* A type whose numeral coercion puts its number v at a ZZ32 parameter. *)
api NumeralCoercionNumberRangeImportedApi

value object Wide(w: ZZ32)
  coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])
end

end
