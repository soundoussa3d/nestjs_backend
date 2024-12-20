import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, RoleDocument } from 'src/schemas/role.schema';
import { CreateAdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/password.dto';
import { CreateManagerDto } from './dto/manager.dto';
import { CreateAgentDto } from './dto/agent.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}


     // Method to generate random password
     private generatePassword(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
        const passwordLength = 10;
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    //!create Admin user 
    async createAdmin(createAdminDto: CreateAdminDto): Promise<{user:User,password:string}> {

        // Generate a password if not provided in the DTO
        const password = this.generatePassword();

        // Hash the generated password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        // Create the admin user
        const createdAdmin = new this.userModel({
            ...createAdminDto,
            password: hashedPassword, // Save hashed password
        });

        await createdAdmin.save();
        return {user:createdAdmin,password:password};
    }


    //!create manager user 
    async createManager(createManagerDto: CreateManagerDto): Promise<{user:User,password:string}> {

        // Generate a password if not provided in the DTO
        const password = this.generatePassword();

        // Hash the generated password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if the type is "admin"
        if (createManagerDto.type === 'manager') {
            // Search for the "admin" role in the Role collection
            const adminRole = await this.roleModel.findOne({ name: 'manager' }).exec();
            if (!adminRole) {
                throw new NotFoundException(`Role 'admin' not found`);
            }

            // Assign the found role's ID to the user
            createManagerDto.role = adminRole._id.toString();
        }

        // Create the admin user
        const createdManager = new this.userModel({
            ...createManagerDto,
            password: hashedPassword, // Save hashed password
        });

        await createdManager.save();
        return {user:createdManager,password:password};
    }

     //!create agent user 
     async createAgent(createAgentDto: CreateAgentDto): Promise<{user:User,password:string}> {

        // Generate a password if not provided in the DTO
        const password = this.generatePassword();

        // Hash the generated password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if the type is "admin"
        if (createAgentDto.type === 'agent') {
            // Search for the "admin" role in the Role collection
            const adminRole = await this.roleModel.findOne({ name: 'agent' }).exec();
            if (!adminRole) {
                throw new NotFoundException(`Role 'admin' not found`);
            }

            // Assign the found role's ID to the user
            createAgentDto.role = adminRole._id.toString();
        }

        // Create the admin user
        const createdAgent = new this.userModel({
            ...createAgentDto,
            password: hashedPassword, // Save hashed password
        });
        console.log("password : ", password);

        await createdAgent.save();
        return {user:createdAgent,password:password};
    }


    //!change password 
    // Change password function
    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { oldPassword, newPassword } = changePasswordDto;

        // Fetch the user by ID
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Check if the old password is correct
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new BadRequestException('Old password is incorrect');
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();
    }


    async findAll(type?: string): Promise<User[]> {
        const query: any = {};
        // If type is provided, add it to the query
        if (type) {
            query.type = type;
        }
        return this.userModel.find(query).populate('role').exec();
    }

     // Method to find a user by username
    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
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
