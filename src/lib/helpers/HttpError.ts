import { NextResponse } from "next/server";

export default function HttpError(errorText: string, errorStatus: number) {
  return NextResponse.json({ message: errorText }, { status: errorStatus });
}
