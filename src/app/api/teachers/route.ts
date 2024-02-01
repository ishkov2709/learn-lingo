import { NextResponse } from "next/server";
import connect from "../../../../db";
import Teacher from "../../../../models/Teacher";

export async function GET() {
  try {
    await connect();
    const teachers = await Teacher.find();

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching teacher`s data" },
      { status: 500 }
    );
  }
}
