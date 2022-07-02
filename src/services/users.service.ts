import { inject, injectable } from 'inversify'
import TYPES from '../container/types'
import { IUser } from '@interfaces/user.interface'

@injectable()
export default class UsersService {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  public async list() {
    return this.usersRepository.list()
  }
}
