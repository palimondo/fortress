(* The api of XXXExportOperatorHeader: a top-level operator # that answers a trait A. *)
api XXXExportOperatorHeader

trait A end
object B extends A end

opr #(a: String, b: String): A

end
