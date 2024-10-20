import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SrmDocument = Srm & Document;

@Schema()
export class Srm {
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

export const SrmSchema = SchemaFactory.createForClass(Srm);
