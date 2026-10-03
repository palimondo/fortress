(*******************************************************************************
    Copyright 2008, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************)

api String

  concatAndBalanceIfNecessary(s1: String, s2: String): String

  trait Concatenable extends String
  end

  trait Balanceable extends String
  end

  object CatString(first: String, second:String) extends {Concatenable, Balanceable}
  end

  value object EmptyString extends {String, Concatenable}
  end

  object SubString(baseString: String, range: Range[\ZZ32\]) extends {Concatenable, DelegatedIndexed[\Char, ZZ32\]}
  end
 
  object StringStats() extends Object
    getter minFlat(): ZZ32
    getter maxFlat(): ZZ32
    getter numFlat(): ZZ32
    getter ssize(): ZZ32
    getter sdepth(): ZZ32
    collectStatsFor(s: String): ()
  end StringStats

  (** A string containing n spaces **)
  spaces(n: ZZ32): String
  (** Platform-dependent line separator sequence **)
  newline: String
  doubleNewline: String
  
  (** The maximum size to which we grow a leaf node (by 
        copying) before switching to a CatString of the pieces.
        Clients may assign to this variable **)
  var maxLeafSize: ZZ32

end


