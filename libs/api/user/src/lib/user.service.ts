import { Injectable } from '@nestjs/common';
import { genSaltSync, hash } from 'bcryptjs';
import { environment } from '../../../../../apps/api/src/environments/environment';
import { JwtService } from '@nestjs/jwt';
import { INVITATION_ERRORS } from './models/error.enum';
import { AuthService } from '../../../auth/src/lib/auth.service';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from '../../../auth/src/lib/models/auth-payload';
import uuidAPIKey from 'uuid-apikey';
import { PhotonService } from '@demo/api/photon';
import { User } from '@generated/photonjs';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private photonService: PhotonService
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);
    const apiKey = this.generateApiKey();

    return this.photonService.users.create({
      data: {
        email,
        apiKey: apiKey.apiKey,
        password: hashedPassword
      }
    });
  }

  async deleteUser(user: User, userIdToDelete: string): Promise<User> {
    if (user.group !== 'ADMIN') {
      throw new Error('You are not allowed to delete a user!');
    }

    return this.photonService.users.delete({ where: { id: userIdToDelete } });
  }

  async updateUser(
    user: User,
    { email, firstname, lastname }: UpdateUserInput
  ): Promise<User> {
    return this.photonService.users.update({
      where: { id: user.id },
      data: {
        email,
        firstname,
        lastname
      }
    });
  }

  async inviteNewUser(user: User, invitationEmail: string) {
    if (user.group !== 'ADMIN') {
      throw new Error('You are not allowed to invite new user!');
    }

    const salt = genSaltSync(environment.saltRounds);
    const password = await hash('ACTIVATE', salt);
    const apiKey = this.generateApiKey();

    const newUser = await this.photonService.users.create({
      data: {
        password,
        email: invitationEmail,
        apiKey: apiKey.apiKey
      }
    });

    return newUser;
  }

  async completeInvitation(
    token: string,
    password: string
  ): Promise<AuthPayload> {
    const { email, exp } = this.jwtService.verify(token);
    const user = await this.photonService.users.findOne({ where: { email } });
    if (user.active) {
      throw new Error(INVITATION_ERRORS.ALREADY_DONE);
    }
    if (Math.floor(Date.now() / 1000) > exp) {
      throw new Error(INVITATION_ERRORS.EXPIRED);
    }

    const salt = genSaltSync(environment.saltRounds);
    const hashedPassword = await hash(password, salt);

    const updatedUser = await this.photonService.users.update({
      where: { email: email },
      data: { active: true, password: hashedPassword }
    });

    const accessToken = await this.authService.createToken(updatedUser.email);

    return {
      token: accessToken,
      user: updatedUser
    };
  }

  private generateApiKey(): ApiKey {
    return uuidAPIKey.create({ noDashes: true });
  }
}

interface ApiKey {
  uuid: string;
  apiKey: string;
}
