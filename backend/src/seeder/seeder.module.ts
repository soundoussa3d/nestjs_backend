import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSeederService } from 'src/role/role-seeder.service';
import { RoleModule } from 'src/role/role.module';
import { Role, RoleSchema } from 'src/schemas/role.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserSeeder } from 'src/users/user.seeder';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        RoleModule,
      ],
      providers: [RoleSeederService,UserSeeder],
      exports: [UserSeeder],
})
export class SeederModule {}
