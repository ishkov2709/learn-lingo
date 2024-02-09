import HttpError from "@/lib/helpers/HttpError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/users";
import connect from "@/lib/utils";

const { SECRET_KEY = "" } = process.env;

interface JwtPayload {
  id: string;
}

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization") ?? "";
  const [bearer, token] = bearerToken.split(" ");

  if (bearer !== "Bearer") return HttpError("Not authorized", 401);

  await connect();

  const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
  const user = await User.findById(id);

  const userData = {
    token: user.token,
    user: {
      id,
      name: user.name,
      email: user.email,
    },
  };

  return NextResponse.json({ ...userData }, { status: 200 });
}
