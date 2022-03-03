// import {
//   Controller,
//   Res,
//   Query,
//   Get,
//   HttpStatus,
//   Post,
//   Body,
//   NotFoundException,
//   Put,
//   Delete,
//   Param,
// } from '@nestjs/common';
// import { ContactsService } from './contacts.service';
// // import { CreateContactsDTO } from './dto/contacts.dto';

// @Controller('contacts')
// export class ContactsController {
//   constructor(private readonly contactsService: ContactsService) {}

//   @Post('/create')
//   async addCustomer(@Res() res, @Body() createContactsDTO) {
//     const lists = await this.contactsService.create(createContactsDTO);
//     return res.status(HttpStatus.OK).json({
//       message: 'Contact has been created successfully',
//       lists,
//     });
//   }

//   @Get('all')
//   async findAll(@Res() res) {
//     const lists = await this.contactsService.findAll();
//     return res.status(HttpStatus.OK).json(lists);
//   }

//   // @Get('id')
//   // async findById(@Res() res, @Query('id') id: string) {
//   //   const lists = await this.contactsService.findById(id);
//   //   if (!lists) throw new NotFoundException('Id does not exist!');
//   //   return res.status(HttpStatus.OK).json(lists);
//   // }

//   @Get('name')
//   async findById(@Res() res, @Query('name') name: string) {
//     const lists = await this.contactsService.find({ name: name });
//     if (!lists) throw new NotFoundException('This name does not exist!');
//     return res.status(HttpStatus.OK).json(lists);
//   }

//   @Put('/update')
//   async update(@Res() res, @Query('id') id: string, @Body() createContactsDTO) {
//     const lists = await this.contactsService.update(id, createContactsDTO);
//     if (!lists) throw new NotFoundException('Name or contact does not exist!');
//     return res.status(HttpStatus.OK).json({
//       message: 'Contact has been successfully updated',
//       lists,
//     });
//   }

//   @Delete('/delete')
 
//   async deleteContact(@Param('id') id: string) {
//     this.contactsService.delete(Number(id));
//   }
// }
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ContactsService from './contacts.service';
import { CreateContactsDto } from './dto/create-contacts.dto';
 
@Controller('contacts')
export default class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
 
  @Get()
  getAllContacts() {
    return this.contactsService.getAllcontacts();
  }
 
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.contactsService.getContactById(Number(id));
  }
 
  @Post()
  async createPost(@Body() post: CreateContactsDto) {
      return this.contactsService.createPost(post);
   
  }
 
  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post) {
    return this.contactsService.replacePost(Number(id), post);
  }
 
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.contactsService.deletePost(Number(id));
  }
}
