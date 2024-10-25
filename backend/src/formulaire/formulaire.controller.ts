import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto, UpdateFormulaireDto } from './dto/formulaire.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { Formulaire } from 'src/schemas/formulaire.schema';

@Controller('formulaire')
export class FormulaireController {
    constructor(private readonly formService: FormulaireService) {}

  @Post()
  create(@Body() createFormDto: CreateFormulaireDto ) {
    return this.formService.create(createFormDto);
  }

  @Get()
  async findAll(@Query('createdBy') createdBy?: string): Promise<Formulaire[]> {
    return this.formService.findAll(createdBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormulaireDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }

  @Put(':id/publish')
  publish(@Param('id') id: string) {
    return this.formService.publish(id);
  }
}
