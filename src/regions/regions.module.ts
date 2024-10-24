import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from 'src/schemas/region.schema';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
    ],
    controllers: [RegionsController],
    providers: [RegionsService],
    exports: [RegionsService],
})
export class RegionsModule {}
