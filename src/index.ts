import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return { hello: 'word' }
})

await app.listen({
  port: 3000,
})
