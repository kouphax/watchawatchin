import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export type Identity = {
  username: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    usersRepository.save({
      username: 'james',
      password: bcrypt.hashSync('changeme', bcrypt.genSaltSync(10)),
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(username);
  }
}
