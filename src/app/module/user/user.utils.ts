import { string } from "zod";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// -------------------- generated student id -------------
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: "student" },
    {
      id: 1,
      _id: 1,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  const id = lastStudent?.id ? lastStudent.id : undefined;

  //   console.log(lastStudent);
  return id;
};

const generateStudentId = async (payload: TAcademicSemester) => {
  let curentId = (0).toString();
  // const //
  // console.log(payload?._id)
  const lastStudentId = await findLastStudentId();
  const lastSemesterYear = lastStudentId?.substring(0, 4);
  const lastSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterYear = payload?.year;
  const currentSemesterCode = payload?.code;
  // console.log({ lastStudentId });
  // console.log({ lastSemesterYear });
  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentSemesterYear
  ) {
    curentId = lastStudentId.substring(6);
  }
  // console.log({ curentId });
  const generateId = (Number(curentId) + 1).toString().padStart(4, "0");
  // console.log({ generateId });
  const originalId: string = `${payload.year}${payload.code}${generateId}`;

  // console.log(await findLastStudentId(), "------------");
  return originalId;
};

// -------------------- generated admin id -------------
const findLastAdmin = async () => {
  const lastAdmin = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  // console.log(lastAdmin?.id.substring(2));
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdmin();
  if (lastAdminId) {
    currentId = lastAdminId;
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  const generatedId = `A-${incrementId}`;

  return generatedId;
};

// -------------------- generated admin id -------------
const findLastFaculty = async () => {
  const lastFaculty = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  // console.log(lastFaculty?.id.substring(2));
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFaculty();
  console.log({ lastFacultyId });
  if (lastFacultyId) {
    currentId = lastFacultyId;
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  const generatedId = `F-${incrementId}`;

  return generatedId;
};

export { generateStudentId, generateAdminId, generateFacultyId };
