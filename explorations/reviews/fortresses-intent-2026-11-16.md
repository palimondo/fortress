<!-- An answer for the curator's page comment of 2026-11-16 on Note 11 of `answers-2026-11-15.md` (the specification's section 2.1, the "fortress"): what each edition of the specification (1.0α of 2006, 1.0β of 2007, the 1.0 release of 2008, the Working Draft of February 2011) says of fortresses and of compiling, linking, upgrading and running components; whether the 1.0 release cut the material and the Working Draft put it back, with dates from git; the team's own reasons, quoted; the nearest constructs of other languages; what the tree builds of it today; and which parts no source of the team describes. Gathered by reading the four editions, git and the code, with one run of two commands and no build. -->

# What a fortress was for

## The answer

- **The editions.** 1.0α (September 2006) and 1.0β (March 2007) describe the whole system, in the same words: a fortress, and the operations compile, link, execute, upgrade, extract, install, uninstall, hide and constrain. The 1.0 release (March 2008) cut all of it except compiling and running. It kept the word "fortress", but as "a hidden persistent cache maintained by the implementation".
- **Was it put back?** Yes. The Working Draft's sources entered git between 2009-10-20 and 2009-11-06. They carry the β text of the components chapter whole, and a chapter 2 that pastes β paragraphs back into the 1.0 text. The same commit that put chapter 2 back marked it "out of date". Four days later the preface listed "components linking" as not yet supported. The team never edited that text again.
- **What it corresponds to.** No single construct. The linking is closest to the units of PLT Scheme and to the functors of ML: code that names only interfaces, joined by a separate link step. The store is closest to the Nix package store: immutable installed things, and names that are rebound to new ones. The team names ML and Scheme modules itself. The other comparisons are from general knowledge.
- **What they were going after.** In the team's words, "the stability benefits of static linking with the sharing and upgrading benefits of dynamic linking". A program is linked once and then never changes under its user. Yet a library inside it can be replaced without the program's source, and a library's author can refuse a replacement.
- **Today.** The tree compiles a component, links it by rewriting names in its jar, and runs it. It has caches, not a fortress. No upgrade, no compound component, no extract or install.

A term used throughout: a **component** is a unit of compiled code. An **api** is an interface, a list of declarations. A component *exports* the apis that it implements and *imports* the apis that it uses.

## The life of a component, as the chapter tells it

The example is that of 1.0α and 1.0β, section 2.1 to 2.2 (`Specification-history/fortress.1.0alpha.pdf`, pages 16 to 21). The Working Draft has the same steps except step 4, which it lost (below).

1. **Write `HelloWorld.fss`.** It holds `component HelloWorld`, `export Executable`, and a function `run`. `Executable` is an api with one declaration, `run`. Why: a component never says what it *is* to the outside except through an api.
2. **`fortress compile HelloWorld.fss`.** The compiler checks the component and stores it in the fortress under the name `HelloWorld`. From here on, commands name the component, not the file. Why: the fortress, not the file system, is where compiled code lives. Compiling a second file with a component of the same name *shadows* the first: the name now means the new one.
3. **Write and compile an api and two more components.** `Zeepf.fsi` declares `foo` and `baz`. `Blargh.fss` imports `Zeepf` and exports `Executable`. `Ralph.fss` exports `Zeepf`. Each is compiled alone. `Blargh` cannot run: it uses `Zeepf`, and nothing yet says who implements `Zeepf`. Why: `Blargh` is compiled against the api only, so it can be compiled, shipped and tested before any implementation is chosen.
4. **`fortress link Gary from Ralph with Blargh`.** The fortress makes a new component, `Gary`, whose *constituents* are `Ralph` and `Blargh`. Inside `Gary`, `Blargh`'s uses of `Zeepf` mean `Ralph`. `Gary` exports `Executable` and imports nothing, so it can run. `Ralph` and `Blargh` stay as they were. Why: linking is the only place where an api is bound to an implementation. It is a command of the user, not a line of source.
5. **`fortress run Gary`.** The fortress calls `Gary`'s `run`.
6. **A new `Ralph.fss` is compiled.** The name `Ralph` now means the new component. `Gary` is not affected: "Conceptually, Gary contains its own copies of the components Blargh and Ralph". Why: a program that worked yesterday works today, whatever was installed since. This is what static linking gives.
7. **`fortress upgrade Gary with Ralph`.** The fortress makes a new component from `Gary`, with the new `Ralph` in the place of the old, and rebinds the name `Gary` to it. `Blargh` is not recompiled. The old `Gary` still exists wherever it is a constituent of something else. `fortress upgradeAll Ralph` does this for every component that holds a `Ralph`. Why: this is what dynamic linking gives, a library replaced under a program. But it happens when the user asks, to the programs the user names, and the old program is not destroyed.
8. **`fortress remove HelloWorld`.** The name is unbound. Components that hold `HelloWorld` as a constituent are not affected.

