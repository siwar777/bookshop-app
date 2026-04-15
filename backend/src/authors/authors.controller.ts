import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; nationality: string; birthYear: number }) {
    return this.authorsService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }
}
