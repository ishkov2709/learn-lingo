import connect from "@/lib/utils";
import HttpError from "@/lib/helpers/HttpError";
import { User, loginSchema } from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface LoginBody {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  token: null | string;
  verify: boolean;
  verificationToken: string;
}

const { SECRET_KEY = "" } = process.env;

export async function POST(req: NextRequest) {
  await connect();
  const { email, password }: LoginBody = await req.json();
  const user: Readonly<UserData> | null = await User.findOne({
    email,
  });

  if (!user) return HttpError("Email or password is wrong", 401);
  if (!user.verify) return HttpError("Email not verify", 401);

  const { error } = loginSchema.validate({ email, password });
  if (error) return HttpError(error?.message, 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return HttpError("Email or password is wrong", 401);

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return NextResponse.json(
    { token, user: { id: user._id, name: user.name, email } },
    { status: 200 }
  );
}
