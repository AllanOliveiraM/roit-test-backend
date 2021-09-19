import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  a = 'Hello World!'

  getHello(): string {
    return this.a
  }
}
