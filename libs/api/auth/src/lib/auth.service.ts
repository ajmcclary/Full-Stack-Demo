import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { environment } from '../../../../../apps/api/src/environments/environment';
import { PhotonService } from '@demo/api/photon';
import { User } from '@generated/photonjs';
import { genSaltSync, hash } from 'bcryptjs';
import { ACTIVATION_ERRORS } from './interfaces/auth-errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly photonService: PhotonService
  ) {}

  async createToken(email: string) {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: environment.accessTokenLife,
      accessToken
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.photonService.users.findOne({
      where: { email: payload.email }
    });
  }

  async verifyEmail(token: string): Promise<void> {
    let email: string, exp: number;
    try {
      ({ email, exp } = this.jwtService.verify(token));
    } catch (error) {
      throw new Error(ACTIVATION_ERRORS.INVALID);
    }

    if (Math.floor(Date.now() / 1000) > exp) {
      throw new Error(ACTIVATION_ERRORS.EXPIRED);
    }

    const user = await this.photonService.users.findOne({
      where: { email }
    });
    if (user.active) {
      throw new Error(ACTIVATION_ERRORS.ALREADY_DONE);
    }

    await this.photonService.users.update({
      where: { email },
      data: { active: true }
    });
  }

  async changePassword({ id }: User, password: string) {
    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    this.photonService.users.update({
      data: {
        password: hashedPassword
      },
      where: { id }
    });

    return true;
  }

  async forgotPassword(email: string) {
    const user = await this.photonService.users.findOne({ where: { email } });
    if (!user) {
      throw new Error('email-doesnot-exists');
    }

    return true;
  }

  async resetPassword(password: string, token: string) {
    const { email } = this.jwtService.verify(token);

    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    await this.photonService.users.update({
      data: {
        password: hashedPassword
      },
      where: { email }
    });

    return true;
  }
}
