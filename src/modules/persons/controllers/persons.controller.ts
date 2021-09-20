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
} from '@nestjs/common'

import { CreatePersonDto } from '../dto/create-person.dto'
import { PersonDto } from '../dto/person.dto'
import { UpdatePersonDto } from '../dto/update-person.dto'
import { PersonService } from '../services/person.service'

import type { Id } from '../../../types/models'

@Controller('persons')
export class PersonsController {
  constructor(private personService: PersonService) {}

  @Get()
  async getAll(): Promise<CreatePersonDto[]> {
    return this.personService.getAll().catch(error => {
      throw new BadRequestException(error)
    })
  }

  @Get(':id')
  async getById(@Param('id') id: Id): Promise<PersonDto> {
    return this.personService.getById(id).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreatePersonDto): Promise<PersonDto> {
    return this.personService.create(user).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: Id, @Body() user: UpdatePersonDto): Promise<PersonDto> {
    return this.personService.update(id, user).catch(error => {
      throw new BadRequestException(error)
    })
  }

  @Delete(':id')
  async delete(@Param('id') id: Id) {
    this.personService.delete(id).catch(error => {
      throw new BadRequestException(error)
    })
  }
}
