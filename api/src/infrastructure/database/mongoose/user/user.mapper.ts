import { User } from "../../../../domain/user/user.entity";

export const UserMapper = {
  toEntity(doc: any): User | null {
    if (!doc) return null;

    return new User(
      doc._id.toString(),
      doc.name,
      doc.email,
      doc.password,
      doc.tokens || [],
      doc.role || 'user'
    );
  },

  toPersistence(entity: User): any {
    return {
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      tokens: entity.tokens
    };
  }
};
