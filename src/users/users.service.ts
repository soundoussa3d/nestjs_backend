import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, RoleDocument } from 'src/schemas/role.schema';
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
        // Check if the type is "admin"
        if (createAdminDto.type === 'admin') {
            // Search for the "admin" role in the Role collection
            const adminRole = await this.roleModel.findOne({ name: 'admin' }).exec();
            if (!adminRole) {
                throw new NotFoundException(`Role 'admin' not found`);
            }

            // Assign the found role's ID to the user
            createAdminDto.role = adminRole._id.toString();
        }

        // Create and save the user
        const createdUser = new this.userModel(createAdminDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().populate('role').exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).populate('role').exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return existingUser;
    }

    async remove(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
