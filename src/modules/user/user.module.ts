import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { SmsModule } from '@/modules/sms-services/sms.module';
// import { EmailModule } from '@/modules/email-services/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers : [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
