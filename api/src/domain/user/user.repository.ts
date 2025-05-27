import { User } from "./user.entity";

export interface IUserRepository {
    create(user: User): Promise<User>;
    list(): Promise<User[]>
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCredentials(email: string, password: string): Promise<User | null>
}