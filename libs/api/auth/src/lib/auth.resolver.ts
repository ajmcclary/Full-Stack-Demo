import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { compare } from 'bcryptjs';
import { UserService } from '@demo/api/user';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthPayload } from './models/auth-payload';
import { GqlAuthGuard } from './guards/auth.guard';
import { CurrentUser } from '@demo/api/shared';
import { User } from '@generated/photonjs';
import { PhotonService } from '@demo/api/photon';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly photonService: PhotonService,
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

  @Mutation(returns => AuthPayload)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<AuthPayload> {
    const user = await this.photonService.users.findOne({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = await this.authService.createToken(user.email);

    delete user.password;

    return {
      token,
      user
    };
  }

  @Mutation(returns => AuthPayload)
  async signup(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<AuthPayload> {
    let user: User;
    try {
      user = await this.userService.createUser(email, password);
    } catch (error) {
      if (
        error.message ===
        'A unique constraint would be violated on User. Details: Field name = email'
      ) {
        throw new Error('Email is already registered');
      } else {
        this.logger.error(error);
        throw new Error('Unknown server error');
      }
    }

    const token = await this.authService.createToken(user.email);

    return {
      token,
      user
    };
  }

  @Mutation(returns => Boolean)
  async verifyEmail(@Args('token') token: string) {
    await this.authService.verifyEmail(token);

    return true;
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async resendVerifyEmail(@CurrentUser() user: User) {
    // await this.authService.resendVerifyEmail(user);

    return true;
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async changePassword(
    @Args('password') password: string,
    @CurrentUser() user: User
  ) {
    await this.authService.changePassword(user, password);

    return true;
  }

  @Mutation(returns => Boolean)
  async forgotPassword(@Args('email') email: string) {
    await this.authService.forgotPassword(email);

    return true;
  }

  @Mutation(returns => Boolean)
  async resetPassword(
    @Args('password') password: string,
    @Args('token') token: string
  ) {
    await this.authService.resetPassword(password, token);

    return true;
  }

  /* TODO: AJ, remember to activate refreshTokens. I'm thinking that
  *   I'm going to need to use an AuthGuard here... */
  // async token(@Args('refreshToken') refreshToken: string) {
  //   const { userId } = this.jwtService.verify(refreshToken);
  //   if (this.refreshTokenService.validate(refreshToken)) {
  //   }

  //   // if invalid delete token from db
  //   // if(false) {
  //   //   await ctx.db.mutation.deleteRefreshTokenList({ where: {userId}});
  //   //   throw new Error('Refresh token is invalid');
  //   // }

  //   const token = this.createAccessToken(userId);

  //   return token;
  // }
}
