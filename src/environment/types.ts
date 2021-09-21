export type EnvObject = {
  SERVER_PORT: string
  SECRET_KEY: string
  USE_CONNECTION_STRING: string
  CONNECTION_STRING: string
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
  DB_USER: string
  DB_PASS: string
}

export type EnvVar = keyof EnvObject
