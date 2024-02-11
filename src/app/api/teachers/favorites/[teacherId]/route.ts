import HttpError from "@/lib/helpers/HttpError";
import connect from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Teacher from "@/lib/models/teachers";
import { TeacherProps } from "@/components/card/card";

export interface Params {
  params: {
    teacherId: string;
  };
}

const { SECRET_KEY = "" } = process.env;

export async function PATCH(req: NextRequest, { params }: Params) {
  const { teacherId } = params;
  const bearerToken = req.headers.get("authorization") ?? "";
  const [bearer, token] = bearerToken.split(" ");
  if (bearer !== "Bearer") return HttpError("Not authorized", 401);

  try {
    await connect();

    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const { favorites = [] } = (await Teacher.findById(
      teacherId
    )) as TeacherProps;
    const userIndex = favorites?.findIndex((userId) => userId === id);
    if (userIndex !== -1) return HttpError("User was added earlier", 404);
    const newValue = [...favorites, id];
    const newTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        favorites: newValue,
      },
      { new: true }
    );

    return NextResponse.json({ ...newTeacher });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { message } = error;
      return NextResponse.json({ message });
    }
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { teacherId } = params;
  const bearerToken = req.headers.get("authorization") ?? "";
  const [bearer, token] = bearerToken.split(" ");
  if (bearer !== "Bearer") return HttpError("Not authorized", 401);

  try {
    await connect();

    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const { favorites = [] } = (await Teacher.findById(
      teacherId
    )) as TeacherProps;
    const userIndex = favorites?.findIndex((userId) => userId === id);
    if (userIndex === -1) return HttpError("User is emtpy", 404);
    const newValue = favorites.filter((userId) => userId !== id);
    const newTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        favorites: newValue,
      },
      { new: true }
    );

    return NextResponse.json({ ...newTeacher });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { message } = error;
      return NextResponse.json({ message });
    }
  }
}
