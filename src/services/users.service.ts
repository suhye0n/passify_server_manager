import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await DB.Users.findAll();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const user: User = await DB.Users.findByPk(userId);
    if (!user) throw new HttpException(409, "User doesn't exist");

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser: User = await DB.Users.findOne({
      where: { email: userData.email },
    });
    if (existingUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const newUser: User = await DB.Users.create({
      ...userData,
      password: hashedPassword,
    });
    return newUser;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    const userToUpdate: User = await DB.Users.findByPk(userId);
    if (!userToUpdate) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await DB.Users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updatedUser: User = await DB.Users.findByPk(userId);
    return updatedUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const userToDelete: User = await DB.Users.findByPk(userId);
    if (!userToDelete) throw new HttpException(409, "User doesn't exist");

    await DB.Users.destroy({ where: { id: userId } });

    return userToDelete;
  }
}
