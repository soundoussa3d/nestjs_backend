import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './seeder/seeder.module';
import { RoleSeederService } from './role/role-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

   // Initialize SeederModule
   const roleSeeder = app.select(SeederModule).get(RoleSeederService);

   // Seed roles
   await roleSeeder.seed();
}
bootstrap();
