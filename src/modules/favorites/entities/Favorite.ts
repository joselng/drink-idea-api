import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity('favorites')
export default class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'drink_id' })
  drinkId: number;
}
