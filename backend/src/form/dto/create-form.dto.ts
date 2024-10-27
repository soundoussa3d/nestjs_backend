import { IsMongoId, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateFormDto {
  @IsMongoId()
  agentId: string;

  @IsMongoId()
  formulaireId: string;

  @IsString()
  nameOfValue: string;

  @IsString()
  unit: string;

  @IsArray()
  values: string[];

  @IsArray()
  periode: string[];

  @IsString()
  date: string[];
}
