import BookForm from "@/components/book-form";

export interface BookPageParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: BookPageParams) {
  console.log(params.id);

  return (
    <main>
      <BookForm id={params.id} />
    </main>
  );
}
