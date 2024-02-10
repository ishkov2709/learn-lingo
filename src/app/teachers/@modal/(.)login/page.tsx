"use client";

import LoginForm from "@/components/login-form";
import Modal from "@/components/modal";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Page() {
  const token = getCookie("user-token") as string;

  if (token) return redirect("/");

  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
}
