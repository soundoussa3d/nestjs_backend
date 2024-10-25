import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserSeeder {
    private readonly logger = new Logger(UserSeeder.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async seed() {
        const users = [
            {
                username: 'superadmin',
                password: await this.hashPassword('admin123'),
                type: 'super-admin',
                role: '6714ac76172d14eb751d26e3', // Replace with an actual role ObjectId if needed
            },
            {
                nom:'admin1',
                username: 'admin1',
                password: await this.hashPassword('password123'),
                type: 'admin',
                role: '6714ac76172d14eb751d26e6', // Replace with actual Role ObjectId
                srms: null,
            },
            {
                nom: 'admin2',
                username: 'admin2',
                password: await this.hashPassword('password123'),
                type: 'admin',
                role: '6714ac76172d14eb751d26e6', // Replace with actual Role ObjectId
                srms: null,
            },
            {
                nom: 'admin3',
                username: 'admin3',
                password: await this.hashPassword('password123'),
                type: 'admin',
                role: '6714ac76172d14eb751d26e6', // Replace with actual Role ObjectId
                srms: null,
            },
            {
                nom: 'admin4',
                username: 'admin4',
                password: await this.hashPassword('password123'),
                type: 'admin',
                role: '6714ac76172d14eb751d26e6', // Replace with actual Role ObjectId
                srms: null,
            },

            {
                username: 'manager2',
                nom:'ahmed',
                password: await this.hashPassword('manager123'),
                type: 'manager',
                role: '6714ac76172d14eb751d26e9',
            },
            {
                nom:'hajar',
                username: 'manager1',
                password: await this.hashPassword('manager123'),
                type: 'manager',
                role: '6714ac76172d14eb751d26e9',
            },
            {
                nom:'khaoula',
                username: 'manager3',
                password: await this.hashPassword('manager123'),
                type: 'manager',
                role: '6714ac76172d14eb751d26e9',
            },
            {
                nom:'nisrine',
                username: 'manager4',
                password: await this.hashPassword('manager123'),
                type: 'manager',
                role: '6714ac76172d14eb751d26e9',
            },/*
            {
                username: 'agent',
                password: await this.hashPassword('agent123'),
                type: 'agent',
                role: '6714ac77172d14eb751d26ec',
            },*/
        ];

        await this.userModel.deleteMany({}); // Clear existing users
        await this.userModel.insertMany(users);
        this.logger.log('Users seeded successfully');
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
