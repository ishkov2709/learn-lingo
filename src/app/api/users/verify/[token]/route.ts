import { NextRequest, NextResponse } from "next/server";

interface VerifyParams {
  params: { token: string };
}

export async function GET(req: NextRequest, { params }: VerifyParams) {
  return NextResponse.json({ message: params.token });
}
