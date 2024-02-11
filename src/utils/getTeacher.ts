export async function getTeacher(id: string) {
  try {
    const data = await fetch(`/api/teachers/${id}`);

    const res = await data.json();
    if (data.status !== 200) throw new Error(res.message);

    return res;
  } catch (error) {
    return null;
  }
}