The components chapter (chapter 22 of α and β) adds two steps that chapter 2 does not show.

9. **`extract` and `install`.** `extract` writes a component to a file, with its apis and constituents. A list of *prerequisite* apis leaves out the constituents that implement them. `install` on another fortress reads the file and fills the prerequisites from that fortress. Why: "a prereqs argument allows a component to be serialized without having to include all of its libraries; new libraries can be provided when the component is installed at a destination fortress" (`Specification-1.0-frozen/basic/components/basic.tex:434-437`).
10. **`hide` and `constrain`.** They make a component that no longer shows some of its apis. Why: among other reasons, so that two components that use different implementations of one api can be linked together (`Specification-1.0-frozen/basic/components/advanced.tex:15-35`).

## The editions, side by side

Provenance of each edition: `Specification-history/README.md`.

**1.0α, 19 September 2006** (`Specification-history/fortress.1.0alpha.pdf`)

- Chapter 2, sections 2.1 "The Fortress Programming Environment", 2.2 "Exports, Imports, and Linking Components" and 2.3 "Automatic Generation of APIs", pages 16 to 21. The commands: `fortress script`, `compile`, `run`, `remove`, `removeApi`, `link`, `upgrade`, `upgradeAll`, `api`.
- It defines the word: a program is "compiled into one or more components, which are stored in a persistent database called a fortress".
- Chapter 22, "Components and APIs", pages 162 to 178. Section 22.7, "Basic Fortress Operations": compile, link, execute, upgrade, extract and install, uninstall, testing. Section 22.8, "Advanced Features of Fortress Operations": constrain and hide.
- Chapter 39, a library api `Fortress.Components` "for use by components themselves (e.g., development environments)". Appendix C, a formal account of components and apis.
- The chapter says where it comes from: "The system described in this chapter is based on that described in [2]", and [2] is "E. Allen, V. Luchangco, and S. Tobin-Hochstadt. Encapsulated Upgradable Components, Mar. 2005."

**1.0β, 6 March 2007** (`Specification-history/fortress.1.0beta.pdf`)

- The same sections at the same numbers: 2.1 to 2.3 from page 18, chapter 22 from page 171, chapter 39, appendix C.
- Chapter 22's sections 22.7 and 22.8 read the same as α's. A comparison of the two texts with layout removed shows no changed sentence, only moved figures and footnote numbers.
- Chapter 2 differs in small points. The import example is `import foo from Zeepf` where α wrote `import {foo} from Zeepf`. Section 2.3 gains a paragraph: "Note that the API corresponding to an automatically generated source file is not automatically added to the resident fortress; the source file must still be compiled via a separate action."

**1.0, 31 March 2008** (`Specification-1.0-frozen/fortress.1.0.pdf`)

- Section 2.1 keeps the title and the `HelloWorld` example. The commands are `fortress run file.fss` and `fortress compile`. `remove`, `link`, `upgrade` and `upgradeAll` are gone. Section 2.2 is retitled "Exports and Imports". Section 2.3 on generated apis is gone.
- The changed definition (page 16): the program "is compiled into a component, which is stored in a hidden persistent cache maintained by the implementation. called a fortress". It adds: "Once a program is compiled, the cached code will be used during execution unless modifications have been made to the source file since the most recent compilation."
- The promise, in place of the β paragraph on linking (page 19): "our intention is that in future implementations, it will be possible to make use of APIs to provide sophisticated link and upgrade operations for the purposes of building large programs."
- The example ends with `fortress run Blargh.fss`, and "References to API Zeepf in Blargh are resolved to their implementation in component Ralph." No command chooses `Ralph`.
- Chapter 20, "Components and APIs", pages 117 to 121. It has four sections: overview, components, apis, and "Component and API Identity". The fortress operations, chapter 39's api and appendix C are gone. It still says "Linking components produces new components, whose constituents are the components that were linked together", and no longer says how.
- The reference to the 2005 paper stays in the bibliography.

