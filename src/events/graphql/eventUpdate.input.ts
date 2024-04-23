import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventUpdateInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  date: string;
}
