// import {
//   BadRequestException,
//   ConflictException,
//   HttpException,
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { UserRepository } from './repositories/user.repository';
// import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
// import { UserHttpService } from './http-service/core-banking-server/user.http.service';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { asyncWrapper } from '@/common/utils/error-handler.util';
// import { COMMON_ERRORS } from '@/common/constants/errors';
// import { UpdateUserNinNumberDto } from './dto/update-user-nin.dto';
// import { AccountTierRepository } from '../account-tier/repositories/account-tier.repository';
// import { CLIENT_ERRORS } from './errors/user.errors';
// import { UpdateUserBVNNumberDto } from './dto/update-user-bvn.dto';
// import { S3Service } from '@/common/services/s3-services/s3.service';
// import { UtilityBillRepository } from './repositories/utility-bill.repository';
// import { DataSource } from 'typeorm';
// import fileType from 'file-type';
// import {
//   UploadUtilityBillPayload,
//   UtilityBillStatus,
// } from '@/common/interfaces/core-banking-server-endpoints/payload/user-payload.interface';
// import { randomUUID } from 'crypto';
// // import { SmsService } from '@/modules/sms-services/sms.service';
// // import { VansoRequestPayload } from '@/modules/sms-services/dto/vanso-request-payload.dto';
// // import { SmsType } from '@/modules/sms-services/enum/sms-type.enum';
// // import { EmailService } from '@/modules/email-services/email.service';

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
//   private readonly baseHeaders;
//   constructor(
//     @InjectRepository(UserRepository)
//     private readonly userRepository: UserRepository,
//     @InjectRepository(UtilityBillRepository)
//     private readonly utilityBillRepository: UtilityBillRepository,
//     private readonly accountTierRepository: AccountTierRepository,
//     private configService: ConfigService,
//     private readonly userHttpService: UserHttpService,
//     private readonly s3Service: S3Service,
//     // private smsService: SmsService,
//     // private readonly emailService: EmailService,
//     @InjectDataSource() private readonly dataSource: DataSource,
//   ) {}

//   async getClientByID(id: string) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: [{ clientId: Number(id) }],
//         relations: ['accounts'],
//       });
//       if (!user) {
//         throw new HttpException(
//           {
//             message: CLIENT_ERRORS.INVALID_CLIENT_ID.message,
//             statusCode: CLIENT_ERRORS.INVALID_CLIENT_ID.code,
//           },
//           CLIENT_ERRORS.INVALID_CLIENT_ID.statusCode,
//         );
//       }

//       const userFormServer = (await this.userHttpService.getClientByClientId({
//         clientId: id,
//       })) as any;

//       const { id: clientId, ...clientDataWithoutId } = userFormServer;

//       console.log(userFormServer);
//       return {
//         ...clientDataWithoutId,
//         bvn: user.bvn,
//         nin: user.nin,
//         mobileNo: user.mobileNo,
//         accountTier: user.accountTier,
//         clientId,
//         accounts: user?.accounts,
//       };
//     }, COMMON_ERRORS.INTERNAL_SERVER.message);
//   }

//   // async notifyUser(phone: string) {
//   //   const messagePayload: VansoRequestPayload[] = [
//   //     {
//   //       phone_numbers: phone,
//   //       text: 'Success! Your transaction was completed successfully.',
//   //     },
//   //   ];

//   //   await this.smsService.setType(SmsType.SINGLE_SMS); // Choose appropriate type
//   //   this.smsService.buildPayload(messagePayload);

//   //   const response = await this.smsService.sendSms();
//   //   console.log('SMS Response:', response);
//   // }

//   // async sendWelcomeEmail(userEmail: string): Promise<void> {
//   //   await this.emailService.sendEmail(
//   //     userEmail,
//   //     'Welcome to Sofri!',
//   //     'successful_login', // template name
//   //     { name: 'John Doe' } // dynamic template data
//   //   );
//   // }

//   // async sendOtpExample(phone: string, otp: string) {
//   //   const response = await this.smsService.sendOtp(phone, otp);
//   //   console.log('OTP Sent:', response);
//   // }

//   async getClientByBvn(bvnNo: string) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: { bvn: bvnNo },
//         // relations: ['account_tier_id'],
//       });

//       if (!user) {
//         throw new NotFoundException(
//           CLIENT_ERRORS.CLIENT_NOT_FOUNT_WITH_BVN.message,
//         );
//       }

