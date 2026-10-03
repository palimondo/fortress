export const meta = {
  name: 'cache-probe-control',
  description: 'Measure whether identical whole prompts, and prompts differing only in their last line, share the prompt cache across workflow agents',
  phases: [{ title: 'Control' }],
}
const TEXT = Array.from({ length: 400 }, (_, i) => `Reference line ${i}: this line only makes the prompt large enough for the prompt cache to matter; do not summarise it.`).join('\n')
const ctl = (tail) => `You are a cache probe in an experiment on prompt caching. Do not use any tool. Answer in one line.\n\n${TEXT}\n\n${tail}`
const out = []
phase('Control')
out.push(await agent(ctl('Reply with exactly "probe B done".'), { label: 'control-1', phase: 'Control', model: 'opus' }))
out.push(await agent(ctl('Reply with exactly "probe B done".'), { label: 'control-2-identical', phase: 'Control', model: 'opus' }))
out.push(await agent(ctl('Reply with exactly "probe B3 done", a different last line.'), { label: 'control-3-tail', phase: 'Control', model: 'opus' }))
return out