import { Module } from '@nestjs/common';
import { FormulaireController } from './formulaire.controller';
import { FormulaireService } from './formulaire.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Formulaire, FormulaireSchema } from 'src/schemas/formulaire.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Formulaire.name, schema: FormulaireSchema }])],
  controllers: [FormulaireController],
  providers: [FormulaireService]
})
export class FormulaireModule {}
