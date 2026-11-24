api CovTraits
trait S comprises { U, V } end
trait T comprises { V, W } end
trait U extends S excludes W end
trait M extends { S, T } comprises { V } end
trait V extends M end
trait W extends T end
object Vo extends V end
trait LeftResult end
trait RightResult end
object LeftOnly extends LeftResult end
object RightOnly extends RightResult end
object BothResult extends { LeftResult, RightResult } end
end
