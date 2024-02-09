import connect from "@/lib/utils";
import { User } from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

interface UserId {
  id: string;
}

export async function POST(req: NextRequest) {
  await connect();
  const { id }: UserId = await req.json();

  await User.findByIdAndUpdate(id, { token: "" });

  return NextResponse.json({}, { status: 200 });
}
