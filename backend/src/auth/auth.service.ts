import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(profile: any, accessToken: string): Promise<any> {
        return this.usersService.createOrUpdate(profile, accessToken);
    }
}
