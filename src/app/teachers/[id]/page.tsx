export interface BookPageParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: BookPageParams) {
  return <>{params.id}</>;
}
