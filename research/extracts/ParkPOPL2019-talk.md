<!-- Transcript of the talk "Polymorphic Symmetric Multiple Dispatch with Variance" (Gyunghee Park, Jaemin Hong, Guy L. Steele Jr., Sukyoung Ryu), given by Gyunghee Park at POPL 2019 on Thu 17 Jan 2019, with the slides of her Keynote deck written out as text. Video: https://www.youtube.com/watch?v=eqpe-VfW3F4 . Talk page: https://popl19.sigplan.org/details/POPL-2019-Research-Papers/76/Polymorphic-Symmetric-Multiple-Dispatch-with-Variance . Gemini made the first draft from YouTube's automatic captions with the pipeline kept in ParkPOPL2019-talk-pipeline.md. It was checked and rebuilt here on 2026-10-10: Gemini's verbatim transcript checked word by word against the captions, its 20 speech-to-text corrections judged against the paper (ParkPOPL2019.pdf), the slides and the sense of each sentence; the deck (the .key file attached to the talk page, kept uncommitted in research/decks/popl2019-park-talk/) read slide by slide, all 75 Keynote slides and its 38 pictures; Gemini's transcript with slides checked against both and replaced. No one listened to the audio. -->

# Talk: Gyunghee Park, "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)

## How this text was made and checked

Gyunghee Park gave this talk at POPL 2019 on Thursday 17 January 2019. The session was Type Inference I, and the talk page names Michael Hicks as its chair. The talk presents the paper by Park, Hong, Steele and Ryu. Our notes on that paper are in `ParkPOPL2019-extract.md`.

Gemini made the first draft. It took YouTube's automatic captions, 148 cues. It listed 20 speech-to-text corrections. It wrote a verbatim transcript from the captions alone. Then it wrote a final transcript with the slides worked in. Its prompt is kept in `ParkPOPL2019-talk-pipeline.md`. No one listened to the audio, neither Gemini nor this check. Every reading of the speech here rests on the captions, the slides and the paper.

This check did four things.

- It compared Gemini's verbatim transcript with the captions word by word. Of the 20 corrections, 12 are right. 4 are right in meaning but wrong in wording, or change nothing. 4 are wrong. The check found 13 more errors in that transcript, kept from the captions or brought in by it. It restored 13 passages of speech that the transcript dropped. It undid 12 grammar edits, because a verbatim transcript keeps the speaker's words.
- It read the speaker's Keynote deck, the file attached to the talk page. The deck has 75 Keynote slides. They build up 21 numbered slides, one step at a time. The check read every text box, looked at all 38 pictures in the deck (the code and the formulas are pictures), and looked at the deck's own picture of each of the 75 slides.
- It compared Gemini's final transcript with the verbatim one and with the deck. That transcript paraphrases the speech under the speaker's name and sums up the questions. Its 18 slides are drawn by Gemini, not taken from the deck. The check found 16 pieces of invented content in it. It merges or leaves out 8 of the deck's 21 slides: slides 5, 12, 13, 14, 15, 17, 18 and 21 have no slide of their own there. So this text is rebuilt from the corrected verbatim transcript and the deck. It keeps nothing of Gemini's slides.
- It checked the technical terms and the notation against the paper: rule names, the calculus name FGFV, and the letters the slides use.

How to read this text.

- Each slide has a heading with its number and title. The number is the one in the slide's footer. Below the heading, "On the slide" gives what the slide shows, and "Builds" gives what each later Keynote slide adds. Then comes the speech that the speaker gave while that slide was up.
- A time in parentheses is the start of the caption cue in which a passage begins. It can be up to ten seconds early.
- Words in square brackets inside the speech are not in the captions. They are an added word, or a doubtful reading marked with a question mark.
- Every slide carries the KAIST logo at the bottom left and the PLRG logo at the bottom right.

The notation.

- The deck writes type parameters and type arguments in Fortress's white square brackets. This text writes them in plain square brackets: `List[P]`.
- The deck marks a covariant list class with a superscript C and invariant classes with a superscript I. This text writes them `ListC`, `ListI` and `SortedListI`, as our extract of the paper does.
- A bar over a letter marks a sequence, as in the paper. Where the deck puts one bar over a group, such as `x: τ`, this text puts a bar on each letter of the group: `x̄: τ̄`.
- Subscripts are written inline: `d1`, `m1`, `c1`.
- `<:` reads "is a subtype of". `⊑` is the paper's subtype relation on quantified types. `⊓` is intersection. `≡` is type equivalence. `Δ ⊢` reads "under the type environment Δ, it holds that". `¬` is "not".
- `= …` stands for a method body that the slide leaves out.

## The talk

### Slide 1 of 21: Polymorphic Symmetric Multiple Dispatch with Variance

Deck slide 1.

On the slide:

- The title: "Polymorphic Symmetric Multiple Dispatch with Variance".
- The authors: "Gyunghee Park, Jaemin Hong, Guy L. Steele Jr., Sukyoung Ryu", with Gyunghee Park in bold. Below them: "POPL'19".

**Session chair (0:05):** […] Dispatch with Variance, and Gyunghee Park is going to give the talk.

