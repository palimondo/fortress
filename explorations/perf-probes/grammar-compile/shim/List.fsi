(* PROBE-ONLY SHIM, second and last.  Library/List.fsi has NO imports, so the
   six names it needs -- Maybe, HasRank, Comprehension, BigReduction,
   MonoidReduction, LexicographicOrder -- can only reach it through the implicit
   prelude, which in the compiler's world is CompilerLibrary + CompilerBuiltin +
   AnyType, and none of them declares any of the six (Maybe is present in
   CompilerLibrary.fsi:194-202 but commented out).  Rather than shadow the
   compiler's own prelude, this shadows List with the one declaration
   FortressAst.fsi and FortressSyntax.fsi actually annotate with. *)
api List

trait List[\E\] extends Object
    getter size(): ZZ32
end

emptyList[\E\](): List[\E\]
opr <|[\E\] xs: E... |>: List[\E\]

end
