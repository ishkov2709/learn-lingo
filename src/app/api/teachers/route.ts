import Teacher from "@/lib/models/Teacher";
import connect from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const teachers = await Teacher.find().limit(3);

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
