(* The api of GenericTieImportedAmbiguous: two generic declarations of f at two excluding traits. *)
api GenericTieImportedAmbiguousApi

trait A excludes B end
trait B end

f[\T extends A\](x: T): ZZ32
f[\T extends B\](x: T): String

end
