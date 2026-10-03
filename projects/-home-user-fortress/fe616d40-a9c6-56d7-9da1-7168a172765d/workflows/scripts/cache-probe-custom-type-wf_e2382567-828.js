export const meta = {
  name: 'cache-probe-custom-type',
  description: 'Measure whether three workflow agents of one custom agent type read its large system prompt from the prompt cache',
  phases: [{ title: 'Custom type' }],
}
const out = []
phase('Custom type')
for (let i = 1; i <= 3; i++) {
  out.push(await agent(`Task ${i}: do not use any tool; reply with exactly "probe A${i} done".`, { label: `custom-${i}`, phase: 'Custom type', agentType: 'cache-probe', model: 'opus' }))
}
return out