import { Formulaire, FormulaireDocument } from './../schemas/formulaire.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFormulaireDto, UpdateFormulaireDto } from './dto/formulaire.dto';

@Injectable()
export class FormulaireService {
    constructor(
        @InjectModel(Formulaire.name) private formModel: Model<FormulaireDocument>,
    ) {}

  async create(createFormDto: CreateFormulaireDto): Promise<Formulaire> {
    const form = new this.formModel(createFormDto,);
    return form.save();
  }

  async findAll(createdBy?: string, published?: boolean): Promise<Formulaire[]> {
    const filter: any = {};
  
    if (createdBy) {
      filter.createdBy = createdBy;
    }
  
    if (published !== undefined) {
      filter.published = published;
    }
  
    return this.formModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Formulaire> {
    const form = await this.formModel.findById(id).exec();
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    return form;
  }

  async update(id: string, updateFormDto: UpdateFormulaireDto): Promise<Formulaire> {
    const updatedForm = await this.formModel
      .findByIdAndUpdate(id, updateFormDto, { new: true })
      .exec();

    if (!updatedForm) {
      throw new NotFoundException('Form not found');
    }
    return updatedForm;
  }

  async remove(id: string): Promise<void> {
    const result = await this.formModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Form not found');
    }
  }

  async publish(id: string): Promise<Formulaire> {
    const form = await this.formModel.findOne({ _id: id });
    form.published = true;
    return form.save();
  }
}
