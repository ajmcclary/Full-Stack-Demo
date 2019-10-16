import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLModule } from '@demo/graphql';

@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, GraphQLModule],
  exports: [GraphQLModule]
})
export class CoreModule {}
