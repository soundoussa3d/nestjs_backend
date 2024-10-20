import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './seeder/seeder.module';
import { UsersModule } from './users/users.module';
import { SrmsModule } from './srms/srms.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule, 
    RoleModule,
    SeederModule, 
    UsersModule, 
    SrmsModule, 
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
