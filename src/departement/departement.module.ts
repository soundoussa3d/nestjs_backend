import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from 'src/schemas/departement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Departement.name, schema: DepartementSchema }]),
],
  providers: [DepartementService],
  controllers: [DepartementController],
  exports: [DepartementService],
})
export class DepartementModule {}