//       // await this.notifyUser("+2348185466356")
//       // for(let i = 0; i<emails.length; i++){
//       //   console.log(emails[i])
//       //   await this.sendWelcomeEmail(emails[i])
//       // }

//       // 2. Get the user details from the external server using BVN

//       // this lines give error when user have registered using same bnv number and instead of giving the user details it gives we are getting internal server error

//       return user;

//       // const externalClientResponse = (await this.userHttpService.getClientByBvn(
//       //   { bvn: bvnNo },
//       // )) as any;
//       // if (!externalClientResponse) {
//       //   return externalClientResponse;
//       // } else {
//       //   return user;
//       // }
//     });
//   }

//   async updateUser(id: string, updateUserDto: UpdateUserDto) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: { clientId: Number(id) },
//       });
//       if (!user) throw new NotFoundException('User not found');

//       if (updateUserDto.email) {
//         const emailExists = await this.userRepository.findOne({
//           where: { email: updateUserDto.email },
//         });
//         if (emailExists && emailExists.email !== user.email)
//           throw new ConflictException('Email already exists');
//       }

//       if (updateUserDto.mobileNo) {
//         const mobileExists = await this.userRepository.findOne({
//           where: { mobileNo: updateUserDto.mobileNo },
//         });
//         if (mobileExists && mobileExists.mobileNo !== user.mobileNo)
//           throw new ConflictException('Mobile number already exists');
//       }
//       const updateUserDataForServer = {
//         locale: updateUserDto.locale,
//       };
//       if (updateUserDto.mobileNo)
//         updateUserDataForServer['mobileNo'] = updateUserDto.mobileNo;
//       if (updateUserDto.firstName) {
//         updateUserDataForServer['firstname'] = updateUserDto.firstName;
//       } else {
//         updateUserDataForServer['firstname'] = user.firstName;
//       }
//       if (updateUserDto.lastName) {
//         updateUserDataForServer['lastname'] = updateUserDto.lastName;
//       } else {
//         updateUserDataForServer['lastname'] = user.lastName;
//       }
//       if (updateUserDto.middleName)
//         updateUserDataForServer['middlename'] = updateUserDto.middleName;
//       if (updateUserDto.genderId)
//         updateUserDataForServer['genderId'] = updateUserDto.genderId;
//       if (updateUserDto.clientTypeId)
//         updateUserDataForServer['clientTypeId'] = updateUserDto.clientTypeId;
//       if (updateUserDto.clientClassificationId)
//         updateUserDataForServer['clientClassificationId'] =
//           updateUserDto.clientClassificationId;
//       if (updateUserDto.dateOfBirth)
//         updateUserDataForServer['dateOfBirth'] = updateUserDto.dateOfBirth;
//       const updataUserOnServer = (await this.userHttpService.updateUser(
//         { clientId: user.clientId },
//         updateUserDataForServer,
//       )) as any;

//       const updateUserdata = {};
//       if (updateUserDto.email) updateUserdata['email'] = updateUserDto.email;
//       if (updateUserDto.mobileNo)
//         updateUserdata['mobileNo'] = updateUserDto.mobileNo;
//       if (updateUserDto.firstName)
//         updateUserdata['firstName'] = updateUserDto.firstName;
//       if (updateUserDto.lastName)
//         updateUserdata['lastName'] = updateUserDto.lastName;
//       if (updateUserDto.middleName)
//         updateUserdata['middleName'] = updateUserDto.middleName;

//       const updatedUser = await this.userRepository.updateEntity(
//         user,
//         updateUserdata,
//       );

//       const updatedUserFromServer =
//         (await this.userHttpService.getClientByClientId({
//           clientId: String(user.clientId),
//         })) as any;

//       // const updateUserDB = await this.userRepository.findOne({where:{clientId: Number(user.clientId)}});
//       // if(!updateUserDB){
//       //   throw new ConflictException('Mobile number already exists');
//       // }
//       // if(updateUserDto.middleName) updateUserDB.middleName = updateUserDto.middleName;

//       // await updateUserDB.save()

//       const {
//         FirstName: firstname,
//         LastName: lastname,
//         MiddleName: middlename,
//         mobileNo,
//         externalId,
//         id: clientId,
//         ...filteredUserFromServer
//       } = updatedUserFromServer;

//       // Merge and return updated user details (excluding specific fields)
//       return { ...filteredUserFromServer, ...updatedUser };
//     }, COMMON_ERRORS.INTERNAL_SERVER.message);
//   }

//   async updateUserNinNumber(
//     updateUserNinNumber: UpdateUserNinNumberDto,
//     clientId: string,
//   ) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: [{ clientId: Number(clientId) }],
//         relations: ['accountTier', 'utilityBills'],
//       });

