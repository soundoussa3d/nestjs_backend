import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './seeder/seeder.module';
import { UsersModule } from './users/users.module';
import { SrmsModule } from './srms/srms.module';
import { RegionsService } from './regions/regions.service';
import { RegionsController } from './regions/regions.controller';
import { RegionsModule } from './regions/regions.module';
import { DepartementModule } from './departement/departement.module';
import { FormulaireModule } from './formulaire/formulaire.module';
import { FormModule } from './form/form.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule, 
    RoleModule,
    SeederModule, 
    UsersModule, 
    SrmsModule, 
    RegionsModule, 
    DepartementModule, FormulaireModule, FormModule, 
  ],
  controllers: [AppController,  ],
  providers: [AppService, ],
})
export class AppModule {}
