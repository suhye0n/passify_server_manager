import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

const generateToken = (user: User): TokenData => {
  const payload: DataStoredInToken = { id: user.id };
  const expiresIn = 60 * 60;

  return {
    expiresIn,
    token: sign(payload, SECRET_KEY, { expiresIn }),
  };
};

const generateCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<{ cookie: string; user: User }> {
    const existingUser: User = await DB.Users.findOne({
      where: { email: userData.email },
    });
    if (existingUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);

    const newUser: User = await DB.Users.create({
      ...userData,
      password: hashedPassword,
    });

    const tokenData = generateToken(newUser);

    newUser.token = tokenData.token;
    await DB.Users.update({ token: tokenData.token }, { where: { id: newUser.id } });

    const cookie = generateCookie(tokenData);

    return { cookie, user: newUser };
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; user: User }> {
    const user: User = await DB.Users.findOne({
      where: { email: userData.email },
    });
    if (!user) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordValid: boolean = await compare(userData.password, user.password);
    if (!isPasswordValid) throw new HttpException(409, 'Password not matching');

    const tokenData = generateToken(user);

    user.token = tokenData.token;
    await DB.Users.update({ token: tokenData.token }, { where: { id: user.id } });

    const cookie = generateCookie(tokenData);

    return { cookie, user };
  }

  public async logout(userData: User): Promise<User> {
    const user: User = await DB.Users.findOne({
      where: { email: userData.email, password: userData.password },
    });
    if (!user) throw new HttpException(409, "User doesn't exist");

    return user;
  }
}
