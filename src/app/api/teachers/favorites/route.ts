import HttpError from "@/lib/helpers/HttpError";
import connect from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/lib/models/teachers";
import jwt, { JwtPayload } from "jsonwebtoken";

const { SECRET_KEY = "" } = process.env;

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization") ?? "";
  const [bearer, token] = bearerToken.split(" ");
  if (bearer !== "Bearer") return HttpError("Not authorized", 401);

  await connect();

  const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
  const teachers = await Teacher.find({ favorites: { $in: id } });

  return NextResponse.json([...teachers]);
}
