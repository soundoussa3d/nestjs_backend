// src/regions/region-seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from 'src/schemas/region.schema';  // Adjust the path to your region schema

@Injectable()
export class RegionSeederService {
  private readonly logger = new Logger(RegionSeederService.name);

  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>,
  ) {}

  async seed() {
    const regions = [
      {
        nom: 'Region 1',
        code: 'R001',
        adresse: 'Address 1',
        email: 'region1@example.com',
        telph: '+1234567890',
        status: 'active',
        managerId:'67184893bdd51615839292ae'
      },
      {
        nom: 'Region 2',
        code: 'R002',
        adresse: 'Address 2',
        email: 'region2@example.com',
        telph: '+1234567891',
        status: 'inactive',
        managerId:'67184893bdd51615839292ae'
      },
      // Add more regions to make about 20 seed data
      {
        nom: 'Region 3',
        code: 'R003',
        adresse: 'Address 3',
        email: 'region3@example.com',
        telph: '+1234567892',
        status: 'active',
        managerId:'67184893bdd51615839292af'
      },
      // Continue adding regions up to 20...
    ];

    for (const regionData of regions) {
      const regionExists = await this.regionModel.findOne({ code: regionData.code }).exec();
      if (!regionExists) {
        await this.regionModel.create(regionData);
        this.logger.log(`Inserted region: ${regionData.nom}`);
      } else {
        this.logger.log(`Region ${regionData.nom} already exists`);
      }
    }

    this.logger.log('Region seeding completed.');
  }
}
