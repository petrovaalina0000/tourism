import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('auth/register')
  @HttpCode(200)
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
