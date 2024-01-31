import { NextResponse } from "next/server";
import connect from "../../../../db";

export async function GET() {
  try {
    await connect();
  } catch (error) {
    return new NextResponse("Error in fetching teacher's data");
  }
}
