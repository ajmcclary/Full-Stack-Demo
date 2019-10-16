import { IsOptional, IsPhoneNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  firstname?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastname?: string;
}
