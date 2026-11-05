<!-- The record-landing workflow's page brief: after the skill update and its fixes, update the page of fortress-repo's landed changes, one item per change with its new text whole, its old words struck through, its changed words marked and its reason in plain words, and publish it by its URL. -->

# The page of the `fortress-repo` skill's changes

You work in the Fortress revival repository, `/home/user/fortress`. The curator is the person in charge of the project. The `fortress-repo` skill (`.claude/skills/fortress-repo/`) holds the rules of every worker. The curator follows its changes on one page, a claude.ai artifact, which he reads on a phone and listens to with iOS Speak. A landing has just changed the skill, through the skill writer, a cold read and the writer's fixes. Your launch message names the batch, the skill run's folder, the base commit before the changes, and the commits. Update the page so that it shows the new changes, and publish it.

## Where the page is

The boot note, `explorations/coordinator/BOOT.md`, its section "The record, the machine, the pages", the bullet "Pages", names the page of the worker skill's changes (`fortress-repo`): its URL and its source file. Take both from there, exactly. A `<scratchpad>` in the path is the scratchpad directory that your environment names, the coordinating session's. Read the source whole. If the source is missing, rebuild it from the published page: the Artifact tool's `read` action on the URL returns its HTML.

## The form

Read the form before you write: the `coordinator` skill's `SKILL.md`, the paragraph "**Pages.**", and its `references/skill-rewrite.md`, "The method", step 7. The page has one section, the landed changes.

- **Which items stay.** The page holds only the landed changes that the curator has not read. The boot note's "Pages" line of this page gives the item that he said he read up to, and the time of his word. Drop that item and every older item. Keep every newer item. If the line names no such item, keep every item.
- **The numbers.** The items stand oldest first. Add the new items after the page's last item, and number them on from it, also when you dropped every item: after item 12, the first new item is 13. Do not renumber the items that stay.
- **One item for each change**: one sentence, or a few sentences side by side changed for one reason. Show the net change of both of the writer's tasks, against the skill's text at the base: `git -C /home/user/fortress diff BASE main -- .claude/skills/fortress-repo/`. A line of `references/sources.md` is no item; name the new provenance in the section's references. A draft is a change that waited for the curator's yes; a whole part of the skill that he approved on its own page is a draft too. If the writer's task or report says that a change installs an approved draft, give it no item, unless the landing changed the approved words. Then the item shows the change against the approved words, not against the base.
- **An item holds**, as the page's current items do: its place (the file, the section, the line); its new text whole, with the words that went struck through and the words that came in marked; and its reason, inside the item, under "Why.". It has no collapsed current text.
- **The reason** says in plain words what was wrong and what the text now says. Take it from the writer's reports (`writer-1.md`, `writer-2.md` in the run's folder), and from the cold read (`cold-read.md`) for a fix. Never cite a cold read's flag by its code or its number, a ruling's number or a task's item number, and name no internal handle that the page's glossary does not define.
- **The rest of the page.** Keep its house style, its Select buttons and their script. Put the references at the bottom of the section, numbered by item, never inside an item. Raise the version in the masthead and in the description, with today's date (`date -u`), and bring the standfirst, the section's opening paragraph, the contents and the glossary in line with the items. Write a new term in the glossary as a dictionary does: the term, then a noun phrase with no article.

## Publishing

Publish by the page's URL, never without it: a publish without the URL makes a new page. With the Artifact tool, first `read` the URL, then `publish` your source file with `url` set to it. If you have no Artifact tool, or the publish is refused, write the source anyway, and say why in your result: the coordinator then publishes it by its URL.

Edit no file but the page's source. Commit nothing.

Your structured result: whether you published; the URL; the version the publish gave; the source's path; the number of items on the page and of new ones; and one line on what the new items show.
