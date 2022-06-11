const tap = require('tap')
const conferences = require('./App')
const dataRules = { boolean: ['isOver', 'online', 'thisMonth'] }
// array1.filter(val => !array2.includes(val))
tap.test('Error test', async t => {
  await t.rejects(conferences(), { message: 'Please enter a valid github token' })
  await t.rejects(conferences(2323), { message: 'Please enter a valid github token' })
  await t.rejects(conferences(''), { message: 'Please enter a valid github token' })
  await t.rejects(conferences('ghp'), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', { topics: [] }), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', {}), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', { topics: 'test string' }), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', { topics: [] }), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', { topics: [1] }), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', { topics: [1, 'lol'] }), new Error('Please enter valid tags'))
  await t.rejects(conferences('ghp', { topics: [''] }), new Error('Please enter valid tags'))
})
tap.test('Output test', async t => {
  const data = await conferences(process.env.GHTOKEN, { topics: ['api'] })
  data.data.forEach(element => {
    dataRules.boolean.forEach(keyword => t.equal(typeof element[keyword] === 'boolean', true))
    // Object.keys(element).filter(val => !dataRules.boolean.includes(val)).forEach(key => t.equal(typeof element[key] === 'string', true))
    // dataRules.boolean.forEach(keyword => console.log(typeof element[keyword] === 'boolean' ? undefined : typeof element[keyword]))
  })
  //
  //          t.equal(typeof main.time === 'string' && main.time.length > 0, true)
  //    })
  //   t.equal(typeof main.author === 'string' && main.author.length > 0, true)
  //   t.equal(typeof main.latest === 'object' && main.latest.length === 2, true)
  //   t.equal(typeof main.chapters === 'object' && main.chapters.length > tstdata.num, true)
  //   t.equal((await isReachable(main.url)), true)
  //   t.equal((await isReachable(main.coverImg)), true)
  // write test for chapters
})
