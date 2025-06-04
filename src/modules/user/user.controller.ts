// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Query,
//   Put,
//   BadRequestException,
// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdateUserNinNumberDto } from './dto/update-user-nin.dto';
// import { ClientIdDto } from '@/common/dto/params/client-id.dto';
// import { UpdateUserBVNNumberDto } from './dto/update-user-bvn.dto';
// import { ApiOperation } from '@nestjs/swagger';
// import { CLIENT_ERRORS } from './errors/user.errors';
// import { CheckEmailOrPhoneDto } from './dto/contact-existence-check.dto';
// import { UploadUtilityBillDto } from './dto/create-user.dto';
// import { UpdateUtilityBillDto } from './dto/update-uitility-bill.dto';

import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

//   @Get('/codes/utility-bills')
//   getUtilityBillsCodes() {
//     return this.userService.getUtilityBillsCodes();
//   }

//   @Put('/:clientId/utility-bills/:identifierId')
//   async updateFile(
//     @Body() uploadUtilityBillDto: UpdateUtilityBillDto, // Accepting Base64 string
//     @Param('identifierId') identifierId: string,
//     @Param('clientId') clientId: string,
//   ) {
//     const { fileBase64, id } = uploadUtilityBillDto;
//     console.log('djka;lfjaldjflkj');
//     return await this.userService.updateUtilityBillBase64(
//       identifierId,
//       fileBase64,
//       clientId,
//       String(id),
//     );
//   }

//   @Post('/:clientId/utility-bills')
//   async uploadFile(
//     @Param() params: ClientIdDto,
//     @Body() uploadUtilityBillDto: UploadUtilityBillDto, // Accepting Base64 string
//   ) {
//     const { fileBase64, id } = uploadUtilityBillDto;

//     return await this.userService.uploadUtilityBillBase64(
//       fileBase64,
//       id,
//       params.clientId,
//     );
//   }

//   @Put('/:clientId')
//   @ApiOperation({
//     summary: 'Update User/client details',
//     description: `
//       This endpoint is used to Update User/client details.
//       REQUIRED FIELDS: 
//       -locale
//       `,
//   })
//   update(
//     @Param('clientId') clientId: string,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     return this.userService.updateUser(clientId, updateUserDto);
//   }

//   @Get('client/:clientId')
//   @ApiOperation({
//     summary: 'get User/client details with client ID',
//     description: `
//       This endpoint is used to get User/client details with client ID.
//       `,
//   })
//   getClientById(@Param() params: ClientIdDto) {
//     return this.userService.getClientByID(params.clientId);
//   }



//   @Get('/:clientId/utility-bills')
//   @ApiOperation({
//     summary: 'get Utility Bills details with client ID',
//     description: `
//       This endpoint is used to get Utility Bills details with client ID.
//       `,
//   })
//   getUtilityBills(@Param() params: ClientIdDto) {
//     return this.userService.getUtilityBills(params.clientId);
//   }

//   @Get('accounts')
//   @ApiOperation({
//     summary: 'get User/client details with BVN',
//     description: `
//       This endpoint is used to get User/client details with BVN.
//       `,
//   })
//   getClientByBvn(@Query('bvn') bvn: string) {
//     if (!bvn) {
//       throw new BadRequestException(CLIENT_ERRORS.BVN_REQUIRED.message);
//     }
//     return this.userService.getClientByBvn(bvn);
//   }

//   @Put('nin/:clientId')
//   @ApiOperation({
//     summary: 'Update User/client NIN and Account tier level',
//     description: `
//       This endpoint is used to Update User/client NIN and Account tier level if user have both NIN and BVN the Account tier level will update to 2.
//       REQUIRED FIELDS: 
//       -nin
//       `,
//   })
//   updateNin(
//     @Param() params: ClientIdDto,
//     @Body() updateUserNinNumberDto: UpdateUserNinNumberDto,
//   ) {
//     return this.userService.updateUserNinNumber(
//       updateUserNinNumberDto,
//       params.clientId,
//     );
//   }

//   @Put('bvn/:clientId')
//   @ApiOperation({
//     summary: 'Update User/client BVN and Account tier level',
//     description: `
//       This endpoint is used to Update User/client NIN and Account tier level if user have not Account tier after update bvn the account tier will be account tire 1.
//       REQUIRED FIELDS: 
//       -bvn
//       `,
//   })
//   updateBvn(
//     @Param() params: ClientIdDto,
//     @Body() updateUserNinNumberDto: UpdateUserBVNNumberDto,
//   ) {
//     return this.userService.updateUseBVNNumber(
//       updateUserNinNumberDto,
//       params.clientId,
//     );
//   }

//   @Post('check-identifier')
//   @ApiOperation({
//     summary: 'Check if a user/client exists based on email or phone number',
//     description: `
//       This endpoint is used to check if a user/client exists in the system based on their email or phone number. 
//       The user can be searched using either email or phone number, or both. The system will return whether each identifier (email, phone number) is associated with an existing user.
//       REQUIRED FIELDS:
//       - Either email or phone number must be provided for the check to be performed.
  
//       If both email and phone number are provided, the system will check both fields independently and return their individual statuses.
//     `,
//   })
//   async checkEmailOrPhone(@Body() dto: CheckEmailOrPhoneDto) {
//     return await this.userService.checkUserExists(dto.email, dto.mobileNo);
//   }
}
