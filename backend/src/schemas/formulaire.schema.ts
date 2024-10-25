import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FormulaireDocument = Formulaire & Document;

@Schema({ timestamps: true })
export class Formulaire {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop([{ type: String }])
  nameOfValues: string[]; // Array of value names like Débit d’eau, Temps, etc.

  @Prop([{ type: String }])
  units: string[]; // Array of unit measurements like L, s, $, etc.

  @Prop({ default: false })
  published: boolean; // For publishing the formulaire

  @Prop({ type: Types.ObjectId,ref: 'User'})
  createdBy: Types.ObjectId; 
}

export const FormulaireSchema = SchemaFactory.createForClass(Formulaire);
