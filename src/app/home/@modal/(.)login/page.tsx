"use client";

import LoginForm from "@/components/login-form";
import Modal from "@/components/modal";

export interface PageProps {}

export default function Page() {
  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
}
