import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departement, DepartementDocument } from 'src/schemas/departement.schema';
import { CreateDepartementDto } from './dto/create-departement.dto';

@Injectable()
export class DepartementService {
    constructor(@InjectModel(Departement.name) private departementModel: Model<DepartementDocument>) {}

    async create(createDepartementDto: CreateDepartementDto): Promise<Departement> {
        const createdDepartement = new this.departementModel(createDepartementDto);
        return createdDepartement.save();
    }

    async findAll(): Promise<Departement[]> {
        return this.departementModel.find().exec();
    }

    async findOne(id: string): Promise<Departement> {
        const departement = await this.departementModel.findById(id).exec();
        if (!departement) {
            throw new NotFoundException(`Departement with id ${id} not found`);
        }
        return departement;
    }

    async update(id: string, updateDepartementDto: CreateDepartementDto): Promise<Departement> {
        const existingDepartement = await this.departementModel.findByIdAndUpdate(id, updateDepartementDto, { new: true }).exec();
        if (!existingDepartement) {
            throw new NotFoundException(`Departement with ID ${id} not found`);
        }
        return existingDepartement;
    }

    async remove(id: string): Promise<void> {
        const result = await this.departementModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Departement with id ${id} not found`);
        }
    }
}
