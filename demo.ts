// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
// import { User } from "./user.model";

// const findLastStudentId = async () => {
//   const lastStudent = await User.findOne(
//     { role: "student" },
//     {
//       id: 1,
//       _id: 0,
//     }
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   const id = lastStudent?.id ? lastStudent.id : undefined;

//   //   console.log(lastStudent);
//   return id;
// };
// // 0123456789

// export const generateStudentId = async (payload: TAcademicSemester) => {
//   let curentId = (0).toString();
//   // const //
//   // console.log(payload?._id)
//   const lastStudentId = await findLastStudentId( );
//   const lastSemesterYear = lastStudentId?.substring(0, 4);
//   const lastSemesterCode = lastStudentId?.substring(4, 6);
//   const currentSemesterYear = payload?.year;
//   const currentSemesterCode = payload?.code;
//   // console.log({ lastStudentId });
//   // console.log({ lastSemesterYear });
//   if (
//     lastStudentId &&
//     lastSemesterCode === currentSemesterCode &&
//     lastSemesterYear === currentSemesterYear
//   ) {
//     curentId = lastStudentId.substring(6);
//   }
//   // console.log({ curentId });
//   const generateId = (Number(curentId) + 1).toString().padStart(4, "0");
//   // console.log({ generateId });
//   const originalId = `${payload.year}${payload.code}${generateId}`;

//   // console.log(await findLastStudentId(), "------------");
//   return originalId;
// };
