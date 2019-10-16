import { Module, Global } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '@demo/api/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environment } from '../../../../../apps/api/src/environments/environment';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './guards/auth.guard';
import { SharedModule } from '@demo/api/shared';

@Global()
@Module({
  providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: environment.accessTokenSecret,
      signOptions: {
        expiresIn: environment.accessTokenLife
      }
    }),
    SharedModule,
    UserModule
  ],
  exports: [AuthService, JwtModule, SharedModule]
})
export class AuthModule {}
