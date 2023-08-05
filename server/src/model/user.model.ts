import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  comparePassword(inputPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next: (err?: Error) => void) {
  let user = this as unknown as UserDocument;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.SALT_FACTOR);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (inputPassword: string) {
  const user = this as UserDocument;
  return bcrypt.compare(inputPassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
