import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from 'src/schemas/region.schema';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class RegionsService {
    constructor(@InjectModel(Region.name) private regionModel: Model<RegionDocument>) {}

    async create(createRegionDto: CreateRegionDto): Promise<Region> {
        const createdRegion = new this.regionModel(createRegionDto);
        return createdRegion.save();
    }

    async findAll(managerId?: string): Promise<Region[]> {
        const query = managerId ? { managerId } : {}; // If managerId is provided, filter by it
      
        return this.regionModel
          .find(query) // Pass the query object (with or without managerId)
           // Ensure it populates the manager details
          .exec();
      }

    async findOne(id: string): Promise<Region> {
        const region = await this.regionModel.findById(id).exec();
        if (!region) {
            throw new NotFoundException(`Region with id ${id} not found`);
        }
        return region;
    }

    async update(id: string, updateRegionDto: CreateRegionDto): Promise<Region> {
        const existingRegion = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true }).exec();
        if (!existingRegion) {
            throw new NotFoundException(`Region with ID ${id} not found`);
        }
        return existingRegion;
    }

    async remove(id: string): Promise<void> {
        const result = await this.regionModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Region with id ${id} not found`);
        }
    }
}
