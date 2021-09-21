import { Controller, UseGuards, Request, Post } from '@nestjs/common'
import { Request as RequestExpress } from 'express'

import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestExpress) {
    return this.authService.login(req.user)
  }
}
