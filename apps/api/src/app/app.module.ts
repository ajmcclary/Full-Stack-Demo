import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from "path";

import { environment } from '../environments/environment';
import { AuthModule } from '@demo/api/auth';
import { SharedModule } from '@demo/api/shared';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => {
        return { req };
      },
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), environment.schemaPath)
    }),
    AuthModule,
    SharedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
