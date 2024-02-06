import connect from "@/lib/utils";
import { User } from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

export interface LogoutBody {
  id: string;
}

export async function POST(req: NextRequest) {
  await connect();
  const { id }: LogoutBody = await req.json();
  await User.findByIdAndUpdate(id, { token: "" });

  return NextResponse.json({}, { status: 200 });
}
