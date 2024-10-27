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
            },
            {
                nom:'saad',
                prenom:'saad',
                email:'said123@gmail.com',
                teleph:'0612854796',
                username: 'said123',
                password: await this.hashPassword('agent123'),
                type: 'agent',
                role: '6714ac77172d14eb751d26ec',
                departementId:'67190642d51430d748f4e71b'
            },
            {
                nom:'mahmoud',
                prenom:'mahmoud',
                email:'mahmoud123@gmail.com',
                teleph:'0612854796',
                username: 'mahmoud123',
                password: await this.hashPassword('agent123'),
                type: 'agent',
                role: '6714ac77172d14eb751d26ec',
                departementId:'67190642d51430d748f4e71b'
            },
        ];

        for (const user of users) {
            const existingUser = await this.userModel.findOne({ username: user.username });

            if (existingUser) {
                this.logger.log(`User ${user.username} already exists. Skipping...`);
            } else {
                await this.userModel.create(user);
                this.logger.log(`User ${user.username} inserted successfully.`);
            }
        }
        this.logger.log('Users seeded successfully');
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
