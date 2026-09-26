api SkWideApi

trait Wide excludes { Narrow }
  coerce(x: Narrow)
  getter big(): ZZ32
end
trait Narrow excludes { Wide }
  getter small(): ZZ32
end
object WideOf(b: ZZ32) extends Wide
  getter big(): ZZ32
end
object NarrowOf(s: ZZ32) extends Narrow
  getter small(): ZZ32
end

end
