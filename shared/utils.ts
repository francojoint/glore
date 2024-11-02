export const parseEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] || process.env[`NEXT_PUBLIC_${key}`]
  if (!value && !fallback) throw new Error(`${key} is not defined`)
  return value || (fallback as string)
}

export const toCamelCase = (string: string, mode: 'lower' | 'upper' = 'lower'): string => {
  const transformed = string.replace(/-([a-z])/g, g => g[1].toUpperCase())
  return mode === 'lower' ? transformed : transformed[0].toUpperCase() + transformed.slice(1)
}
