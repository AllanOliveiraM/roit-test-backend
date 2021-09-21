/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { SECRET_KEY } from '../../../environment/env'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    })
  }

  async validate(payload: any) {
    return { _id: payload.sub, email: payload.email }
  }
}
