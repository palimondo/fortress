(* Q1 probe 7 (part 1 of 2): type alias in an API.
   Spec: Specification/basic/components/apis.tex:29 lists TypeAlias among the
   AbsDecls an api may contain. *)
api p7_alias_api

type Idx = ZZ32

bump(i: Idx): Idx

end
