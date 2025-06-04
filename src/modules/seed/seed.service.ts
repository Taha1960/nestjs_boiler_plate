import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async seedAdmin() {
        try {
            const user = await this.userRepository.findOneBy({ role: UserRole.ADMIN })
            if (!user) {
                const [email, password] = Buffer.from(process.env.ADMIN_CREDENTIALS, "base64").toString("utf-8").split(":");
                const admin = this.userRepository.create({
                    name: "admin",
                    email,
                    role: UserRole.ADMIN,
                    password,
                })
                await this.userRepository.save(admin);
            }
        } catch (error) {

        }

    }
}
