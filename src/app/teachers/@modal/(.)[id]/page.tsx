"use client";

import Modal from "@/components/modal";
import { BookPageParams } from "../../[id]/page";
import BookForm from "@/components/book-form";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Page({ params }: BookPageParams) {
  const token = getCookie("user-token");

  if (!token) return redirect("/");

  return (
    <Modal>
      <BookForm id={params.id} />
    </Modal>
  );
}
