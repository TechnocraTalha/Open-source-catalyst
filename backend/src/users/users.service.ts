import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByGithubId(githubId: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { githubId } });
    }

    async createOrUpdate(profile: any, accessToken: string): Promise<User> {
        let user = await this.findOneByGithubId(profile.id);
        if (!user) {
            user = new User();
            user.githubId = profile.id;
        }
        user.username = profile.username;
        user.avatarUrl = profile.photos?.[0]?.value;
        user.accessToken = accessToken;
        return this.usersRepository.save(user);
    }
}
