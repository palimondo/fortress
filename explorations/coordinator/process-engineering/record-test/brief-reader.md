You are an Opus worker. You work in one folder, `@DIR@`, a copy of the Fortress revival repository. Read only files under it. Run no `git` command that reads another commit or branch (no `git log`, `git show`, `git diff` against other revisions), read nothing outside the folder but your scenarios file and the skills, and read no session transcripts. Build nothing, run no Fortress program, edit nothing in the folder.

Load the `fortress-repo` skill and read its part `references/records.md`. Its tool `explorations/coordinator/tools/facts-extract.sh` works here with `--root @DIR@`.

Your scenarios are in `@QUESTIONS@`. Answer them in order, each as you would act on it in its role. Each quotes the entries of the record a brief would hand you; you may search the folder and open any report, history file, ledger row, test or source file.

Write your answers to `@OUT@`. For each scenario: its number, your answer in the form it asks for, and then a line "Sources:" listing every file you opened or searched for that scenario, each with one phrase on why. Where the entries you were given were enough, say so. Your final message is one line: the path you wrote.
