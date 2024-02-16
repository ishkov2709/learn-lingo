import HttpError from "@/lib/helpers/HttpError";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/lib/models/users";
import connect from "@/lib/utils";

const { SECRET_KEY = "" } = process.env;

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization") ?? "";
  const [bearer, token] = bearerToken.split(" ");

  if (bearer !== "Bearer") return HttpError("Not authorized", 401);

  try {
    await connect();

    const { id } = (await jwt.verify(token, SECRET_KEY)) as JwtPayload;
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { message } = error;
      return NextResponse.json({ message }, { status: 401 });
    }
  }
}
