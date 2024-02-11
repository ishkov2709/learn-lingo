import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TokenValue } from "../register/page";
import FavoritesList from "@/components/favorites-list";

export default function Page() {
  const { value } = (cookies().get("user-token") ?? {
    value: null,
  }) as TokenValue;

  if (!value) return redirect("/");

  return (
    <main
      style={{ backgroundColor: "#F8F8F8", minHeight: "calc(100% - 88px)" }}
    >
      <section className="pt-8 pb-16">
        <div className="container">
          <FavoritesList />
        </div>
      </section>
    </main>
  );
}
