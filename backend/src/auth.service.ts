import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(request: { login: string; password: string }) {
    const user = await this.usersService.findOne(request.login);
    if (!user || user.password !== request.password) {
      throw new HttpException(
        'Неверное имя пользователя или пароль',
        HttpStatus.FORBIDDEN,
      );
    }
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        login: user.login,
      }),
    };
  }

  async register(request: {
    login: string;
    password: string;
    passwordConfirm: string;
  }) {
    const user = await this.usersService.findOne(request.login);
    if (user) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (request.password !== request.passwordConfirm) {
      throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);
    }

    const { password, ...rest } = await this.usersService.create({
      login: request.login,
      password: request.password,
    } as User);

    return rest;
  }
}
