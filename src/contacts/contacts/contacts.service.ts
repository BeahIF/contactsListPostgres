// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// // import { CreateContactsDTO } from './dto/contacts.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import Contacts from './entitys/contacts.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class ContactsService {
//   constructor(
//     @InjectRepository(Contacts)
//     private contactsRepository: Repository<Contacts>,
//   ) {}

//   create(createContactsDTO) {
//     console.log(createContactsDTO);
//     const post: CreatePostDto = request.body;
//     const createdPost = this.contactsService.createPost(post);
//     response.send(createdPost);
//     // const createdCat = new this.contactsRepository.createContactsDTO);
//     // return createdCat.save();
//   }

//   findAll() {
//     return this.contactsRepository.find();
//   }

//   //  findById(id:number): Promise<Contacts> {
//   //   const customer = this.contactsRepository.findById(id).exec();
//   //   return customer;
//   // }

//   find(req) {
//     return this.contactsRepository.find(req);
//   }

//   update(id, createContactsDTO) {
//     const contacts = this.contactsRepository.findOne(id);
//     console.log(contacts);
//     let contactsPut;
//     if (createContactsDTO.contacts.cellphone) {
//       contactsPut = {
//         contacts: {
//           cellphone: createContactsDTO.contacts.cellphone,
//         },
//       };
//     } else {
//       if (createContactsDTO.contacts.homeNumber) {
//         contactsPut = {
//           contacts: {
//             ...contactsPut.contacts,
//             homeNumber: createContactsDTO.contacts.homeNumber,
//           },
//         };
//       }
//       //add outros
//     }

//     // contactsPut = { contacts:{
//     //   "homeNumber":
//     //   "email":
//     //   "cellphone":
//     //   "workNumber":
//     // }
//     console.log(contactsPut);
//     const updated = this.contactsRepository.update(id, contactsPut);
//     if (updated) {
//       return updated;
//     } else {
//       throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
//     }
//   }

//   async delete(id) {
//     const deleteResponse = await this.contactsRepository.delete(id);
//     if (!deleteResponse.affected) {
//       throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
//     }
//   }
// }

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactsDto } from './dto/create-contacts.dto';
import Contacts from './entitys/contacts.entity';
import ContactsType from './entitys/contactsType.entity';

@Injectable()
export default class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private contactsRepository: Repository<Contacts>,
    @InjectRepository(ContactsType)
    private contactsTypeRepository: Repository<ContactsType>
  ) {}
  // private lastPostId = 0;
  // private contacts: Post[] = [];
  removeFalsyValuesInObject = (data) => {
    const keys = Object.keys(data)

    const correctData = keys.reduce((accumulator, currentValue) => {
      if (data[currentValue])
        return { ...accumulator, [currentValue]: data[currentValue] }

      return accumulator
    }, {})

    return correctData
  }

  getAllcontacts() {
    return this.contactsRepository.find();
  }

  async getContactById(id: number) {
    const post = await this.contactsRepository.findOne(id);
    if (post) {
      const contacts = await this.contactsTypeRepository.findOne({where:{id_contact:id}})
      console.log(contacts)
      const response = { ...post, ...contacts}
      console.log(response)
      return post;
    }else{
      const contacts = await this.contactsTypeRepository.findOne(id);
      return contacts

    }
    throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(id: number, post) {
    await this.contactsRepository.update(id, post);
    const updatedPost = await this.contactsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreateContactsDto) {
    if(post.name){
      const contactName ={name: post.name
      }
      const newContact = await this.contactsRepository.create(contactName);
      await this.contactsRepository.save(newContact);
      console.log(newContact.id)

      const postContactType = this.removeFalsyValuesInObject({
        cellphone:post.cellphone,
  homeNumber: post.homeNumber,
   email: post.email,
   workNumber:post.workNumber,
   id_contact:newContact.id
      })

      console.log(postContactType)
    
      const newContactType = await this.contactsTypeRepository.create(postContactType);
      await this.contactsTypeRepository.save(newContactType);
      console.log(newContactType)
      return newContact;

    }

    const postContactType = this.removeFalsyValuesInObject({
      cellphone:post.cellphone,
      homeNumber: post.homeNumber,
      email: post.email,
      workNumber:post.workNumber
    })


    const newContactType = await this.contactsTypeRepository.create(postContactType);
    await this.contactsRepository.save(newContactType);
    return newContactType;

  }


  async deletePost(id: number) {
    const deleteResponse = await this.contactsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
