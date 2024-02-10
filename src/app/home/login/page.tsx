import { TokenValue } from "@/app/register/page";
import LoginForm from "@/components/login-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const { value } = (cookies().get("user-token") ?? {
    value: null,
  }) as TokenValue;

  if (value) return redirect("/");

  return (
    <main>
      <section className="py-10">
        <LoginForm />
      </section>
    </main>
  );
}
