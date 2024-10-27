import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FormDocument = Form & Document;

@Schema({ timestamps: true })
export class Form {
    @Prop({ type: Types.ObjectId, required: true })
    agentId: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Formulaire', required: true })
    formulaireId: Types.ObjectId;

  @Prop()
  nameOfValue: string; 

  @Prop()
  unit: string; 

  @Prop([{ type: String }])
  values: string[]; 

  @Prop([{ type: String }])
  periode: string[]; 

  @Prop([{ type: String }])
  date: string[]; 

}

export const FormSchema = SchemaFactory.createForClass(Form);