//       if (!user) {
//         throw new NotFoundException(CLIENT_ERRORS.CLIENT_NOT_FOUND.message);
//       }

//       const ninExits = await this.userRepository.findOne({
//         where: [{ nin: updateUserNinNumber.nin }],
//       });

//       if (ninExits) {
//         if (ninExits.clientId == Number(clientId)) {
//           throw new HttpException(
//             {
//               message: CLIENT_ERRORS.NIN_ALREADY_PRESENT.message,
//               statusCode: CLIENT_ERRORS.NIN_ALREADY_PRESENT.statusCode,
//             },
//             CLIENT_ERRORS.NIN_ALREADY_PRESENT.statusCode,
//           );
//         }
//         throw new HttpException(
//           {
//             message: CLIENT_ERRORS.NIN_EXITS.message,
//             statusCode: CLIENT_ERRORS.NIN_EXITS.statusCode,
//           },
//           CLIENT_ERRORS.NIN_EXITS.statusCode,
//         );
//       }

//       user.nin = updateUserNinNumber.nin;
//       // if (!user.accountTier || user.accountTier.tierLevel !== 99 || !user.bvn) {
//       //   await user.save();
//       //   return {
//       //     message:
//       //       'Your NIN has been updated successfully. To proceed with a tier level upgrade, your account must be on Tier Level 1.',
//       //     user,
//       //   };
//       // }
//       if (user?.bvn) {
//         if (user?.utilityBills) {
//           console.log('user.utilityBills', user.utilityBills);
//           const AccountTier = (await this.accountTierRepository.findOne({
//             where: { tierLevel: 101 },
//           })) as any;
//           user.accountTier = AccountTier;
//         } else {
//           const AccountTier = await this.accountTierRepository.findOne({
//             where: { tierLevel: 100 },
//           });
//           if (user?.bvn && AccountTier) {
//             user.accountTier = AccountTier;
//           }
//         }
//         await user.save();
//       } else {
//         if (
//           !user.accountTier ||
//           user.accountTier.tierLevel !== 99 ||
//           !user.bvn
//         ) {
//           await user.save();
//           return {
//             message:
//               'Your NIN has been updated successfully. To proceed with a tier level upgrade, your account must be on Tier Level 1.',
//             user,
//           };
//         }
//       }

//       return user;
//     });
//   }

//   async updateUseBVNNumber(
//     updateUserNinNumber: UpdateUserBVNNumberDto,
//     clientId: string,
//   ) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: [{ clientId: Number(clientId) }],
//         relations: ['accountTier'],
//       });

//       if (!user) {
//         throw new NotFoundException('User not found');
//       }

//       const ninExits = await this.userRepository.findOne({
//         where: [{ bvn: updateUserNinNumber.bvn }],
//       });

//       if (ninExits) {
//         if (ninExits.clientId == Number(clientId)) {
//           throw new HttpException(
//             {
//               message: CLIENT_ERRORS.BVN_ALREADY_PRESENT.message,
//               statusCode: CLIENT_ERRORS.BVN_ALREADY_PRESENT.statusCode,
//             },
//             CLIENT_ERRORS.BVN_ALREADY_PRESENT.statusCode,
//           );
//         }
//         throw new HttpException(
//           {
//             message: CLIENT_ERRORS.NIN_EXITS.message,
//             statusCode: CLIENT_ERRORS.NIN_EXITS.statusCode,
//           },
//           CLIENT_ERRORS.NIN_EXITS.statusCode,
//         );
//       }

//       user.bvn = updateUserNinNumber.bvn;
//       if (user.nin) {
//         if (user.utilityBills) {
//           const AccountTier = (await this.accountTierRepository.findOne({
//             where: { tierLevel: 101 },
//           })) as any;
//           user.accountTier = AccountTier;
//         } else {
//           const AccountTier = (await this.accountTierRepository.findOne({
//             where: { tierLevel: 100 },
//           })) as any;
//           user.accountTier = AccountTier;
//         }
//         await user.save();
//       } else {
//         const AccountTier = (await this.accountTierRepository.findOne({
//           where: { tierLevel: 99 },
//         })) as any;
//         user.accountTier = AccountTier;
//         await user.save();
//       }
//       return user;
//     });
//   }

