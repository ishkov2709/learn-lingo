import Teacher from "@/lib/models/teachers";
import connect from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface Query {
  languages?: { $in: string[] };
  levels?: { $in: string[] };
  price_per_hour?: { $gt: number; $lt: number };
}

interface Pagination {
  skip?: number;
  limit?: number;
}

export async function GET(req: NextRequest) {
  const languages = req.nextUrl.searchParams.get("languages");
  const levels = req.nextUrl.searchParams.get("levels");
  const price_per_hour = req.nextUrl.searchParams.get("price");
  const limit = req.nextUrl.searchParams.get("perPage");
  const skip = req.nextUrl.searchParams.get("page");

  try {
    await connect();

    const query: Query = {};
    const paginaton: Pagination = {};

    if (languages) {
      query.languages = { $in: [languages] };
    }
    if (levels) {
      query.levels = { $in: [levels] };
    }
    if (price_per_hour) {
      query.price_per_hour = { $gt: 0, $lt: Number(price_per_hour) };
    }
    if (limit) {
      paginaton.limit = Number(limit);
    }
    if (skip) {
      paginaton.skip = paginaton.limit
        ? paginaton.limit * Number(skip)
        : Number(skip);
    }

    const teachers = await Teacher.find(query, {}, paginaton);
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
