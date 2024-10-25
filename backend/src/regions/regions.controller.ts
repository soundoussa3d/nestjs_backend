import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { Region } from 'src/schemas/region.schema';

@Controller('regions')
export class RegionsController {
    constructor(private readonly regionsService: RegionsService) {}

    @Post()
    create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
        return this.regionsService.create(createRegionDto);
    }

    @Get()
    findAll(@Query('managerId') managerId?: string): Promise<Region[]> {
        return this.regionsService.findAll(managerId);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Region> {
        return this.regionsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRegionDto: CreateRegionDto): Promise<Region> {
        return this.regionsService.update(id, updateRegionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.regionsService.remove(id);
    }
}