//   async getUtilityBillsCodes() {
//     return asyncWrapper(async () => {
//       const codes = (await this.userHttpService.getUtilityBillCodes()) as any;
//       if (codes && codes.length === 0) {
//         throw new HttpException(
//           {
//             message: COMMON_ERRORS.NOT_FOUND.message,
//             statusCode: COMMON_ERRORS.NOT_FOUND.code,
//           },
//           COMMON_ERRORS.NOT_FOUND.statusCode,
//         );
//       }
//       return codes;
//     });
//   }

//   async uploadUtilityBillBase64(
//     fileBase64: string,
//     id: number,
//     clientId: string,
//   ) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: { clientId: Number(clientId) },
//       });

//       if (!user) {
//         throw new NotFoundException(CLIENT_ERRORS.CLIENT_NOT_FOUND.message);
//       }
//       const fileBuffer = Buffer.from(fileBase64, 'base64');

//       const fileTypeResult = await fileType.fromBuffer(fileBuffer);
//       if (!fileTypeResult) {
//         throw new BadRequestException('Invalid file type');
//       }

//       const fileExt = fileTypeResult.ext; // Extract file extension
//       const newfileName = `${Date.now()}-${randomUUID()}.${fileExt}`;
//       const folder = String(clientId);

//       const result = await this.dataSource.transaction(async (manager) => {
//         const codes = (await this.userHttpService.getUtilityBillCodes()) as any;
//         const codeExists = codes.find((code) => code.id == id);
//         if (!codeExists) {
//           throw new NotFoundException('Invalid utility bill type');
//         }

//         const uploadUtilityBillPayload: UploadUtilityBillPayload = {
//           documentTypeId: Number(id),
//           documentKey: newfileName?.split('.').slice(0, -1).join('.') || '',
//           status: UtilityBillStatus.Inactive,
//         };

//         const uploadUtilityBillResponse =
//           await this.userHttpService.uploadUtilityBillCodes(
//             { clientId: String(user.clientId) },
//             uploadUtilityBillPayload,
//           );

//         if (!uploadUtilityBillResponse) {
//           throw new HttpException(
//             {
//               message: CLIENT_ERRORS.UNABLE_TO_UPLOAD_UTILITY_BILL.message,
//               statusCode:
//                 CLIENT_ERRORS.UNABLE_TO_UPLOAD_UTILITY_BILL.statusCode,
//             },
//             CLIENT_ERRORS.UNABLE_TO_UPLOAD_UTILITY_BILL.statusCode,
//           );
//         }

//         // Upload the file directly to S3
//         const signedUrl = await this.s3Service.uploadFileFromBuffer(
//           fileBuffer,
//           newfileName,
//           folder,
//         );

//         if (!signedUrl) {
//           throw new InternalServerErrorException('File upload failed');
//         }

//         const s3Key = `${process.env.S3_FOLDER_NAME}/${folder}/${newfileName}`;
//         const utilityBill = this.utilityBillRepository.create({
//           fileName: newfileName,
//           s3Key,
//           user: user,
//           type: String(id),
//         });

//         await manager.save(utilityBill);

//         const accountTier = await manager.findOne(
//           this.accountTierRepository.target,
//           {
//             where: { tierLevel: 101 },
//           },
//         );

//         if (user.bvn && user.nin && accountTier) {
//           user.accountTier = accountTier;
//           await manager.save(user);
//         }
//         const { url } = signedUrl;

//         return {
//           message:
//             user.bvn && user.nin && accountTier
//               ? 'File uploaded and saved successfully'
//               : 'File uploaded and saved successfully but Account Tier level has not updated. Please update the NIN or BVN to update the Account Tier Level',
//           url,
//           user,
//         };
//       });

//       return result; // ✅ Return the result from the transaction
//     });
//   }

//   async updateUtilityBillBase64(
//     identifierId: string,
//     fileBase64: string,
//     clientId: string,
//     type: string,
//   ) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: { clientId: Number(clientId) },
//       });

//       if (!user) {
//         throw new NotFoundException(CLIENT_ERRORS.CLIENT_NOT_FOUND.message);
//       }

//       const existingBill = await this.utilityBillRepository.findOne({
//         where: {
//           user: { clientId: Number(clientId) },
//           type: String(type), // 👈 Ensure this is a string
//         },
//         relations: ['user'],
//       });

//       if (!existingBill) {
//         throw new NotFoundException('Utility bill not found');
//       }

//       const fileBuffer = Buffer.from(fileBase64, 'base64');
//       const fileTypeResult = await fileType.fromBuffer(fileBuffer);

//       if (!fileTypeResult) {
//         throw new BadRequestException('Invalid file type');
//       }

