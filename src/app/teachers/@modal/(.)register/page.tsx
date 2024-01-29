"use client";

import Modal from "@/components/modal";
import RegisterForm from "@/components/register-form";

export interface PageProps {}

export default function Page() {
  return (
    <Modal>
      <RegisterForm />
    </Modal>
  );
}
