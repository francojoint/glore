import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

import plugin from '@/lib/plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    /**
     * Hash a string using scrypt.
     */
    hash: typeof hash
    /**
     * Compare a string with a scrypt hash.
     */
    compare: typeof compare
  }
}

/**
 * Options for the `scrypt` plugin.
 */
export interface FastifyScryptOptions {}

const SCRYPT_KEYLEN = 32
const SCRYPT_COST = 65536
const SCRYPT_BLOCK_SIZE = 8
const SCRYPT_PARALLELIZATION = 2
const SCRYPT_MAXMEM = 128 * SCRYPT_COST * SCRYPT_BLOCK_SIZE * 2

const hash = async (value: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const salt = randomBytes(Math.min(16, SCRYPT_KEYLEN / 2))

    scrypt(
      value,
      salt,
      SCRYPT_KEYLEN,
      {
        cost: SCRYPT_COST,
        blockSize: SCRYPT_BLOCK_SIZE,
        parallelization: SCRYPT_PARALLELIZATION,
        maxmem: SCRYPT_MAXMEM,
      },
      (error, key) => {
        if (error !== null) return reject(error)
        resolve(`${salt.toString('hex')}.${key.toString('hex')}`)
      },
    )
  })

const compare = async (value: string, hash: string): Promise<boolean> => {
  const [salt, hashed] = hash.split('.')
  const saltBuffer = Buffer.from(salt, 'hex')
  const hashedBuffer = Buffer.from(hashed, 'hex')

  return new Promise(resolve => {
    scrypt(
      value,
      saltBuffer,
      SCRYPT_KEYLEN,
      {
        cost: SCRYPT_COST,
        blockSize: SCRYPT_BLOCK_SIZE,
        parallelization: SCRYPT_PARALLELIZATION,
        maxmem: SCRYPT_MAXMEM,
      },
      (error, key) => {
        if (error) {
          timingSafeEqual(hashedBuffer, hashedBuffer)
          resolve(false)
          return
        }
        resolve(timingSafeEqual(key, hashedBuffer))
      },
    )
  })
}

/**
 * Custom plugin to handle scrypt hashing.
 *
 * @see {@link https://nodejs.org/api/crypto.html}
 */
export default plugin(
  async fastify => {
    fastify.decorate('hash', hash)
    fastify.decorate('compare', compare)
  },
  { name: 'scrypt' },
)
