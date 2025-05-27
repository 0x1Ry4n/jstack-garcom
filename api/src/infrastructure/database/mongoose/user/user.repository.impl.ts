import { User } from "../../../../domain/user/user.entity";
import { IUserRepository } from "../../../../domain/user/user.repository";
import { UserModel } from "./user.model";
import { UserMapper } from "./user.mapper";

export class UserRepositoryImpl implements IUserRepository {
  async create(user: User): Promise<User> {
    const data = UserMapper.toPersistence(user);
    const created = await UserModel.create(data);
    return UserMapper.toEntity(created)!;
  }

  async list(): Promise<User[]> {
    const users = await UserModel.find();

    return users.map(user => UserMapper.toEntity(user));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return UserMapper.toEntity(user);
  }

  async findByCredentials(email: string, password: string): Promise<User | null> {
    const user = await UserModel.findByCredentials(email, password);
    return UserMapper.toEntity(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return UserMapper.toEntity(user);
  }
}
