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
            /*{
                username: 'manager',
                password: await this.hashPassword('manager123'),
                type: 'manager',
                role: '6714ac76172d14eb751d26e9',
            },
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
