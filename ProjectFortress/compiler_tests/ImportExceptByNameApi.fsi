(* An api declaring a second function pick, imported by name by ImportExceptByName. *)
api ImportExceptByNameApi
import ImportExceptOverloadApi.{ P }

pick(x: P): ZZ32

end
