(* The api of ExportAbstractGetterField: a trait with an abstract getter x, and a function that makes a T. *)
api ExportAbstractGetterFieldApi

trait T
    abstract getter x(): ZZ32
end

mk(): T

end
