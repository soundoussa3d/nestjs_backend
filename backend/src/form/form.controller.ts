import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Post()
    async create(@Body() createFormDto: CreateFormDto) {
      return this.formService.create(createFormDto);
    }
  
    @Get()
    async findAll() {
      return this.formService.findAll();
    }
  
    @Get('agent/:agentId')
    async findByAgent(@Param('agentId') agentId: string) {
      return this.formService.findByAgent(agentId);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.formService.findOne(id);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateFormDto: UpdateFormDto,
    ) {
      return this.formService.update(id, updateFormDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.formService.delete(id);
    }
}
