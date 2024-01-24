import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(user: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ Username: user.username }, { Email: user.email }],
      },
    });

    if (existingUser) {
      throw new ForbiddenException('Username or email exists!');
    }

    const hash = await argon.hash(user.password);

    const createdUser = await this.prisma.user.create({
      data: {
        Username: user.username,
        Email: user.email,
        Password: hash,
        accounts: {
          create: {
            Balance: 0,
            AccountType: 'Current',
          },
        },
      },
    });

    return this.assignToken(createdUser.UserID, createdUser.Email);
  }

  async login(credentials: LoginDto) {
    const loggedInUser = await this.prisma.user.findUnique({
      where: {
        Username: credentials.username,
      },
      include: {
        accounts: {
          include: {
            transactions: true,
          },
        },
      },
    });
    const pwMatches = await argon.verify(
      loggedInUser.Password,
      credentials.password,
    );

    if (!pwMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.assignToken(loggedInUser.UserID, loggedInUser.Email);
  }

  //jwt generation logic
  async assignToken(
    userID: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userID,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: 'very-secret-key',
      //ideally in ENV file
    });

    return {
      access_token: token,
    };
  }
}
