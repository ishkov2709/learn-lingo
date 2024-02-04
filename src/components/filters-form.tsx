import React from "react";

export interface FiltersFormProps {
  children?: React.ReactNode;
}

export default function FiltersForm({ children }: FiltersFormProps) {
  // const getFilteredTeachers = async (formData: FormData) => {
  //   "use server";
  //   const data = {
  //     language: formData.get("language"),
  //     level: formData.get("level"),
  //     price: formData.get("price"),
  //   };
  //   console.log(data);
  // };

  return <form className="flex flex-row gap-4">{children}</form>;
}
