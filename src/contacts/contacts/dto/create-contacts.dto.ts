// import { ApiProperty } from '@nestjs/swagger';
// import { ContactsType } from './contactsType';

// export class CreateContactsDTO {
//   @ApiProperty()
//   name?: string;

//   @ApiProperty()
//   contacts: ContactsType;
// }
export class CreateContactsDto {
 name: string;
 cellphone: string;
homeNumber: string;
 email: string;
 workNumber: string;
}