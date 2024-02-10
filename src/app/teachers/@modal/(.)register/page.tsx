"use client";

import Modal from "@/components/modal";
import RegisterForm from "@/components/register-form";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Page() {
  const token = getCookie("user-token") as string;

  if (token) return redirect("/");

  return (
    <Modal>
      <RegisterForm />
    </Modal>
  );
}
