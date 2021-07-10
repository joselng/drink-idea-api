import {
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('favorites')
export default class Favorite {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'drink_id' })
  drinkId: number;
}
