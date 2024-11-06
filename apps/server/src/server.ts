import app from '@/app'

(async () => {
  const server = await app()
  const { PORT, HOST } = server.env

  await server.ready(error => {
    if (error) {
      server.log.error(error)
      process.exit(1)
    }

    server.printRoutes()
  })

  try {
    await server.listen({ port: PORT, host: HOST })
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
})()
