import './environment/setup'

import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet())
  app.enableCors()

  await app.listen(process.env.SERVER_PORT)
}

bootstrap()
