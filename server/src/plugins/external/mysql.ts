import fastifyMysql, { type MySQLPromisePool } from '@fastify/mysql'
import { type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    mysql: MySQLPromisePool
  }
}

export const autoConfig = (fastify: FastifyInstance) => ({
  promise: true,
  host: fastify.config.MYSQL_HOST,
  user: fastify.config.MYSQL_USER,
  password: fastify.config.MYSQL_PASSWORD,
  database: fastify.config.MYSQL_DATABASE,
  port: Number(fastify.config.MYSQL_PORT),
})

export default fp(fastifyMysql, {
  name: 'mysql',
})
