import RegisterForm from "@/components/register-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface PageProps {}

export default function Page() {
  return (
    <main>
      <section className="py-10">
        <RegisterForm />
      </section>
      <ToastContainer />
    </main>
  );
}
