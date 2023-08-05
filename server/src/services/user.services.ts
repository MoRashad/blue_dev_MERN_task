import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";
import { FilterQuery, HydratedDocument } from "mongoose";

export const createUser = async (input: HydratedDocument<UserDocument>) => {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error);
  }
};

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export const validateUser = async ({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) => {
  const user = await User.findOne({ email });
  if (!user) return false;
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) return false;

  return omit(user.toJSON(), "password");
};
