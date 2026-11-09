# Rung N, rung-numeral-types: the judge's ruling

One fix was contested: `953d050966`, a numeral at a declared return type (`Numerals.atReturn`, called from `FunctionClosure` and `MethodClosure`). Ruling: **upheld**. The rung **stands** as the branch holds it; no revert.

## The fix

At the worker's head, `Numerals.atReturn` converted a numeral whose default does not match the declared return type through `Coercions.coerce`, returned the default where `coerce` answered null, and caught every `FortressException` of the conversion to return the default (`git show 953d050966 -- ProjectFortress/src`, the removed lines `catch (FortressException ex) { // the default stands }`). The fix returns the conversion, raises 'Type mismatch returning ...' where `coerce` answers null, and lets the coercion's own exception leave the call (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:345-355`). A value that holds no numeral is returned unchecked, as before (`:346`).

## The ruling

The record settles the point, and it settles it the skeptic's way.

- Fork N7, the batch record's default for walk's places, names the declared return type among them and says what happens where the numeral does not convert: "At a chosen declaration's parameter, a typed binding, a field and a declared return type, the checker's places, a numeral converts from its exact value: ... a numeral out of the type's range refused at the place when it runs, as walk refuses one at a binding today (row 325's walk half); ... into a program's type through its coercion from the numeral type ...; else refused" (`explorations/coordinator/CLIMB-BATCH-29.md:355`). The rung's section adds: "A numeral out of range at a typed place raises there when it runs" (`CLIMB-BATCH-29.md:428`).
- P-173: "a numeral outside the type's range is refused statically; walk converts from the exact value at the same places, place by place" (`POSITIONS.md:104`). P-174: "A program's type with no coercion from the numeral type refuses a numeral" (`POSITIONS.md:105`).
- The specification counts a declared return type as a coercion context of the same standing as a typed variable and a parameter: "the right-hand sides of variable and field declarations where the left-hand sides have declared types", "arguments to functionals and constructors where the corresponding parameters have declared types", "body expressions of functionals and constructors where the return types are declared" (`Specification/basic/conversions-coercions.tex:118-127`). So a return is not a place that fixes no type, and the default, which P-173 gives only where nothing fixes a type, does not apply there.
- The library's own way at walk's other typed places is to refuse what does not convert and to let a coercion's exception propagate: the binding (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:221-227`, 'RHS expression type ... is not assignable', and `:235-237`, which rethrows), the parameter (`evaluator/values/NonPrimitive.java:256-270`, `unificationError`), the assignment (`evaluator/BaseEnv.java:313-327`, 'Type mismatch assigning'). The rung's own binding tests assert the same two refusals the fix's tests assert at a return: `NumeralOutOfRangeWalk` ('Type mismatch binding 3000000000') and `NumeralNoCoercionRefusedWalk` ('Type mismatch binding 3'). As built, the return was the one place that turned these into a value: `wide(): ZZ32 = 3000000000` answered a `ZZ64`, `made(): OnlyZ = 3` a `ZZ32` though `OnlyZ`'s one coercion is from `ZZ32` (fork C4's no chain), and a program's coercion that threw `FailCalled` answered the numeral's default.

## Each side's claims

- The worker, right: walk checks no return type of a value in general (`FunctionClosure.java:209-221` returns the body's value unchecked unless it holds a numeral), and a return without a declared type takes the default (fork N7, "Elsewhere, an untyped binding, ... it takes its default"). The fix keeps both.
- The worker, wrong: "so a numeral that does not convert there is its default" (`REPORT.md:137`). Walk's general want of return checks is not the rule for a numeral, which fork N7 decides separately and refuses at the place; nothing on record lets a conversion's exception be swallowed. `REPORT.md:137`'s second sentence no longer describes the code; this ruling and `SKEPTIC.md`, "The contested fix", hold the account that does.
- The skeptic, right on every claim it makes: the citations of fork N7 and of the section are exact, the three cases fail on the worker's head and pass after (`SKEPTIC.md`, "Fixes": "'FAIL: twelve(): Digit = 12 raises the coercion's FailCalled', ' Missing expected refusal at load' twice; after 'OK (6 tests)'"), and the suite's verdicts do not move (`SKEPTIC.md`, "The suite": "803 tests, 'BUILD FAILED' by `TupleOrderMixedRefused` alone, rung G's key").

## The fix's reach

The refusal fires only where a value holding a numeral meets a declared return type that neither matches its default nor converts it; every such program the checker refuses statically (P-173 for range, P-174 and fork C4 for a type without a coercion from the numeral type), so no well-typed program changes. No line of the one library returns a bare numeral at a type other than a number type: `grep -rnE '\)\s*:\s*[A-Z][A-Za-z0-9]*\s*=\s*-?[0-9][0-9_.]*\s*$' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss`, less the eight number types, prints one line, `Library/FortressLibrary.fss:3872: empty(): T = 0`, inside the comment that opens at `:3868`. The fix's tests keep the batch's rules: their message substrings name no class, and they assert no static argument. The fix stays in walk's numerals (`Numerals.java`, a file of the rung), outside rung G's lines of `EvaluatorBase.java` and rung S's of `Evaluator.java`.

## Decision

Stands. The fix lands with the rung.
