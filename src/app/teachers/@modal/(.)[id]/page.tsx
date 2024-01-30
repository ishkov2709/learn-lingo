"use client";

import Modal from "@/components/modal";
import { BookPageParams } from "../../[id]/page";
import BookForm from "@/components/book-form";

export default function Page({ params }: BookPageParams) {
  return (
    <Modal>
      <BookForm id={params.id} />
    </Modal>
  );
}
