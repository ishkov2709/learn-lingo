import connect from "@/lib/utils";
import HttpError from "@/lib/helpers/HttpError";
import { User } from "@/lib/models/users";
import { NextRequest, NextResponse } from "next/server";

interface VerifyParams {
  params: { verificationToken: string };
}

export async function GET(req: NextRequest, { params }: VerifyParams) {
  await connect();
  const { verificationToken } = params;

  const user = await User.findOne({ verificationToken });
  if (!user) return HttpError("User is not found", 404);

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  return NextResponse.json({ message: "Verification successful" });
}
