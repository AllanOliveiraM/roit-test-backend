import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common'
import { Request as RequestExpress } from 'express'

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { CreateUserDto } from '../dto/create-user.dto'
import { RedefinePasswordDto } from '../dto/redefine-password.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDto } from '../dto/user.dto'
import { UserService } from '../services/user.service'

import type { Id } from '../../../types/models'

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<UserDto[]> {
    return this.userService.getAll().catch(error => {
      throw new BadRequestException(error)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: Id): Promise<UserDto> {
    return this.userService.getById(id).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.create(user).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: Id,
    @Body() user: UpdateUserDto,
    @Request() req: RequestExpress
  ): Promise<UserDto> {
    return this.userService.update(id, user, req.user).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @Post('redefine-password')
  @UsePipes(ValidationPipe)
  async redefinePassword(@Body() data: RedefinePasswordDto): Promise<UserDto> {
    return this.userService.redefinePassword(data).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: Id, @Request() req: RequestExpress) {
    return this.userService.delete(id, req.user).catch(error => {
      throw new BadRequestException(error)
    })
  }
}
