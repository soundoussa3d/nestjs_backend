import { PartialType } from '@nestjs/mapped-types';
import { CreateSrmDto } from './create-srm.dto';

export class UpdateSrmDto extends PartialType(CreateSrmDto) {}