//       const fileExt = fileTypeResult.ext;
//       const newfileName = `${Date.now()}-${randomUUID()}.${fileExt}`;
//       const folder = String(clientId);

//       const signedUrl = await this.s3Service.uploadFileFromBuffer(
//         fileBuffer,
//         newfileName,
//         folder,
//       );

//       if (!signedUrl) {
//         throw new InternalServerErrorException('File upload failed');
//       }
//       const uploadUtilityBillPayload: UploadUtilityBillPayload = {
//         documentTypeId: Number(type),
//         documentKey: newfileName?.split('.').slice(0, -1).join('.') || '',
//       };
//       console.log(uploadUtilityBillPayload);
//       const updateInfoCBA = await this.userHttpService.updateUtilityBillCodes(
//         {
//           clientId,
//           identifierId,
//         },
//         uploadUtilityBillPayload,
//       );

//       console.log('updateInfoCBA', updateInfoCBA);

//       if (existingBill?.s3Key) {
//         await this.s3Service.deleteFile(existingBill.s3Key);
//       }

//       const s3Key = `${process.env.S3_FOLDER_NAME}/${folder}/${newfileName}`;

//       existingBill.fileName = newfileName;
//       existingBill.s3Key = s3Key;
//       existingBill.updatedAt = new Date(); // Optional: assuming your entity has updatedAt

//       await this.utilityBillRepository.save(existingBill);

//       const { url } = signedUrl;

//       return {
//         message: 'Utility bill updated successfully',
//         url,
//         utilityBill: existingBill,
//       };
//     });
//   }

//   async getUtilityBills(id: string) {
//     return asyncWrapper(async () => {
//       const utilityBills = (await this.userHttpService.getUtilityBills({
//         clientId: id,
//       })) as any;

//       if (!utilityBills || utilityBills.length === 0) {
//         throw new NotFoundException('No Utility bills found');
//       }

//       const bills = (await this.utilityBillRepository.find({
//         where: { user: { clientId: Number(id) } },
//         relations: ['user'],
//       })) as any;

//       if (!bills || bills.length === 0) {
//         throw new NotFoundException('No Utility bills found');
//       }

//       const enhancedBills = bills.map((bill: any) => {
//         const match = utilityBills.find(
//           (util: any) => util?.documentType?.id == bill?.type,
//         );
//         const { user, ...otherData } = bill;
//         if (match) {
//           return {
//             ...otherData,
//             documentId: match.id,
//             clientId: user.clientId,
//           };
//         }
//         return bill;
//       });

//       return {
//         utility_bills: enhancedBills,
//       };
//     });
//   }

//   async ApproveUtilityBills(status: number, billId: string) {
//     return asyncWrapper(async () => {
//       const utilityBill = await this.utilityBillRepository.findOne({
//         where: { id: billId },
//       });
//       if (!utilityBill) {
//         throw new NotFoundException(COMMON_ERRORS.NOT_FOUND);
//       }
//       utilityBill.verificationStatus = status;
//       await utilityBill.save();
//       return {
//         utility_bill: utilityBill,
//       };
//     });
//   }

//   async checkUserExists(
//     email?: string,
//     mobileNo?: string,
//   ): Promise<{ emailExists: boolean; mobileNoExists: boolean }> {
//     return asyncWrapper(async () => {
//       if (!email && !mobileNo) {
//         throw new HttpException(
//           {
//             message: CLIENT_ERRORS.INVALID_CHECK_REQUEST.message,
//             statusCode: CLIENT_ERRORS.INVALID_CHECK_REQUEST.statusCode,
//           },
//           CLIENT_ERRORS.INVALID_CHECK_REQUEST.statusCode,
//         );
//       }

//       const [emailExists, mobileNoExists] = await Promise.all([
//         email
//           ? this.userRepository.exists({ where: { email } })
//           : Promise.resolve(false),
//         mobileNo
//           ? this.userRepository.exists({
//               where: { mobileNo: String(mobileNo) },
//             })
//           : Promise.resolve(false),
//       ]);

//       return { emailExists, mobileNoExists };
//     });
//   }

//   async getUserAccounts(clientId: string) {
//     return asyncWrapper(async () => {
//       const user = await this.userRepository.findOne({
//         where: { clientId: Number(clientId) },
//         relations: ['accounts'],
//       });

//       if (!user) {
//         throw new NotFoundException(CLIENT_ERRORS.CLIENT_NOT_FOUND.message);
//       }

//       return user;
//     });
//   }
}
