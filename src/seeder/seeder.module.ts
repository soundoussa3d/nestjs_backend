import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSeederService } from 'src/role/role-seeder.service';
import { RoleModule } from 'src/role/role.module';
import { Role, RoleSchema } from 'src/schemas/role.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        RoleModule,
      ],
      providers: [RoleSeederService],
})
export class SeederModule {}
