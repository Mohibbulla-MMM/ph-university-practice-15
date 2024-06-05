import { TBloodGroup, TGender } from "./faculty.interface";

export const BloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const Gender: TGender[] = ["female", "male", "others"];

export const searchField = [
  "id",
  "name.firstName",
  "name.middleName",
  "name.lastName",
  "email",
  "presentAddress",
  "contactNo",
];
