import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SrmsService } from './srms.service';
import { Srm } from 'src/schemas/srms.schema';
import { CreateSrmDto } from './dto/create-srm.dto';
import { UpdateSrmDto } from './dto/update-srm.dto';

@Controller('srms')
export class SrmsController {
    constructor(private readonly srmService: SrmsService) {}

    @Post()
    create(@Body() createSrmDto: CreateSrmDto): Promise<Srm> {
        return this.srmService.create(createSrmDto);
    }

    @Get()
    findAll(): Promise<Srm[]> {
        return this.srmService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Srm> {
        return this.srmService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSrmDto: UpdateSrmDto): Promise<Srm> {
        return this.srmService.update(id, updateSrmDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.srmService.remove(id);
    }
}
