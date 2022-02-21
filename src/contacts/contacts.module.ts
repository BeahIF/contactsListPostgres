import { Module } from '@nestjs/common';
import Contacts from './contacts/entitys/contacts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContactsController from './contacts/contacts.controller';
import ContactsService from './contacts/contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts])],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule {}
