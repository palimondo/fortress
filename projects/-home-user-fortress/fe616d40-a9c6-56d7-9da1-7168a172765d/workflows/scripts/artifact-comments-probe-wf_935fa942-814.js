export const meta = {
  name: 'artifact-comments-probe',
  description: 'Probe: can a Workflow agent load the ArtifactComments tool with ToolSearch and read a page\'s comment threads, read-only',
  phases: [{ title: 'Probe', detail: 'one Sonnet agent reads the drafts page\'s comments' }],
}
phase('Probe')
const r = await agent(`Probe, read-only. Load the ArtifactComments tool with ToolSearch (query "select:ArtifactComments"). Then call it with action "read" and url "https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr". Reply, do not write anything anywhere, change nothing, post no reply and resolve no thread: whether ToolSearch found the tool (yes or no, with the error text if no); whether the read call worked (yes or no, with the error text if no); how many threads it listed and whether any is marked "NOT activated"; and the first 100 characters of the newest comment's text. Nothing else.`, { label: 'probe ArtifactComments', phase: 'Probe', model: 'sonnet' })
return { result: r }