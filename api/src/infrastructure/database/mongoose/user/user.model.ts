import { Schema, model, Model, HydratedDocument } from "mongoose";
import { IUser, IUserMethods } from "./user.types";
import { UserRole } from "../../../../application/enums/user-role.enum";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods> | null>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
    default: UserRole.USER
  },
  tokens: [{ token: { type: String, required: true } }],
}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {
  const user = this as HydratedDocument<IUser>;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this as HydratedDocument<IUser, IUserMethods>;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY as string);
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

userSchema.statics.findByCredentials = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

export const UserModel = model<IUser, UserModel>("User", userSchema);
