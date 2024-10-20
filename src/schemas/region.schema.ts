// src/schemas/region.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegionDocument = Region & Document;

@Schema()
export class Region {
    @Prop({ required: true })
    nom: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    adresse: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    telph: string; // Assuming this is a phone number

    @Prop({ required: true, enum: ['active', 'inactive'], default: 'inactive' }) // Adding status field
    status: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
