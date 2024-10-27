import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from 'src/schemas/form.schema';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormService {
    constructor(
        @InjectModel(Form.name) private formModel: Model<FormDocument>,
      ) {}
    
      async create(createFormDto: CreateFormDto): Promise<Form> {
        const newForm = new this.formModel(createFormDto);
        return newForm.save();
      }
    
      async findAll(): Promise<Form[]> {
        return this.formModel.find().populate('formulaireId').exec();
      }
    
      async findByAgent(agentId: string): Promise<Form[]> {
        return this.formModel.find({ agentId }).populate('formulaireId').exec();
      }
    
      async findOne(id: string): Promise<Form> {
        const form = await this.formModel.findById(id).populate('formulaireId').exec();
        if (!form) {
          throw new NotFoundException(`Form with ID ${id} not found`);
        }
        return form;
      }

      async update(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
        const updatedForm = await this.formModel
          .findByIdAndUpdate(id, updateFormDto, { new: true })
          .populate('formulaireId')
          .exec();
        if (!updatedForm) {
          throw new NotFoundException(`Form with ID ${id} not found`);
        }
        return updatedForm;
      }
    
      async delete(id: string): Promise<void> {
        const result = await this.formModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException(`Form with ID ${id} not found`);
        }
      }
}
