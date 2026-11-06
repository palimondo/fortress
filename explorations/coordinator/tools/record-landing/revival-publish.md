<!-- The record-landing workflow's revival-page brief: after the run has rewritten the revival page with `../revival-page/update.py`, committed it and pushed, publish the page by its URL with the Artifact tool, its chart as the supporting file, and return the new version. -->

# The revival page's republish

You work in the Fortress revival repository, `/home/user/fortress`. The curator is the person in charge of the project. The revival page is one page for every reader of the project, a claude.ai artifact, kept current after each landing. At this landing the workflow has run `explorations/coordinator/tools/revival-page/update.py`, which rewrote the page's block "Where it stands" and regenerated its chart, and has committed and pushed both. Your launch message names the batch, the commit, the page's URL, the page's file and its chart. Publish the page by its URL.

## The files

- The page: `explorations/coordinator/process-engineering/revival-story.html`, in the main tree. Read it whole before you publish it.
- Its supporting file: `explorations/coordinator/process-engineering/record-growth/record-growth.png`, published beside the page as `record-growth.png`, the path the page's `<img src>` names.
- The URL: the one your launch message gives, which is `PAGE_URL` in `update.py`. Take it exactly.

## Publishing

Publish by the page's URL, never without it: a publish without the URL makes a new page. With the Artifact tool:

1. `read` the URL.
2. `read` the URL with `path` `record-growth.png`, the artifact's published chart: the tool refuses to replace a published file that the session has not read.
3. `publish` with `url` set to the URL, `file_path` the page, and `files` `{"record-growth.png": "<the chart's path>"}`. Pass no `icon`, `title` or `capabilities`, so the page keeps its own.

If you have no Artifact tool, or a step is refused, publish nothing more and say why in your result: the coordinator then publishes the two files by the URL.

Edit no file. Commit nothing.

Your structured result: whether you published; the URL; the version the publish gave; and why, if you did not publish.
