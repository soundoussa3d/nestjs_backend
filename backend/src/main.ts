import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './seeder/seeder.module';
import { RoleSeederService } from './role/role-seeder.service';
import { UserSeeder } from './users/user.seeder';
import { RegionSeederService } from './regions/region-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Custom CORS options
  const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods:  ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);

   // Initialize SeederModule
   const roleSeeder = app.select(SeederModule).get(RoleSeederService);

   // Seed roles
   await roleSeeder.seed();

   const userSeeder = app.get(UserSeeder);
   await userSeeder.seed();

   const regionSeeder = app.select(SeederModule).get(RegionSeederService);
   await regionSeeder.seed();
}
bootstrap();
