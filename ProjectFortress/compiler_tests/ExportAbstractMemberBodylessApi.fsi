(* The api of ExportAbstractMemberBodyless: a trait with an abstract method f, and a function that makes a T. *)
api ExportAbstractMemberBodylessApi

trait T
    abstract f(): ZZ32
end

mk(): T

end
