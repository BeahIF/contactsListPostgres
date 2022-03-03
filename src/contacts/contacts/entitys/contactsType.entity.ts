import { Optional } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class ContactsType {
    
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({    nullable: true,
  })
  @Optional()
  cellphone: string;
  @Column({    nullable: true,
  })
  @Optional()
  homeNumber?: string;
  @Column({    nullable: true,
  })
  @Optional()
  email?: string;
  @Column({    nullable: true,
  })
  @Optional()
  workNumber?: string;
  @Column({    nullable: true,
  })
  @Optional()
  id_contact?: number;
}
export default ContactsType;
