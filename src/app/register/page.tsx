import RegisterForm from "@/components/register-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface TokenValue {
  value: string | null;
}

export default function Page() {
  const { value } = (cookies().get("user-token") ?? {
    value: null,
  }) as TokenValue;

  if (value) return redirect("/");

  return (
    <main>
      <section className="py-10">
        <RegisterForm />
      </section>
    </main>
  );
}
