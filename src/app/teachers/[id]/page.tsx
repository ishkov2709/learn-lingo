import BookForm from "@/components/book-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TokenValue } from "@/app/register/page";

export interface BookPageParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: BookPageParams) {
  const { value } = (cookies().get("user-token") ?? {
    value: null,
  }) as TokenValue;

  if (!value) return redirect("/");

  return (
    <main>
      <BookForm id={params.id} />
    </main>
  );
}
