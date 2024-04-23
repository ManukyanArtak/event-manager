import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity({ name: 'events' })
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'integer', nullable: false })
  @Field((type) => Int, { nullable: false })
  user_id: number;

  @Column({ type: 'varchar' })
  @Field({ nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  @Field({ nullable: false })
  description: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: false })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.event)
  comments: Comment[];
}
