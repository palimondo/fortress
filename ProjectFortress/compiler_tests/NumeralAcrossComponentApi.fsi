(* The api of NumeralAcrossComponent: a number type of a program whose numeral coercion its component declares. *)
api NumeralAcrossComponentApi

object Wide(z: ZZ)
    coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])
end

end
