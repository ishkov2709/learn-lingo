"use client";

import Modal from "@/components/modal";
import { BookPageParams } from "../../[id]/page";
import BookForm from "@/components/book-form";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Page({ params }: BookPageParams) {
  const token = getCookie("user-token");

  useEffect(() => {
    !token && redirect("/");
  }, [token]);

  return (
    <Modal>
      <BookForm id={params.id} />
    </Modal>
  );
}
