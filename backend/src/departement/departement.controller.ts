import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { Departement } from 'src/schemas/departement.schema';

@Controller('departement')
export class DepartementController {
    constructor(private readonly departementService: DepartementService) {}

    @Post()
    create(@Body() createDepartementDto: CreateDepartementDto): Promise<Departement> {
        return this.departementService.create(createDepartementDto);
    }

    @Get()
    findAll(): Promise<Departement[]> {
        return this.departementService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Departement> {
        return this.departementService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDepartementDto: CreateDepartementDto): Promise<Departement> {
        return this.departementService.update(id, updateDepartementDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.departementService.remove(id);
    }
}
