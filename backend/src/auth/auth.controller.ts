import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      return { message: user };
    }
    return this.authService.login(user);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute(@Req() req) {
    return { message: 'You accessed a protected route', user: req.user };
  }
}
