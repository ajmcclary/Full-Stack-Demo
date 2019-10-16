import { Field, ObjectType } from 'type-graphql';
import { User } from '../../../../user/src/lib/models/user';
import { AuthToken } from './auth-token';

@ObjectType()
export class AuthPayload {
  @Field(type => AuthToken)
  token: AuthToken;

  // @Field()
  // refreshToken: string;

  @Field(type => User)
  user: User;
}
