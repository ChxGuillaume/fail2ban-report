import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Bans {
  @Column({ type: 'integer' })
  jail: string;

  @Column({ type: 'text' })
  ip: string;

  @Column({ type: 'integer', primary: false })
  timeofban: number;

  @PrimaryColumn({ type: 'simple-json' })
  data: any;
}
