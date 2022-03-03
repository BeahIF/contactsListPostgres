import { Module } from '@nestjs/common';
import Contacts from './contacts/entitys/contacts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContactsController from './contacts/contacts.controller';
import ContactsService from './contacts/contacts.service';
import ContactsType from './contacts/entitys/contactsType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts,ContactsType])],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule {}
