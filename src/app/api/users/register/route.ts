import connect from "@/lib/utils";
import HttpError from "@/lib/helpers/HttpError";
import { User, registerSchema } from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { transporter } from "@/lib/helpers/transporter";

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

const { HOST_EMAIL, BASE_URL } = process.env;

export async function POST(req: NextRequest) {
  await connect();

  const body: RegisterBody = await req.json();

  const { error } = registerSchema.validate(body);
  if (error) return HttpError(error?.message, 404);
  const usedEmail = await User.findOne({ email: body.email });
  if (usedEmail) return HttpError("Email in use", 409);

  const hashPassword = await bcrypt.hash(body.password, 10);
  const verificationToken = randomUUID();

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    verificationToken,
  });
  const emailOptions = {
    from: HOST_EMAIL,
    to: body.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${newUser.verificationToken}">Click verify email</a>`,
  };
  await transporter.sendMail(emailOptions);

  return NextResponse.json(newUser, { status: 201 });
}
