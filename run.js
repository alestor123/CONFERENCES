const conferences = require('./App');
(async () => {
  const data = await conferences(process.env.GHTOKEN, { topics: ['typescript'] })
  console.log(data)
})()
