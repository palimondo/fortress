api OmittedMethodReturnTypeFromApi

object Red end
object Blue end
object P
  pick(): ZZ32
  pick(x: String): String
  pick(r: Red): ZZ32
  pick(b: Blue): String
  choose(self, r: Red): ZZ32
  choose(self, b: Blue): String
end

end
