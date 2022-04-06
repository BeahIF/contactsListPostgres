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
  homenumber?: string;
  @Column({    nullable: true,
  })
  @Optional()
  email?: string;
  @Column({    nullable: true,
  })
  @Optional()
  worknumber?: string;
  @Column({    nullable: true,
  })
  @Optional()
  id_contact?: number;
}
export default ContactsType;
