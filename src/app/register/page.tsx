import RegisterForm from "@/components/register-form";

export interface PageProps {}

export default function Page() {
  return (
    <main>
      <section className="py-10">
        <RegisterForm />
      </section>
    </main>
  );
}
