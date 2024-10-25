import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAdminDto } from './dto/admin.dto';
import { CreateManagerDto } from './dto/manager.dto';
import { CreateAgentDto } from './dto/agent.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    //! create admin user
    @Post('admin')
    async createAdmin(@Body() createUserDto: CreateAdminDto) {
        return this.usersService.createAdmin(createUserDto);
    }

    //! create manager user
    @Post('manager')
    async createManager(@Body() createUserDto: CreateManagerDto) {
        return this.usersService.createManager(createUserDto);
    }

    //! create agent user
    @Post('agent')
    async createAgent(@Body() createUserDto: CreateAgentDto) {
        return this.usersService.createAgent(createUserDto);
    }
    

    @Get()
    async findAll(
        @Query('type') type?: string,
    ) {
        return this.usersService.findAll(type);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
