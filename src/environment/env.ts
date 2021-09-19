import type { EnvObject, EnvVar } from './types'

const isProd = process.env.NODE_ENV === 'production'

const DEFAULTS: EnvObject = {
  SERVER_PORT: isProd ? '443' : '3001',
  USE_CONNECTION_STRING: 'false',
  CONNECTION_STRING: 'undefined',
  DB_HOST: 'localhost',
  DB_PORT: '27020',
  DB_NAME: 'roit',
  DB_USER: 'roit',
  DB_PASS: 'password',
}

const getEnvOrDefault = (env: EnvVar) => {
  const envVar = process.env[env]

  return envVar || DEFAULTS[env]
}

export const NODE_ENV = isProd
export const SERVER_PORT = getEnvOrDefault('SERVER_PORT')
export const USE_CONNECTION_STRING = getEnvOrDefault('USE_CONNECTION_STRING')
export const CONNECTION_STRING = getEnvOrDefault('CONNECTION_STRING')
export const DB_HOST = getEnvOrDefault('DB_HOST')
export const DB_PORT = getEnvOrDefault('DB_PORT')
export const DB_NAME = getEnvOrDefault('DB_NAME')
export const DB_USER = getEnvOrDefault('DB_USER')
export const DB_PASS = getEnvOrDefault('DB_PASS')
