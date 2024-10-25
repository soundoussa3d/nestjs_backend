import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SrmDocument, Srm } from 'src/schemas/srms.schema';
import { CreateSrmDto } from './dto/create-srm.dto';
import { UpdateSrmDto } from './dto/update-srm.dto';

@Injectable()
export class SrmsService {
    constructor(@InjectModel(Srm.name) private srmModel: Model<SrmDocument>) {}

    async create(createSrmDto: CreateSrmDto): Promise<Srm> {
        const createdSrm = new this.srmModel(createSrmDto);
        return createdSrm.save();
    }

    async findAll(): Promise<Srm[]> {
        return this.srmModel.find().exec();
    }

    async findOne(id: string): Promise<Srm> {
        const srm = await this.srmModel.findById(id).exec();
        if (!srm) {
            throw new NotFoundException(`SRM with id ${id} not found`);
        }
        return srm;
    }

    async update(id: string, updateSrmDto: UpdateSrmDto): Promise<Srm> {
        const existingSrm = await this.srmModel.findByIdAndUpdate(id, updateSrmDto, { new: true }).exec();
        if (!existingSrm) {
            throw new NotFoundException(`SRMS with ID ${id} not found`);
        }
        return existingSrm;
    }

    async remove(id: string): Promise<void> {
        const result = await this.srmModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`SRM with id ${id} not found`);
        }
    }
}
