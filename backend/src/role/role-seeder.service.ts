// src/roles/role-seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/role.schema';


@Injectable()
export class RoleSeederService {
  private readonly logger = new Logger(RoleSeederService.name);

  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async seed() {
    const roles = [
      { name: 'super-admin', description: 'Has full access to the system', permissions: [] },
      { name: 'admin', description: 'Can manage most resources', permissions: [] },
      { name: 'manager', description: 'Can manage specific teams or sections', permissions: [] },
      { name: 'agent', description: 'Can perform user-level actions', permissions: [] },
    ];

    for (const roleData of roles) {
      const roleExists = await this.roleModel.findOne({ name: roleData.name }).exec();
      if (!roleExists) {
        await this.roleModel.create(roleData);
        this.logger.log(`Inserted role: ${roleData.name}`);
      } else {
        this.logger.log(`Role ${roleData.name} already exists`);
      }
    }

    this.logger.log('Seeding completed.');
  }
}
