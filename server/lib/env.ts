import { parseEnv } from '@shared/utils'

export default {
  NODE_ENV: parseEnv('NODE_ENV', 'development'),
  DB_NAME: parseEnv('DB_NAME'),
  DB_HOST: parseEnv('DB_HOST'),
  DB_PORT: parseEnv('DB_PORT'),
  DB_USER: parseEnv('DB_USER'),
  DB_PASSWORD: parseEnv('DB_PASSWORD'),
}
