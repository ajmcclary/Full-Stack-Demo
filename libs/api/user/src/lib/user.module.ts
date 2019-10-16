import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { SharedModule } from '@demo/api/shared';

@Module({
  imports: [SharedModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
