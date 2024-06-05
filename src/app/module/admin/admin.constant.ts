import { TBloodGroup, TGender } from "./admin.interface";

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

export const Gender: TGender[] = ["male", "female", "others"];

export const searchField = [
  "id",
  "name.firstName",
  "name.middleName",
  "name.lastName",
  "email",
  "presentAddress.country",
];
