// src/schemas/departement.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartementDocument = Departement & Document;

@Schema()
export class Departement {
    @Prop({ required: true,unique: true })
    name: string; // Name of the departement

    @Prop({ required: true})
    description: string; // description for the departement

    @Prop({ required: true})
    region: string;
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
