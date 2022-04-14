import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Contacts {
    
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column()
  public name: string;

  @Column({    nullable: true,
  })
  public createdDate: Date;

  @Column({    nullable: true,
  })
  public updatedDate: Date;

  
}

export default Contacts;
