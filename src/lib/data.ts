import connect from "./utils";
import Teacher from "./models/Teacher";

// export async function getTeachers() {
//   try {
//     await connect();
//     const teachers = await Teacher.find();
//     const parsedData = JSON.parse(JSON.stringify(teachers));

//     return parsedData;
//   } catch (error) {
//     throw new Error("Error fetching data");
//   }
// }
