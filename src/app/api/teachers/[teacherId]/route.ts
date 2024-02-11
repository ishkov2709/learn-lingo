import Teacher, { bookSchema } from "@/lib/models/teachers";
import connect from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "../favorites/[teacherId]/route";
import HttpError from "@/lib/helpers/HttpError";
import { TeacherProps } from "@/components/card/card";
import jwt, { JwtPayload } from "jsonwebtoken";

const { SECRET_KEY = "" } = process.env;

export async function GET(req: NextRequest, { params }: Params) {
  const { teacherId } = params;
  try {
    await connect();

    const teacher = await Teacher.findById(teacherId);
    return NextResponse.json(teacher, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching data" },
        { status: 404 }
      );
    }
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const { teacherId } = params;

  const body = await req.json();
  const { error } = bookSchema.validate(body);
  if (error) return HttpError(error?.message, 404);

  const bearerToken = req.headers.get("authorization") ?? "";
  const [bearer, token] = bearerToken.split(" ");
  if (bearer !== "Bearer") return HttpError("Not authorized", 401);
  const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
  if (!id) return HttpError("Not authorized", 401);

  try {
    await connect();

    const teacher = (await Teacher.findById(teacherId)) as TeacherProps;
    const newBooks = [...(teacher.followers ?? []), { id, ...body }];
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        followers: [...newBooks],
      },
      { new: true }
    );

    return NextResponse.json(updatedTeacher, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { message } = error;
      return NextResponse.json({ message }, { status: 404 });
    }
  }
}
