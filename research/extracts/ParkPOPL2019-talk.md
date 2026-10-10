<!-- Transcript of the talk "Polymorphic Symmetric Multiple Dispatch with Variance" (Gyunghee Park, Jaemin Hong, Guy L. Steele Jr., Sukyoung Ryu), given by Gyunghee Park at POPL 2019 on Thu 17 Jan 2019 in the session Type Inference I (chair: Michael Hicks), with the text of every slide. Video: https://www.youtube.com/watch?v=eqpe-VfW3F4 . Talk page: https://popl19.sigplan.org/details/POPL-2019-Research-Papers/76/Polymorphic-Symmetric-Multiple-Dispatch-with-Variance . Provenance: the ACM video's audio transcribed by Whisper large-v3 and Qwen3-ASR-1.7B, their disagreements settled against the slides and the paper (ParkPOPL2019.pdf), the slides' text from the speaker's Keynote deck; times are from the start of that audio. -->

# Gyunghee Park, "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)

## The talk

### Slide 1 of 21: Polymorphic Symmetric Multiple Dispatch with Variance

> Polymorphic Symmetric Multiple Dispatch with Variance
>
> Gyunghee Park, Jaemin Hong, Guy L. Steele Jr., Sukyoung Ryu (the speaker's name in bold); POPL'19

**Session chair (0:05):** […] Dispatch with Variance, and Gyunghee Park is going to give the talk.

**Gyunghee Park (0:10):** Yeah. Thank you for the introduction. Yeah, this talk is about Polymorphic Symmetric Multiple Dispatch with Variance. I'm Gyunghee Park, and it's a joint work with Jaemin Hong, Guy Steele, and Sukyoung Ryu.

### Slide 2 of 21: Method Overloading

> - Allows multiple method declarations with the same name
> - `add(a: Int, b: Int): Int = ⋯`
> - `add(a: Int, b: Int, c: Int): Int = ⋯`
> - `add(a: List, b: List): List = ⋯`
> - `add(a: SortedList, b: SortedList): SortedList = ⋯`
> - Diagram: List above SortedList.
> - Builds: `a: List = SortedList(2, 7)`, `b: SortedList = SortedList(1, 3, 5)`, `add(a, b)`. Arrows from the call to all four declarations. With the static types List and SortedList boxed, "Static overloading resolution" keeps one arrow, to `add(a: List, b: List)`. With the values boxed, "Dynamic overloading resolution / Dynamic dispatch" keeps one arrow, to `add(a: SortedList, b: SortedList)`.

(0:26) As you all may know, method overloading allows multiple method declarations with the same name. So the methods that logically perform very similar tasks can be defined with the same name, but with different names of parameters or different types of parameters.

Let's assume SortedList extends List, and we have these four add method declarations. And let's say we have two variables, a and b, with static types of List and SortedList and dynamic types of both SortedList. For an add method call with a and b as arguments, the language needs to decide which method declaration to invoke among the overloaded methods.

At compile time, static overloading resolution chooses a method to invoke based on the static types of the arguments. And at run time, dynamic overloading resolution or dynamic dispatch chooses a method to invoke based on the run-time types of the arguments.

### Slide 3 of 21: Dynamic Dispatch

> - Selects a method to call among overloaded methods at run time
> - `add(a: List, b: List): List = ⋯`
> - `add(a: List, b: SortedList): List = ⋯`
> - `add(a: SortedList, b: List): List = ⋯`
> - `a: List = SortedList(2, 7)`, `b: SortedList = SortedList(1, 3, 5)`, `add(a, b)`; List above SortedList.
> - Builds, each replacing the bullet:
>   - "Single dispatch: based on a single argument (receiver)". The static types point to `add(a: List, b: SortedList)`. The value of a, `SortedList(2, 7)`, points to the second and third declarations, then to `add(a: List, b: SortedList)` alone.
>   - "Asymmetric multiple dispatch: based on more than one arguments in a specific order (left to right)". Both values point to all three declarations, then to `add(a: SortedList, b: List)` alone.
>   - "Symmetric multiple dispatch: based on more than one arguments considering them equally". Both values point to all three declarations. A fourth is added, `add(a: SortedList, b: SortedList): SortedList = ⋯`, and the call points to it alone. In orange: "Can support binary methods intuitively and uniformly".

(1:30) Let's now consider a slightly different set of overloaded method to see different kinds of dynamic dispatch. So the parameter types are now List List, List SortedList, and SortedList List.

First one, single dynamic dispatch chooses a method to invoke based on the run-time type of a single argument, which usually is the receiver. So in a language with single dispatch, static overloading resolution is used to disambiguate among the overloaded methods. And then at run time, by looking at the run-time type of the receiver, variable a in this case, it first determines which class it belongs to. And then among the overloaded and possibly overridden methods, it chooses an appropriate one that was determined at compile time.

Asymmetric multiple dispatch chooses a method to invoke based on the run-time types of more than one arguments in a specific order, which usually is left to right order. So among the method declarations that are applicable to the run-time types of the arguments, it chooses the most specific one by considering the parameter types in left to right order.

The last one, symmetric multiple dispatch, chooses a method to invoke based on the run-time types of more than one argument, but here by considering all of them equally. So, yeah, but in this case, since neither of the second and the third declaration is more specific than the other, we need another disambiguating method declaration. And since the last one is the most specific method declaration applicable to the run-time argument types, this method call is dispatched to this last declaration. Okay. Oh, sorry.

As you've seen in these examples, compared to other kinds of dynamic dispatch, symmetric multiple dispatch makes an intuitive and uniform choice among the overloaded methods. However, there is no free lunch, and there are a few things to take into account when the language supports symmetric multiple dispatch.

### Slide 4 of 21: Issues in Symmetric Multiple Dispatch

> - `m1(x: B, y: C): B = ⋯`
> - `m1(x: C, y: B): C = ⋯`
> - Diagram: B above C.
> - `m1(c1, c2)`. c1: static type C, run-time type C. c2: static type B, run-time type C.
> - Builds: the static types point to `m1(x: C, y: B): C`, and the call's box reads "Static type: C". With the run-time types boxed instead: "AMBIGUOUS!". A third declaration, `m1(x: C, y: C): B = ⋯`, makes the call's run-time type B: "NOT TYPE-SOUND!". It is struck out for `m1(x: C, y: C): C = ⋯`, and the box reads "Static type: C, Run-time type: C".

(3:58) Suppose a class C extends class B, and there are these two overloaded methods. And we have two variables, c1 and c2, with static types of C and B and dynamic types of both C. At compile time, static overloading resolution chooses the second method declaration, and the static type of the method call expression becomes C. But at run time, since both the declarations are applicable but neither is more specific, this method call is ambiguous.

Therefore, we need a disambiguating method declaration again, and the run-time type of the method call expression may become B. But then this method call breaks type soundness because the type was not preserved. By modifying the return type of the disambiguating method declaration, we now finally have a valid set of overloaded methods.

### Slide 5 of 21: So, the Language Needs

> - Static checking of Overloading Rules for an Unambiguous and Type-sound method overloading resolution
> - The three declarations of slide 4: `m1(x: B, y: C): B`, `m1(x: C, y: B): C`, `m1(x: C, y: C): C`; B above C.
> - A box "Parameter Type": (B, C) and (C, B), both above (C, C). A build replaces it with a box "Return Type": B and C, both with an arrow down to C.
> - Build: Correct Dynamic Dispatch Mechanism at run-time. Arrows go from `m1(c1, c2)` to all three declarations, then to `m1(x: C, y: C): C` alone.

(5:08) So for a valid set of overloaded methods and its correct resolution at run time, the language needs to check at compile time restrictions called overloading rules. And [yeah?] the parameter types must meet some requirements to ensure the existence of the unique, most specific method declaration. And the return type must ensure type preservation. And then among the method declarations in a valid overloaded set, dynamic dispatch mechanism must make a correct choice at run time.

### Slide 6 of 21: Adding Multiple Inheritance

> - Allows one class to extend multiple classes
> - `m2(x: A): C = ⋯`
> - `m2(x: B): C = ⋯`
> - `m2(c)`
> - Diagram: A and B, both above C.
> - Builds: arrows from the call to both declarations. A third is added, `m2(x: C): C = ⋯`, and the call points to it alone.

(5:49) Expressive language features often add various possibilities to make the overloaded method ambiguous and dynamic dispatch complicated. One such feature is multiple inheritance. And multiple inheritance allows, [yeah?] as you know, one class to extend multiple classes to make the code more modular and reusable. For a variable c with run-time type of C, both the declarations are applicable, but neither of them are more specific than the other. So this call is ambiguous, and we need a disambiguating method declaration, which is more specific than both the first two declarations.

### Slide 7 of 21: Adding Parametric Polymorphism

> - Introduces type parameters in class and method declarations
> - `sort⟦P <: A⟧(x: Listᴵ⟦P⟧): SortedListᴵ⟦P⟧ = ⋯`
> - `sort⟦P <: B⟧(x: Listᴵ⟦P⟧): SortedListᴵ⟦P⟧ = ⋯`
> - `l: Listᴵ⟦C⟧ = Listᴵ⟦C⟧(c)`, `sort(l)`
> - Diagram: A and B, both above C.
> - Builds: arrows from the call to both declarations. A third is added, `sort⟦P <: C⟧(x: Listᴵ⟦P⟧): SortedListᴵ⟦P⟧ = ⋯`, and the call points to it alone.

(6:36) Another such feature is parametric polymorphism, or generics. And this introduces type parameters in class and method declarations. For example, consider these overloaded methods. Their parameter types are, respectively, List P, where P is a subtype of A, and List P, where P is a subtype of B. For this sort method call with run-time argument type of List C, again, both the methods are applicable, but neither is more specific than the other. So we need a disambiguating method declaration, which is more specific than the first one.

And here, in the presence of method type parameter, dynamic dispatch must not only choose the most specific method declaration, but also infer appropriate type argument for the chosen declaration.

### Slide 8 of 21: Adding Variance

> - Defines additional subtype relations between different instances of a polymorphic type
>   - Covariant: `T⟦+P⟧` ⇒ `T⟦C⟧ <: T⟦B⟧`
>   - Contravariant: `T⟦-P⟧` ⇒ `T⟦B⟧ <: T⟦C⟧`
>   - Invariant: `T⟦=P⟧`
> - Diagram: B above C.

(7:42) The last feature is variance. And variance defines additional subtype relations between different instances of a polymorphic type. Developers can label their class type parameters covariant, contravariant, or invariant. And a covariant type parameter preserves the subtype relation between its type arguments, while contravariant type parameters reverse the subtype relation of its type arguments. An invariant type parameter ignores the subtype relation between its type arguments. Thus, it does not define any additional subtype relations.

### Slide 9 of 21: Adding Variance

> - The bullet of slide 8, and the example of slide 7 with A and B above C.
> - Builds:
>   - `Listᶜ⟦+P⟧, SortedListᴵ⟦=P⟧`: List is now covariant, SortedList invariant.
>   - The example rewritten: `sort(x: Listᶜ⟦A⟧): SortedListᴵ⟦A⟧ = ⋯`, `sort(x: Listᶜ⟦B⟧): SortedListᴵ⟦B⟧ = ⋯`, `l: Listᶜ⟦A⟧ = Listᶜ⟦C⟧(c)`, `sort(l)`.
>   - The call's box: "Static type: SortedListᴵ⟦A⟧". Arrows to both declarations: "AMBIGUOUS!".
>   - A third, `sort(x: Listᶜ⟦C⟧): SortedListᴵ⟦C⟧ = ⋯`, takes the call, and the box reads "Run-time type: SortedListᴵ⟦C⟧": "NOT TYPE-SOUND!".
>   - It is struck out for `sort⟦P⟧(x: Listᶜ⟦C⟧): SortedListᴵ⟦P⟧ = ⋯`. Arrows from its return type and from the static type `SortedListᴵ⟦A⟧` give "P = A", and the box reads "Static type: SortedListᴵ⟦A⟧, Run-time type: SortedListᴵ⟦A⟧".

(8:27) [Yeah?] Let's revisit the ambiguous sort method example again, but this time with covariant [list/lists?]. We can define the sort method with the same parameter types in a simpler way.

For a sort method call with static argument type of List A and dynamic argument type of List C, the static overloading resolution chooses the first declaration. And the static type of the expression is SortedList A. And at run time, both the methods are applicable to the run-time argument type List C, but neither is more specific. So this call is ambiguous.

So if we add a disambiguating method declaration in an intuitive way, the method call is dispatched to this last declaration. And the run-time type of the expression may become SortedList C. But then, this does not preserve type. By modifying the disambiguating method declaration to be a polymorphic method, we now have a valid set of overloaded methods.

Here, again, as in the case with parametric polymorphism, dynamic dispatch must not only choose the most specific applicable method declaration, but also infer type arguments for the chosen polymorphic method. And here, in order to infer in a type-sound manner in the presence of variance, the static type of the method call expression must be taken into account.

### Slide 10 of 21: FGFV Calculus

> The syntax of FGFV (the paper's Figure 2), a bar marking a sequence:
>
> - Program: `Π ::= ψ̄, e`
> - Class declaration: `ψ ::= trait T⟦V̄ β̄⟧ <: {t̄} μ̄ end | object O⟦β̄⟧(x̄: τ̄) <: {t̄} μ̄ end`
> - Method definition: `μ ::= m⟦κ̄⟧(x̄: τ̄): τ = e`
> - Class type parameter binding: `β ::= P <: {τ̄}`
> - Method type parameter binding: `κ ::= {τ̄} <: P <: {τ̄}`
> - Variance mark: `V ::= + | - | =`
> - Expression: `e ::= z | ((x̄: τ̄): τ ⇒ e) | e@(ē) | O⟦τ̄⟧(ē) | e.m(ē)`
> - Bindable variable: `z ::= x | self`
> - Type: `τ ::= P | c | (τ̄) | (τ → τ) | Any`
> - Constructed type: `c ::= t | O⟦τ̄⟧`
> - Trait type: `t ::= T⟦τ̄⟧`
> - Builds: the extends clauses `<: {t̄}` boxed as "Multiple Inheritance"; the type parameters and the lines for β and κ as "Parametric Polymorphism"; V as "Variance". Then: Calculus with Static Overloading Rules and a Dynamic Dispatch Mechanism that is Proven Type-sound.

(10:19) We presented a core calculus called FGFV, which stands for Featherweight Generic Fortress with Variance. So this language supports multiple inheritance, parametric polymorphism, both for classes and methods, and finally, variance for the polymorphic classes.

On top of this language, we formalized static overloading rules and designed a new dynamic dispatch mechanism, and proved its type soundness to guarantee no ambiguous method calls and type preservation at run time. I'll go over these three main parts one by one, starting from static overloading rules. Yeah.

### Slide 11 of 21: Overloading Rules from [1]

> - For every pair d1, d2 of overloaded method declarations,
>   1. No Duplicates Rule: a circle "d1 = d2" ⇒ "d1 = d2". A note: "Applicable set: a set of types to which the declaration is applicable".
>   2. Meet Rule: two overlapping circles d1 and d2, with d3 in the overlap.
>   3. Return Type Rule: a circle d1 inside a circle d2 ⇒ two shapes under "instances applicable to α" and "return types": every instance of d2 (∀), with return type τ2, and some instance of d1 (∃), with return type τ1, and τ1 <: τ2. The three drawings are the paper's Figure 1.
> - [1] Eric Allen, Justin Hilburn, Scott Kilpatrick, Victor Luchangco, Sukyoung Ryu, David Chase, and Guy L. Steele Jr. Type-checking Modular Multiple Dispatch with Parametric Polymorphism and Multiple Inheritance. OOPSLA '11.

(11:11) The previous work presented informal overloading rules for a language with multiple inheritance and parametric polymorphism. They used the concept of applicable set and their subset relation and quantification over these applicable set. They required each pair of overloaded method declarations to satisfy all the three overloading rules. I'll briefly explain each rule and how we formalized it.

### Slide 12 of 21: Overloading Rules 1

> - For every pair d1, d2 of overloaded method declarations, 1. No Duplicates Rule, with its drawing and the note on applicable sets. Then:
> - domain type: `dom(m⟦K̄⟧(x̄: ᾱ): ρ = e) = ∃⟦K̄⟧(ᾱ)`
> - [No-Dup-Not-Less]: from `¬(Δ ⊢ dom(d1) ⊑ dom(d2))`, conclude `Δ ⊢ d1 not duplicate of d2`.
> - [No-Dup-Not-Gtr]: from `¬(Δ ⊢ dom(d2) ⊑ dom(d1))`, conclude `Δ ⊢ d1 not duplicate of d2`.

(11:45) The first one, No Duplicates Rule, states that distinct method declarations must have different applicable sets. Applicable set of a method declaration is a set of types to which the declaration is applicable. So this rule is to rule out the trivial cases with duplicate declarations.

Instead of using the applicable set and their subset relation, we [formalize/formalized?] the overloading rules using domain types that are existentially quantified over the method type parameters.

### Slide 13 of 21: Overloading Rules 2

> - For every pair d1, d2 of overloaded method declarations, 2. Meet Rule, with its drawing. Then:
> - [Meet-Less]: from `Δ ⊢ dom(d1) ⊑ dom(d2)`, conclude `Δ ⊢ d1 meet d2 wrt _ ok`.
> - [Meet-Gtr]: from `Δ ⊢ dom(d2) ⊑ dom(d1)`, conclude `Δ ⊢ d1 meet d2 wrt _ ok`.
> - [Meet-Third]: from `d3 ∈ {d̄}`, `name(d1) = name(d2) = name(d3)` and `Δ ⊢ dom(d3) ≡ (dom(d1) ⊓ dom(d2))` (boxed in orange), conclude `Δ ⊢ d1 meet d2 wrt {d̄} ok`.

(12:25) The next one, Meet Rule, states that if the intersection of the applicable sets of d1 and d2 is not empty, the overloaded set must contain method declaration d3, whose applicable set is the intersection. So this rule is for ensuring the existence of the disambiguating method declaration. And similarly, we [formalize/formalized?] this rule using domain types of the method declarations and their intersection type.

### Slide 14 of 21: Overloading Rules 3

> - For every pair d1, d2 of overloaded method declarations, 3. Return Type Rule, with its drawing: "d1 is more specific than d2", the circle d1 inside the circle d2, α inside d1. Then:
> - [Return-Test]: from
>   - `arrow(d1) = ∀⟦κ̄⟧(α → ρ)`, and for each κ, `κ = {χ̄} <: P <: {η̄}`
>   - `arrow(d2) = ∀⟦κ̄′⟧(α′ → ρ′)`, and for each κ′, `κ′ = {χ̄′} <: Q <: {η̄′}`
>   - `distinct(P̄, Q̄)`
>   - `Δ ⊢ dom(d1) ⊑ dom(d2)`, boxed and linked to "d1 is more specific than d2"
>   - `Δ ⊢ ∀⟦κ̄⟧(α → ρ) ⊑ ∀⟦κ̄, κ̄′⟧((α ⊓ α′) → ρ′)`, boxed in a later build
>
>   conclude `Δ ⊢ d1 return type wrt d2 ok`.

(13:05) The last one, Return Type Rule, applies when d1 is more specific than d2, that is, when the applicable set of d1 is a subset of that of d2. For a type α that both d1 and d2 are applicable to, the return type of any applicable instance of d2 must be a supertype of the return type of some applicable instance of d1. So this rule is to make it possible for dynamic dispatch to find the type-preserving method instance.

In our formalization, d1 is more specific than d2 if the domain type of d1 is a existential subtype of that of d2. And the existential and universal quantification over the applicable sets is represented with universal subtype relations between arrow types that are universally quantified over the method type parameters.

### Slide 15 of 21: Overloading Rules

> - For every pair d1, d2 of overloaded method declarations: 1. No Duplicates Rule and 2. Meet Rule, with [No-Dup-Not-Less], [No-Dup-Not-Gtr] and [Meet-Third], an arrow to "Unambiguous"; 3. Return Type Rule, with [Return-Test], an arrow to "Type-sound".
> - Build: Details are in the paper.

(14:15) The roles of these three rules are the same as in the previous work. So No Duplicates Rule and Meet Rule are for unambiguous method calls, and Return Type Rule is for type preservation.

Details on quantified types and their subtype relations and the fully formalized overloading rules can be found in the paper.

### Slide 16 of 21: Dynamic Dispatch Mechanism

> 1. Choose the most specific method declaration applicable to the run-time argument type
> 2. (build) Infer the method type parameters for the chosen polymorphic method declaration
>
> - The example of slide 9 in its last form: `sort(x: Listᶜ⟦A⟧): SortedListᴵ⟦A⟧ = ⋯`, `sort(x: Listᶜ⟦B⟧): SortedListᴵ⟦B⟧ = ⋯`, `sort⟦P⟧(x: Listᶜ⟦C⟧): SortedListᴵ⟦P⟧ = ⋯`, `l: Listᶜ⟦A⟧ = Listᶜ⟦C⟧(c)`, `sort(l)`, the call pointing to the third declaration, "Static type: SortedListᴵ⟦A⟧, Run-time type: SortedListᴵ⟦A⟧", and with item 2 "P = A".

(14:45) The next thing to talk about is our dynamic dispatch mechanism. Let's revisit the sort method example again, with covariant List and invariant SortedList. As we discussed, the job of dynamic dispatch is not only to choose the most specific method declaration applicable to the run-time argument type, but also to infer the method type parameters for the chosen method declaration. And here, note that the static type of the method call expression must be available at run time and taken into account for type-sound choice.

### Slide 17 of 21: Overview - Big Picture

> Program Π → Compile → Run, with two arrows from Compile to Run: "Valid set of overloaded methods ({d̄})" and "Static return type g".

(15:27) For our program Π, the compiler first checks the validity of the overloaded methods. And also, in order for dynamic dispatch to make a type-sound choice, the static return type of every method call expression is delivered to run time.

### Slide 18 of 21: Overview - Run-time

> - The diagram of slide 17, small, its Run box opening into a large box "Run".
> - "Run-time argument type k" and g lead into "Dynamic dispatch", which holds a row of cells "to d1", "to d2", "to d3", ⋯, "to dn", ordered from "most specific" to "least specific"; ({d̄}) feeds the cells.
> - Build: the row becomes "to d1", ⋯, "to d", ⋯, "to dn", with "to d", k and g in orange.

(15:45) And at run time, among the method declarations in a valid overloaded set, dynamic dispatch must find an appropriate instance of the most specific method declaration that is applicable to the run-time argument type k and [preserves/preserve?] the static type g. So it tries dispatching to each method declaration in most to least specific order.

So let's now look closely on how dynamic dispatch on a method declaration d for the given k and g works.

### Slide 19 of 21: Overview - Dynamic Dispatch

> - In a box "Dynamic dispatch to d": k and g lead into "Match". Two arrows lead from Match to "Solve": "k <: parameter type" and "return type <: g". "Initial bounds" leads into Solve. Solve leads out to "Instance D".
> - Build: Details are in the paper.

(16:27) Dynamic dispatch to a method declaration d for the given run-time argument type k and static return type g consists of two steps. The first step, match step, is for collecting the requirements of method type parameters that make d applicable to k and preserves the static type g. So this step collects the requirements for k to be a subtype of this parameter type, and the requirements for g to be a supertype of this return type.

And then, given these requirements and the initial declared bounds of method type parameters, the next step, solve step, finds the types to substitute for the method type parameters. So if the solve step finds an appropriate substitution, it means that the method declaration d is the most specific one for the given k and g, and the method call expression is dispatched to an instance of d that is instantiated with the calculated substitution.

Details on how the match step collects the requirements inductively, and how the collected requirements are combined and solved can be found in the paper.

### Slide 20 of 21: Type Soundness of FGFV

> "A well-typed method invocation can always be reduced by using dynamic dispatch mechanism without any ambiguity, and the reduced expression preserves the type."
>
> Build: Details are in the paper.

(17:49) Finally, we [prove/proved?] the type soundness of our calculus FGFV to guarantee that under the static semantics defined with our formalized overloading rules and dynamic semantics based on the dynamic dispatch mechanism, there is no ambiguous method calls and types are preserved. So the key statement is that a well-typed method invocation can always be reduced by using dynamic dispatch mechanism without any ambiguity, and the reduced expression preserves the type. Of course, the theorems and proofs are in the paper.

### Slide 21 of 21: Summary

> - The diagrams of slides 17 to 19 in one: Program Π → Compile, labelled in red "Overloading rules" → Run, carrying ({d̄}) and g. In Run, "Dynamic dispatch", labelled in red, takes k and g, and its cell "to d" holds Match → Solve, leading out to "Instance D".
> - A red stamp: "Proved".
> - Build: Thank you :)

(18:29) To wrap up, for a language with symmetry multiple dispatch, multiple inheritance, parametric polymorphism with variance, we formalized overloading rules and presented dynamic dispatch mechanism and proved that it works correctly in a type-sound manner. Thank you very much, and I'm happy to take questions.

## Questions after the talk

**Session chair (18:58):** So we have time for a few questions.

**First questioner (19:06):** Do you have any idea what the performance of multiple dispatch is like now?

**Gyunghee Park (19:16):** So the question was the performance of the run-time dynamic dispatch algorithm. So yeah, there are many things that's behind this presentation, and in, yeah, so we had this trade-off between the performance of dynamic dispatch and the expressiveness of the language, and right now, our dynamic dispatch mechanism might exponentially blow up in some cases, but you can find it in the paper.

**Session chair (20:01):** Other questions?

**Second questioner (20:06):** I have a quick question. Can you say more about the motivation for the work? I was struck as you were going through your talk that this, with multiple inheritance and multiple dispatch, that this is maybe a more challenging language to program in. Can you say more about the desirability or the difficulty for programmers for this language, this kind of language with these features?

**Gyunghee Park (20:36):** So difficulties for the programmers for using this language.

**Second questioner (20:41):** Right. I'm wondering whether, so for example in Java, there is no multiple inheritance, in order for things to be, to solve some challenging problems. Those problems may be on the implementation side. So for example, your work has done a great job of finding an algorithm and a set of criteria that ensure that you get non-ambiguity, and so on, but that's beside the point of whether this is difficult for the programmer to use, to have such a powerful language. Sometimes necessity is the mother of invention. So I wonder what the motivation [or?] of the work for adding these more expressive features, if you have any insight [on that?].

**Gyunghee Park (21:22):** I think the difficulties are put in the programming language developer side, and as a programmers, I think this language is like more intuitive and, yeah, to write a program, because it's, yeah, intuitive for the binary method problems. And… okay.

**Session chair [?] (21:48):** Thank you.
