import connect from "@/lib/utils";
import HttpError from "@/lib/helpers/HttpError";
import { User, registerSchema } from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  await connect();
  const body: RegisterBody = await req.json();

  const { error } = registerSchema.validate(body);
  if (error) return HttpError(error?.message, 404);
  const usedEmail = await User.findOne({ email: body.email });
  if (usedEmail) return HttpError("Email in use", 409);

  const hashPassword = await bcrypt.hash(body.password, 10);
  const newUser = await User.create({ ...body, password: hashPassword });
  return NextResponse.json(newUser, { status: 201 });
}
