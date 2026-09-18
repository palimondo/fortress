export const meta = {
  name: 'cap-and-alias-probe',
  description: 'Four trivial parallel agents: measure the concurrency cap on this box and whether the model alias opus resolves',
  phases: [{ title: 'Probe', detail: 'each agent runs one 15-second shell command and reports the timestamps' }],
}

phase('Probe')
const results = await parallel([0, 1, 2, 3].map(i => () =>
  agent(
    'You are probe agent ' + i + ' in a timing probe. Run exactly this one Bash command and reply with its complete output and nothing else:\n\n' +
    '    date -u +%T.%N; timeout 15 yes >/dev/null; date -u +%T.%N\n',
    { label: 'probe:' + i, phase: 'Probe', model: 'opus', effort: 'low' },
  )))
return { results }