import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Contacts {
    
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column()
  public name: string;

  
}

export default Contacts;
