/**
 * Error thrown when a migration fails.
 */
export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MigrationError'
  }
}

/**
 * Generate a migration file name using a timestamp and a name.
 */
export const migrationFileName = (timestamp: string, name?: string) => {
  if (!name) throw new DatabaseError('You must specify a migration name')
  if (!/[_a-zA-Z]+/i.test(name)) throw new DatabaseError('Migration name must contain only letters and underscores')
  return `${timestamp}_${name.toLowerCase()}`
}

/**
 * Generate a seeder file name using an optional base name.
 */
export const seederFileName = (name?: string) => {
  if (!name) throw new DatabaseError('You must specify a seeder name')
  if (!/[-\w]+/i.test(name)) throw new DatabaseError('Seeder name must contain only letters and hyphens')
  return `${name.toLowerCase().replace('seeder', '')}`
}
