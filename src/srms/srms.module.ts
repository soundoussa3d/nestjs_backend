import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Srm, SrmSchema } from 'src/schemas/srms.schema';
import { SrmsController } from './srms.controller';
import { SrmsService } from './srms.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Srm.name, schema: SrmSchema }]),
    ],
    controllers: [SrmsController],
    providers: [SrmsService],
    exports:[SrmsService]
})
export class SrmsModule {}
