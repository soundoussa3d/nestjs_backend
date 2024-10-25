import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
      private readonly jwtService: JwtService,
      private usersService: UsersService,
    ) {}


  
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findByUsername(username);
      console.log(pass);
      if (user && bcrypt.compareSync(pass, user.password)) {
        const { password, ...result } = user;
        return result; // Remove password before returning
      }
      return { message: 'User not found or password mismatch1' };
    }
  
    async login(user: any) {
      if (!user) {
        return { message: 'User not found or password mismatch' };  // Add error handling for invalid user
      }
      console.log("user", user);
      const payload = { username: user.username, sub: user._id };  // Ensure you're passing the correct user info
      const token = this.jwtService.sign(payload);  
      return {
        user:user._doc,
        access_token: token, // Generate JWT token
      };
    }
    
} 
