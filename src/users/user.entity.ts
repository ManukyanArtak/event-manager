import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Event } from '../events/event.model';

export enum UserGender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  birthday: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  verification_code: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_verified: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[]; // Define the one-to-many relationship with Event
}
