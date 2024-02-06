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
  try {
    await connect();

    const searchParams: IterableIterator<[string, string]> =
      req.nextUrl.searchParams.entries();

    const query: Query = {};
    const paginaton: Pagination = {};

    Object.entries(Object.fromEntries(searchParams)).forEach((el) => {
      if (el[0] === "languages") return (query.languages = { $in: [el[1]] });
      if (el[0] === "levels") return (query.levels = { $in: [el[1]] });
      if (el[0] === "price")
        return (query.price_per_hour = { $gt: 0, $lt: Number(el[1]) });
      if (el[0] === "perPage") return (paginaton.limit = Number(el[1]));
      if (el[0] === "page")
        return (paginaton.skip = paginaton.limit
          ? paginaton.limit * Number(el[1])
          : Number(el[1]));
    });
    const teachers = await Teacher.find(query, {}, paginaton);

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