**Gyunghee Park (0:05):** Thank you for the introduction. Yeah, this talk is about Polymorphic Symmetric Multiple Dispatch with Variance, and [I'm] Gyunghee Park, and it's a joint work with Jaemin Hong, Guy Steele and Sukyoung Ryu.

### Slide 2 of 21: Method Overloading

Deck slides 2 to 6.

On the slide:

- One bullet: "Allows multiple method declarations with the same name".
- Four declarations:
  - `add(a: Int, b: Int): Int = …`
  - `add(a: Int, b: Int, c: Int): Int = …`
  - `add(a: List, b: List): List = …`
  - `add(a: SortedList, b: SortedList): SortedList = …`
- At the right, a diagram: List above SortedList, joined by a line. SortedList is a subtype of List.

Builds:

- Deck slide 3 adds two variables and a call: `a: List = SortedList(2, 7)`, `b: SortedList = SortedList(1, 3, 5)`, and `add(a, b)`.
- Deck slide 4 draws arrows from the call to all four declarations.
- Deck slide 5 boxes the static types, List and SortedList, and keeps one arrow, to `add(a: List, b: List)`. A label reads "Static overloading resolution".
- Deck slide 6 boxes the values, `SortedList(2, 7)` and `SortedList(1, 3, 5)`, and keeps one arrow, to `add(a: SortedList, b: SortedList)`. A label reads "Dynamic overloading resolution / Dynamic dispatch".

**Gyunghee Park (0:21):** As you all may know, method overloading allows multiple method declarations with the same name. So the methods that logically perform very similar tasks can be defined with the same name, but with different numbers of parameters or different types of parameters.

(0:39) Let's assume SortedList extends List, and we have these four add method declarations. And let's say we have two variables a and b with static types of List and SortedList, and dynamic types of both are SortedList. For an add method call with a and b as argument, the language needs to decide which method declaration to invoke among the overloaded methods.

(1:04) At compile time, static overloading resolution chooses a method to invoke based on the static types of the arguments. And at run time, dynamic overloading resolution, or dynamic dispatch, chooses a method to invoke based on the run-time types of the arguments.

### Slide 3 of 21: Dynamic Dispatch

Deck slides 7 to 19.

On the slide:

- One bullet: "Selects a method to call among overloaded methods at run time".
- Three declarations:
  - `add(a: List, b: List): List = …`
  - `add(a: List, b: SortedList): List = …`
  - `add(a: SortedList, b: List): List = …`
- The same variables and call as on slide 2: `a: List = SortedList(2, 7)`, `b: SortedList = SortedList(1, 3, 5)`, `add(a, b)`. The same diagram: List above SortedList.

Builds:

- Deck slide 8 replaces the bullet with "Single dispatch: based on a single argument (receiver)".
- Deck slide 9 boxes the static types and draws one arrow, to `add(a: List, b: SortedList)`.
- Deck slide 10 boxes the value of a, `SortedList(2, 7)`, and draws arrows to `add(a: List, b: SortedList)` and `add(a: SortedList, b: List)`.
- Deck slide 11 keeps one arrow, to `add(a: List, b: SortedList)`.
- Deck slide 12 replaces the bullet with "Asymmetric multiple dispatch: based on more than one arguments in a specific order (left to right)".
- Deck slide 13 boxes both values and draws arrows to all three declarations.
- Deck slide 14 keeps one arrow, to `add(a: SortedList, b: List)`.
- Deck slide 15 replaces the bullet with "Symmetric multiple dispatch: based on more than one arguments considering them equally".
- Deck slide 16 boxes both values and draws arrows to all three declarations.
- Deck slide 17 adds a fourth declaration, `add(a: SortedList, b: SortedList): SortedList = …`, with arrows to all four.
- Deck slide 18 keeps one arrow, to the fourth declaration.
- Deck slide 19 adds, in orange, an arrow and the line "Can support binary methods intuitively and uniformly".

**Gyunghee Park (1:23):** Let's now consider a slightly different set of overloaded method to see different kinds of dynamic dispatch. So the parameter types are now List List, List SortedList, and SortedList List.

(1:40) First one: single dynamic dispatch chooses a method to invoke based on the run-time type of a single argument, which usually is the receiver. So in a language with single dispatch, static overloading resolution is used to disambiguate among the overloaded methods. And then at run time, by looking at the run-time type of the receiver, variable a in this case, it first determines which class it belongs to, and among the overloaded and possibly overridden methods, it chooses an appropriate one that was determined at compile time.

(2:23) Asymmetric multiple dispatch chooses a method to invoke based on the run-time types of more than one arguments in a specific order, which usually is left-to-right order. So among the method declarations that are applicable to the run-time types of the arguments, it chooses the most specific one by considering the parameter types in left-to-right order.

(2:47) The last one, symmetric multiple dispatch, chooses a method to invoke based on the run-time types of more than one argument, but here by considering all of them equally. So, yeah. But, but in this case, since neither of the second and the third declaration is more specific than the other, we need another disambiguating method declaration. And since the last one is the most specific method declaration applicable to the run-time argument types, this method call is dispatched to this last declaration. Okay, oh, sorry.

(3:34) As you've seen in these examples, compared to other kinds of dynamic dispatch, symmetric multiple dispatch makes an intuitive and uniform choice among the overloaded methods. However, there is no free lunch, and there are a few things to take into account when the language supports symmetric multiple dispatch.

### Slide 4 of 21: Issues in Symmetric Multiple Dispatch

Deck slides 20 to 28.

On the slide:

- Two declarations:
  - `m1(x: B, y: C): B = …`
  - `m1(x: C, y: B): C = …`
- At the right, a diagram: B above C. C is a subtype of B.
- A call, `m1(c1, c2)`, with a box for each argument. For c1: "Static type: C, Run-time type: C". For c2: "Static type: B, Run-time type: C".

Builds:

- Deck slide 21 boxes the two static types and the declaration `m1(x: C, y: B): C`.
- Deck slide 22 adds a box for the call: "Static type: C".
- Deck slide 23 boxes the two run-time types instead. The call's box now reads "Static type: C, Run-time type:", with the run-time type blank. A label reads "AMBIGUOUS!".
- Deck slide 24 adds a third declaration, `m1(x: C, y: C): B = …`, and boxes it.
- Deck slide 25 fills in the call's box: "Static type: C, Run-time type: B".
- Deck slide 26 frames the call's box in orange. A label reads "NOT TYPE-SOUND!".
- Deck slide 27 strikes out `m1(x: C, y: C): B` and adds `m1(x: C, y: C): C = …` below it. It strikes out the B in the call's box.
- Deck slide 28 shows the call's box as "Static type: C, Run-time type: C".

**Gyunghee Park (3:53):** Suppose a class C extends class B, and there are these two overloaded methods, and we have two variables c1 and c2 with static types of C and B and dynamic types of both C. At compile time, static overloading resolution chooses the second method declaration, and the static type of the method call expression becomes C. But at run time, since both the declarations are applicable but neither is more specific, this method call is ambiguous.

(4:36) Therefore we need a disambiguating method declaration again, and the run-time type of the method call expression may become B. But then, but then this method call breaks type soundness, because the type was not preserved. By modifying the return type of the disambiguating method declaration, we now finally have a valid set of overloaded methods.

### Slide 5 of 21: So, the Language Needs

Deck slides 29 to 32.

On the slide:

- One bullet: "Static checking of Overloading Rules for an Unambiguous and Type-sound method overloading resolution". The words "Overloading Rules", "Unambiguous" and "Type-sound" are in orange.
- The three valid declarations from slide 4:
  - `m1(x: B, y: C): B = …`
  - `m1(x: C, y: B): C = …`
  - `m1(x: C, y: C): C = …`
- At the right, the diagram: B above C.
- Between them, a box titled "Parameter Type". In it, `(B, C)` and `(C, B)` sit at the top, and lines join both to `(C, C)` below.

Builds:

- Deck slide 30 replaces that box with one titled "Return Type". In it, B and C sit at the top, and dotted arrows point from both down to C.
- Deck slide 31 removes the box and adds a second bullet: "Correct Dynamic Dispatch Mechanism at run-time", with "Dynamic Dispatch Mechanism" in orange. Arrows go from the call `m1(c1, c2)` to all three declarations.
- Deck slide 32 keeps one arrow, to `m1(x: C, y: C): C`.

**Gyunghee Park (4:57):** So for a valid set of overloaded methods and its correct resolution at run time, the language need to check at compile time restrictions called overloading rules. And, yeah, the parameter types must meet some requirements to ensure the existence of the unique most specific method declaration, and the return type must ensure type preservation. And then, among the method declarations in a valid overloaded set, dynamic dispatch mechanism must make a correct choice at run time.

### Slide 6 of 21: Adding Multiple Inheritance

Deck slides 33 to 35.

On the slide:

- One bullet: "Allows one class to extend multiple classes".
- Two declarations and a call:
  - `m2(x: A): C = …`
  - `m2(x: B): C = …`
  - `m2(c)`
- At the right, a diagram: A and B at the top, both joined to C below. C extends both A and B.

Builds:

- Deck slide 34 draws arrows from the call to both declarations.
- Deck slide 35 adds a third declaration, `m2(x: C): C = …`, and keeps one arrow, to it.

**Gyunghee Park (5:49):** Expressive language features often add various possibilities to make the overloaded method ambiguous and dynamic dispatch complicated. One such feature is multiple inheritance, and multiple inheritance allows, [as?] you know, one class to extend multiple classes, to make the code more modular and reusable. For a variable c with run-time type of C, both the declarations are applicable, but neither of them are more specific than the other. So this call is ambiguous, and we need a disambiguating method declaration which is more specific than both the first two declarations.

### Slide 7 of 21: Adding Parametric Polymorphism

Deck slides 36 to 38.

On the slide:

- One bullet: "Introduces type parameters in class and method declarations".
- Two declarations:
  - `sort[P <: A](x: ListI[P]): SortedListI[P] = …`
  - `sort[P <: B](x: ListI[P]): SortedListI[P] = …`
- A variable and a call: `l: ListI[C] = ListI[C](c)` and `sort(l)`.
- At the right, the diagram: A and B at the top, both joined to C below.

Builds:

- Deck slide 37 draws arrows from the call to both declarations.
- Deck slide 38 adds a third declaration, `sort[P <: C](x: ListI[P]): SortedListI[P] = …`, and keeps one arrow, to it.

**Gyunghee Park (6:30):** Another such feature is parametric polymorphism, or generics, and this introduces type parameters in class and method declarations. For example, consider these overloaded methods. Their parameter types are respectively List P where P is a subtype of A, and List P where P is a subtype of B. For this sort method call with run-time argument type of List C, again both the call, both the methods are applicable, but neither is more specific than the other. So we need a disambiguating method declaration which is more specific than the first one.

(7:20) And here, in the presence of method type parameter, dynamic dispatch must not only to, not only choose the most specific method declaration, but also infer appropriate type argument for the chosen declaration.

### Slide 8 of 21: Adding Variance

Deck slide 39.

On the slide:

- One bullet: "Defines additional subtype relations between different instances of a polymorphic type".
- Three sub-bullets:
  - "Covariant": `T[+P]` ⇒ `T[C] <: T[B]`
  - "Contravariant": `T[-P]` ⇒ `T[B] <: T[C]`
  - "Invariant": `T[=P]`
- At the right, the diagram: B above C.

**Gyunghee Park (7:31):** The last feature is variance, and variance defines additional subtype relations between different instances of a polymorphic type. Developers can label their class type parameters covariant, contravariant or invariant. And a covariant type parameter preserves the subtype relation between its type arguments, while contravariant type parameters reverse the subtype relation of its type arguments. An invariant type parameter ignores the subtype relation between its type arguments; thus it does not define any additional subtype relations.

### Slide 9 of 21: Adding Variance

Deck slides 40 to 49. The title is the same as slide 8's.

On the slide:

- The same bullet as on slide 8.
- The example of slide 7 again: `sort[P <: A](x: ListI[P]): SortedListI[P] = …`, `sort[P <: B](x: ListI[P]): SortedListI[P] = …`, `l: ListI[C] = ListI[C](c)` and `sort(l)`.
- The diagram: A and B at the top, both joined to C below.

Builds:

- Deck slide 41 adds a line declaring the two classes: `ListC[+P], SortedListI[=P]`. List is now covariant and SortedList invariant.
- Deck slide 42 rewrites the example:
  - `sort(x: ListC[A]): SortedListI[A] = …`
  - `sort(x: ListC[B]): SortedListI[B] = …`
  - `l: ListC[A] = ListC[C](c)`
  - `sort(l)`
- Deck slide 43 adds a box for the call: "Static type: SortedListI[A]".
- Deck slide 44 draws arrows from the call to both declarations. A label reads "AMBIGUOUS!". The call's box now reads "Static type: SortedListI[A], Run-time type:", with the run-time type blank.
- Deck slide 45 adds a third declaration, `sort(x: ListC[C]): SortedListI[C] = …`, and keeps one arrow, to it.
- Deck slide 46 fills in the call's box: "Run-time type: SortedListI[C]". A label reads "NOT TYPE-SOUND!".
- Deck slide 47 strikes out `sort(x: ListC[C]): SortedListI[C]` and adds `sort[P](x: ListC[C]): SortedListI[P] = …` below it. The one arrow goes to the new declaration. The call's run-time type is blank again.
- Deck slide 48 draws an arrow from the new declaration's return type to "P =".
- Deck slide 49 completes it as "P = A", with an arrow from the static type `SortedListI[A]` in the call's box. The box now reads "Static type: SortedListI[A], Run-time type: SortedListI[A]".

**Gyunghee Park (8:26):** Yeah. Let's revisit the ambiguous sort method example again, but this time with covariant lists. We can define the sort method with the same parameter types in a simpler way.

(8:37) For a sort method call with static argument type of List A, dynamic argument type of List C, the static overloading resolution chooses the first declaration, and the static type of the expression is SortedList A. And at run time, both the methods are applicable to the run-time argument, List C, but neither is more specific. So this call is ambiguous.

(9:12) So if we add a disambiguating method declaration in an intuitive way, the method call is dispatched to this last declaration, and the run-time type of the expression may become SortedList C. But then this does not preserve type. By modifying the disambiguating method declaration to be a polymorphic method, we now have valid set of overloaded methods.

(9:38) Here again, as in the case with parametric polymorphism, dynamic dispatch must not only choose the most specific applicable method declaration, but also infer type arguments for the chosen polymorphic method. And here, in order to infer in a type-sound manner in the presence of variance, the static type of the method call expression must be taken into account.

### Slide 10 of 21: FGFV Calculus

Deck slides 50 to 54.

On the slide, the syntax of FGFV, the paper's Figure 2. Each line gives a name, a metavariable and its grammar:

- Program, `Π ::= ψ̄, e`
- Class declaration, `ψ ::= trait T[V̄ β̄] <: {t̄} μ̄ end | object O[β̄](x̄: τ̄) <: {t̄} μ̄ end`
- Method definition, `μ ::= m[κ̄](x̄: τ̄): τ = e`
- Class type parameter binding, `β ::= P <: {τ̄}`
- Method type parameter binding, `κ ::= {τ̄} <: P <: {τ̄}`
- Variance mark, `V ::= + | - | =`
- Expression, `e ::= z | ((x̄: τ̄): τ ⇒ e) | e@(ē) | O[τ̄](ē) | e.m(ē)`
- Bindable variable, `z ::= x | self`
- Type, `τ ::= P | c | (τ̄) | (τ → τ) | Any`
- Constructed type, `c ::= t | O[τ̄]`
- Trait type, `t ::= T[τ̄]`

Builds:

- Deck slide 51 boxes the two extends clauses, `<: {t̄}`, of trait and object declarations, under the orange label "Multiple Inheritance".
- Deck slide 52 boxes the type parameters of traits, objects and methods, and the lines for β and κ, under the label "Parametric Polymorphism".
- Deck slide 53 boxes the variance mark V in the trait declaration and its line, under the label "Variance".
- Deck slide 54 shows all three labels and adds a bullet: "Calculus with Static Overloading Rules and a Dynamic Dispatch Mechanism that is Proven Type-sound". The phrases "Static Overloading Rules", "Dynamic Dispatch Mechanism" and "Proven Type-sound" are in orange.

**Gyunghee Park (10:18):** We presented a core calculus called FGFV, which stands for Featherweight Generic Fortress with Variance. So this language supports multiple inheritance, parametric polymorphism both for classes and methods, and finally variance for the polymorphic classes.

(10:29) On top of this language, we formalized static overloading rules and designed a new dynamic dispatch mechanism, and proved its type soundness to guarantee non-ambiguous method calls and type preservation at run time. I'll go [through] these three main parts one by one, starting from static overloading rules. Yeah.

### Slide 11 of 21: Overloading Rules from [1]

Deck slide 55.

On the slide:

- "For every pair d1, d2 of overloaded method declarations,"
- "1. No Duplicates Rule", drawn as a circle holding "d1 = d2", then ⇒, then "d1 = d2". An arrow leads from the circle to a box: "Applicable set: a set of types to which the declaration is applicable".
- "2. Meet Rule", drawn as two overlapping circles, d1 and d2, with d3 in the overlap.
- "3. Return Type Rule", drawn as a circle d1 inside a circle d2, then ⇒, then two long pentagon shapes under the headings "instances applicable to α" and "return types". The d2 shape is marked ∀ and ends at the return type τ2. The d1 shape is marked ∃ and ends at τ1. A turned subtype sign between them says τ1 <: τ2. These three drawings are the paper's Figure 1.
- A footnote: "[1] Eric Allen, Justin Hilburn, Scott Kilpatrick, Victor Luchangco, Sukyoung Ryu, David Chase, and Guy L. Steele Jr. Type-checking Modular Multiple Dispatch with Parametric Polymorphism and Multiple Inheritance. OOPSLA '11."

**Gyunghee Park (11:11):** The previous work presented informal overloading rules for a language with multiple inheritance and parametric polymorphism. They use the concept of applicable set and their subset relation, and quantification over these applicable set. They required each pair of overloaded method declarations to satisfy all the three overloading rules. I'll briefly explain each rule and how we formalized it.

### Slide 12 of 21: Overloading Rules 1

Deck slides 56 and 57. On deck slide 56 the title is "Overloading Rules 1 from [1]".

On the slide:

- "For every pair d1, d2 of overloaded method declarations,"
- "1. No Duplicates Rule"
- The box "Applicable set: a set of types to which the declaration is applicable", with an arrow up to it from a large circle holding "d1 = d2", then ⇒, then "d1 = d2".
- The footnote [1], as on slide 11.

Builds:

- Deck slide 57 drops "from [1]" from the title, shrinks the circle to an icon beside the rule's name, and drops the footnote. It shows a box, "domain type: `dom(m[K̄](x̄: ᾱ): ρ = e) = ∃[K̄](ᾱ)`", linked by an arrow to two rules of the paper's Figure 5:
  - [No-Dup-Not-Less]: from `¬(Δ ⊢ dom(d1) ⊑ dom(d2))`, conclude `Δ ⊢ d1 not duplicate of d2`.
  - [No-Dup-Not-Gtr]: from `¬(Δ ⊢ dom(d2) ⊑ dom(d1))`, conclude `Δ ⊢ d1 not duplicate of d2`.

**Gyunghee Park (11:44):** The first one, No Duplicates Rule, states that distinct method declarations must have different applicable sets. Applicable set of a method declaration is a set of types to which the declaration is applicable. So this rule is to rule out the trivial cases with duplicate declarations.

(12:03) Instead of using the applicable set and their subset relation, we formalize the overloading rules using domain types that are existentially quantified over the method type parameters.

### Slide 13 of 21: Overloading Rules 2

Deck slides 58 and 59. On deck slide 58 the title is "Overloading Rules 2 from [1]".

On the slide:

- "For every pair d1, d2 of overloaded method declarations,"
- "2. Meet Rule"
- A large drawing of the two overlapping circles, d1 and d2, with d3 in the overlap.
- The footnote [1], as on slide 11.

Builds:

- Deck slide 59 drops "from [1]" and the footnote, shrinks the circles to an icon beside the rule's name, and shows three rules of the paper's Figure 5:
  - [Meet-Less]: from `Δ ⊢ dom(d1) ⊑ dom(d2)`, conclude `Δ ⊢ d1 meet d2 wrt _ ok`.
  - [Meet-Gtr]: from `Δ ⊢ dom(d2) ⊑ dom(d1)`, conclude `Δ ⊢ d1 meet d2 wrt _ ok`.
  - [Meet-Third]: from `d3 ∈ {d̄}`, `name(d1) = name(d2) = name(d3)` and `Δ ⊢ dom(d3) ≡ (dom(d1) ⊓ dom(d2))`, conclude `Δ ⊢ d1 meet d2 wrt {d̄} ok`. The premise with ≡ is boxed in orange.

**Gyunghee Park (12:26):** The next one, Meet Rule, states that if the intersection of the applicable sets of d1 and d2 is not empty, the overloaded set must contain method declaration d3 whose applicable set is the intersection. So this rule is for ensuring the existence of the disambiguating method declaration. And similarly, we formalize this rule using domain types of the method declarations and their intersection type.

### Slide 14 of 21: Overloading Rules 3

Deck slides 60 to 62. On deck slide 60 the title is "Overloading Rules 3 from [1]".

On the slide:

- "For every pair d1, d2 of overloaded method declarations,"
- "3. Return Type Rule"
- A box, "d1 is more specific than d2", with an arrow up to it from the drawing of the circle d1 inside the circle d2. Below the circles stands α, with a turned ∈ sign that puts it in the inner circle. Then ⇒ and the two pentagon shapes, as on slide 11: instances applicable to α, ∀ for d2 with return type τ2, ∃ for d1 with return type τ1, and τ1 <: τ2.
- The footnote [1], as on slide 11.

Builds:

- Deck slide 61 drops "from [1]" and the footnote and shrinks the drawing beside the rule's name. It shows the rule [Return-Test] of the paper's Figure 5. Its premises:
  - `arrow(d1) = ∀[κ̄](α → ρ)`
  - `κ = {χ̄} <: P <: {η̄}`, with one bar over the whole premise: one such binding for each κ.
  - `arrow(d2) = ∀[κ̄′](α′ → ρ′)`
  - `κ′ = {χ̄′} <: Q <: {η̄′}`, with one bar over the whole premise.
  - `distinct(P̄, Q̄)`
  - `Δ ⊢ dom(d1) ⊑ dom(d2)`
  - `Δ ⊢ ∀[κ̄](α → ρ) ⊑ ∀[κ̄, κ̄′]((α ⊓ α′) → ρ′)`

  Its conclusion: `Δ ⊢ d1 return type wrt d2 ok`. The premise `Δ ⊢ dom(d1) ⊑ dom(d2)` is boxed in orange and linked to the box "d1 is more specific than d2".
- Deck slide 62 fades the box "d1 is more specific than d2" and boxes the last premise instead, the one on arrow types.

**Gyunghee Park (13:04):** The last one, Return Type Rule, applies when d1 is more specific than d2, that is, when the applicable set of d1 is a subset of that of d2. For a type α that both d1 and d2 are applicable to, the return type of any applicable instance of d2 must be a supertype of the return type of some applicable instance of d1. So this rule is to make it possible for a dynamic dispatch to find the type-preserving method instance.

(13:45) In our formalization, d1 is more specific than d2 if the domain type of d1 is some existential subtype of that of d2. And the existential and universal quantification over the applicable sets is represented with universal subtype relations between arrow types that are universally quantified over the method type parameters.

### Slide 15 of 21: Overloading Rules

Deck slides 63 and 64.

On the slide:

- "For every pair d1, d2 of overloaded method declarations,"
- "1. No Duplicates Rule", with [No-Dup-Not-Less] and [No-Dup-Not-Gtr] as on slide 12, and "2. Meet Rule", with [Meet-Third] as on slide 13. One orange box holds both names, and an arrow leads from it to the orange word "Unambiguous".
- "3. Return Type Rule", with [Return-Test] as on slide 14. Its name is boxed, and an arrow leads from it to the orange word "Type-sound".

Builds:

- Deck slide 64 dims the slide and writes over it, in large white letters: "Details are in the paper".

**Gyunghee Park (14:08):** The roles of these three rules are the same as in the previous work. So No Duplicates Rule and Meet Rule are for unambiguous method calls, and Return Type Rule is for type preservation.

(14:36) Details on quantified types and their subtype relations and the fully formalized overloading rules can be found in the paper.

### Slide 16 of 21: Dynamic Dispatch Mechanism

Deck slides 65 and 66.

On the slide:

- A numbered item: "1. Choose the most specific method declaration applicable to the run-time argument type".
- The example of slide 9 in its final form:
  - `sort(x: ListC[A]): SortedListI[A] = …`
  - `sort(x: ListC[B]): SortedListI[B] = …`
  - `sort[P](x: ListC[C]): SortedListI[P] = …`
  - `l: ListC[A] = ListC[C](c)`
  - `sort(l)`, with one arrow, to the third declaration, and the box "Static type: SortedListI[A], Run-time type: SortedListI[A]".

Builds:

- Deck slide 66 adds "2. Infer the method type parameters for the chosen polymorphic method declaration", and "P = A", with arrows from the third declaration's return type and from the static type in the call's box.

**Gyunghee Park (14:44):** The next thing to talk about is our dynamic dispatch mechanism. Let's revisit the sort method example again, with covariant lists and invariant lists. As we discussed, the job of dynamic dispatch is not only to choose the most specific method declaration applicable to the run-time argument type, but also to infer the method type parameters for the chosen method declaration. And here, note that the static type of the method call expression must be available at run time and taken into account for type-sound choice.

### Slide 17 of 21: Overview - Big Picture

Deck slide 67.

On the slide, a diagram: "Program Π" goes into a box "Compile". Two arrows lead from "Compile" to a box "Run". The upper arrow is labelled "Valid set of overloaded methods ({d̄})". The lower one is labelled "Static return type g".

**Gyunghee Park (15:20):** For a program Π, the compiler first checks the validity of the overloaded methods. And also, in order for dynamic dispatch to make a type-sound choice, the static return type of every method call expression is delivered to run time.

### Slide 18 of 21: Overview - Run-time

Deck slides 68 and 69.

On the slide:

- The diagram of slide 17, made small, at the top. Its "Run" box opens into a large box, also labelled "Run".
- In the large box, "Run-time argument type k" leads down into a box "Dynamic dispatch". That box holds a row of cells: "to d1", "to d2", "to d3", "⋯", "to dn". An orange bar above the row runs from "most specific" on the left to "least specific" on the right.
- From the left, g leads into the box, and ({d̄}) leads up into each cell.

Builds:

- Deck slide 69 changes the row to "to d1", "⋯", "to d", "⋯", "to dn", and highlights in orange the cell "to d", the box "Run-time argument type k", and g.

**Gyunghee Park (15:39):** And at run time, among the method declarations in a valid overloaded set, dynamic dispatch must find an appropriate instance of the most specific method declaration that is applicable to the run-time argument type k and preserve the static type g. So it tries dispatching to each method declaration in most to least specific order.

(16:11) So let's now look closely on how dynamic dispatch on a method declaration d for the given k and g works.

### Slide 19 of 21: Overview - Dynamic Dispatch

Deck slides 70 and 71.

On the slide, a diagram in a box headed "Dynamic dispatch to d":

- k and g, each boxed in orange, lead into a box "Match".
- Two arrows lead from "Match" to a box "Solve". The upper is labelled "k <: parameter type". The lower is labelled "return type <: g".
- "Initial bounds" leads down into "Solve" from the top.
- An arrow leads out of "Solve" to "Instance D".

Builds:

- Deck slide 71 dims the slide and writes over it: "Details are in the paper".

**Gyunghee Park (16:23):** Dynamic dispatch to a method declaration d for the given run-time argument type k and static return type g consists of two steps. The first step, match step, is for collecting the requirements of method type parameters that make d applicable to k and preserves the static type g. So the step collects the requirements for k to be a subtype of this parameter type, and the requirements for g to be a supertype of this return type.

(16:59) And then, given these requirements and the initial declared bounds of method parameters, the next step, solve step, finds the [type-sound?] types to substitute for the method type parameters. So if the solve step finds an appropriate substitution, it means that the method declaration d is the most specific one for the given k and g, and the method call expression is dispatched to an instance of d that is associated with the calculated substitution.

(17:32) Details on how the match step collects requirements inductively and how the collected requirements are combined and solved can be found in the paper.

### Slide 20 of 21: Type Soundness of FGFV

Deck slides 72 and 73.

On the slide, one sentence in large quotation marks: "A well-typed method invocation can always be reduced by using dynamic dispatch mechanism without any ambiguity, and the reduced expression preserves the type."

Builds:

- Deck slide 73 dims the slide and writes over it: "Details are in the paper".

**Gyunghee Park (17:48):** Finally, we prove the type soundness of our calculus FGFV, to guarantee that under the static semantics defined with our formalized overloading rules and dynamic semantics based on the dynamic dispatch mechanism, there is no ambiguous method calls and types are preserved.

(18:09) So the key statement is that a well-typed method invocation can always be reduced by using dynamic dispatch mechanism without any ambiguity, and the reduced expression preserves the type. Of course, the theorems and proofs are in the paper.

### Slide 21 of 21: Summary

Deck slides 74 and 75.

On the slide, the diagrams of slides 17 to 19 joined into one:

- At the top, "Program Π" goes into "Compile", and two arrows lead to "Run": "Valid set of overloaded methods ({d̄})" and "Static return type g". Under "Compile", in red: "Overloading rules".
- "Run" opens into a large box. In it, a red-labelled box "Dynamic dispatch" takes k and g from the left, and ({d̄}) as a row of cells from below. Inside it, a box "to d" holds "Match" with an arrow to "Solve". An arrow leads out to "Instance D".
- A red stamp across the corner: "Proved".

Builds:

- Deck slide 75 dims the slide and writes over it: "Thank you :)".

**Gyunghee Park (18:28):** To wrap up: for a language with symmetric multiple dispatch, multiple inheritance, parametric polymorphism with variance, we formalized overloading rules and presented dynamic dispatch mechanism and proves that it works correctly in a type-sound manner. Thank you very much, and I'm happy to take questions.

## Questions after the talk

The captions do not mark who speaks. The labels below follow the turns of the talk. Where a label is a judgement, the text says so.

**Session chair (18:57):** So we have time for a few questions.

**First questioner (19:05):** Do you have any… Do you have any idea what the performance of multiple dispatch is like now?

The captions do not show whether the chair or someone in the audience asks this.

**Gyunghee Park (19:10):** So the question was the performance of the run-time dynamic dispatch, everything. So, yeah, there are many things that's behind this presentation, and in… yeah. So we had this trade-off between the performance of dynamic dispatch and the expressiveness of the language, and right now our dynamic dispatch mechanism might exponentially blow up in some cases. But you can find it in the paper.

**Session chair (20:00):** Other questions?

**Second questioner, probably the session chair (20:00):** I have a quick question. Can you say more about the motivation for the work? I was struck, as you were going through your talk, that this, with, with multiple inheritance and multiple dispatch, that this is a maybe a more challenging language to program in. Can you say more about the desirability or the difficulty for programmers for this language, this kind of language with these features?

The captions run "Other questions? I have a quick question" without a break, so the chair probably asked this question himself. The talk page names the chair as Michael Hicks. Without the audio this stays a judgement.

**Gyunghee Park (20:35):** So, difficulties for the programmers for using this language, right?

**Second questioner (20:35):** And I'm wondering whether… So, for example, in Java there is no multiple inheritance. In order for things to be, to solve some, some challenging problems, those problems may not be on the implementation side. So, for example, your work has done a great job of finding an algorithm and a set of criteria that ensure that you get no ambiguity and so on, but that, that's beside the point of whether this is difficult for the programmer to use, to have such a powerful language. Sometimes necessity is the mother of invention, so I wonder what the motivation, or, of the work, that, for adding these, these more expressive features, if you have any insight.

**Gyunghee Park (21:15):** I think the difficulties are put in the programming, programming language developer side, and as programmers, I think this language is, like, more intuitive and, yeah, to write a program, because it's, yeah, intuitive for the binary method problems. And… okay.

**Session chair (21:48):** Thank you.

Who says "Thank you" at the end is a judgement too: it follows the speaker's "okay" and closes the session's questions.

## Corrections made in checking

Gemini's speech-to-text corrections, numbered as in its list (AUD-001 to AUD-020):

- AUD-001, 002, 004, 005, 006, 007, 009, 010, 011, 014, 015 and 018 are right and are kept.
- AUD-003 is wrong: the captions' "laceless let's order list and soda let's list" is "List List, List SortedList, and SortedList List" (1:31). The deck has no OrderedList.
- AUD-008 is wrong: "static restrictions" replaces the speaker's words "at compile time restrictions", and is not a speech-to-text error. Gemini's own transcript did not apply it.
- AUD-012 is wrong: the type parameter is P, as the slide and the paper write it, not T. The speech reads "List P where P is a subtype of A" (6:41).
- AUD-013 is right in meaning. The wording is "subtype relation", as in the speaker's parallel clauses, not "subtyping relation" (8:09).
- AUD-016 changes only a capital letter. The real errors there, "T 1" and "T 3" for d1 and d3, were not listed. The transcript fixed them.
- AUD-017 is right in meaning. The words are "that of d2", as she said a sentence earlier, not "the domain type of D_2" (13:55).
- AUD-019 is wrong as listed: "type-sound substitutions to substitute" is not what the transcript applied ("type-sound types"). The reading stays doubtful and is marked (17:09).
- AUD-020 is right for "side" and "programmers", but it changed the captions' "put in" to "put on" without cause. "put in" is kept (21:22).

Errors fixed in Gemini's verbatim transcript:

- 0:39: "different names of parameters" is "different numbers of parameters". The slide's add takes two or three Int arguments.
- 0:39: "Let's assume, so, SortedList extends List" loses the stray "so". The captions' "so realistic sense list" is one phrase, "SortedList extends List".
- 0:39: The four add declarations that the transcript listed inside the speech are removed. They were not spoken, and they were the wrong four: they are the declarations of slide 3, not slide 2.
- 3:53: The two declarations named foo that the transcript listed inside the speech are removed. They were not spoken, the deck names the method m1, and the order was reversed.
- 4:36: "may become D" is "may become B". The disambiguator on the slide is `m1(x: C, y: C): B`, and the run-time type shown is B.
- 6:00: "allows, yes, you know, one class" is read as "allows, [as?] you know, one class". The reading is marked doubtful.
- 7:44: "variance defines addition of subtype relations" is "additional subtype relations", the slide's own words.
- 10:18 and 17:48: the calculus name FGFV was broken text, a lost escape in a formula. It is written FGFV.
- 13:16: "α" was broken text, a lost escape. It is written α.
- 12:26 to 17:32: the declarations are d1, d2, d3 and d, lowercase as on the slides. The transcript wrote D1, D2, D3 and D, but on the slides a capital D names only the instance, on slide 19. The types k and g are lowercase as on the slides, where the transcript wrote K and G.
- 14:08: "The goals of these three rules" is "The roles of these three rules". The captions have "the rules of these three rules", and "roles" is the near sound that fits.
- 21:15: the second questioner's "what the motivation, or, of the work, that, for adding" is restored from the captions. The transcript had rewritten it as "what the motivation of the work was for adding".
- 18:57 to 21:48: the second question is given to the session chair as a probable judgement, and the final "okay" to the speaker. The transcript gave both to others without comment.

Speech restored where Gemini's verbatim transcript dropped it:

- 20:00: the chair's "Other questions?".
- 19:05: the first questioner's false start, "Do you have any…".
- 19:20: the speaker's "and in… yeah".
- 7:01: "again both the call, both the methods are applicable".
- 7:20: "must not only to, not only choose".
- 20:11: "that this, with, with multiple inheritance".
- 20:18: "for this language, this kind of language".
- 20:45: "In order for things to be, to solve some, some challenging problems".
- 21:00: "but that, that's beside the point".
- 21:15: "adding these, these more expressive features".
- 21:22: "the programming, programming language developer side".
- 21:33: "more intuitive and, yeah, to write a program, because it's, yeah, intuitive".
- 21:43: "And… okay".

Grammar edits undone, because the captions' words are plausible speech: "as argument" (0:55), "overloaded method" (1:31), "more than one arguments" (2:23), "the language need" (5:09), "method type parameter" (7:20), "type argument" (7:31), "We presented" (10:18), "They use" (11:11), "and preserve the static type" (16:00), "and preserves the static type" (16:42), "proves" (18:40), and "put in" (21:22).

Invented content in Gemini's final transcript, not carried over:

1. A slide of "Kinds of Dynamic Dispatch" with OrderedList and a declaration `add(x: SortedList, y: OrderedList)`. The deck's types are List and SortedList, and its fourth declaration is `add(a: SortedList, b: SortedList): SortedList`.
2. The language lists "Java, C++, Smalltalk", "Common Lisp (CLOS)" and "Dylan, Fortress, Julia". They are on no slide and were not spoken.
3. Separate slides for single, asymmetric and symmetric dispatch, with bullets such as "Breaks parameter symmetry!". The deck has one slide, "Dynamic Dispatch", whose builds swap one bullet.
4. The code `val a: List = new SortedList(); val b: List = new SortedList();`. The deck declares `a: List = SortedList(2, 7)` and `b: SortedList = SortedList(1, 3, 5)`.
5. The method name foo, the line `val res: C = foo(c1, c2)`, and "static resolution selects declaration (1)". The deck's method is m1, and the speaker says static resolution chooses the second declaration.
6. A slide "Disambiguation & Type Preservation" with `foo(x: C, y: C): D`, "where D is not a subtype of C", a declaration "(3')" and "subject reduction". The deck's disambiguator is `m1(x: C, y: C): B`, replaced by `m1(x: C, y: C): C`.
7. The method name bar and the phrase "diamond ambiguity". The deck's method is m2, with return type C.
8. `sort[T <: A](x: List[T]): List[T]` and "INFER the appropriate type argument (T = C)". The deck has `sort[P <: A](x: ListI[P]): SortedListI[P]`, and neither slide nor speech names an inferred argument.
9. Variance examples with Sink and Array, the syntax `+T` and `-T`, and the title "Declaration-Site Variance". The deck shows `T[+P]`, `T[-P]` and `T[=P]` over B and C.
10. The variance fix `sort[T <: C](x: List[T]): SortedList[T]`. The deck's fix is `sort[P](x: ListC[C]): SortedListI[P]`, where only the static return type fixes P.
11. An FGFV slide with "Contributions" and "Mechanized Type Soundness Proof". The deck shows the grammar of FGFV, and the paper's proofs are not mechanized.
12. The formulas `∃X. dom(D₁) ≠ ∃Y. dom(D₂)`, `dom(D₃) = dom(D₁) ⊓ dom(D₂)` and `∀Y. ret(D₂) :> [T/X] ret(D₁)`. They are on no slide. The deck shows the paper's rules, given above.
13. A slide with "Theorem (Progress & Subject Reduction)" and a "Conclusion" that includes "Solved variance & generic interactions in Fortress". The deck's slide 20 is one quoted sentence, and slide 21 is a diagram.
14. A "Q&A Discussion" slide and "Q&A Highlights" with "binary operators (+, *, union)", "matrix addition, set unions" and exponential cost "in worst-case nested polymorphic subtyping". There is no such slide. The speaker gave no example and no cause for the blowup.
15. Paraphrase set out as the speaker's words, such as "This uncovers a critical theoretical insight", "Modern languages compound this complexity" and "Prior work by Allen et al. on Fortress".
16. "Article 76" in its header. The paper is Article 11, and 76 is the number of the talk page.
