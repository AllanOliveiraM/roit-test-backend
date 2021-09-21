import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { UserDto } from '../../users/dto/user.dto'
import { AuthService } from '../services/auth.service'

import { Email, Password } from '../../../types/models'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }

  async validate(email: Email, password: Password): Promise<UserDto> {
    return await this.authService.validateUser(email, password)
  }
}
