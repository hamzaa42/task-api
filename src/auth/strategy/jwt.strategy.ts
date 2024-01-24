import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

//https://docs.nestjs.com/recipes/passport#implementing-passport-strategies

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      //strategy requires API calls that are guarded to have a bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: 'very-secret-key',
      //^^^ move to .env
    });
  }

  // async validate(payload: { sub: number; email: string }) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       UserID: payload.sub,
  //     },
  //     include: {
  //       accounts: {
  //         include: {
  //           transactions: true,
  //         },
  //       },
  //     },
  //   });
  //   delete user.Password;
  //   return user;
  // }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        UserID: payload.sub,
      },
    });
    return payload;
  }
}
