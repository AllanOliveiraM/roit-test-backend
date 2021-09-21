import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UserService } from '../../users/services/user.service'

import { simpleDtoFullUserFactory } from '../../../utils/factories'

import type { Email, Password } from '../../../types/models'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(userEmail: Email, userPassword: Password) {
    const user = await this.userService.getByEmail(userEmail)

    if (!user) {
      throw new UnauthorizedException('Invalid email.')
    }

    const isMatch = await bcrypt.compare(userPassword, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password.')
    }

    return simpleDtoFullUserFactory(user)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(user: any) {
    const payload = { email: user.email, sub: user._id }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
