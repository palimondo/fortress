(* Two types whose numeral coercions put the number v at a ZZ32 and at an RR64 parameter. *)
api NumeralCoercionNumberRangeImportedApi

value object Wide(w: ZZ32)
  coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])
end

value object Approx(a: RR64)
  coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])
end

end
