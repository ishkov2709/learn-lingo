import LoginForm from "@/components/login-form";

export interface PageProps {}

export default function Page() {
  return (
    <main>
      <section className="py-10">
        <LoginForm />
      </section>
    </main>
  );
}
