import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionSeederService } from 'src/regions/region-seeder.service';
import { RegionsModule } from 'src/regions/regions.module';
import { RoleSeederService } from 'src/role/role-seeder.service';
import { RoleModule } from 'src/role/role.module';
import { Region, RegionSchema } from 'src/schemas/region.schema';
import { Role, RoleSchema } from 'src/schemas/role.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserSeeder } from 'src/users/user.seeder';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
        RoleModule,
        RegionsModule
      ],
      providers: [RoleSeederService,UserSeeder,RegionSeederService],
      exports: [UserSeeder],
})
export class SeederModule {}
