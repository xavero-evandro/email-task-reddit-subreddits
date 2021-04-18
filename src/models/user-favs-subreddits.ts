import { Column, Entity, ObjectID, ObjectIdColumn, Unique } from 'typeorm';
import { SubReddits } from './subreddits';

@Entity()
export class UserFavsReddit {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column(type => SubReddits)
  subreddits: SubReddits[];

  @Column({ default: true })
  isOn: boolean;
}
