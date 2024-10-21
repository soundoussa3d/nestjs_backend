import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './seeder/seeder.module';
import { RoleSeederService } from './role/role-seeder.service';
import { UserSeeder } from './users/user.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Custom CORS options
  const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
}
bootstrap();