**The Working Draft, as the team left it on 2 February 2011** (`Specification-1.0-frozen/`)

- The components chapter is β's chapter back, whole: `basic/components/overview.tex`, `basic.tex` (compile at line 32, link 76, execute 171, upgrade 248, extract and install 419, uninstall 558, testing 580) and `advanced.tex` (constrain 63, hide 89). The library api is back (`advanced-lib/components.tex`), and the formal appendix (`appendices/components.tex`).
- The team marked it. At the head of the chapter: "This chapter including various syntax is out of date." (`basic/components/intro.tex:12`). At the head of the appendix: "This chapter might not be up to date." (`appendices/components.tex:15`). In the linking text: "THERE IS ANOTHER RESTRICTION ON LINKING, but it is trivially met if you can't hide APIs." (`basic/components/basic.tex:148-150`).
- Chapter 2 (`preliminaries/overview.tex`) is a splice of two editions. It keeps 1.0's definition, "a hidden persistent cache" (line 91), and 1.0's promise of "future implementations" (lines 334-338), with the β sentences that the promise replaced still there as comments (lines 339-344). It restores β's `fortress remove` (line 195), `removeApi` (line 292), the whole passage on encapsulation and `fortress upgrade` (lines 372-426) and section 2.3.
- The splice lost one command. The restored passage speaks of the compound component `Gary` ("All references to API Zeepf in Gary are resolved", line 372), but the command that makes `Gary`, `fortress link Gary from Ralph with Blargh`, is not in the file. The example before it still ends with 1.0's `fortress run Blargh.fss` (line 363). So the draft upgrades a component that it never builds. This is why section 2.1 to 2.2 reads as breadcrumbs.
- Its head note says so: "From \secref{programming-env} to \secref{apitool} are out of date." (line 23), that is, sections 2.1 to 2.3.

**Did 1.0 remove it as not implemented?** Yes. The 1.0 preface: "In order to synchronize the specification with the implementation, it was necessary both to add features to the implementation and to drop features from the specification." And: "many other minor language features defined in the Fortress Language Specification, Version 1.0β have been elided. All of these features require additional research before they can be implemented reliably". The preface names static checks, syntactic abstraction, distributions and nested transactions. It does not name components or linking. The cut of linking shows only in the text, and in the "future implementations" sentence above.

**Did 1.0 promise to put it back?** Yes, in general: "our goal in moving forward is to incrementally add back features taken out of the specification as they are implemented. In particular, all language features included in the Fortress Language Specification, Version 1.0β remain goals for eventual inclusion in the language (perhaps with additional modification and evolution of their design)."

