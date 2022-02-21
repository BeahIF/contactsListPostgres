import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactsType {
    
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  cellphone: number;
  @Column()
  homeNumber: number;
  @Column()
  email: string;
  @Column()
  workNumber: number;
  @Column()
  id_contact: number;
}
