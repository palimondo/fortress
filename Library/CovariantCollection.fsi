(*******************************************************************************
    Copyright 2008, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************)

api CovariantCollection

opr APPCOV[\T, A extends T, B extends T\](a: CovariantCollection[\A\], b: CovariantCollection[\B\]): CovariantCollection[\T\]

opr APPCOV(a: AnyCovColl, b: AnyCovColl): AnyCovColl

trait AnyCovColl
    abstract dirtyIAF[\R\](a:ImmutableArray[\R,ZZ32\], i:ZZ32): ()
end

trait CovariantCollection[\T\] extends AnyCovColl
        comprises { Empty[\T\], NonEmpty[\T\] }
    abstract opr | self |: ZZ32
    toImmutableArray(): ImmutableArray[\T, ZZ32\]
    toArray(): Array[\T, ZZ32\]
    assignToArray(res: Array[\T, ZZ32\]): ()
    abstract cata[\R\](e: R, s: (T -> R), a: ((ZZ32, R, R) -> R)): R
end

trait AnyEmpty extends AnyCovColl end

object Empty[\T\] extends { AnyEmpty, CovariantCollection[\T\] }
    getter isEmpty(): Boolean

    opr | self |: ZZ32
    cata[\R\](e: R, s: (T -> R), a: ((ZZ32, R, R) -> R)): R
end

trait NonEmpty[\T\] extends CovariantCollection[\T\]
    getter isEmpty(): Boolean
end

trait AnySingleton extends AnyCovColl
    abstract getter x(): Any
end

object Singleton[\T\](x: T) extends { AnySingleton, NonEmpty[\T\] }
    opr | self |: ZZ32
    cata[\R\](e: R, s: (T -> R), a: ((ZZ32, R, R) -> R)): R
end

object CVReduction[\T\] extends MonoidReduction[\AnyCovColl\]
    empty(): AnyCovColl
    join(a: AnyCovColl, b: AnyCovColl): AnyCovColl
end

CVSingleton(a: Any): AnyCovColl

covariantCompr[\T, R\](unwrap: (AnyCovColl -> R)):
    Comprehension[\T, R, AnyCovColl, AnyCovColl\]

end