**Did the Working Draft put it back?** Yes, as text, and not because it had been implemented. The dates, from the contents of each commit (a path's `git log` is not reliable here, `explorations/coordinator/map/design-intent-sources.md:93`):

- The specification's sources are not in git before 2009-10-20 (`d8859d236f`, "[spec] Added chapter headings."). The LaTeX of α, β and 1.0 is not in the repository.
- 2009-11-02 (`cec470a34b`): the components chapter's files appear as stubs, and the formal appendix whole.
- 2009-11-05 (`d26c347121`, "[spec] Added the Preliminaries part."): chapter 2 appears, already with the β passages and already with the note "are out of date".
- 2009-11-06 (`0f49d86983`, "[spec] Added the entire spec files. The next task is to integrate the technical decisions since 1.0."): the components chapter's full text.
- 2009-11-09 (`61e28a78c4`, "[spec] Added a list of NYI features."): the preface's list. Its last item is "components linking" (`Specification-1.0-frozen/fortress/preamble.tex:95`).
- After that, chapter 2 and `basic/components/basic.tex` change once, on 2011-02-02, and only in the copyright header.
- The preface of the draft states the policy: "This specification is a working draft; it is meant to include all language features included in the Fortress Language Specification, Version 1.0β ... and any language changes since then. ... it may include wild ideas that require additional research before they can be implemented reliably." (`preamble.tex:42-49`).

So the fortress operations were in α and β, out of 1.0, and back in the draft in November 2009 as β's unrevised text, marked out of date on the day it came back.

## What they were going after, in their words

All line numbers are of `Specification-1.0-frozen/`. The same sentences are in α and β, chapter 22.

- **The aim in one sentence.** "Fortress programs are developed, compiled, and deployed as encapsulated upgradable components that exist not only as programming language features, but also as self-contained run-time entities that are managed throughout the life of the software. ... With components and APIs, Fortress provides the stability benefits of static linking with the sharing and upgrading benefits of dynamic linking." (`basic/components/intro.tex:165-176`)
- **Why code names only apis.** "A key design choice we make is to require that components never refer to other components directly; all external references are to APIs. This requirement allows programmers to extend and test existing components more easily, swapping new implementations of libraries in and out of programs at will." (`basic/components/overview.tex:26-31`). And in α and β, section 2.2: "Programmers are able to link together components from separate programming teams, swap in revised components into deployed applications, and even test components that rely on expensive libraries by wiring them up to special mock components that provide just enough functionality to allow for testing."
- **Why it is more than a module system.** "Components are similar to modules in other programming languages, such as those of ML and Scheme. But, unlike modules in those languages, components are designed for use during both development and deployment of software." (`overview.tex:39-42`)
- **Why an upgrade makes a new component.** "A key aspect of Fortress components is that they are encapsulated, so that upgrading one component does not affect any other component, even those produced by linking with the component that was upgraded. Abstractly, each component has its own copy of its constituents. However, implementations are expected to share common constituents when possible." (`overview.tex:48-53`). And: "Recall that in our system, unlike with dynamic linking, components are encapsulated so that an upgrade to one component does not affect any other component on the system. We can imagine that all operations on components copy the components that they operate on rather than share them. Because components are immutable, these two interpretations are semantically indistinguishable." (`basic.tex:401-410`)
- **What the fortress is.** "Users do not manipulate components directly. Instead, every component is installed in a persistent database on the system. We think of this database, which we call a fortress, as the agent that actually performs operations such as compilation, linking, upgrading, and execution of components: a virtual machine, a compiler, and a library registry all rolled into one. ... Components and APIs are immutable objects. A fortress maps names to components installed on the system. The fortress operations are modeled as methods of the fortress that change the mapping." (`overview.tex:55-70`)
- **What they left to the implementer.** "The ways in which fortresses are actually realized on particular platforms are beyond the scope of this specification. An implementor might choose to instantiate a fortress as a process, or as a persistent object database stored in a file system, with fortress operations being implemented as scripts that manipulate this database." (`overview.tex:73-78`)
- **Who controls an upgrade.** A component can be upgraded only if it exports the api `Upgradable`, with a function `isValidUpgrade`. "Developers can define their own versions of this component to restrict how their components can be upgraded. For example, they can prevent upgrades with older versions of a component, or with a matching component from an untrusted vendor." (`basic.tex:309-312`)
- **Shipping without the libraries, and control of access.** The prerequisites of `extract` (quoted in step 9), and: "This difference provides a means for controlling access to the extracted component, for security, legal, or other reasons." (`basic.tex:513-515`)
- **Hiding, and optimization across components.** The plain system "exposes to everyone all the APIs used in the development of a project", and "By allowing access to these APIs, it inhibits significant cross-component optimization." Hiding an api closes it, so that nothing outside can replace its implementation (`advanced.tex:15-45`). This is the only place where the text ties the design to optimization. It does not say what a fortress would then optimize.
- **Several implementations side by side.** A fortress keeps, for each api, "a list of components that implements it, in order of preference" (`basic.tex:485-487`), and installs a new component at the head of the list of each api it exports (`basic.tex:536-538`).

Outside the specification:

- **The team's paper** is cited and not held. "Encapsulated Upgradable Components", Eric Allen, Victor Luchangco and Sam Tobin-Hochstadt, March 2005, Sun Microsystems, number 2005-0156 (`Specification/fortress/fortress.bib:12-19`). No copy is in `Papers/`, `research/` or `research/decks/`, and the territory map has no row for components. I could not confirm that it was ever published outside Sun.
- **Steele, 2016.** His JuliaCon talk lists under growability "modular libraries (components and APIs, separate compilation, multiple co-existing implementations of one interface)" (our extract, `research/extracts/SteeleJuliaCon2016-extract.md:49-50`). This is the extract's summary of slide 11, not a quotation of it.
- **The closing post, July 2012.** It lists "components and APIs" among eight aspects that the team was pleased with (`research/extracts/fortress-websites-wayback.md:119-123`). It does not speak of fortresses or of upgrading.
- The 2012 restart of the specification, `Documentation/Specification/`, has no chapter on components and no sentence on fortresses or upgrades.

## The peers

Only the first comparison is the team's. The rest is from general knowledge, not from this repository.

- **ML signatures, structures and functors.** The team's own comparison (`overview.tex:39-42`). Same: an api is a signature, a component is a structure, and a component with imports is a functor, code that is closed only when it is given implementations of its imports. Differs: ML's linking is an expression in the source, and ML has no store, no upgrade and nothing at deployment.
- **Units of PLT Scheme (Racket), and Jiazzi for Java.** Same: a unit names only signatures that it imports and exports, and a separate step links units into a *compound unit*, which is itself a unit. This is the link operation of Fortress almost word for word. Differs: units are values of a running program. They have no persistent store and no upgrade.
- **The Nix package store.** Same: everything installed is immutable, an "upgrade" builds a new thing beside the old, and a name (a profile) is rebound to it, so the old one still works for whatever holds it. Differs: a Nix package depends on exact other packages, not on interfaces, and no type check says that a replacement fits.
- **OSGi bundles.** Same: a bundle declares the packages that it imports and exports, never the bundle that supplies them, and a framework that keeps running installs, resolves and updates bundles. This is the fortress as "agent". Differs: an OSGi update changes the bundle in place for every user of it, which is the effect that Fortress's encapsulation was designed to prevent.
- **Java modules (since Java 9).** Same: explicit exports, and a link tool (`jlink`) that makes a closed image. Differs: `requires` names a module, not an interface. Only the service mechanism (`uses` and `provides`) binds by interface.
- **Swift module interfaces and library evolution.** Same: a client is compiled against a textual interface, and the library's binary can be replaced without recompiling the client. Differs: the client names the module, one implementation has that name, and the replacement is in place, for every client at once.
- **Static and dynamic linking in C.** The team's own frame. Static linking gives each program its own copy, which never changes and never gets a fix. Dynamic linking shares one copy, which changes under every program at once. Fortress wanted the copy to be private in meaning, shared in storage, and replaced only by a command.

The closest for the language part is units: a component is a unit, and `link` builds a compound unit. The closest for the fortress itself is the Nix store. No peer known to me joins the two with a typed check of each replacement.

## What is built today, and what is not

The record: FACTS F-22, F-282 and F-294; ledger rows 320 and 841; `explorations/reviews/preface-list-provenance-2026-11-16.md`, "Components linking".

Built:

- **Apis and components as source.** `import` and `export`, and separate checking of a component against apis only. The compiled path checks a component against the apis that it exports (F-282, F-294). Walk does not (row 841).
- **`fortress compile`.** It writes one jar for each component into `default_repository/caches/bytecode_cache/` (`ProjectFortress/src/com/sun/fortress/Shell.java:405`).
- **`fortress link X` and `fortress build X`.** They compile `X` and the components behind the apis that it imports, then rewrite the api names inside the jars to component names (`Shell.java:412-421`, `linker/Linker.java:213-269`). The result is not a new named component: the jar of `X` is replaced in the cache. The linker is the team's, of January and February 2012 (`8267d2d088`, "Experimental prototype for a component system"; `1d4e967aac`), later than the draft's text.
- **A table of who implements what.** `linker/LinkShell.java`, reached by `bin/comp/tlink`, keeps two maps in `caches/global.map`: api to component, and (component, api) to component. Its commands are `alink`, `clink`, `arm`, `crm`, `alias`, `print`, `reset`. This is the nearest thing in the tree to the fortress's table of preferred implementations. Without an entry, an api is looked for only under its own name, so an api implemented by a component of another name is not found (F-22, row 320).
- **`fortress run X`.** It starts a JVM on the cache's jars (`bin/fortress:16`, `bin/run`). It takes a component's name, as the chapter's `run` does.
- **`fortress api X.fss`.** It writes an api from a component, as section 2.3 says (`Shell.java:427`).
- **Caches.** They are keyed by source path and reused while the source is unchanged. This is what the 1.0 release called a fortress.

Not built, on either path:

- A fortress: a store that maps names to immutable components, with shadowing and rebinding.
- A compound component: `link` with a result name and constituents.
- `upgrade`, `upgradeAll`, and the apis `Upgradable` and `Installable`.
- `remove` (`uninstall`), `removeApi`.
- `extract`, `install`, `installAPI`, and the list of preferred implementations as the chapter states it.
- `hide` and `constrain`.
- The library api `Fortress.Components`.

`bin/fortress upgrade Gary` and `bin/fortress extract Gary` print the usage message (run on 2026-11-16 at `6c31470f6b`). `Shell.java:405-489` names none of these commands.

The ledger holds no row for the missing operations. A row ready to file, checked with `ledger.py check --rows` (it fails only the number rule), for the section "3. Traits, objects and components":

    | ? | the fortress operations of the components chapter other than compile, link, run and api exist on neither path: `upgrade`, `upgradeAll`, `remove`, `removeApi`, `extract`, `install`, `uninstall`, `hide` and `constrain` are no commands of `bin/fortress`, and no class builds a compound component | NEGATIVE-VERIFIED | implementation gap (tools) | `Specification-1.0-frozen/basic/components/basic.tex:248`, "Basic Fortress Operations"; `basic/components/advanced.tex`, "Advanced Features of Fortress Operations" | none | fortresses intent note | siblings: 320. `Shell.java:405-489` names no such command; `bin/fortress upgrade Gary` and `bin/fortress extract Gary` print the usage message ('Usage:', then ' parse [-out file] ...'). `fortress link` takes one component and rewrites api names to component names in its jar (`linker/Linker.java:213-269`); it makes no new named component. `Upgradable`, `Installable` and `Fortress.Components` are in no library. The preface lists 'components linking' as not yet supported (`Specification-1.0-frozen/fortress/preamble.tex:95`). Detail: `explorations/reviews/fortresses-intent-2026-11-16.md`. |

A second defect is in the text, not the code: the Working Draft's chapter 2 upgrades the component `Gary` and never links it (above). The revision's chapter has the same gap: `Specification/preliminaries/overview.tex` holds no `link Gary` either.

## Can the vision be finished from what the team left?

What the team's sources describe well enough to build from:

- The operations and their types: compile, link, execute, upgrade, extract, install, uninstall, hide, constrain (`basic.tex`, `advanced.tex`).
- The conditions under which a link or an upgrade is valid, with their reasons (`basic.tex:344-398`, `advanced.tex:183-246`).
- The set-level model of components, apis, imports, exports and constituents (`appendices/components.tex`).
- The api by which a program handles components itself (`advanced-lib/components.tex`).

What no source of the team in this repository describes:

- **What a fortress is on disk.** The text leaves it out on purpose: "beyond the scope of this specification".
- **How constituents are shared.** "Implementations are expected to share common constituents when possible", and the "optimization tricks ... are beyond the scope".
- **How an upgrade reaches compiled code.** The text predates the compiler. It does not say whether an upgrade relinks jars, regenerates code, or only rebinds names. The 2012 linker rewrites names in a jar, in place, which is the opposite of an immutable component.
- **What happens to a running program.** Every operation is on stored components. Nothing speaks of replacing code in a process that is running.
- **How multiple dispatch crosses a link.** A function overloaded in two components must dispatch as one. The component text is of 2005 and does not treat it. The 1.0 chapter has a section "Cross-Component Overloading" (20.2.3), which is about source, not about linking.
- **Versions.** The text gives `isValidUpgrade` as the hook, and gives no scheme of version numbers or compatibility.
- **What a hidden api lets the compiler do.** The claim on cross-component optimization has no account behind it.
- **The 2005 paper itself**, which the chapter says it is based on, and which may answer some of the points above. To get it: Sun Labs technical reports of 2005, or the authors.
- **Where the team stood at the end.** The chapter's own note says "out of date" and cites a proposal of 2009 for compound apis. The team's last word on linking is the 2012 prototype, which implements a table from api to component and nothing of upgrading.

Decisions not taken. Each is the curator's; this note recommends none.

- Whether the revival's goal includes the fortress operations at all. The sources: β's text (2007), cut from 1.0 (2008), restored unrevised and marked out of date (2009), listed as not supported (2009), and a prototype of another shape (2012). The model program needs none of it. Doing nothing keeps today's behaviour.
- If it does, whether the text of 2007 or the linker of 2012 is the starting point. They disagree on whether linking makes a new component or changes one in place.
- Whether chapter 2 of the revision keeps the spliced text with its note, restores the lost `link` command from β, or goes back to the 1.0 wording. Only the first keeps the current text.
- Whether the row above is filed.
