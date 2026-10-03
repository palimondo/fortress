export const meta = {
  name: 'cache-probe',
  description: 'Measure whether a custom agent type shares its system-prompt cache across workflow agents, against a shared prefix inside the prompt',
  phases: [{ title: 'Custom type' }, { title: 'Control' }],
}
const TEXT = Array.from({ length: 400 }, (_, i) => `Reference line ${i}: this line only makes the prompt large enough for the prompt cache to matter; do not summarise it.`).join('\n')
const out = []
phase('Custom type')
for (let i = 1; i <= 3; i++) {
  out.push(await agent(`Task ${i}: do not use any tool; reply with exactly "probe A${i} done".`, { label: `custom-${i}`, phase: 'Custom type', agentType: 'cache-probe', model: 'opus' }))
}
phase('Control')
const ctl = (tail) => `You are a cache probe in an experiment on prompt caching. Do not use any tool. Answer in one line.\n\n${TEXT}\n\n${tail}`
out.push(await agent(ctl('Reply with exactly "probe B done".'), { label: 'control-1', phase: 'Control', model: 'opus' }))
out.push(await agent(ctl('Reply with exactly "probe B done".'), { label: 'control-2-identical', phase: 'Control', model: 'opus' }))
out.push(await agent(ctl('Reply with exactly "probe B3 done", a different last line.'), { label: 'control-3-tail', phase: 'Control', model: 'opus' }))
return out