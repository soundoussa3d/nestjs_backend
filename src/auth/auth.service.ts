import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    // Simulating user data; in a real application, this would be a DB query
    private readonly users = [
      { userId: 1, username: 'john', password: 'changeme' },
      { userId: 2, username: 'chris', password: 'secret' },
    ];
  
    async validateUser(username: string, password: string): Promise<any> {
      const user = this.users.find((user) => user.username === username);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return user;
    }
  
    async login(user: any) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
