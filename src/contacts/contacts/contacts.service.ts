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
import { isEmpty } from 'rxjs';
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

  async getAllcontacts() {
    const responseFinal = []
    const contacts = await this.contactsRepository.find();
    for await (const i of contacts) {
      const contactsTypes = await this.contactsTypeRepository.findOne({where:{id_contact:i?.id}})
      console.log(contactsTypes)

      const response = { ...i, ...contactsTypes}
      console.log(response)
      responseFinal.push(response)
      console.log(responseFinal)
    }
    const contactsTypesSemRelacao = await this.contactsTypeRepository.find({where:{id_contact:null}})
    console.log(contactsTypesSemRelacao)
    for await (const i of contactsTypesSemRelacao) {

    responseFinal.push(i)
    }
    return responseFinal

  }

  async getContactById(id: number) {
    const contacts = await this.contactsRepository.findOne(id);
    if (contacts) {
      const contactsTypes = await this.contactsTypeRepository.findOne({where:{id_contact:id}})
      console.log(contactsTypes)
      const response = { ...contacts, ...contactsTypes}
      console.log(response)
      return response
    }else{
      const contacts = await this.contactsTypeRepository.findOne(id);
      return contacts

    }
    // throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
  }

  async replaceContacts(id: number, contacts) {
    let updatedContact
    if(contacts?.name){
      await this.contactsRepository.update(id, contacts);
      updatedContact = await this.contactsRepository.findOne(id);
      if (updatedContact) {
      
     const contactsType = await this.contactsTypeRepository.findOne({where:{id_contact:updatedContact?.id}})
     const contactsTypetoUpdate = this.removeFalsyValuesInObject({
      cellphone:contacts?.cellphone,
      homeNumber: contacts?.homeNumber,
      email: contacts?.email,
      workNumber:contacts?.workNumber,
      id_contact:updatedContact?.id
    })
    console.log(contactsType)
     if(contactsType != undefined){
      await this.contactsTypeRepository.update(id, contactsTypetoUpdate);
      const updatedContactType = await this.contactsTypeRepository.findOne(id);
      const response = {...updatedContact,...updatedContactType}
      return response
     }else{
    console.log(contactsTypetoUpdate)
      if(Object.values(contactsTypetoUpdate).length === 0){
        console.log("verifiquei que tem numero")   
        const newContactType = await this.contactsTypeRepository.create(contactsTypetoUpdate);
        await this.contactsTypeRepository.save(newContactType);
        console.log(newContactType)
        const response = {...updatedContact,...newContactType}
        return response  


        // if (updatedContacts) {
        //   return updatedContacts;
        // }else{
        //         throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
  
        // }
     }
    }
    // }else{

    //   throw new HttpException('Contacts not found', HttpStatus.NOT_FOUND);
    // }
    
    
    
    }else{
      if(contacts?.cellphone || contacts?.homeNumber || contacts?.email || contacts?.workNumber){
      await this.contactsTypeRepository.update(id, contacts);
      const updatedContacts = await this.contactsTypeRepository.findOne(id);
      if (updatedContacts) {
        return updatedContacts;
      }else{
              throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);

      }
    }else{
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);

}
    }
    } if(contacts?.cellphone || contacts?.homeNumber || contacts?.email || contacts?.workNumber){
      await this.contactsTypeRepository.update(id, contacts);
      const updatedContacts = await this.contactsTypeRepository.findOne(id);
      if (updatedContacts) {
        return updatedContacts;
      }else{
              throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);

      }
    }else{
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);

}
  }
  async createContacts(contacts: CreateContactsDto) {
    if(contacts?.name){
      const contactName ={name: contacts?.name}
      const newContact = await this.contactsRepository.create(contactName);
      await this.contactsRepository.save(newContact);

      const contactsType = this.removeFalsyValuesInObject({
        cellphone:contacts?.cellphone,
        homeNumber: contacts?.homeNumber,
        email: contacts?.email,
        workNumber:contacts?.workNumber,
        id_contact:newContact?.id
      })

    
      const newContactType = await this.contactsTypeRepository.create(contactsType);
      await this.contactsTypeRepository.save(newContactType);
      return newContact;

    }

    const contactsType = this.removeFalsyValuesInObject({
      cellphone:contacts?.cellphone,
      homeNumber: contacts?.homeNumber,
      email: contacts?.email,
      workNumber:contacts?.workNumber
    })

    console.log(contactsType)

    const newContactsType = await this.contactsTypeRepository.create(contactsType);
    await this.contactsTypeRepository.save(newContactsType);
    return newContactsType;

  }


  async deleteContacts(id: number) {
    const deleteResponse = await this.contactsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Contacts not found', HttpStatus.NOT_FOUND);
    }
  }
}
